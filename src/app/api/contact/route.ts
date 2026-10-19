import { NextResponse } from "next/server";
import {
  normalizeName,
  normalizePhone,
  validateContact,
  type ContactErrorCode,
  type ContactResponse,
  type FieldErrors,
  HONEYPOT_FIELD,
} from "@/lib/contact";
import { renderLeadEmail, type Lead } from "@/lib/lead-email";

/* ═══════════════════════ LIMITS ═══════════════════════ */

const MAX_BODY_BYTES = 4_096;
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per address
const RATE_MAP_PRUNE_AT = 500; // entries before expired ones are swept
const DELIVERY_TIMEOUT_MS = 8_000;

/* ═══════════════════════ RATE LIMITER ═══════════════════════
 * Best effort: in-memory, so it is per serverless instance, not global.
 */

const rateMap = new Map<string, { count: number; resetAt: number }>();

function pruneExpired(now: number) {
  for (const [key, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateMap.size > RATE_MAP_PRUNE_AT) pruneExpired(now);

  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  rateMap.set(ip, { ...entry, count: entry.count + 1 });
  return entry.count + 1 > RATE_LIMIT;
}

/* ═══════════════════════ HELPERS ═══════════════════════ */

function respond(body: ContactResponse, status = 200) {
  return NextResponse.json<ContactResponse>(body, { status });
}

function fail(code: ContactErrorCode, status: number, fields?: FieldErrors) {
  return respond({ success: false, error: fields ? { code, fields } : { code } }, status);
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* Browsers send Origin on cross-site POSTs; a mismatch means another site */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

class PayloadTooLargeError extends Error {}

/* Reads the body chunk by chunk and stops once it passes the cap, so a
 * chunked request with no Content-Length cannot make us buffer it all. */
async function readCappedText(request: Request, maxBytes: number): Promise<string> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  chunks.reduce((offset, chunk) => {
    bytes.set(chunk, offset);
    return offset + chunk.byteLength;
  }, 0);
  return new TextDecoder().decode(bytes);
}

async function readJsonObject(request: Request): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) throw new PayloadTooLargeError();

  const text = await readCappedText(request, MAX_BODY_BYTES);

  try {
    const parsed: unknown = JSON.parse(text);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function readString(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value : "";
}

/* ═══════════════════════ DELIVERY ═══════════════════════
 * A lead counts as received only when at least one channel confirms it.
 * Logs never include the visitor's name or phone.
 */

type DeliveryResult = "delivered" | "failed" | "unconfigured";

async function sendEmail(lead: Lead, apiKey: string): Promise<boolean> {
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { subject, html, text } = renderLeadEmail(lead);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: process.env.CONTACT_EMAIL || "yarinmanoah1443@gmail.com",
    subject,
    html,
    text,
  });
  if (error) {
    console.error("Contact email not sent:", error.name);
    return false;
  }
  return true;
}

async function sendWebhook(lead: Lead, url: string): Promise<boolean> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
  });
  if (!res.ok) console.error("Contact webhook rejected the lead:", res.status);
  return res.ok;
}

function settle(task: Promise<boolean>, channel: string): Promise<boolean> {
  return task.catch((err: unknown) => {
    console.error(`Contact ${channel} failed:`, err instanceof Error ? err.name : "unknown");
    return false;
  });
}

async function deliver(lead: Lead): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.WEBHOOK_URL;
  const tasks = [
    ...(apiKey ? [settle(sendEmail(lead, apiKey), "email")] : []),
    ...(webhookUrl ? [settle(sendWebhook(lead, webhookUrl), "webhook")] : []),
  ];
  if (tasks.length === 0) return "unconfigured";

  const results = await Promise.all(tasks);
  return results.some(Boolean) ? "delivered" : "failed";
}

/* ═══════════════════════ HANDLER ═══════════════════════ */

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) return fail("forbidden", 403);
    if (isRateLimited(clientIp(request))) return fail("rate_limited", 429);

    const body = await readJsonObject(request);
    if (!body) return fail("bad_request", 400);

    /* Bots fill every field; people never see this one. Pretend success. */
    if (readString(body, HONEYPOT_FIELD).trim()) {
      console.warn("Contact form: honeypot filled, submission dropped");
      return respond({ success: true });
    }

    const input = {
      name: readString(body, "name"),
      phone: readString(body, "phone"),
      goal: readString(body, "goal"),
    };
    const fieldErrors = validateContact(input);
    if (Object.keys(fieldErrors).length > 0) return fail("invalid_input", 400, fieldErrors);

    const lead: Lead = {
      name: normalizeName(input.name),
      phone: normalizePhone(input.phone),
      goal: input.goal,
    };

    const result = await deliver(lead);
    if (result === "unconfigured") {
      if (process.env.NODE_ENV === "production") {
        console.error("Contact form has no delivery channel (RESEND_API_KEY or WEBHOOK_URL)");
        return fail("delivery_failed", 503);
      }
      console.warn("Contact form: no delivery channel configured; lead accepted locally only");
      return respond({ success: true });
    }
    if (result === "failed") return fail("delivery_failed", 502);

    console.log("Contact lead delivered:", { goal: lead.goal, at: new Date().toISOString() });
    return respond({ success: true });
  } catch (err) {
    if (err instanceof PayloadTooLargeError) return fail("payload_too_large", 413);
    console.error("Contact handler error:", err instanceof Error ? err.name : "unknown");
    return fail("delivery_failed", 500);
  }
}

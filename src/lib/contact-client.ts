import type { ContactInput, ContactResponse, FieldErrors } from "./contact";

/* ═══════════════════════ CONTACT SUBMIT (browser) ═══════════════════════
 * Posts the form and turns every outcome (network, timeout, HTTP status,
 * server field errors) into one result the form can show.
 */

export const SUBMIT_TIMEOUT_MS = 15_000;

export type SubmitFailure = "offline" | "timeout" | "rate_limited" | "server" | "invalid";

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: SubmitFailure; fields?: FieldErrors };

type SubmitOptions = {
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  isOnline?: () => boolean;
};

function browserIsOnline(): boolean {
  return typeof navigator === "undefined" || navigator.onLine !== false;
}

async function readResponse(res: Response): Promise<ContactResponse | null> {
  try {
    return (await res.json()) as ContactResponse;
  } catch {
    return null;
  }
}

export async function submitContact(
  payload: ContactInput & { company: string },
  { fetchImpl = fetch, timeoutMs = SUBMIT_TIMEOUT_MS, isOnline = browserIsOnline }: SubmitOptions = {}
): Promise<SubmitResult> {
  if (!isOnline()) return { ok: false, reason: "offline" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (res.ok) return { ok: true };

    const body = await readResponse(res);
    const error = body && !body.success ? body.error : null;
    if (res.status === 429) return { ok: false, reason: "rate_limited" };
    if (error?.code === "invalid_input" && error.fields) {
      return { ok: false, reason: "invalid", fields: error.fields };
    }
    return { ok: false, reason: "server" };
  } catch {
    if (controller.signal.aborted) return { ok: false, reason: "timeout" };
    return { ok: false, reason: isOnline() ? "server" : "offline" };
  } finally {
    clearTimeout(timer);
  }
}

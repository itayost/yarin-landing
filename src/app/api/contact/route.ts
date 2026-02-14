import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  phone: string;
  message?: string;
}

/* ── Simple in-memory rate limiter ── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

/* ── Input sanitisation ── */
function sanitize(str: string): string {
  return str
    .replace(/[<>]/g, "") // strip angle brackets
    .trim()
    .slice(0, 500); // cap length
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    /* Rate limiting (best-effort — in-memory, not shared across serverless instances) */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body: ContactPayload = await request.json();

    /* Validation */
    const name = sanitize(body.name ?? "");
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const cleanPhone = (body.phone ?? "").replace(/[\s\-()]/g, "");
    if (
      !cleanPhone ||
      (!/^0\d{8,9}$/.test(cleanPhone) &&
        !/^\+?\d{10,13}$/.test(cleanPhone))
    ) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const phone = sanitize(body.phone);
    const message = sanitize(body.message ?? "");

    /* Log (visible in Vercel logs) */
    console.log("New contact form submission:", {
      name,
      phone,
      message: message || "(no message)",
      timestamp: new Date().toISOString(),
    });

    /* Email via Resend (if configured) — non-blocking */
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        const safeName = escapeHtml(name);
        const safePhone = escapeHtml(phone);
        const safeMessage = escapeHtml(message || "לא צורפה הודעה");

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
          to: process.env.CONTACT_EMAIL ?? "yarinmanoah1443@gmail.com",
          subject: `ליד חדש: ${name}`,
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 480px;">
              <h2 style="color: #2ECC71;">פנייה חדשה מהאתר</h2>
              <p><strong>שם:</strong> ${safeName}</p>
              <p><strong>טלפון:</strong> <a href="tel:${cleanPhone}">${safePhone}</a></p>
              <p><strong>הודעה:</strong> ${safeMessage}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
              <p style="color: #888; font-size: 12px;">${new Date().toLocaleString("he-IL")}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send email via Resend:", emailErr);
      }
    }

    /* Webhook (if configured) — non-blocking */
    if (process.env.WEBHOOK_URL) {
      fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      }).catch(() => {
        /* non-blocking */
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

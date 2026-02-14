import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  phone: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    // Validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const cleanPhone = body.phone?.replace(/[\s\-()]/g, "");
    if (!cleanPhone || (!/^0\d{8,9}$/.test(cleanPhone) && !/^\+?\d{10,13}$/.test(cleanPhone))) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    // Log the submission (visible in Vercel logs)
    console.log("New contact form submission:", {
      name: body.name.trim(),
      phone: body.phone.trim(),
      message: body.message?.trim() || "(no message)",
      timestamp: new Date().toISOString(),
    });

    // ─── Email Integration ───────────────────────────────────────
    // To send emails, install an email service and uncomment below.
    //
    // Option 1: Resend (recommended for Vercel)
    //   npm install resend
    //
    //   import { Resend } from 'resend';
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: 'noreply@yourdomain.com',
    //     to: 'yarinmanoah1443@gmail.com',
    //     subject: `ליד חדש: ${body.name.trim()}`,
    //     html: `
    //       <div dir="rtl" style="font-family: Arial, sans-serif;">
    //         <h2>פנייה חדשה מהאתר</h2>
    //         <p><strong>שם:</strong> ${body.name.trim()}</p>
    //         <p><strong>טלפון:</strong> ${body.phone.trim()}</p>
    //         <p><strong>הודעה:</strong> ${body.message?.trim() || 'לא צורפה הודעה'}</p>
    //       </div>
    //     `,
    //   });
    //
    // Option 2: Webhook (Zapier, Make, n8n, etc.)
    //   await fetch(process.env.WEBHOOK_URL!, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name: body.name, phone: body.phone, message: body.message }),
    //   });
    // ─────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

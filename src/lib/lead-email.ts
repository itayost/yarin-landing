/* ═══════════════════════ LEAD EMAIL ═══════════════════════
 * The notification Yarin gets for each contact-form lead. Its job is speed:
 * on a phone he sees who, what they want and the number, then calls or
 * opens WhatsApp in one tap. Built for email clients: tables, inline styles,
 * absolute image URL, RTL, plus a plain-text part. Every visitor value is
 * escaped before it reaches the HTML.
 */

export type Lead = { name: string; phone: string; goal: string };
export type LeadEmail = { subject: string; html: string; text: string };

const SITE_URL = "https://www.yarinmanoah.com";
const LOGO_URL = `${SITE_URL}/images/logo-mark.png`;
const TIME_ZONE = "Asia/Jerusalem";

/* Palette from DESIGN.md (email clients need literal values) */
const C = {
  ground: "#000000",
  card: "#111111",
  edge: "#262626",
  hairline: "#1f1f1f",
  text: "#ffffff",
  muted: "#a1a1aa",
  brandGreen: "#1f8a4c",
  accentGreen: "#2ecc71",
  goalBg: "#0f2a1a",
  whatsapp: "#25d366",
};

const FONT = "Heebo, 'Segoe UI', Arial, sans-serif";

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* Israeli local numbers (05x...) become 9725x...; international keep digits */
export function toInternational(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `972${digits.slice(1)}` : digits;
}

/* Grouped for reading: 054-345-1727 or +972 54-345-1727; others as typed */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (/^0\d{9}$/.test(digits)) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (/^972\d{9}$/.test(digits)) {
    return `+972 ${digits.slice(3, 5)}-${digits.slice(5, 8)}-${digits.slice(8)}`;
  }
  return phone;
}

export function whatsappLink(phone: string, firstName: string): string {
  const greeting = firstName ? `היי ${firstName}` : "היי";
  const draft = `${greeting}, כאן ירין מנוח. קיבלתי את הפנייה שלך מהאתר, מתי נוח לך לדבר?`;
  return `https://wa.me/${toInternational(phone)}?text=${encodeURIComponent(draft)}`;
}

/* "ביום שני, 19.10 בשעה 14:32" in Israel time */
export function formatReceivedAt(date: Date): string {
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("he-IL", { timeZone: TIME_ZONE, ...options }).format(date);
  const day = part({ weekday: "long" });
  const dayMonth = part({ day: "2-digit", month: "2-digit" });
  const time = part({ hour: "2-digit", minute: "2-digit", hour12: false });
  return `ב${day}, ${dayMonth} בשעה ${time}`;
}

function button(href: string, label: string, bg: string, fg: string): string {
  return `
    <td width="48%" align="center" bgcolor="${bg}" style="border-radius:12px;background:${bg};">
      <a href="${href}" target="_blank" style="display:block;padding:15px 10px;font-family:${FONT};font-size:17px;font-weight:700;line-height:1;color:${fg};text-decoration:none;border-radius:12px;">${label}</a>
    </td>`;
}

export function renderLeadEmail(lead: Lead, receivedAt: Date = new Date()): LeadEmail {
  const firstName = lead.name.split(" ")[0] ?? "";
  const telHref = `tel:+${toInternational(lead.phone)}`;
  const waHref = whatsappLink(lead.phone, firstName);
  const phoneDisplay = formatPhone(lead.phone);
  const when = formatReceivedAt(receivedAt);

  const name = escapeHtml(lead.name);
  const goal = escapeHtml(lead.goal);
  const phone = escapeHtml(phoneDisplay);
  const preheader = escapeHtml(`${lead.goal} · ${phoneDisplay}`);

  const subject = `ליד חדש: ${lead.name} · ${lead.goal}`;

  const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${escapeHtml(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body dir="rtl" style="margin:0;padding:0;background:${C.ground};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.ground};">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ground}" style="background:${C.ground};">
  <tr>
    <td align="center" style="padding:28px 14px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl" style="max-width:520px;">

        <!-- Brand -->
        <tr>
          <td align="right" style="padding:0 6px 16px;font-family:${FONT};">
            <img src="${LOGO_URL}" width="28" height="30" alt="" style="vertical-align:middle;border:0;">
            <span style="vertical-align:middle;font-size:17px;font-weight:700;color:${C.accentGreen};">&nbsp;ירין</span><span style="vertical-align:middle;font-size:17px;font-weight:700;color:${C.text};"> מנוח</span>
          </td>
        </tr>

        <!-- Lead card -->
        <tr>
          <td bgcolor="${C.card}" style="background:${C.card};border:1px solid ${C.edge};border-radius:20px;padding:28px 24px 24px;font-family:${FONT};" align="right">
            <p style="margin:0;font-size:14px;font-weight:700;color:${C.accentGreen};">
              <span style="display:inline-block;width:8px;height:8px;border-radius:8px;background:${C.accentGreen};vertical-align:middle;"></span>&nbsp; ליד חדש מהאתר
            </p>
            <h1 style="margin:10px 0 0;font-size:30px;line-height:1.15;font-weight:900;color:${C.text};word-break:break-word;">${name}</h1>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
              <tr>
                <td bgcolor="${C.goalBg}" style="background:${C.goalBg};border-radius:10px;padding:10px 14px;font-size:16px;line-height:1.4;color:${C.text};">
                  <span style="color:${C.muted};">רוצה לקבל מהליווי:</span><br>
                  <strong style="color:${C.accentGreen};font-weight:700;">${goal}</strong>
                </td>
              </tr>
            </table>

            <p style="margin:22px 0 0;font-size:13px;color:${C.muted};">טלפון</p>
            <p style="margin:2px 0 0;font-size:26px;font-weight:700;letter-spacing:0.5px;"><a href="${telHref}" dir="ltr" style="color:${C.text};text-decoration:none;">${phone}</a></p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;">
              <tr>
                ${button(telHref, "חיוג", C.brandGreen, C.text)}
                <td width="4%" style="font-size:0;line-height:0;">&nbsp;</td>
                ${button(waHref, "וואטסאפ", C.whatsapp, "#06240f")}
              </tr>
            </table>

            <p style="margin:22px 0 0;padding-top:16px;border-top:1px solid ${C.hairline};font-size:13px;color:${C.muted};">התקבל ${escapeHtml(when)}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:16px 6px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#71717a;">
            נשלח מטופס יצירת הקשר באתר <a href="${SITE_URL}" style="color:#71717a;">yarinmanoah.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    "ליד חדש מהאתר",
    "",
    `שם: ${lead.name}`,
    `טלפון: ${phoneDisplay}`,
    `רוצה לקבל מהליווי: ${lead.goal}`,
    "",
    `וואטסאפ: ${waHref}`,
    `התקבל ${when}`,
  ].join("\n");

  return { subject, html, text };
}

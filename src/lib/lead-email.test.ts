import { describe, expect, test } from "vitest";
import { formatPhone, renderLeadEmail, toInternational, whatsappLink } from "./lead-email";

const LEAD = { name: "דנה כהן", phone: "0543451727", goal: "ללמוד מסחר יומי בנוסטרו" };
const RECEIVED = new Date("2026-10-19T11:32:00Z");

describe("phone helpers", () => {
  test("turns an Israeli local number into international digits", () => {
    expect(toInternational("054-345-1727")).toBe("972543451727");
  });

  test("keeps an international number's digits", () => {
    expect(toInternational("+972543451727")).toBe("972543451727");
  });

  test("groups local and +972 numbers for reading and leaves others as typed", () => {
    expect(formatPhone("0543451727")).toBe("054-345-1727");
    expect(formatPhone("+972543451727")).toBe("+972 54-345-1727");
    expect(formatPhone("+1 415 555 0100")).toBe("+1 415 555 0100");
  });

  test("builds a WhatsApp link with a greeting draft by first name", () => {
    const link = whatsappLink("0543451727", "דנה");

    expect(link.startsWith("https://wa.me/972543451727?text=")).toBe(true);
    expect(decodeURIComponent(link.split("text=")[1])).toContain("היי דנה, כאן ירין מנוח");
  });
});

describe("renderLeadEmail", () => {
  test("puts the name and goal in the subject for the inbox list", () => {
    expect(renderLeadEmail(LEAD, RECEIVED).subject).toBe("ליד חדש: דנה כהן · ללמוד מסחר יומי בנוסטרו");
  });

  test("renders the call and WhatsApp actions and the readable phone", () => {
    const { html } = renderLeadEmail(LEAD, RECEIVED);

    expect(html).toContain('href="tel:+972543451727"');
    expect(html).toContain("https://wa.me/972543451727?text=");
    expect(html).toContain("054-345-1727");
    expect(html).toContain('dir="rtl"');
  });

  test("shows the received time in Israel time", () => {
    const { html, text } = renderLeadEmail(LEAD, RECEIVED);

    expect(text).toContain("התקבל ביום שני, 19.10 בשעה 14:32");
    expect(html).toContain("בשעה 14:32");
  });

  test("escapes visitor input so it cannot inject markup", () => {
    const { html } = renderLeadEmail({ ...LEAD, name: '<img src=x onerror="alert(1)">' }, RECEIVED);

    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });

  test("includes a plain-text part with every field", () => {
    const { text } = renderLeadEmail(LEAD, RECEIVED);

    expect(text).toContain("שם: דנה כהן");
    expect(text).toContain("טלפון: 054-345-1727");
    expect(text).toContain("רוצה לקבל מהליווי: ללמוד מסחר יומי בנוסטרו");
    expect(text).toContain("https://wa.me/972543451727");
  });
});

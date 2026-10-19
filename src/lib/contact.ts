import { GOAL_OPTIONS } from "./content";

/* ═══════════════════════ CONTACT FORM RULES ═══════════════════════
 * One source of truth for the contact form, shared by the browser and
 * /api/contact so both sides accept and reject exactly the same input.
 */

export const NAME_MAX_LENGTH = 80;
/* Hidden bot trap. Deliberately meaningless: browser autofill fills fields it
 * recognises (a field named "company" got the visitor's employer), which
 * made real leads look like bots and dropped them silently. */
export const HONEYPOT_FIELD = "hp_check";
export const PHONE_MAX_LENGTH = 20;

const PHONE_LOCAL = /^0\d{8,9}$/;
const PHONE_INTL = /^\+?\d{10,13}$/;
/* C0/C1 control characters, including newlines (would break email subjects) */
const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g;

export type ContactField = "name" | "phone" | "goal";
export type FieldErrors = Partial<Record<ContactField, string>>;
export type Goal = (typeof GOAL_OPTIONS)[number];

export type ContactInput = { name: string; phone: string; goal: string };

/* Error codes the API returns; the form maps each to its own message */
export type ContactErrorCode =
  | "invalid_input"
  | "bad_request"
  | "forbidden"
  | "payload_too_large"
  | "rate_limited"
  | "delivery_failed";

export type ContactResponse =
  | { success: true }
  | { success: false; error: { code: ContactErrorCode; fields?: FieldErrors } };

export const FIELD_MESSAGES = {
  nameRequired: "נא להזין שם",
  nameTooLong: `השם ארוך מדי (עד ${NAME_MAX_LENGTH} תווים)`,
  phoneRequired: "נא להזין מספר טלפון",
  phoneInvalid: "מספר הטלפון לא תקין",
  goalRequired: "נא לבחור את התשובה המתאימה",
} as const;

/* Collapses whitespace and drops control characters and angle brackets */
export function normalizeName(raw: string): string {
  return raw.replace(CONTROL_CHARS, " ").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

/* Digits with an optional leading "+": spaces, dashes, dots and brackets go */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-().]/g, "");
}

export function isValidPhone(normalized: string): boolean {
  return PHONE_LOCAL.test(normalized) || PHONE_INTL.test(normalized);
}

export function isGoal(value: string): value is Goal {
  return (GOAL_OPTIONS as readonly string[]).includes(value);
}

export function validateField(field: ContactField, input: ContactInput): string | undefined {
  if (field === "name") {
    const name = normalizeName(input.name);
    if (!name) return FIELD_MESSAGES.nameRequired;
    if (name.length > NAME_MAX_LENGTH) return FIELD_MESSAGES.nameTooLong;
    return undefined;
  }
  if (field === "phone") {
    const phone = normalizePhone(input.phone);
    if (!phone) return FIELD_MESSAGES.phoneRequired;
    if (phone.length > PHONE_MAX_LENGTH || !isValidPhone(phone)) return FIELD_MESSAGES.phoneInvalid;
    return undefined;
  }
  return isGoal(input.goal) ? undefined : FIELD_MESSAGES.goalRequired;
}

export const CONTACT_FIELDS: readonly ContactField[] = ["name", "phone", "goal"];

export function validateContact(input: ContactInput): FieldErrors {
  return CONTACT_FIELDS.reduce<FieldErrors>((errors, field) => {
    const message = validateField(field, input);
    return message ? { ...errors, [field]: message } : errors;
  }, {});
}

/* First name for the thank-you line; empty when the name has no letters */
export function firstNameOf(name: string): string {
  return normalizeName(name).split(" ")[0] ?? "";
}

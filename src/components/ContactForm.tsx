"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { CONTACT } from "@/lib/constants";
import { CONTACT_SECTION, GOAL_OPTIONS } from "@/lib/content";
import {
  CONTACT_FIELDS,
  NAME_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  firstNameOf,
  validateContact,
  validateField,
  type ContactField,
  type ContactInput,
  type FieldErrors,
} from "@/lib/contact";
import { submitContact, type SubmitFailure } from "@/lib/contact-client";

type FormStatus = "idle" | "submitting" | "success" | "error";
type BannerFailure = Exclude<SubmitFailure, "invalid">;

/* Each failure names what happened; all of them offer WhatsApp as the way out */
const FAILURE_MESSAGES: Record<BannerFailure, string> = {
  offline: "נראה שאין חיבור לאינטרנט. בדקו את החיבור ונסו שוב, או",
  timeout: "השליחה לוקחת יותר מדי זמן. נסו שוב, או",
  rate_limited: "נשלחו כמה ניסיונות ברצף. נסו שוב בעוד דקה, או",
  server: "משהו השתבש בשליחה. נסו שוב, או",
};

/* ═══════════════════════ FIELD ERROR ═══════════════════════ */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error-in mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}

/* Visual cue only: the fields carry `required`, which screen readers announce */
function RequiredMark() {
  return (
    <span className="ms-0.5 text-red-400" aria-hidden="true">
      *
    </span>
  );
}

/* ═══════════════════════ SUCCESS ═══════════════════════ */

function SuccessPanel({ firstName }: { firstName: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* The form unmounts on success: move focus here so it is not lost */
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      role="status"
      className="success-in w-full rounded-[1.25rem] border border-white/12 bg-dark-card p-8 text-center shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] sm:p-12"
    >
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-green/20">
        <svg className="h-8 w-8 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path className="pen-check" pathLength={1} strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-black [overflow-wrap:anywhere] outline-none sm:text-3xl"
      >
        תודה{firstName ? `, ${firstName}` : ""}!
      </h3>
      <p className="mt-3 text-lg text-white/80">
        קיבלתי את הפרטים. אחזור אליך לתיאום שיחת אפיון קצרה.
      </p>
    </div>
  );
}

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: "", phone: "", goal: "" });
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [failure, setFailure] = useState<BannerFailure>("server");
  const isSubmitting = useRef(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLSelectElement>(null);
  const fieldRefs: Record<ContactField, RefObject<HTMLInputElement | HTMLSelectElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    goal: goalRef,
  };

  const focusFirstInvalid = (fieldErrors: FieldErrors) => {
    const first = CONTACT_FIELDS.find((field) => fieldErrors[field]);
    if (first) fieldRefs[first].current?.focus();
  };

  /* Once a field has an error, re-check it as the visitor fixes it */
  const updateField = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) setErrors({ ...errors, [field]: validateField(field, next) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting.current) return;

    const fieldErrors = validateContact(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstInvalid(fieldErrors);
      return;
    }

    isSubmitting.current = true;
    setStatus("submitting");
    const result = await submitContact({ ...values, company });
    isSubmitting.current = false;

    if (result.ok) {
      setStatus("success");
      return;
    }
    if (result.reason === "invalid") {
      const serverErrors = result.fields ?? {};
      setErrors(serverErrors);
      setStatus("idle");
      focusFirstInvalid(serverErrors);
      return;
    }
    setFailure(result.reason);
    setStatus("error");
  };

  const describedBy = (field: ContactField) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-dark-section py-20 md:py-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-5 md:gap-12 md:px-8">
        <div className="text-center">
          <h2
            id="contact-heading"
            className="text-[clamp(2.1rem,1.2rem+3vw,3.5rem)] leading-[1.05] font-black tracking-[-0.02em] text-balance"
          >
            {CONTACT_SECTION.title}
          </h2>
          <div className="mx-auto mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed text-white/80">
            {CONTACT_SECTION.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-base font-medium text-white/85 underline decoration-white/25 underline-offset-8 transition-colors hover:text-white hover:decoration-accent-green"
          >
            <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
            או דברו איתי ישירות בוואטסאפ
          </a>
        </div>

        {status === "success" ? (
          <SuccessPanel firstName={firstNameOf(values.name)} />
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-label="השארת פרטים לשיחת אפיון"
            aria-busy={status === "submitting"}
            className="relative w-full rounded-[1.25rem] border border-white/12 bg-dark-card p-6 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] sm:p-8 lg:p-10"
          >
            {/* Honeypot: hidden from people and assistive tech; bots fill it */}
            <div className="absolute -start-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="contact-company">חברה</label>
              <input
                id="contact-company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white/85">
                  שם
                  <RequiredMark />
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={NAME_MAX_LENGTH}
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy("name")}
                  className={`form-input ${errors.name ? "form-input-error" : ""}`}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>
              <div className="min-w-0">
                <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-white/85">
                  טלפון
                  <RequiredMark />
                </label>
                <input
                  ref={phoneRef}
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  dir="ltr"
                  required
                  maxLength={PHONE_MAX_LENGTH}
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={describedBy("phone")}
                  className={`form-input text-right ${errors.phone ? "form-input-error" : ""}`}
                />
                <FieldError id="contact-phone-error" message={errors.phone} />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="contact-goal" className="mb-2 block text-base font-bold text-white">
                {CONTACT_SECTION.goalQuestion}
                <RequiredMark />
              </label>
              <div className="relative">
                <select
                  ref={goalRef}
                  id="contact-goal"
                  name="goal"
                  required
                  value={values.goal}
                  onChange={(e) => updateField("goal", e.target.value)}
                  aria-invalid={Boolean(errors.goal)}
                  aria-describedby={describedBy("goal")}
                  className={`form-input form-select ${values.goal ? "" : "text-white/55"} ${errors.goal ? "form-input-error" : ""}`}
                >
                  <option value="" disabled>
                    {CONTACT_SECTION.goalPlaceholder}
                  </option>
                  {GOAL_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60"
                  aria-hidden="true"
                />
              </div>
              <FieldError id="contact-goal-error" message={errors.goal} />
            </div>

            {status === "error" && (
              <p role="alert" className="field-error-in mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {FAILURE_MESSAGES[failure]}{" "}
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4">
                  שלחו לי הודעה בוואטסאפ
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="cta-btn mt-8 w-full py-4 text-lg disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" ? "שולח..." : "קבעו שיחת אפיון"}
            </button>
            <p className="mt-4 text-center text-xs leading-relaxed text-text-secondary">
              הפרטים ישמשו רק כדי לחזור אליכם בנוגע לליווי.{" "}
              <Link href="/privacy" className="whitespace-nowrap underline underline-offset-4 hover:text-white">
                מדיניות הפרטיות
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

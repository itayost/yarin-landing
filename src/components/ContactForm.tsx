"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { CONTACT_SECTION, GOAL_OPTIONS } from "@/lib/content";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; phone?: string; goal?: string };

const PHONE_LOCAL = /^0\d{8,9}$/;
const PHONE_INTL = /^\+?\d{10,13}$/;

/* ═══════════════════════ VALIDATION ═══════════════════════ */

function validate(name: string, phone: string, goal: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "נא להזין שם";

  const cleanedPhone = phone.replace(/[\s\-()]/g, "");
  if (!cleanedPhone) errors.phone = "נא להזין מספר טלפון";
  else if (!PHONE_LOCAL.test(cleanedPhone) && !PHONE_INTL.test(cleanedPhone))
    errors.phone = "מספר הטלפון לא תקין";

  if (!goal) errors.goal = "נא לבחור את התשובה המתאימה";
  return errors;
}

/* ═══════════════════════ FIELD ERROR ═══════════════════════ */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error-in mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}

/* ═══════════════════════ SUCCESS ═══════════════════════ */

function SuccessPanel({ firstName }: { firstName: string }) {
  return (
    <div
      role="status"
      className="success-in rounded-[1.25rem] border border-white/12 bg-dark-card p-8 text-center shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] sm:p-12 w-full"
    >
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-green/20">
        <svg className="h-8 w-8 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path className="pen-check" pathLength={1} strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h3 className="text-2xl font-black sm:text-3xl">
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(name, phone, goal);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          goal,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

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
            <MessageCircle className="h-5 w-5 text-whatsapp" aria-hidden="true" />
            או דברו איתי ישירות בוואטסאפ
          </a>
        </div>

        {status === "success" ? (
          <SuccessPanel firstName={name.trim().split(" ")[0] ?? ""} />
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-label="השארת פרטים לשיחת אפיון"
            className="rounded-[1.25rem] border border-white/12 bg-dark-card p-6 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] sm:p-8 w-full lg:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white/85">
                  שם
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={`form-input ${errors.name ? "form-input-error" : ""}`}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-white/85">
                  טלפון
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  dir="ltr"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                  className={`form-input text-right ${errors.phone ? "form-input-error" : ""}`}
                />
                <FieldError id="contact-phone-error" message={errors.phone} />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="contact-goal" className="mb-2 block text-base font-bold text-white">
                {CONTACT_SECTION.goalQuestion}{" "}
                <span className="text-sm font-medium text-white/65">(חובה)</span>
              </label>
              <div className="relative">
                <select
                  id="contact-goal"
                  name="goal"
                  required
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  aria-invalid={Boolean(errors.goal)}
                  aria-describedby={errors.goal ? "contact-goal-error" : undefined}
                  className={`form-input form-select ${goal ? "" : "text-white/55"} ${errors.goal ? "form-input-error" : ""}`}
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
                משהו השתבש בשליחה. נסו שוב, או{" "}
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

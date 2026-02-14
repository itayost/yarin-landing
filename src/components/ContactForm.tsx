"use client";

import { useState, type FormEvent } from "react";
import {
  Lock,
  MessageCircle,
  Phone,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type FormStatus = "idle" | "submitting" | "success" | "error";

/* ═══════════════════════ CONTACT INFO ═══════════════════════ */

const CONTACT_POINTS = [
  {
    icon: Phone,
    label: "טלפון",
    value: "054-345-1727",
    href: "tel:+972543451727",
  },
  {
    icon: MessageCircle,
    label: "וואטסאפ",
    value: "שלח הודעה ישירה",
    href: "https://wa.me/972543451727",
  },
];

const TRUST_POINTS = [
  { icon: Clock, text: "תגובה תוך 24 שעות" },
  { icon: Users, text: "ליווי אישי 1-על-1" },
  { icon: CheckCircle2, text: "ללא התחייבות" },
];

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateName = () => {
    if (!name.trim()) {
      setNameError("נא להזין שם מלא");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhone = () => {
    const cleaned = phone.replace(/[\s\-()]/g, "");
    if (!cleaned) {
      setPhoneError("נא להזין מספר טלפון");
      return false;
    }
    if (!/^0\d{8,9}$/.test(cleaned) && !/^\+?\d{10,13}$/.test(cleaned)) {
      setPhoneError("מספר טלפון לא תקין");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validName = validateName();
    const validPhone = validatePhone();
    if (!validName || !validPhone) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  /* ── Success state ── */
  if (status === "success") {
    return (
      <section id="contact" className="relative py-16 md:py-32">
        <div className="h-px bg-gradient-to-l from-transparent via-white/[0.06] to-transparent mb-8 md:mb-24" />
        <div className="mx-auto max-w-lg px-5 md:px-8 text-center">
          <div className="animate-success inline-flex w-20 h-20 rounded-full bg-[#1B7340]/15 items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-[#2ECC71]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black mb-3">
            תודה{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}!
          </h2>
          <p className="text-text-secondary text-lg">
            קיבלתי את הפרטים שלך. אחזור אליך תוך 24 שעות.
          </p>
          <a
            href="https://wa.me/972543451727"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-[#25D366] hover:underline underline-offset-4"
          >
            <MessageCircle className="w-4 h-4" />
            רוצה תשובה מהירה יותר? שלח וואטסאפ
          </a>
        </div>
      </section>
    );
  }

  /* ── Form state ── */
  return (
    <section id="contact" className="relative py-16 md:py-32 bg-[#0d0d1e]">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-white/[0.06] to-transparent mb-24 md:mb-32" />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1B7340]/[0.04] blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1E6091]/[0.02] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase mb-3">
              צור קשר
            </p>
            <h2 className="text-3xl md:text-[3rem] font-black">בוא נדבר</h2>
            <p className="mt-4 text-text-secondary text-lg">
              השאר פרטים ואחזור אליך — בלי התחייבות
            </p>
          </div>
        </ScrollReveal>

        {/* ── Split layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Form card (right side in RTL) */}
          <ScrollReveal>
            <div className="relative bg-[#121225]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-10">
              {/* Green gradient line at top */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-l from-[#2ECC71] via-[#1B7340] to-transparent rounded-full" />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2"
                  >
                    שם מלא
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    onBlur={validateName}
                    placeholder="הכנס את שמך"
                    className={`form-input ${nameError ? "form-input-error" : ""}`}
                    autoComplete="name"
                  />
                  {nameError && (
                    <p className="mt-2 text-sm text-red-400">{nameError}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2"
                  >
                    טלפון
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError("");
                    }}
                    onBlur={validatePhone}
                    placeholder="05X-XXXXXXX"
                    dir="ltr"
                    className={`form-input text-left ${
                      phoneError ? "form-input-error" : ""
                    }`}
                    autoComplete="tel"
                  />
                  {phoneError && (
                    <p className="mt-2 text-sm text-red-400">{phoneError}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2"
                  >
                    הודעה חופשית{" "}
                    <span className="normal-case text-text-muted/60">
                      (לא חובה)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="ספר לי קצת על עצמך..."
                    rows={3}
                    className="form-input resize-none"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="cta-btn w-full py-4 text-base disabled:opacity-50 group"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        שולח...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        קבע שיחת היכרות חינם
                        <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      </span>
                    )}
                  </button>

                  {/* WhatsApp alternative */}
                  <a
                    href="https://wa.me/972543451727"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn-outline w-full py-3.5 text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    או שלח הודעה בוואטסאפ
                  </a>
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400 text-center">
                    אירעה שגיאה. נסה שוב או צור קשר ישירות בטלפון.
                  </p>
                )}
              </form>

              {/* Privacy note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted/60">
                <Lock className="w-3 h-3" />
                <span>הפרטים שלך מאובטחים ולא יועברו לצד שלישי</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Info sidebar (left side in RTL) */}
          <ScrollReveal delay={200} className="lg:pt-4">
            <div className="flex flex-col gap-6">
              {/* Contact points */}
              <div className="space-y-3">
                {CONTACT_POINTS.map((cp) => {
                  const Icon = cp.icon;
                  return (
                    <a
                      key={cp.label}
                      href={cp.href}
                      target={cp.href.startsWith("http") ? "_blank" : undefined}
                      rel={cp.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 bg-[#121225] border border-white/[0.04] hover:border-white/[0.08] rounded-xl p-4 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#1B7340]/[0.12] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#2ECC71]" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">{cp.label}</p>
                        <p className="text-sm font-semibold text-white">
                          {cp.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Trust points */}
              <div className="bg-[#121225] border border-white/[0.04] rounded-xl p-5 space-y-4">
                {TRUST_POINTS.map((tp) => {
                  const Icon = tp.icon;
                  return (
                    <div key={tp.text} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#2ECC71] flex-shrink-0" />
                      <span className="text-sm text-text-secondary">
                        {tp.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mini testimonial */}
              <div className="bg-[#121225] border border-white/[0.04] rounded-xl p-5">
                <blockquote className="text-sm text-text-secondary leading-relaxed italic">
                  &ldquo;ירין שינה לי את כל הגישה למסחר. הליווי האישי עושה את כל
                  ההבדל.&rdquo;
                </blockquote>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1B7340]/[0.12] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#2ECC71]">ד</span>
                  </div>
                  <span className="text-xs text-text-muted">ד.כ, תלמיד</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

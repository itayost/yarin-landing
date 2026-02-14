"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, Crown, Rocket, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { scrollToContact } from "@/lib/utils";

/* ═══════════════════════ PACKAGES DATA ═══════════════════════ */

const PACKAGES = [
  {
    name: "חבילה בסיסית",
    tag: "מתחילים",
    description: "בסיס חזק לכניסה לעולם המסחר",
    icon: Zap,
    features: [
      { text: "שיחות ליווי שבועיות", included: true },
      { text: "תוכנית לימוד מסודרת", included: true },
      { text: "ניתוח שוק בסיסי", included: true },
      { text: "גישה לקבוצת וואטסאפ", included: true },
      { text: "מסחר חי בזמן אמת", included: false },
      { text: "ניהול סיכונים מתקדם", included: false },
    ],
    popular: false,
    cta: "לפרטים נוספים",
  },
  {
    name: "חבילה מתקדמת",
    tag: "הכי מבוקשת",
    description: "ליווי מעמיק לסוחרים שרוצים להתקדם",
    icon: Rocket,
    features: [
      { text: "שיחות ליווי יומיומיות", included: true },
      { text: "ניתוח מעמיק + אסטרטגיות", included: true },
      { text: "מסחר חי בזמן אמת", included: true },
      { text: "ניהול סיכונים מתקדם", included: true },
      { text: "סקירות שוק מותאמות", included: true },
      { text: "תמיכה 24/7", included: false },
    ],
    popular: true,
    cta: "בוא נדבר",
  },
  {
    name: "חבילה פרימיום",
    tag: "VIP",
    description: "ליווי צמוד ללא פשרות",
    icon: Crown,
    features: [
      { text: "ליווי צמוד ללא הגבלה", included: true },
      { text: "בניית תיק השקעות אישי", included: true },
      { text: "גישה לכל האסטרטגיות", included: true },
      { text: "ליווי מסחר בזמן אמת", included: true },
      { text: "עדכונים ותובנות VIP", included: true },
      { text: "תמיכה 24/7", included: true },
    ],
    popular: false,
    cta: "לפרטים נוספים",
  },
];

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-32 bg-dark-section">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-white/6 to-transparent mb-8 md:mb-24" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-green/3 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <p className="text-accent-green text-sm font-semibold tracking-wider uppercase mb-3">
              חבילות
            </p>
            <h2 className="text-3xl md:text-[3rem] font-black">
              חבילות הליווי
            </h2>
            <p className="mt-4 text-text-secondary text-lg max-w-md mx-auto">
              בחר את החבילה שמתאימה לך — או דבר איתי ונתאים יחד
            </p>
          </div>
        </ScrollReveal>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;

            return (
              <ScrollReveal key={pkg.name} delay={i * 130}>
                <div className="h-full">
                  {pkg.popular ? (
                    /* ── Popular card with animated gradient border ── */
                    <div className="animated-border rounded-2xl p-[1.5px] h-full">
                      <div className="relative bg-dark-surface rounded-2xl p-5 sm:p-7 lg:p-9 flex flex-col h-full overflow-hidden">
                        {/* Glow accent */}
                        <div
                          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-green/8 via-transparent to-transparent pointer-events-none"
                          aria-hidden="true"
                        />

                        {/* Badge */}
                        <div className="relative z-10 flex items-center justify-between mb-6">
                          <span className="inline-flex items-center gap-1.5 bg-accent-green/10 text-accent-green text-xs font-bold px-3 py-1.5 rounded-lg border border-accent-green/20">
                            <Rocket className="w-3 h-3" />
                            {pkg.tag}
                          </span>
                        </div>

                        {/* Icon */}
                        <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-green to-brand-green flex items-center justify-center mb-5 shadow-lg shadow-accent-green/20">
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Title & description */}
                        <h3 className="relative z-10 text-2xl font-black mb-1">
                          {pkg.name}
                        </h3>
                        <p className="relative z-10 text-text-muted text-sm mb-7">
                          {pkg.description}
                        </p>

                        {/* Features */}
                        <ul className="relative z-10 space-y-3 mb-8 flex-1">
                          {pkg.features.map((f) => (
                            <li
                              key={f.text}
                              className="flex items-center gap-3"
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  f.included
                                    ? "bg-accent-green/15"
                                    : "bg-white/4"
                                }`}
                              >
                                {f.included ? (
                                  <Check className="w-3 h-3 text-accent-green" />
                                ) : (
                                  <span className="block w-1.5 h-[1.5px] bg-text-muted/40 rounded" />
                                )}
                              </div>
                              <span
                                className={`text-[15px] ${
                                  f.included
                                    ? "text-text-secondary"
                                    : "text-text-muted/50"
                                }`}
                              >
                                {f.text}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <button
                          onClick={scrollToContact}
                          className="relative z-10 cta-btn w-full py-3.5 rounded-xl font-semibold text-sm group"
                        >
                          <span className="flex items-center justify-center gap-2">
                            {pkg.cta}
                            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── Standard card ── */
                    <div className="relative bg-dark-card border border-white/4 hover:border-white/8 rounded-2xl p-5 sm:p-7 lg:p-9 flex flex-col h-full transition-colors duration-300">
                      {/* Tag */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="inline-flex items-center gap-1.5 bg-white/4 text-text-muted text-xs font-bold px-3 py-1.5 rounded-lg border border-white/4">
                          {pkg.tag}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-accent-green" />
                      </div>

                      {/* Title & description */}
                      <h3 className="text-2xl font-black mb-1">{pkg.name}</h3>
                      <p className="text-text-muted text-sm mb-7">
                        {pkg.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3 mb-8 flex-1">
                        {pkg.features.map((f) => (
                          <li
                            key={f.text}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                f.included
                                  ? "bg-brand-green/15"
                                  : "bg-white/4"
                              }`}
                            >
                              {f.included ? (
                                <Check className="w-3 h-3 text-accent-green" />
                              ) : (
                                <span className="block w-1.5 h-[1.5px] bg-text-muted/40 rounded" />
                              )}
                            </div>
                            <span
                              className={`text-[15px] ${
                                f.included
                                  ? "text-text-secondary"
                                  : "text-text-muted/50"
                              }`}
                            >
                              {f.text}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <button
                        onClick={scrollToContact}
                        className="cta-btn-outline w-full py-3.5 rounded-xl font-semibold text-sm group"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {pkg.cta}
                          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Bottom note ── */}
        <ScrollReveal delay={450}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-center text-sm text-text-muted"
          >
            לא בטוח מה מתאים לך?{" "}
            <button
              onClick={scrollToContact}
              className="text-accent-green hover:underline underline-offset-4 font-medium"
            >
              דבר איתי ונמצא יחד
            </button>
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
}

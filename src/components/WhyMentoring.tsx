"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Sparkles,
  Users,
  Clock,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";
import AnimatedNumber from "./AnimatedNumber";
import { EASE_OUT_EXPO } from "@/lib/constants";

/* ═══════════════════════ BENTO CARDS DATA ═══════════════════════ */

const BENTO_CARDS = [
  {
    id: "personal",
    title: "ליווי אישי 1-על-1",
    text: "לא קורס מוקלט. ירין מלווה אותך אישית בכל שלב — לימוד, ניתוח, ביצוע. כל שיחה מותאמת בדיוק למה שאתה צריך עכשיו.",
    icon: TrendingUp,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    size: "large" as const,
  },
  {
    id: "custom",
    title: "מותאם לרמה שלך",
    text: "בין אם אתה מתחיל מאפס או סוחר מנוסה — התוכנית נבנית רק בשבילך.",
    icon: BarChart2,
    colSpan: "md:col-span-1",
    rowSpan: "",
    size: "small" as const,
  },
  {
    id: "independence",
    title: "עצמאות פיננסית",
    text: "המטרה: שתדע לסחור לבד, עם ביטחון ושליטה מלאה על ההחלטות שלך.",
    icon: ShieldCheck,
    colSpan: "md:col-span-1",
    rowSpan: "",
    size: "small" as const,
  },
];

/* ═══════════════════════ STATS ═══════════════════════ */

const STATS = [
  {
    value: 100,
    suffix: "%",
    prefix: "",
    label: "מענה אישי",
    icon: Users,
  },
  {
    value: 24,
    suffix: "h",
    prefix: "",
    label: "זמן תגובה מקסימלי",
    icon: Clock,
  },
  {
    value: 1,
    suffix: ":1",
    prefix: "",
    label: "ליווי צמוד",
    icon: Sparkles,
  },
];

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function WhyMentoring() {
  return (
    <section id="why" className="relative py-16 md:py-32">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-white/6 to-transparent mb-8 md:mb-24" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-16">
            <div>
              <p className="text-accent-green text-sm font-semibold tracking-wider uppercase mb-3">
                למה דווקא ליווי?
              </p>
              <h2 className="text-3xl md:text-[3rem] font-black leading-tight">
                למה ליווי אישי
                <br />
                ולא קורס דיגיטלי?
              </h2>
            </div>
            <p className="text-text-secondary text-lg max-w-md md:text-left">
              ההבדל בין מי שמצליח בשוק לבין מי שלא — הוא הליווי הנכון
            </p>
          </div>
        </ScrollReveal>

        {/* ── Bento Grid — 3 columns on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {BENTO_CARDS.map((card, i) => {
            const Icon = card.icon;
            const isLarge = card.size === "large";

            return (
              <ScrollReveal
                key={card.id}
                delay={i * 120}
                className={`${card.colSpan} ${card.rowSpan}`}
              >
                <GlowCard className="h-full rounded-2xl">
                  <div
                    className={`relative bg-dark-card border border-white/4 hover:border-white/8 rounded-2xl h-full transition-colors duration-300 overflow-hidden ${
                      isLarge ? "p-5 sm:p-8 lg:p-10" : "p-5 sm:p-7 lg:p-8"
                    }`}
                  >
                    {/* Subtle gradient accent for the large card */}
                    {isLarge && (
                      <div
                        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-green/6 via-transparent to-transparent pointer-events-none"
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 rounded-xl bg-brand-green/12 text-accent-green flex items-center justify-center mb-5 ${
                        isLarge ? "w-14 h-14" : "w-11 h-11"
                      }`}
                    >
                      <Icon
                        className={isLarge ? "w-7 h-7" : "w-5 h-5"}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`relative z-10 font-bold mb-3 ${
                        isLarge ? "text-2xl" : "text-lg"
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`relative z-10 text-text-secondary leading-relaxed ${
                        isLarge
                          ? "text-base max-w-lg"
                          : "text-[15px]"
                      }`}
                    >
                      {card.text}
                    </p>

                    {/* Large card: comparison visual */}
                    {isLarge && (
                      <div className="relative z-10 mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Course card (negative) */}
                        <div className="bg-white/2 border border-white/4 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-red-400/60" />
                            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                              קורס דיגיטלי
                            </span>
                          </div>
                          <ul className="space-y-2.5">
                            {[
                              "תוכן גנרי לכולם",
                              "אין מענה אישי",
                              "נשכח אחרי שבוע",
                            ].map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2 text-sm text-text-muted"
                              >
                                <span className="w-4 h-4 rounded-full bg-white/4 flex items-center justify-center flex-shrink-0">
                                  <span className="block w-1.5 h-[1.5px] bg-text-muted/60 rounded" />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Mentoring card (positive) */}
                        <div className="bg-brand-green/6 border border-brand-green/20 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-accent-green" />
                            <span className="text-xs font-semibold text-accent-green uppercase tracking-wider">
                              ליווי עם ירין
                            </span>
                          </div>
                          <ul className="space-y-2.5">
                            {[
                              "תוכנית אישית לך",
                              "מענה ותמיכה צמודה",
                              "תוצאות לטווח ארוך",
                            ].map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2 text-sm text-text-secondary"
                              >
                                <span className="w-4 h-4 rounded-full bg-accent-green/15 flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-2.5 h-2.5 text-accent-green"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 12.75l6 6 9-13.5"
                                    />
                                  </svg>
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Stats strip ── */}
        <ScrollReveal delay={400}>
          <div className="mt-5 lg:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="bg-dark-card border border-white/4 rounded-2xl p-4 sm:p-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-accent-green flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white tracking-tight">
                      <AnimatedNumber
                        target={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";
import {
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Sparkles,
  Users,
  Clock,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* ═══════════════════════ ANIMATED NUMBER ═══════════════════════ */

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      });
      const unsub = count.on("change", (v) => {
        if (ref.current)
          ref.current.textContent = prefix + Math.round(v) + suffix;
      });
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, count, target, suffix, prefix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ═══════════════════════ GLOW CARD (cursor light only) ═══════════════════════ */

function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );
      e.currentTarget.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    },
    []
  );

  return (
    <div
      className={`glow-card group ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

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
      <div className="h-px bg-gradient-to-l from-transparent via-white/[0.06] to-transparent mb-8 md:mb-24" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-16">
            <div>
              <p className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase mb-3">
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
                    className={`relative bg-[#121225] border border-white/[0.04] hover:border-white/[0.08] rounded-2xl h-full transition-colors duration-300 overflow-hidden ${
                      isLarge ? "p-5 sm:p-8 lg:p-10" : "p-5 sm:p-7 lg:p-8"
                    }`}
                  >
                    {/* Subtle gradient accent for the large card */}
                    {isLarge && (
                      <div
                        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#1B7340]/[0.06] via-transparent to-transparent pointer-events-none"
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 rounded-xl bg-[#1B7340]/[0.12] text-[#2ECC71] flex items-center justify-center mb-5 ${
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
                        <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-5">
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
                                <span className="w-4 h-4 rounded-full bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                                  <span className="block w-1.5 h-[1.5px] bg-text-muted/60 rounded" />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Mentoring card (positive) */}
                        <div className="bg-[#1B7340]/[0.06] border border-[#1B7340]/20 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                            <span className="text-xs font-semibold text-[#2ECC71] uppercase tracking-wider">
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
                                <span className="w-4 h-4 rounded-full bg-[#2ECC71]/15 flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-2.5 h-2.5 text-[#2ECC71]"
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
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-[#121225] border border-white/[0.04] rounded-2xl p-4 sm:p-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1B7340]/[0.1] text-[#2ECC71] flex items-center justify-center flex-shrink-0">
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

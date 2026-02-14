"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* ═══════════════════════ TESTIMONIALS DATA ═══════════════════════ */

const TESTIMONIALS = [
  {
    name: "דניאל כ.",
    role: "סוחר מתחיל",
    duration: "3 חודשי ליווי",
    quote:
      "תוך חודשיים של ליווי עם ירין הבנתי את השוק ברמה אחרת לגמרי. הגישה האישית עושה את כל ההבדל.",
    stars: 5,
    featured: true,
  },
  {
    name: "מיכל א.",
    role: "סוחרת עצמאית",
    duration: "6 חודשי ליווי",
    quote:
      "באתי בלי שום ידע קודם ותוך זמן קצר כבר סוחרת בעצמי. ירין יודע לתת ביטחון ולהסביר בצורה ברורה.",
    stars: 5,
    featured: false,
  },
  {
    name: "אלון ר.",
    role: "סוחר מנוסה",
    duration: "4 חודשי ליווי",
    quote:
      "אחרי שני קורסים שלא עבדו, הליווי האישי עם ירין היה בדיוק מה שהייתי צריך. ממליץ בחום.",
    stars: 5,
    featured: false,
  },
  {
    name: "שירה ל.",
    role: "סוחרת מתחילה",
    duration: "2 חודשי ליווי",
    quote:
      "ירין מסביר דברים מורכבים בצורה פשוטה. כל שיחה נתנה לי כלים חדשים ואמיתיים.",
    stars: 5,
    featured: false,
  },
  {
    name: "יובל מ.",
    role: "סוחר יומי",
    duration: "5 חודשי ליווי",
    quote:
      "הליווי הזה שינה לי את הגישה לשוק. הפסקתי לפעול מרגש והתחלתי לסחור עם תוכנית.",
    stars: 5,
    featured: false,
  },
];

/* ═══════════════════════ STARS COMPONENT ═══════════════════════ */

function Stars({ count, size = "sm" }: { count: number; size?: "sm" | "md" }) {
  const sizeClass = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5" aria-label={`${count} כוכבים מתוך 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < count
              ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]"
              : "text-white/10"
          }`}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════ GLOW CARD ═══════════════════════ */

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

/* ═══════════════════════ TESTIMONIAL CARD ═══════════════════════ */

function TestimonialCard({
  t,
  featured = false,
}: {
  t: (typeof TESTIMONIALS)[0];
  featured?: boolean;
}) {
  return (
    <GlowCard className="h-full rounded-2xl">
      <div
        className={`relative bg-[#121225] border rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
          featured
            ? "border-[#2ECC71]/15 p-5 sm:p-8 lg:p-10"
            : "border-white/[0.04] hover:border-white/[0.08] p-5 sm:p-7 lg:p-8"
        }`}
      >
        {/* Featured accent glow */}
        {featured && (
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2ECC71]/[0.06] via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Decorative quote */}
        <Quote
          className={`relative z-10 mb-4 text-[#2ECC71]/[0.08] ${
            featured ? "w-12 h-12" : "w-9 h-9"
          }`}
        />

        {/* Quote text */}
        <blockquote
          className={`relative z-10 text-text-secondary leading-relaxed flex-1 ${
            featured ? "text-lg lg:text-xl" : "text-[15px] lg:text-base"
          }`}
        >
          {t.quote}
        </blockquote>

        {/* Duration tag */}
        <div className="relative z-10 mt-5 mb-5">
          <span className="text-xs font-medium text-[#2ECC71]/70 bg-[#2ECC71]/[0.06] px-3 py-1.5 rounded-lg">
            {t.duration}
          </span>
        </div>

        {/* Footer: name + stars */}
        <div className="relative z-10 flex items-center justify-between pt-5 border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-xl bg-[#1B7340]/[0.12] flex items-center justify-center text-[#2ECC71] font-bold ${
                featured ? "w-11 h-11 text-base" : "w-9 h-9 text-sm"
              }`}
            >
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm">{t.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]/60" />
              </div>
              <span className="text-xs text-text-muted">{t.role}</span>
            </div>
          </div>
          <Stars count={t.stars} size={featured ? "md" : "sm"} />
        </div>
      </div>
    </GlowCard>
  );
}

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-32 bg-[#080818]"
    >
      {/* Section divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-white/[0.06] to-transparent mb-8 md:mb-24" />

      {/* Ambient background */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1B7340]/[0.03] blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1E6091]/[0.02] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-6">
            <p className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase mb-3">
              ביקורות
            </p>
            <h2 className="text-3xl md:text-[3rem] font-black">
              מה אומרים התלמידים
            </h2>
          </div>
        </ScrollReveal>

        {/* ── Aggregate social proof ── */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-14">
            <Stars count={5} size="md" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">5.0</span>
              <span className="text-sm text-text-muted">
                מבוסס על {TESTIMONIALS.length}+ ביקורות
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {/* Column 1: Featured tall card */}
          <ScrollReveal className="md:row-span-2">
            <TestimonialCard t={TESTIMONIALS[0]} featured />
          </ScrollReveal>

          {/* Remaining cards */}
          {TESTIMONIALS.slice(1).map((t, i) => (
            <ScrollReveal key={t.name} delay={(i + 1) * 120}>
              <TestimonialCard t={t} />
            </ScrollReveal>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <ScrollReveal delay={500}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-10 text-center text-sm text-text-muted"
          >
            הצטרף ל-{TESTIMONIALS.length}+ סוחרים שכבר משנים את הגישה שלהם לשוק
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
}

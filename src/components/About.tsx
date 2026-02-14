"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  TrendingUp,
  Award,
  Briefcase,
  Quote,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* ═══════════════════════ JOURNEY MILESTONES ═══════════════════════ */

const MILESTONES = [
  {
    year: "2021",
    title: "הצעד הראשון",
    text: "התחלתי לסחור תוך כדי תואר בהנדסת תוכנה — כהשלמת הכנסה שהפכה לתשוקה.",
    icon: GraduationCap,
  },
  {
    year: "2022",
    title: "ההתמקצעות",
    text: "עברתי ליוויים וקורסים, למדתי מטעויות, ובניתי שיטת מסחר אישית.",
    icon: TrendingUp,
  },
  {
    year: "2023",
    title: "רישיון מקצועי",
    text: "קיבלתי רישיון ניהול תיקי השקעות והתחלתי ללוות סוחרים.",
    icon: Award,
  },
  {
    year: "היום",
    title: "ליווי אישי",
    text: "מלווה סוחרים בכל הרמות — ממתחילים ועד מנוסים שרוצים לעלות שלב.",
    icon: Briefcase,
  },
];

/* ═══════════════════════ CREDENTIALS ═══════════════════════ */

const CREDENTIALS = [
  { label: "B.Sc. הנדסת תוכנה", icon: GraduationCap },
  { label: "רישיון ניהול תיקי השקעות", icon: Award },
  { label: "5+ שנות ניסיון מסחר", icon: TrendingUp },
  { label: "מניות, אופציות, פיוצ'רס וקריפטו", icon: Briefcase },
];

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-32 mesh-bg">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-white/[0.06] to-transparent mb-8 md:mb-24" />

      {/* Background glow */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[#1B7340]/[0.03] blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <p className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase mb-3">
              קצת עליי
            </p>
            <h2 className="text-3xl md:text-[3rem] font-black">
              הסיפור שלי
            </h2>
            <p className="mt-4 text-text-secondary text-lg max-w-lg mx-auto">
              מדרום תל אביב לעולם המסחר — המסע שהפך לשליחות
            </p>
          </div>
        </ScrollReveal>

        {/* ── Main split: Photo + Story ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Photo + Pull Quote (sticky on desktop) */}
          <ScrollReveal direction="right" className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              {/* Photo placeholder */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#121225] border border-white/[0.06]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1A] via-transparent to-transparent z-10" />

                {/* Decorative corner accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#2ECC71]/[0.08] to-transparent pointer-events-none z-10"
                  aria-hidden="true"
                />

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1B7340]/20 to-[#2ECC71]/10 flex items-center justify-center mx-auto mb-4 border border-[#2ECC71]/10">
                      <span className="text-4xl font-black text-[#2ECC71]">
                        י
                      </span>
                    </div>
                    <p className="text-text-muted text-sm">ירין מנוח</p>
                  </div>
                </div>

                {/* Name overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-20">
                  <p className="font-bold text-xl">ירין מנוח</p>
                  <p className="text-text-muted text-sm mt-1">
                    מנטור מסחר בשוק ההון
                  </p>
                </div>
              </div>

              {/* Pull quote card */}
              <div className="relative bg-[#121225] rounded-2xl p-5 sm:p-7 border border-white/[0.04] overflow-hidden">
                {/* Accent line */}
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#2ECC71] via-[#1B7340] to-transparent" />

                <Quote className="w-8 h-8 text-[#2ECC71]/15 mb-3" />

                <blockquote className="text-xl font-bold leading-snug text-white/90">
                  &ldquo;המסחר מראה לך מי אתה. כל מי שנכנס לשוק — מגלה את
                  עצמו.&rdquo;
                </blockquote>

                <div className="mt-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B7340]/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#2ECC71]">י</span>
                  </div>
                  <span className="text-sm text-text-muted">ירין מנוח</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Story + Timeline + Credentials */}
          <div className="lg:col-span-7 space-y-12">
            {/* Story text */}
            <ScrollReveal direction="left">
              <div className="space-y-6 text-text-secondary text-lg leading-[1.85]">
                <p className="border-r-2 border-[#1B7340]/40 pr-4 sm:pr-6">
                  התחלתי לסחור ב-2021. עברתי ליוויים וקורסים שונים, ועשיתי את זה
                  תוך כדי תואר בהנדסת תוכנה כהשלמת הכנסה. הבנתי מהר שזה מה שאני
                  אוהב לעשות — את העניין, הריגוש, העצמאות.
                </p>
                <p>
                  באתי מדרום תל אביב. ההורים שלי לא היו בעולם הזה — וזה תמיד
                  סקרן אותי. מרגע שנכנסתי לעולם הזה, הבנתי כמה הוא מעניין, מסקרן,
                  מתפתח.{" "}
                  <span className="text-white font-medium">
                    לא מפסיקים ללמוד.
                  </span>
                </p>
                <p>
                  גם מי שמגיע עם אפס ידע יכול להפוך לאיש הכי מקצועי.{" "}
                  <span className="text-white font-medium">
                    אתה מקבל עצמאות, לומד מי אתה, איך אתה מנתח, איך אתה קורא את
                    השוק.
                  </span>
                </p>
              </div>
            </ScrollReveal>

            {/* Journey Timeline */}
            <ScrollReveal delay={150}>
              <div className="relative">
                <h3 className="text-sm font-semibold text-[#2ECC71] uppercase tracking-wider mb-8">
                  המסע שלי
                </h3>

                {/* Timeline line */}
                <div
                  className="absolute start-[23px] top-[4.5rem] bottom-4 w-px bg-gradient-to-b from-[#2ECC71]/30 via-[#1B7340]/20 to-transparent"
                  aria-hidden="true"
                />

                <div className="space-y-6">
                  {MILESTONES.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.div
                        key={m.year}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex gap-5"
                      >
                        {/* Node */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#121225] border border-white/[0.06] flex items-center justify-center relative z-10">
                          <Icon className="w-5 h-5 text-[#2ECC71]" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-xs font-bold text-[#2ECC71] bg-[#2ECC71]/10 px-2.5 py-1 rounded-md">
                              {m.year}
                            </span>
                            <h4 className="font-bold text-white">{m.title}</h4>
                          </div>
                          <p className="text-text-secondary text-[15px] leading-relaxed">
                            {m.text}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Credential badges */}
            <ScrollReveal delay={300}>
              <div>
                <h3 className="text-sm font-semibold text-[#2ECC71] uppercase tracking-wider mb-5">
                  הסמכות וניסיון
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CREDENTIALS.map((cred, i) => {
                    const Icon = cred.icon;
                    return (
                      <motion.div
                        key={cred.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-3 bg-[#121225] border border-white/[0.04] rounded-xl px-5 py-4"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#1B7340]/[0.12] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#2ECC71]" />
                        </div>
                        <span className="text-sm font-medium text-text-secondary">
                          {cred.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

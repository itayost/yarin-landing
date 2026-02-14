"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";
import { scrollToContact } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/constants";

/* ═══════════════════════ FAQ DATA ═══════════════════════ */

const FAQS = [
  {
    q: "האם צריך ניסיון קודם?",
    a: "בכלל לא. התוכנית מותאמת לרמה שלך, גם אם אתה מתחיל מאפס. נבנה יחד את הבסיס מהשלב הראשון.",
  },
  {
    q: "כמה זמן הליווי?",
    a: "תלוי בחבילה שתבחר. נדבר ונתאים את זה בדיוק בשבילך — בלי התחייבות ארוכת טווח.",
  },
  {
    q: "מה ההבדל מקורס רגיל?",
    a: "כאן אתה מקבל ליווי אישי 1-על-1. אני איתך בכל שלב — לא סתם הקלטה. כל שיחה מותאמת אישית לאתגרים שלך.",
  },
  {
    q: "איך מתחילים?",
    a: "משאירים פרטים בטופס, אני חוזר אליך לשיחת היכרות קצרה — בלי התחייבות.",
  },
  {
    q: "האם זה מתאים גם למי שעובד במשרה מלאה?",
    a: "בהחלט. הליווי גמיש ומותאם ללוח הזמנים שלך. רוב התלמידים שלי עובדים במשרה מלאה.",
  },
];

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-16 md:py-32 mesh-bg">
      {/* Section divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-white/6 to-transparent mb-8 md:mb-24" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-green/2 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-accent-green text-sm font-semibold tracking-wider uppercase mb-3">
              שאלות נפוצות
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-black">
              עוד שאלות?
            </h2>
            <p className="mt-4 text-text-secondary text-lg max-w-md mx-auto">
              התשובות לשאלות הנפוצות ביותר
            </p>
          </div>
        </ScrollReveal>

        {/* ── Accordion ── */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={faq.q} delay={i * 60}>
                <GlowCard className="rounded-2xl">
                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "bg-dark-card border-brand-green/40 shadow-lg shadow-accent-green/3"
                        : "bg-dark-card/50 border-white/4 hover:border-white/8"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-right"
                      aria-expanded={isOpen}
                    >
                      {/* Number indicator */}
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                          isOpen
                            ? "bg-accent-green/15 text-accent-green"
                            : "bg-white/4 text-text-muted"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`flex-1 font-semibold text-[15px] transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-text-secondary"
                        }`}
                      >
                        {faq.q}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                          isOpen
                            ? "bg-accent-green/15"
                            : "bg-white/4"
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isOpen ? "text-accent-green" : "text-text-muted"
                          }`}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: EASE_OUT_EXPO,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pr-8 sm:pr-20">
                            <div className="border-r-2 border-accent-green/20 pr-5">
                              <motion.p
                                initial={{ y: -8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.05,
                                  ease: EASE_OUT_EXPO,
                                }}
                                className="text-text-secondary leading-relaxed text-[15px]"
                              >
                                {faq.a}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Bottom CTA card ── */}
        <ScrollReveal delay={400}>
          <div className="mt-10 animated-border rounded-2xl p-[1.5px]">
            <div className="bg-dark-surface rounded-2xl p-8 text-center">
              <p className="text-lg font-bold text-white mb-2">
                לא מצאת תשובה?
              </p>
              <p className="text-text-muted text-sm mb-6">
                דבר איתי ואשמח לענות על כל שאלה
              </p>
              <button
                onClick={scrollToContact}
                className="cta-btn px-8 py-3.5 rounded-xl font-semibold text-sm group"
              >
                <span className="flex items-center gap-2">
                  צור קשר
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { scrollToContact } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/constants";
import AnimatedNumber from "./AnimatedNumber";

/* ═══════════════════════ CANDLESTICK DATA ═══════════════════════ */

const CANDLES = [
  { o: 42, c: 55, h: 60, l: 38 },
  { o: 55, c: 48, h: 58, l: 44 },
  { o: 48, c: 62, h: 66, l: 45 },
  { o: 62, c: 58, h: 68, l: 54 },
  { o: 58, c: 72, h: 76, l: 55 },
  { o: 72, c: 65, h: 75, l: 62 },
  { o: 65, c: 78, h: 82, l: 63 },
  { o: 78, c: 74, h: 84, l: 70 },
  { o: 74, c: 85, h: 90, l: 72 },
  { o: 85, c: 82, h: 92, l: 78 },
  { o: 82, c: 92, h: 96, l: 80 },
  { o: 92, c: 88, h: 98, l: 85 },
];

/* ═══════════════════════ TICKER DATA ═══════════════════════ */

const TICKER_ITEMS = [
  { symbol: "AAPL", change: "+1.24%", up: true },
  { symbol: "TSLA", change: "+3.87%", up: true },
  { symbol: "BTC", change: "+2.15%", up: true },
  { symbol: "NVDA", change: "-0.92%", up: false },
  { symbol: "AMZN", change: "+1.56%", up: true },
  { symbol: "ETH", change: "+4.32%", up: true },
  { symbol: "META", change: "-0.45%", up: false },
  { symbol: "GOOGL", change: "+0.78%", up: true },
  { symbol: "SPY", change: "+0.94%", up: true },
  { symbol: "QQQ", change: "+1.12%", up: true },
];

/* ═══════════════════════ STATS ═══════════════════════ */

const STATS = [
  { value: 5, suffix: "+", label: "שנות ניסיון", isNumber: true },
  {
    value: 0,
    suffix: "",
    label: "הנדסת תוכנה",
    isNumber: false,
    text: "B.Sc",
  },
  {
    value: 0,
    suffix: "",
    label: "ניהול תיקים",
    isNumber: false,
    text: "רישיון",
  },
];

/* ═══════════════════════ LINE REVEAL ═══════════════════════ */

function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="overflow-hidden block">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.9,
          delay,
          ease: EASE_OUT_EXPO,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const dashboardY = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Aurora background ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]"
        aria-hidden="true"
      >
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#2ECC71"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* ── Ticker tape (desktop only) ── */}
      <div
        className="absolute top-20 left-0 right-0 overflow-hidden hidden lg:block pointer-events-none"
        aria-hidden="true"
      >
        <div className="ticker-tape opacity-25">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-xs font-mono whitespace-nowrap"
            >
              <span className="font-bold text-white/60">{item.symbol}</span>
              <span className={item.up ? "text-accent-green" : "text-red-400"}>
                {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Text column ── */}
          <div className="flex-1 text-center lg:text-right max-w-2xl">
            {/* Headline with cinematic line reveal */}
            <h1 className="text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.75rem] font-black leading-[1.08] tracking-tight">
              <RevealLine delay={0.25}>תתחיל להרוויח</RevealLine>
              <RevealLine delay={0.4}>
                מהשוק{" "}
                <span className="bg-gradient-to-l from-accent-green via-accent-blue to-brand-blue bg-clip-text text-transparent">
                  עם ליווי אישי
                </span>
              </RevealLine>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-7 text-lg sm:text-xl text-text-secondary max-w-lg mx-auto lg:mx-0 lg:me-0 leading-relaxed border-r-2 border-brand-green/50 pr-4 sm:pr-6"
            >
              ליווי 1-על-1 במניות, אופציות, פיוצ&apos;רס וקריפטו.
              <br className="hidden sm:block" />
              מותאם אישית לרמה שלך.
            </motion.p>

            {/* Magnetic CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.75,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-9 flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <button
                onClick={scrollToContact}
                className="relative overflow-hidden group cta-btn text-lg px-10 py-4"
              >
                <span className="relative z-10 flex items-center gap-2">
                  בוא נדבר
                  <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </button>
            </motion.div>

            {/* Stat blocks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.05,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-10 flex items-stretch justify-center lg:justify-start"
            >
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-stretch">
                  {i > 0 && (
                    <div className="w-px bg-white/6 mx-4 sm:mx-6 self-stretch" />
                  )}
                  <div className="text-center lg:text-right">
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {s.isNumber ? (
                        <AnimatedNumber target={s.value} suffix={s.suffix} />
                      ) : (
                        s.text
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-text-muted mt-0.5">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══════════ Trading Dashboard ══════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.5,
              ease: EASE_OUT_EXPO,
            }}
            style={{ y: dashboardY }}
            className="flex-shrink-0 w-full max-w-sm lg:max-w-[440px] relative"
          >

            {/* ── Main chart card ── */}
            <div className="relative bg-dark-card/90 backdrop-blur-xl border border-white/8 rounded-2xl p-6 lg:p-7">
              {/* Green gradient top accent */}
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-l from-accent-green via-brand-green to-transparent rounded-full" />

              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-text-muted text-xs mb-1">תיק השקעות</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      $12,450
                    </span>
                    <span className="text-accent-green text-sm font-bold flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +24.8%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {["1D", "1W", "1M"].map((t, i) => (
                    <span
                      key={t}
                      className={`text-[10px] px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        i === 2
                          ? "bg-brand-green/30 text-accent-green"
                          : "text-text-muted hover:text-white/60"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Candlestick chart */}
              <div className="relative h-36 mb-5">
                <svg
                  viewBox="0 0 240 100"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  {CANDLES.map((c, i) => {
                    const x = i * 20 + 10;
                    const isGreen = c.c > c.o;
                    const bodyTop = 100 - Math.max(c.o, c.c);
                    const bodyHeight = Math.abs(c.c - c.o) || 1;
                    const wickTop = 100 - c.h;
                    const wickBottom = 100 - c.l;

                    return (
                      <motion.g
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.9 + i * 0.06,
                          ease: EASE_OUT_EXPO,
                        }}
                      >
                        {/* Wick */}
                        <line
                          x1={x}
                          y1={wickTop}
                          x2={x}
                          y2={wickBottom}
                          stroke={isGreen ? "#2ECC71" : "#ef4444"}
                          strokeWidth="1"
                          opacity="0.5"
                        />
                        {/* Body */}
                        <rect
                          x={x - 4}
                          y={bodyTop}
                          width="8"
                          height={bodyHeight}
                          rx="1"
                          fill={isGreen ? "#2ECC71" : "#ef4444"}
                          opacity="0.85"
                        />
                      </motion.g>
                    );
                  })}

                  {/* Connecting line through closes */}
                  <motion.path
                    d={`M ${CANDLES.map(
                      (c, i) => `${i * 20 + 10},${100 - c.c}`
                    ).join(" L ")}`}
                    fill="none"
                    stroke="url(#heroLineGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.8,
                      delay: 1.2,
                      ease: EASE_OUT_EXPO,
                    }}
                  />

                  <defs>
                    <linearGradient
                      id="heroLineGrad"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#1B7340" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2ECC71" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Bottom stats row */}
              <div className="flex items-center justify-between pt-4 border-t border-white/6">
                <div className="text-center">
                  <p className="text-xs text-text-muted mb-0.5">Win Rate</p>
                  <p className="text-lg font-bold text-accent-green">87%</p>
                </div>
                <div className="w-px h-8 bg-white/6" />
                <div className="text-center">
                  <p className="text-xs text-text-muted mb-0.5">עסקאות</p>
                  <p className="text-lg font-bold text-white">142</p>
                </div>
                <div className="w-px h-8 bg-white/6" />
                <div className="text-center">
                  <p className="text-xs text-text-muted mb-0.5">
                    Profit Factor
                  </p>
                  <p className="text-lg font-bold text-white">2.4</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-30">
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-float" />
        </div>
      </div>
    </section>
  );
}

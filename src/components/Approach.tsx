import { Check, X } from "lucide-react";
import { APPROACH, APPROACH_DISPLAY, FIT } from "@/lib/content";

/* ═══════════════════════ PEN STRIKE ═══════════════════════
 * Yarin's pen crossing out what the category sells; draws on scroll.
 */

function PenStrike() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-[-4%] top-[52%] h-[0.32em] w-[108%] -translate-y-1/2"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 14 C 70 9, 160 16, 296 8"
        stroke="var(--color-marker)"
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="pen-on-view"
      />
    </svg>
  );
}

/* ═══════════════════════ APPROACH ═══════════════════════ */

export default function Approach() {
  const { lead, pillars, punch, contrast } = APPROACH_DISPLAY;

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative overflow-hidden bg-dark pt-16 pb-20 md:pt-20 md:pb-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* ── Belief: four pillars ── */}
        <h2
          id="approach-heading"
          className="text-center text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-bold text-white/55"
        >
          {lead}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 text-center lg:grid-cols-4">
          {pillars.map((pillar) => (
            <li
              key={pillar}
              className="text-[clamp(1.6rem,1rem+2.2vw,3rem)] leading-[1.05] font-black tracking-[-0.02em] text-balance"
            >
              {pillar}
            </li>
          ))}
        </ul>

        <p className="isolate mt-12 text-center text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] leading-tight font-black md:mt-16">
          {punch.before}
          <span className="relative inline-block">
            <s className="text-white/45 decoration-transparent">{punch.struck}</s>
            <PenStrike />
          </span>
          {punch.after}
        </p>

        {/* ── Contrast pair ── */}
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
          <div className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 px-6 py-7 sm:px-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5">
              <X className="h-5 w-5 text-white/55" aria-hidden="true" />
            </span>
            <p className="isolate text-2xl font-bold text-white/55 md:text-3xl">
              <span className="sr-only">ללא </span>
              <span className="relative inline-block">
                <s className="decoration-transparent">{contrast.rejected}</s>
                <PenStrike />
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-[1.25rem] border border-white/12 bg-dark-card px-6 py-7 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] sm:px-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-green/30">
              <Check className="h-5 w-5 text-accent-green" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <p className="text-2xl leading-snug font-bold text-white md:text-3xl">
              {contrast.chosen}
            </p>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-[60ch] text-center text-xl leading-[1.75] text-white/80 md:mt-16">
          {APPROACH.promise}
        </p>
      </div>

      {/* ── Fit ── */}
      <div className="mx-auto mt-20 max-w-5xl px-5 md:mt-24 md:px-8">
        <div className="rounded-2xl border border-white/12 bg-dark-card px-6 py-8 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] sm:px-10 md:py-10">
          <h3 className="text-center text-2xl font-black md:text-3xl">{FIT.title}</h3>
          <ul className="mx-auto mt-6 grid w-fit gap-x-14 gap-y-4 sm:grid-cols-[auto_auto]">
            {FIT.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-white/85">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/30">
                  <Check className="h-4 w-4 text-accent-green" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex justify-center">
            <a href="#contact" className="cta-btn group px-8 py-3.5 text-base">
              לשיחת אפיון קצרה
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

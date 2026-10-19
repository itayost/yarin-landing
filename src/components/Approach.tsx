import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { APPROACH, APPROACH_DISPLAY, FIT } from "@/lib/content";

/* ═══════════════════════ CREED TICK ═══════════════════════
 * Checklist tick that draws as the ledger scrolls in (see globals.css,
 * "APPROACH: CREED CHECKLIST"); --i sets its place in the sequence.
 */

function CreedTick() {
  return (
    <span
      className="creed-tick grid h-9 w-9 shrink-0 place-items-center rounded-full"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M4 12l5 5L20 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="creed-check"
        />
      </svg>
    </span>
  );
}

function CheckBullet() {
  return (
    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/30">
      <Check className="h-4 w-4 text-accent-green" strokeWidth={2.5} aria-hidden="true" />
    </span>
  );
}

/* ═══════════════════════ APPROACH ═══════════════════════
 * Two paths on a central spine: each belief (a lifted graphite note, ticking
 * off in reading order) stands opposite the habit it rules out (flat, struck).
 * On phones the ruled-out habit sits under its belief so pairs stay together.
 */

export default function Approach() {
  const { lead, mineLabel, notLabel, pairs } = APPROACH_DISPLAY;

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative overflow-clip bg-dark py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2
          id="approach-heading"
          className="text-center text-[clamp(2.4rem,1.3rem+3.4vw,4rem)] leading-[1.05] font-black tracking-[-0.02em]"
        >
          {lead}
        </h2>

        {/* ── Two paths ── */}
        <div className="relative mt-12 md:mt-16">
          <div
            className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/12 md:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/12 bg-dark-card px-6 py-7 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.75)] sm:px-9 md:me-10 md:rotate-[-1deg]">
              <h3 className="text-lg font-bold text-accent-green">{mineLabel}</h3>
              <ol className="creed mt-3">
                {pairs.map(({ mine, not }, i) => (
                  <li
                    key={mine}
                    style={{ "--i": i } as CSSProperties}
                    className="flex items-center gap-4 border-b border-white/10 py-4 last:border-b-0 md:h-28"
                  >
                    <CreedTick />
                    <span className="flex flex-col gap-1">
                      <span className="creed-word text-[clamp(1.35rem,1.1rem+0.9vw,1.9rem)] leading-tight font-black">
                        {mine}
                      </span>
                      <s className="text-base text-white/50 decoration-white/30 md:hidden">
                        <span className="sr-only">{notLabel}: </span>
                        {not}
                      </s>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="hidden px-6 py-7 sm:px-9 md:ms-10 md:block">
              <h3 className="text-lg font-bold text-white/50">{notLabel}</h3>
              <ul className="mt-3">
                {pairs.map(({ not }) => (
                  <li
                    key={not}
                    className="flex h-28 items-center border-b border-white/6 py-4 last:border-b-0"
                  >
                    <s className="text-[clamp(1.2rem,1rem+0.7vw,1.6rem)] leading-tight font-bold text-white/45 decoration-white/30 decoration-2">
                      {not}
                    </s>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-[60ch] text-center text-xl leading-[1.75] text-white/80 md:mt-20">
          {APPROACH.promise}
        </p>

        {/* ── Fit ── */}
        <div className="mx-auto mt-14 max-w-4xl border-t border-white/10 pt-10 text-center">
          <h3 className="text-2xl font-black md:text-3xl">{FIT.title}</h3>
          <ul className="mx-auto mt-6 grid w-fit gap-x-14 gap-y-4 text-start sm:grid-cols-[auto_auto]">
            {FIT.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-white/85">
                <CheckBullet />
                {item}
              </li>
            ))}
          </ul>
          <a href="#contact" className="cta-btn group mt-9 px-8 py-3.5 text-base">
            לשיחת אפיון קצרה
          </a>
        </div>
      </div>
    </section>
  );
}

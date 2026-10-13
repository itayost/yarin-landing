import Image from "next/image";
import { DISCLAIMERS } from "@/lib/content";
import Marquee from "./Marquee";

/* ═══════════════════════ TRADES ═══════════════════════
 * Real screenshots (owner-supplied). Captions name only what is visible on
 * each chart: instrument and timeframe. Never describe outcomes.
 */

const TRADES = [
  { src: "/images/trades/trade-1.webp", w: 760, h: 1176, caption: "Nasdaq 100 Futures · 5m" },
  { src: "/images/trades/trade-2.webp", w: 760, h: 1373, caption: "Nasdaq 100 Futures · 15m" },
  { src: "/images/trades/trade-3.webp", w: 760, h: 994, caption: "Micro Nasdaq (MNQ) · 5m" },
  { src: "/images/trades/trade-4.webp", w: 760, h: 902, caption: "Nasdaq Futures · 1H" },
  { src: "/images/trades/trade-5.webp", w: 760, h: 1337, caption: "NQ1! · 1H" },
];

const TILTS = [
  "-rotate-[1.2deg]",
  "rotate-[0.8deg] mt-10",
  "-rotate-[0.6deg] mt-4",
  "rotate-[1.4deg] mt-14",
  "-rotate-1 mt-6",
];

export default function TradeGallery() {
  return (
    <section
      id="screens"
      aria-labelledby="screens-heading"
      className="relative overflow-hidden bg-dark pt-20 pb-12 md:pt-28 md:pb-14"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2
            id="screens-heading"
            className="isolate max-w-3xl text-[clamp(2.1rem,1.2rem+3vw,3.75rem)] leading-[1.05] font-black tracking-[-0.02em] text-balance"
          >
            ככה זה נראה{" "}
            <span className="relative inline-block">
              מול המסכים
              <svg
                className="pointer-events-none absolute inset-x-[-3%] -bottom-[0.16em] -z-10 h-[0.32em] w-[106%]"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 14 C 80 6, 190 6, 294 12"
                  stroke="var(--color-marker)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  className="pen-on-view"
                />
              </svg>
            </span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/75">
            צילומי מסך אמיתיים מתוך הגרפים שלי.
          </p>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <Marquee
          label="גלריית עסקאות לדוגמה"
          note={
            <p className="text-sm leading-relaxed text-white/65">
              {DISCLAIMERS.examples}
            </p>
          }
        >
          {TRADES.map((t, i) => (
              <li key={t.src} className={`shrink-0 pe-6 md:pe-8 ${TILTS[i]}`}>
                <figure className="w-[15.5rem] rounded-[1.75rem] border border-white/12 bg-dark-card p-2 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:-translate-y-1.5 sm:w-[17rem] lg:w-[18.5rem]">
                  <div className="relative h-[24rem] overflow-hidden rounded-[1.3rem] bg-white sm:h-[27rem] lg:h-[30rem]">
                    <Image
                      src={t.src}
                      alt={`צילום מסך של גרף מסחר: ${t.caption}`}
                      width={t.w}
                      height={t.h}
                      sizes="(min-width: 1024px) 296px, 272px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <figcaption
                    dir="ltr"
                    className="px-3 pt-3 pb-1.5 text-center text-xs font-medium tracking-wide text-white/70 tabular-nums"
                  >
                    {t.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
        </Marquee>
      </div>
    </section>
  );
}

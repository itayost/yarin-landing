import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { IMAGES, TRUST_BADGES } from "@/lib/content";
import HeroMotion from "./HeroMotion";

/* ═══════════════════════ BADGE PLACEMENT ═══════════════════════
 * Mobile: one pinned note listing all three. lg: a staggered row of tilted
 * notes. xl: notes pinned around the headline.
 */

/* Wide screens: 2 + 2 around the headline. Experience and lecturer on the
 * right; the two credentials (B.Sc, specialization) stacked on the left. */
const BADGE_PINS = [
  "lg:rotate-[1.5deg] xl:top-[17%] xl:right-[7%] xl:rotate-[2.5deg]",
  "lg:-rotate-[1.5deg] lg:translate-y-3 xl:top-[24%] xl:left-[6%] xl:translate-y-0 xl:-rotate-2",
  "lg:rotate-1 xl:top-[54%] xl:left-[4%] xl:rotate-[1.5deg]",
  "lg:-rotate-1 lg:translate-y-2 xl:bottom-[10%] xl:right-[10%] xl:translate-y-0 xl:-rotate-[1.5deg]",
];

/* ═══════════════════════ MOTION ═══════════════════════ */

const BADGE_DELAY_START = 500;
const BADGE_DELAY_STEP = 140;
/* The pin lands once its note has settled */
const PIN_LAG = 420;

/* Pointer depth per note in px at the hero's edge (xl + mouse only); the
 * middle note moves against the others so the layer reads as loose paper. */
const BADGE_DEPTH = [18, -14, 24, -10];

const pinStyle = (ms: number) =>
  ({ "--d": `${ms}ms` }) as React.CSSProperties;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/* ═══════════════════════ BACKGROUND ═══════════════════════ */

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <div className="hero-wall">
        <Image
          src={IMAGES.heroTrades}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-settle object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-dark/55" />
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}

/* ═══════════════════════ HEADLINE ═══════════════════════ */

function PenUnderline() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-[-4%] -bottom-[0.14em] -z-10 h-[0.3em] w-[108%]"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 15 C 70 7, 170 5, 294 11"
        stroke="var(--color-marker)"
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="hero-draw"
        style={delay(450)}
      />
      <path
        d="M30 21 C 110 15, 200 15, 270 18"
        stroke="var(--color-marker)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.7"
        pathLength={1}
        className="hero-draw"
        style={delay(650)}
      />
    </svg>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <HeroBackground />
      <HeroMotion />

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 pt-24 pb-8 text-center md:px-8 lg:pt-32 lg:pb-14">
        <h1
          id="hero-heading"
          className="text-[clamp(2.6rem,1rem+5vw,5.25rem)] leading-[1.04] font-black tracking-[-0.02em] text-balance"
        >
          <span className="hero-rise block" style={delay(0)}>
            תתחיל להרוויח
          </span>
          <span className="hero-rise block" style={delay(100)}>
            מהשוק עם{" "}
            <span className="relative inline-block text-accent-green">
              ליווי אישי
              <PenUnderline />
            </span>
          </span>
        </h1>

        <p
          className="hero-rise mt-6 max-w-[36ch] text-lg leading-relaxed text-white/80 sm:mt-7 sm:text-xl"
          style={delay(200)}
        >
          ליווי 1 על 1 במניות, חוזים עתידיים וקריפטו. מותאם אישית
          לרמה שלך.
        </p>

        <div
          className="hero-rise mt-8 flex flex-col items-center gap-4 sm:mt-9 sm:flex-row sm:gap-7"
          style={delay(300)}
        >
          <a href="#contact" className="cta-btn group px-10 py-4 text-lg">
            דברו איתי
            <ArrowLeft
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="#screens"
            className="hero-link text-base font-medium text-white/80"
          >
            דוגמאות מהמסכים
          </a>
        </div>

        <ul
          className="hero-pin relative mt-8 w-full max-w-sm -rotate-1 divide-y divide-white/10 rounded-xl border border-white/12 bg-dark-card/90 px-4 py-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md lg:mt-14 lg:flex lg:max-w-5xl lg:rotate-0 lg:justify-center lg:gap-5 lg:divide-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none xl:pointer-events-none xl:absolute xl:inset-0 xl:mt-0 xl:block xl:max-w-none"
          style={delay(BADGE_DELAY_START)}
          aria-label="ניסיון והכשרה"
        >
          <span
            className="hero-pinhead lg:hidden"
            style={pinStyle(BADGE_DELAY_START + PIN_LAG)}
            aria-hidden="true"
          />
          {TRUST_BADGES.map(({ icon: Icon, value, label }, i) => (
            <li
              key={value}
              className={`hero-pin hero-badge relative flex items-center gap-3 py-2.5 text-start lg:max-w-[17.5rem] lg:flex-1 lg:rounded-xl lg:border lg:border-white/12 lg:bg-dark-card/90 lg:px-4 lg:py-3 lg:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] lg:backdrop-blur-md xl:pointer-events-auto xl:absolute ${BADGE_PINS[i]}`}
              style={
                {
                  ...delay(BADGE_DELAY_START + i * BADGE_DELAY_STEP),
                  "--depth": BADGE_DEPTH[i],
                } as React.CSSProperties
              }
            >
              <span
                className="hero-pinhead hidden lg:block"
                style={pinStyle(
                  BADGE_DELAY_START + i * BADGE_DELAY_STEP + PIN_LAG
                )}
                aria-hidden="true"
              />
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-green/25 lg:h-10 lg:w-10">
                <Icon
                  className="h-5 w-5 text-accent-green"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <p className="leading-snug text-pretty">
                <span className="text-base font-extrabold text-white lg:block lg:text-lg">
                  <bdi dir="ltr">{value}</bdi>
                </span>{" "}
                <span className="text-sm text-white/75 lg:block">{label}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

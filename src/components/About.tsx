import Image from "next/image";
import { ABOUT, ABOUT_BEATS, HOOK_PEN_WORD, IMAGES } from "@/lib/content";

/* ═══════════════════════ PEN UNDERLINE ═══════════════════════ */

function PenUnderline() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-[-6%] -bottom-[0.12em] -z-10 h-[0.32em] w-[112%]"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 15 C 80 7, 190 6, 294 12"
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

/* ═══════════════════════ ABOUT ═══════════════════════
 * Hook line (who he is), then three beats (the proof), each with one big
 * figure. Portrait sits on the left from lg up so Yarin (photographed facing
 * right) looks into his own story.
 */

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-dark-section py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2
          id="about-heading"
          className="isolate text-center text-[clamp(2.4rem,1.2rem+4vw,4.5rem)] leading-[1.04] font-black tracking-[-0.02em]"
        >
          <span className="block text-white/40">{ABOUT.title}</span>
          <span className="block">
            {ABOUT.hook.map((word, i) => (
              <span key={word}>
                {i > 0 && " "}
                {word.startsWith(HOOK_PEN_WORD) ? (
                  <span className="relative inline-block">
                    {word}
                    <PenUnderline />
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </span>
        </h2>
        <p className="mt-5 text-center text-xl font-bold text-accent-green">
          {ABOUT.name} | {ABOUT.role}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-12 px-5 md:mt-16 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col justify-center lg:col-span-7">
          <ol className="border-t border-white/10">
            {ABOUT_BEATS.map(({ figure, title, segments }) => (
              <li
                key={title}
                className="grid grid-cols-1 gap-3 border-b border-white/10 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 sm:block">
                  <p className="text-4xl leading-none font-black text-white tabular-nums sm:text-5xl">
                    <bdi dir="ltr">{figure.value}</bdi>
                  </p>
                  {figure.lines.length > 0 && (
                    <ul className="text-sm leading-snug text-white/65 sm:mt-2 sm:space-y-1">
                      {figure.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 max-w-[56ch] text-lg leading-[1.75] text-white/75">
                    {segments.map(({ text, isStrong }) =>
                      isStrong ? (
                        <strong key={text} className="font-bold text-white">
                          {text}
                        </strong>
                      ) : (
                        <span key={text}>{text}</span>
                      )
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Portrait */}
        <figure className="relative order-first lg:order-none lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/12 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)] lg:rotate-[1.2deg]">
            <Image
              src={IMAGES.portrait}
              alt="ירין מנוח"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[35%_30%]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}

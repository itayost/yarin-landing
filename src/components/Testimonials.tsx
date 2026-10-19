import { Star } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { TESTIMONIALS, type Testimonial } from "@/lib/content";
import Marquee from "./Marquee";

/* Slower than the trades marquee: these are sentences people read. */
const REVIEWS_SPEED_PX_PER_SECOND = 26;

/* ═══════════════════════ CARD ═══════════════════════ */

function SourceMark({ t }: { t: Testimonial }) {
  if (t.source === "whatsapp") {
    return (
      <WhatsAppIcon className="h-5 w-5 text-whatsapp" label="הודעת וואטסאפ" />
    );
  }
  const stars = t.stars ?? 5;
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${stars} כוכבים מתוך 5`}>
      {Array.from({ length: stars }).map((_, s) => (
        <Star key={s} className="h-4 w-4 fill-accent-green text-accent-green" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <li className={`shrink-0 pe-5 md:pe-6 ${index % 2 === 0 ? "pt-2" : "pt-8"}`}>
      <figure
        className={`flex w-[min(80vw,26rem)] flex-col rounded-[1.25rem] border border-white/12 bg-dark-card p-7 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] sm:p-8 ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
      >
        <SourceMark t={t} />
        <blockquote className="mt-5 flex-1 text-lg leading-relaxed font-medium text-white/90 text-pretty lg:text-xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 border-t border-white/10 pt-5 text-sm">
          {t.name && <span className="font-bold text-white">{t.name} · </span>}
          <span className="text-white/65">{t.context}</span>
        </figcaption>
      </figure>
    </li>
  );
}

/* ═══════════════════════ SECTION ═══════════════════════ */

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-dark-deep pt-20 pb-12 md:pt-28 md:pb-14"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2
          id="testimonials-heading"
          className="text-center text-[clamp(2.1rem,1.2rem+3vw,3.5rem)] leading-[1.05] font-black tracking-[-0.02em]"
        >
          מה אומרים התלמידים
        </h2>
      </div>

      <div className="mt-10 md:mt-14">
        <Marquee label="ביקורות והודעות של תלמידים" speed={REVIEWS_SPEED_PX_PER_SECOND}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.quote} t={t} index={i} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/content";

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-dark pt-16 pb-20 md:pt-20 md:pb-32"
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h2
          id="faq-heading"
          className="text-center text-[clamp(2.1rem,1.2rem+3vw,3.5rem)] leading-[1.05] font-black tracking-[-0.02em]"
        >
          שאלות נפוצות
        </h2>

        <div className="mt-10 border-t border-white/10 md:mt-14">
          {FAQ_ITEMS.map(({ q, a }) => (
            <details key={q} className="faq-item group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold text-white transition-colors hover:text-accent-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-marker)] md:text-xl [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  className="h-5 w-5 shrink-0 text-accent-green transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="faq-answer max-w-[62ch] pb-7 text-lg leading-[1.75] text-white/80">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

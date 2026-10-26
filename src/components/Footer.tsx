"use client";

import { Instagram, Phone, ArrowUp, ArrowUpLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { ABOUT, AFFILIATE_LINKS, AFFILIATE_NOTE, DISCLAIMERS, IMAGES } from "@/lib/content";
import EmailMenu from "./EmailMenu";

/* ═══════════════════════ NAV LINKS ═══════════════════════ */

const NAV_LINKS = [
  { label: "מי אני", href: "#about" },
  { label: "הגישה שלי", href: "#approach" },
  { label: "ביקורות", href: "#testimonials" },
  { label: "שאלות נפוצות", href: "#faq" },
  { label: "צור קשר", href: "#contact" },
];

/* X mark drawn in the lucide stroke language (lucide's Twitter bird is the
 * retired brand). */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h4.5L20 20h-4.5z" />
      <path d="M4 20l6.6-6.9M20 4l-6.6 6.9" />
    </svg>
  );
}

const SOCIALS = [
  {
    icon: Instagram,
    href: CONTACT.instagram,
    label: "Instagram",
    hoverBg: "hover:bg-[#E1306C]/20",
    hoverText: "hover:text-[#E1306C]",
  },
  {
    icon: XIcon,
    href: CONTACT.twitter,
    label: "X",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-white",
  },
  {
    icon: Phone,
    href: CONTACT.phoneTel,
    label: "טלפון",
    hoverBg: "hover:bg-brand-green/20",
    hoverText: "hover:text-accent-green",
  },
];

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark-deep border-t border-white/4">
      {/* One centred column: brand, nav, partners, disclaimer, then socials and legal */}
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 pt-14 pb-8 text-center md:px-8">
        {/* ── Brand ── */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <Image src={IMAGES.logoMark} alt="" width={32} height={34} className="h-8 w-auto" />
          <span className="text-accent-green">ירין</span>
          <span className="text-white">מנוח</span>
        </a>
        <p className="mt-3 text-sm text-text-secondary text-balance">
          {ABOUT.role}. ליווי אישי 1 על 1 מול המסכים.
        </p>

        {/* ── Section nav links ── */}
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Partner platforms (affiliate links) ── */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            <span className="text-sm text-text-secondary">{AFFILIATE_NOTE.title}</span>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {AFFILIATE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3.5 py-1.5 text-sm font-medium text-white/85 transition-colors duration-300 hover:border-white/15 hover:bg-white/10 hover:text-white"
                  >
                    <bdi dir="ltr">{link.label}</bdi>
                    <ArrowUpLeft
                      className="h-3.5 w-3.5 text-white/45 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(נפתח בחלון חדש)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-secondary text-balance">
          {DISCLAIMERS.site}
        </p>

        {/* ── Divider ── */}
        <div className="mt-8 h-px w-full bg-gradient-to-l from-transparent via-white/6 to-transparent" />

        {/* ── Bottom: Social + Copyright + Back to top ── */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="relative flex items-center gap-2">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`w-10 h-10 rounded-full bg-white/4 ${s.hoverBg} flex items-center justify-center text-text-secondary ${s.hoverText} transition-all duration-300`}
                  aria-label={s.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
            <EmailMenu />
          </div>

          <div className="flex flex-col items-center gap-2 text-xs text-text-secondary sm:flex-row sm:gap-4">
            <p>&copy; {year} ירין מנוח. כל הזכויות שמורות.</p>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" aria-hidden="true" />
            <Link href="/privacy" className="underline-offset-4 transition-colors hover:text-white hover:underline">
              מדיניות פרטיות
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-green transition-colors duration-300"
          >
            <span>חזרה למעלה</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

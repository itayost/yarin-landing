"use client";

import { Instagram, Phone, Mail, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { ABOUT, DISCLAIMERS, IMAGES } from "@/lib/content";

/* ═══════════════════════ NAV LINKS ═══════════════════════ */

const NAV_LINKS = [
  { label: "מי אני", href: "#about" },
  { label: "מול המסכים", href: "#screens" },
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
  {
    icon: Mail,
    href: `mailto:${CONTACT.email}`,
    label: "אימייל",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-white",
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
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 pb-8">
        {/* ── Top: Brand + Nav + Back to top ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
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
            <p className="text-sm text-text-secondary max-w-[240px]">
              {ABOUT.role}. ליווי אישי 1 על 1 מול המסכים.
            </p>
          </div>

          {/* Section nav links */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 md:gap-x-6">
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

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex items-center gap-2 text-sm text-text-secondary hover:text-accent-green transition-colors duration-300 flex-shrink-0"
            aria-label="חזרה למעלה"
          >
            <span>חזרה למעלה</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* ── Disclaimer ── */}
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-text-secondary">
          {DISCLAIMERS.site}
        </p>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-l from-transparent via-white/6 to-transparent" />

        {/* ── Bottom: Social + Copyright ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-2">
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
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-col items-center gap-2 text-xs text-text-secondary sm:flex-row sm:gap-4">
            <p>&copy; {year} ירין מנוח. כל הזכויות שמורות.</p>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" aria-hidden="true" />
            <Link href="/privacy" className="underline-offset-4 transition-colors hover:text-white hover:underline">
              מדיניות פרטיות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

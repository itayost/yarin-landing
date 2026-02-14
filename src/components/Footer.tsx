"use client";

import { Instagram, Twitter, Phone, Mail, ArrowUp } from "lucide-react";
import { CONTACT } from "@/lib/constants";

/* ═══════════════════════ NAV LINKS ═══════════════════════ */

const NAV_LINKS = [
  { label: "למה ליווי?", href: "#why" },
  { label: "חבילות", href: "#services" },
  { label: "עליי", href: "#about" },
  { label: "ביקורות", href: "#testimonials" },
  { label: "שאלות נפוצות", href: "#faq" },
  { label: "צור קשר", href: "#contact" },
];

const SOCIALS = [
  {
    icon: Instagram,
    href: CONTACT.instagram,
    label: "Instagram",
    hoverBg: "hover:bg-[#E1306C]/20",
    hoverText: "hover:text-[#E1306C]",
  },
  {
    icon: Twitter,
    href: CONTACT.twitter,
    label: "X (Twitter)",
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
    hoverBg: "hover:bg-brand-blue/20",
    hoverText: "hover:text-accent-blue",
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
              className="text-xl font-bold tracking-tight"
            >
              <span className="text-accent-green">ירין</span>{" "}
              <span className="text-white">מנוח</span>
            </a>
            <p className="text-sm text-text-muted max-w-[240px]">
              מנטור מסחר בשוק ההון — ליווי אישי שמביא תוצאות
            </p>
          </div>

          {/* Section nav links */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 md:gap-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex items-center gap-2 text-sm text-text-muted hover:text-accent-green transition-colors duration-300 flex-shrink-0"
            aria-label="חזרה למעלה"
          >
            <span>חזרה למעלה</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

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
                  className={`w-10 h-10 rounded-full bg-white/4 ${s.hoverBg} flex items-center justify-center text-text-muted ${s.hoverText} transition-all duration-300`}
                  aria-label={s.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-text-muted/60">
            <p>&copy; {year} ירין מנוח. כל הזכויות שמורות.</p>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-text-muted/30" />
            <a
              href="#"
              className="hover:text-text-muted transition-colors"
            >
              מדיניות פרטיות
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

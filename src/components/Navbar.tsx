"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToContact } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { IMAGES } from "@/lib/content";

/* ═══════════════════════ NAV DATA ═══════════════════════ */

const NAV_LINKS = [
  { label: "מי אני", href: "#about" },
  { label: "מול המסכים", href: "#screens" },
  { label: "הגישה שלי", href: "#approach" },
  { label: "ביקורות", href: "#testimonials" },
  { label: "שאלות נפוצות", href: "#faq" },
];

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function Navbar() {
  const [scrollStage, setScrollStage] = useState<"top" | "scrolled" | "deep">(
    "top"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* ── Scroll stage detection ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 20) setScrollStage("top");
      else if (y < 300) setScrollStage("scrolled");
      else setScrollStage("deep");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Scrollspy with IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    };
  }, [menuOpen]);

  const handleNav = useCallback(
    (href: string) => {
      setMenuOpen(false);
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, menuOpen ? 150 : 0);
    },
    [menuOpen]
  );

  /* ── Scroll stage styles ── */
  const navBg =
    scrollStage === "top"
      ? "bg-transparent"
      : scrollStage === "scrolled"
        ? "bg-dark/65 backdrop-blur-xl backdrop-saturate-[180%] border-b border-white/6 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        : "bg-dark/80 backdrop-blur-2xl backdrop-saturate-[180%] border-b border-white/6 shadow-[0_4px_30px_rgba(0,0,0,0.3)]";

  const navHeight =
    scrollStage === "top"
      ? "h-20"
      : scrollStage === "scrolled"
        ? "h-[72px]"
        : "h-16";

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${navBg}`}
      >
        {/* Gradient bottom border (visible when scrolled) */}
        {scrollStage !== "top" && (
          <div
            className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-l from-transparent via-accent-green/10 to-transparent"
            aria-hidden="true"
          />
        )}

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${navHeight}`}
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center gap-2"
            >
              <Image
                src={IMAGES.logoMark}
                alt=""
                width={36}
                height={38}
                priority
                className="h-9 w-auto transition-transform duration-300 group-hover:-rotate-6"
              />
              <span className="text-xl font-extrabold tracking-tight text-accent-green">
                ירין
              </span>
              <span className="text-xl font-medium tracking-tight text-white">
                מנוח
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={`relative text-sm px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white bg-white/6"
                        : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={scrollToContact}
                className="cta-btn text-sm px-6 py-2.5"
              >
                דברו איתי
              </button>
            </div>

            {/* Mobile: Animated hamburger-to-X */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5"
              aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span
                  className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                    menuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-2xl md:hidden"
          >
            {/* Close button (top-left for RTL) */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 start-5 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 z-10"
              aria-label="סגור תפריט"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className="block h-[2px] bg-white rounded-full rotate-45 translate-y-[3.5px]" />
                <span className="block h-[2px] bg-white rounded-full -rotate-45 -translate-y-[3.5px]" />
              </div>
            </button>

            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.4,
                    ease: EASE_OUT_EXPO,
                  }}
                  onClick={() => handleNav(link.href)}
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-accent-green"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  delay: 0.08 + NAV_LINKS.length * 0.06,
                  duration: 0.4,
                  ease: EASE_OUT_EXPO,
                }}
                onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => scrollToContact(), 150);
                }}
                className="cta-btn text-lg px-10 py-4 mt-4"
              >
                דברו איתי
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

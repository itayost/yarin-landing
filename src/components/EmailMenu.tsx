"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, ExternalLink, Mail } from "lucide-react";
import { CONTACT } from "@/lib/constants";

/* ═══════════════════════ EMAIL MENU ═══════════════════════
 * A bare mailto link does nothing on computers with no mail app set up, so
 * the footer's mail icon offers three ways instead: Gmail on the web, the
 * device's mail app, or copying the address. Disclosure pattern: closes on
 * Escape (focus returns to the icon), on an outside click and after a pick.
 * The panel is positioned against the social row (nearest positioned
 * ancestor) so it stays centred and on screen on phones.
 */

const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.email)}`;
const COPIED_MS = 2_000;

const ITEM =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white";

export default function EmailMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const close = () => setIsOpen(false);

  const copyAddress = () => {
    navigator.clipboard?.writeText(CONTACT.email).then(
      () => setIsCopied(true),
      () => setIsCopied(false)
    );
  };

  return (
    <div ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="אימייל"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/4 text-text-secondary transition-all duration-300 hover:bg-white/10 hover:text-white aria-expanded:bg-white/10 aria-expanded:text-white"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="field-error-in absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 rounded-xl border border-white/12 bg-dark-card p-1.5 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)]"
        >
          <p className="px-3 pt-2 pb-1.5 text-start text-xs text-white/55">
            <bdi dir="ltr">{CONTACT.email}</bdi>
          </p>
          <a href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer" onClick={close} className={ITEM}>
            <ExternalLink className="h-4 w-4 shrink-0 text-white/55" aria-hidden="true" />
            פתיחה ב-Gmail
            <span className="sr-only">(נפתח בחלון חדש)</span>
          </a>
          <a href={`mailto:${CONTACT.email}`} onClick={close} className={ITEM}>
            <Mail className="h-4 w-4 shrink-0 text-white/55" aria-hidden="true" />
            אפליקציית המייל
          </a>
          <button type="button" onClick={copyAddress} className={ITEM}>
            {isCopied ? (
              <Check className="h-4 w-4 shrink-0 text-accent-green" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4 shrink-0 text-white/55" aria-hidden="true" />
            )}
            <span aria-live="polite">{isCopied ? "הכתובת הועתקה" : "העתקת הכתובת"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

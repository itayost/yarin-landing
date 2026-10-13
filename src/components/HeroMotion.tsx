"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════ HERO MOTION ═══════════════════════
 * Writes pointer position into CSS variables (--hero-px / --hero-py, -0.5..0.5)
 * on the hero section so the pinned notes and the trade wall can shift at
 * different depths, and flags the section offscreen so the wall drift pauses.
 * Depth is desktop-with-mouse only and off under reduced motion; all visuals
 * live in CSS, this component renders nothing visible.
 */

const DEPTH_QUERY = "(pointer: fine) and (min-width: 1280px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export default function HeroMotion() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = anchorRef.current?.closest("section");
    if (!section) return;

    const visibility = new IntersectionObserver(([entry]) => {
      section.dataset.offscreen = String(!entry.isIntersecting);
    });
    visibility.observe(section);

    const depth = window.matchMedia(DEPTH_QUERY);
    const reduced = window.matchMedia(REDUCED_QUERY);
    let frame = 0;

    const setPointer = (x: number, y: number) => {
      section.style.setProperty("--hero-px", x.toFixed(3));
      section.style.setProperty("--hero-py", y.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      if (!depth.matches || reduced.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        setPointer(
          (event.clientX - rect.left) / rect.width - 0.5,
          (event.clientY - rect.top) / rect.height - 0.5
        );
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      setPointer(0, 0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      visibility.disconnect();
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={anchorRef} hidden />;
}

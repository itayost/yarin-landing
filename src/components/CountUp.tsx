"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/* ═══════════════════════ COUNT UP ═══════════════════════
 * Counts a figure like "200+" up from zero the first time it scrolls into
 * view. Server HTML holds the final value, so no-JS and reduced-motion
 * visitors simply see it. An invisible copy reserves the final width so
 * neighbouring text does not shift while the digits grow.
 */

const DURATION_S = 1.6;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const FIGURE_PATTERN = /^(\d+)(\D*)$/;

export default function CountUp({ value }: { value: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();

  const match = FIGURE_PATTERN.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  /* Reset to zero before the figure is seen, so the count starts from 0 */
  useEffect(() => {
    if (target === null || shouldReduceMotion || !digitsRef.current) return;
    if (!isInView) digitsRef.current.textContent = `0${suffix}`;
  }, [target, suffix, shouldReduceMotion, isInView]);

  useEffect(() => {
    if (target === null || shouldReduceMotion || !isInView) return;
    const controls = animate(0, target, {
      duration: DURATION_S,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        if (digitsRef.current) {
          digitsRef.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [target, suffix, shouldReduceMotion, isInView]);

  if (target === null) return <>{value}</>;

  return (
    <span ref={containerRef} className="inline-grid justify-items-end">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={digitsRef} aria-hidden="true" className="col-start-1 row-start-1">
        {value}
      </span>
    </span>
  );
}

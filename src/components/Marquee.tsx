"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* ═══════════════════════ MARQUEE ═══════════════════════
 * Seamless auto-moving strip. One "run" repeats the item set as many times as
 * needed to cover the viewport; the track holds two runs and slides by exactly
 * one run (translateX 50%), so the next copy is always already in view and the
 * loop never shows a gap, however wide the screen. Speed stays constant
 * regardless of how many copies are needed.
 *
 * Pauses on hover, on keyboard focus, on tap (touch screens) and while
 * offscreen.
 * With reduced motion it falls back to a manually scrollable single set.
 *
 * Items must space themselves with padding-inline-end (not flex gap) so every
 * copy has an identical width.
 */

const DEFAULT_SPEED_PX_PER_SECOND = 40;

export default function Marquee({
  label,
  note,
  speed = DEFAULT_SPEED_PX_PER_SECOND,
  children,
}: {
  label: string;
  note?: ReactNode;
  /* pixels per second; lower it for text people need to read */
  speed?: number;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLOListElement>(null);
  const [copiesPerRun, setCopiesPerRun] = useState(1);
  const [durationSeconds, setDurationSeconds] = useState(40);
  const [isOffscreen, setIsOffscreen] = useState(false);
  /* Touch screens have no hover: a tap toggles the motion (WCAG 2.2.2). */
  const [isTapPaused, setIsTapPaused] = useState(false);

  /* A non-essential loop should not run while nobody can see it. */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsOffscreen(!entry.isIntersecting)
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (!viewport || !set) return;
    const measure = () => {
      const setWidth = set.getBoundingClientRect().width;
      if (setWidth === 0) return;
      const copies = Math.max(1, Math.ceil(viewport.clientWidth / setWidth));
      setCopiesPerRun(copies);
      setDurationSeconds((copies * setWidth) / speed);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(set);
    return () => observer.disconnect();
  }, [speed]);

  /* Two runs; only the very first set is exposed to assistive tech. */
  const totalSets = copiesPerRun * 2;

  return (
    <>
      <div
        ref={viewportRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="marquee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-marker)]"
        data-offscreen={isOffscreen}
        data-paused={isTapPaused}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") setIsTapPaused((paused) => !paused);
        }}
      >
        <div
          className="marquee-track"
          style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
        >
          {Array.from({ length: totalSets }, (_, i) =>
            i === 0 ? (
              <ol key={i} ref={setRef} className="flex shrink-0 items-start">
                {children}
              </ol>
            ) : (
              <ol
                key={i}
                className="marquee-clone flex shrink-0 items-start"
                aria-hidden="true"
                inert
              >
                {children}
              </ol>
            )
          )}
        </div>
      </div>

      {note && (
        <div className="mx-auto mt-2 max-w-3xl px-5 text-center md:px-8">{note}</div>
      )}
    </>
  );
}

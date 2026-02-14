"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useInView, animate } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/constants";

export default function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: EASE_OUT_EXPO,
      });
      const unsub = count.on("change", (v) => {
        if (ref.current)
          ref.current.textContent = prefix + Math.round(v) + suffix;
      });
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, count, target, suffix, prefix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

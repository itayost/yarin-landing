"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/* Makes every framer-motion animation honor prefers-reduced-motion: movement
 * is dropped, opacity changes that carry state are kept. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * template.tsx (not layout.tsx) remounts on every navigation, which is what
 * gives each route its own enter animation. Deliberately quiet — a short
 * fade-and-rise, so moving between the landing page and /blog reads as a
 * transition rather than a hard cut.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE }
      }
    >
      {children}
    </motion.div>
  );
}

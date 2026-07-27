"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function DrawRule({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      data-draw-rule
      className={`h-px w-full origin-left bg-border ${className ?? ""}`}
      initial={shouldReduceMotion ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay: delay / 1000, ease: EASE }
      }
    />
  );
}

"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const OFFSET_PX = 12;
const EASE = [0.16, 1, 0.3, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      data-fade-up
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: OFFSET_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: delay / 1000, ease: EASE }
      }
    >
      {children}
    </motion.div>
  );
}

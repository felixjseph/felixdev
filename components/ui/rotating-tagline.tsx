"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL_MS = 4000;

export function RotatingTagline({ taglines }: { taglines: string[] }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Reduced motion gets the first line, held. Auto-rotating text is
    // motion *and* auto-updating content, so we opt out of both.
    if (shouldReduceMotion) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % taglines.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [shouldReduceMotion, taglines.length]);

  return (
    // Grid stack: every tagline occupies the same cell, so the box is sized
    // to the tallest one and swapping lines never shifts the layout below.
    <span className="grid">
      {taglines.map((tagline) => (
        <span
          key={tagline}
          aria-hidden
          className="invisible [grid-area:1/1]"
        >
          {tagline}
        </span>
      ))}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="[grid-area:1/1]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{
            opacity: 1,
            y: 0,
            // Enter is the slower half so the line settles rather than snaps.
            transition: shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: EASE },
          }}
          exit={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -8,
                  // Leave quickly: `mode="wait"` holds the enter until this
                  // finishes, so a slow exit reads as a blank gap.
                  transition: { duration: 0.22, ease: "easeIn" },
                }
          }
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

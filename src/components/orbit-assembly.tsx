"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  INTRO_STORAGE_KEY,
  INTRO_VERSION,
  shouldPlayIntro,
} from "@/lib/intro-preference";

const INTRO_DURATION_MS = 1050;

function readIntroPreference() {
  try {
    return localStorage.getItem(INTRO_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveIntroPreference() {
  try {
    localStorage.setItem(INTRO_STORAGE_KEY, INTRO_VERSION);
  } catch {
    // Storage access is optional; the intro remains accessible if it is blocked.
  }
}

export function OrbitAssembly() {
  const prefersReducedMotion = useReducedMotion();
  const [hasFinished, setHasFinished] = useState(false);
  const shouldShowForVisitor = useSyncExternalStore(
    () => () => {},
    () => {
      const reducedMotion =
        prefersReducedMotion === true ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return shouldPlayIntro(readIntroPreference(), reducedMotion);
    },
    () => false,
  );
  const isVisible = shouldShowForVisitor && !hasFinished;

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timer = window.setTimeout(() => {
      saveIntroPreference();
      setHasFinished(true);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isVisible]);

  const skipIntro = () => {
    saveIntroPreference();
    setHasFinished(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-label="Orbit Assembly introduction"
      className="fixed inset-0 z-[100] grid place-items-center bg-[var(--color-bg)] px-6"
      role="status"
    >
      <button
        className="absolute right-5 top-5 border-2 border-[var(--color-text)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold"
        onClick={skipIntro}
        type="button"
      >
        Skip intro
      </button>
      <motion.div
        animate={{ opacity: [0, 1, 1, 0], scale: [0.88, 1, 1, 1.06] }}
        className="grid h-44 w-44 place-items-center rounded-full border-2 border-[var(--color-text)] bg-[var(--color-support)] text-center font-semibold"
        transition={{ duration: INTRO_DURATION_MS / 1000, ease: "easeInOut" }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em]">Orbit Assembly</span>
      </motion.div>
    </div>
  );
}

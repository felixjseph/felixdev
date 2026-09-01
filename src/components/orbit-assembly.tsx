"use client";

import Image from "next/image";
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
        animate={{ opacity: [0, 1, 1, 0], scale: [0.94, 1, 1, 1.02] }}
        aria-hidden="true"
        className="orbit-assembly-stage"
        transition={{
          duration: INTRO_DURATION_MS / 1000,
          ease: "easeInOut",
          times: [0, 0.14, 0.82, 1],
        }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 1, 0], x: [-150, 0, 0, 0] }}
          className="orbit-assembly-signal"
          data-intro-signal
          transition={{ duration: 0.44, ease: "easeOut" }}
        />
        <motion.div
          animate={{ opacity: [0, 0, 1], rotate: [-18, 0, 0], scale: [0.7, 0.7, 1] }}
          className="orbit-assembly-ring"
          transition={{ duration: 0.66, ease: "easeOut", times: [0, 0.38, 1] }}
        />
        <motion.div
          animate={{ opacity: [0, 0, 1], scale: [0.72, 0.72, 1] }}
          className="orbit-assembly-core"
          transition={{ duration: 0.56, ease: "easeOut", times: [0, 0.3, 1] }}
        >
          <Image
            alt=""
            className="orbit-assembly-portrait"
            height={900}
            src="/images/portrait-fallback.svg"
            width={720}
          />
        </motion.div>
        <ol className="orbit-assembly-nodes">
          {["Build", "Automate", "Improve"].map((step, index) => (
            <motion.li
              animate={{ opacity: [0, 0, 1], scale: [0.8, 0.8, 1] }}
              className="orbit-assembly-node"
              data-intro-node
              key={step}
              transition={{
                delay: 0.34 + index * 0.07,
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              {step}
            </motion.li>
          ))}
        </ol>
        <span className="orbit-assembly-label">Orbit Assembly</span>
      </motion.div>
    </div>
  );
}

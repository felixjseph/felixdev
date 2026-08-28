"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState, type PointerEvent } from "react";
import { homepageContent } from "@/content/homepage";
import { ResumeAction } from "./resume-action";

const MAX_TRANSLATION = 12;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function HumanOrbit() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 240, damping: 24, mass: 0.35 };
  const portraitX = useSpring(x, springConfig);
  const portraitY = useSpring(y, springConfig);
  const portraitRotateX = useSpring(rotateX, springConfig);
  const portraitRotateY = useSpring(rotateY, springConfig);
  const nodesX = useTransform(portraitX, (value) => value * -0.5);
  const nodesY = useTransform(portraitY, (value) => value * -0.5);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerCapability = () => setHasFinePointer(mediaQuery.matches);

    updatePointerCapability();
    mediaQuery.addEventListener("change", updatePointerCapability);
    return () => mediaQuery.removeEventListener("change", updatePointerCapability);
  }, []);

  const resetPortrait = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5);
    const vertical = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5);

    x.set(horizontal * MAX_TRANSLATION * 2);
    y.set(vertical * MAX_TRANSLATION * 2);
    rotateY.set(horizontal * 8);
    rotateX.set(vertical * -8);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8"
      id="hero"
    >
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.16em] text-[var(--color-accent)]">
          {homepageContent.role}
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl" id="hero-heading">
          {homepageContent.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[color-mix(in_srgb,var(--color-text)_76%,transparent)]">
          I build clear, durable digital systems that make practical work easier to run.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="border-2 border-[var(--color-text)] bg-[var(--color-accent)] px-5 py-3 font-semibold text-[var(--color-accent-foreground)] shadow-[4px_4px_0_var(--color-text)]"
            data-accent-surface="primary"
            href="#work"
          >
            {homepageContent.primaryCta}
          </a>
          <ResumeAction
            className="border-2 border-[var(--color-text)] px-5 py-3 font-semibold"
            label={homepageContent.secondaryCta}
          />
        </div>
      </div>

      <div
        className="human-orbit-visual"
        data-orbit-system
        data-pointer-cap={MAX_TRANSLATION}
        onPointerLeave={resetPortrait}
        onPointerMove={followPointer}
      >
        <div aria-hidden="true" className="human-orbit-ring" />
        <motion.div
          className="human-orbit-core"
          style={{
            rotateX: portraitRotateX,
            rotateY: portraitRotateY,
            transformPerspective: 1000,
            x: portraitX,
            y: portraitY,
          }}
        >
          <Image
            alt="Felix Castañeda portrait placeholder"
            className="human-orbit-portrait"
            height={900}
            priority
            src="/images/portrait-fallback.svg"
            width={720}
          />
          <span className="human-orbit-fallback-label">Development portrait</span>
        </motion.div>
        <motion.ol
          aria-label="How Felix works"
          className="human-orbit-nodes"
          style={{ x: nodesX, y: nodesY }}
        >
          {["Build", "Automate", "Improve"].map((step, index) => (
            <li className="human-orbit-node" key={step}>
              <span aria-hidden="true">0{index + 1}</span>
              <span data-orbit-node>{step}</span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

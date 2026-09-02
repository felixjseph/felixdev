"use client";

import type { CSSProperties, PointerEvent } from "react";
import { ArrowDownRightIcon, ArrowRightIcon } from "./ui-icons";

const floatingSignals = [
  { left: "8%", top: "22%", size: "4px", delay: "-2s", duration: "12s" },
  { left: "16%", top: "68%", size: "3px", delay: "-8s", duration: "15s" },
  { left: "28%", top: "38%", size: "3px", delay: "-11s", duration: "18s" },
  { left: "39%", top: "16%", size: "5px", delay: "-4s", duration: "17s" },
  { left: "52%", top: "78%", size: "3px", delay: "-10s", duration: "13s" },
  { left: "65%", top: "31%", size: "4px", delay: "-6s", duration: "16s" },
  { left: "76%", top: "72%", size: "3px", delay: "-13s", duration: "19s" },
  { left: "87%", top: "20%", size: "4px", delay: "-1s", duration: "14s" },
  { left: "93%", top: "58%", size: "3px", delay: "-9s", duration: "17s" },
] as const;

type SignalStyle = CSSProperties & {
  "--signal-delay": string;
  "--signal-duration": string;
  "--signal-size": string;
};

export function SignalHero() {
  const updateCursor = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };

  const resetCursor = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--cursor-x", "50%");
    event.currentTarget.style.setProperty("--cursor-y", "42%");
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="signal-hero"
      id="hero"
      onPointerLeave={resetCursor}
      onPointerMove={updateCursor}
    >
      <div aria-hidden="true" className="hero-atmosphere">
        <div className="hero-cursor-light" />
        <div className="hero-grain" />
        <div className="hero-floating-signals">
          {floatingSignals.map((signal, index) => (
            <span
              key={index}
              style={{
                "--signal-delay": signal.delay,
                "--signal-duration": signal.duration,
                "--signal-size": signal.size,
                left: signal.left,
                top: signal.top,
              } as SignalStyle}
            />
          ))}
        </div>
      </div>

      <div className="hero-shell">
        <div className="hero-copy">
          <div className="availability hero-enter hero-enter--one">
            <span aria-hidden="true" />
            Felix Joseph Castañeda · Full-Stack Web &amp; AI Developer
          </div>

          <h1
            aria-label="I build systems that turn busywork into forward motion."
            className="hero-enter hero-enter--two"
            id="hero-heading"
          >
            <span>I build systems</span>
            <span>that turn <em>busywork</em></span>
            <span>into forward motion.</span>
          </h1>

          <p className="hero-statement hero-enter hero-enter--three">
            Full-stack applications, intelligent workflows, and automation built around real business problems.
          </p>

          <div className="hero-actions hero-enter hero-enter--four">
            <a className="button button--primary" href="#projects">
              View my work <ArrowDownRightIcon />
            </a>
            <a className="button button--ghost" href="#contact">
              Get in touch <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

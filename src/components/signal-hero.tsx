"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
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
  const heroRef = useRef<HTMLElement>(null);
  const motionAllowed = useRef(true);
  const cursorFrame = useRef(0);
  const cursorPosition = useRef({ x: 0, y: 0 });
  const [paused, setPaused] = useState(false);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const syncMotion = () => {
      motionAllowed.current = inView && !document.hidden && !preference.matches;
      hero.dataset.motionActive = String(motionAllowed.current);
    };
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncMotion();
    }, { threshold: 0 }) : null;
    observer?.observe(hero);
    syncMotion();
    setMotionReady(true);
    preference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    return () => {
      cancelAnimationFrame(cursorFrame.current);
      observer?.disconnect();
      preference.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);

  const updateCursor = (event: PointerEvent<HTMLElement>) => {
    if (paused || !motionAllowed.current || event.pointerType === "touch") return;
    const hero = event.currentTarget;
    cursorPosition.current = { x: event.clientX, y: event.clientY };
    if (cursorFrame.current) return;
    cursorFrame.current = requestAnimationFrame(() => {
      cursorFrame.current = 0;
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty("--cursor-x", `${cursorPosition.current.x - bounds.left}px`);
      hero.style.setProperty("--cursor-y", `${cursorPosition.current.y - bounds.top}px`);
    });
  };

  const resetCursor = (event: PointerEvent<HTMLElement>) => {
    cancelAnimationFrame(cursorFrame.current);
    cursorFrame.current = 0;
    event.currentTarget.style.setProperty("--cursor-x", "50%");
    event.currentTarget.style.setProperty("--cursor-y", "42%");
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="signal-hero"
      data-motion-paused={paused}
      id="hero"
      ref={heroRef}
      onPointerLeave={resetCursor}
      onPointerMove={updateCursor}
    >
      <div aria-hidden="true" className="hero-atmosphere">
        <div className="hero-light-drift"><span /><span /></div>
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
          <p className="hero-identity hero-enter hero-enter--one">
            <span aria-hidden="true" className="hero-identity__dot" />
            <span className="hero-identity__text"><span>Felix Joseph Castañeda</span><span className="hero-identity__separator"> · </span><span>Full-Stack Web &amp; AI Developer</span></span>
          </p>

          <h1
            aria-label="I build systems that turn busywork into forward motion."
            className="hero-enter hero-enter--two"
            id="hero-heading"
          >
            <span>I build systems</span>
            <span>that turn <em className="hero-keyword">busywork</em></span>
            <span>into forward motion.</span>
          </h1>

          <p className="hero-statement hero-enter hero-enter--three">
            Useful software, thoughtful design, and fewer unnecessary steps.
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
      <button
        aria-label={paused ? "Resume hero animation" : "Pause hero animation"}
        aria-pressed={paused}
        className="hero-motion-toggle"
        hidden={!motionReady}
        onClick={() => setPaused((value) => !value)}
        type="button"
      >
        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
          {paused ? <path d="m5 3 7 5-7 5Z" fill="currentColor" /> : <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.5" />}
        </svg>
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </section>
  );
}

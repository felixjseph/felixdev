"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";

type LoaderPhase = "visible" | "exiting";

export function SiteLoader() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<LoaderPhase>("visible");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reducedMotion ? 120 : 720;
    const exitDuration = reducedMotion ? 140 : 480;
    const startedAt = performance.now();
    let settled = false;
    let delayTimer: number | undefined;
    let exitTimer: number | undefined;

    const beginExit = () => {
      if (settled) return;
      settled = true;
      const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));

      delayTimer = window.setTimeout(() => {
        setPhase("exiting");
        exitTimer = window.setTimeout(() => {
          setMounted(false);
        }, exitDuration);
      }, remaining);
    };

    const fallbackTimer = window.setTimeout(beginExit, reducedMotion ? 260 : 980);
    const fontsReady = document.fonts?.ready;

    if (fontsReady) {
      fontsReady.then(beginExit, beginExit);
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      if (delayTimer) window.clearTimeout(delayTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden={phase === "exiting"} aria-label="Loading Felix's portfolio" className="site-loader" data-phase={phase} role="presentation">
      <div aria-hidden="true" className="site-loader__field" />
      <div className="site-loader__content">
        <BrandMark className="site-loader__mark" />
        <div className="site-loader__label">
          <span>FELIX / SYSTEM 001</span>
          <strong>Preparing the work</strong>
        </div>
        <div aria-hidden="true" className="site-loader__progress"><span /></div>
      </div>
      <span aria-hidden="true" className="site-loader__counter">00—100</span>
    </div>
  );
}

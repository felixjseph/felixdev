"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";

type LoaderPhase = "visible" | "exiting";

export function SiteLoader() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<LoaderPhase>("visible");

  useEffect(() => {
    if (!mounted) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reducedMotion ? 120 : 980;
    const exitDuration = reducedMotion ? 140 : 420;
    const startedAt = performance.now();
    let settled = false;
    let disposed = false;
    let delayTimer: number | undefined;
    let exitTimer: number | undefined;

    const beginExit = () => {
      if (settled || disposed) return;
      settled = true;
      const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));

      delayTimer = window.setTimeout(() => {
        setPhase("exiting");
        exitTimer = window.setTimeout(() => {
          setMounted(false);
        }, exitDuration);
      }, remaining);
    };

    const fallbackTimer = window.setTimeout(beginExit, reducedMotion ? 260 : 1080);
    const fontsReady = document.fonts?.ready;

    if (fontsReady) {
      fontsReady.then(beginExit, beginExit);
    }

    // Reveal immediately for keyboard navigation or if the page is backgrounded.
    const dismiss = () => { setMounted(false); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Escape") dismiss();
    };
    const onVisibility = () => { if (document.hidden) dismiss(); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      window.clearTimeout(fallbackTimer);
      if (delayTimer) window.clearTimeout(delayTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="site-loader" data-phase={phase}>
      <div className="site-loader__content">
        <div className="site-loader__identity">
          <BrandMark className="site-loader__mark" />
          <span>Felix Joseph</span>
        </div>
        <p className="site-loader__statement">Ideas into<br /><em>forward motion.</em></p>
        <div className="site-loader__workflow">
          <div className="site-loader__step">
            <span className="site-loader__node">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="2.5" /><path d="M3 7V3h4m6 0h4v4M3 13v4h4m6 0h4v-4" />
              </svg>
            </span>
            <span className="site-loader__step-label">Understand</span>
          </div>
          <div className="site-loader__step">
            <span className="site-loader__node">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 6-4 4 4 4m8-8 4 4-4 4M11.5 4l-3 12" />
              </svg>
            </span>
            <span className="site-loader__step-label">Build</span>
          </div>
          <div className="site-loader__step">
            <span className="site-loader__node site-loader__node--result">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 10 3.5 3.5L15 7" />
              </svg>
            </span>
            <span className="site-loader__step-label">Simplify</span>
          </div>
        </div>
      </div>
    </div>
  );
}

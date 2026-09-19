"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import styles from "./about-me-section.module.css";

type PortraitStyle = CSSProperties & {
  "--portrait-x": string;
  "--portrait-y": string;
};

export function FelixPortrait() {
  const frameRef = useRef<HTMLDivElement>(null);
  const frameRequestRef = useRef(0);

  useEffect(() => () => window.cancelAnimationFrame(frameRequestRef.current), []);

  const moveReveal = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const frame = frameRef.current;
    if (!frame) return;

    const { clientX, clientY } = event;
    window.cancelAnimationFrame(frameRequestRef.current);
    frameRequestRef.current = window.requestAnimationFrame(() => {
      const bounds = frame.getBoundingClientRect();
      const x = Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100));
      const y = Math.min(100, Math.max(0, ((clientY - bounds.top) / bounds.height) * 100));
      frame.style.setProperty("--portrait-x", `${x}%`);
      frame.style.setProperty("--portrait-y", `${y}%`);
    });
  };

  const startReveal = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const frame = frameRef.current;
    if (!frame) return;
    frame.dataset.colorActive = "true";
    moveReveal(event);
  };

  const stopReveal = () => {
    window.cancelAnimationFrame(frameRequestRef.current);
    frameRef.current?.removeAttribute("data-color-active");
  };

  return (
    <figure className={styles.portrait} data-reveal="right" data-reveal-delay="80">
      <div
        className={styles.portraitFrame}
        onPointerEnter={startReveal}
        onPointerLeave={stopReveal}
        onPointerMove={moveReveal}
        ref={frameRef}
        style={{ "--portrait-x": "50%", "--portrait-y": "50%" } as PortraitStyle}
      >
        <div className={styles.portraitStage}>
          <Image
            alt="Felix Joseph Castañeda standing beside a vintage white Volkswagen Beetle"
            className={`${styles.portraitImage} ${styles.portraitMonochrome}`}
            fill
            quality={90}
            sizes="(max-width: 820px) 92vw, (max-width: 1200px) 42vw, 34rem"
            src="/images/felix-portrait.jpg"
          />
          <Image
            alt=""
            aria-hidden="true"
            className={`${styles.portraitImage} ${styles.portraitColor}`}
            fill
            quality={90}
            sizes="(max-width: 820px) 92vw, (max-width: 1200px) 42vw, 34rem"
            src="/images/felix-portrait.jpg"
          />
          <span aria-hidden="true" className={styles.revealCursor} />
          <div className={styles.portraitMeta}>
            <p>Felix Joseph Castañeda</p>
            <span>Full-Stack Web &amp; AI Developer</span>
          </div>
        </div>
      </div>
      <figcaption className={styles.portraitHint}>
        <span aria-hidden="true" /> Move across the portrait to reveal color
      </figcaption>
    </figure>
  );
}

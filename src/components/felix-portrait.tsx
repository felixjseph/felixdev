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
  const releaseTimeoutRef = useRef(0);
  const positionRef = useRef({
    currentX: 0,
    currentY: 0,
    initialized: false,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => () => {
    window.cancelAnimationFrame(frameRequestRef.current);
    window.clearTimeout(releaseTimeoutRef.current);
  }, []);

  const writePosition = (x: number, y: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.setProperty("--portrait-x", `${x}px`);
    frame.style.setProperty("--portrait-y", `${y}px`);
  };

  const animatePosition = () => {
    const position = positionRef.current;
    const deltaX = position.targetX - position.currentX;
    const deltaY = position.targetY - position.currentY;
    position.currentX += deltaX * 0.18;
    position.currentY += deltaY * 0.18;
    writePosition(position.currentX, position.currentY);

    if (Math.abs(deltaX) + Math.abs(deltaY) > 0.12) {
      frameRequestRef.current = window.requestAnimationFrame(animatePosition);
      return;
    }

    position.currentX = position.targetX;
    position.currentY = position.targetY;
    writePosition(position.currentX, position.currentY);
    frameRequestRef.current = 0;
  };

  const moveReveal = (event: PointerEvent<HTMLDivElement>, snap = false) => {
    const frame = frameRef.current;
    if (!frame) return;
    const isMouse = event.pointerType === "mouse";
    const isTouchActive = frame.dataset.touchActive === "true";
    if (!isMouse && !isTouchActive) return;

    const { clientX, clientY } = event;
    const bounds = frame.getBoundingClientRect();
    const targetX = Math.min(bounds.width, Math.max(0, clientX - bounds.left));
    const targetY = Math.min(bounds.height, Math.max(0, clientY - bounds.top));
    const position = positionRef.current;
    position.targetX = targetX;
    position.targetY = targetY;

    if (snap || !position.initialized) {
      window.cancelAnimationFrame(frameRequestRef.current);
      frameRequestRef.current = 0;
      position.currentX = targetX;
      position.currentY = targetY;
      position.initialized = true;
      writePosition(targetX, targetY);
      return;
    }

    if (!frameRequestRef.current) {
      frameRequestRef.current = window.requestAnimationFrame(animatePosition);
    }
  };

  const startReveal = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const frame = frameRef.current;
    if (!frame) return;
    window.clearTimeout(releaseTimeoutRef.current);
    frame.dataset.colorActive = "true";
    moveReveal(event, true);
  };

  const stopReveal = () => {
    window.cancelAnimationFrame(frameRequestRef.current);
    frameRequestRef.current = 0;
    frameRef.current?.removeAttribute("data-color-active");
  };

  const startTouchReveal = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    const frame = frameRef.current;
    if (!frame) return;
    window.clearTimeout(releaseTimeoutRef.current);
    frame.dataset.colorActive = "true";
    frame.dataset.touchActive = "true";
    moveReveal(event, true);
  };

  const finishTouchReveal = () => {
    const frame = frameRef.current;
    if (!frame || frame.dataset.touchActive !== "true") return;
    frame.removeAttribute("data-touch-active");
    window.clearTimeout(releaseTimeoutRef.current);
    releaseTimeoutRef.current = window.setTimeout(stopReveal, 1200);
  };

  return (
    <figure className={styles.portrait} data-reveal="right" data-reveal-delay="80">
      <div className={styles.portraitFrame}>
        <div
          className={styles.portraitStage}
          data-portrait-frame
          onPointerCancel={finishTouchReveal}
          onPointerDown={startTouchReveal}
          onPointerEnter={startReveal}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") stopReveal();
          }}
          onPointerMove={moveReveal}
          onPointerUp={finishTouchReveal}
          ref={frameRef}
          style={{ "--portrait-x": "50%", "--portrait-y": "50%" } as PortraitStyle}
        >
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
          <span aria-hidden="true" className={styles.revealCursor} data-portrait-cursor />
          <div className={styles.portraitMeta}>
            <p>Felix Joseph Castañeda</p>
            <span>Full-Stack Web &amp; AI Developer</span>
          </div>
        </div>
      </div>
      <figcaption className={styles.portraitHint}>
        <span aria-hidden="true" />
        <span className={styles.portraitHintDesktop}>Move the + to reveal color</span>
        <span className={styles.portraitHintTouch}>Tap or drag to reveal color</span>
      </figcaption>
    </figure>
  );
}

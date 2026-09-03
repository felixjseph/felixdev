"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { testimonials } from "@/content/testimonials";
import { ArrowRightIcon, PauseIcon, PlayIcon } from "./ui-icons";
import styles from "./testimonials-section.module.css";

type CharacterStyle = CSSProperties & { "--character-index": number };

function TypedCharacters({ text, offset = 0 }: { text: string; offset?: number }) {
  return text.split("").map((character, index) => (
    <span className={styles.character} key={`${offset}-${index}`}
      style={{ "--character-index": offset + index } as CharacterStyle}>{character}</span>
  ));
}

function TypedQuote({ quote, emphasis }: { quote: string; emphasis?: string }) {
  const lead = `“${quote}${emphasis ? " " : "”"}`;
  const ending = emphasis ? `${emphasis}”` : "";
  return (
    <blockquote aria-label={`${lead}${ending}`}>
      <span aria-hidden="true">
        <TypedCharacters text={lead} />
        {ending && <em><TypedCharacters text={ending} offset={lead.length} /></em>}
      </span>
    </blockquote>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const playing = inView && motionAllowed && !paused && !interacting;

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(Boolean(preference && !preference.matches && !document.hidden));
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0 }) : null;
    sync();
    if (sectionRef.current) observer?.observe(sectionRef.current);
    if (!observer) setInView(true);
    preference?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer?.disconnect();
      preference?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [playing]);

  const select = (index: number) => {
    setPaused(true);
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  return (
    <section aria-labelledby="testimonial-heading" className={styles.section} id="testimonial" ref={sectionRef}
      data-playing={playing} data-typing={inView && motionAllowed}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setInteracting(true); }}
      onPointerLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className={styles.shell}>
        <div className={styles.headingRow}>
          <h2 className={styles.heading} id="testimonial-heading" data-reveal="left">Good work. <em>Good company.</em></h2>
          <div className={styles.controls} aria-label="Testimonial controls" role="group">
            <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
            <button aria-label="Previous testimonial" onClick={() => select(activeIndex - 1)} type="button"><ArrowRightIcon /></button>
            <button aria-label="Next testimonial" onClick={() => select(activeIndex + 1)} type="button"><ArrowRightIcon /></button>
            {motionAllowed && <button aria-label={paused ? "Resume testimonial slideshow" : "Pause testimonial slideshow"}
              aria-pressed={paused} onClick={() => setPaused((value) => !value)} type="button">
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>}
          </div>
        </div>
        <div className={styles.track} data-reveal="rise">
          {testimonials.map((testimonial, index) => {
            const active = index === activeIndex;
            return (
              <figure aria-hidden={!active} className={`${styles.quote} ${active ? styles.active : ""}`} key={testimonial.business}>
                <figcaption className={styles.brand}>
                  <span className={`${styles.mark} ${styles[testimonial.logoStyle]}`}>
                    <Image src={testimonial.logo} width={64} height={64} sizes="48px" alt={`${testimonial.business} logo`} />
                  </span>
                  <div>
                    <strong>{testimonial.business}</strong>
                    <span>Client testimonial</span>
                  </div>
                </figcaption>
                <div className={styles.content}>
                  {testimonial.rating !== null && (
                    <span aria-label={`${testimonial.rating} out of 5 stars`} className={styles.stars}>
                      <b aria-hidden="true">{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</b>
                    </span>
                  )}
                  {testimonial.quote && <TypedQuote quote={testimonial.quote} emphasis={testimonial.emphasis} />}
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

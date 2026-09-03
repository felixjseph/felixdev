"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import type { ProjectMedia } from "@/types/project";
import { ExpandIcon, PauseIcon, PlayIcon, CloseIcon } from "./ui-icons";
import styles from "./portfolio-work.module.css";

type ProjectPreviewGalleryProps = {
  media: ProjectMedia[];
  title: string;
  wide?: boolean;
  background?: string;
};

export function ProjectPreviewGallery({ media, title, wide = false, background }: ProjectPreviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const pointerFrame = useRef(0);
  const previewId = useId();
  const active = media[activeIndex] ?? media[0];
  const playing = motionAllowed && inView && !paused && !hovered && !focused && !expanded && media.length > 1;

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(Boolean(preference && !preference.matches && !document.hidden));
    sync();
    preference?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0 }) : null;
    if (galleryRef.current) observer?.observe(galleryRef.current);
    if (!observer) setInView(true);
    return () => {
      observer?.disconnect();
      preference?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(pointerFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % media.length;
        const image = imagesRef.current[next];
        // Never reveal a frame whose image has not loaded yet.
        return image?.complete && image.naturalWidth > 0 ? next : current;
      });
    }, 4400);
    return () => window.clearInterval(timer);
  }, [playing, media.length]);

  const resetTilt = () => {
    cancelAnimationFrame(pointerFrame.current);
    stageRef.current?.style.removeProperty("--tilt-x");
    stageRef.current?.style.removeProperty("--tilt-y");
  };

  const tilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (!motionAllowed || event.pointerType !== "mouse") return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      stage.style.setProperty("--tilt-x", `${-y * 8}deg`);
      stage.style.setProperty("--tilt-y", `${x * 8}deg`);
    });
  };

  const selectPreview = (index: number) => {
    setPaused(true);
    setActiveIndex(index);
  };

  const controls = (target: string) => (
    <div className={styles["project-preview__controls"]} role="group" aria-label="Choose a project preview">
      {media.map((item, index) => (
        <button aria-controls={target} aria-pressed={index === activeIndex}
          className={styles["project-preview__control"]} key={item.src}
          onClick={() => selectPreview(index)} type="button">
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{item.caption}
        </button>
      ))}
    </div>
  );

  if (!active) return null;

  return (
    <figure className={styles["project-preview"]} aria-label={`${title} project previews`} ref={galleryRef}
      data-playing={playing} onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => { setHovered(false); resetTilt(); }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className={styles["project-preview__deck"]}>
        <button className={styles["project-preview__stage"]} id={previewId} ref={stageRef}
          style={background ? { backgroundColor: background } : undefined}
          aria-label={`Expand ${title} previews`} aria-haspopup="dialog" type="button"
          onPointerMove={tilt} onPointerLeave={resetTilt} onFocus={resetTilt}
          onClick={() => { resetTilt(); setExpanded(true); dialogRef.current?.showModal(); }}>
          {media.map((item, index) => (
            <span aria-hidden={index !== activeIndex}
              className={`${styles["project-preview__image"]} ${index === activeIndex ? styles["is-active"] : ""}`} key={item.src}>
              <Image alt={item.alt} height={item.height} width={item.width} src={item.src}
                ref={(image) => { imagesRef.current[index] = image; }} loading={inView ? "eager" : "lazy"}
                sizes={wide ? "(max-width: 1120px) 95vw, 1088px" : "(max-width: 900px) 95vw, 650px"} />
            </span>
          ))}
          <span aria-hidden="true" className={styles["project-preview__expand"]}><ExpandIcon /></span>
        </button>
      </div>
      <figcaption className={styles["project-preview__caption"]} aria-live={paused ? "polite" : "off"}>
        <span>{title} / {active.caption}</span>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
      </figcaption>
      <div className={styles["project-preview__toolbar"]}>
        {controls(previewId)}
        {media.length > 1 && motionAllowed && <button className={styles["project-preview__play"]}
          aria-label={paused ? "Resume preview slideshow" : "Pause preview slideshow"} aria-pressed={paused}
          type="button" onClick={() => setPaused((value) => !value)}>
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>}
      </div>
      <dialog className={styles["preview-dialog"]} ref={dialogRef} aria-label={`${title} expanded previews`}
        onKeyDown={(event) => {
          // Keep boundary Tab navigation inside the viewer, including in browsers
          // that let native dialogs hand their final tab stop to browser chrome.
          if (event.key !== "Tab") return;
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
        {expanded && <div className={styles["preview-dialog__surface"]}>
          <div className={styles["preview-dialog__heading"]}>
            <div><strong>{title}</strong><span>{active.caption} · {activeIndex + 1} / {media.length}</span></div>
            <button aria-label="Close expanded previews" type="button" autoFocus onClick={() => dialogRef.current?.close()}><CloseIcon /></button>
          </div>
          <div className={styles["preview-dialog__image"]} id={`${previewId}-expanded`} style={background ? { backgroundColor: background } : undefined}>
            <Image key={active.src} src={active.src} alt={active.alt} width={active.width} height={active.height}
              sizes="(max-width: 1200px) 95vw, 1200px" loading="eager" />
          </div>
          {controls(`${previewId}-expanded`)}
        </div>}
      </dialog>
    </figure>
  );
}

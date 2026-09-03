"use client";

import styles from "./portfolio-work.module.css";

import Image from "next/image";
import { useId, useState } from "react";
import type { ProjectMedia } from "@/types/project";

type ProjectPreviewGalleryProps = {
  media: ProjectMedia[];
  title: string;
  wide?: boolean;
};

export function ProjectPreviewGallery({ media, title, wide = false }: ProjectPreviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const previewId = useId();
  const active = media[activeIndex];
  if (!active) return null;

  return (
    <figure className={styles["project-preview"]} aria-label={`${title} project previews`}>
      <div className={styles["project-preview__stage"]} id={previewId}>
        {media.map((item, index) => (
          <div
            aria-hidden={index !== activeIndex}
            className={[styles["project-preview__image"], index === activeIndex ? styles["is-active"] : ""].join(" ")}
            key={item.src}
          >
            <Image
              alt={item.alt}
              height={item.height}
              width={item.width}
              src={item.src}
              sizes={wide ? "(max-width: 1120px) 95vw, 1088px" : "(max-width: 900px) 95vw, (max-width: 1200px) 55vw, 650px"}
            />
          </div>
        ))}
      </div>
      <figcaption className={styles["project-preview__caption"]} aria-live="polite">
        <span>{title} / {active.caption}</span>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
      </figcaption>
      <div className={styles["project-preview__controls"]} role="group" aria-label="Choose a project preview">
        {media.map((item, index) => (
          <button
            aria-controls={previewId}
            aria-pressed={index === activeIndex}
            className={styles["project-preview__control"]}
            key={item.src}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {item.caption}
          </button>
        ))}
      </div>
    </figure>
  );
}

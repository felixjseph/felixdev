"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

// Cards fan out from a fixed bottom pivot (`origin-bottom`), so rotation
// swings the top corners left/right while the bottoms stay aligned.
type FanStyle = {
  x: number;
  rotate: number;
  scale: number;
  opacity: number;
  zIndex: number;
};

function getFanStyle(offset: number, total: number): FanStyle {
  if (offset === 0) return { x: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 40 };
  if (offset === 1) return { x: 26, rotate: 7, scale: 0.94, opacity: 1, zIndex: 30 };
  if (offset === total - 1)
    return { x: -26, rotate: -7, scale: 0.94, opacity: 1, zIndex: 30 };
  return { x: 0, rotate: 0, scale: 0.9, opacity: 0, zIndex: 10 };
}

export function AnimatedProjectStack({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const total = projects.length;

  function go(index: number) {
    setActiveIndex(((index % total) + total) % total);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[560px] w-full max-w-md">
        {projects.map((project, index) => {
          const offset = (index - activeIndex + total) % total;
          const style = getFanStyle(offset, total);
          const isActive = offset === 0;
          const isPeek = offset === 1 || offset === total - 1;

          return (
            <motion.div
              key={project.slug}
              className="group absolute inset-0 origin-bottom"
              style={{
                zIndex: style.zIndex,
                pointerEvents: isActive || isPeek ? "auto" : "none",
              }}
              animate={{
                x: style.x,
                rotate: style.rotate,
                scale: style.scale,
                opacity: style.opacity,
              }}
              whileHover={
                isActive && !shouldReduceMotion
                  ? { y: -8, scale: style.scale * 1.03 }
                  : undefined
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: EASE }
              }
            >
              {isPeek ? (
                // A <button> can't legally wrap ProjectCard's internal <a>,
                // so this is a div acting as a button (click + keyboard)
                // rather than a real <button> element.
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => go(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      go(index);
                    }
                  }}
                  aria-label={`View ${project.title}`}
                  className="h-full w-full cursor-pointer"
                >
                  <ProjectCard project={project} />
                </div>
              ) : (
                <ProjectCard project={project} />
              )}

              {isActive && (
                // Full-description popover on hover, styled as a browser-window preview.
                // min-h-full guarantees it always covers at least the whole card (so the
                // base card's tags/link never peek out beneath it); the subtle ring
                // (instead of a hard border) doubles as the hover outline, and always
                // matches the popover's own bounds instead of a separately-sized element.
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 min-h-full -translate-y-2 overflow-hidden bg-bg opacity-0 shadow-[0_0_0_1px_rgba(20,20,20,0.12),0_20px_45px_-15px_rgba(20,20,20,0.2)] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
                >
                  <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-border" />
                    <span className="h-2 w-2 rounded-full bg-border" />
                    <span className="h-2 w-2 rounded-full bg-border" />
                  </div>

                  <div className="relative aspect-video border-b border-border">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="448px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-bg">
                        <span className="font-display text-lg text-muted">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="p-6 font-body text-ink">{project.description}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-14 flex items-center gap-6">
        <button
          type="button"
          onClick={() => go(activeIndex - 1)}
          aria-label="Previous project"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border font-mono text-ink transition-colors duration-300 hover:bg-ink hover:text-bg motion-reduce:transition-none"
        >
          ‹
        </button>

        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => go(index)}
              aria-label={`View ${project.title}`}
              className="p-1"
            >
              <span
                aria-hidden
                className={`block h-1.5 w-1.5 rounded-full transition-colors duration-300 motion-reduce:transition-none ${
                  index === activeIndex ? "bg-ink" : "bg-border"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(activeIndex + 1)}
          aria-label="Next project"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border font-mono text-ink transition-colors duration-300 hover:bg-ink hover:text-bg motion-reduce:transition-none"
        >
          ›
        </button>
      </div>
    </div>
  );
}

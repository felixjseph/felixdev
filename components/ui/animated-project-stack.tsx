"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

// Shuffle timings. The outgoing card travels for SHUFFLE_S; everything else
// tweens over SETTLE_S, started a beat later so the deck reads as "card lifts
// off, then the rest step forward" rather than one simultaneous swap.
const SHUFFLE_S = 0.72;
const SETTLE_S = 0.5;
const SETTLE_DELAY_S = 0.08;
// Fraction of the flight the outgoing card spends on top of the deck before it
// drops behind. Motion won't interpolate z-index (it snaps straight to the
// target), so this is flipped explicitly partway through the arc instead.
const DROP_AT = 0.46;

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
  // The card currently being dealt to the back, which way it's travelling, and
  // whether it's still riding on top of the deck. Tracked by slug rather than
  // index so it survives the active index moving underneath it — a dot click
  // can jump more than one position at a time.
  const [dealt, setDealt] = useState<{
    slug: string;
    dir: number;
    onTop: boolean;
  } | null>(null);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const total = projects.length;

  useEffect(() => () => clearTimeout(dropTimer.current ?? undefined), []);

  function go(index: number) {
    const next = ((index % total) + total) % total;
    if (next === activeIndex) return;
    // Shuffle toward whichever end of the deck is closer, so jumping from the
    // last dot back to the first doesn't sweep the whole way around.
    const forward = (next - activeIndex + total) % total;
    const dir = forward <= total - forward ? 1 : -1;
    const slug = projects[activeIndex].slug;

    clearTimeout(dropTimer.current ?? undefined);
    setDealt({ slug, dir, onTop: !shouldReduceMotion });
    if (!shouldReduceMotion) {
      dropTimer.current = setTimeout(
        () =>
          setDealt((current) =>
            current?.slug === slug ? { ...current, onTop: false } : current,
          ),
        SHUFFLE_S * DROP_AT * 1000,
      );
    }
    setActiveIndex(next);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[560px] w-full max-w-md">
        {projects.map((project, index) => {
          const offset = (index - activeIndex + total) % total;
          const style = getFanStyle(offset, total);
          const isActive = offset === 0;
          const isPeek = offset === 1 || offset === total - 1;

          // Advancing shifts every card one slot toward the left of the fan, so
          // the card leaving the front travels against the direction of travel.
          const isDealing = !shouldReduceMotion && dealt?.slug === project.slug;
          const sign = isDealing ? -(dealt as { dir: number }).dir : 1;

          return (
            <motion.div
              key={project.slug}
              className="group absolute inset-0 origin-bottom"
              style={{
                // Rides above the whole deck for the first half of its arc, so
                // it reads as being lifted off the top rather than sliding out
                // from behind, then drops under the new front card.
                zIndex: isDealing && dealt?.onTop ? 60 : style.zIndex,
                pointerEvents: isActive || isPeek ? "auto" : "none",
              }}
              animate={
                isDealing
                  ? {
                      // Lifts off the deck, arcs out past its slot, then falls
                      // back into the fan — the overshoot is what makes it read
                      // as a dealt card rather than a slide.
                      x: [0, sign * 104, style.x],
                      y: [0, -54, 0],
                      rotate: [0, sign * 16, style.rotate],
                      scale: [1, 1.05, style.scale],
                      opacity: [1, 1, style.opacity],
                    }
                  : {
                      x: style.x,
                      y: 0,
                      rotate: style.rotate,
                      scale: style.scale,
                      opacity: style.opacity,
                    }
              }
              onAnimationComplete={() => {
                if (isDealing) setDealt(null);
              }}
              whileHover={
                isActive && !shouldReduceMotion && !isDealing
                  ? { y: -8, scale: style.scale * 1.03 }
                  : undefined
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : isDealing
                    ? { duration: SHUFFLE_S, ease: EASE, times: [0, 0.45, 1] }
                    : {
                        duration: SETTLE_S,
                        ease: EASE,
                        delay: dealt ? SETTLE_DELAY_S : 0,
                      }
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

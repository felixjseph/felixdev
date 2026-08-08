"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Digits and code punctuation — the line should look like data resolving into
// a sentence, which is the same build-log voice as the `$` prompts elsewhere.
const GLYPHS = "0123456789#$%&*<>[]{}/\\=+";

const DISSOLVE_MS = 260; // old line breaking apart into glyphs
const RESOLVE_MS = 900; // glyphs settling into the new line
const TICK_MS = 40; // how often glyphs re-randomise (~25fps, deliberately steppy)
const CYCLE_MS = 4000; // full beat: transition + time to actually read the line

const TRANSITION_MS = DISSOLVE_MS + RESOLVE_MS;

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Stable per-character offset in [0, 1). Keeps the reveal edge slightly ragged
 * instead of a dead-straight wipe, but derived from the index rather than
 * Math.random so a character doesn't re-roll its timing on every tick.
 */
function jitter(index: number) {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The displayed string at `elapsed` ms into a transition from `from` to `to`.
 *
 * Whitespace is never scrambled — keeping the gaps intact preserves the
 * silhouette of the sentence, so the effect reads as decoding rather than as
 * an undifferentiated block of noise.
 */
function frameAt(from: string, to: string, elapsed: number) {
  if (elapsed < DISSOLVE_MS) {
    const progress = elapsed / DISSOLVE_MS;
    return from
      .split("")
      .map((char, i) => {
        if (char === " ") return char;
        return i / from.length < progress ? randomGlyph() : char;
      })
      .join("");
  }

  const into = elapsed - DISSOLVE_MS;
  // Last character starts late enough that the tail still scrambles briefly
  // after the head has locked, so the line resolves as a sweep, not a snap.
  const stagger = (RESOLVE_MS * 0.55) / Math.max(to.length, 1);
  const hold = RESOLVE_MS * 0.45;

  return to
    .split("")
    .map((char, i) => {
      if (char === " ") return char;
      const start = (i + jitter(i) * 1.5) * stagger;
      return into >= start + hold ? char : randomGlyph();
    })
    .join("");
}

export function RotatingTagline({ taglines }: { taglines: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(taglines[0] ?? "");
  const shouldReduceMotion = useReducedMotion();
  // What the line is transitioning *out* of. Held in a ref so starting a
  // transition doesn't need the previous render's text as a dependency.
  const previous = useRef(taglines[0] ?? "");
  // The first line is the one that ships in the SSR HTML, so it must render as
  // itself — scrambling on mount would both flash real text before the noise
  // and disagree with the server markup.
  const settled = useRef(false);

  useEffect(() => {
    // Reduced motion gets the first line, held. Auto-rotating text is motion
    // *and* auto-updating content, so we opt out of both.
    if (shouldReduceMotion) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % taglines.length);
    }, CYCLE_MS);

    return () => clearInterval(id);
  }, [shouldReduceMotion, taglines.length]);

  useEffect(() => {
    const target = taglines[index] ?? "";

    if (shouldReduceMotion || !settled.current) {
      settled.current = true;
      setDisplay(target);
      previous.current = target;
      return;
    }

    const from = previous.current;
    const start = performance.now();
    let frame = 0;
    let lastTick = -TICK_MS;

    const step = (now: number) => {
      const elapsed = now - start;

      if (elapsed >= TRANSITION_MS) {
        setDisplay(target);
        previous.current = target;
        return;
      }

      // Throttle the glyph churn: re-rolling every animation frame reads as
      // static rather than as characters cycling.
      if (elapsed - lastTick >= TICK_MS) {
        lastTick = elapsed;
        setDisplay(frameAt(from, target, elapsed));
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [index, shouldReduceMotion, taglines]);

  return (
    // Grid stack: every tagline occupies the same cell, so the box is sized
    // to the tallest one and swapping lines never shifts the layout below.
    // The scramble itself is width-safe because the headline is set in mono
    // and every frame preserves the target's character count.
    <span className="grid">
      {taglines.map((tagline) => (
        <span key={tagline} aria-hidden className="invisible [grid-area:1/1]">
          {tagline}
        </span>
      ))}

      {/* Mid-scramble text is gibberish to a screen reader, and it changes
          ~25 times a second — so the visual is hidden from assistive tech and
          the real line is exposed separately. No aria-live: this is decorative
          rotation, not an update worth interrupting anyone for. */}
      <span aria-hidden className="[grid-area:1/1]">
        {display}
      </span>
      <span className="sr-only">{taglines[index]}</span>
    </span>
  );
}

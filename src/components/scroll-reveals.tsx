"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { revealMotion } from "@/lib/reveal-motion";

/** Progressive enhancement: content is visible until an entrance actually runs. */
export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window) || !("animate" in HTMLElement.prototype)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const active = new Map<HTMLElement, Animation>();
    const supplemental = new Set<Animation>();
    const persistent = new Map<HTMLElement, Animation>();
    const compact = window.matchMedia("(max-width: 640px)");
    let stopped = false;
    const persistentObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const animation = persistent.get(entry.target as HTMLElement);
        if (!animation) continue;
        if (entry.isIntersecting && !document.hidden && !preference.matches) animation.play();
        else animation.pause();
      }
    }, { threshold: 0 });
    const observer = new IntersectionObserver((entries) => {
      if (stopped) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (element.dataset.revealed) continue;
        element.dataset.revealed = "true";

        if (element.dataset.reveal === "type") {
          const characters = Array.from(element.querySelectorAll<HTMLElement>("[data-contact-type-char]"));
          const characterDuration = compact.matches ? 190 : 230;
          const stagger = compact.matches ? 19 : 24;

          characters.forEach((character, index) => {
            const animation = character.animate(
              [
                { opacity: 0, transform: "translateY(0.22em)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                delay: index * stagger,
                duration: characterDuration,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "backwards",
              },
            );
            supplemental.add(animation);
            animation.onfinish = () => {
              supplemental.delete(animation);
              animation.cancel();
            };
          });

          const caret = element.querySelector<HTMLElement>("[data-contact-type-caret]");
          if (caret) {
            const revealDuration = Math.max(900, characters.length * stagger + characterDuration + 240);
            const caretAnimation = caret.animate(
              [
                { opacity: 0 },
                { opacity: 1, offset: 0.05 },
                { opacity: 1, offset: 0.78 },
                { opacity: 0 },
              ],
              {
                duration: revealDuration,
                easing: "linear",
                fill: "both",
              },
            );
            supplemental.add(caretAnimation);
            caretAnimation.onfinish = () => {
              supplemental.delete(caretAnimation);
              caretAnimation.cancel();
              if (stopped || preference.matches) return;
              const loop = caret.animate(
                [
                  { opacity: 1 },
                  { opacity: 1, offset: 0.42 },
                  { opacity: 0.12, offset: 0.58 },
                  { opacity: 0.12, offset: 0.92 },
                  { opacity: 1 },
                ],
                {
                  duration: 1120,
                  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                  iterations: Infinity,
                },
              );
              persistent.set(caret, loop);
              persistentObserver.observe(caret);
              if (document.hidden) loop.pause();
            };
          }
          continue;
        }

        const { keyframes, options } = revealMotion(element.dataset.reveal, element.dataset.revealDelay, compact.matches);
        const animation = element.animate(keyframes, options);
        active.set(element, animation);
        animation.onfinish = () => {
          active.delete(element);
          animation.cancel();
        };
      }
    // Observe the actual viewport edge. A negative margin or percentage threshold
    // leaves partially visible titles waiting for another scroll before revealing.
    }, { threshold: 0, rootMargin: "0px" });

    for (const element of elements) {
      if (!element.dataset.revealed) observer.observe(element);
    }

    const finishAll = () => {
      stopped = true;
      observer.disconnect();
      active.forEach((animation) => animation.cancel());
      active.clear();
      supplemental.forEach((animation) => animation.cancel());
      supplemental.clear();
      persistentObserver.disconnect();
      persistent.forEach((animation) => animation.cancel());
      persistent.clear();
      elements.forEach((element) => { element.dataset.revealed = "true"; });
    };
    const onPreferenceChange = () => {
      if (preference.matches) finishAll();
    };
    const onVisibilityChange = () => {
      persistent.forEach((animation, target) => {
        if (document.hidden) {
          animation.pause();
          return;
        }
        const bounds = target.getBoundingClientRect();
        const visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
        if (visible) animation.play();
        else animation.pause();
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element) || !event.target.matches(":focus-visible")) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (!element) return;
      observer.unobserve(element);
      element.dataset.revealed = "true";
      active.get(element)?.cancel();
      active.delete(element);
    };

    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("beforeprint", finishAll);
    return () => {
      stopped = true;
      observer.disconnect();
      persistentObserver.disconnect();
      active.forEach((animation) => animation.cancel());
      supplemental.forEach((animation) => animation.cancel());
      persistent.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("beforeprint", finishAll);
    };
  }, [pathname]);

  return null;
}

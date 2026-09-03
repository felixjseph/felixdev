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
    const compact = window.matchMedia("(max-width: 640px)");
    let stopped = false;
    const observer = new IntersectionObserver((entries) => {
      if (stopped) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (element.dataset.revealed) continue;
        element.dataset.revealed = "true";

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
      elements.forEach((element) => { element.dataset.revealed = "true"; });
    };
    const onPreferenceChange = () => {
      if (preference.matches) finishAll();
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
    document.addEventListener("focusin", onFocus);
    window.addEventListener("beforeprint", finishAll);
    return () => {
      stopped = true;
      observer.disconnect();
      active.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("beforeprint", finishAll);
    };
  }, [pathname]);

  return null;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is visible until an entrance actually runs. */
export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window) || !("animate" in HTMLElement.prototype)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const active = new Map<HTMLElement, Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (element.dataset.revealed) continue;
        element.dataset.revealed = "true";

        const title = element.dataset.reveal === "title";
        const card = element.dataset.reveal === "card";
        const offset = title ? 28 : card ? 24 : 16;
        const scale = card ? 0.985 : 1;
        const delay = Math.min(140, Math.max(0, Number(element.dataset.revealDelay) || 0));
        const animation = element.animate([
          { opacity: 0, transform: `translate3d(0, ${offset}px, 0) scale(${scale})` },
          { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
        ], {
          duration: title ? 720 : card ? 760 : 560,
          delay,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "backwards",
        });
        active.set(element, animation);
        animation.onfinish = () => {
          active.delete(element);
          animation.cancel();
        };
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });

    for (const element of elements) {
      if (!element.dataset.revealed) observer.observe(element);
    }

    const finishAll = () => {
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
      observer.disconnect();
      active.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("beforeprint", finishAll);
    };
  }, [pathname]);

  return null;
}

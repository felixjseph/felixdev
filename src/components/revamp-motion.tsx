"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RevampMotion() {
  useGSAP(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "main",
          start: "top 82%",
          once: true,
        },
      });

      gsap.fromTo(
        "[data-scrub-word]",
        { color: "color-mix(in srgb, var(--color-text) 28%, transparent)" },
        {
          color: "var(--color-text)",
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-scrub-line]",
            start: "top 82%",
            end: "bottom 42%",
            scrub: true,
          },
        },
      );

      const workStage = document.querySelector<HTMLElement>("[data-work-stage]");
      const workRail = document.querySelector<HTMLElement>("[data-work-rail]");
      if (workStage && workRail) {
        gsap.to(workRail, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: workStage,
            start: "top top+=96",
            end: "bottom bottom",
            scrub: true,
            pin: workRail,
            pinSpacing: false,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: index % 2 === 0 ? 30 : -30, rotate: index % 2 === 0 ? -1.2 : 1.2 },
          {
            y: 0,
            rotate: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 52%",
              scrub: true,
            },
          },
        );
      });
    });

    return () => context.revert();
  }, []);

  return null;
}

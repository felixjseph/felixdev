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
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-feature__visual").forEach((visual, index) => {
        gsap.fromTo(visual.querySelector(".project-ui"), {
          y: index % 2 === 0 ? 28 : -18,
        }, {
          y: index % 2 === 0 ? -22 : 18,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}

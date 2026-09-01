"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const frame = sectionRef.current?.querySelector<HTMLElement>(".about-expand__frame");
    const statement = sectionRef.current?.querySelector<HTMLElement>(".about-expand__statement");
    const detail = sectionRef.current?.querySelector<HTMLElement>(".about-expand__detail");
    if (!frame || !statement || !detail) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.85,
      },
    });

    timeline
      .fromTo(
        frame,
        { clipPath: "inset(12% 21% 12% 21% round 16px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", duration: 1 },
        0,
      )
      .fromTo(
        statement,
        { scale: 0.86, x: () => window.innerWidth * 0.17, yPercent: 14 },
        { scale: 1, x: 0, yPercent: 0, ease: "none", duration: 0.8 },
        0,
      )
      .fromTo(
        detail,
        { autoAlpha: 0, y: 48 },
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.42 },
        0.58,
      );
  }, { scope: sectionRef });

  return (
    <section aria-labelledby="about-heading" className="about-expand" id="about" ref={sectionRef}>
      <div className="about-expand__stage">
        <div className="about-expand__frame">
          <div aria-hidden="true" className="about-expand__field" />
          <div className="about-expand__rail">
            <span>01</span>
            <span>About the operator</span>
            <span>Scroll to expand</span>
          </div>
          <div className="about-expand__canvas">
            <h2 className="about-expand__statement" id="about-heading">
              Technology matters.<br />
              <span>The operation matters more.</span>
            </h2>

            <div className="about-expand__detail">
              <div className="about-expand__copy">
                <p>
                  I’m Felix Joseph Castañeda, a Full-Stack Web and AI Developer focused on agentic AI and AI
                  automation. I build practical digital products that turn repetitive business workflows into faster,
                  simpler, and more scalable operations.
                </p>
                <p>
                  My work starts by understanding what people actually do—the handoffs, exceptions, workarounds, and
                  costly repetition. From there, I carry the solution through research, planning, development, release,
                  and continuous improvement.
                </p>
              </div>

              <ol className="about-expand__principles">
                <li><span>Understand</span><strong>Map the real work.</strong></li>
                <li><span>Own</span><strong>Carry the whole system.</strong></li>
                <li><span>Prove</span><strong>Measure useful change.</strong></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

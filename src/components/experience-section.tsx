"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const experience = [
  {
    company: "Softpoint Solutions",
    period: "Dec 2025 — Present",
    role: "Full-Stack Web & AI Developer",
    location: "Cebu City, PH · Hybrid",
    paragraphs: [
      "I deliver customized websites and end-to-end full-stack applications for commercial and media clients, translating business requirements into responsive, maintainable digital products.",
      "I build business automation systems that reduce repetitive administrative work, while collaborating directly with clients and internal stakeholders to define features, resolve technical issues, and keep delivery aligned with practical business needs.",
      "My involvement covers planning, development, API integration, testing, deployment, maintenance, and continuous improvement—including performance and database decisions that help products remain dependable as they grow.",
    ],
    skills: ["Full-stack applications", "API integration", "Automation", "Deployment"],
  },
  {
    company: "Knowles Corporation",
    period: "Mar 2025 — May 2026",
    role: "Web Development Intern",
    location: "Singapore · Full-time remote",
    paragraphs: [
      "I maintained and improved more than 500 WordPress training-course sites, keeping course pages, content structure, tables, imagery, and overall page quality accurate and consistent.",
      "The role combined on-page SEO improvements with practical web-development support, including application features, defect resolution, performance, usability, testing, and debugging.",
      "Working remotely with a Singapore-based cross-functional team strengthened how I translate business and technical requirements, document decisions, and manage development responsibilities within an established delivery process.",
    ],
    skills: ["WordPress", "SEO", "Quality assurance", "Documentation"],
  },
];

type TimelineStyle = CSSProperties & { "--experience-progress": number };

const competencies = [
  "Effective communication",
  "Teamwork",
  "Adaptability",
  "Resourcefulness",
  "Time management",
  "Initiative",
  "Stress tolerance",
  "Reliability",
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const timelineItems = Array.from(timelineRef.current?.children ?? []) as HTMLElement[];
    let frame = 0;
    let pointerFrame = 0;

    const applyProgress = (next: number) => {
      const timeline = timelineRef.current;
      if (!timeline) return;
      const progress = Math.max(0, Math.min(1, next));
      timeline.style.setProperty("--experience-progress", String(progress));
      timelineItems.forEach((item, index) => {
        item.dataset.active = String(progress >= (index + 0.12) / experience.length);
      });
    };

    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;
        if (reducedMotion?.matches) {
          applyProgress(1);
          return;
        }
        const bounds = timeline.getBoundingClientRect();
        const viewportGuide = window.innerHeight * 0.56;
        const next = (viewportGuide - bounds.top) / Math.max(bounds.height, 1);
        applyProgress(next);
      });
    };

    const followPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion?.matches) return;
      const { clientY } = event;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;
        const timelineBounds = timeline.getBoundingClientRect();
        const next = (clientY - timelineBounds.top) / Math.max(timelineBounds.height, 1);
        applyProgress(next);
      });
    };

    const section = sectionRef.current;
    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    section?.addEventListener("pointermove", followPointer, { passive: true });
    section?.addEventListener("pointerleave", updateFromScroll);
    reducedMotion?.addEventListener("change", updateFromScroll);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      section?.removeEventListener("pointermove", followPointer);
      section?.removeEventListener("pointerleave", updateFromScroll);
      reducedMotion?.removeEventListener("change", updateFromScroll);
    };
  }, []);

  return (
    <section aria-labelledby="experience-heading" className="section-shell experience-section" id="experience" ref={sectionRef}>
      <div className="experience-layout">
        <div className="experience-intro">
          <h2 data-reveal="title" id="experience-heading">
            Built to adapt. <span>Expected to own the outcome.</span>
          </h2>
          <p data-reveal data-reveal-delay="70">
            Selected experience, distilled to the responsibility, delivery, and skills that shaped the work.
          </p>
        </div>
        <ol className="experience-list" ref={timelineRef} style={{ "--experience-progress": 0 } as TimelineStyle}>
          {experience.map((item, index) => (
            <li data-active="false" key={item.company}>
              <span className="experience-node" aria-hidden="true" />
              <article className="experience-entry">
                <header data-reveal="left">
                  <p className="experience-company"><span>0{index + 1} /</span> {item.company}</p>
                  <h3>{item.role}</h3>
                  <p className="experience-meta"><span>{item.period}</span><span>{item.location}</span></p>
                </header>
                <div className="experience-narrative" data-reveal data-reveal-delay="50">
                  {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <ul className="experience-skills" aria-label={`${item.company} skills`} data-reveal data-reveal-delay="100">
                  {item.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <div className="experience-competencies" data-reveal="fade">
        <div>
          <p className="system-label">Core competencies</p>
          <ul aria-label="Core competencies">
            {competencies.map((competency) => <li key={competency}>{competency}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

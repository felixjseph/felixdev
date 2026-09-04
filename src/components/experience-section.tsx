"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointerProgress, setPointerProgress] = useState<number | null>(null);
  const progress = pointerProgress ?? scrollProgress;

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointerFrame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;
        setPointerProgress(null);
        if (reducedMotion?.matches) {
          setScrollProgress(1);
          return;
        }
        const bounds = timeline.getBoundingClientRect();
        const viewportGuide = window.innerHeight * 0.56;
        const next = (viewportGuide - bounds.top) / Math.max(bounds.height, 1);
        setScrollProgress(Math.max(0, Math.min(1, next)));
      });
    };
    const followPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion?.matches) return;
      const { clientX, clientY } = event;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const timeline = timelineRef.current;
        if (!section || !timeline) return;
        const sectionBounds = section.getBoundingClientRect();
        if (clientX < sectionBounds.left || clientX > sectionBounds.right || clientY < sectionBounds.top || clientY > sectionBounds.bottom) {
          setPointerProgress(null);
          return;
        }
        const timelineBounds = timeline.getBoundingClientRect();
        const next = (clientY - timelineBounds.top) / Math.max(timelineBounds.height, 1);
        setPointerProgress(Math.max(0, Math.min(1, next)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("pointermove", followPointer, { passive: true });
    reducedMotion?.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pointermove", followPointer);
      reducedMotion?.removeEventListener("change", update);
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
        <ol className="experience-list" ref={timelineRef} style={{ "--experience-progress": progress } as TimelineStyle}>
          {experience.map((item, index) => (
            <li data-active={progress >= (index + 0.12) / experience.length} key={item.company}>
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

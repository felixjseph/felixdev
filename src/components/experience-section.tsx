"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const process = [
  {
    stage: "Discovery",
    title: "Find the work worth fixing.",
    focus: "Listen · map · prioritize",
    paragraphs: ["We start with the way the work actually happens: the repeated steps, lost context, slow handoffs, and opportunities hiding inside everyday conversations."],
    outputs: ["Workflow audit", "Goals & constraints", "Success criteria"],
  },
  {
    stage: "Plan",
    title: "Shape the simplest useful path.",
    focus: "Clarify · structure · decide",
    paragraphs: ["I turn what we learn into a focused plan—what the system should do, where people stay in control, and what can wait until later."],
    outputs: ["System map", "Technical direction", "Delivery plan"],
  },
  {
    stage: "Build",
    title: "Turn the plan into a working system.",
    focus: "Design · develop · connect",
    paragraphs: ["Interfaces, automation, AI, data, and integrations come together as one dependable workflow, with progress kept visible along the way."],
    outputs: ["Working product", "Connected tools", "Review points"],
  },
  {
    stage: "Test",
    title: "Prove it in the real workflow.",
    focus: "Verify · refine · prepare",
    paragraphs: ["We test the important paths, edge cases, responsiveness, and handoffs—then refine what feels unclear before the system reaches your customers or team."],
    outputs: ["Quality checks", "Real-world review", "Launch readiness"],
  },
  {
    stage: "Launch & support",
    title: "Put it to work—and keep it useful.",
    focus: "Deploy · observe · improve",
    paragraphs: ["I launch with care, make the handover clear, and stay available for the improvements that only become visible once a system is doing real work."],
    outputs: ["Deployment", "Clear handover", "Ongoing support"],
  },
] as const;

type TimelineStyle = CSSProperties & { "--experience-progress": number };

const services = ["Workflow automation", "AI chatbots", "Web development"];

function ProcessIcon({ index }: { index: number }) {
  const icons = [
    <g key="discover"><circle cx="10" cy="10" r="2.4" /><path d="M3 7V3h4m6 0h4v4M3 13v4h4m6 0h4v-4" /></g>,
    <g key="plan"><path d="M4 3.5h12v13H4zM7 7.5h6M7 11h6M7 14.5h3" /></g>,
    <g key="build"><path d="m6 6-4 4 4 4m8-8 4 4-4 4M11.5 4l-3 12" /></g>,
    <g key="test"><path d="M2.5 10h3l2-4 3.5 8 2-4h4.5" /></g>,
    <g key="launch"><path d="M10 15V4.5M6 8.5l4-4 4 4M4 17h12" /></g>,
  ];

  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45" viewBox="0 0 20 20">
      {icons[index]}
    </svg>
  );
}

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
      let currentIndex = 0;
      timelineItems.forEach((item, index) => {
        const active = progress >= (index + 0.12) / process.length;
        if (active) currentIndex = index;
        item.dataset.active = String(active);
      });
      timelineItems.forEach((item, index) => {
        item.dataset.current = String(index === currentIndex);
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
        applyProgress((viewportGuide - bounds.top) / Math.max(bounds.height, 1));
      });
    };

    const followPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion?.matches) return;
      const { clientY } = event;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;
        const bounds = timeline.getBoundingClientRect();
        applyProgress((clientY - bounds.top) / Math.max(bounds.height, 1));
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
    <section aria-labelledby="services-heading" className="section-shell experience-section" id="services" ref={sectionRef}>
      <div className="experience-layout">
        <div className="experience-intro">
          <p className="system-label" data-reveal="fade">What I Can Do</p>
          <h2 data-reveal="title" id="services-heading">
            How I help. <span>Systems that keep working.</span>
          </h2>
          <p data-reveal data-reveal-delay="70">
            Websites, AI assistants, and automations built to remove repetitive work and keep your business moving.
          </p>
        </div>
        <ol aria-label="Five-step delivery process" className="experience-list" ref={timelineRef} style={{ "--experience-progress": 0 } as TimelineStyle}>
          {process.map((item, index) => (
            <li data-active="false" data-current="false" key={item.stage}>
              <span className="experience-node" aria-hidden="true">
                <span className="experience-node__icon"><ProcessIcon index={index} /></span>
                <span className="experience-node__check">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 12 12">
                    <path d="m2.5 6.2 2.1 2.1 4.9-4.8" />
                  </svg>
                </span>
              </span>
              <article className="experience-entry">
                <header data-reveal="left">
                  <p className="experience-company"><span>{String(index + 1).padStart(2, "0")} /</span> {item.stage}</p>
                  <h3>{item.title}</h3>
                  <p className="experience-meta"><span>{item.focus}</span></p>
                </header>
                <div className="experience-narrative" data-reveal data-reveal-delay="50">
                  {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <ul className="experience-skills" aria-label={`${item.stage} outputs`} data-reveal data-reveal-delay="100">
                  {item.outputs.map((output) => <li key={output}>{output}</li>)}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <div className="experience-competencies" data-reveal="fade">
        <div>
          <p className="system-label">What I build</p>
          <ul aria-label="Services">
            {services.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

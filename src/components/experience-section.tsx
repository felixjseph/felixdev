const experienceSignals = [
  {
    marker: "Now",
    title: "Agentic AI & AI automation",
    description:
      "Designing useful agent workflows, approval systems, and automations that keep people informed and in control.",
    tags: ["Agents", "LLM workflows", "Automation"],
  },
  {
    marker: "Core",
    title: "Full-stack product development",
    description:
      "Building the complete product surface—from interface and application logic to data, integration, and deployment.",
    tags: ["Web applications", "APIs", "Cloud"],
  },
  {
    marker: "Always",
    title: "Ownership through improvement",
    description:
      "Adapting quickly, carrying decisions through delivery, and measuring whether the system actually helps the operation.",
    tags: ["Research", "Delivery", "Iteration"],
  },
];

export function ExperienceSection() {
  return (
    <section aria-labelledby="experience-heading" className="section-shell experience-section" id="experience">
      <div className="experience-layout">
        <div className="experience-intro">
          <h2 data-reveal="title" id="experience-heading">
            Built to adapt. <span>Expected to own the outcome.</span>
          </h2>
          <p data-reveal data-reveal-delay="70">
            A practical summary. Verified employers and role dates will follow content review.
          </p>
        </div>
        <ol className="experience-list">
          {experienceSignals.map((item, index) => (
            <li key={item.marker}>
              <div className="experience-marker" data-reveal>
                <span>0{index + 1}</span>
                <strong>{item.marker}</strong>
              </div>
              <div>
                <h3 data-reveal="title">{item.title}</h3>
                <p data-reveal data-reveal-delay="60">{item.description}</p>
                <ul data-reveal data-reveal-delay="100">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

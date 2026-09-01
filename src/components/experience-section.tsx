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
          <h2 data-reveal id="experience-heading">
            Built to adapt. <span>Expected to own the outcome.</span>
          </h2>
          <p data-reveal>
            A concise view of how my experience compounds. Verified employers, role dates, and final timeline details
            will be added only after content review.
          </p>
        </div>
        <ol className="experience-list">
          {experienceSignals.map((item, index) => (
            <li data-reveal key={item.marker}>
              <div className="experience-marker">
                <span>0{index + 1}</span>
                <strong>{item.marker}</strong>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
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

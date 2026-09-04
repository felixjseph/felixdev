const experience = [
  {
    marker: "Now",
    company: "Softpoint Solutions",
    period: "Dec 2025 — Present",
    role: "Full-Stack Web & AI Developer",
    location: "Cebu City, PH · Hybrid",
    description: "Building tailored web products and automation systems around real client operations.",
    highlights: [
      "Translate business requirements into responsive, maintainable full-stack applications.",
      "Carry delivery through planning, API integration, testing, deployment, and continuous improvement.",
    ],
    skills: ["Full-stack applications", "API integration", "Automation", "Deployment"],
  },
  {
    marker: "2026",
    company: "Knowles Corporation",
    period: "Mar 2025 — May 2026",
    role: "Web Development Intern",
    location: "Singapore · Full-time remote",
    description: "Maintained and improved a large training-course web estate with a remote cross-functional team.",
    highlights: [
      "Maintained 500+ WordPress course sites while improving content quality, consistency, and on-page SEO.",
      "Supported feature work, testing, debugging, documentation, and performance improvements.",
    ],
    skills: ["WordPress", "SEO", "Quality assurance", "Documentation"],
  },
];

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
  return (
    <section aria-labelledby="experience-heading" className="section-shell experience-section" id="experience">
      <div className="experience-layout">
        <div className="experience-intro">
          <h2 data-reveal="title" id="experience-heading">
            Built to adapt. <span>Expected to own the outcome.</span>
          </h2>
          <p data-reveal data-reveal-delay="70">
            Selected experience, distilled to the responsibility, delivery, and skills that shaped the work.
          </p>
        </div>
        <ol className="experience-list">
          {experience.map((item, index) => (
            <li key={item.company}>
              <div className="experience-marker" data-reveal="fade">
                <span>0{index + 1}</span>
                <strong>{item.marker}</strong>
              </div>
              <article className="experience-entry">
                <header data-reveal="left">
                  <div>
                    <p className="experience-company">{item.company}</p>
                    <h3>{item.role}</h3>
                  </div>
                  <p className="experience-meta"><span>{item.period}</span><span>{item.location}</span></p>
                </header>
                <p className="experience-summary" data-reveal data-reveal-delay="40">{item.description}</p>
                <ul className="experience-highlights" data-reveal data-reveal-delay="70">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
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

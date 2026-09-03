const principles = [
  {
    label: "Understand",
    title: "Map the real work.",
    description: "Find the friction before writing code.",
  },
  {
    label: "Own",
    title: "Carry the whole system.",
    description: "Connect product decisions to delivery.",
  },
  {
    label: "Prove",
    title: "Measure useful change.",
    description: "Improve what creates real value.",
  },
] as const;

export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="about-focus" id="about">
      <div className="about-focus__inner">
        <h2 data-reveal="left" id="about-heading">
          Technology should <em>move work forward.</em>
        </h2>

        <ol className="about-principles">
          {principles.map((principle, index) => (
            <li data-reveal="rise" data-reveal-delay={index * 55} key={principle.label}>
              <span>{principle.label}</span>
              <strong>{principle.title}</strong>
              <p>{principle.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

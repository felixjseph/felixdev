const systemStages = [
  { number: "01", title: "Understand", detail: "real needs + constraints" },
  { number: "02", title: "Shape", detail: "interface + application" },
  { number: "03", title: "Connect", detail: "AI + data + integrations" },
  { number: "04", title: "Deliver", detail: "test + deploy + improve" },
] as const;

const supportOutcomes = [
  "Workflows that keep moving while you sleep.",
  "Leads answered while the moment still matters.",
  "Systems that grow without asking you to do more.",
] as const;

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="signal-system" id="skills">
      <div className="signal-system__inner">
        <div className="signal-system__meta" data-reveal="fade">
          <span>/ 03 &nbsp; The system</span>
          <span>Ideas to impact</span>
        </div>

        <header className="signal-system__heading">
          <h2 data-reveal="left" id="skills-heading">
            From scattered steps <em>to one working system.</em>
          </h2>
          <p data-reveal="right">
            I connect the interface, intelligence, data, and delivery so the whole product can move together.
          </p>
        </header>

        <div className="signal-map" data-reveal="fade">
          <ol className="signal-map__stages">
            {systemStages.map((stage) => (
              <li key={stage.number}>
                <span>{stage.number}</span>
                <strong>{stage.title}</strong>
                <small>{stage.detail}</small>
              </li>
            ))}
          </ol>

          <svg aria-hidden="true" className="signal-map__route" preserveAspectRatio="none" viewBox="0 0 1200 132">
            <defs>
              <linearGradient id="signal-route-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#65e7f4" />
                <stop offset="0.38" stopColor="#a9a5ff" />
                <stop offset="0.68" stopColor="#ffbd87" />
                <stop offset="1" stopColor="#f6f6f1" />
              </linearGradient>
            </defs>
            <path className="signal-map__route-base" d="M36 70 C150 70 175 100 300 86 S485 100 600 94 S790 70 900 83 S1080 68 1164 68" />
            <path className="signal-map__route-glow" d="M36 70 C150 70 175 100 300 86 S485 100 600 94 S790 70 900 83 S1080 68 1164 68" pathLength="1" />
            <path className="signal-map__route-line" d="M36 70 C150 70 175 100 300 86 S485 100 600 94 S790 70 900 83 S1080 68 1164 68" pathLength="1" />
            <g className="signal-map__nodes">
              <g className="signal-map__node signal-map__node--cyan" transform="translate(36 70)"><circle r="16" /><circle r="5" /></g>
              <g className="signal-map__node signal-map__node--lilac" transform="translate(300 86)"><circle r="16" /><circle r="5" /></g>
              <g className="signal-map__node signal-map__node--apricot" transform="translate(600 94)"><circle r="16" /><circle r="5" /></g>
              <g className="signal-map__node signal-map__node--white" transform="translate(900 83)"><circle r="16" /><circle r="5" /></g>
            </g>
            <path className="signal-map__arrow" d="m1160 62 8 6-8 6" />
          </svg>
        </div>

        <ul aria-label="Systems outcomes" className="signal-system__outcomes">
          {supportOutcomes.map((outcome, index) => (
            <li data-reveal="rise" data-reveal-delay={index * 55} key={outcome}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <p>{outcome}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

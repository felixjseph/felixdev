import {
  siAnthropic,
  siDjango,
  siDocker,
  siGit,
  siGooglegemini,
  siNextdotjs,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { ArrowRightIcon } from "./ui-icons";

const frictionPoints = [
  { label: "Manual handoffs", result: "decisions wait" },
  { label: "Disconnected tools", result: "context gets lost" },
  { label: "Repeated admin", result: "focus leaves the real work" },
] as const;

const systemSteps = [
  { title: "Understand", description: "Find the real work and its blockers." },
  { title: "Build", description: "Create useful interfaces and reliable logic." },
  { title: "Connect", description: "Bring tools, data, and people together." },
  { title: "Improve", description: "Test what works and keep refining." },
] as const;

const technologyGroups: Array<{
  label: string;
  items: Array<{ name: string; icon: SimpleIcon }>;
}> = [
  {
    label: "Product",
    items: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "TypeScript", icon: siTypescript },
      { name: "Tailwind CSS", icon: siTailwindcss },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { name: "Python", icon: siPython },
      { name: "Google Gemini", icon: siGooglegemini },
      { name: "Anthropic", icon: siAnthropic },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Supabase", icon: siSupabase },
      { name: "Django", icon: siDjango },
      { name: "Docker", icon: siDocker },
      { name: "Git", icon: siGit },
    ],
  },
];

function TechnologyMark({ icon, name }: { icon: SimpleIcon; name: string }) {
  return (
    <li title={name}>
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d={icon.path} />
      </svg>
      <span>{name}</span>
    </li>
  );
}

export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="friction-flow" id="about">
      <div className="friction-flow__inner">
        <div className="friction-flow__meta" data-reveal="fade">
          <span>/ 01 &nbsp; From friction to flow</span>
          <span>Better tools. Brighter work.</span>
        </div>

        <div className="friction-flow__intro">
          <h2 data-reveal="left" id="about-heading">
            Where work <em>slows down.</em>
          </h2>
          <p data-reveal="right">
            Real progress gets stuck in small, everyday frictions. I build systems that remove them.
          </p>
        </div>

        <ol aria-label="Common sources of workflow friction" className="friction-ledger">
          {frictionPoints.map((item, index) => (
            <li data-reveal="rise" data-reveal-delay={index * 55} key={item.label}>
              <span className="friction-ledger__index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <ArrowRightIcon className="friction-ledger__arrow" />
              <b>{item.result}</b>
            </li>
          ))}
        </ol>

        <div className="system-method">
          <div className="system-method__meta" data-reveal="fade">
            <span>/ 02 &nbsp; A simple system</span>
            <span>Less friction. More forward.</span>
          </div>
          <ol className="system-method__steps">
            {systemSteps.map((step, index) => (
              <li data-reveal="rise" data-reveal-delay={index * 40} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
                {index < systemSteps.length - 1 ? <ArrowRightIcon aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </div>

        <p className="friction-flow__statement" data-reveal="title">
          I design useful software and AI-assisted workflows <em>that make the next step clearer.</em>
        </p>

        <div className="technology-proof">
          <div className="technology-proof__meta" data-reveal="fade">
            <span>/ 03 &nbsp; Technology I work with</span>
            <span>Tools in service of better work.</span>
          </div>
          <div className="technology-proof__groups">
            {technologyGroups.map((group, index) => (
              <div data-reveal="rise" data-reveal-delay={index * 45} key={group.label}>
                <h3>{group.label}</h3>
                <ul aria-label={`${group.label} technologies`}>
                  {group.items.map((item) => <TechnologyMark {...item} key={item.name} />)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  siAndroid,
  siAnthropic,
  siC,
  siCss,
  siDjango,
  siDocker,
  siGit,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siKotlin,
  siNextdotjs,
  siPhp,
  siPython,
  siReact,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import type { CSSProperties } from "react";
import {
  engineeringPractices,
  skillLanes,
  textOnlyTechnologies,
  type SkillItem,
  type SkillLogo,
} from "@/content/portfolio";

const icons: Record<SkillLogo, SimpleIcon> = {
  android: siAndroid,
  anthropic: siAnthropic,
  c: siC,
  css: siCss,
  django: siDjango,
  docker: siDocker,
  git: siGit,
  googlegemini: siGooglegemini,
  html5: siHtml5,
  javascript: siJavascript,
  kotlin: siKotlin,
  nextdotjs: siNextdotjs,
  php: siPhp,
  python: siPython,
  react: siReact,
  springboot: siSpringboot,
  supabase: siSupabase,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
};

function SkillPill({ item }: { item: SkillItem }) {
  const icon = icons[item.logo];
  const brandColor = icon.hex === "000000" ? "var(--color-text)" : `#${icon.hex}`;

  return (
    <li className="skill-pill" style={{ "--skill-color": brandColor } as CSSProperties}>
      <svg aria-hidden="true" className="skill-logo" viewBox="0 0 24 24">
        <path d={icon.path} />
      </svg>
      <span>{item.name}</span>
    </li>
  );
}

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="section-shell skills-section" id="skills">
      <div className="section-heading-grid">
        <h2 data-reveal id="skills-heading">
          A broad stack.
          <span> One operating standard.</span>
        </h2>
        <p data-reveal>
          I choose tools around the workflow—not the other way around. Every layer should make the system clearer,
          faster, or easier to maintain.
        </p>
      </div>

      <div aria-label="Technology skills" className="skill-lanes" data-reveal>
        {skillLanes.map((lane) => (
          <div className="skill-lane" data-direction={lane.direction} key={lane.label}>
            <p className="skill-lane__label">{lane.label}</p>
            <div className="skill-lane__viewport">
              <div className="skill-track">
                <ul className="skill-set">
                  {lane.items.map((item) => (
                    <SkillPill item={item} key={`${lane.label}-${item.name}`} />
                  ))}
                </ul>
                <ul aria-hidden="true" className="skill-set">
                  {lane.items.map((item) => (
                    <SkillPill item={item} key={`${lane.label}-duplicate-${item.name}`} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="skills-details" data-reveal>
        <div>
          <p className="micro-label">Also in the toolbox</p>
          <div className="text-tech-list">
            {textOnlyTechnologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
        <div className="practice-grid">
          {engineeringPractices.map((practice) => (
            <article className="practice-card" key={practice.title}>
              <span>{practice.index}</span>
              <h3>{practice.title}</h3>
              <p>{practice.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  siZapier,
  type SimpleIcon,
} from "simple-icons";
import { skillLanes, type SkillItem, type SkillLogo } from "@/content/portfolio";

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
  zapier: siZapier,
};

const carouselSkills = Array.from(
  new Map(skillLanes.flatMap((lane) => lane.items).map((item) => [item.name, item])).values(),
);

function SkillMark({ item }: { item: SkillItem }) {
  const icon = icons[item.logo];

  return (
    <li
      aria-label={item.name}
      className="skill-mark"
      data-label={item.name}
      title={item.name}
    >
      <svg aria-hidden="true" className="skill-logo" viewBox="0 0 24 24">
        <path d={icon.path} />
      </svg>
    </li>
  );
}

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="skills-section" id="skills">
      <div className="skills-heading">
        <h2 data-reveal="title" id="skills-heading">
          A broad stack. <span>One clear standard.</span>
        </h2>
        <p data-reveal data-reveal-delay="70">A focused toolkit for useful, maintainable products.</p>
      </div>

      <div aria-label="Technology skills" className="skill-lanes">
        <div className="skill-lane">
          <div className="skill-lane__viewport">
            <div className="skill-track">
              <ul className="skill-set">
                {carouselSkills.map((item) => <SkillMark item={item} key={item.name} />)}
              </ul>
              <ul aria-hidden="true" className="skill-set">
                {carouselSkills.map((item) => <SkillMark item={item} key={`duplicate-${item.name}`} />)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

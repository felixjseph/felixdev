import { siClaudecode, siCursor, siZapier, type SimpleIcon } from "simple-icons";
import { skillItems, type SkillItem, type SkillLogo } from "@/content/portfolio";

const icons: Record<SkillLogo, SimpleIcon> = {
  claudecode: siClaudecode,
  cursor: siCursor,
  zapier: siZapier,
};

function SkillMark({ item }: { item: SkillItem }) {
  const icon = item.logo ? icons[item.logo] : null;

  return (
    <li aria-label={item.name} className="skill-mark" title={item.name}>
      {icon ? (
        <svg aria-hidden="true" className="skill-logo" viewBox="0 0 24 24">
          <path d={icon.path} />
        </svg>
      ) : null}
      <span aria-hidden="true" className={icon ? "skill-name" : "skill-name skill-name--wordmark"}>
        {item.name}
      </span>
    </li>
  );
}

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="skills-section" id="skills">
      <div className="skills-heading">
        <h2 data-reveal="fade" id="skills-heading">
          Daily drivers. <span>Built for the work.</span>
        </h2>
        <p data-reveal data-reveal-delay="70">
          An AI-native toolkit for designing, building, and automating useful systems.
        </p>
      </div>

      <div aria-label="Daily tools" className="skill-lanes" data-reveal="fade">
        <div className="skill-lane">
          <div className="skill-lane__viewport">
            <div className="skill-track">
              <ul className="skill-set">
                {skillItems.map((item) => <SkillMark item={item} key={item.name} />)}
              </ul>
              <ul aria-hidden="true" className="skill-set">
                {skillItems.map((item) => <SkillMark item={item} key={`duplicate-${item.name}`} />)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

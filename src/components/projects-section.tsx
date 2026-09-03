import styles from "./portfolio-work.module.css";
import Link from "next/link";
import { portfolioProjects } from "@/content/portfolio";
import { softpointProject as project } from "@/content/softpoint";
import { ProjectPreviewGallery } from "./project-preview-gallery";
import { ArrowUpRightIcon } from "./ui-icons";

export function ProjectsSection() {
  return (
    <section aria-labelledby="projects-heading" className={`section-shell ${styles["projects-section"]}`} id="projects">
      <div className={styles["selected-work-heading"]}>
        <h2 data-reveal="left" id="projects-heading">Selected work. <em>Useful by design.</em></h2>
        <p data-reveal="right">Thoughtful interfaces. Practical systems.</p>
      </div>
      <article className={styles["featured-work"]} aria-labelledby="softpoint-title">
        <div className={styles["featured-work__preview"]} data-reveal="card">
          <ProjectPreviewGallery title={project.title} media={project.media} />
        </div>
        <div className={styles["featured-work__content"]}>
          <div className={styles["featured-work__eyebrow"]} data-reveal="fade">
            <span>01 / Featured project</span>
            <time dateTime={project.date}>{project.dateLabel}</time>
          </div>
          <h3 id="softpoint-title" data-reveal="right">{project.title}</h3>
          <p className={styles["featured-work__role"]} data-reveal>{project.role}</p>
          <p className={styles["featured-work__summary"]} data-reveal>{project.summary}</p>
          <p className={styles["featured-work__outcome"]} data-reveal>
            <strong>{project.outcome.value}</strong>
            <span>{project.outcome.label}<small>through workflow automation</small></span>
          </p>
          <ul aria-label={`${project.title} technologies`} className={styles["work-technologies"]} data-reveal>
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className={styles["work-actions"]} data-reveal>
            <a href={project.website} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRightIcon /></a>
            <Link href={`/work/${project.slug}`}>View case study <ArrowUpRightIcon /></Link>
          </div>
        </div>
      </article>
      <div className={styles["work-explorations"]} aria-label="Concept explorations">
        {portfolioProjects.map((concept) => (
          <details className={styles["work-exploration"]} key={concept.number} data-reveal="rise">
            <summary>
              <span className={styles["work-exploration__label"]}>Concept / {concept.number}</span>
              <span className={styles["work-exploration__title"]}>{concept.title}</span>
              <span className={styles["work-exploration__toggle"]} aria-hidden="true">+</span>
            </summary>
            <p>{concept.solution}</p>
            <ul className={styles["work-technologies"]} aria-label={`${concept.title} technologies`}>
              {concept.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            <small>{concept.target}</small>
          </details>
        ))}
      </div>
    </section>
  );
}

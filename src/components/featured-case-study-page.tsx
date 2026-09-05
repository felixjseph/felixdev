import type { ReactNode } from "react";
import Link from "next/link";
import styles from "@/components/portfolio-work.module.css";
import type { CaseStudyProject } from "@/types/project";
import { ProjectPreviewGallery } from "@/components/project-preview-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowUpRightIcon } from "@/components/ui-icons";

type FeaturedCaseStudyProject = CaseStudyProject & {
  date?: string;
  dateLabel?: string;
  role?: string;
  website?: string;
  outcome?: { value: string; label: string; detail?: string };
};

type FeaturedCaseStudyPageProps = {
  project: FeaturedCaseStudyProject;
  background?: string;
  imageFit?: "contain" | "cover";
  children?: ReactNode;
};

/** Shared editorial shell used by every selected-work case study. */
export function FeaturedCaseStudyPage({ project, background, imageFit, children }: FeaturedCaseStudyPageProps) {
  return (
    <>
      <SiteHeader linkToHomepage />
      <main className={styles["project-case"]}>
        <header className={styles["project-case__intro"]}>
          <Link className={styles["work-back"]} href="/#projects">← Back to selected work</Link>
          <p className={styles["project-case__meta"]}>
            {project.date ? <time dateTime={project.date}>{project.dateLabel ?? project.date}</time> : (project.dateLabel ?? "Project study")}
            {project.role ? ` / ${project.role}` : ""}
          </p>
          <h1>{project.title}</h1>
          <p className={styles["project-case__lead"]}>{project.proofAngle}</p>
          <p className={styles["project-case__summary"]}>{project.summary}</p>
          {project.website && (
            <div className={styles["work-actions"]}>
              <a href={project.website} target="_blank" rel="noopener noreferrer">
                Visit live website <ArrowUpRightIcon />
              </a>
            </div>
          )}
        </header>

        <ProjectPreviewGallery background={background} imageFit={imageFit} media={project.media} title={project.title} wide />

        <div className={styles["project-case__facts"]}>
          {project.outcome ? (
            <p className={styles["featured-work__outcome"]}>
              <strong>{project.outcome.value}</strong>
              <span>{project.outcome.label}{project.outcome.detail && <small>{project.outcome.detail}</small>}</span>
            </p>
          ) : project.role ? (
            <p className={styles["featured-work__role"]}>{project.role}</p>
          ) : null}
          <ul className={styles["work-technologies"]} aria-label={`${project.title} technologies`}>
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>

        <nav className={styles["project-case__nav"]} aria-label="Case study chapters">
          <span className="system-label">Chapters</span>
          <ol>
            {project.sections.map((section, index) => (
              <li key={section.id}>
                <Link href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{section.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles["project-case__chapters"]}>
          {project.sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <span className="system-label">{String(index + 1).padStart(2, "0")}</span>
              <h2 id={`${section.id}-heading`} data-reveal="rise">{section.title}</h2>
              <div data-reveal="fade">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>
          ))}
        </div>

        {children}
        <Link className={styles["work-back"]} href="/#projects">← Back to selected work</Link>
      </main>
      <SiteFooter />
    </>
  );
}

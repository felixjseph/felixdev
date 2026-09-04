import styles from "@/components/portfolio-work.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ProjectPreviewGallery } from "@/components/project-preview-gallery";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRightIcon } from "@/components/ui-icons";
import { softpointProject as project } from "@/content/softpoint";

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
  alternates: { canonical: `/work/${project.slug}` },
  openGraph: {
    url: `/work/${project.slug}`,
    title: `${project.title} — Felix Castañeda`,
    description: project.summary,
    images: [{ url: project.media[0].src, width: 1080, height: 530, alt: project.media[0].alt }],
  },
};

export default function SoftpointEnterprisePage() {
  return (
    <>
      <SiteHeader linkToHomepage />
      <main className={styles["project-case"]}>
        <header className={styles["project-case__intro"]}>
          <Link className={styles["work-back"]} href="/#projects">← Selected work</Link>
          <p className={styles["project-case__meta"]}><time dateTime={project.date}>{project.dateLabel}</time> / {project.role}</p>
          <h1>{project.title}</h1>
          <p className={styles["project-case__lead"]}>{project.proofAngle}</p>
          <p className={styles["project-case__summary"]}>{project.summary}</p>
          <div className={styles["work-actions"]}>
            <a href={project.website} target="_blank" rel="noopener noreferrer">Visit live website <ArrowUpRightIcon /></a>
          </div>
        </header>
        <ProjectPreviewGallery media={project.media} title={project.title} wide />
        <div className={styles["project-case__facts"]}>
          <p className={styles["featured-work__outcome"]}>
            <strong>{project.outcome.value}</strong><span>{project.outcome.label}<small>through workflow automation</small></span>
          </p>
          <ul className={styles["work-technologies"]} aria-label={`${project.title} technologies`}>
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
        <div className={styles["project-case__chapters"]}>
          {project.sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <span className="system-label">0{index + 1}</span>
              <h2 id={`${section.id}-heading`} data-reveal="rise">{section.title}</h2>
              <div data-reveal="fade">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>
          ))}
        </div>
        <Link className={styles["work-back"]} href="/#projects">← Back to selected work</Link>
      </main>
      <SiteFooter />
    </>
  );
}

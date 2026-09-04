import styles from "@/components/portfolio-work.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ProjectPreviewGallery } from "@/components/project-preview-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowUpRightIcon } from "@/components/ui-icons";
import { solaraProject as project } from "@/content/solara";

export const metadata: Metadata = {
  title: `${project.title} — Felix Castañeda`,
  description: project.summary,
  alternates: { canonical: "/work/solara" },
  openGraph: {
    url: "/work/solara",
    title: `${project.title} — Felix Castañeda`,
    description: project.summary,
    images: [{ url: project.media[0].src, width: project.media[0].width, height: project.media[0].height, alt: project.media[0].alt }],
  },
};

export default function SolaraPage() {
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
        <ProjectPreviewGallery background="#fff7ec" media={project.media} title={project.title} wide />
        <div className={styles["project-case__facts"]}>
          <p className={styles["featured-work__role"]}>{project.role}</p>
          <ul className={styles["work-technologies"]} aria-label={`${project.title} technologies`}>
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
        <div className={styles["project-case__chapters"]}>
          {project.sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <span className="system-label">{String(index + 1).padStart(2, "0")}</span>
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

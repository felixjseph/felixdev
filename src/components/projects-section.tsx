import styles from "./portfolio-work.module.css";
import Link from "next/link";
import { softpointProject as project } from "@/content/softpoint";
import { solaraProject as solara } from "@/content/solara";
import { projects } from "@/content/projects";
import { ProjectPreviewGallery } from "./project-preview-gallery";
import { ArrowUpRightIcon } from "./ui-icons";

export function ProjectsSection() {
  const sayu = projects.find((item) => item.slug === "sayu-cafe")!;
  return (
    <section aria-labelledby="projects-heading" className={`section-shell ${styles["projects-section"]}`} id="projects">
      <div className={styles["selected-work-heading"]}>
        <h2 data-reveal="left" id="projects-heading">Selected work. <em>Useful by design.</em></h2>
        <p data-reveal="right">Thoughtful interfaces. Practical systems.</p>
      </div>
      <div className={styles["featured-list"]}>
      <article className={styles["featured-work"]} aria-labelledby="softpoint-title">
        <div className={styles["featured-work__preview"]} data-reveal="card">
          <ProjectPreviewGallery title={project.title} media={project.media} showCaption={false} showSelectors={false} />
        </div>
        <div className={styles["featured-work__content"]}>
          <div className={styles["featured-work__eyebrow"]} data-reveal="fade">
            <span>01 / Featured project</span>
            <time dateTime={project.date}>{project.dateLabel}</time>
          </div>
          <div className={styles["featured-work__identity"]}>
            <h3 id="softpoint-title" data-reveal="right">{project.title}</h3>
            <p className={styles["featured-work__role"]} data-reveal>{project.role}</p>
          </div>
          <div className={styles["featured-work__description"]} data-reveal>
            <p>{project.homepageDescription}</p>
          </div>
          <ul aria-label={`${project.title} technologies`} className={styles["work-technologies"]} data-reveal>
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className={styles["work-actions"]} data-reveal>
            <a href={project.website} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRightIcon /></a>
            <Link href={`/work/${project.slug}`}>View case study <ArrowUpRightIcon /></Link>
          </div>
        </div>
      </article>
      <article className={styles["featured-work"]} aria-labelledby="sayu-title">
        <div className={styles["featured-work__preview"]} data-reveal="card">
          <ProjectPreviewGallery title={sayu.title} background="#354fa3" media={[{
            src: "/images/brands/sayu.jpg", alt: "Sayu Café brand identity — project screenshots to follow.",
            width: 2048, height: 2030, caption: "Brand preview",
          }]} showCaption={false} showSelectors={false} stackSize={3} />
        </div>
        <div className={styles["featured-work__content"]}>
          <div className={styles["featured-work__eyebrow"]} data-reveal="fade"><span>02 / Project study</span><span>Café & hospitality</span></div>
          <div className={styles["featured-work__identity"]}>
            <h3 id="sayu-title" data-reveal="left">{sayu.title}</h3>
          </div>
          <div className={styles["featured-work__description"]} data-reveal>
            <p>{sayu.homepageDescription ?? sayu.summary}</p>
          </div>
          <ul className={styles["work-technologies"]} aria-label={`${sayu.title} technologies`} data-reveal>
            {sayu.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className={styles["work-actions"]} data-reveal><Link href={`/work/${sayu.slug}`}>Explore project study <ArrowUpRightIcon /></Link></div>
          <p className={styles["featured-work__note"]}>Brand identity shown. Project screenshots to follow.</p>
        </div>
      </article>
      <article className={styles["featured-work"]} aria-labelledby="solara-title">
        <div className={styles["featured-work__preview"]} data-reveal="card">
          <ProjectPreviewGallery title={solara.title} background="#fff7ec" media={solara.media} showCaption={false} showSelectors={false} />
        </div>
        <div className={styles["featured-work__content"]}>
          <div className={styles["featured-work__eyebrow"]} data-reveal="fade">
            <span>03 / Client project</span>
            <time dateTime={solara.date}>{solara.dateLabel}</time>
          </div>
          <div className={styles["featured-work__identity"]}>
            <h3 id="solara-title" data-reveal="right">{solara.title}</h3>
            <p className={styles["featured-work__role"]} data-reveal>{solara.role}</p>
          </div>
          <div className={styles["featured-work__description"]} data-reveal>
            <p>{solara.homepageDescription}</p>
          </div>
          <ul className={styles["work-technologies"]} aria-label={`${solara.title} technologies`} data-reveal>
            {solara.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className={styles["work-actions"]} data-reveal>
            <a href={solara.website} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRightIcon /></a>
            <Link href={`/work/${solara.slug}`}>View case study <ArrowUpRightIcon /></Link>
          </div>
        </div>
      </article>
      </div>
    </section>
  );
}

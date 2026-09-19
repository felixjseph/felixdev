import { FelixPortrait } from "./felix-portrait";
import styles from "./about-me-section.module.css";

const workBeliefs = [
  {
    index: "01",
    title: "Automation systems",
    body: "I build automation systems because businesses should spend their energy on growth—not on processes that can run themselves.",
  },
  {
    index: "02",
    title: "AI chatbots",
    body: "I build AI chatbots because every message in your DMs is a real opportunity—to answer well, respond faster, and keep conversations moving.",
  },
  {
    index: "03",
    title: "Websites",
    body: "I build websites because every business deserves a place online that works for them around the clock.",
  },
] as const;

export function AboutMeSection() {
  return (
    <section aria-labelledby="about-felix-heading" className={styles.section} id="about-felix">
      <div className={`section-shell ${styles.shell}`}>
        <header className={styles.chapter} data-reveal="fade">
          <p><span>/ Person</span> Beyond the projects</p>
          <p>Curiosity into useful systems.</p>
        </header>

        <div className={styles.story}>
          <h2 data-reveal="title" id="about-felix-heading">
            Hi, I’m <em>Felix.</em>
          </h2>
          <p className={styles.hook} data-reveal data-reveal-delay="50">
            It started with a simple question: <span>Is there a more efficient way to do this?</span>
          </p>
          <p className={styles.origin} data-reveal data-reveal-delay="80">
            I kept noticing the same repetitive tasks in nearly every business. Once I realized machines could handle most of them, I found workflow automation—and I haven’t looked back.
          </p>

          <div aria-label="What Felix builds and why" className={styles.beliefs}>
            {workBeliefs.map((belief, index) => (
              <article data-reveal="left" data-reveal-delay={index * 45} key={belief.title}>
                <span aria-hidden="true">{belief.index}</span>
                <div>
                  <h3>{belief.title}</h3>
                  <p>{belief.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.availability} data-reveal="fade" data-reveal-delay="100">
            <span aria-hidden="true" className={styles.availabilityDot} />
            <div>
              <p>Open to work</p>
              <span>Available for thoughtful web, AI, and automation projects.</span>
            </div>
            <span aria-hidden="true" className={styles.availabilityState}>Now</span>
          </div>
        </div>

        <FelixPortrait />
      </div>
    </section>
  );
}

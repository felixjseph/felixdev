import { FelixPortrait } from "./felix-portrait";
import styles from "./about-me-section.module.css";

const workBeliefs = [
  {
    index: "01",
    title: "Automation systems",
    body: "I automate repetitive work so teams can spend more energy growing the business.",
  },
  {
    index: "02",
    title: "AI chatbots",
    body: "I build helpful AI chatbots that answer faster and keep real opportunities moving.",
  },
  {
    index: "03",
    title: "Websites",
    body: "I build websites that keep your business visible, useful, and working around the clock.",
  },
] as const;

function BeliefIcon({ index }: { index: number }) {
  const icons = [
    <g key="automation"><path d="M4 7h12M4 13h12M7 4v6M13 10v6" /><circle cx="7" cy="13" r="1.5" /><circle cx="13" cy="7" r="1.5" /></g>,
    <g key="chat"><path d="M4 4.5h12v8H9l-4 3v-3H4zM7 8h.01M10 8h.01M13 8h.01" /></g>,
    <g key="web"><circle cx="10" cy="10" r="6.5" /><path d="M3.5 10h13M10 3.5c2 1.8 3 4 3 6.5s-1 4.7-3 6.5c-2-1.8-3-4-3-6.5s1-4.7 3-6.5Z" /></g>,
  ];

  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" viewBox="0 0 20 20">
      {icons[index]}
    </svg>
  );
}

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
                <div className={styles.beliefTop}>
                  <span aria-hidden="true">{belief.index}</span>
                  <span aria-hidden="true" className={styles.beliefIcon}><BeliefIcon index={index} /></span>
                </div>
                <div className={styles.beliefCopy}>
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

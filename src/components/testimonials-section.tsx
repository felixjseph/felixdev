import styles from "./testimonials-section.module.css";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonial-heading" className={styles.section} id="testimonial">
      <div className={styles.shell}>
        <figure className={styles.quote}>
          <figcaption className={styles.brand} data-reveal="left">
            <span aria-hidden="true" className={styles.mark}>B/01</span>
            <div>
              <strong>Business name pending</strong>
              <span>Client testimonial</span>
            </div>
          </figcaption>

          <div className={styles.content}>
            <span aria-label="5 out of 5 stars, draft rating" className={styles.stars} data-reveal="fade">
              <b aria-hidden="true">★★★★★</b>
            </span>
            <blockquote data-reveal="right" data-reveal-delay="60" id="testimonial-heading">
              “Felix understands what the work needs. <em>Clear, practical solutions that create value.</em>”
            </blockquote>
            <p className={styles.note} data-reveal data-reveal-delay="120">Draft testimonial · attribution pending approval</p>
          </div>
        </figure>
      </div>
    </section>
  );
}

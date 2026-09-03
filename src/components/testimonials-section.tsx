import styles from "./testimonials-section.module.css";
import Image from "next/image";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonial-heading" className={styles.section} id="testimonial">
      <div className={styles.shell}>
        <h2 className={styles.heading} id="testimonial-heading" data-reveal="left">Good work. <em>Good company.</em></h2>
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <figure className={styles.quote} key={testimonial.business} data-reveal="rise">
              <figcaption className={styles.brand}>
                <span className={`${styles.mark} ${styles[testimonial.logoStyle]}`}>
                  <Image src={testimonial.logo} width={96} height={96} sizes="80px" alt={`${testimonial.business} logo`} />
                </span>
                <div>
                  <strong>{testimonial.business}</strong>
                  <span>Client testimonial</span>
                </div>
              </figcaption>
              <div className={styles.content}>
                {testimonial.rating !== null ? (
                  <span aria-label={`${testimonial.rating} out of 5 stars${testimonial.sample ? ", sample rating" : ""}`} className={styles.stars}>
                    <b aria-hidden="true">{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</b>
                  </span>
                ) : <span className={styles.pending}>A note to come</span>}
                {testimonial.quote ? (
                  <blockquote>“{testimonial.quote} {testimonial.emphasis && <em>{testimonial.emphasis}</em>}”</blockquote>
                ) : (
                  <p className={styles.placeholder}>A space for {testimonial.business}’s perspective.<span>Client quote and rating to be provided.</span></p>
                )}
                {testimonial.sample && <p className={styles.note}>Sample testimonial & rating · not client-submitted</p>}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

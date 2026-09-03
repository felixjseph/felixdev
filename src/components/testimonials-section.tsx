export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonial-heading" className="testimonial-section" id="testimonial">
      <div className="section-shell testimonial-shell">
        <figure className="testimonial-quote">
          <div className="testimonial-brand" data-reveal="left">
            <span aria-hidden="true" className="testimonial-brand__mark">B/01</span>
            <div>
              <strong>Business name pending</strong>
              <span>Client testimonial</span>
            </div>
          </div>

          <div className="testimonial-content">
            <span aria-label="5 out of 5 stars, draft rating" className="testimonial-stars" data-reveal="fade">
              <b aria-hidden="true">★★★★★</b>
            </span>
            <blockquote data-reveal="right" data-reveal-delay="60" id="testimonial-heading">
              “Felix understands what the work actually needs. His solutions are <em>clear, practical, and built to
              create meaningful value.</em>”
            </blockquote>
            <figcaption data-reveal data-reveal-delay="120">Draft testimonial · attribution pending approval</figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}

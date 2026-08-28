import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <p className="system-label text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Testimonials</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-[-0.05em]" id="testimonials-heading">
        Trusted by people who use the work.
      </h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure className="border-2 border-[var(--color-text)] bg-[var(--color-surface)] p-6" key={testimonial.name}>
            <blockquote className="text-lg">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 font-semibold">
              {testimonial.name} <span className="font-normal">— {testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

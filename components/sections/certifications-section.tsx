import { CertificationItem } from "@/components/ui/certification-item";
import { certifications } from "@/lib/certifications";

export function CertificationsSection() {
  return (
    <section id="certifications" className="mx-auto w-[80%] py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        N° 04 — Certifications
      </p>
      <h2 className="mt-4 font-display text-3xl font-medium leading-display text-ink sm:text-4xl">
        Certifications
      </h2>

      <div className="mt-12">
        {certifications.map((certification) => (
          <CertificationItem
            key={certification.title}
            certification={certification}
          />
        ))}
      </div>
    </section>
  );
}

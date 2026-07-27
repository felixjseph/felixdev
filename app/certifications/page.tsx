import { CertificationItem } from "@/components/ui/certification-item";
import { certifications } from "@/lib/certifications";

export default function CertificationsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        N° 03 — Certifications
      </p>
      <h1 className="mt-4 font-display font-medium leading-display text-4xl text-ink sm:text-5xl">
        Certifications
      </h1>

      <div className="mt-12">
        {certifications.map((certification) => (
          <CertificationItem
            key={certification.verifyHref}
            certification={certification}
          />
        ))}
      </div>
    </main>
  );
}

import type { Certification } from "@/lib/certifications";

export function CertificationItem({
  certification,
}: {
  certification: Certification;
}) {
  const { title, issuer, date, verifyHref, credentialId } = certification;

  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-5 first:border-t">
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
        />
        <div>
          <p className="font-display text-lg font-medium text-ink">
            {title}
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
            {issuer}
            {date ? ` · ${date}` : ""}
          </p>
        </div>
      </div>
      {verifyHref ? (
        <a
          href={verifyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative shrink-0 font-mono text-[11px] uppercase tracking-wide text-ink"
        >
          Verify →
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
        </a>
      ) : credentialId ? (
        <p className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
          ID {credentialId}
        </p>
      ) : null}
    </div>
  );
}

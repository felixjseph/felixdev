import type { ReactNode } from "react";
import { ArrowLink } from "@/components/ui/arrow-link";

const SOCIAL_LINKS = [
  { href: "https://github.com/felixjseph", label: "GitHub" },
  { href: "https://www.linkedin.com/in/felixjseph/", label: "LinkedIn" },
  { href: "https://www.instagram.com/felixjseph/", label: "Instagram" },
  { href: "https://www.facebook.com/felixjseph/", label: "Facebook" },
] as const;

const EMAIL = "felixjosephcastaneda@gmail.com";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted"
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        ↗
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-muted transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto w-[80%]">
      <div className="h-px w-full bg-border" />
      <div className="flex flex-col gap-10 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-xl font-medium text-ink">
            Let&apos;s build something.
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted">
            Open to freelance builds and full-time roles
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
            Cebu, Philippines
          </p>
          <div className="mt-4">
            <ArrowLink href="#certifications" tone="muted">
              Certifications
            </ArrowLink>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <FooterLink href={`mailto:${EMAIL}`}>{EMAIL}</FooterLink>
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {SOCIAL_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
          © {new Date().getFullYear()} Felix Castañeda
        </p>
      </div>
    </footer>
  );
}

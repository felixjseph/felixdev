import type { ReactNode } from "react";
import { EMAIL, socialLinks } from "@/lib/contact";

// Figlet-style banner, every row padded to exactly 43 chars so it stays
// aligned in the mono face. Deliberately ASCII-only: box-drawing characters
// like U+2588 aren't in the `latin` font subset we load, so they'd fall back
// to another face with different metrics and shear the whole wordmark.
const WORDMARK = [
  "  __        _  _            _              ",
  " / _|  ___ | |(_)__  __  __| |  ___ __   __",
  "| |_  / _ \\| || |\\ \\/ / / _` | / _ \\\\ \\ / /",
  "|  _||  __/| || | >  < | (_| ||  __/ \\ V / ",
  "|_|   \\___||_||_|/_/\\_\\ \\__,_| \\___|  \\_/  ",
].join("\n");

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

      {/* Oversized wordmark — decorative, so the accessible name comes from
          the aria-label rather than the block characters. */}
      <div
        role="img"
        aria-label="felixdev"
        className="overflow-x-auto pt-12"
      >
        <pre
          aria-hidden
          className="w-fit font-mono text-[8px] leading-[1.05] text-muted/60 sm:text-[11px] md:text-[15px] lg:text-[18px]"
        >
          {WORDMARK}
        </pre>
      </div>

      <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-bold tracking-tight text-ink">
            Let&apos;s build something.
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted">
            Open to freelance builds and full-time roles
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
            Cebu, Philippines
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
            Education
          </p>
          <p className="mt-3 font-display text-base font-bold tracking-tight text-ink">
            BS in Information Technology
          </p>
          <p className="mt-1.5 font-body text-sm text-ink">
            Cebu Institute of Technology — University
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-ink px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-bg">
              Cum Laude
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Class of 2026
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <FooterLink href={`mailto:${EMAIL}`}>{EMAIL}</FooterLink>
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {socialLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border py-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
          © {new Date().getFullYear()} Felix Joseph Castañeda
        </p>
      </div>
    </footer>
  );
}

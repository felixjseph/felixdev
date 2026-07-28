import Link from "next/link";
import type { ReactNode } from "react";

const TONE_STYLES = {
  ink: { text: "text-ink", underline: "bg-ink" },
  muted: { text: "text-muted", underline: "bg-muted" },
} as const;

export function ArrowLink({
  href,
  children,
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof TONE_STYLES;
}) {
  const { text, underline } = TONE_STYLES[tone];

  return (
    <Link
      href={href}
      className={`group relative inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide ${text}`}
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none ${underline}`}
      />
    </Link>
  );
}

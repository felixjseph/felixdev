import Link from "next/link";
import type { ReactNode } from "react";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative font-mono text-[11px] uppercase tracking-wide text-ink"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}

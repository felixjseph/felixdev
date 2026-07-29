import Link from "next/link";

export function BackToHero() {
  return (
    <Link
      href="/#top"
      className="group relative inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted"
    >
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1 motion-reduce:transition-none"
      >
        ←
      </span>
      Back to hero
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-muted transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </Link>
  );
}

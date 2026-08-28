import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ProjectNotFound() {
  return (
    <>
      <SiteHeader linkToHomepage />
      <main className="mx-auto max-w-3xl px-4 py-20 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">Case studies</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Project not found</h1>
        <p className="mt-5 max-w-xl">That project page is not available. You can return to the portfolio or get in touch about a project.</p>
        <nav aria-label="Project recovery options" className="mt-8 flex flex-wrap gap-3">
          <Link className="border-2 border-[var(--color-text)] bg-[var(--color-accent)] px-5 py-3 font-semibold text-[var(--color-accent-foreground)] shadow-[4px_4px_0_var(--color-text)]" data-accent-surface="primary" href="/#work">Browse the work</Link>
          <Link className="border-2 border-[var(--color-text)] px-5 py-3 font-semibold" href="/#contact">Contact Felix</Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}

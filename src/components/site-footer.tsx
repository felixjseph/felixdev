import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer mx-auto max-w-[92rem] border-t border-[color-mix(in_srgb,var(--color-text)_35%,transparent)] bg-transparent px-4 py-10 lg:px-10">
      <p className="font-semibold tracking-[-0.03em]">Full-Stack &amp; AI Automation Developer</p>
      <p className="text-sm text-[color-mix(in_srgb,var(--color-text)_62%,transparent)]">© {new Date().getFullYear()} Felix Castañeda</p>
      {siteConfig.publicContact.email || siteConfig.publicContact.linkedIn ? (
        <nav aria-label="Footer contact links">
          {siteConfig.publicContact.email ? (
            <a href={`mailto:${siteConfig.publicContact.email}`}>Email</a>
          ) : null}
          {siteConfig.publicContact.linkedIn ? (
            <a href={siteConfig.publicContact.linkedIn}>LinkedIn</a>
          ) : null}
        </nav>
      ) : null}
    </footer>
  );
}

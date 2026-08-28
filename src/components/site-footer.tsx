import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Full-Stack &amp; AI Automation Developer</p>
      <p>© {new Date().getFullYear()} Felix Castañeda</p>
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

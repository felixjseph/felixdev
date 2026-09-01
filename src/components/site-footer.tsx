import { siteConfig } from "@/content/site";
import { ArrowUpIcon } from "./ui-icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span className="site-footer__mark">F/J</span>
        <p>Full-Stack Web &amp; AI Developer</p>
      </div>
      <p>© {new Date().getFullYear()} Felix Joseph Castañeda</p>
      <nav aria-label="Footer navigation">
        <a href="#hero">Back to top <ArrowUpIcon /></a>
        {siteConfig.publicContact.facebook ? <a href={siteConfig.publicContact.facebook}>Facebook</a> : null}
        {siteConfig.publicContact.email ? <a href={`mailto:${siteConfig.publicContact.email}`}>Email</a> : null}
        {siteConfig.publicContact.phone ? <a href={`tel:${siteConfig.publicContact.phone}`}>Phone</a> : null}
      </nav>
    </footer>
  );
}

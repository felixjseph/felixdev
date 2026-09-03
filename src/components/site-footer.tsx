import { siteConfig } from "@/content/site";
import { ArrowUpIcon, EmailIcon, PhoneIcon } from "./ui-icons";
import { BrandMark } from "./brand-mark";
import styles from "./contact-actions.module.css";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div data-reveal>
        <span aria-hidden="true" className="site-footer__mark"><BrandMark /></span>
        <p>Full-Stack Web &amp; AI Developer</p>
      </div>
      <p data-reveal data-reveal-delay="50">© {new Date().getFullYear()} Felix Joseph Castañeda</p>
      <nav aria-label="Footer navigation" className={styles.footerNav} data-reveal data-reveal-delay="100">
        <a className={styles.backTop} href="/#hero">Back to top <span><ArrowUpIcon /></span></a>
        {siteConfig.publicContact.facebook ? <a href={siteConfig.publicContact.facebook}>Facebook</a> : null}
        {siteConfig.publicContact.email ? <a aria-label="Send me an email" title="Send me an email" className={styles.icon} href={`mailto:${siteConfig.publicContact.email}`}><EmailIcon /></a> : null}
        {siteConfig.publicContact.phone ? <a aria-label="Call Felix" title="Call Felix" className={styles.icon} href={`tel:${siteConfig.publicContact.phone.replace(/[^+\d]/g, "")}`}><PhoneIcon /></a> : null}
      </nav>
    </footer>
  );
}

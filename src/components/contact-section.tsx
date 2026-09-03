import { siteConfig } from "@/content/site";
import { ArrowUpRightIcon, EmailIcon, LocationIcon, PhoneIcon } from "./ui-icons";
import { CopyEmailButton } from "./copy-email-button";
import styles from "./contact-actions.module.css";

const contactDetails = [
  { label: "Email", value: siteConfig.publicContact.email, href: `mailto:${siteConfig.publicContact.email}`, icon: EmailIcon },
  { label: "Phone", value: siteConfig.publicContact.phone, href: `tel:${siteConfig.publicContact.phone.replace(/[^+\d]/g, "")}`, icon: PhoneIcon },
  { label: "Location", value: siteConfig.publicContact.location, icon: LocationIcon },
] as const;

export function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="contact-section" id="contact">
      <div className="section-shell contact-shell">
        <div className="contact-heading">
          <h2 data-reveal="right" id="contact-heading">
            Let’s build something <em>useful.</em>
          </h2>
          <div className="contact-intro">
            <p data-reveal="fade" data-reveal-delay="60">Have a project or workflow that deserves a better system? Tell me about it.</p>
            <a className="contact-email-button" data-reveal data-reveal-delay="120" href={`mailto:${siteConfig.publicContact.email}`}>
              Send me an email <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        <dl className="contact-details">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;

            return (
              <div data-reveal="left" data-reveal-delay={index * 55} key={detail.label}>
                <span aria-hidden="true" className="contact-detail-icon"><Icon /></span>
                <div>
                  <dt>{detail.label}</dt>
                  <dd className={detail.label === "Email" ? styles.emailRow : undefined}>
                    {"href" in detail ? <a href={detail.href}>{detail.value}</a> : detail.value}
                    {detail.label === "Email" && <CopyEmailButton email={detail.value} />}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

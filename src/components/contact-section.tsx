import { siteConfig } from "@/content/site";
import { Fragment } from "react";
import { ArrowUpRightIcon, EmailIcon, LocationIcon, PhoneIcon } from "./ui-icons";

const contactDetails = [
  { label: "Email", value: siteConfig.publicContact.email, href: `mailto:${siteConfig.publicContact.email}`, icon: EmailIcon },
  { label: "Phone", value: siteConfig.publicContact.phone, href: `tel:${siteConfig.publicContact.phone.replace(/[^+\d]/g, "")}`, icon: PhoneIcon },
  { label: "Location", value: siteConfig.publicContact.location, icon: LocationIcon },
] as const;

function TypedWords({ text }: { text: string }) {
  return text.split(" ").map((word, wordIndex, words) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className="contact-type-word">
        {Array.from(word).map((character, characterIndex) => (
          <span data-contact-type-char key={`${character}-${characterIndex}`}>{character}</span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="contact-section" id="contact">
      <div className="section-shell contact-shell">
        <div className="contact-heading">
          <h2 aria-label="Let’s build something useful." data-reveal="type" id="contact-heading">
            <span aria-hidden="true">
              <TypedWords text="Let’s build something" /> <em><TypedWords text="useful." /></em>
              <span className="contact-type-caret" data-contact-type-caret />
            </span>
          </h2>
          <div className="contact-intro">
            <p data-reveal="fade" data-reveal-delay="60">
              <span>Have a project or workflow in mind?</span>
              <span>Tell me what should work better.</span>
            </p>
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
                  <dd>{"href" in detail ? <a href={detail.href}>{detail.value}</a> : detail.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

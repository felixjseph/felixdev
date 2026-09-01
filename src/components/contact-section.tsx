import { siteConfig } from "@/content/site";
import { ArrowUpRightIcon } from "./ui-icons";

const contactChannels = [
  {
    label: "Email",
    value: siteConfig.publicContact.email,
    href: siteConfig.publicContact.email ? `mailto:${siteConfig.publicContact.email}` : "",
  },
  {
    label: "Phone",
    value: siteConfig.publicContact.phone,
    href: siteConfig.publicContact.phone ? `tel:${siteConfig.publicContact.phone.replace(/[^+\d]/g, "")}` : "",
  },
  {
    label: "Facebook",
    value: siteConfig.publicContact.facebook,
    href: siteConfig.publicContact.facebook,
  },
];

export function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="contact-section" id="contact">
      <div aria-hidden="true" className="contact-beam" />
      <div className="section-shell contact-shell">
        <div className="contact-heading">
          <h2 data-reveal id="contact-heading">
            Have a workflow worth <em>making better?</em>
          </h2>
          <p data-reveal>
            Tell me what takes too long, breaks too often, or deserves a smarter system. We can start with the problem
            and work forward from there.
          </p>
        </div>
        <div className="contact-channels" data-reveal>
          {contactChannels.map((channel, index) => (
            channel.value ? (
              <a href={channel.href} key={channel.label} rel={channel.label === "Facebook" ? "noreferrer" : undefined} target={channel.label === "Facebook" ? "_blank" : undefined}>
                <span>0{index + 1} / {channel.label}</span>
                <strong>{channel.value}</strong>
                <i><ArrowUpRightIcon /></i>
              </a>
            ) : (
              <div className="contact-channel--placeholder" key={channel.label}>
                <span>0{index + 1} / {channel.label}</span>
                <strong>Contact detail pending</strong>
                <i aria-hidden="true">—</i>
              </div>
            )
          ))}
        </div>
        <p className="contact-note" data-reveal>
          Contact values are intentionally private placeholders until Felix approves them for publication.
        </p>
      </div>
    </section>
  );
}

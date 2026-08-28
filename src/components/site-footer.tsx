const contactLinks = {
  email: "",
  linkedIn: "",
} as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Full-Stack &amp; AI Automation Developer</p>
      <p>© {new Date().getFullYear()} Felix Castañeda</p>
      {contactLinks.email || contactLinks.linkedIn ? (
        <nav aria-label="Footer contact links">
          {contactLinks.email ? <a href={`mailto:${contactLinks.email}`}>Email</a> : null}
          {contactLinks.linkedIn ? <a href={contactLinks.linkedIn}>LinkedIn</a> : null}
        </nav>
      ) : null}
    </footer>
  );
}

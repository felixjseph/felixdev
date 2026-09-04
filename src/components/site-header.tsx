"use client";

import { useEffect, useId, useState } from "react";
import { siteConfig } from "@/content/site";
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";
import { DownloadIcon } from "./ui-icons";

const navigationLinks = [
  { anchor: "about", label: "About" },
  { anchor: "skills", label: "Skills" },
  { anchor: "projects", label: "Projects" },
  { anchor: "experience", label: "Experience" },
  { anchor: "contact", label: "Contact" },
] as const;

type SiteHeaderProps = {
  linkToHomepage?: boolean;
};

export function SiteHeader({ linkToHomepage = false }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const menuId = useId();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = ["about", "skills", "projects", "experience", "contact"]
      .map((anchor) => document.getElementById(anchor))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveAnchor(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const anchorHref = (anchor: string) => `${linkToHomepage ? "/" : ""}#${anchor}`;

  return (
    <header className="site-header">
      <nav
        aria-label="Primary"
        className="site-nav"
      >
        <a aria-label="Felix Castañeda — Home" className="site-mark" href={anchorHref("hero")} onClick={closeMenu}>
          <span aria-hidden="true" className="site-mark__symbol"><BrandMark /></span>
          <span>Felix</span>
        </a>
        <div className="site-nav__links">
          {navigationLinks.map((link) => (
            <a
              aria-current={activeAnchor === link.anchor ? "page" : undefined}
              className={activeAnchor === link.anchor ? "is-active" : undefined}
              href={anchorHref(link.anchor)}
              key={link.anchor}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="site-nav__actions">
          <ThemeToggle />
          {siteConfig.resumeUrl ? (
            <a className="nav-contact" data-resume-state="available" download href={siteConfig.resumeUrl} onClick={closeMenu}>
              Resume <DownloadIcon />
            </a>
          ) : (
            <span
              aria-disabled="true"
              aria-label="Resume — download not yet available"
              className="nav-contact nav-contact--disabled"
              data-resume-state="unavailable"
              title="Add an approved resume PDF in site configuration to enable this download"
            >
              Resume <DownloadIcon />
            </span>
          )}
          <button
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="menu-toggle"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            <span aria-hidden="true" className="menu-toggle__dot" />
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </nav>
      {isMenuOpen ? (
        <nav
          aria-label="Mobile"
          className="mobile-nav"
          id={menuId}
        >
          {navigationLinks.map((link) => (
            <a href={anchorHref(link.anchor)} key={link.anchor} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          {siteConfig.resumeUrl ? (
            <a download href={siteConfig.resumeUrl} onClick={closeMenu}>Download CV</a>
          ) : (
            <span aria-disabled="true" className="mobile-nav__disabled">Résumé unavailable</span>
          )}
        </nav>
      ) : null}
    </header>
  );
}

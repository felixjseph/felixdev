"use client";

import { type MouseEvent, useEffect, useId, useRef, useState } from "react";
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

function startResumeDownload(event: MouseEvent<HTMLAnchorElement>, resumeUrl: string, closeMenu: () => void) {
  event.preventDefault();

  const download = document.createElement("a");
  download.href = resumeUrl;
  download.download = resumeUrl.split("/").pop() || "felix-dev-cv.pdf";
  download.hidden = true;
  document.body.appendChild(download);
  download.click();
  download.remove();
  closeMenu();
}

type SiteHeaderProps = {
  linkToHomepage?: boolean;
};

export function SiteHeader({ linkToHomepage = false }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string>("about");
  const navigationIntentRef = useRef<string | null>(null);
  const navigationIntentTimeoutRef = useRef<number | null>(null);
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
        const navigationIntent = navigationIntentRef.current;
        if (navigationIntent) {
          const intendedEntry = entries.find((entry) => entry.target.id === navigationIntent);
          if (!intendedEntry?.isIntersecting) return;

          navigationIntentRef.current = null;
          if (navigationIntentTimeoutRef.current !== null) {
            window.clearTimeout(navigationIntentTimeoutRef.current);
            navigationIntentTimeoutRef.current = null;
          }
          setActiveAnchor(navigationIntent);
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveAnchor(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (navigationIntentTimeoutRef.current !== null) {
        window.clearTimeout(navigationIntentTimeoutRef.current);
      }
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const selectNavigation = (anchor: string) => {
    navigationIntentRef.current = anchor;
    if (navigationIntentTimeoutRef.current !== null) {
      window.clearTimeout(navigationIntentTimeoutRef.current);
    }
    navigationIntentTimeoutRef.current = window.setTimeout(() => {
      navigationIntentRef.current = null;
      navigationIntentTimeoutRef.current = null;
    }, 1600);
    setActiveAnchor(anchor);
    closeMenu();
  };
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
        <div className="site-nav__dock">
          <div
            className="site-nav__links"
            data-active-index={Math.max(0, navigationLinks.findIndex((link) => link.anchor === activeAnchor))}
          >
            {navigationLinks.map((link) => (
              <a
                aria-current={activeAnchor === link.anchor ? "page" : undefined}
                className={activeAnchor === link.anchor ? "is-active" : undefined}
                href={anchorHref(link.anchor)}
                key={link.anchor}
                onClick={() => selectNavigation(link.anchor)}
              >
                <span aria-hidden="true" className="site-nav__active-dot" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="site-nav__actions">
          <ThemeToggle />
          {siteConfig.resumeUrl ? (
            <a
              className="nav-contact"
              data-resume-state="available"
              download
              href={siteConfig.resumeUrl}
              onClick={(event) => startResumeDownload(event, siteConfig.resumeUrl, closeMenu)}
            >
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
            <a
              aria-current={activeAnchor === link.anchor ? "page" : undefined}
              href={anchorHref(link.anchor)}
              key={link.anchor}
              onClick={() => selectNavigation(link.anchor)}
            >
              {link.label}
            </a>
          ))}
          {siteConfig.resumeUrl ? (
            <a
              download
              href={siteConfig.resumeUrl}
              onClick={(event) => startResumeDownload(event, siteConfig.resumeUrl, closeMenu)}
            >
              Download CV
            </a>
          ) : (
            <span aria-disabled="true" className="mobile-nav__disabled">Résumé unavailable</span>
          )}
        </nav>
      ) : null}
    </header>
  );
}

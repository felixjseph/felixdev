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

type ContrastTone = "dark" | "light";

function contrastToneFor(color: string): ContrastTone | null {
  const channels = color.match(/[\d.]+/g)?.map(Number);
  if (!channels || channels.length < 3 || (channels[3] ?? 1) < 0.35) return null;

  const linear = channels.slice(0, 3).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  const luminance = (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);

  return luminance < 0.34 ? "light" : "dark";
}

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
  const brandRef = useRef<HTMLAnchorElement>(null);
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

  useEffect(() => {
    const mark = brandRef.current;
    const header = mark?.closest<HTMLElement>("header");
    if (!mark || !header) return;

    let frame = 0;
    const updateContrast = () => {
      frame = 0;
      const bounds = mark.getBoundingClientRect();
      const x = Math.min(window.innerWidth - 1, Math.max(0, bounds.left + (bounds.width / 2)));
      const y = Math.min(window.innerHeight - 1, Math.max(0, bounds.top + (bounds.height / 2)));
      const surfaces = typeof document.elementsFromPoint === "function"
        ? document.elementsFromPoint(x, y).filter((element) => !header.contains(element))
        : [document.documentElement];

      let tone: ContrastTone | null = null;
      for (const surface of surfaces) {
        tone = contrastToneFor(getComputedStyle(surface).backgroundColor);
        if (tone) break;
      }

      tone ??= contrastToneFor(getComputedStyle(document.documentElement).backgroundColor);
      if (tone) {
        if (mark.dataset.contrastTone !== tone) mark.dataset.contrastTone = tone;
        if (header.dataset.contrastTone !== tone) header.dataset.contrastTone = tone;
      }
    };
    const scheduleContrastUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateContrast);
    };

    scheduleContrastUpdate();
    window.addEventListener("scroll", scheduleContrastUpdate, { passive: true });
    window.addEventListener("resize", scheduleContrastUpdate, { passive: true });
    window.addEventListener("felixdev-theme-change", scheduleContrastUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleContrastUpdate);
      window.removeEventListener("resize", scheduleContrastUpdate);
      window.removeEventListener("felixdev-theme-change", scheduleContrastUpdate);
      if (frame) window.cancelAnimationFrame(frame);
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
        <a aria-label="Felix Castañeda — Home" className="site-mark" href={anchorHref("hero")} onClick={closeMenu} ref={brandRef}>
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
              <span className="nav-contact__label">Resume</span>
              <DownloadIcon />
            </a>
          ) : (
            <span
              aria-disabled="true"
              aria-label="Resume — download not yet available"
              className="nav-contact nav-contact--disabled"
              data-resume-state="unavailable"
              title="Add an approved resume PDF in site configuration to enable this download"
            >
              <span className="nav-contact__label">Resume</span>
              <DownloadIcon />
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
          {navigationLinks.map((link, index) => (
            <a
              aria-current={activeAnchor === link.anchor ? "page" : undefined}
              className="mobile-nav__link"
              href={anchorHref(link.anchor)}
              key={link.anchor}
              onClick={() => selectNavigation(link.anchor)}
            >
              <span aria-hidden="true" className="mobile-nav__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="mobile-nav__label">{link.label}</span>
              {activeAnchor === link.anchor ? <span aria-hidden="true" className="mobile-nav__state">Now</span> : null}
            </a>
          ))}
          {siteConfig.resumeUrl ? (
            <a
              className="mobile-nav__link mobile-nav__download"
              download
              href={siteConfig.resumeUrl}
              onClick={(event) => startResumeDownload(event, siteConfig.resumeUrl, closeMenu)}
            >
              <span aria-hidden="true" className="mobile-nav__index">06</span>
              <span className="mobile-nav__label">Download CV</span>
              <span aria-hidden="true" className="mobile-nav__download-icon"><DownloadIcon /></span>
            </a>
          ) : (
            <span aria-disabled="true" className="mobile-nav__disabled">
              <span aria-hidden="true" className="mobile-nav__index">06</span>
              <span className="mobile-nav__label">Résumé unavailable</span>
            </span>
          )}
        </nav>
      ) : null}
    </header>
  );
}

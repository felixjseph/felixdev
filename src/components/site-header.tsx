"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { ArrowUpRightIcon } from "./ui-icons";

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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.25 });
  const prefersReducedMotion = useReducedMotion();

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
          <span>F/J</span>
          <span>Felix<br />Castañeda</span>
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
        <div aria-hidden="true" className="site-nav__signal">
          <span />
          <small>Portfolio / 001</small>
        </div>
        <div className="site-nav__actions">
          <ThemeToggle />
          <a className="nav-contact" href={anchorHref("contact")} onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRightIcon />
          </a>
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
        </nav>
      ) : null}
      <div aria-hidden="true" className="site-progress">
        <motion.span style={{ scaleX: prefersReducedMotion ? scrollYProgress : progress }} />
      </div>
    </header>
  );
}

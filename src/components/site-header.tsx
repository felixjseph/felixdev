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
            <a href={anchorHref(link.anchor)} key={link.anchor} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
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
            {isMenuOpen ? "Close" : "Menu"}
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

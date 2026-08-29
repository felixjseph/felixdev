"use client";

import { useEffect, useId, useState } from "react";
import { ResumeAction } from "./resume-action";
import { ThemeToggle } from "./theme-toggle";

const navigationLinks = [
  { anchor: "hero", label: "Home" },
  { anchor: "work", label: "Work" },
  { anchor: "capabilities", label: "Capabilities" },
  { anchor: "about", label: "About" },
  { anchor: "contact", label: "Contact" },
] as const;

type SiteHeaderProps = {
  linkToHomepage?: boolean;
};

export function SiteHeader({ linkToHomepage = false }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const closeMenu = () => setIsMenuOpen(false);
  const anchorHref = (anchor: string) => `${linkToHomepage ? "/" : ""}#${anchor}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--color-text)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[92rem] items-center justify-between gap-4 px-4 py-4 lg:px-10"
      >
        <a className="font-semibold tracking-[-0.03em]" href={anchorHref("hero")} onClick={closeMenu}>
          Felix Castañeda<span className="text-[var(--color-accent)]">.</span>
        </a>
        <div className="hidden items-center gap-5 md:flex">
          {navigationLinks.map((link) => (
            <a href={anchorHref(link.anchor)} key={link.anchor} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ResumeAction className="hidden md:inline" label="Résumé" onClick={closeMenu} />
          <a
            className="hidden border border-[var(--color-accent)] bg-[var(--color-accent)] px-3 py-2 font-semibold text-[var(--color-accent-foreground)] md:inline"
            data-accent-surface="primary"
            href={anchorHref("contact")}
            onClick={closeMenu}
          >
            Start a project
          </a>
          <ThemeToggle />
          <button
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="border-2 border-[var(--color-text)] px-3 py-2 md:hidden"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            Menu
          </button>
        </div>
      </nav>
      {isMenuOpen ? (
        <nav
          aria-label="Mobile"
          className="grid gap-3 border-b-2 border-[var(--color-text)] bg-[var(--color-bg)] px-4 py-4 md:hidden"
          id={menuId}
        >
          {navigationLinks.map((link) => (
            <a href={anchorHref(link.anchor)} key={link.anchor} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <ResumeAction label="Résumé" onClick={closeMenu} />
          <a
            className="border-2 border-[var(--color-text)] bg-[var(--color-accent)] px-3 py-2 font-semibold text-[var(--color-accent-foreground)]"
            data-accent-surface="primary"
            href={anchorHref("contact")}
            onClick={closeMenu}
          >
            Start a project
          </a>
        </nav>
      ) : null}
    </header>
  );
}

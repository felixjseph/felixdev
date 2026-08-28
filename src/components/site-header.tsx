"use client";

import { useEffect, useId, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navigationLinks = [
  { href: "#hero", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
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

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--color-text)] bg-[var(--color-bg)]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"
      >
        <a className="font-semibold" href="#hero" onClick={closeMenu}>
          Felix Castañeda
        </a>
        <div className="hidden items-center gap-5 md:flex">
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a className="hidden md:inline" href="#resume" onClick={closeMenu}>
            Download résumé
          </a>
          <a
            className="hidden border-2 border-[var(--color-text)] bg-[var(--color-accent)] px-3 py-2 font-semibold text-white shadow-[3px_3px_0_var(--color-text)] md:inline"
            href="#contact"
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
        <div
          className="grid gap-3 border-b-2 border-[var(--color-text)] bg-[var(--color-bg)] px-4 py-4 md:hidden"
          id={menuId}
        >
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}

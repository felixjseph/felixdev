"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navItems } from "@/lib/nav";
import { EMAIL, primaryContactLinks } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

function useActiveSection(pathname: string) {
  const [activeId, setActiveId] = useState<string | null>("top");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }

    const sections = navItems
      .map((item) => item.sectionId)
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    // Squeeze the viewport down to a thin band across the middle — whichever
    // section crosses that band is the one the reader is actually looking at.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return activeId;
}

function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const setTheme = useCallback((dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Private mode / storage disabled — the class still applies for this
      // session, it just won't be remembered.
    }
    setIsDark(dark);
  }, []);

  return { isDark, setTheme };
}

export function SideRail() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const activeId = useActiveSection(pathname);
  const { isDark, setTheme } = useTheme();

  // Close when navigating so the panel doesn't linger over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function isActive(item: (typeof navItems)[number]) {
    if (pathname === "/") return item.sectionId === activeId;
    return item.route === pathname;
  }

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: EASE };

  return (
    <div
      className="fixed left-4 top-1/2 z-40 -translate-y-1/2 md:left-6"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      {/* Collapsed state: one bar per section, the active one extended.
          Reads like a diff gutter / minimap rather than generic dot-nav. */}
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => setOpen(true)}
        className="flex cursor-pointer flex-col gap-2.5 p-2"
      >
        {navItems.map((item) => (
          <motion.span
            key={item.label}
            aria-hidden
            className="block h-[2px] rounded-full"
            animate={{
              width: isActive(item) ? 26 : 12,
              opacity: open ? 0 : 1,
              backgroundColor: isActive(item)
                ? "var(--color-ink)"
                : "var(--color-muted)",
            }}
            transition={transition}
          />
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Site"
            className="absolute left-0 top-1/2 w-56 -translate-y-1/2 border border-border bg-bg p-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]"
            initial={
              shouldReduceMotion ? false : { opacity: 0, x: -8, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -8,
                    scale: 0.98,
                    transition: { duration: 0.2, ease: "easeIn" },
                  }
            }
            transition={transition}
          >
            <Link
              href="/#top"
              className="block font-display text-sm font-bold tracking-tight text-ink"
            >
              Felix Castañeda
            </Link>

            <ul className="mt-5 flex flex-col gap-0.5 border-t border-border pt-4">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "true" : undefined}
                      className={`flex items-center gap-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors duration-200 motion-reduce:transition-none ${
                        active
                          ? "text-ink"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`block h-[2px] shrink-0 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                          active ? "w-4 bg-ink" : "w-2 bg-muted"
                        }`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 border-t border-border pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                Theme
              </p>
              <div
                role="group"
                aria-label="Color theme"
                className="mt-2 flex border border-border"
              >
                <button
                  type="button"
                  onClick={() => setTheme(false)}
                  aria-pressed={!isDark}
                  className={`flex-1 py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors duration-200 motion-reduce:transition-none ${
                    !isDark ? "bg-ink text-bg" : "text-muted hover:text-ink"
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(true)}
                  aria-pressed={isDark}
                  className={`flex-1 border-l border-border py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors duration-200 motion-reduce:transition-none ${
                    isDark ? "bg-ink text-bg" : "text-muted hover:text-ink"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                Contact
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {primaryContactLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        link.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 block break-all font-mono text-[10px] text-muted transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
              >
                {EMAIL}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

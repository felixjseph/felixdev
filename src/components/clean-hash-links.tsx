"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashTarget() {
  if (typeof window === "undefined" || !window.location.hash) return;

  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior = reducedMotion ? "auto" : "smooth";
  if (target.id === "hero") {
    window.scrollTo({ top: 0, left: 0, behavior });
  } else {
    target.scrollIntoView({ behavior, block: "start" });
  }
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

/** Keeps section navigation shareable without leaving implementation hashes in the URL. */
export function CleanHashLinks() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;

      const sameDocument = url.pathname === window.location.pathname && url.search === window.location.search;
      if (!sameDocument) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = reducedMotion ? "auto" : "smooth";
      if (target.id === "hero") {
        window.scrollTo({ top: 0, left: 0, behavior });
      } else {
        target.scrollIntoView({ behavior, block: "start" });
      }
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    };

    document.addEventListener("click", handleClick);
    // Handles direct visits and cross-page links such as /#projects.
    scrollToHashTarget();
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}

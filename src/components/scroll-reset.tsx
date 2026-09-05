"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Prevents browser scroll restoration from opening a new case study halfway down. */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
    // Let intentional hash links (/#projects, /#contact) keep their anchor target.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

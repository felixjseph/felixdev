"use client";

import { useEffect, useState } from "react";

// Must outlast the `boot-out` CSS animation in globals.css (1.55s).
const UNMOUNT_AFTER_MS = 1700;

/**
 * Short terminal-style boot sequence shown on first paint, then wiped to
 * reveal the page beneath it.
 *
 * The fade-out is driven entirely by CSS (`[data-boot-screen]`), not by this
 * component's state — so a slow hydration or a JS failure can never leave a
 * visitor staring at a permanent overlay. React's only job here is to unmount
 * the dead node once the animation has finished. Reduced-motion users never
 * see it at all (`display: none` in globals.css).
 */
export function BootScreen() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setMounted(false), UNMOUNT_AFTER_MS);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      data-boot-screen
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-bg"
    >
      <div className="w-[80%] max-w-md">
        <p className="font-mono text-[13px] font-medium text-muted">
          <span className="text-add">felix@cebu</span>:~$ ./portfolio --start
        </p>

        <div className="mt-4 h-px w-full overflow-hidden bg-border">
          <div data-boot-rule className="h-full w-full bg-ink" />
        </div>

        <div className="mt-4 font-mono text-[13px] text-muted">
          <p data-boot-line="1">
            <span className="text-add">✓</span> compiled 4 projects
          </p>
          <p data-boot-line="2" className="mt-1.5">
            <span className="text-add">✓</span> ready
            <span className="animate-blink text-ink"> ▍</span>
          </p>
        </div>
      </div>
    </div>
  );
}

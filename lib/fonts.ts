import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// One superfamily across the whole site. Mono is the display face (headings,
// wordmark, hero) — the "build log" treatment is the site's identity, not a
// hero-only exception. Sans carries body copy.
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

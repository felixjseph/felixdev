import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-plex-mono",
});

const themeScript = `
const key = "felixdev-theme";
const stored = localStorage.getItem(key);
const theme = stored === "light" || stored === "dark"
  ? stored
  : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
document.documentElement.dataset.theme = theme;
document.documentElement.style.colorScheme = theme;
`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Felix Castañeda — Full-Stack & AI Automation Developer",
  description: "Software that works. Automation that keeps working.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Felix Castañeda — Full-Stack & AI Automation Developer",
    description: "Software that works. Automation that keeps working.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Felix Castañeda — Full-Stack & AI Automation Developer" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${manrope.variable} ${plexMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

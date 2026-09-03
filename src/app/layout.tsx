import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { siteUrl } from "@/lib/site-url";
import { SiteLoader } from "@/components/site-loader";
import { ScrollReveals } from "@/components/scroll-reveals";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

const nohemi = localFont({
  src: [
    { path: "./fonts/nohemi/Nohemi-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/nohemi/Nohemi-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/nohemi/Nohemi-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/nohemi/Nohemi-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/nohemi/Nohemi-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-nohemi",
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
  title: "Felix Joseph Castañeda — Full-Stack Web & AI Developer",
  description: "Full-stack applications, agentic AI, and automation built around real business problems.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/images/nested-system-mark.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Felix Joseph Castañeda — Full-Stack Web & AI Developer",
    description: "Full-stack applications, agentic AI, and automation built around real business problems.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Felix Joseph Castañeda — Full-Stack Web & AI Developer" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={nohemi.variable}>
        <SiteLoader />
        <noscript><style>{`.site-loader { display: none !important; } .site-nav, .hero-enter, .hero-light-drift span, .hero-copy h1 .hero-keyword, .hero-keyword::after, .hero-floating-signals span, .availability > span { animation: none !important; opacity: 1 !important; transform: none !important; } .hero-keyword::after { display: none; }`}</style></noscript>
        {children}
        <ScrollReveals />
        <Analytics />
      </body>
    </html>
  );
}

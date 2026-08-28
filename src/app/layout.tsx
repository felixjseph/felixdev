import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
  title: "Felix Castañeda — Full-Stack & AI Automation Developer",
  description: "Software that works. Automation that keeps working.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

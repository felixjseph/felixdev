import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Fraunces & Inter are variable fonts — omit `weight` to load the full
// axis range. Locked weight 500 is applied per-component via `font-medium`.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

import type { Metadata } from "next";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import { Header } from "@/components/ui/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felix Castañeda",
  description: "Full stack engineer, generative AI, building for MSMEs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-dot-grid min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}

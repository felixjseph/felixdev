import type { Metadata } from "next";
import { ibmPlexMono, ibmPlexSans } from "@/lib/fonts";
import { BootScreen } from "@/components/ui/boot-screen";
import { SideRail } from "@/components/ui/side-rail";
import { Footer } from "@/components/ui/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felix Castañeda",
  description: "Full stack engineer, generative AI, building for MSMEs.",
};

// Runs before first paint so a returning dark-mode visitor never sees a white
// flash. Light is the default — this only ever ADDS the class, never removes.
const THEME_INIT = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${ibmPlexSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="font-body bg-dot-grid min-h-screen flex flex-col">
        <BootScreen />
        <SideRail />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

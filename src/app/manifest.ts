import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Felix Joseph Castañeda — Full-Stack Web & AI Developer",
    short_name: "Felix Castañeda",
    description: "Full-stack applications, agentic AI, and automation built around real business problems.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F3EF",
    theme_color: "#0A0A0A",
    icons: [
      { src: "/images/nested-system-mark.png", sizes: "any", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}

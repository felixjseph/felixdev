import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Felix Joseph Castañeda — Full-Stack Web & AI Developer",
    short_name: "Felix Castañeda",
    description: "Full-stack applications, agentic AI, and automation built around real business problems.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F2",
    theme_color: "#2457FF",
  };
}

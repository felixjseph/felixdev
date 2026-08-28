import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Felix Castañeda — Full-Stack & AI Automation Developer",
    short_name: "Felix Castañeda",
    description: "Software that works. Automation that keeps working.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F2",
    theme_color: "#2457FF",
  };
}

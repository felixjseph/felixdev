import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site-url";

const paths = ["/", "/work/sayu-cafe", "/work/solara", "/work/pach-drugmart"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: new URL(path, siteOrigin).toString() }));
}

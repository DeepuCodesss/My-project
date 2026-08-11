import type { MetadataRoute } from "next";
import { SITE_PROFILE } from "@/lib/projects.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_PROFILE.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}

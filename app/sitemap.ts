import type { MetadataRoute } from "next";
import { projects, SITE_PROFILE } from "@/lib/projects.config";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_PROFILE.canonicalUrl,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/projects"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

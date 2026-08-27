import type { MetadataRoute } from "next";
import { SITE_PROFILE } from "@/lib/projects.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_PROFILE.canonicalUrl}/sitemap.xml`,
  };
}

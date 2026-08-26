import type { MetadataRoute } from "next";
import { SITE_PROFILE } from "@/lib/projects.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_PROFILE.brandName} - ${SITE_PROFILE.name}`,
    short_name: SITE_PROFILE.brandName,
    description: SITE_PROFILE.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#040203",
    theme_color: "#040203",
    lang: "en",
    icons: [
      {
        src: "/assets/brand/logo.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}

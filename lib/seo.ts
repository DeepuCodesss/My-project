import { SITE_PROFILE, type Project } from "@/lib/projects.config";

export const SITE_URL = SITE_PROFILE.canonicalUrl;
export const PERSON_ID = `${SITE_URL}#person`;
export const WEBSITE_ID = `${SITE_URL}#website`;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

const socialProfiles = [SITE_PROFILE.githubUrl, SITE_PROFILE.linkedinUrl];

export const personJsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_PROFILE.name,
  alternateName: SITE_PROFILE.alternateName,
  jobTitle: SITE_PROFILE.role,
  description: SITE_PROFILE.headline,
  url: SITE_URL,
  image: absoluteUrl("/assets/hero/character.webp"),
  sameAs: socialProfiles,
  knowsAbout: [
    "Full-stack web development",
    "Artificial intelligence automation",
    "Systems architecture",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_PROFILE.brandName,
  alternateName: "Deepucodes",
  description: SITE_PROFILE.headline,
  publisher: { "@id": PERSON_ID },
  inLanguage: "en",
};

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, websiteJsonLd],
};

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}#webpage`,
  url: SITE_URL,
  name: `${SITE_PROFILE.brandName} - ${SITE_PROFILE.name}`,
  description: SITE_PROFILE.headline,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  inLanguage: "en",
};

export function profilePageJsonLd() {
  const pageUrl = absoluteUrl("/about");

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    url: pageUrl,
    name: `About ${SITE_PROFILE.name} - ${SITE_PROFILE.brandName}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

export function projectJsonLd(project: Project) {
  const pageUrl = absoluteUrl(`/projects/${project.id}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${project.title} - ${SITE_PROFILE.brandName}`,
        description: project.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${pageUrl}#project` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(project.screenshotUrl),
          width: project.width,
          height: project.height,
        },
        inLanguage: "en",
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        name: project.title,
        description: project.description,
        url: pageUrl,
        image: absoluteUrl(project.screenshotUrl),
        author: { "@id": PERSON_ID },
        keywords: project.tags,
      },
    ],
  };
}

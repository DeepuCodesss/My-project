import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { SITE_PROFILE } from "@/lib/projects.config";
import { WebVitalsMonitor } from "@/lib/web-vitals";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const viewport: Viewport = {
  themeColor: "#040203",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_PROFILE.canonicalUrl),
  title: {
    default: `${SITE_PROFILE.name} — Full Stack Developer`,
    template: `%s | ${SITE_PROFILE.name}`,
  },
  description: SITE_PROFILE.headline,
  keywords: [
    "Deepak Kumar",
    "DEEPUCODES",
    "Full-Stack Developer",
    "AI Systems Builder",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "India Developer",
    "Portfolio",
  ],
  authors: [{ name: SITE_PROFILE.name, url: SITE_PROFILE.canonicalUrl }],
  creator: SITE_PROFILE.name,
  alternates: {
    canonical: SITE_PROFILE.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_PROFILE.canonicalUrl,
    title: `${SITE_PROFILE.name} — Full Stack Developer`,
    description: SITE_PROFILE.headline,
    siteName: `${SITE_PROFILE.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_PROFILE.name} — Full Stack Developer`,
    description: SITE_PROFILE.headline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/brand/logo.svg",
    shortcut: "/assets/brand/logo.svg",
    apple: "/assets/brand/logo.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_PROFILE.name,
  jobTitle: SITE_PROFILE.role,
  description: SITE_PROFILE.headline,
  url: SITE_PROFILE.canonicalUrl,
  sameAs: [SITE_PROFILE.githubUrl, SITE_PROFILE.linkedinUrl],
  knowsAbout: [
    "Full Stack Web Development",
    "Artificial Intelligence Automation",
    "Systems Architecture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${bebasNeue.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#040203] text-[#f4f0e8] font-space antialiased selection:bg-[#e61924]/30 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#e61924] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-2xl focus:outline-none"
        >
          Skip to main content
        </a>
        <WebVitalsMonitor />
        {children}
      </body>
    </html>
  );
}




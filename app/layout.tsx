import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { SITE_PROFILE } from "@/lib/projects.config";
import { siteJsonLd } from "@/lib/seo";
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
    default: `${SITE_PROFILE.name} (${SITE_PROFILE.alternateName[0]}) | ${SITE_PROFILE.role} | ${SITE_PROFILE.brandName}`,
    template: `%s | ${SITE_PROFILE.brandName}`,
  },
  description: SITE_PROFILE.headline,
  authors: [{ name: SITE_PROFILE.name, url: SITE_PROFILE.canonicalUrl }],
  applicationName: SITE_PROFILE.brandName,
  creator: SITE_PROFILE.name,
  category: "technology",
  alternates: {
    canonical: SITE_PROFILE.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_PROFILE.canonicalUrl,
    title: `${SITE_PROFILE.name} (${SITE_PROFILE.alternateName[0]}) | ${SITE_PROFILE.role} | ${SITE_PROFILE.brandName}`,
    description: SITE_PROFILE.headline,
    siteName: SITE_PROFILE.brandName,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_PROFILE.brandName} - ${SITE_PROFILE.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_PROFILE.name} (${SITE_PROFILE.alternateName[0]}) | ${SITE_PROFILE.role} | ${SITE_PROFILE.brandName}`,
    description: SITE_PROFILE.headline,
    images: ["/opengraph-image"],
    creator: "@Deepucodess",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${bebasNeue.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          id="site-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
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

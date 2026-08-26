import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { projects, SITE_PROFILE } from "@/lib/projects.config";
import { absoluteUrl, WEBSITE_ID } from "@/lib/seo";

const pageUrl = absoluteUrl("/projects");
const description = `Explore selected projects by ${SITE_PROFILE.name}, including full-stack products, AI systems, and mobile-first experiences.`;

export const metadata: Metadata = {
  title: `Projects by ${SITE_PROFILE.name}`,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: `Projects by ${SITE_PROFILE.name} - ${SITE_PROFILE.brandName}`,
    description,
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: `Projects by ${SITE_PROFILE.name}`,
  description,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/projects/${project.id}`),
    })),
  },
};

export default function ProjectsPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#040203] text-[#f4f0e8]">
        <Navbar />
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-10 md:px-14 lg:px-20" aria-labelledby="projects-page-title">
          <header className="max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e61924]">
              02 / SELECTED WORK
            </span>
            <h1 id="projects-page-title" className="mt-5 font-bebas text-7xl uppercase leading-[0.9] tracking-wide text-white sm:text-8xl md:text-9xl">
              Projects by <span className="text-[#e61924]">Deepu.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              A closer look at products and experiments built by {SITE_PROFILE.name} under the {" "}
              {SITE_PROFILE.brandName} identity.
            </p>
          </header>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="group overflow-hidden rounded-2xl border border-red-900/30 bg-[#0c0507]/90 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                <Link href={`/projects/${project.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e61924]">
                  <div className="relative aspect-[21/10] overflow-hidden bg-[#050203]">
                    <Image
                      src={project.screenshotUrl}
                      alt={`${project.title} project screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e61924]">
                      {project.eyebrowLabel}
                    </span>
                    <h2 className="mt-3 font-bebas text-5xl uppercase tracking-wide text-white transition-colors group-hover:text-[#e61924]">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md border border-red-900/40 bg-red-950/20 px-2.5 py-1 font-mono text-[10px] text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-wider text-white/80">
                      Read project details -&gt;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <nav aria-label="Projects page links" className="mt-20 flex flex-wrap gap-3 border-t border-red-950/60 pt-8">
            <Link href="/" className="rounded-lg bg-[#e61924] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#ff2430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">
              Back to home
            </Link>
            <Link href="/about" className="rounded-lg border border-red-900/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">
              About Deepak Kumar
            </Link>
          </nav>
        </section>
      </main>
      <script
        id="projects-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
    </>
  );
}

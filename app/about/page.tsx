import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { projects, SITE_PROFILE } from "@/lib/projects.config";
import { absoluteUrl, profilePageJsonLd, WEBSITE_ID } from "@/lib/seo";

export const metadata: Metadata = {
  title: `About ${SITE_PROFILE.name}`,
  description:
    "Learn about Deepak Kumar, also known as Deepu, the developer and programmer behind Deepu Codes.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    type: "profile",
    url: absoluteUrl("/about"),
    title: `About ${SITE_PROFILE.name} - ${SITE_PROFILE.brandName}`,
    description:
      "Learn about Deepak Kumar, also known as Deepu, the developer and programmer behind Deepu Codes.",
  },
};

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#040203] text-[#f4f0e8]">
        <Navbar />
        <article className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-10 md:px-14 lg:px-20">
          <header className="max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e61924]">
              01 / PROFILE
            </span>
            <h1 className="mt-5 font-bebas text-7xl uppercase leading-[0.9] tracking-wide text-white sm:text-8xl md:text-9xl">
              About <span className="text-[#e61924]">Deepak Kumar.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              Deepak Kumar, also known online as Deepu, is the developer behind {" "}
              <strong className="font-medium text-white">{SITE_PROFILE.brandName}</strong>.
              He builds full-stack web products, AI systems, and expressive digital
              experiences from India.
            </p>
          </header>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            <section
              aria-labelledby="deepu-codes-title"
              className="rounded-2xl border border-red-900/30 bg-[#0c0507]/90 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:p-9"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e61924]">
                The identity
              </span>
              <h2 id="deepu-codes-title" className="mt-3 font-bebas text-5xl uppercase tracking-wide text-white">
                Deepu Codes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                Deepu Codes is Deepak&apos;s personal brand and home for the things
                he is building, learning, and sharing. The name Deepu is the
                shorter identity used alongside his real name.
              </p>
            </section>

            <section
              aria-labelledby="interests-title"
              className="rounded-2xl border border-red-900/30 bg-[#0c0507]/90 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:p-9"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e61924]">
                Areas of interest
              </span>
              <h2 id="interests-title" className="mt-3 font-bebas text-5xl uppercase tracking-wide text-white">
                Build, explore, share
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/65 sm:text-base">
                <li>Full-stack web development and product engineering.</li>
                <li>AI integrations, automation, and backend systems.</li>
                <li>Operating-system experiments and open-source ideas.</li>
              </ul>
            </section>
          </div>

          <section aria-labelledby="about-projects-title" className="mt-20">
            <div className="flex flex-wrap items-end justify-between gap-5 border-b border-red-950/60 pb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e61924]">
                  Selected work
                </span>
                <h2 id="about-projects-title" className="mt-2 font-bebas text-6xl uppercase tracking-wide text-white">
                  Things I&apos;ve shipped
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex min-h-[44px] items-center rounded-lg border border-red-900/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]"
              >
                View all projects -&gt;
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="rounded-xl border border-red-900/25 bg-[#0c0507]/75 p-5 transition-colors hover:border-[#e61924]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e61924]">
                    {project.eyebrowLabel}
                  </span>
                  <h3 className="mt-2 font-bebas text-3xl uppercase tracking-wide text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <nav aria-label="About page links" className="mt-20 flex flex-wrap gap-3 border-t border-red-950/60 pt-8">
            <Link href="/" className="rounded-lg bg-[#e61924] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#ff2430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">
              Back to home
            </Link>
            <a href={`mailto:${SITE_PROFILE.email}`} className="rounded-lg border border-red-900/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">
              Contact Deepak
            </a>
            <a href={SITE_PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-red-900/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">
              GitHub profile
            </a>
            <a href={SITE_PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-red-900/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">
              LinkedIn profile
            </a>
          </nav>
        </article>
      </main>
      <script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd()) }}
      />
    </>
  );
}

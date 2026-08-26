import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { projects, SITE_PROFILE } from "@/lib/projects.config";
import { absoluteUrl, projectJsonLd } from "@/lib/seo";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((item) => item.id === params.slug);
  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const pageUrl = absoluteUrl(`/projects/${project.id}`);
  return {
    title: `${project.title} project`,
    description: project.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: `${project.title} - ${SITE_PROFILE.brandName}`,
      description: project.description,
      images: [
        {
          url: project.screenshotUrl,
          width: project.width,
          height: project.height,
          alt: `${project.title} project screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - ${SITE_PROFILE.brandName}`,
      description: project.description,
      images: [project.screenshotUrl],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.id === params.slug);
  if (!project) notFound();

  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#040203] text-[#f4f0e8]">
        <Navbar />
        <article className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-10 md:px-14 lg:px-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            <Link href="/projects" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">Projects</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#e61924]">{project.title}</span>
          </nav>

          <header className="mt-8 max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e61924]">
              {project.eyebrowLabel}
            </span>
            <h1 className="mt-5 font-bebas text-7xl uppercase leading-[0.9] tracking-wide text-white sm:text-8xl md:text-9xl">
              {project.title}
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              {project.description}
            </p>
          </header>

          <div className={`relative mt-14 overflow-hidden rounded-2xl border border-red-900/40 bg-[#0a0406] p-3 shadow-[0_34px_120px_rgba(0,0,0,0.8)] sm:p-4 ${project.mockupVariant === "phone" ? "mx-auto max-w-[440px]" : "w-full"}`}>
            <div className={`relative overflow-hidden rounded-xl bg-[#050203] ${project.mockupVariant === "phone" ? "aspect-[528/907]" : "aspect-[21/10]"}`}>
              <Image
                src={project.screenshotUrl}
                alt={`${project.title} project screenshot`}
                fill
                priority
                sizes={project.mockupVariant === "phone" ? "(max-width: 640px) 100vw, 440px" : "(max-width: 1024px) 100vw, 1200px"}
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.3fr]">
            <section className="rounded-2xl border border-red-900/30 bg-[#0c0507]/90 p-7 sm:p-9" aria-labelledby="project-tech-title">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e61924]">Built with</span>
              <h2 id="project-tech-title" className="mt-3 font-bebas text-5xl uppercase tracking-wide text-white">Technologies</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-md border border-red-900/40 bg-red-950/20 px-3 py-2 font-mono text-xs text-white/75">{tag}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-red-900/30 bg-[#0c0507]/90 p-7 sm:p-9" aria-labelledby="project-links-title">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e61924]">Explore further</span>
              <h2 id="project-links-title" className="mt-3 font-bebas text-5xl uppercase tracking-wide text-white">Project links</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#e61924] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#ff2430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">Visit live project</a>
                {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-red-900/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">View repository</a> : null}
              </div>
            </section>
          </div>

          <nav aria-label="Project page links" className="mt-20 flex flex-wrap gap-3 border-t border-red-950/60 pt-8">
            <Link href="/projects" className="rounded-lg bg-[#e61924] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#ff2430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">All projects</Link>
            <Link href="/about" className="rounded-lg border border-red-900/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">About Deepak Kumar</Link>
            <Link href="/#contact" className="rounded-lg border border-red-900/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/75 transition-colors hover:border-[#e61924] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">Start a conversation</Link>
          </nav>
        </article>
      </main>
      <script
        id={`${project.id}-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
    </>
  );
}

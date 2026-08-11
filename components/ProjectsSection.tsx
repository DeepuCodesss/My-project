"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "@/lib/projects.config";
import ProjectRow from "@/components/ProjectRow";

gsap.registerPlugin(ScrollTrigger);

const projectNumbers = ["01", "02", "03"];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll("[data-project-row]");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.3,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-red-950/40 bg-[#040203] px-6 py-24 sm:px-10 md:px-14 lg:px-20"
      aria-label="Selected Projects"
    >
      {/* ── Reusable Atmosphere Texture Background ──────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <img
          src="/assets/atmosphere/section-texture.png"
          alt=""
          role="presentation"
          decoding="async"
          className="h-full w-full object-cover object-center filter contrast-125 brightness-75"
        />
      </div>

      {/* Background ambient red lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-[#e61924]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#e61924]/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#e61924]">
              02 /
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
              FEATURED SHOWCASE
            </span>
          </div>
          <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal uppercase tracking-wide text-white leading-none">
            SELECTED <span className="text-[#e61924]">WORK</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-[#e61924]" />
        </div>

        {/* Project Cards Stack with Editorial Background Numbers */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, index) => (
            <div key={project.id} className="relative" data-project-row>
              {/* Giant low-opacity background number watermark */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-12 -left-6 lg:-left-12 pointer-events-none select-none z-0"
              >
                <span className="font-bebas text-[clamp(8rem,22vw,28rem)] leading-none text-[#e61924]/[0.035] tracking-tight block">
                  {projectNumbers[index] || `0${index + 1}`}
                </span>
              </div>

              <div className="relative z-10">
                <ProjectRow project={project} index={index} imageOnLeft />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




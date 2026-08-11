"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "@/lib/projects.config";
import ProjectRow from "@/components/ProjectRow";

gsap.registerPlugin(ScrollTrigger);

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
      className="relative overflow-hidden border-t border-white/10 bg-transparent px-6 py-20 sm:px-10 md:px-14 lg:px-20"
      aria-label="Selected Projects"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-white/45">
            Projects
          </p>
          <h2 className="mt-5 text-5xl font-light tracking-[-0.06em] text-white sm:text-6xl md:text-7xl">
            Selected Work
          </h2>
        </div>

        <div className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <div key={project.id} data-project-row>
              <ProjectRow project={project} index={index} imageOnLeft />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


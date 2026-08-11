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
      className="relative isolate border-t border-red-950/40 bg-[#040203] px-6 py-24 sm:px-10 md:px-14 lg:px-20 text-[#f4f0e8]"
      aria-label="Selected Projects"
    >
      {/* ── Layer 1: Reusable Section Texture Overlay (Optimized WebP) ───── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20 mix-blend-screen">
        <img
          src="/assets/atmosphere/section-texture.webp"
          alt=""
          role="presentation"
          decoding="async"
          className="h-full w-full object-cover object-center filter contrast-125 brightness-110"
        />
      </div>

      {/* ── Layer 2: Reusable Glow Overlay Atmosphere (Optimized WebP) ────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.22] mix-blend-screen">
        <img
          src="/assets/atmosphere/glow-overlay.webp"
          alt=""
          role="presentation"
          decoding="async"
          className="h-full w-full object-cover object-center filter contrast-125 brightness-110"
        />
      </div>

      {/* ── Layer 3: Shifting Per-Project Radial Crimson Lighting Gradients ── */}
      {/* Nexorithm Ambient Lighting (Top-Left) */}
      <div className="absolute top-[12%] left-[-5%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(230,25,36,0.22)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />
      {/* AURIX Ambient Lighting (Center-Right) */}
      <div className="absolute top-[48%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(230,25,36,0.20)_0%,transparent_70%)] blur-[110px] pointer-events-none z-0" />
      {/* Legit Club Ambient Lighting (Bottom-Left) */}
      <div className="absolute bottom-[10%] left-[5%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(230,25,36,0.22)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      {/* Top Section Fade (Blends Hero into Selected Work) */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#040203] to-transparent pointer-events-none z-0" />

      {/* Bottom Section Fade (Blends Selected Work into Current Focus) */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040203] to-transparent pointer-events-none z-0" />

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
            SELECTED <span className="text-[#e61924] drop-shadow-[0_0_35px_rgba(230,25,36,0.5)]">WORK</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-[#e61924]" />
        </div>

        {/* Project Cards Stack with Editorial Background Numbers */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, index) => (
            <div key={project.id} className="relative" data-project-row>
              {/* Layer 4: Giant low-opacity background number watermark */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-14 -left-6 lg:-left-14 pointer-events-none select-none z-0"
              >
                <span className="font-bebas text-[clamp(9rem,24vw,30rem)] leading-none text-[#e61924]/[0.045] tracking-tight block">
                  {projectNumbers[index] || `0${index + 1}`}
                </span>
              </div>

              {/* Layer 5: Project Content */}
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





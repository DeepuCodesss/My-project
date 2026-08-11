"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SITE_PROFILE } from "@/lib/projects.config";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          hero,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }
        );
      }, heroRef);

      return () => ctx.revert();
    }
  }, []);

  // Subtle mouse parallax effect on desktop fine pointer devices
  useEffect(() => {
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;

      rafId = requestAnimationFrame(() => {
        setMouseOffset({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#040203] text-[#f4f0e8] select-none flex flex-col justify-between"
      aria-label="Hero section"
    >
      {/* ── Background Red Textured Texture & Lighting ───── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Red textured background image asset */}
        <img
          src="/assets/hero/background.png"
          alt=""
          role="presentation"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-85 filter contrast-125 brightness-90"
        />
        {/* Dark vignette & ambient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040203]/75 via-[#040203]/40 to-[#040203]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,2,3,0.85)_85%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(230,25,36,0.30),transparent_65%)]" />
      </div>

      {/* ── Background Giant Display Typography: DEEPUCODES ── */}
      <div
        aria-hidden="true"
        className="absolute top-[18%] left-1/2 -translate-x-1/2 z-[1] pointer-events-none select-none w-full text-center"
      >
        <span className="font-bebas text-[clamp(4.5rem,18.5vw,22rem)] leading-none text-[#e61924]/[0.16] tracking-wider uppercase block drop-shadow-[0_0_60px_rgba(230,25,36,0.2)]">
          DEEPUCODES
        </span>
      </div>

      {/* ── Center Character Cutout Asset ───────────────── */}
      <div
        ref={characterRef}
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          transition: "transform 0.15s ease-out",
        }}
        className="absolute inset-0 z-[2] flex items-end justify-center pointer-events-none"
      >
        {/* Soft radial glow behind character cutout */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#e61924]/25 blur-[90px] pointer-events-none" />

        <img
          src="/assets/hero/character.png"
          alt="Deepak Kumar - Full Stack Developer"
          fetchPriority="high"
          decoding="async"
          className="h-[75vh] max-h-[780px] sm:h-[82vh] w-auto object-contain object-bottom filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Foreground gradient bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 z-[3] pointer-events-none bg-gradient-to-t from-[#040203] via-[#040203]/70 to-transparent" />

      {/* ── Vertical Micro Details (Desktop Sidebar Accent) ─ */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex-col items-center gap-6 text-[10px] font-space tracking-[0.35em] text-white/40 uppercase rotate-180 [writing-mode:vertical-lr]">
        <span>FULL STACK DEVELOPER</span>
        <span className="h-12 w-px bg-[#e61924]/40" />
        <span>BASED IN INDIA</span>
      </div>

      {/* ── Vertical Social Rail (Desktop Only) ──────────────── */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-auto flex-col items-center gap-4 text-white/60">
        <a
          href={SITE_PROFILE.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 border border-red-900/30 backdrop-blur-md transition-all duration-200 hover:border-[#e61924] hover:bg-red-950/40 hover:-translate-x-0.5 hover:shadow-[0_0_15px_rgba(230,25,36,0.4)]"
          aria-label="Open Deepak Kumar on LinkedIn"
          title="LinkedIn Profile"
        >
          <img
            src="/assets/icons/social/linkedin.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity filter invert"
          />
        </a>
        <a
          href={SITE_PROFILE.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 border border-red-900/30 backdrop-blur-md transition-all duration-200 hover:border-[#e61924] hover:bg-red-950/40 hover:-translate-x-0.5 hover:shadow-[0_0_15px_rgba(230,25,36,0.4)]"
          aria-label="Open Deepak Kumar on GitHub"
          title="GitHub Profile"
        >
          <img
            src="/assets/icons/social/github.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity filter invert"
          />
        </a>
        <a
          href={`mailto:${SITE_PROFILE.email}`}
          className="group flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 border border-red-900/30 backdrop-blur-md transition-all duration-200 hover:border-[#e61924] hover:bg-red-950/40 hover:-translate-x-0.5 hover:shadow-[0_0_15px_rgba(230,25,36,0.4)]"
          aria-label="Send Email to Deepak Kumar"
          title="Email Deepak Kumar"
        >
          <img
            src="/assets/icons/social/gmail.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </a>
        <span className="h-10 w-px bg-red-900/40 mt-1" />
      </div>

      {/* ── Main Hero Content Stack ─────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-14 lg:px-16 pt-28 sm:pt-32 md:pt-36 pb-8 flex-1 flex flex-col justify-between pointer-events-none">
        
        {/* Top Info & Stacked Heading */}
        <div className="max-w-2xl pointer-events-auto">
          {/* Label / Sub-header */}
          <div className="inline-flex items-center gap-2.5 mb-3 px-3 py-1 rounded-full bg-black/50 border border-red-900/40 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#e61924] shadow-[0_0_8px_#e61924] animate-pulse" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-[#e61924]">
              FULL STACK DEVELOPER
            </span>
          </div>

          {/* Stacked Giant Brutal Headline */}
          <h1 className="font-bebas text-[clamp(4.2rem,11.5vw,10.5rem)] leading-[0.85] tracking-wide text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            BUILDING <br />
            <span className="text-white">REAL</span> <br />
            <span className="text-[#e61924] drop-shadow-[0_0_35px_rgba(230,25,36,0.6)]">SOFTWARE</span>
          </h1>

          {/* One-Line Intro */}
          <p className="mt-5 text-base sm:text-lg text-white/80 font-space font-normal max-w-md leading-relaxed">
            I build the things you imagine.
          </p>

          {/* CTA Action Buttons & Mobile Social Icons Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={handleExploreClick}
              className="inline-flex items-center gap-2 bg-[#e61924] hover:bg-[#ff2430] text-white px-7 py-3.5 rounded-lg font-space font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(230,25,36,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              View Work <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 border border-red-900/50 hover:border-red-500/80 bg-red-950/20 hover:bg-red-900/30 text-white/90 hover:text-white px-7 py-3.5 rounded-lg font-space font-medium text-sm tracking-wider uppercase backdrop-blur-sm transition-all duration-300"
            >
              Contact Me
            </a>

            {/* Mobile Horizontal Social Bar */}
            <div className="flex lg:hidden items-center gap-3 ml-2">
              <a
                href={SITE_PROFILE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 border border-red-900/40 backdrop-blur-md text-white/70 active:scale-95"
                aria-label="Open Deepak Kumar on LinkedIn"
              >
                <img src="/assets/icons/social/linkedin.svg" alt="" className="h-5 w-5 filter invert" />
              </a>
              <a
                href={SITE_PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 border border-red-900/40 backdrop-blur-md text-white/70 active:scale-95"
                aria-label="Open Deepak Kumar on GitHub"
              >
                <img src="/assets/icons/social/github.svg" alt="" className="h-5 w-5 filter invert" />
              </a>
              <a
                href={`mailto:${SITE_PROFILE.email}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 border border-red-900/40 backdrop-blur-md text-white/70 active:scale-95"
                aria-label="Send Email to Deepak Kumar"
              >
                <img src="/assets/icons/social/gmail.svg" alt="" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Area: Status Card & Scroll Cue */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-3 bg-[#0c0507]/90 border border-red-900/40 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-white/70 font-space shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="uppercase tracking-wider font-medium text-white/90">
              AVAILABLE FOR FREELANCE
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#e61924] font-mono text-[10px] font-semibold">
              JUN 2025
            </span>
          </div>

          {/* Scroll Cue */}
          <a
            href="#projects"
            onClick={handleExploreClick}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-white/50 hover:text-[#e61924] transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-y-1">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}






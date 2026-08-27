"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { SITE_PROFILE } from "@/lib/projects.config";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      const ctx = gsap.context(() => {
        // Only animate the text content — never scale the character or background
        const contentStack = hero.querySelector(".hero-content-stack");
        if (contentStack) {
          gsap.fromTo(
            contentStack,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
          );
        }
      }, heroRef);

      return () => ctx.revert();
    }
  }, []);

  // High-performance direct DOM transform mouse parallax — 0 React state re-renders
  useEffect(() => {
    const character = characterRef.current;
    if (!character) return;

    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    let rafId: number = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 12;
      targetY = (e.clientY / window.innerHeight - 0.5) * 12;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          character.style.transform = `translate3d(${targetX.toFixed(2)}px, ${targetY.toFixed(2)}px, 0)`;
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
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
      className="relative w-full bg-[#040203] text-[#f4f0e8] select-none flex flex-col justify-between min-h-[100svh] lg:min-h-[max(100svh,820px)]"
      aria-labelledby="hero-title"
    >
      {/* ── Background Decorative Layer System (Overflow Clipped) ──── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Red textured background image asset (Optimized WebP) */}
        <Image
          src="/assets/hero/background.webp"
          alt=""
          role="presentation"
          fill
          priority
          sizes="100vw"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-85 filter contrast-125 brightness-90"
        />
        {/* Dark vignette & ambient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040203]/75 via-[#040203]/40 to-[#040203]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,2,3,0.85)_85%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(230,25,36,0.30),transparent_65%)]" />
      </div>

      {/* ── Background Giant Display Typography: DEEPU CODES ── */}
      <div
        aria-hidden="true"
        className="absolute top-[16%] sm:top-[18%] left-1/2 -translate-x-1/2 z-[1] pointer-events-none select-none w-full text-center overflow-hidden"
      >
        <span className="font-bebas text-[clamp(4rem,18vw,22rem)] leading-none text-[#e61924]/[0.16] tracking-wider uppercase block drop-shadow-[0_0_60px_rgba(230,25,36,0.2)]">
          DEEPU CODES
        </span>
      </div>

      {/* ── Center Character Cutout Asset (Optimized WebP) ───────────────── */}
      <div
        ref={characterRef}
        style={{ transition: "transform 0.15s ease-out" }}
        className="absolute inset-0 z-[2] flex items-end justify-center pointer-events-none overflow-hidden"
      >
        {/* Soft radial glow behind character cutout */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#e61924]/25 blur-[90px] pointer-events-none" />

        <Image
          src="/assets/hero/character.webp"
          alt="Portrait illustration of Deepak Kumar, the developer behind Deepu Codes"
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 1024px) 70vw, 710px"
          decoding="async"
          className="w-[clamp(280px,36vw,440px)] lg:w-[clamp(390px,43vw,710px)] lg:translate-x-[2.5vw] h-auto object-contain object-bottom filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Foreground gradient bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 z-[3] pointer-events-none bg-gradient-to-t from-[#040203] via-[#040203]/70 to-transparent" />

      {/* ── Vertical Micro Details (Desktop Sidebar Accent) ─ */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex-col items-center gap-6 text-[10px] font-space tracking-[0.35em] text-white/40 uppercase rotate-180 [writing-mode:vertical-lr]">
        <span>FULL-STACK PRODUCT ENGINEER</span>
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
          <Image
            src="/assets/icons/social/linkedin.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
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
          <Image
            src="/assets/icons/social/github.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity filter invert"
          />
        </a>
        <a
          href={`mailto:${SITE_PROFILE.email}`}
          className="group flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 border border-red-900/30 backdrop-blur-md transition-all duration-200 hover:border-[#e61924] hover:bg-red-950/40 hover:-translate-x-0.5 hover:shadow-[0_0_15px_rgba(230,25,36,0.4)]"
          aria-label="Send Email to Deepak Kumar"
          title="Email Deepak Kumar"
        >
          <Image
            src="/assets/icons/social/gmail.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </a>
        <span className="h-10 w-px bg-red-900/40 mt-1" />
      </div>

      {/* ── Main Hero Content Stack (Width-Driven Only) ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-14 lg:px-16 pt-28 sm:pt-32 md:pt-36 pb-6 flex-1 flex flex-col justify-between pointer-events-none hero-content-stack">
        
        {/* Top Info & Stacked Heading */}
        <div className="max-w-2xl pointer-events-auto">
          {/* Label / Sub-header */}
          <div className="inline-flex items-center gap-2.5 mb-2 sm:mb-3 px-3 py-1 rounded-full bg-black/50 border border-red-900/40 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#e61924] shadow-[0_0_8px_#e61924] animate-pulse" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-[#e61924]">
              {SITE_PROFILE.brandName} / {SITE_PROFILE.name}
            </span>
          </div>

          {/* Stacked Giant Brutal Headline (Width-Driven Only) */}
          <h1 id="hero-title" className="font-bebas text-[clamp(3.8rem,10.5vw,10rem)] leading-[0.85] tracking-wide text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            BUILDING <br />
            <span className="text-white">REAL</span> <br />
            <span className="text-[#e61924] drop-shadow-[0_0_35px_rgba(230,25,36,0.6)]">SOFTWARE</span>
          </h1>

          {/* One-Line Intro */}
          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-white/80 font-space font-normal max-w-md leading-relaxed hero-intro">
            I&apos;m Deepak Kumar (Deepu), a full-stack product engineer behind {SITE_PROFILE.brandName}. I am the founder and owner of a web development agency serving international clients, where I build web applications, AI systems, and digital products. Outside engineering, I play chess seriously.
          </p>

          {/* CTA Action Buttons & Mobile Social Icons Row */}
          <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 hero-cta">
            <a
              href="#projects"
              onClick={handleExploreClick}
              className="inline-flex items-center gap-2 bg-[#e61924] hover:bg-[#ff2430] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-space font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(230,25,36,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              View Work <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 border border-red-900/50 hover:border-red-500/80 bg-red-950/20 hover:bg-red-900/30 text-white/90 hover:text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-space font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-sm transition-all duration-300"
            >
              Contact Me
            </a>

            {/* Mobile Horizontal Social Bar */}
            <div className="flex lg:hidden items-center gap-2.5 ml-1">
              <a
                href={SITE_PROFILE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-black/60 border border-red-900/40 backdrop-blur-md text-white/70 active:scale-95"
                aria-label="Open Deepak Kumar on LinkedIn"
              >
                <Image src="/assets/icons/social/linkedin.svg" alt="" aria-hidden="true" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5 filter invert" />
              </a>
              <a
                href={SITE_PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-black/60 border border-red-900/40 backdrop-blur-md text-white/70 active:scale-95"
                aria-label="Open Deepak Kumar on GitHub"
              >
                <Image src="/assets/icons/social/github.svg" alt="" aria-hidden="true" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5 filter invert" />
              </a>
              <a
                href={`mailto:${SITE_PROFILE.email}`}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-black/60 border border-red-900/40 backdrop-blur-md text-white/70 active:scale-95"
                aria-label="Send Email to Deepak Kumar"
              >
                <Image src="/assets/icons/social/gmail.svg" alt="" aria-hidden="true" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Area: Status Card & Scroll Cue */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pointer-events-auto hero-bottom">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#0c0507]/90 border border-red-900/40 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs text-white/70 font-space shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
            </span>
            <span className="uppercase tracking-wider font-medium text-white/90">
              AVAILABLE FOR FREELANCE
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#e61924] font-mono text-[10px] font-semibold">
              CURRENTLY AVAILABLE
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


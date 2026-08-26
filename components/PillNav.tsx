"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import "./PillNav.css";

export type PillNavItem = { label: string; href: string; ariaLabel?: string };

type PillNavProps = {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onItemClick?: (item: PillNavItem, event: React.MouseEvent<HTMLAnchorElement>) => void;
  initialLoadAnimation?: boolean;
};

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "rgba(12, 12, 13, .84)",
  pillColor = "rgba(255, 255, 255, .08)",
  hoveredPillTextColor = "#111",
  pillTextColor = "#f4f0e8",
  onItemClick,
  initialLoadAnimation = true,
}: PillNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const activeTweens = useRef<gsap.core.Tween[]>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const { width, height } = pill.getBoundingClientRect();
        const radius = ((width * width) / 4 + height * height) / (2 * height);
        const diameter = Math.ceil(2 * radius) + 2;
        const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) + 1;
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${diameter - delta}px` });
        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hoverLabel = pill.querySelector<HTMLElement>(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: height + 12, opacity: 0 });
        timelines.current[index]?.kill();
        const timeline = gsap.timeline({ paused: true });
        timeline.to(circle, { scale: 1.2, duration: 2, ease }, 0);
        if (label) timeline.to(label, { y: -(height + 8), duration: 2, ease }, 0);
        if (hoverLabel) timeline.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease }, 0);
        timelines.current[index] = timeline;
      });
    };
    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => undefined);
    if (initialLoadAnimation) {
      if (logoRef.current) gsap.fromTo(logoRef.current, { scale: 0 }, { scale: 1, duration: 0.6, ease });
      if (navItemsRef.current) gsap.fromTo(navItemsRef.current, { width: 0, overflow: "hidden" }, { width: "auto", duration: 0.6, ease });
    }
    return () => window.removeEventListener("resize", layout);
  }, [ease, initialLoadAnimation, items]);

  const toggleMobileMenu = () => {
    const nextOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextOpen);
    const lines = hamburgerRef.current?.querySelectorAll(".hamburger-line");
    if (lines) {
      gsap.to(lines[0], { rotation: nextOpen ? 45 : 0, y: nextOpen ? 3 : 0, duration: 0.3, ease });
      gsap.to(lines[1], { rotation: nextOpen ? -45 : 0, y: nextOpen ? -3 : 0, duration: 0.3, ease });
    }
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        autoAlpha: nextOpen ? 1 : 0,
        y: nextOpen ? 0 : 10,
        duration: 0.25,
        ease,
        onStart: () => { if (nextOpen && mobileMenuRef.current) mobileMenuRef.current.style.visibility = "visible"; },
        onComplete: () => { if (!nextOpen && mobileMenuRef.current) mobileMenuRef.current.style.visibility = "hidden"; },
      });
    }
  };

  const cssVars = { "--base": baseColor, "--pill-bg": pillColor, "--hover-text": hoveredPillTextColor, "--pill-text": pillTextColor } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        <a ref={logoRef} className="pill-logo" href="#top" aria-label="Home" onMouseEnter={() => logoImgRef.current && gsap.to(logoImgRef.current, { rotate: 360, duration: 0.3, ease })}>
          <Image ref={logoImgRef} src={logo} alt={logoAlt} width={32} height={32} sizes="32px" unoptimized />
        </a>
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, index) => (
              <li key={item.href} role="none">
                <a role="menuitem" href={item.href} className={`pill${activeHref === item.href ? " is-active" : ""}`} aria-label={item.ariaLabel || item.label} onMouseEnter={() => { activeTweens.current[index]?.kill(); activeTweens.current[index] = timelines.current[index]?.tweenTo(timelines.current[index].duration(), { duration: 0.3, ease }); }} onMouseLeave={() => { activeTweens.current[index]?.kill(); activeTweens.current[index] = timelines.current[index]?.tweenTo(0, { duration: 0.2, ease }); }} onClick={(event) => onItemClick?.(item, event)}>
                  <span className="hover-circle" aria-hidden="true" ref={(element) => { circleRefs.current[index] = element; }} />
                  <span className="label-stack"><span className="pill-label">{item.label}</span><span className="pill-label-hover" aria-hidden="true">{item.label}</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button ref={hamburgerRef} className="mobile-menu-button mobile-only" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
          <span className="hamburger-line" /><span className="hamburger-line" />
        </button>
      </nav>
      <div ref={mobileMenuRef} className="mobile-menu-popover mobile-only" style={{ ...cssVars, visibility: "hidden" }}>
        <ul className="mobile-menu-list">
          {items.map((item) => <li key={item.href}><a href={item.href} className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`} onClick={(event) => { onItemClick?.(item, event); setIsMobileMenuOpen(false); }}>{item.label}</a></li>)}
        </ul>
      </div>
    </div>
  );
}

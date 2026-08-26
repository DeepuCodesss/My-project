"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_PROFILE } from "@/lib/projects.config";
import BrandLogo from "@/components/BrandLogo";
import "./Navbar.css";

type NavTarget = "about" | "projects" | "contact";

const links: Array<{ label: string; target: NavTarget; href: string; number: string }> = [
  { label: "About", target: "about", href: "/about", number: "01" },
  { label: "Projects", target: "projects", href: "/#projects", number: "02" },
  { label: "Contact", target: "contact", href: "/#contact", number: "03" },
];

function navigateTo(target: NavTarget) {
  document
    .getElementById(target)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (window.location.hash !== `#${target}`) {
    window.history.replaceState(null, "", `#${target}`);
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", menuOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("nav-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleAction = (target: NavTarget) => {
    navigateTo(target);
    setMenuOpen(false);
  };

  const handleResumeClick = () => {
    const download = document.createElement("a");
    download.href = SITE_PROFILE.resumeUrl;
    download.download = SITE_PROFILE.resumeDownloadName;
    document.body.appendChild(download);
    download.click();
    download.remove();
    setMenuOpen(false);
  };

  return (
    <div className="portfolio-nav-shell">
      <header className="portfolio-nav" role="banner">
        <a
          className="portfolio-brand group"
          href="/"
          aria-label="Deepu Codes - Deepak Kumar - Go to top of page"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
            }
          }}
        >
          <BrandLogo size={30} className="brand-logo-img" />
          <span className="brand-copy">
            <strong className="font-bebas text-lg tracking-wider text-white group-hover:text-[#e61924] transition-colors">
              {SITE_PROFILE.brandName}
            </strong>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main sections">
          {links.map((link) => (
            <a
              key={link.target}
              href={link.href}
              className="nav-link-item"
              onClick={(event) => {
                if (link.target === "about" || window.location.pathname !== "/") {
                  setMenuOpen(false);
                  return;
                }
                event.preventDefault();
                handleAction(link.target);
              }}
            >
              <span className="nav-link-num">{link.number}</span>
              <span className="nav-link-text">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            onClick={handleResumeClick}
            className="nav-action-resume"
          >
            Resume <span aria-hidden="true">↗</span>
          </button>

          <button
            ref={toggleBtnRef}
            className={`nav-menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav-panel"
        ref={mobilePanelRef}
        className={`nav-mobile-panel ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile Navigation"
      >
        <div className="nav-mobile-intro">
          <span>NAVIGATION</span>
          <span className="text-[#e61924]">{SITE_PROFILE.brandName.toUpperCase()}</span>
        </div>
        {links.map((link) => (
          <a
            key={link.target}
            href={link.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={(event) => {
              if (link.target === "about" || window.location.pathname !== "/") {
                setMenuOpen(false);
                return;
              }
              event.preventDefault();
              handleAction(link.target);
            }}
          >
            <span>{link.number}</span>
            {link.label}
            <b aria-hidden="true">↗</b>
          </a>
        ))}
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          onClick={handleResumeClick}
          className="mobile-resume-btn"
        >
          <span>04</span>
          Resume PDF
          <b aria-hidden="true">↗</b>
        </button>
      </div>
    </div>
  );
}

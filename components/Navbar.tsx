"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_PROFILE } from "@/lib/projects.config";
import "./Navbar.css";

type NavTarget = "about" | "projects" | "resume" | "contact";

const links: Array<{ label: string; target: NavTarget }> = [
  { label: "About", target: "about" },
  { label: "Projects", target: "projects" },
];

const actions: Array<{ label: string; target: NavTarget }> = [
  { label: "Resume", target: "resume" },
  { label: "Contact me", target: "contact" },
];

function navigateTo(target: NavTarget) {
  if (target === "about") {
    window.dispatchEvent(
      new CustomEvent("hero:navigate-to-frame", { detail: { frame: 69 } })
    );
    if (window.location.hash !== "#about") {
      window.history.replaceState(null, "", "#about");
    }
    return;
  }
  const sectionId =
    target === "resume" || target === "contact" ? "workspace" : target;
  document
    .getElementById(sectionId)
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
    if (target === "contact") {
      window.open(SITE_PROFILE.whatsappUrl, "_blank", "noopener,noreferrer");
      setMenuOpen(false);
      return;
    }
    if (target === "resume") {
      const download = document.createElement("a");
      download.href = SITE_PROFILE.resumeUrl;
      download.download = SITE_PROFILE.resumeDownloadName;
      document.body.appendChild(download);
      download.click();
      download.remove();
      setMenuOpen(false);
      return;
    }
    navigateTo(target);
    setMenuOpen(false);
  };

  return (
    <div className="portfolio-nav-shell">
      <header className="portfolio-nav" role="banner">
        <a
          className="portfolio-brand"
          href="#top"
          aria-label="Deepak Kumar - Go to top of page"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.replaceState(null, "", "#top");
          }}
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="brand-copy">
            <strong>DEEPAK KUMAR</strong>
            <small>PRODUCT / SYSTEMS</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main sections">
          {links.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(event) => {
                event.preventDefault();
                handleAction(link.target);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="nav-actions" aria-label="Primary actions">
          {actions.map((action, index) => (
            <a
              key={action.target}
              className={`nav-action ${
                index === actions.length - 1 ? "nav-action-primary" : ""
              }`}
              href={`#${action.target}`}
              onClick={(event) => {
                event.preventDefault();
                handleAction(action.target);
              }}
            >
              {action.label}
              {index === actions.length - 1 && (
                <span aria-hidden="true">↗</span>
              )}
            </a>
          ))}
        </nav>

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
          <span>01 / NAVIGATION</span>
          <span>DEEPOS</span>
        </div>
        {[...links, ...actions].map((action, index) => (
          <a
            key={action.target}
            href={`#${action.target}`}
            tabIndex={menuOpen ? 0 : -1}
            onClick={(event) => {
              event.preventDefault();
              handleAction(action.target);
            }}
          >
            <span>0{index + 1}</span>
            {action.label}
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import "./Navbar.css";

type NavTarget = "about" | "projects" | "resume" | "contact";

const WHATSAPP_URL = "https://wa.me/919350432714?text=Hi%20Deepak%2C%0A%0AI%20found%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20a%20project%20with%20you.";

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
    window.dispatchEvent(new CustomEvent("hero:navigate-to-frame", { detail: { frame: 69 } }));
    window.history.replaceState(null, "", "#about");
    return;
  }
  const section = target === "resume" || target === "contact" ? "workspace" : target;
  document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.location.hash = target;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", menuOpen);
    return () => document.body.classList.remove("nav-menu-open");
  }, [menuOpen]);

  const handleAction = (target: NavTarget) => {
    if (target === "contact") {
      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
      setMenuOpen(false);
      return;
    }
    if (target === "resume") {
      const download = document.createElement("a");
      download.href = "/resume.pdf";
      download.download = "Deepak-Kumar-Resume.pdf";
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
      <header className="portfolio-nav">
        <a className="portfolio-brand" href="#top" aria-label="Deepak Kumar home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="brand-copy"><strong>DEEPAK KUMAR</strong><small>PRODUCT / SYSTEMS</small></span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          {links.map((link) => <a key={link.target} href={`#${link.target}`} onClick={(event) => { event.preventDefault(); handleAction(link.target); }}>{link.label}</a>)}
        </nav>

        <nav className="nav-actions" aria-label="Primary navigation">
          {actions.map((action, index) => (
            <a
              key={action.target}
              className={`nav-action ${index === actions.length - 1 ? "nav-action-primary" : ""}`}
              href={`#${action.target}`}
              onClick={(event) => { event.preventDefault(); handleAction(action.target); }}
            >
              {action.label}
              {index === actions.length - 1 && <span aria-hidden="true">↗</span>}
            </a>
          ))}
        </nav>

        <button className={`nav-menu-toggle ${menuOpen ? "is-open" : ""}`} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <div className={`nav-mobile-panel ${menuOpen ? "is-open" : ""}`}>
        <div className="nav-mobile-intro"><span>01 / NAVIGATION</span><span>DEEPOS</span></div>
        {[...links, ...actions].map((action, index) => (
          <a key={action.target} href={`#${action.target}`} onClick={(event) => { event.preventDefault(); handleAction(action.target); }}>
            <span>0{index + 1}</span>{action.label}<b>↗</b>
          </a>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CircleUserRound, Code2, Download, FileText, Heart, Mail, Music } from "lucide-react";
import CursorGrid from "./CursorGrid";
import SpecularButton from "./SpecularButton";
import OptionWheel from "./OptionWheel";
import { SITE_PROFILE } from "@/lib/projects.config";

const BUILD_SERVICES = [
  "AI Agents", "AI Automations", "Custom Software", "Web Applications", "Mobile Applications",
  "SaaS Platforms", "Internal Tools", "Business Dashboards", "Customer Portals", "Workflow Automation",
  "API Integrations", "CRM Solutions", "E-Commerce Solutions", "Payment Systems", "Cloud Infrastructure",
  "DevOps", "UI/UX Design", "Product Strategy", "Performance Optimisation", "Maintenance & Support",
];

const contacts = [
  { label: "Email", value: SITE_PROFILE.email, href: `mailto:${SITE_PROFILE.email}`, icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/deeepucodes", href: SITE_PROFILE.linkedinUrl, icon: CircleUserRound, external: true },
  { label: "GitHub", value: "github.com/DeepuCodesss", href: SITE_PROFILE.githubUrl, icon: Code2, external: true },
  { label: "Resume", value: "Download PDF", href: SITE_PROFILE.resumeUrl, icon: FileText, download: SITE_PROFILE.resumeDownloadName },
];

const tech = ["Next.js", "React", "TypeScript", "Node.js", "Three.js", "TailwindCSS", "Framer Motion", "Supabase"];

export default function ContactSection() {
  const [selectedService, setSelectedService] = useState(BUILD_SERVICES[0]);
  const [eggOpen, setEggOpen] = useState(false);

  return (
    <section className="contact-section final-contact" aria-label="Contact section">
      <div className="contact-section-glow" aria-hidden="true" />
      <CursorGrid
        cellSize={78}
        color="#d946ef"
        radius={170}
        holdTime={450}
        fadeDuration={1100}
        lineWidth={1.2}
        maxOpacity={0.7}
        fillOpacity={0.03}
        gridOpacity={0.035}
        clickPulse
        pulseSpeed={650}
      />
      <OptionWheel items={BUILD_SERVICES} defaultSelected={0} onChange={(_, item) => setSelectedService(item)} />

      <motion.div
        className="contact-orb"
        aria-hidden="true"
        animate={{ y: [0, -15, 0], rotate: [0, 5, -3, 0], scale: [1, 1.025, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="contact-copy">
        <span className="contact-kicker"><i /> AVAILABLE FOR SELECTED BUILDS</span>
        <h2>Let&apos;s Build<br /><em>Something Exceptional</em></h2>
        <p>Have an ambitious idea? Let&apos;s turn it into a thoughtful, high-performance digital experience.</p>
        <span className="contact-selection">CURRENT FOCUS <b>{selectedService}</b></span>
        <div className="contact-action">
          <SpecularButton onClick={() => window.open(SITE_PROFILE.whatsappUrl, "_blank", "noopener,noreferrer")}>
            Start a project <ArrowUpRight size={17} />
          </SpecularButton>
        </div>
        <div className="availability-note"><span /> Usually responds within 24 hours.</div>
      </div>

      <div className="contact-cards">
        {contacts.map(({ label, value, href, icon: Icon, external, download }, index) => (
          <motion.a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            download={download}
            className="contact-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08, duration: 0.7 }}
            aria-label={`${label}: ${value}`}
          >
            <span className="contact-card-icon"><Icon size={18} strokeWidth={1.5} /></span>
            <span className="contact-card-label">{label}</span>
            <strong>{value}</strong>
            <ArrowUpRight className="contact-card-arrow" size={15} />
          </motion.a>
        ))}
      </div>

      <div className="contact-socials" aria-label="Social links">
        <a href={SITE_PROFILE.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub Profile"><Code2 size={15} /></a>
        <a href={SITE_PROFILE.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile"><CircleUserRound size={15} /></a>
        <a href={`mailto:${SITE_PROFILE.email}`} aria-label="Send Email"><Mail size={15} /></a>
        <a href={SITE_PROFILE.resumeUrl} download={SITE_PROFILE.resumeDownloadName} aria-label="Download Resume"><Download size={15} /></a>
      </div>

      <p className="contact-quote">&quot;Building products that people enjoy using.&quot;</p>

      <footer className="final-footer">
        <div>
          <strong>DEEPAK KUMAR</strong>
          <span>Product Engineer <b>•</b> Full Stack Developer <b>•</b> AI Systems</span>
          <small>Designed &amp; Developed by Deepak Kumar</small>
        </div>
        <div className="final-footer-meta">
          <span>© 2026 All Rights Reserved</span>
          <div className="tech-stack">
            {tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </footer>

      <button
        className={`version-egg${eggOpen ? " is-open" : ""}`}
        onMouseEnter={() => setEggOpen(true)}
        onMouseLeave={() => setEggOpen(false)}
        onFocus={() => setEggOpen(true)}
        onBlur={() => setEggOpen(false)}
        aria-label="Portfolio version details"
      >
        {!eggOpen ? "v2.6.1" : (
          <>
            <b>Portfolio Version</b>
            <span>Built with</span>
            <span><Heart size={10} /> Coffee&nbsp; <Music size={10} /> Music&nbsp; <Heart size={10} /> Passion</span>
          </>
        )}
      </button>
    </section>
  );
}


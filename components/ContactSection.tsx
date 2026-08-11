"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CircleUserRound, Code2, Download, Mail, Heart, Music } from "lucide-react";
import { useState } from "react";
import { SITE_PROFILE } from "@/lib/projects.config";

const contacts = [
  { label: "Email", value: SITE_PROFILE.email, href: `mailto:${SITE_PROFILE.email}`, icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/deeepucodes", href: SITE_PROFILE.linkedinUrl, icon: CircleUserRound, external: true },
  { label: "GitHub", value: "github.com/DeepuCodesss", href: SITE_PROFILE.githubUrl, icon: Code2, external: true },
  { label: "Resume", value: "Download PDF", href: SITE_PROFILE.resumeUrl, icon: Download, download: SITE_PROFILE.resumeDownloadName },
];

const tech = ["Next.js", "React", "TypeScript", "Node.js", "AI Automations", "TailwindCSS", "Framer Motion", "GSAP"];

export default function ContactSection() {
  const [eggOpen, setEggOpen] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-red-950/40 bg-[#040203] px-6 py-28 sm:px-10 md:px-14 lg:px-20 text-[#f4f0e8]" aria-label="Contact section">
      {/* Background ambient red lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#e61924]/15 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header & Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 mb-4 px-4 py-1.5 rounded-full bg-black/60 border border-red-900/40 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#e61924] shadow-[0_0_8px_#e61924] animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-[#e61924]">
              LET&apos;S CONNECT
            </span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal uppercase tracking-wide text-white leading-none">
            LET&apos;S BUILD <br />
            <span className="text-[#e61924] drop-shadow-[0_0_35px_rgba(230,25,36,0.5)]">SOMETHING</span> EXCEPTIONAL
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/70 font-space max-w-xl mx-auto leading-relaxed">
            Have an ambitious idea, project, or collaboration in mind? Let&apos;s build something high-performance and memorable.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={SITE_PROFILE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#e61924] hover:bg-[#ff2430] text-white px-8 py-4 rounded-xl font-space font-semibold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(230,25,36,0.6)] transition-all duration-300 hover:scale-[1.03]"
            >
              Start a project <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* Contact Action Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-24">
          {contacts.map(({ label, value, href, icon: Icon, external, download }, index) => (
            <motion.a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              download={download}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group relative flex flex-col justify-between rounded-xl border border-red-900/30 bg-[#0c0507]/90 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#e61924] hover:shadow-[0_0_30px_rgba(230,25,36,0.25)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-red-900/40 bg-red-950/20 text-[#e61924] group-hover:border-[#e61924] transition-colors">
                  <Icon size={18} />
                </div>
                <ArrowUpRight size={16} className="text-white/40 group-hover:text-[#e61924] transition-colors" />
              </div>

              <div>
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e61924] mb-1">
                  {label}
                </span>
                <strong className="block font-space text-sm font-medium text-white group-hover:text-[#e61924] transition-colors truncate">
                  {value}
                </strong>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer Bar */}
        <footer className="pt-8 border-t border-red-950/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/50 font-space">
          <div>
            <strong className="font-bebas text-xl text-white tracking-wider block">
              DEEPAK KUMAR
            </strong>
            <span className="text-white/50 text-[11px]">
              Full Stack Developer • AI Systems • Portfolio
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {tech.map((item) => (
              <span key={item} className="px-2.5 py-1 rounded bg-black/60 border border-red-900/30 text-[10px] font-mono text-white/60">
                {item}
              </span>
            ))}
          </div>

          <div className="text-right">
            <span>© 2026 DEEPAK KUMAR</span>
          </div>
        </footer>

        {/* Interactive Version Egg */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-900/30 bg-black/60 text-[10px] font-mono text-white/40 hover:text-white/80 transition-colors"
            onClick={() => setEggOpen(!eggOpen)}
          >
            {!eggOpen ? (
              <span>v3.0.0 • BRUTAL RED-BLACK EDITION</span>
            ) : (
              <span className="flex items-center gap-2 text-[#e61924]">
                Built with <Heart size={10} className="fill-[#e61924]" /> Coffee & <Music size={10} /> Music
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

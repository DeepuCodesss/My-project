"use client";

import { motion } from "framer-motion";
import { Code2, Box, Cpu, Sparkles } from "lucide-react";

interface FocusItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const focusItems: FocusItem[] = [
  {
    number: "01",
    icon: <Code2 className="h-6 w-6 text-[#e61924]" />,
    title: "SYSTEM DESIGN",
    subtitle: "SCALABLE ARCHITECTURE",
    description:
      "Designing scalable backend systems, robust APIs, and high-concurrency database models that handle real-world load seamlessly.",
  },
  {
    number: "02",
    icon: <Box className="h-6 w-6 text-[#e61924]" />,
    title: "PRODUCT BUILDING",
    subtitle: "END-TO-END SHIPPER",
    description:
      "Transforming complex ideas into working, full-stack products with crisp user experience, performance engineering, and clean code.",
  },
  {
    number: "03",
    icon: <Cpu className="h-6 w-6 text-[#e61924]" />,
    title: "AI INTEGRATIONS",
    subtitle: "INTELLIGENT SYSTEMS",
    description:
      "Leveraging modern LLM APIs, autonomous agents, and intelligent workflow automation to build smarter user experiences.",
  },
  {
    number: "04",
    icon: <Sparkles className="h-6 w-6 text-[#e61924]" />,
    title: "OPEN SOURCE",
    subtitle: "DEVELOPER ECOSYSTEM",
    description:
      "Exploring low-level systems, kernel development, open-source libraries, and sharing technical insights with the developer community.",
  },
];

export default function CurrentFocusSection() {
  return (
    <section className="relative overflow-hidden border-t border-red-950/40 bg-[#040203] px-6 py-28 sm:px-10 md:px-14 lg:px-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#e61924]/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#e61924]">
                03 /
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                ACTIVE PURSUITS
              </span>
            </div>
            <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl font-normal uppercase tracking-wide text-white leading-none">
              CURRENT <span className="text-[#e61924]">FOCUS</span>
            </h2>
            <div className="mt-4 h-1 w-24 bg-[#e61924]" />
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-white/60 bg-black/60 px-4 py-2 rounded-xl border border-red-900/30">
            <span className="h-2 w-2 rounded-full bg-[#e61924] shadow-[0_0_8px_#e61924] animate-pulse" />
            <span>EXPLORING. BUILDING. SHARING.</span>
          </div>
        </div>

        {/* ── Grid of Brutal Focus Cards ────────────────────────────── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-red-900/30 bg-[#0c0507]/90 p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-red-600/60 hover:shadow-[0_0_35px_rgba(230,25,36,0.2)]"
            >
              <div>
                {/* Header row with icon & number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-red-900/40 bg-red-950/20 group-hover:border-[#e61924] transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-[#e61924]/60 group-hover:text-[#e61924] transition-colors">
                    {item.number}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e61924] mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-bebas text-3xl font-normal tracking-wide text-white uppercase group-hover:text-[#e61924] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/60 font-space font-normal">
                  {item.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="mt-6 h-0.5 w-full bg-red-950/50 group-hover:bg-[#e61924] transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


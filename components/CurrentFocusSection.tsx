"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FocusItem {
  number: string;
  iconSrc: string;
  title: string;
  subtitle: string;
  description: string;
}

const focusItems: FocusItem[] = [
  {
    number: "01",
    iconSrc: "/assets/icons/focus/system-design.webp",
    title: "SYSTEM DESIGN",
    subtitle: "SCALABLE ARCHITECTURE",
    description:
      "Designing scalable backend systems, robust APIs, and high-concurrency database models that handle real-world load seamlessly.",
  },
  {
    number: "02",
    iconSrc: "/assets/icons/focus/product-building.webp",
    title: "PRODUCT BUILDING",
    subtitle: "END-TO-END SHIPPER",
    description:
      "Transforming complex ideas into working, full-stack products with crisp user experience, performance engineering, and clean code.",
  },
  {
    number: "03",
    iconSrc: "/assets/icons/focus/ai-integrations.webp",
    title: "AI INTEGRATIONS",
    subtitle: "INTELLIGENT SYSTEMS",
    description:
      "Leveraging modern LLM APIs, autonomous agents, and intelligent workflow automation to build smarter user experiences.",
  },
  {
    number: "04",
    iconSrc: "/assets/icons/focus/open-source.webp",
    title: "OPEN SOURCE",
    subtitle: "DEVELOPER ECOSYSTEM",
    description:
      "Exploring low-level systems, kernel development, open-source libraries, and sharing technical insights with the developer community.",
  },
];

export default function CurrentFocusSection() {
  return (
    <section id="focus" className="relative overflow-hidden border-t border-red-950/40 bg-[#040203] px-6 py-28 sm:px-10 md:px-14 lg:px-20" aria-labelledby="focus-title">
      {/* ── Reusable Atmosphere Texture & Glow Overlays ───── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-12">
        <Image
          src="/assets/atmosphere/section-texture.webp"
          alt=""
          role="presentation"
          fill
          sizes="100vw"
          decoding="async"
          className="h-full w-full object-cover object-center filter contrast-125 brightness-75"
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] rounded-full bg-[#e61924]/12 blur-[150px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-7xl z-10">
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
            <h2 id="focus-title" className="font-bebas text-6xl sm:text-7xl md:text-8xl font-normal uppercase tracking-wide text-white leading-none">
              CURRENT <span className="text-[#e61924]">FOCUS</span>
            </h2>
            <div className="mt-4 h-1 w-24 bg-[#e61924]" />
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-white/60 bg-black/60 px-4 py-2 rounded-xl border border-red-900/30">
            <span className="h-2 w-2 rounded-full bg-[#e61924] shadow-[0_0_8px_#e61924] animate-pulse" />
            <span>EXPLORING. BUILDING. SHARING.</span>
          </div>
        </div>

        {/* ── Grid of Brutal Focus Cards with Custom PNG Icons ─────── */}
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
                {/* Header row with custom PNG icon well & number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="grid h-14 w-14 place-items-center rounded-xl border border-red-900/40 bg-black/60 p-2.5 group-hover:border-[#e61924] transition-colors shadow-inner">
                    <Image
                      src={item.iconSrc}
                      alt=""
                      aria-hidden="true"
                      width={96}
                      height={96}
                      sizes="56px"
                      className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(230,25,36,0.5)]"
                    />
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

"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Briefcase, Cpu, Bot } from "lucide-react";

/* ── Data ───────────────────────────────────────── */

interface FocusItem {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  accentRgb: string;          // "r,g,b"
}

const focusItems: FocusItem[] = [
  {
    icon: <Briefcase className="h-5 w-5" strokeWidth={1.5} />,
    title: "Finding Opportunities",
    accentRgb: "99,130,255",
    description: (
      <>
        I&apos;m actively looking for{" "}
        <span className="text-white/70 font-medium">freelance</span> projects,
        collaborations, internships, and opportunities to solve real-world
        problems through software.
      </>
    ),
  },
  {
    icon: <Cpu className="h-5 w-5" strokeWidth={1.5} />,
    title: "Building My Own Operating System",
    accentRgb: "52,211,153",
    description: (
      <>
        Currently exploring low-level systems programming and building my own
        hobby{" "}
        <span className="text-white/70 font-medium">operating system</span> to
        deepen my understanding of kernels, memory management, bootloaders, and
        computer architecture.
      </>
    ),
  },
  {
    icon: <Bot className="h-5 w-5" strokeWidth={1.5} />,
    title: "Building a Large-Scale AI Automation Platform",
    accentRgb: "168,85,247",
    description: (
      <>
        Developing an{" "}
        <span className="text-white/70 font-medium">AI-powered automation</span>{" "}
        system that discovers viral content, intelligently generates clips, and
        automates publishing across thousands of social media accounts while
        orchestrating the entire workflow from content discovery to distribution.
      </>
    ),
  },
];

/* ── Card ───────────────────────────────────────── */

function FocusCard({ item, index }: { item: FocusItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* mouse-follow spotlight values */
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-400);
    mouseY.set(-400);
  }, [mouseX, mouseY]);

  /* reactive gradient templates */
  const borderGlow = useMotionTemplate`radial-gradient(
    280px circle at ${mouseX}px ${mouseY}px,
    rgba(${item.accentRgb}, 0.25),
    transparent 60%
  )`;

  const innerSpotlight = useMotionTemplate`radial-gradient(
    380px circle at ${mouseX}px ${mouseY}px,
    rgba(${item.accentRgb}, 0.055),
    transparent 80%
  )`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.85,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      className="focus-card group relative rounded-[20px] p-px"
      style={
        { "--card-accent": item.accentRgb } as React.CSSProperties
      }
    >
      {/* ── Default subtle gradient border ──────── */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/[0.08] to-white/[0.03] transition-opacity duration-500 group-hover:opacity-50" />

      {/* ── Accent border glow (mouse-follow) ──── */}
      <motion.div
        className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: borderGlow }}
      />

      {/* ── Card inner ─────────────────────────── */}
      <div className="relative overflow-hidden rounded-[19px] bg-[#0a0a0a]">
        {/* Inner spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[19px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: innerSpotlight }}
        />

        {/* Top-edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Animated accent line (left edge) */}
        <div
          className="absolute left-0 top-1/2 w-[2px] -translate-y-1/2 rounded-full focus-accent-line"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(${item.accentRgb}, 0.7), transparent)`,
          }}
        />

        {/* ── Content ──────────────────────────── */}
        <div className="relative z-10 p-10 pl-11">
          {/* Icon container */}
          <div
            className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] backdrop-blur-sm transition-colors duration-300 group-hover:border-white/[0.12]"
            style={{ background: `rgba(${item.accentRgb}, 0.07)` }}
          >
            <div style={{ color: `rgb(${item.accentRgb})` }}>
              {item.icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-4 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-white">
            {item.title}
          </h3>

          {/* Description */}
          <p className="max-w-[300px] text-[15px] leading-[1.8] text-white/35">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────── */

export default function CurrentFocusSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-transparent px-6 py-32 sm:px-10 md:px-14 lg:px-20">
      <div className="relative mx-auto max-w-7xl">
        {/* ── Header ───────────────────────────── */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* "Currently" pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/50">
              Currently
            </span>
          </div>

          <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-white/40">
            What I&apos;m Working On
          </p>

          <h2 className="font-clash mt-6 text-6xl font-semibold tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[104px]">
            Current Focus
          </h2>
        </motion.div>

        {/* ── Cards grid ───────────────────────── */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {focusItems.map((item, index) => (
            <FocusCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

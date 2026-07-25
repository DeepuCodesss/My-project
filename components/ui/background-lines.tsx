"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundLines({ children, className, svgOptions }: { children?: React.ReactNode; className?: string; svgOptions?: { duration?: number } }) {
  const lines = Array.from({ length: 18 }, (_, index) => {
    const y = 80 + index * 46;
    const bend = index % 2 === 0 ? 120 : -120;
    return `M -120 ${y} C 180 ${y + bend}, 360 ${y - bend}, 620 ${y} S 1030 ${y + bend}, 1560 ${y - bend}`;
  });
  const colors = ["#f0a39b", "#a99aff", "#6ba9ff", "#e77a72", "#b9b1ff"];

  return <div className={cn("relative h-screen w-full overflow-hidden bg-transparent", className)}><motion.svg viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} aria-hidden="true">{lines.map((path, index) => <motion.path key={path} d={path} stroke={colors[index % colors.length]} strokeWidth="1.4" strokeLinecap="round" variants={{ initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: [0, .5, .18, 0] } }} initial="initial" animate="animate" transition={{ duration: svgOptions?.duration ?? 12, ease: "linear", repeat: Infinity, delay: index * .28, repeatDelay: 3 }} />)}</motion.svg>{children}</div>;
}

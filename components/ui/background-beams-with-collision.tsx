"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

type BeamOptions = {
  initialX?: number | string;
  translateX?: number | string;
  initialY?: number | string;
  translateY?: number | string;
  rotate?: number;
  className?: string;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
};

export function BackgroundBeamsWithCollision({ children, className }: { children?: React.ReactNode; className?: string }) {
  const beams: BeamOptions[] = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: "h-20" },
    { initialX: 1000, translateX: 1000, duration: 4, repeatDelay: 2, className: "h-12" },
    { initialX: 1200, translateX: 1200, duration: 6, repeatDelay: 4, delay: 2, className: "h-6" },
  ];

  return <div className={cn("relative flex h-96 w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 md:h-[40rem]", className)}>{beams.map((beam, index) => <CollisionMechanism key={`${beam.initialX}-${index}`} beamOptions={beam} />)}{children}<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-neutral-100" style={{ boxShadow: "0 0 24px rgba(34, 42, 53, 0.12), 0 0 0 1px rgba(34, 42, 53, 0.05)" }} /></div>;
}

function CollisionMechanism({ beamOptions = {} }: { beamOptions?: BeamOptions }) {
  return <motion.div initial={{ translateY: beamOptions.initialY ?? "-200px", translateX: beamOptions.initialX ?? "0px", rotate: beamOptions.rotate ?? 0 }} animate={{ translateY: beamOptions.translateY ?? "1800px", translateX: beamOptions.translateX ?? "0px", rotate: beamOptions.rotate ?? 0 }} transition={{ duration: beamOptions.duration ?? 8, repeat: Infinity, repeatType: "loop", ease: "linear", delay: beamOptions.delay ?? 0, repeatDelay: beamOptions.repeatDelay ?? 0 }} className={cn("absolute left-0 top-20 z-10 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent", beamOptions.className)} />;
}

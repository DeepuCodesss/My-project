"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const beams: BeamOptions[] = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: "h-20" },
    { initialX: 1000, translateX: 1000, duration: 4, repeatDelay: 2, className: "h-12" },
    { initialX: 1200, translateX: 1200, duration: 6, repeatDelay: 4, delay: 2, className: "h-6" },
  ];

  return <div ref={parentRef} className={cn("relative flex h-96 w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 md:h-[40rem]", className)}>{beams.map((beam, index) => <CollisionMechanism key={`${beam.initialX}-${index}`} beamOptions={beam} containerRef={containerRef} parentRef={parentRef} />)}{children}<div ref={containerRef} className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-neutral-100" style={{ boxShadow: "0 0 24px rgba(34, 42, 53, 0.12), 0 0 0 1px rgba(34, 42, 53, 0.05)" }} /></div>;
}

function CollisionMechanism({ containerRef, parentRef, beamOptions = {} }: { containerRef: React.RefObject<HTMLDivElement>; parentRef: React.RefObject<HTMLDivElement>; beamOptions?: BeamOptions }) {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{ detected: boolean; coordinates: { x: number; y: number } | null }>({ detected: false, coordinates: null });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleDetected, setCycleDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (!beamRef.current || !containerRef.current || !parentRef.current || cycleDetected) return;
      const beamRect = beamRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      if (beamRect.bottom >= containerRect.top) {
        setCollision({ detected: true, coordinates: { x: beamRect.left - parentRect.left + beamRect.width / 2, y: beamRect.bottom - parentRect.top } });
        setCycleDetected(true);
      }
    };
    const interval = window.setInterval(checkCollision, 50);
    return () => window.clearInterval(interval);
  }, [containerRef, cycleDetected, parentRef]);

  useEffect(() => {
    if (!collision.detected) return;
    const reset = window.setTimeout(() => { setCollision({ detected: false, coordinates: null }); setCycleDetected(false); }, 2000);
    const replay = window.setTimeout(() => setBeamKey((key) => key + 1), 2000);
    return () => { window.clearTimeout(reset); window.clearTimeout(replay); };
  }, [collision]);

  return <React.Fragment><motion.div key={beamKey} ref={beamRef} initial={{ translateY: beamOptions.initialY ?? "-200px", translateX: beamOptions.initialX ?? "0px", rotate: beamOptions.rotate ?? 0 }} animate={{ translateY: beamOptions.translateY ?? "1800px", translateX: beamOptions.translateX ?? "0px", rotate: beamOptions.rotate ?? 0 }} transition={{ duration: beamOptions.duration ?? 8, repeat: Infinity, repeatType: "loop", ease: "linear", delay: beamOptions.delay ?? 0, repeatDelay: beamOptions.repeatDelay ?? 0 }} className={cn("absolute left-0 top-20 z-10 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent", beamOptions.className)} /><AnimatePresence>{collision.detected && collision.coordinates && <Explosion key={`${collision.coordinates.x}-${collision.coordinates.y}`} style={{ left: collision.coordinates.x, top: collision.coordinates.y, transform: "translate(-50%, -50%)" }} />}</AnimatePresence></React.Fragment>;
}

function Explosion({ style }: { style: React.CSSProperties }) {
  const particles = Array.from({ length: 20 }, (_, index) => ({ id: index, x: Math.floor(Math.random() * 80 - 40), y: Math.floor(Math.random() * -50 - 10) }));
  return <div className="absolute z-50 h-2 w-2" style={style}><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />{particles.map((particle) => <motion.span key={particle.id} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: particle.x, y: particle.y, opacity: 0 }} transition={{ duration: Math.random() * 1.5 + .5, ease: "easeOut" }} className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />)}</div>;
}

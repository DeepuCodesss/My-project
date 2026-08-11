"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 146;
const PRELOAD_WORKERS = 2;
const INITIAL_FRAME_COUNT = 6;
const FRAME_PATH = (index: number) =>
  `/hero-frames/frame-${String(index).padStart(3, "0")}.webp`;

function fitCover(
  imgW: number,
  imgH: number,
  canvasW: number,
  canvasH: number
) {
  const scale = Math.max(canvasW / imgW, canvasH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const dx = (canvasW - drawW) / 2;
  const dy = (canvasH - drawH) / 2;
  return { dx, dy, drawW, drawH };
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));
  const drawQueuedRef = useRef(false);
  const progressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let requestFrameLoad: (index: number) => void = () => undefined;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { innerWidth, innerHeight } = window;
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    const drawFrame = (frameIndex: number) => {
      let img = imagesRef.current[frameIndex];
      if (!img || !img.complete) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset += 1) {
          const before = frameIndex - offset;
          const after = frameIndex + offset;
          if (before >= 0 && loadedRef.current[before]) {
            img = imagesRef.current[before];
            break;
          }
          if (after < TOTAL_FRAMES && loadedRef.current[after]) {
            img = imagesRef.current[after];
            break;
          }
        }
      }
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);
      if (!img || !img.complete) {
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, w, h);
        return;
      }
      const { dx, dy, drawW, drawH } = fitCover(img.naturalWidth, img.naturalHeight, w, h);
      ctx.drawImage(img, dx, dy, drawW, drawH);
    };

    const scheduleDraw = () => {
      if (drawQueuedRef.current) return;
      drawQueuedRef.current = true;
      requestAnimationFrame(() => {
        drawQueuedRef.current = false;
        drawFrame(currentFrameRef.current);
      });
    };

    const setFrameFromProgress = (progress: number) => {
      progressRef.current = progress;
      const next = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))));
      if (next !== currentFrameRef.current) {
        currentFrameRef.current = next;
        scheduleDraw();
      }
      requestFrameLoad(next);
    };

    const loading = Array<Promise<void> | null>(TOTAL_FRAMES).fill(null);
    const loadFrame = (index: number) => {
      if (loadedRef.current[index]) return Promise.resolve();
      if (loading[index]) return loading[index];

      loading[index] = new Promise<void>((resolve) => {
        if (loadedRef.current[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.src = FRAME_PATH(index + 1);
        img.onload = async () => {
          try {
            await img.decode();
          } catch {
            // The browser may already have decoded the image during onload.
          }
          imagesRef.current[index] = img;
          loadedRef.current[index] = true;
          resolve();
        };
        img.onerror = () => resolve();
      });

      return loading[index];
    };

    requestFrameLoad = (index) => {
      void loadFrame(index);
      // Keep a small buffer around the current scroll position without
      // decoding the entire image sequence during first paint.
      for (let offset = 1; offset <= 3; offset += 1) {
        if (index - offset >= 0) void loadFrame(index - offset);
        if (index + offset < TOTAL_FRAMES) void loadFrame(index + offset);
      }
    };

    const preloadFrames = async () => {
      await loadFrame(0);
      setReady(true);
      drawFrame(0);

      let nextFrame = 1;
      const worker = async (end: number) => {
        while (nextFrame < end) {
          const frame = nextFrame;
          nextFrame += 1;
          await loadFrame(frame);
        }
      };

      await Promise.all(Array.from({ length: PRELOAD_WORKERS }, () => worker(INITIAL_FRAME_COUNT)));

      // Remaining frames are loaded on demand by setFrameFromProgress.
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=400%",
        scrub: true,
        pin: true,
        pinType: "fixed",
        anticipatePin: 1,
        onUpdate: (self) => {
          setStarted(self.progress > 0.01);
          setFrameFromProgress(self.progress);
        },
      },
    });

    tl.to(
      {},
      {
        duration: 1,
        ease: "none",
      }
    );

    const handleHeroFrameNavigation = (event: Event) => {
      const frame = (event as CustomEvent<{ frame?: number }>).detail?.frame;
      const trigger = tl.scrollTrigger;
      if (typeof frame !== "number" || !trigger) return;
      const progress = Math.min(1, Math.max(0, frame / (TOTAL_FRAMES - 1)));
      window.scrollTo({
        top: trigger.start + (trigger.end - trigger.start) * progress,
        behavior: "smooth",
      });
    };

    window.addEventListener("hero:navigate-to-frame", handleHeroFrameNavigation);

    preloadFrames();
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("hero:navigate-to-frame", handleHeroFrameNavigation);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black text-[var(--fg)]"
    >
      {!ready && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${FRAME_PATH(1)})` }}
          aria-hidden="true"
        />
      )}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 pointer-events-none ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.86))]" />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/45" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10">
        <div />
        <div />

        <div className={`flex items-end justify-center pb-1 transition-opacity duration-500 ${started ? "opacity-0" : "opacity-100"}`}>
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-white/70">
            <div className="relative h-11 w-6 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-white/70" />
              <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-white/70" />
              <div className="absolute inset-x-0 bottom-2 mx-auto h-2 w-2 rotate-45 border-b border-r border-white/70 animate-bounce" />
            </div>
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

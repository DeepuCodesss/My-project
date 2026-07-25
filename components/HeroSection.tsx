"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 146;
const LEAD_FRAMES = 15;
const FRAME_PATH = (index: number) =>
  index === 146
    ? `/ezgif-70f7dfecd82b13ba-jpg/ezgif-frame-146.png`
    : `/ezgif-70f7dfecd82b13ba-jpg/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

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
    const finalFrameUrl = FRAME_PATH(TOTAL_FRAMES);
    const applyFinalBackdrop = () => {
      document.body.style.backgroundImage = `url("${finalFrameUrl}")`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundColor = "#050505";
    };

    const clearFinalBackdrop = () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { innerWidth, innerHeight } = window;
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
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
    };

    const loadFrame = (index: number) =>
      new Promise<void>((resolve) => {
        if (loadedRef.current[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.src = FRAME_PATH(index + 1);
        img.onload = () => {
          imagesRef.current[index] = img;
          loadedRef.current[index] = true;
          resolve();
        };
        img.onerror = () => resolve();
      });

    const preloadLead = async () => {
      await Promise.all(Array.from({ length: LEAD_FRAMES }, (_, i) => loadFrame(i)));
      currentFrameRef.current = 0;
      setReady(true);
      drawFrame(0);
      for (let i = LEAD_FRAMES; i < TOTAL_FRAMES; i += 1) {
        void loadFrame(i);
      }
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
          if (self.progress >= 0.999) {
            applyFinalBackdrop();
          } else {
            clearFinalBackdrop();
          }
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

    preloadLead();
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("hero:navigate-to-frame", handleHeroFrameNavigation);
      tl.scrollTrigger?.kill();
      tl.kill();
      clearFinalBackdrop();
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

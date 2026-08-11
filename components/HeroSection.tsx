"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 146;
const INITIAL_PRELOAD_COUNT = 6;
const BUFFER_WINDOW = 5;

const FRAME_PATH = (index: number) =>
  `/hero-frames/frame-${String(index).padStart(3, "0")}.webp`;

/**
 * Intelligent fitCover with focal point support for portrait mobile viewports.
 */
function fitCover(
  imgW: number,
  imgH: number,
  canvasW: number,
  canvasH: number
) {
  const scale = Math.max(canvasW / imgW, canvasH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;

  // On very narrow portrait screens, bias slightly towards top-center focal point
  const isPortraitMobile = canvasW / canvasH < 0.75;
  const dx = (canvasW - drawW) / 2;
  const dy = isPortraitMobile ? Math.min(0, (canvasH - drawH) * 0.35) : (canvasH - drawH) / 2;

  return { dx, dy, drawW, drawH };
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const loadedRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));
  const loadingRef = useRef<(Promise<void> | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );

  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const drawQueuedRef = useRef(false);
  const lastDirectionRef = useRef<1 | -1>(1);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let isComponentMounted = true;
    let idlePreloadId: number | null = null;
    let resizeTimeoutId: number | null = null;

    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Load individual frame with deduplicated promise
    const loadFrame = (index: number): Promise<void> => {
      if (index < 0 || index >= TOTAL_FRAMES) return Promise.resolve();
      if (loadedRef.current[index]) return Promise.resolve();
      if (loadingRef.current[index]) return loadingRef.current[index]!;

      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = FRAME_PATH(index + 1);

        img.onload = async () => {
          if (!isComponentMounted) {
            resolve();
            return;
          }
          try {
            await img.decode();
          } catch {
            // Decoding already completed or browser non-critical error
          }
          imagesRef.current[index] = img;
          loadedRef.current[index] = true;
          resolve();
        };

        img.onerror = () => {
          loadedRef.current[index] = false;
          resolve();
        };
      });

      loadingRef.current[index] = promise;
      return promise;
    };

    // Load dynamic window of frames around current index in scroll direction
    const requestWindowLoad = (centerIndex: number, direction: 1 | -1 = 1) => {
      void loadFrame(centerIndex);

      if (direction >= 0) {
        for (let i = 1; i <= BUFFER_WINDOW; i += 1) {
          if (centerIndex + i < TOTAL_FRAMES) void loadFrame(centerIndex + i);
          if (centerIndex - i >= 0) void loadFrame(centerIndex - i);
        }
      } else {
        for (let i = 1; i <= BUFFER_WINDOW; i += 1) {
          if (centerIndex - i >= 0) void loadFrame(centerIndex - i);
          if (centerIndex + i < TOTAL_FRAMES) void loadFrame(centerIndex + i);
        }
      }
    };

    // Draw target frame to canvas with nearest loaded frame fallback
    const drawFrame = (targetIndex: number) => {
      if (!canvas || !ctx || document.visibilityState === "hidden") return;

      let img = imagesRef.current[targetIndex];
      if (!img || !img.complete) {
        // Fallback to nearest loaded frame
        for (let offset = 1; offset < TOTAL_FRAMES; offset += 1) {
          const prev = targetIndex - offset;
          const next = targetIndex + offset;
          if (prev >= 0 && loadedRef.current[prev] && imagesRef.current[prev]?.complete) {
            img = imagesRef.current[prev];
            break;
          }
          if (next < TOTAL_FRAMES && loadedRef.current[next] && imagesRef.current[next]?.complete) {
            img = imagesRef.current[next];
            break;
          }
        }
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      if (!img || !img.complete) {
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, w, h);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const { dx, dy, drawW, drawH } = fitCover(
        img.naturalWidth,
        img.naturalHeight,
        w,
        h
      );

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, drawW, drawH);
      lastDrawnFrameRef.current = targetIndex;
    };

    // Schedule RAF draw only when frame index changes
    const scheduleDraw = (force = false) => {
      if (!force && currentFrameRef.current === lastDrawnFrameRef.current) return;
      if (drawQueuedRef.current) return;

      drawQueuedRef.current = true;
      requestAnimationFrame(() => {
        drawQueuedRef.current = false;
        drawFrame(currentFrameRef.current);
      });
    };

    // Resize handler with devicePixelRatio cap (max 1.5)
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    const debouncedResize = () => {
      if (resizeTimeoutId) window.clearTimeout(resizeTimeoutId);
      resizeTimeoutId = +setTimeout(resizeCanvas, 60);
    };

    // Calculate frame from scroll progress without React state setters
    const setFrameFromProgress = (progress: number, direction: 1 | -1 = 1) => {
      const nextIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      // Direct DOM update for scroll indicator to avoid React re-renders
      if (scrollIndicatorRef.current) {
        if (progress > 0.01) {
          scrollIndicatorRef.current.style.opacity = "0";
          scrollIndicatorRef.current.style.pointerEvents = "none";
        } else {
          scrollIndicatorRef.current.style.opacity = "1";
          scrollIndicatorRef.current.style.pointerEvents = "auto";
        }
      }

      if (nextIndex !== currentFrameRef.current) {
        currentFrameRef.current = nextIndex;
        lastDirectionRef.current = direction;
        scheduleDraw();
      }

      requestWindowLoad(nextIndex, direction);
    };

    // Eagerly load initial frames and start background worker
    const initSequence = async () => {
      await loadFrame(0);
      if (!isComponentMounted) return;

      setReady(true);
      drawFrame(0);

      // Phase 2: preload next small chunk
      const initialPromises: Promise<void>[] = [];
      for (let i = 1; i < INITIAL_PRELOAD_COUNT; i += 1) {
        initialPromises.push(loadFrame(i));
      }
      await Promise.all(initialPromises);

      // Phase 3: background idle preloader for remaining frames
      let backgroundIndex = INITIAL_PRELOAD_COUNT;
      const loadBackgroundChunks = () => {
        if (!isComponentMounted || backgroundIndex >= TOTAL_FRAMES) return;

        const endChunk = Math.min(backgroundIndex + 4, TOTAL_FRAMES);
        const chunkPromises: Promise<void>[] = [];
        for (let i = backgroundIndex; i < endChunk; i += 1) {
          chunkPromises.push(loadFrame(i));
        }

        backgroundIndex = endChunk;
        if ("requestIdleCallback" in window) {
          idlePreloadId = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
            void Promise.all(chunkPromises).then(loadBackgroundChunks);
          });
        } else {
          idlePreloadId = +setTimeout(() => {
            void Promise.all(chunkPromises).then(loadBackgroundChunks);
          }, 120);
        }
      };

      loadBackgroundChunks();
    };

    // GSAP ScrollTrigger timeline
    const context = gsap.context(() => {
      const scrollTriggerEnd = prefersReducedMotion ? "+=100%" : "+=400%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: scrollTriggerEnd,
          scrub: prefersReducedMotion ? 0.2 : true,
          pin: true,
          pinType: "fixed",
          anticipatePin: 1,
          onUpdate: (self) => {
            const dir = (self.direction || 1) as 1 | -1;
            setFrameFromProgress(self.progress, dir);
          },
        },
      });

      tl.to({}, { duration: 1, ease: "none" });
    }, heroRef);

    // Navigation dispatch listener (#about button)
    const handleHeroFrameNavigation = (event: Event) => {
      const frame = (event as CustomEvent<{ frame?: number }>).detail?.frame;
      if (typeof frame !== "number") return;
      const progress = Math.min(1, Math.max(0, frame / (TOTAL_FRAMES - 1)));

      const triggers = ScrollTrigger.getAll();
      const heroTrigger = triggers.find(
        (t) => t.trigger === heroRef.current
      );

      if (heroTrigger) {
        const targetScroll =
          heroTrigger.start + (heroTrigger.end - heroTrigger.start) * progress;
        window.scrollTo({
          top: targetScroll,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    };

    // Tab visibility handling
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleDraw(true);
      }
    };

    window.addEventListener(
      "hero:navigate-to-frame",
      handleHeroFrameNavigation
    );
    window.addEventListener("resize", debouncedResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resizeCanvas();
    void initSequence();

    return () => {
      isComponentMounted = false;
      window.removeEventListener(
        "hero:navigate-to-frame",
        handleHeroFrameNavigation
      );
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (idlePreloadId != null) {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idlePreloadId);
        } else {
          clearTimeout(idlePreloadId);
        }
      }
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);

      context.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[100dvh] w-full overflow-hidden bg-black text-[var(--fg)]"
      aria-label="Hero section"
    >
      {!ready && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{ backgroundImage: `url(${FRAME_PATH(1)})` }}
          aria-hidden="true"
        />
      )}

      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-0 h-full w-full object-cover pointer-events-none transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.86))]" />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/50" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 pointer-events-none">
        <div />
        <div />

        <div
          ref={scrollIndicatorRef}
          className="flex items-end justify-center pb-2 transition-opacity duration-500 pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-white/75">
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


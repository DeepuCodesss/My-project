"use client";

import * as React from "react";
import { createNoise2D } from "simplex-noise";

type Point = {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
};

type WavesProps = {
  className?: string;
  strokeColor?: string;
  backgroundColor?: string;
  pointerSize?: number;
};

export function Waves({ className = "", strokeColor = "#ffffff", backgroundColor = "#000000", pointerSize = 0.5 }: WavesProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const boundsRef = React.useRef<DOMRect | null>(null);
  const pathsRef = React.useRef<SVGPathElement[]>([]);
  const linesRef = React.useRef<Point[][]>([]);
  const rafRef = React.useRef<number | null>(null);
  const mouseRef = React.useRef({ x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, vs: 0, angle: 0, set: false });

  React.useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const noise = createNoise2D();
    const mouse = mouseRef.current;
    let visible = false;
    let running = false;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      boundsRef.current = bounds;
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      linesRef.current = [];
      pathsRef.current.forEach((path) => path.remove());
      pathsRef.current = [];

      const xGap = bounds.width < 600 ? 14 : 10;
      const yGap = bounds.width < 600 ? 14 : 10;
      const columns = Math.ceil((bounds.width + 180) / xGap);
      const rows = Math.ceil((bounds.height + 30) / yGap);
      const xStart = (bounds.width - xGap * columns) / 2;
      const yStart = (bounds.height - yGap * rows) / 2;

      for (let column = 0; column < columns; column += 1) {
        const points: Point[] = [];
        for (let row = 0; row < rows; row += 1) {
          points.push({ x: xStart + xGap * column, y: yStart + yGap * row, wave: { x: 0, y: 0 }, cursor: { x: 0, y: 0, vx: 0, vy: 0 } });
        }
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", strokeColor);
        path.setAttribute("stroke-width", "0.7");
        path.setAttribute("vector-effect", "non-scaling-stroke");
        svg.appendChild(path);
        pathsRef.current.push(path);
        linesRef.current.push(points);
      }
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const bounds = boundsRef.current;
      if (!bounds) return;
      mouse.x = clientX - bounds.left;
      mouse.y = clientY - bounds.top;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    };
    const onMouseMove = (event: MouseEvent) => { if (visible) updatePointer(event.clientX, event.clientY); };
    const onTouchMove = (event: TouchEvent) => { if (!visible) return; const touch = event.touches[0]; if (touch) updatePointer(touch.clientX, touch.clientY); };

    const tick = (time: number) => {
      if (!visible) {
        running = false;
        rafRef.current = null;
        return;
      }
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const distance = Math.hypot(dx, dy);
      mouse.vs += (distance - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.angle = Math.atan2(dy, dx);

      linesRef.current.forEach((points, lineIndex) => {
        points.forEach((point) => {
          const motion = noise((point.x + time * 0.008) * 0.0026, (point.y + time * 0.003) * 0.002) * 8;
          point.wave.x = Math.cos(motion) * 12;
          point.wave.y = Math.sin(motion) * 6;
          const distanceToPointer = Math.hypot(point.x - mouse.sx, point.y - mouse.sy);
          const radius = Math.max(175, mouse.vs);
          if (distanceToPointer < radius) {
            const strength = 1 - distanceToPointer / radius;
            point.cursor.vx += Math.cos(mouse.angle) * strength * radius * mouse.vs * 0.00035;
            point.cursor.vy += Math.sin(mouse.angle) * strength * radius * mouse.vs * 0.00035;
          }
          point.cursor.vx += -point.cursor.x * 0.01;
          point.cursor.vy += -point.cursor.y * 0.01;
          point.cursor.vx *= 0.95;
          point.cursor.vy *= 0.95;
          point.cursor.x = Math.max(-50, Math.min(50, point.cursor.x + point.cursor.vx));
          point.cursor.y = Math.max(-50, Math.min(50, point.cursor.y + point.cursor.vy));
        });
        const first = points[0];
        if (!first || !pathsRef.current[lineIndex]) return;
        let path = `M ${first.x + first.wave.x} ${first.y + first.wave.y}`;
        points.slice(1).forEach((point) => { path += ` L ${point.x + point.wave.x + point.cursor.x} ${point.y + point.wave.y + point.cursor.y}`; });
        pathsRef.current[lineIndex].setAttribute("d", path);
        pathsRef.current[lineIndex].setAttribute("opacity", "0.26");
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!visible || running) return;
      running = true;
      rafRef.current = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      running = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start(); else stop();
    }, { threshold: 0.01 });
    visibilityObserver.observe(container);
    return () => {
      stop();
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      pathsRef.current.forEach((path) => path.remove());
    };
  }, [strokeColor]);

  return <div ref={containerRef} className={`waves-component ${className}`} style={{ backgroundColor }} aria-hidden="true"><img className="waves-wallpaper" src="/wallpaper%20for%20deepos/wallpaper.jpeg" alt="" decoding="async" /><svg ref={svgRef} className="waves-svg" xmlns="http://www.w3.org/2000/svg" /><div className="pointer-dot" style={{ width: `${pointerSize}rem`, height: `${pointerSize}rem`, background: strokeColor }} /></div>;
}

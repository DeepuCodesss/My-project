"use client";

import { useEffect, useRef } from "react";
import "./CursorGrid.css";

type Props = {
  cellSize?: number;
  color?: string;
  radius?: number;
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
};

export default function CursorGrid({
  cellSize = 70, color = "#D946EF", radius = 140, holdTime = 400,
  fadeDuration = 800, lineWidth = 1.2, maxOpacity = 1,
  fillOpacity = 0, gridOpacity = 0, clickPulse = true, pulseSpeed = 600,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = ref.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0, height = 0, columns = 0, rows = 0, offsetX = 0, offsetY = 0;
    let alphas = new Float32Array(0), touched = new Float64Array(0);
    let frame = 0, running = false, last = 0;
    const pulses: Array<{ x: number; y: number; time: number }> = [];
    const hex = color.replace("#", "");
    const value = parseInt(hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex, 16);
    const rgb = [(value >> 16) & 255, (value >> 8) & 255, value & 255];

    const rebuild = () => {
      width = container.offsetWidth; height = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(width * dpr)); canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / cellSize) + 1; rows = Math.ceil(height / cellSize) + 1;
      offsetX = (width - columns * cellSize) / 2; offsetY = (height - rows * cellSize) / 2;
      alphas = new Float32Array(columns * rows); touched = new Float64Array(columns * rows);
    };
    const center = (index: number) => [offsetX + (index % columns) * cellSize + cellSize / 2, offsetY + Math.floor(index / columns) * cellSize + cellSize / 2];
    const energize = (x: number, y: number) => {
      const now = performance.now();
      const minX = Math.max(0, Math.floor((x - radius - offsetX) / cellSize));
      const maxX = Math.min(columns - 1, Math.floor((x + radius - offsetX) / cellSize));
      const minY = Math.max(0, Math.floor((y - radius - offsetY) / cellSize));
      const maxY = Math.min(rows - 1, Math.floor((y + radius - offsetY) / cellSize));
      for (let row = minY; row <= maxY; row++) for (let column = minX; column <= maxX; column++) {
        const index = row * columns + column; const [cx, cy] = center(index); const distance = Math.hypot(cx - x, cy - y);
        if (distance <= radius) { const level = (1 - distance / Math.max(radius, 1)) ** 2 * (3 - 2 * (1 - distance / Math.max(radius, 1))) * maxOpacity; alphas[index] = Math.max(alphas[index], level); touched[index] = now; }
      }
    };
    const draw = (now: number) => {
      const delta = Math.min(now - last, 50); last = now; ctx.clearRect(0, 0, width, height);
      if (gridOpacity > 0) { ctx.strokeStyle = `rgba(${rgb.join(",")},${gridOpacity})`; ctx.beginPath(); for (let x = 0; x <= columns; x++) { const px = Math.round(offsetX + x * cellSize) + .5; ctx.moveTo(px, 0); ctx.lineTo(px, height); } for (let y = 0; y <= rows; y++) { const py = Math.round(offsetY + y * cellSize) + .5; ctx.moveTo(0, py); ctx.lineTo(width, py); } ctx.stroke(); }
      for (let p = pulses.length - 1; p >= 0; p--) { const pulse = pulses[p]; const ring = (now - pulse.time) / 1000 * pulseSpeed; if (ring > Math.hypot(width, height)) { pulses.splice(p, 1); continue; } for (let i = 0; i < alphas.length; i++) { const [cx, cy] = center(i); if (Math.abs(Math.hypot(cx - pulse.x, cy - pulse.y) - ring) < cellSize / 2) { alphas[i] = maxOpacity; touched[i] = now; } } }
      let visible = pulses.length > 0;
      for (let i = 0; i < alphas.length; i++) { let alpha = alphas[i]; if (alpha <= 0) continue; if (now - touched[i] > holdTime) alphas[i] = alpha = Math.max(0, alpha - delta / Math.max(fadeDuration, 16)); if (alpha <= 0) continue; visible = true; const [cx, cy] = center(i); const half = cellSize / 2; const gradient = ctx.createRadialGradient(cx, cy, half * .1, cx, cy, cellSize); gradient.addColorStop(0, `rgba(${rgb.join(",")},${alpha})`); gradient.addColorStop(1, `rgba(${rgb.join(",")},0)`); ctx.strokeStyle = gradient; ctx.lineWidth = lineWidth; ctx.beginPath(); ctx.rect(cx - half + .5, cy - half + .5, cellSize - 1, cellSize - 1); if (fillOpacity > 0) { ctx.fillStyle = `rgba(${rgb.join(",")},${alpha * fillOpacity})`; ctx.fill(); } ctx.stroke(); }
      if (visible) frame = requestAnimationFrame(draw); else running = false;
    };
    const wake = () => { if (!running) { running = true; last = performance.now(); frame = requestAnimationFrame(draw); } };
    const point = (event: PointerEvent) => { const box = canvas.getBoundingClientRect(); return [event.clientX - box.left, event.clientY - box.top]; };
    const move = (event: PointerEvent) => { const [x, y] = point(event); energize(x, y); wake(); };
    const down = (event: PointerEvent) => { if (clickPulse) { const [x, y] = point(event); pulses.push({ x, y, time: performance.now() }); wake(); } };
    const observer = new ResizeObserver(() => { rebuild(); wake(); }); observer.observe(container); rebuild();
    container.addEventListener("pointermove", move); container.addEventListener("pointerdown", down);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); container.removeEventListener("pointermove", move); container.removeEventListener("pointerdown", down); };
  }, [cellSize, color, radius, holdTime, fadeDuration, lineWidth, maxOpacity, fillOpacity, gridOpacity, clickPulse, pulseSpeed]);

  return <div ref={ref} className="cursor-grid"><canvas ref={canvasRef} className="cursor-grid__canvas" /></div>;
}

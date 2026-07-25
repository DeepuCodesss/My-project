"use client";

import { useEffect, useRef, useState } from "react";
import "./OptionWheel.css";

type Props = { items: string[]; defaultSelected?: number; onChange?: (index: number, item: string) => void };

export default function OptionWheel({ items, defaultSelected = 0, onChange }: Props) {
  const [selected, setSelected] = useState(Math.min(defaultSelected, items.length - 1));
  const [dragging, setDragging] = useState(false);
  const start = useRef({ y: 0, index: 0 });
  const root = useRef<HTMLDivElement>(null);
  const select = (index: number) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    setSelected(next); onChange?.(next, items[next]);
  };
  useEffect(() => {
    const wheel = (event: WheelEvent) => { event.preventDefault(); select(selected + (event.deltaY > 0 ? 1 : -1)); };
    const element = root.current; element?.addEventListener("wheel", wheel, { passive: false });
    return () => element?.removeEventListener("wheel", wheel);
  }, [selected]);
  return <div ref={root} className={`option-wheel${dragging ? " option-wheel--dragging" : ""}`} tabIndex={0} role="listbox" aria-label="Build services"
    onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowRight") select(selected + 1); if (event.key === "ArrowUp" || event.key === "ArrowLeft") select(selected - 1); }}
    onPointerDown={(event) => { setDragging(true); start.current = { y: event.clientY, index: selected }; (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId); }}
    onPointerMove={(event) => { if (dragging) { const distance = event.clientY - start.current.y; if (Math.abs(distance) > 22) select(start.current.index - Math.round(distance / 52)); } }}
    onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)}>
    <div className="option-wheel__rail" />
    {items.map((item, index) => { const distance = index - selected; const absolute = Math.abs(distance); const y = distance * 52; const x = -Math.min(absolute * absolute * 2.5, 95); const opacity = Math.max(.07, 1 - absolute * .16); return <button key={`${item}-${index}`} type="button" className={`option-wheel__item${index === selected ? " option-wheel__item--selected" : ""}`} style={{ transform: `translate(${x}px, calc(${y}px - 50%)) rotate(${distance * 4}deg)`, opacity, filter: `blur(${Math.min(absolute * 1.2, 4)}px)` }} onClick={() => select(index)}>{item}</button>; })}
  </div>;
}

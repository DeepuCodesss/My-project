"use client";

import { useEffect, useRef, useState } from "react";
import "./OptionWheel.css";

type Props = {
  items: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
};

export default function OptionWheel({
  items,
  defaultSelected = 0,
  onChange,
}: Props) {
  const [selected, setSelected] = useState(
    Math.min(defaultSelected, items.length - 1)
  );
  const [dragging, setDragging] = useState(false);
  const start = useRef({ y: 0, index: 0 });
  const accumulatedDelta = useRef(0);
  const root = useRef<HTMLDivElement>(null);

  const select = (index: number) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    if (next !== selected) {
      setSelected(next);
      onChange?.(next, items[next]);
    }
  };

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const wheel = (event: WheelEvent) => {
      accumulatedDelta.current += event.deltaY;

      if (Math.abs(accumulatedDelta.current) >= 40) {
        const direction = accumulatedDelta.current > 0 ? 1 : -1;
        const nextIndex = selected + direction;

        if (nextIndex >= 0 && nextIndex < items.length) {
          event.preventDefault();
          select(nextIndex);
        }
        accumulatedDelta.current = 0;
      }
    };

    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [selected, items.length]);

  return (
    <div
      ref={root}
      className={`option-wheel${dragging ? " option-wheel--dragging" : ""}`}
      tabIndex={0}
      role="listbox"
      aria-label="Select build service"
      aria-activedescendant={`service-item-${selected}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          select(selected + 1);
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          select(selected - 1);
        }
      }}
      onPointerDown={(event) => {
        setDragging(true);
        start.current = { y: event.clientY, index: selected };
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (dragging) {
          const distance = event.clientY - start.current.y;
          if (Math.abs(distance) > 20) {
            select(start.current.index - Math.round(distance / 48));
          }
        }
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="option-wheel__rail" aria-hidden="true" />
      {items.map((item, index) => {
        const distance = index - selected;
        const absolute = Math.abs(distance);
        const y = distance * 52;
        const x = -Math.min(absolute * absolute * 2.5, 95);
        const opacity = Math.max(0.07, 1 - absolute * 0.16);

        return (
          <button
            key={`${item}-${index}`}
            id={`service-item-${index}`}
            type="button"
            role="option"
            aria-selected={index === selected}
            className={`option-wheel__item${
              index === selected ? " option-wheel__item--selected" : ""
            }`}
            style={{
              transform: `translate(${x}px, calc(${y}px - 50%)) rotate(${
                distance * 4
              }deg)`,
              opacity,
              filter: `blur(${Math.min(absolute * 1.2, 4)}px)`,
            }}
            onClick={() => select(index)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}


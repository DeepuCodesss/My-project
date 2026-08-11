"use client";

import { useEffect } from "react";

export function WebVitalsMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
        const log = (metric: { name: string; value: number; id: string }) => {
          const v =
            metric.name === "CLS"
              ? metric.value.toFixed(4)
              : `${Math.round(metric.value)}ms`;
          console.debug(`[Web Vital] ${metric.name}: ${v} (id: ${metric.id})`);
        };
        onCLS(log);
        onINP(log);
        onLCP(log);
        onFCP(log);
        onTTFB(log);
      }).catch(() => {
        // web-vitals package not installed — silently skip
      });
    }
  }, []);

  return null;
}


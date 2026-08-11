"use client";

export default function DeferredDecorations() {
  // These full-screen animated layers repaint over the entire document. Keep
  // the component as a stable hook for the page, but avoid the global paint
  // cost; each section has its own lightweight decoration.
  return null;
}

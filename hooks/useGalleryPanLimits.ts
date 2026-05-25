"use client";

import { type RefObject, useEffect, useState } from "react";

export type PanLimits = { x: number; y: number };

export function useGalleryPanLimits(
  viewportRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  const [limits, setLimits] = useState<PanLimits>({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) return;
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;

    const measure = () => {
      setLimits({
        x: Math.max(0, (canvas.scrollWidth - viewport.clientWidth) / 2),
        y: Math.max(0, (canvas.scrollHeight - viewport.clientHeight) / 2),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(canvas);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active, viewportRef, canvasRef]);

  return limits;
}

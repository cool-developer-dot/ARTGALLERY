"use client";

import { type RefObject, useEffect, useRef } from "react";
import type { SpatialDirection } from "@/lib/galleryArtworks";

const SWIPE_PX = 36;

export function useSpatialSwipe(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onSwipe: (dir: SpatialDirection) => void,
) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const onSwipeRef = useRef(onSwipe);

  useEffect(() => {
    onSwipeRef.current = onSwipe;
  }, [onSwipe]);

  useEffect(() => {
    const el = containerRef.current;
    if (!enabled || !el) return;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      start.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onEnd = (e: TouchEvent) => {
      if (!start.current || e.changedTouches.length !== 1) return;
      const dx = e.changedTouches[0].clientX - start.current.x;
      const dy = e.changedTouches[0].clientY - start.current.y;
      start.current = null;

      if (Math.abs(dx) < SWIPE_PX && Math.abs(dy) < SWIPE_PX) return;

      if (Math.abs(dx) >= Math.abs(dy)) {
        onSwipeRef.current(dx < 0 ? "right" : "left");
      } else {
        onSwipeRef.current(dy < 0 ? "up" : "down");
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [enabled, containerRef]);
}

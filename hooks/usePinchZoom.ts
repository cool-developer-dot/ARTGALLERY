"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

const MIN_ZOOM = 0.85;
const MAX_ZOOM = 1.45;

export function usePinchZoom(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
) {
  const [zoom, setZoom] = useState(1);
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);

  const getDistance = (touches: TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled || e.touches.length !== 2) return;
      pinchRef.current = { distance: getDistance(e.touches), zoom };
    },
    [enabled, zoom],
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled || e.touches.length !== 2 || !pinchRef.current) return;
      e.preventDefault();
      const distance = getDistance(e.touches);
      const scale = distance / pinchRef.current.distance;
      setZoom(
        Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchRef.current.zoom * scale)),
      );
    },
    [enabled],
  );

  const onTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!enabled || !el) return;

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [enabled, containerRef, onTouchStart, onTouchMove, onTouchEnd]);

  return { zoom, setZoom };
}

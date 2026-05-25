"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  clampZoom,
  GALLERY_ZOOM_DEFAULT,
} from "@/lib/galleryMotion";

export function usePinchZoom(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
) {
  const [zoom, setZoom] = useState(GALLERY_ZOOM_DEFAULT);
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
      setZoom(clampZoom(pinchRef.current.zoom * scale));
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
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [enabled, containerRef, onTouchStart, onTouchMove, onTouchEnd]);

  return { zoom, setZoom };
}

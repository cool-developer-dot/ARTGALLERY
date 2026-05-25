"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  clampZoom,
  GALLERY_ZOOM_DEFAULT,
} from "@/lib/galleryMotion";

/**
 * Desktop / large screens: trackpad pinch (Ctrl/Cmd + wheel) and
 * Alt + scroll wheel zoom over the gallery viewport.
 */
export function useWheelZoom(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
) {
  const [zoom, setZoom] = useState(GALLERY_ZOOM_DEFAULT);
  const zoomRef = useRef(GALLERY_ZOOM_DEFAULT);

  const applyZoom = useCallback((next: number) => {
    const z = clampZoom(next);
    zoomRef.current = z;
    setZoom(z);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!enabled || !el) return;

    const onWheel = (e: WheelEvent) => {
      const trackpadPinch = e.ctrlKey || e.metaKey;
      const altWheel = e.altKey;

      if (!trackpadPinch && !altWheel) return;

      e.preventDefault();
      e.stopPropagation();

      const sensitivity = trackpadPinch ? 0.0055 : 0.0025;
      const delta = -e.deltaY * sensitivity;
      applyZoom(zoomRef.current + delta);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [enabled, containerRef, applyZoom]);

  return { zoom, setZoom: applyZoom };
}

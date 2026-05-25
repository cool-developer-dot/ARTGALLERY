"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clampSpeed,
  GALLERY_H_SPEED_KEY,
  GALLERY_SPEED_DEFAULT,
  GALLERY_V_SPEED_KEY,
  readStoredSpeed,
} from "@/lib/galleryMotion";

export function useGallerySpeed() {
  const [horizontal, setHorizontal] = useState(GALLERY_SPEED_DEFAULT);
  const [vertical, setVertical] = useState(GALLERY_SPEED_DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setHorizontal(readStoredSpeed(GALLERY_H_SPEED_KEY));
    setVertical(readStoredSpeed(GALLERY_V_SPEED_KEY));
    setReady(true);
  }, []);

  const setHorizontalSpeed = useCallback((value: number) => {
    const v = clampSpeed(value);
    setHorizontal(v);
    localStorage.setItem(GALLERY_H_SPEED_KEY, String(v));
  }, []);

  const setVerticalSpeed = useCallback((value: number) => {
    const v = clampSpeed(value);
    setVertical(v);
    localStorage.setItem(GALLERY_V_SPEED_KEY, String(v));
  }, []);

  return {
    horizontal,
    vertical,
    setHorizontalSpeed,
    setVerticalSpeed,
    ready,
  };
}

"use client";

import { useCallback, useEffect, useState } from "react";

export function useAutoRotate(length: number, intervalMs = 3000) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % length) + length) % length);
    },
    [length],
  );

  useEffect(() => {
    if (length <= 1) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [length, intervalMs, index]);

  return { index, goTo };
}

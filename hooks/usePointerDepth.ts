"use client";

import { useEffect, useState } from "react";

export type PointerDepth = { x: number; y: number };

export function usePointerDepth(enabled: boolean) {
  const [pointer, setPointer] = useState<PointerDepth>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointer({ x, y });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  return pointer;
}

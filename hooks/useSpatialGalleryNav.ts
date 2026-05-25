"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Tilt } from "@/hooks/useDeviceTilt";
import {
  spatialGalleryGrid,
  type SpatialDirection,
} from "@/lib/galleryArtworks";

const COOLDOWN_MS = 520;
const CENTER_DEAD = 0.14;

type NavState = { row: 0 | 1 | 2; col: 0 | 1 | 2 };
const START: NavState = { row: 1, col: 1 };

export function useSpatialGalleryNav(
  horizontalSpeed: number,
  verticalSpeed: number,
  enabled: boolean,
) {
  const [position, setPosition] = useState<NavState>(START);
  const [direction, setDirection] = useState<SpatialDirection | null>(null);
  const positionRef = useRef(position);
  const lastMove = useRef(0);
  const armed = useRef(true);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const artwork = spatialGalleryGrid[position.row][position.col];

  const navigate = useCallback((dir: SpatialDirection, next: NavState) => {
    const now = Date.now();
    if (now - lastMove.current < COOLDOWN_MS) return;
    lastMove.current = now;
    armed.current = false;
    setDirection(dir);
    setPosition(next);
    window.setTimeout(() => setDirection(null), 400);
  }, []);

  const handleTilt = useCallback(
    (t: Tilt) => {
      if (!enabled) return;

      if (Math.abs(t.x) < CENTER_DEAD && Math.abs(t.y) < CENTER_DEAD) {
        armed.current = true;
      }
      if (!armed.current) return;

      const pos = positionRef.current;
      const thX = 0.42 / horizontalSpeed;
      const thY = 0.42 / verticalSpeed;

      if (t.x >= thX && pos.col < 2) {
        navigate("right", { row: pos.row, col: (pos.col + 1) as 0 | 1 | 2 });
        return;
      }
      if (t.x <= -thX && pos.col > 0) {
        navigate("left", { row: pos.row, col: (pos.col - 1) as 0 | 1 | 2 });
        return;
      }
      if (t.y >= thY && pos.row < 2) {
        navigate("down", { row: (pos.row + 1) as 0 | 1 | 2, col: pos.col });
        return;
      }
      if (t.y <= -thY && pos.row > 0) {
        navigate("up", { row: (pos.row - 1) as 0 | 1 | 2, col: pos.col });
      }
    },
    [enabled, horizontalSpeed, verticalSpeed, navigate],
  );

  const reset = useCallback(() => {
    setPosition(START);
    setDirection(null);
    positionRef.current = START;
    armed.current = true;
    lastMove.current = 0;
  }, []);

  return {
    artwork,
    position,
    direction,
    index: position.row * 3 + position.col + 1,
    handleTilt,
    reset,
  };
}

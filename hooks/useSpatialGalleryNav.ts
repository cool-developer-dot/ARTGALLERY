"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Tilt } from "@/hooks/useDeviceTilt";
import {
  spatialGalleryGrid,
  type SpatialDirection,
} from "@/lib/galleryArtworks";

type NavState = { row: 0 | 1 | 2; col: 0 | 1 | 2 };
const START: NavState = { row: 1, col: 1 };

const ACCUM_TRIGGER = 0.16;
const COOLDOWN_MIN_MS = 180;

function cooldownMs(hSpeed: number, vSpeed: number) {
  const speed = Math.max(hSpeed, vSpeed, 0.6);
  return Math.max(COOLDOWN_MIN_MS, 320 / speed);
}

export function useSpatialGalleryNav(
  horizontalSpeed: number,
  verticalSpeed: number,
  enabled: boolean,
  snapBaseline?: () => void,
) {
  const [position, setPosition] = useState<NavState>(START);
  const [direction, setDirection] = useState<SpatialDirection | null>(null);
  const [tiltPreview, setTiltPreview] = useState<Tilt>({ x: 0, y: 0 });
  const positionRef = useRef(position);
  const lastNav = useRef(0);
  const accum = useRef({ x: 0, y: 0 });
  const snapRef = useRef(snapBaseline);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    snapRef.current = snapBaseline;
  }, [snapBaseline]);

  const artwork = spatialGalleryGrid[position.row][position.col];

  const go = useCallback(
    (dir: SpatialDirection) => {
      const now = Date.now();
      if (now - lastNav.current < cooldownMs(horizontalSpeed, verticalSpeed)) {
        return false;
      }

      const pos = positionRef.current;
      let next: NavState | null = null;

      switch (dir) {
        case "right":
          if (pos.col < 2) next = { row: pos.row, col: (pos.col + 1) as 0 | 1 | 2 };
          break;
        case "left":
          if (pos.col > 0) next = { row: pos.row, col: (pos.col - 1) as 0 | 1 | 2 };
          break;
        case "down":
          if (pos.row < 2) next = { row: (pos.row + 1) as 0 | 1 | 2, col: pos.col };
          break;
        case "up":
          if (pos.row > 0) next = { row: (pos.row - 1) as 0 | 1 | 2, col: pos.col };
          break;
      }

      if (!next) return false;

      lastNav.current = now;
      accum.current = { x: 0, y: 0 };
      setDirection(dir);
      setPosition(next);
      snapRef.current?.();
      window.setTimeout(() => setDirection(null), 320);
      return true;
    },
    [horizontalSpeed, verticalSpeed],
  );

  const handleTilt = useCallback(
    (t: Tilt) => {
      setTiltPreview(t);
      if (!enabled) return;

      const now = Date.now();
      if (now - lastNav.current < cooldownMs(horizontalSpeed, verticalSpeed)) {
        return;
      }

      accum.current.x += t.x * 0.14 * horizontalSpeed;
      accum.current.y += t.y * 0.14 * verticalSpeed;

      const ax = accum.current.x;
      const ay = accum.current.y;
      const pos = positionRef.current;

      if (Math.abs(ax) >= Math.abs(ay)) {
        if (ax >= ACCUM_TRIGGER && pos.col < 2) {
          go("right");
        } else if (ax <= -ACCUM_TRIGGER && pos.col > 0) {
          go("left");
        }
      } else if (ay >= ACCUM_TRIGGER && pos.row < 2) {
        go("down");
      } else if (ay <= -ACCUM_TRIGGER && pos.row > 0) {
        go("up");
      }

      accum.current.x *= 0.88;
      accum.current.y *= 0.88;
    },
    [enabled, horizontalSpeed, verticalSpeed, go],
  );

  const reset = useCallback(() => {
    setPosition(START);
    setDirection(null);
    setTiltPreview({ x: 0, y: 0 });
    positionRef.current = START;
    lastNav.current = 0;
    accum.current = { x: 0, y: 0 };
  }, []);

  return {
    artwork,
    position,
    direction,
    tiltPreview,
    index: position.row * 3 + position.col + 1,
    handleTilt,
    go,
    reset,
  };
}

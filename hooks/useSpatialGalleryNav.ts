"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Tilt } from "@/hooks/useDeviceTilt";
import type { SpatialDirection } from "@/lib/galleryArtworks";
import {
  canSpatialMove,
  countSpatialWorks,
  findSpatialNeighbor,
  getSpatialWorkIndex,
  type SpatialGrid,
  type SpatialPosition,
} from "@/lib/gallerySpatial";

const ACCUM_TRIGGER = 0.16;
const COOLDOWN_MIN_MS = 180;

function cooldownMs(hSpeed: number, vSpeed: number) {
  const speed = Math.max(hSpeed, vSpeed, 0.6);
  return Math.max(COOLDOWN_MIN_MS, 320 / speed);
}

export function useSpatialGalleryNav(
  grid: SpatialGrid,
  start: SpatialPosition,
  horizontalSpeed: number,
  verticalSpeed: number,
  enabled: boolean,
  snapBaseline?: () => void,
) {
  const [position, setPosition] = useState<SpatialPosition>(start);
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

  useEffect(() => {
    setPosition(start);
    setDirection(null);
    setTiltPreview({ x: 0, y: 0 });
    positionRef.current = start;
    lastNav.current = 0;
    accum.current = { x: 0, y: 0 };
  }, [grid, start.row, start.col]);

  const artwork = grid[position.row]?.[position.col] ?? grid[0]?.[0]!;
  const totalWorks = countSpatialWorks(grid);
  const workIndex = getSpatialWorkIndex(grid, position.row, position.col);

  const go = useCallback(
    (dir: SpatialDirection) => {
      const now = Date.now();
      if (now - lastNav.current < cooldownMs(horizontalSpeed, verticalSpeed)) {
        return false;
      }

      const pos = positionRef.current;
      const next = findSpatialNeighbor(grid, pos.row, pos.col, dir);
      if (!next) return false;

      lastNav.current = now;
      accum.current = { x: 0, y: 0 };
      setDirection(dir);
      setPosition(next);
      snapRef.current?.();
      window.setTimeout(() => setDirection(null), 320);
      return true;
    },
    [grid, horizontalSpeed, verticalSpeed],
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
        if (ax >= ACCUM_TRIGGER && canSpatialMove(grid, pos.row, pos.col, "right")) {
          go("right");
        } else if (ax <= -ACCUM_TRIGGER && canSpatialMove(grid, pos.row, pos.col, "left")) {
          go("left");
        }
      } else if (ay >= ACCUM_TRIGGER && canSpatialMove(grid, pos.row, pos.col, "down")) {
        go("down");
      } else if (ay <= -ACCUM_TRIGGER && canSpatialMove(grid, pos.row, pos.col, "up")) {
        go("up");
      }

      accum.current.x *= 0.88;
      accum.current.y *= 0.88;
    },
    [enabled, grid, horizontalSpeed, verticalSpeed, go],
  );

  const reset = useCallback(() => {
    setPosition(start);
    setDirection(null);
    setTiltPreview({ x: 0, y: 0 });
    positionRef.current = start;
    lastNav.current = 0;
    accum.current = { x: 0, y: 0 };
  }, [start.row, start.col]);

  return {
    artwork,
    position,
    direction,
    tiltPreview,
    workIndex,
    totalWorks,
    canGoLeft: canSpatialMove(grid, position.row, position.col, "left"),
    canGoRight: canSpatialMove(grid, position.row, position.col, "right"),
    canGoUp: canSpatialMove(grid, position.row, position.col, "up"),
    canGoDown: canSpatialMove(grid, position.row, position.col, "down"),
    handleTilt,
    go,
    reset,
  };
}

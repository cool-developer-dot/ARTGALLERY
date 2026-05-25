"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Normalized tilt: -1 (left/up) to 1 (right/down) */
export type Tilt = { x: number; y: number };

const GAMMA_SENS = 0.045;
const BETA_SENS = 0.04;
const SMOOTH = 0.45;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function useDeviceTilt(
  enabled: boolean,
  onTilt?: (tilt: Tilt) => void,
) {
  const [supported, setSupported] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const onTiltRef = useRef(onTilt);
  const baseline = useRef<{ beta: number; gamma: number } | null>(null);
  const target = useRef<Tilt>({ x: 0, y: 0 });
  const smooth = useRef<Tilt>({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    onTiltRef.current = onTilt;
  }, [onTilt]);

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined") return false;
    const DOE = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    if (typeof DOE.requestPermission === "function") {
      try {
        const result = await DOE.requestPermission();
        const ok = result === "granted";
        setPermissionGranted(ok);
        if (ok) baseline.current = null;
        return ok;
      } catch {
        return false;
      }
    }
    setPermissionGranted(true);
    baseline.current = null;
    return true;
  }, []);

  const calibrate = useCallback(() => {
    baseline.current = null;
    target.current = { x: 0, y: 0 };
    smooth.current = { x: 0, y: 0 };
    onTiltRef.current?.({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    setSupported(
      "DeviceOrientationEvent" in window || "ondeviceorientation" in window,
    );

    const tick = () => {
      const sx =
        smooth.current.x + (target.current.x - smooth.current.x) * SMOOTH;
      const sy =
        smooth.current.y + (target.current.y - smooth.current.y) * SMOOTH;
      smooth.current = { x: sx, y: sy };
      onTiltRef.current?.(smooth.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const handler = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      if (!baseline.current) {
        baseline.current = { beta: e.beta, gamma: e.gamma };
      }
      target.current = {
        x: clamp(
          (e.gamma - baseline.current.gamma) * GAMMA_SENS,
          -1,
          1,
        ),
        y: clamp((e.beta - baseline.current.beta) * BETA_SENS, -1, 1),
      };
    };

    window.addEventListener("deviceorientation", handler, { passive: true });
    return () => {
      window.removeEventListener("deviceorientation", handler);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [enabled, permissionGranted]);

  return { supported, permissionGranted, requestPermission, calibrate };
}

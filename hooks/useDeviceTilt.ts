"use client";

import { useCallback, useEffect, useState } from "react";

export type Tilt = { x: number; y: number };

const MAX_TILT = 12;

function normalizeTilt(beta: number | null, gamma: number | null): Tilt {
  if (beta == null || gamma == null) return { x: 0, y: 0 };
  const x = Math.max(-MAX_TILT, Math.min(MAX_TILT, gamma * 0.35));
  const y = Math.max(-MAX_TILT, Math.min(MAX_TILT, (beta - 45) * 0.25));
  return { x, y };
}

export function useDeviceTilt(enabled: boolean) {
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });
  const [supported, setSupported] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

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
        return ok;
      } catch {
        return false;
      }
    }
    setPermissionGranted(true);
    return true;
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const hasOrientation =
      "DeviceOrientationEvent" in window ||
      "ondeviceorientation" in window;
    setSupported(hasOrientation);

    const handler = (e: DeviceOrientationEvent) => {
      setTilt(normalizeTilt(e.beta, e.gamma));
    };

    window.addEventListener("deviceorientation", handler, { passive: true });
    return () => window.removeEventListener("deviceorientation", handler);
  }, [enabled, permissionGranted]);

  return { tilt, supported, permissionGranted, requestPermission };
}

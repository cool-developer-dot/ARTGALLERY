"use client";

import { useEffect, useState } from "react";

export interface ArtworkCapabilities {
  /** Zoom + spotlight — desktop pointer */
  premium: boolean;
  /** 3D tilt + lift — wide desktop only (prevents laptop overflow) */
  premiumTilt: boolean;
  /** Reduced zoom only — touch / narrow viewports */
  reduced: boolean;
}

export function useArtworkCapabilities(): ArtworkCapabilities {
  const [caps, setCaps] = useState<ArtworkCapabilities>({
    premium: false,
    premiumTilt: false,
    reduced: true,
  });

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover)");
    const tabletMq = window.matchMedia("(min-width: 768px)");
    const wideMq = window.matchMedia("(min-width: 1280px)");
    const reducedMotionMq = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const update = () => {
      const hasHover = hoverMq.matches;
      const isTabletUp = tabletMq.matches;
      const isWide = wideMq.matches;
      const reduceMotion = reducedMotionMq.matches;
      setCaps({
        premium: hasHover && isTabletUp && !reduceMotion,
        premiumTilt: hasHover && isWide && !reduceMotion,
        reduced: !hasHover || !isTabletUp || reduceMotion,
      });
    };

    update();
    hoverMq.addEventListener("change", update);
    tabletMq.addEventListener("change", update);
    wideMq.addEventListener("change", update);
    reducedMotionMq.addEventListener("change", update);
    return () => {
      hoverMq.removeEventListener("change", update);
      tabletMq.removeEventListener("change", update);
      wideMq.removeEventListener("change", update);
      reducedMotionMq.removeEventListener("change", update);
    };
  }, []);

  return caps;
}

"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type MotionValue } from "framer-motion";

export type GalleryTiltContextValue = {
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
  horizontalSpeed: number;
  verticalSpeed: number;
};

export const GalleryTiltContext = createContext<GalleryTiltContextValue | null>(
  null,
);

export function GalleryTiltProvider({
  children,
  tiltX,
  tiltY,
  horizontalSpeed,
  verticalSpeed,
}: GalleryTiltContextValue & { children: ReactNode }) {
  return (
    <GalleryTiltContext.Provider
      value={{ tiltX, tiltY, horizontalSpeed, verticalSpeed }}
    >
      {children}
    </GalleryTiltContext.Provider>
  );
}

export function useGalleryTiltMotion() {
  return useContext(GalleryTiltContext);
}

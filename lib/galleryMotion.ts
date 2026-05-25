import type { GalleryArtwork } from "./galleryArtworks";

export const GALLERY_ZOOM_MIN = 0.75;
export const GALLERY_ZOOM_MAX = 1.65;
export const GALLERY_ZOOM_DEFAULT = 1;

export function clampZoom(value: number) {
  return Math.min(
    GALLERY_ZOOM_MAX,
    Math.max(GALLERY_ZOOM_MIN, Math.round(value * 1000) / 1000),
  );
}

export const GALLERY_SPEED_MIN = 0.25;
export const GALLERY_SPEED_MAX = 2.5;
export const GALLERY_SPEED_DEFAULT = 1;
export const GALLERY_SPEED_STEP = 0.05;

export const GALLERY_H_SPEED_KEY = "atelier-gallery-h-speed";
export const GALLERY_V_SPEED_KEY = "atelier-gallery-v-speed";

/** Max px drift per axis at 1× speed, full tilt */
export const GALLERY_FLOAT_RANGE_X = 36;
export const GALLERY_FLOAT_RANGE_Y = 32;

export function clampSpeed(value: number) {
  return Math.min(
    GALLERY_SPEED_MAX,
    Math.max(GALLERY_SPEED_MIN, Math.round(value * 20) / 20),
  );
}

export function readStoredSpeed(key: string): number {
  if (typeof window === "undefined") return GALLERY_SPEED_DEFAULT;
  const raw = localStorage.getItem(key);
  if (raw == null) return GALLERY_SPEED_DEFAULT;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? clampSpeed(n) : GALLERY_SPEED_DEFAULT;
}

/** Per-piece depth & grid bias so nine frames move independently */
export function getArtworkFloatFactors(art: GalleryArtwork) {
  const depth = 0.38 + art.layout.z * 0.72;
  const colBias = (art.layout.col - 1) * 5;
  const rowBias = (art.layout.row - 1) * 4;
  const zLift = art.layout.z * 40;
  return { depth, colBias, rowBias, zLift };
}

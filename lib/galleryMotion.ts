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

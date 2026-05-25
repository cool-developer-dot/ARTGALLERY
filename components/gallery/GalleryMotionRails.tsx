"use client";

import {
  GALLERY_SPEED_MAX,
  GALLERY_SPEED_MIN,
  GALLERY_SPEED_STEP,
} from "@/lib/galleryMotion";

interface GalleryMotionRailsProps {
  horizontal: number;
  vertical: number;
  onHorizontalChange: (value: number) => void;
  onVerticalChange: (value: number) => void;
}

function formatSpeed(n: number) {
  return `${n.toFixed(1)}×`;
}

export function GalleryMotionRails({
  horizontal,
  vertical,
  onHorizontalChange,
  onVerticalChange,
}: GalleryMotionRailsProps) {
  return (
    <>
      {/* Vertical rail — up / down speed */}
      <aside
        className="gallery-motion-rail gallery-motion-rail--vertical fixed left-0 z-[45] flex flex-col items-center border-r border-white/[0.08] bg-bg-deep/82 backdrop-blur-xl lg:hidden"
        aria-label="Vertical pan speed"
      >
        <div className="flex w-full shrink-0 items-center justify-center border-b border-white/[0.06] py-2.5">
          <span className="type-caption text-[0.5rem] uppercase tracking-[0.22em] text-stone-muted [writing-mode:vertical-rl] rotate-180">
            Up · Down
          </span>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center px-1.5 py-4">
          <input
            type="range"
            className="gallery-speed-slider gallery-speed-slider--vertical"
            min={GALLERY_SPEED_MIN}
            max={GALLERY_SPEED_MAX}
            step={GALLERY_SPEED_STEP}
            value={vertical}
            onChange={(e) => onVerticalChange(Number(e.target.value))}
            aria-label="Up and down movement speed"
            aria-valuetext={formatSpeed(vertical)}
          />
        </div>

        <div className="flex w-full shrink-0 items-center justify-center border-t border-white/[0.06] py-2.5">
          <span className="font-mono text-[0.65rem] tabular-nums text-ivory/90">
            {formatSpeed(vertical)}
          </span>
        </div>
      </aside>

      {/* Horizontal rail — left / right speed */}
      <aside
        className="gallery-motion-rail gallery-motion-rail--horizontal fixed right-0 bottom-0 z-[45] flex items-center gap-3 border-t border-white/[0.08] bg-bg-deep/82 px-3 backdrop-blur-xl sm:gap-4 sm:px-4 lg:hidden"
        aria-label="Horizontal pan speed"
      >
        <div className="hidden shrink-0 sm:block">
          <span className="type-caption block text-[0.5rem] uppercase tracking-[0.18em] text-stone-muted">
            Left · Right
          </span>
          <span className="font-mono text-[0.68rem] tabular-nums text-ivory/90">
            {formatSpeed(horizontal)}
          </span>
        </div>

        <span className="type-caption shrink-0 text-[0.55rem] uppercase tracking-[0.14em] text-stone-muted sm:hidden">
          ↔
        </span>

        <input
          type="range"
          className="gallery-speed-slider gallery-speed-slider--horizontal min-w-0 flex-1"
          min={GALLERY_SPEED_MIN}
          max={GALLERY_SPEED_MAX}
          step={GALLERY_SPEED_STEP}
          value={horizontal}
          onChange={(e) => onHorizontalChange(Number(e.target.value))}
          aria-label="Left and right movement speed"
          aria-valuetext={formatSpeed(horizontal)}
        />

        <span className="shrink-0 font-mono text-[0.65rem] tabular-nums text-ivory/90 sm:hidden">
          {formatSpeed(horizontal)}
        </span>
      </aside>
    </>
  );
}

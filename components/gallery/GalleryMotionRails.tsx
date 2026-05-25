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
      {/* Vertical sidebar — up / down movement speed */}
      <aside
        className="gallery-motion-rail gallery-motion-rail--vertical fixed left-0 z-[45] flex w-11 flex-col items-center border-r border-white/[0.06] bg-bg-deep/75 backdrop-blur-xl sm:w-12 lg:hidden"
        style={{
          top: "calc(4.25rem + env(safe-area-inset-top))",
          bottom: "calc(4.75rem + env(safe-area-inset-bottom))",
        }}
        aria-label="Vertical pan speed"
      >
        <span className="type-caption mt-3 shrink-0 text-[0.55rem] uppercase tracking-[0.2em] text-stone-muted [writing-mode:vertical-rl] rotate-180">
          Up · Down
        </span>

        <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center px-1">
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

        <span className="type-caption mb-3 shrink-0 font-mono text-[0.65rem] tabular-nums text-ivory/90">
          {formatSpeed(vertical)}
        </span>
      </aside>

      {/* Horizontal sidebar — left / right movement speed */}
      <aside
        className="gallery-motion-rail gallery-motion-rail--horizontal fixed right-0 bottom-0 left-0 z-[45] flex h-14 items-center gap-3 border-t border-white/[0.06] bg-bg-deep/75 px-3 backdrop-blur-xl sm:h-[3.75rem] sm:gap-4 sm:pl-14 lg:hidden"
        style={{
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(0.75rem, calc(2.75rem + env(safe-area-inset-left)))",
        }}
        aria-label="Horizontal pan speed"
      >
        <div className="hidden min-w-[3.5rem] shrink-0 sm:block">
          <span className="type-caption block text-[0.55rem] uppercase tracking-[0.18em] text-stone-muted">
            Left · Right
          </span>
          <span className="font-mono text-[0.7rem] tabular-nums text-ivory/90">
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

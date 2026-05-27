"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { GallerySpatialMap } from "@/components/gallery/GallerySpatialMap";
import type { GalleryArtwork, SpatialDirection } from "@/lib/galleryArtworks";
import type { SpatialGrid } from "@/lib/gallerySpatial";
import type { Tilt } from "@/hooks/useDeviceTilt";
import { useSpatialSwipe } from "@/hooks/useSpatialSwipe";
import { artworkZoomEase, galleryPanSpring } from "@/lib/motion";

interface GallerySpatialViewerProps {
  artwork: GalleryArtwork;
  grid: SpatialGrid;
  direction: SpatialDirection | null;
  row: number;
  col: number;
  workIndex: number;
  totalWorks: number;
  roomTitle: string;
  tilt: Tilt;
  canGoLeft: boolean;
  canGoRight: boolean;
  canGoUp: boolean;
  canGoDown: boolean;
  onOpen: () => void;
  onNavigate: (dir: SpatialDirection) => void;
}

const slide = 40;

function slideOffset(dir: SpatialDirection, phase: "enter" | "exit") {
  const enter = phase === "enter";
  switch (dir) {
    case "left":
      return { x: enter ? -slide : slide, y: 0 };
    case "right":
      return { x: enter ? slide : -slide, y: 0 };
    case "up":
      return { x: 0, y: enter ? -slide : slide };
    case "down":
      return { x: 0, y: enter ? slide : -slide };
  }
}

const frameVariants = {
  center: { opacity: 1, scale: 1, x: 0, y: 0 },
  enterLeft: { opacity: 0, scale: 0.97, ...slideOffset("left", "enter") },
  enterRight: { opacity: 0, scale: 0.97, ...slideOffset("right", "enter") },
  enterUp: { opacity: 0, scale: 0.97, ...slideOffset("up", "enter") },
  enterDown: { opacity: 0, scale: 0.97, ...slideOffset("down", "enter") },
  exitLeft: { opacity: 0, scale: 0.98, ...slideOffset("left", "exit") },
  exitRight: { opacity: 0, scale: 0.98, ...slideOffset("right", "exit") },
  exitUp: { opacity: 0, scale: 0.98, ...slideOffset("up", "exit") },
  exitDown: { opacity: 0, scale: 0.98, ...slideOffset("down", "exit") },
};

function enterVariant(dir: SpatialDirection | null) {
  if (!dir) return "center";
  return `enter${dir.charAt(0).toUpperCase()}${dir.slice(1)}` as keyof typeof frameVariants;
}

function exitVariant(dir: SpatialDirection | null) {
  if (!dir) return "center";
  return `exit${dir.charAt(0).toUpperCase()}${dir.slice(1)}` as keyof typeof frameVariants;
}

function NavButton({
  label,
  onClick,
  disabled,
  className,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  className: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`gallery-spatial-nav ${className} ${disabled ? "is-disabled" : ""}`}
    >
      <span aria-hidden>{label}</span>
    </button>
  );
}

export function GallerySpatialViewer({
  artwork,
  grid,
  direction,
  row,
  col,
  workIndex,
  totalWorks,
  roomTitle,
  tilt,
  canGoLeft,
  canGoRight,
  canGoUp,
  canGoDown,
  onOpen,
  onNavigate,
}: GallerySpatialViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useSpatialSwipe(true, containerRef, onNavigate);

  const previewX = useSpring(0, galleryPanSpring);
  const previewY = useSpring(0, galleryPanSpring);
  previewX.set(tilt.x * 14);
  previewY.set(tilt.y * 12);

  return (
    <div ref={containerRef} className="gallery-spatial-viewer">
      <GallerySpatialMap grid={grid} activeRow={row} activeCol={col} />

      <p className="gallery-spatial-viewer__index type-caption">
        <span className="text-stone-muted">{roomTitle}</span>
        <span className="mx-2 text-stone-muted/50" aria-hidden>
          ·
        </span>
        <span className="font-mono tabular-nums text-ivory">{workIndex}</span>
        <span className="text-stone-muted"> / {totalWorks}</span>
      </p>

      <div className="gallery-spatial-viewer__stage">
        <NavButton
          label="Previous work"
          className="gallery-spatial-nav--left"
          disabled={!canGoLeft}
          onClick={() => onNavigate("left")}
        />
        <NavButton
          label="Next work"
          className="gallery-spatial-nav--right"
          disabled={!canGoRight}
          onClick={() => onNavigate("right")}
        />
        <NavButton
          label="Work above"
          className="gallery-spatial-nav--up"
          disabled={!canGoUp}
          onClick={() => onNavigate("up")}
        />
        <NavButton
          label="Work below"
          className="gallery-spatial-nav--down"
          disabled={!canGoDown}
          onClick={() => onNavigate("down")}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={artwork.id}
            className="gallery-spatial-viewer__frame-wrap w-full"
            style={{ x: previewX, y: previewY }}
          >
            <motion.button
              type="button"
              onClick={onOpen}
              className="gallery-spatial-viewer__frame group w-full text-left"
              variants={frameVariants}
              initial={enterVariant(direction)}
              animate="center"
              exit={exitVariant(direction)}
              transition={{ duration: 0.34, ease: artworkZoomEase }}
            >
              <div className="gallery-spatial-viewer__image relative aspect-[3/4] w-full overflow-hidden border border-white/[0.1] sm:aspect-[4/5]">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-active:scale-[1.02]"
                  sizes="(max-width: 380px) 85vw, (max-width: 768px) 72vw, 420px"
                  quality={82}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-deep/92 via-bg-deep/15 to-bg-deep/25" />
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={artwork.id}
          className="gallery-spatial-viewer__meta"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: artworkZoomEase }}
        >
          <h2 className="gallery-spatial-viewer__title font-display text-ivory">
            {artwork.title}
          </h2>
          <p className="gallery-spatial-viewer__artist mt-1 text-stone-secondary">
            {artwork.artist}
            <span className="text-stone-muted"> · {artwork.year}</span>
          </p>
          <p className="gallery-spatial-viewer__medium mt-2 text-stone-muted">
            {artwork.medium}
          </p>
          <p className="gallery-spatial-viewer__hint mt-3 text-stone-body">
            Swipe or tilt left, right, up, down · Tap for details
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

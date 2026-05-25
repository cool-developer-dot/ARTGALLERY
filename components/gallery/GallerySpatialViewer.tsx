"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { GallerySpatialMap } from "@/components/gallery/GallerySpatialMap";
import type { GalleryArtwork, SpatialDirection } from "@/lib/galleryArtworks";
import { getSpatialIndex } from "@/lib/galleryArtworks";
import { artworkZoomEase } from "@/lib/motion";

interface GallerySpatialViewerProps {
  artwork: GalleryArtwork;
  direction: SpatialDirection | null;
  row: number;
  col: number;
  onOpen: () => void;
}

const slide = 56;

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
  enterLeft: { opacity: 0, scale: 0.96, ...slideOffset("left", "enter") },
  enterRight: { opacity: 0, scale: 0.96, ...slideOffset("right", "enter") },
  enterUp: { opacity: 0, scale: 0.96, ...slideOffset("up", "enter") },
  enterDown: { opacity: 0, scale: 0.96, ...slideOffset("down", "enter") },
  exitLeft: { opacity: 0, scale: 0.97, ...slideOffset("left", "exit") },
  exitRight: { opacity: 0, scale: 0.97, ...slideOffset("right", "exit") },
  exitUp: { opacity: 0, scale: 0.97, ...slideOffset("up", "exit") },
  exitDown: { opacity: 0, scale: 0.97, ...slideOffset("down", "exit") },
};

function enterVariant(dir: SpatialDirection | null) {
  if (!dir) return "center";
  return `enter${dir.charAt(0).toUpperCase()}${dir.slice(1)}` as keyof typeof frameVariants;
}

function exitVariant(dir: SpatialDirection | null) {
  if (!dir) return "center";
  return `exit${dir.charAt(0).toUpperCase()}${dir.slice(1)}` as keyof typeof frameVariants;
}

export function GallerySpatialViewer({
  artwork,
  direction,
  row,
  col,
  onOpen,
}: GallerySpatialViewerProps) {
  const index = getSpatialIndex(row, col);

  return (
    <div className="gallery-spatial-viewer">
      <GallerySpatialMap activeRow={row} activeCol={col} />

      <p className="gallery-spatial-viewer__index type-caption">
        {index}
        <span className="text-stone-muted"> / 9</span>
      </p>

      <div className="gallery-spatial-viewer__stage">
        <AnimatePresence mode="wait">
          <motion.button
            key={artwork.id}
            type="button"
            onClick={onOpen}
            className="gallery-spatial-viewer__frame group w-full text-left"
            variants={frameVariants}
            initial={enterVariant(direction)}
            animate="center"
            exit={exitVariant(direction)}
            transition={{ duration: 0.55, ease: artworkZoomEase }}
          >
            <div className="gallery-spatial-viewer__image relative aspect-[3/4] overflow-hidden border border-white/[0.1]">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-active:scale-[1.02]"
                sizes="(max-width: 1024px) 78vw, 400px"
                quality={82}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-bg-deep/20" />
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={artwork.id}
          className="gallery-spatial-viewer__meta text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: artworkZoomEase }}
        >
          <h2 className="font-display text-xl text-ivory sm:text-2xl">
            {artwork.title}
          </h2>
          <p className="mt-1 text-sm text-stone-secondary">
            {artwork.artist} · {artwork.year}
          </p>
          <p className="mt-2 text-xs text-stone-muted">{artwork.medium}</p>
          <p className="mt-4 text-xs text-stone-body">Tap work for details</p>
        </motion.div>
      </AnimatePresence>

      <div className="gallery-spatial-viewer__hints pointer-events-none" aria-hidden>
        <span className="hint hint--up">↑</span>
        <span className="hint hint--down">↓</span>
        <span className="hint hint--left">←</span>
        <span className="hint hint--right">→</span>
      </div>
    </div>
  );
}

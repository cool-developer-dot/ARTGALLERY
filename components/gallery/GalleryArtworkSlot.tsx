"use client";

import { motion } from "framer-motion";
import { GalleryArtworkCard } from "@/components/gallery/GalleryArtworkCard";
import type { GalleryArtwork } from "@/lib/galleryArtworks";

interface GalleryArtworkSlotProps {
  art: GalleryArtwork;
  index: number;
  offsetX: number;
  offsetY: number;
  onSelect: () => void;
}

export function GalleryArtworkSlot({
  art,
  index,
  offsetX,
  offsetY,
  onSelect,
}: GalleryArtworkSlotProps) {
  const factor = 1 + art.layout.z * 0.5;
  const px = offsetX * factor * 0.8;
  const py = offsetY * factor * 0.8;
  const translateZ = art.layout.z * 80;

  return (
    <motion.div
      className="w-full max-w-[340px] mx-auto will-change-transform"
      style={{
        transform: `translate3d(${px}px, ${py}px, ${translateZ}px) rotate(${art.layout.rotate ?? 0}deg)`,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.1 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <GalleryArtworkCard src={art.image} alt={art.title} onSelect={onSelect} />
    </motion.div>
  );
}

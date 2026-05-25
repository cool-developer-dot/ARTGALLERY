"use client";

import { motion } from "framer-motion";
import { GalleryArtworkCard } from "@/components/gallery/GalleryArtworkCard";
import type { GalleryArtwork } from "@/lib/galleryArtworks";

interface GalleryArtworkSlotProps {
  art: GalleryArtwork;
  index: number;
  onSelect: () => void;
  disableCardTilt?: boolean;
}

export function GalleryArtworkSlot({
  art,
  index,
  onSelect,
  disableCardTilt,
}: GalleryArtworkSlotProps) {
  const translateZ = art.layout.z * 48;

  return (
    <motion.div
      className="w-full max-w-[340px] mx-auto will-change-transform"
      style={{
        transform: `translateZ(${translateZ}px) rotate(${art.layout.rotate ?? 0}deg)`,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <GalleryArtworkCard
        src={art.image}
        alt={art.title}
        onSelect={onSelect}
        disableTilt={disableCardTilt}
      />
    </motion.div>
  );
}

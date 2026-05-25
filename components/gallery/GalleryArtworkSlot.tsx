"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GalleryArtworkCard } from "@/components/gallery/GalleryArtworkCard";
import { useGalleryTiltMotion } from "@/components/gallery/GalleryTiltContext";
import type { GalleryArtwork } from "@/lib/galleryArtworks";
import {
  GALLERY_FLOAT_RANGE_X,
  GALLERY_FLOAT_RANGE_Y,
  getArtworkFloatFactors,
} from "@/lib/galleryMotion";
import { galleryPanSpring } from "@/lib/motion";

interface GalleryArtworkSlotProps {
  art: GalleryArtwork;
  index: number;
  onSelect: () => void;
  disableCardTilt?: boolean;
  compact?: boolean;
  /** Independent tilt drift (mobile room grid) */
  floatIndependently?: boolean;
}

export function GalleryArtworkSlot({
  art,
  index,
  onSelect,
  disableCardTilt,
  compact = false,
  floatIndependently = false,
}: GalleryArtworkSlotProps) {
  const tiltMotion = useGalleryTiltMotion();
  const { depth, colBias, rowBias, zLift } = getArtworkFloatFactors(art);
  const zero = useMotionValue(0);
  const srcX = tiltMotion?.tiltX ?? zero;
  const srcY = tiltMotion?.tiltY ?? zero;
  const hSpeed = tiltMotion?.horizontalSpeed ?? 1;
  const vSpeed = tiltMotion?.verticalSpeed ?? 1;

  const floatX = useTransform(srcX, (v) =>
    floatIndependently && tiltMotion
      ? v * GALLERY_FLOAT_RANGE_X * depth * hSpeed + colBias
      : 0,
  );

  const floatY = useTransform(srcY, (v) =>
    floatIndependently && tiltMotion
      ? v * GALLERY_FLOAT_RANGE_Y * depth * vSpeed + rowBias
      : 0,
  );

  const springX = useSpring(floatX, galleryPanSpring);
  const springY = useSpring(floatY, galleryPanSpring);
  const translateZ = floatIndependently ? zLift : art.layout.z * (compact ? 32 : 48);

  return (
    <motion.div
      className={
        compact
          ? "gallery-room__frame w-full will-change-transform"
          : "w-full max-w-[340px] mx-auto will-change-transform"
      }
      style={{
        x: floatIndependently ? springX : 0,
        y: floatIndependently ? springY : 0,
        rotate: art.layout.rotate ?? 0,
        zIndex: Math.round(art.layout.z * 20) + 5,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <motion.div
        style={{
          transform: `translateZ(${translateZ}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        <GalleryArtworkCard
          src={art.image}
          alt={art.title}
          onSelect={onSelect}
          disableTilt={disableCardTilt}
          compact={compact}
        />
      </motion.div>
    </motion.div>
  );
}

"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { type MouseEvent, useCallback, useRef, useState } from "react";
import { useArtworkCapabilities } from "@/hooks/useArtworkCapabilities";
import { artworkSpring, artworkZoomEase } from "@/lib/motion";

const MAX_TILT = 6;
const LIFT = 8;

interface GalleryArtworkCardProps {
  src: string;
  alt: string;
  onSelect: () => void;
  disableTilt?: boolean;
}

export function GalleryArtworkCard({
  src,
  alt,
  onSelect,
  disableTilt = false,
}: GalleryArtworkCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { premium, premiumTilt: canTilt } = useArtworkCapabilities();
  const premiumTilt = !disableTilt && canTilt;
  const [hovered, setHovered] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);

  const rotateX = useSpring(0, artworkSpring);
  const rotateY = useSpring(0, artworkSpring);
  const lift = useSpring(0, artworkSpring);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(30);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 55%)`;

  const handleEnter = () => {
    setHovered(true);
    setSweepKey((k) => k + 1);
    if (premiumTilt) lift.set(-LIFT);
  };

  const handleLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    glareX.set(50);
    glareY.set(30);
  };

  const handleMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!premiumTilt || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateY.set((px - 0.5) * 2 * MAX_TILT);
      rotateX.set(-(py - 0.5) * 2 * MAX_TILT);
      glareX.set(px * 100);
      glareY.set(py * 100);
    },
    [premiumTilt, rotateX, rotateY, glareX, glareY],
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onSelect}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      className="group relative block w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory/50"
      style={{
        rotateX: premiumTilt ? rotateX : 0,
        rotateY: premiumTilt ? rotateY : 0,
        y: premiumTilt ? lift : 0,
        transformStyle: premiumTilt ? "preserve-3d" : "flat",
        boxShadow: hovered
          ? "0 28px 56px rgba(0,0,0,0.55), 0 12px 24px rgba(0,0,0,0.35)"
          : "0 16px 40px rgba(0,0,0,0.4)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.08] transition-colors duration-700 group-hover:border-white/20">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered && premium ? 1.08 : 1 }}
          transition={{ duration: 1.35, ease: artworkZoomEase }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 30vw, 280px"
            quality={72}
            draggable={false}
          />
        </motion.div>

        {hovered && (
          <motion.div
            key={sweepKey}
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(105deg, transparent, rgba(255,255,255,0.1) 50%, transparent)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "320%" }}
            transition={{ duration: 1.5, ease: artworkZoomEase }}
          />
        )}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-60" />
          <motion.div
            className="absolute inset-0"
            style={{ background: glareBg, opacity: hovered ? 0.85 : 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-transparent" />
        </div>
      </div>
    </motion.button>
  );
}

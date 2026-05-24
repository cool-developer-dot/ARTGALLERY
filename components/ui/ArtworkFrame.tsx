"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import {
  type MouseEvent,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { useArtworkCapabilities } from "@/hooks/useArtworkCapabilities";
import { artworkSpring, artworkZoomEase } from "@/lib/motion";

const MAX_TILT = 7;
const LIFT_PX = 10;
const ZOOM_SCALE = 1.08;
const ZOOM_DURATION = 1.35;

const SHADOW_REST =
  "0 4px 20px rgba(0, 0, 0, 0.32), 0 12px 40px rgba(0, 0, 0, 0.28), 0 1px 0 rgba(255, 255, 255, 0.04) inset";

const SHADOW_HOVER =
  "0 24px 48px rgba(0, 0, 0, 0.45), 0 48px 96px rgba(0, 0, 0, 0.38), 0 8px 16px rgba(0, 0, 0, 0.25), 0 1px 0 rgba(255, 255, 255, 0.06) inset";

export interface ArtworkFrameProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  aspectClassName?: string;
  imageClassName?: string;
  href?: string;
  children?: ReactNode;
}

export function ArtworkFrame({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  aspectClassName = "aspect-[4/5]",
  imageClassName = "",
  href,
  children,
}: ArtworkFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { premium, premiumTilt, reduced } = useArtworkCapabilities();
  const [hovered, setHovered] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);

  const rotateX = useSpring(0, artworkSpring);
  const rotateY = useSpring(0, artworkSpring);
  const lift = useSpring(0, artworkSpring);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(30);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14) 0%, transparent 55%)`;

  const handleEnter = useCallback(() => {
    setHovered(true);
    setSweepKey((k) => k + 1);
    if (premiumTilt) lift.set(-LIFT_PX);
  }, [premiumTilt, lift]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    glareX.set(50);
    glareY.set(30);
  }, [rotateX, rotateY, lift, glareX, glareY]);

  const targetScale =
    hovered && (premium || reduced) ? (premium ? ZOOM_SCALE : 1.03) : 1;

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!premiumTilt || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const nx = (px - 0.5) * 2;
      const ny = (py - 0.5) * 2;

      rotateY.set(nx * MAX_TILT);
      rotateX.set(-ny * MAX_TILT);
      glareX.set(px * 100);
      glareY.set(py * 100);
    },
    [premiumTilt, rotateX, rotateY, glareX, glareY],
  );

  const frame = (
    <div className="artwork-frame-perspective" style={{ perspective: 1400 }}>
      <motion.div
        ref={containerRef}
        className={`artwork-frame relative w-full ${aspectClassName} ${className}`}
        style={{
          rotateX: premiumTilt ? rotateX : 0,
          rotateY: premiumTilt ? rotateY : 0,
          y: premiumTilt ? lift : 0,
          boxShadow: hovered ? SHADOW_HOVER : SHADOW_REST,
          transformStyle: premiumTilt ? "preserve-3d" : "flat",
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
      >
        <div
          className="artwork-frame__viewport absolute inset-0 overflow-hidden border transition-[border-color] duration-700"
          style={{
            borderColor: hovered
              ? "rgba(255, 255, 255, 0.14)"
              : "rgba(255, 255, 255, 0.06)",
            transform: "translateZ(0)",
          }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            animate={{ scale: targetScale }}
            transition={{ duration: ZOOM_DURATION, ease: artworkZoomEase }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className={`object-cover select-none ${imageClassName}`}
              sizes={sizes}
              draggable={false}
            />
          </motion.div>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-deep/85 via-bg-deep/20 to-transparent"
            aria-hidden
          />

          {hovered && (premium || reduced) && (
            <motion.div
              key={sweepKey}
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-[55%] mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 58%, transparent 100%)",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "320%" }}
              transition={{ duration: 1.65, ease: artworkZoomEase }}
              aria-hidden
            />
          )}

          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-white/[0.04]" />
            <motion.div
              className="absolute inset-0"
              style={{
                background: glareBackground,
                opacity: hovered && premiumTilt ? 0.9 : 0,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_16%,transparent_84%,rgba(0,0,0,0.12)_100%)]" />
            <div className="absolute inset-0 backdrop-blur-[0.35px]" />
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0.35 }}
            />
          </div>

          <div
            className={`pointer-events-none absolute inset-0 ring-1 ring-inset transition-all duration-700 ${
              hovered ? "ring-white/12" : "ring-white/[0.06]"
            }`}
            style={{
              boxShadow: hovered
                ? "inset 0 1px 0 rgba(255,255,255,0.1)"
                : "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          />

          {children && (
            <div className="absolute inset-0 z-10">{children}</div>
          )}
        </div>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block max-w-full min-w-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory/40"
      >
        {frame}
      </a>
    );
  }

  return frame;
}

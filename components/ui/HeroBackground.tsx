"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useAutoRotate } from "@/hooks/useAutoRotate";
import { artworkZoomEase } from "@/lib/motion";

const CROSSFADE_DURATION = 1.6;
const INTERVAL_MS = 3000;

interface HeroBackgroundProps {
  slides: readonly string[];
}

export function HeroBackground({ slides }: HeroBackgroundProps) {
  const { index: activeIndex } = useAutoRotate(slides.length, INTERVAL_MS);

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg-deep" aria-hidden>
      {slides.map((src, i) => {
        const isActive = i === activeIndex;
        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={
              isActive
                ? { opacity: 1, scale: [1.06, 1] }
                : { opacity: 0, scale: 1.04 }
            }
            transition={
              isActive
                ? {
                    opacity: {
                      duration: CROSSFADE_DURATION,
                      ease: artworkZoomEase,
                    },
                    scale: {
                      duration: INTERVAL_MS / 1000,
                      ease: "linear",
                    },
                  }
                : {
                    opacity: {
                      duration: CROSSFADE_DURATION,
                      ease: artworkZoomEase,
                    },
                  }
            }
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              quality={i === 0 ? 75 : 60}
              className="object-cover object-center opacity-35 brightness-[0.45] contrast-[1.12] saturate-[0.9] sm:opacity-40 sm:brightness-[0.5]"
              sizes="100vw"
            />
          </motion.div>
        );
      })}

      {/* Cinematic grade — unifies slides, kills blown-out whites */}
      <div className="absolute inset-0 bg-bg-deep/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/80 via-bg-deep/70 to-bg-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_25%,rgba(255,255,255,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(0,0,0,0.45)_0%,transparent_55%)]" />

      <div className="absolute bottom-[4.5rem] sm:bottom-24 right-[var(--site-gutter)] z-[1] flex items-center gap-1.5 sm:gap-2">
        {slides.map((src, i) => (
          <div
            key={src}
            className="h-px w-5 overflow-hidden bg-white/10 sm:w-7"
          >
            <motion.div
              key={i === activeIndex ? `active-${activeIndex}` : `idle-${i}`}
              className="h-full w-full origin-left bg-white/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i === activeIndex ? 1 : 0 }}
              transition={
                i === activeIndex
                  ? { duration: INTERVAL_MS / 1000, ease: "linear" }
                  : { duration: 0.35 }
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

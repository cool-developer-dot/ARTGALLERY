"use client";

import { motion, useSpring } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArtworkDetail } from "@/components/gallery/ArtworkDetail";
import { GalleryArtworkSlot } from "@/components/gallery/GalleryArtworkSlot";
import { GalleryAtmosphere } from "@/components/gallery/GalleryAtmosphere";
import { GalleryLight } from "@/components/gallery/GalleryLight";
import { useDeviceTilt } from "@/hooks/useDeviceTilt";
import { usePinchZoom } from "@/hooks/usePinchZoom";
import { usePointerDepth } from "@/hooks/usePointerDepth";
import {
  galleryRows,
  type GalleryArtwork,
} from "@/lib/galleryArtworks";
import { artworkSpring } from "@/lib/motion";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}

export function GalleryExperience() {
  const isMobile = useIsMobile();
  const isCoarse = useIsCoarsePointer();
  const useTilt = isMobile || isCoarse;

  const sceneRef = useRef<HTMLDivElement>(null);
  const { tilt, supported: tiltSupported, requestPermission } =
    useDeviceTilt(useTilt);
  const pointer = usePointerDepth(!useTilt);
  const { zoom } = usePinchZoom(useTilt, sceneRef);

  const [selected, setSelected] = useState<GalleryArtwork | null>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  const parallaxX = useSpring(0, artworkSpring);
  const parallaxY = useSpring(0, artworkSpring);
  const sceneZoom = useSpring(1, { ...artworkSpring, stiffness: 90 });

  const inputX = useTilt ? tilt.x : pointer.x * 14;
  const inputY = useTilt ? tilt.y : pointer.y * 14;

  useEffect(() => {
    parallaxX.set(inputX);
    parallaxY.set(inputY);
  }, [inputX, inputY, parallaxX, parallaxY]);

  useEffect(() => {
    sceneZoom.set(zoom);
  }, [zoom, sceneZoom]);

  const enableMotion = useCallback(async () => {
    if (tiltSupported) await requestPermission();
    setMotionEnabled(true);
  }, [tiltSupported, requestPermission]);

  const [rowTop, rowBottom, rowCenter] = galleryRows;
  let slotIndex = 0;

  return (
    <div className="relative min-h-[100svh] w-full overflow-x-hidden overflow-y-auto bg-bg-deep">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg-deep/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
        <div className="site-container flex items-center justify-between gap-3 py-4 sm:py-5">
          <Link
            href="/"
            className="shrink-0 text-sm text-stone-body transition-colors hover:text-ivory"
          >
            ← Atelier
          </Link>
          <p className="type-label hidden truncate sm:block">Spatial collection</p>
          <span className="w-12 shrink-0 sm:w-12" aria-hidden />
        </div>
      </header>

      <div className="fixed top-[calc(4.5rem+env(safe-area-inset-top))] left-0 right-0 z-40 px-4 text-center pointer-events-none sm:top-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="type-display text-balance"
        >
          Enter the collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-3 max-w-md text-sm text-stone-body"
        >
          {useTilt
            ? "Tilt your device · Pinch to zoom · Tap a work to reveal"
            : "Move your cursor · Scroll to explore · Select a work"}
        </motion.p>
      </div>

      {useTilt && !motionEnabled && tiltSupported && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-bg-deep/80 backdrop-blur-sm p-6">
          <div className="glass-panel max-w-sm p-8 text-center">
            <p className="type-display-sm">Enable spatial motion</p>
            <p className="mt-4 text-sm text-stone-body">
              Allow device orientation for parallax depth while you explore the
              gallery.
            </p>
            <button
              type="button"
              onClick={enableMotion}
              className="mt-8 border border-white/15 px-6 py-3 text-sm text-ivory hover:bg-white/[0.04]"
            >
              Begin experience
            </button>
            <button
              type="button"
              onClick={() => setMotionEnabled(true)}
              className="mt-4 block w-full text-xs text-stone-muted hover:text-ivory"
            >
              Continue without motion
            </button>
          </div>
        </div>
      )}

      <div
        ref={sceneRef}
        className="gallery-scene relative pt-36 pb-24 sm:pt-40 sm:pb-28"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 30%" }}
      >
        <motion.div
          className="site-container relative will-change-transform"
          style={{
            scale: sceneZoom,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="relative will-change-transform"
            style={{
              x: parallaxX,
              y: parallaxY,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative min-h-[70vh]">
              <GalleryLight
                parallaxX={inputX / 14}
                parallaxY={inputY / 14}
              />
              <GalleryAtmosphere />

              <div
                className="relative flex flex-col gap-16 sm:gap-20 md:gap-28"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Row 1 — three horizontal */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 md:gap-12">
                  {rowTop.map((art) => {
                    const i = slotIndex++;
                    return (
                      <GalleryArtworkSlot
                        key={art.id}
                        art={art}
                        index={i}
                        offsetX={inputX}
                        offsetY={inputY}
                        onSelect={() => setSelected(art)}
                      />
                    );
                  })}
                </div>

                {/* Row 2 — three horizontal */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-12">
                  {rowBottom.map((art) => {
                    const i = slotIndex++;
                    return (
                      <GalleryArtworkSlot
                        key={art.id}
                        art={art}
                        index={i}
                        offsetX={inputX}
                        offsetY={inputY}
                        onSelect={() => setSelected(art)}
                      />
                    );
                  })}
                </div>

                {/* Row 3 — featured center */}
                <div className="flex justify-center pt-4 sm:pt-8">
                  {rowCenter.map((art) => {
                    const i = slotIndex++;
                    return (
                      <div key={art.id} className="w-full max-w-[380px]">
                        <GalleryArtworkSlot
                          art={art}
                          index={i}
                          offsetX={inputX}
                          offsetY={inputY}
                          onSelect={() => setSelected(art)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <p className="type-caption glass-panel px-4 py-2">
          {Math.round(zoom * 100)}% depth · 7 works
        </p>
      </div>

      <ArtworkDetail artwork={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

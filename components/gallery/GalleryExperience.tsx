"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArtworkDetail } from "@/components/gallery/ArtworkDetail";
import { GalleryArtworkSlot } from "@/components/gallery/GalleryArtworkSlot";
import { GalleryAtmosphere } from "@/components/gallery/GalleryAtmosphere";
import { GalleryLight } from "@/components/gallery/GalleryLight";
import { GalleryMotionRails } from "@/components/gallery/GalleryMotionRails";
import { GalleryRoomGrid } from "@/components/gallery/GalleryRoomGrid";
import { GalleryTiltProvider } from "@/components/gallery/GalleryTiltContext";
import { useDeviceTilt, type Tilt } from "@/hooks/useDeviceTilt";
import { useGallerySpeed } from "@/hooks/useGallerySpeed";
import { usePinchZoom } from "@/hooks/usePinchZoom";
import { useWheelZoom } from "@/hooks/useWheelZoom";
import { usePointerDepth } from "@/hooks/usePointerDepth";
import { useTouchTablet } from "@/hooks/useTouchTablet";
import {
  galleryDesktopRows,
  galleryRoomGrid,
  type GalleryArtwork,
} from "@/lib/galleryArtworks";
import { artworkSpring, galleryZoomSpring } from "@/lib/motion";

export function GalleryExperience() {
  const isTouchTablet = useTouchTablet();
  const sceneRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [motionEnabled, setMotionEnabled] = useState(false);
  const [needsTiltPermission, setNeedsTiltPermission] = useState(false);
  const [selected, setSelected] = useState<GalleryArtwork | null>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const {
    horizontal: hSpeed,
    vertical: vSpeed,
    setHorizontalSpeed,
    setVerticalSpeed,
    ready: speedReady,
  } = useGallerySpeed();

  const sceneZoom = useSpring(1, galleryZoomSpring);
  const parallaxX = useSpring(0, artworkSpring);
  const parallaxY = useSpring(0, artworkSpring);
  const pointer = usePointerDepth(!isTouchTablet);

  const onTilt = useCallback(
    (t: Tilt) => {
      tiltX.set(t.x);
      tiltY.set(t.y);
    },
    [tiltX, tiltY],
  );

  const { supported: tiltSupported, requestPermission, calibrate } =
    useDeviceTilt(isTouchTablet && motionEnabled, onTilt);

  const { zoom: pinchZoom } = usePinchZoom(isTouchTablet, sceneRef);
  const { zoom: wheelZoom } = useWheelZoom(!isTouchTablet, sceneRef);
  const zoom = isTouchTablet ? pinchZoom : wheelZoom;

  useEffect(() => {
    const DOE = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>;
    };
    const needs = typeof DOE.requestPermission === "function";
    setNeedsTiltPermission(needs);
    if (!needs) setMotionEnabled(true);
  }, []);

  useEffect(() => {
    if (!isTouchTablet) {
      parallaxX.set(pointer.x * 14);
      parallaxY.set(pointer.y * 14);
    }
  }, [isTouchTablet, pointer.x, pointer.y, parallaxX, parallaxY]);

  useEffect(() => {
    sceneZoom.set(zoom);
  }, [zoom, sceneZoom]);

  const enableMotion = useCallback(async () => {
    if (tiltSupported) await requestPermission();
    calibrate();
    setMotionEnabled(true);
  }, [tiltSupported, requestPermission, calibrate]);

  const [rowTop, rowBottom, rowCenter] = galleryDesktopRows;
  let slotIndex = 0;

  const roomContent = (
    <GalleryRoomGrid artworks={galleryRoomGrid} onSelect={setSelected} />
  );

  return (
    <div
      className={
        isTouchTablet
          ? "gallery-page relative h-[100svh] w-full overflow-hidden bg-bg-deep"
          : "relative min-h-[100svh] w-full overflow-x-hidden overflow-y-auto bg-bg-deep"
      }
    >
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg-deep/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
        <div className="site-container flex items-center justify-between gap-3 py-4 sm:py-5">
          <Link
            href="/"
            className="shrink-0 text-sm text-stone-body transition-colors hover:text-ivory"
          >
            ← Atelier
          </Link>
          <p className="type-label hidden truncate sm:block">Spatial collection</p>
          <span className="w-12 shrink-0" aria-hidden />
        </div>
      </header>

      <div className="pointer-events-none fixed top-[calc(4.5rem+env(safe-area-inset-top))] left-0 right-0 z-40 px-4 text-center sm:top-24 lg:pl-0">
        <h1 className="type-display text-balance">Enter the collection</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone-body">
          {isTouchTablet
            ? "Tilt — each work moves on its own · Rails set speed · Pinch to zoom"
            : "Move cursor to explore · Pinch trackpad or Ctrl+scroll to zoom"}
        </p>
      </div>

      {isTouchTablet && speedReady && (
        <GalleryMotionRails
          horizontal={hSpeed}
          vertical={vSpeed}
          onHorizontalChange={setHorizontalSpeed}
          onVerticalChange={setVerticalSpeed}
        />
      )}

      {isTouchTablet && needsTiltPermission && tiltSupported && !motionEnabled && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-bg-deep/90 p-6">
          <div className="glass-panel max-w-sm p-8 text-center">
            <p className="type-display-sm">Tilt to explore</p>
            <p className="mt-4 text-sm text-stone-body">
              Each artwork drifts independently as you tilt. Use the rails to
              control horizontal and vertical speed. Pinch to zoom.
            </p>
            <button
              type="button"
              onClick={enableMotion}
              className="mt-8 border border-white/15 px-6 py-3 text-sm text-ivory hover:bg-white/[0.04]"
            >
              Enable motion
            </button>
            <button
              type="button"
              onClick={() => setMotionEnabled(true)}
              className="mt-4 block w-full text-xs text-stone-muted hover:text-ivory"
            >
              Continue without tilt
            </button>
          </div>
        </div>
      )}

      <div
        ref={sceneRef}
        className={
          isTouchTablet
            ? "gallery-scene gallery-scene--room absolute inset-0 pt-[calc(7rem+env(safe-area-inset-top))]"
            : "gallery-scene gallery-scene--desktop-zoom relative pt-36 pb-24 sm:pt-40 sm:pb-28"
        }
        style={
          isTouchTablet
            ? { perspective: "1100px", perspectiveOrigin: "50% 45%" }
            : { perspective: "1400px", perspectiveOrigin: "50% 30%" }
        }
      >
        <div
          ref={viewportRef}
          className={
            isTouchTablet
              ? "gallery-viewport gallery-viewport--float relative flex h-full w-full items-center justify-center overflow-hidden"
              : "site-container relative"
          }
        >
          <motion.div
            className="relative will-change-transform"
            style={{
              scale: sceneZoom,
              transformStyle: "preserve-3d",
              ...(isTouchTablet
                ? {}
                : { x: parallaxX, y: parallaxY }),
            }}
          >
            <div className={isTouchTablet ? "relative" : "relative min-h-[70vh]"}>
              <GalleryLight
                parallaxX={isTouchTablet ? 0 : pointer.x}
                parallaxY={isTouchTablet ? 0 : pointer.y}
              />
              <GalleryAtmosphere />

              {isTouchTablet ? (
                <GalleryTiltProvider
                  tiltX={tiltX}
                  tiltY={tiltY}
                  horizontalSpeed={hSpeed}
                  verticalSpeed={vSpeed}
                >
                  {roomContent}
                </GalleryTiltProvider>
              ) : (
                <div
                  className="relative flex flex-col gap-16 sm:gap-20 md:gap-28"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 md:gap-12">
                    {rowTop.map((art) => {
                      const i = slotIndex++;
                      return (
                        <GalleryArtworkSlot
                          key={art.id}
                          art={art}
                          index={i}
                          onSelect={() => setSelected(art)}
                        />
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-12">
                    {rowBottom.map((art) => {
                      const i = slotIndex++;
                      return (
                        <GalleryArtworkSlot
                          key={art.id}
                          art={art}
                          index={i}
                          onSelect={() => setSelected(art)}
                        />
                      );
                    })}
                  </div>

                  <div className="flex justify-center pt-4 sm:pt-8">
                    {rowCenter.map((art) => {
                      const i = slotIndex++;
                      return (
                        <div key={art.id} className="w-full max-w-[380px]">
                          <GalleryArtworkSlot
                            art={art}
                            index={i}
                            onSelect={() => setSelected(art)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none fixed z-40 flex justify-center"
        style={{
          bottom: isTouchTablet
            ? "calc(var(--gallery-h-rail) + 0.35rem + env(safe-area-inset-bottom))"
            : "1.5rem",
          left: isTouchTablet ? "var(--gallery-v-rail)" : 0,
          right: 0,
        }}
      >
        <p className="type-caption glass-panel px-4 py-2">
          {isTouchTablet
            ? `${Math.round(zoom * 100)}% · 9 works · H ${hSpeed.toFixed(1)}× · V ${vSpeed.toFixed(1)}×`
            : `${Math.round(zoom * 100)}% zoom · 9 works`}
        </p>
      </div>

      <ArtworkDetail artwork={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

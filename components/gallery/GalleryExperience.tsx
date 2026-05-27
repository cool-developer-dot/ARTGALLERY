"use client";

import { motion, useSpring } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArtworkDetail } from "@/components/gallery/ArtworkDetail";
import { GalleryArtworkSlot } from "@/components/gallery/GalleryArtworkSlot";
import { GalleryAtmosphere } from "@/components/gallery/GalleryAtmosphere";
import { GalleryLight } from "@/components/gallery/GalleryLight";
import { GalleryMainRoomLobby } from "@/components/gallery/GalleryMainRoomLobby";
import { GalleryMotionRails } from "@/components/gallery/GalleryMotionRails";
import { GallerySpatialViewer } from "@/components/gallery/GallerySpatialViewer";
import { useDeviceTilt } from "@/hooks/useDeviceTilt";
import { useGallerySpeed } from "@/hooks/useGallerySpeed";
import { usePinchZoom } from "@/hooks/usePinchZoom";
import { useSpatialGalleryNav } from "@/hooks/useSpatialGalleryNav";
import { useWheelZoom } from "@/hooks/useWheelZoom";
import { usePointerDepth } from "@/hooks/usePointerDepth";
import { useTouchTablet } from "@/hooks/useTouchTablet";
import {
  galleryMainRoomCollections,
  type GalleryArtwork,
} from "@/lib/galleryArtworks";
import { buildRoomSpatialGrid } from "@/lib/gallerySpatial";
import { artworkSpring, galleryZoomSpring } from "@/lib/motion";

type MobilePhase = "lobby" | "room";

const EMPTY_GRID: (GalleryArtwork | null)[][] = [[null]];

export function GalleryExperience() {
  const isTouchTablet = useTouchTablet();
  const sceneRef = useRef<HTMLDivElement>(null);

  const [motionEnabled, setMotionEnabled] = useState(false);
  const [needsTiltPermission, setNeedsTiltPermission] = useState(false);
  const [selected, setSelected] = useState<GalleryArtwork | null>(null);
  const [mobilePhase, setMobilePhase] = useState<MobilePhase>("lobby");
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const activeRoom = useMemo(
    () => galleryMainRoomCollections.find((r) => r.id === activeRoomId) ?? null,
    [activeRoomId],
  );

  const roomSpatial = useMemo(
    () => (activeRoom ? buildRoomSpatialGrid(activeRoom.artworks) : null),
    [activeRoom],
  );

  const spatialGrid = roomSpatial?.grid ?? EMPTY_GRID;
  const spatialStart = roomSpatial?.start ?? { row: 0, col: 0 };
  const inLobby = isTouchTablet && mobilePhase === "lobby";
  const inRoom = isTouchTablet && mobilePhase === "room" && !!roomSpatial;

  const {
    horizontal: hSpeed,
    vertical: vSpeed,
    setHorizontalSpeed,
    setVerticalSpeed,
    ready: speedReady,
  } = useGallerySpeed();

  const snapBaselineRef = useRef<() => void>(() => {});

  const {
    artwork: spatialArtwork,
    position: spatialPosition,
    direction: spatialDirection,
    workIndex: spatialWorkIndex,
    totalWorks: spatialTotalWorks,
    canGoLeft,
    canGoRight,
    canGoUp,
    canGoDown,
    tiltPreview,
    handleTilt,
    go: goSpatial,
    reset: resetSpatial,
  } = useSpatialGalleryNav(
    spatialGrid,
    spatialStart,
    hSpeed,
    vSpeed,
    inRoom && motionEnabled,
    () => snapBaselineRef.current(),
  );

  const tiltHandlerRef = useRef(handleTilt);
  tiltHandlerRef.current = handleTilt;

  const onTilt = useCallback((t: { x: number; y: number }) => {
    tiltHandlerRef.current(t);
  }, []);

  const { supported: tiltSupported, requestPermission, calibrate, snapBaseline } =
    useDeviceTilt(inRoom && motionEnabled, onTilt);

  snapBaselineRef.current = snapBaseline;

  const onNavigate = useCallback(
    (dir: Parameters<typeof goSpatial>[0]) => {
      goSpatial(dir);
    },
    [goSpatial],
  );

  const sceneZoom = useSpring(1, galleryZoomSpring);
  const parallaxX = useSpring(0, artworkSpring);
  const parallaxY = useSpring(0, artworkSpring);
  const pointer = usePointerDepth(!isTouchTablet);

  const { zoom: pinchZoom } = usePinchZoom(inRoom, sceneRef);
  const { zoom: wheelZoom } = useWheelZoom(!isTouchTablet, sceneRef);
  const zoom = inRoom ? pinchZoom : isTouchTablet ? 1 : wheelZoom;

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
    resetSpatial();
    setMotionEnabled(true);
  }, [tiltSupported, requestPermission, calibrate, resetSpatial]);

  const enterRoom = useCallback(
    (roomId: string) => {
      setActiveRoomId(roomId);
      setMobilePhase("room");
      resetSpatial();
    },
    [resetSpatial],
  );

  const exitRoom = useCallback(() => {
    setMobilePhase("lobby");
    setActiveRoomId(null);
    resetSpatial();
  }, [resetSpatial]);

  const desktopArtworkCount = galleryMainRoomCollections.reduce(
    (total, room) => total + room.artworks.length,
    0,
  );

  return (
    <div
      className={
        isTouchTablet
          ? inLobby
            ? "gallery-page gallery-page--lobby relative min-h-[100dvh] w-full bg-bg-deep"
            : "gallery-page relative h-[100dvh] w-full overflow-hidden bg-bg-deep"
          : "relative min-h-[100svh] w-full overflow-x-hidden overflow-y-auto bg-bg-deep"
      }
    >
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg-deep/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
        <div className="site-container flex items-center justify-between gap-3 py-4 sm:py-5">
          {isTouchTablet && mobilePhase === "room" ? (
            <button
              type="button"
              onClick={exitRoom}
              className="shrink-0 text-sm text-stone-body transition-colors hover:text-ivory"
            >
              ← Main hall
            </button>
          ) : (
            <Link
              href="/"
              className="shrink-0 text-sm text-stone-body transition-colors hover:text-ivory"
            >
              ← Atelier
            </Link>
          )}
          <p className="type-label truncate text-center">
            {isTouchTablet
              ? mobilePhase === "lobby"
                ? "Main room"
                : activeRoom?.title ?? "Gallery"
              : "Spatial collection"}
          </p>
          <span className="w-12 shrink-0" aria-hidden />
        </div>
      </header>

      {!inLobby && (
        <div className="pointer-events-none fixed top-[calc(4.5rem+env(safe-area-inset-top))] left-0 right-0 z-40 px-4 text-center sm:top-24 lg:pl-0">
          <h1 className="type-display text-balance">Enter the collection</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-stone-body">
            {isTouchTablet
              ? "Swipe or tilt to browse works · Pinch to zoom"
              : "Move cursor to explore · Pinch trackpad or Ctrl+scroll to zoom"}
          </p>
        </div>
      )}

      {inRoom && speedReady && (
        <GalleryMotionRails
          horizontal={hSpeed}
          vertical={vSpeed}
          onHorizontalChange={setHorizontalSpeed}
          onVerticalChange={setVerticalSpeed}
        />
      )}

      {inRoom && needsTiltPermission && tiltSupported && !motionEnabled && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-bg-deep/90 p-6">
          <div className="glass-panel max-w-sm p-8 text-center">
            <p className="type-display-sm">Browse the collection</p>
            <p className="mt-4 text-sm text-stone-body">
              Start in the main hall and tap a room to enter. Inside each room,
              one artwork fills the screen—tilt or swipe left, right, up, or down
              to move between works. Adjust speed on the side rails. Pinch to
              zoom.
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
            ? inLobby
              ? "gallery-scene gallery-scene--lobby relative w-full pt-[calc(4.25rem+env(safe-area-inset-top))]"
              : "gallery-scene gallery-scene--room absolute inset-0 pt-[calc(7rem+env(safe-area-inset-top))]"
            : "gallery-scene gallery-scene--desktop-zoom relative pt-36 pb-24 sm:pt-40 sm:pb-28"
        }
        style={
          isTouchTablet
            ? undefined
            : { perspective: "1400px", perspectiveOrigin: "50% 30%" }
        }
      >
        <div
          className={
            isTouchTablet
              ? inLobby
                ? "gallery-viewport gallery-viewport--lobby relative w-full"
                : "gallery-viewport gallery-viewport--spatial relative flex h-full w-full items-center justify-center overflow-hidden"
              : "site-container relative"
          }
        >
          <motion.div
            className="relative w-full will-change-transform"
            style={{
              scale: inLobby ? 1 : sceneZoom,
              transformStyle: "preserve-3d",
              ...(isTouchTablet || inLobby ? {} : { x: parallaxX, y: parallaxY }),
            }}
          >
            <div className={isTouchTablet ? "relative w-full" : "relative min-h-[70vh]"}>
              <GalleryLight
                parallaxX={isTouchTablet ? 0 : pointer.x}
                parallaxY={isTouchTablet ? 0 : pointer.y}
              />
              <GalleryAtmosphere />

              {isTouchTablet ? (
                mobilePhase === "lobby" ? (
                  <GalleryMainRoomLobby
                    rooms={galleryMainRoomCollections}
                    onEnterRoom={enterRoom}
                  />
                ) : roomSpatial ? (
                  <GallerySpatialViewer
                    artwork={spatialArtwork}
                    grid={roomSpatial.grid}
                    direction={spatialDirection}
                    row={spatialPosition.row}
                    col={spatialPosition.col}
                    workIndex={spatialWorkIndex}
                    totalWorks={spatialTotalWorks}
                    roomTitle={activeRoom?.title ?? "Room"}
                    tilt={tiltPreview}
                    canGoLeft={canGoLeft}
                    canGoRight={canGoRight}
                    canGoUp={canGoUp}
                    canGoDown={canGoDown}
                    onOpen={() => setSelected(spatialArtwork)}
                    onNavigate={onNavigate}
                  />
                ) : null
              ) : (
                <div
                  className="relative flex flex-col gap-10 sm:gap-12 md:gap-14"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="glass-panel border border-white/10 px-6 py-5 sm:px-8 sm:py-6">
                    <p className="type-caption">Main Room</p>
                    <h2 className="mt-2 type-display-sm">Curated Gallery Halls</h2>
                    <p className="mt-2 max-w-2xl text-sm text-stone-body">
                      Explore four distinct rooms. Each room features a focused
                      collection in the same immersive frame style.
                    </p>
                  </div>

                  {galleryMainRoomCollections.map((room, roomIndex) => (
                    <section
                      key={room.id}
                      className="glass-panel border border-white/10 px-5 py-6 sm:px-6 sm:py-7"
                    >
                      <div className="mb-6 sm:mb-7">
                        <p className="type-caption">
                          Room {String(roomIndex + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 type-display-sm">{room.title}</h3>
                        <p className="mt-2 max-w-3xl text-sm text-stone-body">
                          {room.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
                        {room.artworks.map((art, artIndex) => (
                          <div key={art.id} className="w-full">
                            <GalleryArtworkSlot
                              art={art}
                              index={roomIndex * 6 + artIndex}
                              onSelect={() => setSelected(art)}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
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
            ? inLobby
              ? "calc(0.75rem + env(safe-area-inset-bottom))"
              : "calc(var(--gallery-h-rail) + 0.35rem + env(safe-area-inset-bottom))"
            : "1.5rem",
          left: isTouchTablet && !inLobby ? "var(--gallery-v-rail)" : 0,
          right: 0,
        }}
      >
        <p className="type-caption glass-panel px-4 py-2">
          {isTouchTablet
            ? mobilePhase === "lobby"
              ? `${Math.round(zoom * 100)}% · Main hall · ${galleryMainRoomCollections.length} rooms`
              : `${Math.round(zoom * 100)}% · ${activeRoom?.title ?? "Room"} · ${spatialWorkIndex}/${spatialTotalWorks} · H ${hSpeed.toFixed(1)}× · V ${vSpeed.toFixed(1)}×`
            : `${Math.round(zoom * 100)}% zoom · ${desktopArtworkCount} works`}
        </p>
      </div>

      <ArtworkDetail artwork={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

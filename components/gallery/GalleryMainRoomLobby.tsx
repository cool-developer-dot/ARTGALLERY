"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryRoomCollection } from "@/lib/galleryArtworks";

interface GalleryMainRoomLobbyProps {
  rooms: GalleryRoomCollection[];
  onEnterRoom: (roomId: string) => void;
}

export function GalleryMainRoomLobby({
  rooms,
  onEnterRoom,
}: GalleryMainRoomLobbyProps) {
  return (
    <div className="gallery-lobby">
      <div className="gallery-lobby__intro glass-panel border border-white/10 px-5 py-5 sm:px-6">
        <p className="type-caption">Main Room</p>
        <h1 className="gallery-lobby__hero-title mt-2 font-display text-ivory">
          Enter the collection
        </h1>
        <h2 className="mt-3 type-display-sm">Choose a hall</h2>
        <p className="mt-2 text-sm text-stone-body">
          Scroll to see all halls, then tap a room to enter. Inside, swipe or tilt
          to move between works.
        </p>
      </div>

      <ul className="gallery-lobby__rooms" aria-label="Gallery halls">
        {rooms.map((room, index) => {
          const preview = room.artworks[0];
          return (
            <motion.li
              key={room.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
            >
              <button
                type="button"
                className="gallery-lobby__card group w-full text-left"
                onClick={() => onEnterRoom(room.id)}
              >
                <div className="gallery-lobby__card-media relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={preview.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-active:scale-[1.03]"
                    sizes="(max-width: 768px) 92vw, 420px"
                    quality={80}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/35 to-transparent" />
                  <span className="gallery-lobby__card-badge type-caption">
                    {room.artworks.length} works
                  </span>
                </div>
                <div className="gallery-lobby__card-body">
                  <p className="type-caption">
                    Hall {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 type-display-sm text-balance">
                    {room.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-stone-body">
                    {room.description}
                  </p>
                  <p className="gallery-lobby__enter mt-3 text-xs text-stone-muted group-hover:text-ivory">
                    Enter room →
                  </p>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

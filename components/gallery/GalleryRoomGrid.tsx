"use client";

import { GalleryArtworkSlot } from "@/components/gallery/GalleryArtworkSlot";
import type { GalleryArtwork } from "@/lib/galleryArtworks";

interface GalleryRoomGridProps {
  artworks: GalleryArtwork[];
  onSelect: (art: GalleryArtwork) => void;
}

export function GalleryRoomGrid({ artworks, onSelect }: GalleryRoomGridProps) {
  return (
    <div className="gallery-room relative">
      <div className="gallery-room__architecture pointer-events-none" aria-hidden>
        <div className="gallery-room__ceiling" />
        <div className="gallery-room__floor" />
        <div className="gallery-room__wall gallery-room__wall--left" />
        <div className="gallery-room__wall gallery-room__wall--right" />
      </div>

      <div
        className="gallery-room__grid grid grid-cols-3 grid-rows-3"
        role="list"
        aria-label="Gallery room, nine works"
      >
        {artworks.map((art, index) => (
          <div key={art.id} className="gallery-room__cell" role="listitem">
            <GalleryArtworkSlot
              art={art}
              index={index}
              compact
              onSelect={() => onSelect(art)}
              disableCardTilt
            />
          </div>
        ))}
      </div>
    </div>
  );
}

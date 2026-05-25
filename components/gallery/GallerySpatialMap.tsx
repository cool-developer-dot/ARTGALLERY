"use client";

interface GallerySpatialMapProps {
  activeRow: number;
  activeCol: number;
}

export function GallerySpatialMap({ activeRow, activeCol }: GallerySpatialMapProps) {
  return (
    <div
      className="gallery-spatial-map pointer-events-none"
      aria-label={`Position row ${activeRow + 1}, column ${activeCol + 1}`}
    >
      {Array.from({ length: 9 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const active = row === activeRow && col === activeCol;
        return (
          <span
            key={i}
            className={`gallery-spatial-map__cell ${active ? "is-active" : ""}`}
          />
        );
      })}
    </div>
  );
}

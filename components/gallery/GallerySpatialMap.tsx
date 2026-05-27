"use client";

import type { SpatialGrid } from "@/lib/gallerySpatial";

interface GallerySpatialMapProps {
  grid: SpatialGrid;
  activeRow: number;
  activeCol: number;
}

export function GallerySpatialMap({
  grid,
  activeRow,
  activeCol,
}: GallerySpatialMapProps) {
  const cols = Math.max(...grid.map((row) => row.length), 1);

  return (
    <div
      className="gallery-spatial-map pointer-events-none"
      style={{ gridTemplateColumns: `repeat(${cols}, 6px)` }}
      aria-label={`Position row ${activeRow + 1}, column ${activeCol + 1}`}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const active = rowIndex === activeRow && colIndex === activeCol;
          return (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={`gallery-spatial-map__cell ${active ? "is-active" : ""} ${cell ? "" : "is-empty"}`}
            />
          );
        }),
      )}
    </div>
  );
}

import type { GalleryArtwork } from "@/lib/galleryArtworks";
import type { SpatialDirection } from "@/lib/galleryArtworks";

export type SpatialGrid = (GalleryArtwork | null)[][];
export type SpatialPosition = { row: number; col: number };

/** 3×2 layout for five works: three on top, two on bottom */
export function buildRoomSpatialGrid(artworks: GalleryArtwork[]): {
  grid: SpatialGrid;
  start: SpatialPosition;
} {
  const [a0, a1, a2, a3, a4] = artworks;
  const grid: SpatialGrid = [
    [a0 ?? null, a1 ?? null, a2 ?? null],
    [a3 ?? null, a4 ?? null, null],
  ];
  return { grid, start: { row: 0, col: 1 } };
}

export function countSpatialWorks(grid: SpatialGrid): number {
  return grid.flat().filter(Boolean).length;
}

export function getSpatialWorkIndex(
  grid: SpatialGrid,
  row: number,
  col: number,
): number {
  let index = 0;
  for (let r = 0; r < grid.length; r++) {
    const rowCells = grid[r] ?? [];
    for (let c = 0; c < rowCells.length; c++) {
      if (!rowCells[c]) continue;
      index++;
      if (r === row && c === col) return index;
    }
  }
  return 1;
}

const DELTAS: Record<SpatialDirection, [number, number]> = {
  left: [0, -1],
  right: [0, 1],
  up: [-1, 0],
  down: [1, 0],
};

export function findSpatialNeighbor(
  grid: SpatialGrid,
  row: number,
  col: number,
  dir: SpatialDirection,
): SpatialPosition | null {
  const [dr, dc] = DELTAS[dir];
  const r = row + dr;
  const c = col + dc;
  if (r < 0 || r >= grid.length) return null;
  const rowCells = grid[r];
  if (!rowCells || c < 0 || c >= rowCells.length) return null;
  if (!rowCells[c]) return null;
  return { row: r, col: c };
}

export function canSpatialMove(
  grid: SpatialGrid,
  row: number,
  col: number,
  dir: SpatialDirection,
): boolean {
  return findSpatialNeighbor(grid, row, col, dir) !== null;
}

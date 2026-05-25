import { images } from "./images";

export type ArtworkLayout = {
  row: 0 | 1 | 2;
  col: 0 | 1 | 2;
  z: number;
  rotate?: number;
};

export type GalleryArtwork = {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  description: string;
  image: string;
  layout: ArtworkLayout;
};

export const featuredArtworks: GalleryArtwork[] = [
  {
    id: "neural-bloom",
    title: "Neural Bloom",
    artist: "Elena Vasquez",
    year: "2025",
    medium: "Generative digital sculpture",
    description:
      "Procedural flora emerges from silence—each petal a computed breath between nature and machine intelligence.",
    image: images.featureNavigation,
    layout: { row: 0, col: 0, z: 0.72, rotate: -1.5 },
  },
  {
    id: "chromatic-drift",
    title: "Chromatic Drift",
    artist: "Marcus Chen",
    year: "2024",
    medium: "Algorithmic painting",
    description:
      "Color fields migrate across an infinite canvas, never repeating, always dissolving into the next temporal state.",
    image: images.featureCollections,
    layout: { row: 0, col: 1, z: 0.58, rotate: 0 },
  },
  {
    id: "luminous-horizon",
    title: "Luminous Horizon",
    artist: "Amara Okafor",
    year: "2025",
    medium: "Immersive light installation",
    description:
      "A horizon line that exists only in photons—viewers stand at the threshold between observation and embodiment.",
    image: images.exhibition,
    layout: { row: 0, col: 2, z: 0.65, rotate: 1.5 },
  },
  {
    id: "void-sculpture",
    title: "Void Sculpture",
    artist: "James Whitfield",
    year: "2023",
    medium: "Neo-renaissance photogrammetry",
    description:
      "Classical form hollowed by digital erosion—the absence becomes the monument.",
    image: images.featureStorytelling,
    layout: { row: 1, col: 0, z: 0.42, rotate: -2 },
  },
  {
    id: "digital-futures",
    title: "Digital Futures",
    artist: "Marcus Chen",
    year: "2025",
    medium: "Neural landscape",
    description:
      "Terrain generated from latent space—mountains of data rendered as geological memory.",
    image: images.digitalFutures,
    layout: { row: 1, col: 1, z: 0.55, rotate: 0 },
  },
  {
    id: "abstract-echo",
    title: "Abstract Echo",
    artist: "Elena Vasquez",
    year: "2024",
    medium: "Mixed digital media",
    description:
      "Gestural marks translated through centuries of art history, then released into pure computational form.",
    image: images.abstractArt,
    layout: { row: 1, col: 2, z: 0.48, rotate: 2 },
  },
  {
    id: "renaissance-light",
    title: "Renaissance Light",
    artist: "James Whitfield",
    year: "2025",
    medium: "Cinematic digital restoration",
    description:
      "Masterworks re-lit for a century that never was—chiaroscuro as architecture, not ornament.",
    image: images.renaissance,
    layout: { row: 2, col: 0, z: 0.68, rotate: -1 },
  },
  {
    id: "hall-of-silence",
    title: "Hall of Silence",
    artist: "Amara Okafor",
    year: "2024",
    medium: "Architectural light study",
    description:
      "A vaulted corridor where scale and shadow converse—each frame a threshold into stillness.",
    image: images.hero,
    layout: { row: 2, col: 1, z: 0.75, rotate: 0 },
  },
  {
    id: "sculpture-chamber",
    title: "Sculpture Chamber",
    artist: "James Whitfield",
    year: "2023",
    medium: "Digital marble installation",
    description:
      "Monolithic forms arranged in negative space, as if the room itself were cast from a single block of light.",
    image: images.sculptureHall,
    layout: { row: 2, col: 2, z: 0.6, rotate: 1.5 },
  },
];

/** 3×3 room grid — phones through tablets */
export const galleryRoomGrid: GalleryArtwork[] = [...featuredArtworks].sort(
  (a, b) =>
    a.layout.row - b.layout.row || a.layout.col - b.layout.col,
);

/** Desktop: two rows of three + featured center (legacy layout) */
export const galleryDesktopRows = [
  galleryRoomGrid.filter((a) => a.layout.row === 0),
  galleryRoomGrid.filter((a) => a.layout.row === 1),
  galleryRoomGrid.filter((a) => a.layout.row === 2 && a.layout.col === 1),
] as const;

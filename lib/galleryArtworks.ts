import { images } from "./images";

export type ArtworkLayout = {
  /** Row index: 0 = top horizontal trio, 1 = bottom horizontal trio, 2 = center feature */
  row: 0 | 1 | 2;
  /** Column within row (0–2), only for rows 0 and 1 */
  col?: 0 | 1 | 2;
  /** Depth layer for parallax */
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
    layout: { row: 0, col: 0, z: 0.7, rotate: -2 },
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
    layout: { row: 0, col: 1, z: 0.5, rotate: 0 },
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
    layout: { row: 0, col: 2, z: 0.65, rotate: 2 },
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
    layout: { row: 1, col: 0, z: 0.35, rotate: -3 },
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
    layout: { row: 1, col: 1, z: 0.55, rotate: 1 },
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
    layout: { row: 1, col: 2, z: 0.4, rotate: 3 },
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
    layout: { row: 2, z: 0.75, rotate: -1 },
  },
];

export const galleryRows = [
  featuredArtworks.filter((a) => a.layout.row === 0),
  featuredArtworks.filter((a) => a.layout.row === 1),
  featuredArtworks.filter((a) => a.layout.row === 2),
] as const;

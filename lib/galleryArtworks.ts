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

export type GalleryRoomCollection = {
  id: string;
  title: string;
  description: string;
  artworks: GalleryArtwork[];
};

export type SpatialDirection = "left" | "right" | "up" | "down";

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

/** 3×3 matrix for spatial navigation (row → col) */
export const spatialGalleryGrid: GalleryArtwork[][] = [0, 1, 2].map((row) =>
  [0, 1, 2].map(
    (col) =>
      featuredArtworks.find(
        (a) => a.layout.row === row && a.layout.col === col,
      )!,
  ),
);

export const galleryRoomGrid: GalleryArtwork[] = [...featuredArtworks].sort(
  (a, b) =>
    a.layout.row - b.layout.row || a.layout.col - b.layout.col,
);

export function getSpatialIndex(row: number, col: number) {
  return row * 3 + col + 1;
}

/** Desktop: two rows of three + featured center */
export const galleryDesktopRows = [
  galleryRoomGrid.filter((a) => a.layout.row === 0),
  galleryRoomGrid.filter((a) => a.layout.row === 1),
  galleryRoomGrid.filter((a) => a.layout.row === 2 && a.layout.col === 1),
] as const;

function roomArtwork(
  id: string,
  title: string,
  artist: string,
  year: string,
  medium: string,
  description: string,
  image: string,
  index: number,
): GalleryArtwork {
  const row = Math.floor(index / 3) as 0 | 1 | 2;
  const col = (index % 3) as 0 | 1 | 2;
  const zPattern = [0.58, 0.65, 0.52, 0.6, 0.55, 0.62];
  const rotatePattern = [-2, 0, 2, -1.5, 1.5, 0.5];
  return {
    id,
    title,
    artist,
    year,
    medium,
    description,
    image,
    layout: {
      row,
      col,
      z: zPattern[index % zPattern.length],
      rotate: rotatePattern[index % rotatePattern.length],
    },
  };
}

export const galleryMainRoomCollections: GalleryRoomCollection[] = [
  {
    id: "flowers",
    title: "Flower Room",
    description: "Botanical compositions blending organic form and digital light.",
    artworks: [
      roomArtwork(
        "flower-neural-bloom",
        "Neural Bloom",
        "Elena Vasquez",
        "2025",
        "Generative digital flora",
        "A living bouquet simulated through procedural growth and light.",
        images.featureNavigation,
        0,
      ),
      roomArtwork(
        "flower-vernal-study",
        "Vernal Study",
        "Amara Okafor",
        "2024",
        "Chromatic photo composition",
        "Seasonal petals arranged as a rhythm of color and shadow.",
        images.artist1,
        1,
      ),
      roomArtwork(
        "flower-sunlit-petals",
        "Sunlit Petals",
        "Marcus Chen",
        "2025",
        "Digital macro painting",
        "Close-up petals translated into painterly gradients.",
        images.artist2,
        2,
      ),
      roomArtwork(
        "flower-quiet-garden",
        "Quiet Garden",
        "James Whitfield",
        "2023",
        "Hybrid archival print",
        "A contemplative floral arrangement in a tranquil composition.",
        images.artist3,
        3,
      ),
      roomArtwork(
        "flower-midnight-orchid",
        "Midnight Orchid",
        "Elena Vasquez",
        "2026",
        "Luminous digital canvas",
        "Orchid silhouettes suspended in deep blue atmospheric light.",
        images.artist4,
        4,
      ),
    ],
  },
  {
    id: "museum",
    title: "Museum Room",
    description: "Architectural halls, restored interiors, and timeless exhibition spaces.",
    artworks: [
      roomArtwork(
        "museum-grand-hall",
        "Grand Hall",
        "James Whitfield",
        "2025",
        "Cinematic restoration",
        "A monumental gallery hall rendered with immersive depth.",
        images.hero,
        0,
      ),
      roomArtwork(
        "museum-renaissance-light",
        "Renaissance Light",
        "James Whitfield",
        "2025",
        "Digital restoration",
        "Classical architecture relit for a contemporary audience.",
        images.renaissance,
        1,
      ),
      roomArtwork(
        "museum-sculpture-wing",
        "Sculpture Wing",
        "Amara Okafor",
        "2024",
        "Architectural light study",
        "A corridor of stone and light focused on spatial serenity.",
        images.sculptureHall,
        2,
      ),
      roomArtwork(
        "museum-modern-galleria",
        "Modern Galleria",
        "Marcus Chen",
        "2026",
        "Interior visualization",
        "A contemporary exhibition space with clean axial geometry.",
        images.exhibition,
        3,
      ),
      roomArtwork(
        "museum-digital-vault",
        "Digital Vault",
        "Elena Vasquez",
        "2024",
        "Museum concept render",
        "A vaulted room where artifacts and media narratives converge.",
        images.virtualExperience,
        4,
      ),
    ],
  },
  {
    id: "abstract-art",
    title: "Abstract Art Room",
    description: "Expressive color fields and experimental compositions.",
    artworks: [
      roomArtwork(
        "abstract-chromatic-drift",
        "Chromatic Drift",
        "Marcus Chen",
        "2024",
        "Algorithmic abstraction",
        "Color bands migrate and dissolve across a simulated canvas.",
        images.featureCollections,
        0,
      ),
      roomArtwork(
        "abstract-digital-futures",
        "Digital Futures",
        "Marcus Chen",
        "2025",
        "Neural landscape",
        "Latent-space topographies translated into abstract terrain.",
        images.digitalFutures,
        1,
      ),
      roomArtwork(
        "abstract-echo",
        "Abstract Echo",
        "Elena Vasquez",
        "2024",
        "Mixed digital media",
        "Historic gestures transformed into computational mark-making.",
        images.abstractArt,
        2,
      ),
      roomArtwork(
        "abstract-spectrum-flow",
        "Spectrum Flow",
        "Amara Okafor",
        "2026",
        "Light and pigment simulation",
        "Prismatic trails bend through layered abstract forms.",
        images.featureGlobal,
        3,
      ),
      roomArtwork(
        "abstract-silent-fragments",
        "Silent Fragments",
        "James Whitfield",
        "2023",
        "Digital collage",
        "Fragmented planes arranged in meditative asymmetry.",
        images.featureStorytelling,
        4,
      ),
    ],
  },
  {
    id: "sculpture",
    title: "Sculpture Room",
    description: "Form, mass, and negative space captured through digital sculpture studies.",
    artworks: [
      roomArtwork(
        "sculpture-void-study",
        "Void Sculpture",
        "James Whitfield",
        "2023",
        "Photogrammetry sculpture",
        "Classical form eroded into a contemporary monument.",
        images.featureStorytelling,
        0,
      ),
      roomArtwork(
        "sculpture-chamber",
        "Sculpture Chamber",
        "James Whitfield",
        "2023",
        "Digital marble installation",
        "Monolithic forms arranged around a dramatic central axis.",
        images.sculptureHall,
        1,
      ),
      roomArtwork(
        "sculpture-suspended-mass",
        "Suspended Mass",
        "Elena Vasquez",
        "2025",
        "3D sculptural rendering",
        "A hovering form balanced by shadow and reflected light.",
        images.featurePurchasing,
        2,
      ),
      roomArtwork(
        "sculpture-column-study",
        "Column Study",
        "Amara Okafor",
        "2024",
        "Architectural sculpture study",
        "Vertical stone rhythm interpreted with digital atmosphere.",
        images.renaissance,
        3,
      ),
      roomArtwork(
        "sculpture-monolith-field",
        "Monolith Field",
        "Marcus Chen",
        "2026",
        "Parametric sculpture",
        "A field of sculpted solids staged in cinematic perspective.",
        images.exhibition,
        4,
      ),
    ],
  },
];

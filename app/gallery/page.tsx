import type { Metadata } from "next";
import dynamic from "next/dynamic";

const GalleryExperience = dynamic(
  () =>
    import("@/components/gallery/GalleryExperience").then(
      (m) => m.GalleryExperience,
    ),
  {
    loading: () => (
      <div
        className="flex min-h-[100svh] items-center justify-center bg-bg-deep"
        aria-busy
        aria-label="Loading gallery"
      >
        <div className="h-px w-24 animate-pulse bg-white/20" />
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "Gallery — Atelier Spatial Collection",
  description:
    "An immersive spatial gallery experience. Explore featured artworks in a cinematic digital museum.",
};

export default function GalleryPage() {
  return <GalleryExperience />;
}

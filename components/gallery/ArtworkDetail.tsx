"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { GalleryArtwork } from "@/lib/galleryArtworks";
import { artworkZoomEase } from "@/lib/motion";

interface ArtworkDetailProps {
  artwork: GalleryArtwork | null;
  onClose: () => void;
}

export function ArtworkDetail({ artwork, onClose }: ArtworkDetailProps) {
  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: artworkZoomEase }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-bg-deep/92 backdrop-blur-md"
            aria-label="Close artwork"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="artwork-title"
            className="relative z-10 grid w-full max-w-5xl gap-8 overflow-y-auto max-h-[90vh] lg:grid-cols-2 lg:gap-12"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.7, ease: artworkZoomEase }}
          >
            <div className="relative aspect-[4/5] w-full max-h-[50vh] lg:max-h-none overflow-hidden border border-white/10">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            <div className="flex flex-col justify-center min-w-0 px-1">
              <p className="type-label">Featured work</p>
              <h2
                id="artwork-title"
                className="mt-4 type-display-sm text-balance"
              >
                {artwork.title}
              </h2>
              <p className="mt-3 text-lg text-stone-secondary">
                {artwork.artist}
              </p>
              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex gap-4">
                  <dt className="type-caption w-16 shrink-0">Year</dt>
                  <dd className="text-stone-body">{artwork.year}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="type-caption w-16 shrink-0">Medium</dt>
                  <dd className="text-stone-body">{artwork.medium}</dd>
                </div>
              </dl>
              <p className="mt-8 type-editorial text-base leading-relaxed">
                {artwork.description}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" href="#">
                  Acquire artwork
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  Return to gallery
                </Button>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute -top-2 right-0 sm:-right-2 text-stone-muted hover:text-ivory text-sm tracking-wide"
              aria-label="Close"
            >
              Close ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

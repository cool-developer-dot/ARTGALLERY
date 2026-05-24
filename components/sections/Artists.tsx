"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArtworkFrame } from "@/components/ui/ArtworkFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { artists } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Artists() {
  return (
    <section id="artists" className="relative section-pad w-full overflow-hidden bg-bg-elevated">
      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12 text-center sm:mb-16 lg:mb-20"
        >
          <SectionLabel className="text-center">Featured artists</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-4 sm:mt-6 type-display max-w-2xl"
          >
            Masters of the digital canvas
          </motion.h2>
        </motion.div>

        <div className="grid-safe gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {artists.map((artist, index) => (
            <motion.article
              key={artist.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="min-w-0"
            >
              <ArtworkFrame
                src={artist.image}
                alt={artist.name}
                sizes="(max-width: 1024px) 50vw, 25vw"
                aspectClassName="aspect-[3/4]"
                imageClassName="grayscale-[0.25]"
                className="mb-6 sm:mb-8"
              />

              <div className="min-w-0 space-y-2">
                <p className="type-caption">{artist.specialty}</p>
                <h3 className="font-display text-xl sm:text-2xl text-ivory font-light text-balance">
                  {artist.name}
                </h3>
                <p className="text-sm leading-relaxed text-stone-body">
                  {artist.bio}
                </p>
              </div>

              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-sm text-stone-muted transition-colors hover:text-ivory"
              >
                View portfolio
                <span className="block h-px w-8 bg-white/20" />
              </a>
            </motion.article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

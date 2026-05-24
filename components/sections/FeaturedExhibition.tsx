"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArtworkFrame } from "@/components/ui/ArtworkFrame";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { images } from "@/lib/images";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function FeaturedExhibition() {
  return (
    <section
      id="exhibition"
      className="relative section-pad w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid-safe gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-center"
        >
          <motion.div variants={fadeUp} className="min-w-0 lg:col-span-5">
            <SectionLabel>Current exhibition</SectionLabel>
            <h2 className="mt-6 sm:mt-8 type-display">
              Luminous
              <br />
              <span className="text-stone-secondary italic">Horizons</span>
            </h2>
            <div className="mt-8 sm:mt-10 space-y-1">
              <p className="text-sm text-stone-secondary">
                Dr. Isabelle Fontaine
              </p>
              <p className="type-caption">
                Chief Curator, Digital Arts Institute
              </p>
            </div>
            <blockquote className="mt-10 sm:mt-12 border-l border-white/15 pl-5 sm:pl-6">
              <p className="type-editorial max-w-prose">
                Light becomes sculpture. Time becomes texture. In this
                exhibition, the boundary between observer and artwork dissolves.
              </p>
            </blockquote>
            <div className="mt-10 sm:mt-12">
              <Button variant="secondary" href="#">
                Explore exhibition
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative min-w-0 lg:col-span-7 overflow-hidden"
          >
            <ArtworkFrame
              src={images.exhibition}
              alt="Luminous Horizons exhibition"
              sizes="(max-width: 1024px) 100vw, 55vw"
              aspectClassName="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
              priority
            >
              <div className="pointer-events-none flex flex-col justify-end p-5 sm:p-8 lg:p-10">
                <div className="glass-panel inline-block max-w-full px-3 py-2 sm:px-4 sm:py-2 mb-4 w-fit">
                  <span className="type-label normal-case tracking-wide text-stone-secondary">
                    Now showing
                  </span>
                </div>
                <p className="font-display text-xl sm:text-2xl text-ivory font-light text-balance">
                  24 works · 3 virtual halls
                </p>
                <p className="mt-2 type-caption">Through December 2026</p>
              </div>
            </ArtworkFrame>

            <div className="pointer-events-none absolute -bottom-3 -right-3 -z-10 hidden h-full w-full border border-white/5 xl:block" />
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}

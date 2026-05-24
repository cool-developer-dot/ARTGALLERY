"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArtworkFrame } from "@/components/ui/ArtworkFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experienceFeatures } from "@/lib/data";
import { images } from "@/lib/images";
import {
  slideFromLeft,
  slideFromRight,
  staggerContainer,
} from "@/lib/motion";

export function VirtualExperience() {
  return (
    <section
      id="experience"
      className="relative section-pad w-full overflow-hidden bg-bg-base"
    >
      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid-safe items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20"
        >
          <motion.div variants={slideFromLeft} className="min-w-0">
            <SectionLabel>The experience</SectionLabel>
            <h2 className="mt-6 sm:mt-8 type-display">
              Walk through
              <br />
              <span className="text-stone-secondary italic">digital halls</span>
            </h2>
            <p className="mt-6 sm:mt-8 type-body-lg max-w-lg">
              Our virtual gallery isn&apos;t a slideshow—it&apos;s a spatial
              journey. Navigate cathedral-scale architecture and unlock stories
              embedded in every work.
            </p>

            <ul className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
              {experienceFeatures.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.8 }}
                  className="group flex min-w-0 items-start gap-3 sm:gap-4"
                >
                  <span className="mt-2 h-px w-5 shrink-0 bg-white/20 transition-all group-hover:w-8 group-hover:bg-white/40 sm:w-6" />
                  <span className="min-w-0 text-stone-body transition-colors group-hover:text-ivory">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            className="relative min-w-0 overflow-hidden"
          >
            <ArtworkFrame
              src={images.virtualExperience}
              alt="Virtual gallery walkthrough preview"
              sizes="(max-width: 1024px) 100vw, 50vw"
              aspectClassName="aspect-[4/3]"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute top-3 right-3 max-w-[min(100%,9rem)] glass-panel px-2.5 py-2 sm:top-5 sm:right-5 sm:max-w-none sm:px-4 sm:py-3"
              >
                <p className="type-label text-[0.625rem] sm:text-[0.6875rem]">
                  Live tour
                </p>
                <p className="mt-0.5 text-xs text-ivory sm:text-sm">
                  Hall 03 · Sculpture
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="pointer-events-none absolute bottom-3 left-3 max-w-[min(100%,10rem)] glass-panel px-3 py-2.5 sm:bottom-5 sm:left-5 sm:max-w-[13rem] sm:px-4 sm:py-3"
              >
                <p className="font-display text-lg text-ivory font-light sm:text-xl">
                  Neural Bloom
                </p>
                <p className="type-caption mt-0.5">Elena Vasquez · 2025</p>
              </motion.div>
            </ArtworkFrame>
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArtworkFrame } from "@/components/ui/ArtworkFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { features } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Features() {
  return (
    <section className="relative section-pad w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      <PageContainer className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 text-center sm:mb-20 lg:mb-24"
        >
          <SectionLabel className="text-center">Why Atelier</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-4 sm:mt-6 type-display max-w-2xl"
          >
            A gallery unlike any other
          </motion.h2>
        </motion.div>

        <div className="space-y-20 sm:space-y-24 lg:space-y-32">
          {features.map((feature, index) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={staggerContainer}
                className="grid-safe items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20"
              >
                <motion.div
                  variants={fadeUp}
                  className={`min-w-0 ${isReversed ? "lg:order-2" : ""}`}
                >
                  <ArtworkFrame
                    src={feature.image}
                    alt={feature.title}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
                  />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className={`min-w-0 ${isReversed ? "lg:order-1" : ""}`}
                >
                  <span className="font-display text-4xl text-white/[0.06] leading-none tabular-nums sm:text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 sm:mt-6 type-display-sm text-balance">
                    {feature.title}
                  </h3>
                  <p className="mt-4 sm:mt-6 type-body-lg">{feature.description}</p>
                  <div className="mt-8 h-px w-12 bg-white/15" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}

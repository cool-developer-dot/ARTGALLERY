"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-40 xl:py-48"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-surface to-bg-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
      <Particles count={12} />

      <PageContainer className="relative text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto min-w-0 max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="line-accent mx-auto mb-12 sm:mb-16 w-20 sm:w-24"
          />

          <motion.h2 variants={fadeUp} className="type-display">
            Begin your
            <br />
            <span className="text-stone-secondary italic font-light">
              virtual journey
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 sm:mt-10 type-body-lg max-w-md"
          >
            Explore a new era of digital exhibitions.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 sm:mt-12 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          >
            <Button
              variant="primary"
              href="/gallery"
              className="w-full justify-center sm:w-auto sm:min-w-[11rem]"
            >
              Enter gallery
            </Button>
            <Button
              variant="secondary"
              href="#"
              className="w-full justify-center sm:w-auto sm:min-w-[11rem]"
            >
              Book private tour
            </Button>
          </motion.div>
        </motion.div>
      </PageContainer>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

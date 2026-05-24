"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { stats } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Stats() {
  return (
    <section className="relative w-full overflow-hidden border-y border-white/5 bg-surface py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

      <PageContainer className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid-safe grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="min-w-0">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </PageContainer>
    </section>
  );
}

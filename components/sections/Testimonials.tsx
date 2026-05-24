"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useAutoRotate } from "@/hooks/useAutoRotate";
import { testimonials } from "@/lib/data";
import { artworkZoomEase, fadeUp, staggerContainer } from "@/lib/motion";

const INTERVAL_MS = 3000;

export function Testimonials() {
  const { index: activeIndex, goTo } = useAutoRotate(
    testimonials.length,
    INTERVAL_MS,
  );
  const active = testimonials[activeIndex];

  return (
    <section className="relative section-pad w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_65%)]" />

      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12 text-center sm:mb-16 lg:mb-20"
        >
          <SectionLabel className="text-center">Voices</SectionLabel>
          <motion.h2 variants={fadeUp} className="mx-auto mt-4 sm:mt-6 type-display max-w-2xl">
            Trusted by curators & collectors
          </motion.h2>
        </motion.div>

        <div className="relative mx-auto min-w-0 max-w-4xl">
          <div className="glass-panel relative flex min-h-[260px] flex-col justify-between overflow-hidden px-5 py-9 sm:min-h-[300px] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div
              className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              aria-hidden
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.85, ease: artworkZoomEase }}
                className="flex min-w-0 flex-1 flex-col justify-between"
              >
                <p className="type-editorial text-center text-balance px-1 sm:px-4">
                  &ldquo;{active.quote}&rdquo;
                </p>

                <footer className="mt-8 text-center sm:mt-10">
                  <p className="text-base text-ivory font-light sm:text-lg">
                    {active.author}
                  </p>
                  <p className="mt-2 type-caption">{active.role}</p>
                </footer>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
              <motion.div
                key={activeIndex}
                className="h-full origin-left bg-white/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
            {testimonials.map((item, i) => (
              <button
                key={item.author}
                type="button"
                aria-label={`View testimonial from ${item.author}`}
                aria-current={i === activeIndex ? "true" : undefined}
                onClick={() => goTo(i)}
                className="group flex flex-col items-center gap-2 p-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? "w-8 bg-ivory/80"
                      : "w-1.5 bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden min-w-0 grid-safe gap-5 xl:grid xl:grid-cols-3 xl:gap-6 xl:mt-16">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.author}
              animate={{
                opacity: i === activeIndex ? 1 : 0.35,
                y: i === activeIndex ? 0 : 4,
              }}
              transition={{ duration: 0.6, ease: artworkZoomEase }}
              className={`min-w-0 border p-5 transition-colors duration-500 ${
                i === activeIndex
                  ? "border-white/15 bg-white/[0.03]"
                  : "border-white/5 bg-transparent"
              }`}
            >
              <p className="text-sm leading-relaxed text-stone-body line-clamp-4">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-3 text-xs text-stone-muted truncate">
                {item.author}
              </p>
            </motion.div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

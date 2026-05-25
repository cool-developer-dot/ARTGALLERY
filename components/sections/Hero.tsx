"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { Particles } from "@/components/ui/Particles";
import { useMousePosition } from "@/hooks/useMousePosition";
import { heroSlides } from "@/lib/images";
import { fadeUp, staggerContainer } from "@/lib/motion";

function ArchitecturalArches() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.08]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="archGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4F1EA" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F4F1EA" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[200, 520, 840, 1160].map((cx, i) => (
        <ellipse
          key={cx}
          cx={cx}
          cy={900}
          rx={280 + i * 20}
          ry={650}
          fill="none"
          stroke="url(#archGrad)"
          strokeWidth="0.75"
        />
      ))}
      <path
        d="M0 400 Q720 200 1440 400"
        fill="none"
        stroke="rgba(244,241,234,0.08)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function Hero() {
  const { x, y } = useMousePosition();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 120]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <HeroBackground slides={heroSlides} />
      </motion.div>

      <motion.div
        style={{ x: x * 12, y: y * 10 }}
        className="absolute inset-0 hidden sm:block pointer-events-none"
      >
        <ArchitecturalArches />
      </motion.div>

      <motion.div
        style={{ x: x * -12, y: y * -8 }}
        className="pointer-events-none absolute top-1/4 left-1/4 h-48 w-48 sm:h-72 sm:w-72 xl:h-96 xl:w-96 rounded-full bg-white/[0.02] blur-[80px] sm:blur-[100px]"
      />
      <motion.div
        style={{ x: x * 15, y: y * 10 }}
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-40 w-40 sm:h-64 sm:w-64 xl:h-80 xl:w-80 rounded-full bg-white/[0.03] blur-[60px] sm:blur-[80px]"
      />

      <Particles count={16} />
      <div className="cinematic-vignette absolute inset-0 pointer-events-none" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-36 xl:pb-32 xl:pt-40"
      >
        <PageContainer>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="min-w-0 max-w-3xl xl:max-w-4xl"
          >
            <motion.p variants={fadeUp} className="type-label mb-6 sm:mb-8">
              Immersive digital exhibition
            </motion.p>

            <motion.h1 variants={fadeUp} className="type-hero">
              Art Reimagined
              <br />
              <span className="text-stone-secondary font-light italic">
                in Digital Space
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 sm:mt-8 max-w-lg text-base sm:type-body-lg leading-relaxed"
            >
              Step into a cinematic virtual gallery where technology,
              architecture, and artistic expression converge.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                variant="primary"
                href="/gallery"
                className="w-full sm:w-auto justify-center"
              >
                Explore gallery
              </Button>
              <Button
                variant="secondary"
                href="#experience"
                className="w-full sm:w-auto justify-center"
              >
                Watch experience
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
            </motion.div>
          </motion.div>
        </PageContainer>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-bg-deep to-transparent" />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface GalleryLightProps {
  parallaxX: number;
  parallaxY: number;
}

export function GalleryLight({ parallaxX, parallaxY }: GalleryLightProps) {
  const lx = parallaxX * 18;
  const ly = parallaxY * 14;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute h-[70%] w-[50%] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,241,234,0.5) 0%, transparent 70%)",
          left: `calc(20% + ${lx}px)`,
          top: `calc(10% + ${ly}px)`,
        }}
        animate={{ opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[50%] w-[40%] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,241,234,0.4) 0%, transparent 70%)",
          right: `calc(15% - ${lx * 0.5}px)`,
          bottom: `calc(20% - ${ly * 0.5}px)`,
        }}
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,rgba(5,5,5,0.5)_70%,rgba(5,5,5,0.95)_100%)]" />
    </div>
  );
}

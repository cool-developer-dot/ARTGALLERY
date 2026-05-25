"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function seeded(i: number, s: number) {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function GalleryAtmosphere() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/15"
          style={{
            left: `${Math.round(seeded(i, 1) * 1000) / 10}%`,
            top: `${Math.round(seeded(i, 2) * 1000) / 10}%`,
            width: `${Math.round((seeded(i, 3) * 1.2 + 0.4) * 100) / 100}px`,
            height: `${Math.round((seeded(i, 3) * 1.2 + 0.4) * 100) / 100}px`,
          }}
          animate={{
            y: [0, -20 - seeded(i, 4) * 15, 0],
            opacity: [0.03, 0.12, 0.03],
          }}
          transition={{
            duration: 8 + seeded(i, 5) * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: seeded(i, 6) * 3,
          }}
        />
      ))}
    </div>
  );
}

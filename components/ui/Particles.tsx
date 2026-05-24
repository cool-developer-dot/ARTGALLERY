"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function seeded(index: number, salt = 0) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Round to stable precision for consistent style strings */
function round(n: number, decimals = 2) {
  const p = 10 ** decimals;
  return Math.round(n * p) / p;
}

export function Particles({ count = 40 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${round(seeded(i, 1) * 100, 3)}%`,
        top: `${round(seeded(i, 2) * 100, 3)}%`,
        size: `${round(seeded(i, 3) * 1.5 + 0.5, 2)}px`,
        duration: round(seeded(i, 4) * 8 + 6, 2),
        delay: round(seeded(i, 5) * 4, 2),
      })),
    [count],
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {mounted &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.25, 0.05],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}

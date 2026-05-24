"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: 2500, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-ivory tabular-nums tracking-tight">
        <motion.span>{display}</motion.span>
        <span className="text-stone-secondary">{suffix}</span>
      </div>
      <p className="mt-4 type-caption tracking-wide">{label}</p>
    </div>
  );
}

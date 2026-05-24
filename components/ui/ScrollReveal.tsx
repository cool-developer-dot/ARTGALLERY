"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "article";
}

export function ScrollReveal({
  children,
  className = "",
  variants = fadeUp,
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

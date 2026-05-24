"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <motion.p variants={fadeUp} className={`type-label ${className}`}>
      {children}
    </motion.p>
  );
}

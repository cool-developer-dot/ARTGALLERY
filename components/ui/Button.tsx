"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  href = "#",
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-normal tracking-wide transition-all duration-500 overflow-hidden group";

  const variants = {
    primary:
      "bg-ivory text-bg-deep hover:bg-stone-secondary hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
    secondary:
      "border border-white/12 text-ivory hover:border-white/25 hover:bg-white/[0.04] bg-transparent",
    ghost:
      "text-stone-body hover:text-ivory px-0 py-2 border-b border-transparent hover:border-white/20 rounded-none",
  };

  const content = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon}
      </span>
    </>
  );

  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.a>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "Experience", href: "#experience" },
  { label: "Artists", href: "#artists" },
  { label: "Exhibitions", href: "#exhibition" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.08]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-bg-deep/85 backdrop-blur-xl"
      />
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
      />

      <nav className="site-container relative flex items-center justify-between py-5 sm:py-6">
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-white/15 transition-colors group-hover:border-white/30">
            <span className="font-display text-base text-ivory">A</span>
          </div>
          <span className="hidden font-display text-base tracking-[0.08em] text-ivory sm:block">
            Atelier
          </span>
        </a>

        <ul className="hidden min-w-0 items-center gap-6 lg:gap-8 xl:gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-stone-body transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-5 lg:gap-8 md:flex">
          <a
            href="#"
            className="text-sm text-stone-body transition-colors hover:text-ivory"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="border border-white/15 px-5 py-2.5 text-sm text-ivory transition-all hover:border-white/30 hover:bg-white/[0.04]"
          >
            Enter gallery
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block h-px w-6 bg-ivory transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ivory transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden border-t border-white/5 bg-bg-deep/95 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-6 px-6 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-stone-body"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="inline-block border border-white/15 px-5 py-3 text-sm text-ivory"
            >
              Enter gallery
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}

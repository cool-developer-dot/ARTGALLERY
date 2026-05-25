export const easeLuxury = [0.22, 1, 0.36, 1] as const;

/** Spring config for artwork hover interactions */
export const artworkSpring = {
  stiffness: 120,
  damping: 18,
  mass: 0.8,
} as const;

export const galleryPanSpring = {
  stiffness: 400,
  damping: 36,
  mass: 0.35,
} as const;

export const galleryZoomSpring = {
  stiffness: 460,
  damping: 40,
  mass: 0.3,
} as const;

export const artworkZoomEase = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: easeLuxury },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: easeLuxury },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: easeLuxury },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: easeLuxury },
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: easeLuxury },
  },
};

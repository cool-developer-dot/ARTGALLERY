/** Local optimized assets — same-origin, no external image latency */
const img = (file: string) => `/images/${file}`;

export const heroSlides = [
  img("hero-hall.jpg"),
  img("digital.jpg"),
  img("abstract.jpg"),
] as const;

export const images = {
  hero: heroSlides[0],
  exhibition: img("exhibition.jpg"),
  virtualExperience: img("experience.jpg"),
  sculptureHall: img("room-sculpture.jpg"),
  digitalFutures: img("room-digital.jpg"),
  renaissance: img("room-renaissance.jpg"),
  abstractArt: img("room-abstract.jpg"),
  featureNavigation: img("artwork-1.jpg"),
  featureCollections: img("artwork-2.jpg"),
  featureStorytelling: img("artwork-3.jpg"),
  featureGlobal: img("artwork-4.jpg"),
  featurePurchasing: img("artwork-5.jpg"),
  featureMobile: img("mobile.jpg"),
  artist1: img("artist-1.jpg"),
  artist2: img("artist-2.jpg"),
  artist3: img("artist-3.jpg"),
  artist4: img("artist-4.jpg"),
} as const;

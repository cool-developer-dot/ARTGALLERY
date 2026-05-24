import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturedExhibition } from "@/components/sections/FeaturedExhibition";

const VirtualExperience = dynamic(
  () =>
    import("@/components/sections/VirtualExperience").then((m) => m.VirtualExperience),
  { loading: () => <section className="min-h-[40vh]" aria-hidden /> },
);

const GalleryRooms = dynamic(
  () => import("@/components/sections/GalleryRooms").then((m) => m.GalleryRooms),
  { loading: () => <section className="min-h-[40vh]" aria-hidden /> },
);

const Artists = dynamic(
  () => import("@/components/sections/Artists").then((m) => m.Artists),
  { loading: () => <section className="min-h-[40vh]" aria-hidden /> },
);

const Features = dynamic(
  () => import("@/components/sections/Features").then((m) => m.Features),
  { loading: () => <section className="min-h-[40vh]" aria-hidden /> },
);

const Stats = dynamic(
  () => import("@/components/sections/Stats").then((m) => m.Stats),
  { loading: () => <section className="min-h-[20vh]" aria-hidden /> },
);

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { loading: () => <section className="min-h-[40vh]" aria-hidden /> },
);

const CTA = dynamic(
  () => import("@/components/sections/CTA").then((m) => m.CTA),
  { loading: () => <section className="min-h-[30vh]" aria-hidden /> },
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0 overflow-x-clip">
        <Hero />
        <FeaturedExhibition />
        <VirtualExperience />
        <GalleryRooms />
        <Artists />
        <Features />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

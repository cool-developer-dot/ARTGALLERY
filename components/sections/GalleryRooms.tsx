"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArtworkFrame } from "@/components/ui/ArtworkFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { galleryRooms } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function GalleryRooms() {
  return (
    <section id="gallery" className="relative section-pad w-full overflow-hidden">
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12 flex min-w-0 flex-col gap-6 sm:mb-16 lg:mb-20 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="min-w-0">
            <SectionLabel>Virtual halls</SectionLabel>
            <h2 className="mt-4 sm:mt-6 type-display">Gallery rooms</h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-sm shrink-0 text-stone-body"
          >
            Four architecturally distinct spaces—each designed as a destination
            within the museum.
          </motion.p>
        </motion.div>

        <div className="grid-safe gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
          {galleryRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`min-w-0 ${index % 3 === 0 ? "sm:col-span-2" : ""}`}
            >
              <ArtworkFrame
                href="/gallery"
                src={room.image}
                alt={room.title}
                sizes={
                  index % 3 === 0
                    ? "100vw"
                    : "(max-width: 768px) 100vw, 50vw"
                }
                aspectClassName={
                  index % 3 === 0
                    ? "aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9]"
                    : "aspect-[4/5] sm:aspect-[3/4]"
                }
              >
                <div className="pointer-events-none flex h-full min-w-0 flex-col justify-end p-5 sm:p-8 lg:p-10">
                  <span className="type-caption">
                    Hall {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 type-display-sm text-balance">
                    {room.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-stone-body">
                    {room.subtitle}
                  </p>
                </div>
              </ArtworkFrame>
            </motion.div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES, GALLERY_CATEGORIES, type GalleryCategory } from "@/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

/* ── Stagger variants ─────────────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
  exit:   { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1    },
  exit:    { opacity: 0, y: 8,  scale: 0.98 },
};

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);

  /* Filtered images */
  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory],
  );

  /* Lightbox helpers */
  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const goNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));

  return (
    <div className="px-8 md:px-14 lg:px-20 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">

        {/* ── Filter tabs ─────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={[
                  "relative font-jost text-[11px] tracking-widest uppercase px-5 py-[10px]",
                  "border transition-all duration-300",
                  isActive
                    ? "border-gold/50 text-cream bg-gold/[0.06]"
                    : "border-white/[0.07] text-body/50 hover:border-white/15 hover:text-body/80",
                ].join(" ")}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold/50"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                )}
              </button>
            );
          })}

          {/* Count badge */}
          <span className="ml-auto self-center font-jost text-body/30 text-[10px] tracking-widest uppercase hidden sm:block">
            {filtered.length}&nbsp;images
          </span>
        </div>

        {/* ── Masonry grid ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="columns-1 sm:columns-2 lg:columns-3 gap-[6px] md:gap-[8px]"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filtered.map((image, idx) => (
              <motion.div
                key={image.src}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative break-inside-avoid mb-[6px] md:mb-[8px] cursor-zoom-in overflow-hidden"
                onClick={() => openLightbox(idx)}
              >
                {/* Image — intrinsic aspect ratio */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={image.ratio === "tall" ? 1067 : image.ratio === "square" ? 800 : 534}
                  className="w-full h-auto block transition-transform duration-700 ease-out
                             group-hover:scale-[1.03]"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30
                               transition-all duration-500 ease-out
                               flex items-end p-5"
                >
                  {/* Expand icon */}
                  <div
                    className="ml-auto opacity-0 group-hover:opacity-100
                                translate-y-2 group-hover:translate-y-0
                                transition-all duration-400 ease-out"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/30 bg-charcoal/50
                                    flex items-center justify-center backdrop-blur-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        className="text-cream">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-jost text-body/30 text-sm tracking-widest uppercase">
              No images in this category
            </p>
          </div>
        )}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

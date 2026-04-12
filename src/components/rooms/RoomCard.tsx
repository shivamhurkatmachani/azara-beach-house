"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { RoomData } from "@/data/rooms";
import FeatureIcon from "./FeatureIcon";
import Lightbox from "./Lightbox";

interface Props {
  room:    RoomData;
  index:   number;
}

export default function RoomCard({ room, index }: Props) {
  const [lightboxOpen,  setLightboxOpen]  = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /* All images: main first, then gallery */
  const allImages = [room.mainImage, ...room.gallery];

  const openLightbox  = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevImage     = useCallback(() =>
    setLightboxIndex((c) => Math.max(0, c - 1)), []);

  const nextImage     = useCallback(() =>
    setLightboxIndex((c) => Math.min(allImages.length - 1, c + 1)), [allImages.length]);

  const jumpToImage   = useCallback((i: number) => setLightboxIndex(i), []);

  /* Alternating layout: even → image left, odd → image right */
  const isReversed = index % 2 === 1;

  /* How many gallery thumbs to show before "+N" */
  const THUMB_COUNT   = 4;
  const extraCount    = room.gallery.length - THUMB_COUNT;
  const thumbsToShow  = room.gallery.slice(0, THUMB_COUNT);

  return (
    <>
      {/* Divider between rooms */}
      {index > 0 && (
        <div className="h-px bg-white/[0.05] mx-8 md:mx-14 lg:mx-20" />
      )}

      <article
        id={room.id}
        className="py-20 md:py-32"
      >
        <div className={`flex flex-col lg:flex-row ${isReversed ? "lg:flex-row-reverse" : ""}`}>

          {/* ── Main image ──────────────────────────────────────── */}
          <motion.div
            className="lg:w-[55%] relative overflow-hidden cursor-zoom-in"
            style={{ minHeight: "min(70vw, 560px)" }}
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            onClick={() => openLightbox(0)}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out hover:scale-[1.02]">
              <Image
                src={room.mainImage}
                alt={`${room.name} — Azara Beach House`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent pointer-events-none" />

            {/* "View photos" hint on hover */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2
                            bg-charcoal/70 backdrop-blur-sm px-3 py-2
                            opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-cream/70">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="font-jost text-cream/70 text-[9px] tracking-widest uppercase">
                View Photos
              </span>
            </div>

            {/* Room index badge — top left */}
            <div className="absolute top-5 left-5 bg-charcoal/60 backdrop-blur-sm px-3 py-1.5">
              <p className="font-jost text-cream/50 text-[9px] tracking-widest uppercase">
                0{index + 1} &nbsp;/&nbsp; 05
              </p>
            </div>
          </motion.div>

          {/* ── Content ─────────────────────────────────────────── */}
          <motion.div
            className={[
              "lg:w-[45%] flex flex-col justify-center",
              "px-8 md:px-14 lg:px-12 xl:px-16",
              "pt-10 pb-10 md:pt-14 md:pb-14 lg:py-16",
            ].join(" ")}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}
          >

            {/* Deity origin */}
            <p className="font-jost text-gold/60 text-[9px] tracking-[0.35em] uppercase mb-4">
              {room.deityOrigin}
            </p>

            {/* Room name */}
            <h2 className="font-cormorant text-cream font-light tracking-luxury leading-[1.05]
                           text-4xl md:text-5xl lg:text-[3.2rem] mb-5">
              {room.name}
            </h2>

            {/* Hairline gold rule */}
            <motion.div
              className="w-10 h-px bg-gold/35 mb-7"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Editorial paragraph */}
            <p className="font-jost text-body text-sm leading-[2.05] tracking-[0.03em] mb-8">
              {room.editorial}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5 mb-10">
              {room.features.map((feat) => (
                <div key={feat.key} className="flex items-center gap-2.5">
                  <FeatureIcon featureKey={feat.key} />
                  <span className="font-jost text-body/65 text-[11px] tracking-[0.05em]">
                    {feat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Gallery thumbnails */}
            <div className="grid grid-cols-4 gap-1.5 mb-8">
              {thumbsToShow.map((img, i) => {
                const isLast    = i === THUMB_COUNT - 1 && extraCount > 0;
                const lightboxI = i + 1; /* offset by 1: main image is at [0] */

                return (
                  <button
                    key={i}
                    onClick={() => openLightbox(isLast ? lightboxI : lightboxI)}
                    aria-label={`View ${room.name} photo ${i + 2}`}
                    className="relative aspect-square overflow-hidden group"
                  >
                    <Image
                      src={img}
                      alt={`${room.name} detail ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 22vw, 10vw"
                    />

                    {/* +N overlay on last thumb */}
                    {isLast && (
                      <div className="absolute inset-0 bg-charcoal/65 flex items-center justify-center">
                        <span className="font-jost text-cream text-xs tracking-wider">
                          +{extraCount + 1}
                        </span>
                      </div>
                    )}

                    {/* Hover dim */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20
                                    transition-colors duration-300 pointer-events-none" />
                  </button>
                );
              })}
            </div>

          </motion.div>
        </div>
      </article>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          roomName={room.name}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          onJump={jumpToImage}
        />
      )}
    </>
  );
}

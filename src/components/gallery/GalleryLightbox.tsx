"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/data/gallery";

interface Props {
  images:   GalleryImage[];
  index:    number;
  onClose:  () => void;
  onPrev:   () => void;
  onNext:   () => void;
}

export default function GalleryLightbox({
  images, index, onClose, onPrev, onNext,
}: Props) {
  const image = images[index];

  /* Keyboard navigation */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const content = (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/96 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <p className="font-jost text-body/50 text-[10px] tracking-widest uppercase">
          {index + 1}&nbsp;/&nbsp;{images.length}
        </p>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-6 z-10 w-9 h-9 flex items-center justify-center
                   rounded-full border border-white/[0.08] text-body/60
                   hover:text-cream hover:border-white/20 transition-all duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        className="absolute left-4 md:left-8 z-10 w-11 h-11 flex items-center justify-center
                   rounded-full border border-white/[0.08] text-body/60
                   hover:text-cream hover:border-white/20 transition-all duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        className="absolute right-4 md:right-8 z-10 w-11 h-11 flex items-center justify-center
                   rounded-full border border-white/[0.08] text-body/60
                   hover:text-cream hover:border-white/20 transition-all duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={image.src}
          className="relative w-full h-full flex items-center justify-center px-16 md:px-24 py-20"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Alt caption */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center px-6"
        key={image.src + "-caption"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase max-w-xs">
          {image.alt}
        </p>
      </motion.div>
    </motion.div>
  );

  return createPortal(content, document.body);
}

"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  images:       string[];
  currentIndex: number;
  roomName:     string;
  onClose:      () => void;
  onPrev:       () => void;
  onNext:       () => void;
  onJump:       (i: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  roomName,
  onClose,
  onPrev,
  onNext,
  onJump,
}: LightboxProps) {

  /* Keyboard navigation */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const content = (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        className="fixed inset-0 z-[200] flex flex-col bg-[#080808]/98 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* ── Top bar ──────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center justify-between
                        px-6 md:px-10 py-5 border-b border-white/[0.05]">
          <div className="flex flex-col gap-0.5">
            <p className="font-cormorant text-cream/80 text-lg font-light tracking-luxury">
              {roomName}
            </p>
            <p className="font-jost text-body/35 text-[10px] tracking-widest uppercase">
              Azara Beach House
            </p>
          </div>

          <p className="font-jost text-body/40 text-xs tracking-[0.25em]">
            {pad(currentIndex + 1)} &nbsp;/&nbsp; {pad(images.length)}
          </p>

          {/* Close */}
          <button
            aria-label="Close lightbox"
            onClick={onClose}
            className="p-2 text-body/50 hover:text-cream transition-colors duration-200 rounded"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Main image area ───────────────────────────────────── */}
        <div
          className="flex-1 relative flex items-center justify-center min-h-0 px-12 md:px-20 py-4"
          onClick={onClose}           /* click backdrop to close */
        >
          {/* Prev arrow */}
          {currentIndex > 0 && (
            <button
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10
                         p-3 text-cream/40 hover:text-cream transition-colors duration-200
                         hover:bg-white/5 rounded-full"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={`${roomName} — image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Next arrow */}
          {currentIndex < images.length - 1 && (
            <button
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10
                         p-3 text-cream/40 hover:text-cream transition-colors duration-200
                         hover:bg-white/5 rounded-full"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Thumbnail strip ───────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-white/[0.05] py-4 px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-none justify-center">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => onJump(i)}
                aria-label={`Go to image ${i + 1}`}
                className={[
                  "relative flex-shrink-0 w-14 h-9 overflow-hidden transition-all duration-300",
                  i === currentIndex
                    ? "ring-1 ring-gold opacity-100"
                    : "opacity-25 hover:opacity-50",
                ].join(" ")}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

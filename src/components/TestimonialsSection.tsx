"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    text: "Mornings at Azara are nothing short of postcard-perfect. The calm, unhurried rhythm of the place makes it feel as if time slows down just for you.",
    source: "Guest",
    platform: "Booking.com",
  },
  {
    text: "A masterclass in design, with spacious rooms, a private pool, and direct beach access.",
    source: "Guest",
    platform: "TripAdvisor",
  },
  {
    text: "Beautifully decorated property with attention to detail. Cooperative and friendly staff.",
    source: "Guest",
    platform: "Justdial",
  },
] as const;

const INTERVAL = 5000;

export default function TestimonialsSection() {
  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const [dir,     setDir]       = useState(1);   // 1 = forward, -1 = back

  const advance = useCallback((next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  /* Auto-rotate */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % REVIEWS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="py-32 md:py-44 px-6 bg-[#0D0D0D] border-y border-white/[0.04]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

        {/* Section label */}
        <motion.p
          className="section-label mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          Guest Voices
        </motion.p>

        {/* Decorative opening quote */}
        <motion.div
          className="font-cormorant text-gold/15 select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(80px, 14vw, 140px)", marginBottom: "-0.35em", lineHeight: 1 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          aria-hidden
        >
          &ldquo;
        </motion.div>

        {/* Review carousel */}
        <div className="relative w-full min-h-[200px] md:min-h-[160px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={{
                enter: (d: number) => ({
                  opacity: 0,
                  y: d > 0 ? 18 : -18,
                }),
                center: {
                  opacity: 1,
                  y: 0,
                },
                exit: (d: number) => ({
                  opacity: 0,
                  y: d > 0 ? -18 : 18,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute inset-x-0"
            >
              <p className="font-cormorant italic text-cream/85 font-light leading-[1.75] tracking-[0.03em]
                            text-2xl md:text-3xl lg:text-[2rem] mb-8">
                {REVIEWS[current].text}
              </p>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-8 bg-gold/30 mb-4" />
                <p className="font-jost text-body/50 text-[10px] tracking-[0.3em] uppercase">
                  {REVIEWS[current].source}
                </p>
                <p className="font-jost text-gold/60 text-[9px] tracking-[0.25em] uppercase">
                  {REVIEWS[current].platform}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots + arrows */}
        <div className="flex items-center gap-6 mt-16">
          {/* Prev arrow */}
          <button
            aria-label="Previous review"
            onClick={() => advance((current - 1 + REVIEWS.length) % REVIEWS.length)}
            className="w-8 h-8 flex items-center justify-center border border-white/[0.1]
                       text-body/40 hover:text-cream hover:border-gold/40
                       transition-all duration-300 focus:outline-none"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                aria-label={`Review ${i + 1}`}
                onClick={() => advance(i)}
                className="h-px rounded-full transition-all duration-500 ease-out focus:outline-none"
                style={{
                  width: i === current ? "2rem" : "0.5rem",
                  backgroundColor:
                    i === current
                      ? "rgba(184,151,106,0.7)"
                      : "rgba(245,240,232,0.18)",
                }}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            aria-label="Next review"
            onClick={() => advance((current + 1) % REVIEWS.length)}
            className="w-8 h-8 flex items-center justify-center border border-white/[0.1]
                       text-body/40 hover:text-cream hover:border-gold/40
                       transition-all duration-300 focus:outline-none"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

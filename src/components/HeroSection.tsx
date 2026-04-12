"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* ── Ken Burns image ──────────────────────────────────── */}
      <div className="absolute inset-0 ken-burns">
        <Image
          src="/images/Pool_1.jpg"
          alt="Azara Beach House — infinity pool at dusk"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Gradient layering ────────────────────────────────── */}
      {/* Top: darkens sky so logo & navbar read clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-transparent to-transparent" />
      {/* Bottom: strong foundation for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-transparent" />
      {/* Warm centre vignette — adds depth, never cold */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 35%, rgba(10,10,10,0.45) 100%)",
        }}
      />

      {/* ── Content — bottom third ───────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-6 pb-[13vh]">

        {/* Eyebrow label */}
        <motion.p
          className="section-label flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
        >
          <span className="h-px w-8 bg-gold/50 inline-block" />
          Candolim, Goa
          <span className="h-px w-8 bg-gold/50 inline-block" />
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-cormorant text-cream font-light leading-[1.04]
                     text-[52px] sm:text-6xl md:text-7xl lg:text-[88px]
                     tracking-[0.05em] mb-6"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: "easeOut" }}
        >
          Where Time<br />Stands Still
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          className="font-jost text-body text-sm tracking-[0.12em] leading-loose mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          A 13,000 sq. ft. private villa, 300 metres from the Arabian Sea
        </motion.p>

        {/* Book Now CTA */}
        <motion.a
          href="/book"
          className="mb-8 inline-flex items-center gap-3 border border-gold/60 bg-gold/[0.08]
                     px-8 py-[14px] font-jost text-[11px] tracking-[0.25em] uppercase text-cream/90
                     hover:bg-gold/[0.18] hover:border-gold hover:text-cream
                     transition-all duration-300"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
        >
          Book Now
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
        >
          <span className="font-jost text-cream/35 text-[9px] tracking-[0.4em] uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-12 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(184,151,106,0.65), transparent)",
            }}
            animate={{
              scaleY: [0.3, 1, 0.3],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

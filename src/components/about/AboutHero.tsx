"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] overflow-hidden">

      {/* ── Ken Burns background ──────────────────────────────── */}
      <div className="absolute inset-0 ken-burns">
        <Image
          src="/images/AZARA_ENTRANCE.jpg"
          alt="Azara Beach House — main entrance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Overlays ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/88" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, rgba(10,10,10,0.4) 100%)",
        }}
      />

      {/* ── Content — left-aligned, bottom ───────────────────── */}
      <div className="absolute inset-x-0 bottom-0 px-8 md:px-14 lg:px-20 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto">

          <motion.p
            className="section-label mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            Our Story
          </motion.p>

          <motion.h1
            className="font-cormorant text-cream font-light tracking-[0.06em] leading-[1.04]
                       text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.38, ease: "easeOut" }}
          >
            The Story<br />of Azara
          </motion.h1>

        </div>
      </div>
    </section>
  );
}

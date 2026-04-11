"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function RoomsHero() {
  return (
    <section className="relative overflow-hidden" style={{ height: "50vh", minHeight: "360px" }}>

      {/* Ken Burns background */}
      <div className="absolute inset-0 ken-burns">
        <Image
          src="/images/LIVING ROOM_3.jpg"
          alt="Azara Beach House — living room"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/25 to-charcoal/90" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, rgba(10,10,10,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 px-8 md:px-14 lg:px-20 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">

          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Accommodations
          </motion.p>

          <motion.h1
            className="font-cormorant text-cream font-light tracking-[0.06em] leading-[1.04]
                       text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.38, ease: "easeOut" }}
          >
            Five Sanctuaries
          </motion.h1>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const FEATURES = [
  { value: "13,000", label: "Square Feet" },
  { value: "1",      label: "Infinity Pool"  },
  { value: "300m",   label: "from the Sea" },
  { value: "1",      label: "Outdoor Pavilion" },
] as const;

export default function LuxuryNature() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax: image moves subtly slower than scroll */
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={sectionRef} id="nature" className="border-t border-white/[0.04]">

      {/* ── Text block ──────────────────────────────────────── */}
      <div className="px-8 md:px-14 lg:px-20 py-28 md:py-44">
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <motion.p
            className="section-label mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            03 &nbsp;/&nbsp; The Landscape
          </motion.p>

          {/* Heading + text, 2-col on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-14 md:gap-20 items-start">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <h2 className="font-cormorant text-cream font-light tracking-luxury leading-[1.06]
                             text-4xl md:text-5xl lg:text-[3.5rem]">
                Where Luxury<br />
                <em className="not-italic text-cream/75">Meets Nature</em>
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            >
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em]">
                Azara&apos;s 13,000 square feet are divided in an unusual proportion: roughly half
                interior, half exterior. The garden is not an afterthought. It is an argument —
                a considered position on what a property in coastal Goa can and should be.
              </p>
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em]">
                Water features thread through the landscape. The outdoor pavilion sits at the
                heart of the property — framed by tropical foliage, open to the evening air,
                designed for long nights with nothing to do. Lush greenery at every turn creates
                a sense of being held, rather than housed.
              </p>
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em]">
                Two pools, each with their own character. The main chevron-tiled pool belongs to
                daytime: expansive, luminous, designed for open-air hours. The rooftop pool
                belongs to the night — smaller, stiller, open to the stars.
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Full-bleed parallax image ─────────────────────── */}
      <div className="relative h-[65vh] md:h-[75vh] overflow-hidden">

        <motion.div
          className="absolute inset-0"
          style={{ y, scale: 1.13 }}
        >
          <Image
            src="/images/Pool_3.jpg"
            alt="Azara Beach House — pool and gardens"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Subtle framing overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 to-charcoal/25" />

        {/* Bottom right: image note */}
        <div className="absolute bottom-6 right-8 md:right-14">
          <p className="font-jost text-cream/25 text-[9px] tracking-widest uppercase">
            The Main Pool &middot; Candolim
          </p>
        </div>
      </div>

      {/* ── Feature stats strip ──────────────────────────── */}
      <div className="px-8 md:px-14 lg:px-20 py-16 md:py-20 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0
                        md:divide-x md:divide-white/[0.05]">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.label}
              className="flex flex-col items-center text-center gap-2 md:px-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: "easeOut" }}
            >
              <div className="w-6 h-px bg-gold/30 mb-2" />
              <p className="font-cormorant text-cream text-4xl font-light leading-none tracking-wide">
                {feat.value}
              </p>
              <p className="font-jost text-body/45 text-[9px] tracking-[0.28em] uppercase">
                {feat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

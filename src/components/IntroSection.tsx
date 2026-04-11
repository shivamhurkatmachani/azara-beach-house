"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function IntroSection() {
  /* Ref on the whole section drives the parallax progress */
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * As the section travels from below-viewport (0) to above-viewport (1)
   * the image shifts from slightly low to slightly high — classic parallax.
   * The image is scaled 1.15× so ±30px of movement stays within bounds.
   */
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={sectionRef} id="villa">
      <section className="py-28 md:py-44 px-8 md:px-14 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-28 items-center">

          {/* ── Left: Text ───────────────────────────────────── */}
          <div className="flex flex-col gap-7 md:gap-8">

            <motion.p
              className="section-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              The Villa
            </motion.p>

            <motion.h2
              className="font-cormorant text-cream font-light leading-[1.1] tracking-luxury
                         text-4xl md:text-5xl lg:text-[3.5rem]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
            >
              A Poem in Concrete,<br />
              <em className="not-italic text-cream/75">Marble &amp; Wood</em>
            </motion.h2>

            {/* Thin gold hairline */}
            <motion.div
              className="w-12 h-px bg-gold/35"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            />

            <motion.p
              className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em] max-w-[460px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Tucked quietly in the quaint Goan village of Candolim, Azara is a
              sprawling standalone villa that offers a presidential suite experience
              from the first instance. Swedish-inspired architecture meets old-world
              Goan charm across 13,000 square feet of uninhibited space, brimming
              with lush greenery and plush comforts.
            </motion.p>

            {/* Discover More CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <Link
                href="#rooms"
                className="group inline-flex items-center gap-4 mt-2"
              >
                <span className="font-jost text-gold text-[10px] tracking-widest uppercase
                                 group-hover:text-cream transition-colors duration-300">
                  Discover More
                </span>
                <span
                  className="block h-px bg-gold/40 w-8
                             group-hover:w-14 group-hover:bg-cream/40
                             transition-all duration-500 ease-out"
                />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Parallax image ─────────────────────────── */}
          <motion.div
            className="relative h-[480px] md:h-[600px] lg:h-[680px] overflow-hidden"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Parallax image layer (scaled to allow movement headroom) */}
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, scale: 1.15 }}
            >
              <Image
                src="/images/Living Room_1.jpg"
                alt="Azara Beach House — living room"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Bottom-left corner accent — barely there, very luxury */}
            <div
              className="absolute bottom-0 left-0 w-14 h-14 pointer-events-none"
              style={{
                borderBottom: "1px solid rgba(184, 151, 106, 0.18)",
                borderLeft:   "1px solid rgba(184, 151, 106, 0.18)",
              }}
            />

            {/* Top-right corner accent */}
            <div
              className="absolute top-0 right-0 w-14 h-14 pointer-events-none"
              style={{
                borderTop:   "1px solid rgba(184, 151, 106, 0.12)",
                borderRight: "1px solid rgba(184, 151, 106, 0.12)",
              }}
            />
          </motion.div>

        </div>
      </section>
    </div>
  );
}

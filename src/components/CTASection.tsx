"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] md:min-h-[65vh] flex items-center justify-center">

      {/* ── Background image ────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src="/images/GAZEBO_1.jpg"
          alt="Azara Beach House — the gazebo"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Overlay layers ──────────────────────────────────── */}
      {/* Base dark */}
      <div className="absolute inset-0 bg-charcoal/72" />
      {/* Warm radial to avoid pure silhouette look */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(184,151,106,0.04) 0%, transparent 70%)",
        }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 110% at 50% 50%, transparent 40%, rgba(10,10,10,0.5) 100%)",
        }}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">

        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Reservations
        </motion.p>

        <motion.h2
          className="font-cormorant text-cream font-light tracking-[0.07em] leading-[1.04]
                     text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
        >
          Begin Your Escape
        </motion.h2>

        <motion.p
          className="font-jost text-body/55 text-xs tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          From ₹1,18,750 per night · inclusive of all taxes
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.38 }}
          className="mt-3"
        >
          <Link
            href="/contact"
            className="book-btn text-[11px] px-10 py-4 inline-block"
          >
            Check Availability
          </Link>
        </motion.div>

        {/* Thin decorative rule below button */}
        <motion.div
          className="flex items-center gap-5 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <div className="h-px w-10 bg-gold/20" />
          <p className="font-jost text-body/30 text-[9px] tracking-widest uppercase">
            Whole-villa bookings only
          </p>
          <div className="h-px w-10 bg-gold/20" />
        </motion.div>

      </div>
    </section>
  );
}

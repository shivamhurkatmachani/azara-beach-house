"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="border-b border-white/[0.04]">
      {/* ── Map embed ─────────────────────────────────────────── */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(320px, 50vw, 560px)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        {/* Grayscale filter wrapper */}
        <div
          className="absolute inset-0"
          style={{ filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
        >
          <iframe
            src="https://maps.google.com/maps?q=15.512323061130836,73.7674542669139&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Azara Beach House location map"
          />
        </div>

        {/* Thin top + bottom border overlay to blend edges */}
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-charcoal to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
      </motion.div>

      {/* ── Address strip + CTA ───────────────────────────────── */}
      <div className="px-8 md:px-14 lg:px-20 py-10 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Coordinates + address */}
          <div className="flex flex-col gap-1">
            <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase mb-1">
              15.5123° N, 73.7675° E
            </p>
            <p className="font-cormorant text-cream/80 italic font-light text-xl tracking-[0.04em]">
              Candolim, North Goa, India
            </p>
          </div>

          {/* Get Directions button */}
          <motion.a
            href="https://maps.app.goo.gl/DnHhpbVUk4ZZkPcW9"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-gold/40 px-7 py-[14px]
                       font-jost text-[11px] tracking-widest uppercase text-cream/80
                       hover:text-cream hover:border-gold hover:bg-gold/[0.06]
                       transition-all duration-300 self-start sm:self-auto"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {/* Map pin icon */}
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              className="text-gold/60 group-hover:text-gold transition-colors duration-300"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Get Directions
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

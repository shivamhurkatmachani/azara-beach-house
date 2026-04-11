"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* Reusable fade-up wrapper */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function BornFromVision() {
  return (
    <section className="py-28 md:py-44 px-8 md:px-14 lg:px-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ──────────────────────────────────── */}
        <div className="mb-16 md:mb-20 flex items-baseline justify-between">
          <FadeUp>
            <p className="section-label">01 &nbsp;/&nbsp; Born from a Vision</p>
          </FadeUp>
          <motion.div
            className="hidden md:block h-px flex-1 mx-10 bg-white/5"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </div>

        {/* ── Main grid: text left, image right ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[9fr_11fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: Text column ─────────────────────────────── */}
          <div className="flex flex-col gap-0">

            <FadeUp delay={0.05}>
              <h2 className="font-cormorant text-cream font-light tracking-luxury leading-[1.06]
                             text-5xl md:text-6xl lg:text-[3.75rem] mb-10">
                Born from<br />a Vision
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em] mb-8">
                Azara did not arrive fully formed. It grew — slowly, intentionally — out of a
                singular conviction: that somewhere in Candolim, a different kind of luxury was
                possible. Not the performative grandeur of resorts, but something quieter, more
                considered. A home that happens to be extraordinary.
              </p>
            </FadeUp>

            {/* Pull quote — the editorial moment */}
            <FadeUp delay={0.25}>
              <blockquote className="my-10 md:my-12 py-10 border-t border-b border-white/[0.07] relative">
                {/* Decorative gold rule */}
                <div className="absolute top-0 left-0 w-8 h-px bg-gold/40" />

                <p className="font-cormorant italic text-cream/80 text-2xl md:text-3xl
                               font-light leading-[1.65] tracking-[0.04em]">
                  &ldquo;Corridors of light surround every room. A placid black stone water
                  body surrounds most of the structure.&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <div className="h-px w-6 bg-gold/30" />
                  <p className="font-jost text-body/40 text-[9px] tracking-[0.3em] uppercase">
                    Azara, Candolim &middot; Goa
                  </p>
                </div>
              </blockquote>
            </FadeUp>

            <FadeUp delay={0.35}>
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em] mb-6">
                The brief to the architects was unusually restrained: respect the land, draw the
                light inward, let the building disappear into its surroundings. What emerged is a
                structure of quiet theatricality — one that reveals its true scale only to those
                who slow down enough to notice.
              </p>
            </FadeUp>

            <FadeUp delay={0.42}>
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em]">
                Every room is a study in restraint. Every corridor is a frame. The villa does not
                announce itself — it waits, patiently, to be understood.
              </p>
            </FadeUp>

          </div>

          {/* ── Right: Image ──────────────────────────────────── */}
          <motion.div
            className="relative h-[480px] md:h-[580px] lg:h-[700px] overflow-hidden"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/images/MAIN BUILDING_2.jpg"
              alt="Azara Beach House — main building"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Subtle image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />

            {/* Corner bracket */}
            <div
              className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
              style={{
                borderBottom: "1px solid rgba(184,151,106,0.16)",
                borderRight: "1px solid rgba(184,151,106,0.16)",
              }}
            />

            {/* Image caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-jost text-cream/30 text-[9px] tracking-widest uppercase">
                The Main Structure &middot; Candolim, Goa
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

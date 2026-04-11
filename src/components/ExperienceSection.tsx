"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CARDS = [
  {
    label: "Private Chef",
    desc: "From Goan seafood to global cuisine, crafted to your palate",
    image: "/images/FOOD_1.jpg",
    index: "01",
  },
  {
    label: "Two Infinity Pools",
    desc: "A rooftop pool under the stars and a chevron-tiled main pool",
    image: "/images/Pool_2.jpg",
    index: "02",
  },
  {
    label: "Steps from the Sea",
    desc: "300 metres to the golden sands of Candolim Beach",
    image: "/images/MAIN BUILDING_1.jpg",
    index: "03",
  },
] as const;

export default function ExperienceSection() {
  return (
    <section className="py-28 md:py-36 px-8 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ──────────────────────────────────── */}
        <div className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <p className="section-label">The Experience</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury leading-tight
                           text-4xl md:text-5xl">
              Curated, Not Catered
            </h2>
          </motion.div>

          <motion.p
            className="font-jost text-body/60 text-xs tracking-widest uppercase md:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every detail, considered
          </motion.p>
        </div>

        {/* ── Cards grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.14, duration: 1.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              /* whileHover transition needs to be specified on the element */
              className="group relative overflow-hidden h-[460px] md:h-[540px] lg:h-[600px] cursor-pointer block"
              style={{ transition: "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)" }}
            >
              <Link href="#amenities" className="absolute inset-0 z-20" aria-label={card.label} />

              {/* Image — scales on group-hover */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Gradient overlay — darkens on hover */}
              <div
                className="absolute inset-0 transition-all duration-500
                           bg-gradient-to-t from-charcoal/88 via-charcoal/20 to-charcoal/10
                           group-hover:from-charcoal/95 group-hover:via-charcoal/35"
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-9 z-10 pointer-events-none">
                {/* Top: index */}
                <p className="font-jost text-cream/30 text-[10px] tracking-widest uppercase self-end">
                  {card.index}
                </p>

                {/* Bottom: label + desc */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-cormorant text-cream font-light text-3xl md:text-[2rem] tracking-luxury leading-tight">
                    {card.label}
                  </h3>
                  <p className="font-jost text-body/70 text-sm tracking-[0.04em] leading-relaxed max-w-[280px]
                                transform transition-all duration-400
                                translate-y-1 opacity-70 group-hover:translate-y-0 group-hover:opacity-100">
                    {card.desc}
                  </p>
                  {/* Animated arrow */}
                  <span className="font-jost text-gold text-[10px] tracking-widest uppercase
                                   flex items-center gap-2 mt-1
                                   opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                                   transition-all duration-400">
                    View Amenities
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

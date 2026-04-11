"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ROOMS = [
  {
    name: "Ezili",
    image: "/images/EZILI_1.jpg",
    desc: "A sovereign suite",
  },
  {
    name: "Lir",
    image: "/images/LIR_1.jpg",
    desc: "Sea and silence",
  },
  {
    name: "Mazu",
    image: "/images/Mazu_1.jpg",
    desc: "The peaceful quarter",
  },
  {
    name: "Sujin",
    image: "/images/SUJIN_1.jpg",
    desc: "Still and serene",
  },
  {
    name: "Varuna",
    image: "/images/VARUNA_1.jpg",
    desc: "The ocean room",
  },
] as const;

export default function RoomsPreviewSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="rooms"
      className="pt-0 pb-28 md:pb-40 px-8 md:px-14 lg:px-20 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section heading ─────────────────────────────────── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 py-16 md:py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4">
            <p className="section-label">The Rooms</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury
                           text-4xl md:text-5xl leading-tight">
              Five Sanctuaries
            </h2>
          </div>

          <Link
            href="#contact"
            className="group inline-flex items-center gap-4 self-start md:self-auto mb-1"
          >
            <span className="font-jost text-body/60 text-[10px] tracking-widest uppercase
                             group-hover:text-cream transition-colors duration-300">
              View All Rooms
            </span>
            <span className="h-px w-6 bg-body/30 group-hover:w-10 group-hover:bg-cream/40
                             transition-all duration-500 ease-out" />
          </Link>
        </motion.div>

        {/* ── Room name selector ──────────────────────────────── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          {/* Horizontal scroll container */}
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-14 w-max md:w-auto">
              {ROOMS.map((room, i) => (
                <button
                  key={room.name}
                  className="relative shrink-0 group/name py-2 focus:outline-none"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  {/* Room name */}
                  <span
                    className={[
                      "font-cormorant font-light tracking-luxury leading-none block",
                      "text-4xl md:text-5xl lg:text-6xl",
                      "transition-colors duration-400",
                      active === i
                        ? "text-cream"
                        : "text-cream/25 hover:text-cream/55",
                    ].join(" ")}
                  >
                    {room.name}
                  </span>

                  {/* Sliding gold underline */}
                  {active === i && (
                    <motion.div
                      layoutId="room-underline"
                      className="absolute -bottom-0 left-0 right-0 h-px bg-gold/60"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Room image crossfade ────────────────────────────── */}
        <motion.div
          className="relative mt-8 md:mt-10 overflow-hidden h-[55vw] md:h-[58vh] lg:h-[65vh]
                     bg-warm-black max-h-[640px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
        >
          <AnimatePresence>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            >
              <Image
                src={ROOMS[active].image}
                alt={`${ROOMS[active].name} — Azara Beach House`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 85vw"
              />
              {/* Bottom gradient for room name overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Room name + desc overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-10 pb-8 md:pb-10 z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="flex items-end justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div>
                  <p className="font-jost text-cream/40 text-[9px] tracking-widest uppercase mb-1">
                    0{active + 1} / 05
                  </p>
                  <p className="font-cormorant text-cream text-2xl font-light tracking-luxury italic">
                    {ROOMS[active].desc}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {ROOMS.map((_, i) => (
                    <div
                      key={i}
                      className={[
                        "h-px transition-all duration-400",
                        i === active
                          ? "w-8 bg-gold/70"
                          : "w-3 bg-cream/20",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

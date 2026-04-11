"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const IMAGE_STRIP = [
  { src: "/images/LIVING ROOM_2.jpg",     label: "Living Room"     },
  { src: "/images/DINING AREA_1.jpg",     label: "Dining Area"     },
  { src: "/images/BAR AREA_1.jpg",        label: "Bar Area"        },
  { src: "/images/KITCHEN PRIVATE_1.jpg", label: "Private Kitchen" },
] as const;

export default function SwedishRoots() {
  return (
    <section className="bg-[#0D0D0D] border-t border-white/[0.04]">

      {/* ── Text block ──────────────────────────────────────── */}
      <div className="px-8 md:px-14 lg:px-20 pt-28 md:pt-40 pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto">

          {/* Section header row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-14 md:mb-18">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="section-label mb-6">02 &nbsp;/&nbsp; Design Philosophy</p>
              <h2 className="font-cormorant text-cream font-light tracking-luxury leading-[1.06]
                             text-4xl md:text-5xl lg:text-[3.5rem]">
                Swedish Roots,<br />
                <em className="not-italic text-cream/75">Goan Soul</em>
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6 md:pt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            >
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em]">
                When the first drawings took shape, the influence was unmistakably Nordic — clean
                planes, generous openings, a near-moral commitment to light and the unhurried
                enjoyment of space. But Candolim demanded something richer.
              </p>
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em]">
                Wooded ceilings carry the warmth of Scandinavian vernacular. Beneath them,
                hand-selected chandeliers refract afternoon light into gold. A curated art
                collection occupies the walls with the quiet authority of a private museum —
                each piece chosen to converse with the room it inhabits.
              </p>
              <p className="font-jost text-body text-sm leading-[2.1] tracking-[0.03em]">
                The outcome is a vocabulary no single culture owns — and a home that could
                exist, in exactly this form, nowhere else.
              </p>

              {/* Descriptor tags */}
              <div className="flex flex-wrap gap-5 mt-2 pt-6 border-t border-white/[0.06]">
                {["Wooded Ceilings", "Designer Chandeliers", "Curated Art", "Private Bar"].map((tag) => (
                  <span key={tag} className="font-jost text-body/45 text-[9px] tracking-[0.28em] uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Image strip — breaks to full width ──────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        {/* Scroll wrapper — horizontal on mobile, grid on desktop */}
        <div
          className="flex md:grid md:grid-cols-4 gap-[3px] overflow-x-auto md:overflow-x-visible
                     scrollbar-none"
        >
          {IMAGE_STRIP.map((img, i) => (
            <motion.div
              key={img.label}
              className="flex-shrink-0 flex flex-col gap-3
                         w-[72vw] md:w-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.9 }}
            >
              {/* Image */}
              <div className="relative h-[52vw] md:h-[28vw] lg:h-[26vw] overflow-hidden group">
                <Image
                  src={img.src}
                  alt={`Azara Beach House — ${img.label}`}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 72vw, 25vw"
                />
              </div>
              {/* Label */}
              <p className="font-jost text-body/35 text-[9px] tracking-[0.28em] uppercase
                            px-8 md:px-5 lg:px-6 pb-2 md:pb-0">
                {img.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom breathing room */}
      <div className="h-24 md:h-32" />
    </section>
  );
}

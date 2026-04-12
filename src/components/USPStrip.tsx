"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "5",      label: "Bedrooms"      },
  { value: "13,000", label: "Sq. Ft."       },
  { value: "1",      label: "Infinity Pool"  },
  { value: "300m",   label: "to the Beach"  },
  { value: "24 / 7", label: "Private Staff" },
];

export default function USPStrip() {
  return (
    <section
      aria-label="Key facts about Azara Beach House"
      className="border-y border-white/[0.05] bg-[#0D0D0D]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 md:divide-x md:divide-white/[0.05]">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={[
              "flex flex-col items-center justify-center py-12 px-6 text-center gap-3",
              // mobile: add top rule for rows 2+
              i >= 2 ? "border-t border-white/[0.05] md:border-t-0" : "",
            ].join(" ")}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: i * 0.09,
              duration: 1,
              ease: "easeOut",
            }}
          >
            {/* Thin gold rule above value */}
            <motion.div
              className="w-7 h-px bg-gold/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 + 0.3, duration: 0.7, ease: "easeOut" }}
            />

            {/* Number / value */}
            <p className="font-cormorant text-cream font-light leading-none tracking-wide
                          text-4xl md:text-[2.75rem] mt-1">
              {stat.value}
            </p>

            {/* Label */}
            <p className="font-jost text-body/50 text-[9px] tracking-[0.28em] uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

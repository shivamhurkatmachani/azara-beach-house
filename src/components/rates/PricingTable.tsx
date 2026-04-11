"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Season {
  name:      string;
  months:    string;
  base:      string;
  gst:       string;
  total:     string;
  minStay:   string;
  highlight: boolean;
}

const SEASONS: Season[] = [
  {
    name:      "Peak Season",
    months:    "December – January",
    base:      "₹1,18,750",
    gst:       "+₹21,375",
    total:     "₹1,40,125",
    minStay:   "5 nights",
    highlight: true,
  },
  {
    name:      "High Season",
    months:    "October – November, February",
    base:      "₹90,000",
    gst:       "+₹16,200",
    total:     "₹1,06,200",
    minStay:   "3 nights",
    highlight: false,
  },
  {
    name:      "Shoulder Season",
    months:    "March, September",
    base:      "₹70,000",
    gst:       "+₹12,600",
    total:     "₹82,600",
    minStay:   "2 nights",
    highlight: false,
  },
  {
    name:      "Off-Peak Season",
    months:    "April – August",
    base:      "₹55,000",
    gst:       "+₹9,900",
    total:     "₹64,900",
    minStay:   "2 nights",
    highlight: false,
  },
];

export default function PricingTable() {
  return (
    <section className="px-8 md:px-14 lg:px-20 py-16 md:py-24 border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto">

        {/* ── Intro ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            <p className="section-label mb-5">Pricing</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury
                           leading-[1.06] text-4xl md:text-5xl">
              Nightly Rates
            </h2>
            <motion.div
              className="mt-5 w-10 h-px bg-gold/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 md:pt-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.95, delay: 0.12, ease: "easeOut" }}
          >
            <p className="font-jost text-body/55 text-[13px] tracking-[0.03em] leading-loose">
              All rates are for the entire villa — private and exclusive to your group.
              Prices shown are per night for whole-villa occupancy.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-gold/30" />
              <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase">
                Maximum 10–12 guests · Whole-villa bookings only
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Column headers (desktop) ────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto]
                        gap-4 pb-4 border-b border-white/[0.06] mb-1">
          {["Season", "Base Rate / Night", "GST (18%)", "Total / Night", "Min. Stay"].map((h) => (
            <p key={h}
              className="font-jost text-body/30 text-[9px] tracking-widest uppercase">
              {h}
            </p>
          ))}
        </div>

        {/* ── Season rows ─────────────────────────────────────── */}
        <div>
          {SEASONS.map((season, i) => (
            <motion.div
              key={season.name}
              className={[
                "group relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto]",
                "gap-3 md:gap-4 py-7 md:py-6",
                "border-b border-white/[0.05] transition-colors duration-300",
                season.highlight
                  ? "md:border-l-[1.5px] md:border-l-gold/40 md:pl-6"
                  : "hover:border-white/[0.08]",
              ].join(" ")}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: "easeOut" }}
            >
              {/* Highlight background on hover */}
              <div className="absolute inset-0 bg-white/[0.015] opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 pointer-events-none" />

              {/* Season name */}
              <div className="flex flex-col gap-[3px]">
                <div className="flex items-center gap-3">
                  <p className="font-cormorant text-cream font-light text-xl tracking-[0.04em]">
                    {season.name}
                  </p>
                  {season.highlight && (
                    <span className="font-jost text-[8px] tracking-widest uppercase
                                     border border-gold/40 text-gold/70 px-2 py-[3px]">
                      Peak
                    </span>
                  )}
                </div>
                <p className="font-jost text-body/38 text-[10px] tracking-[0.05em]">
                  {season.months}
                </p>
                {/* Mobile: show all values inline */}
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mt-3 md:hidden">
                  <div>
                    <p className="font-jost text-body/30 text-[8px] tracking-widest uppercase mb-[2px]">Base</p>
                    <p className="font-jost text-cream/80 text-sm">{season.base}</p>
                  </div>
                  <div>
                    <p className="font-jost text-body/30 text-[8px] tracking-widest uppercase mb-[2px]">GST 18%</p>
                    <p className="font-jost text-body/55 text-sm">{season.gst}</p>
                  </div>
                  <div>
                    <p className="font-jost text-body/30 text-[8px] tracking-widest uppercase mb-[2px]">Total / night</p>
                    <p className="font-cormorant text-gold font-light italic text-lg">{season.total}</p>
                  </div>
                  <div>
                    <p className="font-jost text-body/30 text-[8px] tracking-widest uppercase mb-[2px]">Min. stay</p>
                    <p className="font-jost text-cream/60 text-[11px] tracking-wider">{season.minStay}</p>
                  </div>
                </div>
              </div>

              {/* Desktop columns */}
              <p className="hidden md:block font-jost text-cream/75 text-sm
                            tracking-[0.03em] self-center">
                {season.base}
              </p>
              <p className="hidden md:block font-jost text-body/45 text-sm
                            tracking-[0.03em] self-center">
                {season.gst}
              </p>
              <p className="hidden md:block font-cormorant text-gold font-light
                            italic text-xl self-center">
                {season.total}
              </p>
              <p className="hidden md:block font-jost text-body/45 text-[10px]
                            tracking-widest uppercase self-center whitespace-nowrap">
                {season.minStay}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Footer note ─────────────────────────────────────── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                     gap-6 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="font-jost text-body/35 text-[10px] tracking-wider leading-loose max-w-lg">
            All prices are indicative and subject to availability. Final rates confirmed at
            time of booking. A refundable security deposit is collected separately.
          </p>
          <Link
            href="/contact"
            className="book-btn self-start sm:self-auto shrink-0"
          >
            Check Availability
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Waves, Thermometer, Droplets, Bath, Dumbbell,
  ChefHat, Utensils, Wine, Umbrella, Flame,
  Bell, Sparkles, MapPin, Key, ShieldCheck,
  Maximize2, Leaf, Home, Wifi, Car,
  type LucideIcon,
} from "lucide-react";
import type { AmenityCategory } from "@/data/amenities";

/* ── Icon registry ──────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  "thermometer":  Thermometer,
  "waves":        Waves,
  "droplets":     Droplets,
  "bath":         Bath,
  "dumbbell":     Dumbbell,
  "chef-hat":     ChefHat,
  "utensils":     Utensils,
  "wine":         Wine,
  "umbrella":     Umbrella,
  "flame":        Flame,
  "bell":         Bell,
  "sparkles":     Sparkles,
  "map-pin":      MapPin,
  "key":          Key,
  "shield-check": ShieldCheck,
  "maximize2":    Maximize2,
  "leaf":         Leaf,
  "home":         Home,
  "wifi":         Wifi,
  "car":          Car,
};

interface Props {
  category: AmenityCategory;
  index:    number;
}

export default function AmenitySection({ category, index }: Props) {
  const isReversed = index % 2 === 1;

  return (
    <div
      id={category.id}
      className={[
        "flex flex-col lg:flex-row",
        isReversed ? "lg:flex-row-reverse" : "",
        "border-t border-white/[0.04]",
      ].join(" ")}
      style={{ minHeight: "clamp(480px, 60vh, 680px)" }}
    >
      {/* ── Photo column ──────────────────────────────────────── */}
      <motion.div
        className="group lg:w-[55%] relative overflow-hidden"
        style={{ minHeight: "min(70vw, 420px)" }}
        initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        {/* Image — zooms on hover */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>

        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />

        {/* Category number — top-left watermark */}
        <div className="absolute top-7 left-7 md:top-9 md:left-9">
          <p
            className="font-cormorant text-cream/10 font-light leading-none select-none"
            style={{ fontSize: "clamp(72px, 10vw, 120px)" }}
            aria-hidden
          >
            {category.number}
          </p>
        </div>

        {/* Bottom label strip */}
        <div className="absolute bottom-0 left-0 right-0 px-7 py-5 md:px-9 md:py-6
                        flex items-end justify-between">
          <div>
            <p className="font-cormorant text-cream/70 italic text-lg font-light tracking-[0.06em]">
              {category.tagline}
            </p>
          </div>
          <p className="font-jost text-cream/30 text-[9px] tracking-widest uppercase">
            {category.items.length}&nbsp;amenities
          </p>
        </div>
      </motion.div>

      {/* ── Content column ────────────────────────────────────── */}
      <div className="lg:w-[45%] flex flex-col justify-center
                      px-8 md:px-14 lg:px-12 xl:px-16
                      py-14 md:py-20 lg:py-16">

        {/* Header */}
        <motion.div
          className="mb-9"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="section-label mb-5">
            {category.number}&nbsp;&nbsp;/&nbsp;&nbsp;{category.name}
          </p>

          <h2 className="font-cormorant text-cream font-light tracking-luxury leading-[1.06]
                         text-4xl md:text-5xl">
            {category.name}
          </h2>

          {/* Animated gold rule */}
          <motion.div
            className="mt-5 w-10 h-px bg-gold/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.9, delay: 0.25 }}
          />
        </motion.div>

        {/* Amenity list */}
        <div>
          {category.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Home;

            return (
              <motion.div
                key={item.label}
                className="group flex items-start gap-5 py-4 border-b border-white/[0.05]
                           hover:border-gold/20 transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, x: isReversed ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 + 0.15, duration: 0.65, ease: "easeOut" }}
              >
                {/* Icon bubble */}
                <div
                  className="mt-[3px] flex-shrink-0 w-8 h-8 rounded-full
                              border border-white/[0.06] flex items-center justify-center
                              text-gold/50 group-hover:text-gold group-hover:border-gold/25
                              transition-all duration-300"
                >
                  <Icon size={13} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-[3px] min-w-0">
                  <p className="font-jost text-cream/80 text-[13px] tracking-[0.04em]
                                group-hover:text-cream transition-colors duration-300">
                    {item.label}
                  </p>
                  <p className="font-jost text-body/38 text-[10px] tracking-[0.05em] leading-snug">
                    {item.detail}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="ml-auto flex-shrink-0 self-center
                                text-gold/0 group-hover:text-gold/40
                                transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sub-footer note */}
        <motion.p
          className="font-jost text-body/30 text-[10px] tracking-wider uppercase mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Included in all villa bookings
        </motion.p>

      </div>
    </div>
  );
}

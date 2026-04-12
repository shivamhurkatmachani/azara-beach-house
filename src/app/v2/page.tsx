"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── Design tokens (light theme) ────────────────────────────── */
const C = {
  bg:        "#FAF8F5",   // warm white
  bgStrip:   "#F0EDE8",   // warm light gray — USP strip & testimonials
  heading:   "#1A1A1A",   // deep charcoal
  body:      "#4A4A4A",   // mid-gray body text
  gold:      "#B8976A",   // gold accent — unchanged
  cta:       "#1A3A2A",   // dark green CTA section bg
};

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Ken Burns image */}
      <div className="absolute inset-0 ken-burns">
        <Image
          src="/images/Pool_1.jpg"
          alt="Azara Beach House — infinity pool at dusk"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Gradients — fade to warm white at bottom instead of charcoal */}
      {/* Top: very subtle so logo/navbar (now light) doesn't need dark help */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-transparent" />
      {/* Bottom: fade to page bg color */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${C.bg} 0%, ${C.bg}99 12%, ${C.bg}55 28%, transparent 55%)`,
        }}
      />
      {/* Centre: very faint warm vignette, not dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      {/* Content — bottom third */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-6 pb-[13vh]">

        {/* Eyebrow */}
        <motion.p
          className="font-jost text-[9px] tracking-[0.3em] uppercase mb-7 flex items-center gap-4"
          style={{ color: C.gold }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
        >
          <span className="h-px w-8 inline-block" style={{ backgroundColor: `${C.gold}80` }} />
          Candolim, Goa
          <span className="h-px w-8 inline-block" style={{ backgroundColor: `${C.gold}80` }} />
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="font-cormorant font-light leading-[1.04]
                     text-[52px] sm:text-6xl md:text-7xl lg:text-[88px]
                     tracking-[0.05em] mb-6"
          style={{ color: C.heading }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: "easeOut" }}
        >
          Where Time<br />Stands Still
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="font-jost text-sm tracking-[0.12em] leading-loose mb-12"
          style={{ color: C.body }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          A 13,000 sq. ft. private villa, 300 metres from the Arabian Sea
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/book"
          className="mb-8 inline-flex items-center gap-3 px-8 py-[14px]
                     font-jost text-[11px] tracking-[0.25em] uppercase
                     transition-all duration-300"
          style={{
            border:  `1px solid ${C.gold}99`,
            color:   C.heading,
            background: `${C.gold}18`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = `${C.gold}30`;
            (e.currentTarget as HTMLElement).style.borderColor = C.gold;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = `${C.gold}18`;
            (e.currentTarget as HTMLElement).style.borderColor = `${C.gold}99`;
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
        >
          Book Now
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
        >
          <span className="font-jost text-[9px] tracking-[0.4em] uppercase"
            style={{ color: `${C.heading}55` }}>
            Scroll
          </span>
          <motion.div
            className="w-px h-12 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${C.gold}99, transparent)`,
            }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   USP STRIP
═══════════════════════════════════════════════════════════════ */
const STATS = [
  { value: "5",      label: "Bedrooms"      },
  { value: "13,000", label: "Sq. Ft."       },
  { value: "1",      label: "Infinity Pool" },
  { value: "300m",   label: "to the Beach"  },
  { value: "24 / 7", label: "Private Staff" },
];

function USPStrip() {
  return (
    <section
      aria-label="Key facts about Azara Beach House"
      style={{
        backgroundColor: C.bgStrip,
        borderTop:    `1px solid ${C.heading}0D`,
        borderBottom: `1px solid ${C.heading}0D`,
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5"
        style={{ borderLeft: "none" }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={[
              "flex flex-col items-center justify-center py-12 px-6 text-center gap-3",
              i > 0 ? "md:border-l" : "",
              i >= 2 ? "border-t md:border-t-0" : "",
            ].join(" ")}
            style={{
              borderColor: `${C.heading}0D`,
            }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.09, duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="w-7 h-px"
              style={{ backgroundColor: `${C.gold}55` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 + 0.3, duration: 0.7, ease: "easeOut" }}
            />
            <p className="font-cormorant font-light leading-none tracking-wide
                          text-4xl md:text-[2.75rem] mt-1"
              style={{ color: C.heading }}>
              {stat.value}
            </p>
            <p className="font-jost text-[9px] tracking-[0.28em] uppercase"
              style={{ color: `${C.body}99` }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTRO SECTION
═══════════════════════════════════════════════════════════════ */
function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={sectionRef} id="villa" style={{ backgroundColor: C.bg }}>
      <section className="py-28 md:py-44 px-8 md:px-14 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2
                        gap-16 md:gap-20 lg:gap-28 items-center">

          {/* Text */}
          <div className="flex flex-col gap-7 md:gap-8">
            <motion.p
              className="font-jost text-[9px] tracking-[0.3em] uppercase"
              style={{ color: C.gold }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              The Villa
            </motion.p>

            <motion.h2
              className="font-cormorant font-light leading-[1.1] tracking-[0.04em]
                         text-4xl md:text-5xl lg:text-[3.5rem]"
              style={{ color: C.heading }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
            >
              A Poem in Concrete,<br />
              <em className="not-italic" style={{ color: `${C.heading}99` }}>
                Marble &amp; Wood
              </em>
            </motion.h2>

            <motion.div
              className="w-12 h-px"
              style={{ backgroundColor: `${C.gold}55`, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            />

            <motion.p
              className="font-jost text-sm leading-[2.1] tracking-[0.03em] max-w-[460px]"
              style={{ color: C.body }}
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

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <Link href="#rooms" className="group inline-flex items-center gap-4 mt-2">
                <span className="font-jost text-[10px] tracking-widest uppercase
                                 transition-colors duration-300 group-hover:opacity-70"
                  style={{ color: C.gold }}>
                  Discover More
                </span>
                <span
                  className="block h-px transition-all duration-500 ease-out group-hover:w-14"
                  style={{
                    backgroundColor: `${C.gold}55`,
                    width: "2rem",
                  }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Parallax image */}
          <motion.div
            className="relative h-[480px] md:h-[600px] lg:h-[680px] overflow-hidden"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div className="absolute inset-0" style={{ y: imageY, scale: 1.15 }}>
              <Image
                src="/images/Living Room_1.jpg"
                alt="Azara Beach House — living room"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            {/* Corner accents */}
            <div className="absolute bottom-0 left-0 w-14 h-14 pointer-events-none"
              style={{ borderBottom: `1px solid ${C.gold}2E`, borderLeft: `1px solid ${C.gold}2E` }} />
            <div className="absolute top-0 right-0 w-14 h-14 pointer-events-none"
              style={{ borderTop: `1px solid ${C.gold}1E`, borderRight: `1px solid ${C.gold}1E` }} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE SECTION — cards stay dark (overlays on images)
═══════════════════════════════════════════════════════════════ */
const EXP_CARDS = [
  { label: "Private Chef",     desc: "From Goan seafood to global cuisine, crafted to your palate", image: "/images/FOOD_1.jpg",           index: "01" },
  { label: "Infinity Pool",    desc: "A rooftop infinity pool under the stars, plus a chevron-tiled main pool", image: "/images/Pool_2.jpg", index: "02" },
  { label: "Steps from the Sea", desc: "300 metres to the golden sands of Candolim Beach",           image: "/images/MAIN BUILDING_1.jpg",  index: "03" },
] as const;

function ExperienceSection() {
  return (
    <section className="py-28 md:py-36 px-8 md:px-14 lg:px-20"
      style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <p className="font-jost text-[9px] tracking-[0.3em] uppercase" style={{ color: C.gold }}>
              The Experience
            </p>
            <h2 className="font-cormorant font-light tracking-[0.04em] leading-tight
                           text-4xl md:text-5xl"
              style={{ color: C.heading }}>
              Curated, Not Catered
            </h2>
          </motion.div>
          <motion.p
            className="font-jost text-xs tracking-widest uppercase md:text-right"
            style={{ color: `${C.body}99` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every detail, considered
          </motion.p>
        </div>

        {/* Cards — dark overlays preserved so text stays readable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {EXP_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.14, duration: 1.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden h-[460px] md:h-[540px] lg:h-[600px] cursor-pointer block"
              style={{ transition: "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)" }}
            >
              <Link href="/amenities" className="absolute inset-0 z-20" aria-label={card.label} />

              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Image src={card.image} alt={card.label} fill
                  className="object-cover object-center" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>

              {/* Dark overlay — unchanged, keeps text legible */}
              <div className="absolute inset-0 transition-all duration-500
                              bg-gradient-to-t from-[#0A0A0A]/88 via-[#0A0A0A]/20 to-[#0A0A0A]/10
                              group-hover:from-[#0A0A0A]/95 group-hover:via-[#0A0A0A]/35" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-9 z-10 pointer-events-none">
                <p className="font-jost text-white/30 text-[10px] tracking-widest uppercase self-end">
                  {card.index}
                </p>
                <div className="flex flex-col gap-3">
                  <h3 className="font-cormorant text-white font-light text-3xl md:text-[2rem]
                                 tracking-[0.04em] leading-tight">
                    {card.label}
                  </h3>
                  <p className="font-jost text-white/70 text-sm tracking-[0.04em] leading-relaxed max-w-[280px]
                                transform transition-all duration-400
                                translate-y-1 opacity-70 group-hover:translate-y-0 group-hover:opacity-100">
                    {card.desc}
                  </p>
                  <span className="font-jost text-[10px] tracking-widest uppercase
                                   flex items-center gap-2 mt-1
                                   opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                                   transition-all duration-400"
                    style={{ color: C.gold }}>
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

/* ═══════════════════════════════════════════════════════════════
   ROOMS PREVIEW
═══════════════════════════════════════════════════════════════ */
const ROOMS = [
  { name: "Ezili",  image: "/images/EZILI_1.jpg",  desc: "A sovereign suite"    },
  { name: "Lir",    image: "/images/LIR_1.jpg",    desc: "Sea and silence"      },
  { name: "Mazu",   image: "/images/Mazu_1.jpg",   desc: "The peaceful quarter" },
  { name: "Sujin",  image: "/images/SUJIN_1.jpg",  desc: "Still and serene"     },
  { name: "Varuna", image: "/images/VARUNA_1.jpg", desc: "The ocean room"       },
] as const;

function RoomsPreviewSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="rooms"
      className="pt-0 pb-28 md:pb-40 px-8 md:px-14 lg:px-20"
      style={{
        backgroundColor: C.bg,
        borderTop: `1px solid ${C.heading}0A`,
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 py-16 md:py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4">
            <p className="font-jost text-[9px] tracking-[0.3em] uppercase" style={{ color: C.gold }}>
              The Rooms
            </p>
            <h2 className="font-cormorant font-light tracking-[0.04em]
                           text-4xl md:text-5xl leading-tight"
              style={{ color: C.heading }}>
              Five Sanctuaries
            </h2>
          </div>
          <Link href="#contact" className="group inline-flex items-center gap-4 self-start md:self-auto mb-1">
            <span className="font-jost text-[10px] tracking-widest uppercase
                             transition-colors duration-300 group-hover:opacity-60"
              style={{ color: C.body }}>
              View All Rooms
            </span>
            <span className="h-px w-6 transition-all duration-500 ease-out group-hover:w-10"
              style={{ backgroundColor: `${C.body}55` }} />
          </Link>
        </motion.div>

        {/* Room name selector */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-14 w-max md:w-auto">
              {ROOMS.map((room, i) => (
                <button
                  key={room.name}
                  className="relative shrink-0 py-2 focus:outline-none"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span
                    className="font-cormorant font-light tracking-[0.04em] leading-none block
                               text-4xl md:text-5xl lg:text-6xl transition-colors duration-400"
                    style={{
                      color: active === i ? C.heading : `${C.heading}30`,
                    }}
                  >
                    {room.name}
                  </span>
                  {active === i && (
                    <motion.div
                      layoutId="room-underline-v2"
                      className="absolute -bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: `${C.gold}99` }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Room image */}
        <motion.div
          className="relative mt-8 md:mt-10 overflow-hidden h-[55vw] md:h-[58vh] lg:h-[65vh] max-h-[640px]"
          style={{ backgroundColor: C.bgStrip }}
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
              {/* Keep dark gradient so room desc overlay stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/65 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Room info overlay */}
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
                  <p className="font-jost text-white/40 text-[9px] tracking-widest uppercase mb-1">
                    0{active + 1} / 05
                  </p>
                  <p className="font-cormorant text-white text-2xl font-light tracking-[0.04em] italic">
                    {ROOMS[active].desc}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {ROOMS.map((_, i) => (
                    <div
                      key={i}
                      className="h-px transition-all duration-400"
                      style={{
                        width: i === active ? "2rem" : "0.75rem",
                        backgroundColor: i === active ? `${C.gold}B3` : "rgba(255,255,255,0.25)",
                      }}
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

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
const REVIEWS = [
  { text: "Mornings at Azara are nothing short of postcard-perfect. The calm, unhurried rhythm of the place makes it feel as if time slows down just for you.", source: "Guest", platform: "Booking.com" },
  { text: "A masterclass in design, with spacious rooms, a private pool, and direct beach access.",                                                               source: "Guest", platform: "TripAdvisor" },
  { text: "Beautifully decorated property with attention to detail. Cooperative and friendly staff.",                                                              source: "Guest", platform: "Justdial"    },
] as const;

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [dir,     setDir]     = useState(1);

  const advance = useCallback((next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="py-32 md:py-44 px-6"
      style={{
        backgroundColor: C.bgStrip,
        borderTop:    `1px solid ${C.heading}08`,
        borderBottom: `1px solid ${C.heading}08`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

        <motion.p
          className="font-jost text-[9px] tracking-[0.3em] uppercase mb-12"
          style={{ color: C.gold }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          Guest Voices
        </motion.p>

        {/* Decorative quote mark */}
        <motion.div
          className="font-cormorant select-none pointer-events-none leading-none"
          style={{
            fontSize: "clamp(80px, 14vw, 140px)",
            marginBottom: "-0.35em",
            lineHeight: 1,
            color: `${C.gold}28`,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          aria-hidden
        >
          &ldquo;
        </motion.div>

        {/* Carousel */}
        <div className="relative w-full min-h-[200px] md:min-h-[160px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={{
                enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 18 : -18 }),
                center: { opacity: 1, y: 0 },
                exit:   (d: number) => ({ opacity: 0, y: d > 0 ? -18 : 18 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute inset-x-0"
            >
              <p className="font-cormorant italic font-light leading-[1.75] tracking-[0.03em]
                            text-2xl md:text-3xl lg:text-[2rem] mb-8"
                style={{ color: C.heading }}>
                {REVIEWS[current].text}
              </p>
              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-8 mb-4" style={{ backgroundColor: `${C.gold}55` }} />
                <p className="font-jost text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: `${C.body}BB` }}>
                  {REVIEWS[current].source}
                </p>
                <p className="font-jost text-[9px] tracking-[0.25em] uppercase"
                  style={{ color: `${C.gold}AA` }}>
                  {REVIEWS[current].platform}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-6 mt-16">
          <button
            aria-label="Previous review"
            onClick={() => advance((current - 1 + REVIEWS.length) % REVIEWS.length)}
            className="w-8 h-8 flex items-center justify-center transition-all duration-300 focus:outline-none"
            style={{
              border: `1px solid ${C.heading}1A`,
              color:  `${C.body}99`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${C.gold}66`;
              (e.currentTarget as HTMLElement).style.color = C.heading;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${C.heading}1A`;
              (e.currentTarget as HTMLElement).style.color = `${C.body}99`;
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                aria-label={`Review ${i + 1}`}
                onClick={() => advance(i)}
                className="h-px rounded-full transition-all duration-500 ease-out focus:outline-none"
                style={{
                  width: i === current ? "2rem" : "0.5rem",
                  backgroundColor: i === current ? `${C.gold}B3` : `${C.heading}25`,
                }}
              />
            ))}
          </div>

          <button
            aria-label="Next review"
            onClick={() => advance((current + 1) % REVIEWS.length)}
            className="w-8 h-8 flex items-center justify-center transition-all duration-300 focus:outline-none"
            style={{
              border: `1px solid ${C.heading}1A`,
              color:  `${C.body}99`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${C.gold}66`;
              (e.currentTarget as HTMLElement).style.color = C.heading;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${C.heading}1A`;
              (e.currentTarget as HTMLElement).style.color = `${C.body}99`;
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA SECTION — dark green background, cream text
═══════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section
      className="relative overflow-hidden min-h-[70vh] md:min-h-[65vh] flex items-center justify-center"
      style={{ backgroundColor: C.cta }}
    >
      {/* Background image with strong green overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/GAZEBO_1.jpg"
          alt="Azara Beach House — the gazebo"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Strong dark-green overlay so CTA bg color dominates */}
      <div className="absolute inset-0" style={{ backgroundColor: `${C.cta}E6` }} />

      {/* Subtle warm radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(184,151,106,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">

        <motion.p
          className="font-jost text-[9px] tracking-[0.3em] uppercase"
          style={{ color: `${C.gold}CC` }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Reservations
        </motion.p>

        <motion.h2
          className="font-cormorant font-light tracking-[0.07em] leading-[1.04]
                     text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]"
          style={{ color: "#F5F0E8" }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
        >
          Begin Your Escape
        </motion.h2>

        <motion.p
          className="font-jost text-xs tracking-[0.25em] uppercase"
          style={{ color: "rgba(245,240,232,0.55)" }}
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
            href="/book"
            className="inline-block px-10 py-4 font-jost text-[11px] tracking-widest uppercase
                       transition-all duration-300"
            style={{
              border: `1px solid ${C.gold}99`,
              color:  "#F5F0E8",
              background: `${C.gold}1A`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = C.gold;
              (e.currentTarget as HTMLElement).style.borderColor = C.gold;
              (e.currentTarget as HTMLElement).style.color = C.cta;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `${C.gold}1A`;
              (e.currentTarget as HTMLElement).style.borderColor = `${C.gold}99`;
              (e.currentTarget as HTMLElement).style.color = "#F5F0E8";
            }}
          >
            Check Availability
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-5 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <div className="h-px w-10" style={{ backgroundColor: `${C.gold}33` }} />
          <p className="font-jost text-[9px] tracking-widest uppercase"
            style={{ color: "rgba(245,240,232,0.30)" }}>
            Whole-villa bookings only
          </p>
          <div className="h-px w-10" style={{ backgroundColor: `${C.gold}33` }} />
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function V2Page() {
  return (
    <main style={{ backgroundColor: C.bg }}>
      <Hero />
      <USPStrip />
      <IntroSection />
      <ExperienceSection />
      <RoomsPreviewSection />
      <TestimonialsSection />
      <CTASection />

      {/* Anchor targets */}
      <div id="amenities" className="h-px" />
      <div id="gallery"   className="h-px" />
      <div id="location"  className="h-px" />
      <div id="contact"   className="h-px" />
    </main>
  );
}

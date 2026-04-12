"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Design tokens ──────────────────────────────────────────── */
const GOLD = "#B8976A";

/* ── Fade-up helper ─────────────────────────────────────────── */
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Activity data ──────────────────────────────────────────── */
type Vibe = "Adventure" | "Relaxation" | "Culture" | "Romance" | "Family";

interface Activity {
  name: string;
  desc: string;
  vibe: Vibe;
  duration: string;
  image: string;
  gradient: string;        // overlay tint
}

const VIBE_COLOR: Record<Vibe, string> = {
  Adventure:  "bg-sky-900/70 text-sky-300 border-sky-700/40",
  Relaxation: "bg-emerald-900/70 text-emerald-300 border-emerald-700/40",
  Culture:    "bg-amber-900/70 text-amber-300 border-amber-700/40",
  Romance:    "bg-rose-900/70 text-rose-300 border-rose-700/40",
  Family:     "bg-violet-900/70 text-violet-300 border-violet-700/40",
};

/* Section 1 */
const WATER: Activity[] = [
  {
    name: "Private Yacht Charter",
    desc: "Sail the Goan coastline at sunset with a private crew, champagne, and panoramic views of Fort Aguada",
    vibe: "Romance", duration: "4–6 hours",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=900&q=80",
    gradient: "from-slate-900 via-blue-950 to-slate-900",
  },
  {
    name: "Deep Sea Fishing",
    desc: "Head offshore with experienced fishermen for a catch of kingfish, barracuda, and red snapper",
    vibe: "Adventure", duration: "Full day",
    image: "https://plus.unsplash.com/premium_photo-1733306638917-e822483019cd?w=800&q=80",
    gradient: "from-blue-950 via-teal-950 to-blue-950",
  },
  {
    name: "Jet Skiing & Parasailing",
    desc: "Feel the rush at Candolim and Calangute beaches with world-class water sports",
    vibe: "Adventure", duration: "2–3 hours",
    image: "https://images.unsplash.com/photo-1583008585590-c4ed0010bed6?w=800&q=80",
    gradient: "from-cyan-950 via-blue-900 to-cyan-950",
  },
  {
    name: "Kayaking & Paddleboarding",
    desc: "Explore the calm backwaters of the Nerul River at your own pace",
    vibe: "Relaxation", duration: "Half day",
    image: "https://images.unsplash.com/photo-1580259150857-deec54905859?w=800&q=80",
    gradient: "from-teal-950 via-emerald-950 to-teal-950",
  },
  {
    name: "Scuba Diving",
    desc: "Discover Goa's underwater world at Grande Island with certified PADI instructors",
    vibe: "Adventure", duration: "Full day",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80",
    gradient: "from-blue-950 via-indigo-950 to-blue-950",
  },
];

/* Section 2 */
const SKY: Activity[] = [
  {
    name: "Paragliding at Arambol",
    desc: "Soar above the cliffs of North Goa with tandem paragliding over the Arabian Sea",
    vibe: "Adventure", duration: "2–3 hours",
    image: "https://images.unsplash.com/photo-1551891590-eeac39130199?w=800&q=80",
    gradient: "from-indigo-950 via-purple-950 to-blue-950",
  },
  {
    name: "Hot Air Balloon Rides",
    desc: "A bird's eye view of Goa's lush green landscapes at sunrise",
    vibe: "Romance", duration: "3–4 hours",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=900&q=80",
    gradient: "from-orange-950 via-amber-900 to-orange-950",
  },
];

/* Section 3 */
const LAND: Activity[] = [
  {
    name: "Luxury Casino Experience",
    desc: "Try your luck at Goa's premium floating casinos including Grand 7 Casino, minutes from Azara",
    vibe: "Romance", duration: "Evening",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=900&q=80",
    gradient: "from-rose-950 via-red-950 to-rose-950",
  },
  {
    name: "Old Goa Heritage Walk",
    desc: "Explore UNESCO World Heritage basilicas and 16th-century Portuguese architecture",
    vibe: "Culture", duration: "Half day",
    image: "https://plus.unsplash.com/premium_photo-1697730390320-8412ee5eae82?w=800&q=80",
    gradient: "from-amber-950 via-orange-950 to-yellow-950",
  },
  {
    name: "Dudhsagar Waterfall Trek",
    desc: "A jeep safari through the jungle to one of India's tallest waterfalls",
    vibe: "Adventure", duration: "Full day",
    image: "https://plus.unsplash.com/premium_photo-1732030992689-b215161ede41?w=800&q=80",
    gradient: "from-emerald-950 via-green-900 to-emerald-950",
  },
  {
    name: "Night Market & Flea Markets",
    desc: "Arpora Saturday Night Market and Anjuna Flea Market for local crafts, food, and live music",
    vibe: "Culture", duration: "Evening",
    image: "https://images.unsplash.com/photo-1526139334526-f591a54b477c?w=800&q=80",
    gradient: "from-amber-900 via-orange-900 to-amber-950",
  },
  {
    name: "Guided Cycling Tour",
    desc: "Ride through Goa's charming villages, paddy fields, and Latin Quarter of Fontainhas",
    vibe: "Culture", duration: "Half day",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=900&q=80",
    gradient: "from-green-950 via-teal-950 to-green-950",
  },
];

/* Section 4 */
const DINE: Activity[] = [
  {
    name: "Beach Shack Hopping",
    desc: "From Britto's to Thalassa, experience Goa's legendary beachside dining",
    vibe: "Relaxation", duration: "Half day",
    image: "https://images.unsplash.com/photo-1733411683500-50f83ca70a1b?w=800&q=80",
    gradient: "from-amber-900 via-yellow-900 to-orange-950",
  },
  {
    name: "Wine & Cocktail Tasting",
    desc: "Private tasting sessions at Goa's emerging wineries and craft cocktail bars",
    vibe: "Romance", duration: "2–3 hours",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80",
    gradient: "from-red-950 via-rose-900 to-red-950",
  },
  {
    name: "Sunset Cruise on the Mandovi",
    desc: "An evening cruise with live music, dinner, and views of Panaji's riverfront",
    vibe: "Romance", duration: "3–4 hours",
    image: "https://images.unsplash.com/photo-1585793753011-397e6e4668d6?w=800&q=80",
    gradient: "from-orange-950 via-red-900 to-purple-950",
  },
  {
    name: "Private Beach Bonfire",
    desc: "Arranged exclusively for Azara guests on a secluded stretch of Candolim Beach",
    vibe: "Romance", duration: "2–3 hours",
    image: "https://images.unsplash.com/photo-1625119161833-57f8a7009f7b?w=800&q=80",
    gradient: "from-red-950 via-orange-900 to-amber-950",
  },
];

/* ── Activity Card ──────────────────────────────────────────── */
function ActivityCard({
  activity,
  size = "normal",
  delay = 0,
}: {
  activity: Activity;
  size?: "featured" | "normal" | "large";
  delay?: number;
}) {
  const heightClass =
    size === "featured"
      ? "h-[500px] md:h-[560px]"
      : size === "large"
      ? "h-[420px] md:h-[480px]"
      : "h-[360px] md:h-[400px]";

  return (
    <FadeUp delay={delay}>
      <div
        className={[
          "group relative overflow-hidden cursor-default",
          heightClass,
          "transition-all duration-500 ease-out",
          "border border-white/[0.06]",
          "hover:-translate-y-2",
          "hover:border-[#B8976A]/40",
          "hover:shadow-[0_8px_40px_rgba(184,151,106,0.18)]",
        ].join(" ")}
      >
        {/* Background — image with gradient overlay */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <Image
            src={activity.image}
            alt={activity.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>

        {/* Overlay — always dark at bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10
                        group-hover:from-black/95 transition-all duration-500" />

        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        bg-gradient-to-br from-[#B8976A]/[0.04] to-transparent pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7 z-10">
          {/* Top: tags row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-jost text-[9px] tracking-widest uppercase px-2 py-[3px]
                             border rounded-full ${VIBE_COLOR[activity.vibe]}`}>
              {activity.vibe}
            </span>
          </div>

          {/* Bottom: name + desc + meta */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-cormorant font-light text-white leading-tight
                         text-[1.7rem] md:text-[2rem] tracking-[0.03em]
                         group-hover:text-[#F5EFE6] transition-colors duration-300"
            >
              {activity.name}
            </h3>
            <p className="font-jost text-white/60 text-[11px] leading-relaxed tracking-[0.03em]
                           max-w-[340px] translate-y-1 opacity-70
                           group-hover:opacity-100 group-hover:translate-y-0
                           transition-all duration-500">
              {activity.desc}
            </p>

            {/* Meta strip */}
            <div className="flex items-center gap-4 pt-1 border-t border-white/[0.08] mt-1">
              <MetaPill icon="clock" label={activity.duration} />
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function MetaPill({ icon, label }: { icon: "clock" | "map"; label: string }) {
  return (
    <div className="flex items-center gap-[5px]">
      {icon === "clock" ? (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          className="text-white/30 shrink-0">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          className="text-white/30 shrink-0">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      )}
      <span className="font-jost text-white/45 text-[9px] tracking-wider">{label}</span>
    </div>
  );
}

/* ── Section header ─────────────────────────────────────────── */
function SectionHeader({
  number,
  title,
  subtitle,
  delay = 0,
}: {
  number: string;
  title: string;
  subtitle?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay} className="mb-10 md:mb-14">
      <div className="flex items-start gap-6 md:gap-8">
        {/* Large serif number */}
        <div className="flex flex-col items-center pt-1">
          <span
            className="font-cormorant font-light text-gold/25 leading-none select-none"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
            aria-hidden
          >
            {number}
          </span>
          <div className="w-px flex-1 min-h-[2px] bg-gradient-to-b from-gold/25 to-transparent mt-1" />
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-gold/70">
            Curated Experience
          </p>
          <h2
            className="font-cormorant font-light text-cream leading-tight tracking-[0.04em]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="font-jost text-body/45 text-xs tracking-[0.06em] leading-relaxed mt-1 max-w-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ExperiencesPage() {
  return (
    <main className="bg-charcoal">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "55vh", minHeight: "380px" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/Pool_3.jpg"
            alt="Azara Beach House pool at dusk"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(13,13,13,0.5) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-8">
          <motion.p
            className="font-jost text-[9px] tracking-[0.35em] uppercase mb-5 flex items-center gap-4"
            style={{ color: `${GOLD}CC` }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <span className="h-px w-8 inline-block" style={{ backgroundColor: `${GOLD}60` }} />
            Azara Beach House
            <span className="h-px w-8 inline-block" style={{ backgroundColor: `${GOLD}60` }} />
          </motion.p>

          <motion.h1
            className="font-cormorant font-light text-cream leading-[1.04] tracking-[0.06em]
                       text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
          >
            Beyond the Villa
          </motion.h1>

          <motion.p
            className="font-jost text-body/70 text-xs md:text-sm tracking-[0.08em] leading-loose max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Curated experiences for the discerning traveler — from the Arabian Sea to the skies above Goa
          </motion.p>
        </div>
      </section>

      {/* ── EDITORIAL INTRO ────────────────────────────────────── */}
      <section className="px-8 md:px-14 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-end">
            <FadeUp>
              <p className="font-cormorant italic font-light text-cream/75 leading-[1.85] tracking-[0.03em]
                             text-xl md:text-2xl lg:text-[1.65rem] max-w-2xl">
                Goa is not just a destination — it is a state of being. From the salt-licked
                shores of Candolim to the spice-scented hills of the Western Ghats, every
                hour outside Azara holds the promise of something extraordinary.
              </p>
            </FadeUp>
            <FadeUp delay={0.15} className="shrink-0">
              <div className="flex flex-col items-start md:items-end gap-1">
                <div className="h-px w-12 bg-gold/30 mb-2" />
                <p className="font-jost text-[9px] tracking-[0.28em] uppercase text-body/40">
                  16 Curated Experiences
                </p>
                <p className="font-jost text-[9px] tracking-[0.28em] uppercase text-body/40">
                  Arranged by our Concierge
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 1 — ON THE WATER
      ════════════════════════════════════════════════════ */}
      <section className="px-8 md:px-14 lg:px-20 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">

          {/* Thin rule */}
          <div className="flex items-center gap-6 mb-12 md:mb-16">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="font-jost text-[8px] tracking-[0.35em] uppercase text-body/25">
              Section One
            </span>
            <div className="h-px w-16 bg-white/[0.05]" />
          </div>

          <SectionHeader
            number="01"
            title="On the Water"
            subtitle="The Arabian Sea is your playground. From dawn fishing runs to champagne sunsets aboard a private yacht."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WATER.map((a, i) => (
              <ActivityCard key={a.name} activity={a} size="normal" delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2 — IN THE SKY
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#080808] py-20 md:py-28 px-8 md:px-14 lg:px-20 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-6 mb-12 md:mb-16">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="font-jost text-[8px] tracking-[0.35em] uppercase text-body/25">
              Section Two
            </span>
            <div className="h-px w-16 bg-white/[0.05]" />
          </div>

          <SectionHeader
            number="02"
            title="In the Sky"
            subtitle="Altitude changes perspective. Leave the earth behind and see Goa as few ever do."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKY.map((a, i) => (
              <ActivityCard key={a.name} activity={a} size="normal" delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3 — ON LAND
      ════════════════════════════════════════════════════ */}
      <section className="px-8 md:px-14 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-6 mb-12 md:mb-16">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="font-jost text-[8px] tracking-[0.35em] uppercase text-body/25">
              Section Three
            </span>
            <div className="h-px w-16 bg-white/[0.05]" />
          </div>

          <SectionHeader
            number="03"
            title="On Land"
            subtitle="Goa's soul lives in its streets, its history, and the wild green interior beyond the coast."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LAND.map((a, i) => (
              <ActivityCard key={a.name} activity={a} size="normal" delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 4 — DINE & UNWIND
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#080808] py-20 md:py-28 px-8 md:px-14 lg:px-20 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-6 mb-12 md:mb-16">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="font-jost text-[8px] tracking-[0.35em] uppercase text-body/25">
              Section Four
            </span>
            <div className="h-px w-16 bg-white/[0.05]" />
          </div>

          <SectionHeader
            number="04"
            title="Dine & Unwind"
            subtitle="From bonfire evenings on a private beach to candlelit wine tastings — pleasure, curated."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DINE.map((a, i) => (
              <ActivityCard key={a.name} activity={a} size="normal" delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40 px-8 md:px-14 lg:px-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/GAZEBO_1.jpg"
            alt="Azara Beach House gazebo"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/80" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,151,106,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-7">
          <FadeUp>
            <h2 className="font-cormorant font-light text-cream leading-[1.06] tracking-[0.06em]
                           text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]">
              Goa Is Calling
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="h-px w-10 bg-gold/30" />
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="font-jost text-body/55 text-sm tracking-[0.06em] leading-loose max-w-md">
              From sunlit shores to starlit skies — the perfect Goan adventure begins at
              your doorstep. Come, discover a new routine.
            </p>
          </FadeUp>

          <FadeUp delay={0.28}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <a
                href="https://wa.me/919090407408"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 font-jost text-[11px]
                           tracking-widest uppercase transition-all duration-300
                           border border-[#25D366]/40 text-cream hover:bg-[#25D366]/10
                           hover:border-[#25D366]/70 min-w-[220px] justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>

              <Link
                href="/book"
                className="flex items-center gap-3 px-8 py-4 font-jost text-[11px]
                           tracking-widest uppercase transition-all duration-300 min-w-[220px] justify-center
                           border text-cream hover:bg-gold/[0.08] hover:border-gold"
                style={{ borderColor: `${GOLD}50` }}
              >
                Book Your Stay
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}

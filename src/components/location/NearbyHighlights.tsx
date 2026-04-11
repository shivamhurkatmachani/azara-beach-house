"use client";

import { motion } from "framer-motion";

const HIGHLIGHTS = [
  {
    name:     "Candolim Beach",
    distance: "300m",
    note:     "3-minute walk",
    icon:     "waves",
  },
  {
    name:     "Sinquerim Beach",
    distance: "1.2 km",
    note:     "4-minute drive",
    icon:     "waves",
  },
  {
    name:     "Fort Aguada",
    distance: "3.1 km",
    note:     "8-minute drive",
    icon:     "landmark",
  },
  {
    name:     "Chapora Fort",
    distance: "8.1 km",
    note:     "20-minute drive",
    icon:     "landmark",
  },
  {
    name:     "Panaji",
    distance: "12 km",
    note:     "Goa's capital city",
    icon:     "city",
  },
  {
    name:     "Manohar Airport (GOX)",
    distance: "25 km",
    note:     "approx. 35 mins",
    icon:     "plane",
  },
  {
    name:     "Dabolim Airport (GOI)",
    distance: "42 km",
    note:     "approx. 55 mins",
    icon:     "plane",
  },
] as const;

/* ── Minimal inline SVG icons ──────────────────────────────── */
function WavesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2.5" />
      <path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2.5" />
      <path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2.5" />
    </svg>
  );
}

function LandmarkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

function CityIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M3 21h18M9 8h1M9 12h1M9 16h1M15 8h1M15 12h1M15 16h1M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2C4.3 5.1 3.7 5.3 3.4 5.7l-.7.7c-.4.4-.4.9 0 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 4.3 5.3c.4.4.9.4 1.3 0l.7-.7c.4-.3.6-.9.5-1.4z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC> = {
  waves:    WavesIcon,
  landmark: LandmarkIcon,
  city:     CityIcon,
  plane:    PlaneIcon,
};

export default function NearbyHighlights() {
  return (
    <section className="px-8 md:px-14 lg:px-20 py-16 md:py-24 border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="section-label mb-4">Nearby</p>
          <h2 className="font-cormorant text-cream font-light tracking-luxury leading-[1.06]
                         text-4xl md:text-5xl">
            At Your Doorstep
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {HIGHLIGHTS.map((place, i) => {
            const Icon = ICON_MAP[place.icon];
            return (
              <motion.div
                key={place.name}
                className={[
                  "group flex items-center gap-5 py-6 md:py-7",
                  "border-b border-white/[0.05]",
                  /* Left + right inner borders on desktop grid */
                  i % 3 !== 2 ? "md:border-r md:border-white/[0.05]" : "",
                  i % 3 !== 0 ? "md:px-8 lg:px-10" : "md:pr-8 lg:pr-10",
                ].join(" ")}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.65, delay: i * 0.07, ease: "easeOut" }}
              >
                {/* Icon bubble */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full
                              border border-white/[0.06] flex items-center justify-center
                              text-gold/45 group-hover:text-gold group-hover:border-gold/25
                              transition-all duration-300"
                >
                  <Icon />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-jost text-cream/80 text-[13px] tracking-[0.04em]
                                group-hover:text-cream transition-colors duration-300">
                    {place.name}
                  </p>
                  <p className="font-jost text-body/38 text-[10px] tracking-[0.05em] mt-[3px]">
                    {place.note}
                  </p>
                </div>

                {/* Distance badge */}
                <div className="flex-shrink-0 text-right">
                  <p className="font-cormorant text-gold/70 font-light italic text-lg
                                group-hover:text-gold transition-colors duration-300 leading-none">
                    {place.distance}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

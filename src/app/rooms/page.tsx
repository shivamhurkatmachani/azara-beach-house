import type { Metadata } from "next";
import RoomsHero    from "@/components/rooms/RoomsHero";
import RoomCard     from "@/components/rooms/RoomCard";
import CTASection   from "@/components/CTASection";
import { ROOMS, SHARED_FEATURES } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Five Sanctuaries — Rooms at Azara Beach House",
  description:
    "Five suites named after water deities, each a private world of designer interiors, premium linens, and en-suite bathrooms. King and queen beds. Azara Beach House, Candolim Goa.",
};

export default function RoomsPage() {
  return (
    <main className="bg-charcoal">
      <RoomsHero />

      {/* ── Intro strip ─────────────────────────────────────── */}
      <div className="px-8 md:px-14 lg:px-20 py-16 md:py-20 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end gap-8 md:gap-0 md:justify-between">
          <p className="font-cormorant text-cream/70 italic font-light text-xl md:text-2xl
                        tracking-[0.04em] max-w-lg leading-relaxed">
            Each suite is named for a deity of the waters — a quiet acknowledgement that Azara,
            too, belongs to the sea.
          </p>
          <p className="font-jost text-body/40 text-[10px] tracking-widest uppercase">
            All suites include shared amenities
          </p>
        </div>
      </div>

      {/* ── Room cards ──────────────────────────────────────── */}
      <div>
        {ROOMS.map((room, i) => (
          <RoomCard key={room.id} room={room} index={i} />
        ))}
      </div>

      {/* ── Shared features strip ───────────────────────────── */}
      <div className="border-t border-white/[0.04] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-16 md:py-20">
          <p className="section-label mb-10">Included in every suite</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-4">
            {SHARED_FEATURES.map((feat) => (
              <div key={feat} className="flex items-start gap-2.5">
                <div className="w-px h-4 bg-gold/30 flex-shrink-0 mt-0.5" />
                <p className="font-jost text-body/60 text-xs tracking-[0.06em] leading-snug">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </main>
  );
}

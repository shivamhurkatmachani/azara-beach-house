import type { Metadata } from "next";
import AmenitiesHero   from "@/components/amenities/AmenitiesHero";
import AmenitySection  from "@/components/amenities/AmenitySection";
import CTASection      from "@/components/CTASection";
import { AMENITY_CATEGORIES } from "@/data/amenities";

export const metadata: Metadata = {
  title: "Amenities — Azara Beach House, Candolim Goa",
  description:
    "Infrared sauna, infinity pool, private chef, 24/7 butler service, and 13,000 sq. ft. of tropical grounds. Every amenity at Azara Beach House, Candolim Goa.",
};

export default function AmenitiesPage() {
  return (
    <main className="bg-charcoal">
      <AmenitiesHero />

      {/* ── Intro strip ─────────────────────────────────────── */}
      <div className="px-8 md:px-14 lg:px-20 py-14 md:py-20 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24
                        items-center">
          <p className="font-cormorant text-cream/70 italic font-light
                        text-xl md:text-2xl tracking-[0.04em] leading-[1.7]">
            Every detail at Azara has been considered twice. The amenities that follow
            are not features — they are intentions.
          </p>
          <div className="flex flex-col gap-3 md:pl-8 md:border-l md:border-white/[0.05]">
            <p className="font-jost text-body/50 text-xs tracking-wider leading-loose">
              Most amenities are included in your villa booking at no additional charge.
              Private Chef, bar service, car rental, and curated experiences are available
              at an additional cost. Your butler will arrange everything.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px w-6 bg-gold/30" />
              <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase">
                Whole-villa bookings only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category sections ───────────────────────────────── */}
      <div>
        {AMENITY_CATEGORIES.map((cat, i) => (
          <AmenitySection key={cat.id} category={cat} index={i} />
        ))}
      </div>

      {/* ── Closing note ────────────────────────────────────── */}
      <div className="border-t border-white/[0.04] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-16 md:py-20
                        flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="section-label">A note on service</p>
            <p className="font-cormorant text-cream/65 italic text-lg font-light tracking-[0.04em] max-w-lg">
              Your dedicated butler is available around the clock. Nothing is too
              small to ask. Nothing is too large to arrange.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:text-right">
            <p className="font-jost text-body/40 text-[10px] tracking-widest uppercase">
              Available 24 hours
            </p>
            <a
              href="https://wa.me/919090407408"
              target="_blank"
              rel="noopener noreferrer"
              className="font-jost text-gold text-sm tracking-[0.04em] hover:text-cream
                         transition-colors duration-300"
            >
              Contact via WhatsApp →
            </a>
          </div>
        </div>
      </div>

      <CTASection />
    </main>
  );
}

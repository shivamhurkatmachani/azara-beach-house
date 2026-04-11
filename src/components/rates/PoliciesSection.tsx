"use client";

import { motion } from "framer-motion";

/* ── What's included / excluded ─────────────────────────────── */
const INCLUDED = [
  { label: "Daily Housekeeping",    note: "Morning service · Evening turndown on request" },
  { label: "Electricity & Water",   note: "All utilities included, no hidden charges"      },
  { label: "Complimentary Breakfast", note: "Continental or Full English, served daily"   },
  { label: "High-Speed WiFi",       note: "Throughout the property, all indoor spaces"     },
  { label: "Private Parking",       note: "Secured, CCTV-monitored, multi-vehicle"        },
  { label: "Pool & Fitness Access", note: "Both pools · Sauna · Gym, all hours"           },
  { label: "Butler Service",        note: "24/7 dedicated butler for your stay"            },
  { label: "Welcome Hamper",        note: "Seasonal fruits · Artisanal snacks · Wine"     },
];

const EXCLUDED = [
  { label: "Private Chef",       note: "À la carte — arranged separately"            },
  { label: "Bar & Beverages",    note: "Curated spirits · Cocktail & mocktail menu"  },
  { label: "Airport Transfers",  note: "Available on request through concierge"      },
  { label: "Car Rental",         note: "Curated fleet · Chauffeurs available"        },
  { label: "Experiences",        note: "Boat trips, Spice tours, custom itineraries" },
];

/* ── Cancellation tiers ────────────────────────────────────── */
const CANCELLATION = [
  {
    window:  "60+ days before arrival",
    policy:  "Full refund",
    detail:  "100% of the booking amount returned within 5–7 business days.",
    good:    true,
  },
  {
    window:  "30–59 days before arrival",
    policy:  "50% refund",
    detail:  "Half the booking amount is retained as a non-refundable holding fee.",
    good:    false,
  },
  {
    window:  "Under 30 days",
    policy:  "No refund",
    detail:  "We strongly recommend travel insurance for peak-season bookings.",
    good:    false,
  },
];

/* ── Shared animation ─────────────────────────────────────── */
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function PoliciesSection() {
  return (
    <section className="px-8 md:px-14 lg:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-20 md:gap-28">

        {/* ── 1. Check-in / Check-out ──────────────────────────── */}
        <div>
          <FadeUp>
            <p className="section-label mb-5">Stay Details</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury
                           leading-[1.06] text-4xl md:text-5xl mb-5">
              Arrival & Departure
            </h2>
            <motion.div
              className="w-10 h-px bg-gold/40 mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px
                          bg-white/[0.04] border border-white/[0.04]">
            {[
              {
                label:  "Check-in",
                time:   "2:00 PM",
                note:   "Early check-in subject to availability. Luggage storage always available.",
              },
              {
                label:  "Check-out",
                time:   "11:00 AM",
                note:   "Late check-out until 2:00 PM available on request (subject to availability).",
              },
              {
                label:  "Occupancy",
                time:   "10–12",
                note:   "Maximum guests. Dedicated butler scales service to your group.",
              },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.1}>
                <div className="bg-charcoal px-8 py-9 flex flex-col gap-3 h-full">
                  <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase">
                    {item.label}
                  </p>
                  <p className="font-cormorant text-cream font-light text-4xl
                                tracking-[0.04em] italic leading-none">
                    {item.time}
                  </p>
                  <p className="font-jost text-body/45 text-[11px] tracking-[0.03em]
                                leading-loose mt-1">
                    {item.note}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── 2. Cancellation policy ───────────────────────────── */}
        <div className="border-t border-white/[0.04] pt-16 md:pt-20">
          <FadeUp>
            <p className="section-label mb-5">Cancellation</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury
                           leading-[1.06] text-4xl md:text-5xl mb-5">
              Cancellation Policy
            </h2>
            <motion.div
              className="w-10 h-px bg-gold/40 mb-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
            <p className="font-jost text-body/45 text-[12px] tracking-[0.03em]
                          leading-loose mb-10 max-w-xl">
              We understand that plans change. Our cancellation tiers are designed to
              be fair to both parties.
            </p>
          </FadeUp>

          <div className="flex flex-col">
            {CANCELLATION.map((tier, i) => (
              <FadeUp key={tier.window} delay={i * 0.1}>
                <div
                  className={[
                    "group flex flex-col md:flex-row md:items-start gap-5 md:gap-10",
                    "py-7 border-b border-white/[0.05]",
                    "hover:border-gold/15 transition-colors duration-300",
                  ].join(" ")}
                >
                  {/* Left: window */}
                  <div className="md:w-[220px] shrink-0">
                    <p className="font-jost text-body/40 text-[10px] tracking-widest uppercase">
                      {tier.window}
                    </p>
                  </div>

                  {/* Middle: policy verdict */}
                  <div className="flex-1 flex flex-col gap-[5px]">
                    <div className="flex items-center gap-3">
                      {/* Dot indicator */}
                      <div
                        className={[
                          "w-[5px] h-[5px] rounded-full shrink-0",
                          tier.good ? "bg-gold/60" : "bg-white/20",
                        ].join(" ")}
                      />
                      <p className={[
                        "font-cormorant font-light text-xl tracking-[0.04em]",
                        tier.good ? "text-cream" : "text-cream/65",
                      ].join(" ")}>
                        {tier.policy}
                      </p>
                    </div>
                    <p className="font-jost text-body/40 text-[11px] tracking-[0.03em]
                                  leading-loose pl-[17px]">
                      {tier.detail}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── 3. Security Deposit ──────────────────────────────── */}
        <div className="border-t border-white/[0.04] pt-16 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <FadeUp>
              <p className="section-label mb-5">Security Deposit</p>
              <h2 className="font-cormorant text-cream font-light tracking-luxury
                             leading-[1.06] text-4xl md:text-5xl mb-5">
                Refundable Deposit
              </h2>
              <motion.div
                className="w-10 h-px bg-gold/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: 0.9, delay: 0.2 }}
              />
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-6">
                {/* Deposit amount card */}
                <div className="border border-white/[0.07] bg-white/[0.02] px-7 py-7
                                flex items-baseline gap-4">
                  <p className="font-cormorant text-gold font-light italic
                                text-5xl leading-none">
                    ₹50,000
                  </p>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-jost text-body/50 text-[10px] tracking-widest uppercase">
                      Refundable
                    </p>
                    <p className="font-jost text-body/35 text-[9px] tracking-wider">
                      Collected at booking confirmation
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-4">
                  {[
                    "Fully refunded within 7 business days of check-out, pending property inspection.",
                    "A detailed inventory is provided at check-in. Any damages are assessed against deposit.",
                    "Deposit amount may vary for peak-season bookings or larger groups.",
                  ].map((note) => (
                    <div key={note} className="flex items-start gap-3">
                      <div className="mt-[6px] w-1 h-1 rounded-full bg-gold/40 shrink-0" />
                      <p className="font-jost text-body/40 text-[11px] tracking-[0.03em]
                                    leading-loose">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* ── 4. What's Included / Excluded ────────────────────── */}
        <div className="border-t border-white/[0.04] pt-16 md:pt-20">
          <FadeUp>
            <p className="section-label mb-5">Inclusions</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury
                           leading-[1.06] text-4xl md:text-5xl mb-5">
              What's Included
            </h2>
            <motion.div
              className="w-10 h-px bg-gold/40 mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20">
            {/* Included */}
            <div>
              <p className="font-jost text-body/30 text-[9px] tracking-widest uppercase
                            mb-5 pb-3 border-b border-white/[0.05]">
                Complimentary with every booking
              </p>
              <div className="flex flex-col">
                {INCLUDED.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4 py-4 border-b border-white/[0.04]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
                  >
                    {/* Gold check */}
                    <svg
                      width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className="text-gold/60 shrink-0 mt-[3px]"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-jost text-cream/80 text-[12px] tracking-[0.04em]">
                        {item.label}
                      </p>
                      <p className="font-jost text-body/35 text-[10px] tracking-[0.04em]">
                        {item.note}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Excluded / Add-ons */}
            <div className="mt-10 md:mt-0">
              <p className="font-jost text-body/30 text-[9px] tracking-widest uppercase
                            mb-5 pb-3 border-b border-white/[0.05]">
                Available at additional cost
              </p>
              <div className="flex flex-col">
                {EXCLUDED.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4 py-4 border-b border-white/[0.04]"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
                  >
                    {/* Plus icon */}
                    <svg
                      width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className="text-body/25 shrink-0 mt-[3px]"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-jost text-cream/60 text-[12px] tracking-[0.04em]">
                        {item.label}
                      </p>
                      <p className="font-jost text-body/30 text-[10px] tracking-[0.04em]">
                        {item.note}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-7 pl-4 border-l border-white/[0.06]">
                <p className="font-jost text-body/35 text-[10px] tracking-wider
                              leading-loose italic">
                  All add-on services are arranged through your dedicated butler.
                  No third-party vendors on property without prior approval.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. House Rules ───────────────────────────────────── */}
        <div className="border-t border-white/[0.04] pt-16 md:pt-20">
          <FadeUp>
            <p className="section-label mb-5">House Rules</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury
                           leading-[1.06] text-4xl md:text-5xl mb-5">
              A Few Guidelines
            </h2>
            <motion.div
              className="w-10 h-px bg-gold/40 mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                rule:   "No external guests",
                detail: "Only registered guests may access the property. Day visitors must be approved in advance.",
              },
              {
                rule:   "No events or parties",
                detail: "Private gatherings for registered guests only. No DJs, amplified sound after 10:00 PM.",
              },
              {
                rule:   "No smoking indoors",
                detail: "Dedicated outdoor smoking areas available. Violation incurs a ₹10,000 deep-clean charge.",
              },
              {
                rule:   "Pets on request",
                detail: "Well-behaved pets welcome with prior approval. A ₹5,000 pet deposit applies.",
              },
              {
                rule:   "Quiet hours",
                detail: "10:00 PM – 8:00 AM. Pool use, music, and outdoor activities to be mindful of neighbours.",
              },
              {
                rule:   "Property care",
                detail: "Guests are responsible for any damage beyond fair wear and tear during their stay.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.rule}
                className="group border border-white/[0.05] px-6 py-7
                           hover:border-white/[0.09] transition-colors duration-300"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
              >
                <div className="w-1 h-1 rounded-full bg-gold/40 mb-5" />
                <p className="font-jost text-cream/80 text-[12px] tracking-[0.04em] mb-2">
                  {item.rule}
                </p>
                <p className="font-jost text-body/38 text-[10px] tracking-[0.04em]
                              leading-loose">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

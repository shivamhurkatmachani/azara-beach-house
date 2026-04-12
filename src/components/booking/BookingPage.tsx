"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BookingCalendar from "./BookingCalendar";
import { calculatePricing, formatINR, fmtDate, toYMD, type DBSeasonRate } from "@/lib/pricing";

/* ─── Types ────────────────────────────────────────────────── */
type Step = "search" | "villa" | "guest" | "confirmation";
type PayOpt = "50" | "100";
type VillaTab = "rates" | "amenities" | "photos";

const COUNTRY_CODES = [
  { v: "+91", l: "🇮🇳 +91" }, { v: "+1",  l: "🇺🇸 +1"  },
  { v: "+44", l: "🇬🇧 +44" }, { v: "+971",l: "🇦🇪 +971" },
  { v: "+65", l: "🇸🇬 +65" }, { v: "+61", l: "🇦🇺 +61"  },
];

const VILLA_AMENITIES = [
  "Rooftop Infinity Pool", "Main Chevron Pool with Fountain",
  "Infrared Sauna (Full-spectrum)", "Hot Tub / Jacuzzi",
  "Fitness Center", "24/7 Butler Service",
  "Daily Housekeeping", "High-Speed WiFi",
  "Private Parking (CCTV)", "Outdoor Dining Pavilion",
  "BBQ & Grill Area", "Bar with Counter",
  "Tropical Gardens & Koi Pond", "Smart TV in all rooms",
  "Professional Kitchen", "Concierge & Travel Desk",
];

const VILLA_PHOTOS = [
  { src: "/images/Pool_1.jpg",          alt: "Infinity Pool" },
  { src: "/images/MAIN BUILDING_1.jpg", alt: "Main Building" },
  { src: "/images/GAZEBO_1.jpg",        alt: "Gazebo Pavilion" },
  { src: "/images/DINING AREA_1.jpg",   alt: "Alfresco Dining" },
  { src: "/images/Living Room_1.jpg",   alt: "Living Room" },
  { src: "/images/BAR AREA_1.jpg",      alt: "Bar Area" },
];

/* ─── Shared UI atoms ──────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-jost text-body/55 text-[9px] tracking-widest uppercase mb-2">
      {children}
    </p>
  );
}
function FieldWrap({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

const FIELD =
  "w-full bg-transparent border border-white/[0.2] px-4 py-[13px] " +
  "font-jost text-cream/90 text-[13px] tracking-[0.02em] placeholder:text-body/40 " +
  "focus:outline-none focus:border-gold/50 focus:text-cream transition-colors duration-300";

/* ─── Counter ──────────────────────────────────────────────── */
function Counter({
  label, value, min=0, max=12, onChange,
}: { label:string; value:number; min?:number; max?:number; onChange:(v:number)=>void }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/[0.06]">
      <div>
        <p className="font-jost text-cream/80 text-[13px] tracking-[0.02em]">{label}</p>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onChange(Math.max(min, value-1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center
                     text-cream/50 hover:text-cream hover:border-gold/40 disabled:opacity-20
                     transition-all duration-200">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </button>
        <span className="font-cormorant text-cream font-light text-xl w-6 text-center">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value+1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center
                     text-cream/50 hover:text-cream hover:border-gold/40 disabled:opacity-20
                     transition-all duration-200">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Section divider ──────────────────────────────────────── */
function SectionHeader({ number, title, sub }: { number: string; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-5 mb-8 md:mb-10">
      <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold/30
                      flex items-center justify-center">
        <span className="font-cormorant text-gold font-light text-lg leading-none">{number}</span>
      </div>
      <div>
        <h2 className="font-cormorant text-cream font-light text-2xl md:text-3xl
                       tracking-[0.04em] leading-tight">
          {title}
        </h2>
        {sub && <p className="font-jost text-body/40 text-[10px] tracking-wider mt-[2px]">{sub}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function BookingPage() {
  /* ── Search state ─────────────────────────────────────── */
  const [checkIn,  setCheckIn]  = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults,   setAdults]   = useState(2);
  const [children, setChildren] = useState(0);
  const [promo,    setPromo]    = useState("");
  const [blocked,  setBlocked]  = useState<string[]>([]);
  const [dbRates,  setDbRates]  = useState<DBSeasonRate[]>([]);
  const [step,     setStep]     = useState<Step>("search");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [promoApplied,   setPromoApplied]   = useState<{ code: string; discount: number } | null>(null);
  const [promoError,     setPromoError]     = useState<string | null>(null);
  const [promoLoading,   setPromoLoading]   = useState(false);

  /* ── Villa tab ────────────────────────────────────────── */
  const [villaTab, setVillaTab] = useState<VillaTab>("rates");

  /* ── Guest form ───────────────────────────────────────── */
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [cc,        setCC]        = useState("+91");
  const [phone,     setPhone]     = useState("");
  const [gst,       setGst]       = useState("");
  const [requests,  setRequests]  = useState("");
  const [payOpt,    setPayOpt]    = useState<PayOpt>("100");
  const [agreed,    setAgreed]    = useState(false);
  const [bookingRef,setBookingRef]= useState("");
  const [submitting,setSubmitting]= useState(false);

  /* ── Refs for scroll ──────────────────────────────────── */
  const villaRef  = useRef<HTMLDivElement>(null);
  const guestRef  = useRef<HTMLDivElement>(null);
  const confirmRef= useRef<HTMLDivElement>(null);

  /* ── Fetch blocked dates ──────────────────────────────── */
  useEffect(() => {
    fetch("/api/blocked-dates")
      .then(r => r.json())
      .then(d => setBlocked(d.blocked ?? []))
      .catch(() => {});
  }, []);

  /* ── Fetch season rates from DB ───────────────────────── */
  useEffect(() => {
    fetch(`/api/rates?t=${Date.now()}`, { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        console.log("[rates]", d);
        if (Array.isArray(d) && d.length > 0) setDbRates(d);
      })
      .catch(err => console.error("[rates error]", err));
  }, []);

  /* ── Derived pricing (uses DB rates when available) ──── */
  const pricing = useMemo(
    () => (checkIn && checkOut ? calculatePricing(checkIn, checkOut, dbRates) : null),
    [checkIn, checkOut, dbRates],
  );

  const discountedPricing = useMemo(() => {
    if (!pricing || !promoApplied) return null;
    const discountAmount = Math.round(pricing.baseTotal * (promoApplied.discount / 100));
    const discountedBase = pricing.baseTotal - discountAmount;
    const gstAmount      = Math.round(discountedBase * 0.18);
    const grandTotal     = discountedBase + gstAmount;
    return {
      ...pricing,
      discountAmount,
      discountedBase,
      gstAmount,
      grandTotal,
      halfPayNow: Math.round(grandTotal / 2),
    };
  }, [pricing, promoApplied]);

  /* ── Blocked check for selected range ────────────────── */
  const rangeHasBlocked = useMemo(() => {
    if (!checkIn || !checkOut) return false;
    const bs = new Set(blocked);
    const c = new Date(checkIn); c.setDate(c.getDate() + 1);
    while (c < checkOut) { if (bs.has(toYMD(c))) return true; c.setDate(c.getDate() + 1); }
    return false;
  }, [checkIn, checkOut, blocked]);

  /* ── Handlers ─────────────────────────────────────────── */
  function handleCalendarChange(ci: Date | null, co: Date | null) {
    setCheckIn(ci); setCheckOut(co);
  }

  function handleCheckAvailability() {
    if (!checkIn || !checkOut || rangeHasBlocked) return;
    setStep("villa");
    setTimeout(() => villaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  function handleSelectVilla() {
    setStep("guest");
    setTimeout(() => guestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  async function handleApplyPromo() {
    if (!promo.trim()) return;
    setPromoLoading(true);
    setPromoError(null);
    setPromoApplied(null);
    try {
      const res = await fetch(`/api/promo/validate?code=${encodeURIComponent(promo.trim())}`);
      const data = await res.json();
      if (data.valid) {
        setPromoApplied({ code: data.code, discount: data.discount });
      } else {
        setPromoError(data.error || "Invalid promo code");
      }
    } catch {
      setPromoError("Failed to validate promo code");
    } finally {
      setPromoLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed || !pricing || !checkIn || !checkOut) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn:         checkIn.toISOString(),
          checkOut:        checkOut.toISOString(),
          nights:          pricing.nights,
          adults,
          children,
          firstName,
          lastName,
          email,
          phone:           `${cc} ${phone}`,
          gstNumber:       gst || null,
          specialRequests: requests || null,
          promoCode:       promo || null,
          paymentOption:   payOpt,
          baseTotal:       (discountedPricing ?? pricing).baseTotal,
          gstAmount:       (discountedPricing ?? pricing).gstAmount,
          grandTotal:      (discountedPricing ?? pricing).grandTotal,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      if (!data.ref) throw new Error("No booking reference returned");

      setBookingRef(data.ref);
      setStep("confirmation");
      setTimeout(() => confirmRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or contact us on WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ══════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════ */
  return (
    <div className="bg-charcoal min-h-screen">

      {/* ── Sticky summary bar ──────────────────────────── */}
      <div className="sticky top-[76px] z-40 bg-[#1A1A1A] border-b border-white/[0.06]
                      shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-14 flex items-center gap-4 overflow-x-auto
                        scrollbar-none">
          {/* Logo text */}
          <span className="font-cormorant text-cream/90 font-light text-base tracking-[0.06em]
                           whitespace-nowrap shrink-0 hidden sm:block">
            Azara Beach House
          </span>
          <div className="hidden sm:block w-px h-4 bg-white/[0.1] shrink-0" />
          {/* Check-in */}
          <div className="flex flex-col shrink-0">
            <span className="font-jost text-body/35 text-[8px] tracking-widest uppercase">Check-in</span>
            <span className="font-jost text-cream/70 text-[11px]">
              {checkIn ? fmtDate(checkIn) : "—"}
            </span>
          </div>
          <div className="w-px h-4 bg-white/[0.1] shrink-0" />
          {/* Check-out */}
          <div className="flex flex-col shrink-0">
            <span className="font-jost text-body/35 text-[8px] tracking-widest uppercase">Check-out</span>
            <span className="font-jost text-cream/70 text-[11px]">
              {checkOut ? fmtDate(checkOut) : "—"}
            </span>
          </div>
          <div className="w-px h-4 bg-white/[0.1] shrink-0" />
          {/* Guests */}
          <div className="flex flex-col shrink-0">
            <span className="font-jost text-body/35 text-[8px] tracking-widest uppercase">Guests</span>
            <span className="font-jost text-cream/70 text-[11px]">
              {adults + children} total · {adults} adults
            </span>
          </div>
          {/* Spacer */}
          <div className="flex-1" />
          {/* Nights + price */}
          {pricing && (
            <span className="font-jost text-gold text-[11px] tracking-wide whitespace-nowrap shrink-0">
              {pricing.nights} nights · {formatINR(pricing.grandTotal)}
            </span>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          SECTION 1 — SEARCH
      ════════════════════════════════════════════════ */}
      <section className="px-5 md:px-10 lg:px-16 pt-12 pb-16 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="1" title="Search Availability" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 xl:gap-14">

            {/* Left — Calendar + controls */}
            <div className="flex flex-col gap-8">
              {/* Date display strip */}
              <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                {[
                  { label: "Check-in",  val: checkIn  ? fmtDate(checkIn)  : "Select date" },
                  { label: "Check-out", val: checkOut ? fmtDate(checkOut) : "Select date" },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-charcoal px-5 py-4">
                    <p className="font-jost text-body/55 text-[9px] tracking-widest uppercase mb-1">
                      {label}
                    </p>
                    <p className={[
                      "font-cormorant font-light text-2xl tracking-[0.04em] italic",
                      val.includes("Select") ? "text-body/50" : "text-cream",
                    ].join(" ")}>
                      {val}
                    </p>
                  </div>
                ))}
              </div>

              {/* Calendar */}
              <div className="border border-white/[0.06] bg-[#0D0D0D] p-5 md:p-7">
                <BookingCalendar
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onChange={handleCalendarChange}
                  blockedDates={blocked}
                />
              </div>

              {/* Range error */}
              <AnimatePresence>
                {rangeHasBlocked && (
                  <motion.p
                    className="font-jost text-[11px] text-amber-400/80 tracking-[0.03em]"
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    Your selected range includes unavailable dates. Please choose different dates.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Guests + Promo */}
              <div className="border border-white/[0.06] bg-[#0D0D0D] p-5 md:p-7">
                <p className="font-jost text-body/55 text-[9px] tracking-widest uppercase mb-3">
                  Guests
                </p>
                <Counter label="Adults"                value={adults}   min={1} max={10} onChange={v => { setAdults(v); if (v + children > 12) setChildren(12 - v); }} />
                <Counter label="Children (0–13 years)" value={children} min={0} max={Math.min(2, 12 - adults)} onChange={setChildren} />

                {/* Promo code */}
                <div className="mt-5">
                  <Label>Promo Code (optional)</Label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promo}
                      onChange={e => { setPromo(e.target.value); setPromoApplied(null); setPromoError(null); }}
                      className={FIELD}
                      style={{ textTransform: "uppercase" }}
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={!promo.trim() || promoLoading}
                      className="shrink-0 border border-gold/50 px-4 font-jost text-[10px] tracking-widest
                                 uppercase text-cream/80 hover:border-gold hover:bg-gold/[0.08]
                                 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {promoLoading ? "…" : "Apply"}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="mt-2 font-jost text-[10px] tracking-wider text-emerald-400">
                      ✓ {promoApplied.code} applied — {promoApplied.discount}% off!
                    </p>
                  )}
                  {promoError && (
                    <p className="mt-2 font-jost text-[10px] tracking-wider text-red-400">
                      {promoError}
                    </p>
                  )}
                </div>
              </div>

              {/* Check Availability CTA */}
              <motion.button
                type="button"
                onClick={handleCheckAvailability}
                disabled={!checkIn || !checkOut || rangeHasBlocked}
                className={[
                  "w-full py-[15px] font-jost text-[11px] tracking-widest uppercase",
                  "border transition-all duration-300",
                  checkIn && checkOut && !rangeHasBlocked
                    ? "border-gold text-cream bg-gold/[0.08] hover:bg-gold/[0.14] cursor-pointer"
                    : "border-white/[0.07] text-body/30 cursor-not-allowed",
                ].join(" ")}
                whileHover={checkIn && checkOut ? { scale: 1.005 } : {}}
                transition={{ duration: 0.15 }}
              >
                Check Availability
                {(discountedPricing ?? pricing) && ` — ${formatINR((discountedPricing ?? pricing)!.grandTotal)} total`}
              </motion.button>
            </div>

            {/* Right — Property info sidebar */}
            <div className="flex flex-col gap-6">
              {/* Key info card */}
              <div className="border border-white/[0.07] bg-[#0D0D0D] p-6">
                <p className="section-label mb-4">Villa Details</p>
                <div className="flex flex-col gap-3">
                  {[
                    "5 bedrooms · 10 pax occupancy",
                    "Accommodates up to 12 with extra mattress",
                    "Complimentary breakfast for 10 pax",
                    "Bachelor parties not allowed",
                    "Sound policy strictly followed",
                  ].map(note => (
                    <div key={note} className="flex items-start gap-3">
                      <div className="mt-[5px] w-1 h-1 rounded-full bg-gold/40 shrink-0" />
                      <p className="font-jost text-body/75 text-[11px] tracking-[0.03em] leading-relaxed">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offers */}
              <div className="border border-gold/15 bg-gold/[0.03] p-6">
                <p className="section-label mb-4">Exclusive Offers</p>
                <div className="flex flex-col gap-4">
                  {[
                    { badge: "10% Off", text: "When you book directly from our official website" },
                    { badge: "10% Off", text: "Discount on all F&B during your stay" },
                    { badge: "Free",    text: "Welcome drinks on arrival for all guests" },
                  ].map(o => (
                    <div key={o.text} className="flex items-start gap-3">
                      <span className="font-jost text-[8px] tracking-widest uppercase
                                       border border-gold/35 text-gold/70 px-2 py-[3px] shrink-0 mt-[1px]">
                        {o.badge}
                      </span>
                      <p className="font-jost text-cream/80 text-[11px] tracking-[0.03em] leading-relaxed">
                        {o.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* USP list */}
              <div className="border border-white/[0.06] bg-[#0D0D0D] p-6">
                <p className="section-label mb-4">Why Azara</p>
                <div className="flex flex-col divide-y divide-white/[0.05]">
                  {[
                    "Private Swimming Pool & Jacuzzi",
                    "3-minute walk from Candolim Beach",
                    "5 BHK standalone luxury villa",
                    "In-house Chef with 2 Butlers",
                    "Early check-in & late check-out available",
                  ].map(usp => (
                    <div key={usp} className="flex items-center gap-3 py-[10px]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className="text-gold/60 shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <p className="font-jost text-cream/80 text-[11px] tracking-[0.03em]">
                        {usp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 2 — VILLA SELECTION
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(step === "villa" || step === "guest" || step === "confirmation") && (
          <motion.section
            ref={villaRef}
            className="px-5 md:px-10 lg:px-16 py-14 border-b border-white/[0.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="max-w-7xl mx-auto">
              <SectionHeader
                number="2"
                title="Select Villa"
                sub={pricing ? `${adults} Adults · ${pricing.nights} Night${pricing.nights !== 1 ? "s" : ""}` : undefined}
              />

              {/* Villa card */}
              <div className="border border-white/[0.07] bg-[#0D0D0D] overflow-hidden">
                {/* Top: image + summary */}
                <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_240px]">

                  {/* Image */}
                  <div className="relative" style={{ minHeight: "220px" }}>
                    <Image
                      src="/images/Pool_1.jpg"
                      alt="Azara Beach House Villa"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>

                  {/* Details */}
                  <div className="px-7 py-7 flex flex-col gap-3 border-r border-white/[0.06]">
                    <p className="section-label">Entire Villa</p>
                    <h3 className="font-cormorant text-cream font-light text-2xl
                                   tracking-[0.04em] leading-tight">
                      Azara Beach House Villa
                    </h3>
                    {/* Occupancy pax icons */}
                    <div className="flex items-center gap-[3px]">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
                          className="text-gold/50">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      ))}
                      <span className="font-jost text-body/40 text-[10px] ml-2">
                        Up to 12 guests
                      </span>
                    </div>
                    <div className="flex items-center gap-5 pt-1">
                      <div>
                        <span className="font-jost text-body/35 text-[9px] tracking-widest uppercase">Size</span>
                        <p className="font-jost text-cream/60 text-[12px] mt-[1px]">13,000 sq. ft.</p>
                      </div>
                      <div>
                        <span className="font-jost text-body/35 text-[9px] tracking-widest uppercase">Bedrooms</span>
                        <p className="font-jost text-cream/60 text-[12px] mt-[1px]">5 BHK</p>
                      </div>
                      <div>
                        <span className="font-jost text-body/35 text-[9px] tracking-widest uppercase">Pools</span>
                        <p className="font-jost text-cream/60 text-[12px] mt-[1px]">Infinity Pool</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="px-6 py-7 flex flex-col gap-2 justify-center">
                    {pricing ? (
                      <>
                        <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase">
                          Avg. per night
                        </p>
                        <p className="font-cormorant text-cream font-light text-3xl
                                       tracking-[0.02em] italic leading-none">
                          {formatINR(pricing.avgNightly)}
                        </p>
                        <p className="font-jost text-body/40 text-[10px] tracking-[0.03em]">
                          +{formatINR(Math.round(pricing.avgNightly * 0.18))} GST/night
                        </p>
                        <div className="mt-3 pt-3 border-t border-white/[0.06]">
                          <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase mb-1">
                            Total · {pricing.nights} night{pricing.nights !== 1 ? "s" : ""}
                          </p>
                          <p className="font-cormorant text-gold font-light text-2xl
                                         italic leading-none">
                            {formatINR((discountedPricing ?? pricing).grandTotal)}
                          </p>
                          <p className="font-jost text-body/35 text-[9px] tracking-wider mt-[3px]">
                            Incl. taxes & fees
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="font-jost text-body/30 text-[11px]">
                        Select dates to see pricing
                      </p>
                    )}
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-white/[0.06]">
                  {/* Tab bar */}
                  <div className="flex border-b border-white/[0.06]">
                    {(["rates", "amenities", "photos"] as VillaTab[]).map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setVillaTab(tab)}
                        className={[
                          "relative px-6 py-4 font-jost text-[10px] tracking-widest uppercase",
                          "transition-colors duration-200",
                          villaTab === tab ? "text-cream" : "text-body/40 hover:text-body/70",
                        ].join(" ")}
                      >
                        {tab}
                        {villaTab === tab && (
                          <motion.div
                            layoutId="villa-tab-indicator"
                            className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab panels */}
                  <div className="p-6 md:p-8">
                    <AnimatePresence mode="wait">

                      {/* ── Rates tab ─────────────────────── */}
                      {villaTab === "rates" && (
                        <motion.div
                          key="rates"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                          className="flex flex-col md:flex-row gap-8 md:gap-12"
                        >
                          {/* Rate details */}
                          <div className="flex-1">
                            <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase mb-3">
                              Tariff Inclusive of Breakfast
                            </p>
                            <div className="flex flex-col divide-y divide-white/[0.05]">
                              {pricing && (() => {
                                const dp = discountedPricing;
                                const rows: [string, string, boolean?][] = [
                                  ["Base rate", formatINR(pricing.baseTotal)],
                                  ...(dp ? [["Discount (" + promoApplied!.discount + "%)", "−" + formatINR(dp.discountAmount), true] as [string, string, boolean]] : []),
                                  ["GST (18%)", formatINR(dp ? dp.gstAmount : pricing.gstAmount)],
                                  ["Grand total", formatINR(dp ? dp.grandTotal : pricing.grandTotal)],
                                ];
                                return rows.map(([label, val, isDiscount]) => (
                                  <div key={label}
                                    className={[
                                      "flex justify-between py-3",
                                      label === "Grand total" ? "font-medium text-cream" : isDiscount ? "text-emerald-400/80" : "text-body/60",
                                    ].join(" ")}>
                                    <span className="font-jost text-[12px] tracking-[0.02em]">{label}</span>
                                    <span className={["font-jost text-[13px]", label === "Grand total" ? "text-gold" : ""].join(" ")}>{val}</span>
                                  </div>
                                ));
                              })()}
                            </div>

                            {/* Inclusions */}
                            <div className="mt-5 pt-5 border-t border-white/[0.06]">
                              <p className="font-jost text-body/35 text-[9px] tracking-widest
                                            uppercase mb-3">
                                Included in rate
                              </p>
                              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                {[
                                  "Welcome drink on arrival",
                                  "Complimentary breakfast",
                                  "Early check-in (subject to avail.)",
                                  "Late check-out (subject to avail.)",
                                  "Free private parking",
                                  "Kitchenette & BBQ area",
                                  "Smart TV in all rooms",
                                  "24/7 butler service",
                                ].map(inc => (
                                  <div key={inc} className="flex items-center gap-2">
                                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      className="text-gold/60 shrink-0">
                                      <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    <span className="font-jost text-body/50 text-[10px] tracking-[0.03em]">
                                      {inc}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Book now panel */}
                          <div className="flex flex-col gap-4 md:w-[220px] shrink-0">
                            <button
                              type="button"
                              onClick={handleSelectVilla}
                              className="w-full border border-gold/50 bg-gold/[0.08] py-4
                                         font-jost text-[11px] tracking-widest uppercase text-cream
                                         hover:bg-gold/[0.14] hover:border-gold transition-all duration-300"
                            >
                              Book Now →
                            </button>
                            {pricing && (
                              <p className="font-jost text-body/35 text-[9px] tracking-wider
                                            text-center leading-loose">
                                {formatINR((discountedPricing ?? pricing).grandTotal)} total for{" "}
                                {pricing.nights} nights
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* ── Amenities tab ─────────────────── */}
                      {villaTab === "amenities" && (
                        <motion.div
                          key="amenities"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-0"
                        >
                          {VILLA_AMENITIES.map(a => (
                            <div key={a} className="flex items-center gap-3 py-3
                                                     border-b border-white/[0.05]">
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                className="text-gold/60 shrink-0">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              <span className="font-jost text-cream/60 text-[11px] tracking-[0.03em]">{a}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {/* ── Photos tab ───────────────────── */}
                      {villaTab === "photos" && (
                        <motion.div
                          key="photos"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                          className="grid grid-cols-2 md:grid-cols-3 gap-[3px]"
                        >
                          {VILLA_PHOTOS.map(p => (
                            <Link key={p.src} href="/gallery"
                              className="group relative overflow-hidden"
                              style={{ aspectRatio: "4/3" }}>
                              <Image src={p.src} alt={p.alt} fill
                                className="object-cover transition-transform duration-500
                                           group-hover:scale-[1.04]"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25
                                              transition-colors duration-300 flex items-end p-3">
                                <span className="font-jost text-[9px] tracking-widest uppercase
                                                  text-cream/0 group-hover:text-cream/70
                                                  transition-colors duration-300">
                                  {p.alt}
                                </span>
                              </div>
                            </Link>
                          ))}
                          <Link href="/gallery"
                            className="group flex items-center justify-center border border-white/[0.06]
                                        hover:border-gold/30 transition-colors duration-300"
                            style={{ aspectRatio: "4/3" }}>
                            <span className="font-jost text-body/40 text-[10px] tracking-widest uppercase
                                             group-hover:text-cream transition-colors duration-300">
                              View Full Gallery →
                            </span>
                          </Link>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════
          SECTION 3 — GUEST INFORMATION
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(step === "guest" || step === "confirmation") && (
          <motion.section
            ref={guestRef}
            className="px-5 md:px-10 lg:px-16 py-14 border-b border-white/[0.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="max-w-7xl mx-auto">
              <SectionHeader number="3" title="Guest Information" />

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 xl:gap-14">

                  {/* Left — form fields */}
                  <div className="flex flex-col gap-5">

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <FieldWrap>
                        <Label>First Name *</Label>
                        <input required placeholder="First" value={firstName}
                          onChange={e => setFirstName(e.target.value)} className={FIELD} />
                      </FieldWrap>
                      <FieldWrap>
                        <Label>Last Name *</Label>
                        <input required placeholder="Last" value={lastName}
                          onChange={e => setLastName(e.target.value)} className={FIELD} />
                      </FieldWrap>
                    </div>

                    {/* Email */}
                    <FieldWrap>
                      <Label>Email Address *</Label>
                      <input type="email" required placeholder="you@example.com" value={email}
                        onChange={e => setEmail(e.target.value)} className={FIELD} />
                    </FieldWrap>

                    {/* Phone */}
                    <FieldWrap>
                      <Label>Phone Number *</Label>
                      <div className="flex">
                        <select value={cc} onChange={e => setCC(e.target.value)}
                          className="bg-white/[0.03] border border-r-0 border-white/[0.2]
                                     px-3 py-[13px] font-jost text-body/60 text-[12px]
                                     focus:outline-none focus:border-gold/50 shrink-0
                                     transition-colors duration-300 cursor-pointer appearance-none"
                          style={{ width: "110px" }}>
                          {COUNTRY_CODES.map(c => (
                            <option key={c.v} value={c.v} className="bg-[#0A0A0A] text-cream">{c.l}</option>
                          ))}
                        </select>
                        <input type="tel" required placeholder="Phone number" value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className={FIELD + " flex-1"} />
                      </div>
                    </FieldWrap>

                    {/* GST */}
                    <FieldWrap>
                      <Label>GST Number (optional)</Label>
                      <input placeholder="For GST invoice" value={gst}
                        onChange={e => setGst(e.target.value)} className={FIELD} />
                    </FieldWrap>

                    {/* Special requests */}
                    <FieldWrap>
                      <Label>Special Requests</Label>
                      <textarea rows={4} placeholder="Dietary needs, celebration arrangements, room preferences…"
                        value={requests} onChange={e => setRequests(e.target.value)}
                        className={FIELD + " resize-none leading-relaxed"} />
                    </FieldWrap>

                    {/* Payment options */}
                    {pricing && (
                      <div className="border border-white/[0.07] bg-[#0D0D0D] p-5">
                        <Label>Payment Preference</Label>
                        <div className="flex flex-col gap-3 mt-2">
                          {([
                            {
                              val: "100" as PayOpt,
                              label: "Pay 100% now",
                              payNow: (discountedPricing ?? pricing).grandTotal,
                              payLater: 0,
                            },
                            {
                              val: "50" as PayOpt,
                              label: "Pay 50% now, 50% at check-in",
                              payNow: (discountedPricing ?? pricing).halfPayNow,
                              payLater: (discountedPricing ?? pricing).grandTotal - (discountedPricing ?? pricing).halfPayNow,
                            },
                          ]).map(opt => (
                            <label key={opt.val}
                              className={[
                                "flex items-start gap-4 p-4 border cursor-pointer",
                                "transition-colors duration-200",
                                payOpt === opt.val
                                  ? "border-gold/40 bg-gold/[0.04]"
                                  : "border-white/[0.06] hover:border-white/[0.12]",
                              ].join(" ")}>
                              <input type="radio" name="payOpt" value={opt.val}
                                checked={payOpt === opt.val}
                                onChange={() => setPayOpt(opt.val)}
                                className="mt-[3px] accent-gold" />
                              <div className="flex-1">
                                <p className="font-jost text-cream/80 text-[12px] tracking-[0.03em]">
                                  {opt.label}
                                </p>
                                <div className="flex gap-5 mt-2">
                                  <div>
                                    <p className="font-jost text-body/35 text-[8px] tracking-widest uppercase">
                                      Pay now
                                    </p>
                                    <p className="font-jost text-gold text-[13px] mt-[1px]">
                                      {formatINR(opt.payNow)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-jost text-body/35 text-[8px] tracking-widest uppercase">
                                      Pay later
                                    </p>
                                    <p className="font-jost text-cream/60 text-[13px] mt-[1px]">
                                      {opt.payLater > 0 ? formatINR(opt.payLater) : "₹0.00"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right — booking summary + submit */}
                  <div className="flex flex-col gap-5">
                    {/* Summary card */}
                    <div className="border border-white/[0.08] bg-[#0D0D0D] overflow-hidden">
                      <div className="px-6 py-5 border-b border-white/[0.06]">
                        <p className="section-label mb-1">Your Booking</p>
                        <h3 className="font-cormorant text-cream font-light text-xl
                                       tracking-[0.04em]">
                          Azara Beach House Villa
                        </h3>
                      </div>

                      {pricing && checkIn && checkOut && (
                        <div className="px-6 py-5 flex flex-col gap-4">
                          {/* Dates */}
                          <div className="flex justify-between">
                            <div>
                              <p className="font-jost text-body/35 text-[8px] tracking-widest uppercase">Check-in</p>
                              <p className="font-jost text-cream/70 text-[12px] mt-[2px]">{fmtDate(checkIn)}</p>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              className="text-gold/30 self-end mb-[2px]">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                            <div className="text-right">
                              <p className="font-jost text-body/35 text-[8px] tracking-widest uppercase">Check-out</p>
                              <p className="font-jost text-cream/70 text-[12px] mt-[2px]">{fmtDate(checkOut)}</p>
                            </div>
                          </div>

                          <div className="h-px bg-white/[0.05]" />

                          {/* Guests */}
                          <div className="flex justify-between">
                            <span className="font-jost text-body/50 text-[11px]">Guests</span>
                            <span className="font-jost text-cream/70 text-[11px]">
                              {adults} adult{adults !== 1 ? "s" : ""}
                              {children > 0 ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""}
                            </span>
                          </div>

                          {/* Room breakdown */}
                          <div className="flex justify-between">
                            <span className="font-jost text-body/50 text-[11px]">
                              Villa · {pricing.nights} night{pricing.nights !== 1 ? "s" : ""}
                            </span>
                            <span className="font-jost text-cream/70 text-[11px]">
                              {formatINR(pricing.baseTotal)}
                            </span>
                          </div>

                          <div className="h-px bg-white/[0.05]" />

                          {/* Subtotal */}
                          <div className="flex justify-between">
                            <span className="font-jost text-body/50 text-[11px]">Sub Total</span>
                            <span className="font-jost text-cream/70 text-[11px]">{formatINR(pricing.baseTotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-jost text-body/50 text-[11px]">GST & Fees (18%)</span>
                            <span className="font-jost text-cream/70 text-[11px]">{formatINR(pricing.gstAmount)}</span>
                          </div>

                          <div className="h-px bg-gold/20" />

                          {/* Grand total */}
                          <div className="flex justify-between items-baseline">
                            <span className="font-cormorant text-cream font-light text-lg tracking-[0.04em]">
                              Grand Total
                            </span>
                            <span className="font-cormorant text-gold font-light text-2xl
                                             italic tracking-[0.02em]">
                              {formatINR((discountedPricing ?? pricing).grandTotal)}
                            </span>
                          </div>

                          {payOpt === "50" && (
                            <div className="border border-gold/15 bg-gold/[0.03] px-4 py-3">
                              <p className="font-jost text-body/50 text-[10px] tracking-[0.02em] leading-relaxed">
                                Due now: <span className="text-gold">{formatINR((discountedPricing ?? pricing).halfPayNow)}</span>
                                <br />
                                Due at check-in: <span className="text-cream/70">{formatINR((discountedPricing ?? pricing).grandTotal - (discountedPricing ?? pricing).halfPayNow)}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Terms + submit */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className={[
                        "mt-[2px] w-4 h-4 border flex-shrink-0 flex items-center justify-center",
                        "transition-colors duration-200",
                        agreed ? "border-gold bg-gold/20" : "border-white/[0.2]",
                      ].join(" ")}>
                        <input type="checkbox" checked={agreed}
                          onChange={e => setAgreed(e.target.checked)}
                          className="sr-only" />
                        {agreed && (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                            className="text-gold">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <p className="font-jost text-body/45 text-[10px] tracking-[0.03em] leading-relaxed
                                    group-hover:text-body/70 transition-colors duration-200">
                        By completing this reservation you are accepting our{" "}
                        <span className="text-gold/70 underline underline-offset-2 cursor-pointer">
                          Terms & Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-gold/70 underline underline-offset-2 cursor-pointer">
                          Cancellation Policy
                        </span>.
                      </p>
                    </label>

                    <div className="flex flex-col gap-3">
                      <p className="font-jost text-body/35 text-[9px] tracking-wider text-center">
                        Last step — confirm your stay now
                      </p>
                      <button
                        type="submit"
                        disabled={!agreed || submitting || !firstName || !email || !phone}
                        className={[
                          "w-full py-4 font-jost text-[11px] tracking-widest uppercase",
                          "border transition-all duration-300 flex items-center justify-center gap-3",
                          agreed && !submitting && firstName && email && phone
                            ? "border-gold text-cream bg-gold/[0.1] hover:bg-gold/[0.18] cursor-pointer"
                            : "border-white/[0.07] text-body/25 cursor-not-allowed",
                        ].join(" ")}
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25" />
                              <path d="M21 12a9 9 0 00-9-9" />
                            </svg>
                            Confirming Booking…
                          </>
                        ) : "Confirm Booking"}
                      </button>

                      {/* Error message */}
                      {submitError && (
                        <div className="border border-red-500/30 bg-red-500/[0.05] px-4 py-3">
                          <p className="font-jost text-red-400 text-[11px] tracking-[0.03em] leading-relaxed">
                            {submitError}
                          </p>
                          <a
                            href="https://wa.me/919090407408"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-jost text-[#25D366] text-[10px] tracking-widest uppercase mt-2 inline-block"
                          >
                            Contact us on WhatsApp →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════
          SECTION 4 — CONFIRMATION
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {step === "confirmation" && (
          <motion.section
            ref={confirmRef}
            className="px-5 md:px-10 lg:px-16 py-20 md:py-28"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">

              {/* Animated check */}
              <motion.div
                className="w-16 h-16 rounded-full border border-gold/40
                           flex items-center justify-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  className="text-gold">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </motion.div>

              <div className="flex flex-col gap-2">
                <p className="section-label">Booking Confirmed</p>
                <h2 className="font-cormorant text-cream font-light text-5xl
                               tracking-[0.06em] italic leading-tight">
                  Your Stay is Reserved
                </h2>
              </div>

              {/* Reference */}
              <div className="border border-gold/25 bg-gold/[0.04] px-10 py-5">
                <p className="font-jost text-body/40 text-[9px] tracking-widest uppercase mb-2">
                  Booking Reference
                </p>
                <p className="font-cormorant text-gold font-light text-3xl
                               tracking-[0.12em] italic">
                  {bookingRef}
                </p>
              </div>

              {/* Booking summary */}
              {pricing && checkIn && checkOut && (
                <div className="w-full border border-white/[0.07] bg-[#0D0D0D] text-left">
                  <div className="grid grid-cols-2 gap-px bg-white/[0.05]">
                    {[
                      ["Villa",      "Azara Beach House"],
                      ["Check-in",   fmtDate(checkIn)],
                      ["Check-out",  fmtDate(checkOut)],
                      ["Duration",   `${pricing.nights} nights`],
                      ["Guests",     `${adults + children} (${adults} adults)`],
                      ["Total paid", formatINR(payOpt === "50" ? (discountedPricing ?? pricing).halfPayNow : (discountedPricing ?? pricing).grandTotal)],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-[#0D0D0D] px-5 py-4">
                        <p className="font-jost text-body/35 text-[8px] tracking-widest uppercase mb-1">
                          {label}
                        </p>
                        <p className="font-jost text-cream/75 text-[12px] tracking-[0.02em]">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirmation note */}
              <div className="flex flex-col gap-2 max-w-sm text-center">
                <p className="font-jost text-body/55 text-[12px] tracking-[0.03em] leading-loose">
                  Booking request received. Our team at{" "}
                  <span className="text-gold">bookings@azarabeachhouse.com</span>{" "}
                  will reach out within <span className="text-gold">24 hours</span> to confirm your booking and arrange every detail.
                </p>
              </div>

              <div className="h-px w-10 bg-gold/30" />

              {/* WhatsApp follow-up */}
              <a
                href="https://wa.me/919090407408"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-[#25D366]/30
                           bg-[#25D366]/[0.04] px-8 py-5
                           hover:border-[#25D366]/55 hover:bg-[#25D366]/[0.08]
                           transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#25D366" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7
                           8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8
                           8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0
                           018 8v.5z" />
                </svg>
                <div className="text-left">
                  <p className="font-jost text-[8px] tracking-widest uppercase text-[#25D366]/60 mb-[1px]">
                    Questions? Need anything?
                  </p>
                  <p className="font-jost text-cream/80 text-[12px] tracking-[0.02em]">
                    Chat with us on WhatsApp
                  </p>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  className="text-[#25D366]/50 ml-2 translate-x-0 group-hover:translate-x-1
                             transition-transform duration-300">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>

              <Link href="/"
                className="font-jost text-body/35 text-[10px] tracking-widest uppercase
                           hover:text-body/60 transition-colors duration-300">
                ← Return to Home
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  );
}

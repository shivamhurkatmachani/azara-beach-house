"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatINR } from "@/lib/pricing";

function ConfirmationContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "—";
  const amountPaid = Number(params.get("paid") || 0);
  const amountDue = Number(params.get("due") || 0);
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = params.get("guests") || "";
  const nights = params.get("nights") || "";
  const paymentStatus = params.get("status") || "PAID";

  return (
    <div className="bg-charcoal min-h-screen pt-28 pb-20 px-5 md:px-10">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Animated check */}
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-emerald-400/50 bg-emerald-400/10
                     flex items-center justify-center"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.15 }}
        >
          <motion.svg
            width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            className="text-emerald-400"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <path d="M20 6L9 17l-5-5" />
          </motion.svg>
        </motion.div>

        <div className="flex flex-col gap-2">
          <p className="font-jost text-emerald-400 text-xs tracking-[0.2em] uppercase">
            Payment Successful
          </p>
          <h1 className="font-cormorant text-cream font-light text-4xl md:text-5xl
                         tracking-[0.06em] italic leading-tight">
            Your Stay is Confirmed
          </h1>
        </div>

        {/* Booking reference — prominent */}
        <motion.div
          className="border border-gold/30 bg-gold/[0.05] px-12 py-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-jost text-body/45 text-[10px] tracking-[0.2em] uppercase mb-2">
            Booking Reference
          </p>
          <p className="font-cormorant text-gold font-light text-4xl tracking-[0.15em] italic">
            {ref}
          </p>
        </motion.div>

        {/* Summary grid */}
        <motion.div
          className="w-full border border-white/[0.08] bg-[#0D0D0D] text-left"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.05]">
            {([
              ["Check-in", checkIn],
              ["Check-out", checkOut],
              ["Duration", `${nights} night${nights !== "1" ? "s" : ""}`],
              ["Guests", guests],
              ["Total Paid", formatINR(amountPaid)],
              ["Payment", paymentStatus === "PARTIALLY_PAID" ? "50% Advance" : "Paid in Full"],
            ] as [string, string][]).map(([label, val]) => (
              <div key={label} className="bg-[#0D0D0D] px-5 py-4">
                <p className="font-jost text-body/40 text-[9px] tracking-[0.15em] uppercase mb-1">
                  {label}
                </p>
                <p className="font-jost text-cream/80 text-sm tracking-[0.02em]">{val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Balance due notice for 50% */}
        {amountDue > 0 && (
          <motion.div
            className="w-full border border-amber-400/25 bg-amber-400/[0.05] px-6 py-4 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <p className="font-jost text-amber-400 text-sm tracking-[0.02em]">
              Balance due at check-in:{" "}
              <span className="font-medium text-amber-300">{formatINR(amountDue)}</span>
            </p>
          </motion.div>
        )}

        {/* Confirmation note */}
        <div className="flex flex-col gap-2 max-w-md text-center">
          <p className="font-jost text-body/60 text-sm tracking-[0.03em] leading-loose">
            Our team at{" "}
            <span className="text-gold">bookings@azarabeachhouse.com</span>{" "}
            will reach out within{" "}
            <span className="text-gold">24 hours</span>{" "}
            to confirm details and arrange everything for your stay.
          </p>
        </div>

        <div className="h-px w-12 bg-gold/30" />

        {/* WhatsApp button */}
        <a
          href="https://wa.me/919090407408"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 border border-[#25D366]/30
                     bg-[#25D366]/[0.04] px-8 py-5
                     hover:border-[#25D366]/55 hover:bg-[#25D366]/[0.08]
                     transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#25D366" strokeWidth="1.5" strokeLinecap="round">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7
                     8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8
                     8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0
                     018 8v.5z" />
          </svg>
          <div className="text-left">
            <p className="font-jost text-[9px] tracking-[0.15em] uppercase text-[#25D366]/60 mb-[1px]">
              Questions? Need anything?
            </p>
            <p className="font-jost text-cream/80 text-sm tracking-[0.02em]">
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

        {/* Return home */}
        <Link href="/"
          className="font-jost text-body/40 text-xs tracking-[0.15em] uppercase
                     hover:text-body/70 transition-colors duration-300">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="bg-charcoal min-h-screen flex items-center justify-center">
        <p className="font-jost text-cream/50 text-sm tracking-wider">Loading...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

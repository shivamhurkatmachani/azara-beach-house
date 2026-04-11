"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ADDRESS = "Panchayat Bardez, 449, E Wadi, Candolim, Goa 403515";

export default function GettingThere() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Fallback for browsers without clipboard API */
      const el = document.createElement("textarea");
      el.value = ADDRESS;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section className="px-8 md:px-14 lg:px-20 py-16 md:py-24 border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left — Heading + copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            <p className="section-label mb-5">Arrival & Transfers</p>
            <h2 className="font-cormorant text-cream font-light tracking-luxury leading-[1.06]
                           text-4xl md:text-5xl mb-5">
              Getting Here
            </h2>
            <motion.div
              className="w-10 h-px bg-gold/40 mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
            <p className="font-jost text-body/55 text-[13px] tracking-[0.03em] leading-loose max-w-md">
              Whether arriving via Manohar International (MOPA) or Dabolim, a private
              chauffeur-driven transfer can be curated for your arrival. Your butler
              will coordinate every detail from the moment you land.
            </p>
          </motion.div>

          {/* Right — Address card + directions */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.95, delay: 0.15, ease: "easeOut" }}
          >
            {/* Address block */}
            <div
              className="border border-white/[0.07] bg-white/[0.02] px-7 py-6
                          flex flex-col gap-4"
            >
              <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase">
                Villa Address
              </p>
              <p className="font-cormorant text-cream/85 font-light text-xl
                            tracking-[0.04em] leading-[1.55] italic">
                {ADDRESS}
              </p>

              {/* Copy address button */}
              <button
                onClick={copyAddress}
                className={[
                  "group self-start inline-flex items-center gap-2 mt-1",
                  "font-jost text-[10px] tracking-widest uppercase transition-all duration-300",
                  copied
                    ? "text-gold"
                    : "text-body/45 hover:text-body/80",
                ].join(" ")}
              >
                {/* Icon — toggles between copy and check */}
                {copied ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
                {copied ? "Copied!" : "Copy Address"}
              </button>
            </div>

            {/* Transfer note */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-[3px] flex-shrink-0 w-1 h-1 rounded-full bg-gold/50" />
                <p className="font-jost text-body/40 text-[11px] tracking-[0.03em] leading-loose">
                  Private airport transfers available from both Manohar (GOX) and
                  Dabolim (GOI) — arranged by your dedicated butler.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-[3px] flex-shrink-0 w-1 h-1 rounded-full bg-gold/50" />
                <p className="font-jost text-body/40 text-[11px] tracking-[0.03em] leading-loose">
                  Self-drive car rentals also available through our concierge desk.
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-gold/35 px-6 py-[13px]
                         font-jost text-[11px] tracking-widest uppercase text-cream/75
                         hover:text-cream hover:border-gold hover:bg-gold/[0.06]
                         transition-all duration-300 self-start"
            >
              {/* WhatsApp icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className="text-gold/60 group-hover:text-gold transition-colors duration-300">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              Arrange a Transfer
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

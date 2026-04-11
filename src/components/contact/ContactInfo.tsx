"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ADDRESS = "Panchayat Bardez, 449, E Wadi, Candolim, Goa 403515";

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
    } catch {
      const el = document.createElement("textarea");
      el.value = ADDRESS; el.style.position = "fixed"; el.style.opacity = "0";
      document.body.appendChild(el); el.select(); document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex flex-col gap-8">

      {/* ── WhatsApp — hero CTA ──────────────────────────────── */}
      <FadeUp delay={0.1}>
        <a
          href="https://wa.me/919090407408"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-5 w-full
                     border border-[#25D366]/25 bg-[#25D366]/[0.04] px-6 py-6
                     hover:border-[#25D366]/50 hover:bg-[#25D366]/[0.07]
                     transition-all duration-400"
        >
          {/* WhatsApp icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full
                          border border-[#25D366]/30 bg-[#25D366]/[0.06]
                          flex items-center justify-center
                          group-hover:border-[#25D366]/60 group-hover:bg-[#25D366]/10
                          transition-all duration-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#25D366" strokeWidth="1.5" strokeLinecap="round">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7
                       8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8
                       8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0
                       018 8v.5z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-jost text-[9px] tracking-widest uppercase text-[#25D366]/60 mb-[3px]">
              Fastest response
            </p>
            <p className="font-cormorant text-cream font-light text-xl
                          tracking-[0.04em] leading-none">
              Chat on WhatsApp
            </p>
            <p className="font-jost text-body/40 text-[10px] tracking-[0.03em] mt-1">
              +91 90904 07408 · Typically replies within minutes
            </p>
          </div>

          {/* Arrow */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            className="text-[#25D366]/40 group-hover:text-[#25D366]/70
                       translate-x-0 group-hover:translate-x-1
                       transition-all duration-300 shrink-0">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </FadeUp>

      {/* ── Divider ──────────────────────────────────────────── */}
      <FadeUp delay={0.15}>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/[0.05]" />
          <p className="font-jost text-body/25 text-[8px] tracking-widest uppercase">
            or reach us via
          </p>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>
      </FadeUp>

      {/* ── Contact details ──────────────────────────────────── */}
      <FadeUp delay={0.18}>
        <div className="flex flex-col divide-y divide-white/[0.05]">

          {/* Email */}
          <a
            href="mailto:sales@azarabeachhouse.com"
            className="group flex items-center gap-4 py-5
                       hover:bg-white/[0.015] transition-colors duration-300 -mx-1 px-1"
          >
            <div className="w-9 h-9 rounded-full border border-white/[0.06]
                            flex items-center justify-center text-gold/40
                            group-hover:text-gold group-hover:border-gold/25
                            transition-all duration-300 shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase mb-[2px]">
                Email
              </p>
              <p className="font-jost text-cream/70 text-[13px] tracking-[0.03em]
                            group-hover:text-cream transition-colors duration-300">
                sales@azarabeachhouse.com
              </p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+919090407408"
            className="group flex items-center gap-4 py-5
                       hover:bg-white/[0.015] transition-colors duration-300 -mx-1 px-1"
          >
            <div className="w-9 h-9 rounded-full border border-white/[0.06]
                            flex items-center justify-center text-gold/40
                            group-hover:text-gold group-hover:border-gold/25
                            transition-all duration-300 shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07
                         19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67
                         A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81
                         a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27
                         a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase mb-[2px]">
                Phone
              </p>
              <p className="font-jost text-cream/70 text-[13px] tracking-[0.03em]
                            group-hover:text-cream transition-colors duration-300">
                +91 90904 07408
              </p>
            </div>
          </a>

          {/* Address */}
          <div className="flex items-start gap-4 py-5">
            <div className="w-9 h-9 rounded-full border border-white/[0.06]
                            flex items-center justify-center text-gold/40 shrink-0 mt-[2px]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase mb-[2px]">
                Address
              </p>
              <p className="font-jost text-cream/65 text-[12px] tracking-[0.03em]
                            leading-relaxed">
                {ADDRESS}
              </p>
              <button
                onClick={copyAddress}
                className={[
                  "mt-2 inline-flex items-center gap-[6px]",
                  "font-jost text-[9px] tracking-widest uppercase",
                  "transition-colors duration-300",
                  copied ? "text-gold" : "text-body/35 hover:text-body/60",
                ].join(" ")}
              >
                {copied ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
                {copied ? "Copied!" : "Copy Address"}
              </button>
            </div>
          </div>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/azarabeachhouse"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 py-5
                       hover:bg-white/[0.015] transition-colors duration-300 -mx-1 px-1"
          >
            <div className="w-9 h-9 rounded-full border border-white/[0.06]
                            flex items-center justify-center text-gold/40
                            group-hover:text-gold group-hover:border-gold/25
                            transition-all duration-300 shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div>
              <p className="font-jost text-body/35 text-[9px] tracking-widest uppercase mb-[2px]">
                Instagram
              </p>
              <p className="font-jost text-cream/70 text-[13px] tracking-[0.03em]
                            group-hover:text-cream transition-colors duration-300">
                @azarabeachhouse
              </p>
            </div>
          </a>

        </div>
      </FadeUp>

      {/* ── Small map ────────────────────────────────────────── */}
      <FadeUp delay={0.22}>
        <div
          className="relative w-full overflow-hidden border border-white/[0.05]"
          style={{ height: "200px" }}
        >
          <div
            className="absolute inset-0"
            style={{ filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
          >
            <iframe
              src="https://maps.google.com/maps?q=15.512329,73.767483&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Azara Beach House map"
            />
          </div>
          {/* Edge fades */}
          <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-charcoal to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />

          {/* Get Directions overlay link */}
          <a
            href="https://maps.app.goo.gl/uXpTfP8M9N9X6pX68"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-10
                       font-jost text-[8px] tracking-widest uppercase
                       bg-charcoal/80 backdrop-blur-sm border border-white/[0.08]
                       text-body/50 hover:text-cream px-3 py-[6px]
                       transition-colors duration-300"
          >
            Open in Maps →
          </a>
        </div>
      </FadeUp>

      {/* ── Response time note ───────────────────────────────── */}
      <FadeUp delay={0.25}>
        <div className="flex items-start gap-3 pt-1">
          <div className="w-1 h-1 rounded-full bg-gold/40 mt-[7px] shrink-0" />
          <p className="font-jost text-body/30 text-[10px] tracking-wider leading-loose italic">
            We respond to all inquiries within 24 hours. For same-day responses,
            WhatsApp is the fastest way to reach us.
          </p>
        </div>
      </FadeUp>

    </div>
  );
}

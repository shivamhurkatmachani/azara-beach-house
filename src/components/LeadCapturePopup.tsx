"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const GOLD  = "#B8976A";
const DARK  = "#1A1A1A";
const WA_URL = "https://wa.me/919090407408";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function stripNonDigits(v: string) {
  return v.replace(/\D/g, "");
}

const SHOW_DELAY_MS  = 30_000;
const AUTO_CLOSE_MS  = 5_000;
const SESSION_KEY    = "azara_popup_shown";
const SUBMITTED_KEY  = "azara_popup_submitted";

/* ── tiny helpers ───────────────────────────────────────────── */
function alreadyShown()     { return !!sessionStorage.getItem(SESSION_KEY);    }
function alreadySubmitted() { return !!sessionStorage.getItem(SUBMITTED_KEY);  }
function markShown()        { sessionStorage.setItem(SESSION_KEY,    "1");     }
function markSubmitted()    { sessionStorage.setItem(SUBMITTED_KEY,  "1");     }

export default function LeadCapturePopup() {
  const [visible,   setVisible]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [thankName, setThankName] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Fields */
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [cc,          setCC]          = useState("+91");
  const [phone,       setPhone]       = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [guests,      setGuests]      = useState("2");
  const [emailError,  setEmailError]  = useState("");
  const [phoneError,  setPhoneError]  = useState("");

  /* ── Decide whether / when to show ───────────────────────── */
  useEffect(() => {
    /* Don't show on mobile */
    if (window.innerWidth < 768) return;
    if (alreadyShown() || alreadySubmitted()) return;

    timerRef.current = setTimeout(() => {
      setVisible(true);
      markShown();
    }, SHOW_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* ── Auto-close 5s after thank-you ───────────────────────── */
  useEffect(() => {
    if (!submitted) return;
    const id = setTimeout(() => setVisible(false), AUTO_CLOSE_MS);
    return () => clearTimeout(id);
  }, [submitted]);

  /* ── Lock body scroll while open ─────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  /* ── Submit ───────────────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) { setEmailError("Please enter a valid email address"); return; }
    const digits = stripNonDigits(phone);
    if (digits.length < 7 || digits.length > 15) { setPhoneError("Phone number must be 7–15 digits"); return; }
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: `${cc} ${phone}`, travelDates, guests }),
      });
    } catch {/* swallow — UX still proceeds */}

    setThankName(name.split(" ")[0]);
    setSubmitted(true);
    markSubmitted();
    setLoading(false);
  }

  function close() { setVisible(false); }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.70)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl pointer-events-auto
                         flex flex-col md:flex-row"
              style={{ border: `1px solid rgba(184,151,106,0.30)` }}
              onClick={e => e.stopPropagation()}
            >
              {/* ── LEFT — image ──────────────────────────────── */}
              <div className="relative h-48 md:h-auto md:w-[46%] shrink-0 overflow-hidden">
                <Image
                  src="/images/Pool_1.jpg"
                  alt="Azara Beach House pool"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                {/* Dark gradient so text pops */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-jost text-[9px] tracking-[0.28em] uppercase mb-2"
                    style={{ color: `${GOLD}CC` }}>
                    Candolim, Goa
                  </p>
                  <p className="font-cormorant font-light italic text-white leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                    Your Private Paradise<br />Awaits
                  </p>
                </div>
              </div>

              {/* ── RIGHT — form ──────────────────────────────── */}
              <div
                className="flex-1 flex flex-col relative"
                style={{ backgroundColor: DARK }}
              >
                {/* Close button */}
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                             rounded-full transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    /* ── Form state ─────────────────────────── */
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 p-6 md:p-8 pt-8 md:pt-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Eyebrow */}
                      <p className="font-jost text-[9px] tracking-[0.28em] uppercase"
                        style={{ color: `${GOLD}99` }}>
                        Exclusive Access
                      </p>

                      {/* Heading */}
                      <div className="mb-1">
                        <h2 className="font-cormorant font-light text-white leading-tight"
                          style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)" }}>
                          Plan Your Escape
                        </h2>
                        <p className="font-jost text-[11px] leading-relaxed mt-2"
                          style={{ color: "rgba(255,255,255,0.40)" }}>
                          Share your details and our concierge team will curate your perfect stay
                        </p>
                      </div>

                      {/* Gold rule */}
                      <div className="h-px w-8" style={{ backgroundColor: `${GOLD}40` }} />

                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-jost text-[10px] tracking-wider uppercase"
                          style={{ color: "rgba(255,255,255,0.35)" }}>
                          Full Name <span style={{ color: GOLD }}>*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Arjun Sharma"
                          className="w-full px-3 py-2.5 rounded-sm font-jost text-sm text-white
                                     placeholder:text-white/20 outline-none transition-colors duration-200
                                     bg-white/[0.04] border border-white/10 focus:border-[#B8976A]/50"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-jost text-[10px] tracking-wider uppercase"
                          style={{ color: "rgba(255,255,255,0.35)" }}>
                          Email <span style={{ color: GOLD }}>*</span>
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                          onBlur={() => { if (email && !isValidEmail(email)) setEmailError("Please enter a valid email address"); }}
                          placeholder="arjun@example.com"
                          className="w-full px-3 py-2.5 rounded-sm font-jost text-sm text-white
                                     placeholder:text-white/20 outline-none transition-colors duration-200
                                     bg-white/[0.04] border border-white/10 focus:border-[#B8976A]/50"
                        />
                        {emailError && <p className="font-jost text-[10px] text-red-400 mt-0.5">{emailError}</p>}
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-jost text-[10px] tracking-wider uppercase"
                          style={{ color: "rgba(255,255,255,0.35)" }}>
                          Phone <span style={{ color: GOLD }}>*</span>
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={cc}
                            onChange={e => setCC(e.target.value)}
                            className="w-[70px] px-2 py-2.5 rounded-sm rounded-r-none font-jost text-sm text-white text-center
                                       outline-none transition-colors duration-200
                                       bg-white/[0.04] border border-r-0 border-white/10 focus:border-[#B8976A]/50"
                          />
                          <input
                            required
                            type="tel"
                            value={phone}
                            onChange={e => { setPhone(stripNonDigits(e.target.value)); setPhoneError(""); }}
                            onBlur={() => { const d = stripNonDigits(phone); if (d.length > 0 && (d.length < 7 || d.length > 15)) setPhoneError("Phone number must be 7–15 digits"); }}
                            placeholder="98765 43210"
                            className="flex-1 px-3 py-2.5 rounded-sm rounded-l-none font-jost text-sm text-white
                                       placeholder:text-white/20 outline-none transition-colors duration-200
                                       bg-white/[0.04] border border-white/10 focus:border-[#B8976A]/50"
                          />
                        </div>
                        {phoneError && <p className="font-jost text-[10px] text-red-400 mt-0.5">{phoneError}</p>}
                      </div>

                      {/* Travel dates + Guests row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-jost text-[10px] tracking-wider uppercase"
                            style={{ color: "rgba(255,255,255,0.35)" }}>
                            Preferred Dates
                          </label>
                          <input
                            type="text"
                            value={travelDates}
                            onChange={e => setTravelDates(e.target.value)}
                            placeholder="e.g. 15-20 Dec 2026"
                            className="w-full px-3 py-2.5 rounded-sm font-jost text-sm text-white
                                       placeholder:text-white/20 outline-none transition-colors duration-200
                                       bg-white/[0.04] border border-white/10 focus:border-[#B8976A]/50"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-jost text-[10px] tracking-wider uppercase"
                            style={{ color: "rgba(255,255,255,0.35)" }}>
                            Guests
                          </label>
                          <select
                            value={guests}
                            onChange={e => setGuests(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-sm font-jost text-sm text-white
                                       outline-none transition-colors duration-200 appearance-none cursor-pointer
                                       bg-white/[0.04] border border-white/10 focus:border-[#B8976A]/50"
                            style={{ backgroundImage: "none" }}
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                              <option key={n} value={String(n)}
                                style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
                                {n} {n === 1 ? "Guest" : "Guests"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 font-jost text-[11px] tracking-widest uppercase
                                   transition-all duration-300 mt-1 disabled:opacity-60"
                        style={{
                          backgroundColor: GOLD,
                          color: "#0D0D0D",
                          border: `1px solid ${GOLD}`,
                        }}
                        onMouseEnter={e => !loading && ((e.currentTarget.style.backgroundColor = "#c9a97c"))}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
                      >
                        {loading ? "Sending…" : "Request a Call Back"}
                      </button>

                      <p className="font-jost text-[9px] text-center"
                        style={{ color: "rgba(255,255,255,0.20)" }}>
                        We&rsquo;ll reach out within 24 hours. No spam, ever.
                      </p>
                    </motion.form>
                  ) : (
                    /* ── Thank-you state ────────────────────── */
                    <motion.div
                      key="thanks"
                      className="flex flex-col items-center justify-center text-center
                                 gap-5 p-8 md:p-10 flex-1 min-h-[340px]"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Animated checkmark */}
                      <motion.div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${GOLD}20`, border: `1px solid ${GOLD}50` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                      >
                        <motion.svg
                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                          />
                        </motion.svg>
                      </motion.div>

                      <div>
                        <p className="font-jost text-[9px] tracking-[0.28em] uppercase mb-3"
                          style={{ color: `${GOLD}99` }}>
                          Message Received
                        </p>
                        <h3 className="font-cormorant font-light text-white text-2xl md:text-3xl mb-2">
                          Thank you, {thankName}!
                        </h3>
                        <p className="font-jost text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.45)" }}>
                          Our concierge team will reach out within 24 hours
                        </p>
                      </div>

                      <div className="h-px w-10" style={{ backgroundColor: `${GOLD}30` }} />

                      {/* WhatsApp CTA */}
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3
                                   font-jost text-[11px] tracking-widest uppercase
                                   transition-all duration-300"
                        style={{
                          border: `1px solid ${GOLD}50`,
                          color:  "#fff",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = `${GOLD}20`;
                          (e.currentTarget as HTMLElement).style.borderColor = GOLD;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}50`;
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                          style={{ color: "#25D366" }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat with us now
                      </a>

                      <p className="font-jost text-[9px]"
                        style={{ color: "rgba(255,255,255,0.18)" }}>
                        Closing in a moment…
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

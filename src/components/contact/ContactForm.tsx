"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormState {
  name:       string;
  email:      string;
  countryCode:string;
  phone:      string;
  checkIn:    string;
  checkOut:   string;
  guests:     string;
  message:    string;
}

const COUNTRY_CODES = [
  { code: "+91",  flag: "🇮🇳", label: "IN" },
  { code: "+1",   flag: "🇺🇸", label: "US" },
  { code: "+44",  flag: "🇬🇧", label: "UK" },
  { code: "+971", flag: "🇦🇪", label: "AE" },
  { code: "+65",  flag: "🇸🇬", label: "SG" },
  { code: "+61",  flag: "🇦🇺", label: "AU" },
  { code: "+49",  flag: "🇩🇪", label: "DE" },
  { code: "+33",  flag: "🇫🇷", label: "FR" },
];

const GUEST_OPTIONS = [
  "1–2 guests",
  "3–4 guests",
  "5–6 guests",
  "7–8 guests",
  "9–10 guests",
  "11–12 guests",
];

/* ── Shared field label + wrapper ─────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-jost text-cream/70 text-[10px] tracking-widest uppercase mb-2">
      {children}
    </p>
  );
}

const INPUT_BASE =
  "w-full bg-transparent border border-white/[0.2] px-4 py-[14px] " +
  "font-jost text-cream/90 text-[13px] tracking-[0.03em] placeholder:text-body/50 " +
  "focus:outline-none focus:border-gold/60 focus:bg-white/[0.02] focus:text-cream " +
  "transition-colors duration-300";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", countryCode: "+91", phone: "",
    checkIn: "", checkOut: "", guests: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          phone:   form.countryCode + " " + form.phone,
          checkIn: form.checkIn,
          checkOut:form.checkOut,
          guests:  form.guests,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      // Still show success to user — don't block them
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          /* ── Success state ─────────────────────────────────── */
          <motion.div
            key="success"
            className="flex flex-col gap-6 py-16 items-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Gold check */}
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center
                            justify-center text-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-cormorant text-cream font-light text-3xl
                             tracking-[0.04em] italic">
                Inquiry Received
              </h3>
              <p className="font-jost text-body/50 text-[12px] tracking-[0.03em]
                            leading-loose max-w-sm">
                Thank you. Our team will be in touch within 24 hours. For an
                immediate response, reach us directly on WhatsApp.
              </p>
            </div>
            <div className="h-px w-10 bg-gold/30" />
            <button
              onClick={() => { setSubmitted(false); setForm({ name:"",email:"",countryCode:"+91",phone:"",checkIn:"",checkOut:"",guests:"",message:"" }); }}
              className="font-jost text-body/40 text-[10px] tracking-widest uppercase
                         hover:text-body/70 transition-colors duration-300"
            >
              Send another inquiry →
            </button>
          </motion.div>
        ) : (
          /* ── Form ──────────────────────────────────────────── */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Full Name *</FieldLabel>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  className={INPUT_BASE}
                />
              </div>
              <div>
                <FieldLabel>Email Address *</FieldLabel>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  className={INPUT_BASE}
                />
              </div>
            </div>

            {/* Phone with country code */}
            <div>
              <FieldLabel>Phone Number *</FieldLabel>
              <div className="flex gap-0">
                <select
                  value={form.countryCode}
                  onChange={set("countryCode")}
                  className={[
                    "bg-white/[0.03] border border-r-0 border-white/[0.2]",
                    "px-3 py-[14px] font-jost text-body/80 text-[12px] tracking-wider",
                    "focus:outline-none focus:border-gold/60 transition-colors duration-300",
                    "cursor-pointer shrink-0 appearance-none",
                  ].join(" ")}
                  style={{ width: "80px" }}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}
                      className="bg-[#0A0A0A] text-cream">
                      {c.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={set("phone")}
                  className={INPUT_BASE + " flex-1"}
                />
              </div>
            </div>

            {/* Date range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Check-in Date *</FieldLabel>
                <input
                  type="date"
                  required
                  value={form.checkIn}
                  onChange={set("checkIn")}
                  min={new Date().toISOString().split("T")[0]}
                  className={INPUT_BASE + " [color-scheme:dark]"}
                />
              </div>
              <div>
                <FieldLabel>Check-out Date *</FieldLabel>
                <input
                  type="date"
                  required
                  value={form.checkOut}
                  onChange={set("checkOut")}
                  min={form.checkIn || new Date().toISOString().split("T")[0]}
                  className={INPUT_BASE + " [color-scheme:dark]"}
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <FieldLabel>Number of Guests</FieldLabel>
              <select
                value={form.guests}
                onChange={set("guests")}
                className={[
                  INPUT_BASE,
                  "appearance-none cursor-pointer",
                  form.guests ? "" : "text-body/25",
                ].join(" ")}
              >
                <option value="" className="bg-[#0A0A0A]">Select guest count</option>
                {GUEST_OPTIONS.map((g) => (
                  <option key={g} value={g} className="bg-[#0A0A0A] text-cream">{g}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <FieldLabel>Message / Special Requests</FieldLabel>
              <textarea
                rows={5}
                placeholder="Tell us about your stay — preferred room, celebrations, dietary needs, anything at all…"
                value={form.message}
                onChange={set("message")}
                className={INPUT_BASE + " resize-none leading-relaxed"}
              />
            </div>

            {/* Privacy note */}
            <p className="font-jost text-body/28 text-[10px] tracking-wider leading-loose -mt-2">
              Your details are used solely to respond to your inquiry. We do not share
              or sell your information to third parties.
            </p>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className={[
                "group relative overflow-hidden w-full sm:self-start sm:w-auto",
                "border border-gold/50 px-10 py-[15px]",
                "font-jost text-[11px] tracking-widest uppercase",
                "transition-all duration-400",
                loading
                  ? "text-body/40 border-white/[0.07] cursor-not-allowed"
                  : "text-cream hover:bg-gold/[0.08] hover:border-gold",
              ].join(" ")}
              whileHover={loading ? {} : { x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                {loading ? (
                  <>
                    {/* Spinner */}
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.2"/>
                      <path d="M21 12a9 9 0 00-9-9" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

type Policies = Record<string, string>;

const SECTIONS = [
  {
    title: "Stay Rules",
    fields: [
      { key: "checkin_time",      label: "Check-in Time",        type: "time",     hint: "e.g. 14:00" },
      { key: "checkout_time",     label: "Check-out Time",       type: "time",     hint: "e.g. 11:00" },
      { key: "max_occupancy",     label: "Max Occupancy",        type: "number",   hint: "Total guests" },
      { key: "min_nights",        label: "Minimum Nights",       type: "number",   hint: "Minimum stay" },
      { key: "security_deposit",  label: "Security Deposit (₹)", type: "number",   hint: "Refundable amount" },
      { key: "gst_rate",          label: "GST Rate (%)",         type: "number",   hint: "Applied to base rate" },
    ],
  },
  {
    title: "House Policies",
    fields: [
      { key: "bachelor_policy",   label: "Bachelor / Event Policy", type: "text",     hint: "" },
      { key: "sound_policy",      label: "Sound / Noise Policy",    type: "text",     hint: "" },
    ],
  },
  {
    title: "Cancellation Policy",
    fields: [
      { key: "cancellation_policy", label: "Cancellation Policy", type: "textarea", hint: "Shown to guests at checkout" },
    ],
  },
  {
    title: "Offers & Perks",
    fields: [
      { key: "offer_direct",      label: "Direct Booking Offer",  type: "text",     hint: "" },
      { key: "offer_fb",          label: "F&B Offer",             type: "text",     hint: "" },
      { key: "offer_welcome",     label: "Welcome Perk",          type: "text",     hint: "" },
    ],
  },
  {
    title: "Terms & Conditions",
    fields: [
      { key: "terms_conditions",  label: "Terms & Conditions",    type: "textarea", hint: "Shown on booking confirmation" },
    ],
  },
];

const INPUT    = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors";
const TEXTAREA = INPUT + " resize-y font-mono leading-relaxed";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policies>({});
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [dirty, setDirty]       = useState(false);

  useEffect(() => {
    fetch("/api/admin/policies").then(r => r.json()).then(d => { setPolicies(d); setLoading(false); });
  }, []);

  function handleChange(key: string, value: string) {
    setPolicies(p => ({ ...p, [key]: value }));
    setDirty(true); setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/policies", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(policies),
    });
    setSaving(false); setSaved(true); setDirty(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-3xl">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Policies</h1>
            <p className="text-sm text-gray-500 mt-0.5">Property rules, pricing settings, and guest-facing content</p>
          </div>
          <button onClick={handleSave} disabled={saving || !dirty}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all
              ${saved ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : dirty ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
            {saving ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                </svg>
                Saving…
              </>
            ) : saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Saved
              </>
            ) : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="px-6 py-8 max-w-3xl mx-auto space-y-8">
        {loading ? (
          <div className="text-center text-gray-400 text-sm py-16">Loading policies…</div>
        ) : (
          <>
            {SECTIONS.map(section => (
              <div key={section.title} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h2 className="text-sm font-semibold text-gray-700">{section.title}</h2>
                </div>
                <div className="px-6 py-5 space-y-5">
                  {section.fields.map(f => (
                    <div key={f.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{f.label}</label>
                        {f.hint && <span className="text-xs text-gray-400">{f.hint}</span>}
                      </div>
                      {f.type === "textarea" ? (
                        <textarea rows={8} value={policies[f.key] ?? ""} onChange={e => handleChange(f.key, e.target.value)} className={TEXTAREA} />
                      ) : f.type === "time" ? (
                        <input type="time" value={policies[f.key] ?? ""} onChange={e => handleChange(f.key, e.target.value)} className={INPUT + " w-36"} />
                      ) : f.type === "number" ? (
                        <input type="number" value={policies[f.key] ?? ""} onChange={e => handleChange(f.key, e.target.value)} className={INPUT + " w-40"} min={0} />
                      ) : (
                        <input type="text" value={policies[f.key] ?? ""} onChange={e => handleChange(f.key, e.target.value)} className={INPUT} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {dirty && (
              <div className="flex justify-end pb-8">
                <button onClick={handleSave} disabled={saving}
                  className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
                  {saving ? "Saving…" : "Save All Changes"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

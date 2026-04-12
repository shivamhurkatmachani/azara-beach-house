"use client";

import { useState, useEffect } from "react";

interface SeasonRate {
  id: string; name: string; startMonth: number; startDay: number;
  endMonth: number; endDay: number; nightlyRate: number; isActive: boolean;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const EMPTY  = { name: "", startMonth: 1, startDay: 1, endMonth: 12, endDay: 31, nightlyRate: 0, isActive: true };
const INPUT  = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400";

function fmt(n: number) { return "₹" + n.toLocaleString("en-IN"); }

export default function RatesPage() {
  const [rates, setRates]       = useState<SeasonRate[]>([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [editId, setEditId]     = useState<string | "new" | null>(null);
  const [form, setForm]         = useState(EMPTY);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);

  async function fetch_() {
    setLoading(true);
    const res  = await fetch("/api/admin/rates");
    const data = await res.json();
    setRates(data);
    setLoading(false);
  }

  useEffect(() => { fetch_(); }, []);

  function openEdit(r: SeasonRate) {
    setForm({ name: r.name, startMonth: r.startMonth, startDay: r.startDay,
              endMonth: r.endMonth, endDay: r.endDay, nightlyRate: r.nightlyRate, isActive: r.isActive });
    setEditId(r.id);
  }

  function set(k: string, v: string | number | boolean) { setForm(f => ({ ...f, [k]: v })); }

  async function save() {
    setSaving(true);
    if (editId === "new") {
      await fetch("/api/admin/rates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/admin/rates", { method: "PUT",  headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, ...form }) });
    }
    setSaving(false); setEditId(null); fetch_();
  }

  async function del(id: string) {
    setSaving(true);
    await fetch("/api/admin/rates", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSaving(false); setDelConfirm(null); fetch_();
  }

  async function toggle(r: SeasonRate) {
    await fetch("/api/admin/rates", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...r, isActive: !r.isActive }) });
    fetch_();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Season Rates</h1>
            <p className="text-sm text-gray-500 mt-0.5">Nightly base rates by season · +18% GST applied at checkout</p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditId("new"); }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Season
          </button>
        </div>
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto space-y-6">
        {/* Preview cards */}
        {!loading && rates.filter(r => r.isActive).length > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3">Active Rates (GST inclusive)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {rates.filter(r => r.isActive).map(r => (
                <div key={r.id} className="bg-white rounded-lg p-3 border border-amber-100">
                  <p className="text-xs text-gray-500 font-medium truncate">{r.name}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{fmt(Math.round(r.nightlyRate * 1.18))}</p>
                  <p className="text-[10px] text-gray-400">Base: {fmt(r.nightlyRate)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400 text-sm py-12">Loading…</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Season","Period","Base / Night","+ GST Total","Active",""].map(h => (
                    <th key={h} className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${h === "Base / Night" || h === "+ GST Total" ? "text-right" : h === "Active" ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rates.map(r => (
                  <tr key={r.id} className={!r.isActive ? "opacity-50" : ""}>
                    <td className="px-4 py-3.5 font-medium text-gray-900">{r.name}</td>
                    <td className="px-4 py-3.5 text-gray-500 text-sm whitespace-nowrap">
                      {MONTHS[r.startMonth-1]} {r.startDay} – {MONTHS[r.endMonth-1]} {r.endDay}
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-700">{fmt(r.nightlyRate)}</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-gray-900">{fmt(Math.round(r.nightlyRate * 1.18))}</td>
                    <td className="px-4 py-3.5 text-center">
                      <button onClick={() => toggle(r)}>
                        <span className={`inline-block w-8 h-4 rounded-full relative transition-colors ${r.isActive ? "bg-amber-400" : "bg-gray-200"}`}>
                          <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${r.isActive ? "translate-x-4" : "translate-x-0.5"}`} />
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(r)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button onClick={() => setDelConfirm(r.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="font-semibold text-gray-900 mb-5">{editId === "new" ? "Add Season Rate" : "Edit Season Rate"}</h3>
            <div className="space-y-4">
              <Field label="Season Name">
                <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
                  placeholder="e.g. Peak Season" className={INPUT} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Start Month">
                  <select value={form.startMonth} onChange={e => set("startMonth", Number(e.target.value))} className={INPUT}>
                    {MONTHS.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                  </select>
                </Field>
                <Field label="Start Day">
                  <input type="number" min={1} max={31} value={form.startDay} onChange={e => set("startDay", Number(e.target.value))} className={INPUT} />
                </Field>
                <Field label="End Month">
                  <select value={form.endMonth} onChange={e => set("endMonth", Number(e.target.value))} className={INPUT}>
                    {MONTHS.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                  </select>
                </Field>
                <Field label="End Day">
                  <input type="number" min={1} max={31} value={form.endDay} onChange={e => set("endDay", Number(e.target.value))} className={INPUT} />
                </Field>
              </div>
              <Field label="Nightly Rate (base, excl. GST)">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input type="number" value={form.nightlyRate} onChange={e => set("nightlyRate", Number(e.target.value))} className={INPUT + " pl-7"} />
                </div>
                {form.nightlyRate > 0 && (
                  <p className="text-xs text-gray-400 mt-1">With GST: <strong className="text-gray-600">{fmt(Math.round(form.nightlyRate * 1.18))}</strong>/night</p>
                )}
              </Field>
              <label className="flex items-center gap-2 cursor-pointer">
                <div onClick={() => set("isActive", !form.isActive)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? "bg-amber-500" : "bg-gray-200"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={save} disabled={saving || !form.name || form.nightlyRate <= 0}
                className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50">
                {saving ? "Saving…" : "Save Rate"}
              </button>
              <button onClick={() => setEditId(null)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Delete Rate?</h3>
            <p className="text-sm text-gray-500 mb-5">This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => del(delConfirm)} disabled={saving}
                className="flex-1 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50">Delete</button>
              <button onClick={() => setDelConfirm(null)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

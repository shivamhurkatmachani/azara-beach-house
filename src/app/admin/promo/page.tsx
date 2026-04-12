"use client";

import { useState, useEffect } from "react";

interface PromoCode {
  id: string; code: string; discount: number;
  validFrom: string; validTo: string; maxUses: number;
  usedCount: number; isActive: boolean; createdAt: string;
}

const EMPTY  = { code: "", discount: 10, validFrom: "", validTo: "", maxUses: 100, isActive: true };
const INPUT  = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400";

function fmtDate(s: string) { return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }

export default function PromoPage() {
  const [promos, setPromos]     = useState<PromoCode[]>([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [editId, setEditId]     = useState<string | "new" | null>(null);
  const [form, setForm]         = useState(EMPTY);
  const [delConfirm, setDel]    = useState<string | null>(null);
  const [copied, setCopied]     = useState<string | null>(null);

  async function fetch_() {
    setLoading(true);
    const res  = await fetch("/api/admin/promo");
    const data = await res.json();
    setPromos(data);
    setLoading(false);
  }

  useEffect(() => { fetch_(); }, []);

  function openEdit(p: PromoCode) {
    setForm({
      code: p.code, discount: p.discount,
      validFrom: p.validFrom.slice(0, 10),
      validTo:   p.validTo.slice(0, 10),
      maxUses: p.maxUses, isActive: p.isActive,
    });
    setEditId(p.id);
  }

  function set(k: string, v: string | number | boolean) { setForm(f => ({ ...f, [k]: v })); }

  async function save() {
    setSaving(true);
    const payload = { ...form, code: form.code.toUpperCase().trim(),
      validFrom: new Date(form.validFrom).toISOString(),
      validTo:   new Date(form.validTo).toISOString(),
    };
    if (editId === "new") {
      await fetch("/api/admin/promo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/admin/promo", { method: "PUT",  headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, ...payload }) });
    }
    setSaving(false); setEditId(null); fetch_();
  }

  async function del(id: string) {
    setSaving(true);
    await fetch("/api/admin/promo", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSaving(false); setDel(null); fetch_();
  }

  async function toggle(p: PromoCode) {
    await fetch("/api/admin/promo", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, isActive: !p.isActive }),
    });
    fetch_();
  }

  function copy(code: string) {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  }

  function status(p: PromoCode) {
    if (!p.isActive)                         return { label: "Inactive",   color: "bg-gray-100 text-gray-500 border-gray-200" };
    if (new Date(p.validTo) < new Date())    return { label: "Expired",    color: "bg-red-100 text-red-600 border-red-200" };
    if (p.usedCount >= p.maxUses)            return { label: "Exhausted",  color: "bg-orange-100 text-orange-600 border-orange-200" };
    return                                          { label: "Active",     color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Promo Codes</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {promos.length} code{promos.length !== 1 ? "s" : ""} · {promos.filter(p => p.isActive && new Date(p.validTo) >= new Date()).length} active
            </p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditId("new"); }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Code
          </button>
        </div>
      </div>

      <div className="px-6 py-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-400 text-sm py-12">Loading…</div>
        ) : promos.length === 0 ? (
          <div className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gray-200 mx-auto mb-3">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
            </svg>
            <p className="text-gray-400 text-sm">No promo codes yet.</p>
            <button onClick={() => { setForm(EMPTY); setEditId("new"); }} className="mt-3 text-sm text-amber-600 hover:text-amber-700 font-medium">Create your first →</button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Code","Discount","Valid Period","Usage","Status","Active",""].map(h => (
                    <th key={h} className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${h === "Active" ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {promos.map(p => {
                  const s  = status(p);
                  const pct = Math.min(100, Math.round((p.usedCount / p.maxUses) * 100));
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-sm">{p.code}</span>
                          <button onClick={() => copy(p.code)} className="text-gray-300 hover:text-gray-600">
                            {copied === p.code
                              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                            }
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-lg font-bold text-amber-600">{p.discount}%</span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-500">
                        <p>{fmtDate(p.validFrom)}</p><p>to {fmtDate(p.validTo)}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${pct >= 100 ? "bg-red-400" : pct > 60 ? "bg-amber-400" : "bg-emerald-400"}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{p.usedCount}/{p.maxUses}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.color}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button onClick={() => toggle(p)}>
                          <span className={`inline-block w-8 h-4 rounded-full relative transition-colors ${p.isActive ? "bg-amber-400" : "bg-gray-200"}`}>
                            <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${p.isActive ? "translate-x-4" : "translate-x-0.5"}`} />
                          </span>
                        </button>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button onClick={() => setDel(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="font-semibold text-gray-900 mb-5">{editId === "new" ? "Create Promo Code" : "Edit Promo Code"}</h3>
            <div className="space-y-4">
              <Field label="Code">
                <input type="text" value={form.code} onChange={e => set("code", e.target.value.toUpperCase().replace(/\s/g,""))} placeholder="e.g. SUMMER25" className={INPUT} />
              </Field>
              <Field label="Discount (%)">
                <div className="relative">
                  <input type="number" min={1} max={100} value={form.discount} onChange={e => set("discount", Number(e.target.value))} className={INPUT + " pr-7"} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Valid From">
                  <input type="date" value={form.validFrom} onChange={e => set("validFrom", e.target.value)} className={INPUT} />
                </Field>
                <Field label="Valid To">
                  <input type="date" value={form.validTo} onChange={e => set("validTo", e.target.value)} className={INPUT} />
                </Field>
              </div>
              <Field label="Max Uses">
                <input type="number" min={1} value={form.maxUses} onChange={e => set("maxUses", Number(e.target.value))} className={INPUT} />
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
              <button onClick={save} disabled={saving || !form.code || !form.validFrom || !form.validTo}
                className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50">
                {saving ? "Saving…" : editId === "new" ? "Create" : "Save"}
              </button>
              <button onClick={() => setEditId(null)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {delConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Delete Promo Code?</h3>
            <p className="text-sm text-gray-500 mb-5">This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => del(delConfirm)} disabled={saving}
                className="flex-1 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50">Delete</button>
              <button onClick={() => setDel(null)}
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

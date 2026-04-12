"use client";

import { useState, useEffect, useCallback } from "react";

interface Booking {
  id: string; ref: string; createdAt: string;
  checkIn: string; checkOut: string; nights: number; adults: number; children: number;
  firstName: string; lastName: string; email: string; phone: string;
  gstNumber?: string; specialRequests?: string; promoCode?: string;
  paymentOption: string; baseTotal: number; gstAmount: number; grandTotal: number;
  status: string; paidAmount: number; adminNotes?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-600 border-red-200",
  paid:      "bg-blue-100 text-blue-700 border-blue-200",
};

function fmt(n: number) { return "₹" + n.toLocaleString("en-IN"); }
function fmtDate(s: string) { return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
function fmtShort(s: string) { return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }); }

export default function BookingsPage() {
  const [bookings, setBookings]       = useState<Booking[]>([]);
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState<Booking | null>(null);
  const [actionLoading, setAction]    = useState(false);
  const [notes, setNotes]             = useState("");
  const [paidAmt, setPaidAmt]         = useState("");
  const [filterStatus, setFStatus]    = useState("");
  const [filterFrom, setFFrom]        = useState("");
  const [filterTo, setFTo]            = useState("");
  const [search, setSearch]           = useState("");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (filterStatus) p.set("status", filterStatus);
    if (filterFrom)   p.set("dateFrom", filterFrom);
    if (filterTo)     p.set("dateTo", filterTo);
    if (search)       p.set("search", search);
    const res  = await fetch(`/api/admin/bookings?${p}`);
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  }, [filterStatus, filterFrom, filterTo, search]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  function openDetail(b: Booking) {
    setSelected(b); setNotes(b.adminNotes ?? ""); setPaidAmt(String(b.paidAmount));
  }

  async function updateStatus(status: string) {
    if (!selected) return;
    setAction(true);
    await fetch(`/api/admin/bookings/${selected.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAction(false);
    setSelected(p => p ? { ...p, status } : null);
    setBookings(p => p.map(b => b.id === selected.id ? { ...b, status } : b));
  }

  async function saveNotes() {
    if (!selected) return;
    setAction(true);
    const paid = parseInt(paidAmt) || 0;
    await fetch(`/api/admin/bookings/${selected.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminNotes: notes, paidAmount: paid }),
    });
    setAction(false);
    setSelected(p => p ? { ...p, adminNotes: notes, paidAmount: paid } : null);
    setBookings(p => p.map(b => b.id === selected!.id ? { ...b, adminNotes: notes, paidAmount: paid } : b));
  }

  function exportCSV() {
    const headers = ["Ref","Check-in","Check-out","Nights","Guests","Name","Email","Phone","Base","GST","Total","Paid","Payment","Status","Promo","Booked On"];
    const rows = bookings.map(b => [
      b.ref, fmtDate(b.checkIn), fmtDate(b.checkOut), b.nights,
      `${b.adults}A ${b.children}C`, `${b.firstName} ${b.lastName}`,
      b.email, b.phone, b.baseTotal, b.gstAmount, b.grandTotal, b.paidAmount,
      b.paymentOption, b.status, b.promoCode ?? "", fmtDate(b.createdAt),
    ]);
    const csv  = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `azara-bookings-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalRevenue = bookings.reduce((s, b) => s + (b.status !== "cancelled" ? b.grandTotal : 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Bookings</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} · {fmt(totalRevenue)} revenue
            </p>
          </div>
          <button onClick={exportCSV} disabled={bookings.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium
                       rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Export CSV
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <input type="text" placeholder="Search name, email, ref…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 w-52" />
          <select value={filterStatus} onChange={e => setFStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">From</span>
            <input type="date" value={filterFrom} onChange={e => setFFrom(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">To</span>
            <input type="date" value={filterTo} onChange={e => setFTo(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
          </div>
          {(filterStatus || filterFrom || filterTo || search) && (
            <button onClick={() => { setFStatus(""); setFFrom(""); setFTo(""); setSearch(""); }}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium">Clear</button>
          )}
        </div>
      </div>

      <div className="px-6 py-4">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading…</div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-gray-300">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
            </svg>
            <p className="text-sm">No bookings found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Ref","Check-in","Check-out","Guest","Nights","Guests","Total","Payment","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map(b => (
                    <tr key={b.id} onClick={() => openDetail(b)}
                      className={`cursor-pointer transition-colors hover:bg-amber-50/60 ${selected?.id === b.id ? "bg-amber-50" : ""}`}>
                      <td className="px-4 py-3.5 font-mono text-xs text-gray-500">{b.ref}</td>
                      <td className="px-4 py-3.5 text-gray-700 whitespace-nowrap">{fmtShort(b.checkIn)}</td>
                      <td className="px-4 py-3.5 text-gray-700 whitespace-nowrap">{fmtShort(b.checkOut)}</td>
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-gray-900">{b.firstName} {b.lastName}</p>
                        <p className="text-xs text-gray-400">{b.email}</p>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">{b.nights}N</td>
                      <td className="px-4 py-3.5 text-gray-600">{b.adults}A{b.children > 0 ? ` ${b.children}C` : ""}</td>
                      <td className="px-4 py-3.5 font-medium text-gray-900">{fmt(b.grandTotal)}</td>
                      <td className="px-4 py-3.5 text-xs text-gray-500">{b.paymentOption === "full" ? "100%" : "50%"}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[b.status] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail slide-over */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setSelected(null)} />
          <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <p className="font-mono text-xs text-gray-400">{selected.ref}</p>
                <h2 className="font-semibold text-gray-900 mt-0.5">{selected.firstName} {selected.lastName}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 space-y-5 flex-1">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${STATUS_COLORS[selected.status] ?? ""}`}>
                {selected.status}
              </span>

              <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-3 gap-4">
                <DField label="Check-in"   value={fmtDate(selected.checkIn)} />
                <DField label="Check-out"  value={fmtDate(selected.checkOut)} />
                <DField label="Duration"   value={`${selected.nights} nights`} />
                <DField label="Adults"     value={String(selected.adults)} />
                <DField label="Children"   value={String(selected.children)} />
                <DField label="Booked On"  value={fmtDate(selected.createdAt)} />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Guest Details</h3>
                <div className="space-y-2">
                  <Row label="Email"   value={selected.email} />
                  <Row label="Phone"   value={selected.phone} />
                  {selected.gstNumber  && <Row label="GST Number"  value={selected.gstNumber} />}
                  {selected.promoCode  && <Row label="Promo Code"  value={selected.promoCode} />}
                  {selected.specialRequests && (
                    <div className="flex gap-3">
                      <span className="text-xs text-gray-400 w-28 shrink-0 pt-0.5">Special Requests</span>
                      <p className="text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 flex-1">{selected.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment</h3>
                <div className="space-y-2">
                  <Row label="Option"      value={selected.paymentOption === "full" ? "100% upfront" : "50% advance"} />
                  <Row label="Base Amount" value={fmt(selected.baseTotal)} />
                  <Row label="GST (18%)"   value={fmt(selected.gstAmount)} />
                  <Row label="Grand Total" value={fmt(selected.grandTotal)} bold />
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-28 shrink-0">Amount Paid</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">₹</span>
                      <input type="number" value={paidAmt} onChange={e => setPaidAmt(e.target.value)}
                        className="w-32 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-900
                                   focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Admin Notes</h3>
                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Internal notes…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30
                             focus:border-amber-400 resize-none" />
                <button onClick={saveNotes} disabled={actionLoading}
                  className="mt-2 px-4 py-1.5 text-xs font-medium text-white bg-gray-700 rounded-lg
                             hover:bg-gray-600 transition-colors disabled:opacity-50">
                  Save Notes & Amount
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-2">
              {selected.status !== "confirmed" && selected.status !== "paid" && (
                <button onClick={() => updateStatus("confirmed")} disabled={actionLoading}
                  className="flex-1 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                  Confirm
                </button>
              )}
              {selected.status !== "paid" && (
                <button onClick={() => updateStatus("paid")} disabled={actionLoading}
                  className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  Mark as Paid
                </button>
              )}
              {selected.status !== "cancelled" && (
                <button onClick={() => updateStatus("cancelled")} disabled={actionLoading}
                  className="flex-1 py-2 bg-red-50 text-red-600 border border-red-200 text-sm font-medium rounded-lg hover:bg-red-100 disabled:opacity-50">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="font-medium text-gray-900 text-sm mt-0.5">{value}</p>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className="text-xs text-gray-400 w-28 shrink-0 pt-0.5">{label}</span>
      <span className={`text-sm flex-1 ${bold ? "font-semibold text-gray-900" : "text-gray-700"}`}>{value}</span>
    </div>
  );
}

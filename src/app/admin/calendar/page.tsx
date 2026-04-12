"use client";

import { useState, useEffect, useCallback } from "react";

interface BlockedDate { date: string; reason?: string | null; }
interface BookedDay   { [date: string]: { name: string; ref: string } }

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function startOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setYear]   = useState(today.getFullYear());
  const [viewMonth, setMonth] = useState(today.getMonth());
  const [blocked, setBlocked] = useState<BlockedDate[]>([]);
  const [booked, setBooked]   = useState<BookedDay>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [rangeStart, setRS]   = useState<string | null>(null);
  const [rangeEnd, setRE]     = useState<string | null>(null);
  const [hover, setHover]     = useState<string | null>(null);
  const [reason, setReason]   = useState("");
  const [modal, setModal]     = useState(false);
  const [tooltip, setTooltip] = useState<{ date: string; x: number; y: number } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const month = `${viewYear}-${String(viewMonth + 1).padStart(2,"0")}`;
    const res   = await fetch(`/api/admin/calendar?month=${month}`);
    const data  = await res.json();
    setBlocked(data.blocked ?? []);
    setBooked(data.bookedDays ?? {});
    setLoading(false);
  }, [viewYear, viewMonth]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const blockedSet = new Set(blocked.map(b => b.date));

  function range(a: string, b: string): string[] {
    const [s, e] = a <= b ? [a, b] : [b, a];
    const dates: string[] = [];
    const cur = new Date(s);
    while (cur.toISOString().slice(0,10) <= e) {
      dates.push(cur.toISOString().slice(0,10));
      cur.setDate(cur.getDate() + 1);
    }
    return dates;
  }

  function selectedSet(): Set<string> {
    if (!rangeStart) return new Set();
    const end = rangeEnd ?? hover ?? rangeStart;
    return new Set(range(rangeStart, end));
  }

  const sel = selectedSet();

  function handleDayClick(d: string) {
    if (booked[d]) return;
    if (!rangeStart) { setRS(d); setRE(null); }
    else if (!rangeEnd) {
      const [a, b] = d <= rangeStart ? [d, rangeStart] : [rangeStart, d];
      setRS(a); setRE(b); setModal(true);
    } else { setRS(d); setRE(null); }
  }

  async function confirmBlock() {
    if (!rangeStart || !rangeEnd) return;
    setSaving(true);
    const dates = range(rangeStart, rangeEnd).filter(d => !booked[d]);
    await fetch("/api/admin/calendar", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dates, reason }),
    });
    setSaving(false); setRS(null); setRE(null); setReason(""); setModal(false);
    fetchData();
  }

  async function unblockDate(d: string) {
    setSaving(true);
    await fetch("/api/admin/calendar", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dates: [d] }),
    });
    setSaving(false); fetchData();
  }

  async function unblockRange() {
    if (!rangeStart || !rangeEnd) return;
    setSaving(true);
    await fetch("/api/admin/calendar", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dates: range(rangeStart, rangeEnd) }),
    });
    setSaving(false); setRS(null); setRE(null); fetchData();
  }

  const todayStr = today.toISOString().slice(0,10);
  const days     = daysInMonth(viewYear, viewMonth);
  const offset   = startOfMonth(viewYear, viewMonth);

  const blockedThisMonth = blocked.filter(b => b.date.startsWith(`${viewYear}-${String(viewMonth+1).padStart(2,"0")}`)).length;
  const bookedThisMonth  = Object.keys(booked).filter(d => d.startsWith(`${viewYear}-${String(viewMonth+1).padStart(2,"0")}`)).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Availability Calendar</h1>
            <p className="text-sm text-gray-500 mt-0.5">Click a date to start a range, click another to end it — then block or unblock</p>
          </div>
          {rangeStart && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                {rangeStart}{rangeEnd ? ` → ${rangeEnd}` : " (select end…)"}
              </span>
              {rangeEnd && (
                <>
                  <button onClick={() => setModal(true)} disabled={saving}
                    className="px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg hover:bg-gray-700">
                    Block
                  </button>
                  <button onClick={unblockRange} disabled={saving}
                    className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100">
                    Unblock
                  </button>
                </>
              )}
              <button onClick={() => { setRS(null); setRE(null); }} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-3">
          {[
            { color: "bg-emerald-100 text-emerald-700", label: "Available", count: days - blockedThisMonth - bookedThisMonth },
            { color: "bg-rose-100 text-rose-700",       label: "Booked",    count: bookedThisMonth },
            { color: "bg-gray-200 text-gray-600",       label: "Blocked",   count: blockedThisMonth },
          ].map(p => (
            <span key={p.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${p.color}`}>
              {p.label}: <strong>{p.count}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <LegItem color="bg-emerald-200" label="Available" />
          <LegItem color="bg-rose-300"    label="Booked" />
          <LegItem color="bg-gray-300"    label="Blocked" />
          <LegItem color="bg-amber-200"   label="Selected" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button onClick={() => { if (viewMonth === 0) { setYear(y => y-1); setMonth(11); } else setMonth(m => m-1); }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h2 className="text-base font-semibold text-gray-900">{MONTHS[viewMonth]} {viewYear}</h2>
            <button onClick={() => { if (viewMonth === 11) { setYear(y => y+1); setMonth(0); } else setMonth(m => m+1); }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Loading…</div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-7 mb-2">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: days }, (_, i) => i + 1).map(day => {
                  const d        = toISO(viewYear, viewMonth, day);
                  const isBooked = !!booked[d];
                  const isBlocked = blockedSet.has(d);
                  const isToday   = d === todayStr;
                  const inRange   = sel.has(d);
                  const isPast    = d < todayStr;
                  const isStart   = d === rangeStart;
                  const isEnd     = d === rangeEnd;

                  let bg = "bg-emerald-50 hover:bg-emerald-100 cursor-pointer";
                  if (isBooked)  bg = "bg-rose-100 cursor-default";
                  if (isBlocked) bg = "bg-gray-100 hover:bg-gray-200 cursor-pointer";
                  if (isPast && !isBooked && !isBlocked) bg = "bg-gray-50 cursor-default";
                  if (inRange)   bg = "bg-amber-100 hover:bg-amber-200 cursor-pointer";
                  if (isStart || isEnd) bg = "bg-amber-300 cursor-pointer";

                  return (
                    <div
                      key={day}
                      className={`relative rounded-lg p-1.5 min-h-[52px] transition-colors select-none ${bg}`}
                      onClick={() => !isPast && !isBooked ? handleDayClick(d) : undefined}
                      onMouseEnter={e => {
                        setHover(d);
                        if (booked[d]) {
                          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          setTooltip({ date: d, x: r.left, y: r.bottom });
                        }
                      }}
                      onMouseLeave={() => { setHover(null); setTooltip(null); }}
                    >
                      <span className={`text-xs font-medium ${isToday ? "text-amber-600 font-bold" : isPast && !isBooked && !isBlocked ? "text-gray-300" : isBooked ? "text-rose-600" : isBlocked ? "text-gray-500" : "text-gray-700"}`}>
                        {day}{isToday && <span className="ml-0.5">·</span>}
                      </span>
                      {isBooked  && <p className="text-[9px] text-rose-500 mt-0.5 truncate">{booked[d].ref}</p>}
                      {isBlocked && (
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-[9px] text-gray-400">Blocked</p>
                          <button onClick={e => { e.stopPropagation(); unblockDate(d); }}
                            className="text-[9px] text-red-400 hover:text-red-600 font-bold">✕</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {blocked.length > 0 && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Blocked Dates ({blocked.length})</h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
              {blocked.sort((a,b) => a.date.localeCompare(b.date)).map(b => (
                <div key={b.date} className="flex items-center justify-between px-5 py-2.5">
                  <div>
                    <span className="text-sm text-gray-800 font-medium">{b.date}</span>
                    {b.reason && <span className="text-xs text-gray-400 ml-2">— {b.reason}</span>}
                  </div>
                  <button onClick={() => unblockDate(b.date)} disabled={saving}
                    className="text-xs text-red-400 hover:text-red-600 font-medium disabled:opacity-50">Unblock</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {tooltip && booked[tooltip.date] && (
        <div className="fixed z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y + 6 }}>
          <p className="font-medium">{booked[tooltip.date].ref}</p>
          <p className="text-gray-300">{booked[tooltip.date].name}</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <h3 className="font-semibold text-gray-900 mb-1">Block Dates</h3>
            <p className="text-sm text-gray-500 mb-4">
              {rangeStart === rangeEnd ? rangeStart : `${rangeStart} → ${rangeEnd}`}
            </p>
            <label className="block text-xs font-medium text-gray-600 mb-1">Reason (optional)</label>
            <input type="text" value={reason} onChange={e => setReason(e.target.value)}
              placeholder="e.g. Owner stay, maintenance…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 mb-4" />
            <div className="flex gap-2">
              <button onClick={confirmBlock} disabled={saving}
                className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50">
                {saving ? "Blocking…" : "Block Dates"}
              </button>
              <button onClick={() => { setModal(false); setRS(null); setRE(null); }}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LegItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded-sm ${color} inline-block`} /> {label}
    </span>
  );
}

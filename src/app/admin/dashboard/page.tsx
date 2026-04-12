"use client";

import { useEffect, useState } from "react";

interface Stats {
  monthCount: number;
  monthRevenue: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  statusMap: Record<string, number>;
  last7Revenue: { date: string; revenue: number }[];
  upcomingArrivals: {
    ref: string; firstName: string; lastName: string; email: string;
    checkIn: string; checkOut: string; nights: number; adults: number; grandTotal: number; status: string;
  }[];
  bookedDateMap: Record<string, string>;
  blockedDates: string[];
}

function fmt(n: number) {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  if (n >= 1000)   return "₹" + (n / 1000).toFixed(0) + "K";
  return "₹" + n;
}

function fmtFull(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  paid:      "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function DashboardPage() {
  const [stats, setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const maxRevenue = Math.max(...stats.last7Revenue.map(d => d.revenue), 1);
  const totalBookings = Object.values(stats.statusMap).reduce((a, b) => a + b, 0);

  // 30-day occupancy grid
  const today = new Date();
  const days30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });
  const bookedCount  = days30.filter(d => stats.bookedDateMap[d]).length;
  const blockedCount = days30.filter(d => stats.blockedDates.includes(d)).length;
  const occupancyPct = Math.round((bookedCount / 30) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Bookings This Month"
            value={String(stats.monthCount)}
            sub="confirmed + paid"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
              </svg>
            }
            color="text-amber-600"
            bg="bg-amber-50"
          />
          <StatCard
            label="Revenue This Month"
            value={fmt(stats.monthRevenue)}
            sub={fmtFull(stats.monthRevenue) + " total"}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
            }
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <StatCard
            label="Today's Check-ins"
            value={String(stats.todayCheckIns)}
            sub="guests arriving today"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/>
              </svg>
            }
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <StatCard
            label="Today's Check-outs"
            value={String(stats.todayCheckOuts)}
            sub="guests departing today"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            }
            color="text-violet-600"
            bg="bg-violet-50"
          />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Revenue bar chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue — Last 7 Days</h3>
            <div className="flex items-end gap-2 h-32">
              {stats.last7Revenue.map((d, i) => {
                const pct = maxRevenue > 0 ? Math.max(4, (d.revenue / maxRevenue) * 100) : 4;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className="w-full rounded-t-md transition-all duration-300"
                      style={{
                        height: `${pct}%`,
                        background: d.revenue > 0
                          ? "linear-gradient(to top, #92400e, #f59e0b)"
                          : "#f3f4f6",
                      }}
                    />
                    {d.revenue > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex
                                      bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                        {fmtFull(d.revenue)}
                      </div>
                    )}
                    <span className="text-[9px] text-gray-400">
                      {new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status donut */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Booking Status</h3>
            {totalBookings === 0 ? (
              <div className="flex items-center justify-center h-24 text-gray-300 text-sm">No bookings yet</div>
            ) : (
              <>
                <StatusDonut statusMap={stats.statusMap} total={totalBookings} />
                <div className="mt-3 space-y-1.5">
                  {Object.entries(stats.statusMap).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          status === "confirmed" ? "bg-emerald-400" :
                          status === "pending"   ? "bg-amber-400"   :
                          status === "paid"      ? "bg-blue-400"    : "bg-red-400"
                        }`} />
                        <span className="text-xs text-gray-600 capitalize">{status}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-800">{count}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Occupancy + upcoming */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* 30-day occupancy grid */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Next 30 Days</h3>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                {occupancyPct}% booked
              </span>
            </div>
            <div className="grid grid-cols-10 gap-1">
              {days30.map(d => {
                const booked  = !!stats.bookedDateMap[d];
                const blocked = stats.blockedDates.includes(d);
                return (
                  <div
                    key={d}
                    title={d}
                    className={`h-5 rounded-sm ${
                      booked   ? "bg-rose-400" :
                      blocked  ? "bg-gray-300" :
                                 "bg-emerald-200"
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-3 mt-3">
              <Legend color="bg-emerald-200" label="Free" />
              <Legend color="bg-rose-400"    label={`Booked (${bookedCount})`} />
              <Legend color="bg-gray-300"    label={`Blocked (${blockedCount})`} />
            </div>
          </div>

          {/* Upcoming arrivals */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Upcoming Arrivals</h3>
            </div>
            {stats.upcomingArrivals.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-gray-300 text-sm">No upcoming arrivals</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {stats.upcomingArrivals.map(b => (
                  <div key={b.ref} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="shrink-0 text-center w-14">
                      <p className="text-xs text-gray-400 uppercase tracking-wider leading-none">
                        {new Date(b.checkIn).toLocaleDateString("en-IN", { month: "short" })}
                      </p>
                      <p className="text-2xl font-bold text-gray-800 leading-tight">
                        {new Date(b.checkIn).getDate()}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{b.firstName} {b.lastName}</p>
                      <p className="text-xs text-gray-400">{b.nights}N · {b.adults}A · {fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-gray-800">{fmtFull(b.grandTotal)}</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize ${STATUS_COLORS[b.status] ?? "bg-gray-100 text-gray-500"}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending actions */}
        {stats.statusMap["pending"] > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm font-semibold text-amber-800">
                {stats.statusMap["pending"]} booking{stats.statusMap["pending"] > 1 ? "s" : ""} awaiting confirmation
              </p>
            </div>
            <p className="text-xs text-amber-700 ml-6">
              Go to <a href="/admin/bookings" className="underline font-medium">Bookings</a> to review and confirm pending requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label, value, sub, icon, color, bg,
}: {
  label: string; value: string; sub: string;
  icon: React.ReactNode; color: string; bg: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center ${color} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs font-medium text-gray-600 mt-0.5">{label}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function StatusDonut({ statusMap, total }: { statusMap: Record<string, number>; total: number }) {
  const colors = { confirmed: "#34d399", pending: "#fbbf24", paid: "#60a5fa", cancelled: "#f87171" };
  let acc = 0;
  const segments = Object.entries(statusMap).map(([status, count]) => {
    const pct  = (count / total) * 100;
    const seg  = { status, count, start: acc, pct };
    acc += pct;
    return seg;
  });

  const gradient = segments
    .map(s => `${colors[s.status as keyof typeof colors] ?? "#d1d5db"} ${s.start}% ${s.start + s.pct}%`)
    .join(", ");

  return (
    <div className="flex justify-center">
      <div
        className="w-20 h-20 rounded-full"
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      />
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-sm ${color} shrink-0`} />
      <span className="text-[10px] text-gray-500">{label}</span>
    </div>
  );
}

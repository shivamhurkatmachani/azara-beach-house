"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  message?: string;
  status: string;
  source: string;
}

function SourceBadge({ source }: { source: string }) {
  const isPopup = source === "popup";
  return (
    <span className={[
      "px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wider whitespace-nowrap",
      isPopup
        ? "bg-violet-900/40 text-violet-300 border border-violet-700/30"
        : "bg-gray-800 text-gray-500 border border-gray-700/30",
    ].join(" ")}>
      {isPopup ? "Popup" : "Contact Page"}
    </span>
  );
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState<Inquiry | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/inquiries");
    if (res.ok) setInquiries(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markResponded(id: string) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "responded" }),
    });
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: "responded" } : i));
    if (selected?.id === id) setSelected(s => s ? { ...s, status: "responded" } : null);
  }

  const newCount   = inquiries.filter(i => i.status === "new").length;
  const popupCount = inquiries.filter(i => i.source === "popup").length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Contact Inquiries</h1>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-gray-400 text-sm">
              {newCount > 0 ? `${newCount} new` : "All reviewed"}
            </p>
            {popupCount > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/30">
                {popupCount} popup lead{popupCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-gray-400 text-sm">Loading…</div>
        ) : inquiries.length === 0 ? (
          <div className="border border-gray-800 rounded-lg p-12 text-center text-gray-500">
            No inquiries yet.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Table */}
            <div className="flex-1 border border-gray-800 rounded-lg overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left hidden sm:table-cell">Email</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Dates</th>
                    <th className="px-4 py-3 text-left">Source</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {inquiries.map(inq => (
                    <tr
                      key={inq.id}
                      onClick={() => setSelected(inq)}
                      className={[
                        "cursor-pointer transition-colors duration-150",
                        selected?.id === inq.id ? "bg-gray-800" : "hover:bg-gray-900/50",
                        inq.status === "new" ? "border-l-2 border-amber-500" : "",
                      ].join(" ")}
                    >
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{inq.name}</td>
                      <td className="px-4 py-3 text-gray-300 hidden sm:table-cell">{inq.email}</td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                        {inq.checkIn
                          ? inq.checkOut
                            ? `${inq.checkIn} → ${inq.checkOut}`
                            : inq.checkIn   // popup stores travel dates in checkIn as free text
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <SourceBadge source={inq.source} />
                      </td>
                      <td className="px-4 py-3">
                        <span className={[
                          "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider",
                          inq.status === "new"
                            ? "bg-amber-900/40 text-amber-400"
                            : "bg-gray-800 text-gray-500",
                        ].join(" ")}>
                          {inq.status === "new" ? "New" : "Responded"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {inq.status === "new" && (
                          <button
                            onClick={e => { e.stopPropagation(); markResponded(inq.id); }}
                            className="text-xs text-amber-400 hover:text-amber-300
                                       border border-amber-700/40 hover:border-amber-500
                                       px-2 py-1 rounded transition-colors whitespace-nowrap"
                          >
                            Mark Responded
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detail panel */}
            {selected && (
              <div className="lg:w-80 border border-gray-800 rounded-lg p-5 flex flex-col gap-4 self-start">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{selected.name}</h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-500 hover:text-white text-lg leading-none"
                  >
                    ×
                  </button>
                </div>

                <SourceBadge source={selected.source} />

                <div className="flex flex-col gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-amber-400 hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Phone</p>
                      <a href={`tel:${selected.phone}`} className="text-gray-200 hover:text-amber-400 transition-colors">
                        {selected.phone}
                      </a>
                    </div>
                  )}
                  {selected.checkIn && (
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
                        {selected.checkOut ? "Check-in" : "Preferred Dates"}
                      </p>
                      <p className="text-gray-200">
                        {selected.checkOut
                          ? `${selected.checkIn} → ${selected.checkOut}`
                          : selected.checkIn}
                      </p>
                    </div>
                  )}
                  {selected.guests && (
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Guests</p>
                      <p className="text-gray-200">{selected.guests}</p>
                    </div>
                  )}
                  {selected.message && (
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Message</p>
                      <p className="text-gray-300 leading-relaxed text-[12px]">{selected.message}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Status</p>
                  <span className={[
                    "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider w-fit",
                    selected.status === "new" ? "bg-amber-900/40 text-amber-400" : "bg-gray-800 text-gray-500",
                  ].join(" ")}>
                    {selected.status === "new" ? "New" : "Responded"}
                  </span>
                  {selected.status === "new" && (
                    <button
                      onClick={() => markResponded(selected.id)}
                      className="mt-1 w-full py-2 text-xs font-medium tracking-wider uppercase
                                 bg-amber-700/20 border border-amber-700/40 text-amber-400
                                 hover:bg-amber-700/30 hover:border-amber-500 rounded transition-colors"
                    >
                      Mark as Responded
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

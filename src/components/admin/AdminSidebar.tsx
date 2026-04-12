"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
      </svg>
    ),
  },
  {
    href: "/admin/calendar",
    label: "Calendar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  },
  {
    href: "/admin/rates",
    label: "Rates",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    href: "/admin/promo",
    label: "Promo Codes",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    href: "/admin/policies",
    label: "Policies",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname    = usePathname();
  const router      = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #B8976A, #8B6840)" }}>
            <span className="text-white text-[10px] font-bold">A</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold tracking-wide">Azara Admin</p>
            <p className="text-gray-500 text-[10px] tracking-wider">Beach House · Goa</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                active
                  ? "bg-amber-700/20 text-amber-400 font-medium"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-100",
              ].join(" ")}
            >
              <span className={active ? "text-amber-400" : "text-gray-500"}>{item.icon}</span>
              {item.label}
              {active && <div className="ml-auto w-1 h-4 rounded-full bg-amber-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-2 border-t border-gray-800 space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400
                     hover:bg-gray-800 hover:text-gray-100 transition-all duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" className="text-gray-500">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View Live Site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400
                     hover:bg-red-900/30 hover:text-red-400 transition-all duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" className="text-gray-500">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 bg-gray-900 flex-col z-30 border-r border-gray-800">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900 border-b border-gray-800
                      h-14 flex items-center px-4 gap-3">
        <button onClick={() => setOpen(true)} className="text-gray-400 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <span className="text-white text-sm font-semibold">Azara Admin</span>
      </div>

      {/* Mobile overlay */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-60 bg-gray-900 z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}

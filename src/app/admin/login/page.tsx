"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 rounded-xl items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, #B8976A, #7A5C35)" }}>
            <span className="text-white text-2xl font-light font-serif">A</span>
          </div>
          <h1 className="text-white text-2xl font-semibold tracking-tight">Azara Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Beach House Management · Goa</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <h2 className="text-white font-medium text-lg mb-6">Sign in to Dashboard</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-medium tracking-wider uppercase mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@azarabeachhouse.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                           text-white text-sm placeholder:text-gray-600
                           focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium tracking-wider uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                           text-white text-sm placeholder:text-gray-600
                           focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-950/60 border border-red-900/50 rounded-lg px-3 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" className="text-red-400 shrink-0">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-medium text-white transition-all duration-200
                         mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: loading ? "#6B4F2A" : "linear-gradient(135deg, #B8976A, #8B6840)" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/>
                    <path d="M21 12a9 9 0 00-9-9"/>
                  </svg>
                  Signing in…
                </>
              ) : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">Azara Beach House · Private Admin Portal</p>
      </div>
    </div>
  );
}

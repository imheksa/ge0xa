"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { generateData, getSavedBrands, saveBrand, removeBrand } from "@/lib/brand-data";

export default function BrandsPage() {
  const { user, loading, signOut } = useAuth();
  const [brands, setBrands] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/ge0xa/login";
    }
  }, [user, loading]);

  useEffect(() => {
    setBrands(getSavedBrands());
  }, []);

  function handleAdd() {
    const name = input.trim();
    if (!name || brands.includes(name)) return;
    saveBrand(name);
    setBrands(getSavedBrands());
    setInput("");
  }

  function handleRemove(brand: string) {
    removeBrand(brand);
    setBrands(getSavedBrands());
    setDeleteConfirm(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <a href="/ge0xa/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cyan-400">
              <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="text-gradient">Hexa</span>
            <span className="text-white">gent</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/ge0xa/brands" className="text-sm text-cyan-400 font-medium">My Brands</a>
            <a href="/ge0xa/compare" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Compare</a>
            <a href="/ge0xa/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Home</a>
            <button
              onClick={async () => { await signOut(); window.location.href = "/ge0xa/"; }}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="h-7 w-7 rounded-full border border-white/10" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 text-xs font-bold text-white">
                  {(user.displayName || user.email || "U")[0].toUpperCase()}
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My Brands</h1>
            <p className="mt-1 text-sm text-gray-500">Track and monitor your brands across AI engines</p>
          </div>
          <a
            href="/ge0xa/compare"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            Compare Brands
          </a>
        </div>

        <div className="mt-8 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter brand name..."
            className="flex-1 rounded-lg border border-white/10 bg-gray-900/50 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-medium text-white hover:from-cyan-400 hover:to-violet-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Add Brand
          </button>
        </div>

        {brands.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/5 bg-gray-900/50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-gray-600">
                <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">No brands yet</h3>
            <p className="mt-2 text-sm text-gray-500">Add your first brand to start tracking AI visibility</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => {
              const data = generateData(brand);
              const foundCount = data.engines.filter((e) => e.status === "mentioned").length;
              const highAlerts = data.alerts.filter((a) => a.severity === "high").length;
              return (
                <div key={brand} className="group rounded-xl border border-white/5 bg-gray-900/50 p-6 hover:border-cyan-500/20 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{brand}</h3>
                      <p className="mt-1 text-xs text-gray-500">Last scanned 5 min ago</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {deleteConfirm === brand ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleRemove(brand)}
                            className="rounded-md bg-red-500/10 px-2 py-1 text-xs text-red-400 hover:bg-red-500/20"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400 hover:bg-white/10"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(brand)}
                          className="rounded-md p-1.5 text-gray-600 hover:bg-white/5 hover:text-red-400 transition-colors"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-950/50 p-3">
                      <p className="text-xs text-gray-500">Brand Score</p>
                      <p className="mt-1 text-xl font-bold text-cyan-400">{data.brandScore}<span className="text-xs text-gray-500">/100</span></p>
                    </div>
                    <div className="rounded-lg bg-gray-950/50 p-3">
                      <p className="text-xs text-gray-500">Share of Answer</p>
                      <p className="mt-1 text-xl font-bold text-violet-400">{data.soa}<span className="text-xs text-gray-500">%</span></p>
                    </div>
                    <div className="rounded-lg bg-gray-950/50 p-3">
                      <p className="text-xs text-gray-500">AI Engines</p>
                      <p className="mt-1 text-xl font-bold text-emerald-400">{foundCount}<span className="text-xs text-gray-500">/4</span></p>
                    </div>
                    <div className="rounded-lg bg-gray-950/50 p-3">
                      <p className="text-xs text-gray-500">Alerts</p>
                      <p className="mt-1 text-xl font-bold text-red-400">{highAlerts}<span className="text-xs text-gray-500"> high</span></p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <a
                      href={`/ge0xa/dashboard?brand=${encodeURIComponent(brand)}`}
                      className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 py-2 text-center text-sm font-medium text-cyan-400 hover:from-cyan-500/20 hover:to-violet-500/20 transition-all"
                    >
                      View Dashboard
                    </a>
                    <a
                      href={`/ge0xa/compare?a=${encodeURIComponent(brand)}`}
                      className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-500 hover:bg-white/5 hover:text-white transition-all"
                    >
                      Compare
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/lib/auth-context";
import { generateData, getSavedBrands } from "@/lib/brand-data";

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <CompareInner />
    </Suspense>
  );
}

function CompareInner() {
  const { user, loading, signOut } = useAuth();
  const searchParams = useSearchParams();
  const [brandA, setBrandA] = useState(searchParams.get("a") || "");
  const [brandB, setBrandB] = useState(searchParams.get("b") || "");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/ge0xa/login";
    }
  }, [user, loading]);

  useEffect(() => {
    setSaved(getSavedBrands());
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const dataA = brandA ? generateData(brandA) : null;
  const dataB = brandB ? generateData(brandB) : null;
  const bothReady = dataA && dataB;

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
            <a href="/ge0xa/brands" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">My Brands</a>
            <a href="/ge0xa/compare" className="text-sm text-cyan-400 font-medium">Compare</a>
            <a href="/ge0xa/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Home</a>
            <button
              onClick={async () => { await signOut(); window.location.href = "/ge0xa/"; }}
              className="flex items-center"
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
        <h1 className="text-2xl font-bold text-white">Compare Brands</h1>
        <p className="mt-1 text-sm text-gray-500">Side-by-side AI visibility comparison</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <BrandSelector label="Brand A" value={brandA} onChange={setBrandA} saved={saved} color="cyan" />
          <BrandSelector label="Brand B" value={brandB} onChange={setBrandB} saved={saved} color="violet" />
        </div>

        {bothReady && (
          <div className="mt-10 space-y-8">
            <div className="grid gap-4 md:grid-cols-4">
              <CompareMetric label="Brand Score" valueA={dataA.brandScore} valueB={dataB.brandScore} unit="/100" brandA={brandA} brandB={brandB} />
              <CompareMetric label="Share of Answer" valueA={dataA.soa} valueB={dataB.soa} unit="%" brandA={brandA} brandB={brandB} />
              <CompareMetric label="Accuracy" valueA={dataA.accuracy} valueB={dataB.accuracy} unit="%" brandA={brandA} brandB={brandB} />
              <CompareMetric label="Citation Rate" valueA={dataA.citation} valueB={dataB.citation} unit="%" brandA={brandA} brandB={brandB} />
            </div>

            <div className="rounded-xl border border-white/5 bg-gray-900/50 p-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400">AI Engine Presence</h3>
              <div className="mt-6 space-y-3">
                {dataA.engines.map((engineA, i) => {
                  const engineB = dataB.engines[i];
                  return (
                    <div key={engineA.name} className="flex items-center gap-4 rounded-lg border border-white/5 bg-gray-950/50 px-5 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 font-mono text-sm text-gray-400">
                        {engineA.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{engineA.name}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right w-28">
                          <p className="text-xs text-gray-500">{brandA}</p>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-mono ${
                            engineA.status === "mentioned" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                          }`}>
                            {engineA.status === "mentioned" ? `Found (${engineA.accuracy}%)` : "Missing"}
                          </span>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="w-28">
                          <p className="text-xs text-gray-500">{brandB}</p>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-mono ${
                            engineB.status === "mentioned" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                          }`}>
                            {engineB.status === "mentioned" ? `Found (${engineB.accuracy}%)` : "Missing"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-gray-900/50 p-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400">Share of Answer Trend</h3>
              <p className="mt-1 text-xs text-gray-600">6-week SoA comparison</p>
              <div className="mt-6 space-y-3">
                {dataA.soaTrend.map((weekA, i) => {
                  const weekB = dataB.soaTrend[i];
                  const max = 60;
                  return (
                    <div key={weekA.week} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-mono text-gray-500">{weekA.week}</span>
                      <div className="flex-1 flex gap-1">
                        <div className="relative h-6 flex-1 rounded-md bg-gray-800/50 overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-cyan-500/60 to-cyan-500/30"
                            style={{ width: `${(weekA.you / max) * 100}%` }}
                          />
                          <span className="absolute inset-y-0 left-2 flex items-center text-xs font-mono text-cyan-300">{weekA.you}%</span>
                        </div>
                        <div className="relative h-6 flex-1 rounded-md bg-gray-800/50 overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-violet-500/60 to-violet-500/30"
                            style={{ width: `${(weekB.you / max) * 100}%` }}
                          />
                          <span className="absolute inset-y-0 left-2 flex items-center text-xs font-mono text-violet-300">{weekB.you}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex gap-6 mt-2 ml-11">
                  <span className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2 w-6 rounded-full bg-cyan-500/60" /> {brandA}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2 w-6 rounded-full bg-violet-500/60" /> {brandB}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-gray-900/50 p-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400">Alerts Summary</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <AlertSummary brand={brandA} alerts={dataA.alerts} color="cyan" />
                <AlertSummary brand={brandB} alerts={dataB.alerts} color="violet" />
              </div>
            </div>
          </div>
        )}

        {!bothReady && (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/5 bg-gray-900/50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-gray-600">
                <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM21 16c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">Select two brands to compare</h3>
            <p className="mt-2 text-sm text-gray-500">
              {saved.length > 0
                ? "Choose from your saved brands or type a new one"
                : "Type brand names above to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BrandSelector({ label, value, onChange, saved, color }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  saved: string[];
  color: "cyan" | "violet";
}) {
  const borderColor = color === "cyan" ? "focus:border-cyan-500/50" : "focus:border-violet-500/50";
  const tagColor = color === "cyan"
    ? "border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10"
    : "border-violet-500/20 text-violet-400 hover:bg-violet-500/10";

  return (
    <div className="rounded-xl border border-white/5 bg-gray-900/50 p-5">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-500">{label}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter brand name..."
        className={`mt-3 w-full rounded-lg border border-white/10 bg-gray-950/50 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none ${borderColor} transition-colors`}
      />
      {saved.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {saved.filter((b) => b !== value).map((brand) => (
            <button
              key={brand}
              onClick={() => onChange(brand)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${tagColor}`}
            >
              {brand}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CompareMetric({ label, valueA, valueB, unit, brandA, brandB }: {
  label: string;
  valueA: number;
  valueB: number;
  unit: string;
  brandA: string;
  brandB: string;
}) {
  const diff = valueA - valueB;
  const winner = diff > 0 ? "A" : diff < 0 ? "B" : "tie";

  return (
    <div className="rounded-xl border border-white/5 bg-gray-900/50 p-5">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-500">{label}</p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-600 truncate max-w-[80px]">{brandA}</p>
          <p className={`text-2xl font-bold ${winner === "A" ? "text-cyan-400" : "text-gray-400"}`}>
            {valueA}<span className="text-xs text-gray-500">{unit}</span>
          </p>
        </div>
        <div className="flex flex-col items-center px-2">
          <span className="text-xs text-gray-600">vs</span>
          {winner !== "tie" && (
            <span className={`mt-1 rounded-full px-1.5 py-0.5 text-[10px] font-mono ${
              winner === "A" ? "bg-cyan-500/10 text-cyan-400" : "bg-violet-500/10 text-violet-400"
            }`}>
              {diff > 0 ? `+${diff}` : diff}
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600 truncate max-w-[80px]">{brandB}</p>
          <p className={`text-2xl font-bold ${winner === "B" ? "text-violet-400" : "text-gray-400"}`}>
            {valueB}<span className="text-xs text-gray-500">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function AlertSummary({ brand, alerts, color }: {
  brand: string;
  alerts: { severity: string; issue: string; engine: string }[];
  color: "cyan" | "violet";
}) {
  const high = alerts.filter((a) => a.severity === "high").length;
  const medium = alerts.filter((a) => a.severity === "medium").length;
  const headerColor = color === "cyan" ? "text-cyan-400" : "text-violet-400";

  return (
    <div className="rounded-lg border border-white/5 bg-gray-950/50 p-4">
      <div className="flex items-center justify-between">
        <h4 className={`text-sm font-semibold ${headerColor}`}>{brand}</h4>
        <div className="flex gap-2">
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-mono text-red-400">{high} high</span>
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-mono text-amber-400">{medium} med</span>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {alerts.slice(0, 3).map((alert, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
              alert.severity === "high" ? "bg-red-400" : alert.severity === "medium" ? "bg-amber-400" : "bg-blue-400"
            }`} />
            <p className="text-xs text-gray-400 truncate">{alert.issue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

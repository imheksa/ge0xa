"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  generateData,
  getBrandProfiles,
  saveBrandProfile,
  removeBrand,
  type BrandProfile,
} from "@/lib/brand-data";

export default function BrandsPage() {
  const { user, loading, signOut } = useAuth();
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editBrand, setEditBrand] = useState<BrandProfile | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/ge0xa/login";
    }
  }, [user, loading]);

  useEffect(() => {
    setBrands(getBrandProfiles());
  }, []);

  function refresh() {
    setBrands(getBrandProfiles());
  }

  function handleSave(profile: BrandProfile) {
    saveBrandProfile(profile);
    refresh();
    setShowForm(false);
    setEditBrand(null);
  }

  function handleRemove(name: string) {
    removeBrand(name);
    refresh();
    setDeleteConfirm(null);
  }

  function handleEdit(profile: BrandProfile) {
    setEditBrand(profile);
    setShowForm(true);
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My Brands</h1>
            <p className="mt-1 text-sm text-gray-500">Track and monitor your brands across AI engines</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/ge0xa/compare"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              Compare Brands
            </a>
            <button
              onClick={() => { setEditBrand(null); setShowForm(true); }}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 text-sm font-medium text-white hover:from-cyan-400 hover:to-violet-400 transition-all"
            >
              + Add Brand
            </button>
          </div>
        </div>

        {showForm && (
          <BrandForm
            initial={editBrand}
            existingNames={brands.map((b) => b.name)}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditBrand(null); }}
          />
        )}

        {brands.length === 0 && !showForm ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/5 bg-gray-900/50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-gray-600">
                <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">No brands yet</h3>
            <p className="mt-2 text-sm text-gray-500">Add your first brand to start tracking AI visibility</p>
            <button
              onClick={() => { setEditBrand(null); setShowForm(true); }}
              className="mt-6 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-medium text-white hover:from-cyan-400 hover:to-violet-400 transition-all"
            >
              + Add Your First Brand
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((profile) => {
              const data = generateData(profile.name);
              const foundCount = data.engines.filter((e) => e.status === "mentioned").length;
              const highAlerts = data.alerts.filter((a) => a.severity === "high").length;
              const hasLinks = profile.website || profile.twitter || profile.instagram || profile.linkedin || profile.blog;
              return (
                <div key={profile.name} className="group rounded-xl border border-white/5 bg-gray-900/50 hover:border-cyan-500/20 transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-white truncate">{profile.name}</h3>
                        {profile.website && (
                          <a href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="mt-0.5 block text-xs text-cyan-400/70 hover:text-cyan-400 truncate transition-colors">
                            {profile.website.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(profile)}
                          className="rounded-md p-1.5 text-gray-600 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                          title="Edit"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        {deleteConfirm === profile.name ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleRemove(profile.name)} className="rounded-md bg-red-500/10 px-2 py-1 text-xs text-red-400 hover:bg-red-500/20">
                              Delete
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400 hover:bg-white/10">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(profile.name)}
                            className="rounded-md p-1.5 text-gray-600 hover:bg-white/5 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {hasLinks && (
                      <div className="mt-3 flex items-center gap-2">
                        {profile.blog && (
                          <SocialIcon href={profile.blog} title="Blog">
                            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                          </SocialIcon>
                        )}
                        {profile.twitter && (
                          <SocialIcon href={profile.twitter} title="X / Twitter">
                            <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M15.232 10.232L20 4" />
                          </SocialIcon>
                        )}
                        {profile.instagram && (
                          <SocialIcon href={profile.instagram} title="Instagram">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><circle cx="17.5" cy="6.5" r="1.5" />
                          </SocialIcon>
                        )}
                        {profile.linkedin && (
                          <SocialIcon href={profile.linkedin} title="LinkedIn">
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />
                          </SocialIcon>
                        )}
                      </div>
                    )}

                    <div className="mt-4 grid grid-cols-2 gap-3">
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
                  </div>

                  <div className="border-t border-white/5 px-6 py-3 flex gap-2">
                    <a
                      href={`/ge0xa/dashboard?brand=${encodeURIComponent(profile.name)}`}
                      className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 py-2 text-center text-sm font-medium text-cyan-400 hover:from-cyan-500/20 hover:to-violet-500/20 transition-all"
                    >
                      View Dashboard
                    </a>
                    <a
                      href={`/ge0xa/compare?a=${encodeURIComponent(profile.name)}`}
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

function SocialIcon({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  const url = href.startsWith("http") ? href : `https://${href}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-white/5 bg-gray-950/50 text-gray-500 hover:border-cyan-500/20 hover:text-cyan-400 transition-all"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
        {children}
      </svg>
    </a>
  );
}

function BrandForm({ initial, existingNames, onSave, onCancel }: {
  initial: BrandProfile | null;
  existingNames: string[];
  onSave: (profile: BrandProfile) => void;
  onCancel: () => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<BrandProfile>(
    initial || {
      name: "",
      website: "",
      blog: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      createdAt: new Date().toISOString(),
    }
  );
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Brand name is required");
      return;
    }
    if (!isEdit && existingNames.includes(name)) {
      setError("A brand with this name already exists");
      return;
    }
    onSave({ ...form, name });
  }

  function update(field: keyof BrandProfile, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  }

  return (
    <div className="mt-8 rounded-xl border border-cyan-500/20 bg-gray-900/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          {isEdit ? `Edit ${initial.name}` : "Add New Brand"}
        </h2>
        <button onClick={onCancel} className="rounded-md p-1.5 text-gray-500 hover:bg-white/5 hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Brand Name"
            value={form.name}
            onChange={(v) => update("name", v)}
            placeholder="e.g. Acme Inc"
            required
            disabled={isEdit}
          />
          <FormField
            label="Website"
            value={form.website}
            onChange={(v) => update("website", v)}
            placeholder="e.g. acme.com"
            icon={<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />}
          />
        </div>

        <FormField
          label="Blog Link"
          value={form.blog}
          onChange={(v) => update("blog", v)}
          placeholder="e.g. blog.acme.com"
          icon={<><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></>}
        />

        <div className="border-t border-white/5 pt-4">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">Social Profiles</p>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              label="X (Twitter)"
              value={form.twitter}
              onChange={(v) => update("twitter", v)}
              placeholder="e.g. x.com/acme"
              icon={<path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M15.232 10.232L20 4" />}
            />
            <FormField
              label="Instagram"
              value={form.instagram}
              onChange={(v) => update("instagram", v)}
              placeholder="e.g. instagram.com/acme"
              icon={<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.5" /></>}
            />
            <FormField
              label="LinkedIn"
              value={form.linkedin}
              onChange={(v) => update("linkedin", v)}
              placeholder="e.g. linkedin.com/company/acme"
              icon={<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-2.5 text-sm font-medium text-white hover:from-cyan-400 hover:to-violet-400 transition-all"
          >
            {isEdit ? "Save Changes" : "Add Brand"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, required, disabled, icon }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-gray-600">
              {icon}
            </svg>
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full rounded-lg border border-white/10 bg-gray-950/50 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}

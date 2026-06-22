"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/context";

function HexIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <HexIcon className="w-6 h-6 text-cyan-400" />
          <span>
            <span className="text-gradient">Hexa</span>
            <span className="text-white">gent</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            {t.nav.features}
          </a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            {t.nav.pricing}
          </a>
          <a href="#contact" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            {t.nav.contact}
          </a>
<button
            onClick={toggleLocale}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono font-medium text-cyan-400 hover:bg-white/10 transition-colors"
          >
            {locale === "en" ? "ID" : "EN"}
          </button>
          <a
            href="#contact"
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-medium text-white hover:from-cyan-400 hover:to-violet-400 transition-all"
          >
            {t.nav.getAudit}
          </a>
        </div>
        <button
          onClick={toggleLocale}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono font-medium text-cyan-400 md:hidden"
        >
          {locale === "en" ? "ID" : "EN"}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-gray-950 pt-32 pb-24">
      <div className="absolute inset-0 bg-grid animate-grid-fade" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm font-mono text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          {t.hero.tagline}
        </div>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t.hero.title}
          <span className="text-gradient">{t.hero.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="group relative rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
          >
            {t.hero.cta}
          </a>
          <a
            href="#solution"
            className="rounded-lg border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="font-mono text-gray-500 uppercase tracking-wider text-xs">Monitors:</span>
          {["ChatGPT", "Perplexity", "Gemini", "AI Overviews"].map((e) => (
            <span
              key={e}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-gray-400"
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const { t } = useI18n();
  const cards = [
    { icon: <EyeOffIcon />, title: t.problem.card1Title, desc: t.problem.card1Desc },
    { icon: <AlertIcon />, title: t.problem.card2Title, desc: t.problem.card2Desc },
    { icon: <ChartIcon />, title: t.problem.card3Title, desc: t.problem.card3Desc },
  ];
  return (
    <section className="relative bg-gray-950 py-24 border-t border-white/5">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-red-400">
            {t.problem.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.problem.title}
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="card-glow rounded-xl border border-white/5 bg-gray-900/50 p-8 backdrop-blur-sm hover:border-white/10 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                {c.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const { t } = useI18n();
  const steps = [
    { num: "01", label: t.solution.step1Label, title: t.solution.step1Title, desc: t.solution.step1Desc, color: "cyan" },
    { num: "02", label: t.solution.step2Label, title: t.solution.step2Title, desc: t.solution.step2Desc, color: "violet" },
    { num: "03", label: t.solution.step3Label, title: t.solution.step3Title, desc: t.solution.step3Desc, color: "emerald" },
    { num: "04", label: t.solution.step4Label, title: t.solution.step4Title, desc: t.solution.step4Desc, color: "amber" },
  ];
  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };
  return (
    <section id="solution" className="relative bg-gray-950 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {t.solution.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.solution.title}
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const colors = colorMap[s.color];
            return (
              <div key={s.num} className="card-glow rounded-xl border border-white/5 bg-gray-900/50 p-8 backdrop-blur-sm hover:border-white/10 transition-all">
                <div className="font-mono text-4xl font-bold text-white/5">{s.num}</div>
                <span className={`mt-2 inline-block rounded-full border px-3 py-1 font-mono text-xs font-semibold uppercase ${colors}`}>
                  {s.label}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const { t } = useI18n();
  const items = [
    { label: t.metrics.soa, desc: t.metrics.soaDesc, value: "SoA", color: "text-cyan-400" },
    { label: t.metrics.accuracy, desc: t.metrics.accuracyDesc, value: "%", color: "text-violet-400" },
    { label: t.metrics.citation, desc: t.metrics.citationDesc, value: "#", color: "text-emerald-400" },
  ];
  return (
    <section className="relative border-y border-white/5 bg-gray-900/50 py-20">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          {t.metrics.title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((m) => (
            <div key={m.label} className="text-center">
              <div className={`font-mono text-5xl font-bold ${m.color}`}>{m.value}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{m.label}</h3>
              <p className="mt-1 text-gray-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { t } = useI18n();
  const items = [
    { icon: <RadarIcon />, title: t.features.f1Title, desc: t.features.f1Desc },
    { icon: <ShieldIcon />, title: t.features.f2Title, desc: t.features.f2Desc },
    { icon: <GlobeIcon />, title: t.features.f3Title, desc: t.features.f3Desc },
    { icon: <SearchIcon />, title: t.features.f4Title, desc: t.features.f4Desc },
    { icon: <RocketIcon />, title: t.features.f5Title, desc: t.features.f5Desc },
    { icon: <ChartIcon />, title: t.features.f6Title, desc: t.features.f6Desc },
  ];
  return (
    <section id="features" className="relative bg-gray-950 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {t.features.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.features.title}
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="card-glow group rounded-xl border border-white/5 bg-gray-900/50 p-8 backdrop-blur-sm hover:border-cyan-500/20 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useI18n();
  const plans = [
    { ...t.pricing.audit, popular: false },
    { ...t.pricing.foundations, popular: false },
    { ...t.pricing.growth, popular: true },
    { ...t.pricing.enterprise, popular: false },
  ];
  return (
    <section id="pricing" className="relative bg-gray-950 py-24 border-t border-white/5">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {t.pricing.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-3 text-gray-400">{t.pricing.subtitle}</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 backdrop-blur-sm transition-all ${
                plan.popular
                  ? "border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-violet-500/10 shadow-lg shadow-cyan-500/10"
                  : "border border-white/5 bg-gray-900/50 hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{plan.desc}</p>
              <div className="mt-6">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                {"period" in plan && (
                  <span className="text-sm text-gray-500">{plan.period}</span>
                )}
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-0.5 text-cyan-400">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-400 hover:to-violet-400"
                    : "border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const { t } = useI18n();
  const items = [
    { icon: <BankIcon />, name: t.industries.finance },
    { icon: <HealthIcon />, name: t.industries.health },
    { icon: <CartIcon />, name: t.industries.ecommerce },
    { icon: <CodeIcon />, name: t.industries.saas },
    { icon: <BriefcaseIcon />, name: t.industries.professional },
    { icon: <GradCapIcon />, name: t.industries.education },
  ];
  return (
    <section className="relative bg-gray-950 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {t.industries.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.industries.title}
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {items.map((i) => (
            <div
              key={i.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-gray-900/50 p-6 text-center hover:border-cyan-500/20 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                {i.icon}
              </div>
              <span className="text-sm font-medium text-gray-300">{i.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useI18n();
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/5 bg-gray-950 py-24">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[200px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.cta.title}</h2>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed">{t.cta.subtitle}</p>
        <a
          href="mailto:hello@hexagent.id"
          className="mt-10 inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-violet-400 transition-all"
        >
          {t.cta.button}
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/5 bg-gray-950 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <HexIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-gradient">Hexa</span>
              <span className="text-white">gent</span>
            </span>
            <p className="mt-2 text-sm text-gray-500">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-gray-400">{t.footer.product}</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">{t.footer.monitoring}</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">{t.footer.distribution}</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">{t.footer.audit}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-gray-400">{t.footer.company}</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.footer.about}</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">{t.footer.contact}</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.footer.privacy}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-6 text-center font-mono text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Hexagent. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LangIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1" />
      <path d="M22 22l-5-10-5 10M14 18h6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  );
}

function HealthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function GradCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M22 10l-10-5L2 10l10 5 10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
      <line x1="22" y1="10" x2="22" y2="16" />
    </svg>
  );
}

function QuickScan() {
  const [brand, setBrand] = useState("");
  const [phase, setPhase] = useState<"idle" | "scanning">("idle");
  const [scanProgress, setScanProgress] = useState(0);

  function startScan() {
    if (!brand.trim()) return;
    setPhase("scanning");
    setScanProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setScanProgress(100);
        setTimeout(() => {
          window.location.href = `/ge0xa/dashboard?brand=${encodeURIComponent(brand.trim())}`;
        }, 400);
      } else {
        setScanProgress(Math.round(progress));
      }
    }, 300);
  }

  return (
    <section className="relative bg-gray-950 py-24 border-t border-white/5">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Quick Scan
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            How visible is your brand to AI?
          </h2>
          <p className="mt-3 text-gray-400">
            Enter your brand name and get an instant AI visibility snapshot.
          </p>
        </div>

        <div className="mt-10 mx-auto max-w-xl">
          {phase === "idle" && (
            <div className="flex gap-3">
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startScan()}
                placeholder="Enter your brand name..."
                className="flex-1 rounded-lg border border-white/10 bg-gray-900/80 px-5 py-3.5 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              <button
                onClick={startScan}
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white hover:from-cyan-400 hover:to-violet-400 transition-all whitespace-nowrap"
              >
                Scan Now
              </button>
            </div>
          )}

          {phase === "scanning" && (
            <div className="rounded-xl border border-white/5 bg-gray-900/50 p-8 text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm font-mono text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Scanning &ldquo;{brand}&rdquo; across AI engines...
              </div>
              <div className="mt-6 mx-auto max-w-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-mono text-gray-500">Progress</span>
                  <span className="text-xs font-mono text-cyan-400">{scanProgress}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="mt-4 space-y-1.5 text-left">
                  <ScanStep label="Querying ChatGPT..." done={scanProgress > 25} />
                  <ScanStep label="Querying Perplexity..." done={scanProgress > 45} />
                  <ScanStep label="Querying Gemini..." done={scanProgress > 65} />
                  <ScanStep label="Analyzing AI Overviews..." done={scanProgress > 85} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

function ScanStep({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {done ? (
        <span className="text-emerald-400 text-xs">✓</span>
      ) : (
        <span className="h-3 w-3 rounded-full border border-gray-600 animate-pulse" />
      )}
      <span className={`text-xs font-mono ${done ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <QuickScan />
      <Problem />
      <Solution />
      <Metrics />
      <Features />
      <Pricing />
      <Industries />
      <CTA />
      <Footer />
    </>
  );
}

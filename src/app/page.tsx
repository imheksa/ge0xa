"use client";

import { useI18n } from "@/i18n/context";

function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-indigo-600">Hexa</span>gent
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">
            {t.nav.features}
          </a>
          <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">
            {t.nav.pricing}
          </a>
          <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900">
            {t.nav.contact}
          </a>
          <button
            onClick={toggleLocale}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            {locale === "en" ? "ID" : "EN"}
          </button>
          <a
            href="#contact"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {t.nav.getAudit}
          </a>
        </div>
        <button
          onClick={toggleLocale}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 md:hidden"
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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50 pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
          {t.hero.tagline}
        </div>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {t.hero.title}
          <span className="text-indigo-600">{t.hero.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="rounded-lg bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
          >
            {t.hero.cta}
          </a>
          <a
            href="#solution"
            className="rounded-lg border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-white"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
          <span className="font-medium">Monitors:</span>
          {["ChatGPT", "Perplexity", "Gemini", "Google AI Overviews"].map((e) => (
            <span key={e} className="rounded-full bg-white px-4 py-1.5 font-medium text-slate-600 shadow-sm">
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
    { icon: "👻", title: t.problem.card1Title, desc: t.problem.card1Desc },
    { icon: "⚠️", title: t.problem.card2Title, desc: t.problem.card2Desc },
    { icon: "🌏", title: t.problem.card3Title, desc: t.problem.card3Desc },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-red-500">
            {t.problem.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.problem.title}
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-slate-200 bg-slate-50 p-8"
            >
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{c.desc}</p>
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
    { num: "01", label: t.solution.step1Label, title: t.solution.step1Title, desc: t.solution.step1Desc },
    { num: "02", label: t.solution.step2Label, title: t.solution.step2Title, desc: t.solution.step2Desc },
    { num: "03", label: t.solution.step3Label, title: t.solution.step3Title, desc: t.solution.step3Desc },
    { num: "04", label: t.solution.step4Label, title: t.solution.step4Title, desc: t.solution.step4Desc },
  ];
  return (
    <section id="solution" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            {t.solution.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.solution.title}
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="relative rounded-xl bg-white p-8 shadow-sm">
              <div className="text-4xl font-bold text-indigo-100">{s.num}</div>
              <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-600">
                {s.label}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const { t } = useI18n();
  const items = [
    { label: t.metrics.soa, desc: t.metrics.soaDesc, value: "SoA" },
    { label: t.metrics.accuracy, desc: t.metrics.accuracyDesc, value: "%" },
    { label: t.metrics.citation, desc: t.metrics.citationDesc, value: "#" },
  ];
  return (
    <section className="bg-indigo-600 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          {t.metrics.title}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-4xl font-bold text-indigo-200">{m.value}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{m.label}</h3>
              <p className="mt-1 text-indigo-200">{m.desc}</p>
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
    { icon: "📡", title: t.features.f1Title, desc: t.features.f1Desc },
    { icon: "✅", title: t.features.f2Title, desc: t.features.f2Desc },
    { icon: "🇮🇩", title: t.features.f3Title, desc: t.features.f3Desc },
    { icon: "🔍", title: t.features.f4Title, desc: t.features.f4Desc },
    { icon: "🚀", title: t.features.f5Title, desc: t.features.f5Desc },
    { icon: "📊", title: t.features.f6Title, desc: t.features.f6Desc },
  ];
  return (
    <section id="features" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            {t.features.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.features.title}
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 p-8 hover:shadow-md transition-shadow">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{f.desc}</p>
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
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            {t.pricing.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-3 text-slate-600">{t.pricing.subtitle}</p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl bg-white p-8 shadow-sm ${
                plan.popular ? "ring-2 ring-indigo-600" : "border border-slate-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.desc}</p>
              <div className="mt-6">
                <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                {"period" in plan && (
                  <span className="text-sm text-slate-500">{plan.period}</span>
                )}
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-indigo-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold ${
                  plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
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
    { icon: "🏦", name: t.industries.finance },
    { icon: "🏥", name: t.industries.health },
    { icon: "🛒", name: t.industries.ecommerce },
    { icon: "💻", name: t.industries.saas },
    { icon: "⚖️", name: t.industries.professional },
    { icon: "🎓", name: t.industries.education },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            {t.industries.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {t.industries.title}
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {items.map((i) => (
            <div
              key={i.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{i.icon}</span>
              <span className="text-sm font-medium text-slate-700">{i.name}</span>
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
    <section id="contact" className="bg-gradient-to-br from-indigo-600 to-indigo-800 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.cta.title}</h2>
        <p className="mt-4 text-lg text-indigo-200 leading-relaxed">{t.cta.subtitle}</p>
        <a
          href="mailto:hello@hexagent.id"
          className="mt-10 inline-block rounded-lg bg-white px-8 py-4 text-base font-semibold text-indigo-700 shadow-lg hover:bg-indigo-50"
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
    <footer className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-indigo-600">Hexa</span>gent
            </span>
            <p className="mt-2 text-sm text-slate-500">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{t.footer.product}</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-slate-700">{t.footer.monitoring}</a></li>
              <li><a href="#features" className="hover:text-slate-700">{t.footer.distribution}</a></li>
              <li><a href="#pricing" className="hover:text-slate-700">{t.footer.audit}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{t.footer.company}</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-slate-700">{t.footer.about}</a></li>
              <li><a href="#contact" className="hover:text-slate-700">{t.footer.contact}</a></li>
              <li><a href="#" className="hover:text-slate-700">{t.footer.privacy}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Hexagent. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
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

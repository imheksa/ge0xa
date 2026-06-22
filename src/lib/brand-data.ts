export function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function generateData(brand: string) {
  const s = hash(brand);
  const brandScore = 35 + (s % 45);
  const soa = 10 + (s % 40);
  const accuracy = 50 + ((s * 3) % 40);
  const citation = 5 + ((s * 7) % 25);

  const summaryCards = [
    { label: "Brand Score", value: String(brandScore), change: `+${1 + (s % 8)}`, unit: "/100", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Share of Answer", value: String(soa), change: `+${1 + ((s * 2) % 10)}`, unit: "%", color: "text-violet-400", bg: "bg-violet-500/10" },
    { label: "Accuracy Score", value: String(accuracy), change: accuracy > 70 ? `+${1 + (s % 4)}` : `-${1 + (s % 5)}`, unit: "%", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Citation Rate", value: String(citation), change: `+${1 + ((s * 5) % 6)}`, unit: "%", color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  const engineBase = [
    { name: "ChatGPT", icon: "G", lastChecked: "2 min ago" },
    { name: "Perplexity", icon: "P", lastChecked: "5 min ago" },
    { name: "Gemini", icon: "Gm", lastChecked: "3 min ago" },
    { name: "AI Overviews", icon: "AO", lastChecked: "8 min ago" },
  ];
  const missingIdx = s % 4;
  const engines = engineBase.map((e, i) => ({
    ...e,
    status: i === missingIdx ? "not_found" as const : "mentioned" as const,
    accuracy: i === missingIdx ? 0 : 60 + ((s * (i + 1) * 3) % 35),
    soa: i === missingIdx ? 0 : 15 + ((s * (i + 1) * 7) % 40),
  }));

  const severities = ["high", "high", "medium", "low", "medium"];
  const engineNames = ["ChatGPT", "Perplexity", "Gemini", "AI Overviews"];
  const issueTemplates = [
    `States incorrect founding year for ${brand}`,
    `Claims wrong pricing information about ${brand}`,
    `Lists outdated features as current for ${brand}`,
    `Missing key certification or compliance info for ${brand}`,
    `Does not mention core security features of ${brand}`,
  ];
  const queryTemplates = [
    `best ${brand.toLowerCase()} alternatives`,
    `${brand} pricing`,
    `${brand.toLowerCase()} vs competitors`,
    `${brand} review`,
    `is ${brand.toLowerCase()} reliable`,
  ];
  const times = ["12 min ago", "25 min ago", "1 hr ago", "2 hr ago", "3 hr ago"];
  const alerts = issueTemplates.map((issue, i) => ({
    id: i + 1,
    severity: severities[i],
    engine: engineNames[(s + i) % 4],
    query: queryTemplates[i],
    issue,
    time: times[i],
  }));

  const baseSoa = 8 + (s % 15);
  const soaTrend = [
    { week: "W1", you: baseSoa, competitor: 40 + (s % 10) },
    { week: "W2", you: baseSoa + 3, competitor: 39 + (s % 10) },
    { week: "W3", you: baseSoa + 6, competitor: 38 + (s % 10) },
    { week: "W4", you: baseSoa + 10, competitor: 37 + (s % 10) },
    { week: "W5", you: baseSoa + 13, competitor: 36 + (s % 10) },
    { week: "W6", you: soa, competitor: 35 + (s % 10) },
  ];

  const topQueries = [
    { query: `best ${brand.toLowerCase()} alternatives`, mentions: 8 + (s % 8), accuracy: 70 + ((s * 3) % 25), trend: "up" },
    { query: `${brand} review`, mentions: 5 + ((s * 2) % 6), accuracy: 60 + ((s * 7) % 30), trend: "up" },
    { query: `${brand.toLowerCase()} pricing`, mentions: 3 + ((s * 4) % 5), accuracy: 55 + ((s * 11) % 35), trend: "stable" },
  ];

  const factStatuses = ["violated", "violated", "missing", "missing", "accurate", "accurate"];
  const factTemplates = [
    `Founded in ${2018 + (s % 6)}`,
    "Free tier available",
    "ISO 27001 certified",
    "Enterprise-grade security",
    `${100 + (s % 900)}K+ active users`,
    "Industry compliance verified",
  ];
  const canonicalFacts = factTemplates.map((fact, i) => ({
    fact,
    status: factStatuses[i],
    violations: factStatuses[i] === "accurate" ? 0 : 1 + (s % 2),
  }));

  return { brandScore, soa, accuracy, citation, summaryCards, engines, alerts, soaTrend, topQueries, canonicalFacts };
}

export type BrandData = ReturnType<typeof generateData>;

const BRANDS_KEY = "hexagent_brands";

export function getSavedBrands(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BRANDS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBrand(brand: string) {
  const brands = getSavedBrands();
  if (!brands.includes(brand)) {
    brands.push(brand);
    localStorage.setItem(BRANDS_KEY, JSON.stringify(brands));
  }
}

export function removeBrand(brand: string) {
  const brands = getSavedBrands().filter((b) => b !== brand);
  localStorage.setItem(BRANDS_KEY, JSON.stringify(brands));
}

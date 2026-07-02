// Funding schemes available for WSQ / SkillsFuture courses, with a brand colour
// per scheme so badges render consistently across the admin editor and the
// public course pages.

export const FUNDING_OPTIONS = [
  "WSQ",
  "SkillsFuture Credit",
  "PSEA",
  "UTAP",
  "SFEC",
  "Absentee Payroll",
  "MCES",
  "PEI",
] as const;

export type FundingScheme = (typeof FUNDING_OPTIONS)[number];

const FUNDING_COLORS: Record<string, string> = {
  WSQ: "#2563EB", // blue
  "SkillsFuture Credit": "#F97316", // orange
  PSEA: "#0D9488", // teal
  UTAP: "#DC2626", // red
  SFEC: "#CA8A04", // gold
  "Absentee Payroll": "#1E3A8A", // navy
  MCES: "#7C3AED", // purple
  PEI: "#059669", // emerald — Private Education Institution
};

/** Background colour for a funding badge; falls back to a neutral grey. */
export function fundingColor(tag: string): string {
  return FUNDING_COLORS[tag] ?? "#374151";
}

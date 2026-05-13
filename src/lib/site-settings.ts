import { db } from "@/db";
import { settings } from "@/db/schema";
import { inArray } from "drizzle-orm";

const BRAND_KEYS = ["company_short_name", "company_name", "company_logo_url"] as const;
type BrandKey = (typeof BRAND_KEYS)[number];

export type SiteBrand = {
  shortName: string;
  fullName: string;
  logoUrl: string | null;
};

const DEFAULTS: SiteBrand = {
  shortName: "Tertiary Infotech Academy",
  fullName: "Tertiary Infotech Academy Pte Ltd",
  logoUrl: null,
};

export async function getSiteBrand(): Promise<SiteBrand> {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(inArray(settings.key, BRAND_KEYS as unknown as string[]));
    const map = new Map<BrandKey, string>();
    for (const r of rows) {
      const v = typeof r.value === "string" ? r.value : "";
      if (v) map.set(r.key as BrandKey, v);
    }
    return {
      shortName: map.get("company_short_name") || DEFAULTS.shortName,
      fullName: map.get("company_name") || DEFAULTS.fullName,
      logoUrl: map.get("company_logo_url") || null,
    };
  } catch {
    return DEFAULTS;
  }
}

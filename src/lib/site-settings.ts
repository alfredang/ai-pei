import { db } from "@/db";
import { settings } from "@/db/schema";
import { inArray } from "drizzle-orm";

const BRAND_KEYS = [
  "company_short_name",
  "company_name",
  "company_logo_url",
  "company_uen",
] as const;
type BrandKey = (typeof BRAND_KEYS)[number];

export type SiteBrand = {
  shortName: string;
  fullName: string;
  logoUrl: string | null;
  uen: string | null;
};

const DEFAULTS: SiteBrand = {
  shortName: "Tertiary Infotech Academy",
  fullName: "Tertiary Infotech Academy Pte Ltd",
  logoUrl: null,
  uen: null,
};

const LEAD_EMAIL_KEYS = [
  "lead_notification_email",
  "lead_notification_cc",
  "lead_email_subject",
  "lead_email_body",
] as const;
type LeadEmailKey = (typeof LEAD_EMAIL_KEYS)[number];

export type LeadEmailConfig = {
  to: string;
  cc: string;
  subject: string;
  body: string;
};

export const LEAD_EMAIL_DEFAULTS: LeadEmailConfig = {
  to: "angch@tertiaryinfotech.com",
  cc: "",
  subject: "New inquiry from {NAME}",
  body: `<h2>New inquiry from {NAME}</h2>
<p><strong>Email:</strong> <a href="mailto:{EMAIL}">{EMAIL}</a></p>
<p><strong>Company:</strong> {COMPANY}</p>
<p><strong>Phone:</strong> {PHONE}</p>
<p><strong>Source:</strong> {SOURCE}</p>
<hr/>
<p style="white-space:pre-wrap">{MESSAGE}</p>`,
};

export async function getLeadEmailConfig(): Promise<LeadEmailConfig> {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(inArray(settings.key, LEAD_EMAIL_KEYS as unknown as string[]));
    const map = new Map<LeadEmailKey, string>();
    for (const r of rows) {
      const v = typeof r.value === "string" ? r.value : "";
      map.set(r.key as LeadEmailKey, v);
    }
    return {
      to: map.get("lead_notification_email") || LEAD_EMAIL_DEFAULTS.to,
      cc: map.get("lead_notification_cc") ?? LEAD_EMAIL_DEFAULTS.cc,
      subject: map.get("lead_email_subject") || LEAD_EMAIL_DEFAULTS.subject,
      body: map.get("lead_email_body") || LEAD_EMAIL_DEFAULTS.body,
    };
  } catch {
    return LEAD_EMAIL_DEFAULTS;
  }
}

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
      uen: map.get("company_uen") || null,
    };
  } catch {
    return DEFAULTS;
  }
}

import nodemailer from "nodemailer";
import { google } from "googleapis";
import { getLeadEmailConfig } from "./site-settings";
import { getCredential } from "./secrets";

const OAuth2 = google.auth.OAuth2;

async function loadGmailCreds() {
  const [user, clientId, clientSecret, refreshToken] = await Promise.all([
    getCredential("gmail_user"),
    getCredential("gmail_client_id"),
    getCredential("gmail_client_secret"),
    getCredential("gmail_refresh_token"),
  ]);
  if (!user || !clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Gmail OAuth credentials are not configured. Set gmail_user, gmail_client_id, gmail_client_secret, gmail_refresh_token in Settings → Credentials.",
    );
  }
  return { user, clientId, clientSecret, refreshToken };
}

async function createTransporter() {
  const creds = await loadGmailCreds();
  const oauth2Client = new OAuth2(
    creds.clientId,
    creds.clientSecret,
    "https://developers.google.com/oauthplayground",
  );
  oauth2Client.setCredentials({ refresh_token: creds.refreshToken });
  const tokenResponse = await oauth2Client.getAccessToken();
  const accessToken = typeof tokenResponse === "string" ? tokenResponse : tokenResponse.token;
  if (!accessToken) throw new Error("Failed to retrieve Gmail OAuth access token");

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: creds.user,
      accessToken,
      clientId: creds.clientId,
      clientSecret: creds.clientSecret,
      refreshToken: creds.refreshToken,
    },
  });
}

export const LEAD_EMAIL_VARIABLES = [
  { token: "{NAME}", description: "Sender's name" },
  { token: "{EMAIL}", description: "Sender's email" },
  { token: "{PHONE}", description: "Sender's phone (blank if not provided)" },
  { token: "{COMPANY}", description: "Sender's company (blank if not provided)" },
  { token: "{MESSAGE}", description: "The message body" },
  { token: "{SOURCE}", description: "Where the inquiry came from (blank if not provided)" },
] as const;

function renderTemplate(
  tpl: string,
  vars: Record<string, string>,
  { escapeHtml }: { escapeHtml: boolean },
): string {
  return tpl.replace(/\{(NAME|EMAIL|PHONE|COMPANY|MESSAGE|SOURCE)\}/g, (_, k) => {
    const v = vars[k] ?? "";
    return escapeHtml ? escape(v) : v;
  });
}

export async function sendLeadEmail(lead: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source?: string;
}) {
  const cfg = await getLeadEmailConfig();
  const transporter = await createTransporter();
  const fromUser = await getCredential("gmail_user");

  const vars: Record<string, string> = {
    NAME: lead.name,
    EMAIL: lead.email,
    PHONE: lead.phone ?? "",
    COMPANY: lead.company ?? "",
    MESSAGE: lead.message,
    SOURCE: lead.source ?? "",
  };

  const subject = renderTemplate(cfg.subject, vars, { escapeHtml: false });
  const html = renderTemplate(cfg.body, vars, { escapeHtml: true });
  const cc = cfg.cc
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await transporter.sendMail({
    from: `"Tertiary Infotech" <${fromUser}>`,
    to: cfg.to,
    cc: cc.length ? cc : undefined,
    replyTo: lead.email,
    subject,
    html,
  });
}

function escape(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}

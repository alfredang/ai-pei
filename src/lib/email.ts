import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

async function createTransporter() {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground",
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  const tokenResponse = await oauth2Client.getAccessToken();
  const accessToken = typeof tokenResponse === "string" ? tokenResponse : tokenResponse.token;
  if (!accessToken) throw new Error("Failed to retrieve Gmail OAuth access token");

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
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
  const transporter = await createTransporter();
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? "sales@tertiarycourses.com.sg";
  const html = `
    <h2>New inquiry from ${escape(lead.name)}</h2>
    <p><strong>Email:</strong> <a href="mailto:${escape(lead.email)}">${escape(lead.email)}</a></p>
    ${lead.company ? `<p><strong>Company:</strong> ${escape(lead.company)}</p>` : ""}
    ${lead.phone ? `<p><strong>Phone:</strong> ${escape(lead.phone)}</p>` : ""}
    ${lead.source ? `<p><strong>Source:</strong> ${escape(lead.source)}</p>` : ""}
    <hr/>
    <p style="white-space:pre-wrap">${escape(lead.message)}</p>
  `;
  await transporter.sendMail({
    from: `"Tertiary Infotech" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: lead.email,
    subject: `New inquiry from ${lead.name}`,
    html,
  });
}

function escape(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}

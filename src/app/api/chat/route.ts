import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM = `You are a helpful assistant for Tertiary Infotech Pte Ltd, a Singapore-based provider of AI-powered LMS, TMS, and custom software for training providers.

Key facts:
- We build AI-LMS-TMS — a Learning + Training Management platform that is WSQ and TPQA compliant for Singapore training providers.
- Services: Training Management System, Learning Management System, AI-powered solutions, custom software development.
- Contact: sales@tertiarycourses.com.sg
- UEN: 201200606W

Be professional, friendly, and concise. If asked about pricing or specifics, direct visitors to fill out the contact form on this page.`;

export async function POST(req: Request) {
  try {
    const { message, history = [] } = (await req.json()) as {
      message: string;
      history?: Array<{ role: "user" | "model"; content: string }>;
    };
    if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Chatbot not configured" }, { status: 503 });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM,
    });
    const chat = model.startChat({
      history: history.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
    });
    const result = await chat.sendMessage(message);
    return NextResponse.json({ response: result.response.text() });
  } catch (err) {
    console.error("[chat] error", err);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}

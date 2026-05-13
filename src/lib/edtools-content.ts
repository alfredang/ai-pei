export type EdTool = { name: string; url: string };
export type EdToolGroup = {
  category: string;
  tagline: string;
  accent: "cyan" | "amber" | "green" | "purple";
  tools: EdTool[];
};

// Sourced from the open-source AI-LMS-TMS reference build:
// https://github.com/alfredang/AI-LMS-TMS
export const EDTOOL_GROUPS: EdToolGroup[] = [
  {
    category: "Classroom",
    tagline: "Interactive engagement",
    accent: "cyan",
    tools: [
      { name: "Flash Cards", url: "https://alfredang.github.io/flashcard/" },
      { name: "Padlet", url: "https://alfredang.github.io/padlet/" },
      { name: "Break Timer", url: "https://alfredang.github.io/musical-timer-countdown/" },
      { name: "Live Q&A", url: "https://alfredang.github.io/live-qna/" },
      { name: "Whiteboard", url: "https://alfredang.github.io/whiteboard/" },
      { name: "Live Poll", url: "https://alfredang.github.io/livepoll/" },
      { name: "Ice Breaker", url: "https://alfredang.github.io/ice-breaker/" },
      { name: "Pinboard", url: "https://alfredang.github.io/pinboard/" },
      { name: "Word Cloud", url: "https://alfredang.github.io/wordcloud/" },
      { name: "Mind Maps", url: "https://alfredang.github.io/mindmapping/" },
      { name: "Spinning Wheel", url: "https://alfredang.github.io/spinning-wheel/" },
      { name: "Collab Note", url: "https://alfredang.github.io/collabnote/" },
      { name: "Collab Flow", url: "https://alfredang.github.io/collabflow/" },
      { name: "Kanban Board", url: "https://alfredang.github.io/kanban/" },
    ],
  },
  {
    category: "Problem Solving",
    tagline: "Root-cause & systems thinking",
    accent: "amber",
    tools: [
      { name: "5 Whys", url: "https://alfredang.github.io/5whys/" },
      { name: "Fishbone Diagram", url: "https://alfredang.github.io/fishbone/" },
      { name: "Pareto Chart", url: "https://alfredang.github.io/paretochart/" },
      { name: "System Thinking", url: "https://alfredang.github.io/systemloop/" },
    ],
  },
  {
    category: "Cyber Security",
    tagline: "Hands-on hacking labs",
    accent: "purple",
    tools: [
      { name: "CyberLabs", url: "https://alfredang.github.io/cybersecuritysimulator/" },
      { name: "HackLabs", url: "https://alfredang.github.io/ethnicalhacking/" },
      { name: "Pentest (FauxBank)", url: "https://pentest-fauxbank.vercel.app/" },
    ],
  },
  {
    category: "Data Analytics",
    tagline: "Explore, clean, model",
    accent: "cyan",
    tools: [
      { name: "Pivot Visualization", url: "https://alfredang.github.io/novapivot/" },
      { name: "Anomaly Detection", url: "https://alfredang.github.io/anamolydetection2/" },
      { name: "Factor Analysis", url: "https://multifactoranalysis.streamlit.app/" },
      { name: "ML Classification", url: "https://ml-classification-888.streamlit.app/" },
      { name: "Mock Data Generator", url: "https://alfredang.github.io/mockdatagen/" },
    ],
  },
  {
    category: "Finance",
    tagline: "Tax, FP&A, ratios, trends",
    accent: "green",
    tools: [
      { name: "Tax Calculator", url: "https://alfredang.github.io/novataxsg/" },
      { name: "FP&A", url: "https://alfredang.github.io/novafinance/" },
      { name: "Ratio Calculators", url: "https://alfredang.github.io/novafinancialratiocalculator/" },
      { name: "Trend Analysis", url: "https://alfredang.github.io/financialtrend/" },
      { name: "Credit Loan Analysis", url: "https://creditloananalysis.streamlit.app/" },
    ],
  },
  {
    category: "Statistics · DOE · SPC",
    tagline: "NovaStats, NovaDOE, NovaSPC",
    accent: "amber",
    tools: [
      { name: "NovaStats", url: "https://alfredang.github.io/novastats/" },
      { name: "NovaDOE", url: "https://alfredang.github.io/novadoe/" },
      { name: "NovaSPC", url: "https://alfredang.github.io/novaspc/" },
    ],
  },
  {
    category: "Sustainability · Blockchain",
    tagline: "Carbon, NFT, supply trace",
    accent: "green",
    tools: [
      { name: "Carbon Footprint", url: "https://alfredang.github.io/sgcarboncalculator/" },
      { name: "Certify NFT", url: "https://alfredang.github.io/certifynft/" },
      { name: "Supply Verify", url: "https://alfredang.github.io/supplyverify/" },
    ],
  },
  {
    category: "GenAI",
    tagline: "Text · Image · Video · Music · UI",
    accent: "purple",
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Gemini", url: "https://gemini.google.com" },
      { name: "Claude", url: "https://claude.ai" },
      { name: "Perplexity", url: "https://www.perplexity.ai" },
      { name: "Firefly", url: "https://firefly.adobe.com" },
      { name: "NotebookLM", url: "https://notebooklm.google.com" },
      { name: "Gamma", url: "https://gamma.app" },
      { name: "Figma", url: "https://figma.com" },
    ],
  },
];

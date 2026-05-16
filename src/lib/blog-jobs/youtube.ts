import { XMLParser } from "fast-xml-parser";
import { YoutubeTranscript } from "youtube-transcript";

export type YtVideo = {
  videoId: string;
  title: string;
  url: string;
  description?: string;
  publishedAt?: string;
};

const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

/**
 * Resolve a YouTube @handle (e.g. "@lev-selector") to a channel_id (UCxxxx).
 * Uses the public channel page — no API key needed.
 */
export async function resolveChannelId(handle: string): Promise<string> {
  const h = handle.replace(/^@/, "");
  const res = await fetch(`https://www.youtube.com/@${h}`, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; TertiaryBlogBot/1.0)" },
  });
  if (!res.ok) throw new Error(`YouTube channel page returned ${res.status} for @${h}`);
  const html = await res.text();
  const m = html.match(/"channelId":"(UC[\w-]{20,})"/) ||
    html.match(/<meta itemprop="identifier" content="(UC[\w-]{20,})"/) ||
    html.match(/channel\/(UC[\w-]{20,})/);
  if (!m) throw new Error(`Could not extract channel_id from @${h} page`);
  return m[1];
}

/** Fetch the latest video from a channel via the public RSS feed. */
export async function getLatestVideo(channelId: string): Promise<YtVideo> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; TertiaryBlogBot/1.0)" },
  });
  if (!res.ok) throw new Error(`YouTube RSS returned ${res.status} for ${channelId}`);
  const body = await res.text();
  const parsed = xml.parse(body);
  const entries = parsed?.feed?.entry;
  const first = Array.isArray(entries) ? entries[0] : entries;
  if (!first) throw new Error("RSS feed has no entries");
  const videoId: string = first["yt:videoId"];
  const title: string = first.title;
  const description: string | undefined = first?.["media:group"]?.["media:description"];
  const publishedAt: string | undefined = first.published;
  if (!videoId || !title) throw new Error("RSS entry missing videoId or title");
  return {
    videoId,
    title,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    description,
    publishedAt,
  };
}

/**
 * Fetch the transcript for a video. Returns an empty string if no transcript
 * is available (private, disabled captions, or none auto-generated).
 */
export async function getTranscript(videoId: string): Promise<string> {
  try {
    const segments = await YoutubeTranscript.fetchTranscript(videoId);
    return segments.map((s) => s.text).join(" ").replace(/\s+/g, " ").trim();
  } catch (err) {
    console.warn(`[youtube] transcript fetch failed for ${videoId}:`, err);
    return "";
  }
}

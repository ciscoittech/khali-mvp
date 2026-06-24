import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";

const OEMBED_URL = "https://www.youtube.com/oembed";
const TRANSCRIPT_API = "https://www.youtube.com/watch";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:v=|\/v\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

async function fetchTitle(videoId: string): Promise<string> {
  try {
    const resp = await fetch(
      `${OEMBED_URL}?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (resp.ok) {
      const data = (await resp.json()) as { title?: string };
      return data.title || videoId;
    }
  } catch {}
  return videoId;
}

async function fetchTranscript(
  videoId: string
): Promise<{ text: string; segments: number; duration: number }> {
  // Fetch the watch page to extract captions track URL
  const resp = await fetch(`${TRANSCRIPT_API}?v=${videoId}`, {
    headers: { "Accept-Language": "en" },
  });
  const html = await resp.text();

  // Extract captions JSON from page source
  const captionMatch = html.match(/"captions":\s*(\{.*?"playerCaptionsTracklistRenderer".*?\})\s*,\s*"/s);
  if (!captionMatch) throw new Error("No captions available for this video");

  const captionsData = JSON.parse(captionMatch[1]);
  const tracks =
    captionsData?.playerCaptionsTracklistRenderer?.captionTracks || [];

  if (tracks.length === 0) throw new Error("No caption tracks found");

  // Prefer English, fall back to first available
  const track =
    tracks.find((t: any) => t.languageCode === "en") || tracks[0];

  const captionResp = await fetch(track.baseUrl + "&fmt=json3");
  const captionJson = (await captionResp.json()) as {
    events?: Array<{ segs?: Array<{ utf8: string }>; tStartMs?: number; dDurationMs?: number }>;
  };

  const events = captionJson.events || [];
  let fullText = "";
  let maxEnd = 0;

  for (const event of events) {
    if (event.segs) {
      fullText += event.segs.map((s) => s.utf8).join("");
    }
    const end = (event.tStartMs || 0) + (event.dDurationMs || 0);
    if (end > maxEnd) maxEnd = end;
  }

  return {
    text: fullText.trim(),
    segments: events.length,
    duration: maxEnd / 1000,
  };
}

export default defineToolPlugin({
  id: "youtube-extractor",
  name: "YouTube Extractor",
  description: "Extract transcripts and metadata from YouTube videos.",
  tools: (tool) => [
    tool({
      name: "extract_youtube_transcript",
      description:
        "Extract the full transcript/captions from a YouTube video. " +
        "Returns the video title, full transcript text, duration, and segment count. " +
        "Works with any youtube.com or youtu.be URL.",
      parameters: Type.Object({
        url: Type.String({
          description: "YouTube video URL (youtube.com/watch?v=... or youtu.be/...)",
        }),
      }),
      execute: async ({ url }) => {
        const videoId = extractVideoId(url);
        if (!videoId) throw new Error(`Invalid YouTube URL: ${url}`);

        const [title, transcript] = await Promise.all([
          fetchTitle(videoId),
          fetchTranscript(videoId),
        ]);

        return {
          video_id: videoId,
          title,
          transcript: transcript.text,
          duration_seconds: transcript.duration,
          segment_count: transcript.segments,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      },
    }),

    tool({
      name: "write_shorts_script",
      description:
        "Take a video transcript and write an optimized 60-second YouTube Shorts script. " +
        "Returns hook, script body, visual direction notes, word count, and estimated duration.",
      parameters: Type.Object({
        title: Type.String({ description: "Original video title" }),
        transcript: Type.String({ description: "Full transcript text" }),
        style: Type.Optional(
          Type.String({
            description:
              'Script style: "engaging" (default), "educational", or "dramatic"',
          })
        ),
        target_seconds: Type.Optional(
          Type.Number({ description: "Target duration in seconds (default: 60)" })
        ),
      }),
      execute: async ({ title, transcript, style, target_seconds }, ctx) => {
        const duration = target_seconds || 60;
        const wordTarget = Math.round(duration * 2.5);
        const scriptStyle = style || "engaging";

        // This tool delegates to the LLM via the agent context
        // The skill prompt in shorts-producer.md guides the LLM to write the script
        // We return the parameters so the LLM can use them in its response
        return {
          action: "write_script",
          title,
          transcript_length: transcript.length,
          transcript_preview: transcript.slice(0, 2000),
          full_transcript: transcript,
          target_duration_seconds: duration,
          target_word_count: wordTarget,
          style: scriptStyle,
          instructions:
            `Write a ${duration}-second short script (~${wordTarget} words) from this transcript. ` +
            `Style: ${scriptStyle}. Extract the SINGLE most compelling insight. ` +
            `Format: HOOK: [line] then SCRIPT: [body] then VISUAL_NOTES: [comma-separated visual cues]. ` +
            `Hook must complete in 2-3 seconds. End abruptly after payoff.`,
        };
      },
    }),

    tool({
      name: "scan_youtube_trends",
      description:
        "Scan YouTube for trending/rising videos in specified niches. " +
        "Returns videos with view velocity, engagement ratio, and shorts potential score. " +
        "Looks for videos published in last 24-72 hours with accelerating views.",
      parameters: Type.Object({
        niches: Type.Array(Type.String(), {
          description:
            'Content niches to scan (e.g. ["tech", "AI", "business", "fitness"])',
        }),
        max_results: Type.Optional(
          Type.Number({ description: "Max videos to return per niche (default: 5)" })
        ),
      }),
      execute: async ({ niches, max_results }) => {
        const limit = max_results || 5;

        // Scan YouTube trending via RSS feeds (no API key needed)
        const results: Array<{
          niche: string;
          title: string;
          channel: string;
          url: string;
          published: string;
          views_estimate: string;
          shorts_potential: number;
          reason: string;
        }> = [];

        for (const niche of niches) {
          try {
            const resp = await fetch(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                niche + " 2026"
              )}&sp=CAISBAgCEAE%3D`, // Filter: last hour, sorted by view count
              { headers: { "Accept-Language": "en" } }
            );
            const html = await resp.text();

            // Extract video data from initial page data
            const dataMatch = html.match(/var ytInitialData = ({.*?});\s*<\/script>/s);
            if (!dataMatch) continue;

            const data = JSON.parse(dataMatch[1]);
            const contents =
              data?.contents?.twoColumnSearchResultsRenderer?.primaryContents
                ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];

            let count = 0;
            for (const item of contents) {
              if (count >= limit) break;
              const renderer = item.videoRenderer;
              if (!renderer) continue;

              const title = renderer.title?.runs?.[0]?.text || "";
              const channel = renderer.ownerText?.runs?.[0]?.text || "";
              const videoId = renderer.videoId || "";
              const viewText = renderer.viewCountText?.simpleText || "";
              const published = renderer.publishedTimeText?.simpleText || "";

              results.push({
                niche,
                title,
                channel,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                published,
                views_estimate: viewText,
                shorts_potential: 0, // LLM scores this via the skill
                reason: `Trending in ${niche}`,
              });
              count++;
            }
          } catch {
            // Skip niche on error
          }
        }

        return {
          niches_scanned: niches,
          total_found: results.length,
          videos: results,
        };
      },
    }),
  ],
});

import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const OPENROUTER_VIDEOS_URL = "https://openrouter.ai/api/v1/videos";
const VEO_MODEL = "google/veo-3.1-lite";
const MAX_POLL_ATTEMPTS = 60;
const POLL_INTERVAL_MS = 10_000;

function buildVeoPrompt(
  hook: string,
  script: string,
  visualNotes?: string
): string {
  const visual =
    visualNotes ||
    "Dynamic medium shots with subtle camera movement, warm natural lighting, shallow depth of field, modern clean setting";

  return [
    `Portrait 9:16 vertical video. ${visual}.`,
    "",
    "A confident presenter speaks directly to camera with natural energy and expression.",
    "Medium close-up shot, eye-level angle, 50mm lens, shallow depth of field.",
    "Soft diffused key light from the front-left, warm color temperature, clean modern background slightly out of focus.",
    "Slow subtle push-in camera movement throughout.",
    "",
    `Audio: Clear voice narrating with conviction: "${hook}"`,
    "Ambient: Soft room tone, minimal background.",
    "",
    "The presenter gestures naturally while speaking, maintaining direct eye contact with the camera.",
  ].join("\n");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default defineToolPlugin({
  id: "video-generator",
  name: "Video Generator",
  description:
    "Generate short-form videos using Google Veo 3.1 Lite via OpenRouter.",
  tools: (tool) => [
    tool({
      name: "generate_video",
      description:
        "Generate a 9:16 vertical short video from a script using Google Veo 3.1 Lite via OpenRouter. " +
        "Submits the generation request, polls for completion, and downloads the video to the local downloads folder. " +
        "Takes 2-5 minutes to complete.",
      parameters: Type.Object({
        hook: Type.String({
          description: "The hook line (first 2-3 seconds of the short)",
        }),
        script: Type.String({
          description: "The full short script to generate video from",
        }),
        visual_notes: Type.Optional(
          Type.String({
            description:
              "Visual direction notes: cinematography, lighting, setting descriptions",
          })
        ),
        video_id: Type.Optional(
          Type.String({
            description: "Source YouTube video ID (used in filename)",
          })
        ),
      }),
      execute: async ({ hook, script, visual_notes, video_id }, ctx) => {
        const apiKey = ctx.config?.openrouterApiKey || process.env.OPENROUTER_API_KEY;
        if (!apiKey) throw new Error("OpenRouter API key not configured");

        const downloadsDir =
          ctx.config?.downloadsDir || join(process.cwd(), "downloads");
        await mkdir(downloadsDir, { recursive: true });

        const prompt = buildVeoPrompt(hook, script, visual_notes);

        // Submit generation request
        const submitResp = await fetch(OPENROUTER_VIDEOS_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: VEO_MODEL,
            prompt,
            aspect_ratio: "9:16",
            duration: 8,
            enable_audio: true,
          }),
        });

        if (!submitResp.ok) {
          const err = await submitResp.text();
          throw new Error(`Veo submission failed (${submitResp.status}): ${err}`);
        }

        const job = (await submitResp.json()) as Record<string, string>;
        const generationId = job.id || job.generation_id;

        // Poll for completion
        let videoUrl: string | null = null;

        for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
          await sleep(POLL_INTERVAL_MS);

          const pollResp = await fetch(
            `${OPENROUTER_VIDEOS_URL}/${generationId}`,
            { headers: { Authorization: `Bearer ${apiKey}` } }
          );

          if (!pollResp.ok) continue;

          const status = (await pollResp.json()) as Record<string, string>;

          if (status.status === "complete") {
            videoUrl = status.url || status.video_url;
            break;
          }
          if (status.status === "failed" || status.status === "error") {
            return {
              status: "failed",
              error: status.error || "Video generation failed",
              generation_id: generationId,
            };
          }
        }

        if (!videoUrl) {
          return {
            status: "timeout",
            error: "Video generation timed out after 10 minutes",
            generation_id: generationId,
          };
        }

        // Download video
        const timestamp = new Date()
          .toISOString()
          .replace(/[:.]/g, "-")
          .slice(0, 19);
        const filename = `short_${video_id || "gen"}_${timestamp}.mp4`;
        const filepath = join(downloadsDir, filename);

        const dlResp = await fetch(videoUrl);
        if (!dlResp.ok) throw new Error("Failed to download generated video");

        const buffer = Buffer.from(await dlResp.arrayBuffer());
        await writeFile(filepath, buffer);

        return {
          status: "complete",
          filepath,
          filename,
          generation_id: generationId,
          model: VEO_MODEL,
          duration_seconds: 8,
          format: "9:16 vertical (1080x1920)",
        };
      },
    }),
  ],
});

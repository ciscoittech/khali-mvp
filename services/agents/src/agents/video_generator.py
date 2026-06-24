"""Agent 3: Generate video from script using Google Veo 3.1 Lite via OpenRouter.

Prompt follows Google DeepMind's Veo prompt guide:
- Specific cinematography: shot type, camera movement, angle, lens
- Detailed lighting: quality, direction, source, color temperature
- Audio direction: dialogue, SFX, ambient sound (labeled separately)
- Temporal action sequencing: 1-3 actions max per 8-second clip
- Positive direction only (no "don't" or "no X")
- Character detail: age, features, clothing, expression
"""

import asyncio
import logging
from pathlib import Path
from datetime import datetime

import httpx

from src.config import settings
from src.schemas import ScriptResult, VideoResult

logger = logging.getLogger(__name__)

DOWNLOADS_DIR = Path(__file__).resolve().parents[4] / "downloads"
OPENROUTER_VIDEOS_URL = "https://openrouter.ai/api/v1/videos"
VEO_MODEL = "google/veo-3.1-lite"
MAX_POLL_ATTEMPTS = 60
POLL_INTERVAL_SECONDS = 10


def build_video_prompt(script: ScriptResult) -> str:
    """Build a Veo-optimized prompt from the script and visual notes.

    Follows Google's prompt guide:
    - Subject + context + action as core elements
    - Cinematography language (shot, movement, angle, lens)
    - Explicit lighting direction
    - Audio cues labeled separately
    - 1-3 actions max for 8-second clip
    - Positive framing only
    """
    visual_direction = script.visual_notes if script.visual_notes else (
        "Dynamic medium shots with subtle camera movement, "
        "warm natural lighting, shallow depth of field, "
        "modern clean setting"
    )

    prompt = f"""Portrait 9:16 vertical video. {visual_direction}.

A confident presenter speaks directly to camera with natural energy and expression.
Medium close-up shot, eye-level angle, 50mm lens, shallow depth of field.
Soft diffused key light from the front-left, warm color temperature, clean modern background slightly out of focus.
Slow subtle push-in camera movement throughout.

Audio: Clear voice narrating with conviction: "{script.hook}"
Ambient: Soft room tone, minimal background.

The presenter gestures naturally while speaking, maintaining direct eye contact with the camera."""

    return prompt


async def generate_video(script: ScriptResult) -> VideoResult:
    """Generate a 9:16 short video from the script using Veo 3.1 Lite."""
    DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)

    prompt = build_video_prompt(script)

    async with httpx.AsyncClient(timeout=30) as client:
        # Submit generation request
        resp = await client.post(
            OPENROUTER_VIDEOS_URL,
            headers={
                "Authorization": f"Bearer {settings.openrouter_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": VEO_MODEL,
                "prompt": prompt,
                "aspect_ratio": "9:16",
                "duration": 8,
                "enable_audio": True,
            },
        )
        resp.raise_for_status()
        job = resp.json()
        generation_id = job.get("id") or job.get("generation_id")
        logger.info(f"Video generation submitted: {generation_id}")

        # Poll for completion
        video_url = None
        for attempt in range(MAX_POLL_ATTEMPTS):
            await asyncio.sleep(POLL_INTERVAL_SECONDS)

            poll_resp = await client.get(
                f"{OPENROUTER_VIDEOS_URL}/{generation_id}",
                headers={"Authorization": f"Bearer {settings.openrouter_api_key}"},
            )
            poll_resp.raise_for_status()
            status_data = poll_resp.json()

            status = status_data.get("status", "")
            logger.info(f"Poll {attempt + 1}/{MAX_POLL_ATTEMPTS}: {status}")

            if status == "complete":
                video_url = status_data.get("url") or status_data.get("video_url")
                break
            elif status in ("failed", "error"):
                error_msg = status_data.get("error", "Unknown error")
                return VideoResult(
                    video_id=script.video_id,
                    script=script.short_script,
                    status="failed",
                    instructions=f"Video generation failed: {error_msg}",
                )

        if not video_url:
            return VideoResult(
                video_id=script.video_id,
                script=script.short_script,
                status="failed",
                instructions="Video generation timed out after polling.",
            )

        # Download video to local folder
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"short_{script.video_id}_{timestamp}.mp4"
        filepath = DOWNLOADS_DIR / filename

        dl_resp = await client.get(video_url, timeout=120)
        dl_resp.raise_for_status()
        filepath.write_bytes(dl_resp.content)
        logger.info(f"Video saved: {filepath}")

    return VideoResult(
        video_id=script.video_id,
        script=script.short_script,
        status="complete",
        video_url=str(filepath),
        instructions=f"Video downloaded to: {filepath}",
    )

"""Agent 1: Extract and summarize transcript from YouTube video."""

import logging
import httpx

from src.youtube.transcript import extract_video_id, get_transcript
from src.schemas import TranscriptResult

logger = logging.getLogger(__name__)


async def extract_transcript(youtube_url: str, redis=None) -> TranscriptResult:
    """Extract transcript and video metadata from a YouTube URL."""
    video_id = extract_video_id(youtube_url)

    # Fetch title via oEmbed (no API key needed)
    title = video_id
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://www.youtube.com/oembed",
                params={"url": f"https://www.youtube.com/watch?v={video_id}", "format": "json"},
            )
            if resp.status_code == 200:
                title = resp.json().get("title", video_id)
    except Exception:
        logger.warning(f"Could not fetch title for {video_id}")

    transcript_data = await get_transcript(video_id, redis=redis)

    return TranscriptResult(
        video_id=video_id,
        title=title,
        full_transcript=transcript_data["full_transcript"],
        duration_seconds=transcript_data["duration_seconds"],
    )

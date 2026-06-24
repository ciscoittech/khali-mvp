import re
import json
import logging

from youtube_transcript_api import YouTubeTranscriptApi

logger = logging.getLogger(__name__)


def extract_video_id(url: str) -> str:
    """Extract video ID from various YouTube URL formats."""
    patterns = [
        r"(?:v=|/v/|youtu\.be/)([a-zA-Z0-9_-]{11})",
        r"(?:shorts/)([a-zA-Z0-9_-]{11})",
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    raise ValueError(f"Could not extract video ID from: {url}")


async def get_transcript(video_id: str, redis=None) -> dict:
    """Fetch transcript for a YouTube video. Caches in Redis if available."""
    cache_key = f"khali:transcript:{video_id}"

    if redis:
        cached = await redis.get(cache_key)
        if cached:
            logger.info(f"Cache hit for transcript: {video_id}")
            return json.loads(cached)

    ytt_api = YouTubeTranscriptApi()
    transcript_list = ytt_api.fetch(video_id)

    full_text = " ".join(snippet.text for snippet in transcript_list)
    duration = max(snippet.start + snippet.duration for snippet in transcript_list) if transcript_list else 0

    result = {
        "video_id": video_id,
        "full_transcript": full_text,
        "duration_seconds": duration,
        "segment_count": len(transcript_list),
    }

    if redis:
        await redis.setex(cache_key, 3600, json.dumps(result))

    return result

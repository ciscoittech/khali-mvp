"""Main endpoint: YouTube URL in, Short script + video out."""

import logging

from fastapi import APIRouter, HTTPException, Request

from src.schemas import ShortsRequest, ShortsResponse
from src.agents.transcript_extractor import extract_transcript
from src.agents.script_writer import write_script
from src.agents.video_generator import generate_video

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/shorts", response_model=ShortsResponse)
async def create_short(req: ShortsRequest, request: Request):
    """Pipeline: YouTube URL -> Transcript -> 60s Script -> Video."""
    redis = getattr(request.app.state, "redis", None)

    try:
        # Agent 1: Extract transcript
        transcript = await extract_transcript(req.youtube_url, redis=redis)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Transcript extraction failed: {e}")
        raise HTTPException(status_code=422, detail=f"Could not fetch transcript: {e}")

    # Agent 2: Write 60s script
    script = await write_script(
        transcript,
        target_duration=req.target_duration_seconds,
        style=req.style,
    )

    # Agent 3: Generate video (or return instructions)
    video = await generate_video(script)

    return ShortsResponse(
        video_id=transcript.video_id,
        transcript=transcript,
        script=script,
        video=video,
    )

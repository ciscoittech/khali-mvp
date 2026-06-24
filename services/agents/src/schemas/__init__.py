from pydantic import BaseModel


class ShortsRequest(BaseModel):
    youtube_url: str
    target_duration_seconds: int = 60
    style: str = "engaging"  # "engaging" | "educational" | "dramatic"


class TranscriptResult(BaseModel):
    video_id: str
    title: str
    full_transcript: str
    duration_seconds: float


class ScriptResult(BaseModel):
    video_id: str
    original_title: str
    short_script: str
    hook: str
    estimated_duration_seconds: int
    word_count: int
    visual_notes: str = ""


class VideoResult(BaseModel):
    video_id: str
    script: str
    status: str  # "script_ready" | "generating" | "complete"
    video_url: str | None = None
    instructions: str | None = None


class ShortsResponse(BaseModel):
    video_id: str
    transcript: TranscriptResult
    script: ScriptResult
    video: VideoResult

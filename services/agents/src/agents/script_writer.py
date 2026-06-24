"""Agent 2: Condense transcript into a 60-second short script."""

import logging

from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

from src.config import settings
from src.observability.langfuse import get_callback
from src.schemas import TranscriptResult, ScriptResult

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are an expert YouTube Shorts scriptwriter who converts long-form video transcripts into viral 60-second shorts.

## OUTPUT FORMAT
Return EXACTLY this structure:

HOOK: [Your hook line — must be completable in 2-2.5 seconds]
SCRIPT: [The full narration script]
VISUAL_NOTES: [Comma-separated visual direction cues for video generation]

## SCRIPT RULES

**Length**: The script MUST be speakable in {duration} seconds at a natural pace (~{word_count} words). Count carefully.

**Hook (first 2-3 seconds)**:
- Use one of these proven formulas:
  - Pattern Interrupt: Start mid-action or with a contradiction ("I made more money after I stopped posting daily")
  - Direct Promise: State a specific, measurable outcome with numbers ("Master the J-cut in 30 seconds")
  - Question Hook: Create an information gap ("Why do 90% of developers get this wrong?")
- NEVER open with greetings ("Hey guys"), slow context-setting, or generic statements
- Complete the hook in 2-2.5 seconds at a confident, slightly faster-than-normal pace

**Body (3-55 seconds)**:
- Extract the single most valuable insight from the original video — do NOT try to cover everything
- Use short, punchy sentences. Conversational tone. Read-aloud natural.
- Build a retention loop: each sentence should create a micro-question answered by the next
- Front-load the strongest content — never bury it past 15 seconds

**Close (last 5 seconds)**:
- Deliver the resolution immediately — answer the hook's promise
- End abruptly after the payoff. No "thanks for watching" or trailing filler.

**Visual Notes**:
- Describe 3-5 visual beats that match the script (used for video generation)
- Use specific cinematography language: shot type, camera movement, lighting, setting
- Example: "Close-up of hands on keyboard, warm tungsten lighting, shallow focus"

Style: {style}"""


async def write_script(
    transcript: TranscriptResult,
    target_duration: int = 60,
    style: str = "engaging",
) -> ScriptResult:
    """Take a full transcript and create a 60-second short script."""
    # ~2.5 words per second for natural speech
    target_words = int(target_duration * 2.5)

    llm = ChatOpenAI(
        model=settings.default_model,
        openai_api_key=settings.openrouter_api_key,
        openai_api_base=settings.openrouter_base_url,
        temperature=0.7,
    )

    callback = get_callback(
        "khali.script_writer",
        metadata={"video_id": transcript.video_id, "style": style},
    )

    messages = [
        SystemMessage(content=SYSTEM_PROMPT.format(
            duration=target_duration,
            word_count=target_words,
            style=style,
        )),
        HumanMessage(content=f"""Original video: "{transcript.title}"
Original duration: {transcript.duration_seconds:.0f} seconds

Full transcript:
{transcript.full_transcript}

Create a {target_duration}-second short script (~{target_words} words). Remember: extract the SINGLE most compelling insight, not a summary of the whole video."""),
    ]

    config = {"callbacks": [callback]} if callback else {}
    response = await llm.ainvoke(messages, config=config)

    script_text = response.content
    hook = ""
    body = script_text
    visual_notes = ""

    # Parse structured output
    if "HOOK:" in script_text:
        parts = script_text.split("SCRIPT:", 1)
        hook = parts[0].replace("HOOK:", "").strip()
        if len(parts) > 1:
            remaining = parts[1]
            if "VISUAL_NOTES:" in remaining:
                script_parts = remaining.split("VISUAL_NOTES:", 1)
                body = script_parts[0].strip()
                visual_notes = script_parts[1].strip()
            else:
                body = remaining.strip()

    word_count = len(body.split())

    return ScriptResult(
        video_id=transcript.video_id,
        original_title=transcript.title,
        short_script=body,
        hook=hook,
        estimated_duration_seconds=int(word_count / 2.5),
        word_count=word_count,
        visual_notes=visual_notes,
    )

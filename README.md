# Khali — YouTube Shorts Factory

AI-powered YouTube Shorts production system. Catches trends before they peak, extracts transcripts, writes viral 60-second scripts, and generates videos — all from Telegram.

Built on [OpenClaw](https://openclaw.ai) so it's low-code and hands-off.

## What It Does

```
You send a YouTube link on Telegram
    → AI extracts the transcript
    → AI writes a 60-second short script
    → You approve (or edit)
    → AI generates a video with Google Veo 3.1 Lite
    → Video downloads to your machine
```

**Plus:** A trend-hunting agent scans YouTube every 6 hours for rising videos in your niches, scores them, and alerts you before they peak.

## The Team (6 AI Skills)

| Skill | What It Does |
|-------|-------------|
| **shorts-producer** | End-to-end: YouTube URL → transcript → script → video |
| **trend-hunter** | Proactive trend discovery every 6 hours |
| **daily-digest** | Morning brief + evening recap with systems health |
| **coach** | Always-on mentor — explains what happened after every action |
| **explain-mode** | Toggle deep-dive mode for detailed breakdowns |
| **primer** | Foundational theory: Systems Thinking (Meadows) + Theory of Constraints (Goldratt) |

## The Tools (3 Plugins)

| Plugin | Tools |
|--------|-------|
| **youtube-extractor** | `extract_youtube_transcript`, `write_shorts_script`, `scan_youtube_trends` |
| **video-generator** | `generate_video` (Google Veo 3.1 Lite via OpenRouter) |
| **trend-scout** | `check_google_trends`, `get_channel_recent` |

## Quick Start

```bash
# 1. Install OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# 2. Clone this repo
git clone https://github.com/ciscoittech/khali-mvp.git
cd khali-mvp

# 3. Set up environment
cp .env.example .env
# Add your OPENROUTER_API_KEY and TELEGRAM_BOT_TOKEN

# 4. Build plugins
cd plugins/youtube-extractor && npm install && npm run build && cd ../..
cd plugins/video-generator && npm install && npm run build && cd ../..
cd plugins/trend-scout && npm install && npm run build && cd ../..

# 5. Start
openclaw start
```

## Usage (via Telegram)

- **Send a YouTube URL** → get a script → say "generate" for video
- **"find trends"** → scan your niches for rising videos
- **"short 1"** → produce a short from trend alert #1
- **"primer"** → read the systems thinking foundation
- **"explain mode"** → toggle detailed breakdowns
- **"status"** → daily production stats + systems health

## Learning Built In

This isn't just a tool — it's a learning platform. Every action teaches you:

- **How AI agents work** (skills, plugins, channels, prompts)
- **Systems Thinking** — stocks, flows, feedback loops, leverage points (Donella Meadows)
- **Theory of Constraints** — find the bottleneck, maximize throughput (Eliyahu Goldratt)

The coach explains as you go. The primer is always there when you want the theory. Say "explain mode" for deep dives.

## Stack

- **[OpenClaw](https://openclaw.ai)** — Agent runtime
- **[DeepSeek V4 Flash](https://openrouter.ai/deepseek/deepseek-v4-flash)** — Script writing (via OpenRouter)
- **[Google Veo 3.1 Lite](https://openrouter.ai/google/veo-3.1-lite)** — Video generation (via OpenRouter)
- **Telegram** — Primary interface

## Project Structure

```
khali-mvp/
├── openclaw.json           # Agent config (port 3126)
├── .env.example            # Secrets template
├── skills/                 # Agent behaviors
│   ├── primer.md           # Systems thinking foundation
│   ├── coach.md            # Always-on mentor
│   ├── explain-mode.md     # Deep-dive toggle
│   ├── shorts-producer.md  # Production pipeline
│   ├── trend-hunter.md     # Trend discovery
│   └── daily-digest.md     # Stats & health
├── plugins/                # Tools
│   ├── youtube-extractor/  # Transcript + trends
│   ├── video-generator/    # Veo 3.1 Lite
│   └── trend-scout/        # Google Trends + RSS
├── downloads/              # Generated videos
└── services/agents/        # Legacy FastAPI prototype
```

## License

MIT

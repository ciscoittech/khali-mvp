# Khali MVP — YouTube Shorts Factory

AI-powered YouTube Shorts production system built on OpenClaw. Catches trends early, extracts transcripts, writes viral scripts, and generates videos — all low-code via Telegram or email.

## Architecture

```
openclaw.json (port 3126)
├── Channels: Telegram + Email
├── Model: DeepSeek V4 Flash (OpenRouter)
│
├── Skills (agent behaviors):
│   ├── shorts-producer.md    — End-to-end: URL → transcript → script → video
│   ├── trend-hunter.md       — Proactive trend discovery (every 6 hours)
│   └── daily-digest.md       — Morning brief + evening recap
│
└── Plugins (tools):
    ├── youtube-extractor/     — extract_youtube_transcript, write_shorts_script, scan_youtube_trends
    ├── video-generator/       — generate_video (Veo 3.1 Lite via OpenRouter)
    └── trend-scout/           — check_google_trends, get_channel_recent
```

## Pipeline

```
Trend Alert (auto)          OR          User sends YouTube URL
       │                                        │
       └──────────────┬─────────────────────────┘
                      ▼
         extract_youtube_transcript
                      ▼
         write_shorts_script (DeepSeek V4 Flash)
                      ▼
         User approves script
                      ▼
         generate_video (Veo 3.1 Lite)
                      ▼
         Download to ./downloads/
```

## Setup

```bash
# 1. Install OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# 2. Configure
cp .env.example .env
# Add OPENROUTER_API_KEY, TELEGRAM_BOT_TOKEN, email creds

# 3. Build plugins
cd plugins/youtube-extractor && npm install && npm run build && cd ../..
cd plugins/video-generator && npm install && npm run build && cd ../..
cd plugins/trend-scout && npm install && npm run build && cd ../..

# 4. Run
openclaw start
```

## Usage (via Telegram or Email)

- Send a YouTube URL → gets a script back → say "generate" for video
- "find trends" → scans niches for rising videos
- "set niches: tech, AI, cooking" → configures trend scanning
- "status" → daily digest of production stats
- "short 1" → produce a short from trend alert #1

## Stack

- **OpenClaw** — Agent runtime (skills + plugins + channels)
- **DeepSeek V4 Flash** — Script writing (via OpenRouter)
- **Veo 3.1 Lite** — Video generation (via OpenRouter)
- **Telegram** — Primary interface for cousin
- **Email** — Trend alerts + daily digests

## Status

- **ACTIVE** — MVP in development
- Port: 3126 (OpenClaw gateway)

## Legacy

`services/agents/` contains the original FastAPI prototype (transcript + script pipeline validated).

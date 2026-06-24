# Khali — YouTube Shorts Factory

AI-powered YouTube Shorts production system. Catches trends before they peak, extracts transcripts, writes viral 60-second scripts, and generates videos — all from Telegram.

Built on [OpenClaw](https://openclaw.ai) so it's low-code and hands-off. Built to teach you how AI agent systems work while you use one.

---

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

---

## Quick Start

```bash
# 1. Install OpenClaw (https://docs.openclaw.ai/start/getting-started)
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

**Need an OpenRouter key?** Sign up at [openrouter.ai](https://openrouter.ai) — it powers both the script writing (DeepSeek) and video generation (Veo).

**Need a Telegram bot?** Message [@BotFather](https://t.me/BotFather) on Telegram, create a bot, copy the token.

---

## How to Get the Most Out of This

### Step 1: Start Using It (Day 1)

Open Telegram and send a YouTube link. That's it. The system will:
1. Pull the transcript
2. Write a 60-second script with a hook
3. Ask you to approve
4. Generate the video

The **coach** is always on — after every action, it explains what just happened and why. You don't need to understand the system to use it. You'll learn by doing.

### Step 2: Read the Primer (When You're Curious)

Type **`primer`** in Telegram. You'll get a 5-minute guide covering:

- **What OpenClaw is** and how skills, plugins, and channels connect
- **Systems Thinking** (Donella Meadows) — see stocks, flows, and feedback loops in your production
- **Theory of Constraints** (Goldratt) — find the ONE bottleneck and fix it
- **Hands-on exercises** that teach each concept by doing it
- **Documentation links** to go deeper on anything

You can skip around — it's a reference, not a textbook. Come back to it anytime.

### Step 3: Find Your Bottleneck (Week 1)

After producing a few shorts, type **`status`**. The daily digest shows:
- **Throughput**: shorts produced this week
- **Inventory**: scripts waiting for your approval
- **Constraint**: what's currently slowing the system down

If scripts are piling up, **you** are the constraint (Goldratt, Chapter 13). The system will tell you: *"Your bottleneck is approval — I'm pausing scouting until you clear the queue."*

### Step 4: Catch Trends Early (Week 2)

Type **`find trends`** or let the auto-scanner run every 6 hours. It surfaces rising videos scored 1-10 on "shorts potential." When you see one you like, just say **`short 1`** — the full pipeline runs automatically.

Configure your niches: **`set niches: tech, AI, cooking`**

### Step 5: Change the Rules (Month 1+)

This is where the real power is. Open `skills/shorts-producer.md` in a text editor and change the hook formulas. That's **leverage point 4** (Meadows) — you just changed a rule that affects every script the system writes.

Type **`explain mode`** to see exactly what prompts the AI receives and why. Turn it off with **`explain mode off`**.

### Step 6: Go Deeper

| Want to... | Do this |
|-----------|---------|
| Understand the theory | Type `primer` — covers Meadows & Goldratt mapped to Khali |
| See detailed breakdowns | Type `explain mode` — shows prompts, inputs/outputs, cinematography terms |
| Learn OpenClaw concepts | Just use it — the coach explains after every action |
| Build your own skills | Read [Creating Skills](https://docs.openclaw.ai/tools/creating-skills), then edit any `.md` file in `skills/` |
| Add new tools | Read [Building Plugins](https://docs.openclaw.ai/plugins/building-plugins) |
| Browse community skills | Check [ClawHub](https://github.com/openclaw/clawhub) |
| Check API costs | Visit [OpenRouter Activity](https://openrouter.ai/activity) |

---

## The Team (6 AI Skills)

| Skill | What It Does | When It Activates |
|-------|-------------|-------------------|
| **shorts-producer** | End-to-end: YouTube URL → transcript → script → video | When you send a YouTube link |
| **trend-hunter** | Proactive trend discovery, scores videos 1-10 | Every 6 hours + "find trends" |
| **daily-digest** | Morning brief + evening recap with systems health | 8am/9pm + "status" |
| **coach** | Always-on mentor — explains with systems language | After every action |
| **explain-mode** | Toggle deep-dive breakdowns of every step | "explain mode" on/off |
| **primer** | Systems thinking foundation (Meadows + Goldratt) | "primer" anytime |

## The Tools (3 Plugins)

| Plugin | Tools | What It Calls |
|--------|-------|---------------|
| **youtube-extractor** | `extract_youtube_transcript`, `write_shorts_script`, `scan_youtube_trends` | YouTube captions + [DeepSeek V4 Flash](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| **video-generator** | `generate_video` | [Google Veo 3.1 Lite](https://openrouter.ai/google/veo-3.1-lite) via OpenRouter |
| **trend-scout** | `check_google_trends`, `get_channel_recent` | Google Trends + YouTube RSS |

---

## The Theory (Why It Works This Way)

This system is designed around two books. You don't need to read them — the primer and coach teach the concepts as you use the system — but they're worth reading if you want to go deep.

### Thinking in Systems — Donella Meadows (2008)

> *"A system is more than the sum of its parts."*

Teaches you to see Khali as interconnected stocks, flows, and feedback loops — not separate tools. The trend scanner is an **inflow**. Your content library is a **stock**. Good scripts create a **reinforcing loop** with the YouTube algorithm. The primer maps every concept to what Khali actually does.

### The Goal — Eliyahu Goldratt (1984)

> *"The goal is not to improve one measurement in isolation. The goal is to improve the THROUGHPUT of the entire system."*

Teaches you to find the ONE bottleneck and focus there. In Khali, the constraint is usually **your approval speed** — everything else is automated. The daily digest tracks throughput, inventory, and operating expense so you can see it.

---

## Documentation

### OpenClaw
- [Getting Started](https://docs.openclaw.ai/start/getting-started) — install and first chat in 5 minutes
- [Skills](https://docs.openclaw.ai/tools/skills) — how agent behaviors work
- [Creating Skills](https://docs.openclaw.ai/tools/creating-skills) — write your own
- [Plugins](https://docs.openclaw.ai/tools/plugin) — how tools work
- [Building Plugins](https://docs.openclaw.ai/plugins/building-plugins) — add new tools
- [Telegram](https://docs.openclaw.ai/channels/telegram) — bot setup
- [Channels](https://docs.openclaw.ai/channels) — all messaging platforms
- [Cron / Scheduling](https://docs.openclaw.ai/automation/cron-jobs) — automated tasks
- [Standing Orders](https://docs.openclaw.ai/automation/standing-orders) — persistent rules
- [Agent Loop](https://docs.openclaw.ai/concepts/agent-loop) — how the AI thinks
- [Configuration](https://docs.openclaw.ai/gateway/configuration-reference) — every setting
- [ClawHub](https://github.com/openclaw/clawhub) — community skills & plugins
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)

### OpenRouter
- [Quickstart](https://openrouter.ai/docs/quickstart) — get your API key
- [API Reference](https://openrouter.ai/docs/api/reference/overview) — full API docs
- [All Models](https://openrouter.ai/models) — browse 400+ models
- [Video Generation](https://openrouter.ai/docs/guides/overview/multimodal/video-generation) — how Veo works
- [Usage & Costs](https://openrouter.ai/activity) — track spending

---

## Project Structure

```
khali-mvp/
├── openclaw.json           # Agent config (port 3126, Telegram + Email)
├── .env.example            # Secrets template
│
├── skills/                 # Agent behaviors (edit these to change how the AI works)
│   ├── primer.md           # Systems thinking foundation + docs + exercises
│   ├── coach.md            # Always-on mentor with 4 learning levels
│   ├── explain-mode.md     # Deep-dive toggle for detailed breakdowns
│   ├── shorts-producer.md  # YouTube → transcript → script → video pipeline
│   ├── trend-hunter.md     # Trend discovery with Drum-Buffer-Rope pacing
│   └── daily-digest.md     # Stats + systems health check
│
├── plugins/                # Tools (the code the AI calls)
│   ├── youtube-extractor/  # Transcript extraction + trend scanning
│   ├── video-generator/    # Veo 3.1 Lite video generation
│   └── trend-scout/        # Google Trends + YouTube RSS monitoring
│
├── downloads/              # Generated videos land here
└── services/agents/        # Legacy FastAPI prototype
```

---

## License

MIT

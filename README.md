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

### Step 5: Assignment 001 — Close the Loop (Week 2-3)

Your first real assignment: **connect Gmail to close the feedback loop.**

Right now the system is an open loop — it makes shorts but never hears back. Did people comment? Did the algorithm pick it up? You're flying blind. That's the most dangerous thing in systems thinking (Meadows).

Type **`assignment 1`** in Telegram for the full brief. Here's the summary:

1. **Connect Gmail** to OpenClaw as a channel
2. **Route YouTube notifications** (comments, analytics, subscribers) through a Gmail filter
3. **Write your own skill** (`youtube-inbox-monitor.md`) that reads comment emails and reports back
4. **Answer 5 questions** about what your inbox means as a system — what other emails are signals? Where does the constraint move? What's the leverage point?

You can use AI to help with the technical parts. The questions are what matter — they teach you to think in systems, not just use them. See `skills/assignment-001-email-feedback-loop.md` for the full guide.

### Step 6: Change the Rules (Month 1+)

This is where the real power is. Open `skills/shorts-producer.md` in a text editor and change the hook formulas. That's **leverage point 4** (Meadows) — you just changed a rule that affects every script the system writes.

Type **`explain mode`** to see exactly what prompts the AI receives and why. Turn it off with **`explain mode off`**.

### Step 7: Go Deeper

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
| **assignment-001** | First assignment: connect Gmail as a feedback loop | "assignment 1" |

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

## Using Claude Code / Claude Desktop

This repo includes a built-in Claude agent and commands that run on **Haiku** (cheapest model) to help you learn and troubleshoot.

### Setup
1. Open this repo in Claude Code or add it to Claude Desktop
2. The `khali-guide` agent is auto-discovered from `.claude/agents/`

### Commands

| Command | What it does |
|---------|-------------|
| `/help` | Show all commands, prompts, and troubleshooting guides |
| `/primer` | Walk through the systems thinking theory interactively |
| `/assignment` | View your current assignment and track progress |
| `/status` | Check system health — plugins, config, env, downloads |
| `/debug [error]` | Paste an error message, get a diagnosis and fix |

### Prompts You Can Use

**Learning:**
- `"explain [concept]"` — plain-English explanation of any concept
- `"why did that happen"` — understand the last error or result
- `"show me an example"` — see working code for what you're building
- `"what should I do next"` — get guided next steps

**Building:**
- `"help me write a skill"` — step-by-step skill creation
- `"help me write a plugin"` — step-by-step plugin creation
- `"help me connect gmail"` — Assignment 001 walkthrough
- `"help me set up telegram"` — bot setup walkthrough

**Troubleshooting:**
- `"debug [paste error]"` — paste any error and get a fix
- `"check my plugin"` — validate plugin structure and build
- `"check my skill"` — validate skill markdown format
- `"check my env"` — verify .env has required keys
- `"why won't it start"` — diagnose OpenClaw startup issues

### Common Issues

| Problem | Fix |
|---------|-----|
| `openclaw: command not found` | Install: `curl -fsSL https://openclaw.ai/install.sh \| bash` |
| `Cannot find module 'openclaw/plugin-sdk'` | Build the plugin: `cd plugins/[name] && npm install && npm run build` |
| `401 / unauthorized` | Check `.env` has a valid `OPENROUTER_API_KEY` — get one at [openrouter.ai](https://openrouter.ai) |
| `address already in use :3126` | Another process on that port. Run `lsof -i :3126` then `kill -9 [PID]` |
| `No captions available` | Video doesn't have subtitles. Try a different video. |
| `content may have been filtered` (Veo) | Prompt hit safety filter — remove celebrity names and retry |
| `Video generation timed out` | Veo was slow. Try again, or check [OpenRouter status](https://openrouter.ai) |
| Gmail won't connect | Need an [App Password](https://myaccount.google.com/apppasswords), not your regular password. 2FA required. |
| Bot not responding on Telegram | Check `TELEGRAM_BOT_TOKEN` in `.env`. Make sure no other instance is using the same bot. |

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

## Built With the Framework From "From Prompts to Pipelines"

This system uses the same four concepts taught in the book:

| Concept | Where You See It in Khali |
|---------|--------------------------|
| **Instruction** | The skill files. `shorts-producer.md` tells the system exactly how to write scripts, what hooks to use, what format to follow. |
| **Memory** | Your trend scores, production stats, and content library persist between sessions. The system remembers what worked. |
| **Control** | The coach checks your output. The approval step prevents bad scripts from becoming bad videos. The trend scorer rejects low-potential topics. |
| **Flow** | YouTube link in, video out. Five stages, each feeding the next. Remove one and the pipeline breaks. |

**Want to go deeper?** Read the free chapter: [Why That Worked (And Why Most AI Doesn't)](https://github.com/ciscoittech/prompts-to-pipelines-openclaw/blob/main/book/chapters/ch02-v4-draft.md). It teaches you the diagnostic framework you can use on Khali or any AI system.

**Want to build your own?** [From Prompts to Pipelines](https://github.com/ciscoittech/prompts-to-pipelines-openclaw) teaches you to build three complete systems from scratch using OpenClaw, each more complex than the last. Khali uses the same patterns.

---

## License

MIT

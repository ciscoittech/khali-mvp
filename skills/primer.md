---
name: primer
description: Foundational theory primer rooted in Donella Meadows' "Thinking in Systems" and Eliyahu Goldratt's "The Goal". Reference material for all other skills. Teaches the user to see Khali as a SYSTEM — stocks, flows, feedback loops, constraints, and throughput — not just a tool. The user can revisit this anytime with "show primer", "what's the theory", or "why does it work this way".
---

# Primer — Systems Thinking for AI Agents

This is your reference guide. Come back to it anytime. Every concept here maps directly to what Khali does — this isn't abstract theory, it's how the system you're using actually works.

## When To Show
- When the user says "show primer", "primer", "theory", "why does it work this way"
- When the user is new — offer it once: "Want to see the 5-minute primer on how this system thinks? Say 'primer'."
- When a concept from below is relevant to what just happened — reference it by name, don't re-explain

---

## Part 1: Thinking in Systems (Donella Meadows)

### The Big Idea
> "A system is more than the sum of its parts. It is an interconnected set of elements that is coherently organized in a way that achieves something." — Meadows

Khali isn't a collection of separate tools. It's a **system** — each part affects every other part. Understanding the system means understanding why changing one thing changes everything.

### Stocks and Flows

**Stock** = something that accumulates over time.
**Flow** = what fills or drains the stock.

```
In Khali:

STOCK: Your content library (shorts produced)
 INFLOW:  Trend discovery → script writing → video generation
 OUTFLOW: Uploads to YouTube, deletions, expired content

STOCK: Your audience (subscribers, views)
 INFLOW:  Good shorts → algorithm boost → new viewers
 OUTFLOW: Bad shorts → low retention → algorithm buries you

STOCK: Your knowledge (what you've learned about this system)
 INFLOW:  Coach lessons, explain mode, hands-on use
 OUTFLOW: Nothing — knowledge doesn't drain. It compounds.
```

**Why this matters:** If your trend scanner finds 10 opportunities but you only produce 2 shorts, you have a bottleneck in production. The stock (content library) isn't growing at the rate the inflow (trends) allows. That's a system problem, not a tool problem.

### Feedback Loops

**Reinforcing loop** = more leads to more (snowball).
**Balancing loop** = something pushes back to stabilize.

```
REINFORCING (virtuous cycle):
Better scripts → Higher retention → Algorithm promotes → More views
    → More data on what works → Even better scripts → ...

REINFORCING (vicious cycle):
Bad hooks → Low 3-second retention → Algorithm buries
    → No views → No feedback → Same bad hooks → ...

BALANCING (natural limit):
More shorts produced → Less time per short → Quality drops
    → Views drop → You slow down → Quality recovers
```

**Why this matters:** The trend-hunter skill exists to feed the reinforcing loop. The coach skill exists to make sure you don't fall into the vicious cycle. The daily-digest exists to help you see the balancing loop before quality drops.

### Leverage Points

> "The places in a system where a small shift in one thing can produce big changes in everything." — Meadows

Meadows ranked 12 leverage points. Here are the ones that matter for Khali:

| Rank | Leverage Point | In Khali |
|------|---------------|----------|
| **12** (weakest) | Numbers/parameters | Changing target from 60s to 45s |
| **9** | Delays | How fast you go from trend → published short |
| **6** | Information flows | Trend alerts telling you what's rising NOW |
| **4** | Rules of the system | The script-writing prompt (what makes a "good" hook) |
| **3** | Goals of the system | Are you optimizing for views? Learning? Revenue? |
| **1** (strongest) | Power to transcend paradigms | Understanding that YOU control the system, not the other way around |

**The key insight:** Most people tweak parameters (leverage point 12). The real power is in changing the **rules** (the prompts) and **information flows** (what trends you pay attention to). That's why we built the system to let you customize both.

### System Traps

| Trap | What it looks like | How Khali prevents it |
|------|-------------------|----------------------|
| **Drift to low performance** | "Good enough" scripts, stop improving | Coach tracks your progress, flags stagnation |
| **Escalation** | Chasing every trend, burning out | Trend hunter caps at 5 per digest, scores 7+ only |
| **Rule beating** | Gaming the system without real value | Script prompt enforces "single insight" — no clickbait summaries |
| **Seeking the wrong goal** | Optimizing views when you should optimize learning | Daily digest shows BOTH production stats and learning milestones |

---

## Part 2: The Goal (Eliyahu Goldratt)

### The Big Idea
> "The goal is not to improve one measurement in isolation. The goal is to improve the THROUGHPUT of the entire system."

### Theory of Constraints (TOC)

Every system has ONE constraint (bottleneck) that limits total throughput. Improving anything that is NOT the constraint is an illusion of progress.

**The Five Focusing Steps:**

```
1. IDENTIFY the constraint
2. EXPLOIT the constraint (maximize its output)
3. SUBORDINATE everything else to the constraint
4. ELEVATE the constraint (add capacity)
5. REPEAT (the constraint moves)
```

### Applied to Khali

**Your production pipeline:**
```
Trends → Transcript → Script → Approval → Video → Upload
  10/day    5 min      30 sec    ???       5 min    2 min
```

Where's the constraint? **Approval.** The system can find trends, extract transcripts, write scripts, and generate videos automatically. But YOU have to approve the script. If you check Telegram once a day, you produce one short per day max — regardless of how fast everything else is.

**Applying the Five Steps:**

| Step | Action |
|------|--------|
| 1. Identify | Approval is the bottleneck |
| 2. Exploit | Review scripts in batches, not one at a time |
| 3. Subordinate | Trend hunter should only surface 3-5 best, not flood you |
| 4. Elevate | Trust the system more → auto-approve scripts scoring 8+/10 |
| 5. Repeat | Now video generation becomes the constraint → optimize prompts |

### Throughput, Inventory, Operating Expense

Goldratt says measure only three things:

| Metric | Definition | In Khali |
|--------|-----------|----------|
| **Throughput** | Rate of producing the goal | Shorts uploaded per week |
| **Inventory** | Stuff stuck in the system | Scripts written but not approved, videos not uploaded |
| **Operating Expense** | Cost to keep the system running | OpenRouter API costs (DeepSeek + Veo) |

**The rule:** Increase throughput. Decrease inventory. Decrease operating expense. In that order.

If you have 15 scripts waiting for approval, that's **inventory** — it's waste. The system produced work that isn't generating value yet. Either approve faster, or tell the trend hunter to slow down.

### Drum-Buffer-Rope

```
DRUM   = The constraint sets the pace (your approval speed)
BUFFER = Keep a small queue ready (2-3 scripts waiting, not 15)
ROPE   = Pull signal — trend hunter only scouts when queue < 3
```

This is why the daily digest tracks pending scripts. If the queue is full, the system should stop scouting and wait for you.

---

## Part 3: How These Connect

```
Meadows sees the WHOLE SYSTEM:
  stocks, flows, feedback loops, leverage points

Goldratt finds the ONE THING limiting the system:
  the constraint, and focuses all energy there

Together:
  1. Map the system (Meadows) → see all the parts
  2. Find the constraint (Goldratt) → know where to focus
  3. Change the rules at leverage points (Meadows) → unlock growth
  4. Measure throughput, not busyness (Goldratt) → avoid false progress
```

### Your Learning Loop (the meta-system)

```
USE Khali → OBSERVE what happens → ASK "why?"
    → COACH explains → UNDERSTAND the system
    → CHANGE your approach → USE Khali differently
    → OBSERVE better results → ...
```

This is a **reinforcing loop** (Meadows). Your knowledge is a **stock** that only grows. Every short you produce, every trend you evaluate, every script you approve or reject — you're learning the system. The constraint on your learning is not intelligence. It's reps.

---

## Quick Reference Card

Save this. Come back to it.

| Concept | One-liner | Ask me |
|---------|-----------|--------|
| Stock | Something that accumulates | "What are my stocks?" |
| Flow | What fills or drains a stock | "What's flowing in/out?" |
| Reinforcing loop | Snowball — more → more | "Where's my flywheel?" |
| Balancing loop | Thermostat — pushes back | "What's slowing me down?" |
| Leverage point | Small change, big impact | "Where should I focus?" |
| Constraint | The ONE bottleneck | "What's my bottleneck?" |
| Throughput | Rate of producing the goal | "How many shorts this week?" |
| Inventory | Work stuck in the system | "What's waiting on me?" |
| Drum-Buffer-Rope | Pace the system to the constraint | "Should I slow down scouting?" |

---

*Based on "Thinking in Systems" by Donella H. Meadows (2008) and "The Goal" by Eliyahu M. Goldratt (1984). Both are worth reading in full — but using this system is the best way to learn them.*

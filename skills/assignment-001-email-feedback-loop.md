---
name: assignment-001-email-feedback-loop
description: First hands-on assignment. The user must connect Gmail as a feedback loop — YouTube notifications, comments, analytics summaries — into Khali. Teaches channel configuration, information flows (Meadows), and asks the user to think about what OTHER data in their inbox could feed the system.
---

# Assignment 001: Build Your Email Feedback Loop

**Status:** Not started
**Difficulty:** Intermediate
**Time:** 2-4 hours (take your time — thinking matters more than speed)
**Tools you can use:** AI assistants, OpenClaw docs, Google, this guide

---

## The Mission

Right now, Khali has an **open loop**. It creates shorts and sends them into the world — but it never hears back. Did the short get views? Did people comment? What did they say? The system is flying blind.

Your job: **close the loop by connecting your Gmail.**

YouTube sends you emails — comment notifications, analytics summaries, subscriber milestones, copyright alerts. Right now those emails sit in your inbox unread. After this assignment, they become **inflow** to Khali's intelligence.

---

## Why This Matters (Systems Thinking)

Go back to the primer (`primer`) and look at the feedback loops section.

Right now your system looks like this:
```
Trends → Script → Video → Upload → ... silence ...
```

That's an **open loop** — the most dangerous thing in systems thinking (Meadows, Chapter 1). Without feedback, you can't tell if your scripts are working. You'll drift to low performance without knowing it (System Trap #1).

After this assignment:
```
Trends → Script → Video → Upload → YouTube → Comments/Analytics
    ↑                                              ↓
    └──────────── Gmail ← ─── Feedback ←──────────┘
```

Now it's a **closed loop**. The system learns from its own output. That's how reinforcing loops actually work — they need a signal back.

---

## Part 1: Connect Gmail to OpenClaw

### What to do:

1. **Read the OpenClaw channels documentation:** [docs.openclaw.ai/channels](https://docs.openclaw.ai/channels)

2. **Find the email channel configuration.** Look at how `openclaw.json` already has an email channel stubbed out. You need to make it work with your Gmail.

3. **Set up a Gmail App Password** (not your regular password):
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - You'll need 2FA enabled on your Google account first
   - Generate an app password for "Mail"
   - Put it in your `.env` file

4. **Update `openclaw.json`** with your Gmail credentials (IMAP + SMTP)

5. **Test it:** Send yourself an email and verify OpenClaw receives it

### Resources:
- [OpenClaw Channel Configuration](https://docs.openclaw.ai/gateway/config-channels)
- [Configuration Examples](https://docs.openclaw.ai/gateway/configuration-examples)
- [Channel Troubleshooting](https://docs.openclaw.ai/channels/troubleshooting)

### Deliverable:
OpenClaw can read your Gmail inbox. You can verify by asking Khali: "Do I have any new emails?"

---

## Part 2: Route YouTube Notifications Into the System

### What to do:

1. **Make sure YouTube email notifications are ON** in your YouTube settings:
   - Go to [youtube.com/account_notifications](https://www.youtube.com/account_notifications)
   - Enable: Comments on your videos, New subscribers, Channel activity, Performance updates

2. **Create a Gmail filter** that labels all YouTube notification emails:
   - From: `noreply@youtube.com`
   - Label: `khali/youtube`
   - This keeps them organized and easy for the agent to find

3. **Write a skill** (yes, you're writing one!) called `youtube-inbox-monitor.md` in the `skills/` folder. This skill should tell the agent:
   - When to check: every time you say "check comments" or on a schedule
   - What to look for: comment notifications, analytics summaries, subscriber alerts
   - What to do with it: summarize the feedback and connect it to which short it came from
   - How to report it: brief summary in Telegram

### Hint:
Look at how `daily-digest.md` is structured. Your new skill follows the same pattern — frontmatter at the top, instructions in markdown. Read [Creating Skills](https://docs.openclaw.ai/tools/creating-skills) for the full guide.

### Deliverable:
A working `skills/youtube-inbox-monitor.md` that you wrote yourself. When you say "check comments," Khali reads your YouTube notification emails and tells you what people are saying about your shorts.

---

## Part 3: Think Bigger (This Is the Real Assignment)

Your Gmail doesn't just have YouTube notifications. It has EVERYTHING.

**Stop and think about this before reading further.**

Your inbox is a massive, untapped **stock** of information (Meadows). Every email is a **signal**. Most people treat their inbox as a to-do list. You're going to treat it as a **sensor array** for your system.

### Questions to answer (write your answers down — seriously):

**Question 1: What other emails could feed your content system?**
Think about what lands in your inbox that could tell you what to make shorts about:
- Newsletters you subscribe to — are they early signals for trends?
- Google Alerts — could you set up alerts for your niches?
- Social media notifications — what are people engaging with?
- What else? What do YOU get that nobody else does?

**Question 2: How would you score the value of different email sources?**
Not all emails are equal. Goldratt would ask: which email gives you the highest **throughput** per minute spent reading it?
- A YouTube comment telling you "this changed my perspective" — what's that worth?
- A newsletter mentioning a topic before it trends — what's that worth?
- A spam email — what's that worth?
- How would you build a scoring system? (Hint: look at how `trend-hunter.md` scores videos)

**Question 3: What feedback loops could you create that don't exist yet?**
Right now: YouTube comments → Gmail → Khali → better scripts. That's one loop. What else?
- Could reading comments change which NICHES you scan for trends?
- Could analytics emails automatically adjust your posting schedule?
- Could subscriber milestone emails trigger a celebration short?
- What loop would YOU build that I haven't thought of?

**Question 4: Where's the new constraint?**
After you add email as an inflow, the system gets MORE information. Remember Goldratt's rule: when you fix one constraint, the constraint MOVES.
- If Khali is now reading your emails AND scanning trends AND taking YouTube links — where does the bottleneck shift?
- Is it still your approval speed?
- Or is it something new?
- How would you know? (Hint: check the daily digest's Systems Health section)

**Question 5: What's the leverage point?**
Meadows says leverage point 6 is **information flows** — adding new information to a system that didn't have it before.
- You're about to add a massive information flow (email → system)
- That's more powerful than changing a number (leverage point 12)
- But what would be even MORE powerful? (Hint: leverage points 4, 3, and 1 are above 6)
- What RULE would you change based on the new information?

---

## Grading Yourself

When you're done, you should have:

| Checkpoint | Done? |
|-----------|-------|
| Gmail connected to OpenClaw | ☐ |
| YouTube notifications flowing in | ☐ |
| Gmail filter labeling YouTube emails | ☐ |
| `youtube-inbox-monitor.md` skill written by you | ☐ |
| Tested "check comments" and got a response | ☐ |
| Answered all 5 questions (written, not just thought about) | ☐ |

**Bonus challenges** (if you want to go further):
- Set up a [cron job](https://docs.openclaw.ai/automation/cron-jobs) to auto-check comments every 4 hours
- Add a Google Alert for one of your niches and route it through Gmail → Khali
- Modify `daily-digest.md` to include a "Comment Highlights" section from the email data
- Write a new skill that changes trend-hunter niches based on what comments say

---

## Remember

- **You can use AI to help you.** Ask Khali, ask ChatGPT, ask Claude. The point isn't to struggle alone — it's to understand what you're building and why.
- **The questions matter more than the code.** Anyone can connect Gmail. Thinking about what your inbox means as a SYSTEM — that's the skill that compounds.
- **There's no wrong answer to the questions.** Your inbox is different from everyone else's. The feedback loops you build will be unique to you.
- **Say `primer` anytime** to revisit the theory. Say `explain mode` to see what's happening under the hood while you build.

When you're done, tell Khali: **"assignment 1 complete"** — and share what you learned.

---

*"The most important leverage points are the ones that change the information flows of a system." — Donella Meadows, Thinking in Systems*

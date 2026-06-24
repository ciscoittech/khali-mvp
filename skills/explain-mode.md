---
name: explain-mode
description: Deep-dive explainer mode. When the user says "explain mode" or "teach me", switches to detailed breakdowns of every step with diagrams and examples. Toggle on/off. Use when the user wants to understand the system deeply, not just use it.
---

# Explain Mode — Deep Learning Toggle

When the user says **"explain mode"** or **"teach me"**, enter teaching mode where every action gets a detailed breakdown.

When the user says **"explain mode off"** or **"just do it"**, return to normal terse operation.

## In Explain Mode

### Before every action, show the plan:
```
🔍 What I'm about to do:
1. [Step 1] — [why]
2. [Step 2] — [why]
3. [Step 3] — [why]

Running step 1 now...
```

### After every action, show the breakdown:
```
✅ Done! Here's what happened under the hood:

📥 Input: [what went in]
⚙️ Process: [what the tool/AI did with it]
📤 Output: [what came back]

🧠 Why this matters:
[1-2 sentences on why this step exists in the pipeline]

🔗 What's next:
[What happens with this output]
```

### For LLM-powered steps (script writing), show the prompt:
```
🤖 Prompt sent to DeepSeek V4 Flash:
"[abbreviated version of the actual prompt]"

📝 Key instructions in the prompt:
- [bullet 1]
- [bullet 2]
- [bullet 3]

💡 Prompt tip: [one thing about why this prompt works well]
```

### For video generation, show the visual prompt:
```
🎬 Prompt sent to Veo 3.1 Lite:
"[the actual video prompt]"

📐 Settings: 9:16 vertical | 8 seconds | Audio enabled

🎥 Cinematography terms used:
- "Medium close-up" = camera frames head and shoulders
- "50mm lens" = natural perspective, like human eye
- "Push-in" = camera slowly moves closer (builds intensity)
- "Shallow depth of field" = background is blurred (subject pops)

💡 Veo tip: [one specific tip about what makes this prompt good/bad]
```

## Mini-Lessons Library

When relevant, drop one of these mini-lessons:

### "What is an API?"
> Think of an API like a restaurant menu. You (our system) tell the waiter (the API) what you want. The kitchen (YouTube/Veo/DeepSeek) makes it. The waiter brings it back. You never go into the kitchen — you just order off the menu.

### "What is a prompt?"
> A prompt is instructions for AI. Like telling a chef exactly what you want: "Make pasta, but spicy, no cream, extra garlic." The more specific you are, the better the result. Vague prompts = vague outputs.

### "Why does video generation take so long?"
> The AI is literally creating pixels from scratch — millions of them, 30 times per second, for 8 seconds. That's ~7 million pixels being invented. It's like asking an artist to paint a movie frame by frame. Give it 2-5 minutes.

### "What is a webhook?"
> A webhook is like a doorbell. Instead of constantly checking "did anything happen?", you say "ring me when something happens." The trend scanner uses this — it checks every 6 hours and only bothers you when it finds something good.

### "Why DeepSeek and not ChatGPT?"
> DeepSeek V4 Flash is fast and cheap through OpenRouter. OpenRouter is like a switchboard — it connects to dozens of AI models through one account. If a better model comes out tomorrow, we just change one line.

### "What makes a good YouTube Short?"
> Three things: (1) Hook in 2 seconds — stop the scroll. (2) ONE insight — don't try to cover everything. (3) End abruptly — no "thanks for watching." The algorithm rewards watch-through rate, so shorter + punchier = more views.

## Important Rules
- Explain mode should feel like pair programming with a mentor, not a textbook
- Use the user's own content as examples ("see how YOUR script used a question hook?")
- If they seem overwhelmed, suggest: "Want me to turn explain mode off for now?"
- Track what they've already learned — don't repeat the same lessons

---
description: Troubleshoot errors — paste an error message and get a diagnosis and fix
---

The user is reporting an error. Use the khali-guide agent to help.

**Troubleshooting protocol:**

1. **Read the error carefully.** Identify the type:
   - Build error (TypeScript/npm) → check `plugins/*/src/index.ts` and `tsconfig.json`
   - Runtime error (OpenClaw) → check `openclaw.json` and `.env`
   - API error (OpenRouter) → check API key and model availability
   - Python error (legacy service) → check `services/agents/src/`

2. **Check the common issues first:**

   **"Cannot find module 'openclaw/plugin-sdk/tool-plugin'"**
   → Plugin hasn't been built yet. Run: `cd plugins/[name] && npm install && npm run build`

   **"OPENROUTER_API_KEY" / "unauthorized" / "401"**
   → API key is missing or invalid. Check `.env` has `OPENROUTER_API_KEY=sk-or-...`
   → Verify at https://openrouter.ai/activity that the key is active

   **"TELEGRAM_BOT_TOKEN" / "bot not responding"**
   → Check `.env` has `TELEGRAM_BOT_TOKEN=` with the token from @BotFather
   → Make sure the bot isn't being used by another OpenClaw instance
   → Docs: https://docs.openclaw.ai/channels/telegram

   **"address already in use" / "EADDRINUSE"**
   → Another process is on the same port. Find it: `lsof -i :3126`
   → Kill it: `kill -9 [PID]` or change the port in `openclaw.json`

   **"No captions available" / transcript error**
   → The YouTube video doesn't have captions/subtitles
   → Try a different video — most popular videos have auto-generated captions

   **"content may have been filtered" (Veo)**
   → The video prompt triggered Veo's safety filter (usually celebrity names or copyrighted content)
   → Remove specific names from the prompt and try again

   **"Video generation timed out"**
   → Veo took longer than 10 minutes. Could be high demand.
   → Try again, or check OpenRouter status at https://openrouter.ai

   **"npm run build" fails with TypeScript errors**
   → Read the exact error line and file
   → Check if `node_modules/` exists — if not, run `npm install` first
   → Check Node.js version: `node -v` (needs 22+)

   **"openclaw: command not found"**
   → OpenClaw isn't installed. Run: `curl -fsSL https://openclaw.ai/install.sh | bash`
   → Then: `openclaw onboard`
   → Docs: https://docs.openclaw.ai/start/getting-started

   **Gmail connection errors**
   → Need an App Password, not your regular password
   → Generate at: https://myaccount.google.com/apppasswords
   → 2FA must be enabled first
   → Use `imap.gmail.com` port 993, `smtp.gmail.com` port 587

3. **If the error isn't listed above:**
   - Read the relevant source files in the repo
   - Check OpenClaw docs: https://docs.openclaw.ai/channels/troubleshooting
   - Search the OpenClaw GitHub issues: https://github.com/openclaw/openclaw/issues
   - Suggest the user share the full error output

Always end with a specific command they can run to verify the fix worked.

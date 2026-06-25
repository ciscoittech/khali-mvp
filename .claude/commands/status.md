---
description: Check Khali system status — plugins, config, downloads, and system health
---

Check the current state of the Khali system:

1. **Config**: Read `openclaw.json` and verify channels and plugins are configured
2. **Plugins**: Check if `plugins/*/dist/` directories exist (built) or are empty (need building)
3. **Environment**: Check if `.env` exists and has the required keys (don't show the actual values)
4. **Downloads**: Count files in `downloads/` directory
5. **Skills**: List all skills in `skills/` with a one-line description of each

Report in this format:
```
System Status:
- Config: ✅/❌ (channels, model, port)
- Plugins: ✅/❌ (which are built, which need building)
- Environment: ✅/❌ (which keys are set, which are missing)
- Downloads: X videos
- Skills: X loaded
```

If anything is broken, suggest the fix.

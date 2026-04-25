---
description: Run full token audit — box-shadows, hardcoded colors, drift, naming conventions
allowed-tools: Bash, Read, Grep
---

Run the token audit and interpret every finding:

```bash
node scripts/audit-tokens.js
```

For each issue in the output:

**Box-shadow errors** — Point to the exact line and show the CLAUDE.md Section 9 fix:

- Card/button hover: use `border-color` change + `transform: translateY(-2px)`
- Depth on dark bg: use `border: 1px solid rgba(255,255,255,0.15)`
- Modal prominence: use `backdrop-filter: blur()` + thin border
- SVG icons: `filter: drop-shadow()` is allowed

**Hardcoded color warnings** — Show the exact `var(--tok-*)` replacement inline in the file.

**Unused token warnings** — Before marking as "dead", check:

1. `Grep("var(--tok-xxx)", "**/*.js")` — might be used in JS design-system
2. If genuinely unused, ask whether to remove the token or whether it's planned

**Naming convention warnings** — Suggest the correct `--tok-<category>[-variant]` name following CLAUDE.md Section 7 tiers.

End with a summary of what was fixed and what still needs attention.

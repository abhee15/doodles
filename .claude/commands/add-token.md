---
description: Add a new design token to shared/tokens.css following Doodles naming conventions
allowed-tools: Read, Edit, Bash, Grep
---

Add a new design token. Request: $ARGUMENTS

Steps:

1. **Read `shared/tokens.css`** to see the existing structure and all current token names.

2. **Determine the section** the new token belongs in:
   - New hue → PRIMITIVE COLORS (add base + `-dark` variant; `-light` if needed)
   - New gray shade → NEUTRAL COLORS (`--tok-gray-N` on the 50/100/200/400/500/700/800/900 scale)
   - New semantic role → SEMANTIC ALIASES (references an existing primitive via `var()`)
   - New spacing step → SPACING (`--tok-space-N` where N × 4 = pixel value)
   - New corner → BORDER RADIUS (`--tok-radius-sm/md/lg/xl/2xl/pill`)
   - New speed → TRANSITIONS (`--tok-transition-fast/normal/slow`)

3. **Verify no duplicate** with `Grep("--tok-<candidate-name>", "shared/tokens.css")`.

4. **Add the token** in the correct section, immediately after the closest related token. Keep the section comment header intact.

5. **Run the audit** to confirm the addition is clean:

   ```bash
   node scripts/audit-tokens.js
   ```

   If the new token triggers a "non-standard name" warning, update `VALID_TOKEN_PATTERNS` in `scripts/audit-tokens.js`.

6. **Report** what was added, which section it's in, and an example usage:
   `color: var(--tok-<name>)` or `background: var(--tok-<name>)`.

Naming rules (from CLAUDE.md §7):

- `--tok-*` — primitives, never overridden per game
- `--dom-*` — DOM game overrides (go in the game's `<style>` block, not tokens.css)
- `--game-bg-*` — Phaser game backgrounds (game's own `<style>` block)

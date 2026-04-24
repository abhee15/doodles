# Doodles — Design & Color Guidelines for AI Agents

> Read this before generating any game cards, CSS variables, or portal changes.
> Full conventions are in CLAUDE.md. This file covers visual design specifics.

---

## Color Rules (Non-Negotiable)

### NEVER use these as primary/dominant colors

- **Purple/Violet/Indigo**: `#6366f1`, `#4f46e5`, `#7c3aed`, `#6d28d9`, `#5b21b6`, `#4c1d95`, `#7e22ce`, `#6b21a8`, `#a21caf`, `#9333ea` and similar.
  - Why: These are the LLM-default colors and look generic. They have been systematically removed from this codebase.
  - Exception: Individual game cards for "space" or "galaxy" themes may use very dark purple as a DARK BASE only (not the accent/endpoint color).
- **Yellow backgrounds**: Do not use yellow (`#f59e0b`, `#fde047`, etc.) as a background color.
  - Yellow as a small accent on a dark background is fine (e.g., star icons, spectrum labels).

### Brand & System Colors

- Portal brand: `#0284c7` (sky blue), dark: `#0369a1`
- Portal hero gradient: ocean blue `#1e3a5f → #0891b2 → #06b6d4`
- Portal background: `#f4f6fb`
- DOM game default nav: `#1e3a5f` (deep navy) — always overridden per game

### Category Color Map

| Category | Color                   | Do NOT use         |
| -------- | ----------------------- | ------------------ |
| math     | `#bf360c` (red-orange)  | purple             |
| memory   | `#ea580c` (deep orange) | purple             |
| geo      | `#0277bd` (blue)        | —                  |
| words    | `#0891b2` (teal)        | purple             |
| science  | `#059669` (green)       | —                  |
| art      | `#db2777` (pink)        | purple in gradient |
| logic    | `#1d4ed8` (deep blue)   | purple             |
| money    | `#065f46` (dark green)  | —                  |
| play     | `#e11d48` (rose)        | purple, yellow     |

---

## Game Card Gradients

Each game should have a gradient that reflects its **subject matter**:

- Math games: deep blues, teals, greens, reds/crimsons
- Words games: teal, ocean blue, rose/pink
- Science games: green, orange/amber, electric blue, forest
- Memory games: warm oranges, deep navy
- Geo games: ocean blue, earth greens
- Art games: vibrant pinks, coral, rose
- Logic games: deep navy/blue (analytical feel)
- Play games: warm coral, rose, sky blue

Pattern overlay colors should use the same hue family as the gradient (low opacity `rgba(R,G,B,.07)` stripes/dots).

---

## Depth & Shadows

**Zero `box-shadow` anywhere.** This is enforced via `npm run audit`.

Use instead:

- `border-color` change on hover
- `transform: translateY(-2px)` on hover
- `backdrop-filter: blur()` for modals
- `filter: drop-shadow()` only for SVG icons (not cards/buttons)

---

## Typography

- Font: **Nunito** (rounded, friendly, Duolingo-style)
- Minimum body text: 16px
- Minimum label text: 14px
- Touch targets: 44×44px minimum

---

## Dark-Themed DOM Games

When a game sets `--dom-bg` to a dark color (< `#333333` luminance), you MUST also set:

```css
--dom-text: rgba(255, 255, 255, 0.95);
--dom-text-muted: rgba(255, 255, 255, 0.62);
```

Failing to do this causes dark text on a dark background — illegible.

---

## Quick Checklist for New Games

- [ ] Hero gradient is subject-appropriate (no purple as primary)
- [ ] Dark background? Add `--dom-text` white override
- [ ] No `box-shadow` in CSS
- [ ] No yellow backgrounds
- [ ] Pattern color matches gradient hue family
- [ ] `iconColor` in manifest contrasts well on the gradient

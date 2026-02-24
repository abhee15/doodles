# Design System Compliance Guide

This guide explains how to maintain design system compliance when adding or modifying games.

---

## Quick Reference

### Run the Linter

```bash
# Check design system compliance
npm run lint:design

# All validations (ESLint + Prettier + Design System)
npm run validate

# In pre-commit hook (automatic)
git commit -m "Add new game"
# → lint:design runs automatically
```

### What Gets Checked?

```
✓ No box-shadow properties
✓ No inline scripts in HTML
✓ Correct Tabler Icons version (@3)
✓ Canonical links present
✓ Back-link navigation correct
✓ CSS files are mutually exclusive
✓ Only standard design files
✓ Required meta tags
✓ Shared files referenced correctly
```

---

## Common Violations & Fixes

### ❌ ERROR: `box-shadow` detected

**Problem:**
```css
.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

**Solution:** Use `transform` + `border` instead:
```css
.card {
  border: 1px solid var(--tok-border);
  transition: transform 0.2s, border-color 0.2s;
}
.card:hover {
  border-color: var(--tok-primary);
  transform: translateY(-2px);
}
```

---

### ❌ ERROR: Inline scripts detected

**Problem:**
```html
<script>
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => { ... });
</script>
```

**Solution:** Move to `game.js`:
```javascript
// In game.js
function initializeButton() {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => { ... });
}

// Call when game loads
window.addEventListener('DOMContentLoaded', initializeButton);
```

---

### ❌ ERROR: Tabler Icons not pinned

**Problem:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.css">
```

**Solution:** Pin to major version:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css">
```

---

### ❌ ERROR: Missing back-link

**Archetype A (Canvas/Phaser):**
```html
<a href="../../index.html#game-id" class="back-link">← Back</a>
```

**Archetype B (DOM):**
```html
<nav class="dom-nav">
  <a href="../../index.html#game-id"><i class="ti ti-arrow-left"></i> Back</a>
  <span class="dom-nav-title">Game Name</span>
</nav>
```

---

### ❌ ERROR: Mutually exclusive CSS

**Problem:**
```html
<link rel="stylesheet" href="../../shared/game-page-v2.css">
<link rel="stylesheet" href="../../shared/game-dom.css">
```

**Solution:** Choose ONE:
- Canvas/Phaser games → `game-page-v2.css`
- DOM games → `tokens.css` + `game-dom.css`

---

### ⚠️ WARN: Non-standard design files

**Problem:**
```html
<link rel="stylesheet" href="../../shared/design-colors.css">
```

**Solution:** Remove it. Use standard files:
- `shared/tokens.css` (design token primitives)
- `shared/design-system.js` (Phaser color system)
- Game-specific `<style>` block (DOM games)

---

### ⚠️ WARN: Missing canonical link

**Problem:** No `<link rel="canonical">` in `<head>`

**Solution:** Add to all games:
```html
<link rel="canonical" href="https://abhee15.github.io/doodles/games/game-id/">
```

---

## Creating a New Game (Checklist)

Use the template: `games/_TEMPLATE/`

1. **Copy template:**
   ```bash
   cp -r games/_TEMPLATE games/my-game
   ```

2. **Fill in basics:**
   - Game folder name (kebab-case)
   - Unique game ID
   - Meta tags and title
   - Choose archetype (Canvas or DOM)

3. **Before committing, run:**
   ```bash
   npm run lint:design
   ```

4. **Fix any errors:**
   - No box-shadow
   - No inline scripts
   - Back-link present
   - Canonical link present
   - Correct CSS files

5. **Verify:**
   ```bash
   npm run validate
   ```

6. **Commit:**
   ```bash
   git add .
   git commit -m "Add: My Game - game description"
   ```

---

## Design System Tokens

### Color Variables (Primitives)

```css
:root {
  --tok-blue: #1CB0F6;
  --tok-green: #4CAF50;
  --tok-red: #FF6B6B;
  --tok-yellow: #FFC93C;
  --tok-gray: #757575;
  --tok-white: #FFFFFF;
}
```

### Phaser Game Overrides

```css
:root {
  --game-bg-start: #A8DADA;
  --game-bg-end: #3D9E9E;
}
```

### DOM Game Overrides

```css
:root {
  --dom-nav-bg: #0A2424;
  --dom-accent: #F5C518;
  --dom-bg: #0D1B2A;
  --dom-border: rgba(255, 255, 255, 0.12);
}
```

---

## Testing Your Game

Before pushing:

```bash
# 1. Check design system compliance
npm run lint:design

# 2. Check code quality
npm run lint

# 3. Check formatting
npm run format:check

# 4. (Optional) Auto-fix formatting
npm run format

# 5. Run all checks
npm run validate
```

---

## Pre-commit Hooks

Hooks are automatically set up via Husky. They run:
- `lint:design` (design system)
- `eslint` (JS quality)
- `prettier` (formatting)

If hooks fail:
1. Fix the issues
2. Run `npm run format` to auto-fix formatting
3. Run `npm run lint` to see remaining issues
4. Commit again

To skip hooks (not recommended):
```bash
git commit --no-verify
```

---

## Reference

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Design system rules (source of truth) |
| `.github/scripts/lint-design-system.js` | Linter implementation |
| `.github/DESIGN_SYSTEM_AUDIT.md` | Current violations report |
| `shared/tokens.css` | Design token definitions |
| `shared/game-page-v2.css` | Canvas game shell |
| `shared/game-dom.css` | DOM game shell |

---

## Need Help?

1. **"My lint check is failing"** → Run `npm run lint:design` to see specific issues
2. **"I'm not sure which archetype to use"** → Look at similar games (e.g., math-ladder for Canvas, body-map for DOM)
3. **"How do I style my game?"** → Reference the tokens in `shared/tokens.css`
4. **"Can I use box-shadow?"** → No. Use the approved alternatives (transform, border, backdrop-filter)
5. **"Can I add custom CSS?"** → Yes, in `<style>` block or external CSS file. Just follow the rules.

---

## Example: Compliant Game

See: `games/math-ladder/` or `games/body-map/`

These games follow all design system rules:
- ✓ No box-shadow
- ✓ No inline scripts
- ✓ Back-link present
- ✓ Canonical link present
- ✓ Correct CSS files
- ✓ Standard meta tags

# Design System Compliance Audit

**Date:** 2026-02-23
**Status:** ⚠️ 45 Critical Errors + 9 Warnings Found
**Severity:** HIGH

---

## Summary

The design system linter (`npm run lint:design`) has identified critical violations in the following games that **must be fixed** to maintain consistency with `CLAUDE.md`.

**Critical Issues:**
- ❌ 44 `box-shadow` violations (mostly periodic-table)
- ❌ 3 inline script violations (dino-hunter, solar-system)
- ❌ 2 missing back-link violations (draw-it, periodic-table)
- ⚠️ 6 non-standard design file violations
- ⚠️ Missing canonical links and meta tags

---

## Games Requiring Fixes

### 🔴 CRITICAL PRIORITY

#### 1. **periodic-table** (40 box-shadow violations)
**File:** `games/periodic-table/css/*.css`

All instances of `box-shadow` must be replaced with approved alternatives:
- Use `border-color` changes for hover effects
- Use `transform: translateY(-Xpx)` for elevation
- Use `backdrop-filter: blur()` for modal effects
- Use `filter: drop-shadow()` for SVG elements only

**Affected CSS Files:**
- `game.css` (20 instances)
- `gamification.css` (2 instances)
- `visual-enhancements.css` (10 instances)
- `visual-simplified.css` (8 instances)

**Fix Time:** ~30 minutes

---

#### 2. **dino-hunter** (Inline scripts)
**File:** `games/dino-hunter/index.html:99-112`

**Issue:**
```html
<script>
    var grid = document.getElementById('dino-grid');
    DINOS.forEach(function(dino) {
        // ... dynamic button creation
    });
</script>
```

**Fix:** Move this logic to `game.js` and call it when the game initializes.

**Fix Time:** ~15 minutes

---

#### 3. **solar-system** (Inline scripts)
**File:** `games/solar-system/index.html:252-261`

**Issue:** Similar to dino-hunter - game initialization code in HTML instead of `game.js`

**Fix:** Move inline script to `game.js`

**Fix Time:** ~15 minutes

---

#### 4. **draw-it** (Missing back-link)
**File:** `games/draw-it/index.html`

**Issue:** Uses custom `<nav class="nav">` instead of standard `.back-link` pattern

**Fix:** Replace with:
```html
<a href="../../index.html#draw-it" class="back-link">← Back</a>
```

**Fix Time:** ~5 minutes

---

#### 5. **periodic-table** (Missing back-link + canonical link)
**File:** `games/periodic-table/index.html`

**Issues:**
- No navigation to return to portal
- Missing canonical link for SEO
- Missing `og:type` meta tag

**Fix:** Add at top of `<body>`:
```html
<a href="../../index.html#periodic-table" class="back-link">← Back</a>
```

And in `<head>`:
```html
<link rel="canonical" href="https://abhee15.github.io/doodles/games/periodic-table/">
<meta property="og:type" content="game">
```

**Fix Time:** ~10 minutes

---

### 🟡 MEDIUM PRIORITY

#### 6. **number-ninja, quick-math** (Non-standard design files)

**Issue:** Loading `shared/design-colors.css` which should not exist

**Files:**
- `games/number-ninja/index.html:29`
- `games/quick-math/index.html:34`

**Fix:** Remove the line:
```html
<link rel="stylesheet" href="../../shared/design-colors.css">
```

Use standard design tokens instead. If needed, reference:
- `shared/tokens.css` (DOM games)
- `shared/design-system.js` (Phaser games)

**Fix Time:** ~5 minutes per game

---

## How to Run the Linter

```bash
# Run design system linter
npm run lint:design

# Run all validations (ESLint + Prettier + Design System)
npm run validate
```

---

## Linter Rules

The design system linter checks for:

| Rule | Severity | Why |
|------|----------|-----|
| `box-shadow` | ERROR | Breaks flat design aesthetic, performance issues on mobile |
| Inline scripts | ERROR | Violates separation of concerns, harder to maintain |
| Missing back-link | ERROR | Breaks navigation, poor UX |
| Tabler Icons @latest | ERROR | Version drift, unexpected breaking changes |
| Mutually exclusive CSS | ERROR | Indicates confused game archetype (Canvas vs DOM) |
| Missing canonical links | WARN | SEO penalty, duplicate content issues |
| Non-standard design files | WARN | Code bloat, maintenance burden |
| Missing meta tags | WARN | SEO impact |

---

## Approved Alternatives to box-shadow

### 1. Elevation on Hover (buttons, cards)
```css
.card {
  border: 1px solid var(--tok-border);
  transition: border-color 0.2s, transform 0.2s;
}
.card:hover {
  border-color: var(--tok-primary);
  transform: translateY(-2px);
}
```

### 2. Modal Depth
```css
.modal {
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
}
```

### 3. SVG Effects (Only use filter, not box-shadow)
```css
.svg-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
```

### 4. Focus/Selection
```css
.input:focus {
  border-color: var(--tok-primary);
  outline: none;
}
```

---

## Fix Checklist

- [ ] **periodic-table**: Remove 40 box-shadow instances
- [ ] **periodic-table**: Add back-link navigation
- [ ] **periodic-table**: Add canonical link
- [ ] **periodic-table**: Add og:type meta tag
- [ ] **dino-hunter**: Move inline scripts to game.js
- [ ] **dino-hunter**: Add game-config.js reference
- [ ] **solar-system**: Move inline scripts to game.js
- [ ] **draw-it**: Replace nav with standard back-link
- [ ] **number-ninja**: Remove design-colors.css
- [ ] **quick-math**: Remove design-colors.css
- [ ] Run `npm run lint:design` - should pass with 0 errors
- [ ] Commit changes with message: "Fix: Design system compliance violations"

---

## Next Steps

1. **Today:** Fix HIGH priority items (periodic-table, dino-hunter, solar-system)
2. **This week:** Fix MEDIUM priority items (draw-it, number-ninja, quick-math)
3. **Ongoing:** Use `npm run lint:design` in pre-commit hooks to prevent future violations

---

## Resources

- **Design System:** `CLAUDE.md` (Root directory)
- **Design Tokens:** `shared/tokens.css`
- **Approved UI Components:** `shared/ui-components.js`
- **Linter:** `.github/scripts/lint-design-system.js`

---

## Contact

For questions about design system compliance, refer to:
1. `CLAUDE.md` - Source of truth
2. Existing compliant games (e.g., math-ladder, earth-explorer)
3. Run `npm run lint:design` for specific violations

# Game Consistency Audit Report
**Date:** 2026-02-24
**Tool:** `npm run audit` (Game Consistency Audit Script)

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Games Audited | 12 | ✓ |
| Critical Errors | 27 | ❌ |
| Warnings | 35 | ⚠️ |
| Pass Rate | 0% | Needs Work |

**Finding:** All 12 games have inconsistencies. Most critically, **no game has a proper back button** (`id="game-back-btn"`). This breaks the navigation standard and the promised feature of contextual back buttons.

---

## Critical Issues (27 Total)

### 1. Missing Back Button (12/12 games) ❌

**What:** Every game is missing `id="game-back-btn"` required for consistent navigation.

**Why it matters:**
- Back buttons don't go to the logical parent screen
- Kids get confused about where "back" goes
- Quick Math: back goes to portal instead of technique picker
- Draw It: back goes to portal instead of game landing

**Example of current behavior:**
```
Draw It Step 5 → [Back] → Portal ❌
(Should be: Draw It Step 5 → [Back] → Draw It Landing ✓)
```

**Fix:** Add to all game index.html files:
```html
<nav class="dom-nav">
  <a id="game-back-btn" href="../../index.html#game-id">
    <i class="ti ti-arrow-left"></i> Back
  </a>
  <span id="nav-title">Game Name</span>
</nav>
```

Then use `shared/navigation.js` to handle internal back logic.

---

### 2. Missing Proper Nav Bar (8/12 games) ❌

**Affected:** Phaser games (math-ladder, number-ninja, world-explorer, earth-explorer, solar-system, dino-hunter, word-explorer, measure-master)

**What:** Games are missing `<nav class="dom-nav">` or equivalent.

**Why it matters:** Inconsistent navigation structure makes it harder for kids to find the back button.

---

### 3. Missing data-screen Attributes (2 games) ❌

**Affected:** body-map, quick-math (DOM games)

**What:** Screen divs are missing `data-screen="screen-name"` attributes.

**Why it matters:** Makes it impossible to track which screen the user is on.

---

### 4. Inline onclick Handlers (3 games) ❌

**Affected:** body-map, draw-it, periodic-table

**What:** HTML has `onclick="functionName()"` instead of `addEventListener`.

**Why it matters:**
- Harder to track event listeners
- Bad for accessibility
- Modern best practice is addEventListener

**Example violation:**
```html
<!-- ❌ OLD -->
<button onclick="selectTechnique(1)">Technique 1</button>

<!-- ✓ NEW -->
<button class="technique-btn" data-id="1">Technique 1</button>
<script>
  document.querySelectorAll('.technique-btn').forEach(btn => {
    btn.addEventListener('click', () => selectTechnique(btn.dataset.id));
  });
</script>
```

---

### 5. Missing game.js (1 game) ❌

**Affected:** periodic-table

**What:** No game.js file found.

**Fix:** Ensure game logic is in `game.js`, not in inline `<script>` tags.

---

## Warnings (35 Total)

### Font Size Issues (6 games)

**Games with text <14px:** body-map, quick-math, draw-it, solar-system, dino-hunter

**Why it matters:** Kids may have trouble reading small text.

**Standard:** Minimum 14px for body text, 16px preferred.

---

### Button Size Issues (10 games)

**What:** Buttons may be smaller than 44×44px mobile touch target.

**Why it matters:** Kids (and adults) can't tap accurately on tiny buttons.

**Standard:**
- Desktop buttons: ≥32px height
- Mobile buttons: ≥44×44px

---

### console.log Statements (1 game)

**Game:** quick-math

**What:** Debug logging left in production code.

**Fix:** Remove before deploying.

---

### Missing README.md (12 games)

**What:** No game documentation.

**Why it matters:** Helps with maintenance and understanding game structure.

**Content should include:**
- Game description
- Navigation flow diagram
- Screens & states
- Shared components used
- Performance notes

---

## Breakdown by Game

### ✅ Passing Games (0)
None yet.

### ❌ Games with Errors (12)

| Game | Errors | Warnings | Priority |
|------|--------|----------|----------|
| body-map | 3 | 4 | HIGH |
| quick-math | 2 | 5 | HIGH |
| draw-it | 2 | 4 | HIGH |
| periodic-table | 4 | 2 | CRITICAL |
| dino-hunter | 2 | 4 | HIGH |
| earth-explorer | 2 | 3 | HIGH |
| math-ladder | 2 | 4 | HIGH |
| measure-master | 2 | 3 | HIGH |
| number-ninja | 2 | 3 | HIGH |
| solar-system | 2 | 4 | HIGH |
| word-explorer | 2 | 3 | HIGH |
| world-explorer | 2 | 3 | HIGH |

---

## Remediation Plan

### Phase 1: Fix Critical Issues (1 week)
1. Add `id="game-back-btn"` to all games
2. Add navigation handler using `shared/navigation.js`
3. Fix periodic-table (missing game.js)
4. Remove inline onclick handlers (body-map, draw-it, periodic-table)

### Phase 2: Fix High Priority Issues (2 weeks)
1. Fix font sizes (ensure ≥14px body text)
2. Fix button sizes (ensure ≥44px mobile targets)
3. Add proper nav bar to Phaser games
4. Add data-screen attributes to DOM games

### Phase 3: Polish & Documentation (1 week)
1. Add README.md to all games
2. Remove console.log statements
3. Run full audit again
4. Verify all games pass audit

---

## How to Prevent Future Issues

1. **Before committing:** Run `npm run audit`
2. **Use the framework:** Copy template from FRAMEWORK_STANDARDS.md
3. **Check the checklist:** Use Section 4 of FRAMEWORK_STANDARDS.md
4. **Use shared utilities:** `shared/navigation.js` handles back logic automatically
5. **CI/CD integration:** Consider adding audit to pre-commit hook (husky)

---

## Resources

- **Framework Standards:** [FRAMEWORK_STANDARDS.md](FRAMEWORK_STANDARDS.md)
- **Audit Tool:** `scripts/audit-games.js`
- **Run Audit:** `npm run audit`
- **Shared Nav Component:** `shared/navigation.js`
- **Design Tokens:** `shared/tokens.css`
- **Game DOM Shell:** `shared/game-dom.css`

---

## Next Steps

1. ✅ Framework standards documented (FRAMEWORK_STANDARDS.md)
2. ✅ Audit tool created (scripts/audit-games.js)
3. ✅ Shared navigation component ready (shared/navigation.js)
4. ⏳ **Fix critical issues** (in progress)
5. ⏳ Update all games to pass audit
6. ⏳ Add CI/CD integration

---

**Created by:** Framework Audit Script
**Last Updated:** 2026-02-24 12:15 UTC

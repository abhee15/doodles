# Design System Fixes - Safe Production Strategy

**⚠️ IMPORTANT:** This repo is in production. All fixes must be:
- ✓ Tested thoroughly before pushing
- ✓ Non-breaking changes only
- ✓ Individually reviewable via PR
- ✓ Backwards compatible
- ✓ Verified in multiple browsers

---

## Testing Protocol for Each Fix

Before committing ANY change:

```bash
# 1. Test locally in browser
# - Play the game fully
# - Click all buttons
# - Check styling/layout
# - Verify no console errors

# 2. Run linter
npm run lint:design

# 3. Run all validations
npm run validate

# 4. Test on multiple screens
# - Desktop (1920px)
# - Tablet (768px)
# - Mobile (375px)
# - Mobile landscape

# 5. Create separate PR for each game
# - One commit = one game fix
# - Clear commit message
# - Testing notes in PR description
```

---

## Fix Plan (By Priority)

### Priority 1: LOW RISK FIXES (Metadata/Navigation)

These are safe - only adding/changing HTML, no logic changes.

#### 1.1 Fix: periodic-table - Add back-link
**File:** `games/periodic-table/index.html`
**Risk:** Very Low (just adding a link)

```diff
<body>
+  <a href="../../index.html#periodic-table" class="back-link">← Back</a>
  <div class="app-container">
```

**Testing:**
- [ ] Back button appears in UI
- [ ] Click back button → returns to portal
- [ ] Portal game card still clickable

**Commit:** `fix: add back-link to periodic-table`

---

#### 1.2 Fix: periodic-table - Add canonical link & og:type
**File:** `games/periodic-table/index.html` (in `<head>`)
**Risk:** Very Low (metadata only)

```diff
  <link rel="canonical" href="https://abhee15.github.io/doodles/games/periodic-table/">
+
+  <!-- Open Graph / Facebook -->
+  <meta property="og:type" content="game">
+  <meta property="og:url" content="https://abhee15.github.io/doodles/games/periodic-table/">
+  <meta property="og:title" content="Periodic Table Memory Master - Learn Chemistry with Memory Techniques">
+  <meta property="og:description" content="Master the periodic table using 5 proven memory techniques: Story Chain, Memory Palace, Body Map, Keyword Image, and Rhyme Pegs. Learn elements interactively!">
```

**Testing:**
- [ ] Canonical link doesn't break page rendering
- [ ] og:type appears in page source (view > page source)
- [ ] Game plays normally

**Commit:** `fix: add canonical link and og:type to periodic-table`

---

#### 1.3 Fix: draw-it - Add back-link (if missing)
**File:** `games/draw-it/index.html`
**Risk:** Very Low

Check if back-link exists. If using custom nav, change to:
```html
<a href="../../index.html#draw-it" class="back-link">← Back</a>
```

**Testing:**
- [ ] Back button works
- [ ] Back button styling matches other games
- [ ] Page layout not broken

**Commit:** `fix: add standard back-link to draw-it`

---

#### 1.4 Fix: Remove non-standard design files
**Files:**
- `games/number-ninja/index.html` (remove design-colors.css)
- `games/quick-math/index.html` (remove design-colors.css)

**Risk:** Low-Medium (CSS removal might affect styling)

```diff
- <link rel="stylesheet" href="../../shared/design-colors.css">
```

**Testing Process:**
1. **Before removal:** Take screenshot of game page
2. **After removal:** Play game on multiple screens
3. **Compare:** Verify visual appearance is identical
4. **Check:** Open DevTools → Check no `404` errors

**What to watch for:**
- Game colors still correct? ✓
- Text legible? ✓
- Buttons styled properly? ✓
- No red errors in console? ✓

**If appearance changes:**
- DO NOT COMMIT
- Keep the line, just update linter to warn instead of error
- Investigate why game depends on non-standard file

**Commit:** `fix: remove non-standard design-colors.css reference from {game}`

---

### Priority 2: MEDIUM RISK FIXES (JS Refactoring)

These require moving code - potential for breaking bugs.

#### 2.1 Fix: dino-hunter - Move inline scripts to game.js
**Files:**
- `games/dino-hunter/index.html` (lines 99-112)
- `games/dino-hunter/game.js` (move code here)

**Risk:** Medium (logic relocation)

**Current problematic code:**
```html
<script>
    var grid = document.getElementById('dino-grid');
    DINOS.forEach(function(dino) {
        var btn = document.createElement('button');
        btn.className = 'dino-btn';
        btn.style.background = dino.color;
        btn.innerHTML = '<span style="font-size:22px">' + dino.emoji + '</span><br>' + dino.nick + '<br><span style="font-size:14px">' + dino.dietIcon + ' ' + dino.diet + '</span>';
        btn.onclick = function() {
            document.getElementById('select-screen').style.display = 'none';
            window.startDinoGame(dino.id);
        };
        grid.appendChild(btn);
    });
</script>
```

**Step-by-step fix:**

1. **Create backup branch:**
   ```bash
   git checkout -b fix/dino-hunter-inline-scripts
   ```

2. **Copy the inline script code to game.js:**
   ```javascript
   // At the end of game.js or in DOMContentLoaded handler
   function initializeDinoButtons() {
       const grid = document.getElementById('dino-grid');
       DINOS.forEach(function(dino) {
           const btn = document.createElement('button');
           btn.className = 'dino-btn';
           btn.style.background = dino.color;
           btn.innerHTML = '<span style="font-size:22px">' + dino.emoji + '</span><br>' + dino.nick + '<br><span style="font-size:14px">' + dino.dietIcon + ' ' + dino.diet + '</span>';
           btn.onclick = function() {
               document.getElementById('select-screen').style.display = 'none';
               window.startDinoGame(dino.id);
           };
           grid.appendChild(btn);
       });
   }

   // Call when page loads
   if (document.readyState === 'loading') {
       document.addEventListener('DOMContentLoaded', initializeDinoButtons);
   } else {
       initializeDinoButtons();
   }
   ```

3. **Remove from HTML:**
   ```diff
   - <script>
   -     var grid = document.getElementById('dino-grid');
   -     DINOS.forEach(function(dino) { ... });
   - </script>
   ```

4. **Test thoroughly:**
   - [ ] Game loads
   - [ ] Dino grid buttons appear
   - [ ] Click each button → game starts correctly
   - [ ] No console errors
   - [ ] Linter passes: `npm run lint:design`
   - [ ] On mobile (landscape & portrait)
   - [ ] On desktop

5. **If any issues:**
   - Revert: `git checkout games/dino-hunter/`
   - Investigate problem
   - Try again

**Commit:** `fix: move dino-hunter button initialization from HTML to game.js`

---

#### 2.2 Fix: solar-system - Move inline scripts to game.js
**Files:** `games/solar-system/index.html` (lines 252-261)

**Same process as dino-hunter:**
1. Create backup branch
2. Move code to game.js
3. Test thoroughly
4. Verify no console errors
5. Commit separately

**Commit:** `fix: move solar-system initialization from HTML to game.js`

---

### Priority 3: HIGH RISK FIXES (CSS Refactoring)

These require extensive testing - visual changes possible.

#### 3.1 Fix: periodic-table - Remove box-shadow (40 instances)
**Files:**
- `games/periodic-table/css/game.css`
- `games/periodic-table/css/gamification.css`
- `games/periodic-table/css/visual-enhancements.css`
- `games/periodic-table/css/visual-simplified.css`

**Risk:** High (40 CSS changes, visual effects)

**Approach:**
1. **Create backup branch:**
   ```bash
   git checkout -b fix/periodic-table-box-shadow
   ```

2. **For each box-shadow occurrence, replace with:**

   **Elevation effect:**
   ```css
   /* BEFORE */
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

   /* AFTER */
   border: 1px solid rgba(255, 255, 255, 0.1);
   transform: translateY(0);
   transition: transform 0.2s ease, border-color 0.2s ease;

   /* And on hover: */
   &:hover {
       border-color: rgba(255, 255, 255, 0.3);
       transform: translateY(-2px);
   }
   ```

   **Blue glow effect:**
   ```css
   /* BEFORE */
   box-shadow: 0 4px 12px rgba(28, 176, 246, 0.2);

   /* AFTER */
   border: 2px solid rgba(28, 176, 246, 0.4);
   ```

3. **Test strategy:**
   - **Don't test all 40 at once!** Do 5-10, test, commit
   - Then do next batch
   - This way if something breaks, you know which batch caused it

4. **For each batch of fixes:**
   ```bash
   # Edit 5-10 box-shadow instances
   npm run lint:design  # Should have fewer errors
   # Manually test the game in browser
   # Check periodic-table visual appearance
   git commit -m "fix: replace box-shadow with border/transform in periodic-table (batch 1/4)"
   ```

5. **Testing checklist for periodic-table:**
   - [ ] Page loads without errors
   - [ ] All UI elements visible
   - [ ] Buttons have hover effects (but without shadow)
   - [ ] Cards have proper depth (using borders/transform)
   - [ ] Color scheme unchanged
   - [ ] On mobile: layout correct
   - [ ] On desktop: all effects work
   - [ ] No console errors
   - [ ] Game functionality unchanged

**⚠️ If styling breaks:**
- Revert batch: `git reset --hard HEAD~1`
- Review the CSS changes
- Try different approach for that batch
- Commit again

**Total commits:** 4-5 smaller commits (safer than 1 huge commit)

---

## Safe Rollback Plan

If ANY fix breaks production:

```bash
# Option 1: Revert single commit
git revert <commit-hash>
git push origin main

# Option 2: Revert to last known good
git reset --hard <good-commit>
git push origin main -f  # WARNING: Force push, use carefully!
```

---

## PR Template for Each Fix

```markdown
## Fix: [Game Name] - [Issue Type]

### Changes
- Removed box-shadow from CSS
- Moved inline scripts to game.js
- Added back-link navigation

### Testing Performed
- [ ] Game plays without errors
- [ ] UI looks correct on desktop
- [ ] UI looks correct on mobile
- [ ] UI looks correct on tablet
- [ ] UI looks correct on mobile landscape
- [ ] No console errors
- [ ] Linter passes: `npm run lint:design`
- [ ] All buttons/links functional

### Screenshots
[Before and after screenshots if applicable]

### Browser Testing
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

### Related Issue
Fixes #XX errors in design system audit
```

---

## Execution Order (Recommended)

```
Week 1: Low-risk (metadata)
  ✓ 1.1: periodic-table back-link
  ✓ 1.2: periodic-table canonical link
  ✓ 1.3: draw-it back-link

Week 2: Low-Medium risk (CSS removal)
  ✓ 1.4: Remove design-colors.css from 2 games

Week 3: Medium risk (JS refactoring)
  ✓ 2.1: dino-hunter inline scripts
  ✓ 2.2: solar-system inline scripts

Week 4: High risk (CSS refactoring)
  ✓ 3.1: periodic-table box-shadow (in 4 batches)
```

---

## Verification Checklist Before Merge

Every fix must:
- [ ] Have zero ESLint errors
- [ ] Have zero design system linter errors
- [ ] Be tested on actual device (not just browser DevTools)
- [ ] Have no visual regressions
- [ ] Have clear commit message
- [ ] Have been reviewed by another person
- [ ] Pass CI/CD checks (if configured)

---

## Questions Before Starting?

Before fixing any game, verify:
1. **Can you run the game locally?** Test it works before fixing
2. **Do you have test browsers ready?** (Desktop + Mobile)
3. **Is there a backup?** (Git branch always protects you)
4. **Any custom modifications** we should know about?

**READY TO PROCEED?** Start with Priority 1 (lowest risk).

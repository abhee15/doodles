# Doodles Framework Standards & Consistency Guidelines

This document defines the framework standards for maintaining consistency, catching bugs faster, and ensuring a refined UX for kids.

---

## 1. Navigation Architecture Standard

### Navigation Hierarchy

Every game follows a strict navigation hierarchy:

```
Portal (index.html) — Category Filter — All Games Grid
    ↓
Game Landing (game/index.html) — Main menu/content entry
    ↓
Game Module/Level (e.g., Quick Math technique, Draw It step-by-step)
    ↓
Game Play/Content Screen (e.g., practice problem, tutorial)
```

### Back Button Rule

**The back button ALWAYS goes to the immediate logical parent, never skip levels.**

| Current Screen | Back Button Should Go To | Reason |
|---|---|---|
| Game landing | Portal category (`../../index.html#game-id`) | Direct parent |
| Module selection screen | Game landing (same page, different state) | Immediate parent |
| Tutorial/content screen | Module selection | User started here |
| Practice/quiz screen | Module selection (preserve progress) | Return to picker |

### Implementation Pattern

```javascript
// ❌ WRONG - Skips module selection
<a href="../../index.html#quick-math">Back</a>

// ✅ CORRECT - Goes to logical parent
// For module selection → game landing
window.history.back()  // OR programmatic navigation

// For game landing → portal
<a href="../../index.html#game-id">Back</a>
```

---

## 2. Shared Navigation Component

All games use the `shared/nav-handler.js` utility (to be created).

### API

```javascript
// Initialize navigation tracking
initNavigation(gameId, {
  screens: ['landing', 'module-picker', 'tutorial', 'practice'],
  currentScreen: 'landing'
});

// Move to a screen
goToScreen(screenName);

// Get back destination
getBackDestination(); // Returns 'landing', 'module-picker', or 'portal'

// Navigate back
navigateBack();

// Force reset to game landing
resetToGameLanding();
```

### Usage Example (Quick Math)

```javascript
// Initialize
initNavigation('quick-math', {
  screens: ['landing', 'technique-picker', 'tutorial', 'practice']
});

// When user taps a technique
goToScreen('tutorial');  // Module selected

// When user clicks back in tutorial
navigateBack();  // Goes to 'technique-picker' (not portal!)

// When user clicks back in technique-picker
navigateBack();  // Goes to 'landing'

// When user clicks back in landing
navigateBack();  // Goes to portal: ../../index.html#quick-math
```

---

## 3. Game Structure Standard

### Directory Structure

```
games/game-id/
├── index.html              # Main entry point
├── game.js                 # All game logic
├── styles.css              # Game-specific styles (optional)
├── assets/                 # Images, audio, data files
│   └── ...
└── README.md              # Game-specific docs (optional)
```

### HTML Structure for State Management

```html
<body>
  <!-- Nav bar (always visible) -->
  <nav class="dom-nav">
    <a id="game-back-btn" href="../../index.html#game-id">
      <i class="ti ti-arrow-left"></i> Back
    </a>
    <span id="nav-title">Game Name</span>
    <span id="nav-meta"></span>
  </nav>

  <!-- Screens (use data attribute to track state) -->
  <div class="dom-screen active" data-screen="landing">
    <!-- Landing/menu content -->
  </div>

  <div class="dom-screen" data-screen="module-picker">
    <!-- Module selection -->
  </div>

  <div class="dom-screen" data-screen="tutorial">
    <!-- Tutorial/content -->
  </div>

  <div class="dom-screen" data-screen="practice">
    <!-- Practice/game -->
  </div>
</body>
```

### JavaScript Pattern

```javascript
// State machine
const gameState = {
  currentScreen: 'landing',
  screenStack: ['landing'],  // Track navigation history
  moduleId: null,
  progress: {}
};

// Screen transition
function showScreen(screenName) {
  // Hide all screens
  document.querySelectorAll('.dom-screen').forEach(s => {
    s.classList.remove('active');
  });

  // Show target screen
  document.querySelector(`[data-screen="${screenName}"]`)
    .classList.add('active');

  // Update state
  gameState.currentScreen = screenName;
  gameState.screenStack.push(screenName);

  // Update nav
  updateNav();
}

// Back button handler
document.getElementById('game-back-btn').addEventListener('click', (e) => {
  if (!handleInternalBack()) {
    // No internal back, use default (go to portal)
    // Link href will handle it
  } else {
    e.preventDefault();  // Prevent default link behavior
  }
});

function handleInternalBack() {
  if (gameState.currentScreen === 'landing') {
    return false;  // Let default link work
  }

  // Pop current screen, return to previous
  gameState.screenStack.pop();
  const previousScreen = gameState.screenStack[gameState.screenStack.length - 1];
  showScreen(previousScreen);
  return true;  // Handled internally
}
```

---

## 4. Consistency Audit Checklist

Run this checklist on EVERY game before committing:

### Navigation
- [ ] Game landing page has back link to `../../index.html#game-id`
- [ ] All screens use `.dom-screen` with unique `data-screen` attribute
- [ ] Back button logic prevents skipping levels
- [ ] Breadcrumb/title in nav shows current location
- [ ] No hardcoded portal links inside game modules (except game landing)

### UX for Kids
- [ ] Font size ≥14px for body text (readability)
- [ ] Buttons ≥44px tall (mobile touch targets)
- [ ] Icons are clear and self-explanatory
- [ ] Color contrast ≥4.5:1 (WCAG AA)
- [ ] Loading states shown (no sudden changes)
- [ ] Error messages in simple language ("Try again" not "Error: 404")
- [ ] No dark UX patterns (misleading buttons, hidden controls)

### Performance
- [ ] Game loads in <2s on slow 3G
- [ ] Smooth 60fps animations (use `transform`, not `left`/`top`)
- [ ] No console errors or warnings
- [ ] Images optimized (<100KB per screen)
- [ ] No layout shift during load

### Accessibility
- [ ] Keyboard navigation works (Tab, Arrow keys, Enter)
- [ ] Screen reader friendly (alt text, aria-labels)
- [ ] Focus indicators visible
- [ ] Mobile: tap targets ≥44×44px

### Code Quality
- [ ] No hardcoded strings (use constants)
- [ ] Comments explain complex logic
- [ ] No console.log left behind
- [ ] Follows shared utility patterns
- [ ] No box-shadows (flat design)

---

## 5. Shared Utilities Library

### `shared/navigation.js` (new)

```javascript
/**
 * Game Navigation Handler
 * Manages screen-to-screen navigation within a game
 */

class GameNavigation {
  constructor(gameId, config) {
    this.gameId = gameId;
    this.config = config;  // { screens: [...], initialScreen: 'landing' }
    this.currentScreen = config.initialScreen || 'landing';
    this.screenStack = [this.currentScreen];
  }

  goToScreen(screenName) {
    if (!this.config.screens.includes(screenName)) {
      console.warn(`Screen ${screenName} not defined in config`);
      return;
    }
    this.screenStack.push(screenName);
    this.currentScreen = screenName;
    this.showScreen();
  }

  goBack() {
    if (this.screenStack.length <= 1) {
      // At landing, go to portal
      window.location.href = `../../index.html#${this.gameId}`;
      return;
    }
    this.screenStack.pop();
    this.currentScreen = this.screenStack[this.screenStack.length - 1];
    this.showScreen();
  }

  showScreen() {
    document.querySelectorAll('.dom-screen').forEach(el => {
      el.classList.remove('active');
    });
    document.querySelector(`[data-screen="${this.currentScreen}"]`)
      ?.classList.add('active');
    this.updateNavBar();
  }

  updateNavBar() {
    const navTitle = document.getElementById('nav-title');
    if (navTitle) {
      const title = this.config.titles?.[this.currentScreen] || this.config.gameName;
      navTitle.textContent = title;
    }
  }

  resetToLanding() {
    this.screenStack = ['landing'];
    this.currentScreen = 'landing';
    this.showScreen();
  }
}

// Global instance
window.gameNav = null;
```

### Usage in Game

```javascript
// In game.js
window.gameNav = new GameNavigation('quick-math', {
  screens: ['landing', 'technique-picker', 'tutorial', 'practice'],
  initialScreen: 'landing',
  gameName: 'Quick Math',
  titles: {
    landing: 'Quick Math',
    'technique-picker': 'Choose a Technique',
    tutorial: 'Learn the Trick',
    practice: 'Practice Problems'
  }
});

// When user selects a technique
document.querySelectorAll('.technique-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    window.gameNav.goToScreen('tutorial');
  });
});

// Back button handler
document.getElementById('game-back-btn').addEventListener('click', (e) => {
  e.preventDefault();
  window.gameNav.goBack();
});
```

---

## 6. Design System Consistency

### Color Palette for Kid-Friendly Apps

| Purpose | Colors | Usage |
|---------|--------|-------|
| **Primary Action** | `--dom-accent` | Buttons, highlight |
| **Secondary Action** | `--dom-accent2` | Alternative buttons |
| **Success** | `#10B981` (green) | Correct answer, progress |
| **Error** | `#EF4444` (red) | Wrong answer, danger |
| **Warning** | `#F59E0B` (amber) | Caution, attention |
| **Info** | `--dom-accent` (blue) | Hints, tips |
| **Background** | `--dom-bg` | Safe, light |
| **Cards** | `--dom-bg-card` | Content containers |

### Typography

```css
/* Body text */
body { font-size: 16px; line-height: 1.6; }

/* Headings */
h1 { font-size: 28px; font-weight: 900; }
h2 { font-size: 22px; font-weight: 800; }
h3 { font-size: 18px; font-weight: 700; }

/* Minimum for kids */
p, label, button { font-size: ≥14px; }

/* Interactive */
button, a { min-height: 44px; min-width: 44px; }
```

### Spacing (8px grid)

```css
--gap-xs: 4px;    /* Icon gaps */
--gap-sm: 8px;    /* Button padding, small margins */
--gap-md: 16px;   /* Section margins, card padding */
--gap-lg: 24px;   /* Major section spacing */
--gap-xl: 32px;   /* Page padding */
```

---

## 7. Animation & Microinteractions

### Performance Rules

```css
/* ✅ GOOD - GPU accelerated */
.button:active { transform: scale(0.95); }
.card:hover { transform: translateY(-2px); }

/* ❌ BAD - Causes reflow */
.button:active { height: 42px; } /* Don't animate height */
.card:hover { left: 10px; }      /* Don't animate left/top */
```

### Kid-Friendly Feedback

Every interactive element should give immediate feedback:

```javascript
// Tap feedback
button.addEventListener('mousedown', () => {
  button.style.transform = 'scale(0.95)';  // Immediate visual feedback
});

button.addEventListener('mouseup', () => {
  button.style.transform = 'scale(1)';     // Restore
});

// Selection feedback
option.addEventListener('click', () => {
  option.classList.add('selected');        // Show it's selected
  option.disabled = true;                   // Prevent re-selection
  playSound('select.mp3');                  // Audio feedback (optional)
});

// Progress feedback
updateProgressBar();  // Show progress visually
showConfetti();       // Celebrate progress
```

---

## 8. Testing & Validation Framework

### Automated Consistency Checks

Create `scripts/audit-games.js`:

```javascript
const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = ['index.html', 'game.js'];
const REQUIRED_SCREENS = ['landing'];
const REQUIRED_HTML = [
  '<nav class="dom-nav">',
  'data-screen="landing"',
  'id="game-back-btn"'
];

function auditGame(gameDir) {
  const errors = [];

  // Check required files
  REQUIRED_FILES.forEach(file => {
    if (!fs.existsSync(path.join(gameDir, file))) {
      errors.push(`Missing ${file}`);
    }
  });

  // Check HTML structure
  const indexPath = path.join(gameDir, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');

  REQUIRED_HTML.forEach(requirement => {
    if (!indexContent.includes(requirement)) {
      errors.push(`Missing in HTML: ${requirement}`);
    }
  });

  // Check for inconsistencies
  if (indexContent.includes('box-shadow')) {
    errors.push('Found box-shadow (violates flat design)');
  }

  if (indexContent.includes('onclick=')) {
    errors.push('Found inline onclick (use addEventListener)');
  }

  // Check nav backlink format
  if (!indexContent.includes('../../index.html#')) {
    errors.push('Invalid back link format (should anchor to portal)');
  }

  return errors;
}

// Run audit on all games
const gamesDir = path.join(__dirname, '..', 'games');
const games = fs.readdirSync(gamesDir);

console.log('🔍 Auditing all games...\n');

let totalErrors = 0;
games.forEach(game => {
  const errors = auditGame(path.join(gamesDir, game));
  if (errors.length > 0) {
    console.log(`❌ ${game}:`);
    errors.forEach(e => console.log(`   • ${e}`));
    totalErrors += errors.length;
  } else {
    console.log(`✅ ${game}`);
  }
});

console.log(`\n${totalErrors === 0 ? '✓ All games pass audit!' : `⚠️  ${totalErrors} issues found`}`);
process.exit(totalErrors > 0 ? 1 : 0);
```

Run with: `npm run audit` (add to package.json scripts)

### Manual Checklist Template

```markdown
# Game: [Name]
Date: [Date]
Auditor: [Name]

## Navigation
- [ ] Back button goes to correct parent screen
- [ ] No hardcoded portal links in modules
- [ ] Screen data attributes consistent

## UX
- [ ] Button size ≥44px
- [ ] Text size ≥14px
- [ ] Color contrast ≥4.5:1
- [ ] Loading states shown
- [ ] No dark patterns

## Performance
- [ ] <2s load time on 3G
- [ ] 60fps animations
- [ ] No console errors

## Code
- [ ] No box-shadows
- [ ] No inline onclick
- [ ] Comments on complex logic
- [ ] Follows navigation standard

## Notes
[Any additional observations]
```

---

## 9. Kid-Friendly UX Checklist

### Before Launching Any Game

**Readability**
- [ ] Font size 16px+ for body text
- [ ] Line height 1.5-1.8
- [ ] Max line width 60-75 characters
- [ ] Clear, simple language (no jargon)

**Interaction**
- [ ] Buttons clearly show what they do
- [ ] Hover/active states obvious (≥20% color change)
- [ ] No surprising or confusing behavior
- [ ] Tap targets ≥44×44px mobile
- [ ] No accidental taps possible

**Feedback**
- [ ] Every action gets immediate visual feedback
- [ ] Success/error states clear
- [ ] Progress clearly shown
- [ ] Loading states indicate waiting

**Safety**
- [ ] No time limits that stress kids
- [ ] No ads or external links
- [ ] No data collection without consent
- [ ] Easy to pause/exit anytime
- [ ] "Are you sure?" for destructive actions

**Enjoyment**
- [ ] Clear goal/objective
- [ ] Achievable difficulty curve
- [ ] Celebration for progress/wins
- [ ] No punishing failure (allow retry)
- [ ] Encouraging tone in all text

---

## 10. Documentation Template

Every new game should include a README:

```markdown
# [Game Name]

## Overview
Brief description of what the game teaches and how.

## Navigation Flow
```
Landing → Module Selection → Tutorial → Practice → Results
```

## Screens & States
- `landing` - Menu/entry point
- `module-selector` - Choose difficulty/topic
- `tutorial` - Learn the concept
- `practice` - Apply learning
- `results` - Show progress

## Shared Components Used
- Navigation: `shared/navigation.js`
- Design system: `shared/tokens.css`, `shared/game-dom.css`
- Analytics: `shared/analytics.js`

## Kid-Friendly Features
- [What makes this engaging for kids]
- [Learning techniques used]
- [Difficulty progression]

## Performance Notes
- Load time: Xms on 3G
- Animations: Using transform, 60fps
- Image optimization: Xpx, Xkb

## Tested On
- Desktop Chrome, Firefox, Safari
- Mobile iOS Safari
- Mobile Chrome
- Tablet iPad
```

---

## Summary: How to Use This Framework

1. **For NEW games**: Follow sections 2-4 (navigation, structure, utilities)
2. **For EXISTING games**: Run audit (section 8), fix issues progressively
3. **Before committing**: Use consistency checklist (section 4)
4. **For design**: Reference section 6 (colors, typography, spacing)
5. **For polish**: Apply section 9 (kid-friendly UX)

This framework ensures:
- ✅ Consistent navigation across all games
- ✅ Faster bug detection (automated audit)
- ✅ Refined, polished UX for kids
- ✅ Clear patterns for contributors
- ✅ Scalable architecture for new games

# Mobile Testing Framework — Doodles Games

A comprehensive guide for testing and optimizing games for mobile devices. This framework applies to all games (Phaser and DOM-based) and ensures consistent quality across the platform.

**Version**: 1.0
**Last Updated**: 2026-02-21
**Applies To**: All games in `/games/` directory

---

## Table of Contents

1. [Device & Viewport Sizes](#device--viewport-sizes)
2. [Touch Target Standards](#touch-target-standards)
3. [Testing Checklist](#testing-checklist)
4. [Responsive Design Patterns](#responsive-design-patterns)
5. [Device-Specific Handling](#device-specific-handling)
6. [Performance Benchmarks](#performance-benchmarks)
7. [Testing Methodology](#testing-methodology)
8. [Debugging Tools](#debugging-tools)
9. [Common Issues & Fixes](#common-issues--fixes)

---

## Device & Viewport Sizes

### Priority Test Devices

Test on these device sizes in BOTH portrait and landscape:

| Device | Width | Height | Category | Priority |
|--------|-------|--------|----------|----------|
| **iPhone SE** | 375px | 667px | Small phone | 🔴 CRITICAL |
| **iPhone 12** | 390px | 844px | Standard phone | 🔴 CRITICAL |
| **iPhone 14 Pro** | 393px | 852px | Standard phone | 🔴 CRITICAL |
| **Pixel 4** | 412px | 869px | Standard phone | 🟠 HIGH |
| **Galaxy S21** | 360px | 800px | Standard phone | 🟠 HIGH |
| **iPad Air** | 768px | 1024px | Tablet | 🟡 MEDIUM |
| **iPad Pro** | 1024px | 1366px | Large tablet | 🟡 MEDIUM |

### Viewport Size Breakpoints

CSS media query breakpoints (from CLAUDE.md):

```css
Mobile:  max-width: 768px          /* Portrait phones & small tablets */
Tablet:  min-width: 769px          /* Tablets, landscape phones */
Desktop: min-width: 1024px         /* Large tablets, computers */
```

### Testing Matrix

Create and track tests in this matrix:

```
Device              | Portrait | Landscape | Notes
==========================================
iPhone SE 375px     |    ✓     |     ✓     |
iPhone 12 390px     |    ✓     |     ✓     |
iPhone 14 393px     |    ✓     |     ✓     |
Pixel 4 412px       |    ✓     |     ✓     |
Galaxy S21 360px    |    ✓     |     ✓     |
iPad Air 768px      |    ✓     |     ✓     |
iPad Pro 1024px     |    ✓     |     ✓     |
```

---

## Touch Target Standards

### Minimum Size Requirements

**iOS Human Interface Guidelines (HIG) Standard:**

| Element | Width | Height | Min Area | Rule |
|---------|-------|--------|----------|------|
| Button | 44px | 44px | 1936px² | All interactive elements |
| Link | 44px | 44px | 1936px² | All tappable text |
| Input | 44px | 44px | 1936px² | Text fields, checkboxes |
| Spacing | 12px | 12px | N/A | Gap between targets |

**Implementation:**

```css
/* Phaser games: Button container minimum */
const MIN_BUTTON_HEIGHT = 44;
const MIN_BUTTON_WIDTH = 44;

/* DOM games: CSS class */
.dom-btn {
  min-height: 44px;
  min-width: 44px;
  padding: var(--tok-space-3);  /* 12px minimum spacing */
}
```

### Testing Touch Targets

**How to verify:**
1. Open browser DevTools
2. Open Accessibility panel
3. Inspect each button/link
4. Verify computed size is >= 44px in both dimensions
5. Check spacing between targets (should be >= 12px)

**Chrome DevTools method:**
```
Right-click element → Inspect → Accessibility tree
Look for: "Size: 44x44" or larger
```

### Common Touch Target Issues

| Issue | Problem | Fix |
|-------|---------|-----|
| **Text links too small** | Line height < 44px | `min-height: 44px` on parent |
| **Buttons cramped** | No padding inside button | Add `padding: 12px` minimum |
| **Adjacent buttons overlap** | No gap between targets | Add `gap: 12px` or `margin` |
| **Text area too narrow** | Input field < 44px wide | Set `min-width: 44px` |
| **Invisible hit areas** | Click works but no visual feedback | Add `:active` or `:hover` states |

---

## Testing Checklist

### Pre-Launch Checklist

Use this checklist before pushing any game to production:

#### Visual & Layout (Portrait)
- [ ] Content doesn't exceed screen width (no horizontal scroll)
- [ ] Text is readable without pinch-zoom
- [ ] All buttons visible and accessible
- [ ] Images scale properly (no distortion)
- [ ] Navigation visible and tappable
- [ ] Top & bottom of screen not cut off by status bar/nav bar
- [ ] Spacing between elements looks intentional

#### Visual & Layout (Landscape)
- [ ] Content fits without horizontal scroll
- [ ] Buttons don't overlap in landscape
- [ ] Text still readable
- [ ] Game pauses if needed for soft keyboard
- [ ] Safe area respected (notches, home indicators)

#### Touch & Interaction
- [ ] All buttons are >= 44x44px (test with DevTools)
- [ ] Button spacing >= 12px minimum
- [ ] Touch response is immediate (no lag)
- [ ] Double-tap zoom is disabled (or handled)
- [ ] Long-press doesn't trigger unwanted actions
- [ ] Swipe gestures work as intended
- [ ] Soft keyboard doesn't hide inputs
- [ ] Text selection on buttons is prevented

#### Performance
- [ ] Page loads in < 3 seconds
- [ ] Game starts in < 2 seconds
- [ ] No jank during gameplay (60 FPS target)
- [ ] Smooth scrolling (60 FPS if applicable)
- [ ] Audio loads and plays properly
- [ ] No memory leaks after 5+ minutes gameplay

#### Orientation & Device Changes
- [ ] Rotating device doesn't break layout
- [ ] Game pauses when switching apps (mobile)
- [ ] Returning to tab resumes state (web)
- [ ] Safe area insets honored after rotation

#### Accessibility
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast >= 4.5:1 for text
- [ ] Text alternatives for images/icons
- [ ] Keyboard navigation works (if applicable)
- [ ] Screen reader can identify buttons/links

#### Browser Compatibility
Test on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Samsung Internet (for Android)

#### Meta & SEO
- [ ] Meta tags present (viewport, title, description)
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Canonical URL correct
- [ ] Page title is descriptive

---

## Responsive Design Patterns

### Pattern 1: Phaser Canvas Games

Used by: Math Ladder, Number Ninja, Quick Math, Measure Master, Solar System, etc.

**Architecture:**
```html
<a href="..." class="back-link">← Back</a>
<div id="game-container"></div>
```

**CSS (game-page-v2.css handles scaling):**
```css
#game-container {
  width: min(95vw, 1200px);
  height: min(95vh, 900px);
}

@media (max-width: 768px) {
  #game-container {
    width: 100vw;
    height: 100dvh;  /* Dynamic viewport height for address bar */
  }
}
```

**JavaScript (game.js):**
```javascript
// Use Phaser's scale manager (via game-config.js)
const config = createGameConfig({
  width: 900,
  height: 650,
  scene: { create, update }
});

// The scale manager automatically:
// - Fills the container
// - Maintains aspect ratio
// - Handles orientation changes
// - Uses FIT mode (scales entire game)

// For responsive text:
const fontSize = getResponsiveFontSize(scene, 18);
// Automatically scales based on screen size

// Listen for orientation changes:
scene.scale.on('orientationchange', (orientation) => {
  if (orientation === Phaser.Scale.Orientation.PORTRAIT) {
    // Adjust UI for portrait if needed
  }
});
```

**Testing:**
1. Open game on phone in portrait
2. Verify game fills screen without cut-off
3. Rotate to landscape
4. Verify layout adjusts properly
5. Check that text is readable at both orientations

### Pattern 2: DOM Games

Used by: Body Map, Doodle School

**Architecture:**
```html
<nav class="dom-nav">
  <a href="...">← Back</a>
  <span class="dom-nav-title">Game Title</span>
</nav>

<div class="dom-screen active">
  <!-- Game content -->
</div>
```

**CSS (game-dom.css provides shell):**
```css
:root {
  --dom-nav-height: 60px;
}

.dom-nav {
  height: var(--dom-nav-height);
  border-bottom: 1px solid var(--dom-nav-border);
}

@media (max-width: 768px) {
  :root {
    --dom-nav-height: 52px;  /* Smaller on mobile */
  }

  .dom-btn {
    font-size: 0.95rem;      /* Smaller text */
  }

  .dom-card {
    padding: var(--tok-space-3);  /* Less padding */
  }
}
```

**Testing:**
1. Test at 375px width (portrait)
2. Verify nav fits without overflow
3. Verify buttons stack vertically if needed
4. Test at 768px width (tablet)
5. Verify layout uses available space

### Pattern 3: Responsive Typography

**For Phaser Games:**
```javascript
// Use getResponsiveFontSize helper
const headingSize = getResponsiveFontSize(scene, 48);
const bodySize = getResponsiveFontSize(scene, 18);

const text = scene.add.text(x, y, 'Hello', {
  fontSize: headingSize + 'px',
  fontFamily: TYPOGRAPHY.fonts.primary
});
```

**For DOM Games:**
```css
h1 {
  font-size: clamp(24px, 5vw, 48px);  /* Scales with viewport */
}

p {
  font-size: clamp(14px, 2.5vw, 18px);
}

@media (max-width: 768px) {
  h1 { font-size: 28px; }
  p { font-size: 14px; }
}
```

### Pattern 4: Safe Area Handling (Notches, Home Indicators)

**For Phaser Games:**
```javascript
// game-page-v2.css uses CSS environment variables
// .back-link already accounts for safe areas:

.back-link {
  top: max(env(safe-area-inset-top, 0px), 8px);
  left: max(env(safe-area-inset-left, 0px), 8px);
}
```

**For DOM Games:**
```css
.dom-nav {
  padding-top: max(env(safe-area-inset-top), 12px);
  padding-left: max(env(safe-area-inset-left), 12px);
  padding-right: max(env(safe-area-inset-right), 12px);
}

/* For content that goes edge-to-edge */
.full-width {
  padding-left: max(env(safe-area-inset-left), 16px);
  padding-right: max(env(safe-area-inset-right), 16px);
}
```

**Testing Safe Areas:**
1. Chrome DevTools: Toggle device emulation
2. Select "iPad Pro" or "iPhone 14 Pro"
3. Verify that content doesn't go under notch
4. Test actual device with notch if possible
5. Check landscape orientation (home indicator)

---

## Device-Specific Handling

### iOS (iPhone/iPad)

**Common Issues:**

| Issue | Cause | Fix |
|-------|-------|-----|
| Double-tap zoom | Default browser behavior | Disable in viewport: `user-scalable=no` |
| Rubber band scroll | Browser pulls down to refresh | Prevent on game container |
| Safe area inset | Notch, home indicator | Use `env(safe-area-inset-*)` |
| Input autofill | Blue highlight on form inputs | Use `-webkit-autofill` styling |
| Audio autoplay | Disabled by default on iOS | Require user interaction first |

**Implementation:**

```html
<!-- Viewport meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0,
      maximum-scale=1.0, user-scalable=no, viewport-fit=cover">

<!-- iOS-specific -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

### Android (Samsung, Google Pixel, etc.)

**Common Issues:**

| Issue | Cause | Fix |
|-------|-------|-----|
| Navigation bar | System UI at bottom | Use dynamic viewport height (`dvh`) |
| Soft keyboard | Input focus brings up keyboard | Set fixed height or dismiss before game |
| Status bar | Transparent or colored | Account in safe area handling |
| Back button | Hardware button behavior | Test back navigation |
| Vibration | Hardware available | Use Vibration API for feedback |

**Implementation:**

```css
/* Use dynamic viewport height for address bar changes */
@media (max-width: 768px) {
  body {
    height: 100dvh;  /* Not 100vh - accounts for address bar */
  }
}
```

```javascript
// Vibration feedback (Android)
if (navigator.vibrate) {
  navigator.vibrate(50);  // 50ms vibration
}
```

### Portrait vs Landscape Detection

**JavaScript:**
```javascript
function handleOrientationChange() {
  if (window.innerHeight > window.innerWidth) {
    console.log('Portrait mode');
  } else {
    console.log('Landscape mode');
  }
}

window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);
```

**CSS:**
```css
/* Portrait */
@media (orientation: portrait) {
  .container {
    flex-direction: column;
  }
}

/* Landscape */
@media (orientation: landscape) {
  .container {
    flex-direction: row;
  }
}
```

---

## Performance Benchmarks

### Core Web Vitals Targets

Google's performance metrics for all games:

| Metric | Target | Tool | How to Test |
|--------|--------|------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Lighthouse | DevTools → Lighthouse |
| **FID** (First Input Delay) | < 100ms | Web Vitals | DevTools → Performance |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Lighthouse | DevTools → Lighthouse |

**Lighthouse Testing:**
```
1. Chrome DevTools → Lighthouse
2. Select "Mobile"
3. Run audit
4. Score should be > 80
5. Fix warnings in order of impact
```

### Loading Time Targets

| Phase | Target | What to Measure |
|-------|--------|-----------------|
| HTML load | < 200ms | Time to first paint |
| CSS loaded | < 500ms | Stylesheets ready |
| JS loaded | < 1s | Game scripts ready |
| Game start | < 2s | Phaser game initialized |
| First interaction | < 100ms | Button response time |

**Measurement:**
```javascript
// In browser console
performance.getEntriesByType('navigation');

// Or use Web Vitals library
import { getLCP, getFID, getCLS } from 'web-vitals';

getLCP(metric => console.log('LCP:', metric.value));
getFID(metric => console.log('FID:', metric.value));
getCLS(metric => console.log('CLS:', metric.value));
```

### Asset Size Guidelines

| Asset | Max Size | Compression |
|-------|----------|-------------|
| HTML | 50KB | Minify |
| CSS | 100KB | Minify |
| JavaScript | 500KB | Minify + tree-shake |
| Images | 100KB each | WebP + compression |
| Fonts | 50KB | WOFF2 only |
| Audio | 200KB | MP3 128kbps |

### Memory Usage

Target on mid-range device (Pixel 4):
- **Initial load**: < 30MB
- **During gameplay**: < 50MB
- **After 10 min**: No increase (no leak)

**Check in Chrome DevTools:**
```
DevTools → Memory → Take snapshot
Monitor size over time during gameplay
```

---

## Testing Methodology

### Manual Testing Process

**Setup (30 min one-time):**
1. Get a phone (own device or use Android emulator)
2. Connect to same WiFi as computer
3. Open terminal: `python -m http.server 8000`
4. Note your computer IP: `ipconfig | findstr IPv4`
5. Access from phone: `http://YOUR_IP:8000`

**Per-Game Testing (45 min):**

**Phase 1: Layout & Visuals (15 min)**
```
Portrait mode (300s):
□ Scroll top to bottom - no content cut off
□ All buttons visible - can tap them
□ Text readable - no blurry or tiny text
□ Images load - not distorted
□ Colors look correct - no overly bright/dark

Landscape mode (300s):
□ Same checks as portrait
□ Buttons don't overlap
□ Layout makes sense sideways
```

**Phase 2: Interaction & Touch (15 min)**
```
□ Tap every button - instant response (no lag)
□ Tap screen edges - works properly
□ Long press - doesn't break anything
□ Swipe gestures - work if intended
□ Input fields - can type without lag
□ Back button - returns to menu
□ Restart game - clears state properly
```

**Phase 3: Performance & Stability (15 min)**
```
□ Game loads quickly (< 2s)
□ Gameplay smooth (no stutter)
□ Play 5 minutes - no slowdown
□ Rotate device - layout adjusts
□ Switch away and back - state preserved
□ Memory doesn't grow unbounded
□ Audio works (or fails gracefully)
```

### Automated Testing

**Browser DevTools Checks:**

```javascript
// Run in browser console:

// 1. Check touch target sizes
document.querySelectorAll('button, a, input').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.width < 44 || rect.height < 44) {
    console.warn('Touch target too small:', el, rect);
  }
});

// 2. Check responsive breakpoints
console.log('Current viewport:', window.innerWidth, 'x', window.innerHeight);
console.log('Mobile:', window.innerWidth < 768);

// 3. Monitor performance
const perf = performance.getEntriesByType('navigation')[0];
console.log('Load time:', perf.loadEventEnd - perf.fetchStart);

// 4. Check for console errors
// Open DevTools Console → check for red errors
```

---

## Debugging Tools

### Chrome DevTools Setup

**Device Emulation:**
```
DevTools → Toggle device toolbar (Ctrl+Shift+M)
Select device from dropdown → Test
```

**Responsive Mode:**
```
DevTools → Toggle responsive design (Ctrl+Shift+M)
Manually set width/height
Test different breakpoints
```

**Performance Profiling:**
```
DevTools → Performance tab
Click Record → play game for 30s → Stop
Look for red bars (jank)
Check Main thread usage
```

**Network Throttling:**
```
DevTools → Network tab
Throttle: "Fast 3G" or "Slow 3G"
Simulate slow networks
Check if game still loads
```

### Remote Debugging

**Chrome Remote Debugging (Android):**
```bash
# Enable USB debugging on Android device
# Connect via USB cable

# On desktop:
# Chrome → Settings → More tools → Remote devices
# Port forward localhost:8000
# Access http://localhost:8000 on phone
```

**iOS Debugging (requires Mac):**
```
Safari → Develop → [Your Device] → [Open page]
Inspect web page from Mac
```

---

## Common Issues & Fixes

### Issue 1: Game doesn't fill screen on mobile

**Symptoms:**
- Gray bars on sides or top/bottom
- Game centered but not fullscreen

**Cause:** Fixed game dimensions (900x650) not scaling

**Fix:**
```css
/* game-page-v2.css handles this, but verify: */
#game-container {
  width: min(95vw, 1200px);
  height: min(95vh, 900px);
}

@media (max-width: 768px) {
  #game-container {
    width: 100vw;
    height: 100dvh;
  }
}
```

### Issue 2: Text too small to read

**Symptoms:**
- Must pinch-zoom to read text
- Text appears blurry

**Cause:** Fixed font size (e.g., `fontSize: '18px'`)

**Fix:**
```javascript
// Phaser:
const fontSize = getResponsiveFontSize(scene, 18);

// DOM:
font-size: clamp(14px, 2.5vw, 18px);
```

### Issue 3: Buttons too small to tap

**Symptoms:**
- Can't reliably tap buttons
- Taps register but hit nearby button instead

**Cause:** Button < 44px height/width

**Fix:**
```css
button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;  /* Space inside */
  margin: 8px;         /* Space outside */
}
```

### Issue 4: Soft keyboard hides input

**Symptoms:**
- On Android, keyboard appears over input field
- Can't see what you're typing

**Cause:** Input not scrolled into view

**Fix:**
```javascript
// DOM games:
const input = document.getElementById('my-input');
input.addEventListener('focus', () => {
  input.scrollIntoView({ behavior: 'smooth' });
});

// Phaser games: Consider dismissing keyboard before game interaction
```

### Issue 5: Horizontal scrolling on mobile

**Symptoms:**
- Can scroll left/right on screen
- Content extends beyond viewport

**Cause:** Content wider than viewport

**Fix:**
```css
body {
  width: 100vw;      /* Prevent overflow */
  overflow-x: hidden;
}

#game-container {
  max-width: 100vw;
  overflow: hidden;
}
```

### Issue 6: Layout breaks in landscape

**Symptoms:**
- Buttons overlap
- Text cuts off
- Layout looks broken

**Cause:** No landscape-specific styles

**Fix:**
```css
/* Phaser: game-page-v2.css handles it */

/* DOM: Add landscape rules */
@media (orientation: landscape) {
  .dom-nav {
    padding: 8px 12px;  /* Smaller nav */
  }

  .dom-screen {
    padding: 12px 8px;  /* Reduced padding */
  }
}
```

### Issue 7: Safe area not respected (notch/home button)

**Symptoms:**
- Content hidden under notch
- Home indicator overlaps content

**Cause:** Not using `env(safe-area-inset-*)`

**Fix:**
```css
/* Viewport meta tag */
<meta name="viewport" content="viewport-fit=cover">

/* CSS */
.dom-nav {
  padding-top: max(env(safe-area-inset-top), 12px);
  padding-left: max(env(safe-area-inset-left), 12px);
}

.back-link {
  top: max(env(safe-area-inset-top), 8px);
  left: max(env(safe-area-inset-left), 8px);
}
```

### Issue 8: Audio doesn't play on mobile

**Symptoms:**
- Audio works on desktop
- Silent on phone

**Cause:** iOS requires user interaction before audio

**Fix:**
```javascript
// Require user interaction before first audio
let audioInitialized = false;

function ensureAudioContext() {
  if (!audioInitialized && this.sound) {
    this.sound.unlock();  // Phaser built-in
    audioInitialized = true;
  }
}

// Call after first user interaction:
scene.input.on('pointerdown', ensureAudioContext);
```

### Issue 9: Memory grows unbounded

**Symptoms:**
- Game smooth for 5 min
- Gets slower after 10 min
- Eventually crashes

**Cause:** Objects not being destroyed

**Fix:**
```javascript
// Always clean up:
scene.events.on('shutdown', () => {
  // Destroy game objects
  this.particles.emitters.each(emitter => emitter.stop());
  this.tweens.killAll();
  this.children.removeAll();
});
```

### Issue 10: Double-tap zoom breaks interaction

**Symptoms:**
- Pinch-to-zoom works
- Double-tap zooms and breaks game

**Cause:** Not disabled in viewport meta tag

**Fix:**
```html
<meta name="viewport" content="
  width=device-width,
  initial-scale=1.0,
  maximum-scale=1.0,
  user-scalable=no
">
```

---

## Quick Reference

### Checklist Template (Copy & Use)

```markdown
## Game: [GAME NAME]

### Environment
- [ ] Device: [model]
- [ ] OS: [iOS/Android]
- [ ] Browser: [Chrome/Safari/etc]
- [ ] Orientation: [Portrait/Landscape]
- [ ] Screen size: [WxH]

### Visual
- [ ] No horizontal scroll
- [ ] Text readable without zoom
- [ ] All buttons visible
- [ ] Images load correctly
- [ ] Spacing looks intentional

### Interaction
- [ ] All buttons responsive
- [ ] Touch targets >= 44px
- [ ] No lag on tap
- [ ] Navigation works
- [ ] State preserved on rotate

### Performance
- [ ] Loads in < 2s
- [ ] Smooth gameplay (60 FPS)
- [ ] No crashes after 5 min
- [ ] Memory stable

### Issues Found
- [ ] [Issue 1] → [Status: Fixed/Pending]
- [ ] [Issue 2] → [Status: Fixed/Pending]

### Sign-off
- Tester: [Name]
- Date: [YYYY-MM-DD]
- Status: [PASS/FAIL]
```

---

## Next Steps

1. **Audit all 11 games** using this framework
2. **Document findings** in GAME_AUDIT_REPORT.md
3. **Fix critical issues** (mobile-breaking bugs)
4. **Create game template** with responsive design built-in

---

## References

- **Viewport Meta Tag Spec**: https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag
- **Safe Area**: https://webkit.org/blog/7929/designing-websites-for-iphone-x/
- **Core Web Vitals**: https://web.dev/vitals/
- **Touch Target Size**: https://www.nngroup.com/articles/touch-target-size/
- **Phaser Scale Manager**: https://photonengine.com/en/PUN2/Documentation/PUN-Basics
- **Game-page-v2.css**: `C:\Abhi\Projects\Sri\Doodles\shared\game-page-v2.css`
- **CLAUDE.md**: `C:\Abhi\Projects\Sri\Doodles\CLAUDE.md`


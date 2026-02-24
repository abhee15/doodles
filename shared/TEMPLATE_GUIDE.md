# Doodles Games - Template & Design System Guide

This guide explains how to use the professional game template system to create consistent, responsive games that work perfectly on all devices.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [File Structure](#file-structure)
3. [Using the Game Configuration Template](#using-the-game-configuration-template)
4. [Responsive Design Best Practices](#responsive-design-best-practices)
5. [Color Palette & Typography](#color-palette--typography)
6. [Common Issues & Solutions](#common-issues--solutions)
7. [Migration Guide](#migration-guide)

---

## Quick Start

### For New Games

1. **Copy the template HTML:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
    />
    <title>Your Game Title | Doodles Games</title>

    <!-- Use the new CSS template -->
    <link rel="stylesheet" href="../../shared/game-page-v2.css" />

    <!-- Phaser 3 -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  </head>
  <body>
    <a href="../../index.html" class="back-link">← Back</a>
    <div id="game-container"></div>

    <!-- Shared configuration -->
    <script src="../../shared/game-config.js"></script>
    <script src="../../shared/design-system.js"></script>

    <!-- Your game -->
    <script src="game.js"></script>
  </body>
</html>
```

2. **Use the configuration template in your game.js:**

```javascript
// Import design system (if using modules)
// const { COLORS, TYPOGRAPHY } = require('../../shared/design-system');

// Create responsive game configuration
const config = createGameConfig({
  width: 900, // Design width
  height: 650, // Design height
  backgroundColor: COLORS.neutral.lightBgAlt.phaser,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
});

const game = new Phaser.Game(config);

function create() {
  const center = getCenterPosition(this);

  // Use responsive positioning
  const title = this.add
    .text(center.x, center.y - 100, 'Game Title', TYPOGRAPHY.phaserStyles.heading)
    .setOrigin(0.5);

  // Setup responsive resize handling
  setupResponsiveResize(this, (width, height) => {
    // Handle resize if needed
    console.log('Game resized:', width, height);
  });
}
```

---

## File Structure

```
doodles/
├── shared/
│   ├── game-page-v2.css        # New responsive CSS template
│   ├── game-config.js          # Phaser configuration helpers
│   ├── design-system.js        # Colors, typography, layouts
│   ├── TEMPLATE_GUIDE.md       # This file
│   └── game-page.css           # Legacy CSS (deprecated)
├── games/
│   └── your-game/
│       ├── index.html          # Uses template
│       └── game.js             # Your game code
```

---

## Using the Game Configuration Template

### Basic Configuration

```javascript
const config = createGameConfig({
  width: 900,
  height: 650,
  backgroundColor: 0xf5f7fa,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
});
```

### With Physics

```javascript
const config = createGameConfig({
  width: 800,
  height: 600,
  backgroundColor: 0x1a1a2e,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: { preload, create, update }
});
```

---

## Responsive Design Best Practices

### ✅ DO

1. **Use responsive positioning helpers:**

```javascript
// Get percentage-based position
const pos = getResponsivePosition(this, 50, 30); // 50% x, 30% y
this.add.text(pos.x, pos.y, 'Text');

// Or use center helper
const center = getCenterPosition(this);
this.add.text(center.x, center.y, 'Centered').setOrigin(0.5);
```

2. **Use the design system colors:**

```javascript
// ✅ Good - consistent, accessible colors
this.add.rectangle(100, 100, 200, 50, COLORS.primary.phaser);
this.add.text(100, 100, 'Text', {
  fontSize: '24px',
  fill: COLORS.neutral.darkText.hex
});
```

3. **Use responsive font sizes:**

```javascript
const fontSize = getResponsiveFontSize(this, 24); // Scales with screen
this.add.text(x, y, 'Text', { fontSize: fontSize });
```

4. **Handle resize events:**

```javascript
function create() {
  setupResponsiveResize(this, (width, height) => {
    // Reposition elements when window resizes
    mySprite.x = width / 2;
    mySprite.y = height / 2;
  });
}
```

### ❌ DON'T

1. **Don't use hardcoded positions without calculating from screen size:**

```javascript
// ❌ Bad - breaks on different screen sizes
this.add.text(450, 325, 'Text'); // Assumes 900x650 screen

// ✅ Good - responsive
const center = getCenterPosition(this);
this.add.text(center.x, center.y, 'Text').setOrigin(0.5);
```

2. **Don't use poor contrast colors:**

```javascript
// ❌ Bad - white text on light background (blurry/hard to read)
this.add.text(x, y, 'Text', { fill: '#FFFFFF' }); // on light bg

// ✅ Good - use design system colors
this.add.text(x, y, 'Text', {
  fill: COLORS.neutral.darkText.hex // Dark text on light bg
});
```

3. **Don't override canvas sizing in CSS:**

```javascript
// ❌ Bad - fights with Phaser's scaling
canvas { width: 100vw !important; }  // Don't do this!

// ✅ Good - let Phaser handle it with FIT mode
// Just size the container properly
```

---

## Color Palette & Typography

### Using the Design System

#### Colors

```javascript
// Semantic colors
COLORS.primary.phaser; // Main brand color
COLORS.success.phaser; // Green for correct answers
COLORS.error.phaser; // Red for errors

// Text colors (for crisp, readable text)
COLORS.neutral.darkText.hex; // Dark text on light backgrounds
COLORS.neutral.lightText.hex; // Light text on dark backgrounds
COLORS.neutral.darkTextSecondary.hex; // Muted dark text

// Backgrounds
COLORS.neutral.lightBg.phaser; // White background
COLORS.neutral.darkBg.phaser; // Dark background
```

#### Typography Styles

```javascript
// Pre-configured styles for sharp text
TYPOGRAPHY.phaserStyles.heading; // Large headings (48px, bold)
TYPOGRAPHY.phaserStyles.subheading; // Subheadings (24px)
TYPOGRAPHY.phaserStyles.body; // Body text (18px)
TYPOGRAPHY.phaserStyles.button; // Button text (18px, white)
TYPOGRAPHY.phaserStyles.score; // Numbers/scores (32px, monospace)

// Usage:
this.add.text(x, y, 'Title', TYPOGRAPHY.phaserStyles.heading);
```

#### Auto-Contrast Helper

```javascript
// Automatically choose readable text color based on background
const textColor = getContrastTextColor(backgroundColor);
this.add.text(x, y, 'Text', { fill: textColor });
```

---

## Common Issues & Solutions

### Issue: Text looks blurry

**Causes:**

- Low contrast (e.g., white on light gray)
- Canvas scaling artifacts
- Sub-pixel rendering

**Solutions:**

```javascript
// ✅ Use high-contrast colors from design system
fill: COLORS.neutral.darkText.hex  // Instead of #999999

// ✅ Enable antialiasing in config (already in template)
render: {
    antialias: true,
    roundPixels: true
}

// ✅ Use stroke for extra sharpness on headings
this.add.text(x, y, 'Title', {
    ...TYPOGRAPHY.phaserStyles.heading,
    stroke: '#FFFFFF',
    strokeThickness: 2
});
```

### Issue: Game doesn't fill mobile screen

**Solution:**

- Use `game-page-v2.css` (not the old `game-page.css`)
- Ensure viewport meta tag is correct
- Use `Phaser.Scale.FIT` mode (in template)

### Issue: Layout breaks on different screen sizes

**Solution:**

```javascript
// ✅ Use responsive helpers, not fixed coordinates
const center = getCenterPosition(this);
const topLeft = getResponsivePosition(this, 10, 10);

// ✅ Handle resize events
setupResponsiveResize(this, (width, height) => {
  // Update positions when screen size changes
});
```

### Issue: Different games look inconsistent

**Solution:**

- Use `createGameConfig()` for all games
- Use colors from `COLORS` object
- Use typography styles from `TYPOGRAPHY.phaserStyles`
- Follow the template structure

---

## Migration Guide

### Migrating Existing Games to Template

1. **Update HTML file:**
   - Change CSS link to `game-page-v2.css`
   - Add scripts for `game-config.js` and `design-system.js`
   - Ensure viewport meta tag is complete

2. **Update game.js configuration:**

```javascript
// OLD
const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 650,
  parent: 'game-container',
  backgroundColor: '#F5F7FA',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 900,
    height: 650
  },
  scene: { preload, create, update }
};

// NEW
const config = createGameConfig({
  width: 900,
  height: 650,
  backgroundColor: COLORS.neutral.lightBgAlt.phaser,
  scene: { preload, create, update }
});
```

3. **Replace hardcoded colors:**

```javascript
// Find and replace:
0x4F46E5  → COLORS.primary.phaser
'#FFFFFF' → COLORS.neutral.lightText.hex
'#1E293B' → COLORS.neutral.darkText.hex
// etc.
```

4. **Update text styles:**

```javascript
// OLD
this.add.text(x, y, 'Title', {
  fontSize: '48px',
  fill: '#4F46E5',
  fontFamily: 'Arial',
  fontStyle: 'bold'
});

// NEW
this.add.text(x, y, 'Title', TYPOGRAPHY.phaserStyles.heading);
```

5. **Add responsive positioning:**

```javascript
// Replace hardcoded 450, 325 (center of 900x650)
// With:
const center = getCenterPosition(this);
this.add.text(center.x, center.y, 'Text').setOrigin(0.5);
```

---

## Best Practices Summary

### Design

- ✅ Use design system colors for consistency
- ✅ High contrast text (dark on light, light on dark)
- ✅ Consistent spacing and layouts
- ✅ Mobile-first thinking

### Code

- ✅ Use `createGameConfig()` template
- ✅ Responsive positioning helpers
- ✅ Handle resize events
- ✅ Percentage-based layouts

### Performance

- ✅ Enable antialiasing and roundPixels
- ✅ Optimize text rendering
- ✅ Target 60 FPS

### Accessibility

- ✅ Proper color contrast (WCAG AA)
- ✅ Readable font sizes
- ✅ Touch-friendly hit areas on mobile

---

## Support

For questions or issues with the template system:

1. Check this guide first
2. Review example implementation in a recently created game
3. Test on multiple devices (desktop, mobile, tablet)

---

## Version History

- **v2.0** (2026-02-14): Complete redesign with responsive template system
- **v1.0**: Original individual game implementations

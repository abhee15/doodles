# Doodles — Developer Conventions Guide

This document defines the conventions every game in this repo must follow.
Read it before adding or modifying any game.

---

## 1. Repository Structure

```
/
├── index.html              # Portal (game picker)
├── sitemap.xml
├── css/
│   └── portal.css          # Portal-only styles
├── shared/
│   ├── game-page-v2.css    # Mandatory shell CSS for all games
│   ├── game-config.js      # Phaser config helper (Canvas/Phaser games)
│   ├── design-system.js    # Design tokens for Phaser games
│   ├── ui-components.js    # Shared Phaser UI components (createButton, etc.)
│   ├── analytics.js        # Page-view / event tracking
│   └── ads.js              # Ad slot initialisation
└── games/
    └── <game-id>/
        ├── index.html
        ├── game.js         # All game logic (no inline scripts in HTML)
        └── ...             # Additional JS/asset files as needed
```

---

## 2. Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Game folder | `kebab-case` | `math-ladder`, `body-map` |
| Game card `id` | same as folder | `id="math-ladder"` |
| Game JS file | `game.js` | `games/math-ladder/game.js` |
| Auxiliary data | descriptive name | `planet-data.js` |
| No backup files | never commit `.backup` files | — |

---

## 3. Mandatory HTML `<head>` Checklist

Every `games/<id>/index.html` must have, in this order:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0,
      maximum-scale=1.0, user-scalable=no, viewport-fit=cover">

<!-- Primary Meta Tags -->
<title>Game Name - Description for Kids | Doodles Games</title>
<meta name="title" content="Game Name - Short Description">
<meta name="description" content="One or two sentences describing the game.">
<meta name="keywords" content="relevant, keywords, here">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="game">
<meta property="og:url" content="https://abhee15.github.io/doodles/games/<id>/">
<meta property="og:title" content="Game Name - Short Description">
<meta property="og:description" content="Same or similar to meta description.">

<!-- Twitter -->
<meta property="twitter:card" content="summary">
<meta property="twitter:url" content="https://abhee15.github.io/doodles/games/<id>/">
<meta property="twitter:title" content="Game Name - Short Description">
<meta property="twitter:description" content="Same or similar to meta description.">

<link rel="canonical" href="https://abhee15.github.io/doodles/games/<id>/">

<link rel="stylesheet" href="../../shared/game-page-v2.css">
```

**Title format:** `Game Name - Description for Kids | Doodles Games`
- Use a hyphen (`-`), not an em dash (`—`)
- Include "for Kids" in the description part
- Always end with `| Doodles Games`

**Google Fonts preconnect** (only if loading a Google Font):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
Both `<link rel="preconnect">` tags require the `crossorigin` attribute.

---

## 4. Mandatory `<body>` Checklist

### 4a. Canvas / Phaser games

```html
<body>
  <a href="../../index.html#<game-id>" class="back-link">← Back</a>
  <div id="game-container"></div>

  <script src="../../shared/analytics.js"></script>
  <div id="ad-container"></div>
  <script src="../../shared/ads.js"></script>
  <script src="../../shared/game-config.js"></script>
  <script src="../../shared/design-system.js"></script>
  <script src="../../shared/ui-components.js"></script>
  <script src="game.js"></script>
</body>
```

### 4b. DOM games (Body Map pattern)

```html
<body>
  <nav class="nav">
    <a href="../../index.html#<game-id>"><i class="ph-bold ph-arrow-left"></i> Back</a>
    ...
  </nav>

  <!-- game HTML here -->

  <script src="game.js"></script>
  <script src="../../shared/analytics.js"></script>
  <div id="ad-container"></div>
  <script src="../../shared/ads.js"></script>
</body>
```

**Rules:**
- Back link text is always `← Back` (or icon + "Back" for DOM games)
- Back link `href` anchors to the game card: `../../index.html#<game-id>`
- Never put game logic in inline `<script>` tags — use `game.js`
- `analytics.js` and `ads.js` are always loaded, always at the end of `<body>`

---

## 5. Two Game Archetypes

### Archetype A — Canvas / Phaser

Used by: Math Ladder, Number Ninja, Quick Math, Measure Master, World Explorer,
Earth Explorer, Dino Hunter, Planet Quest (Solar System)

- Uses `shared/game-page-v2.css` for layout
- Uses `Phaser.Game` with `createGameConfig()` from `game-config.js`
- Canvas fills `#game-container`
- Back link is absolutely positioned over the canvas (`.back-link`)
- Shared UI components from `ui-components.js` (`createButton`, `createCard`, etc.)
  - **Note:** if a game defines a local `createButton` with a different signature,
    rename it to avoid collision (e.g. `createMapButton` in Earth Explorer)

### Archetype B — DOM / HTML

Used by: Body Map

- Full-page HTML layout, not canvas-based
- Custom `<nav>` bar replaces the floating `.back-link`
- `shared/game-page-v2.css` is NOT used (the game has its own styles)
- All JS logic lives in `game.js`

---

## 6. How to Add a New Game

1. **Create the folder:** `games/<game-id>/`
2. **Create `index.html`** following the full head + body checklist above.
3. **Create `game.js`** — no inline scripts in HTML.
4. **Add a game card** to `index.html` (portal):
   - Add an `<a class="game-card" href="games/<game-id>/index.html" id="<game-id>">` in the correct `<section data-cat="...">`.
   - Add a CSS gradient variable `--grad-<id>` and a `.thumb.<id>` rule in `css/portal.css`.
5. **Add to the footer** in the appropriate column.
6. **Add to `sitemap.xml`** with `<lastmod>` = today, `<changefreq>monthly`, `<priority>0.8`.
7. **Update the nav counter** in `index.html`: `<span class="nav-count">N games · M subjects</span>` — see the `<!-- UPDATE THIS when adding games -->` comment.

---

## 7. Color / Theme Guidance

Each game has a unique gradient defined in `css/portal.css` under `:root`:

```css
--grad-<id>: linear-gradient(145deg, #COLOR1 0%, #COLOR2 100%);
```

Game page backgrounds use CSS variables in `game-page-v2.css`:
```css
--game-bg-start  (default: #A8DADA)
--game-bg-end    (default: #3D9E9E)
```

Override them in the game's own `<style>` block if needed.

**No box-shadows** — the design is flat. Use borders or blur/glass effects for depth.

---

## 8. Breakpoint Standards

From `shared/game-page-v2.css`:

| Breakpoint | Target |
|-----------|--------|
| `max-width: 768px` | Mobile (full-viewport canvas, no border-radius) |
| `min-width: 769px` and `max-width: 1024px` | Tablet (92vw × 92vh) |
| `max-width: 768px` + `orientation: landscape` | Landscape mobile |

From `css/portal.css`:

| Breakpoint | Target |
|-----------|--------|
| `max-width: 600px` | Small mobile card sizing |
| `max-width: 900px` | Footer 2-column grid |
| `max-width: 480px` | Footer 1-column, filter bar horizontal scroll |

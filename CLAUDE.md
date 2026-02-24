# Doodles — Developer Conventions Guide

This document defines the conventions every game in this repo must follow.
Read it before adding or modifying any game.

> **New!** See [FRAMEWORK_STANDARDS.md](FRAMEWORK_STANDARDS.md) for comprehensive framework design, consistency checklist, and automated auditing tools.

---

## 1. Repository Structure

```
/
├── index.html              # Portal (game picker)
├── sitemap.xml
├── css/
│   └── portal.css          # Portal-only styles
├── shared/
│   ├── tokens.css          # Design token primitives (--tok-* variables)
│   ├── game-page-v2.css    # Mandatory shell CSS for Phaser games (Archetype A)
│   ├── game-dom.css        # Mandatory shell CSS for DOM games (Archetype B)
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

**DOM games only:** Load shared design system before your `<style>` block:
```html
<link rel="stylesheet" href="../../shared/tokens.css">
<link rel="stylesheet" href="../../shared/game-dom.css">
<style>
  /* Game-specific styles here */
</style>
```

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
<head>
  ...
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css">
  <link rel="stylesheet" href="../../shared/tokens.css">
  <link rel="stylesheet" href="../../shared/game-dom.css">
</head>

<body>
  <nav class="dom-nav">
    <a href="../../index.html#<game-id>"><i class="ti ti-arrow-left"></i> Back</a>
    <span class="dom-nav-title" id="nav-title">Game Name</span>
    <span class="dom-nav-meta" id="nav-meta"></span>
  </nav>

  <div class="dom-screen active">
    <!-- game HTML here -->
  </div>

  <script src="game.js"></script>
  <script src="../../shared/analytics.js"></script>
  <div id="ad-container"></div>
  <script src="../../shared/ads.js"></script>
</body>
```

**Rules:**
- Use `class="dom-nav"` for the nav bar, `class="dom-nav-title"` for title, `class="dom-nav-meta"` for status text
- Use `class="dom-screen"` and `class="dom-screen active"` for screen containers
- Use `class="dom-btn dom-btn--primary"` and related button variants (see `shared/game-dom.css`)
- Tabler Icons CDN: **pinned to major version `@3`** (not `@latest`) to prevent unexpected breakage
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

Used by: Body Map, Doodle School

- Full-page HTML layout, not canvas-based
- Uses `shared/game-dom.css` as mandatory shell CSS (provides nav, screens, buttons, cards)
- Loads `shared/tokens.css` for design token primitives
- `shared/game-page-v2.css` is NOT used
- All JS logic lives in `game.js`
- Games override `--dom-*` variables in their own `<style>` block for custom theming

---

## 6. How to Add a New Game

1. **Create the folder:** `games/<game-id>/`
2. **Create `index.html`** following the full head + body checklist above.
3. **Create `game.js`** — no inline scripts in HTML.
4. **Add to the manifest:** Add a `GAMES` entry to `games-manifest.js`:
   - The portal automatically renders game cards, filter pill counts, footer links, and section counters from this entry.
   - See Section 10 for the full schema.
5. **Add to `sitemap.xml`** with `<lastmod>` = today, `<changefreq>monthly`, `<priority>0.8`.

**That's it!** The portal, filter pills, footer, and counters all update automatically. No HTML or CSS changes needed.

---

## 7. Color / Theme Guidance

### Design System Token Tiers

Three naming conventions for different scopes:

| Tier | Prefix | Usage | Example |
|------|--------|-------|---------|
| **Primitives** | `--tok-*` | Single source of truth, never overridden | `--tok-blue: #1CB0F6` |
| **Phaser Overrides** | `--game-bg-*` | Per-game background in Phaser games | `--game-bg-start: #A8DADA` |
| **DOM Overrides** | `--dom-*` | Per-game theming in DOM games | `--dom-accent: #F472B6` |

### Phaser Games (Archetype A)

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

### DOM Games (Archetype B)

Override shell variables in your `<style>` block `:root`:
```css
:root {
  --dom-nav-bg:    #0A2424;        /* Your nav color */
  --dom-accent:    #F5C518;        /* Your primary action color */
  --dom-accent2:   #4CAF50;        /* Your secondary action color */
  --dom-bg:        #0D1B2A;        /* Your background */
  --dom-border:    rgba(255,255,255,0.12);  /* Your borders */
  /* ... etc */
}
```

**No box-shadows** — the design is flat. Use borders, `border-color` on hover, `transform`, or `backdrop-filter` for depth.

---

## 8. Breakpoint Standards

From `shared/game-page-v2.css` (Phaser games):

| Breakpoint | Target |
|-----------|--------|
| `max-width: 768px` | Mobile (full-viewport canvas, no border-radius) |
| `min-width: 769px` and `max-width: 1024px` | Tablet (92vw × 92vh) |
| `max-width: 768px` + `orientation: landscape` | Landscape mobile |

From `shared/game-dom.css` (DOM games):

| Breakpoint | Target |
|-----------|--------|
| `max-width: 768px` | Mobile (stacked layouts, reduced font sizes) |

From `css/portal.css` (Portal only):

| Breakpoint | Target |
|-----------|--------|
| `max-width: 600px` | Small mobile card sizing |
| `max-width: 900px` | Footer 2-column grid |
| `max-width: 480px` | Footer 1-column, filter bar horizontal scroll |

---

## 9. Box-Shadow Policy

**No `box-shadow` property is allowed in any game CSS.** The design system uses a flat aesthetic.

### Approved Alternatives for Creating Depth

| Effect | Method | Example |
|--------|--------|---------|
| **Card/button elevation on hover** | `border-color` change + `transform: translateY()` | See `.dom-card--interactive` in `game-dom.css` |
| **Floating/lifted effect** | `transform: translateY(-2px)` | Buttons on hover/active |
| **Depth on dark backgrounds** | `border: 1px solid rgba(255,255,255,0.15)` | Modal overlays |
| **SVG icon depth** | `filter: drop-shadow()` (filter only, not box-shadow) | SVG zone highlights (body-map) |
| **Modal prominence** | `backdrop-filter: blur()` + thin border | Modals over page background |
| **Focus/selection indication** | `border-color` change | Form inputs, game cards |

### Why No Box-Shadows?

- Box-shadows are harder to control across different screen densities
- They don't match the flat, playful design language
- Border and transform changes are more predictable and performant
- Backdrop filters provide modal hierarchy without visual clutter

**Enforcement:** Grep for `box-shadow` in all `.css` files — should return zero results.

---

## 10. Framework Standards & Consistency Tools

**See [FRAMEWORK_STANDARDS.md](FRAMEWORK_STANDARDS.md) for:**
- Navigation Architecture Standard (back button always goes to logical parent)
- Shared Navigation Component (`shared/navigation.js`)
- Game Structure Standard (HTML/JS patterns)
- **Consistency Audit Checklist** — verify before every commit
- **Automated Audit Tool** — run `npm run audit` to catch inconsistencies
- Kid-Friendly UX Checklist (font sizes, button targets, color contrast)
- Shared Utilities Library (reusable components)
- Code examples and templates

**Key principle:** The back button should never skip levels. Quick Math module → back goes to technique picker, not portal. Draw It step → back goes to game landing, not portal.

---

## 11. Games Manifest Schema

The portal is entirely driven by two global objects: `CATEGORIES` and `GAMES` (defined in `games-manifest.js`).

### CATEGORIES Array

Each category object has:

| Field | Type | Example |
|-------|------|---------|
| `id` | string | `'math'` |
| `label` | string | `'Math & Numbers'` |
| `color` | hex color | `'#BF360C'` |
| `footerHeading` | string | `'Math & Numbers'` |

The portal renders one filter pill per category (plus an "All Games" pill), and one footer column per category.

### GAMES Array

Each game object has:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | **Unique.** Must match folder name and HTML id. | `'math-ladder'` |
| `name` | string | Display name on card and footer. | `'Math Ladder'` |
| `category` | string | Must match a category `id` from CATEGORIES. | `'math'` |
| `desc` | string | Card description (HTML entities OK). | `'Climb rung by rung...'` |
| `icon` | string | Tabler icon class. | `'ti-stairs'` |
| `iconColor` | string or null | Icon color (hex). Null = white. | `'#F5C518'` or `null` |
| `gradient` | string | Full CSS linear-gradient for thumbnail. | `'linear-gradient(150deg, #FF7043 0%, #BF360C 100%)'` |
| `pattern` | string or null | Optional CSS background pattern (::before pseudo-element). | `'repeating-linear-gradient(...)'` or `null` |
| `patternSize` | string or null | `background-size` if needed. | `'20px 20px'` or `null` |
| `patternPosition` | string or null | `background-position` if needed. | `'0 0, 10px 15px'` or `null` |
| `thumbClass` | string or null | CSS class for .thumb (null = use inline gradient). | `'ninja'` or `null` |
| `newUntil` | ISO date string or null | Show "New" badge until this date (checked at render time). | `'2026-04-01'` or `null` |
| `footerName` | string | Link text in footer (may differ from `name`). | `'Planet Quest'` |

**Notes:**
- If `thumbClass` is null (e.g. Body Map), the gradient is applied inline to the `.thumb` div.
- If `thumbClass` is set, `portal.js` injects CSS rules for `.thumb.{thumbClass}` and (if pattern exists) `.thumb.{thumbClass}::before`.
- `newUntil` is compared to the current date on render. Example: if today is 2026-02-24 and `newUntil: '2026-04-01'`, the badge shows.
- All game links in the portal anchor to `games/{id}/index.html`.

### portal.js Functions

| Function | Purpose |
|----------|---------|
| `injectThumbStyles()` | Generates CSS rules for all games with `thumbClass` |
| `renderCards()` | Populates `.cards-row` divs with game card HTML |
| `updateNavCount()` | Sets nav counter to "N games · M subjects" |
| `updateSectionCounts()` | Updates each `.sec-count` span with category game count |
| `renderFilterPills()` | Builds filter pill buttons and attaches listeners |
| `renderFooter()` | Builds footer columns from CATEGORIES |
| `attachFilterListeners()` | Handles pill clicks to show/hide sections |

All functions run on `DOMContentLoaded`.

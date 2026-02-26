# Adding a New Game to Doodles - Complete Guide

This guide ensures consistency and prevents bugs when adding new games. Follow these steps in order.

## Step 1: Add Category (if new)

If your game is in a NEW category, add it to `games-manifest.js`:

```javascript
{
  id: 'category-id',           // kebab-case, lowercase
  label: 'Category Name',       // Display name
  icon: 'ti-icon-name',         // Tabler icon (required!)
  color: '#HEXCOLOR',           // Hex color for visual consistency
  footerHeading: 'Footer Title' // Footer column heading
}
```

**Icon Selection:**

- Browse Tabler Icons: https://tabler-icons.io
- Use consistent icons (e.g., learning = ti-brain, geography = ti-world)
- Set in CATEGORIES manifest - no hardcoding in portal.js!

## Step 2: Add Game to Manifest

In `games-manifest.js`, add to GAMES array:

```javascript
{
  id: 'game-id',                    // kebab-case, unique
  name: 'Game Name',                // Display name
  category: 'category-id',          // Must match a CATEGORIES id
  desc: 'One-sentence description', // Brief description
  icon: 'ti-icon-name',             // Game card icon
  iconColor: '#HEXCOLOR' or null,   // Icon color or null for white
  gradient: 'linear-gradient(...)', // CSS gradient for card
  pattern: 'repeating-...' or null, // CSS pattern (optional)
  patternSize: '20px 20px' or null, // Pattern size
  patternPosition: '0 0' or null,   // Pattern position
  thumbClass: 'game-id' or null,    // CSS class for custom styling
  newUntil: 'YYYY-MM-DD' or null,   // Show "New" badge (or null)
  footerName: 'Footer Link Name'    // Footer link text
}
```

## Step 3: Create Game Folder & Files

```
games/<game-id>/
├── index.html          (REQUIRED - must follow template)
├── game.js             (REQUIRED - all game logic)
└── [other files]       (CSS, data files, etc.)
```

## Step 4: HTML Checklist

Every `games/<id>/index.html` must have:

- [ ] `<meta charset="UTF-8" />`
- [ ] Viewport meta tag with `viewport-fit=cover`
- [ ] Title: `Game Name - Description for Kids | Doodles Games`
- [ ] Meta tags: title, description, keywords
- [ ] OG tags: og:type, og:url, og:title, og:description
- [ ] Twitter tags: twitter:card, twitter:url, twitter:title
- [ ] `<link rel="canonical">`
- [ ] Correct CSS/JS imports for game type:
  - **Phaser games:** `shared/game-page-v2.css`
  - **DOM games:** `shared/tokens.css`, `shared/game-dom.css`
- [ ] Back link: `<a href="../../index.html#<game-id>">`
- [ ] Analytics & ads scripts at end of body
- [ ] No inline scripts - all logic in game.js

## Step 5: Add to Sitemap

Update `sitemap.xml`:

```xml
<url>
  <loc>https://abhee15.github.io/doodles/games/<game-id>/</loc>
  <lastmod>2026-02-26</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## Step 6: Verify Everything

Run the audit tool:

```bash
npm run audit
```

This checks:

- ✓ Game exists in manifest
- ✓ Manifest has all required fields
- ✓ Category exists
- ✓ Icon is specified (not hardcoded!)
- ✓ Folder and index.html exist
- ✓ Game in sitemap
- ✓ No duplicate IDs
- ✓ Links are correct

## Architecture Improvements

**Single Source of Truth:**

- All category info (including icons) → CATEGORIES in manifest
- All game info → GAMES in manifest
- Portal.js reads from manifest, NO hardcoding
- Filter pills auto-render from manifest
- CSS auto-generates from manifest colors

**Why This Matters:**

- ❌ Old way: Add icon in 3+ places → bugs when one is missed
- ✅ New way: Add icon in CATEGORIES → everywhere updates automatically

## Testing Checklist

Before committing:

```bash
# 1. Run linter
npm run lint

# 2. Run audit
npm run audit

# 3. Manual testing:
```

- [ ] Game loads without errors
- [ ] Back button works correctly
- [ ] Filter pill shows correct icon
- [ ] Section header shows correct icon
- [ ] Card displays in portal
- [ ] Footer link appears
- [ ] Mobile responsive (test at 480px, 768px)
- [ ] No unnecessary scrollbars

## Common Mistakes to Avoid

| Mistake                              | Fix                                       |
| ------------------------------------ | ----------------------------------------- |
| Category icon hardcoded in portal.js | Add icon to CATEGORIES in manifest        |
| Missing category                     | Check game.category matches CATEGORIES id |
| Duplicate game ID                    | Use unique kebab-case name                |
| Wrong HTML template                  | Copy from similar game, follow guidelines |
| Missing sitemap entry                | Run audit, it checks this                 |
| Icon not in manifest                 | Add to CATEGORIES, not portal.js          |
| Mismatched category                  | Verify game.category in GAMES array       |

## File Reference

| File                     | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `games-manifest.js`      | Master source - categories, games, colors, icons |
| `portal.js`              | Auto-renders from manifest, no hardcoding        |
| `index.html`             | Portal page, game sections auto-generated        |
| `css/portal.css`         | Styles, colors from CSS variables                |
| `scripts/audit-games.js` | Validation tool, catches inconsistencies         |

## Questions?

Refer to CLAUDE.md for game archetypes and design standards.
Run `npm run audit` to find issues automatically.
Check similar games for implementation patterns.

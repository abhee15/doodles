#!/usr/bin/env node
/**
 * Manifest & Portal Tests
 *
 * Tests the games-manifest.js data for consistency.
 * Run: node scripts/test-manifest.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ── helpers ────────────────────────────────────────────────────────────────
const pass = msg => console.log(`  ✅ ${msg}`);
const fail = (msg, detail) => {
  console.error(`  ❌ ${msg}${detail ? `: ${detail}` : ''}`);
  failed++;
};

let failed = 0;
let total = 0;

function assert(cond, msg, detail) {
  total++;
  if (cond) {
    pass(msg);
  } else {
    fail(msg, detail);
  }
}

// ── load manifest ──────────────────────────────────────────────────────────
const manifestSrc = fs.readFileSync(path.join(ROOT, 'games-manifest.js'), 'utf8');

// Strip eslint comment and const keyword so we can eval in a local scope
// Strip window assignments and eslint directives so we can eval in Node
const evalSrc = manifestSrc
  .replace(/\/\/ eslint-disable-line.*\n/g, '\n')
  .replace(/\/\/ eslint-disable-next-line.*\n/g, '\n')
  .replace(/window\.\w+\s*=\s*\w+;\s*/g, '');

let CATEGORIES, GAMES;
try {
  const fn = new Function(
    'exports',
    `${evalSrc}\nexports.CATEGORIES=CATEGORIES;\nexports.GAMES=GAMES;`
  );
  const exp = {};
  fn(exp);
  CATEGORIES = exp.CATEGORIES;
  GAMES = exp.GAMES;
} catch (e) {
  console.error('FATAL: Could not parse games-manifest.js:', e.message);
  process.exit(1);
}

// ── CATEGORIES tests ───────────────────────────────────────────────────────
console.log('\nCATEGORIES');

const categoryIds = new Set();
for (const cat of CATEGORIES) {
  assert(cat.id && typeof cat.id === 'string', 'category has id', cat.id);
  assert(cat.label && typeof cat.label === 'string', `category "${cat.id}" has label`);
  assert(!categoryIds.has(cat.id), `category id "${cat.id}" is unique`);
  categoryIds.add(cat.id);
}

// ── GAMES tests ────────────────────────────────────────────────────────────
console.log('\nGAMES');

const gameIds = new Set();
const REQUIRED_FIELDS = ['id', 'name', 'category', 'desc', 'icon', 'gradient', 'footerName'];

for (const game of GAMES) {
  const id = game.id || '(missing id)';

  // Required fields present
  for (const field of REQUIRED_FIELDS) {
    assert(game[field] !== undefined && game[field] !== '', `game "${id}" has field "${field}"`);
  }

  // ID uniqueness
  assert(!gameIds.has(game.id), `game id "${id}" is unique`);
  gameIds.add(game.id);

  // Category must match a known category
  assert(categoryIds.has(game.category), `game "${id}" category "${game.category}" exists`);

  // Folder must exist on disk
  const gameDir = path.join(ROOT, 'games', id);
  assert(fs.existsSync(gameDir), `game "${id}" folder exists on disk`);

  // index.html must exist
  const indexPath = path.join(gameDir, 'index.html');
  assert(fs.existsSync(indexPath), `game "${id}" has index.html`);
}

// ── games folder cross-check ───────────────────────────────────────────────
console.log('\nFOLDER CROSS-CHECK');

const CATEGORY_LANDING_DIRS = new Set(CATEGORIES.map(c => c.id));
const SKIP_DIRS = new Set([
  'play',
  'sel',
  'tech',
  'art',
  'logic',
  'math',
  'memory',
  'science',
  'geo',
  'words',
  'music'
]);

const gamesDirs = fs
  .readdirSync(path.join(ROOT, 'games'))
  .filter(d => !CATEGORY_LANDING_DIRS.has(d) && !SKIP_DIRS.has(d))
  .filter(d => fs.statSync(path.join(ROOT, 'games', d)).isDirectory());

for (const dir of gamesDirs) {
  assert(gameIds.has(dir), `games/${dir} folder is registered in manifest`);
}

// ── sitemap tests ──────────────────────────────────────────────────────────
console.log('\nSITEMAP');

const sitemapSrc = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
for (const id of gameIds) {
  assert(sitemapSrc.includes(`/games/${id}/`), `sitemap contains game "${id}"`);
}

// ── summary ───────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`Tests: ${total - failed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}

#!/usr/bin/env node
/**
 * Security & Style Tests
 *
 * Checks for common security issues and style violations in game code.
 * Run: node scripts/test-security.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

let failed = 0;
let total = 0;

const pass = msg => console.log(`  ✅ ${msg}`);
const fail = (msg, detail) => {
  console.error(`  ❌ ${msg}${detail ? `\n     ${detail}` : ''}`);
  failed++;
};

function assert(cond, msg, detail) {
  total++;
  if (cond) {
    pass(msg);
  } else {
    fail(msg, detail);
  }
}

function findFiles(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) {
    return results;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(full, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

// ── Security: no eval() in game code ──────────────────────────────────────
console.log('\nSECURITY: eval()');
const jsFiles = findFiles(path.join(ROOT, 'games'), '.js').concat(
  findFiles(path.join(ROOT, 'shared'), '.js')
);
for (const f of jsFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  const evalLines = lines
    .map((l, i) => ({ line: i + 1, text: l }))
    .filter(({ text }) => /\beval\s*\(/.test(text) && !text.trim().startsWith('//'));
  assert(
    evalLines.length === 0,
    `no eval() in ${path.relative(ROOT, f)}`,
    evalLines.map(e => `line ${e.line}: ${e.text.trim()}`).join('; ')
  );
}

// ── Security: no document.write() in game code ────────────────────────────
console.log('\nSECURITY: document.write()');
for (const f of jsFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  const bad = lines
    .map((l, i) => ({ line: i + 1, text: l }))
    .filter(({ text }) => /document\.write\s*\(/.test(text) && !text.trim().startsWith('//'));
  assert(
    bad.length === 0,
    `no document.write() in ${path.relative(ROOT, f)}`,
    bad.map(e => `line ${e.line}: ${e.text.trim()}`).join('; ')
  );
}

// ── Style: no box-shadow in CSS ───────────────────────────────────────────
console.log('\nSTYLE: box-shadow policy');
const cssFiles = findFiles(path.join(ROOT, 'games'), '.css')
  .concat(findFiles(path.join(ROOT, 'shared'), '.css'))
  .concat(findFiles(path.join(ROOT, 'css'), '.css'));

for (const f of cssFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  const bad = lines
    .map((l, i) => ({ line: i + 1, text: l }))
    .filter(
      ({ text }) =>
        /box-shadow\s*:/.test(text) && !text.trim().startsWith('*') && !text.trim().startsWith('//')
    );
  assert(
    bad.length === 0,
    `no box-shadow in ${path.relative(ROOT, f)}`,
    bad.map(e => `line ${e.line}: ${e.text.trim()}`).join('; ')
  );
}

// ── HTML: back links use correct pattern ──────────────────────────────────
console.log('\nHTML: back link structure');
const htmlFiles = findFiles(path.join(ROOT, 'games'), '.html');
for (const f of htmlFiles) {
  const src = fs.readFileSync(f, 'utf8');
  if (src.includes('back-link') || src.includes('dom-nav')) {
    const hasAnchor = /href="[^"]*index\.html#/.test(src) || /href="[^"]*index\.html"/.test(src);
    assert(hasAnchor, `${path.relative(ROOT, f)} has back link to portal`);
  }
}

// ── HTML: analytics.js loaded ─────────────────────────────────────────────
console.log('\nHTML: analytics.js loaded in games');
const gameIndexFiles = htmlFiles.filter(f => f.endsWith('index.html'));
for (const f of gameIndexFiles) {
  const src = fs.readFileSync(f, 'utf8');
  assert(src.includes('analytics.js'), `${path.relative(ROOT, f)} loads analytics.js`);
}

// ── HTML: error-tracker.js loaded in real games (not category landing pages) ──
console.log('\nHTML: error-tracker.js loaded in real games');

const manifestSrc2 = fs.readFileSync(path.join(ROOT, 'games-manifest.js'), 'utf8');
const evalSrc2 = manifestSrc2
  .replace(/\/\/ eslint-disable-line.*\n/g, '\n')
  .replace(/\/\/ eslint-disable-next-line.*\n/g, '\n')
  .replace(/window\.\w+\s*=\s*\w+;\s*/g, '');
let realGameIds;
try {
  const fn = new Function('exports', `${evalSrc2}\nexports.GAMES=GAMES;`);
  const exp = {};
  fn(exp);
  realGameIds = new Set(exp.GAMES.map(g => g.id));
} catch (e) {
  realGameIds = new Set();
}

for (const f of gameIndexFiles) {
  const dir = path.basename(path.dirname(f));
  if (!realGameIds.has(dir)) {
    continue;
  }
  const src = fs.readFileSync(f, 'utf8');
  assert(src.includes('error-tracker.js'), `${path.relative(ROOT, f)} loads error-tracker.js`);
}

// ── summary ───────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`Tests: ${total - failed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}

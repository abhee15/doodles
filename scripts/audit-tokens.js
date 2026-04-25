#!/usr/bin/env node
/**
 * audit-tokens.js — Design token consistency audit for Doodles
 *
 * Full audit:   node scripts/audit-tokens.js
 * Quick check:  node scripts/audit-tokens.js --quick <file.css>
 *
 * Checks:
 *   1. box-shadow policy violations (error — blocks CI)
 *   2. Hardcoded hex colors that should use --tok-* variables (warning)
 *   3. Token drift — defined tokens with no var() references (warning)
 *   4. Token naming convention compliance (warning)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOKENS_FILE = path.join(ROOT, 'shared', 'tokens.css');

const C = { R: '\x1b[31m', G: '\x1b[32m', Y: '\x1b[33m', B: '\x1b[34m', RST: '\x1b[0m' };

let errorCount = 0;
let warnCount = 0;

const log = {
  error: m => {
    console.error(`${C.R}✗${C.RST} ${m}`);
    errorCount++;
  },
  warn: m => {
    console.warn(`${C.Y}⚠${C.RST}  ${m}`);
    warnCount++;
  },
  ok: m => console.log(`${C.G}✓${C.RST} ${m}`),
  info: m => console.log(`${C.B}ℹ${C.RST} ${m}`),
  head: m => console.log(`\n${C.B}━━━ ${m} ━━━${C.RST}`)
};

// ─── Token Parsing ────────────────────────────────────────────────────────────

function parseTokens() {
  const text = fs.readFileSync(TOKENS_FILE, 'utf8');
  const tokens = {};
  const re = /--(tok-[^:\s]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    tokens[`--${m[1]}`] = m[2].trim();
  }
  return tokens;
}

// Maps primitive hex values (#rrggbb) → token name, for reverse color lookup.
// Skips semantic aliases (var(...) values) to avoid false positives.
function buildHexMap(tokens) {
  const map = {};
  for (const [name, val] of Object.entries(tokens)) {
    if (val.startsWith('var(')) {
      continue;
    }
    const hexRe = /#([0-9a-fA-F]{6})\b/g;
    let m;
    while ((m = hexRe.exec(val)) !== null) {
      const hex = `#${m[1].toLowerCase()}`;
      if (!map[hex]) {
        map[hex] = name;
      }
    }
  }
  return map;
}

// ─── File Discovery ───────────────────────────────────────────────────────────

function findFiles(dirs, ext) {
  const results = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory() && ent.name !== 'node_modules' && !ent.name.startsWith('.')) {
        walk(full);
      } else if (ent.name.endsWith(ext)) {
        results.push(full);
      }
    }
  }
  dirs.forEach(walk);
  return results;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

// ─── Check 1: box-shadow policy ───────────────────────────────────────────────

function checkBoxShadow(file, content) {
  let found = 0;
  content.split('\n').forEach((line, i) => {
    const t = line.trim();
    // Ignore comment lines and filter: drop-shadow() which is allowed
    if (t.startsWith('/*') || t.startsWith('*') || t.startsWith('//')) {
      return;
    }
    if (/box-shadow\s*:/.test(t)) {
      log.error(`box-shadow at ${rel(file)}:${i + 1}  →  replace with border-color + transform`);
      found++;
    }
  });
  return found;
}

// ─── Check 2: hardcoded hex colors ───────────────────────────────────────────

function checkHardcodedColors(file, content, hexMap) {
  if (file === TOKENS_FILE) {
    return 0;
  }

  let found = 0;
  const seen = new Set();

  content.split('\n').forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('/*') || t.startsWith('*') || t.startsWith('//')) {
      return;
    }

    // Skip intentional color override declarations (--dom-*, --game-bg-*, --grad-*)
    if (/^\s*--(dom|game-bg|grad)-\S+\s*:/.test(line)) {
      return;
    }

    const hexRe = /#([0-9a-fA-F]{6})\b/g;
    let m;
    while ((m = hexRe.exec(line)) !== null) {
      const hex = `#${m[1].toLowerCase()}`;
      const token = hexMap[hex];
      if (token) {
        const key = `${rel(file)}:${i + 1}:${hex}`;
        if (!seen.has(key)) {
          seen.add(key);
          log.warn(`Hardcoded ${hex} at ${rel(file)}:${i + 1}  →  use var(${token})`);
          found++;
        }
      }
    }
  });
  return found;
}

// ─── Check 3: token drift (unused tokens) ────────────────────────────────────

function checkTokenDrift(tokens, cssFiles) {
  // Scan CSS + shared JS for var(--tok-*) usage
  const scanFiles = [...cssFiles, ...findFiles([path.join(ROOT, 'shared')], '.js')];

  const combined = scanFiles
    .map(f => {
      try {
        return fs.readFileSync(f, 'utf8');
      } catch {
        return '';
      }
    })
    .join('\n');

  // A token is "used" if var(--tok-name) appears anywhere (includes alias chains in tokens.css)
  return Object.keys(tokens).filter(name => !combined.includes(`var(${name})`));
}

// ─── Check 4: naming convention validation ────────────────────────────────────

const VALID_TOKEN_PATTERNS = [
  /^--tok-(blue|orange|green|red)(-(dark|light))?$/,
  /^--tok-white$/,
  /^--tok-gray-(50|100|200|300|400|500|600|700|800|900)$/,
  /^--tok-color-(primary|secondary|success|danger)$/,
  /^--tok-text-(primary|secondary|light|disabled)$/,
  /^--tok-bg-(white|soft|border)$/,
  /^--tok-font$/,
  /^--tok-space-\d+$/,
  /^--tok-radius-(sm|md|lg|xl|2xl|pill)$/,
  /^--tok-transition-(fast|normal|slow)$/,
  /^--tok-touch-min$/
];

function validateTokenNames(tokens) {
  return Object.keys(tokens).filter(name => !VALID_TOKEN_PATTERNS.some(re => re.test(name)));
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const quickIndex = args.indexOf('--quick');

if (quickIndex !== -1) {
  // Quick mode: box-shadow + hardcoded color check on a single file
  const targetFile = args[quickIndex + 1];
  if (!targetFile || !fs.existsSync(targetFile)) {
    process.exit(0);
  }

  const absTarget = path.resolve(targetFile);
  const content = fs.readFileSync(absTarget, 'utf8');
  const tokens = parseTokens();
  const hexMap = buildHexMap(tokens);

  checkBoxShadow(absTarget, content);
  checkHardcodedColors(absTarget, content, hexMap);

  if (errorCount + warnCount === 0) {
    log.ok(`${path.basename(absTarget)} passes token checks`);
  }
  process.exit(errorCount > 0 ? 1 : 0);
}

// Full audit mode
log.head('Doodles Token Audit');

const tokens = parseTokens();
const hexMap = buildHexMap(tokens);
log.info(
  `${Object.keys(tokens).length} tokens · ${Object.keys(hexMap).length} unique primitive colors`
);

const cssFiles = findFiles(
  [path.join(ROOT, 'shared'), path.join(ROOT, 'css'), path.join(ROOT, 'games')],
  '.css'
);
log.info(`Scanning ${cssFiles.length} CSS files\n`);

log.head('1 · Box-Shadow Policy');
const bsTotal = cssFiles.reduce((n, f) => n + checkBoxShadow(f, fs.readFileSync(f, 'utf8')), 0);
if (bsTotal === 0) {
  log.ok('No box-shadow violations');
}

log.head('2 · Hardcoded Token Colors');
const hcTotal = cssFiles.reduce(
  (n, f) => n + checkHardcodedColors(f, fs.readFileSync(f, 'utf8'), hexMap),
  0
);
if (hcTotal === 0) {
  log.ok('No hardcoded token colors found');
}

log.head('3 · Token Drift (Unreferenced Tokens)');
const unused = checkTokenDrift(tokens, cssFiles);
if (unused.length === 0) {
  log.ok('All tokens referenced via var() in the codebase');
} else {
  unused.forEach(t => log.warn(`No var(${t}) found — possibly unused`));
}

log.head('4 · Token Naming Conventions');
const nonStandard = validateTokenNames(tokens);
if (nonStandard.length === 0) {
  log.ok('All tokens follow naming conventions');
} else {
  nonStandard.forEach(t =>
    log.warn(`Non-standard name: ${t} — update VALID_TOKEN_PATTERNS or rename`)
  );
}

log.head('Summary');
if (errorCount === 0 && warnCount === 0) {
  log.ok('All token checks passed ✨');
} else {
  if (errorCount > 0) {
    log.error(`${errorCount} error(s) must be fixed before committing`);
  }
  if (warnCount > 0) {
    console.log(`${C.Y}${warnCount} warning(s) — consider addressing${C.RST}`);
  }
}

console.log('');
process.exit(errorCount > 0 ? 1 : 0);

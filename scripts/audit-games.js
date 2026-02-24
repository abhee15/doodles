#!/usr/bin/env node

/**
 * Game Consistency Audit Script
 *
 * Checks all games for consistency, potential bugs, and UX issues.
 * Run with: node scripts/audit-games.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  ok: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.blue}${msg}${colors.reset}`)
};

/**
 * Audit a single game directory
 */
function auditGame(gameDir, gameName) {
  const errors = [];
  const warnings = [];

  const indexPath = path.join(gameDir, 'index.html');
  const gamePath = path.join(gameDir, 'game.js');
  const cssPath = path.join(gameDir, 'styles.css');

  // ============ REQUIRED FILES ============
  if (!fs.existsSync(indexPath)) {
    errors.push('Missing index.html');
    return { errors, warnings };  // Can't continue without HTML
  }

  if (!fs.existsSync(gamePath)) {
    errors.push('Missing game.js');
  }

  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const gameContent = fs.existsSync(gamePath) ? fs.readFileSync(gamePath, 'utf8') : '';

  // ============ NAVIGATION STRUCTURE ============

  // Check for nav bar
  if (!indexContent.includes('<nav class="dom-nav">') &&
      !indexContent.includes('<nav class="navbar">')) {
    errors.push('Missing proper nav bar (should be <nav class="dom-nav">)');
  }

  // Check for back button
  if (!indexContent.includes('id="game-back-btn"')) {
    errors.push('Missing back button with id="game-back-btn"');
  } else {
    // Check back button href format
    const backBtnRegex = /id="game-back-btn"[^>]*href="([^"]+)"/;
    const match = indexContent.match(backBtnRegex);

    if (match) {
      const href = match[1];
      if (!href.includes('../../index.html#')) {
        errors.push(`Invalid back button href: "${href}" (should link to ../../index.html#${gameName})`);
      }
    }
  }

  // Check for screen data attributes (if DOM-based game)
  if (indexContent.includes('dom-screen')) {
    if (!indexContent.includes('data-screen=')) {
      errors.push('Found .dom-screen but missing data-screen attributes');
    }

    // Check for landing screen
    if (!indexContent.includes('data-screen="landing"')) {
      warnings.push('Missing landing screen (recommended for consistency)');
    }
  }

  // ============ DESIGN SYSTEM ============

  // Check for box-shadow (violates flat design)
  if (indexContent.includes('box-shadow') || gameContent.includes('box-shadow')) {
    errors.push('Found box-shadow (violates flat design - use borders or transforms)');
  }

  // Check for required design system imports
  if (indexContent.includes('game-dom.css') || indexContent.includes('game-page-v2.css')) {
    // Good, uses shared design system
  } else if (!indexContent.includes('<!-- Design System -->')) {
    warnings.push('Consider using shared design system (tokens.css, game-dom.css)');
  }

  // ============ CODE QUALITY ============

  // Check for inline onclick handlers
  if (indexContent.match(/onclick\s*=/)) {
    errors.push('Found inline onclick handlers (use addEventListener instead)');
  }

  // Check for console.log
  if (gameContent.includes('console.log')) {
    warnings.push('Found console.log statements (remove before production)');
  }

  // Check for debugger statement
  if (gameContent.includes('debugger')) {
    errors.push('Found debugger statement (remove before production)');
  }

  // ============ UX FOR KIDS ============

  // Check button sizes in CSS
  const cssContent = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
  const allCss = indexContent + gameContent + cssContent;

  // Rough check - look for button declarations
  const hasButtonStyling = allCss.includes('button') || allCss.includes('.btn');
  if (hasButtonStyling && !allCss.includes('min-height:') && !allCss.includes('height: 4')) {
    warnings.push('Verify button sizes are ≥44px (mobile touch target)');
  }

  // Check for font sizes in HTML (rough check)
  const fontSizeRegex = /font-size\s*:\s*(\d+)/g;
  const fontSizes = [];
  let match;
  while ((match = fontSizeRegex.exec(allCss)) !== null) {
    fontSizes.push(parseInt(match[1]));
  }

  if (fontSizes.length > 0) {
    const minSize = Math.min(...fontSizes);
    if (minSize < 14) {
      warnings.push(`Found font sizes below 14px (minimum: ${minSize}px) - may be hard to read`);
    }
  }

  // ============ PERFORMANCE ============

  // Check for large images
  const assetDir = path.join(gameDir, 'assets');
  if (fs.existsSync(assetDir)) {
    const files = fs.readdirSync(assetDir);
    files.forEach(file => {
      const filePath = path.join(assetDir, file);
      const stats = fs.statSync(filePath);
      const sizeMB = stats.size / (1024 * 1024);

      if (file.match(/\.(png|jpg|jpeg|webp)$/i) && sizeMB > 0.5) {
        warnings.push(`Large image: ${file} (${sizeMB.toFixed(2)}MB - consider optimization)`);
      }
    });
  }

  // Check for external links (should be minimal)
  const externalLinks = (indexContent.match(/href="https?:\/\//g) || []).length;
  if (externalLinks > 2) {  // Allow analytics and cdn
    warnings.push(`Found ${externalLinks} external links (minimize external dependencies)`);
  }

  // ============ DOCUMENTATION ============

  const readmePath = path.join(gameDir, 'README.md');
  if (!fs.existsSync(readmePath)) {
    warnings.push('Missing README.md (helps with future maintenance)');
  }

  return { errors, warnings };
}

/**
 * Main audit function
 */
function runAudit() {
  const gamesDir = path.join(__dirname, '..', 'games');

  if (!fs.existsSync(gamesDir)) {
    log.error('Could not find games directory');
    process.exit(1);
  }

  const games = fs.readdirSync(gamesDir)
    .filter(f => fs.statSync(path.join(gamesDir, f)).isDirectory());

  if (games.length === 0) {
    log.warn('No games found to audit');
    process.exit(0);
  }

  log.header('🔍 GAME CONSISTENCY AUDIT');
  log.info(`Auditing ${games.length} games\n`);

  let totalErrors = 0;
  let totalWarnings = 0;
  const results = {};

  games.forEach(game => {
    const gameDir = path.join(gamesDir, game);
    const audit = auditGame(gameDir, game);

    results[game] = audit;
    totalErrors += audit.errors.length;
    totalWarnings += audit.warnings.length;

    if (audit.errors.length === 0 && audit.warnings.length === 0) {
      log.ok(`${game}`);
    } else {
      console.log(`\n${colors.cyan}${game}:${colors.reset}`);

      audit.errors.forEach(err => {
        log.error(`  ${err}`);
      });

      audit.warnings.forEach(warn => {
        log.warn(`  ${warn}`);
      });
    }
  });

  // ============ SUMMARY ============
  log.header('📊 SUMMARY');

  console.log(`
Games audited:        ${games.length}
Errors found:         ${totalErrors} ${totalErrors > 0 ? '❌' : '✅'}
Warnings found:       ${totalWarnings} ${totalWarnings > 0 ? '⚠️ ' : '✅'}
  `);

  if (totalErrors === 0) {
    log.ok('All games pass consistency audit!');
  } else {
    log.error(`${totalErrors} error(s) found - please fix before committing`);
  }

  if (totalWarnings > 0) {
    log.warn(`${totalWarnings} warning(s) found - consider addressing for better quality`);
  }

  // Exit with error code if there are critical errors
  process.exit(totalErrors > 0 ? 1 : 0);
}

// Run the audit
runAudit();

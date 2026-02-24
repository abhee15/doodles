#!/usr/bin/env node

/**
 * Design System Linter
 * Validates all games against CLAUDE.md conventions
 *
 * Usage: node lint-design-system.js [--fix]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GAMES_DIR = path.join(__dirname, '../../games');
const VIOLATIONS = [];
const WARNINGS = [];

class DesignSystemLinter {
  constructor() {
    this.gamesDir = GAMES_DIR;
  }

  // Get all game folders
  getGames() {
    return fs.readdirSync(this.gamesDir)
      .filter(name => fs.statSync(path.join(this.gamesDir, name)).isDirectory())
      .filter(name => !name.startsWith('_')); // Skip templates
  }

  // Load file contents
  loadFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch {
      return null;
    }
  }

  // Get all lines with their numbers
  getLines(content) {
    return content.split('\n').map((line, i) => ({ line, num: i + 1 }));
  }

  // Check for box-shadow (banned by design system)
  checkBoxShadow(gameId) {
    const gameDir = path.join(this.gamesDir, gameId);
    const cssFiles = this.findFiles(gameDir, '.css');

    cssFiles.forEach(cssFile => {
      const content = this.loadFile(cssFile);
      if (!content) return;

      const lines = this.getLines(content);
      lines.forEach(({ line, num }) => {
        if (line.includes('box-shadow')) {
          const relPath = path.relative(this.gamesDir, cssFile);
          VIOLATIONS.push({
            game: gameId,
            severity: 'ERROR',
            rule: 'No box-shadow',
            file: relPath,
            line: num,
            message: 'box-shadow is banned by design system. Use transform, border-color, or backdrop-filter instead.',
            code: line.trim()
          });
        }
      });
    });
  }

  // Check for inline scripts (must use game.js)
  checkInlineScripts(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    const lines = this.getLines(content);
    let inScript = false;
    let scriptStartLine = 0;

    lines.forEach(({ line, num }) => {
      // Match <script> without src attribute
      if (/<script\s*>/.test(line) && !/<script\s+src=/.test(line)) {
        inScript = true;
        scriptStartLine = num;
      }

      // Check if it's an inline script with actual code
      if (inScript && line.includes('</script>')) {
        inScript = false;
        // Only flag if script has actual code (not just analytics/ads)
        if (!line.includes('analytics') && !line.includes('ads')) {
          const relPath = path.relative(this.gamesDir, indexPath);
          VIOLATIONS.push({
            game: gameId,
            severity: 'ERROR',
            rule: 'No inline scripts',
            file: relPath,
            line: scriptStartLine,
            message: 'Game logic must be in game.js, not in inline <script> tags',
            code: `Lines ${scriptStartLine}-${num}`
          });
        }
      }
    });
  }

  // Check Tabler Icons version (must be @3)
  checkTablerIconsVersion(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    const lines = this.getLines(content);
    lines.forEach(({ line, num }) => {
      if (line.includes('@tabler/icons-webfont')) {
        if (line.includes('@latest')) {
          const relPath = path.relative(this.gamesDir, indexPath);
          VIOLATIONS.push({
            game: gameId,
            severity: 'ERROR',
            rule: 'Tabler Icons version must be pinned',
            file: relPath,
            line: num,
            message: 'Use @3 (pinned version), not @latest. Prevents unexpected breaking changes.',
            code: line.trim()
          });
        } else if (!line.includes('@3')) {
          const relPath = path.relative(this.gamesDir, indexPath);
          WARNINGS.push({
            game: gameId,
            severity: 'WARN',
            rule: 'Tabler Icons version mismatch',
            file: relPath,
            line: num,
            message: 'Tabler Icons should be pinned to @3 for consistency',
            code: line.trim()
          });
        }
      }
    });
  }

  // Check for canonical link
  checkCanonicalLink(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    if (!content.includes('<link rel="canonical"')) {
      const relPath = path.relative(this.gamesDir, indexPath);
      VIOLATIONS.push({
        game: gameId,
        severity: 'WARN',
        rule: 'Missing canonical link',
        file: relPath,
        line: 0,
        message: 'Each game should have a canonical link for SEO'
      });
    }
  }

  // Check back-link pattern
  checkBackLink(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    const lines = this.getLines(content);
    let hasBackLink = false;
    let hasCorrectHref = false;

    // Check for either:
    // 1. class="back-link" with Back text
    // 2. class="dom-nav" with Back text nearby
    const hasDomNav = content.includes('class="dom-nav"');
    const hasBackClass = content.includes('class="back-link"');
    const hasBackText = content.includes('>← Back</a>') || content.includes('> Back</a>');
    const hasCorrectLink = content.includes(`../../index.html#${gameId}`) || content.includes('../../index.html#');

    if ((hasDomNav || hasBackClass) && hasBackText) {
      hasBackLink = true;
      if (hasCorrectLink) {
        hasCorrectHref = true;
      }
    }

    // Fallback to line-by-line check for compatibility
    if (!hasBackLink) {
      lines.forEach(({ line, num }) => {
        if (line.includes('Back') && (line.includes('back-link') || line.includes('dom-nav'))) {
          hasBackLink = true;
          if (line.includes(`../../index.html#${gameId}`) || line.includes('../../index.html#')) {
            hasCorrectHref = true;
          }
        }
      });
    }

    if (!hasBackLink) {
      const relPath = path.relative(this.gamesDir, indexPath);
      VIOLATIONS.push({
        game: gameId,
        severity: 'ERROR',
        rule: 'Missing back link',
        file: relPath,
        line: 0,
        message: 'Game must have back link to portal: <a href="../../index.html#' + gameId + '" class="back-link">← Back</a>'
      });
    } else if (!hasCorrectHref) {
      const relPath = path.relative(this.gamesDir, indexPath);
      WARNINGS.push({
        game: gameId,
        severity: 'WARN',
        rule: 'Back link href mismatch',
        file: relPath,
        line: 0,
        message: 'Back link should anchor to game ID: href="../../index.html#' + gameId + '"'
      });
    }
  }

  // Check CSS mutual exclusivity (game-page-v2.css vs game-dom.css)
  checkCSSMutualExclusivity(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    const hasGamePageV2 = content.includes('game-page-v2.css');
    const hasGameDom = content.includes('game-dom.css');
    const hasTokens = content.includes('tokens.css');

    if (hasGamePageV2 && hasGameDom) {
      const relPath = path.relative(this.gamesDir, indexPath);
      VIOLATIONS.push({
        game: gameId,
        severity: 'ERROR',
        rule: 'CSS files are mutually exclusive',
        file: relPath,
        line: 0,
        message: 'Cannot load both game-page-v2.css (Archetype A) and game-dom.css (Archetype B). Choose one.'
      });
    }

    // DOM games need tokens.css, Canvas games don't
    if (hasGameDom && !hasTokens) {
      const relPath = path.relative(this.gamesDir, indexPath);
      VIOLATIONS.push({
        game: gameId,
        severity: 'WARN',
        rule: 'DOM game missing tokens.css',
        file: relPath,
        line: 0,
        message: 'DOM games (Archetype B) should load tokens.css before game-dom.css'
      });
    }
  }

  // Check for non-standard design system files
  checkNonStandardFiles(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    const nonStandardFiles = [
      'design-colors.css',
      'design-tokens.js',
      'colors.css'
    ];

    const lines = this.getLines(content);
    lines.forEach(({ line, num }) => {
      nonStandardFiles.forEach(file => {
        if (line.includes(file)) {
          const relPath = path.relative(this.gamesDir, indexPath);
          VIOLATIONS.push({
            game: gameId,
            severity: 'WARN',
            rule: 'Non-standard design file',
            file: relPath,
            line: num,
            message: `Remove ${file} - use standard tokens.css or design-system.js instead`,
            code: line.trim()
          });
        }
      });
    });
  }

  // Check required meta tags
  checkMetaTags(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    const relPath = path.relative(this.gamesDir, indexPath);
    const requiredTags = [
      { name: 'charset', pattern: 'charset', message: 'Missing charset meta tag' },
      { name: 'viewport', pattern: 'viewport', message: 'Missing viewport meta tag' },
      { name: 'title', pattern: '<title>', message: 'Missing title tag' },
      { name: 'description', pattern: 'name="description"', message: 'Missing description meta tag' },
      { name: 'og:type', pattern: 'property="og:type"', message: 'Missing og:type meta tag for SEO' }
    ];

    requiredTags.forEach(tag => {
      if (!content.includes(tag.pattern)) {
        WARNINGS.push({
          game: gameId,
          severity: 'WARN',
          rule: 'Missing meta tag',
          file: relPath,
          line: 0,
          message: tag.message
        });
      }
    });

    // Check title format
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    if (titleMatch) {
      const title = titleMatch[1];
      if (!title.includes('|') || !title.includes('Doodles Games')) {
        WARNINGS.push({
          game: gameId,
          severity: 'WARN',
          rule: 'Title format incorrect',
          file: relPath,
          line: 0,
          message: 'Title should end with "| Doodles Games". Format: "Game Name - Description for Kids | Doodles Games"'
        });
      }
    }
  }

  // Check for required shared files (Phaser games)
  checkSharedFiles(gameId, indexPath) {
    const content = this.loadFile(indexPath);
    if (!content) return;

    const isPhaser = content.includes('game-page-v2.css');
    if (!isPhaser) return; // Skip non-Phaser games

    const relPath = path.relative(this.gamesDir, indexPath);
    const requiredFiles = [
      'analytics.js',
      'ads.js',
      'game-config.js',
      'game.js'
    ];

    requiredFiles.forEach(file => {
      if (!content.includes(file)) {
        WARNINGS.push({
          game: gameId,
          severity: 'WARN',
          rule: 'Missing shared file reference',
          file: relPath,
          line: 0,
          message: `Phaser game should load ${file}`
        });
      }
    });
  }

  // Find files by extension
  findFiles(dir, ext) {
    const files = [];
    const walk = (currentPath) => {
      if (!fs.existsSync(currentPath)) return;
      const items = fs.readdirSync(currentPath);
      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          walk(fullPath);
        } else if (item.endsWith(ext)) {
          files.push(fullPath);
        }
      });
    };
    walk(dir);
    return files;
  }

  // Run all checks
  lint() {
    const games = this.getGames();
    console.log(`\n🔍 Linting ${games.length} games...\n`);

    games.forEach(gameId => {
      const gameDir = path.join(this.gamesDir, gameId);
      const indexPath = path.join(gameDir, 'index.html');

      if (!fs.existsSync(indexPath)) {
        console.warn(`⚠️  No index.html found in games/${gameId}`);
        return;
      }

      this.checkBoxShadow(gameId);
      this.checkInlineScripts(gameId, indexPath);
      this.checkTablerIconsVersion(gameId, indexPath);
      this.checkCanonicalLink(gameId, indexPath);
      this.checkBackLink(gameId, indexPath);
      this.checkCSSMutualExclusivity(gameId, indexPath);
      this.checkNonStandardFiles(gameId, indexPath);
      this.checkMetaTags(gameId, indexPath);
      this.checkSharedFiles(gameId, indexPath);
    });

    this.report();
  }

  // Generate report
  report() {
    const totalIssues = VIOLATIONS.length + WARNINGS.length;

    if (totalIssues === 0) {
      console.log('✅ All games pass design system validation!\n');
      process.exit(0);
    }

    console.log(`\n${'═'.repeat(80)}`);
    console.log('DESIGN SYSTEM VIOLATIONS & WARNINGS');
    console.log(`${'═'.repeat(80)}\n`);

    // Group by severity
    const errors = VIOLATIONS.filter(v => v.severity === 'ERROR');
    const warnings = [...VIOLATIONS.filter(v => v.severity === 'WARN'), ...WARNINGS];

    if (errors.length > 0) {
      console.log(`\n❌ ERRORS (${errors.length}) - Must fix:\n`);
      errors.forEach((issue, i) => {
        this.printIssue(issue, i + 1);
      });
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  WARNINGS (${warnings.length}) - Should fix:\n`);
      warnings.forEach((issue, i) => {
        this.printIssue(issue, i + 1);
      });
    }

    console.log(`\n${'═'.repeat(80)}`);
    console.log(`Summary: ${errors.length} errors, ${warnings.length} warnings\n`);

    process.exit(errors.length > 0 ? 1 : 0);
  }

  printIssue(issue, index) {
    console.log(`${index}. [${issue.game}] ${issue.rule}`);
    console.log(`   📄 ${issue.file}${issue.line ? ':' + issue.line : ''}`);
    console.log(`   💡 ${issue.message}`);
    if (issue.code) {
      console.log(`   📝 ${issue.code}`);
    }
    console.log();
  }
}

// Run linter
const linter = new DesignSystemLinter();
linter.lint();

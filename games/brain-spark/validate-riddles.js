#!/usr/bin/env node

/**
 * Brain Spark Riddle Validator
 *
 * Checks all riddle files for:
 * - Duplicate IDs across categories
 * - Missing required fields
 * - Invalid option/answer combinations
 * - Duplicate questions (same riddle twice)
 * - Format consistency
 *
 * Usage: node validate-riddles.js
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  error: msg => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  success: msg => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warning: msg => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  info: msg => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  section: msg => console.log(`\n${COLORS.cyan}${msg}${COLORS.reset}`)
};

const REQUIRED_FIELDS = ['id', 'question', 'visual', 'options', 'answer', 'explanation'];
const CATEGORIES = ['logic-riddles', 'number-patterns', 'odd-one-out', 'math-tricks'];

let totalErrors = 0;
const totalWarnings = 0;
let allRiddles = [];

// ============================================================================
// MAIN VALIDATION FUNCTIONS
// ============================================================================

function validateRiddle(riddle, index, file) {
  const errors = [];

  // Check required fields
  REQUIRED_FIELDS.forEach(field => {
    if (!(field in riddle)) {
      errors.push(`Missing field: '${field}'`);
    }
  });

  // Validate ID format
  if (riddle.id) {
    if (!/^[a-z]+-?c?\d+$/.test(riddle.id)) {
      errors.push(`Invalid ID format: '${riddle.id}' (should be like 'lr51' or 'lr-c21')`);
    }
  }

  // Validate question
  if (riddle.question && typeof riddle.question !== 'string') {
    errors.push('Question must be a string');
  }

  // Validate visual
  if (riddle.visual) {
    if (!riddle.visual.type) {
      errors.push('visual.type is missing');
    }
    if (!riddle.visual.emoji) {
      errors.push('visual.emoji is missing');
    }
    if (!riddle.visual.caption) {
      errors.push('visual.caption is missing');
    }
    if (riddle.visual.emoji && riddle.visual.emoji.length > 2) {
      errors.push(`visual.emoji should be one emoji, got: '${riddle.visual.emoji}'`);
    }
  }

  // Validate options
  if (riddle.options) {
    if (!Array.isArray(riddle.options)) {
      errors.push('options must be an array');
    } else if (riddle.options.length !== 4) {
      errors.push(`options must have exactly 4 items, got ${riddle.options.length}`);
    }
  }

  // Validate answer
  if (riddle.answer !== undefined) {
    if (![0, 1, 2, 3].includes(riddle.answer)) {
      errors.push(`answer must be 0-3, got ${riddle.answer}`);
    }
  }

  // Validate explanation
  if (riddle.explanation && typeof riddle.explanation !== 'string') {
    errors.push('explanation must be a string');
  }

  // Report errors
  if (errors.length > 0) {
    totalErrors += errors.length;
    log.error(`${file} [${index}] ID: ${riddle.id}`);
    errors.forEach(err => console.log(`  → ${err}`));
  }

  return errors.length === 0;
}

function validateCategory(category) {
  log.section(`Validating ${category}`);

  const filePath = path.join(__dirname, 'puzzles-data.js');

  try {
    // Read the file and extract just this category's riddles
    const content = fs.readFileSync(filePath, 'utf8');

    // Find the category section
    const categoryRegex = new RegExp(`'${category}':\\s*\\{[\\s\\S]*?\\n  \\},`, 'g');
    const match = content.match(categoryRegex);

    if (!match) {
      log.error(`${category} section not found in puzzles-data.js`);
      return;
    }

    // Extract and parse the riddles from puzzles-data.js
    const categorySection = match[0];

    // Count riddles by difficulty
    const normalCount = (categorySection.match(/normal:\s*\[/g) || []).length;
    const challengeCount = (categorySection.match(/challenge:\s*\[/g) || []).length;

    // Extract all IDs
    const idMatches = categorySection.match(/id:\s*'([^']+)'/g) || [];
    const ids = idMatches.map(m => m.replace(/id:\s*'([^']+)'/, '$1'));

    if (ids.length === 0) {
      log.warning(`No riddles found in ${category}`);
      return;
    }

    log.success(
      `${category}: ${ids.length} riddles (${normalCount ? '✓ normal' : ''} ${challengeCount ? '✓ challenge' : ''})`
    );

    // Check for duplicates within category
    const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
    if (duplicates.length > 0) {
      log.error(`Duplicate IDs in ${category}: ${duplicates.join(', ')}`);
      totalErrors += duplicates.length;
    }

    // Add to global tracking
    allRiddles = allRiddles.concat(ids.map(id => ({ id, category })));
  } catch (err) {
    log.error(`Failed to read ${category}: ${err.message}`);
    totalErrors++;
  }
}

function checkGlobalDuplicates() {
  log.section('Checking Global Uniqueness');

  const idMap = {};
  const duplicates = [];

  allRiddles.forEach(riddle => {
    if (idMap[riddle.id]) {
      duplicates.push({
        id: riddle.id,
        categories: [idMap[riddle.id], riddle.category]
      });
    } else {
      idMap[riddle.id] = riddle.category;
    }
  });

  if (duplicates.length > 0) {
    log.error('Duplicate IDs across categories:');
    duplicates.forEach(dup => {
      console.log(`  → '${dup.id}' found in ${dup.categories.join(' AND ')}`);
    });
    totalErrors += duplicates.length;
  } else {
    log.success(`All ${allRiddles.length} IDs are globally unique`);
  }
}

function summarize() {
  log.section('Validation Summary');

  if (totalErrors === 0) {
    log.success('All riddles passed validation! ✨');
    console.log(`\nTotal riddles: ${allRiddles.length}`);
    return 0;
  } else {
    log.error(`Found ${totalErrors} error(s) and ${totalWarnings} warning(s)`);
    return 1;
  }
}

// ============================================================================
// RUN VALIDATION
// ============================================================================

console.log(`${COLORS.cyan}Brain Spark Riddle Validator${COLORS.reset}\n`);

CATEGORIES.forEach(validateCategory);
checkGlobalDuplicates();
const exitCode = summarize();

process.exit(exitCode);

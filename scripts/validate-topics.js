#!/usr/bin/env node

/**
 * Science Topic Data Validation Script
 *
 * Validates topic-data.js files for all science games.
 * Ensures required structure, fields, and cross-references.
 *
 * Run with: npm run validate:topics
 */

const fs = require('fs');
const path = require('path');

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  error: msg => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warn: msg => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  ok: msg => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  info: msg => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  header: msg => console.log(`\n${colors.blue}${msg}${colors.reset}`)
};

/**
 * Science games to validate (10 games)
 */
const SCIENCE_GAMES = [
  'photosynthesis-explorer',
  'digestion-explorer',
  'water-cycle',
  'rainbows-science',
  'moon-phases',
  'day-and-night',
  'seasons-science',
  'gravity-science',
  'volcano-science',
  'earthquake-science'
];

/**
 * Validate a single topic-data.js file
 */
function validateTopicData(gameName, filePath) {
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(filePath)) {
    errors.push(`File not found: ${filePath}`);
    return { errors, warnings };
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    errors.push(`Could not read file: ${e.message}`);
    return { errors, warnings };
  }

  // Extract the TOPIC_DATA object using regex
  const dataMatch = content.match(/window\.TOPIC_DATA\s*=\s*({[\s\S]*?});/);

  if (!dataMatch) {
    errors.push('Could not find window.TOPIC_DATA object');
    return { errors, warnings };
  }

  let topicData;
  try {
    // eslint-disable-next-line no-eval
    topicData = eval(`(${dataMatch[1]})`);
  } catch (e) {
    errors.push(`Could not parse TOPIC_DATA: ${e.message}`);
    return { errors, warnings };
  }

  // ============ TOP-LEVEL FIELDS ============
  const requiredTopLevelFields = [
    'id',
    'name',
    'tagline',
    'icon',
    'color',
    'scenes',
    'lab',
    'glossary'
  ];

  requiredTopLevelFields.forEach(field => {
    if (!(field in topicData)) {
      errors.push(`Missing required top-level field: '${field}'`);
    }
  });

  // ============ COLOR VALIDATION ============
  if (topicData.color) {
    const colorSubKeys = ['nav', 'accent', 'accent2', 'bg', 'card', 'border'];
    if (typeof topicData.color === 'object') {
      colorSubKeys.forEach(subKey => {
        if (!(subKey in topicData.color)) {
          errors.push(`Color object missing required sub-key: '${subKey}'`);
        }
      });
    } else {
      errors.push('Color field should be an object with nav, accent, accent2, bg, card, border');
    }
  }

  // ============ SCENES VALIDATION ============
  if (!Array.isArray(topicData.scenes)) {
    errors.push('Scenes must be an array');
  } else {
    if (topicData.scenes.length === 0) {
      errors.push('Scenes array must be non-empty');
    }

    const sceneIds = new Set();
    topicData.scenes.forEach((scene, idx) => {
      if (!scene.id) {
        errors.push(`Scene at index ${idx} missing 'id' field`);
      } else if (sceneIds.has(scene.id)) {
        errors.push(`Duplicate scene ID: '${scene.id}'`);
      } else {
        sceneIds.add(scene.id);
      }

      if (!scene.title) {
        errors.push(`Scene '${scene.id || idx}' missing 'title' field`);
      }

      if (!scene.narration) {
        errors.push(`Scene '${scene.id || idx}' missing 'narration' field`);
      }

      // 3D scene must have sceneKey
      if (scene.renderType === '3d' && !scene.sceneKey) {
        errors.push(`3D Scene '${scene.id || idx}' missing 'sceneKey' field`);
      }

      // Non-3D scene must have svg object
      if (scene.renderType !== '3d' && !scene.svg) {
        errors.push(`Scene '${scene.id || idx}' (non-3D) missing 'svg' object`);
      }

      // SVG must have viewBox
      if (scene.svg && !scene.svg.viewBox) {
        errors.push(`Scene '${scene.id || idx}' SVG missing 'viewBox' attribute`);
      }
    });
  }

  // ============ LAB VALIDATION ============
  if (topicData.lab) {
    const labRequiredFields = ['title', 'instruction', 'controls', 'simulation', 'discoveries'];
    labRequiredFields.forEach(field => {
      if (!(field in topicData.lab)) {
        errors.push(`Lab missing required field: '${field}'`);
      }
    });

    // Controls must be non-empty array
    if (Array.isArray(topicData.lab.controls)) {
      if (topicData.lab.controls.length === 0) {
        errors.push('Lab controls array must be non-empty');
      }

      topicData.lab.controls.forEach((control, idx) => {
        if (!control.id) {
          errors.push(`Control at index ${idx} missing 'id' field`);
        }
        if (!control.label) {
          errors.push(`Control '${control.id || idx}' missing 'label' field`);
        }
        if (!control.type) {
          errors.push(`Control '${control.id || idx}' missing 'type' field`);
        }

        // Validate control type
        const validTypes = ['range', 'toggle'];
        if (control.type && !validTypes.includes(control.type)) {
          errors.push(
            `Control '${control.id || idx}' has invalid type '${control.type}' (should be range or toggle)`
          );
        }

        // Range controls need min, max, unit
        if (control.type === 'range') {
          if (typeof control.min === 'undefined') {
            errors.push(`Range control '${control.id || idx}' missing 'min' field`);
          }
          if (typeof control.max === 'undefined') {
            errors.push(`Range control '${control.id || idx}' missing 'max' field`);
          }
          if (!control.unit) {
            errors.push(`Range control '${control.id || idx}' missing 'unit' field`);
          }
        }
      });
    } else {
      errors.push('Lab controls must be an array');
    }
  }

  // ============ GLOSSARY VALIDATION ============
  if (!Array.isArray(topicData.glossary)) {
    errors.push('Glossary must be an array');
  } else {
    if (topicData.glossary.length < 4) {
      errors.push(
        `Glossary has only ${topicData.glossary.length} terms (minimum 4 needed for quiz)`
      );
    }

    const seenTerms = new Set();
    topicData.glossary.forEach((term, idx) => {
      if (!term.term) {
        errors.push(`Glossary entry at index ${idx} missing 'term' field`);
      }

      if (!term.definition) {
        errors.push(`Glossary term '${term.term || idx}' missing 'definition' field`);
      }

      if (!term.emoji) {
        errors.push(`Glossary term '${term.term || idx}' missing 'emoji' field`);
      } else if (typeof term.emoji !== 'string' || term.emoji.trim() === '') {
        errors.push(`Glossary term '${term.term || idx}' emoji should be a non-empty string`);
      }

      // Check for duplicate terms
      if (term.term && seenTerms.has(term.term)) {
        errors.push(`Duplicate glossary term: '${term.term}'`);
      }
      if (term.term) {
        seenTerms.add(term.term);
      }
    });
  }

  // ============ CROSS-CHECKS ============
  if (topicData.id && topicData.id !== gameName) {
    warnings.push(
      `TOPIC_DATA.id ('${topicData.id}') doesn't match game folder name ('${gameName}')`
    );
  }

  return { errors, warnings };
}

/**
 * Main validation function
 */
function runValidation() {
  const gamesDir = path.join(__dirname, '..', 'games');

  log.header('🔬 SCIENCE TOPIC DATA VALIDATION');

  let totalErrors = 0;
  let totalWarnings = 0;
  const results = {};

  SCIENCE_GAMES.forEach(gameName => {
    const topicDataPath = path.join(gamesDir, gameName, 'topic-data.js');
    const validation = validateTopicData(gameName, topicDataPath);

    results[gameName] = validation;
    totalErrors += validation.errors.length;
    totalWarnings += validation.warnings.length;

    if (validation.errors.length === 0 && validation.warnings.length === 0) {
      log.ok(`${gameName}`);
    } else {
      console.log(`\n${colors.cyan}${gameName}:${colors.reset}`);

      validation.errors.forEach(err => {
        log.error(`  ${err}`);
      });

      validation.warnings.forEach(warn => {
        log.warn(`  ${warn}`);
      });
    }
  });

  // ============ SUMMARY ============
  log.header('📊 SUMMARY');

  console.log(`
Games validated:      ${SCIENCE_GAMES.length}
Errors found:         ${totalErrors} ${totalErrors > 0 ? '❌' : '✅'}
Warnings found:       ${totalWarnings} ${totalWarnings > 0 ? '⚠️ ' : '✅'}
  `);

  if (totalErrors === 0) {
    log.ok('All science topic data passes validation!');
  } else {
    log.error(`${totalErrors} error(s) found - please fix before committing`);
  }

  if (totalWarnings > 0) {
    log.warn(`${totalWarnings} warning(s) found - consider addressing for better quality`);
  }

  // Exit with error code if there are errors
  process.exit(totalErrors > 0 ? 1 : 0);
}

// Run the validation
runValidation();

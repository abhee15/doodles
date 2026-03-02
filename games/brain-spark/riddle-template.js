/**
 * RIDDLE TEMPLATE & EXAMPLES
 *
 * Copy this template when adding new riddles to any category file.
 * Keep the structure exactly as shown - validation scripts depend on it!
 */

// ============================================================================
// TEMPLATE: Copy this structure for each new riddle
// ============================================================================

const RIDDLE_TEMPLATE = {
  id: 'category-code + number', // e.g., 'lr51' (logic riddle 51)
  // Codes: lr=logic, np=number, ooo=odd-one-out, mt=math-tricks

  question: 'Your riddle question?', // The actual riddle kids will see

  visual: {
    type: 'scene', // For logic riddles, always 'scene'
    emoji: '🎹', // Relevant emoji (one character)
    caption: 'Hint text here...' // ONLY shown if user clicks hint button
  },

  options: [
    'Correct answer (index 0)',
    'Wrong answer (index 1)',
    'Wrong answer (index 2)',
    'Wrong answer (index 3)'
  ],

  answer: 0, // Index of correct answer (0, 1, 2, or 3)

  explanation: 'The Piano! 🎹 Because it has keys but no locks.'
  // Explain WHY the answer is correct + the answer emoji
};

// ============================================================================
// CATEGORY ID CODES & RANGES
// ============================================================================

const ID_CODES = {
  'logic-riddles': {
    code: 'lr',
    normal: 'lr1-lr50',
    challenge: 'lr-c1-lr-c20',
    description: 'Logic riddles, wordplay, lateral thinking'
  },
  'number-patterns': {
    code: 'np',
    normal: 'np1-np25',
    challenge: 'np-c1-np-c15',
    description: 'Number sequences, math patterns, calculations'
  },
  'odd-one-out': {
    code: 'ooo',
    normal: 'ooo1-ooo25',
    challenge: 'ooo-c1-ooo-c15',
    description: 'Finding the odd one, pattern breaking'
  },
  'math-tricks': {
    code: 'mt',
    normal: 'mt1-mt25',
    challenge: 'mt-c1-mt-c15',
    description: 'Math shortcuts, number tricks, quick calculations'
  }
};

// ============================================================================
// EXAMPLES: Use these as reference when writing new riddles
// ============================================================================

// Example 1: Logic Riddle (Easy - simple object)
const EXAMPLE_EASY_LOGIC = {
  id: 'lr1',
  question: 'What has teeth but cannot bite?',
  visual: { type: 'scene', emoji: '🪮', caption: 'Used for hair...' },
  options: ['A comb', 'A shark', 'A fork', 'A saw'],
  answer: 0,
  explanation: 'A comb! 🪮 It has teeth but cannot bite anything.'
};

// Example 2: Logic Riddle (Medium - wordplay)
const EXAMPLE_MEDIUM_LOGIC = {
  id: 'lr18',
  question: 'The more you take, the more you leave behind. What am I?',
  visual: { type: 'scene', emoji: '👣', caption: 'With each step forward...' },
  options: ['Footsteps', 'Money', 'Time', 'Words'],
  answer: 0,
  explanation: 'Footsteps! 👣 Each step you take leaves a footprint behind.'
};

// Example 3: Logic Riddle (Hard - lateral thinking)
const EXAMPLE_HARD_LOGIC = {
  id: 'lr45',
  question: 'What walks on four legs in the morning, two at noon, and three at night?',
  visual: { type: 'scene', emoji: '🚶', caption: 'A riddle as old as time...' },
  options: ['A human', 'A dog', 'A shadow', 'Time itself'],
  answer: 0,
  explanation: 'A human! 🚶 Baby crawls (4), adult walks (2), elder with cane (3)!'
};

// Example 4: Challenge - Paradox
const EXAMPLE_CHALLENGE_LOGIC = {
  id: 'lr-c11',
  question: 'If a man says "I am lying," is he telling the truth or lying?',
  visual: { type: 'scene', emoji: '🤔', caption: 'A paradox...' },
  options: ["Neither - it's a paradox", "He's telling truth", "He's lying", 'Both'],
  answer: 0,
  explanation: 'Neither! 🤔 This is the "Liar\'s Paradox" - a logical loop with no solution!'
};

// ============================================================================
// VALIDATION CHECKLIST
// ============================================================================

const VALIDATION_CHECKLIST = `
Before adding a new riddle, verify:

[ ] ID Format
    - Correct category code (lr, np, ooo, mt)
    - Numeric suffix (lr1, lr2, not lr-1 or lr_1)
    - Within appropriate range (see ID_CODES above)

[ ] Question
    - Exactly one question mark at end
    - 5-20 words (not too long, not too short)
    - Clear and kid-friendly

[ ] Visual
    - type: 'scene' (always for logic riddles)
    - emoji: One single emoji (not text like ':smile:')
    - caption: Short hint, doesn't spoil answer

[ ] Options
    - Exactly 4 options
    - First option is the correct answer
    - Wrong options are believable alternatives
    - Each 1-5 words

[ ] Answer
    - Index 0-3 (0 = first option)
    - Matches the correct answer position

[ ] Explanation
    - Starts with the answer
    - Includes emoji for visual reinforcement
    - Explains WHY the answer is correct
    - Age-appropriate and educational

[ ] No Duplicates
    - Question not asked elsewhere
    - Similar riddles with different answers removed
    - Check across all category files

[ ] Consistency
    - Tone matches other riddles in category
    - Difficulty level matches (Easy/Medium/Hard/Challenge)
`;

// ============================================================================
// QUICK START: How to Add a New Riddle
// ============================================================================

const QUICK_START = `
STEP 1: Find the right file
  - Logic riddle? → puzzles/logic-riddles.js
  - Number puzzle? → puzzles/number-patterns.js
  - Etc.

STEP 2: Determine next ID
  - Look at last riddle in category
  - If last is 'lr50', next is 'lr51'
  - If last challenge is 'lr-c20', next is 'lr-c21'

STEP 3: Copy template
  const newRiddle = {
    id: 'lr51',
    question: '...',
    visual: { type: 'scene', emoji: '...', caption: '...' },
    options: [...],
    answer: 0,
    explanation: '...'
  };

STEP 4: Add to array
  normal: [
    // ... existing riddles
    newRiddle,  // ← Add here
  ]

STEP 5: Test
  - Open game and test it manually
  - OR run: node scripts/validate-riddles.js

STEP 6: Done!
  - Commit your changes
  - Run: node scripts/generate-manifest.js
  - Push!
`;

console.log(VALIDATION_CHECKLIST);
console.log(QUICK_START);

// Export for validation scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ID_CODES, RIDDLE_TEMPLATE };
}

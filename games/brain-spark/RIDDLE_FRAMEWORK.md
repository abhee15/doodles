# Brain Spark Riddle Framework

## Recommended Architecture

### Current: Monolithic (problematic at scale)

```
puzzles-data.js  (1,574 lines, all riddles mixed)
```

### Proposed: Modular (scalable)

```
puzzles/
├── logic-riddles.js        (50 normal + 20 challenge)
├── number-patterns.js      (similar structure)
├── odd-one-out.js
├── math-tricks.js
└── riddle-template.js      (TEMPLATE for adding new ones)

scripts/
├── validate-riddles.js     (check for duplicates, format errors)
└── generate-manifest.js    (auto-combine all riddles)

puzzles-data.js             (auto-generated from above)
```

---

## Benefits

| Aspect             | Monolithic               | Modular                      |
| ------------------ | ------------------------ | ---------------------------- |
| **File Size**      | 64KB (unwieldy)          | 16KB each (manageable)       |
| **Navigation**     | Hard to find riddles     | Easy - one file per category |
| **Collaboration**  | Merge conflicts          | Each person owns a file      |
| **Adding Riddles** | Risk breaking whole file | Edit single category file    |
| **Validation**     | Manual checking          | Automated checks             |
| **Scalability**    | Breaks at 300+ riddles   | Handles 1000+ easily         |

---

## How to Add New Riddles

### Step 1: Open the right category file

```javascript
// puzzles/logic-riddles.js

// Just add to the normal or challenge array
normal: [
  // ... existing riddles 1-50

  // NEW RIDDLE - Copy this template:
  {
    id: 'lr51', // Auto-increment
    question: 'Your riddle here?',
    visual: {
      type: 'scene',
      emoji: '🔤',
      caption: 'Hint without spoiling...'
    },
    options: ['Answer 1', 'Wrong 1', 'Wrong 2', 'Wrong 3'],
    answer: 0, // Index of correct answer
    explanation: 'Why the answer is right! 🔤'
  }
];
```

### Step 2: Run validation

```bash
node scripts/validate-riddles.js
```

Output:

```
✓ logic-riddles.js: 70 riddles, no duplicates
✓ number-patterns.js: 40 riddles, no duplicates
✓ All IDs unique across categories
✓ All required fields present
```

### Step 3: Auto-generate manifest

```bash
node scripts/generate-manifest.js
```

This creates/updates `puzzles-data.js` automatically!

---

## Quick Reference: Riddle Template

```javascript
{
  // REQUIRED: Unique ID (pattern: categorycode + number)
  // Logic: lr1-lr70, Number: np1-np50, etc.
  id: 'lr51',

  // REQUIRED: The actual riddle question
  question: 'What has X but no Y?',

  // REQUIRED: Visual aid (only shown if user clicks hint)
  visual: {
    type: 'scene',              // Always 'scene' for logic riddles
    emoji: '🎹',                // Relevant emoji
    caption: 'Hint...'          // Shown ONLY with hint button
  },

  // REQUIRED: 4 answer options
  options: ['Correct', 'Wrong1', 'Wrong2', 'Wrong3'],

  // REQUIRED: Index of correct answer (0-3)
  answer: 0,

  // REQUIRED: Educational explanation
  explanation: 'A Piano! 🎹 Because...'
}
```

---

## Validation Rules

The `validate-riddles.js` script checks:

✅ **ID Format**: `lr51`, `np25`, `ooo15`, etc.  
✅ **Uniqueness**: No duplicate IDs across all files  
✅ **Required Fields**: All 6 fields present (id, question, visual, options, answer, explanation)  
✅ **Options Length**: Exactly 4 options  
✅ **Answer Index**: 0-3 (valid option index)  
✅ **Visual Type**: Must be 'scene' for logic riddles  
✅ **Emoji**: Must be a single emoji character  
✅ **No Duplicates**: Same question/answer never appears twice

---

## Scale Test: How Many Riddles?

| Total | File Size | Load Time | Recommendation                |
| ----- | --------- | --------- | ----------------------------- |
| 70    | 64KB      | ~5ms      | ✓ Current (great)             |
| 200   | 180KB     | ~15ms     | ✓ Still fine                  |
| 500   | 450KB     | ~40ms     | ✓ OK, monitor                 |
| 1000  | 900KB     | ~80ms     | ⚠️ Consider splitting further |

**Recommendation**: You can safely add 200-300 more riddles with this framework before needing to split categories further!

---

## Implementation Roadmap

**Phase 1: Create modular structure (30 min)**

- [ ] Split puzzles-data.js → puzzles/ folder
- [ ] Create riddle-template.js with examples
- [ ] Create RIDDLE_FRAMEWORK.md (this file)

**Phase 2: Build validation (45 min)**

- [ ] Create validate-riddles.js script
- [ ] Create generate-manifest.js script
- [ ] Test both scripts

**Phase 3: Documentation (15 min)**

- [ ] Write contributor guide
- [ ] Create quick-add template
- [ ] Document all validation rules

**Total: ~1.5 hours of one-time setup**
**Benefit: Infinite scalability after that!**

---

## Example: Adding 50 More Logic Riddles

Without modular framework:

- Risk breaking the 1,574 line file
- Hard to spot duplicates
- Merge conflicts if multiple people add riddles

With modular framework:

```bash
# 1. Edit puzzles/logic-riddles.js
# 2. Add your 50 riddles to the normal array
# 3. Run: node scripts/validate-riddles.js
# 4. Run: node scripts/generate-manifest.js
# Done! No other file touched
```

---

## Questions to Answer Before Implementation

1. **Hosting Platform**: Using GitHub? GitHub Pages? This affects file structure.
2. **Team Size**: Solo or multiple contributors?
3. **Release Frequency**: Add riddles monthly? Weekly?
4. **Backend**: Any backend database, or static files only?
5. **Tooling**: Can you run Node.js scripts in your CI/CD?

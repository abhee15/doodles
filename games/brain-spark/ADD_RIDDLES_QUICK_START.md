# 🎯 Quick Start: Adding Riddles to Brain Spark

## Current Status

```
✓ 70 logic riddles (50 normal + 20 challenge)
✓ ~160 total across all categories
✓ Modular framework in place
✓ Validation tools ready
```

---

## Adding Your First Riddle (2 minutes)

### Option A: Manual (No Tools)

1. **Open** `games/brain-spark/puzzles-data.js`
2. **Find** the logic-riddles section (line ~337)
3. **Locate** where normal riddles end (around line ~550)
4. **Copy** this template:

```javascript
{
  id: 'lr71',  // ← Increment the number
  question: 'What has X but no Y?',
  visual: { type: 'scene', emoji: '🎹', caption: 'Hint text...' },
  options: ['Correct answer', 'Wrong 1', 'Wrong 2', 'Wrong 3'],
  answer: 0,
  explanation: 'The Piano! 🎹 Because...'
},
```

5. **Test** in browser (open the game and play)
6. **Done!**

### Option B: Smart (With Validation)

```bash
# 1. Run validator before adding
node games/brain-spark/validate-riddles.js

# Output tells you what ID to use next:
# ✓ logic-riddles: 70 riddles
# Next ID to use: lr71

# 2. Add your riddle (copy template from above)

# 3. Validate again
node games/brain-spark/validate-riddles.js

# Checks for:
# ✓ Correct format
# ✓ No duplicates
# ✓ Valid options (exactly 4)
# ✓ Valid answer index (0-3)
```

---

## Adding 50+ Riddles (Batch Mode)

### Full Workflow

```bash
# 1. Read the template
cat games/brain-spark/riddle-template.js

# 2. Edit puzzles-data.js
# In logic-riddles normal section, add 50 riddles
# Use riddle-template.js as reference

# 3. Validate all riddles
node games/brain-spark/validate-riddles.js

# Fix any errors it reports

# 4. Test in browser
# Play a few games, make sure they work

# 5. Commit
git add games/brain-spark/puzzles-data.js
git commit -m "feat(brain-spark): Add 50 new logic riddles (lr71-lr120)"
```

---

## Riddle Structure Reminder

```javascript
{
  // Required: Unique ID
  // Logic: lr1, lr2, ... lr70 (normal), lr-c1, lr-c2, ... lr-c20 (challenge)
  // Number: np1, np2, ... (pattern: categorycode + number)
  id: 'lr71',

  // Required: The riddle question (what the kid reads)
  question: 'What runs but never walks?',

  // Required: Visual (emoji + hint, only shown if hint clicked)
  visual: {
    type: 'scene',           // Always 'scene' for logic riddles
    emoji: '🏞️',            // One emoji
    caption: 'Flows through nature...'  // Hint (no spoilers!)
  },

  // Required: 4 answer options
  options: ['A river', 'A person', 'A car', 'A dog'],

  // Required: Index of correct answer (0-3)
  // In this case, 'A river' is at index 0, so answer is 0
  answer: 0,

  // Required: Explanation (teaches why answer is correct)
  explanation: 'A river! 🏞️ Rivers run downhill but never walk.'
}
```

---

## Common Mistakes (Don't Do These!)

❌ **Wrong: 5 options**

```javascript
options: ['Right', 'Wrong1', 'Wrong2', 'Wrong3', 'Wrong4'],  // ← TOO MANY
```

✅ **Right: Exactly 4**

```javascript
options: ['Right', 'Wrong1', 'Wrong2', 'Wrong3'],
```

---

❌ **Wrong: Answer index out of range**

```javascript
options: ['Right', 'Wrong', 'Wrong', 'Wrong'],
answer: 5,  // ← NOT VALID (only 0-3 allowed)
```

✅ **Right: Index matches an option**

```javascript
answer: 0,  // ← Points to 'Right'
```

---

❌ **Wrong: Duplicate ID**

```javascript
id: 'lr51',  // ← This already exists!
```

✅ **Right: Unique ID**

```javascript
id: 'lr71',  // ← New, unique ID
```

---

❌ **Wrong: Emoji with text**

```javascript
emoji: ':smile:',  // ← Use actual emoji, not text
```

✅ **Right: Actual emoji**

```javascript
emoji: '😊',  // ← Real emoji
```

---

## ID Naming Convention

**Category Codes:**

- `lr` = logic riddles
- `np` = number patterns
- `ooo` = odd one out
- `mt` = math tricks

**Format:**

- Normal: `lr1`, `lr2`, `lr3`, ... (number only)
- Challenge: `lr-c1`, `lr-c2`, `lr-c3`, ... (with `-c` for challenge)

**Examples:**

```
lr51         ← logic riddle #51 (normal difficulty)
lr-c11       ← logic riddle #11 (challenge difficulty)
np25         ← number pattern #25 (normal)
np-c5        ← number pattern #5 (challenge)
ooo30        ← odd-one-out #30 (normal)
mt-c8        ← math trick #8 (challenge)
```

---

## How Many Can You Add?

| Total Riddles | File Size | Performance | Recommendation            |
| ------------- | --------- | ----------- | ------------------------- |
| 70 (current)  | 64 KB     | ✓ Instant   | Sweet spot                |
| 150           | 130 KB    | ✓ Fast      | Still great               |
| 300           | 260 KB    | ✓ Good      | Good limit                |
| 500           | 430 KB    | ⚠️ Monitor  | Consider splitting        |
| 1000+         | 900 KB    | ⚠️ Slow     | Split into multiple files |

**Bottom line:** You can safely add **200+ more riddles** before hitting performance issues!

---

## Validation Checklist

Before you commit, verify:

- [ ] ID format is correct (e.g., `lr71`, not `lr_71` or `lr-71`)
- [ ] ID is unique (doesn't already exist in puzzles-data.js)
- [ ] Question ends with `?`
- [ ] Exactly 4 options
- [ ] Correct answer is at index 0
- [ ] Answer index is 0-3
- [ ] Emoji is one character (check with `emoji.length`)
- [ ] Caption is a hint, not a spoiler
- [ ] Explanation includes the answer and emoji
- [ ] No duplicate questions (same riddle asked twice)
- [ ] Validation script passes: `node validate-riddles.js` ✓

---

## Questions?

**Q: Can I add riddles of different difficulties?**
A: Yes! Put easy riddles in `normal` array (lr1-lr50), harder ones in `challenge` array (lr-c1-lr-c20).

**Q: What if I find a duplicate?**
A: Delete one of them, keep the better version.

**Q: Can I change existing riddles?**
A: Yes, just edit the object directly. Keep the same ID.

**Q: How do I test my new riddle?**
A: Open the game in browser, play, and your new riddle should appear in rotation.

**Q: Can multiple people add riddles at once?**
A: Yes, but check for ID conflicts before pushing. Validator catches these automatically.

---

## Next Steps

1. ✓ Read `riddle-template.js` for examples
2. ✓ Run `node validate-riddles.js` to see current status
3. ✓ Add your first 5 riddles (test them!)
4. ✓ Run validator again to confirm no errors
5. ✓ Commit and push!

**That's it!** The framework handles the rest. 🚀

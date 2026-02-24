/* eslint-disable no-undef */
// Quick Math - Learn Vedic Math Tricks!
// DOM-based Educational Game (No Phaser)

// ==================== NAVIGATION SETUP ====================
// Initialize game navigation (handles back button and screen transitions)
let gameNav;

function initNavigation() {
  gameNav = new GameNavigation('quick-math', {
    screens: ['landing', 'tutorial', 'practice', 'results', 'progress'],
    initialScreen: 'landing',
    gameName: 'Quick Math',
    titles: {
      landing: 'Quick Math',
      tutorial: 'Learn the Trick',
      practice: 'Practice Problems',
      results: 'Results',
      progress: 'Your Progress'
    }
  });
}

// Map old screen IDs to new data-screen names for backward compatibility
const screenMap = {
  'screen-level-select': 'landing',
  'screen-tutorial': 'tutorial',
  'screen-practice': 'practice',
  'screen-results': 'results',
  'screen-progress': 'progress'
};

// ==================== GAME STATE ====================
let currentLevelId = null;
let tutStep = 0;
let practiceScore = 0;
let practiceAnswered = 0;
let currentQuestion = null;
let userAnswer = '';
let answered = false;
let soundEnabled = true;
let autoAdvanceTimer = null;
let kbHandler = null;

// Player Progress
let playerProgress = {
  levelStars: {},
  achievements: [],
  totalScore: 0,
  gamesPlayed: 0,
  totalStars: 0
};

// ==================== LEVEL DATA ====================
// Ordered from Easy → Medium → Hard for optimal learning progression
const LEVELS = [
  // === EASY (Foundational tricks) ===
  { id: 1, name: 'Multiply by 4', icon: '2²', desc: 'Double, double!', color: '#7C3AED' },
  { id: 2, name: 'Multiply by 5', icon: '×5', desc: 'Half of ×10', color: '#059669' },
  { id: 3, name: 'Multiply by 3', icon: '×3', desc: 'Double + number', color: '#EC4899' },
  { id: 4, name: 'Divide by 5', icon: '÷5', desc: '×2 then ÷10', color: '#10B981' },
  { id: 5, name: 'Multiply by 20', icon: '×20', desc: '×2 then ×10', color: '#F59E0B' },
  { id: 6, name: 'Multiply by 30', icon: '×30', desc: '×3 then ×10', color: '#14B8A6' },

  // === MEDIUM (Pattern recognition) ===
  { id: 7, name: 'Multiply by 9', icon: '×9', desc: 'Finger trick magic', color: '#10B981' },
  { id: 8, name: 'Multiply by 11', icon: '×11', desc: 'Split, add, done!', color: '#3B82F6' },
  { id: 9, name: 'Multiply by 6', icon: '×6', desc: '(×5) + (×1)', color: '#DB2777' },
  { id: 10, name: 'Multiply by 7', icon: '×7', desc: '(×5) + (×2)', color: '#8B5CF6' },
  { id: 11, name: 'Multiply by 8', icon: '×8', desc: 'Triple double', color: '#EA580C' },
  { id: 12, name: 'Multiply by 12', icon: '×12', desc: '(×10) + (×2)', color: '#DC2626' },
  { id: 13, name: 'Multiply by 15', icon: '×15', desc: '×10 + half', color: '#0891B2' },
  { id: 14, name: 'Multiply by 25', icon: '×25', desc: 'Quarter trick', color: '#1D4ED8' },
  { id: 15, name: 'Multiply by 99', icon: '×99', desc: '(×100) − (×1)', color: '#6D28D9' },
  { id: 16, name: 'Square Ending 5', icon: '5²', desc: 'N(N+1) + 25', color: '#06B6D4' },
  { id: 17, name: 'Square Ending 1', icon: '1²', desc: 'Pattern magic', color: '#06B6D4' },
  { id: 18, name: 'Square Ending 6', icon: '6²', desc: 'Always ends in 6', color: '#F97316' },
  { id: 19, name: 'Divisibility 9', icon: '÷9✓', desc: 'Digital root', color: '#7C3AED' },

  // === HARD (Advanced/Algebraic) ===
  { id: 20, name: 'Base Method (10)', icon: '~10', desc: 'Near 10, 100...', color: '#2563EB' },
  { id: 21, name: 'Base Method (50)', icon: '~50', desc: 'Near 50 method', color: '#3B82F6' },
  { id: 22, name: '×11 Extended', icon: '11++', desc: 'With carry logic', color: '#2563EB' },
  { id: 23, name: 'Differ by 2', icon: 'n±1', desc: 'Sandwich squares', color: '#D97706' },
  { id: 24, name: 'Same Tens', icon: 'ab', desc: 'Ones sum to 10', color: '#0D9488' },
  { id: 25, name: 'Cross Multiply', icon: '2×2', desc: 'Two-digit magic', color: '#DC2626' }
];

// ==================== TUTORIAL DATA ====================
const TUTORIAL_STEPS = {
  1: [
    {
      title: 'The ×11 Trick',
      text: 'Learn the fastest way to multiply any 2-digit number by 11!',
      example: '',
      mnemonic: 'Split, Add Middle, Done! 🎯'
    },
    {
      title: 'Example: 23 × 11',
      text: 'The slow way takes many steps:\n23 × 10 = 230\n23 × 1 = 23\n230 + 23 = 253',
      example: '23 × 11 = 253',
      tip: 'The trick lets us skip all these steps and find the answer instantly!'
    },
    {
      title: 'The Quick Way!',
      text: 'We use a simple pattern with the digits in 23:',
      example: '2_3',
      steps: [
        '📍 <span class="qm-step-highlight">Split</span> the number: 2 and 3',
        '➕ <span class="qm-step-highlight">Add</span> the digits: 2 + 3 = 5',
        '✍️ Put the 5 in the <span class="qm-step-highlight">middle</span>: 253'
      ],
      mnemonic: 'First Digit | Sum | Last Digit'
    },
    {
      title: 'Why Does This Work?',
      text: "When you multiply by 11, you're adding the number to itself shifted left:\n\n23 × 11 = 23 × (10 + 1) = 230 + 23 = 253\n\nThe middle digit is where they overlap!",
      example: '253',
      visual: {
        html: `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center; width: 100%; max-width: 400px;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--qm-blue); margin-bottom: 8px;">23</div>
                            <div style="font-size: 12px; color: var(--dom-text-muted);">× 11</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--qm-orange);">253</div>
                            <div style="font-size: 12px; color: var(--dom-text-muted);">Answer!</div>
                        </div>
                    </div>
                `
      },
      tip: 'The first digit stays, the last stays, but the two digits in the middle add together!'
    },
    {
      title: 'Try Another: 34 × 11',
      text: 'Using the same pattern:\nFirst digit: 3\nMiddle: 3 + 4 = 7\nLast digit: 4\n\nAnswer: 374',
      example: '34 × 11 = 374',
      tip: 'This works for ANY 2-digit number! Try it with different numbers to see the pattern.'
    },
    {
      title: 'The Pattern!',
      text: 'For any number AB:\nA [A+B] B = Answer\n\n23 → 2 [2+3] 3 → 253\n45 → 4 [4+5] 5 → 495',
      example: '✨ Ready to Practice! ✨',
      mnemonic: 'Split 👉 Add Middle 👉 Answer!'
    }
  ],
  2: [
    {
      title: 'Square Numbers Ending in 5',
      text: 'Learn the FASTEST way to square numbers like 25, 35, 45!',
      example: '',
      mnemonic: 'Next × Number + 25 = Answer! ✨'
    },
    {
      title: 'What is "Square"?',
      text: "Square means multiply a number by itself.\n\n25² = 25 × 25\n\nIt's a number multiplied by itself!",
      example: '25 × 25 = ?',
      visual: {
        html: `
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 200px; margin: 0 auto;">
                        ${Array(5)
                          .fill(0)
                          .map(
                            () =>
                              '<div style="background: var(--qm-orange); width: 30px; height: 30px; border-radius: 4px;"></div>'
                          )
                          .join('')}
                        ${Array(5)
                          .fill(0)
                          .map(
                            () =>
                              '<div style="background: var(--qm-orange); width: 30px; height: 30px; border-radius: 4px;"></div>'
                          )
                          .join('')}
                    </div>
                    <div style="text-align: center; margin-top: 10px; font-size: 12px; color: var(--dom-text-muted);">5 rows × 5 columns = 25 squares!</div>
                `
      },
      tip: '5² looks like 5×5 = a square grid of 25 boxes!'
    },
    {
      title: 'The Normal (Slow) Way',
      text: 'Most people multiply it out:\n\n25 × 25 = 625\n\nBut this takes many steps!',
      example: '625',
      steps: [
        '❌ Multiply: 25 × 25 takes time...',
        '❌ Do it in your head? Even slower!',
        '✅ There MUST be a faster way!'
      ]
    },
    {
      title: 'The Quick Trick! ✨',
      text: 'Numbers ending in 5 have a MAGIC pattern!\n\nFor 25²:\nFirst digit: 2\nNext number: 2 + 1 = 3\nMultiply them: 2 × 3 = 6\nAdd 25 at end: 625',
      example: '25² = 625',
      steps: [
        '🎯 First digit of 25 is <span class="qm-step-highlight">2</span>',
        '➕ Next number is <span class="qm-step-highlight">3</span> (2+1)',
        '✖️ Multiply them: <span class="qm-step-highlight">2 × 3 = 6</span>',
        '✍️ Always add <span class="qm-step-highlight">25</span> at end: <span class="qm-step-highlight">625</span>'
      ],
      mnemonic: 'First × Next = Middle, Then 25!'
    },
    {
      title: 'More Examples!',
      text: 'This works for ANY number ending in 5:',
      example: '✨ See the Pattern ✨',
      visual: {
        html: `
                    <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
                        <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 10px 15px; border-radius: 6px; text-align: center; border-left: 4px solid var(--qm-blue);">
                            <div style="font-size: 12px; color: var(--dom-text-muted);">35²</div>
                            <div style="font-size: 14px; font-weight: bold;">3 × 4 = 12, add 25 → <span style="color: var(--qm-orange);">1225</span></div>
                        </div>
                        <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 10px 15px; border-radius: 6px; text-align: center; border-left: 4px solid var(--qm-blue);">
                            <div style="font-size: 12px; color: var(--dom-text-muted);">45²</div>
                            <div style="font-size: 14px; font-weight: bold;">4 × 5 = 20, add 25 → <span style="color: var(--qm-orange);">2025</span></div>
                        </div>
                    </div>
                `
      },
      tip: 'The pattern ALWAYS works because numbers ending in 5 have special properties!'
    },
    {
      title: 'Master the Pattern!',
      text: 'For any number ending in 5:\n\nN5² = [N × (N+1)] + 25\n\nExample:\n65² = (6 × 7) + 25 = 42 + 25 = 4225',
      example: '✅ Ready to Practice!',
      mnemonic: 'First × Next THEN 25! 🎯',
      tip: 'Write it down a few times to lock in the pattern!'
    }
  ],
  3: [
    {
      title: 'Double & Half',
      text: 'Master the EASIEST shortcut for multiplying by 25!',
      example: '',
      mnemonic: 'Half the number, ×100 = ×25! 🎯'
    },
    {
      title: 'Understanding ×25',
      text: '25 is a special number because:\n25 = 100 ÷ 4\n\nSo multiplying by 25 = ÷4 then ×100\n\nOr: ÷2 twice, then ×100',
      example: '8 × 25 = ?',
      steps: [
        '💡 Recognize: 25 = 100 ÷ 4',
        '📊 We can divide by 4 by halving twice',
        '✅ Then multiply by 100 (add two zeros)'
      ],
      tip: 'Breaking a problem into smaller steps makes it easier!'
    },
    {
      title: 'The Quick Way for EVEN Numbers',
      text: 'When the number is even, use this shortcut:\n\nHalf the number, then add "00"',
      example: '12 × 25 = ?',
      steps: [
        '1️⃣ Half of <span class="qm-step-highlight">12</span> = <span class="qm-step-highlight">6</span>',
        '2️⃣ Add <span class="qm-step-highlight">00</span>: <span class="qm-step-highlight">600</span>',
        '✅ 12 × 25 = 600'
      ],
      visual: {
        html: `
                    <div style="display: flex; gap: 15px; justify-content: center; align-items: center; flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <div style="background: var(--qm-blue); color: white; padding: 12px 16px; border-radius: 6px; font-weight: bold; font-size: 16px;">12</div>
                            <div style="font-size: 12px; margin-top: 4px;">÷2</div>
                        </div>
                        <div style="color: var(--qm-orange); font-size: 20px; font-weight: bold;">→</div>
                        <div style="text-align: center;">
                            <div style="background: var(--qm-orange); color: white; padding: 12px 16px; border-radius: 6px; font-weight: bold; font-size: 16px;">6</div>
                            <div style="font-size: 12px; margin-top: 4px;">+00</div>
                        </div>
                        <div style="color: var(--qm-orange); font-size: 20px; font-weight: bold;">→</div>
                        <div style="text-align: center;">
                            <div style="background: var(--qm-green); color: white; padding: 12px 16px; border-radius: 6px; font-weight: bold; font-size: 16px;">600</div>
                            <div style="font-size: 12px; margin-top: 4px;">Answer!</div>
                        </div>
                    </div>
                `
      },
      mnemonic: 'Half the number, add zeros! ✨'
    },
    {
      title: 'More Examples!',
      text: 'This works for all even numbers:',
      example: 'Master ×25! ✅',
      visual: {
        html: `
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="background: var(--qm-blue); color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;">16 × 25</span>
                            <span style="color: var(--dom-text-muted);">=</span>
                            <span style="color: var(--qm-orange);">8 × 100 = 400</span>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="background: var(--qm-blue); color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;">20 × 25</span>
                            <span style="color: var(--dom-text-muted);">=</span>
                            <span style="color: var(--qm-orange);">10 × 100 = 1000</span>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="background: var(--qm-blue); color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;">24 × 25</span>
                            <span style="color: var(--dom-text-muted);">=</span>
                            <span style="color: var(--qm-orange);">12 × 100 = 1200</span>
                        </div>
                    </div>
                `
      },
      tip: 'The pattern is consistent: always half, then add 00!'
    }
  ],
  4: [
    {
      title: 'Base Method',
      text: 'Multiply numbers CLOSE to 10!',
      example: '',
      mnemonic: 'Near 10? Use the Base! 📍'
    },
    {
      title: 'What "Base" Means',
      text: 'Base = a reference point (like 10)\n\nWhen numbers are close to 10:\n- 12 is 2 MORE than 10\n- 11 is 1 MORE than 10\n- 9 is 1 LESS than 10\n- 8 is 2 LESS than 10',
      example: 'Use these differences!',
      visual: {
        html: `
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 300px; margin: 0 auto;">
                        <div style="text-align: center; padding: 10px; background: color-mix(in srgb, var(--qm-green) 15%, white); border-radius: 6px; border: 2px solid var(--qm-green);">
                            <div style="font-size: 12px; color: var(--dom-text-muted); margin-bottom: 5px;">Above 10</div>
                            <div style="font-size: 20px; font-weight: bold;">12 = 10 + 2</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: color-mix(in srgb, var(--qm-orange) 15%, white); border-radius: 6px; border: 2px solid var(--qm-orange);">
                            <div style="font-size: 12px; color: var(--dom-text-muted); margin-bottom: 5px;">Below 10</div>
                            <div style="font-size: 20px; font-weight: bold;">8 = 10 - 2</div>
                        </div>
                    </div>
                `
      },
      tip: 'Write the "distance from 10" for each number!'
    },
    {
      title: 'Example: 12 × 13',
      text: '12 is 2 above 10\n13 is 3 above 10\n\nUse the trick:',
      example: '12 × 13 = 156',
      steps: [
        '📍 Base distance for 12: <span class="qm-step-highlight">+2</span>',
        '📍 Base distance for 13: <span class="qm-step-highlight">+3</span>',
        '✖️ Cross multiply: <span class="qm-step-highlight">2 × 3 = 6</span>',
        '➕ Add diagonals: <span class="qm-step-highlight">2 + 3 = 5</span>, ×10 = <span class="qm-step-highlight">50</span>',
        '📐 Formula: <span class="qm-step-highlight">100 + 50 + 6 = 156</span>'
      ],
      mnemonic: '(10+a) × (10+b) = 100 + 10(a+b) + ab'
    },
    {
      title: 'Works Below 10 Too!',
      text: 'When numbers are BELOW 10, use negative distances:',
      example: '8 × 9 = ?',
      steps: [
        '📍 8 is <span class="qm-step-highlight">2 below</span> 10 (−2)',
        '📍 9 is <span class="qm-step-highlight">1 below</span> 10 (−1)',
        '✖️ Multiply: (−2) × (−1) = <span class="qm-step-highlight">2</span>',
        '➕ Add: (−2) + (−1) = −3, ×10 = <span class="qm-step-highlight">−30</span>',
        '📐 Formula: <span class="qm-step-highlight">100 − 30 + 2 = 72</span>'
      ],
      tip: "Negative times negative = positive! That's why it works!"
    }
  ],
  5: [
    {
      title: 'Multiply by 9',
      text: 'Discover the MAGICAL ×9 pattern!',
      example: '',
      mnemonic: 'Go Down 1, Up 9! ✨'
    },
    {
      title: 'The Amazing Pattern',
      text: 'Look at these ×9 results:\n\n1×9 = 09 (digits sum: 0+9=9)\n2×9 = 18 (digits sum: 1+8=9)\n3×9 = 27 (digits sum: 2+7=9)\n4×9 = 36 (digits sum: 3+6=9)\n5×9 = 45 (digits sum: 4+5=9)\n\nALL digits add to 9! Why?',
      example: '🎯 Magic Pattern!',
      visual: {
        html: `
                    <div style="display: flex; flex-direction: column; gap: 10px; max-width: 250px; margin: 0 auto;">
                        ${[1, 2, 3, 4, 5]
                          .map(
                            n => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: color-mix(in srgb, var(--qm-orange) 15%, white); border-radius: 4px;">
                                <span style="font-weight: bold;">${n}×9 = ${n * 9}</span>
                                <span style="color: var(--qm-orange); font-weight: bold;">${n - 1}${10 - n}</span>
                            </div>
                        `
                          )
                          .join('')}
                    </div>
                `
      },
      tip: 'The digits form a pattern: first increases, second decreases!'
    },
    {
      title: 'The Quick Method',
      text: 'For any single digit × 9:\n\nGo DOWN by 1 for first digit\nGo UP by 9 for second digit (or to make sum = 9)',
      example: '5 × 9 = ?',
      steps: [
        '📉 First digit: 5 − 1 = <span class="qm-step-highlight">4</span>',
        '📈 Second digit: 9 − 4 = <span class="qm-step-highlight">5</span>',
        '✅ Answer: <span class="qm-step-highlight">45</span>'
      ],
      mnemonic: '(n−1) | (9−(n−1))'
    },
    {
      title: 'The FINGER Trick! 🖐️',
      text: 'Hold up 10 fingers. To multiply 5×9:\n\n1. Bend your 5th finger down\n2. Count fingers on left: 4\n3. Count fingers on right: 5\n4. Answer: 45!',
      example: '5 × 9 = 45',
      visual: {
        html: `
                    <div style="text-align: center;">
                        <div style="font-size: 48px; margin: 10px 0;">🖐️</div>
                        <div style="font-size: 14px; color: var(--dom-text-muted); margin-bottom: 10px;">Hold 10 fingers, bend the 5th</div>
                        <div style="display: flex; gap: 20px; justify-content: center; align-items: center;">
                            <div style="text-align: center;">
                                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">Left</div>
                                <div style="font-size: 32px; font-weight: bold; color: var(--qm-blue);">4</div>
                            </div>
                            <div style="font-size: 20px; color: var(--qm-orange);">|</div>
                            <div style="text-align: center;">
                                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">Right</div>
                                <div style="font-size: 32px; font-weight: bold; color: var(--qm-orange);">5</div>
                            </div>
                        </div>
                        <div style="font-size: 16px; font-weight: bold; margin-top: 15px; color: var(--qm-green);">Answer: 45</div>
                    </div>
                `
      },
      tip: 'This finger trick works for ALL ×9: just bend the finger for that number!'
    },
    {
      title: 'Master the Magic!',
      text: 'Try it with other numbers:\n\n7×9: Bend 7th finger → 6 left, 3 right = 63\n9×9: Bend 9th finger → 8 left, 1 right = 81\n2×9: Bend 2nd finger → 1 left, 8 right = 18',
      example: "✨ You've Got It! ✨",
      mnemonic: 'Fingers Never Lie! 🖐️',
      tip: 'Use the finger trick when you forget the pattern—it always works!'
    }
  ],
  6: [
    {
      title: 'Multiply by 5',
      text: 'Learn the easiest trick: multiply by 10, then divide by 2!',
      example: '',
      mnemonic: '×10 Then ÷2 = ×5'
    },
    {
      title: 'The Secret Formula',
      text: '×5 is the same as ×10 ÷ 2\n\nBecause: 5 = 10 ÷ 2\n\nExample with 8:',
      example: '8 × 5 = ?',
      steps: [
        '1️⃣ Multiply by <span class="qm-step-highlight">10</span>: 8 × 10 = 80',
        '2️⃣ Divide by <span class="qm-step-highlight">2</span> (cut in half): 80 ÷ 2 = 40',
        '✅ Answer: 8 × 5 = 40'
      ],
      tip: 'Always multiply by 10 first (just add a 0), then cut the result in half!'
    },
    {
      title: 'Even Faster for EVEN Numbers!',
      text: 'When the number is even, you can do it backwards:\nHalf first, then add the 0!\n\nExample with 12:',
      example: '12 × 5 = ?',
      steps: [
        '1️⃣ <span class="qm-step-highlight">Half</span> the number: 12 ÷ 2 = 6',
        '2️⃣ Add a <span class="qm-step-highlight">0</span>: 60',
        '✅ Answer: 12 × 5 = 60'
      ],
      visual: {
        html: `
                    <div style="background: color-mix(in srgb, var(--qm-blue) 20%, white); padding: 15px; border-radius: 6px; text-align: center;">
                        <div style="font-size: 14px; color: var(--dom-text-muted); margin-bottom: 10px;">Even Numbers Get This Bonus Trick:</div>
                        <div style="display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap;">
                            <div style="background: white; padding: 10px 15px; border-radius: 4px; border: 2px solid var(--qm-blue);">
                                <div style="font-size: 12px; color: var(--qm-blue);">÷2</div>
                                <div style="font-size: 18px; font-weight: bold;">12</div>
                            </div>
                            <div style="font-size: 20px; color: var(--qm-orange);">→</div>
                            <div style="background: white; padding: 10px 15px; border-radius: 4px; border: 2px solid var(--qm-orange);">
                                <div style="font-size: 12px; color: var(--qm-orange);">+0</div>
                                <div style="font-size: 18px; font-weight: bold;">60</div>
                            </div>
                        </div>
                    </div>
                `
      },
      mnemonic: 'Half the number, add a zero! 🎯'
    },
    {
      title: 'More Examples!',
      text: 'Practice the pattern with different numbers:\n\n16 × 5: Half of 16 = 8, add 0 → 80\n24 × 5: Half of 24 = 12, add 0 → 120\n14 × 5: (14×10)÷2 = 140÷2 = 70',
      example: '✨ See the Pattern? ✨',
      tip: "Use the even number trick when possible—it's faster!"
    }
  ],
  7: [
    {
      title: 'Multiply by 4',
      text: 'The SIMPLEST trick: just double twice!',
      example: '',
      mnemonic: 'Double, Then Double Again! 2️⃣2️⃣'
    },
    {
      title: 'The Secret',
      text: '4 = 2 × 2\n\nSo ×4 is the same as ×2 twice!\n\nExample: 5 × 4\nFirst double: 5 × 2 = 10\nSecond double: 10 × 2 = 20',
      example: '5 × 4 = 20',
      steps: [
        '📍 <span class="qm-step-highlight">First double</span>: 5 × 2 = 10',
        '📍 <span class="qm-step-highlight">Second double</span>: 10 × 2 = 20'
      ]
    },
    {
      title: 'More Examples',
      text: '8 × 4:\nFirst: 8 × 2 = 16\nSecond: 16 × 2 = 32\n\nPerfect!\n\nAlways the same pattern!',
      example: '✨ Double Twice! ✨',
      mnemonic: '×2 then ×2 = ×4'
    }
  ],
  8: [
    {
      title: 'Multiply by 6',
      text: 'Break it into ×5 + ×1!',
      example: '',
      mnemonic: '(×5) + (×1) = ×6'
    },
    {
      title: 'The Trick',
      text: '6 = 5 + 1\nSo: ×6 = ×5 + ×1\n\n7 × 6 = (7×5) + (7×1) = 35 + 7 = 42',
      example: '7 × 6 = 42',
      steps: ['🔹 Multiply by 5: 7 × 5 = 35', '🔹 Add the number once: 35 + 7 = 42']
    }
  ],
  9: [
    {
      title: 'Multiply by 8',
      text: 'Triple-double: Three doublings!',
      example: '',
      mnemonic: 'Double 3 Times = ×8'
    },
    {
      title: 'The Secret',
      text: '8 = 2 × 2 × 2\n\nSo ×8 = triple double!\n\n3 × 8:\nDouble: 3 × 2 = 6\nDouble: 6 × 2 = 12\nDouble: 12 × 2 = 24',
      example: '3 × 8 = 24',
      steps: [
        '📍 First double: 3 × 2 = 6',
        '📍 Second double: 6 × 2 = 12',
        '📍 Third double: 12 × 2 = 24'
      ]
    }
  ],
  10: [
    {
      title: 'Multiply by 12',
      text: 'Split: ×10 and ×2!',
      example: '',
      mnemonic: '(×10) + (×2) = ×12'
    },
    {
      title: 'The Trick',
      text: '12 = 10 + 2\nSo: ×12 = ×10 + ×2\n\n5 × 12 = (5×10) + (5×2) = 50 + 10 = 60',
      example: '5 × 12 = 60',
      steps: ['➕ Multiply by 10 (add 0): 50', '➕ Multiply by 2: 10', '✅ Add them: 50 + 10 = 60']
    }
  ],
  11: [
    {
      title: 'Multiply by 15',
      text: 'The Magic: ×10 + Half!',
      example: '',
      mnemonic: '(×10) + (÷2 of ×10) = ×15'
    },
    {
      title: 'The Secret',
      text: '15 = 10 + 5 = 10 + (10÷2)\n\n4 × 15 = (4×10) + half of (4×10)\n= 40 + 20 = 60',
      example: '4 × 15 = 60',
      steps: ['➕ Multiply by 10: 40', '➕ Half of 40: 20', '✅ Add: 40 + 20 = 60']
    }
  ],
  12: [
    {
      title: 'Multiply by 25',
      text: 'The Quarter Trick!',
      example: '',
      mnemonic: '÷4 then ×100 = ×25'
    },
    {
      title: 'The Secret',
      text: '25 = 100 ÷ 4\n\n8 × 25 = (8÷4) × 100 = 2 × 100 = 200\n\nOr: Half twice, add 00',
      example: '8 × 25 = 200',
      steps: [
        '📍 Method 1: Quarter (÷4) = 2, then ×100',
        '📍 Method 2: Half (÷2) = 4, Half again = 2, then ×100'
      ]
    }
  ],
  13: [
    {
      title: 'Multiply by 99',
      text: 'The Shortcut: ×100 − ×1!',
      example: '',
      mnemonic: '(×100) − (×1) = ×99'
    },
    {
      title: 'The Trick',
      text: '99 = 100 − 1\n\n23 × 99:\n= (23 × 100) − (23 × 1)\n= 2300 − 23 = 2277',
      example: '23 × 99 = 2277',
      steps: ['➕ Multiply by 100: 2300', '➖ Subtract once: −23', '✅ Answer: 2277']
    }
  ],
  14: [
    {
      title: '×11 Extended',
      text: 'The ×11 Trick WITH Carry!',
      example: '',
      mnemonic: 'Split 👉 Add 👉 Carry if needed!'
    },
    {
      title: 'Review Basic ×11',
      text: '23 × 11 = 253\nDigits: 2 [2+3] 3 = 253\n\nNo carry needed (2+3=5)',
      example: '23 × 11 = 253'
    },
    {
      title: 'When It Carries',
      text: '76 × 11: Middle = 7+6 = 13\n\nWrite 3 in middle, carry 1 to first:\n7+1 = 8 in hundreds\nAnswer: 836',
      example: '76 × 11 = 836',
      steps: [
        '🔹 First digit: 7',
        '🔹 Middle sum: 7+6=13 (write 3, carry 1)',
        '🔹 Final: (7+1) 3 6 = 836'
      ]
    }
  ],
  15: [
    {
      title: 'Differ by 2',
      text: 'Sandwich Squares!',
      example: '',
      mnemonic: 'n×(n+2) = (n+1)² − 1'
    },
    {
      title: 'The Formula',
      text: 'n × (n+2) = (n+1)² − 1\n\n7 × 9:\nMiddle number = 8\n8² = 64\n64 − 1 = 63',
      example: '7 × 9 = 63',
      steps: [
        '📍 Numbers differ by 2: 7 and 9',
        '📍 Middle number: 8',
        '📐 Square it: 8² = 64',
        '➖ Subtract 1: 64 − 1 = 63'
      ]
    }
  ],
  16: [
    {
      title: 'Same Tens',
      text: 'Ones Sum to 10!',
      example: '',
      mnemonic: 'T(T+1) | A(10−A) = Answer'
    },
    {
      title: 'The Condition',
      text: '23 × 27:\nSame tens digit: 2\nOnes sum to 10: 3+7=10\n\nSpecial pattern!',
      example: '',
      steps: ['🔹 Tens digit T = 2', '🔹 Ones digits: A=3, (10−A)=7']
    },
    {
      title: 'The Formula',
      text: 'Left part: T×(T+1) = 2×3 = 6\nRight part: A×(10−A) = 3×7 = 21\nConcat: 621',
      example: '23 × 27 = 621',
      steps: ['➕ Left: 2 × 3 = 6', '✖️ Right: 3 × 7 = 21', '🔗 Concat: 621']
    },
    {
      title: 'Another Example',
      text: '44 × 46 = [4×5][4×6] = [20][24] = 2024',
      example: '✨ Master Pattern! ✨',
      tip: 'This works because the ones digits "complete each other" to 10!'
    }
  ],
  17: [
    {
      title: 'Multiply by 3',
      text: 'Learn the triple trick!',
      example: '',
      mnemonic: '×3 = ×2 + ×1'
    },
    {
      title: 'The Secret',
      text: '3 = 2 + 1\n\nSo ×3 = ×2 + ×1\n\nDouble the number, then add it once more!',
      example: '5 × 3 = ?',
      steps: ['📍 Double: 5 × 2 = 10', '➕ Add once: 10 + 5 = 15']
    },
    {
      title: 'More Examples',
      text: '7 × 3 = 14 + 7 = 21\n8 × 3 = 16 + 8 = 24\n12 × 3 = 24 + 12 = 36',
      example: '✨ Double & Add! ✨',
      tip: 'Super simple: just double it, then add the original!'
    }
  ],
  18: [
    {
      title: 'Multiply by 7',
      text: 'The Cross Multiplication Magic!',
      example: '',
      mnemonic: '×7 = ×5 + ×2'
    },
    {
      title: 'Break It Down',
      text: '7 = 5 + 2\n\nSo ×7 = ×5 + ×2\n\nMultiply by 5, then add twice!',
      example: '6 × 7 = ?',
      steps: ['📍 Multiply by 5: 6 × 5 = 30', '📍 Double: 6 × 2 = 12', '✅ Add: 30 + 12 = 42']
    },
    {
      title: 'Pattern Recognition',
      text: '4 × 7 = 20 + 8 = 28\n8 × 7 = 40 + 16 = 56\n9 × 7 = 45 + 18 = 63',
      example: '✨ 5 + 2 = 7! ✨',
      tip: 'Using 5 makes multiplication easier since we can halve!'
    }
  ],
  19: [
    {
      title: 'Multiply by 20',
      text: 'Double the number, then ×10!',
      example: '',
      mnemonic: '(×2) then (×10) = ×20'
    },
    {
      title: 'The Strategy',
      text: '20 = 2 × 10\n\nSo ×20 = ×2 then ×10\nWhich means: Double, then add a 0!',
      example: '7 × 20 = ?',
      steps: ['📍 Double: 7 × 2 = 14', '📍 Add a zero: 140']
    },
    {
      title: 'Quick Examples',
      text: '5 × 20 = 10 × 10 = 100\n8 × 20 = 16 × 10 = 160\n12 × 20 = 24 × 10 = 240',
      example: '✨ Double & Zero! ✨'
    }
  ],
  20: [
    {
      title: 'Multiply by 30',
      text: 'Triple the number, then ×10!',
      example: '',
      mnemonic: '(×3) then (×10) = ×30'
    },
    {
      title: 'The Strategy',
      text: '30 = 3 × 10\n\nSo ×30 = ×3 then ×10\nWhich means: Triple, then add a 0!',
      example: '4 × 30 = ?',
      steps: ['📍 Triple (×3): 4 × 3 = 12', '📍 Add a zero: 120']
    },
    {
      title: 'Examples',
      text: '5 × 30 = 15 × 10 = 150\n6 × 30 = 18 × 10 = 180\n7 × 30 = 21 × 10 = 210',
      example: '✨ Triple & Zero! ✨'
    }
  ],
  21: [
    {
      title: 'Square Numbers Ending in 1',
      text: 'Pattern for 21, 31, 41, etc.!',
      example: '',
      mnemonic: '(N-1)² + 2N'
    },
    {
      title: 'The Formula',
      text: 'Numbers ending in 1 square using:\nN1² = (N×10+1)² = 100N² + 20N + 1',
      example: '21² = ?',
      steps: ['📍 Use pattern: 20² + 2(20×1) + 1', '📍 = 400 + 40 + 1 = 441']
    },
    {
      title: 'More Examples',
      text: '31² = 30² + 2(30) + 1 = 900 + 60 + 1 = 961\n41² = 40² + 2(40) + 1 = 1600 + 80 + 1 = 1681',
      example: '✨ Ending in 1 Magic! ✨'
    }
  ],
  22: [
    {
      title: 'Square Numbers Ending in 6',
      text: 'The Complementary Pattern!',
      example: '',
      mnemonic: '6² always ends in 6!'
    },
    {
      title: 'Magic Property',
      text: 'Numbers ending in 6 have a special property:\nWhen you square them, they ALWAYS end in 6!\n\n6² = 36 (ends in 6)\n16² = 256 (ends in 6)\n26² = 676 (ends in 6)',
      example: '26² = ?',
      steps: ['🎯 Last digit: Always 6', '📍 Use formula: (20+6)² = 400 + 240 + 36 = 676']
    },
    {
      title: 'Why This Happens',
      text: 'Because 6 × 6 = 36, which ends in 6!\n\nAny number ending in 6 × 6 will end in 6!',
      example: '✨ 6 is Magic! ✨'
    }
  ],
  23: [
    {
      title: 'Numbers Near 50',
      text: 'The Base 50 Method!',
      example: '',
      mnemonic: 'Base 50: Close to middle'
    },
    {
      title: 'The Strategy',
      text: '50 is a great base number!\n\nFor 48 × 52:\n48 = 50 - 2\n52 = 50 + 2\n\nUse the formula: (50-2)(50+2) = 50² - 2² = 2500 - 4 = 2496',
      example: '48 × 52 = 2496',
      steps: [
        '📍 Distance from 50: -2 and +2',
        '📍 (50)² = 2500',
        '📍 2² = 4',
        '📍 2500 - 4 = 2496'
      ]
    },
    {
      title: 'More Examples',
      text: '49 × 51 = 50² - 1² = 2500 - 1 = 2499\n47 × 53 = 50² - 3² = 2500 - 9 = 2491',
      example: '✨ Base 50 Works! ✨'
    }
  ],
  24: [
    { title: 'Divide by 5', text: 'The Reverse of ×5!', example: '', mnemonic: '×2 then ÷10 = ÷5' },
    {
      title: 'The Trick',
      text: '÷5 = ×2 ÷10\n\nDouble the number, then remove a 0!\n\n20 ÷ 5 = ?',
      example: '20 ÷ 5 = 4',
      steps: ['📍 Double: 20 × 2 = 40', '📍 Remove a zero: 40 ÷ 10 = 4']
    },
    {
      title: 'Examples',
      text: '30 ÷ 5 = 60 ÷ 10 = 6\n50 ÷ 5 = 100 ÷ 10 = 10\n80 ÷ 5 = 160 ÷ 10 = 16',
      example: '✨ Double & Divide! ✨',
      tip: 'This is the reverse of the ×5 trick!'
    }
  ],
  25: [
    {
      title: 'Cross Multiplication',
      text: 'Two-Digit × Two-Digit Magic!',
      example: '',
      mnemonic: 'Left | Middle | Right'
    },
    {
      title: 'The Pattern',
      text: 'For 23 × 14:\nStep 1: Right side: 3 × 4 = 12 (write 2, carry 1)\nStep 2: Cross: (2×4) + (3×1) = 11 + carry 1 = 12 (write 2, carry 1)\nStep 3: Left: 2 × 1 = 2 + carry 1 = 3\nAnswer: 322',
      example: '23 × 14 = 322',
      steps: [
        '🔹 Right (ones): 3 × 4 = 12 → 2, carry 1',
        '🔹 Cross (mixed): 2×4 + 3×1 = 11, + 1 = 12 → 2, carry 1',
        '🔹 Left (tens): 2 × 1 = 2, + 1 = 3',
        '✅ Answer: 322'
      ]
    },
    {
      title: 'More Practice',
      text: '12 × 13 = 156\n24 × 15 = 360\n31 × 22 = 682',
      example: '✨ Cross Multiply! ✨'
    }
  ],
  26: [
    {
      title: 'Divisibility by 9',
      text: 'The Digital Root Trick!',
      example: '',
      mnemonic: 'Sum digits = 9? Divisible! ✓'
    },
    {
      title: 'The Rule',
      text: 'A number is divisible by 9 if the sum of its digits equals 9 (or a multiple of 9)!\n\nExample: 27\n2 + 7 = 9 ✓ Divisible!\n\nExample: 45\n4 + 5 = 9 ✓ Divisible!',
      example: '✨ Digital Magic! ✨',
      steps: ['📍 Check: Is 36 divisible by 9?', '📍 Sum digits: 3 + 6 = 9 ✓', '📍 YES! 36 ÷ 9 = 4']
    },
    {
      title: 'Test Your Knowledge',
      text: 'Is 72 divisible by 9?\n7 + 2 = 9 ✓ YES!\n\nIs 81 divisible by 9?\n8 + 1 = 9 ✓ YES!\n\nIs 50 divisible by 9?\n5 + 0 = 5 ✗ NO!',
      example: '✨ Check Any Number! ✨',
      tip: 'This also works for divisibility by 3 (digits sum to 3, 6, or 9)!'
    }
  ]
};

// ==================== ACHIEVEMENTS ====================
const ACHIEVEMENTS = {
  first_star: {
    id: 'first_star',
    name: 'First Star',
    icon: '🌟',
    description: 'Get your first star',
    check: () => playerProgress.totalStars >= 1
  },
  triple_star: {
    id: 'triple_star',
    name: 'Perfect!',
    icon: '⭐',
    description: 'Get 3 stars on any level',
    check: () => Object.values(playerProgress.levelStars).some(s => s === 3)
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    icon: '🎯',
    description: 'Get 3 stars on all levels',
    check: () => {
      const levels = Object.keys(playerProgress.levelStars).length;
      const perfectLevels = Object.values(playerProgress.levelStars).filter(s => s === 3).length;
      return levels > 0 && levels === perfectLevels;
    }
  },
  five_games: {
    id: 'five_games',
    name: 'Dedicated',
    icon: '🔥',
    description: 'Complete 5 practice sessions',
    check: () => playerProgress.gamesPlayed >= 5
  },
  math_genius: {
    id: 'math_genius',
    name: 'Math Genius',
    icon: '🧠',
    description: 'Practice all 16 levels',
    check: () => Object.keys(playerProgress.levelStars).length >= 16
  },
  score_master: {
    id: 'score_master',
    name: 'Score Master',
    icon: '💯',
    description: 'Earn 100+ total points',
    check: () => playerProgress.totalScore >= 100
  }
};

// ==================== PERSISTENCE ====================
function saveProgress() {
  try {
    localStorage.setItem('quickMathProgress', JSON.stringify(playerProgress));
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
}

function loadProgress() {
  try {
    const saved = localStorage.getItem('quickMathProgress');
    if (saved) {
      playerProgress = JSON.parse(saved);
      return true;
    }
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
  return false;
}

// ==================== HELPERS ====================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getStarRating(score, total) {
  const percentage = (score / total) * 100;
  if (percentage === 100) {
    return 3;
  }
  if (percentage >= 80) {
    return 2;
  }
  if (percentage >= 60) {
    return 1;
  }
  return 0;
}

function showScreen(id) {
  // Map old ID to new data-screen name if needed
  const screenName = screenMap[id] || id;

  // Use GameNavigation to track navigation properly
  if (gameNav && gameNav.config.screens.includes(screenName)) {
    gameNav.goToScreen(screenName); // Don't preserve stack - let navigation track it
  } else {
    // Fallback for backward compatibility
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    const element =
      document.querySelector(`[data-screen="${screenName}"]`) || document.getElementById(id);
    if (element) {
      element.classList.add('active');
    }
  }

  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }

  if (kbHandler) {
    document.removeEventListener('keydown', kbHandler);
    kbHandler = null;
  }
}

// ==================== AUDIO ====================
let audioContext;

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!soundEnabled || !audioContext) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  switch (type) {
    case 'success':
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;

    case 'error':
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.15);
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
      break;

    case 'click':
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
      break;

    case 'celebrate': {
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      frequencies.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
        osc.start(audioContext.currentTime + i * 0.1);
        osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
      });
      return;
    }
  }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(title, icon, message) {
  const toast = document.getElementById('achievement-toast');
  toast.innerHTML = `${icon} <strong>${title}</strong><br>${message}`;
  toast.classList.add('visible');
  playSound('celebrate');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}

function checkAndUnlockAchievements() {
  const newAchievements = [];

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (!playerProgress.achievements.includes(achievement.id) && achievement.check()) {
      playerProgress.achievements.push(achievement.id);
      newAchievements.push(achievement);
    }
  });

  if (newAchievements.length > 0) {
    saveProgress();
    newAchievements.forEach((ach, i) => {
      setTimeout(() => showToast(ach.name, ach.icon, ach.description), i * 3500);
    });
  }
}

// ==================== LEVEL SELECT ====================
function renderLevelGrid() {
  const grid = document.getElementById('level-grid');
  grid.innerHTML = '';

  LEVELS.forEach(level => {
    const stars = playerProgress.levelStars[level.id] || 0;
    const card = document.createElement('div');
    card.className = 'qm-level-card';
    card.style.setProperty('--card-color', level.color);

    let starsHtml = '';
    for (let i = 0; i < 3; i++) {
      starsHtml += `<span class="${i < stars ? 'qm-star--filled' : 'qm-star--empty'}"></span>`;
    }

    card.innerHTML = `
            <div class="qm-level-header">
                <div class="qm-level-icon">${level.icon}</div>
                <div class="qm-level-info">
                    <p class="qm-level-name">${level.name}</p>
                    <p class="qm-level-desc">${level.desc}</p>
                </div>
            </div>
            <div class="qm-stars">${starsHtml}</div>
        `;

    card.addEventListener('click', () => {
      currentLevelId = level.id;
      initAudio();
      playSound('click');
      showTutorial(level.id);
    });

    grid.appendChild(card);
  });
}

// ==================== VISUAL SYSTEM HELPERS ====================
function renderVisualBreakdown(visualData) {
  const container = document.getElementById('tut-visual-breakdown');
  if (!visualData) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'flex';
  container.innerHTML = visualData.html || '';
}

function renderStepByStep(steps) {
  const container = document.getElementById('tut-step-container');
  if (!steps || steps.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = steps
    .map(
      (step, idx) => `
        <div class="qm-step ${idx === 0 ? 'current' : ''}">
            <div class="qm-step-number">${idx + 1}</div>
            <div class="qm-step-content">${step}</div>
        </div>
    `
    )
    .join('');
}

function showVisualStages() {
  const stagesContainer = document.getElementById('tut-stages');
  stagesContainer.style.display = 'flex';

  document.querySelectorAll('.qm-stage-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.qm-stage-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const stage = e.target.dataset.stage;
      const step = TUTORIAL_STEPS[currentLevelId][tutStep];

      if (stage === 'explanation') {
        document.getElementById('tut-visual-breakdown').style.display = 'none';
        document.getElementById('tut-step-container').style.display = 'none';
        document.getElementById('tut-text').style.display = 'block';
      } else if (stage === 'visual' && step.visual) {
        renderVisualBreakdown(step.visual);
        document.getElementById('tut-step-container').style.display = 'none';
        document.getElementById('tut-text').style.display = 'none';
      } else if (stage === 'steps' && step.steps) {
        renderStepByStep(step.steps);
        document.getElementById('tut-visual-breakdown').style.display = 'none';
        document.getElementById('tut-text').style.display = 'none';
      }
    });
  });
}

// ==================== TUTORIAL ====================
function showTutorial(levelId) {
  showScreen('screen-tutorial');
  currentLevelId = levelId;
  tutStep = 0;
  renderTutorialStep();
}

function renderTutorialStep() {
  const steps = TUTORIAL_STEPS[currentLevelId];
  const step = steps[tutStep];

  document.getElementById('tut-title').textContent = step.title;
  document.getElementById('tut-text').textContent = step.text;
  document.getElementById('tut-text').style.display = 'block';
  document.getElementById('tut-example').textContent = step.example;
  document.getElementById('tut-progress').textContent = `Step ${tutStep + 1} of ${steps.length}`;

  // Display mnemonic if available
  const mnemonicEl = document.getElementById('tut-mnemonic');
  if (step.mnemonic) {
    mnemonicEl.textContent = `💡 Remember: ${step.mnemonic}`;
    mnemonicEl.style.display = 'block';
  } else {
    mnemonicEl.style.display = 'none';
  }

  // Display tip if available
  const tipEl = document.getElementById('tut-tip');
  if (step.tip) {
    tipEl.innerHTML = `<strong>💡 Tip:</strong> ${step.tip}`;
    tipEl.style.display = 'block';
  } else {
    tipEl.style.display = 'none';
  }

  // Reset visual elements
  document.getElementById('tut-visual-breakdown').style.display = 'none';
  document.getElementById('tut-step-container').style.display = 'none';

  // Show visual stages if this step has them
  if (step.visual || step.steps) {
    showVisualStages();
    // Reset stage buttons
    document.querySelectorAll('.qm-stage-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-stage="explanation"]').classList.add('active');
  } else {
    document.getElementById('tut-stages').style.display = 'none';
  }

  const prevBtn = document.getElementById('tut-prev');
  const nextBtn = document.getElementById('tut-next');

  if (tutStep > 0) {
    prevBtn.style.display = 'inline-block';
  } else {
    prevBtn.style.display = 'none';
  }

  if (tutStep < steps.length - 1) {
    nextBtn.textContent = 'Next →';
    nextBtn.onclick = () => {
      tutStep++;
      renderTutorialStep();
    };
  } else {
    nextBtn.textContent = 'Practice! →';
    nextBtn.onclick = () => {
      startPractice(currentLevelId);
    };
  }

  prevBtn.onclick = () => {
    if (tutStep > 0) {
      tutStep--;
      renderTutorialStep();
    }
  };
}

// ==================== PRACTICE MODE ====================
function startPractice(levelId) {
  currentLevelId = levelId;
  showScreen('screen-practice');
  practiceScore = 0;
  practiceAnswered = 0;
  answered = false;
  userAnswer = '';
  nextPracticeQuestion();
}

function nextPracticeQuestion() {
  if (practiceAnswered >= 5) {
    showResults(practiceScore, 5);
    return;
  }

  userAnswer = '';
  answered = false;
  currentQuestion = generateQuestion(currentLevelId);

  document.getElementById('score-display').textContent = `Score: ${practiceScore}/5`;
  document.getElementById('question-display').textContent = currentQuestion.questionStr;
  document.getElementById('answer-box').textContent = '';
  document.getElementById('answer-box').className = 'qm-answer-box';
  document.getElementById('feedback-display').textContent = '';

  if (kbHandler) {
    document.removeEventListener('keydown', kbHandler);
  }
  kbHandler = e => {
    if (answered) {
      return;
    }
    if (e.key >= '0' && e.key <= '9' && userAnswer.length < 4) {
      userAnswer += e.key;
      document.getElementById('answer-box').textContent = userAnswer;
    } else if (e.key === 'Backspace') {
      userAnswer = userAnswer.slice(0, -1);
      document.getElementById('answer-box').textContent = userAnswer;
    } else if (e.key === 'Enter') {
      checkPracticeAnswer();
    }
  };
  document.addEventListener('keydown', kbHandler);

  renderNumpad();
}

function checkPracticeAnswer() {
  if (answered) {
    return;
  }
  answered = true;

  const answer = parseInt(userAnswer);
  const correct = answer === currentQuestion.answer;

  if (correct) {
    practiceScore++;
    document.getElementById('feedback-display').textContent = '✓ Correct! +1';
    document.getElementById('feedback-display').style.color = '#1CB0F6';
    document.getElementById('answer-box').classList.add('correct');
    playSound('success');
  } else {
    document.getElementById('feedback-display').textContent =
      `✗ Wrong. Answer: ${currentQuestion.answer}`;
    document.getElementById('feedback-display').style.color = '#FF4444';
    document.getElementById('answer-box').classList.add('wrong');
    playSound('error');
  }

  practiceAnswered++;

  autoAdvanceTimer = setTimeout(() => {
    nextPracticeQuestion();
  }, 2000);
}

function renderNumpad() {
  const numpad = document.getElementById('numpad');
  numpad.innerHTML = '';

  for (let i = 0; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'qm-numpad-btn';
    btn.addEventListener('click', () => {
      if (!answered && userAnswer.length < 4) {
        userAnswer += i;
        document.getElementById('answer-box').textContent = userAnswer;
      }
    });
    numpad.appendChild(btn);
  }

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.className = 'qm-numpad-btn qm-clear';
  clearBtn.addEventListener('click', () => {
    userAnswer = '';
    document.getElementById('answer-box').textContent = '';
  });
  numpad.appendChild(clearBtn);

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.className = 'qm-numpad-btn qm-submit';
  submitBtn.addEventListener('click', checkPracticeAnswer);
  numpad.appendChild(submitBtn);
}

// ==================== QUESTION GENERATOR ====================
function generateQuestion(levelId) {
  let num, num1, num2, answer, questionStr;

  if (levelId === 1) {
    num = randInt(12, 99);
    answer = num * 11;
    questionStr = `${num} × 11 = ?`;
  } else if (levelId === 2) {
    const tens = randInt(1, 9);
    num = tens * 10 + 5;
    const firstDigit = Math.floor(num / 10);
    answer = firstDigit * (firstDigit + 1) * 100 + 25;
    questionStr = `${num}² = ?`;
  } else if (levelId === 3) {
    num1 = randInt(6, 20) * 2;
    num2 = randFrom([25, 50]);
    answer = num1 * num2;
    questionStr = `${num1} × ${num2} = ?`;
  } else if (levelId === 4) {
    num1 = randInt(7, 13);
    num2 = randInt(7, 13);
    answer = num1 * num2;
    questionStr = `${num1} × ${num2} = ?`;
  } else if (levelId === 5) {
    num = randInt(1, 10);
    answer = num * 9;
    questionStr = `${num} × 9 = ?`;
  } else if (levelId === 6) {
    num = randInt(4, 24) * 2;
    answer = num * 5;
    questionStr = `${num} × 5 = ?`;
  } else if (levelId === 7) {
    num = randInt(1, 20);
    answer = num * 4;
    questionStr = `${num} × 4 = ?`;
  } else if (levelId === 8) {
    num = randInt(2, 15);
    answer = num * 6;
    questionStr = `${num} × 6 = ?`;
  } else if (levelId === 9) {
    num = randInt(1, 15);
    answer = num * 8;
    questionStr = `${num} × 8 = ?`;
  } else if (levelId === 10) {
    num = randInt(1, 15);
    answer = num * 12;
    questionStr = `${num} × 12 = ?`;
  } else if (levelId === 11) {
    num = randInt(1, 14);
    answer = num * 15;
    questionStr = `${num} × 15 = ?`;
  } else if (levelId === 12) {
    num = randInt(1, 20);
    answer = num * 25;
    questionStr = `${num} × 25 = ?`;
  } else if (levelId === 13) {
    num = randInt(12, 60);
    answer = num * 99;
    questionStr = `${num} × 99 = ?`;
  } else if (levelId === 14) {
    num = randInt(57, 99);
    answer = num * 11;
    questionStr = `${num} × 11 = ?`;
  } else if (levelId === 15) {
    const m = randInt(5, 20);
    num1 = m - 1;
    num2 = m + 1;
    answer = num1 * num2;
    questionStr = `${num1} × ${num2} = ?`;
  } else if (levelId === 16) {
    const T = randInt(2, 8);
    const A = randInt(1, 4);
    num1 = T * 10 + A;
    num2 = T * 10 + (10 - A);
    answer = num1 * num2;
    questionStr = `${num1} × ${num2} = ?`;
  } else if (levelId === 17) {
    // Multiply by 3
    num = randInt(1, 20);
    answer = num * 3;
    questionStr = `${num} × 3 = ?`;
  } else if (levelId === 18) {
    // Multiply by 7
    num = randInt(1, 15);
    answer = num * 7;
    questionStr = `${num} × 7 = ?`;
  } else if (levelId === 19) {
    // Multiply by 20
    num = randInt(1, 20);
    answer = num * 20;
    questionStr = `${num} × 20 = ?`;
  } else if (levelId === 20) {
    // Multiply by 30
    num = randInt(1, 15);
    answer = num * 30;
    questionStr = `${num} × 30 = ?`;
  } else if (levelId === 21) {
    // Square numbers ending in 1
    const tens = randInt(1, 8);
    num = tens * 10 + 1;
    answer = num * num;
    questionStr = `${num}² = ?`;
  } else if (levelId === 22) {
    // Square numbers ending in 6
    const tens = randInt(1, 8);
    num = tens * 10 + 6;
    answer = num * num;
    questionStr = `${num}² = ?`;
  } else if (levelId === 23) {
    // Numbers near 50 (base 50)
    const offset = randInt(1, 10);
    num1 = 50 - offset;
    num2 = 50 + offset;
    answer = num1 * num2;
    questionStr = `${num1} × ${num2} = ?`;
  } else if (levelId === 24) {
    // Divide by 5
    num = randInt(2, 20) * 5; // Even multiples of 5
    answer = num / 5;
    questionStr = `${num} ÷ 5 = ?`;
  } else if (levelId === 25) {
    // Cross multiplication (2-digit × 2-digit)
    num1 = randInt(10, 30);
    num2 = randInt(10, 30);
    answer = num1 * num2;
    questionStr = `${num1} × ${num2} = ?`;
  } else if (levelId === 26) {
    // Divisibility by 9 (practice: is number divisible by 9?)
    // Generate numbers and ask to verify divisibility
    const divisibleBy9 = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135];
    const notDivisible = [10, 20, 25, 35, 40, 50, 65, 75, 85, 95];
    const isDiv = Math.random() > 0.5;
    const numList = isDiv ? divisibleBy9 : notDivisible;
    num = randFrom(numList);
    answer = isDiv ? 1 : 0; // 1 = yes, 0 = no
    questionStr = `Is ${num} divisible by 9? (1=yes, 0=no)`;
  }

  return { questionStr, answer, levelId };
}

// ==================== RESULTS SCREEN ====================
function showResults(score, total) {
  showScreen('screen-results');

  const percentage = (score / total) * 100;
  const passed = percentage >= 60;
  const stars = getStarRating(score, total);

  if (passed) {
    playSound('celebrate');
  }

  document.getElementById('results-title').textContent = passed
    ? '🎉 Great Job!'
    : '📚 Keep Practicing!';
  document.getElementById('results-title').style.color = passed
    ? 'var(--dom-accent)'
    : 'var(--qm-red)';

  let starsHtml = '';
  for (let i = 0; i < 3; i++) {
    starsHtml += `<span class="${i < stars ? 'qm-result-star--filled' : 'qm-result-star--empty'}"></span>`;
  }
  document.getElementById('results-stars').innerHTML = starsHtml;

  const ratingText =
    stars === 3 ? 'Perfect!' : stars === 2 ? 'Great!' : stars === 1 ? 'Good Try!' : 'Keep Going!';
  document.getElementById('results-rating').textContent = ratingText;

  document.getElementById('results-score').textContent = `Score: ${score}/${total}`;
  document.getElementById('results-percentage').textContent = `${percentage.toFixed(0)}%`;

  playerProgress.gamesPlayed++;
  playerProgress.totalScore += score;

  const currentBestStars = playerProgress.levelStars[currentLevelId] || 0;
  if (stars > currentBestStars) {
    playerProgress.levelStars[currentLevelId] = stars;
  }

  playerProgress.totalStars = Object.values(playerProgress.levelStars).reduce((a, b) => a + b, 0);

  saveProgress();
  checkAndUnlockAchievements();

  document.getElementById('btn-try-again').onclick = () => {
    playSound('click');
    startPractice(currentLevelId);
  };

  document.getElementById('btn-level-select').onclick = () => {
    playSound('click');
    showLevelSelect();
  };
}

// ==================== PROGRESS SCREEN ====================
function showProgressScreen() {
  showScreen('screen-progress');

  document.getElementById('stat-stars').textContent = playerProgress.totalStars;
  document.getElementById('stat-games').textContent = playerProgress.gamesPlayed;
  document.getElementById('stat-score').textContent = playerProgress.totalScore;

  const achievementsGrid = document.getElementById('achievements-grid');
  achievementsGrid.innerHTML = '';

  Object.values(ACHIEVEMENTS).forEach(ach => {
    const unlocked = playerProgress.achievements.includes(ach.id);
    const card = document.createElement('div');
    card.className = `qm-achievement-card ${!unlocked ? 'locked' : ''}`;
    card.innerHTML = `
            <div class="qm-achievement-icon">${unlocked ? ach.icon : '🔒'}</div>
            <div class="qm-achievement-name">${ach.name}</div>
            <div class="qm-achievement-desc">${ach.description}</div>
        `;
    achievementsGrid.appendChild(card);
  });

  document.getElementById('btn-back-from-progress').onclick = () => {
    playSound('click');
    showLevelSelect();
  };
}

function showLevelSelect() {
  showScreen('screen-level-select');

  document.getElementById('btn-progress').onclick = () => {
    playSound('click');
    showProgressScreen();
  };
}

// ==================== SOUND TOGGLE ====================
document.getElementById('sound-toggle').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  document.getElementById('sound-toggle').textContent = soundEnabled ? '🔊' : '🔇';
  if (soundEnabled) {
    initAudio();
    playSound('click');
  }
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation system (handles back button and screen transitions)
  initNavigation();

  loadProgress();
  renderLevelGrid();
  showLevelSelect();

  document.addEventListener(
    'click',
    () => {
      initAudio();
    },
    { once: true }
  );
});

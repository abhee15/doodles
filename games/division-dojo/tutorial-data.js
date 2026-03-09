/* eslint-disable no-undef */
// Division Dojo - Tutorial data
// Keyed by level ID for proper organization

// eslint-disable-next-line no-unused-vars
const TUTORIAL_STEPS = {
  1: [
    {
      title: 'What is Division?',
      text: 'Division solves the problem of SHARING EQUALLY!\n\nExample: You have 12 cookies to share equally with 4 friends. How many does each friend get?',
      example: '',
      mnemonic: '🍪 Divide & Share Equally 🍪'
    },
    {
      title: 'Equal Groups',
      text: 'Think of division as splitting things into equal groups.\n\n12 cookies ÷ 4 friends = 3 cookies per friend\n\nWe can also think of it as: "How many groups of 4 are in 12?"',
      example: '12 ÷ 4 = 3',
      steps: [
        '👥 <span class="dd-step-highlight">Friend 1</span>: 3 cookies',
        '👥 <span class="dd-step-highlight">Friend 2</span>: 3 cookies',
        '👥 <span class="dd-step-highlight">Friend 3</span>: 3 cookies',
        '👥 <span class="dd-step-highlight">Friend 4</span>: 3 cookies'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 24px; margin: 20px 0;">🍪🍪🍪 | 🍪🍪🍪 | 🍪🍪🍪 | 🍪🍪🍪</div>
          <div style="font-weight: bold; color: var(--dom-accent);">12 cookies split into 4 groups</div>
          <div style="font-size: 18px; margin-top: 12px;">Each group has: 3 cookies</div>
        </div>`
      }
    },
    {
      title: 'The ÷ Symbol',
      text: 'The ÷ symbol means "divide" or "split into equal groups".\n\nIn: 12 ÷ 4 = 3\n\nWe say: "12 divided by 4 equals 3"',
      example: 'dividend ÷ divisor = quotient',
      tip: 'Dividend = the number being divided (top)\nDivisor = how many groups (bottom)\nQuotient = how many in each group (answer)'
    },
    {
      title: 'Real-World Examples',
      text: 'Division is everywhere in real life!\n\n📚 Books on shelves: 20 books on 4 shelves = 5 per shelf\n\n⚽ Teams: 16 students in 4 teams = 4 per team\n\n🥤 Juice bottles: 24 bottles shared by 6 people = 4 each',
      example: 'Keep dividing to solve real problems! ✨'
    }
  ],

  2: [
    {
      title: 'Division Language',
      text: "Let's learn the NAMES of each part!\n\nIn the problem: 12 ÷ 3 = 4\n\n12 is the DIVIDEND\n3 is the DIVISOR\n4 is the QUOTIENT",
      example: '',
      mnemonic: 'Dividend ÷ Divisor = Quotient'
    },
    {
      title: 'The Three Parts',
      text: 'Dividend = the number you START with\nDivisor = how many GROUPS to make\nQuotient = how many in EACH group\n\nExample: "Divide 20 apples into 5 bags"',
      example: '20 ÷ 5 = 4',
      steps: [
        '🍎 <span class="dd-step-highlight">Dividend</span>: 20 (starting apples)',
        '🛍️ <span class="dd-step-highlight">Divisor</span>: 5 (number of bags)',
        '🍎 <span class="dd-step-highlight">Quotient</span>: 4 (apples per bag)'
      ]
    },
    {
      title: 'Practice the Words',
      text: "In: 15 ÷ 3 = 5\n\n15 is the DIVIDEND (we're dividing 15)\n3 is the DIVISOR (into 3 groups)\n5 is the QUOTIENT (each group has 5)",
      example: 'dividend ÷ divisor = quotient'
    }
  ],

  3: [
    {
      title: 'Remainders',
      text: "Sometimes division doesn't divide PERFECTLY!\n\nExample: 14 cookies, 3 friends\n14 ÷ 3 = 4 with a remainder of 2\n\nEach friend gets 4, and 2 are left over!",
      example: '',
      mnemonic: '🍪 Leftover Pieces 🍪'
    },
    {
      title: "What's Left Over?",
      text: "A REMAINDER is the part that's left when division doesn't come out even.\n\n14 ÷ 3:\n3 × 4 = 12 (distributed)\n14 - 12 = 2 (left over)\n\nSo: 14 ÷ 3 = 4 remainder 2",
      example: '14 ÷ 3 = 4 R2',
      steps: [
        '👥 Friend 1 gets 4 apples',
        '👥 Friend 2 gets 4 apples',
        '👥 Friend 3 gets 4 apples',
        '🍎 2 apples remain'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 20px; margin: 12px 0;">🍎🍎🍎🍎 | 🍎🍎🍎🍎 | 🍎🍎🍎🍎 | 🍎🍎</div>
          <div style="font-weight: bold; color: var(--dom-accent);">4, 4, 4, and 2 left over</div>
        </div>`
      }
    },
    {
      title: 'Remainder Rule',
      text: 'The remainder must ALWAYS be SMALLER than the divisor!\n\nIf you have 5 remaining and divisor is 3, you could make another group!\n\n✓ 14 ÷ 3 = 4 remainder 2 (2 < 3)\n✗ 14 ÷ 3 = 4 remainder 5 (5 is NOT < 3)',
      example: 'Remainder < Divisor'
    }
  ],

  4: [
    {
      title: '÷2 — Cut in Half',
      text: 'Dividing by 2 is SIMPLE: just cut the number in HALF!\n\nDividing by 2 = Finding HALF\n\n16 ÷ 2 = 8 (half of 16 is 8)',
      example: '',
      mnemonic: 'Cut in Half = ÷2'
    },
    {
      title: 'The Halving Trick',
      text: 'To divide by 2, split the number into TWO EQUAL parts.\n\n24 ÷ 2:\n\nLeft side: 12\nRight side: 12\n\nAnswer: 12',
      example: '24 ÷ 2 = 12',
      steps: [
        '🔪 <span class="dd-step-highlight">Cut</span> the number in half',
        '✨ Each half has the same amount',
        "✅ That's your answer!"
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 24px; margin: 20px 0;">24</div>
          <div style="font-size: 18px; color: var(--dom-text-muted);">↓ Cut in half ↓</div>
          <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
            <div style="background: color-mix(in srgb, var(--dom-accent) 15%, white); padding: 20px; border-radius: 6px; border: 2px solid var(--dom-accent);">
              <div style="font-size: 20px; font-weight: bold;">12</div>
            </div>
            <div style="background: color-mix(in srgb, var(--dom-accent) 15%, white); padding: 20px; border-radius: 6px; border: 2px solid var(--dom-accent);">
              <div style="font-size: 20px; font-weight: bold;">12</div>
            </div>
          </div>
        </div>`
      }
    },
    {
      title: 'More Examples',
      text: '50 ÷ 2 = 25 (half of 50)\n100 ÷ 2 = 50 (half of 100)\n8 ÷ 2 = 4 (half of 8)\n\nAlways: divide by 2 = find the half!',
      example: '✨ Half of any number ✨'
    }
  ],

  5: [
    {
      title: '÷4 — Quarter Power',
      text: 'Dividing by 4 = cutting in HALF TWICE!\n\n4 = 2 × 2\n\nSo ÷4 is the same as ÷2 twice!',
      example: '',
      mnemonic: 'Halve Twice = ÷4'
    },
    {
      title: 'Halve, Then Halve Again',
      text: 'To divide by 4:\n\nStep 1: Cut in HALF\nStep 2: Cut that HALF in half again!\n\nExample: 32 ÷ 4',
      example: '32 ÷ 4 = 8',
      steps: [
        '🔪 <span class="dd-step-highlight">First half</span>: 32 ÷ 2 = 16',
        '🔪 <span class="dd-step-highlight">Half again</span>: 16 ÷ 2 = 8',
        '✅ Answer: 8'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 24px; margin: 20px 0;">32</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ ÷2 ↓</div>
          <div style="font-size: 20px; margin: 10px 0;">16</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ ÷2 ↓</div>
          <div style="font-size: 20px; font-weight: bold; color: var(--dom-accent);">8</div>
        </div>`
      }
    },
    {
      title: 'Quarter Concept',
      text: '÷4 is also finding ONE QUARTER!\n\nIf you divide 100 by 4:\n100 ÷ 4 = 25 (one quarter is 25)\n\nYou get FOUR equal quarters!',
      example: '100 ÷ 4 = 25 (four 25s)'
    }
  ],

  6: [
    {
      title: '÷8 — Halve Three Times',
      text: 'Dividing by 8 = cutting in HALF THREE TIMES!\n\n8 = 2 × 2 × 2\n\nHalve... then halve... then halve again!',
      example: '',
      mnemonic: 'Halve Thrice = ÷8'
    },
    {
      title: 'Triple Halving',
      text: 'To divide by 8:\n\nStep 1: ÷2\nStep 2: ÷2 again\nStep 3: ÷2 one more time!\n\nExample: 160 ÷ 8',
      example: '160 ÷ 8 = 20',
      steps: [
        '🔪 <span class="dd-step-highlight">First</span>: 160 ÷ 2 = 80',
        '🔪 <span class="dd-step-highlight">Second</span>: 80 ÷ 2 = 40',
        '🔪 <span class="dd-step-highlight">Third</span>: 40 ÷ 2 = 20'
      ]
    },
    {
      title: 'Why Does It Work?',
      text: "Because: 2 × 2 × 2 = 8\n\nSo if you divide by 2 three times, you've divided by 8!\n\n240 ÷ 8 = 240 ÷ 2 ÷ 2 ÷ 2 = 30",
      example: 'Keep halving! ✨'
    }
  ],

  7: [
    {
      title: '÷5 — Double & Slide',
      text: 'Dividing by 5 has a CLEVER TRICK:\n\n÷5 is the SAME as ×2 then ÷10!\n\nWhy? Because 5 × 2 = 10',
      example: '',
      mnemonic: 'Double & Divide by 10 = ÷5'
    },
    {
      title: 'The Double & Slide',
      text: 'To divide by 5:\n\nStep 1: MULTIPLY by 2\nStep 2: DIVIDE by 10 (move decimal left)\n\nExample: 35 ÷ 5',
      example: '35 ÷ 5 = 7',
      steps: [
        '📈 <span class="dd-step-highlight">Double</span>: 35 × 2 = 70',
        '↪️ <span class="dd-step-highlight">Slide left</span>: 70 ÷ 10 = 7'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 24px; margin: 20px 0;">35</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ ×2 ↓</div>
          <div style="font-size: 20px; margin: 10px 0;">70</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ ÷10 ↓</div>
          <div style="font-size: 20px; font-weight: bold; color: var(--dom-accent);">7</div>
        </div>`
      }
    },
    {
      title: 'Why the Trick Works',
      text: '÷5 = ×2 ÷ 10 because:\n\n35 ÷ 5 = 7\n\nBUT ALSO:\n35 × 2 ÷ 10 = 70 ÷ 10 = 7\n\nSame answer, easier mental math!',
      example: '45 ÷ 5 = 90 ÷ 10 = 9'
    }
  ],

  8: [
    {
      title: '÷10 — Drop a Zero',
      text: 'Dividing by 10 is the EASIEST trick!\n\nJust DROP THE LAST ZERO (or move decimal left)!\n\n230 ÷ 10 = 23',
      example: '',
      mnemonic: 'Drop the Zero! 0️⃣'
    },
    {
      title: 'The Simple Rule',
      text: 'When you divide by 10, slide the decimal point ONE spot to the left.\n\n500 ÷ 10 = 50 (move left)\n120 ÷ 10 = 12 (move left)\n7,300 ÷ 10 = 730 (move left)',
      example: '4,560 ÷ 10 = 456',
      steps: [
        '🔢 <span class="dd-step-highlight">Original</span>: 4,560',
        '←  <span class="dd-step-highlight">Slide left</span>: 456',
        '✅ Drop the zero!'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 24px; margin: 20px 0;">456<span style="color: red; font-weight: bold;">0</span></div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ Remove the 0 ↓</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--dom-accent);">456</div>
        </div>`
      }
    },
    {
      title: 'Always the Pattern',
      text: "Dividing by 10 ALWAYS drops a zero (or moves decimal).\n\nIt's so easy because 10 = 1 with a 0!\n\n1,200 ÷ 10 = 120 ✓",
      example: 'Just drop it! ✨'
    }
  ],

  9: [
    {
      title: '÷100 — Two Left',
      text: 'Dividing by 100: DROP TWO ZEROS (or move decimal LEFT TWICE)!\n\n5,600 ÷ 100 = 56',
      example: '',
      mnemonic: 'Drop TWO Zeros! 00️⃣'
    },
    {
      title: 'Slide Left Twice',
      text: 'When you divide by 100, slide the decimal TWO spots left.\n\n7,800 ÷ 100 = 78 (move left twice)\n123,000 ÷ 100 = 1,230 (move left twice)',
      example: '45,600 ÷ 100 = 456',
      steps: [
        '🔢 <span class="dd-step-highlight">Original</span>: 45,600',
        '←← <span class="dd-step-highlight">Slide left twice</span>: 456',
        '✅ Two zeros gone!'
      ]
    },
    {
      title: 'Pattern Recognition',
      text: 'Dividing by 10: drop 1 zero\nDividing by 100: drop 2 zeros\nDividing by 1,000: drop 3 zeros!\n\nThe number of zeros you drop = the number of zeros in the divisor!',
      example: '1,234,000 ÷ 1,000 = 1,234'
    }
  ],

  10: [
    {
      title: '÷3 — Digit Sum Magic',
      text: 'Dividing by 3 uses a HIDDEN PATTERN in the digits!\n\nIf all digits ADD UP to a number divisible by 3, then the whole number IS divisible by 3!',
      example: '',
      mnemonic: 'Add Up Digits for ÷3'
    },
    {
      title: 'The Divisibility Rule',
      text: 'To check if a number is divisible by 3: add all its digits!\n\nExample: Is 24 divisible by 3?\n2 + 4 = 6\n6 is divisible by 3!\nSo 24 ÷ 3 = 8 ✓',
      example: '27 ÷ 3 = 9',
      steps: [
        '🔢 <span class="dd-step-highlight">Digits</span>: 2 + 7 = 9',
        '➗ <span class="dd-step-highlight">9 ÷ 3</span> = 3 (divisible!)',
        '✅ 27 ÷ 3 = 9'
      ]
    },
    {
      title: 'Why This Works',
      text: "The digit sum trick works because of HOW 3 divides numbers!\n\n30 ÷ 3 = 10\n300 ÷ 3 = 100\n\nEvery power of 10 works with 3!\n\nThat's why adding digits reveals divisibility by 3!",
      example: '66: 6+6=12, 12÷3=4, so 66÷3=22'
    }
  ],

  11: [
    {
      title: '÷9 — Digit Sum of 9',
      text: 'Similar to ÷3, but EVEN COOLER!\n\nIf digits add up to 9 (or a multiple of 9), the number is divisible by 9!\n\n45: 4 + 5 = 9 ✓ Divisible by 9!',
      example: '',
      mnemonic: 'Digit Sum = 9 = Divisible by 9!'
    },
    {
      title: 'The Nines Trick',
      text: 'To divide by 9, add all digits.\n\nIf sum = 9, 18, 27, ... then divisible by 9!\n\nExample: Is 81 divisible by 9?\n8 + 1 = 9 ✓\n81 ÷ 9 = 9',
      example: '99 ÷ 9 = 11',
      steps: [
        '🔢 <span class="dd-step-highlight">Digits</span>: 9 + 9 = 18',
        '➗ <span class="dd-step-highlight">18 ÷ 9</span> = 2 (divisible!)',
        '✅ 99 ÷ 9 = 11'
      ]
    },
    {
      title: "Nine's Special Pattern",
      text: '9 is special because 10 - 1 = 9!\n\nThis makes 9 divide across all place values perfectly.\n\nAlmost MAGICAL! ✨',
      example: '999 ÷ 9 = 111'
    }
  ],

  12: [
    {
      title: '÷6 — Two Steps',
      text: 'Dividing by 6 = COMBINING TWO TRICKS!\n\nSince 6 = 2 × 3, we can:\n\nStep 1: ÷2 (cut in half)\nStep 2: ÷3 (digit sum check)',
      example: '',
      mnemonic: '÷2 Then ÷3 = ÷6'
    },
    {
      title: 'Two-Step Method',
      text: 'To divide by 6:\n\nStep 1: Divide by 2 (halve it)\nStep 2: Divide by 3 (digit sum rule)\n\nExample: 48 ÷ 6',
      example: '48 ÷ 6 = 8',
      steps: [
        '🔪 <span class="dd-step-highlight">First</span>: 48 ÷ 2 = 24',
        '✨ <span class="dd-step-highlight">Then</span>: 24 ÷ 3 = 8',
        '✅ Answer: 8'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 24px; margin: 20px 0;">48</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">÷2</div>
          <div style="font-size: 20px; margin: 10px 0;">24</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">÷3</div>
          <div style="font-size: 20px; font-weight: bold; color: var(--dom-accent);">8</div>
        </div>`
      }
    },
    {
      title: 'Combining Tricks',
      text: 'Many division tricks can be COMBINED!\n\n12 = 2 × 2 × 3\n\nSo dividing by 12 = ÷2 ÷2 ÷3 (three steps!)',
      example: 'Combine smaller tricks for bigger ones! 🚀'
    }
  ],

  13: [
    {
      title: '÷25 — Quarter Century',
      text: 'Dividing by 25 uses the DOUBLE TRICK!\n\n25 × 4 = 100\n\nSo: ÷25 = ×4 then ÷100!',
      example: '',
      mnemonic: '×4 Then ÷100 = ÷25'
    },
    {
      title: 'The 25 Method',
      text: 'To divide by 25:\n\nStep 1: MULTIPLY by 4\nStep 2: DIVIDE by 100 (drop two zeros)\n\nExample: 75 ÷ 25',
      example: '75 ÷ 25 = 3',
      steps: [
        '📈 <span class="dd-step-highlight">Multiply by 4</span>: 75 × 4 = 300',
        '↪️ <span class="dd-step-highlight">Divide by 100</span>: 300 ÷ 100 = 3'
      ]
    },
    {
      title: 'Quarter Coins!',
      text: '25 cents = 1 QUARTER dollar!\n\nIf you have 300 cents, how many quarters?\n300 ÷ 25 = 12 quarters!\n\nDividing by 25 finds quarters! 💰',
      example: '500 ÷ 25 = 20 quarters'
    }
  ],

  14: [
    {
      title: '÷11 — Alternating Sum',
      text: '11 has a special trick using ALTERNATING digits!\n\nStart right: + − + − + ...\n\nExample: 121\n1 − 2 + 1 = 0 (divisible by 11!)',
      example: '',
      mnemonic: 'Alternate + and − = ÷11'
    },
    {
      title: 'The Alternating Pattern',
      text: 'To check if divisible by 11, alternate signs from RIGHT to LEFT:\n\nStart from the RIGHT with +\nThen − then + then − ...\n\nExample: Is 132 divisible by 11?\n2 − 3 + 1 = 0 ✓ Yes!',
      example: '121 ÷ 11 = 11',
      steps: [
        '🔢 <span class="dd-step-highlight">Digits</span>: 1, 2, 1',
        '➕➖➕ <span class="dd-step-highlight">Alternate</span>: 1 − 2 + 1 = 0',
        '✅ Divisible by 11!'
      ]
    },
    {
      title: 'Why Does It Work?',
      text: '11 is special because 10 = 11 − 1\n\nThis creates an alternating pattern across place values!\n\nVery cool number theory! 🎓',
      example: '1,001 ÷ 11 = 91'
    }
  ],

  15: [
    {
      title: 'Break Apart Strategy',
      text: 'Some divisions are easier if you SPLIT the dividend first!\n\nInstead of 128 ÷ 4 directly:\n\nSplit: 120 ÷ 4 + 8 ÷ 4 = 30 + 2 = 32',
      example: '',
      mnemonic: 'Split, Divide, Add = ÷'
    },
    {
      title: 'The Decomposition Method',
      text: 'Break the big number into parts that divide EASILY!\n\nExample: 156 ÷ 3\n\nSplit: 150 ÷ 3 + 6 ÷ 3\n= 50 + 2 = 52',
      example: '156 ÷ 3 = 52',
      steps: [
        '🔀 <span class="dd-step-highlight">Break apart</span>: 150 + 6',
        '➗ <span class="dd-step-highlight">Divide each</span>: (150÷3) + (6÷3)',
        '➕ <span class="dd-step-highlight">Add results</span>: 50 + 2 = 52'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 24px; margin: 20px 0;">156 ÷ 3</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ Split into easy parts ↓</div>
          <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
            <div style="background: color-mix(in srgb, var(--dom-accent) 15%, white); padding: 16px; border-radius: 6px; border: 2px solid var(--dom-accent);">
              <div style="font-size: 18px; font-weight: bold;">150 ÷ 3 = 50</div>
            </div>
            <div style="background: color-mix(in srgb, var(--dom-accent) 15%, white); padding: 16px; border-radius: 6px; border: 2px solid var(--dom-accent);">
              <div style="font-size: 18px; font-weight: bold;">6 ÷ 3 = 2</div>
            </div>
          </div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ Add them ↓</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--dom-accent);">52</div>
        </div>`
      }
    },
    {
      title: 'Why This Helps',
      text: 'Breaking apart uses EASIER DIVISIONS!\n\n263 ÷ 5:\nSplit: 260 ÷ 5 + 3 ÷ 5\n= 52 + 0.6 = 52.6\n\nMuch easier than long division!',
      example: 'Use your tricks to break the problem! 🧩'
    }
  ],

  16: [
    {
      title: 'Divisibility Detective',
      text: 'Sometimes we just need to KNOW if a number divides evenly — WITHOUT dividing!\n\nUse divisibility tests to check quickly! 🔍',
      example: '',
      mnemonic: 'Test for Divisibility!'
    },
    {
      title: 'Quick Tests',
      text: 'Divisible by 2? → Last digit is even (0,2,4,6,8)\nDivisible by 3? → Digit sum divisible by 3\nDivisible by 5? → Last digit is 0 or 5\nDivisible by 10? → Last digit is 0',
      example: 'Is 246 divisible by 2? Yes! (ends in 6)',
      steps: [
        '🔢 <span class="dd-step-highlight">Check divisor</span>: Is it 2, 3, 4, 5?',
        '🎯 <span class="dd-step-highlight">Apply test</span>: Look at digits',
        '✅ <span class="dd-step-highlight">Answer</span>: Divisible or not?'
      ]
    },
    {
      title: 'Divisibility Tricks',
      text: "These tests save TIME because you don't have to actually divide!\n\nWorks for: 2, 3, 4, 5, 6, 8, 9, 10, 11\n\nMastering these makes you a math detective! 🕵️",
      example: 'Is 348 divisible by 3? 3+4+8=15, 15÷3=5, YES!'
    }
  ],

  17: [
    {
      title: 'Word Problems',
      text: 'Real-world division is SOLVING STORIES!\n\n"24 students need to sit at tables with 4 students each. How many tables?"\n\n24 ÷ 4 = 6 tables',
      example: '',
      mnemonic: 'Story → Division → Answer'
    },
    {
      title: 'Sharing vs Grouping',
      text: 'Two ways to think about division:\n\nSHARING: "Divide 20 cookies among 5 friends"\n20 ÷ 5 = 4 cookies each\n\nGROUPING: "Make groups of 5 from 20 cookies"\n20 ÷ 5 = 4 groups',
      example: 'Same division, different story!',
      steps: [
        '📖 <span class="dd-step-highlight">Read</span> the story carefully',
        '🔍 <span class="dd-step-highlight">Find</span> what to divide',
        '➗ <span class="dd-step-highlight">Divide</span> the numbers',
        '✅ <span class="dd-step-highlight">Answer</span> the question'
      ]
    },
    {
      title: 'Real-Life Examples',
      text: '⚽ 30 players → 6-player teams = 30÷6 = 5 teams\n🍕 60 slices → 8 slices per pizza = 60÷8 = 7.5 pizzas\n🎒 36 pencils → 4 per student = 36÷4 = 9 students\n\nDivision is everywhere! 🌍',
      example: 'Practice with real stories! 📚'
    }
  ],

  18: [
    {
      title: 'Division = Fraction!',
      text: 'BIG IDEA: Division and Fractions are the SAME THING!\n\n3 ÷ 4 = 3/4\n\nDividing 3 by 4 = the fraction three-fourths!',
      example: '',
      mnemonic: 'aDivision = Fraction!'
    },
    {
      title: 'The Connection',
      text: "When you divide, you're creating a FRACTION!\n\n7 ÷ 8 = 7/8 (seven-eighths)\n\nThe DIVIDEND becomes the NUMERATOR (top)\nThe DIVISOR becomes the DENOMINATOR (bottom)",
      example: '5 ÷ 6 = 5/6',
      steps: [
        '➗ <span class="dd-step-highlight">Division:</span> 3 ÷ 4',
        '🔄 <span class="dd-step-highlight">Becomes fraction:</span> 3/4',
        '✅ <span class="dd-step-highlight">Same value!</span> Both equal 0.75'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 32px; margin: 20px 0; font-weight: bold; color: var(--dom-accent);">3 ÷ 4</div>
          <div style="font-size: 20px; color: var(--dom-text-muted); margin: 10px 0;">↓ Same as ↓</div>
          <div style="font-size: 32px; margin: 20px 0; font-weight: bold; color: var(--dom-accent);">3/4</div>
          <div style="font-size: 14px; color: var(--dom-text-muted); margin: 10px 0;">Both = 0.75</div>
        </div>`
      }
    },
    {
      title: 'Opening Doors',
      text: "This connection is POWERFUL!\n\nNow you understand why:\n• Fractions work like division\n• Division shows fractions\n• They're the SAME concept!\n\nCongrats! You're ready for fractions! 🎓",
      example: '✨ Division unlocks fractions! ✨'
    }
  ],

  19: [
    {
      title: 'Numerator & Denominator',
      text: 'In a fraction like 3/5:\n\nNUMERATOR (top) = 3 = how many parts you HAVE\nDENOMINATOR (bottom) = 5 = how many TOTAL parts\n\n3/5 means "3 parts out of 5"',
      example: '',
      mnemonic: 'Numerator = How Many | Denominator = Out of How Many'
    },
    {
      title: 'Top and Bottom Mean',
      text: 'NUMERATOR (top number):\n"This many parts I\'m taking"\n\nDENOMINATOR (bottom number):\n"Out of this many equal parts total"',
      example: '7/10 = 7 out of 10 parts',
      steps: [
        '1️⃣ <span class="dd-step-highlight">Numerator</span>: 7 (parts I have)',
        '2️⃣ <span class="dd-step-highlight">Denominator</span>: 10 (total parts)',
        '✅ <span class="dd-step-highlight">Meaning:</span> 7 out of 10'
      ]
    },
    {
      title: 'Real-World Fractions',
      text: '🥧 2/8 of a pie = 2 slices out of 8\n📚 3/10 of the books = 3 books out of 10\n🎯 1/4 of the time = 1 part out of 4 equal parts\n\nFractions describe PARTS OF A WHOLE! 🌟',
      example: '5/12 = 5 parts out of 12'
    }
  ],

  20: [
    {
      title: 'Simple Fractions Practice',
      text: "Now let's PUT IT ALL TOGETHER!\n\nFinding a FRACTION OF A NUMBER means DIVIDING!\n\n1/2 of 20 = 20 ÷ 2 = 10\n1/4 of 20 = 20 ÷ 4 = 5",
      example: '',
      mnemonic: 'Fraction × Number = Division'
    },
    {
      title: 'Finding Fractional Amounts',
      text: 'To find 1/3 of 30:\n\nStep 1: The DENOMINATOR tells you to DIVIDE\n1/3 of 30 = 30 ÷ 3 = 10\n\nStep 2: The NUMERATOR tells you HOW MANY\n1/3 means multiply by 1 (just 10)',
      example: '1/4 of 60 = 60 ÷ 4 = 15',
      steps: [
        '✂️ <span class="dd-step-highlight">Divide</span> by denominator: 60 ÷ 4 = 15',
        '📊 <span class="dd-step-highlight">Multiply</span> by numerator: 15 × 1 = 15',
        '✅ <span class="dd-step-highlight">Answer:</span> 15'
      ],
      visual: {
        html: `<div style="text-align: center;">
          <div style="font-size: 28px; margin: 20px 0; font-weight: bold;">1/4 of 60</div>
          <div style="font-size: 16px; color: var(--dom-text-muted); margin: 10px 0;">↓ Divide 60 by 4 ↓</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--dom-accent);">15</div>
          <div style="font-size: 14px; color: var(--dom-text-muted); margin-top: 10px;">🥧 15 is 1/4 of 60 🥧</div>
        </div>`
      }
    },
    {
      title: "You've Mastered Division!",
      text: "🎉 CONGRATULATIONS! 🎉\n\nYou've learned:\n✅ Division foundations\n✅ 10+ division tricks\n✅ Divisibility tests\n✅ Word problems\n✅ Connection to FRACTIONS!\n\nYou're ready for advanced math! 🚀📚",
      example: 'Keep practicing and exploring! ✨'
    }
  ]
};

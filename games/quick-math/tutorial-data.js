/* eslint-disable no-undef */
// Quick Math - Tutorial data
// Keyed by level ID for proper organization

// eslint-disable-next-line no-unused-vars
const TUTORIAL_STEPS = {
  1: [
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
      ],
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">5 × 4</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Double</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">×2</div>
                <div style="font-size: 18px; font-weight: bold;">10</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Double Again</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">×2</div>
                <div style="font-size: 18px; font-weight: bold;">20</div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      title: 'More Examples',
      text: '8 × 4:\nFirst: 8 × 2 = 16\nSecond: 16 × 2 = 32\n\nPerfect!\n\nAlways the same pattern!',
      example: '✨ Double Twice! ✨',
      mnemonic: '×2 then ×2 = ×4'
    }
  ],
  2: [
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
      tip: 'Always multiply by 10 first (just add a 0), then cut the result in half!',
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">8 × 5</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Multiply by 10 (add 0)</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">×10</div>
                <div style="font-size: 18px; font-weight: bold;">80</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Cut in half (÷2)</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">÷2</div>
                <div style="font-size: 18px; font-weight: bold;">40</div>
              </div>
            </div>
          </div>
        `
      }
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
  3: [
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
      steps: ['📍 Double: 5 × 2 = 10', '➕ Add once: 10 + 5 = 15'],
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">5 × 3</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Double first</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">×2</div>
                <div style="font-size: 18px; font-weight: bold;">10</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Then add the original</div>
            <div style="display: flex; justify-content: center; gap: 8px; align-items: center;">
              <div style="background: white; padding: 10px 15px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">+5</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-green) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-green);">
                <div style="font-size: 12px; color: var(--qm-green); font-weight: bold;">Total</div>
                <div style="font-size: 18px; font-weight: bold;">15</div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      title: 'More Examples',
      text: '7 × 3 = 14 + 7 = 21\n8 × 3 = 16 + 8 = 24\n12 × 3 = 24 + 12 = 36',
      example: '✨ Double & Add! ✨',
      tip: 'Super simple: just double it, then add the original!'
    }
  ],
  4: [
    { title: 'Divide by 5', text: 'The Reverse of ×5!', example: '', mnemonic: '×2 then ÷10 = ÷5' },
    {
      title: 'The Trick',
      text: '÷5 = ×2 ÷10\n\nDouble the number, then remove a 0!\n\n20 ÷ 5 = ?',
      example: '20 ÷ 5 = 4',
      steps: ['📍 Double: 20 × 2 = 40', '📍 Remove a zero: 40 ÷ 10 = 4'],
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">20 ÷ 5</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Double</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">×2</div>
                <div style="font-size: 18px; font-weight: bold;">40</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Remove zero (÷10)</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">÷10</div>
                <div style="font-size: 18px; font-weight: bold;">4</div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      title: 'Examples',
      text: '30 ÷ 5 = 60 ÷ 10 = 6\n50 ÷ 5 = 100 ÷ 10 = 10\n80 ÷ 5 = 160 ÷ 10 = 16',
      example: '✨ Double & Divide! ✨',
      tip: 'This is the reverse of the ×5 trick!'
    }
  ],
  5: [
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
      steps: ['📍 Double: 7 × 2 = 14', '📍 Add a zero: 140'],
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">7 × 20</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Double (×2)</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">×2</div>
                <div style="font-size: 18px; font-weight: bold;">14</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Add a zero (×10)</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">+0</div>
                <div style="font-size: 18px; font-weight: bold;">140</div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      title: 'Quick Examples',
      text: '5 × 20 = 10 × 10 = 100\n8 × 20 = 16 × 10 = 160\n12 × 20 = 24 × 10 = 240',
      example: '✨ Double & Zero! ✨'
    }
  ],
  6: [
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
      steps: ['📍 Triple (×3): 4 × 3 = 12', '📍 Add a zero: 120'],
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">4 × 30</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Triple (×3)</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">×3</div>
                <div style="font-size: 18px; font-weight: bold;">12</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Add a zero (×10)</div>
            <div style="display: flex; justify-content: center; gap: 8px;">
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">+0</div>
                <div style="font-size: 18px; font-weight: bold;">120</div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      title: 'Examples',
      text: '5 × 30 = 15 × 10 = 150\n6 × 30 = 18 × 10 = 180\n7 × 30 = 21 × 10 = 210',
      example: '✨ Triple & Zero! ✨'
    }
  ],
  7: [
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
      mnemonic: '(n−1) | (9−(n−1))',
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 260px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">5 × 9</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Go DOWN by 1</div>
            <div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
              <div style="background: white; padding: 10px 14px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">5 − 1</div>
              </div>
              <div style="font-size: 16px; color: var(--qm-blue);">→</div>
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 10px 14px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 18px; font-weight: bold;">4</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Make sum = 9</div>
            <div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
              <div style="background: white; padding: 10px 14px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">9 − 4</div>
              </div>
              <div style="font-size: 16px; color: var(--qm-orange);">→</div>
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 10px 14px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 18px; font-weight: bold;">5</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">= Answer</div>
            <div style="display: flex; gap: 8px; justify-content: center;">
              <div style="background: color-mix(in srgb, var(--qm-green) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-green);">
                <div style="font-size: 16px; font-weight: bold;">4</div>
              </div>
              <div style="background: color-mix(in srgb, var(--qm-green) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-green);">
                <div style="font-size: 16px; font-weight: bold;">5</div>
              </div>
            </div>
            <div style="text-align: center; font-size: 16px; font-weight: bold; color: var(--qm-green);">= 45</div>
          </div>
        `
      }
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
  8: [
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
      mnemonic: 'First Digit | Sum | Last Digit',
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">23 × 11</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Split the digits</div>
            <div style="display: flex; gap: 15px; justify-content: center; align-items: center;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 10px 12px; border-radius: 6px; border: 2px solid var(--qm-blue); text-align: center;">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">First</div>
                <div style="font-size: 16px; font-weight: bold;">2</div>
              </div>
              <div style="font-size: 18px; color: var(--dom-text-muted);">|</div>
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 10px 12px; border-radius: 6px; border: 2px solid var(--qm-orange); text-align: center;">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">Last</div>
                <div style="font-size: 16px; font-weight: bold;">3</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Add middle digits</div>
            <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
              <div style="background: white; padding: 8px 10px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 14px; font-weight: bold;">2</div>
              </div>
              <div style="font-size: 16px; color: var(--qm-green); font-weight: bold;">+</div>
              <div style="background: white; padding: 8px 10px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 14px; font-weight: bold;">3</div>
              </div>
              <div style="font-size: 16px; color: var(--qm-green); font-weight: bold;">=</div>
              <div style="background: color-mix(in srgb, var(--qm-green) 15%, white); padding: 8px 10px; border-radius: 6px; border: 2px solid var(--qm-green);">
                <div style="font-size: 14px; font-weight: bold; color: var(--qm-green);">5</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">↓ Answer: First | Sum | Last</div>
            <div style="display: flex; gap: 8px; justify-content: center;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 10px 12px; border-radius: 6px; border: 2px solid var(--qm-blue);">
                <div style="font-size: 14px; font-weight: bold;">2</div>
              </div>
              <div style="background: color-mix(in srgb, var(--qm-green) 15%, white); padding: 10px 12px; border-radius: 6px; border: 2px solid var(--qm-green);">
                <div style="font-size: 14px; font-weight: bold;">5</div>
              </div>
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 10px 12px; border-radius: 6px; border: 2px solid var(--qm-orange);">
                <div style="font-size: 14px; font-weight: bold;">3</div>
              </div>
            </div>
            <div style="text-align: center; font-size: 16px; font-weight: bold; color: var(--qm-green); margin-top: 8px;">=  253</div>
          </div>
        `
      }
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
  9: [
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
      steps: ['🔹 Multiply by 5: 7 × 5 = 35', '🔹 Add the number once: 35 + 7 = 42'],
      visual: {
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 280px; margin: 0 auto;">
            <div style="text-align: center; font-size: 18px; font-weight: bold; color: var(--qm-blue);">7 × 6</div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">Break into: ×5 and ×1</div>
            <div style="display: flex; gap: 10px; justify-content: center;">
              <div style="background: color-mix(in srgb, var(--qm-blue) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-blue); text-align: center;">
                <div style="font-size: 12px; color: var(--qm-blue); font-weight: bold;">×5</div>
                <div style="font-size: 16px; font-weight: bold;">35</div>
              </div>
              <div style="display: flex; align-items: center; font-size: 20px; color: var(--qm-orange); font-weight: bold;">+</div>
              <div style="background: color-mix(in srgb, var(--qm-orange) 15%, white); padding: 12px 16px; border-radius: 6px; border: 2px solid var(--qm-orange); text-align: center;">
                <div style="font-size: 12px; color: var(--qm-orange); font-weight: bold;">×1</div>
                <div style="font-size: 16px; font-weight: bold;">7</div>
              </div>
            </div>
            <div style="text-align: center; color: var(--dom-text-muted); font-size: 12px;">= 35 + 7</div>
            <div style="display: flex; justify-content: center;">
              <div style="background: color-mix(in srgb, var(--qm-green) 15%, white); padding: 12px 20px; border-radius: 6px; border: 2px solid var(--qm-green); text-align: center;">
                <div style="font-size: 12px; color: var(--qm-green); font-weight: bold;">Answer</div>
                <div style="font-size: 18px; font-weight: bold;">42</div>
              </div>
            </div>
          </div>
        `
      }
    }
  ],
  10: [
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
  11: [
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
  12: [
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
  13: [
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
  14: [
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
  15: [
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
  16: [
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
  17: [
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
  18: [
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
  19: [
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
  ],
  20: [
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
  21: [
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
  23: [
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
  24: [
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
  22: [
    {
      title: '×11 Extended',
      text: 'When the sum of digits ≥ 10!',
      example: '',
      mnemonic: 'Split, Add, Carry!'
    },
    {
      title: 'The Challenge',
      text: '57 × 11:\nNormal: 5 | 5+7 | 7 = 5|12|7\n\nBut 5+7=12, which is 2 digits!\nWe need to CARRY the 1',
      example: '',
      steps: [
        '📍 First digit: 5',
        '📍 Add middle: 5+7 = 12 (≥10!)',
        '🔄 Carry the 1 to first digit: 5+1=6',
        '✅ Result: 627'
      ]
    },
    {
      title: 'More Examples',
      text: '78 × 11:\n7 | (7+8) | 8\n7 | 15 | 8\nCarry: (7+1) | 5 | 8 = 858\n\n95 × 11 = 1045',
      example: '✨ Handle the carry! ✨',
      tip: 'When middle sum ≥ 10, add 1 to the first digit!'
    }
  ],
  25: [
    {
      title: 'Cross Multiply',
      text: 'Two-digit magic method!',
      example: '',
      mnemonic: 'Vedic multiplication'
    },
    {
      title: 'The Pattern',
      text: '23 × 14:\n\n3 × 4 = 12 (right)\n2 × 4 + 3 × 1 = 8 + 3 = 11 (middle)\n2 × 1 = 2 (left)\n\nCombine: 322',
      example: '23 × 14 = 322',
      steps: [
        '✖️ Ones × Ones: 3 × 4 = 12',
        '✖️ Cross: (2 × 4) + (3 × 1) = 11',
        '✖️ Tens × Tens: 2 × 1 = 2',
        '🔗 Combine with carry: 322'
      ]
    },
    {
      title: 'Another Example',
      text: '34 × 26:\n4 × 6 = 24\n(3 × 6) + (4 × 2) = 26\n3 × 2 = 6\nResult: 884',
      example: '✨ Cross Multiply! ✨',
      tip: 'Overlapping products = power!'
    }
  ],
  26: [
    {
      title: 'Break Into Tens',
      text: 'Split numbers before adding!',
      example: '',
      mnemonic: 'Tens + Ones'
    },
    {
      title: 'The Method',
      text: '47 + 35:\nSplit into tens and ones:\n47 = 40 + 7\n35 = 30 + 5\n\nAdd tens: 40 + 30 = 70\nAdd ones: 7 + 5 = 12\nTotal: 70 + 12 = 82',
      example: '47 + 35 = 82',
      steps: [
        '📌 Split: 47 = 40 + 7',
        '📌 Split: 35 = 30 + 5',
        '➕ Tens: 40 + 30 = 70',
        '➕ Ones: 7 + 5 = 12',
        '✅ Total: 82'
      ]
    },
    {
      title: 'Why It Works',
      text: 'Addition is easier when numbers are broken down:\n(40 + 30) + (7 + 5)\n= 70 + 12\n= 82\n\nMental math becomes simpler!',
      example: '✨ Decompose, then add! ✨',
      tip: 'This works for any two-digit numbers!'
    }
  ],
  27: [
    {
      title: 'Left-to-Right Addition',
      text: 'Add from biggest to smallest!',
      example: '',
      mnemonic: 'Hundreds, Tens, Ones'
    },
    {
      title: 'The Pattern',
      text: '246 + 138:\n\nHundreds: 200 + 100 = 300\nTens: 40 + 30 = 70\nOnes: 6 + 8 = 14\n\nTotal: 300 + 70 + 14 = 384',
      example: '246 + 138 = 384',
      steps: [
        '💯 Hundreds: 200 + 100 = 300',
        '➕ Tens: 40 + 30 = 70',
        '➕ Ones: 6 + 8 = 14',
        '✅ Add all: 300 + 70 + 14 = 384'
      ]
    },
    {
      title: 'Why Left-to-Right?',
      text: 'Your brain naturally thinks left-to-right!\n\nNot: 6+8, then 40+30, then 200+100\nBut: 200+100, then 40+30, then 6+8\n\nMuch easier!',
      example: '✨ Biggest first! ✨',
      tip: 'Matches how we read and think naturally!'
    }
  ],
  28: [
    {
      title: 'Compensation',
      text: 'Borrow to round, then adjust!',
      example: '',
      mnemonic: 'Round + Fix'
    },
    {
      title: 'The Trick',
      text: '47 + 28:\n\nRound 28 → 30 (add 2)\n47 + 30 = 77\nBut we added 2 extra!\nSo: 77 − 2 = 75',
      example: '47 + 28 = 75',
      steps: [
        '🔄 Round 28 up to 30',
        '➕ Add: 47 + 30 = 77',
        '➖ Adjust: 77 − 2 = 75',
        '✅ Answer: 75'
      ]
    },
    {
      title: 'Another Example',
      text: '63 + 19:\nRound 19 → 20 (add 1)\n63 + 20 = 83\nAdjust: 83 − 1 = 82\n\nEasier than 63 + 19 directly!',
      example: '✨ Make it round! ✨',
      tip: 'Rounding makes mental math faster!'
    }
  ],
  29: [
    {
      title: 'Benchmark Rounding',
      text: 'Round to nearest 10, add, adjust!',
      example: '',
      mnemonic: 'Round + Add + Fix'
    },
    {
      title: 'The Method',
      text: '347 + 255:\n\nRound 347 → 350 (add 3)\nRound 255 → 260 (add 5)\n350 + 260 = 610\nAdjust: 610 − 3 − 5 = 602',
      example: '347 + 255 = 602',
      steps: [
        '🔄 Round 347 → 350 (+3)',
        '🔄 Round 255 → 260 (+5)',
        '➕ Add: 350 + 260 = 610',
        '➖ Adjust: 610 − 8 = 602'
      ]
    },
    {
      title: 'Why It Works',
      text: 'Numbers close to benchmarks (10, 50, 100, etc.) are easier!\n\nInstead of 347 + 255,\nwe do 350 + 260\nand adjust the difference.\n\nMuch faster mentally!',
      example: '✨ Use benchmarks! ✨',
      tip: 'Benchmarks make large additions manageable!'
    }
  ]
};

/**
 * Math Olympiad Prep — Topics Data
 *
 * 5 topics covering key AMC 8 / MOEMS concepts
 * Each topic has: concept, worked example, and 5 practice problems
 */

// eslint-disable-next-line no-unused-vars
const TOPICS = [
  {
    id: 'number-theory',
    name: 'Number Theory',
    emoji: '🔢',
    tagline: 'Primes, factors, divisibility',

    concept: {
      title: 'Number Theory Basics',
      visual: `
        🔢 Prime vs Composite
        Prime (only 2 factors):
        ✓ 2, 3, 5, 7, 11, 13, 17...

        Composite (3+ factors):
        ✗ 4, 6, 8, 9, 10, 12...
      `,
      points: [
        'A prime number has exactly 2 factors: 1 and itself.',
        'All even numbers > 2 are not prime.',
        'The smallest primes are 2, 3, 5, 7, 11, 13...',
        'To check if N is prime, test divisibility up to √N.'
      ],
      vocabulary: ['Prime', 'Factor', 'Composite']
    },

    example: {
      question: 'Is 37 a prime number?',
      steps: [
        {
          label: 'What do we know?',
          text: 'We need to check if 37 can be divided evenly by any number except 1 and 37.'
        },
        {
          label: 'Our plan:',
          text: '√37 ≈ 6.08, so we only need to test divisibility by 2, 3, and 5.'
        },
        { label: 'Calculate:', text: '37÷2 = 18.5 ✗ | 37÷3 = 12.3 ✗ | 37÷5 = 7.4 ✗' },
        { label: 'Answer:', text: 'No factors found! 37 is prime. ✓' }
      ],
      strategy: 'Square Root Test'
    },

    problems: [
      {
        question: 'Which number is prime?',
        options: ['9', '15', '17', '21'],
        correct: 2,
        hint: 'Check which number has exactly 2 factors.',
        explanation:
          '17 is prime because it only has factors 1 and 17. The others: 9=3×3, 15=3×5, 21=3×7.'
      },
      {
        question: 'How many factors does 12 have?',
        options: ['2', '4', '6', '8'],
        correct: 2,
        hint: 'List all numbers that divide 12 evenly.',
        explanation: "12 has factors: 1, 2, 3, 4, 6, 12 — that's 6 factors total."
      },
      {
        question: 'What is the LCM of 4 and 6?',
        options: ['8', '10', '12', '24'],
        correct: 2,
        hint: 'LCM is the smallest number divisible by both 4 and 6.',
        explanation: 'Multiples of 4: 4,8,12... Multiples of 6: 6,12... The smallest common is 12.'
      },
      {
        question: 'What is the GCD of 24 and 36?',
        options: ['4', '6', '8', '12'],
        correct: 3,
        hint: 'GCD is the largest number that divides both.',
        explanation:
          'Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. Greatest common: 12.'
      },
      {
        question: 'What is the sum of all prime numbers less than 20?',
        options: ['58', '60', '77', '83'],
        correct: 2,
        hint: 'Primes less than 20: 2,3,5,7,11,13,17,19',
        explanation: '2+3+5+7+11+13+17+19 = 77'
      }
    ]
  },

  {
    id: 'fractions',
    name: 'Fractions & Percentages',
    emoji: '🍕',
    tagline: 'Convert, compute, compare',

    concept: {
      title: 'Fractions & Percentages',
      visual: `
        🍕 Fractions show parts
        1/2 = 2/4 = 50%

        🍕 Percent = "per 100"
        25% = 25/100 = 1/4
      `,
      points: [
        'A fraction shows parts of a whole. 3/4 means 3 out of 4 equal parts.',
        'To convert fraction to %: divide top by bottom, multiply by 100.',
        '"X% of Y" means (X÷100) × Y.',
        'When comparing fractions, find a common denominator or convert to decimals.'
      ],
      vocabulary: ['Numerator', 'Denominator', 'Percentage']
    },

    example: {
      question: 'What is 35% of 80?',
      steps: [
        { label: 'What do we know?', text: '"35% of 80" means we need to find 35/100 × 80.' },
        { label: 'Simplify the fraction:', text: '35/100 = 7/20 (divide both by 5)' },
        { label: 'Multiply:', text: '7/20 × 80 = 7 × (80÷20) = 7 × 4 = 28' },
        { label: 'Answer:', text: '35% of 80 = 28' }
      ],
      strategy: 'Fraction Conversion'
    },

    problems: [
      {
        question: '1/4 = ?%',
        options: ['20%', '25%', '30%', '40%'],
        correct: 1,
        hint: 'Divide 1 by 4, then multiply by 100.',
        explanation: '1÷4 = 0.25 → 0.25×100 = 25%'
      },
      {
        question: 'What is 50% of 64?',
        options: ['24', '28', '32', '36'],
        correct: 2,
        hint: '50% means half.',
        explanation: '50% of 64 = 1/2 × 64 = 32'
      },
      {
        question: 'Which fraction is largest?',
        options: ['1/2', '2/5', '3/8', '1/3'],
        correct: 0,
        hint: 'Convert to decimals: 1/2=0.5, 2/5=0.4, 3/8=0.375, 1/3≈0.33',
        explanation: '1/2 = 0.5 is greater than 2/5=0.4, 3/8=0.375, and 1/3≈0.33'
      },
      {
        question: 'If 3/8 of a number is 24, what is the number?',
        options: ['48', '56', '64', '72'],
        correct: 2,
        hint: 'If 3/8 × n = 24, then n = 24 ÷ (3/8) = 24 × (8/3)',
        explanation: '24 × 8 ÷ 3 = 192 ÷ 3 = 64'
      },
      {
        question: 'A $40 item is discounted 20%, then 10% off the new price. Final price?',
        options: ['$26', '$27.20', '$28.80', '$29'],
        correct: 2,
        hint: 'First: 40 × 0.8 = 32. Then: 32 × 0.9 = 28.8',
        explanation: 'After 20% off: $40 × 0.8 = $32. After 10% off that: $32 × 0.9 = $28.80'
      }
    ]
  },

  {
    id: 'geometry',
    name: 'Geometry',
    emoji: '📐',
    tagline: 'Shapes, angles, areas',

    concept: {
      title: 'Geometry Fundamentals',
      visual: `
        📐 Area = space INSIDE
        Perimeter = distance AROUND

        Rectangle: A = l×w
        Triangle: A = (b×h)/2
        Circle: A = πr²
      `,
      points: [
        'Area = the space INSIDE a shape; Perimeter = the distance AROUND.',
        'Rectangle area = length × width; triangle area = (base × height) / 2.',
        'Circle area = π × r²; circumference = 2πr (use π ≈ 3.14).',
        'Angles in a triangle always add to 180°.'
      ],
      vocabulary: ['Area', 'Perimeter', 'Radius']
    },

    example: {
      question: 'A triangle has base 8 and height 5. A square has side 6. Which has larger area?',
      steps: [
        { label: 'Triangle area:', text: '(base × height) / 2 = (8 × 5) / 2 = 40/2 = 20' },
        { label: 'Square area:', text: 'side × side = 6 × 6 = 36' },
        { label: 'Compare:', text: '36 > 20, so the square is larger.' },
        { label: 'Answer:', text: 'The square has the larger area (36 vs 20)' }
      ],
      strategy: 'Formula Application'
    },

    problems: [
      {
        question: 'Rectangle 7×4. What is the perimeter?',
        options: ['22', '24', '28', '56'],
        correct: 0,
        hint: 'Perimeter = 2(length + width) = 2(7+4)',
        explanation: 'Perimeter = 2(7+4) = 2(11) = 22'
      },
      {
        question: 'Triangle with base 10 and height 6. Area?',
        options: ['16', '24', '30', '60'],
        correct: 2,
        hint: 'Area = (base × height) / 2',
        explanation: 'Area = (10 × 6) / 2 = 60/2 = 30'
      },
      {
        question: 'Two angles in a triangle are 60° and 80°. Third angle?',
        options: ['30°', '40°', '50°', '60°'],
        correct: 1,
        hint: 'All angles in a triangle sum to 180°. 180 - 60 - 80 = ?',
        explanation: '180° - 60° - 80° = 40°'
      },
      {
        question: 'Square has area 49. What is its perimeter?',
        options: ['14', '21', '28', '36'],
        correct: 2,
        hint: 'If area = 49, then side = √49 = 7. Perimeter = 4×7.',
        explanation: '√49 = 7. Perimeter = 4 × 7 = 28'
      },
      {
        question: 'Circle with radius 7. Area ≈ ? (use π ≈ 22/7)',
        options: ['132', '154', '176', '198'],
        correct: 1,
        hint: 'Area = πr² = (22/7) × 7² = (22/7) × 49',
        explanation: '(22/7) × 49 = 22 × 7 = 154'
      }
    ]
  },

  {
    id: 'patterns',
    name: 'Patterns & Sequences',
    emoji: '🔷',
    tagline: 'Find the rule, find the answer',

    concept: {
      title: 'Sequences & Patterns',
      visual: `
        🔷 Arithmetic: +4 each time
        3, 7, 11, 15, 19...

        🔷 Squares: 1, 4, 9, 16, 25...
        🔷 Triangular: 1, 3, 6, 10, 15...
      `,
      points: [
        'In an arithmetic sequence, each term increases (or decreases) by the same amount called the "common difference."',
        'To find the nth term: start + (n-1) × difference.',
        'Look for visual dot patterns: triangular numbers (1, 3, 6, 10...), square numbers (1, 4, 9, 16...).',
        'Always find the RULE before solving.'
      ],
      vocabulary: ['Sequence', 'Common Difference', 'Term']
    },

    example: {
      question: 'Find the 10th term of: 3, 7, 11, 15...',
      steps: [
        {
          label: 'Find the pattern:',
          text: 'Differences: 7-3=4, 11-7=4, 15-11=4. Common difference = 4 ✓'
        },
        { label: 'Write the formula:', text: 'nth term = first + (n-1) × d = 3 + (n-1) × 4' },
        {
          label: 'Calculate the 10th:',
          text: '10th term = 3 + (10-1) × 4 = 3 + 9×4 = 3 + 36 = 39'
        },
        { label: 'Answer:', text: 'The 10th term is 39' }
      ],
      strategy: 'Find the Rule First'
    },

    problems: [
      {
        question: 'Next number in 2, 5, 8, 11, _?',
        options: ['13', '14', '15', '16'],
        correct: 1,
        hint: 'Each number increases by 3.',
        explanation: 'Difference is +3 each time. 11 + 3 = 14'
      },
      {
        question: '100th term of 1, 3, 5, 7...?',
        options: ['197', '199', '200', '201'],
        correct: 1,
        hint: 'These are odd numbers. The nth odd number = 2n - 1.',
        explanation: '100th odd number = 2(100) - 1 = 199'
      },
      {
        question: 'Which follows the pattern of square numbers?',
        options: ['1,4,9,12', '1,4,9,16', '1,4,9,25', '1,4,9,36'],
        correct: 1,
        hint: 'Square numbers: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25...',
        explanation: 'Squares are 1, 4, 9, 16, 25, 36... So 1,4,9,16 is correct.'
      },
      {
        question: 'Sum of first 10 terms of 5, 10, 15, 20...?',
        options: ['275', '300', '325', '350'],
        correct: 0,
        hint: 'Sum = (count/2) × (first + last). Last term = 5 × 10 = 50.',
        explanation: 'Sum = (10/2) × (5 + 50) = 5 × 55 = 275'
      },
      {
        question: 'Triangular numbers: 1,3,6,10,15... What is the 8th?',
        options: ['28', '32', '36', '40'],
        correct: 2,
        hint: 'Each triangular number = sum of 1+2+3+...+n. The 8th = 1+2+3+4+5+6+7+8.',
        explanation: '1+2+3+4+5+6+7+8 = 36. Or use formula: n(n+1)/2 = 8×9/2 = 36.'
      }
    ]
  },

  {
    id: 'counting-logic',
    name: 'Counting & Logic',
    emoji: '🎯',
    tagline: 'Organize, count, solve',

    concept: {
      title: 'Counting & Logical Reasoning',
      visual: `
        🎯 Fundamental Counting Principle
        Event A: 3 ways
        Event B: 2 ways
        Together: 3 × 2 = 6 ways
      `,
      points: [
        'The Fundamental Counting Principle: if one event has A ways and another has B ways, together there are A × B ways.',
        "Always organize your counting systematically — don't guess, list it out!",
        'Permutations: order matters (arrange 3 books = 3×2×1 = 6 ways).',
        "Combinations: order doesn't matter (choose 2 from 4 = 6 ways)."
      ],
      vocabulary: ['Permutation', 'Combination', 'Fundamental Counting Principle']
    },

    example: {
      question: 'How many 2-digit numbers from digits 1, 2, 3? (digits can repeat)',
      steps: [
        { label: 'First digit:', text: 'Has 3 choices: 1, 2, or 3.' },
        { label: 'Second digit:', text: 'Also has 3 choices (repetition allowed): 1, 2, or 3.' },
        { label: 'Use Fundamental Counting:', text: '3 × 3 = 9 different numbers' },
        { label: 'Verify by listing:', text: '11,12,13,21,22,23,31,32,33 — exactly 9! ✓' }
      ],
      strategy: 'Fundamental Counting Principle'
    },

    problems: [
      {
        question: 'Ice cream: 4 flavors, 2 toppings. How many combinations?',
        options: ['6', '8', '10', '12'],
        correct: 1,
        hint: 'By Fundamental Counting: 4 × 2 = ?',
        explanation: '4 × 2 = 8 different combinations'
      },
      {
        question: 'How many ways to arrange letters A, B, C?',
        options: ['3', '6', '9', '12'],
        correct: 1,
        hint: 'Permutations: 3 × 2 × 1',
        explanation: 'ABC, ACB, BAC, BCA, CAB, CBA — 3! = 3 × 2 × 1 = 6'
      },
      {
        question: 'Rolling a die and flipping a coin. Total outcomes?',
        options: ['8', '10', '12', '14'],
        correct: 2,
        hint: 'Die has 6 outcomes, coin has 2. Together: 6 × 2 = ?',
        explanation: '6 × 2 = 12 total outcomes'
      },
      {
        question: '5 friends, choose 2 for a team. How many ways?',
        options: ['8', '10', '12', '15'],
        correct: 1,
        hint: "Combination (order doesn't matter): C(5,2) = 10",
        explanation: 'C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10'
      },
      {
        question: '3-digit numbers using 1,2,3,4 (no repeats). How many?',
        options: ['12', '16', '20', '24'],
        correct: 3,
        hint: 'Permutation: first digit 4 choices, second 3 choices, third 2 choices.',
        explanation: '4 × 3 × 2 = 24'
      }
    ]
  }
];

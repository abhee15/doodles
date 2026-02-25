/**
 * Brain Spark Game
 * Logic puzzle game with 4 categories, visual aids, and progressive difficulty
 */

// Game state
const state = {
  currentCategory: null,
  difficulty: 'normal',
  questions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  timerInterval: null,
  timeLeft: 20,
  answered: false
};

// Puzzle Data
const PUZZLES = {
  'number-patterns': {
    normal: [
      {
        id: 'np1',
        question: 'What comes next?',
        visual: {
          type: 'sequence',
          items: ['2', '4', '6', '8', '?']
        },
        options: ['10', '12', '9', '11'],
        answer: 0,
        explanation: 'Add 2 each time: 2, 4, 6, 8, 10 ✓'
      },
      {
        id: 'np2',
        question: 'What is the next number?',
        visual: {
          type: 'sequence',
          items: ['5', '10', '20', '40', '?']
        },
        options: ['80', '60', '50', '45'],
        answer: 0,
        explanation: 'Double each time: 5, 10, 20, 40, 80 ✓'
      },
      {
        id: 'np3',
        question: 'Continue the pattern.',
        visual: {
          type: 'sequence',
          items: ['100', '90', '80', '70', '?']
        },
        options: ['60', '50', '40', '30'],
        answer: 0,
        explanation: 'Count down by 10: 100, 90, 80, 70, 60 ✓'
      },
      {
        id: 'np4',
        question: 'What comes next in this special pattern?',
        visual: {
          type: 'sequence',
          items: ['1', '1', '2', '3', '5', '8', '?']
        },
        options: ['13', '11', '10', '12'],
        answer: 0,
        explanation: 'Fibonacci! Add the two before it: 5+8=13 ✓'
      },
      {
        id: 'np5',
        question: 'Find the next number.',
        visual: {
          type: 'sequence',
          items: ['3', '6', '9', '12', '?']
        },
        options: ['15', '18', '12', '14'],
        answer: 0,
        explanation: 'The 3 times table: 3, 6, 9, 12, 15 ✓'
      },
      {
        id: 'np6',
        question: 'What is the next in the sequence?',
        visual: {
          type: 'sequence',
          items: ['1', '2', '4', '8', '16', '?']
        },
        options: ['32', '24', '18', '20'],
        answer: 0,
        explanation: 'Powers of 2 - keep doubling: 1, 2, 4, 8, 16, 32 ✓'
      },
      {
        id: 'np7',
        question: 'Continue the pattern.',
        visual: {
          type: 'sequence',
          items: ['10', '8', '6', '4', '?']
        },
        options: ['2', '0', '1', '3'],
        answer: 0,
        explanation: 'Counting down by 2: 10, 8, 6, 4, 2 ✓'
      }
    ],
    challenge: [
      {
        id: 'np-c1',
        question: 'What is the next perfect square?',
        visual: {
          type: 'sequence',
          items: ['1', '4', '9', '16', '25', '?']
        },
        options: ['36', '30', '35', '40'],
        answer: 0,
        explanation: '1², 2², 3², 4², 5², 6² = 36 ✓'
      },
      {
        id: 'np-c2',
        question: 'Continue this special number pattern.',
        visual: {
          type: 'sequence',
          items: ['2', '3', '5', '7', '11', '?']
        },
        options: ['13', '12', '14', '15'],
        answer: 0,
        explanation: 'Prime numbers! Numbers only divisible by 1 and themselves ✓'
      },
      {
        id: 'np-c3',
        question: 'What is the next in this tricky pattern?',
        visual: {
          type: 'sequence',
          items: ['1', '11', '21', '1211', '111221', '?']
        },
        options: ['312211', '211211', '121221', '221211'],
        answer: 0,
        explanation: 'Look-and-say: "one 1, one 2, one 1" → "312211" ✓'
      },
      {
        id: 'np-c4',
        question: 'Find the next triangle number.',
        visual: {
          type: 'sequence',
          items: ['0', '1', '3', '6', '10', '?']
        },
        options: ['15', '14', '16', '18'],
        answer: 0,
        explanation: 'Add 1, then 2, then 3, then 4, then 5: 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15 ✓'
      }
    ]
  },

  'logic-riddles': {
    normal: [
      {
        id: 'lr1',
        question: "I have hands but can't clap. What am I?",
        visual: {
          type: 'scene',
          emoji: '🕐',
          caption: 'I have hands but cannot clap...'
        },
        options: ['Clock', 'Tree', 'Robot', 'Person'],
        answer: 0,
        explanation: 'A Clock! ⏰ Clock hands point to numbers but cannot clap.'
      },
      {
        id: 'lr2',
        question: 'What goes up but never comes down?',
        visual: {
          type: 'scene',
          emoji: '📈',
          caption: 'It only goes one way...'
        },
        options: ['Your age', 'A ball', 'Smoke', 'A ladder'],
        answer: 0,
        explanation: 'Your age! 🎂 Birthdays only go forward, never backward.'
      },
      {
        id: 'lr3',
        question: 'A rooster lays an egg on a barn roof. Which way does it roll?',
        visual: {
          type: 'scene',
          emoji: '🐓',
          caption: 'A rooster on a roof...'
        },
        options: ["Roosters don't lay eggs!", 'Left', 'Right', 'Down'],
        answer: 0,
        explanation: "Roosters don't lay eggs! 🐓 Only hens lay eggs. Classic trick!"
      },
      {
        id: 'lr4',
        question: 'How many months have 28 days?',
        visual: {
          type: 'scene',
          emoji: '📅',
          caption: 'All the months of the year...'
        },
        options: ['All 12!', 'Only February', '1', '7'],
        answer: 0,
        explanation: 'All 12 months! 📅 Every month has at least 28 days.'
      },
      {
        id: 'lr5',
        question: 'The more you take, the more you leave behind. What am I?',
        visual: {
          type: 'scene',
          emoji: '👣',
          caption: 'With each step forward...'
        },
        options: ['Footsteps', 'Money', 'Time', 'Words'],
        answer: 0,
        explanation: 'Footsteps! 👣 Each step you take leaves a footprint behind.'
      },
      {
        id: 'lr6',
        question: 'What has teeth but cannot bite?',
        visual: {
          type: 'scene',
          emoji: '🪮',
          caption: 'Used for hair...'
        },
        options: ['A comb', 'A shark', 'A fork', 'A saw'],
        answer: 0,
        explanation: "A comb! 🪮 It has teeth but can't bite anything."
      },
      {
        id: 'lr7',
        question: "I'm light as a feather but the strongest person can't hold me long. What am I?",
        visual: {
          type: 'scene',
          emoji: '💨',
          caption: 'Something invisible...'
        },
        options: ['Breath', 'Air', 'Smoke', 'A secret'],
        answer: 0,
        explanation: 'Breath! 💨 Even strong people can only hold their breath for a short time.'
      }
    ],
    challenge: [
      {
        id: 'lr-c1',
        question: 'If you throw a blue stone into a red sea, what happens?',
        visual: {
          type: 'scene',
          emoji: '🌊',
          caption: 'Colored objects in water...'
        },
        options: ['It gets wet!', 'Turns purple', 'Sinks', 'Floats'],
        answer: 0,
        explanation:
          'It gets wet! 💧 A silly trick question - stone = object, red sea = body of water.'
      },
      {
        id: 'lr-c2',
        question: 'A doctor gives you 3 pills: take one every half hour. How long do they last?',
        visual: {
          type: 'scene',
          emoji: '⏰',
          caption: 'Pill 1 now, Pill 2 later...'
        },
        options: ['1 hour', '30 minutes', '90 minutes', '2 hours'],
        answer: 0,
        explanation:
          '1 hour! ⏰ Pill 1 at 0 min, Pill 2 at 30 min, Pill 3 at 60 min = 1 hour total.'
      },
      {
        id: 'lr-c3',
        question: 'Two fathers and two sons go fishing and catch 3 fish — one each. How?',
        visual: {
          type: 'scene',
          emoji: '🎣',
          caption: 'Three people, three fish...'
        },
        options: [
          'Grandfather, father, son',
          'Three brothers',
          'Two dads & one kid',
          'Three friends'
        ],
        answer: 0,
        explanation:
          "Grandfather, father, son! 👨‍👩‍👦 That's 2 fathers (grandpa, dad) and 2 sons (dad, kid)."
      },
      {
        id: 'lr-c4',
        question: 'If 5 cats catch 5 mice in 5 minutes, how long for 1 cat to catch 1 mouse?',
        visual: {
          type: 'scene',
          emoji: '🐱',
          caption: 'Working at the same rate...'
        },
        options: ['5 minutes', '1 minute', '25 minutes', '2 minutes'],
        answer: 0,
        explanation:
          '5 minutes! 🐱 Each cat catches at the same rate. 1 cat takes 5 min to catch 1 mouse.'
      }
    ]
  },

  'odd-one-out': {
    normal: [
      {
        id: 'ooo1',
        question: "Which one doesn't belong?",
        visual: {
          type: 'grid',
          items: ['🐶', '🐱', '🐠', '🦁']
        },
        options: ['Fish', 'Dog', 'Cat', 'Lion'],
        answer: 0,
        explanation: "🐠 Fish is different! It's the only one that lives in water."
      },
      {
        id: 'ooo2',
        question: 'Which one is different?',
        visual: {
          type: 'grid',
          items: ['🍎', '🍊', '🍋', '🥕']
        },
        options: ['Carrot', 'Apple', 'Orange', 'Lemon'],
        answer: 0,
        explanation: "🥕 Carrot! It's the only vegetable; the others are fruits."
      },
      {
        id: 'ooo3',
        question: "Which number doesn't fit the pattern?",
        visual: {
          type: 'grid',
          items: ['2', '4', '6', '9']
        },
        options: ['9', '2', '4', '6'],
        answer: 0,
        explanation: '9 is odd! All the others (2, 4, 6) are even numbers.'
      },
      {
        id: 'ooo4',
        question: 'Which bird is different?',
        visual: {
          type: 'grid',
          items: ['🦅', '🦆', '🐦', '🐧']
        },
        options: ['Penguin', 'Eagle', 'Duck', 'Bird'],
        answer: 0,
        explanation: "🐧 Penguin! It's the only bird that cannot fly."
      },
      {
        id: 'ooo5',
        question: "What doesn't belong?",
        visual: {
          type: 'grid',
          items: ['Mon', 'Tue', 'Jul', 'Fri']
        },
        options: ['July', 'Monday', 'Tuesday', 'Friday'],
        answer: 0,
        explanation: "July (Jul)! It's the only month; the others are days of the week."
      },
      {
        id: 'ooo6',
        question: "Which doesn't fit?",
        visual: {
          type: 'grid',
          items: ['3', '6', '9', '14']
        },
        options: ['14', '3', '6', '9'],
        answer: 0,
        explanation: '14 breaks the pattern! 3, 6, 9 are in the 3 times table.'
      },
      {
        id: 'ooo7',
        question: 'What is different?',
        visual: {
          type: 'grid',
          items: ['🌍', '🌙', '☀️', '⭐']
        },
        options: ['Moon', 'Earth', 'Sun', 'Star'],
        answer: 0,
        explanation: "🌙 Moon! It's the only one that doesn't produce its own light."
      }
    ],
    challenge: [
      {
        id: 'ooo-c1',
        question: 'Which planet is different?',
        visual: {
          type: 'grid',
          items: ['Earth', 'Venus', 'Pluto', 'Mars']
        },
        options: ['Pluto', 'Earth', 'Venus', 'Mars'],
        answer: 0,
        explanation: "Pluto! It's a dwarf planet now, not a full planet (reclassified in 2006)."
      },
      {
        id: 'ooo-c2',
        question: "Which number doesn't belong?",
        visual: {
          type: 'grid',
          items: ['11', '13', '15', '17']
        },
        options: ['15', '11', '13', '17'],
        answer: 0,
        explanation: '15 is not prime! (15 = 3 × 5). The others are prime numbers.'
      },
      {
        id: 'ooo-c3',
        question: 'Which creature is different?',
        visual: {
          type: 'grid',
          items: ['🦈', '🐳', '🐬', '🐙']
        },
        options: ['Octopus', 'Shark', 'Whale', 'Dolphin'],
        answer: 0,
        explanation: "🐙 Octopus! It's the only invertebrate (no backbone)."
      },
      {
        id: 'ooo-c4',
        question: "What's out of order?",
        visual: {
          type: 'grid',
          items: ['Mercury', 'Venus', 'Earth', 'Neptune']
        },
        options: ['Neptune', 'Mercury', 'Venus', 'Earth'],
        answer: 0,
        explanation: "Neptune! It's the 8th planet. The others (1st, 2nd, 3rd) are inner planets."
      }
    ]
  },

  'math-tricks': {
    normal: [
      {
        id: 'mt1',
        question: 'A bat and ball cost $1.10. The bat costs $1 more. How much does the ball cost?',
        visual: {
          type: 'equation',
          tokens: ['🦇', '+', '⚾', '=', '$1.10'],
          highlight: [4]
        },
        options: ['$0.05', '$0.10', '$0.55', '$1.00'],
        answer: 0,
        explanation:
          '5 cents! 🦇 + ⚾ = $1.10, with bat costing $1 more. So: $1.05 + $0.05 = $1.10 ✓'
      },
      {
        id: 'mt2',
        question: 'How many times can you subtract 10 from 100?',
        visual: {
          type: 'equation',
          tokens: ['100', '-', '10', '=', '?'],
          highlight: [4]
        },
        options: ['Once!', '10 times', 'Unlimited', 'Not possible'],
        answer: 0,
        explanation: "Once! After you subtract 10, it's 90, not 100 anymore. Classic trick!"
      },
      {
        id: 'mt3',
        question: 'A farmer has 17 sheep. All but 9 run away. How many are left?',
        visual: {
          type: 'equation',
          tokens: ['17', '-', 'all but 9', '=', '?'],
          highlight: [4]
        },
        options: ['9', '8', '17', '0'],
        answer: 0,
        explanation: '9! "All but 9" means 9 stayed. The trick is the wording!'
      },
      {
        id: 'mt4',
        question: "I'm an odd number. Remove one letter and I'm even. What am I?",
        visual: {
          type: 'equation',
          tokens: ['???', '-', '1 letter', '=', 'EVEN'],
          highlight: [4]
        },
        options: ['SEVEN', 'NINE', 'THREE', 'FIVE'],
        answer: 0,
        explanation: 'SEVEN! Remove the "S" and you get EVEN. Spelling riddle!'
      },
      {
        id: 'mt5',
        question: '3 hens lay 3 eggs in 3 days. How many eggs do 6 hens lay in 6 days?',
        visual: {
          type: 'equation',
          tokens: ['🐔', '×', '2', '×', '2', '=', '?'],
          highlight: [6]
        },
        options: ['12', '6', '24', '18'],
        answer: 0,
        explanation: '12 eggs! 1 hen lays 1 egg every 3 days. So 6 hens in 6 days = 12 eggs.'
      },
      {
        id: 'mt6',
        question: 'What is 1000 + 40 + 1000 + 30 + 1000 + 20 + 1000 + 10?',
        visual: {
          type: 'equation',
          tokens: ['1000', '+', '40', '+', '...', '=', '?'],
          highlight: [6]
        },
        options: ['4100', '5000', '4090', '3000'],
        answer: 0,
        explanation: '4100! Four 1000s = 4000, plus 40+30+20+10 = 100. Total = 4100!'
      },
      {
        id: 'mt7',
        question: "You're in a race and overtake the person in 2nd place. What place are you in?",
        visual: {
          type: 'equation',
          tokens: ['2nd place', '+', 'overtake', '=', '?'],
          highlight: [4]
        },
        options: ['2nd!', '1st', '3rd', 'Last'],
        answer: 0,
        explanation: "You're in 2nd! When you overtake the person in 2nd, you take their spot."
      }
    ],
    challenge: [
      {
        id: 'mt-c1',
        question: 'What is 100 ÷ ½ + 10?',
        visual: {
          type: 'equation',
          tokens: ['100', '÷', '½', '+', '10', '=', '?'],
          highlight: [6]
        },
        options: ['210', '60', '110', '160'],
        answer: 0,
        explanation: '210! 100÷0.5=200, then +10=210. Order of operations matters!'
      },
      {
        id: 'mt-c2',
        question: 'How many squares are in a 4×4 grid?',
        visual: {
          type: 'equation',
          tokens: ['1×1', '+', '2×2', '+', '3×3', '+', '?'],
          highlight: [0]
        },
        options: ['30', '16', '25', '40'],
        answer: 0,
        explanation: '30! Count: 1×1 (16) + 2×2 (9) + 3×3 (4) + 4×4 (1) = 30 squares!'
      },
      {
        id: 'mt-c3',
        question: 'With 3 straight cuts, max how many pizza slices?',
        visual: {
          type: 'equation',
          tokens: ['🍕', '✂️', '3 times', '=', 'max?'],
          highlight: [4]
        },
        options: ['7', '6', '8', '9'],
        answer: 0,
        explanation:
          '7 pieces! Line 1 = 2 slices, Line 2 = 4 slices, Line 3 = 7 slices (crossing all).'
      },
      {
        id: 'mt-c4',
        question: 'A bacteria doubles every day. Day 30 it fills a pond. When was it half full?',
        visual: {
          type: 'equation',
          tokens: ['Day 30', '=', 'full', '→', 'Day', '?', '=', 'half'],
          highlight: [5]
        },
        options: ['Day 29', 'Day 15', 'Day 28', 'Day 1'],
        answer: 0,
        explanation: 'Day 29! Doubling means yesterday was exactly half. Exponential growth!'
      }
    ]
  }
};

// Initialize navigation
let nav = null;

// Fisher-Yates shuffle
function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
  initGame();
});

function initGame() {
  // Set up navigation
  nav = new GameNavigation('brain-spark', {
    screens: ['landing', 'category', 'play', 'explain', 'results'],
    initialScreen: 'landing',
    gameName: 'Brain Spark',
    titles: {
      landing: 'Brain Spark',
      category: 'Choose Category',
      play: 'Play Quiz',
      explain: 'Explanation',
      results: 'Quiz Complete!'
    }
  });

  // Landing button
  document.getElementById('start-btn').addEventListener('click', () => {
    nav.goToScreen('category');
  });

  // Difficulty toggles
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.difficulty;
    });
  });

  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      selectCategory(card.dataset.category);
    });
  });

  // Continue button (explain screen)
  document.getElementById('continue-btn').addEventListener('click', () => {
    nextQuestion();
  });

  // Try again button
  document.getElementById('try-again-btn').addEventListener('click', () => {
    startGame();
  });

  // Categories button
  document.getElementById('categories-btn').addEventListener('click', () => {
    nav.goToScreen('category');
  });

  // Update category counts
  updateCategoryCounts();
}

function updateCategoryCounts() {
  Object.keys(PUZZLES).forEach(category => {
    const normalCount = PUZZLES[category].normal.length;
    const challengeCount = PUZZLES[category].challenge.length;
    const total = normalCount + challengeCount;
    document.getElementById(`count-${category}`).textContent = total;
  });
}

function selectCategory(categoryId) {
  state.currentCategory = categoryId;
  state.difficulty = 'normal';
  document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-difficulty="normal"]').classList.add('active');
  startGame();
}

function startGame() {
  const puzzlePool = PUZZLES[state.currentCategory][state.difficulty];
  state.questions = shuffle(puzzlePool).slice(0, 8);
  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.maxStreak = 0;
  state.answered = false;
  state.timeLeft = 20;

  // Show timer bar only in challenge mode
  const timerBar = document.getElementById('timer-bar');
  if (state.difficulty === 'challenge') {
    timerBar.style.display = 'block';
    startTimer();
  } else {
    timerBar.style.display = 'none';
  }

  nav.goToScreen('play');
  renderQuestion();
}

function renderQuestion() {
  const puzzle = state.questions[state.currentIndex];

  // Update progress
  document.getElementById('progress-text').textContent = `${state.currentIndex + 1} / 8`;

  // Update streak
  const streakEl = document.getElementById('streak-display');
  if (state.streak > 0) {
    streakEl.textContent = `🔥 ${state.streak}`;
  } else {
    streakEl.textContent = '';
  }

  // Render visual
  renderVisual(puzzle);

  // Render question
  document.getElementById('question-text').textContent = puzzle.question;

  // Render answer buttons
  const buttonContainer = document.getElementById('answer-buttons');
  buttonContainer.innerHTML = '';

  puzzle.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(index));
    buttonContainer.appendChild(btn);
  });

  state.answered = false;

  // Reset timer for new question
  if (state.difficulty === 'challenge') {
    state.timeLeft = 20;
    updateTimerBar();
  }
}

function renderVisual(puzzle) {
  const container = document.getElementById('visual-container');
  container.innerHTML = '';

  switch (puzzle.visual.type) {
    case 'sequence':
      renderSequence(puzzle.visual, container);
      break;
    case 'scene':
      renderScene(puzzle.visual, container);
      break;
    case 'grid':
      renderGrid(puzzle.visual, container);
      break;
    case 'equation':
      renderEquation(puzzle.visual, container);
      break;
  }
}

function renderSequence(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-sequence';

  visual.items.forEach((item, i) => {
    const tile = document.createElement('div');
    tile.className = item === '?' ? 'seq-tile seq-tile--unknown' : 'seq-tile';
    tile.textContent = item;

    if (item !== '?') {
      const category = state.currentCategory;
      const colors = {
        'number-patterns': '#4f46e5',
        'logic-riddles': '#059669',
        'odd-one-out': '#dc2626',
        'math-tricks': '#d97706'
      };
      tile.style.borderColor = colors[category] || 'var(--dom-accent)';
      tile.style.color = colors[category] || 'var(--dom-accent)';
    }

    div.appendChild(tile);

    if (i < visual.items.length - 1 && item !== '?') {
      const arrow = document.createElement('div');
      arrow.className = 'seq-arrow';
      arrow.textContent = '→';
      div.appendChild(arrow);
    }
  });

  container.appendChild(div);
}

function renderScene(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-scene';

  const emoji = document.createElement('div');
  emoji.className = 'scene-emoji';
  emoji.textContent = visual.emoji;

  const caption = document.createElement('p');
  caption.className = 'scene-caption';
  caption.textContent = visual.caption;

  div.appendChild(emoji);
  div.appendChild(caption);
  container.appendChild(div);
}

function renderGrid(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-grid';

  visual.items.forEach(item => {
    const cell = document.createElement('div');
    cell.className = 'grid-item';
    cell.textContent = item;
    div.appendChild(cell);
  });

  container.appendChild(div);
}

function renderEquation(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-equation';

  visual.tokens.forEach((token, i) => {
    const span = document.createElement('span');

    if (i % 2 === 0) {
      // Token
      span.className = visual.highlight && visual.highlight.includes(i) ? 'eq-value' : 'eq-token';
      span.textContent = token;
    } else {
      // Operator
      span.className = 'eq-op';
      span.textContent = token;
    }

    div.appendChild(span);
  });

  container.appendChild(div);
}

function checkAnswer(selectedIndex) {
  if (state.answered) {
    return;
  }
  state.answered = true;

  if (state.difficulty === 'challenge') {
    stopTimer();
  }

  const puzzle = state.questions[state.currentIndex];
  const buttons = document.querySelectorAll('.answer-btn');
  const correct = selectedIndex === puzzle.answer;

  // Disable all buttons
  buttons.forEach(btn => (btn.disabled = true));

  // Highlight answer
  if (correct) {
    buttons[selectedIndex].classList.add('correct');
    state.score++;
    state.streak++;
    if (state.streak > state.maxStreak) {
      state.maxStreak = state.streak;
    }
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[puzzle.answer].classList.add('correct');
    state.streak = 0;
  }

  // Show explanation after delay
  setTimeout(() => {
    showExplain(puzzle, correct);
  }, 1500);
}

function showExplain(puzzle, isCorrect) {
  document.getElementById('explain-emoji').textContent = isCorrect ? '✨' : '💡';
  document.getElementById('explain-title').textContent = isCorrect ? 'Excellent!' : 'Not quite!';
  document.getElementById('explain-answer').textContent =
    `Correct: ${puzzle.options[puzzle.answer]}`;
  document.getElementById('explain-text').textContent = puzzle.explanation;

  nav.goToScreen('explain');
}

function nextQuestion() {
  state.currentIndex++;

  if (state.currentIndex >= state.questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function showResults() {
  saveProgress();

  const percentage = (state.score / state.questions.length) * 100;
  let stars = 0;
  if (percentage >= 100) {
    stars = 3;
  } else if (percentage >= 80) {
    stars = 2;
  } else if (percentage >= 60) {
    stars = 1;
  }

  const starsDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  document.getElementById('stars-display').textContent = starsDisplay;
  document.getElementById('final-score').textContent = `${state.score} / ${state.questions.length}`;

  const streakText = state.maxStreak > 0 ? `🔥 Best streak: ${state.maxStreak}` : '';
  document.getElementById('final-streak').textContent = streakText;

  nav.goToScreen('results');
}

function saveProgress() {
  const key = `brainspark-${state.currentCategory}-${state.difficulty}`;
  const percentage = (state.score / state.questions.length) * 100;
  let stars = 0;
  if (percentage >= 100) {
    stars = 3;
  } else if (percentage >= 80) {
    stars = 2;
  } else if (percentage >= 60) {
    stars = 1;
  }

  const data = {
    stars,
    score: state.score,
    maxStreak: state.maxStreak,
    lastPlayedDate: new Date().toISOString()
  };

  localStorage.setItem(key, JSON.stringify(data));
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerBar();

    if (state.timeLeft <= 0) {
      stopTimer();
      // Auto-submit wrong answer
      if (!state.answered) {
        checkAnswer(-1);
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
}

function updateTimerBar() {
  const fill = document.getElementById('timer-fill');
  const percentage = (state.timeLeft / 20) * 100;
  fill.style.width = `${percentage}%`;

  if (state.timeLeft <= 5) {
    fill.classList.add('danger');
  } else {
    fill.classList.remove('danger');
  }
}

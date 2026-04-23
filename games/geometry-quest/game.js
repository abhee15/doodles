'use strict';

const QUESTIONS = [
  // Shapes
  {
    q: 'How many sides does a triangle have?',
    choices: ['2', '3', '4', '5'],
    answer: 1,
    emoji: '🔺',
    fact: 'A triangle has 3 sides and 3 angles. "Tri" means 3!'
  },
  {
    q: 'How many sides does a square have?',
    choices: ['3', '4', '5', '6'],
    answer: 1,
    emoji: '🟥',
    fact: 'A square has 4 equal sides and 4 right angles (90°).'
  },
  {
    q: 'What shape has all points the same distance from the center?',
    choices: ['Square', 'Triangle', 'Circle', 'Rectangle'],
    answer: 2,
    emoji: '⭕',
    fact: 'A circle! Every point on a circle is the same distance from the center (radius).'
  },
  {
    q: 'A rectangle has how many right angles?',
    choices: ['2', '3', '4', '6'],
    answer: 2,
    emoji: '🟦',
    fact: 'A rectangle has 4 right angles (90° each). A square is a special rectangle!'
  },
  {
    q: 'How many sides does a pentagon have?',
    choices: ['4', '5', '6', '7'],
    answer: 1,
    emoji: '⬠',
    fact: '"Penta" means 5. A pentagon has 5 sides — like the famous building in the USA!'
  },
  {
    q: 'How many sides does a hexagon have?',
    choices: ['5', '6', '7', '8'],
    answer: 1,
    emoji: '⬡',
    fact: 'A hexagon has 6 sides. Honeybees build hexagons because they are the most efficient shape!'
  },
  {
    q: 'Which shape has NO corners?',
    choices: ['Square', 'Triangle', 'Circle', 'Pentagon'],
    answer: 2,
    emoji: '🔵',
    fact: 'A circle has no corners (vertices) and no straight sides — it is perfectly round.'
  },
  // Area
  {
    q: 'What is the area of a square with side 4 cm?',
    choices: ['8 cm²', '12 cm²', '16 cm²', '20 cm²'],
    answer: 2,
    emoji: '📐',
    fact: 'Area of square = side × side = 4 × 4 = 16 cm².'
  },
  {
    q: 'What is the area of a rectangle 5 cm wide and 3 cm tall?',
    choices: ['8 cm²', '15 cm²', '16 cm²', '10 cm²'],
    answer: 1,
    emoji: '📏',
    fact: 'Area of rectangle = width × height = 5 × 3 = 15 cm².'
  },
  {
    q: 'A square has area 9 cm². What is the length of one side?',
    choices: ['2 cm', '3 cm', '4 cm', '5 cm'],
    answer: 1,
    emoji: '🟩',
    fact: 'If area = 9, then side × side = 9, so side = 3 cm (because 3 × 3 = 9).'
  },
  {
    q: 'What is the area of a rectangle 6 m wide and 4 m tall?',
    choices: ['20 m²', '24 m²', '10 m²', '48 m²'],
    answer: 1,
    emoji: '🏠',
    fact: 'Area = 6 × 4 = 24 m². We use m² (square metres) for area.'
  },
  // Perimeter
  {
    q: 'What is the perimeter of a square with side 5 cm?',
    choices: ['10 cm', '15 cm', '20 cm', '25 cm'],
    answer: 2,
    emoji: '🔲',
    fact: 'Perimeter = 4 × side = 4 × 5 = 20 cm. Perimeter is the total distance around!'
  },
  {
    q: 'What is the perimeter of a rectangle 8 cm × 3 cm?',
    choices: ['11 cm', '22 cm', '24 cm', '16 cm'],
    answer: 1,
    emoji: '📐',
    fact: 'Perimeter = 2 × (length + width) = 2 × (8 + 3) = 2 × 11 = 22 cm.'
  },
  {
    q: 'What is the perimeter of a triangle with sides 3, 4, and 5 cm?',
    choices: ['10 cm', '12 cm', '15 cm', '7 cm'],
    answer: 1,
    emoji: '📏',
    fact: 'Perimeter = sum of all sides = 3 + 4 + 5 = 12 cm.'
  },
  // Angles
  {
    q: 'How many degrees is a right angle?',
    choices: ['45°', '90°', '180°', '360°'],
    answer: 1,
    emoji: '📐',
    fact: 'A right angle is exactly 90°. You see it at the corner of a square!'
  },
  {
    q: 'A straight line makes an angle of...',
    choices: ['90°', '180°', '270°', '360°'],
    answer: 1,
    emoji: '➡️',
    fact: 'A straight line = 180°. Half of a full turn (360°)!'
  },
  {
    q: 'Angles in a triangle always add up to...',
    choices: ['90°', '180°', '270°', '360°'],
    answer: 1,
    emoji: '🔺',
    fact: 'The three angles in ANY triangle always add up to exactly 180°. Amazing!'
  },
  {
    q: 'An acute angle is...',
    choices: ['Exactly 90°', 'More than 90°', 'Less than 90°', 'Exactly 180°'],
    answer: 2,
    emoji: '📌',
    fact: 'An acute angle is less than 90°. Think of a sharp, pointed angle!'
  },
  {
    q: 'An obtuse angle is...',
    choices: ['Less than 90°', 'Exactly 90°', 'Between 90° and 180°', 'More than 180°'],
    answer: 2,
    emoji: '📌',
    fact: 'An obtuse angle is between 90° and 180° — bigger than a right angle but not straight.'
  },
  {
    q: 'A full circle has how many degrees?',
    choices: ['90°', '180°', '270°', '360°'],
    answer: 3,
    emoji: '🔄',
    fact: 'A full circle (full turn) = 360°. That is why clocks have 360° faces!'
  }
];

const TOTAL = 10;
const state = { score: 0, round: 0, used: new Set(), current: null, answered: false };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function pickQ() {
  const avail = QUESTIONS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.used.has(i);
  });
  if (avail.length === 0) {
    state.used.clear();
    return pickQ();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return QUESTIONS[idx];
}

function startRound() {
  state.current = pickQ();
  state.answered = false;
  document.getElementById('round-label').textContent = `Round ${state.round + 1} of ${TOTAL}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('q-emoji').textContent = state.current.emoji;
  document.getElementById('q-text').textContent = state.current.q;
  document.getElementById('fact-box').textContent = '';
  document.getElementById('fact-box').style.display = 'none';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  buildChoices();
  showScreen('screen-game');
}

function buildChoices() {
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  state.current.choices.forEach(function (c, i) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c;
    btn.addEventListener('click', function () {
      handleChoice(btn, i);
    });
    grid.appendChild(btn);
  });
}

function handleChoice(btn, idx) {
  if (state.answered) {
    return;
  }
  state.answered = true;
  document.querySelectorAll('.choice-btn').forEach(function (b, i) {
    b.disabled = true;
    if (i === state.current.answer) {
      b.classList.add('correct-choice');
    }
  });
  document.getElementById('fact-box').textContent = `💡 ${state.current.fact}`;
  document.getElementById('fact-box').style.display = 'block';
  if (idx === state.current.answer) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    document.getElementById('feedback').textContent = '✅ Correct!';
    document.getElementById('feedback').className = 'feedback good';
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1600);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    document.getElementById('feedback').textContent = '❌ Not quite!';
    document.getElementById('feedback').className = 'feedback bad';
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 2100);
  }
}

function showResult() {
  const pct = state.score / TOTAL;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '📐';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Geometry Genius!' : pct >= 0.7 ? 'Shape Master!' : 'Keep Exploring!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL} correct`;
  showScreen('screen-result');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-start').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.used.clear();
    startRound();
  });
  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });
  document.getElementById('btn-play-again').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.used.clear();
    startRound();
  });
});

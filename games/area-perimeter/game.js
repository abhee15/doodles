'use strict';
const QUESTIONS = [
  {
    q: 'What is the PERIMETER of a 4cm × 3cm rectangle?',
    choices: ['12cm', '14cm', '7cm', '24cm'],
    answer: 1,
    emoji: '📐',
    fact: 'Perimeter = 2 × (length + width) = 2 × (4+3) = 2 × 7 = 14cm. Add all four sides!',
    grid: [4, 3]
  },
  {
    q: 'What is the AREA of a 4cm × 3cm rectangle?',
    choices: ['14cm²', '7cm²', '12cm²', '24cm²'],
    answer: 2,
    emoji: '📐',
    fact: 'Area = length × width = 4 × 3 = 12cm². Count the squares inside!',
    grid: [4, 3]
  },
  {
    q: 'Perimeter is the measurement of...',
    choices: [
      'Space inside a shape',
      'Distance around the outside',
      'Height of a shape',
      'Volume of a shape'
    ],
    answer: 1,
    emoji: '🔲',
    fact: 'Perimeter = the total distance around the OUTSIDE of a shape. Like fencing around a garden!',
    grid: [3, 2]
  },
  {
    q: 'Area is the measurement of...',
    choices: [
      'Distance around the outside',
      'Height of a shape',
      'Space INSIDE a shape',
      'Thickness of a shape'
    ],
    answer: 2,
    emoji: '🟦',
    fact: 'Area = the space INSIDE a 2D shape. Like the tiles needed to cover a floor!',
    grid: [3, 2]
  },
  {
    q: 'A square has sides of 5cm. What is its PERIMETER?',
    choices: ['25cm', '10cm', '20cm', '15cm'],
    answer: 2,
    emoji: '🟥',
    fact: 'Square perimeter = 4 × side = 4 × 5 = 20cm. All four sides of a square are equal!',
    grid: [5, 5]
  },
  {
    q: 'A square has sides of 5cm. What is its AREA?',
    choices: ['20cm²', '10cm²', '15cm²', '25cm²'],
    answer: 3,
    emoji: '🟥',
    fact: 'Square area = side × side = 5 × 5 = 25cm². A 5×5 grid of squares!',
    grid: [5, 5]
  },
  {
    q: 'A room is 8m × 5m. What is its AREA?',
    choices: ['26m²', '13m²', '40m²', '80m²'],
    answer: 2,
    emoji: '🏠',
    fact: 'Area = 8 × 5 = 40m². This tells you how many 1m² tiles you need for the floor!',
    grid: [4, 3]
  },
  {
    q: 'What unit do we use for AREA?',
    choices: [
      'cm (centimetres)',
      'cm² (square centimetres)',
      'cm³ (cubic centimetres)',
      'kg (kilograms)'
    ],
    answer: 1,
    emoji: '📏',
    fact: 'Area is measured in SQUARE units: cm², m², km². The "²" means the measurement is two-dimensional!',
    grid: [3, 2]
  },
  {
    q: 'If the perimeter of a square is 20cm, how long is each side?',
    choices: ['20cm', '10cm', '5cm', '4cm'],
    answer: 2,
    emoji: '🔲',
    fact: 'Perimeter ÷ 4 = side length. 20 ÷ 4 = 5cm per side!',
    grid: [3, 3]
  },
  {
    q: 'A garden is 10m × 4m. What is the PERIMETER?',
    choices: ['40m', '14m', '28m', '20m'],
    answer: 2,
    emoji: '🌳',
    fact: 'Perimeter = 2 × (10+4) = 2 × 14 = 28m. You need 28m of fencing!',
    grid: [4, 3]
  },
  {
    q: 'A triangle has sides of 3cm, 4cm, and 5cm. What is its perimeter?',
    choices: ['60cm', '15cm', '12cm', '20cm'],
    answer: 2,
    emoji: '🔺',
    fact: 'Perimeter of any shape = sum of all sides. 3+4+5 = 12cm!',
    grid: [3, 2]
  },
  {
    q: 'Which has a bigger AREA: a 6×2 or a 4×4 rectangle?',
    choices: ['6×2 (bigger)', '4×4 (bigger)', 'They are equal', 'Cannot compare'],
    answer: 1,
    emoji: '📊',
    fact: '4×4 = 16cm² vs 6×2 = 12cm². The 4×4 square has MORE area even though 6×2 has a bigger perimeter!',
    grid: [4, 4]
  },
  {
    q: 'How many 1cm² tiles do you need to cover a 3cm × 4cm area?',
    choices: ['7 tiles', '14 tiles', '12 tiles', '24 tiles'],
    answer: 2,
    emoji: '🟦',
    fact: 'Area = 3 × 4 = 12cm². You need exactly 12 tiles — one for each square centimetre!',
    grid: [4, 3]
  },
  {
    q: 'Area = length × width. What is the WIDTH if area = 24cm² and length = 6cm?',
    choices: ['18cm', '4cm', '30cm', '144cm'],
    answer: 1,
    emoji: '🔢',
    fact: 'Width = Area ÷ Length = 24 ÷ 6 = 4cm. Rearrange the formula: A = L × W, so W = A ÷ L!',
    grid: [3, 2]
  },
  {
    q: 'A path is 10m long and 2m wide. What is its area?',
    choices: ['12m²', '24m²', '20m²', '5m²'],
    answer: 2,
    emoji: '🛤️',
    fact: 'Area = 10 × 2 = 20m². To pave this path, you need 20 square metres of material!',
    grid: [4, 2]
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
function drawGrid(cols, rows) {
  for (let r = 0; r < 4; r++) {
    const rowEl = document.getElementById(`grid-row-${r}`);
    rowEl.innerHTML = '';
    if (r < rows) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        const isEdge = r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
        cell.className = `grid-cell${isEdge ? ' edge' : ''}`;
        rowEl.appendChild(cell);
      }
    }
  }
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
  const g = state.current.grid;
  drawGrid(Math.min(g[0], 5), Math.min(g[1], 4));
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '📐' : '📏';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Shape Master!' : pct >= 0.7 ? 'Great Geometer!' : 'Keep Measuring!';
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

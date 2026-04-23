'use strict';
const QUESTIONS = [
  {
    q: 'What does the DENOMINATOR (bottom number) of a fraction tell you?',
    choices: [
      'How many parts are shaded',
      'The total number of equal parts',
      'The size of the fraction',
      'Which fraction is bigger'
    ],
    answer: 1,
    emoji: '🍕',
    frac: [4, 4],
    filled: 4,
    label: '4/4 = whole',
    fact: 'DENOMINATOR = total equal parts. 1/4 means the whole is divided into 4 equal parts!'
  },
  {
    q: 'What does the NUMERATOR (top number) tell you?',
    choices: [
      'Total number of parts',
      'Parts that are shaded or selected',
      'The denominator doubled',
      'The whole number'
    ],
    answer: 1,
    emoji: '🍕',
    frac: [4, 1],
    filled: 1,
    label: '1 part shaded',
    fact: 'NUMERATOR = parts you have. In 3/4, you have 3 parts out of 4 total!'
  },
  {
    q: 'What fraction of this bar is shaded? (3 out of 4 parts filled)',
    choices: ['1/4', '4/3', '3/5', '3/4'],
    answer: 3,
    emoji: '📊',
    frac: [4, 3],
    filled: 3,
    label: '? / 4',
    fact: '3 parts filled out of 4 total = 3/4. Three-quarters!'
  },
  {
    q: '1/2 is the same as...',
    choices: ['1/4', '2/4', '2/3', '3/6'],
    answer: 1,
    emoji: '⚖️',
    frac: [4, 2],
    filled: 2,
    label: '1/2 = 2/4',
    fact: 'EQUIVALENT fractions have the same value! 1/2 = 2/4 = 3/6 = 4/8. Multiply both numbers by the same amount!'
  },
  {
    q: 'Which fraction is LARGER: 1/2 or 1/4?',
    choices: ['1/4 is larger', '1/2 is larger', 'They are equal', 'Cannot compare'],
    answer: 1,
    emoji: '🔢',
    frac: [4, 2],
    filled: 2,
    label: '1/2 vs 1/4',
    fact: '1/2 is LARGER! Same numerator → bigger denominator = SMALLER fraction. More cuts = smaller pieces!'
  },
  {
    q: '1/4 + 1/4 = ?',
    choices: ['1/8', '2/8', '2/4', '1/2'],
    answer: 2,
    emoji: '➕',
    frac: [4, 2],
    filled: 2,
    label: '1/4 + 1/4 = 2/4',
    fact: 'Adding fractions with the SAME denominator: add the numerators only! 1/4 + 1/4 = 2/4 (same as 1/2)!'
  },
  {
    q: 'A pizza is cut into 8 equal slices. You eat 3. What fraction did you eat?',
    choices: ['5/8', '3/5', '3/8', '8/3'],
    answer: 2,
    emoji: '🍕',
    frac: [8, 3],
    filled: 3,
    label: '3 out of 8',
    fact: '3 slices out of 8 total = 3/8. The denominator is always the TOTAL number of parts!'
  },
  {
    q: 'Which fraction equals ONE WHOLE?',
    choices: ['1/2', '2/3', '5/5', '4/5'],
    answer: 2,
    emoji: '🟩',
    frac: [5, 5],
    filled: 5,
    label: '5/5 = 1 whole',
    fact: 'When numerator = denominator, the fraction = 1 whole. 3/3 = 1, 7/7 = 1, 100/100 = 1!'
  },
  {
    q: 'What is 1/3 of 12?',
    choices: ['3', '4', '6', '2'],
    answer: 1,
    emoji: '🔢',
    frac: [3, 1],
    filled: 1,
    label: '1/3 of 12',
    fact: '1/3 of 12 = 12 ÷ 3 = 4! To find a fraction of a number, divide by the denominator then multiply by the numerator!'
  },
  {
    q: 'Which is a PROPER fraction (numerator smaller than denominator)?',
    choices: ['7/3', '5/5', '3/7', '9/4'],
    answer: 2,
    emoji: '📐',
    frac: [7, 3],
    filled: 3,
    label: '3/7 proper',
    fact: 'PROPER fraction: numerator < denominator (value less than 1). IMPROPER: numerator ≥ denominator (value ≥ 1)!'
  },
  {
    q: '3/4 + 1/4 = ?',
    choices: ['4/4', '4/8', '3/8', '2/4'],
    answer: 0,
    emoji: '➕',
    frac: [4, 4],
    filled: 4,
    label: '3/4 + 1/4 = 4/4',
    fact: '3/4 + 1/4 = 4/4 = 1 whole! The whole pizza is eaten!'
  },
  {
    q: 'Order from smallest to largest: 1/2, 1/8, 1/4',
    choices: ['1/2, 1/4, 1/8', '1/8, 1/2, 1/4', '1/8, 1/4, 1/2', '1/4, 1/8, 1/2'],
    answer: 2,
    emoji: '📊',
    frac: [8, 1],
    filled: 1,
    label: '1/8 smallest',
    fact: 'Same numerator (1) → larger denominator = SMALLER piece! 1/8 < 1/4 < 1/2. More cuts = tinier slices!'
  },
  {
    q: 'What fraction of a day is 6 hours?',
    choices: ['1/6', '1/4', '1/3', '6/10'],
    answer: 1,
    emoji: '🕐',
    frac: [4, 1],
    filled: 1,
    label: '6/24 = 1/4',
    fact: '6 hours out of 24 total = 6/24 = 1/4. A day has 24 hours, so 6 hours is ONE QUARTER of a day!'
  },
  {
    q: 'What is 3/4 as a decimal?',
    choices: ['0.34', '0.43', '0.75', '3.4'],
    answer: 2,
    emoji: '🔢',
    frac: [4, 3],
    filled: 3,
    label: '3/4 = 0.75',
    fact: '3 ÷ 4 = 0.75. Divide numerator by denominator to convert! 1/4 = 0.25, 1/2 = 0.5, 3/4 = 0.75!'
  },
  {
    q: 'A class of 20 students — 5 are absent. What fraction is PRESENT?',
    choices: ['5/20', '1/4', '3/4', '15/25'],
    answer: 2,
    emoji: '🏫',
    frac: [4, 3],
    filled: 3,
    label: '15/20 = 3/4',
    fact: '15 present out of 20 = 15/20. Simplify by dividing both by 5: 3/4! Three-quarters of the class is present!'
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
function drawFracBar(q) {
  const bar = document.getElementById('frac-bar');
  const total = q.frac[0];
  const filled = q.filled;
  bar.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const seg = document.createElement('div');
    seg.className = `frac-seg ${i < filled ? 'filled' : 'empty'}`;
    bar.appendChild(seg);
  }
  document.getElementById('frac-bar-label').textContent = `Fraction Bar — ${total} equal parts`;
  document.getElementById('frac-label').textContent = q.label || '';
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
  drawFracBar(state.current);
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🍕' : '📐';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Fraction Wizard!' : pct >= 0.7 ? 'Fraction Champ!' : 'Keep Practicing!';
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

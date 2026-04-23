'use strict';

const QUESTIONS = [
  {
    q: 'The colored part shows which fraction?',
    visual: '🟥🟥⬜⬜',
    choices: ['1/4', '1/2', '3/4', '2/3'],
    answer: 1,
    emoji: '📊',
    fact: '2 out of 4 parts shaded = 2/4 = 1/2. Two equal parts!'
  },
  {
    q: 'What fraction of the boxes are colored?',
    visual: '🟦⬜⬜⬜',
    choices: ['1/2', '1/3', '1/4', '3/4'],
    answer: 2,
    emoji: '📊',
    fact: '1 out of 4 = one quarter (1/4). Four quarters make a whole!'
  },
  {
    q: 'What fraction of the boxes are colored?',
    visual: '🟩🟩🟩⬜',
    choices: ['1/4', '1/2', '2/3', '3/4'],
    answer: 3,
    emoji: '📊',
    fact: '3 out of 4 = three quarters (3/4). Nearly the whole thing!'
  },
  {
    q: 'What fraction of the boxes are colored?',
    visual: '🟥🟥⬜',
    choices: ['1/3', '1/2', '2/3', '3/4'],
    answer: 2,
    emoji: '📊',
    fact: '2 out of 3 = two thirds (2/3). Each part is called a "third".'
  },
  {
    q: 'What fraction of the boxes are colored?',
    visual: '🟦⬜⬜',
    choices: ['1/2', '1/3', '2/3', '1/4'],
    answer: 1,
    emoji: '📊',
    fact: '1 out of 3 = one third (1/3). Three thirds make a whole!'
  },
  {
    q: 'What fraction of the boxes are colored?',
    visual: '🟩🟩🟩🟩🟩⬜⬜⬜⬜⬜',
    choices: ['2/5', '1/2', '3/5', '4/5'],
    answer: 1,
    emoji: '📊',
    fact: '5 out of 10 = 5/10 = 1/2. Equal halves!'
  },
  {
    q: 'What fraction of the boxes are colored?',
    visual: '🟥🟥🟥⬜⬜⬜⬜⬜',
    choices: ['1/4', '3/8', '5/8', '1/2'],
    answer: 1,
    emoji: '📊',
    fact: '3 out of 8 = three eighths (3/8). Eight equal parts in total!'
  },
  {
    q: 'Which fraction is BIGGER: 1/2 or 1/4?',
    choices: ['1/4', '1/2', 'They are equal', 'Cannot tell'],
    answer: 1,
    emoji: '⚖️',
    fact: '1/2 is bigger! Half a pizza is more than a quarter pizza.'
  },
  {
    q: 'Which fraction is SMALLER: 2/3 or 3/4?',
    choices: ['3/4', '2/3', 'They are equal', 'Cannot tell'],
    answer: 1,
    emoji: '⚖️',
    fact: '2/3 ≈ 0.667 and 3/4 = 0.75 — so 2/3 is smaller.'
  },
  {
    q: 'What is 1/4 + 1/4?',
    choices: ['1/8', '2/8', '1/2', '1/4'],
    answer: 2,
    emoji: '➕',
    fact: '1/4 + 1/4 = 2/4 = 1/2. Add top numbers when bottoms match!'
  },
  {
    q: 'What is 3/4 − 1/4?',
    choices: ['2/4', '4/8', '1/4', '3/8'],
    answer: 0,
    emoji: '➖',
    fact: '3/4 - 1/4 = 2/4 = 1/2. Subtract top numbers when bottoms match!'
  },
  {
    q: 'What is 1/3 + 1/3?',
    choices: ['2/6', '1/3', '2/3', '1/6'],
    answer: 2,
    emoji: '➕',
    fact: '1/3 + 1/3 = 2/3. Add numerators, keep the denominator!'
  },
  {
    q: 'A pizza is cut into 8 slices. You eat 3. What fraction remains?',
    choices: ['3/8', '5/8', '1/2', '3/5'],
    answer: 1,
    emoji: '🍕',
    fact: '8 - 3 = 5 slices left. 5 out of 8 = 5/8. Over half left!'
  },
  {
    q: 'What fraction of 12 is 6?',
    choices: ['1/4', '1/3', '2/3', '1/2'],
    answer: 3,
    emoji: '🔢',
    fact: '6 out of 12 = 6/12 = 1/2. Half of twelve is six!'
  },
  {
    q: 'Which fraction equals 1/2?',
    choices: ['1/4', '3/4', '2/4', '2/5'],
    answer: 2,
    emoji: '🔢',
    fact: '2/4 = 1/2 because 2÷2=1 and 4÷2=2. Divide top and bottom by the same number!'
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
  const vis = document.getElementById('q-visual');
  if (state.current.visual) {
    vis.textContent = state.current.visual;
    vis.style.display = 'block';
  } else {
    vis.style.display = 'none';
  }
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '🔢';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Fraction Master!' : pct >= 0.7 ? 'Great Work!' : 'Keep Practicing!';
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

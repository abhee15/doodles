'use strict';
const QUESTIONS = [
  {
    q: 'What does PROBABILITY measure?',
    choices: [
      'The size of something',
      'The chance of an event happening',
      'How fast something moves',
      'How heavy something is'
    ],
    answer: 1,
    emoji: '🎲',
    fact: 'Probability measures how LIKELY something is to happen — from impossible (0) to certain (1)!',
    visual: [{ icon: '🎲', label: 'chance?' }],
    barPct: 50
  },
  {
    q: 'If you flip a fair coin, what is the probability of getting HEADS?',
    choices: ['0 (impossible)', '1/4', '1/2', '1 (certain)'],
    answer: 2,
    emoji: '🪙',
    fact: 'A coin has 2 equal outcomes: heads or tails. P(heads) = 1 out of 2 = 1/2 = 50%!',
    visual: [
      { icon: '🪙', label: 'heads' },
      { icon: '🪙', label: 'tails' }
    ],
    barPct: 50
  },
  {
    q: 'Rolling a standard die — what is the probability of rolling a 6?',
    choices: ['1/2', '1/4', '1/6', '1/3'],
    answer: 2,
    emoji: '🎲',
    fact: 'A die has 6 faces (1–6), each equally likely. P(6) = 1 out of 6 = 1/6 ≈ 17%!',
    visual: [
      { icon: '⚀', label: '1' },
      { icon: '⚁', label: '2' },
      { icon: '⚂', label: '3' },
      { icon: '⚃', label: '4' },
      { icon: '⚄', label: '5' },
      { icon: '⚅', label: '6' }
    ],
    barPct: 17
  },
  {
    q: 'A bag has 3 red balls and 1 blue ball. What is the probability of picking RED?',
    choices: ['1/4', '1/3', '3/4', '3/1'],
    answer: 2,
    emoji: '🎱',
    fact: '3 red out of 4 total. P(red) = 3/4 = 75%! More red balls = more likely to pick red!',
    visual: [
      { icon: '🔴', label: 'red' },
      { icon: '🔴', label: 'red' },
      { icon: '🔴', label: 'red' },
      { icon: '🔵', label: 'blue' }
    ],
    barPct: 75
  },
  {
    q: 'Which word means something that CANNOT happen?',
    choices: ['Likely', 'Certain', 'Unlikely', 'Impossible'],
    answer: 3,
    emoji: '🚫',
    fact: '"Impossible" = probability of 0. Example: rolling a 7 on a 6-sided die is impossible!',
    visual: [{ icon: '🚫', label: 'never' }],
    barPct: 0
  },
  {
    q: 'Which word means something that WILL definitely happen?',
    choices: ['Impossible', 'Unlikely', 'Certain', 'Possible'],
    answer: 2,
    emoji: '✅',
    fact: '"Certain" = probability of 1 (or 100%). Example: the sun rising tomorrow is certain!',
    visual: [{ icon: '✅', label: 'always' }],
    barPct: 100
  },
  {
    q: 'A spinner has 4 equal sections: red, blue, green, yellow. What is P(blue)?',
    choices: ['1/2', '1/3', '1/4', '2/4'],
    answer: 2,
    emoji: '🎡',
    fact: '4 equal sections, 1 is blue. P(blue) = 1/4 = 25%. Each color is equally likely!',
    visual: [
      { icon: '🔴', label: '¼' },
      { icon: '🔵', label: '¼' },
      { icon: '🟢', label: '¼' },
      { icon: '🟡', label: '¼' }
    ],
    barPct: 25
  },
  {
    q: 'A bag has 5 green marbles only. P(picking green) = ?',
    choices: ['0', '1/5', '4/5', '1'],
    answer: 3,
    emoji: '🟢',
    fact: "Every marble is green! P(green) = 5/5 = 1 = certain! If all options are the same, it's certain!",
    visual: [
      { icon: '🟢', label: '' },
      { icon: '🟢', label: '' },
      { icon: '🟢', label: '' },
      { icon: '🟢', label: '' },
      { icon: '🟢', label: '' }
    ],
    barPct: 100
  },
  {
    q: 'Rolling a die — is rolling an EVEN number likely, unlikely, or certain?',
    choices: ['Impossible', 'Unlikely', 'Likely (equal chance)', 'Certain'],
    answer: 2,
    emoji: '🎲',
    fact: "Even numbers: 2, 4, 6 — that's 3 out of 6! P(even) = 1/2. Equally likely as odd!",
    visual: [
      { icon: '⚁', label: '2✓' },
      { icon: '⚃', label: '4✓' },
      { icon: '⚅', label: '6✓' }
    ],
    barPct: 50
  },
  {
    q: 'If you flip a coin 10 times and get 6 heads — does that mean the NEXT flip will be tails?',
    choices: [
      'Yes, tails is "due"',
      'No, each flip is still 50/50',
      'Heads is now more likely',
      'You cannot flip again'
    ],
    answer: 1,
    emoji: '🪙',
    fact: "Each flip is INDEPENDENT! Past results don't change future probability. Always 50/50!",
    visual: [
      { icon: '🪙', label: '50%' },
      { icon: '🪙', label: '50%' }
    ],
    barPct: 50
  },
  {
    q: 'A bag has 1 red and 9 blue balls. Picking red is...',
    choices: ['Certain', 'Likely', 'Unlikely', 'Impossible'],
    answer: 2,
    emoji: '🎱',
    fact: 'P(red) = 1/10 = 10%. Very small chance — that makes it UNLIKELY (but not impossible)!',
    visual: [
      { icon: '🔴', label: '1/10' },
      { icon: '🔵', label: '9/10' }
    ],
    barPct: 10
  },
  {
    q: 'What is the probability of rolling a number LESS THAN 7 on a standard die?',
    choices: ['0', '1/6', '5/6', '1'],
    answer: 3,
    emoji: '🎲',
    fact: 'ALL numbers (1,2,3,4,5,6) are less than 7! P = 6/6 = 1 = certain. Every roll qualifies!',
    visual: [
      { icon: '⚀', label: '<7✓' },
      { icon: '⚁', label: '<7✓' },
      { icon: '⚂', label: '<7✓' }
    ],
    barPct: 100
  },
  {
    q: 'Expressing probability as a FRACTION: what does the TOP number (numerator) represent?',
    choices: ['Total outcomes', 'Favorable outcomes', 'Past results', 'The answer'],
    answer: 1,
    emoji: '🔢',
    fact: 'P(event) = favorable outcomes ÷ total outcomes. If 3 balls are red out of 8: P = 3/8!',
    visual: [
      { icon: '3️⃣', label: 'favorable' },
      { icon: '➗', label: '' },
      { icon: '8️⃣', label: 'total' }
    ],
    barPct: 38
  },
  {
    q: 'A spinner lands on red 4 out of 10 spins. What is the EXPERIMENTAL probability of red?',
    choices: ['1/10', '4/10', '6/10', '4/6'],
    answer: 1,
    emoji: '🎡',
    fact: 'Experimental probability = results from ACTUAL trials. 4 reds out of 10 spins = 4/10 = 40%!',
    visual: [
      { icon: '🔴', label: '4 times' },
      { icon: '🔵', label: '6 times' }
    ],
    barPct: 40
  },
  {
    q: 'Two coins are flipped. How many possible outcomes are there?',
    choices: ['2', '3', '4', '6'],
    answer: 2,
    emoji: '🪙',
    fact: 'HH, HT, TH, TT — 4 outcomes! Multiply: 2 outcomes × 2 outcomes = 4 total combinations!',
    visual: [
      { icon: '🪙', label: 'HH' },
      { icon: '🪙', label: 'HT' },
      { icon: '🪙', label: 'TH' },
      { icon: '🪙', label: 'TT' }
    ],
    barPct: 25
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
function updateVisual(q) {
  const vis = document.getElementById('prob-visual');
  vis.innerHTML = '';
  (q.visual || []).forEach(function (item) {
    const div = document.createElement('div');
    div.className = 'prob-item';
    div.innerHTML = `<span class="icon">${item.icon}</span><span>${item.label}</span>`;
    vis.appendChild(div);
  });
  document.getElementById('prob-fill').style.width = `${q.barPct || 50}%`;
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
  updateVisual(state.current);
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎲' : '🪙';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Probability Pro!' : pct >= 0.7 ? 'Chance Champion!' : 'Keep Rolling!';
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

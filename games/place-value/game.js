'use strict';

const QUESTIONS = [
  {
    q: 'In the number 345, what is the value of the digit 3?',
    choices: ['3', '30', '300', '3000'],
    answer: 2,
    emoji: '3️⃣',
    fact: '3 is in the hundreds place, so its value is 3 × 100 = 300.'
  },
  {
    q: 'What is the ones digit in 4,728?',
    choices: ['4', '7', '2', '8'],
    answer: 3,
    emoji: '🔢',
    fact: 'In 4,728: ones=8, tens=2, hundreds=7, thousands=4.'
  },
  {
    q: 'What is the tens digit in 6,543?',
    choices: ['6', '5', '4', '3'],
    answer: 2,
    emoji: '🔢',
    fact: 'In 6,543: ones=3, tens=4, hundreds=5, thousands=6.'
  },
  {
    q: 'What number has 2 hundreds, 5 tens, and 3 ones?',
    choices: ['235', '253', '325', '532'],
    answer: 1,
    emoji: '📊',
    fact: '2 hundreds + 5 tens + 3 ones = 200 + 50 + 3 = 253.'
  },
  {
    q: 'In 1,492, which digit is in the thousands place?',
    choices: ['4', '9', '2', '1'],
    answer: 3,
    emoji: '🔢',
    fact: 'Place values right to left: ones, tens, hundreds, thousands. In 1,492 the 1 is in thousands.'
  },
  {
    q: 'What is 400 + 60 + 7?',
    choices: ['476', '467', '647', '746'],
    answer: 1,
    emoji: '➕',
    fact: '400 + 60 + 7 = 467. This is called expanded form!'
  },
  {
    q: 'Which number is 10 more than 385?',
    choices: ['384', '386', '395', '485'],
    answer: 2,
    emoji: '📈',
    fact: 'Adding 10 increases the tens digit by 1: 385 + 10 = 395.'
  },
  {
    q: 'Round 673 to the nearest hundred.',
    choices: ['600', '700', '670', '680'],
    answer: 1,
    emoji: '🔄',
    fact: '673 → the hundreds digit is 6. The next digit (7) is ≥ 5, so round up to 700.'
  },
  {
    q: 'Round 342 to the nearest ten.',
    choices: ['300', '340', '350', '400'],
    answer: 1,
    emoji: '🔄',
    fact: '342 → tens digit is 4. The ones digit (2) is < 5, so round down to 340.'
  },
  {
    q: 'What is the value of 5 in 5,280?',
    choices: ['5', '50', '500', '5,000'],
    answer: 3,
    emoji: '5️⃣',
    fact: '5 is in the thousands place, so its value is 5 × 1,000 = 5,000.'
  },
  {
    q: 'Which number has a 7 in the hundreds place?',
    choices: ['7,324', '3,724', '3,274', '3,247'],
    answer: 1,
    emoji: '📊',
    fact: 'In 3,724: thousands=3, hundreds=7, tens=2, ones=4. The hundreds digit is 7!'
  },
  {
    q: 'In the number 80,000, how many zeros are there?',
    choices: ['3', '4', '5', '6'],
    answer: 1,
    emoji: '0️⃣',
    fact: '80,000 = 8 followed by 4 zeros. Eighty thousand!'
  },
  {
    q: 'What is 3,000 + 200 + 40 + 5?',
    choices: ['3,245', '3,425', '3,524', '2,345'],
    answer: 0,
    emoji: '➕',
    fact: '3,000 + 200 + 40 + 5 = 3,245. Reading each place value!'
  },
  {
    q: 'Which number is 100 less than 2,500?',
    choices: ['2,400', '1,500', '2,600', '2,490'],
    answer: 0,
    emoji: '📉',
    fact: 'Subtracting 100 decreases the hundreds digit by 1: 2,500 - 100 = 2,400.'
  },
  {
    q: 'What does the 0 mean in 307?',
    choices: [
      'Nothing at all',
      'There are no tens',
      'There are no hundreds',
      'It is a placeholder only'
    ],
    answer: 1,
    emoji: '0️⃣',
    fact: 'In 307, the 0 means there are ZERO tens. It is a placeholder showing that place is empty.'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '🔢';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Number Genius!' : pct >= 0.7 ? 'Great Job!' : 'Keep Counting!';
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

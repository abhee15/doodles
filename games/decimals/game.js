'use strict';
const QUESTIONS = [
  {
    q: 'What does 0.5 mean?',
    choices: ['Five wholes', 'Five tenths', 'Five hundredths', 'Five tens'],
    answer: 1,
    emoji: '🔢',
    fact: '0.5 = 5 tenths = 5/10. The first place after the decimal point is the tenths place!'
  },
  {
    q: 'Which decimal is bigger: 0.7 or 0.3?',
    choices: ['0.3', 'They are equal', '0.7', 'Cannot compare'],
    answer: 2,
    emoji: '⚖️',
    fact: '0.7 > 0.3 — seven tenths is more than three tenths. Line up the decimal points to compare!'
  },
  {
    q: '0.4 + 0.3 = ?',
    choices: ['0.34', '0.43', '0.7', '7'],
    answer: 2,
    emoji: '➕',
    fact: '0.4 + 0.3 = 0.7. Add tenths like whole numbers: 4 tenths + 3 tenths = 7 tenths!'
  },
  {
    q: 'What is 1/2 written as a decimal?',
    choices: ['0.2', '0.12', '0.25', '0.5'],
    answer: 3,
    emoji: '½',
    fact: '1/2 = 0.5. Divide 1 by 2 to get 0.5. Half of something is always 0.5!'
  },
  {
    q: 'What is 1/4 written as a decimal?',
    choices: ['0.14', '0.4', '0.25', '0.75'],
    answer: 2,
    emoji: '¼',
    fact: '1/4 = 0.25. A quarter (like a 25-cent coin) is 0.25!'
  },
  {
    q: 'What is 3/4 written as a decimal?',
    choices: ['0.34', '0.3', '0.43', '0.75'],
    answer: 3,
    emoji: '¾',
    fact: '3/4 = 0.75. Three quarters (75 cents) is 0.75!'
  },
  {
    q: 'Which is bigger: 0.25 or 0.5?',
    choices: ['0.25', 'They are equal', '0.5', 'Cannot tell'],
    answer: 2,
    emoji: '📊',
    fact: '0.5 > 0.25. Look at the tenths place: 5 tenths > 2 tenths, so 0.5 is bigger!'
  },
  {
    q: '0.9 − 0.4 = ?',
    choices: ['0.13', '0.5', '0.94', '5'],
    answer: 1,
    emoji: '➖',
    fact: '0.9 − 0.4 = 0.5. Subtract tenths: 9 tenths − 4 tenths = 5 tenths = 0.5!'
  },
  {
    q: 'The digit right after the decimal point is in the ___ place.',
    choices: ['Ones', 'Tens', 'Tenths', 'Hundredths'],
    answer: 2,
    emoji: '📍',
    fact: 'The first place after the decimal is the TENTHS place. The second place is the hundredths place.'
  },
  {
    q: '0.50 is the same as:',
    choices: ['50', '5', '0.5', '0.05'],
    answer: 2,
    emoji: '🔄',
    fact: "0.50 = 0.5. Trailing zeros after the last non-zero digit don't change the value!"
  },
  {
    q: '2.5 + 1.5 = ?',
    choices: ['3.10', '4', '3.5', '41'],
    answer: 1,
    emoji: '➕',
    fact: '2.5 + 1.5 = 4.0 = 4. Five tenths + five tenths = ten tenths = one whole!'
  },
  {
    q: 'What is the value of 4 in 3.4?',
    choices: ['4 ones', '4 tens', '4 tenths', '4 hundredths'],
    answer: 2,
    emoji: '🔍',
    fact: 'In 3.4, the digit 4 is in the tenths place, so it means 4 tenths (4/10)!'
  },
  {
    q: 'Which decimal is closest to 1?',
    choices: ['0.1', '0.9', '0.5', '0.4'],
    answer: 1,
    emoji: '🎯',
    fact: '0.9 is closest to 1. It is only 0.1 away from 1! (0.9 + 0.1 = 1.0)'
  },
  {
    q: '0.1 + 0.1 + 0.1 = ?',
    choices: ['0.01', '0.111', '0.3', '3'],
    answer: 2,
    emoji: '🔢',
    fact: '0.1 + 0.1 + 0.1 = 0.3. Adding three tenths gives three-tenths!'
  },
  {
    q: 'Which is smallest: 0.6, 0.06, 0.60?',
    choices: ['0.6', '0.06', '0.60', 'They are all equal'],
    answer: 1,
    emoji: '📉',
    fact: "0.06 is the smallest! It's 6 hundredths. 0.6 and 0.60 are equal (both = 6 tenths)."
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🔢' : '📝';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Decimal Master!' : pct >= 0.7 ? 'Great Decimals!' : 'Keep Practicing!';
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

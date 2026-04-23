'use strict';
const QUESTIONS = [
  {
    q: 'If x + 3 = 7, what is x?',
    choices: ['3', '4', '5', '10'],
    answer: 1,
    emoji: '🔢',
    fact: 'x + 3 = 7 → x = 7 - 3 = 4. Subtract 3 from both sides to isolate x!'
  },
  {
    q: 'If y - 5 = 3, what is y?',
    choices: ['2', '8', '15', '3'],
    answer: 1,
    emoji: '🔢',
    fact: 'y - 5 = 3 → y = 3 + 5 = 8. Add 5 to both sides to get y by itself!'
  },
  {
    q: 'If 2 × n = 10, what is n?',
    choices: ['8', '20', '5', '12'],
    answer: 2,
    emoji: '✖️',
    fact: '2n = 10 → n = 10 ÷ 2 = 5. Divide both sides by 2!'
  },
  {
    q: 'What is the value of 3x when x = 4?',
    choices: ['7', '34', '12', '1'],
    answer: 2,
    emoji: '🔢',
    fact: '3x means 3 times x. When x = 4: 3 × 4 = 12. Substitution — replace the variable with the number!'
  },
  {
    q: 'If a = 6, what is a + 9?',
    choices: ['3', '54', '96', '15'],
    answer: 3,
    emoji: '➕',
    fact: 'Replace a with 6: 6 + 9 = 15. This is called evaluating an expression!'
  },
  {
    q: 'Which equation means "a number plus 7 equals 12"?',
    choices: ['n - 7 = 12', 'n + 12 = 7', 'n + 7 = 12', '7n = 12'],
    answer: 2,
    emoji: '📝',
    fact: 'Let n = the unknown number. "Plus 7 equals 12" → n + 7 = 12. Solving: n = 12 - 7 = 5!'
  },
  {
    q: 'If 4 × a = 20, what is a?',
    choices: ['16', '80', '24', '5'],
    answer: 3,
    emoji: '✖️',
    fact: '4a = 20 → a = 20 ÷ 4 = 5. Always do the opposite operation to solve!'
  },
  {
    q: 'What is 2x + 3 when x = 5?',
    choices: ['10', '13', '25', '16'],
    answer: 1,
    emoji: '🔢',
    fact: 'Replace x with 5: 2(5) + 3 = 10 + 3 = 13. Multiply first, then add (order of operations)!'
  },
  {
    q: 'If n ÷ 3 = 4, what is n?',
    choices: ['12', '1', '7', '43'],
    answer: 0,
    emoji: '➗',
    fact: 'n ÷ 3 = 4 → n = 4 × 3 = 12. Multiply both sides by 3!'
  },
  {
    q: 'What does a variable (like x or n) represent?',
    choices: [
      'A number we know',
      'An unknown number we find',
      'Always the number 1',
      'The answer only'
    ],
    answer: 1,
    emoji: '❓',
    fact: 'A variable is a letter that stands for an unknown number. Solving an equation means finding what that number is!'
  },
  {
    q: 'If b = 3, what is 5b?',
    choices: ['53', '8', '15', '2'],
    answer: 2,
    emoji: '🔢',
    fact: '5b means 5 × b. When b = 3: 5 × 3 = 15. The × sign is often left out in algebra!'
  },
  {
    q: 'Which shows the correct way to solve x + 8 = 15?',
    choices: ['x = 15 + 8', 'x = 15 - 8', 'x = 15 × 8', 'x = 8 - 15'],
    answer: 1,
    emoji: '✏️',
    fact: 'To undo +8, subtract 8 from both sides: x = 15 - 8 = 7. Always do the opposite operation!'
  },
  {
    q: 'What is the missing number? ___ + 6 = 14',
    choices: ['8', '20', '6', '96'],
    answer: 0,
    emoji: '❓',
    fact: '? + 6 = 14 → ? = 14 - 6 = 8. This is simple algebra — finding the missing number!'
  },
  {
    q: 'If x = 2 and y = 3, what is x + y?',
    choices: ['23', '32', '6', '5'],
    answer: 3,
    emoji: '🔢',
    fact: 'Replace both variables: x + y = 2 + 3 = 5. You can substitute multiple variables at once!'
  },
  {
    q: 'Which equation shows "5 less than a number equals 9"?',
    choices: ['n + 5 = 9', '5 - n = 9', 'n - 5 = 9', '5n = 9'],
    answer: 2,
    emoji: '📝',
    fact: '"5 less than n" = n - 5 (be careful — "less than" flips the order!). n - 5 = 9 → n = 14.'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🔢' : '✏️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Algebra Star!' : pct >= 0.7 ? 'Math Solver!' : 'Keep Solving!';
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

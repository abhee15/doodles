'use strict';

// ── GENERATORS ────────────────────────────────────────────────────────────────
// Each generator returns {seq: number[], missingIdx: number, answer: number, rule: string}

const GENERATORS = {
  easy: [
    function () {
      // arithmetic +
      const start = randInt(1, 15);
      const d = randInt(2, 8);
      const seq = [start, start + d, start + 2 * d, start + 3 * d, start + 4 * d];
      const mi = randInt(1, 3);
      return { seq, missingIdx: mi, answer: seq[mi], rule: `Add ${d} each time` };
    },
    function () {
      // arithmetic -
      const start = randInt(20, 50);
      const d = randInt(2, 7);
      const seq = [start, start - d, start - 2 * d, start - 3 * d, start - 4 * d];
      const mi = randInt(1, 3);
      return { seq, missingIdx: mi, answer: seq[mi], rule: `Subtract ${d} each time` };
    },
    function () {
      // count by 5s/10s
      const mult = [5, 10][randInt(0, 1)];
      const start = mult * randInt(1, 10);
      const seq = [start, start + mult, start + 2 * mult, start + 3 * mult, start + 4 * mult];
      const mi = randInt(1, 3);
      return { seq, missingIdx: mi, answer: seq[mi], rule: `Count by ${mult}s` };
    }
  ],
  medium: [
    function () {
      // multiply x2 or x3
      const factor = [2, 3][randInt(0, 1)];
      const start = randInt(1, 5);
      const seq = [
        start,
        start * factor,
        start * factor ** 2,
        start * factor ** 3,
        start * factor ** 4
      ];
      if (seq[4] > 500) {
        return GENERATORS.medium[0]();
      }
      const mi = randInt(1, 3);
      return { seq, missingIdx: mi, answer: seq[mi], rule: `Multiply by ${factor} each time` };
    },
    function () {
      // two-step +a+b
      const a = randInt(2, 5);
      const b = randInt(2, 5);
      const start = randInt(1, 10);
      const seq = [start];
      for (let i = 0; i < 4; i++) {
        seq.push(seq[seq.length - 1] + (i % 2 === 0 ? a : b));
      }
      const mi = randInt(1, 3);
      return { seq, missingIdx: mi, answer: seq[mi], rule: `Alternately add ${a} and ${b}` };
    },
    function () {
      // squares
      const offset = randInt(0, 3);
      const seq = [1, 4, 9, 16, 25].map(function (n) {
        return n + offset;
      });
      const mi = randInt(1, 3);
      return {
        seq,
        missingIdx: mi,
        answer: seq[mi],
        rule: `Square numbers${offset ? ` + ${offset}` : ''}`
      };
    }
  ],
  hard: [
    function () {
      // Fibonacci-like
      const a = randInt(1, 5);
      const b = randInt(1, 5);
      const seq = [a, b];
      for (let i = 0; i < 3; i++) {
        seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
      }
      const mi = randInt(2, 4);
      return { seq, missingIdx: mi, answer: seq[mi], rule: 'Add the two previous numbers' };
    },
    function () {
      // multiply then add
      const m = randInt(2, 3);
      const a = randInt(1, 4);
      const start = randInt(1, 5);
      const seq = [start];
      for (let i = 0; i < 4; i++) {
        seq.push(seq[seq.length - 1] * m + a);
      }
      if (seq[4] > 200) {
        return GENERATORS.hard[0]();
      }
      const mi = randInt(1, 3);
      return { seq, missingIdx: mi, answer: seq[mi], rule: `Multiply by ${m} then add ${a}` };
    },
    function () {
      // triangle numbers
      const seq = [1, 3, 6, 10, 15];
      const offset = randInt(0, 4) * 5;
      const offsetSeq = seq.map(function (n) {
        return n + offset;
      });
      const mi = randInt(1, 3);
      return {
        seq: offsetSeq,
        missingIdx: mi,
        answer: offsetSeq[mi],
        rule: 'Triangle numbers pattern'
      };
    }
  ]
};

const LEVELS = [
  { id: 'easy', label: 'Easy', emoji: '🌟', gens: GENERATORS.easy },
  { id: 'medium', label: 'Medium', emoji: '🔥', gens: GENERATORS.medium },
  { id: 'hard', label: 'Hard', emoji: '💎', gens: GENERATORS.hard }
];

const TOTAL_ROUNDS = 8;

const state = {
  levelIdx: 0,
  score: 0,
  round: 0,
  current: null,
  answered: false
};

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function currentLevel() {
  return LEVELS[state.levelIdx];
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ── ROUND ─────────────────────────────────────────────────────────────────────

function genQuestion() {
  const lv = currentLevel();
  const gen = lv.gens[Math.floor(Math.random() * lv.gens.length)];
  return gen();
}

function startRound() {
  state.current = genQuestion();
  state.answered = false;

  document.getElementById('round-label').textContent =
    `Round ${state.round + 1} of ${TOTAL_ROUNDS}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('rule-reveal').textContent = '';
  document.getElementById('answer-input').value = '';
  document.getElementById('answer-input').disabled = false;
  document.getElementById('btn-submit').disabled = false;

  renderSequence();
  document.getElementById('answer-input').focus();
  showScreen('screen-game');
}

function renderSequence() {
  const { seq, missingIdx } = state.current;
  const container = document.getElementById('seq-display');
  container.innerHTML = '';

  seq.forEach(function (num, i) {
    const box = document.createElement('div');
    if (i === missingIdx) {
      box.className = 'seq-box missing';
      box.textContent = '?';
    } else {
      box.className = 'seq-box';
      box.textContent = num;
    }
    container.appendChild(box);

    if (i < seq.length - 1) {
      const arrow = document.createElement('span');
      arrow.className = 'seq-arrow';
      arrow.textContent = '→';
      container.appendChild(arrow);
    }
  });
}

function submitAnswer() {
  if (state.answered) {
    return;
  }
  const raw = document.getElementById('answer-input').value.trim();
  if (!raw) {
    return;
  }
  const guess = parseInt(raw, 10);
  if (isNaN(guess)) {
    showFeedback('Enter a whole number!', '');
    return;
  }

  state.answered = true;
  document.getElementById('btn-submit').disabled = true;
  document.getElementById('answer-input').disabled = true;

  const { seq, missingIdx, answer, rule } = state.current;
  document.getElementById('rule-reveal').textContent = `Pattern: ${rule}`;

  // Reveal the answer in the sequence
  const boxes = document.getElementById('seq-display').querySelectorAll('.seq-box');
  let bi = 0;
  for (let i = 0; i < seq.length; i++) {
    if (i === missingIdx) {
      boxes[bi].textContent = answer;
      boxes[bi].classList.remove('missing');
      boxes[bi].classList.add(guess === answer ? 'correct-box' : 'wrong-box');
    }
    bi++;
    if (i < seq.length - 1) {
      bi++;
    } // skip arrow spans
  }

  if (guess === answer) {
    state.score++;
    state.round++;
    showFeedback('✅ Correct!', 'good');
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(nextOrResult, 1100);
  } else {
    state.round++;
    showFeedback(`❌ Answer was ${answer}`, 'bad');
    setTimeout(nextOrResult, 1500);
  }
}

function nextOrResult() {
  if (state.round >= TOTAL_ROUNDS) {
    showResult();
  } else {
    startRound();
  }
}

function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = `feedback${type ? ` ${type}` : ''}`;
}

function showResult() {
  const pct = state.score / TOTAL_ROUNDS;
  document.getElementById('result-emoji').textContent =
    pct === 1 ? '🏆' : pct >= 0.75 ? '🎉' : '💪';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Perfect Patterns!' : pct >= 0.75 ? 'Great Spotting!' : 'Keep Practicing!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL_ROUNDS} correct`;
  document.getElementById('result-level').textContent = `${currentLevel().label} level`;
  showScreen('screen-result');
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  const picker = document.getElementById('level-picker');
  LEVELS.forEach(function (lv, i) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.innerHTML =
      `<span class="lv-emoji">${lv.emoji}</span>` + `<span class="lv-label">${lv.label}</span>`;
    btn.addEventListener('click', function () {
      state.levelIdx = i;
      state.score = 0;
      state.round = 0;
      startRound();
    });
    picker.appendChild(btn);
  });

  document.getElementById('btn-submit').addEventListener('click', submitAnswer);
  document.getElementById('answer-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });

  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });
  document.getElementById('btn-play-again').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    startRound();
  });
});

'use strict';

// ── FUNCTION TYPES ────────────────────────────────────────────────────────────

const FUNCTIONS = [
  {
    id: 'add',
    make: function () {
      const a = randInt(1, 10);
      return {
        rule: `x + ${a}`,
        label: `Add ${a}`,
        fn: function (x) {
          return x + a;
        }
      };
    }
  },
  {
    id: 'sub',
    make: function () {
      const a = randInt(1, 8);
      return {
        rule: `x − ${a}`,
        label: `Subtract ${a}`,
        fn: function (x) {
          return x - a;
        }
      };
    }
  },
  {
    id: 'mul',
    make: function () {
      const a = randInt(2, 6);
      return {
        rule: `${a} × x`,
        label: `Multiply by ${a}`,
        fn: function (x) {
          return a * x;
        }
      };
    }
  },
  {
    id: 'lin',
    make: function () {
      const m = randInt(2, 4);
      const b = randInt(1, 6);
      return {
        rule: `${m}x + ${b}`,
        label: `Multiply by ${m}, then add ${b}`,
        fn: function (x) {
          return m * x + b;
        }
      };
    }
  },
  {
    id: 'lin2',
    make: function () {
      const m = randInt(2, 4);
      const b = randInt(1, 6);
      return {
        rule: `${m}x − ${b}`,
        label: `Multiply by ${m}, then subtract ${b}`,
        fn: function (x) {
          return m * x - b;
        }
      };
    }
  }
];

const LEVELS = [
  { id: 'easy', label: 'Easy', emoji: '🌟', fnTypes: ['add', 'sub'], xRange: [1, 10] },
  { id: 'medium', label: 'Medium', emoji: '🔥', fnTypes: ['add', 'sub', 'mul'], xRange: [1, 12] },
  { id: 'hard', label: 'Hard', emoji: '💎', fnTypes: ['mul', 'lin', 'lin2'], xRange: [1, 10] }
];

const TOTAL_ROUNDS = 8;
const EXAMPLES_COUNT = 3;

const state = {
  levelIdx: 0,
  score: 0,
  round: 0,
  fn: null,
  x: 0,
  answer: 0,
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

function makeFn() {
  const lv = currentLevel();
  const typeId = lv.fnTypes[Math.floor(Math.random() * lv.fnTypes.length)];
  const type = FUNCTIONS.find(function (f) {
    return f.id === typeId;
  });
  return type.make();
}

function startRound() {
  const lv = currentLevel();
  state.fn = makeFn();
  state.x = randInt(lv.xRange[0], lv.xRange[1]);
  state.answer = state.fn.fn(state.x);
  if (state.answer < 0) {
    return startRound();
  }
  state.answered = false;

  document.getElementById('round-label').textContent =
    `Round ${state.round + 1} of ${TOTAL_ROUNDS}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('fn-rule').textContent = `f(x) = ${state.fn.rule}`;
  document.getElementById('fn-input').textContent = state.x;
  document.getElementById('answer-input').value = '';
  document.getElementById('answer-input').disabled = false;
  document.getElementById('btn-submit').disabled = false;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';

  buildExamples();
  document.getElementById('answer-input').focus();
  showScreen('screen-game');
}

function buildExamples() {
  const lv = currentLevel();
  const container = document.getElementById('examples');
  container.innerHTML = '';
  const usedX = new Set([state.x]);

  for (let i = 0; i < EXAMPLES_COUNT; i++) {
    let ex;
    let tries = 0;
    do {
      ex = randInt(lv.xRange[0], lv.xRange[1]);
      tries++;
    } while (usedX.has(ex) && tries < 20);
    usedX.add(ex);

    const ey = state.fn.fn(ex);
    if (ey < 0) {
      container.innerHTML = '';
      buildExamples();
      return;
    }

    const chip = document.createElement('div');
    chip.className = 'example-chip';
    chip.innerHTML = `<span class="ex-in">${ex}</span><span class="ex-arrow">→</span><span class="ex-out">${ey}</span>`;
    container.appendChild(chip);
  }
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

  if (guess === state.answer) {
    state.score++;
    state.round++;
    showFeedback(`✅ Correct! f(${state.x}) = ${state.answer}`, 'good');
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(nextOrResult, 1000);
  } else {
    state.round++;
    showFeedback(`❌ f(${state.x}) = ${state.answer}  (${state.fn.label})`, 'bad');
    setTimeout(nextOrResult, 1600);
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
    pct === 1 ? 'Function Master!' : pct >= 0.75 ? 'Great Work!' : 'Keep Practicing!';
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

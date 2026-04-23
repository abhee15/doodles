'use strict';

// ── LEVELS ────────────────────────────────────────────────────────────────────

const LEVELS = [
  {
    id: 'easy',
    label: 'Easy',
    emoji: '🌟',
    desc: 'x + a = b  or  x − a = b',
    gen: function () {
      const ops = ['+', '-'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      const x = randInt(1, 12);
      const a = randInt(1, 10);
      const b = op === '+' ? x + a : x - a;
      if (b <= 0) {
        return this.gen();
      }
      return {
        question: `x ${op} ${a} = ${b}`,
        answer: x,
        hint:
          op === '+' ? `What number plus ${a} equals ${b}?` : `What number minus ${a} equals ${b}?`
      };
    }
  },
  {
    id: 'medium',
    label: 'Medium',
    emoji: '🔥',
    desc: '2x = b  or  x/a = b  or  ax + b = c',
    gen: function () {
      const type = randInt(0, 2);
      let question, answer, hint;
      if (type === 0) {
        const a = randInt(2, 6);
        const x = randInt(1, 10);
        const b = a * x;
        question = `${a}x = ${b}`;
        answer = x;
        hint = `${b} divided by ${a} equals ?`;
      } else if (type === 1) {
        const a = randInt(2, 5);
        const x = randInt(2, 8);
        const b = a * x;
        question = `x ÷ ${a} = ${x}`;
        answer = b;
        hint = `${x} groups of ${a} equals ?`;
      } else {
        const a = randInt(2, 4);
        const x = randInt(1, 8);
        const b = randInt(1, 6);
        const c = a * x + b;
        question = `${a}x + ${b} = ${c}`;
        answer = x;
        hint = `First subtract ${b} from both sides, then divide by ${a}`;
      }
      return { question, answer, hint };
    }
  },
  {
    id: 'hard',
    label: 'Hard',
    emoji: '💎',
    desc: 'ax + b = cx + d  or  ax − b = c',
    gen: function () {
      const type = randInt(0, 1);
      let question, answer, hint;
      if (type === 0) {
        const a = randInt(2, 5);
        const x = randInt(1, 8);
        const b = randInt(1, 10);
        const c = a * x - b;
        if (c <= 0) {
          return this.gen();
        }
        question = `${a}x − ${b} = ${c}`;
        answer = x;
        hint = `Add ${b} to both sides first, then divide by ${a}`;
      } else {
        const a = randInt(3, 6);
        const c = randInt(1, a - 1);
        const x = randInt(1, 8);
        const b = randInt(1, 6);
        const d = (a - c) * x + b;
        if (d <= 0 || a === c) {
          return this.gen();
        }
        question = `${a}x + ${b} = ${c}x + ${d}`;
        answer = x;
        hint = `Move x terms to one side: ${a - c}x = ${d - b}, then divide`;
      }
      return { question, answer, hint };
    }
  }
];

const TOTAL_ROUNDS = 8;

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  levelIdx: 0,
  score: 0,
  round: 0,
  current: null,
  showHint: false,
  answered: false
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

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

function startRound() {
  state.current = currentLevel().gen();
  state.showHint = false;
  state.answered = false;

  document.getElementById('round-label').textContent =
    `Round ${state.round + 1} of ${TOTAL_ROUNDS}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('equation-display').textContent = state.current.question;
  document.getElementById('answer-input').value = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('hint-text').textContent = '';
  document.getElementById('hint-text').style.display = 'none';
  document.getElementById('btn-hint').textContent = '💡 Hint';
  document.getElementById('btn-hint').disabled = false;
  document.getElementById('btn-submit').disabled = false;
  document.getElementById('answer-input').disabled = false;
  updateBalance('idle');
  document.getElementById('answer-input').focus();

  showScreen('screen-game');
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
    showFeedback('Enter a whole number!', 'bad');
    return;
  }

  state.answered = true;
  document.getElementById('btn-submit').disabled = true;
  document.getElementById('answer-input').disabled = true;
  document.getElementById('btn-hint').disabled = true;

  if (guess === state.current.answer) {
    state.score++;
    state.round++;
    updateBalance('correct');
    showFeedback(`✅ Correct! x = ${state.current.answer}`, 'good');
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      if (state.round >= TOTAL_ROUNDS) {
        showResult();
      } else {
        startRound();
      }
    }, 1100);
  } else {
    state.round++;
    updateBalance('wrong');
    showFeedback(`❌ Not quite — x = ${state.current.answer}`, 'bad');
    setTimeout(function () {
      if (state.round >= TOTAL_ROUNDS) {
        showResult();
      } else {
        startRound();
      }
    }, 1400);
  }
}

function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = `feedback${type ? ` ${type}` : ''}`;
}

// ── RESULT ────────────────────────────────────────────────────────────────────

function showResult() {
  const pct = state.score / TOTAL_ROUNDS;
  document.getElementById('result-emoji').textContent =
    pct === 1 ? '🏆' : pct >= 0.75 ? '🎉' : '💪';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Perfect Score!' : pct >= 0.75 ? 'Great Work!' : 'Keep Practicing!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL_ROUNDS} correct`;
  document.getElementById('result-level').textContent = `${currentLevel().label} level`;
  showScreen('screen-result');
}

// ── BALANCE SCALE ─────────────────────────────────────────────────────────────

function getEquationSides(q) {
  const parts = q.split('=');
  return { left: (parts[0] || '?').trim(), right: (parts[1] || '?').trim() };
}

function updateBalance(mode) {
  const sides = getEquationSides(state.current.question);
  document.getElementById('bal-left-expr').textContent = sides.left;
  document.getElementById('bal-right-expr').textContent = sides.right;
  const cls = 'balance-side';
  document.getElementById('bal-left').className =
    cls + (mode === 'correct' ? ' balanced' : mode === 'wrong' ? ' unbalanced' : '');
  document.getElementById('bal-right').className =
    cls + (mode === 'correct' ? ' balanced' : mode === 'wrong' ? ' unbalanced' : '');
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  const picker = document.getElementById('level-picker');
  LEVELS.forEach(function (lv, i) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.innerHTML =
      `<span class="lv-emoji">${lv.emoji}</span>` +
      `<span class="lv-label">${lv.label}</span>` +
      `<span class="lv-desc">${lv.desc}</span>`;
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

  document.getElementById('btn-hint').addEventListener('click', function () {
    const ht = document.getElementById('hint-text');
    ht.textContent = `💡 ${state.current.hint}`;
    ht.style.display = 'block';
    this.disabled = true;
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

'use strict';

// ── DATA ──────────────────────────────────────────────────────────────────────

const ITEMS = [
  { emoji: '🍎', name: 'Apple' },
  { emoji: '🍕', name: 'Pizza Slice' },
  { emoji: '🎈', name: 'Balloon' },
  { emoji: '🍦', name: 'Ice Cream' },
  { emoji: '📚', name: 'Book' },
  { emoji: '🍪', name: 'Cookie' },
  { emoji: '🧸', name: 'Stuffed Bear' },
  { emoji: '✏️', name: 'Pencil Set' },
  { emoji: '🎯', name: 'Dart Game' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🍉', name: 'Watermelon' },
  { emoji: '🎮', name: 'Game Card' }
];

const LEVELS = [
  {
    id: 'easy',
    label: 'Easy',
    emoji: '🌟',
    payment: 100,
    paymentLabel: '$1.00',
    priceStep: 5,
    priceMin: 5,
    priceMax: 95,
    coins: ['quarter', 'dime', 'nickel', 'penny']
  },
  {
    id: 'medium',
    label: 'Medium',
    emoji: '🔥',
    payment: 200,
    paymentLabel: '$2.00',
    priceStep: 25,
    priceMin: 25,
    priceMax: 175,
    coins: ['one', 'quarter', 'dime', 'nickel', 'penny']
  },
  {
    id: 'hard',
    label: 'Hard',
    emoji: '💎',
    payment: 500,
    paymentLabel: '$5.00',
    priceStep: 25,
    priceMin: 50,
    priceMax: 475,
    coins: ['one', 'quarter', 'dime', 'nickel', 'penny']
  }
];

const COIN_META = {
  penny: { value: 1, label: '1¢', icon: '🪙', color: '#b87333' },
  nickel: { value: 5, label: '5¢', icon: '🪙', color: '#a8a9ad' },
  dime: { value: 10, label: '10¢', icon: '🪙', color: '#c0c0c0' },
  quarter: { value: 25, label: '25¢', icon: '🪙', color: '#d4af37' },
  one: { value: 100, label: '$1', icon: '💵', color: '#4ade80' }
};

const TOTAL_ROUNDS = 8;

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  levelIdx: 0,
  price: 0,
  target: 0,
  itemIdx: 0,
  counts: {},
  score: 0,
  round: 0,
  done: false,
  usedItems: new Set()
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function formatCents(c) {
  if (c < 100) {
    return `${c}¢`;
  }
  const d = Math.floor(c / 100);
  const rem = c % 100;
  return `$${d}.${rem < 10 ? '0' : ''}${rem}`;
}

function randInt(min, max, step) {
  const range = Math.floor((max - min) / step) + 1;
  return min + Math.floor(Math.random() * range) * step;
}

function randItem() {
  let available = ITEMS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.usedItems.has(i);
  });
  if (available.length === 0) {
    state.usedItems.clear();
    available = ITEMS.map(function (_, i) {
      return i;
    });
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  state.usedItems.add(idx);
  return idx;
}

function currentLevel() {
  return LEVELS[state.levelIdx];
}

function selectedTotal() {
  const lv = currentLevel();
  return lv.coins.reduce(function (sum, id) {
    return sum + (state.counts[id] || 0) * COIN_META[id].value;
  }, 0);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ── ROUND ─────────────────────────────────────────────────────────────────────

function startRound() {
  const lv = currentLevel();
  state.price = randInt(lv.priceMin, lv.priceMax, lv.priceStep);
  state.target = lv.payment - state.price;
  state.itemIdx = randItem();
  state.counts = {};
  lv.coins.forEach(function (id) {
    state.counts[id] = 0;
  });
  state.done = false;

  renderRound();
  showScreen('screen-game');
}

function renderRound() {
  const lv = currentLevel();
  const item = ITEMS[state.itemIdx];

  document.getElementById('round-label').textContent =
    `Round ${state.round + 1} of ${TOTAL_ROUNDS}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('item-emoji').textContent = item.emoji;
  document.getElementById('item-name').textContent = item.name;
  document.getElementById('item-price').textContent = formatCents(state.price);
  document.getElementById('pays-with').textContent = lv.paymentLabel;
  document.getElementById('target-change').textContent = formatCents(state.target);

  renderCoinRows(lv);
  updateRunningTotal();
}

function renderCoinRows(lv) {
  const grid = document.getElementById('coin-grid');
  grid.innerHTML = '';

  lv.coins.forEach(function (id) {
    const meta = COIN_META[id];
    const row = document.createElement('div');
    row.className = 'coin-row';
    row.id = `row-${id}`;

    const info = document.createElement('div');
    info.className = 'coin-info';
    info.innerHTML = `<span class="coin-icon">${meta.icon}</span><span class="coin-label">${meta.label}</span>`;

    const minus = document.createElement('button');
    minus.className = 'coin-btn minus-btn';
    minus.textContent = '−';
    minus.setAttribute('aria-label', `Remove ${meta.label}`);
    minus.addEventListener('click', function () {
      adjustCoin(id, -1);
    });

    const countEl = document.createElement('span');
    countEl.className = 'coin-count';
    countEl.id = `count-${id}`;
    countEl.textContent = '0';

    const plus = document.createElement('button');
    plus.className = 'coin-btn plus-btn';
    plus.textContent = '+';
    plus.setAttribute('aria-label', `Add ${meta.label}`);
    plus.addEventListener('click', function () {
      adjustCoin(id, +1);
    });

    row.appendChild(info);
    row.appendChild(minus);
    row.appendChild(countEl);
    row.appendChild(plus);
    grid.appendChild(row);
  });
}

function adjustCoin(id, delta) {
  if (state.done) {
    return;
  }
  const next = (state.counts[id] || 0) + delta;
  if (next < 0) {
    return;
  }
  const tentativeTotal =
    selectedTotal() - (state.counts[id] || 0) * COIN_META[id].value + next * COIN_META[id].value;
  if (tentativeTotal > state.target) {
    showFeedback('Too much! Try removing a coin.', 'bad');
    return;
  }
  state.counts[id] = next;
  document.getElementById(`count-${id}`).textContent = next;
  updateRunningTotal();
}

function updateRunningTotal() {
  const total = selectedTotal();
  const el = document.getElementById('running-total');
  el.textContent = formatCents(total);

  if (total === state.target) {
    state.done = true;
    state.score++;
    state.round++;
    showFeedback(state.score % 3 === 0 ? '🏆 Perfect!' : '✅ Correct!', 'good');
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      if (state.round >= TOTAL_ROUNDS) {
        showResult();
      } else {
        clearFeedback();
        startRound();
      }
    }, 900);
  } else if (total > 0) {
    const remaining = state.target - total;
    showFeedback(`Need ${formatCents(remaining)} more`, '');
  } else {
    clearFeedback();
  }
}

function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = `feedback${type ? ` ${type}` : ''}`;
}

function clearFeedback() {
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
}

// ── RESULT ────────────────────────────────────────────────────────────────────

function showResult() {
  const perfect = state.score === TOTAL_ROUNDS;
  document.getElementById('result-emoji').textContent = perfect
    ? '🏆'
    : state.score >= 6
      ? '🎉'
      : '💪';
  document.getElementById('result-title').textContent = perfect
    ? 'Perfect Change!'
    : state.score >= 6
      ? 'Great Job!'
      : 'Keep Practicing!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL_ROUNDS} correct`;
  document.getElementById('result-level').textContent = `${currentLevel().label} level`;
  showScreen('screen-result');
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  // Build level picker
  const picker = document.getElementById('level-picker');
  LEVELS.forEach(function (lv, i) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.innerHTML = `<span class="lv-emoji">${lv.emoji}</span><span class="lv-label">${lv.label}</span><span class="lv-hint">${lv.paymentLabel} bill</span>`;
    btn.addEventListener('click', function () {
      state.levelIdx = i;
      state.score = 0;
      state.round = 0;
      state.usedItems.clear();
      startRound();
    });
    picker.appendChild(btn);
  });

  document.getElementById('btn-clear').addEventListener('click', function () {
    if (state.done) {
      return;
    }
    currentLevel().coins.forEach(function (id) {
      state.counts[id] = 0;
    });
    document.querySelectorAll('.coin-count').forEach(function (el) {
      el.textContent = '0';
    });
    updateRunningTotal();
    clearFeedback();
  });

  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });

  document.getElementById('btn-play-again').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.usedItems.clear();
    startRound();
  });
});

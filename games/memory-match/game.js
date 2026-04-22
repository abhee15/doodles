'use strict';

// ── ANIMAL PAIRS ─────────────────────────────────────────────────────────────

const ALL_ANIMALS = [
  { emoji: '🦁', name: 'LION' },
  { emoji: '🐬', name: 'DOLPHIN' },
  { emoji: '🦊', name: 'FOX' },
  { emoji: '🐘', name: 'ELEPHANT' },
  { emoji: '🦋', name: 'BUTTERFLY' },
  { emoji: '🐧', name: 'PENGUIN' },
  { emoji: '🦒', name: 'GIRAFFE' },
  { emoji: '🐙', name: 'OCTOPUS' },
  { emoji: '🦅', name: 'EAGLE' },
  { emoji: '🐊', name: 'CROCODILE' },
  { emoji: '🦓', name: 'ZEBRA' },
  { emoji: '🐨', name: 'KOALA' }
];

const DIFF_CONFIG = {
  easy: { pairs: 6, cols: 4 },
  medium: { pairs: 8, cols: 4 },
  hard: { pairs: 10, cols: 5 }
};

// ── STATE ────────────────────────────────────────────────────────────────────

const state = {
  difficulty: 'easy',
  cards: [],
  flipped: [],
  matched: 0,
  totalPairs: 0,
  moves: 0,
  startTime: 0,
  timerInterval: null,
  locked: false
};

// ── SHUFFLE ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── TIME FORMATTING ───────────────────────────────────────────────────────────

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

// ── SCREENS ───────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ── TIMER ────────────────────────────────────────────────────────────────────

function startTimer() {
  state.startTime = Date.now();
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(function () {
    document.getElementById('stat-time').textContent = formatTime(Date.now() - state.startTime);
  }, 500);
}

function stopTimer() {
  clearInterval(state.timerInterval);
}

// ── BUILD GAME ────────────────────────────────────────────────────────────────

function buildGame(difficulty) {
  state.difficulty = difficulty;
  const cfg = DIFF_CONFIG[difficulty];
  state.totalPairs = cfg.pairs;
  state.matched = 0;
  state.moves = 0;
  state.flipped = [];
  state.locked = false;

  // Pick random animals and create pairs
  const animals = shuffle(ALL_ANIMALS.slice()).slice(0, cfg.pairs);
  const cards = [];
  animals.forEach(function (animal, i) {
    cards.push({
      id: i * 2,
      pairId: i,
      type: 'emoji',
      content: animal.emoji,
      flipped: false,
      matched: false
    });
    cards.push({
      id: i * 2 + 1,
      pairId: i,
      type: 'word',
      content: animal.name,
      flipped: false,
      matched: false
    });
  });
  state.cards = shuffle(cards);

  // Update UI
  document.getElementById('stat-moves').textContent = '0';
  document.getElementById('stat-pairs').textContent = `0/${cfg.pairs}`;
  document.getElementById('stat-time').textContent = '0:00';
  document.getElementById('nav-meta').textContent =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  renderGrid(cfg);
  showScreen('screen-game');
  startTimer();
}

// ── RENDER GRID ───────────────────────────────────────────────────────────────

function renderGrid(cfg) {
  const grid = document.getElementById('card-grid');
  grid.className = `card-grid ${state.difficulty}`;
  grid.innerHTML = '';

  state.cards.forEach(function (card) {
    const el = document.createElement('div');
    el.className = 'mem-card';
    el.dataset.id = card.id;

    const back = document.createElement('div');
    back.className = 'card-face card-back';
    back.textContent = '?';

    const front = document.createElement('div');
    front.className = `card-face card-front is-${card.type}`;
    front.textContent = card.content;

    el.appendChild(back);
    el.appendChild(front);
    el.addEventListener('click', function () {
      onCardClick(card.id);
    });
    grid.appendChild(el);
  });
}

// ── CARD CLICK ────────────────────────────────────────────────────────────────

function onCardClick(cardId) {
  if (state.locked) {
    return;
  }

  const card = state.cards.find(function (c) {
    return c.id === cardId;
  });
  if (!card || card.flipped || card.matched) {
    return;
  }

  // Flip the card
  card.flipped = true;
  const el = document.querySelector(`[data-id="${cardId}"]`);
  el.classList.add('flipped');

  state.flipped.push(card);

  if (state.flipped.length === 2) {
    state.moves++;
    document.getElementById('stat-moves').textContent = state.moves;
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = state.flipped;
  state.locked = true;

  if (a.pairId === b.pairId && a.type !== b.type) {
    // Match!
    a.matched = true;
    b.matched = true;
    state.matched++;

    const elA = document.querySelector(`[data-id="${a.id}"]`);
    const elB = document.querySelector(`[data-id="${b.id}"]`);

    setTimeout(function () {
      elA.classList.add('matched');
      elB.classList.add('matched');
      state.flipped = [];
      state.locked = false;
      document.getElementById('stat-pairs').textContent = `${state.matched}/${state.totalPairs}`;

      if (state.matched === state.totalPairs) {
        setTimeout(showResult, 400);
      }
    }, 400);
  } else {
    // No match — flip back
    setTimeout(function () {
      a.flipped = false;
      b.flipped = false;
      const elA = document.querySelector(`[data-id="${a.id}"]`);
      const elB = document.querySelector(`[data-id="${b.id}"]`);
      elA.classList.remove('flipped');
      elB.classList.remove('flipped');
      state.flipped = [];
      state.locked = false;
    }, 900);
  }
}

// ── RESULTS ───────────────────────────────────────────────────────────────────

function showResult() {
  stopTimer();
  const elapsed = Date.now() - state.startTime;
  const timeStr = formatTime(elapsed);

  // Star rating: based on moves per pair
  const movesPerPair = state.moves / state.totalPairs;
  let stars, trophy, title;
  if (movesPerPair <= 1.5) {
    stars = '⭐⭐⭐';
    trophy = '🏆';
    title = 'Perfect Memory!';
  } else if (movesPerPair <= 2.5) {
    stars = '⭐⭐';
    trophy = '🥈';
    title = 'Great Job!';
  } else {
    stars = '⭐';
    trophy = '🥉';
    title = 'You Did It!';
  }

  document.getElementById('result-trophy').textContent = trophy;
  document.getElementById('result-title').textContent = title;
  document.getElementById('res-time').textContent = timeStr;
  document.getElementById('res-moves').textContent = state.moves;
  document.getElementById('res-stars').textContent = stars;

  showScreen('screen-result');
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  // Difficulty buttons
  document.querySelectorAll('.diff-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      buildGame(btn.dataset.diff);
    });
  });

  // Play again
  document.getElementById('btn-play-again').addEventListener('click', function () {
    buildGame(state.difficulty);
  });

  // Try harder
  document.getElementById('btn-harder').addEventListener('click', function () {
    const order = ['easy', 'medium', 'hard'];
    const next = order[Math.min(order.indexOf(state.difficulty) + 1, order.length - 1)];
    if (next === state.difficulty) {
      showScreen('screen-start');
    } else {
      buildGame(next);
    }
  });
});

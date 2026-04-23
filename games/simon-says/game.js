'use strict';

// ── CONFIG ────────────────────────────────────────────────────────────────────

const COLORS = [
  { id: 'red', label: 'Red', bg: '#ef4444', lit: '#fca5a5', text: '#fff' },
  { id: 'blue', label: 'Blue', bg: '#3b82f6', lit: '#93c5fd', text: '#fff' },
  { id: 'green', label: 'Green', bg: '#22c55e', lit: '#86efac', text: '#fff' },
  { id: 'yellow', label: 'Yellow', bg: '#eab308', lit: '#fde68a', text: '#111' }
];

const FLASH_ON = 500;
const FLASH_OFF = 200;

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  sequence: [],
  playerPos: 0,
  phase: 'idle', // 'idle' | 'showing' | 'input' | 'result'
  score: 0,
  best: 0
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function getBtn(id) {
  return document.getElementById(`btn-${id}`);
}

function flashBtn(id, duration) {
  return new Promise(function (resolve) {
    const btn = getBtn(id);
    const color = COLORS.find(function (c) {
      return c.id === id;
    });
    btn.style.background = color.lit;
    btn.style.borderColor = '#fff';
    setTimeout(function () {
      btn.style.background = color.bg;
      btn.style.borderColor = 'rgba(255,255,255,0.25)';
      resolve();
    }, duration);
  });
}

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

// ── GAME FLOW ─────────────────────────────────────────────────────────────────

async function showSequence() {
  state.phase = 'showing';
  setStatus('Watch carefully…');
  setInputEnabled(false);

  for (let i = 0; i < state.sequence.length; i++) {
    await delay(FLASH_OFF);
    await flashBtn(state.sequence[i], FLASH_ON);
  }

  await delay(300);
  state.playerPos = 0;
  state.phase = 'input';
  setStatus(
    `Your turn! Repeat ${state.sequence.length} tap${state.sequence.length > 1 ? 's' : ''}`
  );
  setInputEnabled(true);
}

function addStep() {
  const idx = Math.floor(Math.random() * COLORS.length);
  state.sequence.push(COLORS[idx].id);
}

function startGame() {
  state.sequence = [];
  state.playerPos = 0;
  state.score = 0;
  addStep();
  updateScore();
  showSequence();
}

async function handlePress(id) {
  if (state.phase !== 'input') {
    return;
  }

  await flashBtn(id, 200);

  if (id === state.sequence[state.playerPos]) {
    state.playerPos++;
    if (state.playerPos === state.sequence.length) {
      state.score++;
      if (state.score > state.best) {
        state.best = state.score;
      }
      updateScore();
      setInputEnabled(false);
      setStatus('✅ Correct! Get ready…');
      addStep();
      await delay(800);
      showSequence();
    }
  } else {
    state.phase = 'result';
    setInputEnabled(false);
    setStatus(`❌ Wrong! You got ${state.score} round${state.score !== 1 ? 's' : ''}`);
    showGameOver();
  }
}

function showGameOver() {
  document.getElementById('go-score').textContent = state.score;
  document.getElementById('go-best').textContent = `Best: ${state.best}`;
  document.getElementById('gameover-panel').style.display = 'flex';
}

function setStatus(msg) {
  document.getElementById('status').textContent = msg;
}

function updateScore() {
  document.getElementById('score-label').textContent = `Round: ${state.score + 1}`;
  document.getElementById('best-label').textContent = `Best: ${state.best}`;
}

function setInputEnabled(enabled) {
  COLORS.forEach(function (c) {
    getBtn(c.id).disabled = !enabled;
  });
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('color-grid');
  COLORS.forEach(function (c) {
    const btn = document.createElement('button');
    btn.id = `btn-${c.id}`;
    btn.className = 'color-btn';
    btn.style.background = c.bg;
    btn.style.color = c.text;
    btn.textContent = c.label;
    btn.disabled = true;
    btn.addEventListener('click', function () {
      handlePress(c.id);
    });
    grid.appendChild(btn);
  });

  document.getElementById('btn-start').addEventListener('click', function () {
    document.getElementById('gameover-panel').style.display = 'none';
    document.getElementById('start-panel').style.display = 'none';
    document.getElementById('game-panel').style.display = 'flex';
    startGame();
  });

  document.getElementById('btn-restart').addEventListener('click', function () {
    document.getElementById('gameover-panel').style.display = 'none';
    startGame();
  });
});

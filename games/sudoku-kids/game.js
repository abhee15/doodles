'use strict';

function generateSolution() {
  const grid = Array(16).fill(0);

  function isValid(pos, num) {
    const row = Math.floor(pos / 4);
    const col = pos % 4;
    const boxRow = Math.floor(row / 2) * 2;
    const boxCol = Math.floor(col / 2) * 2;

    for (let c = 0; c < 4; c++) {
      if (grid[row * 4 + c] === num) {
        return false;
      }
    }
    for (let r = 0; r < 4; r++) {
      if (grid[r * 4 + col] === num) {
        return false;
      }
    }
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        if (grid[(boxRow + r) * 4 + boxCol + c] === num) {
          return false;
        }
      }
    }
    return true;
  }

  function solve(pos) {
    if (pos === 16) {
      return true;
    }
    const nums = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    for (const n of nums) {
      if (isValid(pos, n)) {
        grid[pos] = n;
        if (solve(pos + 1)) {
          return true;
        }
        grid[pos] = 0;
      }
    }
    return false;
  }

  solve(0);
  return grid;
}

function generatePuzzle(clueCount) {
  const solution = generateSolution();
  const puzzle = solution.slice();
  const positions = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5);
  const toRemove = 16 - clueCount;
  for (let i = 0; i < toRemove; i++) {
    puzzle[positions[i]] = 0;
  }
  return { q: puzzle, s: solution };
}

const CLUE_COUNTS = { easy: 11, medium: 8, hard: 5, random: 0 };

// ── STATE ────────────────────────────────────────────────────────────────────

const state = {
  difficulty: 'easy',
  puzzle: [],
  solution: [],
  grid: [],
  selected: -1,
  errors: 0,
  hints: 3,
  startTime: 0,
  timerInterval: null,
  solved: false
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ── CONFLICT CHECK ────────────────────────────────────────────────────────────

function hasConflict(pos, num) {
  if (num === 0) {
    return false;
  }
  const row = Math.floor(pos / 4);
  const col = pos % 4;
  const boxRow = Math.floor(row / 2) * 2;
  const boxCol = Math.floor(col / 2) * 2;

  for (let c = 0; c < 4; c++) {
    if (c !== col && state.grid[row * 4 + c] === num) {
      return true;
    }
  }
  for (let r = 0; r < 4; r++) {
    if (r !== row && state.grid[r * 4 + col] === num) {
      return true;
    }
  }
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const p = (boxRow + r) * 4 + boxCol + c;
      if (p !== pos && state.grid[p] === num) {
        return true;
      }
    }
  }
  return false;
}

// ── RENDER ────────────────────────────────────────────────────────────────────

function renderGrid() {
  const gridEl = document.getElementById('sudoku-grid');
  gridEl.innerHTML = '';

  state.grid.forEach(function (val, i) {
    const cell = document.createElement('div');
    cell.className = 'sudoku-cell';
    cell.dataset.pos = i;

    const isClue = state.puzzle[i] !== 0;
    if (isClue) {
      cell.classList.add('clue');
      cell.textContent = val;
    } else if (val !== 0) {
      cell.textContent = val;
      const conflict = hasConflict(i, val);
      const correct = val === state.solution[i] && !conflict;
      if (conflict) {
        cell.classList.add('conflict');
      } else if (correct) {
        cell.classList.add('correct');
      }
    }

    if (i === state.selected && !isClue) {
      cell.classList.add('selected');
    }

    if (!isClue) {
      cell.addEventListener('click', function () {
        state.selected = i;
        renderGrid();
      });
    }

    gridEl.appendChild(cell);
  });
}

function buildNumpad() {
  const numpad = document.getElementById('numpad');
  numpad.innerHTML = '';
  [1, 2, 3, 4, 'X'].forEach(function (n) {
    const btn = document.createElement('button');
    btn.className = `num-btn${n === 'X' ? ' erase' : ''}`;
    btn.textContent = n === 'X' ? '⌫' : n;
    btn.addEventListener('click', function () {
      enterNumber(n === 'X' ? 0 : n);
    });
    numpad.appendChild(btn);
  });
}

// ── ENTER NUMBER ─────────────────────────────────────────────────────────────

function enterNumber(num) {
  if (state.selected < 0 || state.solved) {
    return;
  }
  const pos = state.selected;
  if (state.puzzle[pos] !== 0) {
    return;
  }

  state.grid[pos] = num;

  if (num !== 0 && num !== state.solution[pos]) {
    state.errors++;
    document.getElementById('stat-errors').textContent = state.errors;
  }

  renderGrid();
  checkSolved();
}

// ── CHECK SOLVED ─────────────────────────────────────────────────────────────

function checkSolved() {
  const allFilled = state.grid.every(function (v) {
    return v !== 0;
  });
  if (!allFilled) {
    return;
  }

  const allCorrect = state.grid.every(function (v, i) {
    return v === state.solution[i];
  });

  if (allCorrect) {
    state.solved = true;
    clearInterval(state.timerInterval);
    const elapsed = Date.now() - state.startTime;
    const timeStr = formatTime(elapsed);

    document.getElementById('result-time').textContent = timeStr;
    document.getElementById('result-trophy').textContent =
      state.errors === 0 ? '🏆' : state.errors <= 3 ? '🥈' : '🥉';
    document.getElementById('result-sub').textContent =
      state.errors === 0
        ? 'Perfect! No mistakes!'
        : `Solved with ${state.errors} mistake${state.errors === 1 ? '' : 's'}.`;

    setTimeout(function () {
      showScreen('screen-result');
    }, 500);
  }
}

// ── HINT ─────────────────────────────────────────────────────────────────────

function useHint() {
  if (state.hints <= 0 || state.solved) {
    return;
  }
  const empties = [];
  state.grid.forEach(function (v, i) {
    if (v === 0 && state.puzzle[i] === 0) {
      empties.push(i);
    }
  });
  if (empties.length === 0) {
    return;
  }

  state.hints--;
  document.getElementById('stat-hints').textContent = state.hints;

  const pos = empties[Math.floor(Math.random() * empties.length)];
  state.selected = pos;
  state.grid[pos] = state.solution[pos];
  renderGrid();
  checkSolved();
}

// ── START GAME ────────────────────────────────────────────────────────────────

function startGame(difficulty) {
  const diffs = ['easy', 'medium', 'hard'];
  const actualDiff = difficulty === 'random' ? diffs[Math.floor(Math.random() * 3)] : difficulty;
  const clues = CLUE_COUNTS[difficulty === 'random' ? actualDiff : difficulty];

  state.difficulty = actualDiff;
  const { q, s } = generatePuzzle(clues);
  state.puzzle = q.slice();
  state.solution = s.slice();
  state.grid = q.slice();
  state.selected = -1;
  state.errors = 0;
  state.hints = 3;
  state.solved = false;

  document.getElementById('stat-errors').textContent = '0';
  document.getElementById('stat-hints').textContent = '3';
  document.getElementById('stat-time').textContent = '0:00';
  document.getElementById('nav-meta').textContent =
    actualDiff.charAt(0).toUpperCase() + actualDiff.slice(1);

  buildNumpad();
  renderGrid();
  showScreen('screen-game');

  state.startTime = Date.now();
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(function () {
    document.getElementById('stat-time').textContent = formatTime(Date.now() - state.startTime);
  }, 500);
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.diff-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      startGame(btn.dataset.diff);
    });
  });

  document.getElementById('btn-hint').addEventListener('click', useHint);

  document.getElementById('btn-new').addEventListener('click', function () {
    showScreen('screen-start');
    clearInterval(state.timerInterval);
  });

  document.getElementById('btn-next').addEventListener('click', function () {
    startGame(state.difficulty);
  });

  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });
});

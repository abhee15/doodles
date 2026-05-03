'use strict';

// ── WORD PAIRS ────────────────────────────────────────────────────────────────

const PAIRS = [
  { word: 'Hot', antonym: 'Cold' },
  { word: 'Big', antonym: 'Small' },
  { word: 'Fast', antonym: 'Slow' },
  { word: 'Happy', antonym: 'Sad' },
  { word: 'Up', antonym: 'Down' },
  { word: 'Day', antonym: 'Night' },
  { word: 'Old', antonym: 'New' },
  { word: 'Hard', antonym: 'Soft' },
  { word: 'Light', antonym: 'Dark' },
  { word: 'Open', antonym: 'Closed' },
  { word: 'Love', antonym: 'Hate' },
  { word: 'Begin', antonym: 'End' },
  { word: 'Clean', antonym: 'Dirty' },
  { word: 'Quiet', antonym: 'Loud' },
  { word: 'Strong', antonym: 'Weak' },
  { word: 'Brave', antonym: 'Cowardly' },
  { word: 'Ancient', antonym: 'Modern' },
  { word: 'Victory', antonym: 'Defeat' },
  { word: 'Generous', antonym: 'Selfish' },
  { word: 'Honest', antonym: 'Dishonest' },
  { word: 'Expand', antonym: 'Contract' },
  { word: 'Rigid', antonym: 'Flexible' },
  { word: 'Transparent', antonym: 'Opaque' },
  { word: 'Artificial', antonym: 'Natural' },
  { word: 'Abundant', antonym: 'Scarce' },
  { word: 'Include', antonym: 'Exclude' },
  { word: 'Shallow', antonym: 'Deep' },
  { word: 'Empty', antonym: 'Full' },
  { word: 'Arrive', antonym: 'Depart' },
  { word: 'Accept', antonym: 'Reject' }
];

const LEVELS = [
  { id: 'easy', label: 'Easy', emoji: '🌟', pairPool: PAIRS.slice(0, 12), choices: 3 },
  { id: 'medium', label: 'Medium', emoji: '🔥', pairPool: PAIRS.slice(0, 20), choices: 4 },
  { id: 'hard', label: 'Hard', emoji: '💎', pairPool: PAIRS, choices: 5 }
];

const TOTAL_ROUNDS = 10;

const state = {
  levelIdx: 0,
  score: 0,
  round: 0,
  usedIndices: new Set(),
  currentPair: null,
  answered: false
};

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

function pickPair() {
  const lv = currentLevel();
  const pool = lv.pairPool;
  const available = pool
    .map(function (_, i) {
      return i;
    })
    .filter(function (i) {
      return !state.usedIndices.has(i);
    });
  if (available.length < lv.choices) {
    state.usedIndices.clear();
    return pickPair();
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  state.usedIndices.add(idx);
  return pool[idx];
}

function startRound() {
  const lv = currentLevel();
  state.currentPair = pickPair();
  state.answered = false;

  document.getElementById('round-label').textContent =
    `Round ${state.round + 1} of ${TOTAL_ROUNDS}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('word-display').textContent = state.currentPair.word;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';

  // Hide Next button, show choices
  document.getElementById('btn-next').style.display = 'none';
  document.querySelectorAll('.choice-btn').forEach(btn => (btn.style.display = 'block'));

  buildChoices(lv);
  showScreen('screen-game');
}

function buildChoices(lv) {
  const correct = state.currentPair.antonym;
  const pool = lv.pairPool;

  const distractors = pool
    .map(function (p) {
      return p.antonym;
    })
    .filter(function (a) {
      return a !== correct;
    });

  shuffle(distractors);
  const choices = [correct, ...distractors.slice(0, lv.choices - 1)];
  shuffle(choices);

  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  choices.forEach(function (word) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = word;
    btn.addEventListener('click', function () {
      handleChoice(btn, word);
    });
    grid.appendChild(btn);
  });
}

function handleChoice(btn, chosen) {
  if (state.answered) {
    return;
  }
  state.answered = true;

  const correct = state.currentPair.antonym;
  document.querySelectorAll('.choice-btn').forEach(function (b) {
    b.disabled = true;
    if (b.textContent === correct) {
      b.classList.add('correct-choice');
    }
  });

  if (chosen === correct) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    showFeedback('✅ Correct!', 'good');
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    showFeedback(`❌ The antonym of "${state.currentPair.word}" is "${correct}"`, 'bad');
  }

  // Show Next button, hide choices
  document.getElementById('btn-next').style.display = 'inline-block';
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

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showResult() {
  const pct = state.score / TOTAL_ROUNDS;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '💪';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Vocabulary Master!' : pct >= 0.7 ? 'Great Job!' : 'Keep Practicing!';
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
      `<span class="lv-emoji">${lv.emoji}</span>` +
      `<span class="lv-label">${lv.label}</span>` +
      `<span class="lv-hint">${lv.choices} choices</span>`;
    btn.addEventListener('click', function () {
      state.levelIdx = i;
      state.score = 0;
      state.round = 0;
      state.usedIndices.clear();
      startRound();
    });
    picker.appendChild(btn);
  });

  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });
  document.getElementById('btn-next').addEventListener('click', nextOrResult);
  document.getElementById('btn-play-again').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.usedIndices.clear();
    startRound();
  });
});

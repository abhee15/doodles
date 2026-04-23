'use strict';

const PAIRS = [
  { word: 'Happy', synonym: 'Joyful', distractors: ['Sad', 'Angry', 'Tired'] },
  { word: 'Big', synonym: 'Large', distractors: ['Tiny', 'Short', 'Thin'] },
  { word: 'Fast', synonym: 'Quick', distractors: ['Slow', 'Lazy', 'Late'] },
  { word: 'Cold', synonym: 'Chilly', distractors: ['Hot', 'Warm', 'Sunny'] },
  { word: 'Brave', synonym: 'Courageous', distractors: ['Scared', 'Weak', 'Timid'] },
  { word: 'Smart', synonym: 'Clever', distractors: ['Foolish', 'Lazy', 'Rude'] },
  { word: 'Begin', synonym: 'Start', distractors: ['Finish', 'Stop', 'Leave'] },
  { word: 'Tired', synonym: 'Exhausted', distractors: ['Energetic', 'Excited', 'Active'] },
  { word: 'Angry', synonym: 'Furious', distractors: ['Calm', 'Happy', 'Peaceful'] },
  { word: 'Old', synonym: 'Ancient', distractors: ['New', 'Young', 'Fresh'] },
  { word: 'Scared', synonym: 'Frightened', distractors: ['Brave', 'Bold', 'Calm'] },
  { word: 'Funny', synonym: 'Amusing', distractors: ['Boring', 'Sad', 'Serious'] },
  { word: 'Pretty', synonym: 'Beautiful', distractors: ['Ugly', 'Plain', 'Dull'] },
  { word: 'Thin', synonym: 'Slender', distractors: ['Fat', 'Wide', 'Huge'] },
  { word: 'Noisy', synonym: 'Loud', distractors: ['Quiet', 'Silent', 'Soft'] },
  { word: 'Rich', synonym: 'Wealthy', distractors: ['Poor', 'Broke', 'Empty'] },
  { word: 'Strange', synonym: 'Peculiar', distractors: ['Normal', 'Usual', 'Common'] },
  { word: 'Difficult', synonym: 'Challenging', distractors: ['Easy', 'Simple', 'Clear'] },
  { word: 'Important', synonym: 'Significant', distractors: ['Minor', 'Trivial', 'Small'] },
  { word: 'Shout', synonym: 'Yell', distractors: ['Whisper', 'Mumble', 'Sing'] },
  { word: 'Help', synonym: 'Assist', distractors: ['Harm', 'Ignore', 'Block'] },
  { word: 'Glowing', synonym: 'Radiant', distractors: ['Dim', 'Dark', 'Dull'] },
  { word: 'Eager', synonym: 'Enthusiastic', distractors: ['Bored', 'Lazy', 'Tired'] },
  { word: 'Rare', synonym: 'Uncommon', distractors: ['Common', 'Usual', 'Typical'] },
  { word: 'Swift', synonym: 'Rapid', distractors: ['Slow', 'Gentle', 'Late'] }
];

const LEVELS = [
  { id: 'easy', label: 'Easy', emoji: '🌟', choices: 3, pool: PAIRS.slice(0, 14) },
  { id: 'medium', label: 'Medium', emoji: '🔥', choices: 4, pool: PAIRS.slice(0, 20) },
  { id: 'hard', label: 'Hard', emoji: '💎', choices: 5, pool: PAIRS }
];

const TOTAL_ROUNDS = 10;

const state = {
  levelIdx: 0,
  score: 0,
  round: 0,
  used: new Set(),
  current: null,
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

function pickPair() {
  const lv = currentLevel();
  const pool = lv.pool;
  const avail = pool
    .map(function (_, i) {
      return i;
    })
    .filter(function (i) {
      return !state.used.has(i);
    });
  if (avail.length === 0) {
    state.used.clear();
    return pickPair();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return pool[idx];
}

function startRound() {
  const lv = currentLevel();
  state.current = pickPair();
  state.answered = false;

  document.getElementById('round-label').textContent =
    `Round ${state.round + 1} of ${TOTAL_ROUNDS}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('word-display').textContent = state.current.word;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';

  const correct = state.current.synonym;
  const distractors = state.current.distractors.slice().sort(function () {
    return Math.random() - 0.5;
  });
  const choices = [correct, ...distractors.slice(0, lv.choices - 1)].sort(function () {
    return Math.random() - 0.5;
  });

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

  showScreen('screen-game');
}

function handleChoice(btn, chosen) {
  if (state.answered) {
    return;
  }
  state.answered = true;
  const correct = state.current.synonym;
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
    setTimeout(function () {
      state.round >= TOTAL_ROUNDS ? showResult() : startRound();
    }, 900);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    showFeedback(`❌ A synonym of "${state.current.word}" is "${correct}"`, 'bad');
    setTimeout(function () {
      state.round >= TOTAL_ROUNDS ? showResult() : startRound();
    }, 1500);
  }
}

function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = `feedback${type ? ` ${type}` : ''}`;
}

function showResult() {
  const pct = state.score / TOTAL_ROUNDS;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '💪';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Word Wizard!' : pct >= 0.7 ? 'Great Job!' : 'Keep Practicing!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL_ROUNDS} correct`;
  document.getElementById('result-level').textContent = `${currentLevel().label} level`;
  showScreen('screen-result');
}

document.addEventListener('DOMContentLoaded', function () {
  const picker = document.getElementById('level-picker');
  LEVELS.forEach(function (lv, i) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.innerHTML = `<span class="lv-emoji">${lv.emoji}</span><span class="lv-label">${lv.label}</span><span class="lv-hint">${lv.choices} choices</span>`;
    btn.addEventListener('click', function () {
      state.levelIdx = i;
      state.score = 0;
      state.round = 0;
      state.used.clear();
      startRound();
    });
    picker.appendChild(btn);
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

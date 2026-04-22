'use strict';

// ── WORD CATEGORIES ───────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'animals',
    label: 'Animals',
    emoji: '🦁',
    words: [
      'ELEPHANT',
      'DOLPHIN',
      'PENGUIN',
      'GIRAFFE',
      'OCTOPUS',
      'CROCODILE',
      'BUTTERFLY',
      'CHEETAH',
      'KANGAROO',
      'PLATYPUS',
      'FLAMINGO',
      'PORCUPINE',
      'HAMSTER',
      'JAGUAR',
      'LEOPARD',
      'WALRUS',
      'NARWHAL',
      'MONGOOSE',
      'TOUCAN',
      'CHAMELEON'
    ]
  },
  {
    id: 'food',
    label: 'Food',
    emoji: '🍕',
    words: [
      'PIZZA',
      'BANANA',
      'STRAWBERRY',
      'WATERMELON',
      'CHOCOLATE',
      'PANCAKE',
      'PRETZEL',
      'AVOCADO',
      'PINEAPPLE',
      'BLUEBERRY',
      'BROCCOLI',
      'SPAGHETTI',
      'SANDWICH',
      'MUFFIN',
      'WAFFLE',
      'LEMONADE',
      'CUCUMBER',
      'POPCORN',
      'PEACH',
      'MANGO'
    ]
  },
  {
    id: 'space',
    label: 'Space',
    emoji: '🚀',
    words: [
      'SATURN',
      'JUPITER',
      'MERCURY',
      'NEPTUNE',
      'ASTEROID',
      'COMET',
      'GALAXY',
      'NEBULA',
      'CRATER',
      'ASTRONAUT',
      'TELESCOPE',
      'ORBIT',
      'ECLIPSE',
      'METEOR',
      'COSMOS',
      'PLASMA',
      'SUPERNOVA',
      'GRAVITY',
      'ROCKET',
      'VENUS'
    ]
  },
  {
    id: 'nature',
    label: 'Nature',
    emoji: '🌿',
    words: [
      'VOLCANO',
      'TORNADO',
      'RAINBOW',
      'GLACIER',
      'WATERFALL',
      'THUNDER',
      'LIGHTNING',
      'CANYON',
      'TSUNAMI',
      'AVALANCHE',
      'HURRICANE',
      'FOREST',
      'DESERT',
      'OCEAN',
      'MOUNTAIN',
      'SWAMP',
      'TUNDRA',
      'MONSOON',
      'LAGOON',
      'MEADOW'
    ]
  },
  {
    id: 'countries',
    label: 'Countries',
    emoji: '🌍',
    words: [
      'BRAZIL',
      'FRANCE',
      'JAPAN',
      'EGYPT',
      'INDIA',
      'MEXICO',
      'CHINA',
      'RUSSIA',
      'CANADA',
      'NIGERIA',
      'SWEDEN',
      'TURKEY',
      'GREECE',
      'PERU',
      'KENYA',
      'VIETNAM',
      'NORWAY',
      'ICELAND',
      'MOROCCO',
      'ARGENTINA'
    ]
  },
  {
    id: 'sports',
    label: 'Sports',
    emoji: '⚽',
    words: [
      'SOCCER',
      'TENNIS',
      'CRICKET',
      'SWIMMING',
      'GYMNASTICS',
      'VOLLEYBALL',
      'BADMINTON',
      'ARCHERY',
      'WRESTLING',
      'CYCLING',
      'SURFING',
      'SKATEBOARD',
      'BASEBALL',
      'HOCKEY',
      'KARATE',
      'MARATHON',
      'DIVING',
      'FENCING',
      'ROWING',
      'POLO'
    ]
  }
];

const MAX_WRONG = 6;
const LIFE_ICONS = ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'];
const LOST_ICON = '💀';

// ── STATE ────────────────────────────────────────────────────────────────────

const state = {
  catIdx: 0,
  word: '',
  guessed: new Set(),
  wrong: 0,
  streak: 0,
  done: false
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ── BUILD CATEGORY PICKER ─────────────────────────────────────────────────────

function buildCatGrid() {
  const grid = document.getElementById('cat-grid');
  grid.innerHTML = '';
  CATEGORIES.forEach(function (cat, i) {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `<span class="cat-emoji">${cat.emoji}</span>${cat.label}`;
    btn.addEventListener('click', function () {
      startGame(i);
    });
    grid.appendChild(btn);
  });
}

// ── START GAME ────────────────────────────────────────────────────────────────

function startGame(catIdx) {
  const cat = CATEGORIES[catIdx];
  state.catIdx = catIdx;
  state.word = randItem(cat.words);
  state.guessed = new Set();
  state.wrong = 0;
  state.done = false;

  document.getElementById('cat-label').textContent = `${cat.emoji} ${cat.label}`;
  document.getElementById('nav-meta').textContent = `${cat.label} · Streak ${state.streak}`;

  buildAlpha();
  renderTiles();
  renderLives();
  clearFeedback();
  showScreen('screen-game');
}

// ── RENDER ────────────────────────────────────────────────────────────────────

function renderTiles() {
  const container = document.getElementById('word-tiles');
  container.innerHTML = '';
  Array.from(state.word).forEach(function (ch) {
    const tile = document.createElement('div');
    if (ch === ' ') {
      tile.className = 'tile space';
    } else {
      tile.className = `tile${state.guessed.has(ch) ? ' revealed' : ''}`;
      tile.textContent = state.guessed.has(ch) ? ch : '';
    }
    container.appendChild(tile);
  });
}

function renderLives() {
  const row = document.getElementById('lives-row');
  row.innerHTML = '';
  for (let i = 0; i < MAX_WRONG; i++) {
    const span = document.createElement('span');
    span.textContent = i < MAX_WRONG - state.wrong ? LIFE_ICONS[i] : '💔';
    row.appendChild(span);
  }
}

function buildAlpha() {
  const grid = document.getElementById('alpha-grid');
  grid.innerHTML = '';
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter) {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.textContent = letter;
    btn.id = `lb-${letter}`;
    btn.addEventListener('click', function () {
      guessLetter(letter);
    });
    grid.appendChild(btn);
  });
}

// ── GUESS ─────────────────────────────────────────────────────────────────────

function guessLetter(letter) {
  if (state.done || state.guessed.has(letter)) {
    return;
  }

  state.guessed.add(letter);
  const btn = document.getElementById(`lb-${letter}`);
  btn.disabled = true;

  if (state.word.includes(letter)) {
    btn.classList.add('correct');
    showFeedback(`✓ ${letter} is in the word!`, 'good');
    renderTiles();
    checkWin();
  } else {
    state.wrong++;
    btn.classList.add('wrong');
    showFeedback(`✗ ${letter} is not here`, 'bad');
    renderLives();
    if (state.wrong >= MAX_WRONG) {
      endGame(false);
    }
  }
}

function checkWin() {
  const allRevealed = Array.from(state.word).every(function (ch) {
    return ch === ' ' || state.guessed.has(ch);
  });
  if (allRevealed) {
    state.streak++;
    endGame(true);
  }
}

// ── FEEDBACK ─────────────────────────────────────────────────────────────────

function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = `feedback-flash ${type}`;
}

function clearFeedback() {
  const el = document.getElementById('feedback');
  el.textContent = '';
  el.className = 'feedback-flash';
}

// ── END GAME ─────────────────────────────────────────────────────────────────

function endGame(won) {
  state.done = true;

  document.getElementById('result-word').textContent = state.word;

  if (won) {
    document.getElementById('result-emoji').textContent = state.streak >= 3 ? '🏆' : '🎉';
    document.getElementById('result-title').textContent =
      state.streak >= 5 ? 'Incredible!' : state.streak >= 3 ? 'On Fire!' : 'You got it!';
    document.getElementById('result-score').textContent = `🔥 Streak: ${state.streak}`;
    document.getElementById('result-sub').textContent =
      `Only ${state.wrong} wrong guess${state.wrong === 1 ? '' : 'es'}.`;
  } else {
    state.streak = 0;
    document.getElementById('result-emoji').textContent = '😅';
    document.getElementById('result-title').textContent = 'The word was…';
    document.getElementById('result-score').textContent = '';
    document.getElementById('result-sub').textContent = 'Better luck next time! Keep trying!';
  }

  setTimeout(function () {
    showScreen('screen-result');
  }, 700);
}

// ── KEYBOARD SUPPORT ─────────────────────────────────────────────────────────

document.addEventListener('keydown', function (e) {
  const letter = e.key.toUpperCase();
  if (
    /^[A-Z]$/.test(letter) &&
    document.getElementById('screen-game').classList.contains('active')
  ) {
    guessLetter(letter);
  }
});

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  buildCatGrid();

  document.getElementById('btn-next-word').addEventListener('click', function () {
    startGame(state.catIdx);
  });

  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });
});

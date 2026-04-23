'use strict';

const PAIRS = [
  {
    a: 'Sun',
    b: 'Flower',
    combined: 'Sunflower',
    distractors: ['Sunlight', 'Rainfall', 'Moonbeam']
  },
  { a: 'Rain', b: 'Bow', combined: 'Rainbow', distractors: ['Raindrop', 'Sunshine', 'Snowfall'] },
  { a: 'Fire', b: 'Fly', combined: 'Firefly', distractors: ['Fireman', 'Butterfly', 'Dragonfly'] },
  {
    a: 'Snow',
    b: 'Ball',
    combined: 'Snowball',
    distractors: ['Snowflake', 'Football', 'Baseball']
  },
  {
    a: 'Book',
    b: 'Shelf',
    combined: 'Bookshelf',
    distractors: ['Bookcase', 'Bookworm', 'Bookend']
  },
  { a: 'Cup', b: 'Cake', combined: 'Cupcake', distractors: ['Pancake', 'Cupcup', 'Cupsake'] },
  {
    a: 'Star',
    b: 'Fish',
    combined: 'Starfish',
    distractors: ['Starlight', 'Swordfish', 'Stargaze']
  },
  {
    a: 'Butter',
    b: 'Fly',
    combined: 'Butterfly',
    distractors: ['Buttercup', 'Dragonfly', 'Firefly']
  },
  { a: 'Air', b: 'Port', combined: 'Airport', distractors: ['Airship', 'Seaport', 'Airway'] },
  { a: 'Sea', b: 'Shell', combined: 'Seashell', distractors: ['Seashore', 'Clambake', 'Nutshell'] },
  { a: 'Birth', b: 'Day', combined: 'Birthday', distractors: ['Birthplace', 'Weekday', 'Holiday'] },
  {
    a: 'Tooth',
    b: 'Brush',
    combined: 'Toothbrush',
    distractors: ['Toothpaste', 'Paintbrush', 'Hairbrush']
  },
  {
    a: 'Thunder',
    b: 'Storm',
    combined: 'Thunderstorm',
    distractors: ['Thunderbolt', 'Hailstorm', 'Snowstorm']
  },
  { a: 'Back', b: 'Pack', combined: 'Backpack', distractors: ['Backyard', 'Knapsack', 'Rucksack'] },
  {
    a: 'Grass',
    b: 'Hopper',
    combined: 'Grasshopper',
    distractors: ['Grassland', 'Leapfrog', 'Cricket']
  },
  { a: 'Sun', b: 'Shine', combined: 'Sunshine', distractors: ['Sunburn', 'Moonshine', 'Twilight'] },
  {
    a: 'Blue',
    b: 'Berry',
    combined: 'Blueberry',
    distractors: ['Blackberry', 'Bluebird', 'Raspberry']
  },
  {
    a: 'Foot',
    b: 'Print',
    combined: 'Footprint',
    distractors: ['Footstep', 'Blueprint', 'Fingerprint']
  },
  {
    a: 'Honey',
    b: 'Bee',
    combined: 'Honeybee',
    distractors: ['Honeydew', 'Bumblebee', 'Honeycomb']
  },
  {
    a: 'Key',
    b: 'Board',
    combined: 'Keyboard',
    distractors: ['Keyholder', 'Cardboard', 'Surfboard']
  }
];

const TOTAL = 10;
const state = { score: 0, round: 0, used: new Set(), current: null, answered: false };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function pickPair() {
  const avail = PAIRS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.used.has(i);
  });
  if (avail.length === 0) {
    state.used.clear();
    return pickPair();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return PAIRS[idx];
}

function startRound() {
  state.current = pickPair();
  state.answered = false;
  document.getElementById('round-label').textContent = `Round ${state.round + 1} of ${TOTAL}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('word-a').textContent = state.current.a;
  document.getElementById('word-b').textContent = state.current.b;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  buildChoices();
  showScreen('screen-game');
}

function buildChoices() {
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  const choices = [state.current.combined, ...state.current.distractors].sort(function () {
    return Math.random() - 0.5;
  });
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
  const correct = state.current.combined;
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
    document.getElementById('feedback').textContent =
      `✅ ${state.current.a} + ${state.current.b} = ${correct}!`;
    document.getElementById('feedback').className = 'feedback good';
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1100);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    document.getElementById('feedback').textContent = `❌ It's "${correct}"!`;
    document.getElementById('feedback').className = 'feedback bad';
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1600);
  }
}

function showResult() {
  const pct = state.score / TOTAL;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '📚';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Word Wizard!' : pct >= 0.7 ? 'Great Job!' : 'Keep Building!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL} correct`;
  showScreen('screen-result');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-start').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.used.clear();
    startRound();
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

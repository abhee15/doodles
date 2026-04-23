'use strict';
const QUESTIONS = [
  {
    q: "What stage comes AFTER the egg in a butterfly's life cycle?",
    choices: ['Pupa', 'Adult', 'Larva (caterpillar)', 'Chrysalis'],
    answer: 2,
    emoji: '🥚',
    fact: 'Egg → Larva (caterpillar) → Pupa (chrysalis) → Adult butterfly. This is called complete metamorphosis!'
  },
  {
    q: 'What does a caterpillar form before becoming a butterfly?',
    choices: ['A cocoon of silk', 'A chrysalis (pupa)', 'A shell', 'An egg sac'],
    answer: 1,
    emoji: '🐛',
    fact: "A caterpillar forms a chrysalis (NOT a cocoon — that's for moths!). Inside, it transforms into a butterfly."
  },
  {
    q: "How many stages does a butterfly's life cycle have?",
    choices: ['2', '3', '4', '5'],
    answer: 2,
    emoji: '🦋',
    fact: "Butterfly life cycle: Egg → Larva → Pupa → Adult. That's 4 stages of complete metamorphosis!"
  },
  {
    q: 'A tadpole grows into a...',
    choices: ['Fish', 'Newt', 'Frog', 'Lizard'],
    answer: 2,
    emoji: '🐸',
    fact: 'Tadpoles are baby frogs! They start with tails and gills, then grow legs and lose their tails.'
  },
  {
    q: "What stage comes after the tadpole stage in a frog's life cycle?",
    choices: ['Adult frog', 'Egg', 'Froglet', 'Spawn'],
    answer: 2,
    emoji: '🐸',
    fact: 'Frog life cycle: Egg (spawn) → Tadpole → Froglet → Adult frog. The froglet still has a small tail!'
  },
  {
    q: 'Plants start their life as a...',
    choices: ['Leaf', 'Flower', 'Fruit', 'Seed'],
    answer: 3,
    emoji: '🌱',
    fact: 'Most plants begin as seeds! A seed contains everything needed to grow a new plant.'
  },
  {
    q: 'What do seeds need to START growing (germinate)?',
    choices: ['Sunshine only', 'Water, warmth, and air', 'Fertilizer', 'Soil only'],
    answer: 1,
    emoji: '💧',
    fact: 'Seeds need water, warmth, and air to germinate (sprout). Many seeds can sprout without sunlight at first!'
  },
  {
    q: 'A flower produces ___ which can grow into new plants.',
    choices: ['Leaves', 'Roots', 'Seeds', 'Stems'],
    answer: 2,
    emoji: '🌸',
    fact: 'Flowers produce seeds after pollination. Seeds fall to the ground (or travel by wind/animals) and grow into new plants!'
  },
  {
    q: 'Incomplete metamorphosis has how many stages?',
    choices: ['2', '3', '4', '5'],
    answer: 1,
    emoji: '🦗',
    fact: 'Incomplete metamorphosis has 3 stages: Egg → Nymph → Adult. Grasshoppers and crickets go through incomplete metamorphosis.'
  },
  {
    q: 'A young grasshopper (that looks like a tiny adult) is called a...',
    choices: ['Larva', 'Pupa', 'Nymph', 'Hatchling'],
    answer: 2,
    emoji: '🦗',
    fact: "Grasshopper nymphs look like small adult grasshoppers — they don't have a pupa stage like butterflies do!"
  },
  {
    q: 'What is the process called when a caterpillar becomes a butterfly?',
    choices: ['Pollination', 'Migration', 'Metamorphosis', 'Photosynthesis'],
    answer: 2,
    emoji: '🦋',
    fact: 'Metamorphosis means a dramatic change in body form. The Greek word "metamorphoun" means "to transform"!'
  },
  {
    q: 'Which part of a seed stores food for the baby plant?',
    choices: ['The shell (seed coat)', 'The cotyledon (seed leaf)', 'The embryo', 'The root'],
    answer: 1,
    emoji: '🌱',
    fact: 'The cotyledon stores food energy for the sprouting seedling until it can make its own food through photosynthesis!'
  },
  {
    q: 'What do baby mammals feed on first?',
    choices: ['Seeds', 'Insects', "Their mother's milk", 'Plants'],
    answer: 2,
    emoji: '🐣',
    fact: 'Baby mammals are born live and fed their mother\'s milk. This is what makes mammals special — "mammal" comes from "mamma" (breast)!'
  },
  {
    q: 'In a plant life cycle, what comes AFTER pollination?',
    choices: ['Germination', 'Seed formation', 'Photosynthesis', 'Sprouting'],
    answer: 1,
    emoji: '🌺',
    fact: 'After pollination (pollen reaches the flower), seeds form. The flower becomes a fruit containing seeds!'
  },
  {
    q: 'Which animal goes through COMPLETE metamorphosis?',
    choices: ['Grasshopper', 'Dragonfly (adult stage)', 'Butterfly', 'Cockroach'],
    answer: 2,
    emoji: '🦋',
    fact: 'Butterflies (and beetles, flies, bees) go through complete metamorphosis: Egg → Larva → Pupa → Adult!'
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
function pickQ() {
  const avail = QUESTIONS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.used.has(i);
  });
  if (avail.length === 0) {
    state.used.clear();
    return pickQ();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return QUESTIONS[idx];
}
function startRound() {
  state.current = pickQ();
  state.answered = false;
  document.getElementById('round-label').textContent = `Round ${state.round + 1} of ${TOTAL}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('q-emoji').textContent = state.current.emoji;
  document.getElementById('q-text').textContent = state.current.q;
  document.getElementById('fact-box').textContent = '';
  document.getElementById('fact-box').style.display = 'none';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  buildChoices();
  showScreen('screen-game');
}
function buildChoices() {
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  state.current.choices.forEach(function (c, i) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c;
    btn.addEventListener('click', function () {
      handleChoice(btn, i);
    });
    grid.appendChild(btn);
  });
}
function handleChoice(btn, idx) {
  if (state.answered) {
    return;
  }
  state.answered = true;
  document.querySelectorAll('.choice-btn').forEach(function (b, i) {
    b.disabled = true;
    if (i === state.current.answer) {
      b.classList.add('correct-choice');
    }
  });
  document.getElementById('fact-box').textContent = `💡 ${state.current.fact}`;
  document.getElementById('fact-box').style.display = 'block';
  if (idx === state.current.answer) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    document.getElementById('feedback').textContent = '✅ Correct!';
    document.getElementById('feedback').className = 'feedback good';
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1600);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    document.getElementById('feedback').textContent = '❌ Not quite!';
    document.getElementById('feedback').className = 'feedback bad';
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 2100);
  }
}
function showResult() {
  const pct = state.score / TOTAL;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🦋' : '🌱';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Nature Expert!' : pct >= 0.7 ? 'Great Naturalist!' : 'Keep Growing!';
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

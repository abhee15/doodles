'use strict';

const QUESTIONS = [
  {
    q: 'Which animal group feeds their babies with milk?',
    choices: ['Birds', 'Reptiles', 'Mammals', 'Insects'],
    answer: 2,
    emoji: '🐄',
    fact: 'Mammals nurse their babies with milk. Humans, cows, dogs, and dolphins are all mammals!'
  },
  {
    q: 'Which of these is a reptile?',
    choices: ['Frog', 'Crocodile', 'Salmon', 'Eagle'],
    answer: 1,
    emoji: '🐊',
    fact: 'Crocodiles are reptiles — cold-blooded, scaly, and they lay eggs on land!'
  },
  {
    q: 'How many legs does an insect have?',
    choices: ['4', '6', '8', '10'],
    answer: 1,
    emoji: '🐜',
    fact: 'All insects have exactly 6 legs. Spiders have 8 legs — that makes them arachnids, not insects!'
  },
  {
    q: 'Which of these is an amphibian?',
    choices: ['Shark', 'Lizard', 'Frog', 'Butterfly'],
    answer: 2,
    emoji: '🐸',
    fact: 'Frogs are amphibians — they live both in water (as tadpoles) and on land (as adults)!'
  },
  {
    q: 'What makes birds unique among animals?',
    choices: ['They lay eggs', 'They have feathers', 'They can fly', 'They are warm-blooded'],
    answer: 1,
    emoji: '🦅',
    fact: 'Feathers are unique to birds. Even flightless birds like penguins and ostriches have feathers!'
  },
  {
    q: 'Which animal is a mammal?',
    choices: ['Salmon', 'Turtle', 'Whale', 'Gecko'],
    answer: 2,
    emoji: '🐋',
    fact: 'Whales are mammals! They breathe air, give birth to live young, and nurse them with milk.'
  },
  {
    q: 'Insects breathe through...',
    choices: ['Lungs', 'Gills', 'Tiny holes called spiracles', 'Their skin'],
    answer: 2,
    emoji: '🦋',
    fact: 'Insects have spiracles (tiny holes) on their sides. Oxygen goes directly to their cells!'
  },
  {
    q: 'Which of these lays eggs AND has scales?',
    choices: ['Dog', 'Snake', 'Frog', 'Bat'],
    answer: 1,
    emoji: '🐍',
    fact: 'Snakes are reptiles — cold-blooded with dry scales, and most lay eggs!'
  },
  {
    q: 'A tadpole grows into which animal?',
    choices: ['Fish', 'Frog', 'Newt... wait — which?', 'Salamander'],
    answer: 1,
    emoji: '🐸',
    fact: 'Tadpoles grow into frogs! This transformation is called metamorphosis.'
  },
  {
    q: 'Which animal has an exoskeleton (shell on the outside)?',
    choices: ['Dog', 'Fish', 'Beetle', 'Frog'],
    answer: 2,
    emoji: '🪲',
    fact: 'Insects like beetles have a hard exoskeleton — their skeleton is on the outside!'
  },
  {
    q: 'Which fish can breathe on land for short periods?',
    choices: ['Tuna', 'Catfish', 'Mudskipper', 'Salmon'],
    answer: 2,
    emoji: '🐟',
    fact: 'Mudskippers use their fins like arms and can breathe through moist skin on land!'
  },
  {
    q: 'Cold-blooded animals get heat from...',
    choices: ['Internal body heat', 'Their food', 'Their environment (sun)', 'Sleeping'],
    answer: 2,
    emoji: '☀️',
    fact: 'Reptiles and amphibians are cold-blooded — they rely on the sun to warm up!'
  },
  {
    q: 'Which of these is NOT a bird?',
    choices: ['Penguin', 'Bat', 'Ostrich', 'Flamingo'],
    answer: 1,
    emoji: '🦇',
    fact: 'Bats are mammals, not birds! They are the only mammals that can truly fly.'
  },
  {
    q: 'Which group of animals has the most species on Earth?',
    choices: ['Mammals', 'Birds', 'Reptiles', 'Insects'],
    answer: 3,
    emoji: '🌍',
    fact: 'Insects are the most diverse group — over 1 million species described, many more undiscovered!'
  },
  {
    q: 'What do all mammals have in common?',
    choices: ['They all fly', 'They all swim', 'They are all warm-blooded', 'They all have 4 legs'],
    answer: 2,
    emoji: '🐻',
    fact: 'All mammals are warm-blooded and have some hair or fur. They also breathe air!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '🦁';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Animal Expert!' : pct >= 0.7 ? 'Nature Lover!' : 'Keep Exploring!';
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

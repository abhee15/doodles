'use strict';

// ── QUIZ DATA ─────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    q: 'In a food chain, what do we call animals that eat plants?',
    choices: ['Herbivores', 'Carnivores', 'Decomposers', 'Producers'],
    answer: 0,
    emoji: '🐄',
    fact: 'Herbivores only eat plants. Examples: cows, rabbits, and deer.'
  },
  {
    q: 'What is a "producer" in a food chain?',
    choices: [
      'An animal that eats plants',
      'A plant that makes its own food',
      'An animal that eats meat',
      'A fungus that breaks things down'
    ],
    answer: 1,
    emoji: '🌿',
    fact: 'Producers (plants) make food using sunlight through photosynthesis!'
  },
  {
    q: 'What do decomposers do in a food chain?',
    choices: ['Eat animals', 'Make energy from sunlight', 'Break down dead things', 'Drink water'],
    answer: 2,
    emoji: '🍄',
    fact: 'Decomposers like mushrooms and bacteria recycle nutrients back into the soil.'
  },
  {
    q: 'In the food chain: Grass → Rabbit → Fox. What is the fox?',
    choices: ['Producer', 'Herbivore', 'Carnivore', 'Decomposer'],
    answer: 2,
    emoji: '🦊',
    fact: 'The fox is a carnivore — it eats the rabbit which ate the grass.'
  },
  {
    q: 'What is at the BOTTOM (start) of most food chains?',
    choices: ['Lions', 'Plants', 'Eagles', 'Sharks'],
    answer: 1,
    emoji: '☀️',
    fact: 'Plants are producers — they capture sunlight to start every food chain.'
  },
  {
    q: 'What do we call animals that eat BOTH plants and animals?',
    choices: ['Herbivores', 'Carnivores', 'Omnivores', 'Producers'],
    answer: 2,
    emoji: '🐻',
    fact: 'Omnivores eat everything! Bears, humans, and pigs are all omnivores.'
  },
  {
    q: 'In a food chain, energy flows...',
    choices: [
      'From animals to plants',
      'From consumers to producers',
      'From producers to consumers',
      'From water to sunlight'
    ],
    answer: 2,
    emoji: '⚡',
    fact: 'Energy flows from producers (plants) up to consumers (animals).'
  },
  {
    q: 'Which of these is a carnivore?',
    choices: ['Rabbit', 'Cow', 'Lion', 'Deer'],
    answer: 2,
    emoji: '🦁',
    fact: 'Lions are carnivores — they only eat meat (other animals).'
  },
  {
    q: 'If all the rabbits in a field disappeared, what would happen to foxes?',
    choices: [
      'They would multiply',
      'They would have less food',
      'Nothing would change',
      'They would eat more grass'
    ],
    answer: 1,
    emoji: '🐰',
    fact: 'If prey disappears, predators lose a food source and their numbers decrease.'
  },
  {
    q: 'What is a food WEB?',
    choices: [
      'A single food chain',
      'Many food chains connected together',
      'A spider web made of food',
      'Only plants in a habitat'
    ],
    answer: 1,
    emoji: '🕸️',
    fact: 'A food web shows all the complex feeding relationships in an ecosystem.'
  },
  {
    q: 'Which is the correct order for a food chain?',
    choices: [
      'Fox → Rabbit → Grass',
      'Rabbit → Fox → Grass',
      'Grass → Rabbit → Fox',
      'Fox → Grass → Rabbit'
    ],
    answer: 2,
    emoji: '🔗',
    fact: 'Grass (producer) → Rabbit (herbivore) → Fox (carnivore). Energy flows right!'
  },
  {
    q: 'What gives producers (plants) their energy?',
    choices: ['Eating other plants', 'The sun', 'Eating animals', 'Drinking water only'],
    answer: 1,
    emoji: '☀️',
    fact: 'Plants use sunlight in photosynthesis to make their own food!'
  },
  {
    q: 'Eagles that eat fish are called...',
    choices: ['Producers', 'Herbivores', 'Carnivores', 'Decomposers'],
    answer: 2,
    emoji: '🦅',
    fact: 'Eagles are carnivores — they hunt and eat other animals like fish.'
  },
  {
    q: 'As you go UP a food chain, the amount of energy...',
    choices: ['Increases', 'Stays the same', 'Decreases', 'Doubles'],
    answer: 2,
    emoji: '📉',
    fact: 'About 90% of energy is lost at each level — predators get very little original energy.'
  },
  {
    q: 'Which animal would be called an "apex predator"?',
    choices: ['Grass', 'Rabbit', 'Shark', 'Worm'],
    answer: 2,
    emoji: '🦈',
    fact: 'Apex predators are at the top of the food chain — nothing eats them (usually).'
  }
];

const TOTAL_ROUNDS = 10;
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
  document.getElementById('round-label').textContent =
    `Round ${state.round + 1} of ${TOTAL_ROUNDS}`;
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
      state.round >= TOTAL_ROUNDS ? showResult() : startRound();
    }, 1600);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    document.getElementById('feedback').textContent = '❌ Not quite!';
    document.getElementById('feedback').className = 'feedback bad';
    setTimeout(function () {
      state.round >= TOTAL_ROUNDS ? showResult() : startRound();
    }, 2100);
  }
}

function showResult() {
  const pct = state.score / TOTAL_ROUNDS;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '🌿';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Ecology Expert!' : pct >= 0.7 ? 'Great Science!' : 'Keep Exploring!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL_ROUNDS} correct`;
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

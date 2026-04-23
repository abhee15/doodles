'use strict';
const QUESTIONS = [
  {
    q: 'A polar bear lives in which habitat?',
    choices: ['Desert', 'Rainforest', 'Arctic tundra', 'Ocean'],
    answer: 2,
    emoji: '🐻‍❄️',
    fact: 'Polar bears live in the Arctic tundra — icy, treeless lands near the North Pole. Their white fur is camouflage!'
  },
  {
    q: 'Which habitat gets the most rainfall and has the most species?',
    choices: ['Desert', 'Tropical rainforest', 'Grassland', 'Arctic'],
    answer: 1,
    emoji: '🌿',
    fact: "Tropical rainforests get over 200 cm of rain per year and contain over half of Earth's plant and animal species!"
  },
  {
    q: 'A cactus is well-adapted to which habitat?',
    choices: ['Ocean', 'Rainforest', 'Desert', 'Pond'],
    answer: 2,
    emoji: '🌵',
    fact: 'Cacti store water in their thick stems for dry desert life. Their spines reduce water loss and protect them!'
  },
  {
    q: 'Fish, coral, and sea turtles live in which habitat?',
    choices: ['Freshwater lake', 'Desert', 'Rainforest', 'Ocean'],
    answer: 3,
    emoji: '🐠',
    fact: 'The ocean covers 71% of Earth! It is home to the largest animals (blue whales) and smallest organisms (plankton).'
  },
  {
    q: 'A habitat is best defined as...',
    choices: [
      'The food an animal eats',
      'The natural environment where an organism lives',
      'The climate of a region',
      'What an animal looks like'
    ],
    answer: 1,
    emoji: '🌍',
    fact: 'A habitat provides food, water, shelter, and space for animals to survive and reproduce!'
  },
  {
    q: 'Grasslands (savannas) are home to which of these animals?',
    choices: ['Penguins', 'Polar bears', 'Lions and elephants', 'Piranhas'],
    answer: 2,
    emoji: '🦁',
    fact: 'African savannas are grasslands with scattered trees. Lions, elephants, zebras, and giraffes call it home!'
  },
  {
    q: 'Frogs can live both in water and on land. This type of habitat is called...',
    choices: ['Marine', 'Terrestrial', 'Wetland/amphibious', 'Desert'],
    answer: 2,
    emoji: '🐸',
    fact: 'Wetlands (marshes, swamps, ponds) support both aquatic and land animals like frogs, herons, and turtles!'
  },
  {
    q: 'A penguin lives in which habitat?',
    choices: ['Tropical rainforest', 'Desert', 'Antarctic/polar', 'Deciduous forest'],
    answer: 2,
    emoji: '🐧',
    fact: 'Penguins live in Antarctica (South Pole). They have thick blubber and waterproof feathers to survive the cold!'
  },
  {
    q: 'Which habitat has trees that lose their leaves in autumn?',
    choices: ['Rainforest', 'Deciduous forest', 'Desert', 'Tundra'],
    answer: 1,
    emoji: '🍂',
    fact: 'Deciduous forests have four seasons. Trees (oak, maple, birch) shed leaves in autumn to survive winter cold!'
  },
  {
    q: 'An ecosystem includes...',
    choices: [
      'Only the animals in an area',
      'Only the plants in an area',
      'All living things AND their non-living environment',
      'Just the soil and rocks'
    ],
    answer: 2,
    emoji: '🌱',
    fact: 'An ecosystem = all living things (biotic) + non-living factors (abiotic) like water, sun, soil, and air!'
  },
  {
    q: 'Why do animals in cold habitats often have white fur or feathers?',
    choices: [
      'White keeps them warm',
      'For camouflage in snow and ice',
      'White animals are faster',
      'To reflect sunlight'
    ],
    answer: 1,
    emoji: '❄️',
    fact: 'White fur/feathers provide camouflage! Polar bears, arctic foxes, and snowy owls blend into snowy landscapes.'
  },
  {
    q: 'The deep ocean (no sunlight) is called the...',
    choices: ['Intertidal zone', 'Coral reef zone', 'Abyssal zone', 'Kelp forest'],
    answer: 2,
    emoji: '🌊',
    fact: 'The abyssal zone is the deep ocean floor (3,000-6,000 m deep). Animals there make their own light (bioluminescence)!'
  },
  {
    q: 'Which of these is an adaptation that helps desert animals survive?',
    choices: [
      'Thin skin',
      'Being active during the day',
      'Storing water in their bodies',
      'Having no fur'
    ],
    answer: 2,
    emoji: '🦎',
    fact: 'Camels store fat (not water) in their humps. Many desert animals are nocturnal to avoid daytime heat!'
  },
  {
    q: 'Coral reefs are found in which conditions?',
    choices: [
      'Cold, deep ocean',
      'Warm, shallow, clear water',
      'Freshwater rivers',
      'Arctic ocean'
    ],
    answer: 1,
    emoji: '🐠',
    fact: 'Coral reefs need warm (23-29°C), shallow, clear, salty water with sunlight. They are found near the equator!'
  },
  {
    q: 'What is a food chain in a habitat?',
    choices: [
      'A grocery store for animals',
      'The order in which energy passes from one organism to another',
      'A chain found in the ocean',
      'How animals communicate'
    ],
    answer: 1,
    emoji: '🔗',
    fact: 'Food chains show who eats whom! Sun → plant → rabbit → fox. Energy flows from producers to consumers!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🌿' : '🌍';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Habitat Hero!' : pct >= 0.7 ? 'Nature Expert!' : 'Keep Exploring!';
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

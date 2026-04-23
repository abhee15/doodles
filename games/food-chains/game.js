'use strict';
const QUESTIONS = [
  {
    q: 'What is a FOOD CHAIN?',
    choices: [
      'A grocery store list',
      'The path of energy from one living thing to another',
      'A type of animal habitat',
      'A recipe for food'
    ],
    answer: 1,
    emoji: '🌿',
    chain: [
      { e: '☀️', l: 'Sun' },
      { e: '🌱', l: 'Plant' },
      { e: '🐛', l: 'Caterpillar' },
      { e: '🐦', l: 'Bird' }
    ],
    fact: 'A food chain shows HOW ENERGY FLOWS — from the sun to plants to animals. Each arrow means "is eaten by"!'
  },
  {
    q: 'PRODUCERS in a food chain are...',
    choices: [
      'Animals that hunt',
      'Plants that make their own food using sunlight',
      'Animals that eat only plants',
      'Bacteria that break things down'
    ],
    answer: 1,
    emoji: '🌱',
    chain: [
      { e: '☀️', l: 'Sun' },
      { e: '🌿', l: 'Producer' }
    ],
    fact: 'PRODUCERS (plants, algae) use PHOTOSYNTHESIS to convert sunlight into food. They start every food chain!'
  },
  {
    q: 'An animal that eats ONLY plants is called...',
    choices: ['Carnivore', 'Omnivore', 'Herbivore', 'Decomposer'],
    answer: 2,
    emoji: '🐰',
    chain: [
      { e: '🌿', l: 'Plant' },
      { e: '🐰', l: 'Herbivore' }
    ],
    fact: 'HERBIVORES eat only plants — they are primary consumers. Rabbits, deer, cows, and caterpillars are herbivores!'
  },
  {
    q: 'An animal that eats ONLY other animals is called...',
    choices: ['Herbivore', 'Omnivore', 'Decomposer', 'Carnivore'],
    answer: 3,
    emoji: '🦁',
    chain: [
      { e: '🐰', l: 'Prey' },
      { e: '🦁', l: 'Carnivore' }
    ],
    fact: 'CARNIVORES eat only meat! Lions, wolves, sharks, and eagles are carnivores — they are secondary or tertiary consumers!'
  },
  {
    q: 'Humans and bears eat BOTH plants and animals. They are...',
    choices: ['Herbivores', 'Carnivores', 'Omnivores', 'Decomposers'],
    answer: 2,
    emoji: '🐻',
    chain: [
      { e: '🌿', l: 'Plants' },
      { e: '🐻', l: 'Omnivore' },
      { e: '🐟', l: '+ Fish' }
    ],
    fact: 'OMNIVORES eat both — giving them more food options! Humans, bears, pigs, and crows are all omnivores!'
  },
  {
    q: 'DECOMPOSERS like fungi and bacteria...',
    choices: [
      'Hunt other animals',
      'Make food from sunlight',
      'Break down dead organisms and return nutrients to soil',
      'Live only in water'
    ],
    answer: 2,
    emoji: '🍄',
    chain: [
      { e: '🍂', l: 'Dead matter' },
      { e: '🍄', l: 'Decomposer' },
      { e: '🌱', l: 'Nutrients' }
    ],
    fact: "DECOMPOSERS are nature's recyclers! They break dead things into nutrients that feed new plants — completing the cycle!"
  },
  {
    q: 'In the chain: Grass → Rabbit → Fox → Eagle — what is the GRASS?',
    choices: ['Primary consumer', 'Secondary consumer', 'Producer', 'Decomposer'],
    answer: 2,
    emoji: '🌾',
    chain: [
      { e: '🌾', l: 'Grass' },
      { e: '🐰', l: 'Rabbit' },
      { e: '🦊', l: 'Fox' },
      { e: '🦅', l: 'Eagle' }
    ],
    fact: 'GRASS is the PRODUCER — it makes its own food from sunlight. Everything in the chain depends on producers!'
  },
  {
    q: 'In the chain: Grass → Rabbit → Fox — the Rabbit is a...',
    choices: ['Producer', 'Primary consumer', 'Secondary consumer', 'Decomposer'],
    answer: 1,
    emoji: '🐰',
    chain: [
      { e: '🌾', l: 'Grass' },
      { e: '🐰', l: '1st consumer' },
      { e: '🦊', l: '2nd consumer' }
    ],
    fact: 'RABBIT is the PRIMARY CONSUMER — it eats the producer (grass) directly. Fox is secondary (eats rabbit)!'
  },
  {
    q: 'If all the rabbits in an ecosystem disappeared, what would likely happen to the foxes?',
    choices: [
      'Foxes would thrive',
      'Nothing would change',
      'Fox population would decrease (less food)',
      'Foxes would become rabbits'
    ],
    answer: 2,
    emoji: '🦊',
    chain: [
      { e: '🌾', l: 'Grass' },
      { e: '❌', l: 'No rabbit' },
      { e: '🦊', l: 'Fox suffers' }
    ],
    fact: 'Food chains are CONNECTED! Remove one link and the whole chain is affected. Ecosystems need balance!'
  },
  {
    q: 'A FOOD WEB is different from a food chain because...',
    choices: [
      'A food web only shows plants',
      'A food web shows many overlapping food chains in an ecosystem',
      'A food web has no predators',
      'A food web only has 2 animals'
    ],
    answer: 1,
    emoji: '🕸️',
    chain: [
      { e: '🌿', l: 'Plants' },
      { e: '🕸️', l: 'Web' },
      { e: '🐦', l: '+ more' }
    ],
    fact: 'A FOOD WEB shows ALL feeding relationships in an ecosystem — much more realistic than a single chain!'
  },
  {
    q: 'Where does the ENERGY in all food chains originally come from?',
    choices: ['The soil', 'The ocean', 'The Sun', 'The rain'],
    answer: 2,
    emoji: '☀️',
    chain: [
      { e: '☀️', l: 'Energy source' },
      { e: '🌱', l: 'Plants' },
      { e: '🐄', l: 'Animals' }
    ],
    fact: 'The SUN is the ultimate energy source for almost all life on Earth! Plants capture it → animals eat plants → energy transfers!'
  },
  {
    q: 'As energy moves UP a food chain, it...',
    choices: [
      'Increases each level',
      'Stays exactly the same',
      'Decreases — about 90% is lost at each step',
      'Doubles each level'
    ],
    answer: 2,
    emoji: '📉',
    chain: [
      { e: '🌿', l: '100%' },
      { e: '🐛', l: '10%' },
      { e: '🐦', l: '1%' }
    ],
    fact: "Only about 10% of energy passes to the next level! 90% is used for movement, heat, etc. That's why food chains are short!"
  },
  {
    q: 'An animal that is hunted and eaten is called...',
    choices: ['Predator', 'Producer', 'Prey', 'Parasite'],
    answer: 2,
    emoji: '🐟',
    chain: [
      { e: '🦈', l: 'Predator' },
      { e: '🐟', l: 'Prey' }
    ],
    fact: 'PREY is the hunted animal; PREDATOR is the hunter. A fish is prey to a shark, but a predator to smaller fish!'
  },
  {
    q: 'Which ecosystem has the MOST diverse food web?',
    choices: ['A parking lot', 'A tropical rainforest', 'A frozen tundra', 'A desert at noon'],
    answer: 1,
    emoji: '🌳',
    chain: [
      { e: '🌳', l: 'Rainforest' },
      { e: '🦋', l: 'Diverse' },
      { e: '🐒', l: 'Life' }
    ],
    fact: 'Tropical RAINFORESTS have the greatest biodiversity on Earth — thousands of species all linked in complex food webs!'
  },
  {
    q: 'What is BIODIVERSITY?',
    choices: [
      'A type of plant',
      'The variety of different species in an ecosystem',
      'The amount of sunlight an area receives',
      'A type of food chain'
    ],
    answer: 1,
    emoji: '🌍',
    chain: [
      { e: '🦋', l: 'Many' },
      { e: '🐠', l: 'Species' },
      { e: '🌺', l: 'Together' }
    ],
    fact: 'BIODIVERSITY = the variety of life in an ecosystem. More biodiversity = more stable ecosystem. Protecting it is crucial!'
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
function updateChain(q) {
  const vis = document.getElementById('chain-visual');
  vis.innerHTML = '';
  (q.chain || []).forEach(function (node, i) {
    if (i > 0) {
      const arr = document.createElement('span');
      arr.className = 'chain-arrow';
      arr.textContent = '→';
      vis.appendChild(arr);
    }
    const div = document.createElement('div');
    div.className = 'chain-node';
    div.innerHTML = `<span class="cn-emoji">${node.e}</span><span>${node.l}</span>`;
    vis.appendChild(div);
  });
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
  updateChain(state.current);
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🌿' : '🍄';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Ecosystem Expert!' : pct >= 0.7 ? 'Nature Navigator!' : 'Keep Exploring!';
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

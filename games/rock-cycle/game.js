'use strict';
const QUESTIONS = [
  {
    q: 'Which type of rock forms when melted rock (magma) cools and hardens?',
    choices: ['Sedimentary', 'Metamorphic', 'Igneous', 'Fossil'],
    answer: 2,
    emoji: '🌋',
    fact: 'Igneous rock forms from cooled magma. Granite and basalt are igneous rocks!'
  },
  {
    q: 'Sandstone and limestone are examples of which rock type?',
    choices: ['Igneous', 'Metamorphic', 'Sedimentary', 'Volcanic'],
    answer: 2,
    emoji: '🪨',
    fact: 'Sedimentary rocks form from layers of sediment (sand, shells, mud) pressed together over millions of years.'
  },
  {
    q: 'Which rock type forms when existing rocks are changed by heat and pressure?',
    choices: ['Sedimentary', 'Igneous', 'Fossil', 'Metamorphic'],
    answer: 3,
    emoji: '🔥',
    fact: 'Metamorphic rocks form deep underground under intense heat and pressure. Marble and slate are metamorphic!'
  },
  {
    q: 'Granite is which type of rock?',
    choices: ['Sedimentary', 'Metamorphic', 'Igneous', 'Coral'],
    answer: 2,
    emoji: '🗿',
    fact: 'Granite is igneous — it forms when magma cools slowly underground. It is very hard and used in buildings!'
  },
  {
    q: 'Which rock often contains fossils?',
    choices: ['Igneous', 'Metamorphic', 'Sedimentary', 'Obsidian'],
    answer: 2,
    emoji: '🦕',
    fact: 'Fossils are found in sedimentary rock because layers of sediment bury and preserve ancient organisms!'
  },
  {
    q: 'Marble forms from which rock when heated?',
    choices: ['Granite', 'Sandstone', 'Limestone', 'Basalt'],
    answer: 2,
    emoji: '⬜',
    fact: 'Limestone (sedimentary) becomes marble (metamorphic) under heat and pressure. Marble is used in statues!'
  },
  {
    q: 'What is the name for melted rock inside a volcano?',
    choices: ['Lava', 'Magma', 'Both are correct!', 'Sediment'],
    answer: 2,
    emoji: '🌋',
    fact: 'Melted rock underground is magma. When it erupts, it becomes lava! Both words describe the same material.'
  },
  {
    q: 'Obsidian is a shiny black rock formed from lava cooling very quickly. It is...',
    choices: ['Sedimentary', 'Metamorphic', 'Igneous', 'Fossil rock'],
    answer: 2,
    emoji: '⚫',
    fact: 'Obsidian is volcanic (igneous) glass — lava cooled so fast that crystals had no time to form!'
  },
  {
    q: 'The rock cycle means that rocks...',
    choices: [
      'Never change',
      'Are all the same',
      'Can change from one type to another',
      'Only form in volcanoes'
    ],
    answer: 2,
    emoji: '🔄',
    fact: 'Rocks constantly transform! Igneous → sedimentary → metamorphic → back to magma → igneous again.'
  },
  {
    q: 'Slate is a metamorphic rock made from which sedimentary rock?',
    choices: ['Sandstone', 'Limestone', 'Shale', 'Granite'],
    answer: 2,
    emoji: '🪨',
    fact: 'Shale (sedimentary) becomes slate (metamorphic) under pressure. Slate was used for old school chalkboards!'
  },
  {
    q: 'Which rock type forms in layers?',
    choices: ['Igneous', 'Metamorphic', 'Sedimentary', 'Volcanic'],
    answer: 2,
    emoji: '📚',
    fact: 'Sedimentary rock forms in horizontal layers called strata. You can see these layers in canyon walls!'
  },
  {
    q: 'What provides the heat that can turn rocks into magma?',
    choices: ['The sun', 'Lightning', "Earth's hot interior", 'Ocean water'],
    answer: 2,
    emoji: '🌍',
    fact: "Earth's interior is extremely hot. This heat melts rocks into magma deep underground!"
  },
  {
    q: 'Coal is a sedimentary rock formed from...',
    choices: ['Sand and pebbles', 'Ancient plants', 'Cooled lava', 'Sea shells only'],
    answer: 1,
    emoji: '🪨',
    fact: 'Coal forms from ancient plants compressed over millions of years. It is called a fossil fuel!'
  },
  {
    q: 'Which force helps create sedimentary rock by pressing layers together?',
    choices: ['Electricity', 'Pressure', 'Sound waves', 'Light'],
    answer: 1,
    emoji: '⬇️',
    fact: 'The weight and pressure of sediment layers above compacts the layers below into solid rock over time.'
  },
  {
    q: 'What are the THREE main types of rock?',
    choices: [
      'Soft, medium, hard',
      'Igneous, sedimentary, metamorphic',
      'Volcanic, ocean, land',
      'Old, new, ancient'
    ],
    answer: 1,
    emoji: '🔺',
    fact: 'The three rock types are igneous (from magma), sedimentary (from layers), and metamorphic (changed by heat/pressure).'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🪨' : '🌋';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Rock Star!' : pct >= 0.7 ? 'Geology Expert!' : 'Keep Digging!';
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

'use strict';

const QUESTIONS = [
  {
    q: 'Which is the largest continent by area?',
    choices: ['Africa', 'North America', 'Asia', 'Europe'],
    answer: 2,
    emoji: '🌏',
    fact: "Asia covers about 44.6 million km² — nearly 30% of Earth's total land area!"
  },
  {
    q: 'Which continent is the smallest?',
    choices: ['Europe', 'Antarctica', 'Australia', 'South America'],
    answer: 2,
    emoji: '🦘',
    fact: "Australia (Oceania) is the smallest continent at about 7.7 million km². It's also a country!"
  },
  {
    q: 'How many continents are there on Earth?',
    choices: ['5', '6', '7', '8'],
    answer: 2,
    emoji: '🌍',
    fact: 'There are 7 continents: Africa, Antarctica, Asia, Australia/Oceania, Europe, North America, South America.'
  },
  {
    q: 'Which continent is entirely covered by ice?',
    choices: ['Arctic', 'Antarctica', 'Greenland', 'Iceland'],
    answer: 1,
    emoji: '🧊',
    fact: 'Antarctica is covered by an ice sheet that is 2+ km thick! No country owns it — it belongs to science.'
  },
  {
    q: 'The Amazon River is on which continent?',
    choices: ['Africa', 'Asia', 'North America', 'South America'],
    answer: 3,
    emoji: '🌊',
    fact: 'The Amazon in South America is the largest river by water volume. It holds 20% of all fresh river water!'
  },
  {
    q: 'The Sahara Desert is in which continent?',
    choices: ['Asia', 'Africa', 'Australia', 'South America'],
    answer: 1,
    emoji: '🏜️',
    fact: "The Sahara in Africa is the world's largest hot desert — about the size of the United States!"
  },
  {
    q: 'Which continent has the most countries?',
    choices: ['Asia', 'Europe', 'Africa', 'North America'],
    answer: 2,
    emoji: '🌍',
    fact: 'Africa has 54 countries — the most of any continent. It is also the second largest continent!'
  },
  {
    q: "Where are the Himalayas (world's tallest mountains) located?",
    choices: ['Europe', 'South America', 'Asia', 'Africa'],
    answer: 2,
    emoji: '🏔️',
    fact: 'The Himalayas span Asia across Nepal, China, India, Bhutan, and Pakistan. Mount Everest is there!'
  },
  {
    q: 'Which continent is south of Europe, north of Antarctica?',
    choices: ['South America', 'Asia', 'Africa', 'Australia'],
    answer: 2,
    emoji: '🌍',
    fact: 'Africa sits south of Europe (separated by the Mediterranean Sea) and north of Antarctica.'
  },
  {
    q: 'The Great Barrier Reef is near which continent?',
    choices: ['South America', 'Asia', 'Africa', 'Australia'],
    answer: 3,
    emoji: '🐠',
    fact: "The Great Barrier Reef is off the northeast coast of Australia — the world's largest coral reef system!"
  },
  {
    q: 'North America and South America are connected by which narrow land?',
    choices: ['Suez Canal', 'Strait of Gibraltar', 'Panama', 'Amazon'],
    answer: 2,
    emoji: '🌎',
    fact: 'Panama (Central America) connects North and South America. The Panama Canal cuts through it!'
  },
  {
    q: 'Which continent is sometimes called the "Dark Continent"?',
    choices: ['Antarctica', 'Australia', 'Africa', 'Asia'],
    answer: 2,
    emoji: '🌍',
    fact: 'Africa was historically called this by early European explorers. Today Africa is known for its amazing diversity!'
  },
  {
    q: 'The Andes Mountains are in which continent?',
    choices: ['North America', 'Europe', 'Asia', 'South America'],
    answer: 3,
    emoji: '🏔️',
    fact: "The Andes in South America are the world's longest mountain range, stretching 7,000 km along the west coast!"
  },
  {
    q: 'Which continent has NO permanent human population?',
    choices: ['Australia', 'Greenland', 'Antarctica', 'Iceland'],
    answer: 2,
    emoji: '🧊',
    fact: 'Antarctica has no permanent residents! Only scientists and researchers live there temporarily.'
  },
  {
    q: 'Russia is the largest country by area. Which continent(s) does it span?',
    choices: ['Asia only', 'Europe only', 'Europe and Asia', 'Asia and Africa'],
    answer: 2,
    emoji: '🇷🇺',
    fact: 'Russia spans both Europe and Asia — countries like this are called "transcontinental" countries!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🌍' : '🗺️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'World Explorer!' : pct >= 0.7 ? 'Globe Trotter!' : 'Keep Discovering!';
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

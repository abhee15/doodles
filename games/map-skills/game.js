'use strict';
const QUESTIONS = [
  {
    q: 'Which direction does the compass needle point toward?',
    choices: ['South', 'East', 'North', 'West'],
    answer: 2,
    emoji: '🧭',
    fact: 'A compass needle always points toward magnetic north! This helps navigators find their way.'
  },
  {
    q: 'On a map, north is usually at the...',
    choices: ['Bottom', 'Left', 'Right', 'Top'],
    answer: 3,
    emoji: '🗺️',
    fact: 'By convention, north is at the top of most maps. This makes it easy to compare different maps!'
  },
  {
    q: 'What do the letters N, S, E, W stand for?',
    choices: [
      'Near, South, East, Wide',
      'North, South, East, West',
      'North, Sea, East, Water',
      'Near, South, Exit, West'
    ],
    answer: 1,
    emoji: '🧭',
    fact: 'N=North, S=South, E=East, W=West — these are the four cardinal directions!'
  },
  {
    q: 'If you are facing north, east is to your...',
    choices: ['Left', 'Behind you', 'Right', 'Above you'],
    answer: 2,
    emoji: '🧭',
    fact: 'Facing north: East is right, West is left, South is behind you. Remember: Never Eat Soggy Waffles!'
  },
  {
    q: 'What does a map KEY (or legend) show?',
    choices: [
      'The map title',
      'What symbols on the map mean',
      'The date the map was made',
      'Who drew the map'
    ],
    answer: 1,
    emoji: '🗝️',
    fact: 'A map key or legend explains what symbols, colors, and lines on the map represent.'
  },
  {
    q: 'What tool shows the scale of distance on a map?',
    choices: ['Compass rose', 'Map key', 'Scale bar', 'Grid lines'],
    answer: 2,
    emoji: '📏',
    fact: 'A scale bar shows how distance on the map relates to real distance. E.g., 1 cm = 10 km!'
  },
  {
    q: 'Lines of latitude run which way on a globe?',
    choices: [
      'North-south (up-down)',
      'East-west (horizontal)',
      'Diagonally',
      'In circles around poles'
    ],
    answer: 1,
    emoji: '🌐',
    fact: 'Latitude lines run east-west (horizontally). They measure how far north or south of the equator you are!'
  },
  {
    q: 'The equator divides Earth into which two halves?',
    choices: [
      'East and West',
      'Left and Right',
      'Northern and Southern hemisphere',
      'Top and Bottom countries'
    ],
    answer: 2,
    emoji: '🌍',
    fact: 'The equator (0° latitude) divides Earth into the Northern and Southern hemispheres.'
  },
  {
    q: 'Which direction does the sun rise?',
    choices: ['West', 'North', 'South', 'East'],
    answer: 3,
    emoji: '🌅',
    fact: 'The sun rises in the East and sets in the West — this is how people navigated before compasses!'
  },
  {
    q: 'If north is at the top of a map, where is south?',
    choices: ['Left', 'Right', 'Top', 'Bottom'],
    answer: 3,
    emoji: '🗺️',
    fact: 'South is opposite north — at the bottom of a standard map. Antarctica is at the south pole!'
  },
  {
    q: 'What is a compass rose?',
    choices: [
      'A type of flower',
      'A diagram showing directions on a map',
      'A special type of map',
      'The scale on a map'
    ],
    answer: 1,
    emoji: '🌹',
    fact: 'A compass rose is the star-shaped diagram on maps that shows north, south, east, and west directions!'
  },
  {
    q: 'Northeast is exactly between which two directions?',
    choices: ['North and West', 'South and East', 'North and East', 'South and West'],
    answer: 2,
    emoji: '🧭',
    fact: 'Northeast (NE) is exactly between North and East. NW, SE, SW are the other intermediate directions!'
  },
  {
    q: 'What do contour lines on a map show?',
    choices: ['Roads', 'Rivers', 'Elevation (height of land)', 'Country borders'],
    answer: 2,
    emoji: '⛰️',
    fact: 'Contour lines connect points of equal elevation. Closely spaced lines = steep hill; wide apart = gentle slope!'
  },
  {
    q: 'The Prime Meridian is at which degree of longitude?',
    choices: ['90°', '45°', '180°', '0°'],
    answer: 3,
    emoji: '🌐',
    fact: 'The Prime Meridian is at 0° longitude, running through Greenwich, England. It divides East and West!'
  },
  {
    q: 'Which type of map shows natural features like mountains and rivers?',
    choices: ['Political map', 'Physical map', 'Road map', 'Weather map'],
    answer: 1,
    emoji: '🗺️',
    fact: 'Physical maps show landforms — mountains, valleys, rivers, plains. Political maps show borders and cities!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🧭' : '🗺️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Master Navigator!' : pct >= 0.7 ? 'Map Expert!' : 'Keep Exploring!';
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

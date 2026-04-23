'use strict';

const QUESTIONS = [
  {
    q: 'What type of cloud brings heavy rain and thunderstorms?',
    choices: ['Cirrus', 'Cumulonimbus', 'Stratus', 'Cumulus'],
    answer: 1,
    emoji: '⛈️',
    fact: 'Cumulonimbus clouds are the tallest clouds — they can reach 12 km high and bring lightning!'
  },
  {
    q: 'What tool is used to measure air temperature?',
    choices: ['Barometer', 'Anemometer', 'Thermometer', 'Rain gauge'],
    answer: 2,
    emoji: '🌡️',
    fact: 'A thermometer measures temperature. Mercury or alcohol expands when heated!'
  },
  {
    q: 'What tool measures wind speed?',
    choices: ['Thermometer', 'Barometer', 'Rain gauge', 'Anemometer'],
    answer: 3,
    emoji: '💨',
    fact: 'An anemometer has spinning cups — faster spinning means faster wind!'
  },
  {
    q: 'What causes thunder during a storm?',
    choices: [
      'Raindrops hitting the ground',
      'Lightning heating air rapidly',
      'Wind hitting clouds',
      'Clouds bumping together'
    ],
    answer: 1,
    emoji: '⚡',
    fact: "Lightning superheats air so fast it expands, creating a shockwave — that's thunder!"
  },
  {
    q: 'What is the water cycle process where water turns to vapor?',
    choices: ['Condensation', 'Precipitation', 'Evaporation', 'Runoff'],
    answer: 2,
    emoji: '☀️',
    fact: 'Evaporation: heat turns liquid water into invisible water vapor that rises into the air.'
  },
  {
    q: 'Which type of precipitation forms when rain freezes before hitting the ground?',
    choices: ['Snow', 'Hail', 'Sleet', 'Frost'],
    answer: 2,
    emoji: '🌨️',
    fact: 'Sleet forms when rain passes through a cold air layer and freezes into ice pellets.'
  },
  {
    q: 'What is the unit used to measure wind speed?',
    choices: ['Metres', 'Degrees', 'Knots or km/h', 'Pascals'],
    answer: 2,
    emoji: '🌬️',
    fact: 'Wind speed is measured in km/h or knots. Sailors use knots on ships!'
  },
  {
    q: 'A rainbow appears when...',
    choices: [
      'It is very cold',
      'Sunlight passes through water droplets',
      'There is fog',
      'Clouds are low'
    ],
    answer: 1,
    emoji: '🌈',
    fact: 'White sunlight splits into 7 colors (ROYGBIV) when it passes through raindrops!'
  },
  {
    q: 'What is a tornado?',
    choices: ['A massive ocean wave', 'A rotating column of air', 'Heavy rainfall', 'A snowstorm'],
    answer: 1,
    emoji: '🌪️',
    fact: 'Tornadoes are violently rotating columns of air that touch the ground from a thunderstorm.'
  },
  {
    q: 'What does "humidity" measure?',
    choices: ['Wind direction', 'Air pressure', 'Amount of water vapor in air', 'Rainfall amount'],
    answer: 2,
    emoji: '💧',
    fact: 'High humidity means lots of water vapor in the air — it feels muggy and sticky!'
  },
  {
    q: 'What is the name for a scientist who studies weather?',
    choices: ['Geologist', 'Meteorologist', 'Biologist', 'Astronomer'],
    answer: 1,
    emoji: '🔬',
    fact: 'Meteorologists study and forecast weather. They use radar, satellites, and weather balloons!'
  },
  {
    q: 'What causes the wind to blow?',
    choices: [
      'The Earth spinning',
      'Differences in air pressure',
      'Ocean currents',
      "The moon's gravity"
    ],
    answer: 1,
    emoji: '🌀',
    fact: 'Air moves from high pressure areas to low pressure areas — that movement is wind!'
  },
  {
    q: 'Wispy, feather-like clouds high in the sky are called...',
    choices: ['Cumulus', 'Stratus', 'Cirrus', 'Nimbus'],
    answer: 2,
    emoji: '☁️',
    fact: 'Cirrus clouds are made of ice crystals and form at very high altitudes (above 6 km).'
  },
  {
    q: 'What instrument measures air pressure?',
    choices: ['Thermometer', 'Barometer', 'Hygrometer', 'Anemometer'],
    answer: 1,
    emoji: '📊',
    fact: 'A barometer measures atmospheric pressure. Falling pressure often means bad weather coming!'
  },
  {
    q: 'How does snow form?',
    choices: [
      'Freezing rain',
      'Ice crystals forming around dust in clouds',
      'Hail breaking apart',
      'Cold ocean spray'
    ],
    answer: 1,
    emoji: '❄️',
    fact: 'Snow starts as ice crystals in clouds that stick together into snowflakes as they fall.'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🌤️' : '⛅';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Storm Chaser!' : pct >= 0.7 ? 'Weather Watcher!' : 'Keep Studying!';
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

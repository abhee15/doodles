'use strict';
const QUESTIONS = [
  {
    q: 'How many centimeters are in 1 meter?',
    choices: ['10', '100', '1000', '50'],
    answer: 1,
    emoji: '📏',
    fact: '1 meter = 100 centimeters. A meter is about the height of a door handle from the floor!'
  },
  {
    q: 'How many millimeters are in 1 centimeter?',
    choices: ['10', '100', '1000', '5'],
    answer: 0,
    emoji: '📏',
    fact: '1 cm = 10 mm. Millimeters are tiny — about the thickness of a credit card is 1 mm!'
  },
  {
    q: 'How many grams are in 1 kilogram?',
    choices: ['10', '100', '1000', '500'],
    answer: 2,
    emoji: '⚖️',
    fact: '1 kg = 1000 g. A small bag of sugar is about 1 kilogram!'
  },
  {
    q: 'How many minutes are in 1 hour?',
    choices: ['50', '60', '100', '24'],
    answer: 1,
    emoji: '⏰',
    fact: '1 hour = 60 minutes. There are also 60 seconds in 1 minute!'
  },
  {
    q: 'How many seconds are in 1 minute?',
    choices: ['10', '100', '60', '30'],
    answer: 2,
    emoji: '⏱️',
    fact: '1 minute = 60 seconds. The word "second" comes from the second division of the hour!'
  },
  {
    q: 'How many hours are in 1 day?',
    choices: ['12', '24', '48', '60'],
    answer: 1,
    emoji: '🌍',
    fact: '1 day = 24 hours. It takes 24 hours for Earth to complete one full rotation!'
  },
  {
    q: 'How many days are in a week?',
    choices: ['5', '6', '7', '8'],
    answer: 2,
    emoji: '📅',
    fact: 'There are 7 days in a week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.'
  },
  {
    q: 'How many months are in a year?',
    choices: ['10', '11', '12', '13'],
    answer: 2,
    emoji: '📆',
    fact: 'There are 12 months in a year. The months have 28–31 days each.'
  },
  {
    q: 'A book weighs 500 grams. How many kilograms is that?',
    choices: ['0.05 kg', '0.5 kg', '5 kg', '50 kg'],
    answer: 1,
    emoji: '📚',
    fact: '500 g ÷ 1000 = 0.5 kg. Half a kilogram! Dividing by 1000 converts grams to kilograms.'
  },
  {
    q: 'A room is 3 meters wide. How many centimeters is that?',
    choices: ['30 cm', '300 cm', '3000 cm', '30000 cm'],
    answer: 1,
    emoji: '🏠',
    fact: '3 m × 100 = 300 cm. Multiply by 100 to convert meters to centimeters!'
  },
  {
    q: 'How many centimeters are in half a meter?',
    choices: ['5 cm', '20 cm', '50 cm', '500 cm'],
    answer: 2,
    emoji: '📐',
    fact: 'Half of 100 cm = 50 cm. Half a meter is 50 centimeters.'
  },
  {
    q: 'Which is longer: 1 meter or 90 centimeters?',
    choices: ['90 centimeters', '1 meter', 'They are equal', 'Cannot compare'],
    answer: 1,
    emoji: '📏',
    fact: '1 meter = 100 cm, which is longer than 90 cm. Always convert to the same unit to compare!'
  },
  {
    q: 'How many years are in 1 decade?',
    choices: ['5', '10', '100', '1000'],
    answer: 1,
    emoji: '📅',
    fact: '1 decade = 10 years. A century is 100 years, and a millennium is 1000 years!'
  },
  {
    q: 'A pencil is 15 cm long. How many mm is that?',
    choices: ['1.5 mm', '15 mm', '150 mm', '1500 mm'],
    answer: 2,
    emoji: '✏️',
    fact: '15 cm × 10 = 150 mm. Multiply by 10 to convert centimeters to millimeters!'
  },
  {
    q: 'Which unit would you use to measure the weight of an elephant?',
    choices: ['Grams', 'Milligrams', 'Kilograms', 'Centimeters'],
    answer: 2,
    emoji: '🐘',
    fact: 'Kilograms (or tonnes) for elephants! An African elephant weighs about 6,000 kilograms.'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '📏' : '⚖️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Measurement Master!' : pct >= 0.7 ? 'Great Measuring!' : 'Keep Measuring!';
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

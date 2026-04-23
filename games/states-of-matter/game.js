'use strict';

// ── QUIZ DATA ─────────────────────────────────────────────────────────────────

const QUESTIONS = [
  // Identify state
  {
    q: 'What state of matter is ice?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 0,
    emoji: '🧊',
    fact: 'Ice is water frozen solid at 0°C or below!'
  },
  {
    q: 'What state of matter is water in a glass?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 1,
    emoji: '💧',
    fact: 'Liquid water flows and takes the shape of its container.'
  },
  {
    q: 'What state of matter is steam from a kettle?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 2,
    emoji: '♨️',
    fact: 'Steam is water vapor — water in its gas state above 100°C.'
  },
  {
    q: 'What state of matter is a wooden chair?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 0,
    emoji: '🪑',
    fact: 'Wood is a solid — it has a fixed shape and volume.'
  },
  {
    q: 'What state of matter is the air we breathe?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 2,
    emoji: '💨',
    fact: 'Air is a mixture of gases — mostly nitrogen and oxygen.'
  },
  {
    q: 'What state of matter is honey?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 1,
    emoji: '🍯',
    fact: 'Honey is a thick liquid — it flows slowly but still flows!'
  },
  {
    q: 'What state of matter is a rock?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 0,
    emoji: '🪨',
    fact: "Rocks are solids with a fixed shape and don't flow."
  },
  {
    q: 'What state of matter is lava?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 1,
    emoji: '🌋',
    fact: 'Lava is molten rock — rock heated so hot it becomes liquid!'
  },
  {
    q: 'What state of matter is helium in a balloon?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 2,
    emoji: '🎈',
    fact: 'Helium is a lighter-than-air gas, so it makes balloons float.'
  },
  {
    q: 'What state of matter is milk?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 1,
    emoji: '🥛',
    fact: 'Milk is a liquid — it pours and takes the shape of its container.'
  },
  // Phase changes
  {
    q: 'What happens when ice is heated?',
    choices: ['It melts into liquid', 'It turns to gas', 'It stays solid'],
    answer: 0,
    emoji: '🧊➡️💧',
    fact: 'Melting: solid → liquid. Ice melts at 0°C into water.'
  },
  {
    q: 'What is it called when water turns into steam?',
    choices: ['Freezing', 'Condensation', 'Evaporation'],
    answer: 2,
    emoji: '💧➡️♨️',
    fact: 'Evaporation: liquid → gas. Water boils at 100°C into steam.'
  },
  {
    q: 'What is it called when steam turns back into water?',
    choices: ['Melting', 'Condensation', 'Freezing'],
    answer: 1,
    emoji: '♨️➡️💧',
    fact: 'Condensation: gas → liquid. You see this on a cold glass!'
  },
  {
    q: 'What is it called when water freezes into ice?',
    choices: ['Melting', 'Evaporation', 'Freezing'],
    answer: 2,
    emoji: '💧➡️🧊',
    fact: 'Freezing: liquid → solid. Water freezes at 0°C.'
  },
  {
    q: 'Which state of matter has NO fixed shape AND NO fixed volume?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 2,
    emoji: '❓',
    fact: 'Gas expands to fill any container — no fixed shape or volume.'
  },
  {
    q: 'Which state of matter has a fixed shape?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 0,
    emoji: '🟥',
    fact: 'Solids keep their shape. The particles are tightly packed.'
  },
  {
    q: 'Which state of matter flows but has a fixed volume?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 1,
    emoji: '💧',
    fact: 'Liquids flow and change shape, but their volume stays the same.'
  },
  {
    q: 'What happens when chocolate is heated?',
    choices: ['It melts', 'It evaporates', 'It freezes'],
    answer: 0,
    emoji: '🍫',
    fact: 'Chocolate is a solid that melts into a liquid when warmed.'
  },
  {
    q: 'What state of matter are the particles MOST spread out?',
    choices: ['Solid', 'Liquid', 'Gas'],
    answer: 2,
    emoji: '🔵',
    fact: 'Gas particles are far apart and move freely and quickly.'
  },
  {
    q: 'When water vapor in clouds becomes rain drops, this is...',
    choices: ['Evaporation', 'Condensation', 'Freezing'],
    answer: 1,
    emoji: '🌧️',
    fact: 'Condensation is how clouds form water droplets that become rain.'
  }
];

const TOTAL_ROUNDS = 10;

const state = {
  score: 0,
  round: 0,
  usedIdx: new Set(),
  current: null,
  answered: false
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function pickQuestion() {
  const available = QUESTIONS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.usedIdx.has(i);
  });
  if (available.length === 0) {
    state.usedIdx.clear();
    return pickQuestion();
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  state.usedIdx.add(idx);
  return QUESTIONS[idx];
}

function startRound() {
  state.current = pickQuestion();
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
  state.current.choices.forEach(function (choice, i) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
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

  const factBox = document.getElementById('fact-box');
  factBox.textContent = `💡 ${state.current.fact}`;
  factBox.style.display = 'block';

  if (idx === state.current.answer) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    showFeedback('✅ Correct!', 'good');
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(nextOrResult, 1500);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    showFeedback('❌ Not quite!', 'bad');
    setTimeout(nextOrResult, 2000);
  }
}

function nextOrResult() {
  if (state.round >= TOTAL_ROUNDS) {
    showResult();
  } else {
    startRound();
  }
}

function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = `feedback${type ? ` ${type}` : ''}`;
}

function showResult() {
  const pct = state.score / TOTAL_ROUNDS;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '🔬';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Science Genius!' : pct >= 0.7 ? 'Great Science!' : 'Keep Experimenting!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL_ROUNDS} correct`;
  showScreen('screen-result');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-start').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.usedIdx.clear();
    startRound();
  });

  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });
  document.getElementById('btn-play-again').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.usedIdx.clear();
    startRound();
  });
});

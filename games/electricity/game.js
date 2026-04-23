'use strict';
const QUESTIONS = [
  {
    q: 'What does an electric circuit NEED to work?',
    choices: ['An open gap', 'A complete closed loop', 'Only a battery', 'Only a wire'],
    answer: 1,
    emoji: '⚡',
    fact: 'A circuit must be a COMPLETE loop! Electricity flows from the battery, through the wires and components, and back to the battery.'
  },
  {
    q: 'What is a CONDUCTOR?',
    choices: [
      'A material that blocks electricity',
      'A person who drives trains',
      'A material that lets electricity flow through it',
      'A type of battery'
    ],
    answer: 2,
    emoji: '🔌',
    fact: 'Conductors let electricity flow freely. Copper, aluminum, gold, and water are all good conductors!'
  },
  {
    q: 'Which material is the BEST conductor of electricity?',
    choices: ['Rubber', 'Wood', 'Copper (metal)', 'Plastic'],
    answer: 2,
    emoji: '🔌',
    fact: "Metals (especially copper) are excellent conductors! That's why electrical wires are made from copper inside."
  },
  {
    q: 'What is an INSULATOR?',
    choices: [
      'A material that conducts electricity well',
      'A type of circuit',
      'A material that BLOCKS electricity flow',
      'A kind of battery'
    ],
    answer: 2,
    emoji: '🛡️',
    fact: "Insulators prevent electricity from flowing. Rubber, plastic, wood, and glass are insulators — that's why wire coatings are rubber!"
  },
  {
    q: 'What does a SWITCH do in a circuit?',
    choices: [
      'Powers the circuit',
      'Opens or closes the circuit',
      'Makes bulbs brighter',
      'Stores electricity'
    ],
    answer: 1,
    emoji: '🔦',
    fact: 'A switch OPENS the circuit (breaks the loop) to turn things OFF, or CLOSES it (completes the loop) to turn things ON!'
  },
  {
    q: 'In a SERIES circuit, if one light bulb breaks, what happens?',
    choices: [
      'Only that bulb goes out',
      'The other bulbs get brighter',
      'ALL the bulbs go out',
      'Nothing changes'
    ],
    answer: 2,
    emoji: '💡',
    fact: 'In series, all bulbs share ONE path. Break any part and ALL the lights go out — like old Christmas tree lights!'
  },
  {
    q: 'In a PARALLEL circuit, if one light bulb breaks, what happens?',
    choices: [
      'All bulbs go out',
      'The other bulbs go out too',
      'The other bulbs STAY ON',
      'Nothing can work anymore'
    ],
    answer: 2,
    emoji: '💡',
    fact: 'In parallel, each bulb has its OWN path! If one breaks, the others still work — like the circuits in your home.'
  },
  {
    q: 'A BATTERY provides circuits with...',
    choices: ['Water', 'Electrical energy (voltage)', 'Sound', 'Heat only'],
    answer: 1,
    emoji: '🔋',
    fact: 'Batteries convert stored chemical energy into electrical energy (voltage). They push electrons around the circuit!'
  },
  {
    q: 'Static electricity is caused by a build-up of...',
    choices: ['Water', 'Sound', 'Magnetic fields', 'Electric charge'],
    answer: 3,
    emoji: '⚡',
    fact: 'Static electricity builds up when objects gain or lose electrons (e.g., rubbing a balloon on hair). When charge discharges, you get a spark!'
  },
  {
    q: 'Lightning is a form of...',
    choices: ['Sound energy', 'Static electricity discharge', 'Magnetic energy', 'Nuclear energy'],
    answer: 1,
    emoji: '🌩️',
    fact: 'Lightning is HUGE static electricity! Charges build up in clouds and discharge to the ground in a flash of ~300 million volts!'
  },
  {
    q: 'Which of these is NOT a good conductor?',
    choices: ['Copper', 'Aluminum', 'Rubber', 'Iron'],
    answer: 2,
    emoji: '🛡️',
    fact: "Rubber is an insulator — it blocks electricity. That's why rubber gloves protect electricians and rubber coats wires!"
  },
  {
    q: 'What unit measures electrical POWER?',
    choices: ['Volts', 'Amps', 'Watts', 'Ohms'],
    answer: 2,
    emoji: '📊',
    fact: 'Power is measured in WATTS. A 60W light bulb uses 60 watts. Volts measure pressure, Amps measure current flow!'
  },
  {
    q: 'Who proved lightning is electricity using a kite?',
    choices: ['Thomas Edison', 'Nikola Tesla', 'Benjamin Franklin', 'Albert Einstein'],
    answer: 2,
    emoji: '🪁',
    fact: "Benjamin Franklin's 1752 kite experiment proved lightning is electricity. He then invented the lightning rod to protect buildings!"
  },
  {
    q: 'What does a RESISTOR do in a circuit?',
    choices: [
      'Stores electricity',
      'Generates electricity',
      'Reduces the flow of electricity',
      'Amplifies electricity'
    ],
    answer: 2,
    emoji: '🔧',
    fact: 'Resistors resist (limit) electrical flow, protecting other components. The resistance is measured in OHMS (Ω)!'
  },
  {
    q: 'What converts electrical energy into LIGHT in most modern devices?',
    choices: ['Resistor', 'LED (Light-Emitting Diode)', 'Capacitor', 'Transistor'],
    answer: 1,
    emoji: '💡',
    fact: 'LEDs (Light-Emitting Diodes) convert electricity to light very efficiently. They use 90% less energy than old incandescent bulbs!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '⚡' : '🔋';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Electrical Engineer!' : pct >= 0.7 ? 'Circuit Expert!' : 'Keep Exploring!';
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

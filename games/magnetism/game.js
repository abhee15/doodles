'use strict';
const QUESTIONS = [
  {
    q: 'Every magnet has two ends called...',
    choices: [
      'Tops and bottoms',
      'Positive and negative charges',
      'North and South poles',
      'Left and right ends'
    ],
    answer: 2,
    emoji: '🧲',
    fact: 'Every magnet has a NORTH pole and a SOUTH pole! These poles are where the magnetic force is strongest.'
  },
  {
    q: 'When the NORTH pole of one magnet faces the SOUTH pole of another, they...',
    choices: ['Repel each other', 'Attract each other', 'Do nothing', 'Explode'],
    answer: 1,
    emoji: '🧲',
    fact: 'OPPOSITES ATTRACT! North + South → attract. Just like in friendships — differences can bring people together!'
  },
  {
    q: 'When the NORTH pole of one magnet faces the NORTH pole of another, they...',
    choices: ['Attract each other', 'Do nothing', 'Repel (push apart)', 'Combine'],
    answer: 2,
    emoji: '↔️',
    fact: 'LIKE POLES REPEL! N–N or S–S push each other away. You can feel this force if you try to push two magnets together!'
  },
  {
    q: 'Which material is attracted to magnets?',
    choices: ['Plastic', 'Wood', 'Glass', 'Iron'],
    answer: 3,
    emoji: '🔩',
    fact: 'Iron (and steel, nickel, cobalt) are attracted to magnets — they are MAGNETIC materials. Plastic and wood are not!'
  },
  {
    q: 'What is a MAGNETIC FIELD?',
    choices: [
      'A farm that grows magnets',
      'The invisible area of force around a magnet',
      'The metal inside a magnet',
      'The color of a magnet'
    ],
    answer: 1,
    emoji: '🌀',
    fact: 'A magnetic field is the INVISIBLE FORCE surrounding a magnet. Field lines flow from N to S and show where the force acts!'
  },
  {
    q: 'A compass needle always points...',
    choices: ['South', 'East', "North (toward Earth's magnetic north)", 'Toward the nearest metal'],
    answer: 2,
    emoji: '🧭',
    fact: "A compass is a tiny magnet! Earth's magnetic north pole attracts the compass needle's south pole, making it point north!"
  },
  {
    q: 'Which of these is NOT attracted to a magnet?',
    choices: ['Steel paper clip', 'Iron nail', 'Copper coin', 'Nickel (the metal)'],
    answer: 2,
    emoji: '🪙',
    fact: "COPPER is not magnetic — it's a non-magnetic metal. Only iron, nickel, cobalt, and steel respond to magnets!"
  },
  {
    q: 'Earth itself acts like a giant magnet because of its...',
    choices: [
      'Iron and nickel liquid outer core',
      'Water in the oceans',
      'Oxygen in the atmosphere',
      'Rocky crust'
    ],
    answer: 0,
    emoji: '🌍',
    fact: "Earth's molten iron-nickel outer core creates our planet's magnetic field — protecting us from harmful solar winds!"
  },
  {
    q: 'An ELECTROMAGNET is different from a regular magnet because...',
    choices: [
      'It only works underground',
      'Its magnetic force can be turned ON and OFF using electricity',
      "It's made of plastic",
      'It only attracts gold'
    ],
    answer: 1,
    emoji: '⚡',
    fact: 'Electromagnets use electric current to create a magnetic field! Turn off the current → no magnetism. Used in cranes and MRI machines!'
  },
  {
    q: 'Where is the magnetic force STRONGEST on a bar magnet?',
    choices: [
      'In the middle',
      'At the poles (ends)',
      'All over equally',
      'Nowhere — it has no force'
    ],
    answer: 1,
    emoji: '📊',
    fact: 'Magnetic force is STRONGEST at the poles! Field lines are closest together at the ends, showing the strongest force!'
  },
  {
    q: 'Can you cut a magnet in half to separate the North and South poles?',
    choices: [
      'Yes — you get one N magnet and one S magnet',
      'No — each half becomes a complete magnet with both poles',
      'Yes — one half stops being magnetic',
      'No — the magnet is destroyed'
    ],
    answer: 1,
    emoji: '✂️',
    fact: 'AMAZING FACT: cut a magnet in half → TWO magnets, each with N and S poles! You can never isolate a single pole!'
  },
  {
    q: 'Which of these uses electromagnets?',
    choices: ['A wooden ruler', 'An electric motor', 'A glass window', 'A plastic bag'],
    answer: 1,
    emoji: '⚙️',
    fact: 'Electric MOTORS use electromagnets to spin! Fans, washing machines, and electric cars all run on electromagnetic motors!'
  },
  {
    q: 'What happens if you heat a magnet to a very high temperature?',
    choices: [
      'It becomes stronger',
      'It loses its magnetism',
      'It changes color permanently',
      'It doubles in size'
    ],
    answer: 1,
    emoji: '🔥',
    fact: 'High heat scrambles the aligned magnetic domains inside a magnet, making it lose its magnetic properties!'
  },
  {
    q: 'Magnetic poles are named North and South because...',
    choices: [
      'Their colors are blue and red',
      'One points toward North Pole, one toward South Pole',
      'North poles are stronger than South poles',
      'The names were chosen randomly'
    ],
    answer: 1,
    emoji: '🌐',
    fact: 'Early navigators named poles by where they POINTED on Earth! The compass end pointing north is called the North-seeking pole!'
  },
  {
    q: 'Which device uses a magnet to store data?',
    choices: ['Calculator', 'Hard disk drive', 'Light bulb', 'Battery'],
    answer: 1,
    emoji: '💽',
    fact: 'Hard disk drives store data by magnetizing tiny areas on a spinning disk! Each tiny region = 0 or 1 in binary data!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🧲' : '🌀';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Magnet Master!' : pct >= 0.7 ? 'Magnetic Mind!' : 'Keep Exploring!';
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

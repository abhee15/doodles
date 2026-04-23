'use strict';
const QUESTIONS = [
  {
    q: 'The ancient Egyptians built huge triangular structures as tombs for their kings. What are they called?',
    choices: ['Temples', 'Ziggurats', 'Pyramids', 'Coliseums'],
    answer: 2,
    emoji: '🏛️',
    fact: 'The Great Pyramid of Giza was built around 2560 BCE and is one of the Seven Wonders of the Ancient World!'
  },
  {
    q: 'Who were the rulers of ancient Egypt called?',
    choices: ['Emperors', 'Pharaohs', 'Sultans', 'Pharisees'],
    answer: 1,
    emoji: '👑',
    fact: 'Pharaohs were believed to be gods on Earth! Famous pharaohs include Cleopatra, Ramesses II, and Tutankhamun.'
  },
  {
    q: 'Ancient Romans built a famous oval arena where gladiators fought. What is it called?',
    choices: ['The Parthenon', 'The Forum', 'The Colosseum', 'The Pantheon'],
    answer: 2,
    emoji: '🏟️',
    fact: 'The Colosseum in Rome could hold 50,000-80,000 people! It was built around 70-80 CE.'
  },
  {
    q: 'Ancient Greeks invented which of the following?',
    choices: ['Paper', 'Democracy', 'Gunpowder', 'Printing press'],
    answer: 1,
    emoji: '🏛️',
    fact: 'Ancient Athens (Greece) invented democracy — where citizens vote on decisions. The word comes from Greek!'
  },
  {
    q: 'The ancient civilization that built the Great Wall was...',
    choices: ['Egypt', 'Greece', 'China', 'Rome'],
    answer: 2,
    emoji: '🧱',
    fact: 'China built the Great Wall over many centuries to protect against invasions. It stretches thousands of miles!'
  },
  {
    q: 'The Maya civilization was located in...',
    choices: ['Africa', 'Asia', 'Central America', 'Europe'],
    answer: 2,
    emoji: '🌿',
    fact: 'The Maya built amazing cities in Central America (Mexico, Guatemala). They invented a complex calendar!'
  },
  {
    q: 'Ancient Egyptians used a picture-writing system called...',
    choices: ['Cuneiform', 'Hieroglyphics', 'Sanskrit', 'Latin'],
    answer: 1,
    emoji: '📜',
    fact: 'Hieroglyphics used hundreds of picture symbols. The Rosetta Stone helped us decode it in 1822!'
  },
  {
    q: 'Julius Caesar was a famous leader of which ancient civilization?',
    choices: ['Greece', 'Egypt', 'China', 'Rome'],
    answer: 3,
    emoji: '⚔️',
    fact: "Julius Caesar was a Roman general and leader who expanded Rome's empire greatly around 50 BCE."
  },
  {
    q: 'The ancient Olympics were first held in which country?',
    choices: ['Italy', 'Greece', 'Egypt', 'China'],
    answer: 1,
    emoji: '🏅',
    fact: 'The ancient Olympics began in Greece in 776 BCE at Olympia. Only men could compete or watch!'
  },
  {
    q: 'Which ancient wonder was a giant statue at the entrance of a harbor in Greece?',
    choices: ['Sphinx', 'Colosseum', 'Colossus of Rhodes', 'Great Wall'],
    answer: 2,
    emoji: '🗽',
    fact: 'The Colossus of Rhodes was a 33-meter statue — one of the 7 Wonders. It stood for only 54 years before an earthquake!'
  },
  {
    q: 'Mesopotamia (one of the first civilizations) was located between which two rivers?',
    choices: ['Nile and Congo', 'Amazon and Orinoco', 'Tigris and Euphrates', 'Ganges and Indus'],
    answer: 2,
    emoji: '🌊',
    fact: 'Mesopotamia (modern-day Iraq) means "land between rivers." The Tigris and Euphrates rivers supported farming!'
  },
  {
    q: 'The ancient Romans spoke which language that influenced many modern languages?',
    choices: ['Greek', 'Latin', 'Egyptian', 'Sanskrit'],
    answer: 1,
    emoji: '🗣️',
    fact: 'Romans spoke Latin. It gave us Spanish, French, Italian, Portuguese, and many English words!'
  },
  {
    q: 'What did the Maya use to track time very accurately?',
    choices: ['Sundials', 'Hour glasses', 'A complex calendar system', 'Water clocks'],
    answer: 2,
    emoji: '📅',
    fact: 'The Maya had THREE calendar systems including a 365-day solar calendar and a 260-day ritual calendar!'
  },
  {
    q: "Alexander the Great created one of history's largest empires. He was from...",
    choices: ['Rome', 'Egypt', 'Greece', 'Persia'],
    answer: 2,
    emoji: '👑',
    fact: 'Alexander the Great of Macedonia (Greece) conquered from Greece to India between 356-323 BCE!'
  },
  {
    q: 'Ancient Chinese writing was done using which tool?',
    choices: ['Quill pens', 'Stone chisels', 'Brushes and ink', 'Metal stylus'],
    answer: 2,
    emoji: '🖌️',
    fact: 'Chinese calligraphy uses brushes and ink. China also invented paper and printing around 100-700 CE!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🏛️' : '📜';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'History Legend!' : pct >= 0.7 ? 'Time Traveler!' : 'Keep Exploring!';
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

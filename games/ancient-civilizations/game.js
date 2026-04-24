'use strict';
const QUESTIONS = [
  {
    q: "Ancient Egypt's pyramids were built as...",
    choices: [
      'Warehouses for grain',
      'Tombs for pharaohs',
      'Temples for worship only',
      'Military forts'
    ],
    answer: 1,
    emoji: '🔺',
    civ: 'egypt',
    civLabel: '🏜️ Ancient Egypt',
    fact: 'Egyptian PYRAMIDS were royal tombs! The Great Pyramid of Giza (built ~2560 BC) is one of the Seven Wonders of the Ancient World!'
  },
  {
    q: 'Who was the ruler of Ancient Egypt called?',
    choices: ['Emperor', 'Pharaoh', 'King', 'Sultan'],
    answer: 1,
    emoji: '👑',
    civ: 'egypt',
    civLabel: '🏜️ Ancient Egypt',
    fact: "PHARAOH — considered a living god! Pharaohs like Ramesses II and Cleopatra ruled one of history's longest lasting civilizations (3,000+ years)!"
  },
  {
    q: 'Ancient Egyptians developed one of the earliest forms of writing called...',
    choices: ['Cuneiform', 'Alphabet', 'Hieroglyphics', 'Runes'],
    answer: 2,
    emoji: '📜',
    civ: 'egypt',
    civLabel: '🏜️ Ancient Egypt',
    fact: 'HIEROGLYPHICS — picture-symbols representing sounds and words. The Rosetta Stone (1799) helped decode them after 1,400 years!'
  },
  {
    q: 'Ancient Greece is credited with inventing...',
    choices: ['The wheel', 'Democracy — government by the people', 'Paper', 'Gunpowder'],
    answer: 1,
    emoji: '🏛️',
    civ: 'greece',
    civLabel: '🇬🇷 Ancient Greece',
    fact: 'DEMOCRACY was born in Athens (~508 BC)! "Demos" = people, "kratos" = power. Citizens voted on laws directly!'
  },
  {
    q: 'The ancient Greeks held the OLYMPIC GAMES to honor which god?',
    choices: ['Ares', 'Poseidon', 'Zeus', 'Apollo'],
    answer: 2,
    emoji: '🏅',
    civ: 'greece',
    civLabel: '🇬🇷 Ancient Greece',
    fact: 'The Olympics honored ZEUS (king of the gods)! First held in 776 BC in Olympia, Greece — running, wrestling, and chariot racing!'
  },
  {
    q: 'Ancient Rome was originally a...',
    choices: [
      'Democracy with voting citizens',
      'Republic ruled by two elected consuls',
      'Kingdom ruled by one king',
      'Tribal confederation'
    ],
    answer: 1,
    emoji: '🦅',
    civ: 'rome',
    civLabel: '🏛️ Ancient Rome',
    fact: "Rome started as a REPUBLIC (509 BC) with elected leaders called consuls. Julius Caesar's assassination led to the Roman Empire!"
  },
  {
    q: 'The Romans built AQUEDUCTS for...',
    choices: [
      'Military training',
      'Transporting soldiers',
      'Bringing fresh water to cities',
      'Storing weapons'
    ],
    answer: 2,
    emoji: '💧',
    civ: 'rome',
    civLabel: '🏛️ Ancient Rome',
    fact: 'AQUEDUCTS — engineering masterpieces! Romans built 800+ km of aqueducts to bring clean water to Rome. Some still stand today!'
  },
  {
    q: 'Gladiators in Rome fought in arenas called...',
    choices: ['Colosseum (amphitheaters)', 'Temples', 'Forums', 'Baths'],
    answer: 0,
    emoji: '⚔️',
    civ: 'rome',
    civLabel: '🏛️ Ancient Rome',
    fact: 'The COLOSSEUM (finished 80 AD) held 50,000+ spectators! Gladiators, animal hunts, and mock battles entertained Roman crowds!'
  },
  {
    q: 'MESOPOTAMIA (modern Iraq) is called the "Cradle of Civilization" because...',
    choices: [
      'It had the best soil',
      'It was where the first cities, writing, and laws developed',
      'It had the largest army',
      'It was the birthplace of democracy'
    ],
    answer: 1,
    emoji: '🌾',
    civ: 'meso',
    civLabel: '🌊 Mesopotamia',
    fact: 'Mesopotamia (between the Tigris & Euphrates rivers) gave us CITIES, WRITING (cuneiform), the WHEEL, and the first LAW CODE (Hammurabi)!'
  },
  {
    q: 'The ancient Chinese invented PAPER around 105 AD. What did Europeans write on before paper?',
    choices: ['Sand', 'Parchment (animal skin) and papyrus', 'Wood only', 'Stone only'],
    answer: 1,
    emoji: '📄',
    civ: 'all',
    civLabel: '🌍 Ancient World',
    fact: 'PARCHMENT (sheep/goat skin) and PAPYRUS (Egyptian reed plant) were used before paper. Paper took centuries to reach Europe!'
  },
  {
    q: 'The philosopher Socrates lived in...',
    choices: ['Ancient Rome', 'Ancient Egypt', 'Ancient Greece', 'Ancient China'],
    answer: 2,
    emoji: '🤔',
    civ: 'greece',
    civLabel: '🇬🇷 Ancient Greece',
    fact: 'SOCRATES (470–399 BC) was a Greek philosopher who taught by asking questions. His student Plato wrote down his ideas!'
  },
  {
    q: 'The Nile River was CRUCIAL to Ancient Egypt because...',
    choices: [
      'It was used for sea travel only',
      'Annual floods left rich soil perfect for farming',
      'It provided drinking water only',
      'It separated Egypt from all enemies'
    ],
    answer: 1,
    emoji: '🌊',
    civ: 'egypt',
    civLabel: '🏜️ Ancient Egypt',
    fact: 'The Nile floods LEFT RICH SILT (soil), allowing Egypt to grow food in an otherwise desert land. Egypt = "Gift of the Nile"!'
  },
  {
    q: 'The Roman SENATE was...',
    choices: [
      'A type of weapon',
      'A group of elected representatives who advised leaders',
      'A school for gladiators',
      'A type of road'
    ],
    answer: 1,
    emoji: '🏛️',
    civ: 'rome',
    civLabel: '🏛️ Ancient Rome',
    fact: "The SENATE was Rome's governing council of ~300 senators. Their ideas influenced modern governments including the US Senate!"
  },
  {
    q: 'Which ancient civilization built the Parthenon?',
    choices: ['Romans', 'Egyptians', 'Persians', 'Greeks'],
    answer: 3,
    emoji: '🏛️',
    civ: 'greece',
    civLabel: '🇬🇷 Ancient Greece',
    fact: "The PARTHENON (447–432 BC) was built on the Acropolis in Athens to honor goddess Athena. It's a symbol of Greek civilization!"
  },
  {
    q: 'JULIUS CAESAR was famous for...',
    choices: [
      'Building the pyramids',
      'Inventing democracy',
      'Conquering Gaul and becoming the most powerful Roman before being assassinated',
      'Discovering America'
    ],
    answer: 2,
    emoji: '⚔️',
    civ: 'rome',
    civLabel: '🏛️ Ancient Rome',
    fact: 'Julius Caesar conquered Gaul (France), crossed the Rubicon, became dictator — then was stabbed by senators on the "Ides of March" (44 BC)!'
  }
];
const TOTAL = 10;
const state = { score: 0, round: 0, used: new Set(), current: null, answered: false };
const CIV_CLASSES = {
  egypt: 'civ-egypt',
  greece: 'civ-greece',
  rome: 'civ-rome',
  meso: 'civ-meso',
  all: 'civ-all'
};
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
  const tag = document.getElementById('civ-tag');
  tag.textContent = state.current.civLabel;
  tag.className = `civ-tag ${CIV_CLASSES[state.current.civ] || 'civ-all'}`;
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
    pct === 1 ? 'History Hero!' : pct >= 0.7 ? 'Ancient Scholar!' : 'Keep Exploring!';
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

'use strict';
const QUESTIONS = [
  {
    q: 'The DIGESTIVE system breaks down food. Which organ does food go to FIRST after you swallow?',
    choices: ['Stomach', 'Large intestine', 'Esophagus', 'Small intestine'],
    answer: 2,
    emoji: '🍎',
    sys: 'digest',
    fact: 'ESOPHAGUS first! After swallowing, food travels down this muscular tube (about 25cm) to the stomach. Muscles push it down!'
  },
  {
    q: 'The HEART is part of which body system?',
    choices: ['Digestive', 'Respiratory', 'Circulatory', 'Nervous'],
    answer: 2,
    emoji: '🫀',
    sys: 'cardio',
    fact: 'CIRCULATORY system! The heart pumps blood through ~100,000 km of blood vessels to deliver oxygen and nutrients!'
  },
  {
    q: 'The LUNGS are part of which system?',
    choices: ['Circulatory', 'Digestive', 'Skeletal', 'Respiratory'],
    answer: 3,
    emoji: '🫁',
    sys: 'resp',
    fact: 'RESPIRATORY system! Lungs take in oxygen and release carbon dioxide. You breathe about 20,000 times per day!'
  },
  {
    q: 'How many bones does an adult human body have?',
    choices: ['106', '206', '306', '406'],
    answer: 1,
    emoji: '🦴',
    sys: 'skeletal',
    fact: '206 bones! Babies are born with ~270 bones — many fuse together as you grow. Your smallest bone is in your ear!'
  },
  {
    q: 'The BRAIN controls the body through the...',
    choices: ['Digestive system', 'Circulatory system', 'Nervous system', 'Muscular system'],
    answer: 2,
    emoji: '🧠',
    sys: 'nervous',
    fact: "NERVOUS system! The brain sends signals through nerves at up to 270 mph (430 km/h). It's your body's control center!"
  },
  {
    q: 'Where does MOST nutrient absorption happen in digestion?',
    choices: ['Stomach', 'Large intestine', 'Small intestine', 'Esophagus'],
    answer: 2,
    emoji: '🔬',
    sys: 'digest',
    fact: 'SMALL INTESTINE (6-7 meters long!) absorbs most nutrients into the blood. Its finger-like villi increase surface area!'
  },
  {
    q: 'Red blood cells carry...',
    choices: ['Nutrients only', 'Oxygen (using hemoglobin)', 'Food waste', 'Nerve signals'],
    answer: 1,
    emoji: '🔴',
    sys: 'cardio',
    fact: 'Red blood cells carry OXYGEN using hemoglobin (the iron-containing protein that makes blood red)! 25 trillion RBCs in your body!'
  },
  {
    q: 'Which gas do we breathe IN and which do we breathe OUT?',
    choices: [
      'In: CO₂, Out: O₂',
      'In: O₂, Out: CO₂',
      'Both in and out: O₂',
      'In: nitrogen, Out: oxygen'
    ],
    answer: 1,
    emoji: '💨',
    sys: 'resp',
    fact: "We breathe IN oxygen (O₂) and breathe OUT carbon dioxide (CO₂). Plants do the opposite — that's why they're vital!"
  },
  {
    q: 'What is the function of the SKELETON?',
    choices: [
      'Pumps blood only',
      'Digests food',
      'Supports the body, protects organs, and allows movement',
      'Makes hormones only'
    ],
    answer: 2,
    emoji: '🦴',
    sys: 'skeletal',
    fact: 'SKELETON: supports body, protects organs (skull protects brain, ribs protect heart/lungs), and makes blood cells in bone marrow!'
  },
  {
    q: "The SPINAL CORD connects the brain to the rest of the body. It's protected by...",
    choices: ['Ribs', 'Skull', 'Vertebrae (backbone)', 'Muscles'],
    answer: 2,
    emoji: '🧬',
    sys: 'nervous',
    fact: "The BACKBONE (vertebral column) protects the spinal cord. Without it, signals from the brain couldn't reach your legs!"
  },
  {
    q: 'What do MUSCLES need to contract?',
    choices: [
      'Only oxygen',
      'Instructions from nerves + energy (glucose)',
      'Water only',
      'Calcium only'
    ],
    answer: 1,
    emoji: '💪',
    sys: 'muscle',
    fact: "Muscles need nerve signals AND energy (glucose + oxygen). That's why exercise makes you breathe harder — more O₂ for muscles!"
  },
  {
    q: "The LIVER's main jobs include...",
    choices: [
      'Pumping blood',
      'Breathing in air',
      'Filtering blood, making bile, and storing glycogen',
      'Making bones'
    ],
    answer: 2,
    emoji: '🫀',
    sys: 'digest',
    fact: 'The LIVER is the largest internal organ! It filters toxins from blood, produces bile for fat digestion, and stores energy!'
  },
  {
    q: 'Your heart beats approximately how many times per day?',
    choices: ['1,000', '10,000', '100,000', '1,000,000'],
    answer: 2,
    emoji: '❤️',
    sys: 'cardio',
    fact: 'About 100,000 beats per day! In a lifetime, the heart beats ~3 billion times without rest — the hardest working muscle!'
  },
  {
    q: 'Tendons connect...',
    choices: ['Bone to bone', 'Muscle to muscle', 'Muscle to bone', 'Nerve to muscle'],
    answer: 2,
    emoji: '🦵',
    sys: 'muscle',
    fact: 'TENDONS connect muscle to bone. LIGAMENTS connect bone to bone. Your Achilles tendon connects calf muscle to heel!'
  },
  {
    q: 'What is the skin\'s role as a body "system"?',
    choices: [
      'Only keeps you warm',
      'Protects from infection, regulates temperature, and senses touch',
      'Produces all hormones',
      'Only makes you look different'
    ],
    answer: 1,
    emoji: '🧤',
    sys: 'nervous',
    fact: 'SKIN (integumentary system) is your largest organ! It protects from bacteria, regulates temperature through sweating, and senses touch!'
  }
];
const TOTAL = 10;
const state = { score: 0, round: 0, used: new Set(), current: null, answered: false };
const SYS_PILLS = {
  digest: 'pill-digest',
  cardio: 'pill-cardio',
  resp: 'pill-resp',
  skeletal: 'pill-skeletal',
  nervous: 'pill-nervous',
  muscle: 'pill-muscle'
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
function highlightSystem(sys) {
  Object.values(SYS_PILLS).forEach(function (id) {
    document.getElementById(id).classList.remove('active');
  });
  if (sys && SYS_PILLS[sys]) {
    document.getElementById(SYS_PILLS[sys]).classList.add('active');
  }
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
  highlightSystem(state.current.sys);
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🫀' : '🦴';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Body Expert!' : pct >= 0.7 ? 'Anatomy Star!' : 'Keep Learning!';
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

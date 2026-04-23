'use strict';
const QUESTIONS = [
  {
    q: 'Which organ pumps blood throughout your body?',
    choices: ['Lung', 'Brain', 'Heart', 'Kidney'],
    answer: 2,
    emoji: '❤️',
    fact: 'Your heart beats about 100,000 times a day, pumping blood through 100,000 km of blood vessels!'
  },
  {
    q: 'What is the job of your lungs?',
    choices: [
      'Digest food',
      'Filter blood',
      'Exchange oxygen and carbon dioxide',
      'Send nerve signals'
    ],
    answer: 2,
    emoji: '🫁',
    fact: 'Lungs breathe in oxygen (your body needs it) and breathe out carbon dioxide (waste gas)!'
  },
  {
    q: 'Which body system includes the brain, spinal cord, and nerves?',
    choices: ['Digestive system', 'Nervous system', 'Skeletal system', 'Muscular system'],
    answer: 1,
    emoji: '🧠',
    fact: 'The nervous system is like a computer network. The brain sends signals through nerves to control everything!'
  },
  {
    q: 'What do bones in your body do?',
    choices: ['Digest food', 'Make blood cells and give structure', 'Pump blood', 'Filter air'],
    answer: 1,
    emoji: '🦴',
    fact: 'Bones give your body structure, protect organs, and produce red blood cells in bone marrow!'
  },
  {
    q: 'Which organ breaks down food into nutrients?',
    choices: ['Heart', 'Brain', 'Stomach', 'Lungs'],
    answer: 2,
    emoji: '🫃',
    fact: 'The stomach uses acid and muscles to break food into smaller pieces. The small intestine absorbs nutrients!'
  },
  {
    q: 'How many bones does an adult human body have?',
    choices: ['100', '206', '300', '500'],
    answer: 1,
    emoji: '🦴',
    fact: 'Adults have 206 bones! Babies are born with about 270 — some fuse together as we grow.'
  },
  {
    q: 'What is the largest organ of the human body?',
    choices: ['Liver', 'Brain', 'Skin', 'Heart'],
    answer: 2,
    emoji: '🫀',
    fact: 'Skin is the largest organ! It covers your whole body, protects you from germs, and regulates temperature.'
  },
  {
    q: 'Which system uses veins and arteries to carry blood?',
    choices: ['Nervous system', 'Digestive system', 'Respiratory system', 'Circulatory system'],
    answer: 3,
    emoji: '🩸',
    fact: 'The circulatory system (heart + blood vessels) delivers oxygen and nutrients to every cell in your body!'
  },
  {
    q: 'Your skeleton is made of bones and...',
    choices: ['Muscles', 'Cartilage', 'Nerves', 'Skin'],
    answer: 1,
    emoji: '🦴',
    fact: "Cartilage is the flexible tissue at the end of bones and in your nose and ears. It's smoother than bone!"
  },
  {
    q: 'What does the brain control?',
    choices: [
      'Only your thoughts',
      'Only your movements',
      'Everything — thoughts, feelings, senses, movements',
      'Only your heartbeat'
    ],
    answer: 2,
    emoji: '🧠',
    fact: 'Your brain controls everything! It weighs about 1.4 kg and has about 86 billion neurons (nerve cells)!'
  },
  {
    q: 'Which body system fights germs and keeps you healthy?',
    choices: ['Digestive system', 'Immune system', 'Skeletal system', 'Reproductive system'],
    answer: 1,
    emoji: '🛡️',
    fact: 'Your immune system includes white blood cells that attack bacteria and viruses. Vaccines train the immune system!'
  },
  {
    q: 'The kidneys filter your blood to make...',
    choices: ['Blood cells', 'Hormones', 'Urine', 'Sweat'],
    answer: 2,
    emoji: '🫘',
    fact: 'Kidneys filter about 200 litres of blood per day! They remove waste as urine and maintain water balance.'
  },
  {
    q: 'What connects your muscles to your bones?',
    choices: ['Veins', 'Nerves', 'Tendons', 'Cartilage'],
    answer: 2,
    emoji: '💪',
    fact: 'Tendons connect muscle to bone. Ligaments connect bone to bone. Both are strong flexible tissues!'
  },
  {
    q: 'What is the main function of red blood cells?',
    choices: ['Fight infection', 'Carry oxygen throughout the body', 'Clot wounds', 'Digest food'],
    answer: 1,
    emoji: '🩸',
    fact: 'Red blood cells carry oxygen using hemoglobin (the red pigment). White blood cells fight infection!'
  },
  {
    q: 'Your digestive system starts in your...',
    choices: ['Stomach', 'Small intestine', 'Mouth', 'Esophagus'],
    answer: 2,
    emoji: '👄',
    fact: 'Digestion begins in your mouth! Teeth chew food and saliva starts breaking down carbohydrates right away.'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🩺' : '❤️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Body Expert!' : pct >= 0.7 ? 'Health Hero!' : 'Keep Learning!';
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

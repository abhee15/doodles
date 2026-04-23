'use strict';
const QUESTIONS = [
  {
    sentence:
      'The <b class="target-word">ancient</b> temple was thousands of years old and had crumbling stone walls.',
    q: 'What does "ancient" mean?',
    choices: ['Brand new', 'Very old', 'Very tall', 'Underground'],
    answer: 1,
    emoji: '🏛️',
    fact: 'Clue: "thousands of years old" and "crumbling" tell you ANCIENT means very, very old!'
  },
  {
    sentence:
      'She was <b class="target-word">furious</b> — her face turned red and she stomped out of the room.',
    q: 'What does "furious" most likely mean?',
    choices: ['Happy', 'Sad', 'Extremely angry', 'Tired'],
    answer: 2,
    emoji: '😤',
    fact: 'Clues: "face turned red" and "stomped out" show strong anger. FURIOUS means very angry!'
  },
  {
    sentence:
      'The explorer was <b class="target-word">famished</b> after hiking for 12 hours without eating anything.',
    q: 'What does "famished" most likely mean?',
    choices: ['Famous', 'Extremely hungry', 'Very tired', 'Lost'],
    answer: 1,
    emoji: '🥾',
    fact: 'Clue: "12 hours without eating" gives it away! FAMISHED means extremely hungry!'
  },
  {
    sentence:
      'The puppy was <b class="target-word">timid</b> — it hid under the bed whenever a stranger came to the door.',
    q: 'What does "timid" mean?',
    choices: ['Brave', 'Energetic', 'Shy and fearful', 'Friendly'],
    answer: 2,
    emoji: '🐶',
    fact: 'Clue: "hid" and "whenever a stranger came" show the puppy is scared. TIMID = shy, easily frightened!'
  },
  {
    sentence:
      'The scientist made a <b class="target-word">crucial</b> discovery that could cure the disease — without it, they could not continue.',
    q: 'What does "crucial" mean?',
    choices: ['Small', 'Unimportant', 'Extremely important', 'Accidental'],
    answer: 2,
    emoji: '🔬',
    fact: 'Clue: "could not continue" without it. CRUCIAL means absolutely necessary or extremely important!'
  },
  {
    sentence:
      'After the storm, the town was in <b class="target-word">chaos</b> — cars blocked roads, windows were broken, and people ran in every direction.',
    q: 'What does "chaos" mean?',
    choices: ['Complete disorder', 'Perfect order', 'Heavy rain', 'Darkness'],
    answer: 0,
    emoji: '🌪️',
    fact: 'All the clues (blocked roads, broken windows, people running) describe complete disorder. CHAOS = total confusion!'
  },
  {
    sentence:
      'The food at the restaurant was <b class="target-word">delectable</b> — everyone licked their plates and asked for seconds.',
    q: 'What does "delectable" most likely mean?',
    choices: ['Terrible tasting', 'Too expensive', 'Extremely delicious', 'Very spicy'],
    answer: 2,
    emoji: '🍽️',
    fact: 'Clue: "licked their plates" and "asked for seconds" = loved the food! DELECTABLE means delicious!'
  },
  {
    sentence:
      'The hiker was <b class="target-word">exhausted</b> after climbing for 8 hours — her legs ached and she could barely keep her eyes open.',
    q: 'What does "exhausted" mean?',
    choices: ['Excited', 'Extremely tired', 'Frightened', 'Lost'],
    answer: 1,
    emoji: '😴',
    fact: 'Clues: "8 hours climbing," "legs ached," "could barely keep eyes open." EXHAUSTED = completely worn out!'
  },
  {
    sentence:
      'Instead of throwing away the old boxes, Maria found an <b class="target-word">ingenious</b> way to turn them into furniture.',
    q: 'What does "ingenious" mean?',
    choices: ['Wasteful', 'Expensive', 'Clever and creative', 'Simple'],
    answer: 2,
    emoji: '💡',
    fact: 'Clue: turning trash into furniture is clever! INGENIOUS means showing remarkable cleverness or originality!'
  },
  {
    sentence:
      'The forest was <b class="target-word">serene</b> — only the soft sound of birds and a gentle breeze could be heard.',
    q: 'What does "serene" mean?',
    choices: ['Loud and busy', 'Peaceful and calm', 'Dark and scary', 'Cold and empty'],
    answer: 1,
    emoji: '🌲',
    fact: 'Clues: "soft sound," "gentle breeze" — everything is quiet and calm. SERENE means perfectly peaceful!'
  },
  {
    sentence:
      'Tom was <b class="target-word">reluctant</b> to jump into the cold pool — he stood at the edge for 10 minutes before going in.',
    q: 'What does "reluctant" mean?',
    choices: ['Eager and excited', 'Unwilling or hesitant', 'Unable to swim', 'Too cold'],
    answer: 1,
    emoji: '🏊',
    fact: 'Clue: "stood at the edge for 10 minutes" shows he didn\'t want to jump. RELUCTANT = unwilling, hesitant!'
  },
  {
    sentence:
      'The old bridge was <b class="target-word">rickety</b> — it creaked and swayed with every step, and several boards were missing.',
    q: 'What does "rickety" mean?',
    choices: ['Very sturdy', 'Poorly built and shaky', 'Very wide', 'Recently painted'],
    answer: 1,
    emoji: '🌉',
    fact: 'Clues: "creaked," "swayed," "boards missing" — all show it\'s unstable. RICKETY means wobbly and in poor condition!'
  },
  {
    sentence:
      'The teacher asked for a <b class="target-word">brief</b> summary — just two or three sentences, not the whole story.',
    q: 'What does "brief" mean?',
    choices: ['Detailed and long', 'Short and quick', 'Written in cursive', 'Spoken aloud'],
    answer: 1,
    emoji: '📝',
    fact: 'Clue: "just two or three sentences" defines it for you! BRIEF means short, lasting only a short time!'
  },
  {
    sentence:
      'Maya felt <b class="target-word">elated</b> when she won the spelling bee — she jumped up and cheered with joy.',
    q: 'What does "elated" mean?',
    choices: ['Very sad', 'Surprised', 'Extremely happy', 'Embarrassed'],
    answer: 2,
    emoji: '🏆',
    fact: 'Clues: "won," "jumped up," "cheered with joy." ELATED means very happy and excited about something great!'
  },
  {
    sentence:
      'The <b class="target-word">abundant</b> harvest filled every barn on the farm — there was more food than anyone could eat.',
    q: 'What does "abundant" mean?',
    choices: ['Very little', 'More than enough', 'Rotten or bad', 'Very expensive'],
    answer: 1,
    emoji: '🌾',
    fact: 'Clue: "filled every barn" and "more than anyone could eat." ABUNDANT = more than enough, plentiful!'
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
  document.getElementById('sentence-box').innerHTML = state.current.sentence;
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🔍' : '📖';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Word Detective!' : pct >= 0.7 ? 'Clue Master!' : 'Keep Reading!';
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

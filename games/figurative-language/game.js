'use strict';
const QUESTIONS = [
  {
    quote: '"The stars are diamonds in the sky."',
    badge: 'metaphor',
    badgeClass: 'badge-metaphor',
    q: 'What type of figurative language is this?',
    choices: ['Simile', 'Metaphor', 'Idiom', 'Hyperbole'],
    answer: 1,
    emoji: '⭐',
    fact: 'METAPHOR — directly says something IS something else (no "like" or "as"). Stars ARE diamonds — a direct comparison!'
  },
  {
    quote: '"She ran like the wind."',
    badge: 'simile',
    badgeClass: 'badge-simile',
    q: 'What type of figurative language is this?',
    choices: ['Metaphor', 'Idiom', 'Simile', 'Personification'],
    answer: 2,
    emoji: '💨',
    fact: 'SIMILE — compares two things using "like" or "as". She ran LIKE the wind. Watch for like/as = simile!'
  },
  {
    quote: '"It\'s raining cats and dogs."',
    badge: 'idiom',
    badgeClass: 'badge-idiom',
    q: 'What does "raining cats and dogs" mean?',
    choices: [
      'Animals are falling from the sky',
      'It is raining heavily',
      'The weather is unpredictable',
      'It is slightly drizzling'
    ],
    answer: 1,
    emoji: '🌧️',
    fact: 'IDIOM — a phrase whose meaning is NOT literal. "Raining cats and dogs" = raining very hard. Idioms must be learned!'
  },
  {
    quote: '"The wind whispered through the trees."',
    badge: 'personification',
    badgeClass: 'badge-personify',
    q: 'What type of figurative language is this?',
    choices: ['Simile', 'Hyperbole', 'Metaphor', 'Personification'],
    answer: 3,
    emoji: '🌬️',
    fact: "PERSONIFICATION — giving human qualities to non-human things. Wind can't whisper, but it creates a vivid image!"
  },
  {
    quote: '"I\'ve told you a million times!"',
    badge: 'hyperbole',
    badgeClass: 'badge-hyperbole',
    q: 'What type of figurative language is this?',
    choices: ['Simile', 'Hyperbole', 'Idiom', 'Metaphor'],
    answer: 1,
    emoji: '😤',
    fact: 'HYPERBOLE — extreme exaggeration for effect. Nobody was actually told a million times! It emphasizes frustration!'
  },
  {
    quote: '"Her eyes are as bright as the sun."',
    badge: 'simile',
    badgeClass: 'badge-simile',
    q: 'What type of figurative language is this?',
    choices: ['Metaphor', 'Simile', 'Personification', 'Idiom'],
    answer: 1,
    emoji: '🌞',
    fact: 'SIMILE — uses "as...as" to compare. Eyes AS bright AS the sun. "As [adjective] as" is a common simile pattern!'
  },
  {
    quote: '"Time is a thief that steals our years."',
    badge: 'metaphor',
    badgeClass: 'badge-metaphor',
    q: 'What type of figurative language is this?',
    choices: ['Simile', 'Idiom', 'Hyperbole', 'Metaphor'],
    answer: 3,
    emoji: '⏰',
    fact: 'METAPHOR — time IS a thief (not like a thief). Directly calling time a thief means it takes without asking!'
  },
  {
    quote: '"Break a leg!"',
    badge: 'idiom',
    badgeClass: 'badge-idiom',
    q: 'What does "break a leg" mean?',
    choices: [
      "Be careful so you don't get hurt",
      'Good luck!',
      'You are moving too fast',
      'Stop what you are doing'
    ],
    answer: 1,
    emoji: '🦵',
    fact: 'IDIOM: "Break a leg" is a theatrical way to say GOOD LUCK! Actors say it before performances — the literal meaning is the opposite!'
  },
  {
    quote: '"The old car groaned and coughed on the cold morning."',
    badge: 'personification',
    badgeClass: 'badge-personify',
    q: 'What type of figurative language is this?',
    choices: ['Hyperbole', 'Simile', 'Personification', 'Metaphor'],
    answer: 2,
    emoji: '🚗',
    fact: "PERSONIFICATION — cars can't groan or cough (those are human actions). It makes the car seem alive and struggling!"
  },
  {
    quote: '"I\'m so hungry I could eat a horse!"',
    badge: 'hyperbole',
    badgeClass: 'badge-hyperbole',
    q: 'What type of figurative language is this?',
    choices: ['Metaphor', 'Idiom', 'Simile', 'Hyperbole'],
    answer: 3,
    emoji: '🐴',
    fact: 'HYPERBOLE — wild exaggeration! Nobody can actually eat a horse. It emphasizes how extremely hungry the person feels!'
  },
  {
    quote: '"Life is a rollercoaster."',
    badge: 'metaphor',
    badgeClass: 'badge-metaphor',
    q: 'What does this metaphor mean?',
    choices: [
      'Life involves many amusement parks',
      'Life has many ups and downs',
      'Life is very short',
      'Life is always fun'
    ],
    answer: 1,
    emoji: '🎢',
    fact: "METAPHOR: Life IS a rollercoaster — it has exciting highs and scary lows. The rollercoaster represents life's ups and downs!"
  },
  {
    quote: '"He has a heart of gold."',
    badge: 'metaphor',
    badgeClass: 'badge-metaphor',
    q: 'What does this metaphor mean?',
    choices: [
      'He is very wealthy',
      'His heart is literally made of gold',
      'He is very kind and generous',
      'He is selfish'
    ],
    answer: 2,
    emoji: '💛',
    fact: 'METAPHOR: "Heart of gold" means extremely kind and generous. Gold is precious — so is a good heart!'
  },
  {
    quote: '"The leaves danced in the autumn breeze."',
    badge: 'personification',
    badgeClass: 'badge-personify',
    q: 'What type of figurative language is this?',
    choices: ['Simile', 'Hyperbole', 'Idiom', 'Personification'],
    answer: 3,
    emoji: '🍂',
    fact: "PERSONIFICATION — leaves can't dance! Describing leaf movement as dancing brings nature to life vividly!"
  },
  {
    quote: '"The test was a piece of cake."',
    badge: 'idiom',
    badgeClass: 'badge-idiom',
    q: 'What does "a piece of cake" mean here?',
    choices: [
      'The test included eating cake',
      'The test was very easy',
      'The test was delicious',
      'The test was difficult'
    ],
    answer: 1,
    emoji: '🎂',
    fact: 'IDIOM: "Piece of cake" = very easy! This common idiom has nothing to do with actual cake. It means no effort needed!'
  },
  {
    quote: '"She was as quiet as a mouse."',
    badge: 'simile',
    badgeClass: 'badge-simile',
    q: 'Which type of figurative language is this?',
    choices: ['Metaphor', 'Personification', 'Simile', 'Hyperbole'],
    answer: 2,
    emoji: '🐭',
    fact: 'SIMILE — compares using "as...as." She was AS QUIET AS a mouse. Uses as/like to compare two unlike things!'
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
  document.getElementById('quote-box').textContent = state.current.quote;
  const badge = document.getElementById('type-badge');
  badge.textContent = '🔍 What type is this?';
  badge.className = 'type-badge badge-question';
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
  const badge = document.getElementById('type-badge');
  badge.textContent = state.current.badge.toUpperCase();
  badge.className = `type-badge ${state.current.badgeClass}`;
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '✍️' : '📖';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Language Artist!' : pct >= 0.7 ? 'Word Wizard!' : 'Keep Reading!';
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

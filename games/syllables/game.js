'use strict';

const ROUNDS = [
  {
    word: 'Cat',
    syllables: 1,
    choices: ['1', '2', '3', '4'],
    answer: 0,
    fact: '"Cat" has 1 syllable. Clap once: CAT.'
  },
  {
    word: 'Happy',
    syllables: 2,
    choices: ['1', '2', '3', '4'],
    answer: 1,
    fact: '"Hap-py" has 2 syllables. Clap twice!'
  },
  {
    word: 'Elephant',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"El-e-phant" has 3 syllables. Clap 3 times!'
  },
  {
    word: 'Butterfly',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"But-ter-fly" has 3 syllables. Flutter those wings!'
  },
  {
    word: 'Dog',
    syllables: 1,
    choices: ['1', '2', '3', '4'],
    answer: 0,
    fact: '"Dog" has just 1 syllable. Short and sweet!'
  },
  {
    word: 'Umbrella',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"Um-brel-la" has 3 syllables. Count with your fingers!'
  },
  {
    word: 'Rainbow',
    syllables: 2,
    choices: ['1', '2', '3', '4'],
    answer: 1,
    fact: '"Rain-bow" has 2 syllables. Rain + Bow = 2!'
  },
  {
    word: 'Alligator',
    syllables: 4,
    choices: ['3', '4', '5', '6'],
    answer: 1,
    fact: '"Al-li-ga-tor" has 4 syllables. That\'s a big word for a big animal!'
  },
  {
    word: 'Sun',
    syllables: 1,
    choices: ['1', '2', '3', '4'],
    answer: 0,
    fact: '"Sun" shines with just 1 syllable!'
  },
  {
    word: 'Computer',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"Com-pu-ter" has 3 syllables.'
  },
  {
    word: 'Bicycle',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"Bi-cy-cle" has 3 syllables.'
  },
  {
    word: 'Watermelon',
    syllables: 4,
    choices: ['3', '4', '5', '6'],
    answer: 1,
    fact: '"Wa-ter-mel-on" has 4 syllables. Delicious!'
  },
  {
    word: 'School',
    syllables: 1,
    choices: ['1', '2', '3', '4'],
    answer: 0,
    fact: '"School" has 1 syllable even though it has 6 letters!'
  },
  {
    word: 'Beautiful',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"Beau-ti-ful" has 3 syllables.'
  },
  {
    word: 'Hippopotamus',
    syllables: 5,
    choices: ['3', '4', '5', '6'],
    answer: 2,
    fact: '"Hip-po-pot-a-mus" — 5 syllables! The longest word in today\'s game!'
  },
  {
    word: 'Strawberry',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"Straw-ber-ry" has 3 syllables.'
  },
  {
    word: 'Crocodile',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"Croc-o-dile" has 3 syllables.'
  },
  {
    word: 'Ice',
    syllables: 1,
    choices: ['1', '2', '3', '4'],
    answer: 0,
    fact: '"Ice" — cool and quick with 1 syllable!'
  },
  {
    word: 'Tomato',
    syllables: 3,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    fact: '"To-ma-to" has 3 syllables. To-may-to or to-mah-to!'
  },
  {
    word: 'Caterpillar',
    syllables: 4,
    choices: ['3', '4', '5', '6'],
    answer: 1,
    fact: '"Cat-er-pil-lar" has 4 syllables. Crawl through each one!'
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
function pickRound() {
  const avail = ROUNDS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.used.has(i);
  });
  if (avail.length === 0) {
    state.used.clear();
    return pickRound();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return ROUNDS[idx];
}
function startRound() {
  state.current = pickRound();
  state.answered = false;
  document.getElementById('round-label').textContent = `Round ${state.round + 1} of ${TOTAL}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('word-display').textContent = state.current.word;
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
    btn.innerHTML = `<span style="font-size:1.6rem;font-weight:900">${c}</span><span style="font-size:0.8rem;display:block;opacity:0.7">${c === '1' ? 'syllable' : 'syllables'}</span>`;
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
  document.getElementById('feedback').textContent = `💡 ${state.current.fact}`;
  document.getElementById('feedback').className =
    idx === state.current.answer ? 'feedback good' : 'feedback bad';
  if (idx === state.current.answer) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1200);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1800);
  }
}
function showResult() {
  const pct = state.score / TOTAL;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎵' : '👏';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Syllable Star!' : pct >= 0.7 ? 'Word Clapper!' : 'Keep Clapping!';
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

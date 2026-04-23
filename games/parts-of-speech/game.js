'use strict';
const QUESTIONS = [
  {
    q: 'A NOUN is a word that names...',
    choices: [
      'An action',
      'A person, place, or thing',
      'A feeling or emotion',
      'How something is done'
    ],
    answer: 1,
    emoji: '📦',
    fact: '"Dog", "London", "happiness", "cloud" are all nouns! Nouns can be people, places, things, or even ideas.'
  },
  {
    q: 'Which word is a VERB in this list?',
    choices: ['Happy', 'Mountain', 'Run', 'Blue'],
    answer: 2,
    emoji: '🏃',
    fact: '"Run" is a verb — it describes an action! Verbs show what someone or something does.'
  },
  {
    q: 'An ADJECTIVE describes a...',
    choices: ['Verb', 'Adjective', 'Pronoun', 'Noun'],
    answer: 3,
    emoji: '🎨',
    fact: 'Adjectives describe nouns: "the BIG dog", "a HAPPY child", "a RED apple". They answer: What kind? How many? Which one?'
  },
  {
    q: 'Which word is an ADJECTIVE?',
    choices: ['She', 'Quickly', 'Tall', 'Sing'],
    answer: 2,
    emoji: '✨',
    fact: '"Tall" is an adjective describing size. "Quickly" is an adverb, "she" is a pronoun, "sing" is a verb!'
  },
  {
    q: 'An ADVERB usually describes a...',
    choices: ['Noun', 'Verb or adjective', 'Article', 'Conjunction'],
    answer: 1,
    emoji: '⚡',
    fact: 'Adverbs describe verbs, adjectives, or other adverbs. "She runs QUICKLY." "It is VERY cold." Many adverbs end in -ly!'
  },
  {
    q: 'Which word is an ADVERB?',
    choices: ['Dog', 'Slowly', 'Purple', 'Eat'],
    answer: 1,
    emoji: '🐌',
    fact: '"Slowly" tells HOW the action is done — that makes it an adverb! "She walked slowly."'
  },
  {
    q: 'A PRONOUN is used to replace a...',
    choices: ['Verb', 'Adjective', 'Noun', 'Preposition'],
    answer: 2,
    emoji: '🔄',
    fact: 'Instead of saying "Mary loves Mary\'s cat", we use pronouns: "Mary loves HER cat." Pronouns avoid repetition!'
  },
  {
    q: 'Which of these is a PRONOUN?',
    choices: ['Run', 'Beautiful', 'He', 'Quickly'],
    answer: 2,
    emoji: '👤',
    fact: '"He", "she", "they", "it", "we", "you" are all pronouns. They replace nouns in sentences!'
  },
  {
    q: 'What do PREPOSITIONS show?',
    choices: ['Action', 'Size or color', 'Relationship between words', 'How many'],
    answer: 2,
    emoji: '📍',
    fact: 'Prepositions show location, direction, or time: "The cat is ON the mat." "She went TO school." "We ate BEFORE noon."'
  },
  {
    q: 'Which is a PREPOSITION?',
    choices: ['Run', 'Under', 'Happy', 'Jump'],
    answer: 1,
    emoji: '📦',
    fact: '"Under" shows WHERE something is — making it a preposition! "The ball rolled under the table."'
  },
  {
    q: 'A CONJUNCTION joins...',
    choices: ['Only nouns', 'Only verbs', 'Words, phrases, or clauses', 'Only adjectives'],
    answer: 2,
    emoji: '🔗',
    fact: 'Conjunctions connect: "I like cats AND dogs." "She can swim BUT she can\'t surf." AND, BUT, OR, SO, BECAUSE are conjunctions!'
  },
  {
    q: 'Which is a CONJUNCTION?',
    choices: ['Dog', 'The', 'But', 'Swim'],
    answer: 2,
    emoji: '🔗',
    fact: '"But" connects contrasting ideas: "I like math but not spelling." AND, OR, BUT, SO, BECAUSE, ALTHOUGH are conjunctions!'
  },
  {
    q: '"The", "a", and "an" are called...',
    choices: ['Pronouns', 'Prepositions', 'Articles', 'Conjunctions'],
    answer: 2,
    emoji: '📝',
    fact: 'Articles are special words that introduce nouns. "THE" is definite (a specific thing), "a/an" are indefinite (any thing)!'
  },
  {
    q: 'In "The quick fox jumps", which word is the NOUN?',
    choices: ['Quick', 'Jumps', 'The', 'Fox'],
    answer: 3,
    emoji: '🦊',
    fact: '"Fox" is the noun — it\'s the animal (thing). "Quick" is an adjective, "jumps" is a verb, "the" is an article!'
  },
  {
    q: 'In "She sings beautifully", "beautifully" is a...',
    choices: ['Noun', 'Verb', 'Adjective', 'Adverb'],
    answer: 3,
    emoji: '🎵',
    fact: '"Beautifully" tells HOW she sings — it describes the verb "sings", making it an adverb. Most adverbs end in -ly!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '📝' : '✏️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Grammar Guru!' : pct >= 0.7 ? 'Word Wizard!' : 'Keep Writing!';
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

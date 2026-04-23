'use strict';
const QUESTIONS = [
  {
    q: 'Which sentence is correct?',
    choices: [
      'Me and my friend went to the store.',
      'My friend and I went to the store.',
      'Me went to the store with my friend.',
      'My friend and me goes to the store.'
    ],
    answer: 1,
    emoji: '✏️',
    fact: 'Use "I" as the subject. Remove "my friend and" — would you say "Me went to the store"? No! So it\'s "I went."'
  },
  {
    q: 'Which sentence uses the correct verb?',
    choices: [
      'The dogs barks loudly.',
      'The dogs bark loudly.',
      'The dogs barking loudly.',
      'The dogs barked loud.'
    ],
    answer: 1,
    emoji: '🐕',
    fact: '"Dogs" is plural, so use "bark" (not "barks"). Singular: "The dog barks." Plural: "The dogs bark."'
  },
  {
    q: 'Which sentence is punctuated correctly?',
    choices: ['What time is it.', 'What time is it?', 'What time is it!', 'what time is it?'],
    answer: 1,
    emoji: '❓',
    fact: 'Questions end with a question mark (?). Also, sentences must begin with a capital letter!'
  },
  {
    q: 'Which word is the correct plural of "child"?',
    choices: ['Childs', 'Childrens', 'Children', "Child's"],
    answer: 2,
    emoji: '👶',
    fact: "Irregular plurals don't follow the -s rule. Child → children, like tooth → teeth, foot → feet!"
  },
  {
    q: 'Choose the correct sentence:',
    choices: [
      'She runned to school.',
      'She run to school.',
      'She runs to school.',
      'She running to school.'
    ],
    answer: 2,
    emoji: '🏃',
    fact: '"She runs" — singular subject (she/he/it) needs -s on the verb in present tense. "Run" is the base form.'
  },
  {
    q: 'Which sentence has correct capitalization?',
    choices: [
      'we visited london in july.',
      'We visited London in July.',
      'We Visited London In July.',
      'we Visited london In july.'
    ],
    answer: 1,
    emoji: '🏙️',
    fact: 'Capitalize: first word of sentence, names of people/places (proper nouns), and names of months!'
  },
  {
    q: 'Which sentence uses "their", "there", or "they\'re" correctly?',
    choices: [
      'There going to the park.',
      'Their going to the park.',
      "They're going to the park.",
      'Theyre going to the park.'
    ],
    answer: 2,
    emoji: '🌳',
    fact: 'They\'re = they are. There = a place. Their = belonging to them. "They\'re going" = "They are going"!'
  },
  {
    q: 'Choose the correct sentence:',
    choices: [
      'I have went to the zoo.',
      'I have gone to the zoo.',
      'I have go to the zoo.',
      'I have going to the zoo.'
    ],
    answer: 1,
    emoji: '🦁',
    fact: '"Have gone" is the correct past participle. Say "I have gone" not "I have went." Went is simple past.'
  },
  {
    q: 'Which sentence uses an apostrophe correctly?',
    choices: [
      'The dogs bone was lost.',
      "The dogs' bone was lost.",
      "The dog's bone was lost.",
      "The dogs bone's was lost."
    ],
    answer: 2,
    emoji: '🦴',
    fact: "Dog's bone = the bone belonging to ONE dog. Use apostrophe + s for singular possession!"
  },
  {
    q: 'Choose the correct sentence:',
    choices: [
      'Can I go to the bathroom?',
      'Can I goes to the bathroom?',
      'Can I going to the bathroom?',
      'Can me go to the bathroom?'
    ],
    answer: 0,
    emoji: '🚿',
    fact: '"Can I go" is correct. "I" is the subject, "go" is the verb in base form after modal verbs like can/will/may.'
  },
  {
    q: 'Which word correctly completes: "I __ hungry right now."?',
    choices: ['am', 'is', 'are', 'be'],
    answer: 0,
    emoji: '🍕',
    fact: '"I am" — the verb "to be" changes: I am, you are, he/she/it is, we/they are.'
  },
  {
    q: 'Which sentence is correct?',
    choices: [
      "She don't like spinach.",
      "She doesn't likes spinach.",
      "She doesn't like spinach.",
      'She not like spinach.'
    ],
    answer: 2,
    emoji: '🥬',
    fact: 'With he/she/it, use "doesn\'t" (does not) + base verb. NOT "don\'t" (that\'s for I/you/we/they).'
  },
  {
    q: 'Choose the correct comparative:',
    choices: [
      'My bag is more heavier than yours.',
      'My bag is heavier than yours.',
      'My bag is most heavy than yours.',
      'My bag is heavy than yours.'
    ],
    answer: 1,
    emoji: '🎒',
    fact: 'For short adjectives (1-2 syllables), add -er: heavy → heavier. Don\'t add "more" too — that\'s a double comparative!'
  },
  {
    q: 'Which sentence has the correct comma use?',
    choices: [
      'I like cats dogs and birds.',
      'I like cats, dogs, and birds.',
      'I, like cats, dogs and birds.',
      'I like, cats dogs, and birds.'
    ],
    answer: 1,
    emoji: '🐾',
    fact: 'In a list of three or more items, use commas to separate them. The final comma before "and" is called the Oxford comma!'
  },
  {
    q: 'Which word correctly completes: "Yesterday, she __ her homework."?',
    choices: ['do', 'does', 'doing', 'did'],
    answer: 3,
    emoji: '📝',
    fact: '"Did" is the past tense of "do". Yesterday tells us it\'s past tense. "Did" works for all subjects!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '✏️' : '📝';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Grammar Genius!' : pct >= 0.7 ? 'Word Wizard!' : 'Keep Writing!';
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

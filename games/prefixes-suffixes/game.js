'use strict';
const QUESTIONS = [
  {
    q: 'What does the prefix "UN-" mean?',
    choices: ['Again', 'Before', 'Not / the opposite of', 'Full of'],
    answer: 2,
    emoji: '🔤',
    fact: '"Un-" reverses the meaning: UNhappy = not happy, UNdo = reverse an action, UNlock = not locked!',
    prefix: 'un-',
    root: 'happy',
    suffix: '',
    result: 'unhappy'
  },
  {
    q: '"Un-" + "kind" = ?',
    choices: ['Unkindly', 'Kindy', 'Unkind', 'Reskind'],
    answer: 2,
    emoji: '💔',
    fact: '"Unkind" means NOT kind. The prefix un- is one of the most common in English!',
    prefix: 'un-',
    root: 'kind',
    suffix: '',
    result: 'unkind'
  },
  {
    q: 'What does the prefix "RE-" mean?',
    choices: ['Not', 'Before', 'Again', 'Without'],
    answer: 2,
    emoji: '🔄',
    fact: '"Re-" means AGAIN or BACK: REwrite = write again, REstart = start again, REplay = play again!',
    prefix: 're-',
    root: 'play',
    suffix: '',
    result: 'replay'
  },
  {
    q: '"Re-" + "build" = ?',
    choices: ['Unbuilt', 'Prebuild', 'Rebuilt', 'Rebuild'],
    answer: 3,
    emoji: '🏗️',
    fact: '"Rebuild" means to BUILD AGAIN. After a disaster, cities are rebuilt!',
    prefix: 're-',
    root: 'build',
    suffix: '',
    result: 'rebuild'
  },
  {
    q: 'What does the prefix "PRE-" mean?',
    choices: ['After', 'Not', 'Again', 'Before'],
    answer: 3,
    emoji: '⏰',
    fact: '"Pre-" means BEFORE: PREview = view before, PREschool = before school, PREheat = heat before cooking!',
    prefix: 'pre-',
    root: 'heat',
    suffix: '',
    result: 'preheat'
  },
  {
    q: 'What does the suffix "-FUL" mean?',
    choices: ['Without', 'Against', 'Full of / having', 'Again'],
    answer: 2,
    emoji: '✨',
    fact: '"-ful" means FULL OF: thankFUL = full of thanks, helpFUL = full of help, colorFUL = full of color!',
    prefix: '',
    root: 'thank',
    suffix: '-ful',
    result: 'thankful'
  },
  {
    q: '"Help" + "-ful" = ?',
    choices: ['Helpless', 'Helper', 'Helpful', 'Helping'],
    answer: 2,
    emoji: '🤝',
    fact: '"Helpful" means FULL OF HELP. Someone who helps is helpful!',
    prefix: '',
    root: 'help',
    suffix: '-ful',
    result: 'helpful'
  },
  {
    q: 'What does the suffix "-LESS" mean?',
    choices: ['Full of', 'Against', 'Without', 'Again'],
    answer: 2,
    emoji: '🚫',
    fact: '"-less" means WITHOUT: hopeLESS = without hope, fearLESS = without fear, useLESS = without use!',
    prefix: '',
    root: 'hope',
    suffix: '-less',
    result: 'hopeless'
  },
  {
    q: '"Care" + "-less" = ?',
    choices: ['Careful', 'Careless', 'Carely', 'Uncare'],
    answer: 1,
    emoji: '⚠️',
    fact: '"Careless" means WITHOUT CARE — not paying attention. The opposite is "careful" (full of care)!',
    prefix: '',
    root: 'care',
    suffix: '-less',
    result: 'careless'
  },
  {
    q: 'What does the suffix "-ER" mean when added to a verb?',
    choices: ['Full of', 'One who does the action', 'Without', 'Before'],
    answer: 1,
    emoji: '👤',
    fact: '"-er" makes a noun meaning ONE WHO: teach+er = teachER (one who teaches), sing+er = singER (one who sings)!',
    prefix: '',
    root: 'teach',
    suffix: '-er',
    result: 'teacher'
  },
  {
    q: 'What does the prefix "MIS-" mean?',
    choices: ['Before', 'Again', 'Full of', 'Wrongly / badly'],
    answer: 3,
    emoji: '❌',
    fact: '"Mis-" means WRONGLY or BADLY: MISunderstand = understand wrongly, MISspell = spell wrongly!',
    prefix: 'mis-',
    root: 'spell',
    suffix: '',
    result: 'misspell'
  },
  {
    q: 'What does the suffix "-TION" typically do to a word?',
    choices: ['Makes it an adjective', 'Makes it an adverb', 'Makes it a noun', 'Makes it a verb'],
    answer: 2,
    emoji: '📝',
    fact: '"-tion" turns verbs into NOUNS: educate → educaTION, create → creaTION, celebrate → celebraTION!',
    prefix: '',
    root: 'create',
    suffix: '-tion',
    result: 'creation'
  },
  {
    q: '"Dis-" + "appear" = ?',
    choices: ['Reappear', 'Preappear', 'Disappear', 'Unappear'],
    answer: 2,
    emoji: '🪄',
    fact: '"Disappear" means to go out of sight! "Dis-" means away, remove, or not.'
  },
  {
    q: 'What does the prefix "ANTI-" mean?',
    choices: ['Before', 'Full of', 'Against / opposing', 'Again'],
    answer: 2,
    emoji: '🛡️',
    fact: '"Anti-" means AGAINST: ANTIfreeze = against freezing, ANTIbody = against harmful invaders!'
  },
  {
    q: '"Beauty" + "-ful" = ? AND what does it mean?',
    choices: [
      'Beautyless (no beauty)',
      'Beautifully (how beautiful)',
      'Beautiful (full of beauty)',
      'Beautyful (wrong spelling)'
    ],
    answer: 2,
    emoji: '🌸',
    fact: '"Beautiful" = full of beauty. Note: "beauty" drops the "y" and adds "-iful" — one of English\'s spelling rules!',
    prefix: '',
    root: 'beauty',
    suffix: '-ful',
    result: 'beautiful'
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
function updateWordBuilder(q) {
  const hasPre = q.prefix && q.prefix.length > 0;
  const hasSuf = q.suffix && q.suffix.length > 0;
  const hasRoot = q.root && q.root.length > 0;
  const hasResult = q.result && q.result.length > 0;
  function show(id, txt) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = txt ? '' : 'none';
      if (txt) {
        el.textContent = txt;
      }
    }
  }
  show('wb-prefix', hasPre ? q.prefix : '');
  show('wb-plus1', hasPre && hasRoot ? '+' : '');
  show('wb-root', hasRoot ? q.root : '');
  show('wb-plus2', hasSuf && hasRoot ? '+' : '');
  show('wb-suffix', hasSuf ? q.suffix : '');
  show('wb-eq', hasResult ? '=' : '');
  show('wb-result', hasResult ? q.result : '');
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
  updateWordBuilder(state.current);
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🔤' : '✏️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Word Builder!' : pct >= 0.7 ? 'Word Wizard!' : 'Keep Building!';
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

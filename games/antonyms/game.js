'use strict';
const QUESTIONS = [
  {
    q: 'What is the antonym (opposite) of "happy"?',
    choices: ['Joyful', 'Sad', 'Excited', 'Glad'],
    answer: 1,
    emoji: '😊',
    fact: 'Happy ↔ Sad. Antonyms are words with opposite meanings. Synonyms are words with similar meanings!'
  },
  {
    q: 'What is the antonym of "hot"?',
    choices: ['Warm', 'Boiling', 'Cold', 'Spicy'],
    answer: 2,
    emoji: '🌡️',
    fact: 'Hot ↔ Cold. Other temperature antonyms: freezing/burning, chilly/warm, icy/scorching!'
  },
  {
    q: 'What is the antonym of "fast"?',
    choices: ['Quick', 'Rapid', 'Speedy', 'Slow'],
    answer: 3,
    emoji: '🐢',
    fact: 'Fast ↔ Slow. The tortoise and the hare — one was fast, the other slow!'
  },
  {
    q: 'What is the antonym of "large"?',
    choices: ['Big', 'Huge', 'Small', 'Giant'],
    answer: 2,
    emoji: '🐘',
    fact: 'Large ↔ Small. Other size antonyms: enormous/tiny, tall/short, wide/narrow!'
  },
  {
    q: 'What is the antonym of "day"?',
    choices: ['Afternoon', 'Morning', 'Twilight', 'Night'],
    answer: 3,
    emoji: '🌙',
    fact: 'Day ↔ Night. The sun marks day; the moon and stars mark night!'
  },
  {
    q: 'What is the antonym of "old"?',
    choices: ['Ancient', 'New', 'Aged', 'Elderly'],
    answer: 1,
    emoji: '🆕',
    fact: 'Old ↔ New (or Young for people). Antonyms: ancient/modern, elderly/young!'
  },
  {
    q: 'What is the antonym of "push"?',
    choices: ['Shove', 'Press', 'Pull', 'Force'],
    answer: 2,
    emoji: '🚪',
    fact: 'Push ↔ Pull. You push a door open with your hand and pull it toward you!'
  },
  {
    q: 'What is the antonym of "brave"?',
    choices: ['Bold', 'Heroic', 'Fearful', 'Daring'],
    answer: 2,
    emoji: '🦁',
    fact: 'Brave ↔ Fearful (or Cowardly). A brave person faces their fears!'
  },
  {
    q: 'What is the antonym of "noisy"?',
    choices: ['Loud', 'Thunderous', 'Quiet', 'Booming'],
    answer: 2,
    emoji: '🔇',
    fact: "Noisy ↔ Quiet. In a library you should be quiet, but at a concert it's noisy!"
  },
  {
    q: 'What is the antonym of "give"?',
    choices: ['Donate', 'Offer', 'Take', 'Share'],
    answer: 2,
    emoji: '🎁',
    fact: 'Give ↔ Take. Give something to someone; take something from someone.'
  },
  {
    q: 'What is the antonym of "open"?',
    choices: ['Ajar', 'Wide', 'Unlocked', 'Closed'],
    answer: 3,
    emoji: '🚪',
    fact: 'Open ↔ Closed. A door is either open (you can pass through) or closed (you cannot)!'
  },
  {
    q: 'What is the antonym of "strong"?',
    choices: ['Powerful', 'Mighty', 'Weak', 'Tough'],
    answer: 2,
    emoji: '💪',
    fact: 'Strong ↔ Weak. Exercise makes muscles stronger; illness can make them weaker.'
  },
  {
    q: 'What is the antonym of "empty"?',
    choices: ['Hollow', 'Bare', 'Full', 'Void'],
    answer: 2,
    emoji: '🥤',
    fact: 'Empty ↔ Full. An empty glass has nothing in it; a full glass is filled to the top!'
  },
  {
    q: 'What is the antonym of "begin"?',
    choices: ['Start', 'Launch', 'Open', 'End'],
    answer: 3,
    emoji: '🏁',
    fact: 'Begin ↔ End. A story has a beginning and an end. Synonyms for begin: start, commence, initiate.'
  },
  {
    q: 'What is the antonym of "rough"?',
    choices: ['Jagged', 'Bumpy', 'Coarse', 'Smooth'],
    answer: 3,
    emoji: '🪨',
    fact: 'Rough ↔ Smooth. Sandpaper feels rough; glass feels smooth. They describe texture!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🔤' : '📖';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Word Master!' : pct >= 0.7 ? 'Opposite Expert!' : 'Keep Learning!';
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

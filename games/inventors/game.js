'use strict';
const QUESTIONS = [
  {
    q: 'Who invented the telephone?',
    choices: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Benjamin Franklin'],
    answer: 1,
    emoji: '📞',
    fact: 'Alexander Graham Bell made the first telephone call in 1876. His first words were: "Mr. Watson, come here!"'
  },
  {
    q: 'Who invented the light bulb (improved it for practical use)?',
    choices: ['Alexander Bell', 'Nikola Tesla', 'Thomas Edison', 'Albert Einstein'],
    answer: 2,
    emoji: '💡',
    fact: 'Thomas Edison developed the first practical light bulb in 1879 after thousands of experiments!'
  },
  {
    q: 'Who invented the airplane?',
    choices: ['Henry Ford', 'Wright Brothers', 'Charles Lindbergh', 'Nikola Tesla'],
    answer: 1,
    emoji: '✈️',
    fact: 'Orville and Wilbur Wright made the first powered airplane flight in 1903 at Kitty Hawk, North Carolina!'
  },
  {
    q: 'Who is known as the inventor of the World Wide Web (internet website system)?',
    choices: ['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee', 'Elon Musk'],
    answer: 2,
    emoji: '🌐',
    fact: 'Tim Berners-Lee invented the World Wide Web in 1989. He made it free for everyone to use!'
  },
  {
    q: 'Who invented the printing press?',
    choices: ['Leonardo da Vinci', 'Johannes Gutenberg', 'Isaac Newton', 'Galileo'],
    answer: 1,
    emoji: '📰',
    fact: 'Johannes Gutenberg invented the movable-type printing press around 1440. It made books available to everyone!'
  },
  {
    q: 'Benjamin Franklin discovered that lightning is...',
    choices: ['Sound waves', 'Electricity', 'Heat energy', 'Light beams'],
    answer: 1,
    emoji: '⚡',
    fact: 'Franklin flew a kite in a thunderstorm in 1752 to prove lightning is electricity. He also invented the lightning rod!'
  },
  {
    q: 'Marie Curie was a famous scientist known for her work with...',
    choices: ['Electricity', 'Gravity', 'Radioactivity', 'Astronomy'],
    answer: 2,
    emoji: '⚛️',
    fact: 'Marie Curie was the first woman to win a Nobel Prize — and won TWO (Physics and Chemistry)! She discovered radium.'
  },
  {
    q: 'Who developed the theory of gravity after (supposedly) seeing an apple fall?',
    choices: ['Albert Einstein', 'Galileo', 'Isaac Newton', 'Charles Darwin'],
    answer: 2,
    emoji: '🍎',
    fact: 'Isaac Newton developed his laws of gravity around 1666. His ideas explained why planets orbit the sun!'
  },
  {
    q: 'Charles Darwin is famous for his theory of...',
    choices: ['Gravity', 'Relativity', 'Evolution by natural selection', 'Electricity'],
    answer: 2,
    emoji: '🐢',
    fact: "Charles Darwin's theory (1859) explains how species evolve over time through natural selection. Survival of the fittest!"
  },
  {
    q: 'Who invented the steam engine that powered the Industrial Revolution?',
    choices: ['James Watt', 'Henry Ford', 'Thomas Edison', 'Wright Brothers'],
    answer: 0,
    emoji: '🚂',
    fact: 'James Watt greatly improved the steam engine in 1769. It powered factories, trains, and changed the world!'
  },
  {
    q: 'Albert Einstein is most famous for which scientific theory?',
    choices: ['Theory of gravity', 'Theory of evolution', 'Theory of relativity', 'Germ theory'],
    answer: 2,
    emoji: '🧪',
    fact: "E=mc²! Einstein's theory of relativity (1905) showed that energy and mass are related, changing physics forever!"
  },
  {
    q: 'Who invented the car (automobile)?',
    choices: ['Henry Ford', 'Karl Benz', 'James Watt', 'Nikola Tesla'],
    answer: 1,
    emoji: '🚗',
    fact: 'Karl Benz built the first true automobile in 1885. Henry Ford later made cars affordable for everyone!'
  },
  {
    q: 'Nikola Tesla was a rival of Thomas Edison and is famous for inventing...',
    choices: [
      'Direct current (DC)',
      'Alternating current (AC) and radio',
      'The telephone',
      'The steam engine'
    ],
    answer: 1,
    emoji: '⚡',
    fact: "Tesla's AC power system is what we use today! He also contributed to radio, X-rays, and remote control."
  },
  {
    q: 'Who invented the microscope, allowing us to see tiny organisms?',
    choices: ['Galileo Galilei', 'Antonie van Leeuwenhoek', 'Louis Pasteur', 'Robert Hooke'],
    answer: 1,
    emoji: '🔬',
    fact: 'Antonie van Leeuwenhoek made powerful microscopes in the 1670s and was the first to see bacteria and protozoa!'
  },
  {
    q: 'Galileo Galilei improved the telescope and discovered...',
    choices: ['X-rays', 'Gravity', "Jupiter's moons", 'Oxygen'],
    answer: 2,
    emoji: '🔭',
    fact: "Galileo (1610) discovered 4 of Jupiter's moons — proving not everything orbits Earth. This changed astronomy!"
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '💡' : '🔬';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Genius Award!' : pct >= 0.7 ? 'Future Inventor!' : 'Keep Discovering!';
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

'use strict';

const QUESTIONS = [
  {
    q: 'A see-saw is an example of which simple machine?',
    choices: ['Pulley', 'Lever', 'Wheel and Axle', 'Wedge'],
    answer: 1,
    emoji: '🎢',
    fact: 'A lever is a bar that pivots on a fulcrum. See-saws, crowbars, and scissors are levers!'
  },
  {
    q: 'A ramp (sloped surface) is an example of which simple machine?',
    choices: ['Lever', 'Pulley', 'Inclined Plane', 'Screw'],
    answer: 2,
    emoji: '🛤️',
    fact: 'An inclined plane reduces the force needed to move something upward. Ramps, slides, and hills are inclined planes!'
  },
  {
    q: 'A flagpole uses which simple machine to raise the flag?',
    choices: ['Lever', 'Pulley', 'Wedge', 'Screw'],
    answer: 1,
    emoji: '🚩',
    fact: 'A pulley is a wheel with a groove for a rope. It changes the direction of force — pull down, flag goes up!'
  },
  {
    q: 'What does a simple machine do?',
    choices: [
      'Creates energy from nothing',
      'Makes work easier by changing force or direction',
      'Makes things move without any force',
      'Converts food to energy'
    ],
    answer: 1,
    emoji: '⚙️',
    fact: 'Simple machines make work easier — they can change the direction of force or reduce the force needed!'
  },
  {
    q: 'A doorknob is an example of which simple machine?',
    choices: ['Lever', 'Pulley', 'Wheel and Axle', 'Wedge'],
    answer: 2,
    emoji: '🚪',
    fact: 'A doorknob is a wheel and axle. The knob (wheel) turns the shaft (axle) — multiplying your turning force!'
  },
  {
    q: 'An axe or a knife blade is which type of simple machine?',
    choices: ['Lever', 'Pulley', 'Inclined Plane', 'Wedge'],
    answer: 3,
    emoji: '🔪',
    fact: 'A wedge is a double inclined plane — it converts force downward into force that splits or lifts things apart!'
  },
  {
    q: 'A screw is actually a type of which simple machine wrapped in a spiral?',
    choices: ['Lever', 'Wedge', 'Inclined Plane', 'Pulley'],
    answer: 2,
    emoji: '🔩',
    fact: 'A screw is an inclined plane wrapped in a spiral! As it turns, it moves along the inclined plane.'
  },
  {
    q: 'Using a long lever arm gives you...',
    choices: [
      'Less force needed',
      'More speed but same force',
      'Same force needed',
      'Less distance'
    ],
    answer: 0,
    emoji: '📏',
    fact: "The longer the lever arm (effort arm), the less force you need. That's why crowbars are long!"
  },
  {
    q: 'Scissors are a combination of which two simple machines?',
    choices: ['Pulley and lever', 'Lever and wedge', 'Wheel and inclined plane', 'Screw and wedge'],
    answer: 1,
    emoji: '✂️',
    fact: 'Scissors = lever (the pivot/pin) + wedge (the sharp blade). Two simple machines in one!'
  },
  {
    q: 'A block and tackle (multiple pulleys) helps you...',
    choices: [
      'Lift heavier things with less force',
      'Lift lighter things with more force',
      'Create energy',
      'Reduce friction only'
    ],
    answer: 0,
    emoji: '🏗️',
    fact: 'Multiple pulleys (block and tackle) multiply your force — cranes use this to lift very heavy loads!'
  },
  {
    q: 'Which simple machine would help you split a log of wood?',
    choices: ['Pulley', 'Lever', 'Wedge', 'Screw'],
    answer: 2,
    emoji: '🪵',
    fact: 'An axe blade is a wedge — the thin edge concentrates force to split the wood apart.'
  },
  {
    q: 'A bicycle wheel and pedals is an example of...',
    choices: ['Lever', 'Pulley', 'Wheel and Axle', 'Inclined Plane'],
    answer: 2,
    emoji: '🚲',
    fact: 'Bicycle pedals turn the axle (chain ring). The wheel and axle multiplies your pedaling force!'
  },
  {
    q: 'Using an inclined plane instead of lifting straight up requires...',
    choices: [
      'More force over less distance',
      'Less force over more distance',
      'Same force',
      'Double the force'
    ],
    answer: 1,
    emoji: '⬆️',
    fact: 'Ramps need less force but you push over a longer distance. Same total work, easier effort!'
  },
  {
    q: 'What is the fulcrum of a lever?',
    choices: ['The long arm', 'The weight being moved', 'The pivot point', 'The effort force'],
    answer: 2,
    emoji: '⚖️',
    fact: 'The fulcrum is the pivot point — the fixed point a lever rotates around. Like the middle of a see-saw!'
  },
  {
    q: 'Which simple machine is used in a well bucket system?',
    choices: ['Wedge', 'Screw', 'Pulley', 'Lever'],
    answer: 2,
    emoji: '🪣',
    fact: 'Wells use a pulley to make it easier to lift the heavy bucket of water from deep underground!'
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '⚙️' : '🔧';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Engineer Expert!' : pct >= 0.7 ? 'Mighty Mechanic!' : 'Keep Tinkering!';
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

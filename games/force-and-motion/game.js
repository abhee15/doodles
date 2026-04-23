'use strict';
const QUESTIONS = [
  {
    q: 'What is a FORCE?',
    choices: [
      'A type of energy stored in food',
      'A push or pull that can change motion',
      'The speed of an object',
      'A kind of electricity'
    ],
    answer: 1,
    emoji: '💪',
    fact: 'A force is a PUSH or PULL. Forces can make things start moving, stop, speed up, slow down, or change direction!'
  },
  {
    q: 'When you PUSH a shopping cart, you are applying a...',
    choices: ['Gravity force', 'Magnetic force', 'Contact force', 'Electric force'],
    answer: 2,
    emoji: '🛒',
    fact: 'Pushing a cart is a CONTACT force — you must touch the object to apply it. Gravity and magnetism work without touching!'
  },
  {
    q: 'What is GRAVITY?',
    choices: [
      'A push force from the ground',
      'A force that pulls objects toward each other',
      'The force from spinning',
      'A type of friction'
    ],
    answer: 1,
    emoji: '🌍',
    fact: "Gravity pulls ALL objects toward each other. Earth's gravity pulls you DOWN, keeping you on the ground!"
  },
  {
    q: 'A book rests on a table. The table pushes UP on the book. This force is called...',
    choices: ['Gravity', 'Normal force', 'Friction', 'Tension'],
    answer: 1,
    emoji: '📚',
    fact: 'The NORMAL FORCE is the surface pushing back. The book pushes down (gravity), the table pushes up (normal) — they balance!'
  },
  {
    q: 'FRICTION is a force that...',
    choices: [
      'Makes things move faster',
      'Pulls things downward',
      'Opposes or slows motion between surfaces',
      'Pushes things apart'
    ],
    answer: 2,
    emoji: '🛝',
    fact: 'Friction SLOWS things down! Rough surfaces create more friction than smooth ones. Your brakes use friction to stop your bike!'
  },
  {
    q: 'Why does a ball slow down and stop when rolled on a carpet?',
    choices: [
      'Gravity pulled it sideways',
      'Friction between ball and carpet',
      'The ball ran out of force',
      'It became too heavy'
    ],
    answer: 1,
    emoji: '🎱',
    fact: 'FRICTION between the ball and the carpet surface slows the ball down. Smooth floors (less friction) let it roll much farther!'
  },
  {
    q: "Isaac Newton's First Law says: an object at rest stays at rest unless...",
    choices: ['It gets heavier', 'A force acts on it', 'The temperature changes', 'Time passes'],
    answer: 1,
    emoji: '🍎',
    fact: "Newton's First Law = INERTIA. Objects keep doing what they're doing (resting or moving) unless a force changes them!"
  },
  {
    q: 'If two equal forces push on an object from OPPOSITE directions, the object will...',
    choices: [
      'Move to the right',
      'Move to the left',
      'Stay still (balanced forces)',
      'Spin around'
    ],
    answer: 2,
    emoji: '⚖️',
    fact: 'Equal forces from opposite directions = BALANCED forces. The net force is zero, so the object does not move!'
  },
  {
    q: 'A stronger force will make an object...',
    choices: [
      'Move more slowly',
      'Accelerate more (speed up faster)',
      'Stay perfectly still',
      'Become lighter'
    ],
    answer: 1,
    emoji: '🚀',
    fact: "Newton's Second Law: F = ma. Greater force → greater acceleration. Push a ball harder and it goes faster!"
  },
  {
    q: 'Which surface would create the MOST friction for a sliding block?',
    choices: ['Ice', 'Polished marble', 'Sandpaper', 'Wet glass'],
    answer: 2,
    emoji: '🧱',
    fact: 'SANDPAPER has the roughest surface → most friction! Ice and smooth glass have very little friction, so things slide easily!'
  },
  {
    q: 'A magnet pulls a paper clip without touching it. This is called...',
    choices: ['Contact force', 'Friction force', 'Normal force', 'Non-contact (magnetic) force'],
    answer: 3,
    emoji: '🧲',
    fact: 'Magnetic force works at a DISTANCE — no touching needed! Gravity and electric forces also work without contact!'
  },
  {
    q: 'When you throw a ball upward, what force makes it come back down?',
    choices: ['The throw force', 'Friction from air', 'Gravity', 'Magnetic force'],
    answer: 2,
    emoji: '⚾',
    fact: "GRAVITY constantly pulls everything toward Earth's center. The moment you release the ball, gravity starts pulling it back down!"
  },
  {
    q: 'What happens when UNBALANCED forces act on an object?',
    choices: [
      'Nothing changes',
      'The object changes its motion',
      'The object disappears',
      'Forces cancel out'
    ],
    answer: 1,
    emoji: '⚡',
    fact: 'UNBALANCED forces create a net force → the object accelerates (changes speed or direction). This is how things start moving!'
  },
  {
    q: "Seat belts in a car use Newton's First Law. Why?",
    choices: [
      'To create friction',
      'To stop you moving forward when the car stops suddenly',
      'To increase gravity',
      'To slow the car down'
    ],
    answer: 1,
    emoji: '🚗',
    fact: 'INERTIA! When a car stops, your body wants to keep moving forward. The seatbelt applies a force to stop you safely!'
  },
  {
    q: 'Which has MORE gravitational pull on you: Earth or the Moon?',
    choices: [
      'Moon (bigger)',
      'Earth (more mass)',
      'They are equal',
      'Neither — gravity is constant'
    ],
    answer: 1,
    emoji: '🌙',
    fact: "Earth has much more MASS than the Moon, so Earth's gravity is ~6× stronger. You'd weigh much less on the Moon!"
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🚀' : '💪';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Force Expert!' : pct >= 0.7 ? 'Physics Star!' : 'Keep Pushing!';
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

'use strict';
const QUESTIONS = [
  {
    q: 'Sound is created by...',
    choices: [
      'Light hitting objects',
      'Vibrations that travel through matter',
      'Magnetic forces',
      'Electrons moving'
    ],
    answer: 1,
    emoji: '🔊',
    fact: 'Sound = VIBRATIONS! A guitar string vibrates → air molecules vibrate → your eardrum vibrates → you hear sound!'
  },
  {
    q: 'Sound CANNOT travel through...',
    choices: ['Air', 'Water', 'Steel', 'A vacuum (empty space)'],
    answer: 3,
    emoji: '🚀',
    fact: "Sound needs MATTER to travel! In space (vacuum) there's nothing to vibrate — that's why space is completely silent!"
  },
  {
    q: 'Which travels FASTER: sound or light?',
    choices: [
      'Sound (sound is stronger)',
      'They travel at the same speed',
      'Light (about 1 million× faster)',
      'It depends on the day'
    ],
    answer: 2,
    emoji: '⚡',
    fact: "LIGHT wins! Light ≈ 300,000 km/s. Sound ≈ 340 m/s. That's why you see lightning BEFORE hearing thunder!"
  },
  {
    q: 'What is the SPEED OF SOUND in air approximately?',
    choices: [
      '340 meters per second',
      '300,000 km per second',
      '10 km per second',
      '1 meter per second'
    ],
    answer: 0,
    emoji: '🔉',
    fact: 'Sound travels about 340 m/s in air — fast! But sound travels even FASTER through liquids and solids (denser medium)!'
  },
  {
    q: 'REFLECTION of light means light...',
    choices: [
      'Is absorbed completely',
      'Bends as it enters a new medium',
      'Bounces off a surface',
      'Slows down to a stop'
    ],
    answer: 2,
    emoji: '🪞',
    fact: 'REFLECTION: light bounces off surfaces! Mirrors reflect almost all light. Rough surfaces scatter light in many directions!'
  },
  {
    q: 'REFRACTION of light means light...',
    choices: [
      'Is absorbed',
      'Bounces back',
      'Bends when passing from one medium to another',
      'Disappears'
    ],
    answer: 2,
    emoji: '🔭',
    fact: 'REFRACTION: light bends when it changes medium (e.g., air → water). This is why a straw looks "bent" in a glass of water!'
  },
  {
    q: 'A RAINBOW forms when...',
    choices: [
      'Light bounces off clouds',
      'Light refracts through water droplets, separating colors',
      'Sound and light collide',
      'The sun sets behind rain'
    ],
    answer: 1,
    emoji: '🌈',
    fact: 'Raindrops act as tiny prisms! Light enters, slows, bends, reflects, then bends again — separating into ROYGBIV colors!'
  },
  {
    q: 'What are the colors of the visible spectrum in order?',
    choices: [
      'Blue, Green, Red, Yellow',
      'Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV)',
      'Purple, Pink, White, Black',
      'Green, Orange, Blue, Red'
    ],
    answer: 1,
    emoji: '🌈',
    fact: "Remember ROYGBIV! Red has the longest wavelength (bends least). Violet has the shortest (bends most) — that's why they separate!"
  },
  {
    q: 'Why does the sky appear BLUE?',
    choices: [
      'The ocean reflects up into it',
      'Blue paint from clouds',
      'Atmosphere scatters blue light more than other colors',
      'Blue is the color of air'
    ],
    answer: 2,
    emoji: '🌤️',
    fact: "RAYLEIGH SCATTERING: blue light has a shorter wavelength and scatters more in our atmosphere. That's why the sky is blue!"
  },
  {
    q: 'A HIGH-PITCHED sound has...',
    choices: [
      'Few vibrations per second (low frequency)',
      'Many vibrations per second (high frequency)',
      'More volume',
      'Slower speed'
    ],
    answer: 1,
    emoji: '🎵',
    fact: 'PITCH = frequency. High pitch = more vibrations per second (Hz). A dog whistle is ~40,000 Hz — too high for human ears!'
  },
  {
    q: 'What is AMPLITUDE of a sound wave?',
    choices: [
      'How fast the wave travels',
      'How many waves pass per second',
      'The height of the wave (related to loudness)',
      'The color of sound'
    ],
    answer: 2,
    emoji: '📊',
    fact: 'AMPLITUDE = wave height = LOUDNESS. Higher amplitude → louder sound. Measured in decibels (dB)!'
  },
  {
    q: 'Light from the sun is...',
    choices: [
      'Only yellow light',
      'Only visible light',
      'White light containing all colors',
      'Infrared only'
    ],
    answer: 2,
    emoji: '☀️',
    fact: 'Sunlight is WHITE light — ALL colors combined! A prism separates it into the full visible spectrum!'
  },
  {
    q: 'ECHO is caused by...',
    choices: [
      'Light interfering with sound',
      'Sound reflecting off a distant surface',
      'Two sounds created at once',
      'Air absorbing sound'
    ],
    answer: 1,
    emoji: '🏔️',
    fact: 'ECHO = reflected sound! Sound bounces off a cliff or wall and returns to your ears. You need at least ~17m of distance!'
  },
  {
    q: 'How does a PRISM separate white light into colors?',
    choices: [
      'It creates new colors from air',
      'It blocks some colors',
      'Different colors refract at different angles',
      'It reflects colors from inside'
    ],
    answer: 2,
    emoji: '🔺',
    fact: 'Each color of light bends at a DIFFERENT angle in glass. Violet bends most, red bends least — creating the spectrum!'
  },
  {
    q: 'Opaque objects...',
    choices: [
      'Let all light through',
      'Let some light through',
      'Block all light (cast a shadow)',
      'Reflect all light perfectly'
    ],
    answer: 2,
    emoji: '🟫',
    fact: 'OPAQUE blocks all light (wood, metal). TRANSLUCENT lets some through (frosted glass). TRANSPARENT lets all through (clear glass)!'
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
  document.getElementById('wave-icon').textContent =
    state.current.emoji === '🌈' || state.current.emoji === '🔺' ? '🔴🟠🟡🟢🔵🟣' : '〰️〰️〰️';
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
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🌈' : '🔊';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Light Scientist!' : pct >= 0.7 ? 'Wave Expert!' : 'Keep Exploring!';
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

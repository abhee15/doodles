'use strict';

const LEVELS = [
  {
    id: 'easy',
    label: 'Easy',
    emoji: '🌟',
    pairs: [
      { country: 'France', capital: 'Paris', distractors: ['London', 'Berlin', 'Rome'] },
      {
        country: 'United States',
        capital: 'Washington D.C.',
        distractors: ['New York', 'Los Angeles', 'Chicago']
      },
      { country: 'Japan', capital: 'Tokyo', distractors: ['Beijing', 'Seoul', 'Bangkok'] },
      {
        country: 'Australia',
        capital: 'Canberra',
        distractors: ['Sydney', 'Melbourne', 'Brisbane']
      },
      {
        country: 'Brazil',
        capital: 'Brasília',
        distractors: ['Rio de Janeiro', 'São Paulo', 'Salvador']
      },
      { country: 'China', capital: 'Beijing', distractors: ['Shanghai', 'Hong Kong', 'Tokyo'] },
      {
        country: 'United Kingdom',
        capital: 'London',
        distractors: ['Edinburgh', 'Manchester', 'Dublin']
      },
      { country: 'India', capital: 'New Delhi', distractors: ['Mumbai', 'Kolkata', 'Chennai'] },
      { country: 'Canada', capital: 'Ottawa', distractors: ['Toronto', 'Vancouver', 'Montreal'] },
      {
        country: 'Mexico',
        capital: 'Mexico City',
        distractors: ['Guadalajara', 'Monterrey', 'Cancún']
      }
    ]
  },
  {
    id: 'medium',
    label: 'Medium',
    emoji: '🔥',
    pairs: [
      { country: 'Germany', capital: 'Berlin', distractors: ['Munich', 'Hamburg', 'Frankfurt'] },
      {
        country: 'Russia',
        capital: 'Moscow',
        distractors: ['St Petersburg', 'Novosibirsk', 'Vladivostok']
      },
      {
        country: 'South Africa',
        capital: 'Pretoria',
        distractors: ['Cape Town', 'Johannesburg', 'Durban']
      },
      { country: 'Egypt', capital: 'Cairo', distractors: ['Alexandria', 'Luxor', 'Aswan'] },
      {
        country: 'Argentina',
        capital: 'Buenos Aires',
        distractors: ['Santiago', 'Lima', 'Bogotá']
      },
      { country: 'Spain', capital: 'Madrid', distractors: ['Barcelona', 'Seville', 'Valencia'] },
      { country: 'Nigeria', capital: 'Abuja', distractors: ['Lagos', 'Kano', 'Port Harcourt'] },
      { country: 'South Korea', capital: 'Seoul', distractors: ['Busan', 'Incheon', 'Daegu'] },
      { country: 'Italy', capital: 'Rome', distractors: ['Milan', 'Naples', 'Venice'] },
      { country: 'Saudi Arabia', capital: 'Riyadh', distractors: ['Jeddah', 'Mecca', 'Medina'] }
    ]
  },
  {
    id: 'hard',
    label: 'Hard',
    emoji: '💎',
    pairs: [
      {
        country: 'Kazakhstan',
        capital: 'Astana',
        distractors: ['Almaty', 'Shymkent', 'Karaganda']
      },
      {
        country: 'New Zealand',
        capital: 'Wellington',
        distractors: ['Auckland', 'Christchurch', 'Hamilton']
      },
      { country: 'Pakistan', capital: 'Islamabad', distractors: ['Karachi', 'Lahore', 'Peshawar'] },
      { country: 'Ghana', capital: 'Accra', distractors: ['Kumasi', 'Tamale', 'Sekondi'] },
      { country: 'Vietnam', capital: 'Hanoi', distractors: ['Ho Chi Minh City', 'Da Nang', 'Hue'] },
      { country: 'Morocco', capital: 'Rabat', distractors: ['Casablanca', 'Marrakech', 'Fez'] },
      { country: 'Portugal', capital: 'Lisbon', distractors: ['Porto', 'Braga', 'Coimbra'] },
      { country: 'Peru', capital: 'Lima', distractors: ['Cusco', 'Arequipa', 'Trujillo'] },
      { country: 'Sweden', capital: 'Stockholm', distractors: ['Gothenburg', 'Malmö', 'Uppsala'] },
      { country: 'Philippines', capital: 'Manila', distractors: ['Cebu', 'Davao', 'Quezon City'] }
    ]
  }
];

const TOTAL = 10;
const state = { levelIdx: 0, score: 0, round: 0, used: new Set(), current: null, answered: false };

function currentLevel() {
  return LEVELS[state.levelIdx];
}
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function pickPair() {
  const pool = currentLevel().pairs;
  const avail = pool
    .map(function (_, i) {
      return i;
    })
    .filter(function (i) {
      return !state.used.has(i);
    });
  if (avail.length === 0) {
    state.used.clear();
    return pickPair();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return pool[idx];
}

function startRound() {
  state.current = pickPair();
  state.answered = false;
  document.getElementById('round-label').textContent = `Round ${state.round + 1} of ${TOTAL}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('country-display').textContent = state.current.country;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  buildChoices();
  showScreen('screen-game');
}

function buildChoices() {
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  const choices = [state.current.capital, ...state.current.distractors].sort(function () {
    return Math.random() - 0.5;
  });
  choices.forEach(function (city) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = city;
    btn.addEventListener('click', function () {
      handleChoice(btn, city);
    });
    grid.appendChild(btn);
  });
}

function handleChoice(btn, chosen) {
  if (state.answered) {
    return;
  }
  state.answered = true;
  const correct = state.current.capital;
  document.querySelectorAll('.choice-btn').forEach(function (b) {
    b.disabled = true;
    if (b.textContent === correct) {
      b.classList.add('correct-choice');
    }
  });
  if (chosen === correct) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    document.getElementById('feedback').textContent =
      `✅ Yes! ${correct} is the capital of ${state.current.country}!`;
    document.getElementById('feedback').className = 'feedback good';
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1100);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    document.getElementById('feedback').textContent = `❌ It's ${correct}!`;
    document.getElementById('feedback').className = 'feedback bad';
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1600);
  }
}

function showResult() {
  const pct = state.score / TOTAL;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🌍' : '🗺️';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Geography Expert!' : pct >= 0.7 ? 'World Explorer!' : 'Keep Exploring!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL} correct`;
  document.getElementById('result-level').textContent = `${currentLevel().label} level`;
  showScreen('screen-result');
}

document.addEventListener('DOMContentLoaded', function () {
  const picker = document.getElementById('level-picker');
  LEVELS.forEach(function (lv, i) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.innerHTML = `<span class="lv-emoji">${lv.emoji}</span><span class="lv-label">${lv.label}</span>`;
    btn.addEventListener('click', function () {
      state.levelIdx = i;
      state.score = 0;
      state.round = 0;
      state.used.clear();
      startRound();
    });
    picker.appendChild(btn);
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

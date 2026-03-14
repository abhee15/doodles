/* eslint-disable no-undef */
/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const COUNTRIES = [
  {
    id: 'chile',
    name: 'Chile',
    capital: 'Santiago',
    region: 'roots',
    emoji: '🌶️',
    fact: 'Chile is the longest country on Earth - 4,300 km from north to south!',
    story:
      "🌶️ Chile's ROOT is the thinnest and most stretched of all - long and skinny like a chili pepper dangling down to Patagonia!"
  },
  {
    id: 'argentina',
    name: 'Argentina',
    capital: 'Buenos Aires',
    region: 'roots',
    emoji: '🐴',
    fact: 'Argentina is home to tango, gauchos, and the tango dance that started in Buenos Aires.',
    story:
      "🐴 Argentina's ROOT grows tall and deep - just like a gaucho riding his horse across endless pampas! Stomp, stomp, stomp!"
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    capital: 'Montevideo',
    region: 'roots',
    emoji: '⚽',
    fact: 'Uruguay won the first two FIFA World Cups (1930 and 1950) with just 3 million people!',
    story:
      "⚽ Uruguay's ROOT is small but mighty - like a soccer ball buried underground, ready to kick and score spectacular goals!"
  },
  {
    id: 'paraguay',
    name: 'Paraguay',
    capital: 'Asunción',
    region: 'roots',
    emoji: '🌊',
    fact: "Paraguay is landlocked but has two of South America's largest rivers: the Paraguay and Parana.",
    story:
      "🌊 Paraguay's ROOT curves and twists like a river snake - the Parana River winds through underground, quenching the tree's thirst!"
  },
  {
    id: 'brazil',
    name: 'Brazil',
    capital: 'Brasilia',
    region: 'trunk',
    emoji: '🎭',
    fact: 'Brazil is the largest country in South America and is famous for carnival, rainforests, and Christ the Redeemer statue.',
    story:
      "🎭 Brazil IS the TRUNK - the strongest, thickest, tallest part of the entire tree! The whole tree rests on Brazil's mighty wooden shoulders!"
  },
  {
    id: 'bolivia',
    name: 'Bolivia',
    capital: 'La Paz',
    region: 'left-branch',
    emoji: '⛰️',
    fact: 'Bolivia is one of only two landlocked countries in South America and contains Lake Titicaca, the highest lake in the world.',
    story:
      '⛰️ Bolivia is the first BRANCH on the left - it reaches out with snowy peaks and ancient mountain wisdom, touching the sky!'
  },
  {
    id: 'peru',
    name: 'Peru',
    capital: 'Lima',
    region: 'left-branch',
    emoji: '🏛️',
    fact: 'Peru is home to the ancient Inca Empire and the incredible Machu Picchu, one of the Seven Wonders of the World.',
    story:
      "🏛️ Peru's BRANCH stretches upward and curves - Machu Picchu sits on top like a bird's nest, watching over the misty mountains!"
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
    capital: 'Quito',
    region: 'left-branch',
    emoji: '🐢',
    fact: "Ecuador is named after the Equator that runs through it. The Galapagos Islands, famous for Darwin's finches, belong to Ecuador.",
    story:
      "🐢 Ecuador's BRANCH stretches higher and thinner - the Galapagos Islands are hanging from it like exotic fruits, full of rare creatures!"
  },
  {
    id: 'colombia',
    name: 'Colombia',
    capital: 'Bogota',
    region: 'left-branch',
    emoji: '☕',
    fact: "Colombia produces the world's finest coffee and is known for its vibrant culture, music, and biodiversity.",
    story:
      "☕ Colombia's BRANCH is the topmost on the left, reaching into the clouds! Coffee beans grow all over it like magical decorations!"
  },
  {
    id: 'venezuela',
    name: 'Venezuela',
    capital: 'Caracas',
    region: 'crown',
    emoji: '💎',
    fact: "Venezuela has Angel Falls, the world's highest uninterrupted waterfall at 979 meters!",
    story:
      '💎 Venezuela is the first jewel in the CROWN - sparkling at the top like a crown gem, with water cascading down Angel Falls like liquid diamonds!'
  },
  {
    id: 'guyana',
    name: 'Guyana',
    capital: 'Georgetown',
    region: 'crown',
    emoji: '🦁',
    fact: 'Guyana is home to the Amazon rainforest and jaguars, pumas, and over 300 species of birds.',
    story:
      '🦁 Guyana is the second crown jewel - wild and untamed! Jaguars and pumas prowl through its emerald rainforests like regal guardians!'
  },
  {
    id: 'suriname',
    name: 'Suriname',
    capital: 'Paramaribo',
    region: 'crown',
    emoji: '🏝️',
    fact: 'Suriname is the smallest independent country in South America and was once a Dutch colony.',
    story:
      "🏝️ Suriname is the final crown jewel at the very top - small, magical, and mysterious! It completes the tree's majestic crown of leaves!"
  }
];

const REGION_COLORS = {
  roots: '#8b6914',
  trunk: '#2d5a1b',
  'left-branch': '#388e3c',
  crown: '#00897b'
};

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */

// eslint-disable-next-line prefer-const
let gameState = {
  step: 0,
  screen: 'landing',
  quizScore: 0,
  quizOrder: [],
  quizAnswered: 0
};

/* ═══════════════════════════════════════════════════
   SCREENS
═══════════════════════════════════════════════════ */

function showScreen(name) {
  document.querySelectorAll('.dom-screen').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-screen="${name}"]`).classList.add('active');
  gameState.screen = name;
}

/* ═══════════════════════════════════════════════════
   INITIALIZATION
═══════════════════════════════════════════════════ */

function init() {
  // Clone tree SVG for quiz
  const treeSvg = document.getElementById('tree-svg');
  const quizTreeSvg = document.getElementById('quiz-tree-svg');
  if (treeSvg && quizTreeSvg) {
    quizTreeSvg.innerHTML = treeSvg.innerHTML;
  }

  // Wire landing button
  document.getElementById('btn-start-learn').addEventListener('click', startLearn);

  // Wire learn buttons
  document.getElementById('btn-prev').addEventListener('click', prevLearn);
  document.getElementById('btn-next').addEventListener('click', advanceLearn);

  // Wire map button
  document.getElementById('btn-start-quiz').addEventListener('click', startQuiz);

  // Wire quiz options (will be created dynamically)
  // Wire score buttons
  document.getElementById('btn-replay').addEventListener('click', startQuiz);
  document.getElementById('btn-view-map').addEventListener('click', () => showScreen('map'));
}

function startLearn() {
  gameState.step = 0;
  gameState.quizScore = 0;
  showScreen('learn');
  revealCountry(0);
  updateProgress();
}

function revealCountry(idx) {
  const country = COUNTRIES[idx];
  const zone = document.getElementById(country.id);

  // Make all unrevealed or visited
  document.querySelectorAll('.tree-zone').forEach(z => {
    z.classList.remove('active');
    if (!z.classList.contains('unrevealed')) {
      z.classList.add('visited');
    }
  });

  // Activate current
  if (zone) {
    zone.classList.remove('unrevealed');
    zone.classList.add('active');
  }

  renderLearnCard(country);
  updateLearnProgress();
  updateMapProgress();
}

function renderLearnCard(country) {
  const infoPanel = document.getElementById('learn-info');
  infoPanel.innerHTML = `
    <div class="zone-badge">${country.region.toUpperCase()}</div>
    <div class="country-num">Country ${gameState.step + 1} of 12</div>
    <div class="country-name">${country.emoji} ${country.name}</div>
    <div class="capital-badge">🏛️ Capital: ${country.capital}</div>

    <div class="fact-card">
      <h4>🌍 Fun Fact</h4>
      <p>${country.fact}</p>
    </div>

    <div class="story-card">
      <h4>🧠 Memory Story</h4>
      <p>${country.story}</p>
    </div>
  `;
}

function updateLearnProgress() {
  const country = COUNTRIES[gameState.step];
  const regionLabel = {
    roots: 'Roots',
    trunk: 'Trunk',
    'left-branch': 'Branches',
    crown: 'Crown'
  };

  document.getElementById('zone-label').textContent = regionLabel[country.region] || 'Region';
  document.getElementById('step-indicator').textContent = `Country ${gameState.step + 1} of 12`;

  const barFill = ((gameState.step + 1) / 12) * 100;
  document.getElementById('learn-bar').style.width = `${barFill}%`;

  // Update dots
  const dotsContainer = document.getElementById('step-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement('div');
    dot.className = 'step-dot';
    if (i < gameState.step) {
      dot.classList.add('done');
    } else if (i === gameState.step) {
      dot.classList.add('active');
    }
    dotsContainer.appendChild(dot);
  }

  // Update nav meta
  document.getElementById('nav-progress').textContent = `${gameState.step + 1} of 12`;

  // Update button states
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  btnPrev.disabled = gameState.step === 0;

  if (gameState.step === 11) {
    btnNext.textContent = 'See the Map! ';
    const icon = document.createElement('i');
    icon.className = 'ti ti-map-2';
    btnNext.appendChild(icon);
  } else {
    btnNext.textContent = 'Next ';
    const icon = document.createElement('i');
    icon.className = 'ti ti-arrow-right';
    btnNext.appendChild(icon);
  }
}

function updateMapProgress() {
  const zonesToShow = COUNTRIES.slice(0, gameState.step + 1);
  document.querySelectorAll('.tree-zone').forEach(z => {
    const countryId = z.id.replace('zone-', '');
    if (zonesToShow.some(c => c.id === countryId)) {
      z.classList.remove('unrevealed');
      z.classList.add('visited');
    }
  });
}

function advanceLearn() {
  if (gameState.step < 11) {
    gameState.step++;
    revealCountry(gameState.step);
  } else {
    // Last country: show map
    showScreen('map');
    colorMapByRegion();
  }
}

function prevLearn() {
  if (gameState.step > 0) {
    gameState.step--;
    revealCountry(gameState.step);
  }
}

function colorMapByRegion() {
  COUNTRIES.forEach(country => {
    const mapZone = document.getElementById(`map-${country.id}`);
    if (mapZone) {
      mapZone.setAttribute('fill', REGION_COLORS[country.region]);
    }
  });
}

function startQuiz() {
  gameState.quizScore = 0;
  gameState.quizAnswered = 0;
  gameState.quizOrder = shuffle([...Array(12).keys()]);
  showScreen('quiz');
  renderQuiz();
}

function renderQuiz() {
  const questionIdx = gameState.quizOrder[gameState.quizAnswered];
  const country = COUNTRIES[questionIdx];

  // Highlight zone in tree
  document.querySelectorAll('#quiz-tree-svg .tree-zone').forEach(z => {
    z.classList.remove('active');
    z.classList.add('visited');
  });

  const zone = document.getElementById(`zone-${country.id}`);
  if (zone) {
    const quizZone = document.getElementById(`zone-${country.id}`);
    if (quizZone) {
      const clonedZone = quizZone.cloneNode(true);
      const originalZone = document.querySelector(`#quiz-tree-svg #zone-${country.id}`);
      if (originalZone) {
        originalZone.parentNode.replaceChild(clonedZone, originalZone);
        clonedZone.classList.add('active');
      }
    }
  }

  // Update question
  document.getElementById('quiz-question').textContent = `${country.emoji}`;

  // Build options (4 countries)
  const options = [country, ...getDistractors(questionIdx, 3)];
  shuffle(options);

  const optionsGrid = document.getElementById('quiz-options');
  optionsGrid.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<div class="opt-emoji">${opt.emoji}</div><div>${opt.name}</div>`;
    btn.addEventListener('click', () => checkAnswer(opt.id === country.id, btn));
    optionsGrid.appendChild(btn);
  });

  updateQuizProgress();
}

function getDistractors(correctIdx, count) {
  const all = COUNTRIES.filter((_, i) => i !== correctIdx);
  const correct = COUNTRIES[correctIdx];

  // Prefer cross-region distractors
  const other = all.filter(c => c.region !== correct.region);
  if (other.length >= count) {
    return shuffle(other).slice(0, count);
  }
  return shuffle(all).slice(0, count);
}

function checkAnswer(isCorrect, btn) {
  const allBtns = document.querySelectorAll('.opt-btn');
  allBtns.forEach(b => (b.disabled = true));

  if (isCorrect) {
    btn.classList.add('correct');
    gameState.quizScore++;
  } else {
    btn.classList.add('wrong');
    // Highlight the correct answer
    const questionIdx = gameState.quizOrder[gameState.quizAnswered];
    const country = COUNTRIES[questionIdx];
    const correctBtn = Array.from(allBtns).find(b => b.textContent.includes(country.name));
    if (correctBtn) {
      correctBtn.classList.add('correct');
    }
  }

  document.getElementById('quiz-score-live').textContent = gameState.quizScore;

  setTimeout(() => {
    gameState.quizAnswered++;
    if (gameState.quizAnswered < 12) {
      renderQuiz();
    } else {
      showScore();
    }
  }, 900);
}

function updateQuizProgress() {
  const barFill = ((gameState.quizAnswered + 1) / 12) * 100;
  document.getElementById('quiz-bar').style.width = `${barFill}%`;

  const dotsContainer = document.getElementById('quiz-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement('div');
    dot.className = 'step-dot';
    if (i < gameState.quizAnswered) {
      dot.classList.add('done');
    } else if (i === gameState.quizAnswered) {
      dot.classList.add('active');
    }
    dotsContainer.appendChild(dot);
  }
}

function showScore() {
  const percent = Math.round((gameState.quizScore / 12) * 100);
  let emoji = '🌟';
  let title = 'Quiz Complete!';
  let sub = "You're a geography master!";

  if (percent === 100) {
    emoji = '🏆';
    title = 'Perfect Score!';
    sub = "You've mastered South America! 🎉";
  } else if (percent >= 83) {
    emoji = '⭐';
    title = 'Excellent!';
    sub = 'You know South America really well!';
  } else if (percent >= 67) {
    emoji = '👍';
    title = 'Great Job!';
    sub = "You're getting better at geography!";
  } else if (percent >= 50) {
    emoji = '💪';
    title = 'Good Effort!';
    sub = 'Keep learning those countries!';
  } else {
    emoji = '🌱';
    title = 'Keep Growing!';
    sub = 'Try again to improve your score!';
  }

  document.getElementById('score-emoji').textContent = emoji;
  document.getElementById('score-title').textContent = title;
  document.getElementById('score-num').textContent = gameState.quizScore;
  document.getElementById('score-out').textContent = 'out of 12 correct';
  document.getElementById('score-sub').textContent = sub;

  showScreen('score');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ═══════════════════════════════════════════════════
   STARTUP
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', init);

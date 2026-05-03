const SOILS = [
  {
    id: 'sandy',
    name: 'Sandy Soil',
    emoji: '🏖️',
    tagline: 'Light & Fast-Draining',
    soilColor: '#D4A96A',
    gradientStart: '#E8C99A',
    gradientEnd: '#C4904A',
    texture: 'Gritty, coarse, loose',
    colorDesc: 'Light tan to pale yellow',
    drainage: 'Excellent — water drains in minutes',
    ph: '5.5 – 7.0 (slightly acidic)',
    nutrients: 'Low',
    nutrientStars: 1,
    composition: { sand: 85, silt: 10, clay: 5, organic: 0 },
    foundIn: ['Deserts', 'Beaches', 'Coastal dunes', 'Riverbeds'],
    foundEmojis: ['🏜️', '🏖️', '🌊', '🏞️'],
    elements: ['Quartz crystals', 'Feldspar', 'Mica flakes'],
    crops: ['Watermelon', 'Peanuts', 'Carrots', 'Cacti'],
    funFact:
      "Sandy soil warms up faster in spring! That's why some plants actually prefer it even though it has fewer nutrients.",
    badgeLabel: 'Sandy Soil Explorer'
  },
  {
    id: 'clay',
    name: 'Clay Soil',
    emoji: '🏺',
    tagline: 'Heavy & Water-Holding',
    soilColor: '#A0522D',
    gradientStart: '#C06040',
    gradientEnd: '#7A3B1E',
    texture: 'Sticky, smooth, plastic when wet',
    colorDesc: 'Reddish-brown to grey',
    drainage: 'Poor — water pools on the surface',
    ph: '6.0 – 7.5 (neutral)',
    nutrients: 'Medium-High',
    nutrientStars: 3,
    composition: { sand: 10, silt: 25, clay: 65, organic: 0 },
    foundIn: ['River valleys', 'Floodplains', 'Tropical regions', 'Heavy rainfall areas'],
    foundEmojis: ['🏞️', '🌊', '🌴', '🌧️'],
    elements: ['Kaolinite', 'Illite', 'Montmorillonite', 'Iron oxides'],
    crops: ['Wheat', 'Oak trees', 'Broccoli', 'Cabbage'],
    funFact:
      'Clay soil was used for thousands of years to make pottery and bricks! Ancient Egyptians built with mud bricks made from Nile clay.',
    badgeLabel: 'Clay Soil Expert'
  },
  {
    id: 'silt',
    name: 'Silt Soil',
    emoji: '🌊',
    tagline: 'Silky & Fertile',
    soilColor: '#8A9A6A',
    gradientStart: '#A8BC7A',
    gradientEnd: '#6A7A4A',
    texture: 'Silky, smooth, flour-like when dry',
    colorDesc: 'Grey to dark grey, sometimes brownish',
    drainage: 'Moderate — holds some water',
    ph: '6.0 – 7.0 (slightly acidic to neutral)',
    nutrients: 'High',
    nutrientStars: 4,
    composition: { sand: 20, silt: 70, clay: 10, organic: 0 },
    foundIn: ['River deltas', 'Floodplains', 'Nile River', 'Mississippi Delta'],
    foundEmojis: ['🌀', '🏞️', '🌍', '🌎'],
    elements: ['Fine quartz', 'Feldspar particles', 'Clay minerals', 'Organic matter'],
    crops: ['Rice', 'Sugarcane', 'Cotton', 'Most vegetables'],
    funFact:
      'The ancient Egyptian civilization grew around the River Nile because the silt soil it deposited every year was incredibly fertile for farming!',
    badgeLabel: 'Silt Soil Scholar'
  },
  {
    id: 'loam',
    name: 'Loam Soil',
    emoji: '🌱',
    tagline: 'The Perfect Balance',
    soilColor: '#6B4226',
    gradientStart: '#8B5E3C',
    gradientEnd: '#4A2D1A',
    texture: 'Crumbly, soft, holds shape loosely',
    colorDesc: 'Rich dark brown',
    drainage: 'Good — balanced water retention',
    ph: '6.0 – 7.0 (slightly acidic)',
    nutrients: 'Very High',
    nutrientStars: 5,
    composition: { sand: 40, silt: 40, clay: 20, organic: 0 },
    foundIn: ['Farmlands', 'Forests', 'Temperate regions', 'Grasslands'],
    foundEmojis: ['🌾', '🌳', '🌿', '🍀'],
    elements: ['Sand particles', 'Silt particles', 'Clay', 'Humus (organic matter)'],
    crops: ['Almost everything! Corn', 'Tomatoes', 'Potatoes', 'Sunflowers'],
    funFact:
      'Loam is called the "gardener\'s best friend" because it has the perfect mix of sand, silt, and clay — plants absolutely love it!',
    badgeLabel: 'Loam Soil Master'
  },
  {
    id: 'peat',
    name: 'Peat Soil',
    emoji: '🌿',
    tagline: 'Dark & Rich in Organic Matter',
    soilColor: '#2D1B0E',
    gradientStart: '#4A2D12',
    gradientEnd: '#1A0D05',
    texture: 'Spongy, fibrous, feels like wet sponge',
    colorDesc: 'Very dark brown to almost black',
    drainage: 'Very poor — holds huge amounts of water',
    ph: '3.5 – 5.5 (very acidic)',
    nutrients: 'High (organic), but some nutrients locked',
    nutrientStars: 3,
    composition: { sand: 5, silt: 10, clay: 5, organic: 80 },
    foundIn: ['Bogs & wetlands', 'Scottish Highlands', 'Finland', 'Irish peatlands'],
    foundEmojis: ['🌾', '🏔️', '🌍', '☘️'],
    elements: ['Partially decomposed plants', 'Sphagnum moss', 'Carbon compounds', 'Humic acid'],
    crops: ['Blueberries', 'Cranberries', 'Heather', 'Rhododendrons'],
    funFact:
      'Peat soil forms incredibly slowly — just 1 metre of peat takes over 1,000 years to form! It stores huge amounts of carbon and helps fight climate change.',
    badgeLabel: 'Peat Soil Pioneer'
  },
  {
    id: 'chalk',
    name: 'Chalk Soil',
    emoji: '🪨',
    tagline: 'Stony & Alkaline',
    soilColor: '#E8E0C8',
    gradientStart: '#F0E8D0',
    gradientEnd: '#C8BFA0',
    texture: 'Lumpy, stony, crumbles easily',
    colorDesc: 'Pale white to light grey',
    drainage: 'Very fast — water disappears quickly',
    ph: '7.5 – 8.5 (alkaline)',
    nutrients: 'Low-Medium',
    nutrientStars: 2,
    composition: { sand: 60, silt: 15, clay: 10, organic: 0 },
    foundIn: [
      'Chalk downs (UK)',
      'White Cliffs of Dover',
      'Champagne region (France)',
      'Limestone hills'
    ],
    foundEmojis: ['🇬🇧', '🏔️', '🇫🇷', '⛰️'],
    elements: ['Calcium carbonate (chalk)', 'Limestone fragments', 'Flint nodules', 'Fine clay'],
    crops: ['Lavender', 'Spinach', 'Beets', 'Grapes (wine!)'],
    funFact:
      'The famous White Cliffs of Dover in England are made of chalk! The famous Champagne wine comes from grapes grown in chalk soil in France.',
    badgeLabel: 'Chalk Soil Champion'
  }
];

function generateQuizQuestions() {
  const questions = [];

  SOILS.forEach(soil => {
    // Question 1: Identify by description
    questions.push({
      type: 'identify',
      soilId: soil.id,
      question: `This soil has ${soil.texture}. It's found in ${soil.foundIn[0]}. Which soil is this?`,
      options: shuffle(SOILS.map(s => s.name)),
      correct: SOILS.findIndex(s => s.id === soil.id),
      explanation: `${soil.name}! It's ${soil.tagline}.`
    });

    // Question 2: Fact question
    const factType = ['drainage', 'nutrients', 'ph'][Math.floor(Math.random() * 3)];
    let question2, correct2;
    if (factType === 'drainage') {
      question2 = `${soil.name} has ${soil.drainage}. Is this fast-draining or slow?`;
      const isFastDraining =
        soil.drainage.toLowerCase().includes('excellent') ||
        soil.drainage.toLowerCase().includes('fast');
      const opts = isFastDraining
        ? ['Fast-draining ✓', 'Slow-draining', 'Medium drainage']
        : ['Slow-draining ✓', 'Fast-draining', 'Medium drainage'];
      correct2 = 0;
      questions.push({
        type: 'fact',
        soilId: soil.id,
        question: question2,
        options: shuffle(opts),
        correct: shuffle(opts).indexOf(opts[correct2]),
        explanation: soil.drainage
      });
    } else if (factType === 'nutrients') {
      question2 = `${soil.name} has ${soil.nutrients} nutrients. How good is this for growing plants?`;
      const opts = ['Low nutrients', 'Medium nutrients', 'High nutrients'];
      if (soil.nutrients.includes('Low')) {
        correct2 = 0;
      } else if (soil.nutrients.includes('High') || soil.nutrients.includes('Very High')) {
        correct2 = 2;
      } else {
        correct2 = 1;
      }
      const shuffledOpts = shuffle(opts);
      questions.push({
        type: 'fact',
        soilId: soil.id,
        question: question2,
        options: shuffledOpts,
        correct: shuffledOpts.indexOf(opts[correct2]),
        explanation: `${soil.name} has ${soil.nutrients} nutrients.`
      });
    } else {
      question2 = `${soil.name} has a pH of ${soil.ph}. Is this acidic or alkaline?`;
      const isAcidic = soil.ph.includes('acidic');
      const opts = isAcidic
        ? ['Acidic ✓', 'Alkaline', 'Neutral']
        : ['Alkaline ✓', 'Acidic', 'Neutral'];
      correct2 = 0;
      const shuffledOpts = shuffle(opts);
      questions.push({
        type: 'fact',
        soilId: soil.id,
        question: question2,
        options: shuffledOpts,
        correct: shuffledOpts.indexOf(opts[correct2]),
        explanation: soil.ph
      });
    }
  });

  return questions;
}

const allQuizQuestions = generateQuizQuestions();

const state = {
  screen: 'home',
  currentSoilId: null,
  visitedSoils: new Set(),
  quizQuestions: [],
  quizStep: 0,
  quizScore: 0,
  quizAnswers: {},
  soilQuestionMap: {}
};

function showScreen(screenName) {
  document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${screenName}`).classList.add('active');
  state.screen = screenName;
  window.scrollTo(0, 0);
}

function renderHome() {
  const grid = document.getElementById('soil-grid');
  grid.innerHTML = '';
  SOILS.forEach(soil => {
    const card = document.createElement('div');
    card.className = `soil-card soil-card-${soil.id}`;
    const stars = '⭐'.repeat(soil.nutrientStars) + '☆'.repeat(5 - soil.nutrientStars);
    card.innerHTML = `
      <div class="soil-card-swatch">${soil.emoji}</div>
      <div class="soil-card-content">
        <div>
          <div class="soil-card-name">${soil.name}</div>
          <div class="soil-card-tagline">${soil.tagline}</div>
        </div>
        <div class="soil-card-stars">${stars}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      state.currentSoilId = soil.id;
      state.visitedSoils.add(soil.id);
      renderDetail();
      showScreen('detail');
    });
    grid.appendChild(card);
  });

  const btn = document.getElementById('btn-home-quiz');
  btn.disabled = state.visitedSoils.size === 0;

  document.getElementById('nav-meta').textContent = `${SOILS.length} soils to explore`;
}

function renderDetail() {
  const soil = SOILS.find(s => s.id === state.currentSoilId);
  if (!soil) {
    return;
  }

  const content = document.getElementById('detail-content');
  content.innerHTML = `
    <div class="detail-hero" style="--hero-start: ${soil.gradientStart}; --hero-end: ${soil.gradientEnd};">
      <div class="detail-hero-emoji">${soil.emoji}</div>
      <div class="detail-hero-name">${soil.name}</div>
      <div class="detail-hero-tagline">${soil.tagline}</div>
    </div>

    <div class="detail-section">
      <div class="section-title"><i class="ti ti-layers"></i> Composition</div>
      <div class="composition-grid">
        <div class="comp-bar-row">
          <div class="comp-bar-label"><span>Sand</span><span>${soil.composition.sand}%</span></div>
          <div class="comp-bar-container">
            <div class="comp-bar-fill bar-sand" style="width: 0;"></div>
          </div>
        </div>
        <div class="comp-bar-row">
          <div class="comp-bar-label"><span>Silt</span><span>${soil.composition.silt}%</span></div>
          <div class="comp-bar-container">
            <div class="comp-bar-fill bar-silt" style="width: 0;"></div>
          </div>
        </div>
        <div class="comp-bar-row">
          <div class="comp-bar-label"><span>Clay</span><span>${soil.composition.clay}%</span></div>
          <div class="comp-bar-container">
            <div class="comp-bar-fill bar-clay" style="width: 0;"></div>
          </div>
        </div>
        <div class="comp-bar-row">
          <div class="comp-bar-label"><span>Organic Matter</span><span>${soil.composition.organic}%</span></div>
          <div class="comp-bar-container">
            <div class="comp-bar-fill bar-organic" style="width: 0;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-title"><i class="ti ti-info-circle"></i> Characteristics</div>
      <div class="facts-grid">
        <div class="fact-box">
          <div class="fact-label">Texture</div>
          <div class="fact-value">${soil.texture}</div>
        </div>
        <div class="fact-box">
          <div class="fact-label">Color</div>
          <div class="fact-value">${soil.colorDesc}</div>
        </div>
        <div class="fact-box">
          <div class="fact-label">Drainage</div>
          <div class="fact-value">${soil.drainage}</div>
        </div>
        <div class="fact-box">
          <div class="fact-label">pH Level</div>
          <div class="fact-value">${soil.ph}</div>
        </div>
        <div class="fact-box">
          <div class="fact-label">Nutrients</div>
          <div class="fact-value">${soil.nutrients}</div>
        </div>
        <div class="fact-box">
          <div class="fact-label">Nutrient Rating</div>
          <div class="fact-value">${'⭐'.repeat(soil.nutrientStars)}${' ☆'.repeat(5 - soil.nutrientStars)}</div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-title"><i class="ti ti-map-pin"></i> Found In</div>
      <div class="pills-row">
        ${soil.foundIn
          .map(
            (place, idx) =>
              `<div class="pill"><span class="pill-emoji">${soil.foundEmojis[idx]}</span>${place}</div>`
          )
          .join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="section-title"><i class="ti ti-flask"></i> Key Elements</div>
      <div class="pills-row">
        ${soil.elements.map(el => `<div class="pill">${el}</div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="section-title"><i class="ti ti-plant"></i> Best for Growing</div>
      <div class="pills-row">
        ${soil.crops.map(crop => `<div class="pill"><span class="pill-emoji">🌱</span>${crop}</div>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="fun-fact-box">
        <div class="fun-fact-label"><i class="ti ti-lightbulb"></i> Fun Fact</div>
        <div class="fun-fact-text">${soil.funFact}</div>
      </div>
    </div>
  `;

  setTimeout(() => {
    document.querySelectorAll('.comp-bar-fill').forEach((bar, idx) => {
      const values = [
        soil.composition.sand,
        soil.composition.silt,
        soil.composition.clay,
        soil.composition.organic
      ];
      bar.style.width = `${values[idx]}%`;
    });
  }, 50);

  document.getElementById('nav-meta').textContent = soil.name;
}

function startQuiz() {
  state.quizQuestions = shuffle(allQuizQuestions).slice(0, 10);
  state.quizStep = 0;
  state.quizScore = 0;
  state.quizAnswers = {};
  state.soilQuestionMap = {};

  state.quizQuestions.forEach((q, idx) => {
    if (!state.soilQuestionMap[q.soilId]) {
      state.soilQuestionMap[q.soilId] = [];
    }
    state.soilQuestionMap[q.soilId].push(idx);
  });

  renderQuiz();
  showScreen('quiz');
}

function renderQuiz() {
  const q = state.quizQuestions[state.quizStep];
  if (!q) {
    showResults();
    return;
  }

  const progress = (state.quizStep / state.quizQuestions.length) * 100;
  document.getElementById('quiz-progress').style.width = `${progress}%`;

  document.getElementById('quiz-question').textContent = q.question;
  document.getElementById('quiz-explanation').style.display = 'none';

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';
  const shuffledOptions = shuffle(q.options.map((opt, idx) => ({ text: opt, idx })));

  shuffledOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.addEventListener('click', () =>
      selectAnswer(opt.idx === q.correct, q.soilId, q.explanation)
    );
    optionsContainer.appendChild(btn);
  });

  document.getElementById('nav-meta').textContent =
    `Question ${state.quizStep + 1} of ${state.quizQuestions.length}`;
}

function selectAnswer(isCorrect, soilId, explanation) {
  if (isCorrect) {
    state.quizScore++;
  }

  state.quizAnswers[state.quizStep] = isCorrect;

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.disabled = true;
  });

  const options = document.querySelectorAll('.quiz-option');
  const q = state.quizQuestions[state.quizStep];
  const correctIdx = q.options.indexOf(q.options[q.correct]);

  options.forEach((btn, idx) => {
    if (idx === correctIdx) {
      btn.classList.add('correct');
    } else if (
      isCorrect === false &&
      btn.classList.contains('quiz-option') &&
      !btn.classList.contains('correct')
    ) {
      const isClicked = btn === event.target;
      if (isClicked) {
        btn.classList.add('wrong');
      }
    }
  });

  document.getElementById('quiz-explanation').textContent = explanation;
  document.getElementById('quiz-explanation').style.display = 'flex';

  setTimeout(() => {
    state.quizStep++;
    renderQuiz();
  }, 1200);
}

function showResults() {
  const totalQuestions = state.quizQuestions.length;
  const percentage = state.quizScore / totalQuestions;

  let emoji, title, stars;
  if (percentage === 1) {
    emoji = '🏆';
    title = 'Perfect Score!';
    stars = '⭐⭐⭐';
  } else if (percentage >= 0.8) {
    emoji = '🌟';
    title = 'Excellent Work!';
    stars = '⭐⭐⭐';
  } else if (percentage >= 0.6) {
    emoji = '👍';
    title = 'Good Job!';
    stars = '⭐⭐';
  } else {
    emoji = '💪';
    title = 'Keep Learning!';
    stars = '⭐';
  }

  document.getElementById('results-emoji').textContent = emoji;
  document.getElementById('results-title').textContent = title;
  document.getElementById('results-score').textContent = state.quizScore;
  document.getElementById('results-label').textContent = `out of ${totalQuestions} correct`;
  document.getElementById('results-stars').textContent = stars;

  const badgesContainer = document.getElementById('results-badges');
  badgesContainer.innerHTML = '';

  SOILS.forEach(soil => {
    const badge = document.createElement('div');
    badge.className = 'badge-item';

    const questionIndices = state.soilQuestionMap[soil.id] || [];
    const correctAnswers = questionIndices.filter(idx => state.quizAnswers[idx] === true).length;
    const isEarned = correctAnswers === questionIndices.length && questionIndices.length > 0;

    if (isEarned) {
      badge.classList.add('earned');
    }

    badge.innerHTML = `
      <div class="badge-emoji">${soil.emoji}</div>
      <div class="badge-label">${soil.badgeLabel}</div>
    `;
    badgesContainer.appendChild(badge);
  });

  document.getElementById('nav-meta').textContent = 'Quiz Complete';
  showScreen('results');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome();

  document.getElementById('btn-home-quiz').addEventListener('click', () => {
    startQuiz();
  });

  document.getElementById('btn-detail-back').addEventListener('click', () => {
    showScreen('home');
    renderHome();
  });

  document.getElementById('btn-detail-quiz').addEventListener('click', () => {
    startQuiz();
  });

  document.getElementById('btn-results-explore').addEventListener('click', () => {
    showScreen('home');
    renderHome();
  });

  document.getElementById('btn-results-again').addEventListener('click', () => {
    startQuiz();
  });
});

/* eslint-disable no-undef */
/* ═══════════════════════════════════════════════════
   MAP MASTERS - World Country Map Learning Game
   Archetype B (DOM) - Mirrors Body Map pattern
═══════════════════════════════════════════════════ */

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
const state = {
  screen: 'landing', // landing | learn | quiz | score
  currentChapter: null,
  currentCountryIndex: 0,
  quizOrder: [],
  quizIndex: 0,
  quizScore: 0,
  topoData: null,
  chapterScores: {} // { 'eu-1': { score: 8, total: 10 }, ... }
};

// ═══════════════════════════════════════════
// DOM REFERENCES & INITIALIZATION
// ═══════════════════════════════════════════
let screens;
let nav;
let gameBackBtn;

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize DOM references
  screens = {
    landing: document.querySelector('[data-screen="landing"]'),
    learn: document.querySelector('[data-screen="learn"]'),
    quiz: document.querySelector('[data-screen="quiz"]'),
    score: document.querySelector('[data-screen="score"]')
  };

  nav = new GameNavigation('map-masters', {
    screens: ['landing', 'learn', 'quiz', 'score'],
    initialScreen: 'landing',
    gameName: 'Map Masters',
    titles: {
      landing: 'Map Masters',
      learn: 'Learn',
      quiz: 'Quiz',
      score: 'Results'
    }
  });
  gameBackBtn = document.getElementById('game-back-btn');

  // Load TopoJSON once
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    state.topoData = await response.json();
  } catch (error) {
    if (window.errorTracker) {
      window.errorTracker.report('Failed to load TopoJSON', { error: error.message });
    }
  }

  // Load saved scores from localStorage
  loadSavedScores();

  // Render landing screen
  renderLanding();

  // Wire up button events
  wireUpEvents();
});

// ═══════════════════════════════════════════
// SCREEN NAVIGATION
// ═══════════════════════════════════════════
function showScreen(screenName) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[screenName].classList.add('active');
  state.screen = screenName;
}

function goToLanding() {
  showScreen('landing');
  state.currentChapterIndex = 0;
  state.currentCountryIndex = 0;
}

function goToLearn(chapterId) {
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  if (!chapter) {
    return;
  }

  state.currentChapter = chapter;
  state.currentCountryIndex = 0;
  showScreen('learn');

  nav.setTitle(`${chapter.label}`);
  nav.setMeta(`Region: ${chapter.range}`);

  renderLearn();
}

function goToQuiz(chapterId) {
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  if (!chapter) {
    return;
  }

  state.currentChapter = chapter;
  state.quizScore = 0;

  // Build quiz order: shuffled indices of countries in this chapter
  const chapterCountries = COUNTRIES.filter(c => c.chapter === chapterId);
  state.quizOrder = Array.from({ length: chapterCountries.length }, (_, i) => i).sort(
    () => Math.random() - 0.5
  );
  state.quizIndex = 0;

  showScreen('quiz');
  nav.setTitle(`${chapter.label}`);
  nav.setMeta('Quiz Mode');

  renderQuiz();
}

function goToScore(chapterId) {
  showScreen('score');
  nav.setTitle(`${state.currentChapter.label}`);
  nav.setMeta('Completed!');

  const chapterCountries = COUNTRIES.filter(c => c.chapter === chapterId);
  const total = chapterCountries.length;
  const percentage = (state.quizScore / total) * 100;

  // Determine rating emoji
  let emoji = '🧭';
  let title = 'Keep Exploring!';
  if (percentage === 100) {
    emoji = '🏆';
    title = 'Map Legend!';
  } else if (percentage >= 80) {
    emoji = '⭐';
    title = 'Explorer!';
  } else if (percentage >= 60) {
    emoji = '🗺️';
    title = 'Navigator!';
  }

  // Calculate star rating (0-3 stars based on percentage)
  const stars = Math.ceil((percentage / 100) * 3);

  // Save score
  const saved = state.chapterScores[chapterId] || { score: 0, total };
  if (state.quizScore > saved.score) {
    state.chapterScores[chapterId] = { score: state.quizScore, total, stars };
    saveScores();
  }

  document.getElementById('score-emoji').textContent = emoji;
  document.getElementById('score-title').textContent = title;
  document.getElementById('score-num').textContent = state.quizScore;
  document.getElementById('score-out').textContent = `out of ${total} correct`;
  document.getElementById('score-sub').textContent = `You earned ${stars} stars! ${
    percentage === 100 ? 'Perfect!' : 'Try again to improve!'
  }`;

  // Wired in renderScore button clicks
}

// ═══════════════════════════════════════════
// RENDER: LANDING SCREEN
// ═══════════════════════════════════════════
function renderLanding() {
  const landingScreen = screens.landing;
  landingScreen.innerHTML = '';

  // Hero
  const hero = document.createElement('div');
  hero.className = 'start-hero';
  hero.innerHTML = `
    <h1>🗺️ Map Masters</h1>
    <p>Learn to recognize the shapes of all 195 countries on Earth!</p>
  `;
  landingScreen.appendChild(hero);

  // Technique box
  const techniqueBox = document.createElement('div');
  techniqueBox.className = 'technique-box';
  techniqueBox.innerHTML = `
    <h3>🧠 How It Works</h3>
    <p>
      Each country has a unique shape! We'll teach you fun memory tricks — shape metaphors, funny stories, and silly emojis —
      to help you remember what every country looks like. Learn a group of countries, then take a quiz to test your knowledge!
    </p>
  `;
  landingScreen.appendChild(techniqueBox);

  // Continents with chapters
  const continents = ['europe', 'africa', 'asia', 'americas', 'oceania'];
  continents.forEach(continent => {
    const continentChapters = CHAPTERS.filter(c => c.continent === continent);
    if (!continentChapters.length) {
      return;
    }

    const sectionEl = document.createElement('div');
    sectionEl.style.marginTop = '24px';

    const heading = document.createElement('h2');
    heading.style.fontSize = '18px';
    heading.style.fontWeight = '800';
    heading.style.textTransform = 'uppercase';
    heading.style.color = 'var(--dom-accent)';
    heading.style.marginBottom = '12px';
    heading.style.paddingLeft = '24px';
    heading.textContent = continent.charAt(0).toUpperCase() + continent.slice(1);
    sectionEl.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'batch-grid';

    continentChapters.forEach(chapter => {
      const btn = document.createElement('button');
      btn.className = 'batch-btn';
      btn.innerHTML = `
        <div class="bnum">${chapter.label.split(' — ')[0]}</div>
        <div class="brange">${chapter.range}</div>
        <div class="bnames">${chapter.count} countries</div>
        <div style="margin-top: 8px; font-size: 14px;">
          ${getSaveStars(chapter.id)}
        </div>
      `;
      btn.addEventListener('click', () => goToLearn(chapter.id));
      grid.appendChild(btn);
    });

    sectionEl.appendChild(grid);
    landingScreen.appendChild(sectionEl);
  });
}

function getSaveStars(chapterId) {
  const saved = state.chapterScores[chapterId];
  if (!saved) {
    return '⭕⭕⭕';
  } // Empty stars
  const stars = saved.stars || 0;
  const filled = '⭐'.repeat(stars);
  const empty = '⭕'.repeat(3 - stars);
  return filled + empty;
}

// ═══════════════════════════════════════════
// RENDER: LEARN SCREEN
// ═══════════════════════════════════════════
function renderLearn() {
  const chapterCountries = COUNTRIES.filter(c => c.chapter === state.currentChapter.id);
  const country = chapterCountries[state.currentCountryIndex];

  if (!country) {
    return;
  }

  // Draw map canvas
  const canvas = document.getElementById('learn-canvas');
  if (canvas) {
    canvas.remove();
  }

  const mapContainer = document.querySelector('[data-screen="learn"] .map-panel');
  if (mapContainer) {
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'learn-canvas';
    newCanvas.width = 320;
    newCanvas.height = 240;
    newCanvas.style.border = '1px solid var(--dom-border)';
    newCanvas.style.borderRadius = '8px';
    newCanvas.style.backgroundColor = '#d0e8e8';
    mapContainer.innerHTML = '';
    mapContainer.appendChild(newCanvas);

    drawCountry(newCanvas, country.isoNum, '#0d7a7a');
  }

  // Info panel
  const infoPanel = document.getElementById('learn-info');
  infoPanel.innerHTML = `
    <div class="zone-badge">${country.flag} ${country.name}</div>
    <div class="pres-name">${country.name}</div>
    <div class="pres-term">Continent: ${country.continent.charAt(0).toUpperCase() + country.continent.slice(1)}</div>
    <div class="tip-card">
      <h4>💡 Memory Tip</h4>
      <p>${country.tip}</p>
    </div>
  `;

  // Footer progress
  document.getElementById('step-indicator').textContent =
    `${state.currentCountryIndex + 1} of ${chapterCountries.length}`;

  // Step dots
  const dotsContainer = document.getElementById('step-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < chapterCountries.length; i++) {
    const dot = document.createElement('div');
    dot.className = `step-dot ${i <= state.currentCountryIndex ? 'done' : ''} ${
      i === state.currentCountryIndex ? 'active' : ''
    }`;
    dotsContainer.appendChild(dot);
  }

  // Progress bar
  const progress = ((state.currentCountryIndex + 1) / chapterCountries.length) * 100;
  document.getElementById('learn-bar').style.width = `${progress}%`;

  // Buttons
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  btnPrev.disabled = state.currentCountryIndex === 0;
  btnPrev.onclick = () => {
    if (state.currentCountryIndex > 0) {
      state.currentCountryIndex--;
      renderLearn();
    }
  };

  if (state.currentCountryIndex === chapterCountries.length - 1) {
    btnNext.textContent = 'Start Quiz →';
    btnNext.onclick = () => goToQuiz(state.currentChapter.id);
  } else {
    btnNext.textContent = 'Next →';
    btnNext.onclick = () => {
      if (state.currentCountryIndex < chapterCountries.length - 1) {
        state.currentCountryIndex++;
        renderLearn();
      }
    };
  }
}

// ═══════════════════════════════════════════
// RENDER: QUIZ SCREEN
// ═══════════════════════════════════════════
function renderQuiz() {
  const chapterCountries = COUNTRIES.filter(c => c.chapter === state.currentChapter.id);
  const currentIdx = state.quizOrder[state.quizIndex];
  const country = chapterCountries[currentIdx];

  if (!country) {
    goToScore(state.currentChapter.id);
    return;
  }

  // Ensure quiz canvas exists
  let canvas = document.getElementById('quiz-canvas');
  if (!canvas) {
    const mapContainer = document.querySelector('[data-screen="quiz"] .map-panel');
    if (mapContainer) {
      const newCanvas = document.createElement('canvas');
      newCanvas.id = 'quiz-canvas';
      newCanvas.width = 320;
      newCanvas.height = 240;
      newCanvas.style.border = '1px solid var(--dom-border)';
      newCanvas.style.borderRadius = '8px';
      newCanvas.style.backgroundColor = '#d0e8e8';
      mapContainer.innerHTML = '';
      mapContainer.appendChild(newCanvas);
      canvas = newCanvas;
    }
  }

  if (canvas) {
    drawCountry(canvas, country.isoNum, '#0d7a7a');
  }

  // Question
  document.getElementById('quiz-question').textContent = 'Which country is this?';

  // Options (correct + 3 random wrong)
  const wrongCountries = chapterCountries.filter((c, i) => i !== currentIdx);
  const options = [country, ...wrongCountries.sort(() => Math.random() - 0.5).slice(0, 3)].sort(
    () => Math.random() - 0.5
  );

  const optionsGrid = document.getElementById('quiz-options');
  optionsGrid.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span> <span>${opt.flag} ${opt.name}</span>`;

    btn.addEventListener('click', () => {
      // Disable all options
      document.querySelectorAll('.opt-btn').forEach(b => (b.disabled = true));

      if (opt.id === country.id) {
        btn.classList.add('correct');
        state.quizScore++;
      } else {
        btn.classList.add('wrong');
        // Show correct answer
        const correctBtn = Array.from(document.querySelectorAll('.opt-btn')).find(b =>
          b.textContent.includes(country.name)
        );
        if (correctBtn) {
          correctBtn.classList.add('correct');
        }
      }

      // Auto-advance
      setTimeout(() => {
        state.quizIndex++;
        renderQuiz();
      }, 900);
    });

    optionsGrid.appendChild(btn);
  });

  // Score + progress bar
  document.getElementById('quiz-score-live').textContent = state.quizScore;
  const progress = ((state.quizIndex + 1) / chapterCountries.length) * 100;
  document.getElementById('quiz-bar').style.width = `${progress}%`;

  // Quiz dots
  const dotsContainer = document.getElementById('quiz-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < chapterCountries.length; i++) {
    const dot = document.createElement('div');
    dot.className = `step-dot ${i < state.quizIndex ? 'done' : ''} ${i === state.quizIndex ? 'active' : ''}`;
    dotsContainer.appendChild(dot);
  }
}

// ═══════════════════════════════════════════
// CANVAS: DRAW COUNTRY MAP
// ═══════════════════════════════════════════
function drawCountry(canvas, isoNum, fillColor) {
  if (!state.topoData || !window.topojson) {
    return;
  }

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Find country in TopoJSON
  const countries = state.topoData.objects.countries.geometries;

  let countryGeom = null;
  const isoNumInt = parseInt(isoNum);
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].id === isoNumInt) {
      countryGeom = countries[i];
      break;
    }
  }

  if (!countryGeom) {
    return;
  }

  // Convert TopoJSON to GeoJSON using topojson-client
  const feature = window.topojson.feature(state.topoData, countryGeom);
  if (!feature || !feature.geometry) {
    return;
  }

  // Extract all coordinate rings
  let allRings = [];
  if (feature.geometry.type === 'Polygon') {
    allRings = feature.geometry.coordinates;
  } else if (feature.geometry.type === 'MultiPolygon') {
    feature.geometry.coordinates.forEach(poly => {
      allRings = allRings.concat(poly);
    });
  } else {
    return;
  }

  if (allRings.length === 0) {
    return;
  }

  // Find bounding box
  let minLon = Infinity,
    maxLon = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  allRings.forEach(ring => {
    ring.forEach(([lon, lat]) => {
      minLon = Math.min(minLon, lon);
      maxLon = Math.max(maxLon, lon);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    });
  });

  // Compute scale to fit canvas with padding
  const padding = 10;
  const availWidth = canvas.width - 2 * padding;
  const availHeight = canvas.height - 2 * padding;

  const lonRange = maxLon - minLon || 1;
  const latRange = maxLat - minLat || 1;

  const scale = Math.min(availWidth / lonRange, availHeight / latRange);

  // Draw country
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;

  allRings.forEach(ring => {
    ctx.beginPath();
    ring.forEach(([lon, lat], i) => {
      const x = padding + ((lon - minLon) * scale + (availWidth - lonRange * scale) / 2);
      const y =
        padding + ((latRange - (lat - minLat)) * scale + (availHeight - latRange * scale) / 2);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}

// ═══════════════════════════════════════════
// STORAGE: SAVE/LOAD SCORES
// ═══════════════════════════════════════════
function saveScores() {
  localStorage.setItem('map-masters-scores', JSON.stringify(state.chapterScores));
}

function loadSavedScores() {
  const saved = localStorage.getItem('map-masters-scores');
  if (saved) {
    state.chapterScores = JSON.parse(saved);
  }
}

// ═══════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════
function wireUpEvents() {
  // Back button
  if (gameBackBtn) {
    gameBackBtn.addEventListener('click', e => {
      e.preventDefault();
      if (state.screen === 'landing') {
        window.location.href = '../../index.html#map-masters';
      } else {
        goToLanding();
      }
    });
  }

  // Score screen buttons
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      if (state.currentChapter) {
        goToQuiz(state.currentChapter.id);
      }
    });
  }

  const btnAllChapters = document.getElementById('btn-all-chapters');
  if (btnAllChapters) {
    btnAllChapters.addEventListener('click', () => {
      goToLanding();
    });
  }

  const btnNextChapter = document.getElementById('btn-next-chapter');
  if (btnNextChapter) {
    btnNextChapter.addEventListener('click', () => {
      const currentIdx = CHAPTERS.findIndex(c => c.id === state.currentChapter.id);
      const nextChapter = CHAPTERS[currentIdx + 1];
      if (nextChapter) {
        goToLearn(nextChapter.id);
      } else {
        goToLanding();
      }
    });
  }
}

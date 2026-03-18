/* eslint-disable no-undef */
/* ═══════════════════════════════════════════════════
   FLAG MASTERS - World Country Flag Learning Game
   Archetype B (DOM) - Mirrors Map Masters pattern
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
  chapterScores: {} // { 'eu-1': { score: 8, total: 10, stars: 3 }, ... }
};

// ═══════════════════════════════════════════
// DOM REFERENCES & INITIALIZATION
// ═══════════════════════════════════════════
let screens;
let nav;
let gameBackBtn;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize DOM references
  screens = {
    landing: document.querySelector('[data-screen="landing"]'),
    learn: document.querySelector('[data-screen="learn"]'),
    quiz: document.querySelector('[data-screen="quiz"]'),
    score: document.querySelector('[data-screen="score"]')
  };

  nav = new GameNavigation('flag-masters', {
    screens: ['landing', 'learn', 'quiz', 'score'],
    initialScreen: 'landing',
    gameName: 'Flag Masters',
    titles: {
      landing: 'Flag Masters',
      learn: 'Learn',
      quiz: 'Quiz',
      score: 'Results'
    }
  });
  gameBackBtn = document.getElementById('game-back-btn');

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
  let emoji = '🏳️';
  let title = 'Keep Learning!';
  if (percentage === 100) {
    emoji = '🏆';
    title = 'Flag Legend!';
  } else if (percentage >= 80) {
    emoji = '⭐';
    title = 'Flag Expert!';
  } else if (percentage >= 60) {
    emoji = '🗺️';
    title = 'Flag Spotter!';
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
    <h1>🚩 Flag Masters</h1>
    <p>Learn to recognize the flags of all 195 countries on Earth!</p>
  `;
  landingScreen.appendChild(hero);

  // Technique box
  const techniqueBox = document.createElement('div');
  techniqueBox.className = 'technique-box';
  techniqueBox.innerHTML = `
    <h3>🧠 How It Works</h3>
    <p>
      Every flag tells a story! We'll teach you fun memory tricks — color symbolism, historical meanings, and clever associations —
      to help you remember every flag in the world. Learn a group of countries, then take a quiz to test your knowledge!
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

  // Display flag
  renderFlag(document.getElementById('learn-flag'), country);

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

  // Display flag
  renderFlag(document.getElementById('quiz-flag'), country);

  // Question
  document.getElementById('quiz-question').textContent = 'Which country does this flag belong to?';

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
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span> <span>${opt.name}</span>`;

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
// FLAG DISPLAY
// ═══════════════════════════════════════════
function renderFlag(container, country) {
  if (!country) {
    return;
  }
  container.innerHTML = '';
  const display = document.createElement('div');
  display.className = 'flag-display';
  display.textContent = country.flag;
  container.appendChild(display);
}

// ═══════════════════════════════════════════
// SCORE SCREEN: WIRE BUTTONS
// ═══════════════════════════════════════════
function wireUpEvents() {
  document.getElementById('btn-replay').onclick = () => {
    goToQuiz(state.currentChapter.id);
  };

  document.getElementById('btn-all-chapters').onclick = () => {
    goToLanding();
  };

  document.getElementById('btn-next-chapter').onclick = () => {
    const chapters = CHAPTERS.filter(c => c.continent === state.currentChapter.continent);
    const currentIndex = chapters.findIndex(c => c.id === state.currentChapter.id);

    if (currentIndex >= chapters.length - 1) {
      // Last chapter in continent, go to landing
      goToLanding();
    } else {
      // Go to next chapter
      goToLearn(chapters[currentIndex + 1].id);
    }
  };
}

// ═══════════════════════════════════════════
// LOCALSTORAGE SAVE/LOAD
// ═══════════════════════════════════════════
function saveScores() {
  localStorage.setItem('flag-masters-scores', JSON.stringify(state.chapterScores));
}

function loadSavedScores() {
  const saved = localStorage.getItem('flag-masters-scores');
  if (saved) {
    try {
      state.chapterScores = JSON.parse(saved);
    } catch (error) {
      if (window.errorTracker) {
        window.errorTracker.report('Failed to load saved scores', { error: error.message });
      }
      state.chapterScores = {};
    }
  }
}

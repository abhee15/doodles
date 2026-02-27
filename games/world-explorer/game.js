/* eslint-disable no-undef */
/**
 * World Explorer - DOM-Based Geography Game
 * Phase 1: Foundation (Landing, Continent, Country Detail views)
 *
 * Architecture:
 * - State: gameState object with explored[], favorites[]
 * - Screens: Landing, Continent, Country Detail, Landmark Hunt, Collections
 * - Data: COUNTRIES array (30 countries in Phase 1, will expand to 195)
 * - Persistence: localStorage for progress tracking
 */

// ══════════════════════════════════════════════════
// GAME STATE MANAGEMENT
// ══════════════════════════════════════════════════

const gameState = {
  currentScreen: 'landing',
  currentContinent: null,
  currentCountry: null,

  // User progress data
  explored: [], // Array of country IDs visited
  favorites: [], // Bookmarked countries
  landmarksFound: [] // Landmark hunt progress (Phase 2)
};

// ══════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════

const CONTINENT_INFO = {
  africa: {
    emoji: '🦁',
    name: 'Africa',
    totalCount: 53,
    description: 'The cradle of humanity'
  },
  asia: {
    emoji: '🏯',
    name: 'Asia',
    totalCount: 48,
    description: 'The largest continent'
  },
  americas: {
    emoji: '🗽',
    name: 'Americas',
    totalCount: 35,
    description: 'North and South America'
  },
  europe: {
    emoji: '🏰',
    name: 'Europe',
    totalCount: 44,
    description: 'The historic continent'
  },
  oceania: {
    emoji: '🏝️',
    name: 'Oceania',
    totalCount: 15,
    description: 'Islands and Australia'
  }
};

// ══════════════════════════════════════════════════
// CORE FUNCTIONS
// ══════════════════════════════════════════════════

/**
 * Navigate to a screen with optional context
 */
function goToScreen(screenName, context = {}) {
  // Hide all screens
  document.querySelectorAll('.dom-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Show target screen
  const targetScreen = document.querySelector(`[data-screen="${screenName}"]`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Update state
  gameState.currentScreen = screenName;

  // Call screen-specific handler
  const handlers = {
    landing: renderLanding,
    continent: () => renderContinent(context.continent),
    country: () => renderCountryDetail(context.countryId),
    'landmark-hunt': renderLandmarkHunt,
    collections: renderCollections,
    favorites: renderFavorites
  };

  const handler = handlers[screenName];
  if (handler) {
    handler();
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

/**
 * Render landing screen with continent selector and recent countries
 */
function renderLanding() {
  const recentContainer = document.getElementById('recent-countries');

  if (gameState.explored.length === 0) {
    recentContainer.innerHTML =
      '<p style="color: var(--dom-text-muted); grid-column: 1/-1;">Explore a continent to get started!</p>';
  } else {
    // Show recently explored (last 6)
    const recentIds = gameState.explored.slice(-6).reverse();
    recentContainer.innerHTML = recentIds
      .map(countryId => {
        const country = findCountryById(countryId);
        if (!country) {
          return '';
        }

        return `
          <div class="country-card" style="cursor: pointer;" data-country="${countryId}">
            <div class="country-card-flag">${country.flag}</div>
            <div class="country-card-name">${country.name}</div>
          </div>
        `;
      })
      .join('');

    // Attach click handlers to recent cards
    recentContainer.querySelectorAll('.country-card').forEach(card => {
      card.addEventListener('click', () => {
        const countryId = card.dataset.country;
        goToScreen('country', { countryId });
      });
    });
  }
}

/**
 * Render continent browser with country cards
 */
function renderContinent(continentId) {
  gameState.currentContinent = continentId;

  const continentInfo = CONTINENT_INFO[continentId];
  const countriesInContinent = COUNTRIES.filter(c => c.continent === continentId);

  // Update header
  const titleEl = document.getElementById('continent-title');
  const progressEl = document.getElementById('continent-progress');

  titleEl.textContent = `${continentInfo.emoji} ${continentInfo.name}`;

  const exploredInContinent = countriesInContinent.filter(c =>
    gameState.explored.includes(c.id)
  ).length;

  progressEl.textContent = `Explored ${exploredInContinent} of ${countriesInContinent.length} countries`;

  // Render grid
  const grid = document.getElementById('country-grid');
  grid.innerHTML = countriesInContinent
    .map(country => {
      const isExplored = gameState.explored.includes(country.id);
      return `
        <div class="country-card" data-continent="${country.continent}" data-country="${country.id}">
          <div class="country-card-flag">${country.flag}</div>
          <h3 class="country-card-name">${country.name}</h3>
          <p class="country-card-hook">${country.hooks.primary}</p>
          ${isExplored ? '<span style="color: var(--color-success); font-size: 12px; font-weight: 600;">✓ Explored</span>' : ''}
        </div>
      `;
    })
    .join('');

  // Attach click handlers to country cards
  grid.querySelectorAll('.country-card').forEach(card => {
    card.addEventListener('click', () => {
      const countryId = card.dataset.country;
      goToScreen('country', { countryId });
    });
  });
}

/**
 * Render country detail view with facts and recommendations
 */
function renderCountryDetail(countryId) {
  const country = findCountryById(countryId);
  if (!country) {
    return;
  }

  gameState.currentCountry = countryId;

  // Mark as explored
  if (!gameState.explored.includes(countryId)) {
    gameState.explored.push(countryId);
    saveProgress();
    updateNavMeta();
  }

  // Render hero section with flag, name, hook, facts
  const heroEl = document.getElementById('detail-hero');
  heroEl.innerHTML = `
    <h1>${country.flag} ${country.name}</h1>
    <p class="secondary-hook">${country.hooks.secondary}</p>

    <div class="facts-list">
      ${country.facts
        .map(
          fact => `
        <div class="fact">
          <span class="fact-icon">${fact.split(' ')[0]}</span>
          <p class="fact-text">${fact}</p>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  // Update favorite button
  const favoriteBtn = document.getElementById('favorite-btn');
  const isFavorited = gameState.favorites.includes(countryId);

  if (isFavorited) {
    favoriteBtn.classList.add('active');
    favoriteBtn.innerHTML = '<i class="ti ti-heart-filled"></i> Favorited!';
  } else {
    favoriteBtn.classList.remove('active');
    favoriteBtn.innerHTML = '<i class="ti ti-heart"></i> Add to Favorites';
  }

  favoriteBtn.onclick = e => {
    e.preventDefault();
    toggleFavorite(countryId);
  };

  // Render recommendations (geographic neighbors)
  const recommendationsEl = document.getElementById('recommendations');
  const recommendations = getRecommendations(countryId);

  if (recommendations.length > 0) {
    recommendationsEl.innerHTML = `
      <h3>More Like This 🌏</h3>
      <div class="recommendation-grid">
        ${recommendations
          .map(
            rec => `
          <div class="recommendation-card" data-country="${rec.id}">
            <span class="emoji">${rec.flag}</span>
            <span class="name">${rec.name}</span>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    // Attach click handlers to recommendations
    recommendationsEl.querySelectorAll('.recommendation-card').forEach(card => {
      card.addEventListener('click', () => {
        const recCountryId = card.dataset.country;
        goToScreen('country', { countryId: recCountryId });
      });
    });
  } else {
    recommendationsEl.innerHTML = '';
  }
}

/**
 * Get country by ID
 */
function findCountryById(countryId) {
  return COUNTRIES.find(c => c.id === countryId);
}

/**
 * Toggle favorite for a country
 */
function toggleFavorite(countryId) {
  const index = gameState.favorites.indexOf(countryId);
  if (index === -1) {
    gameState.favorites.push(countryId);
  } else {
    gameState.favorites.splice(index, 1);
  }

  saveProgress();

  // Update button
  const favoriteBtn = document.getElementById('favorite-btn');
  const isFavorited = gameState.favorites.includes(countryId);

  if (isFavorited) {
    favoriteBtn.classList.add('active');
    favoriteBtn.innerHTML = '<i class="ti ti-heart-filled"></i> Favorited!';
  } else {
    favoriteBtn.classList.remove('active');
    favoriteBtn.innerHTML = '<i class="ti ti-heart"></i> Add to Favorites';
  }
}

/**
 * Get recommendations for a country
 * Algorithm: Same continent + geographic neighbors
 */
function getRecommendations(countryId) {
  const country = findCountryById(countryId);
  if (!country) {
    return [];
  }

  // Get neighbors (if defined) or same continent countries
  let recommendations = [];

  if (country.neighbors && country.neighbors.length > 0) {
    recommendations = country.neighbors
      .map(neighborId => findCountryById(neighborId))
      .filter(Boolean)
      .slice(0, 3);
  }

  // If not enough neighbors, fill with same continent
  if (recommendations.length < 3) {
    const continentCountries = COUNTRIES.filter(
      c =>
        c.continent === country.continent &&
        c.id !== countryId &&
        !recommendations.find(r => r.id === c.id)
    );

    recommendations = recommendations.concat(
      continentCountries.slice(0, 3 - recommendations.length)
    );
  }

  return recommendations.slice(0, 3);
}

/**
 * Get all landmarks from all countries (for Landmark Hunt)
 */
function getAllLandmarks() {
  const landmarks = [];
  COUNTRIES.forEach(country => {
    if (country.highlights && country.highlights.landmarks) {
      country.highlights.landmarks.forEach(landmark => {
        landmarks.push({
          ...landmark,
          countryId: country.id,
          countryName: country.name,
          countryFlag: country.flag
        });
      });
    }
  });
  return landmarks;
}

/**
 * Render landmark hunt quiz screen
 */
function renderLandmarkHunt() {
  const allLandmarks = getAllLandmarks();

  if (allLandmarks.length === 0) {
    const quest = document.getElementById('landmark-quest');
    quest.innerHTML =
      '<p style="color: var(--dom-text-muted); text-align: center; padding: 40px 20px;">More landmarks coming soon! Explore countries to learn about their amazing landmarks.</p>';
    return;
  }

  // Pick random landmark
  const landmark = allLandmarks[Math.floor(Math.random() * allLandmarks.length)];

  // Generate 11 decoy countries (different from answer)
  const decoys = COUNTRIES.filter(c => c.id !== landmark.countryId).slice(0, 11);

  // Mix answer with decoys
  const options = [landmark.countryId, ...decoys.map(c => c.id)].sort(() => Math.random() - 0.5);

  // Get country objects for options
  const optionCountries = options.map(id => findCountryById(id));

  // Render quiz
  const quest = document.getElementById('landmark-quest');
  quest.innerHTML = `
    <div style="margin-bottom: 32px;">
      <div style="font-size: 48px; margin-bottom: 16px; text-align: center;">${landmark.emoji}</div>
      <h2 style="text-align: center; margin-bottom: 12px;">${landmark.name}</h2>
      <p style="text-align: center; color: var(--dom-text-muted); margin-bottom: 20px;">${landmark.desc}</p>
      <p style="text-align: center; font-size: 13px; color: var(--dom-text-muted);">Which country is this landmark in?</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px; margin-bottom: 24px;" id="landmark-options">
      ${optionCountries
        .map(
          country => `
        <button class="landmark-option-btn" data-country="${country.id}" style="cursor: pointer; padding: 16px; border: 2px solid var(--dom-border); border-radius: 8px; background: var(--dom-bg); color: var(--dom-text); font-size: 14px; font-weight: 600; transition: all 0.2s; text-align: center;">
          <div style="font-size: 28px; margin-bottom: 8px;">${country.flag}</div>
          <div>${country.name}</div>
        </button>
      `
        )
        .join('')}
    </div>

    <div style="display: flex; gap: 12px;">
      <button class="dom-btn dom-btn--secondary" onclick="goToScreen('landing')">← Back</button>
      <button class="dom-btn dom-btn--primary" onclick="renderLandmarkHunt()" style="flex: 1;">🔄 Next Landmark</button>
    </div>

    <div id="landmark-result" style="margin-top: 24px;"></div>
  `;

  // Attach click handlers to options
  document.querySelectorAll('.landmark-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCountryId = btn.dataset.country;
      const isCorrect = selectedCountryId === landmark.countryId;

      // Mark as found if correct
      if (isCorrect && !gameState.landmarksFound.includes(landmark.name)) {
        gameState.landmarksFound.push(landmark.name);
        saveProgress();
      }

      // Show result
      const resultDiv = document.getElementById('landmark-result');
      const resultCountry = findCountryById(landmark.countryId);

      if (isCorrect) {
        resultDiv.innerHTML = `
          <div style="padding: 16px; background: rgba(76, 175, 80, 0.1); border-radius: 8px; border-left: 4px solid #4caf50;">
            <p style="color: #4caf50; font-weight: 600; margin: 0;">✓ Correct! ${resultCountry.flag}</p>
            <p style="color: var(--dom-text-muted); font-size: 13px; margin: 8px 0 0 0;">${resultCountry.name}</p>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `
          <div style="padding: 16px; background: rgba(255, 152, 0, 0.1); border-radius: 8px; border-left: 4px solid #ff9800;">
            <p style="color: #ff9800; font-weight: 600; margin: 0;">The correct answer is ${resultCountry.flag} ${resultCountry.name}</p>
            <p style="color: var(--dom-text-muted); font-size: 13px; margin: 8px 0 0 0;">No worries! This is how you learn. The more you explore countries, the easier these quizzes become!</p>
          </div>
        `;
      }

      // Disable all buttons
      document.querySelectorAll('.landmark-option-btn').forEach(b => {
        b.style.opacity = '0.5';
        b.style.cursor = 'not-allowed';
      });
    });
  });
}

/**
 * Render collections view with per-continent progress
 */
function renderCollections() {
  const collectionsGrid = document.getElementById('collections-grid');

  let html =
    '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">';

  Object.entries(CONTINENT_INFO).forEach(([continentId, continentInfo]) => {
    const countriesInContinent = COUNTRIES.filter(c => c.continent === continentId);
    const exploredInContinent = countriesInContinent.filter(c =>
      gameState.explored.includes(c.id)
    ).length;
    const percentage = Math.round((exploredInContinent / countriesInContinent.length) * 100);

    html += `
      <div class="collection-card" style="padding: 20px; border: 2px solid var(--dom-border); border-radius: 12px; cursor: pointer; transition: all 0.2s;" onclick="goToScreen('continent', { continent: '${continentId}' })">
        <div style="font-size: 32px; margin-bottom: 12px;">${continentInfo.emoji}</div>
        <h3 style="margin: 0 0 8px 0; font-size: 18px;">${continentInfo.name}</h3>
        <p style="color: var(--dom-text-muted); font-size: 13px; margin: 0 0 12px 0;">${exploredInContinent} of ${countriesInContinent.length} countries</p>

        <div style="width: 100%; height: 8px; background: var(--dom-border); border-radius: 4px; overflow: hidden; margin-bottom: 12px;">
          <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #4caf50, #81c784); transition: width 0.3s;"></div>
        </div>

        <p style="color: var(--dom-text-muted); font-size: 12px; margin: 0; text-align: center;">${percentage}% Complete</p>
      </div>
    `;
  });

  html += '</div>';
  collectionsGrid.innerHTML = html;
}

/**
 * Render favorites screen with all favorited countries
 */
function renderFavorites() {
  const favoritesGrid = document.getElementById('favorites-grid');

  if (gameState.favorites.length === 0) {
    favoritesGrid.innerHTML =
      '<p style="color: var(--dom-text-muted); text-align: center; padding: 40px 20px;">No favorite places yet. Heart a country to add it to your collection!</p>';
    return;
  }

  const favoriteCountries = gameState.favorites.map(id => findCountryById(id)).filter(Boolean);

  favoritesGrid.innerHTML = favoriteCountries
    .map(
      country => `
    <div class="country-card" data-country="${country.id}" style="cursor: pointer;">
      <div class="country-card-flag">${country.flag}</div>
      <h3 class="country-card-name">${country.name}</h3>
      <p class="country-card-hook">${country.hooks.primary}</p>
    </div>
  `
    )
    .join('');

  // Attach click handlers to favorite cards
  favoritesGrid.querySelectorAll('.country-card').forEach(card => {
    card.addEventListener('click', () => {
      const countryId = card.dataset.country;
      goToScreen('country', { countryId });
    });
  });
}

/**
 * Update navigation metadata (explored count)
 */
function updateNavMeta() {
  const exploredCount = gameState.explored.length;
  const navMeta = document.getElementById('nav-meta');
  navMeta.textContent = `Explored: ${exploredCount}/195 🌍`;
}

/**
 * Save game progress to localStorage
 */
function saveProgress() {
  localStorage.setItem('we_explored', JSON.stringify(gameState.explored));
  localStorage.setItem('we_favorites', JSON.stringify(gameState.favorites));
  localStorage.setItem('we_landmarks', JSON.stringify(gameState.landmarksFound));
}

/**
 * Load game progress from localStorage
 */
function loadProgress() {
  const explored = localStorage.getItem('we_explored');
  const favorites = localStorage.getItem('we_favorites');
  const landmarks = localStorage.getItem('we_landmarks');

  if (explored) {
    gameState.explored = JSON.parse(explored);
  }

  if (favorites) {
    gameState.favorites = JSON.parse(favorites);
  }

  if (landmarks) {
    gameState.landmarksFound = JSON.parse(landmarks);
  }

  updateNavMeta();
}

/**
 * Rotate daily fact banner
 */
function rotateBanner() {
  const allFacts = [
    '🌏 There are 195 countries in the world!',
    '🗣️ Over 7,000 languages are spoken worldwide',
    '🏔️ Mount Everest is the tallest mountain',
    "🌊 The Pacific Ocean covers 46% of Earth's water",
    '🦁 Africa is home to the most wild animals',
    '🏙️ Tokyo is the biggest city in the world',
    '🏰 Europe has the most castles',
    '🏖️ The Maldives is the lowest country on Earth',
    '⛩️ Japan has 125 million people!',
    '🍕 Italy invented pizza as we know it'
  ];

  const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
  document.getElementById('banner-fact').textContent = `Did you know? ${randomFact}`;
}

// ══════════════════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Load saved progress
  loadProgress();

  // Attach continent selector listeners
  document.querySelectorAll('.continent-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const continent = btn.dataset.continent;
      goToScreen('continent', { continent });
    });
  });

  // Rotate banner fact on page load and every 10 seconds
  rotateBanner();
  setInterval(rotateBanner, 10000);

  // Start on landing screen
  goToScreen('landing');
});

// Back button: go back to previous screen or landing
document.querySelector('[href="../../index.html#world-explorer"]').addEventListener('click', e => {
  if (gameState.currentScreen !== 'landing') {
    e.preventDefault();
    if (gameState.currentScreen === 'country') {
      goToScreen('continent', { continent: gameState.currentContinent });
    } else {
      goToScreen('landing');
    }
  }
});

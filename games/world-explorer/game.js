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
    'landmark-hunt': () => {
      /* Phase 2 */
    },
    collections: () => {
      /* Phase 2 */
    }
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
}

/**
 * Load game progress from localStorage
 */
function loadProgress() {
  const explored = localStorage.getItem('we_explored');
  const favorites = localStorage.getItem('we_favorites');

  if (explored) {
    gameState.explored = JSON.parse(explored);
  }

  if (favorites) {
    gameState.favorites = JSON.parse(favorites);
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

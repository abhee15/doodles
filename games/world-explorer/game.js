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
  searchQuery: '', // Current search filter in continent view

  // User progress data
  explored: [], // Array of country IDs visited
  favorites: [], // Bookmarked countries
  landmarksFound: [], // Landmark hunt progress (Phase 2)

  // Engagement mechanics
  lastExploreDate: null, // For streak counter
  streak: 0, // Current exploration streak (days)
  unlockedAchievements: [] // Achievement IDs unlocked
};

// ══════════════════════════════════════════════════
// ACHIEVEMENTS SYSTEM (15+ badges for engagement)
// ══════════════════════════════════════════════════

const ACHIEVEMENTS = {
  'first-country': {
    id: 'first-country',
    name: '🌍 Globe Trotter',
    description: 'Explore your first country',
    requirement: () => gameState.explored.length >= 1
  },
  'ten-countries': {
    id: 'ten-countries',
    name: '🌎 World Wanderer',
    description: 'Explore 10 countries',
    requirement: () => gameState.explored.length >= 10
  },
  'fifty-countries': {
    id: 'fifty-countries',
    name: '🌏 Continent Explorer',
    description: 'Explore 50 countries',
    requirement: () => gameState.explored.length >= 50
  },
  'hundred-countries': {
    id: 'hundred-countries',
    name: '⭐ Global Scholar',
    description: 'Explore 100 countries',
    requirement: () => gameState.explored.length >= 100
  },
  'all-countries': {
    id: 'all-countries',
    name: '👑 World Master',
    description: 'Explore all 195 countries',
    requirement: () => gameState.explored.length >= 195
  },
  'africa-complete': {
    id: 'africa-complete',
    name: '🦁 African Explorer',
    description: 'Explore all African countries',
    requirement: () => {
      const africaCountries = COUNTRIES.filter(c => c.continent === 'africa');
      return africaCountries.every(c => gameState.explored.includes(c.id));
    }
  },
  'asia-complete': {
    id: 'asia-complete',
    name: '🏯 Asian Explorer',
    description: 'Explore all Asian countries',
    requirement: () => {
      const asiaCountries = COUNTRIES.filter(c => c.continent === 'asia');
      return asiaCountries.every(c => gameState.explored.includes(c.id));
    }
  },
  'europe-complete': {
    id: 'europe-complete',
    name: '🏰 European Explorer',
    description: 'Explore all European countries',
    requirement: () => {
      const europeCountries = COUNTRIES.filter(c => c.continent === 'europe');
      return europeCountries.every(c => gameState.explored.includes(c.id));
    }
  },
  'americas-complete': {
    id: 'americas-complete',
    name: '🗽 American Explorer',
    description: 'Explore all American countries',
    requirement: () => {
      const americasCountries = COUNTRIES.filter(c => c.continent === 'americas');
      return americasCountries.every(c => gameState.explored.includes(c.id));
    }
  },
  'oceania-complete': {
    id: 'oceania-complete',
    name: '🏝️ Pacific Explorer',
    description: 'Explore all Oceania countries',
    requirement: () => {
      const oceaniaCountries = COUNTRIES.filter(c => c.continent === 'oceania');
      return oceaniaCountries.every(c => gameState.explored.includes(c.id));
    }
  },
  'seven-day-streak': {
    id: 'seven-day-streak',
    name: '🔥 Consistent Explorer',
    description: 'Maintain a 7-day exploration streak',
    requirement: () => gameState.streak >= 7
  },
  'thirty-day-streak': {
    id: 'thirty-day-streak',
    name: '💪 Dedicated Explorer',
    description: 'Maintain a 30-day exploration streak',
    requirement: () => gameState.streak >= 30
  },
  'ten-landmarks': {
    id: 'ten-landmarks',
    name: '🏛️ Landmark Hunter',
    description: 'Find 10 landmarks correctly',
    requirement: () => gameState.landmarksFound.length >= 10
  },
  'landmarks-expert': {
    id: 'landmarks-expert',
    name: '🎯 Landmark Expert',
    description: 'Find 50 landmarks correctly',
    requirement: () => gameState.landmarksFound.length >= 50
  },
  'collection-builder': {
    id: 'collection-builder',
    name: '❤️ Collection Curator',
    description: 'Favorite 25 countries',
    requirement: () => gameState.favorites.length >= 25
  }
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
  gameState.searchQuery = ''; // Reset search when changing continent

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

  // Set up search input
  const searchInput = document.getElementById('search-countries');
  const clearBtn = document.getElementById('search-clear-btn');
  const resultCount = document.getElementById('search-result-count');

  searchInput.value = '';
  clearBtn.style.display = 'none';
  resultCount.textContent = '';

  // Search event listener
  searchInput.addEventListener('input', e => {
    gameState.searchQuery = e.target.value.trim().toLowerCase();
    updateContinentGrid(countriesInContinent);

    // Show/hide clear button
    clearBtn.style.display = gameState.searchQuery ? 'flex' : 'none';
  });

  // Clear search button
  clearBtn.addEventListener('click', e => {
    e.preventDefault();
    gameState.searchQuery = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    resultCount.textContent = '';
    updateContinentGrid(countriesInContinent);
    searchInput.focus();
  });

  // Initial grid render
  updateContinentGrid(countriesInContinent);
}

/**
 * Filter countries and update the grid display
 */
function updateContinentGrid(countriesInContinent) {
  const filtered = filterCountries(countriesInContinent, gameState.searchQuery);
  const grid = document.getElementById('country-grid');
  const resultCount = document.getElementById('search-result-count');

  // Update result count
  if (gameState.searchQuery) {
    resultCount.textContent = `Found ${filtered.length} of ${countriesInContinent.length} countries`;
  }

  // Render grid
  grid.innerHTML = filtered
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
 * Filter countries by search query (name, capital, fact keywords)
 */
function filterCountries(countries, query) {
  if (!query) {
    return countries;
  }

  return countries.filter(country => {
    // Match against country name
    if (country.name.toLowerCase().includes(query)) {
      return true;
    }

    // Match against flag (emoji search)
    if (query.length === 2 && query.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/)) {
      // Skip emoji-based search, focus on text
      return false;
    }

    // Match against primary hook
    if (country.hooks.primary.toLowerCase().includes(query)) {
      return true;
    }

    // Match against facts
    if (country.facts && country.facts.some(fact => fact.toLowerCase().includes(query))) {
      return true;
    }

    // For showcase countries, match against capital, cities, landmarks
    if (country.cities) {
      const cityMatch = [country.cities.capital, ...(country.cities.majors || [])].some(
        city => city && city.toLowerCase().includes(query)
      );
      if (cityMatch) {
        return true;
      }
    }

    if (country.landmarks && country.landmarks.some(lm => lm.name.toLowerCase().includes(query))) {
      return true;
    }

    return false;
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
    updateStreak();
    checkAchievements();
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

  // Attach quiz button listener
  const quizBtn = document.getElementById('quiz-btn');
  if (quizBtn) {
    quizBtn.onclick = e => {
      e.preventDefault();
      startQuiz(countryId);
    };
  }

  // Render continent location map
  renderContinentLocationMap(country);

  // Render organized fact tabs
  renderDetailTabs(country);

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
 * Render continent location map showing country position
 */
function renderContinentLocationMap(country) {
  const locationEl = document.getElementById('continent-location');
  const continentInfo = CONTINENT_INFO[country.continent];

  if (!continentInfo) {
    locationEl.innerHTML = '';
    return;
  }

  // Create a simple SVG continent outline with country highlighted
  const continentMap = generateContinentMap(country);

  locationEl.innerHTML = `
    <h3>Location on ${continentInfo.name}</h3>
    ${continentMap}
  `;
}

/**
 * Generate SVG continent map with country highlighted
 */
function generateContinentMap(country) {
  // Simple continent outline SVG with country highlighted
  // For now, show continent emoji + country flag + position description
  const continentInfo = CONTINENT_INFO[country.continent];

  return `
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin: 12px 0">
      <div style="font-size: 48px">${continentInfo.emoji}</div>
      <div style="text-align: left">
        <div style="font-size: 14px; color: var(--dom-text-muted); margin-bottom: 4px">📍 ${continentInfo.name}</div>
        <div style="font-size: 24px">${country.flag} ${country.name}</div>
      </div>
    </div>
  `;
}

/**
 * Render organized fact tabs (Facts, Geography, Wildlife, Culture)
 */
function renderDetailTabs(country) {
  const tabsContainer = document.getElementById('detail-tabs');
  const factsTab = document.getElementById('tab-facts');
  const geographyTab = document.getElementById('tab-geography');
  const wildlifeTab = document.getElementById('tab-wildlife');
  const cultureTab = document.getElementById('tab-culture');

  // Organize facts into categories
  const categorizedFacts = categorizeFacts(country);

  // Render facts tab
  if (country.facts && country.facts.length > 0) {
    factsTab.innerHTML = country.facts
      .map(
        fact => `
      <div class="fact">
        <span class="fact-icon">${fact.split(' ')[0]}</span>
        <p class="fact-text">${fact}</p>
      </div>
    `
      )
      .join('');
  } else {
    factsTab.innerHTML = '<p style="color: var(--dom-text-muted)">No facts available yet.</p>';
  }

  // Render geography tab with extended data
  let geographyContent = '';

  // Add geographic map visualization
  const mapSVG = getGeographicMapSVG(country.id);
  if (mapSVG) {
    geographyContent += `
      <div style="margin-bottom: 20px; padding: 12px; background: #f9fbff; border-radius: 8px; border: 1px solid var(--dom-border)">
        <h4 style="font-size: 12px; font-weight: 700; color: var(--dom-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0">📍 Geographic Map</h4>
        ${mapSVG}
      </div>
    `;
  }

  // Add categorized facts first
  if (categorizedFacts.geography.length > 0) {
    geographyContent += categorizedFacts.geography
      .map(
        fact => `
      <div class="fact">
        <span class="fact-icon">${fact.split(' ')[0]}</span>
        <p class="fact-text">${fact}</p>
      </div>
    `
      )
      .join('');
  }

  // Add extended geography data
  if (country.geography) {
    // States/Regions
    if (country.geography.states && country.geography.states.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">States/Regions</h4>
          <p style="font-size: 13px; color: var(--dom-text); margin: 0">${country.geography.states.slice(0, 5).join(', ')}</p>
        </div>
      `;
    }

    // Rivers
    if (country.geography.rivers && country.geography.rivers.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">🌊 Rivers</h4>
          ${country.geography.rivers
            .slice(0, 3)
            .map(
              r => `
            <div style="margin-bottom: 8px">
              <p style="font-size: 13px; font-weight: 600; color: var(--dom-text); margin: 0">${r.name}</p>
              <p style="font-size: 12px; color: var(--dom-text-muted); margin: 0">${r.length}: ${r.fact}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    // Mountains
    if (country.geography.mountains && country.geography.mountains.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">⛰️ Mountains</h4>
          ${country.geography.mountains
            .slice(0, 3)
            .map(
              m => `
            <div style="margin-bottom: 8px">
              <p style="font-size: 13px; font-weight: 600; color: var(--dom-text); margin: 0">${m.name}</p>
              <p style="font-size: 12px; color: var(--dom-text-muted); margin: 0">${m.elevation}: ${m.fact}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    // Forests/Rainforests
    if (country.geography.forests && country.geography.forests.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">🌲 Forests</h4>
          ${country.geography.forests
            .slice(0, 3)
            .map(
              f => `
            <div style="margin-bottom: 8px">
              <p style="font-size: 13px; font-weight: 600; color: var(--dom-text); margin: 0">${f.name}</p>
              <p style="font-size: 12px; color: var(--dom-text-muted); margin: 0">${f.area}: ${f.fact}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    // Rainforests (special category)
    if (country.geography.rainforests && country.geography.rainforests.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">🌴 Rainforests</h4>
          ${country.geography.rainforests
            .slice(0, 3)
            .map(
              r => `
            <div style="margin-bottom: 8px">
              <p style="font-size: 13px; font-weight: 600; color: var(--dom-text); margin: 0">${r.name}</p>
              <p style="font-size: 12px; color: var(--dom-text-muted); margin: 0">${r.area}: ${r.fact}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    // Deserts
    if (country.geography.deserts && country.geography.deserts.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">🏜️ Deserts</h4>
          ${country.geography.deserts
            .slice(0, 3)
            .map(
              d => `
            <div style="margin-bottom: 8px">
              <p style="font-size: 13px; font-weight: 600; color: var(--dom-text); margin: 0">${d.name}</p>
              <p style="font-size: 12px; color: var(--dom-text-muted); margin: 0">${d.area}: ${d.fact}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    // Lakes
    if (country.geography.lakes && country.geography.lakes.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">🌊 Lakes</h4>
          ${country.geography.lakes
            .slice(0, 3)
            .map(
              l => `
            <div style="margin-bottom: 8px">
              <p style="font-size: 13px; font-weight: 600; color: var(--dom-text); margin: 0">${l.name}</p>
              <p style="font-size: 12px; color: var(--dom-text-muted); margin: 0">${l.area}: ${l.fact}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    // Oases
    if (country.geography.oases && country.geography.oases.length > 0) {
      geographyContent += `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--dom-border)">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dom-accent); margin-bottom: 8px">💧 Oases</h4>
          ${country.geography.oases
            .slice(0, 3)
            .map(
              o => `
            <div style="margin-bottom: 8px">
              <p style="font-size: 13px; font-weight: 600; color: var(--dom-text); margin: 0">${o.name}</p>
              <p style="font-size: 12px; color: var(--dom-text-muted); margin: 0">${o.fact}</p>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }
  }

  if (geographyContent) {
    geographyTab.innerHTML = geographyContent;
  } else {
    geographyTab.innerHTML =
      '<p style="color: var(--dom-text-muted)">No geographic information available yet.</p>';
  }

  // Render wildlife tab
  if (categorizedFacts.wildlife.length > 0 || country.highlights?.animals) {
    let wildlifeContent = '';
    if (country.highlights?.animals) {
      wildlifeContent += country.highlights.animals
        .map(
          animal => `
        <div class="fact">
          <span class="fact-icon">${animal.split(' ')[0]}</span>
          <p class="fact-text">${animal}</p>
        </div>
      `
        )
        .join('');
    }
    wildlifeTab.innerHTML =
      wildlifeContent ||
      '<p style="color: var(--dom-text-muted)">No wildlife information available yet.</p>';
  } else {
    wildlifeTab.innerHTML =
      '<p style="color: var(--dom-text-muted)">No wildlife information available yet.</p>';
  }

  // Render culture tab
  if (country.culture) {
    cultureTab.innerHTML = `
      <div class="fact">
        <span class="fact-icon">🌍</span>
        <p class="fact-text">${country.culture}</p>
      </div>
    `;
    if (country.highlights?.coolFacts) {
      cultureTab.innerHTML += country.highlights.coolFacts
        .map(
          fact => `
        <div class="fact">
          <span class="fact-icon">✨</span>
          <p class="fact-text">${fact}</p>
        </div>
      `
        )
        .join('');
    }
  } else {
    cultureTab.innerHTML =
      '<p style="color: var(--dom-text-muted)">No cultural information available yet.</p>';
  }

  // Attach tab button listeners
  tabsContainer.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.dataset.tab;

      // Remove active class from all buttons and content
      tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      tabsContainer
        .querySelectorAll('.tab-content')
        .forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabContent = tabsContainer.querySelector(`[data-tab-content="${tabName}"]`);
      if (tabContent) {
        tabContent.classList.add('active');
      }
    });
  });
}

/**
 * Generate SVG geographic map for showcase countries
 */
function getGeographicMapSVG(countryId) {
  const maps = {
    usa: `
      <svg viewBox="0 0 960 600" style="max-width: 100%; height: auto; margin: 16px 0">
        <!-- USA simplified outline -->
        <rect x="100" y="100" width="350" height="280" fill="#E8F4F8" stroke="#1E88E5" stroke-width="2" rx="4"/>

        <!-- Rocky Mountains (west) -->
        <g fill="#8B7355" opacity="0.6">
          <path d="M 180 120 L 200 180 L 160 180 Z" />
          <path d="M 210 130 L 230 190 L 190 190 Z" />
          <path d="M 240 140 L 260 200 L 220 200 Z" />
        </g>

        <!-- Mississippi River -->
        <path d="M 280 110 Q 285 200 290 300 Q 292 350 295 380" stroke="#1E88E5" stroke-width="4" fill="none" stroke-linecap="round"/>

        <!-- Colorado River -->
        <path d="M 160 180 L 150 280" stroke="#1E88E5" stroke-width="3" fill="none" stroke-linecap="round"/>

        <!-- Appalachian Mountains (east) -->
        <g fill="#8B7355" opacity="0.6">
          <path d="M 370 130 L 385 170 L 355 170 Z" />
          <path d="M 390 140 L 405 180 L 375 180 Z" />
        </g>

        <!-- Great Lakes -->
        <circle cx="340" cy="160" r="15" fill="#1E88E5" opacity="0.4"/>

        <!-- Coast lines -->
        <line x1="100" y1="100" x2="100" y2="380" stroke="#1E88E5" stroke-width="2"/>
        <line x1="450" y1="100" x2="450" y2="380" stroke="#1E88E5" stroke-width="2"/>

        <!-- Labels -->
        <text x="180" y="250" font-size="12" fill="#0D3D6B" font-weight="600">West Coast</text>
        <text x="320" y="250" font-size="12" fill="#0D3D6B" font-weight="600">Heartland</text>
        <text x="380" y="250" font-size="12" fill="#0D3D6B" font-weight="600">East</text>
        <text x="280" y="410" font-size="11" fill="#5A7A9A">⬇ Mississippi River</text>
        <text x="150" y="300" font-size="11" fill="#5A7A9A">Colorado ➜</text>
      </svg>
    `,
    japan: `
      <svg viewBox="0 0 400 500" style="max-width: 100%; height: auto; margin: 16px 0">
        <!-- Hokkaido (north) -->
        <ellipse cx="200" cy="80" rx="35" ry="45" fill="#E8F4F8" stroke="#1E88E5" stroke-width="2"/>

        <!-- Honshu (main) -->
        <path d="M 180 130 L 220 130 L 225 280 L 170 280 Z" fill="#E8F4F8" stroke="#1E88E5" stroke-width="2"/>

        <!-- Shikoku (south) -->
        <ellipse cx="200" cy="330" rx="25" ry="35" fill="#E8F4F8" stroke="#1E88E5" stroke-width="2"/>

        <!-- Kyushu (southwest) -->
        <path d="M 160 330 L 180 380 L 160 400 Z" fill="#E8F4F8" stroke="#1E88E5" stroke-width="2"/>

        <!-- Mount Fuji (iconic peak) -->
        <path d="M 195 180 L 210 240 L 180 240 Z" fill="#E63946" opacity="0.8"/>
        <path d="M 195 180 L 210 240 L 180 240 Z" fill="#FFFFFF" opacity="0.5" clip-path="polygon(50% 0%, 100% 85%, 0% 85%)"/>

        <!-- Major Rivers -->
        <path d="M 185 150 Q 190 200 195 250" stroke="#1E88E5" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 210 160 Q 205 210 200 260" stroke="#1E88E5" stroke-width="2" fill="none" stroke-linecap="round"/>

        <!-- Tokyo location marker -->
        <circle cx="215" cy="200" r="4" fill="#FFA726" opacity="0.8"/>
        <text x="225" y="205" font-size="10" fill="#0D3D6B" font-weight="600">Tokyo</text>

        <!-- Labels -->
        <text x="190" y="70" font-size="11" fill="#0D3D6B" font-weight="600">Hokkaido</text>
        <text x="195" y="200" font-size="11" fill="#0D3D6B" font-weight="600">Honshu</text>
        <text x="200" y="350" font-size="10" fill="#0D3D6B">Shikoku</text>
        <text x="165" y="390" font-size="10" fill="#0D3D6B">Kyushu</text>
      </svg>
    `,
    egypt: `
      <svg viewBox="0 0 300 500" style="max-width: 100%; height: auto; margin: 16px 0">
        <!-- Desert background -->
        <rect width="300" height="500" fill="#F4D4A8"/>

        <!-- Nile River flowing north -->
        <path d="M 150 50 Q 140 150 135 250 Q 130 350 140 450" stroke="#1E88E5" stroke-width="6" fill="none" stroke-linecap="round"/>

        <!-- Nile Delta (fan shape) -->
        <path d="M 135 450 L 120 480 L 140 480 Z" fill="#2ECC71" opacity="0.7"/>
        <path d="M 140 450 L 125 480 L 160 480 Z" fill="#2ECC71" opacity="0.7"/>

        <!-- Fertile areas along Nile -->
        <rect x="130" y="100" width="40" height="300" fill="#2ECC71" opacity="0.3"/>

        <!-- Oases marked -->
        <circle cx="80" cy="200" r="8" fill="#2ECC71" opacity="0.6"/>
        <text x="50" y="205" font-size="9" fill="#0D3D6B">Siwa</text>

        <circle cx="220" cy="300" r="8" fill="#2ECC71" opacity="0.6"/>
        <text x="230" y="305" font-size="9" fill="#0D3D6B">Kharga</text>

        <!-- Eastern and Western Deserts -->
        <text x="80" y="150" font-size="10" fill="#8B6F47" font-weight="600">W. Desert</text>
        <text x="200" y="150" font-size="10" fill="#8B6F47" font-weight="600">E. Desert</text>

        <!-- Mediterranean coast -->
        <rect x="0" y="430" width="300" height="70" fill="#87CEEB" opacity="0.5"/>
        <text x="130" y="460" font-size="10" fill="#0D3D6B" font-weight="600">Mediterranean</text>

        <!-- Suez Canal -->
        <line x1="200" y1="450" x2="250" y2="350" stroke="#1E88E5" stroke-width="2" stroke-dasharray="4"/>
        <text x="210" y="400" font-size="9" fill="#0D3D6B">Suez</text>
      </svg>
    `,
    brazil: `
      <svg viewBox="0 0 400 500" style="max-width: 100%; height: auto; margin: 16px 0">
        <!-- Country outline -->
        <rect x="80" y="80" width="240" height="340" fill="#E8F4F8" stroke="#1E88E5" stroke-width="2" rx="8"/>

        <!-- Amazon Rainforest (huge green area in north) -->
        <ellipse cx="180" cy="150" rx="80" ry="70" fill="#2ECC71" opacity="0.6"/>
        <text x="140" y="155" font-size="11" fill="#FFF" font-weight="600">Amazon</text>

        <!-- Major Rivers -->
        <!-- Amazon River -->
        <path d="M 120 140 Q 150 150 200 180 Q 230 200 280 220" stroke="#1E88E5" stroke-width="5" fill="none" stroke-linecap="round"/>

        <!-- Paraná River (south) -->
        <path d="M 240 280 L 250 400" stroke="#1E88E5" stroke-width="4" fill="none" stroke-linecap="round"/>

        <!-- Iguazu Falls marker -->
        <circle cx="250" cy="280" r="6" fill="#FF6B6B"/>
        <text x="260" y="285" font-size="9" fill="#0D3D6B">Iguazu</text>

        <!-- Atlantic Coast -->
        <line x1="320" y1="80" x2="320" y2="420" stroke="#1E88E5" stroke-width="3"/>

        <!-- Rio de Janeiro location -->
        <circle cx="310" cy="260" r="5" fill="#FFA726"/>
        <text x="270" y="265" font-size="9" fill="#0D3D6B">Rio de Janeiro</text>

        <!-- São Paulo location -->
        <circle cx="295" cy="300" r="5" fill="#FFA726"/>
        <text x="260" y="315" font-size="9" fill="#0D3D6B">São Paulo</text>

        <!-- South Atlantic region -->
        <text x="200" y="450" font-size="10" fill="#5A7A9A">Atlantic Ocean →</text>

        <!-- Regions -->
        <text x="150" y="380" font-size="10" fill="#0D3D6B" font-weight="600">South</text>
        <text x="200" y="250" font-size="10" fill="#0D3D6B" font-weight="600">Southeast</text>
      </svg>
    `,
    australia: `
      <svg viewBox="0 0 450 500" style="max-width: 100%; height: auto; margin: 16px 0">
        <!-- Country outline -->
        <ellipse cx="225" cy="250" rx="140" ry="160" fill="#E8F4F8" stroke="#1E88E5" stroke-width="2"/>

        <!-- Deserts (red/brown areas) -->
        <!-- Great Victoria Desert (southwest) -->
        <ellipse cx="140" cy="320" rx="60" ry="70" fill="#D2691E" opacity="0.5"/>
        <text x="110" y="330" font-size="9" fill="#8B4513" font-weight="600">Gt. Victoria</text>

        <!-- Great Sandy Desert (northwest) -->
        <ellipse cx="160" cy="180" rx="50" ry="60" fill="#D2691E" opacity="0.5"/>
        <text x="130" y="185" font-size="9" fill="#8B4513" font-weight="600">Gt. Sandy</text>

        <!-- Simpson Desert (center) -->
        <circle cx="220" cy="280" r="45" fill="#CD853F" opacity="0.5"/>
        <text x="200" y="285" font-size="9" fill="#8B4513">Simpson</text>

        <!-- Daintree Rainforest (north, green) -->
        <ellipse cx="250" cy="100" rx="40" ry="50" fill="#2ECC71" opacity="0.6"/>
        <text x="230" y="105" font-size="8" fill="#FFF">Daintree</text>

        <!-- Great Barrier Reef (northeast coast) -->
        <path d="M 300 80 Q 320 120 330 160" stroke="#FF6B6B" stroke-width="4" fill="none" opacity="0.8"/>
        <text x="340" y="120" font-size="9" fill="#FF6B6B" font-weight="600">Great</text>
        <text x="340" y="133" font-size="9" fill="#FF6B6B" font-weight="600">Barrier Reef</text>

        <!-- Major cities -->
        <circle cx="200" cy="380" r="4" fill="#FFA726"/>
        <text x="210" y="385" font-size="9" fill="#0D3D6B">Perth</text>

        <circle cx="290" cy="350" r="4" fill="#FFA726"/>
        <text x="300" y="355" font-size="9" fill="#0D3D6B">Adelaide</text>

        <circle cx="310" cy="320" r="4" fill="#FFA726"/>
        <text x="320" y="325" font-size="9" fill="#0D3D6B">Melbourne</text>

        <circle cx="320" cy="240" r="4" fill="#FFA726"/>
        <text x="330" y="245" font-size="9" fill="#0D3D6B">Sydney</text>

        <circle cx="280" cy="160" r="4" fill="#FFA726"/>
        <text x="290" y="165" font-size="9" fill="#0D3D6B">Brisbane</text>

        <!-- Legend -->
        <text x="60" y="480" font-size="10" fill="#5A7A9A">🏜️ Desert  🌲 Rainforest  🪸 Reef</text>
      </svg>
    `
  };

  return maps[countryId] || '';
}

/**
 * Categorize facts into geographic, wildlife, and other categories
 */
function categorizeFacts(country) {
  const geography = [];
  const wildlife = [];

  if (country.facts) {
    country.facts.forEach(fact => {
      const lower = fact.toLowerCase();
      if (
        lower.includes('island') ||
        lower.includes('mountain') ||
        lower.includes('river') ||
        lower.includes('ocean') ||
        lower.includes('desert') ||
        lower.includes('forest') ||
        lower.includes('canyon') ||
        lower.includes('lake') ||
        lower.includes('sea')
      ) {
        geography.push(fact);
      } else if (
        lower.includes('animal') ||
        lower.includes('bird') ||
        lower.includes('bear') ||
        lower.includes('panda') ||
        lower.includes('wildlife') ||
        lower.includes('species')
      ) {
        wildlife.push(fact);
      }
    });
  }

  return { geography, wildlife };
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
 * Get SVG visualization for a landmark
 */
function getLandmarkSVG(landmarkName) {
  const svgs = {
    'Statue of Liberty': `
      <svg viewBox="0 0 200 300" style="width: 120px; height: 180px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
        <defs>
          <linearGradient id="torchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Base/Pedestal -->
        <path d="M 60 200 L 50 240 L 150 240 L 140 200 Z" fill="#8B7355" />
        <rect x="50" y="240" width="100" height="30" fill="#696969" />
        <!-- Robe -->
        <path d="M 70 120 Q 60 140 65 200 L 135 200 Q 140 140 130 120 Z" fill="#4CAF50" />
        <!-- Body -->
        <circle cx="100" cy="90" r="20" fill="#D4A574" />
        <!-- Head -->
        <circle cx="100" cy="50" r="18" fill="#D4A574" />
        <!-- Crown -->
        <path d="M 85 32 L 88 20 L 100 15 L 112 20 L 115 32" fill="#FFD700" />
        <!-- Torch Arm -->
        <line x1="115" y1="85" x2="145" y2="60" stroke="#D4A574" stroke-width="8" />
        <!-- Torch Flame -->
        <ellipse cx="150" cy="55" rx="12" ry="20" fill="url(#torchGrad)" style="animation: flicker 0.8s infinite;" />
      </svg>
    `,
    'Grand Canyon': `
      <svg viewBox="0 0 200 200" style="width: 140px; height: 140px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
        <!-- Sky -->
        <rect width="200" height="80" fill="#87CEEB" />
        <!-- Canyon layers -->
        <path d="M 0 80 Q 50 120 100 140 Q 150 120 200 80 L 200 110 L 0 110 Z" fill="#CD7F32" />
        <path d="M 0 110 Q 50 140 100 160 Q 150 140 200 110 L 200 140 L 0 140 Z" fill="#8B4513" />
        <path d="M 0 140 Q 50 160 100 180 Q 150 160 200 140 L 200 200 L 0 200 Z" fill="#654321" />
        <!-- River -->
        <path d="M 95 140 Q 100 155 105 180" stroke="#4A90E2" stroke-width="3" fill="none" />
        <!-- Sun -->
        <circle cx="160" cy="30" r="15" fill="#FFD700" />
      </svg>
    `,
    'Pyramids of Giza': `
      <svg viewBox="0 0 220 200" style="width: 140px; height: 130px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
        <!-- Sky -->
        <rect width="220" height="100" fill="#87CEEB" />
        <!-- Sand -->
        <rect y="100" width="220" height="100" fill="#F4A460" />
        <!-- Great Pyramid -->
        <path d="M 60 180 L 110 60 L 160 180 Z" fill="#DAA520" stroke="#B8860B" stroke-width="1" />
        <!-- Middle Pyramid -->
        <path d="M 90 180 L 130 90 L 170 180 Z" fill="#CD853F" stroke="#8B4513" stroke-width="1" />
        <!-- Small Pyramid -->
        <path d="M 130 180 L 155 120 L 180 180 Z" fill="#C19A6B" stroke="#8B7355" stroke-width="1" />
        <!-- Stars hint -->
        <circle cx="30" cy="30" r="1.5" fill="#FFD700" />
        <circle cx="50" cy="20" r="1.5" fill="#FFD700" />
      </svg>
    `,
    'Mount Fuji': `
      <svg viewBox="0 0 200 240" style="width: 100px; height: 140px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
        <!-- Sky -->
        <rect width="200" height="120" fill="#FFB6C1" />
        <!-- Clouds -->
        <ellipse cx="50" cy="60" rx="30" ry="15" fill="#FFF" opacity="0.7" />
        <ellipse cx="150" cy="80" rx="25" ry="12" fill="#FFF" opacity="0.7" />
        <!-- Mountain -->
        <path d="M 40 120 L 100 40 L 160 120 Z" fill="#8B4513" />
        <!-- Snow cap -->
        <path d="M 100 40 L 95 60 L 105 60 Z" fill="#FFF" />
        <!-- Foothills -->
        <path d="M 20 120 Q 70 140 200 120 L 200 240 L 0 240 Z" fill="#228B22" />
      </svg>
    `,
    Sphinx: `
      <svg viewBox="0 0 200 150" style="width: 140px; height: 110px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
        <!-- Sand -->
        <rect y="80" width="200" height="70" fill="#F4A460" />
        <!-- Body (Lion) -->
        <ellipse cx="100" cy="95" rx="50" ry="30" fill="#DAA520" stroke="#8B4513" stroke-width="1" />
        <!-- Head (Human) -->
        <circle cx="100" cy="60" r="20" fill="#D4A574" />
        <!-- Headdress -->
        <path d="M 85 40 L 80 35 L 120 35 L 115 40 Q 100 45 85 40" fill="#FFD700" />
        <!-- Nose notch (characteristic of Sphinx) -->
        <rect x="98" y="65" width="4" height="10" fill="#8B4513" />
        <!-- Beard hint -->
        <line x1="100" y1="75" x2="100" y2="82" stroke="#8B4513" stroke-width="2" />
      </svg>
    `,
    'Mount Everest': `
      <svg viewBox="0 0 200 240" style="width: 100px; height: 140px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
        <!-- Sky -->
        <rect width="200" height="120" fill="#87CEEB" />
        <!-- Back mountain -->
        <path d="M 20 150 L 100 80 L 180 150 Z" fill="#696969" />
        <!-- Main mountain (Everest) -->
        <path d="M 50 150 L 100 30 L 150 150 Z" fill="#2F4F4F" />
        <!-- Snow -->
        <path d="M 100 30 L 92 60 L 108 60 Z" fill="#FFF" />
        <path d="M 100 30 L 85 100 L 115 100 Z" fill="#F0F8FF" />
        <!-- Foothills -->
        <path d="M 0 150 L 200 150 L 200 240 L 0 240 Z" fill="#8B4513" />
        <!-- Prayer flag -->
        <rect x="145" y="90" width="2" height="20" fill="#8B4513" />
        <path d="M 147 90 L 157 88 L 157 100 Z" fill="#FF6B6B" />
      </svg>
    `,
    Colosseum: `
      <svg viewBox="0 0 200 180" style="width: 140px; height: 130px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
        <!-- Ground -->
        <rect y="140" width="200" height="40" fill="#8B7355" />
        <!-- Outer wall (arches) -->
        <ellipse cx="100" cy="100" rx="60" ry="50" fill="#DAA520" stroke="#8B4513" stroke-width="2" />
        <!-- Inner arena -->
        <ellipse cx="100" cy="100" rx="40" ry="35" fill="#654321" />
        <!-- Arches visualization -->
        <circle cx="70" cy="70" r="6" fill="#8B4513" />
        <circle cx="100" cy="60" r="6" fill="#8B4513" />
        <circle cx="130" cy="70" r="6" fill="#8B4513" />
        <circle cx="70" cy="110" r="6" fill="#8B4513" />
        <circle cx="130" cy="110" r="6" fill="#8B4513" />
        <!-- Damaged section -->
        <path d="M 155 85 L 175 90 L 170 120" fill="none" stroke="#696969" stroke-width="2" />
      </svg>
    `
  };

  // Return SVG if exists, otherwise return a generic landmark icon
  if (svgs[landmarkName]) {
    return svgs[landmarkName];
  }

  // Fallback generic landmark SVG
  return `
    <svg viewBox="0 0 200 200" style="width: 120px; height: 120px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
      <rect width="200" height="200" fill="#f0f0f0" rx="8" />
      <rect x="40" y="80" width="30" height="80" fill="#8B4513" />
      <rect x="80" y="60" width="30" height="100" fill="#8B4513" />
      <rect x="120" y="80" width="30" height="80" fill="#8B4513" />
      <text x="100" y="180" font-size="24" text-anchor="middle" fill="#666">📍</text>
    </svg>
  `;
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

  // Get SVG landmark visualization
  const landmarkSVG = getLandmarkSVG(landmark.name);

  quest.innerHTML = `
    <div style="margin-bottom: 32px;">
      <div style="text-align: center; margin-bottom: 24px; height: 200px; display: flex; align-items: center; justify-content: center;">
        ${landmarkSVG}
      </div>
      <h3 style="text-align: center; margin-bottom: 12px;">${landmark.name}</h3>
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
            <p style="color: #4caf50; font-weight: 600; margin: 0;"><i class="ti ti-check"></i> Correct! ${resultCountry.flag}</p>
            <p style="color: var(--dom-text-muted); font-size: 13px; margin: 8px 0 0 0;">${resultCountry.name}</p>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `
          <div style="padding: 16px; background: rgba(255, 152, 0, 0.1); border-radius: 8px; border-left: 4px solid #ff9800;">
            <p style="color: #ff9800; font-weight: 600; margin: 0;"><i class="ti ti-info-circle"></i> The correct answer is ${resultCountry.flag} ${resultCountry.name}</p>
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

    // Map continents to Tabler icons
    const continentIcons = {
      africa: 'ti-map-pin-filled',
      asia: 'ti-map-2',
      americas: 'ti-world',
      europe: 'ti-world',
      oceania: 'ti-wave'
    };

    html += `
      <div class="collection-card" style="padding: 20px; border: 2px solid var(--dom-border); border-radius: 12px; cursor: pointer; transition: all 0.2s;" onclick="goToScreen('continent', { continent: '${continentId}' })">
        <div style="font-size: 28px; margin-bottom: 12px;"><i class="ti ${continentIcons[continentId]}"></i></div>
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
 * Update exploration streak
 */
function updateStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (gameState.lastExploreDate !== today) {
    if (gameState.lastExploreDate === yesterday) {
      gameState.streak += 1;
    } else {
      gameState.streak = 1;
    }
    gameState.lastExploreDate = today;
  }
}

/**
 * Check for newly unlocked achievements
 */
function checkAchievements() {
  const newAchievements = [];

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (!gameState.unlockedAchievements.includes(achievement.id) && achievement.requirement()) {
      gameState.unlockedAchievements.push(achievement.id);
      newAchievements.push(achievement);
    }
  });

  // Show notification for new achievements
  newAchievements.forEach(achievement => {
    showAchievementNotification(achievement);
  });
}

/**
 * Show achievement unlock notification
 */
function showAchievementNotification(achievement) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #000;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  notification.innerHTML = `
    <div style="font-size: 18px; margin-bottom: 4px;">🏆 Achievement Unlocked!</div>
    <div>${achievement.name}</div>
    <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">${achievement.description}</div>
  `;

  document.body.appendChild(notification);

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  if (!document.querySelector('style[data-achievement-animation]')) {
    style.setAttribute('data-achievement-animation', 'true');
    document.head.appendChild(style);
  }

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

/**
 * Update navigation metadata (explored count + streak)
 */
function updateNavMeta() {
  const exploredCount = gameState.explored.length;
  const navMeta = document.getElementById('nav-meta');
  const streakDisplay = gameState.streak > 0 ? ` | 🔥 ${gameState.streak}-day streak` : '';
  navMeta.textContent = `Explored: ${exploredCount}/195 🌍${streakDisplay}`;
}

/**
 * Save game progress to localStorage
 */
function saveProgress() {
  localStorage.setItem('we_explored', JSON.stringify(gameState.explored));
  localStorage.setItem('we_favorites', JSON.stringify(gameState.favorites));
  localStorage.setItem('we_landmarks', JSON.stringify(gameState.landmarksFound));
  localStorage.setItem('we_streak', JSON.stringify(gameState.streak));
  localStorage.setItem('we_lastExploreDate', gameState.lastExploreDate);
  localStorage.setItem('we_achievements', JSON.stringify(gameState.unlockedAchievements));
}

/**
 * Load game progress from localStorage
 */
function loadProgress() {
  const explored = localStorage.getItem('we_explored');
  const favorites = localStorage.getItem('we_favorites');
  const landmarks = localStorage.getItem('we_landmarks');
  const streak = localStorage.getItem('we_streak');
  const lastExploreDate = localStorage.getItem('we_lastExploreDate');
  const achievements = localStorage.getItem('we_achievements');

  if (explored) {
    gameState.explored = JSON.parse(explored);
  }

  if (favorites) {
    gameState.favorites = JSON.parse(favorites);
  }

  if (landmarks) {
    gameState.landmarksFound = JSON.parse(landmarks);
  }

  if (streak) {
    gameState.streak = JSON.parse(streak);
  }

  if (lastExploreDate) {
    gameState.lastExploreDate = lastExploreDate;
  }

  if (achievements) {
    gameState.unlockedAchievements = JSON.parse(achievements);
  }

  updateNavMeta();
}

/**
 * Generate quiz questions for a country (Multiple choice, Memory, Fill-in-the-blank)
 */
function generateQuizQuestions(countryId) {
  const country = findCountryById(countryId);
  if (!country || !country.facts || country.facts.length < 3) {
    return null;
  }

  const questions = [];

  // Question 1: Multiple Choice
  if (country.facts.length >= 3) {
    const correctFact = country.facts[0];
    const wrongAnswers = country.facts.slice(1, 3);
    const otherCountries = COUNTRIES.filter(c => c.id !== countryId && c.facts).slice(0, 2);
    const allWrong = [...wrongAnswers, ...otherCountries.flatMap(c => c.facts.slice(0, 1))].slice(
      0,
      3
    );

    questions.push({
      type: 'multiple-choice',
      question: `Which of these is a fact about ${country.name}?`,
      correct: correctFact,
      options: shuffle([correctFact, ...allWrong.slice(0, 3)])
    });
  }

  // Question 2: Memory Matching
  if (country.facts.length >= 4) {
    const facts = country.facts.slice(0, 4);
    const descriptions = facts.map(f => `${f.replace(/[\d\s]+/g, '__').substring(0, 40)}...`);
    questions.push({
      type: 'memory',
      question: `Match these facts about ${country.name}`,
      facts: facts,
      descriptions: shuffle(descriptions),
      pairs: facts.map((f, i) => ({
        fact: f,
        description:
          descriptions[
            descriptions.indexOf(descriptions.find(d => f.includes(d.slice(0, 10)))) || 0
          ]
      }))
    });
  }

  // Question 3: Fill in the Blank
  if (country.facts.length >= 2) {
    const fact = country.facts[1];
    const words = fact.split(' ');
    const blankIndex = Math.floor(Math.random() * Math.max(1, words.length - 2)) + 1;
    const correctWord = words[blankIndex];
    const blankedFact = [
      ...words.slice(0, blankIndex),
      '____',
      ...words.slice(blankIndex + 1)
    ].join(' ');

    questions.push({
      type: 'fill-blank',
      question: `Fill in the blank about ${country.name}:`,
      sentence: blankedFact,
      correct: correctWord,
      hint: `The word starts with '${correctWord[0]}'`
    });
  }

  // Question 4: Multiple Choice (Culture/Cities)
  if (country.cities || country.culture) {
    const capital = country.cities?.capital || 'Unknown';
    const wrongCapitals = COUNTRIES.filter(c => c.id !== countryId && c.cities?.capital)
      .map(c => c.cities.capital)
      .slice(0, 3);

    questions.push({
      type: 'multiple-choice',
      question: `What is the capital of ${country.name}?`,
      correct: capital,
      options: shuffle([capital, ...wrongCapitals])
    });
  }

  // Question 5: True/False style Fill-blank
  if (country.facts.length >= 3) {
    const fact = country.facts[2];
    const words = fact.split(' ');
    const modifiedWord = words[Math.floor(Math.random() * words.length)];
    const fakeFact = fact.replace(modifiedWord, '🤔');

    questions.push({
      type: 'fill-blank',
      question: `What word should replace the 🤔 in this ${country.name} fact?`,
      sentence: fakeFact,
      correct: modifiedWord,
      hint: `The word is '${modifiedWord}'`
    });
  }

  return questions.slice(0, 5); // Return up to 5 questions
}

/**
 * Start country knowledge quiz
 */
function startQuiz(countryId) {
  const country = findCountryById(countryId);
  if (!country) {
    return;
  }

  const questions = generateQuizQuestions(countryId);
  if (!questions || questions.length === 0) {
    alert('Not enough information about this country yet. Try another one!');
    return;
  }

  gameState.currentQuiz = {
    countryId,
    questions,
    currentQuestion: 0,
    answers: [],
    score: 0
  };

  goToScreen('quiz', { countryId });
  renderQuiz();
}

/**
 * Render current quiz question
 */
function renderQuiz() {
  const quiz = gameState.currentQuiz;
  if (!quiz || quiz.currentQuestion >= quiz.questions.length) {
    showQuizResults();
    return;
  }

  const question = quiz.questions[quiz.currentQuestion];
  const country = findCountryById(quiz.countryId);
  const progress = quiz.currentQuestion + 1;

  let html = `
    <div class="quiz-header">
      <h2>${country.flag} ${country.name} Knowledge Quiz</h2>
      <p class="quiz-progress">Question ${progress} of ${quiz.questions.length}</p>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${(progress / quiz.questions.length) * 100}%"></div>
      </div>
    </div>

    <div class="question-container">
      <span class="question-type-badge">${question.type === 'multiple-choice' ? '🎯 Multiple Choice' : question.type === 'memory' ? '🧠 Memory Match' : '✏️ Fill in Blank'}</span>
      <p class="question-text">${question.question}</p>
  `;

  if (question.type === 'multiple-choice') {
    html += `
      <div class="quiz-options">
        ${question.options
          .map(
            (option, idx) => `
          <label class="quiz-option" data-index="${idx}">
            <input type="radio" name="answer" value="${idx}" />
            ${option}
          </label>
        `
          )
          .join('')}
      </div>
    `;
  } else if (question.type === 'fill-blank') {
    html += `
      <p style="font-size: 14px; color: var(--dom-text-muted); margin-bottom: 12px;">${question.sentence}</p>
      <input type="text" class="fill-blank-input" id="blank-answer" placeholder="Type the missing word..." />
      <p style="font-size: 12px; color: var(--dom-text-muted); margin-top: 8px;">💡 ${question.hint}</p>
    `;
  }

  html += `
    <div class="quiz-actions">
      <button class="dom-btn dom-btn--secondary" id="skip-btn"><i class="ti ti-arrow-left"></i> Back</button>
      <button class="dom-btn dom-btn--primary" id="submit-btn"><i class="ti ti-check"></i> Check Answer</button>
    </div>
  `;

  document.getElementById('quiz-container').innerHTML = html;

  // Attach event listeners
  document.getElementById('skip-btn').addEventListener('click', goBack);
  document.getElementById('submit-btn').addEventListener('click', submitAnswer);

  if (question.type === 'multiple-choice') {
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', function () {
        document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
        this.querySelector('input').checked = true;
      });
    });
  } else if (question.type === 'fill-blank') {
    document.getElementById('blank-answer').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        submitAnswer();
      }
    });
  }
}

/**
 * Submit quiz answer and check correctness
 */
function submitAnswer() {
  const quiz = gameState.currentQuiz;
  const question = quiz.questions[quiz.currentQuestion];
  let isCorrect = false;

  if (question.type === 'multiple-choice') {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert('Please select an answer!');
      return;
    }
    const selectedIndex = parseInt(selected.value);
    const selectedAnswer = question.options[selectedIndex];
    isCorrect = selectedAnswer === question.correct;
    quiz.answers.push({ answer: selectedAnswer, correct: isCorrect });
  } else if (question.type === 'fill-blank') {
    const userAnswer = document.getElementById('blank-answer').value.trim().toLowerCase();
    isCorrect = userAnswer === question.correct.toLowerCase();
    quiz.answers.push({ answer: userAnswer, correct: isCorrect });

    if (!isCorrect) {
      alert(`Not quite! The answer is: ${question.correct}`);
    }
  }

  if (isCorrect) {
    quiz.score++;
    showFeedback('✅ Correct!', 'var(--color-success)');
  } else {
    showFeedback('❌ Try again!', '#f44336');
  }

  setTimeout(() => {
    quiz.currentQuestion++;
    renderQuiz();
  }, 1500);
}

/**
 * Show answer feedback
 */
function showFeedback(message, color) {
  const feedback = document.createElement('div');
  feedback.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${color};
    color: white;
    padding: 20px 40px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    z-index: 9999;
    animation: popIn 0.3s ease-out;
  `;
  feedback.textContent = message;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes popIn {
      0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
  `;
  if (!document.querySelector('style[data-quiz-feedback]')) {
    style.setAttribute('data-quiz-feedback', 'true');
    document.head.appendChild(style);
  }

  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 1200);
}

/**
 * Show quiz results
 */
function showQuizResults() {
  const quiz = gameState.currentQuiz;
  const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
  const isPerfect = percentage === 100;

  let message = '';
  let emoji = '';
  if (percentage === 100) {
    message = '🏆 Perfect Score!';
    emoji = '👑';
  } else if (percentage >= 80) {
    message = '🌟 Excellent!';
    emoji = '⭐';
  } else if (percentage >= 60) {
    message = '👍 Good Job!';
    emoji = '😊';
  } else {
    message = '💪 Keep Learning!';
    emoji = '📚';
  }

  let html = `
    <div class="quiz-results">
      <div style="font-size: 64px; margin-bottom: 12px;">${emoji}</div>
      <div class="results-score">${percentage}%</div>
      <div class="results-message">${message}</div>
      <div class="results-details">You got ${quiz.score} out of ${quiz.questions.length} questions correct!</div>
  `;

  if (isPerfect) {
    html += '<div class="results-badge">🏆 Quiz Master!</div>';
  }

  html += `
      <button class="dom-btn dom-btn--primary" id="finish-quiz-btn" style="margin-top: 20px;">
        <i class="ti ti-arrow-left"></i> Back to Country
      </button>
    </div>
  `;

  document.getElementById('quiz-container').innerHTML = html;
  document.getElementById('finish-quiz-btn').addEventListener('click', () => {
    goToScreen('country', { countryId: quiz.countryId });
    gameState.currentQuiz = null;
  });

  // Check for achievement: Perfect quiz score
  if (isPerfect) {
    showAchievementNotification({
      name: '🎓 Quiz Master',
      description: 'Perfect score on a country knowledge quiz!'
    });
  }
}

/**
 * Go back from quiz
 */
function goBack() {
  if (gameState.currentQuiz) {
    goToScreen('country', { countryId: gameState.currentQuiz.countryId });
    gameState.currentQuiz = null;
  }
}

/**
 * Shuffle array
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

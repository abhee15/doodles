/* eslint-disable no-undef */
// US States & Capitals — DOM Game
// Modes: Explore Map, State Quiz (click the state), Capital Quiz (multiple choice)

(function () {
  'use strict';

  // ─── State data ──────────────────────────────────────
  // Grid positions: row 0-7 (top=north), col 0-11 (left=west)
  const STATES = [
    // Northeast
    {
      id: 'ME',
      name: 'Maine',
      abbr: 'ME',
      capital: 'Augusta',
      region: 'ne',
      row: 0,
      col: 11,
      fact: 'Maine is the only US state that borders exactly one other state.'
    },
    {
      id: 'VT',
      name: 'Vermont',
      abbr: 'VT',
      capital: 'Montpelier',
      region: 'ne',
      row: 1,
      col: 10,
      fact: 'Montpelier is the smallest US state capital by population.'
    },
    {
      id: 'NH',
      name: 'New Hampshire',
      abbr: 'NH',
      capital: 'Concord',
      region: 'ne',
      row: 1,
      col: 11,
      fact: 'New Hampshire was the first state to declare independence from Britain in 1776.'
    },
    {
      id: 'MA',
      name: 'Massachusetts',
      abbr: 'MA',
      capital: 'Boston',
      region: 'ne',
      row: 2,
      col: 11,
      fact: "Massachusetts was home to America's first public school, founded in 1635."
    },
    {
      id: 'RI',
      name: 'Rhode Island',
      abbr: 'RI',
      capital: 'Providence',
      region: 'ne',
      row: 3,
      col: 11,
      fact: 'Rhode Island is the smallest US state by area.'
    },
    {
      id: 'CT',
      name: 'Connecticut',
      abbr: 'CT',
      capital: 'Hartford',
      region: 'ne',
      row: 3,
      col: 10,
      fact: 'Connecticut is the birthplace of the first nuclear-powered submarine.'
    },
    {
      id: 'NY',
      name: 'New York',
      abbr: 'NY',
      capital: 'Albany',
      region: 'ne',
      row: 2,
      col: 10,
      fact: 'New York City was the first capital of the United States.'
    },
    {
      id: 'NJ',
      name: 'New Jersey',
      abbr: 'NJ',
      capital: 'Trenton',
      region: 'ne',
      row: 3,
      col: 9,
      fact: 'New Jersey is the most densely populated US state.'
    },
    {
      id: 'PA',
      name: 'Pennsylvania',
      abbr: 'PA',
      capital: 'Harrisburg',
      region: 'ne',
      row: 3,
      col: 8,
      fact: 'The Liberty Bell and Independence Hall are both in Philadelphia, Pennsylvania.'
    },
    {
      id: 'DE',
      name: 'Delaware',
      abbr: 'DE',
      capital: 'Dover',
      region: 'ne',
      row: 4,
      col: 9,
      fact: 'Delaware was the first state to ratify the US Constitution in 1787.'
    },
    {
      id: 'MD',
      name: 'Maryland',
      abbr: 'MD',
      capital: 'Annapolis',
      region: 'ne',
      row: 4,
      col: 8,
      fact: 'Maryland was the first state to have a railroad.'
    },

    // Southeast
    {
      id: 'VA',
      name: 'Virginia',
      abbr: 'VA',
      capital: 'Richmond',
      region: 'se',
      row: 4,
      col: 7,
      fact: 'Virginia is called the "Mother of Presidents" — 8 US presidents were born there.'
    },
    {
      id: 'WV',
      name: 'West Virginia',
      abbr: 'WV',
      capital: 'Charleston',
      region: 'se',
      row: 4,
      col: 6,
      fact: 'West Virginia became a state during the Civil War in 1863.'
    },
    {
      id: 'NC',
      name: 'North Carolina',
      abbr: 'NC',
      capital: 'Raleigh',
      region: 'se',
      row: 5,
      col: 7,
      fact: 'The first successful airplane flight by the Wright Brothers happened in North Carolina.'
    },
    {
      id: 'SC',
      name: 'South Carolina',
      abbr: 'SC',
      capital: 'Columbia',
      region: 'se',
      row: 6,
      col: 7,
      fact: 'South Carolina was the first state to secede from the Union in 1860.'
    },
    {
      id: 'GA',
      name: 'Georgia',
      abbr: 'GA',
      capital: 'Atlanta',
      region: 'se',
      row: 6,
      col: 6,
      fact: 'Georgia produces more peanuts than any other US state.'
    },
    {
      id: 'FL',
      name: 'Florida',
      abbr: 'FL',
      capital: 'Tallahassee',
      region: 'se',
      row: 7,
      col: 7,
      fact: 'Florida has more golf courses than any other US state.'
    },
    {
      id: 'AL',
      name: 'Alabama',
      abbr: 'AL',
      capital: 'Montgomery',
      region: 'se',
      row: 6,
      col: 5,
      fact: 'Alabama was the first state to declare Christmas a legal holiday in 1836.'
    },
    {
      id: 'MS',
      name: 'Mississippi',
      abbr: 'MS',
      capital: 'Jackson',
      region: 'se',
      row: 6,
      col: 4,
      fact: 'The Mississippi River, the longest river in the US, borders Mississippi.'
    },
    {
      id: 'TN',
      name: 'Tennessee',
      abbr: 'TN',
      capital: 'Nashville',
      region: 'se',
      row: 5,
      col: 6,
      fact: 'Tennessee is known as the "Volunteer State" after its huge response during the War of 1812.'
    },
    {
      id: 'KY',
      name: 'Kentucky',
      abbr: 'KY',
      capital: 'Frankfort',
      region: 'se',
      row: 4,
      col: 5,
      fact: 'Kentucky is home to Mammoth Cave, the longest known cave system in the world.'
    },
    {
      id: 'AR',
      name: 'Arkansas',
      abbr: 'AR',
      capital: 'Little Rock',
      region: 'se',
      row: 6,
      col: 3,
      fact: 'Arkansas has the only active diamond mine in the US open to the public.'
    },
    {
      id: 'LA',
      name: 'Louisiana',
      abbr: 'LA',
      capital: 'Baton Rouge',
      region: 'se',
      row: 7,
      col: 4,
      fact: 'Louisiana is the only US state with political units called "parishes" instead of counties.'
    },

    // Midwest
    {
      id: 'OH',
      name: 'Ohio',
      abbr: 'OH',
      capital: 'Columbus',
      region: 'mw',
      row: 3,
      col: 7,
      fact: 'Ohio is known as the "Mother of Astronauts" — more astronauts come from Ohio than any other state.'
    },
    {
      id: 'IN',
      name: 'Indiana',
      abbr: 'IN',
      capital: 'Indianapolis',
      region: 'mw',
      row: 4,
      col: 4,
      fact: "The Indianapolis 500, one of the world's oldest car races, is held in Indiana every year."
    },
    {
      id: 'IL',
      name: 'Illinois',
      abbr: 'IL',
      capital: 'Springfield',
      region: 'mw',
      row: 4,
      col: 3,
      fact: 'Abraham Lincoln, the 16th US President, is strongly associated with Illinois, known as the "Land of Lincoln."'
    },
    {
      id: 'MI',
      name: 'Michigan',
      abbr: 'MI',
      capital: 'Lansing',
      region: 'mw',
      row: 2,
      col: 6,
      fact: 'Michigan is the only US state divided into two separate peninsulas.'
    },
    {
      id: 'WI',
      name: 'Wisconsin',
      abbr: 'WI',
      capital: 'Madison',
      region: 'mw',
      row: 2,
      col: 4,
      fact: 'Wisconsin produces more cheese than any other US state.'
    },
    {
      id: 'MN',
      name: 'Minnesota',
      abbr: 'MN',
      capital: 'Saint Paul',
      region: 'mw',
      row: 1,
      col: 4,
      fact: 'Minnesota has more than 10,000 lakes — more than any other US state outside Alaska.'
    },
    {
      id: 'IA',
      name: 'Iowa',
      abbr: 'IA',
      capital: 'Des Moines',
      region: 'mw',
      row: 3,
      col: 3,
      fact: 'Iowa grows about 20% of the corn produced in the entire United States.'
    },
    {
      id: 'MO',
      name: 'Missouri',
      abbr: 'MO',
      capital: 'Jefferson City',
      region: 'mw',
      row: 4,
      col: 2,
      fact: "Missouri's Gateway Arch is the tallest man-made monument in the United States."
    },
    {
      id: 'ND',
      name: 'North Dakota',
      abbr: 'ND',
      capital: 'Bismarck',
      region: 'mw',
      row: 1,
      col: 3,
      fact: 'North Dakota is the least visited US state.'
    },
    {
      id: 'SD',
      name: 'South Dakota',
      abbr: 'SD',
      capital: 'Pierre',
      region: 'mw',
      row: 2,
      col: 3,
      fact: 'Mount Rushmore, featuring four US presidents, is located in South Dakota.'
    },
    {
      id: 'NE',
      name: 'Nebraska',
      abbr: 'NE',
      capital: 'Lincoln',
      region: 'mw',
      row: 3,
      col: 2,
      fact: 'Nebraska is the only US state with a unicameral (one-chamber) legislature.'
    },
    {
      id: 'KS',
      name: 'Kansas',
      abbr: 'KS',
      capital: 'Topeka',
      region: 'mw',
      row: 4,
      col: 1,
      fact: 'Kansas is the geographic center of the contiguous United States.'
    },

    // Southwest
    {
      id: 'TX',
      name: 'Texas',
      abbr: 'TX',
      capital: 'Austin',
      region: 'sw',
      row: 6,
      col: 1,
      fact: 'Texas is so big that El Paso is closer to California than it is to Houston.'
    },
    {
      id: 'OK',
      name: 'Oklahoma',
      abbr: 'OK',
      capital: 'Oklahoma City',
      region: 'sw',
      row: 5,
      col: 1,
      fact: 'Oklahoma has more tornadoes per square mile than any other US state.'
    },
    {
      id: 'NM',
      name: 'New Mexico',
      abbr: 'NM',
      capital: 'Santa Fe',
      region: 'sw',
      row: 6,
      col: 0,
      fact: 'Santa Fe, New Mexico, is the highest capital city in the United States.'
    },
    {
      id: 'AZ',
      name: 'Arizona',
      abbr: 'AZ',
      capital: 'Phoenix',
      region: 'sw',
      row: 5,
      col: 2,
      fact: 'The Grand Canyon, one of the Seven Natural Wonders, is located in Arizona.'
    },
    {
      id: 'CO',
      name: 'Colorado',
      abbr: 'CO',
      capital: 'Denver',
      region: 'sw',
      row: 5,
      col: 0,
      fact: 'Colorado has more mountains taller than 14,000 feet than any other US state.'
    },
    {
      id: 'UT',
      name: 'Utah',
      abbr: 'UT',
      capital: 'Salt Lake City',
      region: 'sw',
      row: 4,
      col: 0,
      fact: "Utah's Great Salt Lake is the largest saltwater lake in the Western Hemisphere."
    },

    // West
    {
      id: 'CA',
      name: 'California',
      abbr: 'CA',
      capital: 'Sacramento',
      region: 'w',
      row: 6,
      col: 2,
      fact: 'California has the largest economy of any US state — bigger than most countries.'
    },
    {
      id: 'NV',
      name: 'Nevada',
      abbr: 'NV',
      capital: 'Carson City',
      region: 'w',
      row: 5,
      col: 3,
      fact: 'Nevada is the driest state in the US, receiving an average of only 7 inches of rain per year.'
    },
    {
      id: 'OR',
      name: 'Oregon',
      abbr: 'OR',
      capital: 'Salem',
      region: 'w',
      row: 3,
      col: 0,
      fact: 'Crater Lake in Oregon is the deepest lake in the United States.'
    },
    {
      id: 'WA',
      name: 'Washington',
      abbr: 'WA',
      capital: 'Olympia',
      region: 'w',
      row: 2,
      col: 0,
      fact: 'Washington state produces more apples than any other US state.'
    },
    {
      id: 'ID',
      name: 'Idaho',
      abbr: 'ID',
      capital: 'Boise',
      region: 'w',
      row: 2,
      col: 1,
      fact: 'Idaho produces about one-third of all the potatoes grown in the United States.'
    },
    {
      id: 'MT',
      name: 'Montana',
      abbr: 'MT',
      capital: 'Helena',
      region: 'w',
      row: 1,
      col: 1,
      fact: 'Montana is the fourth largest US state but has only about 1 million people.'
    },
    {
      id: 'WY',
      name: 'Wyoming',
      abbr: 'WY',
      capital: 'Cheyenne',
      region: 'w',
      row: 2,
      col: 2,
      fact: 'Wyoming has the smallest population of any US state.'
    },
    {
      id: 'AK',
      name: 'Alaska',
      abbr: 'AK',
      capital: 'Juneau',
      region: 'w',
      row: 7,
      col: 0,
      fact: "Alaska is the largest US state and contains more than half of the world's glaciers."
    },
    {
      id: 'HI',
      name: 'Hawaii',
      abbr: 'HI',
      capital: 'Honolulu',
      region: 'w',
      row: 7,
      col: 2,
      fact: 'Hawaii is the only US state located entirely in the tropics.'
    }
  ];

  const REGION_LABELS = {
    ne: 'Northeast',
    se: 'Southeast',
    mw: 'Midwest',
    sw: 'Southwest',
    w: 'West'
  };

  const REGION_COLORS = {
    ne: '#6366f1',
    se: '#ec4899',
    mw: '#f59e0b',
    sw: '#ef4444',
    w: '#10b981'
  };

  const QUIZ_LENGTH = 10;
  const GRID_ROWS = 8;
  const GRID_COLS = 12;
  const CELL_SIZE = 54;

  // ─── Game state ──────────────────────────────────────
  let nav;
  let currentMode = '';
  let quizQuestions = [];
  let quizIdx = 0;
  let quizResults = [];
  let quizAnswered = false;

  // ─── Helpers ─────────────────────────────────────────
  function getStateById(id) {
    return STATES.find(function (s) {
      return s.id === id;
    });
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function pickRandom(arr, count) {
    return shuffleArray(arr).slice(0, count);
  }

  function starsForScore(correct, total) {
    const pct = (correct / total) * 100;
    if (pct >= 90) {
      return 3;
    }
    if (pct >= 60) {
      return 2;
    }
    return 1;
  }

  // ─── Map builder ─────────────────────────────────────
  function buildMapHTML(mapMode) {
    const width = GRID_COLS * CELL_SIZE;
    const height = GRID_ROWS * CELL_SIZE;

    let cellsHtml = '';
    STATES.forEach(function (state) {
      const top = state.row * CELL_SIZE;
      const left = state.col * CELL_SIZE;
      const color = REGION_COLORS[state.region];
      cellsHtml +=
        '<div class="state-cell" ' +
        `data-id="${state.id}" ` +
        `data-mode="${mapMode}" ` +
        'style="' +
        'position:absolute;' +
        `top:${top}px;` +
        `left:${left}px;` +
        `width:${CELL_SIZE - 3}px;` +
        `height:${CELL_SIZE - 3}px;` +
        `background:${color};` +
        'border-radius:6px;' +
        'border:2px solid rgba(255,255,255,0.25);' +
        'display:flex;align-items:center;justify-content:center;' +
        'cursor:pointer;' +
        'transition:filter 0.15s,border-color 0.15s,transform 0.1s;' +
        'font-size:0.62rem;font-weight:700;color:#fff;text-align:center;line-height:1.1;' +
        'user-select:none;' +
        `">${state.abbr}</div>`;
    });

    return (
      '<div class="state-grid-wrap" style="overflow:auto;-webkit-overflow-scrolling:touch;">' +
      `<div style="position:relative;width:${width}px;height:${height}px;margin:0 auto;">${
        cellsHtml
      }</div>` +
      '</div>'
    );
  }

  function buildLegendHTML() {
    let html = '<div class="region-legend">';
    const regions = ['ne', 'se', 'mw', 'sw', 'w'];
    regions.forEach(function (r) {
      html +=
        '<div class="legend-item">' +
        `<div class="legend-dot" style="background:${REGION_COLORS[r]}"></div>${
          REGION_LABELS[r]
        }</div>`;
    });
    html += '</div>';
    return html;
  }

  function attachMapHoverStyles() {
    document.querySelectorAll('.state-cell').forEach(function (cell) {
      cell.addEventListener('mouseover', function () {
        if (!cell.classList.contains('cell-correct') && !cell.classList.contains('cell-wrong')) {
          cell.style.filter = 'brightness(1.35)';
          cell.style.borderColor = 'rgba(255,255,255,0.85)';
          cell.style.transform = 'scale(1.08)';
          cell.style.zIndex = '10';
        }
      });
      cell.addEventListener('mouseout', function () {
        if (!cell.classList.contains('cell-highlighted')) {
          cell.style.filter = '';
          cell.style.borderColor = 'rgba(255,255,255,0.25)';
          cell.style.transform = '';
          cell.style.zIndex = '';
        }
      });
    });
  }

  function highlightCell(id) {
    document.querySelectorAll('.state-cell').forEach(function (cell) {
      cell.classList.remove('cell-highlighted');
      cell.style.filter = '';
      cell.style.borderColor = 'rgba(255,255,255,0.25)';
      cell.style.transform = '';
      cell.style.zIndex = '';
    });
    const target = document.querySelector(`.state-cell[data-id="${id}"]`);
    if (target) {
      target.classList.add('cell-highlighted');
      target.style.filter = 'brightness(1.5)';
      target.style.borderColor = 'var(--dom-accent)';
      target.style.transform = 'scale(1.1)';
      target.style.zIndex = '10';
    }
  }

  function markCellCorrect(id) {
    const target = document.querySelector(`.state-cell[data-id="${id}"]`);
    if (target) {
      target.classList.add('cell-correct');
      target.style.background = '#10b981';
      target.style.borderColor = '#fff';
      target.style.filter = 'brightness(1.2)';
    }
  }

  function markCellWrong(id) {
    const target = document.querySelector(`.state-cell[data-id="${id}"]`);
    if (target) {
      target.classList.add('cell-wrong');
      target.style.background = '#ef4444';
      target.style.borderColor = '#fff';
      target.style.filter = 'brightness(1.2)';
    }
  }

  // ─── Navigation setup ────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof GameNavigation !== 'undefined') {
      nav = new GameNavigation('us-states', {
        screens: ['landing', 'explore', 'quiz-state', 'quiz-capital', 'results'],
        initialScreen: 'landing',
        gameName: 'US States & Capitals'
      });
    }
    renderLanding();
  });

  // ─── Landing Screen ──────────────────────────────────
  function renderLanding() {
    if (nav) {
      nav.goToScreen('landing');
    }
    const el = document.getElementById('screen-landing');
    el.innerHTML =
      '<div class="mode-cards">' +
      '<div class="mode-card" id="btn-explore">' +
      '<div class="icon">🗺️</div>' +
      '<h3>Explore Map</h3>' +
      '<p>Click any state to learn its capital, region, and a fun fact</p>' +
      '</div>' +
      '<div class="mode-card" id="btn-quiz-state">' +
      '<div class="icon">📍</div>' +
      '<h3>State Quiz</h3>' +
      '<p>Can you click the right state on the map? 10 questions!</p>' +
      '</div>' +
      '<div class="mode-card" id="btn-quiz-capital">' +
      '<div class="icon">🏛️</div>' +
      '<h3>Capital Quiz</h3>' +
      "<p>What's the capital city? 4 choices, 10 questions!</p>" +
      '</div>' +
      '</div>';

    el.querySelector('#btn-explore').addEventListener('click', function () {
      currentMode = 'explore';
      renderExplore();
    });
    el.querySelector('#btn-quiz-state').addEventListener('click', function () {
      currentMode = 'quiz-state';
      startStateQuiz();
    });
    el.querySelector('#btn-quiz-capital').addEventListener('click', function () {
      currentMode = 'quiz-capital';
      startCapitalQuiz();
    });
  }

  // ─── Explore Screen ──────────────────────────────────
  function renderExplore() {
    if (nav) {
      nav.goToScreen('explore');
    }
    const el = document.getElementById('screen-explore');

    el.innerHTML =
      `${buildLegendHTML() + buildMapHTML('explore')}<div class="info-panel" id="explore-info">` +
      '<h3 style="color:var(--dom-text-muted)">Click a state to learn about it</h3>' +
      '</div>';

    attachMapHoverStyles();

    el.querySelectorAll('.state-cell').forEach(function (cell) {
      cell.addEventListener('click', function () {
        const id = cell.getAttribute('data-id');
        highlightCell(id);
        showStateInfo(id);
      });
    });
  }

  function showStateInfo(id) {
    const state = getStateById(id);
    if (!state) {
      return;
    }
    const panel = document.getElementById('explore-info');
    if (!panel) {
      return;
    }
    panel.innerHTML =
      `<h3>${state.name}</h3>` +
      `<div class="info-detail">Capital: <strong>${state.capital}</strong></div>` +
      `<div class="info-detail">Abbreviation: <strong>${state.abbr}</strong></div>` +
      `<div class="info-detail">Region: <strong style="color:${REGION_COLORS[state.region]}">${REGION_LABELS[state.region]}</strong></div>` +
      `<div class="info-fact">💡 ${state.fact}</div>`;
  }

  // ─── State Quiz (click the state on the map) ─────────
  function startStateQuiz() {
    quizQuestions = pickRandom(STATES, QUIZ_LENGTH);
    quizIdx = 0;
    quizResults = [];
    quizAnswered = false;
    renderStateQuiz();
  }

  function renderStateQuiz() {
    if (nav) {
      nav.goToScreen('quiz-state');
    }
    const el = document.getElementById('screen-quiz-state');
    const q = quizQuestions[quizIdx];
    const pct = (quizIdx / QUIZ_LENGTH) * 100;

    el.innerHTML =
      `<div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>` +
      `<div class="question-text">Click on <strong style="color:#fbbf24">${q.name}</strong></div>${buildLegendHTML()}${buildMapHTML(
        'quiz-state'
      )}<div class="feedback" id="quiz-state-feedback"></div>`;

    attachMapHoverStyles();
    quizAnswered = false;

    el.querySelectorAll('.state-cell').forEach(function (cell) {
      cell.addEventListener('click', function () {
        if (quizAnswered) {
          return;
        }
        quizAnswered = true;
        const clickedId = cell.getAttribute('data-id');
        handleStateQuizAnswer(clickedId, q.id);
      });
    });
  }

  function handleStateQuizAnswer(clickedId, correctId) {
    const correct = clickedId === correctId;
    const fb = document.getElementById('quiz-state-feedback');
    const clickedState = getStateById(clickedId);
    const correctState = getStateById(correctId);

    if (correct) {
      markCellCorrect(correctId);
      quizResults.push({ correct: true });
      if (fb) {
        fb.className = 'feedback correct';
        fb.textContent = '✓ Correct!';
      }
    } else {
      markCellWrong(clickedId);
      markCellCorrect(correctId);
      quizResults.push({ correct: false });
      if (fb) {
        fb.className = 'feedback wrong';
        fb.textContent = `✗ That was ${clickedState ? clickedState.name : ''}. ${correctState ? correctState.name : ''} is highlighted in green.`;
      }
    }

    // Disable further clicks
    document.querySelectorAll('.state-cell').forEach(function (cell) {
      cell.style.pointerEvents = 'none';
    });

    setTimeout(function () {
      quizIdx++;
      if (quizIdx >= QUIZ_LENGTH) {
        showResults();
      } else {
        renderStateQuiz();
      }
    }, 1800);
  }

  // ─── Capital Quiz (multiple choice) ──────────────────
  function startCapitalQuiz() {
    quizQuestions = pickRandom(STATES, QUIZ_LENGTH);
    quizIdx = 0;
    quizResults = [];
    quizAnswered = false;
    renderCapitalQuiz();
  }

  function renderCapitalQuiz() {
    if (nav) {
      nav.goToScreen('quiz-capital');
    }
    const el = document.getElementById('screen-quiz-capital');
    const q = quizQuestions[quizIdx];
    const pct = (quizIdx / QUIZ_LENGTH) * 100;

    // 4 options: correct answer + 3 random wrong capitals
    const otherStates = STATES.filter(function (s) {
      return s.id !== q.id;
    });
    const wrongOptions = pickRandom(otherStates, 3).map(function (s) {
      return s.capital;
    });
    const options = shuffleArray([q.capital].concat(wrongOptions));

    let optionsHtml = '<div class="options-grid">';
    options.forEach(function (opt) {
      optionsHtml += `<button class="option-btn" data-capital="${opt}">${opt}</button>`;
    });
    optionsHtml += '</div>';

    el.innerHTML =
      `<div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>` +
      `<div class="question-text">What is the capital of <strong style="color:#fbbf24">${q.name}</strong>?</div>${
        optionsHtml
      }<div class="feedback" id="quiz-capital-feedback"></div>`;

    quizAnswered = false;

    el.querySelectorAll('.option-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (quizAnswered) {
          return;
        }
        quizAnswered = true;
        const chosen = btn.getAttribute('data-capital');
        handleCapitalQuizAnswer(chosen, q.capital, el);
      });
    });
  }

  function handleCapitalQuizAnswer(chosen, correct, el) {
    const isCorrect = chosen === correct;
    const fb = document.getElementById('quiz-capital-feedback');

    el.querySelectorAll('.option-btn').forEach(function (btn) {
      btn.disabled = true;
      const cap = btn.getAttribute('data-capital');
      if (cap === correct) {
        btn.classList.add('correct');
      } else if (cap === chosen && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      quizResults.push({ correct: true });
      if (fb) {
        fb.className = 'feedback correct';
        fb.textContent = '✓ Correct!';
      }
    } else {
      quizResults.push({ correct: false });
      if (fb) {
        fb.className = 'feedback wrong';
        fb.textContent = `✗ The answer is ${correct}`;
      }
    }

    setTimeout(function () {
      quizIdx++;
      if (quizIdx >= QUIZ_LENGTH) {
        showResults();
      } else {
        renderCapitalQuiz();
      }
    }, 1500);
  }

  // ─── Results Screen ───────────────────────────────────
  function showResults() {
    if (nav) {
      nav.goToScreen('results');
    }
    const el = document.getElementById('screen-results');
    const correct = quizResults.filter(function (r) {
      return r.correct;
    }).length;
    const total = quizResults.length;
    const pct = Math.round((correct / total) * 100);
    const stars = starsForScore(correct, total);
    const starsStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    const modeLabel = currentMode === 'quiz-state' ? 'State Quiz' : 'Capital Quiz';
    const otherLabel = currentMode === 'quiz-state' ? 'Try Capitals' : 'Try State Quiz';

    el.innerHTML =
      `<div class="stars">${starsStr}</div>` +
      `<div class="section-title">${modeLabel} Complete!</div>` +
      '<div class="stats-grid">' +
      `<div class="stat-card"><div class="value">${correct}/${total}</div><div class="label">Correct</div></div>` +
      `<div class="stat-card"><div class="value">${pct}%</div><div class="label">Accuracy</div></div>` +
      '</div>' +
      '<div class="btn-row">' +
      '<button class="dom-btn dom-btn--primary" id="res-again">Play Again</button>' +
      `<button class="dom-btn dom-btn--ghost" id="res-other">${otherLabel}</button>` +
      '<button class="dom-btn dom-btn--ghost" id="res-home">Home</button>' +
      '</div>';

    el.querySelector('#res-again').addEventListener('click', function () {
      if (currentMode === 'quiz-state') {
        startStateQuiz();
      } else {
        startCapitalQuiz();
      }
    });
    el.querySelector('#res-other').addEventListener('click', function () {
      if (currentMode === 'quiz-state') {
        currentMode = 'quiz-capital';
        startCapitalQuiz();
      } else {
        currentMode = 'quiz-state';
        startStateQuiz();
      }
    });
    el.querySelector('#res-home').addEventListener('click', function () {
      renderLanding();
    });
  }
})();

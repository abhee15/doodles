// VP Pup — Dog Town Game Logic
/* global VPs, BATCHES */

const STREETS = [
  { label: 'Founding Alley', emoji: '🎩', subtitle: '1789–1841' },
  { label: 'Frontier Road', emoji: '🤠', subtitle: '1841–1877' },
  { label: 'Progress Lane', emoji: '🚂', subtitle: '1877–1929' },
  { label: 'New Deal Drive', emoji: '📻', subtitle: '1929–1974' },
  { label: 'Modern Mile', emoji: '🚀', subtitle: '1977–today' }
];

const HOUSE_COLORS = [
  '#ef5350',
  '#ff7043',
  '#ffa726',
  '#66bb6a',
  '#26c6da',
  '#42a5f5',
  '#7e57c2',
  '#ec407a',
  '#8d6e63',
  '#78909c'
];

const BATCH_SKY = [
  'linear-gradient(180deg, #050520 0%, #0d1b4b 65%, #162156 100%)',
  'linear-gradient(180deg, #4a1000 0%, #8b2800 50%, #c25500 100%)',
  'linear-gradient(180deg, #081208 0%, #0f2d0f 60%, #1a4020 100%)',
  'linear-gradient(180deg, #0e0820 0%, #2d1060 60%, #4a1a80 100%)',
  'linear-gradient(180deg, #001820 0%, #003040 60%, #005870 100%)'
];

const GameState = {
  screen: 'landing',
  batchIndex: null,
  currentVpIndex: 0,
  quizAnswers: [],
  quizScore: 0,
  visitedIndices: []
};

// ============================================================================
// SCREEN ROUTING
// ============================================================================

function showScreen(screenId) {
  document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  GameState.screen = screenId;

  const meta = document.getElementById('nav-meta');
  switch (screenId) {
    case 'landing':
      renderLandingScreen();
      meta.textContent = 'Pick a Block';
      break;
    case 'learn':
      renderLearnScreen();
      meta.textContent = 'Learn';
      break;
    case 'quiz':
      renderQuizScreen();
      meta.textContent = 'Quiz';
      break;
    case 'score':
      renderScoreScreen();
      meta.textContent = 'Results';
      break;
  }
}

// ============================================================================
// LANDING SCREEN
// ============================================================================

function renderLandingScreen() {
  const grid = document.getElementById('batch-grid');
  grid.innerHTML = '';

  BATCHES.forEach((batch, i) => {
    const street = STREETS[i];
    const btn = document.createElement('button');
    btn.className = 'batch-btn';
    btn.innerHTML = `
      <span class="batch-street-emoji">${street.emoji}</span>
      <strong>${street.label}</strong>
      <small>${batch.label} &middot; ${street.subtitle}</small>
    `;
    btn.addEventListener('click', () => startBatch(i));
    grid.appendChild(btn);
  });
}

// ============================================================================
// BATCH START
// ============================================================================

function startBatch(batchIndex) {
  GameState.batchIndex = batchIndex;
  GameState.currentVpIndex = 0;
  GameState.quizAnswers = [];
  GameState.quizScore = 0;
  GameState.visitedIndices = [];
  showScreen('learn');
}

// ============================================================================
// TOWN BLOCK RENDERER
// ============================================================================

function renderTownBlock(containerId, activeIndex) {
  const container = document.getElementById(containerId);
  const street = STREETS[GameState.batchIndex];
  const batch = BATCHES[GameState.batchIndex];

  let housesHtml = '';
  for (let i = 0; i < batch.count; i++) {
    const isActive = i === activeIndex;
    const isVisited = GameState.visitedIndices.includes(i) && !isActive;
    const isUpcoming = i > activeIndex && !GameState.visitedIndices.includes(i);
    const stateClass = isActive
      ? ' active'
      : isVisited
        ? ' visited'
        : isUpcoming
          ? ' upcoming'
          : '';
    const inner = isVisited
      ? '<span class="house-check">✓</span>'
      : `<span class="house-num">${i + 1}</span>`;

    housesHtml += `
      <div class="house-tile${stateClass}" style="--hc:${HOUSE_COLORS[i]}">
        <div class="house-roof"></div>
        <div class="house-body">${inner}</div>
      </div>`;
  }

  container.innerHTML = `
    <div class="street-header">
      <span class="street-emoji">${street.emoji}</span>
      <span class="street-label">${street.label}</span>
    </div>
    <div class="house-grid">${housesHtml}</div>
  `;
}

// ============================================================================
// LEARN SCREEN
// ============================================================================

function renderLearnScreen() {
  if (!GameState.visitedIndices.includes(GameState.currentVpIndex)) {
    GameState.visitedIndices.push(GameState.currentVpIndex);
  }
  renderTownBlock('town-block-learn', GameState.currentVpIndex);
  renderLearnCard();
  renderStepDots();
  updateProgressBar('learn');
  attachLearnListeners();
}

function renderLearnCard() {
  const batch = BATCHES[GameState.batchIndex];
  const vp = VPs[batch.start + GameState.currentVpIndex];
  const color = HOUSE_COLORS[GameState.currentVpIndex];

  let partyClass = 'other';
  if (vp.party.includes('D')) {
    partyClass = 'd';
  } else if (vp.party.includes('R')) {
    partyClass = 'r';
  }

  document.getElementById('learn-card-container').innerHTML = `
    ${renderScenePanel(vp, GameState.batchIndex, color)}
    <div class="learn-card" style="--card-accent:${color}">
      <div class="vp-header">
        <div class="party-badge ${partyClass}">${vp.party}</div>
        <div class="vp-number">VP #${vp.n}</div>
        <div class="vp-name">${vp.name}</div>
        <div class="vp-term">${vp.term}</div>
        <div class="served-badge">
          <span class="served-label">Served under:</span>
          <strong>${vp.servedUnder}</strong>
        </div>
      </div>
      <div>
        <div class="fact-box">💡 <strong>Fact:</strong> ${vp.fact}</div>
        <div class="tip-box">🏠 <strong>Memory Hook:</strong> ${vp.tip}</div>
      </div>
    </div>
  `;
}

function renderStepDots() {
  const batch = BATCHES[GameState.batchIndex];
  const container = document.getElementById('step-dots');
  container.innerHTML = '';

  for (let i = 0; i < batch.count; i++) {
    const dot = document.createElement('button');
    dot.className = `dot${i === GameState.currentVpIndex ? ' active' : ''}`;
    dot.style.background =
      i === GameState.currentVpIndex ? HOUSE_COLORS[i] : 'rgba(255,255,255,0.2)';
    dot.addEventListener('click', () => {
      GameState.currentVpIndex = i;
      renderLearnScreen();
    });
    container.appendChild(dot);
  }
}

function attachLearnListeners() {
  const batch = BATCHES[GameState.batchIndex];

  document.getElementById('learn-prev').onclick = () => {
    if (GameState.currentVpIndex > 0) {
      GameState.currentVpIndex--;
      renderLearnScreen();
    }
  };

  document.getElementById('learn-next').onclick = () => {
    if (GameState.currentVpIndex < batch.count - 1) {
      GameState.currentVpIndex++;
      renderLearnScreen();
    } else {
      GameState.currentVpIndex = 0;
      showScreen('quiz');
    }
  };
}

function updateProgressBar(screen) {
  const batch = BATCHES[GameState.batchIndex];
  const progress = ((GameState.currentVpIndex + 1) / batch.count) * 100;
  const barId = screen === 'learn' ? 'learn-progress' : 'quiz-progress';
  document.getElementById(barId).style.width = `${progress}%`;
}

// ============================================================================
// QUIZ SCREEN
// ============================================================================

function renderQuizScreen() {
  renderTownBlock('town-block-quiz', GameState.currentVpIndex);

  const batch = BATCHES[GameState.batchIndex];
  const vp = VPs[batch.start + GameState.currentVpIndex];
  const color = HOUSE_COLORS[GameState.currentVpIndex];
  const street = STREETS[GameState.batchIndex];

  document.getElementById('quiz-scene-container').innerHTML = renderScenePanel(
    vp,
    GameState.batchIndex,
    color
  );
  document.getElementById('quiz-question').innerHTML =
    `Who lives in house <strong style="color:${color}">#${GameState.currentVpIndex + 1}</strong> on <em>${street.label}</em>?`;

  const options = shuffle([
    vp,
    ...getDistractors(batch.start + GameState.currentVpIndex, 3, batch)
  ]);
  const container = document.getElementById('quiz-options');
  container.innerHTML = '';

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = option.name;
    btn.addEventListener('click', () => answerQuiz(option, vp, btn));
    container.appendChild(btn);
  });

  updateProgressBar('quiz');
}

function answerQuiz(selected, correct, button) {
  const isCorrect = selected.n === correct.n;
  GameState.quizAnswers.push({ vp: correct, selected, isCorrect });
  if (isCorrect) {
    GameState.quizScore++;
  }

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.classList.add('locked');
    if (btn.textContent === correct.name) {
      btn.classList.add('correct');
    } else if (btn === button && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  setTimeout(() => {
    const batch = BATCHES[GameState.batchIndex];
    if (GameState.currentVpIndex < batch.count - 1) {
      GameState.currentVpIndex++;
      renderQuizScreen();
    } else {
      showScreen('score');
    }
  }, 900);
}

function getDistractors(correctVpIndex, count, batch) {
  return VPs.slice(batch.start, batch.start + batch.count)
    .filter(v => v.n !== VPs[correctVpIndex].n)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

// ============================================================================
// SCORE SCREEN
// ============================================================================

function renderScoreScreen() {
  const batch = BATCHES[GameState.batchIndex];
  const percent = Math.round((GameState.quizScore / batch.count) * 100);

  let emoji = '😬';
  let message = `You got ${GameState.quizScore}/${batch.count}. Walk the block again!`;
  if (percent >= 90) {
    emoji = '🏆';
    message = 'Perfect! You know every house on this block!';
  } else if (percent >= 80) {
    emoji = '⭐';
    message = 'Great job! Almost the whole neighborhood!';
  } else if (percent >= 70) {
    emoji = '👍';
    message = 'Good effort! Walk the block a few more times!';
  } else if (percent >= 60) {
    emoji = '💪';
    message = "Keep exploring! You're learning the street!";
  }

  document.getElementById('score-emoji').textContent = emoji;
  document.getElementById('score-fraction').textContent = `${GameState.quizScore}/${batch.count}`;
  document.getElementById('score-message').textContent = message;

  attachScoreListeners();
}

function attachScoreListeners() {
  const nextBatchIndex = GameState.batchIndex + 1;

  document.getElementById('next-batch-btn').onclick = () => {
    startBatch(nextBatchIndex < BATCHES.length ? nextBatchIndex : 0);
  };
  document.getElementById('retry-btn').onclick = () => startBatch(GameState.batchIndex);
  document.getElementById('all-batches-btn').onclick = () => showScreen('landing');
}

// ============================================================================
// SCENE PANEL
// ============================================================================

function darkenHex(hex) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 45);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 45);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 45);
  return `rgb(${r},${g},${b})`;
}

function renderScenePanel(vp, batchIndex, color) {
  const s = vp.scene || {};
  const roofColor = darkenHex(color);
  return `
    <div class="scene-panel" style="background:${BATCH_SKY[batchIndex]};--card-accent:${color}">
      <div class="scene-sky">
        <span>${s.skyL || ''}</span>
        <span>${s.skyR || ''}</span>
      </div>
      <div class="scene-middle">
        <span class="scene-item-side">${s.left || ''}</span>
        <div class="scene-house">
          <div class="scene-house-roof" style="border-bottom-color:${roofColor}"></div>
          <div class="scene-house-facade" style="background:${color}">${s.door || '🏠'}</div>
        </div>
        <span class="scene-item-side">${s.right || ''}</span>
      </div>
      <div class="scene-ground"></div>
    </div>
  `;
}

// ============================================================================
// UTILITIES
// ============================================================================

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

document.addEventListener('DOMContentLoaded', () => showScreen('landing'));

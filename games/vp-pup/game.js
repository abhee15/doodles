// VP Pup — Game Logic
/* global BATCHES, VPs, VP_PEGS */

const GameState = {
  screen: 'landing', // landing | learn | quiz | score
  batchIndex: null,
  currentVpIndex: 0,
  quizAnswers: [],
  quizScore: 0,
  learnedZones: []
};

// ============================================================================
// SCREEN ROUTING
// ============================================================================

function showScreen(screenId) {
  document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  GameState.screen = screenId;

  switch (screenId) {
    case 'landing':
      renderLandingScreen();
      document.getElementById('nav-meta').textContent = 'Learn';
      break;
    case 'learn':
      renderLearnScreen();
      document.getElementById('nav-meta').textContent = 'Learn';
      break;
    case 'quiz':
      renderQuizScreen();
      document.getElementById('nav-meta').textContent = 'Quiz';
      break;
    case 'score':
      renderScoreScreen();
      document.getElementById('nav-meta').textContent = 'Results';
      break;
  }
}

// ============================================================================
// LANDING SCREEN
// ============================================================================

function renderLandingScreen() {
  const grid = document.getElementById('batch-grid');
  grid.innerHTML = '';

  BATCHES.forEach(batch => {
    const btn = document.createElement('button');
    btn.className = 'batch-btn';
    btn.innerHTML = `<strong>${batch.label}</strong><br><small>${batch.count} VPs</small>`;
    btn.addEventListener('click', () => startBatch(batch.n));
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
  GameState.learnedZones = [];

  showScreen('learn');
}

// ============================================================================
// LEARN SCREEN
// ============================================================================

function renderLearnScreen() {
  renderLearnCard();
  renderStepDots();
  updateProgressBar('learn');
  highlightDogZone();
  attachLearnListeners();
}

function renderLearnCard() {
  const batch = BATCHES[GameState.batchIndex];
  const vpIndex = batch.start + GameState.currentVpIndex;
  const vp = VPs[vpIndex];

  const container = document.getElementById('learn-card-container');

  let partyClass = 'w'; // Default: Whig
  if (vp.party.includes('D')) {
    partyClass = 'd';
  } else if (vp.party.includes('R')) {
    partyClass = 'r';
  }

  container.innerHTML = `
    <div class="learn-card">
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
        <div class="tip-box">🐾 <strong>Memory Tip:</strong> ${vp.tip}</div>
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
    dot.className = `dot ${i === GameState.currentVpIndex ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      GameState.currentVpIndex = i;
      renderLearnCard();
      renderStepDots();
      highlightDogZone();
      updateProgressBar('learn');
    });
    container.appendChild(dot);
  }
}

function highlightDogZone() {
  const peg = VP_PEGS[GameState.currentVpIndex];
  document.querySelectorAll('.dog-zone').forEach(zone => {
    zone.classList.remove('active');
    if (zone.id === `zone-${peg.id}`) {
      zone.classList.add('active');
    }
  });

  if (!GameState.learnedZones.includes(peg.id)) {
    GameState.learnedZones.push(peg.id);
  }
  updateZoneStates();
}

function updateZoneStates() {
  document.querySelectorAll('.dog-zone').forEach(zone => {
    const zoneId = zone.id.replace('zone-', '');
    if (GameState.learnedZones.includes(zoneId)) {
      zone.classList.remove('unrevealed');
      zone.classList.add('visited');
    }
  });
}

function attachLearnListeners() {
  const batch = BATCHES[GameState.batchIndex];

  document.getElementById('learn-prev').onclick = () => {
    if (GameState.currentVpIndex > 0) {
      GameState.currentVpIndex--;
      renderLearnCard();
      renderStepDots();
      highlightDogZone();
      updateProgressBar('learn');
    }
  };

  document.getElementById('learn-next').onclick = () => {
    if (GameState.currentVpIndex < batch.count - 1) {
      GameState.currentVpIndex++;
      renderLearnCard();
      renderStepDots();
      highlightDogZone();
      updateProgressBar('learn');
    } else {
      // Start quiz
      GameState.currentVpIndex = 0;
      showScreen('quiz');
    }
  };
}

// ============================================================================
// QUIZ SCREEN
// ============================================================================

function renderQuizScreen() {
  const batch = BATCHES[GameState.batchIndex];
  const vpIndex = batch.start + GameState.currentVpIndex;
  const vp = VPs[vpIndex];
  const peg = VP_PEGS[GameState.currentVpIndex];

  // Clone dog SVG from learn
  const learnSvg = document.getElementById('dog-svg');
  const quizSvg = document.getElementById('quiz-dog-svg');
  quizSvg.innerHTML = learnSvg.innerHTML;

  // Highlight current zone
  quizSvg.querySelectorAll('.dog-zone').forEach(zone => {
    zone.classList.remove('active');
    if (zone.id === `zone-${peg.id}`) {
      zone.classList.add('active');
    }
  });

  // Show visited zones
  quizSvg.querySelectorAll('.dog-zone').forEach(zone => {
    const zoneId = zone.id.replace('zone-', '');
    if (GameState.learnedZones.includes(zoneId)) {
      zone.classList.add('visited');
    } else {
      zone.classList.add('unrevealed');
    }
  });

  // Set question
  document.getElementById('quiz-question').textContent = `Which VP is at the ${peg.label}?`;

  // Generate options
  const options = [vp];
  const distractors = getDistractors(vpIndex, 3, batch);
  options.push(...distractors);
  shuffle(options);

  // Render options
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option dom-btn dom-btn--secondary';
    btn.textContent = option.name;
    btn.addEventListener('click', () => answerQuiz(option, vp, btn));
    optionsContainer.appendChild(btn);
  });

  updateProgressBar('quiz');
}

function answerQuiz(selected, correct, button) {
  const isCorrect = selected.n === correct.n;
  GameState.quizAnswers.push({ vp: correct, selected, isCorrect });
  if (isCorrect) {
    GameState.quizScore++;
  }

  // Lock all buttons
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.classList.add('locked');
  });

  // Highlight correct/incorrect
  document.querySelectorAll('.quiz-option').forEach(btn => {
    if (btn.textContent === correct.name) {
      btn.classList.add('correct');
    } else if (btn === button && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // Auto-advance after 900ms
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
  const start = batch.start;
  const end = batch.start + batch.count;
  const vpRange = VPs.slice(start, end);

  return vpRange
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
  let message = `You got ${GameState.quizScore}/${batch.count}. Try again!`;

  if (percent >= 90) {
    emoji = '🏆';
    message = "Perfect! You're a VP expert on this batch!";
  } else if (percent >= 80) {
    emoji = '⭐';
    message = "Great job! You're a VP scholar!";
  } else if (percent >= 70) {
    emoji = '👍';
    message = "Good effort! A little more practice and you'll nail it!";
  } else if (percent >= 60) {
    emoji = '💪';
    message = "You're getting there! Keep learning!";
  }

  document.getElementById('score-emoji').textContent = emoji;
  document.getElementById('score-fraction').textContent = `${GameState.quizScore}/${batch.count}`;
  document.getElementById('score-message').textContent = message;

  attachScoreListeners();
}

function attachScoreListeners() {
  const nextBatchIndex = GameState.batchIndex + 1;

  document.getElementById('next-batch-btn').onclick = () => {
    if (nextBatchIndex < BATCHES.length) {
      startBatch(nextBatchIndex);
    } else {
      showScreen('landing');
    }
  };

  document.getElementById('retry-btn').onclick = () => {
    startBatch(GameState.batchIndex);
  };

  document.getElementById('all-batches-btn').onclick = () => {
    showScreen('landing');
  };
}

// ============================================================================
// UTILITIES
// ============================================================================

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateProgressBar(screen) {
  const batch = BATCHES[GameState.batchIndex];
  const progress = ((GameState.currentVpIndex + 1) / batch.count) * 100;
  const progressBar = document.getElementById(
    screen === 'learn' ? 'learn-progress' : 'quiz-progress'
  );
  progressBar.style.width = `${progress}%`;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  showScreen('landing');
});

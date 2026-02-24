/* eslint-disable no-undef */
/**
 * GAME INTERFACE - Controls game flow and interaction
 * Works with the parametric game engine
 */

// Initialize gamification system
let gamification = null;

/**
 * Initialize the gamification system
 */
function initGamification() {
  gamification = new GamificationSystem('periodic-table');
  updateStatsDisplay();
}

/**
 * Update the stats display in the header
 */
function updateStatsDisplay() {
  if (!gamification) {
    return;
  }

  const stats = gamification.getStats();

  // Update display elements
  const scoreDisplay = document.getElementById('score-display');
  const streakDisplay = document.getElementById('streak-display');
  const levelDisplay = document.getElementById('level-display');

  if (scoreDisplay) {
    scoreDisplay.textContent = stats.totalScore;
  }
  if (streakDisplay) {
    streakDisplay.textContent = stats.sessionStreak || stats.streak;
  }
  if (levelDisplay) {
    levelDisplay.textContent = stats.level;
  }
}

/**
 * Start the recall/quiz phase based on technique
 */
function startRecall() {
  if (!gameEngine) {
    return;
  }

  const technique = gameEngine.technique;

  // Hide study phase, show recall phase based on technique
  switch (technique) {
  case 'story_chain':
    document.getElementById('story-phase').style.display = 'none';
    document.getElementById('recall-phase').style.display = 'block';
    break;
  case 'memory_palace':
    document.getElementById('palace-phase').style.display = 'none';
    document.getElementById('palace-recall').style.display = 'block';
    break;
  case 'body_map':
    document.getElementById('body-phase').style.display = 'none';
    document.getElementById('body-recall').style.display = 'block';
    break;
  case 'keyword_image':
    document.getElementById('keyword-phase').style.display = 'none';
    document.getElementById('keyword-recall').style.display = 'block';
    break;
  case 'rhyme_pegs':
    document.getElementById('rhyme-phase').style.display = 'none';
    document.getElementById('rhyme-recall').style.display = 'block';
    break;
  }

  buildRecallUI();
}

/**
 * Build the recall/quiz interface based on technique
 */
function buildRecallUI() {
  if (!gameEngine) {
    return;
  }

  const technique = gameEngine.technique;
  const elements = gameEngine.getElements();

  let recallGrid = null;
  let gridId = '';

  // Get the correct recall grid based on technique
  switch (technique) {
  case 'story_chain':
    recallGrid = document.getElementById('recall-grid');
    gridId = 'recall-grid';
    break;
  case 'memory_palace':
    recallGrid = document.getElementById('palace-recall-grid');
    gridId = 'palace-recall-grid';
    break;
  case 'body_map':
    recallGrid = document.getElementById('body-recall-grid');
    gridId = 'body-recall-grid';
    break;
  case 'keyword_image':
    recallGrid = document.getElementById('keyword-recall-grid');
    gridId = 'keyword-recall-grid';
    break;
  case 'rhyme_pegs':
    recallGrid = document.getElementById('rhyme-recall-grid');
    gridId = 'rhyme-recall-grid';
    break;
  }

  if (!recallGrid) {
    return;
  }

  // Shuffle element order for recall
  const shuffledElements = [...elements].sort(() => Math.random() - 0.5);

  // Create technique-specific recall challenges
  let recallHTML = '';

  if (technique === 'story_chain') {
    recallHTML = elements
      .map(
        (el, idx) => `
      <div class="recall-item" id="recall-${idx}">
        <div class="recall-question">What's element #${el.atomicNumber}?</div>
        <div class="recall-options">
          ${shuffledElements
    .map(
      (opt, optIdx) => `
            <button class="recall-btn" onclick="checkAnswer(${idx}, '${opt.symbol}', '${gridId}')">
              ${opt.symbol}
            </button>
          `
    )
    .join('')}
        </div>
      </div>
    `
      )
      .join('');
  } else if (technique === 'memory_palace') {
    recallHTML = elements
      .map(
        (el, idx) => `
      <div class="recall-item" id="recall-${idx}">
        <div class="recall-question">${el.name} (${el.symbol}) was in which room?</div>
        <div class="recall-options">
          ${['Entrance Hall', 'Library', 'Throne Room', 'Garden', 'Treasury']
    .map(
      (room, roomIdx) => `
            <button class="recall-btn" onclick="checkAnswerRoom(${idx}, ${roomIdx}, '${gridId}')">
              ${room}
            </button>
          `
    )
    .join('')}
        </div>
      </div>
    `
      )
      .join('');
  } else if (technique === 'body_map') {
    const bodyParts = [
      'Head',
      'Neck',
      'Chest',
      'Waist',
      'Left Hand',
      'Right Hand',
      'Left Leg',
      'Right Leg'
    ];
    recallHTML = elements
      .map(
        (el, idx) => `
      <div class="recall-item" id="recall-${idx}">
        <div class="recall-question">${el.name} (${el.symbol}) was anchored to which body part?</div>
        <div class="recall-options">
          ${bodyParts
    .map(
      (part, partIdx) => `
            <button class="recall-btn" onclick="checkAnswerBodyPart(${idx}, ${partIdx}, '${gridId}')">
              ${part}
            </button>
          `
    )
    .join('')}
        </div>
      </div>
    `
      )
      .join('');
  } else if (technique === 'keyword_image') {
    recallHTML = elements
      .map(
        (el, idx) => `
      <div class="recall-item" id="recall-${idx}">
        <div class="recall-question">What's the keyword for ${el.name}?</div>
        <div class="recall-options">
          ${shuffledElements
    .map(
      (opt, optIdx) => `
            <button class="recall-btn" onclick="checkAnswerKeyword(${idx}, '${opt.symbol}', '${gridId}')">
              ${opt.name}
            </button>
          `
    )
    .join('')}
        </div>
      </div>
    `
      )
      .join('');
  } else if (technique === 'rhyme_pegs') {
    recallHTML = elements
      .map(
        (el, idx) => `
      <div class="recall-item" id="recall-${idx}">
        <div class="recall-question">Which element goes with peg #${idx + 1}?</div>
        <div class="recall-options">
          ${shuffledElements
    .map(
      (opt, optIdx) => `
            <button class="recall-btn" onclick="checkAnswer(${idx}, '${opt.symbol}', '${gridId}')">
              ${opt.symbol} - ${opt.name}
            </button>
          `
    )
    .join('')}
        </div>
      </div>
    `
      )
      .join('');
  }

  recallGrid.innerHTML = recallHTML;
}

/**
 * Check answer and provide feedback
 */
function checkAnswer(elementIndex, answer, gridId = 'recall-grid') {
  if (!gameEngine) {
    return;
  }

  const element = gameEngine.getElements()[elementIndex];
  const isCorrect = answer === element.symbol;

  const itemDiv = document.getElementById(`recall-${elementIndex}`);
  if (itemDiv) {
    if (isCorrect) {
      itemDiv.classList.add('correct');
      itemDiv.innerHTML +=
        '<div class="feedback success"><i class="ti ti-circle-check"></i> Correct!</div>';

      // Record in gamification
      if (gamification) {
        const result = gamification.recordCorrectAnswer(gameEngine.technique);
        gamification.markElementLearned(element.atomicNumber);
        updateStatsDisplay();

        // Show point feedback
        showPointFeedback(itemDiv, result.points);

        // Check for streak milestones
        if (result.currentStreak === 5 || result.currentStreak === 10) {
          showStreakCelebration(result.currentStreak);
        }

        // Check for level up
        if (result.leveledUp) {
          showLevelUpAnimation(result.newLevel);
        }
      }
    } else {
      itemDiv.classList.add('incorrect');
      itemDiv.innerHTML += `<div class="feedback error"><i class="ti ti-circle-x"></i> It's ${element.symbol}</div>`;

      // Record in gamification
      if (gamification) {
        gamification.recordIncorrectAnswer(gameEngine.technique);
        updateStatsDisplay();
      }
    }
    itemDiv.style.pointerEvents = 'none';
  }

  // Check if all answered
  setTimeout(() => {
    const allAnswered =
      document.querySelectorAll('.recall-item').length ===
      document.querySelectorAll('.recall-item.correct, .recall-item.incorrect').length;
    if (allAnswered) {
      showResults();
    }
  }, 500);
}

/**
 * Check room answer for Memory Palace
 */
function checkAnswerRoom(elementIndex, roomIdx, gridId) {
  if (!gameEngine) {
    return;
  }
  const elements = gameEngine.getElements();
  const roomSize = Math.ceil(elements.length / 5);
  const correctRoom = Math.floor(elementIndex / roomSize);
  const isCorrect = roomIdx === correctRoom;

  handleAnswer(elementIndex, isCorrect, gridId);
}

/**
 * Check body part answer for Body Map
 */
function checkAnswerBodyPart(elementIndex, partIdx, gridId) {
  if (!gameEngine) {
    return;
  }
  // For now, use index order (0-7 body parts for 8 zones)
  const isCorrect = partIdx === elementIndex % 8;

  handleAnswer(elementIndex, isCorrect, gridId);
}

/**
 * Check keyword answer for Keyword Image
 */
function checkAnswerKeyword(elementIndex, answerSymbol, gridId) {
  if (!gameEngine) {
    return;
  }
  const elements = gameEngine.getElements();
  const element = elements[elementIndex];
  const isCorrect = answerSymbol === element.symbol;

  handleAnswer(elementIndex, isCorrect, gridId);
}

/**
 * Generic answer handler
 */
function handleAnswer(elementIndex, isCorrect, gridId = 'recall-grid') {
  if (!gameEngine) {
    return;
  }
  const elements = gameEngine.getElements();
  const element = elements[elementIndex];
  const itemDiv = document.getElementById(`recall-${elementIndex}`);

  if (itemDiv) {
    if (isCorrect) {
      itemDiv.classList.add('correct');
      itemDiv.innerHTML +=
        '<div class="feedback success"><i class="ti ti-circle-check"></i> Correct!</div>';

      // Record in gamification
      if (gamification) {
        const result = gamification.recordCorrectAnswer(gameEngine.technique);
        gamification.markElementLearned(element.atomicNumber);
        updateStatsDisplay();
        showPointFeedback(itemDiv, result.points);
        if (result.currentStreak === 5 || result.currentStreak === 10) {
          showStreakCelebration(result.currentStreak);
        }
        if (result.leveledUp) {
          showLevelUpAnimation(result.newLevel);
        }
      }
    } else {
      itemDiv.classList.add('incorrect');
      itemDiv.innerHTML +=
        '<div class="feedback error"><i class="ti ti-circle-x"></i> Try again!</div>';

      if (gamification) {
        gamification.recordIncorrectAnswer(gameEngine.technique);
        updateStatsDisplay();
      }
    }
    itemDiv.style.pointerEvents = 'none';
  }

  // Check if all answered
  setTimeout(() => {
    const allAnswered =
      document.querySelectorAll('.recall-item').length ===
      document.querySelectorAll('.recall-item.correct, .recall-item.incorrect').length;
    if (allAnswered) {
      showResults();
    }
  }, 500);
}

/**
 * Show results and achievements (technique-aware)
 */
function showResults() {
  const resultsCorrct = document.querySelectorAll('.recall-item.correct').length;
  const resultsTotal = document.querySelectorAll('.recall-item').length;
  const percentage = (resultsCorrct / resultsTotal) * 100;

  const technique = gameEngine.technique;
  let resultsDivId = 'recall-results';
  let resultTextId = 'results-text';
  let badgesDivId = 'badges-display';

  // Get correct results div based on technique
  switch (technique) {
  case 'story_chain':
    resultsDivId = 'recall-results';
    resultTextId = 'results-text';
    badgesDivId = 'badges-display';
    break;
  case 'memory_palace':
    resultsDivId = 'palace-recall-results';
    resultTextId = 'palace-results-text';
    badgesDivId = 'palace-badges-display';
    break;
  case 'body_map':
    resultsDivId = 'body-recall-results';
    resultTextId = 'body-results-text';
    badgesDivId = 'body-badges-display';
    break;
  case 'keyword_image':
    resultsDivId = 'keyword-recall-results';
    resultTextId = 'keyword-results-text';
    badgesDivId = 'keyword-badges-display';
    break;
  case 'rhyme_pegs':
    resultsDivId = 'rhyme-recall-results';
    resultTextId = 'rhyme-results-text';
    badgesDivId = 'rhyme-badges-display';
    break;
  }

  const resultsDiv = document.getElementById(resultsDivId);
  if (resultsDiv) {
    resultsDiv.style.display = 'block';
    const resultTextEl = document.getElementById(resultTextId);
    if (resultTextEl) {
      resultTextEl.textContent = `You got ${resultsCorrct} out of ${resultsTotal} (${percentage.toFixed(0)}%)! Great job learning with the ${gameEngine.technique.replace(/_/g, ' ')} technique!`;
    }
  }

  gameEngine.recordScore(resultsCorrct, resultsTotal);

  // Show achievement badges if unlocked
  if (gamification) {
    const stats = gamification.getStats();
    if (stats.badges && stats.badges.length > 0) {
      // Display badges using correct div ID
      const badgesDisplay = document.getElementById(badgesDivId);
      if (badgesDisplay) {
        badgesDisplay.innerHTML = `
          <h3 style="margin-top: 20px; text-align: center;"><i class="ti ti-trophy"></i> Achievements Unlocked!</h3>
          ${stats.badges
    .map(
      badge => `
            <div class="badge earned" title="${badge.description}">
              <div class="badge-icon">${badge.icon}</div>
              <div class="badge-title">${badge.title}</div>
              <div class="badge-description">${badge.description}</div>
            </div>
          `
    )
    .join('')}
        `;
        badgesDisplay.style.display = 'grid';
      }

      // Show notifications
      setTimeout(() => {
        stats.badges.forEach(badge => {
          showAchievementNotification(badge);
        });
      }, 500);
    }
  }
}

/**
 * Go to next chunk
 */
function nextChunk() {
  const nextChunk = gameEngine.chunk + 1;
  if (nextChunk <= 5) {
    window.location.href = 'index.html';
  } else {
    alert("Congratulations! You've completed all 5 chunks!\n\nWould you like to review any chunk?");
    window.location.href = 'index.html';
  }
}

/**
 * Go back to picker hub
 */
function goBack() {
  window.location.href = '../../index.html';
}

/**
 * Go home to portal
 */
function goHome() {
  window.location.href = '../../index.html';
}

/**
 * Ready for more
 */
function readyForMore() {
  nextChunk();
}

/**
 * Show body zone details
 */
function showBodyZoneDetails(zoneNum) {
  if (!window.bodyZones || !window.bodyMapElements) {
    return;
  }

  const zone = window.bodyZones[Math.min(zoneNum - 1, 7)];
  const element = window.bodyMapElements[Math.min(zoneNum - 1, window.bodyMapElements.length)];

  if (!zone || !element) {
    return;
  }

  // Update header
  const zoneTitle = document.getElementById('zone-title');
  if (zoneTitle) {
    zoneTitle.innerHTML = `${zone.icon} ${zone.label} Zone`;
  }

  // Update content
  const zoneContent = document.getElementById('zone-content');
  if (zoneContent) {
    zoneContent.innerHTML = `
      <div class="zone-detail-card">
        <div class="zone-detail-symbol">${element.symbol}</div>
        <div class="zone-detail-name">${element.name}</div>
        <div class="zone-detail-number">Atomic #${element.atomicNumber}</div>
        <div class="zone-detail-tip">
          <strong>Memory Anchor:</strong><br>
          ${gameEngine.getMemoryTip(element)}
        </div>
      </div>
    `;
  }

  // Highlight zone in interactive map
  document.querySelectorAll('.zone-interactive').forEach(z => {
    if (z.dataset.zone === zoneNum) {
      z.classList.add('active');
    } else {
      z.classList.remove('active');
    }
  });

  // Highlight zone in list
  document.querySelectorAll('.zone-list-item').forEach((item, idx) => {
    if (idx === zoneNum - 1) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * Show point feedback animation
 */
function showPointFeedback(element, points) {
  const feedback = document.createElement('div');
  feedback.className = 'point-feedback';
  feedback.textContent = `+${points}`;

  const rect = element.getBoundingClientRect();
  feedback.style.left = `${rect.left + rect.width / 2}px`;
  feedback.style.top = `${rect.top}px`;

  document.body.appendChild(feedback);

  setTimeout(() => feedback.remove(), 1000);
}

/**
 * Show streak celebration
 */
function showStreakCelebration(streakCount) {
  const celebration = document.createElement('div');
  celebration.className = 'streak-celebration';

  const message = document.createElement('div');
  message.className = 'streak-message';
  message.textContent = streakCount === 5 ? '5 in a row!' : '10 in a row!';

  celebration.appendChild(message);
  document.body.appendChild(celebration);

  setTimeout(() => celebration.remove(), 1000);

  // Trigger confetti
  triggerConfetti();
}

/**
 * Show level up animation
 */
function showLevelUpAnimation(newLevel) {
  const animation = document.createElement('div');
  animation.className = 'level-up-animation';

  const text = document.createElement('div');
  text.className = 'level-up-text';
  text.textContent = `LEVEL ${newLevel}!`;

  animation.appendChild(text);
  document.body.appendChild(animation);

  setTimeout(() => animation.remove(), 1000);

  // Trigger confetti
  triggerConfetti();
}

/**
 * Trigger confetti effect
 */
function triggerConfetti() {
  const colors = ['#1CB0F6', '#7c3aed', '#00d084', '#fbbf24', '#f87171'];
  const confettiCount = 30;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = `confetti type-${(i % 5) + 1}`;

    const startX = Math.random() * window.innerWidth;
    const startY = -10;
    const duration = 2 + Math.random() * 1;
    const delay = Math.random() * 0.3;

    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;
    confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`;

    // Random rotation
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), (duration + delay) * 1000);
  }
}

/**
 * Show achievement notification
 */
function showAchievementNotification(badge) {
  const notification = document.createElement('div');
  notification.className = 'achievement-notification';

  notification.innerHTML = `
    <div class="achievement-header">
      <div class="achievement-icon">${badge.icon}</div>
      <div class="achievement-title">${badge.title}</div>
    </div>
    <div class="achievement-description">${badge.description}</div>
  `;

  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slide-out-right 0.4s ease-out forwards';
    setTimeout(() => notification.remove(), 400);
  }, 4000);
}

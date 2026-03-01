/**
 * Brain Spark Game
 * Logic puzzle game with 4 categories, visual aids, and progressive difficulty
 */

// Game state
const state = {
  currentCategory: null,
  difficulty: 'normal',
  questions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  timerInterval: null,
  timeLeft: 20,
  answered: false
};

// Puzzle Data — loaded from puzzles-data.js
const PUZZLES = window.PUZZLES;

// Initialize navigation
let nav = null;

// Fisher-Yates shuffle
function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Anti-repeat logic: track seen questions per category/difficulty
function getSeenIds(category, difficulty) {
  const key = `bs-seen-${category}-${difficulty}`;
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function saveSeenIds(category, difficulty, ids) {
  localStorage.setItem(`bs-seen-${category}-${difficulty}`, JSON.stringify(ids));
}

function selectQuestions(category, difficulty, count = 8) {
  const pool = PUZZLES[category][difficulty];
  if (!pool) {
    return [];
  }

  const seenIds = getSeenIds(category, difficulty);
  let unseen = pool.filter(p => !seenIds.includes(p.id));

  // If fewer than count unseen remain, reset seen list and use full pool
  if (unseen.length < count) {
    saveSeenIds(category, difficulty, []);
    unseen = [...pool];
  }

  const selected = shuffle(unseen).slice(0, count);

  // Append newly seen IDs to persistent list
  const updated = [...new Set([...getSeenIds(category, difficulty), ...selected.map(p => p.id)])];
  saveSeenIds(category, difficulty, updated);

  return selected;
}

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
  if (!window.PUZZLES) {
    console.error('Brain Spark: puzzles-data.js not loaded. Cannot start game.');
    return;
  }
  initGame();
});

function initGame() {
  // Set up navigation
  nav = new GameNavigation('brain-spark', {
    screens: ['category', 'play', 'explain', 'results'],
    initialScreen: 'category',
    gameName: 'Brain Spark',
    titles: {
      category: 'Brain Spark - Choose Category',
      play: 'Play Quiz',
      explain: 'Explanation',
      results: 'Quiz Complete!'
    }
  });

  // Custom back button logic for Brain Spark (always go to parent, not stack)
  const backBtn = document.getElementById('game-back-btn');
  if (backBtn) {
    backBtn.addEventListener(
      'click',
      e => {
        e.preventDefault();
        const currentScreen = nav.currentScreen;

        // Always go to parent screen
        if (currentScreen === 'category') {
          // From category, go to portal
          window.location.href = '../../index.html#brain-spark';
        } else if (
          currentScreen === 'play' ||
          currentScreen === 'explain' ||
          currentScreen === 'results'
        ) {
          // From any quiz screen, go back to category picker
          nav.goToScreen('category', { preserveStack: true });
        }
      },
      true
    ); // Use capture phase to intercept before GameNavigation
  }

  // Difficulty toggles
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.difficulty;
    });
  });

  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      selectCategory(card.dataset.category);
    });
  });

  // Continue button (explain screen)
  const continueBtn = document.getElementById('continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Continue button clicked - moving to next question');
      nextQuestion();
    });
  } else {
    console.warn('Continue button not found in DOM');
  }

  // Try again button
  document.getElementById('try-again-btn').addEventListener('click', () => {
    startGame();
  });

  // Categories button
  document.getElementById('categories-btn').addEventListener('click', () => {
    nav.goToScreen('category');
  });

  // Update category counts
  updateCategoryCounts();
}

function updateCategoryCounts() {
  Object.keys(PUZZLES).forEach(category => {
    const normalCount = PUZZLES[category].normal.length;
    const challengeCount = PUZZLES[category].challenge.length;
    const total = normalCount + challengeCount;
    document.getElementById(`count-${category}`).textContent = total;
  });
}

function selectCategory(categoryId) {
  state.currentCategory = categoryId;
  state.difficulty = 'normal';
  document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-difficulty="normal"]').classList.add('active');
  startGame();
}

function startGame() {
  state.questions = selectQuestions(state.currentCategory, state.difficulty, 8);
  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.maxStreak = 0;
  state.answered = false;
  state.timeLeft = 20;

  // Show timer bar only in challenge mode
  const timerBar = document.getElementById('timer-bar');
  if (state.difficulty === 'challenge') {
    timerBar.style.display = 'block';
    startTimer();
  } else {
    timerBar.style.display = 'none';
  }

  nav.goToScreen('play');
  renderQuestion();
}

function renderQuestion() {
  const puzzle = state.questions[state.currentIndex];

  // Update progress
  document.getElementById('progress-text').textContent = `${state.currentIndex + 1} / 8`;

  // Update streak
  const streakEl = document.getElementById('streak-display');
  if (state.streak > 0) {
    streakEl.textContent = `🔥 ${state.streak}`;
  } else {
    streakEl.textContent = '';
  }

  // Render visual
  renderVisual(puzzle);

  // Render question
  document.getElementById('question-text').textContent = puzzle.question;

  // Render answer buttons
  const buttonContainer = document.getElementById('answer-buttons');
  buttonContainer.innerHTML = '';

  puzzle.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(index));
    buttonContainer.appendChild(btn);
  });

  state.answered = false;

  // Reset timer for new question
  if (state.difficulty === 'challenge') {
    state.timeLeft = 20;
    updateTimerBar();
  }
}

function renderVisual(puzzle) {
  const container = document.getElementById('visual-container');
  container.innerHTML = '';

  switch (puzzle.visual.type) {
    case 'sequence':
      renderSequence(puzzle.visual, container);
      break;
    case 'scene':
      renderScene(puzzle.visual, container);
      break;
    case 'grid':
      renderGrid(puzzle.visual, container);
      break;
    case 'equation':
      renderEquation(puzzle.visual, container);
      break;
  }
}

function renderSequence(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-sequence';

  visual.items.forEach((item, i) => {
    const tile = document.createElement('div');
    tile.className = item === '?' ? 'seq-tile seq-tile--unknown' : 'seq-tile';
    tile.textContent = item;

    if (item !== '?') {
      const category = state.currentCategory;
      const colors = {
        'number-patterns': '#4f46e5',
        'logic-riddles': '#059669',
        'odd-one-out': '#dc2626',
        'math-tricks': '#d97706'
      };
      tile.style.borderColor = colors[category] || 'var(--dom-accent)';
      tile.style.color = colors[category] || 'var(--dom-accent)';
    }

    div.appendChild(tile);

    if (i < visual.items.length - 1 && item !== '?') {
      const arrow = document.createElement('div');
      arrow.className = 'seq-arrow';
      arrow.textContent = '→';
      div.appendChild(arrow);
    }
  });

  container.appendChild(div);
}

function renderScene(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-scene';

  const emoji = document.createElement('div');
  emoji.className = 'scene-emoji';
  emoji.textContent = visual.emoji;

  const caption = document.createElement('p');
  caption.className = 'scene-caption';
  caption.textContent = visual.caption;

  div.appendChild(emoji);
  div.appendChild(caption);
  container.appendChild(div);
}

function renderGrid(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-grid';

  visual.items.forEach(item => {
    const cell = document.createElement('div');
    cell.className = 'grid-item';
    cell.textContent = item;
    div.appendChild(cell);
  });

  container.appendChild(div);
}

function renderEquation(visual, container) {
  const div = document.createElement('div');
  div.className = 'visual-equation';

  visual.tokens.forEach((token, i) => {
    const span = document.createElement('span');

    if (i % 2 === 0) {
      // Token
      span.className = visual.highlight && visual.highlight.includes(i) ? 'eq-value' : 'eq-token';
      span.textContent = token;
    } else {
      // Operator
      span.className = 'eq-op';
      span.textContent = token;
    }

    div.appendChild(span);
  });

  container.appendChild(div);
}

function checkAnswer(selectedIndex) {
  if (state.answered) {
    return;
  }
  state.answered = true;

  if (state.difficulty === 'challenge') {
    stopTimer();
  }

  const puzzle = state.questions[state.currentIndex];
  const buttons = document.querySelectorAll('.answer-btn');
  const correct = selectedIndex === puzzle.answer;

  // Disable all buttons
  buttons.forEach(btn => (btn.disabled = true));

  // Highlight answer
  if (correct) {
    buttons[selectedIndex].classList.add('correct');
    state.score++;
    state.streak++;
    if (state.streak > state.maxStreak) {
      state.maxStreak = state.streak;
    }
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[puzzle.answer].classList.add('correct');
    state.streak = 0;
  }

  // Show explanation after delay
  setTimeout(() => {
    showExplain(puzzle, correct);
  }, 1500);
}

function showExplain(puzzle, isCorrect) {
  document.getElementById('explain-emoji').textContent = isCorrect ? '✨' : '💡';
  document.getElementById('explain-title').textContent = isCorrect ? 'Excellent!' : 'Not quite!';
  document.getElementById('explain-answer').textContent =
    `Correct: ${puzzle.options[puzzle.answer]}`;
  document.getElementById('explain-text').textContent = puzzle.explanation;

  nav.goToScreen('explain');
}

function nextQuestion() {
  state.currentIndex++;

  if (state.currentIndex >= state.questions.length) {
    showResults();
  } else {
    renderQuestion();
    // Navigate back to play screen to show the updated question
    nav.goToScreen('play');
  }
}

function showResults() {
  saveProgress();

  const percentage = (state.score / state.questions.length) * 100;
  let stars = 0;
  if (percentage >= 100) {
    stars = 3;
  } else if (percentage >= 80) {
    stars = 2;
  } else if (percentage >= 60) {
    stars = 1;
  }

  const starsDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  document.getElementById('stars-display').textContent = starsDisplay;
  document.getElementById('final-score').textContent = `${state.score} / ${state.questions.length}`;

  const streakText = state.maxStreak > 0 ? `🔥 Best streak: ${state.maxStreak}` : '';
  document.getElementById('final-streak').textContent = streakText;

  nav.goToScreen('results');
}

function saveProgress() {
  const key = `brainspark-${state.currentCategory}-${state.difficulty}`;
  const percentage = (state.score / state.questions.length) * 100;
  let stars = 0;
  if (percentage >= 100) {
    stars = 3;
  } else if (percentage >= 80) {
    stars = 2;
  } else if (percentage >= 60) {
    stars = 1;
  }

  const data = {
    stars,
    score: state.score,
    maxStreak: state.maxStreak,
    lastPlayedDate: new Date().toISOString()
  };

  localStorage.setItem(key, JSON.stringify(data));
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerBar();

    if (state.timeLeft <= 0) {
      stopTimer();
      // Auto-submit wrong answer
      if (!state.answered) {
        checkAnswer(-1);
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
}

function updateTimerBar() {
  const fill = document.getElementById('timer-fill');
  const percentage = (state.timeLeft / 20) * 100;
  fill.style.width = `${percentage}%`;

  if (state.timeLeft <= 5) {
    fill.classList.add('danger');
  } else {
    fill.classList.remove('danger');
  }
}

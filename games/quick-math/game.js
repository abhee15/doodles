/* eslint-disable no-undef */
// Quick Math - Learn Vedic Math Tricks!
// DOM-based Educational Game (No Phaser)

// ==================== GAME CONSTANTS ====================
const GAME = {
  QUESTIONS_PER_SESSION: 5,
  MAX_ANSWER_DIGITS: 4,
  MAX_STARS: 3,
  AUTO_ADVANCE_MS: 2000,
  TOAST_DURATION_MS: 3500,
  PASS_THRESHOLD_PCT: 60,
  STAR2_THRESHOLD_PCT: 80,
  STAR1_THRESHOLD_PCT: 60
};

// ==================== NAVIGATION SETUP ====================
// Initialize game navigation (handles back button and screen transitions)
let gameNav;

function initNavigation() {
  gameNav = new GameNavigation('quick-math', {
    screens: ['landing', 'tutorial', 'practice', 'quiz-practice', 'results', 'progress'],
    initialScreen: 'landing',
    gameName: 'Quick Math',
    titles: {
      landing: 'Quick Math',
      tutorial: 'Learn the Trick',
      practice: 'Practice Problems',
      'quiz-practice': 'Quiz Time',
      results: 'Results',
      progress: 'Your Progress'
    }
  });
}

// Map old screen IDs to new data-screen names for backward compatibility
const screenMap = {
  'screen-level-select': 'landing',
  'screen-tutorial': 'tutorial',
  'screen-practice': 'practice',
  'screen-results': 'results',
  'screen-progress': 'progress'
};

// ==================== GAME STATE ====================
let currentLevelId = null;
let tutStep = 0;
let practiceScore = 0;
let practiceAnswered = 0;
let currentQuestion = null;
let userAnswer = '';
let answered = false;
let soundEnabled = true;
let autoAdvanceTimer = null;
let kbHandler = null;

// Player Progress
let playerProgress = {
  levelStars: {},
  achievements: [],
  totalScore: 0,
  gamesPlayed: 0,
  totalStars: 0,
  quizzesCompleted: 0,
  perfectScores: 0
};

// Quiz Trick Parts (for comprehensive testing)
const TRICK_PARTS = [
  {
    id: 'foundational',
    name: 'Foundational Tricks',
    desc: '×4, ×5, ×3, ÷5, ×20, ×30',
    levels: [1, 2, 3, 4, 5, 6],
    icon: '⭐'
  },
  {
    id: 'multiplication',
    name: 'Multiplication Masters',
    desc: '×9, ×11, ×6, ×7, ×8, ×12, ×15, ×25, ×99',
    levels: [7, 8, 9, 10, 11, 12, 13, 14, 15],
    icon: '🚀'
  },
  {
    id: 'squaring',
    name: 'Squaring Mastery',
    desc: 'Squares ending 5, 1, 6',
    levels: [16, 17, 18],
    icon: '5️⃣'
  },
  {
    id: 'vedic',
    name: 'Advanced Vedic',
    desc: 'Divisibility tests, Base methods, ×11 extended',
    levels: [19, 20, 21, 22],
    icon: '🧠'
  },
  {
    id: 'advanced',
    name: 'Mental Math Masters',
    desc: 'Differ by 2, Same Tens, Cross Multiply, Compensation',
    levels: [23, 24, 25, 26, 27, 28, 29],
    icon: '💡'
  }
];

// Quiz Mode State
const quizMode = {
  type: null, // 'single-trick', 'multi-trick', 'random', 'comprehensive'
  selectedTrick: null,
  tricks: [],
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answered: 0,
  userAnswers: [],
  startTime: null,
  endTime: null
};

// ==================== LEVEL DATA ====================
// Ordered from Easy → Medium → Hard for optimal learning progression
const LEVELS = [
  // === EASY (Foundational tricks) ===
  {
    id: 1,
    name: 'Multiply by 4',
    icon: '2²',
    desc: 'Double, double!',
    color: '#7C3AED',
    generate(randInt) {
      const num = randInt(1, 20);
      const answer = num * 4;
      const questionStr = `${num} × 4 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 2,
    name: 'Multiply by 5',
    icon: '×5',
    desc: 'Half of ×10',
    color: '#059669',
    generate(randInt) {
      const num = randInt(4, 24) * 2;
      const answer = num * 5;
      const questionStr = `${num} × 5 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 3,
    name: 'Multiply by 3',
    icon: '×3',
    desc: 'Double + number',
    color: '#EC4899',
    generate(randInt) {
      const num = randInt(1, 20);
      const answer = num * 3;
      const questionStr = `${num} × 3 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 4,
    name: 'Divide by 5',
    icon: '÷5',
    desc: '×2 then ÷10',
    color: '#10B981',
    generate(randInt) {
      const num = randInt(2, 20) * 5;
      const answer = num / 5;
      const questionStr = `${num} ÷ 5 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 5,
    name: 'Multiply by 20',
    icon: '×20',
    desc: '×2 then ×10',
    color: '#F59E0B',
    generate(randInt) {
      const num = randInt(1, 20);
      const answer = num * 20;
      const questionStr = `${num} × 20 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 6,
    name: 'Multiply by 30',
    icon: '×30',
    desc: '×3 then ×10',
    color: '#14B8A6',
    generate(randInt) {
      const num = randInt(1, 15);
      const answer = num * 30;
      const questionStr = `${num} × 30 = ?`;
      return { questionStr, answer };
    }
  },

  // === MEDIUM (Pattern recognition) ===
  {
    id: 7,
    name: 'Multiply by 9',
    icon: '×9',
    desc: 'Finger trick magic',
    color: '#10B981',
    generate(randInt) {
      const num = randInt(1, 10);
      const answer = num * 9;
      const questionStr = `${num} × 9 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 8,
    name: 'Multiply by 11',
    icon: '×11',
    desc: 'Split, add, done!',
    color: '#3B82F6',
    generate(randInt) {
      const num = randInt(12, 99);
      const answer = num * 11;
      const questionStr = `${num} × 11 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 9,
    name: 'Multiply by 6',
    icon: '×6',
    desc: '(×5) + (×1)',
    color: '#DB2777',
    generate(randInt) {
      const num = randInt(2, 15);
      const answer = num * 6;
      const questionStr = `${num} × 6 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 10,
    name: 'Multiply by 7',
    icon: '×7',
    desc: '(×5) + (×2)',
    color: '#8B5CF6',
    generate(randInt) {
      const num = randInt(1, 15);
      const answer = num * 7;
      const questionStr = `${num} × 7 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 11,
    name: 'Multiply by 8',
    icon: '×8',
    desc: 'Triple double',
    color: '#EA580C',
    generate(randInt) {
      const num = randInt(1, 15);
      const answer = num * 8;
      const questionStr = `${num} × 8 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 12,
    name: 'Multiply by 12',
    icon: '×12',
    desc: '(×10) + (×2)',
    color: '#DC2626',
    generate(randInt) {
      const num = randInt(1, 15);
      const answer = num * 12;
      const questionStr = `${num} × 12 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 13,
    name: 'Multiply by 15',
    icon: '×15',
    desc: '×10 + half',
    color: '#0891B2',
    generate(randInt) {
      const num = randInt(1, 14);
      const answer = num * 15;
      const questionStr = `${num} × 15 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 14,
    name: 'Multiply by 25',
    icon: '×25',
    desc: 'Quarter trick',
    color: '#1D4ED8',
    generate(randInt) {
      const num = randInt(1, 20);
      const answer = num * 25;
      const questionStr = `${num} × 25 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 15,
    name: 'Multiply by 99',
    icon: '×99',
    desc: '(×100) − (×1)',
    color: '#6D28D9',
    generate(randInt) {
      const num = randInt(12, 60);
      const answer = num * 99;
      const questionStr = `${num} × 99 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 16,
    name: 'Square Ending 5',
    icon: '5²',
    desc: 'N(N+1) + 25',
    color: '#06B6D4',
    generate(randInt) {
      const tens = randInt(1, 9);
      const num = tens * 10 + 5;
      const firstDigit = Math.floor(num / 10);
      const answer = firstDigit * (firstDigit + 1) * 100 + 25;
      const questionStr = `${num}² = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 17,
    name: 'Square Ending 1',
    icon: '1²',
    desc: 'Pattern magic',
    color: '#06B6D4',
    generate(randInt) {
      const tens = randInt(1, 8);
      const num = tens * 10 + 1;
      const answer = num * num;
      const questionStr = `${num}² = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 18,
    name: 'Square Ending 6',
    icon: '6²',
    desc: 'Always ends in 6',
    color: '#F97316',
    generate(randInt) {
      const tens = randInt(1, 8);
      const num = tens * 10 + 6;
      const answer = num * num;
      const questionStr = `${num}² = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 19,
    name: 'Divisibility 9',
    icon: '÷9✓',
    desc: 'Digital root',
    color: '#7C3AED',
    generate(randInt, randFrom) {
      const divisibleBy9 = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135];
      const notDivisible = [10, 20, 25, 35, 40, 50, 65, 75, 85, 95];
      const isDiv = Math.random() > 0.5;
      const numList = isDiv ? divisibleBy9 : notDivisible;
      const num = randFrom(numList);
      const answer = isDiv ? 1 : 0;
      const questionStr = `Is ${num} divisible by 9? (1=yes, 0=no)`;
      return { questionStr, answer };
    }
  },

  // === HARD (Advanced/Algebraic) ===
  {
    id: 20,
    name: 'Base Method (10)',
    icon: '~10',
    desc: 'Near 10, 100...',
    color: '#2563EB',
    generate(randInt) {
      const num1 = randInt(7, 13);
      const num2 = randInt(7, 13);
      const answer = num1 * num2;
      const questionStr = `${num1} × ${num2} = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 21,
    name: 'Base Method (50)',
    icon: '~50',
    desc: 'Near 50 method',
    color: '#3B82F6',
    generate(randInt) {
      const offset = randInt(1, 10);
      const num1 = 50 - offset;
      const num2 = 50 + offset;
      const answer = num1 * num2;
      const questionStr = `${num1} × ${num2} = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 22,
    name: '×11 Extended',
    icon: '11++',
    desc: 'With carry logic',
    color: '#2563EB',
    generate(randInt) {
      const num = randInt(57, 99);
      const answer = num * 11;
      const questionStr = `${num} × 11 = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 23,
    name: 'Differ by 2',
    icon: 'n±1',
    desc: 'Sandwich squares',
    color: '#D97706',
    generate(randInt) {
      const m = randInt(5, 20);
      const num1 = m - 1;
      const num2 = m + 1;
      const answer = num1 * num2;
      const questionStr = `${num1} × ${num2} = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 24,
    name: 'Same Tens',
    icon: 'ab',
    desc: 'Ones sum to 10',
    color: '#0D9488',
    generate(randInt) {
      const T = randInt(2, 8);
      const A = randInt(1, 4);
      const num1 = T * 10 + A;
      const num2 = T * 10 + (10 - A);
      const answer = num1 * num2;
      const questionStr = `${num1} × ${num2} = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 25,
    name: 'Cross Multiply',
    icon: '2×2',
    desc: 'Two-digit magic',
    color: '#DC2626',
    generate(randInt, randFrom) {
      const num1 = randInt(10, 50);
      const num2 = randInt(10, 50);
      const answer = num1 * num2;
      const formats = [
        `${num1} × ${num2} = ?`,
        `${num1} × ${num2} = ?`,
        `${num1} times ${num2} = ?`
      ];
      const questionStr = randFrom(formats);
      return { questionStr, answer };
    }
  },

  // === ADDITION TRICKS (Phase 1) ===
  {
    id: 26,
    name: 'Break Into Tens',
    icon: '🔢',
    desc: 'Separate tens and ones',
    color: '#8B5CF6',
    generate(randInt, randFrom) {
      const num1 = randInt(20, 99);
      const num2 = randInt(10, 79);
      const answer = num1 + num2;
      const formats = [
        `${num1} + ${num2} = ?`,
        `Add: ${num1} + ${num2} = ?`,
        `${num1} and ${num2} together = ?`
      ];
      const questionStr = randFrom(formats);
      return { questionStr, answer };
    }
  },
  {
    id: 27,
    name: 'Left-to-Right',
    icon: '←→',
    desc: 'Add hundreds, then tens, then ones',
    color: '#EC4899',
    generate(randInt, randFrom) {
      const num1 = randInt(100, 500);
      const num2 = randInt(100, 400);
      const answer = num1 + num2;
      const formats = [
        `${num1} + ${num2} = ?`,
        `${num1} plus ${num2} = ?`,
        `${num1} + ${num2} total = ?`
      ];
      const questionStr = randFrom(formats);
      return { questionStr, answer };
    }
  },
  {
    id: 28,
    name: 'Compensation',
    icon: '↔️',
    desc: 'Borrow to round, then adjust',
    color: '#10B981',
    generate(randInt, randFrom) {
      const base1 = randInt(16, 28) * 10;
      const base2 = randInt(12, 19) * 10;
      const num1 = base1 + randInt(2, 8);
      const num2 = base2 + randInt(1, 9);
      const answer = num1 + num2;
      const formats = [
        `${num1} + ${num2} = ?`,
        `Sum: ${num1} + ${num2} = ?`,
        `${num1} and ${num2} = ?`
      ];
      const questionStr = randFrom(formats);
      return { questionStr, answer };
    }
  },
  {
    id: 29,
    name: 'Benchmark Rounding',
    icon: '📍',
    desc: 'Round to nearest 10, add, adjust',
    color: '#F59E0B',
    generate(randInt, randFrom) {
      const num1 = randInt(200, 700);
      const num2 = randInt(100, 500);
      const answer = num1 + num2;
      const formats = [
        `${num1} + ${num2} = ?`,
        `What is ${num1} + ${num2}?`,
        `${num1} add ${num2} = ?`
      ];
      const questionStr = randFrom(formats);
      return { questionStr, answer };
    }
  }
];

// ==================== ACHIEVEMENTS ====================
const ACHIEVEMENTS = {
  first_star: {
    id: 'first_star',
    name: 'First Star',
    icon: '🌟',
    description: 'Get your first star',
    check: () => playerProgress.totalStars >= 1
  },
  triple_star: {
    id: 'triple_star',
    name: 'Perfect!',
    icon: '⭐',
    description: 'Get 3 stars on any level',
    check: () => Object.values(playerProgress.levelStars).some(s => s === 3)
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    icon: '🎯',
    description: 'Get 3 stars on all levels',
    check: () => {
      const levels = Object.keys(playerProgress.levelStars).length;
      const perfectLevels = Object.values(playerProgress.levelStars).filter(s => s === 3).length;
      return levels > 0 && levels === perfectLevels;
    }
  },
  five_games: {
    id: 'five_games',
    name: 'Dedicated',
    icon: '🔥',
    description: 'Complete 5 practice sessions',
    check: () => playerProgress.gamesPlayed >= 5
  },
  math_genius: {
    id: 'math_genius',
    name: 'Math Genius',
    icon: '🧠',
    description: `Practice all ${LEVELS.length} levels`,
    check: () => Object.keys(playerProgress.levelStars).length >= LEVELS.length
  },
  score_master: {
    id: 'score_master',
    name: 'Score Master',
    icon: '💯',
    description: 'Earn 100+ total points',
    check: () => playerProgress.totalScore >= 100
  },
  quiz_champion: {
    id: 'quiz_champion',
    name: 'Quiz Champion',
    icon: '🏆',
    description: 'Complete 5 quizzes',
    check: () => playerProgress.quizzesCompleted >= 5
  },
  perfect_quiz: {
    id: 'perfect_quiz',
    name: 'Perfect Score',
    icon: '💯',
    description: 'Get 100% on a quiz',
    check: () => playerProgress.perfectScores >= 1
  }
};

// ==================== PERSISTENCE ====================
function saveProgress() {
  try {
    localStorage.setItem('quickMathProgress', JSON.stringify(playerProgress));
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
}

function loadProgress() {
  try {
    const saved = localStorage.getItem('quickMathProgress');
    if (saved) {
      playerProgress = JSON.parse(saved);
      return true;
    }
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
  return false;
}

// ==================== HELPERS ====================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getStarRating(score, total) {
  const percentage = (score / total) * 100;
  if (percentage === 100) {
    return GAME.MAX_STARS;
  }
  if (percentage >= GAME.STAR2_THRESHOLD_PCT) {
    return 2;
  }
  if (percentage >= GAME.STAR1_THRESHOLD_PCT) {
    return 1;
  }
  return 0;
}

function showScreen(id) {
  // Map old ID to new data-screen name if needed
  const screenName = screenMap[id] || id;

  // Use GameNavigation to track navigation properly
  if (gameNav && gameNav.config.screens.includes(screenName)) {
    gameNav.goToScreen(screenName); // Don't preserve stack - let navigation track it
  } else {
    // Fallback for backward compatibility
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    const element =
      document.querySelector(`[data-screen="${screenName}"]`) || document.getElementById(id);
    if (element) {
      element.classList.add('active');
    }
  }

  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }

  if (kbHandler) {
    document.removeEventListener('keydown', kbHandler);
    kbHandler = null;
  }
}

// ==================== AUDIO ====================
let audioContext;

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!soundEnabled || !audioContext) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  switch (type) {
    case 'success':
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;

    case 'error':
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.15);
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
      break;

    case 'click':
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
      break;

    case 'celebrate': {
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      frequencies.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
        osc.start(audioContext.currentTime + i * 0.1);
        osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
      });
      return;
    }
  }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(title, icon, message) {
  const toast = document.getElementById('achievement-toast');
  toast.innerHTML = `${icon} <strong>${title}</strong><br>${message}`;
  toast.classList.add('visible');
  playSound('celebrate');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}

function checkAndUnlockAchievements() {
  const newAchievements = [];

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (!playerProgress.achievements.includes(achievement.id) && achievement.check()) {
      playerProgress.achievements.push(achievement.id);
      newAchievements.push(achievement);
    }
  });

  if (newAchievements.length > 0) {
    saveProgress();
    newAchievements.forEach((ach, i) => {
      setTimeout(() => showToast(ach.name, ach.icon, ach.description), i * GAME.TOAST_DURATION_MS);
    });
  }
}

// ==================== LEVEL SELECT ====================
function renderLevelGrid() {
  const grid = document.getElementById('level-grid');
  grid.innerHTML = '';

  LEVELS.forEach(level => {
    const stars = playerProgress.levelStars[level.id] || 0;
    const card = document.createElement('div');
    card.className = 'qm-level-card';
    card.style.setProperty('--card-color', level.color);

    let starsHtml = '';
    for (let i = 0; i < 3; i++) {
      starsHtml += `<span class="${i < stars ? 'qm-star--filled' : 'qm-star--empty'}"></span>`;
    }

    card.innerHTML = `
            <div class="qm-level-header">
                <div class="qm-level-icon">${level.icon}</div>
                <div class="qm-level-info">
                    <p class="qm-level-name">${level.name}</p>
                    <p class="qm-level-desc">${level.desc}</p>
                </div>
            </div>
            <div class="qm-stars">${starsHtml}</div>
        `;

    card.addEventListener('click', () => {
      currentLevelId = level.id;
      initAudio();
      playSound('click');
      showTutorial(level.id);
    });

    grid.appendChild(card);
  });
}

// ==================== VISUAL SYSTEM HELPERS ====================
function renderVisualBreakdown(visualData) {
  const container = document.getElementById('tut-visual-breakdown');
  if (!visualData) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'flex';
  container.innerHTML = visualData.html || '';
}

function renderStepByStep(steps) {
  const container = document.getElementById('tut-step-container');
  if (!steps || steps.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = steps
    .map(
      (step, idx) => `
        <div class="qm-step ${idx === 0 ? 'current' : ''}">
            <div class="qm-step-number">${idx + 1}</div>
            <div class="qm-step-content">${step}</div>
        </div>
    `
    )
    .join('');
}

function showVisualStages() {
  const stagesContainer = document.getElementById('tut-stages');
  const step = TUTORIAL_STEPS[currentLevelId][tutStep];

  // Show/hide buttons based on content availability
  const visualBtn = document.querySelector('[data-stage="visual"]');
  const stepsBtn = document.querySelector('[data-stage="steps"]');

  visualBtn.style.display = step.visual ? 'block' : 'none';
  stepsBtn.style.display = step.steps ? 'block' : 'none';

  stagesContainer.style.display = 'flex';
}

// Initialize stage button handlers (called once on page load)
function initStageButtons() {
  document.querySelectorAll('.qm-stage-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const stage = e.target.dataset.stage;
      const step = TUTORIAL_STEPS[currentLevelId][tutStep];

      document.querySelectorAll('.qm-stage-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      if (stage === 'explanation') {
        document.getElementById('tut-visual-breakdown').style.display = 'none';
        document.getElementById('tut-step-container').style.display = 'none';
        document.getElementById('tut-text').style.display = 'block';
      } else if (stage === 'visual' && step.visual) {
        renderVisualBreakdown(step.visual);
        document.getElementById('tut-step-container').style.display = 'none';
        document.getElementById('tut-text').style.display = 'none';
      } else if (stage === 'steps' && step.steps) {
        renderStepByStep(step.steps);
        document.getElementById('tut-visual-breakdown').style.display = 'none';
        document.getElementById('tut-text').style.display = 'none';
      }
    });
  });
}

// ==================== TUTORIAL ====================
function showTutorial(levelId) {
  showScreen('screen-tutorial');
  currentLevelId = levelId;
  tutStep = 0;
  renderTutorialStep();
}

function renderTutorialStep() {
  const steps = TUTORIAL_STEPS[currentLevelId];
  const step = steps[tutStep];

  document.getElementById('tut-title').textContent = step.title;
  document.getElementById('tut-text').textContent = step.text;
  document.getElementById('tut-text').style.display = 'block';
  document.getElementById('tut-example').textContent = step.example;
  document.getElementById('tut-progress').textContent = `Step ${tutStep + 1} of ${steps.length}`;

  // Display mnemonic if available
  const mnemonicEl = document.getElementById('tut-mnemonic');
  if (step.mnemonic) {
    mnemonicEl.textContent = `💡 Remember: ${step.mnemonic}`;
    mnemonicEl.style.display = 'block';
  } else {
    mnemonicEl.style.display = 'none';
  }

  // Display tip if available
  const tipEl = document.getElementById('tut-tip');
  if (step.tip) {
    tipEl.innerHTML = `<strong>💡 Tip:</strong> ${step.tip}`;
    tipEl.style.display = 'block';
  } else {
    tipEl.style.display = 'none';
  }

  // Reset visual elements
  document.getElementById('tut-visual-breakdown').style.display = 'none';
  document.getElementById('tut-step-container').style.display = 'none';

  // Show visual stages if this step has them
  if (step.visual || step.steps) {
    showVisualStages();
    // Reset stage buttons
    document.querySelectorAll('.qm-stage-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-stage="explanation"]').classList.add('active');
  } else {
    document.getElementById('tut-stages').style.display = 'none';
  }

  const prevBtn = document.getElementById('tut-prev');
  const nextBtn = document.getElementById('tut-next');

  if (tutStep > 0) {
    prevBtn.style.display = 'inline-block';
  } else {
    prevBtn.style.display = 'none';
  }

  if (tutStep < steps.length - 1) {
    nextBtn.textContent = 'Next →';
    nextBtn.onclick = () => {
      tutStep++;
      renderTutorialStep();
    };
  } else {
    nextBtn.textContent = 'Practice! →';
    nextBtn.onclick = () => {
      startPractice(currentLevelId);
    };
  }

  prevBtn.onclick = () => {
    if (tutStep > 0) {
      tutStep--;
      renderTutorialStep();
    }
  };
}

// ==================== PRACTICE MODE ====================
function startPractice(levelId) {
  currentLevelId = levelId;
  showScreen('screen-practice');
  practiceScore = 0;
  practiceAnswered = 0;
  answered = false;
  userAnswer = '';
  sessionQuestionHistory = []; // Reset question history for new session
  nextPracticeQuestion();
}

function nextPracticeQuestion() {
  if (practiceAnswered >= GAME.QUESTIONS_PER_SESSION) {
    showResults(practiceScore, GAME.QUESTIONS_PER_SESSION);
    return;
  }

  userAnswer = '';
  answered = false;
  currentQuestion = generateQuestion(currentLevelId);

  document.getElementById('score-display').textContent =
    `Score: ${practiceScore}/${GAME.QUESTIONS_PER_SESSION}`;
  document.getElementById('question-display').textContent = currentQuestion.questionStr;
  document.getElementById('answer-box').textContent = '';
  document.getElementById('answer-box').className = 'qm-answer-box';
  document.getElementById('feedback-display').textContent = '';

  if (kbHandler) {
    document.removeEventListener('keydown', kbHandler);
  }
  kbHandler = e => {
    if (answered) {
      return;
    }
    if (e.key >= '0' && e.key <= '9' && userAnswer.length < 4) {
      userAnswer += e.key;
      document.getElementById('answer-box').textContent = userAnswer;
    } else if (e.key === 'Backspace') {
      userAnswer = userAnswer.slice(0, -1);
      document.getElementById('answer-box').textContent = userAnswer;
    } else if (e.key === 'Enter') {
      checkPracticeAnswer();
    }
  };
  document.addEventListener('keydown', kbHandler);

  renderNumpad();
}

function checkPracticeAnswer() {
  if (answered) {
    return;
  }
  answered = true;

  const answer = parseInt(userAnswer);
  const correct = answer === currentQuestion.answer;

  if (correct) {
    practiceScore++;
    document.getElementById('feedback-display').textContent = '✓ Correct! +1';
    document.getElementById('feedback-display').style.color = '#1CB0F6';
    document.getElementById('answer-box').classList.add('correct');
    playSound('success');
  } else {
    document.getElementById('feedback-display').textContent =
      `✗ Wrong. Answer: ${currentQuestion.answer}`;
    document.getElementById('feedback-display').style.color = '#FF4444';
    document.getElementById('answer-box').classList.add('wrong');
    playSound('error');
  }

  practiceAnswered++;

  autoAdvanceTimer = setTimeout(() => {
    nextPracticeQuestion();
  }, GAME.AUTO_ADVANCE_MS);
}

function renderNumpad() {
  const numpad = document.getElementById('numpad');
  numpad.innerHTML = '';

  for (let i = 0; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'qm-numpad-btn';
    btn.addEventListener('click', () => {
      if (!answered && userAnswer.length < 4) {
        userAnswer += i;
        document.getElementById('answer-box').textContent = userAnswer;
      }
    });
    numpad.appendChild(btn);
  }

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.className = 'qm-numpad-btn qm-clear';
  clearBtn.addEventListener('click', () => {
    userAnswer = '';
    document.getElementById('answer-box').textContent = '';
  });
  numpad.appendChild(clearBtn);

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.className = 'qm-numpad-btn qm-submit';
  submitBtn.addEventListener('click', checkPracticeAnswer);
  numpad.appendChild(submitBtn);
}

// ==================== QUESTION GENERATOR ====================
function generateQuestion(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) {
    console.error(`No level found for id: ${levelId}`);
    return null;
  }

  // Anti-repeat: Generate unique questions within a session
  let result,
    attempt = 0;
  const maxAttempts = 20; // Prevent infinite loops

  do {
    result = level.generate(randInt, randFrom);
    const questionSignature = `${levelId}:${result.questionStr}:${result.answer}`;

    if (!sessionQuestionHistory.includes(questionSignature)) {
      sessionQuestionHistory.push(questionSignature);
      break;
    }

    attempt++;
  } while (attempt < maxAttempts);

  if (attempt >= maxAttempts && result) {
    // Fallback: If we can't generate unique after many attempts, still use it
    const questionSignature = `${levelId}:${result.questionStr}:${result.answer}`;
    if (!sessionQuestionHistory.includes(questionSignature)) {
      sessionQuestionHistory.push(questionSignature);
    }
  }

  return { ...result, levelId };
}

// ==================== RESULTS SCREEN ====================
function showResults(score, total) {
  showScreen('screen-results');

  const percentage = (score / total) * 100;
  const passed = percentage >= GAME.PASS_THRESHOLD_PCT;
  const stars = getStarRating(score, total);

  if (passed) {
    playSound('celebrate');
  }

  document.getElementById('results-title').textContent = passed
    ? '🎉 Great Job!'
    : '📚 Keep Practicing!';
  document.getElementById('results-title').style.color = passed
    ? 'var(--dom-accent)'
    : 'var(--qm-red)';

  let starsHtml = '';
  for (let i = 0; i < 3; i++) {
    starsHtml += `<span class="${i < stars ? 'qm-result-star--filled' : 'qm-result-star--empty'}"></span>`;
  }
  document.getElementById('results-stars').innerHTML = starsHtml;

  const ratingText =
    stars === 3 ? 'Perfect!' : stars === 2 ? 'Great!' : stars === 1 ? 'Good Try!' : 'Keep Going!';
  document.getElementById('results-rating').textContent = ratingText;

  document.getElementById('results-score').textContent = `Score: ${score}/${total}`;
  document.getElementById('results-percentage').textContent = `${percentage.toFixed(0)}%`;

  playerProgress.gamesPlayed++;
  playerProgress.totalScore += score;

  const currentBestStars = playerProgress.levelStars[currentLevelId] || 0;
  if (stars > currentBestStars) {
    playerProgress.levelStars[currentLevelId] = stars;
  }

  playerProgress.totalStars = Object.values(playerProgress.levelStars).reduce((a, b) => a + b, 0);

  saveProgress();
  checkAndUnlockAchievements();

  document.getElementById('btn-try-again').onclick = () => {
    playSound('click');
    startPractice(currentLevelId);
  };

  document.getElementById('btn-level-select').onclick = () => {
    playSound('click');
    showLevelSelect();
  };
}

// ==================== PROGRESS SCREEN ====================
function showProgressScreen() {
  showScreen('screen-progress');

  document.getElementById('stat-stars').textContent = playerProgress.totalStars;
  document.getElementById('stat-games').textContent = playerProgress.gamesPlayed;
  document.getElementById('stat-score').textContent = playerProgress.totalScore;

  const achievementsGrid = document.getElementById('achievements-grid');
  achievementsGrid.innerHTML = '';

  Object.values(ACHIEVEMENTS).forEach(ach => {
    const unlocked = playerProgress.achievements.includes(ach.id);
    const card = document.createElement('div');
    card.className = `qm-achievement-card ${!unlocked ? 'locked' : ''}`;
    card.innerHTML = `
            <div class="qm-achievement-icon">${unlocked ? ach.icon : '🔒'}</div>
            <div class="qm-achievement-name">${ach.name}</div>
            <div class="qm-achievement-desc">${ach.description}</div>
        `;
    achievementsGrid.appendChild(card);
  });

  document.getElementById('btn-back-from-progress').onclick = () => {
    playSound('click');
    showLevelSelect();
  };
}

function showLevelSelect() {
  showScreen('screen-level-select');

  document.getElementById('btn-progress').onclick = () => {
    playSound('click');
    showProgressScreen();
  };
}

// ==================== QUIZ MODE ====================

function startSingleTrickQuiz(trickId) {
  const trick = TRICK_PARTS.find(t => t.id === trickId);
  if (!trick) {
    return;
  }

  quizMode.type = 'single-trick';
  quizMode.selectedTrick = trick;
  quizMode.tricks = [trick];
  quizMode.questions = generateQuizQuestions([trick], 10);
  quizMode.currentQuestionIndex = 0;
  quizMode.score = 0;
  quizMode.answered = 0;
  quizMode.userAnswers = [];
  quizMode.startTime = Date.now();

  showScreen('quiz-practice');
  renderQuizQuestion();
}

function startMultiTrickQuiz() {
  const shuffled = TRICK_PARTS.sort(() => Math.random() - 0.5);
  const selectedTricks = shuffled.slice(0, 3);

  quizMode.type = 'multi-trick';
  quizMode.tricks = selectedTricks;
  quizMode.questions = generateQuizQuestions(selectedTricks, 15);
  quizMode.currentQuestionIndex = 0;
  quizMode.score = 0;
  quizMode.answered = 0;
  quizMode.userAnswers = [];
  quizMode.startTime = Date.now();

  showScreen('quiz-practice');
  renderQuizQuestion();
}

function startRandomQuiz() {
  quizMode.type = 'random';
  quizMode.tricks = [];
  quizMode.questions = generateQuizQuestions(TRICK_PARTS, 10);
  quizMode.currentQuestionIndex = 0;
  quizMode.score = 0;
  quizMode.answered = 0;
  quizMode.userAnswers = [];
  quizMode.startTime = Date.now();

  showScreen('quiz-practice');
  renderQuizQuestion();
}

function startComprehensiveTest() {
  quizMode.type = 'comprehensive';
  quizMode.tricks = TRICK_PARTS;
  quizMode.questions = generateQuizQuestions(TRICK_PARTS, 20);
  quizMode.currentQuestionIndex = 0;
  quizMode.score = 0;
  quizMode.answered = 0;
  quizMode.userAnswers = [];
  quizMode.startTime = Date.now();

  showScreen('quiz-practice');
  renderQuizQuestion();
}

function generateQuizQuestions(tricks, count) {
  const questions = [];
  const levels = [];

  tricks.forEach(trick => {
    levels.push(...trick.levels);
  });

  for (let i = 0; i < count; i++) {
    const levelId = randFrom(levels);
    const level = LEVELS.find(l => l.id === levelId);
    if (level) {
      const q = level.generate(randInt, randFrom);
      questions.push({
        levelId,
        levelName: level.name,
        ...q
      });
    }
  }

  return questions;
}

function renderQuizQuestion() {
  if (quizMode.currentQuestionIndex >= quizMode.questions.length) {
    showQuizResults();
    return;
  }

  const q = quizMode.questions[quizMode.currentQuestionIndex];
  const totalQuestions = quizMode.questions.length;

  document.getElementById('quiz-question-display').textContent = q.questionStr;
  document.getElementById('quiz-score-display').textContent =
    `Score: ${quizMode.score}/${quizMode.answered + 1}`;
  document.getElementById('quiz-meta').textContent =
    `${quizMode.type.replace('-', ' ').toUpperCase()} • Question ${quizMode.currentQuestionIndex + 1}/${totalQuestions} • Trick: ${q.levelName}`;
  document.getElementById('quiz-answer-box').textContent = '?';
  document.getElementById('quiz-answer-box').className = 'qm-answer-box';
  document.getElementById('quiz-feedback-display').textContent = '';
  userAnswer = '';

  renderQuizNumpad();
}

function checkQuizAnswer() {
  if (answered || userAnswer === '') {
    return;
  }

  answered = true;
  const q = quizMode.questions[quizMode.currentQuestionIndex];
  const isCorrect = parseInt(userAnswer, 10) === q.answer;

  if (isCorrect) {
    quizMode.score++;
    playSound('correct');
    document.getElementById('quiz-answer-box').classList.add('correct');
    document.getElementById('quiz-feedback-display').textContent = '✅ Correct!';
  } else {
    playSound('wrong');
    document.getElementById('quiz-answer-box').classList.add('wrong');
    document.getElementById('quiz-feedback-display').textContent = `❌ Wrong! It was ${q.answer}`;
  }

  quizMode.userAnswers.push({
    levelId: q.levelId,
    levelName: q.levelName,
    question: q.questionStr,
    userAnswer: parseInt(userAnswer, 10),
    correctAnswer: q.answer,
    correct: isCorrect
  });

  quizMode.answered++;
  autoAdvanceTimer = setTimeout(() => {
    quizMode.currentQuestionIndex++;
    answered = false;
    renderQuizQuestion();
  }, GAME.AUTO_ADVANCE_MS);
}

function renderQuizNumpad() {
  const numpad = document.getElementById('quiz-numpad');
  numpad.innerHTML = '';

  for (let i = 0; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'qm-numpad-btn';
    btn.textContent = i;
    if (answered) {
      btn.disabled = true;
    }
    btn.addEventListener('click', () => {
      if (!answered && userAnswer.length < GAME.MAX_ANSWER_DIGITS) {
        userAnswer += i;
        document.getElementById('quiz-answer-box').textContent = userAnswer;
      }
    });
    numpad.appendChild(btn);
  }

  const clearBtn = document.createElement('button');
  clearBtn.className = 'qm-numpad-btn qm-clear';
  clearBtn.textContent = 'Clear';
  if (answered) {
    clearBtn.disabled = true;
  }
  clearBtn.addEventListener('click', () => {
    if (!answered) {
      userAnswer = '';
      document.getElementById('quiz-answer-box').textContent = '?';
    }
  });
  numpad.appendChild(clearBtn);

  const submitBtn = document.createElement('button');
  submitBtn.className = 'qm-numpad-btn qm-submit';
  submitBtn.textContent = 'Submit';
  if (answered) {
    submitBtn.disabled = true;
  }
  submitBtn.addEventListener('click', checkQuizAnswer);
  numpad.appendChild(submitBtn);
}

function showQuizResults() {
  quizMode.endTime = Date.now();
  const percentage = Math.round((quizMode.score / quizMode.questions.length) * 100);
  const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : percentage >= 40 ? 1 : 0;
  const timeSeconds = Math.round((quizMode.endTime - quizMode.startTime) / 1000);

  // Update progress
  playerProgress.quizzesCompleted++;
  if (percentage === 100) {
    playerProgress.perfectScores++;
  }
  playerProgress.totalScore += quizMode.score;
  saveProgress();

  // Render results
  document.getElementById('results-title').textContent =
    quizMode.score === quizMode.questions.length ? '🎉 Perfect!' : 'Great Effort!';
  document.getElementById('results-score').textContent =
    `${quizMode.score}/${quizMode.questions.length}`;
  document.getElementById('results-percentage').textContent = `${percentage}%`;

  const starsHtml = Array(3)
    .fill(0)
    .map((_, i) => `<span class="qm-result-star--${i < stars ? 'filled' : 'empty'}"></span>`)
    .join('');
  document.getElementById('results-stars').innerHTML = starsHtml;

  let rating = 'Keep practicing!';
  if (percentage >= 90) {
    rating = 'Awesome! 🌟';
  } else if (percentage >= 80) {
    rating = 'Excellent! 🎯';
  } else if (percentage >= 60) {
    rating = 'Good job! 👍';
  }
  document.getElementById('results-rating').textContent = rating;

  // Quiz-specific stats
  const trickBreakdown = calculateTrickBreakdown();
  const metaInfo = `<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--dom-border)">
    <div style="font-size: 16px; font-weight: 700; margin-bottom: 12px">📊 Quiz Stats</div>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 14px">
      <div><span style="color: var(--dom-text-muted)">Quiz Type:</span> ${quizMode.type.replace('-', ' ').toUpperCase()}</div>
      <div><span style="color: var(--dom-text-muted)">Time:</span> ${Math.floor(timeSeconds / 60)}m ${timeSeconds % 60}s</div>
      <div><span style="color: var(--dom-text-muted)">Accuracy:</span> ${percentage}%</div>
      <div><span style="color: var(--dom-text-muted)">Questions:</span> ${quizMode.questions.length}</div>
    </div>
    ${trickBreakdown}
  </div>`;

  const resultsCard = document.querySelector('.qm-results-card');
  const existingMeta = resultsCard.querySelector('[id="results-rating"]');
  if (existingMeta && !existingMeta.parentElement.querySelector('[id="quiz-meta-info"]')) {
    const metaDiv = document.createElement('div');
    metaDiv.id = 'quiz-meta-info';
    metaDiv.innerHTML = metaInfo;
    existingMeta.parentElement.appendChild(metaDiv);
  }

  showScreen('results');
}

function calculateTrickBreakdown() {
  const breakdown = {};

  quizMode.userAnswers.forEach(answer => {
    const trick = TRICK_PARTS.find(t => t.levels.includes(answer.levelId));
    if (trick) {
      if (!breakdown[trick.name]) {
        breakdown[trick.name] = { correct: 0, total: 0 };
      }
      breakdown[trick.name].total++;
      if (answer.correct) {
        breakdown[trick.name].correct++;
      }
    }
  });

  let html =
    '<div style="margin-top: 16px"><div style="font-size: 14px; font-weight: 700; margin-bottom: 8px">By Trick Category:</div>';
  Object.entries(breakdown).forEach(([trick, stats]) => {
    const pct = Math.round((stats.correct / stats.total) * 100);
    html += `<div style="margin-bottom: 8px; padding: 8px; background: color-mix(in srgb, var(--dom-accent) 10%, white); border-radius: 4px; font-size: 14px">
      <strong>${trick}:</strong> ${stats.correct}/${stats.total} (${pct}%)
    </div>`;
  });
  html += '</div>';

  return html;
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation system (handles back button and screen transitions)
  initNavigation();

  // Initialize tutorial stage buttons
  initStageButtons();

  loadProgress();
  renderLevelGrid();
  showLevelSelect();

  // Sound toggle (only attach if element exists)
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
      if (soundEnabled) {
        initAudio();
        playSound('click');
      }
    });
  }

  document.addEventListener(
    'click',
    () => {
      initAudio();
    },
    { once: true }
  );

  // Quiz buttons from landing section
  document.getElementById('btn-single-trick-quiz')?.addEventListener('click', () => {
    const trickId = prompt(
      `Choose a trick category to master:\n\n${TRICK_PARTS.map((t, i) => `${i + 1}. ${t.name}`).join('\n')}\n\nEnter number (1-5):`
    );
    if (trickId && trickId >= 1 && trickId <= 5) {
      startSingleTrickQuiz(TRICK_PARTS[parseInt(trickId) - 1].id);
    }
  });

  document.getElementById('btn-multi-trick-quiz')?.addEventListener('click', startMultiTrickQuiz);
  document.getElementById('btn-random-quiz-btn')?.addEventListener('click', startRandomQuiz);
  document.getElementById('btn-full-test')?.addEventListener('click', startComprehensiveTest);
});

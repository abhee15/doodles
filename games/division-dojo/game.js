/* eslint-disable no-undef */
// Division Dojo - Master Division from First Principles!
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
  gameNav = new GameNavigation('division-dojo', {
    screens: ['landing', 'tutorial', 'practice', 'quiz-practice', 'results', 'progress'],
    initialScreen: 'landing',
    gameName: 'Division Dojo',
    titles: {
      landing: 'Division Dojo',
      tutorial: 'Learn the Concept',
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
const soundEnabled = true;
let autoAdvanceTimer = null;
const kbHandler = null;

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
    id: 'foundations',
    name: 'Foundations',
    desc: 'Division basics & remainders',
    levels: [1, 2, 3],
    icon: '📚'
  },
  {
    id: 'easy-tricks',
    name: 'Easy Tricks',
    desc: '÷2, ÷4, ÷8, ÷5, ÷10, ÷100, ÷3',
    levels: [4, 5, 6, 7, 8, 9, 10],
    icon: '⭐'
  },
  {
    id: 'advanced-tricks',
    name: 'Advanced Tricks',
    desc: '÷9, ÷6, ÷25, ÷11, break-apart',
    levels: [11, 12, 13, 14, 15],
    icon: '🚀'
  },
  {
    id: 'divisibility',
    name: 'Divisibility Tests',
    desc: 'Detective tests & word problems',
    levels: [16, 17],
    icon: '🔍'
  },
  {
    id: 'fractions',
    name: 'Bridge to Fractions',
    desc: 'Division ↔ Fractions connection',
    levels: [18, 19, 20],
    icon: '🥧'
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
// 20 Levels: Foundations → Tricks → Divisibility → Bridge to Fractions
const LEVELS = [
  // === PART 1: FOUNDATIONS (Levels 1-3) ===
  {
    id: 1,
    name: 'What is Division?',
    icon: '÷',
    desc: 'Split into equal groups!',
    color: '#7C3AED',
    generate(randInt, randFrom) {
      const divisor = randFrom([2, 3, 4]);
      const quotient = randInt(2, 9);
      const answer = quotient;
      const questionStr = `${divisor * quotient} ÷ ${divisor} = ?`;
      return { questionStr, answer };
    }
  },
  {
    id: 2,
    name: 'Division Language',
    icon: '÷',
    desc: 'Dividend ÷ Divisor = Quotient',
    color: '#8B5CF6',
    generate(randInt, randFrom) {
      const divisor = randFrom([2, 3, 4]);
      const quotient = randInt(2, 9);
      return {
        questionStr: `What is the quotient? ${divisor * quotient} ÷ ${divisor} = ?`,
        answer: quotient
      };
    }
  },
  {
    id: 3,
    name: 'Remainders',
    icon: 'R',
    desc: 'Left-over pieces!',
    color: '#A78BFA',
    generate(randInt, randFrom) {
      const divisor = randFrom([2, 3, 4]);
      const quotient = randInt(2, 7);
      const remainder = randInt(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      return { questionStr: `${dividend} ÷ ${divisor}: what's left over?`, answer: remainder };
    }
  },

  // === PART 2: EASY TRICKS (Levels 4-10) ===
  {
    id: 4,
    name: '÷2 — Cut in Half',
    icon: '½',
    desc: 'Halving',
    color: '#7C3AED',
    generate(randInt) {
      const quotient = randInt(2, 20);
      const answer = quotient;
      return { questionStr: `${quotient * 2} ÷ 2 = ?`, answer };
    }
  },
  {
    id: 5,
    name: '÷4 — Quarter Power',
    icon: '¼',
    desc: 'Halve twice',
    color: '#8B5CF6',
    generate(randInt) {
      const quotient = randInt(3, 25);
      const answer = quotient;
      return { questionStr: `${quotient * 4} ÷ 4 = ?`, answer };
    }
  },
  {
    id: 6,
    name: '÷8 — Halve Three Times',
    icon: '⅛',
    desc: 'Halve, halve, halve',
    color: '#A78BFA',
    generate(randInt) {
      const quotient = randInt(5, 50);
      const answer = quotient;
      return { questionStr: `${quotient * 8} ÷ 8 = ?`, answer };
    }
  },
  {
    id: 7,
    name: '÷5 — Double & Slide',
    icon: '÷5',
    desc: '×2 then ÷10',
    color: '#7C3AED',
    generate(randInt) {
      const quotient = randInt(5, 40);
      const answer = quotient;
      return { questionStr: `${quotient * 5} ÷ 5 = ?`, answer };
    }
  },
  {
    id: 8,
    name: '÷10 — Drop a Zero',
    icon: '0️⃣',
    desc: 'Slide decimal left',
    color: '#8B5CF6',
    generate(randInt) {
      const quotient = randInt(10, 99);
      const answer = quotient;
      return { questionStr: `${quotient * 10} ÷ 10 = ?`, answer };
    }
  },
  {
    id: 9,
    name: '÷100 — Two Left',
    icon: '00',
    desc: 'Slide decimal twice',
    color: '#A78BFA',
    generate(randInt) {
      const quotient = randInt(50, 300);
      const answer = quotient;
      return { questionStr: `${quotient * 100} ÷ 100 = ?`, answer };
    }
  },
  {
    id: 10,
    name: '÷3 — Digit Sum',
    icon: '∑',
    desc: 'Sum all digits',
    color: '#7C3AED',
    generate(randInt) {
      const quotient = randInt(3, 33);
      const answer = quotient;
      return { questionStr: `${quotient * 3} ÷ 3 = ?`, answer };
    }
  },

  // === PART 3: DIVISIBILITY & ADVANCED (Levels 11-15) ===
  {
    id: 11,
    name: '÷9 — Digit Sum of 9',
    icon: '9️⃣',
    desc: 'Sum digits for clue',
    color: '#8B5CF6',
    generate(randInt) {
      const quotient = randInt(5, 55);
      const answer = quotient;
      return { questionStr: `${quotient * 9} ÷ 9 = ?`, answer };
    }
  },
  {
    id: 12,
    name: '÷6 — Two Steps',
    icon: '↔️',
    desc: '÷2 then ÷3',
    color: '#A78BFA',
    generate(randInt) {
      const quotient = randInt(5, 50);
      const answer = quotient;
      return { questionStr: `${quotient * 6} ÷ 6 = ?`, answer };
    }
  },
  {
    id: 13,
    name: '÷25 — Quarter Century',
    icon: '2️⃣5️⃣',
    desc: '×4 then ÷100',
    color: '#7C3AED',
    generate(randInt) {
      const quotient = randInt(10, 100);
      const answer = quotient;
      return { questionStr: `${quotient * 25} ÷ 25 = ?`, answer };
    }
  },
  {
    id: 14,
    name: '÷11 — Alternating Sum',
    icon: '1️⃣1️⃣',
    desc: 'Alt digit sum trick',
    color: '#8B5CF6',
    generate(randInt) {
      const quotient = randInt(10, 60);
      const answer = quotient;
      return { questionStr: `${quotient * 11} ÷ 11 = ?`, answer };
    }
  },
  {
    id: 15,
    name: 'Break Apart',
    icon: '🔀',
    desc: 'Split the dividend',
    color: '#A78BFA',
    generate(randInt) {
      const divisor = randInt(3, 9);
      const quotient = randInt(10, 50);
      const answer = quotient;
      return { questionStr: `${divisor * quotient} ÷ ${divisor} = ?`, answer };
    }
  },

  // === PART 4: DIVISIBILITY TESTS (Levels 16-17) ===
  {
    id: 16,
    name: 'Divisibility Detective',
    icon: '🔍',
    desc: 'Is it divisible?',
    color: '#7C3AED',
    generate(randInt, randFrom) {
      const divisor = randFrom([2, 3, 4, 5]);
      const isDiv = randFrom([true, false]);
      let number;
      if (isDiv) {
        number = randInt(5, 30) * divisor;
      } else {
        number = randInt(5, 30) * divisor + randInt(1, divisor - 1);
      }
      return {
        questionStr: `Is ${number} divisible by ${divisor}? (1=yes, 0=no)`,
        answer: isDiv ? 1 : 0
      };
    }
  },
  {
    id: 17,
    name: 'Word Problems',
    icon: '📖',
    desc: 'Sharing & grouping',
    color: '#8B5CF6',
    generate(randInt, randFrom) {
      const stories = [
        {
          template: (n, d) => `${n} cookies shared equally among ${d} friends. Each gets ?`,
          n: 0,
          d: 0
        },
        { template: (n, d) => `${n} pencils in ${d} boxes. Each box has ?`, n: 0, d: 0 },
        { template: (n, d) => `${n} students in ${d} teams. Each team has ?`, n: 0, d: 0 },
        { template: (n, d) => `${n} marbles shared into ${d} piles. Each pile has ?`, n: 0, d: 0 }
      ];
      const story = randFrom(stories);
      const d = randInt(3, 8);
      const q = randInt(5, 30);
      const n = d * q;
      return { questionStr: story.template(n, d), answer: q };
    }
  },

  // === PART 5: BRIDGE TO FRACTIONS (Levels 18-20) ===
  {
    id: 18,
    name: 'Division = Fraction!',
    icon: '÷=/',
    desc: '3÷4 = 3/4',
    color: '#A78BFA',
    generate(randInt) {
      const numerator = randInt(1, 8);
      const denominator = randInt(2, 8);
      return {
        questionStr: `${numerator}÷${denominator} = ${numerator}/${denominator} ✓\n\nSo 1/${denominator} of ${numerator * denominator} = ?`,
        answer: numerator
      };
    }
  },
  {
    id: 19,
    name: 'Numerator & Denominator',
    icon: 'ⁿ⁄ₐ',
    desc: 'Top & bottom parts',
    color: '#7C3AED',
    generate(randInt, randFrom) {
      const denominator = randFrom([2, 3, 4, 5]);
      const whole = randInt(20, 100);
      const answers = {
        2: whole / 2,
        3: whole / 3,
        4: whole / 4,
        5: whole / 5
      };
      return { questionStr: `1/${denominator} of ${whole} = ?`, answer: answers[denominator] };
    }
  },
  {
    id: 20,
    name: 'Simple Fractions',
    icon: '🥧',
    desc: 'Fraction practice',
    color: '#8B5CF6',
    generate(randInt, randFrom) {
      const fractions = [
        { num: 1, den: 2, whole: w => w / 2 },
        { num: 1, den: 3, whole: w => w / 3 },
        { num: 1, den: 4, whole: w => w / 4 },
        { num: 2, den: 3, whole: w => (2 * w) / 3 }
      ];
      const frac = randFrom(fractions);
      const whole = randInt(30, 120);
      const answer = Math.round(frac.whole(whole));
      return { questionStr: `${frac.num}/${frac.den} of ${whole} = ?`, answer };
    }
  }
];

// ==================== UTILITY FUNCTIONS ====================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateQuestion() {
  if (!currentLevelId) {
    return null;
  }
  const level = LEVELS.find(l => l.id === currentLevelId);
  if (!level) {
    return null;
  }
  return level.generate(randInt, randFrom);
}

function showScreen(screenId) {
  const screens = document.querySelectorAll('.dom-screen');
  screens.forEach(s => s.classList.remove('active'));
  const screen = document.querySelector(`[data-screen="${screenId}"]`);
  if (screen) {
    screen.classList.add('active');
  }
}

// ==================== LEVEL GRID ====================
function renderLevelGrid() {
  const grid = document.getElementById('level-grid');
  if (!grid) {
    return;
  }
  grid.innerHTML = '';

  LEVELS.forEach(level => {
    const card = document.createElement('div');
    card.className = 'dd-level-card';
    card.style.setProperty('--card-color', level.color);

    const starsHtml = Array(3)
      .fill(0)
      .map((_, i) => {
        const stars = playerProgress.levelStars[level.id] || 0;
        const cls = i < stars ? 'dd-star--filled' : 'dd-star--empty';
        return `<span class="${cls}"></span>`;
      })
      .join('');

    card.innerHTML = `
      <div class="dd-level-header">
        <div class="dd-level-icon">${level.icon}</div>
        <div class="dd-level-info">
          <div class="dd-level-name">${level.name}</div>
          <div class="dd-level-desc">${level.desc}</div>
        </div>
      </div>
      <div class="dd-stars">${starsHtml}</div>
    `;

    card.addEventListener('click', () => startTutorial(level.id));
    grid.appendChild(card);
  });
}

// ==================== TUTORIAL SYSTEM ====================
function startTutorial(levelId) {
  currentLevelId = levelId;
  tutStep = 0;
  showScreen('tutorial');
  renderTutorialStep();
}

function renderTutorialStep() {
  const level = LEVELS.find(l => l.id === currentLevelId);
  if (!level) {
    return;
  }

  const steps = TUTORIAL_STEPS[level.id] || [];
  if (steps.length === 0) {
    tutStep = 0;
    return;
  }

  if (tutStep >= steps.length) {
    showResults();
    return;
  }

  const step = steps[tutStep];
  const totalSteps = steps.length;

  // Clear previous content
  document.getElementById('tut-title').textContent = step.title || '';
  document.getElementById('tut-text').textContent = step.text || '';
  document.getElementById('tut-example').textContent = step.example || '';
  document.getElementById('tut-progress').textContent = `Step ${tutStep + 1} of ${totalSteps}`;

  // Mnemonic
  const mnemonicEl = document.getElementById('tut-mnemonic');
  if (step.mnemonic) {
    mnemonicEl.textContent = step.mnemonic;
    mnemonicEl.style.display = 'block';
  } else {
    mnemonicEl.style.display = 'none';
  }

  // Tip
  const tipEl = document.getElementById('tut-tip');
  if (step.tip) {
    tipEl.innerHTML = `<strong>💡 Tip:</strong> ${step.tip}`;
    tipEl.style.display = 'block';
  } else {
    tipEl.style.display = 'none';
  }

  // Visual Stages
  const stagesEl = document.getElementById('tut-stages');
  const hasVisual = step.visual || step.steps;
  if (hasVisual) {
    stagesEl.style.display = 'flex';
    setupVisualStages(step);
  } else {
    stagesEl.style.display = 'none';
  }

  // Button visibility
  document.getElementById('tut-prev').style.display = tutStep > 0 ? 'block' : 'none';
  document.getElementById('btn-back-from-tutorial').style.display =
    tutStep === totalSteps - 1 ? 'block' : 'none';
  document.getElementById('tut-next').style.display = tutStep < totalSteps - 1 ? 'block' : 'none';
}

function setupVisualStages(step) {
  const stageButtons = document.querySelectorAll('.dd-stage-btn');
  stageButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.addEventListener('click', e => {
      stageButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const stage = e.target.dataset.stage;
      renderVisualStage(stage, step);
    });
  });

  stageButtons[0].classList.add('active');
  renderVisualStage('explanation', step);
}

function renderVisualStage(stage, step) {
  const visualEl = document.getElementById('tut-visual-breakdown');
  const stepsEl = document.getElementById('tut-step-container');

  if (stage === 'visual' && step.visual) {
    visualEl.innerHTML = step.visual.html || '';
    visualEl.style.display = 'block';
    stepsEl.style.display = 'none';
  } else if (stage === 'steps' && step.steps) {
    stepsEl.innerHTML = step.steps
      .map(
        (s, i) =>
          `<div class="dd-step ${i === 0 ? 'current' : ''}"><div class="dd-step-number">${i + 1}</div><div class="dd-step-content">${s}</div></div>`
      )
      .join('');
    stepsEl.style.display = 'flex';
    visualEl.style.display = 'none';
  } else {
    visualEl.style.display = 'none';
    stepsEl.style.display = 'none';
  }
}

// ==================== PRACTICE MODE ====================
function startPractice() {
  practiceScore = 0;
  practiceAnswered = 0;
  userAnswer = '';
  answered = false;
  showScreen('practice');
  nextPracticeQuestion();
}

function nextPracticeQuestion() {
  if (practiceAnswered >= GAME.QUESTIONS_PER_SESSION) {
    showResults();
    return;
  }

  currentQuestion = generateQuestion();
  userAnswer = '';
  answered = false;
  renderPracticeUI();

  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
  }
}

function renderPracticeUI() {
  if (!currentQuestion) {
    return;
  }

  document.getElementById('question-display').textContent = currentQuestion.questionStr;
  document.getElementById('score-display').textContent =
    `Score: ${practiceScore}/${practiceAnswered + 1}`;
  document.getElementById('answer-box').textContent = userAnswer || '?';
  document.getElementById('answer-box').className = 'dd-answer-box';
  document.getElementById('feedback-display').textContent = '';

  renderNumpad();
}

function checkPracticeAnswer() {
  if (answered || userAnswer === '') {
    return;
  }

  answered = true;
  const isCorrect = parseInt(userAnswer, 10) === currentQuestion.answer;
  if (isCorrect) {
    practiceScore++;
    playSound('correct');
    document.getElementById('answer-box').classList.add('correct');
    document.getElementById('feedback-display').textContent = '✅ Correct!';
  } else {
    playSound('wrong');
    document.getElementById('answer-box').classList.add('wrong');
    document.getElementById('feedback-display').textContent =
      `❌ Wrong! It was ${currentQuestion.answer}`;
  }

  practiceAnswered++;
  autoAdvanceTimer = setTimeout(() => nextPracticeQuestion(), GAME.AUTO_ADVANCE_MS);
}

function renderNumpad() {
  const numpad = document.getElementById('numpad');
  numpad.innerHTML = '';

  // Digits 0-9
  for (let i = 0; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'dd-numpad-btn';
    btn.textContent = i;
    if (answered) {
      btn.disabled = true;
    }
    btn.addEventListener('click', () => {
      if (!answered && userAnswer.length < GAME.MAX_ANSWER_DIGITS) {
        userAnswer += i;
        renderPracticeUI();
      }
    });
    numpad.appendChild(btn);
  }

  // Clear button
  const clearBtn = document.createElement('button');
  clearBtn.className = 'dd-numpad-btn dd-clear';
  clearBtn.textContent = 'Clear';
  if (answered) {
    clearBtn.disabled = true;
  }
  clearBtn.addEventListener('click', () => {
    if (!answered) {
      userAnswer = '';
      renderPracticeUI();
    }
  });
  numpad.appendChild(clearBtn);

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.className = 'dd-numpad-btn dd-submit';
  submitBtn.textContent = 'Submit';
  if (answered) {
    submitBtn.disabled = true;
  }
  submitBtn.addEventListener('click', checkPracticeAnswer);
  numpad.appendChild(submitBtn);
}

// ==================== RESULTS SCREEN ====================
function showResults() {
  const percentage = Math.round((practiceScore / GAME.QUESTIONS_PER_SESSION) * 100);
  const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : percentage >= 40 ? 1 : 0;

  // Update progress
  playerProgress.levelStars[currentLevelId] = Math.max(
    playerProgress.levelStars[currentLevelId] || 0,
    stars
  );
  playerProgress.totalStars = Object.values(playerProgress.levelStars).reduce((a, b) => a + b, 0);
  playerProgress.gamesPlayed++;
  playerProgress.totalScore += practiceScore;
  saveProgress();

  // Render results
  document.getElementById('results-title').textContent =
    practiceScore === GAME.QUESTIONS_PER_SESSION ? '🎉 Perfect!' : 'Great Effort!';
  document.getElementById('results-score').textContent =
    `${practiceScore}/${GAME.QUESTIONS_PER_SESSION}`;
  document.getElementById('results-percentage').textContent = `${percentage}%`;

  const starsHtml = Array(3)
    .fill(0)
    .map((_, i) => `<span class="dd-result-star--${i < stars ? 'filled' : 'empty'}"></span>`)
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

  showScreen('results');
}

// ==================== PROGRESS SCREEN ====================
function showProgressScreen() {
  document.getElementById('stat-stars').textContent = playerProgress.totalStars;
  document.getElementById('stat-games').textContent = playerProgress.gamesPlayed;
  document.getElementById('stat-score').textContent = playerProgress.totalScore;

  const achievements = getAchievements();
  const achGrid = document.getElementById('achievements-grid');
  achGrid.innerHTML = achievements
    .map(ach => {
      const unlocked = ach.check();
      return `
        <div class="dd-achievement-card ${unlocked ? '' : 'locked'}">
          <div class="dd-achievement-icon">${ach.icon}</div>
          <div class="dd-achievement-name">${ach.name}</div>
          <div class="dd-achievement-desc">${ach.desc}</div>
        </div>
      `;
    })
    .join('');

  showScreen('progress');
}

function getAchievements() {
  return [
    {
      icon: '🎯',
      name: 'Division Master',
      desc: 'Beat all 20 levels',
      check: () => Object.keys(playerProgress.levelStars).length === LEVELS.length
    },
    {
      icon: '⭐',
      name: 'Star Collector',
      desc: 'Earn 30 stars',
      check: () => playerProgress.totalStars >= 30
    },
    {
      icon: '🔥',
      name: 'Streak King',
      desc: 'Perfect 5 in a row',
      check: () => playerProgress.gamesPlayed >= 5
    },
    {
      icon: '🚀',
      name: 'Quick Learner',
      desc: 'Beat 10 levels',
      check: () => Object.keys(playerProgress.levelStars).length >= 10
    },
    {
      icon: '💎',
      name: 'Fraction Ready',
      desc: 'Complete Level 20',
      check: () => playerProgress.levelStars[20] >= 1
    },
    {
      icon: '🧠',
      name: 'Quiz Champion',
      desc: 'Complete 5 quizzes',
      check: () => playerProgress.quizzesCompleted >= 5
    },
    {
      icon: '💯',
      name: 'Perfect Score',
      desc: 'Get 100% on a quiz',
      check: () => playerProgress.perfectScores >= 1
    }
  ];
}

// ==================== SOUND SYSTEM ====================
function playSound(type) {
  if (!soundEnabled) {
    return;
  }

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  if (type === 'correct') {
    oscillator.frequency.value = 800;
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (type === 'wrong') {
    oscillator.frequency.value = 400;
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
}

// ==================== STORAGE ====================
function saveProgress() {
  localStorage.setItem('division-dojo-progress', JSON.stringify(playerProgress));
}

function loadProgress() {
  const saved = localStorage.getItem('division-dojo-progress');
  if (saved) {
    playerProgress = JSON.parse(saved);
  }
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
    `${quizMode.type.replace('-', ' ').toUpperCase()} • Question ${quizMode.currentQuestionIndex + 1}/${totalQuestions} • Level: ${q.levelName}`;
  document.getElementById('quiz-answer-box').textContent = '?';
  document.getElementById('quiz-answer-box').className = 'dd-answer-box';
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
    btn.className = 'dd-numpad-btn';
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
  clearBtn.className = 'dd-numpad-btn dd-clear';
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
  submitBtn.className = 'dd-numpad-btn dd-submit';
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
    .map((_, i) => `<span class="dd-result-star--${i < stars ? 'filled' : 'empty'}"></span>`)
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

  const resultsCard = document.querySelector('.dd-results-card');
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
    html += `<div style="margin-bottom: 8px; padding: 8px; background: color-mix(in srgb, var(--dom-accent) 10%, white); border-radius: 4px; font-size: 13px">
      <strong>${trick}:</strong> ${stats.correct}/${stats.total} (${pct}%)
    </div>`;
  });
  html += '</div>';

  return html;
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  loadProgress();

  // Level select screen
  const levelGrid = document.getElementById('level-grid');
  if (levelGrid) {
    renderLevelGrid();

    levelGrid.addEventListener('click', e => {
      const card = e.target.closest('.dd-level-card');
      if (card) {
        const levelName = card.querySelector('.dd-level-name').textContent;
        const level = LEVELS.find(l => l.name === levelName);
        if (level) {
          startTutorial(level.id);
        }
      }
    });
  }

  // Progress button
  document.getElementById('btn-progress')?.addEventListener('click', showProgressScreen);

  // Tutorial navigation
  document.getElementById('tut-next')?.addEventListener('click', () => {
    const steps = TUTORIAL_STEPS[currentLevelId] || [];
    if (tutStep < steps.length - 1) {
      tutStep++;
      renderTutorialStep();
    } else {
      startPractice();
    }
  });

  document.getElementById('tut-prev')?.addEventListener('click', () => {
    if (tutStep > 0) {
      tutStep--;
      renderTutorialStep();
    }
  });

  document.getElementById('btn-back-from-tutorial')?.addEventListener('click', () => {
    showScreen('landing');
  });

  // Results buttons
  document.getElementById('btn-try-again')?.addEventListener('click', startPractice);
  document
    .getElementById('btn-level-select')
    ?.addEventListener('click', () => showScreen('landing'));

  // Progress buttons
  document
    .getElementById('btn-back-from-progress')
    ?.addEventListener('click', () => showScreen('landing'));

  // Quiz buttons from landing section
  document.getElementById('btn-single-trick-quiz')?.addEventListener('click', () => {
    const trickId = prompt(
      `Choose a trick to master:\n\n${TRICK_PARTS.map((t, i) => `${i + 1}. ${t.name}`).join('\n')}\n\nEnter number (1-5):`
    );
    if (trickId && trickId >= 1 && trickId <= 5) {
      startSingleTrickQuiz(TRICK_PARTS[parseInt(trickId) - 1].id);
    }
  });

  document.getElementById('btn-multi-trick-quiz')?.addEventListener('click', startMultiTrickQuiz);
  document.getElementById('btn-random-quiz-btn')?.addEventListener('click', startRandomQuiz);
  document.getElementById('btn-full-test')?.addEventListener('click', startComprehensiveTest);
});

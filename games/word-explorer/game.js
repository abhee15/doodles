/**
 * Word Explorer - Complete DOM Game Implementation
 * 48 vocabulary words across 6 categories with 4 practice modes
 * Designed for 3rd-4th graders (ages 8-10)
 */

/* eslint-disable no-undef, no-unused-vars */

// ===== SECTION A: CONSTANTS & STATE =====

const STORAGE_KEY = 'word-explorer-progress';
const SPEECH_RATE = 0.8;
const PRACTICE_QUESTION_COUNT = 5;

// Game state
const gameState = {
  currentScreen: 'landing',
  currentCategory: null,
  currentWord: null,
  currentWordIndex: 0,
  currentPracticeMode: null,
  practiceSession: {
    questions: [],
    currentQ: 0,
    correctCount: 0,
    answers: []
  },
  currentMyWordsFilter: 'all'
};

// Maps for quick lookup
let WORD_MAP = {};
let CATEGORY_MAP = {};
let WORDS_BY_CATEGORY = {};

// Progress data
const progress = {
  wordProgress: {},
  favorites: [],
  lastPlayDate: new Date().toDateString(),
  unlockedCategories: []
};

// ===== HELPER: Initialize Data Maps =====
function initializeData() {
  WORD_MAP = Object.fromEntries(WORDS.map(w => [w.id, w]));
  CATEGORY_MAP = Object.fromEntries(WORD_CATEGORIES.map(c => [c.id, c]));
  WORDS_BY_CATEGORY = WORD_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = WORDS.filter(w => w.category === cat.id).sort(
      (a, b) => a.difficulty - b.difficulty
    );
    return acc;
  }, {});
}

// ===== SECTION A: localStorage HELPERS =====

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Initialize with defaults
      progress.wordProgress = {};
      WORDS.forEach(w => {
        progress.wordProgress[w.id] = { stars: 0, attempts: 0, lastPlayed: null };
      });
      progress.unlockedCategories = [WORD_CATEGORIES[0].id, WORD_CATEGORIES[1].id];
      saveProgress();
      return;
    }

    const data = JSON.parse(saved);
    Object.assign(progress, data);

    // Ensure all words have progress entries
    WORDS.forEach(w => {
      if (!progress.wordProgress[w.id]) {
        progress.wordProgress[w.id] = { stars: 0, attempts: 0, lastPlayed: null };
      }
    });
  } catch (err) {
    console.error('Failed to load progress:', err);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress:', err);
  }
}

// ===== HELPER: Calculate Progress Metrics =====

function getTotalStars() {
  return Object.values(progress.wordProgress).reduce((sum, wp) => sum + wp.stars, 0);
}

function getWordsLearned() {
  return Object.values(progress.wordProgress).filter(wp => wp.stars > 0).length;
}

function getCategoryProgress(categoryId) {
  const words = WORDS_BY_CATEGORY[categoryId] || [];
  const learned = words.filter(w => progress.wordProgress[w.id]?.stars > 0).length;
  return { learned, total: words.length };
}

function isCategoryUnlocked(categoryId) {
  if (progress.unlockedCategories.includes(categoryId)) {
    return true;
  }
  const cat = CATEGORY_MAP[categoryId];
  return getTotalStars() >= cat.unlockRequirement;
}

function checkAndUnlockCategories() {
  WORD_CATEGORIES.forEach(cat => {
    if (!progress.unlockedCategories.includes(cat.id) && isCategoryUnlocked(cat.id)) {
      progress.unlockedCategories.push(cat.id);
    }
  });
}

// ===== HELPER: Speech Synthesis =====

function speakWord(wordText) {
  if (!('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(wordText);
  utterance.rate = SPEECH_RATE;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

// ===== HELPER: Quiz Question Generation =====

function generateMeaningCheckQuestions(word) {
  const questions = [];

  // Q1: What does WORD mean? (Multiple choice definition)
  const distractors1 = WORDS.filter(w => w.category === word.category && w.id !== word.id)
    .slice(0, 3)
    .map(w => w.definition);
  questions.push({
    type: 'multiple-choice',
    text: `What does <strong>${word.word}</strong> mean?`,
    options: [word.definition, ...distractors1].sort(() => Math.random() - 0.5),
    correct: word.definition
  });

  // Q2: Which word means DEFINITION?
  const candidates = WORDS.filter(w => w.category === word.category && w.id !== word.id);
  const distractors2 = candidates.slice(0, 3).map(w => w.word);
  questions.push({
    type: 'multiple-choice',
    text: `Which word means: <strong>${word.definition}</strong>`,
    options: [word.word, ...distractors2].sort(() => Math.random() - 0.5),
    correct: word.word
  });

  // Q3: Pick a synonym
  const synOptions = [word.synonyms[0], ...candidates.slice(0, 3).map(w => w.synonyms[0] || w.word)]
    .filter(Boolean)
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);
  questions.push({
    type: 'multiple-choice',
    text: `Pick a synonym for <strong>${word.word}</strong>:`,
    options: synOptions,
    correct: word.synonyms[0]
  });

  // Q4: Pick an antonym
  const antOptions = [word.antonyms[0], ...candidates.slice(0, 3).map(w => w.antonyms[0] || w.word)]
    .filter(Boolean)
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);
  questions.push({
    type: 'multiple-choice',
    text: `Pick an antonym for <strong>${word.word}</strong>:`,
    options: antOptions,
    correct: word.antonyms[0]
  });

  // Q5: Fill the blank
  const example = word.exampleSentences[0];
  const blank = `[${word.word.toUpperCase()}]`;
  const beforeWord = example.substring(0, example.indexOf(word.word));
  const afterWord = example.substring(example.indexOf(word.word) + word.word.length);
  const fillOptions = [word.word, ...candidates.slice(0, 3).map(w => w.word)]
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);

  questions.push({
    type: 'fill-blank',
    text: `Fill in: <strong>${beforeWord}${blank}${afterWord}</strong>`,
    options: fillOptions,
    correct: word.word
  });

  return questions;
}

function generateUsageScenarios(word) {
  const scenarios = word.whenToUse
    .map(u => ({
      scenario: u.split(':')[0],
      correct: true,
      explanation: u
    }))
    .concat(
      word.whenNotToUse.map(u => ({
        scenario: u.split('—')[0],
        correct: false,
        explanation: u
      }))
    )
    .sort(() => Math.random() - 0.5);

  return scenarios.slice(0, PRACTICE_QUESTION_COUNT).map((s, i) => ({
    type: 'yes-no',
    text: `Would you use <strong>${word.word}</strong> here? "${s.scenario}"`,
    options: ['Yes', 'No'],
    correct: s.correct ? 'Yes' : 'No',
    explanation: s.explanation
  }));
}

function generateConnotationSort(word) {
  const allWords = WORDS.slice(0, 8);
  return {
    type: 'sort',
    text: 'Sort these words by feeling:',
    words: allWords,
    correct: {
      positive: allWords.filter(w => w.connotation === 'positive').map(w => w.id),
      negative: allWords.filter(w => w.connotation === 'negative').map(w => w.id),
      neutral: allWords.filter(w => w.connotation === 'neutral').map(w => w.id)
    }
  };
}

// ===== SECTION B: NAVIGATION & SCREEN MANAGEMENT =====

let nav;

function initNavigation() {
  nav = new GameNavigation('word-explorer', {
    screens: ['landing', 'category', 'word-card', 'practice', 'results', 'my-words'],
    initialScreen: 'landing'
  });
}

function goToScreen(screenName) {
  if (!nav) {
    console.error('Navigation not initialized');
    return;
  }

  gameState.currentScreen = screenName;
  nav.goToScreen(screenName);

  // Render the screen
  switch (screenName) {
    case 'landing':
      renderLanding();
      break;
    case 'category':
      renderCategory();
      break;
    case 'word-card':
      renderWordCard();
      break;
    case 'practice':
      renderPractice();
      break;
    case 'results':
      renderResults();
      break;
    case 'my-words':
      renderMyWords();
      break;
    default:
      console.warn(`Unknown screen: ${screenName}`);
  }
}

// ===== SECTION C: LANDING SCREEN =====

function renderLanding() {
  // Verify data is loaded
  if (!WORDS || !WORD_CATEGORIES || WORDS.length === 0) {
    console.error('Word Explorer data not loaded');
    document.getElementById('category-grid').innerHTML =
      '<p style="color: red; padding: 20px;">Error loading data. Please refresh.</p>';
    return;
  }

  const totalStars = getTotalStars();
  const wordsLearned = getWordsLearned();

  document.getElementById('stat-total').textContent = wordsLearned;
  document.getElementById('stat-stars').textContent = totalStars;
  document.getElementById('stat-streak').textContent = '0'; // TODO: implement streak

  // Word of the Day
  const wordOfDay = WORDS[Math.floor(Math.random() * WORDS.length)];
  const wodHtml = `
    <div class="word-of-day" onclick="goToWordCard('${wordOfDay.id}')">
      <div class="word-of-day-label">✨ Word of the Day</div>
      <div class="word-of-day-word">${wordOfDay.word}</div>
      <div class="word-of-day-def">${wordOfDay.definition}</div>
    </div>
  `;
  document.getElementById('word-of-day-container').innerHTML = wodHtml;

  // Category Grid (sort by order without mutating original)
  const categoryGridHtml = [...WORD_CATEGORIES]
    .sort((a, b) => a.order - b.order)
    .map(cat => {
      const prog = getCategoryProgress(cat.id);
      const isUnlocked = isCategoryUnlocked(cat.id);
      const progressPercent = (prog.learned / prog.total) * 100;

      if (!isUnlocked) {
        return `
          <div class="category-card locked" onclick="alert('Earn ${cat.unlockRequirement - getTotalStars()} more stars to unlock')">
            <i class="ti ${cat.icon}" style="font-size: 2.5rem;"></i>
            <div style="flex: 1;">
              <div class="category-card-name">${cat.name}</div>
              <div class="category-card-unlock-hint">🔒 ${cat.unlockRequirement} stars needed</div>
            </div>
          </div>
        `;
      }

      return `
        <div class="category-card" onclick="goToCategory('${cat.id}')">
          <i class="ti ${cat.icon}" style="font-size: 2.5rem;"></i>
          <div style="flex: 1;">
            <div class="category-card-name">${cat.name}</div>
            <div class="category-card-progress">${prog.learned}/${prog.total} words</div>
            <div class="dom-progress">
              <div class="dom-progress-bar" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  document.getElementById('category-grid').innerHTML = categoryGridHtml;

  // My Words button
  document.getElementById('my-words-btn').addEventListener('click', () => goToScreen('my-words'));
}

// ===== SECTION D: CATEGORY SCREEN =====

function goToCategory(categoryId) {
  gameState.currentCategory = categoryId;
  goToScreen('category');
}

function renderCategory() {
  const cat = CATEGORY_MAP[gameState.currentCategory];
  const words = WORDS_BY_CATEGORY[gameState.currentCategory] || [];

  document.getElementById('nav-title').textContent = cat.name;

  const sortSelect = document.getElementById('sort-select');
  sortSelect.value = 'all';
  sortSelect.addEventListener('change', renderCategoryList);

  renderCategoryList();
}

function renderCategoryList() {
  const sortValue = document.getElementById('sort-select').value;
  const words = WORDS_BY_CATEGORY[gameState.currentCategory] || [];

  let filtered = words;
  if (sortValue === 'not-started') {
    filtered = words.filter(w => progress.wordProgress[w.id]?.stars === 0);
  } else if (sortValue === 'in-progress') {
    filtered = words.filter(w => {
      const wp = progress.wordProgress[w.id];
      return wp && wp.stars > 0 && wp.stars < 3;
    });
  } else if (sortValue === 'mastered') {
    filtered = words.filter(w => progress.wordProgress[w.id]?.stars === 3);
  }

  const wordListHtml = filtered
    .map(word => {
      const wp = progress.wordProgress[word.id];
      const stars = wp?.stars || 0;
      const starHtml = Array(3)
        .fill(0)
        .map((_, i) => `<span class="star ${i < stars ? 'filled' : ''}">★</span>`)
        .join('');

      const difficultyDots = Array(3)
        .fill(0)
        .map(
          (_, i) => `<span class="difficulty-dot ${i < word.difficulty ? 'filled' : ''}"></span>`
        )
        .join('');

      return `
        <div class="word-item" onclick="goToWordCard('${word.id}')">
          <div class="word-item-left">
            <div class="word-item-word">${word.word}</div>
            <div class="word-item-phonetic">${word.phonetic}</div>
            <div class="word-item-difficulty">${difficultyDots}</div>
          </div>
          <div class="word-item-right">
            <div class="word-stars">${starHtml}</div>
          </div>
        </div>
      `;
    })
    .join('');

  document.getElementById('word-list').innerHTML = wordListHtml;
}

// ===== SECTION E: WORD CARD SCREEN =====

function goToWordCard(wordId) {
  gameState.currentWord = WORD_MAP[wordId];
  if (!gameState.currentWord) {
    return;
  }

  gameState.currentWordIndex = (WORDS_BY_CATEGORY[gameState.currentWord.category] || []).findIndex(
    w => w.id === wordId
  );

  goToScreen('word-card');
}

function renderWordCard() {
  const word = gameState.currentWord;
  if (!word) {
    return;
  }

  document.getElementById('nav-title').textContent = word.word;

  // Header
  document.getElementById('word-display').textContent = word.word;
  document.getElementById('phonetic-display').textContent = word.phonetic;
  document.getElementById('pos-display').textContent = word.partOfSpeech;

  const conBadge = document.getElementById('connotation-display');
  conBadge.textContent = word.connotation.charAt(0).toUpperCase() + word.connotation.slice(1);
  conBadge.className = `connotation-badge ${word.connotation}`;

  // Hear button
  document.getElementById('hear-btn').addEventListener('click', () => speakWord(word.word));

  // Meaning tab
  document.getElementById('simple-def').textContent = word.definition;
  document.getElementById('full-def').textContent = word.fullDefinition;
  document.getElementById('example-1').textContent = word.exampleSentences[0];
  document.getElementById('example-2').textContent = word.exampleSentences[1];

  // Usage tab
  const whenUseHtml = word.whenToUse
    .map(u => `<li class="usage-item"><div class="usage-item-label">✓ USE:</div>${u}</li>`)
    .join('');
  document.getElementById('when-use-list').innerHTML = whenUseHtml;

  const whenNotHtml = word.whenNotToUse
    .map(
      u =>
        `<li class="usage-item when-not"><div class="usage-item-label">✗ DON'T USE:</div>${u}</li>`
    )
    .join('');
  document.getElementById('when-not-list').innerHTML = whenNotHtml;

  // Remember tab
  document.getElementById('memory-tip').textContent = word.memoryTip;
  document.getElementById('origin').textContent = word.origin;

  const synonymHtml = word.synonyms.map(s => `<span class="chip">${s}</span>`).join('');
  document.getElementById('synonyms-container').innerHTML = synonymHtml;

  const antonymHtml = word.antonyms.map(a => `<span class="chip">${a}</span>`).join('');
  document.getElementById('antonyms-container').innerHTML = antonymHtml;

  // Practice tab
  const practiceModesHtml = `
    <button class="practice-mode-btn" onclick="startPractice('quick-look')">
      <span class="practice-mode-icon">👁️</span>
      Quick Look
    </button>
    <button class="practice-mode-btn" onclick="startPractice('meaning-check')">
      <span class="practice-mode-icon">🧠</span>
      Meaning Check
    </button>
    <button class="practice-mode-btn" onclick="startPractice('use-it-right')">
      <span class="practice-mode-icon">✓</span>
      Use It Right
    </button>
    <button class="practice-mode-btn" onclick="startPractice('connotation-sort')">
      <span class="practice-mode-icon">🎨</span>
      Sort by Feeling
    </button>
  `;
  document.getElementById('practice-modes').innerHTML = practiceModesHtml;

  // Word navigation
  const categoryWords = WORDS_BY_CATEGORY[word.category] || [];
  const isFirstWord = gameState.currentWordIndex === 0;
  const isLastWord = gameState.currentWordIndex === categoryWords.length - 1;

  const prevBtn = document.getElementById('prev-word-btn');
  const nextBtn = document.getElementById('next-word-btn');

  prevBtn.disabled = isFirstWord;
  nextBtn.disabled = isLastWord;

  prevBtn.onclick = () => {
    if (!isFirstWord) {
      goToWordCard(categoryWords[gameState.currentWordIndex - 1].id);
    }
  };

  nextBtn.onclick = () => {
    if (!isLastWord) {
      goToWordCard(categoryWords[gameState.currentWordIndex + 1].id);
    }
  };

  // Tab switching
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      const tabName = e.target.dataset.tab;
      document.getElementById(`tab-${tabName}`).classList.add('active');
    });
  });
}

// ===== SECTION F: PRACTICE SCREEN =====

function startPractice(mode) {
  gameState.currentPracticeMode = mode;
  const word = gameState.currentWord;

  gameState.practiceSession = {
    questions: [],
    currentQ: 0,
    correctCount: 0,
    answers: []
  };

  if (mode === 'quick-look') {
    // No quiz, just award 1 star if first time
    if (progress.wordProgress[word.id].stars === 0) {
      progress.wordProgress[word.id].stars = 1;
      progress.wordProgress[word.id].attempts = 1;
      progress.wordProgress[word.id].lastPlayed = new Date().toDateString();
      saveProgress();
      checkAndUnlockCategories();
    }
    alert(`✓ You've explored "${word.word}"! Earn stars with practice modes.`);
    goToScreen('word-card');
    return;
  }

  if (mode === 'meaning-check') {
    gameState.practiceSession.questions = generateMeaningCheckQuestions(word);
  } else if (mode === 'use-it-right') {
    gameState.practiceSession.questions = generateUsageScenarios(word);
  } else if (mode === 'connotation-sort') {
    gameState.practiceSession.questions = [generateConnotationSort(word)];
  }

  goToScreen('practice');
}

function renderPractice() {
  const session = gameState.practiceSession;
  const word = gameState.currentWord;
  const question = session.questions[session.currentQ];

  document.getElementById('nav-title').textContent = `Practice: ${word.word}`;

  // Mode title
  const modeNames = {
    'meaning-check': 'Meaning Check',
    'use-it-right': 'Use It Right',
    'connotation-sort': 'Sort by Feeling'
  };
  document.getElementById('practice-mode-title').textContent =
    modeNames[gameState.currentPracticeMode] || 'Practice';

  // Progress dots
  const progressHtml = session.questions
    .map((_, i) => {
      let cls = '';
      if (i < session.currentQ) {
        cls = 'completed';
      } else if (i === session.currentQ) {
        cls = 'current';
      }
      return `<div class="progress-dot ${cls}"></div>`;
    })
    .join('');
  document.getElementById('practice-progress').innerHTML = progressHtml;

  document.getElementById('practice-score').textContent =
    `${session.correctCount}/${session.currentQ} correct`;

  // Question rendering
  const container = document.getElementById('question-container');

  if (
    gameState.currentPracticeMode === 'meaning-check' ||
    gameState.currentPracticeMode === 'use-it-right'
  ) {
    renderMultipleChoiceQuestion(question, container);
  } else if (gameState.currentPracticeMode === 'connotation-sort') {
    renderConnotationSort(question, container);
  }
}

function renderMultipleChoiceQuestion(question, container) {
  const optionsHtml = question.options
    .map(
      opt =>
        `<button class="option-btn" onclick="answerQuestion('${opt}')"><span>${opt}</span></button>`
    )
    .join('');

  container.innerHTML = `
    <div class="question-area">
      <div class="question-text">${question.text}</div>
      <div class="options-grid">${optionsHtml}</div>
      <div class="feedback" id="feedback"></div>
    </div>
  `;
}

function renderConnotationSort(question, container) {
  const wordChips = question.words
    .map(w => `<button class="word-chip" onclick="selectWordForSort('${w.id}')">${w.word}</button>`)
    .join('');

  container.innerHTML = `
    <div class="question-area">
      <div class="question-text">${question.text}</div>
      <div style="margin-bottom: 16px;">
        <strong>Words to Sort:</strong>
        <div class="word-chips" style="gap: 6px; padding: 0;">${wordChips}</div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border: 2px solid #2e7d32; padding: 12px; border-radius: 6px; text-align: center;">
          <strong style="color: #2e7d32;">😊 Positive</strong>
          <div id="positive-bucket" style="min-height: 60px; margin-top: 8px;"></div>
        </div>
        <div style="border: 2px solid #5c6bc0; padding: 12px; border-radius: 6px; text-align: center;">
          <strong style="color: #5c6bc0;">😐 Neutral</strong>
          <div id="neutral-bucket" style="min-height: 60px; margin-top: 8px;"></div>
        </div>
        <div style="border: 2px solid #c62828; padding: 12px; border-radius: 6px; text-align: center;">
          <strong style="color: #c62828;">😞 Negative</strong>
          <div id="negative-bucket" style="min-height: 60px; margin-top: 8px;"></div>
        </div>
      </div>
      <div class="feedback" id="feedback"></div>
    </div>
  `;
}

function answerQuestion(answer) {
  const session = gameState.practiceSession;
  const question = session.questions[session.currentQ];
  const isCorrect = answer === question.correct;

  session.answers.push({ answer, isCorrect, explanation: question.explanation });
  if (isCorrect) {
    session.correctCount++;
  }

  // Show feedback
  const feedback = document.getElementById('feedback');
  feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');
  const explanationText =
    question.explanation ||
    (isCorrect ? 'Great job!' : `The correct answer is: ${question.correct}`);
  feedback.innerHTML = `<strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong><br>${explanationText}`;

  // Disable options
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent.includes(question.correct)) {
      btn.classList.add('correct');
    } else if (btn.textContent.includes(answer) && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // Show next button
  setTimeout(() => {
    if (session.currentQ < session.questions.length - 1) {
      document.getElementById('next-question-btn').style.display = 'block';
      document.getElementById('next-question-btn').onclick = () => {
        session.currentQ++;
        renderPractice();
      };
    } else {
      document.getElementById('next-question-btn').textContent = 'See Results';
      document.getElementById('next-question-btn').onclick = finishPractice;
    }
  }, 500);
}

function selectWordForSort(wordId) {
  // Placeholder - full implementation would handle bucket placement
  alert('Word sorting feature in development');
}

function finishPractice() {
  const session = gameState.practiceSession;
  const word = gameState.currentWord;
  const percentage = Math.round((session.correctCount / session.questions.length) * 100);
  let stars = 0;

  if (percentage === 100) {
    stars = 3;
  } else if (percentage >= 80) {
    stars = 2;
  } else if (percentage >= 60) {
    stars = 1;
  }

  // Update progress
  if (stars > progress.wordProgress[word.id].stars) {
    progress.wordProgress[word.id].stars = stars;
  }
  progress.wordProgress[word.id].attempts = (progress.wordProgress[word.id].attempts || 0) + 1;
  progress.wordProgress[word.id].lastPlayed = new Date().toDateString();
  saveProgress();
  checkAndUnlockCategories();

  // Store results for results screen
  gameState.practiceResults = {
    stars,
    percentage,
    correct: session.correctCount,
    total: session.questions.length
  };

  goToScreen('results');
}

// ===== SECTION G: RESULTS SCREEN =====

function renderResults() {
  const results = gameState.practiceResults;
  const word = gameState.currentWord;

  document.getElementById('nav-title').textContent = 'Results';

  // Stars
  const starHtml = Array(3)
    .fill(0)
    .map(
      (_, i) =>
        `<span style="color: ${i < results.stars ? '#f5c518' : '#d8c8f0'}; font-size: 2.5rem;">★</span>`
    )
    .join('');
  document.getElementById('results-stars').innerHTML = starHtml;

  // Message based on score
  const messages = {
    100: `Perfect! You've truly mastered "${word.word}"!`,
    80: `Excellent work! You know "${word.word}" very well!`,
    60: `Good effort! Keep practicing "${word.word}".`,
    0: "Don't worry! Try again and you'll get it!"
  };

  let message = messages[0];
  if (results.percentage === 100) {
    message = messages[100];
  } else if (results.percentage >= 80) {
    message = messages[80];
  } else if (results.percentage >= 60) {
    message = messages[60];
  }

  document.getElementById('results-message').textContent = message;
  document.getElementById('results-percentage').textContent =
    `${results.correct}/${results.total} correct (${results.percentage}%)`;

  // Buttons
  document.getElementById('review-btn').onclick = () => goToScreen('word-card');
  document.getElementById('try-again-btn').onclick = () =>
    startPractice(gameState.currentPracticeMode);

  const categoryWords = WORDS_BY_CATEGORY[word.category] || [];
  const isLastWord = gameState.currentWordIndex === categoryWords.length - 1;

  document.getElementById('next-word-results-btn').disabled = isLastWord;
  document.getElementById('next-word-results-btn').onclick = () => {
    if (!isLastWord) {
      goToWordCard(categoryWords[gameState.currentWordIndex + 1].id);
      renderWordCard();
    }
  };

  document.getElementById('back-category-btn').onclick = () => goToScreen('category');
}

// ===== SECTION H: MY WORDS SCREEN =====

function renderMyWords() {
  document.getElementById('nav-title').textContent = 'My Words';

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.onclick = e => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      gameState.currentMyWordsFilter = e.target.dataset.filter;
      renderMyWordsList();
    };
    if (btn.dataset.filter === gameState.currentMyWordsFilter) {
      btn.classList.add('active');
    }
  });

  renderMyWordsList();
}

function renderMyWordsList() {
  let words = WORDS;

  const filter = gameState.currentMyWordsFilter;
  if (filter === 'favorites') {
    words = words.filter(w => progress.favorites.includes(w.id));
  } else if (filter === 'mastered') {
    words = words.filter(w => progress.wordProgress[w.id]?.stars === 3);
  } else if (filter === 'in-progress') {
    words = words.filter(w => {
      const wp = progress.wordProgress[w.id];
      return wp && wp.stars > 0 && wp.stars < 3;
    });
  }

  const chipsHtml = words
    .map(
      w =>
        `<div class="word-chip" onclick="goToWordCard('${w.id}')" style="cursor: pointer;">
        ${w.word}
        ${progress.favorites.includes(w.id) ? '❤️' : ''}
      </div>`
    )
    .join('');

  document.getElementById('word-chips').innerHTML =
    chipsHtml ||
    '<p style="padding: 16px; color: var(--dom-text-muted); text-align: center;">No words yet</p>';
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Word Explorer: Initializing...');

    if (typeof WORDS === 'undefined' || typeof WORD_CATEGORIES === 'undefined') {
      console.error('Data not loaded. Ensure words-data.js is loaded before game.js');
      return;
    }

    initializeData();
    console.log(`✓ Data initialized: ${WORD_CATEGORIES.length} categories, ${WORDS.length} words`);

    loadProgress();
    console.log('✓ Progress loaded');

    initNavigation();
    console.log('✓ Navigation initialized');

    goToScreen('landing');
    console.log('✓ Landing screen loaded');
  } catch (error) {
    console.error('Word Explorer initialization error:', error);
  }
});

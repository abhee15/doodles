/**
 * Math Olympiad Prep Game
 *
 * Screens: landing → concept → example → practice → results
 * Topics: Number Theory, Fractions, Geometry, Patterns, Counting & Logic
 */

// TOPICS is defined in topics-data.js
/* global TOPICS */

// Game state
const state = {
  topicIndex: null,
  exampleStep: 0,
  problemIndex: 0,
  answers: [],
  score: 0,
  hintUsed: false,
  currentAnswered: false,
  progress: {} // loaded from localStorage
};

// Initialize GameNavigation
const gameNav = new GameNavigation('math-olympiad', {
  screens: ['landing', 'concept', 'example', 'practice', 'results'],
  initialScreen: 'landing',
  gameName: 'Math Olympiad',
  titles: {
    landing: 'Math Olympiad',
    concept: 'Concept',
    example: 'Worked Example',
    practice: 'Practice',
    results: 'Results'
  }
});

// Load progress from localStorage
function loadProgress() {
  const saved = localStorage.getItem('math-olympiad-progress');
  state.progress = saved ? JSON.parse(saved) : {};

  // Ensure all topics have an entry
  TOPICS.forEach(topic => {
    if (!state.progress[topic.id]) {
      state.progress[topic.id] = { completed: false };
    }
  });
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem('math-olympiad-progress', JSON.stringify(state.progress));
}

// Render landing screen
function renderLanding() {
  const grid = document.getElementById('topics-grid');
  grid.innerHTML = '';

  TOPICS.forEach((topic, idx) => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.setAttribute('data-topic-idx', idx);

    const isCompleted = state.progress[topic.id]?.completed;
    const bestScore = state.progress[topic.id]?.bestScore;

    let statusHTML = '<div class="topic-status">';
    if (isCompleted && bestScore === 5) {
      statusHTML += '<span class="topic-checkmark">✓</span>';
    } else if (isCompleted) {
      statusHTML += '<span class="topic-checkmark">✓</span>';
    }
    statusHTML += '</div>';

    card.innerHTML = `
      <span class="topic-emoji">${topic.emoji}</span>
      <div class="topic-name">${topic.name}</div>
      <div class="topic-tagline">${topic.tagline}</div>
      ${statusHTML}
    `;

    card.addEventListener('click', () => selectTopic(idx));
    grid.appendChild(card);
  });
}

// Select a topic and go to concept screen
function selectTopic(idx) {
  state.topicIndex = idx;
  state.exampleStep = 0;
  state.problemIndex = 0;
  state.answers = [];
  state.score = 0;
  state.hintUsed = false;
  state.currentAnswered = false;

  renderConceptScreen();
  gameNav.goToScreen('concept');
}

// Render concept screen
function renderConceptScreen() {
  const topic = TOPICS[state.topicIndex];

  document.getElementById('concept-emoji').textContent = topic.emoji;
  document.getElementById('concept-title').textContent = topic.concept.title;
  document.getElementById('concept-visual').textContent = topic.concept.visual;

  const pointsContainer = document.getElementById('concept-points');
  pointsContainer.innerHTML = '';
  topic.concept.points.forEach(point => {
    const pointDiv = document.createElement('div');
    pointDiv.className = 'concept-point';
    pointDiv.innerHTML = `
      <div class="point-check">✓</div>
      <div class="point-text">${point}</div>
    `;
    pointsContainer.appendChild(pointDiv);
  });

  const vocabContainer = document.getElementById('vocab-badges');
  vocabContainer.innerHTML = '';
  topic.concept.vocabulary.forEach(term => {
    const badge = document.createElement('div');
    badge.className = 'vocab-badge';
    badge.textContent = term;
    vocabContainer.appendChild(badge);
  });

  // Set up button
  const btnShowExample = document.getElementById('btn-show-example');
  btnShowExample.onclick = () => renderExampleScreen();
}

// Render example screen
function renderExampleScreen() {
  const topic = TOPICS[state.topicIndex];

  document.getElementById('example-problem').textContent = topic.example.question;
  document.getElementById('think-prompt').style.display = 'block';

  const stepsContainer = document.getElementById('steps-container');
  stepsContainer.innerHTML = '';

  // Render each step
  topic.example.steps.forEach(step => {
    const stepCard = document.createElement('div');
    stepCard.className = 'step-card';
    stepCard.innerHTML = `
      <div class="step-label">${step.label}</div>
      <div class="step-text">${step.text}</div>
    `;
    stepsContainer.appendChild(stepCard);
  });

  // Add strategy badge after all steps
  const strategyDiv = document.createElement('div');
  strategyDiv.className = 'strategy-badge';
  strategyDiv.textContent = `Strategy: ${topic.example.strategy}`;
  document.getElementById('strategy-badge').innerHTML = strategyDiv.innerHTML;

  // Set up practice button
  const btnStartPractice = document.getElementById('btn-start-practice');
  btnStartPractice.disabled = false;
  btnStartPractice.onclick = () => renderPracticeScreen();

  gameNav.goToScreen('example');
}

// Render practice screen
function renderPracticeScreen() {
  const topic = TOPICS[state.topicIndex];
  const problem = topic.problems[state.problemIndex];

  // Update progress dots
  const dotsContainer = document.getElementById('progress-dots');
  dotsContainer.innerHTML = '';
  topic.problems.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (idx === state.problemIndex) {
      dot.classList.add('active');
    }
    if (idx < state.problemIndex) {
      dot.classList.add('completed');
    }
    dotsContainer.appendChild(dot);
  });

  // Problem number and difficulty
  document.getElementById('problem-number').textContent = `Problem ${state.problemIndex + 1} of 5`;

  const difficulties = ['Easy', 'Easy', 'Easy', 'Medium', 'Challenge'];
  const diffClass = difficulties[state.problemIndex].toLowerCase();
  const diffBadge = document.getElementById('difficulty-badge');
  diffBadge.textContent = difficulties[state.problemIndex];
  diffBadge.className = `difficulty-badge ${diffClass}`;

  // Question
  document.getElementById('practice-question').textContent = problem.question;

  // Options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  state.hintUsed = false;
  state.currentAnswered = false;

  problem.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => handleAnswer(idx);
    optionsContainer.appendChild(btn);
  });

  // Hint button
  const hintBtn = document.getElementById('hint-btn');
  hintBtn.style.display = 'block';
  hintBtn.onclick = () => showHint();

  // Clear hint text and feedback
  document.getElementById('hint-text').style.display = 'none';
  document.getElementById('feedback-area').innerHTML = '';

  gameNav.goToScreen('practice');
}

// Show hint
function showHint() {
  if (state.currentAnswered) {
    return;
  }

  const topic = TOPICS[state.topicIndex];
  const problem = topic.problems[state.problemIndex];

  document.getElementById('hint-text').textContent = problem.hint;
  document.getElementById('hint-text').style.display = 'block';

  document.getElementById('hint-btn').style.display = 'none';
}

// Handle answer selection
function handleAnswer(chosenIdx) {
  if (state.currentAnswered) {
    return;
  }

  state.currentAnswered = true;

  const topic = TOPICS[state.topicIndex];
  const problem = topic.problems[state.problemIndex];
  const isCorrect = chosenIdx === problem.correct;

  // Mark options visually
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === chosenIdx) {
      btn.classList.add(isCorrect ? 'correct' : 'wrong');
    } else if (idx === problem.correct && !isCorrect) {
      btn.classList.add('correct');
    }
  });

  // Show feedback
  const feedbackArea = document.getElementById('feedback-area');
  const feedbackMsg = document.createElement('div');
  feedbackMsg.className = `feedback-message ${isCorrect ? 'correct' : 'wrong'}`;
  feedbackMsg.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
  feedbackArea.appendChild(feedbackMsg);

  // Show explanation
  const explanationDiv = document.createElement('div');
  explanationDiv.className = 'explanation';
  explanationDiv.innerHTML = `<strong>Answer:</strong> ${problem.options[problem.correct]}<br><br>${problem.explanation}`;
  feedbackArea.appendChild(explanationDiv);

  // Record answer
  state.answers.push({ chosen: chosenIdx, correct: problem.correct, isCorrect });
  if (isCorrect) {
    state.score++;
  }

  // Show next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-btn';
  nextBtn.textContent = state.problemIndex < 4 ? 'Next →' : 'See Results →';
  nextBtn.onclick = () => nextProblem();
  feedbackArea.appendChild(nextBtn);

  // Hide hint button
  document.getElementById('hint-btn').style.display = 'none';
}

// Next problem or go to results
function nextProblem() {
  if (state.problemIndex < 4) {
    state.problemIndex++;
    renderPracticeScreen();
  } else {
    renderResultsScreen();
  }
}

// Render results screen
function renderResultsScreen() {
  const topic = TOPICS[state.topicIndex];

  // Calculate stars
  let stars = 1;
  let message = "Keep practicing — you'll get it!";
  if (state.score >= 5) {
    stars = 3;
    message = 'Math Champion! 🏆';
  } else if (state.score >= 4) {
    stars = 3;
    message = 'Excellent work! ⭐';
  } else if (state.score >= 3) {
    stars = 2;
    message = 'Good job! Keep it up!';
  }

  const starsDisplay = '⭐'.repeat(stars);
  document.getElementById('stars-display').textContent = starsDisplay;
  document.getElementById('result-message').textContent = message;
  document.getElementById('score-display').textContent = `${state.score} out of 5`;

  // Save progress
  if (!state.progress[topic.id]) {
    state.progress[topic.id] = {};
  }
  state.progress[topic.id].completed = true;
  if (!state.progress[topic.id].bestScore || state.score > state.progress[topic.id].bestScore) {
    state.progress[topic.id].bestScore = state.score;
  }
  state.progress[topic.id].lastPlayed = Date.now();
  saveProgress();

  // Review section
  const reviewSection = document.getElementById('review-section');
  reviewSection.innerHTML = '';

  const wrongAnswers = state.answers.filter(a => !a.isCorrect);

  if (wrongAnswers.length > 0) {
    const reviewLabel = document.createElement('div');
    reviewLabel.className = 'review-label';
    reviewLabel.textContent = "Let's Review Your Answers";
    reviewSection.appendChild(reviewLabel);

    wrongAnswers.forEach(answer => {
      const origIdx = state.answers.indexOf(answer);
      const problem = topic.problems[origIdx];

      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      reviewItem.innerHTML = `
        <div class="review-question">Problem ${origIdx + 1}: ${problem.question}</div>
        <div class="review-answer">Your answer: ${problem.options[answer.chosen]} ✗</div>
        <div class="review-explanation"><strong>Correct answer:</strong> ${problem.options[answer.correct]}<br><br>${problem.explanation}</div>
      `;
      reviewSection.appendChild(reviewItem);
    });
  }

  // Set up buttons
  document.getElementById('btn-try-again').onclick = () => {
    state.problemIndex = 0;
    state.answers = [];
    state.score = 0;
    state.hintUsed = false;
    state.currentAnswered = false;
    renderPracticeScreen();
  };

  document.getElementById('btn-back-to-topics').onclick = () => {
    state.topicIndex = null;
    renderLanding();
    gameNav.resetToLanding();
  };

  gameNav.goToScreen('results');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  renderLanding();
});

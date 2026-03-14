/* eslint-disable no-undef */

class EmotionExplorerGame {
  constructor() {
    this.currentEmotion = null;
    this.currentQuizIndex = 0;
    this.quizzes = getQuizzes();
    this.initializeUI();
    this.renderEmotions();
  }

  initializeUI() {
    this.homeScreen = document.getElementById('home-screen');
    this.detailScreen = document.getElementById('detail-screen');
    this.quizScreen = document.getElementById('quiz-screen');

    this.emotionsGrid = document.getElementById('emotions-grid');
    this.backToHomeBtn = document.getElementById('back-to-home');
    this.takeQuizBtn = document.getElementById('take-quiz-btn');
    this.backToDetailBtn = document.getElementById('back-to-detail');
    this.restartQuizBtn = document.getElementById('restart-quiz-btn');
    this.intensitySlider = document.getElementById('intensity-slider');
    this.intensityValue = document.getElementById('intensity-value');

    this.backToHomeBtn.addEventListener('click', () => this.switchScreen('home'));
    this.takeQuizBtn.addEventListener('click', () => this.startQuiz());
    this.backToDetailBtn.addEventListener('click', () => this.switchScreen('detail'));
    this.restartQuizBtn.addEventListener('click', () => this.startQuiz());

    this.intensitySlider.addEventListener('input', e => {
      const value = e.target.value;
      this.intensityValue.textContent = `${value} / 10`;
    });
  }

  switchScreen(screenName) {
    this.homeScreen.classList.remove('active');
    this.detailScreen.classList.remove('active');
    this.quizScreen.classList.remove('active');

    if (screenName === 'home') {
      this.homeScreen.classList.add('active');
    } else if (screenName === 'detail') {
      this.detailScreen.classList.add('active');
    } else if (screenName === 'quiz') {
      this.quizScreen.classList.add('active');
    }
  }

  renderEmotions() {
    const emotions = getAllEmotions();
    this.emotionsGrid.innerHTML = '';

    emotions.forEach(emotion => {
      const card = document.createElement('div');
      card.className = 'emotion-card';
      card.innerHTML = `
        <div class="emotion-emoji">${emotion.emoji}</div>
        <div class="emotion-name">${emotion.name}</div>
      `;
      card.addEventListener('click', () => this.showEmotionDetail(emotion.id));
      this.emotionsGrid.appendChild(card);
    });
  }

  showEmotionDetail(emotionId) {
    this.currentEmotion = getEmotion(emotionId);
    const emotion = this.currentEmotion;

    document.getElementById('detail-emoji').textContent = emotion.emoji;
    document.getElementById('detail-emotion-name').textContent = emotion.name;

    // Render triggers
    const triggersList = document.getElementById('triggers-list');
    triggersList.innerHTML = '';
    emotion.triggers.forEach(trigger => {
      const item = document.createElement('div');
      item.className = 'detail-item';
      item.textContent = trigger;
      triggersList.appendChild(item);
    });

    // Render signals
    const signalsList = document.getElementById('signals-list');
    signalsList.innerHTML = '';
    emotion.signals.forEach(signal => {
      const item = document.createElement('div');
      item.className = 'detail-item';
      item.textContent = signal;
      signalsList.appendChild(item);
    });

    // Render strategies
    const strategiesList = document.getElementById('strategies-list');
    strategiesList.innerHTML = '';
    emotion.strategies.forEach(strategy => {
      const item = document.createElement('div');
      item.className = 'detail-item';
      item.textContent = strategy;
      strategiesList.appendChild(item);
    });

    // Reset intensity slider
    this.intensitySlider.value = 5;
    this.intensityValue.textContent = '5 / 10';

    // Show breathing section if applicable
    const breathingContainer = document.getElementById('breathing-container');
    breathingContainer.innerHTML = '';

    if (emotion.hasBreathing) {
      breathingContainer.innerHTML = `
        <div class="breathing-section">
          <h3 style="margin: 0 0 10px 0; color: #1f2937;">Try Breathing Exercises</h3>
          <p style="margin: 0; color: #6b7280; font-size: 13px;">Watch the circle and breathe in when it grows, out when it shrinks.</p>
          <div class="breathing-circle"></div>
          <div class="breathing-text">
            Breathing in... and out...
          </div>
        </div>
      `;
    }

    this.switchScreen('detail');
  }

  startQuiz() {
    this.currentQuizIndex = 0;
    this.renderQuizQuestion();
    this.switchScreen('quiz');
  }

  renderQuizQuestion() {
    if (this.currentQuizIndex >= this.quizzes.length) {
      this.quizFinished();
      return;
    }

    const quiz = this.quizzes[this.currentQuizIndex];
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
      <div class="quiz-scenario">
        <h3>Scenario ${this.currentQuizIndex + 1} of ${this.quizzes.length}</h3>
        <p>${quiz.scenario}</p>
        <div class="quiz-options" id="options-container"></div>
      </div>
    `;

    const optionsContainer = document.getElementById('options-container');
    quiz.options.forEach((option, index) => {
      const optionBtn = document.createElement('button');
      optionBtn.className = 'quiz-option';
      optionBtn.textContent = option;
      optionBtn.addEventListener('click', () => this.selectAnswer(index));
      optionsContainer.appendChild(optionBtn);
    });
  }

  selectAnswer(selectedIndex) {
    const quiz = this.quizzes[this.currentQuizIndex];
    const optionsContainer = document.getElementById('options-container');
    const options = optionsContainer.querySelectorAll('.quiz-option');

    options[selectedIndex].classList.add('selected');

    let feedback = `<div class="explanation">${quiz.explanation}</div>`;

    if (selectedIndex === quiz.correctAnswer) {
      feedback = `<div class="explanation" style="background: #d1fae5; border-left-color: #10b981; color: #065f46;">✓ Correct! ${quiz.explanation}</div>`;
    } else {
      feedback = `<div class="explanation" style="background: #fee2e2; border-left-color: #ef4444; color: #7f1d1d;">✗ Not quite. ${quiz.explanation}</div>`;
    }

    optionsContainer.insertAdjacentHTML('afterend', feedback);

    options.forEach((btn, idx) => {
      btn.style.pointerEvents = 'none';
      if (idx === quiz.correctAnswer) {
        btn.style.borderColor = '#10b981';
        btn.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
      }
    });

    setTimeout(() => {
      this.currentQuizIndex++;
      this.renderQuizQuestion();
    }, 2000);
  }

  quizFinished() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
      <div style="text-align: center; padding: 30px; background: white; border-radius: 8px;">
        <h2 style="color: #1f2937; margin: 0 0 10px 0;">Quiz Complete! 🎉</h2>
        <p style="color: #6b7280; margin: 0;">You've learned about emotions!</p>
      </div>
    `;
  }
}

const game = new EmotionExplorerGame();

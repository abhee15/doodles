/**
 * Amazing Facts Game
 * Educational game with fact cards and quizzes
 */

class AmazingFactsGame {
  constructor() {
    this.currentScreen = 'home';
    this.currentTopic = null;
    this.currentFactIndex = 0;
    this.quizQuestions = [];
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;
    this.setupEventListeners();
    this.showScreen('home');
  }

  setupEventListeners() {
    // Back button (home)
    const gameBackBtn = document.getElementById('game-back-btn');
    if (gameBackBtn) {
      gameBackBtn.addEventListener('click', () => this.goHome());
    }

    // Home buttons - topic selection
    document.querySelectorAll('[data-topic]').forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.getAttribute('data-topic');
        this.selectTopic(topicId);
      });
    });

    // Fact detail navigation
    document
      .getElementById('btn-fact-back')
      ?.addEventListener('click', () => this.showTopicScreen());
    document.getElementById('btn-fact-prev')?.addEventListener('click', () => this.prevFact());
    document.getElementById('btn-fact-next')?.addEventListener('click', () => this.nextFact());
    document.getElementById('btn-quiz-start')?.addEventListener('click', () => this.startQuiz());

    // Quiz navigation
    document.getElementById('quiz-opt-a')?.addEventListener('click', () => this.selectAnswer(0));
    document.getElementById('quiz-opt-b')?.addEventListener('click', () => this.selectAnswer(1));
    document.getElementById('quiz-opt-c')?.addEventListener('click', () => this.selectAnswer(2));
    document.getElementById('quiz-opt-d')?.addEventListener('click', () => this.selectAnswer(3));

    // Results screen
    document.getElementById('btn-quiz-again')?.addEventListener('click', () => this.startQuiz());
    document.getElementById('btn-home')?.addEventListener('click', () => this.goHome());
  }

  showScreen(screen) {
    document.querySelectorAll('[data-screen]').forEach(el => {
      el.classList.remove('active');
    });
    const target = document.querySelector(`[data-screen="${screen}"]`);
    if (target) {
      target.classList.add('active');
    }
    this.currentScreen = screen;
  }

  goHome() {
    this.currentTopic = null;
    this.currentFactIndex = 0;
    this.showScreen('home');
  }

  selectTopic(topicId) {
    // eslint-disable-next-line no-undef
    this.currentTopic = TOPICS.find(t => t.id === topicId);
    if (!this.currentTopic) {
      return;
    }
    this.currentFactIndex = 0;
    this.showTopicScreen();
  }

  showTopicScreen() {
    this.showScreen('topic');
    const topicTitle = document.getElementById('topic-title');
    const factCards = document.getElementById('fact-cards');

    topicTitle.textContent = `${this.currentTopic.emoji} ${this.currentTopic.name}`;

    factCards.innerHTML = '';
    this.currentTopic.facts.forEach((fact, idx) => {
      const card = document.createElement('div');
      card.className = 'fact-card';
      card.innerHTML = `
        <div class="fact-emoji">📌</div>
        <div class="fact-info">
          <h3>${fact.name}</h3>
          <p>${fact.subtitle}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        this.currentFactIndex = idx;
        this.showFactDetail();
      });
      factCards.appendChild(card);
    });
  }

  showFactDetail() {
    this.showScreen('detail');
    const fact = this.currentTopic.facts[this.currentFactIndex];

    document.getElementById('detail-title').textContent = fact.name;
    document.getElementById('detail-subtitle').textContent = fact.subtitle;
    document.getElementById('detail-location').textContent = fact.location;
    document.getElementById('detail-photo').src = fact.photo;
    document.getElementById('detail-photo').onerror = () => {
      document.getElementById('detail-photo').src =
        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22 fill=%22%23999%22%3EImage not available%3C/text%3E%3C/svg%3E';
    };

    // Key facts
    const keyFactsHtml = fact.keyFacts
      .map(
        f => `
      <div class="key-fact">
        <span class="kf-icon">${f.icon}</span>
        <span class="kf-label">${f.label}:</span>
        <span class="kf-value">${f.value}</span>
      </div>
    `
      )
      .join('');
    document.getElementById('detail-key-facts').innerHTML = keyFactsHtml;

    // Story
    document.getElementById('detail-story').textContent = fact.story;

    // Memory tip
    document.getElementById('detail-tip').textContent = fact.memoryTip;

    // Update prev/next buttons
    const prevBtn = document.getElementById('btn-fact-prev');
    const nextBtn = document.getElementById('btn-fact-next');
    prevBtn.disabled = this.currentFactIndex === 0;
    nextBtn.disabled = this.currentFactIndex === this.currentTopic.facts.length - 1;
  }

  prevFact() {
    if (this.currentFactIndex > 0) {
      this.currentFactIndex--;
      this.showFactDetail();
    }
  }

  nextFact() {
    if (this.currentFactIndex < this.currentTopic.facts.length - 1) {
      this.currentFactIndex++;
      this.showFactDetail();
    }
  }

  startQuiz() {
    // Gather all quiz questions from current topic
    this.quizQuestions = [];
    this.currentTopic.facts.forEach(fact => {
      fact.quiz.forEach(q => {
        this.quizQuestions.push({
          fact: fact.name,
          ...q
        });
      });
    });

    // Shuffle questions
    this.quizQuestions.sort(() => Math.random() - 0.5);

    // Limit to 10 questions max
    this.quizQuestions = this.quizQuestions.slice(0, 10);

    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;

    this.showQuizQuestion();
  }

  showQuizQuestion() {
    this.showScreen('quiz');
    const q = this.quizQuestions[this.quizIndex];

    document.getElementById('quiz-progress').textContent =
      `Question ${this.quizIndex + 1} of ${this.quizQuestions.length}`;
    document.getElementById('quiz-question').textContent = q.q;

    const optionsIds = ['quiz-opt-a', 'quiz-opt-b', 'quiz-opt-c', 'quiz-opt-d'];
    optionsIds.forEach((id, idx) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.textContent = q.options[idx];
        btn.className = 'quiz-option';
        btn.disabled = false;
      }
    });

    this.quizAnswered = false;
    document.getElementById('quiz-feedback').innerHTML = '';
  }

  selectAnswer(optIdx) {
    if (this.quizAnswered) {
      return;
    }
    this.quizAnswered = true;

    const q = this.quizQuestions[this.quizIndex];
    const isCorrect = optIdx === q.answer;

    if (isCorrect) {
      this.quizScore++;
    }

    const optionsIds = ['quiz-opt-a', 'quiz-opt-b', 'quiz-opt-c', 'quiz-opt-d'];
    optionsIds.forEach((id, idx) => {
      const btn = document.getElementById(id);
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.add('correct');
      } else if (idx === optIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // Show feedback
    const feedbackEl = document.getElementById('quiz-feedback');
    feedbackEl.innerHTML = `
      <div class="quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}">
        <div class="feedback-title">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</div>
        <div class="feedback-text">${q.explanation}</div>
      </div>
    `;

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      this.advanceQuiz();
    }, 1500);
  }

  advanceQuiz() {
    if (this.quizIndex < this.quizQuestions.length - 1) {
      this.quizIndex++;
      this.showQuizQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    this.showScreen('results');
    const total = this.quizQuestions.length;
    const percent = Math.round((this.quizScore / total) * 100);

    document.getElementById('results-score').textContent = this.quizScore;
    document.getElementById('results-total').textContent = total;
    document.getElementById('results-percent').textContent = `${percent}%`;

    // Star rating
    let stars = '⭐';
    if (percent >= 80) {
      stars = '⭐⭐⭐';
    } else if (percent >= 60) {
      stars = '⭐⭐';
    } else if (percent > 0) {
      stars = '⭐';
    }

    let message = "Amazing! You're a fact expert!";
    if (percent < 50) {
      message = "Keep learning! You'll get it next time!";
    } else if (percent < 70) {
      message = 'Good job! Want to learn more?';
    } else if (percent < 90) {
      message = 'Excellent! You know your facts!';
    }

    document.getElementById('results-stars').textContent = stars;
    document.getElementById('results-message').textContent = message;
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new AmazingFactsGame();
});

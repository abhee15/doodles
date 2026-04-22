'use strict';

const TOTAL_QUESTIONS = 10;
const TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MIXED = 'mixed';

// Emojis to visualise small multiplication visually
const TABLE_EMOJI = {
  2: '🐣',
  3: '🌟',
  4: '🍎',
  5: '⭐',
  6: '🎯',
  7: '🌈',
  8: '🚀',
  9: '🔮',
  10: '💎',
  11: '🦋',
  12: '👑'
};

// Fun hints for select tables
const HINTS = {
  5: n => `The ${n}× table always ends in 0 or 5!`,
  10: n => `The ${n}× table just adds a zero!`,
  11: () => 'The 11× table repeats digits up to 9!',
  2: n => `The ${n}× table is just doubling!`,
  9: () => 'Digits in 9× answers always add up to 9!'
};

class TimesTableGame {
  constructor() {
    this.currentTable = null;
    this.questions = [];
    this.qIndex = 0;
    this.score = 0;
    this.answered = false;
    this.stars = {};
    this.loadStars();
    this.bindEvents();
    this.buildTableGrid();
    this.showScreen('landing');
  }

  loadStars() {
    try {
      this.stars = JSON.parse(localStorage.getItem('tt-stars') || '{}');
    } catch (_e) {
      this.stars = {};
    }
  }

  saveStars(tableKey, stars) {
    const prev = this.stars[tableKey] || 0;
    if (stars > prev) {
      this.stars[tableKey] = stars;
      try {
        localStorage.setItem('tt-stars', JSON.stringify(this.stars));
      } catch (_e) {
        /* ignore */
      }
    }
  }

  calcStars(score) {
    if (score === 10) {
      return 3;
    }
    if (score >= 8) {
      return 2;
    }
    if (score >= 6) {
      return 1;
    }
    return 0;
  }

  showScreen(name) {
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${name}`).classList.add('active');
  }

  bindEvents() {
    document
      .getElementById('btn-to-picker')
      .addEventListener('click', () => this.showScreen('picker'));
    document
      .getElementById('btn-try-again')
      .addEventListener('click', () => this.startQuiz(this.currentTable));
    document
      .getElementById('btn-pick-another')
      .addEventListener('click', () => this.showScreen('picker'));
  }

  buildTableGrid() {
    const grid = document.getElementById('table-grid');
    grid.innerHTML = '';

    TABLES.forEach(n => {
      const btn = document.createElement('button');
      btn.className = 'table-btn';
      const stars = this.stars[n] || 0;
      btn.innerHTML = `
        <span class="num">${n}×</span>
        <span class="label">table</span>
        <div class="stars-badge">${stars > 0 ? '⭐'.repeat(stars) : ''}</div>
      `;
      btn.addEventListener('click', () => this.startQuiz(n));
      grid.appendChild(btn);
    });

    // Mixed button
    const mixed = document.createElement('button');
    mixed.className = 'table-btn mixed';
    const mixedStars = this.stars[MIXED] || 0;
    mixed.innerHTML = `
      <span class="num">Mix It Up! 🎲</span>
      <span class="label">random tables</span>
      <div class="stars-badge">${mixedStars > 0 ? '⭐'.repeat(mixedStars) : ''}</div>
    `;
    mixed.addEventListener('click', () => this.startQuiz(MIXED));
    grid.appendChild(mixed);
  }

  generateQuestions(tableKey) {
    const qs = [];
    if (tableKey === MIXED) {
      // Pick 10 random questions from all tables
      for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        const tbl = TABLES[Math.floor(Math.random() * TABLES.length)];
        const factor = Math.floor(Math.random() * 12) + 1;
        qs.push({ a: tbl, b: factor, answer: tbl * factor });
      }
    } else {
      // Full 1–12 for the table, then pick 10 random
      const pool = [];
      for (let i = 1; i <= 12; i++) {
        pool.push({ a: tableKey, b: i, answer: tableKey * i });
      }
      // Shuffle and take 10
      pool.sort(() => Math.random() - 0.5);
      qs.push(...pool.slice(0, TOTAL_QUESTIONS));
    }
    return qs;
  }

  generateChoices(correct) {
    const choices = new Set([correct]);
    const maxAnswer = correct <= 12 ? 144 : correct + 40;
    while (choices.size < 4) {
      // Generate plausible wrong answers near the correct answer
      const offset = Math.floor(Math.random() * 20) - 10;
      const candidate = correct + offset;
      if (candidate > 0 && candidate !== correct && candidate <= maxAnswer) {
        choices.add(candidate);
      }
    }
    return [...choices].sort(() => Math.random() - 0.5);
  }

  startQuiz(tableKey) {
    this.currentTable = tableKey;
    this.questions = this.generateQuestions(tableKey);
    this.qIndex = 0;
    this.score = 0;
    this.answered = false;

    const navMeta = document.getElementById('nav-meta');
    navMeta.textContent = tableKey === MIXED ? 'Mixed' : `${tableKey}× table`;

    this.showScreen('quiz');
    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.questions[this.qIndex];
    const progress = document.getElementById('quiz-progress');
    const scoreBadge = document.getElementById('quiz-score');
    const fill = document.getElementById('progress-fill');
    const visual = document.getElementById('question-visual');
    const text = document.getElementById('question-text');
    const hint = document.getElementById('question-hint');
    const feedback = document.getElementById('feedback-banner');
    const refStrip = document.getElementById('ref-strip');

    progress.textContent = `Question ${this.qIndex + 1} of ${TOTAL_QUESTIONS}`;
    scoreBadge.textContent = `Score: ${this.score}`;
    fill.style.width = `${(this.qIndex / TOTAL_QUESTIONS) * 100}%`;

    const emoji = TABLE_EMOJI[q.a] || '🔢';
    visual.textContent = emoji;
    text.textContent = `${q.a} × ${q.b} = ?`;

    // Show hint for specific tables
    const hintFn = HINTS[q.a];
    hint.textContent = hintFn ? hintFn(q.a) : '';

    feedback.textContent = '';
    feedback.className = 'feedback-banner';

    // Reference strip: show partial table
    if (this.currentTable !== MIXED && q.a <= 12) {
      const nearby = [];
      const start = Math.max(1, q.b - 2);
      const end = Math.min(12, q.b + 2);
      for (let i = start; i <= end; i++) {
        if (i !== q.b) {
          nearby.push(`${q.a}×${i}=${q.a * i}`);
        }
      }
      if (nearby.length) {
        refStrip.innerHTML = `<strong>Nearby:</strong> ${nearby.join('  ·  ')}`;
      } else {
        refStrip.innerHTML = '';
      }
    } else {
      refStrip.innerHTML = '';
    }

    // Build answer buttons
    const grid = document.getElementById('answers-grid');
    grid.innerHTML = '';
    const choices = this.generateChoices(q.answer);
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => this.selectAnswer(choice, q.answer));
      grid.appendChild(btn);
    });

    this.answered = false;
  }

  selectAnswer(chosen, correct) {
    if (this.answered) {
      return;
    }
    this.answered = true;

    const isCorrect = chosen === correct;
    if (isCorrect) {
      this.score++;
    }

    const feedback = document.getElementById('feedback-banner');
    const grid = document.getElementById('answers-grid');

    grid.querySelectorAll('.answer-btn').forEach(btn => {
      btn.disabled = true;
      const val = parseInt(btn.textContent);
      if (val === correct) {
        btn.classList.add('correct');
      } else if (val === chosen && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    feedback.textContent = isCorrect ? '✓ Correct!' : `✗ The answer is ${correct}`;
    feedback.className = `feedback-banner ${isCorrect ? 'correct' : 'wrong'}`;

    setTimeout(() => {
      if (this.qIndex < TOTAL_QUESTIONS - 1) {
        this.qIndex++;
        this.renderQuestion();
      } else {
        this.showResults();
      }
    }, 1200);
  }

  showResults() {
    const stars = this.calcStars(this.score);
    const tableKey = this.currentTable;
    this.saveStars(tableKey, stars);
    this.buildTableGrid(); // refresh stars on picker

    const fill = document.getElementById('progress-fill');
    fill.style.width = '100%';

    const trophy = stars === 3 ? '🏆' : stars === 2 ? '🥈' : stars === 1 ? '🥉' : '📚';
    const starStr = stars > 0 ? '⭐'.repeat(stars) : '—';
    const tableLabel = tableKey === MIXED ? 'Mixed tables' : `${tableKey}× table`;

    let message = '';
    const pct = Math.round((this.score / TOTAL_QUESTIONS) * 100);
    if (this.score === 10) {
      message = "Perfect score! You've mastered this table! 🎉";
    } else if (stars === 2) {
      message = `Great work! Just ${10 - this.score} more to get a perfect score!`;
    } else if (stars === 1) {
      message = "Nice try! Keep practising and you'll get there.";
    } else {
      message = "Don't give up! This table takes practice. Try again!";
    }

    document.getElementById('results-trophy').textContent = trophy;
    document.getElementById('results-stars').textContent = starStr;
    document.getElementById('results-score').textContent = `${this.score}/${TOTAL_QUESTIONS}`;
    document.getElementById('results-label').textContent = `${tableLabel} · ${pct}%`;
    document.getElementById('results-message').textContent = message;

    document.getElementById('nav-meta').textContent = '';
    this.showScreen('results');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TimesTableGame();
});

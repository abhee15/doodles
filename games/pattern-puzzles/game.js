'use strict';

const TOTAL_QUESTIONS = 10;

const PATTERNS = [
  // Add-n sequences
  {
    gen: () => {
      const s = 2 + Math.floor(Math.random() * 8);
      const step = 2 + Math.floor(Math.random() * 5);
      const seq = [s, s + step, s + 2 * step, s + 3 * step];
      return { seq, answer: s + 4 * step, type: 'add', desc: `+${step}` };
    }
  },
  {
    gen: () => {
      const s = 1 + Math.floor(Math.random() * 5);
      const step = 3 + Math.floor(Math.random() * 7);
      const seq = [s, s + step, s + 2 * step, s + 3 * step];
      return { seq, answer: s + 4 * step, type: 'add', desc: `+${step}` };
    }
  },
  // Subtract-n sequences
  {
    gen: () => {
      const step = 2 + Math.floor(Math.random() * 4);
      const e = 30 + Math.floor(Math.random() * 20);
      const s = e + 4 * step;
      const seq = [s, s - step, s - 2 * step, s - 3 * step];
      return { seq, answer: s - 4 * step, type: 'sub', desc: `-${step}` };
    }
  },
  // Multiply-n sequences
  {
    gen: () => {
      const base = 1 + Math.floor(Math.random() * 3);
      const mult = 2 + Math.floor(Math.random() * 2);
      const seq = [base, base * mult, base * mult * mult, base * mult * mult * mult];
      return { seq, answer: base * Math.pow(mult, 4), type: 'mul', desc: `×${mult}` };
    }
  },
  // Even/odd skip counting
  {
    gen: () => {
      const start = 2 * (1 + Math.floor(Math.random() * 8));
      const seq = [start, start + 2, start + 4, start + 6];
      return { seq, answer: start + 8, type: 'skip2', desc: '+2' };
    }
  },
  {
    gen: () => {
      const start = 5 + 5 * Math.floor(Math.random() * 8);
      const seq = [start, start + 5, start + 10, start + 15];
      return { seq, answer: start + 20, type: 'skip5', desc: '+5' };
    }
  },
  {
    gen: () => {
      const start = 10 + 10 * Math.floor(Math.random() * 5);
      const seq = [start, start + 10, start + 20, start + 30];
      return { seq, answer: start + 40, type: 'skip10', desc: '+10' };
    }
  },
  // Alternating add
  {
    gen: () => {
      const a = 1 + Math.floor(Math.random() * 3);
      const b = a + 1 + Math.floor(Math.random() * 3);
      const s = 5 + Math.floor(Math.random() * 10);
      const seq = [s, s + a, s + a + b, s + a + b + a];
      return { seq, answer: s + a + b + a + b, type: 'alt', desc: `+${a}/+${b}` };
    }
  },
  // Fibonacci-style
  {
    gen: () => {
      const a = 1 + Math.floor(Math.random() * 3);
      const b = a + Math.floor(Math.random() * 3);
      const c = a + b;
      const d = b + c;
      return { seq: [a, b, c, d], answer: c + d, type: 'fib', desc: 'each = sum of two before' };
    }
  },
  // Square numbers
  {
    gen: () => {
      const start = 1 + Math.floor(Math.random() * 4);
      const seq = [
        start * start,
        (start + 1) * (start + 1),
        (start + 2) * (start + 2),
        (start + 3) * (start + 3)
      ];
      return { seq, answer: (start + 4) * (start + 4), type: 'sq', desc: 'square numbers' };
    }
  }
];

const TYPE_HINTS = {
  add: () => 'Each number increases by the same amount.',
  sub: () => 'Each number decreases by the same amount.',
  mul: () => 'Each number is multiplied by the same value.',
  skip2: () => 'Count by 2s!',
  skip5: () => 'Count by 5s!',
  skip10: () => 'Count by 10s!',
  alt: () => 'The pattern alternates between two different jumps.',
  fib: () => 'Each number is the sum of the two numbers before it.',
  sq: () => 'Think about square numbers: 1, 4, 9, 16…'
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateChoices(correct) {
  const offsets = shuffle([-3, -2, -1, 1, 2, 3, 4, 5, -4, -5]).filter(
    o => correct + o > 0 && correct + o !== correct
  );
  const wrong = [];
  const seen = new Set([correct]);
  for (const o of offsets) {
    const c = correct + o;
    if (!seen.has(c)) {
      seen.add(c);
      wrong.push(c);
    }
    if (wrong.length === 3) {
      break;
    }
  }
  while (wrong.length < 3) {
    const c = correct + wrong.length + 1;
    if (!seen.has(c)) {
      seen.add(c);
      wrong.push(c);
    }
  }
  return shuffle([correct, ...wrong]);
}

class PatternPuzzlesGame {
  constructor() {
    this.questions = [];
    this.qIndex = 0;
    this.score = 0;
    this.answered = false;
    this.hintUsed = false;
    this.bindEvents();
    this.showScreen('landing');
  }

  showScreen(name) {
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${name}`).classList.add('active');
  }

  bindEvents() {
    document.getElementById('btn-to-game').addEventListener('click', () => this.startGame());
    document.getElementById('btn-play-again').addEventListener('click', () => this.startGame());
    document
      .getElementById('btn-back-to-start')
      .addEventListener('click', () => this.showScreen('landing'));
    document.getElementById('btn-hint').addEventListener('click', () => this.showHint());
  }

  startGame() {
    this.questions = this.generateQuestions();
    this.qIndex = 0;
    this.score = 0;
    this.hintUsed = false;
    document.getElementById('nav-meta').textContent = '';
    this.showScreen('game');
    this.renderQuestion();
  }

  generateQuestions() {
    const qs = [];
    const pool = shuffle([...PATTERNS, ...PATTERNS]);
    const used = new Set();
    for (const p of pool) {
      const q = p.gen();
      if (!used.has(q.answer)) {
        used.add(q.answer);
        qs.push(q);
      }
      if (qs.length === TOTAL_QUESTIONS) {
        break;
      }
    }
    while (qs.length < TOTAL_QUESTIONS) {
      qs.push(PATTERNS[0].gen());
    }
    return qs;
  }

  renderQuestion() {
    const q = this.questions[this.qIndex];
    this.answered = false;
    this.hintUsed = false;

    document.getElementById('q-progress').textContent =
      `Question ${this.qIndex + 1} of ${TOTAL_QUESTIONS}`;
    document.getElementById('q-score').textContent = `Score: ${this.score}`;
    document.getElementById('progress-fill').style.width =
      `${(this.qIndex / TOTAL_QUESTIONS) * 100}%`;
    document.getElementById('q-feedback').textContent = '';
    document.getElementById('q-feedback').className = 'q-feedback';

    const hint = document.getElementById('q-hint');
    hint.textContent = '';
    hint.style.display = 'none';
    document.getElementById('btn-hint').disabled = false;
    document.getElementById('btn-hint').textContent = '💡 Hint';

    // Render sequence tiles
    const seqEl = document.getElementById('sequence-tiles');
    seqEl.innerHTML = '';
    q.seq.forEach(n => {
      const tile = document.createElement('div');
      tile.className = 'seq-tile';
      tile.textContent = n;
      seqEl.appendChild(tile);
      const arrow = document.createElement('div');
      arrow.className = 'seq-arrow';
      arrow.textContent = '→';
      seqEl.appendChild(arrow);
    });
    // The missing slot
    const blank = document.createElement('div');
    blank.className = 'seq-tile blank';
    blank.textContent = '?';
    seqEl.appendChild(blank);

    // Render choices
    const grid = document.getElementById('choices-grid');
    grid.innerHTML = '';
    generateChoices(q.answer).forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => this.selectAnswer(choice, q.answer));
      grid.appendChild(btn);
    });
  }

  showHint() {
    if (this.answered) {
      return;
    }
    const q = this.questions[this.qIndex];
    const hintFn = TYPE_HINTS[q.type];
    const hint = document.getElementById('q-hint');
    hint.textContent = hintFn ? hintFn(q.type) : `Pattern: ${q.desc}`;
    hint.style.display = 'block';
    document.getElementById('btn-hint').disabled = true;
    document.getElementById('btn-hint').textContent = '💡 Hint shown';
    this.hintUsed = true;
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

    document
      .getElementById('choices-grid')
      .querySelectorAll('.choice-btn')
      .forEach(btn => {
        btn.disabled = true;
        const val = parseInt(btn.textContent);
        if (val === correct) {
          btn.classList.add('correct');
        } else if (val === chosen && !isCorrect) {
          btn.classList.add('wrong');
        }
      });

    // Fill in the blank tile
    const blank = document.querySelector('.seq-tile.blank');
    if (blank) {
      blank.textContent = correct;
      blank.classList.remove('blank');
      blank.classList.add(isCorrect ? 'correct' : 'revealed');
    }

    const feedback = document.getElementById('q-feedback');
    feedback.textContent = isCorrect ? '✓ Correct!' : `✗ The answer is ${correct}`;
    feedback.className = `q-feedback ${isCorrect ? 'correct' : 'wrong'}`;

    document.getElementById('nav-meta').textContent = `${this.score}/${this.qIndex + 1}`;

    setTimeout(() => {
      if (this.qIndex < TOTAL_QUESTIONS - 1) {
        this.qIndex++;
        this.renderQuestion();
      } else {
        this.showResults();
      }
    }, 1300);
  }

  showResults() {
    document.getElementById('progress-fill').style.width = '100%';

    const pct = Math.round((this.score / TOTAL_QUESTIONS) * 100);
    let trophy, message;
    if (this.score === 10) {
      trophy = '🏆';
      message = "Perfect! You're a pattern master! 🎉";
    } else if (this.score >= 8) {
      trophy = '🥇';
      message = `Amazing! Just ${10 - this.score} away from perfect!`;
    } else if (this.score >= 6) {
      trophy = '🥈';
      message = 'Great work! Keep practising those patterns.';
    } else if (this.score >= 4) {
      trophy = '🥉';
      message = 'Good try! Patterns get easier with practice.';
    } else {
      trophy = '📚';
      message = "Don't give up! Look for what changes between each number.";
    }

    document.getElementById('result-trophy').textContent = trophy;
    document.getElementById('result-score').textContent = this.score;
    document.getElementById('result-max').textContent = TOTAL_QUESTIONS;
    document.getElementById('result-pct').textContent = `${pct}%`;
    document.getElementById('result-message').textContent = message;
    document.getElementById('nav-meta').textContent = '';

    this.showScreen('results');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PatternPuzzlesGame();
});

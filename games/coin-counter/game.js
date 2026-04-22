'use strict';

const COINS = [
  { name: 'Penny', value: 1, color: '#b87333', border: '#8b5a2b', label: '1¢' },
  { name: 'Nickel', value: 5, color: '#c0c0c0', border: '#888', label: '5¢' },
  { name: 'Dime', value: 10, color: '#b8bec7', border: '#777', label: '10¢' },
  { name: 'Quarter', value: 25, color: '#d4af37', border: '#b8860b', label: '25¢' }
];

const TOTAL_ROUNDS = 10;

// Rounds from easiest to hardest
const ROUND_CONFIGS = [
  { count: 2, types: [0, 1] }, // pennies + nickels
  { count: 2, types: [0, 1, 2] }, // pennies + nickels + dimes
  { count: 3, types: [0, 1, 2] },
  { count: 3, types: [1, 2, 3] }, // nickels + dimes + quarters
  { count: 3, types: [0, 1, 2, 3] }, // all types
  { count: 4, types: [0, 1, 2, 3] },
  { count: 4, types: [1, 2, 3] },
  { count: 5, types: [0, 1, 2, 3] },
  { count: 5, types: [1, 2, 3] },
  { count: 6, types: [0, 1, 2, 3] }
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatCents(cents) {
  if (cents >= 100) {
    const dollars = Math.floor(cents / 100);
    const remaining = cents % 100;
    return remaining === 0 ? `$${dollars}.00` : `$${dollars}.${String(remaining).padStart(2, '0')}`;
  }
  return `${cents}¢`;
}

function generateChoices(correct) {
  const offsets = shuffle([-15, -10, -5, 5, 10, 15, -20, 20, -25, 25]);
  const wrong = [];
  const seen = new Set([correct]);
  for (const o of offsets) {
    const c = correct + o;
    if (c > 0 && !seen.has(c)) {
      seen.add(c);
      wrong.push(c);
    }
    if (wrong.length === 3) {
      break;
    }
  }
  while (wrong.length < 3) {
    const c = correct + wrong.length * 5 + 5;
    if (!seen.has(c)) {
      seen.add(c);
      wrong.push(c);
    }
  }
  return shuffle([correct, ...wrong]);
}

class CoinCounterGame {
  constructor() {
    this.round = 0;
    this.score = 0;
    this.answered = false;
    this.coins = [];
    this.bindEvents();
    this.showScreen('landing');
  }

  showScreen(name) {
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${name}`).classList.add('active');
  }

  bindEvents() {
    document.getElementById('btn-start').addEventListener('click', () => this.startGame());
    document.getElementById('btn-play-again').addEventListener('click', () => this.startGame());
    document.getElementById('btn-back').addEventListener('click', () => this.showScreen('landing'));
  }

  startGame() {
    this.round = 0;
    this.score = 0;
    this.answered = false;
    document.getElementById('nav-meta').textContent = '';
    this.showScreen('game');
    this.renderRound();
  }

  generateCoins(round) {
    const cfg = ROUND_CONFIGS[Math.min(round, ROUND_CONFIGS.length - 1)];
    const typePool = cfg.types.map(i => COINS[i]);
    const picked = [];
    for (let i = 0; i < cfg.count; i++) {
      picked.push(typePool[Math.floor(Math.random() * typePool.length)]);
    }
    return shuffle(picked);
  }

  renderRound() {
    this.coins = this.generateCoins(this.round);
    this.answered = false;

    const total = this.coins.reduce((sum, c) => sum + c.value, 0);

    document.getElementById('q-progress').textContent =
      `Round ${this.round + 1} of ${TOTAL_ROUNDS}`;
    document.getElementById('q-score').textContent = `Score: ${this.score}`;
    document.getElementById('progress-fill').style.width = `${(this.round / TOTAL_ROUNDS) * 100}%`;
    document.getElementById('q-feedback').textContent = '';
    document.getElementById('q-feedback').className = 'q-feedback';

    // Render coins
    const display = document.getElementById('coin-display');
    display.innerHTML = '';
    this.coins.forEach(coin => {
      const el = document.createElement('div');
      el.className = 'coin-item';
      el.innerHTML = `
        <div class="coin-circle" style="background:${coin.color};border-color:${coin.border}">
          <span class="coin-label">${coin.label}</span>
        </div>
        <div class="coin-name">${coin.name}</div>
      `;
      display.appendChild(el);
    });

    // Render choices
    const grid = document.getElementById('choices-grid');
    grid.innerHTML = '';
    generateChoices(total).forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = formatCents(choice);
      btn.addEventListener('click', () => this.selectAnswer(choice, total));
      grid.appendChild(btn);
    });
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
        const label = btn.textContent;
        if (label === formatCents(correct)) {
          btn.classList.add('correct');
        } else if (label === formatCents(chosen) && !isCorrect) {
          btn.classList.add('wrong');
        }
      });

    const feedback = document.getElementById('q-feedback');
    feedback.textContent = isCorrect ? '✓ Correct!' : `✗ The total is ${formatCents(correct)}`;
    feedback.className = `q-feedback ${isCorrect ? 'correct' : 'wrong'}`;

    document.getElementById('nav-meta').textContent = `${this.score}/${this.round + 1}`;

    setTimeout(() => {
      if (this.round < TOTAL_ROUNDS - 1) {
        this.round++;
        this.renderRound();
      } else {
        this.showResults();
      }
    }, 1300);
  }

  showResults() {
    document.getElementById('progress-fill').style.width = '100%';

    const pct = Math.round((this.score / TOTAL_ROUNDS) * 100);
    let trophy, message;
    if (this.score === 10) {
      trophy = '🏆';
      message = "Perfect! You're a coin counting champion! 🎉";
    } else if (this.score >= 8) {
      trophy = '🥇';
      message = `Great work! Only ${10 - this.score} away from perfect.`;
    } else if (this.score >= 6) {
      trophy = '🥈';
      message = "Nice job! Keep counting coins and you'll master this!";
    } else if (this.score >= 4) {
      trophy = '🥉';
      message = 'Good try! Practice adding up pennies, nickels, dimes, and quarters.';
    } else {
      trophy = '📚';
      message = 'Keep practising! Remember: penny=1¢, nickel=5¢, dime=10¢, quarter=25¢.';
    }

    document.getElementById('result-trophy').textContent = trophy;
    document.getElementById('result-score').textContent = this.score;
    document.getElementById('result-max').textContent = TOTAL_ROUNDS;
    document.getElementById('result-pct').textContent = `${pct}%`;
    document.getElementById('result-message').textContent = message;
    document.getElementById('nav-meta').textContent = '';

    this.showScreen('results');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CoinCounterGame();
});

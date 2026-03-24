/* eslint-disable no-undef */
// Multiplication Masters — DOM Game
// Modes: Learn (visual arrays), Practice (drills), Challenge (speed)

(function () {
  'use strict';

  // ─── State ───────────────────────────────────────────
  let nav;
  let mode = ''; // 'learn', 'practice', 'challenge'
  let selectedTable = 0;
  let currentMultiplier = 1;
  let questions = [];
  let questionIdx = 0;
  let userAnswer = '';
  let score = 0;
  let streak = 0;
  let lives = 3;
  let results = []; // { correct: bool }
  let timerInterval = null;
  let timerRemaining = 0;
  const TIMER_MAX = 10;

  // ─── LocalStorage helpers ────────────────────────────
  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem('mm-progress') || '{}');
    } catch (e) {
      return {};
    }
  }
  function saveProgress(table, starsEarned) {
    const p = getProgress();
    const key = `t${table}`;
    if (!p[key] || starsEarned > p[key]) {
      p[key] = starsEarned;
    }
    localStorage.setItem('mm-progress', JSON.stringify(p));
  }
  function getHighScore() {
    try {
      return parseInt(localStorage.getItem('mm-highscore') || '0', 10);
    } catch (e) {
      return 0;
    }
  }
  function saveHighScore(s) {
    if (s > getHighScore()) {
      localStorage.setItem('mm-highscore', String(s));
    }
  }

  // ─── Question generator ──────────────────────────────
  function generateQuestions(table, count) {
    const qs = [];
    for (let i = 0; i < count; i++) {
      const a = table === 0 ? Math.floor(Math.random() * 12) + 1 : table;
      const b = Math.floor(Math.random() * 12) + 1;
      qs.push({ a: a, b: b, answer: a * b });
    }
    return qs;
  }

  function generateChallengeQuestion(round) {
    const maxVal = Math.min(12, 4 + Math.floor(round / 3));
    const a = Math.floor(Math.random() * maxVal) + 1;
    const b = Math.floor(Math.random() * maxVal) + 1;
    return { a: a, b: b, answer: a * b };
  }

  // ─── Navigation setup ───────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof GameNavigation !== 'undefined') {
      nav = new GameNavigation('multiplication-masters', {
        screens: ['landing', 'table-select', 'learn', 'practice', 'challenge', 'results'],
        initialScreen: 'landing',
        gameName: 'Multiplication Masters'
      });
    }
    renderLanding();
  });

  // ─── Landing Screen ─────────────────────────────────
  function renderLanding() {
    if (nav) {
      nav.goToScreen('landing');
    }
    const el = document.getElementById('screen-landing');
    el.innerHTML =
      '<div class="mode-cards">' +
      '<div class="mode-card" id="btn-learn">' +
      '<div class="icon">📐</div>' +
      '<h3>Learn</h3>' +
      '<p>See how multiplication works with visual dot arrays</p>' +
      '</div>' +
      '<div class="mode-card" id="btn-practice">' +
      '<div class="icon">✏️</div>' +
      '<h3>Practice</h3>' +
      '<p>Drill your times tables and earn stars</p>' +
      '</div>' +
      '<div class="mode-card" id="btn-challenge">' +
      '<div class="icon">⚡</div>' +
      '<h3>Challenge</h3>' +
      '<p>Speed round! Beat the timer with 3 lives</p>' +
      '</div>' +
      '</div>';

    el.querySelector('#btn-learn').addEventListener('click', function () {
      mode = 'learn';
      renderTableSelect();
    });
    el.querySelector('#btn-practice').addEventListener('click', function () {
      mode = 'practice';
      renderTableSelect();
    });
    el.querySelector('#btn-challenge').addEventListener('click', function () {
      mode = 'challenge';
      startChallenge();
    });
  }

  // ─── Table Select Screen ────────────────────────────
  function renderTableSelect() {
    if (nav) {
      nav.goToScreen('table-select');
    }
    const el = document.getElementById('screen-table-select');
    const progress = getProgress();
    let html = '<div class="section-title">Pick a Times Table</div><div class="table-grid">';
    if (mode === 'practice') {
      html += '<div class="table-btn" data-t="0">Mixed</div>';
    }
    for (let i = 1; i <= 12; i++) {
      const cls = progress[`t${i}`] ? ' mastered' : '';
      html += `<div class="table-btn${cls}" data-t="${i}">${i}×</div>`;
    }
    html += '</div>';
    el.innerHTML = html;

    el.querySelectorAll('.table-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedTable = parseInt(btn.getAttribute('data-t'), 10);
        if (mode === 'learn') {
          currentMultiplier = 1;
          renderLearn();
        } else {
          startPractice();
        }
      });
    });
  }

  // ─── Learn Screen ───────────────────────────────────
  function renderLearn() {
    if (nav) {
      nav.goToScreen('learn');
    }
    const el = document.getElementById('screen-learn');
    const a = selectedTable;
    const b = currentMultiplier;
    const total = a * b;

    // Build dot grid
    let dotsHtml = `<div class="dot-grid" style="grid-template-columns: repeat(${a}, 1fr);">`;
    for (let i = 0; i < total; i++) {
      const delay = i * 50;
      dotsHtml += `<div class="dot animate" style="animation-delay: ${delay}ms"></div>`;
    }
    dotsHtml += '</div>';

    el.innerHTML =
      `<div class="section-title">${a}× Table</div>` +
      `<div style="text-align:center; padding:10px;">${dotsHtml}</div>` +
      `<div class="equation">${a} × ${b} = <span class="result">${total}</span></div>` +
      `<div style="text-align:center; color:var(--dom-text-muted); font-size:0.85rem;">${
        b
      } row${b > 1 ? 's' : ''} of ${a} dots = ${total} dots` +
      '</div>' +
      '<div class="learn-nav">' +
      `<button class="dom-btn dom-btn--ghost" id="learn-prev" ${b <= 1 ? 'disabled' : ''}><i class="ti ti-arrow-left"></i> Prev</button>` +
      `<span style="color:#fff; line-height:44px; font-weight:700;">${b} / 12</span>` +
      `<button class="dom-btn dom-btn--ghost" id="learn-next" ${b >= 12 ? 'disabled' : ''}>Next <i class="ti ti-arrow-right"></i></button>` +
      '</div>';

    const prevBtn = el.querySelector('#learn-prev');
    const nextBtn = el.querySelector('#learn-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (currentMultiplier > 1) {
          currentMultiplier--;
          renderLearn();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (currentMultiplier < 12) {
          currentMultiplier++;
          renderLearn();
        }
      });
    }
  }

  // ─── Practice Mode ──────────────────────────────────
  function startPractice() {
    questions = generateQuestions(selectedTable, 10);
    questionIdx = 0;
    score = 0;
    streak = 0;
    results = [];
    userAnswer = '';
    renderPractice();
  }

  function renderPractice() {
    if (nav) {
      nav.goToScreen('practice');
    }
    const el = document.getElementById('screen-practice');
    const q = questions[questionIdx];

    // Progress dots
    let dotsHtml = '<div class="progress-row">';
    for (let i = 0; i < questions.length; i++) {
      let cls = 'progress-dot';
      if (results[i] !== undefined) {
        cls += results[i].correct ? ' correct' : ' wrong';
      }
      if (i === questionIdx) {
        cls += ' current';
      }
      dotsHtml += `<div class="${cls}">${i + 1}</div>`;
    }
    dotsHtml += '</div>';

    el.innerHTML =
      `${dotsHtml}<div class="streak-bar">${streak > 0 ? `🔥 Streak: ${streak}` : ''}</div>` +
      `<div class="question-text">${q.a} × ${q.b} = ?</div>` +
      `<div class="answer-display" id="answer-box">${userAnswer || '_ _'}</div>` +
      `<div class="feedback" id="feedback"></div>${buildNumpad()}`;

    attachNumpadListeners(function onSubmit() {
      checkPracticeAnswer();
    });
  }

  function checkPracticeAnswer() {
    const q = questions[questionIdx];
    const correct = parseInt(userAnswer, 10) === q.answer;
    results.push({ correct: correct });

    const box = document.getElementById('answer-box');
    const fb = document.getElementById('feedback');

    if (correct) {
      score += 10;
      streak++;
      box.classList.add('correct');
      fb.className = 'feedback correct';
      fb.textContent = '✓ Correct!';
    } else {
      streak = 0;
      box.classList.add('wrong');
      fb.className = 'feedback wrong';
      fb.textContent = `✗ Answer: ${q.answer}`;
    }

    // Disable numpad
    document.querySelectorAll('.numpad-btn').forEach(function (b) {
      b.disabled = true;
    });

    setTimeout(function () {
      questionIdx++;
      userAnswer = '';
      if (questionIdx >= questions.length) {
        showResults();
      } else {
        renderPractice();
      }
    }, 1200);
  }

  // ─── Challenge Mode ─────────────────────────────────
  function startChallenge() {
    if (nav) {
      nav.goToScreen('challenge');
    }
    questionIdx = 0;
    score = 0;
    streak = 0;
    lives = 3;
    results = [];
    userAnswer = '';
    questions = [generateChallengeQuestion(0)];
    renderChallenge();
  }

  function renderChallenge() {
    const el = document.getElementById('screen-challenge');
    const q = questions[questionIdx];
    timerRemaining = TIMER_MAX;

    el.innerHTML =
      '<div style="display:flex; justify-content:space-between; padding:8px 20px; align-items:center;">' +
      `<div class="lives" id="lives">${'❤️'.repeat(lives)}${'🖤'.repeat(3 - lives)}</div>` +
      `<div style="color:#fff; font-weight:700; font-size:1.1rem;">Score: ${score}</div>` +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="timer-fill" style="width:100%"></div></div>' +
      `<div class="question-text">${q.a} × ${q.b} = ?</div>` +
      `<div class="answer-display" id="answer-box">${userAnswer || '_ _'}</div>` +
      `<div class="feedback" id="feedback"></div>${buildNumpad()}`;

    attachNumpadListeners(function onSubmit() {
      checkChallengeAnswer();
    });

    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerRemaining = TIMER_MAX * 10; // tenths of seconds
    timerInterval = setInterval(function () {
      timerRemaining--;
      const pct = (timerRemaining / (TIMER_MAX * 10)) * 100;
      const fill = document.getElementById('timer-fill');
      if (fill) {
        fill.style.width = `${pct}%`;
        fill.className = `timer-fill${pct < 25 ? ' danger' : pct < 50 ? ' warning' : ''}`;
      }
      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        // Time's up — treat as wrong
        userAnswer = '';
        checkChallengeAnswer();
      }
    }, 100);
  }

  function checkChallengeAnswer() {
    clearInterval(timerInterval);
    const q = questions[questionIdx];
    const correct = userAnswer !== '' && parseInt(userAnswer, 10) === q.answer;

    const box = document.getElementById('answer-box');
    const fb = document.getElementById('feedback');

    if (correct) {
      score += 10 + streak;
      streak++;
      if (box) {
        box.classList.add('correct');
      }
      if (fb) {
        fb.className = 'feedback correct';
        fb.textContent = `✓ +${10 + streak - 1}`;
      }
    } else {
      streak = 0;
      lives--;
      if (box) {
        box.classList.add('wrong');
        box.textContent = q.answer;
      }
      if (fb) {
        fb.className = 'feedback wrong';
        fb.textContent = `✗ Answer: ${q.answer}`;
      }
    }

    results.push({ correct: correct });
    document.querySelectorAll('.numpad-btn').forEach(function (b) {
      b.disabled = true;
    });

    setTimeout(function () {
      userAnswer = '';
      if (lives <= 0) {
        saveHighScore(score);
        showResults();
      } else {
        questionIdx++;
        questions.push(generateChallengeQuestion(questionIdx));
        renderChallenge();
      }
    }, 1000);
  }

  // ─── Results Screen ─────────────────────────────────
  function showResults() {
    if (nav) {
      nav.goToScreen('results');
    }
    const el = document.getElementById('screen-results');
    const correctCount = results.filter(function (r) {
      return r.correct;
    }).length;
    const total = results.length;
    const pct = Math.round((correctCount / total) * 100);
    const starsCount = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
    const starsStr = '⭐'.repeat(starsCount) + '☆'.repeat(3 - starsCount);

    if (mode === 'practice' && selectedTable > 0) {
      saveProgress(selectedTable, starsCount);
    }

    let extraHtml = '';
    if (mode === 'challenge') {
      extraHtml =
        `<div class="stat-card"><div class="value">${score}</div><div class="label">Score</div></div>` +
        `<div class="stat-card"><div class="value">${getHighScore()}</div><div class="label">High Score</div></div>`;
    }

    el.innerHTML =
      `<div class="stars">${starsStr}</div>` +
      `<div class="section-title">${mode === 'challenge' ? 'Game Over!' : 'Round Complete!'}</div>` +
      '<div class="stats-grid">' +
      `<div class="stat-card"><div class="value">${correctCount}/${total}</div><div class="label">Correct</div></div>` +
      `<div class="stat-card"><div class="value">${pct}%</div><div class="label">Accuracy</div></div>${
        extraHtml
      }</div>` +
      '<div class="btn-row">' +
      `<button class="dom-btn dom-btn--primary" id="res-again">${mode === 'challenge' ? 'Try Again' : 'Play Again'}</button>` +
      '<button class="dom-btn dom-btn--ghost" id="res-home">Home</button>' +
      '</div>';

    el.querySelector('#res-again').addEventListener('click', function () {
      if (mode === 'challenge') {
        startChallenge();
      } else {
        startPractice();
      }
    });
    el.querySelector('#res-home').addEventListener('click', function () {
      renderLanding();
    });
  }

  // ─── Numpad Builder ─────────────────────────────────
  function buildNumpad() {
    let html = '<div class="numpad">';
    for (let i = 1; i <= 9; i++) {
      html += `<button class="numpad-btn" data-n="${i}">${i}</button>`;
    }
    html += '<button class="numpad-btn clear" data-action="clear">C</button>';
    html += '<button class="numpad-btn" data-n="0">0</button>';
    html += '<button class="numpad-btn submit" data-action="submit">✓</button>';
    html += '</div>';
    return html;
  }

  function attachNumpadListeners(onSubmit) {
    document.querySelectorAll('.numpad-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) {
          return;
        }
        const n = btn.getAttribute('data-n');
        const action = btn.getAttribute('data-action');
        if (n !== null) {
          if (userAnswer.length < 3) {
            userAnswer += n;
            const box = document.getElementById('answer-box');
            if (box) {
              box.textContent = userAnswer;
            }
          }
        } else if (action === 'clear') {
          userAnswer = '';
          const box2 = document.getElementById('answer-box');
          if (box2) {
            box2.textContent = '_ _';
          }
        } else if (action === 'submit') {
          if (userAnswer.length > 0) {
            onSubmit();
          }
        }
      });
    });
  }
})();

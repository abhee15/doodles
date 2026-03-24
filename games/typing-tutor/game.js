/* eslint-disable no-undef */
// Typing Tutor — DOM Game
// Modes: Lessons (progressive), Practice (free-form), Falling Words (arcade)

(function () {
  'use strict';

  // ─── State ─────────────────────────────────────────────────────────────────
  let nav;
  let currentMode = ''; // 'lesson', 'practice', 'falling'
  let currentLessonIdx = 0;
  let typingText = '';
  let typedChars = []; // array of { char, correct } for each position typed so far
  let typingStartTime = 0;
  let typingActive = false;
  let wpmInterval = null;

  // Falling words state
  let fallingWords = [];
  let fallingScore = 0;
  let fallingLives = 5;
  let fallingSpawnInterval = null;
  let fallingSpeedBase = 1.2; // px per frame
  let fallingGameActive = false;
  let fallingWordPool = [];
  let animFrameId = null;

  // Results state
  let lastWpm = 0;
  let lastAccuracy = 0;
  let lastMode = '';
  let lastLessonIdx = 0;

  // ─── Lesson Data ───────────────────────────────────────────────────────────
  const LESSONS = [
    {
      id: 1,
      title: 'Home Row',
      desc: 'Left: asdf — Right: jkl;',
      text: 'aaa sss ddd fff jjj kkk lll ;;; asdf jkl; asdf jkl; fdsa ;lkj asdf jkl; fads flak'
    },
    {
      id: 2,
      title: 'Home Row Words',
      desc: 'Real words using home row keys',
      text: 'all ask dad fall flask glad hall jade lads lass salad flask shall fall asks glad all shall'
    },
    {
      id: 3,
      title: 'Top Row',
      desc: 'qwert and yuiop',
      text: 'qqq www eee rrr ttt yyy uuu iii ooo ppp qwert yuiop power quite wrote poetry your quiet'
    },
    {
      id: 4,
      title: 'Bottom Row',
      desc: 'zxcvb and nm,./',
      text: 'zzz xxx ccc vvv bbb nnn mmm cave buzz vibe zone mix cab van gym zinc bomb verb mix name'
    },
    {
      id: 5,
      title: 'Numbers',
      desc: 'Top number row 1–0',
      text: '1 2 3 4 5 6 7 8 9 0 12 34 56 78 90 123 456 789 1234 5678 9012 1000 2025 360 42 99'
    },
    {
      id: 6,
      title: 'Capital Letters',
      desc: 'Shift key practice',
      text: 'The Cat sat on a Mat. A Big Dog ran Fast. She Said Hello. We Love to Learn. Go Get it Now.'
    },
    {
      id: 7,
      title: 'Common Words',
      desc: 'Frequent English words',
      text: 'the of and to a in is it you that he was for on are with as his they be at one have this'
    },
    {
      id: 8,
      title: 'Sentences',
      desc: 'Full sentences with punctuation',
      text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.'
    }
  ];

  // ─── Practice Texts ────────────────────────────────────────────────────────
  const PRACTICE_TEXTS = [
    'The sun rises in the east and sets in the west each and every single day of the year.',
    'Learning to type quickly and accurately is a skill that will help you for your entire life.',
    'A good typist keeps their fingers on the home row and moves back after each keystroke.',
    'Reading books every day helps build your vocabulary and improves your spelling skills too.',
    'The quick brown fox jumps over the lazy dog near the old wooden fence by the river bank.',
    'Practice makes perfect when it comes to typing on a keyboard with all ten of your fingers.',
    'Stars light up the night sky and have guided travelers and sailors for thousands of years.',
    'Every great journey begins with a single step and a desire to keep moving toward the goal.',
    'Computers help us learn, create, and connect with people from all around the entire world.',
    'Type each letter carefully and soon you will find your fingers flying across the keyboard.'
  ];

  // ─── Falling Words Pool ────────────────────────────────────────────────────
  const FALLING_WORD_POOL = [
    'cat',
    'dog',
    'run',
    'big',
    'sun',
    'hat',
    'cup',
    'bed',
    'map',
    'sit',
    'top',
    'fox',
    'hop',
    'mud',
    'tree',
    'star',
    'play',
    'jump',
    'fish',
    'bird',
    'snow',
    'rain',
    'cake',
    'home',
    'book',
    'door',
    'hand',
    'sing',
    'kind',
    'ship',
    'cave',
    'buzz',
    'vibe',
    'zone',
    'mix',
    'cab',
    'van',
    'gym',
    'zinc',
    'bomb',
    'verb',
    'name',
    'glad',
    'hall',
    'jade',
    'flask',
    'shall',
    'quite',
    'power',
    'poem',
    'light',
    'night',
    'cloud',
    'storm',
    'grass',
    'river',
    'ocean',
    'flame',
    'smile',
    'brave',
    'dream',
    'space',
    'earth',
    'water',
    'plant',
    'grain',
    'frost',
    'quick',
    'brown',
    'jumps',
    'clock',
    'pilot',
    'robot',
    'magic',
    'crown',
    'pivot'
  ];

  // ─── Keyboard Layout ───────────────────────────────────────────────────────
  const KB_ROWS = [
    [
      { key: '1', finger: 'lp' },
      { key: '2', finger: 'lr' },
      { key: '3', finger: 'lm' },
      { key: '4', finger: 'li' },
      { key: '5', finger: 'li' },
      { key: '6', finger: 'ri' },
      { key: '7', finger: 'ri' },
      { key: '8', finger: 'rm' },
      { key: '9', finger: 'rr' },
      { key: '0', finger: 'rp' }
    ],
    [
      { key: 'Q', finger: 'lp' },
      { key: 'W', finger: 'lr' },
      { key: 'E', finger: 'lm' },
      { key: 'R', finger: 'li' },
      { key: 'T', finger: 'li' },
      { key: 'Y', finger: 'ri' },
      { key: 'U', finger: 'ri' },
      { key: 'I', finger: 'rm' },
      { key: 'O', finger: 'rr' },
      { key: 'P', finger: 'rp' }
    ],
    [
      { key: 'A', finger: 'lp' },
      { key: 'S', finger: 'lr' },
      { key: 'D', finger: 'lm' },
      { key: 'F', finger: 'li' },
      { key: 'G', finger: 'li' },
      { key: 'H', finger: 'ri' },
      { key: 'J', finger: 'ri' },
      { key: 'K', finger: 'rm' },
      { key: 'L', finger: 'rr' },
      { key: ';', finger: 'rp' }
    ],
    [
      { key: 'Z', finger: 'lp' },
      { key: 'X', finger: 'lr' },
      { key: 'C', finger: 'lm' },
      { key: 'V', finger: 'li' },
      { key: 'B', finger: 'li' },
      { key: 'N', finger: 'ri' },
      { key: 'M', finger: 'ri' },
      { key: ',', finger: 'rm' },
      { key: '.', finger: 'rr' },
      { key: '/', finger: 'rp' }
    ]
  ];

  // ─── Helpers ───────────────────────────────────────────────────────────────
  function isMobile() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  function showScreen(name) {
    const screens = document.querySelectorAll('.dom-screen');
    screens.forEach(function (el) {
      el.classList.remove('active');
    });
    const target = document.getElementById(`screen-${name}`);
    if (target) {
      target.classList.add('active');
    }
    if (nav) {
      nav.goToScreen(name);
    }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function calcWpm() {
    if (!typingStartTime) {
      return 0;
    }
    const elapsed = (Date.now() - typingStartTime) / 60000; // minutes
    if (elapsed < 0.001) {
      return 0;
    }
    const wordsTyped = typedChars.length / 5;
    return Math.round(wordsTyped / elapsed);
  }

  function calcAccuracy() {
    if (typedChars.length === 0) {
      return 100;
    }
    const correct = typedChars.filter(function (c) {
      return c.correct;
    }).length;
    return Math.round((correct / typedChars.length) * 100);
  }

  function starsForResult(wpm, accuracy) {
    if (accuracy >= 95 && wpm >= 30) {
      return 3;
    }
    if (accuracy >= 85 && wpm >= 15) {
      return 2;
    }
    return 1;
  }

  // ─── Keyboard Builder ──────────────────────────────────────────────────────
  function buildKeyboard() {
    let html = '<div class="keyboard">';
    KB_ROWS.forEach(function (row) {
      html += '<div class="kb-row">';
      row.forEach(function (k) {
        html += `<div class="kb-key finger-${k.finger}" data-key="${k.key}">${k.key}</div>`;
      });
      html += '</div>';
    });
    // Space bar row
    html +=
      '<div class="kb-row"><div class="kb-key space finger-thumb" data-key=" ">SPACE</div></div>';
    html += '</div>';
    return html;
  }

  function highlightKey(char) {
    const allKeys = document.querySelectorAll('.kb-key');
    allKeys.forEach(function (el) {
      el.classList.remove('highlight');
    });
    if (!char) {
      return;
    }
    const upper = char.toUpperCase();
    allKeys.forEach(function (el) {
      const k = el.getAttribute('data-key');
      if (k === upper || k === char) {
        el.classList.add('highlight');
      }
    });
  }

  function flashKey(char) {
    const upper = char.toUpperCase();
    const allKeys = document.querySelectorAll('.kb-key');
    allKeys.forEach(function (el) {
      const k = el.getAttribute('data-key');
      if (k === upper || k === char) {
        el.classList.add('pressed');
        setTimeout(function () {
          el.classList.remove('pressed');
        }, 120);
      }
    });
  }

  // ─── Text Display Builder ──────────────────────────────────────────────────
  function buildTextDisplay(text, position, errorPos) {
    let html = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i] === ' ' ? '&nbsp;' : text[i];
      if (i < position) {
        // Already typed — check if correct
        if (typedChars[i] && typedChars[i].correct) {
          html += `<span class="typed">${ch}</span>`;
        } else {
          html += `<span class="error">${ch}</span>`;
        }
      } else if (i === position) {
        if (errorPos) {
          html += `<span class="error">${ch}</span>`;
        } else {
          html += `<span class="current">${ch}</span>`;
        }
      } else {
        html += `<span>${ch}</span>`;
      }
    }
    return html;
  }

  // ─── Navigation Setup ──────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof GameNavigation !== 'undefined') {
      nav = new GameNavigation('typing-tutor', {
        screens: ['landing', 'lesson-select', 'lesson', 'practice', 'falling', 'results'],
        initialScreen: 'landing',
        gameName: 'Typing Tutor'
      });
    }
    renderLanding();
  });

  // ─── Landing Screen ────────────────────────────────────────────────────────
  function renderLanding() {
    stopFalling();
    stopTypingTimer();
    showScreen('landing');
    const el = document.getElementById('screen-landing');
    const mobileHtml = isMobile()
      ? '<div class="mobile-notice">⌨️ This game works best with a physical keyboard! Mobile browsers may show on-screen keyboards.</div>'
      : '';

    el.innerHTML =
      `${mobileHtml}<div class="mode-cards">` +
      '<div class="mode-card" id="btn-lessons">' +
      '<div class="icon">📚</div>' +
      '<h3>Lessons</h3>' +
      '<p>8 progressive lessons from home row to full sentences</p>' +
      '</div>' +
      '<div class="mode-card" id="btn-practice">' +
      '<div class="icon">⌨️</div>' +
      '<h3>Practice</h3>' +
      '<p>Type random sentences and track your WPM and accuracy</p>' +
      '</div>' +
      '<div class="mode-card" id="btn-falling">' +
      '<div class="icon">🌧️</div>' +
      '<h3>Falling Words</h3>' +
      '<p>Type words before they hit the bottom — 5 lives!</p>' +
      '</div>' +
      '</div>';

    el.querySelector('#btn-lessons').addEventListener('click', function () {
      renderLessonSelect();
    });
    el.querySelector('#btn-practice').addEventListener('click', function () {
      startPractice();
    });
    el.querySelector('#btn-falling').addEventListener('click', function () {
      startFalling();
    });
  }

  // ─── Lesson Select Screen ──────────────────────────────────────────────────
  function renderLessonSelect() {
    showScreen('lesson-select');
    const el = document.getElementById('screen-lesson-select');
    const progress = getLessonProgress();

    let html = '<div class="lesson-list">';
    LESSONS.forEach(function (lesson, idx) {
      const done = progress[idx] ? ' completed' : '';
      html +=
        `<div class="lesson-item${done}" data-idx="${idx}">` +
        `<div class="lesson-num">${lesson.id}</div>` +
        '<div class="lesson-info">' +
        `<h4>${lesson.title}</h4>` +
        `<p>${lesson.desc}</p>` +
        '</div>' +
        '</div>';
    });
    html += '</div>';
    el.innerHTML = html;

    el.querySelectorAll('.lesson-item').forEach(function (item) {
      item.addEventListener('click', function () {
        const idx = parseInt(item.getAttribute('data-idx'), 10);
        currentLessonIdx = idx;
        startLesson(idx);
      });
    });
  }

  // ─── Lesson Progress ───────────────────────────────────────────────────────
  function getLessonProgress() {
    try {
      return JSON.parse(localStorage.getItem('tt-lessons') || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveLessonProgress(idx) {
    const p = getLessonProgress();
    p[idx] = true;
    try {
      localStorage.setItem('tt-lessons', JSON.stringify(p));
    } catch (e) {
      // storage unavailable — silently skip
    }
  }

  // ─── Lesson Screen ─────────────────────────────────────────────────────────
  function startLesson(idx) {
    currentMode = 'lesson';
    currentLessonIdx = idx;
    const lesson = LESSONS[idx];
    typingText = lesson.text;
    typedChars = [];
    typingStartTime = 0;
    typingActive = true;
    showScreen('lesson');
    renderLessonScreen();
  }

  function renderLessonScreen() {
    const el = document.getElementById('screen-lesson');
    const pos = typedChars.length;
    const nextChar = typingText[pos] || '';

    el.innerHTML =
      '<div class="typing-area">' +
      '<div class="stats-bar">' +
      '<span>WPM: <span class="val" id="stat-wpm">0</span></span>' +
      '<span>Accuracy: <span class="val" id="stat-acc">100%</span></span>' +
      `<span>Lesson ${currentLessonIdx + 1} / ${LESSONS.length}</span>` +
      '</div>' +
      `<div class="text-display" id="text-display">${buildTextDisplay(
        typingText,
        pos,
        false
      )}</div>` +
      `</div>${buildKeyboard()}<div class="btn-row">` +
      '<button class="dom-btn dom-btn--ghost" id="lesson-back">← Back to Lessons</button>' +
      '</div>';

    highlightKey(nextChar);
    startTypingTimer();

    el.querySelector('#lesson-back').addEventListener('click', function () {
      stopTypingTimer();
      typingActive = false;
      renderLessonSelect();
    });
  }

  // ─── Practice Screen ───────────────────────────────────────────────────────
  function startPractice() {
    currentMode = 'practice';
    const pool = shuffle(PRACTICE_TEXTS);
    typingText = pool[0];
    typedChars = [];
    typingStartTime = 0;
    typingActive = true;
    showScreen('practice');
    renderPracticeScreen();
  }

  function renderPracticeScreen() {
    const el = document.getElementById('screen-practice');
    const pos = typedChars.length;
    const nextChar = typingText[pos] || '';

    el.innerHTML =
      '<div class="typing-area">' +
      '<div class="stats-bar">' +
      '<span>WPM: <span class="val" id="stat-wpm">0</span></span>' +
      '<span>Accuracy: <span class="val" id="stat-acc">100%</span></span>' +
      '</div>' +
      `<div class="text-display" id="text-display">${buildTextDisplay(
        typingText,
        pos,
        false
      )}</div>` +
      `</div>${buildKeyboard()}<div class="btn-row">` +
      '<button class="dom-btn dom-btn--ghost" id="prac-home">← Home</button>' +
      '</div>';

    highlightKey(nextChar);
    startTypingTimer();

    el.querySelector('#prac-home').addEventListener('click', function () {
      stopTypingTimer();
      typingActive = false;
      renderLanding();
    });
  }

  // ─── Typing Timer ──────────────────────────────────────────────────────────
  function startTypingTimer() {
    stopTypingTimer();
    wpmInterval = setInterval(function () {
      updateStatsBar();
    }, 500);
  }

  function stopTypingTimer() {
    if (wpmInterval !== null) {
      clearInterval(wpmInterval);
      wpmInterval = null;
    }
  }

  function updateStatsBar() {
    const wpmEl = document.getElementById('stat-wpm');
    const accEl = document.getElementById('stat-acc');
    if (wpmEl) {
      wpmEl.textContent = calcWpm();
    }
    if (accEl) {
      accEl.textContent = `${calcAccuracy()}%`;
    }
  }

  // ─── Keydown Handler (Lessons + Practice) ──────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (!typingActive) {
      return;
    }
    const screen = document.querySelector('.dom-screen.active');
    if (!screen) {
      return;
    }
    const sid = screen.id;
    if (sid !== 'screen-lesson' && sid !== 'screen-practice') {
      return;
    }

    // Ignore modifier-only keys
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
      return;
    }
    // Ignore function keys, arrows, etc.
    if (e.key.length > 1 && e.key !== 'Backspace') {
      return;
    }

    const pos = typedChars.length;

    // Backspace: remove last char
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (pos > 0) {
        typedChars.pop();
        const newPos = typedChars.length;
        const nextChar = typingText[newPos] || '';
        refreshTextDisplay(newPos, false);
        highlightKey(nextChar);
        updateStatsBar();
      }
      return;
    }

    if (pos >= typingText.length) {
      return;
    }

    // Start timer on first keystroke
    if (pos === 0 && typingStartTime === 0) {
      typingStartTime = Date.now();
    }

    const expected = typingText[pos];
    const typed = e.key;
    const correct = typed === expected;

    typedChars.push({ char: typed, correct: correct });
    flashKey(typed);

    const newPos = typedChars.length;
    const nextChar = typingText[newPos] || '';

    if (!correct) {
      refreshTextDisplay(pos, true);
      // Brief error flash then move
      setTimeout(function () {
        refreshTextDisplay(newPos, false);
        highlightKey(nextChar);
        updateStatsBar();
      }, 200);
    } else {
      refreshTextDisplay(newPos, false);
      highlightKey(nextChar);
      updateStatsBar();
    }

    // Check completion
    if (newPos >= typingText.length) {
      typingActive = false;
      stopTypingTimer();
      lastWpm = calcWpm();
      lastAccuracy = calcAccuracy();
      lastMode = currentMode;
      lastLessonIdx = currentLessonIdx;

      if (currentMode === 'lesson') {
        saveLessonProgress(currentLessonIdx);
      }

      setTimeout(function () {
        showResults();
      }, 600);
    }
  });

  function refreshTextDisplay(pos, errorAtPos) {
    const display = document.getElementById('text-display');
    if (display) {
      display.innerHTML = buildTextDisplay(typingText, pos, errorAtPos);
    }
  }

  // ─── Results Screen ────────────────────────────────────────────────────────
  function showResults() {
    showScreen('results');
    const el = document.getElementById('screen-results');
    const stars = starsForResult(lastWpm, lastAccuracy);
    const starsHtml = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    const isLesson = lastMode === 'lesson';
    const isFalling = lastMode === 'falling';

    let titleText = 'Practice Complete!';
    if (isLesson) {
      titleText = `Lesson ${lastLessonIdx + 1} Complete!`;
    } else if (isFalling) {
      titleText = 'Game Over!';
    }

    let statsHtml = '';
    if (isFalling) {
      statsHtml =
        `<div class="stat-card"><div class="value">${fallingScore}</div><div class="label">Score</div></div>` +
        `<div class="stat-card"><div class="value">${5 - fallingLives}</div><div class="label">Missed</div></div>`;
    } else {
      statsHtml =
        `<div class="stat-card"><div class="value">${lastWpm}</div><div class="label">WPM</div></div>` +
        `<div class="stat-card"><div class="value">${lastAccuracy}%</div><div class="label">Accuracy</div></div>`;
    }

    let againLabel = 'Play Again';
    if (isLesson) {
      againLabel = 'Retry Lesson';
    }
    let nextBtn = '';
    if (isLesson && lastLessonIdx < LESSONS.length - 1) {
      nextBtn = '<button class="dom-btn dom-btn--primary" id="res-next">Next Lesson →</button>';
    }

    el.innerHTML =
      `<div class="stars">${starsHtml}</div>` +
      `<div class="section-title">${titleText}</div>` +
      `<div class="stats-grid">${statsHtml}</div>` +
      '<div class="btn-row">' +
      `<button class="dom-btn dom-btn--primary" id="res-again">${againLabel}</button>${
        nextBtn
      }<button class="dom-btn dom-btn--ghost" id="res-home">Home</button>` +
      '</div>';

    el.querySelector('#res-again').addEventListener('click', function () {
      if (lastMode === 'lesson') {
        startLesson(lastLessonIdx);
      } else if (lastMode === 'falling') {
        startFalling();
      } else {
        startPractice();
      }
    });

    el.querySelector('#res-home').addEventListener('click', function () {
      renderLanding();
    });

    if (nextBtn) {
      el.querySelector('#res-next').addEventListener('click', function () {
        startLesson(lastLessonIdx + 1);
      });
    }
  }

  // ─── Falling Words Mode ────────────────────────────────────────────────────
  function startFalling() {
    currentMode = 'falling';
    fallingScore = 0;
    fallingLives = 5;
    fallingWords = [];
    fallingSpeedBase = 1.2;
    fallingGameActive = true;
    fallingWordPool = shuffle(FALLING_WORD_POOL);
    typingActive = false;

    showScreen('falling');
    renderFallingScreen();
    scheduleFallingSpawn();
    requestFallingFrame();
  }

  function renderFallingScreen() {
    const el = document.getElementById('screen-falling');
    el.innerHTML =
      '<div style="padding: 8px 16px; display:flex; justify-content:space-between; align-items:center;">' +
      '<div style="color:var(--dom-text); font-weight:700;">Score: <span id="fall-score">0</span></div>' +
      '<div class="lives" id="fall-lives">❤️❤️❤️❤️❤️</div>' +
      '</div>' +
      '<div style="padding: 0 16px;">' +
      '<div class="falling-area" id="falling-area"></div>' +
      '<input type="text" class="type-input" id="type-input" placeholder="type here..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />' +
      '</div>';

    const input = el.querySelector('#type-input');
    if (input) {
      input.focus();
      input.addEventListener('input', function () {
        onFallingInput(input.value);
      });
    }
  }

  function scheduleFallingSpawn() {
    // Increase speed and spawn rate as score grows
    const spawnDelay = Math.max(1200, 3000 - fallingScore * 15);

    fallingSpawnInterval = setTimeout(function () {
      if (!fallingGameActive) {
        return;
      }
      spawnFallingWord();
      scheduleFallingSpawn();
    }, spawnDelay);
  }

  function spawnFallingWord() {
    const area = document.getElementById('falling-area');
    if (!area) {
      return;
    }
    const areaWidth = area.offsetWidth || 400;

    // Pick a word
    const word = fallingWordPool[Math.floor(Math.random() * fallingWordPool.length)];

    const wordEl = document.createElement('div');
    wordEl.className = 'falling-word';
    wordEl.dataset.word = word;
    wordEl.dataset.typed = '';
    wordEl.textContent = word;

    const maxLeft = Math.max(10, areaWidth - 120);
    wordEl.style.left = `${Math.floor(Math.random() * maxLeft)}px`;
    wordEl.style.top = '-40px';

    area.appendChild(wordEl);
    fallingWords.push({ el: wordEl, word: word, top: -40, typed: '' });
  }

  function requestFallingFrame() {
    if (!fallingGameActive) {
      return;
    }
    animFrameId = requestAnimationFrame(fallingTick);
  }

  function fallingTick() {
    if (!fallingGameActive) {
      return;
    }
    const area = document.getElementById('falling-area');
    if (!area) {
      return;
    }
    const areaHeight = area.offsetHeight || 350;
    const speed = fallingSpeedBase + fallingScore * 0.02;

    const toRemove = [];
    fallingWords.forEach(function (fw, idx) {
      fw.top += speed;
      fw.el.style.top = `${fw.top}px`;

      if (fw.top > areaHeight) {
        // Missed — lose a life
        fw.el.remove();
        toRemove.push(idx);
        fallingLives--;
        updateFallingHUD();

        if (fallingLives <= 0) {
          fallingGameActive = false;
          stopFalling();
          lastMode = 'falling';
          setTimeout(function () {
            showResults();
          }, 400);
          return;
        }
      }
    });

    // Remove missed words from array (reverse order)
    for (let i = toRemove.length - 1; i >= 0; i--) {
      fallingWords.splice(toRemove[i], 1);
    }

    if (fallingGameActive) {
      animFrameId = requestAnimationFrame(fallingTick);
    }
  }

  function onFallingInput(value) {
    if (!fallingGameActive) {
      return;
    }
    const typed = value.toLowerCase().trim();

    // Find the best matching active word (first that starts with typed)
    let bestMatch = null;
    let bestIdx = -1;
    fallingWords.forEach(function (fw, idx) {
      if (fw.word.startsWith(typed) && (bestMatch === null || fw.top > bestMatch.top)) {
        bestMatch = fw;
        bestIdx = idx;
      }
    });

    // Clear active states
    fallingWords.forEach(function (fw) {
      fw.el.classList.remove('active');
      fw.el.innerHTML = fw.word;
    });

    if (bestMatch) {
      bestMatch.el.classList.add('active');
      // Show typed progress
      const typedPart = bestMatch.word.slice(0, typed.length);
      const restPart = bestMatch.word.slice(typed.length);
      bestMatch.el.innerHTML = `<span class="typed-part">${typedPart}</span>${restPart}`;

      // Full word typed
      if (typed === bestMatch.word) {
        bestMatch.el.remove();
        fallingWords.splice(bestIdx, 1);
        fallingScore += bestMatch.word.length;
        clearFallingInput();
        updateFallingHUD();
      }
    }
  }

  function clearFallingInput() {
    const input = document.getElementById('type-input');
    if (input) {
      input.value = '';
    }
  }

  function updateFallingHUD() {
    const scoreEl = document.getElementById('fall-score');
    if (scoreEl) {
      scoreEl.textContent = fallingScore;
    }
    const livesEl = document.getElementById('fall-lives');
    if (livesEl) {
      livesEl.textContent =
        '❤️'.repeat(Math.max(0, fallingLives)) + '🖤'.repeat(Math.max(0, 5 - fallingLives));
    }
  }

  function stopFalling() {
    fallingGameActive = false;
    if (fallingSpawnInterval !== null) {
      clearTimeout(fallingSpawnInterval);
      fallingSpawnInterval = null;
    }
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    fallingWords = [];
  }
})();

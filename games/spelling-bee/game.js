/* eslint-disable no-undef */
// Spelling Bee — DOM Game
// Grade-leveled spelling with letter tiles and audio

(function () {
  'use strict';

  let nav;
  let selectedGrade = 1;
  let wordList = [];
  let wordIdx = 0;
  let placed = []; // indices into scrambled
  let scrambled = [];
  let results = [];
  let hints = 3;

  const WORDS = {
    1: [
      { word: 'cat', sentence: 'The ___ sat on the mat.' },
      { word: 'dog', sentence: 'My ___ likes to run.' },
      { word: 'run', sentence: 'I can ___ very fast.' },
      { word: 'big', sentence: 'The elephant is very ___.' },
      { word: 'red', sentence: 'The apple is ___.' },
      { word: 'sun', sentence: 'The ___ is bright today.' },
      { word: 'hat', sentence: 'She wore a funny ___.' },
      { word: 'cup', sentence: 'I drank milk from a ___.' },
      { word: 'bed', sentence: 'I sleep in my ___.' },
      { word: 'map', sentence: 'We looked at the ___ to find our way.' },
      { word: 'sit', sentence: 'Please ___ down here.' },
      { word: 'top', sentence: 'The ball is on ___ of the box.' },
      { word: 'fox', sentence: 'The ___ ran into the forest.' },
      { word: 'hop', sentence: 'The bunny likes to ___.' },
      { word: 'mud', sentence: 'My boots are covered in ___.' }
    ],
    2: [
      { word: 'tree', sentence: 'The ___ has green leaves.' },
      { word: 'star', sentence: 'I saw a bright ___ at night.' },
      { word: 'play', sentence: 'Let us ___ outside today.' },
      { word: 'jump', sentence: 'Can you ___ over the puddle?' },
      { word: 'fish', sentence: 'The ___ swam in the pond.' },
      { word: 'bird', sentence: 'A ___ is singing in the tree.' },
      { word: 'snow', sentence: 'The ___ is white and cold.' },
      { word: 'rain', sentence: 'We danced in the ___.' },
      { word: 'cake', sentence: 'Mom baked a birthday ___.' },
      { word: 'home', sentence: 'We went back ___.' },
      { word: 'book', sentence: 'I read a great ___ today.' },
      { word: 'door', sentence: 'Please close the ___.' },
      { word: 'hand', sentence: 'Raise your ___ if you know.' },
      { word: 'sing', sentence: 'I love to ___ songs.' },
      { word: 'kind', sentence: 'She is very ___ to everyone.' }
    ],
    3: [
      { word: 'beautiful', sentence: 'The sunset was ___.' },
      { word: 'chocolate', sentence: 'I love ___ ice cream.' },
      { word: 'elephant', sentence: 'The ___ has a long trunk.' },
      { word: 'favorite', sentence: 'Blue is my ___ color.' },
      { word: 'important', sentence: 'Reading is very ___.' },
      { word: 'library', sentence: 'We borrowed books from the ___.' },
      { word: 'mountain', sentence: 'The ___ was covered in snow.' },
      { word: 'problem', sentence: 'We solved the math ___.' },
      { word: 'question', sentence: 'I have a ___ for you.' },
      { word: 'together', sentence: 'Let us work ___.' },
      { word: 'adventure', sentence: 'We went on a great ___.' },
      { word: 'birthday', sentence: 'Today is her ___.' },
      { word: 'champion', sentence: 'She is the spelling ___.' },
      { word: 'dinosaur', sentence: 'The ___ lived long ago.' },
      { word: 'exercise', sentence: 'Morning ___ keeps you healthy.' }
    ],
    4: [
      { word: 'atmosphere', sentence: 'Earth has a protective ___.' },
      { word: 'biography', sentence: 'I read a ___ about Lincoln.' },
      { word: 'communicate', sentence: 'We ___ through words and actions.' },
      { word: 'demonstrate', sentence: 'Can you ___ how it works?' },
      { word: 'environment', sentence: 'We should protect the ___.' },
      { word: 'geography', sentence: 'We study maps in ___ class.' },
      { word: 'imagination', sentence: 'Use your ___ to create stories.' },
      { word: 'knowledge', sentence: 'Books give us ___.' },
      { word: 'mysterious', sentence: 'The old house looked ___.' },
      { word: 'necessary', sentence: 'Water is ___ for life.' },
      { word: 'particular', sentence: 'Is there a ___ book you want?' },
      { word: 'temperature', sentence: 'The ___ dropped below freezing.' },
      { word: 'vocabulary', sentence: 'Reading expands your ___.' },
      { word: 'wonderful', sentence: 'We had a ___ time at the park.' },
      { word: 'absolutely', sentence: 'That answer is ___ correct.' }
    ]
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof GameNavigation !== 'undefined') {
      nav = new GameNavigation('spelling-bee', {
        screens: ['landing', 'game', 'results'],
        initialScreen: 'landing',
        gameName: 'Spelling Bee'
      });
    }
    renderLanding();
  });

  // ─── Speech ─────────────────────────────────────────
  function speak(word) {
    if (!window.speechSynthesis) {
      return;
    }
    const u = new SpeechSynthesisUtterance(word);
    u.rate = 0.85;
    u.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  // ─── Scramble ───────────────────────────────────────
  function scrambleWord(word, addExtras) {
    const letters = word.split('');
    // Add distractors for harder grades
    if (addExtras) {
      const extra = 'abcdefghijklmnopqrstuvwxyz';
      for (let i = 0; i < 2; i++) {
        const c = extra[Math.floor(Math.random() * 26)];
        if (letters.indexOf(c) === -1) {
          letters.push(c);
        }
      }
    }
    // Fisher-Yates shuffle
    for (let k = letters.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      const tmp = letters[k];
      letters[k] = letters[j];
      letters[j] = tmp;
    }
    return letters;
  }

  // ─── Landing ────────────────────────────────────────
  function renderLanding() {
    if (nav) {
      nav.goToScreen('landing');
    }
    const el = document.getElementById('screen-landing');
    el.innerHTML =
      '<div class="section-title">🐝 Pick Your Grade Level</div>' +
      '<div class="grade-cards">' +
      '<div class="grade-card" data-g="1"><div class="icon">🌱</div><h3>Grade 1</h3><p>Simple 3-letter words</p></div>' +
      '<div class="grade-card" data-g="2"><div class="icon">🌿</div><h3>Grade 2</h3><p>Blends and sight words</p></div>' +
      '<div class="grade-card" data-g="3"><div class="icon">🌳</div><h3>Grade 3</h3><p>Multi-syllable words</p></div>' +
      '<div class="grade-card" data-g="4"><div class="icon">🏔️</div><h3>Grade 4</h3><p>Advanced vocabulary</p></div>' +
      '</div>';

    el.querySelectorAll('.grade-card').forEach(function (card) {
      card.addEventListener('click', function () {
        selectedGrade = parseInt(card.getAttribute('data-g'), 10);
        startGame();
      });
    });
  }

  // ─── Game ───────────────────────────────────────────
  function startGame() {
    const allWords = WORDS[selectedGrade].slice();
    // Shuffle and take 10
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = allWords[i];
      allWords[i] = allWords[j];
      allWords[j] = tmp;
    }
    wordList = allWords.slice(0, 10);
    wordIdx = 0;
    results = [];
    hints = 3;
    renderWord();
  }

  function renderWord() {
    if (nav) {
      nav.goToScreen('game');
    }
    const el = document.getElementById('screen-game');
    const w = wordList[wordIdx];
    placed = [];
    scrambled = scrambleWord(w.word, selectedGrade >= 3);

    const sentenceHtml = w.sentence.replace('___', '<span class="blank">____</span>');

    el.innerHTML =
      '<div class="game-header">' +
      `<div class="word-counter">Word ${wordIdx + 1} of ${wordList.length}</div>` +
      `<div class="progress-bar"><div class="progress-fill" style="width:${(wordIdx / wordList.length) * 100}%"></div></div>` +
      '</div>' +
      `<div class="sentence">${sentenceHtml}</div>` +
      '<div class="answer-area" id="answer-area"></div>' +
      '<div class="tile-area" id="tile-area"></div>' +
      '<div class="hint-row">' +
      '<button class="hint-btn" id="hint-hear">🔊 Hear</button>' +
      `<button class="hint-btn" id="hint-first">💡 First Letter (${hints})</button>` +
      '<button class="hint-btn" id="hint-peek">👀 Peek (2)</button>' +
      '</div>' +
      '<div class="btn-row"><button class="dom-btn dom-btn--primary" id="submit-btn" disabled>Check</button></div>' +
      '<div class="feedback" id="feedback"></div>';

    renderTiles(el, w);
    speak(w.word);

    el.querySelector('#hint-hear').addEventListener('click', function () {
      speak(w.word);
    });
    el.querySelector('#hint-first').addEventListener('click', function () {
      if (hints <= 0) {
        return;
      }
      if (placed.length === 0) {
        // Find the first letter in scrambled
        const firstChar = w.word[0];
        for (let i = 0; i < scrambled.length; i++) {
          if (scrambled[i] === firstChar && placed.indexOf(i) === -1) {
            placed.push(i);
            hints--;
            renderTiles(el, w);
            break;
          }
        }
      }
    });
    el.querySelector('#hint-peek').addEventListener('click', function () {
      if (hints < 2) {
        return;
      }
      hints -= 2;
      const fb = document.getElementById('feedback');
      fb.textContent = w.word.toUpperCase();
      fb.className = 'feedback';
      fb.style.color = 'var(--dom-accent)';
      setTimeout(function () {
        fb.textContent = '';
        fb.style.color = '';
      }, 2000);
    });
    el.querySelector('#submit-btn').addEventListener('click', function () {
      checkSpelling(w);
    });
  }

  function renderTiles(el, w) {
    // Answer slots
    const answerArea = el.querySelector('#answer-area') || document.getElementById('answer-area');
    let slotsHtml = '';
    for (let i = 0; i < w.word.length; i++) {
      const letter = placed[i] !== undefined ? scrambled[placed[i]] : '';
      const cls = `answer-slot${letter ? ' filled' : ''}`;
      slotsHtml += `<div class="${cls}" data-pos="${i}">${letter.toUpperCase()}</div>`;
    }
    answerArea.innerHTML = slotsHtml;

    // Letter tiles
    const tileArea = el.querySelector('#tile-area') || document.getElementById('tile-area');
    let tilesHtml = '';
    for (let j = 0; j < scrambled.length; j++) {
      const used = placed.indexOf(j) !== -1;
      tilesHtml += `<div class="letter-tile${used ? ' used' : ''}" data-tidx="${j}">${scrambled[j].toUpperCase()}</div>`;
    }
    tileArea.innerHTML = tilesHtml;

    // Attach tile click → place letter
    tileArea.querySelectorAll('.letter-tile:not(.used)').forEach(function (tile) {
      tile.addEventListener('click', function () {
        const tidx = parseInt(tile.getAttribute('data-tidx'), 10);
        if (placed.length < w.word.length) {
          placed.push(tidx);
          renderTiles(el, w);
          const submitBtn = document.getElementById('submit-btn');
          if (submitBtn) {
            submitBtn.disabled = placed.length < w.word.length;
          }
        }
      });
    });

    // Attach slot click → remove letter
    answerArea.querySelectorAll('.answer-slot.filled').forEach(function (slot) {
      slot.addEventListener('click', function () {
        const pos = parseInt(slot.getAttribute('data-pos'), 10);
        if (pos < placed.length) {
          placed.splice(pos, 1);
          renderTiles(el, w);
          const submitBtn = document.getElementById('submit-btn');
          if (submitBtn) {
            submitBtn.disabled = true;
          }
        }
      });
    });
  }

  function checkSpelling(w) {
    const built = placed
      .map(function (idx) {
        return scrambled[idx];
      })
      .join('');
    const correct = built === w.word;
    results.push({ correct: correct, word: w.word });

    // Show feedback on slots
    const slots = document.querySelectorAll('.answer-slot');
    slots.forEach(function (slot, i) {
      if (built[i] === w.word[i]) {
        slot.classList.add('correct');
      } else {
        slot.classList.add('wrong');
      }
    });

    const fb = document.getElementById('feedback');
    if (correct) {
      fb.className = 'feedback correct';
      fb.textContent = '✓ Perfect!';
    } else {
      fb.className = 'feedback wrong';
      fb.textContent = `✗ Correct spelling: ${w.word.toUpperCase()}`;
    }

    document.querySelectorAll('.letter-tile').forEach(function (t) {
      t.style.pointerEvents = 'none';
    });
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
    }

    setTimeout(function () {
      wordIdx++;
      if (wordIdx >= wordList.length) {
        showResults();
      } else {
        renderWord();
      }
    }, 1800);
  }

  // ─── Results ────────────────────────────────────────
  function showResults() {
    if (nav) {
      nav.goToScreen('results');
    }
    const el = document.getElementById('screen-results');
    const correctCount = results.filter(function (r) {
      return r.correct;
    }).length;
    const pct = Math.round((correctCount / results.length) * 100);
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;

    el.innerHTML =
      `<div class="stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>` +
      '<div class="section-title">🐝 Round Complete!</div>' +
      '<div class="stats-grid">' +
      `<div class="stat-card"><div class="value">${correctCount}/${results.length}</div><div class="label">Correct</div></div>` +
      `<div class="stat-card"><div class="value">${pct}%</div><div class="label">Accuracy</div></div>` +
      '</div>' +
      '<div class="btn-row">' +
      '<button class="dom-btn dom-btn--primary" id="res-again">Play Again</button>' +
      '<button class="dom-btn dom-btn--ghost" id="res-home">Home</button>' +
      '</div>';

    el.querySelector('#res-again').addEventListener('click', startGame);
    el.querySelector('#res-home').addEventListener('click', renderLanding);
  }
})();

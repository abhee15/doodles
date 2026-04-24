/* eslint-disable no-undef */
// Fraction Fun — DOM Game
// Modes: Learn, Compare, Practice (shade), Match (equivalents)

(function () {
  'use strict';

  let nav;
  let mode = '';
  let denominator = 4;
  let shaded = [];
  let questions = [];
  let questionIdx = 0;
  let results = [];

  const WORD_NAMES = {
    1: 'whole',
    2: 'halves',
    3: 'thirds',
    4: 'quarters',
    5: 'fifths',
    6: 'sixths',
    8: 'eighths'
  };
  const NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof GameNavigation !== 'undefined') {
      nav = new GameNavigation('fraction-fun', {
        screens: ['landing', 'learn', 'compare', 'practice', 'match', 'results'],
        initialScreen: 'landing',
        gameName: 'Fraction Fun'
      });
    }
    renderLanding();
  });

  // ─── SVG Circle Builder ─────────────────────────────
  function buildCircleSVG(parts, shadedSet, size, interactive) {
    const r = size / 2 - 4;
    const cx = size / 2;
    const cy = size / 2;
    let html = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;

    for (let i = 0; i < parts; i++) {
      const startAngle = (i / parts) * 2 * Math.PI - Math.PI / 2;
      const endAngle = ((i + 1) / parts) * 2 * Math.PI - Math.PI / 2;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = 1 / parts > 0.5 ? 1 : 0;
      const fill = shadedSet.has(i) ? '#ff6b6b' : 'rgba(255,255,255,0.1)';
      const stroke = shadedSet.has(i) ? '#e05555' : 'rgba(255,255,255,0.25)';
      const cursor = interactive ? 'pointer' : 'default';

      if (parts === 1) {
        html += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2" data-idx="${i}" style="cursor:${cursor}"/>`;
      } else {
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        html += `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="2" data-idx="${i}" style="cursor:${cursor}"/>`;
      }
    }
    html += '</svg>';
    return html;
  }

  // ─── Landing Screen ─────────────────────────────────
  function renderLanding() {
    if (nav) {
      nav.goToScreen('landing');
    }
    const el = document.getElementById('screen-landing');
    el.innerHTML =
      '<div class="mode-cards">' +
      '<div class="mode-card" id="btn-learn"><div class="icon">🍕</div><h3>Learn</h3><p>Explore fractions by tapping slices</p></div>' +
      '<div class="mode-card" id="btn-compare"><div class="icon">⚖️</div><h3>Compare</h3><p>Which fraction is bigger?</p></div>' +
      '<div class="mode-card" id="btn-practice"><div class="icon">🎯</div><h3>Practice</h3><p>Shade the correct fraction</p></div>' +
      '<div class="mode-card" id="btn-match"><div class="icon">🔗</div><h3>Match</h3><p>Find equivalent fractions</p></div>' +
      '</div>';

    el.querySelector('#btn-learn').addEventListener('click', function () {
      mode = 'learn';
      denominator = 4;
      shaded = [];
      renderLearn();
    });
    el.querySelector('#btn-compare').addEventListener('click', function () {
      mode = 'compare';
      startCompare();
    });
    el.querySelector('#btn-practice').addEventListener('click', function () {
      mode = 'practice';
      startPractice();
    });
    el.querySelector('#btn-match').addEventListener('click', function () {
      mode = 'match';
      startMatch();
    });
  }

  // ─── Learn Mode ─────────────────────────────────────
  function renderLearn() {
    if (nav) {
      nav.goToScreen('learn');
    }
    const el = document.getElementById('screen-learn');
    const shadedSet = new Set(shaded);
    const n = shaded.length;

    el.innerHTML =
      '<div class="fraction-area">' +
      `<div class="fraction-visual">${buildCircleSVG(denominator, shadedSet, 220, true)}</div>` +
      `<div class="fraction-label">${n} / ${denominator}</div>` +
      `<div class="fraction-words">${n === 0 ? 'Tap slices to shade them!' : `${NUM_WORDS[n]} ${WORD_NAMES[denominator] || `${denominator}ths`}`}</div>` +
      '</div>' +
      `<div class="denom-row">${[2, 3, 4, 5, 6, 8]
        .map(function (d) {
          return `<button class="denom-btn${d === denominator ? ' active' : ''}" data-d="${d}">1/${d}</button>`;
        })
        .join('')}</div>`;

    // Attach slice click handlers
    el.querySelectorAll('svg [data-idx]').forEach(function (slice) {
      slice.addEventListener('click', function () {
        const idx = parseInt(slice.getAttribute('data-idx'), 10);
        const pos = shaded.indexOf(idx);
        if (pos >= 0) {
          shaded.splice(pos, 1);
        } else if (shaded.length < denominator) {
          shaded.push(idx);
        }
        renderLearn();
      });
    });

    // Attach denominator buttons
    el.querySelectorAll('.denom-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        denominator = parseInt(btn.getAttribute('data-d'), 10);
        shaded = [];
        renderLearn();
      });
    });
  }

  // ─── Compare Mode ───────────────────────────────────
  function startCompare() {
    questions = [];
    for (let i = 0; i < 10; i++) {
      const d1 = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      let d2 = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      while (d2 === d1) {
        d2 = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      }
      const n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
      let n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
      while (n1 / d1 === n2 / d2) {
        n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
      }
      questions.push({ n1: n1, d1: d1, n2: n2, d2: d2 });
    }
    questionIdx = 0;
    results = [];
    renderCompare();
  }

  function renderCompare() {
    if (nav) {
      nav.goToScreen('compare');
    }
    const el = document.getElementById('screen-compare');
    const q = questions[questionIdx];
    const set1 = new Set();
    for (let i = 0; i < q.n1; i++) {
      set1.add(i);
    }
    const set2 = new Set();
    for (let j = 0; j < q.n2; j++) {
      set2.add(j);
    }

    const progressHtml = buildProgressDots();

    el.innerHTML =
      `${progressHtml}<div class="question-text">Which is bigger?</div>` +
      '<div class="compare-row">' +
      `<div class="compare-option" id="opt-left">${buildCircleSVG(
        q.d1,
        set1,
        140,
        false
      )}<div class="compare-label">${q.n1}/${q.d1}</div>` +
      '</div>' +
      '<div style="color:var(--dom-text-muted); font-size:1.5rem; font-weight:800; align-self:center;">VS</div>' +
      `<div class="compare-option" id="opt-right">${buildCircleSVG(
        q.d2,
        set2,
        140,
        false
      )}<div class="compare-label">${q.n2}/${q.d2}</div>` +
      '</div>' +
      '</div>' +
      '<div class="feedback" id="feedback"></div>';

    const leftOpt = el.querySelector('#opt-left');
    const rightOpt = el.querySelector('#opt-right');
    let answered = false;

    function handleAnswer(pickedLeft) {
      if (answered) {
        return;
      }
      answered = true;
      const leftBigger = q.n1 / q.d1 > q.n2 / q.d2;
      const correct = pickedLeft === leftBigger;
      results.push({ correct: correct });

      const fb = document.getElementById('feedback');
      if (correct) {
        (pickedLeft ? leftOpt : rightOpt).classList.add('correct');
        fb.className = 'feedback correct';
        fb.textContent = '✓ Correct!';
      } else {
        (pickedLeft ? leftOpt : rightOpt).classList.add('wrong');
        (leftBigger ? leftOpt : rightOpt).classList.add('correct');
        fb.className = 'feedback wrong';
        fb.textContent = `✗ ${leftBigger ? `${q.n1}/${q.d1}` : `${q.n2}/${q.d2}`} is bigger`;
      }

      setTimeout(function () {
        questionIdx++;
        if (questionIdx >= questions.length) {
          showResults();
        } else {
          renderCompare();
        }
      }, 1500);
    }

    leftOpt.addEventListener(
      'click',
      function () {
        handleAnswer(true);
      },
      { once: true }
    );
    rightOpt.addEventListener(
      'click',
      function () {
        handleAnswer(false);
      },
      { once: true }
    );
  }

  // ─── Practice Mode (Shade) ─────────────────────────
  function startPractice() {
    questions = [];
    for (let i = 0; i < 10; i++) {
      const d = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      const n = Math.floor(Math.random() * d) + 1;
      questions.push({ n: n, d: d });
    }
    questionIdx = 0;
    results = [];
    shaded = [];
    renderPracticeQ();
  }

  function renderPracticeQ() {
    if (nav) {
      nav.goToScreen('practice');
    }
    const el = document.getElementById('screen-practice');
    const q = questions[questionIdx];
    shaded = [];

    const shadedSet = new Set(shaded);
    el.innerHTML =
      `${buildProgressDots()}<div class="question-text">Shade ${q.n}/${q.d}</div>` +
      '<div class="fraction-area">' +
      `<div class="fraction-visual" id="practice-visual">${buildCircleSVG(q.d, shadedSet, 220, true)}</div>` +
      `<div class="fraction-label" id="shade-count">0 / ${q.d} shaded</div>` +
      '</div>' +
      '<div class="btn-row"><button class="dom-btn dom-btn--primary check-btn" id="check-btn">Check</button></div>' +
      '<div class="feedback" id="feedback"></div>';

    attachPracticeSliceHandlers(el, q);

    el.querySelector('#check-btn').addEventListener('click', function () {
      const correct = shaded.length === q.n;
      results.push({ correct: correct });
      const fb = document.getElementById('feedback');
      if (correct) {
        fb.className = 'feedback correct';
        fb.textContent = '✓ Perfect!';
      } else {
        fb.className = 'feedback wrong';
        fb.textContent = `✗ That's ${shaded.length}/${q.d}, need ${q.n}/${q.d}`;
      }
      setTimeout(function () {
        questionIdx++;
        shaded = [];
        if (questionIdx >= questions.length) {
          showResults();
        } else {
          renderPracticeQ();
        }
      }, 1500);
    });
  }

  function attachPracticeSliceHandlers(el, q) {
    el.querySelectorAll('svg [data-idx]').forEach(function (slice) {
      slice.addEventListener('click', function () {
        const idx = parseInt(slice.getAttribute('data-idx'), 10);
        const pos = shaded.indexOf(idx);
        if (pos >= 0) {
          shaded.splice(pos, 1);
        } else {
          shaded.push(idx);
        }

        const visual = document.getElementById('practice-visual');
        if (visual) {
          visual.innerHTML = buildCircleSVG(q.d, new Set(shaded), 220, true);
          attachPracticeSliceHandlers(el, q);
        }
        const countEl = document.getElementById('shade-count');
        if (countEl) {
          countEl.textContent = `${shaded.length} / ${q.d} shaded`;
        }
      });
    });
  }

  // ─── Match Mode (Equivalents) ───────────────────────
  function startMatch() {
    questions = [];
    const equivSets = [
      {
        n: 1,
        d: 2,
        equivs: [
          [2, 4],
          [3, 6],
          [4, 8]
        ]
      },
      { n: 1, d: 3, equivs: [[2, 6]] },
      { n: 2, d: 3, equivs: [[4, 6]] },
      { n: 1, d: 4, equivs: [[2, 8]] },
      { n: 3, d: 4, equivs: [[6, 8]] },
      {
        n: 2,
        d: 4,
        equivs: [
          [1, 2],
          [3, 6],
          [4, 8]
        ]
      },
      { n: 2, d: 6, equivs: [[1, 3]] },
      {
        n: 3,
        d: 6,
        equivs: [
          [1, 2],
          [2, 4],
          [4, 8]
        ]
      }
    ];

    for (let i = 0; i < 10; i++) {
      const pick = equivSets[Math.floor(Math.random() * equivSets.length)];
      const correctEquiv = pick.equivs[Math.floor(Math.random() * pick.equivs.length)];

      // Generate wrong answers
      const wrongs = [];
      while (wrongs.length < 3) {
        const wd = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
        const wn = Math.floor(Math.random() * wd) + 1;
        if (
          wn / wd !== pick.n / pick.d &&
          !wrongs.some(function (w) {
            return w[0] === wn && w[1] === wd;
          })
        ) {
          wrongs.push([wn, wd]);
        }
      }

      const options = wrongs.concat([correctEquiv]);
      // Shuffle
      for (let k = options.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        const temp = options[k];
        options[k] = options[j];
        options[j] = temp;
      }
      const correctIdx = options.indexOf(correctEquiv);

      questions.push({ n: pick.n, d: pick.d, options: options, correctIdx: correctIdx });
    }
    questionIdx = 0;
    results = [];
    renderMatch();
  }

  function renderMatch() {
    if (nav) {
      nav.goToScreen('match');
    }
    const el = document.getElementById('screen-match');
    const q = questions[questionIdx];
    const set = new Set();
    for (let i = 0; i < q.n; i++) {
      set.add(i);
    }

    el.innerHTML =
      `${buildProgressDots()}<div class="question-text">Which equals ${q.n}/${q.d}?</div>` +
      `<div style="text-align:center;">${buildCircleSVG(q.d, set, 140, false)}</div>` +
      `<div class="options-grid">${q.options
        .map(function (opt, idx) {
          return `<button class="option-btn" data-idx="${idx}">${opt[0]}/${opt[1]}</button>`;
        })
        .join('')}</div>` +
      '<div class="feedback" id="feedback"></div>';

    let answered = false;
    el.querySelectorAll('.option-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (answered) {
          return;
        }
        answered = true;
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const correct = idx === q.correctIdx;
        results.push({ correct: correct });

        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) {
          el.querySelectorAll('.option-btn')[q.correctIdx].classList.add('correct');
        }

        const fb = document.getElementById('feedback');
        fb.className = `feedback ${correct ? 'correct' : 'wrong'}`;
        fb.textContent = correct
          ? '✓ Correct!'
          : `✗ ${q.options[q.correctIdx][0]}/${q.options[q.correctIdx][1]} = ${q.n}/${q.d}`;

        setTimeout(function () {
          questionIdx++;
          if (questionIdx >= questions.length) {
            showResults();
          } else {
            renderMatch();
          }
        }, 1500);
      });
    });
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
      '<div class="section-title">Round Complete!</div>' +
      '<div class="stats-grid">' +
      `<div class="stat-card"><div class="value">${correctCount}/${results.length}</div><div class="label">Correct</div></div>` +
      `<div class="stat-card"><div class="value">${pct}%</div><div class="label">Accuracy</div></div>` +
      '</div>' +
      '<div class="btn-row">' +
      '<button class="dom-btn dom-btn--primary" id="res-again">Play Again</button>' +
      '<button class="dom-btn dom-btn--ghost" id="res-home">Home</button>' +
      '</div>';

    el.querySelector('#res-again').addEventListener('click', function () {
      if (mode === 'compare') {
        startCompare();
      } else if (mode === 'practice') {
        startPractice();
      } else {
        startMatch();
      }
    });
    el.querySelector('#res-home').addEventListener('click', renderLanding);
  }

  // ─── Helpers ────────────────────────────────────────
  function buildProgressDots() {
    let html = '<div class="progress-row">';
    for (let i = 0; i < questions.length; i++) {
      let cls = 'progress-dot';
      if (results[i]) {
        cls += results[i].correct ? ' correct' : ' wrong';
      }
      if (i === questionIdx) {
        cls += ' current';
      }
      html += `<div class="${cls}">${i + 1}</div>`;
    }
    return `${html}</div>`;
  }
})();

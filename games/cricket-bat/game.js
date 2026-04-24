(function () {
  'use strict';

  // Game state
  const state = {
    runs: 0,
    wickets: 0,
    maxWickets: 3,
    ballsThisOver: 0,
    ballsPerOver: 6,
    over: 1,
    phase: 'idle', // idle | bowling | swinging | result | over
    animFrame: null,
    gameActive: false
  };

  // Ball animation state
  const ball = {
    x: 5, // percentage of field width (0-100)
    speed: 1.2, // percentage per frame
    active: false
  };

  // DOM refs
  const navMeta = document.getElementById('nav-meta');
  const field = document.getElementById('field');
  const ballEl = document.getElementById('ball');
  const batEl = document.getElementById('bat');
  const fieldInstructions = document.getElementById('field-instructions');
  const resultOverlay = document.getElementById('result-overlay');
  const resultText = document.getElementById('result-text');
  const fieldHint = document.getElementById('field-hint');
  const nextBallBtn = document.getElementById('btn-next-ball');
  const startBtn = document.getElementById('btn-start');
  const playAgainBtn = document.getElementById('btn-play-again');

  // Score display elements
  const scoreRuns = document.getElementById('score-runs');
  const scoreBalls = document.getElementById('score-balls');
  const scoreWickets = document.getElementById('score-wickets');
  const overText = document.getElementById('over-text');
  const ballCounter = document.getElementById('ball-counter');

  // Show/hide screens
  function showScreen(id) {
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
    }
  }

  // Update nav meta (runs · wickets)
  function updateMeta() {
    navMeta.textContent = `${state.runs} runs · ${state.maxWickets - state.wickets} wickets`;
  }

  // Update score board display
  function updateScoreBoard() {
    scoreRuns.textContent = state.runs;
    scoreBalls.textContent = `${state.ballsThisOver}/6`;
    scoreWickets.textContent = `${state.wickets}/3`;
    overText.textContent = `Over ${state.over}`;

    // Update ball counter dots
    ballCounter.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement('div');
      dot.className = 'ball-dot';
      if (i < state.ballsThisOver) {
        dot.classList.add('bowled');
      }
      ballCounter.appendChild(dot);
    }
  }

  // Position ball and bat on field
  function renderGame() {
    const fieldWidth = field.offsetWidth;
    const ballPosition = (ball.x / 100) * fieldWidth;
    ballEl.style.left = `${ballPosition}px`;
  }

  // Bowl a ball - start animation
  function bowl() {
    if (state.phase !== 'idle' || !state.gameActive) {
      return;
    }

    state.phase = 'bowling';
    ball.x = 5;
    ball.active = true;
    fieldInstructions.style.display = 'none';
    fieldHint.textContent = 'Click now!';
    animateBall();
  }

  // Animate ball traveling across field
  function animateBall() {
    ball.x += ball.speed;
    renderGame();

    if (ball.x > 95) {
      // Ball passed — MISS (dot ball)
      ball.active = false;
      handleResult('miss');
      return;
    }

    state.animFrame = requestAnimationFrame(animateBall);
  }

  // Player swings bat
  function swing() {
    if (state.phase !== 'bowling' || !ball.active) {
      return;
    }

    // Cancel animation
    cancelAnimationFrame(state.animFrame);
    ball.active = false;
    state.phase = 'swinging';

    // Animate bat swing
    batEl.classList.add('swinging');
    setTimeout(() => {
      batEl.classList.remove('swinging');
    }, 300);

    // Determine result based on ball position
    let result;
    if (ball.x >= 40 && ball.x <= 55) {
      result = 'six';
    } else if ((ball.x >= 30 && ball.x < 40) || (ball.x > 55 && ball.x <= 65)) {
      result = 'four';
    } else if ((ball.x >= 20 && ball.x < 30) || (ball.x > 65 && ball.x <= 75)) {
      result = 'single';
    } else {
      result = 'miss';
    }

    handleResult(result);
  }

  // Handle result of the ball
  function handleResult(result) {
    state.phase = 'result';
    state.ballsThisOver++;

    let runsScored = 0;
    let msg = '';
    let resultClass = '';

    switch (result) {
      case 'six':
        runsScored = 6;
        msg = 'SIX!';
        resultClass = 'six';
        break;
      case 'four':
        runsScored = 4;
        msg = 'FOUR!';
        resultClass = 'four';
        break;
      case 'single':
        runsScored = Math.random() > 0.5 ? 2 : 1;
        msg = runsScored + (runsScored > 1 ? ' Runs' : ' Run');
        resultClass = 'single';
        break;
      case 'miss':
      default:
        state.wickets++;
        msg = 'OUT!';
        resultClass = 'out';
        break;
    }

    state.runs += runsScored;
    updateMeta();
    updateScoreBoard();

    // Show result overlay
    showResult(msg, resultClass);

    // Wait before moving to next ball or game end
    setTimeout(() => {
      resultOverlay.classList.remove('active');
      resultOverlay.style.display = 'none';

      if (state.wickets >= state.maxWickets) {
        endGame();
      } else if (state.ballsThisOver >= state.ballsPerOver) {
        startOver();
      } else {
        state.phase = 'idle';
        fieldInstructions.style.display = 'block';
        fieldHint.textContent = 'Click or tap the field to swing';
        renderGame();
      }
    }, 1200);
  }

  // Display result overlay
  function showResult(msg, resultClass) {
    resultText.textContent = msg;
    resultText.className = `result-text ${resultClass}`;
    resultOverlay.style.display = 'flex';
    resultOverlay.classList.add('active');
  }

  // Start new over
  function startOver() {
    state.over++;
    state.ballsThisOver = 0;
    state.phase = 'idle';
    updateScoreBoard();
    fieldInstructions.style.display = 'block';
    fieldHint.textContent = 'Click or tap the field to swing';
    renderGame();
  }

  // End game
  function endGame() {
    state.gameActive = false;
    showScreen('screen-end');

    // Calculate performance message
    const finalScore = state.runs;
    document.getElementById('final-score').textContent = finalScore;

    let performanceMsg = '';
    if (finalScore >= 36) {
      performanceMsg = 'Excellent! You played a great innings!';
    } else if (finalScore >= 24) {
      performanceMsg = 'Great job! You scored some solid runs!';
    } else if (finalScore >= 12) {
      performanceMsg = 'Good effort! Keep practicing your timing!';
    } else if (finalScore >= 6) {
      performanceMsg = 'Nice start! Try to time your shots better!';
    } else {
      performanceMsg = 'Keep trying! Practice makes perfect!';
    }

    document.getElementById('performance-text').textContent = performanceMsg;
  }

  // Initialize game
  function initGame() {
    state.runs = 0;
    state.wickets = 0;
    state.ballsThisOver = 0;
    state.over = 1;
    state.phase = 'idle';
    state.gameActive = true;

    // Reset ball position
    ball.x = 5;
    ball.active = false;

    updateMeta();
    updateScoreBoard();
    renderGame();

    fieldInstructions.style.display = 'block';
    fieldHint.textContent = 'Click or tap the field to swing';
  }

  // Event listeners
  startBtn.addEventListener('click', () => {
    initGame();
    showScreen('screen-game');
  });

  playAgainBtn.addEventListener('click', () => {
    initGame();
    showScreen('screen-game');
  });

  nextBallBtn.addEventListener('click', () => {
    if (state.phase === 'idle' && state.gameActive) {
      bowl();
    }
  });

  // Field click to swing
  field.addEventListener('click', () => {
    if (state.phase === 'bowling' && ball.active && state.gameActive) {
      swing();
    } else if (state.phase === 'idle' && state.gameActive && !ball.active) {
      bowl();
    }
  });

  // Touch support for field
  field.addEventListener('touchstart', e => {
    e.preventDefault();
    if (state.phase === 'bowling' && ball.active && state.gameActive) {
      swing();
    } else if (state.phase === 'idle' && state.gameActive && !ball.active) {
      bowl();
    }
  });

  // Keyboard support (spacebar to swing or bowl)
  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (state.phase === 'bowling' && ball.active && state.gameActive) {
        swing();
      } else if (state.phase === 'idle' && state.gameActive && !ball.active) {
        bowl();
      }
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    renderGame();
  });

  // Initialize on page load
  showScreen('screen-start');
})();

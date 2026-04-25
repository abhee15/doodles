(function () {
  'use strict';

  const state = {
    runs: 0,
    wickets: 0,
    maxWickets: 3,
    ballsFaced: 0,
    ballsPerOver: 6,
    over: 1,
    phase: 'ready',
    gameActive: false,
    ballX: 0,
    animId: null
  };

  const BALL_START_X = 8;
  const BALL_SPEED = 1.8;
  const BALL_TARGET_X = 92;

  const elements = {
    navMeta: document.getElementById('nav-meta'),
    field: document.getElementById('field'),
    ball: document.getElementById('ball'),
    batsmanBat: document.getElementById('batsman-bat'),
    bowler: document.getElementById('bowler'),
    bowlerArm: document.getElementById('bowler-arm'),
    fieldLabel: document.getElementById('field-label'),
    fieldHint: document.getElementById('field-hint'),
    resultPopup: document.getElementById('result-popup'),
    resultMsg: document.getElementById('result-msg'),
    celebration: document.getElementById('celebration'),
    scoreRuns: document.getElementById('score-runs'),
    scoreOver: document.getElementById('score-over'),
    scoreWickets: document.getElementById('score-wickets'),
    overText: document.getElementById('over-text'),
    ballDots: document.getElementById('ball-dots'),
    finalScore: document.getElementById('final-score'),
    feedback: document.getElementById('feedback')
  };

  function showScreen(id) {
    document.querySelectorAll('.dom-screen').forEach(el => {
      el.classList.toggle('active', el.dataset.screen === id);
    });
  }

  function updateMeta() {
    elements.navMeta.textContent = `${state.runs} runs · ${state.wickets}/${state.maxWickets} wickets`;
  }

  function updateScore() {
    elements.scoreRuns.textContent = state.runs;
    elements.scoreOver.textContent = state.over;
    elements.scoreWickets.textContent = state.maxWickets - state.wickets;
    elements.overText.textContent = `Over ${state.over} · Ball ${Math.min(state.ballsFaced + 1, 6)} of 6`;
  }

  function updateBallDots() {
    elements.ballDots.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement('div');
      dot.className = `ball-dot${i < state.ballsFaced ? ' faced' : ''}`;
      elements.ballDots.appendChild(dot);
    }
  }

  function positionBall() {
    const fieldWidth = elements.field.offsetWidth;
    elements.ball.style.left = `${(state.ballX / 100) * fieldWidth}px`;
  }

  function bowlBall() {
    if (state.phase !== 'ready' || !state.gameActive) {
      return;
    }

    state.phase = 'bowling';
    state.ballX = BALL_START_X;
    elements.ball.classList.add('active');
    elements.bowler.classList.add('active');
    elements.bowlerArm.classList.add('delivering');
    elements.fieldLabel.textContent = '';
    elements.fieldHint.textContent = 'Tap now!';

    setTimeout(() => {
      elements.bowlerArm.classList.remove('delivering');
    }, 150);

    animateBall();
  }

  function animateBall() {
    state.ballX += BALL_SPEED;
    positionBall();

    if (state.ballX >= BALL_TARGET_X) {
      elements.ball.classList.remove('active');
      elements.bowler.classList.remove('active');
      handleHit('miss');
      return;
    }

    state.animId = requestAnimationFrame(animateBall);
  }

  function swingBat() {
    if (state.phase !== 'bowling') {
      return;
    }

    cancelAnimationFrame(state.animId);
    elements.ball.classList.remove('active');
    elements.bowler.classList.remove('active');
    state.phase = 'swinging';

    elements.batsmanBat.classList.add('swinging');
    setTimeout(() => {
      elements.batsmanBat.classList.remove('swinging');
    }, 300);

    const hitZone = state.ballX;
    let result;
    if (hitZone >= 38 && hitZone <= 56) {
      result = 'six';
    } else if ((hitZone >= 25 && hitZone < 38) || (hitZone > 56 && hitZone <= 69)) {
      result = 'four';
    } else if ((hitZone >= 10 && hitZone < 25) || (hitZone > 69 && hitZone <= 84)) {
      result = 'single';
    } else {
      result = 'miss';
    }

    setTimeout(() => handleHit(result), 100);
  }

  function handleHit(result) {
    state.ballsFaced++;
    let runs = 0;
    let msg = '';
    let cssClass = '';

    switch (result) {
      case 'six':
        runs = 6;
        msg = 'SIX!';
        cssClass = 'six';
        break;
      case 'four':
        runs = 4;
        msg = 'FOUR!';
        cssClass = 'four';
        break;
      case 'single':
        runs = Math.random() > 0.5 ? 2 : 1;
        msg = `${runs} Runs`;
        cssClass = 'single';
        break;
      case 'miss':
      default:
        state.wickets++;
        msg = 'OUT!';
        cssClass = 'miss';
    }

    state.runs += runs;
    updateMeta();
    updateScore();
    updateBallDots();
    showResult(msg, cssClass);

    if (result === 'six' || result === 'four') {
      spawnCelebration();
    }

    setTimeout(() => {
      elements.resultPopup.classList.remove('show');
      elements.fieldLabel.textContent = 'Tap to bat!';
      elements.fieldHint.textContent = 'Time your swing for the sweet spot';

      if (state.wickets >= state.maxWickets) {
        endGame();
      } else if (state.ballsFaced >= state.ballsPerOver) {
        startNewOver();
      } else {
        state.phase = 'ready';
      }
    }, 1200);
  }

  function showResult(msg, cssClass) {
    elements.resultMsg.textContent = msg;
    elements.resultMsg.className = `result-msg ${cssClass}`;
    elements.resultPopup.classList.add('show');
  }

  function spawnCelebration() {
    const colors = ['#22c55e', '#fbbf24', '#f472b6', '#60a5fa', '#f87171'];
    elements.celebration.innerHTML = '';

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle';
      particle.style.left = `${30 + Math.random() * 40}%`;
      particle.style.top = '30%';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = `${Math.random() * 0.3}s`;
      elements.celebration.appendChild(particle);
    }
  }

  function startNewOver() {
    state.over++;
    state.ballsFaced = 0;
    state.phase = 'ready';
    elements.fieldLabel.textContent = 'New Over';
    elements.fieldHint.textContent = 'Tap "Bowl Ball" to continue';
    updateScore();
    updateBallDots();
  }

  function endGame() {
    state.gameActive = false;
    showScreen('end');

    const finalScore = state.runs;
    elements.finalScore.textContent = finalScore;

    let feedback = '';
    if (finalScore >= 36) {
      feedback = "Amazing! You're a cricket legend!";
    } else if (finalScore >= 24) {
      feedback = 'Great batting! Solid performances!';
    } else if (finalScore >= 12) {
      feedback = 'Good effort! Keep practicing!';
    } else if (finalScore >= 6) {
      feedback = 'Nice start! Try timing the green zone!';
    } else {
      feedback = "Keep trying! You'll get better!";
    }
    elements.feedback.textContent = feedback;
  }

  function initGame() {
    state.runs = 0;
    state.wickets = 0;
    state.ballsFaced = 0;
    state.over = 1;
    state.phase = 'ready';
    state.gameActive = true;
    state.ballX = BALL_START_X;

    elements.ball.classList.remove('active');
    elements.bowler.classList.remove('active');
    elements.resultPopup.classList.remove('show');
    elements.celebration.innerHTML = '';

    updateMeta();
    updateScore();
    updateBallDots();
    positionBall();

    elements.fieldLabel.textContent = 'Tap to bat!';
    elements.fieldHint.textContent = 'Time your swing for the sweet spot';

    showScreen('game');
  }

  document.getElementById('btn-start').addEventListener('click', initGame);
  document.getElementById('btn-replay').addEventListener('click', initGame);

  document.getElementById('btn-bowl').addEventListener('click', () => {
    if (state.phase === 'ready' && state.gameActive) {
      bowlBall();
    }
  });

  elements.field.addEventListener('click', () => {
    if (!state.gameActive) {
      return;
    }
    if (state.phase === 'bowling') {
      swingBat();
    } else if (state.phase === 'ready') {
      bowlBall();
    }
  });

  elements.field.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!state.gameActive) {
      return;
    }
    if (state.phase === 'bowling') {
      swingBat();
    } else if (state.phase === 'ready') {
      bowlBall();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!state.gameActive) {
        return;
      }
      if (state.phase === 'bowling') {
        swingBat();
      } else if (state.phase === 'ready') {
        bowlBall();
      }
    }
  });

  window.addEventListener('resize', positionBall);

  showScreen('start');
})();

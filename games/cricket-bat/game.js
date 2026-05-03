(function () {
  'use strict';

  const state = {
    runs: 0,
    wickets: 0,
    maxWkts: 3,
    ballNum: 0,
    ballsPerOver: 6,
    over: 1,
    phase: 'ready',
    gameOn: false,
    ballX: 0,
    animId: null
  };

  const CFG = {
    startX: 6,
    speed: 2.2,
    endX: 94
  };

  const $ = {
    meta: document.getElementById('nav-meta'),
    field: document.getElementById('field'),
    ball: document.getElementById('ball'),
    bat: document.getElementById('bat'),
    bowler: document.getElementById('bowler'),
    bowlArm: document.getElementById('bowl-arm'),
    hint: document.getElementById('tap-hint'),
    flash: document.getElementById('result-flash'),
    msg: document.getElementById('result-msg'),
    sparks: document.getElementById('sparkles'),
    scRuns: document.getElementById('sc-runs'),
    scOver: document.getElementById('sc-over'),
    scWicket: document.getElementById('sc-wicket'),
    overMsg: document.getElementById('over-msg'),
    ballDots: document.getElementById('ball-dots'),
    finalScore: document.getElementById('final-score'),
    finalMsg: document.getElementById('final-msg')
  };

  function screen(id) {
    document.querySelectorAll('.dom-screen').forEach(el => {
      el.classList.toggle('active', el.dataset.screen === id);
    });
  }

  function updateMeta() {
    $.meta.textContent = `${state.runs} runs · ${state.maxWkts - state.wickets} left`;
  }

  function updateScore() {
    $.scRuns.textContent = state.runs;
    $.scOver.textContent = state.over;
    $.scWicket.textContent = state.maxWkts - state.wickets;
    $.overMsg.textContent = `Over ${state.over} · Ball ${Math.min(state.ballNum + 1, 6)} of 6`;
  }

  function updateDots() {
    $.ballDots.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = `ball-pip${i < state.ballNum ? ' done' : ''}`;
      $.ballDots.appendChild(p);
    }
  }

  function moveBall() {
    const fw = $.field.offsetWidth;
    $.ball.style.left = `${(state.ballX / 100) * fw}px`;
  }

  function bowl() {
    if (state.phase !== 'ready' || !state.gameOn) {
      return;
    }

    state.phase = 'bowling';
    state.ballX = CFG.startX;
    $.ball.classList.add('moving');
    $.bowler.classList.add('active');
    $.bowlArm.classList.add('bowl');
    $.hint.textContent = 'TAP NOW!';

    setTimeout(() => $.bowlArm.classList.remove('bowl'), 150);
    runBall();
  }

  function runBall() {
    state.ballX += CFG.speed;
    moveBall();

    if (state.ballX >= CFG.endX) {
      $.ball.classList.remove('moving');
      $.bowler.classList.remove('active');
      hitResult('miss');
      return;
    }
    state.animId = requestAnimationFrame(runBall);
  }

  function swing() {
    if (state.phase !== 'bowling') {
      return;
    }

    cancelAnimationFrame(state.animId);
    $.ball.classList.remove('moving');
    $.bowler.classList.remove('active');
    state.phase = 'swinging';

    $.bat.classList.add('swing');
    setTimeout(() => $.bat.classList.remove('swing'), 250);

    const x = state.ballX;
    let res;
    if (x >= 38 && x <= 62) {
      res = 'six';
    } else if ((x >= 20 && x < 38) || (x > 62 && x <= 80)) {
      res = 'four';
    } else if ((x >= 5 && x < 20) || (x > 80 && x <= 95)) {
      res = 'runs';
    } else {
      res = 'miss';
    }

    setTimeout(() => hitResult(res), 80);
  }

  function hitResult(res) {
    state.ballNum++;
    let runs = 0,
      txt = '',
      cls = '';

    switch (res) {
      case 'six':
        runs = 6;
        txt = 'SIX!';
        cls = 'six';
        break;
      case 'four':
        runs = 4;
        txt = 'FOUR!';
        cls = 'four';
        break;
      case 'runs':
        runs = Math.random() > 0.5 ? 2 : 1;
        txt = `${runs} RUNS`;
        cls = 'runs';
        break;
      default:
        state.wickets++;
        txt = 'OUT!';
        cls = 'out';
    }

    state.runs += runs;
    updateMeta();
    updateScore();
    updateDots();
    showResult(txt, cls);

    if (res === 'six' || res === 'four') {
      showSparks();
    }

    setTimeout(() => {
      $.flash.classList.remove('show');
      $.hint.textContent = 'Tap field to bowl';

      if (state.wickets >= state.maxWkts) {
        endGame();
      } else if (state.ballNum >= state.ballsPerOver) {
        newOver();
      } else {
        state.phase = 'ready';
      }
    }, 1000);
  }

  function showResult(txt, cls) {
    $.msg.textContent = txt;
    $.msg.className = `msg ${cls}`;
    $.flash.classList.add('show');
  }

  function showSparks() {
    const cols = ['#22c55e', '#fbbf24', '#f472b6', '#60a5fa'];
    $.sparks.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = `${30 + Math.random() * 40}%`;
      s.style.top = '30%';
      s.style.background = cols[Math.floor(Math.random() * cols.length)];
      s.style.animationDelay = `${Math.random() * 0.2}s`;
      $.sparks.appendChild(s);
    }
  }

  function newOver() {
    state.over++;
    state.ballNum = 0;
    state.phase = 'ready';
    $.hint.textContent = 'New over - bowl ball';
    updateScore();
    updateDots();
  }

  function endGame() {
    state.gameOn = false;
    screen('outro');
    $.finalScore.textContent = state.runs;

    let cmt = '';
    const s = state.runs;
    if (s >= 36) {
      cmt = 'Incredible! Cricket legend!';
    } else if (s >= 24) {
      cmt = 'Great batting! superstar!';
    } else if (s >= 12) {
      cmt = 'Good effort! keep going!';
    } else if (s >= 6) {
      cmt = 'Nice start! Try green zone!';
    } else {
      cmt = 'Keep trying! You will improve!';
    }

    $.finalMsg.textContent = cmt;
  }

  function startGame() {
    state.runs = 0;
    state.wickets = 0;
    state.ballNum = 0;
    state.over = 1;
    state.phase = 'ready';
    state.gameOn = true;
    state.ballX = CFG.startX;

    $.ball.classList.remove('moving');
    $.bowler.classList.remove('active');
    $.flash.classList.remove('show');
    $.sparks.innerHTML = '';

    updateMeta();
    updateScore();
    updateDots();
    moveBall();
    $.hint.textContent = 'Tap field to bowl';

    screen('game');
  }

  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-replay').addEventListener('click', startGame);
  document.getElementById('btn-bowl').addEventListener('click', () => {
    if (state.phase === 'ready' && state.gameOn) {
      bowl();
    }
  });

  $.field.addEventListener('click', () => {
    if (!state.gameOn) {
      return;
    }
    if (state.phase === 'bowling') {
      swing();
    } else if (state.phase === 'ready') {
      bowl();
    }
  });

  $.field.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!state.gameOn) {
      return;
    }
    if (state.phase === 'bowling') {
      swing();
    } else if (state.phase === 'ready') {
      bowl();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!state.gameOn) {
        return;
      }
      if (state.phase === 'bowling') {
        swing();
      } else if (state.phase === 'ready') {
        bowl();
      }
    }
  });

  window.addEventListener('resize', moveBall);

  screen('intro');
})();

(function () {
  'use strict';

  const canvas = document.getElementById('court');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const maxW = Math.min(600, window.innerWidth - 16);
    const ratio = canvas.height / canvas.width;
    canvas.style.width = `${maxW}px`;
    canvas.style.height = `${maxW * ratio}px`;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const W = canvas.width;
  const H = canvas.height;

  const PADDLE_W = 12,
    PADDLE_H = 70;
  const BALL_R = 8;
  const WIN_SCORE = 11;

  const state = {
    running: false,
    playerY: H / 2 - PADDLE_H / 2,
    cpuY: H / 2 - PADDLE_H / 2,
    ball: { x: W / 2, y: H / 2, vx: 4, vy: 3 },
    scorePlayer: 0,
    scoreCpu: 0,
    animId: null
  };

  let mouseY = H / 2;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const scaleY = H / rect.height;
    mouseY = (e.clientY - rect.top) * scaleY;
  });

  canvas.addEventListener(
    'touchmove',
    e => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleY = H / rect.height;
      mouseY = (e.touches[0].clientY - rect.top) * scaleY;
    },
    { passive: false }
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
      mouseY = Math.max(mouseY - 20, PADDLE_H / 2);
    }
    if (e.key === 'ArrowDown') {
      mouseY = Math.min(mouseY + 20, H - PADDLE_H / 2);
    }
  });

  function updateScore() {
    document.getElementById('score-player').textContent = state.scorePlayer;
    document.getElementById('score-cpu').textContent = state.scoreCpu;
  }

  function resetBall(toRight) {
    state.ball.x = W / 2;
    state.ball.y = H / 2;
    state.ball.vx = toRight ? 4 : -4;
    state.ball.vy = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2);
  }

  function gameLoop() {
    if (!state.running) {
      return;
    }

    state.playerY += (mouseY - PADDLE_H / 2 - state.playerY) * 0.2;
    state.playerY = Math.max(0, Math.min(H - PADDLE_H, state.playerY));

    const cpuCenter = state.cpuY + PADDLE_H / 2;
    const cpuSpeed = 3.5;
    if (state.ball.y < cpuCenter - 8) {
      state.cpuY -= cpuSpeed;
    } else if (state.ball.y > cpuCenter + 8) {
      state.cpuY += cpuSpeed;
    }
    state.cpuY = Math.max(0, Math.min(H - PADDLE_H, state.cpuY));

    state.ball.x += state.ball.vx;
    state.ball.y += state.ball.vy;

    if (state.ball.y - BALL_R <= 0) {
      state.ball.y = BALL_R;
      state.ball.vy = Math.abs(state.ball.vy);
    }
    if (state.ball.y + BALL_R >= H) {
      state.ball.y = H - BALL_R;
      state.ball.vy = -Math.abs(state.ball.vy);
    }

    if (
      state.ball.x - BALL_R <= 20 + PADDLE_W &&
      state.ball.y >= state.playerY &&
      state.ball.y <= state.playerY + PADDLE_H &&
      state.ball.vx < 0
    ) {
      state.ball.vx = Math.abs(state.ball.vx) * 1.05;
      const hitPos = (state.ball.y - state.playerY) / PADDLE_H - 0.5;
      state.ball.vy = hitPos * 8;
    }

    if (
      state.ball.x + BALL_R >= W - 20 - PADDLE_W &&
      state.ball.y >= state.cpuY &&
      state.ball.y <= state.cpuY + PADDLE_H &&
      state.ball.vx > 0
    ) {
      state.ball.vx = -Math.abs(state.ball.vx) * 1.05;
      const hitPos = (state.ball.y - state.cpuY) / PADDLE_H - 0.5;
      state.ball.vy = hitPos * 8;
    }

    const speed = Math.sqrt(state.ball.vx ** 2 + state.ball.vy ** 2);
    if (speed > 14) {
      state.ball.vx *= 14 / speed;
      state.ball.vy *= 14 / speed;
    }

    if (state.ball.x < 0) {
      state.scoreCpu++;
      updateScore();
      if (state.scoreCpu >= WIN_SCORE) {
        endGame(false);
        return;
      }
      resetBall(true);
    }
    if (state.ball.x > W) {
      state.scorePlayer++;
      updateScore();
      if (state.scorePlayer >= WIN_SCORE) {
        endGame(true);
        return;
      }
      resetBall(false);
    }

    draw();
    state.animId = requestAnimationFrame(gameLoop);
  }

  function draw() {
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, W, H);

    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(W / 2 - 2, 0, 4, H);

    ctx.fillStyle = '#f97316';
    ctx.fillRect(20, state.playerY, PADDLE_W, PADDLE_H);

    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(W - 20 - PADDLE_W, state.cpuY, PADDLE_W, PADDLE_H);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(state.ball.x, state.ball.y, BALL_R, 0, Math.PI * 2);
    ctx.fill();
  }

  function endGame(playerWon) {
    state.running = false;
    cancelAnimationFrame(state.animId);
    const overlay = document.getElementById('overlay-end');
    document.getElementById('end-title').textContent = playerWon ? 'You Win!' : 'CPU Wins!';
    document.getElementById('end-score').textContent = `${state.scorePlayer} – ${state.scoreCpu}`;
    overlay.classList.remove('hidden');
  }

  function startGame() {
    state.scorePlayer = 0;
    state.scoreCpu = 0;
    state.playerY = H / 2 - PADDLE_H / 2;
    state.cpuY = H / 2 - PADDLE_H / 2;
    resetBall(true);
    state.running = true;
    updateScore();
    document.getElementById('overlay-start').classList.add('hidden');
    document.getElementById('overlay-end').classList.add('hidden');
    gameLoop();
  }

  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-restart').addEventListener('click', startGame);
})();

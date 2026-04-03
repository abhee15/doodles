'use strict';
(function () {
  // ── Constants ────────────────────────────────────────────────────────────────
  const GW = 800,
    GH = 520;
  const GRAVITY = 0.55;
  const JUMP_V = -13.2;
  const RUN_SPD = 4.4;
  const MAX_FALL = 15;
  const PW = 26,
    PH = 36; // player bounding box
  const EH = 28; // enemy height (walk enemies)
  const COYOTE_MS = 110;
  const JUMPBUF_MS = 130;

  // ── Canvas ───────────────────────────────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.width = GW;
  canvas.height = GH;
  document.getElementById('game-container').appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    const cont = document.getElementById('game-container');
    const s = Math.min(cont.clientWidth / GW, cont.clientHeight / GH);
    canvas.style.width = `${Math.round(GW * s)}px`;
    canvas.style.height = `${Math.round(GH * s)}px`;
  }
  window.addEventListener('resize', resize);
  resize();

  // ── Level Data ───────────────────────────────────────────────────────────────
  // Platform: {x, y, w, h}   Enemy: {type, x, y, dir}   Coin: {x, y}
  // Walking enemy y = platform.y - EH

  const LEVELS = [
    // ── Level 1: Grassland ───────────────────────────────────────────────────
    {
      name: 'Grassland',
      theme: 'grass',
      width: 3300,
      platforms: [
        // Ground segments (gaps at 820-940, 1560-1690, 2180-2310, 2740-2870)
        { x: 0, y: 430, w: 820, h: 90 },
        { x: 940, y: 430, w: 620, h: 90 },
        { x: 1690, y: 430, w: 490, h: 90 },
        { x: 2310, y: 430, w: 430, h: 90 },
        { x: 2870, y: 430, w: 500, h: 90 },
        // Floating platforms
        { x: 200, y: 320, w: 130, h: 18 },
        { x: 450, y: 255, w: 110, h: 18 },
        { x: 680, y: 320, w: 130, h: 18 },
        { x: 1010, y: 305, w: 140, h: 18 },
        { x: 1220, y: 240, w: 110, h: 18 },
        { x: 1430, y: 305, w: 120, h: 18 },
        { x: 1760, y: 345, w: 110, h: 18 },
        { x: 1900, y: 275, w: 120, h: 18 },
        { x: 2080, y: 340, w: 110, h: 18 },
        { x: 2380, y: 305, w: 120, h: 18 },
        { x: 2560, y: 240, w: 110, h: 18 },
        { x: 2960, y: 310, w: 130, h: 18 }
      ],
      enemies: [
        // ground (y=430 → enemy y=402)
        { type: 'mushroom', x: 380, y: 402, dir: 1 },
        { type: 'mushroom', x: 1080, y: 402, dir: -1 },
        { type: 'mushroom', x: 1790, y: 402, dir: 1 },
        { type: 'mushroom', x: 2420, y: 402, dir: -1 },
        { type: 'mushroom', x: 2980, y: 402, dir: 1 },
        // float (platform y=240 → enemy y=212)
        { type: 'mushroom', x: 1230, y: 212, dir: 1 },
        { type: 'mushroom', x: 2570, y: 212, dir: -1 }
      ],
      coins: [
        { x: 215, y: 292 },
        { x: 248, y: 292 },
        { x: 462, y: 227 },
        { x: 496, y: 227 },
        { x: 694, y: 292 },
        { x: 728, y: 292 },
        { x: 1022, y: 277 },
        { x: 1056, y: 277 },
        { x: 1232, y: 212 },
        { x: 1266, y: 212 },
        { x: 1443, y: 277 },
        { x: 1477, y: 277 },
        { x: 1772, y: 317 },
        { x: 1806, y: 317 },
        { x: 1912, y: 247 },
        { x: 1946, y: 247 },
        { x: 2392, y: 277 },
        { x: 2426, y: 277 },
        { x: 2572, y: 212 },
        { x: 2606, y: 212 },
        // ground coins in gaps
        { x: 870, y: 402 },
        { x: 900, y: 402 },
        { x: 1620, y: 402 },
        { x: 1648, y: 402 },
        { x: 2240, y: 402 },
        { x: 2268, y: 402 }
      ],
      flagX: 3200
    },

    // ── Level 2: Desert ──────────────────────────────────────────────────────
    {
      name: 'Desert',
      theme: 'sand',
      width: 4100,
      platforms: [
        // Ground with wider gaps
        { x: 0, y: 430, w: 680, h: 90 },
        { x: 790, y: 430, w: 520, h: 90 },
        { x: 1430, y: 430, w: 440, h: 90 },
        { x: 1990, y: 430, w: 500, h: 90 },
        { x: 2620, y: 430, w: 440, h: 90 },
        { x: 3200, y: 430, w: 520, h: 90 },
        { x: 3850, y: 430, w: 350, h: 90 },
        // Floating
        { x: 180, y: 320, w: 120, h: 18 },
        { x: 420, y: 250, w: 110, h: 18 },
        { x: 600, y: 310, w: 120, h: 18 },
        { x: 860, y: 295, w: 130, h: 18 },
        { x: 1080, y: 235, w: 110, h: 18 },
        { x: 1280, y: 300, w: 110, h: 18 },
        { x: 1500, y: 310, w: 110, h: 18 },
        { x: 1700, y: 240, w: 120, h: 18 },
        { x: 1860, y: 300, w: 110, h: 18 },
        { x: 2060, y: 310, w: 110, h: 18 },
        { x: 2260, y: 245, w: 120, h: 18 },
        { x: 2460, y: 310, w: 110, h: 18 },
        { x: 2700, y: 300, w: 120, h: 18 },
        { x: 2900, y: 235, w: 120, h: 18 },
        { x: 3100, y: 305, w: 110, h: 18 },
        { x: 3290, y: 300, w: 120, h: 18 },
        { x: 3500, y: 240, w: 120, h: 18 },
        { x: 3710, y: 310, w: 120, h: 18 }
      ],
      enemies: [
        { type: 'crab', x: 300, y: 402, dir: 1 },
        { type: 'crab', x: 950, y: 402, dir: -1 },
        { type: 'crab', x: 1090, y: 207, dir: 1 },
        { type: 'crab', x: 1530, y: 402, dir: 1 },
        { type: 'crab', x: 1710, y: 212, dir: -1 },
        { type: 'crab', x: 2080, y: 402, dir: 1 },
        { type: 'crab', x: 2270, y: 217, dir: 1 },
        { type: 'crab', x: 2720, y: 402, dir: -1 },
        { type: 'crab', x: 2912, y: 207, dir: 1 },
        { type: 'crab', x: 3380, y: 402, dir: 1 },
        { type: 'crab', x: 3512, y: 212, dir: -1 }
      ],
      coins: [
        { x: 192, y: 292 },
        { x: 224, y: 292 },
        { x: 432, y: 222 },
        { x: 464, y: 222 },
        { x: 872, y: 267 },
        { x: 904, y: 267 },
        { x: 1092, y: 207 },
        { x: 1124, y: 207 },
        { x: 1292, y: 272 },
        { x: 1322, y: 272 },
        { x: 1712, y: 212 },
        { x: 1744, y: 212 },
        { x: 2072, y: 282 },
        { x: 2104, y: 282 },
        { x: 2272, y: 217 },
        { x: 2304, y: 217 },
        { x: 2912, y: 207 },
        { x: 2944, y: 207 },
        { x: 3502, y: 212 },
        { x: 3534, y: 212 },
        { x: 3722, y: 282 },
        { x: 3754, y: 282 },
        // gap coins
        { x: 730, y: 402 },
        { x: 758, y: 402 },
        { x: 1380, y: 402 },
        { x: 1408, y: 402 },
        { x: 2550, y: 402 },
        { x: 2578, y: 402 }
      ],
      flagX: 4000
    },

    // ── Level 3: Castle ──────────────────────────────────────────────────────
    {
      name: 'Castle',
      theme: 'castle',
      width: 4600,
      platforms: [
        // Ground with lava gaps
        { x: 0, y: 430, w: 560, h: 90 },
        { x: 680, y: 430, w: 440, h: 90 },
        { x: 1250, y: 430, w: 420, h: 90 },
        { x: 1820, y: 430, w: 380, h: 90 },
        { x: 2360, y: 430, w: 440, h: 90 },
        { x: 2960, y: 430, w: 400, h: 90 },
        { x: 3530, y: 430, w: 430, h: 90 },
        { x: 4140, y: 430, w: 560, h: 90 },
        // High platforms
        { x: 180, y: 310, w: 130, h: 18 },
        { x: 380, y: 245, w: 110, h: 18 },
        { x: 620, y: 305, w: 120, h: 18 },
        { x: 780, y: 245, w: 120, h: 18 },
        { x: 980, y: 305, w: 110, h: 18 },
        { x: 1160, y: 245, w: 120, h: 18 },
        { x: 1360, y: 310, w: 110, h: 18 },
        { x: 1550, y: 248, w: 120, h: 18 },
        { x: 1720, y: 308, w: 110, h: 18 },
        { x: 1900, y: 248, w: 110, h: 18 },
        { x: 2080, y: 305, w: 120, h: 18 },
        { x: 2280, y: 248, w: 120, h: 18 },
        { x: 2460, y: 310, w: 110, h: 18 },
        { x: 2650, y: 248, w: 120, h: 18 },
        { x: 2840, y: 310, w: 110, h: 18 },
        { x: 3030, y: 248, w: 130, h: 18 },
        { x: 3240, y: 310, w: 110, h: 18 },
        { x: 3430, y: 250, w: 120, h: 18 },
        { x: 3620, y: 310, w: 130, h: 18 },
        { x: 3830, y: 248, w: 110, h: 18 },
        { x: 4020, y: 310, w: 120, h: 18 },
        { x: 4220, y: 250, w: 120, h: 18 },
        { x: 4420, y: 310, w: 110, h: 18 }
      ],
      enemies: [
        // Bats (fly, need oy = initial y)
        { type: 'bat', x: 300, y: 280, dir: 1, oy: 280 },
        { type: 'bat', x: 700, y: 230, dir: -1, oy: 230 },
        { type: 'bat', x: 1100, y: 275, dir: 1, oy: 275 },
        { type: 'bat', x: 1500, y: 228, dir: -1, oy: 228 },
        { type: 'bat', x: 1900, y: 268, dir: 1, oy: 268 },
        { type: 'bat', x: 2300, y: 228, dir: -1, oy: 228 },
        { type: 'bat', x: 2700, y: 278, dir: 1, oy: 278 },
        { type: 'bat', x: 3100, y: 228, dir: -1, oy: 228 },
        { type: 'bat', x: 3500, y: 278, dir: 1, oy: 278 },
        { type: 'bat', x: 3900, y: 228, dir: -1, oy: 228 },
        { type: 'bat', x: 4200, y: 278, dir: 1, oy: 278 },
        // Ground walkers
        { type: 'mushroom', x: 800, y: 402, dir: 1 },
        { type: 'mushroom', x: 1380, y: 402, dir: -1 },
        { type: 'mushroom', x: 2050, y: 402, dir: 1 },
        { type: 'mushroom', x: 2750, y: 402, dir: -1 },
        { type: 'mushroom', x: 3600, y: 402, dir: 1 },
        { type: 'mushroom', x: 4250, y: 402, dir: -1 }
      ],
      coins: [
        { x: 192, y: 282 },
        { x: 226, y: 282 },
        { x: 392, y: 217 },
        { x: 426, y: 217 },
        { x: 632, y: 277 },
        { x: 666, y: 277 },
        { x: 792, y: 217 },
        { x: 826, y: 217 },
        { x: 1172, y: 217 },
        { x: 1206, y: 217 },
        { x: 1562, y: 220 },
        { x: 1596, y: 220 },
        { x: 1912, y: 220 },
        { x: 1946, y: 220 },
        { x: 2292, y: 220 },
        { x: 2326, y: 220 },
        { x: 2662, y: 220 },
        { x: 2696, y: 220 },
        { x: 3042, y: 220 },
        { x: 3076, y: 220 },
        { x: 3442, y: 222 },
        { x: 3476, y: 222 },
        { x: 3842, y: 220 },
        { x: 3876, y: 220 },
        { x: 4232, y: 222 },
        { x: 4266, y: 222 },
        // gap coins (above lava = dangerous!)
        { x: 618, y: 380 },
        { x: 646, y: 380 },
        { x: 1190, y: 380 },
        { x: 1218, y: 380 },
        { x: 2310, y: 380 },
        { x: 2338, y: 380 }
      ],
      flagX: 4500
    }
  ];

  // ── Game State ───────────────────────────────────────────────────────────────
  const gs = {
    mode: 'menu', // menu | playing | levelComplete | gameOver | victory
    level: 0,
    lives: 3,
    score: 0,
    coins: 0,
    bestScore: parseInt(localStorage.getItem('pq-best') || '0')
  };

  let player = {},
    enemies = [],
    coins = [],
    cam = { x: 0 };
  const keys = {},
    touch = { left: false, right: false, jump: false };
  let coyoteMs = 0,
    jumpBufMs = 0,
    prevBottom = 0;
  let playerDir = 1,
    animT = 0;
  let now = 0; // current frame timestamp
  let lastTime = 0;

  // ── Input ────────────────────────────────────────────────────────────────────
  window.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
      jumpBufMs = JUMPBUF_MS;
      e.preventDefault();
    }
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', e => {
    keys[e.code] = false;
  });

  // Mobile controls
  function bindMobBtn(id, prop) {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    const press = ev => {
      ev.preventDefault();
      touch[prop] = true;
      el.classList.add('pressed');
      if (prop === 'jump') {
        jumpBufMs = JUMPBUF_MS;
      }
    };
    const release = ev => {
      ev.preventDefault();
      touch[prop] = false;
      el.classList.remove('pressed');
    };
    el.addEventListener('touchstart', press, { passive: false });
    el.addEventListener('touchend', release, { passive: false });
    el.addEventListener('touchcancel', release, { passive: false });
    el.addEventListener('mousedown', press);
    el.addEventListener('mouseup', release);
    el.addEventListener('mouseleave', release);
  }

  canvas.addEventListener(
    'touchstart',
    () => {
      const btns = document.getElementById('mobile-btns');
      if (btns.style.display !== 'flex') {
        btns.style.display = 'flex';
      }
    },
    { passive: true, once: true }
  );

  bindMobBtn('btn-left', 'left');
  bindMobBtn('btn-right', 'right');
  bindMobBtn('btn-jump', 'jump');

  // ── Level Init ───────────────────────────────────────────────────────────────
  function initLevel(lvlIdx) {
    const lvl = LEVELS[lvlIdx];
    player = { x: 80, y: lvl.platforms[0].y - PH, vx: 0, vy: 0, onGround: false, invMs: 0 };
    playerDir = 1;
    animT = 0;

    // Clone enemies and compute patrol range
    enemies = lvl.enemies.map(e => {
      const en = Object.assign({}, e, { dead: false });
      if (e.type === 'bat') {
        en.minX = e.x - 110;
        en.maxX = e.x + 110;
      } else {
        // Find standing platform
        let minX = e.x - 60,
          maxX = e.x + 60;
        for (const p of lvl.platforms) {
          if (e.x >= p.x - 5 && e.x + 25 <= p.x + p.w + 5 && Math.abs(e.y + EH - p.y) < 12) {
            minX = p.x + 4;
            maxX = p.x + p.w - 34;
            break;
          }
        }
        en.minX = minX;
        en.maxX = maxX;
      }
      return en;
    });

    coins = lvl.coins.map(c => Object.assign({}, c, { taken: false }));
    cam = { x: 0 };
    coyoteMs = 0;
    jumpBufMs = 0;
    prevBottom = 0;
  }

  // ── Collision ─────────────────────────────────────────────────────────────────
  function overlaps(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  // ── Audio ─────────────────────────────────────────────────────────────────────
  let audioCtx;
  function ac() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (_e) {
        /* no audio support */
      }
    }
    return audioCtx;
  }

  function tone(freq, type, vol, dur, delay) {
    const a = ac();
    if (!a) {
      return;
    }
    try {
      const osc = a.createOscillator();
      const g = a.createGain();
      osc.connect(g);
      g.connect(a.destination);
      osc.type = type;
      osc.frequency.value = freq;
      const t0 = a.currentTime + (delay || 0);
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      osc.start(t0);
      osc.stop(t0 + dur);
    } catch (_e) {
      /* audio error — ignore */
    }
  }
  function sndJump() {
    tone(380, 'square', 0.15, 0.12);
    tone(520, 'square', 0.1, 0.08, 0.07);
  }
  function sndCoin() {
    tone(880, 'sine', 0.22, 0.09);
    tone(1100, 'sine', 0.18, 0.09, 0.07);
  }
  function sndStomp() {
    tone(180, 'square', 0.28, 0.12);
    tone(140, 'square', 0.2, 0.1, 0.1);
  }
  function sndHurt() {
    tone(200, 'sawtooth', 0.28, 0.25);
  }
  function sndDie() {
    [440, 330, 220].forEach((f, i) => tone(f, 'sawtooth', 0.25, 0.14, i * 0.12));
  }
  function sndWin() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 'sine', 0.28, 0.18, i * 0.11));
  }

  // ── Update ───────────────────────────────────────────────────────────────────
  function updateGame(dt) {
    const lvl = LEVELS[gs.level];
    const plats = lvl.platforms;
    animT += dt * 0.15;

    // Input
    const goLeft = keys['ArrowLeft'] || keys['KeyA'] || touch.left;
    const goRight = keys['ArrowRight'] || keys['KeyD'] || touch.right;
    const goJump = keys['Space'] || keys['ArrowUp'] || keys['KeyW'] || touch.jump;

    // Horizontal
    if (goLeft) {
      player.vx = -RUN_SPD;
      playerDir = -1;
    } else if (goRight) {
      player.vx = RUN_SPD;
      playerDir = 1;
    } else {
      player.vx *= 0.68;
    }

    // Gravity
    player.vy = Math.min(player.vy + GRAVITY * dt, MAX_FALL);

    // Coyote time
    if (player.onGround) {
      coyoteMs = COYOTE_MS;
    } else {
      coyoteMs = Math.max(0, coyoteMs - dt * 16.67);
    }

    // Jump buffer countdown
    if (jumpBufMs > 0) {
      jumpBufMs = Math.max(0, jumpBufMs - dt * 16.67);
    }

    // Execute jump
    if (jumpBufMs > 0 && coyoteMs > 0) {
      player.vy = JUMP_V;
      jumpBufMs = 0;
      coyoteMs = 0;
      sndJump();
    }

    // Variable jump height (cut short when key released)
    if (!goJump && player.vy < -5) {
      player.vy += 0.9 * dt;
    }

    // Store prev bottom for stomp detection
    prevBottom = player.y + PH;

    // Move X → resolve X collisions
    player.x += player.vx * dt;
    player.x = Math.max(0, Math.min(player.x, lvl.width - PW));
    player.onGround = false;
    for (const p of plats) {
      if (overlaps(player.x, player.y, PW, PH, p.x, p.y, p.w, p.h)) {
        if (player.vx > 0) {
          player.x = p.x - PW;
        } else {
          player.x = p.x + p.w;
        }
        player.vx = 0;
      }
    }

    // Move Y → resolve Y collisions
    const prevVY = player.vy;
    player.y += player.vy * dt;
    for (const p of plats) {
      if (overlaps(player.x, player.y, PW, PH, p.x, p.y, p.w, p.h)) {
        if (prevVY > 0) {
          player.y = p.y - PH;
          player.vy = 0;
          player.onGround = true;
        } else {
          player.y = p.y + p.h;
          player.vy = 0;
        }
      }
    }

    // Fell off bottom or into lava
    if (player.y > GH + 80) {
      handleDeath();
      return;
    }

    // Invincibility timer
    if (player.invMs > 0) {
      player.invMs -= dt * 16.67;
    }

    // ── Enemies ──────────────────────────────────────────────────────────────
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      if (e.dead) {
        continue;
      }

      if (e.type === 'bat') {
        e.x += e.dir * 1.7 * dt;
        e.y = (e.oy || e.y) + Math.sin(now / 520 + i * 1.3) * 38;
        if (e.x < e.minX || e.x > e.maxX) {
          e.dir *= -1;
        }
      } else {
        const spd = e.type === 'crab' ? 1.9 : 1.4;
        e.x += e.dir * spd * dt;
        if (e.x <= e.minX || e.x + 25 >= e.maxX) {
          e.dir *= -1;
        }
      }

      // Collision with player
      if (player.invMs > 0) {
        continue;
      }
      const ew = 28,
        eh = 28;
      if (!overlaps(player.x, player.y, PW, PH, e.x, e.y, ew, eh)) {
        continue;
      }

      // Stomp check: player falling + was above enemy
      if (prevVY > 0 && prevBottom <= e.y + 10) {
        e.dead = true;
        player.vy = -9;
        gs.score += 100;
        sndStomp();
      } else {
        handleDeath();
        return;
      }
    }

    // ── Coins ─────────────────────────────────────────────────────────────────
    for (const c of coins) {
      if (c.taken) {
        continue;
      }
      if (overlaps(player.x, player.y, PW, PH, c.x - 8, c.y - 8, 16, 16)) {
        c.taken = true;
        gs.score += 50;
        gs.coins++;
        sndCoin();
      }
    }

    // ── Finish flag ───────────────────────────────────────────────────────────
    const fx = lvl.flagX;
    if (player.x + PW > fx && player.x < fx + 30) {
      doLevelComplete();
      return;
    }

    // ── Camera ────────────────────────────────────────────────────────────────
    const targetX = player.x - GW / 3;
    cam.x = Math.max(0, Math.min(targetX, lvl.width - GW));
  }

  // ── Life / Level logic ───────────────────────────────────────────────────────
  function handleDeath() {
    gs.lives--;
    if (gs.lives <= 0) {
      sndDie();
      gs.mode = 'gameOver';
      saveBest();
      updateOverlay('gameover-overlay', null);
    } else {
      sndHurt();
      initLevel(gs.level);
      player.invMs = 2000;
    }
  }

  function doLevelComplete() {
    const bonus = (gs.level + 1) * 500;
    gs.score += bonus;
    sndWin();

    if (gs.level >= LEVELS.length - 1) {
      gs.mode = 'victory';
      saveBest();
      updateOverlay('victory-overlay', null);
    } else {
      gs.mode = 'levelComplete';
      updateOverlay('levelcomplete-overlay', bonus);
    }
  }

  function saveBest() {
    if (gs.score > gs.bestScore) {
      gs.bestScore = gs.score;
      try {
        localStorage.setItem('pq-best', gs.bestScore);
      } catch (_e) {
        /* storage blocked */
      }
    }
  }

  function updateOverlay(id, bonus) {
    showOverlay(id);
    if (id === 'levelcomplete-overlay') {
      el('lc-title').textContent = `🎉 Level ${gs.level + 1} Complete!`;
      el('lc-subtitle').textContent =
        gs.level < LEVELS.length - 2
          ? `Next up: ${LEVELS[gs.level + 1].name}!`
          : 'Final level ahead! Go!';
      el('lc-score').textContent = gs.score;
      el('lc-coins').textContent = gs.coins;
      el('lc-bonus').textContent = `+${bonus}`;
      const pips = el('lc-pips');
      pips.innerHTML = '';
      LEVELS.forEach((_lvl, i) => {
        const d = document.createElement('div');
        d.className = `lv-pip${i <= gs.level ? ' done' : i === gs.level + 1 ? ' active' : ''}`;
        d.textContent = ['🌿', '🏜️', '🏰'][i];
        pips.appendChild(d);
      });
    } else if (id === 'gameover-overlay') {
      el('go-score').textContent = gs.score;
      el('go-coins').textContent = gs.coins;
      el('go-best').textContent =
        gs.score >= gs.bestScore ? '🏆 New Best!' : `Best: ${gs.bestScore}`;
    } else if (id === 'victory-overlay') {
      el('v-score').textContent = gs.score;
      el('v-coins').textContent = gs.coins;
      el('v-best').textContent =
        gs.score >= gs.bestScore ? '🏆 New Best!' : `Best: ${gs.bestScore}`;
    }
  }

  // ── Drawing ──────────────────────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, GW, GH);
    if (gs.mode === 'menu') {
      drawMenu();
      return;
    }

    const lvl = LEVELS[gs.level];
    drawBg(lvl);
    drawPlatforms(lvl);
    drawLava(lvl);
    drawFlag(lvl);
    drawCoins();
    drawEnemies();
    drawPlayer();
    drawHUD(lvl);
  }

  // Background
  function drawBg(lvl) {
    const t = lvl.theme;
    const grad = ctx.createLinearGradient(0, 0, 0, GH);

    if (t === 'grass') {
      grad.addColorStop(0, '#5ec8f0');
      grad.addColorStop(1, '#c8eeff');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, GW, GH);
      // Clouds (parallax 0.2)
      ctx.fillStyle = 'rgba(255,255,255,0.86)';
      const cOff = (cam.x * 0.2) % GW;
      [100, 310, 520, 720].forEach((cx, i) => {
        const sizes = [1.1, 0.85, 1.0, 0.95];
        drawCloud(((cx - cOff + GW * 2) % GW) - 50, 50 + i * 8, sizes[i]);
      });
      // Hills (parallax 0.45)
      ctx.fillStyle = '#6ec96e';
      const hOff = (cam.x * 0.45) % GW;
      [
        [180, 450, 290, 70],
        [480, 465, 190, 55],
        [750, 450, 320, 80]
      ].forEach(([hx, hy, hw, hh]) => {
        drawHill((hx - hOff + GW * 2) % GW, hy, hw, hh);
      });
    } else if (t === 'sand') {
      grad.addColorStop(0, '#FF7043');
      grad.addColorStop(0.55, '#FFB74D');
      grad.addColorStop(1, '#FFF8E1');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, GW, GH);
      // Sun
      const sunX = GW - 90 - ((cam.x * 0.08) % 200);
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(sunX, 75, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,200,50,0.3)';
      ctx.beginPath();
      ctx.arc(sunX, 75, 64, 0, Math.PI * 2);
      ctx.fill();
      // Dunes
      ctx.fillStyle = '#F4A460';
      const dOff = (cam.x * 0.4) % GW;
      [
        [160, 455, 380, 65],
        [520, 465, 280, 52],
        [740, 455, 340, 62]
      ].forEach(([dx, dy, dw, dh]) => {
        drawHill((dx - dOff + GW * 2) % GW, dy, dw, dh);
      });
    } else {
      // Castle: dark sky
      grad.addColorStop(0, '#09091e');
      grad.addColorStop(1, '#1a0f36');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, GW, GH);
      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      for (let i = 0; i < 65; i++) {
        const sx = (i * 139 + 7) % 800;
        const sy = (i * 53) % 320;
        const sr = 0.4 + (i % 4) * 0.4;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
      // Moon
      const mOff = (cam.x * 0.06) % (GW * 2);
      const mx = (GW - 80 - mOff + GW * 4) % GW;
      ctx.fillStyle = '#fffde7';
      ctx.beginPath();
      ctx.arc(mx, 75, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#09091e';
      ctx.beginPath();
      ctx.arc(mx + 16, 65, 30, 0, Math.PI * 2);
      ctx.fill();
      // BG towers
      ctx.fillStyle = '#1a1032';
      const tOff = (cam.x * 0.28) % GW;
      [
        [180, 260, 55, 200],
        [340, 230, 48, 230],
        [590, 250, 62, 220]
      ].forEach(([tx, ty, tw, th]) => {
        drawTower((tx - tOff + GW * 2) % GW, ty, tw, th);
      });
    }
  }

  function drawCloud(x, y, s) {
    const r = s * 34;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.arc(x + r * 1.2, y - r * 0.3, r * 0.75, 0, Math.PI * 2);
    ctx.arc(x + r * 2, y, r * 0.65, 0, Math.PI * 2);
    ctx.arc(x + r, y + r * 0.3, r * 0.85, 0, Math.PI * 2);
    ctx.fill();
  }
  function drawHill(cx, y, w, h) {
    ctx.beginPath();
    ctx.ellipse(cx, y, w / 2, h, 0, Math.PI, 0);
    ctx.fill();
  }
  function drawTower(x, y, w, h) {
    ctx.fillRect(x - w / 2, y, w, h);
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x - w / 2 + i * (w / 3), y - 14, w / 4, 14);
    }
  }

  function drawPlatforms(lvl) {
    const t = lvl.theme;
    for (const p of lvl.platforms) {
      const px = p.x - cam.x;
      if (px + p.w < -10 || px > GW + 10) {
        continue;
      }

      if (t === 'grass') {
        ctx.fillStyle = '#5c3d1e';
        ctx.fillRect(px, p.y, p.w, p.h);
        ctx.fillStyle = '#57a83a';
        ctx.fillRect(px, p.y, p.w, Math.min(14, p.h));
        ctx.fillStyle = '#4e9632';
        for (let i = 5; i < p.w - 5; i += 22) {
          ctx.beginPath();
          ctx.arc(px + i, p.y + 7, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (t === 'sand') {
        ctx.fillStyle = '#7c5a3c';
        ctx.fillRect(px, p.y, p.w, p.h);
        ctx.fillStyle = '#e8b870';
        ctx.fillRect(px, p.y, p.w, Math.min(14, p.h));
        ctx.fillStyle = '#d4a060';
        for (let i = 8; i < p.w - 8; i += 28) {
          ctx.fillRect(px + i, p.y + 4, 14, 6);
        }
      } else {
        ctx.fillStyle = '#2c3440';
        ctx.fillRect(px, p.y, p.w, p.h);
        ctx.fillStyle = '#3e4f60';
        ctx.fillRect(px, p.y, p.w, Math.min(14, p.h));
        // Brick lines
        ctx.strokeStyle = '#1e2830';
        ctx.lineWidth = 1;
        for (let row = 0; row < 4; row++) {
          const off = (row % 2) * 22;
          for (let col = -off; col < p.w; col += 44) {
            ctx.strokeRect(px + col, p.y + row * 14, 42, 13);
          }
        }
      }
    }
  }

  function drawLava(lvl) {
    if (lvl.theme !== 'castle') {
      return;
    }
    // Find ground-level gaps
    const gndPlats = lvl.platforms.filter(p => p.y > 400).sort((a, b) => a.x - b.x);
    for (let i = 0; i < gndPlats.length - 1; i++) {
      const gapStart = gndPlats[i].x + gndPlats[i].w;
      const gapEnd = gndPlats[i + 1].x;
      if (gapEnd - gapStart < 5 || gapEnd - gapStart > 500) {
        continue;
      }
      const px = gapStart - cam.x;
      if (px + (gapEnd - gapStart) < -10 || px > GW + 10) {
        continue;
      }
      const gw = gapEnd - gapStart;
      const flicker = Math.sin(now / 180 + i) * 0.12 + 0.88;
      const r = Math.floor(255 * flicker),
        g2 = Math.floor(55 * flicker);
      ctx.fillStyle = `rgb(${r},${g2},0)`;
      ctx.fillRect(px, 430, gw, 90);
      // Glow ripples
      ctx.fillStyle = '#FFEE00';
      for (let j = 0; j < gw; j += 12) {
        const rh = 2 + Math.sin(now / 250 + j * 0.4 + i * 5) * 2.5;
        ctx.fillRect(px + j, 430, 8, rh);
      }
    }
  }

  function drawFlag(lvl) {
    const fx = lvl.flagX - cam.x;
    if (fx < -30 || fx > GW + 30) {
      return;
    }
    // Pole
    ctx.fillStyle = '#9E9E9E';
    ctx.fillRect(fx + 1, lvl.platforms[0].y - 86, 5, 86);
    // Flag wave
    const wave = Math.sin(now / 300) * 3;
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.moveTo(fx + 6, lvl.platforms[0].y - 86);
    ctx.quadraticCurveTo(fx + 22 + wave, lvl.platforms[0].y - 76, fx + 6, lvl.platforms[0].y - 66);
    ctx.fill();
    ctx.fillStyle = '#FFD700';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('★', fx + 8, lvl.platforms[0].y - 74);
  }

  function drawPlayer() {
    const px = Math.round(player.x - cam.x);
    const py = Math.round(player.y);
    // Blink when invincible
    if (player.invMs > 0 && Math.floor(player.invMs / 120) % 2 === 0) {
      return;
    }

    ctx.save();
    if (playerDir < 0) {
      ctx.transform(-1, 0, 0, 1, px * 2 + PW, 0);
    }

    const x = px,
      y = py;

    // Legs (walking animation)
    const walking = Math.abs(player.vx) > 0.8 && player.onGround;
    const swing = walking ? Math.sin(animT * 8) * 4 : 0;
    ctx.fillStyle = '#1565C0';
    ctx.fillRect(x + 3, y + PH - 10 + swing, 9, 10);
    ctx.fillRect(x + 14, y + PH - 10 - swing, 9, 10);
    // Shoes
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(x + 1, y + PH - 5 + swing, 12, 5);
    ctx.fillRect(x + 13, y + PH - 5 - swing, 12, 5);

    // Body (overalls)
    ctx.fillStyle = '#1E88E5';
    ctx.fillRect(x + 3, y + 16, PW - 6, 12);
    // Shirt
    ctx.fillStyle = '#E53935';
    ctx.fillRect(x + 4, y + 12, PW - 8, 10);
    // Overall straps
    ctx.fillStyle = '#1565C0';
    ctx.fillRect(x + 4, y + 12, 6, 8);
    ctx.fillRect(x + 16, y + 12, 6, 8);

    // Head
    ctx.fillStyle = '#FDBCB4';
    ctx.beginPath();
    ctx.ellipse(x + PW / 2, y + 8, 10, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hat
    ctx.fillStyle = '#E53935';
    ctx.fillRect(x, y + 2, PW, 7);
    ctx.fillRect(x + 2, y - 2, PW - 4, 6);

    // Eye & mustache
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 14, y + 6, 3, 3);
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(x + 9, y + 12, 11, 3);

    ctx.restore();
  }

  function drawEnemies() {
    for (const e of enemies) {
      if (e.dead) {
        continue;
      }
      const ex = Math.round(e.x - cam.x);
      const ey = Math.round(e.y);
      if (ex < -50 || ex > GW + 50) {
        continue;
      }

      if (e.type === 'mushroom') {
        drawMushroom(ex, ey, e.dir);
      } else if (e.type === 'crab') {
        drawCrab(ex, ey, e.dir);
      } else if (e.type === 'bat') {
        drawBat(ex, ey, e.dir);
      }
    }
  }

  function drawMushroom(x, y, dir) {
    ctx.save();
    if (dir < 0) {
      ctx.transform(-1, 0, 0, 1, x * 2 + 30, 0);
    }
    // Stem
    ctx.fillStyle = '#FDBCB4';
    ctx.fillRect(x + 4, y + 16, 22, 12);
    // Cap
    ctx.fillStyle = '#c0392b';
    ctx.beginPath();
    ctx.ellipse(x + 15, y + 14, 15, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 15, y + 14, 14, Math.PI, 0);
    ctx.fill();
    // Spots
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(x + 8, y + 9, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 19, y + 7, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x + 11, y + 19, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 19, y + 19, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCrab(x, y, dir) {
    ctx.save();
    if (dir < 0) {
      ctx.transform(-1, 0, 0, 1, x * 2 + 30, 0);
    }
    // Legs (animated)
    const legSwing = Math.sin(now / 180) * 4;
    ctx.fillStyle = '#d35400';
    ctx.fillRect(x + 2, y + 18 + legSwing, 5, 8);
    ctx.fillRect(x + 23, y + 18 - legSwing, 5, 8);
    ctx.fillRect(x + 7, y + 20 - legSwing, 4, 7);
    ctx.fillRect(x + 19, y + 20 + legSwing, 4, 7);
    // Body
    ctx.fillStyle = '#e67e22';
    ctx.beginPath();
    ctx.ellipse(x + 15, y + 16, 13, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    // Claws
    ctx.fillStyle = '#d35400';
    ctx.beginPath();
    ctx.arc(x + 2, y + 12, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 28, y + 12, 6.5, 0, Math.PI * 2);
    ctx.fill();
    // Eye stalks + eyes
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(x + 9, y + 4, 3, 6);
    ctx.fillRect(x + 18, y + 4, 3, 6);
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(x + 10, y + 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20, y + 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + 11, y + 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 21, y + 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBat(x, y, dir) {
    const flap = Math.sin(now / 160) * 0.5 + 0.5;
    ctx.save();
    if (dir < 0) {
      ctx.transform(-1, 0, 0, 1, x * 2 + 30, 0);
    }
    // Wings
    ctx.fillStyle = '#7b1fa2';
    ctx.beginPath();
    ctx.moveTo(x + 14, y + 13);
    ctx.quadraticCurveTo(x - 12, y + 4 - flap * 18, x - 4, y + 26);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 16, y + 13);
    ctx.quadraticCurveTo(x + 42, y + 4 - flap * 18, x + 34, y + 26);
    ctx.fill();
    // Body
    ctx.fillStyle = '#4a148c';
    ctx.beginPath();
    ctx.ellipse(x + 15, y + 15, 9, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(x + 10, y + 11, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20, y + 11, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + 11, y + 10, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 21, y + 10, 1.5, 0, Math.PI * 2);
    ctx.fill();
    // Ears
    ctx.fillStyle = '#7b1fa2';
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 5);
    ctx.lineTo(x + 7, y - 4);
    ctx.lineTo(x + 13, y + 3);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 20, y + 5);
    ctx.lineTo(x + 23, y - 4);
    ctx.lineTo(x + 17, y + 3);
    ctx.fill();
    ctx.restore();
  }

  function drawCoins() {
    for (const c of coins) {
      if (c.taken) {
        continue;
      }
      const cx = Math.round(c.x - cam.x);
      if (cx < -20 || cx > GW + 20) {
        continue;
      }
      const scaleX = Math.abs(Math.cos(now / 280 + c.x * 0.01));
      ctx.save();
      ctx.translate(cx, c.y);
      ctx.scale(Math.max(0.1, scaleX), 1);
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#B8860B';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFD700';
      if (scaleX > 0.4) {
        ctx.font = 'bold 7px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 1);
      }
      ctx.restore();
      // Hover bob
      ctx.fillStyle = 'rgba(255,215,0,0.18)';
      ctx.beginPath();
      ctx.ellipse(cx, c.y + 10 + Math.sin(now / 300 + c.x * 0.02) * 3, 7, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawHUD(lvl) {
    // Lives
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(8, 8, 6 + gs.lives * 26, 32);
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'left';
    for (let i = 0; i < gs.lives; i++) {
      ctx.fillText('❤️', 12 + i * 26, 30);
    }

    // Score + coins (top right)
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(GW - 148, 8, 140, 44);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 15px Nunito,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`⭐ ${gs.score}`, GW - 12, 25);
    ctx.fillStyle = '#4ade80';
    ctx.font = '12px Nunito,sans-serif';
    ctx.fillText(`🪙 ${gs.coins}`, GW - 12, 44);

    // Progress bar
    const progress = Math.max(0, Math.min(1, (player.x - 80) / (lvl.flagX - 80)));
    ctx.fillStyle = 'rgba(0,0,0,0.38)';
    ctx.fillRect(GW / 2 - 115, GH - 26, 230, 14);
    const barColor =
      lvl.theme === 'grass' ? '#57a83a' : lvl.theme === 'sand' ? '#FFB74D' : '#9c27b0';
    ctx.fillStyle = barColor;
    ctx.fillRect(GW / 2 - 115, GH - 26, 230 * progress, 14);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(GW / 2 - 115, GH - 26, 230, 14);
    ctx.fillStyle = '#fff';
    ctx.font = '10px Nunito,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lvl.name, GW / 2, GH - 30);
  }

  function drawMenu() {
    // Night sky bg
    const grad = ctx.createLinearGradient(0, 0, 0, GH);
    grad.addColorStop(0, '#0d1b2a');
    grad.addColorStop(1, '#1a3a5c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GW, GH);
    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    for (let i = 0; i < 90; i++) {
      ctx.beginPath();
      ctx.arc((i * 137) % GW, (i * 67) % 360, 0.5 + (i % 4) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    // Grass strip at bottom
    ctx.fillStyle = '#1a3a2a';
    ctx.fillRect(0, 440, GW, 80);
    ctx.fillStyle = '#57a83a';
    ctx.fillRect(0, 440, GW, 12);
    // Some mushrooms on ground
    drawMushroom(200, 412, 1);
    drawMushroom(550, 412, -1);
    drawMushroom(700, 412, 1);
  }

  // ── Overlay helpers ───────────────────────────────────────────────────────────
  function el(id) {
    return document.getElementById(id);
  }
  function showOverlay(id) {
    document.querySelectorAll('.g-overlay').forEach(o => o.classList.add('hidden'));
    el(id).classList.remove('hidden');
  }

  // ── Button wiring ─────────────────────────────────────────────────────────────
  function startGame(fromLevel) {
    gs.level = fromLevel || 0;
    gs.lives = 3;
    gs.score = 0;
    gs.coins = 0;
    initLevel(gs.level);
    gs.mode = 'playing';
    document.querySelectorAll('.g-overlay').forEach(o => o.classList.add('hidden'));
    lastTime = performance.now();
  }

  el('menu-play-btn').addEventListener('click', () => startGame(0));
  el('lc-next-btn').addEventListener('click', () => {
    gs.level++;
    initLevel(gs.level);
    gs.mode = 'playing';
    document.querySelectorAll('.g-overlay').forEach(o => o.classList.add('hidden'));
    lastTime = performance.now();
  });
  el('lc-menu-btn').addEventListener('click', () => {
    gs.mode = 'menu';
    showOverlay('menu-overlay');
    el('menu-best').textContent = gs.bestScore;
  });
  el('go-retry-btn').addEventListener('click', () => startGame(0));
  el('go-menu-btn').addEventListener('click', () => {
    gs.mode = 'menu';
    showOverlay('menu-overlay');
    el('menu-best').textContent = gs.bestScore;
  });
  el('v-play-btn').addEventListener('click', () => startGame(0));
  el('v-menu-btn').addEventListener('click', () => {
    gs.mode = 'menu';
    showOverlay('menu-overlay');
    el('menu-best').textContent = gs.bestScore;
  });

  // ── Game Loop ─────────────────────────────────────────────────────────────────
  function loop(ts) {
    now = ts;
    const dt = Math.min((ts - lastTime) / 16.67, 3.5);
    lastTime = ts;
    if (gs.mode === 'playing') {
      updateGame(dt);
    }
    draw();
    requestAnimationFrame(loop);
  }

  // ── Boot ──────────────────────────────────────────────────────────────────────
  el('menu-best').textContent = gs.bestScore;
  showOverlay('menu-overlay');
  lastTime = performance.now();
  requestAnimationFrame(loop);
})();

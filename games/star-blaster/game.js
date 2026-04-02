// Star Blaster — game.js
'use strict';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const WEAPONS = [
  {
    id: 'blaster',
    name: 'Blaster',
    emoji: '⚡',
    desc: 'Fast & accurate. Perfect starter!',
    color: '#00d4ff',
    fireRate: 160,
    bspd: 10,
    dmg: 25,
    spread: 0,
    count: 1,
    brad: 5
  },
  {
    id: 'shotgun',
    name: 'Shotgun',
    emoji: '💥',
    desc: 'Wide spread. Clears groups fast!',
    color: '#ff9500',
    fireRate: 520,
    bspd: 9,
    dmg: 18,
    spread: 0.38,
    count: 5,
    brad: 4
  },
  {
    id: 'plasma',
    name: 'Plasma Orb',
    emoji: '🔮',
    desc: 'Powerful & bouncy. Angles off walls!',
    color: '#a855f7',
    fireRate: 360,
    bspd: 5.5,
    dmg: 55,
    spread: 0,
    count: 1,
    brad: 9,
    bounces: 2
  },
  {
    id: 'rocket',
    name: 'Rockets',
    emoji: '🚀',
    desc: 'Massive splash. Destroys clusters!',
    color: '#ef4444',
    fireRate: 850,
    bspd: 7,
    dmg: 80,
    spread: 0,
    count: 1,
    brad: 7,
    splash: 90
  }
];

// Enemy definitions
const EDEFS = [
  { id: 'drone', em: '🤖', hp: 40, spd: 1.3, sz: 22, pts: 10 },
  { id: 'alien', em: '👾', hp: 30, spd: 2.2, sz: 20, pts: 15, zigzag: true },
  { id: 'skull', em: '💀', hp: 70, spd: 0.95, sz: 22, pts: 25, shooter: true },
  { id: 'tank', em: '🦾', hp: 160, spd: 0.6, sz: 30, pts: 50 }
];

// Wave definitions: weights [drone,alien,skull,tank], n=enemy count, ms=spawn interval
const WAVES = [
  { w: [1, 0, 0, 0], n: 8, ms: 2200 },
  { w: [2, 1, 0, 0], n: 11, ms: 2000 },
  { w: [2, 2, 1, 0], n: 14, ms: 1750 },
  { w: [2, 2, 2, 0], n: 17, ms: 1550 },
  { w: [2, 3, 2, 1], n: 19, ms: 1350 },
  { w: [1, 3, 3, 2], n: 23, ms: 1150 }
];

// Power-up drop chances
const DROPS = [
  { id: 'life', em: '❤️', prob: 0.08 },
  { id: 'shield', em: '🛡️', prob: 0.12 },
  { id: 'speed', em: '⚡', prob: 0.14 },
  { id: 'freeze', em: '❄️', prob: 0.11 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// AUDIO
// ═══════════════════════════════════════════════════════════════════════════════

let _ac = null;

function getAC() {
  if (!_ac) {
    _ac = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_ac.state === 'suspended') {
    _ac.resume();
  }
  return _ac;
}

function tone(freq, dur, type, vol) {
  try {
    const c = getAC();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.type = type || 'square';
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.13, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.start();
    o.stop(c.currentTime + dur);
  } catch (e) {
    // audio unavailable — silent fail
  }
}

function noiseBurst(dur, vol) {
  try {
    const c = getAC();
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const g = c.createGain();
    g.gain.value = vol || 0.4;
    src.connect(g);
    g.connect(c.destination);
    src.start();
  } catch (e) {
    // audio unavailable — silent fail
  }
}

function sndShoot(wid) {
  if (wid === 'blaster') {
    tone(900, 0.055, 'square', 0.1);
  }
  if (wid === 'shotgun') {
    tone(180, 0.08, 'sawtooth', 0.16);
    tone(280, 0.05, 'square', 0.07);
  }
  if (wid === 'plasma') {
    tone(420, 0.18, 'sine', 0.12);
    tone(620, 0.1, 'sine', 0.07);
  }
  if (wid === 'rocket') {
    tone(110, 0.22, 'sawtooth', 0.18);
  }
}

function sndExplode(big) {
  noiseBurst(big ? 0.32 : 0.16, big ? 0.65 : 0.38);
}

function sndHit() {
  tone(180, 0.18, 'sawtooth', 0.28);
}

function sndPowerup() {
  [523, 659, 784, 1047].forEach((n, i) => setTimeout(() => tone(n, 0.2, 'triangle', 0.13), i * 95));
}

function sndWaveUp() {
  [392, 494, 587, 784].forEach((n, i) =>
    setTimeout(() => tone(n, 0.22, 'triangle', 0.11), i * 110)
  );
}

function sndGameOver() {
  [440, 370, 311, 220].forEach((n, i) => setTimeout(() => tone(n, 0.32, 'sine', 0.17), i * 200));
}

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS
// ═══════════════════════════════════════════════════════════════════════════════

let canvas, ctx, W, H;

function setupCanvas() {
  canvas = document.createElement('canvas');
  canvas.id = 'game-canvas';
  canvas.style.cssText =
    'display:block;width:100%;height:100%;touch-action:none;position:absolute;inset:0';
  document.getElementById('game-container').prepend(canvas);
  ctx = canvas.getContext('2d');
  doResize();
  window.addEventListener('resize', doResize);
}

function doResize() {
  const c = document.getElementById('game-container');
  W = canvas.width = c.clientWidth;
  H = canvas.height = c.clientHeight;
  initStars();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════════

const gs = {
  mode: 'menu',
  score: 0,
  lives: 3,
  wave: 0,
  spawnCount: 0,
  waveTarget: 0,
  spawnTimer: 0,
  waveKills: 0,
  freezeTimer: 0,
  shake: 0,
  weaponId: 'blaster',
  bestScore: +(localStorage.getItem('sb-best') || 0),
  comboCount: 0,
  comboTimer: 0
};

const player = {
  x: 400,
  y: 300,
  speed: 220,
  angle: -Math.PI / 2,
  radius: 14,
  invTimer: 0,
  shield: 0,
  speedTimer: 0,
  fireTimer: 0
};

let stars = [];
let bullets = [];
let eBullets = [];
let enemies = [];
let drops = [];
let parts = [];

function resetArena() {
  gs.score = 0;
  gs.lives = 3;
  gs.wave = 0;
  gs.spawnCount = 0;
  gs.waveTarget = 0;
  gs.spawnTimer = 0;
  gs.waveKills = 0;
  gs.freezeTimer = 0;
  gs.shake = 0;
  gs.comboCount = 0;
  gs.comboTimer = 0;
  player.x = W / 2;
  player.y = H / 2;
  player.angle = -Math.PI / 2;
  player.invTimer = 0;
  player.shield = 0;
  player.speedTimer = 0;
  player.fireTimer = 0;
  bullets = [];
  eBullets = [];
  enemies = [];
  drops = [];
  parts = [];
}

// ═══════════════════════════════════════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════════════════════════════════════

const keys = { up: 0, down: 0, left: 0, right: 0 };
const mouse = { x: 0, y: 0 };
const joy = { active: false, cx0: 0, cy0: 0, dx: 0, dy: 0 };
let isMobile = false;

function setupInput() {
  const MAP = {
    ArrowUp: 'up',
    w: 'up',
    W: 'up',
    ArrowDown: 'down',
    s: 'down',
    S: 'down',
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowRight: 'right',
    d: 'right',
    D: 'right'
  };
  document.addEventListener('keydown', e => {
    if (MAP[e.key]) {
      keys[MAP[e.key]] = 1;
      e.preventDefault();
    }
  });
  document.addEventListener('keyup', e => {
    if (MAP[e.key]) {
      keys[MAP[e.key]] = 0;
    }
  });

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * (W / r.width);
    mouse.y = (e.clientY - r.top) * (H / r.height);
  });

  canvas.addEventListener(
    'touchstart',
    e => {
      e.preventDefault();
      isMobile = true;
      getAC(); // unlock audio context on first touch
      const t = e.changedTouches[0];
      const r = canvas.getBoundingClientRect();
      const cx = t.clientX - r.left;
      const cy = t.clientY - r.top;
      // Left 55% = joystick zone
      if (cx < r.width * 0.55) {
        joy.active = true;
        joy.cx0 = cx;
        joy.cy0 = cy;
        joy.dx = 0;
        joy.dy = 0;
        positionJoy(cx, cy, 0, 0);
        showJoy(true);
      }
    },
    { passive: false }
  );

  canvas.addEventListener(
    'touchmove',
    e => {
      e.preventDefault();
      if (!joy.active) {
        return;
      }
      const t = e.changedTouches[0];
      const r = canvas.getBoundingClientRect();
      const cx = t.clientX - r.left;
      const cy = t.clientY - r.top;
      const dx = cx - joy.cx0;
      const dy = cy - joy.cy0;
      const mag = Math.hypot(dx, dy);
      const maxR = 50;
      const factor = Math.min(mag, maxR) / (mag || 1);
      joy.dx = (dx * factor) / maxR;
      joy.dy = (dy * factor) / maxR;
      positionJoy(joy.cx0, joy.cy0, dx * factor, dy * factor);
    },
    { passive: false }
  );

  canvas.addEventListener(
    'touchend',
    e => {
      e.preventDefault();
      joy.active = false;
      joy.dx = 0;
      joy.dy = 0;
      showJoy(false);
    },
    { passive: false }
  );
}

function showJoy(on) {
  document.getElementById('joy-ring').style.display = on ? 'block' : 'none';
  document.getElementById('joy-knob').style.display = on ? 'block' : 'none';
}

function positionJoy(ox, oy, dx, dy) {
  const ring = document.getElementById('joy-ring');
  ring.style.left = `${ox - 55}px`;
  ring.style.top = `${oy - 55}px`;
  const knob = document.getElementById('joy-knob');
  knob.style.left = `${ox + dx - 26}px`;
  knob.style.top = `${oy + dy - 26}px`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STARFIELD
// ═══════════════════════════════════════════════════════════════════════════════

function initStars() {
  stars = [];
  const n = Math.floor((W * H) / 5500);
  for (let i = 0; i < n; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.5 + Math.random() * 1.5,
      bright: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      spd: 0.5 + Math.random() * 1.5
    });
  }
}

function drawStars(t) {
  stars.forEach(s => {
    const a = s.bright * (0.65 + 0.35 * Math.sin(s.phase + t * s.spd));
    ctx.globalAlpha = a;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PLAYER
// ═══════════════════════════════════════════════════════════════════════════════

function updatePlayer(dt) {
  // Movement vector
  let mx = 0;
  let my = 0;
  if (isMobile) {
    mx = joy.dx;
    my = joy.dy;
  } else {
    mx = keys.right - keys.left;
    my = keys.down - keys.up;
  }
  const mag = Math.hypot(mx, my);
  if (mag > 1) {
    mx /= mag;
    my /= mag;
  }

  const spd = player.speed * (player.speedTimer > 0 ? 1.6 : 1);
  player.x = Math.max(player.radius, Math.min(W - player.radius, player.x + mx * spd * dt));
  player.y = Math.max(player.radius, Math.min(H - player.radius, player.y + my * spd * dt));

  // Facing angle
  if (isMobile) {
    const near = nearestEnemy();
    if (near) {
      player.angle = Math.atan2(near.y - player.y, near.x - player.x);
    } else if (mag > 0.08) {
      player.angle = Math.atan2(my, mx);
    }
  } else {
    player.angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
  }

  // Timers
  player.invTimer = Math.max(0, player.invTimer - dt);
  player.speedTimer = Math.max(0, player.speedTimer - dt);

  // Auto-fire
  if (gs.mode === 'playing') {
    player.fireTimer -= dt;
    if (player.fireTimer <= 0) {
      const w = weaponById(gs.weaponId);
      player.fireTimer = w.fireRate / 1000;
      fireBullets(w);
    }
  }
}

function nearestEnemy() {
  let best = null;
  let bestD = Infinity;
  enemies.forEach(e => {
    const d = Math.hypot(e.x - player.x, e.y - player.y);
    if (d < bestD) {
      bestD = d;
      best = e;
    }
  });
  return best;
}

function weaponById(id) {
  return WEAPONS.find(w => w.id === id) || WEAPONS[0];
}

function drawPlayer(t) {
  if (player.invTimer > 0 && Math.floor(player.invTimer * 9) % 2 === 0) {
    return;
  }

  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle + Math.PI / 2);

  // Engine flame
  const flamePulse = 0.8 + 0.2 * Math.sin(t * 18);
  const fl = ctx.createRadialGradient(0, 15, 1, 0, 15, 20 * flamePulse);
  fl.addColorStop(0, 'rgba(255,140,0,0.95)');
  fl.addColorStop(0.5, 'rgba(255,60,0,0.5)');
  fl.addColorStop(1, 'rgba(255,0,0,0)');
  ctx.fillStyle = fl;
  ctx.beginPath();
  ctx.ellipse(0, 15, 7, 20 * flamePulse, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hull glow
  ctx.shadowBlur = 18;
  ctx.shadowColor = '#00d4ff';
  ctx.fillStyle = '#00d4ff';
  ctx.beginPath();
  ctx.moveTo(0, -18); // nose
  ctx.lineTo(13, 9); // right wing tip
  ctx.lineTo(5, 4); // right notch
  ctx.lineTo(0, 11); // tail
  ctx.lineTo(-5, 4); // left notch
  ctx.lineTo(-13, 9); // left wing tip
  ctx.closePath();
  ctx.fill();

  // Cockpit
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(200,240,255,0.9)';
  ctx.beginPath();
  ctx.ellipse(0, -7, 4, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shield ring
  if (player.shield > 0) {
    ctx.strokeStyle = `rgba(96,165,250,${0.55 + 0.35 * Math.sin(t * 7)})`;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 18;
    ctx.shadowColor = '#60a5fa';
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════════════════
// BULLETS
// ═══════════════════════════════════════════════════════════════════════════════

function fireBullets(w) {
  sndShoot(w.id);
  const base = player.angle;
  const ox = Math.cos(base) * 20 + player.x;
  const oy = Math.sin(base) * 20 + player.y;

  for (let i = 0; i < w.count; i++) {
    let ang = base;
    if (w.count > 1) {
      ang = base - w.spread / 2 + (w.spread / (w.count - 1)) * i + (Math.random() - 0.5) * 0.08;
    }
    bullets.push({
      x: ox,
      y: oy,
      vx: Math.cos(ang) * w.bspd,
      vy: Math.sin(ang) * w.bspd,
      rad: w.brad,
      color: w.color,
      dmg: w.dmg,
      wid: w.id,
      life: 3.2,
      bounces: w.bounces || 0,
      splash: w.splash || 0,
      trail: []
    });
  }
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.life -= dt;
    if (b.life <= 0) {
      bullets.splice(i, 1);
      continue;
    }
    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > 7) {
      b.trail.shift();
    }

    b.x += b.vx * dt * 60;
    b.y += b.vy * dt * 60;

    // Wall bounce for plasma
    if (b.bounces >= 0 && b.wid === 'plasma') {
      let bounced = false;
      if (b.x < b.rad) {
        b.x = b.rad;
        b.vx = Math.abs(b.vx);
        bounced = true;
      } else if (b.x > W - b.rad) {
        b.x = W - b.rad;
        b.vx = -Math.abs(b.vx);
        bounced = true;
      }
      if (b.y < b.rad) {
        b.y = b.rad;
        b.vy = Math.abs(b.vy);
        bounced = true;
      } else if (b.y > H - b.rad) {
        b.y = H - b.rad;
        b.vy = -Math.abs(b.vy);
        bounced = true;
      }
      if (bounced) {
        b.bounces--;
        burst(b.x, b.y, b.color, 5);
        if (b.bounces < 0) {
          bullets.splice(i, 1);
        }
      }
    } else if (b.x < -30 || b.x > W + 30 || b.y < -30 || b.y > H + 30) {
      bullets.splice(i, 1);
    }
  }
}

function drawBullets() {
  bullets.forEach(b => {
    // Trail
    for (let i = 0; i < b.trail.length; i++) {
      const tr = b.trail[i];
      const a = (i / b.trail.length) * 0.45;
      ctx.globalAlpha = a;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(tr.x, tr.y, b.rad * (i / b.trail.length), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 14;
    ctx.shadowColor = b.color;
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.rad, 0, Math.PI * 2);
    ctx.fill();
    // White core
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.rad * 0.4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

// ─── Enemy bullets ────────────────────────────────────────────────────────────

function updateEBullets(dt) {
  for (let i = eBullets.length - 1; i >= 0; i--) {
    const b = eBullets[i];
    b.life -= dt;
    if (b.life <= 0 || b.x < -20 || b.x > W + 20 || b.y < -20 || b.y > H + 20) {
      eBullets.splice(i, 1);
      continue;
    }
    b.x += b.vx * dt * 60;
    b.y += b.vy * dt * 60;
  }
}

function drawEBullets() {
  eBullets.forEach(b => {
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#f87171';
    ctx.fillStyle = '#ff6060';
    ctx.beginPath();
    ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,200,200,0.9)';
    ctx.beginPath();
    ctx.arc(b.x, b.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENEMIES
// ═══════════════════════════════════════════════════════════════════════════════

function getCurWave() {
  const idx = Math.min(gs.wave - 1, WAVES.length - 1);
  const base = WAVES[idx];
  if (gs.wave > WAVES.length) {
    const extra = gs.wave - WAVES.length;
    return { w: base.w, n: base.n + extra * 3, ms: Math.max(700, base.ms - extra * 55) };
  }
  return base;
}

function pickEnemyDef(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) {
      return EDEFS[i];
    }
  }
  return EDEFS[0];
}

function spawnEnemy() {
  const wave = getCurWave();
  const def = pickEnemyDef(wave.w);
  const pad = 45;
  const side = Math.floor(Math.random() * 4);
  let x, y;
  if (side === 0) {
    x = Math.random() * W;
    y = -pad;
  } else if (side === 1) {
    x = W + pad;
    y = Math.random() * H;
  } else if (side === 2) {
    x = Math.random() * W;
    y = H + pad;
  } else {
    x = -pad;
    y = Math.random() * H;
  }

  // Difficulty scaling with wave
  const hpMult = 1 + (gs.wave - 1) * 0.1;
  const spdMult = 1 + (gs.wave - 1) * 0.04;
  const mhp = Math.round(def.hp * hpMult);

  enemies.push({
    ...def,
    x,
    y,
    maxHp: mhp,
    hp: mhp,
    spd: def.spd * spdMult,
    shootTimer: 1.5 + Math.random() * 2,
    zigPhase: Math.random() * Math.PI * 2,
    hitTimer: 0
  });
}

function updateEnemy(e, dt) {
  e.hitTimer = Math.max(0, e.hitTimer - dt);
  const dx = player.x - e.x;
  const dy = player.y - e.y;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = dx / dist;
  const ny = dy / dist;

  if (e.shooter) {
    // Skulls keep ~200px from player and orbit
    const target = 195;
    if (dist > target + 12) {
      e.x += nx * e.spd * dt * 60;
      e.y += ny * e.spd * dt * 60;
    } else if (dist < target - 12) {
      e.x -= nx * e.spd * 0.6 * dt * 60;
      e.y -= ny * e.spd * 0.6 * dt * 60;
    }
    // Strafe
    e.x += -ny * e.spd * 0.7 * dt * 60;
    e.y += nx * e.spd * 0.7 * dt * 60;

    // Shoot
    e.shootTimer -= dt;
    if (e.shootTimer <= 0) {
      e.shootTimer = 1.8 + Math.random() * 1.5;
      const ang = Math.atan2(player.y - e.y, player.x - e.x);
      eBullets.push({
        x: e.x,
        y: e.y,
        vx: Math.cos(ang) * 4.2,
        vy: Math.sin(ang) * 4.2,
        life: 3.5
      });
      tone(280, 0.09, 'square', 0.065);
    }
  } else {
    // Regular enemies charge player
    e.x += nx * e.spd * dt * 60;
    e.y += ny * e.spd * dt * 60;
  }

  // Alien zigzag
  if (e.zigzag) {
    e.zigPhase += dt * 4.2;
    e.x += -ny * Math.sin(e.zigPhase) * 1.9;
    e.y += nx * Math.sin(e.zigPhase) * 1.9;
  }
}

function drawEnemies(t) {
  enemies.forEach(e => {
    ctx.save();
    // Hit flash
    if (e.hitTimer > 0) {
      ctx.filter = 'brightness(3.5) saturate(0)';
    }
    // Freeze tint
    if (gs.freezeTimer > 0) {
      ctx.filter = 'hue-rotate(170deg) brightness(1.4)';
    }

    ctx.font = `${e.sz * 1.6}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(e.em, e.x, e.y + Math.sin(t * 2 + e.zigPhase) * 2);
    ctx.restore();

    // HP bar
    const bw = e.sz * 2.2;
    const hf = e.hp / e.maxHp;
    const by = e.y - e.sz - 7;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(e.x - bw / 2, by, bw, 5);
    ctx.fillStyle = hf > 0.55 ? '#4ade80' : hf > 0.28 ? '#fbbf24' : '#ef4444';
    ctx.fillRect(e.x - bw / 2, by, bw * hf, 5);
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// POWER-UP DROPS
// ═══════════════════════════════════════════════════════════════════════════════

function maybeDrop(x, y) {
  const r = Math.random();
  let cum = 0;
  for (const d of DROPS) {
    cum += d.prob;
    if (r < cum) {
      drops.push({ ...d, x, y, t: Math.random() * Math.PI * 2 });
      return;
    }
  }
}

function updateDrops(dt) {
  drops.forEach(d => {
    d.t += dt;
  });
}

function drawDrops() {
  drops.forEach(d => {
    const fy = d.y + Math.sin(d.t * 3) * 6;
    const alpha = 0.75 + 0.25 * Math.sin(d.t * 5);
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 16;
    ctx.shadowColor = '#fbbf24';
    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(d.em, d.x, fy);
  });
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

function applyDrop(d) {
  sndPowerup();
  if (d.id === 'life') {
    gs.lives = Math.min(5, gs.lives + 1);
  } else if (d.id === 'shield') {
    player.shield = 3;
  } else if (d.id === 'speed') {
    player.speedTimer = 6;
  } else if (d.id === 'freeze') {
    gs.freezeTimer = 4;
    document.getElementById('freeze-overlay').classList.add('active');
    setTimeout(() => document.getElementById('freeze-overlay').classList.remove('active'), 4000);
  }
  updateHUD();
}

// ═══════════════════════════════════════════════════════════════════════════════
// PARTICLES
// ═══════════════════════════════════════════════════════════════════════════════

function burst(x, y, color, n) {
  const count = n || 10;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = 55 + Math.random() * 170;
    const life = 0.35 + Math.random() * 0.45;
    parts.push({
      x,
      y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      r: 2.5 + Math.random() * 4.5,
      color,
      life,
      maxLife: life,
      ring: false
    });
  }
}

function splashRing(x, y, maxR, color) {
  const life = 0.38;
  parts.push({ ring: true, x, y, maxR, color, life, maxLife: life, vx: 0, vy: 0, r: 0 });
}

function updateParts(dt) {
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.life -= dt;
    if (p.life <= 0) {
      parts.splice(i, 1);
      continue;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.96;
    p.vy *= 0.96;
  }
}

function drawParts() {
  parts.forEach(p => {
    const alpha = p.life / p.maxLife;
    if (p.ring) {
      const progress = 1 - alpha;
      ctx.globalAlpha = alpha * 0.7;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 14;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.maxR * progress, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * alpha, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.lineWidth = 1;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLLISION DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

function checkCollisions() {
  // Bullets vs enemies
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const b = bullets[bi];
    if (b.life <= 0) {
      continue;
    }

    for (let ei = enemies.length - 1; ei >= 0; ei--) {
      const e = enemies[ei];
      if (Math.hypot(b.x - e.x, b.y - e.y) > b.rad + e.sz) {
        continue;
      }

      // Hit
      e.hp -= b.dmg;
      e.hitTimer = 0.1;

      // Rocket splash
      if (b.splash > 0) {
        enemies.forEach(other => {
          if (other !== e) {
            const sd = Math.hypot(b.x - other.x, b.y - other.y);
            if (sd < b.splash) {
              other.hp -= b.dmg * (1 - sd / b.splash) * 0.75;
              other.hitTimer = 0.08;
            }
          }
        });
        splashRing(b.x, b.y, b.splash, b.color);
        burst(b.x, b.y, b.color, 22);
        sndExplode(true);
      }

      if (e.hp <= 0) {
        killEnemy(e, ei);
      }

      // Remove bullet unless plasma bouncing
      if (b.wid !== 'plasma') {
        b.life = 0;
        break;
      }
    }
  }
  bullets = bullets.filter(b => b.life > 0);

  // Enemy bullets vs player
  if (player.invTimer <= 0) {
    for (let i = eBullets.length - 1; i >= 0; i--) {
      const b = eBullets[i];
      if (Math.hypot(b.x - player.x, b.y - player.y) < 6 + player.radius) {
        eBullets.splice(i, 1);
        hitPlayer();
      }
    }
  }

  // Enemy contact vs player
  if (player.invTimer <= 0) {
    enemies.forEach(e => {
      if (Math.hypot(e.x - player.x, e.y - player.y) < e.sz * 0.75 + player.radius) {
        hitPlayer();
      }
    });
  }

  // Player vs drops
  for (let i = drops.length - 1; i >= 0; i--) {
    if (Math.hypot(drops[i].x - player.x, drops[i].y - player.y) < 28) {
      applyDrop(drops[i]);
      drops.splice(i, 1);
    }
  }
}

function killEnemy(e, idx) {
  gs.comboCount++;
  gs.comboTimer = 3;
  const mult = Math.min(5, gs.comboCount);
  const pts = e.pts * mult;
  gs.score += pts;
  gs.waveKills++;

  scorePop(e.x, e.y, pts, gs.comboCount > 1);
  burst(e.x, e.y, gs.comboCount > 2 ? '#fbbf24' : '#fb923c', gs.comboCount > 3 ? 20 : 13);
  sndExplode(e.id === 'tank');
  maybeDrop(e.x, e.y);
  enemies.splice(idx, 1);
  updateHUD();
}

function hitPlayer() {
  if (player.shield > 0) {
    player.shield--;
    tone(820, 0.14, 'sine', 0.2);
    gs.shake = 3;
    updateHUD();
    return;
  }
  sndHit();
  gs.lives--;
  gs.shake = 9;
  player.invTimer = 2.5;
  burst(player.x, player.y, '#ff4444', 12);
  updateHUD();

  if (gs.lives <= 0) {
    showGameOver();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// WAVE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

function checkWaveComplete() {
  const wave = getCurWave();
  if (gs.spawnCount >= wave.n && enemies.length === 0 && gs.mode === 'playing') {
    waveComplete();
  }
}

function waveComplete() {
  gs.mode = 'waving';
  sndWaveUp();
  const bonus = gs.wave * 120;
  gs.score += bonus;
  updateHUD();
  showBanner(
    `WAVE ${gs.wave} CLEAR!`,
    `+${bonus} bonus points · Wave ${gs.wave + 1} incoming…`,
    2400,
    () => startWave(gs.wave + 1)
  );
}

function startWave(n) {
  gs.wave = n;
  gs.spawnCount = 0;
  gs.waveKills = 0;
  const wave = getCurWave();
  gs.waveTarget = wave.n;
  gs.spawnTimer = 1.2;

  const TIPS = [
    '',
    'Dodge the robots!',
    'Aliens move fast — stay sharp!',
    'Watch out for Skull bots — they shoot back!',
    'Tank bots are slow but tough!',
    'Use walls to bounce Plasma Orbs!',
    "You're a legend!",
    'Max difficulty — survive!'
  ];
  const tip = TIPS[Math.min(n, TIPS.length - 1)];

  showBanner(`WAVE ${n}`, tip, 2200, () => {
    gs.mode = 'playing';
    updateHUD();
  });
}

function showBanner(text, sub, dur, cb) {
  const banner = document.getElementById('wave-banner');
  document.getElementById('wb-text').textContent = text;
  document.getElementById('wb-sub').textContent = sub;
  banner.style.display = 'flex';
  setTimeout(() => {
    banner.style.display = 'none';
    if (cb) {
      cb();
    }
  }, dur);
}

// ═══════════════════════════════════════════════════════════════════════════════
// HUD & SCORE POP
// ═══════════════════════════════════════════════════════════════════════════════

function updateHUD() {
  const hearts = ['', '❤️', '❤️❤️', '❤️❤️❤️', '❤️❤️❤️❤️', '❤️❤️❤️❤️❤️'];
  document.getElementById('hud-lives').textContent = hearts[Math.max(0, Math.min(5, gs.lives))];
  document.getElementById('hud-score').textContent = gs.score.toLocaleString();
  document.getElementById('hud-wave').textContent = `Wave ${gs.wave}`;

  const combo = document.getElementById('hud-combo');
  if (gs.comboCount > 1) {
    combo.textContent = `🔥 x${gs.comboCount} COMBO!`;
  } else {
    combo.textContent = player.shield > 0 ? `🛡️ Shield ×${player.shield}` : '';
  }
}

function scorePop(x, y, pts, isCombo) {
  const el = document.createElement('div');
  el.className = `score-pop${isCombo ? ' combo' : ''}`;
  const rect = canvas.getBoundingClientRect();
  const sx =
    (x / W) * rect.width +
    rect.left -
    document.getElementById('game-container').getBoundingClientRect().left;
  const sy =
    (y / H) * rect.height +
    rect.top -
    document.getElementById('game-container').getBoundingClientRect().top;
  el.style.left = `${sx}px`;
  el.style.top = `${sy}px`;
  el.textContent = isCombo ? `+${pts} 🔥` : `+${pts}`;
  document.getElementById('game-container').appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ═══════════════════════════════════════════════════════════════════════════════
// MENUS
// ═══════════════════════════════════════════════════════════════════════════════

function showMainMenu() {
  gs.mode = 'menu';
  document.getElementById('menu-best').textContent = gs.bestScore.toLocaleString();
  document.getElementById('menu-overlay').classList.remove('hidden');
  document.getElementById('pick-overlay').classList.add('hidden');
  document.getElementById('gameover-overlay').classList.add('hidden');
  document.getElementById('game-hud').style.display = 'none';
  document.getElementById('wave-banner').style.display = 'none';
}

function showWeaponPicker() {
  gs.mode = 'pick';
  document.getElementById('menu-overlay').classList.add('hidden');
  document.getElementById('pick-overlay').classList.remove('hidden');

  const grid = document.getElementById('weapon-grid');
  grid.innerHTML = '';
  WEAPONS.forEach(w => {
    const card = document.createElement('div');
    card.className = `w-card${gs.weaponId === w.id ? ' selected' : ''}`;
    card.style.setProperty('--wc', w.color);
    card.innerHTML = `<span class="w-em">${w.emoji}</span><div class="w-name">${w.name}</div><div class="w-desc">${w.desc}</div>`;
    card.addEventListener('click', () => {
      document.querySelectorAll('.w-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      gs.weaponId = w.id;
      const btn = document.getElementById('pick-start-btn');
      btn.textContent = `▶ Start with ${w.name}!`;
      btn.disabled = false;
    });
    grid.appendChild(card);
  });

  // Pre-select current weapon
  const startBtn = document.getElementById('pick-start-btn');
  startBtn.textContent = `▶ Start with ${weaponById(gs.weaponId).name}!`;
  startBtn.disabled = false;
}

function startGame() {
  document.getElementById('pick-overlay').classList.add('hidden');
  document.getElementById('gameover-overlay').classList.add('hidden');
  document.getElementById('game-hud').style.display = 'flex';
  resetArena();
  startWave(1);
}

function showGameOver() {
  gs.mode = 'gameover';
  sndGameOver();
  document.getElementById('game-hud').style.display = 'none';
  document.getElementById('wave-banner').style.display = 'none';

  if (gs.score > gs.bestScore) {
    gs.bestScore = gs.score;
    localStorage.setItem('sb-best', gs.score);
  }

  document.getElementById('go-score').textContent = gs.score.toLocaleString();
  document.getElementById('go-detail').textContent =
    `Wave ${gs.wave} · ${gs.waveKills} enemies defeated`;
  const bestEl = document.getElementById('go-best');
  bestEl.textContent =
    gs.score > 0 && gs.score >= gs.bestScore
      ? '🏆 New Best Score!'
      : `Best: ${gs.bestScore.toLocaleString()}`;
  document.getElementById('gameover-overlay').classList.remove('hidden');
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME LOOP
// ═══════════════════════════════════════════════════════════════════════════════

let lastTs = 0;
let elapsed = 0;

function update(dt) {
  elapsed += dt;
  gs.shake = Math.max(0, gs.shake - dt * 22);
  gs.comboTimer = Math.max(0, gs.comboTimer - dt);
  if (gs.comboTimer <= 0 && gs.comboCount > 0) {
    gs.comboCount = 0;
    updateHUD();
  }

  updateParts(dt);

  if (gs.mode !== 'playing' && gs.mode !== 'waving') {
    return;
  }

  updatePlayer(dt);

  if (gs.mode !== 'playing') {
    return;
  }

  gs.freezeTimer = Math.max(0, gs.freezeTimer - dt);
  updateBullets(dt);
  updateEBullets(dt);

  if (gs.freezeTimer <= 0) {
    enemies.forEach(e => updateEnemy(e, dt));
  }

  updateDrops(dt);

  // Spawn
  gs.spawnTimer -= dt;
  const wave = getCurWave();
  if (gs.spawnTimer <= 0 && gs.spawnCount < wave.n) {
    spawnEnemy();
    gs.spawnCount++;
    gs.spawnTimer = wave.ms / 1000;
  }

  checkCollisions();
  checkWaveComplete();
}

function render() {
  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#020412');
  bg.addColorStop(1, '#07011a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle grid (space feel)
  ctx.strokeStyle = 'rgba(255,255,255,0.025)';
  ctx.lineWidth = 1;
  const gSize = 60;
  for (let x = 0; x < W; x += gSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += gSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  drawStars(elapsed);

  // Screen shake
  if (gs.shake > 0) {
    ctx.save();
    ctx.translate((Math.random() - 0.5) * gs.shake, (Math.random() - 0.5) * gs.shake);
  }

  drawDrops();
  drawEBullets();
  drawBullets();
  drawEnemies(elapsed);

  if (gs.mode === 'playing' || gs.mode === 'waving') {
    drawPlayer(elapsed);
  }

  drawParts();

  if (gs.shake > 0) {
    ctx.restore();
  }
}

function loop(ts) {
  const dt = Math.min((ts - lastTs) / 1000, 0.05);
  lastTs = ts;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

// ═══════════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  setupCanvas();
  setupInput();

  document.getElementById('menu-play-btn').addEventListener('click', showWeaponPicker);
  document.getElementById('pick-start-btn').addEventListener('click', startGame);
  document.getElementById('pick-back-btn').addEventListener('click', showMainMenu);
  document.getElementById('go-retry-btn').addEventListener('click', startGame);
  document.getElementById('go-weapon-btn').addEventListener('click', showWeaponPicker);

  showMainMenu();
  requestAnimationFrame(loop);
});

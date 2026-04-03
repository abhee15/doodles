// Magical Pop Town — game.js
'use strict';

// ─── AUDIO ENGINE ─────────────────────────────────────────────────────────────

let _ac = null;
let isMuted = false;
let _musicTimer = null;

function _ctx() {
  if (!_ac) {
    _ac = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_ac.state === 'suspended') {
    _ac.resume();
  }
  return _ac;
}

function _tone(freq, dur, type, vol) {
  if (isMuted || !freq) {
    return;
  }
  try {
    const ctx = _ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type || 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  } catch (e) {
    // audio context may not be available; silently skip
  }
}

function playPop() {
  if (isMuted) {
    return;
  }
  try {
    const ctx = _ctx();
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.09), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) * 0.8;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = 0.55;
    src.connect(g);
    g.connect(ctx.destination);
    src.start();
  } catch (e) {
    // audio context may not be available; silently skip
  }
}

function playCelebration() {
  [523, 659, 784, 1047].forEach((n, i) =>
    setTimeout(() => _tone(n, 0.45, 'triangle', 0.18), i * 190)
  );
}

function playAnimalSound(emoji) {
  const map = {
    '🐶': 370,
    '🐱': 560,
    '🐥': 880,
    '🦕': 220,
    '🐰': 650,
    '🐢': 290,
    '🦊': 440,
    '🐭': 760
  };
  _tone(map[emoji] || 440, 0.5, 'sine', 0.18);
}

function playClick() {
  _tone(520, 0.1, 'triangle', 0.12);
}

function startMusic() {
  if (isMuted) {
    return;
  }
  stopMusic();
  const mel = [
    261, 0, 329, 0, 392, 0, 329, 0, 261, 0, 0, 0, 392, 0, 440, 0, 392, 0, 329, 0, 0, 0, 0, 0
  ];
  let idx = 0;
  _musicTimer = setInterval(() => {
    if (!isMuted) {
      _tone(mel[idx % mel.length], 0.35, 'triangle', 0.03);
    }
    idx++;
  }, 440);
}

function stopMusic() {
  clearInterval(_musicTimer);
  _musicTimer = null;
}

// ─── GAME CONFIGS ─────────────────────────────────────────────────────────────

const CFG = {
  balloon: {
    name: 'Balloon Sky',
    menuEmoji: '🎈',
    menuBg: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)',
    gameBg: 'linear-gradient(180deg, #4FC3F7 0%, #81D4FA 40%, #B3E5FC 80%, #E1F5FE 100%)',
    decor: ['☁️', '☁️', '⛅', '🌤️', '☁️'],
    objects: ['🎈', '🎈', '🎈', '🎀', '🎊', '🎐'],
    objectHue: true,
    reveals: ['⭐', '💖', '🌈', '🐱', '🦋', '🌟', '🐶', '🌸', '🐣', '🦄'],
    animType: 'float',
    rewardEmoji: '🌈',
    rewardMsg: 'Wow! You popped so many balloons!',
    maxObj: 9,
    spawnMs: 1200,
    dark: false
  },
  bubble: {
    name: 'Bubble Bath',
    menuEmoji: '🛁',
    menuBg: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)',
    gameBg: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #E0FFF7 100%)',
    decor: ['🛁', '🚿', '🦆', '🧼', '🫧'],
    objects: ['BUBBLE', 'BUBBLE', 'BUBBLE', 'BUBBLE'],
    reveals: ['🦆', '🐸', '🐠', '🚢', '🐢', '🐡', '🦀', '🌸', '🐙'],
    animType: 'float',
    rewardEmoji: '🦆',
    rewardMsg: 'Quack! You found all my bubble friends!',
    maxObj: 10,
    spawnMs: 1100,
    dark: false
  },
  egg: {
    name: 'Egg Surprise',
    menuEmoji: '🥚',
    menuBg: 'linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)',
    gameBg: 'linear-gradient(180deg, #DCEDC8 0%, #C8E6C9 50%, #E8F5E9 100%)',
    decor: ['🌸', '🌺', '🌼', '🦋', '🌿'],
    objects: ['EGG'],
    eggColors: ['#FFD6E0', '#C1F0C8', '#BFDEFF', '#FFF3B0', '#F4D0FF', '#FFE4BA', '#D4F0FF'],
    reveals: ['🐶', '🐱', '🐥', '🦕', '🐰', '🐢', '🦊', '🐭'],
    animType: 'bounce',
    rewardEmoji: '🐣',
    rewardMsg: 'All the baby animals are dancing!',
    maxObj: 5,
    spawnMs: 2200,
    isEgg: true,
    dark: false
  },
  candy: {
    name: 'Candy Garden',
    menuEmoji: '🍭',
    menuBg: 'linear-gradient(135deg, #FBC2EB 0%, #A6C1EE 100%)',
    gameBg: 'linear-gradient(180deg, #FFF9C4 0%, #FFF3E0 40%, #F3E5F5 100%)',
    decor: ['🌈', '🦋', '🌸', '🌺', '🌼', '🌻'],
    objects: ['🌸', '🌺', '🌼', '🌷', '🍭', '🌸', '🌺', '🌻'],
    reveals: ['🦋', '💖', '🐞', '🍭', '✨', '🌈', '🌟', '🎀'],
    animType: 'bounce',
    rewardEmoji: '🌈',
    rewardMsg: 'The garden is full of butterflies!',
    maxObj: 7,
    spawnMs: 1700,
    dark: false
  },
  space: {
    name: 'Space Stars',
    menuEmoji: '⭐',
    menuBg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    gameBg: 'linear-gradient(180deg, #030318 0%, #080835 50%, #0a0a50 100%)',
    decor: ['🌙', '🪐', '🌠', '💫', '✨'],
    objects: ['⭐', '🌟', '💫', '✨', '⭐', '🌟', '💫'],
    reveals: ['🚀', '👽', '🌙', '🌠', '🛸', '🪐', '🌟', '🤖'],
    animType: 'float',
    rewardEmoji: '🚀',
    rewardMsg: 'A rocket flies across the sky!',
    maxObj: 9,
    spawnMs: 1400,
    dark: true
  },
  ocean: {
    name: 'Ocean Treasure',
    menuEmoji: '🌊',
    menuBg: 'linear-gradient(135deg, #2193B0 0%, #6DD5ED 100%)',
    gameBg: 'linear-gradient(180deg, #0077B6 0%, #0096C7 40%, #00B4D8 70%, #48CAE4 100%)',
    decor: ['🐠', '🐡', '🦑', '🌊', '🐙', '🦈'],
    objects: ['🐠', '🐡', 'BUBBLE', '🦀', '🐙', '🐠', 'BUBBLE'],
    reveals: ['💎', '🏆', '🦀', '⭐', '🌟', '🐚', '🪸', '💰'],
    animType: 'float',
    rewardEmoji: '💎',
    rewardMsg: 'Treasure chest opens! Gold stars everywhere!',
    maxObj: 7,
    spawnMs: 1600,
    dark: true
  }
};

// ─── STATE ────────────────────────────────────────────────────────────────────

let curGame = null;
let popCount = 0;
let popLevel = 0; // increases every 10 pops — drives speed + density
let objCount = 0;
let spawnTimer = null;

// ─── SCREENS ──────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.pop-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── WELCOME ──────────────────────────────────────────────────────────────────

function initWelcome() {
  // Seed twinkling stars
  const ws = document.getElementById('w-stars');
  const starPool = ['✨', '⭐', '🌟', '💫'];
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('div');
    s.className = 'w-star';
    s.textContent = starPool[Math.floor(Math.random() * starPool.length)];
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-duration:${1.4 + Math.random() * 2.2}s;animation-delay:${Math.random() * 3}s;font-size:${0.55 + Math.random() * 0.7}rem`;
    ws.appendChild(s);
  }

  showScreen('welcome');
  let gone = false;
  function advance() {
    if (gone) {
      return;
    }
    gone = true;
    playClick();
    showMenu();
  }
  document.getElementById('welcome').addEventListener('click', advance, { once: true });
  setTimeout(advance, 5000);
}

// ─── MENU ─────────────────────────────────────────────────────────────────────

function showMenu() {
  showScreen('menu');
  stopMusic();
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  Object.entries(CFG).forEach(([id, c]) => {
    const btn = document.createElement('button');
    btn.className = 'game-card';
    btn.style.background = c.menuBg;
    btn.innerHTML = `<span class="gc-emoji">${c.menuEmoji}</span><span class="gc-name">${c.name}</span>`;
    btn.addEventListener('click', () => {
      playClick();
      startGame(id);
    });
    grid.appendChild(btn);
  });
}

// ─── GAME ENGINE ──────────────────────────────────────────────────────────────

function startGame(gameId) {
  curGame = gameId;
  popCount = 0;
  popLevel = 0;
  objCount = 0;
  const c = CFG[gameId];

  showScreen('game');

  const area = document.getElementById('game-area');
  area.innerHTML = '';
  area.style.background = c.gameBg;

  // Nav theme
  const nav = document.getElementById('game-nav');
  nav.style.background = c.dark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.3)';
  document.getElementById('game-title').style.color = c.dark ? '#fff' : '#333';
  document.getElementById('game-title').textContent = c.name;
  document.getElementById('home-btn').style.filter = c.dark ? 'brightness(2)' : 'none';
  document.getElementById('mute-btn').style.filter = c.dark ? 'brightness(2)' : 'none';

  // Background decorations
  c.decor.forEach(d => {
    const el = document.createElement('div');
    el.className = 'decor';
    el.textContent = d;
    el.style.cssText = `left:${5 + Math.random() * 85}%;top:${5 + Math.random() * 78}%;font-size:${1.1 + Math.random() * 0.9}rem;animation-duration:${2.5 + Math.random() * 2}s;animation-delay:${Math.random() * 2}s;opacity:${c.dark ? 0.2 : 0.28}`;
    area.appendChild(el);
  });

  updateCounter();
  stopSpawning();
  spawnObj();
  restartSpawner();
  startMusic();
}

function stopSpawning() {
  clearInterval(spawnTimer);
  spawnTimer = null;
}

// ─── OBJECT SPAWNING ──────────────────────────────────────────────────────────

function spawnObj() {
  if (!curGame) {
    return;
  }
  const c = CFG[curGame];
  const area = document.getElementById('game-area');
  const W = area.clientWidth || 360;
  const H = area.clientHeight || 560;

  const size = 66 + Math.random() * 22;
  const template = c.objects[Math.floor(Math.random() * c.objects.length)];

  const el = document.createElement('div');
  el.className = 'pop-obj';
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.fontSize = `${size * 0.68}px`;

  if (c.animType === 'float') {
    el.style.left = `${10 + Math.random() * (W - size - 20)}px`;
    el.style.top = `${H + 10}px`;
    const dur = Math.max(2.0, 4 + Math.random() * 3 - popLevel * 0.25);
    el.style.animationDuration = `${dur}s`;
    el.classList.add('anim-float');
    el.addEventListener('animationend', () => cleanup(el));
    setTimeout(() => cleanup(el), (dur + 0.8) * 1000);
  } else {
    // bounce: stays in place
    el.style.left = `${8 + Math.random() * (W - size - 16)}px`;
    el.style.top = `${H * 0.08 + Math.random() * (H * 0.72)}px`;
    el.style.animationDuration = `${1.1 + Math.random() * 0.8}s`;
    el.classList.add('anim-bounce');
    setTimeout(() => cleanup(el), 8000 + Math.random() * 5000);
  }

  // Render content
  if (template === 'BUBBLE') {
    el.classList.add('is-bubble');
    el.innerHTML = '<div class="bubble-inner"></div>';
  } else if (template === 'EGG') {
    const col = c.eggColors[Math.floor(Math.random() * c.eggColors.length)];
    el.classList.add('is-egg');
    el.dataset.cracked = '0';
    el.style.background = col;
    el.innerHTML = '<span class="egg-inner">🥚</span>';
  } else {
    el.textContent = template;
    if (c.objectHue) {
      el.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
    }
    if (c.dark) {
      el.style.filter = 'drop-shadow(0 0 10px rgba(255,255,200,0.7))';
    }
  }

  // Tap handler
  const onTap = e => {
    e.preventDefault();
    e.stopPropagation();
    if (el.dataset.popping === '1') {
      return;
    }
    const rect = area.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    doPop(el, cx, cy);
  };
  el.addEventListener('click', onTap);
  el.addEventListener('touchstart', onTap, { passive: false });

  area.appendChild(el);
  objCount++;
}

function cleanup(el) {
  if (el.parentNode) {
    el.remove();
    objCount = Math.max(0, objCount - 1);
  }
}

// ─── POP LOGIC ────────────────────────────────────────────────────────────────

function doPop(el, x, y) {
  const c = CFG[curGame];

  // Egg: two-phase crack → reveal
  if (c.isEgg && el.dataset.cracked === '0') {
    el.dataset.cracked = '1';
    el.classList.add('egg-crack');
    el.querySelector('.egg-inner').textContent = '🐣';
    _tone(350, 0.12, 'square', 0.15);
    setTimeout(() => {
      const animal = c.reveals[Math.floor(Math.random() * c.reveals.length)];
      playAnimalSound(animal);
      cleanup(el);
      showReveal(animal, x, y);
      emitParticles(x, y, false);
      incPop();
    }, 520);
    return;
  }

  el.dataset.popping = '1';
  playPop();
  el.classList.add('popping');

  setTimeout(() => {
    const c2 = CFG[curGame];
    if (!c2) {
      return;
    }
    const reveal = c2.reveals[Math.floor(Math.random() * c2.reveals.length)];
    cleanup(el);
    showReveal(reveal, x, y);
    emitParticles(x, y, c2.dark);
    incPop();
  }, 290);
}

// Returns effective max objects for current level
function effectiveMaxObj() {
  return Math.min(CFG[curGame].maxObj + popLevel, CFG[curGame].maxObj + 6);
}

// Returns effective spawn interval (ms) for current level
function effectiveSpawnMs() {
  return Math.max(Math.floor(CFG[curGame].spawnMs * 0.5), CFG[curGame].spawnMs - popLevel * 90);
}

function restartSpawner() {
  stopSpawning();
  spawnTimer = setInterval(() => {
    if (objCount < effectiveMaxObj()) {
      spawnObj();
    }
  }, effectiveSpawnMs());
}

function incPop() {
  popCount++;
  updateCounter();
  if (popCount % 10 === 0) {
    popLevel++;
    celebrate();
    restartSpawner(); // bump up speed + density
  }
}

// ─── REVEAL ───────────────────────────────────────────────────────────────────

function showReveal(emoji, x, y) {
  const area = document.getElementById('game-area');
  const el = document.createElement('div');
  el.className = 'reveal-item';
  el.textContent = emoji;
  el.style.left = `${x - 24}px`;
  el.style.top = `${y - 24}px`;
  area.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────

function emitParticles(x, y, dark) {
  const area = document.getElementById('game-area');
  const pool = dark ? ['✨', '💫', '⭐', '🌟', '💥'] : ['✨', '💖', '⭐', '🌸', '💫', '🌈', '🎀'];
  for (let i = 0; i < 7; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 45 + Math.random() * 60;
    p.textContent = pool[Math.floor(Math.random() * pool.length)];
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    area.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

// ─── COUNTER ──────────────────────────────────────────────────────────────────

function updateCounter() {
  const el = document.getElementById('pop-counter');
  const filled = popCount % 10;
  el.innerHTML = Array.from(
    { length: 10 },
    (_, i) => `<span class="cstar${i < filled ? ' on' : ''}">${i < filled ? '★' : '☆'}</span>`
  ).join('');
}

// ─── CELEBRATION ──────────────────────────────────────────────────────────────

function celebrate() {
  playCelebration();

  const overlay = document.getElementById('cel-overlay');
  overlay.innerHTML = '';

  const confPool = ['🎉', '🎊', '⭐', '💖', '🌈', '🎈', '✨', '🌟', '🎀', '🐣'];
  for (let i = 0; i < 28; i++) {
    const d = document.createElement('div');
    d.className = 'confetti';
    d.textContent = confPool[Math.floor(Math.random() * confPool.length)];
    d.style.left = `${Math.random() * 100}%`;
    d.style.animationDelay = `${Math.random() * 0.7}s`;
    d.style.fontSize = `${0.9 + Math.random() * 0.9}rem`;
    overlay.appendChild(d);
  }

  overlay.classList.add('show');
  // Clear confetti after animation finishes — game keeps running throughout
  setTimeout(() => {
    overlay.classList.remove('show');
    overlay.innerHTML = '';
  }, 3200);
}

// ─── CONTROLS ─────────────────────────────────────────────────────────────────

function goHome() {
  stopSpawning();
  stopMusic();
  curGame = null;
  document.getElementById('game-area').innerHTML = '';
  objCount = 0;
  showMenu();
}

function toggleMute() {
  isMuted = !isMuted;
  document.getElementById('mute-btn').textContent = isMuted ? '🔇' : '🔊';
  if (isMuted) {
    stopMusic();
  } else if (curGame) {
    startMusic();
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home-btn').addEventListener('click', goHome);
  document.getElementById('mute-btn').addEventListener('click', toggleMute);
  initWelcome();
});

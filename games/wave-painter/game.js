'use strict';

// ── SHAPES ───────────────────────────────────────────────────────────────────

const SHAPES = [
  {
    id: 'star',
    emoji: '⭐',
    label: 'Star',
    build: function () {
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * Math.PI * 2;
        const r = 0.5 + 0.5 * Math.cos(5 * t);
        pts.push([Math.cos(t - Math.PI / 2) * r, Math.sin(t - Math.PI / 2) * r]);
      }
      return pts;
    }
  },
  {
    id: 'heart',
    emoji: '❤️',
    label: 'Heart',
    build: function () {
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        pts.push([x / 18, -y / 18]);
      }
      return pts;
    }
  },
  {
    id: 'butterfly',
    emoji: '🦋',
    label: 'Butterfly',
    build: function () {
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * Math.PI * 2;
        const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
        pts.push([Math.sin(t) * r * 0.3, -Math.cos(t) * r * 0.3]);
      }
      return pts;
    }
  },
  {
    id: 'flower',
    emoji: '🌸',
    label: 'Flower',
    build: function () {
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * Math.PI * 2;
        const r = Math.abs(Math.cos(4 * t));
        pts.push([Math.cos(t) * r * 0.9, Math.sin(t) * r * 0.9]);
      }
      return pts;
    }
  },
  {
    id: 'infinity',
    emoji: '♾️',
    label: 'Infinity',
    build: function () {
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * Math.PI * 2;
        const d = 1 + Math.pow(Math.sin(t), 2) * 0.5;
        pts.push([Math.cos(t) / d, (Math.sin(t) * Math.cos(t)) / d]);
      }
      return pts;
    }
  },
  {
    id: 'wave',
    emoji: '🌊',
    label: 'Wave',
    build: function () {
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * Math.PI * 2;
        pts.push([Math.cos(t) * 0.9, Math.sin(t) * Math.sin(2 * t) * 0.9]);
      }
      return pts;
    }
  },
  {
    id: 'spiral',
    emoji: '🌀',
    label: 'Spiral',
    build: function () {
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const f = i / 300;
        const t = f * Math.PI * 2 * 3;
        pts.push([Math.cos(t) * f * 0.9, Math.sin(t) * f * 0.9]);
      }
      return pts;
    }
  },
  {
    id: 'diamond',
    emoji: '💎',
    label: 'Diamond',
    build: function () {
      const corners = [
        [0, -1],
        [0.9, 0],
        [0, 1],
        [-0.9, 0],
        [0, -1]
      ];
      const pts = [];
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * (corners.length - 1);
        const seg = Math.floor(t);
        const f = t - seg;
        const a = corners[Math.min(seg, corners.length - 2)];
        const b = corners[Math.min(seg + 1, corners.length - 1)];
        pts.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
      }
      return pts;
    }
  }
];

// ── DFT ──────────────────────────────────────────────────────────────────────

function computeDFT(pts) {
  const N = pts.length;
  const result = [];
  for (let k = 0; k < N; k++) {
    let re = 0,
      im = 0;
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      re += pts[n].x * Math.cos(angle) + pts[n].y * Math.sin(angle);
      im += pts[n].y * Math.cos(angle) - pts[n].x * Math.sin(angle);
    }
    re /= N;
    im /= N;
    result.push({ freq: k, amp: Math.sqrt(re * re + im * im), phase: Math.atan2(im, re) });
  }
  return result.sort((a, b) => b.amp - a.amp);
}

function resample(rawPts, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * (rawPts.length - 1);
    const lo = Math.floor(t);
    const hi = Math.min(lo + 1, rawPts.length - 1);
    const f = t - lo;
    out.push({
      x: rawPts[lo][0] + (rawPts[hi][0] - rawPts[lo][0]) * f,
      y: rawPts[lo][1] + (rawPts[hi][1] - rawPts[lo][1]) * f
    });
  }
  return out;
}

// ── SHAPE MODE STATE ─────────────────────────────────────────────────────────

const shapeState = {
  shapeIdx: 0,
  numCircles: 20,
  speed: 3,
  paused: false,
  showCircles: true,
  stepIndex: 0,
  trail: [],
  fourier: [],
  totalSteps: 128,
  canvasSize: 500
};

function computeShape() {
  const raw = SHAPES[shapeState.shapeIdx].build();
  const pts = resample(raw, shapeState.totalSteps);
  shapeState.fourier = computeDFT(pts);
  shapeState.stepIndex = 0;
  shapeState.trail = [];
}

function drawShapeFrame(ctx) {
  const size = shapeState.canvasSize;
  const cx = size / 2,
    cy = size / 2,
    scale = size * 0.42;
  const N = Math.min(shapeState.numCircles, shapeState.fourier.length);
  const t = (2 * Math.PI * shapeState.stepIndex) / shapeState.totalSteps;
  ctx.clearRect(0, 0, size, size);
  let x = cx,
    y = cy;
  for (let i = 0; i < N; i++) {
    const { freq, amp, phase } = shapeState.fourier[i];
    const angle = freq * t + phase;
    const nx = x + amp * scale * Math.cos(angle);
    const ny = y + amp * scale * Math.sin(angle);
    if (shapeState.showCircles) {
      ctx.beginPath();
      ctx.arc(x, y, amp * scale, 0, Math.PI * 2);
      ctx.strokeStyle = i === 0 ? 'rgba(168,85,247,0.35)' : 'rgba(168,85,247,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = 'rgba(192,132,252,0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(nx, ny, i === 0 ? 3.5 : 2, 0, Math.PI * 2);
      ctx.fillStyle = '#c084fc';
      ctx.fill();
    }
    x = nx;
    y = ny;
  }
  shapeState.trail.unshift({ x, y });
  if (shapeState.trail.length > shapeState.totalSteps) {
    shapeState.trail.length = shapeState.totalSteps;
  }
  if (shapeState.showCircles) {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#e879f9';
    ctx.fill();
  }
  if (shapeState.trail.length > 1) {
    for (let i = 0; i < shapeState.trail.length - 1; i++) {
      const alpha = 1 - i / shapeState.trail.length;
      ctx.beginPath();
      ctx.moveTo(shapeState.trail[i].x, shapeState.trail[i].y);
      ctx.lineTo(shapeState.trail[i + 1].x, shapeState.trail[i + 1].y);
      ctx.strokeStyle = `rgba(232,121,249,${alpha * 0.9})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  }
  // Circle count label
  ctx.fillStyle = 'rgba(192,132,252,0.6)';
  ctx.font = `bold ${Math.round(size * 0.026)}px sans-serif`;
  ctx.fillText(`${N} circles`, 10, size - 10);

  if (!shapeState.paused) {
    const inc = Math.max(1, Math.round([0.25, 0.5, 1, 2, 4][shapeState.speed - 1]));
    shapeState.stepIndex = (shapeState.stepIndex + inc) % shapeState.totalSteps;
  }
}

// ── WAVE BUILDER STATE ────────────────────────────────────────────────────────
// Each wave: { cycles, amp (0-100), phase (0-360 degrees), on }

const WAVE_COLORS = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];

const builderState = {
  waves: [
    { cycles: 1, amp: 80, phase: 0, on: true },
    { cycles: 3, amp: 40, phase: 0, on: true },
    { cycles: 5, amp: 20, phase: 0, on: false },
    { cycles: 7, amp: 10, phase: 0, on: false },
    { cycles: 2, amp: 30, phase: 0, on: false }
  ],
  time: 0,
  paused: false,
  showComponents: true,
  canvasSize: 500,
  challengeIdx: -1 // -1 = no challenge active
};

// ── PRESETS ───────────────────────────────────────────────────────────────────

const PRESETS = {
  pure: [
    { cycles: 1, amp: 80, phase: 0, on: true },
    { cycles: 3, amp: 0, phase: 0, on: false },
    { cycles: 5, amp: 0, phase: 0, on: false },
    { cycles: 7, amp: 0, phase: 0, on: false },
    { cycles: 2, amp: 0, phase: 0, on: false }
  ],
  square: [
    { cycles: 1, amp: 80, phase: 0, on: true },
    { cycles: 3, amp: 27, phase: 0, on: true },
    { cycles: 5, amp: 16, phase: 0, on: true },
    { cycles: 7, amp: 11, phase: 0, on: true },
    { cycles: 9, amp: 9, phase: 0, on: true }
  ],
  sawtooth: [
    { cycles: 1, amp: 80, phase: 0, on: true },
    { cycles: 2, amp: 40, phase: 0, on: true },
    { cycles: 3, amp: 27, phase: 0, on: true },
    { cycles: 4, amp: 20, phase: 0, on: true },
    { cycles: 5, amp: 16, phase: 0, on: true }
  ],
  triangle: [
    { cycles: 1, amp: 80, phase: 0, on: true },
    { cycles: 3, amp: 9, phase: 180, on: true },
    { cycles: 5, amp: 3, phase: 0, on: true },
    { cycles: 7, amp: 2, phase: 180, on: true },
    { cycles: 9, amp: 1, phase: 0, on: false }
  ]
};

// ── CHALLENGES ───────────────────────────────────────────────────────────────

const CHALLENGES = [
  {
    name: 'Pure Sine',
    hint: 'Just 1 wave, 1 cycle, full amplitude. Turn off all others!',
    emoji: '〰️',
    target: PRESETS.pure
  },
  {
    name: 'Square Wave',
    hint: 'Odd harmonics (1, 3, 5, 7, 9…) each getting smaller: 80 → 27 → 16 → 11 → 9',
    emoji: '⬛',
    target: PRESETS.square
  },
  {
    name: 'Sawtooth Wave',
    hint: 'All harmonics (1, 2, 3, 4, 5…) each half the previous amplitude',
    emoji: '📈',
    target: PRESETS.sawtooth
  },
  {
    name: 'Triangle Wave',
    hint: 'Odd harmonics with alternating phase (0°, 180°, 0°…) and amplitudes drop fast',
    emoji: '🔺',
    target: PRESETS.triangle
  }
];

// ── HARMONIC LABEL ────────────────────────────────────────────────────────────

function harmonicLabel(cycles) {
  const names = [
    '',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th'
  ];
  if (cycles <= 12) {
    return `${names[cycles]} harmonic`;
  }
  return `${cycles}× frequency`;
}

// ── WAVE MATH ─────────────────────────────────────────────────────────────────

function getWaveY(wave, x, width) {
  const phaseRad = (wave.phase / 180) * Math.PI;
  const spatial = (x / width) * 2 * Math.PI * wave.cycles;
  return (wave.amp / 100) * Math.sin(spatial + builderState.time * wave.cycles * 0.04 + phaseRad);
}

function computeMatchScore() {
  const ch = CHALLENGES[builderState.challengeIdx];
  if (!ch) {
    return -1;
  }
  const W = 200;
  let diff = 0;
  for (let px = 0; px < W; px++) {
    let userSum = 0,
      targetSum = 0;
    const activeUser = builderState.waves.filter(w => w.on).length || 1;
    const activeTarget = ch.target.filter(w => w.on).length || 1;
    builderState.waves.forEach(function (w) {
      if (w.on) {
        userSum += getWaveY(w, px, W);
      }
    });
    ch.target.forEach(function (w) {
      if (w.on) {
        const phaseRad = (w.phase / 180) * Math.PI;
        const spatial = (px / W) * 2 * Math.PI * w.cycles;
        targetSum +=
          (w.amp / 100) * Math.sin(spatial + builderState.time * w.cycles * 0.04 + phaseRad);
      }
    });
    diff += Math.abs(userSum / activeUser - targetSum / activeTarget);
  }
  const score = Math.max(0, 100 - Math.round((diff / W) * 150));
  return score;
}

// ── DRAW BUILDER ──────────────────────────────────────────────────────────────

function drawBuilderFrame(ctx) {
  const W = builderState.canvasSize;
  const H = Math.round(W * 0.56);
  ctx.clearRect(0, 0, W, H);
  const midY = H / 2;
  const ampScale = H * 0.4;

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = (H / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, midY);
  ctx.lineTo(W, midY);
  ctx.stroke();

  // Challenge target wave (dashed orange)
  if (builderState.challengeIdx >= 0) {
    const ch = CHALLENGES[builderState.challengeIdx];
    const activeTarget = ch.target.filter(w => w.on).length || 1;
    ctx.beginPath();
    ctx.strokeStyle = '#fb923c';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 5]);
    for (let px = 0; px <= W; px += 2) {
      let sum = 0;
      ch.target.forEach(function (w) {
        if (w.on) {
          const phaseRad = (w.phase / 180) * Math.PI;
          const spatial = (px / W) * 2 * Math.PI * w.cycles;
          sum += (w.amp / 100) * Math.sin(spatial + builderState.time * w.cycles * 0.04 + phaseRad);
        }
      });
      const y = midY - (sum / activeTarget) * ampScale;
      if (px === 0) {
        ctx.moveTo(px, y);
      } else {
        ctx.lineTo(px, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Target label
    ctx.fillStyle = '#fb923c';
    ctx.font = `bold ${Math.round(W * 0.026)}px sans-serif`;
    ctx.fillText(`🎯 Target: ${ch.name}`, 10, 22);
  }

  // Component waves
  if (builderState.showComponents) {
    builderState.waves.forEach(function (wave, wi) {
      if (!wave.on || wave.amp === 0) {
        return;
      }
      ctx.beginPath();
      ctx.strokeStyle = `${WAVE_COLORS[wi]}aa`;
      ctx.lineWidth = 2;
      for (let px = 0; px <= W; px += 2) {
        const y = midY - getWaveY(wave, px, W) * ampScale;
        if (px === 0) {
          ctx.moveTo(px, y);
        } else {
          ctx.lineTo(px, y);
        }
      }
      ctx.stroke();
    });
  }

  // Combined wave (white)
  const activeCount = builderState.waves.filter(w => w.on).length || 1;
  ctx.beginPath();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  for (let px = 0; px <= W; px += 2) {
    let sum = 0;
    builderState.waves.forEach(function (wave) {
      if (wave.on) {
        sum += getWaveY(wave, px, W);
      }
    });
    const y = midY - (sum / activeCount) * ampScale;
    if (px === 0) {
      ctx.moveTo(px, y);
    } else {
      ctx.lineTo(px, y);
    }
  }
  ctx.stroke();

  // Legend
  const fontSize = Math.round(W * 0.024);
  ctx.font = `bold ${fontSize}px sans-serif`;
  if (builderState.challengeIdx < 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('— Your wave', 10, 22);
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('— Your wave', 10, 44);
    // Match score
    const score = computeMatchScore();
    const scoreColor = score >= 80 ? '#34d399' : score >= 50 ? '#fbbf24' : '#f87171';
    ctx.fillStyle = scoreColor;
    ctx.fillText(`Match: ${score}%`, W - 110, 22);
  }

  if (!builderState.paused) {
    builderState.time++;
  }
}

// ── MODE MANAGEMENT ───────────────────────────────────────────────────────────

let currentMode = 'shape';
let shapeCanvas, builderCanvas;

function switchMode(mode) {
  currentMode = mode;
  ['shape', 'builder', 'challenge'].forEach(function (m) {
    const el = document.getElementById(`panel-${m}`);
    if (el) {
      el.style.display = m === mode ? '' : 'none';
    }
  });
  document.querySelectorAll('.mode-tab').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

// ── PRESET LOADER ─────────────────────────────────────────────────────────────

function loadPreset(key) {
  const preset = PRESETS[key];
  if (!preset) {
    return;
  }
  preset.forEach(function (p, i) {
    builderState.waves[i] = Object.assign({}, p);
  });
  buildWaveSlots();
}

// ── CHALLENGE UI ──────────────────────────────────────────────────────────────

function buildChallengePanel() {
  const list = document.getElementById('challenge-list');
  list.innerHTML = '';
  CHALLENGES.forEach(function (ch, idx) {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `
      <div class="challenge-header">
        <span class="challenge-emoji">${ch.emoji}</span>
        <span class="challenge-name">${ch.name}</span>
      </div>
      <div class="challenge-hint">${ch.hint}</div>
      <button class="act-btn primary ch-start-btn" data-idx="${idx}">
        <i class="ti ti-target-arrow"></i> Try this challenge
      </button>
    `;
    list.appendChild(card);
  });
  list.querySelectorAll('.ch-start-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const idx = parseInt(this.dataset.idx);
      builderState.challengeIdx = idx;
      // Reset waves to all-off defaults for challenge
      builderState.waves = [
        { cycles: 1, amp: 0, phase: 0, on: false },
        { cycles: 3, amp: 0, phase: 0, on: false },
        { cycles: 5, amp: 0, phase: 0, on: false },
        { cycles: 7, amp: 0, phase: 0, on: false },
        { cycles: 2, amp: 0, phase: 0, on: false }
      ];
      buildWaveSlots();
      switchMode('builder');
      document.getElementById('active-challenge-bar').style.display = 'flex';
      document.getElementById('active-challenge-name').textContent =
        `${CHALLENGES[idx].emoji} ${CHALLENGES[idx].name}`;
    });
  });
}

// ── BUILDER UI ────────────────────────────────────────────────────────────────

function buildWaveSlots() {
  const container = document.getElementById('wave-slots');
  container.innerHTML = '';
  builderState.waves.forEach(function (wave, wi) {
    const slot = document.createElement('div');
    slot.className = `wave-slot${wave.on ? ' on' : ''}`;
    slot.style.setProperty('--wave-color', WAVE_COLORS[wi]);
    const hlabel = harmonicLabel(wave.cycles);
    slot.innerHTML = `
      <div class="wave-slot-header">
        <span class="wave-dot" style="background:${WAVE_COLORS[wi]}"></span>
        <span class="wave-slot-label">Wave ${['A', 'B', 'C', 'D', 'E'][wi]}</span>
        <span class="harmonic-badge" id="hbadge-${wi}" style="color:${WAVE_COLORS[wi]}">${hlabel}</span>
        <label class="wave-toggle">
          <input type="checkbox" class="wave-on" data-wi="${wi}" ${wave.on ? 'checked' : ''} />
          <span class="toggle-track"></span>
        </label>
      </div>
      <div class="wave-params ${wave.on ? '' : 'dim'}">
        <div class="param-row">
          <span class="param-label">Frequency <span class="param-val" id="cycles-val-${wi}">${wave.cycles}×</span></span>
          <input type="range" class="wave-cycles" data-wi="${wi}" min="1" max="12" value="${wave.cycles}" />
        </div>
        <div class="param-row">
          <span class="param-label">Amplitude <span class="param-val" id="amp-val-${wi}">${wave.amp}%</span></span>
          <input type="range" class="wave-amp" data-wi="${wi}" min="0" max="100" value="${wave.amp}" />
        </div>
        <div class="param-row">
          <span class="param-label">Phase <span class="param-val" id="phase-val-${wi}">${wave.phase}°</span></span>
          <input type="range" class="wave-phase" data-wi="${wi}" min="0" max="360" value="${wave.phase}" />
        </div>
      </div>
    `;
    container.appendChild(slot);
  });

  container.querySelectorAll('.wave-on').forEach(function (cb) {
    cb.addEventListener('change', function () {
      const wi = parseInt(this.dataset.wi);
      builderState.waves[wi].on = this.checked;
      const slot = this.closest('.wave-slot');
      slot.classList.toggle('on', this.checked);
      slot.querySelector('.wave-params').classList.toggle('dim', !this.checked);
    });
  });
  container.querySelectorAll('.wave-cycles').forEach(function (sl) {
    sl.addEventListener('input', function () {
      const wi = parseInt(this.dataset.wi);
      builderState.waves[wi].cycles = parseInt(this.value);
      document.getElementById(`cycles-val-${wi}`).textContent = `${this.value}×`;
      document.getElementById(`hbadge-${wi}`).textContent = harmonicLabel(parseInt(this.value));
    });
  });
  container.querySelectorAll('.wave-amp').forEach(function (sl) {
    sl.addEventListener('input', function () {
      const wi = parseInt(this.dataset.wi);
      builderState.waves[wi].amp = parseInt(this.value);
      document.getElementById(`amp-val-${wi}`).textContent = `${this.value}%`;
    });
  });
  container.querySelectorAll('.wave-phase').forEach(function (sl) {
    sl.addEventListener('input', function () {
      const wi = parseInt(this.dataset.wi);
      builderState.waves[wi].phase = parseInt(this.value);
      document.getElementById(`phase-val-${wi}`).textContent = `${this.value}°`;
    });
  });
}

// ── SHAPE CONTROLS ────────────────────────────────────────────────────────────

function initShapeControls() {
  document.getElementById('circles-slider').addEventListener('input', function () {
    shapeState.numCircles = parseInt(this.value);
    document.getElementById('circles-val').textContent = shapeState.numCircles;
    shapeState.trail = [];
    shapeState.stepIndex = 0;
  });
  const speedLabels = ['Slow', 'Slow', 'Normal', 'Fast', 'Turbo'];
  document.getElementById('speed-slider').addEventListener('input', function () {
    shapeState.speed = parseInt(this.value);
    document.getElementById('speed-val').textContent = speedLabels[shapeState.speed - 1];
  });
  document.getElementById('btn-play-pause').addEventListener('click', function () {
    shapeState.paused = !shapeState.paused;
    this.innerHTML = shapeState.paused
      ? '<i class="ti ti-player-play"></i> Play'
      : '<i class="ti ti-player-pause"></i> Pause';
  });
  document.getElementById('btn-clear').addEventListener('click', function () {
    shapeState.trail = [];
    shapeState.stepIndex = 0;
  });
  document.getElementById('btn-circles').addEventListener('click', function () {
    shapeState.showCircles = !shapeState.showCircles;
    this.innerHTML = shapeState.showCircles
      ? '<i class="ti ti-eye"></i> Hide Circles'
      : '<i class="ti ti-eye-off"></i> Show Circles';
  });
}

function buildShapePicker() {
  const picker = document.getElementById('shape-picker');
  picker.innerHTML = '';
  SHAPES.forEach(function (shape, i) {
    const btn = document.createElement('button');
    btn.className = `shape-btn${i === shapeState.shapeIdx ? ' active' : ''}`;
    btn.innerHTML = `<span class="shape-emoji">${shape.emoji}</span>${shape.label}`;
    btn.addEventListener('click', function () {
      shapeState.shapeIdx = i;
      document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      computeShape();
    });
    picker.appendChild(btn);
  });
}

// ── BUILDER CONTROLS ──────────────────────────────────────────────────────────

function initBuilderControls() {
  document.getElementById('btn-builder-pause').addEventListener('click', function () {
    builderState.paused = !builderState.paused;
    this.innerHTML = builderState.paused
      ? '<i class="ti ti-player-play"></i> Play'
      : '<i class="ti ti-player-pause"></i> Pause';
  });
  document.getElementById('btn-show-components').addEventListener('click', function () {
    builderState.showComponents = !builderState.showComponents;
    this.innerHTML = builderState.showComponents
      ? '<i class="ti ti-layers-subtract"></i> Hide Components'
      : '<i class="ti ti-layers"></i> Show Components';
  });
  document.getElementById('btn-stop-challenge').addEventListener('click', function () {
    builderState.challengeIdx = -1;
    document.getElementById('active-challenge-bar').style.display = 'none';
  });

  // Presets
  document.querySelectorAll('.preset-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      loadPreset(this.dataset.preset);
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ── RESIZE ────────────────────────────────────────────────────────────────────

function resizeCanvases() {
  const size = Math.min(shapeCanvas.parentElement.clientWidth || 500, 600);
  shapeState.canvasSize = size;
  shapeCanvas.width = size;
  shapeCanvas.height = size;

  const bw = Math.min(builderCanvas.parentElement.clientWidth || 500, 700);
  builderState.canvasSize = bw;
  builderCanvas.width = bw;
  builderCanvas.height = Math.round(bw * 0.56);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  shapeCanvas = document.getElementById('wave-canvas');
  builderCanvas = document.getElementById('builder-canvas');
  const shapeCtx = shapeCanvas.getContext('2d');
  const builderCtx = builderCanvas.getContext('2d');

  resizeCanvases();
  buildShapePicker();
  computeShape();
  initShapeControls();
  buildWaveSlots();
  initBuilderControls();
  buildChallengePanel();

  document.querySelectorAll('.mode-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchMode(this.dataset.mode);
    });
  });

  window.addEventListener('resize', function () {
    resizeCanvases();
    shapeState.trail = [];
  });

  function loop() {
    if (currentMode === 'shape') {
      drawShapeFrame(shapeCtx);
    } else if (currentMode === 'builder') {
      drawBuilderFrame(builderCtx);
    }
    requestAnimationFrame(loop);
  }
  loop();
});

'use strict';

// ── SHAPES ──────────────────────────────────────────────────────────────────
// Points normalized to [-1, 1]. The DFT will scale them to the canvas.

const SHAPES = [
  {
    id: 'star',
    emoji: '⭐',
    label: 'Star',
    build: function () {
      const pts = [];
      const petals = 5;
      for (let i = 0; i <= 300; i++) {
        const t = (i / 300) * Math.PI * 2;
        const r = 0.5 + 0.5 * Math.cos(petals * t);
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
      const turns = 3;
      for (let i = 0; i <= 300; i++) {
        const f = i / 300;
        const t = f * Math.PI * 2 * turns;
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

// ── DFT (complex) ────────────────────────────────────────────────────────────
// Input: array of {x, y} treated as complex numbers (x + iy)
// Output: sorted by amplitude, each entry: { freq, amp, phase }

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
    result.push({
      freq: k,
      amp: Math.sqrt(re * re + im * im),
      phase: Math.atan2(im, re)
    });
  }
  return result.sort((a, b) => b.amp - a.amp);
}

// ── RESAMPLE ─────────────────────────────────────────────────────────────────

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

// ── STATE ────────────────────────────────────────────────────────────────────

const state = {
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

// ── COMPUTE ───────────────────────────────────────────────────────────────────

function computeShape() {
  const shape = SHAPES[state.shapeIdx];
  const raw = shape.build();
  const pts = resample(raw, state.totalSteps);
  state.fourier = computeDFT(pts);
  state.stepIndex = 0;
  state.trail = [];
}

// ── DRAW ─────────────────────────────────────────────────────────────────────

function drawFrame(ctx) {
  const size = state.canvasSize;
  const cx = size / 2;
  const cy = size / 2;
  const scale = size * 0.42;
  const N = Math.min(state.numCircles, state.fourier.length);
  const t = (2 * Math.PI * state.stepIndex) / state.totalSteps;

  ctx.clearRect(0, 0, size, size);

  // Draw epicycle chain
  let x = cx,
    y = cy;
  for (let i = 0; i < N; i++) {
    const { freq, amp, phase } = state.fourier[i];
    const angle = freq * t + phase;
    const nx = x + amp * scale * Math.cos(angle);
    const ny = y + amp * scale * Math.sin(angle);

    if (state.showCircles) {
      const r = amp * scale;
      // Orbit circle
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = i === 0 ? 'rgba(168,85,247,0.35)' : 'rgba(168,85,247,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Arm
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = 'rgba(192,132,252,0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Joint dot
      ctx.beginPath();
      ctx.arc(nx, ny, i === 0 ? 3.5 : 2, 0, Math.PI * 2);
      ctx.fillStyle = '#c084fc';
      ctx.fill();
    }

    x = nx;
    y = ny;
  }

  // Record tip position for trail
  state.trail.unshift({ x, y });
  if (state.trail.length > state.totalSteps) {
    state.trail.length = state.totalSteps;
  }

  // Glow at tip
  if (state.showCircles) {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#e879f9';
    ctx.fill();
  }

  // Trail — color fades from bright to dim
  if (state.trail.length > 1) {
    for (let i = 0; i < state.trail.length - 1; i++) {
      const alpha = 1 - i / state.trail.length;
      ctx.beginPath();
      ctx.moveTo(state.trail[i].x, state.trail[i].y);
      ctx.lineTo(state.trail[i + 1].x, state.trail[i + 1].y);
      ctx.strokeStyle = `rgba(232, 121, 249, ${alpha * 0.9})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  }

  if (!state.paused) {
    const speedMap = [0.25, 0.5, 1, 2, 4];
    const increment = Math.max(1, Math.round(speedMap[state.speed - 1]));
    state.stepIndex = (state.stepIndex + increment) % state.totalSteps;
  }
}

// ── CONTROLS ─────────────────────────────────────────────────────────────────

function initControls() {
  const circlesSlider = document.getElementById('circles-slider');
  const circlesVal = document.getElementById('circles-val');
  circlesSlider.addEventListener('input', function () {
    state.numCircles = parseInt(this.value);
    circlesVal.textContent = state.numCircles;
    state.trail = [];
    state.stepIndex = 0;
  });

  const speedSlider = document.getElementById('speed-slider');
  const speedVal = document.getElementById('speed-val');
  const speedLabels = ['Slow', 'Slow', 'Normal', 'Fast', 'Turbo'];
  speedSlider.addEventListener('input', function () {
    state.speed = parseInt(this.value);
    speedVal.textContent = speedLabels[state.speed - 1];
  });

  const btnPlayPause = document.getElementById('btn-play-pause');
  btnPlayPause.addEventListener('click', function () {
    state.paused = !state.paused;
    this.innerHTML = state.paused
      ? '<i class="ti ti-player-play"></i> Play'
      : '<i class="ti ti-player-pause"></i> Pause';
  });

  document.getElementById('btn-clear').addEventListener('click', function () {
    state.trail = [];
    state.stepIndex = 0;
  });

  const btnCircles = document.getElementById('btn-circles');
  btnCircles.addEventListener('click', function () {
    state.showCircles = !state.showCircles;
    this.innerHTML = state.showCircles
      ? '<i class="ti ti-eye"></i> Hide Circles'
      : '<i class="ti ti-eye-off"></i> Show Circles';
  });
}

// ── SHAPE PICKER ─────────────────────────────────────────────────────────────

function buildShapePicker() {
  const picker = document.getElementById('shape-picker');
  picker.innerHTML = '';
  SHAPES.forEach(function (shape, i) {
    const btn = document.createElement('button');
    btn.className = `shape-btn${i === state.shapeIdx ? ' active' : ''}`;
    btn.innerHTML = `<span class="shape-emoji">${shape.emoji}</span>${shape.label}`;
    btn.addEventListener('click', function () {
      state.shapeIdx = i;
      document.querySelectorAll('.shape-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      computeShape();
    });
    picker.appendChild(btn);
  });
}

// ── RESIZE ───────────────────────────────────────────────────────────────────

function resizeCanvas(canvas) {
  const wrap = canvas.parentElement;
  const size = Math.min(wrap.clientWidth, 600);
  state.canvasSize = size;
  canvas.width = size;
  canvas.height = size;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('wave-canvas');
  const ctx = canvas.getContext('2d');

  resizeCanvas(canvas);
  buildShapePicker();
  computeShape();
  initControls();

  window.addEventListener('resize', function () {
    resizeCanvas(canvas);
    state.trail = [];
  });

  function loop() {
    drawFrame(ctx);
    requestAnimationFrame(loop);
  }
  loop();
});

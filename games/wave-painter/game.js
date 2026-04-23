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
  if (!shapeState.paused) {
    const inc = Math.max(1, Math.round([0.25, 0.5, 1, 2, 4][shapeState.speed - 1]));
    shapeState.stepIndex = (shapeState.stepIndex + inc) % shapeState.totalSteps;
  }
}

// ── WAVE BUILDER STATE ────────────────────────────────────────────────────────
// Each wave: { cycles: 1-12, amp: 0-100, color, on }

const WAVE_COLORS = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];
const WAVE_LABELS = ['Wave A', 'Wave B', 'Wave C', 'Wave D', 'Wave E'];

const builderState = {
  waves: [
    { cycles: 1, amp: 80, on: true },
    { cycles: 3, amp: 40, on: true },
    { cycles: 5, amp: 20, on: false },
    { cycles: 7, amp: 10, on: false },
    { cycles: 2, amp: 30, on: false }
  ],
  time: 0,
  paused: false,
  showComponents: true,
  canvasSize: 500
};

function getWaveY(wave, x, width) {
  const freq = wave.cycles;
  const phase = (x / width) * 2 * Math.PI * freq;
  return (wave.amp / 100) * Math.sin(phase + builderState.time * freq * 0.04);
}

function drawBuilderFrame(ctx) {
  const W = builderState.canvasSize;
  const H = Math.round(W * 0.56);
  ctx.clearRect(0, 0, W, H);

  const midY = H / 2;
  const ampScale = H * 0.4;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = (H / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  // Zero line
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, midY);
  ctx.lineTo(W, midY);
  ctx.stroke();

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

  // Sum wave
  ctx.beginPath();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  const activeCount =
    builderState.waves.filter(function (w) {
      return w.on;
    }).length || 1;
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

  // Legend: white = combined
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = `bold ${Math.round(W * 0.024)}px sans-serif`;
  ctx.fillText('— Combined', 10, 20);

  if (!builderState.paused) {
    builderState.time++;
  }
}

// ── MODE MANAGEMENT ───────────────────────────────────────────────────────────

let currentMode = 'shape'; // 'shape' | 'builder'
let shapeCanvas, builderCanvas;

function switchMode(mode) {
  currentMode = mode;
  document.getElementById('panel-shape').style.display = mode === 'shape' ? '' : 'none';
  document.getElementById('panel-builder').style.display = mode === 'builder' ? '' : 'none';
  document.querySelectorAll('.mode-tab').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

// ── BUILDER UI ────────────────────────────────────────────────────────────────

function buildWaveSlots() {
  const container = document.getElementById('wave-slots');
  container.innerHTML = '';
  builderState.waves.forEach(function (wave, wi) {
    const slot = document.createElement('div');
    slot.className = `wave-slot${wave.on ? ' on' : ''}`;
    slot.innerHTML = `
      <div class="wave-slot-header">
        <span class="wave-dot" style="background:${WAVE_COLORS[wi]}"></span>
        <span class="wave-slot-label">${WAVE_LABELS[wi]}</span>
        <label class="wave-toggle">
          <input type="checkbox" class="wave-on" data-wi="${wi}" ${wave.on ? 'checked' : ''} />
          <span class="toggle-track"></span>
        </label>
      </div>
      <div class="wave-params ${wave.on ? '' : 'dim'}">
        <div class="param-row">
          <span class="param-label">Cycles <span class="param-val" id="cycles-val-${wi}">${wave.cycles}</span></span>
          <input type="range" class="wave-cycles" data-wi="${wi}" min="1" max="12" value="${wave.cycles}" />
        </div>
        <div class="param-row">
          <span class="param-label">Volume <span class="param-val" id="amp-val-${wi}">${wave.amp}%</span></span>
          <input type="range" class="wave-amp" data-wi="${wi}" min="0" max="100" value="${wave.amp}" />
        </div>
      </div>
    `;
    container.appendChild(slot);
  });

  // Events
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
      document.getElementById(`cycles-val-${wi}`).textContent = this.value;
    });
  });
  container.querySelectorAll('.wave-amp').forEach(function (sl) {
    sl.addEventListener('input', function () {
      const wi = parseInt(this.dataset.wi);
      builderState.waves[wi].amp = parseInt(this.value);
      document.getElementById(`amp-val-${wi}`).textContent = `${this.value}%`;
    });
  });
}

// ── SHAPE CONTROLS ────────────────────────────────────────────────────────────

function initShapeControls() {
  const circlesSlider = document.getElementById('circles-slider');
  const circlesVal = document.getElementById('circles-val');
  circlesSlider.addEventListener('input', function () {
    shapeState.numCircles = parseInt(this.value);
    circlesVal.textContent = shapeState.numCircles;
    shapeState.trail = [];
    shapeState.stepIndex = 0;
  });

  const speedSlider = document.getElementById('speed-slider');
  const speedVal = document.getElementById('speed-val');
  const speedLabels = ['Slow', 'Slow', 'Normal', 'Fast', 'Turbo'];
  speedSlider.addEventListener('input', function () {
    shapeState.speed = parseInt(this.value);
    speedVal.textContent = speedLabels[shapeState.speed - 1];
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
  const btnCircles = document.getElementById('btn-circles');
  btnCircles.addEventListener('click', function () {
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
      document.querySelectorAll('.shape-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      computeShape();
    });
    picker.appendChild(btn);
  });
}

// ── RESIZE ────────────────────────────────────────────────────────────────────

function resizeCanvases() {
  const wrap = shapeCanvas.parentElement;
  const size = Math.min(wrap.clientWidth || 500, 600);
  shapeState.canvasSize = size;
  shapeCanvas.width = size;
  shapeCanvas.height = size;

  const bwrap = builderCanvas.parentElement;
  const bw = Math.min(bwrap.clientWidth || 500, 700);
  builderState.canvasSize = bw;
  builderCanvas.width = bw;
  builderCanvas.height = Math.round(bw * 0.56);
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

  // Mode tabs
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
    } else {
      drawBuilderFrame(builderCtx);
    }
    requestAnimationFrame(loop);
  }
  loop();
});

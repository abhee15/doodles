'use strict';

// ── PATTERNS ──────────────────────────────────────────────────────────────────
// Each pattern has parametric equations and a parameter list.
// point(t, params, R) returns {x, y} in math coords (y up).
// The renderer flips y for canvas coords.

const PATTERNS = [
  {
    id: 'flower',
    label: 'Flower',
    emoji: '🌸',
    info: 'A rose curve — petals appear as the angle spins around!',
    params: [{ id: 'n', label: 'Loops', min: 2, max: 9, value: 5, step: 1 }],
    totalAngle: function () {
      return 2 * Math.PI;
    },
    point: function (t, p, R) {
      const r = R * Math.cos(p.n * t);
      return { x: r * Math.cos(t), y: r * Math.sin(t) };
    }
  },
  {
    id: 'spirograph',
    label: 'Spirograph',
    emoji: '⭕',
    info: 'A small ring rolls inside a big ring — like a real spirograph toy!',
    params: [
      { id: 'q', label: 'Ring Size', min: 3, max: 8, value: 3, step: 1 },
      { id: 'pen', label: 'Pen Reach', min: 20, max: 90, value: 65, step: 5 }
    ],
    totalAngle: function (p) {
      return 2 * Math.PI * p.q;
    },
    point: function (t, p, R) {
      const r = R / p.q;
      const d = (r * p.pen) / 100;
      return {
        x: (R - r) * Math.cos(t) + d * Math.cos((p.q - 1) * t),
        y: (R - r) * Math.sin(t) - d * Math.sin((p.q - 1) * t)
      };
    }
  },
  {
    id: 'starburst',
    label: 'Star Burst',
    emoji: '✨',
    info: 'A ring rolling outside creates sharp star points!',
    params: [{ id: 'q', label: 'Points', min: 2, max: 6, value: 3, step: 1 }],
    totalAngle: function () {
      return 2 * Math.PI;
    },
    point: function (t, p, R) {
      const Ro = R * 0.48;
      const r = Ro / p.q;
      const d = r * 0.82;
      return {
        x: (Ro + r) * Math.cos(t) - d * Math.cos((p.q + 1) * t),
        y: (Ro + r) * Math.sin(t) - d * Math.sin((p.q + 1) * t)
      };
    }
  },
  {
    id: 'waves',
    label: 'Wave Art',
    emoji: '〰️',
    info: 'Two waves crossing at different speeds make amazing patterns!',
    params: [
      { id: 'a', label: 'Speed X', min: 1, max: 5, value: 3, step: 1 },
      { id: 'b', label: 'Speed Y', min: 1, max: 5, value: 2, step: 1 }
    ],
    totalAngle: function (p) {
      return 2 * Math.PI * Math.max(p.a, p.b);
    },
    point: function (t, p, R) {
      return {
        x: R * Math.sin(p.a * t + Math.PI / 4),
        y: R * Math.sin(p.b * t)
      };
    }
  }
];

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  patternIdx: 0,
  params: {},
  animId: null,
  t: 0,
  dt: 0,
  prevX: 0,
  prevY: 0,
  hue: 0,
  drawing: false
};

// ── CANVAS ────────────────────────────────────────────────────────────────────

let canvas, ctx, CX, CY, R;

function setupCanvas() {
  canvas = document.getElementById('sg-canvas');
  const wrap = document.getElementById('canvas-wrap');
  const size = Math.min(wrap.clientWidth - 4, 480);
  canvas.width = size;
  canvas.height = size;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  CX = size / 2;
  CY = size / 2;
  R = size * 0.42;
}

function clearCanvas() {
  ctx.fillStyle = '#06011a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ── PATTERN / PARAMS ──────────────────────────────────────────────────────────

function currentPattern() {
  return PATTERNS[state.patternIdx];
}

function initParams() {
  state.params = {};
  currentPattern().params.forEach(function (p) {
    state.params[p.id] = p.value;
  });
}

// ── UI BUILDERS ───────────────────────────────────────────────────────────────

function renderPatternPicker() {
  const row = document.getElementById('pattern-row');
  row.innerHTML = '';
  PATTERNS.forEach(function (pat, i) {
    const btn = document.createElement('button');
    btn.className = `pat-btn${i === state.patternIdx ? ' active' : ''}`;
    btn.innerHTML =
      `<span class="pat-emoji">${pat.emoji}</span>` + `<span class="pat-label">${pat.label}</span>`;
    btn.addEventListener('click', function () {
      selectPattern(i);
    });
    row.appendChild(btn);
  });
}

function renderParamSliders() {
  const container = document.getElementById('param-sliders');
  container.innerHTML = '';
  currentPattern().params.forEach(function (param) {
    const row = document.createElement('div');
    row.className = 'param-row';

    const label = document.createElement('label');
    label.className = 'param-label';
    label.textContent = param.label;
    label.htmlFor = `param-${param.id}`;

    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'param-range';
    input.id = `param-${param.id}`;
    input.min = param.min;
    input.max = param.max;
    input.value = state.params[param.id];
    input.step = param.step;

    const val = document.createElement('span');
    val.className = 'param-val';
    val.id = `val-${param.id}`;
    val.textContent = state.params[param.id];

    input.addEventListener('input', function () {
      state.params[param.id] = parseInt(this.value, 10);
      document.getElementById(`val-${param.id}`).textContent = this.value;
    });

    row.appendChild(label);
    row.appendChild(input);
    row.appendChild(val);
    container.appendChild(row);
  });

  document.getElementById('pattern-info').textContent = currentPattern().info;
}

function selectPattern(idx) {
  state.patternIdx = idx;
  stopDrawing();
  clearCanvas();
  initParams();
  renderPatternPicker();
  renderParamSliders();
}

// ── ANIMATION ─────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 1000;
const STEPS_PER_FRAME = 6;

function startDrawing() {
  if (state.animId) {
    cancelAnimationFrame(state.animId);
  }

  const pat = currentPattern();
  const total = pat.totalAngle(state.params);
  state.dt = total / TOTAL_STEPS;
  state.t = 0;
  state.hue = Math.random() * 360;
  state.drawing = true;

  const pt0 = pat.point(0, state.params, R);
  state.prevX = CX + pt0.x;
  state.prevY = CY - pt0.y;

  clearCanvas();

  const drawBtn = document.getElementById('btn-draw');
  drawBtn.textContent = 'Drawing…';
  drawBtn.disabled = true;

  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';

  function frame() {
    for (let s = 0; s < STEPS_PER_FRAME; s++) {
      state.t += state.dt;
      if (state.t > total + state.dt * 0.5) {
        state.drawing = false;
        break;
      }
      const pt = pat.point(state.t, state.params, R);
      const nx = CX + pt.x;
      const ny = CY - pt.y;

      state.hue = (state.hue + 360 / TOTAL_STEPS) % 360;
      ctx.strokeStyle = `hsl(${state.hue},100%,68%)`;
      ctx.beginPath();
      ctx.moveTo(state.prevX, state.prevY);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      state.prevX = nx;
      state.prevY = ny;
    }

    if (state.drawing) {
      state.animId = requestAnimationFrame(frame);
    } else {
      drawBtn.textContent = '🎨 Draw!';
      drawBtn.disabled = false;
    }
  }

  state.animId = requestAnimationFrame(frame);
}

function stopDrawing() {
  if (state.animId) {
    cancelAnimationFrame(state.animId);
    state.animId = null;
  }
  state.drawing = false;
  const drawBtn = document.getElementById('btn-draw');
  if (drawBtn) {
    drawBtn.textContent = '🎨 Draw!';
    drawBtn.disabled = false;
  }
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  ctx = document.getElementById('sg-canvas').getContext('2d');
  setupCanvas();
  clearCanvas();

  initParams();
  renderPatternPicker();
  renderParamSliders();

  document.getElementById('btn-draw').addEventListener('click', startDrawing);
  document.getElementById('btn-clear').addEventListener('click', function () {
    stopDrawing();
    clearCanvas();
  });

  window.addEventListener('resize', function () {
    setupCanvas();
    clearCanvas();
  });

  // Draw immediately for instant wow
  setTimeout(startDrawing, 250);
});

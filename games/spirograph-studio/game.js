'use strict';

// ── PATTERNS ──────────────────────────────────────────────────────────────────

const PATTERNS = [
  {
    id: 'flower',
    label: 'Flower',
    emoji: '🌸',
    info: 'A rose curve — petals appear as the angle spins around! Odd numbers give that many petals; even numbers double them.',
    params: [
      { id: 'n', label: 'Petals', min: 2, max: 9, value: 5, step: 1 },
      { id: 'scale', label: 'Size', min: 60, max: 100, value: 100, step: 5 }
    ],
    totalAngle: function () {
      return 2 * Math.PI;
    },
    point: function (t, p, R) {
      const r = R * (p.scale / 100) * Math.cos(p.n * t);
      return { x: r * Math.cos(t), y: r * Math.sin(t) };
    }
  },
  {
    id: 'spirograph',
    label: 'Spirograph',
    emoji: '⭕',
    info: 'A small ring rolls inside a big ring — like a real spirograph toy! Change Ring Size to get more or fewer loops.',
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
    info: 'A ring rolling outside creates sharp star points! More Points = more spiky. Reach controls how far the pen extends.',
    params: [
      { id: 'q', label: 'Points', min: 2, max: 7, value: 3, step: 1 },
      { id: 'reach', label: 'Reach', min: 50, max: 95, value: 82, step: 5 }
    ],
    totalAngle: function () {
      return 2 * Math.PI;
    },
    point: function (t, p, R) {
      const Ro = R * 0.48;
      const r = Ro / p.q;
      const d = r * (p.reach / 100);
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
    info: 'Two sine waves crossing at different speeds make Lissajous figures. Phase shifts the X wave — try equal speeds with different phases!',
    params: [
      { id: 'a', label: 'Speed X', min: 1, max: 8, value: 3, step: 1 },
      { id: 'b', label: 'Speed Y', min: 1, max: 8, value: 2, step: 1 },
      { id: 'phase', label: 'Phase', min: 0, max: 8, value: 2, step: 1 }
    ],
    totalAngle: function (p) {
      return 2 * Math.PI * Math.max(p.a, p.b);
    },
    point: function (t, p, R) {
      return {
        x: R * Math.sin(p.a * t + (p.phase * Math.PI) / 4),
        y: R * Math.sin(p.b * t)
      };
    }
  }
];

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  patternIdx: 0,
  params: {},
  copies: 1,
  animId: null,
  t: 0,
  dt: 0,
  prevX: [],
  prevY: [],
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

// ── HELPERS ───────────────────────────────────────────────────────────────────

function currentPattern() {
  return PATTERNS[state.patternIdx];
}

function initParams() {
  state.params = {};
  currentPattern().params.forEach(function (p) {
    state.params[p.id] = p.value;
  });
}

function makeSliderRow(id, label, min, max, value, step, onChange) {
  const row = document.createElement('div');
  row.className = 'param-row';

  const lbl = document.createElement('label');
  lbl.className = 'param-label';
  lbl.textContent = label;
  lbl.htmlFor = `param-${id}`;

  const input = document.createElement('input');
  input.type = 'range';
  input.className = 'param-range';
  input.id = `param-${id}`;
  input.min = min;
  input.max = max;
  input.value = value;
  input.step = step;

  const valEl = document.createElement('span');
  valEl.className = 'param-val';
  valEl.id = `val-${id}`;
  valEl.textContent = value;

  input.addEventListener('input', function () {
    const v = parseInt(this.value, 10);
    document.getElementById(`val-${id}`).textContent = this.value;
    onChange(v);
  });

  row.appendChild(lbl);
  row.appendChild(input);
  row.appendChild(valEl);
  return row;
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
    container.appendChild(
      makeSliderRow(
        param.id,
        param.label,
        param.min,
        param.max,
        state.params[param.id],
        param.step,
        function (val) {
          state.params[param.id] = val;
          scheduleDraw();
        }
      )
    );
  });
  document.getElementById('pattern-info').textContent = currentPattern().info;
}

function renderCopiesSlider() {
  const container = document.getElementById('copies-row');
  container.innerHTML = '';
  container.appendChild(
    makeSliderRow('copies', '🔁 Copies', 1, 6, state.copies, 1, function (val) {
      state.copies = val;
      scheduleDraw();
    })
  );
}

function selectPattern(idx) {
  state.patternIdx = idx;
  stopDrawing();
  clearCanvas();
  initParams();
  renderPatternPicker();
  renderParamSliders();
  scheduleDraw();
}

// ── ANIMATION ─────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 1000;
const STEPS_PER_FRAME = 6;

let drawTimer = null;

function scheduleDraw() {
  clearTimeout(drawTimer);
  drawTimer = setTimeout(startDrawing, 250);
}

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
  state.prevX = [];
  state.prevY = [];
  for (let c = 0; c < state.copies; c++) {
    const angle = (2 * Math.PI * c) / state.copies;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    state.prevX.push(CX + pt0.x * cos - pt0.y * sin);
    state.prevY.push(CY - (pt0.x * sin + pt0.y * cos));
  }

  clearCanvas();

  const drawBtn = document.getElementById('btn-draw');
  drawBtn.textContent = 'Drawing…';
  drawBtn.disabled = true;

  ctx.lineCap = 'round';

  function frame() {
    for (let s = 0; s < STEPS_PER_FRAME; s++) {
      state.t += state.dt;
      if (state.t > total + state.dt * 0.5) {
        state.drawing = false;
        break;
      }
      const pt = pat.point(state.t, state.params, R);
      state.hue = (state.hue + 360 / TOTAL_STEPS) % 360;
      ctx.strokeStyle = `hsl(${state.hue},100%,68%)`;
      ctx.lineWidth = state.copies > 2 ? 1.0 : 1.5;

      for (let c = 0; c < state.copies; c++) {
        const angle = (2 * Math.PI * c) / state.copies;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const nx = CX + pt.x * cos - pt.y * sin;
        const ny = CY - (pt.x * sin + pt.y * cos);
        ctx.beginPath();
        ctx.moveTo(state.prevX[c], state.prevY[c]);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        state.prevX[c] = nx;
        state.prevY[c] = ny;
      }
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
  renderCopiesSlider();

  document.getElementById('btn-draw').addEventListener('click', startDrawing);
  document.getElementById('btn-clear').addEventListener('click', function () {
    stopDrawing();
    clearCanvas();
  });

  window.addEventListener('resize', function () {
    setupCanvas();
    clearCanvas();
  });

  setTimeout(startDrawing, 250);
});

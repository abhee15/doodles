'use strict';

// ── COLOR THEORY DATA ─────────────────────────────────────────────────────────

const PRIMARY = {
  red: { r: 220, g: 50, b: 50, label: 'Red', emoji: '🔴' },
  yellow: { r: 255, g: 220, b: 0, label: 'Yellow', emoji: '🟡' },
  blue: { r: 30, g: 80, b: 200, label: 'Blue', emoji: '🔵' }
};

// RYB mixing table — keyed by sorted pair
const MIX_RESULTS = {
  'blue+red': {
    r: 130,
    g: 0,
    b: 130,
    name: 'Purple',
    emoji: '🟣',
    fact: 'Red + Blue = Purple! Purple is the color of royalty.'
  },
  'red+yellow': {
    r: 255,
    g: 130,
    b: 0,
    name: 'Orange',
    emoji: '🟠',
    fact: 'Red + Yellow = Orange! Orange is the color of sunsets.'
  },
  'blue+yellow': {
    r: 0,
    g: 160,
    b: 80,
    name: 'Green',
    emoji: '🟢',
    fact: 'Yellow + Blue = Green! Plants use green to make food.'
  },
  'blue+red+yellow': {
    r: 100,
    g: 70,
    b: 30,
    name: 'Brown',
    emoji: '🟤',
    fact: 'All three primaries = Brown! Like the Earth itself.'
  }
};

// Tertiary combos (primary + neighbouring secondary)
const TERTIARY = {
  'orange+red': { r: 220, g: 80, b: 20, name: 'Red-Orange', emoji: '🎨' },
  'orange+yellow': { r: 255, g: 180, b: 0, name: 'Yellow-Orange', emoji: '🎨' },
  'green+yellow': { r: 150, g: 210, b: 0, name: 'Yellow-Green', emoji: '🎨' },
  'blue+green': { r: 0, g: 140, b: 160, name: 'Blue-Green', emoji: '🎨' },
  'purple+blue': { r: 80, g: 0, b: 180, name: 'Blue-Purple', emoji: '🎨' },
  'purple+red': { r: 180, g: 0, b: 90, name: 'Red-Purple', emoji: '🎨' }
};

// Challenges: mix this color
const CHALLENGES = [
  {
    target: 'orange',
    targetRGB: { r: 255, g: 130, b: 0 },
    hint: 'Warm like the sun!',
    needed: ['red', 'yellow']
  },
  {
    target: 'purple',
    targetRGB: { r: 130, g: 0, b: 130 },
    hint: 'Cool and mysterious!',
    needed: ['red', 'blue']
  },
  {
    target: 'green',
    targetRGB: { r: 0, g: 160, b: 80 },
    hint: 'Found in every garden!',
    needed: ['yellow', 'blue']
  },
  {
    target: 'brown',
    targetRGB: { r: 100, g: 70, b: 30 },
    hint: 'Color of chocolate!',
    needed: ['red', 'yellow', 'blue']
  }
];

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  mode: 'free', // 'free' | 'challenge'
  amounts: { red: 0, yellow: 0, blue: 0 }, // 0-100 each
  challengeIdx: 0,
  solved: 0,
  discoveries: new Set()
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function rgbStr(c) {
  return `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`;
}

function mixColors(amounts) {
  const total = amounts.red + amounts.yellow + amounts.blue;
  if (total === 0) {
    return { r: 240, g: 240, b: 240 };
  }
  const wr = amounts.red / total;
  const wy = amounts.yellow / total;
  const wb = amounts.blue / total;

  return {
    r: PRIMARY.red.r * wr + PRIMARY.yellow.r * wy + PRIMARY.blue.r * wb,
    g: PRIMARY.red.g * wr + PRIMARY.yellow.g * wy + PRIMARY.blue.g * wb,
    b: PRIMARY.red.b * wr + PRIMARY.yellow.b * wy + PRIMARY.blue.b * wb
  };
}

function colorDistance(a, b) {
  return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}

function identifyMix(amounts) {
  const active = Object.entries(amounts)
    .filter(([, v]) => v > 10)
    .map(([k]) => k)
    .sort();
  if (active.length === 0) {
    return null;
  }
  if (active.length === 1) {
    return { name: PRIMARY[active[0]].label, emoji: PRIMARY[active[0]].emoji, fact: null };
  }

  const key = active.join('+');
  if (MIX_RESULTS[key]) {
    return MIX_RESULTS[key];
  }
  return null;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ── RENDER ────────────────────────────────────────────────────────────────────

function updateMixDisplay() {
  const mixed = mixColors(state.amounts);
  const swatch = document.getElementById('mix-swatch');
  swatch.style.background = rgbStr(mixed);

  const result = identifyMix(state.amounts);
  const nameEl = document.getElementById('mix-name');
  const factEl = document.getElementById('mix-fact');

  if (result) {
    nameEl.textContent = `${result.emoji || '🎨'} ${result.name}`;
    factEl.textContent = result.fact || '';
    if (result.name && !PRIMARY[result.name.toLowerCase()]) {
      state.discoveries.add(result.name);
      updateDiscoveries();
    }
  } else if (Object.values(state.amounts).some(v => v > 0)) {
    nameEl.textContent = '🎨 Custom Mix';
    factEl.textContent = 'Keep experimenting!';
  } else {
    nameEl.textContent = '…';
    factEl.textContent = 'Add some colors to start mixing!';
  }
}

function updateDiscoveries() {
  const el = document.getElementById('discoveries');
  if (state.discoveries.size === 0) {
    el.textContent = 'None yet — start mixing!';
    return;
  }
  el.textContent = Array.from(state.discoveries).join(' · ');
}

function updateSliderLabel(color) {
  const val = state.amounts[color];
  document.getElementById(`lbl-${color}`).textContent = `${val}%`;
}

// ── CHALLENGE MODE ────────────────────────────────────────────────────────────

function startChallenge() {
  state.challengeIdx = 0;
  state.solved = 0;
  showChallenge();
  showScreen('screen-challenge');
}

function showChallenge() {
  const ch = CHALLENGES[state.challengeIdx];
  document.getElementById('ch-progress').textContent =
    `${state.challengeIdx + 1} / ${CHALLENGES.length}`;
  document.getElementById('ch-target-name').textContent =
    ch.target.charAt(0).toUpperCase() + ch.target.slice(1);
  document.getElementById('ch-hint').textContent = ch.hint;

  const swatch = document.getElementById('ch-target-swatch');
  swatch.style.background = rgbStr(ch.targetRGB);

  resetSliders('ch');
  updateChallengeResult();
}

function resetSliders(prefix) {
  ['red', 'yellow', 'blue'].forEach(function (c) {
    const slider = document.getElementById(`${prefix}-slider-${c}`);
    if (slider) {
      slider.value = 0;
      state.amounts[c] = 0;
      document.getElementById(`${prefix}-lbl-${c}`).textContent = '0%';
    }
  });
  if (prefix === 'ch') {
    updateChallengeResult();
  } else {
    updateMixDisplay();
  }
}

function updateChallengeResult() {
  const mixed = mixColors(state.amounts);
  const ch = CHALLENGES[state.challengeIdx];

  document.getElementById('ch-mix-swatch').style.background = rgbStr(mixed);

  const dist = colorDistance(mixed, ch.targetRGB);
  const closeness = Math.max(0, Math.round(100 - dist / 3));
  document.getElementById('ch-closeness').textContent = `Match: ${closeness}%`;

  const checkBtn = document.getElementById('ch-check-btn');
  checkBtn.disabled = Object.values(state.amounts).every(v => v === 0);

  if (dist < 40) {
    document.getElementById('ch-feedback').textContent = '🎯 Very close!';
    document.getElementById('ch-feedback').className = 'ch-feedback good';
  } else if (dist < 80) {
    document.getElementById('ch-feedback').textContent = '🔄 Getting warmer…';
    document.getElementById('ch-feedback').className = 'ch-feedback warm';
  } else {
    document.getElementById('ch-feedback').textContent = '';
    document.getElementById('ch-feedback').className = 'ch-feedback';
  }
}

function checkChallenge() {
  const mixed = mixColors(state.amounts);
  const ch = CHALLENGES[state.challengeIdx];
  const dist = colorDistance(mixed, ch.targetRGB);

  if (dist < 55) {
    state.solved++;
    if (state.challengeIdx < CHALLENGES.length - 1) {
      state.challengeIdx++;
      document.getElementById('ch-feedback').textContent = '✅ Correct! Next color…';
      document.getElementById('ch-feedback').className = 'ch-feedback good';
      setTimeout(showChallenge, 1200);
    } else {
      showChallengeWin();
    }
  } else {
    const needed = ch.needed.join(' + ');
    document.getElementById('ch-feedback').textContent = `Not quite — try mixing ${needed}`;
    document.getElementById('ch-feedback').className = 'ch-feedback bad';
  }
}

function showChallengeWin() {
  const perfect = state.solved === CHALLENGES.length;
  document.getElementById('win-emoji').textContent = perfect ? '🏆' : '🎨';
  document.getElementById('win-title').textContent = perfect ? 'Color Master!' : 'Well done!';
  document.getElementById('win-score').textContent =
    `${state.solved} / ${CHALLENGES.length} colors mixed`;
  showScreen('screen-win');
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  // Free mix sliders
  ['red', 'yellow', 'blue'].forEach(function (color) {
    const slider = document.getElementById(`slider-${color}`);
    slider.addEventListener('input', function () {
      state.amounts[color] = parseInt(this.value, 10);
      updateSliderLabel(color);
      updateMixDisplay();
    });
  });

  document.getElementById('btn-reset').addEventListener('click', function () {
    ['red', 'yellow', 'blue'].forEach(function (c) {
      state.amounts[c] = 0;
      document.getElementById(`slider-${c}`).value = 0;
      updateSliderLabel(c);
    });
    updateMixDisplay();
  });

  document.getElementById('btn-challenge').addEventListener('click', startChallenge);

  // Challenge sliders
  ['red', 'yellow', 'blue'].forEach(function (color) {
    const slider = document.getElementById(`ch-slider-${color}`);
    slider.addEventListener('input', function () {
      state.amounts[color] = parseInt(this.value, 10);
      document.getElementById(`ch-lbl-${color}`).textContent = `${this.value}%`;
      updateChallengeResult();
    });
  });

  document.getElementById('ch-check-btn').addEventListener('click', checkChallenge);

  document.getElementById('ch-back-btn').addEventListener('click', function () {
    showScreen('screen-free');
    ['red', 'yellow', 'blue'].forEach(function (c) {
      state.amounts[c] = 0;
    });
  });

  document.getElementById('btn-play-again').addEventListener('click', startChallenge);
  document.getElementById('btn-back-free').addEventListener('click', function () {
    showScreen('screen-free');
    ['red', 'yellow', 'blue'].forEach(function (c) {
      state.amounts[c] = 0;
    });
    updateMixDisplay();
  });

  updateMixDisplay();
  updateDiscoveries();
});

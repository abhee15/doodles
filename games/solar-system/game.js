/* eslint-disable no-undef */
// ==================== NAVIGATION ====================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof GameNavigation !== 'undefined') {
    window.gameNav = new GameNavigation('solar-system', {
      screens: ['game'],
      initialScreen: 'game',
      gameName: 'Solar System'
    });
  }
});

// ============================================================
// PLANET QUEST — Solar System Educational Game
// Phaser 3 · No external assets · All graphics drawn in code
// ============================================================

// ── Colour palette ─────────────────────────────────────────────
const SS = {
  bg: 0x0b0e2d,
  bgDeep: 0x000510,
  starDim: 0xccccdd,
  starBright: 0xffffee,
  sun: 0xfdd835,
  sunGlow: 0xffb300,
  orbitLine: 0x334466,
  panel: 0x0d1b3e,
  panelBdr: 0x2244aa,
  correct: 0x00e676,
  wrong: 0xff5252,
  highlight: 0xffd740,
  hud: 0x0a1540,
  hudText: 0x90caf9,
  white: 0xffffff,
  asteroid: 0x998877
};

// ── Game state ──────────────────────────────────────────────────
let gameMode = 'explore';
let currentScene = null;

// Quiz state
let quizLevel = 1;
let quizScore = 0;
let quizLives = 3;
let questionQueue = [];
let currentQuestion = null;
let questionIndex = 0;
const questionsPerLevel = 5;
let answerLocked = false;
let totalStars = 0;
let planetBadges = {}; // { planetId: true }

// Solar system animation
let orbitAngle = {}; // { planetId: angle }
let moonAngle = {}; // { planetId: angle }
let sunPulse = 0;
let starTwinkle = 0;

// Graphic objects
let planetObjects = {}; // { planetId: { gfx, label, hitArea, x, y } }
let orbitGraphics = null;
let sunGfx = null;
let bgStars = [];
let particles = [];
let planetGlows = {}; // { planetId: gfx } for highlight rings

// UI objects
let questionPanel = null;
let hudGroup = [];
let livesText = null;
let scoreText = null;
let levelText = null;
let feedbackGroup = null;
let factCardGroup = null;
let choiceButtons = [];
let progressDots = [];
let moonObjects = {}; // { key: { gfx, label } }
let asteroidDots = [];
let celebrationGroup = null;

// Canvas dimensions
const W = 900;
const H = 650;

// Sun position — offset left so Neptune's full right arc fills the canvas
const SUN_X = 360;
const SUN_Y = H / 2;

// ── Initialize mode buttons ───────────────────────────────────
function initModeButtons() {
  const btnExplore = document.getElementById('btn-explore');
  const btnQuiz = document.getElementById('btn-quiz');

  if (btnExplore) {
    btnExplore.onclick = function () {
      document.getElementById('mode-screen').style.display = 'none';
      window.startPlanetQuest('explore');
    };
  }

  if (btnQuiz) {
    btnQuiz.onclick = function () {
      document.getElementById('mode-screen').style.display = 'none';
      window.startPlanetQuest('quiz');
    };
  }
}

// Call when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModeButtons);
} else {
  initModeButtons();
}

// ── Entry point (called when game mode is selected) ────────────
window.startPlanetQuest = function (mode) {
  gameMode = mode;
  quizScore = 0;
  quizLives = 3;
  quizLevel = 1;
  questionIndex = 0;
  totalStars = 0;
  planetBadges = {};
  orbitAngle = {};
  moonAngle = {};
  PLANETS.forEach(p => {
    orbitAngle[p.id] = Math.random() * Math.PI * 2;
    moonAngle[p.id] = Math.random() * Math.PI * 2;
  });
  buildQuestionQueue();

  if (window._phaserGame) {
    window._phaserGame.destroy(true);
  }

  const config = createGameConfig({
    width: W,
    height: H,
    backgroundColor: SS.bg,
    scene: {
      preload: preload,
      create: createScene,
      update: updateScene
    }
  });
  window._phaserGame = new Phaser.Game(config);
};

function buildQuestionQueue() {
  // Combine static questions for this level with dynamically generated ones
  const staticPool = QUESTION_LEVELS[quizLevel] ? [...QUESTION_LEVELS[quizLevel]] : [];
  const dynPool = typeof getDynamicQuestions === 'function' ? getDynamicQuestions(quizLevel) : [];

  // Merge, deduplicating by id (static questions take priority)
  const seen = new Set(staticPool.map(q => q.id));
  const combined = [...staticPool, ...dynPool.filter(q => !seen.has(q.id))];

  // Shuffle combined pool
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  questionQueue = combined.slice(0, questionsPerLevel);
}

// ── Phaser lifecycle ────────────────────────────────────────────
function preload() {
  currentScene = this;
}

function createScene() {
  currentScene = this;
  clearAll(this);
  drawStarField(this);
  drawSun(this);
  drawAsteroidBelt(this);
  drawOrbits(this);
  drawPlanets(this);
  drawHUD(this);

  if (gameMode === 'explore') {
    showExploreHint(this);
  } else {
    startQuizLevel(this);
  }
}

function updateScene() {
  const scene = currentScene;
  if (!scene || !scene.sys || !scene.sys.isActive()) {
    return;
  }

  sunPulse += 0.04;
  starTwinkle += 0.02;

  // Animate sun glow
  if (sunGfx) {
    const glowSize = 44 + Math.sin(sunPulse) * 4;
    sunGfx.clear();
    drawSunGraphic(scene, glowSize);
  }

  // Animate planet orbits
  PLANETS.forEach(p => {
    const speed = p.orbitSpeed;
    orbitAngle[p.id] = (orbitAngle[p.id] || 0) + speed;
    const angle = orbitAngle[p.id];
    const px = SUN_X + Math.cos(angle) * p.orbitRadius;
    const py = SUN_Y + Math.sin(angle) * p.orbitRadius * 0.38; // flatten y for perspective

    if (planetObjects[p.id]) {
      const obj = planetObjects[p.id];
      obj.x = px;
      obj.y = py;
      obj.gfx.x = px;
      obj.gfx.y = py;
      if (obj.label) {
        obj.label.setPosition(px, py + p.radius + 9);
      }
      if (obj.hitArea) {
        obj.hitArea.setPosition(px, py);
      }

      // Update glow ring position
      if (planetGlows[p.id]) {
        planetGlows[p.id].x = px;
        planetGlows[p.id].y = py;
      }

      // Sort depth by y position (closer = higher y = on top)
      const depth = 10 + Math.round(py);
      obj.gfx.setDepth(depth);
      if (obj.label) {
        obj.label.setDepth(depth + 1);
      }
      if (obj.hitArea) {
        obj.hitArea.setDepth(depth + 2);
      }
      if (planetGlows[p.id]) {
        planetGlows[p.id].setDepth(depth - 1);
      }
    }

    // Animate moon(s) around their planet
    if (p.moonsList && planetObjects[p.id]) {
      moonAngle[p.id] = (moonAngle[p.id] || 0) + p.orbitSpeed * 4;
      const mAngle = moonAngle[p.id];
      const moonDist = p.radius + 14;
      const mx = planetObjects[p.id].x + Math.cos(mAngle) * moonDist;
      const my = planetObjects[p.id].y + Math.sin(mAngle) * moonDist * 0.5;
      const key = `${p.id}_moon0`;
      if (moonObjects[key]) {
        moonObjects[key].gfx.setPosition(mx, my);
        if (moonObjects[key].label) {
          moonObjects[key].label.setPosition(mx, my + 8);
        }
        // Keep hit area in sync with the visual so clicks register correctly
        if (moonObjects[key].hit) {
          moonObjects[key].hit.setPosition(mx, my);
        }
      }
    }
  });

  // Twinkle stars
  if (bgStars.length > 0 && Math.floor(starTwinkle * 10) % 6 === 0) {
    const idx = Math.floor(Math.random() * bgStars.length);
    const star = bgStars[idx];
    if (star && star.active) {
      scene.tweens.add({
        targets: star,
        alpha: { from: star.alpha, to: Math.random() * 0.5 + 0.5 },
        duration: 400,
        yoyo: true
      });
    }
  }

  // Tick particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    if (!p || !p.active) {
      particles.splice(i, 1);
      continue;
    }
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= p.fade;
    if (p.alpha <= 0) {
      p.destroy();
      particles.splice(i, 1);
    }
  }
}

// ── Drawing helpers ─────────────────────────────────────────────
function clearAll(scene) {
  planetObjects = {};
  moonObjects = {};
  planetGlows = {};
  hudGroup = [];
  bgStars = [];
  particles = [];
  asteroidDots = [];
  choiceButtons = [];
  progressDots = [];
  questionPanel = null;
  feedbackGroup = null;
  factCardGroup = null;
  livesText = null;
  scoreText = null;
  levelText = null;
  celebrationGroup = null;
}

function drawStarField(scene) {
  const numStars = 180;
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const size = Math.random() < 0.15 ? 2 : 1;
    const alpha = Math.random() * 0.6 + 0.3;
    const color = Math.random() < 0.1 ? SS.starBright : SS.starDim;
    const star = scene.add.circle(x, y, size, color, alpha);
    star.setDepth(0);
    bgStars.push(star);
  }
}

function drawSunGraphic(scene, glowRadius) {
  // Outer soft glow layers
  sunGfx.fillStyle(0xffb300, 0.06);
  sunGfx.fillCircle(0, 0, glowRadius + 22);
  sunGfx.fillStyle(0xffb300, 0.1);
  sunGfx.fillCircle(0, 0, glowRadius + 12);
  sunGfx.fillStyle(0xfdd835, 0.18);
  sunGfx.fillCircle(0, 0, glowRadius + 4);
  // Sun body
  sunGfx.fillStyle(0xfdd835, 1);
  sunGfx.fillCircle(0, 0, 36);
  // Bright center
  sunGfx.fillStyle(0xfffde7, 0.7);
  sunGfx.fillCircle(0, 0, 18);
}

function drawSun(scene) {
  sunGfx = scene.add.graphics();
  sunGfx.setPosition(SUN_X, SUN_Y);
  sunGfx.setDepth(5);
  drawSunGraphic(scene, 44);

  // Sun label
  const sunLabel = scene.add
    .text(SUN_X, SUN_Y + 48, '☀️ Sun', {
      fontSize: '11px',
      fill: '#FDD835',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2,
      align: 'center'
    })
    .setOrigin(0.5)
    .setDepth(6);

  // Sun is clickable in explore mode
  const sunHit = scene.add.circle(SUN_X, SUN_Y, 44, 0xffffff, 0);
  sunHit.setDepth(7).setInteractive({ useHandCursor: true });
  sunHit.on('pointerover', () =>
    scene.tweens.add({ targets: sunGfx, scaleX: 1.08, scaleY: 1.08, duration: 200 })
  );
  sunHit.on('pointerout', () =>
    scene.tweens.add({ targets: sunGfx, scaleX: 1, scaleY: 1, duration: 200 })
  );
  sunHit.on('pointerup', () => showFactCard(scene, SUN, SUN_X, SUN_Y));
}

function drawOrbits(scene) {
  orbitGraphics = scene.add.graphics();
  orbitGraphics.setDepth(1);
  PLANETS.forEach(p => {
    // Elliptical orbit path (flattened for perspective)
    orbitGraphics.lineStyle(1, SS.orbitLine, 0.35);
    orbitGraphics.strokeEllipse(SUN_X, SUN_Y, p.orbitRadius * 2, p.orbitRadius * 0.76);
  });
}

function drawAsteroidBelt(scene) {
  const belt = BONUS_OBJECTS.find(o => o.id === 'asteroid_belt');
  if (!belt) {
    return;
  }
  const numDots = 55;
  const gfx = scene.add.graphics().setDepth(2);
  for (let i = 0; i < numDots; i++) {
    const angle = (i / numDots) * Math.PI * 2 + Math.random() * 0.15;
    const r = belt.orbitRadius + (Math.random() - 0.5) * 22;
    const x = SUN_X + Math.cos(angle) * r;
    const y = SUN_Y + Math.sin(angle) * r * 0.38;
    const size = Math.random() < 0.3 ? 2 : 1;
    gfx.fillStyle(SS.asteroid, Math.random() * 0.4 + 0.25);
    gfx.fillCircle(x, y, size);
    asteroidDots.push({ x, y });
  }
  // Clickable asteroid belt label area
  const beltHit = scene.add.ellipse(
    SUN_X,
    SUN_Y,
    belt.orbitRadius * 2 + 24,
    belt.orbitRadius * 0.76 + 10,
    0xffffff,
    0
  );
  beltHit.setDepth(3).setInteractive({ useHandCursor: true });
  beltHit.on('pointerup', () =>
    showFactCard(scene, belt, SUN_X + belt.orbitRadius * 0.5, SUN_Y - belt.orbitRadius * 0.19 - 20)
  );
  const bLabel = scene.add
    .text(SUN_X + 52, SUN_Y - 50, 'Asteroid Belt', {
      fontSize: '9px',
      fill: '#A09080',
      fontFamily: 'Arial, sans-serif',
      alpha: 0.7
    })
    .setDepth(4)
    .setOrigin(0.5);
}

function drawPlanets(scene) {
  PLANETS.forEach(p => {
    const angle = orbitAngle[p.id] || 0;
    const px = SUN_X + Math.cos(angle) * p.orbitRadius;
    const py = SUN_Y + Math.sin(angle) * p.orbitRadius * 0.38;
    const depth = 10 + Math.round(py);

    // Planet glow ring (used for highlighting)
    const glowGfx = scene.add.graphics();
    glowGfx.setPosition(px, py);
    glowGfx.setDepth(depth - 1);
    glowGfx.setAlpha(0);
    planetGlows[p.id] = glowGfx;

    // Planet body graphics
    const gfx = scene.add.graphics();
    gfx.setPosition(px, py);
    gfx.setDepth(depth);
    drawPlanetBody(gfx, p);

    // Label
    const label = scene.add
      .text(px, py + p.radius + 9, p.name, {
        fontSize: '10px',
        fill: '#C5D8FF',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#000820',
        strokeThickness: 2,
        align: 'center'
      })
      .setOrigin(0.5)
      .setDepth(depth + 1);

    // Invisible hit area (bigger than planet for easy clicking)
    const hitR = Math.max(p.radius + 10, 24);
    const hitArea = scene.add.circle(px, py, hitR, 0xffffff, 0);
    hitArea.setDepth(depth + 2).setInteractive({ useHandCursor: true });

    hitArea.on('pointerover', () => {
      scene.tweens.add({ targets: gfx, scaleX: 1.18, scaleY: 1.18, duration: 180 });
      label.setStyle({ fill: '#FFD740', fontSize: '11px' });
      showGlowRing(scene, p.id, true);
    });
    hitArea.on('pointerout', () => {
      scene.tweens.add({ targets: gfx, scaleX: 1, scaleY: 1, duration: 180 });
      label.setStyle({ fill: '#C5D8FF', fontSize: '10px' });
      if (!isPlanetTarget(p.id)) {
        showGlowRing(scene, p.id, false);
      }
    });
    hitArea.on('pointerup', () => handlePlanetClick(scene, p));

    planetObjects[p.id] = { gfx, label, hitArea, x: px, y: py };

    // Draw moon for Earth (and other planets with moonsList in explore mode)
    if (p.moonsList && p.moonsList.length > 0) {
      drawMoon(scene, p, 0, px, py, depth);
    }
  });
}

function drawPlanetBody(gfx, p) {
  gfx.clear();
  const r = p.radius;
  const col = p.phaser;

  if (p.id === 'saturn') {
    // Draw rings first (behind planet)
    gfx.lineStyle(3, 0xd4c490, 0.5);
    gfx.strokeEllipse(0, 0, r * 3.2, r * 0.6);
    gfx.lineStyle(2, 0xbfae80, 0.35);
    gfx.strokeEllipse(0, 0, r * 2.7, r * 0.48);
    gfx.lineStyle(4, 0xe8d5a3, 0.55);
    gfx.strokeEllipse(0, 0, r * 3.6, r * 0.7);
  }

  // Planet body
  gfx.fillStyle(col, 1);
  gfx.fillCircle(0, 0, r);

  // Planet surface details
  if (p.id === 'earth') {
    // Ocean base already drawn; add land patches
    gfx.fillStyle(0x2e7d32, 0.85);
    gfx.fillCircle(-r * 0.2, -r * 0.1, r * 0.45);
    gfx.fillStyle(0x388e3c, 0.7);
    gfx.fillCircle(r * 0.25, r * 0.15, r * 0.32);
    gfx.fillStyle(0xffffff, 0.2);
    gfx.fillCircle(-r * 0.05, -r * 0.35, r * 0.22);
  } else if (p.id === 'jupiter') {
    // Bands
    gfx.fillStyle(0xd4956a, 0.4);
    gfx.fillRect(-r, -r * 0.55, r * 2, r * 0.22);
    gfx.fillStyle(0xc4813b, 0.3);
    gfx.fillRect(-r, r * 0.1, r * 2, r * 0.28);
    gfx.fillStyle(0xbb7040, 0.35);
    gfx.fillRect(-r, -r * 0.15, r * 2, r * 0.18);
    // Great Red Spot
    gfx.fillStyle(0xc62828, 0.75);
    gfx.fillEllipse(r * 0.3, r * 0.2, r * 0.42, r * 0.28);
  } else if (p.id === 'mars') {
    gfx.fillStyle(0xbf360c, 0.5);
    gfx.fillCircle(-r * 0.2, r * 0.1, r * 0.35);
    gfx.fillStyle(0xffccbc, 0.3);
    gfx.fillCircle(r * 0.1, -r * 0.25, r * 0.25);
  } else if (p.id === 'venus') {
    gfx.fillStyle(0xf9a825, 0.4);
    gfx.fillCircle(-r * 0.1, 0, r * 0.7);
    gfx.fillStyle(0xfff9c4, 0.25);
    gfx.fillCircle(r * 0.15, -r * 0.15, r * 0.5);
  } else if (p.id === 'neptune') {
    gfx.fillStyle(0x0d47a1, 0.5);
    gfx.fillCircle(0, r * 0.1, r * 0.6);
    gfx.fillStyle(0x42a5f5, 0.3);
    gfx.fillCircle(-r * 0.2, -r * 0.2, r * 0.4);
  } else if (p.id === 'uranus') {
    gfx.fillStyle(0x4dd0e1, 0.35);
    gfx.fillCircle(0, 0, r * 0.7);
  } else if (p.id === 'saturn') {
    gfx.fillStyle(0xd4b896, 0.4);
    gfx.fillRect(-r, -r * 0.35, r * 2, r * 0.22);
  }

  // Shading (top-left highlight)
  gfx.fillStyle(0xffffff, 0.15);
  gfx.fillCircle(-r * 0.28, -r * 0.28, r * 0.5);
  // Bottom-right shadow
  gfx.fillStyle(0x000000, 0.2);
  gfx.fillCircle(r * 0.25, r * 0.25, r * 0.55);
}

function drawMoon(scene, planet, moonIdx, px, py, depth) {
  const moonAngleCur = moonAngle[planet.id] || 0;
  const moonDist = planet.radius + 14;
  const mx = px + Math.cos(moonAngleCur) * moonDist;
  const my = py + Math.sin(moonAngleCur) * moonDist * 0.5;

  const mgfx = scene.add.graphics();
  mgfx.setPosition(mx, my);
  mgfx.setDepth(depth + 3);
  mgfx.fillStyle(0xbbbbcc, 1);
  mgfx.fillCircle(0, 0, 4);
  mgfx.fillStyle(0x999aaa, 0.5);
  mgfx.fillCircle(-1, -1, 2);

  const key = `${planet.id}_moon0`;
  moonObjects[key] = { gfx: mgfx, label: null };

  // Moon hit area — position kept in sync by updateScene
  const mHit = scene.add.circle(mx, my, 12, 0xffffff, 0);
  mHit.setDepth(depth + 4).setInteractive({ useHandCursor: true });
  mHit.on('pointerover', () => {
    mgfx.setScale(1.5);
  });
  mHit.on('pointerout', () => {
    mgfx.setScale(1);
  });
  mHit.on('pointerup', () => {
    const moonData = planet.moonsList[moonIdx];
    // Read current position from the hit area itself (kept up to date by updateScene)
    showFactCard(
      scene,
      {
        id: key,
        name: moonData.name,
        subtitle: `Moon of ${planet.name}`,
        emoji: moonData.emoji,
        facts: moonData.facts || [moonData.fact],
        funFact: moonData.funFact || moonData.fact
      },
      mHit.x,
      mHit.y
    );
  });
  moonObjects[key].hit = mHit;
}

function showGlowRing(scene, planetId, visible) {
  const glow = planetGlows[planetId];
  const p = PLANETS.find(pl => pl.id === planetId);
  if (!glow || !p) {
    return;
  }
  glow.clear();
  if (visible) {
    glow.lineStyle(3, SS.highlight, 0.8);
    glow.strokeCircle(0, 0, p.radius + 5);
    glow.lineStyle(2, SS.highlight, 0.3);
    glow.strokeCircle(0, 0, p.radius + 10);
    glow.setAlpha(1);
  } else {
    glow.setAlpha(0);
  }
}

function isPlanetTarget(planetId) {
  return currentQuestion && currentQuestion.type === 'click' && currentQuestion.answer === planetId;
}

// ── HUD ────────────────────────────────────────────────────────
function drawHUD(scene) {
  // Top bar background
  const topBar = scene.add.rectangle(W / 2, 22, W, 44, SS.hud, 0.92).setDepth(50);
  scene.add
    .text(12, 22, '🪐 Planet Quest', {
      fontSize: '15px',
      fill: '#FDD835',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2
    })
    .setOrigin(0, 0.5)
    .setDepth(51);

  if (gameMode === 'quiz') {
    // Score
    scoreText = scene.add
      .text(W - 14, 14, '⭐ 0', {
        fontSize: '14px',
        fill: '#FFD740',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
      })
      .setOrigin(1, 0)
      .setDepth(51);

    // Lives
    livesText = scene.add
      .text(W - 14, 30, 'Lives: 3', {
        fontSize: '12px',
        fill: '#FF8A80',
        fontFamily: 'Arial, sans-serif'
      })
      .setOrigin(1, 0)
      .setDepth(51);

    // Level
    levelText = scene.add
      .text(W / 2, 22, '', {
        fontSize: '13px',
        fill: '#90CAF9',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)
      .setDepth(51);

    updateHUD(scene);
  } else {
    scene.add
      .text(W / 2, 22, 'Click any planet or moon to explore!', {
        fontSize: '13px',
        fill: '#90CAF9',
        fontFamily: 'Arial, sans-serif'
      })
      .setOrigin(0.5)
      .setDepth(51);
  }
}

function updateHUD(scene) {
  if (scoreText) {
    scoreText.setText(`${quizScore} points`);
  }
  if (livesText) {
    livesText.setText(`Lives: ${Math.max(0, quizLives)}`);
  }
  if (levelText) {
    levelText.setText(LEVEL_NAMES[quizLevel] || '');
  }
  if (progressDots.length > 0) {
    progressDots.forEach((dot, i) => {
      dot.setFillStyle(
        i < questionIndex ? SS.correct : i === questionIndex ? SS.highlight : 0x334466
      );
    });
  }
}

// ── Explore mode ───────────────────────────────────────────────
function showExploreHint(scene) {
  // Small floating hint
  const hint = scene.add
    .text(W / 2, H - 22, '👆 Tap any planet to discover its secrets!', {
      fontSize: '13px',
      fill: '#90CAF9',
      fontFamily: 'Arial, sans-serif',
      stroke: '#000',
      strokeThickness: 2
    })
    .setOrigin(0.5)
    .setDepth(60);

  scene.tweens.add({
    targets: hint,
    alpha: { from: 1, to: 0.4 },
    duration: 1800,
    yoyo: true,
    repeat: -1
  });
}

// ── Fact card (shared between explore and quiz) ────────────────
function showFactCard(scene, obj, targetX, targetY) {
  if (factCardGroup) {
    factCardGroup.destroy(true);
    factCardGroup = null;
  }

  const cardW = 360;
  const cardH = 270;
  const cx = Math.min(Math.max(targetX, cardW / 2 + 10), W - cardW / 2 - 10);
  const cy = Math.min(Math.max(targetY - 140, cardH / 2 + 50), H - cardH / 2 - 10);

  factCardGroup = scene.add.container(cx, cy);
  factCardGroup.setDepth(200);

  // Card background
  const cardBg = scene.add.graphics();
  cardBg.fillStyle(0x0d1b3e, 0.97);
  cardBg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 14);
  cardBg.lineStyle(2, 0x3a6fd8, 1);
  cardBg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 14);
  factCardGroup.add(cardBg);

  // Title row
  const emoji = scene.add
    .text(-cardW / 2 + 16, -cardH / 2 + 14, obj.emoji || '🌌', {
      fontSize: '26px'
    })
    .setOrigin(0, 0);
  const title = scene.add
    .text(-cardW / 2 + 54, -cardH / 2 + 16, obj.name, {
      fontSize: '15px',
      fill: '#FFD740',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      wordWrap: { width: cardW - 80 }
    })
    .setOrigin(0, 0);
  factCardGroup.add([emoji, title]);
  // Optional subtitle (e.g. "Moon of Saturn")
  if (obj.subtitle) {
    const sub = scene.add
      .text(-cardW / 2 + 54, -cardH / 2 + 34, obj.subtitle, {
        fontSize: '10px',
        fill: '#90CAF9',
        fontFamily: 'Arial, sans-serif'
      })
      .setOrigin(0, 0);
    factCardGroup.add(sub);
  }

  // Divider
  const div = scene.add.graphics();
  div.lineStyle(1, 0x3a6fd8, 0.5);
  div.lineBetween(-cardW / 2 + 12, -cardH / 2 + 54, cardW / 2 - 12, -cardH / 2 + 54);
  factCardGroup.add(div);

  // Facts — pick 2 at random so every visit shows something new
  const facts = obj.facts || [];
  const shuffled = facts.slice().sort(() => Math.random() - 0.5);
  const displayFacts = shuffled.slice(0, 2);
  displayFacts.forEach((fact, i) => {
    const ft = scene.add
      .text(-cardW / 2 + 14, -cardH / 2 + 66 + i * 46, fact, {
        fontSize: '13px',
        fill: '#C5D8FF',
        fontFamily: 'Arial, sans-serif',
        wordWrap: { width: cardW - 28 },
        lineSpacing: 3
      })
      .setOrigin(0, 0);
    factCardGroup.add(ft);
  });

  // Fun fact strip — pick a random funFact if it's an array
  const funFacts = Array.isArray(obj.funFact) ? obj.funFact : obj.funFact ? [obj.funFact] : [];
  const funFact =
    funFacts.length > 0 ? funFacts[Math.floor(Math.random() * funFacts.length)] : null;
  if (funFact) {
    const ffBg = scene.add.graphics();
    ffBg.fillStyle(0x1a3a6e, 0.8);
    ffBg.fillRoundedRect(-cardW / 2 + 8, cardH / 2 - 62, cardW - 16, 46, 8);
    factCardGroup.add(ffBg);
    const ff = scene.add
      .text(0, cardH / 2 - 54, `💡 ${funFact}`, {
        fontSize: '12px',
        fill: '#90CAF9',
        fontFamily: 'Arial, sans-serif',
        wordWrap: { width: cardW - 36 },
        align: 'center'
      })
      .setOrigin(0.5, 0);
    factCardGroup.add(ff);
  }

  // Next button — explore mode only, cycles through Sun → all planets
  if (gameMode === 'explore') {
    const exploreSeq = [SUN, ...PLANETS];
    const curIdx = exploreSeq.findIndex(o => o.id === obj.id);
    if (curIdx !== -1) {
      const nextIdx = (curIdx + 1) % exploreSeq.length;
      const nextObj = exploreSeq[nextIdx];

      const nextBg = scene.add.graphics();
      nextBg.fillStyle(0x1a3a8a, 0.9);
      nextBg.fillRoundedRect(-90, -14, 90, 28, 7);
      nextBg.lineStyle(1, 0x5a90ff, 0.8);
      nextBg.strokeRoundedRect(-90, -14, 90, 28, 7);
      nextBg.setPosition(cardW / 2 - 10, cardH / 2 - 12);
      factCardGroup.add(nextBg);

      const nextBtn = scene.add
        .text(cardW / 2 - 16, cardH / 2 - 12, `${nextObj.emoji} ${nextObj.name} →`, {
          fontSize: '11.5px',
          fill: '#90CAF9',
          fontFamily: 'Arial, sans-serif',
          fontStyle: 'bold'
        })
        .setOrigin(1, 0.5)
        .setInteractive({ useHandCursor: true });
      nextBtn.on('pointerover', () => {
        nextBtn.setStyle({ fill: '#FFD740' });
        nextBg.clear();
        nextBg.fillStyle(0x2a5abe, 1);
        nextBg.fillRoundedRect(-90, -14, 90, 28, 7);
        nextBg.lineStyle(1, 0x80b8ff, 1);
        nextBg.strokeRoundedRect(-90, -14, 90, 28, 7);
      });
      nextBtn.on('pointerout', () => {
        nextBtn.setStyle({ fill: '#90CAF9' });
        nextBg.clear();
        nextBg.fillStyle(0x1a3a8a, 0.9);
        nextBg.fillRoundedRect(-90, -14, 90, 28, 7);
        nextBg.lineStyle(1, 0x5a90ff, 0.8);
        nextBg.strokeRoundedRect(-90, -14, 90, 28, 7);
      });
      nextBtn.on('pointerup', () => {
        const nx = nextObj.id === 'sun' ? SUN_X : planetObjects[nextObj.id]?.x || W / 2;
        const ny = nextObj.id === 'sun' ? SUN_Y : planetObjects[nextObj.id]?.y || H / 2;
        showFactCard(scene, nextObj, nx, ny);
      });
      factCardGroup.add(nextBtn);
    }
  }

  // Close button
  const closeBtn = scene.add
    .text(cardW / 2 - 12, -cardH / 2 + 10, '✕', {
      fontSize: '16px',
      fill: '#90CAF9',
      fontFamily: 'Arial, sans-serif'
    })
    .setOrigin(1, 0)
    .setInteractive({ useHandCursor: true });
  closeBtn.on('pointerup', () => {
    factCardGroup && factCardGroup.destroy(true);
    factCardGroup = null;
  });
  closeBtn.on('pointerover', () => closeBtn.setStyle({ fill: '#FF8A80' }));
  closeBtn.on('pointerout', () => closeBtn.setStyle({ fill: '#90CAF9' }));
  factCardGroup.add(closeBtn);

  // Bounce-in animation
  factCardGroup.setScale(0.6);
  factCardGroup.setAlpha(0);
  scene.tweens.add({
    targets: factCardGroup,
    scaleX: 1,
    scaleY: 1,
    alpha: 1,
    duration: 250,
    ease: 'Back.easeOut'
  });

  playSound(scene, 'info');
}

// ── Quiz mode ──────────────────────────────────────────────────
function startQuizLevel(scene) {
  buildQuestionQueue();
  questionIndex = 0;
  answerLocked = false;
  clearQuizUI(scene);
  drawProgressDots(scene);
  updateHUD(scene);
  nextQuestion(scene);
}

function drawProgressDots(scene) {
  progressDots.forEach(d => d.destroy());
  progressDots = [];
  const total = questionQueue.length;
  const dotSize = 6;
  const gap = 14;
  const startX = W / 2 - ((total - 1) * gap) / 2;
  const y = 44;
  for (let i = 0; i < total; i++) {
    const dot = scene.add.circle(startX + i * gap, y, dotSize, 0x334466);
    dot.setDepth(52);
    progressDots.push(dot);
  }
}

function nextQuestion(scene) {
  if (questionIndex >= questionQueue.length) {
    showLevelComplete(scene);
    return;
  }
  currentQuestion = questionQueue[questionIndex];
  answerLocked = false;
  clearFeedback(scene);
  showQuestion(scene, currentQuestion);
  updateHUD(scene);

  // Pulse the target planet
  if (currentQuestion.type === 'click') {
    pulseTargetPlanet(scene, currentQuestion.answer);
  }
}

function showQuestion(scene, q) {
  if (questionPanel) {
    questionPanel.destroy(true);
    questionPanel = null;
  }
  choiceButtons.forEach(b => b.destroy && b.destroy(true));
  choiceButtons = [];

  const catColor = CATEGORY_COLORS[q.category] || {
    bg: 0x1a2456,
    text: '#90CAF9',
    label: q.category
  };
  const panelH = q.panelH || (q.type === 'choice' ? 140 : 110);
  const panelY = 58 + panelH / 2;

  questionPanel = scene.add.container(W / 2, panelY);
  questionPanel.setDepth(60);

  const bg = scene.add.graphics();
  bg.fillStyle(catColor.bg, 0.92);
  bg.fillRoundedRect(-W / 2 + 10, -panelH / 2, W - 20, panelH, 10);
  bg.lineStyle(1, SS.panelBdr, 0.5);
  bg.strokeRoundedRect(-W / 2 + 10, -panelH / 2, W - 20, panelH, 10);
  questionPanel.add(bg);

  // Category badge
  const badge = scene.add
    .text(-W / 2 + 20, -panelH / 2 + 8, catColor.label, {
      fontSize: '10px',
      fill: catColor.text,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: { x: 6, y: 2 }
    })
    .setOrigin(0, 0);
  questionPanel.add(badge);

  // Question number
  const qNum = scene.add
    .text(W / 2 - 20, -panelH / 2 + 8, `${questionIndex + 1}/${questionQueue.length}`, {
      fontSize: '10px',
      fill: 'rgba(255,255,255,0.5)',
      fontFamily: 'Arial, sans-serif'
    })
    .setOrigin(1, 0);
  questionPanel.add(qNum);

  // Question text
  const qText = scene.add
    .text(0, q.type === 'choice' ? -panelH / 2 + 34 : -panelH / 2 + 28, q.text, {
      fontSize: '14px',
      fill: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      wordWrap: { width: W - 60 },
      align: 'center'
    })
    .setOrigin(0.5, 0);
  questionPanel.add(qText);

  // Choice buttons
  if (q.type === 'choice') {
    const choices = q.choices;
    const btnW = Math.min(160, (W - 40) / choices.length - 8);
    const totalW = choices.length * btnW + (choices.length - 1) * 8;
    const startX = -totalW / 2;
    const btnY = panelH / 2 - 28;

    choices.forEach((choice, i) => {
      // Find planet name if it's a planet id
      const planet = PLANETS.find(p => p.id === choice);
      const label = planet ? `${planet.emoji} ${planet.name}` : choice;
      const bx = startX + i * (btnW + 8) + btnW / 2;

      const btn = scene.add.container(bx, btnY);

      const bbg = scene.add.graphics();
      bbg.fillStyle(0x1e3a7a, 0.9);
      bbg.fillRoundedRect(-btnW / 2, -18, btnW, 36, 8);
      bbg.lineStyle(1.5, 0x3a6fd8, 0.7);
      bbg.strokeRoundedRect(-btnW / 2, -18, btnW, 36, 8);
      btn.add(bbg);

      const btxt = scene.add
        .text(0, 0, label, {
          fontSize: '11.5px',
          fill: '#DDEEFF',
          fontFamily: 'Arial, sans-serif',
          fontStyle: 'bold',
          align: 'center',
          wordWrap: { width: btnW - 10 }
        })
        .setOrigin(0.5);
      btn.add(btxt);

      // Hit zone
      const hit = scene.add.rectangle(0, 0, btnW, 36, 0xffffff, 0);
      hit.setInteractive({ useHandCursor: true });
      btn.add(hit);

      hit.on('pointerover', () => {
        bbg.clear();
        bbg.fillStyle(0x2a4e9a, 1);
        bbg.fillRoundedRect(-btnW / 2, -18, btnW, 36, 8);
        bbg.lineStyle(2, 0x5a90ff, 1);
        bbg.strokeRoundedRect(-btnW / 2, -18, btnW, 36, 8);
        btn.setScale(1.04);
      });
      hit.on('pointerout', () => {
        bbg.clear();
        bbg.fillStyle(0x1e3a7a, 0.9);
        bbg.fillRoundedRect(-btnW / 2, -18, btnW, 36, 8);
        bbg.lineStyle(1.5, 0x3a6fd8, 0.7);
        bbg.strokeRoundedRect(-btnW / 2, -18, btnW, 36, 8);
        btn.setScale(1);
      });
      hit.on('pointerup', () => {
        handleChoiceAnswer(scene, choice, btn, bbg, choices, btnW);
      });

      questionPanel.add(btn);
      choiceButtons.push(btn);
    });
  } else {
    // Click-mode instruction
    const inst = scene.add
      .text(0, panelH / 2 - 18, '👆 Click the correct planet in the solar system!', {
        fontSize: '11px',
        fill: '#90CAF9',
        fontFamily: 'Arial, sans-serif',
        align: 'center'
      })
      .setOrigin(0.5, 1);
    questionPanel.add(inst);
  }

  // Slide in from top
  questionPanel.y = panelY - 60;
  questionPanel.alpha = 0;
  scene.tweens.add({
    targets: questionPanel,
    y: panelY,
    alpha: 1,
    duration: 300,
    ease: 'Cubic.easeOut'
  });
}

function pulseTargetPlanet(scene, planetId) {
  showGlowRing(scene, planetId, false);
  const obj = planetObjects[planetId];
  if (!obj) {
    return;
  }
  // Gentle pulse tween on glow
  const glow = planetGlows[planetId];
  if (glow) {
    const p = PLANETS.find(pl => pl.id === planetId);
    glow.clear();
    glow.lineStyle(2, SS.highlight, 0.6);
    glow.strokeCircle(0, 0, p.radius + 6);
    glow.setAlpha(1);
    scene.tweens.add({
      targets: glow,
      alpha: { from: 0.3, to: 0.9 },
      duration: 900,
      yoyo: true,
      repeat: -1
    });
  }
}

// ── Answer handling ─────────────────────────────────────────────
function handlePlanetClick(scene, planet) {
  if (factCardGroup) {
    factCardGroup.destroy(true);
    factCardGroup = null;
  }

  if (gameMode === 'explore') {
    showFactCard(
      scene,
      planet,
      planetObjects[planet.id]?.x || W / 2,
      planetObjects[planet.id]?.y || H / 2
    );
    return;
  }

  // Quiz mode
  if (!currentQuestion || answerLocked) {
    return;
  }
  if (currentQuestion.type !== 'click') {
    return;
  }

  answerLocked = true;
  const correct = planet.id === currentQuestion.answer;
  resolveAnswer(scene, correct, planet, null);
}

function handleChoiceAnswer(scene, choice, btn, bbg, allChoices, btnW) {
  if (!currentQuestion || answerLocked) {
    return;
  }
  answerLocked = true;

  // Check answer — support both planet id and text answers
  let correct = false;
  if (currentQuestion.answer === choice) {
    correct = true;
  }

  // Highlight correct/wrong on choice buttons
  allChoices.forEach((c, i) => {
    const b = choiceButtons[i];
    if (!b) {
      return;
    }
    const isCorrect = c === currentQuestion.answer;
    const isChosen = c === choice;
    // Redraw button bg
    const bg2 = b.getAt(0);
    if (bg2 && bg2.clear) {
      bg2.clear();
      const fillCol = isCorrect ? 0x00873a : isChosen && !isCorrect ? 0x8b0000 : 0x0d2050;
      const borderCol = isCorrect ? SS.correct : isChosen && !isCorrect ? SS.wrong : 0x334466;
      bg2.fillStyle(fillCol, 1);
      bg2.fillRoundedRect(-btnW / 2, -18, btnW, 36, 8);
      bg2.lineStyle(2, borderCol, 1);
      bg2.strokeRoundedRect(-btnW / 2, -18, btnW, 36, 8);
    }
  });

  resolveAnswer(scene, correct, null, choice);
}

function resolveAnswer(scene, correct, planet, choice) {
  if (correct) {
    quizScore += quizLives === 3 ? 100 : quizLives === 2 ? 70 : 40;
    totalStars++;

    // Flash correct planet
    const targetId = currentQuestion.answer;
    const obj = planetObjects[targetId];
    if (obj) {
      scene.tweens.add({
        targets: obj.gfx,
        scaleX: 1.4,
        scaleY: 1.4,
        duration: 150,
        yoyo: true,
        repeat: 1
      });
      spawnParticles(scene, obj.x, obj.y, SS.correct, 14);
    }

    playSound(scene, 'correct');
    showFeedback(scene, true, currentQuestion.successMsg || 'Correct! Well done!');

    // Stop pulsing glow
    const glow = planetGlows[targetId];
    if (glow) {
      scene.tweens.killTweensOf(glow);
      glow.clear();
      glow.lineStyle(3, SS.correct, 0.9);
      const p = PLANETS.find(pl => pl.id === targetId);
      if (p) {
        glow.strokeCircle(0, 0, p.radius + 5);
      }
    }

    scene.time.delayedCall(2200, () => {
      clearFeedback(scene);
      stopAllPlanetGlows(scene);
      questionIndex++;
      nextQuestion(scene);
    });
  } else {
    quizLives--;
    playSound(scene, 'wrong');

    const targetId = currentQuestion.answer;
    const wrongId = planet ? planet.id : null;

    // Shake wrong planet
    if (wrongId && planetObjects[wrongId]) {
      const obj = planetObjects[wrongId];
      scene.tweens.add({ targets: obj.gfx, x: obj.gfx.x + 5, duration: 60, yoyo: true, repeat: 4 });
      spawnParticles(scene, obj.x, obj.y, SS.wrong, 8);
    }

    const msg =
      quizLives <= 0
        ? `💔 The answer was ${getPlanetName(targetId)}!`
        : `🤔 Not quite! The answer is ${getPlanetName(targetId)}. Try to remember for next time!`;

    showFeedback(scene, false, msg);
    updateHUD(scene);

    if (quizLives <= 0) {
      scene.time.delayedCall(2500, () => showGameOver(scene));
    } else {
      scene.time.delayedCall(2200, () => {
        clearFeedback(scene);
        stopAllPlanetGlows(scene);
        answerLocked = false;
        questionIndex++;
        nextQuestion(scene);
      });
    }
  }
}

function getPlanetName(id) {
  const p = PLANETS.find(pl => pl.id === id);
  return p ? `${p.emoji} ${p.name}` : id;
}

function stopAllPlanetGlows(scene) {
  PLANETS.forEach(p => {
    const glow = planetGlows[p.id];
    if (glow) {
      scene.tweens.killTweensOf(glow);
      glow.clear();
      glow.setAlpha(0);
    }
  });
}

// ── Feedback banner ────────────────────────────────────────────
function showFeedback(scene, correct, msg) {
  clearFeedback(scene);
  const col = correct ? SS.correct : SS.wrong;
  const bgCol = correct ? 0x003d1e : 0x3d0000;
  const icon = correct ? '✅' : '❌';

  feedbackGroup = scene.add.container(W / 2, H - 52);
  feedbackGroup.setDepth(80);

  const fbBg = scene.add.graphics();
  fbBg.fillStyle(bgCol, 0.95);
  fbBg.fillRoundedRect(-W / 2 + 10, -24, W - 20, 48, 10);
  fbBg.lineStyle(2, col, 0.8);
  fbBg.strokeRoundedRect(-W / 2 + 10, -24, W - 20, 48, 10);
  feedbackGroup.add(fbBg);

  const fbText = scene.add
    .text(0, 0, `${icon} ${msg}`, {
      fontSize: '12.5px',
      fill: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      wordWrap: { width: W - 60 },
      align: 'center'
    })
    .setOrigin(0.5);
  feedbackGroup.add(fbText);

  feedbackGroup.alpha = 0;
  feedbackGroup.y = H - 30;
  scene.tweens.add({ targets: feedbackGroup, alpha: 1, y: H - 52, duration: 250 });
}

function clearFeedback(scene) {
  if (feedbackGroup) {
    feedbackGroup.destroy(true);
    feedbackGroup = null;
  }
}

function clearQuizUI(scene) {
  clearFeedback(scene);
  if (questionPanel) {
    questionPanel.destroy(true);
    questionPanel = null;
  }
  choiceButtons.forEach(b => b.destroy && b.destroy(true));
  choiceButtons = [];
  progressDots.forEach(d => d.destroy());
  progressDots = [];
  if (celebrationGroup) {
    celebrationGroup.destroy(true);
    celebrationGroup = null;
  }
}

// ── Level complete ─────────────────────────────────────────────
function showLevelComplete(scene) {
  clearQuizUI(scene);
  stopAllPlanetGlows(scene);
  currentQuestion = null;

  celebrationGroup = scene.add.container(W / 2, H / 2);
  celebrationGroup.setDepth(150);

  const overlay = scene.add.rectangle(0, 0, W, H, 0x000000, 0.75);
  overlay.setInteractive();
  celebrationGroup.add(overlay);

  const cardBg = scene.add.graphics();
  cardBg.fillStyle(0x0d1b3e, 1);
  cardBg.fillRoundedRect(-200, -160, 400, 320, 16);
  cardBg.lineStyle(3, 0xffd740, 0.9);
  cardBg.strokeRoundedRect(-200, -160, 400, 320, 16);
  celebrationGroup.add(cardBg);

  const maxLevel = 6;
  const isLast = quizLevel >= maxLevel;

  celebrationGroup.add(
    scene.add
      .text(0, -130, isLast ? '🏆 SOLAR MASTER!' : '🌟 LEVEL COMPLETE!', {
        fontSize: '22px',
        fill: '#FFD740',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 2,
        align: 'center'
      })
      .setOrigin(0.5)
  );

  celebrationGroup.add(
    scene.add
      .text(0, -90, `${LEVEL_NAMES[quizLevel]} ✓`, {
        fontSize: '14px',
        fill: '#90CAF9',
        fontFamily: 'Arial, sans-serif',
        align: 'center'
      })
      .setOrigin(0.5)
  );

  // Star display
  const stars = Math.min(totalStars, questionQueue.length);
  const starStr = '⭐'.repeat(stars) + '☆'.repeat(Math.max(0, questionQueue.length - stars));
  celebrationGroup.add(
    scene.add
      .text(0, -55, starStr, {
        fontSize: '22px',
        align: 'center'
      })
      .setOrigin(0.5)
  );

  celebrationGroup.add(
    scene.add
      .text(0, -15, `Score: ${quizScore}`, {
        fontSize: '18px',
        fill: '#FDD835',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center'
      })
      .setOrigin(0.5)
  );

  if (!isLast) {
    celebrationGroup.add(
      scene.add
        .text(0, 20, `Next: ${LEVEL_NAMES[quizLevel + 1]}`, {
          fontSize: '12px',
          fill: '#90CAF9',
          fontFamily: 'Arial, sans-serif',
          align: 'center'
        })
        .setOrigin(0.5)
    );
  } else {
    celebrationGroup.add(
      scene.add
        .text(0, 20, '🎓 You know the Solar System!', {
          fontSize: '13px',
          fill: '#A5D6A7',
          fontFamily: 'Arial, sans-serif',
          align: 'center'
        })
        .setOrigin(0.5)
    );
  }

  // Buttons
  if (!isLast) {
    addCelebBtn(scene, -60, 80, '▶ Next Level', () => {
      quizLevel++;
      totalStars = 0;
      quizLives = 3;
      if (celebrationGroup) {
        celebrationGroup.destroy(true);
        celebrationGroup = null;
      }
      drawProgressDots(scene);
      startQuizLevel(scene);
    });
  }

  addCelebBtn(scene, isLast ? 0 : 60, 80, '🔄 Replay', () => {
    if (celebrationGroup) {
      celebrationGroup.destroy(true);
      celebrationGroup = null;
    }
    quizScore = 0;
    quizLives = 3;
    quizLevel = 1;
    totalStars = 0;
    drawProgressDots(scene);
    startQuizLevel(scene);
  });

  addCelebBtn(scene, isLast ? 110 : 160, 80, '🏠 Home', () => {
    window.location.href = '../../index.html';
  });

  // Firework particles
  for (let i = 0; i < 30; i++) {
    scene.time.delayedCall(i * 60, () => {
      const px2 = Phaser.Math.Between(100, W - 100);
      const py2 = Phaser.Math.Between(80, H - 100);
      spawnParticles(
        scene,
        px2,
        py2,
        [SS.correct, SS.highlight, 0xff80ab, 0x80d8ff][Math.floor(Math.random() * 4)],
        6
      );
    });
  }

  celebrationGroup.setScale(0.7);
  celebrationGroup.alpha = 0;
  scene.tweens.add({
    targets: celebrationGroup,
    scaleX: 1,
    scaleY: 1,
    alpha: 1,
    duration: 350,
    ease: 'Back.easeOut'
  });
  playSound(scene, 'celebrate');
}

function addCelebBtn(scene, x, y, label, cb) {
  const btn = scene.add.container(x, y);
  btn.setDepth(1);
  const bg = scene.add.graphics();
  bg.fillStyle(0x1a3a8a, 1);
  bg.fillRoundedRect(-72, -18, 144, 36, 10);
  bg.lineStyle(2, 0x5a90ff, 1);
  bg.strokeRoundedRect(-72, -18, 144, 36, 10);
  btn.add(bg);
  const txt = scene.add
    .text(0, 0, label, {
      fontSize: '13px',
      fill: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center'
    })
    .setOrigin(0.5);
  btn.add(txt);
  const hit = scene.add
    .rectangle(0, 0, 144, 36, 0xffffff, 0)
    .setInteractive({ useHandCursor: true });
  btn.add(hit);
  hit.on('pointerover', () => {
    btn.setScale(1.06);
    bg.clear();
    bg.fillStyle(0x2a5aba, 1);
    bg.fillRoundedRect(-72, -18, 144, 36, 10);
    bg.lineStyle(2, 0x80b8ff, 1);
    bg.strokeRoundedRect(-72, -18, 144, 36, 10);
  });
  hit.on('pointerout', () => {
    btn.setScale(1);
    bg.clear();
    bg.fillStyle(0x1a3a8a, 1);
    bg.fillRoundedRect(-72, -18, 144, 36, 10);
    bg.lineStyle(2, 0x5a90ff, 1);
    bg.strokeRoundedRect(-72, -18, 144, 36, 10);
  });
  hit.on('pointerup', cb);
  celebrationGroup.add(btn);
}

// ── Game over ──────────────────────────────────────────────────
function showGameOver(scene) {
  clearQuizUI(scene);
  stopAllPlanetGlows(scene);
  currentQuestion = null;

  celebrationGroup = scene.add.container(W / 2, H / 2);
  celebrationGroup.setDepth(150);

  const overlay = scene.add.rectangle(0, 0, W, H, 0x000000, 0.8);
  overlay.setInteractive();
  celebrationGroup.add(overlay);

  const cardBg = scene.add.graphics();
  cardBg.fillStyle(0x1a0008, 1);
  cardBg.fillRoundedRect(-190, -130, 380, 260, 16);
  cardBg.lineStyle(3, SS.wrong, 0.8);
  cardBg.strokeRoundedRect(-190, -130, 380, 260, 16);
  celebrationGroup.add(cardBg);

  celebrationGroup.add(
    scene.add
      .text(0, -100, '💔 Out of Lives!', {
        fontSize: '22px',
        fill: '#FF8A80',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center'
      })
      .setOrigin(0.5)
  );

  celebrationGroup.add(
    scene.add
      .text(0, -60, `Score: ${quizScore}`, {
        fontSize: '18px',
        fill: '#FDD835',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center'
      })
      .setOrigin(0.5)
  );

  celebrationGroup.add(
    scene.add
      .text(0, -25, `You reached ${LEVEL_NAMES[quizLevel]}`, {
        fontSize: '13px',
        fill: '#90CAF9',
        fontFamily: 'Arial, sans-serif',
        align: 'center'
      })
      .setOrigin(0.5)
  );

  celebrationGroup.add(
    scene.add
      .text(0, 15, "Keep exploring — you'll ace it next time!", {
        fontSize: '12px',
        fill: '#A5D6A7',
        fontFamily: 'Arial, sans-serif',
        align: 'center'
      })
      .setOrigin(0.5)
  );

  addCelebBtn(scene, -70, 70, '🔄 Try Again', () => {
    if (celebrationGroup) {
      celebrationGroup.destroy(true);
      celebrationGroup = null;
    }
    quizScore = 0;
    quizLives = 3;
    quizLevel = 1;
    totalStars = 0;
    drawProgressDots(scene);
    startQuizLevel(scene);
  });

  addCelebBtn(scene, 70, 70, '🏠 Home', () => {
    window.location.href = '../../index.html';
  });

  celebrationGroup.setScale(0.7);
  celebrationGroup.alpha = 0;
  scene.tweens.add({
    targets: celebrationGroup,
    scaleX: 1,
    scaleY: 1,
    alpha: 1,
    duration: 350,
    ease: 'Back.easeOut'
  });
  playSound(scene, 'wrong');
}

// ── Particles ──────────────────────────────────────────────────
function spawnParticles(scene, x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    const p = scene.add.circle(x, y, Math.random() * 3 + 1, color, 1);
    p.setDepth(100);
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed - 1.5;
    p.fade = 0.025 + Math.random() * 0.02;
    particles.push(p);
  }
}

// ── Sound (Web Audio API) ───────────────────────────────────────
function playSound(scene, type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'info') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(550, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'celebrate') {
      const notes = [523, 659, 784, 1046];
      notes.forEach((freq, i) => {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.connect(g2);
        g2.connect(ctx.destination);
        o2.type = 'sine';
        o2.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        g2.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
        o2.start(ctx.currentTime + i * 0.1);
        o2.stop(ctx.currentTime + i * 0.1 + 0.3);
      });
    }
  } catch (e) {
    /* audio not available */
  }
}

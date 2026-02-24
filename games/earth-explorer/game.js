/* eslint-disable no-undef */
// ==================== NAVIGATION ====================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof GameNavigation !== 'undefined') {
    window.gameNav = new GameNavigation('earth-explorer', {
      screens: ['game'],
      initialScreen: 'game',
      gameName: 'Earth Explorer'
    });
  }
});

// Earth Explorer - Interactive Geography Learning Game
// Using inline map rendering (simpler, guaranteed to work!)

const config = createGameConfig({
  width: 900,
  height: 650,
  backgroundColor: 0x87CEEB,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
});

const game = new Phaser.Game(config);

// Game state
let currentScene = 'menu';
let questionsAsked = [];
let currentQuestion = null;
let score = 0;
let totalQuestions = 0;
let scoreText = null;
let questionText = null;
let mapObjects = {};
const gameData = { currentDifficulty: 'mixed' };

function preload() {}

function create() {
  showMainMenu(this);
  if (window.gameAnalytics) {
    window.gameAnalytics.trackGameStart('earth-explorer');
  }
}

function update() {}

// ==================== MAIN MENU ====================
function showMainMenu(scene) {
  scene.children.removeAll();
  currentScene = 'menu';

  // Ensure we have a visible background
  const bg = scene.add.rectangle(450, 325, 900, 650, 0x87CEEB);
  bg.setDepth(-1000); // Make sure it's behind everything else

  scene.add.text(450, 100, '🌍 Earth Explorer', {
    fontSize: '56px',
    fill: '#A44A3F',
    fontStyle: 'bold',
    fontFamily: 'Arial'
  }).setOrigin(0.5);

  scene.add.text(450, 160, 'Learn Continents & Oceans!', {
    fontSize: '24px',
    fill: '#4A4A4A',
    fontFamily: 'Arial'
  }).setOrigin(0.5);

  scene.add.text(250, 130, '🗺️', { fontSize: '40px' });
  scene.add.text(630, 130, '🌊', { fontSize: '40px' });

  createMapButton(scene, 450, 280, '🌍 Continents Only', 0xCBDFBD, () => {
    startGame(scene, 'continents');
  }, 300, 70);

  createMapButton(scene, 450, 370, '🌊 Oceans Only', 0xA44A3F, () => {
    startGame(scene, 'oceans');
  }, 300, 70);

  createMapButton(scene, 450, 460, '🌏 Both (Challenge!)', 0xF19C79, () => {
    startGame(scene, 'mixed');
  }, 300, 70);

  const instructions = [
    '📍 Click on continents to identify them',
    '✨ Learn locations and fun facts',
    '🎯 Complete the map to win!'
  ];

  instructions.forEach((text, i) => {
    scene.add.text(450, 520 + (i * 35), text, {
      fontSize: '16px',
      fill: '#4A4A4A',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
  });
}

// ==================== START GAME ====================
function startGame(scene, difficulty) {
  scene.children.removeAll();
  currentScene = 'playing';
  gameData.currentDifficulty = difficulty;
  score = 0;
  questionsAsked = [];

  let regions = {};
  if (difficulty === 'continents') {
    regions = CONTINENTS;
  } else if (difficulty === 'oceans') {
    regions = OCEANS;
  } else {
    regions = ALL_REGIONS;
  }

  totalQuestions = Object.keys(regions).length;

  // Draw map
  drawMap(scene, regions);

  // Score
  scoreText = scene.add.text(800, 30, `Score: ${score}/${totalQuestions}`, {
    fontSize: '22px',
    fill: '#FFFFFF',
    fontFamily: 'Arial',
    fontStyle: 'bold',
    backgroundColor: '#000000',
    padding: { x: 10, y: 5 }
  }).setOrigin(0.5).setDepth(1000);

  // Start questions
  nextQuestion(scene, Object.keys(regions));
}

// ==================== DRAW MAP ====================
function drawMap(scene, regions) {
  mapObjects = {};

  // Ocean background
  scene.add.rectangle(450, 325, 900, 650, 0x4A90E2, 0.3);

  // Draw continents
  Object.entries(regions).forEach(([id, region]) => {
    if (region.isOcean) {
      // Ocean - simple rectangles
      if (region.areas) {
        const rects = [];
        region.areas.forEach(area => {
          const rect = scene.add.rectangle(area.x, area.y, area.width, area.height, EARTH_COLORS.ocean, 0);
          rect.setStrokeStyle(3, 0xFFFFFF, 0.5);
          rect.setInteractive({ useHandCursor: true });

          // Hover
          rect.on('pointerover', () => {
            if (!mapObjects[id].answered) {
              rect.setFillStyle(0xFFFF00, 0.3);
            }
          });
          rect.on('pointerout', () => {
            if (!mapObjects[id].answered) {
              rect.setFillStyle(EARTH_COLORS.ocean, 0);
            }
          });
          rect.on('pointerdown', () => handleClick(scene, id));

          rects.push(rect);
        });

        const firstArea = region.areas[0];
        const label = scene.add.text(firstArea.labelX || firstArea.x, firstArea.labelY || firstArea.y, region.name, {
          fontSize: '16px',
          fill: '#FFFFFF',
          fontFamily: 'Arial',
          fontStyle: 'bold',
          stroke: '#000000',
          strokeThickness: 3
        }).setOrigin(0.5).setVisible(false);

        mapObjects[id] = { polygons: rects, label: label, data: region, answered: false };
      }
    } else {
      // Continent - polygon
      const polygon = scene.add.polygon(0, 0, region.points, region.color, 1);
      polygon.setOrigin(0);
      polygon.setStrokeStyle(2, 0x000000, 0.4);
      polygon.setInteractive(
        new Phaser.Geom.Polygon(region.points),
        Phaser.Geom.Polygon.Contains
      );

      // Hover
      polygon.on('pointerover', () => {
        if (!mapObjects[id].answered) {
          polygon.setFillStyle(0xFFFF00, 0.8);
        }
      });
      polygon.on('pointerout', () => {
        if (!mapObjects[id].answered) {
          polygon.setFillStyle(region.color, 1);
        }
      });
      polygon.on('pointerdown', () => handleClick(scene, id));

      mapObjects[id] = { polygons: [polygon], label: null, data: region, answered: false };
    }
  });
}

// ==================== NEXT QUESTION ====================
function nextQuestion(scene, pool) {
  const remaining = pool.filter(q => !questionsAsked.includes(q));
  if (remaining.length === 0) {
    showResults(scene);
    return;
  }

  currentQuestion = remaining[Phaser.Math.Between(0, remaining.length - 1)];
  questionsAsked.push(currentQuestion);

  const data = mapObjects[currentQuestion].data;
  if (questionText) {
    questionText.destroy();
  }
  questionText = scene.add.text(450, 30, `Click on: ${data.name}`, {
    fontSize: '32px',
    fill: '#FFFFFF',
    fontFamily: 'Arial',
    fontStyle: 'bold',
    backgroundColor: '#2C5F7F',
    padding: { x: 20, y: 10 }
  }).setOrigin(0.5).setDepth(1000);
}

// ==================== HANDLE CLICK ====================
function handleClick(scene, id) {
  if (mapObjects[id].answered) {
    return;
  }

  if (id === currentQuestion) {
    // Correct!
    score++;
    mapObjects[id].answered = true;

    // Show label
    if (mapObjects[id].label) {
      mapObjects[id].label.setVisible(true).setDepth(1500);
    } else {
      const bounds = mapObjects[id].polygons[0].getBounds();
      const label = scene.add.text(bounds.centerX, bounds.centerY, mapObjects[id].data.name, {
        fontSize: '16px',
        fill: '#000000',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#FFFFFF',
        padding: { x: 8, y: 4 }
      }).setOrigin(0.5).setDepth(1500);
      mapObjects[id].label = label;
    }

    // Make non-interactive
    mapObjects[id].polygons.forEach(p => p.disableInteractive());

    // Update score
    if (scoreText) {
      scoreText.setText(`Score: ${score}/${totalQuestions}`);
    }

    // Show fun fact
    showFunFact(scene, mapObjects[id].data.funFact, () => {
      nextQuestion(scene, Object.keys(mapObjects));
    });
  } else {
    // Wrong!
    mapObjects[id].polygons.forEach(p => {
      scene.tweens.add({ targets: p, x: p.x + 5, duration: 50, yoyo: true, repeat: 3 });
    });

    const feedback = scene.add.text(450, 90, '❌ Try again!', {
      fontSize: '28px',
      fill: '#FF6B6B',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(1000);

    scene.time.delayedCall(1000, () => feedback.destroy());
  }
}

// ==================== FUN FACT ====================
function showFunFact(scene, fact, onClose) {
  const overlay = scene.add.rectangle(450, 325, 900, 650, 0x000000, 0.7).setDepth(2000).setInteractive();
  const modalBg = scene.add.rectangle(450, 325, 600, 300, 0xFFFFFF).setDepth(2001).setStrokeStyle(4, 0xA44A3F);
  const check = scene.add.text(450, 230, '✓', {
    fontSize: '60px',
    fill: '#A44A3F',
    fontFamily: 'Arial'
  }).setOrigin(0.5).setDepth(2002);

  const factText = scene.add.text(450, 320, fact, {
    fontSize: '18px',
    fill: '#2C5F7F',
    fontFamily: 'Arial',
    align: 'center',
    wordWrap: { width: 550 }
  }).setOrigin(0.5).setDepth(2002);

  const btn = scene.add.rectangle(450, 410, 200, 50, 0x10B981).setDepth(2002).setInteractive({ useHandCursor: true });
  const btnText = scene.add.text(450, 410, 'Continue', {
    fontSize: '22px',
    fill: '#FFFFFF',
    fontFamily: 'Arial',
    fontStyle: 'bold'
  }).setOrigin(0.5).setDepth(2003);

  btn.on('pointerdown', () => {
    overlay.destroy();
    modalBg.destroy();
    check.destroy();
    factText.destroy();
    btn.destroy();
    btnText.destroy();
    onClose();
  });

  btn.on('pointerover', () => btn.setAlpha(0.8));
  btn.on('pointerout', () => btn.setAlpha(1));
}

// ==================== RESULTS ====================
function showResults(scene) {
  scene.children.removeAll();
  const percentage = (score / totalQuestions) * 100;
  const stars = percentage === 100 ? 3 : percentage >= 75 ? 2 : percentage >= 50 ? 1 : 0;

  scene.add.rectangle(450, 325, 900, 650, 0x87CEEB);

  const title = percentage === 100 ? '🌟 Perfect Explorer!' :
    percentage >= 75 ? '🎉 Great Job!' :
      percentage >= 50 ? '👍 Good Try!' : '📚 Keep Learning!';

  scene.add.text(450, 100, title, {
    fontSize: '48px',
    fill: '#2C5F7F',
    fontFamily: 'Arial',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  scene.add.text(450, 180, `You found ${score} out of ${totalQuestions}!`, {
    fontSize: '32px',
    fill: '#4A4A4A',
    fontFamily: 'Arial'
  }).setOrigin(0.5);

  scene.add.text(450, 240, '⭐'.repeat(stars) + '☆'.repeat(3 - stars), {
    fontSize: '56px'
  }).setOrigin(0.5);

  createMapButton(scene, 300, 420, '🔄 Play Again', 0x10B981, () => showMainMenu(scene), 220, 60);
  createMapButton(scene, 600, 420, '← Main Menu', 0x4F46E5, () => showMainMenu(scene), 220, 60);

  if (window.gameAnalytics) {
    window.gameAnalytics.trackLevelComplete('earth-explorer', gameData.currentDifficulty, stars);
  }
}

// ==================== BUTTON ====================
function createMapButton(scene, x, y, label, color, callback, width = 200, height = 60) {
  const button = scene.add.rectangle(x, y, width, height, color).setInteractive({ useHandCursor: true });
  const text = scene.add.text(x, y, label, {
    fontSize: '20px',
    fill: '#FFFFFF',
    fontFamily: 'Arial',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  button.on('pointerdown', callback);
  button.on('pointerover', () => {
    button.setAlpha(0.85); button.setScale(1.02);
  });
  button.on('pointerout', () => {
    button.setAlpha(1); button.setScale(1);
  });

  return { button, text };
}

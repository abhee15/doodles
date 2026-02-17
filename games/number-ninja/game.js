// Number Ninja Game - Phaser 3
// Click falling numbers in the correct pattern!
// MIGRATED TO TEMPLATE SYSTEM V2.0

const config = createGameConfig({
    width: 800,
    height: 600,
    backgroundColor: 0xF6F4D2, // Cream
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

const game = new Phaser.Game(config);

// ==================== PATTERNS ====================
const PATTERNS = [
    { name: 'Count by 1s',  step: 1,  start: 1,  count: 15 },
    { name: 'Even Numbers', step: 2,  start: 2,  count: 10 },
    { name: 'Odd Numbers',  step: 2,  start: 1,  count: 10 },
    { name: 'Count by 3s',  step: 3,  start: 3,  count: 8  },
    { name: 'Count by 5s',  step: 5,  start: 5,  count: 8  },
    { name: 'Count by 10s', step: 10, start: 10, count: 8  },
];

// ==================== GAME STATE ====================
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver',
    VICTORY: 'victory'
};

let currentState = GameState.MENU;
let numbers = [];
let currentPattern = null;
let sequence = [];
let currentIndex = 0;
let nextNumber = 1;
let score = 0;
let lives = 3;
let scoreText;
let livesText;
let nextNumberText;
let patternLabel;
let gameActive = false;
let spawnTimer;
let fallSpeed = 80;
let spawnDelay = 2000;

function preload() {}

function create() {
    const center = getCenterPosition(this);

    // Title
    this.add.text(center.x, 30, '🥷 Number Ninja', {
        fontSize: '36px',
        fill: '#A44A3F',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#FFFFFF',
        strokeThickness: 3
    }).setOrigin(0.5);

    // Pause button (hidden until game starts)
    const pauseBtn = createButton(
        this,
        this.scale.width / 2,
        30,
        '⏸️',
        () => showPauseMenu(this),
        { variant: ButtonVariants.GHOST, size: ButtonSizes.SMALL }
    );
    pauseBtn.container.setVisible(false);
    pauseBtn.container.setName('pauseBtn');

    // Score
    scoreText = this.add.text(16, 68, 'Score: 0', {
        fontSize: '22px',
        fill: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: '#A44A3F',
        padding: { x: 10, y: 5 }
    });

    // Lives
    livesText = this.add.text(this.scale.width - 16, 68, '❤️ ❤️ ❤️', {
        fontSize: '22px',
        backgroundColor: '#F19C79',
        padding: { x: 10, y: 5 }
    }).setOrigin(1, 0);

    // Pattern label (shown during play)
    patternLabel = this.add.text(center.x, 68, '', {
        fontSize: '18px',
        fill: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: '#8B6456',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5, 0);

    // Next number indicator
    nextNumberText = this.add.text(center.x, 110, 'Click: 1', {
        fontSize: '28px',
        fill: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: '#A44A3F',
        padding: { x: 14, y: 7 }
    }).setOrigin(0.5);

    // Menu instructions
    const instructions = this.add.text(center.x, center.y - 30,
        '🥷 Click numbers in the right order!\nA random pattern will be chosen.', {
        fontSize: '24px',
        fill: '#3E1F1A',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center'
    }).setOrigin(0.5);

    // Start button
    const startButton = createButton(
        this,
        center.x,
        center.y + 80,
        'START',
        () => {
            instructions.destroy();
            startButton.destroy();
            startGame(this);
        },
        { variant: ButtonVariants.SUCCESS, size: ButtonSizes.LARGE }
    );
}

function update() {
    if (!gameActive) return;

    numbers.forEach((numberObj, index) => {
        if (numberObj.sprite.y > 650) {
            if (numberObj.value === nextNumber) {
                loseLife(this);
            }
            numberObj.sprite.destroy();
            numberObj.text.destroy();
            numbers.splice(index, 1);
        }
    });
}

// ==================== GAME START ====================
function startGame(scene) {
    currentState = GameState.PLAYING;
    gameActive = true;
    score = 0;
    lives = 3;
    fallSpeed = 80;
    spawnDelay = 2000;

    // Pick a random pattern and build the sequence
    currentPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    sequence = [];
    for (let i = 0; i < currentPattern.count; i++) {
        sequence.push(currentPattern.start + i * currentPattern.step);
    }
    currentIndex = 0;
    nextNumber = sequence[0];

    // Show pause button and pattern label
    const pauseBtn = scene.children.getByName('pauseBtn');
    if (pauseBtn) pauseBtn.setVisible(true);
    if (patternLabel) patternLabel.setText(currentPattern.name);

    updateUI();

    spawnTimer = scene.time.addEvent({
        delay: spawnDelay,
        callback: () => spawnNumber(scene),
        loop: true
    });
    spawnNumber(scene);
}

// ==================== DISTRACTOR GENERATION ====================
function getDistractor() {
    const sequenceSet = new Set(sequence);
    const step = currentPattern.step;
    let candidate;
    let attempts = 0;
    do {
        // Stay in a plausible range but land off-pattern
        const spread = Math.max(step * 3, 8);
        candidate = nextNumber + Phaser.Math.Between(1, spread);
        // Occasionally go below nextNumber for variety
        if (Math.random() < 0.3) {
            candidate = Math.max(1, nextNumber - Phaser.Math.Between(1, step * 2));
        }
        attempts++;
    } while (sequenceSet.has(candidate) && attempts < 30);
    return candidate;
}

// ==================== SPAWN ====================
function spawnNumber(scene) {
    if (!gameActive) return;

    let numValue;
    const nextExists = numbers.some(n => n.value === nextNumber);

    if (!nextExists) {
        numValue = nextNumber;
    } else {
        numValue = getDistractor();
    }

    const x = Phaser.Math.Between(80, scene.scale.width - 80);

    const bubble = scene.add.circle(x, -50, 40, 0xA44A3F);
    bubble.setStrokeStyle(4, 0x3E1F1A);

    const text = scene.add.text(x, -50, numValue, {
        fontSize: '28px',
        fill: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    bubble.setInteractive({ useHandCursor: true });
    bubble.on('pointerdown', () => handleNumberClick(scene, numValue, bubble, text));

    scene.tweens.add({
        targets: [bubble, text],
        y: 700,
        duration: (600 / fallSpeed) * 1000,
        ease: 'Linear'
    });

    numbers.push({ value: numValue, sprite: bubble, text });
}

// ==================== CLICK HANDLER ====================
function handleNumberClick(scene, clickedNumber, bubble, text) {
    if (!gameActive) return;

    if (clickedNumber === nextNumber) {
        // Correct!
        score += 10;
        currentIndex++;

        scene.tweens.add({
            targets: [bubble, text],
            scale: 1.5,
            alpha: 0,
            duration: 300,
            onComplete: () => { bubble.destroy(); text.destroy(); }
        });

        const success = scene.add.text(bubble.x, bubble.y, '✓ +10', {
            fontSize: '24px',
            fill: '#A44A3F',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        scene.tweens.add({
            targets: success,
            y: success.y - 50,
            alpha: 0,
            duration: 1000,
            onComplete: () => success.destroy()
        });

        numbers = numbers.filter(n => n.sprite !== bubble);

        if (currentIndex >= sequence.length) {
            winGame(scene);
            return;
        }

        nextNumber = sequence[currentIndex];
        updateUI();

        // Increase difficulty every 50 points
        if (score % 50 === 0 && score > 0) {
            fallSpeed = Math.min(fallSpeed + 10, 150);
            spawnDelay = Math.max(spawnDelay - 200, 800);
            if (spawnTimer) spawnTimer.delay = spawnDelay;
        }

    } else {
        // Wrong!
        bubble.setFillStyle(0xCBDFBD);

        const wrong = scene.add.text(bubble.x, bubble.y, '✗', {
            fontSize: '36px',
            fill: '#A44A3F',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        scene.tweens.add({
            targets: wrong,
            alpha: 0,
            duration: 500,
            onComplete: () => wrong.destroy()
        });

        scene.time.delayedCall(300, () => { bubble.setFillStyle(0xA44A3F); });
        loseLife(scene);
    }
}

function loseLife(scene) {
    lives--;
    updateUI();
    if (lives <= 0) gameOver(scene);
}

// ==================== UI ====================
function updateUI() {
    scoreText.setText(`Score: ${score}`);

    let heartsText = '';
    for (let i = 0; i < lives; i++) heartsText += '❤️ ';
    livesText.setText(heartsText || '💔');

    nextNumberText.setText(`Click: ${nextNumber}`);
}

// ==================== PAUSE ====================
function showPauseMenu(scene) {
    currentState = GameState.PAUSED;
    gameActive = false;
    if (spawnTimer) spawnTimer.paused = true;

    createModal(scene, '⏸️ Paused', 'Take a break!', [
        { label: 'RESUME',  callback: () => resumeGame(scene),                               variant: ButtonVariants.SUCCESS   },
        { label: 'RESTART', callback: () => scene.scene.restart(),                           variant: ButtonVariants.SECONDARY },
        { label: 'EXIT',    callback: () => window.location.href = '../../index.html',       variant: ButtonVariants.GHOST     }
    ]);
}

function resumeGame(scene) {
    currentState = GameState.PLAYING;
    gameActive = true;
    if (spawnTimer) spawnTimer.paused = false;
}

// ==================== END SCREENS ====================
function gameOver(scene) {
    currentState = GameState.GAME_OVER;
    gameActive = false;
    if (spawnTimer) spawnTimer.remove();

    numbers.forEach(n => { n.sprite.destroy(); n.text.destroy(); });
    numbers = [];

    createModal(scene, '💀 Game Over!',
        `Pattern: ${currentPattern ? currentPattern.name : ''}\nFinal Score: ${score}`, [
        { label: 'PLAY AGAIN', callback: () => scene.scene.restart(), variant: ButtonVariants.SUCCESS },
        { label: 'EXIT',       callback: () => window.location.href = '../../index.html', variant: ButtonVariants.GHOST }
    ]);
}

function winGame(scene) {
    currentState = GameState.VICTORY;
    gameActive = false;
    if (spawnTimer) spawnTimer.remove();

    numbers.forEach(n => { n.sprite.destroy(); n.text.destroy(); });
    numbers = [];

    createModal(scene, '🎉 You Win!',
        `Pattern: ${currentPattern.name}\nSequence: ${sequence.join(', ')}\nFinal Score: ${score}`, [
        { label: 'PLAY AGAIN', callback: () => scene.scene.restart(), variant: ButtonVariants.SUCCESS },
        { label: 'EXIT',       callback: () => window.location.href = '../../index.html', variant: ButtonVariants.GHOST }
    ]);
}

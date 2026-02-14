// Number Ninja Game - Phaser 3
// Click falling numbers in the correct order!
// MIGRATED TO TEMPLATE SYSTEM V2.0

const config = createGameConfig({
    width: 800,
    height: 600,
    backgroundColor: COLORS.neutral.darkBg.phaser,
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

let numbers = [];
let nextNumber = 1;
let score = 0;
let lives = 3;
let scoreText;
let livesText;
let nextNumberText;
let gameActive = false;
let spawnTimer;
let fallSpeed = 80;
let spawnDelay = 2000;
let maxNumbers = 20;

function preload() {
    // No external assets needed
}

function create() {
    const center = getCenterPosition(this);

    // Title - using design system typography
    this.add.text(center.x, 30, '🥷 Number Ninja', {
        fontSize: '36px',
        fill: COLORS.warning.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: COLORS.neutral.darkBg.hex,
        strokeThickness: 4
    }).setOrigin(0.5);

    // Score
    scoreText = this.add.text(20, 70, 'Score: 0', {
        fontSize: '24px',
        fill: COLORS.neutral.lightText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: COLORS.neutral.darkBg.hex,
        padding: { x: 10, y: 5 }
    });

    // Lives - responsive positioning
    const livesX = this.scale.width - 100;
    livesText = this.add.text(livesX, 70, '❤️ ❤️ ❤️', {
        fontSize: '24px',
        backgroundColor: COLORS.neutral.darkBg.hex,
        padding: { x: 10, y: 5 }
    });

    // Next number to click
    nextNumberText = this.add.text(center.x, 120, 'Click: 1', {
        fontSize: '32px',
        fill: COLORS.success.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: COLORS.neutral.darkBg.hex,
        padding: { x: 15, y: 8 }
    }).setOrigin(0.5);

    // Instructions
    const instructions = this.add.text(center.x, center.y, 'Click numbers in order!\n1 → 2 → 3 → 4...', {
        fontSize: '28px',
        fill: COLORS.neutral.lightText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center',
        stroke: COLORS.neutral.darkBg.hex,
        strokeThickness: 3
    }).setOrigin(0.5);

    // Start button - using NEW button component system
    const startButton = createButton(
        this,
        center.x,
        center.y + 100,
        'START',
        () => {
            instructions.destroy();
            startButton.destroy();
            startGame(this);
        },
        {
            variant: ButtonVariants.SUCCESS,
            size: ButtonSizes.LARGE
        }
    );
}

function update() {
    if (!gameActive) return;

    // Check if numbers fell off screen
    numbers.forEach((numberObj, index) => {
        if (numberObj.sprite.y > 650) {
            // Only lose life if it was the number we needed!
            if (numberObj.value === nextNumber) {
                loseLife(this);
            }
            // Remove the number regardless
            numberObj.sprite.destroy();
            numberObj.text.destroy();
            numbers.splice(index, 1);
        }
    });
}

function startGame(scene) {
    gameActive = true;
    score = 0;
    lives = 3;
    nextNumber = 1;
    fallSpeed = 80;
    spawnDelay = 2000;

    updateUI();

    // Start spawning numbers
    spawnTimer = scene.time.addEvent({
        delay: spawnDelay,
        callback: () => spawnNumber(scene),
        loop: true
    });

    // Spawn first number immediately
    spawnNumber(scene);
}

function spawnNumber(scene) {
    if (!gameActive) return;

    // FIXED: Ensure the next number needed spawns frequently
    let numValue;

    // Check if next number is already on screen
    const nextNumberExists = numbers.some(n => n.value === nextNumber);

    if (!nextNumberExists) {
        // Always spawn the next number if it's not on screen
        numValue = nextNumber;
    } else {
        // Next number exists, so spawn distractions
        const randomChance = Math.random();
        if (randomChance < 0.5) {
            numValue = nextNumber + Phaser.Math.Between(1, 4);
        } else {
            numValue = Phaser.Math.Between(nextNumber + 1, Math.min(maxNumbers, nextNumber + 8));
        }
    }

    const x = Phaser.Math.Between(100, scene.scale.width - 100);
    const y = -50;

    // Create number bubble - using design system colors
    const bubble = scene.add.circle(x, y, 40, COLORS.info.phaser);
    bubble.setStrokeStyle(4, COLORS.neutral.darkBg.phaser);

    const text = scene.add.text(x, y, numValue, {
        fontSize: '36px',
        fill: COLORS.neutral.darkText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Make interactive
    bubble.setInteractive({ useHandCursor: true });
    bubble.on('pointerdown', () => handleNumberClick(scene, numValue, bubble, text));

    // Animate falling
    scene.tweens.add({
        targets: [bubble, text],
        y: 700,
        duration: (600 / fallSpeed) * 1000,
        ease: 'Linear'
    });

    // Store reference
    numbers.push({
        value: numValue,
        sprite: bubble,
        text: text
    });
}

function handleNumberClick(scene, clickedNumber, bubble, text) {
    if (!gameActive) return;

    if (clickedNumber === nextNumber) {
        // Correct!
        score += 10;
        nextNumber++;

        // Success animation
        scene.tweens.add({
            targets: [bubble, text],
            scale: 1.5,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                bubble.destroy();
                text.destroy();
            }
        });

        // Show success effect
        const success = scene.add.text(bubble.x, bubble.y, '✓ +10', {
            fontSize: '24px',
            fill: COLORS.success.hex,
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

        // Remove from array
        numbers = numbers.filter(n => n.sprite !== bubble);

        // Update UI
        updateUI();

        // Increase difficulty
        if (score % 50 === 0 && score > 0) {
            fallSpeed = Math.min(fallSpeed + 10, 150);
            spawnDelay = Math.max(spawnDelay - 200, 800);
            if (spawnTimer) {
                spawnTimer.delay = spawnDelay;
            }
        }

        // Check win condition
        if (nextNumber > maxNumbers) {
            winGame(scene);
        }

    } else {
        // Wrong number!
        bubble.setFillStyle(COLORS.error.phaser);

        const wrong = scene.add.text(bubble.x, bubble.y, '✗', {
            fontSize: '36px',
            fill: COLORS.error.hex,
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        scene.tweens.add({
            targets: wrong,
            alpha: 0,
            duration: 500,
            onComplete: () => wrong.destroy()
        });

        scene.time.delayedCall(300, () => {
            bubble.setFillStyle(COLORS.info.phaser);
        });

        loseLife(scene);
    }
}

function loseLife(scene) {
    lives--;
    updateUI();

    if (lives <= 0) {
        gameOver(scene);
    }
}

function updateUI() {
    scoreText.setText(`Score: ${score}`);

    let heartsText = '';
    for (let i = 0; i < lives; i++) {
        heartsText += '❤️ ';
    }
    livesText.setText(heartsText || '💔');

    nextNumberText.setText(`Click: ${nextNumber}`);

    // Color code based on urgency - using design system
    if (lives === 1) {
        nextNumberText.setColor(COLORS.error.hex);
    } else if (lives === 2) {
        nextNumberText.setColor(COLORS.warning.hex);
    } else {
        nextNumberText.setColor(COLORS.success.hex);
    }
}

function gameOver(scene) {
    gameActive = false;
    if (spawnTimer) spawnTimer.remove();

    // Clear all numbers
    numbers.forEach(n => {
        n.sprite.destroy();
        n.text.destroy();
    });
    numbers = [];

    const center = getCenterPosition(scene);

    // Game over screen - using design system colors
    const bg = scene.add.rectangle(center.x, center.y, 600, 300, COLORS.neutral.darkBg.phaser, 0.95);
    bg.setStrokeStyle(4, COLORS.error.phaser);

    scene.add.text(center.x, center.y - 60, '💀 Game Over!', {
        fontSize: '48px',
        fill: COLORS.error.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(center.x, center.y, `Final Score: ${score}`, {
        fontSize: '32px',
        fill: COLORS.neutral.lightText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Restart button - using NEW button component
    createButton(
        scene,
        center.x,
        center.y + 80,
        'PLAY AGAIN',
        () => scene.scene.restart(),
        {
            variant: ButtonVariants.SUCCESS,
            size: ButtonSizes.LARGE
        }
    );
}

function winGame(scene) {
    gameActive = false;
    if (spawnTimer) spawnTimer.remove();

    // Clear all numbers
    numbers.forEach(n => {
        n.sprite.destroy();
        n.text.destroy();
    });
    numbers = [];

    const center = getCenterPosition(scene);

    // Victory screen - using design system colors
    const bg = scene.add.rectangle(center.x, center.y, 600, 300, COLORS.neutral.darkBg.phaser, 0.95);
    bg.setStrokeStyle(4, COLORS.warning.phaser);

    scene.add.text(center.x, center.y - 60, '🎉 You Win!', {
        fontSize: '48px',
        fill: COLORS.warning.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(center.x, center.y, `Perfect Score: ${score}`, {
        fontSize: '32px',
        fill: COLORS.neutral.lightText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Restart button - using NEW button component
    createButton(
        scene,
        center.x,
        center.y + 80,
        'PLAY AGAIN',
        () => scene.scene.restart(),
        {
            variant: ButtonVariants.SUCCESS,
            size: ButtonSizes.LARGE
        }
    );
}

// Number Ninja Game - Phaser 3
// Click falling numbers in the correct order!

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
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
};

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
    // Title
    this.add.text(400, 30, '🥷 Number Ninja', {
        fontSize: '36px',
        fill: '#FFD700',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4
    }).setOrigin(0.5);

    // Score
    scoreText = this.add.text(20, 70, 'Score: 0', {
        fontSize: '24px',
        fill: '#fff',
        fontStyle: 'bold',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 }
    });

    // Lives
    livesText = this.add.text(700, 70, '❤️ ❤️ ❤️', {
        fontSize: '24px',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 }
    });

    // Next number to click
    nextNumberText = this.add.text(400, 120, 'Click: 1', {
        fontSize: '32px',
        fill: '#00FF00',
        fontStyle: 'bold',
        backgroundColor: '#000',
        padding: { x: 15, y: 8 }
    }).setOrigin(0.5);

    // Instructions
    const instructions = this.add.text(400, 300, 'Click numbers in order!\n1 → 2 → 3 → 4...', {
        fontSize: '28px',
        fill: '#fff',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#000',
        strokeThickness: 3
    }).setOrigin(0.5);

    // Start button
    const startButton = this.add.rectangle(400, 400, 200, 60, 0x00FF00);
    startButton.setInteractive({ useHandCursor: true });
    startButton.setStrokeStyle(3, 0x000);

    const startText = this.add.text(400, 400, 'START', {
        fontSize: '28px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    startButton.on('pointerdown', () => {
        instructions.destroy();
        startButton.destroy();
        startText.destroy();
        startGame(this);
    });

    startButton.on('pointerover', () => startButton.setFillStyle(0x00DD00));
    startButton.on('pointerout', () => startButton.setFillStyle(0x00FF00));
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

    const x = Phaser.Math.Between(100, 700);
    const y = -50;

    // Create number bubble
    const bubble = scene.add.circle(x, y, 40, 0x4ECDC4);
    bubble.setStrokeStyle(4, 0x000);

    const text = scene.add.text(x, y, numValue, {
        fontSize: '36px',
        fill: '#000',
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
            fill: '#00FF00',
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
        bubble.setFillStyle(0xFF0000);

        const wrong = scene.add.text(bubble.x, bubble.y, '✗', {
            fontSize: '36px',
            fill: '#FF0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        scene.tweens.add({
            targets: wrong,
            alpha: 0,
            duration: 500,
            onComplete: () => wrong.destroy()
        });

        scene.time.delayedCall(300, () => {
            bubble.setFillStyle(0x4ECDC4);
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

    // Color code based on urgency
    if (lives === 1) {
        nextNumberText.setColor('#FF0000');
    } else if (lives === 2) {
        nextNumberText.setColor('#FFFF00');
    } else {
        nextNumberText.setColor('#00FF00');
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

    // Game over screen
    const bg = scene.add.rectangle(400, 300, 600, 300, 0x000000, 0.9);
    bg.setStrokeStyle(4, 0xFF0000);

    scene.add.text(400, 240, '💀 Game Over!', {
        fontSize: '48px',
        fill: '#FF0000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(400, 300, `Final Score: ${score}`, {
        fontSize: '32px',
        fill: '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Restart button
    const restartBtn = scene.add.rectangle(400, 380, 200, 60, 0x00FF00);
    restartBtn.setInteractive({ useHandCursor: true });
    restartBtn.setStrokeStyle(3, 0x000);

    const restartText = scene.add.text(400, 380, 'PLAY AGAIN', {
        fontSize: '24px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    restartBtn.on('pointerdown', () => {
        scene.scene.restart();
    });

    restartBtn.on('pointerover', () => restartBtn.setFillStyle(0x00DD00));
    restartBtn.on('pointerout', () => restartBtn.setFillStyle(0x00FF00));
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

    // Victory screen
    const bg = scene.add.rectangle(400, 300, 600, 300, 0x000000, 0.9);
    bg.setStrokeStyle(4, 0xFFD700);

    scene.add.text(400, 240, '🎉 You Win!', {
        fontSize: '48px',
        fill: '#FFD700',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(400, 300, `Perfect Score: ${score}`, {
        fontSize: '32px',
        fill: '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Restart button
    const restartBtn = scene.add.rectangle(400, 380, 200, 60, 0x00FF00);
    restartBtn.setInteractive({ useHandCursor: true });
    restartBtn.setStrokeStyle(3, 0x000);

    const restartText = scene.add.text(400, 380, 'PLAY AGAIN', {
        fontSize: '24px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    restartBtn.on('pointerdown', () => {
        scene.scene.restart();
    });

    restartBtn.on('pointerover', () => restartBtn.setFillStyle(0x00DD00));
    restartBtn.on('pointerout', () => restartBtn.setFillStyle(0x00FF00));
}

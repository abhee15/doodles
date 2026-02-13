// Math Ladder Game - Phaser 3
// A kid climbs a ladder by solving math problems correctly

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
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

let player;
let ladder;
let currentQuestion;
let answerText;
let timerText;
let scoreText;
let feedbackText;
let inputBoxes = [];
let userAnswer = '';
let timeLeft = 15;
let score = 0;
let currentRung = 0;
let maxRungs = 10;
let gameActive = false;
let timerEvent;

function preload() {
    // We'll use simple graphics - no external assets needed
}

function create() {
    // Draw ladder
    drawLadder(this);

    // Create player (simple circle for now - you can replace with sprite later)
    player = this.add.circle(400, 520, 20, 0xFF6B6B);

    // UI Elements
    scoreText = this.add.text(20, 20, 'Score: 0', {
        fontSize: '24px',
        fill: '#000',
        fontStyle: 'bold'
    });

    timerText = this.add.text(650, 20, 'Time: 15', {
        fontSize: '24px',
        fill: '#000',
        fontStyle: 'bold'
    });

    // Question area
    const questionBg = this.add.rectangle(400, 100, 500, 120, 0xFFFFFF, 0.9);
    questionBg.setStrokeStyle(3, 0x000000);

    answerText = this.add.text(400, 80, '', {
        fontSize: '32px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    feedbackText = this.add.text(400, 140, '', {
        fontSize: '24px',
        fill: '#000'
    }).setOrigin(0.5);

    // Answer input area
    const inputBg = this.add.rectangle(400, 200, 300, 60, 0xEEEEEE);
    inputBg.setStrokeStyle(2, 0x000000);

    const inputText = this.add.text(400, 200, '', {
        fontSize: '36px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Number buttons (0-9)
    const buttonY = 500;
    const buttonSpacing = 70;
    const startX = 150;

    for (let i = 0; i <= 9; i++) {
        const x = startX + (i % 5) * buttonSpacing;
        const y = buttonY + Math.floor(i / 5) * 70;
        createNumberButton(this, x, y, i, inputText);
    }

    // Clear button
    createButton(this, 520, 500, 'Clear', 0xFFAAAA, () => {
        userAnswer = '';
        inputText.setText('');
    });

    // Submit button
    createButton(this, 520, 570, 'Submit', 0xAAFFAA, () => {
        checkAnswer(this, inputText);
    });

    // Instructions
    this.add.text(400, 300, 'Click numbers to answer, then Submit!', {
        fontSize: '20px',
        fill: '#000'
    }).setOrigin(0.5);

    // Start first question
    generateQuestion(this);
    startTimer(this);
}

function update() {
    // Game loop
}

function drawLadder(scene) {
    const ladderX = 400;
    const ladderBottom = 550;
    const rungHeight = 40;

    // Draw ladder rails
    const leftRail = scene.add.rectangle(ladderX - 30, 300, 10, 600, 0x8B4513);
    const rightRail = scene.add.rectangle(ladderX + 30, 300, 10, 600, 0x8B4513);

    // Draw rungs
    for (let i = 0; i < maxRungs; i++) {
        const y = ladderBottom - (i * rungHeight);
        scene.add.rectangle(ladderX, y, 70, 8, 0x8B4513);

        // Rung numbers
        scene.add.text(ladderX + 50, y, i + 1, {
            fontSize: '16px',
            fill: '#000'
        });
    }

    // Goal at top
    scene.add.text(ladderX, 50, '🎯 GOAL!', {
        fontSize: '28px',
        fill: '#FFD700'
    }).setOrigin(0.5);
}

function generateQuestion(scene) {
    gameActive = true;
    feedbackText.setText('');
    userAnswer = '';

    // Generate age-appropriate math (addition/subtraction, numbers 1-20)
    const num1 = Phaser.Math.Between(1, 20);
    const num2 = Phaser.Math.Between(1, 20);
    const operation = Phaser.Math.Between(0, 1) === 0 ? '+' : '-';

    let question, answer;
    if (operation === '+') {
        question = `${num1} + ${num2} = ?`;
        answer = num1 + num2;
    } else {
        // Ensure no negative results for kids
        if (num1 >= num2) {
            question = `${num1} - ${num2} = ?`;
            answer = num1 - num2;
        } else {
            question = `${num2} - ${num1} = ?`;
            answer = num2 - num1;
        }
    }

    currentQuestion = { question, answer };
    answerText.setText(question);

    // Reset timer
    timeLeft = 15;
    timerText.setText(`Time: ${timeLeft}`);
}

function createNumberButton(scene, x, y, number, inputText) {
    const button = scene.add.rectangle(x, y, 60, 60, 0x4ECDC4);
    button.setStrokeStyle(2, 0x000000);
    button.setInteractive({ useHandCursor: true });

    const text = scene.add.text(x, y, number, {
        fontSize: '32px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
        if (gameActive && userAnswer.length < 3) {
            userAnswer += number;
            inputText.setText(userAnswer);
        }
    });

    button.on('pointerover', () => button.setFillStyle(0x3EBDB4));
    button.on('pointerout', () => button.setFillStyle(0x4ECDC4));
}

function createButton(scene, x, y, label, color, callback) {
    const button = scene.add.rectangle(x, y, 120, 60, color);
    button.setStrokeStyle(2, 0x000000);
    button.setInteractive({ useHandCursor: true });

    const text = scene.add.text(x, y, label, {
        fontSize: '20px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    button.on('pointerdown', callback);
    button.on('pointerover', () => button.setAlpha(0.8));
    button.on('pointerout', () => button.setAlpha(1));
}

function checkAnswer(scene, inputText) {
    if (!gameActive || userAnswer === '') return;

    const playerAnswer = parseInt(userAnswer);

    if (playerAnswer === currentQuestion.answer) {
        // Correct answer
        score += 10;
        currentRung++;
        scoreText.setText(`Score: ${score}`);
        feedbackText.setText('✓ Correct! Climbing up!');
        feedbackText.setColor('#00AA00');

        // Animate player up
        scene.tweens.add({
            targets: player,
            y: player.y - 40,
            duration: 500,
            ease: 'Power2'
        });

        // Check if won
        if (currentRung >= maxRungs) {
            gameActive = false;
            feedbackText.setText('🎉 YOU WON! You reached the top!');
            feedbackText.setColor('#FFD700');
            if (timerEvent) timerEvent.remove();
            return;
        }

        // Next question
        scene.time.delayedCall(1000, () => {
            inputText.setText('');
            generateQuestion(scene);
        });

    } else {
        // Wrong answer - fall down
        feedbackText.setText('✗ Wrong! Falling down...');
        feedbackText.setColor('#AA0000');

        if (currentRung > 0) {
            currentRung--;
            scene.tweens.add({
                targets: player,
                y: player.y + 40,
                duration: 500,
                ease: 'Bounce.easeOut'
            });
        }

        // Try again
        scene.time.delayedCall(1500, () => {
            inputText.setText('');
            generateQuestion(scene);
        });
    }

    userAnswer = '';
}

function startTimer(scene) {
    timerEvent = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            if (gameActive) {
                timeLeft--;
                timerText.setText(`Time: ${timeLeft}`);

                if (timeLeft <= 0) {
                    // Time's up - fall down
                    feedbackText.setText('⏰ Time\'s up! Falling down...');
                    feedbackText.setColor('#AA0000');

                    if (currentRung > 0) {
                        currentRung--;
                        scene.tweens.add({
                            targets: player,
                            y: player.y + 40,
                            duration: 500,
                            ease: 'Bounce.easeOut'
                        });
                    }

                    // New question
                    scene.time.delayedCall(1500, () => {
                        generateQuestion(scene);
                    });
                }
            }
        },
        loop: true
    });
}

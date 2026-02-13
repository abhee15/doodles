// Math Ladder Game - Phaser 3
// A kid climbs a ladder by solving math problems correctly

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
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
    // Draw ladder on LEFT side
    drawLadder(this);

    // Create player character on ladder (left side)
    player = this.add.text(200, 520, '🧒', {
        fontSize: '40px'
    }).setOrigin(0.5);
    player.setDepth(10); // Player on top of ladder

    // UI Elements - TOP
    scoreText = this.add.text(420, 20, 'Score: 0', {
        fontSize: '24px',
        fill: '#000',
        fontStyle: 'bold',
        backgroundColor: '#FFFFFF',
        padding: { x: 10, y: 5 }
    });
    scoreText.setDepth(100);

    timerText = this.add.text(650, 20, 'Time: 15', {
        fontSize: '24px',
        fill: '#000',
        fontStyle: 'bold',
        backgroundColor: '#FFFFFF',
        padding: { x: 10, y: 5 }
    });
    timerText.setDepth(100);

    // Question area - RIGHT SIDE
    const questionBg = this.add.rectangle(550, 150, 450, 100, 0xFFFFFF, 0.95);
    questionBg.setStrokeStyle(3, 0x000000);
    questionBg.setDepth(100);

    answerText = this.add.text(550, 135, '', {
        fontSize: '28px',
        fill: '#000',
        fontStyle: 'bold',
        wordWrap: { width: 400 }
    }).setOrigin(0.5);
    answerText.setDepth(101);

    feedbackText = this.add.text(550, 180, '', {
        fontSize: '20px',
        fill: '#000'
    }).setOrigin(0.5);
    feedbackText.setDepth(101);

    // Answer input area - RIGHT SIDE
    const inputBg = this.add.rectangle(550, 250, 250, 60, 0xEEEEEE);
    inputBg.setStrokeStyle(2, 0x000000);
    inputBg.setDepth(100);

    const inputText = this.add.text(550, 250, '', {
        fontSize: '36px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    inputText.setDepth(101);

    // Number buttons (0-9) - RIGHT SIDE, COMPACT
    const buttonY = 340;
    const buttonSpacing = 60;
    const startX = 420;

    for (let i = 0; i <= 9; i++) {
        const x = startX + (i % 5) * buttonSpacing;
        const y = buttonY + Math.floor(i / 5) * 60;
        createNumberButton(this, x, y, i, inputText);
    }

    // Clear button
    createButton(this, 550, 480, 'Clear', 0xFFAAAA, () => {
        userAnswer = '';
        inputText.setText('');
    });

    // Submit button
    createButton(this, 550, 550, 'Submit', 0xAAFFAA, () => {
        checkAnswer(this, inputText);
    });

    // Instructions
    const instructions = this.add.text(550, 300, 'Click numbers, then Submit!', {
        fontSize: '16px',
        fill: '#333',
        backgroundColor: '#FFFF99',
        padding: { x: 8, y: 4 }
    }).setOrigin(0.5);
    instructions.setDepth(100);

    // Start first question
    generateQuestion(this);
    startTimer(this);
}

function update() {
    // Game loop
}

function drawLadder(scene) {
    const ladderX = 200; // LEFT SIDE
    const ladderBottom = 550;
    const rungHeight = 40;

    // Draw ladder rails
    const leftRail = scene.add.rectangle(ladderX - 30, 300, 10, 600, 0x8B4513);
    const rightRail = scene.add.rectangle(ladderX + 30, 300, 10, 600, 0x8B4513);
    leftRail.setDepth(1);
    rightRail.setDepth(1);

    // Draw rungs
    for (let i = 0; i < maxRungs; i++) {
        const y = ladderBottom - (i * rungHeight);
        const rung = scene.add.rectangle(ladderX, y, 70, 8, 0x8B4513);
        rung.setDepth(1);

        // Rung numbers
        scene.add.text(ladderX + 50, y - 5, i + 1, {
            fontSize: '18px',
            fill: '#000',
            fontStyle: 'bold',
            backgroundColor: '#FFFFFF',
            padding: { x: 4, y: 2 }
        }).setDepth(5);
    }

    // Goal at top
    scene.add.text(ladderX, 40, '🎯 GOAL!', {
        fontSize: '32px',
        fill: '#FFD700',
        stroke: '#000',
        strokeThickness: 2
    }).setOrigin(0.5).setDepth(5);
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
    const button = scene.add.rectangle(x, y, 55, 55, 0x4ECDC4);
    button.setStrokeStyle(2, 0x000000);
    button.setInteractive({ useHandCursor: true });
    button.setDepth(100);

    const text = scene.add.text(x, y, number, {
        fontSize: '28px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    text.setDepth(101);

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
    const button = scene.add.rectangle(x, y, 140, 50, color);
    button.setStrokeStyle(2, 0x000000);
    button.setInteractive({ useHandCursor: true });
    button.setDepth(100);

    const text = scene.add.text(x, y, label, {
        fontSize: '20px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    text.setDepth(101);

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

        // Happy character
        player.setText('😊');

        // Animate player up with celebration
        scene.tweens.add({
            targets: player,
            y: player.y - 40,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                player.setText('🧒'); // Back to normal
            }
        });

        // Check if won
        if (currentRung >= maxRungs) {
            gameActive = false;
            player.setText('🎉');
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

        // Sad/falling character
        player.setText('😰');

        if (currentRung > 0) {
            currentRung--;
            scene.tweens.add({
                targets: player,
                y: player.y + 40,
                duration: 500,
                ease: 'Bounce.easeOut',
                onComplete: () => {
                    player.setText('🧒'); // Back to normal
                }
            });
        } else {
            // Already at bottom
            scene.time.delayedCall(500, () => {
                player.setText('🧒');
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

                    // Shocked character
                    player.setText('😱');

                    if (currentRung > 0) {
                        currentRung--;
                        scene.tweens.add({
                            targets: player,
                            y: player.y + 40,
                            duration: 500,
                            ease: 'Bounce.easeOut',
                            onComplete: () => {
                                player.setText('🧒'); // Back to normal
                            }
                        });
                    } else {
                        // Already at bottom
                        scene.time.delayedCall(500, () => {
                            player.setText('🧒');
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

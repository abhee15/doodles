// Math Ladder Game - Phaser 3
// A kid climbs a ladder by solving math problems correctly
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

// Game states
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver',
    VICTORY: 'victory'
};

let currentState = GameState.MENU;
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
let lives = 3;
let gameplayElements = [];

function preload() {
    // We'll use simple graphics - no external assets needed
}

function create() {
    currentState = GameState.MENU;
    showStartScreen(this);
}

// ==================== START SCREEN ====================
function showStartScreen(scene) {
    const center = getCenterPosition(scene);

    // Draw ladder in background
    drawLadder(scene);

    // Create player character on ladder (left side)
    player = scene.add.text(200, 520, '🧒', {
        fontSize: '40px'
    }).setOrigin(0.5);
    player.setDepth(10);

    // Overlay for start screen
    const overlay = scene.add.rectangle(center.x, center.y, scene.scale.width, scene.scale.height, 0xF6F4D2, 0.85);
    overlay.setDepth(50);
    gameplayElements.push(overlay);

    // Title
    const title = scene.add.text(center.x, 100, '🪜 Math Ladder', {
        ...TYPOGRAPHY.phaserStyles.heading,
        fill: '#A44A3F'
    }).setOrigin(0.5);
    title.setDepth(100);
    gameplayElements.push(title);

    // Instructions card
    const instructions = [
        '🎯 Climb to the top by solving math problems!',
        '⏱️ You have 15 seconds per question',
        '✅ Correct answer = Climb up',
        '❌ Wrong answer = Fall down',
        '🏆 Reach the top to win!'
    ];

    let yPos = 180;
    instructions.forEach(line => {
        const text = scene.add.text(center.x, yPos, line, {
            fontSize: '18px',
            fill: COLORS.neutral.darkText.hex,
            fontFamily: 'Arial, sans-serif',
            align: 'center'
        }).setOrigin(0.5);
        text.setDepth(100);
        gameplayElements.push(text);
        yPos += 35;
    });

    // Start button
    const startBtn = createButton(
        scene,
        center.x,
        420,
        'START CLIMBING',
        () => startGameplay(scene),
        {
            variant: ButtonVariants.SUCCESS,
            size: ButtonSizes.LARGE,
            icon: '🚀'
        }
    );
    startBtn.container.setDepth(100);
    gameplayElements.push(startBtn.container);
}

// ==================== GAMEPLAY INITIALIZATION ====================
function startGameplay(scene) {
    currentState = GameState.PLAYING;

    // Clear start screen elements
    gameplayElements.forEach(el => el.destroy());
    gameplayElements = [];

    // Initialize gameplay
    score = 0;
    currentRung = 0;
    lives = 3;
    userAnswer = '';
    gameActive = true;

    // Setup UI
    setupGameplayUI(scene);

    // Start first question
    generateQuestion(scene);
    startTimer(scene);
}

function setupGameplayUI(scene) {
    // UI Elements - TOP (with responsive positioning)
    scoreText = scene.add.text(420, 20, 'Score: 0', {
        fontSize: '24px',
        fill: COLORS.neutral.darkText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: COLORS.neutral.lightBg.hex,
        padding: { x: 10, y: 5 }
    });
    scoreText.setDepth(100);

    // Pause button
    const pauseBtn = createButton(
        scene,
        scene.scale.width / 2,
        20,
        '⏸️',
        () => showPauseMenu(scene),
        {
            variant: ButtonVariants.GHOST,
            size: ButtonSizes.SMALL
        }
    );
    pauseBtn.container.setDepth(100);

    timerText = scene.add.text(scene.scale.width - 150, 20, 'Time: 15', {
        fontSize: '24px',
        fill: COLORS.neutral.darkText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: COLORS.neutral.lightBg.hex,
        padding: { x: 10, y: 5 }
    });
    timerText.setDepth(100);

    // Question area - RIGHT SIDE
    const questionBg = scene.add.rectangle(550, 150, 450, 100, COLORS.neutral.lightBg.phaser, 0.95);
    questionBg.setStrokeStyle(3, COLORS.neutral.darkText.phaser);
    questionBg.setDepth(100);

    answerText = scene.add.text(550, 135, '', {
        fontSize: '28px',
        fill: COLORS.neutral.darkText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        wordWrap: { width: 400 }
    }).setOrigin(0.5);
    answerText.setDepth(101);

    feedbackText = scene.add.text(550, 180, '', {
        fontSize: '20px',
        fill: COLORS.neutral.darkText.hex,
        fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    feedbackText.setDepth(101);

    // Answer input area - RIGHT SIDE
    const inputBg = scene.add.rectangle(550, 250, 250, 60, COLORS.neutral.lightBgAlt.phaser);
    inputBg.setStrokeStyle(2, COLORS.neutral.darkText.phaser);
    inputBg.setDepth(100);

    const inputText = scene.add.text(550, 250, '', {
        fontSize: '36px',
        fill: COLORS.neutral.darkText.hex,
        fontFamily: 'Arial, sans-serif',
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
        createNumberButton(scene, x, y, i, inputText);
    }

    // Instructions
    const instructions = scene.add.text(550, 300, 'Click numbers, then Submit!', {
        fontSize: '18px',
        fill: COLORS.neutral.darkText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: '#F19C79',
        padding: { x: 10, y: 6 }
    }).setOrigin(0.5);
    instructions.setDepth(100);

    // Clear button - using NEW button component
    const clearBtn = createButton(
        scene,
        480,
        480,
        'Clear',
        () => {
            userAnswer = '';
            inputText.setText('');
        },
        {
            variant: ButtonVariants.SECONDARY,
            size: ButtonSizes.SMALL
        }
    );
    clearBtn.container.setDepth(100);

    // Submit button - using NEW button component
    const submitBtn = createButton(
        scene,
        620,
        480,
        'Submit',
        () => checkAnswer(scene, inputText),
        {
            variant: ButtonVariants.SUCCESS,
            size: ButtonSizes.SMALL
        }
    );
    submitBtn.container.setDepth(100);
}

function update() {
    // Game loop
}

// ==================== PAUSE MENU ====================
function showPauseMenu(scene) {
    currentState = GameState.PAUSED;
    gameActive = false;

    if (timerEvent) timerEvent.paused = true;

    createModal(
        scene,
        '⏸️ Paused',
        'Take a break!',
        [
            {
                label: 'RESUME',
                callback: () => resumeGame(scene),
                variant: ButtonVariants.SUCCESS
            },
            {
                label: 'RESTART',
                callback: () => scene.scene.restart(),
                variant: ButtonVariants.SECONDARY
            },
            {
                label: 'EXIT',
                callback: () => window.location.href = '../../index.html',
                variant: ButtonVariants.GHOST
            }
        ]
    );
}

function resumeGame(scene) {
    currentState = GameState.PLAYING;
    gameActive = true;
    if (timerEvent) timerEvent.paused = false;
}

// ==================== END SCREENS ====================
function showGameOver(scene) {
    currentState = GameState.GAME_OVER;
    gameActive = false;
    if (timerEvent) timerEvent.remove();

    createModal(
        scene,
        '💀 Game Over!',
        `Final Score: ${score}\nYou fell off the ladder!`,
        [
            {
                label: 'TRY AGAIN',
                callback: () => scene.scene.restart(),
                variant: ButtonVariants.SUCCESS
            },
            {
                label: 'EXIT',
                callback: () => window.location.href = '../../index.html',
                variant: ButtonVariants.GHOST
            }
        ]
    );
}

function showVictory(scene) {
    currentState = GameState.VICTORY;
    gameActive = false;
    if (timerEvent) timerEvent.remove();

    createModal(
        scene,
        '🎉 You Win!',
        `Amazing! You reached the top!\nFinal Score: ${score}`,
        [
            {
                label: 'PLAY AGAIN',
                callback: () => scene.scene.restart(),
                variant: ButtonVariants.SUCCESS
            },
            {
                label: 'EXIT',
                callback: () => window.location.href = '../../index.html',
                variant: ButtonVariants.GHOST
            }
        ]
    );
}

// ==================== LADDER & GAMEPLAY ====================
function drawLadder(scene) {
    const ladderX = 200; // LEFT SIDE
    const ladderBottom = 550;
    const rungHeight = 40;

    // Draw ladder rails - using design system
    const ladderColor = 0x8B4513; // Keep brown for ladder
    const leftRail = scene.add.rectangle(ladderX - 30, 300, 10, 600, ladderColor);
    const rightRail = scene.add.rectangle(ladderX + 30, 300, 10, 600, ladderColor);
    leftRail.setDepth(1);
    rightRail.setDepth(1);

    // Draw rungs
    for (let i = 0; i < maxRungs; i++) {
        const y = ladderBottom - (i * rungHeight);
        const rung = scene.add.rectangle(ladderX, y, 70, 8, ladderColor);
        rung.setDepth(1);

        // Rung numbers
        scene.add.text(ladderX + 50, y - 5, i + 1, {
            fontSize: '18px',
            fill: COLORS.neutral.darkText.hex,
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            backgroundColor: COLORS.neutral.lightBg.hex,
            padding: { x: 4, y: 2 }
        }).setDepth(5);
    }

    // Goal at top
    scene.add.text(ladderX, 40, '🎯 GOAL!', {
        fontSize: '32px',
        fill: '#F19C79',
        fontFamily: 'Arial, sans-serif',
        stroke: COLORS.neutral.darkBg.hex,
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
    // Using design system colors
    const button = scene.add.rectangle(x, y, 55, 55, 0xA44A3F);
    button.setStrokeStyle(2, COLORS.neutral.darkBg.phaser);
    button.setInteractive({ useHandCursor: true });
    button.setDepth(100);

    const text = scene.add.text(x, y, number, {
        fontSize: '28px',
        fill: COLORS.neutral.lightText.hex,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    text.setDepth(101);

    button.on('pointerdown', () => {
        if (gameActive && userAnswer.length < 3) {
            userAnswer += number;
            inputText.setText(userAnswer);
        }
    });

    button.on('pointerover', () => button.setFillStyle(0xA44A3F));
    button.on('pointerout', () => button.setFillStyle(0xA44A3F));
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
        feedbackText.setColor('#A44A3F');

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
            player.setText('🎉');
            scene.time.delayedCall(1000, () => {
                showVictory(scene);
            });
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
        feedbackText.setColor('#A44A3F');

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
            // Already at bottom - lose a life
            lives--;
            scene.time.delayedCall(500, () => {
                player.setText('🧒');
                if (lives <= 0) {
                    showGameOver(scene);
                    return;
                }
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
                    feedbackText.setColor('#A44A3F');

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
                        // Already at bottom - lose a life
                        lives--;
                        scene.time.delayedCall(500, () => {
                            player.setText('🧒');
                            if (lives <= 0) {
                                showGameOver(scene);
                                return;
                            }
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

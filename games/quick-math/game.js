// Quick Math - Learn Vedic Math Tricks!
// Phaser 3 Game

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2d3436',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Game state
let currentScene = 'menu'; // menu, level-select, tutorial, practice, challenge
let currentLevel = 1;
let unlockedLevels = 1;
let score = 0;
let currentQuestion = null;
let userAnswer = '';

// Placeholder colors (will replace with Monakki theme)
const COLORS = {
    primary: 0x6C5CE7,      // Purple
    secondary: 0xFDCB6E,    // Yellow/Gold
    success: 0x00B894,      // Green
    error: 0xFF7675,        // Red
    background: 0x2d3436,   // Dark gray
    text: 0xFFFFFF,         // White
    buttonBg: 0x74B9FF      // Light blue
};

function preload() {
    // No external assets needed
}

function create() {
    this.scene = this;
    showMainMenu(this);
}

function update() {
    // Game loop
}

// ==================== MAIN MENU ====================
function showMainMenu(scene) {
    scene.children.removeAll();
    currentScene = 'menu';

    // Title
    scene.add.text(400, 80, '⚡ Quick Math', {
        fontSize: '56px',
        fill: '#FDCB6E',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 6
    }).setOrigin(0.5);

    scene.add.text(400, 140, 'Learn Math Tricks!', {
        fontSize: '24px',
        fill: '#fff',
        fontStyle: 'italic'
    }).setOrigin(0.5);

    // Start button
    createButton(scene, 400, 250, 'Start Learning', COLORS.primary, () => {
        showLevelSelect(scene);
    });

    // Instructions
    const instructions = [
        '🎯 Learn fast math tricks',
        '📚 One trick at a time',
        '⚡ Become a math superstar!'
    ];

    instructions.forEach((text, i) => {
        scene.add.text(400, 350 + (i * 40), text, {
            fontSize: '20px',
            fill: '#fff'
        }).setOrigin(0.5);
    });
}

// ==================== LEVEL SELECT ====================
function showLevelSelect(scene) {
    scene.children.removeAll();
    currentScene = 'level-select';

    // Title
    scene.add.text(400, 50, 'Choose Your Trick', {
        fontSize: '40px',
        fill: '#FDCB6E',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Level cards
    const levels = [
        { id: 1, name: 'Multiply by 11', icon: '×11', desc: 'The pattern trick!' },
        { id: 2, name: 'Square Numbers (×5)', icon: '²', desc: 'Numbers ending in 5', locked: true },
        { id: 3, name: 'Doubling & Halving', icon: '×÷', desc: 'Smart shortcuts', locked: true },
        { id: 4, name: 'Base Method', icon: '~10', desc: 'Near 10, 100...', locked: true }
    ];

    levels.forEach((level, index) => {
        const x = 200 + (index % 2) * 350;
        const y = 150 + Math.floor(index / 2) * 180;
        const isLocked = level.locked && level.id > unlockedLevels;

        createLevelCard(scene, x, y, level, isLocked);
    });

    // Back button
    createButton(scene, 100, 550, '← Back', COLORS.error, () => {
        showMainMenu(scene);
    }, 150, 50);
}

function createLevelCard(scene, x, y, level, isLocked) {
    const cardBg = scene.add.rectangle(x, y, 300, 140, isLocked ? 0x636e72 : COLORS.buttonBg);
    cardBg.setStrokeStyle(3, isLocked ? 0x000 : COLORS.primary);

    // Icon
    scene.add.text(x - 100, y, level.icon, {
        fontSize: '48px',
        fill: isLocked ? '#aaa' : '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Name
    scene.add.text(x + 20, y - 30, level.name, {
        fontSize: '20px',
        fill: isLocked ? '#aaa' : '#fff',
        fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Description
    scene.add.text(x + 20, y + 10, level.desc, {
        fontSize: '14px',
        fill: isLocked ? '#888' : '#ddd'
    }).setOrigin(0, 0.5);

    if (isLocked) {
        scene.add.text(x, y + 50, '🔒 Locked', {
            fontSize: '16px',
            fill: '#aaa'
        }).setOrigin(0.5);
    } else {
        const playBtn = scene.add.rectangle(x, y + 50, 120, 35, COLORS.success);
        playBtn.setInteractive({ useHandCursor: true });
        playBtn.setStrokeStyle(2, 0x000);

        const playText = scene.add.text(x, y + 50, 'Learn →', {
            fontSize: '16px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        playBtn.on('pointerdown', () => {
            currentLevel = level.id;
            showTutorial(scene, level.id);
        });

        playBtn.on('pointerover', () => playBtn.setAlpha(0.8));
        playBtn.on('pointerout', () => playBtn.setAlpha(1));
    }
}

// ==================== TUTORIAL (Level 1: Multiply by 11) ====================
function showTutorial(scene, levelId) {
    scene.children.removeAll();
    currentScene = 'tutorial';

    if (levelId === 1) {
        tutorialMultiplyBy11(scene);
    }
    // Add more tutorials for other levels later
}

function tutorialMultiplyBy11(scene) {
    let step = 0;

    const steps = [
        {
            title: 'The ×11 Trick',
            text: 'Learn the fastest way to multiply any 2-digit number by 11!',
            example: ''
        },
        {
            title: 'Example: 23 × 11',
            text: 'The normal way:\n23 × 10 = 230\n23 × 1 = 23\n230 + 23 = 253',
            example: '23 × 11 = 253'
        },
        {
            title: 'The Quick Way!',
            text: 'Step 1: Write the first digit → 2__',
            example: '2__',
            highlight: '2'
        },
        {
            title: 'The Quick Way!',
            text: 'Step 2: Add the two digits → 2+3 = 5',
            example: '2_5_',
            highlight: '5'
        },
        {
            title: 'The Quick Way!',
            text: 'Step 3: Write the last digit → 3',
            example: '253',
            highlight: '3'
        },
        {
            title: 'The Pattern!',
            text: 'For any number AB:\nA [A+B] B = Answer\n\n23 → 2 [2+3] 3 → 253\n45 → 4 [4+5] 5 → 495',
            example: '✨ Magic! ✨'
        }
    ];

    function showStep() {
        scene.children.removeAll();

        const currentStep = steps[step];

        // Title
        scene.add.text(400, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#FDCB6E',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Explanation text
        scene.add.text(400, 180, currentStep.text, {
            fontSize: '22px',
            fill: '#fff',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Example
        if (currentStep.example) {
            scene.add.text(400, 350, currentStep.example, {
                fontSize: '48px',
                fill: '#00B894',
                fontStyle: 'bold',
                stroke: '#000',
                strokeThickness: 3
            }).setOrigin(0.5);
        }

        // Progress
        scene.add.text(400, 480, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#aaa'
        }).setOrigin(0.5);

        // Navigation buttons
        if (step > 0) {
            createButton(scene, 200, 540, '← Previous', COLORS.buttonBg, () => {
                step--;
                showStep();
            }, 150, 50);
        }

        if (step < steps.length - 1) {
            createButton(scene, 600, 540, 'Next →', COLORS.success, () => {
                step++;
                showStep();
            }, 150, 50);
        } else {
            createButton(scene, 600, 540, 'Practice!', COLORS.success, () => {
                showPractice(scene, 1);
            }, 150, 50);
        }

        // Back to menu
        createButton(scene, 100, 50, '← Back', COLORS.error, () => {
            showLevelSelect(scene);
        }, 120, 40);
    }

    showStep();
}

// ==================== PRACTICE MODE ====================
function showPractice(scene, levelId) {
    scene.children.removeAll();
    currentScene = 'practice';

    score = 0;
    let questionsAnswered = 0;
    const totalQuestions = 5;

    // Title
    scene.add.text(400, 40, '⚡ Practice Time!', {
        fontSize: '36px',
        fill: '#FDCB6E',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Score
    const scoreText = scene.add.text(650, 40, 'Score: 0/5', {
        fontSize: '24px',
        fill: '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Question area
    let questionText, answerText, feedbackText, inputText;

    function generateQuestion() {
        if (questionsAnswered >= totalQuestions) {
            showResults(scene, score, totalQuestions);
            return;
        }

        userAnswer = '';
        currentQuestion = {
            num: Phaser.Math.Between(12, 99),
            answer: null
        };
        currentQuestion.answer = currentQuestion.num * 11;

        if (questionText) questionText.destroy();
        if (answerText) answerText.destroy();
        if (feedbackText) feedbackText.destroy();
        if (inputText) inputText.destroy();

        questionText = scene.add.text(400, 150, `${currentQuestion.num} × 11 = ?`, {
            fontSize: '48px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Input display
        answerText = scene.add.rectangle(400, 250, 250, 70, 0x2d3436);
        answerText.setStrokeStyle(3, COLORS.buttonBg);

        inputText = scene.add.text(400, 250, '', {
            fontSize: '42px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        feedbackText = scene.add.text(400, 340, '', {
            fontSize: '28px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Number pad
        createNumberPad(scene, inputText);

        // Buttons
        createButton(scene, 300, 520, 'Clear', COLORS.error, () => {
            userAnswer = '';
            inputText.setText('');
        }, 120, 50);

        createButton(scene, 500, 520, 'Submit', COLORS.success, () => {
            checkAnswer();
        }, 120, 50);
    }

    function checkAnswer() {
        const answer = parseInt(userAnswer);

        if (answer === currentQuestion.answer) {
            score++;
            feedbackText.setText('✓ Correct! +1');
            feedbackText.setColor('#00B894');
        } else {
            feedbackText.setText(`✗ Wrong. Answer: ${currentQuestion.answer}`);
            feedbackText.setColor('#FF7675');
        }

        questionsAnswered++;
        scoreText.setText(`Score: ${score}/${totalQuestions}`);

        scene.time.delayedCall(2000, () => {
            generateQuestion();
        });
    }

    // Back button
    createButton(scene, 100, 40, '← Back', COLORS.error, () => {
        showLevelSelect(scene);
    }, 120, 40);

    generateQuestion();
}

// ==================== RESULTS ====================
function showResults(scene, score, total) {
    scene.children.removeAll();

    const percentage = (score / total) * 100;
    const passed = percentage >= 60;

    scene.add.text(400, 100, passed ? '🎉 Great Job!' : '📚 Keep Practicing!', {
        fontSize: '48px',
        fill: passed ? '#00B894' : '#FF7675',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(400, 200, `Score: ${score}/${total}`, {
        fontSize: '42px',
        fill: '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(400, 260, `${percentage}%`, {
        fontSize: '36px',
        fill: '#FDCB6E'
    }).setOrigin(0.5);

    if (passed && unlockedLevels === currentLevel) {
        unlockedLevels++;
        scene.add.text(400, 330, '🔓 Next level unlocked!', {
            fontSize: '24px',
            fill: '#00B894'
        }).setOrigin(0.5);
    }

    createButton(scene, 300, 450, 'Try Again', COLORS.buttonBg, () => {
        showPractice(scene, currentLevel);
    });

    createButton(scene, 500, 450, 'Level Select', COLORS.success, () => {
        showLevelSelect(scene);
    });
}

// ==================== NUMBER PAD ====================
function createNumberPad(scene, inputText) {
    const startX = 280;
    const startY = 400;
    const spacing = 70;

    for (let i = 0; i <= 9; i++) {
        const x = startX + (i % 5) * spacing;
        const y = startY + Math.floor(i / 5) * 60;

        const btn = scene.add.rectangle(x, y, 55, 50, COLORS.buttonBg);
        btn.setInteractive({ useHandCursor: true });
        btn.setStrokeStyle(2, 0x000);

        const text = scene.add.text(x, y, i, {
            fontSize: '28px',
            fill: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            if (userAnswer.length < 4) {
                userAnswer += i;
                inputText.setText(userAnswer);
            }
        });

        btn.on('pointerover', () => btn.setAlpha(0.8));
        btn.on('pointerout', () => btn.setAlpha(1));
    }
}

// ==================== HELPER: CREATE BUTTON ====================
function createButton(scene, x, y, label, color, callback, width = 200, height = 60) {
    const button = scene.add.rectangle(x, y, width, height, color);
    button.setInteractive({ useHandCursor: true });
    button.setStrokeStyle(3, 0x000);

    const text = scene.add.text(x, y, label, {
        fontSize: '22px',
        fill: '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    button.on('pointerdown', callback);
    button.on('pointerover', () => button.setAlpha(0.8));
    button.on('pointerout', () => button.setAlpha(1));

    return { button, text };
}

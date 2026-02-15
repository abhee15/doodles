// Earth Explorer - Interactive Geography Learning Game
// BUILT ON REUSABLE MAP ENGINE - Template for all future geography games!

// Game state
let currentScene = 'menu';
let currentLevel = 1;
let questionsAsked = [];
let currentQuestion = null;
let score = 0;
let totalQuestions = 0;
let mapController = null;
let scoreText = null;
let questionText = null;
let gameData = {
    answered: {},
    currentDifficulty: 'mixed'
};

const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: 0x87CEEB, // Sky blue
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

const game = new Phaser.Game(config);

function preload() {
    // No external assets needed
}

function create() {
    this.scene = this;
    showMainMenu(this);

    if (window.gameAnalytics) {
        window.gameAnalytics.trackGameStart('earth-explorer');
    }
}

function update() {
    // Game loop
}

// ==================== MAIN MENU ====================
function showMainMenu(scene) {
    scene.children.removeAll();
    currentScene = 'menu';
    mapController = null;

    scene.add.rectangle(450, 325, 900, 650, 0x87CEEB);

    scene.add.text(450, 100, '🌍 Earth Explorer', {
        fontSize: '56px',
        fill: '#2C5F7F',
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

    const buttonY = 280;
    const spacing = 90;

    createButton(scene, 450, buttonY, '🌍 Continents Only', EARTH_COLORS.northAmerica, () => {
        startGame(scene, 'continents');
    }, 300, 70);

    createButton(scene, 450, buttonY + spacing, '🌊 Oceans Only', EARTH_COLORS.ocean, () => {
        startGame(scene, 'oceans');
    }, 300, 70);

    createButton(scene, 450, buttonY + spacing * 2, '🌏 Both (Challenge!)', EARTH_COLORS.asia, () => {
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
    gameData.answered = {};
    score = 0;
    questionsAsked = [];
    scoreText = null;
    questionText = null;

    // Determine which regions to use
    let regions = {};
    if (difficulty === 'continents') {
        regions = CONTINENTS;
    } else if (difficulty === 'oceans') {
        regions = OCEANS;
    } else {
        regions = ALL_REGIONS;
    }

    totalQuestions = Object.keys(regions).length;

    // CREATE THE INTERACTIVE MAP USING THE MAP ENGINE!
    // This is the reusable foundation for all geography games
    mapController = createInteractiveMap(scene, regions, {
        backgroundColor: 0x87CEEB,
        oceanColor: 0x4A90E2,
        highlightColor: 0xFFFF00,
        onRegionClick: (regionId, regionData) => handleMapClick(scene, regionId, regionData),
        showLabelsOnAnswer: true
    });

    // Score display
    scoreText = scene.add.text(800, 30, `Score: ${score}/${totalQuestions}`, {
        fontSize: '22px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    scoreText.setDepth(1000);

    // Start first question
    nextQuestion(scene, Object.keys(regions));
}

// ==================== NEXT QUESTION ====================
function nextQuestion(scene, questionPool) {
    const remainingQuestions = questionPool.filter(q => !questionsAsked.includes(q));

    if (remainingQuestions.length === 0) {
        showResults(scene);
        return;
    }

    const randomIndex = Phaser.Math.Between(0, remainingQuestions.length - 1);
    currentQuestion = remainingQuestions[randomIndex];
    questionsAsked.push(currentQuestion);

    const data = CONTINENTS[currentQuestion] || OCEANS[currentQuestion];

    if (questionText) questionText.destroy();
    questionText = scene.add.text(450, 30, `Click on: ${data.name}`, {
        fontSize: '32px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#2C5F7F',
        padding: { x: 20, y: 10 }
    }).setOrigin(0.5);
    questionText.setDepth(1000);
}

// ==================== HANDLE MAP CLICK ====================
function handleMapClick(scene, clickedId, clickedData) {
    // Check if already answered
    if (mapController.isAnswered(clickedId)) {
        return;
    }

    // Check if correct
    if (clickedId === currentQuestion) {
        handleCorrectAnswer(scene, clickedId, clickedData);
    } else {
        // Wrong answer - shake the region
        mapController.shakeRegion(clickedId);

        const feedbackText = scene.add.text(450, 90, '❌ Try again!', {
            fontSize: '28px',
            fill: '#FF6B6B',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        feedbackText.setDepth(1000);

        scene.time.delayedCall(1000, () => feedbackText.destroy());
    }
}

// ==================== HANDLE CORRECT ANSWER ====================
function handleCorrectAnswer(scene, regionId, regionData) {
    score++;

    // Use map engine to mark as answered (auto-labels and highlights)
    mapController.answerRegion(regionId);

    // Update score
    if (scoreText) {
        scoreText.setText(`Score: ${score}/${totalQuestions}`);
    }

    // Show fun fact
    showFunFact(scene, regionData.funFact, () => {
        const questionPool = mapController.getAllRegionIds();
        nextQuestion(scene, questionPool);
    });
}

// ==================== SHOW FUN FACT ====================
function showFunFact(scene, fact, onClose) {
    const overlay = scene.add.rectangle(450, 325, 900, 650, 0x000000, 0.7);
    overlay.setDepth(2000);
    overlay.setInteractive();

    const modalBg = scene.add.rectangle(450, 325, 600, 300, 0xFFFFFF);
    modalBg.setDepth(2001);
    modalBg.setStrokeStyle(4, COLORS.success.phaser);

    const check = scene.add.text(450, 230, '✓', {
        fontSize: '60px',
        fill: '#00D68F',
        fontFamily: 'Arial'
    }).setOrigin(0.5);
    check.setDepth(2002);

    const factText = scene.add.text(450, 320, fact, {
        fontSize: '18px',
        fill: '#2C5F7F',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 550 }
    }).setOrigin(0.5);
    factText.setDepth(2002);

    const continueBtn = scene.add.rectangle(450, 410, 200, 50, COLORS.success.phaser);
    continueBtn.setDepth(2002);
    continueBtn.setInteractive({ useHandCursor: true });

    const continueText = scene.add.text(450, 410, 'Continue', {
        fontSize: '22px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    continueText.setDepth(2003);

    continueBtn.on('pointerdown', () => {
        overlay.destroy();
        modalBg.destroy();
        check.destroy();
        factText.destroy();
        continueBtn.destroy();
        continueText.destroy();
        onClose();
    });

    continueBtn.on('pointerover', () => continueBtn.setAlpha(0.8));
    continueBtn.on('pointerout', () => continueBtn.setAlpha(1));
}

// ==================== RESULTS SCREEN ====================
function showResults(scene) {
    scene.children.removeAll();
    currentScene = 'results';

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

    const starDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    scene.add.text(450, 240, starDisplay, {
        fontSize: '56px'
    }).setOrigin(0.5);

    let message = '';
    if (percentage === 100) message = 'You know Earth perfectly! 🌍';
    else if (percentage >= 75) message = 'You\'re becoming a geography expert!';
    else if (percentage >= 50) message = 'Keep exploring to learn more!';
    else message = 'Practice makes perfect! Try again!';

    scene.add.text(450, 320, message, {
        fontSize: '22px',
        fill: '#4A4A4A',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);

    createButton(scene, 300, 420, '🔄 Play Again', COLORS.success.phaser, () => {
        showMainMenu(scene);
    }, 220, 60);

    createButton(scene, 600, 420, '← Main Menu', COLORS.primary.phaser, () => {
        showMainMenu(scene);
    }, 220, 60);

    if (window.gameAnalytics) {
        window.gameAnalytics.trackLevelComplete('earth-explorer', gameData.currentDifficulty, stars);
    }
}

// ==================== HELPER: CREATE BUTTON ====================
function createButton(scene, x, y, label, color, callback, width = 200, height = 60) {
    const button = scene.add.rectangle(x, y, width, height, color);
    button.setInteractive({ useHandCursor: true });

    const text = scene.add.text(x, y, label, {
        fontSize: '20px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    button.on('pointerdown', callback);

    button.on('pointerover', () => {
        button.setAlpha(0.85);
        button.setScale(1.02);
    });

    button.on('pointerout', () => {
        button.setAlpha(1);
        button.setScale(1);
    });

    return { button, text };
}

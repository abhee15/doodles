// Earth Explorer - Interactive Geography Learning Game
// Educational game for kids to learn continents and oceans

// Earth Explorer local colors - mapped to design system
const EARTH_COLORS = {
    primary: COLORS.primary.phaser,
    secondary: COLORS.warning.phaser,
    success: COLORS.success.phaser,
    error: COLORS.error.phaser,
    background: 0x87CEEB, // Sky blue for ocean background
    ocean: 0x4A90E2,      // Ocean blue
    oceanAnswered: 0x2E5C8A, // Darker blue when answered
    continent: 0xD4C4A8,  // Beige/tan for continents
    // Individual continent colors (kid-friendly, distinct)
    africa: 0xFFB347,     // Orange
    antarctica: 0xE0E0E0, // Light gray
    asia: 0xFF6B9D,       // Pink
    australia: 0xFFD93D,  // Yellow
    europe: 0x95E1D3,     // Mint green
    northAmerica: 0xA8E6CF, // Light green
    southAmerica: 0xFFAA85, // Coral
    // UI colors
    highlight: 0xFFFF00,  // Yellow highlight for hover
    correct: COLORS.success.phaser,
    text: COLORS.neutral.darkText.phaser
};

const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: EARTH_COLORS.background,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

const game = new Phaser.Game(config);

// Game state
let currentScene = 'menu';
let currentLevel = 1; // 1=Continents, 2=Oceans, 3=Both
let questionsAsked = [];
let currentQuestion = null;
let score = 0;
let totalQuestions = 0;
let mapObjects = {}; // Store all map region objects

// Geographic data with simplified polygon coordinates
// Coordinates are approximate and kid-friendly simplified
const CONTINENTS = {
    africa: {
        name: 'Africa',
        color: EARTH_COLORS.africa,
        funFact: 'Africa has the world\'s largest desert (Sahara) and is home to amazing animals like lions and elephants!',
        // Simplified polygon points (x, y coordinates)
        points: [
            450, 250,  // Top
            480, 280,  // Northeast
            490, 340,  // East
            480, 400,  // Southeast
            450, 420,  // South
            420, 380,  // Southwest
            410, 320,  // West
            420, 280   // Northwest
        ]
    },
    antarctica: {
        name: 'Antarctica',
        color: EARTH_COLORS.antarctica,
        funFact: 'Antarctica is the coldest continent and is covered in ice! Penguins live here!',
        points: [
            200, 580,
            300, 570,
            400, 580,
            500, 570,
            600, 580,
            700, 570,
            700, 610,
            600, 620,
            500, 610,
            400, 620,
            300, 610,
            200, 620
        ]
    },
    asia: {
        name: 'Asia',
        color: EARTH_COLORS.asia,
        funFact: 'Asia is the biggest continent! More than half of all people in the world live here!',
        points: [
            550, 180,
            650, 190,
            720, 220,
            750, 280,
            720, 340,
            680, 360,
            620, 350,
            580, 320,
            560, 260,
            540, 220
        ]
    },
    australia: {
        name: 'Australia',
        color: EARTH_COLORS.australia,
        funFact: 'Australia is both a continent and a country! Kangaroos and koalas live here!',
        points: [
            700, 450,
            760, 460,
            780, 490,
            770, 520,
            740, 530,
            700, 520,
            680, 490
        ]
    },
    europe: {
        name: 'Europe',
        color: EARTH_COLORS.europe,
        funFact: 'Europe has more than 40 countries! The Eiffel Tower and Big Ben are here!',
        points: [
            460, 180,
            510, 190,
            530, 210,
            520, 250,
            480, 260,
            450, 240,
            440, 210
        ]
    },
    northAmerica: {
        name: 'North America',
        color: EARTH_COLORS.northAmerica,
        funFact: 'North America has the USA, Canada, and Mexico! The Grand Canyon is here!',
        points: [
            180, 160,
            280, 140,
            320, 180,
            330, 240,
            300, 300,
            260, 320,
            220, 300,
            180, 260,
            160, 220,
            170, 180
        ]
    },
    southAmerica: {
        name: 'South America',
        color: EARTH_COLORS.southAmerica,
        funFact: 'South America has the Amazon rainforest - the biggest rainforest in the world!',
        points: [
            280, 340,
            320, 350,
            340, 390,
            350, 450,
            330, 500,
            300, 520,
            270, 500,
            250, 450,
            260, 400,
            270, 360
        ]
    }
};

const OCEANS = {
    pacific: {
        name: 'Pacific Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Pacific Ocean is the biggest ocean! It covers almost half of Earth\'s water!',
        // Pacific is so large, we'll represent it in two areas (left and right of map)
        areas: [
            { // Right side Pacific
                points: [
                    790, 150,
                    880, 150,
                    880, 550,
                    790, 550,
                    800, 400,
                    810, 300,
                    800, 200
                ]
            },
            { // Left side Pacific
                points: [
                    20, 150,
                    150, 150,
                    140, 200,
                    130, 300,
                    140, 400,
                    150, 550,
                    20, 550
                ]
            }
        ]
    },
    atlantic: {
        name: 'Atlantic Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Atlantic Ocean is between Americas and Europe/Africa. The Titanic sank here!',
        areas: [
            {
                points: [
                    350, 180,
                    400, 200,
                    410, 280,
                    390, 360,
                    360, 420,
                    340, 500,
                    320, 530,
                    280, 540,
                    240, 520,
                    230, 480,
                    250, 420,
                    270, 350,
                    300, 290,
                    330, 230,
                    340, 190
                ]
            }
        ]
    },
    indian: {
        name: 'Indian Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Indian Ocean is the warmest ocean! Beautiful coral reefs are here!',
        areas: [
            {
                points: [
                    500, 350,
                    620, 360,
                    660, 390,
                    670, 440,
                    650, 500,
                    600, 530,
                    520, 540,
                    480, 520,
                    460, 460,
                    470, 400,
                    490, 360
                ]
            }
        ]
    },
    arctic: {
        name: 'Arctic Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Arctic Ocean is the smallest and coldest ocean! Polar bears live near here!',
        areas: [
            {
                points: [
                    150, 50,
                    750, 50,
                    750, 130,
                    650, 140,
                    550, 150,
                    450, 140,
                    350, 130,
                    250, 140,
                    150, 130
                ]
            }
        ]
    },
    southern: {
        name: 'Southern Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Southern Ocean surrounds Antarctica! It has very strong winds and waves!',
        areas: [
            {
                points: [
                    150, 550,
                    750, 550,
                    750, 560,
                    150, 560
                ]
            }
        ]
    }
};

// Game data
let gameData = {
    answered: {},
    currentDifficulty: 'mixed' // continents, oceans, mixed
};

function preload() {
    // No external assets needed - we'll draw everything
}

function create() {
    this.scene = this;
    showMainMenu(this);

    // Track game start
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
    mapObjects = {};

    // Background
    scene.add.rectangle(450, 325, 900, 650, EARTH_COLORS.background);

    // Title with Earth emoji
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

    // Decorative elements
    scene.add.text(250, 130, '🗺️', { fontSize: '40px' });
    scene.add.text(630, 130, '🌊', { fontSize: '40px' });

    // Level select buttons
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

    // Instructions
    const instructions = [
        '📍 Click on the map to answer',
        '✨ Learn all continents and oceans',
        '🎯 Get fun facts after each answer!'
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

    // Determine question pool
    let questionPool = [];
    if (difficulty === 'continents' || difficulty === 'mixed') {
        questionPool = questionPool.concat(Object.keys(CONTINENTS));
    }
    if (difficulty === 'oceans' || difficulty === 'mixed') {
        questionPool = questionPool.concat(Object.keys(OCEANS));
    }

    totalQuestions = questionPool.length;

    // Draw the world map
    drawWorldMap(scene);

    // Start first question
    nextQuestion(scene, questionPool);
}

// ==================== DRAW WORLD MAP ====================
function drawWorldMap(scene) {
    mapObjects = {};

    // Draw oceans first (background layer)
    Object.entries(OCEANS).forEach(([id, ocean]) => {
        ocean.areas.forEach((area, index) => {
            const polygon = scene.add.polygon(0, 0, area.points, ocean.color, 0.6);
            polygon.setOrigin(0);
            polygon.setInteractive(new Phaser.Geom.Polygon(area.points), Phaser.Geom.Polygon.Contains);

            const key = ocean.areas.length > 1 ? `${id}_${index}` : id;
            if (!mapObjects[id]) {
                mapObjects[id] = { polygons: [], text: null, type: 'ocean', data: ocean };
            }
            mapObjects[id].polygons.push(polygon);

            // Mouse events
            polygon.on('pointerover', () => {
                if (!gameData.answered[id]) {
                    polygon.setFillStyle(EARTH_COLORS.highlight, 0.4);
                }
            });

            polygon.on('pointerout', () => {
                if (!gameData.answered[id]) {
                    polygon.setFillStyle(ocean.color, 0.6);
                }
            });

            polygon.on('pointerdown', () => {
                handleMapClick(scene, id, 'ocean');
            });
        });
    });

    // Draw continents (foreground layer)
    Object.entries(CONTINENTS).forEach(([id, continent]) => {
        const polygon = scene.add.polygon(0, 0, continent.points, continent.color, 1);
        polygon.setOrigin(0);
        polygon.setStrokeStyle(2, 0x000000, 0.3);
        polygon.setInteractive(new Phaser.Geom.Polygon(continent.points), Phaser.Geom.Polygon.Contains);

        mapObjects[id] = { polygons: [polygon], text: null, type: 'continent', data: continent };

        // Mouse events
        polygon.on('pointerover', () => {
            if (!gameData.answered[id]) {
                polygon.setFillStyle(EARTH_COLORS.highlight, 0.8);
            }
        });

        polygon.on('pointerout', () => {
            if (!gameData.answered[id]) {
                polygon.setFillStyle(continent.color, 1);
            }
        });

        polygon.on('pointerdown', () => {
            handleMapClick(scene, id, 'continent');
        });
    });

    // Score display (top right)
    const scoreText = scene.add.text(800, 30, `Score: ${score}/${totalQuestions}`, {
        fontSize: '22px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    scoreText.setDepth(1000);
}

// ==================== NEXT QUESTION ====================
function nextQuestion(scene, questionPool) {
    // Remove already asked questions
    const remainingQuestions = questionPool.filter(q => !questionsAsked.includes(q));

    if (remainingQuestions.length === 0) {
        // Game over!
        showResults(scene);
        return;
    }

    // Pick random question
    const randomIndex = Phaser.Math.Between(0, remainingQuestions.length - 1);
    currentQuestion = remainingQuestions[randomIndex];
    questionsAsked.push(currentQuestion);

    // Get the name
    const data = CONTINENTS[currentQuestion] || OCEANS[currentQuestion];

    // Display question at top
    if (scene.questionText) scene.questionText.destroy();
    scene.questionText = scene.add.text(450, 30, `Click on: ${data.name}`, {
        fontSize: '32px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#2C5F7F',
        padding: { x: 20, y: 10 }
    }).setOrigin(0.5);
    scene.questionText.setDepth(1000);
}

// ==================== HANDLE MAP CLICK ====================
function handleMapClick(scene, clickedId, clickedType) {
    // Already answered?
    if (gameData.answered[clickedId]) {
        return;
    }

    // Check if correct
    if (clickedId === currentQuestion) {
        // CORRECT!
        handleCorrectAnswer(scene, clickedId);
    } else {
        // WRONG - shake animation
        const obj = mapObjects[clickedId];
        obj.polygons.forEach(polygon => {
            scene.tweens.add({
                targets: polygon,
                x: polygon.x + 5,
                duration: 50,
                yoyo: true,
                repeat: 3
            });
        });

        // Show feedback
        if (scene.feedbackText) scene.feedbackText.destroy();
        scene.feedbackText = scene.add.text(450, 90, '❌ Try again!', {
            fontSize: '28px',
            fill: '#FF6B6B',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        scene.feedbackText.setDepth(1000);

        scene.time.delayedCall(1000, () => {
            if (scene.feedbackText) scene.feedbackText.destroy();
        });
    }
}

// ==================== HANDLE CORRECT ANSWER ====================
function handleCorrectAnswer(scene, id) {
    score++;
    gameData.answered[id] = true;

    const data = CONTINENTS[id] || OCEANS[id];
    const obj = mapObjects[id];

    // Keep the color, add label
    const bounds = obj.polygons[0].getBounds();
    const labelText = scene.add.text(bounds.centerX, bounds.centerY, data.name, {
        fontSize: '18px',
        fill: '#000000',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#FFFFFF',
        padding: { x: 5, y: 3 }
    }).setOrigin(0.5);
    labelText.setDepth(500);
    obj.text = labelText;

    // Make polygons non-interactive
    obj.polygons.forEach(polygon => {
        polygon.disableInteractive();
        polygon.setAlpha(0.9);
    });

    // Update score
    if (scene.children.list.find(c => c.text && c.text.startsWith('Score:'))) {
        scene.children.list.find(c => c.text && c.text.startsWith('Score:')).setText(`Score: ${score}/${totalQuestions}`);
    }

    // Show fun fact
    showFunFact(scene, data.funFact, () => {
        // Next question
        nextQuestion(scene, Object.keys(gameData.currentDifficulty === 'continents' ? CONTINENTS :
                                        gameData.currentDifficulty === 'oceans' ? OCEANS :
                                        {...CONTINENTS, ...OCEANS}));
    });
}

// ==================== SHOW FUN FACT ====================
function showFunFact(scene, fact, onClose) {
    // Create modal overlay
    const overlay = scene.add.rectangle(450, 325, 900, 650, 0x000000, 0.7);
    overlay.setDepth(2000);
    overlay.setInteractive();

    // Modal background
    const modalBg = scene.add.rectangle(450, 325, 600, 300, 0xFFFFFF);
    modalBg.setDepth(2001);
    modalBg.setStrokeStyle(4, EARTH_COLORS.success);

    // Checkmark
    const check = scene.add.text(450, 230, '✓', {
        fontSize: '60px',
        fill: '#00D68F',
        fontFamily: 'Arial'
    }).setOrigin(0.5);
    check.setDepth(2002);

    // Fun fact text
    const factText = scene.add.text(450, 320, fact, {
        fontSize: '18px',
        fill: '#2C5F7F',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 550 }
    }).setOrigin(0.5);
    factText.setDepth(2002);

    // Continue button
    const continueBtn = scene.add.rectangle(450, 410, 200, 50, EARTH_COLORS.success);
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

    continueBtn.on('pointerover', () => {
        continueBtn.setAlpha(0.8);
    });

    continueBtn.on('pointerout', () => {
        continueBtn.setAlpha(1);
    });
}

// ==================== RESULTS SCREEN ====================
function showResults(scene) {
    scene.children.removeAll();
    currentScene = 'results';

    const percentage = (score / totalQuestions) * 100;
    const stars = percentage === 100 ? 3 : percentage >= 75 ? 2 : percentage >= 50 ? 1 : 0;

    // Background
    scene.add.rectangle(450, 325, 900, 650, EARTH_COLORS.background);

    // Title
    const title = percentage === 100 ? '🌟 Perfect Explorer!' :
                  percentage >= 75 ? '🎉 Great Job!' :
                  percentage >= 50 ? '👍 Good Try!' : '📚 Keep Learning!';

    scene.add.text(450, 100, title, {
        fontSize: '48px',
        fill: '#2C5F7F',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Score
    scene.add.text(450, 180, `You found ${score} out of ${totalQuestions}!`, {
        fontSize: '32px',
        fill: '#4A4A4A',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Stars
    const starDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    scene.add.text(450, 240, starDisplay, {
        fontSize: '56px'
    }).setOrigin(0.5);

    // Encouraging message
    let message = '';
    if (percentage === 100) {
        message = 'You know Earth perfectly! 🌍';
    } else if (percentage >= 75) {
        message = 'You\'re becoming a geography expert!';
    } else if (percentage >= 50) {
        message = 'Keep exploring to learn more!';
    } else {
        message = 'Practice makes perfect! Try again!';
    }

    scene.add.text(450, 320, message, {
        fontSize: '22px',
        fill: '#4A4A4A',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);

    // Buttons
    createButton(scene, 300, 420, '🔄 Play Again', EARTH_COLORS.success, () => {
        showMainMenu(scene);
    }, 220, 60);

    createButton(scene, 600, 420, '← Main Menu', EARTH_COLORS.primary, () => {
        showMainMenu(scene);
    }, 220, 60);

    // Track completion
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

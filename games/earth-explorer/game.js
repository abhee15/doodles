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
let currentLevel = 1;
let questionsAsked = [];
let currentQuestion = null;
let score = 0;
let totalQuestions = 0;
let mapObjects = {};
let scoreText = null;
let questionText = null;

// Geographic data with IMPROVED polygon coordinates
// More realistic continent shapes!
const CONTINENTS = {
    africa: {
        name: 'Africa',
        color: EARTH_COLORS.africa,
        funFact: 'Africa has the world\'s largest desert (Sahara) and is home to amazing animals like lions and elephants!',
        points: [
            485, 220,  // North (Mediterranean)
            495, 235,  // Northeast
            510, 250,  // Horn of Africa
            515, 280,  // East coast
            515, 320,  // East Africa
            510, 360,  // Madagascar area
            500, 400,  // Southeast
            480, 425,  // South tip
            455, 420,  // Southwest
            440, 400,  // West coast south
            430, 360,  // West coast middle
            425, 320,  // West coast north
            430, 280,  // West bulge
            440, 250,  // Northwest
            460, 230   // Back to north
        ]
    },
    antarctica: {
        name: 'Antarctica',
        color: EARTH_COLORS.antarctica,
        funFact: 'Antarctica is the coldest continent and is covered in ice! Penguins live here!',
        points: [
            150, 580,
            250, 575,
            350, 580,
            450, 575,
            550, 580,
            650, 575,
            750, 580,
            750, 615,
            650, 620,
            550, 615,
            450, 620,
            350, 615,
            250, 620,
            150, 615
        ]
    },
    asia: {
        name: 'Asia',
        color: EARTH_COLORS.asia,
        funFact: 'Asia is the biggest continent! More than half of all people in the world live here!',
        points: [
            530, 160,  // Arctic Russia
            580, 155,  // Siberia
            650, 165,  // Eastern Siberia
            710, 180,  // Far East Russia
            760, 200,  // Kamchatka
            780, 230,  // Japan area
            785, 270,  // Korea/China
            780, 310,  // Southeast coast
            760, 340,  // Vietnam area
            730, 360,  // Malaysia
            700, 365,  // Indonesia
            670, 360,  // Indonesia west
            640, 340,  // Indian Ocean
            610, 320,  // India east
            590, 300,  // India
            575, 280,  // India west
            565, 260,  // Pakistan
            555, 240,  // Afghanistan
            545, 220,  // Central Asia
            540, 200,  // Kazakhstan
            535, 180   // Back to Arctic
        ]
    },
    australia: {
        name: 'Australia',
        color: EARTH_COLORS.australia,
        funFact: 'Australia is both a continent and a country! Kangaroos and koalas live here!',
        points: [
            685, 430,  // North coast
            720, 435,  // Northeast
            755, 450,  // East coast
            775, 475,  // Southeast
            780, 500,  // South coast east
            770, 520,  // South coast
            740, 530,  // South coast west
            705, 525,  // Southwest
            680, 510,  // West coast south
            665, 485,  // West coast
            670, 455   // Northwest
        ]
    },
    europe: {
        name: 'Europe',
        color: EARTH_COLORS.europe,
        funFact: 'Europe has more than 40 countries! The Eiffel Tower and Big Ben are here!',
        points: [
            465, 155,  // Scandinavia north
            485, 160,  // Northern Europe
            510, 170,  // Russia west
            525, 185,  // Russia
            520, 210,  // Eastern Europe
            510, 235,  // Black Sea
            490, 245,  // Greece/Turkey
            470, 245,  // Italy
            455, 235,  // Western Mediterranean
            445, 220,  // Spain
            440, 205,  // France
            445, 185,  // British Isles
            455, 170   // Back to Scandinavia
        ]
    },
    northAmerica: {
        name: 'North America',
        color: EARTH_COLORS.northAmerica,
        funFact: 'North America has the USA, Canada, and Mexico! The Grand Canyon is here!',
        points: [
            150, 165,  // Alaska
            180, 155,  // Northwest Canada
            220, 150,  // North Canada
            260, 155,  // Northeast Canada
            290, 165,  // Greenland area
            310, 185,  // East coast north
            320, 215,  // East coast
            325, 250,  // Florida area
            315, 280,  // Gulf coast
            295, 295,  // Mexico
            270, 305,  // Central America
            250, 310,  // Central America south
            230, 305,  // Pacific coast south
            210, 290,  // Pacific coast
            190, 270,  // California
            175, 245,  // Northwest coast
            165, 220,  // Pacific Northwest
            155, 195,  // Alaska coast
            145, 175   // Back to Alaska
        ]
    },
    southAmerica: {
        name: 'South America',
        color: EARTH_COLORS.southAmerica,
        funFact: 'South America has the Amazon rainforest - the biggest rainforest in the world!',
        points: [
            265, 315,  // Colombia/Panama
            285, 325,  // Venezuela
            310, 340,  // Brazil north
            325, 365,  // Brazil east
            330, 400,  // Brazil east bulge
            335, 435,  // Brazil south
            340, 470,  // Uruguay
            335, 500,  // Argentina north
            320, 530,  // Argentina south
            295, 545,  // Argentina tip
            275, 535,  // Chile south
            260, 510,  // Chile middle
            255, 475,  // Chile north
            250, 435,  // Peru
            255, 395,  // Ecuador
            260, 360,  // Colombia
            265, 330   // Back to north
        ]
    }
};

// Simplified ocean areas (larger regions)
const OCEANS = {
    pacific: {
        name: 'Pacific Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Pacific Ocean is the biggest ocean! It covers almost half of Earth\'s water!',
        isOcean: true
    },
    atlantic: {
        name: 'Atlantic Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Atlantic Ocean is between Americas and Europe/Africa. The Titanic sank here!',
        isOcean: true
    },
    indian: {
        name: 'Indian Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Indian Ocean is the warmest ocean! Beautiful coral reefs are here!',
        isOcean: true
    },
    arctic: {
        name: 'Arctic Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Arctic Ocean is the smallest and coldest ocean! Polar bears live near here!',
        isOcean: true
    },
    southern: {
        name: 'Southern Ocean',
        color: EARTH_COLORS.ocean,
        funFact: 'The Southern Ocean surrounds Antarctica! It has very strong winds and waves!',
        isOcean: true
    }
};

// Game data
let gameData = {
    answered: {},
    currentDifficulty: 'mixed'
};

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
    mapObjects = {};

    scene.add.rectangle(450, 325, 900, 650, EARTH_COLORS.background);

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

    let questionPool = [];
    if (difficulty === 'continents' || difficulty === 'mixed') {
        questionPool = questionPool.concat(Object.keys(CONTINENTS));
    }
    if (difficulty === 'oceans' || difficulty === 'mixed') {
        questionPool = questionPool.concat(Object.keys(OCEANS));
    }

    totalQuestions = questionPool.length;

    drawWorldMap(scene);
    nextQuestion(scene, questionPool);
}

// ==================== DRAW WORLD MAP ====================
function drawWorldMap(scene) {
    mapObjects = {};

    // Ocean background - full canvas
    scene.add.rectangle(450, 325, 900, 650, EARTH_COLORS.ocean, 0.3);

    // Draw clickable ocean buttons (simplified approach)
    if (gameData.currentDifficulty === 'oceans' || gameData.currentDifficulty === 'mixed') {
        // Pacific - left and right sides
        const pacificLeft = scene.add.rectangle(60, 325, 100, 500, EARTH_COLORS.ocean, 0);
        pacificLeft.setStrokeStyle(3, 0xFFFFFF, 0.5);
        pacificLeft.setInteractive({ useHandCursor: true });

        const pacificRight = scene.add.rectangle(840, 325, 100, 500, EARTH_COLORS.ocean, 0);
        pacificRight.setStrokeStyle(3, 0xFFFFFF, 0.5);
        pacificRight.setInteractive({ useHandCursor: true });

        const pacificLabel = scene.add.text(60, 100, 'Pacific\nOcean', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        mapObjects['pacific'] = {
            polygons: [pacificLeft, pacificRight],
            text: null,
            type: 'ocean',
            data: OCEANS.pacific,
            label: pacificLabel
        };

        [pacificLeft, pacificRight].forEach(rect => {
            rect.on('pointerover', () => {
                if (!gameData.answered['pacific']) {
                    rect.setFillStyle(EARTH_COLORS.highlight, 0.3);
                }
            });
            rect.on('pointerout', () => {
                if (!gameData.answered['pacific']) {
                    rect.setFillStyle(EARTH_COLORS.ocean, 0);
                }
            });
            rect.on('pointerdown', () => handleMapClick(scene, 'pacific'));
        });

        // Atlantic - between Americas and Europe/Africa
        const atlantic = scene.add.rectangle(375, 300, 120, 350, EARTH_COLORS.ocean, 0);
        atlantic.setStrokeStyle(3, 0xFFFFFF, 0.5);
        atlantic.setInteractive({ useHandCursor: true });

        const atlanticLabel = scene.add.text(375, 180, 'Atlantic\nOcean', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        mapObjects['atlantic'] = {
            polygons: [atlantic],
            text: null,
            type: 'ocean',
            data: OCEANS.atlantic,
            label: atlanticLabel
        };

        atlantic.on('pointerover', () => {
            if (!gameData.answered['atlantic']) atlantic.setFillStyle(EARTH_COLORS.highlight, 0.3);
        });
        atlantic.on('pointerout', () => {
            if (!gameData.answered['atlantic']) atlantic.setFillStyle(EARTH_COLORS.ocean, 0);
        });
        atlantic.on('pointerdown', () => handleMapClick(scene, 'atlantic'));

        // Indian - below Asia
        const indian = scene.add.rectangle(625, 425, 150, 150, EARTH_COLORS.ocean, 0);
        indian.setStrokeStyle(3, 0xFFFFFF, 0.5);
        indian.setInteractive({ useHandCursor: true });

        const indianLabel = scene.add.text(625, 425, 'Indian\nOcean', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        mapObjects['indian'] = {
            polygons: [indian],
            text: null,
            type: 'ocean',
            data: OCEANS.indian,
            label: indianLabel
        };

        indian.on('pointerover', () => {
            if (!gameData.answered['indian']) indian.setFillStyle(EARTH_COLORS.highlight, 0.3);
        });
        indian.on('pointerout', () => {
            if (!gameData.answered['indian']) indian.setFillStyle(EARTH_COLORS.ocean, 0);
        });
        indian.on('pointerdown', () => handleMapClick(scene, 'indian'));

        // Arctic - top
        const arctic = scene.add.rectangle(450, 100, 700, 60, EARTH_COLORS.ocean, 0);
        arctic.setStrokeStyle(3, 0xFFFFFF, 0.5);
        arctic.setInteractive({ useHandCursor: true });

        const arcticLabel = scene.add.text(450, 70, 'Arctic Ocean', {
            fontSize: '14px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        mapObjects['arctic'] = {
            polygons: [arctic],
            text: null,
            type: 'ocean',
            data: OCEANS.arctic,
            label: arcticLabel
        };

        arctic.on('pointerover', () => {
            if (!gameData.answered['arctic']) arctic.setFillStyle(EARTH_COLORS.highlight, 0.3);
        });
        arctic.on('pointerout', () => {
            if (!gameData.answered['arctic']) arctic.setFillStyle(EARTH_COLORS.ocean, 0);
        });
        arctic.on('pointerdown', () => handleMapClick(scene, 'arctic'));

        // Southern - bottom
        const southern = scene.add.rectangle(450, 565, 700, 40, EARTH_COLORS.ocean, 0);
        southern.setStrokeStyle(3, 0xFFFFFF, 0.5);
        southern.setInteractive({ useHandCursor: true });

        const southernLabel = scene.add.text(450, 545, 'Southern Ocean', {
            fontSize: '14px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        mapObjects['southern'] = {
            polygons: [southern],
            text: null,
            type: 'ocean',
            data: OCEANS.southern,
            label: southernLabel
        };

        southern.on('pointerover', () => {
            if (!gameData.answered['southern']) southern.setFillStyle(EARTH_COLORS.highlight, 0.3);
        });
        southern.on('pointerout', () => {
            if (!gameData.answered['southern']) southern.setFillStyle(EARTH_COLORS.ocean, 0);
        });
        southern.on('pointerdown', () => handleMapClick(scene, 'southern'));
    }

    // Draw continents
    Object.entries(CONTINENTS).forEach(([id, continent]) => {
        const polygon = scene.add.polygon(0, 0, continent.points, continent.color, 1);
        polygon.setOrigin(0);
        polygon.setStrokeStyle(2, 0x000000, 0.4);
        polygon.setInteractive(new Phaser.Geom.Polygon(continent.points), Phaser.Geom.Polygon.Contains);

        mapObjects[id] = {
            polygons: [polygon],
            text: null,
            type: 'continent',
            data: continent
        };

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

        polygon.on('pointerdown', () => handleMapClick(scene, id));
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
function handleMapClick(scene, clickedId) {
    if (gameData.answered[clickedId]) return;

    if (clickedId === currentQuestion) {
        handleCorrectAnswer(scene, clickedId);
    } else {
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
function handleCorrectAnswer(scene, id) {
    score++;
    gameData.answered[id] = true;

    const data = CONTINENTS[id] || OCEANS[id];
    const obj = mapObjects[id];

    // Add label and keep region visible
    const bounds = obj.polygons[0].getBounds();
    const labelText = scene.add.text(bounds.centerX, bounds.centerY, data.name, {
        fontSize: '16px',
        fill: '#000000',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#FFFFFF',
        padding: { x: 8, y: 4 }
    }).setOrigin(0.5);
    labelText.setDepth(1500); // Higher depth to stay on top
    obj.text = labelText;

    // Hide ocean label if it exists
    if (obj.label) {
        obj.label.setVisible(false);
    }

    // Make non-interactive
    obj.polygons.forEach(polygon => {
        polygon.disableInteractive();
        if (data.isOcean) {
            polygon.setFillStyle(EARTH_COLORS.ocean, 0.6);
        }
    });

    // Update score
    if (scoreText) {
        scoreText.setText(`Score: ${score}/${totalQuestions}`);
    }

    // Show fun fact
    showFunFact(scene, data.funFact, () => {
        const questionPool = Object.keys(
            gameData.currentDifficulty === 'continents' ? CONTINENTS :
            gameData.currentDifficulty === 'oceans' ? OCEANS :
            {...CONTINENTS, ...OCEANS}
        );
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
    modalBg.setStrokeStyle(4, EARTH_COLORS.success);

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

    continueBtn.on('pointerover', () => continueBtn.setAlpha(0.8));
    continueBtn.on('pointerout', () => continueBtn.setAlpha(1));
}

// ==================== RESULTS SCREEN ====================
function showResults(scene) {
    scene.children.removeAll();
    currentScene = 'results';

    const percentage = (score / totalQuestions) * 100;
    const stars = percentage === 100 ? 3 : percentage >= 75 ? 2 : percentage >= 50 ? 1 : 0;

    scene.add.rectangle(450, 325, 900, 650, EARTH_COLORS.background);

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

    createButton(scene, 300, 420, '🔄 Play Again', EARTH_COLORS.success, () => {
        showMainMenu(scene);
    }, 220, 60);

    createButton(scene, 600, 420, '← Main Menu', EARTH_COLORS.primary, () => {
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

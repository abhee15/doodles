// Word Explorer - Vocabulary Learning Game
// Educational game for 4th graders to improve vocabulary, pronunciation, and comprehension

// ==================== CONFIGURATION ====================
const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: COLORS.neutral.lightBgAlt.phaser,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

const game = new Phaser.Game(config);

// Color Palette - Map to design system
const WORD_COLORS = {
    primary: COLORS.primary.phaser,
    secondary: COLORS.warning.phaser,
    success: COLORS.success.phaser,
    error: COLORS.error.phaser,
    background: COLORS.neutral.lightBgAlt.phaser,
    cardBg: COLORS.neutral.white.phaser,
    text: COLORS.neutral.darkText.phaser,
    textLight: COLORS.neutral.mediumText.phaser,
    accent: COLORS.info.phaser,
    // Difficulty colors
    difficulty1: COLORS.success.phaser,  // Green - Easy
    difficulty2: COLORS.warning.phaser,  // Yellow - Medium
    difficulty3: COLORS.error.phaser,    // Red - Hard
    // Category colors
    emotion: 0xFF6B9D,      // Pink - custom
    size: 0x6C5CE7,         // Purple - custom
    time: 0xFF9F43,         // Orange - custom
    action: COLORS.success.phaser,       // Green
    concept: 0x0984E3       // Blue - custom
};

// Category icons and labels
const CATEGORY_INFO = {
    emotion: { icon: '💭', label: 'Emotion', color: WORD_COLORS.emotion },
    size: { icon: '📏', label: 'Size', color: WORD_COLORS.size },
    time: { icon: '⏰', label: 'Time', color: WORD_COLORS.time },
    action: { icon: '⚡', label: 'Action', color: WORD_COLORS.action },
    concept: { icon: '💡', label: 'Concept', color: WORD_COLORS.concept }
};

// ==================== WORD DATABASE ====================
const WORD_DATABASE = {
    easy: [
        {
            id: 1,
            word: "curious",
            definition: "Wanting to know or learn about something",
            synonyms: ["interested", "inquisitive"],
            antonyms: ["uninterested"],
            exampleSentence: "The curious cat explored every corner of the house.",
            phonetic: "KYUR-ee-us",
            category: "emotion",
            difficulty: 1
        },
        {
            id: 2,
            word: "enormous",
            definition: "Very large in size or amount",
            synonyms: ["huge", "gigantic", "massive"],
            antonyms: ["tiny", "small"],
            exampleSentence: "The enormous elephant walked slowly through the forest.",
            phonetic: "ih-NOR-mus",
            category: "size",
            difficulty: 1
        },
        {
            id: 3,
            word: "ancient",
            definition: "Very old, from a long time ago",
            synonyms: ["old", "historical"],
            antonyms: ["modern", "new"],
            exampleSentence: "We visited the ancient pyramids in Egypt.",
            phonetic: "AYN-shunt",
            category: "time",
            difficulty: 1
        },
        {
            id: 4,
            word: "observe",
            definition: "To watch something carefully",
            synonyms: ["watch", "notice", "see"],
            antonyms: ["ignore"],
            exampleSentence: "Scientists observe animals to learn about their behavior.",
            phonetic: "ub-ZURV",
            category: "action",
            difficulty: 1
        },
        {
            id: 5,
            word: "conclusion",
            definition: "The end or final decision about something",
            synonyms: ["ending", "result"],
            antonyms: ["beginning"],
            exampleSentence: "After reading all the clues, she reached a conclusion.",
            phonetic: "kun-KLOO-zhun",
            category: "concept",
            difficulty: 2
        },
        {
            id: 6,
            word: "evidence",
            definition: "Facts or signs that show something is true",
            synonyms: ["proof", "clues"],
            antonyms: [],
            exampleSentence: "The detective found evidence at the crime scene.",
            phonetic: "EV-ih-dents",
            category: "concept",
            difficulty: 2
        },
        {
            id: 7,
            word: "persuade",
            definition: "To convince someone to do or believe something",
            synonyms: ["convince", "influence"],
            antonyms: ["discourage"],
            exampleSentence: "She tried to persuade her friend to join the team.",
            phonetic: "per-SWAYD",
            category: "action",
            difficulty: 2
        },
        {
            id: 8,
            word: "fortunate",
            definition: "Lucky or having good things happen",
            synonyms: ["lucky", "blessed"],
            antonyms: ["unlucky", "unfortunate"],
            exampleSentence: "We were fortunate to find a parking spot right away.",
            phonetic: "FOR-chuh-nit",
            category: "emotion",
            difficulty: 1
        },
        {
            id: 9,
            word: "courage",
            definition: "Bravery in facing something difficult or scary",
            synonyms: ["bravery", "boldness"],
            antonyms: ["fear", "cowardice"],
            exampleSentence: "It took courage for him to speak in front of the class.",
            phonetic: "KUR-ij",
            category: "trait",
            difficulty: 1
        },
        {
            id: 10,
            word: "brief",
            definition: "Short in time or length",
            synonyms: ["short", "quick"],
            antonyms: ["long", "lengthy"],
            exampleSentence: "The teacher gave us a brief explanation of the project.",
            phonetic: "BREEF",
            category: "time",
            difficulty: 1
        },
        {
            id: 11,
            word: "compassion",
            definition: "Caring about others who are suffering or in need",
            synonyms: ["kindness", "sympathy"],
            antonyms: ["cruelty"],
            exampleSentence: "She showed compassion by helping the injured bird.",
            phonetic: "kum-PASH-un",
            category: "trait",
            difficulty: 2
        },
        {
            id: 12,
            word: "cautious",
            definition: "Being careful to avoid danger or mistakes",
            synonyms: ["careful", "wary"],
            antonyms: ["careless", "reckless"],
            exampleSentence: "Be cautious when crossing the busy street.",
            phonetic: "KAW-shus",
            category: "trait",
            difficulty: 1
        },
        {
            id: 13,
            word: "creative",
            definition: "Using imagination to make new things",
            synonyms: ["imaginative", "artistic"],
            antonyms: ["uncreative"],
            exampleSentence: "The creative artist painted a beautiful picture.",
            phonetic: "kree-AY-tiv",
            category: "trait",
            difficulty: 1
        },
        {
            id: 14,
            word: "ambitious",
            definition: "Having a strong desire to succeed or achieve goals",
            synonyms: ["driven", "determined"],
            antonyms: ["lazy", "unmotivated"],
            exampleSentence: "The ambitious student wanted to become a doctor.",
            phonetic: "am-BISH-us",
            category: "trait",
            difficulty: 2
        },
        {
            id: 15,
            word: "patient",
            definition: "Able to wait calmly without getting upset",
            synonyms: ["calm", "tolerant"],
            antonyms: ["impatient"],
            exampleSentence: "The patient teacher explained the math problem again.",
            phonetic: "PAY-shunt",
            category: "trait",
            difficulty: 1
        },
        {
            id: 16,
            word: "generous",
            definition: "Willing to give and share with others",
            synonyms: ["giving", "kind"],
            antonyms: ["selfish", "stingy"],
            exampleSentence: "The generous neighbor shared cookies with everyone.",
            phonetic: "JEN-er-us",
            category: "trait",
            difficulty: 1
        },
        {
            id: 17,
            word: "confident",
            definition: "Believing in yourself and your abilities",
            synonyms: ["self-assured", "sure"],
            antonyms: ["insecure", "doubtful"],
            exampleSentence: "She felt confident before taking the test.",
            phonetic: "KON-fih-dent",
            category: "emotion",
            difficulty: 1
        },
        {
            id: 18,
            word: "responsible",
            definition: "Being trusted to do what you should do",
            synonyms: ["reliable", "dependable"],
            antonyms: ["irresponsible"],
            exampleSentence: "A responsible student always does their homework.",
            phonetic: "rih-SPON-sih-bul",
            category: "trait",
            difficulty: 2
        },
        {
            id: 19,
            word: "thoughtful",
            definition: "Thinking about others and their feelings",
            synonyms: ["considerate", "caring"],
            antonyms: ["thoughtless", "inconsiderate"],
            exampleSentence: "It was thoughtful of you to remember my birthday.",
            phonetic: "THAWT-ful",
            category: "trait",
            difficulty: 1
        },
        {
            id: 20,
            word: "determined",
            definition: "Having made a firm decision to do something",
            synonyms: ["resolved", "committed"],
            antonyms: ["uncertain", "hesitant"],
            exampleSentence: "The determined athlete practiced every single day.",
            phonetic: "dih-TUR-mind",
            category: "trait",
            difficulty: 2
        }
    ]
};

// ==================== GAME STATE ====================
let currentScene = 'menu';
let currentWord = null;
let currentMode = null;
let wordProgress = {};
let currentQuestions = [];
let currentQuestionIndex = 0;
let sessionScore = 0;
let userAnswer = '';
let selectedLetters = [];

// ==================== PHASER LIFECYCLE ====================
function preload() {
    // No external assets needed
}

function create() {
    this.scene = this;
    loadProgress();
    showMainMenu(this);

    // Track game start
    if (window.gameAnalytics) {
        window.gameAnalytics.trackGameStart('word-explorer');
    }
}

function update() {
    // Game loop
}

// ==================== SCENE 1: MAIN MENU ====================
function showMainMenu(scene) {
    scene.children.removeAll();
    currentScene = 'menu';

    // Background gradient effect
    const bg = scene.add.rectangle(450, 325, 900, 650, 0xF5F7FA);

    // Title
    scene.add.text(450, 100, '📖 Word Explorer', {
        fontSize: '56px',
        fill: '#4F46E5',
        fontStyle: 'bold',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    scene.add.text(450, 160, 'Build Your Vocabulary!', {
        fontSize: '24px',
        fill: '#636E72',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Progress summary
    const masteredWords = Object.values(wordProgress).filter(p => p.stars >= 2).length;
    const totalWords = WORD_DATABASE.easy.length;

    scene.add.text(450, 220, `${masteredWords}/${totalWords} words mastered`, {
        fontSize: '20px',
        fill: '#00D68F',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Start button
    createButton(scene, 450, 300, 'Start Learning', WORD_COLORS.primary, () => {
        showWordMap(scene);
    }, 280, 70);

    // Instructions
    const instructions = [
        '📚 Learn 20 new vocabulary words',
        '🎮 Play fun mini-games to practice',
        '⭐ Earn stars for mastery'
    ];

    instructions.forEach((text, i) => {
        scene.add.text(450, 400 + (i * 45), text, {
            fontSize: '18px',
            fill: '#1E293B',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    });
}

// ==================== SCENE 2: WORD MAP ====================
function showWordMap(scene) {
    scene.children.removeAll();
    currentScene = 'word-map';

    // Title
    scene.add.text(450, 30, 'Choose a Word to Learn', {
        fontSize: '36px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Progress counter
    const words = WORD_DATABASE.easy;
    const learnedCount = Object.keys(wordProgress).filter(id => wordProgress[id].stars > 0).length;
    const totalWords = words.length;

    const progressBg = scene.add.rectangle(450, 70, 350, 40, 0xFFFFFF);
    progressBg.setStrokeStyle(2, 0xE9ECEF);

    scene.add.text(450, 70, `Words Mastered: ${learnedCount}/${totalWords} 📚`, {
        fontSize: '18px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Legend - Category colors
    const legendY = 70;
    const categories = ['emotion', 'action', 'size', 'time', 'concept'];

    scene.add.text(700, legendY - 20, 'Categories:', {
        fontSize: '14px',
        fill: '#475569',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    });

    categories.slice(0, 3).forEach((cat, i) => {
        const info = CATEGORY_INFO[cat];
        const x = 700 + i * 65;

        scene.add.text(x, legendY, `${info.icon}`, {
            fontSize: '16px'
        });

        scene.add.text(x + 20, legendY, info.label, {
            fontSize: '11px',
            fill: '#475569',
            fontFamily: 'Arial'
        });
    });

    // Word grid (4x5 = 20 words)
    const cols = 5;
    const rows = 4;
    const cardWidth = 165;
    const cardHeight = 120;
    const startX = 85;
    const startY = 110;
    const spacingX = 175;
    const spacingY = 130;

    words.forEach((wordData, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = startX + col * spacingX;
        const y = startY + row * spacingY;

        createWordCard(scene, x, y, wordData, cardWidth, cardHeight);
    });

    // Back button
    createButton(scene, 100, 605, '← Menu', WORD_COLORS.textLight, () => {
        showMainMenu(scene);
    }, 140, 50);
}

function createWordCard(scene, x, y, wordData, width, height) {
    const progress = wordProgress[wordData.id] || { stars: 0, attempts: 0 };
    const categoryInfo = CATEGORY_INFO[wordData.category];
    const difficultyColor = wordData.difficulty === 1 ? WORD_COLORS.difficulty1 :
                           wordData.difficulty === 2 ? WORD_COLORS.difficulty2 : WORD_COLORS.difficulty3;

    // Card shadow
    const shadow = scene.add.rectangle(x, y + 3, width, height, 0x000000, 0.1);

    // Card background
    const card = scene.add.rectangle(x, y, width, height, WORD_COLORS.cardBg);
    card.setStrokeStyle(3, progress.stars > 0 ? WORD_COLORS.success : categoryInfo.color);
    card.setInteractive({ useHandCursor: true });

    // Difficulty indicator (left accent bar) - make it wider and properly positioned
    const accentBar = scene.add.rectangle(x - width/2 + 4, y, 8, height - 2, difficultyColor);
    accentBar.setOrigin(0.5);

    // Category icon (top right)
    const categoryIcon = scene.add.text(x + width/2 - 20, y - height/2 + 15, categoryInfo.icon, {
        fontSize: '20px'
    }).setOrigin(0.5);

    // Word text
    const wordText = scene.add.text(x, y - 25, wordData.word, {
        fontSize: '18px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: width - 20 }
    }).setOrigin(0.5);

    // Phonetic
    const phoneticText = scene.add.text(x, y, wordData.phonetic, {
        fontSize: '14px',
        fill: '#475569',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);

    // Stars
    const starsText = getStarDisplay(progress.stars);
    const stars = scene.add.text(x, y + 30, starsText, {
        fontSize: '18px',
        fill: '#FFB800'
    }).setOrigin(0.5);

    // Mastered badge
    if (progress.stars === 3) {
        scene.add.text(x + width/2 - 15, y + height/2 - 15, '✓', {
            fontSize: '20px',
            fill: '#00D68F',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }

    // Hover tooltip variables
    let tooltip = null;
    let tooltipBg = null;
    let categoryLabel = null;

    card.on('pointerover', () => {
        card.setScale(1.05);
        shadow.setScale(1.05);
        accentBar.setScale(1.05);

        // Create tooltip
        const tooltipWidth = 200;
        const tooltipHeight = 80;
        const tooltipX = x > 450 ? x - tooltipWidth/2 - 100 : x + tooltipWidth/2 + 100;
        const tooltipY = y;

        tooltipBg = scene.add.rectangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 0x1E293B, 0.95);
        tooltipBg.setStrokeStyle(2, categoryInfo.color);
        tooltipBg.setDepth(100);

        tooltip = scene.add.text(tooltipX, tooltipY + 10, wordData.definition, {
            fontSize: '13px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: tooltipWidth - 20 },
            lineSpacing: 4
        }).setOrigin(0.5).setDepth(101);

        // Category label
        categoryLabel = scene.add.text(tooltipX, tooltipY - tooltipHeight/2 + 15,
            `${categoryInfo.icon} ${categoryInfo.label}`, {
            fontSize: '11px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(101);
    });

    card.on('pointerout', () => {
        card.setScale(1);
        shadow.setScale(1);
        accentBar.setScale(1);

        // Remove tooltip
        if (tooltip) {
            tooltip.destroy();
            tooltipBg.destroy();
            categoryLabel.destroy();
            tooltip = null;
            tooltipBg = null;
            categoryLabel = null;
        }
    });

    // Click handler
    card.on('pointerdown', () => {
        // Clean up tooltip before transitioning
        if (tooltip) {
            tooltip.destroy();
            tooltipBg.destroy();
            categoryLabel.destroy();
        }
        currentWord = wordData;
        showWordDetail(scene);
    });
}

// ==================== SCENE 3: WORD DETAIL ====================
function showWordDetail(scene) {
    scene.children.removeAll();
    currentScene = 'word-detail';

    const progress = wordProgress[currentWord.id] || { stars: 0, attempts: 0 };

    // Title
    scene.add.text(450, 60, currentWord.word, {
        fontSize: '48px',
        fill: '#4F46E5',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Phonetic
    scene.add.text(450, 115, `(${currentWord.phonetic})`, {
        fontSize: '20px',
        fill: '#636E72',
        fontFamily: 'Arial',
        fontStyle: 'italic'
    }).setOrigin(0.5);

    // Definition box
    const defBox = scene.add.rectangle(450, 200, 800, 100, 0xFFFFFF);
    defBox.setStrokeStyle(2, 0xE9ECEF);

    scene.add.text(450, 200, currentWord.definition, {
        fontSize: '20px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 750 }
    }).setOrigin(0.5);

    // Example sentence
    scene.add.text(450, 280, 'Example:', {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 310, currentWord.exampleSentence, {
        fontSize: '18px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        align: 'center',
        fontStyle: 'italic',
        wordWrap: { width: 750 }
    }).setOrigin(0.5);

    // Stars earned
    const starsText = getStarDisplay(progress.stars);
    scene.add.text(450, 370, `Your Progress: ${starsText}`, {
        fontSize: '24px',
        fill: '#FFB800',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Mode selection
    scene.add.text(450, 420, 'Choose a Game Mode:', {
        fontSize: '20px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Mode buttons
    createButton(scene, 200, 500, '🎯 Meaning Match', WORD_COLORS.primary, () => {
        currentMode = 'meaning-match';
        showMeaningMatch(scene);
    }, 220, 60);

    createButton(scene, 450, 500, '📝 Sentence Builder', WORD_COLORS.accent, () => {
        currentMode = 'sentence-builder';
        showSentenceBuilder(scene);
    }, 220, 60);

    createButton(scene, 700, 500, '✏️ Spelling Quest', WORD_COLORS.success, () => {
        currentMode = 'spelling-quest';
        showSpellingQuest(scene);
    }, 220, 60);

    // Back button
    createButton(scene, 100, 600, '← Back', WORD_COLORS.textLight, () => {
        showWordMap(scene);
    }, 140, 50);
}

// ==================== SCENE 4: MEANING MATCH ====================
function showMeaningMatch(scene) {
    scene.children.removeAll();
    currentScene = 'meaning-match';

    sessionScore = 0;
    currentQuestionIndex = 0;
    currentQuestions = generateMeaningMatchQuestions();

    displayMeaningMatchQuestion(scene);
}

function generateMeaningMatchQuestions() {
    const questions = [];
    const allWords = WORD_DATABASE.easy;
    const totalQuestions = 5;

    for (let i = 0; i < totalQuestions; i++) {
        // Select a random word (prioritize current word for first question)
        const questionWord = i === 0 ? currentWord : allWords[Phaser.Math.Between(0, allWords.length - 1)];

        // Get 3 wrong definitions from other words
        const wrongOptions = allWords
            .filter(w => w.id !== questionWord.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.definition);

        // Combine and shuffle
        const options = [questionWord.definition, ...wrongOptions]
            .sort(() => Math.random() - 0.5);

        questions.push({
            word: questionWord.word,
            phonetic: questionWord.phonetic,
            correctAnswer: questionWord.definition,
            options: options
        });
    }

    return questions;
}

function displayMeaningMatchQuestion(scene) {
    scene.children.removeAll();

    if (currentQuestionIndex >= currentQuestions.length) {
        showResults(scene);
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    // Header
    scene.add.text(450, 40, '🎯 Meaning Match', {
        fontSize: '32px',
        fill: '#4F46E5',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Progress
    scene.add.text(450, 85, `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`, {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Score
    scene.add.text(750, 40, `Score: ${sessionScore}/${currentQuestions.length}`, {
        fontSize: '20px',
        fill: '#00D68F',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Word
    scene.add.text(450, 150, question.word, {
        fontSize: '42px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 195, `(${question.phonetic})`, {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial',
        fontStyle: 'italic'
    }).setOrigin(0.5);

    scene.add.text(450, 240, 'Which definition matches this word?', {
        fontSize: '20px',
        fill: '#1E293B',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Options
    question.options.forEach((option, index) => {
        const y = 310 + index * 75;
        createDefinitionOption(scene, 450, y, option, option === question.correctAnswer, question);
    });

    // Back button
    createButton(scene, 100, 600, '← Back', WORD_COLORS.textLight, () => {
        showWordDetail(scene);
    }, 140, 50);
}

function createDefinitionOption(scene, x, y, text, isCorrect, question) {
    const optionBox = scene.add.rectangle(x, y, 800, 60, WORD_COLORS.cardBg);
    optionBox.setStrokeStyle(2, 0xE9ECEF);
    optionBox.setInteractive({ useHandCursor: true });

    const optionText = scene.add.text(x, y, text, {
        fontSize: '18px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 750 }
    }).setOrigin(0.5);

    optionBox.on('pointerdown', () => {
        // Disable all options
        scene.children.list.forEach(child => {
            if (child.input) child.disableInteractive();
        });

        if (isCorrect) {
            optionBox.setFillStyle(WORD_COLORS.success, 0.3);
            optionBox.setStrokeStyle(3, WORD_COLORS.success);
            sessionScore++;

            // Show checkmark
            scene.add.text(x + 360, y, '✓', {
                fontSize: '32px',
                fill: '#00D68F',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        } else {
            optionBox.setFillStyle(WORD_COLORS.error, 0.3);
            optionBox.setStrokeStyle(3, WORD_COLORS.error);

            // Show X
            scene.add.text(x + 360, y, '✗', {
                fontSize: '32px',
                fill: '#FF6B6B',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }

        // Move to next question after delay
        scene.time.delayedCall(1500, () => {
            currentQuestionIndex++;
            displayMeaningMatchQuestion(scene);
        });
    });

    optionBox.on('pointerover', () => {
        optionBox.setFillStyle(WORD_COLORS.accent, 0.1);
    });

    optionBox.on('pointerout', () => {
        optionBox.setFillStyle(WORD_COLORS.cardBg);
    });
}

// ==================== SCENE 5: SENTENCE BUILDER ====================
function showSentenceBuilder(scene) {
    scene.children.removeAll();
    currentScene = 'sentence-builder';

    sessionScore = 0;
    currentQuestionIndex = 0;
    currentQuestions = generateSentenceBuilderQuestions();

    displaySentenceBuilderQuestion(scene);
}

function generateSentenceBuilderQuestions() {
    const questions = [];
    const allWords = WORD_DATABASE.easy;
    const totalQuestions = 5;

    for (let i = 0; i < totalQuestions; i++) {
        const questionWord = i === 0 ? currentWord : allWords[Phaser.Math.Between(0, allWords.length - 1)];

        // Create sentence with blank
        const sentence = questionWord.exampleSentence.replace(questionWord.word, '______');

        // Get wrong word options
        const wrongOptions = allWords
            .filter(w => w.id !== questionWord.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map(w => w.word);

        // Combine and shuffle
        const options = [questionWord.word, ...wrongOptions]
            .sort(() => Math.random() - 0.5);

        questions.push({
            sentence: sentence,
            correctWord: questionWord.word,
            options: options,
            definition: questionWord.definition
        });
    }

    return questions;
}

function displaySentenceBuilderQuestion(scene) {
    scene.children.removeAll();

    if (currentQuestionIndex >= currentQuestions.length) {
        showResults(scene);
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    // Header
    scene.add.text(450, 40, '📝 Sentence Builder', {
        fontSize: '32px',
        fill: '#74B9FF',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Progress
    scene.add.text(450, 85, `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`, {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Score
    scene.add.text(750, 40, `Score: ${sessionScore}/${currentQuestions.length}`, {
        fontSize: '20px',
        fill: '#00D68F',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Instructions
    scene.add.text(450, 140, 'Fill in the blank with the correct word:', {
        fontSize: '20px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Sentence with blank
    scene.add.text(450, 210, question.sentence, {
        fontSize: '20px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        align: 'center',
        fontStyle: 'italic',
        wordWrap: { width: 800 }
    }).setOrigin(0.5);

    // Hint
    scene.add.text(450, 280, `Hint: ${question.definition}`, {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 750 }
    }).setOrigin(0.5);

    // Word options
    const startY = 350;
    question.options.forEach((option, index) => {
        const y = startY + index * 55;
        createWordOption(scene, 450, y, option, option === question.correctWord, question);
    });

    // Back button
    createButton(scene, 100, 600, '← Back', WORD_COLORS.textLight, () => {
        showWordDetail(scene);
    }, 140, 50);
}

function createWordOption(scene, x, y, word, isCorrect, question) {
    const optionBox = scene.add.rectangle(x, y, 400, 45, WORD_COLORS.cardBg);
    optionBox.setStrokeStyle(2, 0xE9ECEF);
    optionBox.setInteractive({ useHandCursor: true });

    const optionText = scene.add.text(x, y, word, {
        fontSize: '18px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    optionBox.on('pointerdown', () => {
        // Disable all options
        scene.children.list.forEach(child => {
            if (child.input) child.disableInteractive();
        });

        if (isCorrect) {
            optionBox.setFillStyle(WORD_COLORS.success, 0.3);
            optionBox.setStrokeStyle(3, WORD_COLORS.success);
            sessionScore++;

            scene.add.text(x + 180, y, '✓', {
                fontSize: '28px',
                fill: '#00D68F',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        } else {
            optionBox.setFillStyle(WORD_COLORS.error, 0.3);
            optionBox.setStrokeStyle(3, WORD_COLORS.error);

            scene.add.text(x + 180, y, '✗', {
                fontSize: '28px',
                fill: '#FF6B6B',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }

        scene.time.delayedCall(1500, () => {
            currentQuestionIndex++;
            displaySentenceBuilderQuestion(scene);
        });
    });

    optionBox.on('pointerover', () => {
        optionBox.setFillStyle(WORD_COLORS.accent, 0.1);
    });

    optionBox.on('pointerout', () => {
        optionBox.setFillStyle(WORD_COLORS.cardBg);
    });
}

// ==================== SCENE 6: SPELLING QUEST ====================
function showSpellingQuest(scene) {
    scene.children.removeAll();
    currentScene = 'spelling-quest';

    sessionScore = 0;
    currentQuestionIndex = 0;
    currentQuestions = generateSpellingQuestions();

    displaySpellingQuestion(scene);
}

function generateSpellingQuestions() {
    const questions = [];
    const allWords = WORD_DATABASE.easy;
    const totalQuestions = 5;

    for (let i = 0; i < totalQuestions; i++) {
        const questionWord = i === 0 ? currentWord : allWords[Phaser.Math.Between(0, allWords.length - 1)];

        questions.push({
            word: questionWord.word,
            definition: questionWord.definition,
            phonetic: questionWord.phonetic
        });
    }

    return questions;
}

function displaySpellingQuestion(scene) {
    scene.children.removeAll();

    if (currentQuestionIndex >= currentQuestions.length) {
        showResults(scene);
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    selectedLetters = [];
    userAnswer = '';

    // Header
    scene.add.text(450, 40, '✏️ Spelling Quest', {
        fontSize: '32px',
        fill: '#00D68F',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Progress
    scene.add.text(450, 85, `Word ${currentQuestionIndex + 1} of ${currentQuestions.length}`, {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Score
    scene.add.text(750, 40, `Score: ${sessionScore}/${currentQuestions.length}`, {
        fontSize: '20px',
        fill: '#00D68F',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Definition
    scene.add.text(450, 140, 'Spell the word that means:', {
        fontSize: '20px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 180, question.definition, {
        fontSize: '18px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 750 }
    }).setOrigin(0.5);

    // Phonetic hint
    scene.add.text(450, 230, `Pronunciation: ${question.phonetic}`, {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial',
        fontStyle: 'italic'
    }).setOrigin(0.5);

    // Answer area
    const answerBox = scene.add.rectangle(450, 290, 600, 60, 0x2D3436);
    answerBox.setStrokeStyle(3, WORD_COLORS.accent);

    const answerText = scene.add.text(450, 290, '', {
        fontSize: '32px',
        fill: '#FFB800',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Feedback text
    const feedbackText = scene.add.text(450, 340, '', {
        fontSize: '20px',
        fill: '#2D3436',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Letter bank
    createLetterBank(scene, answerText, question);

    // Action buttons
    createButton(scene, 300, 580, 'Clear', WORD_COLORS.error, () => {
        selectedLetters = [];
        userAnswer = '';
        answerText.setText('');
        feedbackText.setText('');
    }, 140, 50);

    createButton(scene, 600, 580, 'Submit', WORD_COLORS.success, () => {
        checkSpelling(scene, question, feedbackText, answerText);
    }, 140, 50);

    // Back button
    createButton(scene, 100, 600, '← Back', WORD_COLORS.textLight, () => {
        showWordDetail(scene);
    }, 140, 50);
}

function createLetterBank(scene, answerText, question) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const startX = 100;
    const startY = 400;
    const buttonSize = 40;
    const spacing = 46;
    const perRow = 13;

    alphabet.forEach((letter, index) => {
        const col = index % perRow;
        const row = Math.floor(index / perRow);
        const x = startX + col * spacing;
        const y = startY + row * spacing;

        const btn = scene.add.rectangle(x, y, buttonSize, buttonSize, WORD_COLORS.primary);
        btn.setInteractive({ useHandCursor: true });
        btn.setStrokeStyle(2, 0xFFFFFF);

        const text = scene.add.text(x, y, letter, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            selectedLetters.push(letter);
            userAnswer = selectedLetters.join('').toLowerCase();
            answerText.setText(userAnswer);
        });

        btn.on('pointerover', () => {
            btn.setAlpha(0.8);
        });

        btn.on('pointerout', () => {
            btn.setAlpha(1);
        });
    });
}

function checkSpelling(scene, question, feedbackText, answerText) {
    const isCorrect = userAnswer.toLowerCase() === question.word.toLowerCase();

    if (isCorrect) {
        sessionScore++;
        feedbackText.setText('✓ Perfect spelling!');
        feedbackText.setColor('#00D68F');
        answerText.setColor('#00D68F');
    } else {
        feedbackText.setText(`✗ Correct spelling: ${question.word}`);
        feedbackText.setColor('#FF6B6B');
        answerText.setColor('#FF6B6B');
    }

    // Disable all interactions
    scene.children.list.forEach(child => {
        if (child.input) child.disableInteractive();
    });

    scene.time.delayedCall(2500, () => {
        currentQuestionIndex++;
        displaySpellingQuestion(scene);
    });
}

// ==================== SCENE 7: RESULTS ====================
function showResults(scene) {
    scene.children.removeAll();
    currentScene = 'results';

    const totalQuestions = currentQuestions.length;
    const percentage = (sessionScore / totalQuestions) * 100;
    const stars = calculateStars(percentage);

    // Update progress
    const wordId = currentWord.id;
    if (!wordProgress[wordId]) {
        wordProgress[wordId] = { stars: 0, attempts: 0, lastPlayed: '' };
    }

    wordProgress[wordId].attempts++;
    wordProgress[wordId].lastPlayed = new Date().toISOString().split('T')[0];

    // Update stars (keep best score)
    if (stars > wordProgress[wordId].stars) {
        wordProgress[wordId].stars = stars;
    }

    saveProgress();

    // Track completion
    if (window.gameAnalytics) {
        window.gameAnalytics.trackLevelComplete('word-explorer', wordId, stars);
    }

    // Celebration title
    let title = '🎉 Excellent!';
    let titleColor = '#00D68F';
    if (stars === 3) {
        title = '⭐ Perfect! Amazing!';
        titleColor = '#FFB800';
    } else if (stars === 2) {
        title = '🎉 Great Job!';
        titleColor = '#00D68F';
    } else if (stars === 1) {
        title = '👍 Good Try!';
        titleColor = '#74B9FF';
    } else {
        title = '📚 Keep Practicing!';
        titleColor = '#FF6B6B';
    }

    scene.add.text(450, 100, title, {
        fontSize: '48px',
        fill: titleColor,
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Score
    scene.add.text(450, 180, `Score: ${sessionScore}/${totalQuestions}`, {
        fontSize: '36px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 230, `${percentage}%`, {
        fontSize: '32px',
        fill: '#636E72',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Stars display
    const starsDisplay = getStarDisplay(stars);
    scene.add.text(450, 290, starsDisplay, {
        fontSize: '56px',
        fill: '#FFB800'
    }).setOrigin(0.5);

    scene.add.text(450, 350, `You earned ${stars} star${stars !== 1 ? 's' : ''}!`, {
        fontSize: '24px',
        fill: '#1E293B',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Encouraging message
    let message = '';
    if (stars === 3) {
        message = 'Perfect score! You mastered this word! 🌟';
    } else if (stars === 2) {
        message = 'Great work! You know this word well!';
    } else if (stars === 1) {
        message = 'Good start! Practice more to improve!';
    } else {
        message = 'Keep trying! You\'ll get better with practice!';
    }

    scene.add.text(450, 400, message, {
        fontSize: '18px',
        fill: '#636E72',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 700 }
    }).setOrigin(0.5);

    // Buttons
    createButton(scene, 300, 500, 'Word Detail', WORD_COLORS.accent, () => {
        showWordDetail(scene);
    }, 180, 60);

    createButton(scene, 600, 500, 'Word Map', WORD_COLORS.primary, () => {
        showWordMap(scene);
    }, 180, 60);

    createButton(scene, 450, 590, '← Main Menu', WORD_COLORS.textLight, () => {
        showMainMenu(scene);
    }, 180, 50);
}

// ==================== HELPER FUNCTIONS ====================
function createButton(scene, x, y, label, color, callback, width = 200, height = 60) {
    const button = scene.add.rectangle(x, y, width, height, color);
    button.setInteractive({ useHandCursor: true });

    const text = scene.add.text(x, y, label, {
        fontSize: '18px',
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

function getStarDisplay(stars) {
    if (stars === 0) return '☆☆☆';
    if (stars === 1) return '⭐☆☆';
    if (stars === 2) return '⭐⭐☆';
    if (stars === 3) return '⭐⭐⭐';
    return '☆☆☆';
}

function calculateStars(percentage) {
    if (percentage >= 100) return 3;
    if (percentage >= 66) return 2;
    if (percentage >= 50) return 1;
    return 0;
}

function saveProgress() {
    try {
        localStorage.setItem('word-explorer-progress', JSON.stringify(wordProgress));
    } catch (e) {
        console.error('Failed to save progress:', e);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('word-explorer-progress');
        if (saved) {
            wordProgress = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load progress:', e);
        wordProgress = {};
    }
}

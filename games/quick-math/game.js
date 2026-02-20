// Quick Math - Learn Vedic Math Tricks!
// Professional Educational Game Design
// MIGRATED TO TEMPLATE SYSTEM V2.0

// Quick Math local colors - Coolors palette #D4E09B / #F6F4D2 / #CBDFBD / #F19C79 / #A44A3F
const QM_COLORS = {
    primary: 0xA44A3F,        // Brick red
    secondary: 0xF19C79,      // Peach
    success: 0xA44A3F,        // Brick red
    error: 0xA44A3F,          // Brick red
    background: 0xF6F4D2,     // Cream
    cardBg: 0xFFFFFF,         // White cards
    text: COLORS.neutral.darkText.phaser,
    textLight: 0x8B6456,      // Muted brick
    accent: 0xF19C79          // Peach
};

const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: QM_COLORS.background,
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
let unlockedLevels = 1;
let score = 0;
let currentQuestion = null;
let userAnswer = '';
let soundEnabled = true;

// Progress & Achievement System
let playerProgress = {
    unlockedLevels: 1,
    levelStars: {}, // { levelId: stars }
    achievements: [],
    totalScore: 0,
    gamesPlayed: 0,
    totalStars: 0
};

// Achievement Definitions
const ACHIEVEMENTS = {
    first_star: {
        id: 'first_star',
        name: 'First Star',
        icon: '🌟',
        description: 'Get your first star',
        check: () => playerProgress.totalStars >= 1
    },
    triple_star: {
        id: 'triple_star',
        name: 'Perfect!',
        icon: '⭐',
        description: 'Get 3 stars on any level',
        check: () => Object.values(playerProgress.levelStars).some(s => s === 3)
    },
    perfectionist: {
        id: 'perfectionist',
        name: 'Perfectionist',
        icon: '🎯',
        description: 'Get 3 stars on all levels',
        check: () => {
            const levels = Object.keys(playerProgress.levelStars).length;
            const perfectLevels = Object.values(playerProgress.levelStars).filter(s => s === 3).length;
            return levels > 0 && levels === perfectLevels;
        }
    },
    five_games: {
        id: 'five_games',
        name: 'Dedicated',
        icon: '🔥',
        description: 'Complete 5 practice sessions',
        check: () => playerProgress.gamesPlayed >= 5
    },
    math_genius: {
        id: 'math_genius',
        name: 'Math Genius',
        icon: '🧠',
        description: 'Unlock all levels',
        check: () => playerProgress.unlockedLevels >= 4
    },
    score_master: {
        id: 'score_master',
        name: 'Score Master',
        icon: '💯',
        description: 'Earn 100+ total points',
        check: () => playerProgress.totalScore >= 100
    }
};

// Save/Load Functions
function saveProgress() {
    try {
        localStorage.setItem('quickMathProgress', JSON.stringify(playerProgress));
    } catch (e) {
        console.log('Could not save progress:', e);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('quickMathProgress');
        if (saved) {
            playerProgress = JSON.parse(saved);
            unlockedLevels = playerProgress.unlockedLevels || 1;
            return true;
        }
    } catch (e) {
        console.log('Could not load progress:', e);
    }
    return false;
}

function checkAndUnlockAchievements(scene) {
    let newAchievements = [];

    Object.values(ACHIEVEMENTS).forEach(achievement => {
        if (!playerProgress.achievements.includes(achievement.id) && achievement.check()) {
            playerProgress.achievements.push(achievement.id);
            newAchievements.push(achievement);
        }
    });

    if (newAchievements.length > 0) {
        saveProgress();
        // Show achievement notification
        newAchievements.forEach((ach, i) => {
            setTimeout(() => showAchievementNotification(scene, ach), i * 2000);
        });
    }
}

function showAchievementNotification(scene, achievement) {
    playSound('celebrate');

    const notification = scene.add.container(450, -100);

    const bg = scene.add.rectangle(0, 0, 350, 100, 0xA44A3F);
    bg.setStrokeStyle(3, 0xFFFFFF);

    const icon = scene.add.text(-140, 0, achievement.icon, {
        fontSize: '48px'
    }).setOrigin(0.5);

    const title = scene.add.text(-40, -15, 'Achievement Unlocked!', {
        fontSize: '14px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    const name = scene.add.text(-40, 15, achievement.name, {
        fontSize: '20px',
        fill: '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    notification.add([bg, icon, title, name]);
    notification.setDepth(2000);

    // Animate in
    scene.tweens.add({
        targets: notification,
        y: 80,
        duration: 500,
        ease: 'Back.easeOut'
    });

    // Animate out after 3 seconds
    scene.time.delayedCall(3000, () => {
        scene.tweens.add({
            targets: notification,
            y: -100,
            alpha: 0,
            duration: 300,
            onComplete: () => notification.destroy()
        });
    });
}

// Sound System (Web Audio API)
let audioContext;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
        case 'success':
            // Happy ascending tones
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;

        case 'error':
            // Low descending tone
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.15);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;

        case 'click':
            // Subtle click
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;

        case 'celebrate':
            // Victory fanfare
            const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            frequencies.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
                gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
                osc.start(audioContext.currentTime + i * 0.1);
                osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
            });
            return; // Skip normal oscillator cleanup
    }
}

// Calculate star rating based on score
function getStarRating(score, total) {
    const percentage = (score / total) * 100;
    if (percentage === 100) return 3;
    if (percentage >= 80) return 2;
    if (percentage >= 60) return 1;
    return 0;
}

function preload() {
    // No external assets needed
}

function create() {
    this.scene = this;

    // Load saved progress
    loadProgress();

    // Add sound toggle button (top right, always visible)
    createSoundToggle(this);

    showMainMenu(this);
}

// Sound Toggle Button
function createSoundToggle(scene) {
    const x = 850;
    const y = 30;

    const soundButton = scene.add.text(x, y, soundEnabled ? '🔊' : '🔇', {
        fontSize: '32px'
    }).setOrigin(0.5);

    soundButton.setInteractive({ useHandCursor: true });

    soundButton.on('pointerdown', () => {
        soundEnabled = !soundEnabled;
        soundButton.setText(soundEnabled ? '🔊' : '🔇');

        // Play click sound if enabling
        if (soundEnabled) {
            initAudio();
            playSound('click');
        }
    });

    // Make it persist across scenes
    soundButton.setDepth(1000);
    soundButton.setScrollFactor(0);
}

function update() {
    // Game loop
}

// ==================== PROGRESS & ACHIEVEMENTS SCREEN ====================
function showProgressScreen(scene) {
    scene.children.removeAll();
    currentScene = 'progress';

    // Title
    scene.add.text(450, 50, '🏆 Your Progress', {
        fontSize: '42px',
        fill: '#2D3436',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Stats Cards
    const stats = [
        { label: 'Total Stars', value: playerProgress.totalStars, icon: '⭐' },
        { label: 'Games Played', value: playerProgress.gamesPlayed, icon: '🎮' },
        { label: 'Total Score', value: playerProgress.totalScore, icon: '💯' },
        { label: 'Levels Unlocked', value: playerProgress.unlockedLevels, icon: '🔓' }
    ];

    stats.forEach((stat, i) => {
        const x = 150 + (i % 2) * 400;
        const y = 130 + Math.floor(i / 2) * 100;

        const card = scene.add.rectangle(x, y, 350, 80, QM_COLORS.cardBg);
        card.setOrigin(0, 0);
        card.setStrokeStyle(2, 0xCBDFBD);

        scene.add.text(x + 25, y + 25, stat.icon, {
            fontSize: '32px'
        }).setOrigin(0, 0);

        scene.add.text(x + 80, y + 20, stat.label, {
            fontSize: '16px',
            fill: '#636E72',
            fontFamily: 'Arial'
        }).setOrigin(0, 0);

        scene.add.text(x + 80, y + 45, stat.value.toString(), {
            fontSize: '24px',
            fill: '#2D3436',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0, 0);
    });

    // Achievements Section
    scene.add.text(450, 350, 'Achievements', {
        fontSize: '28px',
        fill: '#2D3436',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Achievement grid
    const achievementList = Object.values(ACHIEVEMENTS);
    achievementList.forEach((ach, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 180 + col * 240;
        const y = 400 + row * 100;
        const unlocked = playerProgress.achievements.includes(ach.id);

        const card = scene.add.rectangle(x, y, 220, 85, unlocked ? QM_COLORS.cardBg : 0xF6F4D2);
        card.setOrigin(0, 0);
        card.setStrokeStyle(2, unlocked ? QM_COLORS.success : 0xD4E09B);

        scene.add.text(x + 20, y + 20, unlocked ? ach.icon : '🔒', {
            fontSize: '28px'
        }).setOrigin(0, 0);

        scene.add.text(x + 70, y + 15, ach.name, {
            fontSize: '15px',
            fill: unlocked ? '#2D3436' : '#ADB5BD',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0, 0);

        scene.add.text(x + 70, y + 38, ach.description, {
            fontSize: '11px',
            fill: unlocked ? '#636E72' : '#CED4DA',
            fontFamily: 'Arial',
            wordWrap: { width: 130 }
        }).setOrigin(0, 0);
    });

    // Back button
    createModernButton(scene, 450, 600, '← Back to Menu', QM_COLORS.textLight, () => {
        showMainMenu(scene);
    }, 200, 50, true);
}

// ==================== MAIN MENU ====================
function showMainMenu(scene) {
    scene.children.removeAll();
    currentScene = 'menu';

    // Background decoration
    const topCircle = scene.add.circle(750, -50, 150, QM_COLORS.primary, 0.08);
    const bottomCircle = scene.add.circle(100, 700, 180, QM_COLORS.secondary, 0.08);

    // Title
    scene.add.text(450, 120, '⚡ Quick Math', {
        fontSize: '64px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    scene.add.text(450, 180, 'Learn Vedic Math Tricks', {
        fontSize: '22px',
        fill: '#475569',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Feature cards (mini)
    const features = [
        { icon: '🎯', text: 'Learn fast math tricks' },
        { icon: '📚', text: 'One trick at a time' },
        { icon: '⚡', text: 'Become a math master' }
    ];

    features.forEach((feature, i) => {
        const y = 280 + i * 70;
        const card = scene.add.rectangle(450, y, 400, 55, QM_COLORS.cardBg);
        card.setStrokeStyle(2, 0xCBDFBD);

        scene.add.text(280, y, feature.icon, {
            fontSize: '28px'
        }).setOrigin(0.5);

        scene.add.text(320, y, feature.text, {
            fontSize: '18px',
            fill: '#1E293B',
            fontFamily: 'Arial'
        }).setOrigin(0, 0.5);
    });

    // Start button (large, prominent)
    createModernButton(scene, 450, 530, 'Start Learning →', QM_COLORS.primary, () => {
        initAudio(); // Initialize audio on first interaction
        playSound('click');
        showLevelSelect(scene);
    }, 300, 70);

    // Achievements button
    createModernButton(scene, 450, 615, '🏆 View Progress', QM_COLORS.secondary, () => {
        playSound('click');
        showProgressScreen(scene);
    }, 250, 50);
}

// ==================== LEVEL SELECT ====================
function showLevelSelect(scene) {
    scene.children.removeAll();
    currentScene = 'level-select';

    // Title
    scene.add.text(450, 60, 'Choose Your Math Trick', {
        fontSize: '42px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    scene.add.text(450, 105, 'Master one trick at a time', {
        fontSize: '18px',
        fill: '#475569',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Level cards - 2x2 grid centered with equal side margins
    const cardWidth = 340;
    const gap = 40;
    const gridWidth = 2 * cardWidth + gap;
    const startX = (config.width - gridWidth) / 2;

    const levels = [
        { id: 1, name: 'Multiply by 11', icon: '×11', desc: 'Learn the pattern trick', color: 0x5F6FFF },
        { id: 2, name: 'Square Numbers', icon: '5²', desc: 'Numbers ending in 5', color: 0xFF6348, locked: true },
        { id: 3, name: 'Double & Half', icon: '×÷', desc: 'Smart shortcuts', color: 0xA44A3F, locked: true },
        { id: 4, name: 'Base Method', icon: '~10', desc: 'Near 10, 100...', color: 0xFFB800, locked: true }
    ];

    levels.forEach((level, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = startX + col * (cardWidth + gap);
        const y = 180 + row * 200;
        const isLocked = level.locked && level.id > unlockedLevels;

        createProfessionalCard(scene, x, y, level, isLocked);
    });

    // Back button aligned with grid left edge
    createModernButton(scene, startX, 600, '← Back', QM_COLORS.textLight, () => {
        showMainMenu(scene);
    }, 140, 50, true);
}

// Professional Card Design with Proper Padding
function createProfessionalCard(scene, x, y, level, isLocked) {
    const cardWidth = 340;
    const cardHeight = 160;
    const padding = 25;

    // Card shadow (depth effect)
    const shadow = scene.add.rectangle(x, y + 4, cardWidth, cardHeight, 0x000000, 0.08);
    shadow.setOrigin(0, 0);

    // Card background (white)
    const cardBg = scene.add.rectangle(x, y, cardWidth, cardHeight, isLocked ? 0xCBDFBD : QM_COLORS.cardBg);
    cardBg.setOrigin(0, 0);
    cardBg.setStrokeStyle(2, isLocked ? 0xDEE2E6 : 0xCBDFBD);

    // Colored accent bar (left side)
    if (!isLocked) {
        const accentBar = scene.add.rectangle(x, y, 6, cardHeight, level.color);
        accentBar.setOrigin(0, 0);
    }

    // Icon circle (professional design)
    const iconCircle = scene.add.circle(x + padding + 35, y + 50, 35, isLocked ? 0xCED4DA : level.color, 0.15);

    const iconText = scene.add.text(x + padding + 35, y + 50, level.icon, {
        fontSize: '36px',
        fill: isLocked ? '#ADB5BD' : '#2D3436',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Title (with proper padding and bounds)
    const titleX = x + padding + 90;
    const titleY = y + padding + 10;

    const titleText = scene.add.text(titleX, titleY, level.name, {
        fontSize: '20px',
        fill: isLocked ? '#ADB5BD' : '#2D3436',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        wordWrap: { width: cardWidth - 130 }
    }).setOrigin(0, 0);

    // Description (below title)
    const descText = scene.add.text(titleX, titleY + 35, level.desc, {
        fontSize: '18px',
        fill: isLocked ? '#CED4DA' : '#636E72',
        fontFamily: 'Arial',
        wordWrap: { width: cardWidth - 130 }
    }).setOrigin(0, 0);

    // Action button (bottom right for unlocked; centered "Locked" for locked)
    if (isLocked) {
        const lockIcon = scene.add.text(x + cardWidth / 2, y + cardHeight - 40, '🔒 Locked', {
            fontSize: '18px',
            fill: '#ADB5BD',
            fontFamily: 'Arial'
        }).setOrigin(0.5, 0.5);
    } else {
        const btnX = x + cardWidth - padding - 70;
        const btnY = y + cardHeight - 40;

        const playBtn = scene.add.rectangle(btnX, btnY, 120, 40, level.color);
        playBtn.setInteractive({ useHandCursor: true });

        const playText = scene.add.text(btnX, btnY, 'Start →', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        playBtn.on('pointerdown', () => {
            currentLevel = level.id;
            showTutorial(scene, level.id);
        });

        playBtn.on('pointerover', () => {
            playBtn.setAlpha(0.85);
            playBtn.setScale(1.02);
        });
        playBtn.on('pointerout', () => {
            playBtn.setAlpha(1);
            playBtn.setScale(1);
        });
    }
}

// ==================== TUTORIAL (Level 1: Multiply by 11) ====================
function showTutorial(scene, levelId) {
    scene.children.removeAll();
    currentScene = 'tutorial';

    if (levelId === 1) {
        tutorialMultiplyBy11(scene);
    } else if (levelId === 2) {
        tutorialSquareEndingIn5(scene);
    } else if (levelId === 3) {
        tutorialDoubleAndHalf(scene);
    } else if (levelId === 4) {
        tutorialBaseMethod(scene);
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
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#5F6FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Explanation text
        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#2D3436',
            fontFamily: 'Arial',
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        // Example
        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#A44A3F',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        // Progress
        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '16px',
            fill: '#636E72',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Navigation buttons
        if (step > 0) {
            createModernButton(scene, 220, 590, '← Previous', QM_COLORS.textLight, () => {
                step--;
                showStep();
            }, 150, 50, true);
        }

        if (step < steps.length - 1) {
            createModernButton(scene, 680, 590, 'Next →', QM_COLORS.primary, () => {
                step++;
                showStep();
            }, 150, 50);
        } else {
            createModernButton(scene, 680, 590, 'Practice!', QM_COLORS.success, () => {
                showPractice(scene, 1);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: SQUARE NUMBERS ENDING IN 5 ====================
function tutorialSquareEndingIn5(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Square Numbers Ending in 5',
            text: 'Learn the fastest way to square numbers like 25, 35, 45!',
            example: ''
        },
        {
            title: 'What is "Square"?',
            text: 'Square means multiply a number by itself\n25² = 25 × 25',
            example: '25 × 25 = ?'
        },
        {
            title: 'Example: 25²',
            text: 'The normal way:\n25 × 25 = 625\n(That takes time!)',
            example: '625'
        },
        {
            title: 'The Quick Trick! ✨',
            text: 'Step 1: Take the first digit → 2',
            example: '2__',
            highlight: '2'
        },
        {
            title: 'The Quick Trick! ✨',
            text: 'Step 2: Multiply by NEXT number\n2 × 3 = 6',
            example: '6__',
            highlight: '6'
        },
        {
            title: 'The Quick Trick! ✨',
            text: 'Step 3: Add 25 at the end\nAlways 25!',
            example: '625',
            highlight: '25'
        },
        {
            title: 'More Examples!',
            text: '35² → 3 × 4 = 12, add 25 → 1225\n45² → 4 × 5 = 20, add 25 → 2025\n55² → 5 × 6 = 30, add 25 → 3025',
            example: '✨ Magic! ✨'
        },
        {
            title: 'The Pattern!',
            text: 'For any number ending in 5:\nN5² → N × (N+1), then add 25\n\nTry it yourself!',
            example: '🎯 Ready!'
        }
    ];

    function showStep() {
        scene.children.removeAll();

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#FF6348',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Explanation text
        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#1E293B',
            fontFamily: 'Arial',
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        // Example
        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#A44A3F',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        // Progress
        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#475569',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Navigation buttons
        if (step > 0) {
            createModernButton(scene, 220, 590, '← Previous', QM_COLORS.textLight, () => {
                step--;
                showStep();
            }, 150, 50, true);
        }

        if (step < steps.length - 1) {
            createModernButton(scene, 680, 590, 'Next →', QM_COLORS.accent, () => {
                step++;
                showStep();
            }, 150, 50);
        } else {
            createModernButton(scene, 680, 590, 'Practice!', QM_COLORS.success, () => {
                showPractice(scene, 2);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: DOUBLE & HALF ====================
function tutorialDoubleAndHalf(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Double & Half Trick',
            text: 'Learn a smart shortcut to multiply tricky numbers!',
            example: ''
        },
        {
            title: 'Example: 32 × 25',
            text: 'The normal way:\n32 × 25 = 800\n(That takes time!)',
            example: '32 × 25 = ?'
        },
        {
            title: 'The Magic Rule! ✨',
            text: 'If one number gets SMALLER by half...\n...the other gets BIGGER by double!\n\n32 ÷ 2 = 16',
            example: '16 × ?',
            highlight: '÷2'
        },
        {
            title: 'The Magic Rule! ✨',
            text: 'Double the other number:\n25 × 2 = 50\n\nNow multiply:',
            example: '16 × 50 = 800',
            highlight: '×2'
        },
        {
            title: 'More Examples!',
            text: '24 × 50 → 12 × 100 = 1200\n18 × 50 → 9 × 100 = 900\n14 × 25 → 7 × 50 = 350',
            example: '✨ Magic! ✨'
        },
        {
            title: 'The Pattern!',
            text: 'For ANY multiplication:\nHalve one → Double the other\nThe answer stays the SAME!\n\nA × B = (A÷2) × (B×2)',
            example: '🎯 Try it!'
        }
    ];

    function showStep() {
        scene.children.removeAll();

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#A44A3F',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Explanation text
        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#1E293B',
            fontFamily: 'Arial',
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        // Example
        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#A44A3F',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        // Progress
        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#475569',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Navigation buttons
        if (step > 0) {
            createModernButton(scene, 220, 590, '← Previous', QM_COLORS.textLight, () => {
                step--;
                showStep();
            }, 150, 50, true);
        }

        if (step < steps.length - 1) {
            createModernButton(scene, 680, 590, 'Next →', QM_COLORS.primary, () => {
                step++;
                showStep();
            }, 150, 50);
        } else {
            createModernButton(scene, 680, 590, 'Practice!', QM_COLORS.success, () => {
                showPractice(scene, 3);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: BASE METHOD ====================
function tutorialBaseMethod(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Base Method',
            text: 'Learn to multiply numbers CLOSE to 10, 100, 1000!',
            example: ''
        },
        {
            title: 'What is "Base"?',
            text: 'Base means a NUMBER that\'s easy to work with.\n\nExamples: 10, 100, 1000',
            example: 'We use 10 as our base!'
        },
        {
            title: 'Example: 9 × 11',
            text: 'Both numbers are CLOSE to 10:\n9 is 1 LESS than 10\n11 is 1 MORE than 10',
            example: 'Let\'s use this!'
        },
        {
            title: 'Step 1: Distance from Base',
            text: '9 is 1 away from 10 → write -1\n11 is 1 away from 10 → write +1',
            example: '-1  and  +1'
        },
        {
            title: 'Step 2: Multiply the Distances',
            text: 'Multiply the two distances:\n(-1) × (+1) = -1',
            example: '-1'
        },
        {
            title: 'Step 3: Subtract from Base',
            text: 'Start with the base: 10\nSubtract the result: 10 - 1 = 9',
            example: '9__'
        },
        {
            title: 'Step 4: Add Last Digit',
            text: 'The answer is: 99\n(We already know it ends in 9)',
            example: '9 × 11 = 99'
        },
        {
            title: 'More Examples!',
            text: '8 × 12 → (-2)(+2) = -4 → 10 - 4 = 96\n7 × 13 → (-3)(+3) = -9 → 10 - 9 = 91\n12 × 8 → (+2)(-2) = -4 → 100 - 4 = 96\n\nWait, that last one uses 10!',
            example: '✨ Magic! ✨'
        },
        {
            title: 'The Pattern!',
            text: 'Pick a BASE (10, 100, 1000...)\nFind distance from base for each number\nMultiply the distances\nSubtract from base!\n\n(Base + A) × (Base + B) = Base + A + B + A×B',
            example: '🎯 Ready to practice!'
        }
    ];

    function showStep() {
        scene.children.removeAll();

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#FFB800',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Explanation text
        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#1E293B',
            fontFamily: 'Arial',
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        // Example
        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#A44A3F',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        // Progress
        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#475569',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Navigation buttons
        if (step > 0) {
            createModernButton(scene, 220, 590, '← Previous', QM_COLORS.textLight, () => {
                step--;
                showStep();
            }, 150, 50, true);
        }

        if (step < steps.length - 1) {
            createModernButton(scene, 680, 590, 'Next →', QM_COLORS.primary, () => {
                step++;
                showStep();
            }, 150, 50);
        } else {
            createModernButton(scene, 680, 590, 'Practice!', QM_COLORS.success, () => {
                showPractice(scene, 4);
            }, 150, 50);
        }
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

        // Generate question based on level
        if (levelId === 1) {
            // Level 1: Multiply by 11
            currentQuestion = {
                num: Phaser.Math.Between(12, 99),
                answer: null,
                type: '×11'
            };
            currentQuestion.answer = currentQuestion.num * 11;
        } else if (levelId === 2) {
            // Level 2: Square numbers ending in 5
            const tens = Phaser.Math.Between(1, 9); // 1-9 for 15-95
            const num = tens * 10 + 5; // Makes 15, 25, 35...95
            currentQuestion = {
                num: num,
                answer: null,
                type: '²'
            };
            // Answer: N × (N+1) then add 25
            const firstDigit = Math.floor(num / 10);
            currentQuestion.answer = firstDigit * (firstDigit + 1) * 100 + 25;
        } else if (levelId === 3) {
            // Level 3: Double & Half (even number × 25 or 50)
            const evenNum = Phaser.Math.Between(6, 20) * 2; // 12, 14, 16...40
            const multiplier = Phaser.Utils.Array.GetRandom([25, 50]); // 25 or 50
            currentQuestion = {
                num1: evenNum,
                num2: multiplier,
                answer: null,
                type: '×÷'
            };
            currentQuestion.answer = evenNum * multiplier;
        } else if (levelId === 4) {
            // Level 4: Base Method (numbers near 10)
            // Generate two numbers close to 10: from 7 to 13
            const num1 = Phaser.Math.Between(7, 13);
            const num2 = Phaser.Math.Between(7, 13);
            currentQuestion = {
                num1: num1,
                num2: num2,
                answer: null,
                type: 'base'
            };
            currentQuestion.answer = num1 * num2;
        }

        if (questionText) questionText.destroy();
        if (answerText) answerText.destroy();
        if (feedbackText) feedbackText.destroy();
        if (inputText) inputText.destroy();

        // Question (format based on type)
        let questionStr = '';
        if (currentQuestion.type === '×11') {
            questionStr = `${currentQuestion.num} × 11 = ?`;
        } else if (currentQuestion.type === '²') {
            questionStr = `${currentQuestion.num}² = ?`;
        } else if (currentQuestion.type === '×÷') {
            questionStr = `${currentQuestion.num1} × ${currentQuestion.num2} = ?`;
        } else if (currentQuestion.type === 'base') {
            questionStr = `${currentQuestion.num1} × ${currentQuestion.num2} = ?`;
        }

        questionText = scene.add.text(450, 120, questionStr, {
            fontSize: '44px',
            fill: '#2D3436',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Input box background
        answerText = scene.add.rectangle(400, 200, 250, 70, 0x2d3436);
        answerText.setStrokeStyle(3, QM_COLORS.buttonBg);

        // Input text
        inputText = scene.add.text(400, 200, '', {
            fontSize: '40px',
            fill: '#FDCB6E',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Feedback (below input)
        feedbackText = scene.add.text(400, 270, '', {
            fontSize: '24px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Number pad (centered, lower on screen)
        createNumberPad(scene, inputText);

        // Action buttons (bottom)
        createButton(scene, 280, 560, 'Clear', QM_COLORS.error, () => {
            userAnswer = '';
            inputText.setText('');
        }, 140, 50);

        createButton(scene, 520, 560, 'Submit', QM_COLORS.success, () => {
            checkAnswer();
        }, 140, 50);
    }

    function checkAnswer() {
        const answer = parseInt(userAnswer);

        if (answer === currentQuestion.answer) {
            score++;
            feedbackText.setText('✓ Correct! +1');
            feedbackText.setColor('#A44A3F');
            playSound('success'); // Success sound
        } else {
            feedbackText.setText(`✗ Wrong. Answer: ${currentQuestion.answer}`);
            feedbackText.setColor('#FF6B6B');
            playSound('error'); // Error sound
        }

        questionsAnswered++;
        scoreText.setText(`Score: ${score}/${totalQuestions}`);

        scene.time.delayedCall(2000, () => {
            generateQuestion();
        });
    }

    generateQuestion();
}

// ==================== RESULTS ====================
function showResults(scene, score, total) {
    scene.children.removeAll();

    const percentage = (score / total) * 100;
    const passed = percentage >= 60;
    const stars = getStarRating(score, total);

    // Play celebration sound if passed
    if (passed) {
        playSound('celebrate');
    }

    // Result card background
    const cardWidth = 500;
    const cardHeight = 450;
    const cardX = (900 - cardWidth) / 2;
    const cardY = 100;

    const cardShadow = scene.add.rectangle(cardX, cardY + 4, cardWidth, cardHeight, 0x000000, 0.1);
    const cardBg = scene.add.rectangle(cardX, cardY, cardWidth, cardHeight, QM_COLORS.cardBg);
    cardBg.setOrigin(0, 0);

    // Title
    scene.add.text(450, cardY + 40, passed ? '🎉 Great Job!' : '📚 Keep Practicing!', {
        fontSize: '38px',
        fill: passed ? '#A44A3F' : '#FF6B6B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Star Rating Display
    const starY = cardY + 120;
    const starSize = 50;
    const starSpacing = 70;
    const startX = 450 - (2 * starSpacing / 2);

    for (let i = 0; i < 3; i++) {
        const x = startX + i * starSpacing;
        const filled = i < stars;

        scene.add.text(x, starY, filled ? '⭐' : '☆', {
            fontSize: `${starSize}px`,
            fill: filled ? '#F19C79' : '#DFE6E9'
        }).setOrigin(0.5);
    }

    // Star rating text
    const ratingText = stars === 3 ? 'Perfect!' : stars === 2 ? 'Great!' : stars === 1 ? 'Good Try!' : 'Keep Going!';
    scene.add.text(450, starY + 60, ratingText, {
        fontSize: '22px',
        fill: '#475569',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Score display
    scene.add.text(450, cardY + 250, `Score: ${score}/${total}`, {
        fontSize: '32px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, cardY + 290, `${percentage}%`, {
        fontSize: '24px',
        fill: '#475569',
        fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Save progress
    playerProgress.gamesPlayed++;
    playerProgress.totalScore += score;

    // Save star rating (only if better than before)
    const currentBestStars = playerProgress.levelStars[currentLevel] || 0;
    if (stars > currentBestStars) {
        playerProgress.levelStars[currentLevel] = stars;
    }

    // Recalculate total stars
    playerProgress.totalStars = Object.values(playerProgress.levelStars).reduce((a, b) => a + b, 0);

    // Unlock next level
    if (passed && unlockedLevels === currentLevel) {
        unlockedLevels++;
        playerProgress.unlockedLevels = unlockedLevels;
        scene.add.text(450, cardY + 340, '🔓 Next level unlocked!', {
            fontSize: '18px',
            fill: '#A44A3F',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }

    // Save and check achievements
    saveProgress();
    checkAndUnlockAchievements(scene);

    // Buttons
    createModernButton(scene, 300, 580, 'Try Again', QM_COLORS.primary, () => {
        playSound('click');
        showPractice(scene, currentLevel);
    }, 180, 50);

    createModernButton(scene, 600, 580, 'Level Select', QM_COLORS.success, () => {
        playSound('click');
        showLevelSelect(scene);
    }, 180, 50);
}

// ==================== NUMBER PAD ====================
function createNumberPad(scene, inputText) {
    const startX = 265;
    const startY = 350;
    const spacing = 65;

    for (let i = 0; i <= 9; i++) {
        const x = startX + (i % 5) * spacing;
        const y = startY + Math.floor(i / 5) * 70;

        const btn = scene.add.rectangle(x, y, 55, 55, QM_COLORS.buttonBg);
        btn.setInteractive({ useHandCursor: true });
        btn.setStrokeStyle(2, 0x000);

        const text = scene.add.text(x, y, i, {
            fontSize: '26px',
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

// ==================== MODERN BUTTON (Professional Design) ====================
function createModernButton(scene, x, y, label, color, callback, width = 200, height = 60, outline = false) {
    // Shadow for depth
    const shadow = scene.add.rectangle(x, y + 3, width, height, 0x000000, 0.1);

    const button = scene.add.rectangle(x, y, width, height, outline ? QM_COLORS.cardBg : color);
    button.setInteractive({ useHandCursor: true });

    if (outline) {
        button.setStrokeStyle(2, color);
    }

    const text = scene.add.text(x, y, label, {
        fontSize: '18px',
        fill: outline ? '#636E72' : '#FFFFFF',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
        playSound('click');
        callback();
    });
    button.on('pointerover', () => {
        button.setAlpha(0.9);
        button.setScale(1.02);
    });
    button.on('pointerout', () => {
        button.setAlpha(1);
        button.setScale(1);
    });

    return { button, text, shadow };
}

// Legacy button support
function createButton(scene, x, y, label, color, callback, width = 200, height = 60) {
    return createModernButton(scene, x, y, label, color, callback, width, height);
}

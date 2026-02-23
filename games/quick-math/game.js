// Quick Math - Learn Vedic Math Tricks!
// Professional Educational Game Design
// MIGRATED TO TEMPLATE SYSTEM V2.0

// Quick Math local colors - Blue & Orange (from design-colors.css)
const QM_COLORS = {
    primary: 0x1CB0F6,        // Dodger Blue - primary action
    primaryDark: 0x0B8FDE,    // Dark blue for hover
    secondary: 0xFF7D00,      // Bright Orange - secondary action
    success: 0x58CC02,        // Bright Green - success feedback
    error: 0xFF4444,          // Bright Red - error feedback
    background: 0xF8F9FA,     // Soft gray-white
    cardBg: 0xFFFFFF,         // White cards
    buttonBg: 0xF1F5F9,       // Light gray for buttons
    text: 0x1A1A1A,           // Dark text
    textMuted: 0x6B7280,      // Muted text
    textLight: 0x9CA3AF,      // Light gray text
    accent: 0xFFE66D          // Gold accent
};

// Clear scene helper - removes all children, timers, and keyboard listeners to prevent race conditions
function clearScene(scene) {
    scene.time.removeAllEvents();
    scene.input.keyboard.removeAllListeners();
    scene.children.removeAll(true);
}

const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: QM_COLORS.background,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        expandParent: true,
        orientation: Phaser.Scale.Orientation.PORTRAIT_BY_DEFAULT
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

const game = new Phaser.Game(config);

// Helper to get actual game dimensions (accounting for scaling)
function getActualGameWidth() {
    return game.scale.gameSize.width;
}

function getActualGameHeight() {
    return game.scale.gameSize.height;
}

// Helper to calculate responsive scale factor
function getScaleFactor() {
    return getActualGameWidth() / 900; // 900 is base width
}

// Game state
let currentScene = 'menu';
let currentLevel = 1;
let score = 0;
let currentQuestion = null;
let userAnswer = '';
let soundEnabled = true;

// Progress & Achievement System
let playerProgress = {
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
        description: 'Practice all 16 levels',
        check: () => Object.keys(playerProgress.levelStars).length >= 16
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

    const bg = scene.add.rectangle(0, 0, 350, 100, QM_COLORS.primary);
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
    console.log('create() called, this:', this, 'scene:', this);
    this.scene = this;

    // Load saved progress
    loadProgress();

    // Add sound toggle button (top right, always visible)
    createSoundToggle(this);

    showLevelSelect(this);
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
    clearScene(scene);
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
        { label: 'Total Score', value: playerProgress.totalScore, icon: '💯' }
    ];

    stats.forEach((stat, i) => {
        const x = 150 + (i % 2) * 400;
        const y = 130 + Math.floor(i / 2) * 100;

        const card = scene.add.rectangle(x, y, 350, 80, QM_COLORS.cardBg);
        card.setOrigin(0, 0);
        card.setStrokeStyle(2, QM_COLORS.textMuted);

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

        const card = scene.add.rectangle(x, y, 220, 85, unlocked ? QM_COLORS.cardBg : QM_COLORS.background);
        card.setOrigin(0, 0);
        card.setStrokeStyle(2, unlocked ? QM_COLORS.success : QM_COLORS.textMuted);

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
    clearScene(scene);
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
        card.setStrokeStyle(2, QM_COLORS.textMuted);

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
    console.log('showLevelSelect called, scene:', scene);
    clearScene(scene);
    currentScene = 'level-select';

    // Level definition - all tricks (colors harmonized with blue app gradient #1CB0F6 → #0891B2)
    const levels = [
        { id: 1, name: 'Multiply by 11', icon: '×11', desc: 'Learn the pattern trick', color: 0x1CB0F6 },   // Primary Blue
        { id: 2, name: 'Square Numbers', icon: '5²', desc: 'Numbers ending in 5', color: 0x06B6D4 },        // Cyan
        { id: 3, name: 'Double & Half', icon: '×÷', desc: 'Smart shortcuts', color: 0x0EA5E9 },            // Sky Blue
        { id: 4, name: 'Base Method', icon: '~10', desc: 'Near 10, 100...', color: 0x0891B2 },             // Secondary Blue
        { id: 5, name: 'Multiply by 9', icon: '×9', desc: 'Finger trick magic', color: 0x06D6A0 },         // Mint Green
        { id: 6, name: 'Multiply by 5', icon: '×5', desc: 'Half of ×10', color: 0x10B981 },                // Emerald
        { id: 7, name: 'Multiply by 4', icon: '2²', desc: 'Double, double!', color: 0x8B5CF6 },            // Vibrant Purple
        { id: 8, name: 'Multiply by 6', icon: '×6', desc: 'Even pattern', color: 0xEC4899 },              // Vibrant Pink
        { id: 9, name: 'Multiply by 8', icon: '×8', desc: 'Triple double', color: 0xF97316 },              // Warm Orange
        { id: 10, name: 'Multiply by 12', icon: '×12', desc: 'Split & add', color: 0xEF4444 },            // Bright Red
        { id: 11, name: 'Multiply by 15', icon: '×15', desc: '10 + half', color: 0x14B8A6 },              // Teal
        { id: 12, name: 'Multiply by 25', icon: '×25', desc: 'Quarter trick', color: 0x3B82F6 },             // Vibrant Blue
        { id: 13, name: 'Multiply by 99', icon: '×99', desc: 'n×100−n shortcut', color: 0x7C3AED },          // Violet
        { id: 14, name: '×11 Extended', icon: '11++', desc: 'With carry logic', color: 0x0284C7 },           // Sky Blue
        { id: 15, name: 'Differ by 2', icon: 'n±1', desc: 'Sandwich squares', color: 0xD97706 },             // Amber
        { id: 16, name: 'Same Tens', icon: 'ab', desc: 'Ones sum to 10', color: 0x059669 }                    // Emerald
    ];

    // Responsive grid layout configuration based on scene width
    const isMobile = scene.scale.width < 600;
    const CARDS_PER_PAGE = 10;   // 2 cols × 5 rows

    let cardWidth, cardHeight, rowGap, colGap;

    if (isMobile) {
        // Mobile: smaller cards to fit screen
        cardWidth = Math.min(280, scene.scale.width - 40);
        cardHeight = 75;
        rowGap = 6;
        colGap = 10;
    } else {
        // Desktop/Tablet: standard card sizes
        cardWidth = Math.max(300, Math.min(340, (scene.scale.width - 80) / 2));
        cardHeight = 85;
        rowGap = 8;
        colGap = Math.max(15, scene.scale.width * 0.02);
    }

    const gridWidth = 2 * cardWidth + colGap;
    const startX = (scene.scale.width - gridWidth) / 2;
    const startY = Math.max(60, scene.scale.height * 0.1);

    let currentPage = 0;
    const totalPages = Math.ceil(levels.length / CARDS_PER_PAGE);
    let cardElements = [];     // Track all card display objects for destruction
    let pageDots = [];         // Track page indicator dots

    // Function to render a specific page
    function renderPage(pageNum) {
        // Destroy existing card elements
        cardElements.forEach(element => {
            if (element && element.destroy) {
                element.destroy();
            }
        });
        cardElements = [];

        const pageStart = pageNum * CARDS_PER_PAGE;
        const pageEnd = Math.min(pageStart + CARDS_PER_PAGE, levels.length);

        for (let i = pageStart; i < pageEnd; i++) {
            const localIndex = i - pageStart;
            const col = localIndex % 2;
            const row = Math.floor(localIndex / 2);
            const x = startX + col * (cardWidth + colGap);
            const y = startY + row * (cardHeight + rowGap);
            const elementsCreated = createProfessionalCard(scene, x, y, levels[i], cardWidth, cardHeight);
            cardElements.push(...elementsCreated);
        }

        // Update page dots
        updatePageDots();
    }

    // Function to update page indicator dots
    function updatePageDots() {
        const dotRadius = 6;
        const dotSpacing = 18;
        const totalDotsWidth = totalPages * dotSpacing;
        const dotsStartX = (scene.scale.width - totalDotsWidth) / 2 + dotRadius;

        // Destroy old dots
        pageDots.forEach(dot => {
            if (dot && dot.destroy) {
                dot.destroy();
            }
        });
        pageDots = [];

        // Create new dots
        for (let i = 0; i < totalPages; i++) {
            const dotX = dotsStartX + i * dotSpacing;
            const dotY = 600;
            const fillColor = i === currentPage ? 0x1E293B : 0xD1D5DB;
            const dot = scene.add.circle(dotX, dotY, dotRadius, fillColor);
            pageDots.push(dot);
        }
    }

    // Header: Title and Progress button
    scene.add.text(80, 30, '⚡ Quick Math Tricks', {
        fontSize: '32px',
        fill: '#1E293B',
        fontFamily: 'Arial',
        fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Progress button (top-right, compact)
    createModernButton(scene, 820, 30, '🏆 Progress', QM_COLORS.secondary, () => {
        playSound('click');
        showProgressScreen(scene);
    }, 140, 40, true);

    // Subtitle
    scene.add.text(80, 60, 'Pick a trick to master →', {
        fontSize: '14px',
        fill: '#6B7280',
        fontFamily: 'Arial'
    }).setOrigin(0, 0.5);

    // Create pagination controls (only if more than 1 page)
    let prevBtnObj, nextBtnObj;
    if (totalPages > 1) {
        prevBtnObj = createModernButton(scene, 150, 590, '← Prev', QM_COLORS.secondary, () => {
            playSound('click');
            if (currentPage > 0) {
                currentPage--;
                renderPage(currentPage);
                updateButtonStates();
            }
        }, 100, 40, false);

        nextBtnObj = createModernButton(scene, 750, 590, 'Next →', QM_COLORS.secondary, () => {
            playSound('click');
            if (currentPage < totalPages - 1) {
                currentPage++;
                renderPage(currentPage);
                updateButtonStates();
            }
        }, 100, 40, false);
    }

    // Function to update button disabled states based on current page
    function updateButtonStates() {
        if (totalPages <= 1) return;

        // Disable prev button on first page
        if (prevBtnObj) {
            const prevBtn = prevBtnObj.button;
            if (currentPage === 0) {
                prevBtn.setAlpha(0.4);
                prevBtn.disableInteractive();
            } else {
                prevBtn.setAlpha(1);
                prevBtn.setInteractive({ useHandCursor: true });
            }
        }

        // Disable next button on last page
        if (nextBtnObj) {
            const nextBtn = nextBtnObj.button;
            if (currentPage === totalPages - 1) {
                nextBtn.setAlpha(0.4);
                nextBtn.disableInteractive();
            } else {
                nextBtn.setAlpha(1);
                nextBtn.setInteractive({ useHandCursor: true });
            }
        }
    }

    // Render first page
    renderPage(0);
    updateButtonStates();
}

// Modern Card Design - Enhanced with gradient, better typography, and smooth interactions
// Returns an array of all card elements so they can be tracked and destroyed on page change
function createProfessionalCard(scene, x, y, level, cardWidth, cardHeight) {
    console.log('createProfessionalCard called for level:', level.id, level.name, 'at y:', y);

    const cardElements = [];

    // Main card background with subtle gradient effect
    const cardBg = scene.add.rectangle(x, y, cardWidth, cardHeight, 0xFFFFFF);
    cardBg.setOrigin(0, 0);
    cardBg.setStrokeStyle(2, level.color);
    cardBg.setInteractive({ useHandCursor: true });
    cardElements.push(cardBg);

    // Gradient overlay (subtle color tint at top using a semi-transparent rectangle)
    const gradientOverlay = scene.add.rectangle(x, y, cardWidth, cardHeight * 0.3, level.color, 0.08);
    gradientOverlay.setOrigin(0, 0);
    cardElements.push(gradientOverlay);

    // Colored accent bar at top (more prominent)
    const accentBar = scene.add.rectangle(x, y, cardWidth, 3, level.color);
    accentBar.setOrigin(0, 0);
    cardElements.push(accentBar);

    // Icon zone: Larger, more prominent circular background
    const iconX = x + 32;
    const iconY = y + cardHeight / 2;
    const iconCircle = scene.add.circle(iconX, iconY, 28, level.color, 0.15);
    iconCircle.setStrokeStyle(2, level.color);
    cardElements.push(iconCircle);

    const iconText = scene.add.text(iconX, iconY, level.icon, {
        fontSize: '22px',
        fill: '#' + level.color.toString(16).padStart(6, '0').toUpperCase(),
        fontFamily: "'Nunito', Arial, sans-serif",
        fontStyle: 'bold',
        resolution: 2
    }).setOrigin(0.5);
    cardElements.push(iconText);

    // Title zone: Better typography hierarchy
    const titleX = x + 68;
    const titleY = y + 10;

    const titleText = scene.add.text(titleX, titleY, level.name, {
        fontSize: '17px',
        fill: '#' + level.color.toString(16).padStart(6, '0').toUpperCase(),
        fontFamily: "'Nunito', Arial, sans-serif",
        fontStyle: 'bold',
        resolution: 2
    }).setOrigin(0, 0);
    cardElements.push(titleText);

    // Horizontal separator line
    const separator = scene.add.line(x + titleX, titleY + 22, 0, 0, cardWidth - titleX - 50, 0, 0xE5E7EB);
    separator.setOrigin(0, 0);
    cardElements.push(separator);

    // Description: More prominent with better styling
    const descText = scene.add.text(titleX, titleY + 30, level.desc, {
        fontSize: '12px',
        fill: '#4B5563',
        fontFamily: "'Nunito', Arial, sans-serif",
        fontStyle: 'normal',
        resolution: 2
    }).setOrigin(0, 0);
    cardElements.push(descText);

    // Stars row (right side): More prominent with animation support
    const earnedStars = playerProgress.levelStars[level.id] || 0;
    const starsX = x + cardWidth - 62;
    const starsY = y + 12;

    // Star container for better organization
    for (let i = 0; i < 3; i++) {
        const starBg = scene.add.rectangle(starsX + i * 18, starsY + 8, 14, 14, i < earnedStars ? level.color : 0xF3F4F6, 0.2);
        starBg.setStrokeStyle(1.5, i < earnedStars ? level.color : '#D1D5DB');
        cardElements.push(starBg);

        const star = scene.add.text(starsX + i * 18, starsY + 8, i < earnedStars ? '★' : '☆', {
            fontSize: '14px',
            fill: i < earnedStars ? '#' + level.color.toString(16).padStart(6, '0').toUpperCase() : '#9CA3AF',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        cardElements.push(star);
    }

    // Hover interaction: Smooth scale and color effects
    const onCardHover = () => {
        // Lift effect
        scene.tweens.killTweensOf(cardBg);
        scene.tweens.add({
            targets: cardBg,
            scaleX: 1.02,
            scaleY: 1.02,
            duration: 200,
            ease: 'Power2.easeOut'
        });

        // Enhanced border
        cardBg.setStrokeStyle(3, level.color);

        // Enhance gradient overlay
        gradientOverlay.setAlpha(0.15);
    };

    const onCardOut = () => {
        // Reset effects
        scene.tweens.killTweensOf(cardBg);
        scene.tweens.add({
            targets: cardBg,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            ease: 'Power2.easeOut'
        });

        // Reset border
        cardBg.setStrokeStyle(2, level.color);

        // Reset gradient overlay
        gradientOverlay.setAlpha(0.08);
    };

    cardBg.on('pointerover', onCardHover);
    cardBg.on('pointerout', onCardOut);

    // Click handler with brief pulse animation
    cardBg.on('pointerdown', () => {
        console.log('Card clicked:', level.id);
        currentLevel = level.id;

        // Brief scale pulse: 1 → 1.04 → 1 over 120ms
        scene.tweens.add({
            targets: cardBg,
            scaleX: 1.04,
            scaleY: 1.04,
            duration: 60,
            yoyo: true,
            onComplete: () => {
                showTutorial(scene, level.id);
            }
        });
    });

    console.log('Card created for level:', level.id);
    return cardElements;
}

// ==================== TUTORIAL (Level 1: Multiply by 11) ====================
function showTutorial(scene, levelId) {
    clearScene(scene);
    currentScene = 'tutorial';

    if (levelId === 1) {
        tutorialMultiplyBy11(scene);
    } else if (levelId === 2) {
        tutorialSquareEndingIn5(scene);
    } else if (levelId === 3) {
        tutorialDoubleAndHalf(scene);
    } else if (levelId === 4) {
        tutorialBaseMethod(scene);
    } else if (levelId === 5) {
        tutorialMultiplyBy9(scene);
    } else if (levelId === 6) {
        tutorialMultiplyBy5(scene);
    } else if (levelId === 7) {
        tutorialMultiplyBy4(scene);
    } else if (levelId === 8) {
        tutorialMultiplyBy6(scene);
    } else if (levelId === 9) {
        tutorialMultiplyBy8(scene);
    } else if (levelId === 10) {
        tutorialMultiplyBy12(scene);
    } else if (levelId === 11) {
        tutorialMultiplyBy15(scene);
    } else if (levelId === 12) {
        tutorialMultiplyBy25(scene);
    } else if (levelId === 13) {
        tutorialMultiplyBy99(scene);
    } else if (levelId === 14) {
        tutorialMultiplyBy11Extended(scene);
    } else if (levelId === 15) {
        tutorialDifferBy2(scene);
    } else if (levelId === 16) {
        tutorialSameTens(scene);
    }
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
        clearScene(scene);

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
                fill: '#1CB0F6',
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
        clearScene(scene);

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
                fill: '#1CB0F6',
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
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
            text: 'Multiply numbers CLOSE to 10, 100, 1000 using a clever shortcut!',
            example: ''
        },
        {
            title: 'What is "Base"?',
            text: 'Base means a NUMBER that\'s easy to work with.\nExamples: 10, 100, 1000\n\nWe start with the BASE!',
            example: 'We use 10 as our base!'
        },
        {
            title: 'What is "Close to Base"?',
            text: 'Numbers like 7, 8, 9, 11, 12, 13 are all close to 10.\n\nWe find the DISTANCE from 10.',
            example: '9 is -1 from 10\n11 is +1 from 10'
        },
        {
            title: 'Example: 9 × 11',
            text: 'Step 1: Find each number\'s distance from 10\n9 = 10 - 1 → deviation = -1\n11 = 10 + 1 → deviation = +1',
            example: 'd₁ = -1, d₂ = +1'
        },
        {
            title: 'Step 2: Find the LEFT part',
            text: 'LEFT = First number + Second deviation\nLEFT = 9 + (+1) = 10\n\nThis is the TENS part of our answer!',
            example: 'LEFT = 10'
        },
        {
            title: 'Step 3: Find the RIGHT part',
            text: 'RIGHT = Multiply the two deviations\nRIGHT = (-1) × (+1) = -1\n\nThis is the UNITS part (but it\'s negative!)',
            example: 'RIGHT = -1'
        },
        {
            title: 'Step 4: Fix the Negative',
            text: 'When RIGHT is negative, we BORROW from LEFT:\nLEFT = 10 - 1 = 9\nRIGHT = 10 + (-1) = 9\n\nNow LEFT = 9 and RIGHT = 9',
            example: 'LEFT=9, RIGHT=9'
        },
        {
            title: 'Step 5: Join the Answer!',
            text: 'Put LEFT and RIGHT together:\n9 and 9 → 99 ✓\n\nSo: 9 × 11 = 99!',
            example: '9 × 11 = 99 🎉'
        },
        {
            title: 'More Examples!',
            text: '8 × 12: d=-2,+2 → LEFT=8+2=10, RIGHT=(-2)(+2)=-4 → borrow → LEFT=9, RIGHT=6 → 96\n7 × 13: d=-3,+3 → LEFT=7+3=10, RIGHT=(-3)(+3)=-9 → borrow → LEFT=9, RIGHT=1 → 91',
            example: '8×12=96 ✓\n7×13=91 ✓'
        },
        {
            title: 'The Formula!',
            text: 'For numbers near a base:\n1. Find deviations (distance from base)\n2. LEFT = either number + other\'s deviation\n3. RIGHT = multiply the deviations\n4. Fix if needed!\n\n(Base+d₁)(Base+d₂) formula works magic!',
            example: '🎯 Ready to practice!'
        }
    ];

    function showStep() {
        clearScene(scene);

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
            fontSize: '18px',
            fill: '#1E293B',
            fontFamily: 'Arial',
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        // Example
        if (currentStep.example) {
            scene.add.text(450, 390, currentStep.example, {
                fontSize: '38px',
                fill: '#1CB0F6',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                lineSpacing: 8,
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

// ==================== TUTORIAL: MULTIPLY BY 9 ====================
function tutorialMultiplyBy9(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 9 - The Magic Trick!',
            text: 'Learn the EASIEST way to do the 9× table using your FINGERS!',
            example: ''
        },
        {
            title: 'Your Hands Are Magic! ✨',
            text: 'Hold up all 10 fingers.\nTo multiply 3 × 9:\nBend down your 3rd finger.',
            example: '9 × 3 = ?'
        },
        {
            title: 'Count the Fingers!',
            text: 'On the LEFT of the bent finger: 2 fingers\nOn the RIGHT of the bent finger: 7 fingers\n\nAnswer: 27!',
            example: '9 × 3 = 27 ✓'
        },
        {
            title: 'Try Another: 9 × 4',
            text: 'Bend your 4th finger.\nLeft side: 3 fingers\nRight side: 6 fingers\n\nAnswer?',
            example: '9 × 4 = 36'
        },
        {
            title: 'Try Another: 9 × 7',
            text: 'Bend your 7th finger.\nLeft side: 6 fingers\nRight side: 3 fingers\n\nAnswer?',
            example: '9 × 7 = 63'
        },
        {
            title: 'The Pattern!',
            text: 'Number being multiplied by 9 = TENS digit\nBend that finger\nLefthand fingers = TENS\nRighthand fingers = ONES\n\nIt always works!',
            example: '✨ Your hands are a calculator! ✨'
        },
        {
            title: 'Cool Pattern!',
            text: 'Look at the 9× answers:\n9, 18, 27, 36, 45, 54, 63, 72, 81, 90\n\nNotice: tens + ones always = 9!\n2+7=9, 3+6=9, 4+5=9',
            example: '🎯 The digit sum is always 9!'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 5);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 5 ====================
function tutorialMultiplyBy5(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 5 - Simple & Fast!',
            text: 'Learn the QUICKEST way to multiply any number by 5!',
            example: ''
        },
        {
            title: 'The Trick: Multiply by 10, then Divide by 2',
            text: 'Multiplying by 5 is just HALF of multiplying by 10!\n\n24 × 5 = 24 × 10 ÷ 2',
            example: '24 × 5 = ?'
        },
        {
            title: 'Step 1: Multiply by 10',
            text: 'To multiply by 10, just add a ZERO!\n\n24 × 10 = 240',
            example: '240'
        },
        {
            title: 'Step 2: Divide by 2 (Cut in Half)',
            text: 'Now CUT that number in HALF:\n240 ÷ 2 = 120',
            example: '120'
        },
        {
            title: 'Final Answer!',
            text: 'So 24 × 5 = 120\n\nCheck: 24 × 5 = 20 × 5 + 4 × 5\n= 100 + 20 = 120 ✓',
            example: '24 × 5 = 120'
        },
        {
            title: 'More Examples!',
            text: '18 × 5 = 18 × 10 ÷ 2 = 180 ÷ 2 = 90\n16 × 5 = 16 × 10 ÷ 2 = 160 ÷ 2 = 80\n32 × 5 = 32 × 10 ÷ 2 = 320 ÷ 2 = 160',
            example: '✨ So Fast! ✨'
        },
        {
            title: 'The Pattern!',
            text: 'Any number × 5 = That number × 10 ÷ 2\n\nOr: Multiply by 10 (add zero)\nthen halve the result!\n\nWorks for ANY number!',
            example: '🎯 Ready to practice!'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 6);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 4 ====================
function tutorialMultiplyBy4(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 4 - Double, Double!',
            text: 'Learn the easiest way to multiply ANY number by 4!',
            example: ''
        },
        {
            title: 'The Secret: Double, Then Double Again!',
            text: 'Multiplying by 4 is just doubling TWICE!\n\nExample: 4 × 3 = ?',
            example: '4 × 3 = ?'
        },
        {
            title: 'Step 1: First Double',
            text: 'Start with the number: 3\nDouble it: 3 × 2 = 6',
            example: '6'
        },
        {
            title: 'Step 2: Double Again!',
            text: 'Now double that result:\n6 × 2 = 12\n\nDone!',
            example: '4 × 3 = 12 ✓'
        },
        {
            title: 'Try Another: 4 × 5',
            text: 'Double 5 = 10\nDouble 10 = 20\n\nAnswer:',
            example: '4 × 5 = 20'
        },
        {
            title: 'Try Another: 4 × 8',
            text: 'Double 8 = 16\nDouble 16 = 32\n\nAnswer:',
            example: '4 × 8 = 32'
        },
        {
            title: 'The Pattern!',
            text: 'Any number × 4:\nDouble it\nThen double the result\n\nIt works for ANY number!\n23 × 4 = 46 → 92',
            example: '✨ Double, Double! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 7);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 6 ====================
function tutorialMultiplyBy6(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 6 - The Pattern Trick!',
            text: 'Learn a cool pattern for multiplying even numbers by 6!',
            example: ''
        },
        {
            title: 'Special Trick for Even Numbers',
            text: 'When you multiply 6 by an EVEN number,\nthere\'s a MAGIC PATTERN!\n\nExample: 6 × 4 = ?',
            example: '6 × 4 = ?'
        },
        {
            title: 'The Pattern!',
            text: 'The answer ends with the SAME number you multiplied by!\n\n6 × 4 ends in: 4',
            example: '_ 4'
        },
        {
            title: 'The Tens Digit!',
            text: 'The tens digit is HALF of the ones digit!\n\nHalf of 4 = 2\n\nSo the answer is:',
            example: '24'
        },
        {
            title: 'Try Another: 6 × 6',
            text: 'Ends in 6\nTens digit = half of 6 = 3\n\nAnswer:',
            example: '6 × 6 = 36'
        },
        {
            title: 'Try Another: 6 × 8',
            text: 'Ends in 8\nTens digit = half of 8 = 4\n\nAnswer:',
            example: '6 × 8 = 48'
        },
        {
            title: 'The Pattern For Even Numbers!',
            text: 'When multiplying 6 by an even number:\nOnes digit = the even number\nTens digit = half of that number\n\n6 × 2 = 12\n6 × 4 = 24\n6 × 8 = 48',
            example: '✨ Pattern Magic! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 8);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 8 ====================
function tutorialMultiplyBy8(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 8 - Triple Double!',
            text: 'Learn to multiply by 8 using three DOUBLINGS!',
            example: ''
        },
        {
            title: 'The Secret: Double THREE Times!',
            text: 'Multiplying by 8 is just doubling 3 times!\n\nExample: 8 × 3 = ?',
            example: '8 × 3 = ?'
        },
        {
            title: 'Step 1: First Double',
            text: 'Start with 3\nDouble it: 3 × 2 = 6',
            example: '6'
        },
        {
            title: 'Step 2: Second Double',
            text: 'Double that result:\n6 × 2 = 12',
            example: '12'
        },
        {
            title: 'Step 3: Third Double!',
            text: 'Double one more time:\n12 × 2 = 24\n\nDone!',
            example: '8 × 3 = 24 ✓'
        },
        {
            title: 'Try Another: 8 × 4',
            text: 'Double 4 = 8\nDouble 8 = 16\nDouble 16 = 32\n\nAnswer:',
            example: '8 × 4 = 32'
        },
        {
            title: 'Try Another: 8 × 5',
            text: 'Double 5 = 10\nDouble 10 = 20\nDouble 20 = 40\n\nAnswer:',
            example: '8 × 5 = 40'
        },
        {
            title: 'The Pattern!',
            text: 'Any number × 8:\nDouble it\nDouble the result\nDouble one more time\n\n23 × 8 = 46 → 92 → 184',
            example: '✨ Triple Double! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 9);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 12 ====================
function tutorialMultiplyBy12(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 12 - Simple Split!',
            text: 'Learn to multiply by 12 using a super easy trick!',
            example: ''
        },
        {
            title: 'The Secret: 12 = 10 + 2',
            text: 'We can split 12 into 10 and 2.\n\nSo: Any number × 12 = (×10) + (×2)\n\nExample: 12 × 7 = ?',
            example: '12 × 7 = ?'
        },
        {
            title: 'Step 1: Multiply by 10',
            text: 'Multiply by 10 is easy!\nJust add a ZERO:\n\n7 × 10 = 70',
            example: '70'
        },
        {
            title: 'Step 2: Multiply by 2',
            text: 'Now multiply by 2 (just double):\n\n7 × 2 = 14',
            example: '14'
        },
        {
            title: 'Step 3: Add Them Together!',
            text: 'Add the two results:\n70 + 14 = 84\n\nDone!',
            example: '12 × 7 = 84 ✓'
        },
        {
            title: 'Try Another: 12 × 5',
            text: '5 × 10 = 50\n5 × 2 = 10\n50 + 10 = 60\n\nAnswer:',
            example: '12 × 5 = 60'
        },
        {
            title: 'Try Another: 12 × 9',
            text: '9 × 10 = 90\n9 × 2 = 18\n90 + 18 = 108\n\nAnswer:',
            example: '12 × 9 = 108'
        },
        {
            title: 'The Pattern!',
            text: 'Any number × 12:\n1. Multiply by 10 (add zero)\n2. Multiply by 2 (double)\n3. Add the results!\n\n23 × 12 = 230 + 46 = 276',
            example: '✨ Split & Add! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 10);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 15 ====================
function tutorialMultiplyBy15(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 15 - Magic Doubling!',
            text: 'Learn a clever trick to multiply by 15!',
            example: ''
        },
        {
            title: 'The Secret: Multiply by 10, Then Add Half!',
            text: 'Multiply by 15 = Multiply by 10, then add HALF of that!\n\nExample: 15 × 4 = ?',
            example: '15 × 4 = ?'
        },
        {
            title: 'Step 1: Multiply by 10',
            text: 'First, multiply by 10:\nJust add a ZERO!\n\n4 × 10 = 40',
            example: '40'
        },
        {
            title: 'Step 2: Find the Half',
            text: 'Now find HALF of that result:\n\nHalf of 40 = 20',
            example: '20'
        },
        {
            title: 'Step 3: Add Them Together!',
            text: 'Add the two numbers:\n40 + 20 = 60\n\nDone!',
            example: '15 × 4 = 60 ✓'
        },
        {
            title: 'Try Another: 15 × 6',
            text: '6 × 10 = 60\nHalf of 60 = 30\n60 + 30 = 90\n\nAnswer:',
            example: '15 × 6 = 90'
        },
        {
            title: 'Try Another: 15 × 8',
            text: '8 × 10 = 80\nHalf of 80 = 40\n80 + 40 = 120\n\nAnswer:',
            example: '15 × 8 = 120'
        },
        {
            title: 'The Pattern!',
            text: 'Any number × 15:\n1. Multiply by 10 (add zero)\n2. Find half of that\n3. Add them together!\n\n12 × 15 = 120 + 60 = 180',
            example: '✨ 10 + Half = 15! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 11);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 25 ====================
function tutorialMultiplyBy25(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 25 - The Quarter Trick!',
            text: 'Learn the FASTEST way to multiply by 25!',
            example: ''
        },
        {
            title: 'What is 25?',
            text: '25 = One QUARTER of 100\n\nSo: Any number × 25 = (×100) ÷ 4\n\nExample: 25 × 12 = ?',
            example: '25 × 12 = ?'
        },
        {
            title: 'Step 1: Multiply by 100',
            text: 'Multiply by 100 is SUPER easy!\nJust add TWO ZEROS:\n\n12 × 100 = 1200',
            example: '1200'
        },
        {
            title: 'Step 2: Divide by 4',
            text: 'Now divide by 4.\nDividing by 4 = halving TWICE\n\n1200 ÷ 2 = 600\n600 ÷ 2 = 300',
            example: '300'
        },
        {
            title: 'Final Answer!',
            text: 'So: 25 × 12 = 300\n\nDone!',
            example: '25 × 12 = 300 ✓'
        },
        {
            title: 'Try Another: 25 × 8',
            text: '8 × 100 = 800\n800 ÷ 2 = 400\n400 ÷ 2 = 200\n\nAnswer:',
            example: '25 × 8 = 200'
        },
        {
            title: 'Try Another: 25 × 16',
            text: '16 × 100 = 1600\n1600 ÷ 2 = 800\n800 ÷ 2 = 400\n\nAnswer:',
            example: '25 × 16 = 400'
        },
        {
            title: 'The Pattern!',
            text: 'Any number × 25:\n1. Multiply by 100 (add 00)\n2. Divide by 4 (half, then half)\n\nUseful for money! 4 quarters = $1\n25¢ × 12 = $3.00',
            example: '✨ Quarters Magic! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        // Title
        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
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
                fill: '#1CB0F6',
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
                showPractice(scene, 12);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 99 ====================
function tutorialMultiplyBy99(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Multiply by 99 - The n×100−n Trick!',
            text: 'Learn the shortcut for multiplying any number by 99!',
            example: ''
        },
        {
            title: 'The Secret: n×100 minus n',
            text: 'Instead of multiplying by 99,\nthink of it as:\nn × 100 − n\n\nExample: 47 × 99 = ?',
            example: '47 × 99 = ?'
        },
        {
            title: 'Step 1: Multiply by 100',
            text: '47 × 100 = 4700',
            example: '4700'
        },
        {
            title: 'Step 2: Subtract the original',
            text: '4700 − 47 = 4653',
            example: '4653'
        },
        {
            title: 'Try Another: 23 × 99',
            text: '23 × 100 = 2300\n2300 − 23 = 2277\n\nAnswer:',
            example: '23 × 99 = 2277'
        },
        {
            title: 'The Pattern!',
            text: 'For ANY number × 99:\nMultiply by 100\nSubtract the number\n\n56 × 99 = 5600 − 56 = 5544',
            example: '✨ Fast Calculation! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
            fontFamily: "'Nunito', Arial, sans-serif",
            fontStyle: 'bold'
        }).setOrigin(0.5);

        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#1E293B',
            fontFamily: "'Nunito', Arial, sans-serif",
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#1CB0F6',
                fontFamily: "'Nunito', Arial, sans-serif",
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#475569',
            fontFamily: "'Nunito', Arial, sans-serif"
        }).setOrigin(0.5);

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
                showPractice(scene, 13);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: MULTIPLY BY 11 EXTENDED ====================
function tutorialMultiplyBy11Extended(scene) {
    let step = 0;

    const steps = [
        {
            title: '×11 Extended - With Carry!',
            text: 'Learn the ×11 trick when the middle digit causes a carry!',
            example: ''
        },
        {
            title: 'Review: Basic ×11',
            text: 'Remember: separate digits then add middle\n\n23 × 11:\nFirst digit = 2\nMiddle = 2+3 = 5\nLast = 3\nAnswer: 253',
            example: '23 × 11 = 253'
        },
        {
            title: 'What About Larger Middle?',
            text: 'When the middle sum ≥ 10, we need a CARRY!\n\n76 × 11:\nFirst = 7, Middle = 7+6 = 13 (carry!)',
            example: '76 × 11 = ?'
        },
        {
            title: 'Step 1: Handle the Carry',
            text: 'Middle = 7+6 = 13\nWe write 3 and carry 1:\n7+1 = 8 (hundreds place)',
            example: '8_3'
        },
        {
            title: 'Complete Answer',
            text: 'Hundreds: 7+1 = 8\nTens: 3\nOnes: 6\n\nAnswer:',
            example: '76 × 11 = 836'
        },
        {
            title: 'Try Another: 85 × 11',
            text: 'First = 8\nMiddle = 8+5 = 13\nCarry: 8+1 = 9\nAnswer: 9_5',
            example: '85 × 11 = 935'
        },
        {
            title: 'The Pattern!',
            text: 'Add the digits\nIf sum ≥ 10:\n  Write ones digit\n  Carry 1 to first digit\n\nWorks for ALL 2-digit numbers!',
            example: '✨ Carry Logic! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
            fontFamily: "'Nunito', Arial, sans-serif",
            fontStyle: 'bold'
        }).setOrigin(0.5);

        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#1E293B',
            fontFamily: "'Nunito', Arial, sans-serif",
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#1CB0F6',
                fontFamily: "'Nunito', Arial, sans-serif",
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#475569',
            fontFamily: "'Nunito', Arial, sans-serif"
        }).setOrigin(0.5);

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
                showPractice(scene, 14);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: DIFFER BY 2 ====================
function tutorialDifferBy2(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Differ by 2 - Sandwich Squares!',
            text: 'Multiply two numbers that differ by 2 using squares!',
            example: ''
        },
        {
            title: 'The Identity',
            text: 'n × (n+2) = (n+1)² − 1\n\nWhy? Because:\n(n+1)² = n² + 2n + 1\nSubtract 1: n² + 2n\nWhich is n × (n+2)!',
            example: 'n × (n+2) = (n+1)² − 1'
        },
        {
            title: 'Example: 7 × 9',
            text: 'Numbers differ by 2\nMiddle number = 8\n\n7 × 9 = 8² − 1\n8² = 64\n64 − 1 = ?',
            example: '7 × 9 = ?'
        },
        {
            title: 'Solution',
            text: '8² = 64\n64 − 1 = 63\n\nAnswer:',
            example: '7 × 9 = 63'
        },
        {
            title: 'Try Another: 14 × 16',
            text: 'Middle = 15\n15² = 225\n225 − 1 = 224\n\nAnswer:',
            example: '14 × 16 = 224'
        },
        {
            title: 'The Pattern!',
            text: 'For ANY n and (n+2):\nFind the middle number\nSquare it\nSubtract 1\n\nAlways works!',
            example: '✨ Sandwich Squares! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
            fontFamily: "'Nunito', Arial, sans-serif",
            fontStyle: 'bold'
        }).setOrigin(0.5);

        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#1E293B',
            fontFamily: "'Nunito', Arial, sans-serif",
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#1CB0F6',
                fontFamily: "'Nunito', Arial, sans-serif",
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#475569',
            fontFamily: "'Nunito', Arial, sans-serif"
        }).setOrigin(0.5);

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
                showPractice(scene, 15);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== TUTORIAL: SAME TENS ====================
function tutorialSameTens(scene) {
    let step = 0;

    const steps = [
        {
            title: 'Same Tens - Ones Sum to 10!',
            text: 'Multiply numbers with same tens digit where ones sum to 10!',
            example: ''
        },
        {
            title: 'The Condition',
            text: 'Numbers like: 23 and 27\nSame tens digit = 2\nOnes digits: 3 + 7 = 10\n\nThere\'s a MAGIC PATTERN!',
            example: ''
        },
        {
            title: 'The Formula',
            text: 'Left part: T × (T+1)\nRight part: A × (10−A)\nConcat them!\n\nExample: 23 × 27\nT=2, A=3',
            example: 'T × (T+1) | A × (10−A)'
        },
        {
            title: 'Worked Example: 23 × 27',
            text: 'Left = 2 × 3 = 6\nRight = 3 × 7 = 21\nConcat: 621\n\nAnswer:',
            example: '23 × 27 = 621'
        },
        {
            title: 'Try Another: 44 × 46',
            text: 'T=4, A=4\nLeft = 4 × 5 = 20\nRight = 4 × 6 = 24\nConcat: 2024\n\nAnswer:',
            example: '44 × 46 = 2024'
        },
        {
            title: 'The Pattern!',
            text: 'Same tens, ones sum to 10:\nMultiply tens digit by (tens+1)\nMultiply ones digits\nWrite left then right!\n\n83 × 87 = 7221',
            example: '✨ Magic Pattern! ✨'
        }
    ];

    function showStep() {
        clearScene(scene);

        const currentStep = steps[step];

        scene.add.text(450, 60, currentStep.title, {
            fontSize: '36px',
            fill: '#1CB0F6',
            fontFamily: "'Nunito', Arial, sans-serif",
            fontStyle: 'bold'
        }).setOrigin(0.5);

        scene.add.text(450, 200, currentStep.text, {
            fontSize: '20px',
            fill: '#1E293B',
            fontFamily: "'Nunito', Arial, sans-serif",
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        if (currentStep.example) {
            scene.add.text(450, 380, currentStep.example, {
                fontSize: '40px',
                fill: '#1CB0F6',
                fontFamily: "'Nunito', Arial, sans-serif",
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 2,
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);
        }

        scene.add.text(450, 520, `Step ${step + 1} of ${steps.length}`, {
            fontSize: '18px',
            fill: '#475569',
            fontFamily: "'Nunito', Arial, sans-serif"
        }).setOrigin(0.5);

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
                showPractice(scene, 16);
            }, 150, 50);
        }
    }

    showStep();
}

// ==================== PRACTICE MODE ====================
function showPractice(scene, levelId) {
    clearScene(scene);
    currentScene = 'practice';

    score = 0;
    let questionsAnswered = 0;
    const totalQuestions = 5;
    let answered = false; // Guard against double-tap on mobile

    // Detect desktop vs mobile
    const isDesktop = !scene.sys.game.device.os.android && !scene.sys.game.device.os.iOS;

    // Responsive positioning
    const centerX = scene.scale.width / 2;
    const isMobileView = scene.scale.width < 600;
    const titleSize = isMobileView ? '28px' : '36px';
    const scoreSize = isMobileView ? '18px' : '24px';
    const titleY = scene.scale.height * 0.06;
    const scoreX = centerX + (isMobileView ? -50 : 250);

    // Title
    scene.add.text(centerX, titleY, '⚡ Practice Time!', {
        fontSize: titleSize,
        fill: '#FDCB6E',
        fontStyle: 'bold',
        fontFamily: "'Nunito', Arial, sans-serif",
        resolution: 2
    }).setOrigin(0.5);

    // Score
    const scoreText = scene.add.text(scoreX, titleY, 'Score: 0/5', {
        fontSize: scoreSize,
        fill: '#fff',
        fontStyle: 'bold',
        fontFamily: "'Nunito', Arial, sans-serif",
        resolution: 2
    }).setOrigin(0.5);

    // Question area
    let questionText, answerText, feedbackText, inputText, keyboardHintText;

    // Keyboard input handler (desktop only)
    function handleKeyInput(event) {
        if (!isDesktop) return;

        // Number keys (0-9)
        if (event.key >= '0' && event.key <= '9' && userAnswer.length < 4) {
            userAnswer += event.key;
            inputText.setText(userAnswer);
        }
        // Backspace
        else if (event.key === 'Backspace') {
            userAnswer = userAnswer.slice(0, -1);
            inputText.setText(userAnswer);
        }
        // Enter to submit
        else if (event.key === 'Enter') {
            checkAnswer();
        }
    }

    // Register keyboard listener
    if (isDesktop) {
        scene.input.keyboard.on('keydown', handleKeyInput);
    }

    function generateQuestion() {
        if (questionsAnswered >= totalQuestions) {
            // Clean up keyboard listener before transitioning
            if (isDesktop) {
                scene.input.keyboard.removeAllListeners();
            }
            showResults(scene, score, totalQuestions, levelId);
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
        } else if (levelId === 5) {
            // Level 5: Multiply by 9 (using finger trick concept)
            const num = Phaser.Math.Between(1, 10);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×9'
            };
            currentQuestion.answer = num * 9;
        } else if (levelId === 6) {
            // Level 6: Multiply by 5 (multiply by 10 then divide by 2)
            const evenNum = Phaser.Math.Between(4, 24) * 2; // 8, 10, 12...48 (all even for easy halving)
            currentQuestion = {
                num: evenNum,
                answer: null,
                type: '×5'
            };
            currentQuestion.answer = evenNum * 5;
        } else if (levelId === 7) {
            // Level 7: Multiply by 4 (double-double)
            const num = Phaser.Math.Between(1, 20);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×4'
            };
            currentQuestion.answer = num * 4;
        } else if (levelId === 8) {
            // Level 8: Multiply by 6 (pattern with even numbers)
            const evenNum = Phaser.Math.Between(2, 15);
            currentQuestion = {
                num: evenNum,
                answer: null,
                type: '×6'
            };
            currentQuestion.answer = evenNum * 6;
        } else if (levelId === 9) {
            // Level 9: Multiply by 8 (triple-double)
            const num = Phaser.Math.Between(1, 15);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×8'
            };
            currentQuestion.answer = num * 8;
        } else if (levelId === 10) {
            // Level 10: Multiply by 12 (10 + 2)
            const num = Phaser.Math.Between(1, 15);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×12'
            };
            currentQuestion.answer = num * 12;
        } else if (levelId === 11) {
            // Level 11: Multiply by 15 (10 + half)
            const num = Phaser.Math.Between(1, 14);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×15'
            };
            currentQuestion.answer = num * 15;
        } else if (levelId === 12) {
            // Level 12: Multiply by 25 (÷4 of ×100)
            const num = Phaser.Math.Between(1, 20);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×25'
            };
            currentQuestion.answer = num * 25;
        } else if (levelId === 13) {
            // Level 13: Multiply by 99 (n × 100 − n)
            const num = Phaser.Math.Between(12, 60);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×99'
            };
            currentQuestion.answer = num * 99;
        } else if (levelId === 14) {
            // Level 14: ×11 Extended (with carry)
            const num = Phaser.Math.Between(57, 99);
            currentQuestion = {
                num: num,
                answer: null,
                type: '×11ext'
            };
            currentQuestion.answer = num * 11;
        } else if (levelId === 15) {
            // Level 15: Differ by 2 (n×(n+2) = (n+1)² − 1)
            const m = Phaser.Math.Between(5, 20);
            const num1 = m - 1;
            const num2 = m + 1;
            currentQuestion = {
                num1: num1,
                num2: num2,
                answer: null,
                type: 'differ'
            };
            currentQuestion.answer = num1 * num2;
        } else if (levelId === 16) {
            // Level 16: Same tens, ones sum to 10
            const T = Phaser.Math.Between(2, 8);
            const A = Phaser.Math.Between(1, 4);
            const num1 = T * 10 + A;
            const num2 = T * 10 + (10 - A);
            currentQuestion = {
                num1: num1,
                num2: num2,
                answer: null,
                type: 'sametens'
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
        } else if (currentQuestion.type === '×9') {
            questionStr = `${currentQuestion.num} × 9 = ?`;
        } else if (currentQuestion.type === '×5') {
            questionStr = `${currentQuestion.num} × 5 = ?`;
        } else if (currentQuestion.type === '×4') {
            questionStr = `${currentQuestion.num} × 4 = ?`;
        } else if (currentQuestion.type === '×6') {
            questionStr = `${currentQuestion.num} × 6 = ?`;
        } else if (currentQuestion.type === '×8') {
            questionStr = `${currentQuestion.num} × 8 = ?`;
        } else if (currentQuestion.type === '×12') {
            questionStr = `${currentQuestion.num} × 12 = ?`;
        } else if (currentQuestion.type === '×15') {
            questionStr = `${currentQuestion.num} × 15 = ?`;
        } else if (currentQuestion.type === '×25') {
            questionStr = `${currentQuestion.num} × 25 = ?`;
        } else if (currentQuestion.type === '×99') {
            questionStr = `${currentQuestion.num} × 99 = ?`;
        } else if (currentQuestion.type === '×11ext') {
            questionStr = `${currentQuestion.num} × 11 = ?`;
        } else if (currentQuestion.type === 'differ') {
            questionStr = `${currentQuestion.num1} × ${currentQuestion.num2} = ?`;
        } else if (currentQuestion.type === 'sametens') {
            questionStr = `${currentQuestion.num1} × ${currentQuestion.num2} = ?`;
        }

        // Responsive positioning for practice questions
        const questionY = scene.scale.height * 0.18;
        const inputBoxY = scene.scale.height * 0.32;
        const questionSize = isMobileView ? '32px' : '44px';
        const inputSize = isMobileView ? '32px' : '40px';
        const inputBoxWidth = Math.min(250, scene.scale.width * 0.55);
        const inputBoxHeight = Math.min(70, scene.scale.height * 0.12);

        questionText = scene.add.text(centerX, questionY, questionStr, {
            fontSize: questionSize,
            fill: '#2D3436',
            fontFamily: "'Nunito', Arial, sans-serif",
            fontStyle: 'bold',
            resolution: 2
        }).setOrigin(0.5);

        // Input box background
        answerText = scene.add.rectangle(centerX, inputBoxY, inputBoxWidth, inputBoxHeight, 0x2d3436);
        answerText.setStrokeStyle(Math.max(1, scene.scale.width / 450), QM_COLORS.buttonBg);

        // Input text
        inputText = scene.add.text(centerX, inputBoxY, '', {
            fontSize: inputSize,
            fill: '#FDCB6E',
            fontStyle: 'bold',
            fontFamily: "'Nunito', Arial, sans-serif",
            resolution: 2
        }).setOrigin(0.5);

        // Responsive feedback positioning
        const feedbackY = inputBoxY + (inputBoxHeight / 2) + 25;
        const numPadY = Math.max(scene.scale.height * 0.45, feedbackY + 40);
        const buttonY = Math.min(scene.scale.height * 0.8, numPadY + 90);
        const feedbackSize = isMobileView ? '18px' : '24px';

        // Keyboard hint (desktop only)
        if (keyboardHintText) keyboardHintText.destroy();
        if (isDesktop) {
            keyboardHintText = scene.add.text(centerX, inputBoxY + (inputBoxHeight / 2) + 12, '⌨ Type your answer and press Enter', {
                fontSize: Math.max(10, scene.scale.width / 80) + 'px',
                fill: '#9CA3AF',
                fontFamily: "'Nunito', Arial, sans-serif"
            }).setOrigin(0.5);
        }

        // Feedback (below input)
        feedbackText = scene.add.text(centerX, feedbackY, '', {
            fontSize: feedbackSize,
            fill: '#fff',
            fontStyle: 'bold',
            fontFamily: "'Nunito', Arial, sans-serif",
            resolution: 2
        }).setOrigin(0.5);

        // Number pad (centered, lower on screen)
        createNumberPad(scene, inputText, centerX, numPadY);

        // Action buttons (bottom) - responsive sizing
        const buttonWidth = Math.max(100, Math.min(140, scene.scale.width * 0.2));
        const buttonHeight = Math.max(40, Math.min(50, scene.scale.height * 0.08));
        const buttonGap = Math.max(20, scene.scale.width * 0.08);

        createButton(scene, centerX - buttonWidth - (buttonGap / 2), buttonY, 'Clear', QM_COLORS.error, () => {
            userAnswer = '';
            inputText.setText('');
        }, buttonWidth, buttonHeight);

        createButton(scene, centerX + buttonWidth + (buttonGap / 2), buttonY, 'Submit', QM_COLORS.success, () => {
            checkAnswer();
        }, buttonWidth, buttonHeight);
    }

    function checkAnswer() {
        if (answered) return; // Prevent double-tap
        answered = true;

        const answer = parseInt(userAnswer);

        if (answer === currentQuestion.answer) {
            score++;
            feedbackText.setText('✓ Correct! +1');
            feedbackText.setColor('#1CB0F6');
            playSound('success'); // Success sound
        } else {
            feedbackText.setText(`✗ Wrong. Answer: ${currentQuestion.answer}`);
            feedbackText.setColor('#FF6B6B');
            playSound('error'); // Error sound
        }

        questionsAnswered++;
        scoreText.setText(`Score: ${score}/${totalQuestions}`);

        scene.time.delayedCall(2000, () => {
            answered = false;
            generateQuestion();
        });
    }

    generateQuestion();
}

// ==================== RESULTS ====================
function showResults(scene, score, total, levelId) {
    clearScene(scene);

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
        fill: passed ? '#1CB0F6' : '#FF6B6B',
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

        scene.add.text(x, starY, filled ? '★' : '☆', {
            fontSize: `${starSize}px`,
            fill: filled ? '#F19C79' : '#DFE6E9',
            fontFamily: 'Arial, sans-serif'
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
    const currentBestStars = playerProgress.levelStars[levelId] || 0;
    if (stars > currentBestStars) {
        playerProgress.levelStars[levelId] = stars;
    }

    // Recalculate total stars
    playerProgress.totalStars = Object.values(playerProgress.levelStars).reduce((a, b) => a + b, 0);

    // Save and check achievements
    saveProgress();
    checkAndUnlockAchievements(scene);

    // Buttons
    createModernButton(scene, 300, 580, 'Try Again', QM_COLORS.primary, () => {
        playSound('click');
        showPractice(scene, levelId);
    }, 180, 50);

    createModernButton(scene, 600, 580, 'Level Select', QM_COLORS.success, () => {
        playSound('click');
        showLevelSelect(scene);
    }, 180, 50);
}

// ==================== NUMBER PAD ====================
function createNumberPad(scene, inputText, centerX = 450, startY = 350) {
    // Responsive button sizing
    const isMobileView = scene.scale.width < 600;
    const buttonSize = isMobileView ? 40 : 55;
    const spacing = buttonSize + (isMobileView ? 8 : 10);
    const fontSize = isMobileView ? '20px' : '26px';

    // Calculate grid positioning
    const gridWidth = 5 * spacing - (isMobileView ? 8 : 10);
    const padStartX = centerX - (gridWidth / 2);

    for (let i = 0; i <= 9; i++) {
        const x = padStartX + (i % 5) * spacing;
        const y = startY + Math.floor(i / 5) * spacing;

        const btn = scene.add.rectangle(x, y, buttonSize, buttonSize, QM_COLORS.buttonBg);
        btn.setInteractive({ useHandCursor: true });
        btn.setStrokeStyle(Math.max(1, scene.scale.width / 450), 0x000);

        const text = scene.add.text(x, y, i, {
            fontSize: fontSize,
            fill: '#000',
            fontStyle: 'bold',
            fontFamily: "'Nunito', Arial, sans-serif",
            resolution: 2
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

// Math Ladder Game - Phaser 3 v2.0  (Infinite Climber Edition)
// Infinite ladder with silly fall animation, streaks, milestones & adaptive difficulty

// ==================== WORLD CONSTANTS ====================
const RUNG_HEIGHT   = 45;
const MAX_RUNGS     = 200;          // effectively infinite
const WORLD_H       = 700 + MAX_RUNGS * RUNG_HEIGHT;   // ~9700 px tall
const GROUND_Y      = WORLD_H - 75;
const LADDER_X      = 148;          // left-panel horizontal centre
const BASE_TIME     = 15;           // seconds per question
const SILLY_DUR     = 3;            // seconds of silly wobble before falling
const SILLY_EMOJIS  = ['😵', '🤪', '🥴', '😅', '🙈', '😵‍💫', '🤣'];

// ==================== GAME STATE ====================
let sceneRef       = null;
let player         = null;
let timerEvent     = null;

let currentQuestion = null;
let userAnswer      = '';
let timeLeft        = BASE_TIME;

let score           = 0;
let currentRung     = 0;
let runBest         = 0;   // highest rung in the current unbroken run
let streak          = 0;

let gameActive   = false;   // true only while awaiting an answer
let isAnimating  = false;   // true during climb/fall tweens
let isSilly      = false;   // true during silly-wobble phase

// UI element refs
let scoreText, rungText, streakText, bestText;
let questionText, feedbackText, inputDisplayText;
let timerBarFill = null;

// Persistent bests (localStorage)
let bestRung  = parseInt(localStorage.getItem('ml_bestRung')  || '0');
let hiScore   = parseInt(localStorage.getItem('ml_hiScore')   || '0');

// ==================== HELPERS ====================
function getRungY(n)   { return GROUND_Y - (n + 1) * RUNG_HEIGHT; }
function getPlayerY(n) { return getRungY(n) - 24; }

function getDiff(rung) {
    if (rung < 5)  return { a: 10, b: 10, ops: ['+'] };
    if (rung < 10) return { a: 15, b: 12, ops: ['+', '-'] };
    if (rung < 20) return { a: 20, b: 15, ops: ['+', '-'] };
    if (rung < 40) return { a: 25, b: 20, ops: ['+', '-'] };
    return              { a: 30, b: 25, ops: ['+', '-'] };
}

function getTimerBarWidth(scene) {
    return scene.scale.width - 315 - 16;   // right-panel bar width
}

function updateTimerBar(scene, pct) {
    if (!timerBarFill) return;
    timerBarFill.width = Math.max(2, getTimerBarWidth(scene) * pct);
    if (pct > 0.5)       timerBarFill.setFillStyle(0x10B981);
    else if (pct > 0.25) timerBarFill.setFillStyle(0xF59E0B);
    else                 timerBarFill.setFillStyle(0xEF4444);
}

function updateInputDisplay() {
    if (inputDisplayText)
        inputDisplayText.setText(userAnswer === '' ? '_ _ _' : userAnswer);
}

function updateStatsUI() {
    if (scoreText)  scoreText.setText(`${score}`);
    if (rungText)   rungText.setText(`${currentRung}`);
    if (streakText) streakText.setText(`🔥 ${streak}`);
}

// ==================== PHASER CONFIG ====================
const config = createGameConfig({
    width:  800,
    height: 600,
    backgroundColor: 0x87CEEB,
    scene: { preload, create, update }
});

const game = new Phaser.Game(config);

// ==================== LIFECYCLE ====================
function preload() {}

function create() {
    sceneRef = this;
    this.cameras.main.setBounds(0, 0, 800, WORLD_H);
    buildWorld(this);
    showStartScreen(this);
}

function update() {
    if (!sceneRef || !player) return;
    // Smooth camera follow — keep player at ~65 % from top
    const targetY  = Math.max(0, Math.min(player.y - 390, WORLD_H - 600));
    sceneRef.cameras.main.scrollY =
        Phaser.Math.Linear(sceneRef.cameras.main.scrollY, targetY, 0.08);
}

// ==================== WORLD CONSTRUCTION ====================
function buildWorld(scene) {
    // Sky colour layers (deepening as you climb)
    scene.add.rectangle(400, WORLD_H * 0.15, 800, WORLD_H * 0.30, 0x1B3A6B).setDepth(0);
    scene.add.rectangle(400, WORLD_H * 0.45, 800, WORLD_H * 0.30, 0x3A7FC1).setDepth(0);
    scene.add.rectangle(400, WORLD_H * 0.75, 800, WORLD_H * 0.50, 0x87CEEB).setDepth(0);

    // Ground
    scene.add.rectangle(400, GROUND_Y + 37, 800, 74, 0x4A7C3F).setDepth(1);
    scene.add.rectangle(400, GROUND_Y + 110, 800, 100, 0x8B4513).setDepth(1);
    scene.add.text(LADDER_X, GROUND_Y + 18, '🌿🌱🌿', { fontSize: '20px' })
        .setOrigin(0.5).setDepth(2);

    // Clouds
    [
        [540, WORLD_H * 0.04], [230, WORLD_H * 0.10], [660, WORLD_H * 0.18],
        [170, WORLD_H * 0.26], [510, WORLD_H * 0.34], [290, WORLD_H * 0.42],
        [640, WORLD_H * 0.50], [140, WORLD_H * 0.58], [490, WORLD_H * 0.66],
        [270, WORLD_H * 0.74], [610, WORLD_H * 0.82],
    ].forEach(([x, y]) =>
        scene.add.text(x, y, '☁️', { fontSize: '30px' })
            .setOrigin(0.5).setDepth(1).setAlpha(0.85)
    );

    // Stars in upper half
    for (let i = 0; i < 28; i++) {
        const x = Phaser.Math.Between(60, 290);
        const y = Phaser.Math.Between(10, WORLD_H * 0.38);
        const big = (i % 5 === 0);
        scene.add.text(x, y, big ? '⭐' : '✨', { fontSize: big ? '18px' : '13px' })
            .setOrigin(0.5).setDepth(1).setAlpha(0.72);
    }

    // Sky-high goal banner
    scene.add.text(LADDER_X, 28, '🌟 SKY HIGH! 🌟', {
        fontSize: '18px', fill: '#FFD700', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5).setDepth(5);

    // Ladder rails (full world height)
    scene.add.rectangle(LADDER_X - 30, WORLD_H / 2, 12, WORLD_H, 0x8B4513).setDepth(2);
    scene.add.rectangle(LADDER_X + 30, WORLD_H / 2, 12, WORLD_H, 0x8B4513).setDepth(2);

    // Rungs — colour-coded milestones, Phaser camera culls off-screen ones
    for (let i = 0; i < MAX_RUNGS; i++) {
        const y = getRungY(i);
        let col = 0xA0522D;
        if (i > 0 && i % 10 === 0) col = 0xFFD700;
        else if (i > 0 && i % 5 === 0) col = 0xC0C0C0;
        scene.add.rectangle(LADDER_X, y, 72, 10, col).setDepth(2);

        if (i > 0 && i % 5 === 0) {
            scene.add.text(LADDER_X + 52, y - 9, `${i}`, {
                fontSize: '13px', fill: '#FFD700', fontFamily: 'Arial',
                fontStyle: 'bold', stroke: '#000', strokeThickness: 2
            }).setDepth(3);
        }
    }

    // Player character
    player = scene.add.text(LADDER_X, getPlayerY(0), '🧒', { fontSize: '36px' })
        .setOrigin(0.5).setDepth(10);
}

// ==================== START SCREEN ====================
function showStartScreen(scene) {
    scene.cameras.main.scrollY = WORLD_H - 600; // show ground level

    const els = [];
    const add = el => { els.push(el); return el; };

    add(scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.80)
        .setScrollFactor(0).setDepth(50));

    add(scene.add.text(400, 82, '🪜 Math Ladder', {
        fontSize: '54px', fill: '#FFD700', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', stroke: '#3D1C00', strokeThickness: 5
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51));

    add(scene.add.text(400, 148, '☁️  How high can YOU climb?  ☁️', {
        fontSize: '19px', fill: '#87CEEB', fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51));

    add(scene.add.rectangle(400, 292, 530, 200, 0x000000, 0.35)
        .setScrollFactor(0).setDepth(51));

    [
        '✅  Right answer → Climb up one rung!',
        '❌  Wrong answer → Fall to the ground!',
        '⏰  Time runs out → Silly wobble 😵 then FALL!',
        '🔥  Answer in a row = streak bonus points',
        '⭐  Questions get harder as you climb higher',
    ].forEach((line, i) =>
        add(scene.add.text(400, 202 + i * 35, line, {
            fontSize: '15px', fill: '#FFFFFF', fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(52))
    );

    if (bestRung > 0 || hiScore > 0) {
        add(scene.add.text(400, 397,
            `🏆  Best Rung: ${bestRung}   |   Best Score: ${hiScore}`, {
            fontSize: '17px', fill: '#FFD700', fontFamily: 'Arial',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(52));
    }

    const startBtn = createButton(
        scene, 400, 490, 'START CLIMBING!',
        () => { els.forEach(e => e.destroy()); startBtn.destroy(); startGameplay(scene); },
        { variant: ButtonVariants.SUCCESS, size: ButtonSizes.LARGE, icon: '🚀' }
    );
    startBtn.container.setScrollFactor(0).setDepth(52);
}

// ==================== GAMEPLAY INIT ====================
function startGameplay(scene) {
    score        = 0;
    currentRung  = 0;
    runBest      = 0;
    streak       = 0;
    userAnswer   = '';
    gameActive   = false;
    isAnimating  = false;
    isSilly      = false;

    player.setPosition(LADDER_X, getPlayerY(0));
    player.setText('🧒');

    buildGameUI(scene);
    nextQuestion(scene);
}

// ==================== GAME UI ====================
function buildGameUI(scene) {
    const SW   = scene.scale.width;   // 800
    const PX   = 313;                 // right-panel left edge
    const CX   = 557;                 // right-panel centre-x
    const RW   = SW - PX;            // right-panel width  ~487

    // Panel background
    scene.add.rectangle(CX + 2, 301, RW - 4, 598, 0xF6F4D2, 0.97)
        .setScrollFactor(0).setDepth(20);
    scene.add.rectangle(CX + 2, 301, RW - 4, 598, 0x000000, 0)
        .setStrokeStyle(3, 0x8B4513).setScrollFactor(0).setDepth(20);

    // ── Top stats ──────────────────────────────────────────
    const statFont = { fontSize: '11px', fill: '#888888', fontFamily: 'Arial', fontStyle: 'bold' };
    const valFont  = { fontSize: '24px', fill: '#1F2937', fontFamily: 'Arial', fontStyle: 'bold' };

    scene.add.text(320, 10, 'SCORE', statFont).setScrollFactor(0).setDepth(21);
    scoreText = scene.add.text(320, 24, '0', valFont).setScrollFactor(0).setDepth(21);

    scene.add.text(420, 10, 'RUNG', statFont).setScrollFactor(0).setDepth(21);
    rungText = scene.add.text(420, 24, '0', valFont).setScrollFactor(0).setDepth(21);

    scene.add.text(510, 10, 'STREAK', statFont).setScrollFactor(0).setDepth(21);
    streakText = scene.add.text(510, 24, '🔥 0',
        { fontSize: '20px', fill: '#F59E0B', fontFamily: 'Arial', fontStyle: 'bold' })
        .setScrollFactor(0).setDepth(21);

    scene.add.text(675, 10, 'BEST RUNG', statFont).setScrollFactor(0).setDepth(21);
    bestText = scene.add.text(675, 24, `${bestRung}`,
        { fontSize: '24px', fill: '#10B981', fontFamily: 'Arial', fontStyle: 'bold' })
        .setScrollFactor(0).setDepth(21);

    // ── Timer bar ──────────────────────────────────────────
    const barX = PX + 4;
    const barW = getTimerBarWidth(scene);
    scene.add.text(barX, 59, '⏱', { fontSize: '13px' }).setScrollFactor(0).setDepth(21);
    scene.add.rectangle(barX + barW / 2 + 16, 72, barW, 17, 0xE5E7EB)
        .setStrokeStyle(1, 0x9CA3AF).setScrollFactor(0).setDepth(21);
    timerBarFill = scene.add.rectangle(barX + 16, 72, barW, 13, 0x10B981)
        .setScrollFactor(0).setDepth(22).setOrigin(0, 0.5);

    // ── Question box ──────────────────────────────────────
    scene.add.rectangle(CX + 2, 122, RW - 14, 78, 0xFFFFFF)
        .setStrokeStyle(3, 0xA44A3F).setScrollFactor(0).setDepth(21);

    questionText = scene.add.text(CX + 2, 111, '…', {
        fontSize: '28px', fill: '#1F2937', fontFamily: 'Arial', fontStyle: 'bold',
        align: 'center', wordWrap: { width: RW - 30 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(22);

    feedbackText = scene.add.text(CX + 2, 147, '', {
        fontSize: '15px', fill: '#10B981', fontFamily: 'Arial', fontStyle: 'bold',
        align: 'center', wordWrap: { width: RW - 24 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(22);

    // ── Answer input display ───────────────────────────────
    scene.add.rectangle(CX + 2, 207, RW - 36, 50, 0xF3F4F6)
        .setStrokeStyle(3, 0xA44A3F).setScrollFactor(0).setDepth(21);

    inputDisplayText = scene.add.text(CX + 2, 207, '_ _ _', {
        fontSize: '34px', fill: '#1F2937', fontFamily: 'Arial', fontStyle: 'bold',
        align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(22);

    // ── Number buttons (2 rows × 5) ────────────────────────
    const btnSz = 54, gap = 6;
    const row_w = 5 * btnSz + 4 * gap;
    const b0x   = CX + 2 - row_w / 2 + btnSz / 2;

    for (let n = 1; n <= 5; n++)
        makeNumBtn(scene, b0x + (n - 1) * (btnSz + gap), 267, n, btnSz);

    [6, 7, 8, 9, 0].forEach((n, i) =>
        makeNumBtn(scene, b0x + i * (btnSz + gap), 328, n, btnSz)
    );

    scene.add.text(CX + 2, 362, 'Tap a number, then Submit', {
        fontSize: '12px', fill: '#9CA3AF', fontFamily: 'Arial', align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(21);

    // ── Action buttons ─────────────────────────────────────
    const clearBtn = createButton(scene, CX - 80, 406, 'Clear',
        () => { userAnswer = ''; updateInputDisplay(); },
        { variant: ButtonVariants.SECONDARY, size: ButtonSizes.SMALL }
    );
    clearBtn.container.setScrollFactor(0).setDepth(22);

    const submitBtn = createButton(scene, CX + 82, 406, 'Submit ✓',
        () => checkAnswer(scene),
        { variant: ButtonVariants.SUCCESS, size: ButtonSizes.SMALL }
    );
    submitBtn.container.setScrollFactor(0).setDepth(22);

    // Pause button
    const pauseBtn = createButton(scene, CX + 2, 460, '⏸ Pause',
        () => showPauseMenu(scene),
        { variant: ButtonVariants.GHOST, size: ButtonSizes.SMALL }
    );
    pauseBtn.container.setScrollFactor(0).setDepth(22);

    // Height-reached bar (visual progress hint on left panel — fixed)
    scene.add.text(68, 10, 'HEIGHT', {
        fontSize: '11px', fill: '#FFFFFF', fontFamily: 'Arial', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 1
    }).setOrigin(0.5).setScrollFactor(0).setDepth(21);

    // ── Keyboard support ───────────────────────────────────
    scene.input.keyboard.on('keydown', ev => {
        if (!gameActive || isAnimating || isSilly) return;
        const k = ev.key;
        if (k >= '0' && k <= '9' && userAnswer.length < 3) {
            userAnswer += k; updateInputDisplay();
        } else if (k === 'Backspace') {
            userAnswer = userAnswer.slice(0, -1); updateInputDisplay();
        } else if (k === 'Enter') {
            checkAnswer(scene);
        }
    });
}

function makeNumBtn(scene, x, y, num, size) {
    const bg = scene.add.rectangle(x, y, size, size, 0xA44A3F)
        .setStrokeStyle(2, 0x6B2A22)
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0).setDepth(22);

    scene.add.text(x, y, `${num}`, {
        fontSize: '26px', fill: '#FFFFFF', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(23);

    bg.on('pointerover',  () => bg.setFillStyle(0x8B3A30));
    bg.on('pointerout',   () => bg.setFillStyle(0xA44A3F));
    bg.on('pointerdown',  () => {
        if (!gameActive || isAnimating || isSilly) return;
        if (userAnswer.length < 3) { userAnswer += `${num}`; updateInputDisplay(); }
        bg.setFillStyle(0x6B2A22);
    });
    bg.on('pointerup', () => bg.setFillStyle(0x8B3A30));
}

// ==================== QUESTION CYCLE ====================
function nextQuestion(scene) {
    gameActive   = true;
    isAnimating  = false;
    isSilly      = false;
    userAnswer   = '';
    updateInputDisplay();
    if (feedbackText) feedbackText.setText('');

    const d  = getDiff(currentRung);
    const a  = Phaser.Math.Between(1, d.a);
    const b  = Phaser.Math.Between(1, d.b);
    const op = d.ops[Phaser.Math.Between(0, d.ops.length - 1)];

    let q, ans;
    if (op === '+') {
        q = `${a} + ${b} = ?`;  ans = a + b;
    } else {
        const hi = Math.max(a, b), lo = Math.min(a, b);
        q = `${hi} − ${lo} = ?`; ans = hi - lo;
    }

    currentQuestion = { question: q, answer: ans };
    if (questionText) questionText.setText(q);

    timeLeft = BASE_TIME;
    updateTimerBar(scene, 1.0);

    if (timerEvent) { timerEvent.remove(); timerEvent = null; }
    timerEvent = scene.time.addEvent({
        delay: 1000,
        callback: () => onTimerTick(scene),
        loop: true
    });
}

function onTimerTick(scene) {
    if (!gameActive) return;
    timeLeft--;
    updateTimerBar(scene, Math.max(0, timeLeft / BASE_TIME));

    if (timeLeft <= 0) {
        if (timerEvent) { timerEvent.remove(); timerEvent = null; }
        gameActive = false;
        startSillyPhase(scene);
    }
}

// ==================== SILLY WOBBLE PHASE ====================
function startSillyPhase(scene) {
    isSilly     = true;
    isAnimating = false;

    feedbackText.setText('⏰  Uh oh! Wobbling… 😵');
    feedbackText.setColor('#F59E0B');

    // Horizontal wobble tween
    scene.tweens.add({
        targets: player,
        x: { from: LADDER_X - 16, to: LADDER_X + 16 },
        duration: 190, ease: 'Sine.easeInOut',
        yoyo: true, repeat: 7,
        onComplete: () => { if (player) player.x = LADDER_X; }
    });

    // Cycle through silly emojis
    let tick = 0;
    scene.time.addEvent({
        delay: 430, repeat: 6,
        callback: () => {
            tick++;
            if (player) player.setText(SILLY_EMOJIS[tick % SILLY_EMOJIS.length]);
        }
    });

    // After SILLY_DUR seconds → fall
    scene.time.delayedCall(SILLY_DUR * 1000, () => {
        isSilly = false;
        feedbackText.setText('💥  FALLING!');
        feedbackText.setColor('#EF4444');
        doFall(scene);
    });
}

// ==================== FALL TO FLOOR ====================
function doFall(scene) {
    isAnimating = true;
    gameActive  = false;
    streak      = 0;

    player.setText('😱');
    player.x = LADDER_X;

    if (currentRung === 0) {
        // Already at floor — just bounce and continue
        player.setText('💥');
        scene.time.delayedCall(700, () => {
            player.setText('🧒');
            isAnimating = false;
            feedbackText.setText('🧗 Back up you go! Keep trying!');
            feedbackText.setColor('#A44A3F');
            scene.time.delayedCall(1000, () => nextQuestion(scene));
        });
        return;
    }

    const fromY    = getPlayerY(currentRung);
    const toY      = getPlayerY(0);
    const distance = Math.abs(fromY - toY);
    const duration = Math.min(1800, 500 + distance * 0.07);

    scene.tweens.add({
        targets: player,
        y: toY,
        duration,
        ease: 'Cubic.easeIn',
        onComplete: () => {
            currentRung = 0;
            updateStatsUI();
            player.setText('💥');

            // Bounce-on-landing
            scene.tweens.add({
                targets: player,
                y: toY - 22, duration: 180,
                ease: 'Power2', yoyo: true,
                onComplete: () => {
                    player.setText('🧒');
                    isAnimating = false;
                    feedbackText.setText('🧗 Climb back up! You can do it!');
                    feedbackText.setColor('#A44A3F');
                    scene.time.delayedCall(1100, () => nextQuestion(scene));
                }
            });
        }
    });
}

// ==================== CHECK ANSWER ====================
function checkAnswer(scene) {
    if (!gameActive || isAnimating || isSilly || userAnswer === '') return;

    const ans = parseInt(userAnswer);
    userAnswer = '';
    updateInputDisplay();

    if (ans === currentQuestion.answer) {
        // ✅ Correct
        if (timerEvent) { timerEvent.remove(); timerEvent = null; }
        gameActive   = false;
        isAnimating  = true;
        streak++;

        const timeBonus   = Math.floor(timeLeft * 0.5);
        const streakBonus = streak >= 10 ? 25 : streak >= 5 ? 10 : streak >= 3 ? 5 : 0;
        const earned      = 10 + timeBonus + streakBonus;
        score += earned;

        currentRung++;
        if (currentRung > runBest) runBest = currentRung;

        if (currentRung > bestRung) {
            bestRung = currentRung;
            localStorage.setItem('ml_bestRung', bestRung);
            if (bestText) bestText.setText(`${bestRung}`);
            showFloat(scene, '🏆 NEW BEST RUNG!', 400, 240, '#FFD700', '36px');
        }
        if (score > hiScore) {
            hiScore = score;
            localStorage.setItem('ml_hiScore', hiScore);
        }

        updateStatsUI();

        // Feedback message
        let msg = streakBonus > 0 ? `✓ Correct! 🔥 Streak x${streak} (+${streakBonus}pts)` :
                  timeBonus  > 5 ? `✓ Correct! ⚡ Speedy! (+${earned}pts)` :
                                   `✓ Correct! (+${earned}pts)`;
        feedbackText.setText(msg).setColor('#10B981');
        player.setText('😊');

        // Climb tween
        scene.tweens.add({
            targets: player,
            y: getPlayerY(currentRung),
            duration: 400, ease: 'Power2',
            onComplete: () => {
                player.setText('🧒');
                isAnimating = false;
                if (currentRung % 5 === 0) showMilestone(scene, currentRung);
                scene.time.delayedCall(700, () => nextQuestion(scene));
            }
        });

    } else {
        // ❌ Wrong
        if (timerEvent) { timerEvent.remove(); timerEvent = null; }
        gameActive = false;
        streak     = 0;
        updateStatsUI();

        feedbackText.setText(`✗  Wrong! Answer was ${currentQuestion.answer}`)
            .setColor('#EF4444');
        player.setText('😰');

        scene.time.delayedCall(700, () => doFall(scene));
    }
}

// ==================== MILESTONE BANNERS ====================
const MILESTONE_MSGS = {
     5:  ['🌤️  Rung 5!',  'Rising fast!'],
    10:  ['⭐  Rung 10!', 'Into the clouds!'],
    15:  ['🌟  Rung 15!', 'Amazing climber!'],
    20:  ['🚀  Rung 20!', 'You\'re a STAR!'],
    25:  ['🌙  Rung 25!', 'Sky is no limit!'],
    30:  ['🔭  Rung 30!', 'Space Explorer!'],
    40:  ['🌍  Rung 40!', 'Out of this world!'],
    50:  ['🏆  Rung 50!', 'LEGENDARY!!'],
    75:  ['🛸  Rung 75!', 'UFO territory!'],
    100: ['🌌  Rung 100!','MATH GENIUS!'],
};

function showMilestone(scene, rung) {
    const [line1, line2] = MILESTONE_MSGS[rung] || [`🎉 Rung ${rung}!`, 'Keep going!'];
    showFloat(scene, line1, 400, 235, '#FFD700', '40px');
    showFloat(scene, line2, 400, 285, '#FFFFFF', '22px');
}

function showFloat(scene, txt, x, y, colour, size = '32px') {
    const t = scene.add.text(x, y, txt, {
        fontSize: size, fill: colour, fontFamily: 'Arial', fontStyle: 'bold',
        stroke: '#000000', strokeThickness: 3, align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(200);

    scene.tweens.add({
        targets: t, y: y - 90, alpha: 0,
        duration: 2200, ease: 'Power2',
        onComplete: () => t.destroy()
    });
}

// ==================== PAUSE MENU ====================
function showPauseMenu(scene) {
    if (isAnimating || isSilly) return;
    const wasActive = gameActive;
    gameActive = false;
    if (timerEvent) timerEvent.paused = true;

    // Simple scroll-factor-0 overlay
    const els = [];
    const ov = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.78)
        .setScrollFactor(0).setDepth(500);
    els.push(ov);
    els.push(scene.add.text(400, 190, '⏸  Paused', {
        fontSize: '46px', fill: '#FFD700', fontFamily: 'Arial', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0).setDepth(501));
    els.push(scene.add.text(400, 250, 'Take a deep breath! 🌬️', {
        fontSize: '20px', fill: '#FFFFFF', fontFamily: 'Arial'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(501));
    els.push(scene.add.text(400, 285, `Current rung: ${currentRung}   Score: ${score}`, {
        fontSize: '17px', fill: '#87CEEB', fontFamily: 'Arial'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(501));

    const destroy = () => els.forEach(e => e.destroy());

    const resumeBtn = createButton(scene, 400, 355, 'RESUME',
        () => { destroy(); resumeBtn.destroy(); restartBtn.destroy(); exitBtn.destroy();
                gameActive = wasActive; if (timerEvent) timerEvent.paused = false; },
        { variant: ButtonVariants.SUCCESS, size: ButtonSizes.MEDIUM }
    );
    resumeBtn.container.setScrollFactor(0).setDepth(502);

    const restartBtn = createButton(scene, 400, 430, 'RESTART',
        () => scene.scene.restart(),
        { variant: ButtonVariants.SECONDARY, size: ButtonSizes.MEDIUM }
    );
    restartBtn.container.setScrollFactor(0).setDepth(502);

    const exitBtn = createButton(scene, 400, 505, 'EXIT',
        () => { window.location.href = '../../index.html'; },
        { variant: ButtonVariants.GHOST, size: ButtonSizes.MEDIUM }
    );
    exitBtn.container.setScrollFactor(0).setDepth(502);
}

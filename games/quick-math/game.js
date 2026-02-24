// Quick Math - Learn Vedic Math Tricks!
// DOM-based Educational Game (No Phaser)

// ==================== GAME STATE ====================
let currentLevelId = null;
let tutStep = 0;
let practiceScore = 0;
let practiceAnswered = 0;
let currentQuestion = null;
let userAnswer = '';
let answered = false;
let soundEnabled = true;
let autoAdvanceTimer = null;
let kbHandler = null;

// Player Progress
let playerProgress = {
    levelStars: {},
    achievements: [],
    totalScore: 0,
    gamesPlayed: 0,
    totalStars: 0
};

// ==================== LEVEL DATA ====================
const LEVELS = [
    { id: 1, name: 'Multiply by 11', icon: '×11', desc: 'Learn the pattern trick', color: '#3B82F6' },
    { id: 2, name: 'Square Numbers', icon: '5²', desc: 'Numbers ending in 5', color: '#06B6D4' },
    { id: 3, name: 'Double & Half', icon: '×÷', desc: 'Smart shortcuts', color: '#0EA5E9' },
    { id: 4, name: 'Base Method', icon: '~10', desc: 'Near 10, 100...', color: '#2563EB' },
    { id: 5, name: 'Multiply by 9', icon: '×9', desc: 'Finger trick magic', color: '#10B981' },
    { id: 6, name: 'Multiply by 5', icon: '×5', desc: 'Half of ×10', color: '#059669' },
    { id: 7, name: 'Multiply by 4', icon: '2²', desc: 'Double, double!', color: '#7C3AED' },
    { id: 8, name: 'Multiply by 6', icon: '×6', desc: 'Even pattern', color: '#DB2777' },
    { id: 9, name: 'Multiply by 8', icon: '×8', desc: 'Triple double', color: '#EA580C' },
    { id: 10, name: 'Multiply by 12', icon: '×12', desc: 'Split & add', color: '#DC2626' },
    { id: 11, name: 'Multiply by 15', icon: '×15', desc: '10 + half', color: '#0891B2' },
    { id: 12, name: 'Multiply by 25', icon: '×25', desc: 'Quarter trick', color: '#1D4ED8' },
    { id: 13, name: 'Multiply by 99', icon: '×99', desc: 'n×100−n shortcut', color: '#6D28D9' },
    { id: 14, name: '×11 Extended', icon: '11++', desc: 'With carry logic', color: '#2563EB' },
    { id: 15, name: 'Differ by 2', icon: 'n±1', desc: 'Sandwich squares', color: '#D97706' },
    { id: 16, name: 'Same Tens', icon: 'ab', desc: 'Ones sum to 10', color: '#0D9488' }
];

// ==================== TUTORIAL DATA ====================
const TUTORIAL_STEPS = {
    1: [
        { title: 'The ×11 Trick', text: 'Learn the fastest way to multiply any 2-digit number by 11!', example: '' },
        { title: 'Example: 23 × 11', text: 'The normal way:\n23 × 10 = 230\n23 × 1 = 23\n230 + 23 = 253', example: '23 × 11 = 253' },
        { title: 'The Quick Way!', text: 'Step 1: Write the first digit → 2__', example: '2__' },
        { title: 'The Quick Way!', text: 'Step 2: Add the two digits → 2+3 = 5', example: '2_5_' },
        { title: 'The Quick Way!', text: 'Step 3: Write the last digit → 3', example: '253' },
        { title: 'The Pattern!', text: 'For any number AB:\nA [A+B] B = Answer\n\n23 → 2 [2+3] 3 → 253\n45 → 4 [4+5] 5 → 495', example: '✨ Magic! ✨' }
    ],
    2: [
        { title: 'Square Numbers Ending in 5', text: 'Learn the fastest way to square numbers like 25, 35, 45!', example: '' },
        { title: 'What is "Square"?', text: 'Square means multiply a number by itself\n25² = 25 × 25', example: '25 × 25 = ?' },
        { title: 'Example: 25²', text: 'The normal way:\n25 × 25 = 625\n(That takes time!)', example: '625' },
        { title: 'The Quick Trick! ✨', text: 'Step 1: Take the first digit → 2', example: '2__' },
        { title: 'The Quick Trick! ✨', text: 'Step 2: Multiply by NEXT number\n2 × 3 = 6', example: '6__' },
        { title: 'The Quick Trick! ✨', text: 'Step 3: Add 25 at the end\nAlways 25!', example: '625' },
        { title: 'More Examples!', text: '35² → 3 × 4 = 12, add 25 → 1225\n45² → 4 × 5 = 20, add 25 → 2025\n55² → 5 × 6 = 30, add 25 → 3025', example: '✨ Magic! ✨' },
        { title: 'The Pattern!', text: 'For any number ending in 5:\nN5² → N × (N+1), then add 25\n\nTry it yourself!', example: '🎯 Ready!' }
    ],
    3: [
        { title: 'Double & Half', text: 'Multiply by 25 or 50 using doubling and halving!', example: '' },
        { title: 'The Trick', text: 'Double-half-double: If you can double and half, you can multiply by 25!', example: '' },
        { title: 'Example: 12 × 25', text: 'Half of 12 = 6\n6 × 100 = 600\n\nAnswer: 600', example: '12 × 25 = 300' },
        { title: 'Wait! Better Way', text: 'Actually: Double once, Double again\n12 × 100 ÷ 4 = 1200 ÷ 4 = 300', example: '✨ Pattern! ✨' }
    ],
    4: [
        { title: 'Base Method', text: 'Multiply numbers close to 10!', example: '' },
        { title: 'The Trick', text: '(10+a) × (10+b) = 100 + 10(a+b) + ab', example: '' },
        { title: 'Example: 12 × 13', text: 'a=2, b=3\n100 + 10(5) + 6 = 156', example: '12 × 13 = 156' },
        { title: 'Works for Lower Too!', text: '(10-a) × (10-b) = 100 - 10(a+b) + ab\n\n8 × 9 = 72', example: '8 × 9 = 72' }
    ],
    5: [
        { title: 'Multiply by 9', text: 'Learn the magical ×9 pattern!', example: '' },
        { title: 'The Pattern', text: '1×9=9 (digit sum: 9)\n2×9=18 (1+8=9)\n3×9=27 (2+7=9)\n\nAll digits sum to 9!', example: '✨ Amazing! ✨' },
        { title: 'Quick Method', text: '5 × 9 = ?\nTake 5: 5-1=4, and 9-4=5\nAnswer: 45', example: '5 × 9 = 45' },
        { title: 'The Finger Trick', text: 'Hold up 10 fingers\nBend the 5th finger\nYou see: 4 fingers | 5 fingers\nAnswer: 45!', example: '✨ Fingers Magic! ✨' }
    ],
    6: [
        { title: 'Multiply by 5', text: 'The simplest trick: half of ×10!', example: '' },
        { title: 'The Secret', text: '×5 = ×10 ÷ 2\n\n8 × 5 = 8 × 10 ÷ 2 = 80 ÷ 2 = 40', example: '8 × 5 = 40' },
        { title: 'Even Easier!', text: 'For EVEN numbers:\nHalf it, then add a 0\n\n12 × 5 = 6_0 = 60', example: '12 × 5 = 60' }
    ],
    7: [
        { title: 'Multiply by 4', text: 'Double, then double again!', example: '' },
        { title: 'The Trick', text: '×4 = ×2 × ×2\n\n5 × 4:\nDouble: 5 × 2 = 10\nDouble: 10 × 2 = 20', example: '5 × 4 = 20' },
        { title: 'Practice', text: '8 × 4:\nDouble: 8 × 2 = 16\nDouble: 16 × 2 = 32', example: '8 × 4 = 32' }
    ],
    8: [
        { title: 'Multiply by 6', text: 'Use the pattern with even numbers!', example: '' },
        { title: 'The Trick', text: '6 = 5 + 1\n×6 = ×5 + ×1\n\n7 × 6 = 35 + 7 = 42', example: '7 × 6 = 42' },
        { title: 'Or Simply', text: 'Practice with ×3, then double!\n\n4 × 6 = (4×3)×2 = 12×2 = 24', example: '4 × 6 = 24' }
    ],
    9: [
        { title: 'Multiply by 8', text: 'Triple-double: Three ways to double!', example: '' },
        { title: 'The Trick', text: '×8 = ×2 ×2 ×2\n\n3 × 8:\nDouble: 3×2 = 6\nDouble: 6×2 = 12\nDouble: 12×2 = 24', example: '3 × 8 = 24' }
    ],
    10: [
        { title: 'Multiply by 12', text: 'Split into ×10 and ×2!', example: '' },
        { title: 'The Trick', text: '×12 = ×10 + ×2\n\n5 × 12:\n×10 = 50\n×2 = 10\n50 + 10 = 60', example: '5 × 12 = 60' },
        { title: 'Another Example', text: '7 × 12 = 70 + 14 = 84', example: '7 × 12 = 84' }
    ],
    11: [
        { title: 'Multiply by 15', text: 'Magic doubling: 10 + Half!', example: '' },
        { title: 'The Secret', text: '×15 = ×10 + half of (×10)\n\n4 × 15:\n×10 = 40\nHalf = 20\n40 + 20 = 60', example: '4 × 15 = 60' },
        { title: 'Another Example', text: '6 × 15 = 60 + 30 = 90', example: '6 × 15 = 90' }
    ],
    12: [
        { title: 'Multiply by 25', text: 'The quarter trick!', example: '' },
        { title: 'The Secret', text: '×25 = ×100 ÷ 4\n\n8 × 25:\n×100 = 800\n÷4 = 200', example: '8 × 25 = 200' },
        { title: 'For Even Numbers', text: 'If even, use: quarter × 100\n\n12 × 25 = 3 × 100 = 300', example: '12 × 25 = 300' }
    ],
    13: [
        { title: 'Multiply by 99', text: 'The shortcut: ×100 − ×1!', example: '' },
        { title: 'The Trick', text: '×99 = ×100 − ×1\n\n23 × 99:\n×100 = 2300\n−1 = −23\n2300 − 23 = 2277', example: '23 × 99 = 2277' }
    ],
    14: [
        { title: '×11 Extended', text: 'The ×11 trick WITH carry!', example: '' },
        { title: 'Review Basic', text: '23 × 11 = 253\nDigits: 2 [2+3] 3', example: '23 × 11 = 253' },
        { title: 'When It Carries', text: '76 × 11:\nMiddle = 7+6 = 13\nCarry 1 to first digit!', example: '76 × 11 = 836' },
        { title: 'The Pattern', text: 'Add digits\nIf ≥10: write ones, carry 1\nAlways works!', example: '✨ Carry Logic! ✨' }
    ],
    15: [
        { title: 'Differ by 2', text: 'Sandwich squares!', example: '' },
        { title: 'The Formula', text: 'n × (n+2) = (n+1)² − 1\n\n7 × 9:\nMiddle = 8\n8² = 64\n64 − 1 = 63', example: '7 × 9 = 63' },
        { title: 'Another Example', text: '14 × 16 = 15² − 1 = 225 − 1 = 224', example: '14 × 16 = 224' }
    ],
    16: [
        { title: 'Same Tens', text: 'Ones sum to 10!', example: '' },
        { title: 'The Condition', text: '23 and 27: Same tens (2), ones sum to 10 (3+7)\n\nThere\'s a MAGIC pattern!', example: '' },
        { title: 'The Formula', text: 'Left: T × (T+1)\nRight: A × (10−A)\nConcat them!\n\n23 × 27 = [2×3][3×7] = [6][21] = 621', example: '23 × 27 = 621' },
        { title: 'Another Example', text: '44 × 46 = [4×5][4×6] = [20][24] = 2024', example: '44 × 46 = 2024' }
    ]
};

// ==================== ACHIEVEMENTS ====================
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

// ==================== PERSISTENCE ====================
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

// ==================== HELPERS ====================
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getStarRating(score, total) {
    const percentage = (score / total) * 100;
    if (percentage === 100) return 3;
    if (percentage >= 80) return 2;
    if (percentage >= 60) return 1;
    return 0;
}

function showScreen(id) {
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    if (kbHandler) {
        document.removeEventListener('keydown', kbHandler);
        kbHandler = null;
    }
}

// ==================== AUDIO ====================
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
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;

        case 'error':
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.15);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;

        case 'click':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;

        case 'celebrate':
            const frequencies = [523.25, 659.25, 783.99, 1046.50];
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
            return;
    }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(title, icon, message) {
    const toast = document.getElementById('achievement-toast');
    toast.innerHTML = `${icon} <strong>${title}</strong><br>${message}`;
    toast.classList.add('visible');
    playSound('celebrate');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3500);
}

function checkAndUnlockAchievements() {
    let newAchievements = [];

    Object.values(ACHIEVEMENTS).forEach(achievement => {
        if (!playerProgress.achievements.includes(achievement.id) && achievement.check()) {
            playerProgress.achievements.push(achievement.id);
            newAchievements.push(achievement);
        }
    });

    if (newAchievements.length > 0) {
        saveProgress();
        newAchievements.forEach((ach, i) => {
            setTimeout(() => showToast(ach.name, ach.icon, ach.description), i * 3500);
        });
    }
}

// ==================== LEVEL SELECT ====================
function renderLevelGrid() {
    const grid = document.getElementById('level-grid');
    grid.innerHTML = '';

    LEVELS.forEach(level => {
        const stars = playerProgress.levelStars[level.id] || 0;
        const card = document.createElement('div');
        card.className = 'qm-level-card';
        card.style.setProperty('--card-color', level.color);

        let starsHtml = '';
        for (let i = 0; i < 3; i++) {
            starsHtml += `<span class="${i < stars ? 'qm-star--filled' : 'qm-star--empty'}"></span>`;
        }

        card.innerHTML = `
            <div class="qm-level-header">
                <div class="qm-level-icon">${level.icon}</div>
                <div class="qm-level-info">
                    <p class="qm-level-name">${level.name}</p>
                    <p class="qm-level-desc">${level.desc}</p>
                </div>
            </div>
            <div class="qm-stars">${starsHtml}</div>
        `;

        card.addEventListener('click', () => {
            currentLevelId = level.id;
            initAudio();
            playSound('click');
            showTutorial(level.id);
        });

        grid.appendChild(card);
    });
}

// ==================== TUTORIAL ====================
function showTutorial(levelId) {
    showScreen('screen-tutorial');
    currentLevelId = levelId;
    tutStep = 0;
    renderTutorialStep();
}

function renderTutorialStep() {
    const steps = TUTORIAL_STEPS[currentLevelId];
    const step = steps[tutStep];

    document.getElementById('tut-title').textContent = step.title;
    document.getElementById('tut-text').textContent = step.text;
    document.getElementById('tut-example').textContent = step.example;
    document.getElementById('tut-progress').textContent = `Step ${tutStep + 1} of ${steps.length}`;

    const prevBtn = document.getElementById('tut-prev');
    const nextBtn = document.getElementById('tut-next');

    if (tutStep > 0) {
        prevBtn.style.display = 'inline-block';
    } else {
        prevBtn.style.display = 'none';
    }

    if (tutStep < steps.length - 1) {
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = () => {
            tutStep++;
            renderTutorialStep();
        };
    } else {
        nextBtn.textContent = 'Practice! →';
        nextBtn.onclick = () => {
            startPractice(currentLevelId);
        };
    }

    prevBtn.onclick = () => {
        if (tutStep > 0) {
            tutStep--;
            renderTutorialStep();
        }
    };
}

// ==================== PRACTICE MODE ====================
function startPractice(levelId) {
    currentLevelId = levelId;
    showScreen('screen-practice');
    practiceScore = 0;
    practiceAnswered = 0;
    answered = false;
    userAnswer = '';
    nextPracticeQuestion();
}

function nextPracticeQuestion() {
    if (practiceAnswered >= 5) {
        showResults(practiceScore, 5);
        return;
    }

    userAnswer = '';
    answered = false;
    currentQuestion = generateQuestion(currentLevelId);

    document.getElementById('score-display').textContent = `Score: ${practiceScore}/5`;
    document.getElementById('question-display').textContent = currentQuestion.questionStr;
    document.getElementById('answer-box').textContent = '';
    document.getElementById('answer-box').className = 'qm-answer-box';
    document.getElementById('feedback-display').textContent = '';

    if (kbHandler) {
        document.removeEventListener('keydown', kbHandler);
    }
    kbHandler = (e) => {
        if (answered) return;
        if (e.key >= '0' && e.key <= '9' && userAnswer.length < 4) {
            userAnswer += e.key;
            document.getElementById('answer-box').textContent = userAnswer;
        } else if (e.key === 'Backspace') {
            userAnswer = userAnswer.slice(0, -1);
            document.getElementById('answer-box').textContent = userAnswer;
        } else if (e.key === 'Enter') {
            checkPracticeAnswer();
        }
    };
    document.addEventListener('keydown', kbHandler);

    renderNumpad();
}

function checkPracticeAnswer() {
    if (answered) return;
    answered = true;

    const answer = parseInt(userAnswer);
    const correct = answer === currentQuestion.answer;

    if (correct) {
        practiceScore++;
        document.getElementById('feedback-display').textContent = '✓ Correct! +1';
        document.getElementById('feedback-display').style.color = '#1CB0F6';
        document.getElementById('answer-box').classList.add('correct');
        playSound('success');
    } else {
        document.getElementById('feedback-display').textContent = `✗ Wrong. Answer: ${currentQuestion.answer}`;
        document.getElementById('feedback-display').style.color = '#FF4444';
        document.getElementById('answer-box').classList.add('wrong');
        playSound('error');
    }

    practiceAnswered++;

    autoAdvanceTimer = setTimeout(() => {
        nextPracticeQuestion();
    }, 2000);
}

function renderNumpad() {
    const numpad = document.getElementById('numpad');
    numpad.innerHTML = '';

    for (let i = 0; i <= 9; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'qm-numpad-btn';
        btn.addEventListener('click', () => {
            if (!answered && userAnswer.length < 4) {
                userAnswer += i;
                document.getElementById('answer-box').textContent = userAnswer;
            }
        });
        numpad.appendChild(btn);
    }

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear';
    clearBtn.className = 'qm-numpad-btn qm-clear';
    clearBtn.addEventListener('click', () => {
        userAnswer = '';
        document.getElementById('answer-box').textContent = '';
    });
    numpad.appendChild(clearBtn);

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.className = 'qm-numpad-btn qm-submit';
    submitBtn.addEventListener('click', checkPracticeAnswer);
    numpad.appendChild(submitBtn);
}

// ==================== QUESTION GENERATOR ====================
function generateQuestion(levelId) {
    let num, num1, num2, answer, questionStr;

    if (levelId === 1) {
        num = randInt(12, 99);
        answer = num * 11;
        questionStr = `${num} × 11 = ?`;
    } else if (levelId === 2) {
        const tens = randInt(1, 9);
        num = tens * 10 + 5;
        const firstDigit = Math.floor(num / 10);
        answer = firstDigit * (firstDigit + 1) * 100 + 25;
        questionStr = `${num}² = ?`;
    } else if (levelId === 3) {
        num1 = randInt(6, 20) * 2;
        num2 = randFrom([25, 50]);
        answer = num1 * num2;
        questionStr = `${num1} × ${num2} = ?`;
    } else if (levelId === 4) {
        num1 = randInt(7, 13);
        num2 = randInt(7, 13);
        answer = num1 * num2;
        questionStr = `${num1} × ${num2} = ?`;
    } else if (levelId === 5) {
        num = randInt(1, 10);
        answer = num * 9;
        questionStr = `${num} × 9 = ?`;
    } else if (levelId === 6) {
        num = randInt(4, 24) * 2;
        answer = num * 5;
        questionStr = `${num} × 5 = ?`;
    } else if (levelId === 7) {
        num = randInt(1, 20);
        answer = num * 4;
        questionStr = `${num} × 4 = ?`;
    } else if (levelId === 8) {
        num = randInt(2, 15);
        answer = num * 6;
        questionStr = `${num} × 6 = ?`;
    } else if (levelId === 9) {
        num = randInt(1, 15);
        answer = num * 8;
        questionStr = `${num} × 8 = ?`;
    } else if (levelId === 10) {
        num = randInt(1, 15);
        answer = num * 12;
        questionStr = `${num} × 12 = ?`;
    } else if (levelId === 11) {
        num = randInt(1, 14);
        answer = num * 15;
        questionStr = `${num} × 15 = ?`;
    } else if (levelId === 12) {
        num = randInt(1, 20);
        answer = num * 25;
        questionStr = `${num} × 25 = ?`;
    } else if (levelId === 13) {
        num = randInt(12, 60);
        answer = num * 99;
        questionStr = `${num} × 99 = ?`;
    } else if (levelId === 14) {
        num = randInt(57, 99);
        answer = num * 11;
        questionStr = `${num} × 11 = ?`;
    } else if (levelId === 15) {
        const m = randInt(5, 20);
        num1 = m - 1;
        num2 = m + 1;
        answer = num1 * num2;
        questionStr = `${num1} × ${num2} = ?`;
    } else if (levelId === 16) {
        const T = randInt(2, 8);
        const A = randInt(1, 4);
        num1 = T * 10 + A;
        num2 = T * 10 + (10 - A);
        answer = num1 * num2;
        questionStr = `${num1} × ${num2} = ?`;
    }

    return { questionStr, answer, levelId };
}

// ==================== RESULTS SCREEN ====================
function showResults(score, total) {
    showScreen('screen-results');

    const percentage = (score / total) * 100;
    const passed = percentage >= 60;
    const stars = getStarRating(score, total);

    if (passed) {
        playSound('celebrate');
    }

    document.getElementById('results-title').textContent = passed ? '🎉 Great Job!' : '📚 Keep Practicing!';
    document.getElementById('results-title').style.color = passed ? 'var(--dom-accent)' : 'var(--qm-red)';

    let starsHtml = '';
    for (let i = 0; i < 3; i++) {
        starsHtml += `<span class="${i < stars ? 'qm-result-star--filled' : 'qm-result-star--empty'}"></span>`;
    }
    document.getElementById('results-stars').innerHTML = starsHtml;

    const ratingText = stars === 3 ? 'Perfect!' : stars === 2 ? 'Great!' : stars === 1 ? 'Good Try!' : 'Keep Going!';
    document.getElementById('results-rating').textContent = ratingText;

    document.getElementById('results-score').textContent = `Score: ${score}/${total}`;
    document.getElementById('results-percentage').textContent = `${percentage.toFixed(0)}%`;

    playerProgress.gamesPlayed++;
    playerProgress.totalScore += score;

    const currentBestStars = playerProgress.levelStars[currentLevelId] || 0;
    if (stars > currentBestStars) {
        playerProgress.levelStars[currentLevelId] = stars;
    }

    playerProgress.totalStars = Object.values(playerProgress.levelStars).reduce((a, b) => a + b, 0);

    saveProgress();
    checkAndUnlockAchievements();

    document.getElementById('btn-try-again').onclick = () => {
        playSound('click');
        startPractice(currentLevelId);
    };

    document.getElementById('btn-level-select').onclick = () => {
        playSound('click');
        showLevelSelect();
    };
}

// ==================== PROGRESS SCREEN ====================
function showProgressScreen() {
    showScreen('screen-progress');

    document.getElementById('stat-stars').textContent = playerProgress.totalStars;
    document.getElementById('stat-games').textContent = playerProgress.gamesPlayed;
    document.getElementById('stat-score').textContent = playerProgress.totalScore;

    const achievementsGrid = document.getElementById('achievements-grid');
    achievementsGrid.innerHTML = '';

    Object.values(ACHIEVEMENTS).forEach(ach => {
        const unlocked = playerProgress.achievements.includes(ach.id);
        const card = document.createElement('div');
        card.className = `qm-achievement-card ${!unlocked ? 'locked' : ''}`;
        card.innerHTML = `
            <div class="qm-achievement-icon">${unlocked ? ach.icon : '🔒'}</div>
            <div class="qm-achievement-name">${ach.name}</div>
            <div class="qm-achievement-desc">${ach.description}</div>
        `;
        achievementsGrid.appendChild(card);
    });

    document.getElementById('btn-back-from-progress').onclick = () => {
        playSound('click');
        showLevelSelect();
    };
}

function showLevelSelect() {
    showScreen('screen-level-select');

    document.getElementById('btn-progress').onclick = () => {
        playSound('click');
        showProgressScreen();
    };
}

// ==================== SOUND TOGGLE ====================
document.getElementById('sound-toggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    document.getElementById('sound-toggle').textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled) {
        initAudio();
        playSound('click');
    }
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderLevelGrid();
    showLevelSelect();

    document.addEventListener('click', () => {
        initAudio();
    }, { once: true });
});

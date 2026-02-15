# Game Behavior & Flow Consistency Guide

This guide ensures all Doodles Games follow consistent behavioral patterns for a professional, predictable user experience.

## 🎮 Standard Game Flow

All games should follow this basic flow (with documented exceptions):

```
1. START SCREEN (Welcome)
   ↓
2. GAMEPLAY (Main game loop)
   ↓
3. END SCREEN (Game Over / Victory)
   ↓
4. RESTART or EXIT
```

---

## 📋 Standard Screens & Components

### 1. **Start Screen** (Mandatory)

**Purpose:** Welcome player, show instructions, set expectations

**Must Include:**
- Game title with icon/emoji
- Brief instructions (1-3 lines)
- START button (large, prominent)
- Optional: Difficulty selector
- Optional: High score display

**Example:**
```javascript
function showStartScreen(scene) {
    const center = getCenterPosition(scene);

    // Title
    scene.add.text(center.x, 100, '🎮 Game Title',
        TYPOGRAPHY.phaserStyles.heading
    ).setOrigin(0.5);

    // Instructions
    scene.add.text(center.x, 200, 'Brief instructions here', {
        fontSize: '20px',
        fill: COLORS.neutral.darkText.hex,
        align: 'center'
    }).setOrigin(0.5);

    // Start button
    createButton(
        scene, center.x, center.y + 100,
        'START',
        () => startGameplay(scene),
        { variant: ButtonVariants.PRIMARY, size: ButtonSizes.LARGE }
    );
}
```

---

### 2. **Gameplay Screen** (Mandatory)

**Must Include:**
- Score display (consistent position: top-left or top-center)
- Timer (if timed game) - top-right
- Clear game area
- Consistent control layout
- Pause button (optional but recommended)

**UI Layout Standards:**
```javascript
// Standard UI positions
const UI_POSITIONS = {
    score: { x: 20, y: 20 },           // Top-left
    timer: { x: width - 150, y: 20 },  // Top-right
    lives: { x: width - 100, y: 70 }   // Below timer
};

// Score display
scoreText = scene.add.text(20, 20, 'Score: 0', {
    fontSize: '24px',
    fill: COLORS.neutral.darkText.hex,
    fontFamily: 'Arial, sans-serif',
    fontStyle: 'bold',
    backgroundColor: COLORS.neutral.lightBg.hex,
    padding: { x: 10, y: 5 }
});
```

---

### 3. **Game Over Screen** (Mandatory)

**Purpose:** Show results, encourage replay

**Must Include:**
- Clear "Game Over" or "You Win" message
- Final score display
- PLAY AGAIN button (prominent)
- Optional: High score comparison
- Optional: EXIT button

**Example:**
```javascript
function showGameOver(scene, finalScore, didWin) {
    const center = getCenterPosition(scene);

    // Modal overlay
    createModal(
        scene,
        didWin ? '🎉 You Win!' : '💀 Game Over!',
        `Final Score: ${finalScore}`,
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
```

---

## 🎯 Behavioral Standards

### Control Consistency

**For Click/Touch Games:**
- Click/tap targets should be at least 44x44px for mobile accessibility
- Use `setInteractive({ useHandCursor: true })` for all interactive elements
- Provide visual feedback on hover/press

**For Keyboard Games:**
- Display keyboard controls prominently
- Use standard keys (arrow keys, WASD, spacebar)
- Allow key remapping if possible

---

### Feedback Patterns

**Success Feedback:**
```javascript
// ✅ Correct answer
feedbackText.setText('✓ Correct!');
feedbackText.setColor(COLORS.success.hex);

// Particle effect or animation
scene.tweens.add({
    targets: element,
    scale: 1.2,
    alpha: 0,
    duration: 500
});
```

**Error Feedback:**
```javascript
// ❌ Wrong answer
feedbackText.setText('✗ Try again');
feedbackText.setColor(COLORS.error.hex);

// Shake animation
scene.tweens.add({
    targets: element,
    x: element.x + 10,
    yoyo: true,
    repeat: 2,
    duration: 100
});
```

---

### Score & Progress Display

**Standard Score Display:**
- Always visible during gameplay
- Top-left or top-center position
- Clear, large font (24px+)
- Format: "Score: 1234" or "⭐ 1234"

**Progress Indicators:**
- Use progress bars for levels/time
- Show current level/stage clearly
- Display milestones (e.g., "Level 3/10")

---

### Difficulty Progression

**Standard Patterns:**
- Start easy, gradually increase difficulty
- Increase difficulty every N points/levels
- Show difficulty indicators (Easy/Medium/Hard)
- Provide visual/color cues for difficulty

**Example:**
```javascript
// Increase difficulty every 50 points
if (score % 50 === 0 && score > 0) {
    increaseDifficulty();
    showDifficultyMessage(scene, 'Speed increased!');
}
```

---

## 🔄 Navigation Patterns

### Standard Navigation

**Back to Menu:**
- Always accessible via back button (top-left)
- Or EXIT button in end screens
- Confirm before exiting during gameplay (optional)

**Restart:**
- Available in Game Over screen
- Optional: Pause menu restart option
- Use `scene.scene.restart()` for full reset

---

## ⚙️ Optional Features (Recommended)

### Pause Functionality
```javascript
function createPauseButton(scene) {
    const pauseBtn = createButton(
        scene, scene.scale.width - 60, 20,
        '⏸️',
        () => showPauseMenu(scene),
        { variant: ButtonVariants.GHOST, size: ButtonSizes.SMALL }
    );
}

function showPauseMenu(scene) {
    scene.scene.pause();
    createModal(
        scene,
        'Paused',
        'Take a break!',
        [
            { label: 'RESUME', callback: () => scene.scene.resume() },
            { label: 'RESTART', callback: () => scene.scene.restart() },
            { label: 'EXIT', callback: () => goToMenu() }
        ]
    );
}
```

### Sound Toggle
```javascript
// Global sound state
let soundEnabled = true;

function createSoundToggle(scene) {
    const soundBtn = scene.add.text(
        scene.scale.width - 60, 60,
        soundEnabled ? '🔊' : '🔇',
        { fontSize: '24px' }
    );
    soundBtn.setInteractive({ useHandCursor: true });
    soundBtn.on('pointerdown', () => toggleSound(soundBtn));
}
```

---

## 📊 Standard Game States

All games should maintain these states:

```javascript
const GameState = {
    MENU: 'menu',           // Start screen
    PLAYING: 'playing',     // Active gameplay
    PAUSED: 'paused',       // Paused (optional)
    GAME_OVER: 'gameOver',  // Lost/failed
    VICTORY: 'victory'      // Won/completed
};

let currentState = GameState.MENU;
```

---

## 🎨 Visual Consistency Checklist

- [ ] Use design system colors (COLORS object)
- [ ] Use typography styles (TYPOGRAPHY.phaserStyles)
- [ ] Use createButton() for all buttons
- [ ] Consistent spacing (LAYOUT.spacing)
- [ ] Responsive positioning (getCenterPosition, getResponsivePosition)
- [ ] Proper depth/z-index (UI on top of gameplay)

---

## 🏆 Behavioral Consistency Checklist

- [ ] Start screen with instructions
- [ ] Consistent UI layout (score top-left, timer top-right)
- [ ] Clear feedback for actions
- [ ] Game over/victory screen with replay option
- [ ] Back button always accessible
- [ ] Responsive to mobile (touch-friendly)
- [ ] Keyboard controls displayed (if applicable)
- [ ] Progress indicators visible
- [ ] Difficulty progression clear
- [ ] Pause functionality (recommended)

---

## ⚠️ Documented Exceptions

Some games may deviate from standards when necessary:

**Example Exceptions:**
- **Quick tutorial games**: May skip start screen if self-explanatory
- **Endless games**: No victory screen, only high score tracking
- **Arcade-style games**: May auto-start after brief countdown
- **Educational games**: May require more detailed instructions

**When creating exceptions:**
1. Document the reason in code comments
2. Ensure it improves user experience
3. Maintain visual consistency regardless

---

## 🚀 Implementation Priority

When migrating/creating games:

1. **Critical** (must implement):
   - Start screen with instructions
   - Consistent UI positions
   - Game over screen with replay
   - Design system colors/typography

2. **Recommended** (should implement):
   - Pause functionality
   - Sound toggle
   - Difficulty indicators
   - Progress tracking

3. **Optional** (nice to have):
   - High score system
   - Achievements
   - Multiple difficulty modes
   - Tutorial overlays

---

## Example: Complete Game Flow

```javascript
// 1. Start Screen
function create() {
    showStartScreen(this);
}

function showStartScreen(scene) {
    // Title, instructions, start button
    createButton(scene, x, y, 'START', () => startGame(scene));
}

// 2. Gameplay
function startGame(scene) {
    currentState = GameState.PLAYING;
    setupUI(scene);
    startGameLoop(scene);
}

// 3. End Screen
function endGame(scene, didWin) {
    currentState = didWin ? GameState.VICTORY : GameState.GAME_OVER;
    showEndScreen(scene, finalScore, didWin);
}

function showEndScreen(scene, score, won) {
    createModal(
        scene,
        won ? '🎉 Victory!' : '💀 Game Over',
        `Score: ${score}`,
        [
            { label: 'PLAY AGAIN', callback: () => scene.scene.restart() },
            { label: 'EXIT', callback: () => goToMenu() }
        ]
    );
}
```

---

This guide ensures all games provide a consistent, professional experience while allowing flexibility for game-specific needs.

/**
 * Doodles Games - UI Components Library
 *
 * Reusable, consistent UI components for Phaser 3 games
 * Ensures professional, uniform appearance across all games
 *
 * Design Pattern: Material Design 3 + Gaming aesthetics
 * - Rounded corners for friendliness
 * - Clear visual hierarchy
 * - Consistent spacing and sizing
 * - Interactive feedback (hover, press states)
 * - Accessible colors and sizing
 */

/**
 * Button Variants (Design System)
 */
const ButtonVariants = {
    PRIMARY: 'primary',      // Main actions (Start, Play, Continue)
    SECONDARY: 'secondary',  // Secondary actions (Settings, Info)
    SUCCESS: 'success',      // Positive actions (Submit, Confirm)
    DANGER: 'danger',        // Destructive actions (Delete, Reset)
    GHOST: 'ghost'           // Minimal style (Back, Cancel)
};

/**
 * Button Sizes
 */
const ButtonSizes = {
    SMALL: 'small',      // 120x40
    MEDIUM: 'medium',    // 180x55
    LARGE: 'large'       // 240x70
};

/**
 * Get button styling based on variant
 * @private
 */
function getButtonStyle(variant) {
    const styles = {
        primary: {
            bgColor: 0xA44A3F,           // Brick red
            bgColorHover: 0x8B3A30,
            bgColorPressed: 0x6B2A22,
            textColor: '#FFFFFF',
            shadowColor: 0x3E1F1A,
            shadowAlpha: 0.25
        },
        secondary: {
            bgColor: 0x8B6456,           // Muted brick
            bgColorHover: 0x7A5548,
            bgColorPressed: 0x6A4538,
            textColor: '#FFFFFF',
            shadowColor: 0x3E1F1A,
            shadowAlpha: 0.2
        },
        success: {
            bgColor: 0xA44A3F,           // Brick red (only palette color dark enough for white text)
            bgColorHover: 0x8B3A30,
            bgColorPressed: 0x6B2A22,
            textColor: '#FFFFFF',
            shadowColor: 0x3E1F1A,
            shadowAlpha: 0.25
        },
        danger: {
            bgColor: 0xA44A3F,           // Brick red
            bgColorHover: 0x6B2A22,
            bgColorPressed: 0x4F1A14,
            textColor: '#FFFFFF',
            shadowColor: 0x3E1F1A,
            shadowAlpha: 0.3
        },
        ghost: {
            bgColor: 0x8B6456,           // Muted brick, semi-transparent
            bgColorHover: 0x7A5548,
            bgColorPressed: 0x6A4538,
            textColor: '#FFFFFF',
            shadowColor: 0x3E1F1A,
            shadowAlpha: 0.15,
            alpha: 0.55,
            alphaHover: 0.75,
            alphaPressed: 0.9
        }
    };

    return styles[variant] || styles.primary;
}

/**
 * Get button dimensions based on size
 * @private
 */
function getButtonSize(size) {
    const sizes = {
        small: { width: 140, height: 45, fontSize: '16px', padding: 8 },
        medium: { width: 200, height: 60, fontSize: '18px', padding: 12 },
        large: { width: 260, height: 75, fontSize: '22px', padding: 16 }
    };

    return sizes[size] || sizes.medium;
}

/**
 * Creates a professional, interactive button
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {number} x - X position (center)
 * @param {number} y - Y position (center)
 * @param {string} label - Button text
 * @param {Function} callback - Click handler
 * @param {Object} options - Optional configuration
 * @param {string} options.variant - Button variant (PRIMARY, SECONDARY, etc.)
 * @param {string} options.size - Button size (SMALL, MEDIUM, LARGE)
 * @param {string} options.icon - Optional emoji icon
 * @returns {Object} Button object with {container, bg, text, destroy()}
 */
function createButton(scene, x, y, label, callback, options = {}) {
    const {
        variant = ButtonVariants.PRIMARY,
        size = ButtonSizes.MEDIUM,
        icon = null
    } = options;

    const style = getButtonStyle(variant);
    const dimensions = getButtonSize(size);

    // Standalone background — NOT inside a Phaser Container.
    // Phaser Container children do not correctly propagate setScrollFactor(0)
    // to their hit-area when the camera is scrolled, causing touch misses.
    // Standalone objects with setScrollFactor(0) work correctly.
    const bg = scene.add.rectangle(x, y, dimensions.width, dimensions.height, style.bgColor);
    bg.setOrigin(0.5);
    bg.setInteractive({ useHandCursor: true });
    if (style.alpha) bg.setAlpha(style.alpha);

    // Standalone text (rendered just above bg)
    const displayText = icon ? `${icon} ${label}` : label;
    const text = scene.add.text(x, y, displayText, {
        fontSize: dimensions.fontSize,
        fill: style.textColor,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center'
    });
    text.setOrigin(0.5);

    // Scale both objects together (replaces container.setScale)
    const setScale = (s) => { bg.setScale(s); text.setScale(s); };

    // Interaction states
    let isPressed = false;

    bg.on('pointerover', () => {
        if (!isPressed) {
            bg.setFillStyle(style.bgColorHover);
            if (style.alphaHover) bg.setAlpha(style.alphaHover);
            setScale(1.03);
        }
    });

    bg.on('pointerout', () => {
        if (!isPressed) {
            bg.setFillStyle(style.bgColor);
            if (style.alpha) bg.setAlpha(style.alpha);
            setScale(1);
        }
    });

    bg.on('pointerdown', () => {
        isPressed = true;
        bg.setFillStyle(style.bgColorPressed);
        if (style.alphaPressed) bg.setAlpha(style.alphaPressed);
        setScale(0.97);
    });

    bg.on('pointerup', () => {
        isPressed = false;
        bg.setFillStyle(style.bgColorHover);
        if (style.alphaHover) bg.setAlpha(style.alphaHover);
        setScale(1.03);
        if (callback && typeof callback === 'function') {
            callback();
        }
    });

    // Compatibility shim so existing callers can still do:
    //   btn.container.setScrollFactor(0).setDepth(N)
    const containerShim = {
        setScrollFactor: (sfx, sfy) => {
            const sy = (sfy !== undefined) ? sfy : sfx;
            bg.setScrollFactor(sfx, sy);
            text.setScrollFactor(sfx, sy);
            return containerShim;
        },
        setDepth: (d) => {
            bg.setDepth(d);
            text.setDepth(d + 1); // text always one layer above bg
            return containerShim;
        },
        setPosition: (nx, ny) => {
            bg.setPosition(nx, ny);
            text.setPosition(nx, ny);
            return containerShim;
        },
        setVisible: (v) => {
            bg.setVisible(v);
            text.setVisible(v);
            return containerShim;
        },
        setScale: (s) => { setScale(s); return containerShim; },
        setAlpha: (a) => { bg.setAlpha(a); text.setAlpha(a); return containerShim; },
        setName: (n) => {
            bg.setName(n);
            return containerShim;
        },
        destroy: () => { bg.destroy(); text.destroy(); }
    };

    return {
        container: containerShim,
        background: bg,
        text: text,
        setPosition: (newX, newY) => { bg.setPosition(newX, newY); text.setPosition(newX, newY); },
        setVisible: (visible) => { bg.setVisible(visible); text.setVisible(visible); },
        setText: (newText) => {
            text.setText(icon ? `${icon} ${newText}` : newText);
        },
        setEnabled: (enabled) => {
            if (enabled) {
                bg.setInteractive({ useHandCursor: true });
                bg.setAlpha(style.alpha || 1);
            } else {
                bg.disableInteractive();
                bg.setAlpha(0.5);
            }
        },
        destroy: () => { bg.destroy(); text.destroy(); }
    };
}

/**
 * Creates a rounded card/panel for content
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {number} x - X position (center)
 * @param {number} y - Y position (center)
 * @param {number} width - Card width
 * @param {number} height - Card height
 * @param {Object} options - Optional configuration
 * @returns {Object} Card object with {container, bg, destroy()}
 */
function createCard(scene, x, y, width, height, options = {}) {
    const {
        bgColor = 0xFFFFFF,
        borderColor = 0xE5E7EB,
        borderWidth = 2,
        shadowDepth = 3
    } = options;

    const container = scene.add.container(x, y);

    // Shadow
    const shadow = scene.add.rectangle(0, shadowDepth, width, height, 0x000000, 0.1);
    shadow.setOrigin(0.5);

    // Background
    const bg = scene.add.rectangle(0, 0, width, height, bgColor);
    bg.setOrigin(0.5);
    bg.setStrokeStyle(borderWidth, borderColor);

    container.add([shadow, bg]);

    return {
        container: container,
        background: bg,
        addChild: (child) => container.add(child),
        setPosition: (newX, newY) => container.setPosition(newX, newY),
        destroy: () => container.destroy()
    };
}

/**
 * Creates a progress bar
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {number} x - X position (left edge)
 * @param {number} y - Y position (top edge)
 * @param {number} width - Bar width
 * @param {number} height - Bar height
 * @param {Object} options - Optional configuration
 * @returns {Object} Progress bar object with {container, update(), destroy()}
 */
function createProgressBar(scene, x, y, width, height, options = {}) {
    const {
        bgColor = 0xE5E7EB,
        fillColor = 0x10B981,
        borderColor = 0x9CA3AF,
        borderWidth = 2,
        initialProgress = 0
    } = options;

    const container = scene.add.container(x, y);

    // Background
    const bg = scene.add.rectangle(0, 0, width, height, bgColor);
    bg.setOrigin(0, 0);
    bg.setStrokeStyle(borderWidth, borderColor);

    // Fill (progress indicator)
    const fill = scene.add.rectangle(
        borderWidth, borderWidth,
        (width - borderWidth * 2) * initialProgress,
        height - borderWidth * 2,
        fillColor
    );
    fill.setOrigin(0, 0);

    container.add([bg, fill]);

    return {
        container: container,
        update: (progress) => {
            // Clamp progress between 0 and 1
            const clampedProgress = Math.max(0, Math.min(1, progress));
            fill.width = (width - borderWidth * 2) * clampedProgress;
        },
        setPosition: (newX, newY) => container.setPosition(newX, newY),
        destroy: () => container.destroy()
    };
}

/**
 * Creates a score display (large, prominent number)
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {string} label - Label text (e.g., "Score")
 * @param {number} initialValue - Initial score value
 * @returns {Object} Score display object with {container, updateValue(), destroy()}
 */
function createScoreDisplay(scene, x, y, label, initialValue = 0) {
    const container = scene.add.container(x, y);

    // Label
    const labelText = scene.add.text(0, 0, label, {
        fontSize: '16px',
        fill: '#6B7280',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center'
    });
    labelText.setOrigin(0.5);

    // Value (large, prominent)
    const valueText = scene.add.text(0, 30, initialValue.toString(), {
        fontSize: '36px',
        fill: '#1F2937',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center'
    });
    valueText.setOrigin(0.5);

    container.add([labelText, valueText]);

    return {
        container: container,
        updateValue: (newValue) => valueText.setText(newValue.toString()),
        setPosition: (newX, newY) => container.setPosition(newX, newY),
        destroy: () => container.destroy()
    };
}

/**
 * Creates a modal/dialog overlay
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {Array} buttons - Array of {label, callback, variant}
 * @returns {Object} Modal object with {container, destroy()}
 */
function createModal(scene, title, message, buttons = []) {
    const container = scene.add.container(0, 0);
    container.setDepth(1000); // Ensure it's on top

    // Overlay (darkens background)
    const overlay = scene.add.rectangle(
        scene.scale.width / 2,
        scene.scale.height / 2,
        scene.scale.width,
        scene.scale.height,
        0x000000,
        0.7
    );
    overlay.setInteractive(); // Blocks clicks to game behind

    // Dialog box
    const dialogWidth = Math.min(500, scene.scale.width * 0.9);
    const dialogHeight = Math.min(350, scene.scale.height * 0.7);

    const dialog = scene.add.rectangle(
        scene.scale.width / 2,
        scene.scale.height / 2,
        dialogWidth,
        dialogHeight,
        0xFFFFFF
    );
    dialog.setStrokeStyle(2, 0xE5E7EB);

    // Title
    const titleText = scene.add.text(
        scene.scale.width / 2,
        scene.scale.height / 2 - dialogHeight / 3,
        title,
        {
            fontSize: '28px',
            fill: '#1F2937',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: dialogWidth - 40 }
        }
    );
    titleText.setOrigin(0.5);

    // Message
    const messageText = scene.add.text(
        scene.scale.width / 2,
        scene.scale.height / 2 - dialogHeight / 6,
        message,
        {
            fontSize: '18px',
            fill: '#4B5563',
            fontFamily: 'Arial, sans-serif',
            align: 'center',
            wordWrap: { width: dialogWidth - 60 }
        }
    );
    messageText.setOrigin(0.5);

    container.add([overlay, dialog, titleText, messageText]);

    // Add buttons
    const buttonSpacing = 20;
    const totalButtonWidth = buttons.length * 180 + (buttons.length - 1) * buttonSpacing;
    const startX = scene.scale.width / 2 - totalButtonWidth / 2 + 90;
    const buttonY = scene.scale.height / 2 + dialogHeight / 3;

    buttons.forEach((btn, index) => {
        const buttonX = startX + index * (180 + buttonSpacing);
        const button = createButton(
            scene,
            buttonX,
            buttonY,
            btn.label,
            () => {
                if (btn.callback) btn.callback();
                container.destroy();
            },
            {
                variant: btn.variant || ButtonVariants.PRIMARY,
                size: ButtonSizes.MEDIUM
            }
        );
        container.add([button.background, button.text]);
    });

    return {
        container: container,
        destroy: () => container.destroy()
    };
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ButtonVariants,
        ButtonSizes,
        createButton,
        createCard,
        createProgressBar,
        createScoreDisplay,
        createModal
    };
}

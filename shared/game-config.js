/**
 * Shared Game Configuration Template for Doodles Games
 *
 * This module provides a consistent, responsive configuration
 * for all Phaser 3 games across desktop and mobile devices.
 *
 * Best Practices Implemented:
 * - Responsive scaling that maintains aspect ratio
 * - Proper mobile viewport handling
 * - High-DPI (Retina) display support
 * - Orientation-aware design
 * - Consistent user experience across all games
 */

/**
 * Creates a responsive Phaser game configuration
 *
 * @param {Object} options - Game-specific options
 * @param {number} options.width - Game design width (default: 900)
 * @param {number} options.height - Game design height (default: 650)
 * @param {number} options.backgroundColor - Background color (default: 0xF5F7FA)
 * @param {Object} options.physics - Physics configuration (optional)
 * @param {Object} options.scene - Scene configuration (required)
 * @returns {Object} Phaser game configuration
 */
function createGameConfig(options = {}) {
    const {
        width = 900,
        height = 650,
        backgroundColor = 0xF5F7FA,
        physics = null,
        scene
    } = options;

    const config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        parent: 'game-container',
        backgroundColor: backgroundColor,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: width,
            height: height,
            // Handle window resize for true responsiveness
            autoRound: true
        },
        scene: scene,
        // High-DPI support for Retina displays
        render: {
            pixelArt: false,
            antialias: true,
            roundPixels: true
        },
        // Performance optimizations
        fps: {
            target: 60,
            forceSetTimeOut: false
        }
    };

    // Add physics if specified
    if (physics) {
        config.physics = physics;
    }

    return config;
}

/**
 * Responsive positioning helper
 * Converts percentage-based positions to actual coordinates
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {number} xPercent - X position as percentage (0-100)
 * @param {number} yPercent - Y position as percentage (0-100)
 * @returns {Object} {x, y} coordinates
 */
function getResponsivePosition(scene, xPercent, yPercent) {
    return {
        x: (scene.scale.width * xPercent) / 100,
        y: (scene.scale.height * yPercent) / 100
    };
}

/**
 * Get center position of the game
 *
 * @param {Phaser.Scene} scene - The game scene
 * @returns {Object} {x, y} center coordinates
 */
function getCenterPosition(scene) {
    return {
        x: scene.scale.width / 2,
        y: scene.scale.height / 2
    };
}

/**
 * Detect if device is mobile
 *
 * @returns {boolean} true if mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get responsive font size based on screen dimensions
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {number} baseSize - Base font size for reference resolution
 * @returns {string} Responsive font size (e.g., "24px")
 */
function getResponsiveFontSize(scene, baseSize) {
    const scaleFactor = Math.min(scene.scale.width / 900, scene.scale.height / 650);
    return `${Math.round(baseSize * scaleFactor)}px`;
}

/**
 * Handle window resize to make games truly responsive
 * Call this in the create() function of your scene
 *
 * @param {Phaser.Scene} scene - The game scene
 * @param {Function} callback - Optional callback when resize occurs
 */
function setupResponsiveResize(scene, callback) {
    scene.scale.on('resize', (gameSize) => {
        const width = gameSize.width;
        const height = gameSize.height;

        // Update camera viewport
        scene.cameras.main.setViewport(0, 0, width, height);

        // Call custom resize handler if provided
        if (callback && typeof callback === 'function') {
            callback(width, height);
        }
    });
}

// Export functions for use in games
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createGameConfig,
        getResponsivePosition,
        getCenterPosition,
        isMobileDevice,
        getResponsiveFontSize,
        setupResponsiveResize
    };
}

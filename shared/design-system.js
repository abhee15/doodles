/**
 * Doodles Games - Design System
 *
 * Centralized color palettes, typography, and design tokens
 * for consistent, professional appearance across all games.
 *
 * Addresses common issues:
 * - Text blur/clarity problems
 * - Inconsistent color choices
 * - Poor contrast ratios
 * - Accessibility concerns
 */

/**
 * Color Palette - Based on WCAG AA accessibility standards
 * All colors tested for proper contrast ratios
 */
const COLORS = {
  // Primary Brand Colors
  primary: {
    hex: '#1CB0F6', // Dodger Blue
    phaser: 0x1cb0f6,
    rgb: 'rgb(28, 176, 246)'
  },
  secondary: {
    hex: '#FF7D00', // Bright Orange
    phaser: 0xff7d00,
    rgb: 'rgb(255, 125, 0)'
  },

  // Semantic Colors
  success: {
    hex: '#58CC02', // Bright Green
    phaser: 0x58cc02,
    rgb: 'rgb(88, 204, 2)'
  },
  error: {
    hex: '#FF4444', // Bright Red
    phaser: 0xff4444,
    rgb: 'rgb(255, 68, 68)'
  },
  warning: {
    hex: '#F59E0B', // Amber
    phaser: 0xf59e0b,
    rgb: 'rgb(245, 158, 11)'
  },
  info: {
    hex: '#3B82F6', // Blue
    phaser: 0x3b82f6,
    rgb: 'rgb(59, 130, 246)'
  },

  // Neutral Colors (for text and backgrounds)
  neutral: {
    // Dark text (use on light backgrounds)
    darkText: {
      hex: '#1F2937', // Gray-800 - PRIMARY TEXT
      phaser: 0x1f2937,
      rgb: 'rgb(31, 41, 55)'
    },
    darkTextSecondary: {
      hex: '#4B5563', // Gray-600 - SECONDARY TEXT
      phaser: 0x4b5563,
      rgb: 'rgb(75, 85, 99)'
    },

    // Light text (use on dark backgrounds)
    lightText: {
      hex: '#F9FAFB', // Gray-50 - PRIMARY LIGHT TEXT
      phaser: 0xf9fafb,
      rgb: 'rgb(249, 250, 251)'
    },
    lightTextSecondary: {
      hex: '#E5E7EB', // Gray-200 - SECONDARY LIGHT TEXT
      phaser: 0xe5e7eb,
      rgb: 'rgb(229, 231, 235)'
    },

    // Backgrounds
    lightBg: {
      hex: '#FFFFFF', // White
      phaser: 0xffffff,
      rgb: 'rgb(255, 255, 255)'
    },
    lightBgAlt: {
      hex: '#F3F4F6', // Gray-100
      phaser: 0xf3f4f6,
      rgb: 'rgb(243, 244, 246)'
    },
    darkBg: {
      hex: '#111827', // Gray-900
      phaser: 0x111827,
      rgb: 'rgb(17, 24, 39)'
    },
    darkBgAlt: {
      hex: '#1F2937', // Gray-800
      phaser: 0x1f2937,
      rgb: 'rgb(31, 41, 55)'
    }
  },

  // Category/Theme Colors (for Word Explorer, etc.)
  categories: {
    emotion: {
      hex: '#EC4899', // Pink
      phaser: 0xec4899,
      rgb: 'rgb(236, 72, 153)'
    },
    size: {
      hex: '#8B5CF6', // Violet
      phaser: 0x8b5cf6,
      rgb: 'rgb(139, 92, 246)'
    },
    time: {
      hex: '#F97316', // Orange
      phaser: 0xf97316,
      rgb: 'rgb(249, 115, 22)'
    },
    action: {
      hex: '#10B981', // Green
      phaser: 0x10b981,
      rgb: 'rgb(16, 185, 129)'
    },
    concept: {
      hex: '#0EA5E9', // Sky
      phaser: 0x0ea5e9,
      rgb: 'rgb(14, 165, 233)'
    }
  },

  // Game-specific palettes
  mathGames: {
    correct: 0x10b981, // Success green
    incorrect: 0xef4444, // Error red
    neutral: 0x6b7280 // Gray
  }
};

/**
 * Typography Settings for Sharp, Clear Text
 *
 * Best practices for crisp text rendering in Phaser:
 * - Use sans-serif fonts (better on screens)
 * - Avoid white text on light backgrounds (low contrast = blur)
 * - Use proper font sizes (not too small)
 * - Enable antialiasing in Phaser config
 */
const TYPOGRAPHY = {
  // Font families (fallback chain for cross-platform support)
  fonts: {
    primary: "'Nunito', 'Segoe UI', system-ui, -apple-system, sans-serif",
    monospace: "'Consolas', 'Monaco', 'Courier New', monospace",
    playful: "'Comic Sans MS', 'Chalkboard SE', 'Arial Rounded MT Bold', sans-serif"
  },

  // Font sizes (base: 16px reference)
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px'
  },

  // Font weights
  weights: {
    normal: 'normal',
    bold: 'bold',
    600: '600'
  },

  // Phaser text style presets for crisp rendering
  // Note: Arial is intentional here because Phaser renders canvas text and cannot use CSS-loaded web fonts
  phaserStyles: {
    // Heading style (large, bold, crisp)
    heading: {
      fontSize: '48px',
      fill: '#1F2937', // Dark text for contrast
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#FFFFFF', // Subtle outline for clarity
      strokeThickness: 2
    },

    // Subheading style
    subheading: {
      fontSize: '24px',
      fill: '#4B5563',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center'
    },

    // Body text style (readable, clear)
    body: {
      fontSize: '18px',
      fill: '#1F2937',
      fontFamily: 'Arial, sans-serif',
      align: 'left',
      wordWrap: { width: 600, useAdvancedWrap: true }
    },

    // Button text style
    button: {
      fontSize: '18px',
      fill: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center'
    },

    // Score/number display (large, monospace for alignment)
    score: {
      fontSize: '32px',
      fill: '#1F2937',
      fontFamily: 'Courier New, monospace',
      fontStyle: 'bold',
      align: 'center'
    }
  }
};

/**
 * Layout Constants for Consistent Spacing
 */
const LAYOUT = {
  // Spacing scale (multiples of 4px)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64
  },

  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },

  // Common screen breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  }
};

/**
 * Helper function to get contrast-safe text color
 * Returns dark text for light backgrounds, light text for dark backgrounds
 *
 * @param {number} backgroundColor - Phaser color value
 * @returns {string} Hex color string for text
 */
function getContrastTextColor(backgroundColor) {
  // Convert Phaser color to RGB
  const r = (backgroundColor >> 16) & 0xff;
  const g = (backgroundColor >> 8) & 0xff;
  const b = backgroundColor & 0xff;

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return dark text for light backgrounds, light text for dark backgrounds
  return luminance > 0.5 ? COLORS.neutral.darkText.hex : COLORS.neutral.lightText.hex;
}

/**
 * Create a text style with automatic contrast adjustment
 *
 * @param {Object} baseStyle - Base Phaser text style
 * @param {number} backgroundColor - Background color for contrast calculation
 * @returns {Object} Enhanced text style
 */
function createContrastTextStyle(baseStyle, backgroundColor) {
  return {
    ...baseStyle,
    fill: getContrastTextColor(backgroundColor)
  };
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COLORS,
    TYPOGRAPHY,
    LAYOUT,
    getContrastTextColor,
    createContrastTextStyle
  };
}

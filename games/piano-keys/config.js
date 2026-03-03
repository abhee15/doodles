/**
 * Piano Keys Game — Configuration
 * Centralized constants for game tuning
 */

const CONFIG = {
  // ── Game Dimensions ────────────────────────────
  GAME_WIDTH: 900,
  GAME_HEIGHT: 650,
  BACKGROUND_COLOR: 0x0d1b2a,

  // ── Audio ──────────────────────────────────────
  AUDIO: {
    // Piano note synthesis (Web Audio)
    NOTE_VOLUME: 0.35,
    NOTE_FADE_TIME: 0.01,
    HARMONICS: [
      { multiplier: 1, volume: 0.5, type: 'sine' }, // Fundamental
      { multiplier: 2, volume: 0.25, type: 'sine' }, // 2nd (brightness)
      { multiplier: 3, volume: 0.15, type: 'sine' }, // 3rd
      { multiplier: 4, volume: 0.08, type: 'sine' } // 4th (clarity)
    ],
    // Key tap feedback
    KEY_TAP_FREQ_START: 800,
    KEY_TAP_FREQ_END: 200,
    KEY_TAP_DURATION: 0.1,
    KEY_TAP_VOLUME: 0.1,
    // Miss sound
    MISS_FREQ_START: 400,
    MISS_FREQ_END: 100,
    MISS_DURATION: 0.2,
    MISS_VOLUME: 0.15
  },

  // ── Gameplay Timing ────────────────────────────
  HIT_WINDOW_MS: 150, // ±150ms to hit a note
  FALL_SPEED_PX_PER_MS: 0.3, // Normal play speed (300px/s)
  FALL_SPEED_LEARN_MS: 0.1, // Learning mode (3x slower)
  LEAD_IN_MS: 2000, // Time before first note
  CHORD_AUTO_ADVANCE_MS: 4000, // Time each chord displays

  // ── Piano Layout ───────────────────────────────
  HUD_HEIGHT: 70,
  WHITE_KEY_BORDER_WIDTH: 2,
  WHITE_KEY_BORDER_COLOR: 0x333333,
  BLACK_KEY_BORDER_WIDTH: 2,
  BLACK_KEY_BORDER_COLOR: 0x111111,
  BLACK_KEY_LABEL_COLOR: 0xffffff,
  HIT_LINE_COLOR: 0xffff00,
  HIT_LINE_WIDTH: 2,
  HIT_LINE_OFFSET: 22, // pixels above piano

  // ── Scoring ────────────────────────────────────
  POINTS_PER_NOTE: 10,
  COMBO_THRESHOLD: 5, // Gold combo at 5+
  COMBO_MULTIPLIER: 1.5,

  // ── Colors ─────────────────────────────────────
  COLORS: {
    WHITE_KEY: 0xffffff,
    BLACK_KEY: 0x000000,
    HIGHLIGHT: 0xffd700, // Gold for correct keys
    MISS: 0xff4444, // Red for missed notes
    TEXT_PRIMARY: 0xffffff,
    TEXT_SECONDARY: 0xcccccc,
    TEXT_ACCENT: 0xf9a8d4, // Pink
    BUTTON_BG_ACTIVE: 0x4a4a4a,
    BUTTON_BG_INACTIVE: 0x2a2a2a
  },

  // ── Responsive Breakpoints ─────────────────────
  MOBILE_WIDTH_THRESHOLD: 768,
  MOBILE_HEIGHT_THRESHOLD: 500,

  // ── Font Sizes ─────────────────────────────────
  FONT: {
    TITLE: { size: '48px', weight: '900' },
    HEADING: { size: '24px', weight: '700' },
    BODY: { size: '16px', weight: '400' },
    SMALL: { size: '12px', weight: '400' },
    NOTE_LABEL: { size: '20px', weight: '600', family: 'Arial' },
    SCORE: { size: '24px', weight: '700' }
  },

  // ── Screen States ──────────────────────────────
  SCREEN: {
    MENU: 0,
    LEARN: 1,
    LEARN_SONG: 2,
    SONG_SELECT: 3,
    PLAY: 4,
    RESULTS: 5
  },

  // ── Keyboard Mapping ───────────────────────────
  KEYBOARD_MAP: {
    // White keys (C4-C5)
    z: 'C4',
    x: 'D4',
    c: 'E4',
    v: 'F4',
    b: 'G4',
    n: 'A4',
    m: 'B4',
    ',': 'C5',
    // Black keys (C#4, D#4, F#4, G#4, A#4)
    s: 'C#4',
    d: 'D#4',
    g: 'F#4',
    h: 'G#4',
    j: 'A#4'
  },

  KEYBOARD_LABELS: {
    C4: 'Z',
    D4: 'X',
    E4: 'C',
    F4: 'V',
    G4: 'B',
    A4: 'N',
    B4: 'M',
    C5: ','
  },

  // ── Mobile Piano Layout ────────────────────────
  MOBILE: {
    PIANO_HEIGHT_RATIO: 0.75, // 75% of screen height
    PIANO_PADDING: 10, // pixels on each side
    BUTTON_TOP_OFFSET: 40 // pixels above piano
  },

  // ── Desktop Piano Layout ──────────────────────
  DESKTOP: {
    MAX_PIANO_WIDTH: 860, // pixels
    PIANO_Y_OFFSET: 160 // pixels from bottom
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

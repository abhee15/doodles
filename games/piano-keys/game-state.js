/**
 * Game State Manager
 * Centralized state management for the Piano Keys game
 */

class GameStateManager {
  constructor(config) {
    this.config = config;
    this.state = this.createInitialState();
  }

  /**
   * Create initial game state
   */
  createInitialState() {
    return {
      // Screen management
      currentScreen: this.config.SCREEN.MENU,
      prevScreen: null,

      // Device info
      isMobile: false,
      canvasWidth: this.config.GAME_WIDTH,
      canvasHeight: this.config.GAME_HEIGHT,

      // Piano setup
      whiteNotes: [],
      blackNotePositions: [],
      whiteKeyWidth: 0,
      blackKeyWidth: 0,
      pianoY: 0,

      // Audio context
      audioCtx: null,

      // Learn mode - chord progression
      selectedChordSong: null,
      currentChordIndex: 0,
      chordLessonTimer: null,

      // Play mode - falling notes
      selectedSong: null,
      songStartTime: null,
      speedMultiplier: 1,
      isPlaying: false,
      activeNotes: [],
      spawnTimers: [],

      // Scoring (Play Along mode)
      score: 0,
      combo: 0,
      maxCombo: 0,

      // Interaction state
      currentChord: null,
      highlightedKeys: new Set(),
      keyboardState: new Map(),
      keysPressed: new Set(),
      autoPlayChord: false,
      autoPlayTimer: null
    };
  }

  /**
   * Reset state for a specific screen
   */
  resetForScreen(screenId) {
    switch (screenId) {
      case this.config.SCREEN.MENU:
        this.setScreen(screenId);
        break;
      case this.config.SCREEN.LEARN:
        this.setScreen(screenId);
        this.state.selectedChordSong = null;
        this.state.currentChordIndex = 0;
        this.state.chordLessonTimer = null;
        break;
      case this.config.SCREEN.LEARN_SONG:
        this.setScreen(screenId);
        this.state.currentChordIndex = 0;
        this.state.chordLessonTimer = null;
        break;
      case this.config.SCREEN.SONG_SELECT:
        this.setScreen(screenId);
        this.state.selectedSong = null;
        this.state.speedMultiplier = 1;
        break;
      case this.config.SCREEN.PLAY:
        this.setScreen(screenId);
        this.state.songStartTime = null;
        this.state.isPlaying = false;
        this.state.score = 0;
        this.state.combo = 0;
        this.state.maxCombo = 0;
        this.state.activeNotes = [];
        this.clearSpawnTimers();
        break;
      case this.config.SCREEN.RESULTS:
        this.setScreen(screenId);
        break;
    }
  }

  /**
   * Set the current screen
   */
  setScreen(screenId) {
    this.state.prevScreen = this.state.currentScreen;
    this.state.currentScreen = screenId;
  }

  /**
   * Get current screen ID
   */
  getCurrentScreen() {
    return this.state.currentScreen;
  }

  /**
   * Get previous screen ID
   */
  getPrevScreen() {
    return this.state.prevScreen;
  }

  /**
   * Initialize audio context
   */
  initAudio() {
    if (this.state.audioCtx) {
      return;
    }
    this.state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  /**
   * Get audio context (initializes if needed)
   */
  getAudioContext() {
    if (!this.state.audioCtx) {
      this.initAudio();
    }
    return this.state.audioCtx;
  }

  /**
   * Update canvas dimensions
   */
  setCanvasDimensions(width, height) {
    this.state.canvasWidth = width;
    this.state.canvasHeight = height;
  }

  /**
   * Set piano configuration
   */
  setPianoConfig(whiteNotes, blackNotePositions, whiteKeyWidth, blackKeyWidth, pianoY) {
    this.state.whiteNotes = whiteNotes;
    this.state.blackNotePositions = blackNotePositions;
    this.state.whiteKeyWidth = whiteKeyWidth;
    this.state.blackKeyWidth = blackKeyWidth;
    this.state.pianoY = pianoY;
  }

  /**
   * Set selected chord song for learning
   */
  selectChordSong(song) {
    this.state.selectedChordSong = song;
    this.state.currentChordIndex = 0;
  }

  /**
   * Advance to next chord in lesson
   */
  nextChord() {
    if (!this.state.selectedChordSong) {
      return;
    }
    const song = this.state.selectedChordSong;
    this.state.currentChordIndex = (this.state.currentChordIndex + 1) % song.chords.length;
  }

  /**
   * Get current chord in lesson
   */
  getCurrentChord() {
    if (!this.state.selectedChordSong) {
      return null;
    }
    return this.state.selectedChordSong.chords[this.state.currentChordIndex];
  }

  /**
   * Set selected song for playing
   */
  selectSong(song) {
    this.state.selectedSong = song;
    this.state.songStartTime = null;
    this.state.isPlaying = false;
    this.state.activeNotes = [];
    this.clearSpawnTimers();
  }

  /**
   * Get selected song
   */
  getSelectedSong() {
    return this.state.selectedSong;
  }

  /**
   * Set speed multiplier (0.5, 1, 1.5, etc)
   */
  setSpeed(multiplier) {
    this.state.speedMultiplier = multiplier;
  }

  /**
   * Start song playback
   */
  startSong(startTime) {
    this.state.songStartTime = startTime;
    this.state.isPlaying = true;
    this.state.score = 0;
    this.state.combo = 0;
    this.state.maxCombo = 0;
  }

  /**
   * Stop song playback
   */
  stopSong() {
    this.state.isPlaying = false;
    this.clearSpawnTimers();
  }

  /**
   * Add a falling note to active notes
   */
  addNote(noteData) {
    this.state.activeNotes.push(noteData);
  }

  /**
   * Remove a note from active notes
   */
  removeNote(note) {
    const idx = this.state.activeNotes.indexOf(note);
    if (idx !== -1) {
      this.state.activeNotes.splice(idx, 1);
    }
  }

  /**
   * Register a spawn timer for cancellation
   */
  addSpawnTimer(timerId) {
    this.state.spawnTimers.push(timerId);
  }

  /**
   * Clear all spawn timers
   */
  clearSpawnTimers() {
    this.state.spawnTimers.forEach(timerId => clearTimeout(timerId));
    this.state.spawnTimers = [];
  }

  /**
   * Update score on successful hit
   */
  hitNote(noteValue = 10) {
    this.state.score += noteValue * Math.max(1, Math.floor(this.state.combo / 5));
    this.state.combo++;
    if (this.state.combo > this.state.maxCombo) {
      this.state.maxCombo = this.state.combo;
    }
  }

  /**
   * Reset combo on miss
   */
  missNote() {
    this.state.combo = 0;
  }

  /**
   * Set highlighted keys (for chord learning)
   */
  setHighlightedKeys(keys) {
    this.state.highlightedKeys = new Set(keys);
  }

  /**
   * Clear highlighted keys
   */
  clearHighlightedKeys() {
    this.state.highlightedKeys.clear();
  }

  /**
   * Set keyboard key state
   */
  setKeyboardKey(key, pressed) {
    if (pressed) {
      this.state.keyboardState.set(key, true);
      this.state.keysPressed.add(key);
    } else {
      this.state.keyboardState.delete(key);
      this.state.keysPressed.delete(key);
    }
  }

  /**
   * Check if keyboard key is pressed
   */
  isKeyPressed(key) {
    return this.state.keyboardState.has(key);
  }

  /**
   * Get all currently pressed keys
   */
  getPressedKeys() {
    return Array.from(this.state.keysPressed);
  }

  /**
   * Clear all keyboard state
   */
  clearKeyboardState() {
    this.state.keyboardState.clear();
    this.state.keysPressed.clear();
  }

  /**
   * Set auto-play timer for chord
   */
  setAutoPlayTimer(timerId) {
    if (this.state.autoPlayTimer) {
      clearTimeout(this.state.autoPlayTimer);
    }
    this.state.autoPlayTimer = timerId;
  }

  /**
   * Clear auto-play timer
   */
  clearAutoPlayTimer() {
    if (this.state.autoPlayTimer) {
      clearTimeout(this.state.autoPlayTimer);
      this.state.autoPlayTimer = null;
    }
  }

  /**
   * Get current chord lesson timer
   */
  getChordLessonTimer() {
    return this.state.chordLessonTimer;
  }

  /**
   * Set chord lesson timer
   */
  setChordLessonTimer(timerId) {
    if (this.state.chordLessonTimer) {
      clearTimeout(this.state.chordLessonTimer);
    }
    this.state.chordLessonTimer = timerId;
  }

  /**
   * Clear chord lesson timer
   */
  clearChordLessonTimer() {
    if (this.state.chordLessonTimer) {
      clearTimeout(this.state.chordLessonTimer);
      this.state.chordLessonTimer = null;
    }
  }

  /**
   * Full reset of game state
   */
  reset() {
    this.clearSpawnTimers();
    this.clearAutoPlayTimer();
    this.clearChordLessonTimer();
    this.clearKeyboardState();
    this.state = this.createInitialState();
  }

  /**
   * Get entire state object (for debugging)
   */
  getState() {
    return { ...this.state };
  }
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameStateManager;
}

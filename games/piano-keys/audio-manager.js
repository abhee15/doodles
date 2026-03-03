/**
 * Audio Manager
 * Handles all Web Audio API synthesis for the Piano Keys game
 */

class AudioManager {
  /**
   * @param {Object} config - CONFIG object with AUDIO settings
   */
  constructor(config) {
    this.config = config;
    this.audioCtx = null;
  }

  /**
   * Initialize Web Audio context
   */
  init() {
    if (this.audioCtx) {
      return;
    }
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  /**
   * Get audio context (initializes if needed)
   */
  getContext() {
    if (!this.audioCtx) {
      this.init();
    }
    return this.audioCtx;
  }

  /**
   * Convert note name to frequency (e.g. 'C4' → 261.63 Hz)
   * @param {string} noteName - Note name (e.g. 'C4', 'D#5')
   * @returns {number} Frequency in Hz
   */
  noteToFreq(noteName) {
    const noteMap = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const note = noteName[0];
    const octave = parseInt(noteName[1]);
    const semitone = noteMap[note] + (noteName.length === 3 ? 1 : 0);
    const midi = (octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /**
   * Play a piano note with harmonic synthesis
   * Creates a realistic piano sound using multiple sine wave harmonics
   * @param {string} noteName - Note name (e.g. 'C4')
   * @param {number} duration - Duration in seconds (default 0.5)
   */
  playNote(noteName, duration = 0.5) {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const freq = this.noteToFreq(noteName);

    // Master gain node with envelope
    const master = ctx.createGain();
    master.connect(ctx.destination);
    master.gain.setValueAtTime(this.config.AUDIO.NOTE_VOLUME, now);
    master.gain.exponentialRampToValueAtTime(this.config.AUDIO.NOTE_FADE_TIME, now + duration);

    // Play each harmonic
    this.config.AUDIO.HARMONICS.forEach(harmonic => {
      const osc = ctx.createOscillator();
      osc.type = harmonic.type;
      osc.frequency.value = freq * harmonic.multiplier;

      const gain = ctx.createGain();
      gain.gain.value = harmonic.volume;
      osc.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  /**
   * Play key tap feedback sound
   */
  playKeyTap() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const duration = this.config.AUDIO.KEY_TAP_DURATION;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(this.config.AUDIO.KEY_TAP_FREQ_START, now);
    osc.frequency.exponentialRampToValueAtTime(this.config.AUDIO.KEY_TAP_FREQ_END, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.config.AUDIO.KEY_TAP_VOLUME, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * Play miss/wrong note sound
   */
  playMiss() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const duration = this.config.AUDIO.MISS_DURATION;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(this.config.AUDIO.MISS_FREQ_START, now);
    osc.frequency.exponentialRampToValueAtTime(this.config.AUDIO.MISS_FREQ_END, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.config.AUDIO.MISS_VOLUME, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * Resume audio context (required by browsers after user interaction)
   */
  resume() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Close audio context when done
   */
  close() {
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioManager;
}

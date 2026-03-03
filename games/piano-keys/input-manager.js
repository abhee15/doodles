/**
 * Input Manager
 * Centralized keyboard and pointer input handling
 */

class InputManager {
  /**
   * @param {Object} config - CONFIG object with KEYBOARD_MAP
   * @param {Phaser.Scene} scene - Phaser scene for input events
   */
  constructor(config, scene) {
    this.config = config;
    this.scene = scene;
    this.enabled = true;
    this.keyDownCallbacks = new Map();
    this.keyUpCallbacks = new Map();
    this.pointerCallbacks = [];
    this.setup();
  }

  /**
   * Setup keyboard and pointer input listeners
   */
  setup() {
    // Keyboard input
    this.scene.input.keyboard.on('keydown', event => {
      if (!this.enabled) {
        return;
      }
      const key = event.key.toLowerCase();
      this.handleKeyDown(key);
    });

    this.scene.input.keyboard.on('keyup', event => {
      if (!this.enabled) {
        return;
      }
      const key = event.key.toLowerCase();
      this.handleKeyUp(key);
    });

    // Pointer input
    this.scene.input.on('pointerdown', pointer => {
      if (!this.enabled) {
        return;
      }
      this.handlePointerDown(pointer.x, pointer.y, pointer);
    });

    this.scene.input.on('pointerup', pointer => {
      if (!this.enabled) {
        return;
      }
      this.handlePointerUp(pointer.x, pointer.y, pointer);
    });
  }

  /**
   * Handle key down event
   */
  handleKeyDown(key) {
    if (this.keyDownCallbacks.has(key)) {
      const callback = this.keyDownCallbacks.get(key);
      callback(key);
    }
  }

  /**
   * Handle key up event
   */
  handleKeyUp(key) {
    if (this.keyUpCallbacks.has(key)) {
      const callback = this.keyUpCallbacks.get(key);
      callback(key);
    }
  }

  /**
   * Handle pointer down event
   */
  handlePointerDown(x, y, pointer) {
    this.pointerCallbacks.forEach(cb => {
      if (cb.type === 'down') {
        cb.handler(x, y, pointer);
      }
    });
  }

  /**
   * Handle pointer up event
   */
  handlePointerUp(x, y, pointer) {
    this.pointerCallbacks.forEach(cb => {
      if (cb.type === 'up') {
        cb.handler(x, y, pointer);
      }
    });
  }

  /**
   * Register a key down handler
   * @param {string} key - The key to listen for
   * @param {Function} callback - Function to call when key is pressed
   */
  onKeyDown(key, callback) {
    this.keyDownCallbacks.set(key.toLowerCase(), callback);
  }

  /**
   * Register a key up handler
   * @param {string} key - The key to listen for
   * @param {Function} callback - Function to call when key is released
   */
  onKeyUp(key, callback) {
    this.keyUpCallbacks.set(key.toLowerCase(), callback);
  }

  /**
   * Register a pointer down handler
   * @param {Function} callback - Function to call when pointer is pressed
   */
  onPointerDown(callback) {
    this.pointerCallbacks.push({ type: 'down', handler: callback });
  }

  /**
   * Register a pointer up handler
   * @param {Function} callback - Function to call when pointer is released
   */
  onPointerUp(callback) {
    this.pointerCallbacks.push({ type: 'up', handler: callback });
  }

  /**
   * Check if a key is currently down
   * @param {string} key - The key to check
   * @returns {boolean} True if key is pressed
   */
  isKeyDown(key) {
    return (
      this.scene.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes[key.toUpperCase()]) ||
      this.scene.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes[this.keyCodeFromChar(key)])
    );
  }

  /**
   * Map character to Phaser key code
   */
  keyCodeFromChar(char) {
    const map = {
      z: 'Z',
      x: 'X',
      c: 'C',
      v: 'V',
      b: 'B',
      n: 'N',
      m: 'M',
      s: 'S',
      d: 'D',
      g: 'G',
      h: 'H',
      j: 'J'
    };
    return map[char] || char.toUpperCase();
  }

  /**
   * Check if any key in the KEYBOARD_MAP is pressed
   * @returns {string|null} The note name if a key is pressed, null otherwise
   */
  getPressedNote() {
    for (const [key, note] of Object.entries(this.config.KEYBOARD_MAP)) {
      if (this.isKeyDown(key)) {
        return note;
      }
    }
    return null;
  }

  /**
   * Enable input
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable input
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Toggle input enabled/disabled
   */
  toggle() {
    this.enabled = !this.enabled;
  }

  /**
   * Reset all callbacks and state
   */
  reset() {
    this.keyDownCallbacks.clear();
    this.keyUpCallbacks.clear();
    this.pointerCallbacks = [];
  }

  /**
   * Cleanup and remove listeners
   */
  destroy() {
    this.reset();
    this.scene.input.keyboard.removeAllListeners();
    this.scene.input.removeAllListeners();
  }
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InputManager;
}

/**
 * Game Navigation Handler
 *
 * Provides consistent screen-to-screen navigation within games.
 * Ensures the back button always goes to the logical parent screen.
 *
 * Usage:
 *   const nav = new GameNavigation('game-id', {
 *     screens: ['landing', 'module-picker', 'tutorial'],
 *     initialScreen: 'landing',
 *     gameName: 'Game Name',
 *     titles: { landing: 'Game Name', 'module-picker': 'Choose Topic', ... }
 *   });
 *
 *   // Show a screen
 *   nav.goToScreen('module-picker');
 *
 *   // Go back
 *   nav.goBack();
 */

class GameNavigation {
  constructor(gameId, config = {}) {
    this.gameId = gameId;

    // Validate config
    if (!config.screens || !Array.isArray(config.screens)) {
      console.error('GameNavigation: config.screens must be an array');
      return;
    }

    this.config = {
      initialScreen: 'landing',
      gameName: 'Game',
      titles: {},
      ...config
    };

    this.currentScreen = this.config.initialScreen;
    this.screenStack = [this.currentScreen];

    // Make sure landing is first
    if (this.config.screens[0] !== 'landing') {
      console.warn('GameNavigation: first screen should be "landing"');
    }

    this.init();
  }

  /**
   * Initialize navigation
   */
  init() {
    // Set up back button handler
    const backBtn = document.getElementById('game-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', e => {
        // Only prevent default if we're NOT at the landing screen
        // At landing, we want the link to work and go to portal
        if (this.currentScreen !== 'landing') {
          e.preventDefault();
          this.goBack();
        }
        // At landing, let the natural link behavior work (no preventDefault)
      });
    }

    // Show initial screen
    this.showScreen();
  }

  /**
   * Navigate to a screen
   * @param {string} screenName - Name of the screen to show
   * @param {object} options - Optional: { preserveStack: false }
   */
  goToScreen(screenName, options = {}) {
    if (!this.config.screens.includes(screenName)) {
      console.warn(`GameNavigation: Screen "${screenName}" not defined in config`);
      return;
    }

    // Only add to stack if not preserving (for returning to existing screen)
    if (!options.preserveStack) {
      this.screenStack.push(screenName);
    }

    this.currentScreen = screenName;
    this.showScreen();
  }

  /**
   * Navigate back one level
   * If at landing, goes to portal
   */
  goBack() {
    if (this.screenStack.length <= 1) {
      // At landing, navigate to portal
      window.location.href = `../../index.html#${this.gameId}`;
      return;
    }

    // Pop current screen
    this.screenStack.pop();
    this.currentScreen = this.screenStack[this.screenStack.length - 1];
    this.showScreen();
  }

  /**
   * Reset to landing screen
   */
  resetToLanding() {
    this.screenStack = ['landing'];
    this.currentScreen = 'landing';
    this.showScreen();
  }

  /**
   * Get current screen name
   */
  getCurrentScreen() {
    return this.currentScreen;
  }

  /**
   * Check if we're at landing
   */
  isAtLanding() {
    return this.currentScreen === 'landing';
  }

  /**
   * Show/hide screens
   */
  showScreen() {
    const screens = document.querySelectorAll('.dom-screen');

    screens.forEach(el => {
      const screenName = el.getAttribute('data-screen');
      if (screenName === this.currentScreen) {
        el.classList.add('active');
        // Optionally trigger a callback
        const callback = el.dataset.onShow;
        if (callback && window[callback]) {
          window[callback]();
        }
      } else {
        el.classList.remove('active');
      }
    });

    this.updateNavBar();
  }

  /**
   * Update navigation bar title and meta
   */
  updateNavBar() {
    const navTitle = document.getElementById('nav-title');
    const navMeta = document.getElementById('nav-meta');

    if (navTitle) {
      const title = this.config.titles[this.currentScreen] || this.config.gameName;
      navTitle.textContent = title;
    }

    if (navMeta && this.config.meta) {
      const meta = this.config.meta[this.currentScreen] || '';
      navMeta.textContent = meta;
    }
  }

  /**
   * Get screen count (for debugging)
   */
  getStackDepth() {
    return this.screenStack.length;
  }

  /**
   * Get navigation stack (for debugging)
   */
  getStack() {
    return [...this.screenStack];
  }
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameNavigation;
}

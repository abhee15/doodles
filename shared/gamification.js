/**
 * GAMIFICATION SYSTEM
 * Handles points, levels, streaks, badges, and achievements
 * Makes learning fun and engaging for kids!
 */

class GamificationSystem {
  constructor(gameKey = 'periodic-table') {
    this.gameKey = gameKey;
    this.storageKey = `doodles_gamification_${gameKey}`;
    this.sessionKey = `session_${gameKey}`;
    
    // Load or initialize game state
    this.loadState();
  }

  /**
   * Initialize or load existing game state
   */
  loadState() {
    const saved = localStorage.getItem(this.storageKey);
    const session = sessionStorage.getItem(this.sessionKey);
    
    if (saved) {
      this.state = JSON.parse(saved);
    } else {
      this.state = this.getDefaultState();
    }
    
    if (session) {
      this.sessionState = JSON.parse(session);
    } else {
      this.sessionState = this.getDefaultSessionState();
    }
    
    this.updateStreaks();
  }

  /**
   * Default state for total game progress
   */
  getDefaultState() {
    return {
      totalScore: 0,
      level: 1,
      streak: 0,
      lastPlayDate: new Date().toDateString(),
      badges: [],
      elementsLearned: [],
      techniqueStats: {
        story_chain: { attempts: 0, successes: 0 },
        memory_palace: { attempts: 0, successes: 0 },
        body_map: { attempts: 0, successes: 0 },
        keyword_image: { attempts: 0, successes: 0 },
        rhyme_pegs: { attempts: 0, successes: 0 }
      },
      milestones: {
        firstCorrect: false,
        five_in_a_row: false,
        ten_in_a_row: false,
        all_elements: false,
        master_level: false
      }
    };
  }

  /**
   * Session state for current play session
   */
  getDefaultSessionState() {
    return {
      sessionScore: 0,
      currentStreak: 0,
      sessionStart: new Date().toISOString(),
      correctAnswers: 0,
      incorrectAnswers: 0,
      answersPerTechnique: {}
    };
  }

  /**
   * Check and update streaks based on dates
   */
  updateStreaks() {
    const today = new Date().toDateString();
    const lastPlay = this.state.lastPlayDate;
    
    if (lastPlay === today) {
      // Same day - streak continues (already counted)
    } else if (new Date(lastPlay) - new Date(today) === -24 * 60 * 60 * 1000) {
      // Yesterday - streak continues!
      // (Streak increment happens in recordCorrectAnswer)
    } else {
      // Break in streak
      this.state.streak = 0;
    }
    
    this.state.lastPlayDate = today;
  }

  /**
   * Record a correct answer and award points
   * @param {string} technique - Technique used
   * @param {boolean} speedBonus - Was answered quickly?
   * @returns {Object} Points earned and bonuses
   */
  recordCorrectAnswer(technique = '', speedBonus = false) {
    const basePoints = 10;
    const speedBonusPoints = speedBonus ? 5 : 0;
    const streakBonusPoints = Math.min(this.sessionState.currentStreak * 2, 20); // Max 20
    const totalPoints = basePoints + speedBonusPoints + streakBonusPoints;
    
    // Update session state
    this.sessionState.sessionScore += totalPoints;
    this.sessionState.correctAnswers++;
    this.sessionState.currentStreak++;
    
    // Update total state
    this.state.totalScore += totalPoints;
    
    // Update technique stats
    if (technique && this.state.techniqueStats[technique]) {
      this.state.techniqueStats[technique].successes++;
      if (!this.sessionState.answersPerTechnique[technique]) {
        this.sessionState.answersPerTechnique[technique] = { correct: 0, incorrect: 0 };
      }
      this.sessionState.answersPerTechnique[technique].correct++;
    }
    
    // Check for level up (every 200 points)
    const oldLevel = this.state.level;
    this.state.level = Math.floor(this.state.totalScore / 200) + 1;
    const leveledUp = this.state.level > oldLevel;
    
    // Check for streak milestone
    this.checkMilestones();
    
    this.save();
    
    return {
      points: totalPoints,
      basePoints,
      speedBonusPoints,
      streakBonusPoints,
      currentStreak: this.sessionState.currentStreak,
      leveledUp,
      newLevel: this.state.level,
      newBadges: this.state.badges
    };
  }

  /**
   * Record an incorrect answer
   * @param {string} technique - Technique used
   */
  recordIncorrectAnswer(technique = '') {
    this.sessionState.incorrectAnswers++;
    this.sessionState.currentStreak = 0;
    
    if (technique && this.state.techniqueStats[technique]) {
      this.state.techniqueStats[technique].attempts++;
      if (!this.sessionState.answersPerTechnique[technique]) {
        this.sessionState.answersPerTechnique[technique] = { correct: 0, incorrect: 0 };
      }
      this.sessionState.answersPerTechnique[technique].incorrect++;
    }
    
    this.save();
  }

  /**
   * Mark an element as learned
   * @param {string|number} elementId
   */
  markElementLearned(elementId) {
    if (!this.state.elementsLearned.includes(elementId)) {
      this.state.elementsLearned.push(elementId);
      this.checkMilestones();
      this.save();
    }
  }

  /**
   * Check for milestone achievements
   */
  checkMilestones() {
    const newBadges = [];
    
    // First correct answer
    if (this.sessionState.correctAnswers === 1 && !this.state.milestones.firstCorrect) {
      this.state.milestones.firstCorrect = true;
      newBadges.push(this.createBadge('first_correct', 'First Step! 🎉', 'You got your first correct answer!'));
    }
    
    // 5 in a row
    if (this.sessionState.currentStreak === 5 && !this.state.milestones.five_in_a_row) {
      this.state.milestones.five_in_a_row = true;
      newBadges.push(this.createBadge('five_in_a_row', 'On Fire! 🔥', '5 correct answers in a row!'));
    }
    
    // 10 in a row
    if (this.sessionState.currentStreak === 10 && !this.state.milestones.ten_in_a_row) {
      this.state.milestones.ten_in_a_row = true;
      newBadges.push(this.createBadge('ten_in_a_row', 'Unstoppable! ⚡', '10 correct answers in a row!'));
    }
    
    // Mastered all elements (20 learned)
    if (this.state.elementsLearned.length >= 20 && !this.state.milestones.all_elements) {
      this.state.milestones.all_elements = true;
      newBadges.push(this.createBadge('all_elements', 'Element Master! 👑', 'You\'ve learned all 20 elements!'));
    }
    
    // Master level (level 3+)
    if (this.state.level >= 3 && !this.state.milestones.master_level) {
      this.state.milestones.master_level = true;
      newBadges.push(this.createBadge('master_level', 'Memory Master! 🧠', 'You\'ve reached Master Level!'));
    }
    
    // Add new badges to the collection
    newBadges.forEach(badge => {
      if (!this.state.badges.some(b => b.id === badge.id)) {
        this.state.badges.push(badge);
      }
    });
    
    return newBadges;
  }

  /**
   * Create a badge object
   */
  createBadge(id, title, description) {
    return {
      id,
      title,
      description,
      earnedAt: new Date().toISOString(),
      icon: this.getBadgeIcon(id)
    };
  }

  /**
   * Get icon for badge type
   */
  getBadgeIcon(badgeId) {
    const icons = {
      'first_correct': '🎉',
      'five_in_a_row': '🔥',
      'ten_in_a_row': '⚡',
      'all_elements': '👑',
      'master_level': '🧠'
    };
    return icons[badgeId] || '⭐';
  }

  /**
   * Get current game stats
   */
  getStats() {
    return {
      totalScore: this.state.totalScore,
      level: this.state.level,
      streak: this.state.streak,
      sessionScore: this.sessionState.sessionScore,
      sessionStreak: this.sessionState.currentStreak,
      correctAnswers: this.sessionState.correctAnswers,
      incorrectAnswers: this.sessionState.incorrectAnswers,
      totalAttempts: this.sessionState.correctAnswers + this.sessionState.incorrectAnswers,
      accuracy: this.sessionState.correctAnswers + this.sessionState.incorrectAnswers > 0 
        ? Math.round((this.sessionState.correctAnswers / (this.sessionState.correctAnswers + this.sessionState.incorrectAnswers)) * 100)
        : 0,
      elementsLearned: this.state.elementsLearned.length,
      badges: this.state.badges,
      technique: this.getTechniqueStats()
    };
  }

  /**
   * Get stats by technique
   */
  getTechniqueStats() {
    const stats = {};
    Object.keys(this.state.techniqueStats).forEach(tech => {
      const data = this.state.techniqueStats[tech];
      stats[tech] = {
        attempts: data.attempts,
        successes: data.successes,
        successRate: data.attempts > 0 ? Math.round((data.successes / data.attempts) * 100) : 0
      };
    });
    return stats;
  }

  /**
   * Save state to storage
   */
  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    sessionStorage.setItem(this.sessionKey, JSON.stringify(this.sessionState));
  }

  /**
   * Reset all data (use with caution!)
   */
  reset() {
    this.state = this.getDefaultState();
    this.sessionState = this.getDefaultSessionState();
    this.save();
  }

  /**
   * Export stats for display
   */
  export() {
    return {
      state: this.state,
      session: this.sessionState
    };
  }
}

// Make it globally available
if (typeof window !== 'undefined') {
  window.GamificationSystem = GamificationSystem;
}

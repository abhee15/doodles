/**
 * ScienceStory Engine
 * Core framework for interactive science narrative games
 * Handles scenes, animations, lab experiments, glossary, quiz, and spaced repetition
 */

class ScienceStory {
  constructor(options) {
    this.gameId = options.gameId;
    this.navTitle = options.navTitle;
    this.storageKey = options.storageKey;
    this.topicData = options.topicData;

    // State
    this.currentScreen = 'landing';
    this.currentSceneIndex = 0;
    this.labControls = {};
    this.quizIndex = 0;
    this.quizAnswers = [];
    this.quizScore = 0;

    // 3D Scene management
    this.threeRenderer = null;

    // Cache quiz questions (auto-generate from glossary if not provided)
    this.quizQuestions = this.topicData.quiz || this.generateQuizFromGlossary();

    // Navigation manager
    this.navigation = null;
  }

  /**
   * Initialize the story
   */
  init() {
    // Set up navigation (back button)
    if (window.GameNavigation) {
      this.navigation = new GameNavigation(this.gameId);
    }

    // Load progress from localStorage
    this.loadProgress();

    // Check if spaced rep review is due
    const dueReview = this.checkSpacedRep();
    if (dueReview) {
      this.showScreen('quiz');
      this.startQuiz();
    } else {
      this.renderLanding();
      this.showScreen('landing');
    }
  }

  /**
   * Screen Management
   */
  showScreen(screenName) {
    document.querySelectorAll('[data-screen]').forEach(el => {
      el.classList.remove('active');
    });
    const screen = document.querySelector(`[data-screen="${screenName}"]`);
    if (screen) {
      screen.classList.add('active');
    }
    this.currentScreen = screenName;
  }

  /**
   * Landing Screen
   */
  renderLanding() {
    const screen = document.querySelector('[data-screen="landing"]');
    const meta = document.getElementById('nav-meta');

    const progress = this.loadProgress();
    const completedAt = progress?.completedAt;
    const statusText = completedAt
      ? `✓ Completed • ${new Date(completedAt).toLocaleDateString()}`
      : `${this.topicData.scenes.length} scenes`;

    if (meta) {
      meta.textContent = statusText;
    }

    screen.innerHTML = `
      <div class="se-landing">
        <div class="se-landing-hero">
          <div class="se-hero-icon">
            <i class="ti ${this.topicData.icon}"></i>
          </div>
          <h1>${this.topicData.name}</h1>
          <p class="se-tagline">${this.topicData.tagline}</p>
        </div>
        <div class="se-landing-cta">
          <button class="dom-btn dom-btn--primary" id="btn-start">
            Begin Story
          </button>
          ${completedAt ? '<button class="dom-btn" id="btn-review">Review Glossary</button>' : ''}
        </div>
      </div>
    `;

    document.getElementById('btn-start').addEventListener('click', () => {
      this.currentSceneIndex = 0;
      this.goToScene(0);
    });

    if (completedAt) {
      document.getElementById('btn-review').addEventListener('click', () => {
        this.goToGlossary();
      });
    }
  }

  /**
   * Scene Navigation
   */
  goToScene(index) {
    if (index < 0 || index >= this.topicData.scenes.length) {
      return;
    }
    this.currentSceneIndex = index;
    this.renderScene(index);
    this.showScreen('scene');
  }

  nextScene() {
    if (this.currentSceneIndex < this.topicData.scenes.length - 1) {
      this.goToScene(this.currentSceneIndex + 1);
    } else {
      this.goToLab();
    }
  }

  prevScene() {
    if (this.currentSceneIndex > 0) {
      this.goToScene(this.currentSceneIndex - 1);
    }
  }

  /**
   * Render a scene
   */
  renderScene(index) {
    const scene = this.topicData.scenes[index];
    const screen = document.querySelector('[data-screen="scene"]');

    // Dispose any running Three.js renderer first
    if (this.threeRenderer) {
      this.threeRenderer.dispose();
      this.threeRenderer = null;
    }

    // Handle 3D scenes
    if (scene.renderType === '3d') {
      this.render3DScene(scene, screen, index);
      return;
    }

    // Build SVG from elements array
    const svgElements = (scene.svg.elements || [])
      .map(el => {
        let attrs = '';
        for (const [key, value] of Object.entries(el)) {
          if (key === 'type' || key === 'id') {
            continue;
          }
          if (key === 'class') {
            attrs += ` class="${value}"`;
          } else if (key === 'style') {
            attrs += ` style="${value}"`;
          } else {
            attrs += ` ${key}="${value}"`;
          }
        }
        return `<${el.type} id="${el.id}"${attrs}></${el.type}>`;
      })
      .join('');

    const svgMarkup = `
      <svg class="se-scene-svg" viewBox="${scene.svg.viewBox}" xmlns="http://www.w3.org/2000/svg">
        ${svgElements}
      </svg>
    `;

    // Build term badges
    const termBadges = (scene.terms || [])
      .map((term, idx) => {
        return `
        <div class="se-term-badge se-term-${idx}" data-term="${term.word}">
          <span class="se-term-emoji">${term.emoji}</span>
          <strong>${term.word}</strong>
          <p>${term.definition}</p>
        </div>
      `;
      })
      .join('');

    screen.innerHTML = `
      <div class="se-scene-container">
        <div class="se-scene-content">
          <div class="se-scene-canvas">
            ${svgMarkup}
            ${termBadges}
          </div>
          <div class="se-scene-narration">
            <p>${scene.narration}</p>
          </div>
          <div class="se-progress-dots">
            ${Array.from(
              { length: this.topicData.scenes.length },
              (_, i) =>
                `<button class="se-progress-dot ${i === index ? 'active' : ''}"
                       data-scene="${i}" title="Scene ${i + 1}"></button>`
            ).join('')}
          </div>
        </div>
        <div class="se-scene-nav">
          <button class="dom-btn" id="btn-prev" ${index === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <button class="dom-btn dom-btn--primary" id="btn-next">
            ${index === this.topicData.scenes.length - 1 ? 'Go to Lab' : 'Next →'}
          </button>
        </div>
      </div>
    `;

    // Wire up progress dots
    document.querySelectorAll('.se-progress-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        const sceneIdx = parseInt(btn.dataset.scene);
        this.goToScene(sceneIdx);
      });
    });

    // Wire up nav buttons
    document.getElementById('btn-prev').addEventListener('click', () => this.prevScene());
    document.getElementById('btn-next').addEventListener('click', () => {
      index === this.topicData.scenes.length - 1 ? this.goToLab() : this.nextScene();
    });

    // Trigger animations
    this.runSceneAnimations(scene);

    // Update nav meta
    document.getElementById('nav-meta').textContent =
      `Scene ${index + 1} of ${this.topicData.scenes.length}`;
  }

  /**
   * Run scene animations (SVG only)
   */
  runSceneAnimations(scene) {
    // Small delay to ensure SVG is rendered
    setTimeout(() => {
      (scene.svg.elements || []).forEach(el => {
        const svgEl = document.getElementById(el.id);
        if (svgEl && el.class) {
          // Remove animation class to reset
          svgEl.classList.remove(el.class);
          // Trigger reflow to restart animation
          void svgEl.offsetWidth;
          // Re-add animation class
          svgEl.classList.add(el.class);
        }
      });

      // Show term badges with stagger
      this.runTermBadges(scene);
    }, 100);
  }

  /**
   * Show term badges with stagger animation (reusable for SVG and 3D)
   */
  runTermBadges(scene) {
    const badges = document.querySelectorAll('.se-term-badge');
    badges.forEach((badge, idx) => {
      setTimeout(
        () => {
          badge.classList.add('visible');
        },
        500 + idx * 300
      );
    });
  }

  /**
   * Render a 3D scene
   */
  render3DScene(scene, screen, index) {
    // Build term badges
    const termBadges = (scene.terms || [])
      .map((term, idx) => {
        return `
        <div class="se-term-badge se-term-${idx}" data-term="${term.word}">
          <span class="se-term-emoji">${term.emoji}</span>
          <strong>${term.word}</strong>
          <p>${term.definition}</p>
        </div>
      `;
      })
      .join('');

    // Build shell with canvas placeholder
    screen.innerHTML = `
      <div class="se-scene-container">
        <div class="se-scene-content">
          <div class="se-scene-canvas se-scene-canvas--3d">
            <canvas id="se-3d-canvas"></canvas>
            ${termBadges}
          </div>
          <div class="se-scene-narration">
            <p>${scene.narration}</p>
          </div>
          <div class="se-progress-dots">
            ${Array.from(
              { length: this.topicData.scenes.length },
              (_, i) =>
                `<button class="se-progress-dot ${i === index ? 'active' : ''}"
                       data-scene="${i}" title="Scene ${i + 1}"></button>`
            ).join('')}
          </div>
        </div>
        <div class="se-scene-nav">
          <button class="dom-btn" id="btn-prev" ${index === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <button class="dom-btn dom-btn--primary" id="btn-next">
            ${index === this.topicData.scenes.length - 1 ? 'Go to Lab' : 'Next →'}
          </button>
        </div>
      </div>
    `;

    // Wire up progress dots
    document.querySelectorAll('.se-progress-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        const sceneIdx = parseInt(btn.dataset.scene);
        this.goToScene(sceneIdx);
      });
    });

    // Wire up nav buttons
    document.getElementById('btn-prev').addEventListener('click', () => this.prevScene());
    document.getElementById('btn-next').addEventListener('click', () => {
      index === this.topicData.scenes.length - 1 ? this.goToLab() : this.nextScene();
    });

    // Call registered 3D handler
    const canvas = document.getElementById('se-3d-canvas');
    const handler = window.SCENE_3D && window.SCENE_3D[scene.sceneKey];
    if (handler) {
      try {
        this.threeRenderer = handler(canvas);
      } catch (error) {
        console.error('3D scene handler error:', error);
        // Fallback: show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'color: red; padding: 20px; text-align: center;';
        errorDiv.textContent = `Error loading 3D scene: ${error.message}`;
        canvas.parentElement.appendChild(errorDiv);
      }
    } else {
      console.warn(`3D scene handler not found for: ${scene.sceneKey}`);
    }

    // Show term badges with stagger
    this.runTermBadges(scene);

    // Update nav meta
    document.getElementById('nav-meta').textContent =
      `Scene ${index + 1} of ${this.topicData.scenes.length}`;
  }

  /**
   * Lab Experiment
   */
  goToLab() {
    // Cleanup any running 3D renderer
    if (this.threeRenderer) {
      this.threeRenderer.dispose();
      this.threeRenderer = null;
    }

    // Initialize lab controls to defaults
    this.topicData.lab.controls.forEach(control => {
      this.labControls[control.id] = control.default;
    });
    this.renderLabSVG();
    this.showScreen('lab');
    document.getElementById('nav-meta').textContent = 'Lab Experiment';
  }

  renderLabSVG() {
    const screen = document.querySelector('[data-screen="lab"]');
    const lab = this.topicData.lab;

    // Build controls HTML
    const controlsHTML = lab.controls
      .map(control => {
        if (control.type === 'range') {
          return `
          <div class="se-lab-control">
            <label class="se-control-label">
              <span class="se-control-emoji">${control.emoji}</span>
              <span class="se-control-name">${control.label}</span>
              <span class="se-control-value" data-value="${control.id}">${this.labControls[control.id]}${control.unit}</span>
            </label>
            <input type="range" class="se-lab-slider" id="ctrl-${control.id}"
                   data-control="${control.id}"
                   min="${control.min}" max="${control.max}"
                   value="${this.labControls[control.id]}" />
          </div>
        `;
        } else if (control.type === 'toggle') {
          const isOn = this.labControls[control.id];
          return `
          <div class="se-lab-control">
            <label class="se-control-label">
              <span class="se-control-emoji">${control.emoji}</span>
              <span class="se-control-name">${control.label}</span>
            </label>
            <button class="se-lab-toggle ${isOn ? 'on' : 'off'}"
                    id="ctrl-${control.id}"
                    data-control="${control.id}">
              ${isOn ? 'ON' : 'OFF'}
            </button>
          </div>
        `;
        }
      })
      .join('');

    // Lab visualization depends on simulation type
    const labVisualization = this.generateLabVisualization(lab.simulation);

    screen.innerHTML = `
      <div class="se-lab-container">
        <h2>${lab.title}</h2>
        <p class="se-lab-instruction">${lab.instruction}</p>
        <div class="se-lab-main">
          <div class="se-lab-viewport">
            ${labVisualization}
          </div>
          <div class="se-lab-panel">
            <div class="se-lab-controls">
              ${controlsHTML}
            </div>
            <div class="se-discoveries"></div>
          </div>
        </div>
        <div class="se-scene-nav">
          <button class="dom-btn" id="btn-back-scene">← Back to Story</button>
          <button class="dom-btn dom-btn--primary" id="btn-to-glossary">Continue to Glossary →</button>
        </div>
      </div>
    `;

    // Wire up controls
    document.querySelectorAll('.se-lab-slider').forEach(slider => {
      slider.addEventListener('input', e => {
        const controlId = e.target.dataset.control;
        this.labControls[controlId] = parseFloat(e.target.value);
        document.querySelector(`[data-value="${controlId}"]`).textContent =
          this.labControls[controlId] +
          this.topicData.lab.controls.find(c => c.id === controlId).unit;
        this.computeLabSimulation(lab.simulation);
      });
    });

    document.querySelectorAll('.se-lab-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        const controlId = e.target.dataset.control;
        this.labControls[controlId] = !this.labControls[controlId];
        e.target.textContent = this.labControls[controlId] ? 'ON' : 'OFF';
        e.target.classList.toggle('on');
        e.target.classList.toggle('off');
        this.computeLabSimulation(lab.simulation);
      });
    });

    document.getElementById('btn-back-scene').addEventListener('click', () => {
      this.goToScene(this.currentSceneIndex);
    });

    document.getElementById('btn-to-glossary').addEventListener('click', () => {
      this.goToGlossary();
    });

    // Initial simulation
    this.computeLabSimulation(lab.simulation);
  }

  generateLabVisualization(simulationType) {
    // Placeholder SVG based on simulation type
    if (simulationType === 'plant-growth') {
      return `
        <svg class="se-lab-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="400" fill="#e8f5e9"/>
          <ellipse cx="150" cy="350" rx="80" ry="20" fill="#8d6e63"/>
          <path id="lab-stem" d="M 150 350 Q 145 300 150 200" stroke="#4ade80" stroke-width="6" fill="none"/>
          <ellipse id="lab-leaf1" cx="120" cy="250" rx="30" ry="45" fill="#4ade80" transform="rotate(-35 120 250)"/>
          <ellipse id="lab-leaf2" cx="180" cy="280" rx="30" ry="45" fill="#4ade80" transform="rotate(35 180 280)"/>
          <circle id="lab-bubble-1" cx="160" cy="200" r="5" fill="#38bdf8" opacity="0.5"/>
          <circle id="lab-bubble-2" cx="145" cy="180" r="5" fill="#38bdf8" opacity="0.5"/>
          <circle id="lab-bubble-3" cx="155" cy="160" r="5" fill="#38bdf8" opacity="0.5"/>
        </svg>
      `;
    } else if (simulationType === 'weather-station') {
      return `
        <svg class="se-lab-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="400" fill="#e3f2fd"/>
          <circle cx="150" cy="80" r="40" fill="#fbbf24" id="lab-sun"/>
          <ellipse cx="100" cy="150" rx="60" ry="40" fill="#c0c0c0" id="lab-cloud"/>
          <rect y="300" width="300" height="100" fill="#5d7fa8"/>
          <circle id="lab-rain-1" cx="80" cy="200" r="3" fill="#38bdf8"/>
          <circle id="lab-rain-2" cx="120" cy="220" r="3" fill="#38bdf8"/>
          <circle id="lab-rain-3" cx="160" cy="210" r="3" fill="#38bdf8"/>
          <circle id="lab-rain-4" cx="200" cy="230" r="3" fill="#38bdf8"/>
        </svg>
      `;
    } else if (simulationType === 'rainbow-maker') {
      return `
        <svg class="se-lab-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="400" fill="#f0f9ff"/>
          <circle cx="50" cy="80" r="30" fill="#fbbf24" id="lab-sun2"/>
          <circle cx="200" cy="280" r="25" fill="#0369a1" id="lab-droplet"/>
          <path id="lab-rainbow" d="M 50 250 Q 150 150 250 250" stroke="transparent" stroke-width="15" fill="none"/>
          <circle cy="280" r="15" fill="#a0aec0"/>
        </svg>
      `;
    }
    return '<div>Lab visualization</div>';
  }

  computeLabSimulation(simulationType) {
    const discoveries = this.topicData.lab.discoveries || [];
    const controls = this.labControls;

    // Check discovery conditions
    discoveries.forEach(discovery => {
      let triggered = false;
      for (const [controlId, range] of Object.entries(discovery.trigger)) {
        if (Array.isArray(range)) {
          // Range [min, max]
          triggered = controls[controlId] >= range[0] && controls[controlId] <= range[1];
        } else {
          // Boolean value
          triggered = controls[controlId] === range;
        }
        if (!triggered) {
          return;
        }
      }

      if (triggered) {
        this.showDiscoveryToast(discovery.message);
      }
    });

    // Update SVG based on simulation type
    if (simulationType === 'plant-growth') {
      this.updatePlantGrowth();
    } else if (simulationType === 'weather-station') {
      this.updateWeatherStation();
    } else if (simulationType === 'rainbow-maker') {
      this.updateRainbowMaker();
    }
  }

  updatePlantGrowth() {
    const sunlight = this.labControls.sunlight || 50;
    const water = this.labControls.water || 50;
    const co2 = this.labControls.co2 !== false;

    const growthRate = (sunlight / 100) * 0.5 + (water / 100) * 0.3 + (co2 ? 0.2 : 0);
    const leafColor = `hsl(120, ${70 + growthRate * 30}%, ${50 - growthRate * 15}%)`;

    const stem = document.getElementById('lab-stem');
    const leaf1 = document.getElementById('lab-leaf1');
    const leaf2 = document.getElementById('lab-leaf2');

    if (stem) {
      stem.style.strokeWidth = 3 + growthRate * 4;
      stem.style.stroke = leafColor;
    }
    if (leaf1) {
      leaf1.style.fill = leafColor;
    }
    if (leaf2) {
      leaf2.style.fill = leafColor;
    }

    // Update bubble rate
    const bubbles = document.querySelectorAll('[id^="lab-bubble"]');
    bubbles.forEach(b => {
      if (growthRate < 0.3) {
        b.style.opacity = '0';
      } else {
        b.style.opacity = 0.3 + growthRate * 0.5;
      }
    });
  }

  updateWeatherStation() {
    const temp = this.labControls.temperature || 20;
    const sunIntensity = this.labControls.sun ? 1 : 0.5;

    const sun = document.getElementById('lab-sun');
    if (sun) {
      sun.style.opacity = sunIntensity;
      sun.style.filter = `brightness(${sunIntensity})`;
    }

    // Update rain vs snow
    const rains = document.querySelectorAll('[id^="lab-rain"]');
    rains.forEach(r => {
      if (temp < 0) {
        r.style.fill = '#ffffff';
        r.style.stroke = '#c0c0c0';
        r.style.strokeWidth = 1;
      } else {
        r.style.fill = '#38bdf8';
        r.style.stroke = 'none';
      }
    });
  }

  updateRainbowMaker() {
    const sunAngle = this.labControls.sunAngle || 45;
    const rain = this.labControls.rain !== false;

    const rainbow = document.getElementById('lab-rainbow');
    if (rainbow) {
      // Rainbow only visible 40-42 degrees with rain
      if (sunAngle >= 40 && sunAngle <= 42 && rain) {
        rainbow.style.stroke = 'url(#rainbow-gradient)';
        rainbow.style.strokeWidth = 20;
      } else {
        rainbow.style.stroke = 'transparent';
      }
    }
  }

  showDiscoveryToast(message) {
    const container = document.querySelector('.se-discoveries');
    if (!container) {
      return;
    }

    const toast = document.createElement('div');
    toast.className = 'se-discovery-toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  }

  /**
   * Glossary
   */
  goToGlossary() {
    // Cleanup any running 3D renderer
    if (this.threeRenderer) {
      this.threeRenderer.dispose();
      this.threeRenderer = null;
    }

    this.renderGlossary();
    this.showScreen('glossary');
    document.getElementById('nav-meta').textContent = 'Glossary';
  }

  renderGlossary() {
    const screen = document.querySelector('[data-screen="glossary"]');
    const glossary = this.topicData.glossary || [];

    const cardsHTML = glossary
      .map(
        (term, idx) => `
      <div class="se-glossary-card" data-term-index="${idx}">
        <div class="se-card-emoji">${term.emoji}</div>
        <h3>${term.term}</h3>
        <p>${term.definition}</p>
        ${term.scene !== undefined ? `<small class="se-card-scene">→ Scene ${term.scene + 1}</small>` : ''}
      </div>
    `
      )
      .join('');

    screen.innerHTML = `
      <div class="se-glossary-container">
        <h2>Glossary</h2>
        <div class="se-glossary-grid">
          ${cardsHTML}
        </div>
        <div class="se-scene-nav">
          <button class="dom-btn" id="btn-back-lab">← Back to Lab</button>
          <button class="dom-btn dom-btn--primary" id="btn-start-quiz">Start Quiz →</button>
        </div>
      </div>
    `;

    document.getElementById('btn-back-lab').addEventListener('click', () => {
      this.goToLab();
    });

    document.getElementById('btn-start-quiz').addEventListener('click', () => {
      this.startQuiz();
    });

    // Hover to link glossary items to scenes
    document.querySelectorAll('.se-glossary-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.termIndex);
        const term = glossary[idx];
        if (term.scene !== undefined) {
          this.goToScene(term.scene);
        }
      });
    });
  }

  /**
   * Quiz
   */
  startQuiz() {
    this.quizIndex = 0;
    this.quizAnswers = [];
    this.quizScore = 0;
    this.renderQuizQuestion(0);
    this.showScreen('quiz');
    document.getElementById('nav-meta').textContent = 'Quiz';
  }

  renderQuizQuestion(index) {
    if (index >= this.quizQuestions.length) {
      this.showResults();
      return;
    }

    const question = this.quizQuestions[index];
    const screen = document.querySelector('[data-screen="quiz"]');

    const optionsHTML = question.options
      .map(
        (option, optIdx) => `
      <button class="se-quiz-option" data-option-index="${optIdx}">
        <span class="se-option-letter">${String.fromCharCode(65 + optIdx)}</span>
        <span class="se-option-text">${option}</span>
      </button>
    `
      )
      .join('');

    screen.innerHTML = `
      <div class="se-quiz-container">
        <div class="se-quiz-progress">
          Question ${index + 1} of ${this.quizQuestions.length}
        </div>
        <h2 class="se-quiz-question">${question.question}</h2>
        <div class="se-quiz-options">
          ${optionsHTML}
        </div>
        <div class="se-quiz-feedback" id="quiz-feedback"></div>
      </div>
    `;

    document.querySelectorAll('.se-quiz-option').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        this.handleQuizAnswer(idx, question.answer, question.explanation);
      });
    });
  }

  handleQuizAnswer(selectedIdx, correctIdx, explanation) {
    const isCorrect = selectedIdx === correctIdx;
    const feedback = document.getElementById('quiz-feedback');

    if (isCorrect) {
      this.quizScore++;
      feedback.innerHTML = `
        <div class="se-quiz-result correct">
          <strong>✓ Correct!</strong>
          <p>${explanation}</p>
        </div>
      `;
      document.querySelectorAll('.se-quiz-option').forEach(btn => (btn.disabled = true));
    } else {
      feedback.innerHTML = `
        <div class="se-quiz-result wrong">
          <strong>✗ Not quite right</strong>
          <p>${explanation}</p>
        </div>
      `;
      const options = document.querySelectorAll('.se-quiz-option');
      options.forEach(btn => (btn.disabled = true));
      options[correctIdx].classList.add('correct');
      options[selectedIdx].classList.add('wrong');
    }

    setTimeout(() => {
      this.quizIndex++;
      this.renderQuizQuestion(this.quizIndex);
    }, 2500);
  }

  /**
   * Results & Spaced Repetition
   */
  showResults() {
    const screen = document.querySelector('[data-screen="results"]');
    const totalQuestions = this.quizQuestions.length;
    const percentage = Math.round((this.quizScore / totalQuestions) * 100);

    const badge =
      percentage >= 80 ? '🌟 Excellent!' : percentage >= 60 ? '👍 Good Job!' : '💪 Keep Learning!';

    screen.innerHTML = `
      <div class="se-results-container">
        <div class="se-results-score">
          <div class="se-score-number">${this.quizScore}/${totalQuestions}</div>
          <div class="se-score-badge">${badge}</div>
          <div class="se-score-percent">${percentage}%</div>
        </div>
        <div class="se-results-message">
          <p>Amazing effort! You've completed the ${this.topicData.name} lesson.</p>
          <p class="se-message-small">We'll remind you to review in 3 days to lock in what you've learned.</p>
        </div>
        <div class="se-scene-nav">
          <button class="dom-btn" id="btn-back-to-landing">← Back to Start</button>
          <button class="dom-btn dom-btn--primary" id="btn-explore-more">Explore More Games →</button>
        </div>
      </div>
    `;

    // Save progress
    this.scheduleSpacedRep();
    this.saveProgress();

    document.getElementById('btn-back-to-landing').addEventListener('click', () => {
      this.renderLanding();
      this.showScreen('landing');
    });

    document.getElementById('btn-explore-more').addEventListener('click', () => {
      // Open portal
      window.location.href = '../../index.html';
    });

    this.showScreen('results');
    document.getElementById('nav-meta').textContent = 'Results';
  }

  /**
   * Auto-generate quiz from glossary
   */
  generateQuizFromGlossary() {
    const glossary = this.topicData.glossary || [];
    return glossary.map(term => {
      // Create a question from the definition
      const wrongOptions = glossary
        .filter(t => t.term !== term.term)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(t => t.term);

      return {
        question: `What is "${term.term}"?`,
        options: [term.term, ...wrongOptions].sort(() => Math.random() - 0.5),
        answer: [term.term, ...wrongOptions].sort(() => Math.random() - 0.5).indexOf(term.term),
        explanation: term.definition
      };
    });
  }

  /**
   * Storage & Spaced Repetition
   */
  saveProgress() {
    const progress = {
      completedAt: Date.now(),
      reviewSchedule: [],
      quizScores: [this.quizScore],
      termsMastered: [],
      termsDifficult: []
    };

    localStorage.setItem(`${this.storageKey}-progress`, JSON.stringify(progress));
  }

  loadProgress() {
    const stored = localStorage.getItem(`${this.storageKey}-progress`);
    return stored ? JSON.parse(stored) : null;
  }

  scheduleSpacedRep() {
    const progress = this.loadProgress() || {};
    const now = Date.now();

    progress.reviewSchedule = [
      { dueAt: now + 3 * 24 * 60 * 60 * 1000, done: false }, // Day 3
      { dueAt: now + 7 * 24 * 60 * 60 * 1000, done: false }, // Day 7
      { dueAt: now + 14 * 24 * 60 * 60 * 1000, done: false } // Day 14
    ];

    localStorage.setItem(`${this.storageKey}-progress`, JSON.stringify(progress));
  }

  checkSpacedRep() {
    const progress = this.loadProgress();
    if (!progress || !progress.reviewSchedule) {
      return null;
    }

    const now = Date.now();
    for (const review of progress.reviewSchedule) {
      if (!review.done && review.dueAt <= now) {
        return review;
      }
    }
    return null;
  }
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScienceStory;
}

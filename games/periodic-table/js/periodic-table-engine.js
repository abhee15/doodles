/**
 * PERIODIC TABLE GAME ENGINE
 * Parametric engine that supports all techniques
 * Usage: ?chunk=1&technique=story_chain
 */

class PeriodicTableGameEngine {
  constructor(chunkId, techniqueType) {
    this.chunk = parseInt(chunkId);
    this.technique = techniqueType;
    this.elements = [];
    this.elementData = null;
    this.score = 0;
    this.maxScore = 0;
    
    this.init();
  }

  /**
   * Initialize the game engine
   */
  async init() {
    await this.loadElementData();
    this.filterElementsByChunk();
    this.setupGameUI();
  }

  /**
   * Load element data from JSON
   */
  async loadElementData() {
    try {
      const response = await fetch('periodic-table-data.json');
      this.elementData = await response.json();
      console.log('Element data loaded:', this.elementData.metadata);
    } catch (error) {
      console.error('Error loading element data:', error);
      // Fallback data
      this.elementData = { elements: [], metadata: {} };
    }
  }

  /**
   * Filter elements by chunk ID
   */
  filterElementsByChunk() {
    if (!this.elementData.elements) return;
    
    this.elements = this.elementData.elements.filter(
      el => el.chunk === this.chunk
    );
    
    console.log(`Loaded ${this.elements.length} elements for Chunk ${this.chunk}`);
  }

  /**
   * Setup UI based on technique
   */
  setupGameUI() {
    const techniqueMap = {
      'story_chain': 'setupStoryChainUI',
      'memory_palace': 'setupMemoryPalaceUI',
      'body_map': 'setupBodyMapUI',
      'keyword_image': 'setupKeywordImageUI',
      'rhyme_pegs': 'setupRhymePegsUI'
    };

    const setupMethod = techniqueMap[this.technique];
    if (setupMethod && typeof this[setupMethod] === 'function') {
      this[setupMethod]();
    } else {
      console.error('Unknown technique:', this.technique);
      this.setupStoryChainUI(); // Fallback
    }

    this.updateHeader();
  }

  /**
   * Update header with game info
   */
  updateHeader() {
    const chunkTitles = {
      1: 'Elements 1-20 (Hydrogen → Calcium)',
      2: 'Elements 21-40 (Scandium → Krypton)',
      3: 'Elements 41-60 (Yttrium → Neodymium)',
      4: 'Elements 61-80 (Promethium → Mercury)',
      5: 'Elements 81-101 (Thallium → Oganesson)'
    };

    const techniqueName = {
      'story_chain': 'Story Chain',
      'memory_palace': 'Memory Palace',
      'body_map': 'Body Map',
      'keyword_image': 'Keyword Image',
      'rhyme_pegs': 'Rhyme Pegs'
    };

    document.getElementById('game-title').textContent = 
      `${techniqueName[this.technique]} - ${chunkTitles[this.chunk]}`;
    document.getElementById('technique-badge').textContent = techniqueName[this.technique];
  }

  /**
   * GET MEMORY TIP FOR SPECIFIC TECHNIQUE
   */
  getMemoryTip(element) {
    if (!element.memory_tips) return element.name;
    return element.memory_tips[this.technique] || element.name;
  }

  /**
   * STORY CHAIN TECHNIQUE
   */
  setupStoryChainUI() {
    console.log('Setting up Story Chain UI');
    
    const uiDiv = document.getElementById('story-chain-ui');
    uiDiv.style.display = 'block';

    // Build story from elements
    const storyParts = this.elements.map(el => {
      const tip = this.getMemoryTip(el);
      return `🔹 ${tip}`;
    });

    const storyText = document.getElementById('story-text');
    storyText.innerHTML = storyParts.join('<br><br>');

    // Build story panels (comic strip style)
    const panelsDiv = document.getElementById('story-panels');
    panelsDiv.innerHTML = this.elements.map((el, idx) => `
      <div class="story-panel">
        <div class="panel-number">${idx + 1}</div>
        <div class="panel-symbol">${el.symbol}</div>
        <div class="panel-name">${el.name}</div>
        <div class="panel-emoji">🧪</div>
      </div>
    `).join('');
  }

  /**
   * MEMORY PALACE TECHNIQUE
   */
  setupMemoryPalaceUI() {
    console.log('Setting up Memory Palace UI');
    
    const uiDiv = document.getElementById('memory-palace-ui');
    uiDiv.style.display = 'block';

    const roomView = document.getElementById('room-view');
    roomView.innerHTML = `
      <div class="palace-room">
        <div class="room-title">Your Palace Rooms</div>
        <p>Click on each room to explore...</p>
      </div>
    `;

    const elementList = document.getElementById('element-list');
    elementList.innerHTML = this.elements.map(el => `
      <div class="palace-element">
        <span class="symbol">${el.symbol}</span>
        <span class="name">${el.name}</span>
        <span class="tip">${this.getMemoryTip(el)}</span>
      </div>
    `).join('');
  }

  /**
   * BODY MAP TECHNIQUE
   */
  setupBodyMapUI() {
    console.log('Setting up Body Map UI');
    
    const uiDiv = document.getElementById('body-map-ui');
    uiDiv.style.display = 'block';

    const bodyInfo = document.getElementById('body-info');
    bodyInfo.innerHTML = this.elements.map((el, idx) => `
      <div class="body-part-item">
        <div class="body-location">Location ${idx + 1}</div>
        <div class="element-info">
          <strong>${el.symbol} - ${el.name}</strong>
          <p>${this.getMemoryTip(el)}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * KEYWORD IMAGE TECHNIQUE
   */
  setupKeywordImageUI() {
    console.log('Setting up Keyword Image UI');
    
    const uiDiv = document.getElementById('keyword-ui');
    uiDiv.style.display = 'block';

    const keywordsGrid = document.getElementById('keywords-grid');
    keywordsGrid.innerHTML = this.elements.map(el => `
      <div class="keyword-card">
        <div class="keyword-symbol">${el.symbol}</div>
        <div class="keyword-name">${el.name}</div>
        <div class="keyword-tip">${this.getMemoryTip(el)}</div>
      </div>
    `).join('');
  }

  /**
   * RHYME PEGS TECHNIQUE
   */
  setupRhymePegsUI() {
    console.log('Setting up Rhyme Pegs UI');
    
    const uiDiv = document.getElementById('rhyme-pegs-ui');
    uiDiv.style.display = 'block';

    const rhymeMap = {
      1: 'ONE-BUN', 2: 'TWO-SHOE', 3: 'THREE-TREE', 4: 'FOUR-DOOR',
      5: 'FIVE-HIVE', 6: 'SIX-STICKS', 7: 'SEVEN-HEAVEN', 8: 'EIGHT-GATE',
      9: 'NINE-PINE', 10: 'TEN-PEN', 11: 'ELEVEN-HEAVEN', 12: 'TWELVE-SHELVES',
      13: 'THIRTEEN-QUEEN', 14: 'FOURTEEN-QUEEN', 15: 'FIFTEEN-QUEEN',
      16: 'SIXTEEN-QUEEN', 17: 'SEVENTEEN-HEAVEN', 18: 'EIGHTEEN-HEAVEN',
      19: 'NINETEEN-QUEEN', 20: 'TWENTY-PLENTY'
    };

    const rhymesGrid = document.getElementById('rhymes-grid');
    rhymesGrid.innerHTML = this.elements.map((el, idx) => `
      <div class="rhyme-card">
        <div class="rhyme-number">${el.atomicNumber}</div>
        <div class="rhyme-peg">${rhymeMap[el.atomicNumber] || 'RHYME'}</div>
        <div class="element-symbol">${el.symbol}</div>
        <div class="element-name">${el.name}</div>
        <div class="tip">${this.getMemoryTip(el)}</div>
      </div>
    `).join('');
  }

  /**
   * Get all elements as array
   */
  getElements() {
    return this.elements;
  }

  /**
   * Get element by ID
   */
  getElement(id) {
    return this.elements.find(el => el.id === id);
  }

  /**
   * Record score
   */
  recordScore(correct, total) {
    this.score = correct;
    this.maxScore = total;
    const percentage = (correct / total) * 100;
    console.log(`Score: ${correct}/${total} (${percentage.toFixed(1)}%)`);
    return percentage;
  }
}

// Global engine instance
let gameEngine = null;

/**
 * Initialize game on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const chunk = urlParams.get('chunk') || '1';
  const technique = urlParams.get('technique') || 'story_chain';

  console.log(`Game initialized: Chunk ${chunk}, Technique ${technique}`);

  // Create and initialize game engine
  gameEngine = new PeriodicTableGameEngine(chunk, technique);
});

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
      const data = await response.json();
      
      // Extract elements array from response
      let elements = data.elements || data.items || [];
      
      // Add chunk ID to all elements (all current elements are chunk 1)
      this.elementData = {
        elements: elements.map(el => ({
          ...el,
          chunk: el.chunk || 1,
          id: el.atomicNumber
        }))
      };
      
      console.log('Element data loaded:', this.elementData.elements.length, 'elements');
    } catch (error) {
      console.error('Error loading element data:', error);
      this.elementData = { elements: [] };
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
    if (!element) return '';
    
    // Try new structure first
    if (element.memory_tips && element.memory_tips[this.technique]) {
      return element.memory_tips[this.technique];
    }
    
    // Fall back to old structure (direct fields)
    const fieldMap = {
      'story_chain': 'story',
      'memory_palace': 'memory_tip',
      'body_map': 'memory_tip',  // For Body Map, use the general memory tip, not bodyPart
      'keyword_image': 'associationImage',
      'rhyme_pegs': 'rhymePeg'
    };
    
    const fieldName = fieldMap[this.technique] || 'memory_tip';
    return element[fieldName] || element.memory_tip || element.name;
  }

  /**
   * STORY CHAIN TECHNIQUE
   */
  setupStoryChainUI() {
    console.log('Setting up Story Chain UI');
    
    const uiDiv = document.getElementById('story-chain-ui');
    uiDiv.style.display = 'block';

    // Create visual story cards instead of text
    const storyText = document.getElementById('story-text');
    storyText.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h3><i class="ti ti-target"></i> Create a Story with These Elements:</h3>
        <p style="font-size: 13px; color: #666;">Link each element in an epic narrative - the more vivid, the better!</p>
      </div>
    `;

    // Build professional simplified story cards
    const panelsDiv = document.getElementById('story-panels');
    panelsDiv.innerHTML = `<div class="visual-grid-simplified">${
      this.elements.map((el, idx) => createSimplifiedStoryCard(el, idx, this.elements.length)).join('')
    }</div>`;
  }

  /**
   * MEMORY PALACE TECHNIQUE
   */
  setupMemoryPalaceUI() {
    console.log('Setting up Memory Palace UI');
    
    const uiDiv = document.getElementById('memory-palace-ui');
    uiDiv.style.display = 'block';

    // Create palace rooms (divide elements into logical rooms)
    const roomSize = Math.ceil(this.elements.length / 5); // Create ~5 rooms
    const rooms = [];
    const roomNames = ['Entrance Hall', 'Library', 'Throne Room', 'Garden', 'Treasury'];
    const roomIconNames = ['door-2', 'bookshelf', 'crown', 'plant-2', 'gems'];
    
    for (let i = 0; i < this.elements.length; i += roomSize) {
      rooms.push(this.elements.slice(i, i + roomSize));
    }

    // Create room selector with enhanced visuals
    const roomView = document.getElementById('room-view');
    roomView.innerHTML = `
      <div class="palace-rooms-grid">
        ${rooms.map((room, roomIdx) => `
          <div class="palace-room-card" onclick="selectPalaceRoom(${roomIdx})">
            <div class="room-icon"><i class="ti ti-${roomIconNames[roomIdx % roomIconNames.length]}"></i></div>
            <div class="room-title">${roomNames[roomIdx % roomNames.length]}</div>
            <div class="room-element-count">${room.length} elements</div>
            <div class="room-symbols">
              ${room.map(el => `<span class="symbol-badge">${el.symbol}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Create element list with journey visualization - ENHANCED WITH VISUAL CARDS
    const elementList = document.getElementById('element-list');
    elementList.innerHTML = `
      <div class="palace-description">
        <h3><i class="ti ti-map"></i> Your Memory Palace Journey</h3>
        <p>Imagine walking through your magical palace, visiting each room in order.</p>
        <p>Picture the elements in vivid, unusual ways at specific locations in each room.</p>
        <p class="palace-tip"><i class="ti ti-lightbulb"></i> <strong>Tip:</strong> The more bizarre and memorable your mental image, the better you'll remember!</p>
      </div>
      <div class="palace-timeline">
        ${this.elements.map((el, idx) => `
          <div class="timeline-item" data-element-id="${el.atomicNumber}">
            <div class="timeline-marker">
              <span class="marker-number">${idx + 1}</span>
            </div>
            <div class="timeline-content">
              <div class="element-header">
                <div class="element-visual-mini">
                  ${createElementVisual(el)}
                </div>
                <div class="element-details">
                  <div class="element-name">${el.name}</div>
                  <div class="element-number">#${el.atomicNumber}</div>
                </div>
              </div>
              <div class="element-room">Room ${Math.floor(idx / roomSize) + 1}: ${roomNames[Math.floor(idx / roomSize) % roomNames.length]}</div>
              <div class="memory-palace-tip">${this.getMemoryTip(el)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Store room data for interaction
    window.palaceRooms = rooms;
    window.roomNames = roomNames;
    window.roomIconNames = roomIconNames;
  }

  /**
   * BODY MAP TECHNIQUE
   */
  setupBodyMapUI() {
    console.log('Setting up Body Map UI');
    
    const uiDiv = document.getElementById('body-map-ui');
    uiDiv.style.display = 'block';

    // Define body zones with icons
    const bodyZones = [
      { num: 1, label: 'Head', icon: 'brain', pct: 15, color: '#FF6B6B' },
      { num: 2, label: 'Neck', icon: 'circle', pct: 20, color: '#FFA06B' },
      { num: 3, label: 'Chest', icon: 'heart', pct: 25, color: '#FFD93D' },
      { num: 4, label: 'Waist', icon: 'lightning-2', pct: 35, color: '#6BCB77' },
      { num: 5, label: 'Left Hand', icon: 'hand', pct: 45, color: '#4D96FF' },
      { num: 6, label: 'Right Hand', icon: 'hand', pct: 55, color: '#7C3AED' },
      { num: 7, label: 'Left Leg', icon: 'leg', pct: 70, color: '#F24E1E' },
      { num: 8, label: 'Right Leg', icon: 'leg', pct: 80, color: '#00D4AA' }
    ];

    // Create body map illustration
    const bodyIllustration = document.getElementById('body-illustration');
    bodyIllustration.innerHTML = `
      <div class="body-map-visual">
        <div class="body-stick-figure">
          ${bodyZones.slice(0, Math.min(this.elements.length, 8)).map((zone, idx) => `
            <div class="zone-interactive zone-${idx + 1}" 
                 data-zone="${idx + 1}" 
                 onclick="showBodyZoneDetails(${idx + 1})"
                 title="${zone.label}: ${this.elements[idx]?.name || 'Element'}">
              <div class="zone-icon"><i class="ti ti-${zone.icon}"></i></div>
              <div class="zone-label-mini">${zone.label}</div>
              <div class="zone-element">${this.elements[idx]?.symbol || ''}</div>
            </div>
          `).join('')}
        </div>
        <div class="body-map-legend">
          <p><i class="ti ti-click"></i> Click zones to see elements</p>
        </div>
      </div>
    `;

    // Create detailed zone information
    const bodyInfo = document.getElementById('body-info');
    bodyInfo.innerHTML = `
      <div class="zone-details">
        <div class="zone-info-header">
          <h3 id="zone-title">Click a zone to learn</h3>
        </div>
        <div id="zone-content" class="zone-content">
          <p style="text-align: center; color: #999;">Select a body zone to view elements anchored there</p>
        </div>
      </div>
      <div class="all-zones-list">
        <h3>All Zones:</h3>
        ${this.elements.map((el, idx) => {
          const zone = bodyZones[Math.min(idx, 7)];
          return `
            <div class="zone-list-item" onclick="showBodyZoneDetails(${idx + 1})" style="--zone-color: ${zone.color}">
              <div class="zone-list-icon">${zone.icon}</div>
              <div class="zone-list-info">
                <div class="zone-list-label">${zone.label}</div>
                <div class="zone-list-element"><strong>${el.symbol}</strong> - ${el.name}</div>
              </div>
              <div class="zone-list-tip">${this.getMemoryTip(el)}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Store body zones globally for interaction
    window.bodyZones = bodyZones;
    window.bodyMapElements = this.elements;
  }

  /**
   * KEYWORD IMAGE TECHNIQUE
   */
  setupKeywordImageUI() {
    console.log('Setting up Keyword Image UI');
    
    const uiDiv = document.getElementById('keyword-ui');
    uiDiv.style.display = 'block';

    // Add instruction header
    const keywordContainer = document.querySelector('.keyword-container');
    if (keywordContainer) {
      const header = document.createElement('div');
      header.style.marginBottom = '20px';
      header.innerHTML = `
        <p style="text-align: center; color: #666; font-size: 13px;">
          Each element has a unique visual association. Study the pictures to create mental images!
        </p>
      `;
      keywordContainer.insertBefore(header, keywordContainer.firstChild);
    }

    const keywordsGrid = document.getElementById('keywords-grid');
    keywordsGrid.innerHTML = `<div class="visual-grid-simplified">${
      this.elements.map(el => createProfessionalKeywordCard(el)).join('')
    }</div>`;
  }

  /**
   * RHYME PEGS TECHNIQUE
   */
  setupRhymePegsUI() {
    console.log('Setting up Rhyme Pegs UI');
    
    const uiDiv = document.getElementById('rhyme-pegs-ui');
    uiDiv.style.display = 'block';

    // Add instruction header
    const rhymeContainer = document.querySelector('.rhyme-container');
    if (rhymeContainer) {
      const header = document.createElement('div');
      header.style.marginBottom = '20px';
      header.innerHTML = `
        <p style="text-align: center; color: #666; font-size: 13px;">
          Link each element number to its visual icon - create vivid mental connections!
        </p>
      `;
      rhymeContainer.insertBefore(header, rhymeContainer.firstChild);
    }

    const rhymesGrid = document.getElementById('rhymes-grid');
    rhymesGrid.innerHTML = `<div class="visual-grid-compact">${
      this.elements.map((el, idx) => createProfessionalRhymePeg(el, idx + 1)).join('')
    }</div>`;
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

/**
 * Global function to select palace room
 */
function selectPalaceRoom(roomIdx) {
  if (!gameEngine || !gameEngine.elements) return;

  // Highlight selected room
  document.querySelectorAll('.palace-room-card').forEach((card, idx) => {
    if (idx === roomIdx) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Highlight corresponding timeline items
  const roomSize = Math.ceil(gameEngine.elements.length / 5);
  const startIdx = roomIdx * roomSize;
  const endIdx = Math.min(startIdx + roomSize, gameEngine.elements.length);

  document.querySelectorAll('.timeline-item').forEach((item, idx) => {
    if (idx >= startIdx && idx < endIdx) {
      item.classList.add('highlight');
    } else {
      item.classList.remove('highlight');
    }
  });

  // Scroll to first element in room
  const firstItem = document.querySelector(`.timeline-item[data-element-id="${gameEngine.elements[startIdx].atomicNumber}"]`);
  if (firstItem) {
    firstItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Initialize gamification system
  if (typeof initGamification === 'function') {
    initGamification();
  }

  // Create and initialize game engine
  gameEngine = new PeriodicTableGameEngine(chunk, technique);
});

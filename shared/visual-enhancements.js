/**
 * VISUAL ENHANCEMENTS FOR MEMORY TECHNIQUES
 * Provides color coding, visual associations, and mnemonic helpers
 */

const elementTypeColors = {
  'Alkali Metals': { color: '#FF6B6B', lightColor: '#FFE5E5', icon: 'ti-flame' },
  'Alkaline Earth Metals': { color: '#FF8C42', lightColor: '#FFE4CC', icon: 'ti-tools' },
  'Transition Metals': { color: '#4ECDC4', lightColor: '#D4F6F4', icon: 'ti-shield-check' },
  'Post-transition Metals': { color: '#95E1D3', lightColor: '#E8F7F3', icon: 'ti-stone' },
  Nonmetals: { color: '#FFD93D', lightColor: '#FFF5CC', icon: 'ti-wind' },
  Halogens: { color: '#6BCB77', lightColor: '#E8F7E8', icon: 'ti-flask-2' },
  'Noble Gases': { color: '#4D96FF', lightColor: '#E5F0FF', icon: 'ti-sparkles' }
};

const rhymePegs = {
  1: { peg: 'Bun', symbol: 'ti-bread', image: 'A golden bun with number 1 on it' },
  2: { peg: 'Shoe', symbol: 'ti-shoe', image: 'A red shoe with number 2 on it' },
  3: { peg: 'Tree', symbol: 'ti-tree', image: 'A tall green tree with number 3 on it' },
  4: { peg: 'Door', symbol: 'ti-door-2', image: 'A blue door with number 4 on it' },
  5: { peg: 'Hive', symbol: 'ti-bug', image: 'A yellow beehive with number 5 on it' },
  6: { peg: 'Sticks', symbol: 'ti-logs', image: 'Brown sticks bundled with number 6 on it' },
  7: { peg: 'Heaven', symbol: 'ti-cloud', image: 'A fluffy cloud with number 7 on it' },
  8: { peg: 'Gate', symbol: 'ti-door-2', image: 'A golden gate with number 8 on it' },
  9: { peg: 'Vine', symbol: 'ti-plant-2', image: 'A purple vine with number 9 on it' },
  10: { peg: 'Hen', symbol: 'ti-bird', image: 'A red hen with number 10 on it' },
  11: { peg: 'Eleven', symbol: 'ti-ball', image: 'Eleven basketballs stacked' },
  12: { peg: 'Shelves', symbol: 'ti-bookshelf', image: 'Wooden shelves with number 12 on it' },
  13: { peg: 'Thirteen', symbol: 'ti-tent', image: 'A circus tent with number 13 on it' },
  14: { peg: 'Fourteen', symbol: 'ti-guitar', image: 'A guitar with number 14 on it' },
  15: { peg: 'Fifteen', symbol: 'ti-cake', image: 'A birthday cake with number 15 on it' },
  16: { peg: 'Sixteen', symbol: 'ti-coin', image: 'A slot machine with number 16 on it' },
  17: { peg: 'Seventeen', symbol: 'ti-mask', image: 'Theater masks with number 17 on it' },
  18: { peg: 'Eighteen', symbol: 'ti-mountain', image: 'Mountains with number 18 on it' },
  19: { peg: 'Nineteen', symbol: 'ti-sailboat', image: 'A sailboat with number 19 on it' },
  20: { peg: 'Twenty', symbol: 'ti-gift', image: 'A wrapped present with number 20 on it' }
};

/**
 * Get element type and color information
 */
function getElementTypeInfo(element) {
  // Determine element type based on properties or name
  let type = 'Other';

  if (element.symbol === 'H') {
    type = 'Nonmetals';
  } else if (['Li', 'Na', 'K'].includes(element.symbol)) {
    type = 'Alkali Metals';
  } else if (['Be', 'Mg', 'Ca'].includes(element.symbol)) {
    type = 'Alkaline Earth Metals';
  } else if (['He', 'Ne', 'Ar'].includes(element.symbol)) {
    type = 'Noble Gases';
  } else if (['F', 'Cl', 'Br'].includes(element.symbol)) {
    type = 'Halogens';
  } else if (element.symbol === 'C') {
    type = 'Nonmetals';
  } else if (['N', 'O', 'P', 'S'].includes(element.symbol)) {
    type = 'Nonmetals';
  } else if (['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'].includes(element.symbol)) {
    type = 'Transition Metals';
  } else if (['Al', 'Ga', 'In', 'Sn', 'Pb', 'Bi'].includes(element.symbol)) {
    type = 'Post-transition Metals';
  }

  return {
    type,
    ...(elementTypeColors[type] || elementTypeColors['Other'])
  };
}

/**
 * Create a visual story card
 */
function createStoryCard(element, index, totalElements) {
  const typeInfo = getElementTypeInfo(element);
  const progressPercent = ((index + 1) / totalElements) * 100;

  return `
    <div class="story-card" style="--element-color: ${typeInfo.color}; --element-light: ${typeInfo.lightColor};">
      <div class="story-card-number">
        <span class="card-index">${index + 1}/${totalElements}</span>
        <div class="card-progress-bar" style="width: ${progressPercent}%"></div>
      </div>
      
      <div class="story-card-header">
        <div class="story-element-badge" style="background: ${typeInfo.color}; color: white;">
          ${element.symbol}
        </div>
        <div class="story-element-info">
          <div class="story-element-name">${element.name}</div>
          <div class="story-element-type">${typeInfo.type} <i class="ti ti-${typeInfo.icon}"></i></div>
        </div>
      </div>
      
      <div class="story-card-body">
        <div class="story-narrative-box">
          <p>${element.story || element.memory_tip}</p>
        </div>
        <div class="story-fun-fact">
          <i class="ti ti-bulb"></i>
          ${element.funFact || 'Interesting element!'}
        </div>
      </div>
      
      <div class="story-card-footer">
        <span class="card-uses"><strong>Uses:</strong> ${element.uses || 'Various applications'}</span>
      </div>
    </div>
  `;
}

/**
 * Create enhanced keyword card with visual associations
 */
function createKeywordCard(element, index) {
  const typeInfo = getElementTypeInfo(element);

  // Create a visual symbol representation
  const symbols = {
    H: 'ti-droplet',
    He: 'ti-balloon-2',
    Li: 'ti-battery',
    Be: 'ti-tools',
    B: 'ti-flask-2',
    C: 'ti-gem',
    N: 'ti-wind',
    O: 'ti-flame',
    F: 'ti-lightning-2',
    Ne: 'ti-sparkles',
    Na: 'ti-seasoning',
    Mg: 'ti-biceps-2',
    Al: 'ti-circle',
    Si: 'ti-beach',
    P: 'ti-bomb',
    S: 'ti-volcano',
    Cl: 'ti-soap',
    Ar: 'ti-moon',
    K: 'ti-plant-2',
    Ca: 'ti-bone-off'
  };

  const iconClass = symbols[element.symbol] || 'ti-atom-2';
  const visualSymbol = `<i class="ti ti-${iconClass}"></i>`;

  return `
    <div class="keyword-card-enhanced" style="--element-color: ${typeInfo.color}; --element-light: ${typeInfo.lightColor};">
      <div class="keyword-top-bar" style="background: linear-gradient(135deg, ${typeInfo.color}, ${typeInfo.lightColor});">
        <div class="keyword-type-label">${typeInfo.type}</div>
        <div class="keyword-visual-symbol">${visualSymbol}</div>
      </div>
      
      <div class="keyword-content">
        <div class="keyword-symbol-large">${element.symbol}</div>
        <div class="keyword-name-large">${element.name}</div>
        
        <div class="keyword-association">
          <strong>Visual Memory:</strong>
          <p>${element.associationImage || 'Picture this element in your mind...'}</p>
        </div>
        
        <div class="keyword-fact">
          <i class="ti ti-info-circle"></i>
          <span>${element.realWorld || element.funFact || 'An interesting element!'}</span>
        </div>
        
        <div class="keyword-mnemonic">
          <strong>Remember:</strong>
          <p>${element.memory_tip || 'Create a memorable association!'}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create a rhyme peg card with vivid visualization
 */
function createRhymePegCard(element, pegNumber) {
  if (!rhymePegs[pegNumber]) {
    return '';
  }

  const peg = rhymePegs[pegNumber];
  const typeInfo = getElementTypeInfo(element);

  return `
    <div class="rhyme-peg-card" style="--element-color: ${typeInfo.color};">
      <div class="rhyme-peg-header" style="background: linear-gradient(135deg, ${typeInfo.color}, #333);">
        <div class="peg-number">${pegNumber}</div>
        <div class="peg-symbol">${peg.symbol}</div>
        <div class="peg-name">${peg.peg}</div>
      </div>
      
      <div class="rhyme-peg-body">
        <div class="element-badge">${element.symbol}</div>
        <div class="element-name">${element.name}</div>
        
        <div class="rhyme-visualization">
          <strong>Vivid Image:</strong>
          <p>${peg.image}</p>
          <p class="association">
            Imagine: <strong>${element.name}</strong> as a <strong>${peg.peg}</strong>
          </p>
        </div>
        
        <div class="memory-anchor">
          <strong>Memory Hook:</strong>
          <p>${element.memory_tip || `${pegNumber} = ${peg.peg}: ${element.symbol}`}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Get quick memory tips based on element
 */
function getQuickMemoryTip(element) {
  const tips = {
    H: 'H = Hero starting the story! Lightest element, floats balloons',
    He: 'He = Helium makes funny voice! Second lightest, party balloons',
    Li: 'Li = Light as air! First metal, super reactive with water',
    Be: 'Be = Be careful! Toxic metal, used in aerospace',
    B: 'B = Boron is tough! Used in fiberglass and ceramics',
    C: 'C = Carbon is King! Diamond, graphite, all life is based on it',
    N: 'N = Nitrogen fills air! 78% of atmosphere, makes proteins',
    O: 'O = Oxygen we breathe! Essential for life and fire',
    F: 'F = Fluorine is scary! Most reactive non-metal, toothpaste',
    Ne: 'Ne = Neon glows! Red signs in the night, noble gas',
    Na: 'Na = Sodium is salty! Table salt, reactive with water',
    Mg: 'Mg = Magnesium sparks! Bright white flames, metal alloys',
    Al: 'Al = Aluminum is light! Cans, foil, used everywhere',
    Si: 'Si = Silicon makes sand! Computer chips, glass, sand',
    P: 'P = Phosphorus glows! Matches, fertilizer, our bones',
    S: 'S = Sulfur stinks! Matches, gunpowder, rotten egg smell',
    Cl: 'Cl = Chlorine cleans! Swimming pool chemical, bleach',
    Ar: 'Ar = Argon is lazy! Noble gas, light bulbs, welding',
    K: 'K = Potassium is bouncy! Explodes in water, very reactive',
    Ca: 'Ca = Calcium is bones! Milk, bones, teeth, limestone'
  };

  return tips[element.symbol] || `Remember ${element.symbol} = ${element.name}!`;
}

/**
 * Create a memory tips card
 */
function createMemoryTipsCard(element) {
  const typeInfo = getElementTypeInfo(element);

  return `
    <div class="memory-tips-card" style="--element-color: ${typeInfo.color};">
      <div class="tips-header" style="border-left: 4px solid ${typeInfo.color};">
        <div class="tips-symbol">${element.symbol}</div>
        <div class="tips-info">
          <div class="tips-name">${element.name}</div>
          <div class="tips-type">#${element.atomicNumber} • ${typeInfo.type} <i class="ti ti-${typeInfo.icon}"></i></div>
        </div>
      </div>
      
      <div class="tips-content">
        <div class="tip-section">
          <strong>Quick Memory:</strong>
          <p>${getQuickMemoryTip(element)}</p>
        </div>
        
        <div class="tip-section">
          <strong>Real World:</strong>
          <p>${element.realWorld || element.uses}</p>
        </div>
        
        <div class="tip-section">
          <strong>Fun Fact:</strong>
          <p>${element.funFact}</p>
        </div>
      </div>
    </div>
  `;
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.getElementTypeInfo = getElementTypeInfo;
  window.createStoryCard = createStoryCard;
  window.createKeywordCard = createKeywordCard;
  window.createRhymePegCard = createRhymePegCard;
  window.getQuickMemoryTip = getQuickMemoryTip;
  window.createMemoryTipsCard = createMemoryTipsCard;
  window.rhymePegs = rhymePegs;
  window.elementTypeColors = elementTypeColors;
}

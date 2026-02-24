/* eslint-disable no-undef */
/**
 * VISUAL ELEMENT CARDS WITH SIMPLIFIED MNEMONICS
 * Simple diagrams, icons, and short memory phrases for kids
 */

/**
 * Create simple SVG element visual
 */
function createElementVisual(element) {
  const visuals = {
    'H': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Gas molecule -->
      <circle cx="30" cy="50" r="8" fill="#FF6B6B" opacity="0.8"/>
      <circle cx="70" cy="50" r="8" fill="#FF6B6B" opacity="0.8"/>
      <line x1="38" y1="50" x2="62" y2="50" stroke="#FF6B6B" stroke-width="2" opacity="0.8"/>
      <!-- Float up -->
      <path d="M50 60 Q45 70 50 80" stroke="#FF6B6B" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M40 65 Q35 75 40 85" stroke="#FF6B6B" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M60 65 Q65 75 60 85" stroke="#FF6B6B" stroke-width="2" fill="none" opacity="0.6"/>
    </svg>`,
    'He': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Balloon -->
      <circle cx="50" cy="30" r="20" fill="#FFA06B" opacity="0.8" stroke="#FFA06B" stroke-width="1"/>
      <line x1="50" y1="50" x2="50" y2="85" stroke="#FFD93D" stroke-width="2"/>
      <!-- String knot -->
      <circle cx="50" cy="50" r="3" fill="#333"/>
    </svg>`,
    'C': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Diamond -->
      <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="#FFD700" opacity="0.8" stroke="#333" stroke-width="1"/>
      <!-- Sparkle -->
      <circle cx="30" cy="30" r="3" fill="#FFD700"/>
      <circle cx="70" cy="30" r="3" fill="#FFD700"/>
      <circle cx="30" cy="70" r="3" fill="#FFD700"/>
      <circle cx="70" cy="70" r="3" fill="#FFD700"/>
    </svg>`,
    'O': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Flame -->
      <ellipse cx="50" cy="50" rx="25" ry="35" fill="#FF6B6B" opacity="0.7"/>
      <ellipse cx="50" cy="45" rx="18" ry="25" fill="#FFB347" opacity="0.8"/>
      <ellipse cx="50" cy="40" rx="10" ry="15" fill="#FFD700" opacity="0.9"/>
    </svg>`,
    'N': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Wind/Air -->
      <path d="M20 40 Q40 30 60 40" stroke="#4D96FF" stroke-width="3" fill="none"/>
      <path d="M15 55 Q40 45 75 55" stroke="#4D96FF" stroke-width="3" fill="none"/>
      <path d="M20 70 Q35 60 70 70" stroke="#4D96FF" stroke-width="3" fill="none"/>
    </svg>`,
    'Fe': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Metal block -->
      <rect x="30" y="30" width="40" height="40" fill="#C0C0C0" stroke="#808080" stroke-width="2"/>
      <polygon points="30,30 40,20 80,20 70,30" fill="#E8E8E8" stroke="#808080" stroke-width="1"/>
      <polygon points="70,30 80,20 80,60 70,70" fill="#A9A9A9" stroke="#808080" stroke-width="1"/>
    </svg>`,
    'Na': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Salt crystal -->
      <rect x="35" y="35" width="30" height="30" fill="#F5F5F5" stroke="#999" stroke-width="2"/>
      <line x1="50" y1="35" x2="50" y2="65" stroke="#999" stroke-width="1"/>
      <line x1="35" y1="50" x2="65" y2="50" stroke="#999" stroke-width="1"/>
      <circle cx="50" cy="50" r="2" fill="#999"/>
    </svg>`,
    'Ca': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Bone -->
      <circle cx="30" cy="50" r="12" fill="#FFFACD" stroke="#F0E68C" stroke-width="1"/>
      <rect x="42" y="44" width="16" height="12" fill="#FFFACD" stroke="#F0E68C" stroke-width="1"/>
      <circle cx="70" cy="50" r="12" fill="#FFFACD" stroke="#F0E68C" stroke-width="1"/>
    </svg>`
  };

  return visuals[element.symbol] || `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="35" fill="#E0E0E0" stroke="#999" stroke-width="2"/>
    <text x="50" y="60" font-size="24" font-weight="bold" text-anchor="middle" fill="#333">${element.symbol}</text>
  </svg>`;
}

/**
 * Create simplified story card with visual + minimal text
 */
function createSimplifiedStoryCard(element, index, totalElements) {
  const typeInfo = getElementTypeInfo(element);
  const progressPercent = ((index + 1) / totalElements) * 100;

  // Super short memory hooks
  const shortHooks = {
    'H': 'Floats up',
    'He': 'Funny voice',
    'Li': 'Reacts fast',
    'Be': 'Very hard',
    'B': 'Super tough',
    'C': 'Shiny & strong',
    'N': 'Fills air',
    'O': 'Makes fire',
    'F': 'Most reactive',
    'Ne': 'Glows red',
    'Na': 'Salt crystal',
    'Mg': 'Sparks white',
    'Al': 'Light metal',
    'Si': 'Sand & glass',
    'P': 'In matches',
    'S': 'Rotten egg',
    'Cl': 'Pool cleaner',
    'Ar': 'In light bulbs',
    'K': 'Bounces water',
    'Ca': 'In bones'
  };

  return `
    <div class="simplified-story-card" style="--element-color: ${typeInfo.color}; --element-light: ${typeInfo.lightColor};">
      <div class="ssc-progress-bar" style="width: ${progressPercent}%"></div>
      
      <div class="ssc-visual">
        ${createElementVisual(element)}
      </div>
      
      <div class="ssc-badge" style="background: ${typeInfo.color}; color: white;">
        ${element.symbol}
      </div>
      
      <div class="ssc-name">${element.name}</div>
      
      <div class="ssc-type">
        <i class="ti ti-${getElementTypeIcon(typeInfo.type)}"></i>
        <span>${typeInfo.type}</span>
      </div>
      
      <div class="ssc-hook">
        <strong>${shortHooks[element.symbol] || 'Remember this!'}</strong>
      </div>
      
      <div class="ssc-uses">
        ${getTopUseIcon(element)} ${getTopUse(element)}
      </div>
    </div>
  `;
}

/**
 * Get element type icon for Tabler
 */
function getElementTypeIcon(type) {
  const icons = {
    'Alkali Metals': 'flame',
    'Alkaline Earth Metals': 'tools',
    'Transition Metals': 'shield-check',
    'Post-transition Metals': 'stone',
    'Nonmetals': 'wind',
    'Halogens': 'flask-2',
    'Noble Gases': 'sparkles'
  };
  return icons[type] || 'atom-2';
}

/**
 * Get top use emoji/icon
 */
function getTopUseIcon(element) {
  const icons = {
    'H': '<i class="ti ti-droplet"></i>',
    'He': '<i class="ti ti-balloon-2"></i>',
    'C': '<i class="ti ti-gem"></i>',
    'O': '<i class="ti ti-flame"></i>',
    'N': '<i class="ti ti-wind"></i>',
    'Fe': '<i class="ti ti-shield-check"></i>',
    'Na': '<i class="ti ti-seasoning"></i>',
    'Ca': '<i class="ti ti-bone-off"></i>',
    'Al': '<i class="ti ti-coin"></i>',
    'Cu': '<i class="ti ti-circle"></i>'
  };
  return icons[element.symbol] || '<i class="ti ti-atom-2"></i>';
}

/**
 * Get top use in 2-3 words
 */
function getTopUse(element) {
  const topUses = {
    'H': 'Water, Balloons',
    'He': 'Party Balloons',
    'Li': 'Batteries',
    'Be': 'Aerospace',
    'B': 'Fiberglass',
    'C': 'Diamonds',
    'N': 'Fertilizer',
    'O': 'Fire',
    'F': 'Toothpaste',
    'Ne': 'Neon Signs',
    'Na': 'Salt',
    'Mg': 'Alloys',
    'Al': 'Cans',
    'Si': 'Computers',
    'P': 'Fertilizer',
    'S': 'Matches',
    'Cl': 'Bleach',
    'Ar': 'Welding',
    'K': 'Soil',
    'Ca': 'Bones'
  };
  return topUses[element.symbol] || 'Uses';
}

/**
 * Create professional keyword card - visual focused
 */
function createProfessionalKeywordCard(element) {
  const typeInfo = getElementTypeInfo(element);
  const shortHook = getKeywordHook(element);

  return `
    <div class="pro-keyword-card" style="--element-color: ${typeInfo.color};">
      <div class="pkc-visual-area">
        <div class="pkc-visual">
          ${createElementVisual(element)}
        </div>
        <div class="pkc-symbol">${element.symbol}</div>
      </div>
      
      <div class="pkc-info">
        <div class="pkc-name">${element.name}</div>
        <div class="pkc-hook">
          <i class="ti ti-lightbulb"></i>
          ${shortHook}
        </div>
      </div>
    </div>
  `;
}

/**
 * Get short keyword hook
 */
function getKeywordHook(element) {
  const hooks = {
    'H': 'Lightest element',
    'He': 'Helium voice',
    'Li': 'Super reactive',
    'Be': 'Toxic metal',
    'B': 'Very hard',
    'C': 'All shapes',
    'N': 'Air builder',
    'O': 'Fire feeder',
    'F': 'Most reactive',
    'Ne': 'Red glow',
    'Na': 'Salty taste',
    'Mg': 'White spark',
    'Al': 'Light & strong',
    'Si': 'Sand grain',
    'P': 'Match tip',
    'S': 'Egg smell',
    'Cl': 'Water clean',
    'Ar': 'Lazy noble',
    'K': 'Bouncy metal',
    'Ca': 'Bone builder'
  };
  return hooks[element.symbol] || 'Unique element';
}

/**
 * Create professional rhyme peg - visual + minimal text
 */
function createProfessionalRhymePeg(element, pegNumber) {
  if (!rhymePegs[pegNumber]) {
    return '';
  }

  const peg = rhymePegs[pegNumber];
  const typeInfo = getElementTypeInfo(element);

  // Map peg to icon
  const pegIcons = {
    1: 'sun',
    2: 'shoe',
    3: 'tree',
    4: 'door-2',
    5: 'bug',
    6: 'logs',
    7: 'cloud',
    8: 'fish',
    9: 'plant-2',
    10: 'egg',
    11: 'lightbulb',
    12: 'bookshelf',
    13: 'tent',
    14: 'guitar',
    15: 'cake',
    16: 'coin',
    17: 'mask',
    18: 'mountain',
    19: 'sailboat',
    20: 'gift'
  };

  return `
    <div class="pro-rhyme-card" style="--element-color: ${typeInfo.color};">
      <div class="prc-number">${pegNumber}</div>
      
      <div class="prc-peg-icon">
        <i class="ti ti-${pegIcons[pegNumber] || 'help'}"></i>
      </div>
      
      <div class="prc-peg-name">${peg.peg}</div>
      
      <div class="prc-element">
        <div class="prc-element-symbol">${element.symbol}</div>
        <div class="prc-element-name">${element.name}</div>
      </div>
      
      <div class="prc-link">
        <strong>${pegNumber} = ${peg.peg}</strong>
        <br><small>${element.symbol}</small>
      </div>
    </div>
  `;
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.createSimplifiedStoryCard = createSimplifiedStoryCard;
  window.createProfessionalKeywordCard = createProfessionalKeywordCard;
  window.createProfessionalRhymePeg = createProfessionalRhymePeg;
  window.getElementTypeIcon = getElementTypeIcon;
  window.getTopUseIcon = getTopUseIcon;
  window.getTopUse = getTopUse;
  window.getKeywordHook = getKeywordHook;
  window.createElementVisual = createElementVisual;
}

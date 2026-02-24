/**
 * EARTH EXPLORER - MAP DATA
 *
 * Continent and ocean definitions with accurate polygon coordinates
 * Based on simplified world map projections
 *
 * TEMPLATE FOR FUTURE GAMES:
 * - Copy this structure for USA states, Europe countries, etc.
 * - Just change the regions and coordinates
 * - Same engine, different data!
 */

// Color palette for Earth Explorer
const EARTH_COLORS = {
  // Individual continent colors (kid-friendly, distinct)
  africa: 0xFFB347,        // Orange
  antarctica: 0xE0E0E0,    // Light gray
  asia: 0xFF6B9D,          // Pink
  australia: 0xFFD93D,     // Yellow
  europe: 0x95E1D3,        // Mint green
  northAmerica: 0xA8E6CF,  // Light green
  southAmerica: 0xFFAA85,  // Coral
  ocean: 0x4A90E2          // Ocean blue
};

/**
 * CONTINENTS - More accurate polygon coordinates
 * Coordinates approximate a Mercator-style projection
 * Simplified for kid-friendly gameplay
 */
const CONTINENTS = {
  africa: {
    name: 'Africa',
    color: EARTH_COLORS.africa,
    funFact: 'Africa has the world\'s largest desert (Sahara) and is home to amazing animals like lions and elephants!',
    points: [
      // More detailed Africa shape
      485, 215,   // North (Mediterranean coast)
      490, 220,   // Tunisia area
      495, 230,   // Libya
      500, 240,   // Egypt
      505, 250,   // Red Sea
      512, 265,   // Horn of Africa
      515, 285,   // Somalia
      516, 310,   // Kenya coast
      515, 335,   // Tanzania
      512, 360,   // Mozambique
      508, 385,   // Madagascar area
      502, 405,   // South Africa east
      490, 425,   // Eastern Cape
      475, 430,   // Cape of Good Hope
      460, 428,   // Western Cape
      448, 420,   // Namibia coast
      440, 405,   // Angola
      433, 385,   // Congo coast
      428, 360,   // Gabon
      425, 335,   // Cameroon
      424, 310,   // Nigeria
      426, 285,   // West Africa
      430, 265,   // Ghana area
      432, 245,   // Ivory Coast
      438, 230,   // Western bulge
      445, 220,   // Mauritania
      455, 215,   // Morocco
      470, 215    // Algeria
    ]
  },

  antarctica: {
    name: 'Antarctica',
    color: EARTH_COLORS.antarctica,
    funFact: 'Antarctica is the coldest continent and is covered in ice! Penguins live here!',
    points: [
      // Antarctica - bottom of map
      120, 580,
      200, 575,
      280, 580,
      360, 575,
      440, 580,
      520, 575,
      600, 580,
      680, 575,
      760, 580,
      780, 590,
      780, 615,
      760, 620,
      680, 615,
      600, 620,
      520, 615,
      440, 620,
      360, 615,
      280, 620,
      200, 615,
      120, 620,
      100, 610,
      100, 590
    ]
  },

  asia: {
    name: 'Asia',
    color: EARTH_COLORS.asia,
    funFact: 'Asia is the biggest continent! More than half of all people in the world live here!',
    points: [
      // Detailed Asia outline
      530, 158,   // Arctic Russia
      560, 155,   // Northern Siberia
      600, 158,   // Central Siberia
      650, 165,   // Eastern Siberia
      690, 175,   // Far East Russia
      720, 185,   // Kamchatka
      750, 200,   // Bering area
      775, 220,   // Kuril Islands
      785, 245,   // Japan area
      788, 275,   // East China Sea
      785, 300,   // Taiwan area
      778, 325,   // Philippines
      765, 345,   // South China Sea
      745, 360,   // Vietnam
      720, 368,   // Thailand
      695, 370,   // Malaysia
      670, 368,   // Singapore area
      645, 360,   // Sumatra
      620, 348,   // Java Sea
      600, 335,   // Indian Ocean
      585, 320,   // Bay of Bengal
      575, 300,   // India east coast
      568, 280,   // India middle
      565, 260,   // India
      570, 240,   // Pakistan
      575, 225,   // Afghanistan
      572, 210,   // Central Asia
      565, 195,   // Kazakhstan
      560, 180,   // West Siberia
      550, 170,   // Ural Mountains
      542, 165    // Back to Arctic
    ]
  },

  australia: {
    name: 'Australia',
    color: EARTH_COLORS.australia,
    funFact: 'Australia is both a continent and a country! Kangaroos and koalas live here!',
    points: [
      // Accurate Australia shape
      680, 425,   // North coast (Darwin area)
      705, 428,   // Arnhem Land
      730, 435,   // Gulf of Carpentaria
      750, 445,   // Cape York
      765, 460,   // East coast north
      775, 480,   // Brisbane area
      780, 500,   // Sydney area
      778, 520,   // Melbourne area
      768, 532,   // Tasmania area
      745, 535,   // South coast
      715, 532,   // Adelaide area
      685, 525,   // Perth area
      665, 510,   // West coast south
      658, 485,   // West coast middle
      660, 460,   // West coast north
      670, 440,   // Northwest coast
      678, 428    // Back to north
    ]
  },

  europe: {
    name: 'Europe',
    color: EARTH_COLORS.europe,
    funFact: 'Europe has more than 40 countries! The Eiffel Tower and Big Ben are here!',
    points: [
      // Detailed Europe
      465, 152,   // Scandinavia north
      480, 155,   // Norway
      495, 160,   // Sweden
      510, 168,   // Finland
      525, 175,   // Russia west
      528, 190,   // Russia
      525, 205,   // Ukraine area
      518, 220,   // Black Sea north
      510, 235,   // Turkey area
      495, 243,   // Greece
      480, 245,   // Italy south
      470, 240,   // Italy middle
      465, 232,   // Italy north
      458, 228,   // France south
      452, 220,   // Spain
      448, 210,   // Portugal
      450, 198,   // France
      455, 188,   // English Channel
      460, 180,   // Britain
      462, 170,   // Scotland
      460, 162    // Back to Scandinavia
    ]
  },

  northAmerica: {
    name: 'North America',
    color: EARTH_COLORS.northAmerica,
    funFact: 'North America has the USA, Canada, and Mexico! The Grand Canyon is here!',
    points: [
      // Detailed North America
      145, 168,   // Alaska west
      165, 158,   // Alaska north
      185, 155,   // Northwest Canada
      210, 152,   // Yukon
      240, 154,   // Northwest Territories
      270, 158,   // Nunavut
      295, 165,   // Baffin Island
      315, 178,   // Greenland area
      325, 195,   // Hudson Bay east
      328, 215,   // Quebec
      325, 235,   // Maine area
      322, 255,   // New York area
      325, 275,   // Florida
      320, 292,   // Gulf of Mexico
      305, 305,   // Texas coast
      285, 312,   // Mexico east
      268, 315,   // Central America
      255, 315,   // Panama
      245, 312,   // Pacific coast
      235, 305,   // Mexico west
      225, 295,   // Baja California
      215, 280,   // California
      208, 260,   // Oregon
      200, 240,   // Washington
      190, 225,   // British Columbia
      180, 210,   // Alaska coast
      170, 195,   // Gulf of Alaska
      160, 182,   // Aleutian Islands
      150, 175    // Back to Alaska
    ]
  },

  southAmerica: {
    name: 'South America',
    color: EARTH_COLORS.southAmerica,
    funFact: 'South America has the Amazon rainforest - the biggest rainforest in the world!',
    points: [
      // Detailed South America
      260, 318,   // Panama/Colombia
      275, 325,   // Colombia north
      290, 335,   // Venezuela
      308, 345,   // Guyana area
      322, 358,   // Brazil northeast
      330, 375,   // Brazil east bulge
      332, 400,   // Brazil east coast
      335, 430,   // Rio area
      338, 460,   // Brazil south
      340, 485,   // Uruguay
      338, 510,   // Argentina north
      330, 535,   // Buenos Aires area
      318, 550,   // Patagonia
      300, 560,   // Tierra del Fuego
      285, 558,   // Chile south
      272, 545,   // Chile middle
      265, 525,   // Chile central
      260, 500,   // Chile north
      257, 470,   // Peru south
      255, 440,   // Peru
      256, 410,   // Peru north
      260, 380,   // Ecuador
      263, 355,   // Colombia west
      262, 335    // Back to Panama
    ]
  }
};

/**
 * OCEANS - Simplified rectangular regions
 * Using areas array for flexible positioning
 */
const OCEANS = {
  pacific: {
    name: 'Pacific Ocean',
    color: EARTH_COLORS.ocean,
    funFact: 'The Pacific Ocean is the biggest ocean! It covers almost half of Earth\'s water!',
    isOcean: true,
    areas: [
      { x: 60, y: 325, width: 100, height: 480, labelX: 60, labelY: 110 },  // Left Pacific
      { x: 840, y: 325, width: 100, height: 480, labelX: 840, labelY: 110 }  // Right Pacific
    ]
  },

  atlantic: {
    name: 'Atlantic Ocean',
    color: EARTH_COLORS.ocean,
    funFact: 'The Atlantic Ocean is between Americas and Europe/Africa. The Titanic sank here!',
    isOcean: true,
    areas: [
      { x: 365, y: 300, width: 110, height: 340, labelX: 365, labelY: 185 }
    ]
  },

  indian: {
    name: 'Indian Ocean',
    color: EARTH_COLORS.ocean,
    funFact: 'The Indian Ocean is the warmest ocean! Beautiful coral reefs are here!',
    isOcean: true,
    areas: [
      { x: 620, y: 420, width: 145, height: 145, labelX: 620, labelY: 420 }
    ]
  },

  arctic: {
    name: 'Arctic Ocean',
    color: EARTH_COLORS.ocean,
    funFact: 'The Arctic Ocean is the smallest and coldest ocean! Polar bears live near here!',
    isOcean: true,
    areas: [
      { x: 450, y: 100, width: 690, height: 55, labelX: 450, labelY: 72 }
    ]
  },

  southern: {
    name: 'Southern Ocean',
    color: EARTH_COLORS.ocean,
    funFact: 'The Southern Ocean surrounds Antarctica! It has very strong winds and waves!',
    isOcean: true,
    areas: [
      { x: 450, y: 565, width: 690, height: 38, labelX: 450, labelY: 547 }
    ]
  }
};

/**
 * Combine all regions for easy access
 */
const ALL_REGIONS = { ...CONTINENTS, ...OCEANS };

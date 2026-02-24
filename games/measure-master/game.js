/* eslint-disable no-undef */
// ============================================================
// MEASURE MASTER - game.js (DOM-based)
// Learn what each unit of measurement means with real-world
// examples, origin stories, conversions, and real-world puzzles!
// Covers: mm, cm, inch, foot, yard, meter, km, mile
// ============================================================

// ==================== NAVIGATION SETUP ====================
let gameNav;

function initNavigation() {
  gameNav = new GameNavigation('measure-master', {
    screens: [
      'landing',
      'unit-detail',
      'sort',
      'sort-result',
      'quiz',
      'quiz-result',
      'conversions',
      'conv-result',
      'scenarios',
      'scen-result'
    ],
    initialScreen: 'landing',
    gameName: 'Measure Master',
    titles: {
      landing: 'Measure Master',
      'unit-detail': 'Learn Unit',
      sort: 'Sort Game',
      'sort-result': 'Results',
      quiz: 'Quiz',
      'quiz-result': 'Quiz Results',
      conversions: 'Conversions',
      'conv-result': 'Results',
      scenarios: 'Real-World',
      'scen-result': 'Results'
    }
  });
}

const screenMap = {
  'screen-menu': 'landing',
  'screen-unit-detail': 'unit-detail',
  'screen-sort': 'sort',
  'screen-sort-result': 'sort-result',
  'screen-quiz': 'quiz',
  'screen-quiz-result': 'quiz-result',
  'screen-conversions': 'conversions',
  'screen-conv-result': 'conv-result',
  'screen-scenarios': 'scenarios',
  'screen-scen-result': 'scen-result'
};

// ==================== UNIT DATABASE ====================
const UNITS = [
  {
    id: 'mm',
    name: 'Millimeter',
    abbr: 'mm',
    color: 0xe74c3c,
    cssColor: '#E74C3C',
    tagline: 'Tinier than a pencil tip!',
    emoji: '🔬',
    origin:
      '"Milli" is Latin for thousandth. The millimeter was born in France in 1795 when scientists invented the metric system. Their big idea? Make everything multiply or divide by 10 — no confusing fractions! Today it\'s used by doctors, engineers, and jewelers for super-precise measurements. 🏅',
    items: [
      { emoji: '🐜', name: 'An ant', detail: '~1–2 mm wide' },
      { emoji: '💧', name: 'A raindrop', detail: '~2 mm wide' },
      { emoji: '💊', name: 'A tiny pill', detail: '~3–5 mm thick' },
      { emoji: '🦟', name: 'Mosquito body', detail: '~4 mm long' }
    ]
  },
  {
    id: 'cm',
    name: 'Centimeter',
    abbr: 'cm',
    color: 0xe67e22,
    cssColor: '#E67E22',
    tagline: 'About as wide as your finger!',
    emoji: '🍇',
    origin:
      '"Centi" means hundredth in Latin — 100 centimeters make one meter. Also invented in France in 1795, the centimeter replaced a messy system where every country had different units. Now anyone in the world can measure the same way! Used in clothing, cooking, and classrooms every day. 🌍',
    items: [
      { emoji: '🍇', name: 'A grape', detail: '~2 cm wide' },
      { emoji: '🖍️', name: 'A crayon', detail: '~10 cm long' },
      { emoji: '🦷', name: 'A tooth', detail: '~2 cm tall' },
      { emoji: '🔋', name: 'AA battery', detail: '~5 cm tall' }
    ]
  },
  {
    id: 'in',
    name: 'Inch',
    abbr: 'in',
    color: 0xf1c40f,
    cssColor: '#F1C40F',
    tagline: 'About as wide as your thumb!',
    emoji: '👍',
    origin:
      'The inch comes from ancient Rome — they called it "uncia" meaning one-twelfth. For centuries, kings defined it by their thumb width! In 1324, King Edward II of England made it official: "Three barleycorns laid end-to-end = 1 inch." 🌾 Barleycorns! Still used in the US, UK, and for screen sizes worldwide. 📱',
    items: [
      { emoji: '📎', name: 'A paperclip', detail: '~1 inch long' },
      { emoji: '🪙', name: 'A quarter coin', detail: '~1 inch wide' },
      { emoji: '🍬', name: 'Candy bar', detail: '~1 inch wide' },
      { emoji: '🖊️', name: 'A pen cap', detail: '~2 inches long' }
    ]
  },
  {
    id: 'ft',
    name: 'Foot',
    abbr: 'ft',
    color: 0x27ae60,
    cssColor: '#27AE60',
    tagline: 'Same length as a ruler!',
    emoji: '📏',
    origin:
      "This one literally came from a human foot! Ancient Egyptians, Greeks, and Romans all measured by stepping. The problem? Everyone's feet are different sizes! King Henry I of England fixed this around 1100 AD — 1 foot = the length of HIS royal foot. 👑 Pilots and weather forecasters still use feet for altitude today!",
    items: [
      { emoji: '📏', name: 'A ruler', detail: 'Exactly 1 foot' },
      { emoji: '👟', name: 'Your shoe', detail: '~1 foot long' },
      { emoji: '🎒', name: 'A backpack', detail: '~1.5 feet tall' },
      { emoji: '🐕', name: 'Small dog', detail: '~1.5 feet tall' }
    ]
  },
  {
    id: 'yd',
    name: 'Yard',
    abbr: 'yd',
    color: 0x2980b9,
    cssColor: '#2980B9',
    tagline: '3 rulers laid end to end!',
    emoji: '⚾',
    origin:
      'King Henry I of England created the yard too — the distance from his royal nose to his outstretched thumb! 👃→👍 The word "yard" comes from Old English "gyrd" meaning rod or stick. Football fields are measured in yards, and fabric at the store is sold by the yard. Tailors have used yards for over 900 years!',
    items: [
      { emoji: '⚾', name: 'Baseball bat', detail: '~1 yard long' },
      { emoji: '🎸', name: 'A guitar', detail: '~1 yard tall' },
      { emoji: '🚪', name: 'Door width', detail: '~1 yard wide' },
      { emoji: '🛏️', name: 'Bed width', detail: '~1 yard wide' }
    ]
  },
  {
    id: 'm',
    name: 'Meter',
    abbr: 'm',
    color: 0x8e44ad,
    cssColor: '#8E44AD',
    tagline: 'About the height of a door!',
    emoji: '🚪',
    origin:
      "French scientists in 1795 defined the meter as one ten-millionth of the distance from the North Pole to the equator! ✈️ Today it's defined by the speed of light — light travels exactly 299,792,458 meters every second! Olympic swimming pools, track races, and almost every country on Earth use meters. ⚡",
    items: [
      { emoji: '🚪', name: 'Door height', detail: '~2 meters tall' },
      { emoji: '🛁', name: 'A bathtub', detail: '~1.5 meters long' },
      { emoji: '🧍', name: 'Tall adult', detail: '~1.8 meters tall' },
      { emoji: '🚗', name: 'Car width', detail: '~2 meters wide' }
    ]
  },
  {
    id: 'km',
    name: 'Kilometer',
    abbr: 'km',
    color: 0x16a085,
    cssColor: '#16A085',
    tagline: '10 football fields in a row!',
    emoji: '🏫',
    origin:
      '"Kilo" comes from Greek "khilioi" meaning one thousand. The kilometer was invented in France in 1795 — just add "kilo" to mean ×1,000. Brilliant! 🧠 Road signs, marathon races (42 km!), and maps all use kilometers. The whole world except the US uses km for driving distances. 🗺️',
    items: [
      { emoji: '🏫', name: 'Walk to school', detail: '~1–2 km away' },
      { emoji: '🏃', name: 'A 10-min jog', detail: '~1 km distance' },
      { emoji: '⚽', name: '10 soccer fields', detail: '~1 km end to end' },
      { emoji: '🛒', name: 'Trip to store', detail: 'A few km away' }
    ]
  },
  {
    id: 'mi',
    name: 'Mile',
    abbr: 'mi',
    color: 0x1abc9c,
    cssColor: '#1ABC9C',
    tagline: 'A 15–20 minute walk!',
    emoji: '🛣️',
    origin:
      'From ancient Rome! Roman soldiers counted 1,000 double-steps (left+right foot = 1 double-step). In Latin, "mille passuum" means "a thousand paces" — that\'s where "mile" comes from! 🪖 A Roman mile was ~4,856 feet. Today\'s mile is 5,280 feet. US roads, running races, and airplane speeds (mph) still use miles. 🏆',
    items: [
      { emoji: '🏃', name: 'School mile run', detail: 'Standard 1-mile race' },
      { emoji: '🛣️', name: 'Highway markers', detail: '1 mile apart' },
      { emoji: '🏘️', name: 'Long walk around', detail: '~1 mile loop' },
      { emoji: '⚽', name: '17 soccer fields', detail: '~1 mile end to end' }
    ]
  }
];

// Size-order context shown on each unit card
const SIZE_CONTEXT = {
  mm: '10 mm = 1 cm   ·   About 25 mm = 1 inch',
  cm: '100 cm = 1 meter   ·   About 2.5 cm = 1 inch',
  in: '12 inches = 1 foot   ·   36 inches = 1 yard',
  ft: '3 feet = 1 yard   ·   5,280 feet = 1 mile',
  yd: '3 feet = 1 yard   ·   1,760 yards = 1 mile',
  m: '100 cm = 1 meter   ·   1,000 meters = 1 km',
  km: '1 km = 1,000 meters   ·   About 1.6 km = 1 mile',
  mi: '1 mile = 5,280 feet   ·   About 1.6 km = 1 mile'
};

// ==================== QUIZ QUESTIONS ====================
const ALL_QUIZ_QUESTIONS = [
  { emoji: '🐜', name: 'An ant', unit: 'mm', hint: 'An ant is tiny — about 1–2 mm wide!' },
  { emoji: '💧', name: 'A raindrop', unit: 'mm', hint: 'Raindrops are only about 2 mm wide!' },
  { emoji: '💊', name: 'A tiny pill', unit: 'mm', hint: 'A small pill is just a few mm thick!' },
  { emoji: '🍇', name: 'A grape', unit: 'cm', hint: 'A grape is about 2 cm wide!' },
  { emoji: '🖍️', name: 'A crayon', unit: 'cm', hint: 'A crayon is about 10 cm long!' },
  { emoji: '🦷', name: 'A tooth', unit: 'cm', hint: 'A tooth is about 2 cm tall!' },
  { emoji: '📎', name: 'A paperclip', unit: 'in', hint: 'A paperclip is about 1 inch long!' },
  { emoji: '🪙', name: 'A quarter coin', unit: 'in', hint: 'A quarter is about 1 inch wide!' },
  { emoji: '📏', name: 'A ruler', unit: 'ft', hint: 'A ruler is exactly 1 foot = 12 inches!' },
  { emoji: '👟', name: 'A shoe', unit: 'ft', hint: 'A shoe is about 1 foot long!' },
  { emoji: '🎒', name: 'A backpack', unit: 'ft', hint: 'A backpack is about 1.5 feet tall!' },
  { emoji: '⚾', name: 'A baseball bat', unit: 'yd', hint: 'A baseball bat is about 1 yard long!' },
  { emoji: '🎸', name: 'A guitar', unit: 'yd', hint: 'A guitar is about 1 yard tall!' },
  { emoji: '🚪', name: 'Door height', unit: 'm', hint: 'A door is about 2 meters tall!' },
  { emoji: '🛁', name: 'A bathtub', unit: 'm', hint: 'A bathtub is about 1.5 meters long!' },
  { emoji: '🚗', name: 'Car width', unit: 'm', hint: 'A car is about 2 meters wide!' },
  { emoji: '🏫', name: 'Walk to school', unit: 'km', hint: 'School is usually 1–2 km away!' },
  { emoji: '⚽', name: '10 soccer fields', unit: 'km', hint: '10 fields end to end = about 1 km!' },
  { emoji: '🏃', name: 'School mile run', unit: 'mi', hint: 'The mile run is exactly 1 mile!' },
  {
    emoji: '🛣️',
    name: 'Highway markers',
    unit: 'mi',
    hint: 'Highway mile markers are 1 mile apart!'
  }
];

// ==================== CONVERSION QUESTIONS ====================
const ALL_CONVERSIONS = [
  // ── Inches ↔ Feet
  {
    q: '1 foot = ? inches',
    answer: 12,
    wrong: [10, 11, 24],
    formula: '1 foot = 12 inches',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '2 feet = ? inches',
    answer: 24,
    wrong: [12, 20, 36],
    formula: '2 × 12 = 24',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '3 feet = ? inches',
    answer: 36,
    wrong: [24, 30, 48],
    formula: '3 × 12 = 36',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '4 feet = ? inches',
    answer: 48,
    wrong: [36, 40, 60],
    formula: '4 × 12 = 48',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '5 feet = ? inches',
    answer: 60,
    wrong: [48, 55, 72],
    formula: '5 × 12 = 60',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '12 inches = ? feet',
    answer: 1,
    wrong: [2, 3, 12],
    formula: '12 ÷ 12 = 1',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '24 inches = ? feet',
    answer: 2,
    wrong: [1, 3, 6],
    formula: '24 ÷ 12 = 2',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '36 inches = ? feet',
    answer: 3,
    wrong: [2, 4, 12],
    formula: '36 ÷ 12 = 3',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '48 inches = ? feet',
    answer: 4,
    wrong: [3, 5, 6],
    formula: '48 ÷ 12 = 4',
    emoji: '📏',
    cat: 'imperial'
  },
  {
    q: '60 inches = ? feet',
    answer: 5,
    wrong: [4, 6, 12],
    formula: '60 ÷ 12 = 5',
    emoji: '📏',
    cat: 'imperial'
  },
  // ── Feet ↔ Yards
  {
    q: '1 yard = ? feet',
    answer: 3,
    wrong: [1, 2, 12],
    formula: '1 yard = 3 feet',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '2 yards = ? feet',
    answer: 6,
    wrong: [2, 4, 9],
    formula: '2 × 3 = 6',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '3 yards = ? feet',
    answer: 9,
    wrong: [6, 8, 12],
    formula: '3 × 3 = 9',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '4 yards = ? feet',
    answer: 12,
    wrong: [9, 10, 16],
    formula: '4 × 3 = 12',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '5 yards = ? feet',
    answer: 15,
    wrong: [10, 12, 18],
    formula: '5 × 3 = 15',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '3 feet = ? yards',
    answer: 1,
    wrong: [2, 3, 6],
    formula: '3 ÷ 3 = 1',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '6 feet = ? yards',
    answer: 2,
    wrong: [1, 3, 4],
    formula: '6 ÷ 3 = 2',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '9 feet = ? yards',
    answer: 3,
    wrong: [2, 4, 6],
    formula: '9 ÷ 3 = 3',
    emoji: '⚾',
    cat: 'imperial'
  },
  {
    q: '12 feet = ? yards',
    answer: 4,
    wrong: [3, 5, 6],
    formula: '12 ÷ 3 = 4',
    emoji: '⚾',
    cat: 'imperial'
  },
  // ── mm ↔ cm
  {
    q: '10 mm = ? cm',
    answer: 1,
    wrong: [5, 2, 10],
    formula: '10 mm = 1 cm',
    emoji: '🔬',
    cat: 'metric'
  },
  {
    q: '20 mm = ? cm',
    answer: 2,
    wrong: [1, 5, 10],
    formula: '20 ÷ 10 = 2',
    emoji: '🔬',
    cat: 'metric'
  },
  {
    q: '50 mm = ? cm',
    answer: 5,
    wrong: [2, 10, 25],
    formula: '50 ÷ 10 = 5',
    emoji: '🔬',
    cat: 'metric'
  },
  {
    q: '70 mm = ? cm',
    answer: 7,
    wrong: [5, 10, 70],
    formula: '70 ÷ 10 = 7',
    emoji: '🔬',
    cat: 'metric'
  },
  {
    q: '1 cm = ? mm',
    answer: 10,
    wrong: [1, 5, 100],
    formula: '1 cm = 10 mm',
    emoji: '🔬',
    cat: 'metric'
  },
  {
    q: '3 cm = ? mm',
    answer: 30,
    wrong: [3, 13, 100],
    formula: '3 × 10 = 30',
    emoji: '🔬',
    cat: 'metric'
  },
  {
    q: '5 cm = ? mm',
    answer: 50,
    wrong: [5, 15, 500],
    formula: '5 × 10 = 50',
    emoji: '🔬',
    cat: 'metric'
  },
  {
    q: '8 cm = ? mm',
    answer: 80,
    wrong: [8, 18, 800],
    formula: '8 × 10 = 80',
    emoji: '🔬',
    cat: 'metric'
  },
  // ── cm ↔ m
  {
    q: '100 cm = ? m',
    answer: 1,
    wrong: [10, 100, 1000],
    formula: '100 cm = 1 m',
    emoji: '🚪',
    cat: 'metric'
  },
  {
    q: '200 cm = ? m',
    answer: 2,
    wrong: [1, 20, 100],
    formula: '200 ÷ 100 = 2',
    emoji: '🚪',
    cat: 'metric'
  },
  {
    q: '300 cm = ? m',
    answer: 3,
    wrong: [2, 30, 100],
    formula: '300 ÷ 100 = 3',
    emoji: '🚪',
    cat: 'metric'
  },
  {
    q: '500 cm = ? m',
    answer: 5,
    wrong: [4, 50, 100],
    formula: '500 ÷ 100 = 5',
    emoji: '🚪',
    cat: 'metric'
  },
  {
    q: '1 m = ? cm',
    answer: 100,
    wrong: [10, 50, 1000],
    formula: '1 m = 100 cm',
    emoji: '🚪',
    cat: 'metric'
  },
  {
    q: '2 m = ? cm',
    answer: 200,
    wrong: [20, 100, 2000],
    formula: '2 × 100 = 200',
    emoji: '🚪',
    cat: 'metric'
  },
  {
    q: '3 m = ? cm',
    answer: 300,
    wrong: [30, 200, 3000],
    formula: '3 × 100 = 300',
    emoji: '🚪',
    cat: 'metric'
  },
  {
    q: '4 m = ? cm',
    answer: 400,
    wrong: [40, 300, 4000],
    formula: '4 × 100 = 400',
    emoji: '🚪',
    cat: 'metric'
  },
  // ── m ↔ km
  {
    q: '1000 m = ? km',
    answer: 1,
    wrong: [10, 100, 1000],
    formula: '1000 m = 1 km',
    emoji: '🏫',
    cat: 'metric'
  },
  {
    q: '2000 m = ? km',
    answer: 2,
    wrong: [1, 20, 200],
    formula: '2000 ÷ 1000 = 2',
    emoji: '🏫',
    cat: 'metric'
  },
  {
    q: '3000 m = ? km',
    answer: 3,
    wrong: [2, 30, 300],
    formula: '3000 ÷ 1000 = 3',
    emoji: '🏫',
    cat: 'metric'
  },
  {
    q: '5000 m = ? km',
    answer: 5,
    wrong: [4, 50, 500],
    formula: '5000 ÷ 1000 = 5',
    emoji: '🏫',
    cat: 'metric'
  },
  {
    q: '1 km = ? m',
    answer: 1000,
    wrong: [10, 100, 500],
    formula: '1 km = 1000 m',
    emoji: '🏫',
    cat: 'metric'
  },
  {
    q: '2 km = ? m',
    answer: 2000,
    wrong: [200, 1000, 20000],
    formula: '2 × 1000 = 2000',
    emoji: '🏫',
    cat: 'metric'
  },
  {
    q: '3 km = ? m',
    answer: 3000,
    wrong: [300, 2000, 30000],
    formula: '3 × 1000 = 3000',
    emoji: '🏫',
    cat: 'metric'
  },
  {
    q: '4 km = ? m',
    answer: 4000,
    wrong: [400, 3000, 40000],
    formula: '4 × 1000 = 4000',
    emoji: '🏫',
    cat: 'metric'
  }
];

// Conversion memory charts by category
const CONV_CHARTS = {
  imperial: ['12 inches = 1 foot', '3 feet = 1 yard', '36 inches = 1 yard'],
  metric: ['10 mm = 1 cm', '100 cm = 1 m', '1000 m = 1 km']
};

// ==================== REAL-WORLD SCENARIOS ====================
const ALL_SCENARIOS = [
  {
    scene: '📐 Art Class',
    story:
      'You need 2 feet of string for\nan art project. Your ruler shows\nonly inches. How many inches do you need?',
    answer: 24,
    choices: [12, 18, 24, 36],
    formula: '2 feet × 12 = 24 inches',
    emoji: '✂️'
  },
  {
    scene: '⚾ Baseball Practice',
    story: 'A baseball bat is about 1 yard long.\nHow many feet is that?',
    answer: 3,
    choices: [1, 2, 3, 12],
    formula: '1 yard = 3 feet',
    emoji: '⚾'
  },
  {
    scene: '🏈 Football Field',
    story: 'A football field is 100 yards long.\nHow many feet is that?',
    answer: 300,
    choices: [100, 200, 300, 400],
    formula: '100 yards × 3 = 300 feet',
    emoji: '🏈'
  },
  {
    scene: '🚪 New Door',
    story: 'A door is 7 feet tall.\nHow many inches tall is that?',
    answer: 84,
    choices: [70, 78, 84, 96],
    formula: '7 feet × 12 = 84 inches',
    emoji: '🚪'
  },
  {
    scene: '🎯 Archery Class',
    story: 'The target is 9 feet away.\nHow many yards away is that?',
    answer: 3,
    choices: [1, 2, 3, 4],
    formula: '9 feet ÷ 3 = 3 yards',
    emoji: '🎯'
  },
  {
    scene: '🏫 Walk to School',
    story: 'Your school is 2 km from home.\nHow many meters away is it?',
    answer: 2000,
    choices: [200, 2000, 20, 20000],
    formula: '2 km × 1000 = 2000 meters',
    emoji: '🏫'
  },
  {
    scene: '🏊 Swimming Pool',
    story: 'An Olympic pool is 50 meters long.\nHow many centimeters is that?',
    answer: 5000,
    choices: [500, 5000, 50, 50000],
    formula: '50 m × 100 = 5000 cm',
    emoji: '🏊'
  },
  {
    scene: '🛣️ Road Trip',
    story: 'A sign says the next town is 5 km away.\nHow many meters is that?',
    answer: 5000,
    choices: [500, 5000, 50000, 50],
    formula: '5 km × 1000 = 5000 meters',
    emoji: '🛣️'
  },
  {
    scene: '🌧️ Rainy Day',
    story: 'Yesterday it rained 30 mm.\nHow many centimeters of rain fell?',
    answer: 3,
    choices: [1, 3, 30, 300],
    formula: '30 mm ÷ 10 = 3 cm',
    emoji: '🌧️'
  },
  {
    scene: '🥾 Hiking Trail',
    story: 'The trail is 3,000 meters long.\nHow many kilometers is that?',
    answer: 3,
    choices: [3, 30, 300, 3000],
    formula: '3000 m ÷ 1000 = 3 km',
    emoji: '🥾'
  },
  {
    scene: '🎸 Music Class',
    story: 'A guitar is about 1 yard long.\nHow many inches is that?',
    answer: 36,
    choices: [12, 24, 36, 48],
    formula: '1 yard = 3 feet, 3 × 12 = 36 inches',
    emoji: '🎸'
  },
  {
    scene: '🛁 Bath Time',
    story: 'A bathtub is about 150 cm long.\nHow many millimeters is that?',
    answer: 1500,
    choices: [15, 150, 1500, 15000],
    formula: '150 cm × 10 = 1500 mm',
    emoji: '🛁'
  },
  {
    scene: '🏃 Track Day',
    story: 'You ran 4 km on the track today.\nHow many meters did you run?',
    answer: 4000,
    choices: [400, 4000, 40, 40000],
    formula: '4 km × 1000 = 4000 meters',
    emoji: '🏃'
  },
  {
    scene: '🖍️ Art Supply',
    story: 'A crayon is about 10 cm long.\nHow many millimeters is that?',
    answer: 100,
    choices: [10, 100, 1000, 1],
    formula: '10 cm × 10 = 100 mm',
    emoji: '🖍️'
  },
  {
    scene: '🚗 Car in the Garage',
    story: 'A car is about 4 meters long.\nHow many centimeters is that?',
    answer: 400,
    choices: [40, 400, 4000, 4],
    formula: '4 m × 100 = 400 cm',
    emoji: '🚗'
  },
  {
    scene: '🏠 Building a Bookshelf',
    story: 'You need 5 feet of wood for a shelf.\nHow many inches of wood do you need?',
    answer: 60,
    choices: [5, 50, 60, 72],
    formula: '5 feet × 12 = 60 inches',
    emoji: '📚'
  },
  {
    scene: '🎪 County Fair',
    story:
      'The fair is 3 miles away.\nA mile is 5,280 feet. How many feet away is the fair? (Hint: 3 × 5 = 15, add three zeros!)',
    answer: 15840,
    choices: [5280, 10560, 15840, 21120],
    formula: '3 × 5,280 = 15,840 feet',
    emoji: '🎡'
  }
];

// ==================== STATE VARIABLES ====================
let currentUnitIndex = 0;
let unitDetailMode = 'story'; // 'story' | 'examples'
let quizQuestions = [],
  quizIndex = 0,
  quizScore = 0,
  quizLocked = false;
let convQuestions = [],
  convIndex = 0,
  convScore = 0,
  convLocked = false;
let scenQuestions = [],
  scenIndex = 0,
  scenScore = 0,
  scenLocked = false;
const sortState = { slots: new Array(8).fill(null), bank: [], selected: null };
let autoAdvanceTimer = null;

const CORRECT_ORDER = ['mm', 'cm', 'in', 'ft', 'yd', 'm', 'km', 'mi'];

// ==================== NAVIGATION HELPERS ====================
function setNavMeta(text) {
  document.getElementById('nav-meta').textContent = text;
}

function setNavTitle(text) {
  document.getElementById('nav-title').textContent = text;
}

function showScreen(id) {
  // Map old ID to new data-screen name if needed
  const screenName = screenMap[id] || id;

  // Use GameNavigation to track navigation properly
  if (gameNav && gameNav.config.screens.includes(screenName)) {
    gameNav.goToScreen(screenName);
  } else {
    // Fallback for backward compatibility
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    const element =
      document.querySelector(`[data-screen="${screenName}"]`) || document.getElementById(id);
    if (element) {
      element.classList.add('active');
    }
  }

  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

// ==================== UTILITY FUNCTIONS ====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getMedal(score, total) {
  const pct = score / total;
  if (pct === 1) {
    return '🏆';
  }
  if (pct >= 0.8) {
    return '⭐';
  }
  if (pct >= 0.5) {
    return '💪';
  }
  return '🎯';
}

function getMedalMessage(score, total) {
  const pct = score / total;
  if (pct === 1) {
    return 'Perfect!';
  }
  if (pct >= 0.8) {
    return 'Excellent!';
  }
  if (pct >= 0.6) {
    return 'Great work!';
  }
  if (pct >= 0.5) {
    return 'Good try!';
  }
  return 'Keep practicing!';
}

// ==================== MENU SCREEN ====================
function initMenu() {
  setNavTitle('Measure Master');
  setNavMeta('');

  const grid = document.getElementById('mode-grid');
  grid.innerHTML = '';

  const modes = [
    {
      color: '#3498DB',
      emoji: '🔍',
      title: 'Explore Units',
      sub: 'See what each unit looks like in real life',
      action: () => showUnitGrid('explore')
    },
    {
      color: '#2980B9',
      emoji: '📖',
      title: 'Origin Stories',
      sub: 'How each unit was invented & why it exists',
      action: () => showUnitGrid('history')
    },
    {
      color: '#2471A3',
      emoji: '📊',
      title: 'Sort Challenge',
      sub: 'Order units from smallest to largest',
      action: () => showSortScreen()
    },
    {
      color: '#16A085',
      emoji: '🔄',
      title: 'Conversions',
      sub: 'Inches to feet, cm to m, and more!',
      action: () => startConversions()
    },
    {
      color: '#3498DB',
      emoji: '❓',
      title: 'Quiz Time!',
      sub: 'Pick the right unit for each real-world thing',
      action: () => startQuiz()
    },
    {
      color: '#1ABC9C',
      emoji: '🌍',
      title: 'Real Scenarios',
      sub: 'Solve measurement puzzles from everyday life!',
      action: () => startScenarios()
    }
  ];

  modes.forEach(m => {
    const card = document.createElement('div');
    card.className = 'mm-mode-card';
    card.style.setProperty('--card-color', m.color);
    card.innerHTML = `
            <div class="mm-mode-emoji">${m.emoji}</div>
            <div class="mm-mode-title">${m.title}</div>
            <div class="mm-mode-subtitle">${m.sub}</div>
        `;
    card.onclick = m.action;
    grid.appendChild(card);
  });

  // Unit chips
  const chips = document.getElementById('unit-chips');
  chips.innerHTML = '';
  UNITS.forEach(u => {
    const chip = document.createElement('div');
    chip.className = 'mm-unit-chip';
    chip.style.setProperty('--chip-color', u.cssColor);
    chip.textContent = u.abbr;
    chips.appendChild(chip);
  });

  showScreen('screen-menu');
}

// ==================== UNIT GRID SCREEN ====================
function showUnitGrid(mode) {
  setNavTitle('Measure Master');
  setNavMeta('');

  unitDetailMode = mode === 'history' ? 'story' : 'story';
  const title = mode === 'history' ? 'Origin Stories' : 'Explore Units';

  const content = document.getElementById('unit-detail-content');
  content.innerHTML = `
        <div style="padding: 16px; text-align: center; background: var(--dom-bg); border-bottom: 1px solid var(--dom-border);">
            <h2 style="font-size: 1.3rem; margin: 0 0 4px 0; color: var(--dom-text);">${title}</h2>
            <p style="margin: 0; color: var(--dom-text-muted); font-size: 0.9rem;">Click a unit to explore</p>
        </div>
        <div class="mm-unit-grid" id="unit-grid-container"></div>
    `;

  const container = document.getElementById('unit-grid-container');
  UNITS.forEach((unit, idx) => {
    const card = document.createElement('div');
    card.className = 'mm-unit-card';
    card.style.setProperty('--unit-color', unit.cssColor);
    card.innerHTML = `
            <div class="mm-unit-emoji">${unit.emoji}</div>
            <div class="mm-unit-name">${unit.name}</div>
            <div class="mm-unit-abbr">${unit.abbr}</div>
            <div class="mm-unit-tagline">${unit.tagline}</div>
        `;
    card.onclick = () => {
      currentUnitIndex = idx;
      showUnitDetail(idx, mode);
    };
    container.appendChild(card);
  });

  showScreen('screen-unit-detail');
}

// ==================== UNIT DETAIL SCREEN ====================
function showUnitDetail(index, mode) {
  const unit = UNITS[index];
  setNavTitle(unit.name);
  setNavMeta(`${index + 1} / ${UNITS.length}`);

  const content = document.getElementById('unit-detail-content');

  // Determine initial mode
  let initialMode = 'story';
  if (mode === 'history') {
    initialMode = 'story';
  } else {
    initialMode = 'examples';
  }

  unitDetailMode = initialMode;

  content.innerHTML = `
        <div class="mm-unit-header" style="--unit-color: ${unit.cssColor};">
            <div class="mm-unit-header-emoji">${unit.emoji}</div>
            <div class="mm-unit-header-name">${unit.name}</div>
            <div class="mm-unit-header-abbr">${unit.abbr}</div>
            <div class="mm-unit-header-tagline">${unit.tagline}</div>
        </div>
        <div class="mm-tab-bar">
            <button class="mm-tab ${initialMode === 'story' ? 'active' : ''}" style="--unit-color: ${unit.cssColor};" id="tab-story">Story</button>
            <button class="mm-tab ${initialMode === 'examples' ? 'active' : ''}" style="--unit-color: ${unit.cssColor};" id="tab-examples">Examples</button>
        </div>
        <div class="mm-tab-content" id="tab-content"></div>
        <div class="mm-detail-nav">
            <button class="mm-detail-btn" style="--unit-color: ${unit.cssColor};" id="prev-unit-btn" ${index === 0 ? 'disabled' : ''}>← Prev</button>
            <button class="mm-detail-btn" style="--unit-color: ${unit.cssColor};" id="menu-unit-btn">Menu</button>
            <button class="mm-detail-btn" style="--unit-color: ${unit.cssColor};" id="next-unit-btn" ${index === UNITS.length - 1 ? 'disabled' : ''}>Next →</button>
            <div class="mm-detail-counter">${index + 1} / ${UNITS.length}</div>
        </div>
    `;

  // Render initial tab content
  renderTabContent(unit, initialMode);

  // Tab switching
  document.getElementById('tab-story').onclick = () => {
    unitDetailMode = 'story';
    document.querySelectorAll('.mm-tab').forEach((t, i) => {
      t.classList.toggle('active', i === 0);
    });
    renderTabContent(unit, 'story');
  };

  document.getElementById('tab-examples').onclick = () => {
    unitDetailMode = 'examples';
    document.querySelectorAll('.mm-tab').forEach((t, i) => {
      t.classList.toggle('active', i === 1);
    });
    renderTabContent(unit, 'examples');
  };

  // Navigation
  if (index > 0) {
    document.getElementById('prev-unit-btn').onclick = () => {
      currentUnitIndex--;
      showUnitDetail(currentUnitIndex, mode);
    };
  }

  if (index < UNITS.length - 1) {
    document.getElementById('next-unit-btn').onclick = () => {
      currentUnitIndex++;
      showUnitDetail(currentUnitIndex, mode);
    };
  }

  document.getElementById('menu-unit-btn').onclick = initMenu;

  showScreen('screen-unit-detail');
}

function renderTabContent(unit, tab) {
  const content = document.getElementById('tab-content');

  if (tab === 'story') {
    content.innerHTML = `
            <div class="mm-story-text">${unit.origin}</div>
            <div class="mm-size-context">${SIZE_CONTEXT[unit.id]}</div>
        `;
  } else {
    content.innerHTML = '<div class="mm-items-grid" id="items-grid"></div>';
    const grid = document.getElementById('items-grid');
    unit.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'mm-item-card';
      card.innerHTML = `
                <div class="mm-item-emoji">${item.emoji}</div>
                <div class="mm-item-name">${item.name}</div>
                <div class="mm-item-detail">${item.detail}</div>
            `;
      grid.appendChild(card);
    });
  }
}

// ==================== SORT CHALLENGE ====================
function showSortScreen() {
  setNavTitle('Sort Challenge');
  setNavMeta('Order units');

  sortState.slots = new Array(8).fill(null);
  sortState.bank = shuffle([...CORRECT_ORDER]);
  sortState.selected = null;

  renderSortUI();
  showScreen('screen-sort');
}

function renderSortUI() {
  const slotsDiv = document.getElementById('sort-slots');
  slotsDiv.innerHTML = '';

  for (let i = 0; i < 8; i++) {
    const slot = document.createElement('div');
    slot.className = 'mm-slot';

    if (sortState.slots[i]) {
      const unit = UNITS.find(u => u.id === sortState.slots[i]);
      slot.classList.add('filled');
      slot.style.setProperty('--slot-color', unit.cssColor);
      slot.innerHTML = `
                <div class="mm-slot-emoji">${unit.emoji}</div>
                <div class="mm-slot-abbr">${unit.abbr}</div>
            `;
      slot.onclick = () => {
        sortState.bank.push(sortState.slots[i]);
        sortState.slots[i] = null;
        sortState.selected = null;
        renderSortUI();
      };
    } else {
      slot.onclick = () => {
        if (sortState.selected !== null) {
          sortState.slots[i] = sortState.selected;
          sortState.bank = sortState.bank.filter(id => id !== sortState.selected);
          sortState.selected = null;
          renderSortUI();
        }
      };
    }

    slotsDiv.appendChild(slot);
  }

  const bankDiv = document.getElementById('sort-bank');
  bankDiv.innerHTML = '';
  sortState.bank.forEach(uid => {
    const unit = UNITS.find(u => u.id === uid);
    const card = document.createElement('div');
    card.className = 'mm-bank-card';
    if (sortState.selected === uid) {
      card.classList.add('selected');
    }
    card.style.setProperty('--unit-color', unit.cssColor);
    card.innerHTML = `${unit.emoji} ${unit.abbr}`;
    card.onclick = () => {
      sortState.selected = sortState.selected === uid ? null : uid;
      renderSortUI();
    };
    bankDiv.appendChild(card);
  });

  const allPlaced = sortState.slots.every(s => s !== null);
  const checkBtn = document.getElementById('check-sort-btn');
  checkBtn.disabled = !allPlaced;
  checkBtn.onclick = () => {
    let correct = 0;
    CORRECT_ORDER.forEach((uid, i) => {
      if (sortState.slots[i] === uid) {
        correct++;
      }
    });
    showSortResult(correct);
  };

  document.getElementById('reset-sort-btn').onclick = showSortScreen;
  document.getElementById('menu-from-sort-btn').onclick = initMenu;
}

function showSortResult(correct) {
  setNavTitle('Sort Result');
  setNavMeta('');

  const medal = getMedal(correct, 8);
  const msg = getMedalMessage(correct, 8);

  let html = `
        <div class="mm-medal">${medal}</div>
        <div class="mm-result-title">${msg}</div>
        <div class="mm-result-score">You got ${correct} out of 8 correct!</div>
        <div class="mm-result-progress">
            <div class="mm-progress-bar">
                <div class="mm-progress-fill" style="width: ${(correct / 8) * 100}%"></div>
            </div>
        </div>
        <div style="font-size: 0.9rem; color: var(--dom-text-muted); margin: 16px 0;">Correct order (smallest → largest):</div>
        <div class="mm-result-items">
    `;

  CORRECT_ORDER.forEach((uid, i) => {
    const unit = UNITS.find(u => u.id === uid);
    const isCorrect = sortState.slots[i] === uid;
    html += `<div class="mm-result-item ${isCorrect ? 'correct' : 'wrong'}" style="--item-color: ${unit.cssColor};">${unit.emoji} ${unit.abbr}</div>`;
  });

  html += `
        </div>
        <div class="mm-result-buttons">
            <button class="mm-result-btn" onclick="showSortScreen()">Try Again</button>
            <button class="mm-result-btn secondary" onclick="startConversions()">Conversions</button>
            <button class="mm-result-btn" style="background: var(--dom-text-muted);" onclick="initMenu()">Menu</button>
        </div>
    `;

  document.getElementById('sort-result-content').innerHTML = html;
  showScreen('screen-sort-result');
}

// ==================== QUIZ ====================
function startQuiz() {
  setNavTitle('Quiz Time!');
  setNavMeta('');

  quizQuestions = shuffle([...ALL_QUIZ_QUESTIONS]).slice(0, 10);
  quizIndex = 0;
  quizScore = 0;
  quizLocked = false;

  showQuizQuestion();
}

function showQuizQuestion() {
  if (quizIndex >= quizQuestions.length) {
    showQuizResult();
    return;
  }

  quizLocked = false;
  const q = quizQuestions[quizIndex];
  const pct = quizIndex / quizQuestions.length;

  document.getElementById('quiz-progress').style.width = `${pct * 100}%`;
  document.getElementById('quiz-score').textContent = `⭐ ${quizScore}`;
  document.getElementById('quiz-counter').textContent = `${quizIndex + 1} / 10`;
  document.getElementById('quiz-emoji').textContent = q.emoji;
  document.getElementById('quiz-question').textContent =
    `Which unit would you use to measure...?\n${q.name}`;
  document.getElementById('quiz-formula').textContent = '';

  const choices = shuffle(
    [
      q.unit,
      ...UNITS.filter(u => u.id !== q.unit)
        .slice(0, 3)
        .map(u => u.id)
    ].slice(0, 4)
  );

  const choicesDiv = document.getElementById('quiz-choices');
  choicesDiv.innerHTML = '';
  choices.forEach((uid, idx) => {
    const unit = UNITS.find(u => u.id === uid);
    const btn = document.createElement('button');
    btn.className = 'mm-choice-btn';
    btn.style.setProperty('--btn-color', unit.cssColor);
    btn.textContent = unit.name;
    btn.onclick = () => handleQuizAnswer(uid, q, btn);
    choicesDiv.appendChild(btn);
  });

  const hintBtn = document.getElementById('quiz-hint-btn');
  hintBtn.textContent = '💡 Show Hint';
  document.getElementById('quiz-hint').style.display = 'none';
  hintBtn.onclick = () => {
    if (document.getElementById('quiz-hint').style.display === 'none') {
      document.getElementById('quiz-hint').textContent = q.hint;
      document.getElementById('quiz-hint').style.display = 'block';
      hintBtn.textContent = '💡 Hide Hint';
    } else {
      document.getElementById('quiz-hint').style.display = 'none';
      hintBtn.textContent = '💡 Show Hint';
    }
  };

  showScreen('screen-quiz');
}

function handleQuizAnswer(chosen, q, btn) {
  if (quizLocked) {
    return;
  }
  quizLocked = true;

  const correct = chosen === q.unit;
  if (correct) {
    quizScore++;
  }

  btn.classList.add(correct ? 'correct' : 'wrong');
  document.getElementById('quiz-score').textContent = `⭐ ${quizScore}`;

  document.querySelectorAll('.mm-choice-btn').forEach(b => (b.disabled = true));

  autoAdvanceTimer = setTimeout(() => {
    quizIndex++;
    showQuizQuestion();
  }, 1500);
}

function showQuizResult() {
  setNavTitle('Quiz Result');
  setNavMeta('');

  const medal = getMedal(quizScore, 10);
  const msg = getMedalMessage(quizScore, 10);

  const html = `
        <div class="mm-medal">${medal}</div>
        <div class="mm-result-title">${msg}</div>
        <div class="mm-result-score">You scored ${quizScore} out of 10!</div>
        <div class="mm-result-progress">
            <div class="mm-progress-bar">
                <div class="mm-progress-fill" style="width: ${(quizScore / 10) * 100}%"></div>
            </div>
        </div>
        <div class="mm-result-buttons">
            <button class="mm-result-btn" onclick="startQuiz()">Try Again</button>
            <button class="mm-result-btn secondary" onclick="startConversions()">Conversions</button>
            <button class="mm-result-btn" style="background: var(--dom-text-muted);" onclick="initMenu()">Menu</button>
        </div>
    `;

  document.getElementById('quiz-result-content').innerHTML = html;
  showScreen('screen-quiz-result');
}

// ==================== CONVERSIONS ====================
function startConversions() {
  setNavTitle('Conversions');
  setNavMeta('');

  convQuestions = shuffle([...ALL_CONVERSIONS]).slice(0, 10);
  convIndex = 0;
  convScore = 0;
  convLocked = false;

  showConvQuestion();
}

function showConvQuestion() {
  if (convIndex >= convQuestions.length) {
    showConvResult();
    return;
  }

  convLocked = false;
  const q = convQuestions[convIndex];
  const pct = convIndex / convQuestions.length;

  document.getElementById('conv-progress').style.width = `${pct * 100}%`;
  document.getElementById('conv-score').textContent = `⭐ ${convScore}`;
  document.getElementById('conv-counter').textContent = `${convIndex + 1} / 10`;
  document.getElementById('conv-emoji').textContent = q.emoji;
  document.getElementById('conv-question').textContent = q.q;
  document.getElementById('conv-formula').textContent = '';

  const choices = shuffle([q.answer, ...q.wrong]);

  const choicesDiv = document.getElementById('conv-choices');
  choicesDiv.innerHTML = '';
  choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'mm-choice-btn';
    btn.textContent = String(choice);
    btn.onclick = () => handleConvAnswer(choice, q, btn);
    choicesDiv.appendChild(btn);
  });

  const hintBtn = document.getElementById('conv-hint-btn');
  hintBtn.textContent = '💡 Show Hint';
  document.getElementById('conv-hint').style.display = 'none';
  hintBtn.onclick = () => {
    if (document.getElementById('conv-hint').style.display === 'none') {
      document.getElementById('conv-hint').textContent = q.formula;
      document.getElementById('conv-hint').style.display = 'block';
      hintBtn.textContent = '💡 Hide Hint';
    } else {
      document.getElementById('conv-hint').style.display = 'none';
      hintBtn.textContent = '💡 Show Hint';
    }
  };

  showScreen('screen-conversions');
}

function handleConvAnswer(chosen, q, btn) {
  if (convLocked) {
    return;
  }
  convLocked = true;

  const correct = chosen === q.answer;
  if (correct) {
    convScore++;
  }

  btn.classList.add(correct ? 'correct' : 'wrong');
  document.getElementById('conv-formula').textContent = q.formula;
  document.getElementById('conv-score').textContent = `⭐ ${convScore}`;

  document.querySelectorAll('.mm-choice-btn').forEach(b => (b.disabled = true));

  autoAdvanceTimer = setTimeout(() => {
    convIndex++;
    showConvQuestion();
  }, 1500);
}

function showConvResult() {
  setNavTitle('Conversions Result');
  setNavMeta('');

  const medal = getMedal(convScore, 10);
  const msg = getMedalMessage(convScore, 10);
  const cat = convQuestions.length > 0 ? convQuestions[0].cat : 'metric';

  let html = `
        <div class="mm-medal">${medal}</div>
        <div class="mm-result-title">${msg}</div>
        <div class="mm-result-score">You scored ${convScore} out of 10!</div>
        <div class="mm-result-progress">
            <div class="mm-progress-bar">
                <div class="mm-progress-fill" style="width: ${(convScore / 10) * 100}%"></div>
            </div>
        </div>
        <div class="mm-conv-ref-card">
            <div class="mm-conv-ref-title">Key Conversions</div>
    `;

  CONV_CHARTS[cat].forEach(item => {
    html += `<div class="mm-conv-ref-item">${item}</div>`;
  });

  html += `
        </div>
        <div class="mm-result-buttons">
            <button class="mm-result-btn" onclick="startConversions()">Try Again</button>
            <button class="mm-result-btn secondary" onclick="startScenarios()">Scenarios</button>
            <button class="mm-result-btn" style="background: var(--dom-text-muted);" onclick="initMenu()">Menu</button>
        </div>
    `;

  document.getElementById('conv-result-content').innerHTML = html;
  showScreen('screen-conv-result');
}

// ==================== SCENARIOS ====================
function startScenarios() {
  setNavTitle('Real Scenarios');
  setNavMeta('');

  scenQuestions = shuffle([...ALL_SCENARIOS]).slice(0, 10);
  scenIndex = 0;
  scenScore = 0;
  scenLocked = false;

  showScenQuestion();
}

function showScenQuestion() {
  if (scenIndex >= scenQuestions.length) {
    showScenResult();
    return;
  }

  scenLocked = false;
  const q = scenQuestions[scenIndex];
  const pct = scenIndex / scenQuestions.length;

  document.getElementById('scen-progress').style.width = `${pct * 100}%`;
  document.getElementById('scen-score').textContent = `⭐ ${scenScore}`;
  document.getElementById('scen-counter').textContent = `${scenIndex + 1} / 10`;
  document.getElementById('scen-emoji').textContent = q.emoji;
  document.getElementById('scen-question').textContent = `${q.scene}\n${q.story}`;
  document.getElementById('scen-formula').textContent = '';

  const choices = shuffle([...q.choices]);

  const choicesDiv = document.getElementById('scen-choices');
  choicesDiv.innerHTML = '';
  choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'mm-choice-btn';
    btn.textContent = String(choice);
    btn.onclick = () => handleScenAnswer(choice, q, btn);
    choicesDiv.appendChild(btn);
  });

  const hintBtn = document.getElementById('scen-hint-btn');
  hintBtn.textContent = '💡 Show Hint';
  document.getElementById('scen-hint').style.display = 'none';
  hintBtn.onclick = () => {
    if (document.getElementById('scen-hint').style.display === 'none') {
      document.getElementById('scen-hint').textContent = q.formula;
      document.getElementById('scen-hint').style.display = 'block';
      hintBtn.textContent = '💡 Hide Hint';
    } else {
      document.getElementById('scen-hint').style.display = 'none';
      hintBtn.textContent = '💡 Show Hint';
    }
  };

  showScreen('screen-scenarios');
}

function handleScenAnswer(chosen, q, btn) {
  if (scenLocked) {
    return;
  }
  scenLocked = true;

  const correct = chosen === q.answer;
  if (correct) {
    scenScore++;
  }

  btn.classList.add(correct ? 'correct' : 'wrong');
  document.getElementById('scen-formula').textContent = q.formula;
  document.getElementById('scen-score').textContent = `⭐ ${scenScore}`;

  document.querySelectorAll('.mm-choice-btn').forEach(b => (b.disabled = true));

  autoAdvanceTimer = setTimeout(() => {
    scenIndex++;
    showScenQuestion();
  }, 1500);
}

function showScenResult() {
  setNavTitle('Scenarios Result');
  setNavMeta('');

  const medal = getMedal(scenScore, 10);
  const msg = getMedalMessage(scenScore, 10);

  const html = `
        <div class="mm-medal">${medal}</div>
        <div class="mm-result-title">${msg}</div>
        <div class="mm-result-score">You scored ${scenScore} out of 10!</div>
        <div class="mm-result-progress">
            <div class="mm-progress-bar">
                <div class="mm-progress-fill" style="width: ${(scenScore / 10) * 100}%"></div>
            </div>
        </div>
        <div class="mm-result-buttons">
            <button class="mm-result-btn" onclick="startScenarios()">Try Again</button>
            <button class="mm-result-btn secondary" onclick="startQuiz()">Quiz</button>
            <button class="mm-result-btn" style="background: var(--dom-text-muted);" onclick="initMenu()">Menu</button>
        </div>
    `;

  document.getElementById('scen-result-content').innerHTML = html;
  showScreen('screen-scen-result');
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMenu();
});

// ============================================================
// MEASURE MASTER - game.js
// Learn what each unit of measurement means with real-world
// examples, origin stories, conversions, and real-world puzzles!
// Covers: mm, cm, inch, foot, yard, meter, km, mile
// ============================================================

// ==================== UNIT DATABASE ====================
const UNITS = [
    {
        id: 'mm', name: 'Millimeter', abbr: 'mm',
        color: 0xE74C3C, tagline: 'Tinier than a pencil tip!',
        emoji: '🔬',
        origin: '"Milli" is Latin for thousandth. The millimeter was born in France in 1795 when scientists invented the metric system. Their big idea? Make everything multiply or divide by 10 — no confusing fractions! Today it\'s used by doctors, engineers, and jewelers for super-precise measurements. 🏅',
        items: [
            { emoji: '🐜', name: 'An ant',        detail: '~1–2 mm wide' },
            { emoji: '💧', name: 'A raindrop',    detail: '~2 mm wide' },
            { emoji: '💊', name: 'A tiny pill',   detail: '~3–5 mm thick' },
            { emoji: '🦟', name: 'Mosquito body', detail: '~4 mm long' }
        ]
    },
    {
        id: 'cm', name: 'Centimeter', abbr: 'cm',
        color: 0xE67E22, tagline: 'About as wide as your finger!',
        emoji: '🍇',
        origin: '"Centi" means hundredth in Latin — 100 centimeters make one meter. Also invented in France in 1795, the centimeter replaced a messy system where every country had different units. Now anyone in the world can measure the same way! Used in clothing, cooking, and classrooms every day. 🌍',
        items: [
            { emoji: '🍇', name: 'A grape',     detail: '~2 cm wide' },
            { emoji: '🖍️', name: 'A crayon',    detail: '~10 cm long' },
            { emoji: '🦷', name: 'A tooth',     detail: '~2 cm tall' },
            { emoji: '🔋', name: 'AA battery',  detail: '~5 cm tall' }
        ]
    },
    {
        id: 'in', name: 'Inch', abbr: 'in',
        color: 0xF1C40F, tagline: 'About as wide as your thumb!',
        emoji: '👍',
        origin: 'The inch comes from ancient Rome — they called it "uncia" meaning one-twelfth. For centuries, kings defined it by their thumb width! In 1324, King Edward II of England made it official: "Three barleycorns laid end-to-end = 1 inch." 🌾 Barleycorns! Still used in the US, UK, and for screen sizes worldwide. 📱',
        items: [
            { emoji: '📎', name: 'A paperclip',    detail: '~1 inch long' },
            { emoji: '🪙', name: 'A quarter coin', detail: '~1 inch wide' },
            { emoji: '🍬', name: 'Candy bar',      detail: '~1 inch wide' },
            { emoji: '🖊️', name: 'A pen cap',      detail: '~2 inches long' }
        ]
    },
    {
        id: 'ft', name: 'Foot', abbr: 'ft',
        color: 0x27AE60, tagline: 'Same length as a ruler!',
        emoji: '📏',
        origin: 'This one literally came from a human foot! Ancient Egyptians, Greeks, and Romans all measured by stepping. The problem? Everyone\'s feet are different sizes! King Henry I of England fixed this around 1100 AD — 1 foot = the length of HIS royal foot. 👑 Pilots and weather forecasters still use feet for altitude today!',
        items: [
            { emoji: '📏', name: 'A ruler',    detail: 'Exactly 1 foot' },
            { emoji: '👟', name: 'Your shoe',  detail: '~1 foot long' },
            { emoji: '🎒', name: 'A backpack', detail: '~1.5 feet tall' },
            { emoji: '🐕', name: 'Small dog',  detail: '~1.5 feet tall' }
        ]
    },
    {
        id: 'yd', name: 'Yard', abbr: 'yd',
        color: 0x2980B9, tagline: '3 rulers laid end to end!',
        emoji: '⚾',
        origin: 'King Henry I of England created the yard too — the distance from his royal nose to his outstretched thumb! 👃→👍 The word "yard" comes from Old English "gyrd" meaning rod or stick. Football fields are measured in yards, and fabric at the store is sold by the yard. Tailors have used yards for over 900 years!',
        items: [
            { emoji: '⚾', name: 'Baseball bat', detail: '~1 yard long' },
            { emoji: '🎸', name: 'A guitar',     detail: '~1 yard tall' },
            { emoji: '🚪', name: 'Door width',   detail: '~1 yard wide' },
            { emoji: '🛏️', name: 'Bed width',    detail: '~1 yard wide' }
        ]
    },
    {
        id: 'm', name: 'Meter', abbr: 'm',
        color: 0x8E44AD, tagline: 'About the height of a door!',
        emoji: '🚪',
        origin: 'French scientists in 1795 defined the meter as one ten-millionth of the distance from the North Pole to the equator! ✈️ Today it\'s defined by the speed of light — light travels exactly 299,792,458 meters every second! Olympic swimming pools, track races, and almost every country on Earth use meters. ⚡',
        items: [
            { emoji: '🚪', name: 'Door height', detail: '~2 meters tall' },
            { emoji: '🛁', name: 'A bathtub',   detail: '~1.5 meters long' },
            { emoji: '🧍', name: 'Tall adult',  detail: '~1.8 meters tall' },
            { emoji: '🚗', name: 'Car width',   detail: '~2 meters wide' }
        ]
    },
    {
        id: 'km', name: 'Kilometer', abbr: 'km',
        color: 0x16A085, tagline: '10 football fields in a row!',
        emoji: '🏫',
        origin: '"Kilo" comes from Greek "khilioi" meaning one thousand. The kilometer was invented in France in 1795 — just add "kilo" to mean ×1,000. Brilliant! 🧠 Road signs, marathon races (42 km!), and maps all use kilometers. The whole world except the US uses km for driving distances. 🗺️',
        items: [
            { emoji: '🏫', name: 'Walk to school',   detail: '~1–2 km away' },
            { emoji: '🏃', name: 'A 10-min jog',     detail: '~1 km distance' },
            { emoji: '⚽', name: '10 soccer fields', detail: '~1 km end to end' },
            { emoji: '🛒', name: 'Trip to store',    detail: 'A few km away' }
        ]
    },
    {
        id: 'mi', name: 'Mile', abbr: 'mi',
        color: 0x1ABC9C, tagline: 'A 15–20 minute walk!',
        emoji: '🛣️',
        origin: 'From ancient Rome! Roman soldiers counted 1,000 double-steps (left+right foot = 1 double-step). In Latin, "mille passuum" means "a thousand paces" — that\'s where "mile" comes from! 🪖 A Roman mile was ~4,856 feet. Today\'s mile is 5,280 feet. US roads, running races, and airplane speeds (mph) still use miles. 🏆',
        items: [
            { emoji: '🏃', name: 'School mile run',  detail: 'Standard 1-mile race' },
            { emoji: '🛣️', name: 'Highway markers',  detail: '1 mile apart' },
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
    m:  '100 cm = 1 meter   ·   1,000 meters = 1 km',
    km: '1 km = 1,000 meters   ·   About 1.6 km = 1 mile',
    mi: '1 mile = 5,280 feet   ·   About 1.6 km = 1 mile'
};

// ==================== QUIZ QUESTIONS ====================
const ALL_QUIZ_QUESTIONS = [
    { emoji: '🐜', name: 'An ant',           unit: 'mm', hint: 'An ant is tiny — about 1–2 mm wide!' },
    { emoji: '💧', name: 'A raindrop',       unit: 'mm', hint: 'Raindrops are only about 2 mm wide!' },
    { emoji: '💊', name: 'A tiny pill',      unit: 'mm', hint: 'A small pill is just a few mm thick!' },
    { emoji: '🍇', name: 'A grape',          unit: 'cm', hint: 'A grape is about 2 cm wide!' },
    { emoji: '🖍️', name: 'A crayon',         unit: 'cm', hint: 'A crayon is about 10 cm long!' },
    { emoji: '🦷', name: 'A tooth',          unit: 'cm', hint: 'A tooth is about 2 cm tall!' },
    { emoji: '📎', name: 'A paperclip',      unit: 'in', hint: 'A paperclip is about 1 inch long!' },
    { emoji: '🪙', name: 'A quarter coin',   unit: 'in', hint: 'A quarter is about 1 inch wide!' },
    { emoji: '📏', name: 'A ruler',          unit: 'ft', hint: 'A ruler is exactly 1 foot = 12 inches!' },
    { emoji: '👟', name: 'A shoe',           unit: 'ft', hint: 'A shoe is about 1 foot long!' },
    { emoji: '🎒', name: 'A backpack',       unit: 'ft', hint: 'A backpack is about 1.5 feet tall!' },
    { emoji: '⚾', name: 'A baseball bat',   unit: 'yd', hint: 'A baseball bat is about 1 yard long!' },
    { emoji: '🎸', name: 'A guitar',         unit: 'yd', hint: 'A guitar is about 1 yard tall!' },
    { emoji: '🚪', name: 'Door height',      unit: 'm',  hint: 'A door is about 2 meters tall!' },
    { emoji: '🛁', name: 'A bathtub',        unit: 'm',  hint: 'A bathtub is about 1.5 meters long!' },
    { emoji: '🚗', name: 'Car width',        unit: 'm',  hint: 'A car is about 2 meters wide!' },
    { emoji: '🏫', name: 'Walk to school',   unit: 'km', hint: 'School is usually 1–2 km away!' },
    { emoji: '⚽', name: '10 soccer fields', unit: 'km', hint: '10 fields end to end = about 1 km!' },
    { emoji: '🏃', name: 'School mile run',  unit: 'mi', hint: 'The mile run is exactly 1 mile!' },
    { emoji: '🛣️', name: 'Highway markers',  unit: 'mi', hint: 'Highway mile markers are 1 mile apart!' }
];

// ==================== CONVERSION QUESTIONS ====================
// cat: 'imperial' = inches/feet/yards | 'metric' = mm/cm/m/km
const ALL_CONVERSIONS = [
    // ── Inches ↔ Feet ────────────────────────────────────────
    { q: '1 foot = ? inches',  answer: 12,   wrong: [10, 11, 24],    formula: '1 foot = 12 inches',         emoji: '📏', cat: 'imperial' },
    { q: '2 feet = ? inches',  answer: 24,   wrong: [12, 20, 36],    formula: '2 × 12 = 24',                emoji: '📏', cat: 'imperial' },
    { q: '3 feet = ? inches',  answer: 36,   wrong: [24, 30, 48],    formula: '3 × 12 = 36',                emoji: '📏', cat: 'imperial' },
    { q: '4 feet = ? inches',  answer: 48,   wrong: [36, 40, 60],    formula: '4 × 12 = 48',                emoji: '📏', cat: 'imperial' },
    { q: '5 feet = ? inches',  answer: 60,   wrong: [48, 55, 72],    formula: '5 × 12 = 60',                emoji: '📏', cat: 'imperial' },
    { q: '12 inches = ? feet', answer: 1,    wrong: [2, 3, 12],      formula: '12 ÷ 12 = 1',                emoji: '📏', cat: 'imperial' },
    { q: '24 inches = ? feet', answer: 2,    wrong: [1, 3, 6],       formula: '24 ÷ 12 = 2',                emoji: '📏', cat: 'imperial' },
    { q: '36 inches = ? feet', answer: 3,    wrong: [2, 4, 12],      formula: '36 ÷ 12 = 3',                emoji: '📏', cat: 'imperial' },
    { q: '48 inches = ? feet', answer: 4,    wrong: [3, 5, 6],       formula: '48 ÷ 12 = 4',                emoji: '📏', cat: 'imperial' },
    { q: '60 inches = ? feet', answer: 5,    wrong: [4, 6, 12],      formula: '60 ÷ 12 = 5',                emoji: '📏', cat: 'imperial' },
    // ── Feet ↔ Yards ─────────────────────────────────────────
    { q: '1 yard = ? feet',    answer: 3,    wrong: [1, 2, 12],      formula: '1 yard = 3 feet',            emoji: '⚾', cat: 'imperial' },
    { q: '2 yards = ? feet',   answer: 6,    wrong: [2, 4, 9],       formula: '2 × 3 = 6',                  emoji: '⚾', cat: 'imperial' },
    { q: '3 yards = ? feet',   answer: 9,    wrong: [6, 8, 12],      formula: '3 × 3 = 9',                  emoji: '⚾', cat: 'imperial' },
    { q: '4 yards = ? feet',   answer: 12,   wrong: [9, 10, 16],     formula: '4 × 3 = 12',                 emoji: '⚾', cat: 'imperial' },
    { q: '5 yards = ? feet',   answer: 15,   wrong: [10, 12, 18],    formula: '5 × 3 = 15',                 emoji: '⚾', cat: 'imperial' },
    { q: '3 feet = ? yards',   answer: 1,    wrong: [2, 3, 6],       formula: '3 ÷ 3 = 1',                  emoji: '⚾', cat: 'imperial' },
    { q: '6 feet = ? yards',   answer: 2,    wrong: [1, 3, 4],       formula: '6 ÷ 3 = 2',                  emoji: '⚾', cat: 'imperial' },
    { q: '9 feet = ? yards',   answer: 3,    wrong: [2, 4, 6],       formula: '9 ÷ 3 = 3',                  emoji: '⚾', cat: 'imperial' },
    { q: '12 feet = ? yards',  answer: 4,    wrong: [3, 5, 6],       formula: '12 ÷ 3 = 4',                 emoji: '⚾', cat: 'imperial' },
    // ── mm ↔ cm ───────────────────────────────────────────────
    { q: '10 mm = ? cm',       answer: 1,    wrong: [5, 2, 10],      formula: '10 mm = 1 cm',               emoji: '🔬', cat: 'metric' },
    { q: '20 mm = ? cm',       answer: 2,    wrong: [1, 5, 10],      formula: '20 ÷ 10 = 2',                emoji: '🔬', cat: 'metric' },
    { q: '50 mm = ? cm',       answer: 5,    wrong: [2, 10, 25],     formula: '50 ÷ 10 = 5',                emoji: '🔬', cat: 'metric' },
    { q: '70 mm = ? cm',       answer: 7,    wrong: [5, 10, 70],     formula: '70 ÷ 10 = 7',                emoji: '🔬', cat: 'metric' },
    { q: '1 cm = ? mm',        answer: 10,   wrong: [1, 5, 100],     formula: '1 cm = 10 mm',               emoji: '🔬', cat: 'metric' },
    { q: '3 cm = ? mm',        answer: 30,   wrong: [3, 13, 100],    formula: '3 × 10 = 30',                emoji: '🔬', cat: 'metric' },
    { q: '5 cm = ? mm',        answer: 50,   wrong: [5, 15, 500],    formula: '5 × 10 = 50',                emoji: '🔬', cat: 'metric' },
    { q: '8 cm = ? mm',        answer: 80,   wrong: [8, 18, 800],    formula: '8 × 10 = 80',                emoji: '🔬', cat: 'metric' },
    // ── cm ↔ m ────────────────────────────────────────────────
    { q: '100 cm = ? m',       answer: 1,    wrong: [10, 100, 1000], formula: '100 cm = 1 m',               emoji: '🚪', cat: 'metric' },
    { q: '200 cm = ? m',       answer: 2,    wrong: [1, 20, 100],    formula: '200 ÷ 100 = 2',              emoji: '🚪', cat: 'metric' },
    { q: '300 cm = ? m',       answer: 3,    wrong: [2, 30, 100],    formula: '300 ÷ 100 = 3',              emoji: '🚪', cat: 'metric' },
    { q: '500 cm = ? m',       answer: 5,    wrong: [4, 50, 100],    formula: '500 ÷ 100 = 5',              emoji: '🚪', cat: 'metric' },
    { q: '1 m = ? cm',         answer: 100,  wrong: [10, 50, 1000],  formula: '1 m = 100 cm',               emoji: '🚪', cat: 'metric' },
    { q: '2 m = ? cm',         answer: 200,  wrong: [20, 100, 2000], formula: '2 × 100 = 200',              emoji: '🚪', cat: 'metric' },
    { q: '3 m = ? cm',         answer: 300,  wrong: [30, 200, 3000], formula: '3 × 100 = 300',              emoji: '🚪', cat: 'metric' },
    { q: '4 m = ? cm',         answer: 400,  wrong: [40, 300, 4000], formula: '4 × 100 = 400',              emoji: '🚪', cat: 'metric' },
    // ── m ↔ km ────────────────────────────────────────────────
    { q: '1000 m = ? km',      answer: 1,    wrong: [10, 100, 1000], formula: '1000 m = 1 km',              emoji: '🏫', cat: 'metric' },
    { q: '2000 m = ? km',      answer: 2,    wrong: [1, 20, 200],    formula: '2000 ÷ 1000 = 2',            emoji: '🏫', cat: 'metric' },
    { q: '3000 m = ? km',      answer: 3,    wrong: [2, 30, 300],    formula: '3000 ÷ 1000 = 3',            emoji: '🏫', cat: 'metric' },
    { q: '5000 m = ? km',      answer: 5,    wrong: [4, 50, 500],    formula: '5000 ÷ 1000 = 5',            emoji: '🏫', cat: 'metric' },
    { q: '1 km = ? m',         answer: 1000, wrong: [10, 100, 500],  formula: '1 km = 1000 m',              emoji: '🏫', cat: 'metric' },
    { q: '2 km = ? m',         answer: 2000, wrong: [200, 1000, 20000], formula: '2 × 1000 = 2000',         emoji: '🏫', cat: 'metric' },
    { q: '3 km = ? m',         answer: 3000, wrong: [300, 2000, 30000], formula: '3 × 1000 = 3000',         emoji: '🏫', cat: 'metric' },
    { q: '4 km = ? m',         answer: 4000, wrong: [400, 3000, 40000], formula: '4 × 1000 = 4000',         emoji: '🏫', cat: 'metric' }
];

// Conversion memory charts by category
const CONV_CHARTS = {
    imperial: ['12 inches = 1 foot', '3 feet = 1 yard', '36 inches = 1 yard'],
    metric:   ['10 mm = 1 cm', '100 cm = 1 m', '1000 m = 1 km']
};

// ==================== REAL-WORLD SCENARIOS ====================
const ALL_SCENARIOS = [
    {
        scene: '📐 Art Class',
        story: 'You need 2 feet of string for\nan art project. Your ruler shows\nonly inches. How many inches do you need?',
        answer: 24, choices: [12, 18, 24, 36],
        formula: '2 feet × 12 = 24 inches', emoji: '✂️'
    },
    {
        scene: '⚾ Baseball Practice',
        story: 'A baseball bat is about 1 yard long.\nHow many feet is that?',
        answer: 3, choices: [1, 2, 3, 12],
        formula: '1 yard = 3 feet', emoji: '⚾'
    },
    {
        scene: '🏈 Football Field',
        story: 'A football field is 100 yards long.\nHow many feet is that?',
        answer: 300, choices: [100, 200, 300, 400],
        formula: '100 yards × 3 = 300 feet', emoji: '🏈'
    },
    {
        scene: '🚪 New Door',
        story: 'A door is 7 feet tall.\nHow many inches tall is that?',
        answer: 84, choices: [70, 78, 84, 96],
        formula: '7 feet × 12 = 84 inches', emoji: '🚪'
    },
    {
        scene: '🎯 Archery Class',
        story: 'The target is 9 feet away.\nHow many yards away is that?',
        answer: 3, choices: [1, 2, 3, 4],
        formula: '9 feet ÷ 3 = 3 yards', emoji: '🎯'
    },
    {
        scene: '🏫 Walk to School',
        story: 'Your school is 2 km from home.\nHow many meters away is it?',
        answer: 2000, choices: [200, 2000, 20, 20000],
        formula: '2 km × 1000 = 2000 meters', emoji: '🏫'
    },
    {
        scene: '🏊 Swimming Pool',
        story: 'An Olympic pool is 50 meters long.\nHow many centimeters is that?',
        answer: 5000, choices: [500, 5000, 50, 50000],
        formula: '50 m × 100 = 5000 cm', emoji: '🏊'
    },
    {
        scene: '🛣️ Road Trip',
        story: 'A sign says the next town is 5 km away.\nHow many meters is that?',
        answer: 5000, choices: [500, 5000, 50000, 50],
        formula: '5 km × 1000 = 5000 meters', emoji: '🛣️'
    },
    {
        scene: '🌧️ Rainy Day',
        story: 'Yesterday it rained 30 mm.\nHow many centimeters of rain fell?',
        answer: 3, choices: [1, 3, 30, 300],
        formula: '30 mm ÷ 10 = 3 cm', emoji: '🌧️'
    },
    {
        scene: '🥾 Hiking Trail',
        story: 'The trail is 3,000 meters long.\nHow many kilometers is that?',
        answer: 3, choices: [3, 30, 300, 3000],
        formula: '3000 m ÷ 1000 = 3 km', emoji: '🥾'
    },
    {
        scene: '🎸 Music Class',
        story: 'A guitar is about 1 yard long.\nHow many inches is that?',
        answer: 36, choices: [12, 24, 36, 48],
        formula: '1 yard = 3 feet, 3 × 12 = 36 inches', emoji: '🎸'
    },
    {
        scene: '🛁 Bath Time',
        story: 'A bathtub is about 150 cm long.\nHow many millimeters is that?',
        answer: 1500, choices: [15, 150, 1500, 15000],
        formula: '150 cm × 10 = 1500 mm', emoji: '🛁'
    },
    {
        scene: '🏃 Track Day',
        story: 'You ran 4 km on the track today.\nHow many meters did you run?',
        answer: 4000, choices: [400, 4000, 40, 40000],
        formula: '4 km × 1000 = 4000 meters', emoji: '🏃'
    },
    {
        scene: '🖍️ Art Supply',
        story: 'A crayon is about 10 cm long.\nHow many millimeters is that?',
        answer: 100, choices: [10, 100, 1000, 1],
        formula: '10 cm × 10 = 100 mm', emoji: '🖍️'
    },
    {
        scene: '🚗 Car in the Garage',
        story: 'A car is about 4 meters long.\nHow many centimeters is that?',
        answer: 400, choices: [40, 400, 4000, 4],
        formula: '4 m × 100 = 400 cm', emoji: '🚗'
    },
    {
        scene: '🏠 Building a Bookshelf',
        story: 'You need 5 feet of wood for a shelf.\nHow many inches of wood do you need?',
        answer: 60, choices: [5, 50, 60, 72],
        formula: '5 feet × 12 = 60 inches', emoji: '📚'
    },
    {
        scene: '🎪 County Fair',
        story: 'The fair is 3 miles away.\nA mile is 5,280 feet. How many feet away is the fair? (Hint: 3 × 5 = 15, add three zeros!)',
        answer: 15840, choices: [5280, 10560, 15840, 21120],
        formula: '3 × 5,280 = 15,840 feet', emoji: '🎡'
    }
];

// ==================== GAME SETUP ====================
const GameState = {
    MENU:        'menu',
    EXPLORE:     'explore',
    HISTORY:     'history',
    QUIZ:        'quiz',
    QUIZ_RESULT: 'quiz_result',
    CONVERSIONS: 'conversions',
    CONV_RESULT: 'conv_result',
    SCENARIOS:   'scenarios',
    SCEN_RESULT: 'scen_result'
};

let currentState     = GameState.MENU;
let gameObjects      = [];
let currentUnitIndex = 0;

// Quiz state
let quizQuestions  = [];
let quizIndex      = 0;
let quizScore      = 0;
let answerLocked   = false;

// Conversion state
let convQuestions  = [];
let convIndex      = 0;
let convScore      = 0;
let convLocked     = false;

// Scenario state
let scenQuestions  = [];
let scenIndex      = 0;
let scenScore      = 0;
let scenLocked     = false;

let sceneRef = null;

const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: 0xF6F4D2,
    scene: { preload, create, update }
});

const game = new Phaser.Game(config);

function preload() {}
function create()  { sceneRef = this; showMenu(); }
function update()  {}

// ==================== SCREEN HELPERS ====================

function clearScreen() {
    gameObjects.forEach(o => { if (o && o.destroy) o.destroy(); });
    gameObjects = [];
}

function track(obj) {
    gameObjects.push(obj);
    return obj;
}

function lighten(hex, amt = 30) {
    const r = Math.min(255, ((hex >> 16) & 0xFF) + amt);
    const g = Math.min(255, ((hex >>  8) & 0xFF) + amt);
    const b = Math.min(255, ( hex        & 0xFF) + amt);
    return (r << 16) | (g << 8) | b;
}

function toCss(hex) {
    return '#' + hex.toString(16).padStart(6, '0');
}

function makeBtn(x, y, w, h, color, label, fontSize, onClick) {
    const s = sceneRef;
    const g = track(s.add.graphics());
    const drawBg = (c) => {
        g.clear();
        g.fillStyle(c, 1);
        g.fillRoundedRect(x - w/2, y - h/2, w, h, 10);
    };
    drawBg(color);

    const t = track(s.add.text(x, y, label, {
        fontSize, fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#FFFFFF', align: 'center'
    }).setOrigin(0.5));

    const zone = track(s.add.zone(x, y, w, h).setInteractive({ cursor: 'pointer' }));
    zone.on('pointerdown', onClick);
    zone.on('pointerover',  () => drawBg(lighten(color)));
    zone.on('pointerout',   () => drawBg(color));
    return { g, t, zone };
}

// ==================== MENU SCREEN ====================

function showMenu() {
    clearScreen();
    currentState = GameState.MENU;
    const s = sceneRef;
    const W = 900, H = 650;

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF6F4D2, 1);
    bg.fillRect(0, 0, W, H);

    // Decorative unit pills along the top
    const unitData = UNITS.map(u => ({ abbr: u.abbr, color: u.color }));
    const pillW = Math.floor((W - 40) / unitData.length);
    unitData.forEach((u, i) => {
        const px = 20 + i * pillW + pillW / 2;
        const pg = track(s.add.graphics());
        pg.fillStyle(u.color, 0.18);
        pg.fillRoundedRect(px - 36, 10, 72, 26, 13);
        track(s.add.text(px, 23, u.abbr, {
            fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold',
            color: toCss(u.color)
        }).setOrigin(0.5));
    });

    // Title
    track(s.add.text(W/2, 76, '📏 Measure Master', {
        fontSize: '44px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#2D3436'
    }).setOrigin(0.5));

    track(s.add.text(W/2, 118, 'Learn what each unit of measurement really means!', {
        fontSize: '17px', fontFamily: 'Arial, sans-serif', color: '#636E72'
    }).setOrigin(0.5));

    const div = track(s.add.graphics());
    div.lineStyle(1, 0xD4E09B, 1);
    div.lineBetween(150, 138, 750, 138);

    // 6 mode cards — 3 columns × 2 rows
    const cardW = 268, cardH = 188;
    const leftMargin = 18, colGap = 14;
    const row1Top = 148, rowGap = 14;

    // colCenters[0..2]
    const colCenters = [
        leftMargin + cardW / 2,                            // 152
        leftMargin + cardW + colGap + cardW / 2,           // 152+268+14=434
        leftMargin + 2 * (cardW + colGap) + cardW / 2     // 716
    ];

    const modes = [
        {
            col: 0, row: 0, color: 0xA44A3F,
            emoji: '🔍', title: 'Explore Units',
            sub: 'See what each unit\nlooks like in real life',
            action: () => { currentUnitIndex = 0; showExplore(); }
        },
        {
            col: 1, row: 0, color: 0x8E44AD,
            emoji: '📖', title: 'Origin Stories',
            sub: 'How each unit was\ninvented & why it exists',
            action: () => { currentUnitIndex = 0; showHistory(); }
        },
        {
            col: 2, row: 0, color: 0x2980B9,
            emoji: '📊', title: 'Sort Challenge',
            sub: 'Order units from\nsmallest to largest',
            action: () => showSort()
        },
        {
            col: 0, row: 1, color: 0x16A085,
            emoji: '🔄', title: 'Conversions',
            sub: 'Inches to feet, cm to m,\nand more — with formula hints!',
            action: () => startConversions()
        },
        {
            col: 1, row: 1, color: 0xA44A3F,
            emoji: '❓', title: 'Quiz Time!',
            sub: 'Pick the right unit for\neach real-world thing',
            action: () => startQuiz()
        },
        {
            col: 2, row: 1, color: 0xE67E22,
            emoji: '🌍', title: 'Real Scenarios',
            sub: 'Solve measurement\npuzzles from everyday life!',
            action: () => startScenarios()
        }
    ];

    modes.forEach(m => {
        const cx      = colCenters[m.col];
        const cardTop = row1Top + m.row * (cardH + rowGap);
        const cy      = cardTop + cardH / 2;

        // Shadow
        const sh = track(s.add.graphics());
        sh.fillStyle(0x000000, 0.07);
        sh.fillRoundedRect(cx - cardW/2 + 4, cardTop + 4, cardW, cardH, 13);

        // Card body
        const card = track(s.add.graphics());
        const drawCard = (c) => {
            card.clear();
            card.fillStyle(c, 1);
            card.fillRoundedRect(cx - cardW/2, cardTop, cardW, cardH, 13);
        };
        drawCard(m.color);

        track(s.add.text(cx, cardTop + 40, m.emoji, { fontSize: '36px' }).setOrigin(0.5));
        track(s.add.text(cx, cardTop + 84, m.title, {
            fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
        }).setOrigin(0.5));
        track(s.add.text(cx, cardTop + 122, m.sub, {
            fontSize: '12px', fontFamily: 'Arial', color: 'rgba(255,255,255,0.88)',
            align: 'center'
        }).setOrigin(0.5));

        // Play button strip
        const pb = track(s.add.graphics());
        pb.fillStyle(0xFFFFFF, 0.2);
        pb.fillRoundedRect(cx - 52, cardTop + 158, 104, 24, 8);
        track(s.add.text(cx, cardTop + 170, 'Play →', {
            fontSize: '13px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
        }).setOrigin(0.5));

        const zone = track(s.add.zone(cx, cy, cardW, cardH).setInteractive({ cursor: 'pointer' }));
        zone.on('pointerdown', m.action);
        zone.on('pointerover',  () => drawCard(lighten(m.color, 18)));
        zone.on('pointerout',   () => drawCard(m.color));
    });

    // Footer
    track(s.add.text(W/2, 630, 'mm · cm · inches · feet · yards · meters · km · miles', {
        fontSize: '12px', fontFamily: 'Arial', color: '#B2BEC3'
    }).setOrigin(0.5));
}

// ==================== EXPLORE SCREEN ====================

function showExplore() {
    clearScreen();
    currentState = GameState.EXPLORE;
    const s = sceneRef;
    const W = 900, H = 650;
    const unit = UNITS[currentUnitIndex];

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF8F9FF, 1);
    bg.fillRect(0, 0, W, H);

    // Coloured top bar
    const bar = track(s.add.graphics());
    bar.fillStyle(unit.color, 1);
    bar.fillRect(0, 0, W, 76);

    track(s.add.text(24, 38, '← Menu', {
        fontSize: '17px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0, 0.5).setInteractive({ cursor: 'pointer' })
     .on('pointerdown', () => showMenu()));

    track(s.add.text(W - 20, 38, `${currentUnitIndex + 1} / ${UNITS.length}`, {
        fontSize: '15px', fontFamily: 'Arial', color: 'rgba(255,255,255,0.8)'
    }).setOrigin(1, 0.5));

    track(s.add.text(W/2, 38, `${unit.emoji}  ${unit.name}  (${unit.abbr})`, {
        fontSize: '28px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0.5));

    // Info card
    const card = track(s.add.graphics());
    card.fillStyle(0xFFFFFF, 1);
    card.fillRoundedRect(50, 84, W - 100, 120, 12);
    card.lineStyle(2, unit.color, 0.25);
    card.strokeRoundedRect(50, 84, W - 100, 120, 12);

    track(s.add.text(148, 144, unit.abbr, {
        fontSize: '58px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: toCss(unit.color)
    }).setOrigin(0.5));

    const divG = track(s.add.graphics());
    divG.lineStyle(1, unit.color, 0.2);
    divG.lineBetween(220, 96, 220, 192);

    track(s.add.text(560, 118, unit.tagline, {
        fontSize: '22px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#2D3436'
    }).setOrigin(0.5));

    track(s.add.text(560, 162, SIZE_CONTEXT[unit.id], {
        fontSize: '14px', fontFamily: 'Arial', color: '#636E72',
        align: 'center', wordWrap: { width: 580 }
    }).setOrigin(0.5));

    // Section label
    track(s.add.text(W/2, 220, '🧭  Real-world examples:', {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold italic',
        color: '#636E72'
    }).setOrigin(0.5));

    // 2×2 item grid
    const iW = 424, iH = 158;
    const gapX = 18, gapY = 12;
    const marginX = (W - 2 * iW - gapX) / 2;
    const gridStartY = 236;

    unit.items.forEach((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cx = marginX + col * (iW + gapX) + iW / 2;
        const cy = gridStartY + row * (iH + gapY);

        const ic = track(s.add.graphics());
        ic.fillStyle(unit.color, 0.10);
        ic.fillRoundedRect(cx - iW/2, cy, iW, iH, 14);
        ic.lineStyle(2, unit.color, 0.35);
        ic.strokeRoundedRect(cx - iW/2, cy, iW, iH, 14);

        track(s.add.text(cx - iW/2 + 68, cy + iH/2, item.emoji, {
            fontSize: '62px'
        }).setOrigin(0.5));

        const vd = track(s.add.graphics());
        vd.lineStyle(1, unit.color, 0.2);
        vd.lineBetween(cx - iW/2 + 126, cy + 16, cx - iW/2 + 126, cy + iH - 16);

        track(s.add.text(cx + 40, cy + 52, item.name, {
            fontSize: '22px', fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold', color: '#2D3436',
            wordWrap: { width: iW - 148 }
        }).setOrigin(0.5));

        track(s.add.text(cx + 40, cy + 106, item.detail, {
            fontSize: '20px', fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold', color: toCss(unit.color),
            wordWrap: { width: iW - 148 }
        }).setOrigin(0.5));
    });

    // Side arrows
    const gridMidY = gridStartY + iH + gapY / 2;
    const arrowStyle = { fontSize: '32px', color: toCss(unit.color) };

    if (currentUnitIndex > 0) {
        track(s.add.text(16, gridMidY, '◀', arrowStyle)
            .setOrigin(0.5).setInteractive({ cursor: 'pointer' })
            .on('pointerdown', () => { currentUnitIndex--; showExplore(); }));
    }
    if (currentUnitIndex < UNITS.length - 1) {
        track(s.add.text(W - 16, gridMidY, '▶', arrowStyle)
            .setOrigin(0.5).setInteractive({ cursor: 'pointer' })
            .on('pointerdown', () => { currentUnitIndex++; showExplore(); }));
    }

    // Bottom nav
    const navY = 614;
    const isFirst = currentUnitIndex === 0;
    const isLast  = currentUnitIndex === UNITS.length - 1;

    if (!isFirst) {
        makeBtn(W/2 - 290, navY, 160, 44, 0x636E72, '◀  Prev', '16px',
            () => { currentUnitIndex--; showExplore(); });
    }
    makeBtn(W/2 - 100, navY, 170, 44, 0x8E44AD, '📖  History', '16px',
        () => showHistory());
    makeBtn(W/2 + 90,  navY, 170, 44, 0xA44A3F, '❓  Quiz!', '16px',
        () => startQuiz());
    if (!isLast) {
        makeBtn(W/2 + 290, navY, 160, 44, unit.color, 'Next  ▶', '16px',
            () => { currentUnitIndex++; showExplore(); });
    } else {
        makeBtn(W/2 + 290, navY, 160, 44, 0xA44A3F, '✅  Done!', '16px',
            () => startQuiz());
    }
}

// ==================== ORIGIN STORIES / HISTORY ====================

function showHistory() {
    clearScreen();
    currentState = GameState.HISTORY;
    const s = sceneRef;
    const W = 900, H = 650;
    const unit = UNITS[currentUnitIndex];

    const bg = track(s.add.graphics());
    bg.fillStyle(0xFAF7FF, 1);
    bg.fillRect(0, 0, W, H);

    // Top bar
    const bar = track(s.add.graphics());
    bar.fillStyle(unit.color, 1);
    bar.fillRect(0, 0, W, 72);

    track(s.add.text(24, 36, '← Menu', {
        fontSize: '17px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0, 0.5).setInteractive({ cursor: 'pointer' })
     .on('pointerdown', () => showMenu()));

    track(s.add.text(W - 20, 36, `${currentUnitIndex + 1} / ${UNITS.length}`, {
        fontSize: '15px', fontFamily: 'Arial', color: 'rgba(255,255,255,0.8)'
    }).setOrigin(1, 0.5));

    track(s.add.text(W/2, 36, `📖  Origin Stories`, {
        fontSize: '24px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0.5));

    // Big emoji + unit name
    track(s.add.text(W/2, 134, unit.emoji, { fontSize: '72px' }).setOrigin(0.5));

    track(s.add.text(W/2, 205, `${unit.name}  (${unit.abbr})`, {
        fontSize: '30px', fontFamily: 'Arial', fontStyle: 'bold',
        color: toCss(unit.color)
    }).setOrigin(0.5));

    track(s.add.text(W/2, 238, unit.tagline, {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'italic', color: '#888'
    }).setOrigin(0.5));

    // Divider
    const dg = track(s.add.graphics());
    dg.lineStyle(2, unit.color, 0.25);
    dg.lineBetween(80, 258, W - 80, 258);

    // Story card
    const oc = track(s.add.graphics());
    oc.fillStyle(unit.color, 0.07);
    oc.fillRoundedRect(54, 268, W - 108, 222, 16);
    oc.lineStyle(2, unit.color, 0.22);
    oc.strokeRoundedRect(54, 268, W - 108, 222, 16);

    track(s.add.text(W/2, 284, '📜  The Story:', {
        fontSize: '15px', fontFamily: 'Arial', fontStyle: 'bold italic', color: '#636E72'
    }).setOrigin(0.5));

    track(s.add.text(W/2, 310, unit.origin, {
        fontSize: '18px', fontFamily: 'Arial', color: '#2D3436',
        wordWrap: { width: W - 160 }, align: 'center', lineSpacing: 7
    }).setOrigin(0.5, 0));

    // Navigation
    const navY = 572;
    const isFirst = currentUnitIndex === 0;
    const isLast  = currentUnitIndex === UNITS.length - 1;

    if (!isFirst) {
        makeBtn(W/2 - 290, navY, 160, 44, 0x636E72, '◀  Prev', '16px',
            () => { currentUnitIndex--; showHistory(); });
    }
    makeBtn(W/2 - 95, navY, 170, 44, 0xA44A3F, '🔍  Examples', '16px',
        () => showExplore());
    makeBtn(W/2 + 95, navY, 170, 44, 0x16A085, '🔄  Convert!', '16px',
        () => startConversions());
    if (!isLast) {
        makeBtn(W/2 + 290, navY, 160, 44, unit.color, 'Next  ▶', '16px',
            () => { currentUnitIndex++; showHistory(); });
    } else {
        makeBtn(W/2 + 290, navY, 160, 44, 0xA44A3F, '✅  Done!', '16px',
            () => showMenu());
    }

    // Side arrows
    const arrowStyle = { fontSize: '32px', color: toCss(unit.color) };
    if (currentUnitIndex > 0) {
        track(s.add.text(16, 390, '◀', arrowStyle)
            .setOrigin(0.5).setInteractive({ cursor: 'pointer' })
            .on('pointerdown', () => { currentUnitIndex--; showHistory(); }));
    }
    if (currentUnitIndex < UNITS.length - 1) {
        track(s.add.text(W - 16, 390, '▶', arrowStyle)
            .setOrigin(0.5).setInteractive({ cursor: 'pointer' })
            .on('pointerdown', () => { currentUnitIndex++; showHistory(); }));
    }
}

// ==================== SORT CHALLENGE ====================
const CORRECT_ORDER = ['mm', 'cm', 'in', 'ft', 'yd', 'm', 'km', 'mi'];

let sortState = {
    slots: [], bank: [], selected: null
};

function showSort() {
    clearScreen();
    sortState.slots    = new Array(8).fill(null);
    sortState.bank     = Phaser.Utils.Array.Shuffle([...CORRECT_ORDER]);
    sortState.selected = null;
    drawSort();
}

function drawSort() {
    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF6F4D2, 1);
    bg.fillRect(0, 0, W, H);

    const header = track(s.add.graphics());
    header.fillStyle(0x2D3436, 1);
    header.fillRect(0, 0, W, 66);

    track(s.add.text(28, 33, '← Menu', {
        fontSize: '17px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0, 0.5).setInteractive({ cursor: 'pointer' })
     .on('pointerdown', () => showMenu()));

    track(s.add.text(W/2, 33, '📊  Sort Challenge', {
        fontSize: '24px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0.5));

    track(s.add.text(W/2, 88, 'Arrange the units from SMALLEST to LARGEST ⬇', {
        fontSize: '17px', fontFamily: 'Arial', color: '#636E72', fontStyle: 'bold'
    }).setOrigin(0.5));

    // 8 answer slots
    const slotW = 88, slotH = 92, slotGap = 8;
    const totalSlotW = 8 * slotW + 7 * slotGap;
    const slotStartX = (W - totalSlotW) / 2;
    const slotY = 110;
    const posLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

    for (let i = 0; i < 8; i++) {
        const sx = slotStartX + i * (slotW + slotGap);
        const cx = sx + slotW / 2;
        const filledUnit = sortState.slots[i]
            ? UNITS.find(u => u.id === sortState.slots[i]) : null;

        const slotG = track(s.add.graphics());
        if (filledUnit) {
            slotG.fillStyle(filledUnit.color, 1);
            slotG.fillRoundedRect(sx, slotY, slotW, slotH, 10);
            track(s.add.text(cx, slotY + 28, filledUnit.emoji, { fontSize: '26px' }).setOrigin(0.5));
            track(s.add.text(cx, slotY + 60, filledUnit.abbr, {
                fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
            }).setOrigin(0.5));

            const sz = track(s.add.zone(cx, slotY + slotH/2, slotW, slotH)
                .setInteractive({ cursor: 'pointer' }));
            sz.on('pointerdown', () => {
                sortState.bank.push(sortState.slots[i]);
                sortState.slots[i] = null;
                sortState.selected = null;
                drawSort();
            });
        } else {
            slotG.fillStyle(0xDDE6FF, 1);
            slotG.fillRoundedRect(sx, slotY, slotW, slotH, 10);
            slotG.lineStyle(2, 0xAAAAAA, 0.5);
            slotG.strokeRoundedRect(sx, slotY, slotW, slotH, 10);
            track(s.add.text(cx, slotY + 46, '?', {
                fontSize: '28px', color: '#AAAAAA'
            }).setOrigin(0.5));

            const sz = track(s.add.zone(cx, slotY + slotH/2, slotW, slotH)
                .setInteractive({ cursor: 'pointer' }));
            sz.on('pointerdown', () => {
                if (sortState.selected !== null) {
                    sortState.slots[i] = sortState.selected;
                    sortState.bank = sortState.bank.filter(id => id !== sortState.selected);
                    sortState.selected = null;
                    drawSort();
                }
            });
        }

        track(s.add.text(cx, slotY + slotH + 10, posLabels[i], {
            fontSize: '12px', fontFamily: 'Arial', color: '#888'
        }).setOrigin(0.5));
    }

    // Bank cards
    track(s.add.text(W/2, 248, 'Tap a unit below to select it, then tap a slot above to place it:', {
        fontSize: '14px', fontFamily: 'Arial', color: '#636E72', fontStyle: 'italic'
    }).setOrigin(0.5));

    const bankW = 88, bankH = 90, bankGap = 10;
    const bankY = 266;
    const bankCount = sortState.bank.length;
    const totalBankW = bankCount * bankW + Math.max(0, bankCount - 1) * bankGap;
    const bankStartX = (W - totalBankW) / 2;

    sortState.bank.forEach((uid, i) => {
        const u = UNITS.find(u => u.id === uid);
        const bx = bankStartX + i * (bankW + bankGap);
        const cx = bx + bankW / 2;
        const isSelected = sortState.selected === uid;

        const bg2 = track(s.add.graphics());
        bg2.fillStyle(u.color, isSelected ? 1 : 0.75);
        bg2.fillRoundedRect(bx, bankY, bankW, bankH, 10);
        if (isSelected) {
            bg2.lineStyle(4, 0xFFFFFF, 1);
            bg2.strokeRoundedRect(bx, bankY, bankW, bankH, 10);
        }

        track(s.add.text(cx, bankY + 26, u.emoji, { fontSize: '26px' }).setOrigin(0.5));
        track(s.add.text(cx, bankY + 58, u.abbr, {
            fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
        }).setOrigin(0.5));

        const bz = track(s.add.zone(cx, bankY + bankH/2, bankW, bankH)
            .setInteractive({ cursor: 'pointer' }));
        bz.on('pointerdown', () => {
            sortState.selected = (sortState.selected === uid) ? null : uid;
            drawSort();
        });
    });

    if (sortState.selected) {
        const su = UNITS.find(u => u.id === sortState.selected);
        track(s.add.text(W/2, 385, `✋  ${su.name} selected — now tap an empty slot above!`, {
            fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold',
            color: toCss(su.color)
        }).setOrigin(0.5));
    }

    const allPlaced = sortState.slots.every(slot => slot !== null);
    if (allPlaced) {
        makeBtn(W/2 - 120, 435, 200, 52, 0xA44A3F, '✅  Check Order!', '19px', checkSort);
    }
    makeBtn(W/2 + 130, 435, 190, 52, 0xE74C3C, '🔄  Reset', '19px', () => showSort());
    makeBtn(W/2 - 340, 435, 150, 52, 0x636E72, '← Menu', '17px', () => showMenu());

    track(s.add.text(W/2, 510, 'Hint: Think about size — which is the tiniest? Which is the biggest?', {
        fontSize: '13px', fontFamily: 'Arial', color: '#B2BEC3', fontStyle: 'italic'
    }).setOrigin(0.5));
}

function checkSort() {
    const playerOrder = sortState.slots;
    let correct = 0;
    CORRECT_ORDER.forEach((uid, i) => { if (playerOrder[i] === uid) correct++; });

    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF8F9FF, 1);
    bg.fillRect(0, 0, W, H);

    const allRight = correct === 8;
    const medal = allRight ? '🏆' : correct >= 5 ? '⭐' : '💪';
    const msg   = allRight ? 'Perfect Order!' : correct >= 5 ? 'Almost there!' : 'Keep trying!';
    const col   = allRight ? '#F59E0B' : correct >= 5 ? '#10B981' : '#EF4444';

    track(s.add.text(W/2, 100, medal, { fontSize: '72px' }).setOrigin(0.5));
    track(s.add.text(W/2, 190, msg, {
        fontSize: '40px', fontFamily: 'Arial', fontStyle: 'bold', color: col
    }).setOrigin(0.5));
    track(s.add.text(W/2, 248, `You got ${correct} out of 8 in the right position!`, {
        fontSize: '21px', fontFamily: 'Arial', color: '#636E72'
    }).setOrigin(0.5));

    track(s.add.text(W/2, 300, 'Correct order (smallest → largest):', {
        fontSize: '15px', fontFamily: 'Arial', color: '#888'
    }).setOrigin(0.5));

    const cW = 80, gap = 8, totalW = 8 * cW + 7 * gap;
    const startX = (W - totalW) / 2;
    const cY = 320;

    CORRECT_ORDER.forEach((uid, i) => {
        const u = UNITS.find(u => u.id === uid);
        const cx = startX + i * (cW + gap) + cW / 2;
        const playerCorrect = playerOrder[i] === uid;

        const g = track(s.add.graphics());
        g.fillStyle(playerCorrect ? u.color : 0xDDDDDD, 1);
        g.fillRoundedRect(cx - cW/2, cY, cW, 76, 8);

        track(s.add.text(cx, cY + 24, u.emoji, { fontSize: '22px' }).setOrigin(0.5));
        track(s.add.text(cx, cY + 55, u.abbr, {
            fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold',
            color: playerCorrect ? '#FFFFFF' : '#888'
        }).setOrigin(0.5));
    });

    track(s.add.text(W/2, 420, 'Coloured = correct position  ·  Grey = wrong position', {
        fontSize: '13px', fontFamily: 'Arial', color: '#B2BEC3', fontStyle: 'italic'
    }).setOrigin(0.5));

    makeBtn(W/2 - 155, 500, 210, 54, 0xA44A3F, '🔄  Try Again', '19px', () => showSort());
    makeBtn(W/2 + 155, 500, 210, 54, 0x16A085, '🔄  Conversions', '19px', () => startConversions());
    makeBtn(W/2,       572, 180, 44, 0x636E72, '🏠  Menu', '17px', () => showMenu());
}

// ==================== QUIZ ====================

function startQuiz() {
    quizQuestions = Phaser.Utils.Array.Shuffle([...ALL_QUIZ_QUESTIONS]).slice(0, 10);
    quizIndex     = 0;
    quizScore     = 0;
    answerLocked  = false;
    showQuestion();
}

function showQuestion() {
    if (quizIndex >= quizQuestions.length) { showQuizResult(); return; }
    clearScreen();
    currentState = GameState.QUIZ;
    const s = sceneRef;
    const W = 900, H = 650;
    const q = quizQuestions[quizIndex];

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF8F9FF, 1);
    bg.fillRect(0, 0, W, H);

    const barBg = track(s.add.graphics());
    barBg.fillStyle(0xE0E0E0, 1);
    barBg.fillRoundedRect(50, 18, W - 100, 10, 5);

    const pct = quizIndex / quizQuestions.length;
    if (pct > 0) {
        const barFill = track(s.add.graphics());
        barFill.fillStyle(0xA44A3F, 1);
        barFill.fillRoundedRect(50, 18, (W - 100) * pct, 10, 5);
    }

    track(s.add.text(50, 14, `⭐ ${quizScore}`, {
        fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold', color: '#F59E0B'
    }).setOrigin(0, 1));
    track(s.add.text(W - 50, 14, `${quizIndex + 1} / ${quizQuestions.length}`, {
        fontSize: '14px', fontFamily: 'Arial', color: '#636E72'
    }).setOrigin(1, 1));

    track(s.add.text(W/2, 64, 'Which unit would you use to measure...', {
        fontSize: '21px', fontFamily: 'Arial, sans-serif', color: '#636E72'
    }).setOrigin(0.5));

    const ic = track(s.add.graphics());
    ic.fillStyle(0xFFFFFF, 1);
    ic.fillRoundedRect(W/2 - 155, 82, 310, 152, 16);
    ic.lineStyle(2, 0xE0E0E0, 1);
    ic.strokeRoundedRect(W/2 - 155, 82, 310, 152, 16);

    track(s.add.text(W/2, 130, q.emoji, { fontSize: '52px' }).setOrigin(0.5));
    track(s.add.text(W/2, 203, q.name, {
        fontSize: '24px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#2D3436'
    }).setOrigin(0.5));

    const choices = buildChoices(q.unit);
    const bW = 185, bH = 82, bGap = 12;
    const totalBW = 4 * bW + 3 * bGap;
    const bStartX = (W - totalBW) / 2 + bW / 2;
    const bY = 255;

    choices.forEach((uid, idx) => {
        const u = UNITS.find(u => u.id === uid);
        const bx = bStartX + idx * (bW + bGap);

        const btn = track(s.add.graphics());
        btn.fillStyle(u.color, 1);
        btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12);

        track(s.add.text(bx, bY + 26, u.emoji, { fontSize: '24px' }).setOrigin(0.5));
        track(s.add.text(bx, bY + 58, u.name, {
            fontSize: '13px', fontFamily: 'Arial', fontStyle: 'bold',
            color: '#FFFFFF', align: 'center', wordWrap: { width: bW - 14 }
        }).setOrigin(0.5));

        const zone = track(s.add.zone(bx, bY + bH/2, bW, bH)
            .setInteractive({ cursor: 'pointer' }));
        zone.on('pointerdown', () => handleAnswer(uid, q, btn, bx, bY, bW, bH));
    });

    let hintRevealed = false;
    const hintBtn = track(s.add.text(W/2, 368, '💡  Show Hint', {
        fontSize: '17px', fontFamily: 'Arial', fontStyle: 'bold', color: '#F59E0B'
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' }));
    hintBtn.on('pointerdown', () => {
        if (!hintRevealed) {
            hintRevealed = true;
            hintBtn.setText(`💡  ${q.hint}`);
            hintBtn.setStyle({ color: '#636E72', fontSize: '15px' });
        }
    });

    track(s.add.text(W/2, 405, '─── All units, smallest → largest ───', {
        fontSize: '12px', fontFamily: 'Arial', color: '#B2BEC3'
    }).setOrigin(0.5));

    const chipW = 84, chipH = 56, chipGap = 7;
    const totalChipW = 8 * chipW + 7 * chipGap;
    const chipStartX = (W - totalChipW) / 2;
    const chipY = 415;

    UNITS.forEach((u, i) => {
        const cx = chipStartX + i * (chipW + chipGap) + chipW / 2;
        const isAnswer = u.id === q.unit;

        const cg = track(s.add.graphics());
        cg.fillStyle(u.color, isAnswer ? 0.15 : 0.08);
        cg.fillRoundedRect(cx - chipW/2, chipY, chipW, chipH, 8);

        track(s.add.text(cx, chipY + 18, u.emoji, { fontSize: '18px' }).setOrigin(0.5));
        track(s.add.text(cx, chipY + 40, u.abbr, {
            fontSize: '12px', fontFamily: 'Arial', fontStyle: 'bold',
            color: toCss(u.color)
        }).setOrigin(0.5));
    });

    track(s.add.text(W/2, 490, 'Tap the correct unit above ↑', {
        fontSize: '13px', fontFamily: 'Arial', color: '#B2BEC3', fontStyle: 'italic'
    }).setOrigin(0.5));
}

function buildChoices(correctId) {
    const others = UNITS.filter(u => u.id !== correctId).map(u => u.id);
    const wrong  = Phaser.Utils.Array.Shuffle(others).slice(0, 3);
    return Phaser.Utils.Array.Shuffle([correctId, ...wrong]);
}

function handleAnswer(chosen, question, btn, bx, bY, bW, bH) {
    if (answerLocked) return;
    answerLocked = true;
    const s = sceneRef;

    const correct = chosen === question.unit;
    if (correct) quizScore++;

    btn.clear();
    btn.fillStyle(correct ? 0x10B981 : 0xEF4444, 1);
    btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12);

    const fbText = correct
        ? `✅  Correct!  ${question.hint}`
        : `❌  Not quite!  ${question.hint}`;
    track(s.add.text(W_CONST/2, 530, fbText, {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold',
        color: correct ? '#10B981' : '#EF4444',
        wordWrap: { width: 820 }, align: 'center'
    }).setOrigin(0.5));

    s.time.delayedCall(2000, () => {
        answerLocked = false;
        quizIndex++;
        showQuestion();
    });
}

const W_CONST = 900;

// ==================== QUIZ RESULT ====================

function showQuizResult() {
    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;
    const total = quizQuestions.length;
    const pct   = Math.round((quizScore / total) * 100);

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF8F9FF, 1);
    bg.fillRect(0, 0, W, H);

    let medal, msg, col;
    if      (pct >= 90) { medal = '🏆'; msg = 'Outstanding!';    col = '#F59E0B'; }
    else if (pct >= 70) { medal = '🌟'; msg = 'Great job!';       col = '#10B981'; }
    else if (pct >= 50) { medal = '👍'; msg = 'Good effort!';     col = '#3B82F6'; }
    else                { medal = '💪'; msg = 'Keep practicing!'; col = '#EF4444'; }

    track(s.add.text(W/2, 105, medal, { fontSize: '80px' }).setOrigin(0.5));
    track(s.add.text(W/2, 200, msg, {
        fontSize: '44px', fontFamily: 'Arial', fontStyle: 'bold', color: col
    }).setOrigin(0.5));
    track(s.add.text(W/2, 262, `You got ${quizScore} out of ${total} correct  (${pct}%)`, {
        fontSize: '22px', fontFamily: 'Arial', color: '#636E72'
    }).setOrigin(0.5));

    const barBg = track(s.add.graphics());
    barBg.fillStyle(0xE0E0E0, 1);
    barBg.fillRoundedRect(200, 298, 500, 18, 9);
    const barFill = track(s.add.graphics());
    barFill.fillStyle(0xA44A3F, 1);
    barFill.fillRoundedRect(200, 298, 500 * (quizScore / total), 18, 9);

    makeBtn(W/2 - 175, 400, 210, 58, 0xA44A3F, '🔄  Try Again',     '19px', () => startQuiz());
    makeBtn(W/2 + 175, 400, 210, 58, 0x16A085, '🔄  Conversions',   '19px', () => startConversions());
    makeBtn(W/2,       476, 210, 48, 0x8E44AD, '📖  Origin Stories','17px', () => { currentUnitIndex = 0; showHistory(); });
    makeBtn(W/2,       536, 210, 46, 0x636E72, '🏠  Main Menu',     '17px', () => showMenu());
}

// ==================== CONVERSION CHALLENGE ====================

function startConversions() {
    convQuestions = Phaser.Utils.Array.Shuffle([...ALL_CONVERSIONS]).slice(0, 10);
    convIndex     = 0;
    convScore     = 0;
    convLocked    = false;
    currentState  = GameState.CONVERSIONS;
    showConvQuestion();
}

function showConvQuestion() {
    if (convIndex >= convQuestions.length) { showConvResult(); return; }
    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;
    const q = convQuestions[convIndex];

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF0FBF8, 1);
    bg.fillRect(0, 0, W, H);

    // Header bar
    const bar = track(s.add.graphics());
    bar.fillStyle(0x16A085, 1);
    bar.fillRect(0, 0, W, 62);

    track(s.add.text(20, 31, '← Menu', {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0, 0.5).setInteractive({ cursor: 'pointer' })
     .on('pointerdown', () => showMenu()));

    track(s.add.text(W/2, 31, '🔄  Conversion Challenge', {
        fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0.5));

    track(s.add.text(W - 20, 31, `⭐ ${convScore}`, {
        fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#F59E0B'
    }).setOrigin(1, 0.5));

    // Progress bar
    const pct = convIndex / convQuestions.length;
    const pbBg = track(s.add.graphics());
    pbBg.fillStyle(0xCCE8E3, 1);
    pbBg.fillRect(0, 62, W, 8);
    if (pct > 0) {
        const pbFill = track(s.add.graphics());
        pbFill.fillStyle(0x16A085, 1);
        pbFill.fillRect(0, 62, W * pct, 8);
    }

    track(s.add.text(W/2, 90, `Question ${convIndex + 1} of ${convQuestions.length}`, {
        fontSize: '14px', fontFamily: 'Arial', color: '#16A085', fontStyle: 'italic'
    }).setOrigin(0.5));

    // Question card
    const qc = track(s.add.graphics());
    qc.fillStyle(0xFFFFFF, 1);
    qc.fillRoundedRect(W/2 - 348, 104, 696, 124, 16);
    qc.lineStyle(2, 0x16A085, 0.3);
    qc.strokeRoundedRect(W/2 - 348, 104, 696, 124, 16);

    track(s.add.text(W/2, 120, 'Can you convert this?', {
        fontSize: '15px', fontFamily: 'Arial', color: '#636E72', fontStyle: 'italic'
    }).setOrigin(0.5, 0));

    track(s.add.text(W/2, 160, q.emoji + '  ' + q.q, {
        fontSize: '34px', fontFamily: 'Arial', fontStyle: 'bold', color: '#2D3436'
    }).setOrigin(0.5));

    track(s.add.text(W/2, 208, '💡  Formula hint: ' + q.formula, {
        fontSize: '16px', fontFamily: 'Arial', color: '#16A085', fontStyle: 'italic'
    }).setOrigin(0.5));

    // 4 answer choices
    const allChoices = Phaser.Utils.Array.Shuffle([q.answer, ...q.wrong.slice(0, 3)]);
    const bW = 178, bH = 78, bGap = 12;
    const totalBW = 4 * bW + 3 * bGap;
    const bStartX = (W - totalBW) / 2 + bW / 2;
    const bY = 248;

    allChoices.forEach((val, idx) => {
        const bx = bStartX + idx * (bW + bGap);

        const btn = track(s.add.graphics());
        btn.fillStyle(0x1A5276, 1);
        btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12);

        track(s.add.text(bx, bY + bH/2, String(val), {
            fontSize: '30px', fontFamily: 'Arial', fontStyle: 'bold',
            color: '#FFFFFF', align: 'center'
        }).setOrigin(0.5));

        const zone = track(s.add.zone(bx, bY + bH/2, bW, bH)
            .setInteractive({ cursor: 'pointer' }));
        zone.on('pointerdown', () => handleConvAnswer(val, q, btn, bx, bY, bW, bH));
        zone.on('pointerover',  () => { if (!convLocked) { btn.clear(); btn.fillStyle(0x2471A3, 1); btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12); } });
        zone.on('pointerout',   () => { if (!convLocked) { btn.clear(); btn.fillStyle(0x1A5276, 1); btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12); } });
    });

    // Memory helper chart
    track(s.add.text(W/2, 356, '🧠  Memory Chart', {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold', color: '#2D3436'
    }).setOrigin(0.5));

    const chart = CONV_CHARTS[q.cat] || CONV_CHARTS.metric;
    const chartH = chart.length * 38 + 20;
    const chartBg = track(s.add.graphics());
    chartBg.fillStyle(0xE8F8F5, 1);
    chartBg.fillRoundedRect(W/2 - 320, 370, 640, chartH, 12);
    chartBg.lineStyle(2, 0x16A085, 0.3);
    chartBg.strokeRoundedRect(W/2 - 320, 370, 640, chartH, 12);

    chart.forEach((line, i) => {
        track(s.add.text(W/2, 380 + i * 38 + 14, line, {
            fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#0E6655'
        }).setOrigin(0.5));
    });

    // Step-by-step tip at bottom
    const tipY = 370 + chartH + 14;
    track(s.add.text(W/2, tipY, '🔑  Tip: Look for ×10, ×100, or ×1000 patterns in metric — and ×12 or ×3 in US units!', {
        fontSize: '13px', fontFamily: 'Arial', color: '#95A5A6', fontStyle: 'italic',
        wordWrap: { width: 820 }, align: 'center'
    }).setOrigin(0.5));
}

function handleConvAnswer(chosen, question, btn, bx, bY, bW, bH) {
    if (convLocked) return;
    convLocked = true;
    const s = sceneRef;
    const W = 900;

    const correct = chosen === question.answer;
    if (correct) convScore++;

    btn.clear();
    btn.fillStyle(correct ? 0x10B981 : 0xEF4444, 1);
    btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12);

    const fbMsg = correct
        ? `✅  Correct!  ${question.formula}`
        : `❌  The answer is ${question.answer}.  ${question.formula}`;

    track(s.add.text(W/2, 610, fbMsg, {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold',
        color: correct ? '#10B981' : '#EF4444',
        wordWrap: { width: 840 }, align: 'center'
    }).setOrigin(0.5));

    s.time.delayedCall(2200, () => {
        convLocked = false;
        convIndex++;
        showConvQuestion();
    });
}

function showConvResult() {
    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;
    const total = convQuestions.length;
    const pct   = Math.round((convScore / total) * 100);

    const bg = track(s.add.graphics());
    bg.fillStyle(0xF0FBF8, 1);
    bg.fillRect(0, 0, W, H);

    let medal, msg, col;
    if      (pct >= 90) { medal = '🏆'; msg = 'Conversion Master!';  col = '#F59E0B'; }
    else if (pct >= 70) { medal = '🌟'; msg = 'Great converting!';   col = '#10B981'; }
    else if (pct >= 50) { medal = '👍'; msg = 'Getting there!';      col = '#3B82F6'; }
    else                { medal = '💪'; msg = 'Keep practicing!';     col = '#EF4444'; }

    track(s.add.text(W/2, 95, medal, { fontSize: '80px' }).setOrigin(0.5));
    track(s.add.text(W/2, 188, msg, {
        fontSize: '42px', fontFamily: 'Arial', fontStyle: 'bold', color: col
    }).setOrigin(0.5));
    track(s.add.text(W/2, 246, `You got ${convScore} out of ${total} correct  (${pct}%)`, {
        fontSize: '22px', fontFamily: 'Arial', color: '#636E72'
    }).setOrigin(0.5));

    const barBg = track(s.add.graphics());
    barBg.fillStyle(0xD5F5EE, 1);
    barBg.fillRoundedRect(200, 282, 500, 18, 9);
    const barFill = track(s.add.graphics());
    barFill.fillStyle(0x16A085, 1);
    barFill.fillRoundedRect(200, 282, 500 * (convScore / total), 18, 9);

    // Key conversion reference card
    const refBg = track(s.add.graphics());
    refBg.fillStyle(0xE8F8F5, 1);
    refBg.fillRoundedRect(W/2 - 340, 316, 680, 108, 14);
    refBg.lineStyle(2, 0x16A085, 0.3);
    refBg.strokeRoundedRect(W/2 - 340, 316, 680, 108, 14);

    track(s.add.text(W/2, 330, '📝  Key Conversions to Remember:', {
        fontSize: '15px', fontFamily: 'Arial', fontStyle: 'bold', color: '#636E72'
    }).setOrigin(0.5));

    const refs = [
        '🇺🇸  12 inches = 1 foot   ·   3 feet = 1 yard   ·   5,280 feet = 1 mile',
        '🌍  10 mm = 1 cm   ·   100 cm = 1 m   ·   1,000 m = 1 km'
    ];
    refs.forEach((r, i) => {
        track(s.add.text(W/2, 360 + i * 32, r, {
            fontSize: '15px', fontFamily: 'Arial', fontStyle: 'bold', color: '#0E6655'
        }).setOrigin(0.5));
    });

    makeBtn(W/2 - 175, 455, 210, 54, 0x16A085, '🔄  Try Again',     '19px', () => startConversions());
    makeBtn(W/2 + 175, 455, 210, 54, 0xE67E22, '🌍  Scenarios',     '19px', () => startScenarios());
    makeBtn(W/2,       524, 210, 46, 0x636E72, '🏠  Main Menu',     '17px', () => showMenu());
}

// ==================== REAL-WORLD SCENARIOS ====================

function startScenarios() {
    scenQuestions = Phaser.Utils.Array.Shuffle([...ALL_SCENARIOS]).slice(0, 10);
    scenIndex     = 0;
    scenScore     = 0;
    scenLocked    = false;
    currentState  = GameState.SCENARIOS;
    showScenQuestion();
}

function showScenQuestion() {
    if (scenIndex >= scenQuestions.length) { showScenResult(); return; }
    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;
    const q = scenQuestions[scenIndex];

    const bg = track(s.add.graphics());
    bg.fillStyle(0xFFFBF0, 1);
    bg.fillRect(0, 0, W, H);

    // Header bar
    const bar = track(s.add.graphics());
    bar.fillStyle(0xCA6F1E, 1);
    bar.fillRect(0, 0, W, 62);

    track(s.add.text(20, 31, '← Menu', {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0, 0.5).setInteractive({ cursor: 'pointer' })
     .on('pointerdown', () => showMenu()));

    track(s.add.text(W/2, 31, '🌍  Real-World Scenarios', {
        fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0.5));

    track(s.add.text(W - 20, 31, `⭐ ${scenScore}`, {
        fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(1, 0.5));

    // Progress bar
    const pct = scenIndex / scenQuestions.length;
    const pbBg = track(s.add.graphics());
    pbBg.fillStyle(0xF0D9B0, 1);
    pbBg.fillRect(0, 62, W, 8);
    if (pct > 0) {
        const pbFill = track(s.add.graphics());
        pbFill.fillStyle(0xCA6F1E, 1);
        pbFill.fillRect(0, 62, W * pct, 8);
    }

    // Scene label
    const sceneLabelBg = track(s.add.graphics());
    sceneLabelBg.fillStyle(0xFDEBD0, 1);
    sceneLabelBg.fillRoundedRect(W/2 - 130, 80, 260, 34, 17);
    track(s.add.text(W/2, 97, q.scene, {
        fontSize: '17px', fontFamily: 'Arial', fontStyle: 'bold', color: '#CA6F1E'
    }).setOrigin(0.5));

    // Emoji
    track(s.add.text(W/2, 158, q.emoji, { fontSize: '58px' }).setOrigin(0.5));

    // Story card
    const sc = track(s.add.graphics());
    sc.fillStyle(0xFFFFFF, 1);
    sc.fillRoundedRect(50, 195, W - 100, 148, 14);
    sc.lineStyle(2, 0xCA6F1E, 0.3);
    sc.strokeRoundedRect(50, 195, W - 100, 148, 14);

    track(s.add.text(W/2, 210, q.story, {
        fontSize: '20px', fontFamily: 'Arial', color: '#2D3436',
        wordWrap: { width: W - 160 }, align: 'center', lineSpacing: 6
    }).setOrigin(0.5, 0));

    // 4 answer choices
    const choices = Phaser.Utils.Array.Shuffle([...q.choices]);
    const bW = 178, bH = 78, bGap = 12;
    const totalBW = 4 * bW + 3 * bGap;
    const bStartX = (W - totalBW) / 2 + bW / 2;
    const bY = 358;

    choices.forEach((val, idx) => {
        const bx = bStartX + idx * (bW + bGap);

        const btn = track(s.add.graphics());
        btn.fillStyle(0xCA6F1E, 1);
        btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12);

        track(s.add.text(bx, bY + bH/2, String(val), {
            fontSize: '28px', fontFamily: 'Arial', fontStyle: 'bold',
            color: '#FFFFFF', align: 'center'
        }).setOrigin(0.5));

        const zone = track(s.add.zone(bx, bY + bH/2, bW, bH)
            .setInteractive({ cursor: 'pointer' }));
        zone.on('pointerdown', () => handleScenAnswer(val, q, btn, bx, bY, bW, bH));
        zone.on('pointerover',  () => { if (!scenLocked) { btn.clear(); btn.fillStyle(lighten(0xCA6F1E, 25), 1); btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12); } });
        zone.on('pointerout',   () => { if (!scenLocked) { btn.clear(); btn.fillStyle(0xCA6F1E, 1); btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12); } });
    });

    // Counter + tip
    track(s.add.text(W/2, 460, `Puzzle ${scenIndex + 1} of ${scenQuestions.length}  ·  Pick the right answer!`, {
        fontSize: '14px', fontFamily: 'Arial', color: '#B2BEC3'
    }).setOrigin(0.5));

    // Formula hint — revealed only after wrong answer via timeout, show as subtle clue
    track(s.add.text(W/2, 488, '🔑  Think step by step — what conversion do you need?', {
        fontSize: '14px', fontFamily: 'Arial', color: '#D4AC72', fontStyle: 'italic'
    }).setOrigin(0.5));
}

function handleScenAnswer(chosen, question, btn, bx, bY, bW, bH) {
    if (scenLocked) return;
    scenLocked = true;
    const s = sceneRef;
    const W = 900;

    const correct = chosen === question.answer;
    if (correct) scenScore++;

    btn.clear();
    btn.fillStyle(correct ? 0x10B981 : 0xEF4444, 1);
    btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12);

    const fbMsg = correct
        ? `✅  Correct!  ${question.formula}`
        : `❌  The answer is ${question.answer}.  ${question.formula}`;

    track(s.add.text(W/2, 530, fbMsg, {
        fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold',
        color: correct ? '#10B981' : '#EF4444',
        wordWrap: { width: 840 }, align: 'center'
    }).setOrigin(0.5));

    s.time.delayedCall(2400, () => {
        scenLocked = false;
        scenIndex++;
        showScenQuestion();
    });
}

function showScenResult() {
    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;
    const total = scenQuestions.length;
    const pct   = Math.round((scenScore / total) * 100);

    const bg = track(s.add.graphics());
    bg.fillStyle(0xFFFBF0, 1);
    bg.fillRect(0, 0, W, H);

    let medal, msg, col;
    if      (pct >= 90) { medal = '🏆'; msg = 'Scenario Star!';          col = '#F59E0B'; }
    else if (pct >= 70) { medal = '🌟'; msg = 'Real-World Ready!';        col = '#10B981'; }
    else if (pct >= 50) { medal = '👍'; msg = 'Getting the hang of it!'; col = '#3B82F6'; }
    else                { medal = '💪'; msg = 'Keep practicing!';          col = '#EF4444'; }

    track(s.add.text(W/2, 95, medal, { fontSize: '80px' }).setOrigin(0.5));
    track(s.add.text(W/2, 188, msg, {
        fontSize: '42px', fontFamily: 'Arial', fontStyle: 'bold', color: col
    }).setOrigin(0.5));
    track(s.add.text(W/2, 246, `You solved ${scenScore} out of ${total}  (${pct}%)`, {
        fontSize: '22px', fontFamily: 'Arial', color: '#636E72'
    }).setOrigin(0.5));

    const barBg = track(s.add.graphics());
    barBg.fillStyle(0xFAD7A0, 1);
    barBg.fillRoundedRect(200, 282, 500, 18, 9);
    const barFill = track(s.add.graphics());
    barFill.fillStyle(0xCA6F1E, 1);
    barFill.fillRoundedRect(200, 282, 500 * (scenScore / total), 18, 9);

    // Encouragement tip
    const tipBg = track(s.add.graphics());
    tipBg.fillStyle(0xFEF9E7, 1);
    tipBg.fillRoundedRect(W/2 - 320, 314, 640, 72, 12);
    tipBg.lineStyle(2, 0xCA6F1E, 0.25);
    tipBg.strokeRoundedRect(W/2 - 320, 314, 640, 72, 12);

    track(s.add.text(W/2, 350, '🌍  Measurements are everywhere — cooking, sports, travel, building!\n    The more you practice, the more you\'ll spot them in real life.', {
        fontSize: '14px', fontFamily: 'Arial', color: '#6E2F0B',
        wordWrap: { width: 600 }, align: 'center', lineSpacing: 4
    }).setOrigin(0.5));

    makeBtn(W/2 - 175, 415, 210, 54, 0xCA6F1E, '🔄  Try Again',      '19px', () => startScenarios());
    makeBtn(W/2 + 175, 415, 210, 54, 0x16A085, '🔄  Conversions',    '19px', () => startConversions());
    makeBtn(W/2,       484, 210, 46, 0x636E72, '🏠  Main Menu',      '17px', () => showMenu());
}

// ============================================================
// PLANET QUEST — Planet & Moon Data + Question Bank
// ============================================================

const PLANETS = [
    {
        id: 'mercury',
        name: 'Mercury',
        emoji: '🪨',
        order: 1,
        type: 'Rocky',
        color: '#9E9E9E', phaser: 0x9E9E9E,
        radius: 18,
        orbitRadius: 95,
        orbitSpeed: 0.0048,
        moons: 0,
        sizeRank: 8,        // 1=largest
        distanceFromSun: 57.9, // million km
        dayLength: '59 Earth days',
        yearLength: '88 Earth days',
        temp: '-180°C to 430°C',
        atmosphere: 'Almost none',
        icon: '⚫',
        badge: '🪨 Rocky Speedster',
        facts: [
            '☀️ Closest planet to the Sun — but NOT the hottest!',
            '🌡️ Temperature swings from -180°C at night to 430°C during the day.',
            '🏃 A year on Mercury is only 88 Earth days long.',
            '🌑 Mercury has no moons and almost no atmosphere.',
            '📏 Mercury is the smallest planet in our solar system.',
        ],
        funFact: 'Despite being closest to the Sun, Mercury is NOT the hottest planet — Venus is! Mercury has no atmosphere to trap heat.',
    },
    {
        id: 'venus',
        name: 'Venus',
        emoji: '🌕',
        order: 2,
        type: 'Rocky',
        color: '#F4C94E', phaser: 0xF4C94E,
        radius: 26,
        orbitRadius: 148,
        orbitSpeed: 0.0037,
        moons: 0,
        sizeRank: 6,
        distanceFromSun: 108.2,
        dayLength: '243 Earth days (backwards!)',
        yearLength: '225 Earth days',
        temp: '465°C (average)',
        atmosphere: 'Thick CO₂ with sulfuric acid clouds',
        icon: '🌫️',
        badge: '🌋 Volcanic Furnace',
        facts: [
            '🔥 Venus is the HOTTEST planet — hotter than Mercury!',
            '🔄 Venus spins backwards — the Sun rises in the west!',
            '🌩️ A day on Venus is longer than its year.',
            '☁️ Covered in thick clouds of sulfuric acid.',
            '🌡️ Surface temperature is 465°C — hot enough to melt lead!',
        ],
        funFact: 'Venus spins so slowly AND backwards that a day on Venus (243 Earth days) is longer than a year on Venus (225 Earth days)!',
    },
    {
        id: 'earth',
        name: 'Earth',
        emoji: '🌍',
        order: 3,
        type: 'Rocky',
        color: '#1E88E5', phaser: 0x1E88E5,
        radius: 27,
        orbitRadius: 204,
        orbitSpeed: 0.003,
        moons: 1,
        sizeRank: 5,
        distanceFromSun: 149.6,
        dayLength: '24 hours',
        yearLength: '365.25 days',
        temp: '-89°C to 58°C',
        atmosphere: 'Nitrogen & Oxygen',
        icon: '💧',
        badge: '🌊 Home Planet',
        facts: [
            '💧 The only planet known to have liquid water on its surface.',
            '🌱 Home to over 8 million species of life!',
            '🌙 Earth has one large Moon that controls the tides.',
            '🛡️ Our magnetic field protects us from solar winds.',
            '🌍 Over 70% of Earth\'s surface is covered by oceans.',
        ],
        funFact: 'Earth is the densest planet in the solar system and the only one not named after a Roman or Greek god!',
        moonsList: [
            { name: 'Moon', emoji: '🌙', fact: 'The Moon is slowly drifting away from Earth at 3.8 cm per year!' }
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        emoji: '🔴',
        order: 4,
        type: 'Rocky',
        color: '#D84315', phaser: 0xD84315,
        radius: 22,
        orbitRadius: 268,
        orbitSpeed: 0.0024,
        moons: 2,
        sizeRank: 7,
        distanceFromSun: 227.9,
        dayLength: '24 hours 37 min',
        yearLength: '687 Earth days',
        temp: '-143°C to 35°C',
        atmosphere: 'Thin CO₂',
        icon: '🏔️',
        badge: '🏜️ The Red Planet',
        facts: [
            '🏔️ Home to Olympus Mons — the tallest volcano in the solar system (3× height of Everest)!',
            '🔴 Mars is red because of iron oxide (rust) on its surface.',
            '🌙 Mars has two tiny moons: Phobos and Deimos.',
            '🤖 Several rovers have explored Mars — Curiosity and Perseverance are there now!',
            '🌪️ Mars has the largest dust storms in the solar system.',
        ],
        funFact: 'The canyon Valles Marineris on Mars is 4,000 km long — as wide as the entire USA!',
        moonsList: [
            { name: 'Phobos', emoji: '🪨', fact: 'Phobos is so close to Mars it orbits faster than Mars rotates!' },
            { name: 'Deimos', emoji: '🪨', fact: 'Deimos is so small it looks like a star from Mars\'s surface.' }
        ]
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        emoji: '🪐',
        order: 5,
        type: 'Gas Giant',
        color: '#C4813B', phaser: 0xC4813B,
        radius: 56,
        orbitRadius: 370,
        orbitSpeed: 0.0013,
        moons: 95,
        sizeRank: 1,
        distanceFromSun: 778.5,
        dayLength: '10 hours',
        yearLength: '12 Earth years',
        temp: '-110°C (cloud tops)',
        atmosphere: 'Hydrogen & Helium',
        icon: '🌀',
        badge: '👑 King of Planets',
        facts: [
            '🏆 Jupiter is the LARGEST planet — all others could fit inside it!',
            '🌀 The Great Red Spot is a storm that has raged for 400+ years.',
            '🌙 Jupiter has 95 known moons — more than any other planet!',
            '⚡ Jupiter has the shortest day — just 10 hours!',
            '🛡️ Jupiter\'s gravity protects Earth by pulling in many asteroids.',
        ],
        funFact: '1,300 Earths could fit inside Jupiter! It\'s so massive that all other planets combined only add up to half its mass.',
        moonsList: [
            { name: 'Io', emoji: '🌋', fact: 'Io is the most volcanically active body in the solar system!' },
            { name: 'Europa', emoji: '🧊', fact: 'Europa has a liquid water ocean hidden under its icy surface — possibly harboring life!' },
            { name: 'Ganymede', emoji: '🌑', fact: 'Ganymede is the largest moon in the solar system — even bigger than Mercury!' },
            { name: 'Callisto', emoji: '🌑', fact: 'Callisto is the most heavily cratered object in the solar system.' }
        ]
    },
    {
        id: 'saturn',
        name: 'Saturn',
        emoji: '🪐',
        order: 6,
        type: 'Gas Giant',
        color: '#E8D5A3', phaser: 0xE8D5A3,
        radius: 48,
        orbitRadius: 475,
        orbitSpeed: 0.00097,
        moons: 146,
        sizeRank: 2,
        distanceFromSun: 1432,
        dayLength: '10.7 hours',
        yearLength: '29 Earth years',
        temp: '-140°C (cloud tops)',
        atmosphere: 'Hydrogen & Helium',
        icon: '💍',
        badge: '💫 Lord of the Rings',
        hasRings: true,
        facts: [
            '💍 Saturn\'s rings are made of billions of ice and rock chunks.',
            '🏊 Saturn is so light it could FLOAT on water!',
            '🌙 Saturn has 146 known moons — the most of any planet!',
            '💨 Winds on Saturn reach 1,800 km/h — faster than a jet plane!',
            '🔭 Galileo first spotted Saturn\'s rings in 1610.',
        ],
        funFact: 'Saturn is the least dense planet in the solar system — it\'s less dense than water, so it would float in a giant bathtub!',
        moonsList: [
            { name: 'Titan', emoji: '🌫️', fact: 'Titan has rivers and lakes — but made of liquid methane, not water!' },
            { name: 'Enceladus', emoji: '💧', fact: 'Enceladus shoots geysers of water ice into space from cracks in its south pole.' }
        ]
    },
    {
        id: 'uranus',
        name: 'Uranus',
        emoji: '🔵',
        order: 7,
        type: 'Ice Giant',
        color: '#7FFFD4', phaser: 0x7FFFD4,
        radius: 36,
        orbitRadius: 562,
        orbitSpeed: 0.00068,
        moons: 27,
        sizeRank: 3,
        distanceFromSun: 2871,
        dayLength: '17 hours',
        yearLength: '84 Earth years',
        temp: '-224°C',
        atmosphere: 'Hydrogen, Helium & Methane',
        icon: '🔄',
        badge: '🌀 Sideways Spinner',
        facts: [
            '↩️ Uranus spins on its SIDE — its axis is tilted 98 degrees!',
            '🥶 Uranus is the coldest planet at -224°C.',
            '💎 It may rain diamonds inside Uranus!',
            '🔭 Uranus was the first planet discovered with a telescope (1781).',
            '🌊 It\'s an ice giant — its interior is icy water, methane, and ammonia.',
        ],
        funFact: 'Uranus rolls around the Sun on its side like a bowling ball! One pole faces the Sun for 42 years straight.',
    },
    {
        id: 'neptune',
        name: 'Neptune',
        emoji: '🔷',
        order: 8,
        type: 'Ice Giant',
        color: '#1565C0', phaser: 0x1565C0,
        radius: 34,
        orbitRadius: 640,
        orbitSpeed: 0.00054,
        moons: 16,
        sizeRank: 4,
        distanceFromSun: 4495,
        dayLength: '16 hours',
        yearLength: '165 Earth years',
        temp: '-214°C',
        atmosphere: 'Hydrogen, Helium & Methane',
        icon: '💨',
        badge: '🌪️ Windy Giant',
        facts: [
            '💨 Neptune has the strongest winds in the solar system — 2,100 km/h!',
            '🌊 Neptune was predicted mathematically BEFORE it was seen through a telescope.',
            '🔵 Its blue color comes from methane gas in the atmosphere.',
            '⏱️ One year on Neptune = 165 Earth years!',
            '🌑 Its largest moon Triton orbits backwards!',
        ],
        funFact: 'Neptune was discovered through math! Scientists noticed Uranus wasn\'t moving right, and predicted there must be another planet pulling on it.',
        moonsList: [
            { name: 'Triton', emoji: '🌑', fact: 'Triton is the only large moon that orbits its planet backwards (retrograde orbit)!' }
        ]
    }
];

// ── Bonus objects ──────────────────────────────────────────────
const BONUS_OBJECTS = [
    {
        id: 'asteroid_belt',
        name: 'Asteroid Belt',
        emoji: '🪨',
        color: '#A09080', phaser: 0xA09080,
        orbitRadius: 320,
        facts: [
            '🪨 The Asteroid Belt sits between Mars and Jupiter.',
            '🌌 It contains millions of rocky objects and dwarf planets.',
            '🛸 The dwarf planet Ceres lives here — it\'s 940 km across!',
        ],
        funFact: 'Despite what movies show, the asteroid belt is mostly empty space! Spacecraft fly through it easily.',
    },
    {
        id: 'pluto',
        name: 'Pluto',
        emoji: '❄️',
        color: '#C8A882', phaser: 0xC8A882,
        orbitRadius: 700,
        facts: [
            '❄️ Pluto was reclassified as a "dwarf planet" in 2006.',
            '🌙 Pluto\'s moon Charon is so large they orbit each other!',
            '⏱️ One year on Pluto = 248 Earth years.',
        ],
        funFact: 'Pluto is smaller than Earth\'s Moon! The New Horizons spacecraft revealed a heart-shaped ice plain on its surface.',
    }
];

// ── The Sun ────────────────────────────────────────────────────
const SUN = {
    id: 'sun',
    name: 'The Sun',
    emoji: '☀️',
    color: '#FDD835', phaser: 0xFDD835,
    facts: [
        '⭐ The Sun is a star made of hot plasma and magnetic fields.',
        '🔥 The surface is 5,500°C — the core is 15 MILLION °C!',
        '🌍 The Sun contains 99.8% of all the mass in the solar system.',
        '💡 Light from the Sun takes 8 minutes to reach Earth.',
        '🌟 It will shine for another 5 billion years before becoming a red giant.',
    ],
    funFact: 'One million Earths could fit inside the Sun! And it burns 620 million tonnes of hydrogen every single second.',
};

// ── Question Bank ──────────────────────────────────────────────
// Each question: { text, hint, answer (planet id), category, choices (for MC), type }
// type: 'click'  → player clicks the right planet in the solar system
//       'choice' → player picks from 3–4 on-screen answer buttons

const QUESTIONS = [
    // ── LEVEL 1: Order ────────────────────────────────────────
    {
        id: 'q_order_1', level: 1, category: 'Order',
        text: 'Which planet is closest to the Sun?',
        hint: 'It\'s also the smallest planet!',
        type: 'click', answer: 'mercury',
        successMsg: 'Mercury orbits the Sun in just 88 days — fastest planet!'
    },
    {
        id: 'q_order_2', level: 1, category: 'Order',
        text: 'Which planet do we live on?',
        hint: 'It\'s the blue-green one with oceans!',
        type: 'click', answer: 'earth',
        successMsg: 'Earth is the 3rd planet from the Sun — our home!'
    },
    {
        id: 'q_order_3', level: 1, category: 'Order',
        text: 'Which planet is 4th from the Sun?',
        hint: 'It\'s called the Red Planet!',
        type: 'click', answer: 'mars',
        successMsg: 'Mars is 4th! Its red color comes from iron rust on its surface.'
    },
    {
        id: 'q_order_4', level: 1, category: 'Order',
        text: 'Click the planet that comes right after Earth, moving away from the Sun.',
        hint: 'My Very Educated Mother Just Served Us Nachos — what comes after E?',
        type: 'click', answer: 'mars',
        successMsg: 'Correct! The order is: Mercury, Venus, Earth, MARS, Jupiter…'
    },
    {
        id: 'q_order_5', level: 1, category: 'Order',
        text: 'Which is the LAST and farthest planet from the Sun?',
        hint: 'Named after the Roman god of the sea.',
        type: 'click', answer: 'neptune',
        successMsg: 'Neptune is the 8th and farthest planet — 4.5 billion km from the Sun!'
    },
    {
        id: 'q_order_6', level: 1, category: 'Order',
        text: 'Which planet is 2nd from the Sun?',
        hint: 'It\'s the hottest planet, despite not being closest!',
        type: 'click', answer: 'venus',
        successMsg: 'Venus is 2nd! It\'s covered in thick clouds that trap heat.'
    },
    {
        id: 'q_order_7', level: 1, category: 'Order',
        text: 'Which planet is between Saturn and Neptune?',
        hint: 'It spins completely on its side!',
        type: 'click', answer: 'uranus',
        successMsg: 'Uranus is 7th — sandwiched between Saturn and Neptune!'
    },

    // ── LEVEL 2: Type ─────────────────────────────────────────
    {
        id: 'q_type_1', level: 2, category: 'Type',
        text: 'Which of these is a GAS GIANT?',
        hint: 'Gas giants are huge and mostly made of hydrogen and helium.',
        type: 'choice',
        choices: ['jupiter', 'mars', 'mercury', 'earth'],
        answer: 'jupiter',
        successMsg: 'Jupiter is the king of gas giants — over 1,300 Earths could fit inside!'
    },
    {
        id: 'q_type_2', level: 2, category: 'Type',
        text: 'Click the LARGEST gas giant in our solar system.',
        hint: 'It\'s the biggest planet overall — and has a giant storm.',
        type: 'click', answer: 'jupiter',
        successMsg: 'Jupiter is a gas giant AND the biggest planet in the solar system!'
    },
    {
        id: 'q_type_3', level: 2, category: 'Type',
        text: 'Which of these is a ROCKY planet (not a gas giant)?',
        hint: 'Rocky planets are smaller and closer to the Sun.',
        type: 'choice',
        choices: ['mars', 'saturn', 'neptune', 'uranus'],
        answer: 'mars',
        successMsg: 'Mars is rocky! The 4 inner planets — Mercury, Venus, Earth, Mars — are all rocky.'
    },
    {
        id: 'q_type_4', level: 2, category: 'Type',
        text: 'Which planet is an ICE GIANT?',
        hint: 'It\'s the sideways-spinning one made of icy materials.',
        type: 'choice',
        choices: ['uranus', 'jupiter', 'venus', 'mars'],
        answer: 'uranus',
        successMsg: 'Uranus is an ice giant — its interior is filled with icy water, methane, and ammonia!'
    },
    {
        id: 'q_type_5', level: 2, category: 'Type',
        text: 'Click the planet that is a GAS GIANT with famous rings.',
        hint: 'Look for the planet with beautiful rings around it!',
        type: 'click', answer: 'saturn',
        successMsg: 'Saturn is a gas giant famous for its spectacular ring system!'
    },

    // ── LEVEL 3: Size ─────────────────────────────────────────
    {
        id: 'q_size_1', level: 3, category: 'Size',
        text: 'Which is the LARGEST planet in the solar system?',
        hint: 'Its famous storm (the Great Red Spot) is bigger than Earth!',
        type: 'click', answer: 'jupiter',
        successMsg: '1,300 Earths could fit inside Jupiter — it\'s a true giant!'
    },
    {
        id: 'q_size_2', level: 3, category: 'Size',
        text: 'Which is the SMALLEST planet in the solar system?',
        hint: 'It\'s also the closest to the Sun.',
        type: 'click', answer: 'mercury',
        successMsg: 'Mercury is smaller than Earth\'s Moon in terms of diameter!'
    },
    {
        id: 'q_size_3', level: 3, category: 'Size',
        text: 'Which is the 2nd LARGEST planet?',
        hint: 'It\'s known for its beautiful ring system.',
        type: 'click', answer: 'saturn',
        successMsg: 'Saturn is 2nd largest — but the least dense! It would float on water.'
    },
    {
        id: 'q_size_4', level: 3, category: 'Size',
        text: 'Which planet is bigger: Uranus or Neptune?',
        hint: 'Compare their positions in the solar system — the one closer to Saturn is bigger.',
        type: 'choice',
        choices: ['uranus', 'neptune'],
        answer: 'uranus',
        successMsg: 'Uranus is slightly bigger than Neptune, but Neptune is more massive!'
    },

    // ── LEVEL 4: Features ─────────────────────────────────────
    {
        id: 'q_feat_1', level: 4, category: 'Features',
        text: 'Which planet has the most SPECTACULAR rings?',
        hint: 'Galileo first spotted them in 1610!',
        type: 'click', answer: 'saturn',
        successMsg: 'Saturn\'s rings are made of billions of ice and rock chunks!'
    },
    {
        id: 'q_feat_2', level: 4, category: 'Features',
        text: 'Which is the HOTTEST planet in the solar system?',
        hint: 'It\'s NOT the closest to the Sun! Thick atmosphere traps heat.',
        type: 'click', answer: 'venus',
        successMsg: 'Venus is 465°C — hot enough to melt lead! Its CO₂ atmosphere traps heat.'
    },
    {
        id: 'q_feat_3', level: 4, category: 'Features',
        text: 'Which planet spins SIDEWAYS on its axis?',
        hint: 'It\'s an ice giant — one of the outer planets.',
        type: 'click', answer: 'uranus',
        successMsg: 'Uranus is tilted 98°! It rolls around the Sun like a bowling ball.'
    },
    {
        id: 'q_feat_4', level: 4, category: 'Features',
        text: 'Which planet has the Great Red Spot — a storm larger than Earth?',
        hint: 'It\'s the biggest planet with a distinctive banded appearance.',
        type: 'click', answer: 'jupiter',
        successMsg: 'The Great Red Spot on Jupiter has been raging for over 400 years!'
    },
    {
        id: 'q_feat_5', level: 4, category: 'Features',
        text: 'Which planet has the STRONGEST winds in the solar system?',
        hint: 'Named after the Roman god of the sea.',
        type: 'click', answer: 'neptune',
        successMsg: 'Neptune\'s winds reach 2,100 km/h — faster than a fighter jet!'
    },
    {
        id: 'q_feat_6', level: 4, category: 'Features',
        text: 'Which planet is called the RED PLANET?',
        hint: 'It has iron oxide (rust) covering its surface.',
        type: 'click', answer: 'mars',
        successMsg: 'Mars is red because of iron rust! It also has the tallest volcano in the solar system.'
    },
    {
        id: 'q_feat_7', level: 4, category: 'Features',
        text: 'Which planet could FLOAT on water if there was a big enough ocean?',
        hint: 'It\'s the least dense planet — mostly made of gas.',
        type: 'choice',
        choices: ['saturn', 'jupiter', 'uranus', 'neptune'],
        answer: 'saturn',
        successMsg: 'Saturn is less dense than water — it would float in a giant bathtub!'
    },
    {
        id: 'q_feat_8', level: 4, category: 'Features',
        text: 'Which planet has the COLDEST recorded temperature at -224°C?',
        hint: 'It\'s an ice giant that spins sideways.',
        type: 'choice',
        choices: ['uranus', 'neptune', 'pluto', 'saturn'],
        answer: 'uranus',
        successMsg: 'Uranus is the coldest planet at -224°C — even colder than Neptune!'
    },

    // ── LEVEL 5: Moons ────────────────────────────────────────
    {
        id: 'q_moon_1', level: 5, category: 'Moons',
        text: 'Which planet has the MOST known moons?',
        hint: 'It has 146 known moons — more than any other!',
        type: 'choice',
        choices: ['saturn', 'jupiter', 'uranus', 'neptune'],
        answer: 'saturn',
        successMsg: 'Saturn has 146 known moons! Jupiter is close behind with 95.'
    },
    {
        id: 'q_moon_2', level: 5, category: 'Moons',
        text: 'Which planet has only ONE moon?',
        hint: 'We live on it! Our moon is called Luna.',
        type: 'click', answer: 'earth',
        successMsg: 'Earth has exactly 1 moon. It controls our tides and lights up the night sky!'
    },
    {
        id: 'q_moon_3', level: 5, category: 'Moons',
        text: 'Which inner planet has TWO small moons called Phobos and Deimos?',
        hint: 'It\'s the planet where NASA has rovers right now!',
        type: 'click', answer: 'mars',
        successMsg: 'Mars has two tiny moons — Phobos and Deimos! They look like captured asteroids.'
    },
    {
        id: 'q_moon_4', level: 5, category: 'Moons',
        text: 'Which two inner planets have NO moons at all?',
        hint: 'They are the first two planets from the Sun.',
        type: 'choice',
        choices: ['Mercury & Venus', 'Venus & Earth', 'Mercury & Mars', 'Earth & Mars'],
        answer: 'Mercury & Venus',
        answerIds: ['mercury', 'venus'],
        successMsg: 'Mercury and Venus are the only planets with zero moons!'
    },
    {
        id: 'q_moon_5', level: 5, category: 'Moons',
        text: 'Jupiter\'s moon Europa may have liquid water. What does that mean?',
        hint: 'Think about what\'s needed for life on Earth…',
        type: 'choice',
        choices: ['It might support life!', 'It has volcanoes', 'It has an atmosphere', 'It has rings'],
        answer: 'It might support life!',
        successMsg: 'Europa has a liquid ocean under its ice — scientists think it\'s one of the best places to look for alien life!'
    },

    // ── LEVEL 6: Fun Facts ────────────────────────────────────
    {
        id: 'q_fun_1', level: 6, category: 'Fun Facts',
        text: 'Which planet was discovered using MATH before it was seen through a telescope?',
        hint: 'Scientists noticed Uranus was being pulled by something invisible…',
        type: 'click', answer: 'neptune',
        successMsg: 'Neptune was predicted by mathematics in 1846 before anyone saw it!'
    },
    {
        id: 'q_fun_2', level: 6, category: 'Fun Facts',
        text: 'It may RAIN DIAMONDS inside which planet?',
        hint: 'It\'s an ice giant that spins sideways.',
        type: 'click', answer: 'uranus',
        successMsg: 'The pressure inside Uranus is so extreme that carbon atoms may form diamonds and rain down!'
    },
    {
        id: 'q_fun_3', level: 6, category: 'Fun Facts',
        text: 'On which planet does the Sun rise in the WEST?',
        hint: 'It spins backwards compared to most planets!',
        type: 'click', answer: 'venus',
        successMsg: 'Venus spins backwards! So the Sun rises in the west and sets in the east.'
    },
    {
        id: 'q_fun_4', level: 6, category: 'Fun Facts',
        text: 'Which planet has the SHORTEST day — just 10 hours long?',
        hint: 'It\'s the largest planet and spins very fast!',
        type: 'click', answer: 'jupiter',
        successMsg: 'Jupiter spins so fast that its day is only 10 hours — despite being the biggest planet!'
    },
    {
        id: 'q_fun_5', level: 6, category: 'Fun Facts',
        text: 'On which planet is Olympus Mons — the tallest volcano in the solar system?',
        hint: 'It\'s 3 times taller than Mount Everest!',
        type: 'click', answer: 'mars',
        successMsg: 'Olympus Mons on Mars is 21 km tall — 3× the height of Mount Everest!'
    },
    {
        id: 'q_fun_6', level: 6, category: 'Fun Facts',
        text: 'Which planet takes 165 Earth years to complete ONE orbit of the Sun?',
        hint: 'It\'s the outermost planet — very far from the Sun!',
        type: 'click', answer: 'neptune',
        successMsg: 'Neptune takes 165 years! It\'s completed less than one orbit since it was discovered in 1846.'
    },
];

// Group questions by level for progressive unlocking
const QUESTION_LEVELS = {
    1: QUESTIONS.filter(q => q.level === 1),
    2: QUESTIONS.filter(q => q.level === 2),
    3: QUESTIONS.filter(q => q.level === 3),
    4: QUESTIONS.filter(q => q.level === 4),
    5: QUESTIONS.filter(q => q.level === 5),
    6: QUESTIONS.filter(q => q.level === 6),
};

const CATEGORY_COLORS = {
    'Order':     { bg: 0x1565C0, text: '#90CAF9', label: '🔢 Order' },
    'Type':      { bg: 0x2E7D32, text: '#A5D6A7', label: '🧪 Type' },
    'Size':      { bg: 0x6A1B9A, text: '#CE93D8', label: '📏 Size' },
    'Features':  { bg: 0xE65100, text: '#FFCC80', label: '✨ Features' },
    'Moons':     { bg: 0x37474F, text: '#B0BEC5', label: '🌙 Moons' },
    'Fun Facts': { bg: 0x880E4F, text: '#F48FB1', label: '🎉 Fun Facts' },
};

const LEVEL_NAMES = {
    1: '🔢 Planet Order',
    2: '🧪 Planet Types',
    3: '📏 Planet Sizes',
    4: '✨ Planet Features',
    5: '🌙 Moons & More',
    6: '🎉 Fun Facts',
};

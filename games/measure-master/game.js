// ============================================================
// MEASURE MASTER - game.js
// Learn what each unit of measurement means with real-world
// examples, then test your knowledge with a quiz!
// Covers: mm, cm, inch, foot, yard, meter, km, mile
// ============================================================

// ==================== UNIT DATABASE ====================
// Each unit has real-world items so kids know WHEN to use it.
const UNITS = [
    {
        id: 'mm', name: 'Millimeter', abbr: 'mm',
        color: 0xE74C3C, tagline: 'Tinier than a pencil tip!',
        emoji: '🔬',
        items: [
            { emoji: '🐜', name: 'An ant',       detail: '~1–2 mm wide' },
            { emoji: '💧', name: 'A raindrop',   detail: '~2 mm wide' },
            { emoji: '💊', name: 'A tiny pill',  detail: '~3–5 mm thick' },
            { emoji: '🦟', name: 'Mosquito body',detail: '~4 mm long' }
        ]
    },
    {
        id: 'cm', name: 'Centimeter', abbr: 'cm',
        color: 0xE67E22, tagline: 'About as wide as your finger!',
        emoji: '🍇',
        items: [
            { emoji: '🍇', name: 'A grape',      detail: '~2 cm wide' },
            { emoji: '🖍️', name: 'A crayon',     detail: '~10 cm long' },
            { emoji: '🦷', name: 'A tooth',      detail: '~2 cm tall' },
            { emoji: '🔋', name: 'AA battery',   detail: '~5 cm tall' }
        ]
    },
    {
        id: 'in', name: 'Inch', abbr: 'in',
        color: 0xF1C40F, tagline: 'About as wide as your thumb!',
        emoji: '👍',
        items: [
            { emoji: '📎', name: 'A paperclip',   detail: '~1 inch long' },
            { emoji: '🪙', name: 'A quarter coin', detail: '~1 inch wide' },
            { emoji: '🍬', name: 'Candy bar',      detail: '~1 inch wide' },
            { emoji: '🖊️', name: 'A pen cap',      detail: '~2 inches long' }
        ]
    },
    {
        id: 'ft', name: 'Foot', abbr: 'ft',
        color: 0x27AE60, tagline: 'Same length as a ruler!',
        emoji: '📏',
        items: [
            { emoji: '📏', name: 'A ruler',        detail: 'Exactly 1 foot' },
            { emoji: '👟', name: 'Your shoe',      detail: '~1 foot long' },
            { emoji: '🎒', name: 'A backpack',     detail: '~1.5 feet tall' },
            { emoji: '🐕', name: 'Small dog',      detail: '~1.5 feet tall' }
        ]
    },
    {
        id: 'yd', name: 'Yard', abbr: 'yd',
        color: 0x2980B9, tagline: '3 rulers laid end to end!',
        emoji: '⚾',
        items: [
            { emoji: '⚾', name: 'Baseball bat',  detail: '~1 yard long' },
            { emoji: '🎸', name: 'A guitar',      detail: '~1 yard tall' },
            { emoji: '🚪', name: 'Door width',    detail: '~1 yard wide' },
            { emoji: '🛏️', name: 'Bed width',     detail: '~1 yard wide' }
        ]
    },
    {
        id: 'm', name: 'Meter', abbr: 'm',
        color: 0x8E44AD, tagline: 'About the height of a door!',
        emoji: '🚪',
        items: [
            { emoji: '🚪', name: 'Door height',   detail: '~2 meters tall' },
            { emoji: '🛁', name: 'A bathtub',     detail: '~1.5 meters long' },
            { emoji: '🧍', name: 'Tall adult',    detail: '~1.8 meters tall' },
            { emoji: '🚗', name: 'Car width',     detail: '~2 meters wide' }
        ]
    },
    {
        id: 'km', name: 'Kilometer', abbr: 'km',
        color: 0x16A085, tagline: '10 football fields in a row!',
        emoji: '🏫',
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
        items: [
            { emoji: '🏃', name: 'School mile run',  detail: 'Standard 1-mile race' },
            { emoji: '🛣️', name: 'Highway markers',  detail: '1 mile apart' },
            { emoji: '🏘️', name: 'Long walk around', detail: '~1 mile loop' },
            { emoji: '⚽', name: '17 soccer fields', detail: '~1 mile end to end' }
        ]
    }
];

// Size-order context shown on each unit card (hint for conversions later)
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
    { emoji: '🐜', name: 'An ant',            unit: 'mm', hint: 'An ant is tiny — about 1–2 mm wide!' },
    { emoji: '💧', name: 'A raindrop',        unit: 'mm', hint: 'Raindrops are only about 2 mm wide!' },
    { emoji: '💊', name: 'A tiny pill',       unit: 'mm', hint: 'A small pill is just a few mm thick!' },
    { emoji: '🍇', name: 'A grape',           unit: 'cm', hint: 'A grape is about 2 cm wide!' },
    { emoji: '🖍️', name: 'A crayon',          unit: 'cm', hint: 'A crayon is about 10 cm long!' },
    { emoji: '🦷', name: 'A tooth',           unit: 'cm', hint: 'A tooth is about 2 cm tall!' },
    { emoji: '📎', name: 'A paperclip',       unit: 'in', hint: 'A paperclip is about 1 inch long!' },
    { emoji: '🪙', name: 'A quarter coin',    unit: 'in', hint: 'A quarter is about 1 inch wide!' },
    { emoji: '📏', name: 'A ruler',           unit: 'ft', hint: 'A ruler is exactly 1 foot = 12 inches!' },
    { emoji: '👟', name: 'A shoe',            unit: 'ft', hint: 'A shoe is about 1 foot long!' },
    { emoji: '🎒', name: 'A backpack',        unit: 'ft', hint: 'A backpack is about 1.5 feet tall!' },
    { emoji: '⚾', name: 'A baseball bat',    unit: 'yd', hint: 'A baseball bat is about 1 yard long!' },
    { emoji: '🎸', name: 'A guitar',          unit: 'yd', hint: 'A guitar is about 1 yard tall!' },
    { emoji: '🚪', name: 'Door height',       unit: 'm',  hint: 'A door is about 2 meters tall!' },
    { emoji: '🛁', name: 'A bathtub',         unit: 'm',  hint: 'A bathtub is about 1.5 meters long!' },
    { emoji: '🚗', name: 'Car width',         unit: 'm',  hint: 'A car is about 2 meters wide!' },
    { emoji: '🏫', name: 'Walk to school',    unit: 'km', hint: 'School is usually 1–2 km away!' },
    { emoji: '⚽', name: '10 soccer fields',  unit: 'km', hint: '10 fields end to end = about 1 km!' },
    { emoji: '🏃', name: 'School mile run',   unit: 'mi', hint: 'The mile run is exactly 1 mile!' },
    { emoji: '🛣️', name: 'Highway markers',   unit: 'mi', hint: 'Highway mile markers are 1 mile apart!' }
];

// ==================== GAME SETUP ====================
const GameState = {
    MENU:        'menu',
    EXPLORE:     'explore',
    QUIZ:        'quiz',
    QUIZ_RESULT: 'quiz_result'
};

let currentState    = GameState.MENU;
let gameObjects     = [];       // all display objects for current screen
let currentUnitIndex = 0;
let quizQuestions   = [];
let quizIndex       = 0;
let quizScore       = 0;
let answerLocked    = false;
let sceneRef        = null;

const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: 0xF0F4FF,
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

// Lighten a Phaser integer color for hover states
function lighten(hex, amt = 30) {
    const r = Math.min(255, ((hex >> 16) & 0xFF) + amt);
    const g = Math.min(255, ((hex >>  8) & 0xFF) + amt);
    const b = Math.min(255, ( hex        & 0xFF) + amt);
    return (r << 16) | (g << 8) | b;
}

// Convert Phaser int color → CSS hex string
function toCss(hex) {
    return '#' + hex.toString(16).padStart(6, '0');
}

// Draw a filled rounded-rect button with hover + click
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

    // Soft blue-white background
    const bg = track(s.add.graphics());
    bg.fillStyle(0xF0F4FF, 1);
    bg.fillRect(0, 0, W, H);

    // Decorative unit pills along the top
    const unitData = UNITS.map(u => ({ abbr: u.abbr, color: u.color }));
    const pillW = Math.floor((W - 40) / unitData.length);
    unitData.forEach((u, i) => {
        const px = 20 + i * pillW + pillW / 2;
        const pg = track(s.add.graphics());
        pg.fillStyle(u.color, 0.18);
        pg.fillRoundedRect(px - 36, 12, 72, 28, 14);
        track(s.add.text(px, 26, u.abbr, {
            fontSize: '15px', fontFamily: 'Arial', fontStyle: 'bold',
            color: toCss(u.color)
        }).setOrigin(0.5));
    });

    // Title
    track(s.add.text(W/2, 105, '📏 Measure Master', {
        fontSize: '50px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#2D3436'
    }).setOrigin(0.5));

    track(s.add.text(W/2, 158, 'Learn what each unit of measurement really means!', {
        fontSize: '19px', fontFamily: 'Arial, sans-serif', color: '#636E72'
    }).setOrigin(0.5));

    // Thin divider
    const div = track(s.add.graphics());
    div.lineStyle(1, 0xDDD6FE, 1);
    div.lineBetween(180, 182, 720, 182);

    // Three mode cards
    const modes = [
        {
            x: 200, color: 0x5F27CD,
            emoji: '🔍', title: 'Explore Units',
            sub: 'See each unit with\nreal-world examples',
            action: () => { currentUnitIndex = 0; showExplore(); }
        },
        {
            x: 450, color: 0x0984E3,
            emoji: '📊', title: 'Sort Challenge',
            sub: 'Order units from\nsmallest to largest',
            action: () => showSort()
        },
        {
            x: 700, color: 0x00B894,
            emoji: '❓', title: 'Quiz Time!',
            sub: 'Test which unit fits\neach measurement',
            action: () => startQuiz()
        }
    ];

    modes.forEach(m => {
        const cw = 210, ch = 260, cy = 215;

        // Card shadow
        const sh = track(s.add.graphics());
        sh.fillStyle(0x000000, 0.08);
        sh.fillRoundedRect(m.x - cw/2 + 4, cy + 4, cw, ch, 16);

        // Card body
        const card = track(s.add.graphics());
        const drawCard = (c) => {
            card.clear();
            card.fillStyle(c, 1);
            card.fillRoundedRect(m.x - cw/2, cy, cw, ch, 16);
        };
        drawCard(m.color);

        track(s.add.text(m.x, cy + 52, m.emoji, { fontSize: '48px' }).setOrigin(0.5));
        track(s.add.text(m.x, cy + 115, m.title, {
            fontSize: '21px', fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold', color: '#FFFFFF'
        }).setOrigin(0.5));
        track(s.add.text(m.x, cy + 160, m.sub, {
            fontSize: '14px', fontFamily: 'Arial, sans-serif',
            color: '#FFFFFF', alpha: 0.85, align: 'center'
        }).setOrigin(0.5));

        // Play button on card
        const pb = track(s.add.graphics());
        pb.fillStyle(0xFFFFFF, 0.22);
        pb.fillRoundedRect(m.x - 65, cy + 200, 130, 38, 10);
        track(s.add.text(m.x, cy + 219, 'Play →', {
            fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
        }).setOrigin(0.5));

        const zone = track(s.add.zone(m.x, cy + ch/2, cw, ch)
            .setInteractive({ cursor: 'pointer' }));
        zone.on('pointerdown', m.action);
        zone.on('pointerover',  () => drawCard(lighten(m.color, 20)));
        zone.on('pointerout',   () => drawCard(m.color));
    });

    // Footer
    track(s.add.text(W/2, 620, 'mm · cm · inches · feet · yards · meters · km · miles', {
        fontSize: '13px', fontFamily: 'Arial', color: '#B2BEC3'
    }).setOrigin(0.5));
}

// ==================== EXPLORE SCREEN ====================

function showExplore() {
    clearScreen();
    currentState = GameState.EXPLORE;
    const s = sceneRef;
    const W = 900, H = 650;
    const unit = UNITS[currentUnitIndex];

    // Background
    const bg = track(s.add.graphics());
    bg.fillStyle(0xF8F9FF, 1);
    bg.fillRect(0, 0, W, H);

    // Coloured top bar
    const bar = track(s.add.graphics());
    bar.fillStyle(unit.color, 1);
    bar.fillRect(0, 0, W, 82);

    // Back button
    track(s.add.text(28, 41, '← Menu', {
        fontSize: '17px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0, 0.5).setInteractive({ cursor: 'pointer' })
     .on('pointerdown', () => showMenu()));

    // "N / 8" counter
    track(s.add.text(W - 24, 41, `${currentUnitIndex + 1} / ${UNITS.length}`, {
        fontSize: '15px', fontFamily: 'Arial', color: 'rgba(255,255,255,0.8)'
    }).setOrigin(1, 0.5));

    // Unit name in bar
    track(s.add.text(W/2, 41, `${unit.emoji}  ${unit.name}  (${unit.abbr})`, {
        fontSize: '26px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#FFFFFF'
    }).setOrigin(0.5));

    // ── Main info card ──────────────────────────────────────
    const card = track(s.add.graphics());
    card.fillStyle(0xFFFFFF, 1);
    card.fillRoundedRect(55, 96, W - 110, 178, 14);
    card.lineStyle(2, unit.color, 0.25);
    card.strokeRoundedRect(55, 96, W - 110, 178, 14);

    // Big abbreviation on left
    track(s.add.text(170, 185, unit.abbr, {
        fontSize: '76px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: toCss(unit.color)
    }).setOrigin(0.5));

    // Tagline + conversion note on right
    track(s.add.text(520, 140, unit.tagline, {
        fontSize: '21px', fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold', color: '#2D3436'
    }).setOrigin(0.5));

    track(s.add.text(520, 178, SIZE_CONTEXT[unit.id], {
        fontSize: '14px', fontFamily: 'Arial', color: '#636E72',
        align: 'center', wordWrap: { width: 600 }
    }).setOrigin(0.5));

    // "Used to measure:" label
    track(s.add.text(W/2, 237, '🧭  Used to measure:', {
        fontSize: '14px', fontFamily: 'Arial', color: '#636E72', fontStyle: 'italic'
    }).setOrigin(0.5));

    // ── 4 item cards ────────────────────────────────────────
    const iW = 182, iH = 148;
    const gap = 10;
    const totalItemW = 4 * iW + 3 * gap;
    const iStartX = (W - totalItemW) / 2;
    const iY = 256;

    unit.items.forEach((item, i) => {
        const cx = iStartX + i * (iW + gap) + iW / 2;

        const ic = track(s.add.graphics());
        ic.fillStyle(unit.color, 0.10);
        ic.fillRoundedRect(cx - iW/2, iY, iW, iH, 12);
        ic.lineStyle(2, unit.color, 0.25);
        ic.strokeRoundedRect(cx - iW/2, iY, iW, iH, 12);

        track(s.add.text(cx, iY + 34, item.emoji, { fontSize: '34px' }).setOrigin(0.5));

        track(s.add.text(cx, iY + 78, item.name, {
            fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold',
            color: '#2D3436', align: 'center', wordWrap: { width: iW - 14 }
        }).setOrigin(0.5));

        track(s.add.text(cx, iY + 112, item.detail, {
            fontSize: '12px', fontFamily: 'Arial',
            color: toCss(unit.color), align: 'center'
        }).setOrigin(0.5));
    });

    // ── Navigation arrows ────────────────────────────────────
    const arrowStyle = {
        fontSize: '28px', color: toCss(unit.color)
    };

    if (currentUnitIndex > 0) {
        track(s.add.text(28, 330, '◀', arrowStyle)
            .setOrigin(0.5).setInteractive({ cursor: 'pointer' })
            .on('pointerdown', () => { currentUnitIndex--; showExplore(); }));
    }
    if (currentUnitIndex < UNITS.length - 1) {
        track(s.add.text(W - 28, 330, '▶', arrowStyle)
            .setOrigin(0.5).setInteractive({ cursor: 'pointer' })
            .on('pointerdown', () => { currentUnitIndex++; showExplore(); }));
    }

    // ── Progress dots ────────────────────────────────────────
    const dotY = 428;
    UNITS.forEach((u, i) => {
        const dotX = W/2 - (UNITS.length * 22) / 2 + i * 22 + 11;
        const isActive = i === currentUnitIndex;
        const dot = track(s.add.graphics());
        dot.fillStyle(isActive ? unit.color : 0xCCCCCC, 1);
        dot.fillCircle(dotX, dotY, isActive ? 8 : 5);
        const dz = track(s.add.zone(dotX, dotY, 20, 20).setInteractive({ cursor: 'pointer' }));
        dz.on('pointerdown', () => { currentUnitIndex = i; showExplore(); });
    });

    // ── Bottom nav buttons ────────────────────────────────────
    const isFirst = currentUnitIndex === 0;
    const isLast  = currentUnitIndex === UNITS.length - 1;

    if (!isFirst) {
        makeBtn(W/2 - 165, 498, 190, 48, 0x636E72, '◀  Previous', '17px',
            () => { currentUnitIndex--; showExplore(); });
    }

    makeBtn(W/2, 560, 200, 46, 0x0984E3, '❓  Take Quiz!', '17px', () => startQuiz());

    if (!isLast) {
        makeBtn(W/2 + 165, 498, 190, 48, unit.color, 'Next  ▶', '17px',
            () => { currentUnitIndex++; showExplore(); });
    } else {
        makeBtn(W/2 + 165, 498, 190, 48, 0x00B894, '✅  All Done!', '17px', () => startQuiz());
    }
}

// ==================== SORT CHALLENGE ====================
// Drag-and-drop sorting — order units smallest → largest
// Uses click-to-select + click-to-place approach (no Phaser drag needed)

const CORRECT_ORDER = ['mm', 'cm', 'in', 'ft', 'yd', 'm', 'km', 'mi'];

let sortState = {
    slots: [],          // unitId in each slot position (null = empty)
    bank:  [],          // unitIds still in the bank (unplaced)
    selected: null,     // unitId currently selected from bank
    slotObjects: [],    // graphics refs for slot zones
    bankObjects: [],    // graphics refs for bank cards
};

function showSort() {
    clearScreen();
    const s = sceneRef;
    const W = 900, H = 650;

    // Fresh sort state — shuffle the bank
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
    bg.fillStyle(0xF0F4FF, 1);
    bg.fillRect(0, 0, W, H);

    // Header
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

    // ── 8 answer SLOTS (top row) ──────────────────────────────
    const slotW = 88, slotH = 92;
    const slotGap = 8;
    const totalSlotW = 8 * slotW + 7 * slotGap;
    const slotStartX = (W - totalSlotW) / 2;
    const slotY = 110;

    // Position labels beneath slots
    const posLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

    for (let i = 0; i < 8; i++) {
        const sx = slotStartX + i * (slotW + slotGap);
        const cx = sx + slotW / 2;

        const filledUnit = sortState.slots[i]
            ? UNITS.find(u => u.id === sortState.slots[i])
            : null;

        const slotG = track(s.add.graphics());
        if (filledUnit) {
            slotG.fillStyle(filledUnit.color, 1);
            slotG.fillRoundedRect(sx, slotY, slotW, slotH, 10);
            track(s.add.text(cx, slotY + 28, filledUnit.emoji, { fontSize: '26px' }).setOrigin(0.5));
            track(s.add.text(cx, slotY + 60, filledUnit.abbr, {
                fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#FFFFFF'
            }).setOrigin(0.5));

            // Click filled slot to remove back to bank
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

            // Click empty slot to place selected unit
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

        // Position label
        track(s.add.text(cx, slotY + slotH + 10, posLabels[i], {
            fontSize: '12px', fontFamily: 'Arial', color: '#888'
        }).setOrigin(0.5));
    }

    // ── BANK cards (bottom — unplaced units) ─────────────────
    track(s.add.text(W/2, 248, 'Tap a unit below to select it, then tap a slot above to place it:', {
        fontSize: '14px', fontFamily: 'Arial', color: '#636E72', fontStyle: 'italic'
    }).setOrigin(0.5));

    const bankW = 88, bankH = 90;
    const bankGap = 10;
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

    // ── Selected unit indicator ───────────────────────────────
    if (sortState.selected) {
        const su = UNITS.find(u => u.id === sortState.selected);
        track(s.add.text(W/2, 385, `✋  ${su.name} selected — now tap an empty slot above!`, {
            fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold',
            color: toCss(su.color)
        }).setOrigin(0.5));
    }

    // ── Check / Reset buttons ─────────────────────────────────
    const allPlaced = sortState.slots.every(slot => slot !== null);
    if (allPlaced) {
        makeBtn(W/2 - 120, 435, 200, 52, 0x00B894, '✅  Check Order!', '19px', checkSort);
    }
    makeBtn(W/2 + 130, 435, 190, 52, 0xE74C3C, '🔄  Reset', '19px', () => showSort());
    makeBtn(W/2 - 340, 435, 150, 52, 0x636E72, '← Menu', '17px', () => showMenu());

    // Hint (show correct order as tiny labels)
    track(s.add.text(W/2, 510, 'Hint: Think about size — which is the tiniest? Which is the biggest?', {
        fontSize: '13px', fontFamily: 'Arial', color: '#B2BEC3', fontStyle: 'italic'
    }).setOrigin(0.5));
}

function checkSort() {
    const playerOrder = sortState.slots;
    let correct = 0;
    CORRECT_ORDER.forEach((uid, i) => {
        if (playerOrder[i] === uid) correct++;
    });

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

    // Show the correct order
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

    track(s.add.text(W/2, 420, 'Green = you had it right · Grey = wrong position', {
        fontSize: '13px', fontFamily: 'Arial', color: '#B2BEC3', fontStyle: 'italic'
    }).setOrigin(0.5));

    makeBtn(W/2 - 155, 500, 210, 54, 0x5F27CD, '🔄  Try Again', '19px', () => showSort());
    makeBtn(W/2 + 155, 500, 210, 54, 0x00B894, '❓  Take Quiz', '19px', () => startQuiz());
    makeBtn(W/2, 570, 180, 44, 0x636E72, '🏠  Menu', '17px', () => showMenu());
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
    if (quizIndex >= quizQuestions.length) {
        showQuizResult();
        return;
    }
    clearScreen();
    currentState = GameState.QUIZ;
    const s = sceneRef;
    const W = 900, H = 650;
    const q = quizQuestions[quizIndex];

    // Background
    const bg = track(s.add.graphics());
    bg.fillStyle(0xF8F9FF, 1);
    bg.fillRect(0, 0, W, H);

    // Progress bar
    const barBg = track(s.add.graphics());
    barBg.fillStyle(0xE0E0E0, 1);
    barBg.fillRoundedRect(50, 18, W - 100, 10, 5);

    const pct = quizIndex / quizQuestions.length;
    if (pct > 0) {
        const barFill = track(s.add.graphics());
        barFill.fillStyle(0x5F27CD, 1);
        barFill.fillRoundedRect(50, 18, (W - 100) * pct, 10, 5);
    }

    track(s.add.text(50, 14, `⭐ ${quizScore}`, {
        fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold', color: '#F59E0B'
    }).setOrigin(0, 1));
    track(s.add.text(W - 50, 14, `${quizIndex + 1} / ${quizQuestions.length}`, {
        fontSize: '14px', fontFamily: 'Arial', color: '#636E72'
    }).setOrigin(1, 1));

    // Question prompt
    track(s.add.text(W/2, 64, 'Which unit would you use to measure...', {
        fontSize: '21px', fontFamily: 'Arial, sans-serif', color: '#636E72'
    }).setOrigin(0.5));

    // Item card
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

    // 4 answer choices (correct + 3 wrong)
    const choices = buildChoices(q.unit);
    const bW = 185, bH = 82;
    const bGap = 12;
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

    // Hint button
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

    // ── Unit reference strip at bottom ────────────────────────
    // Shows all 8 units as small chips so kid can see the full picture
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

    // Flash the chosen button green/red
    btn.clear();
    btn.fillStyle(correct ? 0x10B981 : 0xEF4444, 1);
    btn.fillRoundedRect(bx - bW/2, bY, bW, bH, 12);

    // Feedback text
    const fbText = correct
        ? `✅  Correct!  ${question.hint}`
        : `❌  Not quite!  ${question.hint}`;
    const fb = track(s.add.text(W_CONST/2, 530, fbText, {
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

const W_CONST = 900; // used in handleAnswer closure

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
    if      (pct >= 90) { medal = '🏆'; msg = 'Outstanding!';     col = '#F59E0B'; }
    else if (pct >= 70) { medal = '🌟'; msg = 'Great job!';        col = '#10B981'; }
    else if (pct >= 50) { medal = '👍'; msg = 'Good effort!';      col = '#3B82F6'; }
    else                { medal = '💪'; msg = 'Keep practicing!';  col = '#EF4444'; }

    track(s.add.text(W/2, 105, medal, { fontSize: '80px' }).setOrigin(0.5));
    track(s.add.text(W/2, 200, msg, {
        fontSize: '44px', fontFamily: 'Arial', fontStyle: 'bold', color: col
    }).setOrigin(0.5));
    track(s.add.text(W/2, 262, `You got ${quizScore} out of ${total} correct  (${pct}%)`, {
        fontSize: '22px', fontFamily: 'Arial', color: '#636E72'
    }).setOrigin(0.5));

    // Score bar
    const barBg = track(s.add.graphics());
    barBg.fillStyle(0xE0E0E0, 1);
    barBg.fillRoundedRect(200, 298, 500, 18, 9);
    const barFill = track(s.add.graphics());
    barFill.fillStyle(0x5F27CD, 1);
    barFill.fillRoundedRect(200, 298, 500 * (quizScore / total), 18, 9);

    makeBtn(W/2 - 175, 400, 210, 58, 0x5F27CD, '🔄  Try Again',    '19px', () => startQuiz());
    makeBtn(W/2 + 175, 400, 210, 58, 0x0984E3, '🔍  Explore Units','19px', () => { currentUnitIndex = 0; showExplore(); });
    makeBtn(W/2,       490, 210, 52, 0x636E72, '🏠  Main Menu',    '18px', () => showMenu());
}

// ============================================================
// DINO HUNTER - Educational Dinosaur Shooting Game
// Pick your target dino and shoot! Learn facts about others.
// ============================================================

// ── Colour palette ────────────────────────────────────────
const DH = {
    sky:        0x87CEEB,
    skyBot:     0xB0E0E6,
    ground:     0x8B7355,
    grass:      0x5D8A3C,
    grassDark:  0x4A7030,
    mountain:   0x9B8977,
    ui:         0x2D1B69,
    panel:      0xFFF8E7,
    panelBorder:0xD4A017,
    hit:        0xFF4444,
    miss:       0x888888,
    crosshair:  0xFF2222,
    bullet:     0xFFD700,
};

// ── Dinosaur database ─────────────────────────────────────
const DINOS = [
    {
        id: 'trex',
        name: 'Tyrannosaurus Rex',
        nick: 'T-Rex',
        diet: 'Carnivore 🥩',
        period: 'Late Cretaceous (68–66 Ma)',
        length: '~12 m (40 ft)',
        weight: '8–14 tonnes',
        found: 'North America',
        bodyColor: 0xE07832,
        darkColor:  0xB05A1A,
        facts: [
            '🦷 T-Rex had 60 banana-sized teeth!',
            '💪 Its bite was the strongest of any land animal.',
            '👀 T-Rex had excellent colour vision.',
            '🍖 It could eat 230 kg of meat in one bite!',
        ],
        emoji: '🦖',
    },
    {
        id: 'triceratops',
        name: 'Triceratops',
        nick: 'Trike',
        diet: 'Herbivore 🌿',
        period: 'Late Cretaceous (68–66 Ma)',
        length: '~9 m (30 ft)',
        weight: '6–12 tonnes',
        found: 'North America',
        bodyColor: 0x4CAF50,
        darkColor:  0x2E7D32,
        facts: [
            '🪙 Its frill may have been used for showing off!',
            '🌿 Triceratops ate tough plants with 800 teeth.',
            '🦏 It was as heavy as two elephants!',
            '🤼 It used its horns to fight T-Rex.',
        ],
        emoji: '🦕',
    },
    {
        id: 'brachiosaurus',
        name: 'Brachiosaurus',
        nick: 'Brachio',
        diet: 'Herbivore 🌿',
        period: 'Late Jurassic (154–153 Ma)',
        length: '~26 m (85 ft)',
        weight: '30–60 tonnes',
        found: 'North America, Africa',
        bodyColor: 0x26A69A,
        darkColor:  0x00796B,
        facts: [
            '🏗️ It was taller than a 4-storey building!',
            '🌿 Ate around 400 kg of plants every day.',
            '❤️ Its heart weighed about 400 kg.',
            '🦒 Like a giant giraffe — neck first!',
        ],
        emoji: '🦕',
    },
    {
        id: 'velociraptor',
        name: 'Velociraptor',
        nick: 'Raptor',
        diet: 'Carnivore 🥩',
        period: 'Late Cretaceous (75–71 Ma)',
        length: '~2 m (6.5 ft)',
        weight: '~15 kg',
        found: 'Mongolia, China',
        bodyColor: 0x9C27B0,
        darkColor:  0x6A1B9A,
        facts: [
            '🐦 Velociraptors had feathers like a bird!',
            '🧠 They were very smart — hunted in packs.',
            '🦅 The real raptor was only turkey-sized.',
            '🗡️ Their sickle claw was for pinning prey.',
        ],
        emoji: '🦖',
    },
    {
        id: 'stegosaurus',
        name: 'Stegosaurus',
        nick: 'Stego',
        diet: 'Herbivore 🌿',
        period: 'Late Jurassic (155–150 Ma)',
        length: '~9 m (30 ft)',
        weight: '~5 tonnes',
        found: 'North America',
        bodyColor: 0xE53935,
        darkColor:  0xB71C1C,
        facts: [
            '🔮 Its brain was the size of a walnut!',
            '🏳️ The back plates may have changed colour.',
            '🌡️ Plates may have helped control body heat.',
            '⚔️ Its spiked tail was called a "thagomizer".',
        ],
        emoji: '🦕',
    },
    {
        id: 'pteranodon',
        name: 'Pteranodon',
        nick: 'Ptero',
        diet: 'Piscivore 🐟',
        period: 'Late Cretaceous (86–84 Ma)',
        length: '~1.8 m, wingspan ~7 m',
        weight: '~25 kg',
        found: 'North America',
        bodyColor: 0x1E88E5,
        darkColor:  0x1565C0,
        facts: [
            '✈️ Wingspan wider than a small airplane!',
            '🐟 Scooped fish from the ocean like a pelican.',
            '🦴 Despite the name, it was NOT a dinosaur.',
            '🪶 It was light as a large eagle.',
        ],
        emoji: '🦅',
    },
    {
        id: 'ankylosaurus',
        name: 'Ankylosaurus',
        nick: 'Anky',
        diet: 'Herbivore 🌿',
        period: 'Late Cretaceous (68–66 Ma)',
        length: '~6–8 m (20–26 ft)',
        weight: '~6 tonnes',
        found: 'North America',
        bodyColor: 0x795548,
        darkColor:  0x4E342E,
        facts: [
            '🛡️ Its armour was tougher than bone!',
            '🔨 Club tail could break a T-Rex\'s leg.',
            '🐢 Basically a walking tank covered in spikes.',
            '🌿 Low rider — ate plants close to the ground.',
        ],
        emoji: '🦕',
    },
    {
        id: 'spinosaurus',
        name: 'Spinosaurus',
        nick: 'Spino',
        diet: 'Carnivore 🥩',
        period: 'Cretaceous (112–97 Ma)',
        length: '~14–18 m (46–59 ft)',
        weight: '~7–20 tonnes',
        found: 'North Africa',
        bodyColor: 0xF9A825,
        darkColor:  0xF57F17,
        facts: [
            '🏆 Possibly the largest predatory dino ever!',
            '🏊 It was a semi-aquatic swimmer.',
            '🐊 Had a crocodile-like skull for catching fish.',
            '⛵ Its sail may have been a hump for fat storage.',
        ],
        emoji: '🦖',
    },
    {
        id: 'diplodocus',
        name: 'Diplodocus',
        nick: 'Diplo',
        diet: 'Herbivore 🌿',
        period: 'Late Jurassic (154–152 Ma)',
        length: '~27 m (90 ft)',
        weight: '~12–17 tonnes',
        found: 'North America',
        bodyColor: 0x7CB342,
        darkColor:  0x558B2F,
        facts: [
            '📏 One of the longest dinos ever discovered!',
            '🌿 Used its long neck to reach low-lying ferns.',
            '🎵 Could crack its tail like a whip — super sonic!',
            '🦷 Had only pencil-like teeth for raking leaves.',
        ],
        emoji: '🦕',
    },
    {
        id: 'parasaurolophus',
        name: 'Parasaurolophus',
        nick: 'Para',
        diet: 'Herbivore 🌿',
        period: 'Late Cretaceous (76–73 Ma)',
        length: '~10 m (33 ft)',
        weight: '~2.5 tonnes',
        found: 'North America',
        bodyColor: 0xEC407A,
        darkColor:  0xC2185B,
        facts: [
            '🎺 Its crest worked like a trombone — could HONK!',
            '🌿 One of the most common duck-billed dinos.',
            '👂 The crest may have helped it recognise family.',
            '🏃 Could run on two or four legs.',
        ],
        emoji: '🦕',
    },
];

// ── Dino SVG-style drawing ─────────────────────────────────
// Each dino is drawn onto a 120×80 Phaser Graphics texture.
// We use ellipses + rects for the body parts and a name label.

function drawDinoTexture(scene, dino) {
    const key  = `dino_${dino.id}`;
    if (scene.textures.exists(key)) return key;

    const W = 120, H = 80;
    const g = scene.add.graphics();

    const body  = dino.bodyColor;
    const dark  = dino.darkColor;
    const light = 0xFFFFFF;

    g.fillStyle(body, 1);
    g.lineStyle(2, dark, 1);

    switch (dino.id) {
        case 'trex':           drawTrex(g, body, dark); break;
        case 'triceratops':    drawTriceratops(g, body, dark); break;
        case 'brachiosaurus':  drawBrachiosaurus(g, body, dark); break;
        case 'velociraptor':   drawVelociraptor(g, body, dark); break;
        case 'stegosaurus':    drawStegosaurus(g, body, dark); break;
        case 'pteranodon':     drawPteranodon(g, body, dark); break;
        case 'ankylosaurus':   drawAnkylosaurus(g, body, dark); break;
        case 'spinosaurus':    drawSpinosaurus(g, body, dark); break;
        case 'diplodocus':     drawDiplodocus(g, body, dark); break;
        case 'parasaurolophus':drawParasaurolophus(g, body, dark); break;
    }

    g.generateTexture(key, W, H);
    g.destroy();
    return key;
}

// --- Individual draw functions (all fit within 120×80) ---

function drawTrex(g, body, dark) {
    // tail
    g.fillStyle(body); g.fillTriangle(0,55, 28,45, 20,60);
    // body
    g.fillStyle(body); g.fillEllipse(58,52,76,40);
    g.strokeEllipse(58,52,76,40);
    // belly lighter
    g.fillStyle(0xFFDDAA,0.5); g.fillEllipse(58,58,55,20);
    // neck
    g.fillStyle(body); g.fillRect(72,25,18,28);
    g.strokeRect(72,25,18,28);
    // head
    g.fillStyle(body); g.fillEllipse(92,24,40,26);
    g.strokeEllipse(92,24,40,26);
    // jaw
    g.fillStyle(body); g.fillRect(80,28,35,10);
    // teeth
    g.fillStyle(0xFFFFFF); for(let i=0;i<5;i++){ g.fillRect(82+i*6,32,4,5);}
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(95,20,5);
    g.fillStyle(0x222222); g.fillCircle(96,20,3);
    // tiny arms
    g.fillStyle(body); g.fillRect(75,42,10,8); g.fillRect(72,49,8,4);
    // legs
    g.fillStyle(dark); g.fillRect(50,70,14,12); g.fillRect(68,70,14,12);
    // feet
    g.fillStyle(dark); g.fillRect(46,80,20,4); g.fillRect(64,80,20,4);
}

function drawTriceratops(g, body, dark) {
    // body
    g.fillStyle(body); g.fillEllipse(55,52,80,38);
    g.strokeEllipse(55,52,80,38);
    g.fillStyle(0xAAFFAA,0.4); g.fillEllipse(55,58,55,20);
    // frill (behind head)
    g.fillStyle(dark,0.6); g.fillEllipse(85,28,36,32);
    g.fillStyle(body); g.fillEllipse(88,32,28,24);
    // head
    g.fillStyle(body); g.fillEllipse(96,38,32,24);
    g.strokeEllipse(96,38,32,24);
    // beak
    g.fillStyle(0xFFCC44); g.fillTriangle(110,37,118,41,110,45);
    // 3 horns
    g.fillStyle(0xEEDDAA);
    g.fillTriangle(108,22,104,10,100,22); // top horn
    g.fillTriangle(105,25,101,15,97,25); // mid horn
    g.fillTriangle(100,35,96,26,92,35); // nose horn
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(99,35,4);
    g.fillStyle(0x222222); g.fillCircle(100,35,2.5);
    // legs
    g.fillStyle(dark);
    g.fillRect(35,68,12,14); g.fillRect(52,68,12,14);
    g.fillRect(63,68,12,14); g.fillRect(78,68,12,14);
    // tail
    g.fillStyle(body); g.fillTriangle(15,45,28,50,20,58);
}

function drawBrachiosaurus(g, body, dark) {
    // body (compact to fit)
    g.fillStyle(body); g.fillEllipse(52,60,60,30);
    g.strokeEllipse(52,60,60,30);
    // long neck going up-right
    g.fillStyle(body); g.fillRect(68,14,14,48);
    g.strokeRect(68,14,14,48);
    // head at top
    g.fillStyle(body); g.fillEllipse(82,10,28,16);
    g.strokeEllipse(82,10,28,16);
    // nostril bumps
    g.fillStyle(dark,0.5); g.fillCircle(88,7,3);
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(87,9,4);
    g.fillStyle(0x222222); g.fillCircle(88,9,2.5);
    // tail
    g.fillStyle(body); g.fillTriangle(22,55,36,58,26,65);
    // legs (4 chunky)
    g.fillStyle(dark);
    g.fillRect(32,72,10,10); g.fillRect(46,72,10,10);
    g.fillRect(60,72,10,10); g.fillRect(74,72,10,10);
}

function drawVelociraptor(g, body, dark) {
    // tail (long, angled)
    g.fillStyle(body); g.fillTriangle(10,48,36,42,22,52);
    // body (lean)
    g.fillStyle(body); g.fillEllipse(62,50,64,30);
    g.strokeEllipse(62,50,64,30);
    // feathers on back (small spikes)
    g.fillStyle(dark,0.7);
    for(let i=0;i<5;i++){g.fillTriangle(42+i*8,36,46+i*8,26,50+i*8,36);}
    // neck
    g.fillStyle(body); g.fillRect(78,26,12,26);
    // head (smaller, snappy)
    g.fillStyle(body); g.fillEllipse(94,22,34,20);
    g.strokeEllipse(94,22,34,20);
    // mouth/jaw
    g.fillStyle(body); g.fillRect(82,26,30,8);
    g.fillStyle(0xFFFFFF); for(let i=0;i<4;i++){g.fillRect(84+i*6,29,4,5);}
    // eye
    g.fillStyle(0xFFFF00); g.fillCircle(94,19,5);
    g.fillStyle(0x111111); g.fillCircle(94,19,3);
    // arm with claw
    g.fillStyle(dark); g.fillRect(74,44,12,8);
    g.fillTriangle(74,45,68,50,72,52);
    // sickle claw leg
    g.fillStyle(dark); g.fillRect(58,62,10,14); g.fillRect(74,62,10,14);
    g.fillTriangle(56,62,50,55,54,63); // sickle claw
}

function drawStegosaurus(g, body, dark) {
    // tail with spikes
    g.fillStyle(body); g.fillTriangle(10,50,30,48,18,60);
    g.fillStyle(0xFFCC44);
    g.fillTriangle(12,42,8,30,16,42); g.fillTriangle(20,40,16,28,24,40);
    // body
    g.fillStyle(body); g.fillEllipse(58,56,76,38);
    g.strokeEllipse(58,56,76,38);
    // back plates (alternating)
    g.fillStyle(dark,0.8);
    const px = [38,50,62,74,86];
    const ph = [22,28,32,26,18];
    for(let i=0;i<px.length;i++){
        g.fillTriangle(px[i]-8,52, px[i],52-ph[i], px[i]+8,52);
    }
    // head (small)
    g.fillStyle(body); g.fillEllipse(98,54,26,18);
    g.strokeEllipse(98,54,26,18);
    // beak
    g.fillStyle(0xFFCC44); g.fillTriangle(108,52,116,56,108,60);
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(99,51,3.5);
    g.fillStyle(0x222222); g.fillCircle(100,51,2);
    // legs
    g.fillStyle(dark);
    g.fillRect(38,70,11,12); g.fillRect(52,70,11,12);
    g.fillRect(67,70,11,12); g.fillRect(80,70,11,12);
}

function drawPteranodon(g, body, dark) {
    // wings (wide)
    g.fillStyle(body,0.9);
    g.fillTriangle(5,50, 60,36, 35,68);   // left wing
    g.fillTriangle(115,50, 60,36, 85,68); // right wing
    g.strokeTriangle(5,50, 60,36, 35,68);
    g.strokeTriangle(115,50, 60,36, 85,68);
    // body
    g.fillStyle(body); g.fillEllipse(60,52,36,24);
    g.strokeEllipse(60,52,36,24);
    // long beak/crest head
    g.fillStyle(body); g.fillEllipse(68,30,32,16);
    // crest (long back spike)
    g.fillStyle(dark,0.8); g.fillTriangle(58,25,48,10,64,27);
    // long beak front
    g.fillStyle(0xFFCC44); g.fillTriangle(74,28,94,32,74,36);
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(70,29,4);
    g.fillStyle(0x111111); g.fillCircle(71,29,2.5);
    // feet
    g.fillStyle(dark); g.fillRect(54,62,8,12); g.fillRect(66,62,8,12);
}

function drawAnkylosaurus(g, body, dark) {
    // body (wide, armoured)
    g.fillStyle(body); g.fillEllipse(55,54,80,36);
    g.strokeEllipse(55,54,80,36);
    // armour spikes on back
    g.fillStyle(0xCCBBAA);
    const spikes = [{x:28,y:42},{x:38,y:36},{x:50,y:34},{x:62,y:34},{x:74,y:36},{x:86,y:40}];
    spikes.forEach(s=>{ g.fillCircle(s.x,s.y,5); g.fillTriangle(s.x-4,s.y,s.x,s.y-10,s.x+4,s.y); });
    // side spikes
    g.fillStyle(0xCCBBAA);
    for(let i=0;i<4;i++){ g.fillTriangle(20+i*12,52,16+i*12,44,24+i*12,52); }
    // head (low, small)
    g.fillStyle(body); g.fillEllipse(98,58,28,22);
    g.strokeEllipse(98,58,28,22);
    // beak
    g.fillStyle(0xFFCC44); g.fillTriangle(108,56,116,60,108,64);
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(100,55,3.5);
    g.fillStyle(0x222222); g.fillCircle(101,55,2);
    // club tail
    g.fillStyle(body); g.fillRect(10,52,24,8);
    g.fillStyle(dark); g.fillCircle(8,55,9);
    // legs (short, stubby)
    g.fillStyle(dark);
    g.fillRect(30,68,11,12); g.fillRect(45,68,11,12);
    g.fillRect(60,68,11,12); g.fillRect(74,68,11,12);
}

function drawSpinosaurus(g, body, dark) {
    // tail
    g.fillStyle(body); g.fillTriangle(5,52,30,44,18,58);
    // body
    g.fillStyle(body); g.fillEllipse(60,54,80,38);
    g.strokeEllipse(60,54,80,38);
    // sail (prominent)
    g.fillStyle(body,0.8);
    const sailX=[38,50,62,74];
    const sailH=[30,42,40,28];
    for(let i=0;i<sailX.length;i++){
        g.fillTriangle(sailX[i]-10,46,sailX[i]+sailX[i]*0.02,46-sailH[i],sailX[i]+10,46);
        g.strokeTriangle(sailX[i]-10,46,sailX[i]+sailX[i]*0.02,46-sailH[i],sailX[i]+10,46);
    }
    // neck
    g.fillStyle(body); g.fillRect(80,26,16,30);
    // long croc head
    g.fillStyle(body); g.fillEllipse(100,24,38,20);
    g.strokeEllipse(100,24,38,20);
    // jaw
    g.fillStyle(body); g.fillRect(85,28,34,10);
    g.fillStyle(0xFFFFFF); for(let i=0;i<5;i++){g.fillRect(87+i*5,32,3,5);}
    // eye
    g.fillStyle(0xFF8800); g.fillCircle(98,20,5);
    g.fillStyle(0x111111); g.fillCircle(98,20,3);
    // arms
    g.fillStyle(dark); g.fillRect(76,46,14,10); g.fillRect(72,55,10,5);
    // legs
    g.fillStyle(dark); g.fillRect(48,70,13,12); g.fillRect(64,70,13,12);
}

function drawDiplodocus(g, body, dark) {
    // very long body with long neck and tail
    // tail (long)
    g.fillStyle(body); g.fillTriangle(5,55,32,52,16,62);
    // body
    g.fillStyle(body); g.fillEllipse(52,58,60,28);
    g.strokeEllipse(52,58,60,28);
    // neck (long, going up-right, thinner)
    g.fillStyle(body); g.fillRect(66,15,10,46);
    g.strokeRect(66,15,10,46);
    // head (tiny)
    g.fillStyle(body); g.fillEllipse(82,11,26,13);
    g.strokeEllipse(82,11,26,13);
    // nostril
    g.fillStyle(dark,0.6); g.fillCircle(88,9,3);
    // pencil teeth
    g.fillStyle(0xFFFFFF); for(let i=0;i<4;i++){g.fillRect(76+i*5,12,3,5);}
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(80,10,3.5);
    g.fillStyle(0x222222); g.fillCircle(81,10,2);
    // legs (4, sturdy)
    g.fillStyle(dark);
    g.fillRect(30,70,10,12); g.fillRect(44,70,10,12);
    g.fillRect(58,70,10,12); g.fillRect(72,70,10,12);
    // back ridge
    g.fillStyle(dark,0.4);
    for(let i=0;i<6;i++){ g.fillCircle(28+i*10,50,4); }
}

function drawParasaurolophus(g, body, dark) {
    // tail
    g.fillStyle(body); g.fillTriangle(8,52,30,46,18,60);
    // body
    g.fillStyle(body); g.fillEllipse(58,54,72,34);
    g.strokeEllipse(58,54,72,34);
    g.fillStyle(0xFFCCDD,0.3); g.fillEllipse(58,60,50,18);
    // neck
    g.fillStyle(body); g.fillRect(76,24,14,32);
    // head
    g.fillStyle(body); g.fillEllipse(93,24,32,20);
    g.strokeEllipse(93,24,32,20);
    // CREST (long curved tube going back)
    g.fillStyle(dark,0.9);
    g.fillEllipse(78,14,44,14);
    g.fillStyle(body,0.6); g.fillEllipse(78,14,34,8);
    // beak (duck-billed)
    g.fillStyle(0xFFCC44); g.fillEllipse(108,28,16,10);
    // eye
    g.fillStyle(0xFFFFFF); g.fillCircle(96,21,4.5);
    g.fillStyle(0x222222); g.fillCircle(97,21,2.5);
    // legs
    g.fillStyle(dark);
    g.fillRect(42,68,12,14); g.fillRect(58,68,12,14);
    g.fillRect(72,68,12,14);
}

// ── Game config ───────────────────────────────────────────
const config = createGameConfig({
    width: 900,
    height: 620,
    backgroundColor: DH.sky,
    scene: [TitleScene, SelectScene, GameScene],
});

const game = new Phaser.Game(config);

// ╔══════════════════════════════════════════════════════╗
// ║  SCENE 1 – TITLE                                     ║
// ╚══════════════════════════════════════════════════════╝
class TitleScene extends Phaser.Scene {
    constructor() { super('TitleScene'); }

    create() {
        const W = this.scale.width, H = this.scale.height;
        drawBackground(this, W, H);

        // Animated title
        this.add.text(W/2, 140, '🦖 DINO HUNTER 🦕', {
            fontFamily: 'Arial Black, Arial',
            fontSize: '52px',
            color: '#FFEE00',
            stroke: '#7B2D00',
            strokeThickness: 8,
            shadow: { offsetX:4, offsetY:4, color:'#000', blur:8, fill:true }
        }).setOrigin(0.5);

        this.add.text(W/2, 210, 'Can you spot YOUR dinosaur?', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFF8E7',
            stroke: '#2D1B69',
            strokeThickness: 4,
        }).setOrigin(0.5);

        // Animated dino row
        const previewDinos = ['trex','triceratops','stegosaurus','pteranodon','velociraptor'];
        previewDinos.forEach((id, i) => {
            const dino = DINOS.find(d => d.id === id);
            const key = drawDinoTexture(this, dino);
            const x = W * 0.12 + i * (W * 0.19);
            const img = this.add.image(x, 360, key).setScale(1.4);
            this.tweens.add({
                targets: img,
                y: 360 - 18,
                duration: 900 + i * 130,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        });

        // Start button
        const btn = this.add.rectangle(W/2, 500, 240, 64, 0xA44A3F)
            .setInteractive({ cursor: 'pointer' });
        const btnTxt = this.add.text(W/2, 500, '🎯 PLAY', {
            fontFamily: 'Arial Black',
            fontSize: '30px',
            color: '#FFFFFF',
        }).setOrigin(0.5);

        btn.on('pointerover',  () => btn.setFillStyle(0x8B3A30));
        btn.on('pointerout',   () => btn.setFillStyle(0xA44A3F));
        btn.on('pointerdown',  () => {
            this.tweens.add({ targets:[btn,btnTxt], scaleX:0.93, scaleY:0.93, duration:80, yoyo:true,
                onComplete: () => this.scene.start('SelectScene') });
        });

        // How to play hint
        this.add.text(W/2, 575, 'Pick a dino → shoot it on screen  |  Miss? Learn something cool!', {
            fontFamily: 'Arial',
            fontSize: '15px',
            color: '#CCDDFF',
        }).setOrigin(0.5);
    }
}

// ╔══════════════════════════════════════════════════════╗
// ║  SCENE 2 – SELECT YOUR TARGET                        ║
// ╚══════════════════════════════════════════════════════╝
class SelectScene extends Phaser.Scene {
    constructor() { super('SelectScene'); }

    create() {
        const W = this.scale.width, H = this.scale.height;
        drawBackground(this, W, H);

        this.add.text(W/2, 36, '🎯 Pick Your Target Dinosaur!', {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#FFEE00',
            stroke: '#7B2D00',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(W/2, 72, 'Shoot ONLY this dinosaur — hit others and learn about them!', {
            fontFamily: 'Arial',
            fontSize: '15px',
            color: '#FFF8E7',
        }).setOrigin(0.5);

        // Grid: 5 columns × 2 rows
        const cols = 5, rows = 2;
        const cw = W / cols, ch = (H - 110) / rows;

        DINOS.forEach((dino, i) => {
            const col = i % cols, row = Math.floor(i / cols);
            const cx  = cw * col + cw / 2;
            const cy  = 110 + ch * row + ch / 2 - 10;

            // Card background
            const card = this.add.rectangle(cx, cy, cw - 16, ch - 16, 0xFFF8E7)
                .setStrokeStyle(3, dino.bodyColor)
                .setInteractive({ cursor: 'pointer' });

            // Dino sprite
            const key = drawDinoTexture(this, dino);
            const img = this.add.image(cx, cy - 18, key).setScale(0.95);

            // Name
            this.add.text(cx, cy + 36, dino.nick, {
                fontFamily: 'Arial Black',
                fontSize: '13px',
                color: '#' + dino.bodyColor.toString(16).padStart(6,'0'),
                stroke: '#222',
                strokeThickness: 2,
            }).setOrigin(0.5);

            // Diet tag
            const dietCol = dino.diet.includes('Carnivore') ? '#FF4444' :
                            dino.diet.includes('Piscivore') ? '#4488FF' : '#44AA44';
            this.add.text(cx, cy + 52, dino.diet.includes('Carnivore') ? '🥩' :
                                        dino.diet.includes('Piscivore') ? '🐟' : '🌿', {
                fontSize: '16px',
            }).setOrigin(0.5);

            card.on('pointerover', () => {
                card.setFillStyle(0xFFF0C0);
                img.setScale(1.08);
            });
            card.on('pointerout', () => {
                card.setFillStyle(0xFFF8E7);
                img.setScale(0.95);
            });
            card.on('pointerdown', () => {
                this.scene.start('GameScene', { targetId: dino.id });
            });
        });
    }
}

// ╔══════════════════════════════════════════════════════╗
// ║  SCENE 3 – GAME                                      ║
// ╚══════════════════════════════════════════════════════╝
class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    init(data) {
        this.targetId    = data.targetId || 'trex';
        this.score       = 0;
        this.shots       = 0;
        this.hits        = 0;
        this.dinoGroup   = [];
        this.bullets     = [];
        this.paused      = false;
        this.factPanel   = null;
    }

    create() {
        const W = this.scale.width, H = this.scale.height;
        this.W = W; this.H = H;

        // Background
        drawBackground(this, W, H);

        // Pre-generate all textures
        DINOS.forEach(d => drawDinoTexture(this, d));

        // HUD bar
        this.hudBar = this.add.rectangle(W/2, 24, W, 48, 0x2D1B69, 0.88).setDepth(10);

        const target = DINOS.find(d => d.id === this.targetId);
        this.add.text(12, 24, `🎯 Target: ${target.name}`, {
            fontFamily: 'Arial Black', fontSize: '16px', color: '#FFEE00',
            stroke: '#000', strokeThickness: 3,
        }).setOrigin(0, 0.5).setDepth(11);

        this.scoreTxt = this.add.text(W - 12, 24, '⭐ 0', {
            fontFamily: 'Arial Black', fontSize: '18px', color: '#FFEE00',
            stroke: '#000', strokeThickness: 3,
        }).setOrigin(1, 0.5).setDepth(11);

        // Small target preview in HUD
        const tKey = `dino_${this.targetId}`;
        this.add.image(W/2, 24, tKey).setScale(0.38).setDepth(11);

        // Crosshair graphics (drawn on top)
        this.crosshair = this.add.graphics().setDepth(20);
        this.input.setDefaultCursor('none');

        // Spawn initial dinos
        for (let i = 0; i < 6; i++) {
            this.time.delayedCall(i * 400, () => this.spawnDino());
        }

        // Continuous spawn timer
        this.spawnTimer = this.time.addEvent({
            delay: 2800,
            callback: this.spawnDino,
            callbackScope: this,
            loop: true,
        });

        // Shoot on click
        this.input.on('pointerdown', (ptr) => {
            if (!this.paused) this.shoot(ptr.x, ptr.y);
        });

        // Back button
        const backBtn = this.add.text(10, H - 16, '← Menu', {
            fontFamily: 'Arial', fontSize: '16px', color: '#AACCFF',
            backgroundColor: '#2D1B69', padding: {x:8,y:4},
        }).setOrigin(0, 1).setDepth(11).setInteractive({cursor:'pointer'});
        backBtn.on('pointerdown', () => {
            this.scene.start('TitleScene');
        });

        // Shoot counter
        this.add.text(W/2, H - 16, '', { fontSize:'1px' }); // placeholder
        this.statTxt = this.add.text(W - 12, H - 16, '', {
            fontFamily: 'Arial', fontSize: '14px', color: '#CCDDFF',
        }).setOrigin(1, 1).setDepth(11);
    }

    spawnDino() {
        if (this.paused) return;
        const W = this.W, H = this.H;

        // Pick a random dino (ensure target appears often)
        let dino;
        if (Math.random() < 0.28) {
            dino = DINOS.find(d => d.id === this.targetId);
        } else {
            // Any dino except prefer variety
            dino = DINOS[Math.floor(Math.random() * DINOS.length)];
        }

        const side  = Math.random() < 0.5 ? -1 : 1;
        const startX = side < 0 ? -70 : W + 70;
        const startY = 80 + Math.random() * (H - 160);
        const speed  = 1.2 + Math.random() * 1.6;
        const vx     = side * speed;
        const vy     = (Math.random() - 0.5) * 0.8;

        const key    = `dino_${dino.id}`;
        const sprite = this.add.image(startX, startY, key)
            .setScale(0.9 + Math.random() * 0.4)
            .setFlipX(vx > 0)
            .setDepth(5);

        // Name label above dino
        const label = this.add.text(startX, startY - 52, dino.nick, {
            fontFamily: 'Arial Black', fontSize: '12px',
            color: '#FFEE00', stroke: '#000', strokeThickness: 3,
        }).setOrigin(0.5).setDepth(6);

        this.dinoGroup.push({ sprite, label, vx, vy, bob: Math.random() * Math.PI * 2, dino });

        // Auto-despawn after some time
        this.time.delayedCall(12000, () => {
            if (sprite.active) {
                sprite.destroy();
                label.destroy();
            }
        });
    }

    update() {
        const ptr = this.input.activePointer;
        this.drawCrosshair(ptr.x, ptr.y);

        // Sync labels, move dinos
        this.dinoGroup = this.dinoGroup.filter(entry => {
            if (!entry.sprite.active) return false;
            entry.sprite.x += entry.vx;
            entry.sprite.y += entry.vy;

            if (entry.sprite.x < 60 || entry.sprite.x > this.W - 60) {
                entry.vx *= -1;
                entry.sprite.setFlipX(entry.vx > 0);
            }
            if (entry.sprite.y < 60 || entry.sprite.y > this.H - 60) {
                entry.vy *= -1;
            }

            entry.bob += 0.06;
            entry.sprite.y += Math.sin(entry.bob) * 0.35;

            // Sync label
            if (entry.label && entry.label.active) {
                entry.label.setPosition(entry.sprite.x, entry.sprite.y - 54 * entry.sprite.scaleY);
            }

            return true;
        });

        // Move bullets
        this.bullets = this.bullets.filter(b => {
            if (!b.active) return false;
            b.x += b.vx;
            b.y += b.vy;
            b.graphic.setPosition(b.x, b.y);
            b.trail.setPosition(b.x - b.vx * 4, b.y - b.vy * 4);

            let hit = false;
            for (const entry of this.dinoGroup) {
                if (!entry.sprite.active) continue;
                const dx = b.x - entry.sprite.x;
                const dy = b.y - entry.sprite.y;
                const hw = 55 * entry.sprite.scaleX;
                const hh = 38 * entry.sprite.scaleY;
                if (Math.abs(dx) < hw && Math.abs(dy) < hh) {
                    hit = true;
                    this.onHit(entry, b.x, b.y);
                    b.graphic.destroy();
                    b.trail.destroy();
                    b.active = false;
                    break;
                }
            }

            if (b.x < 0 || b.x > this.W || b.y < 50 || b.y > this.H + 10) {
                b.graphic.destroy();
                b.trail.destroy();
                return false;
            }
            return !hit;
        });
    }

    shoot(px, py) {
        this.shots++;

        // Direction from bottom-center toward click
        const sx = this.W / 2, sy = this.H + 10;
        const dx = px - sx, dy = py - sy;
        const len = Math.sqrt(dx*dx + dy*dy) || 1;
        const speed = 14;
        const vx = (dx / len) * speed;
        const vy = (dy / len) * speed;

        // Bullet graphic
        const g = this.add.graphics().setDepth(15);
        g.fillStyle(DH.bullet); g.fillCircle(0, 0, 6);
        g.setPosition(sx, sy);

        const trail = this.add.graphics().setDepth(14);
        trail.fillStyle(DH.bullet, 0.35); trail.fillCircle(0, 0, 4);
        trail.setPosition(sx, sy);

        // Muzzle flash
        const flash = this.add.graphics().setDepth(16);
        flash.fillStyle(0xFFFFFF); flash.fillCircle(sx, sy, 14);
        this.time.delayedCall(60, () => flash.destroy());

        this.bullets.push({ x: sx, y: sy, vx, vy, graphic: g, trail, active: true });
        this.updateStats();
    }

    onHit(entry, bx, by) {
        const dino = entry.dino;
        const isTarget = dino.id === this.targetId;

        // Explosion particles
        this.spawnParticles(entry.sprite.x, entry.sprite.y, isTarget ? 0xFFDD00 : 0xFF4444);

        // Flash the dino
        this.tweens.add({
            targets: entry.sprite,
            alpha: 0,
            duration: 180,
            onComplete: () => {
                if (entry.sprite.active) entry.sprite.destroy();
                if (entry.label && entry.label.active) entry.label.destroy();
            }
        });

        if (isTarget) {
            // CORRECT HIT
            this.hits++;
            this.score += 100;
            this.scoreTxt.setText(`⭐ ${this.score}`);

            const txt = this.add.text(bx, by - 30, '+100  NICE SHOT! 🎯', {
                fontFamily: 'Arial Black', fontSize: '22px',
                color: '#FFEE00', stroke: '#000', strokeThickness: 4,
            }).setOrigin(0.5).setDepth(20);
            this.tweens.add({ targets: txt, y: by - 100, alpha: 0, duration: 1200,
                onComplete: () => txt.destroy() });

            // Cheers sound (visual only since no audio asset)
            this.cameras.main.flash(120, 255, 220, 50);
        } else {
            // WRONG HIT — show facts
            this.paused = true;
            this.showFactPanel(dino);
        }

        this.updateStats();
    }

    showFactPanel(dino) {
        const W = this.W, H = this.H;
        const panelW = 600, panelH = 420;
        const px = W / 2, py = H / 2;

        // Dark overlay
        const overlay = this.add.rectangle(W/2, H/2, W, H, 0x000000, 0.65).setDepth(30)
            .setInteractive(); // block clicks

        // Panel background
        const panel = this.add.rectangle(px, py, panelW, panelH, DH.panel)
            .setStrokeStyle(4, DH.panelBorder)
            .setDepth(31);

        const startY = py - panelH/2 + 30;
        const group = [];
        group.push(overlay, panel);

        // Dino sprite (large)
        const key = `dino_${dino.id}`;
        const img = this.add.image(px - 170, py - 30, key).setScale(2.0).setDepth(32);
        group.push(img);

        // Name + diet
        group.push(this.add.text(px + 20, startY + 10, `${dino.emoji} ${dino.name}`, {
            fontFamily: 'Arial Black', fontSize: '22px',
            color: '#' + dino.bodyColor.toString(16).padStart(6,'0'),
            stroke: '#222', strokeThickness: 3,
        }).setOrigin(0, 0.5).setDepth(32));

        // Info rows
        const rows = [
            { label: '🍽️ Diet', value: dino.diet },
            { label: '⏳ Period', value: dino.period },
            { label: '📏 Length', value: dino.length },
            { label: '⚖️ Weight', value: dino.weight },
            { label: '📍 Found', value: dino.found },
        ];

        rows.forEach((row, i) => {
            group.push(this.add.text(px + 20, startY + 50 + i * 32, `${row.label}:`, {
                fontFamily: 'Arial Black', fontSize: '12px', color: '#555544',
            }).setOrigin(0, 0.5).setDepth(32));
            group.push(this.add.text(px + 100, startY + 50 + i * 32, row.value, {
                fontFamily: 'Arial', fontSize: '13px', color: '#1F2937',
                wordWrap: { width: 220 },
            }).setOrigin(0, 0.5).setDepth(32));
        });

        // Facts section
        group.push(this.add.text(px + 20, startY + 215, '💡 Fun Facts:', {
            fontFamily: 'Arial Black', fontSize: '14px', color: '#7B2D00',
        }).setOrigin(0, 0.5).setDepth(32));

        dino.facts.slice(0, 3).forEach((fact, i) => {
            group.push(this.add.text(px + 20, startY + 240 + i * 38, fact, {
                fontFamily: 'Arial', fontSize: '13px', color: '#1F2937',
                wordWrap: { width: 260 },
            }).setOrigin(0, 0).setDepth(32));
        });

        // Wrong dino notice at top
        group.push(this.add.text(px, startY - 10, `Oops! That was a ${dino.nick}!`, {
            fontFamily: 'Arial Black', fontSize: '17px',
            color: '#CC2200', stroke: '#FFF', strokeThickness: 3,
        }).setOrigin(0.5, 0.5).setDepth(32));

        // Got it button
        const btnY = py + panelH/2 - 36;
        const btn = this.add.rectangle(px, btnY, 200, 46, 0xA44A3F)
            .setDepth(32).setInteractive({cursor:'pointer'});
        const btnTxt = this.add.text(px, btnY, 'Got it! Keep Playing →', {
            fontFamily: 'Arial Black', fontSize: '15px', color: '#FFFFFF',
        }).setOrigin(0.5).setDepth(33);
        group.push(btn, btnTxt);

        btn.on('pointerover', () => btn.setFillStyle(0x8B3A30));
        btn.on('pointerout',  () => btn.setFillStyle(0xA44A3F));
        btn.on('pointerdown', () => {
            group.forEach(o => o.destroy());
            this.paused = false;
        });

        this.factPanel = group;
    }

    spawnParticles(x, y, color) {
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const speed = 3 + Math.random() * 4;
            const p = this.add.graphics().setDepth(18);
            const r = 4 + Math.random() * 4;
            p.fillStyle(color); p.fillCircle(0, 0, r);
            p.setPosition(x, y);
            this.tweens.add({
                targets: p,
                x: x + Math.cos(angle) * speed * 15,
                y: y + Math.sin(angle) * speed * 15,
                alpha: 0,
                scaleX: 0.2, scaleY: 0.2,
                duration: 500 + Math.random() * 300,
                onComplete: () => p.destroy(),
            });
        }
    }

    drawCrosshair(x, y) {
        const g = this.crosshair;
        g.clear();
        if (this.paused) return;
        const r = 20, gap = 6, arm = 14, thickness = 3;
        g.lineStyle(thickness + 2, 0x000000, 0.6);
        g.strokeCircle(x, y, r);
        g.lineBetween(x - r - arm, y, x - r - gap, y);
        g.lineBetween(x + r + gap, y, x + r + arm, y);
        g.lineBetween(x, y - r - arm, x, y - r - gap);
        g.lineBetween(x, y + r + gap, x, y + r + arm);
        g.lineStyle(thickness, DH.crosshair, 1);
        g.strokeCircle(x, y, r);
        g.lineBetween(x - r - arm, y, x - r - gap, y);
        g.lineBetween(x + r + gap, y, x + r + arm, y);
        g.lineBetween(x, y - r - arm, x, y - r - gap);
        g.lineBetween(x, y + r + gap, x, y + r + arm);
        g.fillStyle(DH.crosshair, 0.8);
        g.fillCircle(x, y, 3);
    }

    updateStats() {
        const acc = this.shots > 0 ? Math.round((this.hits / this.shots) * 100) : 0;
        this.statTxt.setText(`Shots: ${this.shots}  Hits: ${this.hits}  Accuracy: ${acc}%`);
    }
}

// ── Shared background drawing ─────────────────────────────
function drawBackground(scene, W, H) {
    // Sky gradient (two rects)
    scene.add.rectangle(W/2, H*0.3, W, H*0.6, DH.sky);
    scene.add.rectangle(W/2, H*0.65, W, H*0.5, DH.skyBot);

    // Mountains
    const mg = scene.add.graphics();
    mg.fillStyle(DH.mountain, 1);
    mg.fillTriangle(0, H*0.55, 120, H*0.22, 240, H*0.55);
    mg.fillTriangle(150, H*0.55, 290, H*0.18, 420, H*0.55);
    mg.fillTriangle(350, H*0.55, 480, H*0.25, 620, H*0.55);
    mg.fillTriangle(580, H*0.55, 710, H*0.20, 850, H*0.55);
    mg.fillTriangle(750, H*0.55, 870, H*0.28, W+20, H*0.55);

    // Snow caps
    mg.fillStyle(0xFFFFFF, 0.7);
    mg.fillTriangle(90, H*0.30, 120, H*0.22, 150, H*0.30);
    mg.fillTriangle(260, H*0.26, 290, H*0.18, 320, H*0.26);
    mg.fillTriangle(450, H*0.33, 480, H*0.25, 510, H*0.33);
    mg.fillTriangle(680, H*0.28, 710, H*0.20, 740, H*0.28);
    mg.fillTriangle(845, H*0.36, 870, H*0.28, 895, H*0.36);

    // Ground
    scene.add.rectangle(W/2, H - 20, W, 40, DH.ground);

    // Grass strip
    const gg = scene.add.graphics();
    gg.fillStyle(DH.grass);
    gg.fillRect(0, H*0.58, W, 18);
    gg.fillStyle(DH.grassDark);
    for (let x = 0; x < W; x += 20) {
        gg.fillTriangle(x, H*0.58, x+10, H*0.58 - 14, x+20, H*0.58);
    }

    // Clouds
    const cg = scene.add.graphics();
    cg.fillStyle(0xFFFFFF, 0.75);
    [[100,80],[260,55],[420,90],[600,60],[780,75]].forEach(([cx,cy]) => {
        cg.fillEllipse(cx, cy, 90, 36);
        cg.fillEllipse(cx-30, cy+6, 60, 28);
        cg.fillEllipse(cx+30, cy+6, 60, 28);
    });
}

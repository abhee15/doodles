// ============================================================
// DINO HUNTER - Educational Dinosaur Shooting Game
// Pick your target dino and shoot! Miss = learn about it.
// ============================================================

// ── Colours ───────────────────────────────────────────────
const DH = {
    sky:        0x87CEEB,
    skyBot:     0xB0E0E6,
    ground:     0x8B7355,
    grass:      0x5D8A3C,
    grassDark:  0x4A7030,
    mountain:   0x9B8977,
    panel:      0xFFF8E7,
    panelBorder:0xD4A017,
    hud:        0x2D1B69,
    crosshair:  0xFF2222,
    bullet:     0xFFD700,
};

// ── Dinosaur database ─────────────────────────────────────
const DINOS = [
    {
        id: 'trex', name: 'Tyrannosaurus Rex', nick: 'T-Rex',
        diet: 'Carnivore 🥩', period: 'Late Cretaceous (68–66 Ma)',
        length: '~12 m (40 ft)', weight: '8–14 tonnes', found: 'North America',
        bodyColor: 0xE07832, darkColor: 0xB05A1A, emoji: '🦖',
        facts: [
            '🦷 T-Rex had 60 banana-sized teeth!',
            '💪 Its bite was the strongest of any land animal.',
            '🍖 It could eat 230 kg of meat in one bite!',
        ],
    },
    {
        id: 'triceratops', name: 'Triceratops', nick: 'Trike',
        diet: 'Herbivore 🌿', period: 'Late Cretaceous (68–66 Ma)',
        length: '~9 m (30 ft)', weight: '6–12 tonnes', found: 'North America',
        bodyColor: 0x4CAF50, darkColor: 0x2E7D32, emoji: '🦕',
        facts: [
            '🪙 Its frill may have been used for showing off!',
            '🌿 Triceratops had up to 800 teeth for chewing.',
            '🤼 It used its horns to fight T-Rex.',
        ],
    },
    {
        id: 'brachiosaurus', name: 'Brachiosaurus', nick: 'Brachio',
        diet: 'Herbivore 🌿', period: 'Late Jurassic (154–153 Ma)',
        length: '~26 m (85 ft)', weight: '30–60 tonnes', found: 'North America, Africa',
        bodyColor: 0x26A69A, darkColor: 0x00796B, emoji: '🦕',
        facts: [
            '🏗️ It was taller than a 4-storey building!',
            '🌿 Ate around 400 kg of plants every day.',
            '❤️ Its heart weighed about 400 kg.',
        ],
    },
    {
        id: 'velociraptor', name: 'Velociraptor', nick: 'Raptor',
        diet: 'Carnivore 🥩', period: 'Late Cretaceous (75–71 Ma)',
        length: '~2 m (6.5 ft)', weight: '~15 kg', found: 'Mongolia, China',
        bodyColor: 0x9C27B0, darkColor: 0x6A1B9A, emoji: '🦖',
        facts: [
            '🐦 Velociraptors had feathers like a bird!',
            '🧠 They were very smart — hunted in packs.',
            '🦅 The real raptor was only turkey-sized.',
        ],
    },
    {
        id: 'stegosaurus', name: 'Stegosaurus', nick: 'Stego',
        diet: 'Herbivore 🌿', period: 'Late Jurassic (155–150 Ma)',
        length: '~9 m (30 ft)', weight: '~5 tonnes', found: 'North America',
        bodyColor: 0xE53935, darkColor: 0xB71C1C, emoji: '🦕',
        facts: [
            '🔮 Its brain was the size of a walnut!',
            '🏳️ The back plates may have changed colour.',
            '⚔️ Its spiked tail was called a "thagomizer".',
        ],
    },
    {
        id: 'pteranodon', name: 'Pteranodon', nick: 'Ptero',
        diet: 'Piscivore 🐟', period: 'Late Cretaceous (86–84 Ma)',
        length: 'Wingspan ~7 m', weight: '~25 kg', found: 'North America',
        bodyColor: 0x1E88E5, darkColor: 0x1565C0, emoji: '🦅',
        facts: [
            '✈️ Wingspan wider than a small airplane!',
            '🐟 Scooped fish from the ocean like a pelican.',
            '🦴 Despite the name, it was NOT a dinosaur.',
        ],
    },
    {
        id: 'ankylosaurus', name: 'Ankylosaurus', nick: 'Anky',
        diet: 'Herbivore 🌿', period: 'Late Cretaceous (68–66 Ma)',
        length: '~6–8 m (20–26 ft)', weight: '~6 tonnes', found: 'North America',
        bodyColor: 0x795548, darkColor: 0x4E342E, emoji: '🦕',
        facts: [
            '🛡️ Its armour was tougher than bone!',
            '🔨 Club tail could break a T-Rex\'s leg.',
            '🐢 Basically a walking tank covered in spikes.',
        ],
    },
    {
        id: 'spinosaurus', name: 'Spinosaurus', nick: 'Spino',
        diet: 'Carnivore 🥩', period: 'Cretaceous (112–97 Ma)',
        length: '~14–18 m (46–59 ft)', weight: '~7–20 tonnes', found: 'North Africa',
        bodyColor: 0xF9A825, darkColor: 0xF57F17, emoji: '🦖',
        facts: [
            '🏆 Possibly the largest predatory dino ever!',
            '🏊 It was a semi-aquatic swimmer.',
            '⛵ Its sail may have been a hump for fat storage.',
        ],
    },
    {
        id: 'diplodocus', name: 'Diplodocus', nick: 'Diplo',
        diet: 'Herbivore 🌿', period: 'Late Jurassic (154–152 Ma)',
        length: '~27 m (90 ft)', weight: '~12–17 tonnes', found: 'North America',
        bodyColor: 0x7CB342, darkColor: 0x558B2F, emoji: '🦕',
        facts: [
            '📏 One of the longest dinos ever discovered!',
            '🌿 Used its long neck to reach low-lying ferns.',
            '🎵 Could crack its tail like a whip — supersonic!',
        ],
    },
    {
        id: 'parasaurolophus', name: 'Parasaurolophus', nick: 'Para',
        diet: 'Herbivore 🌿', period: 'Late Cretaceous (76–73 Ma)',
        length: '~10 m (33 ft)', weight: '~2.5 tonnes', found: 'North America',
        bodyColor: 0xEC407A, darkColor: 0xC2185B, emoji: '🦕',
        facts: [
            '🎺 Its crest worked like a trombone — could HONK!',
            '🌿 One of the most common duck-billed dinos.',
            '🏃 Could run on two or four legs.',
        ],
    },
];

// ── Dino visual: Container with colored box + emoji + name ─
// Using Containers avoids any texture-generation issues.
function makeDinoContainer(scene, dino, scale) {
    scale = scale || 1;
    const bw = Math.round(108 * scale);
    const bh = Math.round(62 * scale);

    const bg = scene.add.rectangle(0, 0, bw, bh, dino.bodyColor)
        .setStrokeStyle(Math.max(2, Math.round(2.5 * scale)), dino.darkColor);

    const eSize = Math.round(28 * scale);
    const eTxt = scene.add.text(0, Math.round(-9 * scale), dino.emoji, {
        fontSize: eSize + 'px',
    }).setOrigin(0.5);

    const nSize = Math.max(9, Math.round(11 * scale));
    const nTxt = scene.add.text(0, Math.round(19 * scale), dino.nick, {
        fontFamily: 'Arial Black',
        fontSize: nSize + 'px',
        color: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: Math.max(2, Math.round(2 * scale)),
    }).setOrigin(0.5);

    return scene.add.container(0, 0, [bg, eTxt, nTxt]);
}

// ╔══════════════════════════════════════════════════════════╗
// ║  SCENE 1 – TITLE                                         ║
// ╚══════════════════════════════════════════════════════════╝
class TitleScene extends Phaser.Scene {
    constructor() { super('TitleScene'); }

    create() {
        const W = this.scale.width, H = this.scale.height;
        drawBackground(this, W, H);

        this.add.text(W / 2, 120, '🦖 DINO HUNTER 🦕', {
            fontFamily: 'Arial Black, Arial',
            fontSize: '52px',
            color: '#FFEE00',
            stroke: '#7B2D00',
            strokeThickness: 8,
            shadow: { offsetX: 4, offsetY: 4, color: '#000', blur: 8, fill: true },
        }).setOrigin(0.5);

        this.add.text(W / 2, 192, 'Can you spot YOUR dinosaur?', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#FFF8E7',
            stroke: '#2D1B69',
            strokeThickness: 4,
        }).setOrigin(0.5);

        // Preview row of 5 dinos
        const previewIds = ['trex', 'triceratops', 'stegosaurus', 'pteranodon', 'velociraptor'];
        previewIds.forEach((id, i) => {
            const dino = DINOS.find(d => d.id === id);
            const x = W * 0.11 + i * W * 0.195;
            const c = makeDinoContainer(this, dino, 0.82);
            c.setPosition(x, 340);
            this.tweens.add({
                targets: c,
                y: 322,
                duration: 880 + i * 130,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        });

        // Play button
        const btn = this.add.rectangle(W / 2, 490, 240, 64, 0xA44A3F)
            .setInteractive({ cursor: 'pointer' });
        const btnTxt = this.add.text(W / 2, 490, '🎯 PLAY', {
            fontFamily: 'Arial Black',
            fontSize: '30px',
            color: '#FFFFFF',
        }).setOrigin(0.5);

        btn.on('pointerover',  () => btn.setFillStyle(0x8B3A30));
        btn.on('pointerout',   () => btn.setFillStyle(0xA44A3F));
        btn.on('pointerdown',  () => {
            this.tweens.add({
                targets: [btn, btnTxt], scaleX: 0.93, scaleY: 0.93, duration: 80, yoyo: true,
                onComplete: () => this.scene.start('SelectScene'),
            });
        });

        this.add.text(W / 2, 572, 'Pick a dino → shoot it on screen  |  Miss? Learn something cool!', {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: '#CCDDFF',
        }).setOrigin(0.5);
    }
}

// ╔══════════════════════════════════════════════════════════╗
// ║  SCENE 2 – SELECT YOUR TARGET                            ║
// ╚══════════════════════════════════════════════════════════╝
class SelectScene extends Phaser.Scene {
    constructor() { super('SelectScene'); }

    create() {
        const W = this.scale.width, H = this.scale.height;
        drawBackground(this, W, H);

        this.add.text(W / 2, 36, '🎯 Pick Your Target Dinosaur!', {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#FFEE00',
            stroke: '#7B2D00',
            strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(W / 2, 70, 'Shoot ONLY this dinosaur — hit others and learn about them!', {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: '#FFF8E7',
        }).setOrigin(0.5);

        const cols = 5, rows = 2;
        const cw = W / cols;
        const ch = (H - 95) / rows;

        DINOS.forEach((dino, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const cx  = cw * col + cw / 2;
            const cy  = 95 + ch * row + ch / 2;

            // Card background
            const card = this.add.rectangle(cx, cy, cw - 12, ch - 12, 0xFFF8E7)
                .setStrokeStyle(3, dino.bodyColor)
                .setInteractive({ cursor: 'pointer' });

            // Dino container
            const dc = makeDinoContainer(this, dino, 0.78);
            dc.setPosition(cx, cy - 14);

            // Diet badge
            const dietIcon = dino.diet.includes('Carnivore') ? '🥩' :
                             dino.diet.includes('Piscivore') ? '🐟' : '🌿';
            this.add.text(cx, cy + 36, dietIcon, { fontSize: '18px' }).setOrigin(0.5);

            card.on('pointerover', () => {
                card.setFillStyle(0xFFF0C0);
                dc.setScale(1.07);
            });
            card.on('pointerout', () => {
                card.setFillStyle(0xFFF8E7);
                dc.setScale(1);
            });
            card.on('pointerdown', () => {
                this.scene.start('GameScene', { targetId: dino.id });
            });
        });
    }
}

// ╔══════════════════════════════════════════════════════════╗
// ║  SCENE 3 – GAME                                          ║
// ╚══════════════════════════════════════════════════════════╝
class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    init(data) {
        this.targetId  = data.targetId || 'trex';
        this.score     = 0;
        this.shots     = 0;
        this.hits      = 0;
        this.dinoGroup = [];
        this.bullets   = [];
        this.paused    = false;
    }

    create() {
        const W = this.scale.width, H = this.scale.height;
        this.W = W; this.H = H;

        drawBackground(this, W, H);

        // HUD bar
        this.add.rectangle(W / 2, 24, W, 48, DH.hud, 0.88).setDepth(10);

        const target = DINOS.find(d => d.id === this.targetId);

        this.add.text(14, 24, `🎯 Target:`, {
            fontFamily: 'Arial Black', fontSize: '15px', color: '#FFEE00',
            stroke: '#000', strokeThickness: 3,
        }).setOrigin(0, 0.5).setDepth(11);

        // Target dino badge in HUD
        const hudDino = makeDinoContainer(this, target, 0.46);
        hudDino.setPosition(W / 2, 24).setDepth(11);

        this.scoreTxt = this.add.text(W - 12, 24, '⭐ 0', {
            fontFamily: 'Arial Black', fontSize: '18px', color: '#FFEE00',
            stroke: '#000', strokeThickness: 3,
        }).setOrigin(1, 0.5).setDepth(11);

        // Crosshair (drawn every frame)
        this.crosshair = this.add.graphics().setDepth(20);
        this.input.setDefaultCursor('none');

        // Spawn initial wave
        for (let i = 0; i < 6; i++) {
            this.time.delayedCall(i * 500, () => this.spawnDino());
        }
        // Continuous spawning
        this.time.addEvent({
            delay: 2800,
            callback: this.spawnDino,
            callbackScope: this,
            loop: true,
        });

        // Click to shoot
        this.input.on('pointerdown', ptr => {
            if (!this.paused) this.shoot(ptr.x, ptr.y);
        });

        // Back button
        const back = this.add.text(10, H - 14, '← Menu', {
            fontFamily: 'Arial', fontSize: '15px', color: '#AACCFF',
            backgroundColor: '#2D1B69', padding: { x: 8, y: 4 },
        }).setOrigin(0, 1).setDepth(11).setInteractive({ cursor: 'pointer' });
        back.on('pointerdown', () => this.scene.start('TitleScene'));

        this.statTxt = this.add.text(W - 12, H - 14, '', {
            fontFamily: 'Arial', fontSize: '13px', color: '#CCDDFF',
        }).setOrigin(1, 1).setDepth(11);
    }

    spawnDino() {
        if (this.paused) return;
        const W = this.W, H = this.H;

        // 30 % chance to spawn the target dino
        const dino = Math.random() < 0.30
            ? DINOS.find(d => d.id === this.targetId)
            : DINOS[Math.floor(Math.random() * DINOS.length)];

        const fromLeft = Math.random() < 0.5;
        const startX   = fromLeft ? -80 : W + 80;
        const startY   = 65 + Math.random() * (H - 150);
        const speed    = 1.3 + Math.random() * 1.8;
        const vx       = fromLeft ? speed : -speed;   // always move INTO screen
        const vy       = (Math.random() - 0.5) * 0.9;
        const scale    = 0.85 + Math.random() * 0.35;

        const dc = makeDinoContainer(this, dino, scale);
        dc.setPosition(startX, startY).setDepth(5);

        this.dinoGroup.push({
            sprite: dc,
            vx, vy,
            bob:   Math.random() * Math.PI * 2,
            dino,  scale,
        });

        // Auto-despawn after 14 s
        this.time.delayedCall(14000, () => {
            if (dc.active) dc.destroy();
        });
    }

    update() {
        const ptr = this.input.activePointer;
        this.drawCrosshair(ptr.x, ptr.y);

        // ── Move dinos ──────────────────────────────────────
        this.dinoGroup = this.dinoGroup.filter(entry => {
            if (!entry.sprite.active) return false;

            entry.sprite.x += entry.vx;
            entry.sprite.y += entry.vy;
            entry.bob += 0.06;
            entry.sprite.y += Math.sin(entry.bob) * 0.3;

            const hw = 54 * entry.scale;
            const hh = 35 * entry.scale;

            if (entry.sprite.x < hw || entry.sprite.x > this.W - hw) {
                entry.vx *= -1;
            }
            if (entry.sprite.y < 55 || entry.sprite.y > this.H - 48) {
                entry.vy *= -1;
            }

            return true;
        });

        // ── Move bullets & check hits ────────────────────────
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
                const hw = 54 * entry.scale;
                const hh = 35 * entry.scale;
                if (Math.abs(dx) < hw && Math.abs(dy) < hh) {
                    hit = true;
                    this.onHit(entry, b.x, b.y);
                    b.graphic.destroy();
                    b.trail.destroy();
                    b.active = false;
                    break;
                }
            }

            if (b.x < 0 || b.x > this.W || b.y < 48 || b.y > this.H + 10) {
                b.graphic.destroy();
                b.trail.destroy();
                return false;
            }
            return !hit;
        });
    }

    shoot(px, py) {
        this.shots++;

        // Fire from bottom-center toward click
        const sx = this.W / 2, sy = this.H + 10;
        const dx = px - sx, dy = py - sy;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const spd = 14;
        const vx = (dx / len) * spd, vy = (dy / len) * spd;

        const g = this.add.graphics().setDepth(15);
        g.fillStyle(DH.bullet); g.fillCircle(0, 0, 6);
        g.setPosition(sx, sy);

        const trail = this.add.graphics().setDepth(14);
        trail.fillStyle(DH.bullet, 0.35); trail.fillCircle(0, 0, 4);
        trail.setPosition(sx, sy);

        const flash = this.add.graphics().setDepth(16);
        flash.fillStyle(0xFFFFFF); flash.fillCircle(sx, sy, 14);
        this.time.delayedCall(65, () => flash.destroy());

        this.bullets.push({ x: sx, y: sy, vx, vy, graphic: g, trail, active: true });
        this.updateStats();
    }

    onHit(entry, bx, by) {
        const isTarget = entry.dino.id === this.targetId;
        this.spawnParticles(entry.sprite.x, entry.sprite.y, isTarget ? 0xFFDD00 : 0xFF4444);

        this.tweens.add({
            targets: entry.sprite,
            alpha: 0,
            scaleX: 1.4, scaleY: 1.4,
            duration: 200,
            onComplete: () => { if (entry.sprite.active) entry.sprite.destroy(); },
        });

        if (isTarget) {
            this.hits++;
            this.score += 100;
            this.scoreTxt.setText('⭐ ' + this.score);

            const t = this.add.text(bx, by - 30, '+100  NICE SHOT! 🎯', {
                fontFamily: 'Arial Black', fontSize: '22px',
                color: '#FFEE00', stroke: '#000', strokeThickness: 4,
            }).setOrigin(0.5).setDepth(20);
            this.tweens.add({
                targets: t, y: by - 100, alpha: 0, duration: 1200,
                onComplete: () => t.destroy(),
            });
            this.cameras.main.flash(120, 255, 220, 50);
        } else {
            this.paused = true;
            this.showFactPanel(entry.dino);
        }
        this.updateStats();
    }

    showFactPanel(dino) {
        const W = this.W, H = this.H;
        const pw = 600, ph = 430;
        const px = W / 2, py = H / 2;
        const group = [];

        // Overlay blocks all clicks
        const overlay = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.65)
            .setDepth(30).setInteractive();
        group.push(overlay);

        // Panel
        group.push(
            this.add.rectangle(px, py, pw, ph, DH.panel)
                .setStrokeStyle(4, DH.panelBorder)
                .setDepth(31)
        );

        const top = py - ph / 2 + 18;

        // Big emoji for the dino
        group.push(
            this.add.text(px - 190, py - 20, dino.emoji, { fontSize: '90px' })
                .setOrigin(0.5).setDepth(32)
        );

        // "Oops" heading
        group.push(
            this.add.text(px + 10, top + 10, 'Oops! That was a ' + dino.nick + '!', {
                fontFamily: 'Arial Black', fontSize: '18px',
                color: '#CC2200', stroke: '#FFF', strokeThickness: 3,
            }).setOrigin(0, 0.5).setDepth(32)
        );

        // Full name
        group.push(
            this.add.text(px + 10, top + 44, dino.name, {
                fontFamily: 'Arial Black', fontSize: '20px',
                color: '#' + dino.bodyColor.toString(16).padStart(6, '0'),
                stroke: '#222', strokeThickness: 3,
            }).setOrigin(0, 0.5).setDepth(32)
        );

        // Info rows
        [
            { icon: '🍽️', label: 'Diet',    val: dino.diet    },
            { icon: '⏳', label: 'Period',  val: dino.period  },
            { icon: '📏', label: 'Length',  val: dino.length  },
            { icon: '⚖️', label: 'Weight', val: dino.weight  },
            { icon: '📍', label: 'Found',   val: dino.found   },
        ].forEach((r, i) => {
            const ry = top + 82 + i * 30;
            group.push(
                this.add.text(px + 10, ry, r.icon + ' ' + r.label + ':', {
                    fontFamily: 'Arial Black', fontSize: '12px', color: '#555',
                }).setOrigin(0, 0.5).setDepth(32)
            );
            group.push(
                this.add.text(px + 118, ry, r.val, {
                    fontFamily: 'Arial', fontSize: '12px', color: '#1F2937',
                    wordWrap: { width: 210 },
                }).setOrigin(0, 0.5).setDepth(32)
            );
        });

        // Fun facts
        group.push(
            this.add.text(px + 10, top + 238, '💡 Fun Facts:', {
                fontFamily: 'Arial Black', fontSize: '14px', color: '#7B2D00',
            }).setOrigin(0, 0.5).setDepth(32)
        );
        dino.facts.slice(0, 3).forEach((fact, i) => {
            group.push(
                this.add.text(px + 10, top + 260 + i * 40, fact, {
                    fontFamily: 'Arial', fontSize: '12px', color: '#1F2937',
                    wordWrap: { width: 265 },
                }).setOrigin(0, 0).setDepth(32)
            );
        });

        // Got it button
        const btnY = py + ph / 2 - 32;
        const btn = this.add.rectangle(px, btnY, 218, 44, 0xA44A3F)
            .setDepth(32).setInteractive({ cursor: 'pointer' });
        const btnTxt = this.add.text(px, btnY, 'Got it! Keep Playing →', {
            fontFamily: 'Arial Black', fontSize: '15px', color: '#FFF',
        }).setOrigin(0.5).setDepth(33);
        group.push(btn, btnTxt);

        btn.on('pointerover', () => btn.setFillStyle(0x8B3A30));
        btn.on('pointerout',  () => btn.setFillStyle(0xA44A3F));
        btn.on('pointerdown', () => {
            group.forEach(o => o.destroy());
            this.paused = false;
        });
    }

    spawnParticles(x, y, color) {
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const speed = 3 + Math.random() * 4;
            const p = this.add.graphics().setDepth(18);
            p.fillStyle(color); p.fillCircle(0, 0, 4 + Math.random() * 4);
            p.setPosition(x, y);
            this.tweens.add({
                targets: p,
                x: x + Math.cos(angle) * speed * 15,
                y: y + Math.sin(angle) * speed * 15,
                alpha: 0, scaleX: 0.2, scaleY: 0.2,
                duration: 500 + Math.random() * 300,
                onComplete: () => p.destroy(),
            });
        }
    }

    drawCrosshair(x, y) {
        const g = this.crosshair;
        g.clear();
        if (this.paused) return;
        const r = 20, gap = 6, arm = 14;
        // Shadow ring
        g.lineStyle(5, 0x000000, 0.55);
        g.strokeCircle(x, y, r);
        g.lineBetween(x - r - arm, y, x - r - gap, y);
        g.lineBetween(x + r + gap, y, x + r + arm, y);
        g.lineBetween(x, y - r - arm, x, y - r - gap);
        g.lineBetween(x, y + r + gap, x, y + r + arm);
        // Red crosshair
        g.lineStyle(3, DH.crosshair, 1);
        g.strokeCircle(x, y, r);
        g.lineBetween(x - r - arm, y, x - r - gap, y);
        g.lineBetween(x + r + gap, y, x + r + arm, y);
        g.lineBetween(x, y - r - arm, x, y - r - gap);
        g.lineBetween(x, y + r + gap, x, y + r + arm);
        // Dot
        g.fillStyle(DH.crosshair, 0.85);
        g.fillCircle(x, y, 3);
    }

    updateStats() {
        const acc = this.shots > 0 ? Math.round((this.hits / this.shots) * 100) : 0;
        this.statTxt.setText('Shots: ' + this.shots + '  Hits: ' + this.hits + '  Accuracy: ' + acc + '%');
    }
}

// ── Shared background ─────────────────────────────────────
function drawBackground(scene, W, H) {
    scene.add.rectangle(W / 2, H * 0.3,  W, H * 0.6,  DH.sky);
    scene.add.rectangle(W / 2, H * 0.65, W, H * 0.5,  DH.skyBot);

    // Mountains
    const mg = scene.add.graphics();
    mg.fillStyle(DH.mountain, 1);
    mg.fillTriangle(0,   H*0.56, 120, H*0.22, 240, H*0.56);
    mg.fillTriangle(150, H*0.56, 290, H*0.18, 420, H*0.56);
    mg.fillTriangle(350, H*0.56, 480, H*0.25, 620, H*0.56);
    mg.fillTriangle(580, H*0.56, 710, H*0.20, 850, H*0.56);
    mg.fillTriangle(750, H*0.56, 870, H*0.28, W+20, H*0.56);
    // Snow caps
    mg.fillStyle(0xFFFFFF, 0.7);
    mg.fillTriangle(92,  H*0.30, 120, H*0.22, 148, H*0.30);
    mg.fillTriangle(262, H*0.26, 290, H*0.18, 318, H*0.26);
    mg.fillTriangle(452, H*0.33, 480, H*0.25, 508, H*0.33);
    mg.fillTriangle(682, H*0.28, 710, H*0.20, 738, H*0.28);
    mg.fillTriangle(844, H*0.36, 870, H*0.28, 896, H*0.36);

    // Ground strip
    scene.add.rectangle(W / 2, H - 18, W, 36, DH.ground);

    // Grass
    const gg = scene.add.graphics();
    gg.fillStyle(DH.grass);
    gg.fillRect(0, H * 0.59, W, 16);
    gg.fillStyle(DH.grassDark);
    for (let x = 0; x < W; x += 20) {
        gg.fillTriangle(x, H * 0.59, x + 10, H * 0.59 - 13, x + 20, H * 0.59);
    }

    // Clouds
    const cg = scene.add.graphics();
    cg.fillStyle(0xFFFFFF, 0.75);
    [[100, 78], [265, 54], [422, 88], [598, 60], [780, 74]].forEach(([cx, cy]) => {
        cg.fillEllipse(cx, cy, 90, 34);
        cg.fillEllipse(cx - 30, cy + 6, 60, 26);
        cg.fillEllipse(cx + 30, cy + 6, 60, 26);
    });
}

// ── Boot game (AFTER all class definitions) ───────────────
const config = createGameConfig({
    width: 900,
    height: 620,
    backgroundColor: DH.sky,
    scene: [TitleScene, SelectScene, GameScene],
});

const game = new Phaser.Game(config);

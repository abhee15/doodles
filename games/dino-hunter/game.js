// ============================================================
// DINO HUNTER - Educational Dinosaur Shooting Game
// ============================================================

const DH = {
    sky:        0x87CEEB,
    skyBot:     0xB0E0E6,
    ground:     0x8B7355,
    grass:      0x5D8A3C,
    grassDark:  0x4A7030,
    mountain:   0x9B8977,
    crosshair:  0xFF2222,
    bullet:     0xFFD700,
    hud:        0x2D1B69,
    panel:      0xFFF8E7,
    panelBorder:0xD4A017,
};

const DINOS = [
    {
        id:'trex', name:'Tyrannosaurus Rex', nick:'T-Rex',
        diet:'Carnivore 🥩', period:'Late Cretaceous (68–66 Ma)',
        length:'~12 m (40 ft)', weight:'8–14 tonnes', found:'North America',
        color:'#E07832', phaser:0xE07832, emoji:'🦖',
        facts:[
            '🦷 T-Rex had 60 banana-sized teeth!',
            '💪 Its bite was the strongest of any land animal.',
            '🍖 Could eat 230 kg of meat in one bite!',
        ],
    },
    {
        id:'triceratops', name:'Triceratops', nick:'Trike',
        diet:'Herbivore 🌿', period:'Late Cretaceous (68–66 Ma)',
        length:'~9 m (30 ft)', weight:'6–12 tonnes', found:'North America',
        color:'#4CAF50', phaser:0x4CAF50, emoji:'🦕',
        facts:[
            '🪙 Its frill may have been used for showing off!',
            '🌿 Triceratops had up to 800 teeth for chewing.',
            '🤼 It used its horns to fight T-Rex.',
        ],
    },
    {
        id:'brachiosaurus', name:'Brachiosaurus', nick:'Brachio',
        diet:'Herbivore 🌿', period:'Late Jurassic (154–153 Ma)',
        length:'~26 m (85 ft)', weight:'30–60 tonnes', found:'N. America, Africa',
        color:'#26A69A', phaser:0x26A69A, emoji:'🦕',
        facts:[
            '🏗️ Taller than a 4-storey building!',
            '🌿 Ate around 400 kg of plants every day.',
            '❤️ Its heart weighed about 400 kg.',
        ],
    },
    {
        id:'velociraptor', name:'Velociraptor', nick:'Raptor',
        diet:'Carnivore 🥩', period:'Late Cretaceous (75–71 Ma)',
        length:'~2 m (6.5 ft)', weight:'~15 kg', found:'Mongolia, China',
        color:'#9C27B0', phaser:0x9C27B0, emoji:'🦖',
        facts:[
            '🐦 Velociraptors had feathers like a bird!',
            '🧠 Very smart — hunted in packs.',
            '🦅 The real raptor was only turkey-sized.',
        ],
    },
    {
        id:'stegosaurus', name:'Stegosaurus', nick:'Stego',
        diet:'Herbivore 🌿', period:'Late Jurassic (155–150 Ma)',
        length:'~9 m (30 ft)', weight:'~5 tonnes', found:'North America',
        color:'#E53935', phaser:0xE53935, emoji:'🦕',
        facts:[
            '🔮 Its brain was the size of a walnut!',
            '🏳️ The back plates may have changed colour.',
            '⚔️ Spiked tail was called a "thagomizer".',
        ],
    },
    {
        id:'pteranodon', name:'Pteranodon', nick:'Ptero',
        diet:'Piscivore 🐟', period:'Late Cretaceous (86–84 Ma)',
        length:'Wingspan ~7 m', weight:'~25 kg', found:'North America',
        color:'#1E88E5', phaser:0x1E88E5, emoji:'🦅',
        facts:[
            '✈️ Wingspan wider than a small airplane!',
            '🐟 Scooped fish from the ocean like a pelican.',
            '🦴 Despite the name, NOT a dinosaur.',
        ],
    },
    {
        id:'ankylosaurus', name:'Ankylosaurus', nick:'Anky',
        diet:'Herbivore 🌿', period:'Late Cretaceous (68–66 Ma)',
        length:'~6–8 m (20–26 ft)', weight:'~6 tonnes', found:'North America',
        color:'#795548', phaser:0x795548, emoji:'🦕',
        facts:[
            '🛡️ Its armour was tougher than bone!',
            '🔨 Club tail could break a T-Rex\'s leg.',
            '🐢 Basically a walking tank covered in spikes.',
        ],
    },
    {
        id:'spinosaurus', name:'Spinosaurus', nick:'Spino',
        diet:'Carnivore 🥩', period:'Cretaceous (112–97 Ma)',
        length:'~14–18 m (46–59 ft)', weight:'~7–20 tonnes', found:'North Africa',
        color:'#F9A825', phaser:0xF9A825, emoji:'🦖',
        facts:[
            '🏆 Possibly the largest predatory dino ever!',
            '🏊 It was a semi-aquatic swimmer.',
            '⛵ Its sail may have stored fat like a camel.',
        ],
    },
    {
        id:'diplodocus', name:'Diplodocus', nick:'Diplo',
        diet:'Herbivore 🌿', period:'Late Jurassic (154–152 Ma)',
        length:'~27 m (90 ft)', weight:'~12–17 tonnes', found:'North America',
        color:'#7CB342', phaser:0x7CB342, emoji:'🦕',
        facts:[
            '📏 One of the longest dinos ever discovered!',
            '🌿 Used its long neck to reach low-lying ferns.',
            '🎵 Could crack its tail like a whip — supersonic!',
        ],
    },
    {
        id:'parasaurolophus', name:'Parasaurolophus', nick:'Para',
        diet:'Herbivore 🌿', period:'Late Cretaceous (76–73 Ma)',
        length:'~10 m (33 ft)', weight:'~2.5 tonnes', found:'North America',
        color:'#EC407A', phaser:0xEC407A, emoji:'🦕',
        facts:[
            '🎺 Its crest worked like a trombone — it could HONK!',
            '🌿 One of the most common duck-billed dinos.',
            '🏃 Could run on two or four legs.',
        ],
    },
];

// ── Simple dino sprite: just a Phaser Text with colored background ──
function makeDinoText(scene, dino, fontSize) {
    fontSize = fontSize || 22;
    return scene.add.text(0, 0, dino.emoji + '\n' + dino.nick, {
        fontFamily: 'Arial Black',
        fontSize: fontSize + 'px',
        color: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 3,
        align: 'center',
        backgroundColor: dino.color,
        padding: { x: 10, y: 6 },
    }).setOrigin(0.5);
}

// ╔══════════════════════════════════════════════════════════╗
// ║  SCENE 3 – GAME                                          ║
// ╚══════════════════════════════════════════════════════════╝
class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    init(data) {
        this.targetId  = (data && data.targetId) || window._dinoTargetId || 'trex';
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

        drawBg(this, W, H);

        // HUD
        this.add.rectangle(W / 2, 24, W, 48, DH.hud, 0.9).setDepth(10);
        const tgt = DINOS.find(d => d.id === this.targetId);

        this.add.text(12, 24, '🎯 TARGET:', { fontFamily:'Arial Black', fontSize:'14px', color:'#FFEE00', stroke:'#000', strokeThickness:3 }).setOrigin(0, 0.5).setDepth(11);

        // Small inline target badge
        const badge = makeDinoText(this, tgt, 13);
        badge.setPosition(W / 2, 24).setDepth(11);

        this.scoreTxt = this.add.text(W - 12, 24, '⭐ 0', { fontFamily:'Arial Black', fontSize:'18px', color:'#FFEE00', stroke:'#000', strokeThickness:3 }).setOrigin(1, 0.5).setDepth(11);

        // Crosshair graphics
        this.crosshair = this.add.graphics().setDepth(20);
        this.input.setDefaultCursor('none');

        // Spawn 6 dinos quickly so the field is full right away
        for (let i = 0; i < 6; i++) {
            this.time.delayedCall(i * 150, () => this.spawnDino());
        }
        this.time.addEvent({ delay:3000, callback:this.spawnDino, callbackScope:this, loop:true });

        // Shoot on click
        this.input.on('pointerdown', ptr => { if (!this.paused) this.shoot(ptr.x, ptr.y); });

        // Back button — re-shows the HTML selection screen
        const back = this.add.text(10, H - 12, '← Pick Dino', { fontFamily:'Arial', fontSize:'14px', color:'#AACCFF', backgroundColor:'#2D1B69', padding:{x:8,y:4} }).setOrigin(0,1).setDepth(11).setInteractive({ cursor:'pointer' });
        back.on('pointerdown', () => {
            document.getElementById('select-screen').style.display = 'flex';
        });

        this.statTxt = this.add.text(W - 10, H - 12, '', { fontFamily:'Arial', fontSize:'13px', color:'#CCDDFF' }).setOrigin(1,1).setDepth(11);
    }

    spawnDino() {
        if (this.paused) return;

        // 35 % chance to spawn the target dino
        const dino = (Math.random() < 0.35)
            ? DINOS.find(d => d.id === this.targetId)
            : DINOS[Math.floor(Math.random() * DINOS.length)];

        // Spawn within visible area so dinos appear immediately
        const startX   = 80 + Math.random() * (this.W - 160);
        const startY   = 65 + Math.random() * (this.H - 150);
        const speed    = 1.0 + Math.random() * 1.5;
        const vx       = (Math.random() < 0.5 ? 1 : -1) * speed;
        const vy       = (Math.random() - 0.5) * 0.8;
        const fontSize = Math.round(18 + Math.random() * 8);

        const sprite = makeDinoText(this, dino, fontSize);
        sprite.setPosition(startX, startY).setDepth(5);

        this.dinoGroup.push({ sprite, vx, vy, bob: Math.random() * Math.PI * 2, dino });

        this.time.delayedCall(14000, () => { if (sprite.active) sprite.destroy(); });
    }

    update() {
        const ptr = this.input.activePointer;
        this.drawCrosshair(ptr.x, ptr.y);

        // Move dinos
        this.dinoGroup = this.dinoGroup.filter(entry => {
            if (!entry.sprite.active) return false;

            entry.sprite.x += entry.vx;
            entry.sprite.y += entry.vy;
            entry.bob += 0.06;
            entry.sprite.y += Math.sin(entry.bob) * 0.3;

            const hw = entry.sprite.width  / 2 + 4;
            const hh = entry.sprite.height / 2 + 4;

            if (entry.sprite.x < hw || entry.sprite.x > this.W - hw)  entry.vx *= -1;
            if (entry.sprite.y < 55  || entry.sprite.y > this.H - 46) entry.vy *= -1;

            return true;
        });

        // Move bullets + hit detection
        this.bullets = this.bullets.filter(b => {
            if (!b.active) return false;
            b.x += b.vx; b.y += b.vy;
            b.gfx.setPosition(b.x, b.y);
            b.trail.setPosition(b.x - b.vx * 4, b.y - b.vy * 4);

            let hit = false;
            for (const e of this.dinoGroup) {
                if (!e.sprite.active) continue;
                const dx = b.x - e.sprite.x;
                const dy = b.y - e.sprite.y;
                const hw = e.sprite.width  / 2 + 4;
                const hh = e.sprite.height / 2 + 4;
                if (Math.abs(dx) < hw && Math.abs(dy) < hh) {
                    hit = true;
                    this.onHit(e, b.x, b.y);
                    b.gfx.destroy(); b.trail.destroy(); b.active = false;
                    break;
                }
            }

            if (b.x < 0 || b.x > this.W || b.y < 46 || b.y > this.H + 10) {
                b.gfx.destroy(); b.trail.destroy();
                return false;
            }
            return !hit;
        });
    }

    shoot(px, py) {
        this.shots++;
        const sx = this.W / 2, sy = this.H + 10;
        const dx = px - sx, dy = py - sy;
        const len = Math.sqrt(dx*dx + dy*dy) || 1;
        const spd = 14;
        const vx = dx/len*spd, vy = dy/len*spd;

        const gfx = this.add.graphics().setDepth(15);
        gfx.fillStyle(DH.bullet); gfx.fillCircle(0,0,6); gfx.setPosition(sx,sy);

        const trail = this.add.graphics().setDepth(14);
        trail.fillStyle(DH.bullet, 0.4); trail.fillCircle(0,0,4); trail.setPosition(sx,sy);

        const flash = this.add.graphics().setDepth(16);
        flash.fillStyle(0xFFFFFF); flash.fillCircle(sx,sy,14);
        this.time.delayedCall(60, () => flash.destroy());

        this.bullets.push({ x:sx, y:sy, vx, vy, gfx, trail, active:true });
        this.updateStats();
    }

    onHit(entry, bx, by) {
        const isTarget = entry.dino.id === this.targetId;
        this.spawnParticles(entry.sprite.x, entry.sprite.y, isTarget ? 0xFFDD00 : 0xFF4444);

        this.tweens.add({
            targets: entry.sprite, alpha:0, scaleX:1.4, scaleY:1.4, duration:180,
            onComplete: () => { if (entry.sprite.active) entry.sprite.destroy(); },
        });

        if (isTarget) {
            this.hits++;  this.score += 100;
            this.scoreTxt.setText('⭐ ' + this.score);
            const t = this.add.text(bx, by-30, '+100  NICE SHOT! 🎯', {
                fontFamily:'Arial Black', fontSize:'22px', color:'#FFEE00', stroke:'#000', strokeThickness:4 }).setOrigin(0.5).setDepth(20);
            this.tweens.add({ targets:t, y:by-100, alpha:0, duration:1200, onComplete:()=>t.destroy() });
            this.cameras.main.flash(120, 255, 220, 50);
        } else {
            this.paused = true;
            this.showFactPanel(entry.dino);
        }
        this.updateStats();
    }

    showFactPanel(dino) {
        const W = this.W, H = this.H;
        const pw = 600, ph = 430, px = W/2, py = H/2;
        const grp = [];

        grp.push(this.add.rectangle(W/2,H/2,W,H,0x000000,0.65).setDepth(30).setInteractive());
        grp.push(this.add.rectangle(px,py,pw,ph,DH.panel).setStrokeStyle(4,DH.panelBorder).setDepth(31));

        const top = py - ph/2 + 16;

        // Big emoji
        grp.push(this.add.text(px-192, py-20, dino.emoji, { fontSize:'88px' }).setOrigin(0.5).setDepth(32));

        grp.push(this.add.text(px+12, top+10, 'Oops! That was a '+dino.nick+'!', {
            fontFamily:'Arial Black', fontSize:'17px', color:'#CC2200', stroke:'#FFF', strokeThickness:3 }).setOrigin(0,0.5).setDepth(32));

        grp.push(this.add.text(px+12, top+44, dino.name, {
            fontFamily:'Arial Black', fontSize:'19px',
            color: dino.color, stroke:'#222', strokeThickness:3 }).setOrigin(0,0.5).setDepth(32));

        [
            ['🍽️ Diet',   dino.diet   ],
            ['⏳ Period',  dino.period ],
            ['📏 Length',  dino.length ],
            ['⚖️ Weight', dino.weight ],
            ['📍 Found',   dino.found  ],
        ].forEach(([lbl,val],i) => {
            const ry = top + 82 + i*30;
            grp.push(this.add.text(px+12, ry, lbl+':', { fontFamily:'Arial Black', fontSize:'11px', color:'#555' }).setOrigin(0,0.5).setDepth(32));
            grp.push(this.add.text(px+120, ry, val,  { fontFamily:'Arial',       fontSize:'11px', color:'#111', wordWrap:{width:215} }).setOrigin(0,0.5).setDepth(32));
        });

        grp.push(this.add.text(px+12, top+240, '💡 Fun Facts:', { fontFamily:'Arial Black', fontSize:'13px', color:'#7B2D00' }).setOrigin(0,0.5).setDepth(32));
        dino.facts.slice(0,3).forEach((f,i) => {
            grp.push(this.add.text(px+12, top+262+i*40, f, { fontFamily:'Arial', fontSize:'12px', color:'#1F2937', wordWrap:{width:265} }).setOrigin(0,0).setDepth(32));
        });

        const btnY = py + ph/2 - 30;
        const btn  = this.add.rectangle(px, btnY, 218, 42, 0xA44A3F).setDepth(32).setInteractive({cursor:'pointer'});
        const bTxt = this.add.text(px, btnY, 'Got it! Keep Playing →', { fontFamily:'Arial Black', fontSize:'15px', color:'#FFF' }).setOrigin(0.5).setDepth(33);
        grp.push(btn, bTxt);

        btn.on('pointerover',  () => btn.setFillStyle(0x8B3A30));
        btn.on('pointerout',   () => btn.setFillStyle(0xA44A3F));
        btn.on('pointerdown',  () => { grp.forEach(o=>o.destroy()); this.paused=false; });
    }

    spawnParticles(x, y, color) {
        for (let i = 0; i < 12; i++) {
            const a = (i/12)*Math.PI*2, spd = 3+Math.random()*4;
            const p = this.add.graphics().setDepth(18);
            p.fillStyle(color); p.fillCircle(0,0,4+Math.random()*4); p.setPosition(x,y);
            this.tweens.add({ targets:p, x:x+Math.cos(a)*spd*15, y:y+Math.sin(a)*spd*15, alpha:0, scaleX:0.2, scaleY:0.2, duration:500+Math.random()*300, onComplete:()=>p.destroy() });
        }
    }

    drawCrosshair(x, y) {
        const g = this.crosshair;
        g.clear();
        if (this.paused) return;
        const r=20, gap=6, arm=14;
        [[5,0x000000,0.55],[3,DH.crosshair,1]].forEach(([lw,col,a]) => {
            g.lineStyle(lw,col,a);
            g.strokeCircle(x,y,r);
            g.lineBetween(x-r-arm,y,x-r-gap,y); g.lineBetween(x+r+gap,y,x+r+arm,y);
            g.lineBetween(x,y-r-arm,x,y-r-gap); g.lineBetween(x,y+r+gap,x,y+r+arm);
        });
        g.fillStyle(DH.crosshair,0.85); g.fillCircle(x,y,3);
    }

    updateStats() {
        const acc = this.shots > 0 ? Math.round(this.hits/this.shots*100) : 0;
        this.statTxt.setText('Shots:'+this.shots+'  Hits:'+this.hits+'  Accuracy:'+acc+'%');
    }
}

// ── Background helper ─────────────────────────────────────
function drawBg(scene, W, H) {
    scene.add.rectangle(W/2, H*0.30, W, H*0.60, DH.sky);
    scene.add.rectangle(W/2, H*0.65, W, H*0.50, DH.skyBot);

    const mg = scene.add.graphics();
    mg.fillStyle(DH.mountain,1);
    [[0,120,240],[150,290,420],[350,480,620],[580,710,850],[750,870,W+20]].forEach(([l,p,r])=>{
        mg.fillTriangle(l,H*0.56, p,H*0.20, r,H*0.56);
    });
    mg.fillStyle(0xFFFFFF,0.7);
    [[92,120,148],[262,290,318],[452,480,508],[682,710,738],[844,870,896]].forEach(([l,p,r])=>{
        mg.fillTriangle(l,H*0.30, p,H*0.20, r,H*0.30);
    });

    scene.add.rectangle(W/2, H-18, W, 36, DH.ground);

    const gg = scene.add.graphics();
    gg.fillStyle(DH.grass); gg.fillRect(0,H*0.59,W,16);
    gg.fillStyle(DH.grassDark);
    for (let x=0;x<W;x+=20) gg.fillTriangle(x,H*0.59,x+10,H*0.59-13,x+20,H*0.59);

    const cg = scene.add.graphics();
    cg.fillStyle(0xFFFFFF,0.75);
    [[100,78],[265,54],[422,88],[598,60],[780,74]].forEach(([cx,cy])=>{
        cg.fillEllipse(cx,cy,90,34);
        cg.fillEllipse(cx-30,cy+6,60,26);
        cg.fillEllipse(cx+30,cy+6,60,26);
    });
}

// ── Boot: called by index.html after dino selection ───────
window.startDinoGame = function(dinoId) {
    window._dinoTargetId = dinoId;
    // Destroy any previous game instance
    if (window._phaserGame) { window._phaserGame.destroy(true); }
    const config = createGameConfig({
        width: 900,
        height: 620,
        backgroundColor: DH.sky,
        scene: [GameScene],
    });
    window._phaserGame = new Phaser.Game(config);
};

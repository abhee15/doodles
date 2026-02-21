// ============================================================
// DINO HUNTER — Pure Canvas 2D (no Phaser dependency)
// ============================================================

const DINOS = [
    { id:'trex',           name:'Tyrannosaurus Rex', nick:'T-Rex',   emoji:'🦖', diet:'Carnivore',  dietIcon:'🥩', period:'Late Cretaceous (68–66 Ma)', length:'~12 m',      weight:'8–14 t',    found:'North America',     color:'#E07832', facts:['T-Rex had 60 banana-sized teeth!','Its bite was the strongest of any land animal.','Could eat 230 kg of meat in one bite!'] },
    { id:'triceratops',    name:'Triceratops',        nick:'Trike',   emoji:'🦕', diet:'Herbivore',  dietIcon:'🌿', period:'Late Cretaceous (68–66 Ma)', length:'~9 m',       weight:'6–12 t',    found:'North America',     color:'#4CAF50', facts:['Its frill may have been used for showing off!','Triceratops had up to 800 teeth.','It used its horns to fight T-Rex.'] },
    { id:'brachiosaurus',  name:'Brachiosaurus',      nick:'Brachio', emoji:'🦕', diet:'Herbivore',  dietIcon:'🌿', period:'Late Jurassic (154–153 Ma)', length:'~26 m',      weight:'30–60 t',   found:'N. America, Africa', color:'#26A69A', facts:['Taller than a 4-storey building!','Ate around 400 kg of plants every day.','Its heart weighed about 400 kg.'] },
    { id:'velociraptor',   name:'Velociraptor',       nick:'Raptor',  emoji:'🦖', diet:'Carnivore',  dietIcon:'🥩', period:'Late Cretaceous (75–71 Ma)', length:'~2 m',       weight:'~15 kg',    found:'Mongolia, China',   color:'#9C27B0', facts:['Velociraptors had feathers like a bird!','Very smart — hunted in packs.','The real raptor was only turkey-sized.'] },
    { id:'stegosaurus',    name:'Stegosaurus',        nick:'Stego',   emoji:'🦕', diet:'Herbivore',  dietIcon:'🌿', period:'Late Jurassic (155–150 Ma)', length:'~9 m',       weight:'~5 t',      found:'North America',     color:'#E53935', facts:['Its brain was the size of a walnut!','Back plates may have changed colour.','Spiked tail was called a "thagomizer".'] },
    { id:'pteranodon',     name:'Pteranodon',         nick:'Ptero',   emoji:'🦅', diet:'Piscivore',  dietIcon:'🐟', period:'Late Cretaceous (86–84 Ma)', length:'Wingspan ~7 m',weight:'~25 kg',   found:'North America',     color:'#1E88E5', facts:['Wingspan wider than a small airplane!','Scooped fish from the ocean like a pelican.','Despite the name, NOT a dinosaur.'] },
    { id:'ankylosaurus',   name:'Ankylosaurus',       nick:'Anky',    emoji:'🦕', diet:'Herbivore',  dietIcon:'🌿', period:'Late Cretaceous (68–66 Ma)', length:'~6–8 m',     weight:'~6 t',      found:'North America',     color:'#795548', facts:['Its armour was tougher than bone!','Club tail could break a T-Rex\'s leg.','Basically a walking tank covered in spikes.'] },
    { id:'spinosaurus',    name:'Spinosaurus',        nick:'Spino',   emoji:'🦖', diet:'Carnivore',  dietIcon:'🥩', period:'Cretaceous (112–97 Ma)',     length:'~14–18 m',   weight:'7–20 t',    found:'North Africa',      color:'#F9A825', facts:['Possibly the largest predatory dino ever!','It was a semi-aquatic swimmer.','Its sail may have stored fat like a camel.'] },
    { id:'diplodocus',     name:'Diplodocus',         nick:'Diplo',   emoji:'🦕', diet:'Herbivore',  dietIcon:'🌿', period:'Late Jurassic (154–152 Ma)', length:'~27 m',      weight:'12–17 t',   found:'North America',     color:'#7CB342', facts:['One of the longest dinos ever discovered!','Used its long neck to reach low-lying ferns.','Could crack its tail like a whip — supersonic!'] },
    { id:'parasaurolophus',name:'Parasaurolophus',    nick:'Para',    emoji:'🦕', diet:'Herbivore',  dietIcon:'🌿', period:'Late Cretaceous (76–73 Ma)', length:'~10 m',      weight:'~2.5 t',    found:'North America',     color:'#EC407A', facts:['Its crest worked like a trombone — it could HONK!','One of the most common duck-billed dinos.','Could run on two or four legs.'] },
];

// ── State ─────────────────────────────────────────────────
let G = null; // game state

// ── Entry point (called from index.html) ──────────────────
window.startDinoGame = function(targetId) {
    // Remove old canvas and dino divs if re-starting
    const old = document.getElementById('dh-canvas');
    if (old) old.remove();
    document.querySelectorAll('.dh-dino').forEach(el => el.remove());

    const container = document.getElementById('game-container');
    const W = container.clientWidth  || 900;
    const H = container.clientHeight || 600;

    const canvas = document.createElement('canvas');
    canvas.id = 'dh-canvas';
    canvas.width  = W;
    canvas.height = H;
    canvas.style.cssText = 'position:absolute;top:0;left:0;display:block;cursor:none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    G = {
        canvas, ctx, W, H,
        targetId,
        dinos: [],
        bullets: [],
        floats: [],     // floating score texts
        score: 0, shots: 0, hits: 0,
        paused: false,
        mx: W / 2, my: H / 2,
        spawnTimer: 0,
        raf: null,
    };

    // Initial batch of dinos
    for (let i = 0; i < 6; i++) spawnDino();

    // Input
    canvas.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        G.mx = (e.clientX - r.left) * (W / r.width);
        G.my = (e.clientY - r.top)  * (H / r.height);
    });
    canvas.addEventListener('click', e => {
        const r = canvas.getBoundingClientRect();
        const cx = (e.clientX - r.left) * (W / r.width);
        const cy = (e.clientY - r.top)  * (H / r.height);
        // Back button hit-test  (bottom-left corner)
        if (cx < 120 && cy > H - 44) {
            document.getElementById('select-screen').style.display = 'flex';
            return;
        }
        if (!G.paused) shoot(cx, cy);
    });

    G.raf = requestAnimationFrame(loop);
};

// ── Game loop ─────────────────────────────────────────────
let lastTs = 0;
function loop(ts) {
    if (!G) return;
    const dt = Math.min(ts - lastTs, 50);
    lastTs = ts;
    if (!G.paused) update(dt);
    draw();
    G.raf = requestAnimationFrame(loop);
}

// ── Update ────────────────────────────────────────────────
function update(dt) {
    const { W, H } = G;
    G.spawnTimer += dt;
    if (G.spawnTimer > 3000) { G.spawnTimer = 0; spawnDino(); }

    // Move dinos + update their HTML div positions
    G.dinos.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        d.bob += 0.05;
        d.y += Math.sin(d.bob) * 0.25;
        if (d.x - 48 < 0 || d.x + 48 > W) d.vx *= -1;
        if (d.y - 30 < 48 || d.y + 30 > H - 38) d.vy *= -1;
        // Sync the HTML element position (canvas coords → container pixels)
        const scaleX = G.canvas.getBoundingClientRect().width  / W;
        const scaleY = G.canvas.getBoundingClientRect().height / H;
        d.el.style.left = (d.x * scaleX) + 'px';
        d.el.style.top  = (d.y * scaleY) + 'px';
    });

    // Move bullets + hit detection
    G.bullets = G.bullets.filter(b => {
        b.x += b.vx; b.y += b.vy;
        for (const d of G.dinos) {
            if (Math.abs(b.x - d.x) < 48 && Math.abs(b.y - d.y) < 30) {
                onHit(d, b.x, b.y);
                G.dinos.splice(G.dinos.indexOf(d), 1);
                return false;
            }
        }
        return b.y > -20 && b.y < H + 20 && b.x > -20 && b.x < W + 20;
    });

    // Float texts
    G.floats = G.floats.filter(f => { f.y -= 1.2; f.life -= dt; return f.life > 0; });
}

function spawnDino() {
    if (G.dinos.length >= 9) return;
    const { W, H, targetId } = G;
    const dino = Math.random() < 0.35
        ? DINOS.find(d => d.id === targetId)
        : DINOS[Math.floor(Math.random() * DINOS.length)];

    // HTML div — emoji renders perfectly in HTML on all platforms
    const el = document.createElement('div');
    el.className = 'dh-dino';
    el.style.cssText = 'position:absolute;transform:translate(-50%,-50%);pointer-events:none;text-align:center;transition:opacity .2s,transform .2s;z-index:5';
    el.innerHTML =
        '<div style="background:' + dino.color + ';border:3px solid #111;border-radius:10px;padding:6px 10px;min-width:80px">' +
        '<div style="font-size:30px;line-height:1.1">' + dino.emoji + '</div>' +
        '<div style="font:bold 12px Arial,sans-serif;color:#fff;text-shadow:1px 1px 0 #000;margin-top:2px">' + dino.nick + '</div>' +
        '</div>';
    document.getElementById('game-container').appendChild(el);

    G.dinos.push({
        dino, el,
        x: 80 + Math.random() * (W - 160),
        y: 70 + Math.random() * (H - 150),
        vx: (Math.random() < 0.5 ? 1 : -1) * (0.8 + Math.random() * 1.2),
        vy: (Math.random() - 0.5) * 0.6,
        bob: Math.random() * Math.PI * 2,
    });
}

function shoot(tx, ty) {
    G.shots++;
    const sx = G.W / 2, sy = G.H + 10;
    const dx = tx - sx, dy = ty - sy;
    const len = Math.hypot(dx, dy) || 1;
    const spd = 16;
    G.bullets.push({ x: sx, y: sy, vx: dx / len * spd, vy: dy / len * spd });
}

function onHit(d, bx, by) {
    // Animate the div out
    d.el.style.opacity = '0';
    d.el.style.transform = 'translate(-50%,-50%) scale(1.5)';
    setTimeout(() => d.el.remove(), 220);

    const isTarget = d.dino.id === G.targetId;
    if (isTarget) {
        G.hits++; G.score += 100;
        G.floats.push({ text: '+100  NICE SHOT!', x: bx, y: by, color: '#FFEE00', life: 1200 });
    } else {
        G.paused = true;
        showFactPanel(d.dino);
    }
}

// ── Draw ──────────────────────────────────────────────────
function draw() {
    const { ctx, W, H } = G;

    // Sky
    ctx.fillStyle = '#87CEEB'; ctx.fillRect(0, 0, W, H * 0.65);
    ctx.fillStyle = '#B0E0E6'; ctx.fillRect(0, H * 0.55, W, H * 0.45);

    // Mountains
    ctx.fillStyle = '#9B8977';
    [[0,120,240],[150,290,420],[350,480,620],[580,710,850],[750,870,900]].forEach(([l,p,r]) => {
        ctx.beginPath();
        ctx.moveTo(l*W/900, H*.56); ctx.lineTo(p*W/900, H*.20); ctx.lineTo(r*W/900, H*.56);
        ctx.fill();
    });
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    [[92,120,148],[262,290,318],[452,480,508],[682,710,738],[844,870,896]].forEach(([l,p,r]) => {
        ctx.beginPath();
        ctx.moveTo(l*W/900, H*.30); ctx.lineTo(p*W/900, H*.20); ctx.lineTo(r*W/900, H*.30);
        ctx.fill();
    });

    // Grass
    ctx.fillStyle = '#5D8A3C'; ctx.fillRect(0, H*.59, W, 16);
    ctx.fillStyle = '#4A7030';
    for (let x = 0; x < W; x += 20) {
        ctx.beginPath(); ctx.moveTo(x,H*.59); ctx.lineTo(x+10,H*.59-12); ctx.lineTo(x+20,H*.59); ctx.fill();
    }
    // Ground
    ctx.fillStyle = '#8B7355'; ctx.fillRect(0, H - 36, W, 36);

    // Dinos are rendered as HTML divs — nothing to draw on canvas here

    // Bullets
    G.bullets.forEach(b => {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.arc(b.x, b.y, 6, 0, Math.PI*2); ctx.fill();
    });

    // Floating texts
    G.floats.forEach(f => {
        const a = Math.min(1, f.life / 400);
        ctx.globalAlpha = a;
        ctx.font = 'bold 22px Arial Black, Arial';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.strokeStyle = '#000'; ctx.lineWidth = 4;
        ctx.strokeText(f.text, f.x, f.y);
        ctx.fillStyle = f.color;
        ctx.fillText(f.text, f.x, f.y);
        ctx.globalAlpha = 1;
    });

    // HUD bar
    ctx.fillStyle = 'rgba(45,27,105,0.92)';
    ctx.fillRect(0, 0, W, 46);

    const tgt = DINOS.find(d => d.id === G.targetId);
    ctx.font = 'bold 15px Arial Black, Arial';
    ctx.fillStyle = '#FFEE00'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('TARGET: ' + tgt.nick, 12, 23);

    ctx.textAlign = 'right';
    ctx.fillText('SCORE: ' + G.score, W - 12, 23);

    // Stats bottom-right
    ctx.fillStyle = '#CCDDFF'; ctx.font = '12px Arial';
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    const acc = G.shots > 0 ? Math.round(G.hits / G.shots * 100) : 0;
    ctx.fillText('Shots:' + G.shots + '  Hits:' + G.hits + '  Acc:' + acc + '%', W - 10, H - 8);

    // Back button
    ctx.fillStyle = '#2D1B69'; roundRect(ctx, 8, H - 40, 110, 30, 6, true, false);
    ctx.fillStyle = '#AACCFF'; ctx.font = '13px Arial'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('\u2190 Pick Dino', 16, H - 25);

    // Crosshair
    if (!G.paused) drawCrosshair(ctx, G.mx, G.my);
}

function drawCrosshair(ctx, x, y) {
    const r = 20, gap = 6, arm = 14;
    [[5,'rgba(0,0,0,0.5)'],[3,'#FF2222']].forEach(([lw, col]) => {
        ctx.strokeStyle = col; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x-r-arm,y); ctx.lineTo(x-r-gap,y);
        ctx.moveTo(x+r+gap,y); ctx.lineTo(x+r+arm,y);
        ctx.moveTo(x,y-r-arm); ctx.lineTo(x,y-r-gap);
        ctx.moveTo(x,y+r+gap); ctx.lineTo(x,y+r+arm);
        ctx.stroke();
    });
    ctx.fillStyle = '#FF2222';
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2); ctx.fill();
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.arcTo(x+w,y,   x+w,y+r,   r);
    ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r, y+h); ctx.arcTo(x,y+h,   x,y+h-r,   r);
    ctx.lineTo(x, y+r); ctx.arcTo(x,y,       x+r,y,     r);
    ctx.closePath();
    if (fill)   ctx.fill();
    if (stroke) ctx.stroke();
}

// ── Fact panel (HTML overlay) ─────────────────────────────
function showFactPanel(dino) {
    const el = document.createElement('div');
    el.id = 'dh-fact';
    el.style.cssText = 'position:absolute;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.65)';
    el.innerHTML = `
        <div style="background:#FFF8E7;border:4px solid #D4A017;border-radius:14px;padding:28px 32px;max-width:540px;width:90%;font-family:Arial,sans-serif;position:relative">
            <div style="font:bold 18px Arial Black,Arial;color:#CC2200;margin-bottom:4px">Oops! That was a ${dino.nick}!</div>
            <div style="font:bold 22px Arial Black,Arial;color:${dino.color};margin-bottom:14px">${dino.name}</div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:13px">
                <tr><td style="padding:3px 0;color:#555;font-weight:bold;width:80px">Diet</td><td>${dino.diet} ${dino.dietIcon}</td></tr>
                <tr><td style="padding:3px 0;color:#555;font-weight:bold">Period</td><td>${dino.period}</td></tr>
                <tr><td style="padding:3px 0;color:#555;font-weight:bold">Length</td><td>${dino.length}</td></tr>
                <tr><td style="padding:3px 0;color:#555;font-weight:bold">Weight</td><td>${dino.weight}</td></tr>
                <tr><td style="padding:3px 0;color:#555;font-weight:bold">Found</td><td>${dino.found}</td></tr>
            </table>
            <div style="font:bold 13px Arial Black,Arial;color:#7B2D00;margin-bottom:8px">💡 Fun Facts:</div>
            ${dino.facts.map(f => `<div style="font-size:12px;color:#1F2937;margin-bottom:6px">${f}</div>`).join('')}
            <button onclick="document.getElementById('dh-fact').remove();G.paused=false;"
                style="margin-top:16px;background:#A44A3F;color:#fff;border:none;border-radius:8px;padding:10px 24px;font:bold 15px Arial Black,Arial;cursor:pointer;width:100%">
                Got it! Keep Playing →
            </button>
        </div>`;
    document.getElementById('game-container').appendChild(el);
}

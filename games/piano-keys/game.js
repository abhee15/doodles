// ══════════════════════════════════════════════════════════════
// Piano Keys Game — Phaser 3 with Web Audio API synthesis
// COMPLETE REWRITE: Fixed timing, added speed control, keyboard labels
// ══════════════════════════════════════════════════════════════

// ─── Constants ──────────────────────────────────────────────
const WHITE_NOTES_2OCT = [
  'C3',
  'D3',
  'E3',
  'F3',
  'G3',
  'A3',
  'B3',
  'C4',
  'D4',
  'E4',
  'F4',
  'G4',
  'A4',
  'B4',
  'C5'
];

const BLACK_NOTE_POSITIONS_2OCT = [
  { note: 'C#3', afterWhiteIdx: 0 },
  { note: 'D#3', afterWhiteIdx: 1 },
  { note: 'F#3', afterWhiteIdx: 3 },
  { note: 'G#3', afterWhiteIdx: 4 },
  { note: 'A#3', afterWhiteIdx: 5 },
  { note: 'C#4', afterWhiteIdx: 7 },
  { note: 'D#4', afterWhiteIdx: 8 },
  { note: 'F#4', afterWhiteIdx: 10 },
  { note: 'G#4', afterWhiteIdx: 11 },
  { note: 'A#4', afterWhiteIdx: 12 }
];

const WHITE_NOTES_1OCT = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
const BLACK_NOTE_POSITIONS_1OCT = [
  { note: 'C#4', afterWhiteIdx: 0 },
  { note: 'D#4', afterWhiteIdx: 1 },
  { note: 'F#4', afterWhiteIdx: 3 },
  { note: 'G#4', afterWhiteIdx: 4 },
  { note: 'A#4', afterWhiteIdx: 5 }
];

const CHORDS = [
  {
    id: 'C_maj',
    label: 'C Major',
    keys: ['C4', 'E4', 'G4'],
    fingers: [1, 3, 5],
    color: 0xf9a8d4
  },
  {
    id: 'G_maj',
    label: 'G Major',
    keys: ['G4', 'B4', 'D5'],
    fingers: [1, 3, 5],
    color: 0x86efac
  },
  {
    id: 'A_min',
    label: 'A Minor',
    keys: ['A4', 'C5', 'E5'],
    fingers: [1, 3, 5],
    color: 0xc4b5fd
  },
  {
    id: 'F_maj',
    label: 'F Major',
    keys: ['F4', 'A4', 'C5'],
    fingers: [1, 3, 5],
    color: 0xfcd34d
  },
  {
    id: 'E_min',
    label: 'E Minor',
    keys: ['E4', 'G4', 'B4'],
    fingers: [1, 3, 5],
    color: 0x6ee7b7
  },
  {
    id: 'D_min',
    label: 'D Minor',
    keys: ['D4', 'F4', 'A4'],
    fingers: [1, 3, 5],
    color: 0x93c5fd
  }
];

const SONGS = [
  {
    id: 1,
    title: 'Hot Cross Buns',
    difficulty: 1,
    bpm: 100,
    notes: [
      { key: 'E4', beat: 0, duration: 1 },
      { key: 'D4', beat: 1, duration: 1 },
      { key: 'C4', beat: 2, duration: 2 },
      { key: 'E4', beat: 4, duration: 1 },
      { key: 'D4', beat: 5, duration: 1 },
      { key: 'C4', beat: 6, duration: 2 }
    ]
  },
  {
    id: 2,
    title: 'Mary Had a Little Lamb',
    difficulty: 1,
    bpm: 100,
    notes: [
      { key: 'E4', beat: 0, duration: 1 },
      { key: 'D4', beat: 1, duration: 1 },
      { key: 'C4', beat: 2, duration: 1 },
      { key: 'D4', beat: 3, duration: 1 },
      { key: 'E4', beat: 4, duration: 1 },
      { key: 'E4', beat: 5, duration: 1 },
      { key: 'E4', beat: 6, duration: 2 }
    ]
  },
  {
    id: 3,
    title: 'Twinkle Twinkle',
    difficulty: 1,
    bpm: 90,
    notes: [
      { key: 'C4', beat: 0, duration: 1 },
      { key: 'C4', beat: 1, duration: 1 },
      { key: 'G4', beat: 2, duration: 1 },
      { key: 'A4', beat: 3, duration: 1 },
      { key: 'G4', beat: 4, duration: 2 },
      { key: 'F4', beat: 6, duration: 1 },
      { key: 'E4', beat: 7, duration: 1 }
    ]
  },
  {
    id: 4,
    title: 'London Bridge',
    difficulty: 1,
    bpm: 104,
    notes: [
      { key: 'G4', beat: 0, duration: 1 },
      { key: 'A4', beat: 1, duration: 1 },
      { key: 'B4', beat: 2, duration: 1 },
      { key: 'C5', beat: 3, duration: 1 },
      { key: 'B4', beat: 4, duration: 1 },
      { key: 'A4', beat: 5, duration: 1 },
      { key: 'G4', beat: 6, duration: 2 }
    ]
  },
  {
    id: 5,
    title: 'Happy Birthday',
    difficulty: 1,
    bpm: 88,
    notes: [
      { key: 'C4', beat: 0, duration: 0.5 },
      { key: 'C4', beat: 0.5, duration: 0.5 },
      { key: 'D4', beat: 1, duration: 1 },
      { key: 'C4', beat: 2, duration: 1 },
      { key: 'F4', beat: 3, duration: 1 },
      { key: 'E4', beat: 4, duration: 2 }
    ]
  },
  {
    id: 6,
    title: 'Jingle Bells',
    difficulty: 2,
    bpm: 120,
    notes: [
      { key: 'E4', beat: 0, duration: 1 },
      { key: 'E4', beat: 1, duration: 1 },
      { key: 'E4', beat: 2, duration: 1 },
      { key: 'E4', beat: 3, duration: 1 },
      { key: 'E4', beat: 4, duration: 1 },
      { key: 'G4', beat: 5, duration: 1 },
      { key: 'C4', beat: 6, duration: 1 },
      { key: 'D4', beat: 7, duration: 1 }
    ]
  },
  {
    id: 7,
    title: 'Ode to Joy',
    difficulty: 2,
    bpm: 96,
    notes: [
      { key: 'E4', beat: 0, duration: 1 },
      { key: 'E4', beat: 1, duration: 1 },
      { key: 'F4', beat: 2, duration: 1 },
      { key: 'G4', beat: 3, duration: 1 },
      { key: 'A4', beat: 4, duration: 1 },
      { key: 'A4', beat: 5, duration: 1 },
      { key: 'A4', beat: 6, duration: 1 },
      { key: 'G4', beat: 7, duration: 1 }
    ]
  },
  {
    id: 8,
    title: 'Row Row Row Your Boat',
    difficulty: 1,
    bpm: 108,
    notes: [
      { key: 'C4', beat: 0, duration: 1 },
      { key: 'C4', beat: 1, duration: 1 },
      { key: 'C4', beat: 2, duration: 0.5 },
      { key: 'D4', beat: 2.5, duration: 0.5 },
      { key: 'E4', beat: 3, duration: 1 },
      { key: 'F4', beat: 4, duration: 0.5 },
      { key: 'E4', beat: 4.5, duration: 0.5 },
      { key: 'D4', beat: 5, duration: 0.5 },
      { key: 'C4', beat: 5.5, duration: 0.5 }
    ]
  }
];

const SCREEN = { MENU: 0, LEARN: 1, SONG_SELECT: 2, PLAY: 3, RESULTS: 4 };

// Keyboard mapping for desktop play
// White keys (bottom row): Z, X, C, V, B, N, M, , = C4 through C5
// Black keys (top row):    S, D, (E skip), G, H, J = C#, D#, F#, G#, A# (mirrors real piano layout)
const KEYBOARD_MAP = {
  // White keys
  z: 'C4',
  x: 'D4',
  c: 'E4',
  v: 'F4',
  b: 'G4',
  n: 'A4',
  m: 'B4',
  ',': 'C5',
  // Black keys
  s: 'C#4',
  d: 'D#4',
  g: 'F#4',
  h: 'G#4',
  j: 'A#4'
};

const KEYBOARD_LABELS = {
  // White key labels (shown on piano)
  C4: 'Z',
  D4: 'X',
  E4: 'C',
  F4: 'V',
  G4: 'B',
  A4: 'N',
  B4: 'M',
  C5: ','
  // Black keys don't show labels (since they're not easily labeled on visualization)
};

// Fall speed constant: 300px/s = 0.3px/ms
const FALL_SPEED_PX_PER_MS = 0.3;
const HUD_HEIGHT = 70;
const LEAD_IN_MS = 2000;
const HIT_WINDOW_MS = 150; // ±150ms to hit a note

// ─── Global State ──────────────────────────────────────────
const gameState = {
  currentScreen: SCREEN.MENU,
  isMobile: false,
  audioCtx: null,
  whiteNotes: WHITE_NOTES_2OCT,
  blackNotePositions: BLACK_NOTE_POSITIONS_2OCT,
  whiteKeyWidth: 0,
  blackKeyWidth: 0,
  pianoY: 490,
  currentChord: null,
  highlightedKeys: new Set(),
  selectedSong: null,
  songStartTime: null,
  speedMultiplier: 1,
  score: 0,
  combo: 0,
  maxCombo: 0,
  activeNotes: [],
  spawnTimers: [],
  keyboardState: new Map(),
  keysPressed: new Set(),
  isPlaying: false,
  autoPlayChord: false,
  autoPlayTimer: null
};

// ─── Helper Functions ──────────────────────────────────────
function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase()) ||
    window.innerWidth < 769
  );
}

function noteToFreq(noteName) {
  const noteMap = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const note = noteName[0];
  const octave = parseInt(noteName[1]);
  const semitone = noteMap[note] + (noteName.length === 3 ? 1 : 0);
  const midi = (octave + 1) * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function initAudio() {
  if (gameState.audioCtx) {
    return;
  }
  gameState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playPianoNote(noteName, duration = 0.5) {
  if (!gameState.audioCtx) {
    initAudio();
  }
  const ctx = gameState.audioCtx;
  const now = ctx.currentTime;
  const freq = noteToFreq(noteName);

  const master = ctx.createGain();
  master.connect(ctx.destination);
  master.gain.setValueAtTime(0.3, now);
  master.gain.exponentialRampToValueAtTime(0.01, now + duration);

  const osc1 = ctx.createOscillator();
  osc1.type = 'triangle';
  osc1.frequency.value = freq;
  const gain1 = ctx.createGain();
  gain1.gain.value = 0.6;
  osc1.connect(gain1);
  gain1.connect(master);

  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = freq * 2;
  const gain2 = ctx.createGain();
  gain2.gain.value = 0.18;
  osc2.connect(gain2);
  gain2.connect(master);

  const osc3 = ctx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.value = freq * 3;
  const gain3 = ctx.createGain();
  gain3.gain.value = 0.1;
  osc3.connect(gain3);
  gain3.connect(master);

  osc1.start(now);
  osc2.start(now);
  osc3.start(now);
  osc1.stop(now + duration);
  osc2.stop(now + duration);
  osc3.stop(now + duration);
}

function playKeyTap() {
  if (!gameState.audioCtx) {
    initAudio();
  }
  const ctx = gameState.audioCtx;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.1);
}

function playMissSound() {
  if (!gameState.audioCtx) {
    initAudio();
  }
  const ctx = gameState.audioCtx;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

// ─── Phaser Scene ──────────────────────────────────────────
const config = createGameConfig({
  backgroundColor: 0x0d1b2a,
  scene: {
    preload() {},
    create() {
      const scene = this;
      window.phaserScene = scene;
      gameState.isMobile = isMobileDevice();
      if (gameState.isMobile) {
        gameState.whiteNotes = WHITE_NOTES_1OCT;
        gameState.blackNotePositions = BLACK_NOTE_POSITIONS_1OCT;
      }

      // Menu screen button listeners
      const menuScreen = document.getElementById('menu-screen');
      const btnLearn = document.getElementById('btn-learn');
      const btnPlay = document.getElementById('btn-play');
      const backBtn = document.getElementById('game-back-btn');

      // Debug: Check if buttons exist
      console.log('Piano Keys Game Initialize:', {
        menuScreen: !!menuScreen,
        btnLearn: !!btnLearn,
        btnPlay: !!btnPlay,
        backBtn: !!backBtn
      });

      btnLearn.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.style.pointerEvents = 'auto';
        }
        gameState.currentScreen = SCREEN.LEARN;
        gameState.isPlaying = false;
        rebuildLearnScreen(scene);
      });

      btnPlay.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.style.pointerEvents = 'auto';
        }
        gameState.currentScreen = SCREEN.SONG_SELECT;
        gameState.isPlaying = false;
        rebuildSongSelectScreen(scene);
      });

      backBtn.addEventListener('click', e => {
        if (gameState.currentScreen !== SCREEN.MENU) {
          e.preventDefault();
          goBackScreen(scene);
        }
      });

      // Keyboard input for desktop play
      document.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        if (gameState.isPlaying && KEYBOARD_MAP[key]) {
          const noteName = KEYBOARD_MAP[key];
          if (!gameState.keysPressed.has(noteName)) {
            gameState.keysPressed.add(noteName);
            handleKeyPress(scene, noteName);
          }
        }
      });

      document.addEventListener('keyup', e => {
        const key = e.key.toLowerCase();
        if (KEYBOARD_MAP[key]) {
          const noteName = KEYBOARD_MAP[key];
          gameState.keysPressed.delete(noteName);
          if (gameState.keyboardState.has(noteName)) {
            const obj = gameState.keyboardState.get(noteName).obj;
            if (obj && obj.active) {
              handleKeyRelease(obj);
            }
          }
        }
      });

      // Responsive resize
      window.addEventListener('resize', () => {
        if (gameState.currentScreen === SCREEN.LEARN) {
          rebuildLearnScreen(scene);
        }
        if (gameState.currentScreen === SCREEN.SONG_SELECT) {
          rebuildSongSelectScreen(scene);
        }
        if (gameState.currentScreen === SCREEN.PLAY) {
          rebuildPlayScreen(scene);
        }
      });
    },
    update(time, delta) {
      // Update loop for falling notes - uses delta time for frame-rate independence
      if (gameState.currentScreen !== SCREEN.PLAY || !gameState.isPlaying) {
        return;
      }

      const fallZoneH = gameState.pianoY - HUD_HEIGHT;

      gameState.activeNotes.forEach(note => {
        if (note.resolved) {
          return;
        }

        // Move note down using delta time (300px/s with speed multiplier)
        note.y += FALL_SPEED_PX_PER_MS * gameState.speedMultiplier * delta;

        // Check if note reached the hit line (pianoY - 22)
        const hitLineY = gameState.pianoY - 22;
        if (note.y >= hitLineY && !note.hitOnce && note.y < gameState.pianoY) {
          note.hitOnce = true;
          playMissSound();
          gameState.combo = 0;
          note.setFillStyle(0xff4444);
        }

        // Destroy if off screen
        if (note.y > gameState.pianoY + 100) {
          note.resolved = true;
          note.destroy();
        }
      });

      // Check if all notes resolved and song duration elapsed
      const allNotesResolved = gameState.activeNotes.every(n => n.resolved);
      const now = Date.now();
      const elapsed = now - gameState.songStartTime;
      const beatDurationMs = (60 / gameState.selectedSong.bpm) * 1000;
      const lastBeat = gameState.selectedSong.notes[gameState.selectedSong.notes.length - 1].beat;
      const songDurationMs = lastBeat * beatDurationMs + 3000;

      if (allNotesResolved && elapsed > songDurationMs) {
        gameState.isPlaying = false;
        gameState.currentScreen = SCREEN.RESULTS;
        rebuildResultsScreen(this);
      }
    }
  }
});

const game = new Phaser.Game(config);

// ─── Screen Navigation ─────────────────────────────────────
function goBackScreen(scene) {
  // Stop any active timers/playback
  if (gameState.autoPlayTimer) {
    clearInterval(gameState.autoPlayTimer);
    gameState.autoPlayTimer = null;
  }
  gameState.autoPlayChord = false;

  clearAllPhaserObjects(scene);
  gameState.isPlaying = false;
  gameState.activeNotes = [];

  if (gameState.currentScreen === SCREEN.PLAY) {
    // Going back from playing a song
    gameState.currentScreen = SCREEN.SONG_SELECT;
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'auto';
    }
    rebuildSongSelectScreen(scene);
  } else if (gameState.currentScreen === SCREEN.SONG_SELECT) {
    // Going back to menu
    gameState.currentScreen = SCREEN.MENU;
    document.getElementById('menu-screen').style.display = 'flex';
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'none';
    }
  } else if (gameState.currentScreen === SCREEN.LEARN) {
    // Going back to menu from Learn Chords
    gameState.currentScreen = SCREEN.MENU;
    document.getElementById('menu-screen').style.display = 'flex';
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'none';
    }
  }
}

// ─── Piano Keyboard Builder ─────────────────────────────────
function buildPianoKeyboard(scene) {
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const isPortrait = height > width;
  const whiteNotesCount = gameState.whiteNotes.length;

  // On mobile landscape: use full width, much bigger keys
  // On mobile portrait: smaller but still usable
  // On desktop: original sizing
  let pianoStripWidth, whiteKeyHeight, blackKeyHeight, pianoY;

  if (gameState.isMobile && !isPortrait) {
    // Mobile LANDSCAPE: maximize key size
    pianoStripWidth = width - 20;
    whiteKeyHeight = Math.min(height * 0.6, 200);
    blackKeyHeight = whiteKeyHeight * 0.63;
    pianoY = height * 0.5;
  } else if (gameState.isMobile && isPortrait) {
    // Mobile PORTRAIT: smaller keys, compact layout
    pianoStripWidth = Math.min(700, width - 20);
    whiteKeyHeight = 80;
    blackKeyHeight = 50;
    pianoY = height - 100;
  } else {
    // DESKTOP: original layout
    pianoStripWidth = Math.min(860, width - 20);
    whiteKeyHeight = 150;
    blackKeyHeight = 95;
    pianoY = height - 160;
  }

  gameState.whiteKeyWidth = Math.floor(pianoStripWidth / whiteNotesCount);
  gameState.blackKeyWidth = Math.max(36, Math.floor(gameState.whiteKeyWidth * 0.6));
  const pianoX = (width - pianoStripWidth) / 2;
  gameState.pianoY = pianoY;

  gameState.keyboardState.clear();

  // White keys
  gameState.whiteNotes.forEach((note, idx) => {
    const x = pianoX + idx * gameState.whiteKeyWidth;
    const key = scene.add.rectangle(
      x + gameState.whiteKeyWidth / 2,
      gameState.pianoY + whiteKeyHeight / 2,
      gameState.whiteKeyWidth - 2,
      whiteKeyHeight,
      0xffffff
    );
    key.setInteractive();
    key.setStrokeStyle(2, 0x333333);
    key.setName(note);
    key.noteName = note;
    key.keyType = 'white';

    // Add note name label at bottom (scale font based on key size)
    const noteLabelFont = gameState.whiteKeyWidth > 60 ? '16px' : '12px';
    const noteLabel = scene.add.text(
      x + gameState.whiteKeyWidth / 2,
      gameState.pianoY + whiteKeyHeight - 20,
      note,
      { font: `bold ${noteLabelFont} Arial`, fill: '#000000' }
    );
    noteLabel.setOrigin(0.5, 0.5);

    // Add keyboard key label at top (if this is C4-C5 range)
    if (KEYBOARD_LABELS[note]) {
      const keyLabelFont = gameState.whiteKeyWidth > 60 ? '14px' : '11px';
      const keyLabel = scene.add.text(
        x + gameState.whiteKeyWidth / 2,
        gameState.pianoY + 10,
        KEYBOARD_LABELS[note],
        { font: `bold ${keyLabelFont} Arial`, fill: '#666666' }
      );
      keyLabel.setOrigin(0.5, 0.5);
    }

    key.on('pointerdown', () => handleKeyPress(scene, note));
    key.on('pointerup', () => handleKeyRelease(key));

    gameState.keyboardState.set(note, { obj: key, state: 'normal' });
  });

  // Black keys
  gameState.blackNotePositions.forEach(bp => {
    const x =
      pianoX + (bp.afterWhiteIdx + 1) * gameState.whiteKeyWidth - gameState.blackKeyWidth / 2;
    const key = scene.add.rectangle(
      x + gameState.blackKeyWidth / 2,
      gameState.pianoY + blackKeyHeight / 2,
      gameState.blackKeyWidth - 2,
      blackKeyHeight,
      0x000000
    );
    key.setInteractive();
    key.setStrokeStyle(2, 0x111111);
    key.setName(bp.note);
    key.noteName = bp.note;
    key.keyType = 'black';
    key.setDepth(10);

    // Add keyboard key label at top (e.g., "S" for C#4)
    const blackKeyLabels = {
      'C#4': 'S',
      'D#4': 'D',
      'F#4': 'G',
      'G#4': 'H',
      'A#4': 'J'
    };
    if (blackKeyLabels[bp.note]) {
      const blackKeyLabelFont = gameState.blackKeyWidth > 40 ? '12px' : '10px';
      const keyLabel = scene.add.text(
        x + gameState.blackKeyWidth / 2,
        gameState.pianoY - 10,
        blackKeyLabels[bp.note],
        { font: `bold ${blackKeyLabelFont} Arial`, fill: '#FFFFFF' }
      );
      keyLabel.setOrigin(0.5, 0.5);
      keyLabel.setDepth(11);
    }

    // Add note name label in center
    const blackNoteLabelFont = gameState.blackKeyWidth > 40 ? '11px' : '9px';
    const labelText = scene.add.text(
      x + gameState.blackKeyWidth / 2,
      gameState.pianoY + blackKeyHeight / 2,
      bp.note,
      { font: `bold ${blackNoteLabelFont} Arial`, fill: '#FFFFFF' }
    );
    labelText.setOrigin(0.5, 0.5);
    labelText.setDepth(11);

    key.on('pointerdown', () => handleKeyPress(scene, bp.note));
    key.on('pointerup', () => handleKeyRelease(key));

    gameState.keyboardState.set(bp.note, {
      obj: key,
      state: 'normal'
    });
  });

  // Draw visual hit line just above piano
  const hitLineY = gameState.pianoY - 22;
  scene.add.line(0, hitLineY, 0, hitLineY, width, hitLineY, 0xffd700);
}

function handleKeyPress(scene, noteName) {
  const keyState = gameState.keyboardState.get(noteName);
  if (!keyState) {
    return;
  }

  keyState.state = 'pressed';
  keyState.obj.setFillStyle(keyState.obj.keyType === 'white' ? 0xdddddd : 0x333333);
  playPianoNote(noteName, 0.3);

  // In Play mode: check if this matches an active note
  if (gameState.currentScreen === SCREEN.PLAY && gameState.isPlaying) {
    checkNoteHit(scene, noteName);
  }
}

function handleKeyRelease(keyObj) {
  if (!keyObj || !keyObj.active) {
    return;
  }

  const keyState = gameState.keyboardState.get(keyObj.noteName);
  if (!keyState) {
    return;
  }

  keyState.state = 'normal';
  if (keyObj.keyType === 'white') {
    keyState.obj.setFillStyle(0xffffff);
  } else {
    keyState.obj.setFillStyle(0x000000);
  }
}

// ─── Learn Chords Screen ────────────────────────────────────
function rebuildLearnScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const isPortrait = height > width;

  // Title
  const titleY = gameState.isMobile && isPortrait ? 12 : 20;
  const titleSize = gameState.isMobile && isPortrait ? '24px' : '32px';
  const title = scene.add.text(width / 2, titleY, 'Learn Chords', {
    font: `bold ${titleSize} Arial`,
    fill: '#F9A8D4'
  });
  title.setOrigin(0.5, 0);

  // On mobile portrait, show landscape suggestion
  if (gameState.isMobile && isPortrait) {
    const suggestion = scene.add.text(
      width / 2,
      titleY + 30,
      'Rotate to landscape for bigger keys!',
      {
        font: '12px Arial',
        fill: '#FFEB3B'
      }
    );
    suggestion.setOrigin(0.5, 0);
  }

  // Chord buttons - smaller on mobile portrait
  const chordGridX = width * 0.05;
  const chordGridW = width * 0.9;
  const buttonsPerRow = width > 768 ? 3 : isPortrait ? 2 : 3;
  const buttonWidth = (chordGridW - (buttonsPerRow - 1) * 10) / buttonsPerRow;
  const buttonHeight = gameState.isMobile && isPortrait ? 40 : 50;
  const chordStartY = gameState.isMobile && isPortrait ? 50 : 80;

  CHORDS.forEach((chord, idx) => {
    const row = Math.floor(idx / buttonsPerRow);
    const col = idx % buttonsPerRow;
    const x = chordGridX + col * (buttonWidth + 10) + buttonWidth / 2;
    const y = chordStartY + row * (buttonHeight + 10);

    const btn = scene.add.rectangle(x, y, buttonWidth, buttonHeight, chord.color);
    btn.setInteractive();
    btn.setStrokeStyle(2, 0xffffff);

    // Chord name (top line)
    const text = scene.add.text(x, y - 6, chord.label, {
      font: `bold ${gameState.isMobile && isPortrait ? 11 : 13}px Arial`,
      fill: '#FFFFFF'
    });
    text.setOrigin(0.5, 0.5);

    // Chord notes notation (bottom line, e.g., "C-E-G")
    const notesNotation = chord.keys.join('-');
    const notesText = scene.add.text(x, y + 8, notesNotation, {
      font: `${gameState.isMobile && isPortrait ? 9 : 11}px Arial`,
      fill: '#F0F0F0'
    });
    notesText.setOrigin(0.5, 0.5);

    btn.on('pointerover', () => btn.setScale(1.05));
    btn.on('pointerout', () => btn.setScale(1));
    btn.on('pointerdown', () => selectChord(scene, chord));
  });

  buildPianoKeyboard(scene);

  // Instructions (move below piano)
  const instructionY = gameState.pianoY + 40;
  const instructions = scene.add.text(
    width / 2,
    instructionY,
    'Click a chord to highlight the keys',
    {
      font: '12px Arial',
      fill: '#CCCCCC',
      align: 'center'
    }
  );
  instructions.setOrigin(0.5, 0);

  // Play Chord button area with toggle
  const playButtonY = instructionY + 35;
  const buttonSpacing = 120;
  const centerX = width / 2;

  // Play Chord button (repeatable)
  createButton(scene, centerX - buttonSpacing / 2, playButtonY, '▶ Play Chord', () => {
    if (gameState.currentChord) {
      playChordArpeggio(scene);
    }
  });

  // Auto-Play Toggle button
  const toggleText = gameState.autoPlayChord ? '⏸ Stop Repeat' : '🔄 Auto Repeat';
  const toggleColor = gameState.autoPlayChord ? 0x4caf50 : 0x666666;
  const toggleBtn = scene.add.rectangle(
    centerX + buttonSpacing / 2,
    playButtonY,
    100,
    50,
    toggleColor
  );
  toggleBtn.setInteractive();
  toggleBtn.setStrokeStyle(2, 0xffffff);

  const toggleLabel = scene.add.text(centerX + buttonSpacing / 2, playButtonY, toggleText, {
    font: 'bold 12px Arial',
    fill: '#FFFFFF'
  });
  toggleLabel.setOrigin(0.5, 0.5);

  toggleBtn.on('pointerdown', () => {
    gameState.autoPlayChord = !gameState.autoPlayChord;

    if (gameState.autoPlayChord && gameState.currentChord) {
      // Start auto-play loop (every 3 seconds)
      playChordArpeggio(scene);
      gameState.autoPlayTimer = setInterval(() => {
        if (gameState.currentScreen === SCREEN.LEARN && gameState.currentChord) {
          playChordArpeggio(scene);
        }
      }, 3000);
    } else {
      // Stop auto-play
      if (gameState.autoPlayTimer) {
        clearInterval(gameState.autoPlayTimer);
        gameState.autoPlayTimer = null;
      }
    }

    // Rebuild screen to update button color
    rebuildLearnScreen(scene);
  });

  toggleBtn.on('pointerover', () => toggleBtn.setScale(1.05));
  toggleBtn.on('pointerout', () => toggleBtn.setScale(1));
}

function selectChord(scene, chord) {
  gameState.currentChord = chord;
  gameState.highlightedKeys.clear();

  chord.keys.forEach(key => gameState.highlightedKeys.add(key));

  // Update key colors
  gameState.keyboardState.forEach((keyState, noteName) => {
    if (gameState.highlightedKeys.has(noteName)) {
      keyState.obj.setFillStyle(0xffd700);
      keyState.obj.setStrokeStyle(2, 0xffb700);
    } else {
      keyState.obj.setFillStyle(keyState.obj.keyType === 'white' ? 0xffffff : 0x000000);
      keyState.obj.setStrokeStyle(2, keyState.obj.keyType === 'white' ? 0x333333 : 0x111111);
    }
  });

  // Auto-play the chord when selected
  playChordArpeggio(scene);
}

function playChordArpeggio(scene) {
  gameState.currentChord.keys.forEach((key, idx) => {
    setTimeout(() => playPianoNote(key, 0.5), idx * 100);
  });
}

// ─── Song Select Screen ─────────────────────────────────────
function rebuildSongSelectScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  const title = scene.add.text(width / 2, 20, 'Select a Song', {
    font: 'bold 32px Arial',
    fill: '#F9A8D4'
  });
  title.setOrigin(0.5, 0);

  // Speed selector
  const speedY = 65;
  const speedLabels = ['🐢 Slow', '▶ Normal', '⚡ Fast'];
  const speedMultipliers = [0.5, 1, 1.5];
  const speedButtonWidth = 90;
  const speedSpacing = 110;
  const speedStartX = (width - speedSpacing * 2) / 2;

  speedLabels.forEach((label, idx) => {
    const x = speedStartX + idx * speedSpacing;
    const isSelected = gameState.speedMultiplier === speedMultipliers[idx];
    const btn = scene.add.rectangle(
      x,
      speedY,
      speedButtonWidth,
      36,
      isSelected ? 0xf9a8d4 : 0x3a3a4a
    );
    btn.setInteractive();
    btn.setStrokeStyle(2, isSelected ? 0xffffff : 0x666666);

    const text = scene.add.text(x, speedY, label, {
      font: `bold ${isSelected ? 12 : 11}px Arial`,
      fill: isSelected ? '#FFFFFF' : '#AAAAAA'
    });
    text.setOrigin(0.5, 0.5);

    btn.on('pointerdown', () => {
      gameState.speedMultiplier = speedMultipliers[idx];
      rebuildSongSelectScreen(scene);
    });

    btn.on('pointerover', () => {
      if (!isSelected) {
        btn.setFillStyle(0x4a4a5a);
      }
    });
    btn.on('pointerout', () => {
      if (!isSelected) {
        btn.setFillStyle(0x3a3a4a);
      }
    });
  });

  // Song cards
  const songsPerRow = width > 768 ? 2 : 1;
  const cardWidth = Math.min(280, (width - 40 - (songsPerRow - 1) * 20) / songsPerRow);
  const cardHeight = 100;

  SONGS.forEach((song, idx) => {
    const row = Math.floor(idx / songsPerRow);
    const col = idx % songsPerRow;
    const x =
      (width - (songsPerRow * cardWidth + (songsPerRow - 1) * 20)) / 2 +
      col * (cardWidth + 20) +
      cardWidth / 2;
    const y = 130 + row * (cardHeight + 20);

    const card = scene.add.rectangle(x, y, cardWidth, cardHeight, 0x2a2a3a);
    card.setInteractive();
    card.setStrokeStyle(2, 0xf9a8d4);

    const titleText = scene.add.text(x, y - 25, song.title, {
      font: 'bold 16px Arial',
      fill: '#F9A8D4'
    });
    titleText.setOrigin(0.5, 0.5);

    const diffText = scene.add.text(x, y + 5, `Difficulty: ${'★'.repeat(song.difficulty)}`, {
      font: '12px Arial',
      fill: '#CCCCCC'
    });
    diffText.setOrigin(0.5, 0.5);

    card.on('pointerover', () => card.setScale(1.05));
    card.on('pointerout', () => card.setScale(1));
    card.on('pointerdown', () => startSong(scene, song));
  });
}

function startSong(scene, song) {
  clearAllPhaserObjects(scene);
  gameState.selectedSong = song;
  gameState.score = 0;
  gameState.combo = 0;
  gameState.maxCombo = 0;
  gameState.activeNotes = [];
  gameState.songStartTime = Date.now();
  gameState.currentScreen = SCREEN.PLAY;
  gameState.isPlaying = true;
  rebuildPlayScreen(scene);
}

// ─── Play Along Screen ──────────────────────────────────────
function rebuildPlayScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  // Song title and HUD
  const songTitle = scene.add.text(width / 2, 15, gameState.selectedSong.title, {
    font: 'bold 20px Arial',
    fill: '#F9A8D4'
  });
  songTitle.setOrigin(0.5, 0);

  const scoreText = scene.add.text(20, 40, 'Score: 0', {
    font: '16px Arial',
    fill: '#FFFFFF'
  });
  const comboText = scene.add.text(width - 20, 40, 'Combo: 0', {
    font: '16px Arial',
    fill: '#FFFFFF',
    align: 'right'
  });
  comboText.setOrigin(1, 0);

  // Keyboard guide for desktop
  if (!gameState.isMobile) {
    const guideText = scene.add.text(
      width / 2,
      height - 310,
      'White: Z X C V B N M ,  |  Black: S D G H J  or click keys',
      {
        font: '12px Arial',
        fill: '#AAAAAA',
        align: 'center'
      }
    );
    guideText.setOrigin(0.5, 0);
  }

  buildPianoKeyboard(scene);

  // Spawn notes using corrected timing math
  const beatDurationMs = (60 / gameState.selectedSong.bpm) * 1000;
  const fallZoneH = gameState.pianoY - HUD_HEIGHT;
  const fallDurationMs = (fallZoneH / (FALL_SPEED_PX_PER_MS * gameState.speedMultiplier)) * 1000;

  gameState.selectedSong.notes.forEach(noteData => {
    const beatMs = noteData.beat * beatDurationMs;
    const spawnMs = LEAD_IN_MS + beatMs - fallDurationMs;

    const timerId = setTimeout(
      () => {
        if (!gameState.isPlaying || gameState.currentScreen !== SCREEN.PLAY) {
          return;
        }

        const keyState = gameState.keyboardState.get(noteData.key);
        if (!keyState) {
          return;
        }

        const noteDurationMs = noteData.duration * beatDurationMs;
        const noteHeight = Math.max(20, Math.floor((noteDurationMs / 1000) * 100));
        const laneX = keyState.obj.x;

        const note = scene.add.rectangle(
          laneX,
          HUD_HEIGHT - noteHeight,
          keyState.obj.width - 4,
          noteHeight,
          0x22c55e
        );
        note.noteName = noteData.key;
        note.targetY = gameState.pianoY - 22;
        note.resolved = false;
        note.hitOnce = false;
        note.noteData = noteData;

        gameState.activeNotes.push(note);
      },
      Math.max(0, spawnMs)
    );

    gameState.spawnTimers.push(timerId);
  });

  // Update HUD periodically
  let lastUpdateTime = Date.now();
  const updateInterval = setInterval(() => {
    if (!gameState.isPlaying || gameState.currentScreen !== SCREEN.PLAY) {
      clearInterval(updateInterval);
      return;
    }

    const now = Date.now();
    if (now - lastUpdateTime > 100) {
      scoreText.setText(`Score: ${gameState.score}`);
      comboText.setText(`Combo: ${gameState.combo}`);
      lastUpdateTime = now;
    }
  }, 50);
}

function checkNoteHit(scene, noteName) {
  const unresolved = gameState.activeNotes.filter(n => !n.resolved && n.noteName === noteName);

  if (unresolved.length === 0) {
    return;
  }

  const note = unresolved[0]; // Take first unresolved note
  note.resolved = true;
  note.setFillStyle(0x86efac);

  gameState.score += 10;
  gameState.combo++;
  gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);

  if (gameState.combo >= 5 && gameState.combo % 5 === 0) {
    gameState.score += gameState.combo * 2;
  }

  playKeyTap();
  setTimeout(() => note.destroy(), 100);
}

// ─── Results Screen ────────────────────────────────────────
function rebuildResultsScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  const titleText = scene.add.text(width / 2, 60, 'Song Complete!', {
    font: 'bold 36px Arial',
    fill: '#86EFAC'
  });
  titleText.setOrigin(0.5, 0);

  const scoreText = scene.add.text(width / 2, 140, `Score: ${gameState.score}`, {
    font: 'bold 28px Arial',
    fill: '#F9A8D4'
  });
  scoreText.setOrigin(0.5, 0);

  const maxComboText = scene.add.text(width / 2, 190, `Max Combo: ${gameState.maxCombo}`, {
    font: '20px Arial',
    fill: '#FFFFFF'
  });
  maxComboText.setOrigin(0.5, 0);

  createButton(scene, width / 2 - 100, height - 100, 'Replay', () => {
    startSong(scene, gameState.selectedSong);
  });

  createButton(scene, width / 2 + 100, height - 100, 'Song List', () => {
    gameState.currentScreen = SCREEN.SONG_SELECT;
    gameState.isPlaying = false;
    rebuildSongSelectScreen(scene);
  });
}

// ─── Utility Functions ──────────────────────────────────────
function cancelSpawnTimers() {
  gameState.spawnTimers.forEach(timerId => {
    clearTimeout(timerId);
  });
  gameState.spawnTimers = [];
}

function clearAllPhaserObjects(scene) {
  cancelSpawnTimers();
  gameState.keyboardState.clear();
  scene.children.list.slice().forEach(child => child.destroy());
}

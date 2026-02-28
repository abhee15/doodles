// ══════════════════════════════════════════════════════════════
// Piano Keys Game — Phaser 3 with Web Audio API synthesis
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

const _NOTE_COLORS = {
  C: 0xef4444,
  D: 0xf97316,
  E: 0xeab308,
  F: 0x22c55e,
  G: 0x3b82f6,
  A: 0x8b5cf6,
  B: 0xec4899
};

const CHORDS = [
  { id: 'C_maj', label: 'C Major', keys: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], color: 0xf9a8d4 },
  { id: 'G_maj', label: 'G Major', keys: ['G4', 'B4', 'D5'], fingers: [1, 3, 5], color: 0x86efac },
  { id: 'A_min', label: 'A Minor', keys: ['A4', 'C5', 'E5'], fingers: [1, 3, 5], color: 0xc4b5fd },
  { id: 'F_maj', label: 'F Major', keys: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], color: 0xfcd34d },
  { id: 'E_min', label: 'E Minor', keys: ['E4', 'G4', 'B4'], fingers: [1, 3, 5], color: 0x6ee7b7 },
  { id: 'D_min', label: 'D Minor', keys: ['D4', 'F4', 'A4'], fingers: [1, 3, 5], color: 0x93c5fd }
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
  songStartTime: 0,
  score: 0,
  combo: 0,
  maxCombo: 0,
  activeNotes: [],
  keyboardState: new Map()
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

function transposeNote(noteName, semitones) {
  const noteMap = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
    'C#': 1,
    'D#': 3,
    'F#': 6,
    'G#': 8,
    'A#': 10
  };
  const baseNote = noteName.match(/^[A-G]#?/)[0];
  const octave = parseInt(noteName[noteName.length - 1]);
  const baseMidi = (octave + 1) * 12 + noteMap[baseNote];
  const newMidi = baseMidi + semitones;
  const newOctave = Math.floor(newMidi / 12) - 1;
  const newSemitone = newMidi % 12;
  const noteNameMap = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'D#',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'G#',
    9: 'A',
    10: 'A#',
    11: 'B'
  };
  return noteNameMap[newSemitone] + newOctave;
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

      btnLearn.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        gameState.currentScreen = SCREEN.LEARN;
        rebuildLearnScreen(scene);
      });

      btnPlay.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        gameState.currentScreen = SCREEN.SONG_SELECT;
        rebuildSongSelectScreen(scene);
      });

      backBtn.addEventListener('click', e => {
        if (gameState.currentScreen !== SCREEN.MENU) {
          e.preventDefault();
          goBackScreen(scene);
        }
      });

      // Add an in-canvas back button as a fallback if DOM navigation is blocked
      createInSceneBackButton(scene);

      // Initialize keyboard mapping for desktop
      initKeyboardMapping(scene);

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
    update() {}
  }
});

// Ensure the game canvas fills the visible viewport in landscape/horizontal mode.
// Use Phaser.RESIZE to let Phaser resize the game to the container/window dynamically.
try {
  if (config && config.scale) {
    config.scale.mode = Phaser.Scale.RESIZE;
    // Initialize to current window size so the canvas starts full-bleed
    config.width = window.innerWidth || config.width;
    config.height = window.innerHeight || config.height;
  }
} catch (e) {
  // If Phaser isn't available yet, proceed with default config
}

const _game = new Phaser.Game(config);

// ─── Screen Navigation ─────────────────────────────────────
function goBackScreen(scene) {
  clearAllPhaserObjects(scene);
  if (gameState.currentScreen === SCREEN.PLAY) {
    if (gameState.currentSong) {
      stopSong(scene);
    }
    gameState.currentScreen = SCREEN.SONG_SELECT;
    rebuildSongSelectScreen(scene);
  } else if (
    gameState.currentScreen === SCREEN.SONG_SELECT ||
    gameState.currentScreen === SCREEN.LEARN
  ) {
    gameState.currentScreen = SCREEN.MENU;
    document.getElementById('menu-screen').style.display = 'flex';
  }
}

function stopSong(scene) {
  gameState.currentSong = null;
  gameState.activeNotes = [];
}

// ---------------- Keyboard Integration ----------------
// Map a simple set of physical keys to white piano keys for desktop use.
// White-key mappings are chosen to be child-friendly (bottom/home row combinations).
function initKeyboardMapping(scene) {
  // Desktop only
  if (gameState.isMobile) {
    return;
  }

  // Remove previous listeners if any
  if (window._pianoKeyListener) {
    window.removeEventListener('keydown', window._pianoKeyListener.keydown);
    window.removeEventListener('keyup', window._pianoKeyListener.keyup);
    window._pianoKeyListener = null;
  }

  // Choose mapping arrays based on number of white notes
  const whiteCount = gameState.whiteNotes.length;
  let whiteKeyChars = [];
  if (whiteCount === 8) {
    // 1-octave: home row mapping
    whiteKeyChars = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
  } else {
    // 2-octave: bottom row then home row
    whiteKeyChars = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
  }

  // Build mapping from char -> noteName for white keys only
  const keyToNote = {};
  for (let i = 0; i < Math.min(whiteKeyChars.length, gameState.whiteNotes.length); i++) {
    keyToNote[whiteKeyChars[i]] = gameState.whiteNotes[i];
  }

  // Also build reverse mapping note -> char for on-screen hints in desktop
  gameState.keyHintMap = new Map();
  Object.keys(keyToNote).forEach(kc => {
    const note = keyToNote[kc];
    gameState.keyHintMap.set(note, kc.toUpperCase());
  });

  // Handler functions
  const onKeyDown = e => {
    if (e.repeat) {
      return;
    }
    // ignore when focused on input fields
    const tag = (e.target && e.target.tagName) || '';
    if (tag.toLowerCase() === 'input' || tag.toLowerCase() === 'textarea') {
      return;
    }

    const k = (e.key || '').toLowerCase();
    const note = keyToNote[k];
    if (note) {
      // Prevent page scrolls for space/arrow but here only letters used
      e.preventDefault();
      handleKeyPress(scene, note);
    }
  };

  const onKeyUp = e => {
    const k = (e.key || '').toLowerCase();
    const note = keyToNote[k];
    if (note) {
      const keyState = gameState.keyboardState.get(note);
      if (keyState && keyState.obj) {
        handleKeyRelease(keyState.obj);
      }
    }
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window._pianoKeyListener = { keydown: onKeyDown, keyup: onKeyUp };

  // Optional on-screen hint in top-right corner
  try {
    if (!scene.__keyboardHint) {
      const hintText = 'Tip: Use keyboard to play (home row)';
      scene.__keyboardHint = scene.add.text(scene.cameras.main.width - 10, 12, hintText, {
        font: '14px Arial',
        fill: '#ffffff'
      });
      scene.__keyboardHint.setOrigin(1, 0);
      scene.__keyboardHint.setDepth(9999);
    }
  } catch (e) {
    // ignore errors when adding optional keyboard hint (non-critical)
  }
}

// ─── Piano Keyboard Builder ─────────────────────────────────
function buildPianoKeyboard(scene) {
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const whiteNotesCount = gameState.whiteNotes.length;
  // Make keyboard larger on desktop for a more engaging experience
  const pianoStripWidth = width > 1000 ? Math.min(1100, width - 40) : Math.min(860, width - 20);
  gameState.whiteKeyWidth = Math.floor(pianoStripWidth / whiteNotesCount);
  gameState.blackKeyWidth = Math.max(36, Math.floor(gameState.whiteKeyWidth * 0.62));
  const whiteKeyHeight = gameState.isMobile ? 120 : 200;
  const blackKeyHeight = Math.max(90, Math.floor(whiteKeyHeight * 0.62));
  const pianoX = (width - pianoStripWidth) / 2;
  gameState.pianoY = height - 160;

  gameState.keyboardState.clear();

  // White keys
  gameState.whiteNotes.forEach((note, idx) => {
    const x = pianoX + idx * gameState.whiteKeyWidth;
    const key = scene.add.rectangle(
      x + gameState.whiteKeyWidth / 2,
      gameState.pianoY + whiteKeyHeight / 2,
      gameState.whiteKeyWidth - 4,
      whiteKeyHeight,
      0xffffff
    );
    key.setInteractive();
    // softer stroke and subtle drop shadow-like look via darker stroke
    key.setStrokeStyle(3, 0x2b2b2b);
    key.setName(note);
    key.noteName = note;
    key.keyType = 'white';

    // Press animation + behavior
    key.on('pointerdown', () => {
      handleKeyPress(scene, note);
      scene.tweens.add({
        targets: key,
        scaleX: 0.985,
        scaleY: 0.985,
        duration: 90,
        yoyo: true
      });
    });
    key.on('pointerup', () => handleKeyRelease(key));

    // Hover (desktop) subtle lift
    key.on('pointerover', () => {
      if (!gameState.isMobile) {
        scene.tweens.add({ targets: key, y: key.y - 6, duration: 120 });
      }
    });
    key.on('pointerout', () => {
      if (!gameState.isMobile) {
        scene.tweens.add({ targets: key, y: key.y + 6, duration: 120 });
      }
    });

    // Desktop: show keyboard hint above white key if mapping exists
    if (!gameState.isMobile && gameState.keyHintMap && gameState.keyHintMap.has(note)) {
      const hint = gameState.keyHintMap.get(note);
      const keyHint = scene.add.text(key.x, key.y - Math.floor(whiteKeyHeight / 4), hint, {
        font: '14px Arial',
        fill: '#ffffff'
      });
      keyHint.setOrigin(0.5, 1);
      keyHint.setDepth(key.depth + 3);
    }

    gameState.keyboardState.set(note, { obj: key, state: 'normal' });
  });

  // Black keys
  gameState.blackNotePositions.forEach(bp => {
    const x =
      pianoX + (bp.afterWhiteIdx + 1) * gameState.whiteKeyWidth - gameState.blackKeyWidth / 2;
    const key = scene.add.rectangle(
      x + gameState.blackKeyWidth / 2,
      gameState.pianoY + blackKeyHeight / 2,
      gameState.blackKeyWidth - 4,
      blackKeyHeight,
      0x0b1220
    );
    key.setInteractive();
    key.setStrokeStyle(2, 0x081018);
    key.setName(bp.note);
    key.noteName = bp.note;
    key.keyType = 'black';
    key.setDepth(10);

    // Black key press animation + behavior
    key.on('pointerdown', () => {
      handleKeyPress(scene, bp.note);
      scene.tweens.add({ targets: key, scaleX: 0.98, scaleY: 0.98, duration: 80, yoyo: true });
    });
    key.on('pointerup', () => handleKeyRelease(key));

    key.on('pointerover', () => {
      if (!gameState.isMobile) {
        scene.tweens.add({ targets: key, y: key.y - 4, duration: 90 });
      }
    });
    key.on('pointerout', () => {
      if (!gameState.isMobile) {
        scene.tweens.add({ targets: key, y: key.y + 4, duration: 90 });
      }
    });
    // Desktop: show keyboard hint above black key if mapping exists
    if (!gameState.isMobile && gameState.keyHintMap && gameState.keyHintMap.has(bp.note)) {
      const bh = gameState.keyHintMap.get(bp.note);
      const bHint = scene.add.text(key.x, key.y - Math.floor(blackKeyHeight / 4), bh, {
        font: '12px Arial',
        fill: '#ffffff'
      });
      bHint.setOrigin(0.5, 1);
      bHint.setDepth(key.depth + 3);
    }

    gameState.keyboardState.set(bp.note, { obj: key, state: 'normal' });
  });
}

function handleKeyPress(scene, noteName) {
  const keyState = gameState.keyboardState.get(noteName);
  if (!keyState) {
    return;
  }
  // Toggle selection when in Learn screen (desktop or mobile)
  if (gameState.currentScreen === SCREEN.LEARN) {
    if (gameState.highlightedKeys.has(noteName)) {
      gameState.highlightedKeys.delete(noteName);
      // reset to default color
      if (keyState.obj.keyType === 'white') {
        keyState.obj.setFillStyle(0xffffff);
        keyState.obj.setStrokeStyle(2, 0x333333);
      } else {
        keyState.obj.setFillStyle(0x000000);
        keyState.obj.setStrokeStyle(2, 0x111111);
      }
    } else {
      gameState.highlightedKeys.add(noteName);
      keyState.obj.setFillStyle(0xffd700);
      keyState.obj.setStrokeStyle(2, 0xffb700);
    }
    playPianoNote(noteName, 0.4);
    return;
  }

  // Default behavior: press key and play (Play screen / Menu interactions)
  keyState.state = 'pressed';
  keyState.obj.setFillStyle(0xcccccc);
  playPianoNote(noteName, 0.3);

  // In Play mode: check if this matches an active note
  if (gameState.currentScreen === SCREEN.PLAY && gameState.currentSong) {
    checkNoteHit(scene, noteName);
  }
}

function handleKeyRelease(keyObj) {
  const keyState = gameState.keyboardState.get(keyObj.noteName);
  if (!keyState) {
    return;
  }

  keyState.state = 'normal';
  // If the key is selected (highlighted) keep the highlight color
  if (gameState.highlightedKeys.has(keyObj.noteName)) {
    keyState.obj.setFillStyle(0xffd700);
    keyState.obj.setStrokeStyle(2, 0xffb700);
    return;
  }

  if (keyObj.keyType === 'white') {
    keyState.obj.setFillStyle(0xffffff);
    keyState.obj.setStrokeStyle(2, 0x333333);
  } else {
    keyState.obj.setFillStyle(0x000000);
    keyState.obj.setStrokeStyle(2, 0x111111);
  }
}

// ─── Learn Chords Screen ────────────────────────────────────
function rebuildLearnScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  // Title
  const title = scene.add.text(width / 2, 30, 'Learn Chords', {
    font: 'bold 32px Arial',
    fill: '#F9A8D4'
  });
  title.setOrigin(0.5, 0);

  // Chord buttons
  const chordGridX = (width - Math.min(500, width - 40)) / 2;
  const chordGridW = Math.min(500, width - 40);
  const buttonsPerRow = width > 768 ? 3 : 2;
  const buttonWidth = (chordGridW - (buttonsPerRow - 1) * 10) / buttonsPerRow;

  CHORDS.forEach((chord, idx) => {
    const row = Math.floor(idx / buttonsPerRow);
    const col = idx % buttonsPerRow;
    const x = chordGridX + col * (buttonWidth + 10) + buttonWidth / 2;
    const y = 100 + row * 60;

    const btn = scene.add.rectangle(x, y, buttonWidth, 50, chord.color);
    btn.setInteractive();
    btn.setStrokeStyle(2, 0xffffff);

    const text = scene.add.text(x, y, chord.label, { font: 'bold 14px Arial', fill: '#FFFFFF' });
    text.setOrigin(0.5);

    btn.on('pointerover', () => btn.setScale(1.05));
    btn.on('pointerout', () => btn.setScale(1));
    btn.on('pointerdown', () => selectChord(scene, chord));
  });

  buildPianoKeyboard(scene);

  // Play Chord button — position it above the piano keys to avoid overlap
  let playBtnY;
  if (gameState.isMobile) {
    playBtnY = Math.max(64, Math.min(height - 120, 88));
  } else {
    // place above the piano area; fallback to height - 120 if pianoY missing
    playBtnY = gameState.pianoY ? Math.max(64, gameState.pianoY - 120) : Math.max(64, height - 140);
    playBtnY = Math.min(playBtnY, height - 110);
  }

  const playBtn = createButton(scene, width / 2, playBtnY, 'Play Chord', () => {
    if (gameState.currentChord) {
      playChordArpeggio(scene);
      return;
    }

    // If user manually selected keys in Learn screen, play those
    if (gameState.highlightedKeys.size > 0) {
      playSelectedKeys(Array.from(gameState.highlightedKeys));
    }
  });
  // Keep button above other elements
  if (playBtn && playBtn.container) {
    playBtn.container.setDepth(9999);
  }

  // Add a small tips panel in Learn screen
  addLearnTips(scene);
}

function addLearnTips(scene) {
  try {
    const width = scene.cameras.main.width;
    const tips =
      "Tip: Tap keys to select them. Press 'Play Chord' to hear selection. Use keyboard on desktop (see hint).";
    const tipText = scene.add.text(width / 2, 70, tips, {
      font: '16px Arial',
      fill: '#FFFFFF',
      align: 'center',
      wordWrap: { width: Math.min(760, width - 80) }
    });
    tipText.setOrigin(0.5, 0);
    tipText.setDepth(9000);
  } catch (e) {
    // non-critical
  }
}

// create a small in-scene back button in case DOM back-link is unusable
function createInSceneBackButton(scene) {
  try {
    if (scene.__inSceneBack) {
      return;
    }
    const btn = scene.add.text(12, 12, '← Back', {
      font: '18px Arial',
      fill: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0.35)',
      padding: { x: 8, y: 6 }
    });
    btn.setOrigin(0, 0);
    btn.setInteractive({ useHandCursor: true });
    btn.setDepth(10001);
    btn.on('pointerdown', () => goBackScreen(scene));
    scene.__inSceneBack = btn;
  } catch (e) {
    // ignore
  }
}
function playSelectedKeys(keys = [], arpeggio = true) {
  if (!Array.isArray(keys) || keys.length === 0) {
    return;
  }
  if (arpeggio) {
    keys.forEach((k, idx) => setTimeout(() => playPianoNote(k, 0.5), idx * 120));
  } else {
    keys.forEach(k => playPianoNote(k, 0.6));
  }
}

function selectChord(scene, chord) {
  gameState.currentChord = chord;
  gameState.highlightedKeys.clear();

  const transposedKeys = gameState.isMobile
    ? chord.keys.map(k => transposeNote(k, -12))
    : chord.keys;

  transposedKeys.forEach(key => gameState.highlightedKeys.add(key));

  // Update key colors with stronger, kid-friendly highlight
  const SELECT_FILL = 0xff7a59; // warm coral
  const SELECT_STROKE = 0xff3d00;
  gameState.keyboardState.forEach((keyState, noteName) => {
    // Normalize highlighted keys to available keyboard notes
    let isHighlighted = false;
    for (const k of Array.from(gameState.highlightedKeys)) {
      const normalized = normalizeNoteToKeyboard(k);
      if (normalized === noteName) {
        isHighlighted = true;
        break;
      }
    }

    if (isHighlighted) {
      keyState.obj.setFillStyle(SELECT_FILL);
      keyState.obj.setStrokeStyle(4, SELECT_STROKE);
    } else {
      // reset to darker default strokes for contrast
      if (keyState.obj.keyType === 'white') {
        keyState.obj.setFillStyle(0xffffff);
        keyState.obj.setStrokeStyle(3, 0x2b2b2b);
      } else {
        keyState.obj.setFillStyle(0x0b1220);
        keyState.obj.setStrokeStyle(2, 0x081018);
      }
    }
  });
}

function playChordArpeggio(scene) {
  const transposedKeys = gameState.isMobile
    ? gameState.currentChord.keys.map(k => transposeNote(k, -12))
    : gameState.currentChord.keys;

  transposedKeys.forEach((key, idx) => {
    setTimeout(() => playPianoNote(key, 0.5), idx * 100);
  });
}

// Normalize a requested note name to a note available on the current keyboard.
// If the exact note isn't present, try transposing down by octaves until found.
function normalizeNoteToKeyboard(noteName) {
  if (gameState.keyboardState.has(noteName)) {
    return noteName;
  }
  // try transposing down up to 2 octaves
  for (let i = 1; i <= 2; i++) {
    const cand = transposeNote(noteName, -12 * i);
    if (gameState.keyboardState.has(cand)) {
      return cand;
    }
  }
  return null;
}

// ─── Song Select Screen ─────────────────────────────────────
function rebuildSongSelectScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  const title = scene.add.text(width / 2, 30, 'Select a Song', {
    font: 'bold 32px Arial',
    fill: '#F9A8D4'
  });
  title.setOrigin(0.5, 0);

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
    const y = 100 + row * (cardHeight + 20);

    const card = scene.add.rectangle(x, y, cardWidth, cardHeight, 0x2a2a3a);
    card.setInteractive();
    card.setStrokeStyle(2, 0xf9a8d4);

    const titleText = scene.add.text(x, y - 25, song.title, {
      font: 'bold 16px Arial',
      fill: '#F9A8D4'
    });
    titleText.setOrigin(0.5);

    const diffText = scene.add.text(x, y + 5, `Difficulty: ${'★'.repeat(song.difficulty)}`, {
      font: '12px Arial',
      fill: '#CCCCCC'
    });
    diffText.setOrigin(0.5);

    card.on('pointerover', () => card.setScale(1.05));
    card.on('pointerout', () => card.setScale(1));
    card.on('pointerdown', () => startSong(scene, song));
  });
}

function startSong(scene, song) {
  gameState.selectedSong = song;
  gameState.score = 0;
  gameState.combo = 0;
  gameState.maxCombo = 0;
  gameState.activeNotes = [];
  gameState.songStartTime = 0;
  gameState.currentScreen = SCREEN.PLAY;
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

  const scoreText = scene.add.text(20, 40, 'Score: 0', { font: '16px Arial', fill: '#FFFFFF' });
  const comboText = scene.add.text(width - 20, 40, 'Combo: 0', {
    font: '16px Arial',
    fill: '#FFFFFF',
    align: 'right'
  });
  comboText.setOrigin(1, 0);

  // Fall zone (area where notes appear)
  const fallZoneH = 430;
  // Adjust fall speed and hit window by song difficulty for better playability
  // difficulty: 1 = easy, 2 = normal, 3 = hard
  let fallSpeed = 300; // px/s default
  let hitWindow = 150; // ms default
  if (gameState.selectedSong && typeof gameState.selectedSong.difficulty === 'number') {
    const d = gameState.selectedSong.difficulty;
    if (d <= 1) {
      fallSpeed = 220; // slower approach for beginners
      hitWindow = 240; // more forgiving
    } else if (d === 2) {
      fallSpeed = 300;
      hitWindow = 160;
    } else {
      fallSpeed = 380; // faster for advanced
      hitWindow = 120; // tighter timing
    }
  }

  buildPianoKeyboard(scene);

  // Draw a visible hit line so players know where to time their presses
  const pianoWidth = gameState.whiteKeyWidth * gameState.whiteNotes.length;
  const hitLine = scene.add.rectangle(
    scene.cameras.main.width / 2,
    gameState.pianoY + 10,
    pianoWidth,
    6,
    0xff7a59
  );
  hitLine.setOrigin(0.5, 0.5);
  hitLine.setAlpha(0.85);

  // Start the song
  gameState.songStartTime = Date.now();
  gameState.currentSong = gameState.selectedSong;

  // Spawn notes
  const spawnNotes = () => {
    gameState.selectedSong.notes.forEach(noteData => {
      const noteBeatSec = (noteData.beat / gameState.selectedSong.bpm) * 60;
      const spawnSec = noteBeatSec - fallZoneH / fallSpeed;
      const spawnMs = spawnSec * 1000;

      setTimeout(() => {
        if (!gameState.currentSong || gameState.currentScreen !== SCREEN.PLAY) {
          return;
        }

        const keyState = gameState.keyboardState.get(noteData.key);
        if (!keyState) {
          return;
        }

        // Make notes taller on easier difficulty to increase hit area
        const baseNoteH = Math.floor(
          (noteData.duration * fallSpeed * 60) / gameState.selectedSong.bpm
        );
        const noteH = Math.max(
          26,
          gameState.selectedSong.difficulty <= 1 ? Math.floor(baseNoteH * 1.4) : baseNoteH
        );
        const laneX = keyState.obj.x;

        const note = scene.add.rectangle(laneX, -20, keyState.obj.width - 4, noteH, 0x22c55e);
        note.noteName = noteData.key;
        note.fallSpeed = fallSpeed;
        note.hitWindow = hitWindow;
        note.timestamp = Date.now() - gameState.songStartTime;
        note.resolved = false;

        gameState.activeNotes.push(note);
      }, spawnMs);
    });
  };

  spawnNotes();

  // Update loop for falling notes
  scene.events.on('update', () => {
    if (gameState.currentScreen !== SCREEN.PLAY || !gameState.currentSong) {
      return;
    }

    const now = Date.now() - gameState.songStartTime;

    gameState.activeNotes.forEach((note, idx) => {
      if (note.resolved) {
        return;
      }

      note.y += note.fallSpeed / 60;

      // Check if note passed piano (missed)
      if (note.y > gameState.pianoY + 20) {
        note.resolved = true;
        note.setFillStyle(0xff4444);
        gameState.combo = 0;
        playMissSound();
        setTimeout(() => note.destroy(), 200);
        return;
      }
    });

    // Update HUD
    scoreText.setText(`Score: ${gameState.score}`);
    comboText.setText(`Combo: ${gameState.combo}`);

    // End song if all notes resolved
    if (
      gameState.activeNotes.every(n => n.resolved) &&
      now >
        (gameState.selectedSong.notes[gameState.selectedSong.notes.length - 1].beat /
          gameState.selectedSong.bpm) *
          60 *
          1000 +
          1000
    ) {
      gameState.currentScreen = SCREEN.RESULTS;
      rebuildResultsScreen(scene);
    }
  });
}

function checkNoteHit(scene, noteName) {
  const now = Date.now() - gameState.songStartTime;
  const nearbyNotes = gameState.activeNotes.filter(n => !n.resolved && n.noteName === noteName);

  if (nearbyNotes.length === 0) {
    return;
  }

  const closestNote = nearbyNotes.reduce((prev, curr) => {
    const prevDist = Math.abs(prev.timestamp + prev.y / prev.fallSpeed - now);
    const currDist = Math.abs(curr.timestamp + curr.y / curr.fallSpeed - now);
    return currDist < prevDist ? curr : prev;
  });

  const noteTimeSec = closestNote.y / closestNote.fallSpeed;
  if (Math.abs(noteTimeSec * 1000 - now) < closestNote.hitWindow) {
    closestNote.resolved = true;
    closestNote.setFillStyle(0x86efac);
    gameState.score += 10;
    gameState.combo++;
    gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);

    if (gameState.combo >= 5 && gameState.combo % 5 === 0) {
      gameState.score += gameState.combo * 2;
    }

    playKeyTap();
    setTimeout(() => closestNote.destroy(), 200);
  }
}

// ─── Results Screen ────────────────────────────────────────
function rebuildResultsScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  const titleText = scene.add.text(width / 2, 40, 'Song Complete!', {
    font: 'bold 36px Arial',
    fill: '#86EFAC'
  });
  titleText.setOrigin(0.5, 0);

  const scoreText = scene.add.text(width / 2, 120, `Score: ${gameState.score}`, {
    font: 'bold 28px Arial',
    fill: '#F9A8D4'
  });
  scoreText.setOrigin(0.5, 0);

  const maxComboText = scene.add.text(width / 2, 170, `Max Combo: ${gameState.maxCombo}`, {
    font: '20px Arial',
    fill: '#FFFFFF'
  });
  maxComboText.setOrigin(0.5, 0);

  createButton(scene, width / 2 - 80, height - 80, 'Replay', () => {
    startSong(scene, gameState.selectedSong);
  });

  createButton(scene, width / 2 + 80, height - 80, 'Song List', () => {
    gameState.currentScreen = SCREEN.SONG_SELECT;
    rebuildSongSelectScreen(scene);
  });
}

// ─── Utility Functions ──────────────────────────────────────
function clearAllPhaserObjects(scene) {
  scene.children.list.slice().forEach(child => child.destroy());
}

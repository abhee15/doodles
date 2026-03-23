// ══════════════════════════════════════════════════════════════
// Piano Keys Game — Phaser 3 (Refactored with Manager Classes)
// Removed: Audio synthesis, gameState global, magic constants
// Kept: All game rendering, screen logic, keyboard handling
// ══════════════════════════════════════════════════════════════

// ─── Configuration Constants ────────────────────────────────
const CONFIG = {
  SCREEN: { MENU: 0, LEARN: 1, LEARN_SONG: 2, SONG_SELECT: 3, PLAY: 4, RESULTS: 5 },
  KEYBOARD_MAP: {
    z: 'C4',
    x: 'D4',
    c: 'E4',
    v: 'F4',
    b: 'G4',
    n: 'A4',
    m: 'B4',
    ',': 'C5',
    s: 'C#4',
    d: 'D#4',
    g: 'F#4',
    h: 'G#4',
    j: 'A#4'
  },
  KEYBOARD_LABELS: { C4: 'Z', D4: 'X', E4: 'C', F4: 'V', G4: 'B', A4: 'N', B4: 'M', C5: ',' },
  FALL_SPEED_LEARN_MS: 0.1,
  HUD_HEIGHT: 70,
  LEAD_IN_MS: 2000,
  HIT_WINDOW_MS: 150
};

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
  { id: 'C_maj', label: 'C Major', keys: ['C4', 'E4', 'G4'], fingers: [1, 3, 5], color: 0xf9a8d4 },
  { id: 'G_maj', label: 'G Major', keys: ['G4', 'B4', 'D4'], fingers: [1, 3, 5], color: 0x86efac },
  { id: 'A_min', label: 'A Minor', keys: ['A4', 'C5', 'E4'], fingers: [1, 3, 5], color: 0xc4b5fd },
  { id: 'F_maj', label: 'F Major', keys: ['F4', 'A4', 'C5'], fingers: [1, 3, 5], color: 0xfcd34d },
  { id: 'E_min', label: 'E Minor', keys: ['E4', 'G4', 'B4'], fingers: [1, 3, 5], color: 0x6ee7b7 },
  { id: 'D_min', label: 'D Minor', keys: ['D4', 'F4', 'A4'], fingers: [1, 3, 5], color: 0x93c5fd }
];

const CHORD_SONGS = [
  {
    title: 'Hot Cross Buns',
    chords: [
      { id: 'C_maj', label: 'C Major', beats: 2 },
      { id: 'C_maj', label: 'C Major', beats: 2 },
      { id: 'G_maj', label: 'G Major', beats: 2 },
      { id: 'C_maj', label: 'C Major', beats: 2 }
    ]
  },
  {
    title: 'Mary Had a Little Lamb',
    chords: [
      { id: 'C_maj', label: 'C Major', beats: 4 },
      { id: 'G_maj', label: 'G Major', beats: 2 },
      { id: 'C_maj', label: 'C Major', beats: 2 }
    ]
  },
  {
    title: 'Twinkle Twinkle',
    chords: [
      { id: 'C_maj', label: 'C Major', beats: 4 },
      { id: 'G_maj', label: 'G Major', beats: 2 },
      { id: 'C_maj', label: 'C Major', beats: 2 }
    ]
  },
  {
    title: 'Happy Birthday',
    chords: [
      { id: 'C_maj', label: 'C Major', beats: 2 },
      { id: 'C_maj', label: 'C Major', beats: 2 },
      { id: 'G_maj', label: 'G Major', beats: 2 },
      { id: 'C_maj', label: 'C Major', beats: 4 }
    ]
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

// ─── State Manager Class ────────────────────────────────────
class StateManager {
  constructor() {
    this.state = {
      currentScreen: CONFIG.SCREEN.MENU,
      isMobile: false,
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
      selectedChordSong: null,
      currentChordIndex: 0,
      chordLessonTimer: null
    };
  }

  setScreen(screenId) {
    this.state.currentScreen = screenId;
  }

  setMobile(isMobile) {
    this.state.isMobile = isMobile;
    if (isMobile) {
      this.state.whiteNotes = WHITE_NOTES_1OCT;
      this.state.blackNotePositions = BLACK_NOTE_POSITIONS_1OCT;
    }
  }

  setSelectedSong(song) {
    this.state.selectedSong = song;
  }

  resetScore() {
    this.state.score = 0;
    this.state.combo = 0;
    this.state.maxCombo = 0;
  }

  addScore(points) {
    this.state.score += points;
  }

  incrementCombo() {
    this.state.combo++;
    this.state.maxCombo = Math.max(this.state.maxCombo, this.state.combo);
  }

  resetCombo() {
    this.state.combo = 0;
  }

  clearSpawnTimers() {
    this.state.spawnTimers.forEach(timerId => clearTimeout(timerId));
    this.state.spawnTimers = [];
  }

  addSpawnTimer(timerId) {
    this.state.spawnTimers.push(timerId);
  }

  clearKeyboardState() {
    this.state.keyboardState.clear();
  }

  setKeyboardState(noteName, keyObj) {
    this.state.keyboardState.set(noteName, { obj: keyObj, state: 'normal' });
  }

  getKeyState(noteName) {
    return this.state.keyboardState.get(noteName);
  }

  setKeyPressed(noteName, isPressed) {
    if (isPressed) {
      this.state.keysPressed.add(noteName);
    } else {
      this.state.keysPressed.delete(noteName);
    }
  }

  isKeyPressed(noteName) {
    return this.state.keysPressed.has(noteName);
  }

  setCurrentChord(chord) {
    this.state.currentChord = chord;
  }

  highlightKeys(keys) {
    this.state.highlightedKeys.clear();
    keys.forEach(key => this.state.highlightedKeys.add(key));
  }

  isKeyHighlighted(noteName) {
    return this.state.highlightedKeys.has(noteName);
  }

  setSelectedChordSong(song) {
    this.state.selectedChordSong = song;
  }

  setCurrentChordIndex(idx) {
    this.state.currentChordIndex = idx;
  }

  setChordLessonTimer(timerId) {
    if (this.state.chordLessonTimer) {
      clearTimeout(this.state.chordLessonTimer);
    }
    this.state.chordLessonTimer = timerId;
  }

  clearChordLessonTimer() {
    if (this.state.chordLessonTimer) {
      clearTimeout(this.state.chordLessonTimer);
      this.state.chordLessonTimer = null;
    }
  }

  addActiveNote(note) {
    this.state.activeNotes.push(note);
  }

  clearActiveNotes() {
    this.state.activeNotes = [];
  }
}

// ─── Audio Manager Class ────────────────────────────────────
class AudioManager {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (this.audioCtx) {
      return;
    }
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  noteToFreq(noteName) {
    const noteMap = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const note = noteName[0];
    const octave = parseInt(noteName[1]);
    const semitone = noteMap[note] + (noteName.length === 3 ? 1 : 0);
    const midi = (octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  playNote(noteName, duration = 0.5) {
    this.init();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const freq = this.noteToFreq(noteName);

    const master = ctx.createGain();
    master.connect(ctx.destination);
    master.gain.setValueAtTime(0.35, now);
    master.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // Fundamental
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = freq;
    const gain1 = ctx.createGain();
    gain1.gain.value = 0.5;
    osc1.connect(gain1);
    gain1.connect(master);

    // 2nd harmonic
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2;
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.25;
    osc2.connect(gain2);
    gain2.connect(master);

    // 3rd harmonic
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.value = freq * 3;
    const gain3 = ctx.createGain();
    gain3.gain.value = 0.15;
    osc3.connect(gain3);
    gain3.connect(master);

    // 4th harmonic
    const osc4 = ctx.createOscillator();
    osc4.type = 'sine';
    osc4.frequency.value = freq * 4;
    const gain4 = ctx.createGain();
    gain4.gain.value = 0.08;
    osc4.connect(gain4);
    gain4.connect(master);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc4.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
    osc4.stop(now + duration);
  }

  playKeyTap() {
    this.init();
    const ctx = this.audioCtx;
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

  playMissSound() {
    this.init();
    const ctx = this.audioCtx;
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
}

// ─── Helper Functions ──────────────────────────────────────
function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase()) ||
    window.innerWidth < 769
  );
}

// ─── Game Scene ────────────────────────────────────────────
const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

const stateManager = new StateManager();
const audioManager = new AudioManager();

const config = createGameConfig({
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 0x0d1b2a,
  scene: {
    preload() {},
    create() {
      const scene = this;
      window.phaserScene = scene;

      stateManager.setMobile(isMobileDevice());

      const menuScreen = document.getElementById('menu-screen');
      const btnLearn = document.getElementById('btn-learn');
      const btnPlay = document.getElementById('btn-play');
      const backBtn = document.getElementById('game-back-btn');

      btnLearn.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.style.pointerEvents = 'auto';
        }
        stateManager.setScreen(CONFIG.SCREEN.LEARN);
        stateManager.state.isPlaying = false;
        rebuildLearnScreen(scene);
      });

      btnPlay.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.style.pointerEvents = 'auto';
        }
        stateManager.setScreen(CONFIG.SCREEN.SONG_SELECT);
        stateManager.state.isPlaying = false;
        rebuildSongSelectScreen(scene);
      });

      backBtn.addEventListener('click', e => {
        if (stateManager.state.currentScreen !== CONFIG.SCREEN.MENU) {
          e.preventDefault();
          goBackScreen(scene);
        }
      });

      document.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        if (CONFIG.KEYBOARD_MAP[key]) {
          const noteName = CONFIG.KEYBOARD_MAP[key];
          if (!stateManager.isKeyPressed(noteName)) {
            stateManager.setKeyPressed(noteName, true);
            handleKeyPress(scene, noteName);
          }
        }
      });

      document.addEventListener('keyup', e => {
        const key = e.key.toLowerCase();
        if (CONFIG.KEYBOARD_MAP[key]) {
          const noteName = CONFIG.KEYBOARD_MAP[key];
          stateManager.setKeyPressed(noteName, false);
          const keyState = stateManager.getKeyState(noteName);
          if (keyState && keyState.obj && keyState.obj.active) {
            handleKeyRelease(keyState.obj);
          }
        }
      });

      window.addEventListener('resize', () => {
        if (stateManager.state.currentScreen === CONFIG.SCREEN.LEARN) {
          rebuildLearnScreen(scene);
        }
        if (stateManager.state.currentScreen === CONFIG.SCREEN.SONG_SELECT) {
          rebuildSongSelectScreen(scene);
        }
        if (stateManager.state.currentScreen === CONFIG.SCREEN.PLAY) {
          rebuildPlayScreen(scene);
        }
      });
    },
    update(time, delta) {
      if (
        stateManager.state.currentScreen !== CONFIG.SCREEN.PLAY ||
        !stateManager.state.isPlaying
      ) {
        return;
      }

      const fallZoneH = stateManager.state.pianoY - CONFIG.HUD_HEIGHT;

      stateManager.state.activeNotes.forEach(note => {
        if (note.resolved) {
          return;
        }
        note.y += CONFIG.FALL_SPEED_LEARN_MS * delta;
        if (note.y > stateManager.state.pianoY + 100) {
          note.resolved = true;
          note.destroy();
        }
      });
    }
  }
});

const game = new Phaser.Game(config);

// ─── Screen Navigation ──────────────────────────────────────
function goBackScreen(scene) {
  stateManager.clearChordLessonTimer();
  stateManager.clearSpawnTimers();
  clearAllPhaserObjects(scene);
  stateManager.state.isPlaying = false;
  stateManager.clearActiveNotes();

  if (stateManager.state.currentScreen === CONFIG.SCREEN.PLAY) {
    stateManager.setScreen(CONFIG.SCREEN.SONG_SELECT);
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'auto';
    }
    rebuildSongSelectScreen(scene);
  } else if (stateManager.state.currentScreen === CONFIG.SCREEN.SONG_SELECT) {
    stateManager.setScreen(CONFIG.SCREEN.MENU);
    document.getElementById('menu-screen').style.display = 'flex';
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'none';
    }
  } else if (stateManager.state.currentScreen === CONFIG.SCREEN.LEARN_SONG) {
    stateManager.setSelectedChordSong(null);
    stateManager.setCurrentChordIndex(0);
    stateManager.clearChordLessonTimer();
    stateManager.setScreen(CONFIG.SCREEN.LEARN);
    rebuildLearnScreen(scene);
  } else if (stateManager.state.currentScreen === CONFIG.SCREEN.LEARN) {
    stateManager.setScreen(CONFIG.SCREEN.MENU);
    document.getElementById('menu-screen').style.display = 'flex';
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'none';
    }
  }
}

// ─── Landscape Suggestion Banner (non-blocking) ─────────────
function showLandscapeBanner(scene, width) {
  const banner = scene.add.rectangle(width / 2, 16, width - 20, 28, 0x1a3a52, 0.9);
  banner.setOrigin(0.5, 0);
  banner.setStrokeStyle(1, 0xf9a8d4);
  const bannerText = scene.add.text(width / 2, 30, '📱 Tip: Rotate to landscape for bigger keys!', {
    font: 'bold 12px Arial',
    fill: '#F9A8D4',
    align: 'center'
  });
  bannerText.setOrigin(0.5, 0.5);
}

// ─── Piano Keyboard Builder ─────────────────────────────────
function buildPianoKeyboard(scene) {
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const isPortrait = height > width;
  const whiteNotesCount = stateManager.state.whiteNotes.length;

  let pianoStripWidth, whiteKeyHeight, blackKeyHeight, pianoY;

  if (stateManager.state.isMobile && !isPortrait) {
    pianoStripWidth = width - 20;
    whiteKeyHeight = Math.floor(height * 0.75);
    blackKeyHeight = whiteKeyHeight * 0.63;
    pianoY = height * 0.42;
  } else if (stateManager.state.isMobile && isPortrait) {
    pianoStripWidth = width - 10;
    whiteKeyHeight = Math.min(Math.floor(height * 0.25), 160);
    blackKeyHeight = Math.floor(whiteKeyHeight * 0.63);
    pianoY = height - whiteKeyHeight - 10;
  } else {
    pianoStripWidth = Math.min(860, width - 20);
    whiteKeyHeight = 150;
    blackKeyHeight = 95;
    pianoY = height - 160;
  }

  stateManager.state.whiteKeyWidth = Math.floor(pianoStripWidth / whiteNotesCount);
  stateManager.state.blackKeyWidth = Math.max(
    36,
    Math.floor(stateManager.state.whiteKeyWidth * 0.6)
  );
  const pianoX = (width - pianoStripWidth) / 2;
  stateManager.state.pianoY = pianoY;

  stateManager.clearKeyboardState();

  // White keys
  stateManager.state.whiteNotes.forEach((note, idx) => {
    const x = pianoX + idx * stateManager.state.whiteKeyWidth;
    const key = scene.add.rectangle(
      x + stateManager.state.whiteKeyWidth / 2,
      stateManager.state.pianoY + whiteKeyHeight / 2,
      stateManager.state.whiteKeyWidth - 2,
      whiteKeyHeight,
      0xffffff
    );
    key.setInteractive();
    key.setStrokeStyle(2, 0x333333);
    key.setName(note);
    key.noteName = note;
    key.keyType = 'white';

    let noteLabelFont = '12px';
    if (stateManager.state.whiteKeyWidth > 100) {
      noteLabelFont = '20px';
    } else if (stateManager.state.whiteKeyWidth > 80) {
      noteLabelFont = '18px';
    } else if (stateManager.state.whiteKeyWidth > 60) {
      noteLabelFont = '16px';
    }

    const noteLabel = scene.add.text(
      x + stateManager.state.whiteKeyWidth / 2,
      stateManager.state.pianoY + whiteKeyHeight - 30,
      note,
      { font: `bold ${noteLabelFont} Arial`, fill: '#000000' }
    );
    noteLabel.setOrigin(0.5, 0.5);

    if (CONFIG.KEYBOARD_LABELS[note]) {
      let keyLabelFont = '11px';
      if (stateManager.state.whiteKeyWidth > 100) {
        keyLabelFont = '18px';
      } else if (stateManager.state.whiteKeyWidth > 80) {
        keyLabelFont = '16px';
      } else if (stateManager.state.whiteKeyWidth > 60) {
        keyLabelFont = '14px';
      }

      const keyLabel = scene.add.text(
        x + stateManager.state.whiteKeyWidth / 2,
        stateManager.state.pianoY + 15,
        CONFIG.KEYBOARD_LABELS[note],
        { font: `bold ${keyLabelFont} Arial`, fill: '#666666' }
      );
      keyLabel.setOrigin(0.5, 0.5);
    }

    key.on('pointerdown', () => handleKeyPress(scene, note));
    key.on('pointerup', () => handleKeyRelease(key));
    key.on('pointerover', pointer => {
      if (pointer.isDown) {
        handleKeyPress(scene, note);
      }
    });

    stateManager.setKeyboardState(note, key);
  });

  // Black keys
  stateManager.state.blackNotePositions.forEach(bp => {
    const x =
      pianoX +
      (bp.afterWhiteIdx + 1) * stateManager.state.whiteKeyWidth -
      stateManager.state.blackKeyWidth / 2;
    const key = scene.add.rectangle(
      x + stateManager.state.blackKeyWidth / 2,
      stateManager.state.pianoY + blackKeyHeight / 2,
      stateManager.state.blackKeyWidth - 2,
      blackKeyHeight,
      0x000000
    );
    key.setInteractive();
    key.setStrokeStyle(2, 0x111111);
    key.setName(bp.note);
    key.noteName = bp.note;
    key.keyType = 'black';
    key.setDepth(10);

    const blackKeyLabels = { 'C#4': 'S', 'D#4': 'D', 'F#4': 'G', 'G#4': 'H', 'A#4': 'J' };
    if (blackKeyLabels[bp.note]) {
      let blackKeyLabelFont = '10px';
      if (stateManager.state.blackKeyWidth > 60) {
        blackKeyLabelFont = '16px';
      } else if (stateManager.state.blackKeyWidth > 50) {
        blackKeyLabelFont = '14px';
      } else if (stateManager.state.blackKeyWidth > 40) {
        blackKeyLabelFont = '12px';
      }

      const keyLabel = scene.add.text(
        x + stateManager.state.blackKeyWidth / 2,
        stateManager.state.pianoY - 15,
        blackKeyLabels[bp.note],
        { font: `bold ${blackKeyLabelFont} Arial`, fill: '#FFFFFF' }
      );
      keyLabel.setOrigin(0.5, 0.5);
      keyLabel.setDepth(9);
    }

    let blackNoteLabelFont = '9px';
    if (stateManager.state.blackKeyWidth > 60) {
      blackNoteLabelFont = '14px';
    } else if (stateManager.state.blackKeyWidth > 50) {
      blackNoteLabelFont = '12px';
    } else if (stateManager.state.blackKeyWidth > 40) {
      blackNoteLabelFont = '11px';
    }

    const labelText = scene.add.text(
      x + stateManager.state.blackKeyWidth / 2,
      stateManager.state.pianoY + blackKeyHeight / 2,
      bp.note,
      { font: `bold ${blackNoteLabelFont} Arial`, fill: '#FFFFFF' }
    );
    labelText.setOrigin(0.5, 0.5);
    labelText.setDepth(9);

    key.on('pointerdown', () => handleKeyPress(scene, bp.note));
    key.on('pointerup', () => handleKeyRelease(key));
    key.on('pointerover', pointer => {
      if (pointer.isDown) {
        handleKeyPress(scene, bp.note);
      }
    });

    stateManager.setKeyboardState(bp.note, key);
  });

  const hitLineY = stateManager.state.pianoY - 22;
  scene.add.line(0, hitLineY, 0, hitLineY, width, hitLineY, 0xffd700);
}

function handleKeyPress(scene, noteName) {
  const keyState = stateManager.getKeyState(noteName);
  if (!keyState) {
    return;
  }

  keyState.state = 'pressed';
  keyState.obj.setFillStyle(keyState.obj.keyType === 'white' ? 0xdddddd : 0x333333);
  audioManager.playNote(noteName, 0.3);
}

function handleKeyRelease(keyObj) {
  if (!keyObj || !keyObj.active) {
    return;
  }

  const keyState = stateManager.getKeyState(keyObj.noteName);
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
  if (!stateManager.state.selectedChordSong) {
    rebuildChordSongSelectScreen(scene);
    return;
  }
  rebuildChordLessonScreen(scene);
}

function rebuildChordSongSelectScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const isPortrait = height > width;

  if (stateManager.state.isMobile && isPortrait) {
    showLandscapeBanner(scene, width);
  }

  const title = scene.add.text(width / 2, 20, '🎵 Learn Chord Progressions', {
    font: 'bold 28px Arial',
    fill: '#F9A8D4',
    align: 'center'
  });
  title.setOrigin(0.5, 0);

  const subtitle = scene.add.text(
    width / 2,
    60,
    'Choose a song to learn how to play it with chords',
    { font: '14px Arial', fill: '#CCCCCC', align: 'center' }
  );
  subtitle.setOrigin(0.5, 0);

  const cardWidth = Math.min(280, (width - 40) / 2);
  const cardHeight = 100;
  const cardsPerRow = Math.floor((width - 40) / (cardWidth + 20));
  const cardStartY = 130;
  const cardStartX = (width - cardsPerRow * (cardWidth + 20) + 20) / 2;

  CHORD_SONGS.forEach((song, idx) => {
    const row = Math.floor(idx / cardsPerRow);
    const col = idx % cardsPerRow;
    const x = cardStartX + col * (cardWidth + 20);
    const y = cardStartY + row * (cardHeight + 20);

    const card = scene.add.rectangle(x, y, cardWidth, cardHeight, 0x1a3a52);
    card.setStrokeStyle(2, 0x86efac);
    card.setInteractive();

    const songTitle = scene.add.text(x, y - 30, song.title, {
      font: 'bold 16px Arial',
      fill: '#F9A8D4',
      align: 'center'
    });
    songTitle.setOrigin(0.5, 0.5);

    const chordProgression = song.chords.map(c => c.label.split(' ')[0]).join(' - ');
    const progressText = scene.add.text(x, y + 10, chordProgression, {
      font: '12px Arial',
      fill: '#86efac',
      align: 'center'
    });
    progressText.setOrigin(0.5, 0.5);

    card.on('pointerover', () => card.setScale(1.05));
    card.on('pointerout', () => card.setScale(1));
    card.on('pointerdown', () => {
      stateManager.setSelectedChordSong(song);
      stateManager.setCurrentChordIndex(0);
      stateManager.setScreen(CONFIG.SCREEN.LEARN_SONG);
      rebuildChordLessonScreen(scene);
    });
  });
}

function rebuildChordLessonScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const isPortrait = height > width;

  if (stateManager.state.isMobile && isPortrait) {
    showLandscapeBanner(scene, width);
  }

  const isMobileLandscape = stateManager.state.isMobile && !isPortrait;
  const song = stateManager.state.selectedChordSong;
  const currentChord = song.chords[stateManager.state.currentChordIndex];
  const chordInfo = CHORDS.find(c => c.id === currentChord.id);

  if (!isMobileLandscape) {
    const title = scene.add.text(width / 2, 20, `🎵 ${song.title}`, {
      font: 'bold 28px Arial',
      fill: '#F9A8D4',
      align: 'center'
    });
    title.setOrigin(0.5, 0);
  }

  const chordDisplayY = isMobileLandscape ? CONFIG.HUD_HEIGHT + 15 : 80;
  const chordLabel = scene.add.text(width / 2, chordDisplayY, chordInfo.label, {
    font: 'bold 48px Arial',
    fill: '#FFFFFF',
    align: 'center'
  });
  chordLabel.setOrigin(0.5, 0);

  const chordNotation = scene.add.text(width / 2, chordDisplayY + 60, chordInfo.keys.join(' - '), {
    font: '24px Arial',
    fill: '#86efac',
    align: 'center'
  });
  chordNotation.setOrigin(0.5, 0);

  const progressText = scene.add.text(
    width / 2,
    chordDisplayY + 110,
    `Chord ${stateManager.state.currentChordIndex + 1} of ${song.chords.length}`,
    { font: '14px Arial', fill: '#AAAAAA', align: 'center' }
  );
  progressText.setOrigin(0.5, 0);

  buildPianoKeyboard(scene);

  stateManager.highlightKeys(chordInfo.keys);
  stateManager.state.keyboardState.forEach((keyState, noteName) => {
    if (stateManager.isKeyHighlighted(noteName)) {
      keyState.obj.setFillStyle(chordInfo.color || 0xffd700);
    } else {
      if (keyState.obj.keyType === 'white') {
        keyState.obj.setFillStyle(0xffffff);
      } else {
        keyState.obj.setFillStyle(0x000000);
      }
    }
  });

  stateManager.setCurrentChord(chordInfo);
  playChordArpeggio(scene);

  const timerId = setTimeout(() => {
    stateManager.setCurrentChordIndex(
      (stateManager.state.currentChordIndex + 1) % song.chords.length
    );
    rebuildChordLessonScreen(scene);
  }, 4000);
  stateManager.setChordLessonTimer(timerId);

  const buttonY = isMobileLandscape ? CONFIG.HUD_HEIGHT + 50 : stateManager.state.pianoY + 40;
  createButton(scene, width / 2 - 100, buttonY, '← Back', () => {
    stateManager.setSelectedChordSong(null);
    stateManager.setCurrentChordIndex(0);
    stateManager.clearChordLessonTimer();
    rebuildLearnScreen(scene);
  });

  const instructionY = isMobileLandscape ? CONFIG.HUD_HEIGHT + 50 : stateManager.state.pianoY + 40;
  const instrText = scene.add.text(width / 2 + 100, instructionY, 'Play along with the chord!', {
    font: '12px Arial',
    fill: '#86efac',
    align: 'center'
  });
  instrText.setOrigin(0.5, 0.5);
}

function selectChord(scene, chord) {
  stateManager.setCurrentChord(chord);
  stateManager.highlightKeys(chord.keys);

  stateManager.state.keyboardState.forEach((keyState, noteName) => {
    if (!keyState || !keyState.obj) {
      console.warn('Invalid key state for', noteName);
      return;
    }
    if (stateManager.isKeyHighlighted(noteName)) {
      keyState.obj.setFillStyle(0xffd700);
      keyState.obj.setStrokeStyle(2, 0xffb700);
    } else {
      keyState.obj.setFillStyle(keyState.obj.keyType === 'white' ? 0xffffff : 0x000000);
      keyState.obj.setStrokeStyle(2, keyState.obj.keyType === 'white' ? 0x333333 : 0x111111);
    }
  });

  playChordArpeggio(scene);
}

function playChordArpeggio(scene) {
  stateManager.state.currentChord.keys.forEach((key, idx) => {
    setTimeout(() => audioManager.playNote(key, 0.5), idx * 100);
  });
}

// ─── Song Select Screen ─────────────────────────────────────
function rebuildSongSelectScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const isPortrait = height > width;

  if (stateManager.state.isMobile && isPortrait) {
    showLandscapeBanner(scene, width);
  }

  const title = scene.add.text(width / 2, 20, 'Select a Song', {
    font: 'bold 32px Arial',
    fill: '#F9A8D4'
  });
  title.setOrigin(0.5, 0);

  const speedY = 65;
  const speedLabels = ['🐢 Slow', '▶ Normal', '⚡ Fast'];
  const speedMultipliers = [0.5, 1, 1.5];
  const speedButtonWidth = 90;
  const speedSpacing = 110;
  const speedStartX = (width - speedSpacing * 2) / 2;

  speedLabels.forEach((label, idx) => {
    const x = speedStartX + idx * speedSpacing;
    const isSelected = stateManager.state.speedMultiplier === speedMultipliers[idx];
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
      stateManager.state.speedMultiplier = speedMultipliers[idx];
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
  stateManager.setSelectedSong(song);
  stateManager.resetScore();
  stateManager.state.activeNotes = [];
  stateManager.state.songStartTime = Date.now();
  stateManager.setScreen(CONFIG.SCREEN.PLAY);
  stateManager.state.isPlaying = true;

  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.style.pointerEvents = 'auto';
  }

  rebuildPlayScreen(scene);
}

// ─── Play Along Screen ──────────────────────────────────────
function rebuildPlayScreen(scene) {
  clearAllPhaserObjects(scene);
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  const songTitle = scene.add.text(width / 2, 15, stateManager.state.selectedSong.title, {
    font: 'bold 20px Arial',
    fill: '#F9A8D4'
  });
  songTitle.setOrigin(0.5, 0);

  const learnLabel = scene.add.text(width / 2, 40, '🎵 Practice at your own pace', {
    font: '12px Arial',
    fill: '#86efac'
  });
  learnLabel.setOrigin(0.5, 0);

  if (!stateManager.state.isMobile) {
    const guideText = scene.add.text(
      width / 2,
      height - 310,
      'White: Z X C V B N M ,  |  Black: S D G H J  or click keys',
      { font: '12px Arial', fill: '#AAAAAA', align: 'center' }
    );
    guideText.setOrigin(0.5, 0);
  }

  buildPianoKeyboard(scene);

  function spawnNotesForSong() {
    const beatDurationMs = (60 / stateManager.state.selectedSong.bpm) * 1000;
    const fallZoneH = stateManager.state.pianoY - CONFIG.HUD_HEIGHT;
    const fallDurationMs = (fallZoneH / CONFIG.FALL_SPEED_LEARN_MS) * 1000;

    stateManager.state.selectedSong.notes.forEach(noteData => {
      const beatMs = noteData.beat * beatDurationMs;
      const spawnMs = CONFIG.LEAD_IN_MS + beatMs - fallDurationMs;

      const timerId = setTimeout(
        () => {
          if (
            !stateManager.state.isPlaying ||
            stateManager.state.currentScreen !== CONFIG.SCREEN.PLAY
          ) {
            return;
          }

          const keyState = stateManager.getKeyState(noteData.key);
          if (!keyState) {
            return;
          }

          const noteDurationMs = noteData.duration * beatDurationMs;
          const noteHeight = Math.max(20, Math.floor((noteDurationMs / 1000) * 100));
          const laneX = keyState.obj.x;
          const noteWidth =
            keyState.obj.keyType === 'white'
              ? stateManager.state.whiteKeyWidth - 4
              : stateManager.state.blackKeyWidth - 4;

          const note = scene.add.rectangle(
            laneX,
            CONFIG.HUD_HEIGHT - noteHeight,
            noteWidth,
            noteHeight,
            0x22c55e
          );
          note.setStrokeStyle(1, 0x00dd00);
          note.setDepth(5);
          note.noteName = noteData.key;
          note.targetY = stateManager.state.pianoY - 22;
          note.resolved = false;
          note.hitOnce = false;
          note.noteData = noteData;

          stateManager.addActiveNote(note);
        },
        Math.max(0, spawnMs)
      );

      stateManager.addSpawnTimer(timerId);
    });

    const lastNote =
      stateManager.state.selectedSong.notes[stateManager.state.selectedSong.notes.length - 1];
    const lastNoteBeatMs = lastNote.beat * beatDurationMs;
    const nextLoopDelayMs = CONFIG.LEAD_IN_MS + lastNoteBeatMs + 1000;

    const loopTimerId = setTimeout(() => {
      if (stateManager.state.isPlaying && stateManager.state.currentScreen === CONFIG.SCREEN.PLAY) {
        spawnNotesForSong();
      }
    }, nextLoopDelayMs);

    stateManager.addSpawnTimer(loopTimerId);
  }

  spawnNotesForSong();
}

function checkNoteHit(scene, noteName) {
  const unresolved = stateManager.state.activeNotes.filter(
    n => !n.resolved && n.noteName === noteName
  );
  if (unresolved.length === 0) {
    return;
  }

  const note = unresolved[0];
  note.resolved = true;
  note.setFillStyle(0x86efac);

  stateManager.addScore(10);
  stateManager.incrementCombo();

  if (stateManager.state.combo >= 5 && stateManager.state.combo % 5 === 0) {
    stateManager.addScore(stateManager.state.combo * 2);
  }

  audioManager.playKeyTap();
  setTimeout(() => note.destroy(), 100);
}

// ─── Utility Functions ──────────────────────────────────────
function clearAllPhaserObjects(scene) {
  stateManager.clearSpawnTimers();
  stateManager.clearKeyboardState();
  scene.children.list.slice().forEach(child => child.destroy());
}

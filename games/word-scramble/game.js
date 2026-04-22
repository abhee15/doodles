'use strict';

const WORD_SETS = {
  animals: {
    label: 'Animals',
    emoji: '🦁',
    color: '#d97706',
    words: [
      { word: 'CAT', hint: 'A furry pet that says meow' },
      { word: 'DOG', hint: 'A loyal pet that barks' },
      { word: 'BEAR', hint: 'A large furry animal that hibernates' },
      { word: 'FROG', hint: 'A green animal that jumps and croaks' },
      { word: 'DUCK', hint: 'A bird that swims and quacks' },
      { word: 'FISH', hint: 'An animal that breathes underwater' },
      { word: 'LION', hint: 'The king of the jungle' },
      { word: 'WOLF', hint: 'A wild animal that howls at the moon' },
      { word: 'DEER', hint: 'A graceful animal with antlers' },
      { word: 'CRAB', hint: 'A sea creature that walks sideways' },
      { word: 'SWAN', hint: 'A beautiful white water bird' },
      { word: 'PANDA', hint: 'A black-and-white bear from China' },
      { word: 'TIGER', hint: 'An orange cat with black stripes' },
      { word: 'SNAKE', hint: 'A long reptile without legs' },
      { word: 'EAGLE', hint: 'A powerful bird that soars high' },
      { word: 'WHALE', hint: 'The largest animal on Earth' },
      { word: 'HIPPO', hint: 'A huge animal that loves the water' },
      { word: 'RABBIT', hint: 'A fluffy animal with long ears' },
      { word: 'PARROT', hint: 'A colorful bird that can talk' },
      { word: 'MONKEY', hint: 'A clever animal that swings in trees' }
    ]
  },
  food: {
    label: 'Food',
    emoji: '🍕',
    color: '#dc2626',
    words: [
      { word: 'PIE', hint: 'A round baked dessert' },
      { word: 'RICE', hint: 'A tiny grain eaten all over the world' },
      { word: 'CAKE', hint: 'A sweet treat for birthdays' },
      { word: 'CORN', hint: 'A yellow vegetable on a cob' },
      { word: 'MILK', hint: 'A white drink from cows' },
      { word: 'PLUM', hint: 'A small purple fruit' },
      { word: 'PIZZA', hint: 'A flat baked dish with toppings' },
      { word: 'BREAD', hint: 'You put butter on this' },
      { word: 'GRAPE', hint: 'A small fruit that grows in bunches' },
      { word: 'LEMON', hint: 'A sour yellow citrus fruit' },
      { word: 'MELON', hint: 'A large sweet fruit with seeds' },
      { word: 'BACON', hint: 'A salty breakfast meat' },
      { word: 'PASTA', hint: 'Italian noodles with sauce' },
      { word: 'MANGO', hint: 'A sweet tropical orange fruit' },
      { word: 'PEACH', hint: 'A fuzzy orange fruit with a pit' },
      { word: 'ONION', hint: 'A vegetable that makes you cry' },
      { word: 'CARROT', hint: 'An orange vegetable rabbits love' },
      { word: 'CHERRY', hint: 'A small red fruit on a stem' },
      { word: 'BANANA', hint: 'A curved yellow fruit monkeys love' },
      { word: 'COOKIE', hint: 'A small sweet baked snack' }
    ]
  },
  space: {
    label: 'Space',
    emoji: '🚀',
    color: '#4f46e5',
    words: [
      { word: 'SUN', hint: 'The star at the center of our solar system' },
      { word: 'MOON', hint: "Earth's natural satellite" },
      { word: 'MARS', hint: 'The red planet' },
      { word: 'STAR', hint: 'A ball of burning gas far away' },
      { word: 'COMET', hint: 'A space rock with a glowing tail' },
      { word: 'ORBIT', hint: 'The path a planet travels around the sun' },
      { word: 'PLUTO', hint: 'A dwarf planet at the edge of our solar system' },
      { word: 'VENUS', hint: 'The hottest planet in our solar system' },
      { word: 'EARTH', hint: 'Our home planet' },
      { word: 'SATURN', hint: 'The planet with beautiful rings' },
      { word: 'GALAXY', hint: 'A huge group of billions of stars' },
      { word: 'ROCKET', hint: 'A vehicle that travels to space' },
      { word: 'METEOR', hint: "A space rock that enters Earth's atmosphere" },
      { word: 'PLANET', hint: 'A large sphere that orbits a star' },
      { word: 'NEBULA', hint: 'A giant cloud of gas and dust in space' },
      { word: 'URANUS', hint: 'The planet that rotates on its side' },
      { word: 'JUPITER', hint: 'The largest planet in our solar system' },
      { word: 'MERCURY', hint: 'The closest planet to the Sun' },
      { word: 'NEPTUNE', hint: 'The windiest and coldest planet' },
      { word: 'GRAVITY', hint: 'The force that pulls things toward each other' }
    ]
  },
  nature: {
    label: 'Nature',
    emoji: '🌿',
    color: '#16a34a',
    words: [
      { word: 'ICE', hint: 'Frozen water' },
      { word: 'RAIN', hint: 'Water that falls from clouds' },
      { word: 'LAKE', hint: 'A large body of fresh water' },
      { word: 'LEAF', hint: 'The flat green part of a plant' },
      { word: 'ROCK', hint: 'A hard natural material from the ground' },
      { word: 'SEED', hint: 'A tiny thing that grows into a plant' },
      { word: 'TIDE', hint: 'The rise and fall of the ocean' },
      { word: 'CLOUD', hint: 'A fluffy white mass in the sky' },
      { word: 'RIVER', hint: 'A flowing body of fresh water' },
      { word: 'STORM', hint: 'Heavy rain and strong winds' },
      { word: 'FLAME', hint: 'The visible part of fire' },
      { word: 'FROST', hint: 'Ice crystals that form on cold surfaces' },
      { word: 'OCEAN', hint: 'A vast body of salt water' },
      { word: 'DESERT', hint: 'A dry land that gets very little rain' },
      { word: 'FOREST', hint: 'A large area covered with trees' },
      { word: 'CACTUS', hint: 'A spiny plant that stores water' },
      { word: 'POLLEN', hint: 'Tiny powder that helps plants reproduce' },
      { word: 'GLACIER', hint: 'A huge slow-moving river of ice' },
      { word: 'VOLCANO', hint: 'A mountain that can erupt with lava' },
      { word: 'TORNADO', hint: 'A violent spinning column of air' }
    ]
  },
  sports: {
    label: 'Sports',
    emoji: '⚽',
    color: '#0284c7',
    words: [
      { word: 'RUN', hint: 'Moving fast on your feet' },
      { word: 'KICK', hint: 'Strike something with your foot' },
      { word: 'SWIM', hint: 'Moving through water' },
      { word: 'GOLF', hint: 'A game played with clubs and small white balls' },
      { word: 'YOGA', hint: 'A gentle exercise for body and mind' },
      { word: 'RACE', hint: 'A competition to see who is fastest' },
      { word: 'SCORE', hint: 'Points earned in a game' },
      { word: 'SERVE', hint: 'Start a point in tennis or volleyball' },
      { word: 'SPORT', hint: 'A physical activity done for fun or competition' },
      { word: 'COACH', hint: 'The person who trains a team' },
      { word: 'RUGBY', hint: 'A sport played with an oval ball' },
      { word: 'TENNIS', hint: 'A game played with rackets and a yellow ball' },
      { word: 'HOCKEY', hint: 'A sport played on ice or grass with sticks' },
      { word: 'SOCCER', hint: 'A sport where you kick a round ball into a net' },
      { word: 'BOXING', hint: 'A combat sport using your fists' },
      { word: 'TROPHY', hint: 'A prize given to a winner' },
      { word: 'SPRINT', hint: 'Running as fast as possible' },
      { word: 'CYCLING', hint: 'Riding a bicycle for sport' },
      { word: 'ARCHERY', hint: 'Shooting arrows at a target' },
      { word: 'GYMNAST', hint: 'An athlete who performs acrobatic movements' }
    ]
  }
};

const WORDS_PER_ROUND = 8;
const HINT_COST = 1; // points deducted per hint

function scramble(word) {
  const arr = word.split('');
  let result;
  let tries = 0;
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    result = arr.join('');
    tries++;
  } while (result === word && tries < 10);
  return result;
}

class WordScrambleGame {
  constructor() {
    this.setKey = null;
    this.words = [];
    this.wordIndex = 0;
    this.score = 0;
    this.hintsUsed = 0;
    this.selectedLetters = [];
    this.scrambledLetters = [];
    this.revealedCount = 0;

    this.buildSetGrid();
    this.bindEvents();
    this.showScreen('landing');
  }

  showScreen(name) {
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${name}`).classList.add('active');
  }

  buildSetGrid() {
    const grid = document.getElementById('set-grid');
    grid.innerHTML = '';
    Object.entries(WORD_SETS).forEach(([key, set]) => {
      const btn = document.createElement('button');
      btn.className = 'set-btn';
      btn.style.setProperty('--set-color', set.color);
      btn.innerHTML = `
        <span class="set-emoji">${set.emoji}</span>
        <span class="set-label">${set.label}</span>
      `;
      btn.addEventListener('click', () => this.startGame(key));
      grid.appendChild(btn);
    });
  }

  bindEvents() {
    document
      .getElementById('btn-to-picker')
      .addEventListener('click', () => this.showScreen('picker'));
    document.getElementById('btn-hint').addEventListener('click', () => this.useHint());
    document.getElementById('btn-skip').addEventListener('click', () => this.skipWord());
    document
      .getElementById('btn-play-again')
      .addEventListener('click', () => this.startGame(this.setKey));
    document
      .getElementById('btn-change-set')
      .addEventListener('click', () => this.showScreen('picker'));
    document.getElementById('btn-clear').addEventListener('click', () => this.clearAnswer());
  }

  startGame(setKey) {
    this.setKey = setKey;
    const set = WORD_SETS[setKey];

    // Pick WORDS_PER_ROUND random words, sorted by length (easier first)
    const pool = [...set.words].sort(() => Math.random() - 0.5).slice(0, WORDS_PER_ROUND);
    pool.sort((a, b) => a.word.length - b.word.length);
    this.words = pool;
    this.wordIndex = 0;
    this.score = 0;
    this.hintsUsed = 0;

    document.getElementById('nav-meta').textContent = set.label;
    this.showScreen('game');
    this.renderWord();
  }

  renderWord() {
    const entry = this.words[this.wordIndex];
    const scrambled = scramble(entry.word);
    this.scrambledLetters = scrambled.split('').map((ch, i) => ({ ch, i, used: false }));
    this.selectedLetters = [];
    this.revealedCount = 0;

    // Header
    document.getElementById('word-progress').textContent =
      `Word ${this.wordIndex + 1} of ${WORDS_PER_ROUND}`;
    document.getElementById('word-score').textContent = `Score: ${this.score}`;
    document.getElementById('progress-fill').style.width =
      `${(this.wordIndex / WORDS_PER_ROUND) * 100}%`;

    // Hint text (hidden until used)
    const hintEl = document.getElementById('word-hint');
    hintEl.textContent = '';
    hintEl.style.display = 'none';

    // Answer slots
    this.renderAnswerSlots();

    // Letter tiles
    this.renderLetterTiles();

    // Feedback
    const fb = document.getElementById('word-feedback');
    fb.textContent = '';
    fb.className = 'word-feedback';

    // Hint button state
    document.getElementById('btn-hint').disabled = false;
  }

  renderAnswerSlots() {
    const entry = this.words[this.wordIndex];
    const container = document.getElementById('answer-slots');
    container.innerHTML = '';
    for (let i = 0; i < entry.word.length; i++) {
      const slot = document.createElement('div');
      slot.className = 'answer-slot';
      slot.dataset.index = i;

      const letterEl = this.selectedLetters[i];
      if (letterEl) {
        slot.textContent = letterEl.ch;
        slot.classList.add('filled');
      } else if (i < this.revealedCount) {
        slot.textContent = entry.word[i];
        slot.classList.add('revealed');
      }

      // Click to remove last letter
      slot.addEventListener('click', () => this.removeLastLetter());
      container.appendChild(slot);
    }
  }

  renderLetterTiles() {
    const container = document.getElementById('letter-tiles');
    container.innerHTML = '';
    this.scrambledLetters.forEach((item, idx) => {
      const tile = document.createElement('button');
      tile.className = 'letter-tile';
      tile.textContent = item.ch;
      tile.dataset.tileIdx = idx;
      if (item.used) {
        tile.disabled = true;
        tile.classList.add('used');
      } else {
        tile.addEventListener('click', () => this.selectLetter(idx));
      }
      container.appendChild(tile);
    });
  }

  selectLetter(tileIdx) {
    const entry = this.words[this.wordIndex];
    const totalRevealedAndSelected = this.revealedCount + this.selectedLetters.length;
    if (totalRevealedAndSelected >= entry.word.length) {
      return;
    }

    this.scrambledLetters[tileIdx].used = true;
    this.selectedLetters.push({ ch: this.scrambledLetters[tileIdx].ch, tileIdx });

    this.renderAnswerSlots();
    this.renderLetterTiles();

    // Check if word is complete
    if (this.revealedCount + this.selectedLetters.length === entry.word.length) {
      this.checkAnswer();
    }
  }

  removeLastLetter() {
    if (this.selectedLetters.length === 0) {
      return;
    }
    const last = this.selectedLetters.pop();
    this.scrambledLetters[last.tileIdx].used = false;
    this.renderAnswerSlots();
    this.renderLetterTiles();
  }

  clearAnswer() {
    // Return all selected letters (not revealed ones)
    this.selectedLetters.forEach(item => {
      this.scrambledLetters[item.tileIdx].used = false;
    });
    this.selectedLetters = [];
    this.renderAnswerSlots();
    this.renderLetterTiles();
  }

  buildAnswerString() {
    const entry = this.words[this.wordIndex];
    let result = '';
    let selIdx = 0;
    for (let i = 0; i < entry.word.length; i++) {
      if (i < this.revealedCount) {
        result += entry.word[i];
      } else {
        result += this.selectedLetters[selIdx] ? this.selectedLetters[selIdx++].ch : '';
      }
    }
    return result;
  }

  checkAnswer() {
    const entry = this.words[this.wordIndex];
    const answer = this.buildAnswerString();
    const isCorrect = answer === entry.word;

    // Disable all tiles
    document.querySelectorAll('.letter-tile').forEach(t => (t.disabled = true));
    document.getElementById('btn-hint').disabled = true;

    const fb = document.getElementById('word-feedback');
    const slots = document.getElementById('answer-slots');

    if (isCorrect) {
      const pointsEarned = Math.max(1, entry.word.length - this.hintsUsed * HINT_COST);
      this.score += pointsEarned;
      fb.textContent = `✓ Correct! +${pointsEarned} point${pointsEarned !== 1 ? 's' : ''}`;
      fb.className = 'word-feedback correct';
      slots.querySelectorAll('.answer-slot').forEach(s => s.classList.add('correct'));
    } else {
      fb.textContent = `✗ The word was: ${entry.word}`;
      fb.className = 'word-feedback wrong';
      slots.querySelectorAll('.answer-slot').forEach(s => s.classList.add('wrong'));
    }

    document.getElementById('word-score').textContent = `Score: ${this.score}`;

    setTimeout(() => {
      if (this.wordIndex < WORDS_PER_ROUND - 1) {
        this.wordIndex++;
        this.hintsUsed = 0;
        this.renderWord();
      } else {
        this.showResults();
      }
    }, 1400);
  }

  useHint() {
    const entry = this.words[this.wordIndex];
    if (this.revealedCount >= entry.word.length) {
      return;
    }

    // Reveal next letter by showing hint text first time, then reveal next letter
    const hintEl = document.getElementById('word-hint');
    if (hintEl.style.display === 'none') {
      hintEl.textContent = `💡 ${entry.hint}`;
      hintEl.style.display = 'block';
    }

    // Reveal one more letter in the answer slots
    const nextReveal = this.revealedCount;
    if (nextReveal < entry.word.length) {
      // Remove the corresponding letter from selected and scrambled tiles if it's there
      const correctLetter = entry.word[nextReveal];

      // Find and remove the tile with this letter from selected (if placed wrong spot)
      // Actually, we just reveal from beginning — clear selections and reveal from front
      this.selectedLetters.forEach(item => {
        this.scrambledLetters[item.tileIdx].used = false;
      });
      this.selectedLetters = [];
      this.revealedCount++;
      this.hintsUsed++;

      // Remove the revealed letter from scrambled tiles pool
      const tileIdx = this.scrambledLetters.findIndex(t => !t.used && t.ch === correctLetter);
      if (tileIdx !== -1) {
        this.scrambledLetters[tileIdx].used = true;
      }

      this.renderAnswerSlots();
      this.renderLetterTiles();

      if (this.revealedCount === entry.word.length) {
        // All letters revealed — auto-complete
        this.checkAnswer();
      }
    }
  }

  skipWord() {
    const entry = this.words[this.wordIndex];
    const fb = document.getElementById('word-feedback');
    fb.textContent = `Skipped — the word was: ${entry.word}`;
    fb.className = 'word-feedback wrong';

    document.querySelectorAll('.letter-tile').forEach(t => (t.disabled = true));
    document.getElementById('btn-hint').disabled = true;

    setTimeout(() => {
      if (this.wordIndex < WORDS_PER_ROUND - 1) {
        this.wordIndex++;
        this.hintsUsed = 0;
        this.renderWord();
      } else {
        this.showResults();
      }
    }, 1200);
  }

  showResults() {
    const maxScore = WORDS_PER_ROUND * 7;
    const pct = Math.round((this.score / maxScore) * 100);
    const set = WORD_SETS[this.setKey];

    let trophy = '📚';
    let message = '';
    if (this.score >= maxScore * 0.85) {
      trophy = '🏆';
      message = "Amazing! You're a word wizard!";
    } else if (this.score >= maxScore * 0.6) {
      trophy = '⭐';
      message = 'Great work! Keep practising!';
    } else if (this.score >= maxScore * 0.3) {
      trophy = '👍';
      message = 'Good effort! Try again to improve!';
    } else {
      message = "Keep practising — you'll get better!";
    }

    document.getElementById('result-trophy').textContent = trophy;
    document.getElementById('result-score').textContent = this.score;
    document.getElementById('result-max').textContent = maxScore;
    document.getElementById('result-pct').textContent = `${pct}%`;
    document.getElementById('result-set').textContent = `${set.emoji} ${set.label}`;
    document.getElementById('result-message').textContent = message;

    document.getElementById('nav-meta').textContent = '';
    this.showScreen('results');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new WordScrambleGame();
});

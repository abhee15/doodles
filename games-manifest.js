/**
 * Doodles Games Manifest
 *
 * Central registry for all games, categories, and metadata.
 * Loaded globally as window.CATEGORIES and window.GAMES
 * Used by portal.js for rendering game cards and navigation
 */

// eslint-disable-next-line no-unused-vars
const CATEGORIES = [
  { id: 'math', label: 'Math & Numbers', color: '#BF360C', footerHeading: 'Math & Numbers' },
  {
    id: 'memory',
    label: 'Memory & Learning',
    color: '#8B5CF6',
    footerHeading: 'Memory & Learning'
  },
  { id: 'geo', label: 'Geography', color: '#0277BD', footerHeading: 'Geography' },
  { id: 'words', label: 'Words & Language', color: '#6A1B9A', footerHeading: 'Words' },
  { id: 'science', label: 'Science & Nature', color: '#2E7D32', footerHeading: 'Science & Memory' },
  { id: 'art', label: 'Art & Creativity', color: '#EC4899', footerHeading: 'Art & Creativity' },
  {
    id: 'logic',
    label: 'Logic & Puzzles',
    color: '#6D28D9',
    footerHeading: 'Logic & Puzzles',
    icon: 'ti-puzzle'
  }
];

// eslint-disable-next-line no-unused-vars
const GAMES = [
  {
    id: 'math-ladder',
    name: 'Math Ladder',
    category: 'math',
    desc: 'Climb rung by rung by solving addition & subtraction problems against the clock.',
    icon: 'ti-stairs',
    iconColor: null,
    gradient: 'linear-gradient(150deg, #FF7043 0%, #BF360C 100%)',
    pattern:
      'repeating-linear-gradient(-55deg, transparent, transparent 6px, rgba(255,255,255,.06) 6px, rgba(255,255,255,.06) 12px)',
    patternSize: null,
    patternPosition: null,
    newUntil: null,
    footerName: 'Math Ladder'
  },
  {
    id: 'number-ninja',
    name: 'Number Ninja',
    thumbClass: 'ninja',
    category: 'math',
    desc: 'Tap falling numbers in the right sequence before they hit the ground!',
    icon: 'ti-target',
    iconColor: null,
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #D24545 100%)',
    pattern:
      'radial-gradient(circle, rgba(255,255,255,.15) 2px, transparent 2px) 50% 50% / 30px 30px, radial-gradient(circle, rgba(255,255,255,.08) 4px, transparent 4px) 50% 50% / 60px 60px, radial-gradient(circle, rgba(255,255,255,.05) 6px, transparent 6px) 50% 50% / 90px 90px',
    patternSize: null,
    patternPosition: null,
    newUntil: null,
    footerName: 'Number Ninja'
  },
  {
    id: 'quick-math',
    name: 'Quick Math',
    thumbClass: 'quickmath',
    category: 'math',
    desc: 'Master fast mental math tricks — add, subtract, and multiply at lightning speed.',
    icon: 'ti-bolt',
    iconColor: null,
    gradient: 'linear-gradient(150deg, #1CB0F6 0%, #0891B2 100%)',
    pattern:
      'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 10deg, rgba(255,255,255,.04) 10deg, rgba(255,255,255,.04) 11deg)',
    patternSize: null,
    patternPosition: null,
    newUntil: null,
    footerName: 'Quick Math'
  },
  {
    id: 'measure-master',
    name: 'Measure Master',
    thumbClass: 'measure',
    category: 'math',
    desc: 'Explore inches, feet, meters, km — with origin stories, conversions & real-world puzzles.',
    icon: 'ti-ruler-2',
    iconColor: null,
    gradient: 'linear-gradient(140deg, #A44A3F 0%, #6D1F1F 100%)',
    pattern:
      'repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0px, rgba(255,255,255,.12) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0px, rgba(255,255,255,.06) 1px, transparent 1px, transparent 5px)',
    patternSize: null,
    patternPosition: null,
    newUntil: '2026-04-01',
    footerName: 'Measure Master'
  },
  {
    id: 'body-map',
    name: 'Body Map',
    thumbClass: null,
    category: 'memory',
    desc: 'Learn all 47 US Presidents using your body as a memory map — toes to head!',
    icon: 'ti-user',
    iconColor: '#F5C518',
    gradient: 'linear-gradient(135deg,#1E1060,#4A1090)',
    pattern: null,
    patternSize: null,
    patternPosition: null,
    newUntil: '2026-04-01',
    footerName: 'Body Map'
  },
  {
    id: 'periodic-table',
    name: 'Periodic Table Master',
    thumbClass: 'periodic',
    category: 'science',
    desc: 'Learn chemistry with 5 memory techniques! Master elements through Story Chain, Memory Palace, Body Map, and more.',
    icon: 'ti-flask-2',
    iconColor: null,
    gradient: 'linear-gradient(145deg, #7C3AED 0%, #5B21B6 100%)',
    pattern: null,
    patternSize: null,
    patternPosition: null,
    newUntil: '2026-04-01',
    footerName: 'Periodic Table Master'
  },
  {
    id: 'world-explorer',
    name: 'World Explorer',
    thumbClass: 'world',
    category: 'geo',
    desc: 'Discover countries, capitals, flags, and amazing facts about every corner of Earth.',
    icon: 'ti-world',
    iconColor: null,
    gradient: 'linear-gradient(145deg, #1E88E5 0%, #0D47A1 100%)',
    pattern:
      'repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0px, rgba(255,255,255,.07) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0px, rgba(255,255,255,.07) 1px, transparent 1px, transparent 20px)',
    patternSize: null,
    patternPosition: null,
    newUntil: null,
    footerName: 'World Explorer'
  },
  {
    id: 'earth-explorer',
    name: 'Earth Explorer',
    thumbClass: 'earth',
    category: 'geo',
    desc: 'Click on the world map to find and name every continent and ocean!',
    icon: 'ti-map',
    iconColor: null,
    gradient: 'linear-gradient(140deg, #00ACC1 0%, #006064 100%)',
    pattern:
      'repeating-linear-gradient(30deg, transparent, transparent 8px, rgba(255,255,255,.06) 8px, rgba(255,255,255,.06) 16px)',
    patternSize: null,
    patternPosition: null,
    newUntil: null,
    footerName: 'Earth Explorer'
  },
  {
    id: 'word-explorer',
    name: 'Word Explorer',
    thumbClass: 'word',
    category: 'words',
    desc: 'Build a powerful vocabulary — learn new words with definitions, examples, and quizzes.',
    icon: 'ti-book-2',
    iconColor: null,
    gradient: 'linear-gradient(145deg, #AB47BC 0%, #4527A0 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,.15) 1px, transparent 1px)',
    patternSize: '20px 20px',
    patternPosition: null,
    newUntil: null,
    footerName: 'Word Explorer'
  },
  {
    id: 'solar-system',
    name: 'Planet Quest',
    thumbClass: 'solar',
    category: 'science',
    desc: 'Explore the solar system — click planets to learn facts, then ace the quiz across 6 levels!',
    icon: 'ti-sun',
    iconColor: '#FDD835',
    gradient: 'linear-gradient(145deg, #0B0E2D 0%, #1a1060 55%, #0D2060 100%)',
    pattern:
      'radial-gradient(circle, rgba(255,255,255,.9) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,.6) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,.3) 1px, transparent 1px)',
    patternSize: '50px 50px, 30px 30px, 20px 20px',
    patternPosition: '0 0, 10px 15px, 25px 5px',
    newUntil: '2026-04-01',
    footerName: 'Planet Quest'
  },
  {
    id: 'dino-hunter',
    name: 'Dino Hunter',
    thumbClass: 'dino',
    category: 'science',
    desc: 'Hunt your target dino — miss and learn incredible facts about the one you hit!',
    icon: 'ti-skull',
    iconColor: null,
    gradient: 'linear-gradient(145deg, #43A047 0%, #1B5E20 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,.15) 2px, transparent 2px)',
    patternSize: '28px 28px',
    patternPosition: null,
    newUntil: null,
    footerName: 'Dino Hunter'
  },
  {
    id: 'draw-it',
    name: 'Draw It',
    thumbClass: 'draw-it',
    category: 'art',
    desc: 'Follow step-by-step guides to draw animals, vehicles, characters, and more!',
    icon: 'ti-palette',
    iconColor: null,
    gradient: 'linear-gradient(145deg, #F472B6 0%, #818CF8 100%)',
    pattern: null,
    patternSize: null,
    patternPosition: null,
    newUntil: '2026-04-01',
    footerName: 'Draw It'
  },
  {
    id: 'brain-spark',
    name: 'Brain Spark',
    thumbClass: 'brain-spark',
    category: 'logic',
    desc: 'Train your brain with number patterns, logic riddles, odd-one-out puzzles, and math tricks!',
    icon: 'ti-brain',
    iconColor: '#fbbf24',
    gradient: 'linear-gradient(145deg, #1a0a2e 0%, #2d1b69 100%)',
    pattern: 'radial-gradient(circle, rgba(251,191,36,.3) 1px, transparent 1px)',
    patternSize: '24px 24px',
    patternPosition: '0 0',
    newUntil: '2026-08-01',
    footerName: 'Brain Spark'
  }
];

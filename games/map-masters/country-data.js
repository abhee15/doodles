/* eslint-disable no-undef */
/* ═══════════════════════════════════════════════════
   CHAPTERS - 22 regional learning batches
═══════════════════════════════════════════════════ */
const CHAPTERS = [
  // Europe (5 chapters, ~44 countries)
  {
    id: 'eu-1',
    continent: 'europe',
    label: 'Europe — Part 1',
    range: 'Western Europe',
    start: 0,
    count: 10
  },
  {
    id: 'eu-2',
    continent: 'europe',
    label: 'Europe — Part 2',
    range: 'Southern Europe',
    start: 10,
    count: 9
  },
  {
    id: 'eu-3',
    continent: 'europe',
    label: 'Europe — Part 3',
    range: 'Central Europe',
    start: 19,
    count: 10
  },
  {
    id: 'eu-4',
    continent: 'europe',
    label: 'Europe — Part 4',
    range: 'Eastern Europe',
    start: 29,
    count: 9
  },
  {
    id: 'eu-5',
    continent: 'europe',
    label: 'Europe — Part 5',
    range: 'Nordic & Caucasus',
    start: 38,
    count: 6
  },

  // Africa (6 chapters, ~54 countries)
  {
    id: 'af-1',
    continent: 'africa',
    label: 'Africa — Part 1',
    range: 'North Africa',
    start: 44,
    count: 9
  },
  {
    id: 'af-2',
    continent: 'africa',
    label: 'Africa — Part 2',
    range: 'West Africa',
    start: 53,
    count: 10
  },
  {
    id: 'af-3',
    continent: 'africa',
    label: 'Africa — Part 3',
    range: 'Central Africa',
    start: 63,
    count: 9
  },
  {
    id: 'af-4',
    continent: 'africa',
    label: 'Africa — Part 4',
    range: 'East Africa',
    start: 72,
    count: 10
  },
  {
    id: 'af-5',
    continent: 'africa',
    label: 'Africa — Part 5',
    range: 'Southern Africa',
    start: 82,
    count: 10
  },
  {
    id: 'af-6',
    continent: 'africa',
    label: 'Africa — Part 6',
    range: 'Island Nations',
    start: 92,
    count: 6
  },

  // Asia (5 chapters, ~48 countries)
  {
    id: 'as-1',
    continent: 'asia',
    label: 'Asia — Part 1',
    range: 'Southeast Asia',
    start: 98,
    count: 10
  },
  {
    id: 'as-2',
    continent: 'asia',
    label: 'Asia — Part 2',
    range: 'South Asia',
    start: 108,
    count: 8
  },
  {
    id: 'as-3',
    continent: 'asia',
    label: 'Asia — Part 3',
    range: 'East Asia',
    start: 116,
    count: 8
  },
  {
    id: 'as-4',
    continent: 'asia',
    label: 'Asia — Part 4',
    range: 'Middle East',
    start: 124,
    count: 12
  },
  {
    id: 'as-5',
    continent: 'asia',
    label: 'Asia — Part 5',
    range: 'Central Asia & Caucasus',
    start: 136,
    count: 10
  },

  // Americas (3 chapters, ~35 countries)
  {
    id: 'am-1',
    continent: 'americas',
    label: 'North America',
    range: 'Canada, USA, Mexico',
    start: 146,
    count: 3
  },
  {
    id: 'am-2',
    continent: 'americas',
    label: 'Central America & Caribbean',
    range: 'Central & Caribbean',
    start: 149,
    count: 20
  },
  {
    id: 'am-3',
    continent: 'americas',
    label: 'South America',
    range: 'South America',
    start: 169,
    count: 12
  },

  // Oceania (2 chapters, ~14 countries)
  {
    id: 'oc-1',
    continent: 'oceania',
    label: 'Oceania — Part 1',
    range: 'Australia & NZ',
    start: 181,
    count: 2
  },
  {
    id: 'oc-2',
    continent: 'oceania',
    label: 'Oceania — Part 2',
    range: 'Pacific Islands',
    start: 183,
    count: 12
  }
];

/* ═══════════════════════════════════════════════════
   COUNTRIES - All 195+ countries with tips
═══════════════════════════════════════════════════ */
const COUNTRIES = [
  // ═══════════════════════════════════════════
  // EUROPE - Part 1 (Western Europe)
  // ═══════════════════════════════════════════
  {
    id: 'france',
    name: 'France',
    isoNum: '250',
    flag: '🇫🇷',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'France is shaped like a HEXAGON! The French even call their country "L\'Hexagone" 🔷 Six sides, six neighbors!',
    tipEmoji: '🔷'
  },
  {
    id: 'spain',
    name: 'Spain',
    isoNum: '724',
    flag: '🇪🇸',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Spain looks like a big OX HIDE stretched out flat. Olé! 🐂 Remember: toro matador = ox shape!',
    tipEmoji: '🐂'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    isoNum: '620',
    flag: '🇵🇹',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Portugal is a long RECTANGLE hanging off the west side of Spain — like a bookmark! 📖',
    tipEmoji: '📖'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    isoNum: '826',
    flag: '🇬🇧',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'UK looks like a TEAPOT with Scotland as the handle! Perfect for tea time! ☕',
    tipEmoji: '☕'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    isoNum: '372',
    flag: '🇮🇪',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Ireland looks like a POTATO — bumpy, round-ish, and sitting in the Atlantic stew! 🥔',
    tipEmoji: '🥔'
  },
  {
    id: 'belgium',
    name: 'Belgium',
    isoNum: '056',
    flag: '🇧🇪',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Belgium is a tiny RECTANGLE squished between France and Germany — like a bookmark! 📚',
    tipEmoji: '📚'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    isoNum: '528',
    flag: '🇳🇱',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Netherlands looks like a BOOT kicking up — windmills and tulips everywhere! 🌷',
    tipEmoji: '🌷'
  },
  {
    id: 'germany',
    name: 'Germany',
    isoNum: '276',
    flag: '🇩🇪',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Germany looks like a WARRIOR WITH A HELMET pointing down. Sturdy and strong! ⚔️',
    tipEmoji: '⚔️'
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg',
    isoNum: '442',
    flag: '🇱🇺',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Luxembourg is TEENY TINY — smaller than a US state! A little SQUARE gem! 💎',
    tipEmoji: '💎'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    isoNum: '756',
    flag: '🇨🇭',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Switzerland is a CRINKLED BALL OF MOUNTAIN ROCK — chocolate, watches, and peaks! 🏔️',
    tipEmoji: '🏔️'
  },

  // ═══════════════════════════════════════════
  // EUROPE - Part 2 (Southern Europe)
  // ═══════════════════════════════════════════
  {
    id: 'italy',
    name: 'Italy',
    isoNum: '380',
    flag: '🇮🇹',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Italy is a BOOT kicking a ball (Sicily)! Perfect for the football-mad Italians! ⚽',
    tipEmoji: '👢'
  },
  {
    id: 'greece',
    name: 'Greece',
    isoNum: '300',
    flag: '🇬🇷',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Greece looks like a HAND reaching into the sea with lots of FINGERS (islands)! 🤚',
    tipEmoji: '🤚'
  },
  {
    id: 'croatia',
    name: 'Croatia',
    isoNum: '191',
    flag: '🇭🇷',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Croatia is a COMMA-shaped coast with tons of islands — beautiful and twisty! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'malta',
    name: 'Malta',
    isoNum: '470',
    flag: '🇲🇹',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Malta is a TINY TRIANGLE island in the Mediterranean — smaller than a postage stamp! ✉️',
    tipEmoji: '✉️'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    isoNum: '196',
    flag: '🇨🇾',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Cyprus is a TEARDROP island in the Mediterranean — hot, sunny, and beautiful! ☀️',
    tipEmoji: '☀️'
  },
  {
    id: 'albania',
    name: 'Albania',
    isoNum: '008',
    flag: '🇦🇱',
    continent: 'europe',
    chapter: 'eu-2',
    tip: "Albania looks like an EAGLE'S HEAD — it's literally on their flag! 🦅",
    tipEmoji: '🦅'
  },
  {
    id: 'montenegro',
    name: 'Montenegro',
    isoNum: '499',
    flag: '🇲🇪',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Montenegro is a CRESCENT-shaped coast with mountains — "Black Mountain" vibes! ⛰️',
    tipEmoji: '⛰️'
  },
  {
    id: 'north-macedonia',
    name: 'North Macedonia',
    isoNum: '807',
    flag: '🇲🇰',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'North Macedonia is a ROUGH SQUARE in the Balkans — landlocked mountain heart! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'kosovo',
    name: 'Kosovo',
    isoNum: '926',
    flag: '🇽🇰',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Kosovo is a TINY SQUARE tucked into the Balkans — the youngest European nation! 👶',
    tipEmoji: '👶'
  },

  // ═══════════════════════════════════════════
  // EUROPE - Part 3 (Central Europe)
  // ═══════════════════════════════════════════
  {
    id: 'austria',
    name: 'Austria',
    isoNum: '040',
    flag: '🇦🇹',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Austria is a RECTANGLE with mountains — The Sound of Music land! 🎵',
    tipEmoji: '🎵'
  },
  {
    id: 'czechia',
    name: 'Czechia',
    isoNum: '203',
    flag: '🇨🇿',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Czechia looks like a BUMPY BLOB — beer, castles, and Prague magic! 🍺',
    tipEmoji: '🍺'
  },
  {
    id: 'slovakia',
    name: 'Slovakia',
    isoNum: '703',
    flag: '🇸🇰',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Slovakia is an IRREGULAR BLOB east of Czechia — mountains and castles! 🏰',
    tipEmoji: '🏰'
  },
  {
    id: 'hungary',
    name: 'Hungary',
    isoNum: '348',
    flag: '🇭🇺',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Hungary is a KIDNEY-BEAN shape — thermal baths and paprika everywhere! 🌶️',
    tipEmoji: '🌶️'
  },
  {
    id: 'romania',
    name: 'Romania',
    isoNum: '642',
    flag: '🇷🇴',
    continent: 'europe',
    chapter: 'eu-3',
    tip: "Romania looks like a FISH HEAD or CHICKEN HEAD facing east — Dracula's home! 🧛",
    tipEmoji: '🧛'
  },
  {
    id: 'serbia',
    name: 'Serbia',
    isoNum: '688',
    flag: '🇷🇸',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Serbia is a RAGGED BLOB in the Balkans — landlocked mountain vibes! ⛰️',
    tipEmoji: '⛰️'
  },
  {
    id: 'bosnia',
    name: 'Bosnia and Herzegovina',
    isoNum: '070',
    flag: '🇧🇦',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Bosnia is a CRESCENT-SHAPED coastline with mountains — stunning nature! 🏞️',
    tipEmoji: '🏞️'
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
    isoNum: '100',
    flag: '🇧🇬',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Bulgaria is a TRAPEZOID on the Black Sea — roses and yogurt! 🌹',
    tipEmoji: '🌹'
  },
  {
    id: 'moldova',
    name: 'Moldova',
    isoNum: '498',
    flag: '🇲🇩',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Moldova is a THIN RECTANGLE between Romania and Ukraine — wine country! 🍷',
    tipEmoji: '🍷'
  },
  {
    id: 'slovenia',
    name: 'Slovenia',
    isoNum: '705',
    flag: '🇸🇮',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Slovenia is a TINY TRIANGLE with mountains and coasts — hidden Alpine gem! ⛰️',
    tipEmoji: '⛰️'
  },

  // ═══════════════════════════════════════════
  // EUROPE - Part 4 (Eastern Europe)
  // ═══════════════════════════════════════════
  {
    id: 'ukraine',
    name: 'Ukraine',
    isoNum: '804',
    flag: '🇺🇦',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Ukraine is like a SHIELD or HEART shape — wheat fields and sunflowers! 🌻',
    tipEmoji: '🌻'
  },
  {
    id: 'belarus',
    name: 'Belarus',
    isoNum: '112',
    flag: '🇧🇾',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Belarus is a RECTANGLE — landlocked plains and forests! 🌲',
    tipEmoji: '🌲'
  },
  {
    id: 'poland',
    name: 'Poland',
    isoNum: '616',
    flag: '🇵🇱',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Poland is a JAGGED BLOB facing the Baltic Sea — resilient and historic! 🏛️',
    tipEmoji: '🏛️'
  },
  {
    id: 'lithuania',
    name: 'Lithuania',
    isoNum: '440',
    flag: '🇱🇹',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Lithuania is a TALL RECTANGLE on the Baltic — amber coast! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'latvia',
    name: 'Latvia',
    isoNum: '428',
    flag: '🇱🇻',
    continent: 'europe',
    chapter: 'eu-4',
    tip: "Latvia is a RECTANGLE with a bumpy coast — Riga's castles! 🏰",
    tipEmoji: '🏰'
  },
  {
    id: 'estonia',
    name: 'Estonia',
    isoNum: '233',
    flag: '🇪🇪',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Estonia is a THIN RECTANGLE on the Baltic — digital pioneer! 💻',
    tipEmoji: '💻'
  },
  {
    id: 'georgia',
    name: 'Georgia',
    isoNum: '268',
    flag: '🇬🇪',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Georgia looks like an EAGLE FLYING — mountains and wine! 🦅',
    tipEmoji: '🦅'
  },
  {
    id: 'armenia',
    name: 'Armenia',
    isoNum: '051',
    flag: '🇦🇲',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Armenia is a TINY RECTANGLE in the Caucasus — ancient Christian nation! ⛪',
    tipEmoji: '⛪'
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
    isoNum: '031',
    flag: '🇦🇿',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Azerbaijan looks like a HAND REACHING east — oil and fire mountains! 🔥',
    tipEmoji: '🔥'
  },

  // ═══════════════════════════════════════════
  // EUROPE - Part 5 (Nordic & Russia partial)
  // ═══════════════════════════════════════════
  {
    id: 'sweden',
    name: 'Sweden',
    isoNum: '752',
    flag: '🇸🇪',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'Sweden is TALL and THIN like a matchstick — IKEA and meatballs! 🪑',
    tipEmoji: '🪑'
  },
  {
    id: 'norway',
    name: 'Norway',
    isoNum: '578',
    flag: '🇳🇴',
    continent: 'europe',
    chapter: 'eu-5',
    tip: "Norway looks like a WIZARD'S STAFF with a pointy top — fjords galore! 🪄",
    tipEmoji: '🪄'
  },
  {
    id: 'finland',
    name: 'Finland',
    isoNum: '246',
    flag: '🇫🇮',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'Finland looks like a MITTEN — thousands of lakes and reindeer! 🦌',
    tipEmoji: '🦌'
  },
  {
    id: 'denmark',
    name: 'Denmark',
    isoNum: '208',
    flag: '🇩🇰',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'Denmark is a TINY PENINSULA with big vibes — hygge and Lego! 🧱',
    tipEmoji: '🧱'
  },
  {
    id: 'iceland',
    name: 'Iceland',
    isoNum: '352',
    flag: '🇮🇸',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'Iceland is a VOLCANIC TRIANGLE in the Arctic — ice, fire, and geysers! 🌋',
    tipEmoji: '🌋'
  },
  {
    id: 'russia-europe',
    name: 'Russia (European part)',
    isoNum: '643',
    flag: '🇷🇺',
    continent: 'europe',
    chapter: 'eu-5',
    tip: "Russia is the WORLD'S LARGEST COUNTRY — spans 11 time zones! 🕐",
    tipEmoji: '🕐'
  },

  // ═══════════════════════════════════════════
  // AFRICA - Part 1 (North Africa)
  // ═══════════════════════════════════════════
  {
    id: 'morocco',
    name: 'Morocco',
    isoNum: '504',
    flag: '🇲🇦',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Morocco looks like a CRESCENT MOON on the edge of Africa — Atlas Mountains! 🌙',
    tipEmoji: '🌙'
  },
  {
    id: 'algeria',
    name: 'Algeria',
    isoNum: '012',
    flag: '🇩🇿',
    continent: 'africa',
    chapter: 'af-1',
    tip: "Algeria is MASSIVE — 2nd largest country in Africa! It's mostly DESERT! 🏜️",
    tipEmoji: '🏜️'
  },
  {
    id: 'tunisia',
    name: 'Tunisia',
    isoNum: '788',
    flag: '🇹🇳',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Tunisia looks like a THUMB sticking out into the Mediterranean! 👍',
    tipEmoji: '👍'
  },
  {
    id: 'libya',
    name: 'Libya',
    isoNum: '434',
    flag: '🇱🇾',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Libya is mostly DESERT with a Mediterranean coast — Sahara! 🏜️',
    tipEmoji: '🏜️'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    isoNum: '818',
    flag: '🇪🇬',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Egypt wraps around the Nile River like a RIBBON — ancient pyramids! 🔺',
    tipEmoji: '🔺'
  },
  {
    id: 'sudan',
    name: 'Sudan',
    isoNum: '729',
    flag: '🇸🇩',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Sudan is a HUGE RECTANGLE with pyramids — the Nile flows through! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'south-sudan',
    name: 'South Sudan',
    isoNum: '728',
    flag: '🇸🇸',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'South Sudan is BRAND NEW (2011) — youngest African nation! 👶',
    tipEmoji: '👶'
  },
  {
    id: 'eritrea',
    name: 'Eritrea',
    isoNum: '232',
    flag: '🇪🇷',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Eritrea is a THIN STRIP on the Red Sea — ancient trade routes! 🚢',
    tipEmoji: '🚢'
  },
  {
    id: 'western-sahara',
    name: 'Western Sahara',
    isoNum: '732',
    flag: '🇪🇭',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Western Sahara is a DISPUTED TERRITORY — mostly desert, complex politics! 🏜️',
    tipEmoji: '🏜️'
  },

  // ═══════════════════════════════════════════
  // AFRICA - Part 2 (West Africa)
  // ═══════════════════════════════════════════
  {
    id: 'mauritania',
    name: 'Mauritania',
    isoNum: '478',
    flag: '🇲🇷',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Mauritania is a huge RECTANGLE of Sahara Desert — Iron mines! ⛏️',
    tipEmoji: '⛏️'
  },
  {
    id: 'senegal',
    name: 'Senegal',
    isoNum: '686',
    flag: '🇸🇳',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Senegal looks like a FINGER pointing west into the Atlantic! 👉',
    tipEmoji: '👉'
  },
  {
    id: 'guinea-bissau',
    name: 'Guinea-Bissau',
    isoNum: '624',
    flag: '🇬🇼',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Guinea-Bissau has a BUMPY COAST with lots of islands! 🏝️',
    tipEmoji: '🏝️'
  },
  {
    id: 'guinea',
    name: 'Guinea',
    isoNum: '324',
    flag: '🇬🇳',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Guinea looks like a CRESCENT along the coast — mountains and rivers! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'mali',
    name: 'Mali',
    isoNum: '418',
    flag: '🇲🇱',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Mali is a HUGE RECTANGLE of Sahara and Sahel — ancient gold trade! 👑',
    tipEmoji: '👑'
  },
  {
    id: 'sierra-leone',
    name: 'Sierra Leone',
    isoNum: '694',
    flag: '🇸🇱',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Sierra Leone looks like a LION\'S HEAD profile — "Lion Mountains"! 🦁',
    tipEmoji: '🦁'
  },
  {
    id: 'liberia',
    name: 'Liberia',
    isoNum: '430',
    flag: '🇱🇷',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Liberia looks like a THUMBPRINT — founded by freed American slaves! 🇺🇸',
    tipEmoji: '🇺🇸'
  },
  {
    id: 'cote-divoire',
    name: "Côte d'Ivoire",
    isoNum: '384',
    flag: '🇨🇮',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Côte d\'Ivoire ("Ivory Coast") has a LUMPY COAST — cocoa capital! 🍫',
    tipEmoji: '🍫'
  },
  {
    id: 'ghana',
    name: 'Ghana',
    isoNum: '288',
    flag: '🇬🇭',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Ghana looks like a RECTANGLE — first independent African nation! 🎉',
    tipEmoji: '🎉'
  },
  {
    id: 'togo',
    name: 'Togo',
    isoNum: '768',
    flag: '🇹🇬',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Togo is a THIN VERTICAL STRIP — long and narrow like a ribbon! 🎀',
    tipEmoji: '🎀'
  },

  // ═══════════════════════════════════════════
  // AFRICA - Part 3 (Central Africa)
  // ═══════════════════════════════════════════
  {
    id: 'benin',
    name: 'Benin',
    isoNum: '204',
    flag: '🇧🇯',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Benin is a THIN VERTICAL STRIP — voodoo magic and ancient kingdoms! ✨',
    tipEmoji: '✨'
  },
  {
    id: 'niger',
    name: 'Niger',
    isoNum: '562',
    flag: '🇳🇪',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Niger is a HUGE SQUARE of Sahara — one of hottest places! 🔥',
    tipEmoji: '🔥'
  },
  {
    id: 'burkina-faso',
    name: 'Burkina Faso',
    isoNum: '854',
    flag: '🇧🇫',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Burkina Faso is a LANDLOCKED SQUARE — "land of honest people"! 😊',
    tipEmoji: '😊'
  },
  {
    id: 'chad',
    name: 'Chad',
    isoNum: '148',
    flag: '🇹🇩',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Chad is a SQUARE of Sahara and Sahel — Lake Chad in the northeast! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'cameroon',
    name: 'Cameroon',
    isoNum: '120',
    flag: '🇨🇲',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Cameroon looks like a BOOT or HAMMER — Africa in miniature! 🌍',
    tipEmoji: '🌍'
  },
  {
    id: 'central-african-republic',
    name: 'Central African Republic',
    isoNum: '140',
    flag: '🇨🇫',
    continent: 'africa',
    chapter: 'af-3',
    tip: "CAR is a LANDLOCKED SQUARE — right in Africa's heart! ❤️",
    tipEmoji: '❤️'
  },
  {
    id: 'congo',
    name: 'Republic of the Congo',
    isoNum: '178',
    flag: '🇨🇬',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Congo is a SKINNY RECTANGLE with rainforests — river travel! 🚣',
    tipEmoji: '🚣'
  },
  {
    id: 'gabon',
    name: 'Gabon',
    isoNum: '266',
    flag: '🇬🇦',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Gabon is a RECTANGLE on the coast — rainforests and oil! 🛢️',
    tipEmoji: '🛢️'
  },
  {
    id: 'equatorial-guinea',
    name: 'Equatorial Guinea',
    isoNum: '226',
    flag: '🇬🇶',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Equatorial Guinea has mainland + islands — small but strategic! 🏝️',
    tipEmoji: '🏝️'
  },

  // ═══════════════════════════════════════════
  // AFRICA - Part 4 (East Africa)
  // ═══════════════════════════════════════════
  {
    id: 'drc',
    name: 'Democratic Republic of the Congo',
    isoNum: '180',
    flag: '🇨🇩',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'DRC is MASSIVE and RAGGED — 2nd largest African country! 🌳',
    tipEmoji: '🌳'
  },
  {
    id: 'uganda',
    name: 'Uganda',
    isoNum: '800',
    flag: '🇺🇬',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Uganda is a BUMPY RECTANGLE — Pearl of Africa! 💎',
    tipEmoji: '💎'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    isoNum: '404',
    flag: '🇰🇪',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Kenya looks like a CLAW or FOOT — safari and Mount Kenya! 🦁',
    tipEmoji: '🦁'
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    isoNum: '834',
    flag: '🇹🇿',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Tanzania is a HUGE WEDGE — Mount Kilimanjaro and Zanzibar! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    isoNum: '231',
    flag: '🇪🇹',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Ethiopia looks like a CHICKEN HEAD — oldest African nation (never colonized)! 🐔',
    tipEmoji: '🐔'
  },
  {
    id: 'somalia',
    name: 'Somalia',
    isoNum: '706',
    flag: '🇸🇴',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Somalia looks like a GIANT HORN sticking out — the Horn of Africa! 🎺',
    tipEmoji: '🎺'
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    isoNum: '646',
    flag: '🇷🇼',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Rwanda is a tiny SQUARE with mountains — land of a thousand hills! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'burundi',
    name: 'Burundi',
    isoNum: '108',
    flag: '🇧🇮',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Burundi is a TINY HEART-SHAPED country — Lake Tanganyika! 💚',
    tipEmoji: '💚'
  },
  {
    id: 'south-sudan-east',
    name: 'South Sudan (East)',
    isoNum: '728',
    flag: '🇸🇸',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'South Sudan extends into this region — Nile swamps! 🌾',
    tipEmoji: '🌾'
  },
  {
    id: 'malawi',
    name: 'Malawi',
    isoNum: '454',
    flag: '🇲🇼',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Malawi is THIN and TALL around Lake Malawi — "warm heart of Africa"! ❤️',
    tipEmoji: '❤️'
  },

  // ═══════════════════════════════════════════
  // AFRICA - Part 5 (Southern Africa)
  // ═══════════════════════════════════════════
  {
    id: 'zambia',
    name: 'Zambia',
    isoNum: '894',
    flag: '🇿🇲',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Zambia is a RECTANGLE — Victoria Falls! 💧',
    tipEmoji: '💧'
  },
  {
    id: 'zimbabwe',
    name: 'Zimbabwe',
    isoNum: '716',
    flag: '🇿🇼',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Zimbabwe is a SQUARE — Great Zimbabwe ruins! 🏛️',
    tipEmoji: '🏛️'
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
    isoNum: '508',
    flag: '🇲🇿',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Mozambique is a TALL THIN RECTANGLE along the coast! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    isoNum: '710',
    flag: '🇿🇦',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'South Africa is a BULKY RECTANGLE — Table Mountain and safaris! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'botswana',
    name: 'Botswana',
    isoNum: '072',
    flag: '🇧🇼',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Botswana is a SQUARE with the Kalahari Desert — elephant herds! 🐘',
    tipEmoji: '🐘'
  },
  {
    id: 'lesotho',
    name: 'Lesotho',
    isoNum: '426',
    flag: '🇱🇸',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Lesotho is COMPLETELY SURROUNDED BY South Africa — tiny mountain kingdom! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'eswatini',
    name: 'Eswatini',
    isoNum: '748',
    flag: '🇸🇿',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Eswatini is a TINY RECTANGLE (formerly Swaziland)! 👑',
    tipEmoji: '👑'
  },
  {
    id: 'namibia',
    name: 'Namibia',
    isoNum: '566',
    flag: '🇳🇦',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Namibia is a TALL RECTANGLE on the coast — desert dunes! 🏜️',
    tipEmoji: '🏜️'
  },
  {
    id: 'botswana-south',
    name: 'Botswana (South)',
    isoNum: '072',
    flag: '🇧🇼',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Botswana southern region — dry heat and wildlife! 🦁',
    tipEmoji: '🦁'
  },
  {
    id: 'angola',
    name: 'Angola',
    isoNum: '024',
    flag: '🇦🇴',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Angola is a RECTANGLE with great potential — oil and diamonds! 💎',
    tipEmoji: '💎'
  },

  // ═══════════════════════════════════════════
  // AFRICA - Part 6 (Island Nations)
  // ═══════════════════════════════════════════
  {
    id: 'madagascar',
    name: 'Madagascar',
    isoNum: '450',
    flag: '🇲🇬',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Madagascar is a GIANT ISLAND — unique animals found nowhere else! 🐒',
    tipEmoji: '🐒'
  },
  {
    id: 'mauritius',
    name: 'Mauritius',
    isoNum: '480',
    flag: '🇲🇺',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Mauritius is a SMALL ISLAND with a dodo bird legend! 🦤',
    tipEmoji: '🦤'
  },
  {
    id: 'seychelles',
    name: 'Seychelles',
    isoNum: '690',
    flag: '🇸🇨',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Seychelles is a TINY ARCHIPELAGO with paradise beaches! 🏖️',
    tipEmoji: '🏖️'
  },
  {
    id: 'comoros',
    name: 'Comoros',
    isoNum: '174',
    flag: '🇰🇲',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Comoros is a SMALL VOLCANIC ARCHIPELAGO! 🌋',
    tipEmoji: '🌋'
  },
  {
    id: 'cape-verde',
    name: 'Cape Verde',
    isoNum: '132',
    flag: '🇨🇻',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Cape Verde is a TINY ISLAND CHAIN off West Africa! 🏝️',
    tipEmoji: '🏝️'
  },
  {
    id: 'sao-tome',
    name: 'São Tomé and Príncipe',
    isoNum: '678',
    flag: '🇸🇹',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'São Tomé is a TINY ISLAND NATION with chocolate! 🍫',
    tipEmoji: '🍫'
  },

  // ═══════════════════════════════════════════
  // ASIA - Part 1 (Southeast Asia)
  // ═══════════════════════════════════════════
  {
    id: 'indonesia',
    name: 'Indonesia',
    isoNum: '360',
    flag: '🇮🇩',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Indonesia is like 4 LITTLE FISH JUMPING — thousands of islands! 🐟',
    tipEmoji: '🐟'
  },
  {
    id: 'philippines',
    name: 'Philippines',
    isoNum: '608',
    flag: '🇵🇭',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Philippines is a SPRAY OF ISLANDS like water droplets — tropical paradise! 💦',
    tipEmoji: '💦'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    isoNum: '458',
    flag: '🇲🇾',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Malaysia looks like a LION REACHING DOWN — mainland + island part! 🦁',
    tipEmoji: '🦁'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    isoNum: '702',
    flag: '🇸🇬',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Singapore is a TINY DOT — but a mighty city-state! 🌆',
    tipEmoji: '🌆'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    isoNum: '764',
    flag: '🇹🇭',
    continent: 'asia',
    chapter: 'as-1',
    tip: "Thailand looks like an ELEPHANT'S HEAD — temples and elephants! 🐘",
    tipEmoji: '🐘'
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    isoNum: '116',
    flag: '🇰🇭',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Cambodia looks like a LUMPY BLOB — Angkor Wat! 🏛️',
    tipEmoji: '🏛️'
  },
  {
    id: 'laos',
    name: 'Laos',
    isoNum: '418',
    flag: '🇱🇦',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Laos is a THIN RECTANGLE landlocked — Mekong River! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    isoNum: '704',
    flag: '🇻🇳',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Vietnam is an S-SHAPED CURVE along the coast — long and beautiful! ⛩️',
    tipEmoji: '⛩️'
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
    isoNum: '104',
    flag: '🇲🇲',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Myanmar is an IRREGULAR TEARDROP — pagodas and valleys! 🏯',
    tipEmoji: '🏯'
  },
  {
    id: 'brunei',
    name: 'Brunei',
    isoNum: '096',
    flag: '🇧🇳',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Brunei is a TINY SLIVER on Borneo — oil-rich sultanate! 🛢️',
    tipEmoji: '🛢️'
  },

  // ═══════════════════════════════════════════
  // ASIA - Part 2 (South Asia)
  // ═══════════════════════════════════════════
  {
    id: 'india',
    name: 'India',
    isoNum: '356',
    flag: '🇮🇳',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'India is a MASSIVE TRIANGLE pointing down — Taj Mahal and spices! 🌶️',
    tipEmoji: '🌶️'
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    isoNum: '586',
    flag: '🇵🇰',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Pakistan is an IRREGULAR BLOB west of India — Himalayan mountains! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    isoNum: '050',
    flag: '🇧🇩',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Bangladesh is a SMALL WEDGE — Ganges delta and tea! 🍵',
    tipEmoji: '🍵'
  },
  {
    id: 'nepal',
    name: 'Nepal',
    isoNum: '524',
    flag: '🇳🇵',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Nepal is a THIN RECTANGLE in the mountains — Mount Everest! ⛰️',
    tipEmoji: '⛰️'
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
    isoNum: '064',
    flag: '🇧🇹',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Bhutan is a TINY RECTANGLE hidden in mountains — Dragon kingdom! 🐉',
    tipEmoji: '🐉'
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    isoNum: '144',
    flag: '🇱🇰',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Sri Lanka is a TEARDROP ISLAND — tea plantations and beaches! 🏖️',
    tipEmoji: '🏖️'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    isoNum: '462',
    flag: '🇲🇻',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Maldives is a STRING OF ATOLLS — paradise islands in the Indian Ocean! 🏝️',
    tipEmoji: '🏝️'
  },
  {
    id: 'afghanistan',
    name: 'Afghanistan',
    isoNum: '004',
    flag: '🇦🇫',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Afghanistan is a BUMPY RECTANGLE — Hindu Kush mountains! 🏔️',
    tipEmoji: '🏔️'
  },

  // ═══════════════════════════════════════════
  // ASIA - Part 3 (East Asia)
  // ═══════════════════════════════════════════
  {
    id: 'china',
    name: 'China',
    isoNum: '156',
    flag: '🇨🇳',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'China is a ROOSTER-HEAD shape — largest population in the world! 🐔',
    tipEmoji: '🐔'
  },
  {
    id: 'japan',
    name: 'Japan',
    isoNum: '392',
    flag: '🇯🇵',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Japan is like 4 FISH JUMPING — main islands + Hokkaido! 🐟',
    tipEmoji: '🐟'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    isoNum: '410',
    flag: '🇰🇷',
    continent: 'asia',
    chapter: 'as-3',
    tip: "South Korea looks like a TIGER'S HEAD — K-pop and tech! 🐯",
    tipEmoji: '🐯'
  },
  {
    id: 'north-korea',
    name: 'North Korea',
    isoNum: '408',
    flag: '🇰🇵',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'North Korea shares the peninsula with South — mysterious isolation! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'mongolia',
    name: 'Mongolia',
    isoNum: '496',
    flag: '🇲🇳',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Mongolia is a HUGE RECTANGLE of steppes and deserts — Genghis Khan! 🐎',
    tipEmoji: '🐎'
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    isoNum: '158',
    flag: '🇹🇼',
    continent: 'asia',
    chapter: 'as-3',
    tip: "Taiwan is a LONG ISLAND off China's coast — semiconductor powerhouse! 📱",
    tipEmoji: '📱'
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    isoNum: '344',
    flag: '🇭🇰',
    continent: 'asia',
    chapter: 'as-3',
    tip: "Hong Kong is a SMALL TERRITORY on China's coast — harbor metropolis! 🌆",
    tipEmoji: '🌆'
  },
  {
    id: 'macau',
    name: 'Macau',
    isoNum: '446',
    flag: '🇲🇴',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Macau is a TINY PENINSULA — gambling destination! 🎰',
    tipEmoji: '🎰'
  },

  // ═══════════════════════════════════════════
  // ASIA - Part 4 (Middle East)
  // ═══════════════════════════════════════════
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    isoNum: '682',
    flag: '🇸🇦',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Saudi Arabia looks like a CAMEL SITTING DOWN — hump in the east! 🐪',
    tipEmoji: '🐪'
  },
  {
    id: 'yemen',
    name: 'Yemen',
    isoNum: '887',
    flag: '🇾🇪',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Yemen is a RECTANGLE on the Arabian Peninsula — ancient trade hub! 🛍️',
    tipEmoji: '🛍️'
  },
  {
    id: 'oman',
    name: 'Oman',
    isoNum: '512',
    flag: '🇴🇲',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Oman is a CLAW reaching down — frankincense!',
    tipEmoji: '🌿'
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    isoNum: '784',
    flag: '🇦🇪',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'UAE is a NARROW STRIP on the Persian Gulf — Dubai skyscrapers! 🏢',
    tipEmoji: '🏢'
  },
  {
    id: 'qatar',
    name: 'Qatar',
    isoNum: '634',
    flag: '🇶🇦',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Qatar is a TINY PENINSULA sticking out — natural gas wealth! 💰',
    tipEmoji: '💰'
  },
  {
    id: 'bahrain',
    name: 'Bahrain',
    isoNum: '048',
    flag: '🇧🇭',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Bahrain is a TINY ISLAND archipelago — pearls! 🦪',
    tipEmoji: '🦪'
  },
  {
    id: 'kuwait',
    name: 'Kuwait',
    isoNum: '414',
    flag: '🇰🇼',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Kuwait is a SMALL RECTANGLE on the Persian Gulf — oil! 🛢️',
    tipEmoji: '🛢️'
  },
  {
    id: 'iraq',
    name: 'Iraq',
    isoNum: '368',
    flag: '🇮🇶',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Iraq is a RECTANGLE between rivers — Tigris and Euphrates! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'iran',
    name: 'Iran',
    isoNum: '364',
    flag: '🇮🇷',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Iran is a LARGE RECTANGLE with mountains — Persian carpets! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'jordan',
    name: 'Jordan',
    isoNum: '400',
    flag: '🇯🇴',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Jordan is a DESERT RECTANGLE — Dead Sea and Petra! 🏜️',
    tipEmoji: '🏜️'
  },
  {
    id: 'israel',
    name: 'Israel',
    isoNum: '376',
    flag: '🇮🇱',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Israel is a THIN RECTANGLE on the Mediterranean — ancient history! ☪️',
    tipEmoji: '☪️'
  },
  {
    id: 'palestine',
    name: 'Palestine',
    isoNum: '887',
    flag: '🇵🇸',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Palestine is a DISPUTED TERRITORY — complex politics! 🤝',
    tipEmoji: '🤝'
  },

  // ═══════════════════════════════════════════
  // ASIA - Part 5 (Central Asia)
  // ═══════════════════════════════════════════
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    isoNum: '398',
    flag: '🇰🇿',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Kazakhstan is a MASSIVE RECTANGLE — Aral Sea tragedy! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    isoNum: '860',
    flag: '🇺🇿',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Uzbekistan is an IRREGULAR BLOB — Silk Road trade hub! 🛣️',
    tipEmoji: '🛣️'
  },
  {
    id: 'turkmenistan',
    name: 'Turkmenistan',
    isoNum: '795',
    flag: '🇹🇲',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Turkmenistan is a RECTANGLE with Caspian Sea coast — gas! 🔥',
    tipEmoji: '🔥'
  },
  {
    id: 'tajikistan',
    name: 'Tajikistan',
    isoNum: '762',
    flag: '🇹🇯',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Tajikistan is a BUMPY RECTANGLE — Pamir Mountains! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'kyrgyzstan',
    name: 'Kyrgyzstan',
    isoNum: '417',
    flag: '🇰🇬',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Kyrgyzstan is a JAGGED BLOB — Tian Shan mountains! ⛰️',
    tipEmoji: '⛰️'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    isoNum: '792',
    flag: '🇹🇷',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Turkey looks like a BOOT kicking into the Mediterranean! 👢',
    tipEmoji: '👢'
  },
  {
    id: 'lebanon',
    name: 'Lebanon',
    isoNum: '422',
    flag: '🇱🇧',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Lebanon is a THIN VERTICAL STRIP — mountains and coast! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'syria',
    name: 'Syria',
    isoNum: '760',
    flag: '🇸🇾',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Syria is a RECTANGLE on the Mediterranean — complex history! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'cyprus-east',
    name: 'Cyprus (East)',
    isoNum: '196',
    flag: '🇨🇾',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Cyprus extends eastward into this region! ☀️',
    tipEmoji: '☀️'
  },
  {
    id: 'timor-leste',
    name: 'Timor-Leste',
    isoNum: '626',
    flag: '🇹🇱',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Timor-Leste is half an ISLAND — newest Southeast Asian nation! 🌴',
    tipEmoji: '🌴'
  },

  // ═══════════════════════════════════════════
  // AMERICAS - North America (3 countries)
  // ═══════════════════════════════════════════
  {
    id: 'canada',
    name: 'Canada',
    isoNum: '124',
    flag: '🇨🇦',
    continent: 'americas',
    chapter: 'am-1',
    tip: 'Canada is a GIANT RECTANGLE with maple leaves — Niagara Falls! 🍁',
    tipEmoji: '🍁'
  },
  {
    id: 'usa',
    name: 'USA',
    isoNum: '840',
    flag: '🇺🇸',
    continent: 'americas',
    chapter: 'am-1',
    tip: 'USA looks like a RECTANGLE with RABBIT EARS (Great Lakes) and a BOOT (Florida) 🐰',
    tipEmoji: '🐰'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    isoNum: '484',
    flag: '🇲🇽',
    continent: 'americas',
    chapter: 'am-1',
    tip: 'Mexico is a TRIANGLE pointing down — ancient pyramids! 🔺',
    tipEmoji: '🔺'
  },

  // ═══════════════════════════════════════════
  // AMERICAS - Central America & Caribbean (20 countries)
  // ═══════════════════════════════════════════
  {
    id: 'guatemala',
    name: 'Guatemala',
    isoNum: '320',
    flag: '🇬🇹',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Guatemala is a BUMPY RECTANGLE — Mayan ruins! 🏛️',
    tipEmoji: '🏛️'
  },
  {
    id: 'honduras',
    name: 'Honduras',
    isoNum: '340',
    flag: '🇭🇳',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Honduras is an IRREGULAR BLOB — Bay Islands paradise! 🏝️',
    tipEmoji: '🏝️'
  },
  {
    id: 'el-salvador',
    name: 'El Salvador',
    isoNum: '222',
    flag: '🇸🇻',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'El Salvador is a TINY RECTANGLE on the Pacific — smallest Central American country! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'nicaragua',
    name: 'Nicaragua',
    isoNum: '558',
    flag: '🇳🇮',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Nicaragua is an ELONGATED BLOB — great lakes! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    isoNum: '188',
    flag: '🇨🇷',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Costa Rica is a RECTANGLE between oceans — jungle paradise! 🌴',
    tipEmoji: '🌴'
  },
  {
    id: 'panama',
    name: 'Panama',
    isoNum: '591',
    flag: '🇵🇦',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Panama is an S-SHAPED CURVE — the famous canal! 🚢',
    tipEmoji: '🚢'
  },
  {
    id: 'cuba',
    name: 'Cuba',
    isoNum: '192',
    flag: '🇨🇺',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Cuba is a LONG CROCODILE-SHAPED ISLAND — Caribbean jewel! 🐊',
    tipEmoji: '🐊'
  },
  {
    id: 'dominican-republic',
    name: 'Dominican Republic',
    isoNum: '214',
    flag: '🇩🇴',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Dominican Republic shares HISPANIOLA with Haiti — tropical beaches! 🏖️',
    tipEmoji: '🏖️'
  },
  {
    id: 'haiti',
    name: 'Haiti',
    isoNum: '332',
    flag: '🇭🇹',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Haiti is the western HALF OF HISPANIOLA — first independent Black nation! 🇭🇹',
    tipEmoji: '🇭🇹'
  },
  {
    id: 'jamaica',
    name: 'Jamaica',
    isoNum: '388',
    flag: '🇯🇲',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Jamaica is a SMALL ISLAND — reggae and beaches! 🏖️',
    tipEmoji: '🏖️'
  },
  {
    id: 'bahamas',
    name: 'Bahamas',
    isoNum: '044',
    flag: '🇧🇸',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Bahamas is a CHAIN OF ISLANDS — turquoise waters! 💎',
    tipEmoji: '💎'
  },
  {
    id: 'belize',
    name: 'Belize',
    isoNum: '084',
    flag: '🇧🇿',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Belize is a SMALL RECTANGLE on the Caribbean coast — Great Barrier Reef! 🪸',
    tipEmoji: '🪸'
  },
  {
    id: 'puerto-rico',
    name: 'Puerto Rico',
    isoNum: '630',
    flag: '🇵🇷',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Puerto Rico is a US TERRITORY island — bioluminescent bays! ✨',
    tipEmoji: '✨'
  },
  {
    id: 'trinidad-tobago',
    name: 'Trinidad and Tobago',
    isoNum: '780',
    flag: '🇹🇹',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Trinidad & Tobago is TWO ISLANDS off Venezuela — carnival! 🎉',
    tipEmoji: '🎉'
  },
  {
    id: 'barbados',
    name: 'Barbados',
    isoNum: '052',
    flag: '🇧🇧',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Barbados is a SMALL ISLAND DIAMOND — rum and beaches! 🍹',
    tipEmoji: '🍹'
  },
  {
    id: 'grenada',
    name: 'Grenada',
    isoNum: '308',
    flag: '🇬🇩',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Grenada is a TINY ISLAND — spice island! 🌶️',
    tipEmoji: '🌶️'
  },
  {
    id: 'st-lucia',
    name: 'St. Lucia',
    isoNum: '662',
    flag: '🇱🇨',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'St. Lucia is a SMALL ISLAND with volcanic peaks! 🌋',
    tipEmoji: '🌋'
  },
  {
    id: 'antigua-barbuda',
    name: 'Antigua and Barbuda',
    isoNum: '028',
    flag: '🇦🇬',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Antigua & Barbuda is a SMALL ISLAND NATION — 365 beaches! 🏖️',
    tipEmoji: '🏖️'
  },
  {
    id: 'dominica',
    name: 'Dominica',
    isoNum: '212',
    flag: '🇩🇲',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Dominica is a SMALL MOUNTAINOUS ISLAND — nature island! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'st-vincent',
    name: 'St. Vincent and the Grenadines',
    isoNum: '670',
    flag: '🇻🇨',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'St. Vincent is an ISLAND CHAIN — Paradise! 🌴',
    tipEmoji: '🌴'
  },

  // ═══════════════════════════════════════════
  // AMERICAS - South America (12 countries)
  // ═══════════════════════════════════════════
  {
    id: 'colombia',
    name: 'Colombia',
    isoNum: '170',
    flag: '🇨🇴',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Colombia is a TRAPEZOID on the northwestern coast — coffee! ☕',
    tipEmoji: '☕'
  },
  {
    id: 'venezuela',
    name: 'Venezuela',
    isoNum: '862',
    flag: '🇻🇪',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Venezuela is a RECTANGLE on the Caribbean coast — Angel Falls! 💧',
    tipEmoji: '💧'
  },
  {
    id: 'guyana',
    name: 'Guyana',
    isoNum: '328',
    flag: '🇬🇾',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Guyana is a RECTANGLE on the coast — rainforest! 🌳',
    tipEmoji: '🌳'
  },
  {
    id: 'suriname',
    name: 'Suriname',
    isoNum: '740',
    flag: '🇸🇷',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Suriname is a SMALL RECTANGLE — rainforest nation! 🌴',
    tipEmoji: '🌴'
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
    isoNum: '218',
    flag: '🇪🇨',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Ecuador is a VERTICAL RECTANGLE on the coast — sits on the equator! 🌍',
    tipEmoji: '🌍'
  },
  {
    id: 'peru',
    name: 'Peru',
    isoNum: '604',
    flag: '🇵🇪',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Peru is a TRAPEZOID on the west coast — Machu Picchu! 🏔️',
    tipEmoji: '🏔️'
  },
  {
    id: 'bolivia',
    name: 'Bolivia',
    isoNum: '068',
    flag: '🇧🇴',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Bolivia is a RECTANGLE in the middle — landlocked with mountains! ⛰️',
    tipEmoji: '⛰️'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    isoNum: '076',
    flag: '🇧🇷',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Brazil is shaped like a GIANT HEART — fitting for the most fun country! ❤️',
    tipEmoji: '❤️'
  },
  {
    id: 'paraguay',
    name: 'Paraguay',
    isoNum: '600',
    flag: '🇵🇾',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Paraguay is a LANDLOCKED RECTANGLE — Iguazu Falls! 💧',
    tipEmoji: '💧'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    isoNum: '032',
    flag: '🇦🇷',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Argentina is a TALL RECTANGLE on the east coast — tango and beef! 🥩',
    tipEmoji: '🥩'
  },
  {
    id: 'chile',
    name: 'Chile',
    isoNum: '152',
    flag: '🇨🇱',
    continent: 'americas',
    chapter: 'am-3',
    tip: "Chile is like a super-long FRENCH FRY — the world's skinniest country! 🍟",
    tipEmoji: '🍟'
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    isoNum: '858',
    flag: '🇺🇾',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Uruguay is a SMALL RECTANGLE between giants — European culture! 🌎',
    tipEmoji: '🌎'
  },

  // ═══════════════════════════════════════════
  // OCEANIA - Part 1 (Australia & NZ)
  // ═══════════════════════════════════════════
  {
    id: 'australia',
    name: 'Australia',
    isoNum: '036',
    flag: '🇦🇺',
    continent: 'oceania',
    chapter: 'oc-1',
    tip: 'Australia looks like a FLUFFY DOG lying down — can you spot the ears (Cape York)? 🐕',
    tipEmoji: '🐕'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    isoNum: '554',
    flag: '🇳🇿',
    continent: 'oceania',
    chapter: 'oc-1',
    tip: 'New Zealand is like a FRIENDLY BOOT kicking UP — Aotearoa! 👢',
    tipEmoji: '👢'
  },

  // ═══════════════════════════════════════════
  // OCEANIA - Part 2 (Pacific Islands)
  // ═══════════════════════════════════════════
  {
    id: 'fiji',
    name: 'Fiji',
    isoNum: '242',
    flag: '🇫🇯',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Fiji is an ISLAND ARCHIPELAGO — tropical paradise! 🏝️',
    tipEmoji: '🏝️'
  },
  {
    id: 'samoa',
    name: 'Samoa',
    isoNum: '882',
    flag: '🇼🇸',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Samoa is a SMALL ISLAND NATION — Polynesian culture! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'tonga',
    name: 'Tonga',
    isoNum: '776',
    flag: '🇹🇴',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Tonga is a CHAIN OF ISLANDS — Polynesian monarchy! 👑',
    tipEmoji: '👑'
  },
  {
    id: 'vanuatu',
    name: 'Vanuatu',
    isoNum: '548',
    flag: '🇻🇺',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Vanuatu is a VOLCANIC ISLAND CHAIN — active volcanoes! 🌋',
    tipEmoji: '🌋'
  },
  {
    id: 'kiribati',
    name: 'Kiribati',
    isoNum: '296',
    flag: '🇰🇮',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Kiribati is scattered ATOLLS across the Pacific — lowest point on land! 🏝️',
    tipEmoji: '🏝️'
  },
  {
    id: 'marshall-islands',
    name: 'Marshall Islands',
    isoNum: '584',
    flag: '🇲🇭',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Marshall Islands is a CHAIN OF ATOLLS — Pacific explorer destination! 🗺️',
    tipEmoji: '🗺️'
  },
  {
    id: 'palau',
    name: 'Palau',
    isoNum: '585',
    flag: '🇵🇼',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Palau is an ISLAND ARCHIPELAGO — diving paradise! 🤿',
    tipEmoji: '🤿'
  },
  {
    id: 'micronesia',
    name: 'Micronesia',
    isoNum: '583',
    flag: '🇫🇲',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Micronesia is scattered ISLANDS across the Pacific! 🏝️',
    tipEmoji: '🏝️'
  },
  {
    id: 'nauru',
    name: 'Nauru',
    isoNum: '520',
    flag: '🇳🇷',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: "Nauru is the WORLD'S SMALLEST COUNTRY (except Vatican) — tiny dot! 🟡",
    tipEmoji: '🟡'
  },
  {
    id: 'tuvalu',
    name: 'Tuvalu',
    isoNum: '798',
    flag: '🇹🇻',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Tuvalu is a TINY ATOLL CHAIN — endangered by rising seas! 🌊',
    tipEmoji: '🌊'
  },
  {
    id: 'solomon-islands',
    name: 'Solomon Islands',
    isoNum: '677',
    flag: '🇸🇧',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Solomon Islands is an ARCHIPELAGO — WWII history! ⚔️',
    tipEmoji: '⚔️'
  },
  {
    id: 'papua-new-guinea',
    name: 'Papua New Guinea',
    isoNum: '598',
    flag: '🇵🇬',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'PNG is a MOUNTAINOUS ISLAND — incredible biodiversity! 🦜',
    tipEmoji: '🦜'
  }
];

// Verify data
const TOTAL_COUNTRIES = COUNTRIES.length;
const CHAPTERS_BY_CONTINENT = {};
CHAPTERS.forEach(ch => {
  if (!CHAPTERS_BY_CONTINENT[ch.continent]) {
    CHAPTERS_BY_CONTINENT[ch.continent] = [];
  }
  CHAPTERS_BY_CONTINENT[ch.continent].push(ch);
});

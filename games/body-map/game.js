/* eslint-disable no-undef */
/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const BODY_PARTS = [
  { id: 'toes', label: 'Toes' },
  { id: 'feet', label: 'Feet' },
  { id: 'shins', label: 'Shins' },
  { id: 'knees', label: 'Knees' },
  { id: 'thighs', label: 'Thighs' },
  { id: 'belly', label: 'Belly' },
  { id: 'chest', label: 'Chest' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'neck', label: 'Neck' },
  { id: 'head', label: 'Head' }
];

const PARTY_LABELS = {
  R: 'Republican',
  D: 'Democratic',
  W: 'Whig',
  F: 'Federalist',
  DR: 'Dem.-Republican',
  NP: 'No Party'
};

const PRESIDENTS = [
  // ─── BATCH 0: Presidents 1–10 (Toes → Head) ───
  {
    n: 1,
    name: 'George Washington',
    term: '1789–1797',
    party: 'NP',
    fact: 'First US president, led the Continental Army to independence. Refused to become king and voluntarily stepped down after two terms.',
    tip: '👣 Picture Washington tiptoeing across a battlefield — his TOES wore out 200 pairs of boots on the march to freedom!'
  },
  {
    n: 2,
    name: 'John Adams',
    term: '1797–1801',
    party: 'F',
    fact: 'First vice president and second president. Moved into the still-unfinished White House and was the first president to live there.',
    tip: '🦶 Adams had such big FEET he needed custom-made shoes — he stomped around the unfinished White House!'
  },
  {
    n: 3,
    name: 'Thomas Jefferson',
    term: '1801–1809',
    party: 'DR',
    fact: 'Wrote the Declaration of Independence. Doubled the size of the USA with the Louisiana Purchase for just $15 million.',
    tip: '🦵 Jefferson banged his SHINS sprinting to write the Declaration of Independence — he was in such a hurry!'
  },
  {
    n: 4,
    name: 'James Madison',
    term: '1809–1817',
    party: 'DR',
    fact: "Called the 'Father of the Constitution.' At 5'4\" and about 100 lbs, he was the shortest and lightest US president.",
    tip: '🦿 Madison was so short he had to bend his KNEES just to see over his own desk — the tiniest president!'
  },
  {
    n: 5,
    name: 'James Monroe',
    term: '1817–1825',
    party: 'DR',
    fact: "Bought Florida from Spain for $5 million. His era was called the 'Era of Good Feelings' — barely any political arguing!",
    tip: "🦵 Monroe's THIGHS were so powerful from riding horses he could gallop from Florida all the way back to Washington!"
  },
  {
    n: 6,
    name: 'John Quincy Adams',
    term: '1825–1829',
    party: 'DR',
    fact: 'Son of President John Adams. He loved swimming and went skinny-dipping in the Potomac River every morning!',
    tip: '🫃 Adams did a GIANT BELLY FLOP into the Potomac River every morning — the neighbours were not pleased!'
  },
  {
    n: 7,
    name: 'Andrew Jackson',
    term: '1829–1837',
    party: 'D',
    fact: "Known as 'Old Hickory.' Survived two assassination attempts and carried a bullet near his heart from an old duel his whole life.",
    tip: "💪 Jackson beat his CHEST like a warrior — he had a bullet lodged near his heart and didn't care one bit!"
  },
  {
    n: 8,
    name: 'Martin Van Buren',
    term: '1837–1841',
    party: 'D',
    fact: 'First president born as a US citizen (after independence). Was known for his fancy fashion and elaborate side-whiskers.',
    tip: '🤷 Van Buren had the most stylish SHOULDER PADS in America — he was a genuine 1837 fashion icon!'
  },
  {
    n: 9,
    name: 'William Henry Harrison',
    term: '1841',
    party: 'W',
    fact: 'Gave the longest inaugural speech in history (2 hours) in freezing rain, then died of pneumonia just 31 days into office.',
    tip: '🤒 Harrison talked so long in the cold that his NECK froze solid — he died after just 31 days as president!'
  },
  {
    n: 10,
    name: 'John Tyler',
    term: '1841–1845',
    party: 'W',
    fact: "Became president after Harrison died — the first 'accidental president.' Had 15 children — more than any other president!",
    tip: "🧠 Tyler used his HEAD to grab power — he was called 'His Accidency' for sneaking into the presidency!"
  },

  // ─── BATCH 1: Presidents 11–20 (Toes → Head) ───
  {
    n: 11,
    name: 'James K. Polk',
    term: '1845–1849',
    party: 'D',
    fact: 'Kept every campaign promise, expanded the US massively (adding California, Texas, New Mexico), then retired and died 3 months later.',
    tip: '👣 Polk tiptoed on his TOES across the whole continent — he secretly grabbed California before anyone noticed!'
  },
  {
    n: 12,
    name: 'Zachary Taylor',
    term: '1849–1850',
    party: 'W',
    fact: 'Hero of the Mexican-American War. Died after 16 months in office, possibly from eating cherries and milk at a hot 4th of July party.',
    tip: "🦶 Taylor's FEET stomped on battlefields across Mexico — a war hero who died from a suspicious bowl of cherries!"
  },
  {
    n: 13,
    name: 'Millard Fillmore',
    term: '1850–1853',
    party: 'W',
    fact: 'Born in a log cabin and had almost no formal education. Installed the first bathtub and kitchen stove in the White House.',
    tip: '🦵 Fillmore shinnied up from a log cabin on his SHINS alone — the original self-made man!'
  },
  {
    n: 14,
    name: 'Franklin Pierce',
    term: '1853–1857',
    party: 'D',
    fact: 'His 11-year-old son Benny died in a train crash two months before his inauguration, devastating his presidency.',
    tip: '🦿 Pierce got down on his KNEES in grief — tragedy followed him before he even reached the White House!'
  },
  {
    n: 15,
    name: 'James Buchanan',
    term: '1857–1861',
    party: 'D',
    fact: 'Only president who never married. Watched the country fall apart as states started leaving, but refused to act to stop them.',
    tip: "🦵 Buchanan sat on his THIGHS doing absolutely nothing while the country split apart — history's worst spectator!"
  },
  {
    n: 16,
    name: 'Abraham Lincoln',
    term: '1861–1865',
    party: 'R',
    fact: "Ended slavery with the Emancipation Proclamation. At 6'4\", the tallest president. Assassinated at Ford's Theatre in 1865.",
    tip: "🫃 Lincoln's BELLY reached from floor to ceiling — at 6'4\" he was the tallest president who ever lived!"
  },
  {
    n: 17,
    name: 'Andrew Johnson',
    term: '1865–1869',
    party: 'D',
    fact: "First president to be impeached (but not removed). Struggled enormously with Reconstruction after Lincoln's assassination.",
    tip: '💪 Johnson puffed out his CHEST — he was the FIRST president ever impeached, and he did NOT care who knew it!'
  },
  {
    n: 18,
    name: 'Ulysses S. Grant',
    term: '1869–1877',
    party: 'R',
    fact: 'Greatest Union general of the Civil War. His face is on the $50 bill. His memoirs, finished days before he died, are a classic.',
    tip: "🤷 Grant SHOULDERED the whole Civil War — he carried the weight of a nation on those massive general's shoulders!"
  },
  {
    n: 19,
    name: 'Rutherford B. Hayes',
    term: '1877–1881',
    party: 'R',
    fact: "His wife banned alcohol from the White House, earning her the nickname 'Lemonade Lucy.' Won the most disputed election ever.",
    tip: "🤒 Hayes' wife grabbed him by the NECK and banned booze from the White House — no more parties, ever!"
  },
  {
    n: 20,
    name: 'James A. Garfield',
    term: '1881',
    party: 'R',
    fact: 'Shot by a disappointed job-seeker just four months into office. Could write Latin with one hand and Greek with the other simultaneously.',
    tip: '🧠 Garfield was shot in the HEAD and lingered for 79 awful days — all because of a grudge over a government job!'
  },

  // ─── BATCH 2: Presidents 21–30 (Toes → Head) ───
  {
    n: 21,
    name: 'Chester A. Arthur',
    term: '1881–1885',
    party: 'R',
    fact: 'Changed his outfit up to five times a day and owned 80 pairs of trousers. Surprisingly reformed the corrupt government hiring system.',
    tip: '👣 Arthur had so many shoes (80 pairs!) he had to count them on his TOES — the fashionista president!'
  },
  {
    n: 22,
    name: 'Grover Cleveland',
    term: '1885–1889',
    party: 'D',
    fact: 'Only president to serve two non-consecutive terms (22nd and 24th). Once admitted to having a tooth secretly removed on a yacht.',
    tip: '🦶 Cleveland put his FOOT down both times — the only president to serve two separate terms!'
  },
  {
    n: 23,
    name: 'Benjamin Harrison',
    term: '1889–1893',
    party: 'R',
    fact: 'Grandson of President William Henry Harrison. First president to have electricity in the White House — and was terrified to touch the switches!',
    tip: "🦵 Harrison's SHINS shook every time he turned on the lights — so scared of electricity he made servants do it!"
  },
  {
    n: 24,
    name: 'Grover Cleveland',
    term: '1893–1897',
    party: 'D',
    fact: "Cleveland again! He's counted twice in the list because he served two separate terms — making him president #22 AND #24.",
    tip: '🦿 Cleveland got back on his KNEES and begged America for a second chance — and they said yes! The comeback king!'
  },
  {
    n: 25,
    name: 'William McKinley',
    term: '1897–1901',
    party: 'R',
    fact: "Loved carnations and wore one every day for good luck. It didn't work — he was assassinated at the Pan-American Exposition.",
    tip: "🦵 McKinley wore lucky flowers on his THIGHS but the luck ran out — shot at a world's fair in 1901!"
  },
  {
    n: 26,
    name: 'Theodore Roosevelt',
    term: '1901–1909',
    party: 'R',
    fact: "Charged San Juan Hill. The 'Teddy bear' is named after him. Once gave a 90-minute speech with a bullet lodged in his chest.",
    tip: "🫃 Roosevelt's big round BELLY charged up San Juan Hill — shot in the chest, he still gave a 90-minute speech!"
  },
  {
    n: 27,
    name: 'William Howard Taft',
    term: '1909–1913',
    party: 'R',
    fact: 'The heaviest president at 340 lbs. Got stuck in the White House bathtub. Later became Chief Justice of the Supreme Court.',
    tip: "💪 Taft's massive CHEST got stuck in the bathtub — they had to install a special oversized tub just for him!"
  },
  {
    n: 28,
    name: 'Woodrow Wilson',
    term: '1913–1921',
    party: 'D',
    fact: 'Led the US through WWI. Proposed the League of Nations for world peace — but Congress refused to join. Suffered a stroke in office.',
    tip: "🤷 Wilson's SHOULDERS carried the weight of world peace — 14 Points on one shoulder, a League of Nations on the other!"
  },
  {
    n: 29,
    name: 'Warren G. Harding',
    term: '1921–1923',
    party: 'R',
    fact: 'His administration had one of the most corrupt cabinets in history (Teapot Dome scandal). Died suddenly in office in 1923.',
    tip: "🤒 Harding's friends were a PAIN IN THE NECK — their scandals brought down the whole presidency!"
  },
  {
    n: 30,
    name: 'Calvin Coolidge',
    term: '1923–1929',
    party: 'R',
    fact: "'Silent Cal' — known for barely speaking. Once slept 11 hours a night plus a daily nap. His calm preceded the Great Depression.",
    tip: '🧠 Cool Coolidge kept his HEAD completely still and said almost nothing — the quietest brain in the Oval Office!'
  },

  // ─── BATCH 3: Presidents 31–40 (Toes → Head) ───
  {
    n: 31,
    name: 'Herbert Hoover',
    term: '1929–1933',
    party: 'R',
    fact: 'The Great Depression began one year after he took office. Was actually a brilliant engineer and hugely successful before becoming president.',
    tip: "👣 Hoover TIPTOED on his TOES hoping the Great Depression would just go away on its own — it didn't!"
  },
  {
    n: 32,
    name: 'Franklin D. Roosevelt',
    term: '1933–1945',
    party: 'D',
    fact: 'Served 12 years — the longest presidency ever (now constitutionally impossible). Led through both the Great Depression and WWII from a wheelchair.',
    tip: "🦶 FDR couldn't stand on his FEET (polio) — but his mind stood taller than anyone for 12 historic years!"
  },
  {
    n: 33,
    name: 'Harry S. Truman',
    term: '1945–1953',
    party: 'D',
    fact: "Made the decision to drop atomic bombs on Japan to end WWII. Survived an assassination attempt. 'The buck stops here' was his motto.",
    tip: "🦵 Truman's SHINS dodged two assassins' bullets — the most stubborn set of legs in presidential history!"
  },
  {
    n: 34,
    name: 'Dwight D. Eisenhower',
    term: '1953–1961',
    party: 'R',
    fact: "Supreme Allied Commander in WWII. Built the Interstate Highway System. Warned America about the 'military-industrial complex.'",
    tip: '🦿 Ike bent his KNEES to pray — he was actually baptised inside the White House right after his inauguration!'
  },
  {
    n: 35,
    name: 'John F. Kennedy',
    term: '1961–1963',
    party: 'D',
    fact: "Youngest elected president. Navigated the Cuban Missile Crisis. 'Ask not what your country can do for you.' Assassinated in Dallas.",
    tip: "🦵 Kennedy was so handsome from THIGHS to hair that teenagers screamed — America's first rock-star president!"
  },
  {
    n: 36,
    name: 'Lyndon B. Johnson',
    term: '1963–1969',
    party: 'D',
    fact: 'Passed the Civil Rights Act and Great Society programs, but the Vietnam War destroyed his reputation. Had an enormous personality.',
    tip: '🫃 LBJ had a BELLY full of big ideas — Civil Rights Act, Medicare, Voting Rights Act — all tucked in there!'
  },
  {
    n: 37,
    name: 'Richard Nixon',
    term: '1969–1974',
    party: 'R',
    fact: "Opened relations with China. Only president to resign from office, over the Watergate break-in cover-up. 'I am not a crook!'",
    tip: "💪 Nixon beat his CHEST and shouted 'I am not a crook!' — then resigned before anyone could fire him!"
  },
  {
    n: 38,
    name: 'Gerald Ford',
    term: '1974–1977',
    party: 'R',
    fact: 'Only president never elected as VP or President (appointed after VP resigned). Pardoned Nixon. Famously tripped going down plane stairs.',
    tip: '🤷 Ford SHOULDERED an impossible job — and tripped on his SHOULDERS down the Air Force One stairs on live TV!'
  },
  {
    n: 39,
    name: 'Jimmy Carter',
    term: '1977–1981',
    party: 'D',
    fact: 'Brokered historic Camp David Peace Accords between Israel and Egypt. Won Nobel Peace Prize in 2002 for his post-presidential work.',
    tip: '🤒 Carter stuck his NECK way out for peace — the Camp David deal was the biggest neck-on-the-line moment ever!'
  },
  {
    n: 40,
    name: 'Ronald Reagan',
    term: '1981–1989',
    party: 'R',
    fact: "Former Hollywood actor. 'Mr Gorbachev, tear down this wall!' Oldest president elected (69). Survived an assassination attempt.",
    tip: '🧠 Reagan used his HEAD both in Hollywood and politics — the most charming brain to ever run America!'
  },

  // ─── BATCH 4: Presidents 41–47 (Toes → Thighs, 7 parts) ───
  {
    n: 41,
    name: 'George H.W. Bush',
    term: '1989–1993',
    party: 'R',
    wikiTitle: 'George H. W. Bush',
    fact: 'Led the Gulf War coalition and liberated Kuwait in 100 hours. Famously hated broccoli and banned it from Air Force One.',
    tip: '👣 Bush tipped onto his TOES for 100 hours during Desert Storm — the fastest war ever fought!'
  },
  {
    n: 42,
    name: 'Bill Clinton',
    term: '1993–2001',
    party: 'D',
    fact: 'Oversaw the longest peacetime economic expansion in US history. Played saxophone on The Arsenio Hall Show during his campaign.',
    tip: '🦶 Clinton put his FOOT in his mouth regularly — but his other foot was tapping out saxophone rhythms!'
  },
  {
    n: 43,
    name: 'George W. Bush',
    term: '2001–2009',
    party: 'R',
    fact: "Led America's response to 9/11. Started wars in Afghanistan and Iraq. Once choked on a pretzel while watching football alone.",
    tip: '🦵 Bush scraped his SHINS falling off a Segway on camera — the internet never, ever forgot!'
  },
  {
    n: 44,
    name: 'Barack Obama',
    term: '2009–2017',
    party: 'D',
    fact: 'First African-American president. Won the Nobel Peace Prize. Once threw out a perfect first pitch — a lifelong Chicago White Sox fan.',
    tip: '🦿 Obama bent to one KNEE before history — the first Black president, making the world hold its breath!'
  },
  {
    n: 45,
    name: 'Donald Trump',
    term: '2017–2021',
    party: 'R',
    fact: "First president with no prior political or military experience before taking office. Known for his Twitter posts and 'Make America Great Again.'",
    tip: '🦵 Trump stood THIGH-deep in Twitter storms — every morning a new controversy, every tweet a headline!'
  },
  {
    n: 46,
    name: 'Joe Biden',
    term: '2021–2025',
    party: 'D',
    fact: 'Oldest person to become US president at 78. Overcame a stutter as a child. Known for his aviator sunglasses and ice cream obsession.',
    tip: "🫃 Biden's BELLY laugh was the most famous in Washington — and he always had an ice cream cone for company!"
  },
  {
    n: 47,
    name: 'Donald Trump',
    term: '2025–present',
    party: 'R',
    fact: 'Became the 47th president, returning after a 4-year absence — only the second president ever to serve non-consecutive terms.',
    tip: '💪 Trump chest-bumped his way BACK into the Oval Office — only the second person in history to pull off that trick!'
  }
];

const BATCHES = [
  { label: 'Presidents 1–10', start: 0, count: 10, names: 'Washington → Tyler' },
  { label: 'Presidents 11–20', start: 10, count: 10, names: 'Polk → Garfield' },
  { label: 'Presidents 21–30', start: 20, count: 10, names: 'Arthur → Coolidge' },
  { label: 'Presidents 31–40', start: 30, count: 10, names: 'Hoover → Reagan' },
  { label: 'Presidents 41–47', start: 40, count: 7, names: 'Bush Sr → Trump' }
];

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let batch = 0;
let step = 0;
let quizStep = 0;
let score = 0;
let quizOrder = [];

/* ═══════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════ */
let gameNav;

function initNavigation() {
  gameNav = new GameNavigation('body-map', {
    screens: ['landing', 'learn', 'quiz', 'score'],
    initialScreen: 'landing',
    gameName: 'Body Map',
    titles: {
      landing: 'Body Map',
      learn: 'Body Map',
      quiz: 'Body Map',
      score: 'Body Map'
    }
  });
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
function init() {
  const grid = document.getElementById('batch-grid');
  grid.innerHTML = '';
  BATCHES.forEach((b, i) => {
    const btn = document.createElement('button');
    btn.className = 'batch-btn';
    btn.innerHTML = `
      <div class="bnum">${b.label}</div>
      <div class="brange">${b.count} presidents</div>
      <div class="bnames">${b.names}</div>
    `;
    btn.addEventListener('click', () => startBatch(i));
    grid.appendChild(btn);
  });

  // Clone body SVG into quiz panel
  const learnSvg = document.getElementById('body-svg');
  const quizPanel = document.getElementById('quiz-body-panel');
  const svgClone = learnSvg.cloneNode(true);
  svgClone.id = 'quiz-body-svg';
  quizPanel.appendChild(svgClone);

  // Set up event listeners for buttons
  document.getElementById('btn-prev').addEventListener('click', prevStep);
  document.getElementById('btn-next').addEventListener('click', nextStep);
  document.getElementById('btn-replay').addEventListener('click', replayBatch);
  document.getElementById('btn-all-batches').addEventListener('click', goStart);
  document.getElementById('btn-next-batch').addEventListener('click', nextBatch);
}

/* ═══════════════════════════════════════════════════
   SCREENS
═══════════════════════════════════════════════════ */
function showScreen(screenName) {
  // Map old IDs to new data-screen names for backward compatibility
  const screenMap = {
    'screen-start': 'landing',
    'screen-learn': 'learn',
    'screen-quiz': 'quiz',
    'screen-score': 'score'
  };

  const mappedName = screenMap[screenName] || screenName;

  if (gameNav && gameNav.config.screens.includes(mappedName)) {
    gameNav.goToScreen(mappedName);
  } else {
    // Fallback: manual screen switching
    document.querySelectorAll('.dom-screen').forEach(s => s.classList.remove('active'));
    const el = document.querySelector(`[data-screen="${mappedName}"]`);
    if (el) {
      el.classList.add('active');
    }
  }

  window.scrollTo(0, 0);
}

/* ═══════════════════════════════════════════════════
   LEARN PHASE
═══════════════════════════════════════════════════ */
function startBatch(b) {
  batch = b;
  step = 0;
  document.getElementById('nav-title').textContent = 'Body Map';
  showScreen('screen-learn');
  renderLearn();
}

function renderLearn() {
  const B = BATCHES[batch];
  const p = PRESIDENTS[B.start + step];
  const part = BODY_PARTS[step];
  const total = B.count;

  // Nav
  document.getElementById('nav-progress').textContent = `${B.label}`;

  // Progress bar
  document.getElementById('learn-bar').style.width = `${((step + 1) / total) * 100}%`;

  // Zone highlight
  document.getElementById('zone-label').textContent = part.label;
  activateZone(part.id, 'body-svg');

  // Dots
  buildDots('step-dots', total, step);

  // Step indicator
  document.getElementById('step-indicator').textContent = `President ${step + 1} of ${total}`;

  // Back button state
  document.getElementById('btn-prev').disabled = step === 0;

  // Next button
  const btn = document.getElementById('btn-next');
  if (step === total - 1) {
    btn.innerHTML = 'Start Quiz! <i class="ph-bold ph-lightning"></i>';
    btn.className = 'btn-next quiz-mode';
  } else {
    btn.innerHTML = 'Next <i class="ph-bold ph-arrow-right"></i>';
    btn.className = 'btn-next';
  }

  // Info card
  const partyLabel = PARTY_LABELS[p.party] || p.party;
  const pid = `portrait-${p.n}`;
  document.getElementById('learn-info').innerHTML = `
    <div class="pres-header">
      <div class="pres-portrait-wrap" id="${pid}">
        <div class="portrait-num">${p.n}</div>
      </div>
      <div class="pres-details">
        <div class="zone-badge"><i class="ph-bold ph-map-pin"></i> ${part.label}</div>
        <div class="pres-num">President #${p.n}</div>
        <div class="pres-name">${p.name}</div>
        <div class="pres-term">${p.term}</div>
        <span class="party-badge party-${p.party}">${partyLabel}</span>
      </div>
    </div>
    <div class="fact-card">
      <h4><i class="ph-bold ph-info"></i> Did You Know?</h4>
      <p>${p.fact}</p>
    </div>
    <div class="tip-card">
      <h4><i class="ph-bold ph-lightbulb"></i> Memory Tip — The ${part.label} Connection</h4>
      <p>${p.tip}</p>
    </div>
  `;
  fetchAndShowPortrait(p, pid);
}

function nextStep() {
  const B = BATCHES[batch];
  if (step < B.count - 1) {
    // Mark current zone as visited
    markZoneVisited(BODY_PARTS[step].id, 'body-svg');
    step++;
    renderLearn();
  } else {
    startQuiz();
  }
}

/* ═══════════════════════════════════════════════════
   QUIZ PHASE
═══════════════════════════════════════════════════ */
function startQuiz() {
  const B = BATCHES[batch];
  quizStep = 0;
  score = 0;
  quizOrder = shuffle(Array.from({ length: B.count }, (_, i) => i));
  showScreen('screen-quiz');
  renderQuiz();
}

function renderQuiz() {
  const B = BATCHES[batch];
  const total = B.count;
  const qi = quizOrder[quizStep]; // index into batch
  const part = BODY_PARTS[qi];

  // Progress bar
  document.getElementById('quiz-bar').style.width = `${(quizStep / total) * 100}%`;

  // Zone label + highlight
  document.getElementById('quiz-zone-label').textContent = part.label;
  // Reset quiz SVG zones
  document.querySelectorAll('#quiz-body-svg .body-zone').forEach(z => {
    z.classList.remove('active', 'visited');
  });
  const qz = document.querySelector(`#quiz-body-svg #zone-${part.id}`);
  if (qz) {
    qz.classList.add('active');
  }

  // Question
  document.getElementById('quiz-prompt').textContent = 'Who is at the…';
  document.getElementById('quiz-question').innerHTML = `<span>${part.label.toUpperCase()}</span>?`;

  // Build 4 options: correct + 3 random from same batch
  const wrong = shuffle(Array.from({ length: B.count }, (_, i) => i).filter(i => i !== qi)).slice(
    0,
    3
  );
  const opts = shuffle([qi, ...wrong]);

  const letters = ['A', 'B', 'C', 'D'];
  const grid = document.getElementById('quiz-options');
  grid.innerHTML = '';
  opts.forEach((idx, i) => {
    const pOpt = PRESIDENTS[B.start + idx];
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${pOpt.name}`;
    btn.onclick = () => checkAnswer(idx, qi, btn);
    grid.appendChild(btn);
  });

  // Dots
  buildDots('quiz-dots', total, quizStep);
  document.getElementById('quiz-score-live').textContent = score;
}

function checkAnswer(selected, correct, clickedBtn) {
  // Disable all buttons
  document.querySelectorAll('#quiz-options .opt-btn').forEach(b => {
    b.disabled = true;
  });
  // Show correct/wrong
  document.querySelectorAll('#quiz-options .opt-btn').forEach(b => {
    const bName = b.textContent.slice(1).trim();
    const B = BATCHES[batch];
    const correctName = PRESIDENTS[B.start + correct].name;
    if (bName === correctName) {
      b.classList.add('correct');
    } else if (b === clickedBtn && selected !== correct) {
      b.classList.add('wrong');
    }
  });

  if (selected === correct) {
    score++;
  }
  document.getElementById('quiz-score-live').textContent = score;

  setTimeout(() => {
    quizStep++;
    if (quizStep < BATCHES[batch].count) {
      renderQuiz();
    } else {
      showScore();
    }
  }, 900);
}

/* ═══════════════════════════════════════════════════
   SCORE
═══════════════════════════════════════════════════ */
function showScore() {
  const total = BATCHES[batch].count;
  const pct = score / total;
  const emoji = pct === 1 ? '🏆' : pct >= 0.8 ? '🌟' : pct >= 0.6 ? '👍' : '💪';
  const title =
    pct === 1
      ? 'Perfect Memory!'
      : pct >= 0.8
        ? 'Great Job!'
        : pct >= 0.6
          ? 'Good Effort!'
          : 'Keep Practicing!';
  const sub =
    pct === 1
      ? 'You nailed every president on the body map. Extraordinary!'
      : pct >= 0.8
        ? 'Almost perfect! Review the ones you missed and try again.'
        : 'Practice the memory tips — imagine those silly scenes vividly!';

  document.getElementById('score-emoji').textContent = emoji;
  document.getElementById('score-title').textContent = title;
  document.getElementById('score-num').textContent = score;
  document.getElementById('score-out').textContent = `out of ${total} correct`;
  document.getElementById('score-sub').textContent = sub;

  const nextBtn = document.getElementById('btn-next-batch');
  if (batch < BATCHES.length - 1) {
    nextBtn.style.display = '';
    nextBtn.innerHTML = 'Next Batch <i class="ph-bold ph-arrow-right"></i>';
  } else {
    nextBtn.style.display = 'none';
  }

  showScreen('screen-score');
}

function replayBatch() {
  startBatch(batch);
}
function nextBatch() {
  if (batch < BATCHES.length - 1) {
    startBatch(batch + 1);
  }
}
function goStart() {
  showScreen('screen-start');
  document.getElementById('nav-progress').textContent = '';
}

/* ═══════════════════════════════════════════════════
   SVG HELPERS
═══════════════════════════════════════════════════ */
function activateZone(zoneId, svgId) {
  document.querySelectorAll(`#${svgId} .body-zone`).forEach(z => {
    z.classList.remove('active');
  });
  const el = document.querySelector(`#${svgId} #zone-${zoneId}`);
  if (el) {
    el.classList.add('active');
  }
}

function markZoneVisited(zoneId, svgId) {
  const el = document.querySelector(`#${svgId} #zone-${zoneId}`);
  if (el) {
    el.classList.remove('active');
    el.classList.add('visited');
  }
}

/* ═══════════════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════════════ */
function buildDots(containerId, total, activeIdx) {
  const c = document.getElementById(containerId);
  c.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = `step-dot${i < activeIdx ? ' done' : i === activeIdx ? ' active' : ''}`;
    c.appendChild(d);
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ═══════════════════════════════════════════════════
   PREV STEP
═══════════════════════════════════════════════════ */
function prevStep() {
  if (step > 0) {
    step--;
    renderLearn();
  }
}

/* ═══════════════════════════════════════════════════
   PORTRAIT — fetch from Wikipedia REST API
═══════════════════════════════════════════════════ */
async function fetchAndShowPortrait(pres, wrapperId) {
  try {
    const title = (pres.wikiTitle || pres.name).replace(/ /g, '_');
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    const src = data.thumbnail?.source;
    if (!src) {
      return;
    }
    const el = document.getElementById(wrapperId);
    if (!el) {
      return;
    } // user already navigated away
    const img = document.createElement('img');
    img.src = src;
    img.alt = pres.name;
    img.loading = 'lazy';
    img.onerror = () => {
      const el2 = document.getElementById(wrapperId);
      if (el2) {
        el2.innerHTML = `<div class="portrait-num">${pres.n}</div>`;
      }
    };
    el.innerHTML = '';
    el.appendChild(img);
  } catch (e) {
    /* keep number fallback */
  }
}

/* ═══════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  init();
});

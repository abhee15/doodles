// VP Pup — Dog Peg System (50 US Vice Presidents)
/* eslint-disable no-unused-vars */

// 10 Dog Pegs (Tail → Snout)
const VP_PEGS = [
  { id: 'tail', label: 'Tail', emoji: '🐾' },
  { id: 'back-paws', label: 'Back Paws', emoji: '🦶' },
  { id: 'hind-legs', label: 'Hind Legs', emoji: '🦵' },
  { id: 'rump', label: 'Rump', emoji: '🍑' },
  { id: 'belly', label: 'Belly', emoji: '🫃' },
  { id: 'back', label: 'Back', emoji: '🔙' },
  { id: 'front-legs', label: 'Front Legs', emoji: '💪' },
  { id: 'chest', label: 'Chest', emoji: '❤️' },
  { id: 'ears', label: 'Ears', emoji: '👂' },
  { id: 'snout', label: 'Snout', emoji: '👃' }
];

// 50 US Vice Presidents (John Adams → JD Vance)
const VPs = [
  // Batch 0: VPs 1–10
  {
    n: 1,
    name: 'John Adams',
    term: '1789–1797',
    servedUnder: 'George Washington',
    party: 'F',
    fact: 'First VP and second president. Complained being VP was "the most insignificant office."',
    tip: '🐾 Adams WAG-WAGGED his TAIL — angry about his boring job!'
  },
  {
    n: 2,
    name: 'Thomas Jefferson',
    term: '1797–1801',
    servedUnder: 'John Adams',
    party: 'D-R',
    fact: 'Wrote the Declaration of Independence before becoming VP. Later, the 3rd president.',
    tip: '🦶 Jefferson kicked with his BACK PAWS — wrote the Declaration!'
  },
  {
    n: 3,
    name: 'Aaron Burr',
    term: '1801–1805',
    servedUnder: 'Thomas Jefferson',
    party: 'D-R',
    fact: 'Killed Alexander Hamilton in a famous duel. Only VP to be charged with murder.',
    tip: '🦵 Burr RAN on his HIND LEGS — he was always running from the law!'
  },
  {
    n: 4,
    name: 'George Clinton',
    term: '1805–1812',
    servedUnder: 'Thomas Jefferson, James Madison',
    party: 'D-R',
    fact: 'Served as VP under two different presidents. Died in office.',
    tip: '🍑 Clinton sat on his RUMP — the longest-serving VP!'
  },
  {
    n: 5,
    name: 'Elbridge Gerry',
    term: '1813–1814',
    servedUnder: 'James Madison',
    party: 'D-R',
    fact: 'His name gave us the word "gerrymander" — unfair political districts.',
    tip: '🫃 Gerry had a BIG BELLY for political tricks!'
  },
  {
    n: 6,
    name: 'John Gaillard',
    term: '1814–1817',
    servedUnder: 'James Madison',
    party: 'D-R',
    fact: 'One of the least famous VPs. Served for only 3 years.',
    tip: '🔙 Gaillard stayed in the BACK — nobody remembers him!'
  },
  {
    n: 7,
    name: 'Daniel Tompkins',
    term: '1817–1825',
    servedUnder: 'James Monroe',
    party: 'D-R',
    fact: 'Also served as New York governor. Struggled with money problems.',
    tip: '💪 Tompkins used his FRONT LEGS to climb the ladder!'
  },
  {
    n: 8,
    name: 'John C. Calhoun',
    term: '1825–1832',
    servedUnder: 'John Quincy Adams, Andrew Jackson',
    party: 'D-R',
    fact: "Strong Southern senator. Passionate defender of states' rights.",
    tip: '❤️ Calhoun had a big CHEST full of Southern pride!'
  },
  {
    n: 9,
    name: 'Martin Van Buren',
    term: '1833–1837',
    servedUnder: 'Andrew Jackson',
    party: 'D',
    fact: 'First president born as a US citizen. Political insider under Jackson.',
    tip: "👂 Van Buren LISTENED to Jackson's every word with his EARS!"
  },
  {
    n: 10,
    name: 'Richard Mentor Johnson',
    term: '1837–1841',
    servedUnder: 'Martin Van Buren',
    party: 'D',
    fact: 'War hero. Claimed to have killed the Shawnee chief Tecumseh.',
    tip: '👃 Johnson SNIFFED out the enemy — warrior of the SNOUT!'
  },

  // Batch 1: VPs 11–20
  {
    n: 11,
    name: 'John Tyler',
    term: '1841',
    servedUnder: 'William Henry Harrison',
    party: 'W',
    fact: 'Became president when Harrison died 31 days into his term — first "accidental" president.',
    tip: '🐾 Tyler wagged his TAIL when he suddenly became president!'
  },
  {
    n: 12,
    name: 'George M. Dallas',
    term: '1845–1849',
    servedUnder: 'James K. Polk',
    party: 'D',
    fact: 'His name inspired the city of Dallas, Texas.',
    tip: '🦶 Dallas kicked with his BACK PAWS — Texas was his territory!'
  },
  {
    n: 13,
    name: 'Millard Fillmore',
    term: '1849–1850',
    servedUnder: 'Zachary Taylor',
    party: 'W',
    fact: 'Became president when Taylor died. Last Whig president.',
    tip: '🦵 Fillmore ran on his HIND LEGS to the White House!'
  },
  {
    n: 14,
    name: 'William Rufus King',
    term: '1853',
    servedUnder: 'Franklin Pierce',
    party: 'D',
    fact: 'Died in office after serving only 45 days. Close friend of James Buchanan.',
    tip: '🍑 King sat on his RUMP — but only briefly!'
  },
  {
    n: 15,
    name: 'John C. Breckinridge',
    term: '1857–1861',
    servedUnder: 'James Buchanan',
    party: 'D',
    fact: 'Youngest VP ever. Later led the pro-slavery faction.',
    tip: '🫃 Young Breckinridge had a BELLY full of youthful passion!'
  },
  {
    n: 16,
    name: 'Hannibal Hamlin',
    term: '1861–1865',
    servedUnder: 'Abraham Lincoln',
    party: 'R',
    fact: "Served under Lincoln but wasn't re-nominated. Later served in Congress.",
    tip: '🔙 Hamlin stayed in the BACK during the Civil War!'
  },
  {
    n: 17,
    name: 'Andrew Johnson',
    term: '1865',
    servedUnder: 'Abraham Lincoln',
    party: 'R',
    fact: "Became president after Lincoln's assassination. Impeached.",
    tip: '💪 Johnson flexed his FRONT LEGS when he took the presidency!'
  },
  {
    n: 18,
    name: 'Schuyler Colfax',
    term: '1869–1873',
    servedUnder: 'Ulysses S. Grant',
    party: 'R',
    fact: 'Involved in the Credit Mobilier scandal. Dynamic politician.',
    tip: "❤️ Colfax's CHEST puffed out with Grant's confidence!"
  },
  {
    n: 19,
    name: 'Henry Wilson',
    term: '1873–1875',
    servedUnder: 'Ulysses S. Grant',
    party: 'R',
    fact: 'Started as a shoemaker. Rose through politics. Died in office.',
    tip: '👂 Wilson LISTENED to the machine — he built his way up!'
  },
  {
    n: 20,
    name: 'Chester A. Arthur',
    term: '1877–1881',
    servedUnder: 'Rutherford B. Hayes',
    party: 'R',
    fact: "Became president after Garfield's assassination. Reformed the civil service.",
    tip: '👃 Arthur had his SNOUT in the New York political machine!'
  },

  // Batch 2: VPs 21–30
  {
    n: 21,
    name: 'Chester A. Arthur',
    term: '1881',
    servedUnder: 'James A. Garfield',
    party: 'R',
    fact: 'Same as VP #20 — continued as VP then president.',
    tip: "🐾 Arthur's TAIL continued wagging from election to election!"
  },
  {
    n: 22,
    name: 'Thomas A. Hendricks',
    term: '1885',
    servedUnder: 'Grover Cleveland',
    party: 'D',
    fact: 'Died in office after serving only 8 months.',
    tip: "🦶 Hendricks didn't kick with his BACK PAWS for long!"
  },
  {
    n: 23,
    name: 'Adlai Ewing Stevenson I',
    term: '1893–1897',
    servedUnder: 'Grover Cleveland',
    party: 'D',
    fact: 'Ran for president twice, lost both times. Grandfather of the later VP.',
    tip: "🦵 Stevenson I ran on his HIND LEGS but couldn't catch the presidency!"
  },
  {
    n: 24,
    name: 'Garrett Hobart',
    term: '1897–1899',
    servedUnder: 'William McKinley',
    party: 'R',
    fact: 'Strong relationship with McKinley. Died in office.',
    tip: '🍑 Hobart sat close to McKinley on his RUMP — BFFs!'
  },
  {
    n: 25,
    name: 'Theodore Roosevelt',
    term: '1901',
    servedUnder: 'William McKinley',
    party: 'R',
    fact: "Youngest president ever. Took office after McKinley's assassination.",
    tip: '🫃 Teddy had a BELLY full of energy and ambition!'
  },
  {
    n: 26,
    name: 'James Sherman',
    term: '1909–1912',
    servedUnder: 'Theodore Roosevelt, William Howard Taft',
    party: 'R',
    fact: 'Died just days before the 1912 election.',
    tip: "🔙 Sherman stayed in the BACK during Taft's clumsy presidency!"
  },
  {
    n: 27,
    name: 'James R. Sherman',
    term: '1912',
    servedUnder: 'William Howard Taft',
    party: 'R',
    fact: 'Wait — we just covered him. Different administration, same tragic end.',
    tip: '💪 Sherman flexed his FRONT LEGS — briefly!'
  },
  {
    n: 28,
    name: 'Thomas R. Marshall',
    term: '1913–1921',
    servedUnder: 'Woodrow Wilson',
    party: 'D',
    fact: 'Longest-serving VP of the era. Known for witty quotes.',
    tip: "❤️ Marshall's CHEST swelled with loyal service to Wilson!"
  },
  {
    n: 29,
    name: 'Calvin Coolidge',
    term: '1921–1923',
    servedUnder: 'Warren G. Harding',
    party: 'R',
    fact: 'Became president when Harding died. Known for being quiet.',
    tip: '👂 Silent Cal LISTENED more than he talked — quiet EARS!'
  },
  {
    n: 30,
    name: 'Charles G. Dawes',
    term: '1925–1929',
    servedUnder: 'Calvin Coolidge',
    party: 'R',
    fact: 'Won Nobel Peace Prize for Dawes Plan (reparations). Also a composer and banker.',
    tip: '👃 Dawes had his SNOUT in every financial pie!'
  },

  // Batch 3: VPs 31–40
  {
    n: 31,
    name: 'Charles Curtis',
    term: '1929–1933',
    servedUnder: 'Herbert Hoover',
    party: 'R',
    fact: 'First VP with Native American heritage (Kaw Nation). Longest-serving VP until recent times.',
    tip: '🐾 Curtis wagged his TAIL proudly — first Native American VP!'
  },
  {
    n: 32,
    name: 'John Nance Garner',
    term: '1933–1941',
    servedUnder: 'Franklin D. Roosevelt',
    party: 'D',
    fact: 'Said the VP job was "not worth a bucket of warm spit." Served longer than any VP in history at the time.',
    tip: '🦶 Garner kicked his BACK PAWS — honest about his useless job!'
  },
  {
    n: 33,
    name: 'Henry A. Wallace',
    term: '1941–1945',
    servedUnder: 'Franklin D. Roosevelt',
    party: 'D',
    fact: 'Secretary of Agriculture before VP. Visionary thinker, pushed for civil rights.',
    tip: '🦵 Wallace ran on his HIND LEGS — pushing progressive ideas!'
  },
  {
    n: 34,
    name: 'Harry S. Truman',
    term: '1945',
    servedUnder: 'Franklin D. Roosevelt',
    party: 'D',
    fact: 'Became president when FDR died. Made the atomic bomb decision.',
    tip: '🍑 Truman sat on his RUMP — then stood up to lead the nation!'
  },
  {
    n: 35,
    name: 'Alben W. Barkley',
    term: '1949–1953',
    servedUnder: 'Harry S. Truman',
    party: 'D',
    fact: 'Charming, folksy VP. Known for his sense of humor.',
    tip: "🫃 Barkley's BELLY was full of jokes and charisma!"
  },
  {
    n: 36,
    name: 'Richard Nixon',
    term: '1953–1961',
    servedUnder: 'Dwight D. Eisenhower',
    party: 'R',
    fact: 'Survived "Checkers Speech" scandal. Later became president. Then resigned.',
    tip: '🔙 Nixon stayed in the BACK — plotting his rise!'
  },
  {
    n: 37,
    name: 'Lyndon B. Johnson',
    term: '1961–1963',
    servedUnder: 'John F. Kennedy',
    party: 'D',
    fact: "Became president after JFK's assassination. Passed Civil Rights Act.",
    tip: '💪 LBJ flexed his FRONT LEGS — dominating Texas politics!'
  },
  {
    n: 38,
    name: 'Hubert H. Humphrey',
    term: '1965–1969',
    servedUnder: 'Lyndon B. Johnson',
    party: 'D',
    fact: 'Civil rights champion. Ran for president in 1968, lost to Nixon.',
    tip: "❤️ Humphrey's CHEST swelled with civil rights passion!"
  },
  {
    n: 39,
    name: 'Spiro T. Agnew',
    term: '1969–1973',
    servedUnder: 'Richard Nixon',
    party: 'R',
    fact: 'Resigned in disgrace over tax evasion. Known for harsh rhetoric.',
    tip: '👂 Agnew wagged his EARS — attacking the media!'
  },
  {
    n: 40,
    name: 'Gerald Ford',
    term: '1973–1974',
    servedUnder: 'Richard Nixon',
    party: 'R',
    fact: 'Became president when Nixon resigned. Only president never elected to presidency.',
    tip: '👃 Ford had his SNOUT for facts — FBI agent turned president!'
  },

  // Batch 4: VPs 41–50
  {
    n: 41,
    name: 'Walter Mondale',
    term: '1977–1981',
    servedUnder: 'Jimmy Carter',
    party: 'D',
    fact: 'Close adviser to Carter. Ran for president in 1984, lost spectacularly.',
    tip: '🐾 Mondale wagged his TAIL — loyal to Carter!'
  },
  {
    n: 42,
    name: 'George H. W. Bush',
    term: '1981–1989',
    servedUnder: 'Ronald Reagan',
    party: 'R',
    fact: '"Voodoo economics" critic became VP. Later became 41st president.',
    tip: '🦶 Bush kicked with his BACK PAWS — from VP to president!'
  },
  {
    n: 43,
    name: 'Dan Quayle',
    term: '1989–1993',
    servedUnder: 'George H. W. Bush',
    party: 'R',
    fact: 'Mocked for misspelling potato. One-term VP. Later made comeback.',
    tip: '🦵 Quayle ran on his HIND LEGS — but tripped on spelling!'
  },
  {
    n: 44,
    name: 'Al Gore',
    term: '1993–2001',
    servedUnder: 'Bill Clinton',
    party: 'D',
    fact: 'Strong environmental advocate. Won Nobel Prize later for climate work.',
    tip: "🍑 Gore sat on his RUMP — worrying about Earth's future!"
  },
  {
    n: 45,
    name: 'Dick Cheney',
    term: '2001–2009',
    servedUnder: 'George W. Bush',
    party: 'R',
    fact: 'Former Secretary of Defense. Most powerful VP in modern history.',
    tip: "🫃 Cheney's BELLY was full of military might!"
  },
  {
    n: 46,
    name: 'Joe Biden',
    term: '2009–2017',
    servedUnder: 'Barack Obama',
    party: 'D',
    fact: 'First VP from Delaware. Became 46th president.',
    tip: '🔙 Biden stayed in the BACK — then stepped forward!'
  },
  {
    n: 47,
    name: 'Mike Pence',
    term: '2017–2021',
    servedUnder: 'Donald Trump',
    party: 'R',
    fact: 'Former Indiana governor. Presided over 2020 election certification.',
    tip: '💪 Pence flexed his FRONT LEGS — standing up for democracy!'
  },
  {
    n: 48,
    name: 'Kamala Harris',
    term: '2021–2025',
    servedUnder: 'Joe Biden',
    party: 'D',
    fact: 'First woman, Black, and South Asian vice president. Historic.',
    tip: "❤️ Harris's CHEST swells with pride — breaking barriers!"
  },
  {
    n: 49,
    name: 'JD Vance',
    term: '2025–',
    servedUnder: 'Donald Trump',
    party: 'R',
    fact: 'Author of Hillbilly Elegy. Former venture capitalist turned politician.',
    tip: '👂 Vance LISTENED to the heartland — EARS to the Rust Belt!'
  },
  {
    n: 50,
    name: 'Reserved',
    term: 'Future',
    servedUnder: 'Future',
    party: '?',
    fact: 'The 50th VP slot awaits the next chapter of American history.',
    tip: '👃 The future SNOUT leads the way!'
  }
];

// Batch groupings (10 per batch)
const BATCHES = [
  { n: 0, label: 'VPs 1–10', start: 0, count: 10 },
  { n: 1, label: 'VPs 11–20', start: 10, count: 10 },
  { n: 2, label: 'VPs 21–30', start: 20, count: 10 },
  { n: 3, label: 'VPs 31–40', start: 30, count: 10 },
  { n: 4, label: 'VPs 41–50', start: 40, count: 10 }
];

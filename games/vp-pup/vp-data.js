// VP Pup — Dog Town Data (50 US Vice Presidents)
/* eslint-disable no-unused-vars */

// 50 US Vice Presidents (John Adams → JD Vance)
const VPs = [
  // Block 0: Founding Alley (VPs 1–10)
  {
    n: 1,
    name: 'John Adams',
    term: '1789–1797',
    servedUnder: 'George Washington',
    party: 'F',
    fact: 'First VP and second president. Complained being VP was "the most insignificant office."',
    tip: 'Picture a dog in a RED house grumbling about his boring job — just like Adams!'
  },
  {
    n: 2,
    name: 'Thomas Jefferson',
    term: '1797–1801',
    servedUnder: 'John Adams',
    party: 'D-R',
    fact: 'Wrote the Declaration of Independence before becoming VP. Later the 3rd president.',
    tip: 'The ORANGE house has a quill pen over the door — Jefferson wrote the Declaration!'
  },
  {
    n: 3,
    name: 'Aaron Burr',
    term: '1801–1805',
    servedUnder: 'Thomas Jefferson',
    party: 'D-R',
    fact: 'Killed Alexander Hamilton in a famous duel. Only VP to be charged with murder.',
    tip: 'The YELLOW house has a duel pistol on the fence — Burr always got into trouble!'
  },
  {
    n: 4,
    name: 'George Clinton',
    term: '1805–1812',
    servedUnder: 'Thomas Jefferson, James Madison',
    party: 'D-R',
    fact: 'Served as VP under two different presidents. Died in office.',
    tip: 'The GREEN house has two welcome mats — Clinton served two presidents!'
  },
  {
    n: 5,
    name: 'Elbridge Gerry',
    term: '1813–1814',
    servedUnder: 'James Madison',
    party: 'D-R',
    fact: 'His name gave us the word "gerrymander" — unfair political districts.',
    tip: 'The TEAL house has a wiggly district map drawn on the door — Gerry gerrymandered!'
  },
  {
    n: 6,
    name: 'John Gaillard',
    term: '1814–1817',
    servedUnder: 'James Madison',
    party: 'D-R',
    fact: 'One of the least famous VPs. Served for only 3 years.',
    tip: 'The BLUE house is plain with no decorations — Gaillard was the forgettable VP!'
  },
  {
    n: 7,
    name: 'Daniel Tompkins',
    term: '1817–1825',
    servedUnder: 'James Monroe',
    party: 'D-R',
    fact: 'Also served as New York governor. Struggled with money problems.',
    tip: 'The PURPLE house has empty coin jars in the window — Tompkins had money troubles!'
  },
  {
    n: 8,
    name: 'John C. Calhoun',
    term: '1825–1832',
    servedUnder: 'John Quincy Adams, Andrew Jackson',
    party: 'D-R',
    fact: "Strong Southern senator. Passionate defender of states' rights.",
    tip: 'The PINK house flies a Southern flag — Calhoun was all about Southern pride!'
  },
  {
    n: 9,
    name: 'Martin Van Buren',
    term: '1833–1837',
    servedUnder: 'Andrew Jackson',
    party: 'D',
    fact: 'First president born as a US citizen. Political insider under Jackson.',
    tip: 'The BROWN house has giant ears on the door — Van Buren listened to everything!'
  },
  {
    n: 10,
    name: 'Richard Mentor Johnson',
    term: '1837–1841',
    servedUnder: 'Martin Van Buren',
    party: 'D',
    fact: 'War hero. Claimed to have killed the Shawnee chief Tecumseh.',
    tip: 'The GREY house has a war medal above the door — Johnson the war hero!'
  },

  // Block 1: Frontier Road (VPs 11–20)
  {
    n: 11,
    name: 'John Tyler',
    term: '1841',
    servedUnder: 'William Henry Harrison',
    party: 'W',
    fact: 'Became president when Harrison died 31 days into his term — first "accidental" president.',
    tip: 'The RED house has a surprise crown on the doorstep — Tyler accidentally became president!'
  },
  {
    n: 12,
    name: 'George M. Dallas',
    term: '1845–1849',
    servedUnder: 'James K. Polk',
    party: 'D',
    fact: 'His name inspired the city of Dallas, Texas.',
    tip: 'The ORANGE house has a Texas star on it — Dallas, Texas!'
  },
  {
    n: 13,
    name: 'Millard Fillmore',
    term: '1849–1850',
    servedUnder: 'Zachary Taylor',
    party: 'W',
    fact: 'Became president when Taylor died. Last Whig president.',
    tip: 'The YELLOW house has a "LAST WHIG" sign — Fillmore ended an era!'
  },
  {
    n: 14,
    name: 'William Rufus King',
    term: '1853',
    servedUnder: 'Franklin Pierce',
    party: 'D',
    fact: 'Died in office after serving only 45 days. Close friend of James Buchanan.',
    tip: 'The GREEN house has a very short welcome mat — King only lasted 45 days!'
  },
  {
    n: 15,
    name: 'John C. Breckinridge',
    term: '1857–1861',
    servedUnder: 'James Buchanan',
    party: 'D',
    fact: 'Youngest VP ever. Later led the pro-slavery faction.',
    tip: 'The TEAL house has a "YOUNGEST EVER" banner — Breckinridge was the baby VP!'
  },
  {
    n: 16,
    name: 'Hannibal Hamlin',
    term: '1861–1865',
    servedUnder: 'Abraham Lincoln',
    party: 'R',
    fact: "Served under Lincoln but wasn't re-nominated. Later served in Congress.",
    tip: "The BLUE house sits quietly in Lincoln's shadow — Hamlin was overshadowed!"
  },
  {
    n: 17,
    name: 'Andrew Johnson',
    term: '1865',
    servedUnder: 'Abraham Lincoln',
    party: 'R',
    fact: "Became president after Lincoln's assassination. Impeached.",
    tip: 'The PURPLE house has an impeachment notice on the door — Johnson was impeached!'
  },
  {
    n: 18,
    name: 'Schuyler Colfax',
    term: '1869–1873',
    servedUnder: 'Ulysses S. Grant',
    party: 'R',
    fact: 'Involved in the Credit Mobilier scandal. Dynamic politician.',
    tip: 'The PINK house has scandal newspapers piled at the door — Colfax got caught!'
  },
  {
    n: 19,
    name: 'Henry Wilson',
    term: '1873–1875',
    servedUnder: 'Ulysses S. Grant',
    party: 'R',
    fact: 'Started as a shoemaker. Rose through politics. Died in office.',
    tip: "The BROWN house has a shoemaker's sign — Wilson started at the bottom!"
  },
  {
    n: 20,
    name: 'Chester A. Arthur',
    term: '1877–1881',
    servedUnder: 'Rutherford B. Hayes',
    party: 'R',
    fact: "Became president after Garfield's assassination. Reformed the civil service.",
    tip: 'The GREY house has a fancy mustache door knocker — Arthur was famous for his style!'
  },

  // Block 2: Progress Lane (VPs 21–30)
  {
    n: 21,
    name: 'Chester A. Arthur',
    term: '1881',
    servedUnder: 'James A. Garfield',
    party: 'R',
    fact: 'Same Chester Arthur — served as VP again, then became president.',
    tip: 'The RED house AGAIN has the mustache knocker — Arthur appeared twice!'
  },
  {
    n: 22,
    name: 'Thomas A. Hendricks',
    term: '1885',
    servedUnder: 'Grover Cleveland',
    party: 'D',
    fact: 'Died in office after serving only 8 months.',
    tip: 'The ORANGE house has a very short calendar on the door — only 8 months!'
  },
  {
    n: 23,
    name: 'Adlai Ewing Stevenson I',
    term: '1893–1897',
    servedUnder: 'Grover Cleveland',
    party: 'D',
    fact: 'Ran for president twice, lost both times. Grandfather of the later VP.',
    tip: 'The YELLOW house has two LOSER trophies in the window — Stevenson ran twice!'
  },
  {
    n: 24,
    name: 'Garrett Hobart',
    term: '1897–1899',
    servedUnder: 'William McKinley',
    party: 'R',
    fact: 'Strong relationship with McKinley. Died in office.',
    tip: "The GREEN house is right next to McKinley's — best friends on the block!"
  },
  {
    n: 25,
    name: 'Theodore Roosevelt',
    term: '1901',
    servedUnder: 'William McKinley',
    party: 'R',
    fact: "Youngest president ever. Took office after McKinley's assassination.",
    tip: 'The TEAL house has a charging bull moose — TEDDY is here!'
  },
  {
    n: 26,
    name: 'James Sherman',
    term: '1909–1912',
    servedUnder: 'William Howard Taft',
    party: 'R',
    fact: 'Died just days before the 1912 election.',
    tip: 'The BLUE house has an unfinished election sign — Sherman died just before voting!'
  },
  {
    n: 27,
    name: 'James R. Sherman',
    term: '1912',
    servedUnder: 'William Howard Taft',
    party: 'R',
    fact: 'Note: same Sherman! Two entries because he spanned two administrations.',
    tip: 'The PURPLE house is identical to the blue one — same Sherman, different year!'
  },
  {
    n: 28,
    name: 'Thomas R. Marshall',
    term: '1913–1921',
    servedUnder: 'Woodrow Wilson',
    party: 'D',
    fact: 'Longest-serving VP of the era. Known for witty one-liners.',
    tip: 'The PINK house has a joke-of-the-day board — Marshall was full of wit!'
  },
  {
    n: 29,
    name: 'Calvin Coolidge',
    term: '1921–1923',
    servedUnder: 'Warren G. Harding',
    party: 'R',
    fact: 'Became president when Harding died. Known as "Silent Cal."',
    tip: "The BROWN house is totally quiet — no noise, no fuss. That's Silent Cal!"
  },
  {
    n: 30,
    name: 'Charles G. Dawes',
    term: '1925–1929',
    servedUnder: 'Calvin Coolidge',
    party: 'R',
    fact: 'Won Nobel Peace Prize for Dawes Plan (reparations). Also a composer and banker.',
    tip: 'The GREY house has Nobel Prize ribbons and a piano — Dawes won it all!'
  },

  // Block 3: New Deal Drive (VPs 31–40)
  {
    n: 31,
    name: 'Charles Curtis',
    term: '1929–1933',
    servedUnder: 'Herbert Hoover',
    party: 'R',
    fact: 'First VP with Native American heritage (Kaw Nation). A trailblazer.',
    tip: 'The RED house has Native American art on the door — Curtis broke new ground!'
  },
  {
    n: 32,
    name: 'John Nance Garner',
    term: '1933–1941',
    servedUnder: 'Franklin D. Roosevelt',
    party: 'D',
    fact: 'Said the VP job was "not worth a bucket of warm spit." Very honest.',
    tip: 'The ORANGE house has a bucket on the porch — Garner was brutally honest!'
  },
  {
    n: 33,
    name: 'Henry A. Wallace',
    term: '1941–1945',
    servedUnder: 'Franklin D. Roosevelt',
    party: 'D',
    fact: 'Secretary of Agriculture before VP. Pushed hard for civil rights.',
    tip: 'The YELLOW house has a civil rights banner — Wallace was ahead of his time!'
  },
  {
    n: 34,
    name: 'Harry S. Truman',
    term: '1945',
    servedUnder: 'Franklin D. Roosevelt',
    party: 'D',
    fact: 'Became president when FDR died. Made the atomic bomb decision.',
    tip: 'The GREEN house has a giant atom on the door — Truman made the big call!'
  },
  {
    n: 35,
    name: 'Alben W. Barkley',
    term: '1949–1953',
    servedUnder: 'Harry S. Truman',
    party: 'D',
    fact: 'Charming, folksy VP. Known for his sense of humor and storytelling.',
    tip: "The TEAL house has a storyteller's chair on the porch — Barkley loved to talk!"
  },
  {
    n: 36,
    name: 'Richard Nixon',
    term: '1953–1961',
    servedUnder: 'Dwight D. Eisenhower',
    party: 'R',
    fact: 'Survived "Checkers Speech" scandal. Later became president, then resigned.',
    tip: 'The BLUE house has a "CHECKERS" dog bowl on the step — Nixon\'s famous speech!'
  },
  {
    n: 37,
    name: 'Lyndon B. Johnson',
    term: '1961–1963',
    servedUnder: 'John F. Kennedy',
    party: 'D',
    fact: "Became president after JFK's assassination. Passed the Civil Rights Act.",
    tip: 'The PURPLE house has a cowboy hat on the door — LBJ, the Texas giant!'
  },
  {
    n: 38,
    name: 'Hubert H. Humphrey',
    term: '1965–1969',
    servedUnder: 'Lyndon B. Johnson',
    party: 'D',
    fact: 'Civil rights champion. Ran for president in 1968, narrowly lost to Nixon.',
    tip: 'The PINK house has a "VOTE FOR RIGHTS" sign — Humphrey the champion!'
  },
  {
    n: 39,
    name: 'Spiro T. Agnew',
    term: '1969–1973',
    servedUnder: 'Richard Nixon',
    party: 'R',
    fact: 'Resigned in disgrace over tax evasion. Known for attacking the media.',
    tip: 'The BROWN house has a "RESIGNED" notice on the door — Agnew had to go!'
  },
  {
    n: 40,
    name: 'Gerald Ford',
    term: '1973–1974',
    servedUnder: 'Richard Nixon',
    party: 'R',
    fact: 'Became president when Nixon resigned. Only president never elected to presidency.',
    tip: 'The GREY house has a "NEVER ELECTED" sign — Ford got there without a vote!'
  },

  // Block 4: Modern Mile (VPs 41–50)
  {
    n: 41,
    name: 'Walter Mondale',
    term: '1977–1981',
    servedUnder: 'Jimmy Carter',
    party: 'D',
    fact: 'Close adviser to Carter. Ran for president in 1984, lost in a landslide.',
    tip: 'The RED house has a loyal dog in the window — Mondale stuck by Carter!'
  },
  {
    n: 42,
    name: 'George H. W. Bush',
    term: '1981–1989',
    servedUnder: 'Ronald Reagan',
    party: 'R',
    fact: '"Voodoo economics" critic became VP, then 41st president.',
    tip: 'The ORANGE house has a "VP → PRESIDENT" path on the lawn — Bush made the leap!'
  },
  {
    n: 43,
    name: 'Dan Quayle',
    term: '1989–1993',
    servedUnder: 'George H. W. Bush',
    party: 'R',
    fact: 'Mocked for misspelling "potato." One-term VP.',
    tip: 'The YELLOW house has a potato with a spelling mistake — poor Quayle!'
  },
  {
    n: 44,
    name: 'Al Gore',
    term: '1993–2001',
    servedUnder: 'Bill Clinton',
    party: 'D',
    fact: 'Strong environmental advocate. Won Nobel Peace Prize for climate work.',
    tip: 'The GREEN house is covered in solar panels and plants — Al Gore saves Earth!'
  },
  {
    n: 45,
    name: 'Dick Cheney',
    term: '2001–2009',
    servedUnder: 'George W. Bush',
    party: 'R',
    fact: 'Former Secretary of Defense. Considered the most powerful modern VP.',
    tip: 'The TEAL house has armor on the door — Cheney was the power behind the throne!'
  },
  {
    n: 46,
    name: 'Joe Biden',
    term: '2009–2017',
    servedUnder: 'Barack Obama',
    party: 'D',
    fact: 'First VP from Delaware. Later became the 46th president.',
    tip: 'The BLUE house has ice cream in the window — Biden loves his ice cream!'
  },
  {
    n: 47,
    name: 'Mike Pence',
    term: '2017–2021',
    servedUnder: 'Donald Trump',
    party: 'R',
    fact: 'Former Indiana governor. Presided over the 2020 election certification.',
    tip: 'The PURPLE house has a firm "DUTY DONE" sign — Pence stood firm!'
  },
  {
    n: 48,
    name: 'Kamala Harris',
    term: '2021–2025',
    servedUnder: 'Joe Biden',
    party: 'D',
    fact: 'First woman, Black, and South Asian vice president. Historic.',
    tip: 'The PINK house has a "FIRST EVER" banner — Harris made history!'
  },
  {
    n: 49,
    name: 'JD Vance',
    term: '2025–',
    servedUnder: 'Donald Trump',
    party: 'R',
    fact: 'Author of Hillbilly Elegy. Former venture capitalist turned politician.',
    tip: 'The BROWN house has a book titled "Hillbilly Elegy" on the porch — that\'s Vance!'
  },
  {
    n: 50,
    name: 'Reserved',
    term: 'Future',
    servedUnder: 'Future',
    party: '?',
    fact: 'The 50th house on Modern Mile is waiting for the next chapter of history.',
    tip: 'The GREY house has a "COMING SOON" sign — history is still being written!'
  }
];

// Batch groupings (5 blocks of 10)
const BATCHES = [
  { n: 0, label: 'VPs 1–10', start: 0, count: 10 },
  { n: 1, label: 'VPs 11–20', start: 10, count: 10 },
  { n: 2, label: 'VPs 21–30', start: 20, count: 10 },
  { n: 3, label: 'VPs 31–40', start: 30, count: 10 },
  { n: 4, label: 'VPs 41–50', start: 40, count: 10 }
];

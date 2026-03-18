/* eslint-disable no-undef */
/* ═══════════════════════════════════════════════════
   FLAG MASTERS - World Country Flag Learning Game
   CHAPTERS - 21 regional learning batches
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
   COUNTRIES - All 195+ countries with flags & tips
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
    tip: 'Blue, White, Red — the TRICOLORE! 🎨 Three equal stripes standing for Liberty, Equality, and Fraternity.'
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    isoNum: '826',
    flag: '🇬🇧',
    continent: 'europe',
    chapter: 'eu-1',
    tip: "The UNION JACK! 🇬🇧 Three crosses layered — England's cross, Scotland's saltire, and Ireland's cross all together!"
  },
  {
    id: 'ireland',
    name: 'Ireland',
    isoNum: '372',
    flag: '🇮🇪',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Green, White, Orange — the TRICOLOR! 🍀 Green for Irish heritage, White for peace, Orange for William of Orange.'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    isoNum: '528',
    flag: '🇳🇱',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Red, White, Blue — horizontal stripes! 🌊 The Dutch flag inspired Russia, Netherlands and France all share this pattern!'
  },
  {
    id: 'belgium',
    name: 'Belgium',
    isoNum: '56',
    flag: '🇧🇪',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Black, Yellow, Red — horizontal stripes! 🍫 The tallest flag in the world (width-to-height ratio)!'
  },
  {
    id: 'germany',
    name: 'Germany',
    isoNum: '276',
    flag: '🇩🇪',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Black, Red, Gold — top to bottom! ⭐ The colors represent unity and freedom after the 1848 revolution!'
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg',
    isoNum: '442',
    flag: '🇱🇺',
    continent: 'europe',
    chapter: 'eu-1',
    tip: "Red, White, Blue — horizontal stripes! 👑 One of the world's richest nations, tiny but mighty!"
  },
  {
    id: 'denmark',
    name: 'Denmark',
    isoNum: '208',
    flag: '🇩🇰',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Dannebrog — Red with white cross! ✝️ One of the oldest flags in the world, dating back to the 13th century!'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    isoNum: '756',
    flag: '🇨🇭',
    continent: 'europe',
    chapter: 'eu-1',
    tip: 'Red with white cross! ✝️ The only square flag in the world (well, almost). White cross = neutrality!'
  },
  {
    id: 'austria',
    name: 'Austria',
    isoNum: '40',
    flag: '🇦🇹',
    continent: 'europe',
    chapter: 'eu-1',
    tip: "Red-White-Red horizontal stripes! 🎯 The white stripe is supposed to represent a blood-soaked Emperor's belt!"
  },

  // EUROPE - Part 2 (Southern Europe)
  {
    id: 'spain',
    name: 'Spain',
    isoNum: '724',
    flag: '🇪🇸',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Red, Yellow, Red! 🌟 The yellow stripe is twice as thick as the red stripes, symbolizing strength!'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    isoNum: '620',
    flag: '🇵🇹',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Green and red split vertically! 🛡️ The shield in the middle has 7 small crosses representing seven victories!'
  },
  {
    id: 'italy',
    name: 'Italy',
    isoNum: '380',
    flag: '🇮🇹',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Green, White, Red — same as France but different! 🤌 Think: Italian forests, Alps, and wine!'
  },
  {
    id: 'greece',
    name: 'Greece',
    isoNum: '300',
    flag: '🇬🇷',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Blue and white with a cross! ✝️ 9 stripes represent the 9 syllables of the Greek war cry! Ocean blue!'
  },
  {
    id: 'malta',
    name: 'Malta',
    isoNum: '470',
    flag: '🇲🇹',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Red and White split vertically! ⚪ Tiny island nation with a simple, bold design. Center has a George Cross!'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    isoNum: '196',
    flag: '🇨🇾',
    continent: 'europe',
    chapter: 'eu-2',
    tip: "White with olive branches and copper island map! 🥬 The copper-colored island represents the island's mineral wealth!"
  },
  {
    id: 'vatican-city',
    name: 'Vatican City',
    isoNum: '336',
    flag: '🇻🇦',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'Yellow and White with the Papal Tiara and Keys! ⛪ Smallest country in the world with its own flag!'
  },
  {
    id: 'san-marino',
    name: 'San Marino',
    isoNum: '674',
    flag: '🇸🇲',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'White and Blue with three peaks and a crown! 👑 One of the oldest republics in the world!'
  },
  {
    id: 'slovenia',
    name: 'Slovenia',
    isoNum: '705',
    flag: '🇸🇮',
    continent: 'europe',
    chapter: 'eu-2',
    tip: 'White, Blue, Red with Mount Triglav and a star! ⭐ The mountain is the highest peak in Slovenia!'
  },

  // EUROPE - Part 3 (Central Europe)
  {
    id: 'poland',
    name: 'Poland',
    isoNum: '616',
    flag: '🇵🇱',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'White above Red! Inverted from Indonesia! 🔄 The white represents hope, the red represents strength!'
  },
  {
    id: 'czech-republic',
    name: 'Czech Republic',
    isoNum: '203',
    flag: '🇨🇿',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'White, Red with a blue triangle! 🔵 The triangle points left and represents the old Bohemian flag!'
  },
  {
    id: 'slovakia',
    name: 'Slovakia',
    isoNum: '703',
    flag: '🇸🇰',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'White, Blue, Red with a national shield! 🛡️ The shield shows three crowns for three ancient kingdoms!'
  },
  {
    id: 'hungary',
    name: 'Hungary',
    isoNum: '348',
    flag: '🇭🇺',
    continent: 'europe',
    chapter: 'eu-3',
    tip: "Red, White, Blue horizontal stripes! 🎨 Same as Austria's tricolor pattern, representing historical ties!"
  },
  {
    id: 'romania',
    name: 'Romania',
    isoNum: '642',
    flag: '🇷🇴',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Blue, Yellow, Red vertical stripes! 🌍 Remember: BYR for Blue, Yellow, Red — alphabetical order!'
  },
  {
    id: 'croatia',
    name: 'Croatia',
    isoNum: '191',
    flag: '🇭🇷',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Red, White, Blue with a checkered shield! ♟️ The shield has 5 smaller shields representing historic regions!'
  },
  {
    id: 'bosnia-and-herzegovina',
    name: 'Bosnia and Herzegovina',
    isoNum: '070',
    flag: '🇧🇦',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Blue with yellow triangle and stars! ⭐ The triangle points up and the stars never end (infinite stars)!'
  },
  {
    id: 'serbia',
    name: 'Serbia',
    isoNum: '688',
    flag: '🇷🇸',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Red, White, Blue with the royal coat of arms! 🛡️ An eagle with a shield on the flag!'
  },
  {
    id: 'montenegro',
    name: 'Montenegro',
    isoNum: '499',
    flag: '🇲🇪',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Red with a golden double-headed eagle! 🦅 The eagle is holding a scepter and orb symbolizing power!'
  },
  {
    id: 'north-macedonia',
    name: 'North Macedonia',
    isoNum: '807',
    flag: '🇲🇰',
    continent: 'europe',
    chapter: 'eu-3',
    tip: 'Red with a golden star! ⭐ The star has 8 rays and is surrounded by a golden sun!'
  },

  // EUROPE - Part 4 (Eastern Europe)
  {
    id: 'ukraine',
    name: 'Ukraine',
    isoNum: '804',
    flag: '🇺🇦',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Blue above Yellow! 🌻 The blue represents sky and the yellow represents wheat fields!'
  },
  {
    id: 'moldova',
    name: 'Moldova',
    isoNum: '498',
    flag: '🇲🇩',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Blue, Yellow, Red with an eagle shield! 🦅 The eagle is holding an olive branch!'
  },
  {
    id: 'russia',
    name: 'Russia',
    isoNum: '643',
    flag: '🇷🇺',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'White, Blue, Red horizontal stripes! 🎨 The widest country flag, representing a free nation!'
  },
  {
    id: 'belarus',
    name: 'Belarus',
    isoNum: '112',
    flag: '🇧🇾',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Red and White with a red pattern! 🎯 The pattern on the left represents traditional Belarusian art!'
  },
  {
    id: 'lithuania',
    name: 'Lithuania',
    isoNum: '440',
    flag: '🇱🇹',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Yellow, Red, Red horizontal stripes! 🌅 Yellow for the sun, red for courage and love!'
  },
  {
    id: 'latvia',
    name: 'Latvia',
    isoNum: '428',
    flag: '🇱🇻',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Red-White-Red (cardinals) with white stripe! ⚪ The white is much narrower than the red stripes!'
  },
  {
    id: 'estonia',
    name: 'Estonia',
    isoNum: '233',
    flag: '🇪🇪',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Blue, Black, White horizontal stripes! 🎨 Blue for loyalty, black for hard times, white for hope!'
  },
  {
    id: 'albania',
    name: 'Albania',
    isoNum: '008',
    flag: '🇦🇱',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Red with a black double-headed eagle! 🦅 The eagle is a national symbol of strength and freedom!'
  },
  {
    id: 'kosovo',
    name: 'Kosovo',
    isoNum: '383',
    flag: '🇽🇰',
    continent: 'europe',
    chapter: 'eu-4',
    tip: 'Blue with a golden map and 6 stars! ⭐ The 6 stars represent the 6 major ethnic groups!'
  },

  // EUROPE - Part 5 (Nordic & Caucasus)
  {
    id: 'norway',
    name: 'Norway',
    isoNum: '578',
    flag: '🇳🇴',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'Red, Blue, White with a Nordic cross! ✝️ The blue cross outlined in white represents Scandinavian unity!'
  },
  {
    id: 'sweden',
    name: 'Sweden',
    isoNum: '752',
    flag: '🇸🇪',
    continent: 'europe',
    chapter: 'eu-5',
    tip: "Blue and Yellow with a cross! ✝️ The cross is offset and represents the country's ancient symbol!"
  },
  {
    id: 'finland',
    name: 'Finland',
    isoNum: '246',
    flag: '🇫🇮',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'White with a blue Nordic cross! ✝️ The cross is offset toward the hoist like other Nordic countries!'
  },
  {
    id: 'iceland',
    name: 'Iceland',
    isoNum: '352',
    flag: '🇮🇸',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'Blue with a white-outlined red cross! ✝️ The colors represent the volcanic fire and icy snow!'
  },
  {
    id: 'georgia',
    name: 'Georgia',
    isoNum: '268',
    flag: '🇬🇪',
    continent: 'europe',
    chapter: 'eu-5',
    tip: 'White with red crosses! ✝️ The large cross is the Georgian flag, small crosses in corners are ancient symbols!'
  },
  {
    id: 'armenia',
    name: 'Armenia',
    isoNum: '051',
    flag: '🇦🇲',
    continent: 'europe',
    chapter: 'eu-5',
    tip: "Red, Blue, Orange horizontal stripes! 🌈 Red for blood, blue for hope, orange for the Armenian people's character!"
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
    tip: 'Red with a green pentagram! 🌟 Green represents Islam, the star is the Seal of Solomon!'
  },
  {
    id: 'algeria',
    name: 'Algeria',
    isoNum: '012',
    flag: '🇩🇿',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Green and White with red crescent and star! ☪️ The crescent and star are Islamic symbols!'
  },
  {
    id: 'tunisia',
    name: 'Tunisia',
    isoNum: '788',
    flag: '🇹🇳',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Red with a white circle containing a crescent and star! ☪️ The white represents the shield of Islam!'
  },
  {
    id: 'libya',
    name: 'Libya',
    isoNum: '434',
    flag: '🇱🇾',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Red, Black, Green with a white crescent and star! ☪️ Red represents the revolution against colonialism!'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    isoNum: '818',
    flag: '🇪🇬',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Red, White, Black with a gold eagle! 🦅 The eagle is the symbol of power and strength!'
  },
  {
    id: 'sudan',
    name: 'Sudan',
    isoNum: '729',
    flag: '🇸🇩',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Red, White, Black with a green triangle! 🔺 The triangle represents Islam and progress!'
  },
  {
    id: 'south-sudan',
    name: 'South Sudan',
    isoNum: '728',
    flag: '🇸🇸',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Black, White, Red with a blue triangle and star! ⭐ The star represents unity and hope!'
  },
  {
    id: 'mauritania',
    name: 'Mauritania',
    isoNum: '478',
    flag: '🇲🇷',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Green with a red stripe and white crescent and star! ☪️ Green is dominant, representing Islam!'
  },
  {
    id: 'djibouti',
    name: 'Djibouti',
    isoNum: '262',
    flag: '🇩🇯',
    continent: 'africa',
    chapter: 'af-1',
    tip: 'Light Blue, Light Green with a white triangle and red star! ⭐ The blue and green represent the two main groups!'
  },

  // AFRICA - Part 2 (West Africa)
  {
    id: 'mauritius',
    name: 'Mauritius',
    isoNum: '480',
    flag: '🇲🇺',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Red, Blue, Yellow, Green horizontal stripes! 🌈 The colors represent the diversity of the island!'
  },
  {
    id: 'senegal',
    name: 'Senegal',
    isoNum: '686',
    flag: '🇸🇳',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Green, Yellow, Red with a green star! ⭐ The star represents the guiding light of the nation!'
  },
  {
    id: 'guinea-bissau',
    name: 'Guinea-Bissau',
    isoNum: '624',
    flag: '🇬🇼',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Red, Yellow, Green with a black star! ⭐ The red represents struggle, yellow is the sun, green is hope!'
  },
  {
    id: 'guinea',
    name: 'Guinea',
    isoNum: '324',
    flag: '🇬🇳',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Red, Yellow, Green vertical stripes! 🌈 The colors represent blood, minerals, and vegetation!'
  },
  {
    id: 'sierra-leone',
    name: 'Sierra Leone',
    isoNum: '694',
    flag: '🇸🇱',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Green, White, Blue horizontal stripes! 🌊 Green for agriculture, white for unity, blue for the Atlantic Ocean!'
  },
  {
    id: 'liberia',
    name: 'Liberia',
    isoNum: '430',
    flag: '🇱🇷',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Red and White with a blue square and white star! ⭐ Founded by freed American slaves, the flag resembles the US flag!'
  },
  {
    id: 'mali',
    name: 'Mali',
    isoNum: '466',
    flag: '🇲🇱',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Green, Yellow, Red vertical stripes! 🌈 Same colors as Guinea and Senegal, representing Pan-African unity!'
  },
  {
    id: 'ivory-coast',
    name: 'Ivory Coast',
    isoNum: '384',
    flag: '🇨🇮',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Orange, White, Green vertical stripes! 🌊 Orange is the land, white is peace, green is hope!'
  },
  {
    id: 'burkina-faso',
    name: 'Burkina Faso',
    isoNum: '854',
    flag: '🇧🇫',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Red and Green with a yellow star! ⭐ The star represents the guiding light and the hope of the people!'
  },
  {
    id: 'ghana',
    name: 'Ghana',
    isoNum: '288',
    flag: '🇬🇭',
    continent: 'africa',
    chapter: 'af-2',
    tip: 'Red, Yellow, Green with a black star! ⭐ The star represents African freedom!'
  },

  // AFRICA - Part 3 (Central Africa)
  {
    id: 'niger',
    name: 'Niger',
    isoNum: '562',
    flag: '🇳🇪',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Orange, White, Green with an orange circle! 🟠 The circle represents the sun rising over the Sahara!'
  },
  {
    id: 'togo',
    name: 'Togo',
    isoNum: '768',
    flag: '🇹🇬',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Green, Yellow, Red with a white star! ⭐ The star represents hope for a better future!'
  },
  {
    id: 'benin',
    name: 'Benin',
    isoNum: '204',
    flag: '🇧🇯',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Green, Yellow, Red vertical stripes! 🌈 The green represents palm trees, yellow the soil, red the blood!'
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    isoNum: '566',
    flag: '🇳🇬',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Green, White, Green vertical stripes! 🌳 The white represents peace and unity between the green halves!'
  },
  {
    id: 'cameroon',
    name: 'Cameroon',
    isoNum: '120',
    flag: '🇨🇲',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Green, Red, Yellow vertical stripes with a yellow star! ⭐ The star unites the colors in the center!'
  },
  {
    id: 'central-african-republic',
    name: 'Central African Republic',
    isoNum: '140',
    flag: '🇨🇫',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Blue, White, Green, Yellow, Red with a vertical red stripe and yellow star! ⭐ Unique four-color design!'
  },
  {
    id: 'congo',
    name: 'Congo (Republic)',
    isoNum: '178',
    flag: '🇨🇬',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Green, Yellow, Red diagonal stripes! 🎨 The diagonal design is unique in African flags!'
  },
  {
    id: 'democratic-republic-congo',
    name: 'Democratic Republic of Congo',
    isoNum: '180',
    flag: '🇨🇩',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Blue with a yellow stripe and yellow star! ⭐ The star is large and centered, representing unity!'
  },
  {
    id: 'gabon',
    name: 'Gabon',
    isoNum: '266',
    flag: '🇬🇦',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Green, Yellow, Blue horizontal stripes! 🌊 The stripes represent the forests, sun, and Atlantic Ocean!'
  },
  {
    id: 'equatorial-guinea',
    name: 'Equatorial Guinea',
    isoNum: '226',
    flag: '🇬🇶',
    continent: 'africa',
    chapter: 'af-3',
    tip: 'Light Blue, White, Red with a green triangle and coat of arms! 🛡️ The triangle is on the hoist side!'
  },

  // AFRICA - Part 4 (East Africa)
  {
    id: 'sao-tome-and-principe',
    name: 'São Tomé and Príncipe',
    isoNum: '678',
    flag: '🇸🇹',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Green, Yellow, Green with a red triangle and two black stars! ⭐ The stars represent the two main islands!'
  },
  {
    id: 'chad',
    name: 'Chad',
    isoNum: '148',
    flag: '🇹🇩',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Blue, Yellow, Red vertical stripes! 🌈 Same colors as Romania but opposite order!'
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    isoNum: '231',
    flag: '🇪🇹',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Green, Yellow, Red horizontal stripes with a circle and star! ⭐ The circle contains a cross and star!'
  },
  {
    id: 'eritrea',
    name: 'Eritrea',
    isoNum: '232',
    flag: '🇪🇷',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Red, Green, Blue with a yellow star and olive branches! ⭐ The star represents the unity of the people!'
  },
  {
    id: 'uganda',
    name: 'Uganda',
    isoNum: '800',
    flag: '🇺🇬',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Black, Yellow, Red with a white disc and grey crowned crane! 🦢 The crane is the national bird!'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    isoNum: '404',
    flag: '🇰🇪',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Black, Red, Green with white bands and a Maasai shield and spears! 🛡️ The shield represents protection!'
  },
  {
    id: 'somalia',
    name: 'Somalia',
    isoNum: '706',
    flag: '🇸🇴',
    continent: 'africa',
    chapter: 'af-4',
    tip: "Light Blue with a white star! ⭐ The light blue is the UN color, representing Somalia's UN membership!"
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    isoNum: '834',
    flag: '🇹🇿',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Light Green, Yellow, Black, Blue diagonal stripes! 🌈 The diagonal band is unique and represents minerals!'
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
    isoNum: '508',
    flag: '🇲🇿',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Green, Black, Yellow with a white triangle and rifle! 🔫 The rifle represents the armed struggle for independence!'
  },
  {
    id: 'malawi',
    name: 'Malawi',
    isoNum: '454',
    flag: '🇲🇼',
    continent: 'africa',
    chapter: 'af-4',
    tip: 'Black, Red, Green with a sun! 🌅 The sun is red and represents a new dawn for the nation!'
  },

  // AFRICA - Part 5 (Southern Africa)
  {
    id: 'zambia',
    name: 'Zambia',
    isoNum: '894',
    flag: '🇿🇲',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Green, Black, Red, Orange with an eagle! 🦅 The eagle represents freedom and the spirit of the nation!'
  },
  {
    id: 'zimbabwe',
    name: 'Zimbabwe',
    isoNum: '716',
    flag: '🇿🇼',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Green, Yellow, Red, Black with a white star and bird! ⭐ The bird is the Great Zimbabwe bird!'
  },
  {
    id: 'botswana',
    name: 'Botswana',
    isoNum: '072',
    flag: '🇧🇼',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Light Blue, White, Black horizontal stripes! ⚪ The black and white represent the people, blue is the sky and water!'
  },
  {
    id: 'namibia',
    name: 'Namibia',
    isoNum: '516',
    flag: '🇳🇦',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Blue, Red, Green diagonal with a gold sun! ☀️ The sun represents life and energy!'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    isoNum: '710',
    flag: '🇿🇦',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Six colors with a Y-shape! 🎨 The Y unites all the colors, representing the unity of all people!'
  },
  {
    id: 'lesotho',
    name: 'Lesotho',
    isoNum: '426',
    flag: '🇱🇸',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Blue, White, Green with a brown shield! 🛡️ The shield contains a crocodile and spears!'
  },
  {
    id: 'eswatini',
    name: 'Eswatini',
    isoNum: '748',
    flag: '🇸🇿',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Blue, Yellow, Red with a shield and staff! 🛡️ The shield is a royal shield with a spear and staff!'
  },
  {
    id: 'madagascar',
    name: 'Madagascar',
    isoNum: '450',
    flag: '🇲🇬',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Red, White, Green vertical stripes! 🌈 Red represents the soil, white is peace, green is hope!'
  },
  {
    id: 'mauritius-island',
    name: 'Mauritius',
    isoNum: '480',
    flag: '🇲🇺',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Red, Blue, Yellow, Green horizontal stripes! 🌈 The colors represent the diversity of the island!'
  },
  {
    id: 'seychelles',
    name: 'Seychelles',
    isoNum: '690',
    flag: '🇸🇨',
    continent: 'africa',
    chapter: 'af-5',
    tip: 'Blue, Yellow, Red, White, Green radiating from the hoist! 🌈 The unique radiating design is one-of-a-kind!'
  },

  // AFRICA - Part 6 (Island Nations & Special)
  {
    id: 'cape-verde',
    name: 'Cape Verde',
    isoNum: '132',
    flag: '🇨🇻',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Blue with a white strip containing a black band and yellow stars! ⭐ The stars represent the main islands!'
  },
  {
    id: 'comoros',
    name: 'Comoros',
    isoNum: '174',
    flag: '🇰🇲',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Green, White, Red, Blue with a yellow crescent and stars! ☪️ The crescent faces up and the stars shine!'
  },
  {
    id: 'reunion',
    name: 'Réunion',
    isoNum: '638',
    flag: '🇷🇪',
    continent: 'africa',
    chapter: 'af-6',
    tip: "This is technically an overseas department of France, so it doesn't have its own flag! 🇫🇷 Uses the French flag!"
  },
  {
    id: 'mayotte',
    name: 'Mayotte',
    isoNum: '175',
    flag: '🇾🇹',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Red and White! 🔴 A collectivity of France, so it also uses the French flag predominantly!'
  },
  {
    id: 'mauritius-af6',
    name: 'Mauritius',
    isoNum: '480',
    flag: '🇲🇺',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Red, Blue, Yellow, Green horizontal stripes! 🌈 A four-stripe island nation in the Indian Ocean!'
  },
  {
    id: 'st-helena',
    name: 'Saint Helena',
    isoNum: '654',
    flag: '🇸🇭',
    continent: 'africa',
    chapter: 'af-6',
    tip: 'Blue with the British flag in corner and a white cross and shield! 🛡️ British Overseas Territory!'
  },

  // ═══════════════════════════════════════════
  // ASIA - Part 1 (Southeast Asia)
  // ═══════════════════════════════════════════
  {
    id: 'timor-leste',
    name: 'Timor-Leste',
    isoNum: '626',
    flag: '🇹🇱',
    continent: 'asia',
    chapter: 'as-1',
    tip: "Red and Yellow with a black triangle and white star! ⭐ The triangle represents the nation's journey to independence!"
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    isoNum: '360',
    flag: '🇮🇩',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Red above White! 🔴 Simple but bold — the red represents blood, white represents purity!'
  },
  {
    id: 'philippines',
    name: 'Philippines',
    isoNum: '608',
    flag: '🇵🇭',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Blue, Yellow, Red, White with a sun and three stars! ⭐ The sun has 8 rays representing the first 8 provinces!'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    isoNum: '458',
    flag: '🇲🇾',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Blue, Yellow with a crescent and star and stripes! ⭐ The crescent and star represent Islam and unity!'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    isoNum: '702',
    flag: '🇸🇬',
    continent: 'asia',
    chapter: 'as-1',
    tip: "Red and White with a crescent moon and five stars! ☪️ The five stars represent the nation's ideals!"
  },
  {
    id: 'brunei',
    name: 'Brunei',
    isoNum: '096',
    flag: '🇧🇳',
    continent: 'asia',
    chapter: 'as-1',
    tip: "Yellow with black and white bands and a red emblem! 🛡️ The emblem contains the sultan's crown!"
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
    isoNum: '104',
    flag: '🇲🇲',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Yellow, Green, Red with a white star! ⭐ The star represents the unity of the nation!'
  },
  {
    id: 'laos',
    name: 'Laos',
    isoNum: '418',
    flag: '🇱🇦',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Red, Blue, Red with a white circle! ⚪ The circle represents the full moon and unity!'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    isoNum: '764',
    flag: '🇹🇭',
    continent: 'asia',
    chapter: 'as-1',
    tip: 'Red, White, Blue horizontal stripes! 🎨 The blue stripe is twice as thick as the red stripes!'
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    isoNum: '116',
    flag: '🇰🇭',
    continent: 'asia',
    chapter: 'as-1',
    tip: "Red and Blue with the Angkor Wat temple! 🏛️ The temple is the national symbol and the world's largest religious monument!"
  },

  // ASIA - Part 2 (South Asia)
  {
    id: 'vietnam',
    name: 'Vietnam',
    isoNum: '704',
    flag: '🇻🇳',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Red with a yellow star! ⭐ The star represents communism, and the red is the color of revolution!'
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    isoNum: '050',
    flag: '🇧🇩',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Green with a red circle! 🔴 The red circle represents the blood of those who fought for independence!'
  },
  {
    id: 'india',
    name: 'India',
    isoNum: '356',
    flag: '🇮🇳',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Orange, White, Green with a blue Ashoka Chakra! 🔵 The wheel has 24 spokes representing the 24 hours!'
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    isoNum: '586',
    flag: '🇵🇰',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Green and White with a crescent and star! ☪️ Green represents Islam and white represents minorities!'
  },
  {
    id: 'nepal',
    name: 'Nepal',
    isoNum: '524',
    flag: '🇳🇵',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Two stacked triangles in crimson with a white moon and star! ⭐ The only non-rectangular flag in the world!'
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
    isoNum: '064',
    flag: '🇧🇹',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Yellow and Orange with a white dragon! 🐉 The dragon is the national symbol and represents power!'
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    isoNum: '144',
    flag: '🇱🇰',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Green and Saffron with a lion holding a sword! 🦁 The lion is the national symbol representing strength!'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    isoNum: '462',
    flag: '🇲🇻',
    continent: 'asia',
    chapter: 'as-2',
    tip: 'Red and Green with a white crescent! ☪️ The crescent represents Islam and the green is for the nation!'
  },

  // ASIA - Part 3 (East Asia)
  {
    id: 'china',
    name: 'China',
    isoNum: '156',
    flag: '🇨🇳',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Red with five yellow stars! ⭐ The large star represents the Communist Party, four smaller stars represent the people!'
  },
  {
    id: 'japan',
    name: 'Japan',
    isoNum: '392',
    flag: '🇯🇵',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'White with a red circle! 🌅 The RISING SUN! The simplest flag in the world and one of the most recognizable!'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    isoNum: '410',
    flag: '🇰🇷',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'White with a red and blue yin-yang symbol! ☯️ The symbol represents balance between opposing forces!'
  },
  {
    id: 'north-korea',
    name: 'North Korea',
    isoNum: '408',
    flag: '🇰🇵',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Red, White, Blue with a red star! ⭐ The star represents communism and the ideals of the nation!'
  },
  {
    id: 'mongolia',
    name: 'Mongolia',
    isoNum: '496',
    flag: '🇲🇳',
    continent: 'asia',
    chapter: 'as-3',
    tip: "Red with a blue stripe and yellow symbol! 🟡 The symbol is the Soyombo, representing Mongolia's identity!"
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    isoNum: '158',
    flag: '🇹🇼',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Red and Blue with a white sun! ☀️ The sun represents the spirit of the people and the future!'
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    isoNum: '344',
    flag: '🇭🇰',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Red with a white bauhinia flower! 🌸 The flower is the national emblem and represents Hong Kong!'
  },
  {
    id: 'macau',
    name: 'Macau',
    isoNum: '446',
    flag: '🇲🇴',
    continent: 'asia',
    chapter: 'as-3',
    tip: 'Green and White with a lotus flower and crescent! 🌸 The lotus is a symbol of purity and resilience!'
  },

  // ASIA - Part 4 (Middle East)
  {
    id: 'turkey',
    name: 'Turkey',
    isoNum: '792',
    flag: '🇹🇷',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Red with a white crescent and star! ⭐ The crescent and star are Islamic symbols representing Islam!'
  },
  {
    id: 'israel',
    name: 'Israel',
    isoNum: '376',
    flag: '🇮🇱',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'White and Blue with a blue Star of David! ✡️ The star has six points and is a Jewish symbol!'
  },
  {
    id: 'palestine',
    name: 'Palestine',
    isoNum: '275',
    flag: '🇵🇸',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Black, White, Green with a red triangle! 🔺 The colors represent Arab unity and the Palestinian struggle!'
  },
  {
    id: 'jordan',
    name: 'Jordan',
    isoNum: '400',
    flag: '🇯🇴',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Black, White, Green with a white star and red triangle! ⭐ The triangle represents the Arab Revolt!'
  },
  {
    id: 'lebanon',
    name: 'Lebanon',
    isoNum: '422',
    flag: '🇱🇧',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Red and White with a green cedar tree! 🌲 The cedar is the national symbol and represents strength!'
  },
  {
    id: 'syria',
    name: 'Syria',
    isoNum: '760',
    flag: '🇸🇾',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Red, White, Black with red stars! ⭐ The stars represent unity, the black represents the oppression!'
  },
  {
    id: 'iraq',
    name: 'Iraq',
    isoNum: '368',
    flag: '🇮🇶',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Red, White, Black with green stars and an inscription! 🟢 The colors represent Arab unity!'
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    isoNum: '682',
    flag: '🇸🇦',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Green with white Arabic text and a sword! ⚔️ Green is the color of Islam and the sword represents strength!'
  },
  {
    id: 'yemen',
    name: 'Yemen',
    isoNum: '887',
    flag: '🇾🇪',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Red, White, Black horizontal stripes! 🎨 The colors represent Arab unity, same as Egypt and Sudan!'
  },
  {
    id: 'oman',
    name: 'Oman',
    isoNum: '512',
    flag: '🇴🇲',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Red, White, Green with a national emblem! 🛡️ The emblem features a crossed khanj and two swords!'
  },
  {
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
    isoNum: '784',
    flag: '🇦🇪',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Red, Green, White, Black with a vertical red stripe! 🎨 The colors represent Arab unity and independence!'
  },
  {
    id: 'qatar',
    name: 'Qatar',
    isoNum: '634',
    flag: '🇶🇦',
    continent: 'asia',
    chapter: 'as-4',
    tip: 'Maroon and White with a serrated line! 🟪 The white band represents peace, maroon represents blood!'
  },

  // ASIA - Part 5 (Central Asia & Caucasus)
  {
    id: 'bahrain',
    name: 'Bahrain',
    isoNum: '048',
    flag: '🇧🇭',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'White and Brown with a serrated line! 🟤 The serrated line represents the teeth of a saw or pearls!'
  },
  {
    id: 'kuwait',
    name: 'Kuwait',
    isoNum: '414',
    flag: '🇰🇼',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Green, White, Black with a red trapezoid! 🎨 The colors represent Arab unity, the trapezoid is unique!'
  },
  {
    id: 'iran',
    name: 'Iran',
    isoNum: '364',
    flag: '🇮🇷',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Green, White, Red with a red emblem! 🔴 The emblem is a stylized symbol representing unity!'
  },
  {
    id: 'afghanistan',
    name: 'Afghanistan',
    isoNum: '004',
    flag: '🇦🇫',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Black, Red, Green with an emblem! 🛡️ The emblem contains a mosque and a wheat wreath!'
  },
  {
    id: 'tajikistan',
    name: 'Tajikistan',
    isoNum: '762',
    flag: '🇹🇯',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Red, White, Green with a gold crown and stars! ⭐ The crown represents unity, the stars represent peace!'
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    isoNum: '860',
    flag: '🇺🇿',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Light Blue, White, Red with white crescent and stars! ☪️ The crescent and stars are Islamic symbols!'
  },
  {
    id: 'turkmenistan',
    name: 'Turkmenistan',
    isoNum: '795',
    flag: '🇹🇲',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Green with a red stripe and traditional carpet pattern! 🟢 The green represents Islam, red is the nation!'
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    isoNum: '398',
    flag: '🇰🇿',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Sky Blue with a golden sun and eagle, and a traditional pattern stripe! 🦅 The eagle represents strength and freedom!'
  },
  {
    id: 'kyrgyzstan',
    name: 'Kyrgyzstan',
    isoNum: '417',
    flag: '🇰🇬',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Red with a yellow sun and radiant lines! ☀️ The sun represents the 40 Kyrgyz tribes united as one nation!'
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
    isoNum: '031',
    flag: '🇦🇿',
    continent: 'asia',
    chapter: 'as-5',
    tip: 'Light Blue, Red, Green with a white crescent and star! ☪️ The crescent and star represent Islam!'
  },

  // ═══════════════════════════════════════════
  // AMERICAS - North America
  // ═══════════════════════════════════════════
  {
    id: 'canada',
    name: 'Canada',
    isoNum: '124',
    flag: '🇨🇦',
    continent: 'americas',
    chapter: 'am-1',
    tip: "Red, White, Red with a maple leaf! 🍁 The maple leaf is the national symbol, Canada's emblem since 1965!"
  },
  {
    id: 'usa',
    name: 'United States',
    isoNum: '840',
    flag: '🇺🇸',
    continent: 'americas',
    chapter: 'am-1',
    tip: 'Red & white stripes + blue box with white stars ⭐ 50 stars = 50 states, 13 stripes = 13 original colonies!'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    isoNum: '484',
    flag: '🇲🇽',
    continent: 'americas',
    chapter: 'am-1',
    tip: 'Green, White, Red with an eagle! 🦅 The eagle is the Aztec symbol from the legend of Tenochtitlan!'
  },

  // AMERICAS - Central America & Caribbean
  {
    id: 'guatemala',
    name: 'Guatemala',
    isoNum: '320',
    flag: '🇬🇹',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue, White, Blue with a coat of arms! 🛡️ The coat of arms contains a quetzal bird and laurel branches!'
  },
  {
    id: 'belize',
    name: 'Belize',
    isoNum: '084',
    flag: '🇧🇿',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue, White, Red with a coat of arms and logwood tree! 🌳 The coat of arms contains a sailing ship!'
  },
  {
    id: 'el-salvador',
    name: 'El Salvador',
    isoNum: '222',
    flag: '🇸🇻',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue, White, Blue with a national seal! 🛡️ The seal contains a triangle with three volcanic peaks!'
  },
  {
    id: 'honduras',
    name: 'Honduras',
    isoNum: '340',
    flag: '🇭🇳',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue, White, Blue with five stars! ⭐ The stars represent the five Central American nations!'
  },
  {
    id: 'nicaragua',
    name: 'Nicaragua',
    isoNum: '558',
    flag: '🇳🇮',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue, White, Blue with a coat of arms! 🛡️ The coat of arms contains three volcanic peaks and rainbow!'
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    isoNum: '188',
    flag: '🇨🇷',
    continent: 'americas',
    chapter: 'am-2',
    tip: "Blue, White, Red with thick red stripe! 🎨 The white stripes are thinner, and there's a coat of arms!"
  },
  {
    id: 'panama',
    name: 'Panama',
    isoNum: '591',
    flag: '🇵🇦',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Quarterly flag: Blue, Red, White, Stars! ⭐ The quadrants represent the unity of all Panamanian people!'
  },
  {
    id: 'cuba',
    name: 'Cuba',
    isoNum: '192',
    flag: '🇨🇺',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue and White with a red triangle and white star! ⭐ The triangle represents blood of freedom!'
  },
  {
    id: 'dominican-republic',
    name: 'Dominican Republic',
    isoNum: '214',
    flag: '🇩🇴',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue, Red, White with a coat of arms! 🛡️ The coat of arms has a cross in the center with a shield!'
  },
  {
    id: 'haiti',
    name: 'Haiti',
    isoNum: '332',
    flag: '🇭🇹',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue and Red with a coat of arms! 🛡️ The coat of arms contains a palm tree and cannons!'
  },
  {
    id: 'jamaica',
    name: 'Jamaica',
    isoNum: '388',
    flag: '🇯🇲',
    continent: 'americas',
    chapter: 'am-2',
    tip: "Green, Yellow, Green with a diagonal gold cross! ✝️ The saltire (X-shape) represents the islands' landscape!"
  },
  {
    id: 'bahamas',
    name: 'Bahamas',
    isoNum: '044',
    flag: '🇧🇸',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Blue, Gold, Gold, Blue with a black triangle! 🔺 The triangle represents the unity and strength!'
  },
  {
    id: 'trinidad-and-tobago',
    name: 'Trinidad and Tobago',
    isoNum: '780',
    flag: '🇹🇹',
    continent: 'americas',
    chapter: 'am-2',
    tip: "Red, White, Black diagonal stripes! 🎨 The black diagonal stripe represents the people's strength!"
  },
  {
    id: 'barbados',
    name: 'Barbados',
    isoNum: '052',
    flag: '🇧🇧',
    continent: 'americas',
    chapter: 'am-2',
    tip: "Blue, Yellow, Blue with a black trident! 🔱 The trident is a symbol of Barbados' maritime heritage!"
  },
  {
    id: 'grenada',
    name: 'Grenada',
    isoNum: '308',
    flag: '🇬🇩',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Yellow, Green, Red with stars and a nutmeg! 🌰 The nutmeg represents the agricultural heritage!'
  },
  {
    id: 'st-lucia',
    name: 'Saint Lucia',
    isoNum: '662',
    flag: '🇱🇨',
    continent: 'americas',
    chapter: 'am-2',
    tip: "Blue with two peaks and a yellow/white triangle! 🏔️ The two peaks represent the island's volcanic peaks (Pitons)!"
  },
  {
    id: 'dominica',
    name: 'Dominica',
    isoNum: '212',
    flag: '🇩🇲',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Green, Yellow, Black with a parrot and stars! 🦜 The parrot is the national bird, the stars represent divisions!'
  },
  {
    id: 'st-vincent-grenadines',
    name: 'Saint Vincent & the Grenadines',
    isoNum: '670',
    flag: '🇻🇨',
    continent: 'americas',
    chapter: 'am-2',
    tip: "Green, Yellow, Blue with a diamond shape! 💎 The diamond represents the three islands's unity!"
  },
  {
    id: 'antigua-barbuda',
    name: 'Antigua and Barbuda',
    isoNum: '028',
    flag: '🇦🇬',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Red, Blue, White with a yellow sun and triangle! ☀️ The sun represents a new dawn of freedom!'
  },
  {
    id: 'st-kitts-nevis',
    name: 'Saint Kitts and Nevis',
    isoNum: '659',
    flag: '🇰🇳',
    continent: 'americas',
    chapter: 'am-2',
    tip: 'Green, Red, Black, White with two stars! ⭐ The stars represent the two islands of the nation!'
  },

  // AMERICAS - South America
  {
    id: 'colombia',
    name: 'Colombia',
    isoNum: '170',
    flag: '🇨🇴',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Yellow, Blue, Red horizontal stripes! 🌈 The yellow is twice as thick as the other stripes!'
  },
  {
    id: 'venezuela',
    name: 'Venezuela',
    isoNum: '862',
    flag: '🇻🇪',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Yellow, Blue, Red with a white crescent and stars! ⭐ The arc of 8 stars represents the unity of the nation!'
  },
  {
    id: 'guyana',
    name: 'Guyana',
    isoNum: '328',
    flag: '🇬🇾',
    continent: 'americas',
    chapter: 'am-3',
    tip: "Red, Green, Yellow, White, Black with a gold triangle! 🔺 The triangle represents the nation's wealth!"
  },
  {
    id: 'suriname',
    name: 'Suriname',
    isoNum: '740',
    flag: '🇸🇷',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Green, White, Red with a yellow star! ⭐ The star represents golden dreams and prosperity!'
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
    isoNum: '218',
    flag: '🇪🇨',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Yellow, Blue, Red with a coat of arms! 🛡️ The coat of arms contains a condor bird!'
  },
  {
    id: 'peru',
    name: 'Peru',
    isoNum: '604',
    flag: '🇵🇪',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Red, White, Red with a coat of arms! 🛡️ The coat of arms contains a vicuña, cinchona tree, and cornucopia!'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    isoNum: '076',
    flag: '🇧🇷',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Green, Yellow, Blue with a white band! 💛 Yellow = gold, Green = forest! The band says "Order and Progress"!'
  },
  {
    id: 'bolivia',
    name: 'Bolivia',
    isoNum: '068',
    flag: '🇧🇴',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Red, Yellow, Green with a coat of arms! 🛡️ The coat of arms contains a condor eagle and laurel wreath!'
  },
  {
    id: 'chile',
    name: 'Chile',
    isoNum: '152',
    flag: '🇨🇱',
    continent: 'americas',
    chapter: 'am-3',
    tip: "Blue, White, Red with a white star! ⭐ The thin white stripe and thick red stripe represent the nation's values!"
  },
  {
    id: 'argentina',
    name: 'Argentina',
    isoNum: '032',
    flag: '🇦🇷',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Light Blue, White, Light Blue with a sun! ☀️ The sun is the Sun of May, representing independence!'
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    isoNum: '858',
    flag: '🇺🇾',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'White and Blue with nine stripes and a sun! ☀️ The 9 stripes represent the 9 departments when it was created!'
  },
  {
    id: 'paraguay',
    name: 'Paraguay',
    isoNum: '600',
    flag: '🇵🇾',
    continent: 'americas',
    chapter: 'am-3',
    tip: 'Red, White, Blue with a coat of arms! 🛡️ The coat of arms is different on each side (recto and verso)!'
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
    tip: 'Blue with British flag, white star and stars of the Southern Cross! ⭐ The cross is the constellation visible from the south!'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    isoNum: '554',
    flag: '🇳🇿',
    continent: 'oceania',
    chapter: 'oc-1',
    tip: 'Blue with British flag and Southern Cross stars! ⭐ The four red stars with white trim form the Southern Cross!'
  },

  // OCEANIA - Part 2 (Pacific Islands)
  {
    id: 'fiji',
    name: 'Fiji',
    isoNum: '242',
    flag: '🇫🇯',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Light Blue with British flag and coat of arms! 🛡️ The coat of arms contains a lion and local symbols!'
  },
  {
    id: 'samoa',
    name: 'Samoa',
    isoNum: '882',
    flag: '🇼🇸',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Red and Blue with white stars! ⭐ The stars form the Southern Cross and represent four major islands!'
  },
  {
    id: 'tonga',
    name: 'Tonga',
    isoNum: '776',
    flag: '🇹🇴',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Red and White with a cross! ✝️ The cross represents Christianity, which is central to Tongan culture!'
  },
  {
    id: 'vanuatu',
    name: 'Vanuatu',
    isoNum: '548',
    flag: '🇻🇺',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Red, Green, Black, Yellow with a boar tusk and fern! 🥒 The boar tusk represents wealth and status!'
  },
  {
    id: 'kiribati',
    name: 'Kiribati',
    isoNum: '296',
    flag: '🇰🇮',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Blue and Red with a sun and birds! 🌅 The sun represents the equator, the birds represent the islands!'
  },
  {
    id: 'nauru',
    name: 'Nauru',
    isoNum: '520',
    flag: '🇳🇷',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: "Blue with a yellow stripe and white star! ⭐ The star represents the island's position on the equator!"
  },
  {
    id: 'tuvalu',
    name: 'Tuvalu',
    isoNum: '798',
    flag: '🇹🇻',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Light Blue and Yellow with stars! ⭐ The stars represent the nine coral atolls of the nation!'
  },
  {
    id: 'marshall-islands',
    name: 'Marshall Islands',
    isoNum: '584',
    flag: '🇲🇭',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Blue with a chain of stars and an orange/white stripe! ⭐ The stars represent the island chains!'
  },
  {
    id: 'micronesia',
    name: 'Micronesia',
    isoNum: '583',
    flag: '🇫🇲',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Blue with four white stars! ⭐ The stars represent the four main island groups!'
  },
  {
    id: 'palau',
    name: 'Palau',
    isoNum: '585',
    flag: '🇵🇼',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: "Blue with a yellow circle (moon)! 🌙 The moon represents peace and the nation's tranquility!"
  },
  {
    id: 'solomon-islands',
    name: 'Solomon Islands',
    isoNum: '090',
    flag: '🇸🇧',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: 'Green and Blue with a yellow stripe and stars! ⭐ The stripe and stars form a path of light!'
  },
  {
    id: 'papua-new-guinea',
    name: 'Papua New Guinea',
    isoNum: '598',
    flag: '🇵🇬',
    continent: 'oceania',
    chapter: 'oc-2',
    tip: "Black, Red, Gold with a bird of paradise and stars! 🦜 The bird represents the nation's rich wildlife!"
  }
];

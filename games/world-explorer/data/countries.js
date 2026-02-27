/**
 * World Explorer - Countries Dataset
 * Phase 1: 30 countries (5 famous showcase + 25 diverse)
 * Will expand to 195 countries in Phase 2
 *
 * Data Structure:
 * - Minimal: id, name, flag, continent, hooks, facts (4-6 facts), culture
 * - Rich: + cities, highlights.landmarks, highlights.coolFacts, neighbors
 */

// eslint-disable-next-line no-unused-vars
const COUNTRIES = [
  // ════════════════════════════════════════════════════
  // SHOWCASE COUNTRIES (5 Famous - To Demonstrate Game)
  // ════════════════════════════════════════════════════

  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    continent: 'americas',
    hooks: {
      primary: '🗽 Land of the free with 50 states and endless opportunities',
      secondary:
        'Massive country stretching from Atlantic to Pacific Ocean with deserts, mountains, and forests'
    },
    facts: [
      '🗽 Statue of Liberty is a gift from France (1886)',
      '🏜️ Grand Canyon is one mile DEEP—you could stack 10 Empire State Buildings inside!',
      '🍔 Invented the hamburger and hot dog',
      '🎬 Hollywood is where most movies are made',
      '⚾ Love baseball, basketball, and American football',
      '🎆 Has 50 states, each with different laws and cultures'
    ],
    cities: {
      capital: 'Washington D.C.',
      majors: ['New York', 'Los Angeles', 'Chicago']
    },
    highlights: {
      landmarks: [
        {
          name: 'Statue of Liberty',
          emoji: '🗽',
          desc: 'Giant copper statue welcoming people to New York'
        },
        { name: 'Grand Canyon', emoji: '🏜️', desc: 'Massive canyon carved by the Colorado River' },
        { name: 'Mount Rushmore', emoji: '🗻', desc: 'Four presidents carved into a mountain!' }
      ],
      coolFacts: [
        'Invented the airplane (Wright Brothers, 1903)',
        'Invented the internet (ARPANET, 1969)',
        'Hamburgers were invented here, not Hamburg!',
        "Has the most McDonald's of any country"
      ]
    },
    culture:
      '🦅 Confident, hard-working people. Loves big dreams and big portions! Very diverse with people from all over the world.',
    neighbors: ['canada', 'mexico']
  },

  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    continent: 'asia',
    hooks: {
      primary: '🗾 Island nation balancing ancient traditions with cutting-edge technology',
      secondary:
        'Mix of ancient temples, modern cities, and robots! Land of sushi, anime, and innovation'
    },
    facts: [
      '🏔️ Made of 6,852 islands (only 430 have names!)',
      '🏯 Tokyo has 37 MILLION people—biggest city on Earth',
      '🎮 Invented Nintendo, PlayStation, and the Game Boy',
      '☕ More vending machines than gas stations—coffee anywhere!',
      '🍱 Invented sushi, ramen, and karaoke',
      '✨ Emojis were invented here (emoji = e-moji = picture character)'
    ],
    cities: {
      capital: 'Tokyo',
      majors: ['Osaka', 'Kyoto', 'Hiroshima']
    },
    highlights: {
      landmarks: [
        { name: 'Mount Fuji', emoji: '🗻', desc: "Sacred snow-capped volcano and Japan's symbol" },
        { name: 'Golden Temple', emoji: '✨', desc: 'Dazzling shrine covered in gold leaf' },
        { name: 'Tokyo Tower', emoji: '🏮', desc: "Red iron tower like Paris's Eiffel Tower" }
      ],
      animals: ['🐼 Giant pandas (in zoos)', '🦌 Sika deer roaming freely', '🦅 Japanese cranes'],
      food: [
        '🍣 Sushi (rice + raw fish)',
        '🍜 Ramen (noodles in hot broth)',
        '🍚 White rice (for everything!)'
      ],
      coolFacts: [
        'Invented instant ramen (so fast!)',
        'Cherry blossom season lasts only 2 weeks',
        'Robots serve food in restaurants',
        'Bowing is how you greet and apologize'
      ]
    },
    culture:
      '🎌 Very respectful and organized. Bowing shows respect. Shoes off indoors! Hard-working and honorable.',
    neighbors: ['south-korea', 'china', 'russia']
  },

  {
    id: 'egypt',
    name: 'Egypt',
    flag: '🇪🇬',
    continent: 'africa',
    hooks: {
      primary: '🏛️ Home of the Pyramids—one of the Seven Wonders of the World',
      secondary:
        'Ancient civilization that gave the world pyramids, mummies, and 3,000 years of history'
    },
    facts: [
      '🏛️ Pyramids are 4,500 years old (older than any country!)',
      '📜 Invented hieroglyphics—picture-based writing',
      '👑 King Tutankhamun was buried with 5,000 treasures',
      '🌊 The Nile River is the longest in the world (4,135 miles)',
      '🐪 Camels are everywhere—the "ships of the desert"',
      '🎭 Pharaohs wore makeup for sun protection (not just fashion!)'
    ],
    cities: {
      capital: 'Cairo',
      majors: ['Alexandria', 'Giza', 'Luxor']
    },
    highlights: {
      landmarks: [
        {
          name: 'Pyramids of Giza',
          emoji: '🏛️',
          desc: 'Three massive tombs. Great Pyramid is 480 feet tall!'
        },
        { name: 'Sphinx', emoji: '🦁', desc: 'Giant stone lion with human face. 240 feet long!' },
        {
          name: 'Valley of the Kings',
          emoji: '⚱️',
          desc: 'Underground tombs where pharaohs hid treasures'
        }
      ],
      animals: [
        '🐪 Camels (can survive 2 weeks without water)',
        '🦅 Eagles and hawks',
        '🐊 Nile crocodiles'
      ],
      coolFacts: [
        'Invented toothpaste and breath mints!',
        'Built pyramids by hand—no cranes or machines',
        'Cats were sacred (harming one meant death penalty!)',
        'Mummies were wrapped to preserve bodies forever'
      ]
    },
    culture:
      '🕌 Respectful and hospitable. Family is VERY important. Call people by formal titles.',
    neighbors: ['sudan', 'libya', 'israel']
  },

  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    continent: 'americas',
    hooks: {
      primary: '⚽ Soccer superpower hosting the Amazon rainforest and exotic wildlife',
      secondary: 'Biggest country in South America with rainforests, beaches, and Carnival parties'
    },
    facts: [
      '⚽ Won the World Cup 5 times (more than any country)',
      "🌴 Has 60% of the Amazon Rainforest—Earth's lungs!",
      '🏖️ Copacabana Beach is where everyone goes in summer',
      '🎭 Carnival is the biggest party in the world',
      "🦜 Home to 10% of Earth's animal species",
      '🥁 Invented samba music (so danceable!)'
    ],
    cities: {
      capital: 'Brasília',
      majors: ['São Paulo', 'Rio de Janeiro', 'Salvador']
    },
    highlights: {
      landmarks: [
        {
          name: 'Christ the Redeemer',
          emoji: '✨',
          desc: 'Massive Jesus statue on a mountain overlooking Rio'
        },
        {
          name: 'Iguazu Falls',
          emoji: '💦',
          desc: 'Massive waterfalls on the border with Argentina'
        },
        {
          name: 'Amazon Rainforest',
          emoji: '🌴',
          desc: 'Biggest rainforest on Earth with jaguars and pink dolphins'
        }
      ],
      animals: ['🦁 Jaguars (powerful cats)', '🐍 Anacondas (giant snakes)', '🦜 Colorful parrots'],
      food: [
        '🍲 Feijoada (black bean stew)',
        '🥑 Fresh tropical fruits',
        '🍖 Churrasco (grilled meat)'
      ],
      coolFacts: [
        "Amazon produces 20% of Earth's oxygen",
        'Has more biodiversity than any country',
        'Carnival in Rio takes 2 months to prepare',
        'Brazilians speak Portuguese, not Spanish!'
      ]
    },
    culture:
      '🎉 Energetic, friendly, and loves to party! Family-oriented. Great dancers! Very warm and welcoming.',
    neighbors: [
      'venezuela',
      'guyana',
      'suriname',
      'french-guiana',
      'colombia',
      'peru',
      'bolivia',
      'paraguay',
      'argentina',
      'uruguay'
    ]
  },

  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    continent: 'oceania',
    hooks: {
      primary: '🦘 Island continent famous for deadly animals, beaches, and unique wildlife',
      secondary:
        'Biggest island and smallest continent with kangaroos, koalas, and the Great Barrier Reef'
    },
    facts: [
      '🦘 Has more kangaroos than people (25M people, 50M kangaroos)',
      '⚠️ Most venomous snakes on Earth live here',
      '🪨 Uluru (Ayers Rock) is sacred to Aboriginal people',
      '🏖️ Bondi Beach is the most famous beach in the world',
      '🪸 Great Barrier Reef is the largest coral reef (2,300km long)',
      '🔫 Koalas sleep 22 hours a day (living the dream!)'
    ],
    cities: {
      capital: 'Canberra',
      majors: ['Sydney', 'Melbourne', 'Brisbane']
    },
    highlights: {
      landmarks: [
        {
          name: 'Sydney Opera House',
          emoji: '🎭',
          desc: 'Iconic white building that looks like sails on water'
        },
        {
          name: 'Great Barrier Reef',
          emoji: '🪸',
          desc: 'Largest coral reef system in the world'
        },
        { name: 'Uluru', emoji: '🪨', desc: 'Sacred Aboriginal rock formation in the outback' }
      ],
      animals: [
        '🦘 Kangaroos (hop around)',
        '🐨 Koalas (adorable sleepers)',
        '🦑 Platypus (weird egg-laying mammal)'
      ],
      food: ['🥩 Meat pies', '🦞 Fresh seafood', '🍜 Lamingtons (chocolate-coconut cakes)'],
      coolFacts: [
        'Kangaroos can jump 30 feet in one hop!',
        'Koalas have fingerprints like humans',
        'Platypus is one of the few egg-laying mammals',
        'Everything wants to kill you (spiders, snakes, etc)!'
      ]
    },
    culture:
      '🏄 Laid-back, outdoorsy people. Love beaches and sports. Say "G\'day mate!" Casual and friendly.',
    neighbors: []
  },

  // ════════════════════════════════════════════════════
  // DIVERSE COUNTRIES (25 - Round Out Continents)
  // ════════════════════════════════════════════════════

  // AFRICA (5 more)
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    continent: 'africa',
    hooks: {
      primary: '🦁 The "Rainbow Nation" with safaris, mountains, and diverse cultures',
      secondary: 'Where you can see elephants, lions, and rhinos in the wild'
    },
    facts: [
      '🦁 Kruger National Park has the "Big Five" animals',
      '🏔️ Table Mountain overlooks Cape Town (flat-topped mountain)',
      '🌈 11 official languages (most in any country!)',
      '⚽ Hosted the World Cup in 2010',
      '🌅 Dramatic sunsets and wildlife everywhere'
    ],
    culture:
      '🦁 Diverse and welcoming. Ubuntu philosophy: "I am because we are." Loves sports and music.'
  },

  {
    id: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    continent: 'africa',
    hooks: {
      primary: '🦒 Safari paradise with giraffes, lions, and zebras roaming free',
      secondary: 'Birthplace of human ancestors with stunning national parks'
    },
    facts: [
      '🦁 Serengeti has the Great Migration of 2 million animals',
      '🗻 Mount Kenya is the 2nd highest in Africa',
      '🦒 See giraffes, leopards, and rhinos in the wild',
      '☕ Famous for coffee (some of the best in the world)',
      '🌅 Sunset is INCREDIBLE over the savanna'
    ],
    culture:
      '🦒 Friendly and welcoming. Simba means lion! Great storytellers. Love music and dancing.'
  },

  {
    id: 'nigeria',
    name: 'Nigeria',
    flag: '🇳🇬',
    continent: 'africa',
    hooks: {
      primary:
        "🎬 Africa's biggest movie industry with Nollywood producing more films than Hollywood",
      secondary: 'Most populous African country with vibrant music and culture'
    },
    facts: [
      '🎬 Nollywood produces more movies than Hollywood!',
      '👥 220 million people (most in Africa)',
      '🎵 Created Afrobeats music (heard worldwide)',
      '🏛️ Ancient Benin City has thousands of artifacts',
      '💰 Wealthiest country in Africa'
    ],
    culture:
      '🎉 Energetic and creative. Nollywood actors are celebrities. Love music and good food. Entrepreneurial spirit.'
  },

  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    continent: 'africa',
    hooks: {
      primary: '🏜️ Gateway to Africa with deserts, mountains, and exotic markets',
      secondary: 'Where Africa meets Europe with Casablanca and the Atlas Mountains'
    },
    facts: [
      '🏜️ Sahara Desert covers much of the country',
      '🏔️ Atlas Mountains divide the coast from the desert',
      '🕌 Casablanca has the largest mosque in Africa',
      '🛍️ Marrakech markets are bustling with colorful goods',
      '🌊 Beaches on both Mediterranean and Atlantic oceans'
    ],
    culture:
      '🌙 Warm and hospitable. Very spiritual. Hospitality is sacred. Love mint tea and conversation.'
  },

  {
    id: 'tanzania',
    name: 'Tanzania',
    flag: '🇹🇿',
    continent: 'africa',
    hooks: {
      primary: "⛰️ Home to Mount Kilimanjaro and some of Earth's best wildlife",
      secondary: 'Safari capital with Serengeti, Zanzibar, and the tallest mountain in Africa'
    },
    facts: [
      '⛰️ Mount Kilimanjaro is 19,341 feet tall (can be climbed!)',
      '🦁 Serengeti has infinite lions, elephants, and wildebeest',
      '🏝️ Zanzibar Island is famous for cloves and beaches',
      '🐘 Tarangire has more elephants than any park',
      '🌍 Where humanity began (oldest human bones found here)'
    ],
    culture:
      '🦁 Friendly and patient. Swahili language is widely spoken. Love music and storytelling.'
  },

  // ASIA (6 more - plus Japan, USA already covered)
  {
    id: 'china',
    name: 'China',
    flag: '🇨🇳',
    continent: 'asia',
    hooks: {
      primary: '🏯 Ancient empire with the Great Wall and 1.4 BILLION people',
      secondary: 'Invented paper, printing, gunpowder, and porcelain—modern superpower'
    },
    facts: [
      '👥 1.4 BILLION people (1 in 6 humans!)',
      '🧱 Great Wall is 13,000 miles long',
      '🖨️ Invented paper, printing, and gunpowder',
      '🏙️ Shanghai has the 2nd most skyscrapers',
      '🐉 Dragons are lucky symbols (not evil!)'
    ],
    culture:
      '🏮 Respectful culture valuing harmony. Hard-working and entrepreneurial. Loves group harmony.'
  },

  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    continent: 'asia',
    hooks: {
      primary: '🏛️ Land of the Taj Mahal, curry, yoga, and 1.4 billion people',
      secondary: 'Birthplace of four major religions with incredible festivals and spices'
    },
    facts: [
      '👥 1.4 BILLION people (as big as China!)',
      '🏛️ Taj Mahal is made of white marble (one of Seven Wonders)',
      '🧘 Invented yoga (5,000 years old!)',
      "🍛 Curry is India's gift to the world",
      '♟️ Invented chess and the number zero!'
    ],
    culture:
      '🕉️ Spiritual and family-oriented. Festivals are HUGE. Very generous hosts. Colors are everywhere!'
  },

  {
    id: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    continent: 'asia',
    hooks: {
      primary: '🏮 Land of smiles with floating markets, temples, and Thai food',
      secondary: 'Only Southeast Asian country never colonized, full of Buddhist temples'
    },
    facts: [
      '😊 Known as "Land of Smiles" for friendly people',
      '🛕 Has 40,000 Buddhist temples (Thailand is VERY Buddhist)',
      '🛶 Floating markets where boats sell produce',
      '🌶️ Thai food is spicy (lime, chili, and fish sauce)',
      '🏖️ Beautiful beaches and tropical islands'
    ],
    culture:
      "😊 Cheerful and respectful. Very spiritual. Don't disrespect the royal family! Smiling is constant."
  },

  {
    id: 'south-korea',
    name: 'South Korea',
    flag: '🇰🇷',
    continent: 'asia',
    hooks: {
      primary: '📱 K-pop and tech superpower with super-fast internet',
      secondary: 'Modern country obsessed with technology, beauty, and delicious food'
    },
    facts: [
      "📱 Invented the world's fastest internet",
      '🎵 K-pop is heard worldwide (BTS, Blackpink)',
      '🎬 Korean dramas are addictive worldwide hits',
      '🍜 Invented ramen and bibimbap (mixed rice)',
      '🏗️ Seoul has skyscrapers everywhere (ultramodern)'
    ],
    culture:
      '📱 Innovative and hardworking. Super into beauty routines. Fast-paced lifestyle. Very tech-savvy.'
  },

  {
    id: 'indonesia',
    name: 'Indonesia',
    flag: '🇮🇩',
    continent: 'asia',
    hooks: {
      primary: '🏝️ Archipelago of 17,000 islands with tropical paradise vibes',
      secondary: 'The most Muslim-majority country with Bali, volcanoes, and orangutans'
    },
    facts: [
      '🏝️ Made of 17,000 islands (largest archipelago)',
      '🌋 Has more active volcanoes than any country (130!)',
      '🦧 Orangutans live here (endangered apes)',
      "🏖️ Bali is the world's most famous tropical island",
      '🌴 Rainforests with incredible biodiversity'
    ],
    culture:
      '🏝️ Warm and welcoming island people. Very family-oriented. Islam is majority religion. Love nature.'
  },

  {
    id: 'vietnam',
    name: 'Vietnam',
    flag: '🇻🇳',
    continent: 'asia',
    hooks: {
      primary: '🥢 S-shaped country with limestone islands and ancient culture',
      secondary: 'Known for pho, coffee, and stunning landscapes'
    },
    facts: [
      '🍚 Rice paddies cover the country (main food)',
      "🍜 Pho is Vietnam's national dish (amazing noodle soup)",
      '☕ Second-largest coffee producer in the world',
      '🏔️ Ha Long Bay has 3,000 limestone islands',
      '🚴 Everyone rides motorbikes (millions of them!)'
    ],
    culture:
      '🇻🇳 Hard-working and resilient. Family-focused. Respectful culture. Love fresh food and tea.'
  },

  // EUROPE (5 more)
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    continent: 'europe',
    hooks: {
      primary: '🗼 Land of the Eiffel Tower, fancy cuisine, and world-class art',
      secondary: 'Most visited country in the world with Paris, wine, and romance'
    },
    facts: [
      '🗼 Eiffel Tower is 1,000 feet tall',
      '🍷 Produces 400 types of cheese!',
      '🎨 Louvre museum has the Mona Lisa',
      '👑 Paris is called the "City of Light"',
      '🎭 French is spoken in 29 countries'
    ],
    culture:
      '🗼 Proud and artistic. Very fashion-conscious. Value good food and wine. Romantic and passionate.'
  },

  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    continent: 'europe',
    hooks: {
      primary: '🍝 Boot-shaped country that invented pizza and pasta',
      secondary: 'Home of Rome, Renaissance art, and the Vatican'
    },
    facts: [
      '🍕 Invented pizza (Naples is the birthplace)',
      '🗽 Rome was the center of the biggest empire',
      '🎨 Renaissance started here (Michelangelo, Leonardo da Vinci)',
      '⛩️ Vatican is the smallest country (inside Rome!)',
      '🚇 Venice has canals instead of streets'
    ],
    culture:
      '🍝 Passionate and family-focused. Love food and long meals. Animated and expressive. Proud history.'
  },

  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    continent: 'europe',
    hooks: {
      primary: '🎸 Home of flamenco, tapas, and siestas',
      secondary: 'Sunny country with beaches, deserts, and festive culture'
    },
    facts: [
      '🎸 Invented flamenco dancing (passionate!)',
      '⚽ Won the World Cup in 2010',
      '🏖️ Mediterranean beaches are gorgeous',
      '🏰 Sagrada Familia is the most amazing cathedral',
      '🥘 Paella is their national dish (rice with seafood)'
    ],
    culture:
      '🌞 Warm and social. Love family gatherings. Siestas (afternoon naps) are sacred. Festive and passionate.'
  },

  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    continent: 'europe',
    hooks: {
      primary: '🍺 Engineering superpower with beer, cars, and precision',
      secondary: 'Heart of Europe with a rich history and amazing food'
    },
    facts: [
      '🚗 Invented the car (Mercedes, BMW, Audi, VW)',
      '🍺 Oktoberfest is the biggest beer festival',
      '🎼 Produced incredible composers (Beethoven, Bach)',
      '⚙️ Known for engineering precision and quality',
      '🏰 Has more castles than any European country'
    ],
    culture:
      '🇩🇪 Organized, efficient, and direct. Punctuality is sacred. Hardworking. Love beer and sausages.'
  },

  {
    id: 'greece',
    name: 'Greece',
    flag: '🇬🇷',
    continent: 'europe',
    hooks: {
      primary: '🏛️ Birthplace of democracy with ancient ruins and island paradise',
      secondary: 'Mediterranean paradise with philosophy, feta cheese, and incredible islands'
    },
    facts: [
      '🏛️ Invented democracy (Athens, 500 BCE)',
      '🏛️ Built incredible temples (Parthenon)',
      '🌊 Santorini has blue-domed houses on cliffs',
      '⚽ Won the Euros in 2004 (underdog victory)',
      '🧀 Feta cheese and olives are everywhere'
    ],
    culture:
      '🏛️ Philosophical and proud. Very social. Family gatherings involve lots of food. Warm and hospitable.'
  },

  // AMERICAS (4 more - plus USA and Brazil already covered)
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    continent: 'americas',
    hooks: {
      primary: '🍁 Huge country with forests, mountains, and polite people',
      secondary: 'Home to Niagara Falls, Rockies, and ice hockey'
    },
    facts: [
      '🏔️ Rocky Mountains are incredibly beautiful',
      '💧 Niagara Falls is one of Seven Natural Wonders',
      '🏒 Ice hockey is a national obsession',
      '❄️ Parts are so cold (winter lasts 6 months!)',
      '🦆 Beavers are the national animal'
    ],
    culture:
      '🍁 Polite and apologetic (say "sorry" a lot). Outdoor lovers. Hockey fans. Multicultural.'
  },

  {
    id: 'mexico',
    name: 'Mexico',
    flag: '🇲🇽',
    continent: 'americas',
    hooks: {
      primary: '🌮 Land of tacos, ancient ruins, and vibrant culture',
      secondary: 'Home to the Aztec empire, Day of the Dead, and salsa dancing'
    },
    facts: [
      '🌮 Invented tacos (originally called "tlaco")',
      '🏛️ Aztecs built pyramids and organized cities',
      '💀 Day of the Dead is a beautiful celebration of ancestors',
      '🌶️ Chili peppers originated here',
      '🎨 Diego Rivera made incredible murals'
    ],
    culture:
      '🇲🇽 Family-focused and celebratory. Colorful and artistic. Very religious. Love music and dancing.'
  },

  {
    id: 'argentina',
    name: 'Argentina',
    flag: '🇦🇷',
    continent: 'americas',
    hooks: {
      primary: '⚽ Soccer superpower with tango dancing and passionate people',
      secondary: 'South American country famous for beef, wine, and beautiful landscapes'
    },
    facts: [
      '⚽ Won the World Cup 3 times (Maradona, Messi)',
      '💃 Tango originated in Buenos Aires (passionate dancing)',
      '🥩 Asado (barbecue) is a way of life',
      '🍷 Wine country with amazing vineyards',
      '🏔️ Andes Mountains on the border'
    ],
    culture:
      '⚽ Passionate about soccer. Proud and confident. Love good food and wine. European-influenced.'
  },

  {
    id: 'peru',
    name: 'Peru',
    flag: '🇵🇪',
    continent: 'americas',
    hooks: {
      primary: '🏛️ Home to Machu Picchu and the Inca empire',
      secondary: 'Ancient civilization with ruins, mountains, and incredible history'
    },
    facts: [
      '🏛️ Machu Picchu is one of Seven Wonders',
      '⛰️ Inca built cities in mountains without wheels!',
      '🦙 Llamas and alpacas roam the Andes',
      '📍 Highest lake in the world (Lake Titicaca)',
      '🌿 Coca leaves grow here (make tea)'
    ],
    culture:
      '🏛️ Spiritual and connected to nature. Family values. Music and textiles are important. Indigenous pride.'
  },

  // OCEANIA (1 more - plus Australia already covered)
  {
    id: 'new-zealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    continent: 'oceania',
    hooks: {
      primary: '🏔️ Two islands with mountains, fjords, and adventure sports',
      secondary: 'Location of Lord of the Rings filming and extreme sports'
    },
    facts: [
      '🎬 Lord of the Rings was filmed here',
      '⛷️ Extreme sports capital (bungee, skydiving, skiing)',
      '🦅 Kiwi birds live here (endangered)',
      '🏔️ Fiordland has dramatic mountains and waterfalls',
      '🥋 Rugby is the national sport (All Blacks team)'
    ],
    culture:
      '🏔️ Adventure-loving and outdoor-focused. Independent. Rugby is huge. Indigenous Maori culture.'
  }
];

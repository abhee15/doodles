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
  },

  // ════════════════════════════════════════════════════
  // ADDITIONAL COUNTRIES (70 More)
  // ════════════════════════════════════════════════════

  // AFRICA (15 more)
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    continent: 'africa',
    hooks: {
      primary: '🦁 Rainbow nation with amazing wildlife and diversity',
      secondary: 'Home to safari, Table Mountain, and Nelson Mandela'
    },
    facts: [
      '🦁 Kruger National Park has incredible safari wildlife',
      '🏔️ Table Mountain dominates Cape Town',
      '📍 Three capital cities (Pretoria, Cape Town, Bloemfontein)',
      '🌈 11 official languages—most diverse in world',
      '🏆 Nelson Mandela was from here'
    ]
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    flag: '🇪🇹',
    continent: 'africa',
    hooks: {
      primary: '☕ Ancient empire and birthplace of coffee',
      secondary: 'Only African country never colonized by Europeans'
    },
    facts: [
      '☕ Coffee originated in Ethiopia',
      '📜 Ancient civilization with its own alphabet',
      '🏔️ Simien Mountains are dramatic and beautiful',
      '⏰ Uses its own calendar (7-8 years behind world)',
      '🤝 Never colonized—unique African history'
    ]
  },
  {
    id: 'ghana',
    name: 'Ghana',
    flag: '🇬🇭',
    continent: 'africa',
    hooks: {
      primary: '🎭 Vibrant West African culture and music',
      secondary: 'Gateway to West Africa with modern cities'
    },
    facts: [
      '🎵 Birthplace of Highlife music',
      '🏛️ Cape Coast Castle—historic slave trade fort',
      '🌴 Tropical beaches and rainforests',
      '💰 Named after ancient Ghana Empire',
      '⚡ Growing tech hub in Africa'
    ]
  },
  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    continent: 'africa',
    hooks: {
      primary: '🕌 North African country with deserts, mountains, and medinas',
      secondary: 'Gateway to Africa with Sahara Desert'
    },
    facts: [
      '🏜️ Sahara Desert covers much of southern region',
      '🕌 Marrakech medina is a maze of souks and mosques',
      '⛰️ Atlas Mountains stretch across the country',
      '🌊 Mediterranean and Atlantic coasts',
      '🎨 Colorful architecture and tile work everywhere'
    ]
  },
  {
    id: 'cameroon',
    name: 'Cameroon',
    flag: '🇨🇲',
    continent: 'africa',
    hooks: {
      primary: '🌋 Crossroads of Africa with volcanic mountains',
      secondary: 'Diverse landscapes from coast to jungle to mountains'
    },
    facts: [
      '🌋 Mount Cameroon is an active volcano',
      '🌴 Rainforests and jungles in south',
      '🏜️ Sahel grasslands in north',
      '🎬 Nollywood influences West African film',
      '🦁 Wildlife including forest elephants and gorillas'
    ]
  },
  {
    id: 'uganda',
    name: 'Uganda',
    flag: '🇺🇬',
    continent: 'africa',
    hooks: {
      primary: '🦍 Pearl of Africa with stunning wildlife and lakes',
      secondary: 'Home to mountain gorillas and the Nile River'
    },
    facts: [
      '🦍 Mountain gorillas live in the western forests',
      '🌊 Lake Victoria is the largest tropical lake',
      '🏞️ Multiple national parks with diverse wildlife',
      '✈️ Bwindi Impenetrable Forest for gorilla trekking',
      "🛶 Nile River's source is in Uganda"
    ]
  },
  {
    id: 'zimbabwe',
    name: 'Zimbabwe',
    flag: '🇿🇼',
    continent: 'africa',
    hooks: {
      primary: "🌊 Southern Africa with Victoria Falls—one of world's largest waterfalls",
      secondary: 'Ancient civilization and incredible natural wonders'
    },
    facts: [
      '🌊 Victoria Falls is 355 feet high—visible from space',
      '🏛️ Great Zimbabwe ruins from ancient empire',
      '🦁 Hwange National Park is elephant kingdom',
      '💎 Diamond mines and mineral-rich country',
      '🏔️ Scenic mountains and valleys'
    ]
  },
  {
    id: 'zambia',
    name: 'Zambia',
    flag: '🇿🇲',
    continent: 'africa',
    hooks: {
      primary: '💧 Southern Africa with cascading waterfalls and wildlife',
      secondary: 'Adventure capital with Victoria Falls and safari'
    },
    facts: [
      '🌊 Shares Victoria Falls with Zimbabwe',
      '🦁 South Luangwa National Park is top safari destination',
      '⚡ Copper is major export',
      '🏞️ Pristine wilderness with low tourist numbers',
      '🛶 Zambezi River is adventure hub'
    ]
  },
  {
    id: 'botswana',
    name: 'Botswana',
    flag: '🇧🇼',
    continent: 'africa',
    hooks: {
      primary: "🐘 Southern Africa's elephant kingdom with pristine safaris",
      secondary: 'Desert nation with world-class wildlife viewing'
    },
    facts: [
      '🐘 Chobe National Park has most elephants in Africa',
      '🏜️ Kalahari Desert and Okavango Delta',
      '💎 Diamonds are major resource',
      '🦁 Excellent wildlife—low tourist crowds',
      '✨ Dark skies perfect for stargazing'
    ]
  },
  {
    id: 'malawi',
    name: 'Malawi',
    flag: '🇲🇼',
    continent: 'africa',
    hooks: {
      primary: '🌊 Warm heart of Africa with stunning lake',
      secondary: 'Lake Malawi dominates this beautiful country'
    },
    facts: [
      '🌊 Lake Malawi is massive freshwater lake',
      '🐠 Lake has 1,000+ fish species',
      '🏔️ Mountains and highlands surround the lake',
      '🌤️ Warm, friendly people',
      '☀️ Very sunny year-round'
    ]
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    flag: '🇷🇼',
    continent: 'africa',
    hooks: {
      primary: '🦍 Land of a Thousand Hills with mountain gorillas',
      secondary: 'Resilient nation with stunning scenery and wildlife'
    },
    facts: [
      '🦍 Mountain gorillas live in misty forests',
      '🏔️ Very mountainous—called land of thousand hills',
      '✨ Clean and organized country',
      '🌿 Reforested and eco-friendly',
      '⚡ Growing tech hub for Africa'
    ]
  },
  {
    id: 'senegal',
    name: 'Senegal',
    flag: '🇸🇳',
    continent: 'africa',
    hooks: {
      primary: "🥁 West Africa's cultural leader with music and art",
      secondary: "Stable, creative nation at Africa's westernmost point"
    },
    facts: [
      '🥁 Center of African music and culture',
      '🏜️ Pink Lake (Lac Rose) is striking color',
      '🕌 Goree Island has dark history of slavery',
      '🐘 Niokolo-Koba National Park has wildlife',
      '🌊 Atlantic coast with fishing villages'
    ]
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
    flag: '🇲🇿',
    continent: 'africa',
    hooks: {
      primary: '🏝️ Southeast African coast with islands and beaches',
      secondary: 'Indian Ocean nation with emerging tourism'
    },
    facts: [
      '🏝️ Bazaruto Islands have pristine beaches',
      '🐚 Incredible coral reefs and marine life',
      '🌊 Mozambique Channel between Africa and Madagascar',
      '🌴 Coastal tropical paradise',
      '🦈 World-class diving destinations'
    ]
  },
  {
    id: 'benin',
    name: 'Benin',
    flag: '🇧🇯',
    continent: 'africa',
    hooks: {
      primary: '🎭 Birthplace of Vodou religion and West African culture',
      secondary: 'Small West African country with vibrant traditions'
    },
    facts: [
      '🎭 Vodou (Voodoo) originated here',
      '🕯️ Port of Ouidah is spiritual center',
      '🌍 Where many slaves were shipped from',
      '🏛️ Abomey palace ruins',
      '🌴 Lagoon towns built on water'
    ]
  },

  // ASIA (20 more)
  {
    id: 'south-korea',
    name: 'South Korea',
    flag: '🇰🇷',
    continent: 'asia',
    hooks: {
      primary: '📱 Tech superpower with K-pop, games, and innovation',
      secondary: 'Modern Asian nation with ancient traditions'
    },
    facts: [
      '📱 Created Samsung, LG, and SK Technology',
      '🎵 K-pop is global phenomenon',
      '🎮 League of Legends esports capital',
      '🍜 Instant ramen (Ramyeon) is national food',
      '⚡ Fastest internet speeds in world'
    ]
  },
  {
    id: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    continent: 'asia',
    hooks: {
      primary: '🏯 Southeast Asian kingdom famous for temples and smiles',
      secondary: 'Only Southeast Asian country never colonized'
    },
    facts: [
      '🏯 Over 30,000 Buddhist temples',
      '👑 Theravada Buddhism is dominant religion',
      '🔴 Muay Thai boxing is national sport',
      '🌶️ Thai food is world-famous',
      '🐘 Elephants are national animal'
    ]
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    flag: '🇻🇳',
    continent: 'asia',
    hooks: {
      primary: '🌴 Southeast Asian country with long coastline and rich culture',
      secondary: 'Ancient civilization with stunning karst landscapes'
    },
    facts: [
      '🏞️ Ha Long Bay has thousands of limestone islands',
      '🍲 Pho is beloved Vietnamese soup',
      '🌾 Rice paddies cover the countryside',
      '🚴 Still primarily uses bicycles and motorbikes',
      '⚔️ Successful resistance against powerful invaders'
    ]
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    flag: '🇮🇩',
    continent: 'asia',
    hooks: {
      primary: "🏝️ World's largest archipelago with 17,000 islands",
      secondary: 'Diverse Southeast Asian nation with volcanic mountains'
    },
    facts: [
      '🏝️ 17,000 islands spread across equator',
      '🌋 Ring of Fire with many active volcanoes',
      '🦁 Komodo dragons live here',
      '🌴 Bali is famous island destination',
      '👥 Fourth most populated country in world'
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    continent: 'asia',
    hooks: {
      primary: '🏙️ Modern Southeast Asian nation with twin skyscrapers',
      secondary: 'Peninsula and Borneo forming diverse country'
    },
    facts: [
      '🏢 Petronas Twin Towers are iconic',
      '🌴 Rainforests with unique wildlife',
      '🦁 Orangutans live in Borneo',
      '🕌 Islamic culture with diverse religions',
      '💰 Economic hub of Southeast Asia'
    ]
  },
  {
    id: 'philippines',
    name: 'Philippines',
    flag: '🇵🇭',
    continent: 'asia',
    hooks: {
      primary: '🏝️ Island nation with over 7,000 islands',
      secondary: 'Tropical paradise with vibrant culture'
    },
    facts: [
      '🏝️ 7,641 islands in Southeast Asia',
      "🌋 Taal Volcano is world's smallest volcano with crater lake",
      '⛩️ Boracay Beach is white sand paradise',
      '🎤 Filipino singers are global stars',
      '🤝 Very hospitable and friendly people'
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    continent: 'asia',
    hooks: {
      primary: '🏙️ Tiny city-state with futuristic skyline',
      secondary: 'Financial hub and garden city of Asia'
    },
    facts: [
      '🏙️ Entire country is essentially one city',
      '🌳 Gardens and greenery throughout',
      '💰 Incredibly wealthy and developed',
      '⚡ Major financial center of Asia',
      '🎭 Mixing Chinese, Malay, Indian cultures'
    ]
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    flag: '🇵🇰',
    continent: 'asia',
    hooks: {
      primary: '🏔️ South Asian nation with Himalayas and rich history',
      secondary: 'Home to K2 and ancient Indus Valley civilization'
    },
    facts: [
      "🏔️ K2 mountain is world's second highest",
      '🌾 Indus River civilization was ancient superpower',
      '🎬 Bollywood influence is strong',
      '📿 Islam is dominant religion',
      '🌊 Arabian Sea coastal country'
    ]
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    flag: '🇧🇩',
    continent: 'asia',
    hooks: {
      primary: '💧 River delta nation with dense population',
      secondary: 'Home to Ganges Delta and tigers'
    },
    facts: [
      "💧 Ganges-Brahmaputra Delta is world's largest",
      '🐯 Bengal tigers live in Sundarbans',
      '👥 Very densely populated',
      '📝 Bengali language is rich in literature',
      '🌾 Jute production capital'
    ]
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
    flag: '🇲🇲',
    continent: 'asia',
    hooks: {
      primary: '🏯 Southeast Asia with thousands of Buddhist pagodas',
      secondary: 'Isolated nation with ancient temples'
    },
    facts: [
      '🏯 Over 4,000 pagodas in Bagan',
      '🛕 Buddhism is deeply important',
      '🌾 Mekong River valley for rice farming',
      '💎 Rubies and jade are precious stones',
      '🌲 Still has pristine forests'
    ]
  },
  {
    id: 'nepal',
    name: 'Nepal',
    flag: '🇳🇵',
    continent: 'asia',
    hooks: {
      primary: '🏔️ Himalayan nation home to Mount Everest',
      secondary: 'Spiritual and mountainous Asian treasure'
    },
    facts: [
      "⛰️ Mount Everest is world's tallest mountain",
      '🧘 Birthplace of Buddhism',
      '🏛️ Kathmandu has ancient temples',
      '🌱 Very mountainous with amazing trekking',
      '🤝 Sherpa guides are world-famous mountaineers'
    ]
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    flag: '🇱🇰',
    continent: 'asia',
    hooks: {
      primary: '🏝️ Island nation south of India with tea and gems',
      secondary: 'Teardrop-shaped island with diverse wildlife'
    },
    facts: [
      '☕ Tea plantations cover the highlands',
      '💎 Gemstone capital—sapphires and rubies',
      '🏞️ Sigiriya Rock is ancient fortress',
      '🐘 Asian elephants and leopards roam',
      '🌴 Tropical beaches and forests'
    ]
  },
  {
    id: 'laos',
    name: 'Laos',
    flag: '🇱🇦',
    continent: 'asia',
    hooks: {
      primary: '🌾 Landlocked Southeast Asia with French colonial towns',
      secondary: 'Mekong River nation with relaxed pace'
    },
    facts: [
      '🌊 Mekong River is lifeline',
      '🇫🇷 French colonial architecture still visible',
      '🧘 Buddhist temples and monasteries',
      '🌾 Mainly agricultural rice-farming country',
      '⚡ Developing with beautiful wilderness'
    ]
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    flag: '🇰🇭',
    continent: 'asia',
    hooks: {
      primary: "🏛️ Southeast Asia with Angkor Wat—world's largest temple",
      secondary: 'Ancient Khmer civilization legacy'
    },
    facts: [
      "🏛️ Angkor Wat is world's largest religious monument",
      '🛕 Khmer architecture is intricate and beautiful',
      "🌊 Tonle Sap Lake is world's largest freshwater lake",
      '🌴 Tropical country with jungles',
      '👥 Recovering from difficult 20th century'
    ]
  },
  {
    id: 'mongolia',
    name: 'Mongolia',
    flag: '🇲🇳',
    continent: 'asia',
    hooks: {
      primary: '🐴 Central Asian steppe nation with nomadic heritage',
      secondary: 'Large landlocked country with Gobi Desert'
    },
    facts: [
      '🐴 Mongols are famous horsemen',
      '🏜️ Gobi Desert covers much of country',
      '⛺ Ger (yurt) is traditional dwelling',
      '🦅 Eagle hunting is traditional sport',
      '🛑 Genghis Khan was from Mongolia'
    ]
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    flag: '🇰🇿',
    continent: 'asia',
    hooks: {
      primary: '🏔️ Central Asian nation with steppes and oil',
      secondary: 'Largest landlocked country with Space Center'
    },
    facts: [
      '🚀 Baikonur Cosmodrome launches rockets',
      '🏜️ Vast steppes and deserts',
      '💧 Aral Sea ecological disaster area',
      '⛏️ Rich in oil, gas, and minerals',
      '🛤️ Silk Road crossroads historically'
    ]
  },

  // EUROPE (15 more)
  {
    id: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    continent: 'europe',
    hooks: {
      primary: '🏔️ Largest country spanning Europe and Asia',
      secondary: 'Land of onion domes, Trans-Siberian Railway, and vast wilderness'
    },
    facts: [
      '🌍 Stretches across 11 time zones',
      "🚂 Trans-Siberian Railway is world's longest train journey",
      '❄️ Siberia is freezing and remote',
      '🏛️ Hermitage Museum in St. Petersburg',
      '⛪ Orthodox churches with onion domes'
    ]
  },
  {
    id: 'ukraine',
    name: 'Ukraine',
    flag: '🇺🇦',
    continent: 'europe',
    hooks: {
      primary: '🌾 Eastern European nation between East and West',
      secondary: 'Sunflower fields and Black Sea beaches'
    },
    facts: [
      '🌻 Sunflowers are national flower',
      '🌊 Crimea beaches on Black Sea',
      '⚔️ Historically fought for independence',
      '🎨 Vibrant culture and art scene',
      '🇪🇺 Seeking integration with Europe'
    ]
  },
  {
    id: 'poland',
    name: 'Poland',
    flag: '🇵🇱',
    continent: 'europe',
    hooks: {
      primary: '🏰 Central European nation with castles and history',
      secondary: "Resilient nation with Krakow's medieval charm"
    },
    facts: [
      '🏰 Wawel Castle in Krakow is iconic',
      "🌳 Białowieża Forest is Europe's oldest",
      '💔 Deeply affected by WWII',
      '⚡ Growing tech and startup scene',
      '🇪🇺 EU member with strong economy'
    ]
  },
  {
    id: 'czech-republic',
    name: 'Czech Republic',
    flag: '🇨🇿',
    continent: 'europe',
    hooks: {
      primary: '🍺 Central European nation famous for beer',
      secondary: "Bohemia with Prague's fairy-tale architecture"
    },
    facts: [
      "🍺 Czech beer is world's best",
      '🏰 Prague Castle is stunning',
      '🕐 Astronomical Clock is medieval marvel',
      '⚡ Former Czechoslovakia split into two countries',
      '🇪🇺 Part of European Union'
    ]
  },
  {
    id: 'hungary',
    name: 'Hungary',
    flag: '🇭🇺',
    continent: 'europe',
    hooks: {
      primary: '🏖️ Central Europe with thermal baths and Danube River',
      secondary: "Budapest's thermal spas and ruin bars"
    },
    facts: [
      '♨️ Thermal baths in Budapest',
      '🌊 Danube River flows through capital',
      '🏛️ Gothic and Baroque architecture',
      '🎵 Classical composers from Hungary',
      '🍲 Goulash is traditional stew'
    ]
  },
  {
    id: 'romania',
    name: 'Romania',
    flag: '🇷🇴',
    continent: 'europe',
    hooks: {
      primary: '🦇 Eastern European nation with Carpathian mountains',
      secondary: 'Transylvania and Dracula legend home'
    },
    facts: [
      '🦇 Transylvania inspired Dracula stories',
      '🏔️ Carpathian Mountains with mountain villages',
      '🏰 Medieval castles and fortified towns',
      '⚡ Oil and natural resources',
      '🇪🇺 EU member since 2007'
    ]
  },
  {
    id: 'serbia',
    name: 'Serbia',
    flag: '🇷🇸',
    continent: 'europe',
    hooks: {
      primary: '🎵 Balkan nation with vibrant nightlife and culture',
      secondary: 'Eastern European crossroads with Ottoman heritage'
    },
    facts: [
      '🎪 Danube River flows through',
      '🎵 Live music and nightlife culture',
      '⚔️ Complex Balkan history',
      '🌲 Mountains and national parks',
      '🇪🇺 Candidate for EU membership'
    ]
  },
  {
    id: 'greece',
    name: 'Greece',
    flag: '🇬🇷',
    continent: 'europe',
    hooks: {
      primary: '🏛️ Birthplace of Western civilization and democracy',
      secondary: 'Mediterranean islands with ancient ruins'
    },
    facts: [
      '🏛️ Athens gave world democracy',
      '🏺 Ancient sculptures and philosophy',
      '🏝️ Over 6,000 islands in Aegean Sea',
      '🌊 Mediterranean beaches',
      '⛩️ Monasteries on Meteora rocks'
    ]
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    continent: 'europe',
    hooks: {
      primary: "⛵ Western Europe's oldest nation with Age of Discovery",
      secondary: "Lisbon's hills and port wine country"
    },
    facts: [
      '⛵ Age of Exploration explorers',
      '🍷 Port wine from Douro Valley',
      '⛪ Pastéis de Nata (custard tarts)',
      '🏖️ Algarve beaches in south',
      '🇪🇺 Atlantics edge of Europe'
    ]
  },
  {
    id: 'ireland',
    name: 'Ireland',
    flag: '🇮🇪',
    continent: 'europe',
    hooks: {
      primary: '🍀 The Emerald Isle with green hills and Irish spirit',
      secondary: 'Cliffs of Moher and literary traditions'
    },
    facts: [
      "🍀 St. Patrick's Day celebration",
      '⛩️ Celtic heritage and mythology',
      '🏖️ Cliffs of Moher dramatic coastline',
      '🎵 Irish music and storytelling',
      '🍺 Guinness beer from Dublin'
    ]
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    flag: '🇳🇱',
    continent: 'europe',
    hooks: {
      primary: '🚲 Low-lying European country of canals and bikes',
      secondary: "Amsterdam's waterways and windmills"
    },
    facts: [
      '🚲 Bikes are primary transportation',
      '🌷 Tulips are iconic flowers',
      '⛑️ Much below sea level—dikes hold back water',
      '🏠 Canal houses with step-gable roofs',
      '⛩️ Anne Frank House in Amsterdam'
    ]
  },
  {
    id: 'belgium',
    name: 'Belgium',
    flag: '🇧🇪',
    continent: 'europe',
    hooks: {
      primary: '🍫 Small European nation famous for chocolate',
      secondary: 'Medieval towns and medieval architecture'
    },
    facts: [
      "🍫 Belgian chocolate is world's best",
      '🍺 Belgian beer varieties',
      '🏰 Bruges (Brugge) is fairy-tale medieval town',
      '🌭 French fries (frites) originated here',
      '🇪🇺 Home to EU headquarters'
    ]
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    flag: '🇨🇭',
    continent: 'europe',
    hooks: {
      primary: '⛰️ Alpine nation famous for mountains and neutrality',
      secondary: 'Home to Alps, watches, and chocolate'
    },
    facts: [
      '⛰️ Alps cover 60% of country',
      "⌚ Swiss watches are world's best",
      '🍫 Chocolate and cheese are excellent',
      '🏔️ Skiing and alpine sports',
      "⚖️ Neutral nation hasn't fought in centuries"
    ]
  },
  {
    id: 'austria',
    name: 'Austria',
    flag: '🇦🇹',
    continent: 'europe',
    hooks: {
      primary: '🎻 Alpine nation of music and mountains',
      secondary: "Mozart and Vienna's imperial palaces"
    },
    facts: [
      '🎵 Mozart and classical music heritage',
      '🏰 Schönbrunn Palace is magnificent',
      '⛰️ Alps in western regions',
      '🎄 Christmas markets are famous',
      '🍫 Sachertorte (chocolate cake) tradition'
    ]
  },
  {
    id: 'scotland',
    name: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    continent: 'europe',
    hooks: {
      primary: '🏰 Scottish Highlands with misty lochs and castles',
      secondary: "Edinburgh's history and Loch Ness mysteries"
    },
    facts: [
      '🏰 Edinburgh Castle on volcanic rock',
      '👻 Loch Ness monster legend',
      '🥃 Bagpipes and kilts are traditional',
      '🏈 Scottish ancestry pride',
      '⛩️ Stonehenge and ancient history'
    ]
  },

  // AMERICAS (15 more)
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    continent: 'americas',
    hooks: {
      primary: '🍁 Vast northern country with Niagara Falls and Rocky Mountains',
      secondary: 'Second-largest country with incredible wilderness'
    },
    facts: [
      '💧 Niagara Falls is natural wonder',
      '🏔️ Rocky Mountains span western Canada',
      '🦫 Beavers are national animal',
      '🥏 Hockey is national sport',
      '🌲 Vast forests and pristine wilderness'
    ]
  },
  {
    id: 'chile',
    name: 'Chile',
    flag: '🇨🇱',
    continent: 'americas',
    hooks: {
      primary: '📏 Long thin South American country with diverse climates',
      secondary: "Atacama Desert to Patagonia's ice fields"
    },
    facts: [
      '🏜️ Atacama Desert is driest place on Earth',
      '❄️ Patagonia has glaciers and peaks',
      '🌊 Easter Island belongs to Chile',
      '🍷 Excellent wine regions',
      '🏔️ Andes Mountains form backbone'
    ]
  },
  {
    id: 'peru',
    name: 'Peru',
    flag: '🇵🇪',
    continent: 'americas',
    hooks: {
      primary: '🏔️ South American nation with Machu Picchu and Amazon',
      secondary: 'Ancient Incan empire and vast jungles'
    },
    facts: [
      '🏔️ Machu Picchu is Incan citadel',
      '🌿 Amazon rainforest covers east side',
      '⛰️ Andes Mountains run north-south',
      '🦙 Llamas and alpacas roam',
      '🎭 Quechua indigenous culture'
    ]
  },
  {
    id: 'colombia',
    name: 'Colombia',
    flag: '🇨🇴',
    continent: 'americas',
    hooks: {
      primary: '☕ South American gateway with rainforests and coffee',
      secondary: 'Magical realism home with vibrant cities'
    },
    facts: [
      "☕ World's top coffee producer",
      '🌿 Amazon rainforest region',
      '🏞️ Coffee Triangle region is scenic',
      '🎵 Salsa dancing and cumbia music',
      '⚡ Growing tourism and culture'
    ]
  },
  {
    id: 'venezuela',
    name: 'Venezuela',
    flag: '🇻🇪',
    continent: 'americas',
    hooks: {
      primary: '💧 Northern South America with Angel Falls',
      secondary: "Country with world's largest proven oil reserves"
    },
    facts: [
      "💧 Angel Falls is world's highest uninterrupted waterfall",
      '⛰️ Tepuis (table-top mountains) are unique geology',
      '🦅 Rich wildlife and biodiversity',
      "⚫ Oil reserves are nation's wealth",
      '⚡ Currently facing economic challenges'
    ]
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
    flag: '🇪🇨',
    continent: 'americas',
    hooks: {
      primary: '🌴 Small South American country on equator with Galápagos',
      secondary: 'Amazon, Andes, and unique island wildlife'
    },
    facts: [
      "🌍 Sits on the equator (that's what Ecuador means)",
      '🦎 Galápagos Islands with unique animals',
      '🌿 Amazon rainforest region',
      '⛰️ Andes mountains with volcanoes',
      '🦋 Incredible biodiversity'
    ]
  },
  {
    id: 'bolivia',
    name: 'Bolivia',
    flag: '🇧🇴',
    continent: 'americas',
    hooks: {
      primary: '⛰️ Landlocked South America with Salar de Uyuni salt flat',
      secondary: 'Andes mountains and ancient indigenous culture'
    },
    facts: [
      "⚪ Salar de Uyuni is world's largest salt flat",
      "⛰️ La Paz is world's highest capital",
      '🦙 Llamas are important animals',
      '🎭 Indigenous Aymara and Quechua cultures',
      '🌿 Amazon basin to the east'
    ]
  },
  {
    id: 'paraguay',
    name: 'Paraguay',
    flag: '🇵🇾',
    continent: 'americas',
    hooks: {
      primary: '🌾 Landlocked South America with subtropical climate',
      secondary: 'Bilingual nation with Jesuit heritage'
    },
    facts: [
      '🗣️ Spanish and Guaraní both official languages',
      '⚡ Hydroelectric dams provide power',
      '🌾 Agricultural exports of soy and beef',
      '🎭 Guaraní indigenous culture strong',
      '🌊 Paraná River is lifeline'
    ]
  },
  {
    id: 'honduras',
    name: 'Honduras',
    flag: '🇭🇳',
    continent: 'americas',
    hooks: {
      primary: '🏝️ Central America with Caribbean islands',
      secondary: 'Bay Islands and Mesoamerican Reef'
    },
    facts: [
      '🏝️ Roatán Island is diving paradise',
      '🌊 Second-longest coral reef in world',
      '🏛️ Mayan ruins at Copán',
      '🌴 Central American rainforests',
      '⛰️ Mountainous terrain'
    ]
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    flag: '🇨🇷',
    continent: 'americas',
    hooks: {
      primary: '🌴 Central American paradise with biodiversity',
      secondary: 'No army and focused on conservation'
    },
    facts: [
      '🦜 Sloths, monkeys, and parrots roam',
      '🌋 Volcanic mountains throughout',
      '🌿 25% of land is national parks',
      '⚖️ No military since 1948',
      '☮️ Pura Vida (pure life) is national motto'
    ]
  },
  {
    id: 'panama',
    name: 'Panama',
    flag: '🇵🇦',
    continent: 'americas',
    hooks: {
      primary: '🚢 Central American country with world-famous canal',
      secondary: 'Bridge between North and South America'
    },
    facts: [
      '⛩️ Panama Canal connects Atlantic and Pacific',
      "⛩️ 5% of world's trade goes through canal",
      '🌴 Cloud forests and wildlife',
      '🏘️ Panama City is modern metropolis',
      '🐠 Bocas del Toro islands'
    ]
  },
  {
    id: 'cuba',
    name: 'Cuba',
    flag: '🇨🇺',
    continent: 'americas',
    hooks: {
      primary: '🚗 Caribbean island with 1950s cars and colorful cities',
      secondary: "Havana's colonial architecture and cigars"
    },
    facts: [
      '🚗 1950s American cars still drive streets',
      '🏴󠁶󠁩󠁳󠁫󠁯󠁿 Communist island 90 miles from Florida',
      '🎺 Salsa music and dance',
      '🌴 Beautiful beaches and tropical setting',
      '⚖️ Longest-serving leader (Castro)'
    ]
  },
  {
    id: 'dominican-republic',
    name: 'Dominican Republic',
    flag: '🇩🇴',
    continent: 'americas',
    hooks: {
      primary: '🏝️ Caribbean island with beautiful beaches',
      secondary: 'Hispaniola island with merengue music'
    },
    facts: [
      '🏖️ Caribbean beaches and resorts',
      '🎵 Merengue and reggaeton music',
      '⚾ Baseball is national obsession',
      '🌴 Tropical climate year-round',
      '⛪ Oldest city in Americas (Santo Domingo)'
    ]
  },
  {
    id: 'jamaica',
    name: 'Jamaica',
    flag: '🇯🇲',
    continent: 'americas',
    hooks: {
      primary: '🎵 Caribbean island famous for reggae music',
      secondary: 'Bob Marley home and track and field powerhouse'
    },
    facts: [
      '🎵 Reggae music originated here',
      '👨 Bob Marley is cultural icon',
      "🏃 Track and field sprinters are world's best",
      '⛰️ Blue Mountains produce famous coffee',
      '🌊 Caribbean beaches and water sports'
    ]
  },
  {
    id: 'haiti',
    name: 'Haiti',
    flag: '🇭🇹',
    continent: 'americas',
    hooks: {
      primary: '🏝️ Caribbean island—first Black republic',
      secondary: 'Rich culture and challenging history'
    },
    facts: [
      '🗽 First independent Black nation (1804)',
      '⛪ Voodoo spirituality mixed with Catholicism',
      '🥁 Drumming and African heritage',
      '🌴 Hispaniola island shares with Dom. Republic',
      '⛰️ Mountainous and poor infrastructure'
    ]
  },

  // OCEANIA (5 more)
  {
    id: 'fiji',
    name: 'Fiji',
    flag: '🇫🇯',
    continent: 'oceania',
    hooks: {
      primary: '🏝️ South Pacific island nation with tropical paradise',
      secondary: 'Over 300 islands with water sports'
    },
    facts: [
      '🏝️ Over 330 islands in Pacific',
      '🏖️ Blue lagoons and white sand beaches',
      '🤿 World-class diving and snorkeling',
      '🥥 Coconut is important crop',
      '☺️ Bula—friendly greeting'
    ]
  },
  {
    id: 'samoa',
    name: 'Samoa',
    flag: '🇼🇸',
    continent: 'oceania',
    hooks: {
      primary: '🏝️ South Pacific islands with Polynesian culture',
      secondary: 'Tropical paradise with unique traditions'
    },
    facts: [
      '🏝️ 9 volcanic islands',
      '🌴 Tropical rainforests',
      '🏖️ Pristine beaches',
      '🎭 Polynesian traditions and dance',
      '☺️ Relaxed island lifestyle'
    ]
  },
  {
    id: 'tonga',
    name: 'Tonga',
    flag: '🇹🇴',
    continent: 'oceania',
    hooks: {
      primary: '🏝️ Polynesian kingdom with whale watching',
      secondary: 'Traditional culture preserved island nation'
    },
    facts: [
      '🏝️ 176 islands',
      '🐋 Humpback whales visit seasonally',
      '👑 Only Pacific nation never colonized',
      '🏖️ Beautiful beaches and reefs',
      '🎭 Traditional Tongan customs'
    ]
  }
];

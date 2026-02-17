// World Explorer - Learn About Countries!
// Educational Game for Kids
// MIGRATED TO TEMPLATE SYSTEM V2.0

// World Explorer local colors - Coolors palette #D4E09B / #F6F4D2 / #CBDFBD / #F19C79 / #A44A3F
const WE_COLORS = {
    primary: 0xA44A3F,        // Brick red - main buttons & CTAs
    secondary: 0xF19C79,      // Peach - secondary buttons
    success: 0xA44A3F,        // Brick red (only dark enough for white button text)
    error: 0xA44A3F,          // Brick red
    background: 0xF6F4D2,     // Cream background
    cardBg: 0xFFFFFF,         // White cards for contrast
    text: COLORS.neutral.darkText.phaser,
    textLight: 0x8B6456,      // Muted brick for back/minor buttons
    // Continent colors - one palette color each
    africa: 0xF19C79,         // Peach
    asia: 0xA44A3F,           // Brick red
    americas: 0xCBDFBD,       // Soft green
    europe: 0xD4E09B,         // Yellow-green
    oceania: 0xCBDFBD         // Soft green
};

const config = createGameConfig({
    width: 900,
    height: 650,
    backgroundColor: WE_COLORS.background,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

const game = new Phaser.Game(config);

// Game state
let currentScene = 'menu';
let currentDifficulty = 1;
let currentCountry = null;
let score = 0;
let countriesLearned = JSON.parse(localStorage.getItem('we_countriesLearned') || '[]');
let unlockedDifficulties = parseInt(localStorage.getItem('we_unlockedDifficulties') || '1', 10);

// Comprehensive Country Database
const COUNTRIES = {
    // DIFFICULTY 1: Popular countries kids often hear about
    usa: {
        name: "United States",
        flag: "🇺🇸",
        continent: "North America",
        continentColor: WE_COLORS.americas,
        capital: "Washington D.C.",
        majorCities: ["New York", "Los Angeles", "Chicago"],
        language: ["English"],
        famousPlaces: [
            "Statue of Liberty - Giant statue in New York",
            "Grand Canyon - Massive canyon in Arizona",
            "Hollywood - Where movies are made!",
            "Disney World - Biggest theme park"
        ],
        funFacts: [
            "Has 50 states with different laws",
            "Invented the airplane and internet",
            "Home to the biggest tech companies"
        ],
        culture: "Famous for hamburgers, hot dogs, and pizza. Loves sports like basketball and American football!",
        difficulty: 1
    },

    uk: {
        name: "United Kingdom",
        flag: "🇬🇧",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "London",
        majorCities: ["London", "Edinburgh", "Manchester"],
        language: ["English"],
        famousPlaces: [
            "Big Ben - Famous clock tower in London",
            "Buckingham Palace - Where the King lives",
            "Stonehenge - Ancient mysterious stones",
            "Tower Bridge - Iconic bridge over Thames"
        ],
        funFacts: [
            "Has a royal family with a King",
            "Invented football (soccer)",
            "Drinks more tea than any country!"
        ],
        culture: "Famous for fish and chips, tea time, and double-decker buses. Very polite and loves queuing!",
        difficulty: 1
    },

    france: {
        name: "France",
        flag: "🇫🇷",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Paris",
        majorCities: ["Paris", "Lyon", "Marseille"],
        language: ["French"],
        famousPlaces: [
            "Eiffel Tower - Tallest structure in Paris",
            "Louvre Museum - Has the Mona Lisa painting",
            "Arc de Triomphe - Victory monument",
            "Disneyland Paris - European Disney park"
        ],
        funFacts: [
            "Most visited country in the world",
            "Invented the hot air balloon",
            "Has over 400 types of cheese!"
        ],
        culture: "Famous for croissants, baguettes, and pastries. Known for art, fashion, and romance!",
        difficulty: 1
    },

    japan: {
        name: "Japan",
        flag: "🇯🇵",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Tokyo",
        majorCities: ["Tokyo", "Osaka", "Kyoto"],
        language: ["Japanese"],
        famousPlaces: [
            "Mount Fuji - Sacred snow-capped mountain",
            "Tokyo Tower - Like a red Eiffel Tower",
            "Golden Temple - Beautiful shrine in Kyoto",
            "Shibuya Crossing - World's busiest crossing"
        ],
        funFacts: [
            "Made up of 6,852 islands!",
            "Invented karaoke and emoji",
            "Has vending machines everywhere"
        ],
        culture: "Famous for sushi, ramen, and anime. Very respectful culture that bows to greet!",
        difficulty: 1
    },

    australia: {
        name: "Australia",
        flag: "🇦🇺",
        continent: "Oceania",
        continentColor: WE_COLORS.oceania,
        capital: "Canberra",
        majorCities: ["Sydney", "Melbourne", "Brisbane"],
        language: ["English"],
        famousPlaces: [
            "Sydney Opera House - Looks like white sails",
            "Great Barrier Reef - Largest coral reef",
            "Uluru (Ayers Rock) - Sacred red rock",
            "Bondi Beach - Famous surfing beach"
        ],
        funFacts: [
            "Has more kangaroos than people",
            "Home to the deadliest animals",
            "Biggest island and smallest continent"
        ],
        culture: "Famous for barbecues, surfing, and saying 'G'day mate!' Loves outdoor activities!",
        difficulty: 1
    },

    india: {
        name: "India",
        flag: "🇮🇳",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "New Delhi",
        majorCities: ["Mumbai", "Delhi", "Bangalore"],
        language: ["Hindi", "English", "22+ others"],
        famousPlaces: [
            "Taj Mahal - White marble love monument",
            "Red Fort - Massive red sandstone fort",
            "Golden Temple - Holy Sikh temple",
            "Gateway of India - Mumbai's landmark"
        ],
        funFacts: [
            "Invented chess and yoga",
            "Has the most languages in the world",
            "Birthplace of 4 major religions"
        ],
        culture: "Famous for curry, spices, and colorful festivals. Invented zero in mathematics!",
        difficulty: 1
    },

    china: {
        name: "China",
        flag: "🇨🇳",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Beijing",
        majorCities: ["Beijing", "Shanghai", "Hong Kong"],
        language: ["Mandarin Chinese"],
        famousPlaces: [
            "Great Wall of China - Longest wall ever",
            "Forbidden City - Ancient palace complex",
            "Terracotta Army - Clay soldier statues",
            "Panda Reserves - Where pandas live"
        ],
        funFacts: [
            "Most populated country (1.4 billion!)",
            "Invented paper, printing, and gunpowder",
            "Has only one time zone despite being huge"
        ],
        culture: "Famous for Chinese food, martial arts, and dragons. Uses chopsticks to eat!",
        difficulty: 1
    },

    brazil: {
        name: "Brazil",
        flag: "🇧🇷",
        continent: "South America",
        continentColor: WE_COLORS.americas,
        capital: "Brasília",
        majorCities: ["São Paulo", "Rio de Janeiro", "Salvador"],
        language: ["Portuguese"],
        famousPlaces: [
            "Christ the Redeemer - Giant Jesus statue",
            "Amazon Rainforest - World's largest jungle",
            "Copacabana Beach - Famous Rio beach",
            "Iguazu Falls - Massive waterfalls"
        ],
        funFacts: [
            "Largest country in South America",
            "Won the most World Cups in soccer",
            "Home to 10% of all animal species"
        ],
        culture: "Famous for soccer, samba dancing, and carnival. Very energetic and festive people!",
        difficulty: 1
    },

    egypt: {
        name: "Egypt",
        flag: "🇪🇬",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Cairo",
        majorCities: ["Cairo", "Alexandria", "Giza"],
        language: ["Arabic"],
        famousPlaces: [
            "Pyramids of Giza - Ancient wonders",
            "Sphinx - Giant lion-human statue",
            "Nile River - Longest river in world",
            "Valley of the Kings - Pharaoh tombs"
        ],
        funFacts: [
            "Pyramids are over 4,500 years old!",
            "Ancient Egyptians invented paper",
            "Had one of the first civilizations ever"
        ],
        culture: "Famous for ancient history and mummies. Most people live near the Nile River!",
        difficulty: 1
    },

    canada: {
        name: "Canada",
        flag: "🇨🇦",
        continent: "North America",
        continentColor: WE_COLORS.americas,
        capital: "Ottawa",
        majorCities: ["Toronto", "Vancouver", "Montreal"],
        language: ["English", "French"],
        famousPlaces: [
            "Niagara Falls - Massive waterfalls",
            "CN Tower - Very tall tower in Toronto",
            "Rocky Mountains - Beautiful mountains",
            "Banff National Park - Stunning nature"
        ],
        funFacts: [
            "Second largest country in the world",
            "Has more lakes than rest of world combined",
            "Invented basketball and ice hockey"
        ],
        culture: "Famous for maple syrup, being polite, and saying 'sorry' a lot! Very multicultural!",
        difficulty: 1
    },

    // DIFFICULTY 2: Well-known countries
    germany: {
        name: "Germany",
        flag: "🇩🇪",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Berlin",
        majorCities: ["Berlin", "Munich", "Hamburg"],
        language: ["German"],
        famousPlaces: [
            "Brandenburg Gate - Historic Berlin gate",
            "Neuschwanstein Castle - Fairy tale castle",
            "Berlin Wall Memorial - Cold War history",
            "Black Forest - Mysterious dark forest"
        ],
        funFacts: [
            "Invented the car and printing press",
            "Has over 1,500 types of sausages",
            "Most powerful economy in Europe"
        ],
        culture: "Famous for pretzels, sausages, and Oktoberfest. Very organized and punctual people!",
        difficulty: 2
    },

    italy: {
        name: "Italy",
        flag: "🇮🇹",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Rome",
        majorCities: ["Rome", "Venice", "Florence"],
        language: ["Italian"],
        famousPlaces: [
            "Colosseum - Ancient Roman arena",
            "Leaning Tower of Pisa - Tilted tower",
            "Venice Canals - City on water",
            "Vatican City - Smallest country inside Rome"
        ],
        funFacts: [
            "Invented pizza and ice cream",
            "Has the most UNESCO World Heritage Sites",
            "Shaped like a boot!"
        ],
        culture: "Famous for pasta, pizza, and gelato. Very expressive and family-oriented!",
        difficulty: 2
    },

    spain: {
        name: "Spain",
        flag: "🇪🇸",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Madrid",
        majorCities: ["Madrid", "Barcelona", "Valencia"],
        language: ["Spanish"],
        famousPlaces: [
            "Sagrada Familia - Unique Barcelona church",
            "Alhambra - Moorish palace in Granada",
            "Park Güell - Colorful mosaic park",
            "Running of the Bulls - Pamplona festival"
        ],
        funFacts: [
            "Second most spoken language in world",
            "Invented the guitar and mop",
            "Takes siestas (afternoon naps)"
        ],
        culture: "Famous for paella, tapas, and flamenco dancing. Dinner is very late at night!",
        difficulty: 2
    },

    mexico: {
        name: "Mexico",
        flag: "🇲🇽",
        continent: "North America",
        continentColor: WE_COLORS.americas,
        capital: "Mexico City",
        majorCities: ["Mexico City", "Guadalajara", "Cancún"],
        language: ["Spanish"],
        famousPlaces: [
            "Chichen Itza - Ancient Mayan pyramid",
            "Teotihuacan - Pyramid of the Sun",
            "Frida Kahlo Museum - Famous artist",
            "Copper Canyon - Bigger than Grand Canyon"
        ],
        funFacts: [
            "Invented chocolate and popcorn",
            "Has the most pyramids in the world",
            "Day of the Dead celebrates ancestors"
        ],
        culture: "Famous for tacos, mariachi music, and colorful culture. Very festive and warm people!",
        difficulty: 2
    },

    russia: {
        name: "Russia",
        flag: "🇷🇺",
        continent: "Europe/Asia",
        continentColor: WE_COLORS.europe,
        capital: "Moscow",
        majorCities: ["Moscow", "St. Petersburg", "Sochi"],
        language: ["Russian"],
        famousPlaces: [
            "Red Square - Famous Moscow plaza",
            "St. Basil's Cathedral - Colorful domes",
            "Kremlin - Government fortress",
            "Trans-Siberian Railway - Longest train route"
        ],
        funFacts: [
            "Largest country in the world!",
            "Spans 11 time zones",
            "Launched first satellite and astronaut"
        ],
        culture: "Famous for nesting dolls, ballet, and vodka. Very cold winters with lots of snow!",
        difficulty: 2
    },

    southafrica: {
        name: "South Africa",
        flag: "🇿🇦",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Pretoria/Cape Town/Bloemfontein",
        majorCities: ["Johannesburg", "Cape Town", "Durban"],
        language: ["11 official languages!"],
        famousPlaces: [
            "Table Mountain - Flat-topped mountain",
            "Kruger National Park - Safari animals",
            "Robben Island - Where Mandela was jailed",
            "Cape of Good Hope - Southern tip of Africa"
        ],
        funFacts: [
            "Has 3 capital cities!",
            "Most languages of any country",
            "First country to give up nuclear weapons"
        ],
        culture: "Famous for safaris, diverse wildlife, and Nelson Mandela. Called 'Rainbow Nation'!",
        difficulty: 2
    },

    greece: {
        name: "Greece",
        flag: "🇬🇷",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Athens",
        majorCities: ["Athens", "Thessaloniki", "Santorini"],
        language: ["Greek"],
        famousPlaces: [
            "Acropolis - Ancient hilltop temple",
            "Parthenon - Temple of Athena",
            "Santorini - Beautiful island with blue domes",
            "Mount Olympus - Home of Greek gods"
        ],
        funFacts: [
            "Birthplace of democracy and Olympics",
            "Has over 6,000 islands!",
            "Invented theater and philosophy"
        ],
        culture: "Famous for Greek salad, mythology, and breaking plates. Loves dancing and celebrating!",
        difficulty: 2
    },

    thailand: {
        name: "Thailand",
        flag: "🇹🇭",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Bangkok",
        majorCities: ["Bangkok", "Chiang Mai", "Phuket"],
        language: ["Thai"],
        famousPlaces: [
            "Grand Palace - Golden royal palace",
            "Wat Pho - Temple with giant Buddha",
            "Phi Phi Islands - Beautiful beaches",
            "Floating Markets - Markets on boats"
        ],
        funFacts: [
            "Only Asian country never colonized",
            "Land of Smiles - very friendly people",
            "Has a water festival where everyone splashes"
        ],
        culture: "Famous for pad thai, temples, and elephants. Very respectful with hands together greeting!",
        difficulty: 2
    },

    argentina: {
        name: "Argentina",
        flag: "🇦🇷",
        continent: "South America",
        continentColor: WE_COLORS.americas,
        capital: "Buenos Aires",
        majorCities: ["Buenos Aires", "Córdoba", "Mendoza"],
        language: ["Spanish"],
        famousPlaces: [
            "Iguazu Falls - Spectacular waterfalls",
            "Perito Moreno Glacier - Huge ice glacier",
            "Patagonia - Wild beautiful region",
            "Tango Halls - Where tango was born"
        ],
        funFacts: [
            "Home of tango dancing",
            "Has the widest street in the world",
            "Best beef and soccer in South America"
        ],
        culture: "Famous for beef, tango, and soccer. Very passionate about football and Messi!",
        difficulty: 2
    },

    newzealand: {
        name: "New Zealand",
        flag: "🇳🇿",
        continent: "Oceania",
        continentColor: WE_COLORS.oceania,
        capital: "Wellington",
        majorCities: ["Auckland", "Wellington", "Christchurch"],
        language: ["English", "Māori"],
        famousPlaces: [
            "Hobbiton - Lord of the Rings movie set",
            "Milford Sound - Stunning fjord",
            "Rotorua - Geothermal hot springs",
            "Sky Tower - Tallest tower in Auckland"
        ],
        funFacts: [
            "Where Lord of the Rings was filmed",
            "Has more sheep than people",
            "Last place to be discovered by humans"
        ],
        culture: "Famous for rugby, kiwi birds, and Haka dance. Very adventurous outdoor culture!",
        difficulty: 2
    },

    // DIFFICULTY 3: Lesser-known but interesting countries
    norway: {
        name: "Norway",
        flag: "🇳🇴",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Oslo",
        majorCities: ["Oslo", "Bergen", "Trondheim"],
        language: ["Norwegian"],
        famousPlaces: [
            "Northern Lights - Aurora Borealis",
            "Fjords - Deep water valleys",
            "Viking Ship Museum - Ancient ships",
            "Trolltunga - Cliff that looks like tongue"
        ],
        funFacts: [
            "See the midnight sun in summer",
            "Happiest country in the world",
            "Home of Vikings long ago"
        ],
        culture: "Famous for fjords, skiing, and Vikings. Very nature-loving and eco-friendly!",
        difficulty: 3
    },

    peru: {
        name: "Peru",
        flag: "🇵🇪",
        continent: "South America",
        continentColor: WE_COLORS.americas,
        capital: "Lima",
        majorCities: ["Lima", "Cusco", "Arequipa"],
        language: ["Spanish", "Quechua"],
        famousPlaces: [
            "Machu Picchu - Ancient Incan city in clouds",
            "Nazca Lines - Giant ground drawings",
            "Lake Titicaca - Highest lake in world",
            "Amazon Rainforest - Part of the jungle"
        ],
        funFacts: [
            "Home of the ancient Inca Empire",
            "Has 3 different climate zones",
            "Invented the potato!"
        ],
        culture: "Famous for ceviche, llamas, and Incan history. Very rich in ancient culture!",
        difficulty: 3
    },

    turkey: {
        name: "Turkey",
        flag: "🇹🇷",
        continent: "Europe/Asia",
        continentColor: WE_COLORS.europe,
        capital: "Ankara",
        majorCities: ["Istanbul", "Ankara", "Izmir"],
        language: ["Turkish"],
        famousPlaces: [
            "Hagia Sophia - Ancient cathedral/mosque",
            "Hot Air Balloons - Cappadocia balloons",
            "Pamukkale - White travertine terraces",
            "Grand Bazaar - Huge covered market"
        ],
        funFacts: [
            "Istanbul is in both Europe and Asia",
            "Introduced tulips to the world",
            "Had one of the first underground railways"
        ],
        culture: "Famous for kebabs, Turkish delight, and carpets. Very hospitable and loves tea!",
        difficulty: 3
    },

    kenya: {
        name: "Kenya",
        flag: "🇰🇪",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Nairobi",
        majorCities: ["Nairobi", "Mombasa", "Kisumu"],
        language: ["Swahili", "English"],
        famousPlaces: [
            "Masai Mara - Famous safari park",
            "Mount Kenya - Second highest in Africa",
            "Diani Beach - Beautiful white sand beach",
            "Great Rift Valley - Huge valley"
        ],
        funFacts: [
            "Birthplace of Barack Obama's father",
            "World's best long-distance runners",
            "See the Great Migration of animals"
        ],
        culture: "Famous for safaris, wildlife, and Masai warriors. Very diverse with 40+ ethnic groups!",
        difficulty: 3
    },

    morocco: {
        name: "Morocco",
        flag: "🇲🇦",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Rabat",
        majorCities: ["Casablanca", "Marrakech", "Fes"],
        language: ["Arabic", "French"],
        famousPlaces: [
            "Marrakech Souks - Colorful markets",
            "Sahara Desert - Giant sand dunes",
            "Blue City Chefchaouen - All blue buildings",
            "Hassan II Mosque - Stunning mosque"
        ],
        funFacts: [
            "Northernmost country in Africa",
            "Famous for mint tea and tagine",
            "Has mountains, deserts, and beaches"
        ],
        culture: "Famous for colorful markets, spices, and hospitality. Mix of Arab and Berber culture!",
        difficulty: 3
    },

    // DIFFICULTY 2 (continued) - More well-known countries
    southkorea: {
        name: "South Korea",
        flag: "🇰🇷",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Seoul",
        majorCities: ["Seoul", "Busan", "Incheon"],
        language: ["Korean"],
        famousPlaces: [
            "Gyeongbokgung Palace - Beautiful royal palace",
            "N Seoul Tower - Iconic tower on mountain",
            "Jeju Island - Volcanic island paradise",
            "DMZ - Border between North and South"
        ],
        funFacts: [
            "Created K-pop music sensation",
            "Home of taekwondo martial art",
            "Has the fastest internet in world"
        ],
        culture: "Famous for K-pop, kimchi, and technology. Very tech-savvy with gaming culture!",
        difficulty: 2
    },

    netherlands: {
        name: "Netherlands",
        flag: "🇳🇱",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Amsterdam",
        majorCities: ["Amsterdam", "Rotterdam", "The Hague"],
        language: ["Dutch"],
        famousPlaces: [
            "Windmills - Iconic Dutch windmills",
            "Tulip Fields - Colorful flower fields",
            "Anne Frank House - Historical museum",
            "Canals of Amsterdam - Beautiful waterways"
        ],
        funFacts: [
            "Has more bikes than people",
            "Tallest people in the world",
            "Much of country is below sea level"
        ],
        culture: "Famous for tulips, cheese, and bikes. Very cycling-friendly and open-minded!",
        difficulty: 2
    },

    switzerland: {
        name: "Switzerland",
        flag: "🇨🇭",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Bern",
        majorCities: ["Zurich", "Geneva", "Basel"],
        language: ["German", "French", "Italian"],
        famousPlaces: [
            "Matterhorn - Iconic pyramid mountain",
            "Swiss Alps - Beautiful mountains",
            "Lake Geneva - Scenic alpine lake",
            "Jungfraujoch - Top of Europe station"
        ],
        funFacts: [
            "Invented Swiss Army knives",
            "Famous for chocolate and cheese",
            "Never been in a war since 1815"
        ],
        culture: "Famous for watches, banking, and neutrality. Very precise and organized people!",
        difficulty: 2
    },

    sweden: {
        name: "Sweden",
        flag: "🇸🇪",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Stockholm",
        majorCities: ["Stockholm", "Gothenburg", "Malmö"],
        language: ["Swedish"],
        famousPlaces: [
            "Stockholm Archipelago - 30,000 islands",
            "Vasa Museum - Ancient warship museum",
            "Icehotel - Hotel made of ice",
            "Northern Lights - Aurora in Lapland"
        ],
        funFacts: [
            "Has 267,000 islands!",
            "Created IKEA and Minecraft",
            "First country to ban smacking children"
        ],
        culture: "Famous for meatballs, IKEA, and Vikings. Very eco-friendly and egalitarian!",
        difficulty: 2
    },

    portugal: {
        name: "Portugal",
        flag: "🇵🇹",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Lisbon",
        majorCities: ["Lisbon", "Porto", "Faro"],
        language: ["Portuguese"],
        famousPlaces: [
            "Tower of Belém - Medieval fortress",
            "Pena Palace - Colorful fairy-tale castle",
            "Douro Valley - Beautiful wine region",
            "Algarve Beaches - Stunning coastline"
        ],
        funFacts: [
            "Oldest country in Europe (since 1143)",
            "Invented egg tarts (Pastel de Nata)",
            "Cristiano Ronaldo's home country"
        ],
        culture: "Famous for port wine, fado music, and explorers. Very maritime history!",
        difficulty: 2
    },

    // DIFFICULTY 3 (continued) - Interesting countries
    vietnam: {
        name: "Vietnam",
        flag: "🇻🇳",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Hanoi",
        majorCities: ["Ho Chi Minh City", "Hanoi", "Da Nang"],
        language: ["Vietnamese"],
        famousPlaces: [
            "Ha Long Bay - Stunning limestone islands",
            "Cu Chi Tunnels - Historic war tunnels",
            "Hoi An Ancient Town - Lantern-lit old town",
            "Mekong Delta - River delta region"
        ],
        funFacts: [
            "Shaped like a dragon",
            "World's largest cave (Son Doong)",
            "Invented pho noodle soup"
        ],
        culture: "Famous for pho, coffee, and lanterns. Very resilient and hardworking people!",
        difficulty: 3
    },

    indonesia: {
        name: "Indonesia",
        flag: "🇮🇩",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Jakarta",
        majorCities: ["Jakarta", "Surabaya", "Bali"],
        language: ["Indonesian"],
        famousPlaces: [
            "Bali - Paradise island destination",
            "Borobudur - Largest Buddhist temple",
            "Komodo Island - Home of Komodo dragons",
            "Raja Ampat - World's best diving"
        ],
        funFacts: [
            "Largest archipelago (17,000+ islands!)",
            "Most volcanoes in the world",
            "Fourth most populated country"
        ],
        culture: "Famous for temples, beaches, and diversity. Over 300 ethnic groups speak 700+ languages!",
        difficulty: 3
    },

    uae: {
        name: "United Arab Emirates",
        flag: "🇦🇪",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Abu Dhabi",
        majorCities: ["Dubai", "Abu Dhabi", "Sharjah"],
        language: ["Arabic"],
        famousPlaces: [
            "Burj Khalifa - Tallest building in world",
            "Palm Jumeirah - Artificial palm island",
            "Sheikh Zayed Mosque - Stunning white mosque",
            "Dubai Mall - Largest shopping mall"
        ],
        funFacts: [
            "Built islands shaped like palm trees",
            "Has no rivers but lots of oil",
            "Only 20% are native Emiratis"
        ],
        culture: "Famous for luxury, skyscrapers, and deserts. Very modern and cosmopolitan!",
        difficulty: 3
    },

    poland: {
        name: "Poland",
        flag: "🇵🇱",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Warsaw",
        majorCities: ["Warsaw", "Krakow", "Gdansk"],
        language: ["Polish"],
        famousPlaces: [
            "Auschwitz Memorial - Holocaust museum",
            "Wawel Castle - Royal castle in Krakow",
            "Wieliczka Salt Mine - Underground salt city",
            "Old Town Warsaw - Rebuilt historic center"
        ],
        funFacts: [
            "Marie Curie was Polish",
            "Invented bulletproof vests",
            "Has Europe's last primeval forest"
        ],
        culture: "Famous for pierogi, vodka, and resilience. Very strong Catholic traditions!",
        difficulty: 3
    },

    ireland: {
        name: "Ireland",
        flag: "🇮🇪",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Dublin",
        majorCities: ["Dublin", "Cork", "Galway"],
        language: ["English", "Irish"],
        famousPlaces: [
            "Cliffs of Moher - Dramatic sea cliffs",
            "Trinity College - Ancient university",
            "Giant's Causeway - Unique rock formations",
            "Blarney Castle - Home of Blarney Stone"
        ],
        funFacts: [
            "No snakes in Ireland (St. Patrick legend)",
            "Invented Halloween",
            "Has more castles per person than anywhere"
        ],
        culture: "Famous for Guinness beer, leprechauns, and friendliness. Loves storytelling and music!",
        difficulty: 3
    },

    chile: {
        name: "Chile",
        flag: "🇨🇱",
        continent: "South America",
        continentColor: WE_COLORS.americas,
        capital: "Santiago",
        majorCities: ["Santiago", "Valparaíso", "Concepción"],
        language: ["Spanish"],
        famousPlaces: [
            "Atacama Desert - Driest desert on Earth",
            "Easter Island - Mysterious Moai statues",
            "Torres del Paine - Stunning national park",
            "Valparaíso - Colorful hillside city"
        ],
        funFacts: [
            "Longest country (2,670 miles long!)",
            "Has every climate except tropical",
            "Largest copper producer in world"
        ],
        culture: "Famous for wine, empanadas, and poetry. Very mountainous with diverse landscapes!",
        difficulty: 3
    },

    colombia: {
        name: "Colombia",
        flag: "🇨🇴",
        continent: "South America",
        continentColor: WE_COLORS.americas,
        capital: "Bogotá",
        majorCities: ["Bogotá", "Medellín", "Cartagena"],
        language: ["Spanish"],
        famousPlaces: [
            "Cartagena - Colorful colonial city",
            "Caño Cristales - Rainbow river",
            "Lost City - Ancient ruins in jungle",
            "Coffee Region - Beautiful coffee farms"
        ],
        funFacts: [
            "World's leading coffee producer",
            "Has the most bird species globally",
            "Only South American country with two coasts"
        ],
        culture: "Famous for coffee, salsa dancing, and emeralds. Very joyful and festive people!",
        difficulty: 3
    },

    // DIFFICULTY 4 - Lesser-known but fascinating countries
    iceland: {
        name: "Iceland",
        flag: "🇮🇸",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Reykjavik",
        majorCities: ["Reykjavik", "Akureyri", "Keflavik"],
        language: ["Icelandic"],
        famousPlaces: [
            "Blue Lagoon - Geothermal spa",
            "Geysers - Natural hot water fountains",
            "Northern Lights - Best viewing spot",
            "Waterfalls - Gullfoss, Skógafoss"
        ],
        funFacts: [
            "No army, very peaceful country",
            "Most volcanoes and glaciers together",
            "Everyone's related - has family tree app"
        ],
        culture: "Famous for Vikings, hot springs, and elves. Believes in hidden folk!",
        difficulty: 4
    },

    austria: {
        name: "Austria",
        flag: "🇦🇹",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Vienna",
        majorCities: ["Vienna", "Salzburg", "Innsbruck"],
        language: ["German"],
        famousPlaces: [
            "Schönbrunn Palace - Imperial palace",
            "Hallstatt - Picturesque alpine village",
            "Mozart's Birthplace - Salzburg house",
            "Vienna State Opera - Famous opera house"
        ],
        funFacts: [
            "Mozart and Beethoven lived here",
            "Invented the croissant",
            "Most Nobel Prize winners per capita"
        ],
        culture: "Famous for classical music, waltzes, and coffee houses. Very artistic culture!",
        difficulty: 4
    },

    czechia: {
        name: "Czech Republic",
        flag: "🇨🇿",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Prague",
        majorCities: ["Prague", "Brno", "Ostrava"],
        language: ["Czech"],
        famousPlaces: [
            "Prague Castle - Largest ancient castle",
            "Charles Bridge - Historic stone bridge",
            "Astronomical Clock - Medieval marvel",
            "Bone Church - Church decorated with bones"
        ],
        funFacts: [
            "Drinks the most beer per person",
            "Invented sugar cubes and contact lenses",
            "Has the most castles in Europe"
        ],
        culture: "Famous for beer, castles, and fairy-tale architecture. Very beer-loving culture!",
        difficulty: 4
    },

    philippines: {
        name: "Philippines",
        flag: "🇵🇭",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Manila",
        majorCities: ["Manila", "Quezon City", "Davao"],
        language: ["Filipino", "English"],
        famousPlaces: [
            "Chocolate Hills - Cone-shaped hills",
            "Palawan - Most beautiful island",
            "Mayon Volcano - Perfect cone volcano",
            "Rice Terraces - 2000-year-old terraces"
        ],
        funFacts: [
            "Made of 7,641 islands!",
            "Only Christian country in Asia",
            "Invented the karaoke machine"
        ],
        culture: "Famous for hospitality, singing, and beaches. Very friendly and family-oriented!",
        difficulty: 4
    },

    singapore: {
        name: "Singapore",
        flag: "🇸🇬",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Singapore",
        majorCities: ["Singapore"],
        language: ["English", "Malay", "Chinese", "Tamil"],
        famousPlaces: [
            "Marina Bay Sands - Ship-shaped hotel",
            "Gardens by the Bay - Supertree grove",
            "Sentosa Island - Resort island",
            "Merlion - Half-fish, half-lion statue"
        ],
        funFacts: [
            "City-state (whole country is one city!)",
            "Cleanest country in Asia",
            "Illegal to chew gum in public"
        ],
        culture: "Famous for hawker food, efficiency, and multiculturalism. Very clean and safe!",
        difficulty: 4
    },

    malaysia: {
        name: "Malaysia",
        flag: "🇲🇾",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Kuala Lumpur",
        majorCities: ["Kuala Lumpur", "George Town", "Johor Bahru"],
        language: ["Malay"],
        famousPlaces: [
            "Petronas Towers - Twin skyscrapers",
            "Batu Caves - Hindu temple in cave",
            "Langkawi - Beautiful island beaches",
            "Cameron Highlands - Tea plantations"
        ],
        funFacts: [
            "Has the oldest rainforest (130 million years)",
            "Home to the world's smallest mammal",
            "Kuala Lumpur means 'muddy river'"
        ],
        culture: "Famous for satay, diverse culture, and rainforests. Mix of Malay, Chinese, and Indian!",
        difficulty: 4
    },

    nigeria: {
        name: "Nigeria",
        flag: "🇳🇬",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Abuja",
        majorCities: ["Lagos", "Abuja", "Kano"],
        language: ["English", "Hausa", "Yoruba", "Igbo"],
        famousPlaces: [
            "Zuma Rock - Giant monolith",
            "Yankari National Park - Elephants and springs",
            "Olumo Rock - Sacred rock formation",
            "Niger Delta - Large river delta"
        ],
        funFacts: [
            "Most populated country in Africa",
            "Nollywood makes 2,500+ movies per year",
            "Has over 500 different languages"
        ],
        culture: "Famous for Afrobeat music, Nollywood, and diversity. Very vibrant and entrepreneurial!",
        difficulty: 4
    },

    ghana: {
        name: "Ghana",
        flag: "🇬🇭",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Accra",
        majorCities: ["Accra", "Kumasi", "Tamale"],
        language: ["English"],
        famousPlaces: [
            "Cape Coast Castle - Historic slave trade fort",
            "Kakum National Park - Canopy walkway",
            "Lake Volta - Largest man-made lake",
            "Ashanti Kingdom - Cultural heritage site"
        ],
        funFacts: [
            "First African country to gain independence",
            "World's largest cocoa producer",
            "Very stable and peaceful democracy"
        ],
        culture: "Famous for kente cloth, gold, and hospitality. Very welcoming and colorful culture!",
        difficulty: 4
    },

    tanzania: {
        name: "Tanzania",
        flag: "🇹🇿",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Dodoma",
        majorCities: ["Dar es Salaam", "Dodoma", "Arusha"],
        language: ["Swahili", "English"],
        famousPlaces: [
            "Mount Kilimanjaro - Africa's highest peak",
            "Serengeti - Amazing wildlife safari",
            "Zanzibar - Spice island beaches",
            "Ngorongoro Crater - Huge volcanic crater"
        ],
        funFacts: [
            "Has the Big Five animals",
            "Zanzibar means 'Land of the Blacks'",
            "Freddie Mercury was born in Zanzibar"
        ],
        culture: "Famous for safaris, Swahili culture, and beaches. Very diverse wildlife!",
        difficulty: 4
    },

    cuba: {
        name: "Cuba",
        flag: "🇨🇺",
        continent: "North America",
        continentColor: WE_COLORS.americas,
        capital: "Havana",
        majorCities: ["Havana", "Santiago de Cuba", "Camagüey"],
        language: ["Spanish"],
        famousPlaces: [
            "Old Havana - Colonial architecture",
            "Malecón - Seaside promenade",
            "Varadero Beach - Beautiful white sand",
            "Vintage Cars - 1950s American cars"
        ],
        funFacts: [
            "Largest island in Caribbean",
            "Invented the mojito cocktail",
            "Has one of the best healthcare systems"
        ],
        culture: "Famous for cigars, rum, and salsa. Very musical and revolutionary spirit!",
        difficulty: 4
    },

    jamaica: {
        name: "Jamaica",
        flag: "🇯🇲",
        continent: "North America",
        continentColor: WE_COLORS.americas,
        capital: "Kingston",
        majorCities: ["Kingston", "Montego Bay", "Ocho Rios"],
        language: ["English"],
        famousPlaces: [
            "Dunn's River Falls - Climbable waterfall",
            "Bob Marley Museum - Reggae legend's home",
            "Seven Mile Beach - Stunning beach",
            "Blue Mountains - Coffee growing region"
        ],
        funFacts: [
            "Birthplace of reggae music",
            "Usain Bolt's home country",
            "First Caribbean country to have bobsled team"
        ],
        culture: "Famous for reggae, jerk chicken, and sprinting. Very laid-back 'no problem' attitude!",
        difficulty: 4
    },

    denmark: {
        name: "Denmark",
        flag: "🇩🇰",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Copenhagen",
        majorCities: ["Copenhagen", "Aarhus", "Odense"],
        language: ["Danish"],
        famousPlaces: [
            "Tivoli Gardens - Second-oldest amusement park",
            "Little Mermaid - Famous statue",
            "Legoland - Original LEGO theme park",
            "Nyhavn - Colorful waterfront"
        ],
        funFacts: [
            "Invented LEGO bricks",
            "Happiest country in world",
            "Has more bikes than cars"
        ],
        culture: "Famous for hygge (coziness), pastries, and Hans Christian Andersen. Very bike-friendly!",
        difficulty: 4
    },

    finland: {
        name: "Finland",
        flag: "🇫🇮",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Helsinki",
        majorCities: ["Helsinki", "Espoo", "Tampere"],
        language: ["Finnish", "Swedish"],
        famousPlaces: [
            "Santa Claus Village - Home of Santa",
            "Northern Lights - Aurora viewing",
            "Saunas - Traditional Finnish saunas",
            "Archipelago - 188,000 islands"
        ],
        funFacts: [
            "Official home of Santa Claus (Lapland)",
            "Has more saunas than cars",
            "Best education system in world"
        ],
        culture: "Famous for saunas, Nokia, and silence. Very reserved but genuine people!",
        difficulty: 4
    },

    israel: {
        name: "Israel",
        flag: "🇮🇱",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Jerusalem",
        majorCities: ["Jerusalem", "Tel Aviv", "Haifa"],
        language: ["Hebrew", "Arabic"],
        famousPlaces: [
            "Western Wall - Sacred Jewish site",
            "Dead Sea - Saltiest body of water",
            "Masada - Ancient fortress",
            "Dome of the Rock - Iconic golden dome"
        ],
        funFacts: [
            "Three major religions' holy land",
            "Most startups per capita globally",
            "Revived Hebrew language from extinct"
        ],
        culture: "Famous for falafel, innovation, and ancient history. Very entrepreneurial and diverse!",
        difficulty: 4
    },

    saudiarabia: {
        name: "Saudi Arabia",
        flag: "🇸🇦",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Riyadh",
        majorCities: ["Riyadh", "Jeddah", "Mecca"],
        language: ["Arabic"],
        famousPlaces: [
            "Mecca - Holiest city in Islam",
            "Kingdom Tower - Tallest building in country",
            "Edge of the World - Dramatic cliff",
            "Al-Ula - Ancient rock tombs"
        ],
        funFacts: [
            "Birthplace of Islam",
            "Has the most oil in the world",
            "No rivers in the entire country"
        ],
        culture: "Famous for Islam, oil, and deserts. Very traditional with rich Bedouin heritage!",
        difficulty: 4
    },

    // DIFFICULTY 2 - Additional well-known countries
    belgium: {
        name: "Belgium",
        flag: "🇧🇪",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Brussels",
        majorCities: ["Brussels", "Antwerp", "Ghent"],
        language: ["Dutch", "French", "German"],
        famousPlaces: [
            "Atomium - Futuristic spheres building",
            "Grand Place - Beautiful city square",
            "Bruges - Medieval canal city",
            "Manneken Pis - Famous small statue"
        ],
        funFacts: [
            "Invented French fries (not France!)",
            "Makes the best chocolate and waffles",
            "Home of the EU headquarters"
        ],
        culture: "Famous for chocolate, waffles, and beer. Three different languages spoken here!",
        difficulty: 2
    },

    hungary: {
        name: "Hungary",
        flag: "🇭🇺",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Budapest",
        majorCities: ["Budapest", "Debrecen", "Miskolc"],
        language: ["Hungarian"],
        famousPlaces: [
            "Buda Castle - Hilltop royal palace",
            "Thermal Baths - Natural hot spring baths",
            "Chain Bridge - Iconic suspension bridge",
            "Hungarian Parliament - Grand riverside building"
        ],
        funFacts: [
            "Invented the Rubik's cube",
            "Has many natural thermal springs",
            "Budapest has the oldest metro in Europe"
        ],
        culture: "Famous for goulash, paprika, and thermal baths. Very proud of their unique language!",
        difficulty: 2
    },

    pakistan: {
        name: "Pakistan",
        flag: "🇵🇰",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Islamabad",
        majorCities: ["Karachi", "Lahore", "Islamabad"],
        language: ["Urdu", "English"],
        famousPlaces: [
            "Badshahi Mosque - Massive Mughal mosque",
            "Lahore Fort - Ancient Mughal fortress",
            "K2 Mountain - Second tallest mountain",
            "Mohenjo-daro - Ancient Indus civilization"
        ],
        funFacts: [
            "Second largest salt mine in world",
            "K2 is harder to climb than Everest",
            "Ancient Indus Valley civilization was here"
        ],
        culture: "Famous for biryani, cricket, and hospitality. Very rich Mughal history!",
        difficulty: 2
    },

    // DIFFICULTY 3 - Additional interesting countries
    ukraine: {
        name: "Ukraine",
        flag: "🇺🇦",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Kyiv",
        majorCities: ["Kyiv", "Kharkiv", "Odessa"],
        language: ["Ukrainian"],
        famousPlaces: [
            "Kyiv Pechersk Lavra - Ancient monastery",
            "Chernobyl - Famous nuclear site",
            "Saint Sophia Cathedral - Thousand year old church",
            "Tunnel of Love - Beautiful tree-lined railway"
        ],
        funFacts: [
            "Largest country entirely in Europe",
            "Sunflowers are their national flower",
            "Invented the helicopter (Igor Sikorsky)"
        ],
        culture: "Famous for borscht, embroidery, and folk traditions. Very artistic and resilient people!",
        difficulty: 3
    },

    ethiopia: {
        name: "Ethiopia",
        flag: "🇪🇹",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Addis Ababa",
        majorCities: ["Addis Ababa", "Dire Dawa", "Gondar"],
        language: ["Amharic"],
        famousPlaces: [
            "Lalibela - Rock-hewn churches",
            "Simien Mountains - Dramatic highlands",
            "Danakil Depression - Hottest place on Earth",
            "Omo Valley - Ancient tribal cultures"
        ],
        funFacts: [
            "Birthplace of coffee (Ethiopia!)",
            "One of oldest civilizations on Earth",
            "Never colonized by Europeans"
        ],
        culture: "Famous for injera bread, coffee, and ancient history. Called the 'Cradle of Humanity'!",
        difficulty: 3
    },

    nepal: {
        name: "Nepal",
        flag: "🇳🇵",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Kathmandu",
        majorCities: ["Kathmandu", "Pokhara", "Lalitpur"],
        language: ["Nepali"],
        famousPlaces: [
            "Mount Everest - World's highest mountain",
            "Pashupatinath Temple - Sacred Hindu temple",
            "Boudhanath Stupa - Giant Buddhist stupa",
            "Pokhara - Beautiful lakeside city"
        ],
        funFacts: [
            "Home of Mount Everest!",
            "Only flag in world that isn't rectangular",
            "Birthplace of Buddha"
        ],
        culture: "Famous for Everest, monks, and trekking. Very spiritual with mountains everywhere!",
        difficulty: 3
    },

    cambodia: {
        name: "Cambodia",
        flag: "🇰🇭",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Phnom Penh",
        majorCities: ["Phnom Penh", "Siem Reap", "Battambang"],
        language: ["Khmer"],
        famousPlaces: [
            "Angkor Wat - Largest religious monument",
            "Angkor Thom - Ancient city ruins",
            "Mekong River - Mighty river",
            "Killing Fields - Sobering history site"
        ],
        funFacts: [
            "Angkor Wat is on their flag",
            "Home to the giant Mekong giant catfish",
            "Had one of the largest medieval cities"
        ],
        culture: "Famous for Angkor temples, rice, and resilience. Ancient Khmer Empire was here!",
        difficulty: 3
    },

    jordan: {
        name: "Jordan",
        flag: "🇯🇴",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Amman",
        majorCities: ["Amman", "Aqaba", "Irbid"],
        language: ["Arabic"],
        famousPlaces: [
            "Petra - Rose-red city carved in rock",
            "Wadi Rum - Mars-like red desert",
            "Dead Sea - Saltiest lake on Earth",
            "Jerash - Best preserved Roman city"
        ],
        funFacts: [
            "Petra is one of the New 7 Wonders",
            "Dead Sea is the lowest point on Earth",
            "Romans built amazing cities here"
        ],
        culture: "Famous for Petra, mansaf dish, and ancient history. Very welcoming to visitors!",
        difficulty: 3
    },

    bolivia: {
        name: "Bolivia",
        flag: "🇧🇴",
        continent: "South America",
        continentColor: WE_COLORS.americas,
        capital: "Sucre",
        majorCities: ["La Paz", "Santa Cruz", "Sucre"],
        language: ["Spanish", "Quechua", "Aymara"],
        famousPlaces: [
            "Salar de Uyuni - World's largest salt flat",
            "Lake Titicaca - Highest navigable lake",
            "Amazon Rainforest - Jungle region",
            "Death Road - Famous dangerous road"
        ],
        funFacts: [
            "Has two capital cities",
            "Salt flat is so large it's seen from space",
            "Has the highest capital city in world"
        ],
        culture: "Famous for colorful festivals, indigenous traditions, and salt flats. Very high altitude living!",
        difficulty: 3
    },

    ecuador: {
        name: "Ecuador",
        flag: "🇪🇨",
        continent: "South America",
        continentColor: WE_COLORS.americas,
        capital: "Quito",
        majorCities: ["Quito", "Guayaquil", "Cuenca"],
        language: ["Spanish"],
        famousPlaces: [
            "Galápagos Islands - Charles Darwin's inspiration",
            "Quito Old Town - UNESCO World Heritage",
            "Amazon Jungle - Pristine rainforest",
            "Avenue of the Volcanoes - 10+ volcanoes"
        ],
        funFacts: [
            "Named after the Equator (it runs through)",
            "Galápagos has unique animals found nowhere else",
            "Highest active volcano in world"
        ],
        culture: "Famous for the Galápagos, roses, and biodiversity. Grows the most roses in the world!",
        difficulty: 3
    },

    // DIFFICULTY 4 - Additional lesser-known countries
    croatia: {
        name: "Croatia",
        flag: "🇭🇷",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Zagreb",
        majorCities: ["Zagreb", "Split", "Dubrovnik"],
        language: ["Croatian"],
        famousPlaces: [
            "Dubrovnik - Medieval walled city",
            "Plitvice Lakes - Waterfall national park",
            "Diocletian's Palace - Roman emperor's palace",
            "Hvar Island - Beautiful Adriatic island"
        ],
        funFacts: [
            "Game of Thrones was filmed in Dubrovnik",
            "Invented the necktie (cravat)",
            "Has over 1,000 islands"
        ],
        culture: "Famous for seafood, ancient cities, and beaches. Very rich history and stunning nature!",
        difficulty: 4
    },

    romania: {
        name: "Romania",
        flag: "🇷🇴",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Bucharest",
        majorCities: ["Bucharest", "Cluj-Napoca", "Timișoara"],
        language: ["Romanian"],
        famousPlaces: [
            "Bran Castle - Dracula's famous castle",
            "Peles Castle - Fairytale mountain castle",
            "Transfagarasan Road - Scenic mountain road",
            "Danube Delta - River delta wildlife"
        ],
        funFacts: [
            "Home of Dracula legends",
            "Has the 2nd largest parliament building",
            "Famous gymnast Nadia Comaneci is Romanian"
        ],
        culture: "Famous for Dracula stories, painted monasteries, and folklore. Very artistic culture!",
        difficulty: 4
    },

    bulgaria: {
        name: "Bulgaria",
        flag: "🇧🇬",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Sofia",
        majorCities: ["Sofia", "Plovdiv", "Varna"],
        language: ["Bulgarian"],
        famousPlaces: [
            "Rila Monastery - Stunning mountain monastery",
            "Old Plovdiv - Ancient Roman city",
            "Varna Black Sea - Beautiful coast",
            "Thracian Tomb - Ancient burial mound"
        ],
        funFacts: [
            "Invented the Cyrillic alphabet",
            "World's largest rose oil producer",
            "Has yogurt made its national symbol"
        ],
        culture: "Famous for roses, yogurt, and ancient Thracian history. Very proud of their alphabet!",
        difficulty: 4
    },

    costarica: {
        name: "Costa Rica",
        flag: "🇨🇷",
        continent: "North America",
        continentColor: WE_COLORS.americas,
        capital: "San José",
        majorCities: ["San José", "Liberia", "Jacó"],
        language: ["Spanish"],
        famousPlaces: [
            "Arenal Volcano - Active volcano",
            "Manuel Antonio - Beautiful national park",
            "Monteverde - Cloud forest reserve",
            "Tortuguero - Sea turtle nesting beach"
        ],
        funFacts: [
            "No army since 1948",
            "Has 5% of world's total biodiversity",
            "Say 'Pura Vida' (pure life) for everything"
        ],
        culture: "Famous for rainforests, wildlife, and 'Pura Vida' attitude. Very eco-friendly!",
        difficulty: 4
    },

    senegal: {
        name: "Senegal",
        flag: "🇸🇳",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Dakar",
        majorCities: ["Dakar", "Saint-Louis", "Touba"],
        language: ["French", "Wolof"],
        famousPlaces: [
            "African Renaissance Monument - Giant statue",
            "Goree Island - Historic slave trade island",
            "Pink Lake - Natural pink colored lake",
            "Dakar Rally - Famous off-road race"
        ],
        funFacts: [
            "Pink Lake gets color from special algae",
            "Longest serving democracy in Africa",
            "Famous for wrestling sport"
        ],
        culture: "Famous for teranga (hospitality), music, and colorful boubou clothing. Very welcoming!",
        difficulty: 4
    },

    kazakhstan: {
        name: "Kazakhstan",
        flag: "🇰🇿",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Astana",
        majorCities: ["Almaty", "Astana", "Shymkent"],
        language: ["Kazakh", "Russian"],
        famousPlaces: [
            "Bayterek Tower - Futuristic capital tower",
            "Charyn Canyon - Grand Canyon of Kazakhstan",
            "Steppe - Vast grassy plains",
            "Baikonur Cosmodrome - Where astronauts launch"
        ],
        funFacts: [
            "Largest landlocked country in world",
            "World's first astronauts launched from here",
            "Has wild horses and snow leopards"
        ],
        culture: "Famous for nomadic traditions, horseback riding, and the vast steppe. Very open and free!",
        difficulty: 4
    },

    zimbabwe: {
        name: "Zimbabwe",
        flag: "🇿🇼",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Harare",
        majorCities: ["Harare", "Bulawayo", "Mutare"],
        language: ["English", "Shona", "Ndebele"],
        famousPlaces: [
            "Victoria Falls - One of Seven Natural Wonders",
            "Great Zimbabwe Ruins - Ancient stone city",
            "Hwange National Park - Huge elephant herds",
            "Matobo Hills - Ancient rock paintings"
        ],
        funFacts: [
            "Victoria Falls is the world's largest waterfall",
            "Has a 100 trillion dollar note (from inflation)",
            "Great Zimbabwe is a UNESCO World Heritage site"
        ],
        culture: "Famous for Victoria Falls, stone ruins, and wildlife. Very artistic with stone sculpture!",
        difficulty: 4
    },

    estonia: {
        name: "Estonia",
        flag: "🇪🇪",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Tallinn",
        majorCities: ["Tallinn", "Tartu", "Narva"],
        language: ["Estonian"],
        famousPlaces: [
            "Tallinn Old Town - Best medieval city in Europe",
            "Lahemaa National Park - Beautiful nature",
            "Song Festival Grounds - Huge singing arena",
            "Kadriorg Palace - Peter the Great's palace"
        ],
        funFacts: [
            "One of the most digital countries - e-government",
            "Invented Skype",
            "Has the cleanest air in Europe"
        ],
        culture: "Famous for singing festivals, digital innovation, and medieval architecture. Very tech-savvy!",
        difficulty: 4
    },

    slovenia: {
        name: "Slovenia",
        flag: "🇸🇮",
        continent: "Europe",
        continentColor: WE_COLORS.europe,
        capital: "Ljubljana",
        majorCities: ["Ljubljana", "Maribor", "Celje"],
        language: ["Slovenian"],
        famousPlaces: [
            "Lake Bled - Island church in mountain lake",
            "Postojna Cave - Huge underground cave system",
            "Triglav National Park - Alpine paradise",
            "Ljubljana Dragon Bridge - Famous dragon statues"
        ],
        funFacts: [
            "Smallest country with access to Alps and sea",
            "Lake Bled is one of most photographed places",
            "90% of the country is green/forested"
        ],
        culture: "Famous for alpine scenery, fairy-tale landscapes, and outdoor sports. Very nature-loving!",
        difficulty: 4
    },

    panama: {
        name: "Panama",
        flag: "🇵🇦",
        continent: "North America",
        continentColor: WE_COLORS.americas,
        capital: "Panama City",
        majorCities: ["Panama City", "Colón", "David"],
        language: ["Spanish"],
        famousPlaces: [
            "Panama Canal - Famous engineering marvel",
            "Casco Viejo - Colonial old quarter",
            "San Blas Islands - Beautiful indigenous islands",
            "Biomuseo - Colorful Frank Gehry museum"
        ],
        funFacts: [
            "Connects North and South America",
            "Panama Canal saves ships 8,000 miles",
            "Panama hats are actually from Ecuador!"
        ],
        culture: "Famous for the canal, diverse wildlife, and mixing cultures. Hub connecting continents!",
        difficulty: 4
    },

    bangladesh: {
        name: "Bangladesh",
        flag: "🇧🇩",
        continent: "Asia",
        continentColor: WE_COLORS.asia,
        capital: "Dhaka",
        majorCities: ["Dhaka", "Chittagong", "Sylhet"],
        language: ["Bengali"],
        famousPlaces: [
            "Sundarbans - World's largest mangrove forest",
            "Cox's Bazar - World's longest natural beach",
            "Shaheed Minar - Language martyrs monument",
            "Sixty Dome Mosque - Ancient mosque"
        ],
        funFacts: [
            "Cox's Bazar is world's longest beach (120km)",
            "Home to Bengal tigers in Sundarbans",
            "Celebrates International Mother Language Day"
        ],
        culture: "Famous for muslin cloth, hilsha fish, and river culture. Fought for their language!",
        difficulty: 4
    },

    uganda: {
        name: "Uganda",
        flag: "🇺🇬",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Kampala",
        majorCities: ["Kampala", "Gulu", "Lira"],
        language: ["English", "Swahili"],
        famousPlaces: [
            "Bwindi Forest - Mountain gorilla trekking",
            "Source of the Nile - Where Nile River starts",
            "Lake Victoria - Largest lake in Africa",
            "Murchison Falls - Water through narrow gorge"
        ],
        funFacts: [
            "Half of world's mountain gorillas live here",
            "Source of the mighty Nile River",
            "Has Africa's second largest lake"
        ],
        culture: "Famous for gorilla trekking, the Nile, and warmth. Called 'Pearl of Africa' by Churchill!",
        difficulty: 4
    },

    madagascar: {
        name: "Madagascar",
        flag: "🇲🇬",
        continent: "Africa",
        continentColor: WE_COLORS.africa,
        capital: "Antananarivo",
        majorCities: ["Antananarivo", "Toamasina", "Antsirabe"],
        language: ["Malagasy", "French"],
        famousPlaces: [
            "Avenue of the Baobabs - Giant tree avenue",
            "Tsingy de Bemaraha - Sharp limestone towers",
            "Ranomafana - Rainforest national park",
            "Nosy Be - Beautiful tropical island"
        ],
        funFacts: [
            "90% of wildlife found nowhere else on Earth",
            "Home to over 100 lemur species",
            "4th largest island in the world"
        ],
        culture: "Famous for lemurs, baobab trees, and unique wildlife. Like visiting another planet!",
        difficulty: 4
    },

    newcaledonia: {
        name: "New Caledonia",
        flag: "🇳🇨",
        continent: "Oceania",
        continentColor: WE_COLORS.oceania,
        capital: "Nouméa",
        majorCities: ["Nouméa", "Mont-Dore", "Dumbéa"],
        language: ["French"],
        famousPlaces: [
            "Lagoon - Largest lagoon in world (UNESCO)",
            "Heart of Voh - Heart shape seen from sky",
            "Loyalty Islands - Remote beautiful islands",
            "Nouméa - French Polynesian city"
        ],
        funFacts: [
            "Has world's largest lagoon",
            "Only place with nautilus shells still found",
            "French territory in South Pacific"
        ],
        culture: "Famous for turquoise lagoon, Kanak culture, and French influence. Unique island paradise!",
        difficulty: 4
    }
};

// Get countries by difficulty
function getCountriesByDifficulty(difficulty) {
    return Object.keys(COUNTRIES).filter(key =>
        COUNTRIES[key].difficulty === difficulty
    );
}

function preload() {
    // No external assets needed
}

function create() {
    this.scene = this;
    showMainMenu(this);
}

function update() {
    // Game loop
}

// ==================== MAIN MENU ====================
function showMainMenu(scene) {
    scene.children.removeAll();
    currentScene = 'menu';

    // Background gradient effect
    const bg = scene.add.rectangle(450, 325, 900, 650, WE_COLORS.background);

    // Title with shadow
    scene.add.text(452, 82, '🌍 World Explorer', {
        fontSize: '64px',
        fill: '#000',
        fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0.1);

    scene.add.text(450, 80, '🌍 World Explorer', {
        fontSize: '64px',
        fill: '#1E293B',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 145, 'Discover Amazing Countries!', {
        fontSize: '24px',
        fill: '#475569',
        fontStyle: 'italic'
    }).setOrigin(0.5);

    // Stats
    const stats = scene.add.container(450, 220);
    const statBg = scene.add.rectangle(0, 0, 400, 80, 0xFFFFFF);
    statBg.setStrokeStyle(2, 0xCBDFBD);

    const learnedText = scene.add.text(0, 0,
        `Countries Learned: ${countriesLearned.length}/60`, {
        fontSize: '20px',
        fill: '#1E293B',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    stats.add([statBg, learnedText]);

    // Start button
    createModernButton(scene, 450, 320, 'Start Learning! →', WE_COLORS.primary, () => {
        showDifficultySelect(scene);
    }, 300, 70);

    // How to Play button
    createModernButton(scene, 450, 410, 'How to Play', WE_COLORS.secondary, () => {
        showHowToPlay(scene);
    }, 300, 70);

    // Features list
    const features = [
        '🎯 Learn about 60 countries worldwide',
        '🏳️ Discover flags, capitals & cultures',
        '🌏 Explore all continents',
        '⭐ Take fun quizzes!'
    ];

    features.forEach((text, i) => {
        scene.add.text(450, 510 + (i * 30), text, {
            fontSize: '18px',
            fill: '#475569'
        }).setOrigin(0.5);
    });
}

// ==================== HOW TO PLAY ====================
function showHowToPlay(scene) {
    scene.children.removeAll();

    scene.add.text(450, 50, 'How to Play', {
        fontSize: '42px',
        fill: '#1E293B',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    const instructions = [
        {
            icon: '1️⃣',
            title: 'Choose Difficulty',
            desc: 'Start with Explorer level and unlock more as you learn!'
        },
        {
            icon: '2️⃣',
            title: 'Pick a Country',
            desc: 'Select any country to learn amazing facts about it'
        },
        {
            icon: '3️⃣',
            title: 'Learn & Explore',
            desc: 'Read about the flag, capital, famous places, and fun facts!'
        },
        {
            icon: '4️⃣',
            title: 'Take the Quiz',
            desc: 'Answer questions to test what you learned'
        },
        {
            icon: '⭐',
            title: 'Score & Progress',
            desc: 'Get 4/5 correct to unlock the next difficulty level!'
        }
    ];

    instructions.forEach((item, i) => {
        const y = 140 + i * 95;

        const card = scene.add.rectangle(450, y, 750, 80, 0xFFFFFF);
        card.setStrokeStyle(2, 0xCBDFBD);

        scene.add.text(150, y, item.icon, {
            fontSize: '36px'
        }).setOrigin(0.5);

        scene.add.text(220, y - 15, item.title, {
            fontSize: '20px',
            fill: '#1E293B',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        scene.add.text(220, y + 10, item.desc, {
            fontSize: '18px',
            fill: '#475569',
            wordWrap: { width: 500 }
        }).setOrigin(0, 0.5);
    });

    createModernButton(scene, 450, 600, '← Back to Menu', WE_COLORS.textLight, () => {
        showMainMenu(scene);
    }, 200);
}

// ==================== DIFFICULTY SELECT ====================
function showDifficultySelect(scene) {
    scene.children.removeAll();
    currentScene = 'difficulty';

    scene.add.text(450, 60, 'Choose Your Journey', {
        fontSize: '42px',
        fill: '#1E293B',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 105, 'Start easy and unlock more!', {
        fontSize: '18px',
        fill: '#475569'
    }).setOrigin(0.5);

    const d1Count = Object.keys(COUNTRIES).filter(k => COUNTRIES[k].difficulty === 1).length;
    const d2Count = Object.keys(COUNTRIES).filter(k => COUNTRIES[k].difficulty === 2).length;
    const d3Count = Object.keys(COUNTRIES).filter(k => COUNTRIES[k].difficulty === 3).length;
    const d4Count = Object.keys(COUNTRIES).filter(k => COUNTRIES[k].difficulty === 4).length;
    const difficulties = [
        {
            id: 1,
            name: 'Explorer',
            icon: '🌟',
            desc: `${d1Count} popular countries`,
            color: WE_COLORS.success,
            countries: d1Count
        },
        {
            id: 2,
            name: 'Traveler',
            icon: '✈️',
            desc: `${d2Count} well-known countries`,
            color: WE_COLORS.primary,
            countries: d2Count,
            locked: true
        },
        {
            id: 3,
            name: 'Navigator',
            icon: '🧭',
            desc: `${d3Count} diverse countries`,
            color: 0xA44A3F,
            countries: d3Count,
            locked: true
        },
        {
            id: 4,
            name: 'World Expert',
            icon: '🏆',
            desc: `${d4Count} challenging countries!`,
            color: WE_COLORS.secondary,
            countries: d4Count,
            locked: true
        }
    ];

    difficulties.forEach((level, index) => {
        const y = 180 + index * 140;
        const isLocked = level.locked && level.id > unlockedDifficulties;

        createDifficultyCard(scene, 450, y, level, isLocked);
    });

    createModernButton(scene, 120, 600, '← Back', WE_COLORS.textLight, () => {
        showMainMenu(scene);
    }, 140, 50, true);
}

function createDifficultyCard(scene, x, y, level, isLocked) {
    const cardWidth = 700;
    const cardHeight = 110;

    // Shadow
    const shadow = scene.add.rectangle(x, y + 3, cardWidth, cardHeight, 0x000000, 0.08);

    // Card background
    const cardBg = scene.add.rectangle(x, y, cardWidth, cardHeight, isLocked ? 0xCBDFBD : WE_COLORS.cardBg);
    cardBg.setStrokeStyle(3, isLocked ? 0xD4E09B : level.color);

    // Icon circle
    const iconCircle = scene.add.circle(x - 270, y, 35, isLocked ? 0xCED4DA : level.color, 0.2);
    const iconText = scene.add.text(x - 270, y, level.icon, {
        fontSize: '36px'
    }).setOrigin(0.5);

    // Title and description
    scene.add.text(x - 210, y - 20, level.name, {
        fontSize: '28px',
        fill: isLocked ? '#ADB5BD' : '#2D3436',
        fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    scene.add.text(x - 210, y + 12, level.desc, {
        fontSize: '18px',
        fill: isLocked ? '#CED4DA' : '#636E72'
    }).setOrigin(0, 0.5);

    // Action button
    if (isLocked) {
        const lockBtn = scene.add.text(x + 240, y, '🔒 Locked', {
            fontSize: '18px',
            fill: '#ADB5BD',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    } else {
        const playBtn = scene.add.rectangle(x + 240, y, 140, 50, level.color);
        playBtn.setInteractive({ useHandCursor: true });

        const playText = scene.add.text(x + 240, y, 'Explore →', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        playBtn.on('pointerdown', () => {
            currentDifficulty = level.id;
            showCountrySelect(scene, level.id);
        });

        playBtn.on('pointerover', () => {
            playBtn.setAlpha(0.85);
            playBtn.setScale(1.05);
        });
        playBtn.on('pointerout', () => {
            playBtn.setAlpha(1);
            playBtn.setScale(1);
        });
    }
}

// ==================== COUNTRY SELECT ====================
function showCountrySelect(scene, difficulty) {
    scene.children.removeAll();
    currentScene = 'country-select';

    scene.add.text(450, 40, 'Choose a Country to Learn', {
        fontSize: '38px',
        fill: '#1E293B',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    const availableCountries = getCountriesByDifficulty(difficulty);

    scene.add.text(450, 85, `${availableCountries.length} countries available`, {
        fontSize: '18px',
        fill: '#475569'
    }).setOrigin(0.5);

    // Create scrollable grid of country cards (centered, consistent alignment)
    const startY = 130;
    const cols = 3;
    const cardWidth = 260;
    const cardHeight = 90;
    const gapX = 30;
    const spacingY = 110;
    const gridWidth = cols * cardWidth + (cols - 1) * gapX;
    const startX = (config.width - gridWidth) / 2;

    availableCountries.forEach((countryKey, index) => {
        const country = COUNTRIES[countryKey];
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = startX + col * (cardWidth + gapX);
        const y = startY + row * spacingY;

        if (y < 550) { // Only show if on screen
            createCountryCard(scene, x, y, country, countryKey);
        }
    });

    createModernButton(scene, startX, 600, '← Back', WE_COLORS.textLight, () => {
        showDifficultySelect(scene);
    }, 140, 50, true);
}

function createCountryCard(scene, x, y, country, countryKey) {
    const cardWidth = 260;
    const cardHeight = 90;
    const isLearned = countriesLearned.includes(countryKey);

    // Card container
    const card = scene.add.container(x, y);

    // Shadow
    const shadow = scene.add.rectangle(0, 2, cardWidth, cardHeight, 0x000000, 0.08);
    shadow.setOrigin(0, 0);

    // Background
    const bg = scene.add.rectangle(0, 0, cardWidth, cardHeight, 0xFFFFFF);
    bg.setOrigin(0, 0);
    bg.setStrokeStyle(2, country.continentColor);
    bg.setInteractive({ useHandCursor: true });

    // Accent bar
    const accent = scene.add.rectangle(0, 0, 5, cardHeight, country.continentColor);
    accent.setOrigin(0, 0);

    // Flag
    const flag = scene.add.text(30, 45, country.flag, {
        fontSize: '40px',
        fontFamily: "'Noto Color Emoji', sans-serif"
    }).setOrigin(0.5);

    // Country name
    const name = scene.add.text(75, 25, country.name, {
        fontSize: '18px',
        fill: '#1E293B',
        fontStyle: 'bold',
        wordWrap: { width: 170 }
    }).setOrigin(0, 0);

    // Continent
    const continent = scene.add.text(75, 50, country.continent, {
        fontSize: '18px',
        fill: '#475569'
    }).setOrigin(0, 0);

    // Learned indicator
    if (isLearned) {
        const check = scene.add.text(cardWidth - 15, 15, '✓', {
            fontSize: '20px',
            fill: '#A44A3F',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        card.add(check);
    }

    card.add([shadow, bg, accent, flag, name, continent]);

    // Click handler
    bg.on('pointerdown', () => {
        currentCountry = countryKey;
        showCountryLearn(scene, countryKey);
    });

    bg.on('pointerover', () => {
        bg.setScale(1.02);
        bg.setAlpha(0.95);
    });
    bg.on('pointerout', () => {
        bg.setScale(1);
        bg.setAlpha(1);
    });
}

// ==================== COUNTRY LEARNING SCREEN ====================
function showCountryLearn(scene, countryKey) {
    scene.children.removeAll();
    currentScene = 'learn';

    const country = COUNTRIES[countryKey];
    let currentSlide = 0;

    const slides = [
        {
            title: `Welcome to ${country.name}!`,
            icon: country.flag,
            content: `Let's learn amazing things about ${country.name}!`,
            size: '80px'
        },
        {
            title: 'Flag & Location',
            icon: country.flag,
            content: `${country.flag} This is the flag of ${country.name}!\n\n📍 Location: ${country.continent}\n🏛️ Capital: ${country.capital}`,
            size: '60px'
        },
        {
            title: 'Language & Cities',
            icon: '🗣️',
            content: `Language: ${country.language.join(', ')}\n\n🏙️ Major Cities:\n${country.majorCities.map(city => '• ' + city).join('\n')}`,
            size: '40px'
        },
        {
            title: 'Famous Places',
            icon: '🏛️',
            content: country.famousPlaces.map((place, i) => `${i + 1}. ${place}`).join('\n\n'),
            size: '30px'
        },
        {
            title: 'Fun Facts!',
            icon: '⭐',
            content: country.funFacts.map((fact, i) => `${i + 1}. ${fact}`).join('\n\n'),
            size: '30px'
        },
        {
            title: 'Culture & Food',
            icon: '🍽️',
            content: country.culture,
            size: '30px'
        },
        {
            title: 'Ready for the Quiz?',
            icon: '🎯',
            content: `Great job learning about ${country.name}!\n\nNow let's test your knowledge with a fun quiz!`,
            size: '40px'
        }
    ];

    function showSlide() {
        scene.children.removeAll();

        const slide = slides[currentSlide];

        // Title
        scene.add.text(450, 50, slide.title, {
            fontSize: '36px',
            fill: '#1E293B',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Icon
        scene.add.text(450, 140, slide.icon, {
            fontSize: slide.size,
            fontFamily: "'Noto Color Emoji', sans-serif"
        }).setOrigin(0.5);

        // Content
        scene.add.text(450, 320, slide.content, {
            fontSize: '18px',
            fill: '#1E293B',
            align: 'center',
            lineSpacing: 10,
            wordWrap: { width: 750 },
            fontFamily: "'Noto Color Emoji', sans-serif"
        }).setOrigin(0.5);

        // Progress indicator
        scene.add.text(450, 530, `${currentSlide + 1} / ${slides.length}`, {
            fontSize: '18px',
            fill: '#475569'
        }).setOrigin(0.5);

        // Progress dots
        for (let i = 0; i < slides.length; i++) {
            const dot = scene.add.circle(350 + i * 25, 560, 6,
                i === currentSlide ? country.continentColor : 0xD4E09B);
        }

        // Navigation
        if (currentSlide > 0) {
            createModernButton(scene, 200, 590, '← Previous', WE_COLORS.textLight, () => {
                currentSlide--;
                showSlide();
            }, 150, 50);
        }

        if (currentSlide < slides.length - 1) {
            createModernButton(scene, 700, 590, 'Next →', WE_COLORS.success, () => {
                currentSlide++;
                showSlide();
            }, 150, 50);
        } else {
            createModernButton(scene, 700, 590, 'Take Quiz! 🎯', WE_COLORS.success, () => {
                showQuiz(scene, countryKey);
            }, 180, 50);
        }

        // Back button
        createModernButton(scene, 120, 40, '← Back', WE_COLORS.error, () => {
            showCountrySelect(scene, currentDifficulty);
        }, 120, 40);
    }

    showSlide();
}

// ==================== QUIZ MODE ====================
function showQuiz(scene, countryKey) {
    scene.children.removeAll();
    currentScene = 'quiz';

    const country = COUNTRIES[countryKey];
    score = 0;
    let currentQuestion = 0;
    const totalQuestions = 5;

    // Generate questions
    const questions = generateQuestions(country, countryKey);

    function showQuestion() {
        scene.children.removeAll();

        if (currentQuestion >= totalQuestions) {
            showQuizResults(scene, score, totalQuestions, countryKey);
            return;
        }

        const q = questions[currentQuestion];

        // Header
        scene.add.text(450, 40, `Quiz: ${country.name} ${country.flag}`, {
            fontSize: '32px',
            fill: '#1E293B',
            fontStyle: 'bold',
            fontFamily: "'Noto Color Emoji', sans-serif"
        }).setOrigin(0.5);

        // Score
        scene.add.text(450, 85, `Question ${currentQuestion + 1}/${totalQuestions} | Score: ${score}/${totalQuestions}`, {
            fontSize: '18px',
            fill: '#475569'
        }).setOrigin(0.5);

        // Question
        scene.add.text(450, 160, q.question, {
            fontSize: '24px',
            fill: '#1E293B',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 750 }
        }).setOrigin(0.5);

        // Answer options
        q.options.forEach((option, index) => {
            const y = 250 + index * 80;
            const btn = scene.add.rectangle(450, y, 600, 60, 0xFFFFFF);
            btn.setStrokeStyle(3, 0xCBDFBD);
            btn.setInteractive({ useHandCursor: true });

            const text = scene.add.text(450, y, option, {
                fontSize: '20px',
                fill: '#1E293B',
                wordWrap: { width: 550 }
            }).setOrigin(0.5);

            btn.on('pointerdown', () => {
                checkAnswer(btn, text, option, q.correct);
            });

            btn.on('pointerover', () => {
                btn.setStrokeStyle(3, country.continentColor);
            });
            btn.on('pointerout', () => {
                btn.setStrokeStyle(3, 0xCBDFBD);
            });
        });

        // Back button
        createModernButton(scene, 120, 600, '← Back', WE_COLORS.error, () => {
            showCountrySelect(scene, currentDifficulty);
        }, 120, 40);
    }

    function checkAnswer(btn, text, selected, correct) {
        const isCorrect = selected === correct;

        if (isCorrect) {
            score++;
            btn.setFillStyle(WE_COLORS.success);
            text.setColor('#FFFFFF');
        } else {
            btn.setFillStyle(WE_COLORS.error);
            text.setColor('#FFFFFF');
        }

        btn.disableInteractive();

        scene.time.delayedCall(1500, () => {
            currentQuestion++;
            showQuestion();
        });
    }

    showQuestion();
}

function generateQuestions(country, countryKey) {
    const questions = [
        {
            question: `What is the capital of ${country.name}?`,
            options: shuffleArray([
                country.capital,
                getRandomCapital(countryKey),
                getRandomCapital(countryKey),
                getRandomCapital(countryKey)
            ]),
            correct: country.capital
        },
        {
            question: `Which continent is ${country.name} located in?`,
            options: shuffleArray([
                country.continent,
                'Europe',
                'Asia',
                'Africa'
            ].filter((v, i, a) => a.indexOf(v) === i)),
            correct: country.continent
        },
        {
            question: `What language is primarily spoken in ${country.name}?`,
            options: shuffleArray([
                country.language[0],
                'Spanish',
                'English',
                'French'
            ].filter((v, i, a) => a.indexOf(v) === i)),
            correct: country.language[0]
        },
        {
            question: `Which of these is a famous place in ${country.name}?`,
            options: shuffleArray([
                country.famousPlaces[0].split(' - ')[0],
                'Eiffel Tower',
                'Big Ben',
                'Statue of Liberty'
            ].filter((v, i, a) => a.indexOf(v) === i)),
            correct: country.famousPlaces[0].split(' - ')[0]
        },
        (() => {
            const cityNotInCountry = getRandomCity(countryKey);
            return {
                question: `Which city is NOT in ${country.name}?`,
                options: shuffleArray([
                    country.majorCities[0],
                    country.majorCities[1] || country.capital,
                    country.majorCities[2] || country.capital,
                    cityNotInCountry
                ]),
                correct: cityNotInCountry
            };
        })()
    ];

    return shuffleArray(questions).slice(0, 5);
}

function getRandomCapital(excludeKey) {
    const keys = Object.keys(COUNTRIES).filter(k => k !== excludeKey);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return COUNTRIES[randomKey].capital;
}

function getRandomCity(excludeKey) {
    const cities = [
        'Tokyo', 'Paris', 'London', 'Berlin', 'Rome', 'Madrid', 'Moscow', 'Sydney',
        'Toronto', 'Seoul', 'Bangkok', 'Dubai', 'Cairo', 'Lagos', 'Nairobi',
        'Buenos Aires', 'Lima', 'Bogotá', 'Santiago', 'Lisbon', 'Athens',
        'Warsaw', 'Vienna', 'Prague', 'Amsterdam', 'Stockholm', 'Oslo',
        'Copenhagen', 'Helsinki', 'Zurich', 'Brussels', 'Budapest', 'Bucharest',
        'Istanbul', 'Tehran', 'Karachi', 'Dhaka', 'Colombo', 'Kathmandu',
        'Hanoi', 'Manila', 'Kuala Lumpur', 'Singapore', 'Jakarta', 'Taipei',
        'Accra', 'Dakar', 'Addis Ababa', 'Kinshasa', 'Dar es Salaam', 'Casablanca'
    ];
    const country = COUNTRIES[excludeKey];
    const excludeCities = [...country.majorCities, country.capital];
    const availableCities = cities.filter(c => !excludeCities.includes(c));
    return availableCities[Math.floor(Math.random() * availableCities.length)];
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ==================== QUIZ RESULTS ====================
function showQuizResults(scene, score, total, countryKey) {
    scene.children.removeAll();

    const country = COUNTRIES[countryKey];
    const percentage = (score / total) * 100;
    const passed = score >= 4; // Need 4/5 to pass

    scene.add.text(450, 100, passed ? '🎉 Excellent!' : '📚 Good Try!', {
        fontSize: '48px',
        fill: passed ? '#A44A3F' : '#F19C79',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 180, `${country.name} ${country.flag}`, {
        fontSize: '32px',
        fill: '#1E293B',
        fontFamily: "'Noto Color Emoji', sans-serif"
    }).setOrigin(0.5);

    scene.add.text(450, 240, `Score: ${score}/${total}`, {
        fontSize: '42px',
        fill: '#1E293B',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(450, 300, `${percentage}%`, {
        fontSize: '36px',
        fill: country.continentColor
    }).setOrigin(0.5);

    if (passed) {
        // Mark country as learned on pass and persist
        if (!countriesLearned.includes(countryKey)) {
            countriesLearned.push(countryKey);
            localStorage.setItem('we_countriesLearned', JSON.stringify(countriesLearned));
        }

        // Unlock next difficulty if at least 1 country passed at the current level
        const levelCountries = Object.keys(COUNTRIES).filter(k => COUNTRIES[k].difficulty === currentDifficulty);
        const learnedInThisLevel = levelCountries.filter(k => countriesLearned.includes(k));
        if (learnedInThisLevel.length >= 1 && unlockedDifficulties === currentDifficulty) {
            unlockedDifficulties++;
            localStorage.setItem('we_unlockedDifficulties', unlockedDifficulties.toString());
            scene.add.text(450, 390, '🔓 Next level unlocked! Keep exploring!', {
                fontSize: '20px',
                fill: '#F19C79',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }

        scene.add.text(450, 430, '✓ Great knowledge about this country!', {
            fontSize: '20px',
            fill: '#CBDFBD'
        }).setOrigin(0.5);
    } else {
        scene.add.text(450, 390, 'Review the country info and try again!', {
            fontSize: '18px',
            fill: '#475569'
        }).setOrigin(0.5);
    }

    createModernButton(scene, 300, 500, 'Learn Again', WE_COLORS.primary, () => {
        showCountryLearn(scene, countryKey);
    }, 200, 60);

    createModernButton(scene, 600, 500, 'Choose Country', WE_COLORS.success, () => {
        showCountrySelect(scene, currentDifficulty);
    }, 200, 60);

    createModernButton(scene, 450, 580, 'Main Menu', WE_COLORS.textLight, () => {
        showMainMenu(scene);
    }, 200, 50);
}

// ==================== HELPER: CREATE MODERN BUTTON ====================
function createModernButton(scene, x, y, label, color, callback, width = 200, height = 60, small = false) {
    const button = scene.add.rectangle(x, y, width, height, color);
    button.setInteractive({ useHandCursor: true });

    const text = scene.add.text(x, y, label, {
        fontSize: small ? '16px' : '20px',
        fill: '#FFFFFF',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    button.on('pointerdown', callback);
    button.on('pointerover', () => {
        button.setAlpha(0.85);
        button.setScale(1.05);
    });
    button.on('pointerout', () => {
        button.setAlpha(1);
        button.setScale(1);
    });

    return { button, text };
}

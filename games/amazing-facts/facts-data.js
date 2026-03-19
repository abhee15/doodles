/**
 * Amazing Facts Game Data
 * 6 topic categories with facts, images, and quiz questions
 */

// eslint-disable-next-line no-unused-vars
const TOPICS = [
  {
    id: 'wonders',
    name: '7 Wonders',
    emoji: '🏛️',
    color: '#FF6B35',
    facts: [
      {
        id: 'great-wall',
        name: 'Great Wall of China',
        subtitle: "World's Longest Wall",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/1200px-Camponotus_flavomarginatus_ant.jpg',
        location: '📍 China',
        keyFacts: [
          { icon: '📏', label: 'Length', value: '21,196 km (13,171 miles)' },
          {
            icon: '⏱️',
            label: 'Built Over',
            value: '2,000+ years (7th century BC - 17th century AD)'
          },
          { icon: '🧱', label: 'Made Of', value: 'Stone, brick, and rammed earth' },
          { icon: '🛡️', label: 'Purpose', value: 'Protection from invasions and control of trade' }
        ],
        story:
          'The Great Wall of China is one of the most impressive structures ever built. It winds through mountains and grasslands to protect ancient kingdoms from invasions. Workers spent centuries building and maintaining this giant wall!',
        memoryTip: '💡 Think "GREAT = LONG" — it\'s the longest wall in the world!',
        quiz: [
          {
            q: 'How long is the Great Wall of China?',
            options: ['About 5,000 km', 'About 21,000 km', 'About 50,000 km', 'About 10,000 km'],
            answer: 1,
            explanation: 'The Great Wall stretches over 21,000 kilometers!'
          },
          {
            q: 'When was the Great Wall built?',
            options: [
              'Medieval times only',
              '1900s',
              'Over 2,000 years, starting from 7th century BC',
              'Last 100 years'
            ],
            answer: 2,
            explanation:
              'Construction started around the 7th century BC and continued for over 2,000 years!'
          }
        ]
      },
      {
        id: 'petra',
        name: 'Petra',
        subtitle: 'The Rose City',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Petra_Rose_City.jpg/1280px-Petra_Rose_City.jpg',
        location: '📍 Jordan',
        keyFacts: [
          { icon: '💎', label: 'Why "Rose"?', value: 'The rocks glow pink-red at sunset' },
          { icon: '🔨', label: 'Built By', value: 'Nabataeans, a desert trading people' },
          { icon: '📅', label: 'Built In', value: '100 BC - important trade hub' },
          { icon: '🎨', label: 'Carved From', value: 'One giant sandstone mountain' }
        ],
        story:
          'Petra was carved entirely from a mountain by skilled workers. The city was lost for centuries until a Swiss explorer rediscovered it in 1812. Imagine finding an entire ancient city hidden in the desert!',
        memoryTip: '💡 "Petra" = ROCK in Latin. It\'s a city carved from ONE massive rock!',
        quiz: [
          {
            q: 'What does Petra mean in Latin?',
            options: ['Desert', 'City', 'Rock', 'Temple'],
            answer: 2,
            explanation:
              'Petra literally means "rock" because the entire city was carved from one mountain!'
          },
          {
            q: 'Why is Petra called the "Rose City"?',
            options: [
              'Roses grow there',
              'Pink-red rocks at sunset',
              'Named after a queen',
              'It smells like roses'
            ],
            answer: 1,
            explanation:
              'The sandstone rocks glow beautiful rose-pink colors, especially at sunset!'
          }
        ]
      },
      {
        id: 'christ-redeemer',
        name: 'Christ the Redeemer',
        subtitle: 'Guardian of Rio',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cristo_redentor.jpg/800px-Cristo_redentor.jpg',
        location: '📍 Brazil',
        keyFacts: [
          { icon: '📏', label: 'Height', value: '30 meters (98 feet) tall' },
          { icon: '⚖️', label: 'Weight', value: '635 tonnes' },
          { icon: '👁️', label: 'Visibility', value: 'Can be seen from 40 km away' },
          { icon: '⚡', label: 'Struck By', value: 'Lightning several times per year!' }
        ],
        story:
          "This giant statue stands on a mountain overlooking Rio de Janeiro. Built between 1922-1931, it took 9 years to complete. The statue is so iconic it's become a symbol of Brazil and Christianity worldwide.",
        memoryTip: '💡 CHRIST = 30 METERS — about as tall as 3 school buses stacked up!',
        quiz: [
          {
            q: 'How tall is the Christ the Redeemer statue?',
            options: ['15 meters', '30 meters', '60 meters', '100 meters'],
            answer: 1,
            explanation: 'The statue is 30 meters (98 feet) tall, not including the pedestal!'
          },
          {
            q: 'In which country is Christ the Redeemer located?',
            options: ['Argentina', 'Mexico', 'Brazil', 'Peru'],
            answer: 2,
            explanation: 'Christ the Redeemer overlooks the city of Rio de Janeiro in Brazil!'
          }
        ]
      },
      {
        id: 'machu-picchu',
        name: 'Machu Picchu',
        subtitle: 'Lost City of the Incas',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/1024px-Machu_Picchu%2C_Peru.jpg',
        location: '📍 Peru',
        keyFacts: [
          { icon: '📍', label: 'Height', value: '2,430 meters (7,970 feet) above sea level' },
          { icon: '👥', label: 'Built By', value: 'The Inca Empire around 1450' },
          { icon: '🌿', label: 'Hidden By', value: 'Dense jungle for 400 years' },
          {
            icon: '🔨',
            label: 'Stones',
            value: "Fitted without mortar — so tight you can't fit a knife!"
          }
        ],
        story:
          'High in the Andes Mountains, the Incas built this amazing city for an Inca ruler. The Spanish conquistadors never found it, so the jungle hid it for centuries. Modern explorers discovered it in 1911!',
        memoryTip: '💡 LOST = JUNGLE hid it for 400 years. Rediscovered in 1911!',
        quiz: [
          {
            q: 'What is Machu Picchu often called?',
            options: [
              'City of Gods',
              'Lost City of the Incas',
              'Temple of the Sun',
              'Palace of Gold'
            ],
            answer: 1,
            explanation:
              'Machu Picchu is famous as the Lost City of the Incas because the jungle hid it for 400 years!'
          },
          {
            q: 'How were the Inca stones at Machu Picchu fitted together?',
            options: ['With cement', 'With nails', "So tightly you can't fit a knife", 'With mud'],
            answer: 2,
            explanation:
              'Inca builders were so skilled they carved stones that fit so perfectly mortar was not needed!'
          }
        ]
      },
      {
        id: 'chichen-itza',
        name: 'Chichen Itza',
        subtitle: 'Mayan Metropolis',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Chichen_Itza_7.jpg/1024px-Chichen_Itza_7.jpg',
        location: '📍 Mexico',
        keyFacts: [
          {
            icon: '🏛️',
            label: 'Main Structure',
            value: 'El Castillo pyramid — 24 meters (79 feet) high'
          },
          {
            icon: '🌞',
            label: 'Special Feature',
            value: 'Shadow serpent appears at spring/autumn equinox'
          },
          { icon: '📅', label: 'Built By', value: 'Mayan civilization around 600 AD' },
          {
            icon: '🔢',
            label: 'Sacred Meaning',
            value: 'Pyramid has 365 steps — one for each day of the year!'
          }
        ],
        story:
          'The Maya built Chichen Itza as a center for astronomy, trade, and religion. The main pyramid is so perfectly aligned with the sun that twice a year, a shadow makes a giant serpent appear to slither down the stairs!',
        memoryTip: '💡 SERPENT SHADOW appears on equinoxes — the Maya were brilliant astronomers!',
        quiz: [
          {
            q: 'What special shadow appears at Chichen Itza during equinoxes?',
            options: ['An eagle', 'A jaguar', 'A serpent', 'A pyramid'],
            answer: 2,
            explanation:
              'A shadow of a giant serpent appears to slither down the pyramid stairs during spring and autumn equinoxes!'
          },
          {
            q: 'How many steps does the El Castillo pyramid have?',
            options: ['365 steps', '260 steps', '180 steps', '100 steps'],
            answer: 0,
            explanation:
              'The pyramid has 365 steps — one for each day of the year! The Maya were amazing astronomers!'
          }
        ]
      },
      {
        id: 'colosseum',
        name: 'The Colosseum',
        subtitle: "Rome's Greatest Arena",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1024px-Colosseo_2020.jpg',
        location: '📍 Italy',
        keyFacts: [
          { icon: '📏', label: 'Height', value: '48 meters (157 feet) tall' },
          { icon: '👥', label: 'Capacity', value: '50,000-80,000 spectators' },
          { icon: '⏱️', label: 'Built In', value: '8 years (70-80 AD)' },
          { icon: '🎪', label: 'Hosted', value: 'Gladiator fights, animal hunts, and dramas' }
        ],
        story:
          "The ancient Romans built this massive arena in Rome to host battles and entertainment. It's the largest amphitheater ever built and is now a symbol of Rome's engineering genius. Despite earthquakes and fires, much of it still stands!",
        memoryTip: '💡 COLOSSEUM = COLOSSAL = HUGE! Built in just 8 years!',
        quiz: [
          {
            q: 'How many spectators could the Colosseum hold?',
            options: ['5,000-10,000', '50,000-80,000', '100,000+', '20,000-30,000'],
            answer: 1,
            explanation:
              "The Colosseum could hold 50,000 to 80,000 people — that's like a large modern stadium!"
          },
          {
            q: 'How long did it take to build the Colosseum?',
            options: ['20 years', '8 years', '50 years', '3 years'],
            answer: 1,
            explanation:
              'Amazingly, the Romans built this massive structure in just 8 years (70-80 AD)!'
          }
        ]
      },
      {
        id: 'taj-mahal',
        name: 'Taj Mahal',
        subtitle: 'Monument to Love',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Taj_Mahal%2C_Agra%2C_India.jpg/1024px-Taj_Mahal%2C_Agra%2C_India.jpg',
        location: '📍 India',
        keyFacts: [
          { icon: '💎', label: 'Made Of', value: 'White marble inlaid with semi-precious stones' },
          { icon: '👑', label: 'Built By', value: 'Emperor Shah Jahan for his wife Mumtaz' },
          { icon: '⏱️', label: 'Built In', value: '22 years (1632-1653)' },
          {
            icon: '✨',
            label: 'Special Feature',
            value: 'Glows different colors at sunrise, noon, and sunset!'
          }
        ],
        story:
          'The Taj Mahal is one of the most beautiful buildings in the world. An emperor built it as a tomb for his beloved wife. It took 22 years and 20,000 workers to complete. The marble is so smooth and white it glows at different times of day!',
        memoryTip: '💡 TAJ MAHAL = LOVE MONUMENT — built for a beloved wife!',
        quiz: [
          {
            q: 'Who built the Taj Mahal and why?',
            options: [
              'A emperor for his son',
              'An emperor for his beloved wife',
              'A king for his mother',
              'A rich merchant for his palace'
            ],
            answer: 1,
            explanation:
              'Emperor Shah Jahan built the Taj Mahal as a tomb and monument to his beloved wife Mumtaz Mahal!'
          },
          {
            q: 'How long did it take to build the Taj Mahal?',
            options: ['5 years', '10 years', '22 years', '50 years'],
            answer: 2,
            explanation:
              'It took 22 years (1632-1653) and 20,000 workers to build this beautiful monument!'
          }
        ]
      }
    ]
  },

  {
    id: 'mountains',
    name: '🏔️ Mountains',
    emoji: '⛰️',
    color: '#8E44AD',
    facts: [
      {
        id: 'mount-everest',
        name: 'Mount Everest',
        subtitle: "World's Tallest Mountain",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2007.jpg/1024px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2007.jpg',
        location: '📍 Nepal/China',
        keyFacts: [
          { icon: '📏', label: 'Height', value: '8,849 meters (29,032 feet)' },
          { icon: '❄️', label: 'Temperature', value: '-60°C (-76°F) at summit' },
          { icon: '🌪️', label: 'Wind Speed', value: 'Up to 200 mph at the top' },
          { icon: '🏔️', label: 'Climbers', value: 'Only ~4,000 have reached the summit' }
        ],
        story:
          'Mount Everest is the tallest mountain on Earth. Climbers face deadly conditions including extreme cold, thin air, and dangerous storms. The climb takes weeks and is one of the most dangerous adventures people attempt!',
        memoryTip: '💡 EVEREST = HIGHEST! 8,849 meters — so high planes fly at this altitude!',
        quiz: [
          {
            q: 'How tall is Mount Everest?',
            options: ['7,000 meters', '8,849 meters', '9,500 meters', '10,000 meters'],
            answer: 1,
            explanation:
              'Mount Everest is 8,849 meters (29,032 feet) tall — the highest mountain on Earth!'
          },
          {
            q: 'What is the temperature at the summit of Mount Everest?',
            options: ['-10°C', '-30°C', '-60°C', '-90°C'],
            answer: 2,
            explanation: 'At the summit, temperatures drop to -60°C (-76°F) — dangerously cold!'
          }
        ]
      },
      {
        id: 'k2',
        name: 'K2',
        subtitle: 'The Savage Mountain',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/K2_2006b.jpg/800px-K2_2006b.jpg',
        location: '📍 Pakistan/China',
        keyFacts: [
          { icon: '📏', label: 'Height', value: '8,611 meters (28,251 feet)' },
          {
            icon: '☠️',
            label: 'Danger Level',
            value: 'Second deadliest mountain — 1 in 4 climbers die'
          },
          { icon: '❌', label: 'Name Meaning', value: '"K" = Karakoram range, "2" = second peak' },
          { icon: '⛰️', label: 'Steepness', value: 'Much steeper than Everest — harder climb' }
        ],
        story:
          'K2 is called the "Savage Mountain" because it\'s extremely dangerous to climb. While it\'s lower than Everest, K2 is far more treacherous with unpredictable weather and deadly avalanches. Only experienced mountaineers attempt it!',
        memoryTip: '💡 K2 = "SAVAGE" — so dangerous that 1 in 4 climbers may not survive!',
        quiz: [
          {
            q: 'What is K2 often called?',
            options: [
              'The Highest Peak',
              'The Savage Mountain',
              'The Killer Peak',
              'The Ice Tower'
            ],
            answer: 1,
            explanation:
              'K2 is known as the "Savage Mountain" because it\'s one of the most dangerous mountains to climb!'
          },
          {
            q: 'Why is K2 harder to climb than Everest?',
            options: [
              "It's much higher",
              "It's steeper and more dangerous",
              'It has more snow',
              "It's colder"
            ],
            answer: 1,
            explanation:
              'While K2 is lower than Everest, its extreme steepness and unpredictable weather make it far more deadly!'
          }
        ]
      },
      {
        id: 'kilimanjaro',
        name: 'Mount Kilimanjaro',
        subtitle: "Africa's Highest Peak",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kilimanjaro_2008-01-22.jpeg/1024px-Kilimanjaro_2008-01-22.jpeg',
        location: '📍 Tanzania',
        keyFacts: [
          { icon: '📏', label: 'Height', value: '5,895 meters (19,341 feet)' },
          {
            icon: '❄️',
            label: 'Snow at Summit',
            value: 'Snow and ice despite being near the equator!'
          },
          { icon: '🌋', label: 'Type', value: 'Dormant volcano — last erupted 360,000 years ago' },
          { icon: '🌍', label: 'Location', value: 'Only 3 degrees south of the equator' }
        ],
        story:
          "Kilimanjaro is special because it's a snow-capped mountain right near the equator in Africa! Unlike Everest, you don't need climbing gear to reach the top — just endurance and good hiking boots. But the thin air makes it challenging!",
        memoryTip: '💡 KILI = SNOW AT EQUATOR! Not icy, but the glaciers are shrinking fast!',
        quiz: [
          {
            q: "What is unusual about Mount Kilimanjaro's location?",
            options: [
              "It's the tallest peak",
              'It has snow near the equator',
              "It's a volcano",
              "It's in Africa"
            ],
            answer: 1,
            explanation:
              'Kilimanjaro is remarkable for having snow and ice despite being only 3 degrees from the equator!'
          },
          {
            q: 'What type of mountain is Kilimanjaro?',
            options: ['Active volcano', 'Dormant volcano', 'Limestone peak', 'Granite formation'],
            answer: 1,
            explanation:
              'Kilimanjaro is a dormant (sleeping) volcano that last erupted over 360,000 years ago!'
          }
        ]
      },
      {
        id: 'mont-blanc',
        name: 'Mont Blanc',
        subtitle: "Europe's Highest Peak",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Mont-Blanc_Oct_2004_trace.jpg/1024px-Mont-Blanc_Oct_2004_trace.jpg',
        location: '📍 France/Italy',
        keyFacts: [
          { icon: '📏', label: 'Height', value: '4,808 meters (15,774 feet)' },
          { icon: '⛷️', label: 'Activity', value: 'Popular with hikers and mountain climbers' },
          { icon: '❄️', label: 'Glaciers', value: 'Covered in glaciers and ice year-round' },
          { icon: '🌰', label: 'Name Meaning', value: '"Blanc" means "white" in French' }
        ],
        story:
          "Mont Blanc is the highest mountain in the Alps and in all of Europe! It's located on the border between France and Italy. Thousands of people climb it every year because it's challenging but achievable without extreme mountaineering skills.",
        memoryTip: '💡 BLANC = WHITE — permanently covered in snow and ice!',
        quiz: [
          {
            q: 'Which country or countries does Mont Blanc border?',
            options: ['Only France', 'Only Italy', 'France and Italy', 'Germany and Italy'],
            answer: 2,
            explanation:
              'Mont Blanc sits on the border between France and Italy, so both countries claim it!'
          },
          {
            q: 'What does "Blanc" mean in French?',
            options: ['Mountain', 'High', 'White', 'Peak'],
            answer: 2,
            explanation:
              'Blanc means "white" — the mountain is permanently white with snow and ice!'
          }
        ]
      },
      {
        id: 'kangchenjunga',
        name: 'Kangchenjunga',
        subtitle: 'Third Highest Mountain',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Kangchenjunga.jpg/1024px-Kangchenjunga.jpg',
        location: '📍 Nepal/India',
        keyFacts: [
          { icon: '📏', label: 'Height', value: '8,586 meters (28,169 feet)' },
          { icon: '🏔️', label: 'Rank', value: 'Third highest mountain in the world' },
          { icon: '🌿', label: 'Meaning', value: '"Snow of the five treasures" in Nepali' },
          { icon: '🧗', label: 'Difficulty', value: 'One of the most challenging climbs' }
        ],
        story:
          "Kangchenjunga is the third-highest mountain on Earth and one of the most dangerous to climb. Its name comes from the five treasures it's believed to protect. Out of respect, climbers traditionally don't step on the actual summit!",
        memoryTip:
          "💡 KANGCHEN = SACRED! Climbers respect tradition and don't touch the summit peak!",
        quiz: [
          {
            q: 'What does Kangchenjunga mean?',
            options: [
              'Five Brothers',
              'Snow of the five treasures',
              'Mountain of Gold',
              'Holy Peak'
            ],
            answer: 1,
            explanation: 'Kangchenjunga means "Snow of the five treasures" in Nepali!'
          },
          {
            q: 'Where is Kangchenjunga located?',
            options: ['Pakistan/China', 'China/Tibet', 'Nepal/India', 'Bhutan/Nepal'],
            answer: 2,
            explanation:
              'Kangchenjunga sits on the border between Nepal and India in the Himalayas!'
          }
        ]
      }
    ]
  },

  {
    id: 'countries',
    name: '🌍 Countries',
    emoji: '🗺️',
    color: '#E74C3C',
    facts: [
      {
        id: 'russia-largest',
        name: 'Russia',
        subtitle: "World's Largest Country",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Russia_Sakha%28Yakutia%29.jpg/1024px-Russia_Sakha%28Yakutia%29.jpg',
        location: '📍 Europe/Asia',
        keyFacts: [
          { icon: '📏', label: 'Area', value: '17.1 million km² (6.6 million sq mi)' },
          { icon: '🕐', label: 'Time Zones', value: '11 time zones — largest number!' },
          { icon: '👥', label: 'Population', value: '145 million people' },
          { icon: '🌳', label: 'Forests', value: "20% of Earth's forests!" }
        ],
        story:
          "Russia is so enormous it spans from Europe all the way across Asia to the Pacific Ocean! It's so wide that when it's noon on one side, it's midnight on the other. Russia contains vast forests, mountains, and frozen tundra.",
        memoryTip:
          '💡 RUSSIA = 11 TIME ZONES! Imagine it being breakfast in one part and bedtime in another!',
        quiz: [
          {
            q: 'How many time zones does Russia have?',
            options: ['5', '8', '11', '15'],
            answer: 2,
            explanation: 'Russia spans 11 time zones — the most of any country in the world!'
          },
          {
            q: "What percentage of Earth's forests are in Russia?",
            options: ['5%', '10%', '20%', '30%'],
            answer: 2,
            explanation: "About 20% of all forests on Earth are in Russia — that's HUGE!"
          }
        ]
      },
      {
        id: 'vatican-smallest',
        name: 'Vatican City',
        subtitle: "World's Smallest Country",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vatican_City_St_Peters_Basilica.jpg/1024px-Vatican_City_St_Peters_Basilica.jpg',
        location: '📍 Rome, Italy',
        keyFacts: [
          { icon: '📏', label: 'Area', value: '0.44 km² (0.17 sq mi) — smaller than a city park!' },
          { icon: '👥', label: 'Population', value: 'About 800 people' },
          {
            icon: '🕌',
            label: 'Main Attraction',
            value: "St. Peter's Basilica — one of the world's largest churches"
          },
          { icon: '👑', label: 'Ruler', value: 'The Pope, head of the Catholic Church' }
        ],
        story:
          "Vatican City is the smallest country in the entire world! You could walk across it in about 20 minutes. It's an independent country with its own government, stamps, and coins. The Pope lives here and runs the Catholic Church from Vatican City.",
        memoryTip: '💡 VATICAN = TINY! Fits inside Rome with room to spare!',
        quiz: [
          {
            q: 'What is the smallest country in the world?',
            options: ['Monaco', 'San Marino', 'Vatican City', 'Luxembourg'],
            answer: 2,
            explanation:
              "Vatican City is the world's smallest country with an area of just 0.44 km²!"
          },
          {
            q: 'Who is the ruler of Vatican City?',
            options: [
              'The Italian President',
              'The Pope',
              'The Mayor of Rome',
              'An appointed Governor'
            ],
            answer: 1,
            explanation: 'The Pope, head of the Catholic Church, is the ruler of Vatican City!'
          }
        ]
      },
      {
        id: 'china-population',
        name: 'China',
        subtitle: 'Most Populated Country',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Beijing_from_space_2016.jpg/1024px-Beijing_from_space_2016.jpg',
        location: '📍 Asia',
        keyFacts: [
          {
            icon: '👥',
            label: 'Population',
            value: '1.4 billion people — nearly 1 in 5 on Earth!'
          },
          { icon: '📏', label: 'Area', value: '9.6 million km²' },
          { icon: '🏮', label: 'Ancient Civilization', value: '5,000+ year history' },
          { icon: '🚀', label: 'Modern Achievement', value: 'Fastest growing economy' }
        ],
        story:
          "China has more people than any other country on Earth! With over 1.4 billion people, nearly 1 in 5 humans live in China. It has one of the world's oldest civilizations with incredible inventions like paper, gunpowder, and the compass!",
        memoryTip: "💡 CHINA = 1.4 BILLION — that's 1 in every 5 people on Earth!",
        quiz: [
          {
            q: 'How many people live in China?',
            options: ['500 million', '800 million', '1.4 billion', '2 billion'],
            answer: 2,
            explanation:
              'China has about 1.4 billion people — making it the most populated country!'
          },
          {
            q: "What fraction of the world's population lives in China?",
            options: ['1 in 10', '1 in 8', '1 in 5', '1 in 3'],
            answer: 2,
            explanation: 'Approximately 1 in every 5 people on Earth lives in China!'
          }
        ]
      },
      {
        id: 'monaco-densest',
        name: 'Monaco',
        subtitle: 'Most Densely Populated Country',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Monaco_-_France_relations.jpg/1024px-Monaco_-_France_relations.jpg',
        location: '📍 Europe',
        keyFacts: [
          { icon: '📏', label: 'Area', value: '2.02 km² (0.78 sq mi) — tiny!' },
          { icon: '👥', label: 'Population', value: '36,000 people' },
          { icon: '🏎️', label: 'Famous For', value: 'Monaco Grand Prix — prestigious car race!' },
          { icon: '💎', label: 'Wealth', value: 'One of the richest places on Earth' }
        ],
        story:
          "Monaco is the second-smallest country but has the most people packed into it! It's famous as a luxury playground for the wealthy. Monaco hosts the prestigious Grand Prix, a famous car racing event watched worldwide.",
        memoryTip: '💡 MONACO = PACKED with people! 36,000 in 2 km² — super crowded!',
        quiz: [
          {
            q: 'What is Monaco famous for?',
            options: [
              'Chocolate',
              'The Grand Prix car race',
              'Wine production',
              'Mountain climbing'
            ],
            answer: 1,
            explanation:
              "Monaco is famous for the prestigious Monaco Grand Prix, one of the world's most important car races!"
          },
          {
            q: 'How many people live in Monaco per square km?',
            options: ['500', '2,000', '10,000', '18,000+'],
            answer: 3,
            explanation:
              'Monaco has about 36,000 people in just 2 km², making it incredibly densely populated!'
          }
        ]
      },
      {
        id: 'greenland-island',
        name: 'Greenland',
        subtitle: "World's Largest Island",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Greenland_2013.jpg/1024px-Greenland_2013.jpg',
        location: '📍 Atlantic Ocean',
        keyFacts: [
          { icon: '📏', label: 'Area', value: '2.16 million km² — 82% covered by ice!' },
          { icon: '🧊', label: 'Ice Sheet', value: 'Second-largest ice sheet after Antarctica' },
          { icon: '👥', label: 'Population', value: 'Only 56,000 people' },
          { icon: '🌡️', label: 'Temperature', value: 'Freezing! Average -7°C (19°F)' }
        ],
        story:
          "Greenland is the largest island on Earth, but it's covered in ice and snow! Most people live on the coast because the interior is one giant ice sheet. It's part of Denmark but has its own culture and language.",
        memoryTip: "💡 GREENLAND = 82% ICE! Despite the name, it's frozen solid!",
        quiz: [
          {
            q: 'What is the largest island in the world?',
            options: ['New Guinea', 'Borneo', 'Greenland', 'Madagascar'],
            answer: 2,
            explanation:
              "Greenland is the world's largest island, with an area of 2.16 million km²!"
          },
          {
            q: 'How much of Greenland is covered by ice?',
            options: ['40%', '60%', '80%', '95%'],
            answer: 2,
            explanation: 'About 82% of Greenland is covered by the massive Greenland Ice Sheet!'
          }
        ]
      },
      {
        id: 'usa-land',
        name: 'United States',
        subtitle: 'Fourth Largest Country',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/USA_Topo_Maps.jpg/1024px-USA_Topo_Maps.jpg',
        location: '📍 North America',
        keyFacts: [
          { icon: '📏', label: 'Area', value: '9.8 million km²' },
          { icon: '👥', label: 'Population', value: '330 million people' },
          { icon: '🏗️', label: 'Diversity', value: '50 states with unique cultures' },
          { icon: '⭐', label: 'Geography', value: 'Mountains, deserts, forests, and coasts' }
        ],
        story:
          "The United States is the fourth-largest country by area and the third by population. From the Rocky Mountains to the Everglades, from deserts to Great Lakes, the US has every type of landscape. It's a country of amazing geographic diversity!",
        memoryTip: '💡 USA = 50 STATES! Each with its own unique landscape and culture!',
        quiz: [
          {
            q: 'How many states make up the United States?',
            options: ['40', '48', '50', '52'],
            answer: 2,
            explanation: 'The United States has 50 states!'
          },
          {
            q: 'What is the population of the United States?',
            options: ['200 million', '250 million', '330 million', '400 million'],
            answer: 2,
            explanation: 'The US has a population of about 330 million people!'
          }
        ]
      }
    ]
  },

  {
    id: 'nature',
    name: '🦘 Animals & Nature',
    emoji: '🌿',
    color: '#27AE60',
    facts: [
      {
        id: 'kangaroos-australia',
        name: 'Kangaroos',
        subtitle: 'Only in Australia',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Kangaroo_and_joey03.jpg/1024px-Kangaroo_and_joey03.jpg',
        location: '📍 Australia',
        keyFacts: [
          { icon: '🦘', label: 'Native To', value: 'ONLY Australia — nowhere else in the wild!' },
          { icon: '⚡', label: 'Speed', value: 'Can hop at 70 km/h (44 mph)!' },
          { icon: '👶', label: 'Baby', value: 'Called a "joey" — born smaller than a mouse!' },
          { icon: '🦴', label: 'Tail', value: 'Strong tail used as a third leg for balance' }
        ],
        story:
          "Kangaroos are found nowhere else on Earth — they're unique to Australia! They hop instead of walk, covering huge distances with their powerful legs. Baby kangaroos called joeys are tiny at birth and grow in their mother's pouch!",
        memoryTip: '💡 KANGAROO = HOP HOP = AUSTRALIA ONLY! Unique marsupial!',
        quiz: [
          {
            q: 'Where are kangaroos naturally found?',
            options: ['Africa', 'South America', 'Australia only', 'Asia'],
            answer: 2,
            explanation: 'Kangaroos are found only in Australia — nowhere else in nature!'
          },
          {
            q: 'What is a baby kangaroo called?',
            options: ['A kit', 'A calf', 'A joey', 'A pup'],
            answer: 2,
            explanation: 'A baby kangaroo is called a joey!'
          }
        ]
      },
      {
        id: 'amazon-rainforest',
        name: 'Amazon Rainforest',
        subtitle: "Earth's Lungs",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Amazon_Rainforest_Canopy.jpg/1024px-Amazon_Rainforest_Canopy.jpg',
        location: '📍 South America',
        keyFacts: [
          { icon: '🌍', label: 'Coverage', value: 'Covers 5.5 million km² across 9 countries' },
          { icon: '🌳', label: 'Trees', value: '390 billion trees!' },
          { icon: '🐾', label: 'Wildlife', value: '10% of all animal species on Earth' },
          { icon: '💨', label: 'Oxygen', value: "Produces 20% of world's oxygen!" }
        ],
        story:
          "The Amazon is the world's largest rainforest and the most biodiverse place on Earth. It's home to millions of species found nowhere else. The Amazon is called \"Earth's lungs\" because it produces 20% of the planet's oxygen!",
        memoryTip: '💡 AMAZON = LUNGS OF EARTH! 20% of all oxygen on Earth!',
        quiz: [
          {
            q: "What percentage of the world's oxygen is produced by the Amazon?",
            options: ['5%', '10%', '20%', '50%'],
            answer: 2,
            explanation:
              'The Amazon produces about 20% of the world\'s oxygen, earning it the nickname "Earth\'s Lungs!"'
          },
          {
            q: 'What percentage of animal species are found in the Amazon?',
            options: ['5%', '10%', '20%', '30%'],
            answer: 1,
            explanation:
              'About 10% of all animal species on Earth are found in the Amazon Rainforest!'
          }
        ]
      },
      {
        id: 'galapagos-tortoises',
        name: 'Galapagos Tortoises',
        subtitle: 'Giant Ancient Reptiles',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tortoise_Galapagos.jpg/1024px-Tortoise_Galapagos.jpg',
        location: '📍 Galapagos Islands',
        keyFacts: [
          { icon: '📏', label: 'Size', value: 'Up to 1.3 meters (4 feet) long!' },
          { icon: '⏱️', label: 'Lifespan', value: 'Can live over 100 years — some over 200!' },
          { icon: '🌍', label: 'Home', value: 'Only found on the Galapagos Islands' },
          { icon: '🧬', label: 'Science', value: "Inspired Darwin's Theory of Evolution" }
        ],
        story:
          'Galapagos tortoises are the largest tortoises on Earth and some live longer than humans! They can weigh over 400 kg (900 lbs). These ancient reptiles inspired scientist Charles Darwin to develop his famous theory of evolution.',
        memoryTip:
          '💡 GALAPAGOS = GIANT + 200 YEARS! Some might outlive your great-great-grandparents!',
        quiz: [
          {
            q: 'How long can Galapagos tortoises live?',
            options: ['30-40 years', '50-70 years', 'Over 100 years, some over 200', '80-90 years'],
            answer: 2,
            explanation:
              'Galapagos tortoises can live over 100 years, with some documented to live over 200 years!'
          },
          {
            q: 'Why are Galapagos tortoises famous in science?',
            options: [
              "They're the fastest animals",
              "They inspired Darwin's Theory of Evolution",
              "They're found everywhere",
              'They lay the most eggs'
            ],
            answer: 1,
            explanation:
              'Charles Darwin studied Galapagos tortoises and other island species, which helped him develop the Theory of Evolution!'
          }
        ]
      },
      {
        id: 'sahara-desert',
        name: 'Sahara Desert',
        subtitle: "Earth's Largest Hot Desert",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Sahara_satellite.jpg/1024px-Sahara_satellite.jpg',
        location: '📍 Africa',
        keyFacts: [
          { icon: '📏', label: 'Size', value: '9.2 million km² — as big as the USA!' },
          { icon: '🌡️', label: 'Temperature', value: 'Up to 58°C (136°F) — one of hottest places' },
          { icon: '🏜️', label: 'Landscape', value: 'Mostly rock and gravel, some sand dunes' },
          { icon: '👥', label: 'People', value: '2 million people live in the Sahara!' }
        ],
        story:
          "The Sahara is the world's largest hot desert, spanning across 9 African countries. It's an incredibly harsh environment with scorching heat, dust storms, and scarce water. Yet millions of people and adapted animals live there!",
        memoryTip: '💡 SAHARA = SUPER HOT! 58°C (136°F) — hotter than the hottest oven!',
        quiz: [
          {
            q: 'What is the size of the Sahara Desert?',
            options: ['3 million km²', '6 million km²', '9.2 million km²', '12 million km²'],
            answer: 2,
            explanation:
              'The Sahara covers about 9.2 million km² — about the size of the entire United States!'
          },
          {
            q: 'How hot can the Sahara get?',
            options: ['40°C', '50°C', 'Up to 58°C', 'Over 70°C'],
            answer: 2,
            explanation:
              'The Sahara has reached temperatures up to 58°C (136°F), making it one of the hottest places on Earth!'
          }
        ]
      },
      {
        id: 'polar-bears',
        name: 'Polar Bears',
        subtitle: "Arctic's Top Predator",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Polar_Bear_-_Alaska.jpg/1024px-Polar_Bear_-_Alaska.jpg',
        location: '📍 Arctic',
        keyFacts: [
          { icon: '🐻‍❄️', label: 'Habitat', value: 'ONLY in the Arctic — nowhere else!' },
          { icon: '⚪', label: 'Fur', value: 'White fur blends with ice and snow' },
          { icon: '💪', label: 'Strength', value: 'Strongest land predator!' },
          { icon: '🌡️', label: 'Temperature', value: 'Survive -50°C (-58°F)' }
        ],
        story:
          'Polar bears live in the frozen Arctic and are found nowhere else on Earth. They are the largest land carnivores and excellent swimmers. Their white fur camouflages them in ice and snow, helping them hunt seals.',
        memoryTip: '💡 POLAR BEAR = ARCTIC ONLY! Pure white to hide in ice and snow!',
        quiz: [
          {
            q: 'Where do polar bears naturally live?',
            options: ['Antarctica', 'Northern Canada only', 'The Arctic', 'Arctic and Antarctica'],
            answer: 2,
            explanation:
              'Polar bears live only in the Arctic, not in Antarctica! They are found in countries like Canada, Russia, and Greenland.'
          },
          {
            q: 'Why do polar bears have white fur?',
            options: [
              'To look pretty',
              'To stay warm',
              'To camouflage in ice and snow',
              'For no reason'
            ],
            answer: 2,
            explanation:
              'Polar bears have white fur that camouflages them in ice and snow, helping them hunt seals!'
          }
        ]
      }
    ]
  },

  {
    id: 'rivers-oceans',
    name: '🌊 Rivers & Oceans',
    emoji: '💧',
    color: '#2980B9',
    facts: [
      {
        id: 'nile-river',
        name: 'Nile River',
        subtitle: "World's Longest River",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Nile_Delta_by_Sentinel-2.jpg/1024px-Nile_Delta_by_Sentinel-2.jpg',
        location: '📍 Africa',
        keyFacts: [
          { icon: '📏', label: 'Length', value: '6,650 km (4,130 miles)' },
          { icon: '🌍', label: 'Flows Through', value: '11 African countries' },
          { icon: '🏛️', label: 'Ancient Civilization', value: "Egypt's lifeline for 5,000 years" },
          { icon: '🌊', label: 'Origin', value: 'Starts in Burundi highlands' }
        ],
        story:
          "The Nile is the longest river on Earth, flowing through 11 countries in Africa. Ancient Egypt built one of the world's greatest civilizations on the Nile's banks. Every year the river flooded, bringing rich soil for farming.",
        memoryTip: "💡 NILE = 6,650 KM = LONGEST! Egypt's ancient civilization depended on it!",
        quiz: [
          {
            q: 'How long is the Nile River?',
            options: ['3,000 km', '4,000 km', '6,650 km', '8,000 km'],
            answer: 2,
            explanation:
              'The Nile River is 6,650 km (4,130 miles) long — the longest river on Earth!'
          },
          {
            q: 'How many countries does the Nile flow through?',
            options: ['3', '6', '9', '11'],
            answer: 3,
            explanation:
              'The Nile flows through 11 African countries, including Egypt, Sudan, and Uganda!'
          }
        ]
      },
      {
        id: 'amazon-river',
        name: 'Amazon River',
        subtitle: 'Mightiest River',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Amazon_River.jpg/1024px-Amazon_River.jpg',
        location: '📍 South America',
        keyFacts: [
          { icon: '📏', label: 'Length', value: '6,400 km (4,000 miles)' },
          {
            icon: '💧',
            label: 'Discharge',
            value: 'Releases more water than next 7 largest rivers combined!'
          },
          {
            icon: '🌊',
            label: 'River Width',
            value: 'Up to 11 km (7 miles) wide during wet season'
          },
          {
            icon: '🐠',
            label: 'Freshwater Fish',
            value: '3,000+ species — more than any other river'
          }
        ],
        story:
          "While the Nile is longer, the Amazon is mightier! It releases more water into the ocean than the next 7 largest rivers combined. The Amazon carries 20% of the world's river water. Its basin is home to incredible biodiversity.",
        memoryTip: '💡 AMAZON = MIGHTY! Releases more water than 7 other rivers COMBINED!',
        quiz: [
          {
            q: 'What makes the Amazon different from the Nile?',
            options: ["It's longer", 'It discharges more water', "It's warmer", 'It flows faster'],
            answer: 1,
            explanation:
              "The Amazon discharges more water than the next 7 largest rivers combined — it's the mightiest!"
          },
          {
            q: 'How many freshwater fish species live in the Amazon?',
            options: ['500+', '1,000+', '2,000+', '3,000+'],
            answer: 3,
            explanation:
              'Over 3,000 freshwater fish species live in the Amazon — more than any other river!'
          }
        ]
      },
      {
        id: 'pacific-ocean',
        name: 'Pacific Ocean',
        subtitle: 'Largest Ocean',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Pacific_ocean.png/1024px-Pacific_ocean.png',
        location: '📍 Between Asia and Americas',
        keyFacts: [
          { icon: '📏', label: 'Size', value: '165 million km² — covers 1/3 of Earth!' },
          { icon: '🌊', label: 'Depth', value: 'Average 4,000 meters (13,000 feet)' },
          { icon: '🏝️', label: 'Islands', value: 'Over 20,000 islands!' },
          { icon: '🌋', label: 'Volcanoes', value: 'Ring of Fire — most active volcano zone' }
        ],
        story:
          "The Pacific Ocean is the largest and deepest ocean on Earth. It covers more area than all the land on Earth combined! The Pacific connects Asia, Australia, and the Americas. It's home to coral reefs, mysterious deep-sea creatures, and thousands of islands.",
        memoryTip: '💡 PACIFIC = PEACEFUL (ironic name!). Covers 1/3 of Earth!',
        quiz: [
          {
            q: 'What is the size of the Pacific Ocean?',
            options: ['50 million km²', '100 million km²', '165 million km²', '200 million km²'],
            answer: 2,
            explanation:
              "The Pacific Ocean covers about 165 million km² — more than 1/3 of Earth's surface!"
          },
          {
            q: 'How many islands are in the Pacific Ocean?',
            options: ['5,000', '10,000', 'Over 20,000', 'Over 50,000'],
            answer: 2,
            explanation: 'The Pacific Ocean has over 20,000 islands, the most of any ocean!'
          }
        ]
      },
      {
        id: 'mariana-trench',
        name: 'Mariana Trench',
        subtitle: 'Deepest Ocean Point',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Mariana_Trench_by_Tanya_Puntti.jpg/1024px-Mariana_Trench_by_Tanya_Puntti.jpg',
        location: '📍 Pacific Ocean',
        keyFacts: [
          {
            icon: '⬇️',
            label: 'Depth',
            value: '11,000 meters (36,070 feet) — deeper than Everest is tall!'
          },
          { icon: '🌊', label: 'Pressure', value: '1,000 times normal ocean pressure' },
          { icon: '🦑', label: 'Life', value: 'Weird creatures like dumbo octopuses' },
          { icon: '⛰️', label: 'Volume', value: 'Could submerge Mount Everest!' }
        ],
        story:
          'The Mariana Trench is the deepest point in any ocean and the deepest known point on Earth. The pressure there is so extreme that very few creatures can survive. We know more about the Moon than the bottom of this trench!',
        memoryTip: '💡 MARIANA = 11,000 METERS DEEP! Everest is only 8,849 meters tall!',
        quiz: [
          {
            q: 'How deep is the Mariana Trench?',
            options: ['5,000 meters', '8,000 meters', '11,000 meters', '15,000 meters'],
            answer: 2,
            explanation:
              'The Mariana Trench reaches 11,000 meters (36,070 feet) deep — deeper than Mount Everest is tall!'
          },
          {
            q: 'How many times stronger is the pressure at the bottom of the Mariana Trench?',
            options: ['100 times', '500 times', '1,000 times', '5,000 times'],
            answer: 2,
            explanation:
              'The pressure at the bottom is about 1,000 times stronger than normal ocean surface pressure!'
          }
        ]
      },
      {
        id: 'arctic-ocean',
        name: 'Arctic Ocean',
        subtitle: 'Coldest Ocean',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Polarstern_in_Arctic_pack_ice.jpg/1024px-Polarstern_in_Arctic_pack_ice.jpg',
        location: '📍 North Pole',
        keyFacts: [
          { icon: '🧊', label: 'Coverage', value: 'Covered by sea ice most of the year' },
          { icon: '🌡️', label: 'Temperature', value: 'Average -1°C (30°F)' },
          { icon: '🐾', label: 'Wildlife', value: 'Polar bears, seals, walruses, whales' },
          { icon: '📏', label: 'Size', value: 'Smallest ocean, but connects to all others' }
        ],
        story:
          "The Arctic Ocean is the coldest and smallest ocean. It's mostly covered in thick sea ice, making it a harsh environment. Despite the cold, incredible animals like polar bears and whales live there. The Arctic is very important to the global climate.",
        memoryTip: '💡 ARCTIC = ICE-COVERED and POLAR BEAR HOME! Melting due to climate change!',
        quiz: [
          {
            q: 'What animals live in the Arctic Ocean?',
            options: [
              'Only fish',
              'Polar bears, seals, walruses, whales',
              'No large animals',
              'Penguins'
            ],
            answer: 1,
            explanation:
              'The Arctic is home to polar bears, seals, walruses, beluga whales, and many other cold-adapted animals!'
          },
          {
            q: 'What is the average temperature of the Arctic Ocean?',
            options: ['-15°C', '-5°C', 'Around -1°C', '+5°C'],
            answer: 2,
            explanation:
              'The Arctic Ocean has an average temperature around -1°C (30°F) — below freezing!'
          }
        ]
      }
    ]
  },

  {
    id: 'languages',
    name: '🗣️ Languages & People',
    emoji: '💬',
    color: '#E67E22',
    facts: [
      {
        id: 'mandarin-spoken',
        name: 'Mandarin Chinese',
        subtitle: 'Most Spoken Language',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Beijing_from_space_2016.jpg/1024px-Beijing_from_space_2016.jpg',
        location: '📍 China and Taiwan',
        keyFacts: [
          { icon: '👥', label: 'Speakers', value: '918 million native speakers' },
          { icon: '🗣️', label: 'Total Speakers', value: '1+ billion including non-native' },
          {
            icon: '🔤',
            label: 'Writing',
            value: 'Uses Chinese characters (hanzi) not an alphabet'
          },
          { icon: '📝', label: 'Characters', value: 'Thousands of characters to learn!' }
        ],
        story:
          "Mandarin Chinese is the most widely spoken language in the world. With over 1 billion speakers, nearly 1 in 7 people speak Mandarin! It's a tonal language, meaning the way you say a word can completely change its meaning.",
        memoryTip: '💡 MANDARIN = 1 BILLION SPEAKERS! Nearly 1 in 7 people speak it!',
        quiz: [
          {
            q: 'How many native speakers does Mandarin Chinese have?',
            options: ['500 million', '700 million', '918 million', '1.5 billion'],
            answer: 2,
            explanation:
              'Mandarin has over 918 million native speakers — making it the most spoken first language!'
          },
          {
            q: 'What makes Mandarin Chinese unique?',
            options: [
              "It's the easiest language",
              "It's tonal — tone changes word meaning",
              'It uses only 26 letters',
              'It has no grammar'
            ],
            answer: 1,
            explanation:
              'Mandarin is a tonal language — saying a syllable with different tones can mean completely different things!'
          }
        ]
      },
      {
        id: 'english-international',
        name: 'English',
        subtitle: 'Global Language',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/World_map_of_English_language_proficiency.svg/1024px-World_map_of_English_language_proficiency.svg.png',
        location: '📍 Worldwide',
        keyFacts: [
          { icon: '👥', label: 'Native Speakers', value: '373 million' },
          { icon: '🗣️', label: 'Total Speakers', value: '1.5+ billion worldwide' },
          { icon: '🌍', label: 'Official Language', value: '54 countries' },
          { icon: '🚀', label: 'Global Use', value: 'Business, science, internet, diplomacy' }
        ],
        story:
          "English is the global language of business, science, and the internet. While fewer people speak it natively than Mandarin, English is widely studied and used around the world. It's the official language of 54 countries!",
        memoryTip: '💡 ENGLISH = GLOBAL LANGUAGE! Spoken on every continent!',
        quiz: [
          {
            q: 'How many people worldwide speak English?',
            options: ['500 million', '1 billion', '1.5+ billion', '2 billion'],
            answer: 2,
            explanation:
              'Over 1.5 billion people speak English — making it one of the most widely used languages!'
          },
          {
            q: 'How many countries have English as an official language?',
            options: ['25', '35', '54', '75'],
            answer: 2,
            explanation:
              'English is the official language of 54 countries, from USA to Australia to Nigeria!'
          }
        ]
      },
      {
        id: 'hindi-india',
        name: 'Hindi',
        subtitle: "India's Main Language",
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Chandni_Chowk_from_above.jpg/1024px-Chandni_Chowk_from_above.jpg',
        location: '📍 India',
        keyFacts: [
          { icon: '👥', label: 'Speakers', value: '345 million native speakers' },
          { icon: '🇮🇳', label: 'Country', value: 'Official language of India' },
          { icon: '🔤', label: 'Script', value: 'Devanagari script (different from English!)' },
          { icon: '📝', label: 'History', value: 'Derived from Sanskrit thousands of years ago' }
        ],
        story:
          "Hindi is the official language of India and spoken by over 345 million people. With India's 1.4 billion population, Hindi is one of the most important languages. It uses the Devanagari script which looks completely different from English letters.",
        memoryTip: "💡 HINDI = INDIA'S LANGUAGE! 345 million speakers in India!",
        quiz: [
          {
            q: 'How many native speakers does Hindi have?',
            options: ['150 million', '250 million', '345 million', '500 million'],
            answer: 2,
            explanation:
              'Hindi has 345 million native speakers, making it the third most spoken language!'
          },
          {
            q: 'What script does Hindi use?',
            options: ['Roman alphabet', 'Arabic script', 'Devanagari script', 'Chinese characters'],
            answer: 2,
            explanation:
              'Hindi uses the Devanagari script, which is completely different from English letters!'
          }
        ]
      },
      {
        id: 'spanish-widespread',
        name: 'Spanish',
        subtitle: 'Language of Spain & Americas',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Flag_of_Spain.svg/1024px-Flag_of_Spain.svg.png',
        location: '📍 Spain, Latin America',
        keyFacts: [
          { icon: '👥', label: 'Speakers', value: '474 million native speakers' },
          { icon: '🌍', label: 'Spread', value: 'Official language in 20+ countries' },
          { icon: '🇪🇸', label: 'Originated', value: 'From Castile, Spain' },
          { icon: '📣', label: 'Growth', value: 'Spreading rapidly in USA' }
        ],
        story:
          "Spanish is the second most spoken language by native speakers. It's the official language of Spain and most countries in Latin America (Mexico, Argentina, Colombia, etc.). Spanish is becoming increasingly important in the United States.",
        memoryTip: '💡 SPANISH = 474 MILLION SPEAKERS! Spread across Spain and Americas!',
        quiz: [
          {
            q: 'How many native speakers does Spanish have?',
            options: ['300 million', '400 million', '474 million', '600 million'],
            answer: 2,
            explanation: 'Spanish has 474 million native speakers — the second most after Mandarin!'
          },
          {
            q: 'How many countries have Spanish as an official language?',
            options: ['10+', '15+', '20+', '30+'],
            answer: 2,
            explanation:
              'Spanish is the official language of 20+ countries across Spain and Latin America!'
          }
        ]
      },
      {
        id: 'french-diplomacy',
        name: 'French',
        subtitle: 'Language of Diplomacy',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_France.svg/1024px-Flag_of_France.svg.png',
        location: '📍 France, Africa',
        keyFacts: [
          { icon: '👥', label: 'Speakers', value: '280 million native speakers' },
          { icon: '🌍', label: 'Spread', value: 'Official in 29 countries' },
          { icon: '⚜️', label: 'Prestige', value: 'Language of diplomacy and culture' },
          { icon: '🗽', label: 'Influence', value: 'Used by United Nations and EU' }
        ],
        story:
          "French is the language of diplomacy, culture, and elegance. While fewer speak it natively, French is an official language in 29 countries, mostly in Africa. It's used in international diplomacy and organizations like the UN and EU.",
        memoryTip: '💡 FRENCH = DIPLOMACY LANGUAGE! Used in UN and international meetings!',
        quiz: [
          {
            q: 'How many countries have French as an official language?',
            options: ['10', '20', '29', '40'],
            answer: 2,
            explanation: 'French is the official language of 29 countries, mostly in Africa!'
          },
          {
            q: 'What is French known for being the language of?',
            options: ['War', 'Diplomacy and culture', 'Science', 'Technology'],
            answer: 1,
            explanation:
              'French is renowned as the language of diplomacy, culture, and international relations!'
          }
        ]
      }
    ]
  }
];

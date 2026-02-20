// ============================================================
// PLANET QUEST — Planet & Moon Data + Question Bank
// Facts are randomised on every card open — always something new!
// ============================================================

const PLANETS = [
    {
        id: 'mercury',
        name: 'Mercury',
        emoji: '🪨',
        order: 1,
        type: 'Rocky',
        color: '#9E9E9E', phaser: 0x9E9E9E,
        radius: 15,
        orbitRadius: 82,
        orbitSpeed: 0.0048,
        moons: 0,
        sizeRank: 8,
        badge: '🪨 Rocky Speedster',
        facts: [
            '☀️ Mercury is the closest planet to the Sun — but NOT the hottest!',
            '🌡️ Temperatures swing from -180 °C at night to 430 °C during the day.',
            '🏃 A year on Mercury lasts only 88 Earth days.',
            '🌑 Mercury has no moons and almost no atmosphere.',
            '📏 Mercury is the smallest planet in the solar system.',
            '🌋 Mercury is covered in craters — its surface looks a lot like our Moon.',
            '🔭 Only two spacecraft have ever visited Mercury: Mariner 10 and MESSENGER.',
            '💫 Mercury moves faster than any other planet — up to 59 km per second!',
            '🌌 Mercury has a surprisingly large iron core that makes up 85 % of its radius.',
            '🧲 Despite its tiny size, Mercury has a weak magnetic field — one of only four rocky planets that does.',
        ],
        funFact: [
            'Despite being closest to the Sun, Mercury is NOT the hottest planet — Venus is! Mercury has no atmosphere to trap heat.',
            'A day on Mercury (sunrise to sunrise) lasts 176 Earth days — longer than its own year of 88 days!',
            'Mercury\'s craters are named after artists, musicians, and writers — including Shakespeare, Mozart, and Tolstoy.',
        ],
    },
    {
        id: 'venus',
        name: 'Venus',
        emoji: '🌕',
        order: 2,
        type: 'Rocky',
        color: '#F4C94E', phaser: 0xF4C94E,
        radius: 22,
        orbitRadius: 127,
        orbitSpeed: 0.0037,
        moons: 0,
        sizeRank: 6,
        badge: '🌋 Volcanic Furnace',
        facts: [
            '🔥 Venus is the HOTTEST planet — hotter than Mercury despite being farther from the Sun!',
            '🔄 Venus spins backwards — the Sun rises in the west and sets in the east.',
            '🌩️ A day on Venus (243 Earth days) is longer than its year (225 Earth days).',
            '☁️ Covered in thick clouds of sulfuric acid that reflect 70 % of sunlight.',
            '🌡️ Surface temperature is 465 °C — hot enough to melt lead.',
            '🌋 Venus may have thousands of volcanoes — scientists think some are still active today.',
            '🔭 Venus is the brightest object in the night sky after the Moon.',
            '🛸 The Soviet Venera probes landed on Venus in the 1970s — none survived more than 2 hours.',
            '💨 Winds in Venus\'s upper clouds race at 360 km/h, circling the entire planet in just 4 days.',
            '🧪 Venus\'s atmosphere is 96 % carbon dioxide — a runaway greenhouse effect gone extreme.',
        ],
        funFact: [
            'Venus spins so slowly AND backwards that a day on Venus is longer than a year on Venus!',
            'A human on Venus\'s surface would be simultaneously crushed by pressure, dissolved by acid, and roasted — all at once.',
            'From Earth, Venus looks so bright that it sometimes casts a shadow on a very dark night.',
        ],
    },
    {
        id: 'earth',
        name: 'Earth',
        emoji: '🌍',
        order: 3,
        type: 'Rocky',
        color: '#1E88E5', phaser: 0x1E88E5,
        radius: 23,
        orbitRadius: 175,
        orbitSpeed: 0.003,
        moons: 1,
        sizeRank: 5,
        badge: '🌊 Home Planet',
        facts: [
            '💧 The only planet known to have liquid water on its surface.',
            '🌱 Home to over 8 million species of life!',
            '🌙 Earth has one large Moon that controls the tides.',
            '🛡️ Our magnetic field protects us from dangerous solar winds.',
            '🌍 Over 70 % of Earth\'s surface is covered by water.',
            '⚡ About 100 lightning bolts strike Earth every single second.',
            '🌈 Earth\'s sky looks blue because air scatters blue light in all directions.',
            '🔄 Earth\'s axis is tilted 23.5° — that tilt gives us our four seasons.',
            '🧲 Earth is the densest planet in the solar system.',
            '🏔️ Plate tectonics make Earth unique — no other planet has constantly moving crustal plates.',
        ],
        funFact: [
            'Earth is the only planet not named after a Roman or Greek god.',
            '95 % of Earth\'s ocean floor has never been explored by humans.',
            'Earth orbits the Sun at 107,000 km/h — yet we feel nothing because we\'re all moving together!',
        ],
        moonsList: [
            {
                name: 'Moon',
                emoji: '🌙',
                facts: [
                    '🌑 The same side of the Moon always faces Earth — we never see the "far side" from the ground.',
                    '🌊 The Moon\'s gravity pulls on Earth\'s oceans, creating the tides we experience every day.',
                    '🚶 Only 12 humans have ever walked on the Moon — all during NASA\'s Apollo program (1969–1972).',
                    '💥 The Moon likely formed when a Mars-sized body crashed into the young Earth 4.5 billion years ago.',
                    '🌡️ Moon temperatures swing from 127 °C in sunlight to -173 °C in the dark.',
                    '❄️ Water ice hides in permanently shadowed craters at the Moon\'s poles.',
                    '📏 The Moon is slowly drifting away from Earth — about 3.8 cm per year.',
                    '👣 The Apollo astronauts\' footprints are still on the Moon — no wind to erase them.',
                ],
                funFact: [
                    'The Moon is moving away from Earth at the same rate your fingernails grow!',
                    'Without the Moon stabilising Earth\'s tilt, our planet\'s seasons would be chaotic and extreme.',
                ],
            }
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        emoji: '🔴',
        order: 4,
        type: 'Rocky',
        color: '#D84315', phaser: 0xD84315,
        radius: 18,
        orbitRadius: 230,
        orbitSpeed: 0.0024,
        moons: 2,
        sizeRank: 7,
        badge: '🏜️ The Red Planet',
        facts: [
            '🏔️ Home to Olympus Mons — the tallest volcano in the solar system, 3× the height of Everest!',
            '🔴 Mars is red because of iron oxide (rust) all over its surface.',
            '🌙 Mars has two tiny moons: Phobos and Deimos.',
            '🤖 NASA\'s Curiosity and Perseverance rovers are exploring Mars right now.',
            '🌪️ Mars can have global dust storms that cover the entire planet for months.',
            '💧 Mars once had flowing rivers and lakes — ancient riverbeds are still visible today.',
            '🌅 Sunsets on Mars are blue because the dust scatters light differently than on Earth.',
            '🌡️ Average temperature on Mars is -60 °C, but near the equator in summer it can hit 20 °C.',
            '🚁 NASA\'s Ingenuity helicopter made the first powered flight on another planet in 2021.',
            '🌌 Mars\'s canyon Valles Marineris is 4,000 km long — as wide as the entire USA.',
        ],
        funFact: [
            'Olympus Mons on Mars is so wide you could drive around its base for 3 days at highway speed.',
            'Mars has no global magnetic field — solar wind gradually stripped away its thick atmosphere long ago.',
            'Over 50 missions have been sent to Mars, but only about half have succeeded — earning it the nickname "the graveyard of spacecraft."',
        ],
        moonsList: [
            {
                name: 'Phobos',
                emoji: '🪨',
                facts: [
                    '🛸 Phobos orbits Mars so fast it completes one lap in just 7 hours 39 minutes — rising in the west and setting in the east!',
                    '💥 Phobos is slowly spiralling inward and will crash into Mars or break apart into a ring in ~50 million years.',
                    '🪨 Phobos is one of the darkest objects in the solar system — as black as coal.',
                    '⚡ Its giant Stickney crater is nearly half the moon\'s diameter — the impact almost shattered Phobos.',
                    '🔭 Phobos is only 27 km across and looks like a lumpy potato.',
                    '🌑 From Mars\'s surface, Phobos crosses the sky and disappears into shadow every night.',
                ],
                funFact: [
                    'Phobos orbits Mars faster than Mars rotates — so it rises in the west, not the east!',
                    'In about 50 million years, Phobos will break apart and give Mars a ring like Saturn\'s.',
                ],
            },
            {
                name: 'Deimos',
                emoji: '🪨',
                facts: [
                    '🌟 Deimos is the smallest known moon of any planet — only about 12 km across.',
                    '⏳ From Mars\'s surface, Deimos drifts so slowly it takes nearly 3 days to cross the sky.',
                    '🪨 Deimos has a smoother surface than Phobos because craters are filled with fine dust.',
                    '🔭 From Mars, Deimos looks like a very bright star — too small to appear as a disk.',
                    '💨 Deimos\'s gravity is so weak you could throw a baseball into orbit around it.',
                    '🚀 A future Japanese mission (MMX) plans to visit both Martian moons in the late 2020s.',
                ],
                funFact: [
                    'Deimos\'s gravity is so weak that throwing a baseball at a fast pitch could launch it into space!',
                    'Phobos and Deimos are named after the Greek gods of Fear and Dread — sons of Ares (Mars).',
                ],
            }
        ]
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        emoji: '🪐',
        order: 5,
        type: 'Gas Giant',
        color: '#C4813B', phaser: 0xC4813B,
        radius: 48,
        orbitRadius: 318,
        orbitSpeed: 0.0013,
        moons: 95,
        sizeRank: 1,
        badge: '👑 King of Planets',
        facts: [
            '🏆 Jupiter is the LARGEST planet — all other planets could fit inside it!',
            '🌀 The Great Red Spot is a storm that has raged for over 350 years.',
            '🌙 Jupiter has 95 known moons — more than any other planet!',
            '⚡ Jupiter has the shortest day — just 10 hours, despite being the biggest planet.',
            '🛡️ Jupiter\'s gravity pulls in asteroids and comets that might otherwise hit Earth.',
            '⚡ Jupiter has the most powerful lightning in the solar system — 10× stronger than Earth\'s.',
            '🧲 Jupiter\'s magnetic field is 20,000× stronger than Earth\'s.',
            '🌡️ Jupiter\'s core may be 24,000 °C — hotter than the Sun\'s surface!',
            '💎 Deep inside Jupiter, hydrogen is squeezed so hard it conducts electricity like metal.',
            '🔭 Galileo discovered Jupiter\'s four largest moons in 1610, proving not everything orbits Earth.',
        ],
        funFact: [
            '1,300 Earths could fit inside Jupiter — it\'s more than twice as massive as all other planets combined!',
            'Jupiter\'s radiation belts are so powerful they would give a human a lethal dose in just minutes.',
            'Jupiter spins so fast that its equator bulges outward — the planet is noticeably flatter at the poles.',
        ],
        moonsList: [
            {
                name: 'Io',
                emoji: '🌋',
                facts: [
                    '🌋 Io is the most volcanically active world in the solar system — with over 400 active volcanoes!',
                    '💛 Io\'s surface is yellow, orange, red, and black because of different types of sulfur from its volcanoes.',
                    '🔥 Io\'s volcanoes shoot plumes up to 500 km into space — 8× higher than Mount Everest.',
                    '⚡ Io is heated by tidal forces from Jupiter constantly squishing and stretching its interior.',
                    '🌑 Io has almost no craters — constant lava flows resurface it so quickly that craters are buried.',
                    '🔭 Io was discovered by Galileo in 1610 — active volcanoes were spotted by Voyager 1 in 1979.',
                ],
                funFact: [
                    'Io is heated by gravity, not the Sun — Jupiter\'s tidal squeezing generates more heat than all of Earth\'s volcanoes combined!',
                    'Io loses about 1 tonne of material into space every second from its volcanic plumes.',
                ],
            },
            {
                name: 'Europa',
                emoji: '🧊',
                facts: [
                    '🌊 Europa has a liquid water ocean under its ice — with twice as much water as all Earth\'s oceans!',
                    '🧊 Europa\'s icy shell is 10–30 km thick and covered in reddish cracks and ridges.',
                    '👽 Europa is one of the best places to search for alien life in the solar system.',
                    '🚀 NASA\'s Europa Clipper spacecraft launched in 2024 and is heading to study Europa.',
                    '💥 Tidal forces constantly crack and shift Europa\'s ice, creating jumbled "chaos terrain."',
                    '🌡️ Europa\'s surface is -160 °C, but the underground ocean may be warmed by hydrothermal vents.',
                ],
                funFact: [
                    'Europa\'s underground ocean has been liquid for billions of years — life has had a very long time to develop there!',
                    'If you could drain Europa\'s ocean, the water would cover the moon to a depth of 100 km.',
                ],
            },
            {
                name: 'Ganymede',
                emoji: '🌑',
                facts: [
                    '🏆 Ganymede is the largest moon in the solar system — bigger than the planet Mercury!',
                    '🧲 Ganymede is the only moon with its own magnetic field, creating auroras at its poles.',
                    '🌊 Ganymede likely has a vast underground saltwater ocean with more water than all of Earth.',
                    '🔭 Ganymede has ancient dark cratered terrain AND younger grooved bright terrain side by side.',
                    '🚀 ESA\'s JUICE spacecraft is on its way to orbit Ganymede — first spacecraft to orbit another moon.',
                    '🌑 If Ganymede orbited the Sun instead of Jupiter, it would qualify as a planet.',
                ],
                funFact: [
                    'Ganymede is bigger than Mercury but less than half its mass — because it\'s made of lighter ice rather than rock and metal.',
                    'Ganymede\'s magnetic auroras glow in ultraviolet light — detectable from the Hubble Space Telescope.',
                ],
            },
            {
                name: 'Callisto',
                emoji: '🌑',
                facts: [
                    '💥 Callisto is the most heavily cratered object in the solar system.',
                    '🌊 Despite its battered surface, Callisto may have a hidden liquid water ocean.',
                    '🧊 Callisto sits outside Jupiter\'s main radiation belts — making it the safest Galilean moon for future explorers.',
                    '🔭 Callisto\'s largest impact, Valhalla, created rings of ripples 3,000 km across.',
                    '🌑 Callisto barely has any internal heat — it\'s a jumbled mix of ice and rock all the way through.',
                    '🚀 The Galileo spacecraft discovered hints of Callisto\'s subsurface ocean in the 1990s.',
                ],
                funFact: [
                    'Callisto\'s surface is the same age as the solar system — 4 billion years of craters, perfectly preserved.',
                    'Callisto never "differentiated" — its ice and rock never separated into layers, unlike Earth\'s core and mantle.',
                ],
            }
        ]
    },
    {
        id: 'saturn',
        name: 'Saturn',
        emoji: '🪐',
        order: 6,
        type: 'Gas Giant',
        color: '#E8D5A3', phaser: 0xE8D5A3,
        radius: 41,
        orbitRadius: 408,
        orbitSpeed: 0.00097,
        moons: 146,
        sizeRank: 2,
        badge: '💫 Lord of the Rings',
        hasRings: true,
        facts: [
            '💍 Saturn\'s rings are made of billions of chunks of ice and rock.',
            '🏊 Saturn is less dense than water — it would float in a giant ocean!',
            '🌙 Saturn has 146 known moons — the most of any planet.',
            '💨 Winds on Saturn reach 1,800 km/h — five times faster than Earth\'s strongest hurricanes.',
            '🌀 Saturn has a giant six-sided storm at its north pole that has lasted for decades.',
            '🔭 Galileo saw Saturn\'s rings in 1610 but thought Saturn had "ears."',
            '🚀 The Cassini spacecraft orbited Saturn for 13 years before diving into the atmosphere in 2017.',
            '💎 Saturn\'s rings may be only 10–100 million years old — dinosaurs existed before the rings did!',
            '🌡️ Saturn radiates more heat into space than it receives from the Sun.',
            '🎶 The rings create "ring rain" — particles drizzle into Saturn\'s atmosphere along magnetic field lines.',
        ],
        funFact: [
            'Saturn is the least dense planet — it would float if you could find an ocean big enough!',
            'Saturn\'s rings span 282,000 km across but are only 10 metres to 1 km thick — like a sheet of paper scaled to the size of a football field.',
            'Saturn\'s rings are slowly disappearing — at the current rate they\'ll be gone in 100 million years.',
        ],
        moonsList: [
            {
                name: 'Titan',
                emoji: '🌫️',
                facts: [
                    '🌧️ Titan is the only moon with a thick atmosphere — 1.5× the pressure of Earth\'s!',
                    '🏖️ Titan has lakes and seas of liquid methane and ethane — real rain and rivers, but made of methane.',
                    '❄️ At -179 °C, water ice is as hard as rock on Titan — methane does what water does on Earth.',
                    '🚀 NASA\'s Dragonfly helicopter drone is planned to fly across Titan\'s surface in the 2030s.',
                    '🌫️ Titan has thick orange smog made of complex organic molecules called tholins.',
                    '🌊 Titan may also have a liquid water ocean deep underground beneath the ice shell.',
                ],
                funFact: [
                    'Titan is the only place besides Earth with liquid on its surface — just methane instead of water.',
                    'You could put on a warm coat and a simple oxygen mask and walk around on Titan\'s surface — its air is breathable pressure-wise!',
                ],
            },
            {
                name: 'Enceladus',
                emoji: '💧',
                facts: [
                    '💦 Enceladus shoots giant geysers of water ice 1,400 km/h into space from its south pole.',
                    '🌊 Cassini flew through the geysers and found water, salt, organic molecules, and hydrogen — ingredients for life!',
                    '🧊 Enceladus is only 504 km across — smaller than Great Britain — but is a top target in the search for life.',
                    '💡 The geysers from Enceladus actually feed Saturn\'s E ring.',
                    '🌡️ Hydrothermal vents on Enceladus\'s ocean floor actively heat the water — just like on Earth\'s deep ocean.',
                    '🔭 Enceladus has "tiger stripe" fractures at its south pole — 130 km long warm cracks where plumes escape.',
                ],
                funFact: [
                    'Enceladus is smaller than Arizona yet has a warm subsurface ocean that may harbour life right now.',
                    'The geysers of Enceladus were discovered completely by accident when Cassini noticed its orbit was slightly off due to the recoil from the plumes.',
                ],
            },
            {
                name: 'Mimas',
                emoji: '💀',
                facts: [
                    '💀 Mimas looks almost exactly like the Death Star from Star Wars — complete with a giant central crater.',
                    '💥 The Herschel crater impact was so powerful it cracked the opposite side of Mimas.',
                    '🌀 Mimas\'s gravity creates the Cassini Division — a gap in Saturn\'s rings.',
                    '🌡️ Mimas has a Pac-Man shaped warm region that puzzles scientists.',
                    '🔭 Recent analysis suggests Mimas may have a hidden liquid water ocean — making the Death Star moon an ocean world!',
                    '🧊 Mimas is one of the most geologically inactive moons we know of.',
                ],
                funFact: [
                    'The resemblance to the Death Star is purely coincidental — Mimas was discovered in 1789, nearly 200 years before Star Wars!',
                    'Mimas may be the youngest known ocean moon — its ocean might have formed only 25 million years ago.',
                ],
            },
            {
                name: 'Rhea',
                emoji: '🌑',
                facts: [
                    '🧊 Rhea is Saturn\'s second-largest moon and is made of about 75 % water ice.',
                    '💥 Rhea\'s surface is one of the most heavily cratered in the solar system.',
                    '🌑 Scientists once thought Rhea might have its own faint ring system — which would have been the first moon with rings.',
                    '🔭 Rhea has bright icy cliffs and fractures that look like white streaks across its surface.',
                    '❄️ Surface temperatures on Rhea\'s dark side reach -220 °C.',
                    '🚀 Cassini detected oxygen and CO₂ molecules on Rhea\'s icy surface — created by Saturn\'s radiation.',
                ],
                funFact: [
                    'Rhea may have the thinnest exosphere (near-atmosphere) of any moon, made purely of particles knocked off by radiation.',
                    'If the rumoured ring around Rhea is real, it would be the first moon with a ring system ever discovered.',
                ],
            }
        ]
    },
    {
        id: 'uranus',
        name: 'Uranus',
        emoji: '🔵',
        order: 7,
        type: 'Ice Giant',
        color: '#7FFFD4', phaser: 0x7FFFD4,
        radius: 31,
        orbitRadius: 483,
        orbitSpeed: 0.00068,
        moons: 27,
        sizeRank: 3,
        badge: '🌀 Sideways Spinner',
        facts: [
            '↩️ Uranus spins on its SIDE — its axis is tilted 98 degrees!',
            '🥶 Uranus is the coldest planet at -224 °C.',
            '💎 It may rain diamonds inside Uranus — extreme pressure squeezes carbon into diamonds.',
            '🔭 Uranus was the first planet discovered with a telescope (1781).',
            '🌊 It\'s an ice giant — its interior is hot, dense slush of water, methane, and ammonia.',
            '🌀 Each pole gets 42 years of continuous sunlight then 42 years of total darkness.',
            '🌬️ Uranus has 13 faint rings — discovered by accident in 1977 when they blocked a background star.',
            '🔵 Its blue-green colour comes from methane gas that absorbs red light.',
            '🚀 Only Voyager 2 has visited Uranus — briefly in 1986 — and found 10 new moons and 2 new rings.',
            '🧲 Uranus has a bizarre magnetic field tilted 59° from its axis AND offset from the planet\'s centre.',
        ],
        funFact: [
            'Uranus rolls around the Sun like a bowling ball — one pole faces the Sun for 42 years straight!',
            'Uranus\'s 27 moons are all named after characters from Shakespeare and Alexander Pope — Titania, Oberon, Miranda, and more.',
            'Uranus appears mysteriously smooth and featureless compared to other giant planets — scientists call it the "boring" ice giant.',
        ],
        moonsList: [
            {
                name: 'Miranda',
                emoji: '🏔️',
                facts: [
                    '🏔️ Miranda has the tallest known cliff in the solar system — Verona Rupes, 20 km high. Falling would take 12 minutes!',
                    '🧩 Miranda looks like it was smashed apart and put back together — its terrain is a bizarre patchwork.',
                    '🔭 Miranda was only photographed once — during Voyager 2\'s brief 1986 flyby.',
                    '💥 One theory says Miranda was shattered by an impact and reassembled in a jumbled way.',
                    '🌑 Miranda is only 470 km across — about the size of Arizona — making its giant cliff even more impressive.',
                    '❄️ Miranda experiences stronger tidal forces from Uranus which may have driven its unusual geology.',
                ],
                funFact: [
                    'If you jumped off Verona Rupes cliff on Miranda, the fall would last 12 minutes before you hit the ground — gently, since gravity is so weak!',
                    'Miranda is one of the most geologically complex small worlds ever discovered, and scientists still don\'t fully understand it.',
                ],
            },
            {
                name: 'Ariel',
                emoji: '🌑',
                facts: [
                    '🌋 Ariel has the youngest and brightest surface of Uranus\'s major moons — resurfaced by geological activity.',
                    '🏔️ Ariel has enormous canyons hundreds of kilometres long where the crust pulled apart.',
                    '🌡️ Ariel\'s surface is about -213 °C and is made of water ice mixed with dry ice.',
                    '💡 Ariel is bright because fresh icy material has covered up the older darker surface.',
                    '🔭 Voyager 2 only captured about 35 % of Ariel\'s surface — most of it is still unmapped.',
                    '🌑 Ariel has few large craters — geological resurfacing has buried much of its ancient impact history.',
                ],
                funFact: [
                    'Ariel is named after a spirit from Shakespeare\'s "The Tempest" and Alexander Pope\'s "The Rape of the Lock."',
                    'Ariel is the most geologically active of Uranus\'s large moons — its smooth valleys look like they were carved by flowing icy material.',
                ],
            }
        ]
    },
    {
        id: 'neptune',
        name: 'Neptune',
        emoji: '🔷',
        order: 8,
        type: 'Ice Giant',
        color: '#1565C0', phaser: 0x1565C0,
        radius: 29,
        orbitRadius: 550,
        orbitSpeed: 0.00054,
        moons: 16,
        sizeRank: 4,
        badge: '🌪️ Windy Giant',
        facts: [
            '💨 Neptune has the strongest winds in the solar system — 2,100 km/h, faster than sound!',
            '🌊 Neptune was predicted mathematically BEFORE it was seen through a telescope.',
            '🔵 Its blue colour comes from methane gas in the atmosphere.',
            '⏱️ One year on Neptune = 165 Earth years.',
            '🌑 Its largest moon Triton orbits backwards!',
            '💎 Like Uranus, Neptune may have "diamond rain" deep inside.',
            '🚀 Only Voyager 2 has visited Neptune — its images took 4 hours to reach Earth!',
            '🌡️ Neptune gives off more than twice as much heat as it receives from the Sun.',
            '🔭 Galileo observed Neptune in 1613 but mistook it for a star — he could have discovered it 234 years early!',
            '🪐 Neptune\'s rings have thick clumpy sections called arcs, held in place by small "shepherd moons."',
        ],
        funFact: [
            'Neptune was discovered through mathematics — scientists calculated where it must be from Uranus\'s wobbly orbit, then looked there and found it!',
            'Neptune has never completed a full orbit since it was officially discovered in 1846 — one Neptune year is 165 Earth years.',
            'Neptune radiates so much internal heat that its storms are powered more by this internal energy than by the distant Sun.',
        ],
        moonsList: [
            {
                name: 'Triton',
                emoji: '🌑',
                facts: [
                    '❄️ Triton is the coldest measured surface in the solar system — -235 °C, just 38° above absolute zero.',
                    '🔄 Triton orbits Neptune backwards — the only large moon in the solar system to do so.',
                    '🌋 Triton has active geysers that shoot dark nitrogen gas 8 km into space.',
                    '💥 Triton is slowly spiralling inward — in 3.6 billion years it will be torn apart into a ring around Neptune.',
                    '🌡️ Triton has a thin nitrogen atmosphere with clouds of nitrogen ice.',
                    '🔭 Voyager 2 found bizarre "cantaloupe terrain" on Triton — unlike anything seen elsewhere.',
                ],
                funFact: [
                    'Triton orbits backwards because it was captured from the outer solar system — it used to be a free-floating Kuiper Belt object.',
                    'Triton\'s geysers are powered by sunlight — not internal heat — nitrogen ice warms, turns to gas, and explodes through vents in the surface.',
                ],
            },
            {
                name: 'Nereid',
                emoji: '🌀',
                facts: [
                    '🌀 Nereid has one of the most elliptical orbits of any moon — ranging from 1.4 million to 9.6 million km from Neptune.',
                    '🎲 Nereid tumbles chaotically as it orbits — spinning in an irregular, unpredictable way.',
                    '💥 Nereid\'s wild orbit was likely caused when Neptune captured Triton and flung Nereid away.',
                    '🔭 Nereid was discovered in 1949 from Earth, but Voyager 2 only saw it from 4.7 million km away.',
                    '🌑 Nereid changes brightness unpredictably because its chaotic tumbling reveals different parts of its surface.',
                    '🚀 No spacecraft has ever closely approached Nereid — it\'s one of the least-studied moons in the solar system.',
                ],
                funFact: [
                    'Nereid\'s orbit is so elliptical that it moves nearly 7× faster when close to Neptune than when far away.',
                    'Nereid was discovered just 13 years after Triton — yet we know almost nothing about its surface.',
                ],
            }
        ]
    }
];

// ── Bonus objects ──────────────────────────────────────────────
const BONUS_OBJECTS = [
    {
        id: 'asteroid_belt',
        name: 'Asteroid Belt',
        emoji: '🪨',
        color: '#A09080', phaser: 0xA09080,
        orbitRadius: 275,
        facts: [
            '🪨 The Asteroid Belt sits between Mars and Jupiter.',
            '🌌 It contains millions of rocky objects and at least one dwarf planet — Ceres.',
            '🛸 Despite how movies show it, the asteroid belt is mostly empty space — spacecraft fly through it easily.',
            '💥 Ceres is the largest object in the asteroid belt — 940 km across and so round it\'s called a dwarf planet.',
            '🔭 The total mass of all asteroids in the belt combined is less than 4 % of Earth\'s Moon.',
            '⛏️ Future missions may mine asteroids — some are rich in iron, nickel, and even platinum.',
        ],
        funFact: [
            'If you collected all the asteroids in the belt into one ball, it would be smaller than our Moon.',
            'Some asteroids have their own tiny moons — we\'ve discovered over 150 asteroid-moon pairs!',
        ],
    },
    {
        id: 'pluto',
        name: 'Pluto',
        emoji: '❄️',
        color: '#C8A882', phaser: 0xC8A882,
        orbitRadius: 700,
        facts: [
            '❄️ Pluto was reclassified as a "dwarf planet" in 2006.',
            '🌙 Pluto\'s moon Charon is so large they orbit each other — making them a double-planet system.',
            '⏱️ One year on Pluto = 248 Earth years.',
            '💙 NASA\'s New Horizons revealed a heart-shaped nitrogen ice plain on Pluto\'s surface in 2015.',
            '🌑 Pluto is smaller than Earth\'s Moon — its diameter is only 2,377 km.',
            '❄️ Pluto has mountains of water ice as tall as the Rockies, surrounded by plains of nitrogen ice.',
        ],
        funFact: [
            'Pluto has a heart! The famous "Tombaugh Regio" heart shape is a vast plain of frozen nitrogen gas.',
            'Pluto was discovered in 1930 by a 23-year-old astronomer named Clyde Tombaugh on his first job!',
        ],
    }
];

// ── The Sun ────────────────────────────────────────────────────
const SUN = {
    id: 'sun',
    name: 'The Sun',
    emoji: '☀️',
    color: '#FDD835', phaser: 0xFDD835,
    facts: [
        '⭐ The Sun is a star — a giant ball of hot plasma held together by its own gravity.',
        '🔥 The surface is 5,500 °C — but the corona (outer atmosphere) is over 1 million °C.',
        '🌍 The Sun contains 99.8 % of all the mass in the solar system.',
        '💡 Light from the Sun takes exactly 8 minutes 20 seconds to reach Earth.',
        '🌟 The Sun will shine for another 5 billion years before swelling into a red giant.',
        '💥 The Sun releases energy through nuclear fusion — smashing hydrogen atoms together to make helium.',
        '🌬️ The solar wind — streams of charged particles — travels at 400–800 km/s through the solar system.',
        '🌈 Auroras (northern/southern lights) happen when solar wind particles hit Earth\'s magnetic field.',
        '🔭 The Sun is so large that 1 million Earths could fit inside it.',
        '🌑 Sunspots are cooler, darker patches on the Sun\'s surface — caused by magnetic field disturbances.',
        '⚡ The Sun ejects massive solar flares that can disrupt GPS and power grids on Earth.',
        '💛 The Sun burns 620 million tonnes of hydrogen every single second.',
    ],
    funFact: [
        'One million Earths could fit inside the Sun, and it burns 620 million tonnes of hydrogen every second!',
        'The energy created in the Sun\'s core takes 100,000 years to reach the surface — but then just 8 minutes to travel to Earth.',
        'The Sun\'s corona is mysteriously hotter than its surface — scientists still don\'t fully understand why.',
    ],
};

// ── Question Bank ──────────────────────────────────────────────
const QUESTIONS = [
    // ── LEVEL 1: Order ────────────────────────────────────────
    { id:'q_order_1', level:1, category:'Order',
      text:'Which planet is closest to the Sun?',
      hint:'It\'s also the smallest planet!',
      type:'click', answer:'mercury',
      successMsg:'Mercury orbits the Sun in just 88 days — the fastest planet!' },
    { id:'q_order_2', level:1, category:'Order',
      text:'Which planet do we live on?',
      hint:'It\'s the blue-green one with oceans!',
      type:'click', answer:'earth',
      successMsg:'Earth is the 3rd planet from the Sun — our home!' },
    { id:'q_order_3', level:1, category:'Order',
      text:'Which planet is 4th from the Sun?',
      hint:'It\'s called the Red Planet!',
      type:'click', answer:'mars',
      successMsg:'Mars is 4th! Its red colour comes from iron rust on its surface.' },
    { id:'q_order_4', level:1, category:'Order',
      text:'Click the planet that comes right after Earth, moving away from the Sun.',
      hint:'"My Very Educated Mother Just Served Us Nachos" — what comes after E?',
      type:'click', answer:'mars',
      successMsg:'The order is: Mercury, Venus, Earth, MARS, Jupiter…' },
    { id:'q_order_5', level:1, category:'Order',
      text:'Which is the LAST and farthest planet from the Sun?',
      hint:'Named after the Roman god of the sea.',
      type:'click', answer:'neptune',
      successMsg:'Neptune is the 8th and farthest planet — 4.5 billion km from the Sun!' },
    { id:'q_order_6', level:1, category:'Order',
      text:'Which planet is 2nd from the Sun?',
      hint:'It\'s the hottest planet, despite not being closest!',
      type:'click', answer:'venus',
      successMsg:'Venus is 2nd! Its thick atmosphere traps heat like a pressure cooker.' },
    { id:'q_order_7', level:1, category:'Order',
      text:'Which planet is between Saturn and Neptune?',
      hint:'It spins completely on its side!',
      type:'click', answer:'uranus',
      successMsg:'Uranus is 7th — sandwiched between Saturn and Neptune!' },

    // ── LEVEL 2: Type ─────────────────────────────────────────
    { id:'q_type_1', level:2, category:'Type',
      text:'Which of these is a GAS GIANT?',
      hint:'Gas giants are huge and mostly made of hydrogen and helium.',
      type:'choice', choices:['jupiter','mars','mercury','earth'], answer:'jupiter',
      successMsg:'Jupiter is the king of gas giants — over 1,300 Earths could fit inside!' },
    { id:'q_type_2', level:2, category:'Type',
      text:'Click the LARGEST gas giant in our solar system.',
      hint:'It\'s the biggest planet overall — and has a giant storm.',
      type:'click', answer:'jupiter',
      successMsg:'Jupiter is a gas giant AND the biggest planet in the solar system!' },
    { id:'q_type_3', level:2, category:'Type',
      text:'Which of these is a ROCKY planet (not a gas giant)?',
      hint:'Rocky planets are smaller and closer to the Sun.',
      type:'choice', choices:['mars','saturn','neptune','uranus'], answer:'mars',
      successMsg:'Mars is rocky! The 4 inner planets — Mercury, Venus, Earth, Mars — are all rocky.' },
    { id:'q_type_4', level:2, category:'Type',
      text:'Which planet is an ICE GIANT?',
      hint:'It\'s the sideways-spinning one made of icy materials.',
      type:'choice', choices:['uranus','jupiter','venus','mars'], answer:'uranus',
      successMsg:'Uranus is an ice giant — its interior is filled with icy water, methane, and ammonia!' },
    { id:'q_type_5', level:2, category:'Type',
      text:'Click the gas giant famous for its spectacular rings.',
      hint:'Look for the planet with beautiful rings around it!',
      type:'click', answer:'saturn',
      successMsg:'Saturn is a gas giant famous for its spectacular ring system!' },

    // ── LEVEL 3: Size ─────────────────────────────────────────
    { id:'q_size_1', level:3, category:'Size',
      text:'Which is the LARGEST planet in the solar system?',
      hint:'Its famous storm (the Great Red Spot) is bigger than Earth!',
      type:'click', answer:'jupiter',
      successMsg:'1,300 Earths could fit inside Jupiter — it\'s a true giant!' },
    { id:'q_size_2', level:3, category:'Size',
      text:'Which is the SMALLEST planet in the solar system?',
      hint:'It\'s also the closest to the Sun.',
      type:'click', answer:'mercury',
      successMsg:'Mercury is smaller than Earth\'s Moon in diameter!' },
    { id:'q_size_3', level:3, category:'Size',
      text:'Which is the 2nd LARGEST planet?',
      hint:'It\'s known for its beautiful ring system.',
      type:'click', answer:'saturn',
      successMsg:'Saturn is 2nd largest — but the least dense! It would float on water.' },
    { id:'q_size_4', level:3, category:'Size',
      text:'Which planet is bigger: Uranus or Neptune?',
      hint:'The one closer to Saturn is slightly bigger.',
      type:'choice', choices:['uranus','neptune'], answer:'uranus',
      successMsg:'Uranus is slightly bigger than Neptune, but Neptune is more massive!' },

    // ── LEVEL 4: Features ─────────────────────────────────────
    { id:'q_feat_1', level:4, category:'Features',
      text:'Which planet has the most SPECTACULAR rings?',
      hint:'Galileo first spotted them in 1610!',
      type:'click', answer:'saturn',
      successMsg:'Saturn\'s rings are made of billions of ice and rock chunks!' },
    { id:'q_feat_2', level:4, category:'Features',
      text:'Which is the HOTTEST planet in the solar system?',
      hint:'It\'s NOT the closest to the Sun! Its thick atmosphere traps heat.',
      type:'click', answer:'venus',
      successMsg:'Venus is 465 °C — hot enough to melt lead! Its CO₂ atmosphere traps all the heat.' },
    { id:'q_feat_3', level:4, category:'Features',
      text:'Which planet spins SIDEWAYS on its axis?',
      hint:'It\'s an ice giant — one of the outer planets.',
      type:'click', answer:'uranus',
      successMsg:'Uranus is tilted 98°! It rolls around the Sun like a bowling ball.' },
    { id:'q_feat_4', level:4, category:'Features',
      text:'Which planet has the Great Red Spot — a storm larger than Earth?',
      hint:'It\'s the biggest planet with a distinctive banded appearance.',
      type:'click', answer:'jupiter',
      successMsg:'The Great Red Spot on Jupiter has been raging for over 350 years!' },
    { id:'q_feat_5', level:4, category:'Features',
      text:'Which planet has the STRONGEST winds in the solar system?',
      hint:'Named after the Roman god of the sea.',
      type:'click', answer:'neptune',
      successMsg:'Neptune\'s winds reach 2,100 km/h — faster than a fighter jet!' },
    { id:'q_feat_6', level:4, category:'Features',
      text:'Which planet is called the RED PLANET?',
      hint:'It has iron oxide (rust) covering its surface.',
      type:'click', answer:'mars',
      successMsg:'Mars is red because of iron rust! It also has the tallest volcano in the solar system.' },
    { id:'q_feat_7', level:4, category:'Features',
      text:'Which planet could FLOAT on water if there was a big enough ocean?',
      hint:'It\'s the least dense planet — mostly made of gas.',
      type:'choice', choices:['saturn','jupiter','uranus','neptune'], answer:'saturn',
      successMsg:'Saturn is less dense than water — it would float in a giant bathtub!' },
    { id:'q_feat_8', level:4, category:'Features',
      text:'Which planet has the COLDEST recorded temperature at -224 °C?',
      hint:'It\'s an ice giant that spins sideways.',
      type:'choice', choices:['uranus','neptune','saturn','jupiter'], answer:'uranus',
      successMsg:'Uranus is the coldest planet — even colder than Neptune!' },

    // ── LEVEL 5: Moons ────────────────────────────────────────
    { id:'q_moon_1', level:5, category:'Moons',
      text:'Which planet has the MOST known moons?',
      hint:'It has 146 known moons — more than any other!',
      type:'choice', choices:['saturn','jupiter','uranus','neptune'], answer:'saturn',
      successMsg:'Saturn has 146 known moons! Jupiter is close behind with 95.' },
    { id:'q_moon_2', level:5, category:'Moons',
      text:'Which planet has only ONE moon?',
      hint:'We live on it! Our moon is called Luna.',
      type:'click', answer:'earth',
      successMsg:'Earth has exactly 1 moon. It controls our tides and lights up the night sky!' },
    { id:'q_moon_3', level:5, category:'Moons',
      text:'Which inner planet has TWO small moons called Phobos and Deimos?',
      hint:'It\'s the planet where NASA has rovers right now!',
      type:'click', answer:'mars',
      successMsg:'Mars has two tiny moons — Phobos and Deimos! They look like captured asteroids.' },
    { id:'q_moon_4', level:5, category:'Moons',
      text:'Which two inner planets have NO moons at all?',
      hint:'They are the first two planets from the Sun.',
      type:'choice', choices:['Mercury & Venus','Venus & Earth','Mercury & Mars','Earth & Mars'],
      answer:'Mercury & Venus',
      successMsg:'Mercury and Venus are the only planets with zero moons!' },
    { id:'q_moon_5', level:5, category:'Moons',
      text:'Jupiter\'s moon Europa may have liquid water. What does that suggest?',
      hint:'Think about what\'s needed for life on Earth…',
      type:'choice',
      choices:['It might support life!','It has volcanoes','It has an atmosphere','It has rings'],
      answer:'It might support life!',
      successMsg:'Europa\'s underground ocean may be the best place to search for alien life in the solar system!' },

    // ── LEVEL 6: Fun Facts ────────────────────────────────────
    { id:'q_fun_1', level:6, category:'Fun Facts',
      text:'Which planet was discovered using MATH before anyone saw it?',
      hint:'Scientists noticed Uranus was being pulled by something invisible…',
      type:'click', answer:'neptune',
      successMsg:'Neptune was predicted by mathematics in 1846 before anyone saw it!' },
    { id:'q_fun_2', level:6, category:'Fun Facts',
      text:'It may RAIN DIAMONDS inside which planet?',
      hint:'It\'s an ice giant that spins sideways.',
      type:'click', answer:'uranus',
      successMsg:'The pressure inside Uranus may squeeze carbon atoms into actual diamonds!' },
    { id:'q_fun_3', level:6, category:'Fun Facts',
      text:'On which planet does the Sun rise in the WEST?',
      hint:'It spins backwards compared to most planets!',
      type:'click', answer:'venus',
      successMsg:'Venus spins backwards! So the Sun rises in the west and sets in the east.' },
    { id:'q_fun_4', level:6, category:'Fun Facts',
      text:'Which planet has the SHORTEST day — just 10 hours long?',
      hint:'It\'s the largest planet and spins very fast!',
      type:'click', answer:'jupiter',
      successMsg:'Jupiter spins so fast its day is only 10 hours — despite being the biggest planet!' },
    { id:'q_fun_5', level:6, category:'Fun Facts',
      text:'On which planet is Olympus Mons — the tallest volcano in the solar system?',
      hint:'It\'s 3 times taller than Mount Everest!',
      type:'click', answer:'mars',
      successMsg:'Olympus Mons on Mars is 22 km tall — 3× the height of Mount Everest!' },
    { id:'q_fun_6', level:6, category:'Fun Facts',
      text:'Which planet takes 165 Earth years to complete ONE orbit of the Sun?',
      hint:'It\'s the outermost planet — very far from the Sun!',
      type:'click', answer:'neptune',
      successMsg:'Neptune takes 165 years per orbit — it\'s completed less than one orbit since it was discovered!' },
];

const QUESTION_LEVELS = {
    1: QUESTIONS.filter(q => q.level === 1),
    2: QUESTIONS.filter(q => q.level === 2),
    3: QUESTIONS.filter(q => q.level === 3),
    4: QUESTIONS.filter(q => q.level === 4),
    5: QUESTIONS.filter(q => q.level === 5),
    6: QUESTIONS.filter(q => q.level === 6),
};

const CATEGORY_COLORS = {
    'Order':     { bg: 0x1565C0, text: '#90CAF9', label: '🔢 Order' },
    'Type':      { bg: 0x2E7D32, text: '#A5D6A7', label: '🧪 Type' },
    'Size':      { bg: 0x6A1B9A, text: '#CE93D8', label: '📏 Size' },
    'Features':  { bg: 0xE65100, text: '#FFCC80', label: '✨ Features' },
    'Moons':     { bg: 0x37474F, text: '#B0BEC5', label: '🌙 Moons' },
    'Fun Facts': { bg: 0x880E4F, text: '#F48FB1', label: '🎉 Fun Facts' },
};

const LEVEL_NAMES = {
    1: '🔢 Planet Order',
    2: '🧪 Planet Types',
    3: '📏 Planet Sizes',
    4: '✨ Planet Features',
    5: '🌙 Moons & More',
    6: '🎉 Fun Facts',
};

// ── Dynamic question generator ──────────────────────────────────
// Called each time a level starts — returns a fresh shuffled pool
// of questions derived from planet data, so the quiz never repeats.
function getDynamicQuestions(level) {
    const ordinals = ['','1st','2nd','3rd','4th','5th','6th','7th','8th'];
    const _sh = arr => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };
    const qs = [];

    // ── Level 1 · Order ─────────────────────────────────────────
    if (level === 1) {
        // "Click the Nth planet from the Sun"
        PLANETS.forEach(p => qs.push({
            id: 'dyn_ord_' + p.id, level: 1, category: 'Order',
            text: 'Click the ' + ordinals[p.order] + ' planet from the Sun.',
            type: 'click', answer: p.id,
            successMsg: p.name + ' is planet #' + p.order + ' — well done!',
        }));
        // "Which planet is between X and Y?"
        for (let i = 1; i < PLANETS.length - 1; i++) {
            const p = PLANETS[i];
            qs.push({
                id: 'dyn_between_' + p.id, level: 1, category: 'Order',
                text: 'Which planet is between ' + PLANETS[i-1].name + ' and ' + PLANETS[i+1].name + '?',
                type: 'click', answer: p.id,
                successMsg: PLANETS[i-1].name + ' → ' + p.name + ' → ' + PLANETS[i+1].name + '. Spot on!',
            });
        }
        // "Which planet comes right after X?"
        for (let i = 0; i < PLANETS.length - 1; i++) {
            qs.push({
                id: 'dyn_after_' + PLANETS[i].id, level: 1, category: 'Order',
                text: 'Which planet comes right after ' + PLANETS[i].name + ', moving away from the Sun?',
                type: 'click', answer: PLANETS[i + 1].id,
                successMsg: PLANETS[i + 1].name + ' follows ' + PLANETS[i].name + '. Great memory!',
            });
        }
    }

    // ── Level 2 · Type ──────────────────────────────────────────
    if (level === 2) {
        const allTypes = ['Rocky', 'Gas Giant', 'Ice Giant'];
        // "What type of planet is X?" for every planet
        PLANETS.forEach(p => {
            const choices = _sh([p.type, ...allTypes.filter(t => t !== p.type)]);
            qs.push({
                id: 'dyn_type_' + p.id, level: 2, category: 'Type',
                text: 'What type of planet is ' + p.name + '?',
                type: 'choice', choices, answer: p.type,
                successMsg: p.name + ' is a ' + p.type + ' planet!',
            });
        });
        // "Which of these is NOT a rocky planet?"
        const nonRocky = _sh(PLANETS.filter(p => p.type !== 'Rocky'));
        if (nonRocky.length > 0) {
            const target = nonRocky[0];
            const rocky3 = PLANETS.filter(p => p.type === 'Rocky').slice(0, 3);
            qs.push({
                id: 'dyn_notrocky', level: 2, category: 'Type',
                text: 'Which of these is NOT a rocky planet?',
                type: 'choice', choices: _sh([target.id, ...rocky3.map(p => p.id)]), answer: target.id,
                successMsg: target.name + ' is a ' + target.type + ' — not rocky!',
            });
        }
    }

    // ── Level 3 · Size ──────────────────────────────────────────
    if (level === 3) {
        // "Which is bigger: X or Y?"
        [[0,2],[1,3],[4,5],[6,7],[4,6],[5,7],[0,4],[1,5]].forEach(([a, b]) => {
            const pA = PLANETS[a], pB = PLANETS[b];
            if (!pA || !pB) return;
            const bigger = pA.sizeRank < pB.sizeRank ? pA : pB;
            qs.push({
                id: 'dyn_bigger_' + pA.id + '_' + pB.id, level: 3, category: 'Size',
                text: 'Which planet is bigger: ' + pA.name + ' or ' + pB.name + '?',
                type: 'choice', choices: _sh([pA.name, pB.name]), answer: bigger.name,
                successMsg: bigger.name + ' is the bigger planet!',
            });
        });
        // "Click the Nth largest planet"
        const labels = { 1:'largest', 2:'2nd largest', 3:'3rd largest', 4:'4th largest', 5:'5th largest' };
        PLANETS.filter(p => p.sizeRank <= 5).forEach(p => qs.push({
            id: 'dyn_sizelabel_' + p.id, level: 3, category: 'Size',
            text: 'Click the ' + labels[p.sizeRank] + ' planet in the solar system.',
            type: 'click', answer: p.id,
            successMsg: p.name + ' is the ' + labels[p.sizeRank] + ' planet!',
        }));
    }

    // ── Level 4 · Features ──────────────────────────────────────
    if (level === 4) {
        [
            { pid:'mercury', text:'I orbit the Sun in only 88 Earth days — the fastest of all. Which planet am I?',
              msg:'Mercury is the fastest-orbiting planet — up to 59 km per second!' },
            { pid:'venus',   text:'I spin backwards and my day is longer than my year. Which planet am I?',
              msg:'Venus rotates so slowly that a day on it outlasts its own year!' },
            { pid:'earth',   text:'I have liquid oceans, plate tectonics, and a magnetic shield. Which planet?',
              msg:'Earth\'s unique combination of features makes it perfect for life!' },
            { pid:'mars',    text:'My sunsets are blue, and I host the tallest volcano in the solar system. Which planet?',
              msg:'Iron-rich dust makes Mars\'s sky pink and its sunsets beautifully blue!' },
            { pid:'jupiter', text:'My magnetic field is 20,000× stronger than Earth\'s. Which giant planet?',
              msg:'Jupiter\'s colossal magnetic field is the strongest of any planet!' },
            { pid:'saturn',  text:'I\'m less dense than water — I would float in a big enough ocean! Which planet?',
              msg:'Saturn is so light it would float — it\'s mostly gas!' },
            { pid:'uranus',  text:'One of my poles gets 42 continuous years of sunlight, then 42 years of darkness. Which planet?',
              msg:'Uranus is tilted 98° — it rolls around the Sun like a bowling ball!' },
            { pid:'neptune', text:'I was predicted by mathematics before anyone ever saw me. Which planet?',
              msg:'Neptune was found in 1846 exactly where equations said it would be!' },
        ].forEach(fq => qs.push({
            id: 'dyn_feat_' + fq.pid, level: 4, category: 'Features',
            text: fq.text, type: 'click', answer: fq.pid, successMsg: fq.msg, panelH: 120,
        }));
    }

    // ── Level 5 · Moons ─────────────────────────────────────────
    if (level === 5) {
        const allCounts = PLANETS.map(p => p.moons);
        // "How many moons does X have?"
        PLANETS.forEach(p => {
            const others = _sh(allCounts.filter(m => m !== p.moons)).slice(0, 3);
            const choices = _sh([String(p.moons), ...others.map(String)]);
            qs.push({
                id: 'dyn_mooncount_' + p.id, level: 5, category: 'Moons',
                text: 'How many known moons does ' + p.name + ' have?',
                type: 'choice', choices, answer: String(p.moons),
                successMsg: p.name + ' has ' + p.moons + ' known moon' + (p.moons !== 1 ? 's' : '') + '!',
            });
        });
        // Named moon questions
        [
            { pid:'earth',   moon:'Moon',   others:['Titan','Europa','Triton'] },
            { pid:'mars',    moon:'Phobos', others:['Charon','Io','Miranda'] },
            { pid:'jupiter', moon:'Europa', others:['Titan','Deimos','Rhea'] },
            { pid:'saturn',  moon:'Titan',  others:['Io','Callisto','Triton'] },
            { pid:'neptune', moon:'Triton', others:['Europa','Rhea','Nereid'] },
        ].forEach(mq => {
            const planet = PLANETS.find(p => p.id === mq.pid);
            qs.push({
                id: 'dyn_moonname_' + mq.pid, level: 5, category: 'Moons',
                text: 'What is ' + planet.name + '\'s most famous moon called?',
                type: 'choice', choices: _sh([mq.moon, ...mq.others]), answer: mq.moon,
                successMsg: mq.moon + ' is one of the most fascinating moons in the solar system!',
            });
        });
    }

    // ── Level 6 · Fun Facts ─────────────────────────────────────
    if (level === 6) {
        PLANETS.forEach(p => {
            const funFacts = Array.isArray(p.funFact) ? p.funFact : (p.funFact ? [p.funFact] : []);
            funFacts.forEach((ff, i) => {
                if (ff && ff.length <= 110) {
                    qs.push({
                        id: 'dyn_fun_' + p.id + '_' + i, level: 6, category: 'Fun Facts',
                        text: '"' + ff + '" — Which planet is this about?',
                        type: 'click', answer: p.id,
                        successMsg: 'Brilliant! ' + p.name + ' is full of amazing surprises!',
                        panelH: 130,
                    });
                }
            });
        });
    }

    return _sh(qs);
}

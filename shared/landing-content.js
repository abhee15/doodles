/**
 * SEO Landing Page Content
 *
 * Central repository for all landing page prose, FAQs, and grade mappings.
 * One entry per category — extensible by adding a key.
 * All images, gradients, and icons sourced from games-manifest.js (single source of truth).
 */

// eslint-disable-next-line no-unused-vars
const LANDING_CONTENT = {
  math: {
    heroSubtitle: 'Build number sense and arithmetic confidence through play.',
    seoDescription:
      'Free math games for kids ages 5–10. Practice addition, subtraction, multiplication and measurement.',
    seoKeywords:
      'free math games for kids, math games 1st grade, addition games, subtraction games',
    introParagraphs: [
      'Strong math skills built early become the foundation for everything from science to everyday life. Kids who practice addition and subtraction through play develop number sense faster than those who rely on worksheets alone.',
      "Each game below targets a different skill area — addition fluency, number sequences, mental calculation, and real-world measurement. Pick one based on your child's grade level, or explore them all."
    ],
    whyItWorks: {
      heading: 'Why Math Games Work for Kids Ages 5–10',
      paragraphs: [
        'Research on active retrieval practice shows that game-based learning produces stronger retention than passive drill. When kids are engaged — racing against a timer, competing for a high score, or solving a puzzle — their brains encode the math fact more deeply.',
        "These games use spaced repetition and progressive difficulty, meaning each problem builds on the last. By the time kids finish a game, they've seen the same type of problem from multiple angles."
      ],
      gameBlurbs: [
        {
          gameId: 'math-ladder',
          blurb:
            'Great for addition and subtraction fluency — each correct answer climbs a rung. Timer-based play builds speed without pressure.'
        },
        {
          gameId: 'number-ninja',
          blurb:
            'Builds number sequence recognition and sharpens reflexes. Kids tap numbers as they fall — combining numeracy with quick reactions.'
        },
        {
          gameId: 'quick-math',
          blurb:
            'Trains mental calculation speed using shortcuts like the ×9 and ×11 tricks. Perfect for 3rd–5th graders aiming to skip the calculator.'
        },
        {
          gameId: 'measure-master',
          blurb:
            'Introduces real-world measurement — rulers, scales, and sorting by size. Shows kids why measurement matters.'
        }
      ]
    },
    faqs: [
      {
        q: 'What age are these math games for?',
        a: 'Ages 5–10, covering Kindergarten through 4th grade skills.'
      },
      {
        q: 'Are these games really free?',
        a: 'Yes — no account, no login, no in-app purchases. Just open and play.'
      },
      {
        q: 'Which game should my 1st grader start with?',
        a: "Math Ladder is ideal for 1st grade addition and subtraction. Number Ninja is great once they're confident with sequences."
      },
      {
        q: 'Do the games work on tablets and phones?',
        a: 'Yes, all games are fully mobile-responsive. They work on iPad, Android tablets, and phones.'
      },
      {
        q: 'Is there a suggested play schedule?',
        a: '10–15 minutes a day produces measurable results within a few weeks. Consistency matters more than duration.'
      },
      {
        q: "Can I track my child's progress?",
        a: 'Each game shows a score at the end. You can revisit and track improvements over time.'
      }
    ],
    grades: [
      { slug: 'kindergarten', label: 'Kindergarten', gameIds: ['math-ladder'] },
      { slug: '1st-grade', label: '1st Grade', gameIds: ['math-ladder', 'number-ninja'] },
      {
        slug: '2nd-grade',
        label: '2nd Grade',
        gameIds: ['math-ladder', 'number-ninja', 'quick-math']
      },
      { slug: '3rd-grade', label: '3rd Grade', gameIds: ['quick-math', 'measure-master'] },
      { slug: '4th-grade', label: '4th Grade', gameIds: ['quick-math', 'measure-master'] }
    ]
  },

  memory: {
    heroSubtitle: 'Train recall, focus, and long-term retention through active learning games.',
    seoDescription:
      'Free memory and learning games for kids. Improve recall, focus, and retention skills.',
    seoKeywords:
      'memory games for kids, learning games, brain games kids, recall games, body map game',
    introParagraphs: [
      "Memory is a skill that can be trained — and games are one of the best ways to build it. When kids play memory games, they're practicing attention, encoding, retrieval, and executive function.",
      "These games use proven memory techniques like the body-peg method and visual association. Kids don't just memorize facts — they learn strategies for remembering anything."
    ],
    whyItWorks: {
      heading: 'Why Memory Games Help Kids Learn Faster',
      paragraphs: [
        'Active recall — retrieving information from memory under a time constraint — is far more effective than passive review. These games combine recall practice with immediate feedback.',
        'Body Map uses associative memory, linking body parts to memorable cues. This technique (called the Method of Loci) has been used by memory champions for thousands of years.'
      ],
      gameBlurbs: [
        {
          gameId: 'body-map',
          blurb:
            'Uses visual body-peg method to teach anatomy and build associative memory. A proven technique for rapid, long-term recall.'
        },
        {
          gameId: 'brain-spark',
          blurb:
            'Challenges working memory and pattern recognition across categories. Scales in difficulty as you improve.'
        }
      ]
    },
    faqs: [
      {
        q: 'What age are memory games good for?',
        a: 'Ages 5–12. Body Map suits ages 7+ for anatomy; Brain Spark is engaging from age 5 and scales to age 12+.'
      },
      {
        q: 'Do memory games help with school performance?',
        a: 'Yes — improving recall directly supports reading comprehension, math fact fluency, and test-taking confidence.'
      },
      {
        q: 'How does the Body Map method work?',
        a: 'It teaches anatomy by linking body parts to memorable visual cues, using your body as a "map" to store information.'
      },
      {
        q: 'Are these games free with no login?',
        a: 'Completely free. No account, no download, no tracking. Just play.'
      },
      {
        q: 'Can kids play these games daily?',
        a: 'Yes. Memory training improves with frequent, short sessions — 5–10 minutes daily is ideal.'
      }
    ],
    grades: [
      { slug: 'kindergarten', label: 'Kindergarten', gameIds: ['brain-spark'] },
      { slug: '1st-grade', label: '1st Grade', gameIds: ['brain-spark', 'body-map'] },
      { slug: '2nd-grade', label: '2nd Grade', gameIds: ['body-map'] },
      { slug: '3rd-grade', label: '3rd Grade', gameIds: ['body-map'] }
    ]
  },

  geo: {
    heroSubtitle: 'Explore countries, capitals, and continents through interactive map games.',
    seoDescription:
      'Free geography games for kids. Learn world maps, countries, capitals and continents.',
    seoKeywords:
      'geography games for kids, map games, world geography kids, countries capitals games',
    introParagraphs: [
      "Map skills are part of every school curriculum from 3rd grade onward. But memorizing capital cities shouldn't be boring — it should feel like exploring the world.",
      "These games make geography interactive. Instead of staring at a static map, kids identify countries, explore terrain, and discover real facts about places they'll never forget."
    ],
    whyItWorks: {
      heading: 'Why Geography Games Build Spatial Thinking',
      paragraphs: [
        'Interactive mapping engages the spatial reasoning part of the brain — the same system used for math, engineering, and science.',
        "When kids locate a country on a map and then read a fact about it, they're using context to strengthen memory. Visual + narrative + interaction = deep learning."
      ],
      gameBlurbs: [
        {
          gameId: 'world-explorer',
          blurb:
            'Identifies countries and capitals across all continents in a timed challenge. Covers all 7 continents and 190+ countries.'
        },
        {
          gameId: 'earth-explorer',
          blurb:
            'Explores terrain, climate zones, and ocean geography with visual maps. Great for understanding natural features, not just borders.'
        }
      ]
    },
    faqs: [
      {
        q: 'What grade level are geography games for?',
        a: '3rd grade and up — aligned with typical social studies curriculum.'
      },
      {
        q: 'Do games cover all continents?',
        a: 'Yes, World Explorer covers all 7 continents and 190+ countries. Earth Explorer focuses on natural geography and climate.'
      },
      {
        q: 'Is an internet connection required?',
        a: 'Initial load requires internet; games run fully in the browser after that.'
      },
      {
        q: 'Can kids use these to study for tests?',
        a: 'Absolutely. Repeated play strengthens recall for geography quizzes and standardized tests.'
      },
      {
        q: 'Are the facts about countries accurate?',
        a: 'Yes — all facts are sourced from reliable geographic and demographic sources.'
      }
    ],
    grades: [
      { slug: '3rd-grade', label: '3rd Grade', gameIds: ['world-explorer', 'earth-explorer'] },
      { slug: '4th-grade', label: '4th Grade', gameIds: ['world-explorer', 'earth-explorer'] },
      { slug: '5th-grade', label: '5th Grade', gameIds: ['world-explorer', 'earth-explorer'] }
    ]
  },

  words: {
    heroSubtitle: 'Build vocabulary and reading confidence through interactive word games.',
    seoDescription:
      'Free vocabulary and word games for kids. Practice spelling, definitions, and language skills.',
    seoKeywords:
      'word games for kids, vocabulary games, spelling games kids, reading games, word explorer',
    introParagraphs: [
      'Reading fluency depends on vocabulary breadth. Kids who know more words read faster, understand more deeply, and score higher on comprehension tests.',
      'These games make vocabulary learning active and engaging. Instead of looking up definitions, kids encounter new words in context, use them to solve puzzles, and see them repeatedly across games.'
    ],
    whyItWorks: {
      heading: 'Why Word Games Accelerate Reading Growth',
      paragraphs: [
        'Contextual learning — encountering a word in a sentence or story — produces stronger vocabulary retention than definition memorization.',
        'Interactive games add immediate feedback and spaced repetition. Kids see the same word in different contexts, building deeper understanding.'
      ],
      gameBlurbs: [
        {
          gameId: 'word-explorer',
          blurb:
            'Presents words in rich context — definitions, synonyms, usage examples, and sentences. Covers Tier 2 academic vocabulary aligned with school curricula.'
        }
      ]
    },
    faqs: [
      {
        q: 'What reading level are these games for?',
        a: 'Designed for Grades 1–5, covering sight words through Tier 2 vocabulary.'
      },
      {
        q: 'Are they suitable for ESL learners?',
        a: 'Yes — context clues, visual cues, and multiple exposures support non-native English speakers and help build academic language.'
      },
      {
        q: 'How many words do kids learn?',
        a: 'Word Explorer includes 200+ carefully selected words. Kids typically master 10–15% of encountered words per session.'
      },
      {
        q: 'Can this replace vocabulary instruction at school?',
        a: 'Great as a supplement — games reinforce what kids learn in class and build confidence for classroom discussions.'
      },
      {
        q: 'Do kids need to know the words beforehand?',
        a: 'No. Games teach through context. Kids encounter new words and learn their meanings through play.'
      }
    ],
    grades: [
      { slug: '1st-grade', label: '1st Grade', gameIds: ['word-explorer'] },
      { slug: '2nd-grade', label: '2nd Grade', gameIds: ['word-explorer'] },
      { slug: '3rd-grade', label: '3rd Grade', gameIds: ['word-explorer'] }
    ]
  },

  science: {
    heroSubtitle: 'Discover the natural world through games about space, dinosaurs, and chemistry.',
    seoDescription:
      'Free science games for kids. Explore space, prehistoric life, and the periodic table.',
    seoKeywords:
      'science games for kids, space games kids, dinosaur games, periodic table game, planet quest',
    introParagraphs: [
      'Curiosity is the engine of scientific thinking. Kids who fall in love with science early tend to stay engaged throughout school.',
      'These games spark that curiosity through interactive exploration. Want to know about dinosaurs? Play Dino Hunter and discover facts by hitting different species. Curious about planets? Explore the solar system and ace the quiz.'
    ],
    whyItWorks: {
      heading: 'Why Science Games Spark Curiosity and Retention',
      paragraphs: [
        'Discovery-based learning — where kids encounter facts through play — produces stronger engagement and retention than passive reading.',
        "These games combine fact presentation with quiz challenges, ensuring kids don't just stumble through — they actually learn and recall the science."
      ],
      gameBlurbs: [
        {
          gameId: 'solar-system',
          blurb:
            'Explores planets, moons, and solar system facts through an interactive journey. 6 difficulty levels mean kids from 3rd to 5th grade can play.'
        },
        {
          gameId: 'dino-hunter',
          blurb:
            'Teaches prehistoric species, eras, and characteristics through hunting gameplay. Hunt one species, learn about another.'
        },
        {
          gameId: 'periodic-table',
          blurb:
            'Makes element symbols, atomic numbers, and groups memorable. Perfect for introducing chemistry in 5th grade.'
        }
      ]
    },
    faqs: [
      {
        q: 'What grade is Periodic Table Master for?',
        a: '5th grade and up — typically introduced when kids study matter and chemistry basics.'
      },
      {
        q: 'Are the dinosaur facts scientifically accurate?',
        a: 'Yes, all facts are sourced from current paleontology literature and museum collections.'
      },
      {
        q: 'Can kids use these for science homework?',
        a: 'Absolutely. These games cover curriculum standards and make great supplements to textbook learning.'
      },
      {
        q: 'Is space game content aligned to standards?',
        a: 'Yes — Planet Quest covers solar system content found in 2nd–4th grade science standards.'
      },
      {
        q: 'Do kids remember facts learned through games?',
        a: 'Studies show that game-based fact learning produces better retention than textbook reading alone.'
      }
    ],
    grades: [
      { slug: '2nd-grade', label: '2nd Grade', gameIds: ['solar-system'] },
      { slug: '3rd-grade', label: '3rd Grade', gameIds: ['solar-system', 'dino-hunter'] },
      { slug: '4th-grade', label: '4th Grade', gameIds: ['solar-system', 'dino-hunter'] },
      {
        slug: '5th-grade',
        label: '5th Grade',
        gameIds: ['periodic-table', 'solar-system', 'dino-hunter']
      }
    ]
  },

  art: {
    heroSubtitle: 'Learn step-by-step drawing with guided art games for all skill levels.',
    seoDescription:
      'Free drawing and art games for kids. Follow step-by-step guides to create fun illustrations.',
    seoKeywords:
      'drawing games for kids, art games, learn to draw kids, creative games, draw it game',
    introParagraphs: [
      'Drawing step-by-step builds spatial reasoning, fine motor skills, and creative confidence. Kids who learn to draw early develop visual literacy that supports learning across subjects.',
      'These games remove the intimidation of a blank page. With guided steps and visual feedback, even kids who think "I can\'t draw" discover they can create beautiful artwork.'
    ],
    whyItWorks: {
      heading: 'Why Drawing Games Build Creativity and Confidence',
      paragraphs: [
        'Step-by-step instruction provides structure and prevents frustration. Kids see immediate progress, building confidence with each completed drawing.',
        'The drawing process engages both sides of the brain — analytical (following steps) and creative (personalizing colors, adding details). This balanced engagement produces deeper learning and enjoyment.'
      ],
      gameBlurbs: [
        {
          gameId: 'draw-it',
          blurb:
            'Guides kids through structured drawing exercises from simple shapes to full illustrations. Progressive difficulty means beginners and experienced artists both find a good challenge.'
        }
      ]
    },
    faqs: [
      {
        q: 'Do kids need drawing talent to play?',
        a: 'Not at all — games are designed for complete beginners. Steps are clear, forgiving, and build confidence gradually.'
      },
      {
        q: 'What age is Draw It for?',
        a: 'Ages 5 and up. Early levels are very simple (shapes); later levels add more detail and complexity.'
      },
      {
        q: 'Can kids save or print their drawings?',
        a: 'Drawings appear on screen during gameplay. You can screenshot or use browser tools to save them.'
      },
      {
        q: 'Is this a replacement for art class?',
        a: 'Great complement to art class — builds fundamental drawing skills and inspires creative practice at home.'
      },
      {
        q: 'Do kids get more confident drawing?',
        a: 'Yes — step-by-step success builds real drawing confidence. Many kids move from "I can\'t draw" to "I love drawing" within a few sessions.'
      }
    ],
    grades: [
      { slug: 'kindergarten', label: 'Kindergarten', gameIds: ['draw-it'] },
      { slug: '1st-grade', label: '1st Grade', gameIds: ['draw-it'] },
      { slug: '2nd-grade', label: '2nd Grade', gameIds: ['draw-it'] }
    ]
  },

  logic: {
    heroSubtitle: 'Sharpen critical thinking and pattern recognition through brain puzzle games.',
    seoDescription:
      'Free logic and puzzle games for kids. Develop critical thinking, patterns, and problem-solving skills.',
    seoKeywords:
      'logic games for kids, brain games, puzzle games, critical thinking games kids, brain spark',
    introParagraphs: [
      'Critical thinking is the skill that transfers to every subject. Kids who practice logic puzzles show improvements in math reasoning, reading comprehension, and problem-solving across the board.',
      'These games train pattern recognition, deductive reasoning, and quick decision-making. Each puzzle is a mini-challenge that rewires how kids approach problems.'
    ],
    whyItWorks: {
      heading: 'Why Logic Puzzles Strengthen Math and Reading',
      paragraphs: [
        'Pattern recognition — identifying relationships and rules — is foundational to both mathematics and language. Logic games activate these neural pathways in an engaging way.',
        'Repeated exposure to different puzzle types builds flexible thinking. Kids learn multiple strategies for solving problems, making them more adaptable and confident learners.'
      ],
      gameBlurbs: [
        {
          gameId: 'brain-spark',
          blurb:
            'Multi-category knowledge challenges that build working memory and deduction skills. Difficulty adapts as kids improve, keeping them engaged.'
        }
      ]
    },
    faqs: [
      {
        q: 'Are logic games good for gifted kids?',
        a: 'Yes — Brain Spark has adaptive difficulty that scales with ability. Gifted kids can challenge themselves on harder levels.'
      },
      {
        q: 'What age are puzzle games for?',
        a: 'Ages 5–12. Start with easier modes; difficulty scales up automatically as kids improve.'
      },
      {
        q: 'Do these games help with math?',
        a: 'Absolutely. Logic training improves pattern recognition, which is fundamental to algebraic thinking.'
      },
      {
        q: 'Can these help with test anxiety?',
        a: 'Yes — building confidence through repeated puzzle-solving transfers to test-taking. Kids feel more capable overall.'
      },
      {
        q: 'How much time should kids spend on logic games?',
        a: '10–15 minutes daily is ideal. Logic training benefits from consistency, not marathon sessions.'
      }
    ],
    grades: [
      { slug: 'kindergarten', label: 'Kindergarten', gameIds: ['brain-spark'] },
      { slug: '1st-grade', label: '1st Grade', gameIds: ['brain-spark'] },
      { slug: '2nd-grade', label: '2nd Grade', gameIds: ['brain-spark'] },
      { slug: '3rd-grade', label: '3rd Grade', gameIds: ['brain-spark'] }
    ]
  }
};

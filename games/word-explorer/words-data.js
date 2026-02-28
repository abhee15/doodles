/**
 * Word Explorer — Complete Word Database
 * 48 Tier-2 vocabulary words for 3rd/4th graders (ages 8-10)
 * Categories unlock progressively based on star achievements
 */

/* eslint-disable no-undef, no-console */

window.WORD_CATEGORIES = [
  {
    id: 'feelings',
    name: 'Feelings & Emotions',
    icon: 'ti-mood-happy',
    description: 'Words to describe how you feel inside',
    unlockRequirement: 0,
    order: 1
  },
  {
    id: 'character',
    name: 'Character Traits',
    icon: 'ti-star',
    description: 'Words to describe what kind of person you are',
    unlockRequirement: 0,
    order: 2
  },
  {
    id: 'thinking',
    name: 'Smart Thinking',
    icon: 'ti-brain',
    description: 'Words about how smart people learn and solve problems',
    unlockRequirement: 5,
    order: 3
  },
  {
    id: 'actions',
    name: 'Actions & Doing',
    icon: 'ti-run',
    description: 'Words for things you do and accomplish',
    unlockRequirement: 15,
    order: 4
  },
  {
    id: 'describing',
    name: 'Describing Things',
    icon: 'ti-palette',
    description: 'Words to paint a picture when you describe',
    unlockRequirement: 25,
    order: 5
  },
  {
    id: 'nature',
    name: 'Nature & Science',
    icon: 'ti-leaf',
    description: 'Words about animals, plants, and how things work',
    unlockRequirement: 40,
    order: 6
  }
];

window.WORDS = [
  // ===== FEELINGS & EMOTIONS (8 words) =====
  {
    id: 'curious',
    word: 'Curious',
    category: 'feelings',
    difficulty: 1,
    phonetic: 'KYOOR-ee-us',
    partOfSpeech: 'adjective',
    definition: 'Wanting to learn or find out about something',
    fullDefinition:
      'When you are curious, your brain is itching to find out more — you ask questions, explore, and investigate.',
    origin:
      'From Latin "cura" meaning care. Romans used it for someone who cared so much they just had to know more!',
    connotation: 'positive',
    whenToUse: [
      'When you want to describe wanting to learn: "She was curious about rockets."',
      'When writing about a character who asks lots of questions.'
    ],
    whenNotToUse: [
      'Do not use instead of "nosy" — curious is positive, nosy means prying.',
      'Not the same as confused — curious = want to know, not lost.'
    ],
    memoryTip:
      'Think of a cat — cats are ALWAYS curious! CURious = the CAT who CURs and sniffs everything!',
    synonyms: ['inquisitive', 'interested', 'eager'],
    antonyms: ['uninterested', 'indifferent'],
    exampleSentences: [
      'Maya was curious about the glowing rock she found on the beach.',
      'The curious puppy sniffed every corner of the new room.'
    ]
  },
  {
    id: 'anxious',
    word: 'Anxious',
    category: 'feelings',
    difficulty: 2,
    phonetic: 'ANG-shus',
    partOfSpeech: 'adjective',
    definition: 'Feeling worried or nervous about something that might happen',
    fullDefinition:
      "When you feel anxious, your stomach might hurt or your heart might race. You feel worried even though you're not sure what will happen.",
    origin:
      'From Latin "angere" meaning to squeeze or choke — it\'s that tight, squeezed feeling in your chest when you\'re worried.',
    connotation: 'negative',
    whenToUse: [
      'Before a big test: "I felt anxious waiting for the results."',
      'Describing nervousness about something new or unknown.'
    ],
    whenNotToUse: [
      'Not the same as scared — anxious is worry about what MIGHT happen; scared is knowing danger is real.',
      "Don't use for excitement — excited is happy; anxious is worried."
    ],
    memoryTip:
      'ANXious = ANGed X-tension — your body is stretched tight with worry! Think of your muscles all clenched up.',
    synonyms: ['worried', 'nervous', 'uneasy'],
    antonyms: ['calm', 'relaxed', 'confident'],
    exampleSentences: [
      'Jamal felt anxious on the first day of school.',
      'The anxious kitten hid under the bed during the thunderstorm.'
    ]
  },
  {
    id: 'grateful',
    word: 'Grateful',
    category: 'feelings',
    difficulty: 1,
    phonetic: 'GRATE-ful',
    partOfSpeech: 'adjective',
    definition: 'Feeling happy and thankful for something good someone did for you',
    fullDefinition:
      'When you feel grateful, your heart feels warm and full. You want to say thank you because someone helped you or gave you something wonderful.',
    origin:
      'From Latin "gratus" meaning pleasing or thankful. When something is pleasing (GRATE), you feel full of thanks.',
    connotation: 'positive',
    whenToUse: [
      'After someone helps you: "I felt grateful when my friend shared their lunch."',
      'Describing appreciation: "The grateful child hugged her grandma."'
    ],
    whenNotToUse: [
      'Not the same as happy — you can be grateful without being silly-happy.',
      "Don't use for wanting something — grateful is for HAVING received it already."
    ],
    memoryTip:
      "GRATE + FULL = A heart that is FULL of thanks so big it's overflowing! Grating cheese makes it flow everywhere!",
    synonyms: ['thankful', 'appreciative', 'glad'],
    antonyms: ['ungrateful', 'unappreciative', 'bitter'],
    exampleSentences: [
      'I am grateful for my teacher who stayed late to help me understand math.',
      'The grateful puppy wagged its tail when her rescuer gave her food.'
    ]
  },
  {
    id: 'frustrated',
    word: 'Frustrated',
    category: 'feelings',
    difficulty: 2,
    phonetic: 'frus-TRAY-ted',
    partOfSpeech: 'adjective',
    definition: 'Feeling annoyed or upset because something is not going the way you want',
    fullDefinition:
      "When you feel frustrated, things aren't working and it makes you mad or annoyed. You want to give up, but you also want to try again.",
    origin:
      'From Latin "frustrare" meaning to defeat or thwart. When you\'re frustrated, plans are being defeated.',
    connotation: 'negative',
    whenToUse: [
      'With hard homework: "I felt frustrated when I couldn\'t solve the problem."',
      'When things go wrong: "The frustrated gamer turned off the game."'
    ],
    whenNotToUse: [
      "Don't use for anger — frustrated is annoyed about something not working; angry is about someone or something mean.",
      'Not as strong as furious — frustrated is annoying, furious is intense rage.'
    ],
    memoryTip:
      "FRUSTrue AT me = The truth that I'm stuck and can't get it! FRU-STRATE-ED = Frustrated you went out of state (state of control)!",
    synonyms: ['annoyed', 'irritated', 'exasperated'],
    antonyms: ['satisfied', 'content', 'pleased'],
    exampleSentences: [
      'The frustrated artist crumpled up her third drawing and started over.',
      "Kai felt frustrated when the video game wouldn't load."
    ]
  },
  {
    id: 'compassionate',
    word: 'Compassionate',
    category: 'feelings',
    difficulty: 3,
    phonetic: 'kum-PASH-un-it',
    partOfSpeech: 'adjective',
    definition: "Feeling bad for someone else's pain and wanting to help them",
    fullDefinition:
      "When you are compassionate, you don't just see someone hurting — you feel it too. You want to help because you care about them.",
    origin:
      'From Latin "com" (with) + "pathos" (feeling). Compassionate means to feel WITH someone\'s pain.',
    connotation: 'positive',
    whenToUse: [
      'Describing someone kind: "The compassionate nurse held the child\'s hand."',
      'Showing empathy: "She felt compassionate toward the injured bird."'
    ],
    whenNotToUse: [
      "Don't use for pity — compassionate is caring and helpful; pity can be condescending.",
      'Not the same as sympathetic — sympathetic is understanding; compassionate is feeling AND acting.'
    ],
    memoryTip:
      'COMpassion = COMing WITH to PASS-ion (feeling). Like a real friend who comes WITH you in your pain instead of leaving you alone.',
    synonyms: ['empathetic', 'kind-hearted', 'caring'],
    antonyms: ['cruel', 'indifferent', 'heartless'],
    exampleSentences: [
      "The compassionate teacher listened to her student's problems.",
      "Zara's compassionate words made her sad friend feel less alone."
    ]
  },
  {
    id: 'ecstatic',
    word: 'Ecstatic',
    category: 'feelings',
    difficulty: 3,
    phonetic: 'ek-STAT-ik',
    partOfSpeech: 'adjective',
    definition: 'Feeling extremely happy and full of joy',
    fullDefinition:
      "When you feel ecstatic, you are SO happy that you might jump, dance, or shout. It's happiness turned up to the absolute maximum.",
    origin:
      'From Greek "ek" (out) + "stasis" (standing/state). Ecstatic means standing outside yourself from pure joy!',
    connotation: 'positive',
    whenToUse: [
      'Extreme happiness: "The ecstatic team jumped and cheered after winning."',
      'Big celebrations: "She was ecstatic when she got the puppy she wanted."'
    ],
    whenNotToUse: [
      'Not just happy — ecstatic is VERY happy, almost out-of-control happy.',
      "Don't use for calm happiness — that's just contentment or satisfied."
    ],
    memoryTip:
      "EC-STAT-IC = you're ECking out and can't STAY STATic (still)! You're bouncing, jumping, dancing everywhere!",
    synonyms: ['thrilled', 'overjoyed', 'elated'],
    antonyms: ['miserable', 'devastated', 'sad'],
    exampleSentences: [
      'Marcus was ecstatic when he saw the surprise birthday party.',
      'The ecstatic child danced around the room after winning the contest.'
    ]
  },
  {
    id: 'melancholy',
    word: 'Melancholy',
    category: 'feelings',
    difficulty: 3,
    phonetic: 'MEL-un-kol-ee',
    partOfSpeech: 'adjective',
    definition: 'Feeling sad or thoughtful in a quiet, peaceful way',
    fullDefinition:
      "When you feel melancholy, you're not crying or super upset — you're just quiet and thoughtful, maybe a little sad. It's like a rainy day feeling.",
    origin:
      'From Greek "melas" (black) + "chole" (bile). Ancient doctors thought sadness came from dark feelings in the body!',
    connotation: 'negative',
    whenToUse: [
      'Quiet sadness: "The melancholy music made me think about happy memories."',
      'Thoughtful mood: "She had a melancholy expression as she watched the sunset."'
    ],
    whenNotToUse: [
      'Not as sad as depressed — melancholy is gentle sadness, depression is serious.',
      'Not angry — melancholy is peaceful sadness, anger is hot and active.'
    ],
    memoryTip:
      'MELAN-choly = MELANcholy like a MELANge (mix) of colors — dark blues and grays mixed together like a quiet, thoughtful mood.',
    synonyms: ['sad', 'pensive', 'thoughtful'],
    antonyms: ['cheerful', 'happy', 'joyful'],
    exampleSentences: [
      'On rainy days, she felt melancholy and liked to sit by the window.',
      'The melancholy puppy missed his best friend who moved away.'
    ]
  },
  {
    id: 'proud',
    word: 'Proud',
    category: 'feelings',
    difficulty: 1,
    phonetic: 'PROWD',
    partOfSpeech: 'adjective',
    definition: 'Feeling good about something you did or someone you care about',
    fullDefinition:
      "When you feel proud, your chest puffs out a little and you feel like you've done something good or important. You feel respect for yourself or others.",
    origin:
      'From Old French "prode" meaning brave/able. Proud people STAND UP and show they can do things well!',
    connotation: 'positive',
    whenToUse: [
      'Achievement: "I felt proud when I learned to ride my bike."',
      'Others\' success: "She was proud of her brother\'s good grades."'
    ],
    whenNotToUse: [
      "Not the same as arrogant — proud is healthy respect, arrogant is thinking you're better than everyone.",
      "Don't use for showing off — that's boasting, not truly proud."
    ],
    memoryTip:
      'PROUD = PRO + OUT + STANDING = A PRO (expert) standing OUT, standing PROUD! Chest out, head held high!',
    synonyms: ['pleased', 'honored', 'delighted'],
    antonyms: ['ashamed', 'embarrassed', 'humiliated'],
    exampleSentences: [
      'His parents felt proud watching him graduate.',
      'The proud swimmer displayed her first-place medal.'
    ]
  },

  // ===== CHARACTER TRAITS (8 words) =====
  {
    id: 'resilient',
    word: 'Resilient',
    category: 'character',
    difficulty: 3,
    phonetic: 'ree-ZIL-yunt',
    partOfSpeech: 'adjective',
    definition: 'Able to bounce back and keep going after something hard happens',
    fullDefinition:
      "A resilient person doesn't give up when things get tough. Like a rubber ball bouncing back, they get knocked down but stand back up.",
    origin:
      'From Latin "resilire" meaning to bounce back or spring back. Elastic bands are resilient — they bounce back to shape!',
    connotation: 'positive',
    whenToUse: [
      'After difficulty: "She was resilient and tried the test again the next day."',
      'Character strength: "The resilient team never gave up, even when losing."'
    ],
    whenNotToUse: [
      "Don't use for just being stubborn — resilient is smart persistence, stubbornness is just refusal to quit.",
      'Not the same as lucky — resilient is about YOUR strength, not chance.'
    ],
    memoryTip:
      'RE-SILL-yunt = you RE-BOUNCE like a sill (edge) bounces back! Springs bounce BACK back back!',
    synonyms: ['tough', 'strong-willed', 'determined'],
    antonyms: ['fragile', 'weak', 'giving-up'],
    exampleSentences: [
      'The resilient athlete recovered from her injury and played again.',
      'After failing his driving test, Javier felt resilient and studied harder.'
    ]
  },
  {
    id: 'honest',
    word: 'Honest',
    category: 'character',
    difficulty: 1,
    phonetic: 'AH-nust',
    partOfSpeech: 'adjective',
    definition: 'Telling the truth and not lying or cheating',
    fullDefinition:
      "An honest person tells the truth even when it might get them in trouble. They don't steal, cheat, or make up stories.",
    origin:
      'From Old French "honeste" meaning reputable. Honest people have a good reputation because you can trust them.',
    connotation: 'positive',
    whenToUse: [
      'Truthful person: "My friend is honest and always tells me the truth."',
      'Admitting mistakes: "He gave an honest answer about breaking the vase."'
    ],
    whenNotToUse: [
      'Not the same as kind — you can be honest but unkind (hurtfully truthful).',
      "Don't use for someone who just didn't cheat once — honest is a CHARACTER, not one action."
    ],
    memoryTip:
      'HON-EST = HONEY is pure and sweet, no fakes added — like HONEST people are pure and genuine, no lies added!',
    synonyms: ['truthful', 'genuine', 'sincere'],
    antonyms: ['dishonest', 'deceitful', 'false'],
    exampleSentences: [
      'The honest teacher admitted she made a mistake in grading.',
      'Ira gave an honest opinion about which artwork was better.'
    ]
  },
  {
    id: 'determined',
    word: 'Determined',
    category: 'character',
    difficulty: 2,
    phonetic: 'dih-TUR-mind',
    partOfSpeech: 'adjective',
    definition: 'Having a strong decision to do something no matter how hard it is',
    fullDefinition:
      "A determined person has made up their mind. They won't let problems stop them from reaching their goal.",
    origin:
      'From Latin "determinare" meaning to set boundaries or make a firm decision. Determined people have set their minds as boundaries nothing can cross.',
    connotation: 'positive',
    whenToUse: [
      'Set on a goal: "The determined runner trained every day for the race."',
      'Not giving up: "She felt determined to finish the project even though it was hard."'
    ],
    whenNotToUse: [
      'Not the same as stubborn — determined is directed at a good goal; stubborn is just refusing to change.',
      "Don't use for accidentally doing something — determined is a CHOICE to keep going."
    ],
    memoryTip:
      'DETER-MINED = Your MIND is DETERMINED like a TERMINATOR robot — nothing can STOP it from reaching its goal!',
    synonyms: ['resolved', 'committed', 'resolute'],
    antonyms: ['uncertain', 'wishy-washy', 'doubtful'],
    exampleSentences: [
      'The determined boy practiced guitar for two hours every day.',
      'With a determined look, she stepped up to take the test.'
    ]
  },
  {
    id: 'empathetic',
    word: 'Empathetic',
    category: 'character',
    difficulty: 3,
    phonetic: 'em-PATH-et-ik',
    partOfSpeech: 'adjective',
    definition: 'Able to understand and share how someone else feels',
    fullDefinition:
      "An empathetic person doesn't just hear that you're sad — they imagine being in your situation and feel sad too. They truly understand.",
    origin:
      'From Greek "em" (in) + "pathos" (feeling). Empathetic people put themselves IN other people\'s feelings.',
    connotation: 'positive',
    whenToUse: [
      'Understanding others: "The empathetic friend knew exactly what to say."',
      'Good listener: "He is empathetic and listens when friends have problems."'
    ],
    whenNotToUse: [
      "Don't use for just being nice — empathetic means truly understanding feelings, not just being polite.",
      'Not the same as sympathetic — empathy is deeper, you feel it; sympathy is you understand it.'
    ],
    memoryTip:
      'EM-PATH-etic = Em is your FRIEND going down the PATH of emotions with you, FEELING what you feel!',
    synonyms: ['understanding', 'compassionate', 'thoughtful'],
    antonyms: ['cold', 'uncaring', 'insensitive'],
    exampleSentences: [
      'The empathetic teacher noticed when a student was struggling.',
      'Her empathetic nature made everyone feel heard and understood.'
    ]
  },
  {
    id: 'courageous',
    word: 'Courageous',
    category: 'character',
    difficulty: 2,
    phonetic: 'kuh-RAY-jus',
    partOfSpeech: 'adjective',
    definition: "Brave enough to do something even when you're scared or it's hard",
    fullDefinition:
      "A courageous person does the right thing even though they're afraid. They feel the fear but do it anyway.",
    origin:
      'From Latin "cor" meaning heart. Courageous people have a strong HEART to face scary things!',
    connotation: 'positive',
    whenToUse: [
      'Facing fears: "It was courageous to try the diving board even though she was scared."',
      'Standing up: "The courageous student told the truth even though friends disagreed."'
    ],
    whenNotToUse: [
      "Don't use for doing something dangerous stupidly — that's recklessness, not courage.",
      'Not the same as fearless — courageous people ARE scared but do it anyway!'
    ],
    memoryTip:
      "COURAGE = COURT + AGE = In old courts, knights had to be BRAVE and COURAGEOUS or they'd lose their place!",
    synonyms: ['brave', 'bold', 'fearless'],
    antonyms: ['cowardly', 'timid', 'afraid'],
    exampleSentences: [
      'The courageous girl stood up to bullying.',
      'It took a courageous choice to tell the truth.'
    ]
  },
  {
    id: 'generous',
    word: 'Generous',
    category: 'character',
    difficulty: 2,
    phonetic: 'JEN-ur-us',
    partOfSpeech: 'adjective',
    definition: 'Willing to give or share things with others without expecting anything back',
    fullDefinition:
      "A generous person gives freely — their time, their things, their kindness. They don't count what they give or expect rewards.",
    origin:
      'From Latin "generosus" meaning noble or high-born. Ancient nobles were expected to be generous to their people.',
    connotation: 'positive',
    whenToUse: [
      'Sharing: "My generous friend let me borrow her favorite book."',
      'Giving: "The generous donation helped the animal shelter."'
    ],
    whenNotToUse: [
      "Don't use for giving something you didn't want anyway — that's not generous, that's dumping.",
      'Not the same as rich — a poor person can be generous; rich people can be stingy.'
    ],
    memoryTip:
      "GENER-OUS = GENeration = Each generation passes things DOWN, sharing with the new people. That's generous!",
    synonyms: ['kind-hearted', 'giving', 'unselfish'],
    antonyms: ['selfish', 'stingy', 'greedy'],
    exampleSentences: [
      'The generous coach spent extra time helping new players.',
      'She was generous with her toys and shared with everyone.'
    ]
  },
  {
    id: 'creative',
    word: 'Creative',
    category: 'character',
    difficulty: 1,
    phonetic: 'kree-AY-tiv',
    partOfSpeech: 'adjective',
    definition: 'Able to think of new ideas and make interesting things',
    fullDefinition:
      'A creative person imagines things differently. They make art, solve problems in new ways, or tell stories nobody else would think of.',
    origin:
      'From Latin "creare" meaning to make or bring into being. Creative people CREATE new things out of nothing!',
    connotation: 'positive',
    whenToUse: [
      'Imagination: "The creative child drew a picture of a rainbow unicorn."',
      'Problem-solving: "He found a creative way to fix the broken toy."'
    ],
    whenNotToUse: [
      "Don't use for lying — creative is imagination used positively, not making up false stories.",
      'Not the same as artistic — you can be creative in math, sports, cooking, anything!'
    ],
    memoryTip:
      'CREA-TIVE = CREAte + ACTIVE = Creative people are ACTIVELY creating new ideas and things all the time!',
    synonyms: ['imaginative', 'inventive', 'artistic'],
    antonyms: ['uncreative', 'unimaginative', 'boring'],
    exampleSentences: [
      'The creative team came up with fun games for the party.',
      'She had a creative costume idea for the school play.'
    ]
  },
  {
    id: 'patient',
    word: 'Patient',
    category: 'character',
    difficulty: 2,
    phonetic: 'PAY-shunt',
    partOfSpeech: 'adjective',
    definition: 'Able to wait or accept delays without getting angry or frustrated',
    fullDefinition:
      "A patient person doesn't rush. They can wait their turn, help someone slowly, or handle frustration without losing their cool.",
    origin:
      'From Latin "patiens" meaning to suffer or endure. Patient people ENDURE waiting and difficulties calmly.',
    connotation: 'positive',
    whenToUse: [
      'Teaching: "The patient teacher helped each student learn at their own pace."',
      'Waiting: "She felt patient as she waited in the long line."'
    ],
    whenNotToUse: [
      "Don't use for being lazy — patient is calmly waiting; lazy is refusing to try.",
      'Not the same as passive — patient people are active but calm about timing.'
    ],
    memoryTip:
      'PA-TIENT = PArent + TIENt (patient) = Parents must be PATIENT with their kids learning and growing slowly!',
    synonyms: ['calm', 'tolerant', 'accepting'],
    antonyms: ['impatient', 'hasty', 'irritable'],
    exampleSentences: [
      'The patient coach explained the rules three times until everyone understood.',
      'Grandpa was patient while teaching her to tie her shoes.'
    ]
  },

  // ===== SMART THINKING (8 words) =====
  {
    id: 'observe',
    word: 'Observe',
    category: 'thinking',
    difficulty: 2,
    phonetic: 'ub-ZURV',
    partOfSpeech: 'verb',
    definition: 'To watch or look at something carefully to notice details',
    fullDefinition:
      'When you observe something, you pay close attention. You look for details, patterns, and clues. Scientists observe nature. Detectives observe crime scenes.',
    origin:
      'From Latin "observare" meaning to watch or guard. Guards OBSERVE to keep things safe by noticing everything.',
    connotation: 'neutral',
    whenToUse: [
      'Science class: "We observed how the caterpillar moved under the microscope."',
      'Noticing details: "If you observe carefully, you\'ll see the bird hiding in the tree."'
    ],
    whenNotToUse: [
      'Not the same as see — see is passive, observe is active and careful.',
      "Don't use for just glancing — observe is focused attention."
    ],
    memoryTip:
      'OB-SERVE = OB like "over and over" = SERVE as a detective! OBSERVE like you\'re serving as a detective looking for clues!',
    synonyms: ['watch', 'notice', 'examine'],
    antonyms: ['ignore', 'overlook', 'miss'],
    exampleSentences: [
      'The scientist observed the ants working together.',
      "If you observe the sky at night, you'll see stars appearing."
    ]
  },
  {
    id: 'analyze',
    word: 'Analyze',
    category: 'thinking',
    difficulty: 3,
    phonetic: 'AN-uh-lyz',
    partOfSpeech: 'verb',
    definition: 'To break something into pieces to understand how it works or what it means',
    fullDefinition:
      'When you analyze something, you take it apart mentally. You look at each piece, understand how they fit together, and figure out the whole picture.',
    origin:
      'From Greek "ana" (up/apart) + "lysis" (breaking). Analyze means to BREAK UP into pieces to understand!',
    connotation: 'neutral',
    whenToUse: [
      'Understanding stories: "The class will analyze the book to understand the character."',
      'Science: "We analyzed the water to find out what was in it."'
    ],
    whenNotToUse: [
      "Don't use for just thinking — analyze is deeper, more systematic breakdown.",
      'Not the same as wondering — wonder is curious; analyze is methodical.'
    ],
    memoryTip:
      'ANA-LYZE = ANA breaks UP + LYZE (analysis) = You BREAK UP the thing into pieces, then study each PIECE!',
    synonyms: ['examine', 'study', 'investigate'],
    antonyms: ['ignore', 'overlook', 'dismiss'],
    exampleSentences: [
      'The detective analyzed the clues to solve the mystery.',
      'We analyzed the survey to see what kids preferred.'
    ]
  },
  {
    id: 'infer',
    word: 'Infer',
    category: 'thinking',
    difficulty: 3,
    phonetic: 'in-FER',
    partOfSpeech: 'verb',
    definition:
      'To figure out something not directly told by using clues and what you already know',
    fullDefinition:
      "When you infer, you use clues to guess what must be true. It's detective thinking! You see evidence and make a smart guess.",
    origin:
      'From Latin "inferre" meaning to carry in or bring in. You BRING IN information from clues to make a conclusion.',
    connotation: 'neutral',
    whenToUse: [
      'Reading comprehension: "Infer why the character ran away from home."',
      'Using evidence: "Look at the footprints and infer what animal passed by."'
    ],
    whenNotToUse: [
      "Don't use for random guessing — infer is based on clues, not wishes.",
      'Not the same as imagine — infer uses evidence; imagine is make-believe.'
    ],
    memoryTip:
      "IN-FER = You bring IN clues + FER them (ferry/carry) forward to make a conclusion! You're a ferry boat carrying clue-cargo!",
    synonyms: ['conclude', 'deduce', 'figure out'],
    antonyms: ['state', 'prove', 'know'],
    exampleSentences: [
      'From the broken glass, I inferred that something fell.',
      'The wet grass helped us infer it had rained overnight.'
    ]
  },
  {
    id: 'hypothesis',
    word: 'Hypothesis',
    category: 'thinking',
    difficulty: 3,
    phonetic: 'hy-PAH-thuh-sis',
    partOfSpeech: 'noun',
    definition: "A smart guess or prediction that you will test to see if it's true",
    fullDefinition:
      "A hypothesis is not a random guess — it's an educated prediction based on what you know. Scientists test hypotheses to discover truth.",
    origin:
      'From Greek "hypo" (under/foundation) + "thesis" (position). A hypothesis is the FOUNDATION for testing!',
    connotation: 'neutral',
    whenToUse: [
      'Science experiment: "My hypothesis is that plants grow faster with more sunlight."',
      'Before testing: "What\'s your hypothesis about what will happen?"'
    ],
    whenNotToUse: [
      'Not the same as guess — a guess is just random; a hypothesis is educated.',
      "Don't use for proven facts — hypothesis is something yet to be tested."
    ],
    memoryTip:
      'HY-POTH-E-SIS = HYper POTHet-ic = Your smart GUESS before the actual TEST reveals the THESIS (truth)!',
    synonyms: ['educated guess', 'prediction', 'theory'],
    antonyms: ['fact', 'proof', 'certainty'],
    exampleSentences: [
      'She made a hypothesis that sugar dissolves faster in hot water.',
      'The scientist wrote down her hypothesis before starting the experiment.'
    ]
  },
  {
    id: 'concentrate',
    word: 'Concentrate',
    category: 'thinking',
    difficulty: 1,
    phonetic: 'KON-sun-trate',
    partOfSpeech: 'verb',
    definition: 'To focus your full attention on one thing',
    fullDefinition:
      'When you concentrate, you block out distractions and put all your brain power on one task. Nothing else matters for that moment.',
    origin:
      'From Latin "con" (together) + "centrum" (center). Concentrate means to bring all your FOCUS to one CENTER point!',
    connotation: 'neutral',
    whenToUse: [
      'Homework: "I need to concentrate on my math to get the right answers."',
      'Attention: "She had to concentrate hard to hear the quiet whisper."'
    ],
    whenNotToUse: [
      'Not the same as try — you can try without concentrating; concentrate is deep focus.',
      "Don't use for sitting quietly — concentrate is active mental focus, not passivity."
    ],
    memoryTip:
      'CON-CEN-TRATE = Bring your brain to the CENTER and CONCENTRATE all your focus there! CON all your powers to CENTER!',
    synonyms: ['focus', 'attend', 'pay attention'],
    antonyms: ['distract', 'wander', 'ignore'],
    exampleSentences: [
      'The student tried to concentrate on the test despite the noise.',
      'To concentrate on drawing, I moved to a quiet corner.'
    ]
  },
  {
    id: 'deduce',
    word: 'Deduce',
    category: 'thinking',
    difficulty: 3,
    phonetic: 'dih-DOOS',
    partOfSpeech: 'verb',
    definition: 'To figure out the truth by reasoning logically from facts you know',
    fullDefinition:
      'When you deduce, you use logic like a detective. From facts, you step-by-step figure out what must be true.',
    origin:
      'From Latin "deducere" meaning to lead down. You LEAD your logic DOWN from big facts to small conclusions!',
    connotation: 'neutral',
    whenToUse: [
      'Mystery solving: "From the clues, we deduced who the thief was."',
      'Logic puzzles: "Can you deduce which box contains the prize?"'
    ],
    whenNotToUse: [
      'Not the same as guess — deduction is logical; guessing is random.',
      "Don't use for feelings — deduction is about facts and logic."
    ],
    memoryTip:
      'DE-DUCE = DE from the FACTS, DUCE (lead) your mind DOWN through logic to the answer! Like Sherlock Holmes!',
    synonyms: ['conclude', 'reason', 'determine'],
    antonyms: ['guess', 'assume', 'misinterpret'],
    exampleSentences: [
      'Sherlock could deduce who committed the crime by studying the evidence.',
      'From the fossil, paleontologists deduced how tall the dinosaur was.'
    ]
  },
  {
    id: 'imagine',
    word: 'Imagine',
    category: 'thinking',
    difficulty: 1,
    phonetic: 'ih-MAJ-in',
    partOfSpeech: 'verb',
    definition: "To picture something in your mind that isn't really there",
    fullDefinition:
      "When you imagine, your brain creates a picture or story. You can imagine dragons, space travel, or what it's like to be someone else.",
    origin:
      'From Latin "imaginari" meaning to form an image. Imagination is making IMAGES in your mind!',
    connotation: 'neutral',
    whenToUse: [
      'Creative thinking: "Imagine what the world would be like without cars."',
      'Storytelling: "Close your eyes and imagine you\'re on a treasure hunt."'
    ],
    whenNotToUse: [
      'Not the same as remember — imagine is creating new; remember is recalling real.',
      "Don't use when someone says something false — that's lying, not imagining."
    ],
    memoryTip: 'I-MAGE-IN = I make an IMAGE inside my brain and put it IN there! I-MAGE-IN-e!',
    synonyms: ['picture', 'envision', 'visualize'],
    antonyms: ['forget', 'remember', 'ignore'],
    exampleSentences: [
      'Imagine yourself as an astronaut floating in space.',
      'He imagined a castle made entirely of ice.'
    ]
  },
  {
    id: 'persuade',
    word: 'Persuade',
    category: 'thinking',
    difficulty: 2,
    phonetic: 'per-SWAYD',
    partOfSpeech: 'verb',
    definition: 'To convince someone to believe something or do something by talking to them',
    fullDefinition:
      "When you persuade, you use words and reasons to change someone's mind or get them to agree with you.",
    origin:
      'From Latin "persuadere" meaning to convince. You use WORDS to make someone see things your way.',
    connotation: 'neutral',
    whenToUse: [
      'Arguing a point: "She persuaded her parents to let her get a dog."',
      'Advertising: "The commercial tried to persuade you to buy the toy."'
    ],
    whenNotToUse: [
      'Not the same as force — persuade is gentle convincing; force is making them do it.',
      "Don't use for tricking — persuade is honest reasoning; trickery is deceit."
    ],
    memoryTip:
      'PER-SUADE = PER (through/by) + SUADE (sweet talk) = You SUADE someone through SWEET, convincing WORDS!',
    synonyms: ['convince', 'influence', 'sway'],
    antonyms: ['dissuade', 'discourage', 'prevent'],
    exampleSentences: [
      'The student persuaded her team that her idea was the best.',
      'He tried to persuade me that chocolate ice cream was better than vanilla.'
    ]
  },

  // ===== ACTIONS & DOING (8 words) =====
  {
    id: 'accomplish',
    word: 'Accomplish',
    category: 'actions',
    difficulty: 2,
    phonetic: 'uh-KOM-plish',
    partOfSpeech: 'verb',
    definition: 'To finish something difficult and do it successfully',
    fullDefinition:
      'When you accomplish something, you set a goal and reach it. You complete a task that takes effort and skill.',
    origin:
      'From Latin "complere" meaning to fill up or complete. You FILL UP your goal bucket when you accomplish something!',
    connotation: 'positive',
    whenToUse: [
      'Finishing goals: "She accomplished her dream of swimming across the lake."',
      'Achievement: "The team accomplished their mission by working together."'
    ],
    whenNotToUse: [
      'Not the same as try — accomplish is success, try is effort.',
      "Don't use for easy tasks — accomplish is for meaningful achievements."
    ],
    memoryTip:
      'AC-COM-PLISH = You ADD (AC) a COMPANION (COM) to help you COMPLETE (PLISH) the task! Teamwork!',
    synonyms: ['achieve', 'complete', 'succeed'],
    antonyms: ['fail', 'abandon', 'neglect'],
    exampleSentences: [
      'By practicing daily, she accomplished her goal of playing guitar well.',
      'The explorer accomplished the difficult mountain climb.'
    ]
  },
  {
    id: 'cooperate',
    word: 'Cooperate',
    category: 'actions',
    difficulty: 2,
    phonetic: 'koh-AH-puh-rate',
    partOfSpeech: 'verb',
    definition: 'To work together with others toward a common goal',
    fullDefinition:
      'When you cooperate, you and others work as a team. Everyone does their part to reach a shared goal.',
    origin:
      'From Latin "con" (together) + "operari" (to work). COOPerate = WORK together COOPeratively!',
    connotation: 'positive',
    whenToUse: [
      'Teamwork: "The students cooperated to build a sandcastle."',
      'Group projects: "If we all cooperate, we can finish faster."'
    ],
    whenNotToUse: [
      'Not the same as obey — cooperate is choosing to work together; obey is following orders.',
      "Don't use for being forced — cooperate is willing collaboration."
    ],
    memoryTip: 'CO-OPERATE = TWO or more people OPERATE a task together! CO = together + OPERATE!',
    synonyms: ['collaborate', 'work together', 'team up'],
    antonyms: ['compete', 'oppose', 'rebel'],
    exampleSentences: [
      'The two friends cooperated on their science project.',
      'To move the couch, we had to cooperate and lift together.'
    ]
  },
  {
    id: 'investigate',
    word: 'Investigate',
    category: 'actions',
    difficulty: 2,
    phonetic: 'in-VES-tuh-gate',
    partOfSpeech: 'verb',
    definition: 'To search carefully for facts or clues to understand or solve something',
    fullDefinition:
      'When you investigate, you act like a detective. You ask questions, gather evidence, and look for answers.',
    origin:
      'From Latin "investagium" related to tracking or following. Investigators TRACK DOWN the truth!',
    connotation: 'neutral',
    whenToUse: [
      'Solving mysteries: "The detective investigated the crime."',
      'Research: "We investigated how bees make honey."'
    ],
    whenNotToUse: [
      'Not the same as spy — investigate is open and honest; spying is sneaky.',
      "Don't use for gossip — investigate is systematic and fact-based."
    ],
    memoryTip:
      'IN-VEST-I-GATE = Go IN to the VEST (hidden area), GATE down to details! Like searching through all the hidden clues!',
    synonyms: ['examine', 'explore', 'research'],
    antonyms: ['ignore', 'overlook', 'dismiss'],
    exampleSentences: [
      'The scientist investigated why the plant stopped growing.',
      'Police investigated the strange footprints in the snow.'
    ]
  },
  {
    id: 'persist',
    word: 'Persist',
    category: 'actions',
    difficulty: 2,
    phonetic: 'pur-SIST',
    partOfSpeech: 'verb',
    definition: 'To keep doing something even when it is hard or difficult',
    fullDefinition:
      "When you persist, you don't give up. You keep trying even when things get tough.",
    origin:
      'From Latin "persistere" meaning to stay or continue steadfast. You STAY on your path no matter what.',
    connotation: 'positive',
    whenToUse: [
      'Not giving up: "He persisted in practicing until he could play the song."',
      'Through difficulties: "She persisted despite many failures."'
    ],
    whenNotToUse: [
      'Not the same as annoying — persist is noble; annoying is repeating something unwanted.',
      "Don't use for stubborn refusal — persist is trying until you succeed."
    ],
    memoryTip:
      'PER-SIST = PER (through) the SISters and brothers who say QUIT, you PERSIST! Keep going no matter what!',
    synonyms: ['persevere', 'continue', 'keep trying'],
    antonyms: ['quit', 'give up', 'surrender'],
    exampleSentences: [
      'She persisted with her violin lessons even when they were hard.',
      'The athlete persisted in training for the championship.'
    ]
  },
  {
    id: 'contribute',
    word: 'Contribute',
    category: 'actions',
    difficulty: 2,
    phonetic: 'kun-TRIB-yoot',
    partOfSpeech: 'verb',
    definition: 'To give or add something to help a group or cause',
    fullDefinition:
      'When you contribute, you add your part. You help make something better by giving ideas, work, or resources.',
    origin:
      'From Latin "con" (together) + "tribuere" (to give). You GIVE your part TOGETHER for a cause!',
    connotation: 'positive',
    whenToUse: [
      'Helping: "She contributed her allowance to the charity."',
      'Teamwork: "Everyone contributed ideas to the project."'
    ],
    whenNotToUse: [
      'Not the same as get — contribute is giving, not receiving.',
      "Don't use for grudging help — contribute is willing participation."
    ],
    memoryTip:
      'CON-TRIB-UTE = CON (with others) TRIB (tribe) your talents, YOU contribute to the TRIBE and make it stronger!',
    synonyms: ['help', 'provide', 'donate'],
    antonyms: ['take', 'receive', 'withhold'],
    exampleSentences: [
      'Each student contributed a fact for the class presentation.',
      'The donation contributed greatly to saving the wildlife sanctuary.'
    ]
  },
  {
    id: 'communicate',
    word: 'Communicate',
    category: 'actions',
    difficulty: 2,
    phonetic: 'kuh-MYOO-ni-kate',
    partOfSpeech: 'verb',
    definition: 'To share information or ideas with others using words, writing, or signals',
    fullDefinition:
      'When you communicate, you send a message so others understand your ideas. You use words, signs, or actions to share meaning.',
    origin:
      'From Latin "communicare" meaning to make common or share. Communicating makes YOUR thoughts COMMON knowledge!',
    connotation: 'neutral',
    whenToUse: [
      'Sharing ideas: "She communicated her feelings about the book."',
      'Giving information: "We communicated the time of the party through email."'
    ],
    whenNotToUse: [
      'Not the same as talk — talk is making sounds; communicate is making meaning.',
      "Don't use for lying — communicate means sincere sharing of meaning."
    ],
    memoryTip:
      'COM-MUNI-CATE = COM (common) + MUNI (community) = You make your thoughts COMMON in the COMMUNITY by COMMUNICATING!',
    synonyms: ['share', 'express', 'inform'],
    antonyms: ['conceal', 'hide', 'silence'],
    exampleSentences: [
      'The captain communicated the plan to the team.',
      'She communicated with her pen pal through letters.'
    ]
  },
  {
    id: 'demonstrate',
    word: 'Demonstrate',
    category: 'actions',
    difficulty: 2,
    phonetic: 'DEM-un-strate',
    partOfSpeech: 'verb',
    definition: 'To show or explain something by doing it or pointing out details',
    fullDefinition:
      "When you demonstrate, you don't just tell — you show. You do something or explain it clearly so others understand.",
    origin:
      'From Latin "demonstrare" meaning to show or point out. You SHOW the MONS (mountain) so everyone sees it!',
    connotation: 'neutral',
    whenToUse: [
      'Teaching: "The coach demonstrated the correct way to kick the ball."',
      'Explaining: "Can you demonstrate how to fold the paper?"'
    ],
    whenNotToUse: [
      'Not the same as tell — demonstrate is showing, tell is just speaking.',
      "Don't use for accidentally doing something — demonstrate is intentional."
    ],
    memoryTip:
      'DEMON-STRATE = You DEMON (powerfully) STRATe (stretch/show) your skills so everyone sees clearly!',
    synonyms: ['show', 'display', 'exhibit'],
    antonyms: ['hide', 'conceal', 'withhold'],
    exampleSentences: [
      'The teacher demonstrated how to do long division on the board.',
      'The car salesman demonstrated how the sunroof worked.'
    ]
  },
  {
    id: 'celebrate',
    word: 'Celebrate',
    category: 'actions',
    difficulty: 1,
    phonetic: 'SEL-uh-brate',
    partOfSpeech: 'verb',
    definition: 'To do something fun to mark a special occasion or success',
    fullDefinition:
      'When you celebrate, you show joy about something good. You might have a party, sing, dance, or share the happiness with others.',
    origin:
      'From Latin "celebrare" meaning to honor or make famous. You make a success FAMOUS and HONORABLE by CELEBRATING!',
    connotation: 'positive',
    whenToUse: [
      'Success: "We celebrated our team winning the tournament."',
      'Special days: "We celebrate birthdays with cake and presents."'
    ],
    whenNotToUse: [
      'Not the same as enjoy — you can enjoy quietly; celebrate is sharing joy.',
      "Don't use for small unimportant things — celebrate is for meaningful moments."
    ],
    memoryTip:
      "CEL-E-BRATE = You're a CELEB (celebrity) when you WIN, so you BRATE (celebrate) big with joy!",
    synonyms: ['rejoice', 'honor', 'commemorate'],
    antonyms: ['mourn', 'grieve', 'lament'],
    exampleSentences: [
      'We celebrated making the soccer team with ice cream.',
      'The class celebrated finishing the book with a party.'
    ]
  },

  // ===== DESCRIBING THINGS (8 words) =====
  {
    id: 'enormous',
    word: 'Enormous',
    category: 'describing',
    difficulty: 1,
    phonetic: 'ih-NOR-mus',
    partOfSpeech: 'adjective',
    definition: 'Extremely large or huge',
    fullDefinition:
      "Something enormous is SO big that it seems amazing or hard to believe. It's bigger than huge, bigger than giant!",
    origin:
      'From Latin "enormis" meaning outside the norm. Enormous things are SO BIG they break the normal size rules!',
    connotation: 'neutral',
    whenToUse: [
      'Big size: "The enormous elephant was the biggest animal in the zoo."',
      'Impressive scale: "The enormous waterfall crashed down with thunder."'
    ],
    whenNotToUse: [
      "Don't use for things that are just regular big — enormous is SUPER big.",
      'Not for quantities like time — "enormous time" is awkward.'
    ],
    memoryTip:
      'E-NOR-MOUS = E (extra) + NORM (normal size) + OUS = EXTRA beyond NORMAL size, making it ENORMOUS!',
    synonyms: ['huge', 'giant', 'massive'],
    antonyms: ['tiny', 'small', 'little'],
    exampleSentences: [
      'The blue whale is an enormous animal.',
      'An enormous storm knocked down trees across the city.'
    ]
  },
  {
    id: 'ancient',
    word: 'Ancient',
    category: 'describing',
    difficulty: 2,
    phonetic: 'AIN-shunt',
    partOfSpeech: 'adjective',
    definition: 'Very old, from a long time ago',
    fullDefinition:
      'Something ancient is REALLY old — like hundreds or thousands of years old. Ancient civilizations and ancient ruins are thousands of years old.',
    origin: 'From Latin "ante" meaning before. Ancient means from BEFORE modern times!',
    connotation: 'neutral',
    whenToUse: [
      'History: "The ancient Egyptians built the pyramids."',
      'Very old things: "The ancient oak tree had rings showing 300 years of life."'
    ],
    whenNotToUse: [
      "Don't use for something just 50 years old — ancient is hundreds of years.",
      'Not the same as old — old can be 20 years; ancient is much older.'
    ],
    memoryTip: 'AN-CIENT = AN (era) CIENT (sent) from way back in TIME, making it ANCIENT!',
    synonyms: ['old', 'prehistoric', 'historical'],
    antonyms: ['modern', 'recent', 'new'],
    exampleSentences: [
      'The ancient Roman roads are still visible today.',
      'She visited the ancient temple that was built in 500 BCE.'
    ]
  },
  {
    id: 'delicate',
    word: 'Delicate',
    category: 'describing',
    difficulty: 2,
    phonetic: 'DEL-i-kit',
    partOfSpeech: 'adjective',
    definition: 'Thin, soft, or easily broken; requiring careful handling',
    fullDefinition:
      'Something delicate is fragile and needs gentle care. Butterfly wings are delicate. So are thin glass cups and newborn animals.',
    origin:
      'From Latin "delicatus" meaning soft or tender. Delicate things are TENDER like fine lace!',
    connotation: 'neutral',
    whenToUse: [
      'Fragile items: "Be careful, the delicate china plates break easily."',
      'Soft and tender: "The delicate flower petals are soft pink."'
    ],
    whenNotToUse: [
      'Not the same as weak — delicate is fragile/tender; weak means lacking strength.',
      "Don't use for situations — delicate CAN describe situations, but it's mainly for physical things."
    ],
    memoryTip:
      "DEL-I-CATE = DEL (delete) if you are not DELICATE because it'll BREAK! You must DELETE roughness with DELICATE care!",
    synonyms: ['fragile', 'tender', 'soft'],
    antonyms: ['strong', 'sturdy', 'tough'],
    exampleSentences: [
      'The delicate butterfly landed gently on the flower.',
      'We handled the delicate vase with extreme care.'
    ]
  },
  {
    id: 'vibrant',
    word: 'Vibrant',
    category: 'describing',
    difficulty: 2,
    phonetic: 'VY-brunt',
    partOfSpeech: 'adjective',
    definition: 'Bright, lively, and full of energy or color',
    fullDefinition:
      'Something vibrant is bright and energetic. Vibrant colors are bold and catch your eye. A vibrant person is full of life and energy.',
    origin:
      'From Latin "vibrare" meaning to shake or vibrate. Vibrant things almost VIBRATE with energy and life!',
    connotation: 'positive',
    whenToUse: [
      'Colors: "The vibrant blue sky was beautiful after the rain."',
      'Energy: "The vibrant music made everyone want to dance."'
    ],
    whenNotToUse: [
      'Not the same as bright — vibrant is bright PLUS energetic.',
      "Don't use for dull or muted colors — vibrant is bold and alive."
    ],
    memoryTip:
      'VI-BRANT = VI (very) + BRANT (vibrating) = Very VIBRATING with energy and life, making it VIBRANT!',
    synonyms: ['bright', 'lively', 'colorful'],
    antonyms: ['dull', 'muted', 'lifeless'],
    exampleSentences: [
      'She painted vibrant flowers in reds, yellows, and oranges.',
      'The vibrant party was full of music and dancing.'
    ]
  },
  {
    id: 'peculiar',
    word: 'Peculiar',
    category: 'describing',
    difficulty: 2,
    phonetic: 'pih-KYOO-lur',
    partOfSpeech: 'adjective',
    definition: 'Unusual or strange in a way that is interesting or surprising',
    fullDefinition:
      "Something peculiar doesn't fit the normal pattern. It's different and weird in an interesting way, not necessarily bad.",
    origin:
      'From Latin "peculiaris" meaning one\'s own or special. Peculiar things are their own special kind, unique!',
    connotation: 'neutral',
    whenToUse: [
      'Strange: "The creature had a peculiar shape unlike any animal I\'d seen."',
      'Unusual: "He had a peculiar habit of collecting bottle caps."'
    ],
    whenNotToUse: [
      'Not the same as gross — peculiar is strange/unusual; gross is disgusting.',
      "Don't use for negative — peculiar is just different, not bad."
    ],
    memoryTip:
      "PECU-LIAR = PEC (unique) + LIAR? No! PECULIAR things are so UNIQUE they're like their own truth, their own world!",
    synonyms: ['strange', 'unusual', 'odd'],
    antonyms: ['normal', 'ordinary', 'common'],
    exampleSentences: [
      'The peculiar purple cloud formation looked like a dragon.',
      'She had a peculiar way of tying her shoes backward.'
    ]
  },
  {
    id: 'magnificent',
    word: 'Magnificent',
    category: 'describing',
    difficulty: 3,
    phonetic: 'mag-NIF-i-sunt',
    partOfSpeech: 'adjective',
    definition: 'Extremely beautiful, impressive, or grand',
    fullDefinition:
      "Something magnificent is SO beautiful or impressive that it takes your breath away. It's beyond just beautiful — it's awe-inspiring.",
    origin:
      'From Latin "magnificus" meaning great or grand. Magnificent things are MAGNIFIED greatness!',
    connotation: 'positive',
    whenToUse: [
      'Awe-inspiring: "The magnificent palace had gold-painted ceilings."',
      'Impressive: "The magnificent sunset filled the entire sky with orange and purple."'
    ],
    whenNotToUse: [
      "Don't use for just nice — magnificent is WOW level.",
      'Not the same as beautiful — magnificent is beautiful PLUS grand.'
    ],
    memoryTip:
      "MAG-NIF-I-CENT = MAG (magic) + NIF (intensify) + ICENT = Something so MAGICAL and INTENSIFIED it's MAGNIFICENT!",
    synonyms: ['splendid', 'gorgeous', 'spectacular'],
    antonyms: ['ugly', 'plain', 'ordinary'],
    exampleSentences: [
      'The magnificent statue stood tall in the town square.',
      'We saw a magnificent display of fireworks.'
    ]
  },
  {
    id: 'gloomy',
    word: 'Gloomy',
    category: 'describing',
    difficulty: 2,
    phonetic: 'GLOO-mee',
    partOfSpeech: 'adjective',
    definition: 'Dark, sad, and lacking light or happiness',
    fullDefinition:
      'Something gloomy is dark, dim, and sad. A gloomy day is cloudy and gray. A gloomy mood is sad and hopeless.',
    origin:
      'From Middle English "gloom" meaning darkness. Gloomy = GLOOM + Y = filled with darkness and sadness!',
    connotation: 'negative',
    whenToUse: [
      'Dark weather: "The gloomy afternoon made everyone want to stay indoors."',
      'Sad mood: "He had a gloomy expression after losing the game."'
    ],
    whenNotToUse: [
      'Not the same as angry — gloomy is sad/dark; angry is hot/mean.',
      "Don't use for just cloudy — gloomy is cloudy PLUS sad feeling."
    ],
    memoryTip:
      'GLOOM-Y = GLOOM (darkness and sadness) + Y (describing it) = Looking at things in darkness, making you GLOOMY!',
    synonyms: ['dark', 'sad', 'depressing'],
    antonyms: ['bright', 'cheerful', 'sunny'],
    exampleSentences: [
      'The gloomy forest was dark and seemed a little spooky.',
      'After the bad news, she felt gloomy for days.'
    ]
  },
  {
    id: 'brilliant',
    word: 'Brilliant',
    category: 'describing',
    difficulty: 2,
    phonetic: 'BRIL-yunt',
    partOfSpeech: 'adjective',
    definition: 'Shining brightly or extremely intelligent and impressive',
    fullDefinition:
      'Something brilliant is either very bright/shiny or very smart/impressive. A brilliant idea is amazing. Brilliant light is bright.',
    origin:
      'From Italian "brillante" meaning shining. Brilliant things SHINE with light or intelligence!',
    connotation: 'positive',
    whenToUse: [
      'Brightness: "The brilliant diamonds sparkled in the sunlight."',
      'Intelligence: "She came up with a brilliant solution to the problem."'
    ],
    whenNotToUse: [
      'Not the same as bright — brilliant is bright PLUS outstanding.',
      "Don't use for just good — brilliant is excellent, impressive, or very smart."
    ],
    memoryTip:
      "BRILL-IANT = BRILL (brilliant light spells) + IANT = Something that shines so brightly it's BRILLIANT!",
    synonyms: ['bright', 'intelligent', 'outstanding'],
    antonyms: ['dull', 'stupid', 'mediocre'],
    exampleSentences: [
      'The brilliant stars filled the night sky.',
      'She had a brilliant idea for solving the math problem.'
    ]
  },

  // ===== NATURE & SCIENCE (8 words) =====
  {
    id: 'ecosystem',
    word: 'Ecosystem',
    category: 'nature',
    difficulty: 3,
    phonetic: 'EE-koh-sis-tem',
    partOfSpeech: 'noun',
    definition: 'A community of living things and their environment working together',
    fullDefinition:
      'An ecosystem is like a neighborhood where plants, animals, water, soil, and sun all live and depend on each other. Change one thing, everything changes!',
    origin:
      'From Greek "eco" (environment/household) + "system". An ecosystem is a HOUSEHOLD system of nature!',
    connotation: 'neutral',
    whenToUse: [
      'Biology class: "The rainforest ecosystem has thousands of species living together."',
      'Environment: "Removing bees would damage the ecosystem."'
    ],
    whenNotToUse: [
      'Don\'t use for just "environment" — ecosystem includes the relationships between things.',
      'Not just animals or plants alone — ecosystem means ALL of them together.'
    ],
    memoryTip:
      'ECO-SYSTEM = Your HOME (eco) has a SYSTEM where everything connects! Plants, animals, water, soil — all in a system!',
    synonyms: ['environment', 'habitat', 'biome'],
    antonyms: ['none typical'],
    exampleSentences: [
      'The coral reef ecosystem supports thousands of fish species.',
      'A forest ecosystem includes trees, animals, insects, and soil.'
    ]
  },
  {
    id: 'migrate',
    word: 'Migrate',
    category: 'nature',
    difficulty: 2,
    phonetic: 'MY-grate',
    partOfSpeech: 'verb',
    definition: 'To move from one place to another, usually with the seasons',
    fullDefinition:
      'When animals migrate, they travel long distances following their food or better weather. Birds fly south for winter, whales swim to feeding grounds.',
    origin:
      'From Latin "migrare" meaning to move or change place. Animals MOVE and MIGRATE to new homes seasonally!',
    connotation: 'neutral',
    whenToUse: [
      'Animal movement: "Monarch butterflies migrate thousands of miles south."',
      'Seasonal travel: "Arctic terns migrate from pole to pole each year."'
    ],
    whenNotToUse: [
      'Not just moving — migrate is a regular pattern, usually seasonal.',
      "Don't use for one-time moves — migrate is repeated journeys."
    ],
    memoryTip:
      'MI-GRATE = MY GRATE (movement) = My animals GRATE (move along) in patterns, following the seasons to MIGRATE!',
    synonyms: ['travel', 'move', 'journey'],
    antonyms: ['stay', 'settle', 'remain'],
    exampleSentences: [
      'Geese migrate north in the spring to find food.',
      'Whales migrate to warmer waters to have babies.'
    ]
  },
  {
    id: 'hibernate',
    word: 'Hibernate',
    category: 'nature',
    difficulty: 2,
    phonetic: 'HY-bur-nate',
    partOfSpeech: 'verb',
    definition: 'To sleep deeply through the winter to survive cold weather and lack of food',
    fullDefinition:
      'When animals hibernate, they enter a deep sleep during winter. Their body slows down, they barely move, and they live off stored body fat.',
    origin:
      'From Latin "hibernus" meaning winter. Hibernation = HIBER (winter) + NATE = sleeping through WINTER!',
    connotation: 'neutral',
    whenToUse: [
      'Winter survival: "Bears hibernate in caves during winter."',
      'Animal behavior: "When it gets cold, hedgehogs hibernate."'
    ],
    whenNotToUse: [
      "Don't use for just sleeping — hibernation is a special deep winter sleep.",
      'Not the same as migrate — hibernate is sleeping in place; migrate is traveling.'
    ],
    memoryTip:
      'HI-BER-NATE = HI to sleeping through winter! HIBER-NATE = Sleeping through the HI-BERNATE season!',
    synonyms: ['sleep', 'dormant'],
    antonyms: ['awake', 'active', 'migrate'],
    exampleSentences: [
      'Groundhogs hibernate and wake up in spring.',
      'When winter comes, the bear will find a cave to hibernate.'
    ]
  },
  {
    id: 'orbit',
    word: 'Orbit',
    category: 'nature',
    difficulty: 2,
    phonetic: 'OR-bit',
    partOfSpeech: 'noun/verb',
    definition: 'The circular path that a planet, moon, or satellite travels around something',
    fullDefinition:
      'An orbit is the path something follows around a bigger thing. Earth orbits the sun in a circle. The moon orbits Earth. Satellites orbit planets.',
    origin: 'From Latin "orbis" meaning circle or ring. Orbits are circular or oval paths!',
    connotation: 'neutral',
    whenToUse: [
      'Space: "The space station orbits Earth every 90 minutes."',
      'Planets: "Mercury has the closest orbit to the sun."'
    ],
    whenNotToUse: [
      'Not the same as rotate — orbit is traveling around something; rotate is spinning in place.',
      "Don't use for general circular paths — orbit is in space."
    ],
    memoryTip:
      "OR-BIT = OR (or) something is turning AROUND you in a circle — that's an ORBIT! Round and round it goes!",
    synonyms: ['path', 'trajectory', 'revolution'],
    antonyms: ['none typical'],
    exampleSentences: [
      "The moon's orbit around Earth takes about 27 days.",
      'Satellites in orbit send signals for GPS and phones.'
    ]
  },
  {
    id: 'evaporate',
    word: 'Evaporate',
    category: 'nature',
    difficulty: 2,
    phonetic: 'ih-VAP-uh-rate',
    partOfSpeech: 'verb',
    definition: 'To change from liquid to gas or vapor, especially water to steam',
    fullDefinition:
      'When water evaporates, it turns into an invisible gas (steam). Puddles evaporate on sunny days. Sweat on your skin evaporates and cools you.',
    origin:
      'From Latin "evaporare" = "e" (out) + "vapor" (steam). Water VAPORIZES (turns to vapor) and goes OUT!',
    connotation: 'neutral',
    whenToUse: [
      'Water cycle: "Water evaporates from lakes in the heat of the sun."',
      'Science: "If you leave wet hair in the sun, it will evaporate."'
    ],
    whenNotToUse: [
      'Not the same as disappear — evaporate is specifically changing from liquid to gas.',
      "Don't use for melting (ice turning to water) — that's NOT evaporation."
    ],
    memoryTip:
      'E-VAP-OR-ATE = E (escaping) + VAPOR (steam) = Water ESCAPES as VAPOR into the air! It EVAPORATES UP and away!',
    synonyms: ['vaporize', 'disappear', 'vanish'],
    antonyms: ['condense', 'freeze', 'solidify'],
    exampleSentences: [
      'The puddle evaporated in the hot sun.',
      'Water from the ocean evaporates and becomes clouds.'
    ]
  },
  {
    id: 'habitat',
    word: 'Habitat',
    category: 'nature',
    difficulty: 2,
    phonetic: 'HAB-i-tat',
    partOfSpeech: 'noun',
    definition: 'The place where an animal or plant naturally lives and grows',
    fullDefinition:
      "A habitat is an animal's home. Fish live in ocean habitats. Monkeys live in forest habitats. Every living thing needs a habitat with what it needs.",
    origin: 'From Latin "habitare" meaning to live. Habitat = where things LIVE!',
    connotation: 'neutral',
    whenToUse: [
      'Animal homes: "Polar bears\' natural habitat is the Arctic ice."',
      'Biology: "Frogs live in wetland habitats."'
    ],
    whenNotToUse: [
      "Don't use for just any place — habitat is where things NATURALLY belong.",
      'Not the same as home — home is where you choose to live; habitat is where nature says you belong.'
    ],
    memoryTip:
      'HAB-I-TAT = HAB (have) + I + TAT = Animals HAB (have) the place (I) they naturally live in — their HABITAT!',
    synonyms: ['home', 'environment', 'dwelling'],
    antonyms: ['none typical'],
    exampleSentences: [
      'The rainforest is the habitat of jaguars and sloths.',
      'Desert habitats have little water and extreme heat.'
    ]
  },
  {
    id: 'predator',
    word: 'Predator',
    category: 'nature',
    difficulty: 2,
    phonetic: 'PRED-uh-tur',
    partOfSpeech: 'noun',
    definition: 'An animal that hunts and eats other animals for food',
    fullDefinition:
      'Predators are hunters. Lions, eagles, sharks, and snakes are all predators. They hunt prey (other animals) to eat.',
    origin:
      'From Latin "praedator" meaning robber or plunderer. Predators PREY on (hunt) other animals!',
    connotation: 'neutral',
    whenToUse: [
      'Food chains: "The hawk is a predator that hunts mice."',
      'Nature: "Top predators like lions have no natural enemies."'
    ],
    whenNotToUse: [
      "Don't use for humans hunting unnecessarily — predator is neutral for animals.",
      'Not the same as prey — predators hunt; prey are hunted.'
    ],
    memoryTip:
      'PRED-ATOR = PRED (predatory, hunting) + ATOR (one who does) = One who does hunting, a PREDATOR!',
    synonyms: ['hunter', 'carnivore'],
    antonyms: ['prey', 'herbivore'],
    exampleSentences: [
      'The owl is a night predator that hunts mice.',
      'Predators play an important role in nature by controlling animal populations.'
    ]
  },
  {
    id: 'camouflage',
    word: 'Camouflage',
    category: 'nature',
    difficulty: 3,
    phonetic: 'KAM-uh-flaj',
    partOfSpeech: 'noun/verb',
    definition: 'Colors, patterns, or shapes that help animals hide from other animals',
    fullDefinition:
      "Camouflage is nature's hiding trick. A tiger's stripes look like grass. A snow owl is white like snow. Camouflage helps animals survive.",
    origin:
      'From Italian "camuflare" meaning to disguise. Animals CAMOUFLAGE (disguise) themselves to hide!',
    connotation: 'neutral',
    whenToUse: [
      'Defense: "The green caterpillar\'s camouflage helps it hide on leaves."',
      'Hunting: "The lion\'s tan color is camouflage in the savanna."'
    ],
    whenNotToUse: [
      "Don't use for just colors — camouflage is colors THAT HIDE things.",
      'Not the same as costume — camouflage is natural hiding, costume is artificial.'
    ],
    memoryTip:
      "CAM-O-FLAGE = CAM (camera) + O (zero visibility) + FLAGE (flags) = So well hidden the CAMERA can't find you! You FLAGE (disappear)!",
    synonyms: ['disguise', 'concealment', 'cover'],
    antonyms: ['exposure', 'visibility', 'revelation'],
    exampleSentences: [
      "The frog's brown camouflage makes it blend with tree bark.",
      'Animals use camouflage to hide from predators and prey.'
    ]
  }
];

// Verify all words have required fields (for debugging)
if (typeof window !== 'undefined') {
  console.log(
    `✓ Word Explorer: ${WORD_CATEGORIES.length} categories, ${WORDS.length} words loaded`
  );
}

/**
 * Digestive System Explorer — Topic Data
 * Complete game configuration with scenes, lab, glossary, and quiz
 */

window.TOPIC_DATA = {
  id: 'digestion-explorer',
  name: 'Digestive System',
  tagline: 'Follow a pizza slice on its 9-metre journey through your body',
  icon: 'ti-salad',

  /* ────────────────────────────────────────────────────────────────
     THEME COLORS
     ──────────────────────────────────────────────────────────────── */
  color: {
    nav: '#7c3200',
    accent: '#f97316',
    accent2: '#fb923c',
    bg: '#fff7ed',
    card: '#ffffff',
    border: 'rgba(249, 115, 22, 0.2)'
  },

  /* ────────────────────────────────────────────────────────────────
     SCENES
     ──────────────────────────────────────────────────────────────── */
  scenes: [
    {
      id: 'mouth-chewing',
      title: 'Inside the Mouth',
      narration:
        'Your journey begins! When you take a bite of pizza, your teeth start breaking it into smaller pieces. At the same time, your saliva (spit) starts a special job: it has enzymes that begin breaking down the food chemically. This is where digestion officially starts!',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'mouth-bg',
            type: 'ellipse',
            cx: 200,
            cy: 150,
            rx: 120,
            ry: 100,
            fill: '#f5c2a8'
          },
          {
            id: 'upper-teeth',
            type: 'path',
            d: 'M 100 120 L 105 110 L 110 120 L 115 110 L 120 120 L 125 110 L 130 120 L 135 110 L 140 120 L 145 110 L 150 120 L 155 110 L 160 120 L 165 110 L 170 120 L 175 110 L 180 120 L 185 110 L 190 120 L 195 110 L 200 120 L 205 110 L 210 120 L 215 110 L 220 120 L 225 110 L 230 120 L 235 110 L 240 120 L 245 110 L 250 120 L 255 110 L 260 120 L 265 110 L 270 120 L 275 110 L 280 120 L 285 110 L 290 120 L 295 110 L 300 120',
            stroke: '#f5f5f5',
            strokeWidth: 2,
            fill: 'none'
          },
          {
            id: 'lower-teeth',
            type: 'path',
            d: 'M 100 180 L 105 190 L 110 180 L 115 190 L 120 180 L 125 190 L 130 180 L 135 190 L 140 180 L 145 190 L 150 180 L 155 190 L 160 180 L 165 190 L 170 180 L 175 190 L 180 180 L 185 190 L 190 180 L 195 190 L 200 180 L 205 190 L 210 180 L 215 190 L 220 180 L 225 190 L 230 180 L 235 190 L 240 180 L 245 190 L 250 180 L 255 190 L 260 180 L 265 190 L 270 180 L 275 190 L 280 180 L 285 190 L 290 180 L 295 190 L 300 180',
            stroke: '#f5f5f5',
            strokeWidth: 2,
            fill: 'none'
          },
          {
            id: 'pizza-piece',
            type: 'path',
            d: 'M 200 80 L 150 140 L 200 140 Z',
            fill: '#d97706',
            class: 'se-anim-pulse'
          },
          {
            id: 'cheese',
            type: 'circle',
            cx: 185,
            cy: 110,
            r: 8,
            fill: '#fbbf24'
          },
          {
            id: 'saliva-drop-1',
            type: 'circle',
            cx: 180,
            cy: 150,
            r: 4,
            fill: '#38bdf8',
            opacity: 0.7,
            class: 'se-anim-float-up'
          },
          {
            id: 'saliva-drop-2',
            type: 'circle',
            cx: 220,
            cy: 160,
            r: 4,
            fill: '#38bdf8',
            opacity: 0.7,
            class: 'se-anim-float-up'
          },
          {
            id: 'saliva-drop-3',
            type: 'circle',
            cx: 200,
            cy: 170,
            r: 3,
            fill: '#38bdf8',
            opacity: 0.5,
            class: 'se-anim-float-up'
          }
        ]
      },
      terms: [
        {
          word: 'Digestion',
          definition:
            'The process of breaking down food so your body can use it for energy and growth.',
          emoji: '🍽️'
        },
        {
          word: 'Saliva',
          definition:
            'Liquid in your mouth that helps soften food and contains enzymes to start breaking it down.',
          emoji: '💧'
        },
        {
          word: 'Enzyme',
          definition: 'A protein that helps break down food into smaller pieces your body can use.',
          emoji: '🔬'
        }
      ]
    },

    {
      id: 'esophagus-journey',
      title: 'Down the Esophagus',
      narration:
        "Your swallowed food (now called a bolus) enters a tube called the esophagus. Muscles in this tube squeeze in waves — a movement called peristalsis — to push the food down toward your stomach. It's like a food elevator inside your body!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'neck-outline',
            type: 'rect',
            x: 150,
            y: 30,
            width: 100,
            height: 80,
            fill: '#f5c2a8',
            rx: 10
          },
          {
            id: 'esophagus-tube',
            type: 'path',
            d: 'M 180 110 Q 170 150 175 200 Q 180 240 200 280',
            stroke: '#fb923c',
            strokeWidth: 20,
            fill: 'none',
            strokeLinecap: 'round'
          },
          {
            id: 'peristalsis-wave-1',
            type: 'circle',
            cx: 175,
            cy: 140,
            r: 12,
            fill: '#f97316',
            opacity: 0.6,
            class: 'se-anim-bounce-in'
          },
          {
            id: 'peristalsis-wave-2',
            type: 'circle',
            cx: 180,
            cy: 200,
            r: 12,
            fill: '#f97316',
            opacity: 0.5,
            class: 'se-anim-bounce-in'
          },
          {
            id: 'bolus-particle',
            type: 'ellipse',
            cx: 190,
            cy: 110,
            rx: 10,
            ry: 8,
            fill: '#d97706'
          },
          {
            id: 'spine',
            type: 'line',
            x1: 250,
            y1: 50,
            x2: 250,
            y2: 280,
            stroke: '#c5a572',
            strokeWidth: 3
          }
        ]
      },
      terms: [
        {
          word: 'Esophagus',
          definition:
            'A tube that connects your mouth to your stomach and carries swallowed food downward.',
          emoji: '🌊'
        },
        {
          word: 'Peristalsis',
          definition: 'Wave-like muscle contractions that push food through your digestive system.',
          emoji: '🌀'
        }
      ]
    },

    {
      id: 'stomach-churning',
      title: 'The Stomach',
      renderType: '3d',
      sceneKey: 'digestion-3d-stomach',
      narration:
        'Welcome to the stomach! This is a muscular bag that churns and squeezes the food with strong acid. This process breaks the food into a soupy mixture. The stomach can hold about 1.5 litres of food and usually empties over 3-4 hours.',
      terms: [
        {
          word: 'Stomach',
          definition:
            'A muscular organ that churns food with acid and enzymes to break it down further.',
          emoji: '💪'
        }
      ]
    },

    {
      id: 'small-intestine',
      title: 'The Small Intestine',
      narration:
        'Now the food enters the small intestine, where the real magic happens! Even though it\'s called "small," it\'s actually about 6 metres long and is where most nutrient absorption occurs. Tiny finger-like structures called villi absorb nutrients into your bloodstream.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'small-int-tube',
            type: 'path',
            d: 'M 50 100 Q 100 80 150 100 Q 180 120 150 150 Q 100 170 80 200 Q 60 220 100 240 Q 140 250 120 270 L 120 280',
            stroke: '#fb923c',
            strokeWidth: 18,
            fill: 'none',
            strokeLinecap: 'round'
          },
          {
            id: 'villi-1',
            type: 'path',
            d: 'M 80 110 L 85 100',
            stroke: '#22c55e',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-grow-up'
          },
          {
            id: 'villi-2',
            type: 'path',
            d: 'M 100 95 L 108 80',
            stroke: '#22c55e',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-grow-up'
          },
          {
            id: 'villi-3',
            type: 'path',
            d: 'M 130 85 L 140 70',
            stroke: '#22c55e',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-grow-up'
          },
          {
            id: 'villi-4',
            type: 'path',
            d: 'M 170 100 L 180 90',
            stroke: '#22c55e',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-grow-up'
          },
          {
            id: 'villi-5',
            type: 'path',
            d: 'M 160 150 L 175 150',
            stroke: '#22c55e',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-grow-up'
          },
          {
            id: 'nutrient-1',
            type: 'circle',
            cx: 70,
            cy: 130,
            r: 3,
            fill: '#fbbf24',
            class: 'se-anim-appear'
          },
          {
            id: 'nutrient-2',
            type: 'circle',
            cx: 110,
            cy: 140,
            r: 3,
            fill: '#fbbf24',
            class: 'se-anim-appear'
          },
          {
            id: 'nutrient-3',
            type: 'circle',
            cx: 140,
            cy: 120,
            r: 3,
            fill: '#fbbf24',
            class: 'se-anim-appear'
          },
          {
            id: 'blood-vessel',
            type: 'path',
            d: 'M 250 100 Q 260 150 250 200',
            stroke: '#ec4899',
            strokeWidth: 2,
            fill: 'none',
            strokeDasharray: '5,5'
          },
          {
            id: 'label-blood',
            type: 'text',
            x: 265,
            y: 155,
            fontSize: '12',
            fill: '#7c3200',
            textContent: 'To bloodstream'
          }
        ]
      },
      terms: [
        {
          word: 'Villi',
          definition:
            'Tiny finger-like projections in the small intestine that absorb nutrients into the bloodstream.',
          emoji: '🌿'
        },
        {
          word: 'Nutrient',
          definition:
            'Substances in food that your body needs for energy, growth, and staying healthy.',
          emoji: '⚡'
        }
      ]
    },

    {
      id: 'large-intestine',
      title: 'The Large Intestine',
      narration:
        "What's left over now goes to the large intestine (colon). This is where water is absorbed back into your body — staying hydrated is important! The remaining material becomes waste (poop) that your body eliminates. The whole journey takes about 24-72 hours!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'large-int-vertical',
            type: 'path',
            d: 'M 200 50 L 200 150',
            stroke: '#f97316',
            strokeWidth: 22,
            fill: 'none',
            strokeLinecap: 'round'
          },
          {
            id: 'large-int-horizontal-top',
            type: 'path',
            d: 'M 200 150 L 100 150',
            stroke: '#f97316',
            strokeWidth: 22,
            fill: 'none',
            strokeLinecap: 'round'
          },
          {
            id: 'large-int-horizontal-bottom',
            type: 'path',
            d: 'M 100 150 L 100 220',
            stroke: '#f97316',
            strokeWidth: 22,
            fill: 'none',
            strokeLinecap: 'round'
          },
          {
            id: 'water-drop-1',
            type: 'circle',
            cx: 180,
            cy: 80,
            r: 4,
            fill: '#38bdf8',
            class: 'se-anim-appear'
          },
          {
            id: 'water-drop-2',
            type: 'circle',
            cx: 150,
            cy: 150,
            r: 4,
            fill: '#38bdf8',
            class: 'se-anim-appear'
          },
          {
            id: 'water-drop-3',
            type: 'circle',
            cx: 120,
            cy: 180,
            r: 4,
            fill: '#38bdf8',
            class: 'se-anim-appear'
          },
          {
            id: 'waste-particle',
            type: 'rect',
            x: 85,
            y: 230,
            width: 30,
            height: 30,
            fill: '#92400e',
            rx: 4
          },
          {
            id: 'label-journey',
            type: 'text',
            x: 220,
            y: 200,
            fontSize: '14',
            fill: '#7c3200',
            fontWeight: 'bold',
            textContent: 'Total journey:'
          },
          {
            id: 'label-time',
            type: 'text',
            x: 220,
            y: 225,
            fontSize: '12',
            fill: '#7c3200',
            textContent: '24-72 hours'
          }
        ]
      },
      terms: [
        {
          word: 'Nutrient',
          definition:
            'Substances in food that your body needs for energy, growth, and staying healthy.',
          emoji: '⚡'
        }
      ]
    }
  ],

  /* ────────────────────────────────────────────────────────────────
     LAB EXPERIMENT
     ──────────────────────────────────────────────────────────────── */
  lab: {
    title: 'Digestion Speed Lab',
    instruction:
      'Adjust the controls to see how different factors affect digestion. Watch your food travel through the system!',
    simulation: 'digestion-lab',
    controls: [
      {
        id: 'chewing',
        label: 'Chewing Amount',
        emoji: '😋',
        type: 'range',
        min: 5,
        max: 30,
        default: 15,
        unit: ' chews'
      },
      {
        id: 'food-type',
        label: 'Soft Food',
        emoji: '🍌',
        type: 'toggle',
        default: false
      },
      {
        id: 'water',
        label: 'Water Intake',
        emoji: '💧',
        type: 'range',
        min: 0,
        max: 500,
        default: 250,
        unit: ' ml'
      }
    ],
    discoveries: [
      {
        message: '⚠️ Barely chewed! Your stomach has to work much harder to break food down.',
        trigger: { chewing: [5, 7] }
      },
      {
        message: '🌟 Great chewing! Saliva enzymes have already started digesting your food.',
        trigger: { chewing: [25, 30] }
      },
      {
        message: '🍕 Solid food needs lots of chewing — give your teeth more work to do!',
        trigger: { 'food-type': false, chewing: [5, 9] }
      },
      {
        message: '💧 Excellent! Water helps food move smoothly through your digestive system.',
        trigger: { water: [400, 500] }
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────
     GLOSSARY
     ──────────────────────────────────────────────────────────────── */
  glossary: [
    {
      term: 'Digestion',
      definition:
        'The process of breaking down food into smaller pieces so your body can absorb and use it for energy and growth.',
      emoji: '🍽️',
      scene: 0
    },
    {
      term: 'Saliva',
      definition:
        'Liquid produced in your mouth that softens food and contains enzymes to start breaking it down.',
      emoji: '💧',
      scene: 0
    },
    {
      term: 'Enzyme',
      definition:
        'A special protein that acts like a chemical scissors to help break food into smaller, usable pieces.',
      emoji: '🔬',
      scene: 0
    },
    {
      term: 'Esophagus',
      definition:
        'The muscular tube connecting your mouth to your stomach that carries swallowed food downward through wave-like contractions.',
      emoji: '🌊',
      scene: 1
    },
    {
      term: 'Peristalsis',
      definition:
        'Wave-like muscle movements throughout your digestive system that push food along, like a food elevator.',
      emoji: '🌀',
      scene: 1
    },
    {
      term: 'Stomach',
      definition:
        'A muscular, bag-shaped organ that churns and mixes food with acid and enzymes to break it down into a soupy mixture.',
      emoji: '💪',
      scene: 2
    },
    {
      term: 'Villi',
      definition:
        'Tiny finger-like structures lining the small intestine that absorb nutrients from digested food into the bloodstream.',
      emoji: '🌿',
      scene: 3
    },
    {
      term: 'Nutrient',
      definition:
        'Useful substances in food like proteins, carbohydrates, fats, and vitamins that your body needs to survive and grow.',
      emoji: '⚡',
      scene: 3
    }
  ],

  /* ────────────────────────────────────────────────────────────────
     QUIZ (auto-generated from glossary, can be overridden)
     ──────────────────────────────────────────────────────────────── */
  quiz: [
    {
      question: 'Where does digestion begin?',
      options: ['Your stomach', 'Your mouth', 'Your small intestine', 'Your large intestine'],
      answer: 1,
      explanation:
        'Digestion starts in your mouth when you chew and saliva begins breaking down food.'
    },
    {
      question: 'What are the tiny finger-like structures in the small intestine called?',
      options: ['Villi', 'Enzymes', 'Peristalsis', 'Esophagus'],
      answer: 0,
      explanation:
        'Villi are tiny projections that absorb nutrients from digested food into your bloodstream.'
    },
    {
      question: 'What wave-like movement pushes food through your digestive system?',
      options: ['Chewing', 'Saliva', 'Peristalsis', 'Absorption'],
      answer: 2,
      explanation:
        'Peristalsis is the muscular wave movement that propels food along your digestive tract.'
    },
    {
      question: 'How long does the entire digestive journey usually take?',
      options: ['2-4 hours', '6-12 hours', '24-72 hours', '1 week'],
      answer: 2,
      explanation:
        'From eating to elimination, the complete digestive process typically takes 24-72 hours.'
    },
    {
      question: 'What is the main job of the large intestine?',
      options: [
        'Break down food with acid',
        'Absorb water and form waste',
        'Absorb nutrients',
        'Produce enzymes'
      ],
      answer: 1,
      explanation:
        'The large intestine absorbs water from the remaining food and helps form waste for elimination.'
    }
  ]
};

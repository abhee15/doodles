/**
 * Photosynthesis Explorer — Topic Data
 * Complete game configuration with scenes, lab, glossary, and quiz
 */

window.TOPIC_DATA = {
  id: 'photosynthesis-explorer',
  name: 'Photosynthesis',
  tagline: 'How plants turn sunlight into food',
  icon: 'ti-plant-2',

  /* ────────────────────────────────────────────────────────────────
     THEME COLORS
     ──────────────────────────────────────────────────────────────── */
  color: {
    nav: '#166534',
    accent: '#4ade80',
    accent2: '#86efac',
    bg: '#f0fdf4',
    card: '#ffffff',
    border: 'rgba(74, 222, 128, 0.2)'
  },

  /* ────────────────────────────────────────────────────────────────
     SCENES
     ──────────────────────────────────────────────────────────────── */
  scenes: [
    {
      id: 'sun-energy',
      title: 'The Sun Sends Energy',
      narration:
        "The sun is our planet's power station. It sends out light energy that travels 150 million kilometres to reach Earth. Plants have evolved a special ability to capture this energy — and that's where our story begins.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun',
            type: 'circle',
            cx: 200,
            cy: 50,
            r: 40,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'ray-1',
            type: 'line',
            x1: 200,
            y1: 90,
            x2: 120,
            y2: 200,
            stroke: '#fde68a',
            strokeWidth: 3,
            class: 'se-anim-ray'
          },
          {
            id: 'ray-2',
            type: 'line',
            x1: 200,
            y1: 90,
            x2: 200,
            y2: 220,
            stroke: '#fde68a',
            strokeWidth: 3,
            class: 'se-anim-ray',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'ray-3',
            type: 'line',
            x1: 200,
            y1: 90,
            x2: 280,
            y2: 200,
            stroke: '#fde68a',
            strokeWidth: 3,
            class: 'se-anim-ray',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'leaf',
            type: 'ellipse',
            cx: 200,
            cy: 250,
            rx: 80,
            ry: 35,
            fill: '#4ade80',
            class: 'se-anim-appear'
          }
        ]
      },
      terms: [
        {
          word: 'Solar Energy',
          definition: 'Light and heat energy that comes from the sun.',
          emoji: '☀️',
          attachTo: '#sun',
          labelPosition: 'right'
        }
      ]
    },

    {
      id: 'water-intake',
      title: 'Water & Carbon Dioxide Enter',
      narration:
        'Plants need two key ingredients for photosynthesis: water from the soil and carbon dioxide from the air. Water travels up through the roots and into the leaves. Meanwhile, tiny pores called stomata on the leaf surface let CO₂ enter.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'soil',
            type: 'rect',
            x: 0,
            y: 220,
            width: 400,
            height: 80,
            fill: '#8d6e63'
          },
          {
            id: 'roots',
            type: 'path',
            d: 'M 200 220 Q 150 240 120 260 M 200 220 Q 250 240 280 260 M 200 220 L 200 240',
            stroke: '#6d4c41',
            strokeWidth: 3,
            fill: 'none'
          },
          {
            id: 'stem',
            type: 'line',
            x1: 200,
            y1: 220,
            x2: 200,
            y2: 100,
            stroke: '#4ade80',
            strokeWidth: 6
          },
          {
            id: 'leaf-main',
            type: 'ellipse',
            cx: 200,
            cy: 100,
            rx: 60,
            ry: 40,
            fill: '#4ade80'
          },
          {
            id: 'water-drop-1',
            type: 'circle',
            cx: 200,
            cy: 200,
            r: 4,
            fill: '#38bdf8',
            class: 'se-anim-float-up'
          },
          {
            id: 'water-drop-2',
            type: 'circle',
            cx: 200,
            cy: 210,
            r: 4,
            fill: '#38bdf8',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.3s'
          },
          {
            id: 'water-drop-3',
            type: 'circle',
            cx: 200,
            cy: 220,
            r: 4,
            fill: '#38bdf8',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.6s'
          },
          {
            id: 'co2-1',
            type: 'text',
            x: 140,
            y: 80,
            fontSize: 14,
            fill: '#999',
            textAnchor: 'middle',
            class: 'se-anim-appear'
          },
          {
            id: 'co2-2',
            type: 'text',
            x: 260,
            y: 80,
            fontSize: 14,
            fill: '#999',
            textAnchor: 'middle',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          }
        ]
      },
      terms: [
        {
          word: 'Carbon Dioxide',
          definition:
            'A gas in the air (CO₂) that plants absorb through tiny pores in their leaves.',
          emoji: '💨',
          attachTo: '#leaf-main',
          labelPosition: 'top'
        },
        {
          word: 'Stomata',
          definition: 'Tiny pores on the underside of leaves that let CO₂ in and oxygen out.',
          emoji: '🕳️',
          attachTo: '#leaf-main',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'inside-leaf',
      title: 'Inside the Leaf Cells',
      narration:
        'Inside each leaf cell are tiny structures called chloroplasts. These are like tiny factories. They contain a green pigment called chlorophyll that captures light energy. This is where the magic of photosynthesis really happens!',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'leaf-cell',
            type: 'rect',
            x: 50,
            y: 50,
            width: 300,
            height: 200,
            fill: '#c8e6c9',
            stroke: '#2e7d32',
            strokeWidth: 2
          },
          {
            id: 'chloroplast-1',
            type: 'ellipse',
            cx: 150,
            cy: 120,
            rx: 40,
            ry: 50,
            fill: '#4ade80',
            class: 'se-anim-appear'
          },
          {
            id: 'chloroplast-2',
            type: 'ellipse',
            cx: 280,
            cy: 140,
            rx: 35,
            ry: 45,
            fill: '#4ade80',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'light-arrow',
            type: 'path',
            d: 'M 80 80 L 100 100 M 100 100 L 95 95 M 100 100 L 105 95',
            stroke: '#fbbf24',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-ray'
          },
          {
            id: 'nucleus',
            type: 'circle',
            cx: 200,
            cy: 250,
            r: 15,
            fill: '#81c784',
            stroke: '#2e7d32',
            strokeWidth: 2
          }
        ]
      },
      terms: [
        {
          word: 'Chlorophyll',
          definition: 'The green pigment inside leaf cells that captures sunlight.',
          emoji: '🍃',
          attachTo: '#chloroplast-1',
          labelPosition: 'left'
        },
        {
          word: 'Chloroplast',
          definition: 'Tiny structures inside plant cells where photosynthesis happens.',
          emoji: '🔬',
          attachTo: '#chloroplast-2',
          labelPosition: 'right'
        }
      ]
    },

    {
      id: 'making-glucose',
      title: 'Making Food (Glucose)',
      narration:
        'The light energy captured by chlorophyll powers a chemical reaction. Water and carbon dioxide combine to create glucose — a sugar that plants use as food for energy and growth. This is the ultimate outcome of photosynthesis!',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'water-mol',
            type: 'text',
            x: 100,
            y: 100,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#38bdf8',
            textAnchor: 'middle',
            class: 'se-anim-appear'
          },
          {
            id: 'plus-1',
            type: 'text',
            x: 170,
            y: 100,
            fontSize: 24,
            fill: '#666',
            textAnchor: 'middle'
          },
          {
            id: 'co2-mol',
            type: 'text',
            x: 240,
            y: 100,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#999',
            textAnchor: 'middle',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'arrow',
            type: 'path',
            d: 'M 130 130 L 270 130 M 270 130 L 260 120 M 270 130 L 260 140',
            stroke: '#fbbf24',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-ray'
          },
          {
            id: 'glucose-mol',
            type: 'circle',
            cx: 200,
            cy: 200,
            r: 45,
            fill: '#f87171',
            class: 'se-anim-bounce-in'
          },
          {
            id: 'glucose-label',
            type: 'text',
            x: 200,
            y: 210,
            fontSize: 16,
            fontWeight: 'bold',
            fill: 'white',
            textAnchor: 'middle'
          }
        ]
      },
      terms: [
        {
          word: 'Glucose',
          definition: 'The sugar that plants produce as food during photosynthesis.',
          emoji: '🍬',
          attachTo: '#glucose-mol',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'oxygen-release',
      title: 'Oxygen Released',
      narration:
        'When plants split water molecules during photosynthesis, they release oxygen as a by-product. This oxygen escapes through the stomata and into the air we breathe. Without this process, there would be no oxygen for us and other animals to survive!',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'plant-body',
            type: 'ellipse',
            cx: 200,
            cy: 200,
            rx: 70,
            ry: 80,
            fill: '#4ade80'
          },
          {
            id: 'leaf-top',
            type: 'ellipse',
            cx: 200,
            cy: 100,
            rx: 60,
            ry: 40,
            fill: '#66bb6a'
          },
          {
            id: 'bubble-1',
            type: 'circle',
            cx: 180,
            cy: 120,
            r: 6,
            fill: '#38bdf8',
            class: 'se-anim-float-up'
          },
          {
            id: 'bubble-2',
            type: 'circle',
            cx: 200,
            cy: 100,
            r: 6,
            fill: '#38bdf8',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'bubble-3',
            type: 'circle',
            cx: 220,
            cy: 110,
            r: 6,
            fill: '#38bdf8',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'bubble-4',
            type: 'circle',
            cx: 240,
            cy: 130,
            r: 6,
            fill: '#38bdf8',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.6s'
          },
          {
            id: 'o2-label',
            type: 'text',
            x: 180,
            y: 70,
            fontSize: 20,
            fill: '#38bdf8',
            textAnchor: 'middle',
            class: 'se-anim-appear'
          }
        ]
      },
      terms: [
        {
          word: 'Oxygen',
          definition:
            'The gas that plants release as a by-product of photosynthesis — the air we breathe!',
          emoji: '🫧',
          attachTo: '#leaf-top',
          labelPosition: 'top'
        },
        {
          word: 'Photosynthesis',
          definition:
            'The process by which plants use sunlight, water, and CO₂ to make food (glucose) and release oxygen.',
          emoji: '🌿',
          attachTo: '#plant-body',
          labelPosition: 'right'
        }
      ]
    }
  ],

  /* ────────────────────────────────────────────────────────────────
     LAB EXPERIMENT
     ──────────────────────────────────────────────────────────────── */
  lab: {
    title: 'Lab: What Does the Plant Need?',
    instruction:
      'Adjust the sliders to see how each factor affects plant growth. Try removing one at a time to see what happens!',
    controls: [
      {
        id: 'sunlight',
        label: 'Sunlight',
        type: 'range',
        min: 0,
        max: 100,
        default: 70,
        unit: '%',
        emoji: '☀️'
      },
      {
        id: 'water',
        label: 'Water',
        type: 'range',
        min: 0,
        max: 100,
        default: 60,
        unit: '%',
        emoji: '💧'
      },
      {
        id: 'co2',
        label: 'Carbon Dioxide',
        type: 'toggle',
        default: true,
        emoji: '💨'
      }
    ],
    simulation: 'plant-growth',
    discoveries: [
      {
        trigger: { sunlight: [0, 10] },
        message: '🌑 No sunlight — photosynthesis stops completely! The plant cannot make food.'
      },
      {
        trigger: { water: [0, 10] },
        message: '🏜️ No water — the plant wilts and cannot absorb the nutrients it needs.'
      },
      {
        trigger: { co2: false },
        message: '🚫 No carbon dioxide — the plant has no raw material to work with.'
      },
      {
        trigger: { sunlight: [80, 100], water: [80, 100], co2: true },
        message: '🌟 Perfect conditions! The plant is thriving with maximum photosynthesis!'
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────
     GLOSSARY
     ──────────────────────────────────────────────────────────────── */
  glossary: [
    {
      term: 'Photosynthesis',
      definition:
        'The process by which plants use sunlight, water, and CO₂ to make food (glucose) and release oxygen.',
      emoji: '🌿',
      scene: 4
    },
    {
      term: 'Solar Energy',
      definition: 'Light and heat energy that comes from the sun.',
      emoji: '☀️',
      scene: 0
    },
    {
      term: 'Chlorophyll',
      definition: 'The green pigment inside leaf cells that captures sunlight.',
      emoji: '🍃',
      scene: 2
    },
    {
      term: 'Chloroplast',
      definition: 'Tiny structures inside plant cells where photosynthesis happens.',
      emoji: '🔬',
      scene: 2
    },
    {
      term: 'Glucose',
      definition: 'The sugar that plants produce as food during photosynthesis.',
      emoji: '🍬',
      scene: 3
    },
    {
      term: 'Carbon Dioxide',
      definition: 'A gas in the air (CO₂) that plants absorb through tiny pores in their leaves.',
      emoji: '💨',
      scene: 1
    },
    {
      term: 'Stomata',
      definition: 'Tiny pores on the underside of leaves that let CO₂ in and oxygen out.',
      emoji: '🕳️',
      scene: 1
    },
    {
      term: 'Oxygen',
      definition:
        'The gas that plants release as a by-product of photosynthesis — the air we breathe!',
      emoji: '🫧',
      scene: 4
    }
  ]

  /* Quiz auto-generated from glossary by engine */
};

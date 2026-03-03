/**
 * Moon Phases — Topic Data
 */

window.TOPIC_DATA = {
  id: 'moon-phases',
  name: 'Moon Phases',
  tagline: 'Why the moon looks different every night',
  icon: 'ti-moon',

  color: {
    nav: '#0c2c48',
    accent: '#3b82f6',
    accent2: '#60a5fa',
    bg: '#f0f4f8',
    card: '#ffffff',
    border: 'rgba(59, 130, 246, 0.2)'
  },

  scenes: [
    {
      id: 'earth-moon-sun',
      title: 'The Earth, Moon, and Sun',
      narration:
        "The moon orbits around Earth, and Earth orbits around the sun. The moon doesn't make its own light — it reflects sunlight! As the moon moves around Earth, we see different amounts of its lit side. This is what we call moon phases.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun',
            type: 'circle',
            cx: 50,
            cy: 150,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'sun-rays-1',
            type: 'line',
            x1: 75,
            y1: 150,
            x2: 320,
            y2: 150,
            stroke: '#fde68a',
            strokeWidth: 2,
            class: 'se-anim-ray'
          },
          {
            id: 'sun-rays-2',
            type: 'line',
            x1: 75,
            y1: 120,
            x2: 300,
            y2: 100,
            stroke: '#fde68a',
            strokeWidth: 2,
            class: 'se-anim-ray',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'sun-rays-3',
            type: 'line',
            x1: 75,
            y1: 180,
            x2: 300,
            y2: 200,
            stroke: '#fde68a',
            strokeWidth: 2,
            class: 'se-anim-ray',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'earth-orbit',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 100,
            fill: 'none',
            stroke: '#ddd',
            strokeWidth: 1,
            strokeDasharray: '5,5'
          },
          {
            id: 'earth',
            type: 'circle',
            cx: 200,
            cy: 250,
            r: 18,
            fill: '#22c55e',
            class: 'se-anim-appear'
          },
          {
            id: 'moon-orbit',
            type: 'circle',
            cx: 200,
            cy: 250,
            r: 35,
            fill: 'none',
            stroke: '#ccc',
            strokeWidth: 1,
            strokeDasharray: '3,3'
          },
          {
            id: 'moon',
            type: 'circle',
            cx: 235,
            cy: 250,
            r: 8,
            fill: '#9ca3af',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          }
        ]
      },
      terms: [
        {
          word: 'Orbit',
          definition: 'The curved path that one object takes around another object in space.',
          emoji: '🌍',
          attachTo: '#earth-orbit',
          labelPosition: 'right'
        },
        {
          word: 'Lunar Cycle',
          definition: 'The complete cycle of moon phases, taking about 29.5 days.',
          emoji: '🔄',
          attachTo: '#moon-orbit',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'new-moon',
      title: 'New Moon',
      narration:
        "A new moon occurs when the moon is between Earth and the sun. The sunlit side of the moon faces away from us, so we can't see it in the sky! The moon is invisible during this phase.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-nm',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'earth-nm',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 20,
            fill: '#22c55e'
          },
          {
            id: 'moon-nm',
            type: 'circle',
            cx: 130,
            cy: 150,
            r: 10,
            fill: '#1f2937',
            class: 'se-anim-appear'
          },
          {
            id: 'dark-side-nm',
            type: 'circle',
            cx: 130,
            cy: 150,
            r: 10,
            fill: '#374151',
            opacity: 0.3
          },
          {
            id: 'label-position',
            type: 'text',
            x: 130,
            y: 190,
            fontSize: 12,
            fill: '#666',
            textAnchor: 'middle',
            class: 'se-anim-appear',
            style: 'animation-delay:0.3s'
          }
        ]
      },
      terms: [
        {
          word: 'New Moon',
          definition:
            'When the moon is between Earth and sun, with the lit side facing away. The moon is invisible.',
          emoji: '🌑',
          attachTo: '#moon-nm',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'full-moon',
      title: 'Full Moon',
      narration:
        'A full moon occurs when Earth is between the moon and the sun. The entire sunlit side of the moon faces us! We see a complete circle of bright moonlight. The full moon is the brightest phase.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-fm',
            type: 'circle',
            cx: 320,
            cy: 150,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'earth-fm',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 20,
            fill: '#22c55e'
          },
          {
            id: 'moon-fm',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 12,
            fill: '#fef3c7',
            class: 'se-anim-appear'
          },
          {
            id: 'moon-glow',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 12,
            fill: 'none',
            stroke: '#fde68a',
            strokeWidth: 2,
            opacity: 0.5,
            class: 'se-anim-pulse'
          }
        ]
      },
      terms: [
        {
          word: 'Full Moon',
          definition:
            'When Earth is between the moon and sun, showing the entire lit side. The brightest phase.',
          emoji: '🌕',
          attachTo: '#moon-fm',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'all-phases',
      title: 'All the Phases',
      narration:
        'As the moon orbits Earth over 29.5 days, we see it go through all its phases: new moon → waxing crescent → first quarter → waxing gibbous → full moon → waning gibbous → last quarter → waning crescent → back to new moon. Each phase lasts about 3-4 days.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'phase-1',
            type: 'circle',
            cx: 50,
            cy: 80,
            r: 12,
            fill: '#1f2937',
            class: 'se-anim-appear'
          },
          {
            id: 'phase-2',
            type: 'path',
            d: 'M 110 80 A 12 12 0 0 1 110 104 A 6 6 0 0 0 110 80',
            fill: '#4b5563',
            class: 'se-anim-appear',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'phase-3',
            type: 'circle',
            cx: 170,
            cy: 80,
            r: 12,
            fill: '#9ca3af',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'phase-4',
            type: 'path',
            d: 'M 230 80 A 12 12 0 0 1 230 104 A 6 6 0 0 1 230 80',
            fill: '#d1d5db',
            class: 'se-anim-appear',
            style: 'animation-delay:0.3s'
          },
          {
            id: 'phase-5',
            type: 'circle',
            cx: 290,
            cy: 80,
            r: 12,
            fill: '#fef3c7',
            class: 'se-anim-appear',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'phase-6',
            type: 'path',
            d: 'M 50 160 A 12 12 0 0 0 50 184 A 6 6 0 0 1 50 160',
            fill: '#d1d5db',
            class: 'se-anim-appear',
            style: 'animation-delay:0.5s'
          },
          {
            id: 'phase-7',
            type: 'circle',
            cx: 110,
            cy: 160,
            r: 12,
            fill: '#9ca3af',
            class: 'se-anim-appear',
            style: 'animation-delay:0.6s'
          },
          {
            id: 'phase-8',
            type: 'path',
            d: 'M 170 160 A 12 12 0 0 0 170 184 A 6 6 0 0 0 170 160',
            fill: '#4b5563',
            class: 'se-anim-appear',
            style: 'animation-delay:0.7s'
          },
          {
            id: 'cycle-arrow',
            type: 'path',
            d: 'M 200 120 Q 280 50 350 100 Q 280 180 200 150',
            stroke: '#3b82f6',
            strokeWidth: 2,
            fill: 'none',
            class: 'se-anim-ray'
          }
        ]
      },
      terms: [
        {
          word: 'Crescent',
          definition:
            'A moon phase that looks like a thin curved slice, appearing when only a small part of the moon is lit.',
          emoji: '🌙',
          attachTo: '#phase-2',
          labelPosition: 'top'
        },
        {
          word: 'Gibbous',
          definition:
            'A moon phase meaning "humped" or "swollen", when more than half but not all of the moon is lit.',
          emoji: '🌖',
          attachTo: '#phase-4',
          labelPosition: 'top'
        }
      ]
    }
  ],

  lab: {
    title: 'Lab: Moon Phase Simulator',
    instruction:
      "Drag the moon around the orbit to see how the lit side changes. Watch from Earth's perspective!",
    controls: [
      {
        id: 'moonPosition',
        label: 'Moon Position',
        type: 'range',
        min: 0,
        max: 360,
        default: 0,
        unit: '°',
        emoji: '🌙'
      },
      {
        id: 'showEarth',
        label: 'Show Earth View',
        type: 'toggle',
        default: true,
        emoji: '🌍'
      }
    ],
    simulation: 'moon-phases-sim',
    discoveries: [
      {
        trigger: { moonPosition: [355, 5] },
        message: "🌑 New Moon! The moon is invisible because it's between Earth and sun."
      },
      {
        trigger: { moonPosition: [85, 95] },
        message: '🌓 First Quarter! Half the moon is lit and visible.'
      },
      {
        trigger: { moonPosition: [175, 185] },
        message: '🌕 Full Moon! The entire lit side faces Earth. Brightest phase!'
      },
      {
        trigger: { moonPosition: [265, 275] },
        message: '🌗 Last Quarter! The other half of the moon is now lit.'
      }
    ]
  },

  glossary: [
    {
      term: 'Moon Phases',
      definition:
        'The different shapes the moon appears to have as it orbits Earth. This happens because we see different amounts of the lit side.',
      emoji: '🌙',
      scene: 0
    },
    {
      term: 'Orbit',
      definition: 'The curved path that one object takes around another in space.',
      emoji: '🌍',
      scene: 0
    },
    {
      term: 'New Moon',
      definition:
        'When the moon is between Earth and sun, with the lit side facing away. The moon is invisible.',
      emoji: '🌑',
      scene: 1
    },
    {
      term: 'Full Moon',
      definition:
        'When Earth is between the moon and sun, showing the entire lit side. The brightest phase.',
      emoji: '🌕',
      scene: 2
    },
    {
      term: 'Crescent',
      definition:
        'A moon phase that looks like a thin curved slice, appearing when only a small part of the moon is lit.',
      emoji: '🌙',
      scene: 3
    },
    {
      term: 'Gibbous',
      definition:
        'A moon phase meaning "humped" or "swollen", when more than half but not all of the moon is lit.',
      emoji: '🌖',
      scene: 3
    },
    {
      term: 'Lunar Cycle',
      definition:
        'The complete cycle of moon phases, which takes about 29.5 days from one new moon to the next.',
      emoji: '🔄',
      scene: 0
    },
    {
      term: 'Sunlight',
      definition: 'Light from the sun that reflects off the moon, making it visible from Earth.',
      emoji: '☀️',
      scene: 0
    }
  ]
};

/**
 * Rainbow Science — Topic Data
 */

window.TOPIC_DATA = {
  id: 'rainbows-science',
  name: 'Rainbow Science',
  tagline: 'How light creates a spectrum of colours',
  icon: 'ti-rainbow',

  color: {
    nav: '#6b21a8',
    accent: '#f472b6',
    accent2: '#f97316',
    bg: '#fdf2f8',
    card: '#ffffff',
    border: 'rgba(244, 114, 182, 0.2)'
  },

  scenes: [
    {
      id: 'white-light',
      title: 'White Light is All Colours',
      renderType: '3d',
      sceneKey: 'rainbow-3d-spectrum',
      narration:
        "Sunlight looks white, but it's actually a mix of all colours of the rainbow blended together! Red, orange, yellow, green, blue, indigo, and violet are all hiding in white light. When separated, we can see each colour clearly.",
      terms: [
        {
          word: 'White Light',
          definition: 'Light that contains all colours of the visible spectrum mixed together.',
          emoji: '💡'
        }
      ]
    },

    {
      id: 'entering-droplet',
      title: 'Light Enters a Droplet',
      narration:
        'When a light ray enters a water droplet, something amazing happens. The light slows down and bends as it passes from air into water. This bending of light is called refraction. Each colour bends by a slightly different amount!',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-ed',
            type: 'circle',
            cx: 50,
            cy: 80,
            r: 20,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'incoming-ray',
            type: 'line',
            x1: 70,
            y1: 80,
            x2: 150,
            y2: 150,
            stroke: '#fbbf24',
            strokeWidth: 3,
            class: 'se-anim-ray'
          },
          {
            id: 'droplet-ed',
            type: 'circle',
            cx: 200,
            cy: 160,
            r: 35,
            fill: '#e0f2fe',
            stroke: '#0369a1',
            strokeWidth: 2
          },
          {
            id: 'refracted-ray-1',
            type: 'line',
            x1: 200,
            y1: 125,
            x2: 200,
            y2: 200,
            stroke: '#f59e0b',
            strokeWidth: 2,
            class: 'se-anim-ray',
            style: 'animation-delay:0.3s'
          },
          {
            id: 'refracted-ray-2',
            type: 'line',
            x1: 200,
            y1: 125,
            x2: 220,
            y2: 210,
            stroke: '#f97316',
            strokeWidth: 2,
            class: 'se-anim-ray',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'angle-indicator',
            type: 'path',
            d: 'M 200 160 L 200 120 M 200 160 L 230 160',
            stroke: '#999',
            strokeWidth: 1,
            strokeDasharray: '4,4'
          },
          {
            id: 'refraction-label',
            type: 'text',
            x: 140,
            y: 120,
            fontSize: 12,
            fill: '#666',
            fontWeight: 'bold'
          }
        ]
      },
      terms: [
        {
          word: 'Refraction',
          definition:
            'The bending of light as it passes from one material (like air) to another (like water).',
          emoji: '🔀',
          attachTo: '#droplet-ed',
          labelPosition: 'right'
        }
      ]
    },

    {
      id: 'inside-droplet',
      title: 'Inside the Droplet',
      narration:
        "Once inside the droplet, the light hits the back surface and bounces off. This reflection sends the light back toward the front of the droplet. But here's the clever part: as it travels, each colour of light reflects slightly differently, starting to separate.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'droplet-id',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 50,
            fill: '#e0f2fe',
            stroke: '#0369a1',
            strokeWidth: 3
          },
          {
            id: 'ray-in-id',
            type: 'line',
            x1: 180,
            y1: 110,
            x2: 200,
            y2: 150,
            stroke: '#f97316',
            strokeWidth: 3,
            class: 'se-anim-ray'
          },
          {
            id: 'reflection-point',
            type: 'circle',
            cx: 200,
            cy: 200,
            r: 8,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'reflected-ray-red',
            type: 'line',
            x1: 200,
            y1: 200,
            x2: 160,
            y2: 120,
            stroke: '#ef4444',
            strokeWidth: 3,
            class: 'se-anim-ray',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'reflected-ray-blue',
            type: 'line',
            x1: 200,
            y1: 200,
            x2: 180,
            y2: 100,
            stroke: '#3b82f6',
            strokeWidth: 3,
            class: 'se-anim-ray',
            style: 'animation-delay:0.5s'
          }
        ]
      },
      terms: [
        {
          word: 'Reflection',
          definition: 'The bouncing of light off a surface, like a mirror bouncing light back.',
          emoji: '🪞',
          attachTo: '#reflection-point',
          labelPosition: 'right'
        }
      ]
    },

    {
      id: 'rainbow-appears',
      title: 'The Rainbow Appears',
      narration:
        'As the separated colours exit the droplet, they spread out into an arc — a rainbow! This happens at a very specific angle (about 42°) between the sun and the droplet. Millions of droplets each send one colour to your eye, creating the full spectrum.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-ra',
            type: 'circle',
            cx: 60,
            cy: 50,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'rain-drops',
            type: 'circle',
            cx: 200,
            cy: 100,
            r: 30,
            fill: '#dbeafe',
            opacity: 0.5
          },
          {
            id: 'arc-red',
            type: 'path',
            d: 'M 120 200 A 100 100 0 0 1 280 200',
            stroke: '#ef4444',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-appear',
            style: 'animation-delay:0s'
          },
          {
            id: 'arc-orange',
            type: 'path',
            d: 'M 130 210 A 95 95 0 0 1 270 210',
            stroke: '#f97316',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-appear',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'arc-yellow',
            type: 'path',
            d: 'M 140 220 A 90 90 0 0 1 260 220',
            stroke: '#eab308',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'arc-green',
            type: 'path',
            d: 'M 150 230 A 85 85 0 0 1 250 230',
            stroke: '#22c55e',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-appear',
            style: 'animation-delay:0.3s'
          },
          {
            id: 'arc-blue',
            type: 'path',
            d: 'M 160 240 A 80 80 0 0 1 240 240',
            stroke: '#3b82f6',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-appear',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'arc-violet',
            type: 'path',
            d: 'M 170 250 A 75 75 0 0 1 230 250',
            stroke: '#a855f7',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-appear',
            style: 'animation-delay:0.5s'
          }
        ]
      },
      terms: [
        {
          word: 'Spectrum',
          definition:
            'The band of colours (red, orange, yellow, green, blue, indigo, violet) created when light is separated.',
          emoji: '🌈',
          attachTo: '#arc-green',
          labelPosition: 'bottom'
        },
        {
          word: 'Dispersion',
          definition:
            'The separation of white light into different colours because each colour bends slightly differently.',
          emoji: '✨',
          attachTo: '#arc-yellow',
          labelPosition: 'top'
        }
      ]
    }
  ],

  lab: {
    title: 'Lab: Rainbow Maker',
    instruction:
      'Adjust the sun angle and toggle rain to create the perfect conditions for a rainbow. Hint: Look for the magic angle!',
    controls: [
      {
        id: 'sunAngle',
        label: 'Sun Angle',
        type: 'range',
        min: 10,
        max: 85,
        default: 45,
        unit: '°',
        emoji: '☀️'
      },
      {
        id: 'rain',
        label: 'Rain/Mist',
        type: 'toggle',
        default: true,
        emoji: '💧'
      }
    ],
    simulation: 'rainbow-maker',
    discoveries: [
      {
        trigger: { sunAngle: [0, 39], rain: true },
        message: '☀️ Sun is too high! Move it lower for a rainbow.'
      },
      {
        trigger: { sunAngle: [40, 42], rain: true },
        message: "🌈 PERFECT! You've found the magic angle (40-42°) where rainbows appear!"
      },
      {
        trigger: { sunAngle: [43, 90], rain: true },
        message: '☀️ Sun is too low! The rainbow disappeared.'
      },
      {
        trigger: { rain: false },
        message: '🏜️ No rain = no rainbow. Water droplets are essential!'
      }
    ]
  },

  glossary: [
    {
      term: 'White Light',
      definition: 'Light that contains all colours of the visible spectrum mixed together.',
      emoji: '💡',
      scene: 0
    },
    {
      term: 'Refraction',
      definition:
        'The bending of light as it passes from one material (like air) into another (like water).',
      emoji: '🔀',
      scene: 1
    },
    {
      term: 'Reflection',
      definition: 'The bouncing of light off a surface, like a mirror.',
      emoji: '🪞',
      scene: 2
    },
    {
      term: 'Spectrum',
      definition:
        'The band of colours (red, orange, yellow, green, blue, indigo, violet) created when light is separated.',
      emoji: '🌈',
      scene: 3
    },
    {
      term: 'Dispersion',
      definition:
        'The separation of white light into different colours because each colour bends slightly differently.',
      emoji: '✨',
      scene: 3
    },
    {
      term: 'Wavelength',
      definition:
        'The distance between repeating peaks of a light wave. Different colours have different wavelengths.',
      emoji: '〰️',
      scene: 3
    }
  ]
};

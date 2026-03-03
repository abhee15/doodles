/**
 * Day & Night — Topic Data
 */

window.TOPIC_DATA = {
  id: 'day-and-night',
  name: 'Day & Night',
  tagline: 'Why half of Earth always has daylight',
  icon: 'ti-sun-moon',

  color: {
    nav: '#1e3a8a',
    accent: '#f97316',
    accent2: '#3b82f6',
    bg: '#fef8f3',
    card: '#ffffff',
    border: 'rgba(249, 115, 22, 0.2)'
  },

  scenes: [
    {
      id: 'earth-in-space',
      title: 'Earth in Space',
      narration:
        "Earth is a spinning ball floating in space. The sun shines on one side of Earth, making that side bright (daytime). The other side, facing away from the sun, is dark (nighttime). At this very moment, it's daytime where you are, and nighttime on the opposite side of Earth!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-space',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 30,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'light-rays',
            type: 'g',
            children: [
              {
                id: 'ray1',
                type: 'line',
                x1: 110,
                y1: 120,
                x2: 250,
                y2: 100,
                stroke: '#fde68a',
                strokeWidth: 2,
                class: 'se-anim-ray'
              },
              {
                id: 'ray2',
                type: 'line',
                x1: 110,
                y1: 150,
                x2: 280,
                y2: 150,
                stroke: '#fde68a',
                strokeWidth: 2,
                class: 'se-anim-ray',
                style: 'animation-delay:0.2s'
              },
              {
                id: 'ray3',
                type: 'line',
                x1: 110,
                y1: 180,
                x2: 250,
                y2: 200,
                stroke: '#fde68a',
                strokeWidth: 2,
                class: 'se-anim-ray',
                style: 'animation-delay:0.4s'
              }
            ]
          },
          {
            id: 'earth-day-night',
            type: 'circle',
            cx: 250,
            cy: 150,
            r: 50,
            fill: '#22c55e',
            class: 'se-anim-appear'
          },
          {
            id: 'night-side',
            type: 'circle',
            cx: 250,
            cy: 150,
            r: 50,
            fill: '#1f2937',
            opacity: 0.6,
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          }
        ]
      },
      terms: [
        {
          word: 'Rotation',
          definition: 'When Earth spins on its axis like a top. One rotation takes 24 hours.',
          emoji: '🌍',
          attachTo: '#earth-day-night',
          labelPosition: 'right'
        },
        {
          word: 'Axis',
          definition:
            "An imaginary line through Earth's north and south poles around which Earth spins.",
          emoji: '↔️',
          attachTo: '#earth-day-night',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'rotation-cycle',
      title: 'One Full Rotation',
      narration:
        "Earth rotates once every 24 hours. As it spins, different parts of Earth face the sun. When your location faces the sun, it's daytime for you. When your location spins away from the sun, it becomes nighttime. Your location experiences day and night as Earth rotates.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-rotation',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'earth-rotation',
            type: 'circle',
            cx: 250,
            cy: 150,
            r: 45,
            fill: '#22c55e',
            class: 'se-anim-spin',
            style: 'animation-duration:4s'
          },
          {
            id: 'terminator-line',
            type: 'line',
            x1: 250,
            y1: 105,
            x2: 250,
            y2: 195,
            stroke: '#f97316',
            strokeWidth: 3,
            class: 'se-anim-spin',
            style: 'animation-duration:4s'
          },
          {
            id: 'dot-location',
            type: 'circle',
            cx: 295,
            cy: 150,
            r: 4,
            fill: '#fff',
            class: 'se-anim-spin',
            style: 'animation-duration:4s'
          }
        ]
      },
      terms: [
        {
          word: 'Terminator',
          definition:
            'The line between day and night on Earth. Where the sun is setting or rising.',
          emoji: '🌅',
          attachTo: '#terminator-line',
          labelPosition: 'right'
        },
        {
          word: '24 Hours',
          definition: 'The time it takes for Earth to complete one full rotation on its axis.',
          emoji: '⏰',
          attachTo: '#earth-rotation',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'time-zones',
      title: 'Different Times Everywhere',
      narration:
        "Because Earth is round and rotating, different places experience different times at the same moment! When it's noon and sunny where you are, it might be midnight and dark on the opposite side of Earth. We divide Earth into 24 time zones so we can tell time based on the sun's position.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-tz',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'earth-tz',
            type: 'circle',
            cx: 250,
            cy: 150,
            r: 50,
            fill: '#22c55e'
          },
          {
            id: 'night-side-tz',
            type: 'circle',
            cx: 250,
            cy: 150,
            r: 50,
            fill: '#1f2937',
            opacity: 0.6
          },
          {
            id: 'noon-marker',
            type: 'circle',
            cx: 300,
            cy: 150,
            r: 6,
            fill: '#fff',
            class: 'se-anim-pulse'
          },
          {
            id: 'midnight-marker',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 6,
            fill: '#9ca3af',
            class: 'se-anim-pulse'
          },
          {
            id: 'label-noon',
            type: 'text',
            x: 310,
            y: 130,
            fontSize: 12,
            fill: '#333',
            fontWeight: 'bold'
          },
          {
            id: 'label-midnight',
            type: 'text',
            x: 190,
            y: 130,
            fontSize: 12,
            fill: '#999',
            fontWeight: 'bold'
          }
        ]
      },
      terms: [
        {
          word: 'Time Zones',
          definition:
            'Regions of Earth where people use the same time. There are 24 main time zones based on longitude.',
          emoji: '🌐',
          attachTo: '#earth-tz',
          labelPosition: 'right'
        }
      ]
    },

    {
      id: 'complete-cycle',
      title: 'The Complete Day-Night Cycle',
      narration:
        "Every location on Earth goes through a 24-hour cycle: sunrise (dawn), daytime, sunset (dusk), and nighttime. The sun appears to move across the sky because of Earth's rotation, but actually Earth is spinning toward the sun! This cycle repeats every single day, giving us time to rest and work.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'cycle-background',
            type: 'rect',
            x: 50,
            y: 50,
            width: 300,
            height: 200,
            fill: 'none',
            stroke: '#ddd',
            strokeWidth: 1,
            rx: 10
          },
          {
            id: 'sunrise',
            type: 'circle',
            cx: 100,
            cy: 150,
            r: 20,
            fill: '#f97316',
            class: 'se-anim-appear'
          },
          {
            id: 'noon',
            type: 'circle',
            cx: 200,
            cy: 80,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-appear',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'sunset',
            type: 'circle',
            cx: 300,
            cy: 150,
            r: 20,
            fill: '#dc2626',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'night-phase',
            type: 'circle',
            cx: 200,
            cy: 230,
            r: 20,
            fill: '#1f2937',
            class: 'se-anim-appear',
            style: 'animation-delay:0.3s'
          },
          {
            id: 'cycle-arrow',
            type: 'path',
            d: 'M 120 130 L 180 90 L 280 130 L 220 220',
            stroke: '#3b82f6',
            strokeWidth: 2,
            fill: 'none',
            markerEnd: 'url(#arrowhead)'
          }
        ]
      },
      terms: [
        {
          word: 'Sunrise',
          definition:
            'When the sun appears above the horizon in the morning as your location rotates toward the sun.',
          emoji: '🌅',
          attachTo: '#sunrise',
          labelPosition: 'bottom'
        },
        {
          word: 'Sunset',
          definition:
            'When the sun goes below the horizon in the evening as your location rotates away from the sun.',
          emoji: '🌅',
          attachTo: '#sunset',
          labelPosition: 'bottom'
        }
      ]
    }
  ],

  lab: {
    title: 'Lab: Earth Rotation Simulator',
    instruction:
      "Control the speed of Earth's rotation to see how day and night change. Watch your location move through the day-night cycle!",
    controls: [
      {
        id: 'rotationSpeed',
        label: 'Rotation Speed',
        type: 'range',
        min: 0,
        max: 100,
        default: 50,
        unit: '%',
        emoji: '🌍'
      },
      {
        id: 'showTimeZones',
        label: 'Show Time Zones',
        type: 'toggle',
        default: false,
        emoji: '🌐'
      }
    ],
    simulation: 'earth-rotation',
    discoveries: [
      {
        trigger: { rotationSpeed: [0, 10] },
        message: '⏸️ Very slow rotation! If Earth rotated this slowly, days would last for months!'
      },
      {
        trigger: { rotationSpeed: [45, 55] },
        message:
          '⚡ Normal speed! This is how fast Earth actually rotates — one day every 24 hours.'
      },
      {
        trigger: { rotationSpeed: [90, 100] },
        message:
          "🚀 Ultra-fast rotation! If Earth spun this fast, you'd experience many sunrises and sunsets per hour!"
      },
      {
        trigger: { showTimeZones: true },
        message: "🌐 Time zones help us keep time based on the sun's position in the sky."
      }
    ]
  },

  glossary: [
    {
      term: 'Day and Night',
      definition:
        "The 24-hour cycle of daylight and darkness caused by Earth's rotation. Day is when your location faces the sun; night is when it faces away.",
      emoji: '🌅',
      scene: 3
    },
    {
      term: 'Rotation',
      definition: 'When Earth spins on its axis like a top. One complete rotation takes 24 hours.',
      emoji: '🌍',
      scene: 0
    },
    {
      term: 'Axis',
      definition:
        "An imaginary line through Earth's north and south poles around which Earth spins.",
      emoji: '↔️',
      scene: 0
    },
    {
      term: 'Terminator',
      definition:
        'The line between day and night on Earth. The sunrise and sunset happen along this line.',
      emoji: '🌅',
      scene: 1
    },
    {
      term: 'Time Zones',
      definition:
        "Regions of Earth where people use the same time based on the sun's position. There are 24 main time zones.",
      emoji: '🌐',
      scene: 2
    },
    {
      term: 'Sunrise',
      definition:
        'When the sun appears above the horizon in the morning as your location rotates toward the sun.',
      emoji: '🌅',
      scene: 3
    },
    {
      term: 'Sunset',
      definition:
        'When the sun goes below the horizon in the evening as your location rotates away from the sun.',
      emoji: '🌆',
      scene: 3
    },
    {
      term: '24 Hours',
      definition:
        'The time it takes for Earth to complete one full rotation on its axis, creating one day and one night.',
      emoji: '⏰',
      scene: 1
    }
  ]
};

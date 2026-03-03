window.TOPIC_DATA = {
  id: 'gravity-science',
  name: 'Gravity',
  tagline: 'The invisible force that shapes the universe',
  icon: 'ti-arrow-down',
  color: {
    nav: '#2d1b69',
    accent: '#8b5cf6',
    accent2: '#a78bfa',
    bg: '#f5f3ff',
    card: '#ffffff',
    border: 'rgba(139, 92, 246, 0.2)'
  },
  scenes: [
    {
      id: 'invisible-force',
      title: 'An Invisible Force',
      renderType: '3d',
      sceneKey: 'gravity-3d-force',
      narration:
        "Gravity is an invisible force that pulls objects toward each other. Even though you can't see it, you feel it every moment! Gravity pulls you toward Earth, keeping your feet on the ground. Every object in the universe has gravity, but bigger objects have stronger gravity.",
      terms: [
        {
          word: 'Gravity',
          definition:
            'An invisible force that pulls objects toward each other. Stronger for bigger objects.',
          emoji: '⬇️'
        },
        {
          word: 'Force',
          definition: 'A push or pull that can change how an object moves or its shape.',
          emoji: '💪'
        }
      ]
    },
    {
      id: 'pulling-down',
      title: 'Everything Falls Down',
      narration:
        "Drop a ball and it falls down. Throw it up and it comes back down. Jump and you land back on Earth. Gravity always pulls things toward Earth's center! Objects don't fall forever though—they stop when they hit the ground. Without gravity, everything would float away into space!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          { id: 'earth-fall', type: 'circle', cx: 200, cy: 280, r: 50, fill: '#22c55e' },
          {
            id: 'ball1',
            type: 'circle',
            cx: 100,
            cy: 50,
            r: 12,
            fill: '#ef4444',
            class: 'se-anim-float-up'
          },
          {
            id: 'ball2',
            type: 'circle',
            cx: 200,
            cy: 100,
            r: 12,
            fill: '#3b82f6',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'ball3',
            type: 'circle',
            cx: 300,
            cy: 80,
            r: 12,
            fill: '#f59e0b',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.4s'
          }
        ]
      },
      terms: [
        {
          word: 'Falling',
          definition:
            'When gravity pulls an object toward Earth. Objects accelerate (speed up) as they fall.',
          emoji: '⬇️',
          attachTo: '#ball2',
          labelPosition: 'right'
        }
      ]
    },
    {
      id: 'orbits',
      title: 'Orbits and Balance',
      narration:
        "Planets and moons don't fall into the sun or Earth because of orbits. An orbit is a perfect balance between gravity pulling inward and the object's motion pushing outward. The moon orbits Earth, Earth orbits the sun, and satellites orbit Earth. Without gravity, they couldn't orbit—they'd float away!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-orbit',
            type: 'circle',
            cx: 150,
            cy: 150,
            r: 30,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'orbit-path1',
            type: 'circle',
            cx: 150,
            cy: 150,
            r: 80,
            fill: 'none',
            stroke: '#ddd',
            strokeWidth: 1,
            strokeDasharray: '5,5'
          },
          {
            id: 'earth-orbit',
            type: 'circle',
            cx: 230,
            cy: 150,
            r: 15,
            fill: '#22c55e',
            class: 'se-anim-spin',
            style: 'animation-duration:6s'
          },
          {
            id: 'orbit-path2',
            type: 'circle',
            cx: 230,
            cy: 150,
            r: 30,
            fill: 'none',
            stroke: '#ccc',
            strokeWidth: 1,
            strokeDasharray: '3,3'
          },
          {
            id: 'moon-orbit',
            type: 'circle',
            cx: 260,
            cy: 150,
            r: 6,
            fill: '#9ca3af',
            class: 'se-anim-spin',
            style: 'animation-duration:3s'
          }
        ]
      },
      terms: [
        {
          word: 'Orbit',
          definition:
            'The curved path one object takes around another, balanced between gravity and motion.',
          emoji: '🛤️',
          attachTo: '#orbit-path1',
          labelPosition: 'right'
        }
      ]
    },
    {
      id: 'mass-matters',
      title: 'Mass Matters',
      narration:
        "Bigger, heavier objects have stronger gravity! The sun's gravity is much stronger than Earth's because the sun is much more massive. Jupiter has stronger gravity than Earth. On the moon, gravity is weaker so you'd weigh less and could jump higher. Mass is how much \"stuff\" an object is made of.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-large',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 50,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          { id: 'earth-small', type: 'circle', cx: 250, cy: 150, r: 20, fill: '#22c55e' },
          { id: 'moon-tiny', type: 'circle', cx: 340, cy: 150, r: 8, fill: '#9ca3af' },
          {
            id: 'gravity-strong',
            type: 'text',
            x: 80,
            y: 230,
            fontSize: 14,
            fill: '#fbbf24',
            textAnchor: 'middle',
            fontWeight: 'bold'
          },
          {
            id: 'gravity-medium',
            type: 'text',
            x: 250,
            y: 230,
            fontSize: 12,
            fill: '#22c55e',
            textAnchor: 'middle',
            fontWeight: 'bold'
          },
          {
            id: 'gravity-weak',
            type: 'text',
            x: 340,
            y: 230,
            fontSize: 10,
            fill: '#9ca3af',
            textAnchor: 'middle',
            fontWeight: 'bold'
          }
        ]
      },
      terms: [
        {
          word: 'Mass',
          definition:
            'How much "stuff" an object is made of. More massive objects have stronger gravity.',
          emoji: '⚖️',
          attachTo: '#sun-large',
          labelPosition: 'bottom'
        }
      ]
    }
  ],
  lab: {
    title: 'Lab: Gravity Playground',
    instruction:
      'Change the mass of objects and the gravity strength to see how things fall and orbit differently!',
    controls: [
      {
        id: 'gravity',
        label: 'Gravity Strength',
        type: 'range',
        min: 0,
        max: 200,
        default: 100,
        unit: '%',
        emoji: '⬇️'
      },
      {
        id: 'mass',
        label: 'Object Mass',
        type: 'range',
        min: 1,
        max: 100,
        default: 50,
        unit: 'kg',
        emoji: '⚖️'
      }
    ],
    simulation: 'gravity-sim',
    discoveries: [
      {
        trigger: { gravity: [0, 20] },
        message: '🚀 Very low gravity! Objects float slowly downward.'
      },
      { trigger: { gravity: [90, 110] }, message: '🌍 Earth gravity! Normal falling speed.' },
      {
        trigger: { gravity: [180, 200] },
        message: '🪐 Super strong gravity! Objects crash down fast!'
      },
      {
        trigger: { mass: [1, 20] },
        message: '🪶 Light object! Falls slowly even in strong gravity.'
      },
      { trigger: { mass: [80, 100] }, message: '🏋️ Heavy object! Falls much faster!' }
    ]
  },
  glossary: [
    {
      term: 'Gravity',
      definition:
        'An invisible force that pulls objects toward each other. Stronger for larger, more massive objects.',
      emoji: '⬇️',
      scene: 0
    },
    {
      term: 'Force',
      definition: 'A push or pull that can change how an object moves or its shape.',
      emoji: '💪',
      scene: 0
    },
    {
      term: 'Falling',
      definition: 'Movement toward Earth caused by gravity. Objects accelerate downward.',
      emoji: '⬇️',
      scene: 1
    },
    {
      term: 'Orbit',
      definition:
        'The curved path one object takes around another, balanced between gravity pulling inward and motion pushing outward.',
      emoji: '🛤️',
      scene: 2
    },
    {
      term: 'Mass',
      definition:
        'How much "stuff" an object contains. More massive objects have stronger gravity.',
      emoji: '⚖️',
      scene: 3
    },
    {
      term: 'Acceleration',
      definition: 'How quickly something speeds up. Falling objects accelerate due to gravity.',
      emoji: '⚡',
      scene: 1
    },
    {
      term: 'Escape Velocity',
      definition:
        "The speed needed to escape a planet's gravity. Larger planets require higher escape velocity.",
      emoji: '🚀',
      scene: 2
    },
    {
      term: 'Weight',
      definition:
        "How heavy something feels. Weight depends on gravity, so you'd weigh less on the moon!",
      emoji: '⚖️',
      scene: 3
    }
  ]
};

window.TOPIC_DATA = {
  id: 'volcano-science',
  name: 'Volcanoes',
  tagline: "The explosive power of Earth's interior",
  icon: 'ti-flame',
  color: {
    nav: '#7c2d12',
    accent: '#ea580c',
    accent2: '#f97316',
    bg: '#fef2f2',
    card: '#ffffff',
    border: 'rgba(234, 88, 12, 0.2)'
  },
  scenes: [
    {
      id: 'hot-inside',
      title: 'Earth is Hot Inside',
      renderType: '3d',
      sceneKey: 'volcano-3d-magma',
      narration:
        "Deep beneath Earth's crust lies extremely hot rock called magma. This magma is so hot it can melt rock! Pressure builds up as more magma forms and has nowhere to go. Eventually, the pressure becomes so great that magma has to find a way out—through cracks in Earth's crust.",
      terms: [
        {
          word: 'Magma',
          definition:
            "Hot, liquid rock beneath Earth's surface. When it flows out, it's called lava.",
          emoji: '🌋'
        },
        {
          word: 'Pressure',
          definition: 'A pushing force. Pressure builds up when hot magma is trapped underground.',
          emoji: '💥'
        }
      ]
    },
    {
      id: 'pressure-builds',
      title: 'Pressure Builds Up',
      narration:
        "As magma collects in chambers beneath Earth's crust, pressure increases. More magma continues to form from Earth's hot interior, squeezing the chamber. Gases trapped in the magma also create pressure. The pressure pushes and pushes on the rock above until—something has to give!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'volcano-cone',
            type: 'polygon',
            points: '200,50 100,200 300,200',
            fill: '#92400e',
            stroke: '#000',
            strokeWidth: 1
          },
          {
            id: 'magma-chamber-2',
            type: 'ellipse',
            cx: 200,
            cy: 210,
            rx: 60,
            ry: 50,
            fill: '#dc2626',
            class: 'se-anim-pulse'
          },
          {
            id: 'pressure-line-1',
            type: 'path',
            d: 'M 200 100 L 200 150',
            stroke: '#f97316',
            strokeWidth: 2,
            class: 'se-anim-grow-up'
          },
          {
            id: 'pressure-line-2',
            type: 'path',
            d: 'M 150 150 L 150 180',
            stroke: '#f97316',
            strokeWidth: 2,
            class: 'se-anim-grow-up',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'pressure-line-3',
            type: 'path',
            d: 'M 250 150 L 250 180',
            stroke: '#f97316',
            strokeWidth: 2,
            class: 'se-anim-grow-up',
            style: 'animation-delay:0.2s'
          }
        ]
      },
      terms: [
        {
          word: 'Eruption',
          definition: 'When magma, gas, and rock burst out of a volcano explosively.',
          emoji: '💥',
          attachTo: '#volcano-cone',
          labelPosition: 'top'
        }
      ]
    },
    {
      id: 'eruption',
      title: 'The Eruption',
      narration:
        "Finally, the pressure is too much! The magma forces its way through cracks in the crust and explodes out of the volcano! Hot lava, ash, and gases shoot out into the air. Lava flows down the volcano's sides, destroying everything in its path. The eruption can last for hours, days, or even weeks!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'volcano-erupting',
            type: 'polygon',
            points: '200,50 80,220 320,220',
            fill: '#92400e',
            stroke: '#000',
            strokeWidth: 1
          },
          {
            id: 'lava-flow-1',
            type: 'path',
            d: 'M 200 50 L 120 220',
            stroke: '#dc2626',
            strokeWidth: 8,
            fill: 'none',
            class: 'se-anim-float-up'
          },
          {
            id: 'lava-flow-2',
            type: 'path',
            d: 'M 200 50 L 280 220',
            stroke: '#dc2626',
            strokeWidth: 8,
            fill: 'none',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'eruption-plume',
            type: 'path',
            d: 'M 200 50 Q 180 20 200 -10',
            stroke: '#999',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-float-up',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'ash-particles',
            type: 'g',
            children: [
              {
                id: 'ash-1',
                type: 'circle',
                cx: 200,
                cy: 30,
                r: 3,
                fill: '#666',
                class: 'se-anim-float-up'
              },
              {
                id: 'ash-2',
                type: 'circle',
                cx: 190,
                cy: 20,
                r: 2,
                fill: '#999',
                class: 'se-anim-float-up',
                style: 'animation-delay:0.1s'
              },
              {
                id: 'ash-3',
                type: 'circle',
                cx: 210,
                cy: 25,
                r: 2,
                fill: '#999',
                class: 'se-anim-float-up',
                style: 'animation-delay:0.2s'
              }
            ]
          }
        ]
      },
      terms: [
        {
          word: 'Lava',
          definition:
            "Hot, liquid rock that flows out of a volcano. It's magma that has reached Earth's surface.",
          emoji: '🌋',
          attachTo: '#lava-flow-1',
          labelPosition: 'left'
        },
        {
          word: 'Ash',
          definition:
            'Fine particles of rock and minerals shot high into the air during an eruption.',
          emoji: '💨',
          attachTo: '#ash-2',
          labelPosition: 'left'
        }
      ]
    },
    {
      id: 'after-eruption',
      title: 'After the Eruption',
      narration:
        'When the eruption stops, lava cools and hardens into new rock. Ash falls back to Earth, covering the landscape. Over time, this new material weathers and becomes fertile soil. Many volcanoes erupt again and again over thousands of years, building mountains and creating dramatic landscapes.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'volcano-calm',
            type: 'polygon',
            points: '200,80 100,240 300,240',
            fill: '#92400e',
            stroke: '#000',
            strokeWidth: 1
          },
          {
            id: 'lava-solidified-1',
            type: 'polygon',
            points: '200,80 120,240 280,240',
            fill: '#7c2d12',
            opacity: 0.8,
            class: 'se-anim-appear'
          },
          {
            id: 'ash-layer',
            type: 'rect',
            x: 0,
            y: 240,
            width: 400,
            height: 60,
            fill: '#b8860b',
            opacity: 0.5,
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'new-life',
            type: 'g',
            children: [
              {
                id: 'plant-1',
                type: 'path',
                d: 'M 100 240 Q 100 230 95 225',
                stroke: '#22c55e',
                strokeWidth: 2,
                fill: 'none',
                class: 'se-anim-grow-up'
              },
              {
                id: 'plant-2',
                type: 'path',
                d: 'M 300 240 Q 300 230 305 225',
                stroke: '#22c55e',
                strokeWidth: 2,
                fill: 'none',
                class: 'se-anim-grow-up',
                style: 'animation-delay:0.2s'
              }
            ]
          }
        ]
      },
      terms: [
        {
          word: 'Crater',
          definition: 'The bowl-shaped opening at the top of a volcano where magma erupts.',
          emoji: '🔴',
          attachTo: '#volcano-calm',
          labelPosition: 'top'
        },
        {
          word: 'Cooling',
          definition: 'When hot lava loses heat and becomes solid rock. New volcanic rock is born!',
          emoji: '🪨',
          attachTo: '#lava-solidified-1',
          labelPosition: 'left'
        }
      ]
    }
  ],
  lab: {
    title: 'Lab: Volcano Pressure Simulator',
    instruction:
      'Increase the temperature and magma volume to build pressure. Trigger an eruption when pressure reaches critical levels!',
    controls: [
      {
        id: 'temperature',
        label: 'Magma Temperature',
        type: 'range',
        min: 100,
        max: 1000,
        default: 500,
        unit: '°C',
        emoji: '🔥'
      },
      {
        id: 'volume',
        label: 'Magma Volume',
        type: 'range',
        min: 0,
        max: 100,
        default: 50,
        unit: '%',
        emoji: '📦'
      }
    ],
    simulation: 'volcano-sim',
    discoveries: [
      {
        trigger: { temperature: [100, 300], volume: [0, 30] },
        message: '😌 Low pressure — the volcano is dormant.'
      },
      {
        trigger: { temperature: [600, 800], volume: [70, 100] },
        message: '⚠️ Rising pressure! The volcano is getting ready to erupt!'
      },
      {
        trigger: { temperature: [900, 1000], volume: [90, 100] },
        message: '💥 ERUPTION! Magma is breaking through!'
      },
      {
        trigger: { temperature: [0, 200], volume: [80, 100] },
        message: '❄️ Cold magma with high volume — pressure release through overflow.'
      }
    ]
  },
  glossary: [
    {
      term: 'Volcano',
      definition: "A place where magma, ash, and gases erupt through Earth's crust.",
      emoji: '🌋',
      scene: 2
    },
    {
      term: 'Magma',
      definition:
        "Hot, liquid rock beneath Earth's surface. When it reaches the surface, it's called lava.",
      emoji: '🔴',
      scene: 0
    },
    {
      term: 'Lava',
      definition: "Hot, liquid rock that flows out of a volcano on Earth's surface.",
      emoji: '🌋',
      scene: 2
    },
    {
      term: 'Eruption',
      definition: 'When magma, gas, and rock burst explosively out of a volcano.',
      emoji: '💥',
      scene: 2
    },
    {
      term: 'Crater',
      definition: 'The bowl-shaped opening at the top of a volcano where magma erupts.',
      emoji: '🔴',
      scene: 3
    },
    {
      term: 'Ash',
      definition: 'Fine particles of rock and minerals shot high into the air during an eruption.',
      emoji: '💨',
      scene: 2
    },
    {
      term: 'Lava Flow',
      definition: 'The stream of hot liquid lava flowing down the sides of a volcano.',
      emoji: '🌊',
      scene: 2
    },
    {
      term: 'Cooling',
      definition: 'When hot lava loses heat and becomes solid rock, creating new land.',
      emoji: '🪨',
      scene: 3
    }
  ]
};

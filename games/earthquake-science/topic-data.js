window.TOPIC_DATA = {
  id: 'earthquake-science',
  name: 'Earthquakes',
  tagline: "Why Earth's crust shakes and moves",
  icon: 'ti-alert-triangle',
  color: {
    nav: '#7c2d12',
    accent: '#b91c1c',
    accent2: '#dc2626',
    bg: '#fef2f2',
    card: '#ffffff',
    border: 'rgba(185, 28, 28, 0.2)'
  },
  scenes: [
    {
      id: 'tectonic-plates',
      title: 'Tectonic Plates',
      renderType: '3d',
      sceneKey: 'earthquake-3d-plates',
      narration:
        "Earth's crust is divided into large pieces called tectonic plates. These plates are always moving—very slowly! They move just a few centimeters per year. Over millions of years, these movements have shaped our continents and oceans. Where plates meet, earthquakes often happen.",
      terms: [
        {
          word: 'Tectonic Plates',
          definition:
            "Large pieces of Earth's crust that constantly move very slowly, a few centimeters per year.",
          emoji: '🧩'
        },
        {
          word: 'Fault Line',
          definition: 'The boundary where two tectonic plates meet and rub against each other.',
          emoji: '⚡'
        }
      ]
    },
    {
      id: 'stress-builds',
      title: 'Stress Builds Up',
      narration:
        'Where plates meet, they push, pull, and slide past each other. The friction between the plates slows them down. As the plates try to move, stress builds up at the fault line. The rocks at the fault get bent and twisted, storing more and more energy—like stretching a rubber band.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'plate-left-stress',
            type: 'rect',
            x: 0,
            y: 100,
            width: 190,
            height: 100,
            fill: '#92400e',
            stroke: '#333',
            strokeWidth: 3
          },
          {
            id: 'plate-right-stress',
            type: 'rect',
            x: 210,
            y: 100,
            width: 190,
            height: 100,
            fill: '#a0600e',
            stroke: '#333',
            strokeWidth: 3
          },
          {
            id: 'stress-zone',
            type: 'rect',
            x: 190,
            y: 80,
            width: 20,
            height: 140,
            fill: '#b91c1c',
            opacity: 0.7,
            class: 'se-anim-pulse'
          },
          {
            id: 'squeeze-arrow-l',
            type: 'path',
            d: 'M 200 150 L 150 150',
            stroke: '#f97316',
            strokeWidth: 2,
            fill: 'none',
            class: 'se-anim-ray'
          },
          {
            id: 'squeeze-arrow-r',
            type: 'path',
            d: 'M 200 150 L 250 150',
            stroke: '#f97316',
            strokeWidth: 2,
            fill: 'none',
            class: 'se-anim-ray',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'deformation',
            type: 'text',
            x: 200,
            y: 250,
            fontSize: 14,
            fill: '#b91c1c',
            textAnchor: 'middle',
            fontWeight: 'bold'
          }
        ]
      },
      terms: [
        {
          word: 'Stress',
          definition:
            'Pressure and strain at a fault line as tectonic plates push, pull, or slide against each other.',
          emoji: '⚙️',
          attachTo: '#stress-zone',
          labelPosition: 'right'
        }
      ]
    },
    {
      id: 'rupture',
      title: 'Sudden Rupture',
      narration:
        'Eventually, the stress becomes too great for the rocks to hold! The rocks suddenly break and slip along the fault line—whoosh! This sudden release of energy is an earthquake! All the bent-up energy explodes in a moment, sending seismic waves through Earth in all directions.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'before-quake',
            type: 'g',
            children: [
              {
                id: 'plate-l-before',
                type: 'rect',
                x: 50,
                y: 80,
                width: 100,
                height: 100,
                fill: '#92400e',
                stroke: '#333',
                strokeWidth: 2
              },
              {
                id: 'plate-r-before',
                type: 'rect',
                x: 250,
                y: 80,
                width: 100,
                height: 100,
                fill: '#a0600e',
                stroke: '#333',
                strokeWidth: 2
              }
            ]
          },
          {
            id: 'rupture-line',
            type: 'line',
            x1: 200,
            y1: 50,
            x2: 200,
            y2: 250,
            stroke: '#b91c1c',
            strokeWidth: 4,
            class: 'se-anim-appear'
          },
          {
            id: 'seismic-wave-1',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 30,
            fill: 'none',
            stroke: '#f97316',
            strokeWidth: 2,
            opacity: 0.7,
            class: 'se-anim-pulse'
          },
          {
            id: 'seismic-wave-2',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 50,
            fill: 'none',
            stroke: '#f97316',
            strokeWidth: 1,
            opacity: 0.4,
            class: 'se-anim-pulse',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'seismic-label',
            type: 'text',
            x: 280,
            y: 130,
            fontSize: 12,
            fill: '#f97316',
            fontWeight: 'bold'
          }
        ]
      },
      terms: [
        {
          word: 'Rupture',
          definition:
            'When the rocks at a fault line suddenly break and slip, releasing all the built-up stress energy.',
          emoji: '💥',
          attachTo: '#rupture-line',
          labelPosition: 'right'
        },
        {
          word: 'Seismic Waves',
          definition: 'Waves of energy that travel through Earth when an earthquake happens.',
          emoji: '〰️',
          attachTo: '#seismic-wave-1',
          labelPosition: 'right'
        }
      ]
    },
    {
      id: 'shaking-spreading',
      title: 'Shaking and Spreading',
      narration:
        "Seismic waves race outward from the earthquake's epicenter (the point on the surface directly above where the rupture happened). These waves shake the ground, buildings, and everything on Earth's surface. Close to the epicenter, the shaking is strongest. Far away, the shaking is weaker. We measure earthquake strength with the Richter scale.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'epicenter-point',
            type: 'circle',
            cx: 200,
            cy: 100,
            r: 6,
            fill: '#b91c1c',
            class: 'se-anim-pulse'
          },
          {
            id: 'wave-1',
            type: 'circle',
            cx: 200,
            cy: 100,
            r: 40,
            fill: 'none',
            stroke: '#f97316',
            strokeWidth: 3,
            opacity: 0.8,
            class: 'se-anim-pulse'
          },
          {
            id: 'wave-2',
            type: 'circle',
            cx: 200,
            cy: 100,
            r: 70,
            fill: 'none',
            stroke: '#f97316',
            strokeWidth: 2,
            opacity: 0.5,
            class: 'se-anim-pulse',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'wave-3',
            type: 'circle',
            cx: 200,
            cy: 100,
            r: 100,
            fill: 'none',
            stroke: '#f97316',
            strokeWidth: 1,
            opacity: 0.3,
            class: 'se-anim-pulse',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'building-near',
            type: 'rect',
            x: 170,
            y: 120,
            width: 30,
            height: 40,
            fill: '#92400e',
            stroke: '#333',
            strokeWidth: 1,
            class: 'se-anim-shake'
          },
          {
            id: 'building-far',
            type: 'rect',
            x: 330,
            y: 130,
            width: 20,
            height: 30,
            fill: '#92400e',
            stroke: '#333',
            strokeWidth: 1
          }
        ]
      },
      terms: [
        {
          word: 'Epicenter',
          definition:
            "The point on Earth's surface directly above where an earthquake starts underground.",
          emoji: '📍',
          attachTo: '#epicenter-point',
          labelPosition: 'top'
        },
        {
          word: 'Magnitude',
          definition:
            "A number measuring an earthquake's strength. Higher numbers = stronger earthquakes. Measured on the Richter scale.",
          emoji: '📊',
          attachTo: '#wave-1',
          labelPosition: 'right'
        }
      ]
    }
  ],
  lab: {
    title: 'Lab: Earthquake Simulator',
    instruction:
      'Control plate movement speed and direction to trigger earthquakes. Watch how magnitude increases with more stress!',
    controls: [
      {
        id: 'plateSpeed',
        label: 'Plate Movement',
        type: 'range',
        min: 0,
        max: 100,
        default: 50,
        unit: '%',
        emoji: '📍'
      },
      { id: 'direction', label: 'Collision Type', type: 'toggle', default: true, emoji: '→' }
    ],
    simulation: 'earthquake-sim',
    discoveries: [
      {
        trigger: { plateSpeed: [0, 20] },
        message: '😌 Plates moving very slowly — stress builds very gradually.'
      },
      {
        trigger: { plateSpeed: [40, 60] },
        message: '⚡ Moderate plate movement — earthquakes occurring at regular intervals.'
      },
      {
        trigger: { plateSpeed: [80, 100] },
        message: '💥 Rapid plate collision! Strong earthquakes happening frequently!'
      },
      {
        trigger: { direction: true },
        message: '→ Plates sliding past each other — creates different earthquake patterns.'
      }
    ]
  },
  glossary: [
    {
      term: 'Earthquake',
      definition:
        'Sudden shaking of the ground caused by tectonic plates moving, colliding, or sliding at a fault line.',
      emoji: '🌍',
      scene: 3
    },
    {
      term: 'Tectonic Plates',
      definition: "Large pieces of Earth's crust that constantly move a few centimeters per year.",
      emoji: '🧩',
      scene: 0
    },
    {
      term: 'Fault Line',
      definition: 'The boundary between two tectonic plates where earthquakes often occur.',
      emoji: '⚡',
      scene: 0
    },
    {
      term: 'Stress',
      definition:
        'Pressure and strain at a fault line from plates pushing, pulling, or sliding against each other.',
      emoji: '⚙️',
      scene: 1
    },
    {
      term: 'Rupture',
      definition:
        'When rocks at a fault line suddenly break and slip, releasing built-up energy and causing an earthquake.',
      emoji: '💥',
      scene: 2
    },
    {
      term: 'Seismic Waves',
      definition:
        'Waves of energy that travel through Earth during an earthquake, causing the ground to shake.',
      emoji: '〰️',
      scene: 2
    },
    {
      term: 'Epicenter',
      definition:
        "The point on Earth's surface directly above where an earthquake starts underground.",
      emoji: '📍',
      scene: 3
    },
    {
      term: 'Magnitude',
      definition:
        'A number measuring earthquake strength on the Richter scale. Higher = stronger earthquakes.',
      emoji: '📊',
      scene: 3
    }
  ]
};

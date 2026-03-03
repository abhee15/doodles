window.TOPIC_DATA = {
  id: 'seasons-science',
  name: 'Seasons',
  tagline: 'Why Earth has spring, summer, fall, and winter',
  icon: 'ti-calendar-month',
  color: {
    nav: '#854d0e',
    accent: '#f59e0b',
    accent2: '#fbbf24',
    bg: '#fffbeb',
    card: '#ffffff',
    border: 'rgba(245, 158, 11, 0.2)'
  },
  scenes: [
    {
      id: 'tilted-axis',
      title: "Earth's Tilted Axis",
      renderType: '3d',
      sceneKey: 'seasons-3d-tilt',
      narration:
        "Earth's axis is tilted 23.5 degrees! This tilt is the key to seasons. If Earth's axis were straight up and down, every place would have the same temperature year-round. But because it's tilted, different parts of Earth receive more or less direct sunlight at different times of year.",
      terms: [
        {
          word: 'Axial Tilt',
          definition:
            "The 23.5-degree angle of Earth's axis compared to its orbital plane. This tilt causes seasons.",
          emoji: '↗️'
        }
      ]
    },
    {
      id: 'summer-winter',
      title: 'Summer and Winter',
      narration:
        "During summer in your hemisphere, your part of Earth is tilted toward the sun. The sun's rays hit more directly, and days are longer. During winter, your part is tilted away from the sun. The sun's rays hit at an angle, and days are shorter. The opposite is happening on the other side of Earth!",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-sw',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          { id: 'summer-earth', type: 'circle', cx: 200, cy: 80, r: 30, fill: '#22c55e' },
          { id: 'winter-earth', type: 'circle', cx: 200, cy: 220, r: 30, fill: '#1e3a8a' },
          {
            id: 'summer-arrow',
            type: 'path',
            d: 'M 120 120 L 180 90',
            stroke: '#f59e0b',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-ray'
          },
          {
            id: 'winter-arrow',
            type: 'path',
            d: 'M 120 180 L 180 210',
            stroke: '#3b82f6',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-ray',
            style: 'animation-delay:0.2s'
          }
        ]
      },
      terms: [
        {
          word: 'Summer',
          definition:
            "The season when your hemisphere is tilted toward the sun. It's hot with long days.",
          emoji: '☀️',
          attachTo: '#summer-earth',
          labelPosition: 'top'
        },
        {
          word: 'Winter',
          definition:
            "The season when your hemisphere is tilted away from the sun. It's cold with short days.",
          emoji: '❄️',
          attachTo: '#winter-earth',
          labelPosition: 'bottom'
        }
      ]
    },
    {
      id: 'spring-fall',
      title: 'Spring and Fall',
      narration:
        "Spring and fall are transition seasons that happen when Earth's tilt is sideways to the sun. During spring, your hemisphere is beginning to tilt toward the sun—days get longer and warmer. During fall, your hemisphere is tilting away—days get shorter and cooler.",
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-sf',
            type: 'circle',
            cx: 80,
            cy: 150,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          { id: 'spring-earth', type: 'circle', cx: 200, cy: 100, r: 25, fill: '#84cc16' },
          { id: 'fall-earth', type: 'circle', cx: 200, cy: 200, r: 25, fill: '#d97706' },
          {
            id: 'equal-light',
            type: 'line',
            x1: 100,
            y1: 150,
            x2: 320,
            y2: 150,
            stroke: '#999',
            strokeWidth: 2,
            strokeDasharray: '5,5'
          }
        ]
      },
      terms: [
        {
          word: 'Spring',
          definition:
            'The season of growth! Days are getting longer, temperatures are rising, and plants bloom.',
          emoji: '🌱',
          attachTo: '#spring-earth',
          labelPosition: 'top'
        },
        {
          word: 'Fall',
          definition:
            'The season of change. Days are getting shorter, temperatures are dropping, and leaves turn color.',
          emoji: '🍂',
          attachTo: '#fall-earth',
          labelPosition: 'bottom'
        }
      ]
    },
    {
      id: 'four-seasons',
      title: 'The Four Seasons',
      narration:
        'As Earth orbits the sun once per year, our hemisphere goes through all four seasons: spring, summer, fall, and winter. Meanwhile, the opposite hemisphere experiences the opposite seasons! The cycle repeats every year, bringing different weather, daylight hours, and natural activities to each season.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-center',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 20,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'orbit-path',
            type: 'circle',
            cx: 200,
            cy: 150,
            r: 100,
            fill: 'none',
            stroke: '#ddd',
            strokeWidth: 2,
            strokeDasharray: '5,5'
          },
          {
            id: 'summer-pos',
            type: 'circle',
            cx: 300,
            cy: 150,
            r: 12,
            fill: '#f59e0b',
            class: 'se-anim-appear'
          },
          {
            id: 'winter-pos',
            type: 'circle',
            cx: 100,
            cy: 150,
            r: 12,
            fill: '#3b82f6',
            class: 'se-anim-appear',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'spring-pos',
            type: 'circle',
            cx: 200,
            cy: 250,
            r: 12,
            fill: '#84cc16',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'fall-pos',
            type: 'circle',
            cx: 200,
            cy: 50,
            r: 12,
            fill: '#d97706',
            class: 'se-anim-appear',
            style: 'animation-delay:0.3s'
          }
        ]
      },
      terms: [
        {
          word: 'Seasonal Cycle',
          definition:
            'The repeating pattern of four seasons that occurs as Earth orbits the sun once per year (365 days).',
          emoji: '🔄',
          attachTo: '#orbit-path',
          labelPosition: 'right'
        },
        {
          word: 'Hemisphere',
          definition:
            'One half of Earth. The northern and southern hemispheres experience opposite seasons at the same time.',
          emoji: '🌍',
          attachTo: '#sun-center',
          labelPosition: 'left'
        }
      ]
    }
  ],
  lab: {
    title: 'Lab: Season Simulator',
    instruction:
      "Adjust Earth's position in its orbit and tilt to see how seasons change. Watch how temperature and daylight change!",
    controls: [
      {
        id: 'orbitalPosition',
        label: 'Earth Position',
        type: 'range',
        min: 0,
        max: 360,
        default: 0,
        unit: '°',
        emoji: '🌍'
      },
      { id: 'showTilt', label: 'Show Tilt', type: 'toggle', default: true, emoji: '↗️' }
    ],
    simulation: 'seasons-sim',
    discoveries: [
      {
        trigger: { orbitalPosition: [80, 100] },
        message: '☀️ Summer in Northern Hemisphere! Days are long and hot.'
      },
      {
        trigger: { orbitalPosition: [260, 280] },
        message: '❄️ Winter in Northern Hemisphere! Days are short and cold.'
      },
      {
        trigger: { orbitalPosition: [170, 190] },
        message: '🍂 Fall in Northern Hemisphere! Temperatures cooling down.'
      },
      {
        trigger: { orbitalPosition: [350, 10] },
        message: '🌱 Spring in Northern Hemisphere! Days getting longer and warmer.'
      }
    ]
  },
  glossary: [
    {
      term: 'Seasons',
      definition:
        "The four periods of the year (spring, summer, fall, winter) with different weather and daylight hours caused by Earth's tilted axis.",
      emoji: '🌤️',
      scene: 3
    },
    {
      term: 'Axial Tilt',
      definition: "The 23.5-degree angle of Earth's axis. This tilt is responsible for seasons.",
      emoji: '↗️',
      scene: 0
    },
    {
      term: 'Summer',
      definition:
        'The warmest season when your hemisphere is tilted toward the sun. Days are longest.',
      emoji: '☀️',
      scene: 1
    },
    {
      term: 'Winter',
      definition:
        'The coldest season when your hemisphere is tilted away from the sun. Days are shortest.',
      emoji: '❄️',
      scene: 1
    },
    {
      term: 'Spring',
      definition: 'The season of growth with increasing daylight and warming temperatures.',
      emoji: '🌱',
      scene: 2
    },
    {
      term: 'Fall',
      definition: 'The season of change with decreasing daylight and cooling temperatures.',
      emoji: '🍂',
      scene: 2
    },
    {
      term: 'Hemisphere',
      definition: 'One half of Earth. Northern and southern hemispheres have opposite seasons.',
      emoji: '🌍',
      scene: 3
    },
    {
      term: 'Orbit',
      definition: "Earth's yearly path around the sun, completing one orbit every 365 days.",
      emoji: '🛤️',
      scene: 0
    }
  ]
};

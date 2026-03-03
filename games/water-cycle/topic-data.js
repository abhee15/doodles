/**
 * Water Cycle — Topic Data
 */

window.TOPIC_DATA = {
  id: 'water-cycle',
  name: 'Water Cycle',
  tagline: 'Follow water on its endless journey',
  icon: 'ti-droplet',

  color: {
    nav: '#0c4a6e',
    accent: '#38bdf8',
    accent2: '#0ea5e9',
    bg: '#f0f9ff',
    card: '#ffffff',
    border: 'rgba(56, 189, 248, 0.2)'
  },

  scenes: [
    {
      id: 'evaporation',
      title: 'Evaporation: Water Rises',
      narration:
        'The sun heats water in oceans, lakes, and rivers, turning it into water vapor — an invisible gas. This process is called evaporation. The warmer the sun, the faster water evaporates and rises into the atmosphere.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-ev',
            type: 'circle',
            cx: 350,
            cy: 50,
            r: 30,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'ocean',
            type: 'rect',
            x: 0,
            y: 150,
            width: 400,
            height: 150,
            fill: '#0369a1'
          },
          {
            id: 'ray-heat-1',
            type: 'line',
            x1: 350,
            y1: 80,
            x2: 320,
            y2: 150,
            stroke: '#fde68a',
            strokeWidth: 2,
            class: 'se-anim-ray'
          },
          {
            id: 'ray-heat-2',
            type: 'line',
            x1: 350,
            y1: 80,
            x2: 350,
            y2: 150,
            stroke: '#fde68a',
            strokeWidth: 2,
            class: 'se-anim-ray',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'ray-heat-3',
            type: 'line',
            x1: 350,
            y1: 80,
            x2: 380,
            y2: 150,
            stroke: '#fde68a',
            strokeWidth: 2,
            class: 'se-anim-ray',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'vapor-1',
            type: 'circle',
            cx: 100,
            cy: 140,
            r: 8,
            fill: '#dbeafe',
            opacity: 0.6,
            class: 'se-anim-float-up'
          },
          {
            id: 'vapor-2',
            type: 'circle',
            cx: 200,
            cy: 140,
            r: 8,
            fill: '#dbeafe',
            opacity: 0.6,
            class: 'se-anim-float-up',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'vapor-3',
            type: 'circle',
            cx: 300,
            cy: 140,
            r: 8,
            fill: '#dbeafe',
            opacity: 0.6,
            class: 'se-anim-float-up',
            style: 'animation-delay:0.4s'
          }
        ]
      },
      terms: [
        {
          word: 'Evaporation',
          definition: 'The process where liquid water turns into water vapor gas.',
          emoji: '💨',
          attachTo: '#vapor-1',
          labelPosition: 'top'
        },
        {
          word: 'Water Vapor',
          definition: 'Invisible water gas in the air that came from evaporated water.',
          emoji: '☁️',
          attachTo: '#vapor-2',
          labelPosition: 'top'
        }
      ]
    },

    {
      id: 'condensation',
      title: 'Condensation: Clouds Form',
      narration:
        'As water vapor rises higher, the air gets cooler. The water vapor cools down and turns back into tiny liquid water droplets. Millions of these droplets cluster together to form clouds. This process is called condensation.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'vapor-rising',
            type: 'circle',
            cx: 80,
            cy: 200,
            r: 6,
            fill: '#dbeafe',
            opacity: 0.5
          },
          {
            id: 'vapor-rising-2',
            type: 'circle',
            cx: 100,
            cy: 180,
            r: 6,
            fill: '#dbeafe',
            opacity: 0.5
          },
          {
            id: 'vapor-rising-3',
            type: 'circle',
            cx: 80,
            cy: 160,
            r: 6,
            fill: '#dbeafe',
            opacity: 0.5
          },
          {
            id: 'cloud-1',
            type: 'ellipse',
            cx: 120,
            cy: 100,
            rx: 50,
            ry: 30,
            fill: '#e0e7ff',
            class: 'se-anim-appear'
          },
          {
            id: 'cloud-2',
            type: 'ellipse',
            cx: 180,
            cy: 90,
            rx: 45,
            ry: 28,
            fill: '#e0e7ff',
            class: 'se-anim-appear',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'cloud-3',
            type: 'ellipse',
            cx: 240,
            cy: 100,
            rx: 50,
            ry: 30,
            fill: '#e0e7ff',
            class: 'se-anim-appear',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'temp-arrow',
            type: 'path',
            d: 'M 320 200 L 320 80 M 320 80 L 310 100 M 320 80 L 330 100',
            stroke: '#3b82f6',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-ray'
          },
          {
            id: 'temp-label',
            type: 'text',
            x: 340,
            y: 150,
            fontSize: 12,
            fill: '#3b82f6',
            fontWeight: 'bold'
          }
        ]
      },
      terms: [
        {
          word: 'Condensation',
          definition: 'The process where water vapor cools and turns back into liquid droplets.',
          emoji: '❄️',
          attachTo: '#cloud-1',
          labelPosition: 'bottom'
        },
        {
          word: 'Cloud',
          definition: 'Billions of tiny water droplets clustered together in the sky.',
          emoji: '☁️',
          attachTo: '#cloud-2',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'precipitation',
      title: 'Precipitation: Rain Falls',
      narration:
        'As more and more water droplets gather in the cloud, it becomes heavier and heavier. Eventually, the droplets combine and become too heavy to float in the air. They fall as precipitation — rain, snow, sleet, or hail.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'cloud-heavy',
            type: 'ellipse',
            cx: 200,
            cy: 60,
            rx: 80,
            ry: 50,
            fill: '#94a3b8'
          },
          {
            id: 'rain-1',
            type: 'line',
            x1: 140,
            y1: 120,
            x2: 130,
            y2: 160,
            stroke: '#38bdf8',
            strokeWidth: 3,
            class: 'se-anim-float-up'
          },
          {
            id: 'rain-2',
            type: 'line',
            x1: 180,
            y1: 130,
            x2: 170,
            y2: 170,
            stroke: '#38bdf8',
            strokeWidth: 3,
            class: 'se-anim-float-up',
            style: 'animation-delay:0.2s'
          },
          {
            id: 'rain-3',
            type: 'line',
            x1: 220,
            y1: 130,
            x2: 210,
            y2: 170,
            stroke: '#38bdf8',
            strokeWidth: 3,
            class: 'se-anim-float-up',
            style: 'animation-delay:0.4s'
          },
          {
            id: 'rain-4',
            type: 'line',
            x1: 260,
            y1: 120,
            x2: 250,
            y2: 160,
            stroke: '#38bdf8',
            strokeWidth: 3,
            class: 'se-anim-float-up',
            style: 'animation-delay:0.1s'
          },
          {
            id: 'rain-5',
            type: 'line',
            x1: 300,
            y1: 130,
            x2: 290,
            y2: 170,
            stroke: '#38bdf8',
            strokeWidth: 3,
            class: 'se-anim-float-up',
            style: 'animation-delay:0.3s'
          },
          {
            id: 'ground',
            type: 'rect',
            x: 0,
            y: 220,
            width: 400,
            height: 80,
            fill: '#8d6e63'
          },
          {
            id: 'puddle',
            type: 'ellipse',
            cx: 200,
            cy: 230,
            rx: 80,
            ry: 20,
            fill: '#38bdf8',
            opacity: 0.6,
            class: 'se-anim-appear'
          }
        ]
      },
      terms: [
        {
          word: 'Precipitation',
          definition: 'Water falling from clouds as rain, snow, sleet, or hail.',
          emoji: '🌧️',
          attachTo: '#rain-3',
          labelPosition: 'right'
        },
        {
          word: 'Rain',
          definition: 'Liquid water falling from clouds to the ground.',
          emoji: '💧',
          attachTo: '#puddle',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'collection',
      title: 'Collection: Water Gathers',
      narration:
        'When rain falls, it soaks into the ground to refill underground reserves, or it flows downhill as runoff into streams and rivers. All this water eventually ends up in lakes and oceans, where the cycle can begin again.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'mountain',
            type: 'polygon',
            points: '50,150 150,50 250,150',
            fill: '#a0aec0'
          },
          {
            id: 'stream',
            type: 'path',
            d: 'M 150 150 Q 180 180 200 220',
            stroke: '#38bdf8',
            strokeWidth: 6,
            fill: 'none',
            class: 'se-anim-ray'
          },
          {
            id: 'lake',
            type: 'ellipse',
            cx: 100,
            cy: 240,
            rx: 60,
            ry: 40,
            fill: '#0369a1',
            class: 'se-anim-appear'
          },
          {
            id: 'ocean-coll',
            type: 'rect',
            x: 200,
            y: 200,
            width: 200,
            height: 100,
            fill: '#0369a1'
          },
          {
            id: 'groundwater',
            type: 'circle',
            cx: 280,
            cy: 100,
            r: 5,
            fill: '#38bdf8',
            opacity: 0.4
          },
          {
            id: 'groundwater-2',
            type: 'circle',
            cx: 320,
            cy: 120,
            r: 5,
            fill: '#38bdf8',
            opacity: 0.4
          }
        ]
      },
      terms: [
        {
          word: 'Runoff',
          definition: 'Water that flows downhill over land into streams and rivers.',
          emoji: '🌊',
          attachTo: '#stream',
          labelPosition: 'right'
        },
        {
          word: 'Collection',
          definition: 'When water gathers in oceans, lakes, and underground reservoirs.',
          emoji: '💧',
          attachTo: '#lake',
          labelPosition: 'bottom'
        }
      ]
    },

    {
      id: 'full-cycle',
      title: 'The Complete Water Cycle',
      narration:
        'This endless journey — evaporation, condensation, precipitation, and collection — makes up the water cycle. The same water that falls as rain today may have been part of ancient oceans or dinosaur sweat! Water keeps cycling continuously around our planet.',
      svg: {
        viewBox: '0 0 400 300',
        elements: [
          {
            id: 'sun-fc',
            type: 'circle',
            cx: 350,
            cy: 40,
            r: 25,
            fill: '#fbbf24',
            class: 'se-anim-pulse'
          },
          {
            id: 'cloud-fc',
            type: 'ellipse',
            cx: 100,
            cy: 60,
            rx: 50,
            ry: 35,
            fill: '#e0e7ff'
          },
          {
            id: 'ocean-fc',
            type: 'rect',
            x: 0,
            y: 200,
            width: 400,
            height: 100,
            fill: '#0369a1'
          },
          {
            id: 'cycle-arrow',
            type: 'path',
            d: 'M 60 180 Q 80 100 150 80 Q 220 60 300 100 Q 330 150 280 220 Q 200 240 100 220 Q 40 210 60 180',
            stroke: '#38bdf8',
            strokeWidth: 3,
            fill: 'none',
            class: 'se-anim-spin',
            style: 'animation-duration:8s'
          },
          {
            id: 'evap-label',
            type: 'text',
            x: 300,
            y: 150,
            fontSize: 12,
            fill: '#666',
            textAnchor: 'middle'
          },
          {
            id: 'cond-label',
            type: 'text',
            x: 150,
            y: 40,
            fontSize: 12,
            fill: '#666',
            textAnchor: 'middle'
          },
          {
            id: 'precip-label',
            type: 'text',
            x: 100,
            y: 200,
            fontSize: 12,
            fill: '#666',
            textAnchor: 'middle'
          }
        ]
      },
      terms: [
        {
          word: 'Water Cycle',
          definition:
            'The continuous movement of water from oceans to atmosphere to land and back again through evaporation, condensation, precipitation, and collection.',
          emoji: '🔄',
          attachTo: '#cycle-arrow',
          labelPosition: 'center'
        }
      ]
    }
  ],

  lab: {
    title: 'Lab: Weather Station',
    instruction:
      'Adjust the temperature and sun intensity to see how they affect evaporation, clouds, and rain.',
    controls: [
      {
        id: 'temperature',
        label: 'Temperature',
        type: 'range',
        min: -10,
        max: 40,
        default: 20,
        unit: '°C',
        emoji: '🌡️'
      },
      {
        id: 'sun',
        label: 'Sun Intensity',
        type: 'toggle',
        default: true,
        emoji: '☀️'
      },
      {
        id: 'clouds',
        label: 'Cloud Coverage',
        type: 'toggle',
        default: true,
        emoji: '☁️'
      }
    ],
    simulation: 'weather-station',
    discoveries: [
      {
        trigger: { temperature: [-10, -1] },
        message: '❄️ Below freezing! Precipitation falls as snow instead of rain.'
      },
      {
        trigger: { temperature: [30, 40] },
        message: '🔥 Very hot! Evaporation is happening super fast.'
      },
      {
        trigger: { sun: false },
        message: '🌑 No sun = no evaporation. The cycle slows way down!'
      },
      {
        trigger: { sun: true, clouds: true, temperature: [15, 25] },
        message: '⭐ Perfect weather! The water cycle is running beautifully at full speed.'
      }
    ]
  },

  glossary: [
    {
      term: 'Water Cycle',
      definition:
        'The continuous movement of water from oceans to atmosphere to land and back again.',
      emoji: '🔄',
      scene: 4
    },
    {
      term: 'Evaporation',
      definition:
        'The process where liquid water turns into water vapor gas and rises into the air.',
      emoji: '💨',
      scene: 0
    },
    {
      term: 'Condensation',
      definition: 'The process where water vapor cools and turns back into liquid water droplets.',
      emoji: '❄️',
      scene: 1
    },
    {
      term: 'Cloud',
      definition: 'Billions of tiny water droplets or ice crystals clustered together in the sky.',
      emoji: '☁️',
      scene: 1
    },
    {
      term: 'Precipitation',
      definition: 'Water falling from clouds as rain, snow, sleet, or hail.',
      emoji: '🌧️',
      scene: 2
    },
    {
      term: 'Runoff',
      definition: 'Water that flows downhill over land into streams and rivers.',
      emoji: '🌊',
      scene: 3
    }
  ]
};

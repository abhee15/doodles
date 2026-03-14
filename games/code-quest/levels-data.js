// Level definitions for Code Quest
const LEVELS = [
  // World 1: Sequences (Levels 1-8)
  {
    id: 1,
    title: 'First Steps',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 5,
    goalY: 0,
    walls: [],
    lava: [],
    hints: 'Move forward 5 times to reach the goal.',
    solution: [
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 2,
    title: 'Take a Turn',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 5,
    goalY: 5,
    walls: [],
    lava: [],
    hints: 'Move right, then turn left and move down.',
    solution: [
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 3,
    title: 'Around the Block',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 0,
    goalY: 0,
    walls: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0]
    ],
    lava: [],
    hints: 'Go around the wall to return to start.',
    solution: [
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 4,
    title: 'Square Dance',
    width: 6,
    height: 6,
    startX: 1,
    startY: 1,
    startDir: 'right',
    goalX: 1,
    goalY: 1,
    walls: [],
    lava: [],
    hints: 'Create a square path.',
    solution: [
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' }
    ]
  },
  {
    id: 5,
    title: 'Maze Start',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 5,
    goalY: 5,
    walls: [
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 2],
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    lava: [],
    hints: 'Navigate through the walls to reach the goal.',
    solution: [
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_right' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_right' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_left' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 6,
    title: 'Lava Crossing',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 5,
    goalY: 0,
    walls: [],
    lava: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1]
    ],
    hints: 'Avoid the lava by staying on the top row.',
    solution: [
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 7,
    title: 'Direction Master',
    width: 6,
    height: 6,
    startX: 2,
    startY: 2,
    startDir: 'right',
    goalX: 2,
    goalY: 4,
    walls: [],
    lava: [],
    hints: 'Use right turns to reach the goal.',
    solution: [
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_right' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'turn_right' },
      { type: 'turn_right' },
      { type: 'turn_right' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 8,
    title: 'Path to Victory',
    width: 6,
    height: 6,
    startX: 0,
    startY: 3,
    startDir: 'right',
    goalX: 5,
    goalY: 3,
    walls: [
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4]
    ],
    lava: [],
    hints: 'Stay in the middle path.',
    solution: [
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },

  // World 2: Loops (Levels 9-16)
  {
    id: 9,
    title: 'Repeat Basics',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 4,
    goalY: 0,
    walls: [],
    lava: [],
    hints: 'Use a repeat block to move forward 4 times.',
    solution: [{ type: 'repeat', nested: [{ type: 'move_forward' }] }]
  },
  {
    id: 10,
    title: 'Square with Loop',
    width: 6,
    height: 6,
    startX: 1,
    startY: 1,
    startDir: 'right',
    goalX: 1,
    goalY: 1,
    walls: [],
    lava: [],
    hints: 'Use repeat blocks to create a square.',
    solution: [
      {
        type: 'repeat',
        nested: [
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'turn_left' }
        ]
      }
    ]
  },
  {
    id: 11,
    title: 'Spiral Out',
    width: 6,
    height: 6,
    startX: 2,
    startY: 2,
    startDir: 'right',
    goalX: 5,
    goalY: 5,
    walls: [],
    lava: [],
    hints: 'Create a spiral pattern.',
    solution: [
      {
        type: 'repeat',
        nested: [
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'turn_left' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'turn_left' }
        ]
      }
    ]
  },
  {
    id: 12,
    title: 'Loop Challenge',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 0,
    goalY: 4,
    walls: [
      [2, 1],
      [2, 2],
      [2, 3]
    ],
    lava: [],
    hints: 'Use loops to navigate around the wall.',
    solution: [
      { type: 'repeat', nested: [{ type: 'move_forward' }, { type: 'turn_left' }] },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 13,
    title: 'Complex Maze',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 5,
    goalY: 5,
    walls: [
      [1, 1],
      [1, 2],
      [1, 3],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [5, 1],
      [5, 2],
      [5, 3]
    ],
    lava: [],
    hints: 'Use multiple loops and turns.',
    solution: [
      { type: 'move_forward' },
      { type: 'turn_left' },
      {
        type: 'repeat',
        nested: [
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'turn_right' }
        ]
      },
      { type: 'move_forward' },
      { type: 'move_forward' }
    ]
  },
  {
    id: 14,
    title: 'Efficient Path',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 4,
    goalY: 4,
    walls: [],
    lava: [],
    hints: 'Find the most efficient path using loops.',
    solution: [
      {
        type: 'repeat',
        nested: [
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'turn_left' }
        ]
      }
    ]
  },
  {
    id: 15,
    title: 'Nested Logic',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 2,
    goalY: 5,
    walls: [
      [1, 2],
      [1, 3],
      [1, 4],
      [3, 2],
      [3, 3],
      [3, 4]
    ],
    lava: [],
    hints: 'Combine loops strategically.',
    solution: [
      {
        type: 'repeat',
        nested: [
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'turn_left' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' }
        ]
      }
    ]
  },
  {
    id: 16,
    title: 'Final Challenge',
    width: 6,
    height: 6,
    startX: 0,
    startY: 0,
    startDir: 'right',
    goalX: 5,
    goalY: 5,
    walls: [
      [1, 0],
      [1, 1],
      [1, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [5, 2],
      [5, 3],
      [5, 4]
    ],
    lava: [
      [2, 1],
      [2, 4],
      [4, 2],
      [4, 5]
    ],
    hints: 'Master all skills: sequences, turns, loops, and navigation.',
    solution: [
      { type: 'turn_left' },
      {
        type: 'repeat',
        nested: [
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'move_forward' },
          { type: 'turn_right' }
        ]
      },
      { type: 'move_forward' }
    ]
  }
];

function getTotalLevels() {
  return LEVELS.length;
}

function getLevel(levelId) {
  return LEVELS.find(l => l.id === levelId);
}

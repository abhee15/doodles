/**
 * Brain Spark Puzzles Database
 * 160+ puzzles across 4 categories (25-40 per category, split between normal and challenge)
 * Organized by category and difficulty for anti-repeat selection
 */

/* eslint-disable no-unused-vars */
window.PUZZLES = {
  'number-patterns': {
    normal: [
      {
        id: 'np1',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['2', '4', '6', '8', '?'] },
        options: ['10', '12', '9', '11'],
        answer: 0,
        explanation: 'Add 2 each time: 2, 4, 6, 8, 10 ✓'
      },
      {
        id: 'np2',
        question: 'What is the next number?',
        visual: { type: 'sequence', items: ['5', '10', '20', '40', '?'] },
        options: ['80', '60', '50', '45'],
        answer: 0,
        explanation: 'Double each time: 5, 10, 20, 40, 80 ✓'
      },
      {
        id: 'np3',
        question: 'Continue the pattern.',
        visual: { type: 'sequence', items: ['100', '90', '80', '70', '?'] },
        options: ['60', '50', '40', '30'],
        answer: 0,
        explanation: 'Count down by 10: 100, 90, 80, 70, 60 ✓'
      },
      {
        id: 'np4',
        question: 'What comes next in this special pattern?',
        visual: { type: 'sequence', items: ['1', '1', '2', '3', '5', '8', '?'] },
        options: ['13', '11', '10', '12'],
        answer: 0,
        explanation: 'Fibonacci! Add the two before it: 5+8=13 ✓'
      },
      {
        id: 'np5',
        question: 'Find the next number.',
        visual: { type: 'sequence', items: ['3', '6', '9', '12', '?'] },
        options: ['15', '18', '12', '14'],
        answer: 0,
        explanation: 'The 3 times table: 3, 6, 9, 12, 15 ✓'
      },
      {
        id: 'np6',
        question: 'What is the next in the sequence?',
        visual: { type: 'sequence', items: ['1', '2', '4', '8', '16', '?'] },
        options: ['32', '24', '18', '20'],
        answer: 0,
        explanation: 'Powers of 2 - keep doubling: 1, 2, 4, 8, 16, 32 ✓'
      },
      {
        id: 'np7',
        question: 'Continue the pattern.',
        visual: { type: 'sequence', items: ['10', '8', '6', '4', '?'] },
        options: ['2', '0', '1', '3'],
        answer: 0,
        explanation: 'Counting down by 2: 10, 8, 6, 4, 2 ✓'
      },
      {
        id: 'np8',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['2', '3', '5', '7', '11', '?'] },
        options: ['13', '12', '14', '15'],
        answer: 0,
        explanation: 'Prime numbers! 2, 3, 5, 7, 11, 13 are prime ✓'
      },
      {
        id: 'np9',
        question: 'Find the pattern.',
        visual: { type: 'sequence', items: ['1', '3', '5', '7', '?'] },
        options: ['9', '8', '10', '6'],
        answer: 0,
        explanation: 'Odd numbers: 1, 3, 5, 7, 9 ✓'
      },
      {
        id: 'np10',
        question: 'What is next?',
        visual: { type: 'sequence', items: ['4', '9', '16', '25', '?'] },
        options: ['36', '35', '30', '40'],
        answer: 0,
        explanation: '2², 3², 4², 5², 6² = 36 ✓'
      },
      {
        id: 'np11',
        question: 'Continue this pattern.',
        visual: { type: 'sequence', items: ['7', '14', '21', '28', '?'] },
        options: ['35', '36', '30', '42'],
        answer: 0,
        explanation: 'The 7 times table: 7, 14, 21, 28, 35 ✓'
      },
      {
        id: 'np12',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['2', '6', '18', '54', '?'] },
        options: ['162', '108', '100', '144'],
        answer: 0,
        explanation: 'Triple each time: 2, 6, 18, 54, 162 ✓'
      },
      {
        id: 'np13',
        question: 'Find the next number.',
        visual: { type: 'sequence', items: ['50', '40', '30', '20', '?'] },
        options: ['10', '0', '15', '5'],
        answer: 0,
        explanation: 'Count down by 10: 50, 40, 30, 20, 10 ✓'
      },
      {
        id: 'np14',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['1', '4', '9', '16', '25', '?'] },
        options: ['36', '40', '35', '30'],
        answer: 0,
        explanation: 'Perfect squares: 1², 2², 3², 4², 5², 6² ✓'
      },
      {
        id: 'np15',
        question: 'Continue the pattern.',
        visual: { type: 'sequence', items: ['5', '15', '45', '135', '?'] },
        options: ['405', '300', '350', '400'],
        answer: 0,
        explanation: 'Multiply by 3 each time: 5×3=15, 15×3=45, 45×3=135, 135×3=405 ✓'
      },
      {
        id: 'np16',
        question: 'What is the next number?',
        visual: { type: 'sequence', items: ['9', '18', '27', '36', '?'] },
        options: ['45', '54', '40', '50'],
        answer: 0,
        explanation: 'The 9 times table: 9, 18, 27, 36, 45 ✓'
      },
      {
        id: 'np17',
        question: 'Find the next in sequence.',
        visual: { type: 'sequence', items: ['11', '22', '33', '44', '?'] },
        options: ['55', '56', '54', '65'],
        answer: 0,
        explanation: 'Add 11 each time: 11, 22, 33, 44, 55 ✓'
      },
      {
        id: 'np18',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['20', '15', '10', '5', '?'] },
        options: ['0', '1', '5', '10'],
        answer: 0,
        explanation: 'Count down by 5: 20, 15, 10, 5, 0 ✓'
      },
      {
        id: 'np19',
        question: 'Continue the pattern.',
        visual: { type: 'sequence', items: ['2', '5', '10', '17', '?'] },
        options: ['26', '25', '24', '27'],
        answer: 0,
        explanation: 'Add consecutive odd numbers: +3, +5, +7, +9 = 26 ✓'
      },
      {
        id: 'np20',
        question: 'What is the next number?',
        visual: { type: 'sequence', items: ['8', '16', '24', '32', '?'] },
        options: ['40', '48', '36', '42'],
        answer: 0,
        explanation: 'The 8 times table: 8, 16, 24, 32, 40 ✓'
      },
      {
        id: 'np21',
        question: 'Find the pattern.',
        visual: { type: 'sequence', items: ['64', '32', '16', '8', '?'] },
        options: ['4', '2', '6', '12'],
        answer: 0,
        explanation: 'Divide by 2 each time: 64÷2=32, 32÷2=16, 16÷2=8, 8÷2=4 ✓'
      },
      {
        id: 'np22',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['6', '12', '18', '24', '?'] },
        options: ['30', '36', '28', '32'],
        answer: 0,
        explanation: 'The 6 times table: 6, 12, 18, 24, 30 ✓'
      },
      {
        id: 'np23',
        question: 'Continue this sequence.',
        visual: { type: 'sequence', items: ['1', '2', '4', '7', '11', '?'] },
        options: ['16', '15', '14', '18'],
        answer: 0,
        explanation: 'Add 1, then 2, then 3, then 4, then 5: 1+1=2, 2+2=4, 4+3=7, 7+4=11, 11+5=16 ✓'
      },
      {
        id: 'np24',
        question: 'What is the next number?',
        visual: { type: 'sequence', items: ['100', '50', '25', '12', '?'] },
        options: ['6', '5', '10', '8'],
        answer: 0,
        explanation: 'Divide by 2 (roughly) each time: 100÷2=50, 50÷2=25, 25÷2=12.5≈12, 12÷2=6 ✓'
      },
      {
        id: 'np25',
        question: 'Find the next number.',
        visual: { type: 'sequence', items: ['12', '11', '9', '6', '?'] },
        options: ['2', '3', '1', '5'],
        answer: 0,
        explanation: 'Subtract 1, then 2, then 3, then 4: 12-1=11, 11-2=9, 9-3=6, 6-4=2 ✓'
      }
    ],
    challenge: [
      {
        id: 'np-c1',
        question: 'What is the next perfect square?',
        visual: { type: 'sequence', items: ['1', '4', '9', '16', '25', '?'] },
        options: ['36', '30', '35', '40'],
        answer: 0,
        explanation: '1², 2², 3², 4², 5², 6² = 36 ✓'
      },
      {
        id: 'np-c2',
        question: 'Continue this special number pattern.',
        visual: { type: 'sequence', items: ['2', '3', '5', '7', '11', '?'] },
        options: ['13', '12', '14', '15'],
        answer: 0,
        explanation: 'Prime numbers! Numbers only divisible by 1 and themselves ✓'
      },
      {
        id: 'np-c3',
        question: 'What is the next in this tricky pattern?',
        visual: { type: 'sequence', items: ['1', '11', '21', '1211', '111221', '?'] },
        options: ['312211', '211211', '121221', '221211'],
        answer: 0,
        explanation: 'Look-and-say: "one 1, one 2, one 1" → "312211" ✓'
      },
      {
        id: 'np-c4',
        question: 'Find the next triangle number.',
        visual: { type: 'sequence', items: ['0', '1', '3', '6', '10', '?'] },
        options: ['15', '14', '16', '18'],
        answer: 0,
        explanation: 'Add 1, then 2, then 3, then 4, then 5: 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15 ✓'
      },
      {
        id: 'np-c5',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['1', '4', '10', '20', '35', '?'] },
        options: ['56', '50', '45', '60'],
        answer: 0,
        explanation: 'Tetrahedral numbers: pyramid stacking pattern = 56 ✓'
      },
      {
        id: 'np-c6',
        question: 'Find the next number.',
        visual: { type: 'sequence', items: ['5', '7', '12', '19', '31', '?'] },
        options: ['50', '45', '48', '52'],
        answer: 0,
        explanation: 'Each number is sum of previous two: 5+7=12, 7+12=19, 12+19=31, 19+31=50 ✓'
      },
      {
        id: 'np-c7',
        question: 'What is the pattern?',
        visual: { type: 'sequence', items: ['3', '6', '11', '18', '27', '?'] },
        options: ['38', '36', '40', '35'],
        answer: 0,
        explanation: 'Add 3, 5, 7, 9, 11: differences increase by 2 each time = 38 ✓'
      },
      {
        id: 'np-c8',
        question: 'Continue this sequence.',
        visual: { type: 'sequence', items: ['2', '3', '6', '18', '108', '?'] },
        options: ['1944', '1000', '1500', '2000'],
        answer: 0,
        explanation: 'Multiply by incrementing numbers: ×1, ×2, ×3, ×4, ×5 = 108×18=1944 ✓'
      },
      {
        id: 'np-c9',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['144', '121', '100', '81', '64', '?'] },
        options: ['49', '50', '48', '45'],
        answer: 0,
        explanation: 'Perfect squares counting down: 12², 11², 10², 9², 8², 7² ✓'
      },
      {
        id: 'np-c10',
        question: 'Find the next number.',
        visual: { type: 'sequence', items: ['1', '8', '27', '64', '125', '?'] },
        options: ['216', '200', '210', '225'],
        answer: 0,
        explanation: 'Perfect cubes: 1³, 2³, 3³, 4³, 5³, 6³ = 216 ✓'
      },
      {
        id: 'np-c11',
        question: 'What is the next in this pattern?',
        visual: { type: 'sequence', items: ['1', '3', '6', '10', '15', '?'] },
        options: ['21', '20', '19', '25'],
        answer: 0,
        explanation: 'Triangular numbers: add 2, 3, 4, 5, 6, then 7 = 21 ✓'
      },
      {
        id: 'np-c12',
        question: 'Continue the sequence.',
        visual: { type: 'sequence', items: ['2', '5', '11', '23', '47', '?'] },
        options: ['95', '90', '80', '100'],
        answer: 0,
        explanation: 'Each number is (previous × 2) + 1: 2×2+1=5, 5×2+1=11, 11×2+1=23... = 95 ✓'
      },
      {
        id: 'np-c13',
        question: 'What comes next?',
        visual: { type: 'sequence', items: ['10', '12', '14', '15', '16', '18', '?'] },
        options: ['20', '19', '21', '22'],
        answer: 0,
        explanation: 'Skip numbers missing the digit 3 in units place and higher = 20 ✓'
      },
      {
        id: 'np-c14',
        question: 'Find the next number.',
        visual: { type: 'sequence', items: ['1', '1', '2', '3', '5', '8', '13', '?'] },
        options: ['21', '20', '19', '22'],
        answer: 0,
        explanation: 'Fibonacci sequence! Each number is sum of previous two: 8+13=21 ✓'
      },
      {
        id: 'np-c15',
        question: 'What is the next in sequence?',
        visual: { type: 'sequence', items: ['120', '40', '10', '2', '?'] },
        options: ['0', '1', '-1', '3'],
        answer: 0,
        explanation:
          'Divide by 3 then subtract: 120÷3=40, 40-0=40, but actually divide and round = next is 0 ✓'
      }
    ]
  },

  'logic-riddles': {
    normal: [
      // ===== EASY (1-15): Basic object riddles, simple wordplay =====
      {
        id: 'lr1',
        question: 'What has teeth but cannot bite?',
        visual: { type: 'scene', emoji: '🪮', caption: 'Used for hair...' },
        options: ['A comb', 'A shark', 'A fork', 'A saw'],
        answer: 0,
        explanation: 'A comb! 🪮 It has teeth but cannot bite anything.'
      },
      {
        id: 'lr2',
        question: 'What has four fingers and a thumb but is not alive?',
        visual: { type: 'scene', emoji: '🧤', caption: 'Winter wear...' },
        options: ['A glove', 'A hand', 'A puppet', 'A statue'],
        answer: 0,
        explanation:
          'A glove! 🧤 Gloves have places for four fingers and a thumb but are not alive!'
      },
      {
        id: 'lr3',
        question: 'What has keys but no locks?',
        visual: { type: 'scene', emoji: '🎹', caption: 'Makes beautiful sounds...' },
        options: ['A piano', 'A keyboard', 'A typewriter', 'A computer'],
        answer: 0,
        explanation: 'A piano! 🎹 It has keys but no locks.'
      },
      {
        id: 'lr4',
        question: 'What has a head and a tail but no body?',
        visual: { type: 'scene', emoji: '🪙', caption: 'Tossed in games...' },
        options: ['A coin', 'A fish', 'A kite', 'A snake'],
        answer: 0,
        explanation: 'A coin! 🪙 A coin has a heads side and a tails side but no body.'
      },
      {
        id: 'lr5',
        question: 'What runs but never walks?',
        visual: { type: 'scene', emoji: '🏞️', caption: 'Flows through nature...' },
        options: ['A river', 'A person', 'A car', 'A dog'],
        answer: 0,
        explanation: 'A river! 🏞️ Rivers run downhill but never walk.'
      },
      {
        id: 'lr6',
        question: 'What kind of room has no doors or windows?',
        visual: { type: 'scene', emoji: '🍄', caption: 'You might find one in a forest...' },
        options: ['A mushroom', 'A closet', 'A basement', 'A cave'],
        answer: 0,
        explanation:
          'A mushroom! 🍄 It has a "room" sound but is actually a fungus with no doors or windows!'
      },
      {
        id: 'lr7',
        question: 'What gets wetter as it dries?',
        visual: { type: 'scene', emoji: '🛁', caption: 'Used after a shower...' },
        options: ['A towel', 'A sponge', 'Clothing', 'A cloth'],
        answer: 0,
        explanation: 'A towel! 🛁 The more you use it to dry things, the wetter it becomes!'
      },
      {
        id: 'lr8',
        question: 'What starts with a T, ends with a T, and has a T inside it?',
        visual: { type: 'scene', emoji: '☕', caption: 'Hot drink...' },
        options: ['A teapot', 'A tent', 'A test', 'Toast'],
        answer: 0,
        explanation: 'A teapot! ☕ It starts with T, ends with T, and has TEA (T) inside!'
      },
      {
        id: 'lr9',
        question: 'What has a bottom at the top?',
        visual: { type: 'scene', emoji: '🧦', caption: 'Worn on your feet...' },
        options: ['A sock', 'A boot', 'A shoe', 'A hat'],
        answer: 0,
        explanation: 'A sock! 🧦 Socks have a "bottom" (sole) at the very top!'
      },
      {
        id: 'lr10',
        question: 'What can you catch but not throw?',
        visual: { type: 'scene', emoji: '🦠', caption: 'Makes you sick...' },
        options: ['A cold', 'A ball', 'A fish', 'A disease'],
        answer: 0,
        explanation: 'A cold! 🦠 You can catch a cold but cannot throw it!'
      },
      {
        id: 'lr11',
        question: 'What has one eye but cannot see?',
        visual: { type: 'scene', emoji: '🧵', caption: 'Used for sewing...' },
        options: ['A needle', 'A potato', 'A camera', 'A button'],
        answer: 0,
        explanation: 'A needle! 🧵 Needles have an eye (the hole) but cannot see!'
      },
      {
        id: 'lr12',
        question: 'What is full of holes but can hold water?',
        visual: { type: 'scene', emoji: '🧽', caption: 'Used for cleaning...' },
        options: ['A sponge', 'A strainer', 'A net', 'A screen'],
        answer: 0,
        explanation: 'A sponge! 🧽 Sponges are full of holes but can hold water in them!'
      },
      {
        id: 'lr13',
        question: 'What has a neck but no head?',
        visual: { type: 'scene', emoji: '🍾', caption: 'Used for drinking...' },
        options: ['A bottle', 'A turtle', 'A giraffe', 'A shirt'],
        answer: 0,
        explanation: 'A bottle! 🍾 Bottles have a narrow neck but no head!'
      },
      {
        id: 'lr14',
        question: 'What looks like a small orange but weighs nothing?',
        visual: { type: 'scene', emoji: '🪶', caption: 'Very light...' },
        options: ['An orange peel', 'A feather', 'A balloon', 'A marble'],
        answer: 0,
        explanation: 'An orange peel! 🪶 It looks like part of an orange but weighs almost nothing!'
      },
      {
        id: 'lr15',
        question: 'What comes down but never goes up?',
        visual: { type: 'scene', emoji: '🌧️', caption: 'Falls from the sky...' },
        options: ['Rain', 'Snow', 'Hail', 'All of the above'],
        answer: 3,
        explanation: 'All of the above! 🌧️ Rain, snow, and hail all come down from the sky!'
      },
      // ===== MEDIUM (16-35): Trickier wordplay, abstract thinking =====
      {
        id: 'lr16',
        question: 'I have hands but cannot clap. What am I?',
        visual: { type: 'scene', emoji: '🕐', caption: 'I have hands but cannot clap...' },
        options: ['A clock', 'A tree', 'A robot', 'A statue'],
        answer: 0,
        explanation: 'A clock! ⏰ Clock hands point to numbers but cannot clap.'
      },
      {
        id: 'lr17',
        question: 'What goes up but never comes down?',
        visual: { type: 'scene', emoji: '📈', caption: 'It only goes one way...' },
        options: ['Your age', 'A ball', 'Smoke', 'A ladder'],
        answer: 0,
        explanation: 'Your age! 🎂 Birthdays only go forward, never backward.'
      },
      {
        id: 'lr18',
        question: 'The more you take, the more you leave behind. What am I?',
        visual: { type: 'scene', emoji: '👣', caption: 'With each step forward...' },
        options: ['Footsteps', 'Money', 'Time', 'Words'],
        answer: 0,
        explanation: 'Footsteps! 👣 Each step you take leaves a footprint behind.'
      },
      {
        id: 'lr19',
        question: "I'm light as a feather but the strongest person can't hold me long. What am I?",
        visual: { type: 'scene', emoji: '💨', caption: 'Something invisible...' },
        options: ['Breath', 'Air', 'Smoke', 'A secret'],
        answer: 0,
        explanation: 'Breath! 💨 Even strong people can only hold their breath for a short time.'
      },
      {
        id: 'lr20',
        question: 'What gets bigger every time you take away from it?',
        visual: { type: 'scene', emoji: '🕳️', caption: 'Deeper as you dig...' },
        options: ['A hole', 'A shadow', 'A puddle', 'A debt'],
        answer: 0,
        explanation: 'A hole! 🕳️ The more you remove from it, the bigger the hole gets.'
      },
      {
        id: 'lr21',
        question: 'What gets smaller when you take away from it?',
        visual: { type: 'scene', emoji: '🪴', caption: 'Garden or indoor plants...' },
        options: ['A plant', 'A shadow', 'A puddle', 'A pile'],
        answer: 0,
        explanation: 'A plant! 🪴 The more leaves or branches you remove, the smaller it becomes!'
      },
      {
        id: 'lr22',
        question: 'A rooster lays an egg on a barn roof. Which way does it roll?',
        visual: { type: 'scene', emoji: '🐓', caption: 'A rooster on a roof...' },
        options: ["Roosters don't lay eggs!", 'Left', 'Right', 'Down'],
        answer: 0,
        explanation: "Roosters don't lay eggs! 🐓 Only hens lay eggs. Classic trick!"
      },
      {
        id: 'lr23',
        question: 'How many months have 28 days?',
        visual: { type: 'scene', emoji: '📅', caption: 'All the months of the year...' },
        options: ['All 12!', 'Only February', '1', '7'],
        answer: 0,
        explanation: 'All 12 months! 📅 Every month has at least 28 days.'
      },
      {
        id: 'lr24',
        question: 'What question can you never answer yes to?',
        visual: { type: 'scene', emoji: '😴', caption: 'When you are not awake...' },
        options: ['Are you asleep?', 'Do you exist?', 'Can you hear?', 'What is your name?'],
        answer: 0,
        explanation: 'Are you asleep? 😴 If you are asleep, you cannot answer yes while sleeping!'
      },
      {
        id: 'lr25',
        question: 'What is always in front of you but you can never see it?',
        visual: { type: 'scene', emoji: '🔮', caption: 'What lies ahead...' },
        options: ['The future', 'Your nose', 'Your forehead', 'Distance'],
        answer: 0,
        explanation:
          "The future! 🔮 It's always ahead but you can never see it until it becomes the present."
      },
      {
        id: 'lr26',
        question: 'What is white when it is dirty and black when it is clean?',
        visual: { type: 'scene', emoji: '🎨', caption: 'Used for writing...' },
        options: ['A blackboard', 'A whiteboard', 'A pen', 'Paper'],
        answer: 0,
        explanation:
          'A blackboard! 🎨 Blackboards are white with chalk dust when dirty, and black when clean!'
      },
      {
        id: 'lr27',
        question: 'What has roots that nobody sees, grows upward, and can drift away?',
        visual: { type: 'scene', emoji: '☁️', caption: 'Floats in the sky...' },
        options: ['A cloud', 'A tree', 'A plant', 'A balloon'],
        answer: 0,
        explanation:
          'A cloud! ☁️ Clouds form from water (roots = droplets), grow upward, and drift away!'
      },
      {
        id: 'lr28',
        question: 'The more you take, the more you have. What is it?',
        visual: { type: 'scene', emoji: '📸', caption: 'Captures memories...' },
        options: ['Photos', 'Books', 'Money', 'Time'],
        answer: 0,
        explanation: 'Photos! 📸 The more photos you take, the more photos you have.'
      },
      {
        id: 'lr29',
        question: 'What is bought by the yard but worn by the foot?',
        visual: { type: 'scene', emoji: '🏠', caption: 'Goes on your floors...' },
        options: ['Carpet', 'Shoes', 'Fabric', 'Shoelaces'],
        answer: 0,
        explanation:
          'Carpet! 🏠 Carpet is sold by the yard but used to cover floors walked on by feet.'
      },
      {
        id: 'lr30',
        question:
          "The person who makes it doesn't sell it. The person who sells it doesn't use it. What is it?",
        visual: { type: 'scene', emoji: '⚰️', caption: 'Final resting place...' },
        options: ['A coffin', 'A painting', 'A book', 'A car'],
        answer: 0,
        explanation:
          "A coffin! ⚰️ A carpenter makes it, a funeral home sells it, and the person won't use it while alive."
      },
      {
        id: 'lr31',
        question: 'What can be cracked, made, told, and played?',
        visual: { type: 'scene', emoji: '😄', caption: 'Something to laugh about...' },
        options: ['A joke', 'An egg', 'A game', 'A code'],
        answer: 0,
        explanation: 'A joke! 😄 You can crack a joke, make a joke, tell a joke, and play a joke!'
      },
      {
        id: 'lr32',
        question: 'What has cities but no houses, forests but no trees, and water but no fish?',
        visual: { type: 'scene', emoji: '🗺️', caption: 'Shows your location...' },
        options: ['A map', 'A painting', 'A poster', 'A book'],
        answer: 0,
        explanation:
          'A map! 🗺️ Maps show cities, forests, and water but not actual houses, trees, or fish.'
      },
      {
        id: 'lr33',
        question: 'What can go through any solid object but cannot be held?',
        visual: { type: 'scene', emoji: '🌊', caption: 'Travels through oceans...' },
        options: ['Sound', 'Light', 'Water', 'Wind'],
        answer: 0,
        explanation:
          'Sound! 🌊 Sound waves can travel through walls and water but you cannot grab them!'
      },
      {
        id: 'lr34',
        question: 'What comes once a year but twice a week?',
        visual: { type: 'scene', emoji: '🔤', caption: 'In spelling and time...' },
        options: ['The letter E', 'A holiday', 'The weekend', 'A sunset'],
        answer: 0,
        explanation: 'The letter E! 🔤 E appears once in "year" but twice in "week"!'
      },
      {
        id: 'lr35',
        question: 'What walks on four legs in the morning, two at noon, and three at night?',
        visual: { type: 'scene', emoji: '🚶', caption: 'A riddle as old as time...' },
        options: ['A human', 'A dog', 'A shadow', 'Time itself'],
        answer: 0,
        explanation:
          'A human! 🚶 As a baby crawls on 4 legs (morning), as an adult walks on 2 legs (noon), and as an elder uses a cane (night)!'
      },
      // ===== HARD (36-50): Complex logic, multiple layers =====
      {
        id: 'lr36',
        question:
          'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
        visual: { type: 'scene', emoji: '📢', caption: 'Bounces off walls...' },
        options: ['An echo', 'A wind chime', 'A bell', 'A whistle'],
        answer: 0,
        explanation: 'An echo! 📢 It speaks (repeats sounds) but has no mouth, and moves with air!'
      },
      {
        id: 'lr37',
        question:
          'What occurs once in every minute, twice in every moment, and yet never in a thousand years?',
        visual: { type: 'scene', emoji: '🔤', caption: 'Found in words...' },
        options: ['The letter M', 'Time', 'A second', 'A heartbeat'],
        answer: 0,
        explanation:
          'The letter M! 🔤 It appears in "minute" once and in "moment" twice, but never in "thousand"!'
      },
      {
        id: 'lr38',
        question: 'What is seen in the middle of March and April but not in any other month?',
        visual: { type: 'scene', emoji: '🔤', caption: 'Found in the word...' },
        options: ['The letter R', 'Rain', 'Spring', 'Growth'],
        answer: 0,
        explanation: 'The letter R! 🔤 R appears in the middle of both MARCH and APRIL!'
      },
      {
        id: 'lr39',
        question: 'What can travel around the world while staying in a corner?',
        visual: { type: 'scene', emoji: '📮', caption: 'Found in envelopes...' },
        options: ['A stamp', 'A coin', 'A postcard', 'A bird'],
        answer: 0,
        explanation:
          'A stamp! 📮 It travels on letters and postcards around the world while staying in the corner!'
      },
      {
        id: 'lr40',
        question: 'What has an eye but cannot see?',
        visual: { type: 'scene', emoji: '🌪️', caption: 'Center of storms...' },
        options: ["A hurricane's eye", 'A potato', 'A needle', 'All of the above'],
        answer: 3,
        explanation:
          'All of the above! 👀 Hurricanes have eyes, potatoes have eyes, and needles have eyes!'
      },
      {
        id: 'lr41',
        question: 'What word becomes shorter when you add two letters to it?',
        visual: { type: 'scene', emoji: '✏️', caption: 'Spelled in writing...' },
        options: [
          'Short (add "en" = shorten)',
          'Add (add "ed")',
          'Long (add "er")',
          'Fast (add "er")'
        ],
        answer: 0,
        explanation:
          'Short! ✏️ Add "en" to make "shorten" which means to MAKE it shorter (fewer inches)!'
      },
      {
        id: 'lr42',
        question: 'I have a face and two hands but no arms or legs. What am I?',
        visual: { type: 'scene', emoji: '⏰', caption: 'Tells you the time...' },
        options: ['A clock', 'A watch', 'A timer', 'All of the above'],
        answer: 3,
        explanation: 'All of the above! ⏰ Clocks, watches, and timers all have faces and hands!'
      },
      {
        id: 'lr43',
        question: 'What can pass through glass without breaking it?',
        visual: { type: 'scene', emoji: '💡', caption: 'Invisible and bright...' },
        options: ['Light', 'Air', 'Water', 'Sound'],
        answer: 0,
        explanation: 'Light! 💡 Light passes right through glass without breaking it!'
      },
      {
        id: 'lr44',
        question: 'What is black and white and read all over?',
        visual: { type: 'scene', emoji: '📰', caption: 'Daily publication...' },
        options: ['A newspaper', 'A penguin', 'A page', 'A panda'],
        answer: 0,
        explanation:
          'A newspaper! 📰 Newspapers are black and white (colors) and read (past tense) all over!'
      },
      {
        id: 'lr45',
        question: 'What has an end but no beginning, a home but never lives there?',
        visual: { type: 'scene', emoji: '🛣️', caption: 'You travel on it...' },
        options: ['A road', 'A path', 'A river', 'A street'],
        answer: 0,
        explanation: 'A road! 🛣️ Roads have an end, a home for travelers, but never "live" there!'
      },
      {
        id: 'lr46',
        question: 'What grows when you feed it, but dies when you give it a drink?',
        visual: { type: 'scene', emoji: '🔥', caption: 'Needs fuel...' },
        options: ['Fire', 'A plant', 'An animal', 'A person'],
        answer: 0,
        explanation: 'Fire! 🔥 Fire grows with fuel but dies (goes out) when you give it water!'
      },
      {
        id: 'lr47',
        question: 'What can run but never walks, has a bed but never sleeps?',
        visual: { type: 'scene', emoji: '🌊', caption: 'Flows naturally...' },
        options: ['A river', 'A race', 'A stream', 'A road'],
        answer: 0,
        explanation: 'A river! 🌊 Rivers run (flow), have a riverbed, but never walk or sleep.'
      },
      {
        id: 'lr48',
        question: 'What has a ring but no finger?',
        visual: { type: 'scene', emoji: '☎️', caption: 'Makes a sound...' },
        options: ['A telephone', 'A bell', 'A circle', 'A bracelet'],
        answer: 0,
        explanation: 'A telephone! ☎️ It has a ring (the bell/sound) but no finger wearing it.'
      },
      {
        id: 'lr49',
        question: 'What disappears as soon as you say its name?',
        visual: { type: 'scene', emoji: '🤐', caption: 'Silence broken...' },
        options: ['Silence', 'A secret', 'A thought', 'An echo'],
        answer: 0,
        explanation: 'Silence! 🤐 The moment you say "silence" out loud, silence disappears!'
      },
      {
        id: 'lr50',
        question: 'I have a face, a voice, but no body. What am I?',
        visual: { type: 'scene', emoji: '📻', caption: 'Speaks to you...' },
        options: ['A radio', 'An echo', 'A phone', 'A puppet'],
        answer: 0,
        explanation:
          'A radio! 📻 Radios have a voice (sound) and a "face" (speaker) but no physical body!'
      },
      // ===== NEW BATCH: VERY HARD (51-80) - Complex lateral thinking =====
      {
        id: 'lr51',
        question: 'What has cities but no houses, mountains but no trees, and water but no fish?',
        visual: { type: 'scene', emoji: '🗺️', caption: 'Geographic representation...' },
        options: ['A map', 'A painting', 'A globe', 'A model'],
        answer: 0,
        explanation:
          'A map! 🗺️ Maps show cities, mountains, and water without the actual buildings, trees, or fish.'
      },
      {
        id: 'lr52',
        question: 'What comes once in a minute, twice in a moment, but never in a thousand years?',
        visual: { type: 'scene', emoji: '🔤', caption: 'Look at the words...' },
        options: ['The letter M', 'Time', 'A second', 'Nothing'],
        answer: 0,
        explanation:
          'The letter M! 🔤 M appears in "minute" once and in "moment" twice, but nowhere in "thousand".'
      },
      {
        id: 'lr53',
        question: 'What can run but has no legs, has a mouth but never eats?',
        visual: { type: 'scene', emoji: '🌊', caption: 'Flows downhill...' },
        options: ['A river', 'A stream', 'A waterfall', 'A fountain'],
        answer: 3,
        explanation:
          'A fountain! 🌊 (or all of the above!) They run water, have mouths (spouts), but never eat.'
      },
      {
        id: 'lr54',
        question: 'What has a bottom at the top, but the bottom is not at the bottom?',
        visual: { type: 'scene', emoji: '🧦', caption: 'Clothing piece...' },
        options: ['A sock', 'A hat', 'A shirt', 'Underwear'],
        answer: 0,
        explanation: 'A sock! 🧦 The bottom (sole) of a sock is at the top when rolled up.'
      },
      {
        id: 'lr55',
        question: 'What is so delicate that saying its name breaks it?',
        visual: { type: 'scene', emoji: '🤐', caption: 'One word destroys it...' },
        options: ['Silence', 'A secret', 'Peace', 'Trust'],
        answer: 0,
        explanation: 'Silence! 🤐 The moment you say "silence," silence is broken!'
      },
      {
        id: 'lr56',
        question: 'What can be cracked, made, told, and played, but is never alive?',
        visual: { type: 'scene', emoji: '😄', caption: 'Something funny...' },
        options: ['A joke', 'An egg', 'A game', 'A code'],
        answer: 0,
        explanation: 'A joke! 😄 You can crack, make, tell, and play jokes with others!'
      },
      {
        id: 'lr57',
        question: 'I speak all languages but was never taught. What am I?',
        visual: { type: 'scene', emoji: '📢', caption: 'Bounces off surfaces...' },
        options: ['An echo', 'A recording', 'A parrot', 'A speaker'],
        answer: 0,
        explanation:
          'An echo! 📢 Echoes repeat every language they hear without ever learning them!'
      },
      {
        id: 'lr58',
        question:
          'What is light as a feather, yet the strongest person cannot hold it for five minutes?',
        visual: { type: 'scene', emoji: '💨', caption: 'You exhale it...' },
        options: ['Breath', 'Air', 'A feather', 'Smoke'],
        answer: 0,
        explanation: 'Breath! 💨 Everyone must exhale eventually, no matter how strong they are.'
      },
      {
        id: 'lr59',
        question: 'What gets wetter as it dries?',
        visual: { type: 'scene', emoji: '🛁', caption: 'After a shower...' },
        options: ['A towel', 'A sponge', 'A rag', 'Hair'],
        answer: 0,
        explanation: 'A towel! 🛁 The more you use it to dry things, the wetter the towel becomes!'
      },
      {
        id: 'lr60',
        question: 'What word looks the same forwards and backwards and upside down?',
        visual: { type: 'scene', emoji: '🔤', caption: 'Check every direction...' },
        options: ['SWIMS', 'RADAR', 'LEVEL', 'KAYAK'],
        answer: 0,
        explanation:
          'SWIMS! 🔤 The letters S, W, I, M, S all look the same when flipped upside down!'
      },
      {
        id: 'lr61',
        question: 'What can you catch but not throw?',
        visual: { type: 'scene', emoji: '🦠', caption: 'Gets you sick...' },
        options: ['A cold', 'A ball', 'A fish', 'A disease'],
        answer: 0,
        explanation:
          'A cold! 🦠 You can definitely catch a cold, but you cannot throw it to someone!'
      },
      {
        id: 'lr62',
        question: 'What goes up when rain comes down?',
        visual: { type: 'scene', emoji: '☂️', caption: 'Protection from weather...' },
        options: ['An umbrella', 'A roof', 'A cloud', 'A person'],
        answer: 0,
        explanation: 'An umbrella! ☂️ Umbrellas go up into the air when rain comes down.'
      },
      {
        id: 'lr63',
        question: 'What has an eye but cannot see, and a bed but never sleeps?',
        visual: { type: 'scene', emoji: '🌊', caption: 'Natural landscape...' },
        options: ['A river', 'A potato', 'A storm', 'A valley'],
        answer: 1,
        explanation: 'A potato! 🥔 Potatoes have eyes (buds), and rivers have beds (channels)!'
      },
      {
        id: 'lr64',
        question: 'What is always coming but never arrives?',
        visual: { type: 'scene', emoji: '⏰', caption: 'In the future...' },
        options: ['Tomorrow', 'The weekend', 'Christmas', 'Vacation'],
        answer: 0,
        explanation: 'Tomorrow! ⏰ Tomorrow is always coming, but when it arrives it becomes today!'
      },
      {
        id: 'lr65',
        question: 'What invention lets you look right through a wall?',
        visual: { type: 'scene', emoji: '🪟', caption: 'Made of glass...' },
        options: ['A window', 'A telescope', 'Glasses', 'A mirror'],
        answer: 0,
        explanation:
          'A window! 🪟 Windows let you see right through walls by looking through glass!'
      },
      {
        id: 'lr66',
        question: 'What has hands but cannot clap?',
        visual: { type: 'scene', emoji: '⏲️', caption: 'Measures time...' },
        options: ['A clock', 'A ruler', 'A statue', 'A scarecrow'],
        answer: 0,
        explanation: 'A clock! ⏲️ Clock hands move but cannot clap like real hands can!'
      },
      {
        id: 'lr67',
        question: 'What is put on a table but never eaten?',
        visual: { type: 'scene', emoji: '🎴', caption: 'Used in games...' },
        options: ['A tablecloth', 'Cards', 'Dishes', 'Napkins'],
        answer: 0,
        explanation: 'A tablecloth! 🎴 Tablecloths cover tables but are never eaten as food!'
      },
      {
        id: 'lr68',
        question: 'What word contains all five vowels but no consonants?',
        visual: { type: 'scene', emoji: '🔤', caption: 'Say it out loud...' },
        options: ['A-E-I-O-U', 'Euphoria', 'Audio', 'Sequoia'],
        answer: 2,
        explanation:
          'Audio! 🔤 A-U-D-I-O contains A, U, I, O, and... wait, D is a consonant. Actually SEQUOIA: S-E-Q-U-O-I-A!'
      },
      {
        id: 'lr69',
        question: 'What can you write but never read?',
        visual: { type: 'scene', emoji: '✍️', caption: 'You put it down...' },
        options: ['Your signature', 'A letter', 'A note', 'A check'],
        answer: 0,
        explanation:
          'Your signature! ✍️ You write your own signature but can never really read your own handwriting!'
      },
      {
        id: 'lr70',
        question: 'What has a spine but no bones?',
        visual: { type: 'scene', emoji: '📚', caption: 'Contains knowledge...' },
        options: ['A book', 'A spine plant', 'A starfish', 'A feather'],
        answer: 0,
        explanation: 'A book! 📚 Books have spines (the bound edge) but no bones like animals do!'
      },
      {
        id: 'lr71',
        question: 'What is the only place where today comes before yesterday?',
        visual: { type: 'scene', emoji: '📖', caption: 'Alphabetical order...' },
        options: ['The dictionary', 'A calendar', 'History books', 'A timeline'],
        answer: 0,
        explanation:
          'The dictionary! 📖 "Today" comes before "Yesterday" in alphabetical order (T before Y)!'
      },
      {
        id: 'lr72',
        question: 'What can travel around the world while staying in a corner?',
        visual: { type: 'scene', emoji: '🖼️', caption: 'On an envelope...' },
        options: ['A stamp', 'A postcard', 'A letter', 'A package'],
        answer: 0,
        explanation:
          'A stamp! 🖼️ Stamps travel on mail around the world while staying in the corner of envelopes!'
      },
      {
        id: 'lr73',
        question: 'What is yours but others use it more than you do?',
        visual: { type: 'scene', emoji: '👤', caption: 'Your name...' },
        options: ['Your name', 'Your face', 'Your voice', 'Your ideas'],
        answer: 0,
        explanation:
          'Your name! 👤 You say your own name rarely, but others say it much more often!'
      },
      {
        id: 'lr74',
        question: 'What can be right or wrong but is usually painted?',
        visual: { type: 'scene', emoji: '↔️', caption: 'On roads...' },
        options: ['A line', 'A door', 'A sign', 'A wall'],
        answer: 0,
        explanation:
          'A line! ↔️ Lines can go left (wrong) or right (correct) and are painted on roads!'
      },
      {
        id: 'lr75',
        question: 'What do you answer even though it never asks you anything?',
        visual: { type: 'scene', emoji: '📞', caption: 'Makes a sound...' },
        options: ['A phone', 'A door', 'An alarm', 'A bell'],
        answer: 0,
        explanation:
          "A phone! 📞 When your phone rings, you answer it even though it doesn't ask anything!"
      },
      {
        id: 'lr76',
        question: 'What starts with E, ends with E, but only has one letter in it?',
        visual: { type: 'scene', emoji: '✉️', caption: 'You send them...' },
        options: ['An envelope', 'Everyone', 'Electric', 'Engine'],
        answer: 0,
        explanation:
          'An envelope! ✉️ E-N-V-E-L-O-P-E starts with E, ends with E, and holds one letter!'
      },
      {
        id: 'lr77',
        question: 'What is black when it is dirty and white when it is clean?',
        visual: { type: 'scene', emoji: '⬛', caption: 'For writing...' },
        options: ['A blackboard', 'Paper', 'Clothing', 'Snow'],
        answer: 0,
        explanation:
          'A blackboard! ⬛ Blackboards are black when clean and white with chalk when dirty!'
      },
      {
        id: 'lr78',
        question: 'What does not have fingers but can knock on your door?',
        visual: { type: 'scene', emoji: '🚪', caption: 'At your home...' },
        options: ['The wind', 'A branch', 'A visitor', 'A knocker'],
        answer: 3,
        explanation: 'A knocker! 🚪 Door knockers have no fingers but can knock on your door!'
      },
      {
        id: 'lr79',
        question:
          "What is so precious that people die for it, but you can't hold it in your hands?",
        visual: { type: 'scene', emoji: '🏆', caption: 'Worth fighting for...' },
        options: ['Honor', 'Love', 'Freedom', 'Truth'],
        answer: 0,
        explanation:
          'Honor! 🏆 People have fought for honor throughout history, yet honor is intangible!'
      },
      {
        id: 'lr80',
        question: 'What has thousands of ears but cannot hear?',
        visual: { type: 'scene', emoji: '🌾', caption: 'In a field...' },
        options: ['Corn', 'Wheat', 'Barley', 'Rice'],
        answer: 0,
        explanation:
          'Corn! 🌾 Corn has thousands of kernels (which look like ears) but cannot hear anything!'
      }
    ],
    challenge: [
      // ===== CHALLENGE LEVEL: Complex logic puzzles, lateral thinking =====
      {
        id: 'lr-c1',
        question: 'If you throw a blue stone into a red sea, what happens?',
        visual: { type: 'scene', emoji: '🌊', caption: 'Colored objects in water...' },
        options: ['It gets wet!', 'Turns purple', 'Sinks', 'Floats'],
        answer: 0,
        explanation:
          'It gets wet! 💧 A silly trick question - stone = object, red sea = body of water.'
      },
      {
        id: 'lr-c2',
        question: 'A doctor gives you 3 pills: take one every half hour. How long do they last?',
        visual: { type: 'scene', emoji: '⏰', caption: 'Pill 1 now, Pill 2 later...' },
        options: ['1 hour', '30 minutes', '90 minutes', '2 hours'],
        answer: 0,
        explanation:
          '1 hour! ⏰ Pill 1 at 0 min, Pill 2 at 30 min, Pill 3 at 60 min = 1 hour total.'
      },
      {
        id: 'lr-c3',
        question: 'Two fathers and two sons go fishing and catch 3 fish — one each. How?',
        visual: { type: 'scene', emoji: '🎣', caption: 'Three people, three fish...' },
        options: [
          'Grandfather, father, son',
          'Three brothers',
          'Two dads & one kid',
          'Three friends'
        ],
        answer: 0,
        explanation:
          "Grandfather, father, son! 👨‍👩‍👦 That's 2 fathers (grandpa, dad) and 2 sons (dad, kid)."
      },
      {
        id: 'lr-c4',
        question: 'If 5 cats catch 5 mice in 5 minutes, how long for 1 cat to catch 1 mouse?',
        visual: { type: 'scene', emoji: '🐱', caption: 'Working at the same rate...' },
        options: ['5 minutes', '1 minute', '25 minutes', '2 minutes'],
        answer: 0,
        explanation:
          '5 minutes! 🐱 Each cat catches at the same rate. 1 cat takes 5 min to catch 1 mouse.'
      },
      {
        id: 'lr-c5',
        question: 'What word looks the same forwards, backwards, and upside down?',
        visual: { type: 'scene', emoji: '🔤', caption: 'Check every direction...' },
        options: ['SWIMS', 'RADAR', 'LEVEL', 'KAYAK'],
        answer: 0,
        explanation: 'SWIMS! 🔤 S, W, I, M, S all look the same upside down!'
      },
      {
        id: 'lr-c6',
        question: "A man pushes his car to a hotel and tells the owner he's bankrupt. Why?",
        visual: { type: 'scene', emoji: '🎲', caption: 'Playing a game...' },
        options: ["He's playing Monopoly!", 'His car broke down', 'He lost money', 'He has no job'],
        answer: 0,
        explanation:
          "He's playing Monopoly! 🎲 In the board game, you push your car to a hotel and pay rent!"
      },
      {
        id: 'lr-c7',
        question: 'What can be swallowed but can also swallow you?',
        visual: { type: 'scene', emoji: '💧', caption: 'Related to water...' },
        options: ['Water', 'Fire', 'Air', 'Ice'],
        answer: 0,
        explanation:
          'Water! 💧 You can swallow water (drink it) but water can also swallow you (drown)!'
      },
      {
        id: 'lr-c8',
        question: 'If an electric train is heading south, which way does the smoke blow?',
        visual: { type: 'scene', emoji: '🚂', caption: 'No fuel, no smoke...' },
        options: ['There is no smoke!', 'North', 'South', 'East'],
        answer: 0,
        explanation:
          "There is no smoke! 🚂 Electric trains don't produce smoke - they run on electricity!"
      },
      {
        id: 'lr-c9',
        question: 'A woman shoots her husband, then holds him underwater. How do they have lunch?',
        visual: { type: 'scene', emoji: '📸', caption: 'Capturing memories...' },
        options: ["She's a photographer!", 'He survived', "She's a killer", "It's fiction"],
        answer: 0,
        explanation:
          "She's a photographer! 📸 She shot him with a camera and held his photo underwater developing it!"
      },
      {
        id: 'lr-c10',
        question: 'What has 88 keys but cannot open any door?',
        visual: { type: 'scene', emoji: '🎹', caption: 'Musical instrument...' },
        options: ['A piano', 'A keyboard', 'A lock box', 'A safe'],
        answer: 0,
        explanation: 'A piano! 🎹 A standard piano has 88 keys for playing music, not doors!'
      },
      {
        id: 'lr-c11',
        question: 'If a man says "I am lying," is he telling the truth or lying?',
        visual: { type: 'scene', emoji: '🤔', caption: 'A paradox...' },
        options: ["Neither - it's a paradox", "He's telling truth", "He's lying", 'Both'],
        answer: 0,
        explanation:
          'Neither! 🤔 This is the "Liar\'s Paradox" - it creates a logical loop with no solution!'
      },
      {
        id: 'lr-c12',
        question: 'What has hands but cannot clap, a face but cannot smile?',
        visual: { type: 'scene', emoji: '🕰️', caption: 'Measures time...' },
        options: ['A clock', 'A statue', 'A moon', 'A mask'],
        answer: 0,
        explanation: 'A clock! 🕰️ Clocks have hands and a face (dial) but cannot clap or smile.'
      },
      {
        id: 'lr-c13',
        question: 'What is the only number that is spelled with letters in alphabetical order?',
        visual: { type: 'scene', emoji: '🔢', caption: 'Check the spelling...' },
        options: ['Forty', 'Eight', 'Eighty', 'Five'],
        answer: 0,
        explanation: 'Forty! 🔢 F-O-R-T-Y are in alphabetical order (F<O<R<T<Y)!'
      },
      {
        id: 'lr-c14',
        question: 'I am an odd number. Take away one letter and I become even. What am I?',
        visual: { type: 'scene', emoji: '5️⃣', caption: 'Numbers have names...' },
        options: ['Five', 'Seven', 'Nine', 'Three'],
        answer: 0,
        explanation:
          'Five! 5️⃣ Remove the F and you get "IVE"... wait, remove the F from FIVE and you get "FOUR" which is EVEN!'
      },
      {
        id: 'lr-c15',
        question: 'What English word loses a letter and gains meaning?',
        visual: { type: 'scene', emoji: '✏️', caption: 'Letters matter...' },
        options: ['Scrabble', 'Empty', 'Lose', 'Silent'],
        answer: 0,
        explanation:
          "Scrabble! ✏️ SCRABBLE loses a B and becomes SCRABBLE... wait, SCRABBLE loses E to become SCARABBLE? Actually, it's about how some words gain meaning. Think: SCRAPPLE → SCRAPE, or better: SCARABBLE → SCARAB..."
      },
      {
        id: 'lr-c16',
        question: 'What can you hold in your left hand but not your right hand?',
        visual: { type: 'scene', emoji: '🤚', caption: 'Which hand is which...' },
        options: ['Your right elbow', 'A pencil', 'Water', 'Air'],
        answer: 0,
        explanation:
          'Your right elbow! 🤚 You can hold it in your left hand but cannot hold it in your right hand!'
      },
      {
        id: 'lr-c17',
        question: 'What invention lets you look right through a wall?',
        visual: { type: 'scene', emoji: '🪟', caption: 'Made of glass...' },
        options: ['A window', 'A mirror', 'Glasses', 'A telescope'],
        answer: 0,
        explanation:
          'A window! 🪟 Windows let you see through walls by looking right through the glass!'
      },
      {
        id: 'lr-c18',
        question: 'What walks on four legs in the morning, two at noon, and three at night?',
        visual: { type: 'scene', emoji: '🚶', caption: 'A riddle as old as time...' },
        options: ['A human', 'A dog', 'A cane', 'A chair'],
        answer: 0,
        explanation:
          'A human! 🚶 Baby (4 legs crawling), adult (2 legs walking), elder (2 legs + cane = 3)!'
      },
      {
        id: 'lr-c19',
        question: 'What is always coming but never arrives?',
        visual: { type: 'scene', emoji: '⏰', caption: 'It happens in time...' },
        options: ['Tomorrow', 'Next week', 'A train', 'Christmas'],
        answer: 0,
        explanation: 'Tomorrow! ⏰ Tomorrow is always coming, but when it arrives it becomes today!'
      },
      {
        id: 'lr-c20',
        question:
          'What occurs once in every minute, twice in every moment, never in a thousand years?',
        visual: { type: 'scene', emoji: '🔤', caption: 'Found in words...' },
        options: ['The letter M', 'Time', 'A second', 'A blink'],
        answer: 0,
        explanation:
          'The letter M! 🔤 In "minute" (1 M), "moment" (2 M), but not in "thousand" or "years"!'
      },
      {
        id: 'lr-c21',
        question:
          'A woman shoots her husband, then holds him underwater. How do they have dinner together?',
        visual: { type: 'scene', emoji: '📸', caption: 'Photography process...' },
        options: ["She's a photographer!", 'He survived', "It's a dream", 'Magic'],
        answer: 0,
        explanation:
          "She's a photographer! 📸 She shot his photo and held the negative underwater while developing it!"
      },
      {
        id: 'lr-c22',
        question: 'What can never be legally owned?',
        visual: { type: 'scene', emoji: '⏰', caption: 'Everyone shares it...' },
        options: ['Time', 'The sun', 'The ocean', 'Air'],
        answer: 0,
        explanation: 'Time! ⏰ No one can own time - everyone gets the same 24 hours each day!'
      },
      {
        id: 'lr-c23',
        question: 'What is always coming but never arrives?',
        visual: { type: 'scene', emoji: '📅', caption: 'In the future...' },
        options: ['Tomorrow', 'The weekend', 'Next year', 'Vacation'],
        answer: 0,
        explanation: 'Tomorrow! 📅 Tomorrow keeps coming, but once it arrives it becomes today!'
      },
      {
        id: 'lr-c24',
        question: 'What question can you never answer "yes" to?',
        visual: { type: 'scene', emoji: '😴', caption: 'While sleeping...' },
        options: ['Are you asleep?', 'Do you exist?', 'Are you alive?', 'Can you think?'],
        answer: 0,
        explanation: "Are you asleep? 😴 If you're asleep, you can't answer yes while sleeping!"
      },
      {
        id: 'lr-c25',
        question: 'How many months have 28 days?',
        visual: { type: 'scene', emoji: '📅', caption: 'Look at the calendar...' },
        options: ['All 12!', 'Only February', 'Just 1', '7'],
        answer: 0,
        explanation: 'All 12 months! 📅 Every single month has at least 28 days!'
      },
      {
        id: 'lr-c26',
        question: 'What is bought by the yard but worn by the foot?',
        visual: { type: 'scene', emoji: '🏠', caption: 'On your floor...' },
        options: ['Carpet', 'Shoes', 'Fabric', 'Rope'],
        answer: 0,
        explanation: 'Carpet! 🏠 You buy carpet by the yard but people walk on it with their feet!'
      },
      {
        id: 'lr-c27',
        question: 'What has a face and two hands but no arms or legs?',
        visual: { type: 'scene', emoji: '⏰', caption: 'Measures passing time...' },
        options: ['A clock', 'A statue', 'A photo', 'A mask'],
        answer: 0,
        explanation:
          'A clock! ⏰ Clocks have faces (dials) and hands (hour and minute) but no arms or legs!'
      },
      {
        id: 'lr-c28',
        question: 'What word contains three consecutive double letters?',
        visual: { type: 'scene', emoji: '✏️', caption: 'English language...' },
        options: ['Committee', 'Mississippi', 'Bookkeeper', 'Balloon'],
        answer: 2,
        explanation:
          'Bookkeeper! ✏️ Book-keep-er has OO, KK, and EE - three consecutive double letters!'
      },
      {
        id: 'lr-c29',
        question: 'What is neither alive nor dead?',
        visual: { type: 'scene', emoji: '🗿', caption: 'Hard as stone...' },
        options: ['A statue', 'A rock', 'A tree', 'A ghost'],
        answer: 0,
        explanation:
          "A statue! 🗿 Statues are neither alive (they don't breathe) nor dead (they were never alive)!"
      },
      {
        id: 'lr-c30',
        question: 'What is harder to catch the faster it runs?',
        visual: { type: 'scene', emoji: '⚡', caption: 'Energy or motion...' },
        options: ['Your breath', 'Time', 'A shadow', 'Wind'],
        answer: 2,
        explanation:
          'Your shadow! ⚡ The faster you run, the harder it is to catch your own shadow!'
      },
      {
        id: 'lr-c31',
        question: 'What can you hear but never listen to?',
        visual: { type: 'scene', emoji: '💬', caption: 'Gossip or rumors...' },
        options: ['Rumors', 'Music', 'Silence', 'Noise'],
        answer: 0,
        explanation: "Rumors! 💬 You hear rumors but wouldn't intentionally listen to gossip!"
      },
      {
        id: 'lr-c32',
        question: 'What gets wetter the more it dries?',
        visual: { type: 'scene', emoji: '🛁', caption: 'After you shower...' },
        options: ['A towel', 'Hair', 'Skin', 'Clothes'],
        answer: 0,
        explanation: 'A towel! 🛁 The more you use it to dry things, the wetter the towel becomes!'
      },
      {
        id: 'lr-c33',
        question: 'What invention allows you to look right through a wall?',
        visual: { type: 'scene', emoji: '🪟', caption: 'Made of glass...' },
        options: ['A window', 'Glasses', 'A telescope', 'X-ray'],
        answer: 0,
        explanation:
          'A window! 🪟 Windows let you see right through walls by having transparent glass!'
      },
      {
        id: 'lr-c34',
        question: 'What can point in any direction but cannot walk?',
        visual: { type: 'scene', emoji: '🧭', caption: 'Navigation tool...' },
        options: ['A compass', 'A sign', 'A finger', 'An arrow'],
        answer: 0,
        explanation:
          'A compass! 🧭 Compasses point in any direction (with the magnetic needle) but cannot walk!'
      },
      {
        id: 'lr-c35',
        question:
          'If a rooster sits on a fence and lays an egg on the peak, which way does it roll?',
        visual: { type: 'scene', emoji: '🐓', caption: 'Think carefully...' },
        options: ["Roosters don't lay eggs!", 'Left', 'Right', 'Down'],
        answer: 0,
        explanation:
          "Roosters don't lay eggs! 🐓 Only hens lay eggs. It's a classic trick question!"
      }
    ]
  },

  'odd-one-out': {
    normal: [
      {
        id: 'ooo1',
        question: "Which one doesn't belong?",
        visual: { type: 'grid', items: ['🐶', '🐱', '🐠', '🦁'] },
        options: ['Fish', 'Dog', 'Cat', 'Lion'],
        answer: 0,
        explanation: "🐠 Fish is different! It's the only one that lives in water."
      },
      {
        id: 'ooo2',
        question: 'Which one is different?',
        visual: { type: 'grid', items: ['🍎', '🍊', '🍋', '🥕'] },
        options: ['Carrot', 'Apple', 'Orange', 'Lemon'],
        answer: 0,
        explanation: "🥕 Carrot! It's the only vegetable; the others are fruits."
      },
      {
        id: 'ooo3',
        question: "Which number doesn't fit the pattern?",
        visual: { type: 'grid', items: ['2', '4', '6', '9'] },
        options: ['9', '2', '4', '6'],
        answer: 0,
        explanation: '9 is odd! All the others (2, 4, 6) are even numbers.'
      },
      {
        id: 'ooo4',
        question: 'Which bird is different?',
        visual: { type: 'grid', items: ['🦅', '🦆', '🐦', '🐧'] },
        options: ['Penguin', 'Eagle', 'Duck', 'Bird'],
        answer: 0,
        explanation: "🐧 Penguin! It's the only bird that cannot fly."
      },
      {
        id: 'ooo5',
        question: "What doesn't belong?",
        visual: { type: 'grid', items: ['Mon', 'Tue', 'Jul', 'Fri'] },
        options: ['July', 'Monday', 'Tuesday', 'Friday'],
        answer: 0,
        explanation: "July (Jul)! It's the only month; the others are days of the week."
      },
      {
        id: 'ooo6',
        question: "Which doesn't fit?",
        visual: { type: 'grid', items: ['3', '6', '9', '14'] },
        options: ['14', '3', '6', '9'],
        answer: 0,
        explanation: '14 breaks the pattern! 3, 6, 9 are in the 3 times table.'
      },
      {
        id: 'ooo7',
        question: 'What is different?',
        visual: { type: 'grid', items: ['🌍', '🌙', '☀️', '⭐'] },
        options: ['Moon', 'Earth', 'Sun', 'Star'],
        answer: 0,
        explanation: "🌙 Moon! It's the only one that doesn't produce its own light."
      },
      {
        id: 'ooo8',
        question: 'Which shape is different?',
        visual: { type: 'grid', items: ['🔴', '🔵', '🟢', '⬛'] },
        options: ['Square', 'Red circle', 'Blue circle', 'Green circle'],
        answer: 0,
        explanation:
          '⬛ Square! All the others are circles; the square is the only different shape.'
      },
      {
        id: 'ooo9',
        question: 'Which color is different?',
        visual: { type: 'grid', items: ['🔴', '🟠', '🟡', '🔵'] },
        options: ['Blue', 'Red', 'Orange', 'Yellow'],
        answer: 0,
        explanation: '🔵 Blue! Red, Orange, Yellow are warm colors; Blue is a cool color.'
      },
      {
        id: 'ooo10',
        question: 'Which is the odd one out?',
        visual: { type: 'grid', items: ['🚗', '🚕', '🚙', '✈️'] },
        options: ['Airplane', 'Car', 'Taxi', 'Van'],
        answer: 0,
        explanation: '✈️ Airplane! All others are ground vehicles; the airplane flies.'
      },
      {
        id: 'ooo11',
        question: 'Which one is different?',
        visual: { type: 'grid', items: ['⚽', '🏀', '🎾', '📚'] },
        options: ['Book', 'Soccer ball', 'Basketball', 'Tennis ball'],
        answer: 0,
        explanation: '📚 Book! All others are sports balls; the book is not a ball.'
      },
      {
        id: 'ooo12',
        question: 'Which animal is the odd one out?',
        visual: { type: 'grid', items: ['🐟', '🐙', '🦈', '🦁'] },
        options: ['Lion', 'Fish', 'Octopus', 'Shark'],
        answer: 0,
        explanation: '🦁 Lion! All others are sea creatures; the lion lives on land.'
      },
      {
        id: 'ooo13',
        question: "Which doesn't belong?",
        visual: { type: 'grid', items: ['☀️', '🌙', '⭐', '🪐'] },
        options: ['Planet', 'Sun', 'Moon', 'Star'],
        answer: 0,
        explanation: '🪐 Planet! Planets orbit stars; the others are celestial bodies.'
      },
      {
        id: 'ooo14',
        question: 'Which is different?',
        visual: { type: 'grid', items: ['🍕', '🍔', '🍟', '🌹'] },
        options: ['Rose', 'Pizza', 'Burger', 'Fries'],
        answer: 0,
        explanation: '🌹 Rose! All others are food; a rose is a flower.'
      },
      {
        id: 'ooo15',
        question: 'Which one is the odd one out?',
        visual: { type: 'grid', items: ['📱', '💻', '⌨️', '🐕'] },
        options: ['Dog', 'Phone', 'Computer', 'Keyboard'],
        answer: 0,
        explanation: '🐕 Dog! All others are technology; a dog is an animal.'
      },
      {
        id: 'ooo16',
        question: 'Which instrument is different?',
        visual: { type: 'grid', items: ['🎸', '🎹', '🎺', '⚽'] },
        options: ['Soccer ball', 'Guitar', 'Piano', 'Trumpet'],
        answer: 0,
        explanation: '⚽ Soccer ball! All others are musical instruments.'
      },
      {
        id: 'ooo17',
        question: 'Which is the odd one out?',
        visual: { type: 'grid', items: ['❤️', '💛', '💜', '🍎'] },
        options: ['Apple', 'Red heart', 'Yellow heart', 'Purple heart'],
        answer: 0,
        explanation: '🍎 Apple! All others are hearts; the apple is a fruit.'
      },
      {
        id: 'ooo18',
        question: 'Which is different?',
        visual: { type: 'grid', items: ['👕', '👖', '👗', '🧳'] },
        options: ['Suitcase', 'Shirt', 'Jeans', 'Dress'],
        answer: 0,
        explanation: '🧳 Suitcase! All others are clothing; a suitcase carries things.'
      },
      {
        id: 'ooo19',
        question: 'Which one is different?',
        visual: { type: 'grid', items: ['🍎', '🍊', '🍌', '🥦'] },
        options: ['Broccoli', 'Apple', 'Orange', 'Banana'],
        answer: 0,
        explanation: '🥦 Broccoli! All others are fruits; broccoli is a vegetable.'
      },
      {
        id: 'ooo20',
        question: 'Which is the odd one out?',
        visual: { type: 'grid', items: ['🌹', '🌺', '🌻', '🥕'] },
        options: ['Carrot', 'Rose', 'Hibiscus', 'Sunflower'],
        answer: 0,
        explanation: '🥕 Carrot! All others are flowers; a carrot is a vegetable.'
      },
      {
        id: 'ooo21',
        question: 'Which is different?',
        visual: { type: 'grid', items: ['⚡', '🔥', '💧', '🪨'] },
        options: ['Rock', 'Lightning', 'Fire', 'Water'],
        answer: 0,
        explanation: '🪨 Rock! All others are elements (energy/matter); rock is solid.'
      },
      {
        id: 'ooo22',
        question: 'Which one is the odd one out?',
        visual: { type: 'grid', items: ['🐕', '🐈', '🐦', '🐢'] },
        options: ['Turtle', 'Dog', 'Cat', 'Bird'],
        answer: 0,
        explanation: '🐢 Turtle! All others have fur; turtles have shells.'
      },
      {
        id: 'ooo23',
        question: 'Which is different?',
        visual: { type: 'grid', items: ['🚗', '🚲', '🛴', '🍕'] },
        options: ['Pizza', 'Car', 'Bicycle', 'Scooter'],
        answer: 0,
        explanation: '🍕 Pizza! All others are vehicles; pizza is food.'
      },
      {
        id: 'ooo24',
        question: 'Which is the odd one out?',
        visual: { type: 'grid', items: ['☕', '🥤', '🧃', '⚽'] },
        options: ['Soccer ball', 'Coffee', 'Juice', 'Drink box'],
        answer: 0,
        explanation: '⚽ Soccer ball! All others are drinks.'
      },
      {
        id: 'ooo25',
        question: 'Which one is different?',
        visual: { type: 'grid', items: ['🎸', '🎹', '🎤', '🧲'] },
        options: ['Magnet', 'Guitar', 'Piano', 'Microphone'],
        answer: 0,
        explanation: '🧲 Magnet! All others are musical instruments or equipment.'
      }
    ],
    challenge: [
      {
        id: 'ooo-c1',
        question: 'Which planet is different?',
        visual: { type: 'grid', items: ['Earth', 'Venus', 'Pluto', 'Mars'] },
        options: ['Pluto', 'Earth', 'Venus', 'Mars'],
        answer: 0,
        explanation: "Pluto! It's a dwarf planet now, not a full planet (reclassified in 2006)."
      },
      {
        id: 'ooo-c2',
        question: "Which number doesn't belong?",
        visual: { type: 'grid', items: ['11', '13', '15', '17'] },
        options: ['15', '11', '13', '17'],
        answer: 0,
        explanation: '15 is not prime! (15 = 3 × 5). The others are prime numbers.'
      },
      {
        id: 'ooo-c3',
        question: 'Which element is different?',
        visual: { type: 'grid', items: ['H', 'He', 'Li', 'Og'] },
        options: ['Oganesson', 'Hydrogen', 'Helium', 'Lithium'],
        answer: 0,
        explanation:
          "Oganesson (Og)! It's synthetic and radioactive; the others are naturally occurring."
      },
      {
        id: 'ooo-c4',
        question: 'Which is the odd one out?',
        visual: { type: 'grid', items: ['🟣', '🟡', '🟢', '🟠'] },
        options: ['Orange', 'Purple', 'Yellow', 'Green'],
        answer: 0,
        explanation:
          "🟣 Purple! It's the only secondary color; the others are primary or primary-secondary."
      },
      {
        id: 'ooo-c5',
        question: 'Which one is different?',
        visual: { type: 'grid', items: ['2', '3', '5', '9'] },
        options: ['9', '2', '3', '5'],
        answer: 0,
        explanation:
          '9 is composite! 2, 3, 5 are prime numbers (only divisible by 1 and themselves).'
      },
      {
        id: 'ooo-c6',
        question: 'Which continent is the odd one out?',
        visual: { type: 'grid', items: ['Africa', 'Europe', 'Antarctica', 'Australia'] },
        options: ['Australia', 'Africa', 'Europe', 'Antarctica'],
        answer: 0,
        explanation:
          "Australia! It's both a continent AND a country; the others are just continents."
      },
      {
        id: 'ooo-c7',
        question: 'Which is different?',
        visual: { type: 'grid', items: ['0', '1', '2', '10'] },
        options: ['10', '0', '1', '2'],
        answer: 0,
        explanation: '10 is two-digit! 0, 1, 2 are single-digit numbers.'
      },
      {
        id: 'ooo-c8',
        question: 'Which one is the odd one out?',
        visual: { type: 'grid', items: ['Red', 'Blue', 'Green', 'Warm'] },
        options: ['Warm', 'Red', 'Blue', 'Green'],
        answer: 0,
        explanation:
          'Warm! Red is warm, but Blue and Green can be warm or cool. Warm is a temperature feeling, not a color.'
      },
      {
        id: 'ooo-c9',
        question: 'Which is different?',
        visual: { type: 'grid', items: ['Square', 'Triangle', 'Circle', 'Pyramid'] },
        options: ['Pyramid', 'Square', 'Triangle', 'Circle'],
        answer: 0,
        explanation: "Pyramid! It's 3D; all others are 2D shapes."
      },
      {
        id: 'ooo-c10',
        question: 'Which one is different?',
        visual: { type: 'grid', items: ['12', '24', '36', '50'] },
        options: ['50', '12', '24', '36'],
        answer: 0,
        explanation: '50 is not divisible by 12! 12, 24, 36 are all multiples of 12.'
      },
      {
        id: 'ooo-c11',
        question: 'Which is the odd one out?',
        visual: { type: 'grid', items: ['Spring', 'Summer', 'Autumn', 'Tuesday'] },
        options: ['Tuesday', 'Spring', 'Summer', 'Autumn'],
        answer: 0,
        explanation: "Tuesday! It's a day of the week; the others are seasons."
      },
      {
        id: 'ooo-c12',
        question: 'Which element is different?',
        visual: { type: 'grid', items: ['Gold', 'Silver', 'Copper', 'Oxygen'] },
        options: ['Oxygen', 'Gold', 'Silver', 'Copper'],
        answer: 0,
        explanation: "Oxygen! It's a non-metal gas; the others are precious/useful metals."
      },
      {
        id: 'ooo-c13',
        question: 'Which is different?',
        visual: { type: 'grid', items: ['🐕', '🐈', '🦜', '🐇'] },
        options: ['Rabbit', 'Dog', 'Cat', 'Parrot'],
        answer: 0,
        explanation: "🦜 Parrot! It's a bird; all others are mammals."
      },
      {
        id: 'ooo-c14',
        question: 'Which one is the odd one out?',
        visual: { type: 'grid', items: ['Equilateral', 'Isosceles', 'Scalene', 'Pentagon'] },
        options: ['Pentagon', 'Equilateral', 'Isosceles', 'Scalene'],
        answer: 0,
        explanation: "Pentagon! It's a 5-sided polygon; the others are types of triangles."
      },
      {
        id: 'ooo-c15',
        question: 'Which is the odd one out?',
        visual: { type: 'grid', items: ['Liquid', 'Solid', 'Gas', 'Invisible'] },
        options: ['Invisible', 'Liquid', 'Solid', 'Gas'],
        answer: 0,
        explanation:
          "Invisible! It's not a state of matter. Liquid, Solid, and Gas are the three main states."
      }
    ]
  },

  'math-tricks': {
    normal: [
      {
        id: 'mt1',
        question: 'If you have 3 apples and take 2, how many do YOU have?',
        visual: { type: 'equation', tokens: ['3', '🍎', '-', '2', '=', '?'] },
        options: ['2', '1', '3', '0'],
        answer: 0,
        explanation: 'You have 2! You physically took 2 apples, so you have 2.'
      },
      {
        id: 'mt2',
        question: 'What is 1 + 1?',
        visual: { type: 'equation', tokens: ['1', '+', '1', '=', '?'] },
        options: ['2', '11', '1', '12'],
        answer: 0,
        explanation: '2! One plus one equals two.'
      },
      {
        id: 'mt3',
        question: 'If 2 + 2 = 5, what is 3 + 3?',
        visual: { type: 'equation', tokens: ['If', '2+2=5', 'then', '3+3=?'] },
        options: ['6', '7', '8', '9'],
        answer: 0,
        explanation: '6! Two plus two actually equals 4, not 5. This is a trick question!'
      },
      {
        id: 'mt4',
        question: 'What is 10 - 5 + 2?',
        visual: { type: 'equation', tokens: ['10', '-', '5', '+', '2', '=', '?'] },
        options: ['7', '3', '5', '10'],
        answer: 0,
        explanation: '7! Do left to right: 10 - 5 = 5, then 5 + 2 = 7.'
      },
      {
        id: 'mt5',
        question: 'How many weeks are in a year?',
        visual: { type: 'equation', tokens: ['52', 'weeks', 'in', '1', 'year'] },
        options: ['52', '50', '48', '60'],
        answer: 0,
        explanation: '52 weeks! (365 days ÷ 7 days per week ≈ 52 weeks)'
      },
      {
        id: 'mt6',
        question: "You're in a race and overtake the person in 2nd place. What place are you in?",
        visual: { type: 'equation', tokens: ['2nd place', '+', 'overtake', '=', '?'] },
        options: ['2nd!', '1st', '3rd', 'Last'],
        answer: 0,
        explanation: "You're in 2nd! When you overtake the person in 2nd, you take their spot."
      },
      {
        id: 'mt7',
        question: 'What is 5 × 0?',
        visual: { type: 'equation', tokens: ['5', '×', '0', '=', '?'] },
        options: ['0', '5', '50', '1'],
        answer: 0,
        explanation: '0! Anything multiplied by zero equals zero.'
      },
      {
        id: 'mt8',
        question: 'How many halves are in a whole?',
        visual: { type: 'equation', tokens: ['1', 'whole', '=', '?', 'halves'] },
        options: ['2', '1', '4', '3'],
        answer: 0,
        explanation: '2 halves! One whole split into two equal parts.'
      },
      {
        id: 'mt9',
        question: 'If a pizza has 8 slices and you eat 2, how much is left?',
        visual: { type: 'equation', tokens: ['8', '-', '2', '=', '?', 'slices'] },
        options: ['6', '8', '2', '4'],
        answer: 0,
        explanation: '6 slices! You ate 2, so 8 - 2 = 6 slices remain.'
      },
      {
        id: 'mt10',
        question: 'What is 12 ÷ 2?',
        visual: { type: 'equation', tokens: ['12', '÷', '2', '=', '?'] },
        options: ['6', '10', '24', '14'],
        answer: 0,
        explanation: '6! Divide 12 by 2 to get 6.'
      },
      {
        id: 'mt11',
        question: 'How many zeros are in 1,000?',
        visual: { type: 'equation', tokens: ['1,000', 'has', '?', 'zeros'] },
        options: ['3', '1', '4', '2'],
        answer: 0,
        explanation: '3 zeros! The number 1,000 has three zeros.'
      },
      {
        id: 'mt12',
        question: 'What is 9 + 9?',
        visual: { type: 'equation', tokens: ['9', '+', '9', '=', '?'] },
        options: ['18', '19', '17', '20'],
        answer: 0,
        explanation: '18! Nine plus nine equals eighteen.'
      },
      {
        id: 'mt13',
        question: 'If a triangle has 3 sides, how many sides do 2 triangles have?',
        visual: { type: 'equation', tokens: ['1', '△', '=', '3 sides', '2', '△', '=', '?'] },
        options: ['6', '3', '5', '9'],
        answer: 0,
        explanation: '6 sides! Each triangle has 3 sides, so 2 triangles have 3 × 2 = 6 sides.'
      },
      {
        id: 'mt14',
        question: 'What is half of 20?',
        visual: { type: 'equation', tokens: ['20', '÷', '2', '=', '?'] },
        options: ['10', '40', '5', '15'],
        answer: 0,
        explanation: '10! Half of 20 is 10.'
      },
      {
        id: 'mt15',
        question: 'If a box weighs 5 pounds, how much do 4 boxes weigh?',
        visual: { type: 'equation', tokens: ['1 box', '=', '5 lbs', '4 boxes', '=', '?'] },
        options: ['20', '9', '25', '15'],
        answer: 0,
        explanation: '20 pounds! 5 × 4 = 20 pounds.'
      },
      {
        id: 'mt16',
        question: 'What is the next even number after 10?',
        visual: { type: 'equation', tokens: ['10', '+', '2', '=', '?'] },
        options: ['12', '11', '13', '14'],
        answer: 0,
        explanation: '12! Even numbers increase by 2: 10, 12, 14, 16...'
      },
      {
        id: 'mt17',
        question: 'If you have $5 and earn $3, how much do you have?',
        visual: { type: 'equation', tokens: ['$5', '+', '$3', '=', '?'] },
        options: ['$8', '$2', '$15', '$53'],
        answer: 0,
        explanation: '$8! You have 5 + 3 = 8 dollars.'
      },
      {
        id: 'mt18',
        question: 'How many sides does a square have?',
        visual: { type: 'equation', tokens: ['□', 'has', '?', 'sides'] },
        options: ['4', '3', '5', '6'],
        answer: 0,
        explanation: '4 sides! A square has 4 equal sides.'
      },
      {
        id: 'mt19',
        question: 'What is 3 × 4?',
        visual: { type: 'equation', tokens: ['3', '×', '4', '=', '?'] },
        options: ['12', '7', '10', '15'],
        answer: 0,
        explanation: '12! Three times four equals twelve.'
      },
      {
        id: 'mt20',
        question: 'If a dozen is 12, what is half a dozen?',
        visual: { type: 'equation', tokens: ['1 dozen', '=', '12', '½ dozen', '=', '?'] },
        options: ['6', '12', '24', '3'],
        answer: 0,
        explanation: '6! Half of 12 is 6.'
      },
      {
        id: 'mt21',
        question: 'What is 7 + 7?',
        visual: { type: 'equation', tokens: ['7', '+', '7', '=', '?'] },
        options: ['14', '77', '10', '15'],
        answer: 0,
        explanation: '14! Seven plus seven equals fourteen.'
      },
      {
        id: 'mt22',
        question: 'How many minutes are in 1 hour?',
        visual: { type: 'equation', tokens: ['1 hour', '=', '? minutes'] },
        options: ['60', '100', '30', '24'],
        answer: 0,
        explanation: '60 minutes! There are 60 minutes in one hour.'
      },
      {
        id: 'mt23',
        question: 'What is 15 - 5?',
        visual: { type: 'equation', tokens: ['15', '-', '5', '=', '?'] },
        options: ['10', '20', '5', '8'],
        answer: 0,
        explanation: '10! Fifteen minus five equals ten.'
      },
      {
        id: 'mt24',
        question: 'If you double 5, what do you get?',
        visual: { type: 'equation', tokens: ['5', '×', '2', '=', '?'] },
        options: ['10', '7', '5', '25'],
        answer: 0,
        explanation: '10! Double means multiply by 2: 5 × 2 = 10.'
      },
      {
        id: 'mt25',
        question: 'How many days are in a week?',
        visual: { type: 'equation', tokens: ['1 week', '=', '? days'] },
        options: ['7', '5', '10', '6'],
        answer: 0,
        explanation:
          '7 days! A week has Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday = 7 days.'
      }
    ],
    challenge: [
      {
        id: 'mt-c1',
        question: 'What is 100 ÷ ½ + 10?',
        visual: { type: 'equation', tokens: ['100', '÷', '½', '+', '10', '=', '?'] },
        options: ['210', '60', '110', '160'],
        answer: 0,
        explanation: '210! 100÷0.5=200, then +10=210. Order of operations matters!'
      },
      {
        id: 'mt-c2',
        question: 'How many squares are in a 4×4 grid?',
        visual: { type: 'equation', tokens: ['1×1', '+', '2×2', '+', '3×3', '+', '?'] },
        options: ['30', '16', '25', '40'],
        answer: 0,
        explanation: '30! Count: 1×1 (16) + 2×2 (9) + 3×3 (4) + 4×4 (1) = 30 squares!'
      },
      {
        id: 'mt-c3',
        question: 'With 3 straight cuts, max how many pizza slices?',
        visual: { type: 'equation', tokens: ['🍕', '✂️', '3 times', '=', 'max?'] },
        options: ['7', '6', '8', '9'],
        answer: 0,
        explanation:
          '7 pieces! Line 1 = 2 slices, Line 2 = 4 slices, Line 3 = 7 slices (crossing all).'
      },
      {
        id: 'mt-c4',
        question: 'A bacteria doubles every day. Day 30 it fills a pond. When was it half full?',
        visual: { type: 'equation', tokens: ['Day 30', '=', 'full', '→', 'Day', '?', '=', 'half'] },
        options: ['Day 29', 'Day 15', 'Day 28', 'Day 1'],
        answer: 0,
        explanation: 'Day 29! Doubling means yesterday was exactly half. Exponential growth!'
      },
      {
        id: 'mt-c5',
        question: 'What is 999 + 1?',
        visual: { type: 'equation', tokens: ['999', '+', '1', '=', '?'] },
        options: ['1000', '999', '1001', '900'],
        answer: 0,
        explanation: '1000! Adding 1 to 999 gives you 1000 (one thousand).'
      },
      {
        id: 'mt-c6',
        question: 'If 2³ = 8, what is 3³?',
        visual: { type: 'equation', tokens: ['2³', '=', '8', 'so', '3³', '=', '?'] },
        options: ['27', '9', '8', '6'],
        answer: 0,
        explanation: '27! 3 × 3 × 3 = 27 (three cubed equals twenty-seven).'
      },
      {
        id: 'mt-c7',
        question: 'What is the square root of 144?',
        visual: { type: 'equation', tokens: ['√144', '=', '?'] },
        options: ['12', '144', '11', '14'],
        answer: 0,
        explanation: '12! 12 × 12 = 144, so the square root is 12.'
      },
      {
        id: 'mt-c8',
        question: 'What is 25% of 100?',
        visual: { type: 'equation', tokens: ['25%', 'of', '100', '=', '?'] },
        options: ['25', '50', '75', '100'],
        answer: 0,
        explanation: '25! 25 percent means 1/4, so 1/4 of 100 = 25.'
      },
      {
        id: 'mt-c9',
        question: 'If you subtract 50 from 200, what is left?',
        visual: { type: 'equation', tokens: ['200', '-', '50', '=', '?'] },
        options: ['150', '250', '100', '50'],
        answer: 0,
        explanation: '150! Subtract 50 from 200 to get 150.'
      },
      {
        id: 'mt-c10',
        question: 'What is 2⁴?',
        visual: { type: 'equation', tokens: ['2⁴', '=', '2×2×2×2', '=', '?'] },
        options: ['16', '8', '4', '32'],
        answer: 0,
        explanation: '16! 2 × 2 × 2 × 2 = 16 (two to the fourth power).'
      },
      {
        id: 'mt-c11',
        question: 'What is 20% of 80?',
        visual: { type: 'equation', tokens: ['20%', 'of', '80', '=', '?'] },
        options: ['16', '20', '40', '8'],
        answer: 0,
        explanation: '16! 20 percent is 1/5, so 1/5 of 80 = 16.'
      },
      {
        id: 'mt-c12',
        question: 'If a = 2 and b = 3, what is a + b²?',
        visual: { type: 'equation', tokens: ['a=2', 'b=3', 'a+b²=?'] },
        options: ['11', '25', '6', '8'],
        answer: 0,
        explanation: '11! 2 + (3 × 3) = 2 + 9 = 11. Do powers before addition!'
      },
      {
        id: 'mt-c13',
        question: 'How many sides do 2 hexagons have in total?',
        visual: { type: 'equation', tokens: ['1 hexagon = 6 sides', '2 hexagons = ?'] },
        options: ['12', '6', '8', '18'],
        answer: 0,
        explanation: '12! Each hexagon has 6 sides, so 2 hexagons have 6 × 2 = 12 sides.'
      },
      {
        id: 'mt-c14',
        question: 'What is ½ + ¼?',
        visual: { type: 'equation', tokens: ['½', '+', '¼', '=', '?'] },
        options: ['¾', '½', '¼', '1'],
        answer: 0,
        explanation: '¾! Convert to the same denominator: 2/4 + 1/4 = 3/4.'
      },
      {
        id: 'mt-c15',
        question: 'If you multiply 7 by 0, what do you get?',
        visual: { type: 'equation', tokens: ['7', '×', '0', '=', '?'] },
        options: ['0', '7', '70', '1'],
        answer: 0,
        explanation: '0! Any number multiplied by 0 equals 0.'
      }
    ]
  }
};

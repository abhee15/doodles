// Emotion data for Emotion Explorer
const EMOTIONS = {
  happy: {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    description: 'A feeling of joy and contentment',
    triggers: [
      'Getting a good grade on a test',
      'Playing with friends',
      'Eating your favorite food',
      'Winning a game or competition',
      'Receiving a compliment',
      'Celebrating a special day'
    ],
    signals: [
      'Smiling or laughing',
      'Relaxed shoulders',
      'More energy and enthusiasm',
      'Want to spend time with others',
      'Lightness in your chest'
    ],
    strategies: [
      'Share your happiness with others',
      'Do more of what makes you happy',
      'Help someone else feel happy',
      'Take a photo to remember the moment',
      'Write about it in a journal',
      'Dance or listen to upbeat music'
    ],
    hasBreathing: false
  },
  sad: {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    description: 'A feeling of sorrow or unhappiness',
    triggers: [
      'Losing something important',
      'Saying goodbye to a friend',
      'Not getting what you wanted',
      'Someone you care about is hurt',
      'Disappointing news',
      'Feeling left out'
    ],
    signals: [
      'Tears or crying',
      'Heaviness in chest',
      'Quiet or withdrawn',
      'Loss of interest in activities',
      'Slower movements',
      'Difficulty concentrating'
    ],
    strategies: [
      'Talk to someone you trust',
      'Let yourself cry - it helps',
      'Do something you enjoy',
      'Spend time with supportive people',
      'Write about your feelings',
      'Take a warm bath or rest'
    ],
    hasBreathing: true
  },
  angry: {
    id: 'angry',
    name: 'Angry',
    emoji: '😠',
    description: 'A strong feeling of displeasure or irritation',
    triggers: [
      'Someone breaking your favorite toy',
      'Being treated unfairly',
      'Not getting your way',
      'Someone being mean to you',
      'Feeling disrespected',
      'Waiting too long for something'
    ],
    signals: [
      'Hot feeling in face or head',
      'Tense muscles',
      'Clenched fists or jaw',
      'Speaking louder than usual',
      'Fast heartbeat',
      'Want to hit or kick something'
    ],
    strategies: [
      'Take slow, deep breaths',
      'Count to 10 before reacting',
      'Punch a pillow or squeeze a stress ball',
      'Go for a walk or run',
      'Listen to calm music',
      'Talk about what made you angry'
    ],
    hasBreathing: true
  },
  scared: {
    id: 'scared',
    name: 'Scared',
    emoji: '😨',
    description: 'A feeling of fear or anxiety',
    triggers: [
      'Dark places or being alone',
      'Scary movies or stories',
      'Speaking in front of the class',
      'New experiences or situations',
      'Heights or dangerous situations',
      'Loud unexpected noises'
    ],
    signals: [
      'Heart pounding',
      'Shaking or trembling',
      'Tight stomach',
      'Difficulty breathing',
      'Frozen or unable to move',
      'Sweating'
    ],
    strategies: [
      'Focus on your breathing',
      'Stay with someone you trust',
      'Talk about what scares you',
      'Take small steps to face fears',
      'Remember times you were brave',
      'Create a safe comfort space'
    ],
    hasBreathing: true
  },
  excited: {
    id: 'excited',
    name: 'Excited',
    emoji: '🤩',
    description: 'A feeling of enthusiasm and anticipation',
    triggers: [
      'Upcoming birthday or celebration',
      'Trying something new',
      'Going on a trip or adventure',
      'Meeting someone you like',
      'Receiving good news',
      'Starting a game or activity you love'
    ],
    signals: [
      'Quick movements',
      "Can't sit still",
      'Talking fast',
      'Butterflies in stomach',
      'Wide eyes and smile',
      'Want to jump or dance'
    ],
    strategies: [
      'Channel energy into preparation',
      'Share excitement with others',
      'Set up for the event',
      'Count down the days',
      'Take deep breaths when overwhelmed',
      'Do something active'
    ],
    hasBreathing: false
  },
  calm: {
    id: 'calm',
    name: 'Calm',
    emoji: '😌',
    description: 'A feeling of peace and relaxation',
    triggers: [
      'Quiet, peaceful environments',
      'Being in nature',
      'Time alone with your thoughts',
      'Reading or listening to music',
      'After exercise or stretching',
      'Feeling safe and comfortable'
    ],
    signals: [
      'Slow, steady breathing',
      'Relaxed muscles',
      'Clear mind',
      'Peaceful expression',
      'Slow movements',
      'Able to focus'
    ],
    strategies: [
      'Practice deep breathing',
      'Meditate or do yoga',
      'Spend time in nature',
      'Listen to relaxing music',
      'Read a book',
      'Do progressive muscle relaxation'
    ],
    hasBreathing: true
  }
};

const QUIZZES = [
  {
    scenario: "Your team just scored the winning goal in soccer. You can't stop smiling!",
    options: ['Happy', 'Excited', 'Calm'],
    correctAnswer: 0,
    explanation:
      "This is Happy! You're feeling contentment and joy from your team's victory. Excited could also work, but Happy better describes the satisfied feeling after a win."
  },
  {
    scenario: "You've been waiting to go to the amusement park all week. Your heart is racing!",
    options: ['Happy', 'Excited', 'Calm'],
    correctAnswer: 1,
    explanation:
      "This is Excited! The anticipation and energy show excitement. You can't wait for something to happen!"
  },
  {
    scenario:
      'Your best friend is moving away to another city. You feel a heaviness in your chest.',
    options: ['Sad', 'Scared', 'Angry'],
    correctAnswer: 0,
    explanation:
      'This is Sad! The heaviness in your chest and the loss of someone important triggers sadness.'
  },
  {
    scenario: 'Someone pushes you in line and you feel heat rising in your face.',
    options: ['Scared', 'Angry', 'Sad'],
    correctAnswer: 1,
    explanation:
      'This is Angry! Being treated unfairly and the physical sensation of heat in your face are signs of anger.'
  },
  {
    scenario: "You're in a dark basement and hear strange noises. Your heart is pounding.",
    options: ['Scared', 'Calm', 'Happy'],
    correctAnswer: 0,
    explanation: 'This is Scared! The dark, unknown environment and your racing heart show fear.'
  },
  {
    scenario: "You're sitting by the ocean watching the sunset. Everything feels peaceful.",
    options: ['Excited', 'Calm', 'Happy'],
    correctAnswer: 1,
    explanation:
      'This is Calm! The peaceful environment and the relaxed feeling describe calmness perfectly.'
  }
];

function getEmotion(emotionId) {
  return EMOTIONS[emotionId];
}

function getAllEmotions() {
  return Object.values(EMOTIONS);
}

function getQuizzes() {
  return QUIZZES;
}

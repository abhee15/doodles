// State management with new features
const state = {
  currentCat: null,
  currentSubject: null,
  currentStep: 0,
  isDrawing: false,
  lastX: 0,
  lastY: 0,
  penColor: '#1A1A1A',
  penSize: 5,
  eraserMode: false,
  undoStack: [],
  redoStack: [],
  maxUndoDepth: 30
};

// Categories
const CATEGORIES = [
  { id: 'animals', label: 'Animals', icon: 'ti-paw', color: '#FF6B9D' },
  { id: 'flowers', label: 'Flowers & Plants', icon: 'ti-flower', color: '#4ECDC4' },
  { id: 'vehicles', label: 'Vehicles', icon: 'ti-car', color: '#FFB347' },
  { id: 'food', label: 'Food', icon: 'ti-ice-cream', color: '#FF8C69' },
  { id: 'characters', label: 'Characters', icon: 'ti-mood-happy', color: '#A78BFA' },
  { id: 'fantasy', label: 'Fantasy', icon: 'ti-wand', color: '#A78BFA' }
];

// All subjects with steps
const SUBJECTS = [
  // ANIMALS
  {
    id: 'cat',
    label: 'Cat',
    category: 'animals',
    emoji: '🐱',
    steps: [
      { title: 'Draw the head', desc: 'Large circle in the middle.', draw: drawCat_step1 },
      { title: 'Add pointy ears', desc: 'Two triangles on top of the head.', draw: drawCat_step2 },
      { title: 'Draw eyes', desc: 'Two oval shapes, pointed at the corners.', draw: drawCat_step3 },
      {
        title: 'Add nose & mouth',
        desc: 'Triangle nose, curved smile below.',
        draw: drawCat_step4
      },
      {
        title: 'Whiskers & body outline',
        desc: 'Three lines each side, then draw body shape below.',
        draw: drawCat_step5
      },
      {
        title: 'Front legs & tail',
        desc: 'Two straight legs below, curved tail on side.',
        draw: drawCat_step6
      }
    ]
  },
  {
    id: 'bird',
    label: 'Bird',
    category: 'animals',
    emoji: '🐦',
    steps: [
      {
        title: 'Body shape',
        desc: 'Draw a medium oval horizontally for the body.',
        draw: drawBird_step1
      },
      {
        title: 'Head circle',
        desc: 'Add a circle on the left side for the head (smaller than body).',
        draw: drawBird_step2
      },
      {
        title: 'Beak',
        desc: 'Draw a small pointed triangle on the left of the head.',
        draw: drawBird_step3
      },
      { title: 'Eye', desc: 'Add a small circle on the head for the eye.', draw: drawBird_step4 },
      {
        title: 'Wings',
        desc: 'Draw two curved oval shapes on the sides of the body.',
        draw: drawBird_step5
      },
      {
        title: 'Tail feathers',
        desc: 'Add 3-4 curved lines at the back for tail feathers.',
        draw: drawBird_step6
      },
      {
        title: 'Legs & details',
        desc: 'Two short lines for legs, add details to wing.',
        draw: drawBird_step7
      }
    ]
  },
  {
    id: 'dog',
    label: 'Dog',
    category: 'animals',
    emoji: '🐶',
    steps: [
      { title: 'Head circle', desc: 'Draw a large circle for the head.', draw: drawDog_step1 },
      {
        title: 'Floppy ears',
        desc: 'Add two large rounded rectangles on the sides for ears.',
        draw: drawDog_step2
      },
      {
        title: 'Snout area',
        desc: 'Draw a rounded rectangle shape sticking out for the snout.',
        draw: drawDog_step3
      },
      {
        title: 'Eyes',
        desc: 'Two small circles or ovals for eyes on the head.',
        draw: drawDog_step4
      },
      {
        title: 'Nose & mouth',
        desc: 'Small circle for nose, curved line for smiling mouth.',
        draw: drawDog_step5
      },
      {
        title: 'Body shape',
        desc: 'Draw a larger oval below the head for the body.',
        draw: drawDog_step6
      },
      {
        title: 'Legs & tail',
        desc: 'Four short lines for legs at bottom, curved tail.',
        draw: drawDog_step7
      }
    ]
  },
  {
    id: 'fish',
    label: 'Fish',
    category: 'animals',
    emoji: '🐠',
    steps: [
      {
        title: 'Body',
        desc: 'Draw a medium oval horizontally for the fish body.',
        draw: drawFish_step1
      },
      {
        title: 'Tail fin',
        desc: 'Draw a triangle pointing right at the back.',
        draw: drawFish_step2
      },
      { title: 'Top fin', desc: 'Add a curved triangle on top of the body.', draw: drawFish_step3 },
      {
        title: 'Bottom fin',
        desc: 'Add another curved triangle on the bottom.',
        draw: drawFish_step4
      },
      { title: 'Eye', desc: 'Small circle near the front for the eye.', draw: drawFish_step5 },
      {
        title: 'Mouth & details',
        desc: 'Small circle for mouth, add lines in tail for pattern.',
        draw: drawFish_step6
      }
    ]
  },
  {
    id: 'butterfly',
    label: 'Butterfly',
    category: 'animals',
    emoji: '🦋',
    steps: [
      {
        title: 'Body',
        desc: 'Draw a vertical rectangle down the middle for the body.',
        draw: drawButterfly_step1
      },
      {
        title: 'Upper left wing',
        desc: 'Draw a large oval tilted to the upper left.',
        draw: drawButterfly_step2
      },
      {
        title: 'Upper right wing',
        desc: 'Draw a matching oval tilted to the upper right.',
        draw: drawButterfly_step3
      },
      {
        title: 'Lower left wing',
        desc: 'Draw another oval below and tilted for lower left wing.',
        draw: drawButterfly_step4
      },
      {
        title: 'Lower right wing',
        desc: 'Draw matching lower right wing oval.',
        draw: drawButterfly_step5
      },
      {
        title: 'Antennae',
        desc: 'Two curved lines from the top of the body for antennae.',
        draw: drawButterfly_step6
      },
      {
        title: 'Wing patterns',
        desc: 'Add circles and dots on the wings for pretty patterns.',
        draw: drawButterfly_step7
      }
    ]
  },
  {
    id: 'rabbit',
    label: 'Rabbit',
    category: 'animals',
    emoji: '🐰',
    steps: [
      { title: 'Head', desc: 'Draw a circle for the rabbit head.', draw: drawRabbit_step1 },
      {
        title: 'Long ears',
        desc: 'Two tall ovals sticking up from the top of head.',
        draw: drawRabbit_step2
      },
      {
        title: 'Inner ears',
        desc: 'Smaller ovals inside each ear for detail.',
        draw: drawRabbit_step3
      },
      { title: 'Eyes', desc: 'Two circles for big bright eyes.', draw: drawRabbit_step4 },
      {
        title: 'Nose & mouth',
        desc: 'Small triangle for nose, line for cute buck teeth/smile.',
        draw: drawRabbit_step5
      },
      {
        title: 'Body',
        desc: 'Larger oval below the head for the fuzzy body.',
        draw: drawRabbit_step6
      },
      {
        title: 'Legs & tail',
        desc: 'Two hind legs at bottom, fluffy tail at back.',
        draw: drawRabbit_step7
      }
    ]
  },

  // CHARACTERS
  {
    id: 'mickey-mouse',
    label: 'Mickey Mouse',
    category: 'characters',
    emoji: '🐭',
    steps: [
      {
        title: 'Head circle',
        desc: "Draw a large circle in the center for Mickey's head.",
        draw: drawMickey_step1
      },
      {
        title: 'Left ear',
        desc: 'Draw a large circle on the upper left side.',
        draw: drawMickey_step2
      },
      {
        title: 'Right ear',
        desc: 'Draw matching circle on the upper right side.',
        draw: drawMickey_step3
      },
      {
        title: 'Eyes',
        desc: 'Two large oval shapes with smaller ovals inside for pupils.',
        draw: drawMickey_step4
      },
      {
        title: 'Nose & mouth',
        desc: 'Large oval nose between eyes, big smile line below.',
        draw: drawMickey_step5
      },
      {
        title: 'Body & shorts',
        desc: 'Draw oval for body, add short line for pants/shorts.',
        draw: drawMickey_step6
      },
      {
        title: 'Arms & legs',
        desc: 'Add two arms and two legs as simple shapes.',
        draw: drawMickey_step7
      },
      {
        title: 'Final details',
        desc: 'Add buttons on shorts and shoes at the bottom.',
        draw: drawMickey_step8
      }
    ]
  },
  {
    id: 'pikachu',
    label: 'Pikachu',
    category: 'characters',
    emoji: '⚡',
    steps: [
      {
        title: 'Head shape',
        desc: "Draw a circle for Pikachu's round head.",
        draw: drawPikachu_step1
      },
      {
        title: 'Pointy left ear',
        desc: 'Draw a tall pointed oval on the upper left.',
        draw: drawPikachu_step2
      },
      {
        title: 'Pointy right ear',
        desc: 'Draw matching pointed oval on upper right.',
        draw: drawPikachu_step3
      },
      {
        title: 'Cheek circles',
        desc: 'Two circles on sides of face for rosy red cheeks.',
        draw: drawPikachu_step4
      },
      {
        title: 'Eyes & nose',
        desc: 'Small circles for eyes, tiny triangle for nose.',
        draw: drawPikachu_step5
      },
      {
        title: 'Mouth',
        desc: "Draw curved line for Pikachu's happy mouth.",
        draw: drawPikachu_step6
      },
      { title: 'Body', desc: 'Larger oval below head for the body.', draw: drawPikachu_step7 },
      {
        title: 'Tail',
        desc: 'Lightning bolt shaped tail on the right back side.',
        draw: drawPikachu_step8
      },
      {
        title: 'Arms & legs',
        desc: 'Simple shapes for short arms and legs.',
        draw: drawPikachu_step9
      }
    ]
  },
  {
    id: 'donald-duck',
    label: 'Donald Duck',
    category: 'characters',
    emoji: '🦆',
    steps: [
      { title: 'Head circle', desc: 'Draw a large circle for the head.', draw: drawDonald_step1 },
      {
        title: 'Long bill',
        desc: 'Draw an elongated triangle or rectangle for the bill.',
        draw: drawDonald_step2
      },
      {
        title: 'Eyes',
        desc: 'Two circles on the head, with pupils inside.',
        draw: drawDonald_step3
      },
      {
        title: 'Sailor hat',
        desc: 'Draw a curved line for the hat brim and top.',
        draw: drawDonald_step4
      },
      {
        title: 'Body outline',
        desc: 'Draw a larger oval for the sailor outfit body.',
        draw: drawDonald_step5
      },
      {
        title: 'Sailor jacket',
        desc: 'Add lines for jacket lapels and sailor collar detail.',
        draw: drawDonald_step6
      },
      {
        title: 'Legs & feet',
        desc: 'Two thin legs with large feet at bottom.',
        draw: drawDonald_step7
      }
    ]
  },
  {
    id: 'hulk',
    label: 'Hulk',
    category: 'characters',
    emoji: '💚',
    steps: [
      { title: 'Head', desc: "Draw a circle for Hulk's head.", draw: drawHulk_step1 },
      {
        title: 'Angry eyebrows',
        desc: 'Draw angry angled lines for eyebrows.',
        draw: drawHulk_step2
      },
      {
        title: 'Eyes & nose',
        desc: 'Two circles for eyes, small shape for nose.',
        draw: drawHulk_step3
      },
      { title: 'Fierce mouth', desc: 'Draw angry clenched teeth line.', draw: drawHulk_step4 },
      {
        title: 'Thick neck',
        desc: 'Draw wide rectangle for the thick neck.',
        draw: drawHulk_step5
      },
      {
        title: 'Massive shoulders',
        desc: 'Draw very wide shoulders/trapezoid shape.',
        draw: drawHulk_step6
      },
      {
        title: 'Huge muscular arms',
        desc: 'Draw two very large, thick arms with muscle bumps.',
        draw: drawHulk_step7
      },
      {
        title: 'Chest & pants',
        desc: 'Add chest outline and ripped pants at bottom.',
        draw: drawHulk_step8
      }
    ]
  },

  // FLOWERS
  {
    id: 'sunflower',
    label: 'Sunflower',
    category: 'flowers',
    emoji: '🌻',
    steps: [
      {
        title: 'Petals circle',
        desc: 'Draw a large circle - this is where petals will go.',
        draw: drawSunflower_step1
      },
      {
        title: 'Draw petals',
        desc: 'Draw 8 ovals pointing outward around the circle.',
        draw: drawSunflower_step2
      },
      {
        title: 'Flower center',
        desc: 'Small circle in the middle for the flower center.',
        draw: drawSunflower_step3
      },
      {
        title: 'Center texture',
        desc: 'Add small dots in the center for seed pattern.',
        draw: drawSunflower_step4
      },
      {
        title: 'Stem',
        desc: 'Long curved line going down for the stem.',
        draw: drawSunflower_step5
      },
      {
        title: 'Leaves',
        desc: 'Two long pointed ovals on the sides of stem.',
        draw: drawSunflower_step6
      }
    ]
  },
  {
    id: 'rose',
    label: 'Rose',
    category: 'flowers',
    emoji: '🌹',
    steps: [
      {
        title: 'Center petal',
        desc: 'Draw a small oval in the very center.',
        draw: drawRose_step1
      },
      {
        title: 'First ring of petals',
        desc: 'Draw 3-4 curved petals around the center.',
        draw: drawRose_step2
      },
      {
        title: 'Second ring of petals',
        desc: 'Add more petals outside for fullness.',
        draw: drawRose_step3
      },
      {
        title: 'Outer petals',
        desc: 'Add a few more outer petals for a full bloom.',
        draw: drawRose_step4
      },
      { title: 'Stem', desc: 'Draw a curved line down from the flower.', draw: drawRose_step5 },
      {
        title: 'Leaves on stem',
        desc: 'Two or three pointed leaves along the stem.',
        draw: drawRose_step6
      },
      { title: 'Thorns', desc: 'Add small thorns along the stem for detail.', draw: drawRose_step7 }
    ]
  },
  {
    id: 'tulip',
    label: 'Tulip',
    category: 'flowers',
    emoji: '🌷',
    steps: [
      {
        title: 'Center petal',
        desc: 'Draw a tall curved petal in the center.',
        draw: drawTulip_step1
      },
      { title: 'Left petal', desc: 'Draw a curved petal to the left side.', draw: drawTulip_step2 },
      {
        title: 'Right petal',
        desc: 'Draw a matching curved petal on the right.',
        draw: drawTulip_step3
      },
      {
        title: 'Inner petals',
        desc: 'Add two smaller petals inside for depth.',
        draw: drawTulip_step4
      },
      {
        title: 'Stem',
        desc: 'Long straight or slightly curved line for the stem.',
        draw: drawTulip_step5
      },
      {
        title: 'Leaves',
        desc: 'Two pointed leaf shapes on the sides of the stem.',
        draw: drawTulip_step6
      }
    ]
  },
  {
    id: 'tree',
    label: 'Tree',
    category: 'flowers',
    emoji: '🌳',
    steps: [
      { title: 'Trunk', desc: 'Draw a vertical rectangle for the trunk.', draw: drawTree_step1 },
      {
        title: 'Foliage circle',
        desc: 'Draw a large circle or oval on top for the leaves.',
        draw: drawTree_step2
      },
      {
        title: 'Tree outline',
        desc: 'Add a curved outline around foliage to look natural.',
        draw: drawTree_step3
      },
      {
        title: 'Texture lines',
        desc: 'Add curved lines inside to show tree shape.',
        draw: drawTree_step4
      },
      {
        title: 'Leaf details',
        desc: 'Add small bump shapes for foliage texture.',
        draw: drawTree_step5
      },
      {
        title: 'Grass base',
        desc: 'Draw wavy lines at the bottom for grass.',
        draw: drawTree_step6
      }
    ]
  },

  // VEHICLES
  {
    id: 'car',
    label: 'Car',
    category: 'vehicles',
    emoji: '🚗',
    steps: [
      { title: 'Car body', desc: 'Draw a large rectangle for the main body.', draw: drawCar_step1 },
      {
        title: 'Cabin/top',
        desc: 'Draw a smaller rectangle on top for the cabin.',
        draw: drawCar_step2
      },
      {
        title: 'Front wheels',
        desc: 'Draw two circles or ovals at the bottom for wheels.',
        draw: drawCar_step3
      },
      {
        title: 'Front window',
        desc: 'Rectangle on the front lower part of cabin.',
        draw: drawCar_step4
      },
      {
        title: 'Back window',
        desc: 'Another rectangle behind the front window.',
        draw: drawCar_step5
      },
      {
        title: 'Headlights',
        desc: 'Two small circles or rectangles at the front.',
        draw: drawCar_step6
      },
      {
        title: 'Door line',
        desc: 'Vertical line down the middle for car door.',
        draw: drawCar_step7
      },
      {
        title: 'Final details',
        desc: 'Add bumper line and wheel rims for details.',
        draw: drawCar_step8
      }
    ]
  },
  {
    id: 'airplane',
    label: 'Airplane',
    category: 'vehicles',
    emoji: '✈️',
    steps: [
      {
        title: 'Main body',
        desc: 'Draw an elongated oval for the plane body.',
        draw: drawAirplane_step1
      },
      {
        title: 'Wings',
        desc: 'Draw two large horizontal rectangles from each side.',
        draw: drawAirplane_step2
      },
      {
        title: 'Tail section',
        desc: 'Draw a small tail structure at the back.',
        draw: drawAirplane_step3
      },
      {
        title: 'Tail wing',
        desc: 'Add a vertical tail wing at the very back.',
        draw: drawAirplane_step4
      },
      {
        title: 'Cockpit',
        desc: 'Small circle or rounded rectangle on the nose.',
        draw: drawAirplane_step5
      },
      {
        title: 'Windows',
        desc: 'Add small circles along the body for windows.',
        draw: drawAirplane_step6
      },
      {
        title: 'Landing gear',
        desc: 'Three small circles or lines for wheels underneath.',
        draw: drawAirplane_step7
      }
    ]
  },
  {
    id: 'rocket',
    label: 'Rocket',
    category: 'vehicles',
    emoji: '🚀',
    steps: [
      {
        title: 'Main body',
        desc: 'Draw a tall rectangle for the rocket body.',
        draw: drawRocket_step1
      },
      { title: 'Nose cone', desc: 'Triangle on top pointing upward.', draw: drawRocket_step2 },
      {
        title: 'Left fin',
        desc: 'Triangle on the lower left back for a fin.',
        draw: drawRocket_step3
      },
      {
        title: 'Right fin',
        desc: 'Triangle on the lower right back for matching fin.',
        draw: drawRocket_step4
      },
      {
        title: 'Center fin',
        desc: 'Small line or triangle in the middle back.',
        draw: drawRocket_step5
      },
      {
        title: 'Porthole',
        desc: 'Circle near the top for a window/porthole.',
        draw: drawRocket_step6
      },
      {
        title: 'Flame',
        desc: 'Draw wavy lines at the bottom for rocket fire.',
        draw: drawRocket_step7
      }
    ]
  },
  {
    id: 'boat',
    label: 'Boat',
    category: 'vehicles',
    emoji: '⛵',
    steps: [
      {
        title: 'Hull shape',
        desc: 'Draw a curved bottom (like a U or boat shape).',
        draw: drawBoat_step1
      },
      {
        title: 'Boat sides',
        desc: 'Add straight lines on sides going up from hull.',
        draw: drawBoat_step2
      },
      {
        title: 'Mast',
        desc: 'Draw a vertical line in the middle for the mast.',
        draw: drawBoat_step3
      },
      {
        title: 'Sail',
        desc: 'Triangle connected to mast for the main sail.',
        draw: drawBoat_step4
      },
      {
        title: 'Small sail',
        desc: 'Smaller triangle in front for jib sail.',
        draw: drawBoat_step5
      },
      { title: 'Cabin', desc: 'Small rectangle on the boat deck for cabin.', draw: drawBoat_step6 },
      { title: 'Water waves', desc: 'Wavy lines under the boat for water.', draw: drawBoat_step7 }
    ]
  },

  // FOOD
  {
    id: 'ice-cream',
    label: 'Ice Cream',
    category: 'food',
    emoji: '🍦',
    steps: [
      { title: 'Cone', desc: 'Draw a triangle for the ice cream cone.', draw: drawIceCream_step1 },
      {
        title: 'Cone lines',
        desc: 'Add diagonal lines across cone for texture.',
        draw: drawIceCream_step2
      },
      {
        title: 'First scoop',
        desc: 'Draw a circle on top of cone for first scoop.',
        draw: drawIceCream_step3
      },
      {
        title: 'Second scoop',
        desc: 'Add another circle on top of the first.',
        draw: drawIceCream_step4
      },
      {
        title: 'Third scoop',
        desc: 'Add one more circle on top for three scoops.',
        draw: drawIceCream_step5
      },
      {
        title: 'Swirl detail',
        desc: 'Add curved lines to make ice cream look swirly.',
        draw: drawIceCream_step6
      },
      {
        title: 'Cherry on top',
        desc: 'Small circle at the very top for cherry.',
        draw: drawIceCream_step7
      }
    ]
  },
  {
    id: 'pizza',
    label: 'Pizza',
    category: 'food',
    emoji: '🍕',
    steps: [
      { title: 'Pizza circle', desc: 'Draw a large circle for the pizza.', draw: drawPizza_step1 },
      {
        title: 'Slice line 1',
        desc: 'Draw a line from center to edge (divide into slices).',
        draw: drawPizza_step2
      },
      {
        title: 'Slice line 2',
        desc: 'Draw another line from center at an angle.',
        draw: drawPizza_step3
      },
      {
        title: 'Slice line 3',
        desc: 'One more line to create pizza slice sections.',
        draw: drawPizza_step4
      },
      {
        title: 'Cheese',
        desc: 'Wavy or bumpy lines across pizza for melted cheese.',
        draw: drawPizza_step5
      },
      {
        title: 'Pepperoni',
        desc: 'Small circles scattered on pizza for pepperoni.',
        draw: drawPizza_step6
      },
      {
        title: 'Crust detail',
        desc: 'Add thicker line around edge for the crust.',
        draw: drawPizza_step7
      }
    ]
  },
  {
    id: 'apple',
    label: 'Apple',
    category: 'food',
    emoji: '🍎',
    steps: [
      {
        title: 'Apple shape',
        desc: 'Draw a circle, slightly wider in the middle.',
        draw: drawApple_step1
      },
      { title: 'Top indent', desc: 'Add a small curved indent at the top.', draw: drawApple_step2 },
      {
        title: 'Stem',
        desc: 'Draw a short line from the top for the stem.',
        draw: drawApple_step3
      },
      { title: 'Leaf', desc: 'Oval shape attached to the stem.', draw: drawApple_step4 },
      {
        title: 'Shine highlight',
        desc: 'Small curved shape on upper part for shine.',
        draw: drawApple_step5
      },
      {
        title: 'Bottom detail',
        desc: 'Add a small bottom indent for apple detail.',
        draw: drawApple_step6
      }
    ]
  },
  {
    id: 'cupcake',
    label: 'Cupcake',
    category: 'food',
    emoji: '🧁',
    steps: [
      {
        title: 'Wrapper',
        desc: 'Draw a trapezoid (wider at bottom) for the wrapper.',
        draw: drawCupcake_step1
      },
      {
        title: 'Wrapper pattern',
        desc: 'Add horizontal lines across wrapper for ridges.',
        draw: drawCupcake_step2
      },
      {
        title: 'Frosting base',
        desc: 'Draw a curved line on top for frosting shape.',
        draw: drawCupcake_step3
      },
      {
        title: 'Frosting swirl',
        desc: 'Add swirled lines on top for frosting texture.',
        draw: drawCupcake_step4
      },
      {
        title: 'Frosting peaks',
        desc: 'Add peaks and bumps for frosting detail.',
        draw: drawCupcake_step5
      },
      {
        title: 'Cherry',
        desc: 'Small circle at the top center for cherry.',
        draw: drawCupcake_step6
      },
      {
        title: 'Details',
        desc: 'Add sprinkles or decorative dots on frosting.',
        draw: drawCupcake_step7
      }
    ]
  },

  // FANTASY
  {
    id: 'dragon',
    label: 'Dragon',
    category: 'fantasy',
    emoji: '🐉',
    steps: [
      { title: 'Head shape', desc: "Draw a circle for the dragon's head.", draw: drawDragon_step1 },
      {
        title: 'Snout',
        desc: 'Add a pointed oval extending from the head for snout.',
        draw: drawDragon_step2
      },
      {
        title: 'Horn',
        desc: 'Draw a tall pointed triangle on top of the head.',
        draw: drawDragon_step3
      },
      {
        title: 'Spines',
        desc: 'Add 4-5 triangular spines down the back and neck.',
        draw: drawDragon_step4
      },
      {
        title: 'Body',
        desc: "Draw a large oval or S-curve for the dragon's body.",
        draw: drawDragon_step5
      },
      {
        title: 'Wings',
        desc: 'Draw two large, pointed triangular or bat-like wings.',
        draw: drawDragon_step6
      },
      {
        title: 'Legs & claws',
        desc: 'Add four legs with curved lines for claws.',
        draw: drawDragon_step7
      },
      {
        title: 'Tail & fire',
        desc: 'Long curved tail and flames coming from mouth.',
        draw: drawDragon_step8
      }
    ]
  },
  {
    id: 'castle',
    label: 'Castle',
    category: 'fantasy',
    emoji: '🏰',
    steps: [
      {
        title: 'Base wall',
        desc: 'Draw a large rectangle for the main castle wall.',
        draw: drawCastle_step1
      },
      {
        title: 'Towers',
        desc: 'Add two tall rectangles on left and right for towers.',
        draw: drawCastle_step2
      },
      {
        title: 'Battlements',
        desc: 'Add small rectangles along the top for castle battlements.',
        draw: drawCastle_step3
      },
      {
        title: 'Gate arch',
        desc: 'Draw a curved arch in the center for the main gate.',
        draw: drawCastle_step4
      },
      {
        title: 'Windows',
        desc: 'Add small rectangles for windows in the towers.',
        draw: drawCastle_step5
      },
      {
        title: 'Flag',
        desc: 'Add a flag with a pole on top of one tower.',
        draw: drawCastle_step6
      },
      {
        title: 'Stone texture',
        desc: 'Add lines and patterns for stone bricks detail.',
        draw: drawCastle_step7
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// DRAWING FUNCTIONS - ANIMALS
// ═══════════════════════════════════════════════════════════════════

// CAT
function drawCat_step1(ctx) {
  // Head - simple circle
  ctx.beginPath();
  ctx.arc(200, 160, 60, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCat_step2(ctx) {
  // Two ears - simple triangles
  ctx.beginPath();
  ctx.moveTo(160, 110);
  ctx.lineTo(145, 50);
  ctx.lineTo(175, 115);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(240, 110);
  ctx.lineTo(255, 50);
  ctx.lineTo(225, 115);
  ctx.closePath();
  ctx.stroke();
}
function drawCat_step3(ctx) {
  // Two eyes - circles with pupils
  ctx.beginPath();
  ctx.arc(170, 150, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 150, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(170, 150, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 150, 5, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCat_step4(ctx) {
  // Nose and mouth
  ctx.beginPath();
  ctx.arc(200, 175, 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 180);
  ctx.quadraticCurveTo(185, 190, 175, 185);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 180);
  ctx.quadraticCurveTo(215, 190, 225, 185);
  ctx.stroke();
}
function drawCat_step5(ctx) {
  // Body - larger oval below head
  ctx.beginPath();
  ctx.ellipse(200, 260, 70, 65, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCat_step6(ctx) {
  // Four legs - simple vertical lines from body
  ctx.beginPath();
  ctx.moveTo(160, 315);
  ctx.lineTo(160, 370);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 320);
  ctx.lineTo(200, 375);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(240, 320);
  ctx.lineTo(240, 375);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(280, 315);
  ctx.lineTo(280, 370);
  ctx.stroke();
}

// BIRD
function drawBird_step1(ctx) {
  // Body - organic curved shape
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.quadraticCurveTo(180, 170, 220, 170);
  ctx.quadraticCurveTo(260, 175, 280, 210);
  ctx.quadraticCurveTo(260, 240, 200, 250);
  ctx.quadraticCurveTo(150, 245, 150, 200);
  ctx.closePath();
  ctx.stroke();
}
function drawBird_step2(ctx) {
  // Head - rounded shape connected to body
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.quadraticCurveTo(100, 170, 90, 190);
  ctx.quadraticCurveTo(100, 220, 140, 210);
  ctx.closePath();
  ctx.stroke();
}
function drawBird_step3(ctx) {
  // Beak - curved pointed shape
  ctx.beginPath();
  ctx.moveTo(90, 190);
  ctx.quadraticCurveTo(60, 185, 50, 200);
  ctx.quadraticCurveTo(60, 205, 90, 200);
  ctx.closePath();
  ctx.stroke();
}
function drawBird_step4(ctx) {
  // Eye - small dot on head
  ctx.beginPath();
  ctx.arc(105, 190, 5, 0, Math.PI * 2);
  ctx.stroke();
}
function drawBird_step5(ctx) {
  // Wing - curved feather shape
  ctx.beginPath();
  ctx.moveTo(180, 185);
  ctx.quadraticCurveTo(160, 150, 180, 120);
  ctx.quadraticCurveTo(200, 140, 210, 190);
  ctx.closePath();
  ctx.stroke();
}
function drawBird_step6(ctx) {
  // Tail feathers - curved flowing lines
  ctx.beginPath();
  ctx.moveTo(280, 210);
  ctx.quadraticCurveTo(310, 190, 330, 150);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(280, 220);
  ctx.quadraticCurveTo(320, 220, 340, 200);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(280, 230);
  ctx.quadraticCurveTo(310, 250, 330, 280);
  ctx.stroke();
}
function drawBird_step7(ctx) {
  // Legs - simple curved lines
  ctx.beginPath();
  ctx.moveTo(200, 250);
  ctx.quadraticCurveTo(195, 275, 195, 300);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(220, 255);
  ctx.quadraticCurveTo(225, 280, 225, 305);
  ctx.stroke();
}

// DOG
function drawDog_step1(ctx) {
  // Head - organic curved shape
  ctx.beginPath();
  ctx.moveTo(170, 120);
  ctx.quadraticCurveTo(140, 130, 140, 160);
  ctx.quadraticCurveTo(145, 190, 200, 200);
  ctx.quadraticCurveTo(240, 195, 260, 160);
  ctx.quadraticCurveTo(260, 130, 230, 120);
  ctx.quadraticCurveTo(200, 110, 170, 120);
  ctx.closePath();
  ctx.stroke();
}
function drawDog_step2(ctx) {
  // Two floppy ears - curved hanging shapes
  ctx.beginPath();
  ctx.moveTo(150, 140);
  ctx.quadraticCurveTo(120, 150, 115, 190);
  ctx.quadraticCurveTo(125, 200, 145, 180);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(250, 140);
  ctx.quadraticCurveTo(280, 150, 285, 190);
  ctx.quadraticCurveTo(275, 200, 255, 180);
  ctx.closePath();
  ctx.stroke();
}
function drawDog_step3(ctx) {
  // Snout area - rounded protruding shape
  ctx.beginPath();
  ctx.moveTo(180, 190);
  ctx.quadraticCurveTo(160, 210, 170, 230);
  ctx.quadraticCurveTo(200, 245, 230, 230);
  ctx.quadraticCurveTo(240, 210, 220, 190);
  ctx.closePath();
  ctx.stroke();
}
function drawDog_step4(ctx) {
  // Two eyes - small dots
  ctx.beginPath();
  ctx.arc(170, 160, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 160, 7, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDog_step5(ctx) {
  // Nose and mouth
  ctx.beginPath();
  ctx.arc(200, 215, 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 221);
  ctx.quadraticCurveTo(185, 235, 180, 230);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 221);
  ctx.quadraticCurveTo(215, 235, 220, 230);
  ctx.stroke();
}
function drawDog_step6(ctx) {
  // Body - organic curved shape
  ctx.beginPath();
  ctx.moveTo(160, 240);
  ctx.quadraticCurveTo(130, 260, 130, 310);
  ctx.quadraticCurveTo(140, 340, 200, 350);
  ctx.quadraticCurveTo(260, 340, 270, 310);
  ctx.quadraticCurveTo(270, 260, 240, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawDog_step7(ctx) {
  // Four legs - curved flowing lines
  ctx.beginPath();
  ctx.moveTo(170, 340);
  ctx.quadraticCurveTo(160, 360, 160, 390);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 350);
  ctx.quadraticCurveTo(195, 370, 200, 400);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(230, 350);
  ctx.quadraticCurveTo(235, 370, 230, 400);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(260, 340);
  ctx.quadraticCurveTo(270, 360, 270, 390);
  ctx.stroke();
}

// FISH
function drawFish_step1(ctx) {
  // Body - horizontal oval
  ctx.beginPath();
  ctx.ellipse(200, 200, 90, 55, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawFish_step2(ctx) {
  // Tail fin - large triangle pointing right
  ctx.beginPath();
  ctx.moveTo(290, 200);
  ctx.lineTo(360, 150);
  ctx.lineTo(360, 250);
  ctx.closePath();
  ctx.stroke();
}
function drawFish_step3(ctx) {
  // Top fin - oval on top of body
  ctx.beginPath();
  ctx.ellipse(200, 140, 35, 50, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawFish_step4(ctx) {
  // Bottom fin - oval below body
  ctx.beginPath();
  ctx.ellipse(200, 260, 35, 50, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawFish_step5(ctx) {
  // Eye - small circle near front
  ctx.beginPath();
  ctx.arc(260, 190, 10, 0, Math.PI * 2);
  ctx.stroke();
}
function drawFish_step6(ctx) {
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(160 + i * 20, 190);
    ctx.lineTo(165 + i * 20, 220);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(360, 200, 8, 0, Math.PI * 2);
  ctx.stroke();
}

// BUTTERFLY
function drawButterfly_step1(ctx) {
  // Body - curved line with segments
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.quadraticCurveTo(195, 160, 200, 220);
  ctx.quadraticCurveTo(205, 260, 200, 300);
  ctx.stroke();
}
function drawButterfly_step2(ctx) {
  // Upper left wing - curved organic shape
  ctx.beginPath();
  ctx.moveTo(200, 140);
  ctx.quadraticCurveTo(120, 100, 80, 130);
  ctx.quadraticCurveTo(70, 160, 100, 170);
  ctx.quadraticCurveTo(150, 155, 200, 140);
  ctx.closePath();
  ctx.stroke();
}
function drawButterfly_step3(ctx) {
  // Upper right wing - curved organic shape
  ctx.beginPath();
  ctx.moveTo(200, 140);
  ctx.quadraticCurveTo(280, 100, 320, 130);
  ctx.quadraticCurveTo(330, 160, 300, 170);
  ctx.quadraticCurveTo(250, 155, 200, 140);
  ctx.closePath();
  ctx.stroke();
}
function drawButterfly_step4(ctx) {
  // Lower left wing - curved organic shape
  ctx.beginPath();
  ctx.moveTo(200, 240);
  ctx.quadraticCurveTo(130, 220, 100, 270);
  ctx.quadraticCurveTo(110, 310, 150, 320);
  ctx.quadraticCurveTo(175, 295, 200, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawButterfly_step5(ctx) {
  // Lower right wing - curved organic shape
  ctx.beginPath();
  ctx.moveTo(200, 240);
  ctx.quadraticCurveTo(270, 220, 300, 270);
  ctx.quadraticCurveTo(290, 310, 250, 320);
  ctx.quadraticCurveTo(225, 295, 200, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawButterfly_step6(ctx) {
  // Antennae - curved flowing lines
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.quadraticCurveTo(170, 60, 150, 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.quadraticCurveTo(230, 60, 250, 30);
  ctx.stroke();
}
function drawButterfly_step7(ctx) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(85 + i * 40, 120 - i * 10, 8, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(315 - i * 40, 120 - i * 10, 8, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// RABBIT
function drawRabbit_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 75, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step2(ctx) {
  ctx.beginPath();
  ctx.ellipse(150, 80, 28, 95, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(250, 80, 28, 95, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step3(ctx) {
  ctx.beginPath();
  ctx.ellipse(150, 80, 12, 60, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(250, 80, 12, 60, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step4(ctx) {
  ctx.beginPath();
  ctx.arc(170, 190, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 190, 15, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 225, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(180, 240);
  ctx.quadraticCurveTo(200, 250, 220, 240);
  ctx.stroke();
}
function drawRabbit_step6(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 290, 70, 65, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step7(ctx) {
  ctx.beginPath();
  ctx.moveTo(160, 340);
  ctx.lineTo(160, 380);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(240, 340);
  ctx.lineTo(240, 380);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(250, 310);
  ctx.quadraticCurveTo(280, 290, 300, 270);
  ctx.stroke();
}

// ═══════════════════════════════════════════════════════════════════
// DRAWING FUNCTIONS - CHARACTERS
// ═══════════════════════════════════════════════════════════════════

// MICKEY MOUSE
function drawMickey_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 80, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step2(ctx) {
  ctx.beginPath();
  ctx.arc(100, 100, 50, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step3(ctx) {
  ctx.beginPath();
  ctx.arc(300, 100, 50, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step4(ctx) {
  ctx.beginPath();
  ctx.ellipse(170, 190, 18, 28, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(230, 190, 18, 28, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(170, 190, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 190, 8, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 230, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(185, 245);
  ctx.quadraticCurveTo(200, 255, 215, 245);
  ctx.stroke();
}
function drawMickey_step6(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 310, 90, 75, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step7(ctx) {
  // Left arm - extending from body side
  ctx.beginPath();
  ctx.moveTo(125, 290);
  ctx.lineTo(80, 310);
  ctx.stroke();
  // Right arm - extending from body side
  ctx.beginPath();
  ctx.moveTo(275, 290);
  ctx.lineTo(320, 310);
  ctx.stroke();
  // Left leg - extending down from body
  ctx.beginPath();
  ctx.moveTo(170, 375);
  ctx.lineTo(165, 410);
  ctx.stroke();
  // Right leg - extending down from body
  ctx.beginPath();
  ctx.moveTo(230, 375);
  ctx.lineTo(235, 410);
  ctx.stroke();
}
function drawMickey_step8(ctx) {
  // Left shoe
  ctx.beginPath();
  ctx.arc(165, 415, 10, 0, Math.PI * 2);
  ctx.stroke();
  // Right shoe
  ctx.beginPath();
  ctx.arc(235, 415, 10, 0, Math.PI * 2);
  ctx.stroke();
}

// PIKACHU
function drawPikachu_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 190, 70, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPikachu_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(155, 100);
  ctx.lineTo(130, 40);
  ctx.lineTo(175, 110);
  ctx.closePath();
  ctx.stroke();
}
function drawPikachu_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(245, 100);
  ctx.lineTo(270, 40);
  ctx.lineTo(225, 110);
  ctx.closePath();
  ctx.stroke();
}
function drawPikachu_step4(ctx) {
  ctx.beginPath();
  ctx.arc(130, 185, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(270, 185, 20, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPikachu_step5(ctx) {
  ctx.beginPath();
  ctx.arc(170, 175, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 175, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 210, 6, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPikachu_step6(ctx) {
  ctx.beginPath();
  ctx.moveTo(180, 225);
  ctx.quadraticCurveTo(200, 235, 220, 225);
  ctx.stroke();
}
function drawPikachu_step7(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 290, 65, 70, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPikachu_step8(ctx) {
  ctx.beginPath();
  ctx.moveTo(270, 320);
  ctx.lineTo(330, 310);
  ctx.lineTo(300, 360);
  ctx.closePath();
  ctx.stroke();
}
function drawPikachu_step9(ctx) {
  // Left arm - connect from body to side
  ctx.beginPath();
  ctx.moveTo(140, 280);
  ctx.lineTo(100, 310);
  ctx.stroke();
  // Right arm - connect from body to side
  ctx.beginPath();
  ctx.moveTo(260, 280);
  ctx.lineTo(300, 310);
  ctx.stroke();
  // Left leg - connect from body base
  ctx.beginPath();
  ctx.moveTo(170, 350);
  ctx.lineTo(160, 380);
  ctx.stroke();
  // Right leg - connect from body base
  ctx.beginPath();
  ctx.moveTo(230, 350);
  ctx.lineTo(240, 380);
  ctx.stroke();
}

// DONALD DUCK
function drawDonald_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 210, 75, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDonald_step2(ctx) {
  // Donald's bill - elongated triangle pointing forward/left
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.lineTo(80, 185);
  ctx.lineTo(85, 220);
  ctx.closePath();
  ctx.stroke();
}
function drawDonald_step3(ctx) {
  ctx.beginPath();
  ctx.arc(165, 200, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(235, 200, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(165, 200, 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(235, 200, 6, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDonald_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(140, 120);
  ctx.lineTo(260, 120);
  ctx.lineTo(265, 155);
  ctx.lineTo(135, 155);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 110, 30, 0, Math.PI);
  ctx.stroke();
}
function drawDonald_step5(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 310, 85, 70, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDonald_step6(ctx) {
  // Left arm/wing
  ctx.beginPath();
  ctx.moveTo(130, 310);
  ctx.lineTo(80, 340);
  ctx.stroke();
  // Right arm/wing
  ctx.beginPath();
  ctx.moveTo(270, 310);
  ctx.lineTo(320, 340);
  ctx.stroke();
}
function drawDonald_step7(ctx) {
  // Left leg
  ctx.beginPath();
  ctx.moveTo(170, 370);
  ctx.lineTo(165, 410);
  ctx.stroke();
  // Right leg
  ctx.beginPath();
  ctx.moveTo(230, 370);
  ctx.lineTo(235, 410);
  ctx.stroke();
}

// HULK
function drawHulk_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 130, 65, 0, Math.PI * 2);
  ctx.stroke();
}
function drawHulk_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(155, 110);
  ctx.lineTo(130, 90);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(245, 110);
  ctx.lineTo(270, 90);
  ctx.stroke();
}
function drawHulk_step3(ctx) {
  ctx.beginPath();
  ctx.arc(165, 120, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(235, 120, 10, 0, Math.PI * 2);
  ctx.stroke();
}
function drawHulk_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(180, 155);
  ctx.lineTo(220, 155);
  ctx.stroke();
}
function drawHulk_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(170, 195);
  ctx.lineTo(230, 195);
  ctx.lineTo(240, 220);
  ctx.lineTo(160, 220);
  ctx.closePath();
  ctx.stroke();
}
function drawHulk_step6(ctx) {
  // Left shoulder - thick trapezoid
  ctx.beginPath();
  ctx.moveTo(140, 220);
  ctx.lineTo(90, 245);
  ctx.lineTo(100, 290);
  ctx.lineTo(160, 260);
  ctx.closePath();
  ctx.stroke();
  // Right shoulder - thick trapezoid
  ctx.beginPath();
  ctx.moveTo(260, 220);
  ctx.lineTo(310, 245);
  ctx.lineTo(300, 290);
  ctx.lineTo(240, 260);
  ctx.closePath();
  ctx.stroke();
}
function drawHulk_step7(ctx) {
  // Left arm - thick muscular arm extending down
  ctx.beginPath();
  ctx.moveTo(90, 270);
  ctx.lineTo(50, 340);
  ctx.lineTo(75, 350);
  ctx.lineTo(115, 280);
  ctx.closePath();
  ctx.stroke();
  // Left bicep bump
  ctx.beginPath();
  ctx.arc(80, 290, 12, 0, Math.PI * 2);
  ctx.stroke();
  // Right arm - thick muscular arm extending down
  ctx.beginPath();
  ctx.moveTo(310, 270);
  ctx.lineTo(350, 340);
  ctx.lineTo(325, 350);
  ctx.lineTo(285, 280);
  ctx.closePath();
  ctx.stroke();
  // Right bicep bump
  ctx.beginPath();
  ctx.arc(320, 290, 12, 0, Math.PI * 2);
  ctx.stroke();
}
function drawHulk_step8(ctx) {
  ctx.beginPath();
  ctx.moveTo(180, 300);
  ctx.lineTo(220, 300);
  ctx.lineTo(225, 340);
  ctx.lineTo(175, 340);
  ctx.closePath();
  ctx.stroke();
}

// ═══════════════════════════════════════════════════════════════════
// DRAWING FUNCTIONS - FLOWERS & PLANTS
// ═══════════════════════════════════════════════════════════════════

// SUNFLOWER
function drawSunflower_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 180, 35, 0, Math.PI * 2);
  ctx.stroke();
}
function drawSunflower_step2(ctx) {
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = 200 + Math.cos(angle) * 90;
    const y = 180 + Math.sin(angle) * 90;
    ctx.beginPath();
    ctx.ellipse(x, y, 28, 45, angle, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawSunflower_step3(ctx) {
  ctx.beginPath();
  ctx.arc(200, 180, 25, 0, Math.PI * 2);
  ctx.stroke();
}
function drawSunflower_step4(ctx) {
  for (let i = 0; i < 20; i++) {
    const angle = (i * Math.PI * 2) / 20;
    const x = 200 + Math.cos(angle) * 15;
    const y = 180 + Math.sin(angle) * 15;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawSunflower_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 210);
  ctx.quadraticCurveTo(205, 280, 200, 340);
  ctx.stroke();
}
function drawSunflower_step6(ctx) {
  ctx.beginPath();
  ctx.ellipse(140, 280, 35, 25, -0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(260, 280, 35, 25, 0.4, 0, Math.PI * 2);
  ctx.stroke();
}

// ROSE
function drawRose_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 170, 12, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRose_step2(ctx) {
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3;
    const x = 200 + Math.cos(angle) * 35;
    const y = 170 + Math.sin(angle) * 35;
    ctx.beginPath();
    ctx.ellipse(x, y, 22, 30, angle + Math.PI / 2, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawRose_step3(ctx) {
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5 + Math.PI / 5;
    const x = 200 + Math.cos(angle) * 60;
    const y = 170 + Math.sin(angle) * 60;
    ctx.beginPath();
    ctx.ellipse(x, y, 24, 35, angle + Math.PI / 2, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawRose_step4(ctx) {
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6;
    const x = 200 + Math.cos(angle) * 85;
    const y = 170 + Math.sin(angle) * 85;
    ctx.beginPath();
    ctx.ellipse(x, y, 26, 40, angle + Math.PI / 2, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawRose_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 195);
  ctx.quadraticCurveTo(205, 270, 200, 330);
  ctx.stroke();
}
function drawRose_step6(ctx) {
  ctx.beginPath();
  ctx.ellipse(160, 250, 30, 20, -0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(240, 250, 30, 20, 0.4, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRose_step7(ctx) {
  ctx.beginPath();
  ctx.moveTo(195, 210);
  ctx.lineTo(185, 230);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(205, 220);
  ctx.lineTo(215, 240);
  ctx.stroke();
}

// TULIP
function drawTulip_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 80);
  ctx.quadraticCurveTo(175, 150, 180, 180);
  ctx.stroke();
}
function drawTulip_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 80);
  ctx.quadraticCurveTo(225, 150, 220, 180);
  ctx.stroke();
}
function drawTulip_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 90);
  ctx.quadraticCurveTo(190, 140, 190, 175);
  ctx.stroke();
}
function drawTulip_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 90);
  ctx.quadraticCurveTo(210, 140, 210, 175);
  ctx.stroke();
}
function drawTulip_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 175);
  ctx.lineTo(200, 330);
  ctx.stroke();
}
function drawTulip_step6(ctx) {
  ctx.beginPath();
  ctx.ellipse(150, 260, 25, 35, -0.3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(250, 260, 25, 35, 0.3, 0, Math.PI * 2);
  ctx.stroke();
}

// TREE
function drawTree_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(185, 250);
  ctx.lineTo(185, 340);
  ctx.lineTo(215, 340);
  ctx.lineTo(215, 250);
  ctx.closePath();
  ctx.stroke();
}
function drawTree_step2(ctx) {
  ctx.beginPath();
  ctx.arc(200, 140, 110, 0, Math.PI * 2);
  ctx.stroke();
}
function drawTree_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 80);
  ctx.lineTo(200, 210);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(120, 140);
  ctx.lineTo(280, 140);
  ctx.stroke();
}
function drawTree_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(150, 100);
  ctx.quadraticCurveTo(170, 80, 190, 95);
  ctx.stroke();
}
function drawTree_step5(ctx) {
  const seed = 42;
  const pseudoRandom = i => {
    const x = Math.sin(i + seed) * 10000;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 25; i++) {
    const x = 100 + pseudoRandom(i) * 200;
    const y = 50 + pseudoRandom(i + 25) * 180;
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawTree_step6(ctx) {
  ctx.beginPath();
  ctx.moveTo(150, 345);
  ctx.quadraticCurveTo(175, 355, 200, 345);
  ctx.quadraticCurveTo(225, 355, 250, 345);
  ctx.stroke();
}

// ═══════════════════════════════════════════════════════════════════
// DRAWING FUNCTIONS - VEHICLES
// ═══════════════════════════════════════════════════════════════════

// CAR
function drawCar_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(80, 200);
  ctx.lineTo(320, 200);
  ctx.lineTo(320, 240);
  ctx.lineTo(80, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawCar_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(120, 160);
  ctx.lineTo(280, 160);
  ctx.lineTo(290, 200);
  ctx.lineTo(110, 200);
  ctx.closePath();
  ctx.stroke();
}
function drawCar_step3(ctx) {
  ctx.beginPath();
  ctx.arc(130, 250, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(270, 250, 22, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCar_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(140, 170);
  ctx.lineTo(140, 195);
  ctx.lineTo(170, 195);
  ctx.lineTo(170, 170);
  ctx.closePath();
  ctx.stroke();
}
function drawCar_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(230, 170);
  ctx.lineTo(230, 195);
  ctx.lineTo(260, 195);
  ctx.lineTo(260, 170);
  ctx.closePath();
  ctx.stroke();
}
function drawCar_step6(ctx) {
  ctx.beginPath();
  ctx.arc(95, 195, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(305, 195, 8, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCar_step7(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 240);
  ctx.stroke();
}
function drawCar_step8(ctx) {
  ctx.beginPath();
  ctx.moveTo(80, 245);
  ctx.lineTo(320, 245);
  ctx.stroke();
}

// AIRPLANE
function drawAirplane_step1(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 200, 70, 45, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawAirplane_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(100, 175);
  ctx.lineTo(300, 175);
  ctx.lineTo(300, 225);
  ctx.lineTo(100, 225);
  ctx.closePath();
  ctx.stroke();
}
function drawAirplane_step3(ctx) {
  // Horizontal tail stabilizer
  ctx.beginPath();
  ctx.moveTo(265, 205);
  ctx.lineTo(330, 200);
  ctx.lineTo(335, 210);
  ctx.lineTo(270, 215);
  ctx.closePath();
  ctx.stroke();
}
function drawAirplane_step4(ctx) {
  // Vertical tail fin (rudder)
  ctx.beginPath();
  ctx.moveTo(310, 210);
  ctx.lineTo(320, 180);
  ctx.lineTo(330, 210);
  ctx.closePath();
  ctx.stroke();
}
function drawAirplane_step5(ctx) {
  ctx.beginPath();
  ctx.arc(235, 185, 15, 0, Math.PI * 2);
  ctx.stroke();
}
function drawAirplane_step6(ctx) {
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(160 + i * 35, 195, 5, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawAirplane_step7(ctx) {
  ctx.beginPath();
  ctx.arc(120, 245, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 250, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(280, 245, 10, 0, Math.PI * 2);
  ctx.stroke();
}

// ROCKET
function drawRocket_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(170, 100);
  ctx.lineTo(170, 250);
  ctx.lineTo(230, 250);
  ctx.lineTo(230, 100);
  ctx.closePath();
  ctx.stroke();
}
function drawRocket_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(170, 100);
  ctx.lineTo(200, 50);
  ctx.lineTo(230, 100);
  ctx.closePath();
  ctx.stroke();
}
function drawRocket_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(170, 220);
  ctx.lineTo(145, 270);
  ctx.lineTo(170, 245);
  ctx.closePath();
  ctx.stroke();
}
function drawRocket_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(230, 220);
  ctx.lineTo(255, 270);
  ctx.lineTo(230, 245);
  ctx.closePath();
  ctx.stroke();
}
function drawRocket_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 250);
  ctx.lineTo(190, 290);
  ctx.lineTo(210, 290);
  ctx.closePath();
  ctx.stroke();
}
function drawRocket_step6(ctx) {
  ctx.beginPath();
  ctx.arc(200, 160, 15, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRocket_step7(ctx) {
  ctx.beginPath();
  ctx.moveTo(185, 265);
  ctx.quadraticCurveTo(180, 310, 190, 340);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(215, 265);
  ctx.quadraticCurveTo(220, 310, 210, 340);
  ctx.stroke();
}

// BOAT
function drawBoat_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(100, 240);
  ctx.lineTo(150, 200);
  ctx.lineTo(250, 200);
  ctx.lineTo(300, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawBoat_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(140, 200);
  ctx.lineTo(140, 240);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(260, 200);
  ctx.lineTo(260, 240);
  ctx.stroke();
}
function drawBoat_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 100);
  ctx.stroke();
}
function drawBoat_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.lineTo(280, 190);
  ctx.lineTo(200, 150);
  ctx.closePath();
  ctx.stroke();
}
function drawBoat_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 120);
  ctx.lineTo(140, 180);
  ctx.lineTo(200, 140);
  ctx.closePath();
  ctx.stroke();
}
function drawBoat_step6(ctx) {
  ctx.beginPath();
  ctx.moveTo(170, 190);
  ctx.lineTo(170, 215);
  ctx.lineTo(230, 215);
  ctx.lineTo(230, 190);
  ctx.closePath();
  ctx.stroke();
}
function drawBoat_step7(ctx) {
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(80 + i * 50, 250 + Math.sin(i) * 8);
    ctx.quadraticCurveTo(105 + i * 50, 265, 130 + i * 50, 250 + Math.sin(i + 1) * 8);
    ctx.stroke();
  }
}

// ═══════════════════════════════════════════════════════════════════
// DRAWING FUNCTIONS - FOOD
// ═══════════════════════════════════════════════════════════════════

// ICE CREAM
function drawIceCream_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 240);
  ctx.lineTo(160, 330);
  ctx.lineTo(240, 330);
  ctx.closePath();
  ctx.stroke();
}
function drawIceCream_step2(ctx) {
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(160 + i * 13, 330);
    ctx.lineTo(175 + i * 13, 340);
    ctx.stroke();
  }
}
function drawIceCream_step3(ctx) {
  ctx.beginPath();
  ctx.arc(200, 210, 40, 0, Math.PI * 2);
  ctx.stroke();
}
function drawIceCream_step4(ctx) {
  ctx.beginPath();
  ctx.arc(200, 165, 40, 0, Math.PI * 2);
  ctx.stroke();
}
function drawIceCream_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 120, 40, 0, Math.PI * 2);
  ctx.stroke();
}
function drawIceCream_step6(ctx) {
  ctx.beginPath();
  ctx.arc(200, 210, 35, 0, Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 165, 35, 0, Math.PI);
  ctx.stroke();
}
function drawIceCream_step7(ctx) {
  ctx.beginPath();
  ctx.arc(200, 80, 10, 0, Math.PI * 2);
  ctx.stroke();
}

// PIZZA
function drawPizza_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 100, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPizza_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 300);
  ctx.stroke();
}
function drawPizza_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(280, 260);
  ctx.stroke();
}
function drawPizza_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(120, 260);
  ctx.stroke();
}
function drawPizza_step5(ctx) {
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = 200 + Math.cos(angle) * 70;
    const y = 200 + Math.sin(angle) * 70;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawPizza_step6(ctx) {
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12;
    const x = 200 + Math.cos(angle) * 40;
    const y = 200 + Math.sin(angle) * 40;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawPizza_step7(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 105, 0, Math.PI * 2);
  ctx.stroke();
}

// APPLE
function drawApple_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 75, 0, Math.PI * 2);
  ctx.stroke();
}
function drawApple_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 120);
  ctx.quadraticCurveTo(185, 115, 185, 130);
  ctx.stroke();
}
function drawApple_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 125);
  ctx.lineTo(200, 95);
  ctx.stroke();
}
function drawApple_step4(ctx) {
  ctx.beginPath();
  ctx.ellipse(215, 90, 18, 12, 0.3, 0, Math.PI * 2);
  ctx.stroke();
}
function drawApple_step5(ctx) {
  ctx.beginPath();
  ctx.arc(235, 160, 25, 0, Math.PI * 2);
  ctx.stroke();
}
function drawApple_step6(ctx) {
  ctx.beginPath();
  ctx.arc(200, 275, 12, 0, Math.PI * 2);
  ctx.stroke();
}

// CUPCAKE
function drawCupcake_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(140, 240);
  ctx.lineTo(180, 300);
  ctx.lineTo(220, 300);
  ctx.lineTo(260, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawCupcake_step2(ctx) {
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(140 + i * 30, 250);
    ctx.lineTo(140 + i * 30, 285);
    ctx.stroke();
  }
}
function drawCupcake_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(160, 240);
  ctx.quadraticCurveTo(170, 180, 200, 140);
  ctx.quadraticCurveTo(230, 180, 240, 240);
  ctx.stroke();
}
function drawCupcake_step4(ctx) {
  ctx.beginPath();
  ctx.arc(200, 180, 25, 0, Math.PI);
  ctx.stroke();
}
function drawCupcake_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(180, 155);
  ctx.quadraticCurveTo(190, 125, 200, 140);
  ctx.quadraticCurveTo(210, 125, 220, 155);
  ctx.stroke();
}
function drawCupcake_step6(ctx) {
  ctx.beginPath();
  ctx.arc(200, 120, 8, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCupcake_step7(ctx) {
  const sprinklePositions = [160, 175, 190, 205, 220, 235, 250];
  for (let i = 0; i < sprinklePositions.length; i++) {
    ctx.beginPath();
    ctx.arc(sprinklePositions[i], 140 + (i % 3) * 5, 2, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// ═══════════════════════════════════════════════════════════════════
// DRAWING FUNCTIONS - FANTASY
// ═══════════════════════════════════════════════════════════════════

// DRAGON
function drawDragon_step1(ctx) {
  ctx.beginPath();
  ctx.arc(150, 180, 60, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDragon_step2(ctx) {
  ctx.beginPath();
  ctx.ellipse(210, 160, 40, 35, 0.3, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDragon_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(230, 130);
  ctx.lineTo(250, 80);
  ctx.lineTo(240, 140);
  ctx.closePath();
  ctx.stroke();
}
function drawDragon_step4(ctx) {
  for (let i = 0; i < 5; i++) {
    const x = 150 + i * 25;
    const y = 110 - i * 15;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 10, y - 20);
    ctx.lineTo(x + 10, y - 20);
    ctx.closePath();
    ctx.stroke();
  }
}
function drawDragon_step5(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 240, 80, 60, 0.2, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDragon_step6(ctx) {
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(60, 150);
  ctx.lineTo(80, 220);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(300, 200);
  ctx.lineTo(340, 150);
  ctx.lineTo(320, 220);
  ctx.closePath();
  ctx.stroke();
}
function drawDragon_step7(ctx) {
  for (let i = 0; i < 4; i++) {
    const x = 140 + i * 50;
    ctx.beginPath();
    ctx.moveTo(x, 290);
    ctx.lineTo(x - 5, 340);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, 290);
    ctx.lineTo(x + 5, 340);
    ctx.stroke();
  }
}
function drawDragon_step8(ctx) {
  ctx.beginPath();
  ctx.moveTo(320, 240);
  ctx.quadraticCurveTo(360, 200, 380, 150);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(330, 220);
  ctx.lineTo(355, 170);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(340, 200);
  ctx.lineTo(365, 150);
  ctx.stroke();
}

// CASTLE
function drawCastle_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(120, 200);
  ctx.lineTo(280, 200);
  ctx.lineTo(280, 280);
  ctx.lineTo(120, 280);
  ctx.closePath();
  ctx.stroke();
}
function drawCastle_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(100, 160);
  ctx.lineTo(100, 290);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(300, 160);
  ctx.lineTo(300, 290);
  ctx.stroke();
}
function drawCastle_step3(ctx) {
  for (let i = 0; i < 6; i++) {
    const x = 120 + i * 30;
    ctx.beginPath();
    ctx.moveTo(x, 195);
    ctx.lineTo(x + 12, 195);
    ctx.lineTo(x + 12, 185);
    ctx.lineTo(x + 24, 185);
    ctx.stroke();
  }
}
function drawCastle_step4(ctx) {
  ctx.beginPath();
  ctx.arc(200, 220, 30, 0, Math.PI);
  ctx.stroke();
}
function drawCastle_step5(ctx) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.rect(110 + i * 85, 220, 12, 15);
    ctx.stroke();
  }
}
function drawCastle_step6(ctx) {
  ctx.beginPath();
  ctx.moveTo(95, 160);
  ctx.lineTo(95, 110);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(85, 115);
  ctx.lineTo(105, 115);
  ctx.stroke();
}
function drawCastle_step7(ctx) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
      ctx.beginPath();
      ctx.moveTo(120 + i * 20, 200 + j * 20);
      ctx.lineTo(135 + i * 20, 215 + j * 20);
      ctx.stroke();
    }
  }
}

// Screen management
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Build category grid on home screen
function buildCategoryGrid() {
  const grid = document.getElementById('category-grid');
  CATEGORIES.forEach(cat => {
    const card = document.createElement('button');
    card.className = 'cat-card';
    card.innerHTML = `<i class="ti ${cat.icon}"></i><span>${cat.label}</span>`;
    card.onclick = () => selectCategory(cat.id);
    grid.appendChild(card);
  });
}

// Select a category and show subjects
function selectCategory(catId) {
  state.currentCat = catId;
  const cat = CATEGORIES.find(c => c.id === catId);
  document.getElementById('subjects-title').textContent = cat.label;

  const subjects = SUBJECTS.filter(s => s.category === catId);
  const grid = document.getElementById('subject-grid');
  grid.innerHTML = '';
  subjects.forEach(subject => {
    const card = document.createElement('button');
    card.className = 'subject-card';
    card.innerHTML = `<div class="subject-emoji">${subject.emoji}</div><div class="subject-name">${subject.label}</div>`;
    card.onclick = () => startSubject(subject.id);
    grid.appendChild(card);
  });

  showScreen('screen-subjects');
}

// Start drawing a subject
function startSubject(subjectId) {
  const subject = SUBJECTS.find(s => s.id === subjectId);
  state.currentSubject = subject;
  state.currentStep = 0;
  state.undoStack = [];
  state.redoStack = [];

  clearDraw();
  renderGuide();
  updateStepUI();
  showScreen('screen-drawing');
}

// Render the guide canvas
function renderGuide() {
  const guideCanvas = document.getElementById('canvas-guide');
  const guideCtx = guideCanvas.getContext('2d');
  guideCtx.clearRect(0, 0, 400, 400);
  guideCtx.lineCap = 'round';
  guideCtx.lineJoin = 'round';

  const { steps } = state.currentSubject;
  for (let i = 0; i <= state.currentStep; i++) {
    guideCtx.save();
    guideCtx.globalAlpha = i < state.currentStep ? 0.1 : 0.25;
    guideCtx.strokeStyle = '#2244BB';
    guideCtx.lineWidth = 2.5;
    steps[i].draw(guideCtx);
    guideCtx.restore();
  }
}

// Initialize drawing canvas with color and undo/redo support
function initDrawCanvas() {
  const canvas = document.getElementById('canvas-draw');
  const ctx = canvas.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = state.penSize;
  ctx.strokeStyle = state.penColor;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: ((src.clientX - rect.left) * 400) / rect.width,
      y: ((src.clientY - rect.top) * 400) / rect.height
    };
  }

  function saveSnapshot() {
    const imageData = ctx.getImageData(0, 0, 400, 400);
    state.undoStack.push(imageData);
    state.redoStack = [];
    if (state.undoStack.length > state.maxUndoDepth) {
      state.undoStack.shift();
    }
  }

  function applyStroke() {
    ctx.lineWidth = state.penSize;
    ctx.strokeStyle = state.eraserMode ? '#FFFFFF' : state.penColor;
  }

  canvas.addEventListener('mousedown', e => {
    state.isDrawing = true;
    const pos = getPos(e);
    state.lastX = pos.x;
    state.lastY = pos.y;
    applyStroke();
  });

  canvas.addEventListener('mousemove', e => {
    if (!state.isDrawing) {
      return;
    }
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    state.lastX = pos.x;
    state.lastY = pos.y;
  });

  canvas.addEventListener('mouseup', () => {
    if (state.isDrawing) {
      saveSnapshot();
      state.isDrawing = false;
    }
  });

  canvas.addEventListener('mouseleave', () => {
    if (state.isDrawing) {
      saveSnapshot();
      state.isDrawing = false;
    }
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    state.isDrawing = true;
    const pos = getPos(e);
    state.lastX = pos.x;
    state.lastY = pos.y;
    applyStroke();
  });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!state.isDrawing) {
      return;
    }
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    state.lastX = pos.x;
    state.lastY = pos.y;
  });

  canvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (state.isDrawing) {
      saveSnapshot();
      state.isDrawing = false;
    }
  });
}

// Update UI based on current step
function updateStepUI() {
  const step = state.currentSubject.steps[state.currentStep];
  document.getElementById('step-title').textContent = step.title;
  document.getElementById('step-desc').textContent = step.desc;
  document.getElementById('step-counter').textContent =
    `Step ${state.currentStep + 1} of ${state.currentSubject.steps.length}`;

  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  prevBtn.disabled = state.currentStep === 0;
  nextBtn.disabled = state.currentStep === state.currentSubject.steps.length - 1;

  document.getElementById('nav-step').textContent =
    `${state.currentStep + 1}/${state.currentSubject.steps.length}`;
}

// Navigation functions
function prevStep() {
  if (state.currentStep > 0) {
    state.currentStep--;
    renderGuide();
    updateStepUI();
  }
}

function nextStep() {
  const { steps } = state.currentSubject;
  if (state.currentStep < steps.length - 1) {
    state.currentStep++;
    renderGuide();
    updateStepUI();
  } else {
    document.getElementById('completion-msg').textContent =
      `You've completed "${state.currentSubject.label}"!`;
    showScreen('screen-complete');
  }
}

function clearDraw() {
  const canvas = document.getElementById('canvas-draw');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 400, 400);
  state.undoStack = [];
  state.redoStack = [];
}

function undo() {
  const canvas = document.getElementById('canvas-draw');
  const ctx = canvas.getContext('2d');
  if (state.undoStack.length > 0) {
    const current = ctx.getImageData(0, 0, 400, 400);
    state.redoStack.push(current);
    const previous = state.undoStack.pop();
    ctx.putImageData(previous, 0, 0);
  }
}

function redo() {
  const canvas = document.getElementById('canvas-draw');
  const ctx = canvas.getContext('2d');
  if (state.redoStack.length > 0) {
    const current = ctx.getImageData(0, 0, 400, 400);
    state.undoStack.push(current);
    const next = state.redoStack.pop();
    ctx.putImageData(next, 0, 0);
  }
}

function replaySubject() {
  state.currentStep = 0;
  clearDraw();
  renderGuide();
  updateStepUI();
  showScreen('screen-drawing');
}

// Color and brush control functions
function setColor(color) {
  state.penColor = color;
  state.eraserMode = false;
  document.querySelectorAll('.color-swatch').forEach((btn, idx) => {
    const colors = [
      '#1A1A1A',
      '#555555',
      '#FF0000',
      '#FF8C00',
      '#FFFF00',
      '#00CC00',
      '#00CCFF',
      '#0000FF',
      '#9900FF',
      '#FF1493'
    ];
    btn.classList.toggle('active', colors[idx] === color);
  });
  updateEraserButton();
}

function setBrushSize(size) {
  state.penSize = size;
  document.querySelectorAll('.brush-size-btn').forEach((btn, idx) => {
    const sizes = [2, 5, 10];
    btn.classList.toggle('active', sizes[idx] === size);
  });
}

function toggleEraser() {
  state.eraserMode = !state.eraserMode;
  updateEraserButton();
}

function updateEraserButton() {
  const btn = document.getElementById('eraser-btn');
  if (state.eraserMode) {
    btn.textContent = '🧹 Eraser';
    btn.classList.add('active');
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  } else {
    btn.textContent = '✏️ Pen';
    btn.classList.remove('active');
  }
}

function showPreviewModal() {
  const modal = document.getElementById('preview-modal');
  const previewCanvas = document.getElementById('preview-canvas');
  const previewCtx = previewCanvas.getContext('2d');

  previewCtx.fillStyle = '#FFFFFF';
  previewCtx.fillRect(0, 0, 400, 400);

  const { steps } = state.currentSubject;
  for (let i = 0; i < steps.length; i++) {
    previewCtx.save();
    previewCtx.globalAlpha = 0.7;
    previewCtx.strokeStyle = '#2244BB';
    previewCtx.lineWidth = 2;
    previewCtx.lineCap = 'round';
    previewCtx.lineJoin = 'round';
    steps[i].draw(previewCtx);
    previewCtx.restore();
  }

  modal.classList.add('active');
}

function closePreviewModal() {
  document.getElementById('preview-modal').classList.remove('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  buildCategoryGrid();
  initDrawCanvas();
  setBrushSize(5);
  setColor('#1A1A1A');

  // Navigation and screen listeners
  document
    .getElementById('back-to-cats')
    .addEventListener('click', () => showScreen('screen-home'));

  // Color swatches
  const colorMap = {
    'color-black': '#1A1A1A',
    'color-gray': '#555555',
    'color-red': '#FF0000',
    'color-orange': '#FF8C00',
    'color-yellow': '#FFFF00',
    'color-green': '#00CC00',
    'color-sky-blue': '#00CCFF',
    'color-blue': '#0000FF',
    'color-purple': '#9900FF',
    'color-pink': '#FF1493'
  };

  Object.entries(colorMap).forEach(([id, color]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => setColor(color));
    }
  });

  // Brush size buttons
  document.getElementById('brush-size-small').addEventListener('click', () => setBrushSize(2));
  document.getElementById('brush-size-medium').addEventListener('click', () => setBrushSize(5));
  document.getElementById('brush-size-large').addEventListener('click', () => setBrushSize(10));

  // Eraser button
  document.getElementById('eraser-btn').addEventListener('click', toggleEraser);

  // Drawing control buttons
  document.getElementById('btn-prev').addEventListener('click', prevStep);
  document.getElementById('btn-undo').addEventListener('click', undo);
  document.getElementById('btn-clear').addEventListener('click', clearDraw);
  document.getElementById('btn-redo').addEventListener('click', redo);
  document.getElementById('btn-next').addEventListener('click', nextStep);

  // Preview modal
  document.getElementById('see-final-btn').addEventListener('click', showPreviewModal);
  document.getElementById('close-preview-btn').addEventListener('click', closePreviewModal);

  // Completion screen buttons
  document.getElementById('btn-replay').addEventListener('click', replaySubject);
  document
    .getElementById('btn-next-subject')
    .addEventListener('click', () => showScreen('screen-subjects'));
  document.getElementById('btn-home').addEventListener('click', () => showScreen('screen-home'));
});

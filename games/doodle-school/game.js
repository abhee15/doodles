// State management
const state = {
  currentCat: null,
  currentSubject: null,
  currentStep: 0,
  isDrawing: false,
  lastX: 0,
  lastY: 0
};

// Categories
const CATEGORIES = [
  { id: 'animals', label: 'Animals', icon: 'ti-paw', color: '#FF6B9D' },
  { id: 'flowers', label: 'Flowers & Plants', icon: 'ti-flower', color: '#4ECDC4' },
  { id: 'vehicles', label: 'Vehicles', icon: 'ti-car', color: '#FFB347' },
  { id: 'food', label: 'Food', icon: 'ti-ice-cream', color: '#FF8C69' },
  { id: 'characters', label: 'Characters', icon: 'ti-mood-happy', color: '#A78BFA' }
];

// All subjects with steps
const SUBJECTS = [
  // Animals
  {
    id: 'cat',
    label: 'Cat',
    category: 'animals',
    emoji: '🐱',
    steps: [
      { title: 'Draw the head', desc: 'Draw a big round circle in the middle.', draw: drawCat_step1 },
      { title: 'Add ears', desc: 'Draw two pointy triangles on top.', draw: drawCat_step2 },
      { title: 'Draw face guide', desc: 'Two circles for eyes guide.', draw: drawCat_step3 },
      { title: 'Add eyes & nose', desc: 'Small circles for eyes, triangle for nose.', draw: drawCat_step4 },
      { title: 'Whiskers', desc: 'Three lines on each side.', draw: drawCat_step5 },
      { title: 'Mouth', desc: 'Curved line for the smile.', draw: drawCat_step6 }
    ]
  },
  {
    id: 'dog',
    label: 'Dog',
    category: 'animals',
    emoji: '🐶',
    steps: [
      { title: 'Head', desc: 'Draw a large circle.', draw: drawDog_step1 },
      { title: 'Ears', desc: 'Two floppy oval ears on sides.', draw: drawDog_step2 },
      { title: 'Snout', desc: 'A protruding rectangle for the snout.', draw: drawDog_step3 },
      { title: 'Eyes & nose', desc: 'Two circles for eyes, circle for nose.', draw: drawDog_step4 },
      { title: 'Mouth', desc: 'Curved line with two dots below.', draw: drawDog_step5 },
      { title: 'Tongue', desc: 'Small curved shape hanging out.', draw: drawDog_step6 }
    ]
  },
  {
    id: 'bird',
    label: 'Bird',
    category: 'animals',
    emoji: '🐦',
    steps: [
      { title: 'Body', desc: 'Draw an oval in the center.', draw: drawBird_step1 },
      { title: 'Head', desc: 'Circle on top of the body.', draw: drawBird_step2 },
      { title: 'Beak', desc: 'Pointed triangle to the right.', draw: drawBird_step3 },
      { title: 'Eye', desc: 'Small circle on the head.', draw: drawBird_step4 },
      { title: 'Wings', desc: 'Two curved lines on the sides.', draw: drawBird_step5 },
      { title: 'Tail', desc: 'Flowing feather lines behind.', draw: drawBird_step6 }
    ]
  },
  {
    id: 'fish',
    label: 'Fish',
    category: 'animals',
    emoji: '🐠',
    steps: [
      { title: 'Body', desc: 'Draw an oval body.', draw: drawFish_step1 },
      { title: 'Tail', desc: 'Triangle tail on the right.', draw: drawFish_step2 },
      { title: 'Eye', desc: 'Circle near the head.', draw: drawFish_step3 },
      { title: 'Mouth', desc: 'Small circle at the tip.', draw: drawFish_step4 },
      { title: 'Fins', desc: 'Two curved fins on top and bottom.', draw: drawFish_step5 },
      { title: 'Details', desc: 'Add some scale lines.', draw: drawFish_step6 }
    ]
  },
  {
    id: 'butterfly',
    label: 'Butterfly',
    category: 'animals',
    emoji: '🦋',
    steps: [
      { title: 'Body', desc: 'Draw a vertical line down the middle.', draw: drawButterfly_step1 },
      { title: 'Top wings', desc: 'Two large circles or ovals above.', draw: drawButterfly_step2 },
      { title: 'Bottom wings', desc: 'Two circles or ovals below.', draw: drawButterfly_step3 },
      { title: 'Wing details', desc: 'Add patterns to the wings.', draw: drawButterfly_step4 },
      { title: 'Antennae', desc: 'Two curved lines from the head.', draw: drawButterfly_step5 },
      { title: 'Final touches', desc: 'Add dots and color patterns.', draw: drawButterfly_step6 }
    ]
  },
  {
    id: 'rabbit',
    label: 'Rabbit',
    category: 'animals',
    emoji: '🐰',
    steps: [
      { title: 'Face', desc: 'Draw a circle for the head.', draw: drawRabbit_step1 },
      { title: 'Ears', desc: 'Two tall ovals on top of head.', draw: drawRabbit_step2 },
      { title: 'Inner ears', desc: 'Small ovals inside the ears.', draw: drawRabbit_step3 },
      { title: 'Eyes', desc: 'Two circles on the face.', draw: drawRabbit_step4 },
      { title: 'Nose & mouth', desc: 'Triangle nose and curved mouth line.', draw: drawRabbit_step5 },
      { title: 'Fur details', desc: 'Add fluff and whiskers.', draw: drawRabbit_step6 }
    ]
  },
  // Flowers
  {
    id: 'sunflower',
    label: 'Sunflower',
    category: 'flowers',
    emoji: '🌻',
    steps: [
      { title: 'Center', desc: 'Draw a circle in the middle.', draw: drawSunflower_step1 },
      { title: 'Petals', desc: 'Draw 8 petals around the center.', draw: drawSunflower_step2 },
      { title: 'Stem', desc: 'Long curved line going down.', draw: drawSunflower_step3 },
      { title: 'Leaves', desc: 'Two long leaves on the stem.', draw: drawSunflower_step4 },
      { title: 'Details', desc: 'Add petal and leaf textures.', draw: drawSunflower_step5 }
    ]
  },
  {
    id: 'rose',
    label: 'Rose',
    category: 'flowers',
    emoji: '🌹',
    steps: [
      { title: 'Center petal', desc: 'Draw a curved spiral for center.', draw: drawRose_step1 },
      { title: 'Petals layer 1', desc: 'Add curving petals around center.', draw: drawRose_step2 },
      { title: 'Petals layer 2', desc: 'More petals for fullness.', draw: drawRose_step3 },
      { title: 'Stem', desc: 'Draw a curved stem below.', draw: drawRose_step4 },
      { title: 'Leaves & thorns', desc: 'Add leaves and small thorns.', draw: drawRose_step5 }
    ]
  },
  {
    id: 'tulip',
    label: 'Tulip',
    category: 'flowers',
    emoji: '🌷',
    steps: [
      { title: 'Petals', desc: 'Draw three overlapping petals.', draw: drawTulip_step1 },
      { title: 'Inner petals', desc: 'Add two smaller petals inside.', draw: drawTulip_step2 },
      { title: 'Stem', desc: 'Long green stem below flower.', draw: drawTulip_step3 },
      { title: 'Leaves', desc: 'Two pointed leaves on the stem.', draw: drawTulip_step4 },
      { title: 'Details', desc: 'Add petal lines for texture.', draw: drawTulip_step5 }
    ]
  },
  {
    id: 'tree',
    label: 'Tree',
    category: 'flowers',
    emoji: '🌳',
    steps: [
      { title: 'Trunk', desc: 'Draw a vertical rectangle.', draw: drawTree_step1 },
      { title: 'Foliage', desc: 'Large circle or rounded top.', draw: drawTree_step2 },
      { title: 'Branch structure', desc: 'Add lines within the foliage.', draw: drawTree_step3 },
      { title: 'Details', desc: 'Add texture to the leaves.', draw: drawTree_step4 },
      { title: 'Ground', desc: 'Add some grass or ground detail.', draw: drawTree_step5 }
    ]
  },
  // Vehicles
  {
    id: 'car',
    label: 'Car',
    category: 'vehicles',
    emoji: '🚗',
    steps: [
      { title: 'Body', desc: 'Draw a rectangle for the car body.', draw: drawCar_step1 },
      { title: 'Top', desc: 'Add a smaller rectangle on top.', draw: drawCar_step2 },
      { title: 'Wheels', desc: 'Two circles at the bottom.', draw: drawCar_step3 },
      { title: 'Windows', desc: 'Draw two rectangles for windows.', draw: drawCar_step4 },
      { title: 'Lights & bumper', desc: 'Add rectangles for lights and bumper.', draw: drawCar_step5 }
    ]
  },
  {
    id: 'airplane',
    label: 'Airplane',
    category: 'vehicles',
    emoji: '✈️',
    steps: [
      { title: 'Fuselage', desc: 'Draw a long oval body.', draw: drawAirplane_step1 },
      { title: 'Wings', desc: 'Add large horizontal lines for wings.', draw: drawAirplane_step2 },
      { title: 'Tail', desc: 'Small triangle at the back.', draw: drawAirplane_step3 },
      { title: 'Cockpit', desc: 'Circle or oval on the nose.', draw: drawAirplane_step4 },
      { title: 'Details', desc: 'Add windows and engine details.', draw: drawAirplane_step5 }
    ]
  },
  {
    id: 'rocket',
    label: 'Rocket',
    category: 'vehicles',
    emoji: '🚀',
    steps: [
      { title: 'Body', desc: 'Draw a tall rectangle.', draw: drawRocket_step1 },
      { title: 'Nose', desc: 'Triangle on top for the nose.', draw: drawRocket_step2 },
      { title: 'Fins', desc: 'Three triangles at the bottom.', draw: drawRocket_step3 },
      { title: 'Window', desc: 'Circle near the top.', draw: drawRocket_step4 },
      { title: 'Flame', desc: 'Add fire/flame below the rocket.', draw: drawRocket_step5 }
    ]
  },
  {
    id: 'boat',
    label: 'Boat',
    category: 'vehicles',
    emoji: '⛵',
    steps: [
      { title: 'Hull', desc: 'Draw a curved boat shape.', draw: drawBoat_step1 },
      { title: 'Mast', desc: 'Vertical line in the middle.', draw: drawBoat_step2 },
      { title: 'Sail', desc: 'Triangle shape for the sail.', draw: drawBoat_step3 },
      { title: 'Water', desc: 'Wavy lines at the bottom.', draw: drawBoat_step4 },
      { title: 'Details', desc: 'Add window and rope details.', draw: drawBoat_step5 }
    ]
  },
  // Food
  {
    id: 'ice-cream',
    label: 'Ice Cream',
    category: 'food',
    emoji: '🍦',
    steps: [
      { title: 'Cone', desc: 'Draw a triangle for the cone.', draw: drawIceCream_step1 },
      { title: 'Ice cream scoop 1', desc: 'Circle on top of cone.', draw: drawIceCream_step2 },
      { title: 'Ice cream scoop 2', desc: 'Another circle on top.', draw: drawIceCream_step3 },
      { title: 'Ice cream scoop 3', desc: 'One more circle on top.', draw: drawIceCream_step4 },
      { title: 'Cherry & details', desc: 'Add cherry and cone texture.', draw: drawIceCream_step5 }
    ]
  },
  {
    id: 'pizza',
    label: 'Pizza',
    category: 'food',
    emoji: '🍕',
    steps: [
      { title: 'Pizza circle', desc: 'Draw a large circle.', draw: drawPizza_step1 },
      { title: 'Slice lines', desc: 'Add lines to divide into slices.', draw: drawPizza_step2 },
      { title: 'Cheese', desc: 'Add wavy lines for melted cheese.', draw: drawPizza_step3 },
      { title: 'Toppings', desc: 'Add circles for pepperoni.', draw: drawPizza_step4 },
      { title: 'Details', desc: 'Add basil and crust details.', draw: drawPizza_step5 }
    ]
  },
  {
    id: 'apple',
    label: 'Apple',
    category: 'food',
    emoji: '🍎',
    steps: [
      { title: 'Apple body', desc: 'Draw a round circle.', draw: drawApple_step1 },
      { title: 'Top indent', desc: 'Small curved indent at top.', draw: drawApple_step2 },
      { title: 'Stem', desc: 'Short line from the top.', draw: drawApple_step3 },
      { title: 'Leaf', desc: 'Oval leaf attached to stem.', draw: drawApple_step4 },
      { title: 'Details', desc: 'Add shine and texture.', draw: drawApple_step5 }
    ]
  },
  {
    id: 'cupcake',
    label: 'Cupcake',
    category: 'food',
    emoji: '🧁',
    steps: [
      { title: 'Cup wrapper', desc: 'Draw a trapezoid for wrapper.', draw: drawCupcake_step1 },
      { title: 'Frosting', desc: 'Curved line on top (like swirl).', draw: drawCupcake_step2 },
      { title: 'Frosting shape', desc: 'Complete the frosting swirl.', draw: drawCupcake_step3 },
      { title: 'Cherry', desc: 'Small circle on top.', draw: drawCupcake_step4 },
      { title: 'Details', desc: 'Add wrapper texture and shadows.', draw: drawCupcake_step5 }
    ]
  },
  // Characters
  {
    id: 'mickey-mouse',
    label: 'Mickey Mouse',
    category: 'characters',
    emoji: '🐭',
    steps: [
      { title: 'Face', desc: 'Large circle for the face.', draw: drawMickey_step1 },
      { title: 'Ears', desc: 'Two big circles on top.', draw: drawMickey_step2 },
      { title: 'Eyes', desc: 'Two large circles for eyes.', draw: drawMickey_step3 },
      { title: 'Nose & mouth', desc: 'Small circle nose and mouth line.', draw: drawMickey_step4 },
      { title: 'Body outline', desc: 'Add shoulders and body guide.', draw: drawMickey_step5 },
      { title: 'Details', desc: 'Add buttons and hand details.', draw: drawMickey_step6 }
    ]
  },
  {
    id: 'donald-duck',
    label: 'Donald Duck',
    category: 'characters',
    emoji: '🦆',
    steps: [
      { title: 'Head', desc: 'Large circle for head.', draw: drawDonald_step1 },
      { title: 'Beak', desc: 'Curved triangle for bill.', draw: drawDonald_step2 },
      { title: 'Eyes', desc: 'Two circles on the head.', draw: drawDonald_step3 },
      { title: 'Sailor hat', desc: 'Rectangle and circle for hat.', draw: drawDonald_step4 },
      { title: 'Body', desc: 'Add body and arms guide.', draw: drawDonald_step5 },
      { title: 'Details', desc: 'Add sailor outfit details.', draw: drawDonald_step6 }
    ]
  },
  {
    id: 'hulk',
    label: 'Hulk',
    category: 'characters',
    emoji: '💚',
    steps: [
      { title: 'Head', desc: 'Large circle for head.', draw: drawHulk_step1 },
      { title: 'Face details', desc: 'Eyes and angry expression.', draw: drawHulk_step2 },
      { title: 'Neck & shoulders', desc: 'Wide shoulders outline.', draw: drawHulk_step3 },
      { title: 'Muscular arms', desc: 'Draw large arm muscles.', draw: drawHulk_step4 },
      { title: 'Body', desc: 'Add chest and body outline.', draw: drawHulk_step5 },
      { title: 'Details', desc: 'Add torn pants and final details.', draw: drawHulk_step6 }
    ]
  },
  {
    id: 'pikachu',
    label: 'Pikachu',
    category: 'characters',
    emoji: '⚡',
    steps: [
      { title: 'Head', desc: 'Round circle for head.', draw: drawPikachu_step1 },
      { title: 'Ears', desc: 'Two pointed ears on top.', draw: drawPikachu_step2 },
      { title: 'Face', desc: 'Eyes, nose, and rosy cheeks.', draw: drawPikachu_step3 },
      { title: 'Body', desc: 'Oval shape for body.', draw: drawPikachu_step4 },
      { title: 'Tail', desc: 'Lightning bolt shaped tail.', draw: drawPikachu_step5 },
      { title: 'Details', desc: 'Add tail pattern and details.', draw: drawPikachu_step6 }
    ]
  }
];

// Drawing functions for each subject and step

// CAT
function drawCat_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 170, 90, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCat_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(130, 65);
  ctx.lineTo(100, 120);
  ctx.lineTo(165, 115);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(270, 65);
  ctx.lineTo(235, 115);
  ctx.lineTo(300, 120);
  ctx.closePath();
  ctx.stroke();
}
function drawCat_step3(ctx) {
  ctx.beginPath();
  ctx.arc(160, 160, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 160, 20, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCat_step4(ctx) {
  ctx.beginPath();
  ctx.arc(160, 160, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 160, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 190, 10, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCat_step5(ctx) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(110, 170 - i * 15);
    ctx.lineTo(60, 170 - i * 15);
    ctx.stroke();
  }
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(290, 170 - i * 15);
    ctx.lineTo(340, 170 - i * 15);
    ctx.stroke();
  }
}
function drawCat_step6(ctx) {
  ctx.beginPath();
  ctx.moveTo(175, 210);
  ctx.quadraticCurveTo(200, 220, 225, 210);
  ctx.stroke();
}

// DOG
function drawDog_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 180, 85, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDog_step2(ctx) {
  ctx.beginPath();
  ctx.ellipse(110, 100, 35, 60, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(290, 100, 35, 60, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDog_step3(ctx) {
  ctx.fillRect(170, 220, 60, 40);
}
function drawDog_step4(ctx) {
  ctx.beginPath();
  ctx.arc(170, 170, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 170, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 235, 12, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDog_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 255, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(185, 245);
  ctx.quadraticCurveTo(200, 260, 215, 245);
  ctx.stroke();
}
function drawDog_step6(ctx) {
  ctx.beginPath();
  ctx.arc(200, 270, 8, 0, Math.PI * 2);
  ctx.stroke();
}

// BIRD
function drawBird_step1(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 200, 70, 50, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawBird_step2(ctx) {
  ctx.beginPath();
  ctx.arc(200, 120, 50, 0, Math.PI * 2);
  ctx.stroke();
}
function drawBird_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(250, 120);
  ctx.lineTo(310, 100);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();
}
function drawBird_step4(ctx) {
  ctx.beginPath();
  ctx.arc(230, 110, 8, 0, Math.PI * 2);
  ctx.stroke();
}
function drawBird_step5(ctx) {
  ctx.beginPath();
  ctx.arc(150, 190, 60, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(250, 190, 60, 0, Math.PI * 2);
  ctx.stroke();
}
function drawBird_step6(ctx) {
  ctx.beginPath();
  ctx.moveTo(270, 200);
  ctx.lineTo(340, 180);
  ctx.lineTo(330, 220);
  ctx.closePath();
  ctx.stroke();
}

// FISH
function drawFish_step1(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 200, 80, 50, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawFish_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(280, 200);
  ctx.lineTo(330, 160);
  ctx.lineTo(330, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawFish_step3(ctx) {
  ctx.beginPath();
  ctx.arc(250, 190, 10, 0, Math.PI * 2);
  ctx.stroke();
}
function drawFish_step4(ctx) {
  ctx.beginPath();
  ctx.arc(320, 200, 5, 0, Math.PI * 2);
  ctx.stroke();
}
function drawFish_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 150);
  ctx.quadraticCurveTo(220, 120, 200, 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 250);
  ctx.quadraticCurveTo(220, 280, 200, 300);
  ctx.stroke();
}
function drawFish_step6(ctx) {
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(150 + i * 25, 185);
    ctx.lineTo(165 + i * 25, 215);
    ctx.stroke();
  }
}

// BUTTERFLY
function drawButterfly_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 80);
  ctx.lineTo(200, 320);
  ctx.stroke();
}
function drawButterfly_step2(ctx) {
  ctx.beginPath();
  ctx.ellipse(110, 150, 50, 70, -0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(290, 150, 50, 70, 0.4, 0, Math.PI * 2);
  ctx.stroke();
}
function drawButterfly_step3(ctx) {
  ctx.beginPath();
  ctx.ellipse(110, 270, 40, 60, -0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(290, 270, 40, 60, 0.4, 0, Math.PI * 2);
  ctx.stroke();
}
function drawButterfly_step4(ctx) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(110 - 20 + i * 20, 150 - 30 + i * 15, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawButterfly_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.quadraticCurveTo(170, 60, 150, 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.quadraticCurveTo(230, 60, 250, 40);
  ctx.stroke();
}
function drawButterfly_step6(ctx) {
  ctx.beginPath();
  ctx.arc(130, 250, 8, 0, Math.PI * 2);
  ctx.stroke();
}

// RABBIT
function drawRabbit_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 80, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step2(ctx) {
  ctx.beginPath();
  ctx.ellipse(160, 60, 25, 80, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(240, 60, 25, 80, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step3(ctx) {
  ctx.beginPath();
  ctx.ellipse(160, 60, 12, 50, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(240, 60, 12, 50, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step4(ctx) {
  ctx.beginPath();
  ctx.arc(160, 180, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 180, 15, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRabbit_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 220, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(180, 240);
  ctx.quadraticCurveTo(200, 250, 220, 240);
  ctx.stroke();
}
function drawRabbit_step6(ctx) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(110, 190 + i * 15);
    ctx.lineTo(60, 190 + i * 15);
    ctx.stroke();
  }
}

// SUNFLOWER
function drawSunflower_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 180, 30, 0, Math.PI * 2);
  ctx.stroke();
}
function drawSunflower_step2(ctx) {
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = 200 + Math.cos(angle) * 80;
    const y = 180 + Math.sin(angle) * 80;
    ctx.beginPath();
    ctx.ellipse(x, y, 25, 40, angle, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawSunflower_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 210);
  ctx.quadraticCurveTo(210, 280, 200, 340);
  ctx.stroke();
}
function drawSunflower_step4(ctx) {
  ctx.beginPath();
  ctx.ellipse(140, 260, 35, 20, -0.3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(260, 260, 35, 20, 0.3, 0, Math.PI * 2);
  ctx.stroke();
}
function drawSunflower_step5(ctx) {
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = 200 + Math.cos(angle) * 75;
    const y = 180 + Math.sin(angle) * 75;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * 10, y + Math.sin(angle) * 10);
    ctx.stroke();
  }
}

// ROSE
function drawRose_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 170, 15, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRose_step2(ctx) {
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    const x = 200 + Math.cos(angle) * 40;
    const y = 170 + Math.sin(angle) * 40;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawRose_step3(ctx) {
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6 + Math.PI / 6;
    const x = 200 + Math.cos(angle) * 65;
    const y = 170 + Math.sin(angle) * 65;
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawRose_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 190);
  ctx.quadraticCurveTo(210, 270, 200, 330);
  ctx.stroke();
}
function drawRose_step5(ctx) {
  ctx.beginPath();
  ctx.ellipse(160, 240, 25, 15, -0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(240, 240, 25, 15, 0.4, 0, Math.PI * 2);
  ctx.stroke();
}

// TULIP
function drawTulip_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 80);
  ctx.lineTo(160, 160);
  ctx.lineTo(240, 160);
  ctx.closePath();
  ctx.stroke();
}
function drawTulip_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(180, 130);
  ctx.lineTo(200, 90);
  ctx.lineTo(220, 130);
  ctx.closePath();
  ctx.stroke();
}
function drawTulip_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 160);
  ctx.lineTo(200, 280);
  ctx.stroke();
}
function drawTulip_step4(ctx) {
  ctx.beginPath();
  ctx.ellipse(150, 230, 20, 30, -0.3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(250, 230, 20, 30, 0.3, 0, Math.PI * 2);
  ctx.stroke();
}
function drawTulip_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(170, 140);
  ctx.lineTo(160, 150);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(230, 140);
  ctx.lineTo(240, 150);
  ctx.stroke();
}

// TREE
function drawTree_step1(ctx) {
  ctx.fillRect(180, 240, 40, 100);
}
function drawTree_step2(ctx) {
  ctx.beginPath();
  ctx.arc(200, 150, 100, 0, Math.PI * 2);
  ctx.stroke();
}
function drawTree_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.lineTo(200, 200);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(250, 150);
  ctx.stroke();
}
function drawTree_step4(ctx) {
  for (let i = 0; i < 20; i++) {
    const x = 100 + Math.random() * 200;
    const y = 80 + Math.random() * 140;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawTree_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(100, 340);
  ctx.quadraticCurveTo(150, 350, 200, 340);
  ctx.quadraticCurveTo(250, 350, 300, 340);
  ctx.stroke();
}

// CAR
function drawCar_step1(ctx) {
  ctx.fillRect(100, 200, 200, 70);
}
function drawCar_step2(ctx) {
  ctx.fillRect(140, 140, 120, 60);
}
function drawCar_step3(ctx) {
  ctx.beginPath();
  ctx.arc(150, 270, 25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(250, 270, 25, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCar_step4(ctx) {
  ctx.fillRect(160, 160, 40, 30);
  ctx.fillRect(220, 160, 40, 30);
}
function drawCar_step5(ctx) {
  ctx.fillRect(110, 220, 20, 15);
  ctx.fillRect(270, 220, 20, 15);
}

// AIRPLANE
function drawAirplane_step1(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 200, 60, 40, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawAirplane_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(300, 200);
  ctx.stroke();
}
function drawAirplane_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(260, 200);
  ctx.lineTo(280, 160);
  ctx.lineTo(280, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawAirplane_step4(ctx) {
  ctx.beginPath();
  ctx.arc(230, 190, 12, 0, Math.PI * 2);
  ctx.stroke();
}
function drawAirplane_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 180, 5, 0, Math.PI * 2);
  ctx.stroke();
}

// ROCKET
function drawRocket_step1(ctx) {
  ctx.fillRect(170, 100, 60, 150);
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
  ctx.moveTo(170, 240);
  ctx.lineTo(150, 280);
  ctx.lineTo(170, 260);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(230, 240);
  ctx.lineTo(250, 280);
  ctx.lineTo(230, 260);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 240);
  ctx.lineTo(200, 280);
  ctx.stroke();
}
function drawRocket_step4(ctx) {
  ctx.beginPath();
  ctx.arc(200, 150, 12, 0, Math.PI * 2);
  ctx.stroke();
}
function drawRocket_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(185, 260);
  ctx.quadraticCurveTo(180, 300, 190, 340);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(215, 260);
  ctx.quadraticCurveTo(220, 300, 210, 340);
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
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 100);
  ctx.stroke();
}
function drawBoat_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.lineTo(280, 200);
  ctx.lineTo(200, 160);
  ctx.closePath();
  ctx.stroke();
}
function drawBoat_step4(ctx) {
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(80 + i * 50, 260 + Math.sin(i) * 10);
    ctx.quadraticCurveTo(95 + i * 50, 275, 110 + i * 50, 260 + Math.sin(i + 1) * 10);
    ctx.stroke();
  }
}
function drawBoat_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 220, 8, 0, Math.PI * 2);
  ctx.stroke();
}

// ICE CREAM
function drawIceCream_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 240);
  ctx.lineTo(160, 320);
  ctx.lineTo(240, 320);
  ctx.closePath();
  ctx.stroke();
}
function drawIceCream_step2(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 45, 0, Math.PI * 2);
  ctx.stroke();
}
function drawIceCream_step3(ctx) {
  ctx.beginPath();
  ctx.arc(200, 150, 45, 0, Math.PI * 2);
  ctx.stroke();
}
function drawIceCream_step4(ctx) {
  ctx.beginPath();
  ctx.arc(200, 100, 45, 0, Math.PI * 2);
  ctx.stroke();
}
function drawIceCream_step5(ctx) {
  ctx.beginPath();
  ctx.arc(200, 60, 12, 0, Math.PI * 2);
  ctx.stroke();
}

// PIZZA
function drawPizza_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 90, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPizza_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 290);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(290, 200);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(130, 270);
  ctx.stroke();
}
function drawPizza_step3(ctx) {
  ctx.beginPath();
  ctx.arc(200, 210, 20, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPizza_step4(ctx) {
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = 200 + Math.cos(angle) * 60;
    const y = 200 + Math.sin(angle) * 60;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.stroke();
  }
}
function drawPizza_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 290);
  ctx.lineTo(200, 310);
  ctx.stroke();
}

// APPLE
function drawApple_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 70, 0, Math.PI * 2);
  ctx.stroke();
}
function drawApple_step2(ctx) {
  ctx.beginPath();
  ctx.arc(200, 130, 20, 0, Math.PI * 2);
  ctx.stroke();
}
function drawApple_step3(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 130);
  ctx.lineTo(200, 100);
  ctx.stroke();
}
function drawApple_step4(ctx) {
  ctx.beginPath();
  ctx.ellipse(220, 90, 15, 10, 0.3, 0, Math.PI * 2);
  ctx.stroke();
}
function drawApple_step5(ctx) {
  ctx.beginPath();
  ctx.arc(230, 160, 20, 0, Math.PI * 2);
  ctx.stroke();
}

// CUPCAKE
function drawCupcake_step1(ctx) {
  ctx.beginPath();
  ctx.moveTo(150, 240);
  ctx.lineTo(180, 300);
  ctx.lineTo(220, 300);
  ctx.lineTo(250, 240);
  ctx.closePath();
  ctx.stroke();
}
function drawCupcake_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(160, 240);
  ctx.quadraticCurveTo(170, 180, 200, 140);
  ctx.quadraticCurveTo(230, 180, 240, 240);
  ctx.stroke();
}
function drawCupcake_step3(ctx) {
  ctx.beginPath();
  ctx.arc(200, 160, 30, 0, Math.PI);
  ctx.stroke();
}
function drawCupcake_step4(ctx) {
  ctx.beginPath();
  ctx.arc(200, 130, 10, 0, Math.PI * 2);
  ctx.stroke();
}
function drawCupcake_step5(ctx) {
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(165 + i * 18, 280);
    ctx.lineTo(165 + i * 18, 295);
    ctx.stroke();
  }
}

// MICKEY MOUSE
function drawMickey_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 200, 80, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step2(ctx) {
  ctx.beginPath();
  ctx.arc(120, 110, 45, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(280, 110, 45, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step3(ctx) {
  ctx.beginPath();
  ctx.arc(160, 190, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 190, 20, 0, Math.PI * 2);
  ctx.stroke();
}
function drawMickey_step4(ctx) {
  ctx.beginPath();
  ctx.arc(200, 230, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(180, 250);
  ctx.quadraticCurveTo(200, 260, 220, 250);
  ctx.stroke();
}
function drawMickey_step5(ctx) {
  ctx.fillRect(140, 280, 120, 60);
}
function drawMickey_step6(ctx) {
  ctx.beginPath();
  ctx.arc(160, 310, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 310, 8, 0, Math.PI * 2);
  ctx.stroke();
}

// DONALD DUCK
function drawDonald_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 210, 70, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDonald_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(200, 160);
  ctx.lineTo(170, 200);
  ctx.lineTo(230, 200);
  ctx.closePath();
  ctx.stroke();
}
function drawDonald_step3(ctx) {
  ctx.beginPath();
  ctx.arc(170, 190, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(230, 190, 15, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDonald_step4(ctx) {
  ctx.beginPath();
  ctx.moveTo(140, 120);
  ctx.lineTo(260, 120);
  ctx.lineTo(260, 150);
  ctx.lineTo(140, 150);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 115, 25, 0, Math.PI);
  ctx.stroke();
}
function drawDonald_step5(ctx) {
  ctx.fillRect(160, 280, 80, 70);
}
function drawDonald_step6(ctx) {
  ctx.fillRect(170, 290, 10, 30);
  ctx.fillRect(220, 290, 10, 30);
}

// HULK
function drawHulk_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 120, 50, 0, Math.PI * 2);
  ctx.stroke();
}
function drawHulk_step2(ctx) {
  ctx.beginPath();
  ctx.arc(160, 110, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 110, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(170, 130);
  ctx.lineTo(230, 130);
  ctx.stroke();
}
function drawHulk_step3(ctx) {
  ctx.fillRect(140, 170, 120, 30);
}
function drawHulk_step4(ctx) {
  ctx.fillRect(90, 200, 40, 80);
  ctx.fillRect(270, 200, 40, 80);
}
function drawHulk_step5(ctx) {
  ctx.fillRect(150, 200, 100, 80);
}
function drawHulk_step6(ctx) {
  ctx.fillRect(160, 280, 30, 50);
  ctx.fillRect(210, 280, 30, 50);
}

// PIKACHU
function drawPikachu_step1(ctx) {
  ctx.beginPath();
  ctx.arc(200, 180, 60, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPikachu_step2(ctx) {
  ctx.beginPath();
  ctx.moveTo(160, 100);
  ctx.lineTo(140, 50);
  ctx.lineTo(170, 110);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(240, 100);
  ctx.lineTo(260, 50);
  ctx.lineTo(230, 110);
  ctx.closePath();
  ctx.stroke();
}
function drawPikachu_step3(ctx) {
  ctx.beginPath();
  ctx.arc(160, 170, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 170, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(200, 200, 8, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPikachu_step4(ctx) {
  ctx.beginPath();
  ctx.ellipse(200, 280, 50, 70, 0, 0, Math.PI * 2);
  ctx.stroke();
}
function drawPikachu_step5(ctx) {
  ctx.beginPath();
  ctx.moveTo(250, 330);
  ctx.lineTo(310, 320);
  ctx.lineTo(280, 360);
  ctx.closePath();
  ctx.stroke();
}
function drawPikachu_step6(ctx) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(280 + i * 15, 330);
    ctx.lineTo(295 + i * 15, 340);
    ctx.stroke();
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

// Initialize drawing canvas
function initDrawCanvas() {
  const canvas = document.getElementById('canvas-draw');
  const ctx = canvas.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1A1A1A';

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: ((src.clientX - rect.left) * 400) / rect.width,
      y: ((src.clientY - rect.top) * 400) / rect.height
    };
  }

  canvas.addEventListener('mousedown', e => {
    state.isDrawing = true;
    const pos = getPos(e);
    state.lastX = pos.x;
    state.lastY = pos.y;
  });

  canvas.addEventListener('mousemove', e => {
    if (!state.isDrawing) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    state.lastX = pos.x;
    state.lastY = pos.y;
  });

  canvas.addEventListener('mouseup', () => {
    state.isDrawing = false;
  });

  canvas.addEventListener('mouseleave', () => {
    state.isDrawing = false;
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    state.isDrawing = true;
    const pos = getPos(e);
    state.lastX = pos.x;
    state.lastY = pos.y;
  });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!state.isDrawing) return;
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
    state.isDrawing = false;
  });
}

// Update UI based on current step
function updateStepUI() {
  const step = state.currentSubject.steps[state.currentStep];
  document.getElementById('step-title').textContent = step.title;
  document.getElementById('step-desc').textContent = step.desc;
  document.getElementById('step-counter').textContent = `Step ${state.currentStep + 1} of ${state.currentSubject.steps.length}`;

  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  prevBtn.disabled = state.currentStep === 0;
  nextBtn.disabled = state.currentStep === state.currentSubject.steps.length - 1;

  document.getElementById('nav-step').textContent = `${state.currentStep + 1}/${state.currentSubject.steps.length}`;
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
    // Last step - show completion screen
    document.getElementById('completion-msg').textContent = `You've completed "${state.currentSubject.label}"!`;
    showScreen('screen-complete');
  }
}

function clearDraw() {
  const canvas = document.getElementById('canvas-draw');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 400, 400);
}

function replaySubject() {
  state.currentStep = 0;
  clearDraw();
  renderGuide();
  updateStepUI();
  showScreen('screen-drawing');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  buildCategoryGrid();
  initDrawCanvas();
});

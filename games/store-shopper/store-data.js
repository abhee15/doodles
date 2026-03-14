// Store data for Store Shopper game
const PRODUCTS = [
  { id: 1, name: 'Apple', emoji: '🍎', price: 1 },
  { id: 2, name: 'Banana', emoji: '🍌', price: 1 },
  { id: 3, name: 'Carrot', emoji: '🥕', price: 1 },
  { id: 4, name: 'Bread', emoji: '🍞', price: 3 },
  { id: 5, name: 'Butter', emoji: '🧈', price: 4 },
  { id: 6, name: 'Milk', emoji: '🥛', price: 3 },
  { id: 7, name: 'Rice', emoji: '🍚', price: 5 },
  { id: 8, name: 'Onion', emoji: '🧅', price: 2 },
  { id: 9, name: 'Egg', emoji: '🥚', price: 2 },
  { id: 10, name: 'Cheese', emoji: '🧀', price: 4 },
  { id: 11, name: 'Broccoli', emoji: '🥦', price: 3 },
  { id: 12, name: 'Tomato', emoji: '🍅', price: 2 }
];

const LEVELS = {
  easy: {
    id: 'easy',
    name: 'Easy',
    budget: 30,
    minSpend: 15,
    maxSpend: 25,
    description: 'Small budget'
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    budget: 50,
    minSpend: 30,
    maxSpend: 45,
    description: 'Bigger budget'
  },
  challenge: {
    id: 'challenge',
    name: 'Challenge',
    budget: 40,
    minSpend: 35,
    maxSpend: 39,
    description: 'Tight budget'
  }
};

function getLevel(levelId) {
  return LEVELS[levelId];
}

function getProducts() {
  return PRODUCTS;
}

function getProduct(productId) {
  return PRODUCTS.find(p => p.id === productId);
}

function calculatePrice(items) {
  return items.reduce((total, item) => total + getProduct(item).price, 0);
}

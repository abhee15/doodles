/* eslint-disable no-undef */

class StoreShopperGame {
  constructor() {
    this.currentLevel = null;
    this.cart = [];
    this.initializeUI();
    this.renderLevelSelector();
  }

  initializeUI() {
    this.landingScreen = document.getElementById('landing-screen');
    this.levelScreen = document.getElementById('level-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.resultModal = document.getElementById('result-modal');
    this.levelSelector = document.getElementById('level-selector');
    this.productsGrid = document.getElementById('products-grid');
    this.cartItems = document.getElementById('cart-items');
    this.cartTotal = document.getElementById('cart-total');
    this.budgetTotal = document.getElementById('budget-total');
    this.budgetSpent = document.getElementById('budget-spent');
    this.budgetRemaining = document.getElementById('budget-remaining');
    this.progressFill = document.getElementById('progress-fill');
    this.checkoutBtn = document.getElementById('checkout-btn');
    this.backToLevelsBtn = document.getElementById('back-to-levels');
    this.nextLevelBtn = document.getElementById('next-level-btn');
    this.tryAgainBtn = document.getElementById('try-again-btn');

    document.getElementById('btn-start').addEventListener('click', () => this.showLevelSelect());
    this.checkoutBtn.addEventListener('click', () => this.checkout());
    this.backToLevelsBtn.addEventListener('click', () => this.backToLevelSelect());
    this.nextLevelBtn.addEventListener('click', () => this.nextLevel());
    this.tryAgainBtn.addEventListener('click', () => this.reloadLevel());
  }

  renderLevelSelector() {
    this.levelSelector.innerHTML = '';
    Object.values(LEVELS).forEach(level => {
      const btn = document.createElement('div');
      btn.className = 'level-btn';
      btn.innerHTML = `
        <div class="level-title">${level.name}</div>
        <div class="level-budget">💰 $${level.budget}</div>
      `;
      btn.addEventListener('click', () => this.startLevel(level.id));
      this.levelSelector.appendChild(btn);
    });
  }

  startLevel(levelId) {
    this.currentLevel = getLevel(levelId);
    this.cart = [];
    this.renderGameScreen();
    this.switchScreen('game');
  }

  renderGameScreen() {
    const products = getProducts();
    this.productsGrid.innerHTML = '';

    products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
        <div class="product-emoji">${product.emoji}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price}</div>
      `;
      item.addEventListener('click', () => this.addToCart(product.id));
      this.productsGrid.appendChild(item);
    });

    this.updateBudgetDisplay();
  }

  addToCart(productId) {
    const product = getProduct(productId);
    const currentTotal = calculatePrice(this.cart);

    if (currentTotal + product.price <= this.currentLevel.budget) {
      this.cart.push(productId);
      this.updateCartDisplay();
      this.updateBudgetDisplay();
    }
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.updateCartDisplay();
    this.updateBudgetDisplay();
  }

  updateCartDisplay() {
    const total = calculatePrice(this.cart);
    this.cartTotal.textContent = `$${total}`;

    this.cartItems.innerHTML = '';

    if (this.cart.length === 0) {
      this.cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
      // Group items by product
      const itemCounts = {};
      this.cart.forEach(productId => {
        itemCounts[productId] = (itemCounts[productId] || 0) + 1;
      });

      Object.keys(itemCounts).forEach((productId, index) => {
        const product = getProduct(parseInt(productId));
        const count = itemCounts[productId];
        const itemTotal = product.price * count;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <span>${product.emoji} ${product.name} x${count} ($${itemTotal})</span>
          <button class="remove-item-btn">Remove</button>
        `;
        cartItem.querySelector('.remove-item-btn').addEventListener('click', () => {
          const cartIndex = this.cart.indexOf(parseInt(productId));
          if (cartIndex !== -1) {
            this.removeFromCart(cartIndex);
          }
        });
        this.cartItems.appendChild(cartItem);
      });
    }

    this.checkoutBtn.disabled = this.cart.length === 0;
  }

  updateBudgetDisplay() {
    const spent = calculatePrice(this.cart);
    const remaining = this.currentLevel.budget - spent;

    this.budgetTotal.textContent = `$${this.currentLevel.budget}`;
    this.budgetSpent.textContent = `$${spent}`;
    this.budgetRemaining.textContent = `$${remaining}`;

    const progress = (spent / this.currentLevel.budget) * 100;
    this.progressFill.style.width = `${Math.min(progress, 100)}%`;
  }

  checkout() {
    const spent = calculatePrice(this.cart);
    const remaining = this.currentLevel.budget - spent;

    let result = {
      emoji: '❌',
      heading: 'Oops!',
      text: "You didn't spend enough money. Try to spend more wisely!"
    };

    if (spent >= this.currentLevel.minSpend && spent <= this.currentLevel.maxSpend) {
      result = {
        emoji: '🎉',
        heading: 'Perfect!',
        text: 'You managed your budget perfectly!'
      };
    } else if (spent > this.currentLevel.budget) {
      result = {
        emoji: '😅',
        heading: 'Over Budget!',
        text: 'You spent too much! Remember to stay within your budget.'
      };
    } else if (spent < this.currentLevel.minSpend) {
      result = {
        emoji: '🤔',
        heading: 'Not Enough!',
        text: "You didn't spend enough money. Try buying more items!"
      };
    }

    this.showResult(result, remaining);
  }

  showResult(result, remaining) {
    document.getElementById('result-emoji').textContent = result.emoji;
    document.getElementById('result-heading').textContent = result.heading;
    document.getElementById('result-text').textContent = result.text;
    document.getElementById('result-money').textContent = `$${remaining}`;

    this.resultModal.classList.add('show');
  }

  nextLevel() {
    const levelIds = Object.keys(LEVELS);
    const currentIndex = levelIds.indexOf(this.currentLevel.id);

    if (currentIndex < levelIds.length - 1) {
      this.startLevel(levelIds[currentIndex + 1]);
    } else {
      this.showAllComplete();
    }

    this.resultModal.classList.remove('show');
  }

  reloadLevel() {
    this.startLevel(this.currentLevel.id);
    this.resultModal.classList.remove('show');
  }

  showLevelSelect() {
    this.switchScreen('level');
  }

  backToLevelSelect() {
    this.switchScreen('level');
  }

  showAllComplete() {
    document.getElementById('result-emoji').textContent = '🏆';
    document.getElementById('result-heading').textContent = 'All Levels Complete!';
    document.getElementById('result-text').textContent =
      "You've mastered budgeting! Great job managing your money!";
    document.getElementById('result-money').textContent = '💪';
    this.nextLevelBtn.style.display = 'none';
  }

  switchScreen(screenName) {
    this.landingScreen.classList.remove('active');
    this.levelScreen.classList.remove('active');
    this.gameScreen.classList.remove('active');

    if (screenName === 'landing') {
      this.landingScreen.classList.add('active');
    } else if (screenName === 'level') {
      this.levelScreen.classList.add('active');
    } else if (screenName === 'game') {
      this.gameScreen.classList.add('active');
    }
  }
}

const game = new StoreShopperGame();

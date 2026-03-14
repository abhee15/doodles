/* eslint-disable no-undef */

class CodeQuestGame {
  constructor() {
    this.currentLevel = 1;
    this.playerX = 0;
    this.playerY = 0;
    this.playerDir = 'right';
    this.programBlocks = [];
    this.isRunning = false;
    this.levelData = null;
    this.directionMap = {
      right: { x: 1, y: 0, icon: '→' },
      down: { x: 0, y: 1, icon: '↓' },
      left: { x: -1, y: 0, icon: '←' },
      up: { x: 0, y: -1, icon: '↑' }
    };
    this.directionOrder = ['right', 'down', 'left', 'up'];

    this.initializeUI();
    this.loadLevel(1);
  }

  initializeUI() {
    this.gridContainer = document.getElementById('grid-container');
    this.programBlocksContainer = document.getElementById('program-blocks');
    this.runBtn = document.getElementById('run-btn');
    this.resetBtn = document.getElementById('reset-btn');
    this.clearBtn = document.getElementById('clear-btn');
    this.levelTitle = document.getElementById('level-title');
    this.levelCount = document.getElementById('level-count');

    this.runBtn.addEventListener('click', () => this.executeProgram());
    this.resetBtn.addEventListener('click', () => this.resetLevel());
    this.clearBtn.addEventListener('click', () => this.clearProgram());

    document.querySelectorAll('.block-item').forEach(item => {
      item.addEventListener('dragstart', e => this.handleDragStart(e));
    });

    this.programBlocksContainer.addEventListener('dragover', e => {
      e.preventDefault();
      this.programBlocksContainer.style.backgroundColor = 'rgba(96, 165, 250, 0.2)';
    });

    this.programBlocksContainer.addEventListener('dragleave', () => {
      this.programBlocksContainer.style.backgroundColor = '';
    });

    this.programBlocksContainer.addEventListener('drop', e => {
      e.preventDefault();
      this.programBlocksContainer.style.backgroundColor = '';
      const blockType = e.dataTransfer.getData('blockType');
      if (blockType) {
        this.addBlockToProgram(blockType);
      }
    });
  }

  handleDragStart(e) {
    const blockType = e.target.getAttribute('data-block');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('blockType', blockType);
  }

  addBlockToProgram(blockType) {
    const block = createBlock(blockType);
    this.programBlocks.push(block);
    this.renderProgramBlocks();
  }

  renderProgramBlocks() {
    this.programBlocksContainer.innerHTML = '';
    this.programBlocks.forEach((block, index) => {
      const blockEl = document.createElement('div');
      blockEl.className = `program-block ${block.type}`;
      blockEl.innerHTML = `
        <span>${BLOCK_TYPES[block.type].icon} ${BLOCK_TYPES[block.type].name}</span>
        <button class="remove-btn" data-index="${index}">✕</button>
      `;
      this.programBlocksContainer.appendChild(blockEl);

      blockEl.querySelector('.remove-btn').addEventListener('click', () => {
        this.programBlocks.splice(index, 1);
        this.renderProgramBlocks();
      });
    });
  }

  clearProgram() {
    this.programBlocks = [];
    this.renderProgramBlocks();
  }

  loadLevel(levelId) {
    this.currentLevel = levelId;
    this.levelData = getLevel(levelId);
    this.playerX = this.levelData.startX;
    this.playerY = this.levelData.startY;
    this.playerDir = this.levelData.startDir;
    this.programBlocks = [];

    this.levelTitle.textContent = `Level ${levelId}: ${this.levelData.title}`;
    this.levelCount.textContent = `${levelId} / ${getTotalLevels()}`;

    this.renderGrid();
    this.renderProgramBlocks();
  }

  renderGrid() {
    this.gridContainer.innerHTML = '';
    this.gridContainer.style.gridTemplateColumns = `repeat(${this.levelData.width}, 1fr)`;

    for (let y = 0; y < this.levelData.height; y++) {
      for (let x = 0; x < this.levelData.width; x++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';

        if (this.levelData.walls.some(w => w[0] === x && w[1] === y)) {
          cell.classList.add('wall');
        } else if (this.levelData.lava.some(w => w[0] === x && w[1] === y)) {
          cell.classList.add('lava');
        }

        if (x === this.levelData.goalX && y === this.levelData.goalY) {
          cell.classList.add('goal');
          cell.textContent = '🎯';
        }

        if (x === this.playerX && y === this.playerY) {
          const player = document.createElement('div');
          player.className = 'player';
          player.textContent = this.directionMap[this.playerDir].icon;
          cell.appendChild(player);
        }

        this.gridContainer.appendChild(cell);
      }
    }
  }

  resetLevel() {
    this.playerX = this.levelData.startX;
    this.playerY = this.levelData.startY;
    this.playerDir = this.levelData.startDir;
    this.renderGrid();
  }

  executeProgram() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.runBtn.disabled = true;

    const instructions = parseBlocksToInstructions(this.programBlocks);
    this.executeInstructions(instructions, 0);
  }

  executeInstructions(instructions, index) {
    if (index >= instructions.length) {
      this.isRunning = false;
      this.runBtn.disabled = false;

      if (this.playerX === this.levelData.goalX && this.playerY === this.levelData.goalY) {
        setTimeout(() => this.completeLevel(), 500);
      }
      return;
    }

    const instruction = instructions[index];

    if (instruction.type === 'move_forward') {
      this.moveForward();
    } else if (instruction.type === 'turn_left') {
      this.turnLeft();
    } else if (instruction.type === 'turn_right') {
      this.turnRight();
    }

    setTimeout(() => {
      this.executeInstructions(instructions, index + 1);
    }, 300);
  }

  moveForward() {
    const dir = this.directionMap[this.playerDir];
    const newX = this.playerX + dir.x;
    const newY = this.playerY + dir.y;

    if (this.isValidPosition(newX, newY)) {
      this.playerX = newX;
      this.playerY = newY;
      this.renderGrid();
    } else {
      this.isRunning = false;
      this.runBtn.disabled = false;
    }
  }

  turnLeft() {
    const currentIndex = this.directionOrder.indexOf(this.playerDir);
    this.playerDir = this.directionOrder[(currentIndex - 1 + 4) % 4];
    this.renderGrid();
  }

  turnRight() {
    const currentIndex = this.directionOrder.indexOf(this.playerDir);
    this.playerDir = this.directionOrder[(currentIndex + 1) % 4];
    this.renderGrid();
  }

  isValidPosition(x, y) {
    if (x < 0 || x >= this.levelData.width || y < 0 || y >= this.levelData.height) {
      return false;
    }
    if (this.levelData.walls.some(w => w[0] === x && w[1] === y)) {
      return false;
    }
    if (this.levelData.lava.some(w => w[0] === x && w[1] === y)) {
      return false;
    }
    return true;
  }

  completeLevel() {
    alert(`🎉 Level ${this.currentLevel} Complete! Great job!`);
    if (this.currentLevel < getTotalLevels()) {
      this.loadLevel(this.currentLevel + 1);
    }
  }
}

const game = new CodeQuestGame();

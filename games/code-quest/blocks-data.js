// Block type definitions and utilities
const BLOCK_TYPES = {
  move_forward: {
    name: 'Move Forward',
    icon: '→',
    color: '#3b82f6'
  },
  turn_left: {
    name: 'Turn Left',
    icon: '↻',
    color: '#f59e0b'
  },
  turn_right: {
    name: 'Turn Right',
    icon: '↺',
    color: '#ec4899'
  },
  repeat: {
    name: 'Repeat (4x)',
    icon: '↻',
    color: '#8b5cf6'
  },
  if: {
    name: 'If Wall',
    icon: '❓',
    color: '#10b981'
  }
};

function createBlock(type) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: type,
    nested: []
  };
}

function cloneBlock(block) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: block.type,
    nested: block.nested.map(b => cloneBlock(b))
  };
}

function parseBlocksToInstructions(blocks) {
  const instructions = [];

  function processBlock(block) {
    if (block.type === 'repeat') {
      // Repeat adds 4 copies of nested blocks
      for (let i = 0; i < 4; i++) {
        block.nested.forEach(nested => processBlock(nested));
      }
    } else if (block.type === 'if') {
      // If-wall: add conditional instruction
      instructions.push({ type: 'if_wall', nested: block.nested.map(b => ({ ...b })) });
    } else {
      instructions.push(block);
    }
  }

  blocks.forEach(block => processBlock(block));
  return instructions;
}

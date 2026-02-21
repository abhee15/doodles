/**
 * GAME INTERFACE - Controls game flow and interaction
 * Works with the parametric game engine
 */

/**
 * Start the recall/quiz phase
 */
function startRecall() {
  const storyPhase = document.getElementById('story-phase');
  const recallPhase = document.getElementById('recall-phase');
  
  if (storyPhase) storyPhase.style.display = 'none';
  if (recallPhase) recallPhase.style.display = 'block';

  buildRecallUI();
}

/**
 * Build the recall/quiz interface
 */
function buildRecallUI() {
  if (!gameEngine) return;

  const recallGrid = document.getElementById('recall-grid');
  if (!recallGrid) return;

  const elements = gameEngine.getElements();
  
  // Create recall challenges
  recallGrid.innerHTML = elements.map((el, idx) => `
    <div class="recall-item" id="recall-${idx}">
      <div class="recall-question">What's element #${el.atomicNumber}?</div>
      <div class="recall-options">
        <button class="recall-btn" onclick="checkAnswer(${idx}, '${el.symbol}')">
          ${el.symbol}
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Check answer and provide feedback
 */
function checkAnswer(elementIndex, answer) {
  if (!gameEngine) return;

  const element = gameEngine.getElements()[elementIndex];
  const isCorrect = answer === element.symbol;

  const itemDiv = document.getElementById(`recall-${elementIndex}`);
  if (itemDiv) {
    if (isCorrect) {
      itemDiv.classList.add('correct');
      itemDiv.innerHTML += '<div class="feedback success">✓ Correct!</div>';
    } else {
      itemDiv.classList.add('incorrect');
      itemDiv.innerHTML += `<div class="feedback error">✗ Wrong. It's ${element.symbol}</div>`;
    }
    itemDiv.style.pointerEvents = 'none';
  }

  // Check if all answered
  setTimeout(() => {
    const allAnswered = document.querySelectorAll('.recall-item').length === 
                        document.querySelectorAll('.recall-item.correct, .recall-item.incorrect').length;
    if (allAnswered) {
      showResults();
    }
  }, 500);
}

/**
 * Show final results
 */
function showResults() {
  const resultsCorrct = document.querySelectorAll('.recall-item.correct').length;
  const resultsTotal = document.querySelectorAll('.recall-item').length;
  const percentage = (resultsCorrct / resultsTotal) * 100;

  const resultsDiv = document.getElementById('recall-results');
  if (resultsDiv) {
    resultsDiv.style.display = 'block';
    document.getElementById('results-text').textContent = 
      `You got ${resultsCorrct} out of ${resultsTotal} (${percentage.toFixed(0)}%)! Great job learning with the ${gameEngine.technique.replace('_', ' ')} technique!`;
  }

  gameEngine.recordScore(resultsCorrct, resultsTotal);
}

/**
 * Go to next chunk
 */
function nextChunk() {
  const nextChunk = gameEngine.chunk + 1;
  if (nextChunk <= 5) {
    window.location.href = `index.html`;
  } else {
    alert('🎉 Congratulations! You\'ve completed all 5 chunks!\n\nWould you like to review any chunk?');
    window.location.href = `index.html`;
  }
}

/**
 * Go back to picker hub
 */
function goBack() {
  window.location.href = 'index.html';
}

/**
 * Go home to portal
 */
function goHome() {
  window.location.href = '../../index.html';
}

/**
 * Ready for more
 */
function readyForMore() {
  nextChunk();
}

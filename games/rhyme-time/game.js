'use strict';

const ROUNDS = [
  { word: 'Cat', answer: 'Hat', choices: ['Dog', 'Hat', 'Run', 'Jump'] },
  { word: 'Sun', answer: 'Run', choices: ['Run', 'Cat', 'Ball', 'Blue'] },
  { word: 'Tree', answer: 'Bee', choices: ['Ant', 'Bee', 'Fish', 'Bird'] },
  { word: 'Ball', answer: 'Fall', choices: ['Fall', 'Jump', 'Swim', 'Play'] },
  { word: 'Cake', answer: 'Lake', choices: ['Cook', 'Lake', 'Eat', 'Drink'] },
  { word: 'Star', answer: 'Car', choices: ['Moon', 'Car', 'Bus', 'Fly'] },
  { word: 'Frog', answer: 'Log', choices: ['Log', 'Bird', 'Duck', 'Fish'] },
  { word: 'Nose', answer: 'Rose', choices: ['Eye', 'Rose', 'Ear', 'Arm'] },
  { word: 'Rain', answer: 'Train', choices: ['Train', 'Snow', 'Wind', 'Cloud'] },
  { word: 'Fox', answer: 'Box', choices: ['Cat', 'Box', 'Bag', 'Bin'] },
  { word: 'Book', answer: 'Cook', choices: ['Read', 'Cook', 'Sit', 'Play'] },
  { word: 'Fly', answer: 'Sky', choices: ['Sky', 'Bird', 'Wind', 'Nest'] },
  { word: 'Blue', answer: 'Glue', choices: ['Glue', 'Red', 'Pink', 'Gold'] },
  { word: 'Night', answer: 'Light', choices: ['Dark', 'Light', 'Moon', 'Star'] },
  { word: 'Clown', answer: 'Crown', choices: ['Crown', 'Wig', 'Nose', 'Hat'] },
  { word: 'Shake', answer: 'Bake', choices: ['Eat', 'Bake', 'Cook', 'Stir'] },
  { word: 'Snow', answer: 'Glow', choices: ['Rain', 'Glow', 'Melt', 'Fall'] },
  { word: 'Sing', answer: 'Ring', choices: ['Ring', 'Song', 'Note', 'Beat'] },
  { word: 'Sheep', answer: 'Sleep', choices: ['Wool', 'Sleep', 'Wake', 'Rest'] },
  { word: 'Bee', answer: 'Tree', choices: ['Tree', 'Ant', 'Fly', 'Bug'] },
  { word: 'Moon', answer: 'Spoon', choices: ['Fork', 'Spoon', 'Bowl', 'Cup'] },
  { word: 'Bear', answer: 'Pair', choices: ['Pair', 'Lion', 'Wolf', 'Deer'] },
  { word: 'Eight', answer: 'Gate', choices: ['Gate', 'Nine', 'Door', 'Wall'] },
  { word: 'Fish', answer: 'Dish', choices: ['Dish', 'Bowl', 'Cup', 'Pot'] },
  { word: 'Whale', answer: 'Tail', choices: ['Tail', 'Fin', 'Flip', 'Wave'] }
];

const TOTAL = 10;
const state = { score: 0, round: 0, used: new Set(), current: null, answered: false };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function pickRound() {
  const avail = ROUNDS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.used.has(i);
  });
  if (avail.length === 0) {
    state.used.clear();
    return pickRound();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return ROUNDS[idx];
}

function startRound() {
  state.current = pickRound();
  state.answered = false;
  document.getElementById('round-label').textContent = `Round ${state.round + 1} of ${TOTAL}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('word-display').textContent = state.current.word;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  buildChoices();
  showScreen('screen-game');
}

function buildChoices() {
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  const shuffled = state.current.choices.slice().sort(function () {
    return Math.random() - 0.5;
  });
  shuffled.forEach(function (word) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = word;
    btn.addEventListener('click', function () {
      handleChoice(btn, word);
    });
    grid.appendChild(btn);
  });
}

function handleChoice(btn, chosen) {
  if (state.answered) {
    return;
  }
  state.answered = true;
  const correct = state.current.answer;
  document.querySelectorAll('.choice-btn').forEach(function (b) {
    b.disabled = true;
    if (b.textContent === correct) {
      b.classList.add('correct-choice');
    }
  });
  if (chosen === correct) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    document.getElementById('feedback').textContent = '✅ Correct!';
    document.getElementById('feedback').className = 'feedback good';
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 900);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    document.getElementById('feedback').textContent =
      `❌ "${correct}" rhymes with ${state.current.word}!`;
    document.getElementById('feedback').className = 'feedback bad';
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1500);
  }
}

function showResult() {
  const pct = state.score / TOTAL;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : '🎵';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Rhyme Master!' : pct >= 0.7 ? 'Great Rhyming!' : 'Keep Practicing!';
  document.getElementById('result-score').textContent = `${state.score} / ${TOTAL} correct`;
  showScreen('screen-result');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-start').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.used.clear();
    startRound();
  });
  document.getElementById('btn-menu').addEventListener('click', function () {
    showScreen('screen-start');
  });
  document.getElementById('btn-play-again').addEventListener('click', function () {
    state.score = 0;
    state.round = 0;
    state.used.clear();
    startRound();
  });
});

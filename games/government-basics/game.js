'use strict';
const QUESTIONS = [
  {
    q: 'The United States government is divided into how many BRANCHES?',
    choices: ['Two', 'Three', 'Four', 'Five'],
    answer: 1,
    emoji: '🏛️',
    fact: 'THREE branches — Legislative (makes laws), Executive (carries out laws), Judicial (interprets laws). No single branch has all the power!'
  },
  {
    q: 'Which branch of government MAKES the laws?',
    choices: [
      'Executive (President)',
      'Judicial (Supreme Court)',
      'Legislative (Congress)',
      'Military'
    ],
    answer: 2,
    emoji: '⚖️',
    fact: 'The LEGISLATIVE branch (Congress = Senate + House of Representatives) writes and passes laws!'
  },
  {
    q: 'The EXECUTIVE branch is headed by the...',
    choices: ['Chief Justice', 'Speaker of the House', 'President', 'Senate Majority Leader'],
    answer: 2,
    emoji: '🦅',
    fact: 'The PRESIDENT leads the Executive branch — they sign or veto bills, command the military, and run the government day-to-day!'
  },
  {
    q: 'The SUPREME COURT belongs to which branch?',
    choices: ['Legislative', 'Executive', 'Judicial', 'Military'],
    answer: 2,
    emoji: '⚖️',
    fact: 'The JUDICIAL branch (Supreme Court + lower courts) interprets laws and decides if they follow the Constitution!'
  },
  {
    q: 'The US Constitution is...',
    choices: [
      'A list of Presidents',
      'The supreme law of the United States',
      'A geography map',
      'A military plan'
    ],
    answer: 1,
    emoji: '📜',
    fact: 'The Constitution (written 1787) is the SUPREME LAW — all other laws must agree with it. It has been amended 27 times!'
  },
  {
    q: 'How many senators does each state send to the US Senate?',
    choices: ['One', 'Two', 'It depends on population', 'Four'],
    answer: 1,
    emoji: '🗳️',
    fact: 'EVERY state sends exactly TWO senators — making 100 senators total. This gives smaller states equal Senate representation!'
  },
  {
    q: 'The FIRST TEN amendments to the Constitution are called...',
    choices: ['The Ten Commandments', 'The Bill of Rights', 'The Declaration', 'The Articles'],
    answer: 1,
    emoji: '📋',
    fact: 'The BILL OF RIGHTS (1791) lists fundamental rights like free speech, religion, press, and the right to a fair trial!'
  },
  {
    q: '"Checks and balances" means...',
    choices: [
      'The government checks bank balances',
      'Each branch can limit the powers of the other branches',
      'Citizens check if laws are balanced',
      'The military checks the government'
    ],
    answer: 1,
    emoji: '⚖️',
    fact: 'CHECKS AND BALANCES: Congress writes laws → President can veto → Congress can override veto → Courts can rule it unconstitutional!'
  },
  {
    q: 'How old must a person be to vote in US federal elections?',
    choices: ['16', '18', '21', '25'],
    answer: 1,
    emoji: '🗳️',
    fact: "The 26th Amendment (1971) set the voting age at 18! Before 1971, many soldiers who fought in Vietnam couldn't vote."
  },
  {
    q: 'Who wrote the Declaration of Independence?',
    choices: ['George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'Alexander Hamilton'],
    answer: 2,
    emoji: '📜',
    fact: 'Thomas JEFFERSON was the primary author! The Declaration (1776) explained WHY the colonies were separating from Britain!'
  },
  {
    q: 'The House of Representatives has representation based on...',
    choices: [
      'Each state gets 2 seats',
      'Population — bigger states get more seats',
      'Alphabetical order',
      'Random assignment'
    ],
    answer: 1,
    emoji: '🏠',
    fact: 'The House has 435 members — each state gets seats proportional to POPULATION. California has 52, Wyoming has 1!'
  },
  {
    q: 'What is DEMOCRACY?',
    choices: [
      'Rule by a single king or queen',
      'Rule by the military',
      'Government where citizens have the power to vote',
      'Rule by only the wealthiest people'
    ],
    answer: 2,
    emoji: '🗳️',
    fact: 'DEMOCRACY comes from Greek: "demos" (people) + "kratos" (power). The US is a representative democracy — we elect leaders!'
  },
  {
    q: 'The President can VETO a bill. What does veto mean?',
    choices: [
      'Sign it into law',
      'Reject or refuse to sign it',
      'Send it to the Supreme Court',
      'Give it to Congress'
    ],
    answer: 1,
    emoji: '✋',
    fact: 'VETO = the President says "No!" But Congress can override a veto with 2/3 majority votes — that\'s checks and balances!'
  },
  {
    q: 'Which document says "We hold these truths to be self-evident, that all men are created equal"?',
    choices: [
      'The Constitution',
      'The Bill of Rights',
      'The Declaration of Independence',
      'The Emancipation Proclamation'
    ],
    answer: 2,
    emoji: '📜',
    fact: 'The DECLARATION OF INDEPENDENCE (1776)! These famous words by Jefferson declared all people have equal rights!'
  },
  {
    q: 'Local governments (cities, counties) are responsible for...',
    choices: [
      'Declaring war',
      'Printing money',
      'Roads, local schools, police, and firefighters',
      'Making treaties with other countries'
    ],
    answer: 2,
    emoji: '🏘️',
    fact: 'LOCAL government handles everyday services: roads, schools, parks, police, fire departments. Closer to home = more direct impact!'
  }
];
const TOTAL = 10;
const state = { score: 0, round: 0, used: new Set(), current: null, answered: false };
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}
function pickQ() {
  const avail = QUESTIONS.map(function (_, i) {
    return i;
  }).filter(function (i) {
    return !state.used.has(i);
  });
  if (avail.length === 0) {
    state.used.clear();
    return pickQ();
  }
  const idx = avail[Math.floor(Math.random() * avail.length)];
  state.used.add(idx);
  return QUESTIONS[idx];
}
function startRound() {
  state.current = pickQ();
  state.answered = false;
  document.getElementById('round-label').textContent = `Round ${state.round + 1} of ${TOTAL}`;
  document.getElementById('score-label').textContent = `Score: ${state.score}`;
  document.getElementById('q-emoji').textContent = state.current.emoji;
  document.getElementById('q-text').textContent = state.current.q;
  document.getElementById('fact-box').textContent = '';
  document.getElementById('fact-box').style.display = 'none';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  buildChoices();
  showScreen('screen-game');
}
function buildChoices() {
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  state.current.choices.forEach(function (c, i) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c;
    btn.addEventListener('click', function () {
      handleChoice(btn, i);
    });
    grid.appendChild(btn);
  });
}
function handleChoice(btn, idx) {
  if (state.answered) {
    return;
  }
  state.answered = true;
  document.querySelectorAll('.choice-btn').forEach(function (b, i) {
    b.disabled = true;
    if (i === state.current.answer) {
      b.classList.add('correct-choice');
    }
  });
  document.getElementById('fact-box').textContent = `💡 ${state.current.fact}`;
  document.getElementById('fact-box').style.display = 'block';
  if (idx === state.current.answer) {
    state.score++;
    state.round++;
    btn.classList.add('correct-choice');
    document.getElementById('feedback').textContent = '✅ Correct!';
    document.getElementById('feedback').className = 'feedback good';
    document.getElementById('score-label').textContent = `Score: ${state.score}`;
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 1600);
  } else {
    state.round++;
    btn.classList.add('wrong-choice');
    document.getElementById('feedback').textContent = '❌ Not quite!';
    document.getElementById('feedback').className = 'feedback bad';
    setTimeout(function () {
      state.round >= TOTAL ? showResult() : startRound();
    }, 2100);
  }
}
function showResult() {
  const pct = state.score / TOTAL;
  document.getElementById('result-emoji').textContent = pct === 1 ? '🏆' : pct >= 0.7 ? '🏛️' : '📜';
  document.getElementById('result-title').textContent =
    pct === 1 ? 'Civics Champion!' : pct >= 0.7 ? 'Future Leader!' : 'Keep Learning!';
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

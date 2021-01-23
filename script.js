'use strict';

/* DOM ELEMENT VARS */

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1EL = document.querySelector('.player--1');
const player0EL = document.querySelector('.player--0');

/* Start */

diceEL.classList.add('hidden');
score0EL.textContent = 0;
score1EL.textContent = 0;

/* VARS */

let scores = [0, 0];
let current_score = 0;
let activePlayer = 0;
let playing = true;

/* FUNCTIONS */

function roll_die() {
  return Math.trunc(Math.random() * 6) + 1;
}

function toggle_player() {
  current_score = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = current_score;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
  activePlayer = (activePlayer + 1) % 2;
}

function start() {
  playing = true;
  scores = [0, 0];
  current_score = 0;
  activePlayer = 0;

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--winner');
  player1EL.classList.remove('player--active');
}

/* EVENT HANDLERS */

btnRoll.addEventListener('click', function () {
  if (!playing) return;
  const dieroll = roll_die();
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${dieroll}.png`;
  if (dieroll !== 1) {
    current_score += dieroll;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = current_score;
  } else {
    toggle_player();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;
  scores[activePlayer] += current_score;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    playing = false;
  } else {
    toggle_player();
  }
});

btnNew.addEventListener('click', start);

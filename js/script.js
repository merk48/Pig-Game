'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//? Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let playing = true;

function switchPlayer() {
  // set the current score to 0 && delete its value
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // reverse the game by :
  // [1]- Reverse the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // [2]- Remove and Add class active
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate  a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // store the current score in a variable
      currentScore += dice;

      // Add dice to current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //* Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // Display the score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //* Finish the Game
      playing = false;
      // Hide the dice
      diceEl.classList.add('hidden');
      // Give the winner player the player--winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        // and remove from it the player--active class
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //* Switch to next player
      switchPlayer();
    }
  }
});

// New game btn
btnNew.addEventListener('click', function () {
  // Reload the page at all
  window.location.reload();
  // We can reset things ALL : //? [ Starting conditions ]
  //* like down ⬇
});

/*

btnNew.addEventListener('click', init);

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//* and remove my Starting conditions in the top ⬆
*/

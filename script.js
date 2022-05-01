'use strict';

// functions

const displayDumpScore = function (element, score) {
  document.querySelector(element).textContent = score; //getElementByID is faster
};

const hideDumpDice = function (element, status) {
  document.querySelector(element).classList.add(status);
};

const showDumpDice = function (element, status) {
  document.querySelector(element).classList.remove(status);
};

const rollDice = function (num) {
  return Math.trunc(Math.random() * num) + 1;
};

const displayDice = function (element, src) {
  document.querySelector(element).src = src;
};

const displayScore = function (element, score) {
  document.querySelector(element).textContent = score;
};

const togglePlayer = function (element, status) {
  document.querySelector(element).classList.toggle(status);
};

const switchPlayer = function () {
  //switch player
  displayScore(`#current--${activePlayer}`, currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // change the class of the active player
  togglePlayer('.player--0', 'player--active');
  togglePlayer('.player--1', 'player--active');
};

// set btn
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting condition
let scores, score, currentScore, activePlayer, playGame;

const initGame = function () {
  const score0El = displayDumpScore('#score--0', 0);
  const score1El = displayDumpScore('#score--1', 0);
  const diceE1 = hideDumpDice('.dice', 'hidden');

  scores = [0, 0];
  score = 0;
  currentScore = 0;
  activePlayer = 0;
  playGame = true;

  displayScore(`#current--${activePlayer}`, currentScore);
  displayScore(`#score--${activePlayer}`, currentScore);
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};

initGame();

btnRoll.addEventListener('click', function () {
  if (playGame) {
    // generate a random number 1-6
    const dice = rollDice(6);
    console.log('dice: ', dice);

    // display dice
    const dice_src = `dice-${dice}.png`;
    displayDice('.dice', dice_src);

    // check if dice == 1, if not, add score to current score
    const diceEl = showDumpDice('.dice', 'hidden');
    if (dice !== 1) {
      currentScore = currentScore + dice;
      displayScore(`#current--${activePlayer}`, currentScore);
    } else if (dice == 1) {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playGame) {
    // add current scores to total scores
    scores[activePlayer] = scores[activePlayer] + currentScore;
    displayScore(`#score--${activePlayer}`, scores[activePlayer]);

    if (scores[activePlayer] >= 100) {
      playGame = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);

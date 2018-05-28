var allCards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-bomb",
  "fa-bomb",
  "fa-bolt",
  "fa-bolt",
  "fa-anchor",
  "fa-anchor",
  "fa-bicycle",
  "fa-bicycle",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf"
];

var openedCards = [];

var matchedCards = [];

let flipCount = openedCards.length/2;

var countLog = document.querySelector('.moves');

var numStars = document.querySelectorAll('.star');

var resetButton = document.querySelector('.restart');

var timeclock = document.querySelector('.gametime');

var totalTime, timeRun;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function showTime() {
  var today = new Date();
  var startTime = today.getTime();
  timeRun = setInterval(function() {
    var today = new Date();
    var currentTime = today.getTime();
    var timePassed = ((currentTime-startTime)/1000).toFixed(0);
    var minutes = Math.floor(timePassed/60);
    var seconds = timePassed - minutes*60;
    if (seconds<10) {
      var sec = '0'+seconds;
    }
    else {
      sec = seconds;
    }
    timeclock.innerText = minutes+':'+sec;
  }, 1000);
}

function stopTime() {
  clearInterval(timeRun);
  totalTime = document.querySelector('.gametime').innerText;
}

// Resets timer, move counter, star rating, clears and reshuffles deck
function restartGame() {
  stopTime();
  timeclock.innerText = '0:00';
  countLog.innerText = 0;
  numStars[2].classList.add('fa-star');
  numStars[1].classList.add('fa-star');
  openedCards = [];
  matchedCards = [];
  buildDeck();
  cardGame();
}

// Displays modal for winning the game
function win () {
  if (matchedCards.length === 16) {
    var stars = document.querySelectorAll('.fa-star');
    stopTime();
    alert (`Congratulations...you won the game!!
    # of moves: ${flipCount}
    Star rating: ${stars.length}/3
    Total time: ${totalTime}
    Would you like to play again?`)
    restartGame();
  }
}

// Builds each card html, shuffle order, and adds to deck
function buildDeck() {
  var allCardsHTML = allCards.map(function(cardIdentity) {
    return `<li class="card" data-card="${cardIdentity}"><i class="fa ${cardIdentity}"></i></li>`;
  });
  shuffle(allCardsHTML);
  var deck = document.querySelector('.deck');
  deck.innerHTML = allCardsHTML.join('');
}

// Check for card match every 2 flips. if match will change to green and check for win. if no match will change to red and reset cards.
function checkMatch() {
  flipCount = openedCards.length/2;
  if (flipCount%1 === 0 && openedCards[2*flipCount-2].dataset.card === openedCards[2*flipCount-1].dataset.card) {
    openedCards[2*flipCount-2].classList.add('match');
    openedCards[2*flipCount-1].classList.add('match');
    matchedCards.push(openedCards[2*flipCount-2]);
    matchedCards.push(openedCards[2*flipCount-1]);
    setTimeout(win, 700);
  }
  else if (flipCount%1 === 0) {
    openedCards[2*flipCount-2].classList.add('nomatch');
    openedCards[2*flipCount-1].classList.add('nomatch');
    setTimeout(function resetCard() {
      openedCards[2*flipCount-2].classList.remove('nomatch', 'show', 'open');
      openedCards[2*flipCount-1].classList.remove('nomatch', 'show', 'open');
    }, 700);
  }
}

/*
 * Listens for card to be clicked and will show cards and start game timer.
 * also updates move counter every 2 card flips and updates star rating
 */
function cardGame() {
  var cards = document.querySelectorAll('.card');
    cards.forEach(function(cardTarget) {
        cardTarget.addEventListener('click', function showCard() {
          var noMatch = document.querySelector('.nomatch');
          if (!cardTarget.classList.contains('show') && noMatch == null) {
            cardTarget.classList.add('show', 'open');
            openedCards.push(cardTarget);
            if (openedCards.length === 1) {
              showTime();
            }
            checkMatch();
          }
          if (flipCount%1 === 0) {
            countLog.innerText = flipCount;
          }
          if (flipCount > 16) {
            numStars[2].classList.remove('fa-star');
          }
          if (flipCount > 24) {
            numStars[1].classList.remove('fa-star');
          }
        });
    });
}

buildDeck();
cardGame();
resetButton.addEventListener('click', restartGame);

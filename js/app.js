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

function buildDeck() {
  var allCardsHTML = allCards.map(function(cardIdentity){
    return `<li class="card" data-card="${cardIdentity}"><i class="fa ${cardIdentity}"></i></li>`;
  });
  shuffle(allCardsHTML);
  var deck = document.querySelector('.deck');
  deck.innerHTML = allCardsHTML.join('');
}

buildDeck();

function checkMatch() {
  flipCount = openedCards.length/2;
  if (flipCount%1===0 && openedCards[2*flipCount-2].dataset.card===openedCards[2*flipCount-1].dataset.card) {
    openedCards[2*flipCount-2].classList.add('match');
    openedCards[2*flipCount-1].classList.add('match');
    matchedCards.push(openedCards[2*flipCount-2]);
    matchedCards.push(openedCards[2*flipCount-1]);
    setTimeout(function win (){
      if (matchedCards.length===16) {
        var stars = document.querySelectorAll('.fa-star');
        alert (`Congratulations...you won the game!!
        # of moves: ${flipCount}
        Star rating: ${stars.length}/3
        Total time:
        Would you like to play again?`)
        buildDeck();
        cardGame();
        openedCards = [];
        matchedCards = [];
        countLog.innerText = 0;
        numStars[0,1,2].classList.add('fa-star');
      }
    }, 800);
  }
  else if (flipCount%1===0) {
    openedCards[2*flipCount-2].classList.add('nomatch');
    openedCards[2*flipCount-1].classList.add('nomatch');
    setTimeout(function resetCard() {
      openedCards[2*flipCount-2].classList.remove('nomatch', 'show', 'open');
      openedCards[2*flipCount-1].classList.remove('nomatch', 'show', 'open');
    }, 700);
  }
}
var numStars = document.querySelectorAll('.star');
function cardGame() {
  var cards = document.querySelectorAll('.card');
    cards.forEach(function(cardTarget) {
        cardTarget.addEventListener('click', function showCard() {
          if (!cardTarget.classList.contains('show')) {
            cardTarget.classList.add('show', 'open');
            openedCards.push(cardTarget);
            if (openedCards.length===1) {
              showTime();
            }
            checkMatch();
          }
          else {
            console.log('already clicked');
          }
          if (flipCount%1===0) {
            countLog.innerText = flipCount;
          }

          if (flipCount>16) {
            numStars[2].classList.remove('fa-star');
          }
          if (flipCount>24) {
            numStars[1].classList.remove('fa-star');
          }
        });
    });
}

var resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', function reset() {
  openedCards = [];
  matchedCards = [];
  countLog.innerText = 0;
  buildDeck();
  cardGame();
  numStars[0,1,2].classList.add('fa-star');
  showTime();
  });
cardGame();

function showTime(){
  var today = new Date();
  var startTime = today.getTime();
  setInterval(function() {var today = new Date();
  var currentTime = today.getTime();
  var timePassed = ((currentTime-startTime)/1000).toFixed(0);
  var timeclock = document.querySelector('.gametime');
  var minutes = Math.floor(timePassed/60);
  var seconds = timePassed - minutes*60;
  if (seconds<10) {var sec = '0'+seconds}
  else {sec = seconds}
  timeclock.innerText = minutes+':'+sec;
  },1000);
}





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*



*/


const cards = document.querySelectorAll('.gameCards');
const tLabel = document.getElementById("timeLabel");
const tCounter = document.getElementById("timeCounter");
const mLabel = document.getElementById("matchesLabel");
const mCounter = document.getElementById("matchesCounter");
const rButton = document.getElementById("restartButton");
const sButton = document.getElementById("startButton");

var time = 30;
var matches = 0;
var firstCard;
var secondCard;
var noFlips = true;

//When the page is loaded the restart button will be hidden and the cards will be shuffled
window.onload = function() {
    rButton.style.display = "none";

    shuffleCards();
}
    
function startGame() {
    
    unlockCards();

    //Removes the start button and then adds the restart button to the screen
    sButton.style.display = "none";
    rButton.style.display = "block";
    
    //Timer
    setInterval(function() {

        if (time > 0) {
            time--;
        }
        else {
            gameOver();
        }
        tCounter.innerHTML = time; //Adds the timer to the screen
    }, 1000)
}

//The page will be refreshed when the "restartButton" is clicked
function restartGame() {
    location.reload();
}

//This function is executed when the time runs out or the players makes all 6 matches
function gameOver() {
    
    lockCards();
    clearInterval();

    //Different displays based on if the user wins or fails
    if (matches === 6) {
        tLabel.innerHTML = "You Win!";
        tCounter.style.display = "none";
        mLabel.style.display = "none";
        mCounter.style.display = "none";
        tLabel.style.margin = "1.5em";
    } 
    else {
        tLabel.innerHTML = "Game Over!";
        tCounter.style.display = "none";
        tLabel.style.margin = "1.5em";
    }
    
    //Whichever cards the user did not match will flip over and reveal themselves a second after the game ends
    setTimeout(() => {
        cards.forEach(card => card.classList.add('flip'));
    }, 1000);
}

//
function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
}  

function unlockCards() {
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function lockCards() {
    cards.forEach(card => card.removeEventListener('click', flipCard));
}

//
function flipCard() {
    this.classList.add('flip');

    if (noFlips == true) {
        firstCard = this;
        noFlips = false;
    } 
    else if (noFlips == false) {
        secondCard = this;
        noFlips = true;
    }

    checkCards();
}  

function checkCards() {

    if (firstCard != null && secondCard != null) {

        lockCards();

        if (firstCard.getElementsByTagName("img")[0].src === secondCard.getElementsByTagName("img")[0].src) {
            matches++;

            mCounter.innerHTML = matches;

            firstCard = undefined;
            secondCard = undefined;

            if (matches == 6) {
                gameOver();
            } 
            else unlockCards();
        }
        else {
            setTimeout(() => {
               firstCard.classList.remove('flip');
               secondCard.classList.remove('flip');

               firstCard = undefined;
               secondCard = undefined;

               unlockCards();
            }, 1750);
        }
    }
}
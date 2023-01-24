//Stores elements from html file as variables
const cards = Array.from(document.querySelectorAll('.gameCards'));
const tLabel = document.getElementById("timeLabel");
const tCounter = document.getElementById("timeCounter");
const mLabel = document.getElementById("matchesLabel");
const mCounter = document.getElementById("matchesCounter");
const rButton = document.getElementById("restartButton");
const sButton = document.getElementById("startButton");

//Define variables
var time = 30;
var matches = 0;
var firstCard;
var secondCard;
var noFlips = true;

//When the page is loaded the cards will be shuffled, locked, and
//the restart button will be hidden so only the start button shows until the game starts
window.onload = function() {
    rButton.style.display = "none";
    setCardsLock(true);
    shuffleCards();
}
    
//Executed when the "startButton" is clicked
function startGame() {

    setCardsLock(false); //Unlocks cards

    //Removes the start button and then adds the restart button to the screen
    sButton.style.display = "none";
    rButton.style.display = "block";
    
    //Timer
    setInterval(function() {
        time > 0 ? time-- : gameOver(); //Ternary operator- conditional ? true : false
        tCounter.innerHTML = time; //Adds the timer to the screen
    }, 1000)
}

//The page will be refreshed when the "restartButton" is clicked
function restartGame() {
    location.reload();
}

//Executed when the time runs out or the player matches all 6 pairs
function gameOver() {
    
    setCardsLock(true); //Locks cards
    clearInterval(); //Clears timer interval

    //Different text displays based on if the user wins or fails
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
    
    //Whichever cards the user did not match will flip over being revealed a second after the game ends
    setTimeout(() => {
        cards.forEach(card => card.classList.add('flip'));
    }, 1000);
}

//Gives each card a random position on the screen
function shuffleCards() {
    //forEach instead of for so each card is easily assigned a unique value
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
}  

//Determines if all 12 cards can be clicked on or not
//-lockCards (boolean)- When the function is called this determines if
//the cards should be locked (true), or if they should be unlocked (false)
function setCardsLock(lockCards) {
    for (var i = 0; i < cards.length; i++) {
        if (!lockCards) {
            cards[i].addEventListener('click', flipCard);
        } else {
            cards[i].removeEventListener('click', flipCard);
        }
    }
}

//Executed if the card is unlocked and clicked
function flipCard() {
    if (!this.classList.contains('flip')) { //Makes sure it's not alread flipped over

        this.classList.add('flip'); //Adds css flip animation

        //Keeps track of if 1 or 2 cards are flipped over 
        //and assigns the card data to the variable
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
}  

//Used to determine if the two cards flipped over are a match 
function checkCards() {

    if (firstCard != null && secondCard != null) { //Only checks when two cards have been flipped

        setCardsLock(true); //Locks cards while checking

        if (firstCard.getElementsByTagName("img")[0].src === secondCard.getElementsByTagName("img")[0].src) { //Checks if the images match
            matches++;
            mCounter.innerHTML = matches;

            firstCard = undefined;
            secondCard = undefined;

            if (matches === 6) {
                gameOver();
            } 
            else setCardsLock(false); //Unlocks Cards
        }
        else { //Flips the cards back over if they are not a match
            setTimeout(() => {
               firstCard.classList.remove('flip');
               secondCard.classList.remove('flip');

               firstCard = undefined;
               secondCard = undefined;

               setCardsLock(false); //Unlocks cards
            }, 1750);
        }
    }
}
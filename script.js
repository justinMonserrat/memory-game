/*

*/

var time = 30.0;
var matches = 0;

var sButton = document.getElementById("startButton");
var rButton = document.getElementById("restartButton");

var firstCard;
var secondCard;
let noFlips = true;

var timer;

window.onload = function() {
    rButton.style.display = "none";

    shuffleCards();
}
    
function startGame() {
    
    unlockCards();

    //remove start button
    sButton.style.display = "none";

    //add restart button
    rButton.style.display = "block";
        
    //add timer to screen
    document.getElementById("timeCounter").innerHTML = time;

    //timer
    timer = setInterval(function() {

        if (time > 0) {
            time-=.01;
        }
        else {
            gameOver();
        }
        document.getElementById("timeCounter").innerHTML = time === null ? "" : time.toFixed(2);
    }, 10)

    //add matches
    document.getElementById("matchesCounter").innerHTML = matches;
}

function restartGame() {
    location.reload();
}

function gameOver() {

    lockCards();

    document.getElementById("timeLabel").innerHTML = matches != 6 ? "Game Over!" : "You Win!";
    time = null;

    setTimeout(() => {
        cards.forEach(card => card.classList.add('flip'));
    }, 1000);
}

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
    
    console.log(firstCard);
    console.log(secondCard);

    checkCards();
}

const cards = document.querySelectorAll('.gameCards');

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

function checkCards() {

    if (firstCard != null && secondCard != null) {

        lockCards();
        if (firstCard.getElementsByTagName("img")[0].src === secondCard.getElementsByTagName("img")[0].src) {
            matches++;

            document.getElementById("matchesCounter").innerHTML = matches;

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
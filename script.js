var time = 30;
var matches = 0;

var sButton = document.getElementById("startButton");
var rButton = document.getElementById("restartButton");

window.onload = function() {
    rButton.style.display = "none";

    shuffleCards();
}
    
function startGame() {
    
    //remove start button
    sButton.style.display = "none";

    //add restart button
    rButton.style.display = "block";
        
    //add timer to screen
    document.getElementById("timeCounter").innerHTML = time;

    //timer
    setInterval(function() {
        if (time > 0) {
            time--;
        }
        else {
            gameOver();
        }
        document.getElementById("timeCounter").innerHTML = time;
    }, 1000)

    //add matches
    document.getElementById("matchesCounter").innerHTML = matches;
}

function restartGame() {
    
}

function gameOver() {
    
}

function flipCard() {
    this.classList.add('flip');
}

const cards = document.querySelectorAll('.gameCards');

cards.forEach(card => card.addEventListener('click', flipCard));

function shuffleCards() {

    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
}
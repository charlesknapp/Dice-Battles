let scores, roundScore, activePlayer;
let gamePlaying = true;

// Disable right-click
document.addEventListener('contextmenu', event => event.preventDefault());

// Prompt user for nick name
function getPlayerName(playerName) {
    playerName = prompt("Please enter your nickname");
}

// document.querySelector(".opponent-1-cards").style.visibility = "hidden";
// document.querySelector(".opponent-2-cards").style.visibility = "hidden";

// Init all audio sources
const bgAudio = new Audio("https://cadogy.com/audio/bg-music.mp3");
const cardAudio = new Audio("https://cadogy.com/audio/card-flip.mp3")
const tickingAudio = new Audio("https://cadogy.com/audio/clock-ticking.mp3");
const holdAudio = new Audio("https://cadogy.com/audio/game-hold.mp3");
const resetAudio = new Audio("https://cadogy.com/audio/reset-sound.mp3");
const winAudio = new Audio("https://cadogy.com/audio/game-win.mp3");
const failAudio = new Audio("https://cadogy.com/audio/fail-roll.mp3");

init();
// Start background music
bgAudio.play();
bgAudio.volume = 0.03;
bgAudio.loop = true;

// Stop Audio Button
document.getElementById('stopButton').addEventListener('click', () => {
    if (bgAudio.paused) {
        bgAudio.play();
      }
      else {
        bgAudio.pause();
      }
  });

// Card hover sound effects
document.querySelector(".card-1").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;

    document.querySelector(".card-1").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})
document.querySelector(".card-2").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;

    document.querySelector(".card-2").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})
document.querySelector(".card-3").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;

    document.querySelector(".card-3").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})
document.querySelector(".card-4").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;

    document.querySelector(".card-4").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})
document.querySelector(".card-5").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;
    
    document.querySelector(".card-4").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})
document.querySelector(".card-6").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;

    document.querySelector(".card-4").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})
document.querySelector(".card-7").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;

    document.querySelector(".card-4").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})
document.querySelector(".card-8").addEventListener("mouseover", function() {
    cardAudio.play();
    cardAudio.volume = 0.1;

    document.querySelector(".card-4").addEventListener("mouseout", function() {
        cardAudio.pause();
        sound.currentTime = 0;
    })
})

document.querySelector(".btn-roll").addEventListener("click", function(){
    if(gamePlaying) {
        // 1. Get the random number
        let dice = Math.floor((Math.random() * 6)) + 1;

        // 2. Display the result
        let diceDOM = document.querySelector(".dice");
        // diceDOM.classList.add("animate__animated");
        // diceDOM.classList.add("animate__shakeX");
        diceDOM.style.display = "block";
        diceDOM.src = "/assets/img/dice-" + dice + "-dark.png";


        // 3. Update the roundScore, but only if that's not 1
        if(dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

        } else {
            // Next player
            failAudio.play();
            failAudio.volume = 0.4;
            nextPlayer()
        }
    }
});
document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
        // Add currentScore to globalScore
        scores[activePlayer] += roundScore;

        // Update the UI to show the globalScore
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // Play holding audio
        holdAudio.play();
        holdAudio.volume = 0.3;

        // Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            winAudio.play();
            winAudio.volume = 0.4;
            gamePlaying = false;
        } else {
            nextPlayer()
        }
    }
})

// GAME BUTTON AUDIO
const rollAudio = new Audio("https://cadogy.com/audio/game-click.mp3");
const buttons = document.querySelectorAll(".btn-roll");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    rollAudio.play();
    rollAudio.volume = 0.4;
  });
});

function nextPlayer() {
    //Next player with ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){

    $(window).on('load', function () {
        $('#loading').hide();
      }) 

    resetAudio.play();
    resetAudio.volume = 0.4;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.btn-names').addEventListener('click', function() {
        player1Name = prompt("Please enter the first player's name");
        player2Name = prompt("Please enter the second player's name");

        document.getElementById("name-0").textContent = player1Name;
        document.getElementById("name-1").textContent = player2Name;
    })
    // document.querySelector("#current-" + activePlayer).textContent = dice;
    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Waiting for opponent...";
    document.getElementById("name-1").textContent = "Waiting for opponent...";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");
}

// Clicking for instructions
document.querySelector(".instructions").addEventListener("click", function(){
        document.querySelector(".modal").classList.add("show");
        document.querySelector(".close").addEventListener("click", function(){
            document.querySelector(".modal").classList.remove("show");
    });
});

let scores, roundScore, activePlayer;
let gamePlaying = true;

// Prompt user for nick name
function getPlayerName(playerName) {
    playerName = prompt("Please enter your nickname");
}

// Stop Audio Button
document.getElementById('stopButton').addEventListener('click', () => {
    if (bgAudio.paused) {
        bgAudio.play();
      }
      else {
        bgAudio.pause();
      }
  });

// Init all audio sources
const bgAudio = new Audio("https://cadogy.com/audio/bg-music.mp3");
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
    resetAudio.play();
    resetAudio.volume = 0.4;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    // document.querySelector("#current-" + activePlayer).textContent = dice;
    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "OPPONENT 1";
    document.getElementById("name-1").textContent = "OPPONENT 2";
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

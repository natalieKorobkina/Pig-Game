let currentPlayer = 1;
const rollButton = document.querySelector('.btn-roll');
const dice1 = document.querySelector('.dice1');
const dice2 = document.querySelector('.dice2');
const player1Current = document.getElementById('current-0');
const player2Current = document.getElementById('current-1');
const holdButton = document.querySelector('.btn-hold');
const player1Score = document.getElementById('score-0');
const player2Score = document.getElementById('score-1');
const newGameButton = document.querySelector('.btn-new');
const player1Panel = document.querySelector('.player-0-panel');
const player2Panel = document.querySelector('.player-1-panel');

let currentRoundScore = 0;
let player1Total = 0;
let player2Total = 0;
let gameOver = false;

const random = function() {
    return Math.floor((Math.random() * 6) + 1);
}

newGameButton.addEventListener('click', function(){
    currentRoundScore = 0;
    player1Total = 0;
    player2Total = 0;
    gameOver = false;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    document.getElementById('name-0').textContent = "PLAYER 1"
    document.getElementById('name-1').textContent = "PLAYER 2"
});

rollButton.addEventListener('click', function(e) {
    if(!gameOver) {
        const random1 = random();
        const random2 = random();

        dice1.src = `dice-${random1}.png`;
        dice2.src = `dice-${random2}.png`;

        if(random1 === 1 || random2 === 1) {
            if(currentPlayer === 1) {
                player1Current.textContent = 0;
                player1Panel.classList.toggle('active');
                player2Panel.classList.toggle('active');
                currentPlayer = 2;
            } else {
                player2Current.textContent = 0;
                player1Panel.classList.toggle('active');
                player2Panel.classList.toggle('active');
                currentPlayer = 1;
            }
        } else {
            currentRoundScore += random1 + random2;
            if(currentPlayer === 1){
                player1Current.textContent = currentRoundScore;
            } else {
                player2Current.textContent = currentRoundScore;
            } 
        }
    }
});

holdButton.addEventListener('click', function() {
    if(!gameOver) {
 

        if(currentPlayer === 1) {
            player1Total += currentRoundScore;
            player1Current.textContent = 0;
            player1Score.textContent = player1Total;
            currentRoundScore = 0;

            if(player1Total >= 100) {
              document.getElementById('name-0').textContent = "WINNER!!!"
              gameOver = true;
            } else {
                player1Panel.classList.toggle('active');
                player2Panel.classList.toggle('active');
                currentPlayer = 2;
            }

        } else {
            player2Total += currentRoundScore;
            player2Current.textContent = 0;
            player2Score.textContent = player2Total;
            currentRoundScore = 0;

            if(player2Total >= 100) {
              document.getElementById('name-1').textContent = "WINNER!!!"
              gameOver = true;
            } else {
                player1Panel.classList.toggle('active');
                player2Panel.classList.toggle('active');
                currentPlayer = 1;
            }
        }
    }
});
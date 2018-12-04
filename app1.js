/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
let sumCur = 0;
let sumScore = 0;
let player = 0;
let winpoints = document.querySelector (`.input-points`);
let flag = true;
document.getElementById ('dices').hidden = true;
//random numbers generator (1-6)
function randomIndPic () {
    return Math.floor(Math.random ()*6) + 1;
};
//switch between players
function switchPlayers () {
    document.getElementById ('dices').hidden = true;
    document.querySelector ('.player-0-panel').classList.toggle ('active');
    document.querySelector ('.player-1-panel').classList.toggle ('active');
    if (player === 1) {
        player = 0;
    } else {
        player = 1;
    }
    document.getElementById ('forDice1').style.border = "thin none #555";
    document.getElementById ('forDice2').style.border = "thin none #555";
    flag = true;
};
function start () {
    sumCur = 0;
    sumScore = 0;
    player = 0;
    document.getElementById (`current-${player}`).textContent = sumCur;
    document.getElementById (`score-${player}`).textContent = sumScore;
    document.getElementById (`current-${player+1}`).textContent = sumCur;
    document.getElementById (`score-${player+1}`).textContent = sumScore; 
    document.querySelector ('.player-0-panel').classList.add ('active');
    document.querySelector ('.player-1-panel').classList.remove ('active');
    document.getElementById ('dices').hidden = true;
};

//when Roll Dice buton is clicked
//and not delay beetwen switch
if (flag) {
document.querySelector ('.btn-roll').addEventListener ('click', function (e) {
document.getElementById ('dices').hidden = false;
let num1 = randomIndPic ();
let num2 = randomIndPic ();
document.getElementById ('forDice1').src = `dice-${num1}.png`;
document.getElementById ('forDice2').src = `dice-${num2}.png`;
//if rolls not 1
if (num1 != 1 && num2 !=1) { 
    sumCur = num1 + num2;
    sumScore += sumCur;
    document.getElementById (`current-${player}`).textContent = sumCur;
    document.getElementById (`score-${player}`).textContent = sumScore;  
} else { // if rolls  1
    sumScore = 0; 
    sumCur = 0;
    document.getElementById (`current-${player}`).textContent = sumCur;
    document.getElementById (`score-${player}`).textContent = sumScore; 
    if (num1 === 1) {
            document.getElementById ('forDice1').style.border = "thick solid #FF0000";
    } else {
        document.getElementById ('forDice2').style.border = "thick solid #FF0000";
    }
//switch to another player
    flag = false;
    setTimeout(switchPlayers, 2000);  // add delay!
};
// end of game
if (sumScore >= winpoints) {
    window.alert ('You win. End of game.');
    start ();
}
});
// when Hold pressed
document.querySelector ('.btn-hold').addEventListener ('click', function (e) {
   switchPlayers (); 
});
//when New game pressed
document.querySelector ('.btn-new').addEventListener ('click', function (e) {
    start();
});
};


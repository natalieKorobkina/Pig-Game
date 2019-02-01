let sumCur = 0;
let sumScore1 = 0;
let sumScore2 = 0;
let player = 0;
let winpoints = document.querySelector (`.input-points`);
let flag = true;
let dice1 = document.getElementById ('forDice1');
let dice2 = document.getElementById ('forDice2');
let panelPlayer1 = document.querySelector ('.player-0-panel');
let panelPlayer2 = document.querySelector ('.player-1-panel');
document.getElementById ('dices').hidden = true;
let countGames1 = 0;
let countGames2 = 0;
let counGames = 1;
swal({
    title: 'GAME RULES:',
    html:
    '<ul style = "list-style:none;">' + 
    '<li>The game has 2 players, playing in rounds </li>' +
    '<li>In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score </li>'+
    '<li>If the player rolls a 1, all his ROUND score gets lost. After that, it`s the next player`s turn </li>' +
    '<li>The player can choose to `Hold`, which means that his ROUND score gets added to his GLOBAL score. </li>' + 
    '<li>After that, it`s the next player`s turn </li>'+
    '<li>The first player to reach winning points on GLOBAL score wins the game </li>' +
    '<li>Players can set a number of games to win and the final score </li> </ul>',
    imageUrl: 'img/43530034-cute-pig-cartoon.jpg',
    imageWidth: 250,
    imageHeight: 200,
    imageAlt: 'Pig image',
    animation: false,
    width: "600px",
    heightAuto: false
})
//random numbers generator (1-6)
function randomIndPic () {
    return Math.floor(Math.random ()*6) + 1;
};
//switch between players
function switchPlayers () {
    if (player === 0) {
        sumScore1 += sumCur;  
    } else {
        sumScore2 += sumCur;   
    }
    document.getElementById (`score-0`).textContent = sumScore1;  
    document.getElementById (`score-1`).textContent = sumScore2; 
    sumCur = 0;
    document.getElementById (`current-0`).textContent = 0;
    document.getElementById (`current-1`).textContent = 0;
    document.getElementById ('dices').hidden = true;
    panelPlayer1.classList.toggle ('active');
    panelPlayer2.classList.toggle ('active');
    if (player === 1) {
        player = 0;
    } else {
        player = 1;
    }
    dice1.style.border = "initial";
    dice2.style.border = "initial";
    flag = true;
};
function start () {
    sumCur = 0;
    sumScore1 = 0;
    sumScore2 = 0;
    player = 0;
    document.getElementById (`current-0`).textContent = 0;
    document.getElementById (`score-0`).textContent = 0;
    document.getElementById (`current-1`).textContent = 0;
    document.getElementById (`score-1`).textContent = 0; 
    panelPlayer1.classList.add ('active');
    panelPlayer2.classList.remove ('active');
    panelPlayer1.classList.remove (`winner`);
    panelPlayer2.classList.remove (`winner`);
    document.getElementById ('dices').hidden = true;
    flag = true;
    
};
//when Roll Dice buton is clicked
//and not delay beetwen switch
document.querySelector ('.btn-roll').addEventListener ('click', function (e) {
if (flag) {
document.getElementById ('dices').hidden = false;
let num1 = randomIndPic ();
let num2 = randomIndPic ();
dice1.src = `img/dice-${num1}.png`;
dice2.src = `img/dice-${num2}.png`;
//if rolls not 1
if (num1 != 1 && num2 !=1) { 
    sumCur += num1 + num2;
    document.getElementById (`current-${player}`).textContent = sumCur;
} else { // if rolls  1
    sumCur = 0;
    if (player === 0) {   
        swal({
            heightAuto: false,
            position: 'top-start',
            type: 'error',
            title: 'Oops...It is 1. You lost your score!',
            showConfirmButton: false,
            timer: 1000
          })
    } else {    
        swal({
            heightAuto: false,
            position: 'top-end',
            type: 'error',
            title: 'Oops...It is 1.You lost your score!',
            showConfirmButton: false,
            timer: 1000
          })
    }   
    document.getElementById (`current-${player}`).textContent = sumCur;
    if (num1 === 1) {
        dice1.style.border = "thick solid #FF0000";
    } 
    if (num2 === 1) {
        dice2.style.border = "thick solid #FF0000";
    }
//switch to another player
    flag = false;
    setTimeout(switchPlayers, 2000);  // adds delay
};
// end of game
if (document.getElementById ('games1').checked) {
    counGames = 1;
} else if (document.getElementById ('games3').checked) {
    counGames = 2;
}  else {
    counGames = 3; 
}
    if (player === 0 && (sumScore1 + sumCur) >= document.getElementById (`winpoints`).value) {
        sumScore1 += sumCur;
        document.getElementById (`score-0`).textContent = sumScore1; 
        countGames1++;
        if  (countGames1 === counGames) {
            panelPlayer1.classList.add ('winner');
        swal({
            heightAuto: false,

            position: 'top-start',
            title: 'Congratulations! You are the winner',
            showConfirmButton: false,
            timer: 4000
          })
        flag = false;
        setTimeout (start, 8000);
        countGames1 = 0;
        document.querySelector (".star-pl1").textContent ="";
        document.querySelector (".star-pl2").textContent ="";
        } else {
            document.querySelector (".star-pl1").insertAdjacentHTML ("afterbegin",`<span class="fa fa-star "></span>`);
            swal({
                heightAuto: false,
                position: 'top-start',
                title: 'You win this game',
                showConfirmButton: false,
                timer: 1000
              });
            setTimeout (start, 2000); 

        }
    };
    if (player === 1 && (sumScore2 + sumCur) >= document.getElementById (`winpoints`).value) {
        sumScore2 += sumCur;
        document.getElementById (`score-1`).textContent = sumScore2; 
        countGames2++;
        if (countGames2 === counGames) {
           panelPlayer2.classList.add ('winner');
        swal({
            heightAuto: false,
            position: 'top-end',
            //type: 'info',
            title: 'Congratulations! You are the winner',
            showConfirmButton: false,
            timer: 4000
          })
        flag = false;
        countGames2 = 0;
        setTimeout (start, 8000);
        document.querySelector (".star-pl1").textContent =""; 
        document.querySelector (".star-pl2").textContent =""; 
        } else {
            document.querySelector (".star-pl2").insertAdjacentHTML ("afterbegin",`<span class="fa fa-star "></span>`);
            swal({
                heightAuto: false,
                position: 'top-end',
                title: 'You win this game',
                showConfirmButton: false,
                timer: 1000
              });
              setTimeout (start, 2000); 
              
              
        }
    }; 
    
};
});
// Hold pressed
document.querySelector ('.btn-hold').addEventListener ('click', function (e) {
    switchPlayers (); 
});
// New game button pressed
document.querySelector ('.btn-new').addEventListener ('click', function (e) {
    start();
});
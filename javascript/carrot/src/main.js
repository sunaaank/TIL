'use strict'
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js'
import Game from './game.js'

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

// const gameBtn = document.querySelector(".start");
// const gameTimer = document.querySelector(".timer");
// const gameScore = document.querySelector(".score");


// let isStart = false;
// let score = 0;
// let timer = undefined;

const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, );
game.setGameStopListner((reason)=> {
  console.log(reason)
})



// gameBtn.addEventListener('click', () => {
//   console.log("click!")
//   if(isStart){
//     stopGame()
//   } else {
//     startGame();
//   }
// })


// function initGame() {
//   gameField.init();
//   score = 0;
//   gameScore.textContent = CARROT_COUNT;
//   startGameTimer();
// }

// function startGame() {
//   isStart = true;
//   initGame();
//   displayGameButton("show")
//   showTimerAndScore();
//   sound.playBackground();
// }

// function stopGame() {
//   isStart = false;
//   stopGameTimer()
//   displayGameButton("hide")
//   gameFinishBanner.showWithText("Play Again!🎈")
//   sound.playBug();
//   sound.stopBackground();
// }

// function finishGame(status) {
//   isStart = false;
//   displayGameButton("hide")
//   if(status === "win") {
//     sound.playWin();
//     gameFinishBanner.showWithText("YOU WIN!🎉")
//   } else if(status === "gameover") {
//     sound.playAlert();
//     gameFinishBanner.showWithText("YOU LOSE!🐧")
//   }
//   sound.stopBackground();
// }

// function displayGameButton(show) {
//   const isShow = show === "show" ? 1 : 0 
//   gameBtn.style.visibility = isShow ? "visible" : 'hidden';
//   gameBtn.textContent = isShow ? "⬛" : "▶";
// }

// function showTimerAndScore() {
//   gameTimer.style.visibility = "visible"
//   gameScore.style.visibility = "visible"
// }


// function onItemClick(item) {
//   if(!isStart){
//     return;
//   }

//   if(item === 'carrot') {
//     console.log("onItemClick carrot")
//     score++;
//     updateScoreBoard();

//     if(score === CARROT_COUNT) {
//       stopGameTimer()
//       finishGame("win")
//       return;
//     } 

//   } else if(item === 'bug') {
//     stopGameTimer();
//     stopGame("gameover");
//   }
// }

// function playSound(sound){
//   sound.currentTime = 0;
//   sound.play();
// }

// function stopSound(sound){
//   sound.pause();
// }

// function updateScoreBoard() {
//   gameScore.textContent = CARROT_COUNT - score;
// }

// function startGameTimer() {
//   let remainingTimeSec = GAME_DURATION_SEC;
//   updateTimerText(remainingTimeSec);
//   timer = setInterval(function(){
    
    
//     if(remainingTimeSec < 0) {
//       clearInterval(timer)
//       finishGame("gameover")
//       return;
//     }
//     updateTimerText(remainingTimeSec--);
//   }, 1000);
// }

// function stopGameTimer() {
//   clearInterval(timer)
// }

// function updateTimerText(time){
//   const min = Math.floor(time/60);
//   const sec = time % 60;
//   gameTimer.textContent = `${min}:${sec}`;
// }

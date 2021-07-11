'use strict'
import * as sound from './sound.js'
import PopUp from './popup.js';
import Field from './field.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector(".start");
    this.gameTimer = document.querySelector(".timer");
    this.gameScore = document.querySelector(".score");
    this.gameBtn.addEventListener('click', () => {
      console.log("click!")
      if(this.isStart){
        this.stop()
      } else {
        this.start();
      }
    })

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.gameFinishBanner = new PopUp();
    this.gameFinishBanner.setClickListener(() => {
    this.start();
    })

    this.isStart = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    if(!this.isStart){
      return;
    }
  
    if(item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
  
      if(this.score === this.carrotCount) {
        this.stopGameTimer();
        this.finish("win");
        return;
      } 
  
    } else if(item === 'bug') {
      this.stopGameTimer();
      this.stop("gameover");
    }
  }

  init() {
    this.gameField.init();
    this.score = 0;
    this.gameScore.textContent = this.carrotCount;
    this.startGameTimer();
  }

  start() {
    this.isStart = true;
    this.init();
    this.displayGameButton("show")
    this.showTimerAndScore();
    sound.playBackground();
  }
  
  stop() {
    this.isStart = false;
    this.stopGameTimer()
    this.displayGameButton("hide")
    this.gameFinishBanner.showWithText("Play Again!🎈")
    sound.playBug();
    sound.stopBackground();
  }

  finish = (status) => {
    this.isStart = false;
    this.displayGameButton("hide")
    if(status === "win") {
      sound.playWin();
      this.gameFinishBanner.showWithText("YOU WIN!🎉")
    } else if(status === "gameover") {
      sound.playAlert();
      this.gameFinishBanner.showWithText("YOU LOSE!🐧")
    }
    sound.stopBackground();
  }

  displayGameButton(show) {
    const isShow = show === "show" ? 1 : 0 
    this.gameBtn.style.visibility = isShow ? "visible" : 'hidden';
    this.gameBtn.textContent = isShow ? "⬛" : "▶";
  }
  
  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible"
    this.gameScore.style.visibility = "visible"
  }
  
  
  updateScoreBoard() {
  this.gameScore.textContent = this.carrotCount - this.score;
}

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(function(){
      if(remainingTimeSec < 0) {
        clearInterval(this.timer)
        this.finish("gameover")
        return;
      }
      this.updateTimerText(remainingTimeSec--);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer)
  }

  updateTimerText = (time) => {
    const min = Math.floor(time/60);
    const sec = time % 60;
    this.gameTimer.textContent = `${min}:${sec}`;
  }


}
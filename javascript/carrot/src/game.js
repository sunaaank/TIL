'use strict'
import * as sound from './sound.js'
import { Field, ItemType } from './field.js';

export const Reason = Object.freeze({win: "win", retry: "retry", gameover: "gameover"});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game (
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    )
  }
}

class Game {
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
        this.stop(Reason.retry)
      } else {
        this.start();
      }
    })

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

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
  
    if(item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
  
      if(this.score === this.carrotCount) {
        this.stopGameTimer();
        this.stop(Reason.win);
        return;
      } 
  
    } else if(item === ItemType.bug) {
      this.stopGameTimer();
      this.stop(Reason.gameover);
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

  stop = (reason) => {
    this.isStart = false;
    this.stopGameTimer()
    this.displayGameButton("hide")
    this.onGameStop && this.onGameStop(reason)
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
    this.timer = setInterval(() => {
      if(remainingTimeSec < 0) {
        clearInterval(this.timer)
        this.stop(Reason.gameover)
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
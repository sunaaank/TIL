'use strict'
const ITEM_SIZE = 50;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

const field = document.querySelector(".gamefield");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".start");
const gameTimer = document.querySelector(".timer");
const gameScore = document.querySelector(".score");
const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".message");
const resetBtn = document.querySelector(".restart");

const carrotSound = new Audio('./sound/carrot_pull.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')
const winSound = new Audio('./sound/game_win.mp3')

let isStart = false;
let score = 0;
let timer = undefined;


field.addEventListener('click', (e) => onFieldClick(e));

gameBtn.addEventListener('click', () => {
  console.log("click!")
  if(isStart){
    stopGame()
  } else {
    startGame();
  }
})

resetBtn.addEventListener('click', () => {
  console.log("reset!");
  displayPopUp("off");
  startGame();
})

function initGame() {
  resetState();
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
  startGameTimer();
}

function resetState() {
  field.innerHTML = "";
  gameScore.textContent = 5;
  score = 0;
  timer = undefined;
}

function addItem(className, count, imgPath){
  const widthXfrom = 0
  const widthXTo = fieldRect.width - ITEM_SIZE
  const widthYfrom = 0
  const widthYTo = fieldRect.height - ITEM_SIZE

  let id = 1;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img')
    item.setAttribute('alt', className)
    item.setAttribute('class', className)
    item.setAttribute('src', imgPath)
    item.style.position = 'absolute'
    const positionX = randomInt(widthXfrom, widthXTo);
    const positionY = randomInt(widthYfrom, widthYTo);
    item.style.transform = `translate(${positionX}px, ${positionY}px)`
    field.appendChild(item)
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function startGame() {
  isStart = true;
  initGame()
  displayGameButton("show")
  displayPopUp("off");
  showTimerAndScore();
  playSound(bgSound)
}

function stopGame() {
  isStart = false;
  stopGameTimer()
  displayGameButton("hide")
  displayPopUp("on", "Play Again!🎈");
  playSound(bugSound) 
  stopSound(bgSound)
}

function finishGame(status) {
  isStart = false;
  displayGameButton("hide")
  if(status === "win") {
    playSound(winSound)
    displayPopUp("on", "YOU WIN!🎉")
  } else if(status === "gameover") {
    playSound(alertSound)
    displayPopUp("on", "YOU LOSE!💥");
  }
  stopSound(bgSound)
}

function displayGameButton(show) {
  const isShow = show === "show" ? 1 : 0 
  gameBtn.style.visibility = isShow ? "visible" : 'hidden';
  gameBtn.textContent = isShow ? "⬛" : "▶";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible"
  gameScore.style.visibility = "visible"
}

function displayPopUp(mode, message) {
  if(mode === "on"){
    popupMessage.textContent = `${message}`
    popup.classList.remove("popup-hide")
  } else {
    popup.classList.add("popup-hide")
  }
}

function onFieldClick(e) {
  if(!isStart){
    return;
  }

  const target = e.target;

  if(target.matches('.carrot')) {
    console.log("carrot!")
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();

    if(score === CARROT_COUNT) {
      stopGameTimer()
      finishGame("win")
      return;
    } 

  } else if(target.matches('.bug')) {
    console.log("bug!")
    stopGameTimer();
    stopGame("gameover");
  }

}

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}



function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score;
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(function(){
    
    
    if(remainingTimeSec < 0) {
      clearInterval(timer)
      finishGame("gameover")
      return;
    }
    updateTimerText(remainingTimeSec--);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer)
}

function updateTimerText(time){
  const min = Math.floor(time/60);
  const sec = time % 60;
  gameTimer.textContent = `${min}:${sec}`;
}

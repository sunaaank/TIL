'use strict'
const field = document.querySelector(".gamefield");
const fieldRect = field.getBoundingClientRect();

function initGame() {
  addItem('carrot', 5, 'img/carrot.png')
  addItem('bug', 5, 'img/bug.png')
}

function addItem(className, count, imgPath){
  const ITEM_SIZE = 50
  const widthXfrom = 0
  const widthXTo = fieldRect.width - ITEM_SIZE
  const widthYfrom = 0
  const widthYTo = fieldRect.height - ITEM_SIZE

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img')
    item.setAttribute('alt', className)
    item.setAttribute('class', `gatcha ${className}`)
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

initGame()
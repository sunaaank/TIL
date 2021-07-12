'use strict'
import * as sound from './sound.js'

const ITEM_SIZE = 50;
export const ItemType = Object.freeze({carrot: "carrot", bug: "bug"})

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".gamefield");
    this.fieldRect = this.field.getBoundingClientRect();
    
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png');
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath){
    const widthXfrom = 0
    const widthXTo = this.fieldRect.width - ITEM_SIZE
    const widthYfrom = 0
    const widthYTo = this.fieldRect.height - ITEM_SIZE
  
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img')
      item.setAttribute('alt', className)
      item.setAttribute('class', className)
      item.setAttribute('src', imgPath)
      item.style.position = 'absolute'
      const positionX = randomInt(widthXfrom, widthXTo);
      const positionY = randomInt(widthYfrom, widthYTo);
      item.style.transform = `translate(${positionX}px, ${positionY}px)`
      this.field.appendChild(item)
    }
  }

  onClick = (e) => {
    const target = e.target;

    if(target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
'use strict'

export default class PopUp {
  constructor() {
    this.popup = document.querySelector(".popup");
    this.popupMessage = document.querySelector(".message");
    this.resetBtn = document.querySelector(".restart");
    this.resetBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    })
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popup.classList.add("popup-hide");
  }

  showWithText(message) {
    this.popupMessage.textContent = `${message}`
    this.popup.classList.remove("popup-hide")
  }
}
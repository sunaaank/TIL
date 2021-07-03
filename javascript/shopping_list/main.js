
// input창에서 엔터치면
// 입력한 값이 .card-list에 id 번호 달고 .card로 추가됨

// 삭제버튼 누르면 해당 id의 card 삭제 됨

const cards = document.querySelector('.cards')
const input = document.querySelector('.footerInput')
const addBtn = document.querySelector('.submitBtn')

function onReset() {
  input.value = "";
} 

function onAdd() {
  const text = input.value
  if (text === " ") {
    onReset()
    return;
  }

  const card = createCard(text)
  cards.appendChild(card)
  card.scrollIntoView({ block: 'center' })
  onReset()
  input.focus();
}

function createCard(text) {
  let id = 0;
  const card = document.createElement('li')
  card.setAttribute('class', 'card')
  card.setAttribute('data-id', id)
  card.innerHTML = `
          <p>${text}</p>
          <div class="btns">
            <button class="likeBtn" data-id=${id}>🤍
            </button>
            <button class="deleteBtn">
              <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
          </div>`
  id++;
  return card
}

addBtn.addEventListener('click', () => {
  onAdd()
})

input.addEventListener('keypress', () => {
  if (window.event.keyCode == 13) {
    console.log("💥💥💥💥")
    onAdd()
  }
})

cards.addEventListener('click', (event) => {
  const id = event.target.dataset.id
  if(id) {
    const toBeDeleted = document.querySelector(`.card[data-id="${id}"]`)
    toBeDeleted.remove();
  }
})

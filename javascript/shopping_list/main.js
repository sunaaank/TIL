
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
  const card = document.createElement('li')
  card.setAttribute('class', 'card')
  const p = document.createElement('p')
  p.innerText = text;
  const btns = document.createElement('div')
  btns.setAttribute('class', 'btns')
  const likeBtn = document.createElement('button')
  likeBtn.setAttribute('class', likeBtn) 
  likeBtn.innerHTML = `💖`
  const deleteBtn = document.createElement('button')
  deleteBtn.setAttribute('class', deleteBtn) 
  deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
  deleteBtn.addEventListener('click', () => {
    cards.removeChild(card)
  })

  card.appendChild(p)
  card.appendChild(btns)
  btns.appendChild(likeBtn)
  btns.appendChild(deleteBtn)
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

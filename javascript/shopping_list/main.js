
// input창에서 엔터치면
// 입력한 값이 .card-list에 id 번호 달고 .card로 추가됨

// 삭제버튼 누르면 해당 id의 card 삭제 됨

const input = document.querySelector('.list-input')


function addCard() {
  const currentValue = input.value
  const ul = document.querySelector('.card-list')
  const li = document.createElement('li')
  li.setAttribute('class', 'card')
  li.innerHTML = `
      <p>${currentValue}</p>
      <div class="btns">
        <button class="like-card">💖</button>
        <button class="delete-card">❌</button>
      </div>
  `
  ul.appendChild(li)
  input.value = "";
}

function handleSubmit() {
  if (window.event.keyCode == 13) {
      console.log("💥💥💥💥")
      addCard()
    }
}
let title = document.querySelector("#title");

// 방법1
if(title != null) title.innerHTML = "narrowing 1"


// 방법2 - 가장 많이 씀
if(title instanceof Element) {
  title.innerHTML = "narrowing 2"
}

// 방법3 - 왼쪽 요소가 Element 타입이라고 확정(as 키워드). 비상시나 백프로 확신할 때 쓰지만 잘 쓰지 않음

let title2 = document.querySelector("#title") as Element
title2.innerHTML = "narrowing 3"

// 방법4 - 옵셔널체이닝(?.) title이 있으면 출력, 없으면 undefined 
if(title?.innerHTML) {
  title.innerHTML = "narrowing 4"
}

// 방법4 - tsconfig.json
// stric 모드를 false로 하면 narrowing 없이 쓸 수 있음

/* {
  "compierOptions": {
    "target": "es5",
    "module": "commonjs",
    "strictNullChecks": true
  }
} */

// 방법2 응용: Element Type =(상속)=> HTMLAnchorElement || HTMLHeadingElement || HTMLButtonElement || HTMLImageElement... 
// 정확히 narrowing을 해주어야 세부 속성을 정의해줄 수 있음
let link = document.querySelector(".link");
if(link instanceof HTMLAnchorElement) {
  link.href = "https://naver.com"
}

// 방법4 응용: 이벤트리스너
let button = document.querySelector(".button");
button?.addEventListener("click", function() {
})
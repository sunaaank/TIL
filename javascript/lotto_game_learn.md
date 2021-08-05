# 💎 [Vanila JS] 로또게임을 만들며 새로 학습한 것들

이번에 로또 게임을 Vanila JS로 만들어보며 새로 써본 것들을 정리해본다.
로또 넘버를 어떤 객체의 상태로 가지게 할 것인지, 그 상태값의 관리는 어떻게 할 것인지 등에 대한 고민을 했다.

## ✨ 반복되는 document.querySelector 줄여쓰기

> [MDN: document.querySelector(selector)](https://developer.mozilla.org/ko/docs/Web/API/Document/querySelector)

util 함수를 만들어두면 Vanila JS에서 DOM 조작을 위해 반복적으로 쓰는 코드를 줄여 생산성을 높일 수 있다.

### parent: document

- `querySelector(selector)`는 선택자를 만족하는 문서 내 첫번째 요소를 반환해준다
- 만약 선택자를 만족하는 모든 요소의 목록이 필요하다면 `querySelectorAll(selectors)`를 사용하는 함수를 추가해준다

```js
export const $ = selector => document.querySelector(selector);
export const $$ = selectors => document.querySelectorAll(selectors);
...
const $button = $(".button")
const $buttons = $$(".button")
```

### document이외에도 parent 직접 지정해서 사용

- 편리하지만 매번 selector를 적어주려면 번거롭다는 단점이 있다.
- 문서 전체에서 검색하는 경우를 기본값으로 지정해 parent는 생략해줄 수 있다.

```js
export const $ = ({ selector, parent = document }) =>  parent.querySelector(selector);
...
const $purchaseForm = $({ selector: '[data-component = "purchase-form"]', parent: $el })
```

## ✨ 이벤트 위임 활용하기 + 장애물 처리하기

> [이벤트 위임](https://ko.javascript.info/event-delegation)

- 이벤트 위임은 비슷한 방식으로 여러 요소를 다뤄야 할 때 사용할 수 있다. 성능과 유지보수에 좋다.
- 이벤트 위임을 사용하면 요소마다 직접 핸들러를 할당하지 않고, 요소의 공통 조상에 이벤트 핸들러를 단 하나만 할당해도 여러 하위 요소를 한꺼번에 다룰 수 있다.

아래와 같은 화면에서 close버튼과 reset버튼에 클릭이벤트를 주고자 한다.

```html
// modal components: close 버튼, reset 버튼
<div class="modal">
  <button type="button" class="modal-close" data-action="close-modal">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>

  // ...
  <button
    type="button"
    class="btn btn-cyan reset-btn"
    data-action="reset-lotto"
  >
    다시 시작하기
  </button>
</div>
```

### element.closest(selector) 활용하기

element.closest(selector) 메서드는 element의 상위 요소 중 selector와 일치하는 가장 근접한 조상 요소를 반환한다. 이벤트가 발생한 요소부터 시작해 위로 올라가며 가장 가까운 selector 요소를 찾는다.

```js
// ...
$el.addEventListener("click", e => {
  if (e.target.closest(".modal-close")) {
    onCloseModalClick();
    console.log("close");
    return;
  }

  if (e.target.closest(".reset-btn")) {
    console.log("restart");
    return;
  }
}

// ...
```

### dataset 활용하기

클릭 이벤트핸들러를 걸어줄 버튼의 html에 dataset을 추가해준다.
여기서는 각 버튼에 `data-action="close-modal"`, `data-action="reset-lotto"`를 추가해준다.

```js
$el.addEventListener("click", e => {
  switch (e.target.dataset.action) {
    case "close-modal":
      return console.log("close");

    case "reset-lotto":
      return console.log("reset");
  }
}
```

#### 자식 태그의 이벤트 막기

위와 같이 구현하면, close 버튼 내 `svg 태그`를 클릭할 경우 의도한 이벤트가 동작하지 않는다. 버튼 내 자식 태그들의 이벤트를 막아주어야 한다.
버튼이 가진 자식 태그들의 이벤트를 막기 위해서는 JS로 처리하는 방법과, CSS로 처리하는 방법이 있다. 여기서는 CSS로 처리해보자.

```js
.close-modal > svg {
  pointer-events: none;
}
```

자식 태그에게 CSS `pointer-events` 속성을 none으로 주어서 이벤트 자체를 막고, 해당 포인터를 감싸고 있는 부모 태그의 이벤트를 받도록 만들 수 있다.

#### event.path 또는 event.composedPath

> [MDN: event.composedPath](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath)

`event.path`를 콘솔에 찍어보면, 해당 이벤트가 발생했을 때 이벤트가 호출된 경로를 알 수 있다.

자식 태그의 이벤트를 막지 않은 경우, svg에서도 클릭이벤트가 발생하는 반면, 자식 태그의 이벤트를 막으면 button에서부터 이벤트가 생성됨을 확인할 수 있다.
![](https://images.velog.io/images/sunaaank/post/2486b14d-2962-426b-9bcf-f0147a161863/image.png)

![](https://images.velog.io/images/sunaaank/post/3c6ed474-d289-404b-a90f-7ded5e13d550/image.png)

#### event.path.find()

참고로 e.path.find() 함수를 통해서 className 중 close-modal이 있는 지를 확인하는 방법도 있다.

````js
const clickedBtn = event.path.find((item) => item.className === "close-modal");
  if (clickedBtn) alert("Btn clicked!");


## 새로 사용해본 JS 내장함수

> - [MDN: FormData](https://developer.mozilla.org/ko/docs/Web/API/FormData)

- [MDN: FormData.get()](https://developer.mozilla.org/ko/docs/Web/API/FormData/get)
- [MDN: Array.from()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [MDN: String.prototype.repeat()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
- [MDN: Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)

### ✨ FormData

- `FormData`는 form 필드와 그 값을 나타내는 일련의 key/value 쌍을 쉽게 생성할 수 있는 방법을 제공한다
- 아래와 같은 form 필드를 JS로 조작하려 할 때, `FormData`를 사용하면 편하게 조작할 수 있다.

```js
<form class="mt-5">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input
            type="number"
            class="w-100 mr-2 pl-2"
            name="purchase-price"
            min="1000"
            placeholder="구입 금액"
            ${props.amount && `value = ${props.amount}`}
            data-test="price-input"
            ${props.amount && `disabled=true`}
          />
          <button
            type="submit"
            class="btn btn-cyan"
            data-test="submit-price"
            ${props.amount && `disabled=true`}
          >
            확인
          </button>
        </div>
      </form>
```

#### FormData.get(), getAll()

- `FormData.get()`은 FormData 객체에서 지정한 키와 연관된 첫 번째 값을 반환한다. 모든 값을 얻고 싶다면 `FormData.getAll()`를 사용하면 된다.

```js
const onInputChange = () => {
  $el.addEventListener("submit", e => {
    e.preventDefault();
    onPriceSubmit(Number(new FormData(e.target).get("purchase-price")));
  });
};
```

#### FormData.set(), append()

- `FormData.set()` 또는 `FormData.append()`는 FormData 객체에 key, value 쌍을 추가하는 방법이다.
- `FormData.set()` 과 `FormData.append()` 의 차이점은 지정된 키가 이미 있으면, `FormData.set()` 은 모든 기존 값을 새 값으로 덮어쓰기를 합니다. 반면 `FormData.append()` 는 기존 값 집합의 끝에 새로운 값을 추가한다.

### ✨ Set(), Array.from

아래는 Set과 Array.from을 함께 사용했던 코드이다.
로또 티켓을 구입하면, 랜덤으로 티켓 당 로또번호 6개를 만들어주는 코드 중 일부이다.

```js
export const getLottoNumber = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_NUMBER_COUNT_PER_TICKET) {
    lottoNumbers.add(getRandomNumber());
  }
  return Array.from(lottoNumbers);
};
```

Set 객체는 ES6에서 등장한 중복을 제거한 값들의 집합이다.
로또를 위해 생성하는 숫자에는 중복값이 있어서는 안되기 때문에 중복을 허용하지 않는 Set 객체를 만든 뒤, 다시 배열 메소드를 사용하기 위해 Array로 변환시켜주었다.

Set 객체를 진짜 배열로 만들고 싶다면 간단하게는 두가지 방법이 있다.

- `Array.from()` 메서드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운 Array 객체를 만든다.
- `Spread 연산자`를 사용해도 동일한 결과가 나타난다.

#### Set 객체 사용법

```js
// 새로운 Set 객체 선언
let mySet = new Set();

// 특정 요소 추가
// mySet.add(value)
mySet.add(1); // Set { 1 }
mySet.add(5); // Set { 1, 5 }

// Set 객체에 주어진 값을 갖는 요소가 있는지 확인 (boolean)
// 배열의 indexOf() 보다 빠름. 단, index 가 없어 value로 직접 찾음
mySet.has(1); // true
mySet.has(2); // false

// Set 객체에서 주어진 값을 갖는 요소를 제거
mySet.delete(1); // Set { 5 }

// Set 객체에서 모든 요소를 제거
mySet.clear(); // Set { }

// Set 객체 내에 있는 요소들의 개수를 반환
mySet.add(1); // Set { 1 }
mySet.add("say"); // Set { 1, "say" }
mySet.size; // 2

// 이미 Set 객체 내에 있는 값을 추가하려는 경우 무시함
mySet.add("say"); // Set { 1, "say" }

// Set 객체를 배열로 바꾸고 싶다면
const array1 = Array.from(mySet);
const array2 = [...mySet];
```

#### (strong)Set vs WeakSet

- 사실 위에서 사용한 Set은 강한 Set(strong set)이라고 불린다. Set이 객체를 가질 때에는, 실제 객체를 저장하는 것이 아닌 변수에 객체를 할당할 때와 같은 방법으로 참조를 한다. 그렇기 때문에 배열로 만든 뒤에도, 메모리를 비우기 위해 가비지 콜렉션이 되지 않는다.

Set 이 참조하고 있는 객체에 대한 다른 참조가 전부 사라졌을 때, Set 의 참조도 없애고 싶다면, WeakSet을 사용할 수 있다. WeakSet은 참조하는 객체에 다른 참조가 없으면 가비지 컬렉션이 된다.  
WeakSet의 특징은 다음과 같다.

- WeakSet 은 원시 자료형(primitive types)를 가질 수 없다. 즉, 객체가 아닌 값을 add() , has() , delete() 메소드들에 인자로 넘기면 TypeError 가 발생한다.
- 반복할 수 없음(non-iterable). 즉, forEach() 를 사용할 수 없다.
- size 속성이 존재하지 않는다.

### ✨ string.repeat()

- `repeat()` 메서드는 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열을 반환한다.

로또를 구입한 가격에 따라 로또 티켓이 화면에 표시되는 기능을 구현하고자 했다.
아래와 같이 티켓 템플릿을 만들어 두고, 입력되는 로또 구매 개수만큼 티켓을 반복시키는 방법을 시도했다.

```js
const ticketTemplate = `<li class = "mx-1 text-4xl lotto-wrapper">
      <span class="mx-1 text-4xl">🎟️</span>
    </li>`;

const spanTickets = ticketTemplate.repeat(props.myLottos.length);
```

for문을 돌리던 3줄 짜리 코드가 1줄로 깔끔하게 줄어들었다.
(참고로 실제 코드에서는, 생성된 티켓별 로또 값을 화면에 맵핑하는 기능이 필요해 이 코드는 버려졌다)
문자열을 간단하게 반복할 수 있는 메소드로, 알아두면 유용해보인다.
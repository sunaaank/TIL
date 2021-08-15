## [Vanila JS] 레이싱게임을 만들며 새로 학습한 것들

레이싱 게임을 만들면서 학습한 것들을 정리해본다.

스터디를 하면서는 같은 기능을 다르게 구현한 남의 코드를 읽을 때, 피드백을 받고 리팩토링할 때가 배우는 게 정말 많다.

### 이벤트리스너, 이벤트 위임

![](https://images.velog.io/images/sunaaank/post/726f1b74-3a60-49cf-bf83-e2d9fa396c6b/image.png)

- 두 개의 인풋에 각각 이벤트리스너가 걸려있었다.

```js
// Before
namesInput.addEventListener('keyup', ({ target }) => {
  carNames = target.value;
  // ...
});

function onGameTimesSubmit() {
  // ...
  gameTimesSubmitBtn.addEventListener('click', () => {
    times = gameTimesInput.value;
    //...
  });
}
```

- `SUBMIT_ACTION`이라는 하나의 객체를 만들고, `input`들의 상위 요소인 `form`에 이벤트를 위임해 이벤트리스너를 등록해 불필요한 이벤트리스너를 호출하는 일을 줄였다.
- `input`값을 `submit`하는 버튼을 클릭하면 버튼의 `data-action`값에 따라 다른 `submit` 함수가 실행되도록 리팩토링했다.

```js
// After
const SUBMIT_ACTION = {
  submitNames: onCarNamesSubmit,
  submitTimes: onGameTimesSubmit,
};

const $form = $('form', $el);
$form.addEventListener('click', (e) => {
  e.preventDefault();
  let action = e.target.dataset.action;

  if (action) {
    SUBMIT_ACTION[action]();
  }
});
```

### 정규식 <<< 직관적인 코드

- 정규식을 따로 모듈화해서 관리해도 좋을 것 같다.
- 정규식을 사용하던 곳에서는 정규식이 아닌 더 직관적인 표현으로 대체했다.
  > - [string.trim() | MDN web docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
- [filter-boolean](https://michaeluloth.com/filter-boolean)
- [filter() | MDN web docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Falsy | MDN web docs](https://developer.mozilla.org/ko/docs/Glossary/Falsy)
- [Truthy | MDN web docs](https://developer.mozilla.org/ko/docs/Glossary/Truthy)

1. trim 함수를 적용해볼 수 있다
2. filter로 Boolean 생성자를 전달해 배열을 관리할 수 있다

#### case1: trim()

```js
const namesArr = ['a', '  b', ' c  ', ' '];
namesArr
  .map((name) => name.replace(/(^\s*)|(\s*$)/gi, ''))
  // ["a", "b", "c", ""]
  .filter((name) => !!name);
// ["a", "b", "c"]
```

```js
namesArr
      .filter(Boolean);
      .map(name => name.trim())

```

#### case2: length

```js
// Before
function isNameUnderFiveWords(name) {
  const isUnderFiveWords = /^.{0,5}$/;
  if (isUnderFiveWords.test(name)) {
    // ....
  }
}

// After
function isNameUnderFiveWords(name) {
  if (name.length < 5) {
    return name;
  }
  // ...
}
```

### 내장함수를 잘 활용하자

- 특히 reduce의 활용도는 무궁무진하다... 더 써보자!

```js
// Before
const maxDistance = carsDistance.reduce((previous, current) => {
  return previous > current ? previous : current;
});
let index = carsDistance.indexOf(maxDistance);
while (index !== -1) {
  winner.push(carNames[index]);
  index = carsDistance.indexOf(maxDistance, index + 1);
}

// After
function pickWinner() {
  const maxDistance = Math.max(...carsDistance);
  const winnerNames = carsDistance.reduce((names, cur, idx) => {
    if (cur !== maxDistance) return names;
    names.push(carNames[idx]);
    return names;
  }, []);
  winner.push(...winnerNames);
}
```

### Array.prototype.filter()

`filter(Boolean)` 은 어떻게 동작하는 걸까?

1. filter는 배열의 각 요소에 대해 Boolean을 한 번 호출한다.
2. Boolean 생성자 함수는 배열에서 falsy한 값을 지우고 truthy한 값만을 리턴해 새로운 배열을 생성한다.
3. 즉, `Boolean`을 `iterator` 로 사용하여 JS에서 falsy한 값(false, 0, -0, 0n, "", null, undefined, NaN)을 제거할 수 있다.

> #### filter() 구문
>
> `arr.filter(callback(element[, index[, array]])[, thisArg])`

1. filter()는 배열의 각 요소에 대해 제공된 콜백 함수를 한 번 호출한다.
2. 콜백이 true로 강제 변환되는 값을 반환하는 모든 값의 새 배열을 생성한다.
3. 콜백은 값이 할당된 배열의 인덱스에 대해서만 호출된다. 삭제되었거나 값이 할당된 적이 없는 인덱스에 대해서는 호출되지 않는다. 즉, 콜백 테스트를 통과하지 못한(false로 형변환되는) 배열 요소는 단순히 건너뛰고 새 배열에 포함되지 않는다.

### 인라인 리턴

- 꼭 필요한 변수할당이 아니라면, 바로 인라인으로 리턴하면 좋다.

```js
// Before
const nameLengthCheck = nameBlankCheck.map((x) => isNameUnderFiveWords(x));
return nameLengthCheck;
```

```js
// After
return nameBlankCheck.map((x) => isNameUnderFiveWords(x));
```

### 함수가 하는 일을 적게!

- 함수는 이름에 걸맞는 일을 해야 한다
- 하나의 함수가 여러가지 일을 하는 것 같으면, 쪼개기
- handle- 이나 toggle- 처럼 한번에 여러가지 일을 하는 함수는 유용하지만 코드 직관성이 떨어질 수 있다.

```js
// Before
function onGameReset(timerId) {
  const gameTimes = $('#times');
  const gameTimesInput = $('#times input');
  const gameTimesSubmitBtn = gameTimes.querySelector('button');
  const gameResetBtn = gameWinner.querySelector('button');
  gameResetBtn.addEventListener('click', () => {
    nameCards.innerHTML = '';
    form.lastElementChild.innerHTML = '';
    gameWinner.innerHTML = '';
    namesInput.disabled = false;
    nameSubmitBtn.disabled = false;
    gameTimesInput.disabled = false;
    gameTimesSubmitBtn.disabled = false;
    namesInput.value = '';
    gameTimesInput.value = '';
    carNames = [];
    times = '';
    carsDistance = [];
    winner = [];
    clearTimeout(timerId);
  });
}
```

```js
function onGameReset(timerId) {
  const gameResetBtn = $('button', gameWinner);
  gameResetBtn.addEventListener('click', () => {
    preventInput('name', false);
    resetNameState();
    preventInput('gameTimes', false);
    resetGameTimeState();
    resetState();
    form.lastElementChild.innerHTML = '';
    clearTimeout(timerId);
  });
}

function resetState() {
  carNames = [];
  times = '';
  carsDistance = [];
  winner = [];
}

function resetNameState() {
  nameCards.innerHTML = '';
  namesInput.value = '';
}

function resetGameTimeState() {
  const gameTimesInput = $('#times input');
  gameWinner.innerHTML = '';
  gameTimesInput.value = '';
}
```

### script type=module

> - [JavaScript modules | MDN web docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts)

- [defer, async 스크립트 | JavaScript.info](https://ko.javascript.info/script-async-defer)

이제까지 JS를 불러올 때`index.html` 문서의 `head`에서 `defer`속성을 사용해 스크립트를 불러왔다. 그런데 모듈을 하는 경우 defer 속성을 따로 적어주지 않아도 된다고 한다.

```html
<script type="module" src="src/js/main.js" defer></script>
```

> - 모듈 스크립트를 불러올 때 defer 속성을 사용할 필요가 없습니다. 모듈은 자동으로 defer됩니다.

- 로컬 테스트에서의 주의 사항 — HTML파일을 로컬(예를들어 file:// URL)에서 로드하려고 하면, 자바스크립트 모듈 보안 요구 사항으로 인해 CORS오류가 발생합니다. 서버를 통해 테스트 해야 합니다.

#### 리마인드: 브라우저 작동방식, 스크립트 속성

- 브라우저는 작동할 때, HTML 문서를 읽다가 script 태그를 만나면 스크립트를 생성하기 위해 DOM 생성을 멈춘다.
- 이러한 방식은 두 가지 문제를 만든다.
  1. 스크립트를 다 실행해도, 스크립트는 스크립트 코드 아래에 있는 DOM 요소에 접근할 수 없다.
  2. 용량이 큰 스크립트가 있는 경우, 스크립트가 페이지를 막아 스크립트 코드 아래부분의 DOM 요소가 화면에 나타나는데 오랜 시간이 소요된다.
- script 태그를 body 맨 하단에 삽입하는 방법이 있다.(HTML 파일이 큰 경우, 다운완료시까지 인터렉션 실행이 안됨)

##### defer 속성이 있는 스크립트(지연 스크립트)

- 백그라운드에서 다운로드해, 스크립트 다운 도중에도 HTML 파싱이 멈추지 않음.
- 문서에 추가된 순으로 실행됨
- 스크립트의 실행은 DOM이 준비된 후에 실행, DOMContentLoaded 이벤트 발생 전에 실행됨.

##### async 속성이 있는 스크립트(비동기 스크립트)

- 방문자 수 카운터나 광고 관련 스크립트에 주로 사용함.
- HTML 페이지는 async 스크립트 다운이 완료되길 기다리지 않고 페이지 내 콘텐츠를 처리, 출력함.
- 문서 내 순서와 상관 없이 먼저 다운로드 된 스크립트가 먼저 실행됨.

#### Dynamic module loading

mdn을 읽다보니 import, export, as 키워드만 사용해왔는데 Dynamic module loading이라는 것도 가능하다!

```js
let squareBtn = document.querySelector('.square');

squareBtn.addEventListener('click', () => {
  import('/js-examples/modules/dynamic-module-imports/modules/square.js').then(
    (Module) => {
      let square1 = new Module.Square(
        myCanvas.ctx,
        myCanvas.listId,
        50,
        50,
        100,
        'blue'
      );
      square1.draw();
      square1.reportArea();
      square1.reportPerimeter();
    }
  );
});
```

### 🐥 회고

#### 코드 작성

- class로 Car를 만들어 필요시마다 생성해주면 좋겠다고 생각했지만, 아직 class가 손에 붙지 않아 시간 내로 구현이 어려울 것 같아서 함수로 구현하기를 택했다.
  => class로 변경해보면 좋을 것 같다.
- 처음부터 데이터와 상태를 어떻게 관리할 것인지 더 고민이 필요하다. car의 distance값과 name을 각각 배열로 관리했는데, 두 값은 매칭이 되니까 처음에 객체로 관리했으면 좋았을 것이다.
- 자바스크립트의 내장함수를 적절하게, 적극적으로 활용해보면 좋겠다. reduce로 할 수 있는 일이 참 많은데, 적재적소에 써먹지 못하고 있어서 아쉽다.
- 정규식이 정말 필요한가? 내장함수를 활용해 더 직관적으로 작성할 수 있지 않나? 생각해보고 코드짜기.
- 정규식을 쓸 때, 정규식 관련 설명을 주석으로 달 것. 분명 이유가 있어서 그 정규식을 썼는데, 시간이 지나고 다시 보니 왜 그 선택을 했는지 모르겠다.

#### 코드리뷰

- 다른 스터디원들이 MVC패턴, 옵저버패턴 등등 공부삼아 다양한 패턴을 활용해 구현을 했다. 코드리뷰를 해야 하는데, 어떤 패턴인지 어떤 기준으로 코드가 분리되어 있는 건지 알지 못해 리뷰달기가 망설여졌다. 우선 절차지향에서 벗어난 뒤, 패턴이나 구조에 대해서도 공부해서 자신감있게 리뷰해보고 싶다.
- 리뷰어들의 코드리뷰 멘트(조심스럽고 친절한 화법)를 따라해보자.
  : "~ 하면 편합니다", "~하는 건 어떤가요?", "~수도 있을 것 같습니다", "~깔끔할 것 같습니다!", "~하면 좋을 것 같습니다", "~해 보여요", "~하는 방법 추천드려봅니다", "~하면 더 간결한 코드가 되지 않았을까 싶습니다"

# ๐ [Vanila JS] ๋ก๋๊ฒ์์ ๋ง๋ค๋ฉฐ ์๋ก ํ์ตํ ๊ฒ๋ค

์ด๋ฒ์ ๋ก๋ ๊ฒ์์ Vanila JS๋ก ๋ง๋ค์ด๋ณด๋ฉฐ ์๋ก ์จ๋ณธ ๊ฒ๋ค์ ์ ๋ฆฌํด๋ณธ๋ค.
๋ก๋ ๋๋ฒ๋ฅผ ์ด๋ค ๊ฐ์ฒด์ ์ํ๋ก ๊ฐ์ง๊ฒ ํ  ๊ฒ์ธ์ง, ๊ทธ ์ํ๊ฐ์ ๊ด๋ฆฌ๋ ์ด๋ป๊ฒ ํ  ๊ฒ์ธ์ง ๋ฑ์ ๋ํ ๊ณ ๋ฏผ์ ํ๋ค.

## โจ ๋ฐ๋ณต๋๋ document.querySelector ์ค์ฌ์ฐ๊ธฐ

> [MDN: document.querySelector(selector)](https://developer.mozilla.org/ko/docs/Web/API/Document/querySelector)

util ํจ์๋ฅผ ๋ง๋ค์ด๋๋ฉด Vanila JS์์ DOM ์กฐ์์ ์ํด ๋ฐ๋ณต์ ์ผ๋ก ์ฐ๋ ์ฝ๋๋ฅผ ์ค์ฌ ์์ฐ์ฑ์ ๋์ผ ์ ์๋ค.

### parent: document

- `querySelector(selector)`๋ ์ ํ์๋ฅผ ๋ง์กฑํ๋ ๋ฌธ์ ๋ด ์ฒซ๋ฒ์งธ ์์๋ฅผ ๋ฐํํด์ค๋ค
- ๋ง์ฝ ์ ํ์๋ฅผ ๋ง์กฑํ๋ ๋ชจ๋  ์์์ ๋ชฉ๋ก์ด ํ์ํ๋ค๋ฉด `querySelectorAll(selectors)`๋ฅผ ์ฌ์ฉํ๋ ํจ์๋ฅผ ์ถ๊ฐํด์ค๋ค

```js
export const $ = selector => document.querySelector(selector);
export const $$ = selectors => document.querySelectorAll(selectors);
...
const $button = $(".button")
const $buttons = $$(".button")
```

### document์ด์ธ์๋ parent ์ง์  ์ง์ ํด์ ์ฌ์ฉ

- ํธ๋ฆฌํ์ง๋ง ๋งค๋ฒ selector๋ฅผ ์ ์ด์ฃผ๋ ค๋ฉด ๋ฒ๊ฑฐ๋กญ๋ค๋ ๋จ์ ์ด ์๋ค.
- ๋ฌธ์ ์ ์ฒด์์ ๊ฒ์ํ๋ ๊ฒฝ์ฐ๋ฅผ ๊ธฐ๋ณธ๊ฐ์ผ๋ก ์ง์ ํด parent๋ ์๋ตํด์ค ์ ์๋ค.

```js
export const $ = ({ selector, parent = document }) =>  parent.querySelector(selector);
...
const $purchaseForm = $({ selector: '[data-component = "purchase-form"]', parent: $el })
```

## โจ ์ด๋ฒคํธ ์์ ํ์ฉํ๊ธฐ + ์ฅ์ ๋ฌผ ์ฒ๋ฆฌํ๊ธฐ

> [์ด๋ฒคํธ ์์](https://ko.javascript.info/event-delegation)

- ์ด๋ฒคํธ ์์์ ๋น์ทํ ๋ฐฉ์์ผ๋ก ์ฌ๋ฌ ์์๋ฅผ ๋ค๋ค์ผ ํ  ๋ ์ฌ์ฉํ  ์ ์๋ค. ์ฑ๋ฅ๊ณผ ์ ์ง๋ณด์์ ์ข๋ค.
- ์ด๋ฒคํธ ์์์ ์ฌ์ฉํ๋ฉด ์์๋ง๋ค ์ง์  ํธ๋ค๋ฌ๋ฅผ ํ ๋นํ์ง ์๊ณ , ์์์ ๊ณตํต ์กฐ์์ ์ด๋ฒคํธ ํธ๋ค๋ฌ๋ฅผ ๋จ ํ๋๋ง ํ ๋นํด๋ ์ฌ๋ฌ ํ์ ์์๋ฅผ ํ๊บผ๋ฒ์ ๋ค๋ฃฐ ์ ์๋ค.

์๋์ ๊ฐ์ ํ๋ฉด์์ close๋ฒํผ๊ณผ reset๋ฒํผ์ ํด๋ฆญ์ด๋ฒคํธ๋ฅผ ์ฃผ๊ณ ์ ํ๋ค.

```html
// modal components: close ๋ฒํผ, reset ๋ฒํผ
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
    ๋ค์ ์์ํ๊ธฐ
  </button>
</div>
```

### element.closest(selector) ํ์ฉํ๊ธฐ

element.closest(selector) ๋ฉ์๋๋ element์ ์์ ์์ ์ค selector์ ์ผ์นํ๋ ๊ฐ์ฅ ๊ทผ์ ํ ์กฐ์ ์์๋ฅผ ๋ฐํํ๋ค. ์ด๋ฒคํธ๊ฐ ๋ฐ์ํ ์์๋ถํฐ ์์ํด ์๋ก ์ฌ๋ผ๊ฐ๋ฉฐ ๊ฐ์ฅ ๊ฐ๊น์ด selector ์์๋ฅผ ์ฐพ๋๋ค.

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

### dataset ํ์ฉํ๊ธฐ

ํด๋ฆญ ์ด๋ฒคํธํธ๋ค๋ฌ๋ฅผ ๊ฑธ์ด์ค ๋ฒํผ์ html์ dataset์ ์ถ๊ฐํด์ค๋ค.
์ฌ๊ธฐ์๋ ๊ฐ ๋ฒํผ์ `data-action="close-modal"`, `data-action="reset-lotto"`๋ฅผ ์ถ๊ฐํด์ค๋ค.

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

#### ์์ ํ๊ทธ์ ์ด๋ฒคํธ ๋ง๊ธฐ

์์ ๊ฐ์ด ๊ตฌํํ๋ฉด, close ๋ฒํผ ๋ด `svg ํ๊ทธ`๋ฅผ ํด๋ฆญํ  ๊ฒฝ์ฐ ์๋ํ ์ด๋ฒคํธ๊ฐ ๋์ํ์ง ์๋๋ค. ๋ฒํผ ๋ด ์์ ํ๊ทธ๋ค์ ์ด๋ฒคํธ๋ฅผ ๋ง์์ฃผ์ด์ผ ํ๋ค.
๋ฒํผ์ด ๊ฐ์ง ์์ ํ๊ทธ๋ค์ ์ด๋ฒคํธ๋ฅผ ๋ง๊ธฐ ์ํด์๋ JS๋ก ์ฒ๋ฆฌํ๋ ๋ฐฉ๋ฒ๊ณผ, CSS๋ก ์ฒ๋ฆฌํ๋ ๋ฐฉ๋ฒ์ด ์๋ค. ์ฌ๊ธฐ์๋ CSS๋ก ์ฒ๋ฆฌํด๋ณด์.

```js
.close-modal > svg {
  pointer-events: none;
}
```

์์ ํ๊ทธ์๊ฒ CSS `pointer-events` ์์ฑ์ none์ผ๋ก ์ฃผ์ด์ ์ด๋ฒคํธ ์์ฒด๋ฅผ ๋ง๊ณ , ํด๋น ํฌ์ธํฐ๋ฅผ ๊ฐ์ธ๊ณ  ์๋ ๋ถ๋ชจ ํ๊ทธ์ ์ด๋ฒคํธ๋ฅผ ๋ฐ๋๋ก ๋ง๋ค ์ ์๋ค.

#### event.path ๋๋ event.composedPath

> [MDN: event.composedPath](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath)

`event.path`๋ฅผ ์ฝ์์ ์ฐ์ด๋ณด๋ฉด, ํด๋น ์ด๋ฒคํธ๊ฐ ๋ฐ์ํ์ ๋ ์ด๋ฒคํธ๊ฐ ํธ์ถ๋ ๊ฒฝ๋ก๋ฅผ ์ ์ ์๋ค.

์์ ํ๊ทธ์ ์ด๋ฒคํธ๋ฅผ ๋ง์ง ์์ ๊ฒฝ์ฐ, svg์์๋ ํด๋ฆญ์ด๋ฒคํธ๊ฐ ๋ฐ์ํ๋ ๋ฐ๋ฉด, ์์ ํ๊ทธ์ ์ด๋ฒคํธ๋ฅผ ๋ง์ผ๋ฉด button์์๋ถํฐ ์ด๋ฒคํธ๊ฐ ์์ฑ๋จ์ ํ์ธํ  ์ ์๋ค.
![](https://images.velog.io/images/sunaaank/post/2486b14d-2962-426b-9bcf-f0147a161863/image.png)

![](https://images.velog.io/images/sunaaank/post/3c6ed474-d289-404b-a90f-7ded5e13d550/image.png)

#### event.path.find()

์ฐธ๊ณ ๋ก e.path.find() ํจ์๋ฅผ ํตํด์ className ์ค close-modal์ด ์๋ ์ง๋ฅผ ํ์ธํ๋ ๋ฐฉ๋ฒ๋ ์๋ค.

````js
const clickedBtn = event.path.find((item) => item.className === "close-modal");
  if (clickedBtn) alert("Btn clicked!");


## ์๋ก ์ฌ์ฉํด๋ณธ JS ๋ด์ฅํจ์

> - [MDN: FormData](https://developer.mozilla.org/ko/docs/Web/API/FormData)

- [MDN: FormData.get()](https://developer.mozilla.org/ko/docs/Web/API/FormData/get)
- [MDN: Array.from()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [MDN: String.prototype.repeat()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
- [MDN: Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)

### โจ FormData

- `FormData`๋ form ํ๋์ ๊ทธ ๊ฐ์ ๋ํ๋ด๋ ์ผ๋ จ์ key/value ์์ ์ฝ๊ฒ ์์ฑํ  ์ ์๋ ๋ฐฉ๋ฒ์ ์ ๊ณตํ๋ค
- ์๋์ ๊ฐ์ form ํ๋๋ฅผ JS๋ก ์กฐ์ํ๋ ค ํ  ๋, `FormData`๋ฅผ ์ฌ์ฉํ๋ฉด ํธํ๊ฒ ์กฐ์ํ  ์ ์๋ค.

```js
<form class="mt-5">
        <label class="mb-2 d-inline-block">๊ตฌ์ํ  ๊ธ์ก์ ์๋ ฅํด์ฃผ์ธ์.</label>
        <div class="d-flex">
          <input
            type="number"
            class="w-100 mr-2 pl-2"
            name="purchase-price"
            min="1000"
            placeholder="๊ตฌ์ ๊ธ์ก"
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
            ํ์ธ
          </button>
        </div>
      </form>
```

#### FormData.get(), getAll()

- `FormData.get()`์ FormData ๊ฐ์ฒด์์ ์ง์ ํ ํค์ ์ฐ๊ด๋ ์ฒซ ๋ฒ์งธ ๊ฐ์ ๋ฐํํ๋ค. ๋ชจ๋  ๊ฐ์ ์ป๊ณ  ์ถ๋ค๋ฉด `FormData.getAll()`๋ฅผ ์ฌ์ฉํ๋ฉด ๋๋ค.

```js
const onInputChange = () => {
  $el.addEventListener("submit", e => {
    e.preventDefault();
    onPriceSubmit(Number(new FormData(e.target).get("purchase-price")));
  });
};
```

#### FormData.set(), append()

- `FormData.set()` ๋๋ `FormData.append()`๋ FormData ๊ฐ์ฒด์ key, value ์์ ์ถ๊ฐํ๋ ๋ฐฉ๋ฒ์ด๋ค.
- `FormData.set()` ๊ณผ `FormData.append()` ์ ์ฐจ์ด์ ์ ์ง์ ๋ ํค๊ฐ ์ด๋ฏธ ์์ผ๋ฉด, `FormData.set()` ์ ๋ชจ๋  ๊ธฐ์กด ๊ฐ์ ์ ๊ฐ์ผ๋ก ๋ฎ์ด์ฐ๊ธฐ๋ฅผ ํฉ๋๋ค. ๋ฐ๋ฉด `FormData.append()` ๋ ๊ธฐ์กด ๊ฐ ์งํฉ์ ๋์ ์๋ก์ด ๊ฐ์ ์ถ๊ฐํ๋ค.

### โจ Set(), Array.from

์๋๋ Set๊ณผ Array.from์ ํจ๊ป ์ฌ์ฉํ๋ ์ฝ๋์ด๋ค.
๋ก๋ ํฐ์ผ์ ๊ตฌ์ํ๋ฉด, ๋๋ค์ผ๋ก ํฐ์ผ ๋น ๋ก๋๋ฒํธ 6๊ฐ๋ฅผ ๋ง๋ค์ด์ฃผ๋ ์ฝ๋ ์ค ์ผ๋ถ์ด๋ค.

```js
export const getLottoNumber = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_NUMBER_COUNT_PER_TICKET) {
    lottoNumbers.add(getRandomNumber());
  }
  return Array.from(lottoNumbers);
};
```

Set ๊ฐ์ฒด๋ ES6์์ ๋ฑ์ฅํ ์ค๋ณต์ ์ ๊ฑฐํ ๊ฐ๋ค์ ์งํฉ์ด๋ค.
๋ก๋๋ฅผ ์ํด ์์ฑํ๋ ์ซ์์๋ ์ค๋ณต๊ฐ์ด ์์ด์๋ ์๋๊ธฐ ๋๋ฌธ์ ์ค๋ณต์ ํ์ฉํ์ง ์๋ Set ๊ฐ์ฒด๋ฅผ ๋ง๋  ๋ค, ๋ค์ ๋ฐฐ์ด ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด Array๋ก ๋ณํ์์ผ์ฃผ์๋ค.

Set ๊ฐ์ฒด๋ฅผ ์ง์ง ๋ฐฐ์ด๋ก ๋ง๋ค๊ณ  ์ถ๋ค๋ฉด ๊ฐ๋จํ๊ฒ๋ ๋๊ฐ์ง ๋ฐฉ๋ฒ์ด ์๋ค.

- `Array.from()` ๋ฉ์๋๋ ์ ์ฌ ๋ฐฐ์ด ๊ฐ์ฒด(array-like object)๋ ๋ฐ๋ณต ๊ฐ๋ฅํ ๊ฐ์ฒด(iterable object)๋ฅผ ์๊ฒ ๋ณต์ฌํด ์๋ก์ด Array ๊ฐ์ฒด๋ฅผ ๋ง๋ ๋ค.
- `Spread ์ฐ์ฐ์`๋ฅผ ์ฌ์ฉํด๋ ๋์ผํ ๊ฒฐ๊ณผ๊ฐ ๋ํ๋๋ค.

#### Set ๊ฐ์ฒด ์ฌ์ฉ๋ฒ

```js
// ์๋ก์ด Set ๊ฐ์ฒด ์ ์ธ
let mySet = new Set();

// ํน์  ์์ ์ถ๊ฐ
// mySet.add(value)
mySet.add(1); // Set { 1 }
mySet.add(5); // Set { 1, 5 }

// Set ๊ฐ์ฒด์ ์ฃผ์ด์ง ๊ฐ์ ๊ฐ๋ ์์๊ฐ ์๋์ง ํ์ธ (boolean)
// ๋ฐฐ์ด์ indexOf() ๋ณด๋ค ๋น ๋ฆ. ๋จ, index ๊ฐ ์์ด value๋ก ์ง์  ์ฐพ์
mySet.has(1); // true
mySet.has(2); // false

// Set ๊ฐ์ฒด์์ ์ฃผ์ด์ง ๊ฐ์ ๊ฐ๋ ์์๋ฅผ ์ ๊ฑฐ
mySet.delete(1); // Set { 5 }

// Set ๊ฐ์ฒด์์ ๋ชจ๋  ์์๋ฅผ ์ ๊ฑฐ
mySet.clear(); // Set { }

// Set ๊ฐ์ฒด ๋ด์ ์๋ ์์๋ค์ ๊ฐ์๋ฅผ ๋ฐํ
mySet.add(1); // Set { 1 }
mySet.add("say"); // Set { 1, "say" }
mySet.size; // 2

// ์ด๋ฏธ Set ๊ฐ์ฒด ๋ด์ ์๋ ๊ฐ์ ์ถ๊ฐํ๋ ค๋ ๊ฒฝ์ฐ ๋ฌด์ํจ
mySet.add("say"); // Set { 1, "say" }

// Set ๊ฐ์ฒด๋ฅผ ๋ฐฐ์ด๋ก ๋ฐ๊พธ๊ณ  ์ถ๋ค๋ฉด
const array1 = Array.from(mySet);
const array2 = [...mySet];
```

#### (strong)Set vs WeakSet

- ์ฌ์ค ์์์ ์ฌ์ฉํ Set์ ๊ฐํ Set(strong set)์ด๋ผ๊ณ  ๋ถ๋ฆฐ๋ค. Set์ด ๊ฐ์ฒด๋ฅผ ๊ฐ์ง ๋์๋, ์ค์  ๊ฐ์ฒด๋ฅผ ์ ์ฅํ๋ ๊ฒ์ด ์๋ ๋ณ์์ ๊ฐ์ฒด๋ฅผ ํ ๋นํ  ๋์ ๊ฐ์ ๋ฐฉ๋ฒ์ผ๋ก ์ฐธ์กฐ๋ฅผ ํ๋ค. ๊ทธ๋ ๊ธฐ ๋๋ฌธ์ ๋ฐฐ์ด๋ก ๋ง๋  ๋ค์๋, ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋น์ฐ๊ธฐ ์ํด ๊ฐ๋น์ง ์ฝ๋ ์์ด ๋์ง ์๋๋ค.

Set ์ด ์ฐธ์กฐํ๊ณ  ์๋ ๊ฐ์ฒด์ ๋ํ ๋ค๋ฅธ ์ฐธ์กฐ๊ฐ ์ ๋ถ ์ฌ๋ผ์ก์ ๋, Set ์ ์ฐธ์กฐ๋ ์์ ๊ณ  ์ถ๋ค๋ฉด, WeakSet์ ์ฌ์ฉํ  ์ ์๋ค. WeakSet์ ์ฐธ์กฐํ๋ ๊ฐ์ฒด์ ๋ค๋ฅธ ์ฐธ์กฐ๊ฐ ์์ผ๋ฉด ๊ฐ๋น์ง ์ปฌ๋ ์์ด ๋๋ค.  
WeakSet์ ํน์ง์ ๋ค์๊ณผ ๊ฐ๋ค.

- WeakSet ์ ์์ ์๋ฃํ(primitive types)๋ฅผ ๊ฐ์ง ์ ์๋ค. ์ฆ, ๊ฐ์ฒด๊ฐ ์๋ ๊ฐ์ add() , has() , delete() ๋ฉ์๋๋ค์ ์ธ์๋ก ๋๊ธฐ๋ฉด TypeError ๊ฐ ๋ฐ์ํ๋ค.
- ๋ฐ๋ณตํ  ์ ์์(non-iterable). ์ฆ, forEach() ๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.
- size ์์ฑ์ด ์กด์ฌํ์ง ์๋๋ค.

### โจ string.repeat()

- `repeat()` ๋ฉ์๋๋ ๋ฌธ์์ด์ ์ฃผ์ด์ง ํ์๋งํผ ๋ฐ๋ณตํด ๋ถ์ธ ์๋ก์ด ๋ฌธ์์ด์ ๋ฐํํ๋ค.

๋ก๋๋ฅผ ๊ตฌ์ํ ๊ฐ๊ฒฉ์ ๋ฐ๋ผ ๋ก๋ ํฐ์ผ์ด ํ๋ฉด์ ํ์๋๋ ๊ธฐ๋ฅ์ ๊ตฌํํ๊ณ ์ ํ๋ค.
์๋์ ๊ฐ์ด ํฐ์ผ ํํ๋ฆฟ์ ๋ง๋ค์ด ๋๊ณ , ์๋ ฅ๋๋ ๋ก๋ ๊ตฌ๋งค ๊ฐ์๋งํผ ํฐ์ผ์ ๋ฐ๋ณต์ํค๋ ๋ฐฉ๋ฒ์ ์๋ํ๋ค.

```js
const ticketTemplate = `<li class = "mx-1 text-4xl lotto-wrapper">
      <span class="mx-1 text-4xl">๐๏ธ</span>
    </li>`;

const spanTickets = ticketTemplate.repeat(props.myLottos.length);
```

for๋ฌธ์ ๋๋ฆฌ๋ 3์ค ์ง๋ฆฌ ์ฝ๋๊ฐ 1์ค๋ก ๊น๋ํ๊ฒ ์ค์ด๋ค์๋ค.
(์ฐธ๊ณ ๋ก ์ค์  ์ฝ๋์์๋, ์์ฑ๋ ํฐ์ผ๋ณ ๋ก๋ ๊ฐ์ ํ๋ฉด์ ๋งตํํ๋ ๊ธฐ๋ฅ์ด ํ์ํด ์ด ์ฝ๋๋ ๋ฒ๋ ค์ก๋ค)
๋ฌธ์์ด์ ๊ฐ๋จํ๊ฒ ๋ฐ๋ณตํ  ์ ์๋ ๋ฉ์๋๋ก, ์์๋๋ฉด ์ ์ฉํด๋ณด์ธ๋ค.
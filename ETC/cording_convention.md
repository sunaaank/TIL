## 컨벤션 참고 자료

1. 구글 컨벤션
   https://google.github.io/styleguide/jsguide.html
2. Toast UI 컨벤션
   https://ui.toast.com/fe-guide/ko_CODING-CONVENTION
3. Airbnb 컨벤션
   https://github.com/airbnb/javascript
   번역 : https://github.com/tipjs/javascript-style-guide

## 기존 코드에서 개선할 점

### 구글 컨벤션 참고

1. Exports

- Named vs default exports
  Use named exports in all code. You can apply the export keyword to a declaration, or use the export {name}; syntax.

Do not use default exports. Importing modules must give a name to these values, which can lead to inconsistencies in naming across modules.

```js
// Do not use default exports:
export default class Foo { ... } // BAD!
```

```js
// Use named exports:
export class Foo { ... }
```

2. File extensions in import paths
   The .js file extension is not optional in import paths and must always be included.

```js
import "../directory/file"; // BAD
```

```js
import "../directory/file.js"; // GOOD !
```

### toast UI 참고자료

1.  문장의 종료
    한 줄에 하나의 문장만 허용하며, 문장 종료 시에는 반드시 세미콜론(;)을 사용한다.
    : 자바스크립트는 이를 문법으로 강제하지 않지만, 종종 생각지 못한 오류를 만들고 디버깅을 어렵게 한다.

2.  명명규칙

- 예약어를 사용하지 않는다.

```js
// Bad
let class;
let enum;
let extends;
let super;
let const;
let export;
let import;
```

- 상수는 영문 대문자 스네이크 표기법(Snake case)를 사용.

```js
SYMBOLIC_CONSTANTS;
```

- 생성자는 대문자 카멜 케이스을 사용한다.

```js
class ConstructorName {
  ...
};
```

- 변수, 함수에는 카멜 케이스을 사용한다.

```js
// 숫자, 문자, 불린
let dog;
let variableName;

// 배열 - 배열은 복수형 이름을 사용
const dogs = [];

// 정규표현식 - 정규표현식은 'r'로 시작
const rDesc = /.*/;

// 함수
function getPropertyName() {
  ...
}

// 이벤트 핸들러 - 이벤트 핸들러는 'on'으로 시작
const onClick = () => {};
const onKeyDown = () => {};

// 불린 반환 함수 - 반환 값이 불린인 함수는 'is'로 시작
let isAvailable = false;
```

- (지역 변수 or private 변수)명은 '\_'로 시작한다.

```js
let _privateVariableName;
let _privateFunctionName;

// 객체일 경우
const customObjectName = {};
customObjectName.propertyName;
customObjectName._privatePropertyName;
_privateCustomObjectName;
_privateCustomObjectName._privatePropertyName;
```

- URL, HTML 같은 범용적인 대문자 약어는 대문자 그대로 사용한다.

```js
parseHTML;
parseXML;
```

3. 전역 변수

- 전역 변수를 사용하지 않는다.
  자바스크립트는 전역 변수에 기반을 둔다. 즉, 모든 컴파일 단위는 하나의 공용 전역 객체(window)에 로딩된다. 전역 변수는 언제든지 프로그램의 모든 부분에서 접근할 수 있기 때문에 편하지만, 바꿔 말하면 프로그램의 모든 부분에서 변경될 수 있고, 그로 인해 프로그램에 치명적인 오류를 발생시킬 수 있다.

```js
// Bad
myglobal = "hello";
```

- 암묵적 전역 변수를 사용하지 않는다.

```js
// Bad
function sum(x, y) {
  result = x + y;
  return result;
}

// Bad
function foo() {
  let a = (b = 0); // let a = (b = 0);와 같다. b가 암묵적 전역이 된다.
}
// Good
function sum(x, y) {
  let result = x + y;
  return result;
}

// Good
function foo() {
  let a, b;
  a = b = 0;
}
```

4. 배열과 객체

- 배열 복사 시 순환문을 사용하지 않는다.
  : 복잡한 객체를 복사할 때 전개 연산자를 사용하면 좀 더 명확하게 정의할 수 있고 가독성이 좋아진다.

```js
const len = items.length;
let i;

// Bad
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// Good
const itemsCopy = [...items];
```

=> ES5의 환경에서는 Array.prototype.slice를 사용한다.

```js
// Good
itemsCopy = items.slice();
```

5. 블록 구문

- switch-case 사용 시 첫 번째 case문을 제외하고 case문 사용 이전에 개행한다.

```js
// Good
switch (value) {
  case 1:
    doSomething1();
    break;

  case 2:
    doSomething2();
    break;

  case 3:
    return true;

  default:
    throw new Error("This shouldn't happen.");
}
```

- switch-case 사용 시 각 구문은 break, return, throw 중 한 개로 끝나야 하며 default문이 없으면 // no default 표시를 해준다.

6. 데이터형 확인하기

- 미리 약속된 데이터형 확인법을 사용한다.

```js
// 문자열
typeof variable === "string";
tui.util.isString(variable);

// 숫자
typeof variable === "number";
tui.util.isNumber(variable);

// 불린
typeof variable === "boolean";
tui.util.isBoolean(variable);

// 객체
typeof variable === "object";
tui.util.isObject(variable);

// 배열
Array.isArray(arrayObject);
tui.util.isArray(variable);

// 널 Null
variable === null;
tui.util.isNull(variable);

// 미할당 Undefined
typeof variable === "undefined";
variable === undefined;
tui.util.isUndefined(variable);

// 엘리먼트 노드
element.nodeType === 1;
tui.util.isHTMLNode(element);
```

7. 조건 확인하기
   미리 약속된 조건 확인법을 사용한다.

```js
// 문자열 - 빈 문자열이 아닌가?
if (string) ...
if (tui.util.isNotEmpty(string)) ...

// 문자열 - 빈 문자열인가?
if (!string) ...
if (tui.util.isEmpty(string)) ...

// 배열 - 순회할 요소가 있는가?
if (array.length) ...
if (tui.util.isNotEmpty(array)) ...

// 배열 - 빈 배열인가?
if (!array.length) ...
if (tui.util.isEmpty(array)) ...

// 객체 - 순회할 속성이 있는가?
if (tui.util.isNotEmpty(object)) ...

// 객체 - 빈 객체인가?
if (tui.util.isEmpty(object)) ...

// 할당된 값이 있는가?
if (tui.util.isExisty(variable)) ...

// 참조변수가 참(true)인가?
if (variable) ...

// 참조변수가 거짓(false)인가?
if (!variable) ...
```

8. 반환하기

- 함수 내에서 반환은 한 번만 한다.
  : 특정 값을 반환해야 하는 경우, 함수 맨 마지막에서 한 번만 반환한다. 단, 예외로 빠져나가는 경우는 제외한다. 코드를 예측하기 쉬우며 흐름이 간결한 함수를 작성할 수 있다.
- return문 바로 위는 한 칸 비워 놓는다.
  : 다른 명령과 return문이 붙어있으면 가독성이 좋지 않으므로 return문 전에 한 줄 띄운다

9. 순회하기

- 반복문 사용은 일반화된 순회 메서드 사용을 권장한다.

```js
// Good
var i, len
for (i = 0, len = array.length; i < len; i += 1) ...

// Good
[1, 2, 3].forEach(array, function(value, index) {
  ...
});
```

- for-in문 안에서는 hasOwnProperty 조건 검사를 수행한다.
  : 예상치 않게 상속받은 프로퍼티로 인해 문제가 생길 수 있다.

```js
// Good
for (const prop in object) {
  if (object.hasOwnProperty(prop)) {
    ...
  }
}
```

- 반복을 위한 변수를 미리 선언한다. (ES5)
  : 반복을 위한 변수가 초기화 안된 상태에서 사용되는 실수를 미연에 방지할 수 있다.

```js
// Bad
for (var i = 0; i < array.length; i += 1) ...

// Bad
for (var i in array) ...

// Good
var i, len
for (i = 0, len = array.length; i < len; i += 1) ...

// good
var key;
for (key in object) ..
```

10. 콜백 함수의 스코프

- 콜백 등 익명 함수를 사용하는 경우, 최대한 클로저 사용을 피하고 각 스코프에 알맞게 변수를 선언한다.
  : 꼭 필요하지 않은 클로저를 사용할 경우 스코프 체인의 참조가 늘어남으로 성능이 저하되고 가독성을 떨어뜨릴 수 있다.

```js
/ bad
let data1, data2, ...;

forEach(arr, function() {
  data1 = someFunction1();
  data2 = someFunction2();
  ...
});

// Allow
function foo() {
  const length = ary.length;
  let i = 0;
    ...

  forEach(ary, function(data1, data2) {
    ...

    // 필요에 따라 외부에 변수 선언 가능 (클로저 사용 허용)
    i += (length + 2);
    ...
  });
}

// Good
function foo() {
  ...

  // 익명 함수의 스코프 안에서 변수 선언
  forEach(ary, function(data1, data2) {
    const data1 = someFunction1(data1);
    const data2 = someFunction2(data2);
  ...
  });
}
```

### AIRBNB 참고자료

1. 이터레이터와 제너레이터(Iterators and Generators)

- iterators를 이용하지 마십시오. for-of 루프 대신에 map() 과 reduce() 와 같은 JavaScript 고급함수(higher-order functions)를 이용해 주십시오.
  : 왜? 고급함수는 immutable(불변)룰을 적용합니다. side effect에 대해 추측하는거보다 값을 반환하는 순수 함수를 다루는게 간단하기 때문입니다.

```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}

sum === 15;

// good
let sum = 0;
numbers.forEach((num) => (sum += num));
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```

- 현시점에서는 generators는 이용하지 마십시오.
  : 왜? ES5로 잘 transpile 하지 않기 때문입니다.

2. 변수(Variables)

- 변수를 선언 할 때는 항상 const 를 사용해 주십시오. 그렇게 하지 않으면 글로벌 변수로 선언됩니다. 글로벌 namespace 를 오염시키지 않도록 캡틴플래닛도 경고하고 있습니다.
- 하나의 변수선언에 대해 하나의 const 를 이용해 주십시오.
  : 왜? 이 방법의 경우, 간단히 새 변수를 추가하는게 가능합니다. 또한 , 를 ; 로 바꿔버리는 것에 대해 걱정할 필요가 없습니다.
- 우선 const 를 그룹화하고 다음에 let 을 그룹화 해주십시오.
  : 왜? 이전에 할당한 변수에 대해 나중에 새 변수를 추가하는 경우에 유용하기 때문입니다.

```js
// bad
let i,
  len,
  dragonball,
  items = getItems(),
  goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

- 변수를 할당할때는 필요하고 합리적인 장소에 두시기 바랍니다.
  : 왜? let 과 const 는 블록스코프이기 때문입니다. 함수스코프가 아닙니다.

```js
// good
function() {
  test();
  console.log('doing stuff..');

  //..other stuff..

  const name = getName();

  if (name === 'test') {
    return false;
  }

  return name;
}

// bad - unnecessary function call
// 필요없는 함수 호출
function(hasName) {
  const name = getName();

  if (!hasName) {
    return false;
  }

  this.setFirstName(name);

  return true;
}

// good
function(hasName) {
  if (!hasName) {
    return false;
  }

  const name = getName();
  this.setFirstName(name);

  return true;
}
```

3. 명명규칙(Naming Conventions)

- 1문자의 이름은 피해 주십시오. 이름으로부터 의도가 읽혀질수 있게 해주십시오.

```js
// bad
function q() {
  // ...stuff...
}

// good
function query() {
  // ..stuff..
}
```

- 오브젝트, 함수 그리고 인스턴스에는 camelCase를 사용해 주십시오.

```js
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

- 클래스나 constructor에는 PascalCase 를 사용해 주십시오.

```js
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: "nope",
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: "yup",
});
```

- this 의 참조를 보존하는것은 피해주십시오. arrow함수나 Function#bind 를 이용해 주십시오.

```js
// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```

- 파일을 1개의 클래스로 export 하는 경우, 파일명은 클래스명과 완전히 일치시키지 않으면 안됩니다.

```js
// file contents
class CheckBox {
  // ...
}
export default CheckBox;

// in some other file
// bad
import CheckBox from "./checkBox";

// bad
import CheckBox from "./check_box";

// good
import CheckBox from "./CheckBox";
```

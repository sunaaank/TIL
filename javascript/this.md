# this

## 다른 언어에서 this란?
- this란 자기 자신, 생성된 object 자신을 가리키게 됨.

## JS에서 this란?
- 만들어진 자신을 가리키는 것이 아님.
- 누가 부르냐에 따라 `this`가 달라짐.
- 호출한 문맥에 따라서 `this`가 동적으로 달라짐.

## 샘플 코드
```js
console.log(this); // this => window;

function simpleFunc() {
  console.log(this); // this => window
}
simpleFunc();

class Counter {
  count = 0;
  increate = function () {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase(); // this => counter
const caller = counter.increase; // 정보를 잃어버리지 않으려면 binding을 해주어야 함. : counter.increase.bind(counter)
caller(); // undefined

class Bob {

}
const bob = new Bob();
bob.run = counter.increase;
bob.run(); // this => Bob
```
- 함수는 글로벌 객체 안에 등록이 되지만 변수는 등록아 안됨. 
- BUT var 키워드는 기본적으로 window에 등록됨. (var사용은 피하는 것이 좋음)


- JS의 this는 호출한 문맥에 따라서 달라지므로, `bind()`를 쓰거나 `arrow function`을 쓰면 this binding 문제를 겪지 않을 수 있음. 
 